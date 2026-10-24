# InvestSkill Release Quick Reference

How a release is cut. The rules behind it (which number to bump, when to tag) are the Version Consistency and Release Timing rules in [CLAUDE.md](CLAUDE.md).

## The Short Version

```bash
git checkout main && git pull         # releases are cut from an up-to-date main, after the PR is merged
npm run release:dry-run               # preview: next version, files touched, CHANGELOG section
npm run release                       # bump → stamp CHANGELOG → commit → tag → push (asks before pushing)
```

Pushing the tag `vX.Y.Z` triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which publishes the GitHub Release. Nothing else needs to happen by hand.

## What `npm run release` Does

`scripts/release-interactive.js`:

1. **Checks preconditions** — the working tree is clean, the branch is `main`, `main` is identical to `origin/main`, and `CHANGELOG.md` has entries under `## [Unreleased]`.
2. **Runs `npm run pre-release`** — `pre-release-check` + `validate` + `npm test`.
3. **Bumps the version in all three manifests** — `plugins/us-stock-analysis/.claude-plugin/plugin.json` (`version`), `.claude-plugin/marketplace.json` (`metadata.version` **and** the plugin entry's `version`), and `package.json` (`version`).
4. **Stamps the CHANGELOG** — `## [Unreleased]` becomes `## [X.Y.Z] - <today>`.
5. **Commits** `chore(release): vX.Y.Z` and creates the annotated tag `vX.Y.Z`.
6. **Pushes** `main` and the tag, after asking.

Flags: `--type patch|minor|major` skips the prompt, `--yes` answers yes to every confirmation, `--no-push` stops after the local commit and tag, `--skip-tests` skips step 2 (don't use it for a real release).

## What `release.yml` Does

On a pushed `v*` tag:

1. Runs `npm test`.
2. Validates the JSON manifests.
3. Extracts the `## [X.Y.Z]` section of `CHANGELOG.md` as the release notes.
4. Packages the tarballs (`invest-skill-marketplace-X.Y.Z.tar.gz`, `us-stock-analysis-X.Y.Z.tar.gz`) and `checksums.txt`.
5. Creates the GitHub Release `vX.Y.Z` with those notes and artifacts.

Every platform picks the release up from the repository itself: Claude Code through the marketplace (`/plugin marketplace update invest-skill`), every other agent through `install.sh` (which installs from `main`, or from a tag with `-r vX.Y.Z`).

## Before You Release

- [ ] The changes are merged to `main` and CI is green
- [ ] Every change is listed under `## [Unreleased]` in `CHANGELOG.md` (keep the date off — the release step stamps it)
- [ ] `npm run pre-release` passes locally
- [ ] Counts and docs are current (`npm test` enforces the framework counts; see the Framework Count Rule in CLAUDE.md)
- [ ] `npm run release:dry-run` shows the version you expect

## Which Number to Bump

| Change | Bump | Example |
|--------|------|---------|
| New skill / framework, or a meaningful new capability | MINOR | 1.13.0 → 1.14.0 |
| Fixes, doc / site tweaks, prompt refinements with no new skill | PATCH | 1.14.0 → 1.14.1 |
| Breaking change to skill names, the output contract, or the plugin layout | MAJOR | 1.x → 2.0.0 |

Batch small changes into one coherent release rather than tagging every commit. Feature branches may bump the manifest version (tests require CHANGELOG ↔ manifest parity), but the **tag waits for the release** — never tag ahead of the merge.

## Verify a Release

```bash
# The three manifests agree
jq '.version' plugins/us-stock-analysis/.claude-plugin/plugin.json
jq '.metadata.version, .plugins[0].version' .claude-plugin/marketplace.json
jq '.version' package.json
```

- **Actions**: https://github.com/yennanliu/InvestSkill/actions — the `Release` run for the tag is green.
- **Release page**: https://github.com/yennanliu/InvestSkill/releases — `vX.Y.Z` with the CHANGELOG section, both tarballs and `checksums.txt`.

## If Something Goes Wrong

**The release workflow failed.** Fix the cause on `main` in a normal PR. Then move the tag to the fixed commit — or, simpler and safer, cut the next patch release.

**You tagged by mistake and nothing was published yet:**
```bash
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z
```
Then revert the `chore(release)` commit with a normal PR. Once a GitHub Release exists, prefer a new patch release over rewriting history.

**Version drift reported by `npm test`:** one of the three manifests was edited by hand. Set all three to the same value (or let `npm run release` do it).

## Script Reference

| Command | What it does |
|---------|--------------|
| `npm run release` | Interactive release (`scripts/release-interactive.js`) |
| `npm run release:dry-run` | Preview without changing anything (`scripts/release-dry-run.js`) |
| `npm run pre-release` | `pre-release-check` + `validate` + `npm test` |
| `npm test` | Every offline suite: structure and counts, skill contract, prompt sync, LLM I/O, EDGAR helpers, install script |

See [CI-CD-GUIDE.md](CI-CD-GUIDE.md) for every workflow.
