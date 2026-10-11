#!/usr/bin/env node
/**
 * test-llm-io.js — offline checks on what goes into a model and what must come
 * out of it. Part of `npm test`; needs no API key and makes no network call.
 *
 *   1. Output contract on real outputs — tests/llm-golden/*.md are unedited model
 *      outputs from the demo runs; each must get the verdict in manifest.json from
 *      scripts/lib/signal-block.js (the parser eval-skills.js grades live runs with).
 *   2. Output contract on broken outputs — mutations of a real output (signal box
 *      removed, score/signal mismatch, model memory at HIGH confidence, …) must fail
 *      with the expected reason.
 *   3. Prompts — every skill and prompt closes with the standard six-field signal
 *      block; frontmatter descriptions (loaded into Claude Code's system prompt) stay
 *      short; prompt sizes stay within tests/prompt-budgets.json (+25%).
 *   4. Eval harness — the ZEPH fixture parses, assembled eval prompts carry the
 *      framework, the run rules and the data pack, and the arithmetic scorer works.
 *   5. Model runner and PR tooling — scripts/claude-complete.js builds the expected
 *      request (--dry-run), prompt-diff selects the right skills, and the LLM Eval
 *      workflow is wired to both.
 *
 *   node scripts/test-llm-io.js                    # run
 *   node scripts/test-llm-io.js --update-budgets   # rewrite tests/prompt-budgets.json
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const reg = require('./lib/skill-registry');
const sb = require('./lib/signal-block');
const pm = require('./lib/prompt-metrics');
const ev = require('./eval-skills');
const pd = require('./prompt-diff');

const ROOT = reg.ROOT;
const GOLDEN = path.join(ROOT, 'tests', 'llm-golden');
const BUDGETS = path.join(ROOT, 'tests', 'prompt-budgets.json');
const BUDGET_SLACK = 1.25;

let passed = 0, failed = 0, warned = 0;
const failures = [];
const pass = m => { passed++; process.stdout.write(`  ✅ ${m}\n`); };
const fail = m => { failed++; failures.push(m); process.stdout.write(`  ❌ ${m}\n`); };
const warn = m => { warned++; process.stdout.write(`  ⚠️  ${m}\n`); };
const section = t => process.stdout.write(`\n━━━ ${t} ${'─'.repeat(Math.max(0, 55 - t.length))}\n`);
const check = (cond, msg, detail) => (cond ? pass(msg) : fail(`${msg}${detail !== undefined ? ` — got ${JSON.stringify(detail)}` : ''}`));
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// ── budgets ─────────────────────────────────────────────────────────────────
function currentSizes() {
  const sizes = {};
  for (const f of pm.allPromptFiles()) sizes[f] = pm.estimateTokens(read(f));
  return sizes;
}

if (process.argv.includes('--update-budgets')) {
  const sizes = currentSizes();
  const body = { _about: 'Estimated token size of every prompt a model receives (scripts/lib/prompt-metrics.js). test-llm-io.js fails when a file grows more than 25% past its entry. If the growth is intended, run `node scripts/test-llm-io.js --update-budgets` and commit the result so the reviewer sees it.', budgets: sizes };
  fs.writeFileSync(BUDGETS, `${JSON.stringify(body, null, 2)}\n`);
  process.stdout.write(`  wrote ${path.relative(ROOT, BUDGETS)} (${Object.keys(sizes).length} files)\n`);
  process.exit(0);
}

// ════════════════════════════════════════════════════════════════════════════
section('1. Output contract — real model outputs');
const manifest = JSON.parse(fs.readFileSync(path.join(GOLDEN, 'manifest.json'), 'utf8'));
const listed = new Set(manifest.cases.map(c => c.file));
for (const f of fs.readdirSync(GOLDEN).filter(f => f.endsWith('.md'))) check(listed.has(f), `golden ${f}: listed in manifest.json`);
for (const c of manifest.cases) {
  const r = sb.validateOutput(fs.readFileSync(path.join(GOLDEN, c.file), 'utf8'), { skill: c.skill });
  const label = `${c.file} (${c.skill})`;
  if (c.expect === 'pass') check(r.ok, `${label}: passes the contract`, r.issues);
  else check(!r.ok && r.issues.some(i => i.includes(c.issue)), `${label}: fails with "${c.issue}"`, r.issues);
  if (c.signal) check(r.signal && r.signal.signal === c.signal, `${label}: Signal parsed as ${c.signal}`, r.signal && r.signal.signal);
  if (c.score !== undefined) check(r.signal && r.signal.score === c.score, `${label}: Score parsed as ${c.score}`, r.signal && r.signal.score);
  if (c.retrieval) check(r.dataSources && r.dataSources.retrievalKind === c.retrieval, `${label}: Retrieval read as "${c.retrieval}"`, r.dataSources && r.dataSources.retrievalKind);
  if (c.warning) check(r.warnings.some(w => w.includes(c.warning)), `${label}: warns "${c.warning}"`, r.warnings);
}

// ════════════════════════════════════════════════════════════════════════════
section('2. Output contract — broken outputs must fail');
const base = fs.readFileSync(path.join(GOLDEN, 'msft-stock-eval.md'), 'utf8');
check(sb.validateOutput(base).ok, 'mutation base (msft-stock-eval.md) passes before mutation');
const box = sb.parseSignalBlock(base).raw;
/** Replace one field's value in the text's (current) signal box, keeping the box width. */
const setField = (text, field, value) => {
  const cur = sb.parseSignalBlock(text).raw;
  const next = cur.replace(new RegExp(`(║ ${field}:\\s*)\\S[^║]*?(\\s*║)`), (m, a, b) => `${a}${value}${' '.repeat(Math.max(1, m.length - a.length - b.length - value.length))}${b}`);
  return text.replace(cur, next);
};
const MUTATIONS = [
  ['signal block removed', base.replace(box, ''), {}, 'missing Investment Signal block'],
  ['signal block left as the template', setField(setField(base, 'Signal', 'BULLISH / NEUTRAL / BEARISH'), 'Score', 'X.X / 10'), {}, 'unfilled template'],
  ['score 9.0 with Signal NEUTRAL', setField(base, 'Score', '9.0 / 10'), {}, 'maps to BULLISH'],
  ['score 11 / 10', setField(base, 'Score', '11.0 / 10'), {}, 'outside 0–10'],
  ['Signal outside the enum', setField(base, 'Signal', 'MIXED'), {}, 'not in BULLISH/NEUTRAL/BEARISH'],
  ['Action outside the enum', setField(base, 'Action', 'ACCUMULATE'), {}, 'not in BUY/HOLD/SELL'],
  ['score missing', setField(base, 'Score', 'n/a'), {}, 'Score missing'],
  ['model memory at HIGH confidence', base.replace(/Retrieval:\s*.*/, 'Retrieval:  model memory').replace(/(Data & Sources[\s\S]*?)Confidence:\s*.*/, '$1Confidence: HIGH'), {}, 'model memory but Confidence is not LOW'],
  ['Data & Sources header removed', base.replace(/```\nData & Sources[\s\S]*?```\n/, ''), {}, 'missing Data & Sources'],
  ['disclaimer removed', base.replace(/not financial advice/gi, ''), {}, 'disclaimer'],
  ['fact-check: failed verification carries a BUY forward', setField(setField(setField(base, 'Score', '3.2 / 10'), 'Signal', 'BULLISH'), 'Action', 'BUY'), { skill: 'fact-check' }, 'Verification failed'],
  ['fact-check: confidence above the score tier', setField(setField(base, 'Score', '6.5 / 10'), 'Confidence', 'HIGH'), { skill: 'fact-check' }, 'supports at most MEDIUM'],
];
for (const [name, text, opts, expected] of MUTATIONS) {
  const r = sb.validateOutput(text, opts);
  check(!r.ok && r.issues.some(i => i.includes(expected)), `${name} → fails with "${expected}"`, r.issues);
}
const verifiedNeutral = setField(base, 'Score', '7.1 / 10');
check(sb.validateOutput(verifiedNeutral, { skill: 'fact-check' }).ok, 'fact-check: Verification Score 7.1 with a mirrored NEUTRAL passes (skill rule, not the Score Guide)');
check(!sb.validateOutput(verifiedNeutral).ok, '…and the same box fails for an analysis skill (score → signal mapping)');

