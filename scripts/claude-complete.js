#!/usr/bin/env node
/**
 * claude-complete.js — an EVAL_CMD adapter for scripts/eval-skills.js that calls
 * the Claude API: prompt on stdin → completion text on stdout.
 *
 *   EVAL_CMD='node scripts/claude-complete.js' node scripts/eval-skills.js --skills stock-eval
 *
 * It is what the `LLM Eval` workflow runs, and works the same locally. It needs
 * the official SDK, which is *not* a project dependency (the plugin has no
 * runtime); CI installs it with `npm install --no-save @anthropic-ai/sdk`, the
 * same way the site build installs markdown-it.
 *
 * Environment:
 *   ANTHROPIC_API_KEY   credentials (or any source the SDK resolves)
 *   EVAL_MODEL          model ID (default claude-opus-5-5)
 *   EVAL_EFFORT         low | medium | high | xhigh | max (default medium — set
 *                       explicitly because it is the model's default too)
 *   EVAL_MAX_TOKENS     output ceiling (default 64000; streaming avoids HTTP timeouts)
 *
 * Exit codes: 0 completion printed · 2 setup problem (no SDK, no input) ·
 * 3 the model declined (stop_reason "refusal") · 4 API error.
 * A `max_tokens` stop still prints the (truncated) text, with a warning on
 * stderr, so eval-skills can report what the contract checks see.
 *
 * `--dry-run` prints the request it would send (without the prompt body) and
 * exits 0 without loading the SDK; scripts/test-llm-io.js uses it offline.
 */
const argv = process.argv.slice(2);
const MODEL = process.env.EVAL_MODEL || 'claude-opus-5-5';
const EFFORT = process.env.EVAL_EFFORT || 'medium';
const MAX_TOKENS = parseInt(process.env.EVAL_MAX_TOKENS || '64000', 10);
// Server-side refusal fallback, routed by refusal category (no pinned model).
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

/** The request body for a prompt (shared by --dry-run and the live call). */
function buildRequest(prompt) {
  return {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    output_config: { effort: EFFORT },
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    messages: [{ role: 'user', content: prompt }],
  };
}

/** Read all of stdin as a string. */
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const prompt = await readStdin();
  if (!prompt.trim()) { process.stderr.write('claude-complete: empty prompt on stdin\n'); process.exit(2); }

  if (argv.includes('--dry-run')) {
    const req = buildRequest('');
    req.messages = [{ role: 'user', content: `<${prompt.length} chars from stdin>` }];
    process.stdout.write(`${JSON.stringify({ ...req, stream: true }, null, 2)}\n`);
    return;
  }

  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch {
    process.stderr.write('claude-complete: @anthropic-ai/sdk is not installed — run `npm install --no-save @anthropic-ai/sdk`\n');
    process.exit(2);
  }
  const client = new (Anthropic.default || Anthropic)();

  let message;
  try {
    // Streaming: a full framework run can produce tens of thousands of tokens.
    message = await client.beta.messages.stream(buildRequest(prompt)).finalMessage();
  } catch (err) {
    const status = err && err.status ? ` ${err.status}` : '';
    process.stderr.write(`claude-complete: API error${status}: ${err && err.message ? err.message : err}\n`);
    process.exit(4);
  }

  // Check the stop reason before reading content.
  if (message.stop_reason === 'refusal') {
    const d = message.stop_details || {};
    process.stderr.write(`claude-complete: the model declined (category: ${d.category || 'n/a'})${d.explanation ? ` — ${d.explanation}` : ''}\n`);
    process.exit(3);
  }
  const text = message.content.filter(b => b.type === 'text').map(b => b.text).join('');
  if (message.stop_reason === 'max_tokens') process.stderr.write(`claude-complete: hit max_tokens (${MAX_TOKENS}); output is truncated\n`);
  const u = message.usage || {};
  process.stderr.write(`claude-complete: ${message.model} · ${u.input_tokens || 0} in / ${u.output_tokens || 0} out tokens · stop ${message.stop_reason}\n`);
  process.stdout.write(text);
}

if (require.main === module) main();

module.exports = { buildRequest, MODEL, EFFORT, MAX_TOKENS, FALLBACK_BETA };
