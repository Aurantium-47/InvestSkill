#!/usr/bin/env node
/**
 * check-zh-parity.js — keep the English and Traditional Chinese site content in step.
 *
 *   node scripts/check-zh-parity.js           # part of `npm test`
 *   node scripts/check-zh-parity.js --verbose # list every pair
 *
 * For each site/content/X.md:
 *   1. X-zh-TW.md must exist (FAQ-zh-TW.md pairs with the root FAQ.md), unless X is a demo that pairs with a different
 *      ticker in the other language (DEMO_PAIRS, mirrored from LANG_PAIRS in
 *      site/build/lang-pairs.js)                                       → fail
 *   2. the two files must have the same number of ## and ### headings,
 *      within HEADING_SLACK — a missing section is the usual drift      → fail
 *   3. code fences must be balanced in both (a stray fence swallows the
 *      headings after it, which is how the zh Cookbook lost §3.10)      → fail
 *   4. if git shows the English file changed after the Chinese one, say
 *      so — it may need the same edit                                   → warning
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { fenceProblems, headings } = require('./lib/fences');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'site', 'content');
const VERBOSE = process.argv.includes('--verbose');
const HEADING_SLACK = 2;

// English page → its counterpart when that is not X-zh-TW.md (cross-ticker demos).
const DEMO_PAIRS = {
  'FULL-DEMO-PLTR.md': 'FULL-DEMO-RKLB.md',   // PLTR (EN) ⇄ RKLB (zh)
  'FULL-DEMO-NVDA.md': 'FULL-DEMO-AMD.md',    // NVDA (EN) ⇄ AMD (zh)
};
// Chinese pages whose English source lives outside site/content.
const EN_ELSEWHERE = { 'FAQ-zh-TW.md': 'FAQ.md' };   // repo root FAQ.md is the English FAQ page
// Chinese-only or English-only by design (each says so on the page).
const ONE_LANGUAGE = ['FULL-DEMO-RKLB.md', 'FULL-DEMO-AMD.md', 'FULL-DEMO-META.md'];

let failed = 0, warned = 0, pairs = 0;
const fail = m => { failed++; process.stdout.write(`  ❌ ${m}\n`); };
const warn = m => { warned++; process.stdout.write(`  ⚠️  ${m}\n`); };
const info = m => { if (VERBOSE) process.stdout.write(`  ✅ ${m}\n`); };

function lastCommit(file) {
  try { return parseInt(execFileSync('git', ['log', '-1', '--format=%ct', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim(), 10) || 0; } catch { return 0; }
}

process.stdout.write('\n━━━ EN ⇄ zh-TW parity (site/content) ──────────────────────\n');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md'));
const readEn = f => fs.readFileSync(EN_ELSEWHERE[f.replace(/\.md$/, '-zh-TW.md')] && !files.includes(f) ? path.join(ROOT, f) : path.join(DIR, f), 'utf8');
const enFiles = files.filter(f => !f.endsWith('-zh-TW.md')).concat(Object.values(EN_ELSEWHERE));
for (const en of enFiles) {
  if (ONE_LANGUAGE.includes(en) && !DEMO_PAIRS[en]) { info(`${en} — single-language demo`); continue; }
  const zh = DEMO_PAIRS[en] || en.replace(/\.md$/, '-zh-TW.md');
  if (!files.includes(zh)) { fail(`${en} — no Traditional Chinese counterpart (${zh})`); continue; }
  pairs++;
  const enText = readEn(en), zhText = fs.readFileSync(path.join(DIR, zh), 'utf8');
  for (const [f, t] of [[en, enText], [zh, zhText]]) fenceProblems(t).forEach(p => fail(`${f} — ${p}`));
  const a = headings(enText), b = headings(zhText);
  // Cross-ticker demos are different runs, so only the existence check applies.
  if (!DEMO_PAIRS[en] && Math.abs(a.length - b.length) > HEADING_SLACK) {
    fail(`${en} has ${a.length} ##/### headings, ${zh} has ${b.length} — a section is missing on one side`);
  } else info(`${en} ⇄ ${zh} (${a.length} / ${b.length} headings)`);
  const enPath = files.includes(en) ? `site/content/${en}` : en;
  const tEn = lastCommit(enPath), tZh = lastCommit(`site/content/${zh}`);
  if (tEn && tZh && tEn - tZh > 7 * 86400) warn(`${en} changed ${Math.round((tEn - tZh) / 86400)} days after ${zh} — check whether the Chinese page needs the same edit`);
}
for (const zh of files.filter(f => f.endsWith('-zh-TW.md'))) {
  const en = zh.replace(/-zh-TW\.md$/, '.md');
  if (!files.includes(en) && !EN_ELSEWHERE[zh]) fail(`${zh} — no English counterpart (${en})`);
}

process.stdout.write(`\n  ${pairs} pairs checked, ${failed} failed, ${warned} warnings\n\n`);
process.exitCode = failed ? 1 : 0;
