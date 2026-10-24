/**
 * signal-block.js — one shared parser for the InvestSkill output contract.
 *
 * Used by check-skill-contract.js (does a skill *define* the contract?),
 * eval-skills.js (did a model run *honour* it?), and available to
 * site-review.js or a future "paste your output" checker.
 *
 * The contract, in the order it appears in an analysis:
 *
 *   Data & Sources                      ← provenance header at the top
 *     As of:      2026-06-30
 *     Source:     …
 *     Retrieval:  pasted by user | web/tool retrieval | model memory
 *     Confidence: HIGH | MEDIUM | LOW
 *
 *   … analysis …
 *
 *   ## Thesis Invalidation              ← what would reverse the call
 *
 *   ╔══════════════════════════════════════════════╗
 *   ║              INVESTMENT SIGNAL               ║   ← the signal block
 *   ╠══════════════════════════════════════════════╣
 *   ║ Signal:      BULLISH / NEUTRAL / BEARISH     ║
 *   ║ Confidence:  HIGH / MEDIUM / LOW             ║
 *   ║ Horizon:     SHORT / MEDIUM / LONG-TERM      ║
 *   ║ Score:       X.X / 10                        ║
 *   ╠══════════════════════════════════════════════╣
 *   ║ Action:      BUY / HOLD / SELL               ║
 *   ║ Conviction:  STRONG / MODERATE / WEAK        ║
 *   ╚══════════════════════════════════════════════╝
 *
 *   ```json                              ← machine-readable footer, right after
 *   {"investskill": "1", "skill": "stock-eval", "ticker": "AAPL",
 *    "as_of": "2026-06-30", "signal": "NEUTRAL", "confidence": "MEDIUM",
 *    "horizon": "LONG-TERM", "score": 5.5, "action": "HOLD",
 *    "conviction": "MODERATE", "retrieval": "pasted by user", "sources": ["…"]}
 *   ```
 *
 *   **Disclaimer:** … Not financial advice.
 *
 * The JSON footer repeats the box so tools (eval-skills.js, result-validator,
 * a watchlist) can read a result without parsing box-drawing characters. It is
 * optional in the parser — outputs from before it existed still pass — but when
 * present it must agree with the box.
 */

const SIGNAL_BLOCK_TOP = '╔══════════════════════════════════════════════╗';
const SIGNALS = ['BULLISH', 'NEUTRAL', 'BEARISH'];
const CONFIDENCES = ['HIGH', 'MEDIUM', 'LOW'];
const ACTIONS = ['BUY', 'HOLD', 'SELL'];
const CONVICTIONS = ['STRONG', 'MODERATE', 'WEAK'];
const RETRIEVALS = ['pasted by user', 'web/tool retrieval', 'model memory'];

const DATA_SOURCES_FIELDS = ['As of', 'Source', 'Retrieval', 'Confidence'];
// Traditional Chinese runs keep the English field labels but often write the
// Retrieval value in Chinese; map those phrases onto the three kinds.
const RETRIEVAL_SYNONYMS = {
  'pasted by user': [/pasted/i, /使用者提供/],
  'web/tool retrieval': [/web|tool/i, /網路|網頁/],
  'model memory': [/memory/i, /模型記憶|記憶/],
};
// Skills whose Score is *not* a bullish/bearish rating, so the Score Guide's
// score→signal mapping does not apply. fact-check: Score is the Verification
// Score and Signal mirrors the verified report (fact-check/SKILL.md § Standard
// Signal Output); validateOutput applies that skill's own rules instead.
const VERIFICATION_SCORE_SKILLS = ['fact-check'];

/** Score → the signal the Score Guide says it maps to. */
function expectedSignalForScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return null;
  if (score >= 6.0) return 'BULLISH';
  if (score >= 4.0) return 'NEUTRAL';
  return 'BEARISH';
}

const JSON_FOOTER_KEY = 'investskill';
const JSON_FOOTER_FIELDS = ['investskill', 'skill', 'ticker', 'as_of', 'signal', 'confidence', 'horizon', 'score', 'action', 'conviction', 'retrieval', 'sources'];

