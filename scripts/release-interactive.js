#!/usr/bin/env node
/**
 * release-interactive.js — cut a release: bump, stamp, commit, tag, push.
 *
 *   npm run release                         # asks for the release type, confirms each step
 *   node scripts/release-interactive.js --type minor [--yes] [--no-push] [--skip-tests]
 *
 * What it does (CLAUDE.md › Version Consistency + Release Timing rules):
 *   1. refuses unless the tree is clean, the branch is main, and main is up to
 *      date with origin; [Unreleased] in CHANGELOG.md must have entries
 *   2. runs `npm run pre-release` (pre-release-check + validate + npm test)
 *   3. writes the new version into plugin.json, marketplace.json (metadata +
 *      plugin entry) and package.json; turns [Unreleased] into
 *      "## [X.Y.Z] - <today>"
 *   4. commits "chore(release): vX.Y.Z" and creates the annotated tag vX.Y.Z
 *   5. pushes main and the tag (asks first unless --yes; --no-push stops here)
 *
 * Pushing the tag triggers .github/workflows/release.yml, which re-runs the
 * tests, packages the plugin and publishes the GitHub Release from the
 * CHANGELOG section. Preview everything first with `npm run release:dry-run`.
 */
const path = require('path');
const { execFileSync } = require('child_process');
const readline = require('readline');
const rel = require('./lib/release');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const flag = k => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : undefined; };
const has = k => argv.includes(`--${k}`);

const c = { reset: '\x1b[0m', bright: '\x1b[1m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m', red: '\x1b[31m' };
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
const die = msg => { console.error(`\n${c.red}✗ ${msg}${c.reset}\n`); process.exit(1); };
const step = msg => console.log(`\n${c.blue}▸ ${msg}${c.reset}`);
const ok = msg => console.log(`${c.green}✓${c.reset} ${msg}`);

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(`${c.blue}?${c.reset} ${question} `, a => { rl.close(); resolve(a.trim()); }));
}
const confirm = async q => has('yes') || /^y(es)?$/i.test(await ask(`${q} (y/n)`));

async function main() {
  console.log(`\n${c.bright}InvestSkill release${c.reset}`);
  const current = rel.currentVersion(ROOT);
  console.log(`Current version: ${c.green}${current}${c.reset}`);

  step('Preconditions');
  if (git('status', '--porcelain')) die('working tree is not clean — commit or stash first');
  const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
  if (branch !== 'main') die(`releases are cut from main (on "${branch}") — merge the PR first`);
  git('fetch', '--quiet', 'origin', 'main', '--tags');
  if (git('rev-parse', 'HEAD') !== git('rev-parse', 'origin/main')) die('main is not identical to origin/main — pull or push first');
  const notes = rel.unreleasedNotes(require('fs').readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8'));
  if (!notes) die('CHANGELOG.md [Unreleased] is empty — nothing to release');
  ok(`clean main at ${git('rev-parse', '--short', 'HEAD')}, [Unreleased] has ${notes.split('\n').filter(l => /^- /.test(l)).length} entries`);

  let type = flag('type');
  if (!type) {
    console.log('\n  patch — fixes, doc/site tweaks, prompt refinements');
    console.log('  minor — a new skill or a meaningful new capability');
    console.log('  major — breaking changes to skill names, output contracts or layout');
    type = await ask('Release type (patch / minor / major / beta / rc, or an exact version):');
  }
  let version;
  try { version = rel.nextVersion(current, type); } catch (e) { die(e.message); }
  const tag = `v${version}`;
  if (git('tag', '-l', tag)) die(`tag ${tag} already exists`);
  const date = rel.today();
  console.log(`\n  ${current} → ${c.green}${version}${c.reset}  ·  CHANGELOG [${version}] - ${date}  ·  tag ${tag}`);
  if (!(await confirm('Proceed?'))) die('cancelled');

  if (!has('skip-tests')) {
    step('npm run pre-release');
    try { execFileSync('npm', ['run', 'pre-release', '--silent'], { cwd: ROOT, stdio: 'inherit' }); } catch { die('pre-release checks failed — nothing was changed'); }
  }

  step('Bump and stamp');
  const files = [...rel.bumpManifests(ROOT, version), rel.releaseChangelog(ROOT, version, date)];
  files.forEach(f => ok(f));

  step('Commit and tag');
  git('add', ...files);
  git('commit', '-m', `chore(release): ${tag}`);
  git('tag', '-a', tag, '-m', `InvestSkill ${tag}`);
  ok(`commit ${git('rev-parse', '--short', 'HEAD')} and tag ${tag}`);

  if (has('no-push')) {
    console.log(`\n${c.yellow}Not pushed.${c.reset} When ready: git push origin main ${tag}`);
    return;
  }
  if (!(await confirm(`Push main and ${tag} to origin? (this publishes the release)`))) {
    console.log(`\n${c.yellow}Not pushed.${c.reset} When ready: git push origin main ${tag}`);
    return;
  }
  step('Push');
  execFileSync('git', ['push', 'origin', 'main', tag], { cwd: ROOT, stdio: 'inherit' });
  ok(`pushed — .github/workflows/release.yml now publishes ${tag}`);
}

main().catch(e => die(e.message));
