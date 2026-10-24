# InvestSkill — Where It Is Listed

*Checked 2026-10-24 at v1.13.0. Re-check the links before quoting them — third-party directories change without notice.*

> **Scope.** Which LLM platforms and plugin directories list InvestSkill today, how each listing got there, and what is needed to get into Anthropic's official directory. For release history see [DEPLOYMENTS.md](../DEPLOYMENTS.md); for per-platform install steps see the `README-*.md` files.

---

## 1. Summary

| Where | Status | Notes |
|-------|--------|-------|
| Our own Claude Code marketplace (`invest-skill`) | ✅ Live | `/plugin marketplace add yennanliu/InvestSkill` → `/plugin install us-stock-analysis@invest-skill` |
| Third-party Claude plugin directories | ✅ Listed | Indexed automatically from GitHub — see §2 |
| Anthropic official directory ([claude.ai/directory](https://claude.ai/directory), backed by [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)) | ❌ Not listed | Not among the 315 plugins in its `marketplace.json`. How to submit — §3 |
| Anthropic skills repo ([anthropics/skills](https://github.com/anthropics/skills)) | ❌ Not listed | Anthropic-maintained examples; not a submission channel |
| OpenAI ChatGPT GPT Store | ❌ Not listed | No public GPT exists. ChatGPT users paste `prompts/*.md` |
| Gemini CLI, Cursor, GitHub Copilot | n/a — no store | Loaded from the repo's own files (`GEMINI.md`, `.cursor/rules/invest-skill.mdc`, `.github/copilot-instructions.md`) or via `install.sh -a <agent>` |

"Published" in [DEPLOYMENTS.md](../DEPLOYMENTS.md) means *released in this repo*, not *listed in a vendor store*.

## 2. Third-party directories

None of these were submitted by us — there is no submission in the repo's commits, issues, or PRs. Directories such as ClaudePluginHub crawl GitHub for repositories containing `.claude-plugin/plugin.json` / `marketplace.json` and list them automatically ("Auto-discovery also scans GitHub regularly"). The listings update themselves from `main`.

| Directory | Link | Verified 2026-10-24 |
|-----------|------|---------------------|
| ClaudePluginHub — plugin | <https://www.claudepluginhub.com/plugins/yennanliu-us-stock-analysis-plugins-us-stock-analysis> | ✅ v1.13.0, 34 skills, install `npx claudepluginhub yennanliu/investskill --plugin us-stock-analysis` |
| ClaudePluginHub — per-skill page (example) | <https://www.claudepluginhub.com/skills/yennanliu-us-stock-analysis-plugins-us-stock-analysis/research-bundle> | ✅ Skill pages indexed individually |
| Awesome Claude Plugins | <https://awesomeclaudeplugins.com/yennanliu/InvestSkill> | ✅ Repo listed; plugin list did not render |
| agentskill.sh | <https://agentskill.sh/plugins/yennanliu/us-stock-analysis> | ⚠️ In search results, but the page returned an error — unverified |

**Name collision.** Several unrelated plugins by other authors are also named `us-stock-analysis` on these sites. When linking, use a URL that contains `yennanliu`.

## 3. Getting into Anthropic's official directory

The official directory takes submissions through the developer portal — there is no PR or form against `claude-plugins-official`. Docs: [Publish to the directory](https://claude.com/docs/directory/publish), [Pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist), [Submit your plugin](https://claude.com/docs/plugins/submit).

### Who can submit

- A claude.ai **Pro, Max, Team, or Enterprise** account (not Free), with **GitHub connected** on claude.ai.
- The connected GitHub account must have **push access** to `yennanliu/InvestSkill`. The listing belongs to the claude.ai organization that submits first, so submit from the account that should own it long term.

### Readiness (`claude plugin validate ./plugins/us-stock-analysis`)

| Check | Status |
|-------|--------|
| `plugin.json` schema, `name` / `description` / `author` / `version` | ✅ |
| License (`"license": "MIT"` in `plugin.json`) | ✅ |
| README ≥ 40 words in the plugin folder | ✅ `plugins/us-stock-analysis/README.md` — rewritten with this doc (the old one listed 6 of 34 skills), since the directory shows it as the listing description |
| ≤ 512 files, every file < 256 KiB, text only, no `.DS_Store` / symlinks | ✅ 36 files, all Markdown/JSON |
| No hooks, MCP servers, launchers, or credentials | ✅ Prompt files only — security scan has nothing to execute |
| Icon | ⚠️ Warning only. Optional square PNG, 512–2048 px, at `.claude-plugin/icon.png`. It is taken **only on the first save** in the portal, so add it before submitting if we want one |
| Name `us-stock-analysis` | ⚠️ Generic words; other authors use the same name elsewhere. Could be **held for a reviewer** ("Name may be confused with an existing listing"). Setting a `displayName` such as "InvestSkill — US Stock Analysis" helps without changing the install slug |

### Steps

1. Open [claude.ai/directory/manage](https://claude.ai/directory/manage) → **Submit new** → **Plugin bundle**.
2. **Source:** Repository `yennanliu/InvestSkill`, Plugin path `plugins/us-stock-analysis`, Branch `main`. Select **Validate** and fix anything marked **Blocking**.
3. **Listing details:** read from `plugin.json` and the plugin README — edit those in the repo, not in the portal.
4. **Data handling:** no personal data read or stored; no data sent to other services; no retention; not intended for people under 18.
5. **Compliance:** confirm the contact email and the four acknowledgements.
6. **Review and submit:** keep **GitHub push webhook** (needs repo admin) so new releases on `main` are picked up, then **Submit for review**.
7. When the version passes, select **Publish**; an Anthropic reviewer publishes the first version. Track status under **Submissions**.

After it is listed, every merge to `main` becomes a new scanned version — bump `version` in `plugin.json` with each release, as the [Version Consistency Rule](../CLAUDE.md) already requires.

## 4. Other platforms

- **ChatGPT** — the GPT Store lists custom GPTs, not prompt files. A listing would mean building a public GPT (instructions from `prompts/stock-eval.md` or a router over several prompts) under a verified builder profile. Not planned; the universal `prompts/` files already work in ChatGPT.
- **Gemini, Cursor, Copilot** — no central store for instruction files; the repo files and `install.sh` are the distribution channel.
