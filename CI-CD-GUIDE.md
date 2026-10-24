# InvestSkill CI/CD Guide

What runs in GitHub Actions, when, and how a release reaches every platform.

InvestSkill is a prompt-engineering plugin with no runtime, so CI checks the prompts and the docs around them: structure, the output contract, counts, the installer, the site, and — when a key is available — live model output.

---

## Workflows at a Glance

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| [`ci.yml`](.github/workflows/ci.yml) | every push and pull request | `npm ci` → `npm test` → `npm run build:site` → `node scripts/check-links.js` |
| [`install-script.yml`](.github/workflows/install-script.yml) | PRs, and pushes that touch the installer, prompts, skills or the docs it checks | shellcheck, the install-script test suite, real installs per agent |
| [`llm-eval.yml`](.github/workflows/llm-eval.yml) | PRs that touch a skill, a prompt, a cross-AI config or the eval machinery; manual dispatch | offline output-contract checks, prompt diff, live eval through Claude |
| [`release.yml`](.github/workflows/release.yml) | a pushed `v*` tag | tests, packages, GitHub Release |
| [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) | push to `main`; manual dispatch | builds `site/` and deploys it to GitHub Pages |
| [`site-review.yml`](.github/workflows/site-review.yml) | daily schedule; manual dispatch | automated site review → `qa/site_review_YYYYMMDD.md` |

`greetings.yml` and `label-pr.yml` only welcome first-time contributors and label PRs.

---

## `ci.yml` — the main check

One job on every push and PR:

1. `npm ci`
2. `npm test` — every offline suite:
   - `scripts/test-skills.js` — structure, frontmatter, version parity across the three manifests, CHANGELOG ↔ manifest version, framework and skill counts in every doc that states them, cross-AI config completeness, alias redirects
   - `scripts/check-skill-contract.js` — every analysis skill has the Data Verification gate, the `Data & Sources` header, Thesis Invalidation, the signal block and the disclaimer
   - `scripts/sync-prompts.js --check` — `prompts/` matches what `SKILL.md` generates
   - `scripts/test-llm-io.js` — golden outputs, broken-output mutations, prompt closing order, description length, prompt-size budgets, the eval harness
   - `scripts/test-edgar.js` — the bring-your-own-data helpers, against a fetch double (no network)
   - `scripts/test-install.js` — `install.sh` static checks and sandboxed runs
3. `npm run build:site` — the site builds
4. `node scripts/check-links.js` — no broken internal links in the built site

Reproduce locally with the same commands; `npm run pre-release` adds `pre-release-check` and `validate` on top of `npm test`.

## `install-script.yml` — the installer

- `shellcheck --severity=warning --shell=bash install.sh`
- `node scripts/test-install.js` — agent-list parity between `install.sh` and `site/build/build-site.js`, the never-overwrite and idempotency guarantees, `rm -rf` limited to the script's own temp directory, and the documented curl commands in `README*.md` and `site/content/COOKBOOK*.md`
- real installs for each agent from a tarball of the working tree

See the Install Script Rule in [CLAUDE.md](CLAUDE.md).

## `llm-eval.yml` — prompts in, output out

1. **Offline** — `scripts/test-llm-io.js` (also part of `npm test`).
2. **Prompt diff** — `scripts/prompt-diff.js` writes changed prompts, token deltas, description changes and contract status to the job summary.
3. **Live eval** — up to four changed single-ticker skills run through Claude on the fictional ZEPH data pack (`scripts/claude-complete.js`), scored by `scripts/eval-skills.js`; a hard contract failure fails the job. It needs the `ANTHROPIC_API_KEY` repository secret, exposed to the eval step only, and is **skipped, not failed**, without it (fork PRs). Manual dispatch takes `skills`, `all` and `model`.

See the LLM Eval Rule in [CLAUDE.md](CLAUDE.md).

## `release.yml` — publishing a release

Runs when a tag `vX.Y.Z` is pushed (by `npm run release`):

1. `npm test`
2. Validates the JSON manifests
3. Extracts the `## [X.Y.Z]` section of `CHANGELOG.md` as release notes
4. Packages `invest-skill-marketplace-X.Y.Z.tar.gz`, `us-stock-analysis-X.Y.Z.tar.gz` and `checksums.txt`
5. Creates the GitHub Release

The tag itself is created by `npm run release` (`scripts/release-interactive.js`), which bumps the version in `plugin.json`, both fields of `marketplace.json` and `package.json`, stamps the CHANGELOG, commits `chore(release): vX.Y.Z`, tags, and pushes after confirmation. Step by step: [RELEASE-QUICK-REFERENCE.md](RELEASE-QUICK-REFERENCE.md).

## `deploy-pages.yml` — the site

On every push to `main`, builds the site with `site/build/build-site.js` and deploys `_site/` to GitHub Pages at https://yennj12.js.org/InvestSkill. `_site/` is gitignored — commit the sources in `site/`, never built HTML. See the Site Update Rule in [CLAUDE.md](CLAUDE.md).

## `site-review.yml` — daily QA

Runs `scripts/site-review.js --only-on-change` once a day and commits `qa/site_review_YYYYMMDD.md`. Only the last five days of reports are kept; `qa/PROJECT-REVIEW.md` is never pruned. See the QA Report Retention Rule in [CLAUDE.md](CLAUDE.md).

---

## How a Release Reaches Each Platform

There is no per-platform publishing step: every platform reads the repository.

| Platform | Picks up a release via |
|----------|------------------------|
| Claude Code | the plugin marketplace (`/plugin marketplace update invest-skill`), which reads `.claude-plugin/marketplace.json` on `main` |
| Cursor, Copilot, Gemini CLI, Codex, OpenCode, any LLM | `install.sh`, which downloads `main` (or a tag with `-r vX.Y.Z`) |
| Anyone downloading files | the GitHub Release tarballs and checksums |

---

## Debugging

**`npm test` fails in CI but not locally.** Run `npm ci` first so you match CI's dependencies, then `npm test`. The failing check prints the file and the claim it found.

**Version drift.** The three manifests disagree:
```bash
jq '.version' plugins/us-stock-analysis/.claude-plugin/plugin.json
jq '.metadata.version, .plugins[0].version' .claude-plugin/marketplace.json
jq '.version' package.json
```

**Broken links.** `npm run check:links` builds the site and lists every broken internal link with its source page.

**Live eval skipped.** Expected on forks and when the `ANTHROPIC_API_KEY` secret isn't set.

**Workflow logs.** https://github.com/yennanliu/InvestSkill/actions

---

## Extending CI

- **A new test** — add it to an existing suite under `scripts/` that `npm test` already runs, so `ci.yml`, `release.yml` and local runs all pick it up.
- **A new platform** — add the agent to `install.sh` (four places, see the Install Script Rule) and to `INSTALL_TARGETS` in `site/build/build-site.js`; `test-install.js` checks the parity.
- **A new workflow** — keep `permissions` read-only unless the job must write, and expose secrets only to the step that needs them.
