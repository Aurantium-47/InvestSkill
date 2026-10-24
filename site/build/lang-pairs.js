'use strict';
/*
 * lang-pairs.js — where the header language switcher (文A) sends a reader.
 *
 * Used by build-site.js for the switcher and the <link rel="alternate"> tags,
 * and by scripts/test-site.js, which unit-tests the rule and the rendered menu.
 *
 * A page with a counterpart in the other language links to it (LANG_PAIRS).
 * A page without one — every skill-<name>.html reference page, the demos that
 * exist in one language only — used to fall back to the other language's home
 * page, so 文A from a skill page "jumped back to the home page". It now falls
 * back to its parent index (LANG_PARENTS), which always has a twin; only pages
 * with neither (changelog, contributing) still land on the home page.
 */

// Pairs of English ⇄ Traditional Chinese counterparts (by output filename).
const LANG_PAIRS = [
  ['index.html', 'zh-tw.html'],
  ['learning.html', 'learning-zh-tw.html'],
  ['learning-foundations.html', 'learning-foundations-zh-tw.html'],
  ['learning-statements.html', 'learning-statements-zh-tw.html'],
  ['learning-quality.html', 'learning-quality-zh-tw.html'],
  ['learning-valuation.html', 'learning-valuation-zh-tw.html'],
  ['learning-market.html', 'learning-market-zh-tw.html'],
  ['learning-portfolio.html', 'learning-portfolio-zh-tw.html'],
  ['learning-playbook.html', 'learning-playbook-zh-tw.html'],
  ['learning-case-amd.html', 'learning-case-amd-zh-tw.html'],
  ['learning-setup.html', 'learning-setup-zh-tw.html'],
  ['learning-etfs.html', 'learning-etfs-zh-tw.html'],
  ['learning-taxes.html', 'learning-taxes-zh-tw.html'],
  ['learning-earnings.html', 'learning-earnings-zh-tw.html'],
  ['learning-psychology.html', 'learning-psychology-zh-tw.html'],
  ['learning-case-pass.html', 'learning-case-pass-zh-tw.html'],
  ['learning-macro.html', 'learning-macro-zh-tw.html'],
  ['learning-options.html', 'learning-options-zh-tw.html'],
  ['cheatsheet.html', 'cheatsheet-zh-tw.html'],
  ['non-us-guide.html', 'non-us-guide-zh-tw.html'],
  ['faq.html', 'faq-zh-tw.html'],
  ['concepts.html', 'concepts-zh-tw.html'],
  ['glossary.html', 'glossary-zh-tw.html'],
  ['choose-a-skill.html', 'choose-a-skill-zh-tw.html'],
  ['use-cases.html', 'use-cases-zh-tw.html'],
  ['data-and-accuracy.html', 'data-and-accuracy-zh-tw.html'],
  ['cookbook.html', 'cookbook-zh-tw.html'],
  ['skills.html', 'skills-zh-tw.html'],
  ['walkthrough.html', 'walkthrough-zh-tw.html'],
  // The demo overview (English) pairs with the RKLB full demo (Traditional Chinese).
  ['full-demo.html', 'full-demo-zh-tw.html'],
  // The two full-coverage demos pair across languages: PLTR (English) ⇄ RKLB (Traditional Chinese).
  ['full-demo-pltr.html', 'full-demo-rklb.html'],
  // The two 10-K deep dives pair across languages: NVDA (English) ⇄ AMD (Traditional Chinese).
  ['full-demo-nvda.html', 'full-demo-amd.html'],
];
const EN_TO_ZH = Object.fromEntries(LANG_PAIRS);
const ZH_TO_EN = Object.fromEntries(LANG_PAIRS.map(([en, zh]) => [zh, en]));

// Pages with no counterpart of their own → the index they are listed on, which
// has one. Kept explicit rather than guessed: a wrong guess here 404s.
const LANG_PARENTS = [
  [/^skill-.+\.html$/,     'skills.html'],
  [/^full-demo-.+\.html$/, 'full-demo.html'],
];

// Language of a page, derived from its output filename.
// These demos are fully Traditional Chinese content, so they belong to the
// zh site even though their filenames don't carry the -zh-tw suffix.
const ZH_CONTENT_DEMOS = new Set(['full-demo-rklb.html', 'full-demo-amd.html']);
function langOf(outFile) {
  if (ZH_CONTENT_DEMOS.has(outFile)) return 'zh';
  return (outFile === 'zh-tw.html' || outFile.endsWith('-zh-tw.html')) ? 'zh' : 'en';
}

// The counterpart of `outFile` in each language: { en, zh }. The page's own
// language maps to itself.
function switchTargets(outFile) {
  const lang = langOf(outFile);
  let other = (lang === 'en' ? EN_TO_ZH : ZH_TO_EN)[outFile];
  if (!other) {
    const hit = LANG_PARENTS.find(([re]) => re.test(outFile));
    const parentEn = hit ? hit[1] : 'index.html';
    other = lang === 'en' ? EN_TO_ZH[parentEn] : parentEn;
  }
  return lang === 'en' ? { en: outFile, zh: other } : { en: other, zh: outFile };
}

module.exports = { LANG_PAIRS, LANG_PARENTS, EN_TO_ZH, ZH_TO_EN, langOf, switchTargets };