// ════════════════════════════════════════════════════════════════════════════
section('3. Prompts and system prompts');
for (const f of pm.allPromptFiles()) {
  const c = pm.classify(f);
  if (c.kind === 'system') continue;
  if (reg.CONTRACT_EXEMPT.signalBlock.includes(c.name)) continue;
  const { missing } = pm.signalFields(read(f));
  check(!missing.length, `${f}: closes with the standard six-field signal block`, missing);
}
for (const n of reg.listSkillDirs()) {
  const d = pm.description(read(`plugins/us-stock-analysis/skills/${n}/SKILL.md`));
  check(d && d.length >= 20 && d.length <= pm.MAX_DESCRIPTION_CHARS, `${n}: frontmatter description present and ≤ ${pm.MAX_DESCRIPTION_CHARS} chars`, d ? d.length : d);
}
for (const f of pm.SYSTEM_PROMPT_FILES) {
  const s = read(f);
  const missing = reg.listPromptNames().filter(n => !s.includes(n));
  check(!missing.length, `${f}: system prompt references every skill`, missing);
}
const budgets = fs.existsSync(BUDGETS) ? JSON.parse(fs.readFileSync(BUDGETS, 'utf8')).budgets : null;
if (!budgets) fail(`${path.relative(ROOT, BUDGETS)} missing — run node scripts/test-llm-io.js --update-budgets`);
else {
  const sizes = currentSizes();
  let over = 0;
  for (const [f, tokens] of Object.entries(sizes)) {
    if (budgets[f] === undefined) { warn(`${f}: no budget entry (${tokens} tokens) — run --update-budgets`); continue; }
    if (tokens > budgets[f] * BUDGET_SLACK) { over++; fail(`${f}: ${tokens} tokens, more than ${Math.round((BUDGET_SLACK - 1) * 100)}% over its budget of ${budgets[f]} — trim it, or run --update-budgets and commit if intended`); }
  }
  for (const f of Object.keys(budgets)) if (sizes[f] === undefined) warn(`${f}: budget entry for a file that no longer exists — run --update-budgets`);
  if (!over) pass(`every prompt within ${Math.round((BUDGET_SLACK - 1) * 100)}% of tests/prompt-budgets.json (${Object.keys(sizes).length} files)`);
}

