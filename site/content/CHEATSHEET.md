# Investor's Cheat Sheet

> One page to print and keep beside the screen: how to read a signal block and its Data & Sources header, the metrics that matter with their rough good/bad ranges, the pre-trade checklist, which skill answers which question, and the red flags. Every range is a rule of thumb, not a law; industry and growth stage always matter. Full definitions are in the [Glossary](glossary.html), and the reasoning behind each item is in the [Learning](learning.html) lessons.

---

## 1 · The signal block, decoded

Every analysis ends in the same box. Each line is a separate axis ([Concepts → Anatomy of the signal block](concepts.html#anatomy-of-the-signal-block)).

| Field | Answers | Is **not** |
|-------|---------|------------|
| **Signal** — BULLISH / NEUTRAL / BEARISH | Which direction the evidence points | A price target |
| **Confidence** — HIGH / MEDIUM / LOW | How complete and clean the data is | How bullish it is; a bearish call can be high-confidence |
| **Horizon** — SHORT / MEDIUM / LONG-TERM | Over what timeframe the thesis plays out | How long to hold no matter what |
| **Score** — 0–10 | One blended read of the above | A probability |
| **Action** — BUY / HOLD / SELL | The decision the signal implies | Advice; it is a default to pressure-test |
| **Conviction** — STRONG / MODERATE / WEAK | How firmly the analysis commits to the action | Confidence: clean data with a thin margin of safety still means weak conviction |

```
Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)
```

**Consistency checks:**
- The score and the signal must agree: score ≥ 6.0 means BULLISH, 4.0–5.9 means NEUTRAL, below 4.0 means BEARISH. `fact-check` is the exception, because its score is a Verification Score.
- Read the box as one sentence: "Over a [Horizon], the evidence is [Signal] with [Confidence] confidence ([Score]), implying [Action] at [Conviction] conviction." If the sentence contradicts itself, the analysis does too.
- A high score with LOW confidence means the case looks good but the evidence is thin, so dig deeper before you act.

---

## 2 · The Data & Sources header

The header at the top of every output says where the numbers came from ([Data & Accuracy](data-and-accuracy.html#the-data--sources-header)).

```
Data & Sources
  As of:      2026-07-02
  Source:     SEC EDGAR 10-K (FY2025) · company IR · FRED
  Retrieval:  pasted by user   (or: web/tool retrieval · model memory)
  Confidence: HIGH — primary-source, current
```

| Field | What to check |
|-------|---------------|
| **As of** | The date the figures represent. Stale data should be flagged |
| **Source** | The primary documents: filing, company IR, FRED, exchange data |
| **Retrieval** | *pasted by user* (most reliable) → *web/tool retrieval* (verify) → *model memory* (least reliable, a placeholder) |
| **Confidence** | HIGH (primary-source, current) · MEDIUM (mixed or secondary) · LOW (memory or missing data) |

**Rules:** if Retrieval is `model memory`, Confidence must be LOW. If sources disagree, prefer the primary source and then the most recent one, show both values, and never average them.

---

## 3 · The metrics that matter

### Profitability and quality

| Metric | Formula | Good | Bad / watch |
|--------|---------|------|-------------|
| [Gross margin](glossary.html#gross-margin) | `(Revenue − COGS) ÷ Revenue` | High and stable or rising (pricing power) | Steadily falling (competition) |
| [Operating margin](learning-statements.html#the-three-margins) | `EBIT ÷ Revenue` | Stable or rising over several years | Eroding; a wide gap to gross margin means heavy overhead |
| [FCF](glossary.html#fcf-free-cash-flow) | `Operating cash flow − Capex` | Consistently positive and growing, ≈ or > net income | Negative with no growth story, or diverging from profit |
| [ROIC](glossary.html#roic-return-on-invested-capital) | `NOPAT ÷ Invested capital` | > 15% excellent · 10–15% good | Below WACC destroys value |
| [ROE](glossary.html#roe-return-on-equity) | `Net income ÷ Equity` | > 15% strong · 10–15% decent | < 10% weak; high ROE with low ROA means debt is doing the work |
| [Piotroski F-Score](glossary.html#piotroski-f-score) | 9 pass/fail checks | 7–9 strong | 4–6 middling · 0–3 weak |

### Balance sheet

| Metric | Formula | Good | Bad / watch |
|--------|---------|------|-------------|
| [Debt-to-equity](glossary.html#debt-to-equity-de) | `Total debt ÷ Equity` | < 1.0 conservative | 1.0–2.0 moderate · > 2.0 leveraged (banks and utilities run high) |
| [Net debt / EBITDA](learning-quality.html#balance-sheet-health) | `(Debt − Cash) ÷ EBITDA` | Below ~2× comfortable | Above ~4× stretched |
| [Interest coverage](glossary.html#interest-coverage-ratio) | `EBIT ÷ Interest expense` | > 5× safe | 2–5× adequate · < 1.5× danger |
| [Current ratio](glossary.html#current-ratio) | `Current assets ÷ Current liabilities` | > 1.5 comfortable | 1.0–1.5 adequate · < 1.0 strain |
| [Altman Z-Score](glossary.html#altman-z-score) | Five weighted ratios | > 3.0 safe | 1.8–3.0 grey zone · < 1.8 distress |

### Valuation and income

| Metric | Formula | Good | Bad / watch |
|--------|---------|------|-------------|
| [P/E](glossary.html#pe-price-to-earnings) | `Price ÷ EPS` | No universal level; compare with history and peers | Useless for loss-makers; distorted by one-offs |
| [PEG](glossary.html#peg-ratio) | `P/E ÷ EPS growth (%)` | < 1.0 potentially cheap · ~1.0 fair | > 2.0 expensive; growth estimates are fragile |
| [EV/EBITDA](glossary.html#evebitda) | `(Market cap + Debt − Cash) ÷ EBITDA` | < 10× often cheap · 10–15× fair | > 15× rich (sector-dependent); ignores capex |
| [P/S](glossary.html#ps-price-to-sales) | `Market cap ÷ Revenue` | For early, unprofitable firms, against peers | Sales without profit can be worthless |
| [FCF yield](glossary.html#fcf-yield) | `FCF ÷ Market cap` | > 5% attractive · 3–5% fair | < 3% expensive; lumpy capex distorts one year |
| [Dividend payout](glossary.html#dividend-payout-ratio) | `Dividends ÷ Net income` | < 60% sustainable | 60–80% watch · > 100% paying out more than it earns |
| [Dividend yield](glossary.html#dividend-yield) | `Annual dividend ÷ Price` | Covered by FCF | > ~7% often prices in a cut ([yield trap](glossary.html#yield-trap)) |
| [Margin of safety](glossary.html#margin-of-safety) | `(Value − Price) ÷ Value` | ~20% stable · ~30% medium · 40%+ hard to forecast | Zero or negative means wait, don't buy |

### Market, portfolio and funds

| Metric | Formula | Good | Bad / watch |
|--------|---------|------|-------------|
| [Beta](glossary.html#beta-β) | Move vs. the market | 1 = moves with the market; it sizes risk, it isn't a grade | High beta amplifies gains *and* losses |
| [Sharpe ratio](glossary.html#sharpe-ratio) | `(Return − Risk-free) ÷ Volatility` | > 1 good · > 2 very good | < 1 weak |
| [Max drawdown](glossary.html#drawdown--max-drawdown) | Worst peak-to-trough fall | Know it before you own it | A 50% drawdown needs +100% to recover |
| [Correlation](glossary.html#correlation) | −1 to +1 | < 0.5 between core holdings | > 0.8 is the same bet twice; correlations rise toward 1 in a crash |
| [RSI](learning-market.html#momentum-oscillators-rsi-and-macd) | 0–100 momentum | 30–70 normal | > 70 overbought · < 30 oversold (a caution flag, not a trade) |
| [Days-to-cover](glossary.html#days-to-cover-short-interest-ratio) / [short float](glossary.html#short-float-short-interest-) | `Shares short ÷ Avg daily volume` / `÷ Float` | — | > 5 days notable, > 10 high · float > 10% elevated, > 20% crowded |
| [Expense ratio](glossary.html#expense-ratio) | `Annual fund costs ÷ Avg assets` | ≤ 0.10% broad index | 0.20–0.50% specialty · > 0.75% needs a reason |

---

## 4 · Pre-trade checklist

Taken from [Lesson 6](learning-portfolio.html#a-simple-pre-trade-checklist), [Lesson 7](learning-playbook.html#step-8--the-trading-plan-write-it-down) and [Lesson 13](learning-psychology.html#two-checklists). Don't place the order until every box is ticked.

- [ ] **Thesis** written in one paragraph: what has to happen, why the market is wrong, why now
- [ ] **Quality:** ROIC above WACC, margins stable, balance sheet sound
- [ ] **Statements:** FCF backs the profit; none of the red flags below is unexplained
- [ ] **Valuation:** a bear / base / bull fair-value range, with a margin of safety sized to your uncertainty
- [ ] **Market:** trend, positioning and the next catalyst or earnings date are known
- [ ] **3–5 KPIs with thresholds**, and the **invalidation triggers** that make you exit
- [ ] **Bear case** read; you can say which argument worries you most
- [ ] **Pre-mortem** written: "It is 12 months later and this lost 40% because…"
- [ ] **Size** is within your cap (often 5–10% per name, less for speculative names), and you know the dollar loss at −30% and −50%
- [ ] **Trading plan** written: starter, add rungs, trim level, horizon; you sell on the thesis, not the quote
- [ ] **Data & Sources** checked: current as-of date, primary source, and no `model memory` numbers left unverified
- [ ] A **limit** order, at a price you would still pay tomorrow
- [ ] **Journal entry** drafted *before* the order

**Emotional-trade check.** Stop if any of these is true: the stock moved more than 10% today and that is why you're here · you've checked the price more than three times · you're acting on a headline from the last hour · you want to "get back to even" or "not miss it" · you can't name the trigger that fired · you're adding to a WEAKENED or BROKEN thesis. If two or more are true, wait 24 hours and run the checklist again.

| Sell **rules** | Not rules (just feelings) |
|----------------|---------------------------|
| The thesis broke: a KPI crossed its threshold or a trigger fired | "It's down 20%" · "It's up 40%" |
| Far past even the bull-case value, fundamentals unchanged | "I'm bored with it" |
| A clearly better use of the capital | "There was a scary headline" |
| The position grew past its cap | "Everyone is selling" |
| You need the money for the goal it was for | |

---

## 5 · Which skill for which question

| Question | Skill | Then |
|----------|-------|------|
| Is this worth a look? | `stock-eval` | `result-validator` |
| What is it worth? | `stock-valuation` | `bear-case` |
| Are the filings hiding anything? | `financial-report-analyst` | `forensic-accounting` |
| Can it pay its debts? | `credit-check` | — |
| Is the moat real? | `competitor-analysis` | `industry-map` |
| Is the dividend safe? | `dividend-analysis` | `portfolio-review` |
| What's the strongest case against it? | `bear-case` | `stock-eval` |
| Which of these two or three stocks? | `compare` | — |
| When should I enter or exit? | `technical-analysis` | `chart-master` |
| What's priced in before earnings? | `earnings-preview` | `earnings-call-analysis` |
| Where is smart money moving? | `institutional-ownership` | `insider-trading` |
| Is this ETF any good? | `etf-analysis` | `portfolio-review` |
| How do I build the position? | `position-ladder` | `thesis-tracker` |
| Is my thesis still intact? | `thesis-tracker --update` | `bear-case` |
| How much could my portfolio lose? | `risk-stress-test` | `portfolio-review` |
| What's the tax on this trade? | `tax-lens` | — |
| Are the report's numbers true? | `fact-check` | `result-validator` |
| What does this output mean? | `learning-coach` | — |

The full map is on [Choose a Skill](choose-a-skill.html).

---

## 6 · Red flags

| Red flag | What it may mean | Lesson |
|----------|------------------|--------|
| Revenue rising, **FCF shrinking** | Growth isn't turning into cash | [2](learning-statements.html#common-red-flags) |
| **Receivables growing faster than sales** | Sales booked before cash arrives, or customers who can't pay | [2](learning-statements.html#common-red-flags) |
| **Inventory piling up** against sales | Product not selling; write-downs ahead | [2](learning-statements.html#common-red-flags) |
| Profit propped up by **one-off items** | The earnings won't repeat | [2](learning-statements.html#common-red-flags) |
| **Debt ballooning** while earnings stay flat; coverage < 2× | Fragility, with interest eating future profit | [3](learning-quality.html#balance-sheet-health) |
| **ROIC sliding toward WACC**, margins eroding | The moat is narrowing, whatever management says | [3](learning-quality.html#verify-the-moat-in-the-numbers-not-the-marketing) |
| **Buybacks above intrinsic value**; serial acquisitions | Capital allocation is destroying value | [3](learning-quality.html#capital-allocation) |
| **Payout > 100%** or yield > ~7% | A dividend cut may already be priced in | [Glossary](glossary.html#yield-trap) |
| DCF verdict **flips on a small WACC change**; terminal value is most of the answer | A fragile estimate, so treat it as a range | [4](learning-valuation.html#a-dcf-is-a-model-of-your-assumptions-not-a-fact) |
| Leveraged, inverse or ETN structure; AUM < $100M; tracking gap beyond the fee | Not a long-term holding | [10](learning-etfs.html#structures-to-avoid-as-a-long-term-holder) |
| `model memory` paired with HIGH confidence; no as-of date; score and signal disagree | Don't trust the output until it's verified | [Data](data-and-accuracy.html#spotting-hallucinated-numbers) |
| Adding to a WEAKENED or BROKEN thesis; can't name the trigger | An emotional trade | [13](learning-psychology.html#am-i-about-to-make-an-emotional-trade) |

---

> **Next / Related:** the [Learning hub](learning.html) for the lessons behind each line · the [Glossary](glossary.html) for every metric · [Concepts](concepts.html) for the mental models · [Choose a Skill](choose-a-skill.html) to run an analysis.

*Educational content only. Not financial advice. Ranges are rules of thumb.*
