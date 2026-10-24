/**
 * release.js — the file edits a release makes, shared by release-interactive.js
 * (does them), release-dry-run.js (previews them) and test-release.js (tests
 * them on a temp copy). Pure functions over a repo root; no git, no network.
 *
 * A release, per CLAUDE.md (Version Consistency + Release Timing rules):
 *   1. one version in plugin.json, marketplace.json (metadata + plugin entry)
 *      and package.json
 *   2. CHANGELOG "## [Unreleased]" becomes "## [X.Y.Z] - YYYY-MM-DD" with the
 *      actual release date, and a fresh empty [Unreleased] goes above it
 *   3. commit + tag vX.Y.Z (done by the caller, not here)
 */
const fs = require('fs');
const path = require('path');

const MANIFESTS = {
  plugin: 'plugins/us-stock-analysis/.claude-plugin/plugin.json',
  marketplace: '.claude-plugin/marketplace.json',
  package: 'package.json',
};

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-((?:alpha|beta|rc)\.\d+))?$/;

function readJSON(root, rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
}

/** Every version field the Version Consistency Rule covers. */
function versions(root) {
  const plugin = readJSON(root, MANIFESTS.plugin);
  const market = readJSON(root, MANIFESTS.marketplace);
  const pkg = readJSON(root, MANIFESTS.package);
  const entry = (market.plugins || []).find(p => p.name === plugin.name) || {};
  return {
    'plugin.json': plugin.version,
    'marketplace.json metadata': market.metadata && market.metadata.version,
    'marketplace.json plugin entry': entry.version,
    'package.json': pkg.version,
  };
}

function currentVersion(root) {
  const v = [...new Set(Object.values(versions(root)))];
  if (v.length !== 1) throw new Error(`version fields disagree: ${JSON.stringify(versions(root))}`);
  return v[0];
}

/** "1.13.0" + "minor" → "1.14.0"; prerelease types append -beta.1 / -rc.1. */
function nextVersion(version, type) {
  const m = version.match(SEMVER);
  if (!m) throw new Error(`not a version: ${version}`);
  let [major, minor, patch] = m.slice(1, 4).map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  if (type === 'patch') return m[4] ? `${major}.${minor}.${patch}` : `${major}.${minor}.${patch + 1}`;
  if (type === 'beta' || type === 'rc') return `${major}.${minor}.${patch}-${type}.1`;
  if (SEMVER.test(type)) return type;        // an explicit version
  throw new Error(`unknown release type: ${type}`);
}

/** Write `version` into every manifest field; JSON formatting is preserved (2-space). */
function bumpManifests(root, version) {
  if (!SEMVER.test(version)) throw new Error(`not a version: ${version}`);
  const edit = (rel, fn) => {
    const j = readJSON(root, rel);
    fn(j);
    fs.writeFileSync(path.join(root, rel), `${JSON.stringify(j, null, 2)}\n`);
  };
  let pluginName;
  edit(MANIFESTS.plugin, j => { j.version = version; pluginName = j.name; });
  edit(MANIFESTS.marketplace, j => {
    j.metadata.version = version;
    for (const p of j.plugins || []) if (p.name === pluginName) p.version = version;
  });
  edit(MANIFESTS.package, j => { j.version = version; });
  return Object.values(MANIFESTS);
}

/** The text of the [Unreleased] section (without its heading), or null. */
function unreleasedNotes(changelog) {
  const m = changelog.match(/^## \[Unreleased\][^\n]*\n([\s\S]*?)(?=^## \[)/m);
  return m ? m[1].trim() : null;
}

/**
 * Turn [Unreleased] into the release section. Refuses an empty [Unreleased]
 * (a release with nothing in it) and a version that already has a section.
 */
function stampChangelog(changelog, version, date) {
  if (new RegExp(`^## \\[${version.replace(/\./g, '\\.')}\\]`, 'm').test(changelog)) {
    throw new Error(`CHANGELOG.md already has a [${version}] section`);
  }
  const notes = unreleasedNotes(changelog);
  if (!notes) throw new Error('CHANGELOG.md has no [Unreleased] entries to release');
  return changelog.replace(/^## \[Unreleased\][^\n]*\n/m, `## [Unreleased]\n\n## [${version}] - ${date}\n`);
}

function releaseChangelog(root, version, date) {
  const file = path.join(root, 'CHANGELOG.md');
  fs.writeFileSync(file, stampChangelog(fs.readFileSync(file, 'utf8'), version, date));
  return 'CHANGELOG.md';
}

const today = () => new Date().toISOString().slice(0, 10);

module.exports = {
  MANIFESTS, SEMVER, versions, currentVersion, nextVersion, bumpManifests,
  unreleasedNotes, stampChangelog, releaseChangelog, today,
};
