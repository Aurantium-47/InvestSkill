/**
 * fences.js — markdown code-fence awareness shared by test-skills.js (fence
 * lint) and check-zh-parity.js (heading counts). Handles ``` and ~~~ fences of
 * any length, so a ```` block that shows a ``` example is one fence, not three.
 */

/** Walk a markdown text; call onLine(line, index, inFence) for every non-fence line. */
function walk(text, onLine) {
  const problems = [];
  let open = null;
  (text || '').split('\n').forEach((line, i) => {
    const m = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (m) {
      const [, marker, rest] = m;
      if (!open) { open = { marker, line: i + 1 }; return; }
      if (marker[0] === open.marker[0] && marker.length >= open.marker.length && !rest.trim()) { open = null; return; }
      if (marker === open.marker && /^[A-Za-z]/.test(rest.trim())) problems.push(`line ${i + 1}: \`${marker}${rest.trim()}\` opens a fence inside the one opened at line ${open.line}`);
      return;
    }
    if (onLine) onLine(line, i, !!open);
  });
  if (open) problems.push(`fence opened at line ${open.line} is never closed`);
  return problems;
}

/** Problems with the fences in a text: a fence opened inside another, or one never closed. */
const fenceProblems = text => walk(text);

/** The ## / ### headings outside code fences. */
function headings(text, re = /^#{2,3}\s/) {
  const out = [];
  walk(text, (line, i, inFence) => { if (!inFence && re.test(line)) out.push(line); });
  return out;
}

module.exports = { walk, fenceProblems, headings };
