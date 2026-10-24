# TODO — InvestSkill

The curated top five. Everything else — with rationale, effort estimates, and release mapping — lives in the bilingual roadmap: [doc/IMPROVEMENT-ROADMAP.md](doc/IMPROVEMENT-ROADMAP.md) · [繁體中文](doc/IMPROVEMENT-ROADMAP-zh-TW.md). The latest full scan (2026-10-24, v1.13.0) — bugs found, improvements, and new feature ideas — is [doc/PROJECT-SCAN-2026-10.md](doc/PROJECT-SCAN-2026-10.md) · [繁體中文](doc/PROJECT-SCAN-2026-10-zh-TW.md). Progress against the roadmap's ten headline items is tracked in its §0 table.

The previous long-form backlog (last updated 2026-02-24) is archived at [doc/archive/TODO-2026-02.md](doc/archive/TODO-2026-02.md).

## Top 5

1. **`full-report --depth comprehensive` runs every framework** — add the frameworks missing since v1.8 (`bear-case` above all) plus the new Tier 1 skills where they fit, swap the alias modules for their targets, add `--skip <skill>`. → roadmap §4.3
2. **`--lang zh-TW` on every skill** — the last open item of the skill contract (§4.1); the JSON footer has shipped.
3. **Non-US Investor Guide page** — Lesson 11's non-US section is the core; the page adds brokers, FX, and account opening (§5.4). Glossary: the filing / technical / macro / options terms still missing (§5.3).
4. **zh Skill Reference index** — `skills-zh-tw.html` with Chinese category headings, so the language switch never dead-ends to English (§5.6).
5. **Tier 2 skills as demand shows** — `proxy-governance`, `investment-policy`, `ipo-analysis`, `pair-trade`; and `special-situations` / `watchlist` from the [2026-10 scan](doc/PROJECT-SCAN-2026-10.md) §4.1. → roadmap §3.2

## Recently shipped from the roadmap

- From the [2026-10 project scan](doc/PROJECT-SCAN-2026-10.md) (§8 there): the Thesis Invalidation fence bug in 19 skills, `full-report` scoring fixes, a working `npm run release` and one release path, one CI workflow, the JSON footer, four new skills (`trade-postmortem`, `forensic-accounting`, `compare`, `credit-check`) and `--sector` KPI packs, Lessons 14–15 (Macro & the Fed, Options), Check-yourself for Lessons 1–8, the cheat sheet, the FAQ on the site, sitemap / Open Graph / hreflang / section-level search, and parity, fence and anchor checks

- Stale counts fixed and historical docs archived (§7)
- Skill contract enforced on every analysis skill — `Data & Sources` header, Data Verification gate, Thesis Invalidation — with `scripts/check-skill-contract.js` in `npm test` (§4.1, §6.3)
- The three redirect skills reclassified as aliases; honest count of 24 frameworks (§4.2)
- `thesis-tracker` (§3.1)
- The rest of Tier 1 — `etf-analysis`, `earnings-preview`, `tax-lens` (with `--non-us`), `risk-stress-test`, `learning-coach` (§3.1)
- Learning track Part II — Lessons 9–13 (Before Your First Trade · ETFs · Taxes & Accounts incl. non-US · Earnings Season · Psychology & Process), the "When the Answer Is No" case study, self-check quizzes, glossary 44 → 76 (§5.1–5.3; see `doc/LEARNING-GAP-REVIEW.md`)
- `fact-check` — claim-level verification against primary sources, recomputation, corrected report with inline citations and References; Verification Score feeds `result-validator` Data Quality (not on the roadmap; added on request)
- `scripts/sync-prompts.js`, `scripts/new-skill.js`, `scripts/eval-skills.js`, `scripts/lib/signal-block.js` (§6.1, §6.2, §6.4, §6.11)

## Deliberately not planned

Live-data / broker APIs, crypto and forex, ML price prediction, and changes to the signal block — see roadmap §9 for why.