// ════════════════════════════════════════════════════════════════════════════
section('4. Eval harness');
const fx = ev.loadFixture('ZEPH');
check(fx.meta.ticker && fx.meta.company && fx.meta.as_of, 'ZEPH fixture: ticker, company and as_of present', fx.meta);
check(fx.expect.length > 0 && fx.expect.every(e => e.label && e.near && typeof e.value === 'number' && ['m', 'pct', 'x'].includes(e.unit)), 'ZEPH fixture: every expect item has label, near, numeric value and a known unit', fx.expect);
const evalable = ev.evalableSkills();
check(ev.DEFAULT_SKILLS.every(s => evalable.includes(s)), 'default eval skills are all eval-able on the fixture', ev.DEFAULT_SKILLS.filter(s => !evalable.includes(s)));
for (const skill of evalable) {
  const p = ev.assemblePrompt(skill, fx);
  const framework = read(`prompts/${skill}.md`);
  const ok = p.startsWith(framework) && p.includes('# Task') && p.includes('Retrieval: pasted by user') && p.includes(fx.body) && !/\$\{|undefined/.test(p.slice(framework.length));
  check(ok, `eval prompt ${skill}: framework + run rules + data pack, no unfilled template`);
  const t = pm.estimateTokens(p);
  check(t < 40000, `eval prompt ${skill}: ${t} tokens (< 40,000)`, t);
}
const exact = fx.expect.map(e => `${e.label.split(' ')[0]} — ${e.near.split('|')[0].replace(/\\\\b|\\b/g, '')} ${e.value}${e.unit === 'pct' ? '%' : e.unit === 'x' ? 'x' : 'M'}`).join('\n');
const softExact = ev.softChecks(exact, fx);
check(softExact.every(s => s.status === 'PASS'), 'arithmetic scorer: exact figures near their terms → all PASS', softExact.filter(s => s.status !== 'PASS'));
const softNone = ev.softChecks('No figures here.', fx);
check(softNone.every(s => s.status === 'SKIP'), 'arithmetic scorer: no figures → SKIP, not FAIL', softNone.map(s => s.status));
check(ev.numbersNear('free cash flow was $1.2 billion', 'free cash flow', 'm').includes(1200), 'arithmetic scorer: "$1.2 billion" read as 1,200 ($M)');

// ════════════════════════════════════════════════════════════════════════════
section('5. Model runner, prompt diff and the LLM Eval workflow');
const runner = path.join(ROOT, 'scripts', 'claude-complete.js');
const env = { ...process.env }; delete env.ANTHROPIC_API_KEY; delete env.EVAL_MODEL; delete env.EVAL_EFFORT; delete env.EVAL_MAX_TOKENS;
let r = spawnSync(process.execPath, [runner, '--dry-run'], { input: 'Run the framework.', encoding: 'utf8', env });
let req = null; try { req = JSON.parse(r.stdout); } catch { /* reported below */ }
check(r.status === 0 && req, 'claude-complete --dry-run: exit 0 with a JSON request', r.stderr);
if (req) {
  check(req.model === 'claude-opus-5-5', 'runner default model: claude-opus-5-5', req.model);
  check(req.stream === true && req.max_tokens === 64000, 'runner streams with max_tokens 64000', { stream: req.stream, max_tokens: req.max_tokens });
  check(req.output_config && req.output_config.effort === 'medium', 'runner sets effort explicitly (medium)', req.output_config);
  check(req.fallbacks === 'default' && (req.betas || []).includes('server-side-fallback-2026-07-01'), 'runner opts into server-side refusal fallback', { fallbacks: req.fallbacks, betas: req.betas });
  check(!JSON.stringify(req).includes('Run the framework.'), 'dry-run never echoes the prompt body');
}
r = spawnSync(process.execPath, [runner, '--dry-run'], { input: 'x', encoding: 'utf8', env: { ...env, EVAL_MODEL: 'claude-sonnet-5-5', EVAL_EFFORT: 'high' } });
try { req = JSON.parse(r.stdout); } catch { req = {}; }
check(req.model === 'claude-sonnet-5-5' && req.output_config && req.output_config.effort === 'high', 'runner honours EVAL_MODEL / EVAL_EFFORT', req.model);
r = spawnSync(process.execPath, [runner], { input: '   ', encoding: 'utf8', env });
check(r.status === 2 && /empty prompt/.test(r.stderr), 'runner: empty stdin → exit 2', r.status);
let sdkInstalled = true; try { require.resolve('@anthropic-ai/sdk'); } catch { sdkInstalled = false; }
if (!sdkInstalled) {
  r = spawnSync(process.execPath, [runner], { input: 'x', encoding: 'utf8', env });
  check(r.status === 2 && /npm install --no-save @anthropic-ai\/sdk/.test(r.stderr), 'runner without the SDK: exit 2 with the install command', r.stderr);
} else pass('runner without the SDK: skipped (SDK installed here; never calls the API in tests)');

const fake = { base: 'origin/main', mergeBase: 'abc1234567', infra: [], rows: [
  { file: 'plugins/us-stock-analysis/skills/stock-eval/SKILL.md', kind: 'skill', name: 'stock-eval', status: 'M', tokensBefore: 100, tokensAfter: 130, contract: pm.contract(read('prompts/stock-eval.md')), descriptionChanged: true, description: 'x'.repeat(50) },
  { file: 'prompts/stock-eval.md', kind: 'prompt', name: 'stock-eval', status: 'M', tokensBefore: 100, tokensAfter: 130, contract: pm.contract(read('prompts/stock-eval.md')) },
  { file: 'plugins/us-stock-analysis/skills/sector-analysis/SKILL.md', kind: 'skill', name: 'sector-analysis', status: 'M', tokensBefore: 10, tokensAfter: 10, contract: pm.contract(read('prompts/sector-analysis.md')), descriptionChanged: false },
] };
check(pd.select(fake, 4).join(',') === 'stock-eval', 'prompt-diff --select: changed eval-able skills only (sector-analysis needs another fixture)', pd.select(fake, 4));
check(pd.select({ ...fake, rows: [], infra: ['scripts/lib/signal-block.js'] }, 4).join(',') === ev.DEFAULT_SKILLS.join(','), 'prompt-diff --select: eval machinery changed → default skills');
check(pd.select({ ...fake, rows: [], infra: [] }, 4).length === 0, 'prompt-diff --select: nothing relevant changed → nothing to run');
check(pd.select({ ...fake, rows: evalable.map(n => ({ kind: 'skill', name: n, status: 'M' })) }, 4).length === 4, 'prompt-diff --select: capped at --max');
const md = pd.markdown(fake);
check(md.includes('100 → 130 (+30%)') && md.includes('changed (50 chars)'), 'prompt-diff report: token delta and description change shown');

const wf = read('.github/workflows/llm-eval.yml');
check(/prompts\/\*\*/.test(wf) && /skills\/\*\*/.test(wf), 'llm-eval.yml: runs when skills or prompts change');
check(/prompt-diff\.js[^\n]*--select/.test(wf) && wf.includes('scripts/claude-complete.js') && wf.includes('eval-skills.js'), 'llm-eval.yml: selects skills, runs them through the Claude runner, scores with eval-skills');
check(/ANTHROPIC_API_KEY/.test(wf) && /no ANTHROPIC_API_KEY|skipp/i.test(wf), 'llm-eval.yml: skips cleanly when the API key secret is unavailable (forks)');
check(wf.includes('npm install --no-save @anthropic-ai/sdk'), 'llm-eval.yml: installs the SDK without adding a dependency');
check(!/pull_request_target/.test(wf), 'llm-eval.yml: never uses pull_request_target (no secrets for untrusted code)');

// ════════════════════════════════════════════════════════════════════════════
process.stdout.write('\n' + '═'.repeat(60) + '\n  LLM I/O TEST RESULTS\n' + '═'.repeat(60) + '\n');
process.stdout.write(`  ✅ Passed:   ${passed}\n  ❌ Failed:   ${failed}\n  ⚠️  Warnings: ${warned}\n` + '═'.repeat(60) + '\n');
if (failed) process.stdout.write('\n  Failures:\n' + failures.map(f => `    • ${f}`).join('\n') + '\n\n');
else process.stdout.write('\n  🎉 All LLM I/O tests passed!\n\n');
process.exit(failed ? 1 : 0);
