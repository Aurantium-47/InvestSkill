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

Submission happens in Anthropic's developer portal, not by a PR to `claude-plugins-official`. It needs a paid claude.ai account with GitHub connected and push access to this repo. The full step-by-step guide, the readiness checklist and what to enter on each screen are in **[ANTHROPIC-DIRECTORY-ONBOARDING.md](ANTHROPIC-DIRECTORY-ONBOARDING.md)**.

## 4. Other platforms

- **ChatGPT** — the GPT Store lists custom GPTs, not prompt files. A listing would mean building a public GPT (instructions from `prompts/stock-eval.md` or a router over several prompts) under a verified builder profile. Not planned; the universal `prompts/` files already work in ChatGPT.
- **Gemini, Cursor, Copilot** — no central store for instruction files; the repo files and `install.sh` are the distribution channel.