/**
 * The machine-readable footer: the last ```json block that has an
 * "investskill" key. Returns { data } when it parses, { error } when a block
 * with the key exists but is not valid JSON, or null when there is none.
 */
function parseJsonFooter(text) {
  const blocks = [...(text || '').matchAll(/```json\s*\n([\s\S]*?)```/g)].map(m => m[1]).filter(b => b.includes(`"${JSON_FOOTER_KEY}"`));
  if (!blocks.length) return null;
  try { return { data: JSON.parse(blocks[blocks.length - 1]) }; } catch (e) { return { error: e.message }; }
}

/** Does a skill file define the JSON footer template? */
function hasJsonFooterTemplate(text) {
  const t = text || '';
  return JSON_FOOTER_FIELDS.every(f => t.includes(`"${f}"`));
}

/** Return every box-drawn block (╔ … ╚) in the text, raw. */
function extractBoxes(text) {
  const boxes = [];
  const re = /╔[═]+╗[\s\S]*?╚[═]+╝/g;
  let m;
  while ((m = re.exec(text)) !== null) boxes.push(m[0]);
  return boxes;
}

/**
 * Parse the *last* Investment Signal box in a text (the final synthesis).
 * Returns null when there is none. Field values are upper-cased and trimmed;
 * `score` is a number when parseable. Placeholders like "BULLISH / NEUTRAL /
 * BEARISH" (a template, not a filled value) are reported via `isTemplate`.
 */
function parseSignalBlock(text) {
  const boxes = extractBoxes(text || '').filter(b => /INVESTMENT SIGNAL/i.test(b));
  if (!boxes.length) return null;
  const box = boxes[boxes.length - 1];
  const fields = {};
  for (const line of box.split('\n')) {
    const m = line.match(/^║\s*([A-Za-z][A-Za-z ]*?):\s*(.*?)\s*║\s*$/);
    if (m) fields[m[1].trim().toLowerCase()] = m[2].trim();
  }
  const pick = k => (fields[k] || '').toUpperCase();
  const first = v => v.split(/[\/|]/)[0].trim();     // "BULLISH / NEUTRAL" → BULLISH
  // "BUY (ON PULLBACK TO ~$195)" → BUY, with the qualifier reported separately
  const lead = v => { const m = first(v).match(/^([A-Z-]+)\b\s*(.*)$/); return m ? { value: m[1], qualifier: m[2] || '' } : { value: first(v), qualifier: '' }; };
  const scoreRaw = fields['score'] || '';
  const scoreMatch = scoreRaw.match(/(-?\d+(?:\.\d+)?)\s*\/\s*10/);
  const isTemplate = /BULLISH\s*\/\s*NEUTRAL/i.test(fields['signal'] || '') || /X\.X/i.test(scoreRaw);

  const qualifiers = {};
  const enumField = k => { const r = lead(pick(k)); if (r.qualifier) qualifiers[k] = r.qualifier; return r.value || null; };
  return {
    raw: box,
    isTemplate,
    signal: enumField('signal'),
    confidence: enumField('confidence'),
    horizon: pick('horizon') || null,
    score: scoreMatch ? parseFloat(scoreMatch[1]) : null,
    action: enumField('action'),
    conviction: enumField('conviction'),
    qualifiers,
    fields,
  };
}

/**
 * Parse the Data & Sources header. Accepts the fenced or plain form; fields
 * are matched case-insensitively and may be separated by ":" with any spacing.
 */
function parseDataSources(text) {
  const idx = (text || '').search(/Data\s*&\s*Sources/i);
  if (idx < 0) return null;
  const window = text.slice(idx, idx + 1200);
  const get = label => {
    const m = window.match(new RegExp(`${label}\\s*:\\s*(.+)`, 'i'));
    return m ? m[1].trim().replace(/\s*[║|]\s*$/, '') : null;
  };
  const retrieval = get('Retrieval');
  const confidence = get('Confidence');
  return {
    asOf: get('As of'),
    source: get('Source'),
    retrieval,
    confidence: confidence ? confidence.toUpperCase().split(/[\s—-]/)[0] : null,
    retrievalKind: retrieval
      ? (RETRIEVALS.find(r => RETRIEVAL_SYNONYMS[r].some(re => re.test(retrieval))) || 'other')
      : null,
  };
}

