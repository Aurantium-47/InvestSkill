/**
 * prompt-metrics.js — size and contract facts about a prompt file, shared by
 * scripts/prompt-diff.js (what a PR changed) and scripts/test-llm-io.js (what
 * every prompt must satisfy).
 *
 * "Prompts" here are the instructions a model actually receives:
 *   - plugins/us-stock-analysis/skills/<name>/SKILL.md — Claude Code loads the
 *     frontmatter `description` into its system prompt to decide when to use a
 *     skill, and the body when the skill runs
 *   - prompts/<name>.md — the same body for other assistants (generated)
 *   - the cross-AI instruction files below — system prompts for Gemini CLI,
 *     GitHub Copilot and Cursor
 */
const fs = require('fs');
const path = require('path');
const sb = require('./signal-block');
const reg = require('./skill-registry');

const SYSTEM_PROMPT_FILES = ['GEMINI.md', '.github/copilot-instructions.md', '.cursor/rules/invest-skill.mdc'];
const SIGNAL_FIELDS = ['signal', 'confidence', 'horizon', 'score', 'action', 'conviction'];
// Claude Code reads skill frontmatter descriptions for every request; keep them short.
const MAX_DESCRIPTION_CHARS = 1024;

/** Rough token estimate (the same heuristic validate-prompts.js reports). */
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4 + text.split(/\s+/).filter(Boolean).length / 2);
}

/** The frontmatter `description` of a SKILL.md, or null. */
function description(text) {
  const fm = (text || '').match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^description:\s*(.*)$/m);
  return m ? m[1].trim() : null;
}

/**
 * Which of the six standard fields the *last* Investment Signal box template in a
 * prompt defines. A skill must close with that standard block (CLAUDE.md), so all
 * six must be present.
 */
function signalFields(text) {
  const block = sb.parseSignalBlock(text || '');
  if (!block) return { present: [], missing: SIGNAL_FIELDS.slice() };
  const present = SIGNAL_FIELDS.filter(f => block.fields[f] !== undefined);
  return { present, missing: SIGNAL_FIELDS.filter(f => !present.includes(f)) };
}

/** Contract facts for a skill/prompt body (structure, not behaviour). */
function contract(text) {
  return {
    signalBlock: signalFields(text).missing.length === 0,
    dataSources: sb.hasDataSourcesTemplate(text),
    dataVerification: sb.hasDataVerification(text),
    thesisInvalidation: sb.hasThesisInvalidation(text),
    disclaimer: sb.hasDisclaimer(text),
  };
}

/** Classify a repo path: { kind: 'skill'|'prompt'|'system', name } or null. */
function classify(file) {
  let m = file.match(/^plugins\/us-stock-analysis\/skills\/([^/]+)\/SKILL\.md$/);
  if (m) return { kind: 'skill', name: m[1] };
  m = file.match(/^prompts\/([^/]+)\.md$/);
  if (m) return { kind: 'prompt', name: m[1] };
  if (SYSTEM_PROMPT_FILES.includes(file)) return { kind: 'system', name: file };
  return null;
}

/** Every prompt file in the repo, as repo-relative paths. */
function allPromptFiles() {
  const skills = reg.listSkillDirs().map(n => `plugins/us-stock-analysis/skills/${n}/SKILL.md`);
  const prompts = reg.listPromptNames().map(n => `prompts/${n}.md`);
  return [...skills, ...prompts, ...SYSTEM_PROMPT_FILES.filter(f => fs.existsSync(path.join(reg.ROOT, f)))];
}

module.exports = { SYSTEM_PROMPT_FILES, SIGNAL_FIELDS, MAX_DESCRIPTION_CHARS, estimateTokens, description, signalFields, contract, classify, allPromptFiles };
