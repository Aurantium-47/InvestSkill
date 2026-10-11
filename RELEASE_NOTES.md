## InvestSkill v1.13.0

**30 Professional Investment Analysis Frameworks** · 34 skills · 7 platforms · no API keys, no runtime, no telemetry

Released 2026-10-11. Prompts are now tested like code, and every demo is a real, reproducible run with screenshots of the actual output.

## What's New

**🧪 LLM checks in CI** — a new `LLM Eval` workflow runs on every PR that touches a skill, a prompt, a cross-AI system prompt, or the eval machinery:
- **Offline, in `npm test`:** 12 unedited real model outputs must pass the output contract, broken variants must fail for the right reason, every prompt must close with the standard signal block (followed only by the guide lines, one note and the Disclaimer), skill descriptions stay short, and each prompt stays within 25% of its size budget (`scripts/test-llm-io.js`)
- **Prompt diff in the job summary:** changed prompts, token deltas, description changes and contract status (`scripts/prompt-diff.js`)
- **Live eval:** the changed skills run through Claude on the fictional ZEPH data pack and fail the job on any contract violation (`scripts/claude-complete.js`, on the official SDK). Needs an `ANTHROPIC_API_KEY` repository secret, scoped to the eval step; skipped, not failed, without it

**🎬 Real demos, step by step** — a new **Live Walkthrough** (English + 繁體中文) runs `stock-eval` → `bear-case` → `fact-check` → `learning-coach` on Microsoft. Every demo (META, NVDA, AMD, PLTR, RKLB) was re-run on 2026-10-11 against fresh SEC filings and rebuilt as command → screenshot → what to notice → result, with the full unedited outputs. The Demo Overview is now a hub in both languages.

**📊 More accurate SEC data packs** — `fetch-fundamentals` now counts debt tagged only in `LongTermDebt` (Rocket Lab's convertible notes), rebuilds SG&A from separate selling and G&A lines, uses continuing-operations cash flow for FCF, reports net cash including short-term investments, and labels where the share count came from. Commercial paper and short-term borrowings are named in the Notes.

**⚖️ One rule for conflicting sources** — all 28 analysis skills now say what to do when two sources disagree: prefer the primary source, then the most recent; show both values with dates; say which was used; never average.

**🔧 Contract fixes** — `catalyst-calendar` and `stock-screener` now close with the standard Investment Signal block; the output parser understands Traditional Chinese outputs and validates `fact-check` by its own rules; `full-report` no longer runs alias stubs as modules; and a prompt audit removed dated patterns written for older models.

## Quick Start

### Claude Code
```bash
/plugin marketplace add yennanliu/InvestSkill
/plugin install us-stock-analysis
/us-stock-analysis:stock-eval AAPL
```

### Any agent via the installer
```bash
curl -fsSL https://raw.githubusercontent.com/yennanliu/InvestSkill/main/install.sh | bash -s -- -a cursor
```

### Cursor
Rules auto-load in Cursor AI Chat (Cmd+K):
```
@prompts/stock-eval.md Evaluate Apple (AAPL)
```

### Gemini CLI
In project directory:
```bash
gemini
> @prompts/stock-eval.md Evaluate Apple (AAPL)
```

## Platform Availability

| Platform | Status | Installation | Documentation |
|----------|--------|---------------|----------------|
| Claude Code | ✅ Available | `/plugin install us-stock-analysis` or `install.sh -a claude` | [README-claude-code.md](README-claude-code.md) |
| Cursor IDE | ✅ Available | Auto-loads from `.cursor/rules/invest-skill.mdc` or `install.sh -a cursor` | [README-cursor.md](README-cursor.md) |
| Gemini CLI | ✅ Available | Auto-loads from `GEMINI.md` or `install.sh -a gemini` | [README-gemini.md](README-gemini.md) |
| GitHub Copilot | ✅ Available | Auto-loads from `.github/copilot-instructions.md` or `install.sh -a copilot` | [README.md](README.md) |
| Codex / OpenCode | ✅ Available | `install.sh -a codex` / `-a opencode` (writes `AGENTS.md`) | [README.md](README.md) |
| Universal (ChatGPT, Claude.ai, Ollama, …) | ✅ Available | `install.sh -a any` or copy prompts from `prompts/` | [README-ollama.md](README-ollama.md) |

## Download & Verify

All releases include checksums for verification:

```bash
# Download artifacts
tar xzf invest-skill-marketplace-1.13.0.tar.gz

# Verify checksums
sha256sum -c checksums.txt
```

**Artifacts:**
- `invest-skill-marketplace-1.13.0.tar.gz` — Full marketplace (all platforms)
- `us-stock-analysis-1.13.0.tar.gz` — Claude Code plugin only
- `checksums.txt` — SHA-256 verification file

## Full Changelog

See [CHANGELOG.md → 1.13.0](CHANGELOG.md#1130---2026-10-11) for every entry.

**Upgrade notes**
- No breaking changes. Skill names, the signal block, and the plugin layout are unchanged.
- `catalyst-calendar` and `stock-screener` outputs now end with the standard six-field signal block; their catalyst / screening summary moves to plain lines just above it.
- Data packs gain `short_term_investments_m` and `net_debt_incl_investments_m`; regenerate existing packs to pick up the debt, SG&A and cash-flow fixes.
- To enable the live eval on your fork, add an `ANTHROPIC_API_KEY` repository secret.
