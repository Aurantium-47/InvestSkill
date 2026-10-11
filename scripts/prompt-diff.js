#!/usr/bin/env node
/**
 * prompt-diff.js — what a branch changed in the prompts a model receives.
 *
 * Compares the working tree with the merge base of `--base` (default origin/main)
 * for every skill SKILL.md, prompts/*.md and cross-AI system-prompt file, and
 * reports per changed file: token estimate before → after, whether the skill's
 * frontmatter description (what Claude Code loads into its system prompt) changed,
 * and whether the output contract is still defined. The LLM Eval workflow writes
 * this to the job summary and uses `--select` to decide which skills to run live.
 *
 *   node scripts/prompt-diff.js                       # markdown report
 *   node scripts/prompt-diff.js --base origin/main --json
 *   node scripts/prompt-diff.js --select --max 4      # skills for the live eval, comma-separated
 *
 * `--select` prints the changed skills the eval fixture can run (eval-skills.js
 * evalableSkills). If none changed but the eval machinery did (the output parser,
 * the eval script, the model runner, the fixture, or the workflow), it prints the
 * eval's default skill set. Empty output means: nothing to evaluate.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const reg = require('./lib/skill-registry');
const pm = require('./lib/prompt-metrics');

const argv = process.argv.slice(2);
const flag = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const has = k => argv.includes(`--${k}`);

const EVAL_INFRA = ['scripts/lib/signal-block.js', 'scripts/eval-skills.js', 'scripts/claude-complete.js',
  'scripts/prompt-diff.js', 'scripts/lib/prompt-metrics.js', 'scripts/lib/skill-registry.js',
  'data/fixtures/ZEPH.md', '.github/workflows/llm-eval.yml'];

const git = (...args) => execFileSync('git', args, { cwd: reg.ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/** Merge base of HEAD and `base`, or `base` itself when there is no common history. */
function mergeBase(base) {
  try { return git('merge-base', base, 'HEAD').trim(); } catch { return base; }
}

/** Files changed between `ref` and the working tree (committed or not), plus untracked prompt files. */
function changedFiles(ref) {
  const out = git('diff', '--name-status', '--no-renames', ref).trim();
  const files = out ? out.split('\n').map(l => { const [status, file] = l.split('\t'); return { status, file }; }) : [];
  const untracked = git('ls-files', '--others', '--exclude-standard').trim();
  for (const file of untracked ? untracked.split('\n') : []) if (!files.some(f => f.file === file)) files.push({ status: 'A', file });
  return files;
}

/** A file's content at `ref`, or '' when it did not exist there. */
function atRef(ref, file) {
  try { return git('show', `${ref}:${file}`); } catch { return ''; }
}

function report(base) {
  const ref = mergeBase(base);
  const changed = changedFiles(ref);
  const rows = [];
  for (const { status, file } of changed) {
    const c = pm.classify(file);
    if (!c) continue;
    const before = atRef(ref, file);
    const after = status === 'D' ? '' : fs.readFileSync(path.join(reg.ROOT, file), 'utf8');
    const row = { file, kind: c.kind, name: c.name, status, tokensBefore: pm.estimateTokens(before), tokensAfter: pm.estimateTokens(after) };
    if (c.kind !== 'system' && after) row.contract = pm.contract(after);
    if (c.kind === 'skill') {
      row.descriptionChanged = pm.description(before) !== pm.description(after);
      row.description = pm.description(after);
    }
    rows.push(row);
  }
  const infra = changed.map(f => f.file).filter(f => EVAL_INFRA.includes(f));
  return { base, mergeBase: ref, rows, infra };
}

/** Skills to run in the live eval: changed eval-able skills, else the defaults if the eval machinery changed. */
function select(r, max) {
  const { evalableSkills, DEFAULT_SKILLS } = require('./eval-skills');
  const evalable = new Set(evalableSkills());
  const changed = [...new Set(r.rows.filter(x => x.kind !== 'system' && evalable.has(x.name) && x.status !== 'D').map(x => x.name))];
  const picked = changed.length ? changed : (r.infra.length ? DEFAULT_SKILLS.slice() : []);
  return picked.slice(0, max);
}

function markdown(r) {
  const L = [];
  L.push('## Prompt changes', '');
  L.push(`*Compared with \`${r.base}\` (merge base \`${r.mergeBase.slice(0, 10)}\`). Token counts are estimates (chars/4 + words/2).*`, '');
  if (!r.rows.length) L.push('No skill, prompt or system-prompt file changed.', '');
  else {
    L.push('| File | Change | Tokens (est.) | Contract | Description |', '|------|--------|---------------|----------|-------------|');
    for (const x of r.rows) {
      const delta = x.tokensAfter - x.tokensBefore;
      const pct = x.tokensBefore ? ` (${delta >= 0 ? '+' : ''}${((delta / x.tokensBefore) * 100).toFixed(0)}%)` : '';
      const status = { A: 'added', D: 'deleted', M: 'modified' }[x.status] || x.status;
      let contract = '—';
      if (x.contract) {
        const missing = Object.entries(x.contract).filter(([, v]) => !v).map(([k]) => k);
        contract = missing.length ? `⚠️ missing ${missing.join(', ')}` : '✅';
      }
      const desc = x.kind === 'skill' ? (x.descriptionChanged ? `changed (${(x.description || '').length} chars)` : 'unchanged') : '—';
      L.push(`| \`${x.file}\` | ${status} | ${x.tokensBefore} → ${x.tokensAfter}${pct} | ${contract} | ${desc} |`);
    }
    L.push('');
    L.push('*Contract gaps are expected for the exempt skills (aliases, `report-generator`, meta skills); `npm test` enforces the rest.*', '');
  }
  if (r.infra.length) L.push(`Eval machinery changed: ${r.infra.map(f => `\`${f}\``).join(', ')}.`, '');
  return L.join('\n');
}

function main() {
  const base = flag('base', process.env.PROMPT_DIFF_BASE || 'origin/main');
  const r = report(base);
  if (has('select')) { process.stdout.write(`${select(r, parseInt(flag('max', '4'), 10)).join(',')}\n`); return; }
  if (has('json')) { process.stdout.write(`${JSON.stringify(r, null, 2)}\n`); return; }
  process.stdout.write(`${markdown(r)}\n`);
}

if (require.main === module) {
  try { main(); } catch (e) { process.stderr.write(`prompt-diff: ${e.message}\n`); process.exit(1); }
}

module.exports = { report, select, markdown, EVAL_INFRA };
