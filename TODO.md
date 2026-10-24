# TODO — InvestSkill

The curated top five. Everything else — with rationale, effort estimates, and release mapping — lives in the bilingual roadmap: [doc/IMPROVEMENT-ROADMAP.md](doc/IMPROVEMENT-ROADMAP.md) · [繁體中文](doc/IMPROVEMENT-ROADMAP-zh-TW.md). The latest full scan (2026-10-24, v1.13.0) — bugs found, improvements, and new feature ideas — is [doc/PROJECT-SCAN-2026-10.md](doc/PROJECT-SCAN-2026-10.md) · [繁體中文](doc/PROJECT-SCAN-2026-10-zh-TW.md). Progress against the roadmap's ten headline items is tracked in its §0 table.

The previous long-form backlog (last updated 2026-02-24) is archived at [doc/archive/TODO-2026-02.md](doc/archive/TODO-2026-02.md).

## Top 5

Every P0–P2 item of the roadmap (§8) has shipped. Next, from roadmap P3 and the [2026-10 scan](doc/PROJECT-SCAN-2026-10.md):

1. **Tier 2 skills as demand shows** — `proxy-governance`, `investment-policy`, `ipo-analysis`, `pair-trade`; and `special-situations` / `watchlist` (scan §4.1 — `watchlist` reads the saved `thesis-tracker` files and their JSON footers). → roadmap §3.2
2. **Interactive, zero-runtime tools** — DCF-sensitivity and position-size calculators, a prompt builder, and a "paste your output" checker that runs `signal-block.js` in the browser. → roadmap §5.5
3. **Targeted skill upgrades** — `stock-valuation --reverse`, `stock-screener` presets, broker-CSV column maps in `portfolio-review`, ex-dividend / options-expiry dates in `catalyst-calendar`, one regime verdict in `economics-analysis`, relative strength in `technical-analysis`. → roadmap §4.4
4. **Behaviour over time** — a scheduled, cost-capped live eval of every single-ticker skill with a pass-rate trend; `check-glossary-coverage.js` (6.5) and `check-demo-freshness.js` + "as-of" banners on the demos (6.7). → scan §4.4, roadmap §6
5. **Maintainability** — move `report-generator`'s HTML template out of the prompt (scan B7); eslint and `// @ts-check` on `scripts/lib/`, `engines` ≥ 20 (scan B15).

## Recently shipped from the roadmap

- Roadmap P0–P2 closed out (§0 there): `--lang zh-TW` on every framework, `full-report` running every framework that applies to one stock with `--skip`, the zh Skill Reference index, the Non-US Investor Guide, and the glossary gaps

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
