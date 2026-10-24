#!/usr/bin/env node
/**
 * test-tooling.js — offline checks for the release and scaffolding tooling
 * (part of `npm test`).
 *
 *   1. scripts/lib/release.js on a temp copy of the three manifests + CHANGELOG:
 *      version arithmetic, every version field bumped, [Unreleased] stamped with
 *      the date, refusals (empty [Unreleased], duplicate section, bad version)
 *   2. release-dry-run.js runs against the real tree and reports the counts
 *      from scripts/lib/skill-registry.js
 *   3. the release workflow: one tag-triggered path, tests before publishing
 *   4. new-skill.js, run for real on a temp copy of the files it edits: the
 *      skill, its prompt and every index row appear, and the contract passes
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const rel = require('./lib/release');
const reg = require('./lib/skill-registry');

const ROOT = reg.ROOT;
let passed = 0, failed = 0;
const failures = [];
const check = (cond, msg, detail) => {
  if (cond) { passed++; process.stdout.write(`  ✅ ${msg}\n`); }
  else { failed++; failures.push(msg); process.stdout.write(`  ❌ ${msg}${detail !== undefined ? ` — got ${JSON.stringify(detail)}` : ''}\n`); }
};
const throws = (fn, re) => { try { fn(); return false; } catch (e) { return re.test(e.message); } };
const section = t => process.stdout.write(`\n━━━ ${t} ${'─'.repeat(Math.max(0, 55 - t.length))}\n`);

// ════════════════════════════════════════════════════════════════════════════
section('1. scripts/lib/release.js');
check(rel.nextVersion('1.13.0', 'patch') === '1.13.1', 'patch: 1.13.0 → 1.13.1');
check(rel.nextVersion('1.13.0', 'minor') === '1.14.0', 'minor: 1.13.0 → 1.14.0');
check(rel.nextVersion('1.13.4', 'major') === '2.0.0', 'major: 1.13.4 → 2.0.0');
check(rel.nextVersion('1.13.0', 'beta') === '1.13.0-beta.1', 'beta: 1.13.0 → 1.13.0-beta.1');
check(rel.nextVersion('1.14.0-rc.1', 'patch') === '1.14.0', 'patch on a prerelease drops the suffix');
check(rel.nextVersion('1.13.0', '1.20.0') === '1.20.0', 'an exact version is accepted');
check(throws(() => rel.nextVersion('1.13.0', 'huge'), /unknown release type/), 'unknown type refused');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'investskill-release-'));
try {
  for (const f of [...Object.values(rel.MANIFESTS), 'CHANGELOG.md']) {
    fs.mkdirSync(path.dirname(path.join(tmp, f)), { recursive: true });
    fs.copyFileSync(path.join(ROOT, f), path.join(tmp, f));
  }
  const before = rel.currentVersion(tmp);
  check(before === rel.currentVersion(ROOT), `temp copy starts at the repo version (${before})`);
  rel.bumpManifests(tmp, '9.8.7');
  check(Object.values(rel.versions(tmp)).every(v => v === '9.8.7'), 'bumpManifests: plugin.json, both marketplace fields and package.json all set', rel.versions(tmp));
  const pkgText = fs.readFileSync(path.join(tmp, 'package.json'), 'utf8');
  check(pkgText.endsWith('}\n') && pkgText.includes('\n  "version": "9.8.7"'), 'bumpManifests: 2-space JSON with a trailing newline');

  const cl = '# Changelog\n\n## [Unreleased]\n\n### Added\n- a thing\n\n## [1.0.0] - 2026-01-01\n\n- old\n';
  const stamped = rel.stampChangelog(cl, '1.1.0', '2026-10-24');
  check(/## \[Unreleased\]\n\n## \[1\.1\.0\] - 2026-10-24\n\n### Added\n- a thing/.test(stamped), 'stampChangelog: [Unreleased] → [1.1.0] - date, fresh empty [Unreleased] above it');
  check(rel.unreleasedNotes(stamped) === '', 'stampChangelog: the new [Unreleased] is empty');
  check(throws(() => rel.stampChangelog(stamped, '1.2.0', '2026-10-25'), /no \[Unreleased\] entries/), 'refuses a release with an empty [Unreleased]');
  check(throws(() => rel.stampChangelog(cl, '1.0.0', '2026-10-24'), /already has a \[1\.0\.0\]/), 'refuses a version that already has a section');
  check(throws(() => rel.bumpManifests(tmp, 'v2'), /not a version/), 'bumpManifests refuses a malformed version');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
const real = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');
check(/^## \[Unreleased\]/m.test(real), 'CHANGELOG.md keeps an [Unreleased] section for the release step to stamp');

// ════════════════════════════════════════════════════════════════════════════
section('2. release-dry-run.js');
const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'release-dry-run.js'), '--type', 'patch'], { cwd: ROOT, encoding: 'utf8' });
check(!/TypeError|ReferenceError|at Object\.<anonymous>/.test(r.stderr), 'dry run does not crash', r.stderr.slice(0, 200));
check(r.stdout.includes(`${reg.listSkillDirs().length} directories`) && r.stdout.includes(`${reg.frameworkCount()} advertised frameworks`), 'dry run reports skill and framework counts from the registry');

// ════════════════════════════════════════════════════════════════════════════
section('3. Release workflow');
const wfDir = path.join(ROOT, '.github', 'workflows');
const wf = fs.readFileSync(path.join(wfDir, 'release.yml'), 'utf8');
check(/push:\s*\n\s*tags:\s*\n\s*- 'v\*'/.test(wf), 'release.yml: triggered by v* tags only');
check(/npm test/.test(wf) && wf.indexOf('npm test') < wf.indexOf('action-gh-release'), 'release.yml: runs npm test before publishing');
check(/softprops\/action-gh-release@v2/.test(wf), 'release.yml: current action-gh-release major');
const publishers = fs.readdirSync(wfDir).filter(f => /\.ya?ml$/.test(f) && /action-gh-release|git tag /.test(fs.readFileSync(path.join(wfDir, f), 'utf8')));
check(publishers.length === 1 && publishers[0] === 'release.yml', 'only release.yml tags or publishes releases (no second release path)', publishers);

// ════════════════════════════════════════════════════════════════════════════
section('4. new-skill.js on a temp copy');
{
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'investskill-newskill-'));
  try {
    const copy = rel => fs.cpSync(path.join(ROOT, rel), path.join(sandbox, rel), { recursive: true });
    ['scripts', 'plugins', 'prompts', 'site/build', 'site/content/CHOOSE-A-SKILL.md', 'site/content/CHOOSE-A-SKILL-zh-TW.md',
      'README.md', 'README-zh-TW.md', 'GEMINI.md', '.cursor', '.github/copilot-instructions.md', 'CHANGELOG.md'].forEach(copy);
    const name = 'zz-smoke-skill';
    const res = spawnSync(process.execPath, [path.join(sandbox, 'scripts', 'new-skill.js'), name, '--category', 'meta',
      '--title', 'Smoke (Test) Skill', '--desc', 'A throwaway skill the tooling test creates', '--no-test'], { cwd: sandbox, encoding: 'utf8' });
    check(res.status === 0, 'new-skill.js exits 0', res.stderr.slice(0, 300));
    const has = (rel, needle) => fs.existsSync(path.join(sandbox, rel)) && fs.readFileSync(path.join(sandbox, rel), 'utf8').includes(needle);
    check(has(`plugins/us-stock-analysis/skills/${name}/SKILL.md`, 'description: A throwaway skill'), 'SKILL.md created from the contract template');
    check(has(`prompts/${name}.md`, '# Smoke (Test) Skill') && !has(`prompts/${name}.md`, 'description:'), 'prompt generated without frontmatter');
    check(has('site/build/build-site.js', `'${name}'`), 'added to SKILL_CATEGORIES');
    check(['site/content/CHOOSE-A-SKILL.md', 'site/content/CHOOSE-A-SKILL-zh-TW.md', 'README.md', 'README-zh-TW.md', 'GEMINI.md', '.cursor/rules/invest-skill.mdc', '.github/copilot-instructions.md', 'CHANGELOG.md']
      .every(f => has(f, name)), 'wired into Choose-a-Skill (EN + zh), both READMEs, the three cross-AI configs and CHANGELOG');
    check(!/⚠️/.test(res.stdout), 'no "add it by hand" warnings', res.stdout.split('\n').filter(l => l.includes('⚠️')));
    const contract = spawnSync(process.execPath, [path.join(sandbox, 'scripts', 'check-skill-contract.js'), '--json'], { cwd: sandbox, encoding: 'utf8' });
    let mine = [];
    try { mine = JSON.parse(contract.stdout).results.filter(r => r.skill === name); } catch { /* reported below */ }
    check(mine.length > 0 && mine.every(r => r.ok), 'the scaffolded skill passes the skill contract', mine.filter(r => !r.ok));
  } finally {
    fs.rmSync(sandbox, { recursive: true, force: true });
  }
}

process.stdout.write('\n' + '═'.repeat(60) + '\n  TOOLING TEST RESULTS\n' + '═'.repeat(60) + '\n');
process.stdout.write(`  ✅ Passed:   ${passed}\n  ❌ Failed:   ${failed}\n` + '═'.repeat(60) + '\n');
if (failed) process.stdout.write('\n  Failures:\n' + failures.map(f => `    • ${f}`).join('\n') + '\n\n');
process.exit(failed ? 1 : 0);
