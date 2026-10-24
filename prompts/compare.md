# Head-to-Head Compare

## ⚠️ Data Verification — Do This Before Any Analysis

Before running any analysis, always retrieve the latest market data for the ticker:

1. **Fetch current price** — use web search or ask the user for the live price, 52-week range, and market cap. Never assume a price from training data.
2. **Confirm key figures** — for **every** ticker, on the **same as-of date**: price, enterprise value (market cap + debt + leases − cash), TTM revenue, EBIT, free cash flow and stock-based compensation, invested capital for ROIC, net debt and interest expense, 3-year revenue history, NTM consensus revenue and EPS, and the last guidance change. Note each company's fiscal year-end and calendarize to a common trailing-twelve-month window — comparing one company's March year with another's December year is comparing two different economies. A comparison in which one ticker's figures are a quarter staler than the others' is biased toward whichever side the missing quarter favours.
3. **State your data source** — fill in the `Data & Sources` header (next section) so the origin, as-of date, retrieval path, and confidence of every figure are explicit at the top of the output.
4. **Flag stale data explicitly** — if live data is unavailable, display this warning before proceeding:

> ⚠️ **Live data unavailable.** The following analysis uses training-data estimates which may be significantly out of date. Verify all prices and metrics before making any decisions.

Never silently substitute training-data estimates for current prices. When in doubt, ask the user to paste the latest quote.

---

## 📋 Data & Sources Header — Open Every Output With It

