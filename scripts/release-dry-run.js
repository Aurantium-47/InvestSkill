#!/usr/bin/env node
/**
 * release-dry-run.js — preview a release without changing anything.
 *
 *   npm run release:dry-run                  # assumes a minor release
 *   node scripts/release-dry-run.js --type patch
 *
 * Shows the version change, the files `npm run release` would edit, the
 * CHANGELOG section it would publish, the skill/framework counts, recent tags,
 * and anything that would make the release refuse to run. Exit code 1 when a
 * precondition fails, so it doubles as a pre-flight check.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const rel = require('./lib/release');
const reg = require('./lib/skill-registry');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const i = argv.indexOf('--type');
const type = i >= 0 ? argv[i + 1] : 'minor';

const c = { reset: '\x1b[0m', bright: '\x1b[1m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', red: '\x1b[31m' };
const git = (...args) => { try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { return ''; } };
const problems = [];

console.log(`\n${c.bright}Release dry run${c.reset} (nothing is changed)\n`);

const fields = rel.versions(ROOT);
const distinct = [...new Set(Object.values(fields))];
if (distinct.length !== 1) problems.push(`version fields disagree: ${JSON.stringify(fields)}`);
const current = distinct[0];
let next = '?';
try { next = rel.nextVersion(current, type); } catch (e) { problems.push(e.message); }
console.log(`  Version:     ${current} → ${c.green}${next}${c.reset} (${type})`);
console.log(`  Tag:         v${next}${git('tag', '-l', `v${next}`) ? `  ${c.red}(already exists)${c.reset}` : ''}`);
if (git('tag', '-l', `v${next}`)) problems.push(`tag v${next} already exists`);
console.log(`  Date:        ${rel.today()}`);

const skills = reg.listSkillDirs();
console.log(`  Skills:      ${skills.length} directories · ${reg.frameworkCount()} advertised frameworks · ${reg.listPromptNames().length} prompts`);
if (skills.length !== reg.listPromptNames().length) problems.push('skill directories and prompts/ differ — run node scripts/sync-prompts.js');

console.log('\n  Files `npm run release` edits:');
Object.values(rel.MANIFESTS).concat('CHANGELOG.md').forEach(f => console.log(`    • ${f}`));

const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');
const notes = rel.unreleasedNotes(changelog);
if (!notes) problems.push('CHANGELOG.md [Unreleased] is empty');
else {
  try { rel.stampChangelog(changelog, next, rel.today()); } catch (e) { problems.push(e.message); }
  const lines = notes.split('\n');
  console.log(`\n  Release notes ([Unreleased] → [${next}], ${lines.filter(l => /^- /.test(l)).length} entries):`);
  lines.slice(0, 25).forEach(l => console.log(`    ${l}`));
  if (lines.length > 25) console.log(`    … ${lines.length - 25} more lines`);
}

const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const dirty = git('status', '--porcelain');
console.log(`\n  Branch:      ${branch}${branch === 'main' ? '' : `  ${c.yellow}(releases are cut from main)${c.reset}`}`);
console.log(`  Tree:        ${dirty ? `${c.yellow}uncommitted changes${c.reset}` : 'clean'}`);
console.log(`  Recent tags: ${git('tag', '-l', 'v*', '--sort=-version:refname').split('\n').filter(Boolean).slice(0, 5).join(', ') || '(none)'}`);

console.log(`\n  After the tag is pushed: ${c.cyan}.github/workflows/release.yml${c.reset} runs npm test, packages`);
console.log(`  invest-skill-marketplace-${next}.tar.gz + us-stock-analysis-${next}.tar.gz + checksums,`);
console.log('  and publishes the GitHub Release with the CHANGELOG section above.');

if (problems.length) {
  console.log(`\n${c.red}Would refuse:${c.reset}`);
  problems.forEach(p => console.log(`  ✗ ${p}`));
  process.exit(1);
}
const advisories = [branch !== 'main' && 'switch to main', dirty && 'commit or stash changes'].filter(Boolean);
console.log(`\n${c.green}✓ Ready${c.reset}${advisories.length ? ` once you ${advisories.join(' and ')}` : ''} — run ${c.bright}npm run release${c.reset}\n`);
