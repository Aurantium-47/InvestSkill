## InvestSkill v1.14.0

**34 Professional Investment Analysis Frameworks** · 38 skills · 7 platforms · no API keys, no runtime, no telemetry

Released 2026-10-24. Four new frameworks, a machine-readable footer on every output, and every framework in Traditional Chinese.

## What's New

**🆕 Four new frameworks**
- **`compare`**: 2–5 stocks head to head on one table (quality, growth, valuation, balance sheet, momentum, risks, catalysts), then a reasoned pick, what would flip it, and whether owning more than one adds anything
- **`credit-check`**: maturity wall, interest coverage, leverage against covenants, liquidity runway, ratings and spreads, and the cost of refinancing at today's rates, scored as a Credit Health Score 0–10
- **`forensic-accounting`**: Beneish M-Score, Altman Z, Sloan accruals, cash-vs-earnings divergence, SBC-adjusted FCF, revenue-recognition and auditor flags, scored as a Manipulation Risk Score 0–10
- **`trade-postmortem`**: process vs. outcome, plan adherence, the biases that showed up, and the one lesson for the journal; reads closed `thesis-tracker` files

**🧾 JSON footer on every skill**: right after the signal box, a ```` ```json {"investskill": "1", "skill": …, "signal": …, "score": …} ```` block with the same values, so tools can read a result without scraping the box. A footer that disagrees with the box fails the output contract; a missing one is only a warning, so older outputs stay valid.

**🌐 `--lang zh-TW` on every framework**: the whole analysis comes back in Traditional Chinese. The Data & Sources labels, the signal box and the JSON footer stay in English so they still parse.

**🏦 Sector KPI packs**: `stock-eval --sector` and `financial-report-analyst --sector` (`bank`, `insurer`, `reit`, `biotech`, `saas`) use the metrics that matter for that sector (CET1/NIM, combined ratio, AFFO, cash runway, NRR / Rule of 40) and say which generic metrics to ignore.

**📑 `full-report` runs everything that applies**: quick = 5 modules, standard = 10, comprehensive = 25, with `--skip` and not-applicable rules. Components are re-weighted over the modules that ran, so a skipped module no longer counts as 5.0.

**📚 Learning and site**: Lesson 14 (Macro & the Fed Cycle) and Lesson 15 (Options for Stock Investors), Check yourself quizzes on every lesson, a printable cheat sheet, a Non-US Investor Guide, a glossary that grows from 76 to 124 terms, a zh skill index, and FAQ pages, all in English and 繁體中文. The site also gains a sitemap, Open Graph tags, section-level search and WCAG AA contrast.

**🔧 Fixes**: Thesis Invalidation was sitting inside the signal-box code fence in 19 skills, and has moved above the box. `full-report`'s composite bands now match the Score Guide. Factual corrections cover 13F scope, the wash-sale rule, the Sahm rule date, the 2025 tariff window and the 10b5-1 rules. The `npm run release` command now commits, tags and pushes itself.

## Quick Start

### Claude Code
```bash
/plugin marketplace add yennanliu/InvestSkill
/plugin install us-stock-analysis@invest-skill
/us-stock-analysis:compare AAPL MSFT GOOGL
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
| Claude Code | ✅ Available | `/plugin install us-stock-analysis@invest-skill` or `install.sh -a claude` | [README-claude-code.md](README-claude-code.md) |
| Cursor IDE | ✅ Available | Auto-loads from `.cursor/rules/invest-skill.mdc` or `install.sh -a cursor` | [README-cursor.md](README-cursor.md) |
| Gemini CLI | ✅ Available | Auto-loads from `GEMINI.md` or `install.sh -a gemini` | [README-gemini.md](README-gemini.md) |
| GitHub Copilot | ✅ Available | Auto-loads from `.github/copilot-instructions.md` or `install.sh -a copilot` | [README.md](README.md) |
| Codex / OpenCode | ✅ Available | `install.sh -a codex` / `-a opencode` (writes `AGENTS.md`) | [README.md](README.md) |
| Universal (ChatGPT, Claude.ai, Ollama, …) | ✅ Available | `install.sh -a any` or copy prompts from `prompts/` | [README-ollama.md](README-ollama.md) |

## Download & Verify

All releases include checksums for verification:

```bash
# Download artifacts
tar xzf invest-skill-marketplace-1.14.0.tar.gz

# Verify checksums
sha256sum -c checksums.txt
```

**Artifacts:**
- `invest-skill-marketplace-1.14.0.tar.gz`: Full marketplace (all platforms)
- `us-stock-analysis-1.14.0.tar.gz`: Claude Code plugin only
- `checksums.txt`: SHA-256 verification file

## Full Changelog

See [CHANGELOG.md → 1.14.0](CHANGELOG.md#1140---2026-10-24) for every entry.

**Upgrade notes**
- No breaking changes. Skill names, the signal block and the plugin layout are unchanged. The JSON footer is additive, and outputs without it still pass.
- Removed workflows: `auto-deploy.yml`, `test.yml`, `pr-check.yml`, `validate.yml` and `install-test.yml`. Use `ci.yml` instead. A fork that relied on a version-bump merge to auto-tag must now run `npm run release`.
- `full-report --lang` no longer lists `zh-CN` or `ja`. Use `zh-TW` or English.