/** Does a text contain the Data & Sources header *template* with all four fields? */
function hasDataSourcesTemplate(text) {
  if (!/Data\s*&\s*Sources/i.test(text || '')) return false;
  return DATA_SOURCES_FIELDS.every(f => new RegExp(`${f}\\s*:`, 'i').test(text));
}

function hasSignalBlockTemplate(text) {
  return (text || '').includes(SIGNAL_BLOCK_TOP);
}

/**
 * The code fence that holds the signal-block template must contain the box
 * only. A markdown heading inside it (e.g. "## Thesis Invalidation" swallowed
 * by a fence opened too early) is shown to the model as literal box text.
 * Returns true when the fence around the last signal box holds no heading.
 */
function signalFenceIsClean(text) {
  const lines = (text || '').split('\n');
  const top = lines.map((l, i) => (l.startsWith(SIGNAL_BLOCK_TOP) ? i : -1)).filter(i => i >= 0).pop();
  if (top === undefined) return true;
  let inFence = false, open = -1;
  for (let i = 0; i < top; i++) if (/^\s*```/.test(lines[i])) { inFence = !inFence; open = i; }
  if (!inFence) return true;
  return !lines.slice(open + 1, top).some(l => /^#{1,6}\s/.test(l));
}

function hasThesisInvalidation(text) {
  return /Thesis Invalidation/i.test(text || '') || /論點失效條件/.test(text || '');
}

function hasDataVerification(text) {
  return /^#{2,3}\s.*Data Verification/im.test(text || '');
}

function hasDisclaimer(text) {
  // English, or the Traditional Chinese wording the zh-TW runs use.
  return /not financial advice/i.test(text || '') || /非投資建議|不構成投資建議/.test(text || '');
}

/** The confidence tier a Verification Score supports (fact-check/SKILL.md). */
function confidenceTierForScore(score) {
  if (score >= 8.0) return 'HIGH';
  if (score >= 6.0) return 'MEDIUM';
  return 'LOW';
}

/**
 * Validate a *model output* (not a skill file) against the contract.
 * `opts.skill` selects skill-specific rules (see VERIFICATION_SCORE_SKILLS);
 * `opts.expectRetrieval` turns a different Retrieval kind into a warning.
 * Returns { ok, issues[], warnings[], signal, dataSources }.
 */
function validateOutput(text, opts = {}) {
  const issues = [];
  const warnings = [];
  const signal = parseSignalBlock(text);
  const ds = parseDataSources(text);

  if (!signal) issues.push('missing Investment Signal block');
  else {
    if (signal.isTemplate) issues.push('signal block left as an unfilled template');
    if (signal.signal && !SIGNALS.includes(signal.signal)) issues.push(`Signal "${signal.signal}" not in ${SIGNALS.join('/')}`);
    if (signal.confidence && !CONFIDENCES.includes(signal.confidence)) issues.push(`Confidence "${signal.confidence}" not in ${CONFIDENCES.join('/')}`);
    if (signal.action && !ACTIONS.includes(signal.action)) issues.push(`Action "${signal.action}" not in ${ACTIONS.join('/')}`);
    if (signal.conviction && !CONVICTIONS.includes(signal.conviction)) issues.push(`Conviction "${signal.conviction}" not in ${CONVICTIONS.join('/')}`);
    if (signal.score === null) issues.push('Score missing or not "X.X / 10"');
    else if (signal.score < 0 || signal.score > 10) issues.push(`Score ${signal.score} outside 0–10`);
    else if (VERIFICATION_SCORE_SKILLS.includes(opts.skill)) {
      // Score is the Verification Score: Confidence may not exceed the tier it
      // supports, and a failed verification (< 4.0) must not carry a call forward.
      const order = ['LOW', 'MEDIUM', 'HIGH'];
      const tier = confidenceTierForScore(signal.score);
      if (signal.confidence && order.indexOf(signal.confidence) > order.indexOf(tier)) issues.push(`Verification Score ${signal.score} supports at most ${tier} confidence, box says ${signal.confidence}`);
      if (signal.score < 4.0 && (signal.signal !== 'NEUTRAL' || signal.action !== 'HOLD')) issues.push(`Verification failed (${signal.score} < 4.0) but the box carries ${signal.signal} / ${signal.action} forward instead of NEUTRAL / HOLD`);
    } else if (signal.signal && SIGNALS.includes(signal.signal)) {
      const expected = expectedSignalForScore(signal.score);
      if (expected !== signal.signal) issues.push(`Score ${signal.score} maps to ${expected} but Signal says ${signal.signal}`);
    }
    for (const [k, q] of Object.entries(signal.qualifiers || {})) warnings.push(`${k[0].toUpperCase() + k.slice(1)} carries a qualifier ("${q.toLowerCase()}"); parsers read only "${signal[k]}"`);
  }

  if (!ds) issues.push('missing Data & Sources header');
  else {
    for (const [k, label] of [['asOf', 'As of'], ['source', 'Source'], ['retrieval', 'Retrieval'], ['confidence', 'Confidence']]) {
      if (!ds[k]) issues.push(`Data & Sources: "${label}" line missing`);
    }
    if (ds.retrievalKind === 'model memory' && ds.confidence !== 'LOW') {
      issues.push('Data & Sources: Retrieval is model memory but Confidence is not LOW');
    }
    if (opts.expectRetrieval && ds.retrievalKind && ds.retrievalKind !== opts.expectRetrieval) {
      warnings.push(`Data & Sources: expected Retrieval "${opts.expectRetrieval}", got "${ds.retrieval}"`);
    }
  }

  const footer = parseJsonFooter(text);
  if (!footer) warnings.push('no JSON footer after the signal block');
  else if (footer.error) issues.push(`JSON footer is not valid JSON (${footer.error})`);
  else if (signal && !signal.isTemplate) {
    const f = footer.data;
    const up = v => (typeof v === 'string' ? v.toUpperCase().trim() : v);
    for (const k of ['signal', 'confidence', 'action', 'conviction']) {
      if (f[k] !== undefined && signal[k] && up(f[k]) !== signal[k]) issues.push(`JSON footer ${k} "${f[k]}" disagrees with the box (${signal[k]})`);
    }
    if (f.score !== undefined && signal.score !== null && Number(f.score) !== signal.score) issues.push(`JSON footer score ${f.score} disagrees with the box (${signal.score})`);
    if (opts.skill && f.skill && f.skill !== opts.skill) warnings.push(`JSON footer names skill "${f.skill}", expected "${opts.skill}"`);
  }

  if (!hasThesisInvalidation(text)) warnings.push('no Thesis Invalidation section');
  if (!hasDisclaimer(text)) issues.push('missing "Not financial advice" disclaimer');

  return { ok: issues.length === 0, issues, warnings, signal, dataSources: ds, footer: footer && footer.data ? footer.data : null };
}

module.exports = {
  SIGNAL_BLOCK_TOP, JSON_FOOTER_KEY, JSON_FOOTER_FIELDS, parseJsonFooter, hasJsonFooterTemplate, SIGNALS, CONFIDENCES, ACTIONS, CONVICTIONS, RETRIEVALS, DATA_SOURCES_FIELDS, VERIFICATION_SCORE_SKILLS,
  confidenceTierForScore,
  expectedSignalForScore, extractBoxes, parseSignalBlock, parseDataSources,
  hasDataSourcesTemplate, hasSignalBlockTemplate, signalFenceIsClean, hasThesisInvalidation, hasDataVerification, hasDisclaimer,
  validateOutput,
};