The first thing in the output is this provenance block, filled in — never left as placeholders. It is the standard documented on the [Data & Accuracy](https://yennanliu.github.io/InvestSkill/data-and-accuracy.html) page and the first thing `result-validator` looks for:

```
Data & Sources
  As of:      <date the figures represent, e.g. 2026-06-30>
  Source:     <primary docs — SEC EDGAR 10-K/10-Q, company IR, FRED, exchange data …>
  Retrieval:  <pasted by user | web/tool retrieval | model memory>
  Confidence: <HIGH | MEDIUM | LOW>
```

- `Retrieval: model memory` must be paired with `Confidence: LOW` — memory is a placeholder until confirmed against a primary source.
- Mixed sources: list each with its own as-of date rather than blending them.
- Sources disagree on the same figure (a closing price, a deal term): prefer the primary source (SEC filing, company release, exchange data) over an aggregator, then the most recent dated one. Show both values with their sources and dates, say which you used and why, and never average them.
- Data the user pasted is reported as `pasted by user`; do not upgrade its confidence beyond what the user's own source supports.

---

## Overview

The most common real question an investor asks is not "is this stock good?" but **"I can only buy one of these — which?"** Running `stock-eval` three times answers the wrong question: three independent scores on three different days, each with its own assumptions, and no argument about the *trade-off* between them. `stock-screener` ranks dozens of names mechanically but does not argue; `competitor-analysis` studies one company's moat against its rivals but does not pick.

**This skill puts 2–5 tickers on one table, scores each dimension on the same explicit scale, and then argues the pick.** It produces a 0–10 sub-score per dimension with the formula shown, a weighted composite per ticker, and then the part that matters: *which one, why that one, what single fact would flip the choice, whether owning more than one adds diversification or just doubles the same bet,* and a **"same business, different price"** check that asks why the market prices two similar companies differently before calling the cheaper one a bargain.

**How it differs from its neighbours:**

| Skill | Question it answers | Unit of analysis |
|-------|---------------------|------------------|
| `stock-screener` | Which of these 20–50 names deserve a closer look? | Many names, mechanical ranking |
| **`compare`** | **Which of these 2–5 should I own, and why?** | **Few names, argued pick** |
| `competitor-analysis` | How strong is *this* company's position against its rivals? | One company, its industry |
| `stock-eval` / `stock-valuation` | Is *this* stock good / cheap on its own? | One company, absolute |

Run `stock-screener` to get from many to few; run `compare` to get from few to one; run `stock-eval`, `stock-valuation`, and `bear-case` on the winner before acting.

---

## 1. Inputs

| Input | Required | Default if unstated |
|-------|----------|---------------------|
| Tickers | ✅ 2–5 | — (more than 5 → suggest `stock-screener` first) |
| The user's objective | recommended | "total return over 3–5 years"; alternatives: quality compounder, value, income, growth |
| Horizon | optional | LONG-TERM (1+ years) |
| Dimension weights | optional | the default weights in Phase 3; the user may override, and the output states the weights used |
| Existing holdings | optional | needed for the diversification check against the current portfolio, not just among the candidates |
| Prior outputs (`stock-eval`, `stock-valuation`, `competitor-analysis`, `bear-case`, `catalyst-calendar`) | optional | improve the moat, reverse-DCF and catalyst inputs; cite their run dates |
| WACC per company | optional | estimate: risk-free rate + β × 5% equity risk premium, blended with after-tax cost of debt; state it |

---

## 2. Framework

### Phase 1 — Comparability check (before any number)

Decide whether the metrics in Phase 2 mean the same thing for every ticker. Apply the **translation table** when a company belongs to a group whose statements do not fit the standard metrics:

| Group | Standard metric that breaks | Use instead |
|-------|-----------------------------|-------------|
| Banks | EV, EBIT, net debt, FCF (debt is raw material, not financing) | ROTCE for ROIC · efficiency ratio for margin · P/TBV and P/E for valuation · CET1 ratio and loan-loss reserves for balance sheet |
| Insurers | EBIT margin, EV | Combined ratio · ROE · P/B · reserve development |
| REITs | EPS, P/E, EBIT (depreciation distorts) | FFO / AFFO per share · P/AFFO · net debt / EBITDAre · discount/premium to NAV |
| Pre-profit growth | EV/EBIT, PEG, ROIC, interest coverage | EV/Sales ÷ growth · gross margin · Rule of 40 · cash runway in months · dilution rate |
| Cyclicals near a peak or trough (energy, materials, autos, semis) | Trailing EBIT and P/E | Mid-cycle (5–7 year average) EBIT margin applied to current revenue |
| Utilities / regulated | Growth anchors | Allowed ROE · rate-base growth |

Rules:
- A translated metric is scored on its own anchors (Phase 2 notes) and marked **(translated)** in the table.
- A metric with no sensible translation is **n/a** and its weight is redistributed pro-rata inside its dimension.
- **If two or more dimensions are non-comparable across the group** (e.g. a bank against a software company), print the warning *"These companies are not comparable on a single composite"* above the table, rank within each comparable subgroup only, argue the pick on the user's objective, and cap Confidence at LOW.
- Always adjust for **stock-based compensation**: EBIT and FCF are taken *after* SBC as an expense. A company paying 15% of revenue in stock is not as cheap as its adjusted numbers say.

### Phase 2 — Seven dimensions, one scale

Every metric is converted to a 0–10 sub-score with one linear formula, clamped at the ends:

```
sub = 10 × clamp( (x − x₀) ÷ (x₁₀ − x₀), 0, 1 )
x₀  = the value that scores 0      x₁₀ = the value that scores 10
(for "lower is better" metrics x₀ > x₁₀ and the formula still holds)
```

The anchors are **absolute**, not ranks within the group, so that a composite of 7 means the same thing whether the peers are strong or weak — and so that "the best of a bad bunch" is visible as a low winning score. A dimension's sub-score is the average of its metric sub-scores.

| Dimension | Metric | x₀ (scores 0) | x₁₀ (scores 10) | Notes |
|-----------|--------|---------------|-----------------|-------|
| **Business quality** | ROIC − WACC spread | −5 pp | +20 pp | ROIC = NOPAT ÷ (debt + equity − cash), after SBC |
| | Operating margin (after SBC) | 0% | 35% | Use mid-cycle for cyclicals |
| | Margin stability (5-yr std. dev. of operating margin) | 10 pp | 1 pp | Lower is better |
| | Moat | None = 2 · Narrow = 6 · Wide = 9 | | From `competitor-analysis` if run; else the analyst's stated judgement with one-line evidence |
| **Growth** | Revenue CAGR, 3 years | −5% | +30% | Organic where M&A is material; say so |
| | NTM EPS growth (consensus) | −10% | +35% | Pre-profit: NTM revenue growth on the same anchors |
| | Guidance direction, last print | cut = 2 · held = 5 · raised = 8 | | |
| **Valuation** | EV / EBIT (TTM, after SBC) | 40× | 8× | Banks: P/TBV 3.0× → 0.8×; REITs: P/AFFO 30× → 10× |
| | FCF yield (FCF after SBC ÷ market cap = 1 ÷ P/FCF) | 0% | 10% | Negative FCF scores 0 |
| | PEG (forward P/E ÷ NTM EPS growth in %) | 3.0 | 0.5 | n/a when EPS growth ≤ 0 or EPS negative |
| | Reverse-DCF implied growth − expected growth | +15 pp | −10 pp | Implied: the 10-year FCF growth the price requires at the WACC (method from `stock-valuation`); expected: consensus or the analyst's base case. Negative gap = the price asks for less than the business is expected to deliver |
| **Balance sheet** | Net debt / EBITDA | 4.0× | −1.0× (net cash) | Pre-profit: cash runway months, 12 → 48 |
| | Interest coverage (EBIT ÷ interest) | 1.5× | 15× | Net-cash companies score 10 |
| | Maturities due in next 24 months ÷ cash + undrawn revolver | 150% | 0% | Refinancing risk |
| **Momentum / relative strength** | 12-month return excluding the last month, minus SPY | −30 pp | +30 pp | The standard 12-1 momentum measure |
| | Price vs. 200-day moving average | −20% | +15% | If > +40% above, cap the dimension at 7 — extended, not stronger |
| **Risk** (higher = safer) | Max drawdown, last 3 years | −70% | −15% | |
| | Named risk flags | start 10, −1.5 each | | Customer > 20% of revenue · net dilution > 3%/yr · pending material litigation or regulatory decision · key-person or dual-class control · single-country / single-product concentration · the top `bear-case` thesis-killer if run |
| **Catalysts, next 90 days** | Dated events | start 5; +1.5 per positive, −1.5 per negative | | Positive: product launch, investor day, index inclusion, buyback authorization. Negative: lock-up expiry, large debt maturity, binary regulatory or trial readout with a skewed downside. Import from `catalyst-calendar`; undated "potential" catalysts score 0 |

Show the raw value **and** the sub-score in every cell (`18.2× → 6.8`). A cell without the raw value is not checkable.

### Phase 3 — The composite

| Dimension | Default weight | Rationale |
|-----------|----------------|-----------|
| Business quality | 20% | What the company is |
| Growth | 20% | Where it is going |
| Valuation | 20% | What the price already assumes |
| Balance sheet | 10% | Whether it survives the bad year |
| Momentum | 10% | Whether the market agrees yet |
| Risk | 15% | What could go wrong that is not in the numbers |
| Catalysts | 5% | What can change the picture inside 90 days |

```
Composite = Σ weight × dimension sub-score        (0–10, per ticker)
```

Objective presets (state the one used): **quality** — quality 30, growth 15, valuation 15, balance 15, momentum 5, risk 15, catalysts 5; **value** — valuation 35, quality 15, growth 10, balance 15, momentum 5, risk 15, catalysts 5; **growth** — growth 35, quality 15, valuation 15, balance 10, momentum 10, risk 10, catalysts 5. Income-oriented users should add `dividend-analysis` and judge payout safety separately — it is not one of these dimensions.

**Ties:** if the top two composites are within **0.5**, treat them as a statistical tie — the scoring cannot separate them and the pick must be argued (Phase 4) on the dimension that matters most to the user's objective, not on the decimal.

### Phase 4 — Argue the pick

A ranking is not a decision. Write the argument in this order:

1. **The pick and the one-sentence reason** — the dimension that decides it, with its numbers: *"ZEPH: comparable quality to the runner-up at a valuation sub-score 3.1 points higher — the market is asking for 6% implied growth against 10% expected."*
2. **Why not the runner-up** — the specific weakness that costs it the pick, and what it does better.
3. **The flip condition** — the *one* observable fact that would make the runner-up the pick: a price (the runner-up at $X would close the valuation gap), a KPI (the winner's margin falling below Y%), or an event (the 90-day catalyst going the wrong way). Compute the price-based flip when possible: the runner-up price at which its composite equals the winner's.
4. **Absolute check** — a relative winner is not automatically a buy. If the winner's composite is below 6.0, say plainly: *"best of this group, but not a buy on its own merits"* — and the signal block reflects that.
5. **What would make all of them wrong together** — the shared exposure (Phase 5) that a pick within the group does not diversify away.

### Phase 5 — Does owning more than one add anything?

| Test | Method | Reading |
|------|--------|---------|
| Return correlation | Weekly returns, 2 years, each pair | > 0.8 — the same bet twice; 0.5–0.8 — partial overlap; < 0.5 — genuine diversification |
| Shared drivers | Name the common factor: rates, AI capex, consumer spending, oil, China, a single large customer, one supplier node (`industry-map`) | Two names with the same top driver are one position for risk purposes |
| Shared holders | Top institutional holders and ETF membership overlap (`institutional-ownership`) | Heavy overlap means they will be sold together in a de-risking |
| Overlap with the user's portfolio | Correlation of each candidate with the existing portfolio, and sector/factor weights after adding it | A candidate that raises the largest existing factor tilt adds concentration, not diversification |

Conclude with one of three answers: **own one** (correlation > 0.8 or same top driver — pick the winner, no pair); **own both at a combined size no larger than one full position** (partial overlap); or **own both at full size** (genuinely different drivers and correlation < 0.5). Sizing itself goes to `position-ladder` and `risk-stress-test`.

### Phase 6 — "Same business, different price" sanity check

Whenever two tickers' **quality and growth** sub-scores are each within **1.0** of each other but their **valuation** sub-scores differ by **more than 3.0**, stop and explain the gap before recommending the cheaper one. Work through the usual explanations, in order:

1. **Accounting** — SBC treatment, capitalized software or R&D, lease accounting, one-off gains in TTM EBIT, different fiscal calendars
2. **Quality of earnings** — FCF conversion (FCF ÷ net income) well below 80% for the cheap one
3. **Cyclicality** — the cheap one is on peak earnings (a low P/E at the top of the cycle is a warning, not a bargain)
4. **Capital structure** — leverage, off-balance-sheet obligations, pension deficits
5. **Governance and control** — dual-class shares, related-party dealings, a controlling holder
6. **Geography, liquidity, listing** — ADR, country risk, low float, index exclusion
7. **Something the market knows** — a pending lawsuit, a customer loss, a short report (`short-interest`, `bear-case`)

If one of these explains most of the gap, the cheap stock is *correctly* cheap — say so and adjust the pick. If none does, the gap is the opportunity, and the argument in Phase 4 should say it out loud.

### Phase 7 — The signal score

The signal block expresses **the view on the winning pick**, on an absolute basis. Its Score is the **winner's composite** from Phase 3, with two adjustments:

- **−0.5** if the winner fails the Phase 6 check (an unexplained or adversely explained valuation gap) and is still the pick
- **Capped at 5.9** (NEUTRAL) when Phase 1 found the group non-comparable

The Score therefore maps to the Signal by the standard guide: a winner scoring 6.0 or more is a BULLISH call on that ticker; a winner scoring 4.0–5.9 is "best of the group, not a buy"; below 4.0 the whole group is unattractive and the box says so.

---

## 3. Output Format

1. **Data & Sources** header — one line per ticker if as-of dates differ, plus the common TTM window used
2. **Executive Summary** — three sentences: the pick, the deciding dimension, the flip condition
3. **Comparability check** — the translation table applied, or "all metrics comparable" (Phase 1)
4. **The head-to-head table** — rows = metrics grouped by dimension, columns = tickers, each cell `raw → sub-score`, dimension sub-scores in bold, the composite as the last row, weights stated (Phases 2–3)
5. **Catalysts next 90 days** — date · ticker · event · direction
6. **The argued pick** — the five steps of Phase 4
7. **Diversification** — correlation matrix and the own-one / own-both answer (Phase 5)
8. **Same business, different price** — triggered or not; the explanation if triggered (Phase 6)
9. **Next steps** — `stock-eval`, `stock-valuation`, `bear-case` on the winner; `thesis-tracker` to write the thesis if buying
10. **Thesis Invalidation** and the **Investment Signal block** — the line just above the box names the winning ticker: *"Signal for the pick: ZEPH"*

---

## Example

```
User: compare ZEPH QRTZ MNTL — I want a 3–5 year compounder; I already own a broad index fund.

[ZEPH is the plugin's fictional ticker; QRTZ and MNTL are hypothetical peers invented for
this example. All figures are illustrative.]

Comparability: all three are profitable software companies with December year-ends —
all metrics comparable; EBIT and FCF taken after SBC (MNTL's SBC is 14% of revenue,
which moves its EV/EBIT from 22× adjusted to 31× reported-after-SBC).

Head-to-head (quality preset — quality 30 / growth 15 / valuation 15 / balance 15 /
momentum 5 / risk 15 / catalysts 5):

                       ZEPH            QRTZ            MNTL
Quality                7.4             7.8             6.1
  ROIC − WACC          +12 pp → 6.8    +14 pp → 7.6    +6 pp → 4.4
Growth                 6.2             6.6             8.0
Valuation              6.9             3.8             2.9
  EV/EBIT              18× → 6.9       29× → 3.4       31× → 2.8
  Implied − expected   −4 pp → 7.6     +6 pp → 3.6     +9 pp → 2.4
Balance sheet          9.0             6.0             6.5
Momentum               4.5             7.0             8.5
Risk                   6.5             5.5             5.0
Catalysts              5.0             6.5             5.0
Composite              7.0             6.3             5.9

Same business, different price: ZEPH and QRTZ are within 0.4 on quality and growth but
3.1 apart on valuation → triggered. Checked: no accounting or cyclicality difference;
FCF conversion 95% vs. 92%; ZEPH has one customer at 18% of revenue (already in its risk
flags). No full explanation → the gap is the opportunity, stated as such.

Pick: ZEPH — near-QRTZ quality at a price that asks for 6% implied growth against ~10%
expected (composite lead 0.7, outside the 0.5 tie band). Why not QRTZ: a better business by a little, priced for a lot. Flip condition:
QRTZ below a hypothetical $x (the price at which its composite reaches 7.0), or ZEPH's top
customer moving above 25% of revenue. Diversification: ZEPH/QRTZ weekly correlation 0.83,
same top driver (enterprise IT budgets) → own one, not both. MNTL: fastest grower, priced
for it, and the highest dilution — third.

Signal for the pick: ZEPH — composite 7.0 → BULLISH, MODERATE conviction, LONG-TERM,
Confidence MEDIUM (consensus growth figures pasted, not verified). Next: stock-eval,
stock-valuation and bear-case on ZEPH before any order.
```

---

## Notes

- **Same date, same window, same accounting.** Most bad comparisons are bad data alignment, not bad judgement. Calendarize fiscal years and expense SBC before scoring anything.
- **Anchors are absolute on purpose.** A within-group rank would always crown someone a 10; absolute anchors let "none of these is attractive" be the honest answer.
- **The composite is evidence for the argument, not the argument.** Two composites within 0.5 are a tie; a 0.3-point lead is never "the reason".
- **Cross-sector comparisons are allowed but flagged.** A bank against a software company can be *argued* (on the user's objective) but not *scored* on one composite — Phase 1's warning is mandatory.
- **Five tickers maximum.** Beyond that the argument collapses into a ranking; use `stock-screener`.
- **Before:** `stock-screener` to shortlist; `competitor-analysis` for moat ratings. **After:** `stock-eval`, `stock-valuation`, `bear-case` on the winner; `thesis-tracker` to write it down; `position-ladder` for sizing; `risk-stress-test` if more than one is owned.

## Thesis Invalidation

After delivering the analysis signal, specify what would reverse it:

**If signal is BULLISH (the pick is a buy) — thesis breaks if:**
- The flip condition from Phase 4 is met — the runner-up's price falls to the flip price, or the winner's deciding KPI crosses the stated level
- The winner's deciding dimension deteriorates by more than 2 sub-score points at the next filing (e.g. its valuation sub-score falls because the price ran, not the business improved — the edge has been paid out)
- An explanation for the Phase 6 valuation gap surfaces (a lawsuit, an accounting restatement, a customer loss) — the cheap stock was correctly cheap

**If signal is BEARISH (the whole group is unattractive) — thesis breaks if:**
- A group-wide de-rating moves the best valuation sub-score up by 3+ points with quality and growth unchanged — the businesses were fine, the prices were the problem
- The shared driver named in Phase 4 step 5 (rates, a capex cycle, a regulation) turns favourable with evidence in reported numbers, not forecasts
- A new candidate with the same exposure scores above 6.0 — add it and re-run rather than settle for the old group

**Re-run this analysis when:**
- [ ] Next earnings release of any ticker in the comparison
- [ ] Price moves ±15% from current level for any ticker (valuation sub-scores move with price)
- [ ] 60 days have elapsed
- [ ] Material news event (acquisition, leadership change, regulatory decision)

## Standard Signal Output

The box expresses **the view on the winning pick only**, on an absolute basis (Phase 7) — not on the group and not on the runner-up. Name the winning ticker in the line directly above the box (*"Signal for the pick: <TICKER>"*). `Signal: BULLISH` means the winner is attractive on its own merits; `NEUTRAL` means it is the best of the group but not a buy by itself (or the group was not comparable); `BEARISH` means none of the candidates is attractive at current prices — `Action: SELL` then means "do not buy any of these; trim if already owned", never "short the group".

All analysis concludes with this standardized block:

In the output, the box below is followed immediately by this machine-readable footer — the same values as the box, filled in (no placeholders, no comments), so tools can read the result without parsing the box:

```json
{"investskill": "1", "skill": "compare", "ticker": "<TICKER, or null for a portfolio / market-wide view>", "as_of": "<YYYY-MM-DD from Data & Sources>", "signal": "<BULLISH | NEUTRAL | BEARISH>", "confidence": "<HIGH | MEDIUM | LOW>", "horizon": "<SHORT-TERM | MEDIUM-TERM | LONG-TERM>", "score": 0.0, "action": "<BUY | HOLD | SELL>", "conviction": "<STRONG | MODERATE | WEAK>", "retrieval": "<pasted by user | web/tool retrieval | model memory>", "sources": ["<each primary source, dated>"]}
```

```
╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      BULLISH / NEUTRAL / BEARISH     ║
║ Confidence:  HIGH / MEDIUM / LOW             ║
║ Horizon:     SHORT / MEDIUM / LONG-TERM      ║
║ Score:       X.X / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      BUY / HOLD / SELL               ║
║ Conviction:  STRONG / MODERATE / WEAK        ║
╚══════════════════════════════════════════════╝
```

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

**Note:** The Score in the box is the winning pick's composite from Phase 3 (adjusted per Phase 7), so it is comparable with a `stock-eval` score on the same ticker; the other tickers' composites are reported in the head-to-head table, not in the box.

**Disclaimer:** Educational analysis only. Not financial advice.
