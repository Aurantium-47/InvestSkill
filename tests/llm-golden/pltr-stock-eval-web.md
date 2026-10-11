# Palantir Technologies (PLTR): Stock Evaluation, 2026-10-11

```
Data & Sources
  As of:      Mixed. Each source keeps its own date:
              • FY2025 annual figures: 2025-12-31 (10-K, filed 2026-02-17, acc. 0001321655-26-000011)
              • Latest quarter: 2026-06-30 (10-Q, filed 2026-08-04, acc. 0001321655-26-000041)
              • Guidance: Q2-26 press release (8-K Ex.99.1, dated 2026-08-03)
              • Price: $209.05, NASDAQ close 2026-10-09 (from the data pack)
              • 10-yr Treasury: 5.22% on 2026-10-08 (FRED DGS10)
              • Analyst targets, short interest, Form 4, peer multiples: web, dated inline
  Source:     SEC EDGAR (10-K, 10-Q, 8-K, Form 4) · FRED · named web sources for market data
  Retrieval:  pasted by user (data/fixtures/PLTR.md, data/filings/PLTR/…10-Q.txt) + web/tool retrieval
  Confidence: HIGH for reported financials · MEDIUM for market data, consensus, peers ·
              LOW for items marked ⓜ (model memory: beta, FY2020–23 history, pre-2026 quarterly guidance)
```

**Data quality notes**
- **Price date conflict.** One web snapshot dates the $209.05 close to Oct 8. The data pack and CNBC put it on Oct 9, with a 52-week high of $209.58 that day. I used the pack's date.
- **TTM method.** TTM means the four quarters Q3-25 to Q2-26. It is calculated as FY25 − H1-25 + H1-26, using the 10-K and 10-Q.
- **Hand arithmetic.** Running a calculation script wasn't approved in this session, so all derived figures and the DCF were calculated by hand. Run `fact-check` over this report before relying on any precise number.
- **Missing inputs.** I didn't retrieve consensus EPS revision history, a current options chain (the latest IV data is from 2026-05-29), or a single-date peer-multiple set. These gaps are marked where they matter.

---

## 1. Investment Thesis Summary

Palantir is the strongest-performing large software company in the market right now:
- Q2-26 revenue grew **+93% YoY**.
- GAAP operating margin was **47%**.
- It holds **$9.4B** in cash and securities with **no debt**.
- Its Piotroski F-Score is **8/9**.
- Its return on operating capital is far above its cost of capital.

The stock at $209 already prices in success for roughly ten more years:
- It trades at **~179× TTM EPS** and **~60× FY26 guided sales**.
- My reverse DCF says the price needs **~36% revenue CAGR for 10 years**, which means about **$176B of revenue by 2036**.
- It sits at its 52-week high after a **+97% run from the June 25 low**.

**Bottom line:** an exceptional business at a price with no margin of safety. That is a HOLD for existing holders, not a new BUY.

---

## 2. Company Overview

| Item | Detail (10-Q unless noted) |
|---|---|
| Platforms | Gotham (defense/intel), Foundry (data operations + Ontology), Apollo (continuous delivery), AIP (generative-AI platform) |
| Customers | 1,049 TTM customers vs 849 a year ago (**+24%**). Top-20 customers averaged **$124M** each (TTM), **+67%** |
| Segment mix, Q2-26 | Government $990.0M (**+79%**), contribution margin 71% · Commercial $945.4M (**+110%**), contribution margin 78% |
| US vs. rest of world, Q2-26 | US $1,573.0M (**81%** of revenue, +115%) · Rest of world $362.4M (19%, **+34%**) |
| Key sub-lines, Q2-26 (8-K) | US commercial **$764M, +149%** · US government **$809M, +90%** · TCV (contract value booked) **$3.37B, +49%** · Rule of 40 score: 155% |
| Concentration | No customer is ≥10% of revenue, but "Customer I" holds **27% of receivables** (25% at Dec-25) |
| Backlog | Remaining performance obligations **$4.9B**, 43% due within 12 months. Many contracts can be **terminated for convenience** |
| Related party | $6M in H1-26 for use of the CEO's aircraft |

**Demand quality.** The growth is US-driven and broad, with both US commercial and US government up 90%+. International commercial is the weak spot, up only about 26% by my estimate (implied from segment minus US commercial).

---

## 3. Financial Health

### Revenue & earnings

| Year | Revenue ($M) | Growth | GAAP EBIT ($M) | Net income ($M) | Diluted EPS |
|---|---|---|---|---|---|
| 2021 ⓜ | 1,542 | 41% | (411) | (520) | (0.27) |
| 2022 ⓜ | 1,906 | 24% | (161) | (374) | (0.18) |
| 2023 ⓜ | 2,225 | 17% | 120 | 210 | 0.09 |
| 2024 | 2,866 | 29% | 310 | 462 | 0.19 |
| 2025 | 4,475 | **56.2%** | 1,414 | 1,625 | 0.63 |
| **TTM Q2-26** | **6,155.5** | — | **2,634.6** | **3,016.7** | **1.17** |
| FY26 guide (8-K) | **8,150–8,158** | **~82%** | adj. op. income 4,889–4,897 | — | — |

- **Growth rates.** 3-year revenue CAGR (FY22→FY25) is **32.9%**. 5-year CAGR (FY20→FY25) is ~32.6%ⓜ. Growth is still speeding up.
- **What the guidance implies.** Q3 guide of $2.162B is **+83% YoY**. The implied Q4 of $2.424B is **+72% YoY**. Guidance builds in a slowdown.
- **Guidance has been conservative.** Q2 beat the midpoint of its own guide by **7.6%** ($1,935.5M vs $1,799M). A realistic FY26 is about **$8.3–8.5B**.

### Margins

| | FY24 | FY25 | TTM | Q2-26 |
|---|---|---|---|---|
| Gross margin | 80.2% | 82.4% | 84.8% | 84.7% |
| Operating margin (GAAP) | 10.8% | 31.6% | 42.8% | **47.1%** |
| Net margin | 16.1% | 36.3% | 49.0% | 54.9% |
| Adj. op. margin (excl. stock comp) | — | — | — | 62% |

Margins are expanding fast.
- **Incremental operating margin:** Q2 YoY was **69%**, meaning 69 cents of every new revenue dollar reached operating income.
- **Stock-based compensation (SBC)** was **13.6% of TTM revenue** ($835.5M). That is a real cost and I deduct it in the DCF.

### Operating leverage (DOL)

| Period | Revenue growth | EBIT growth | DOL |
|---|---|---|---|
| FY24 | 28.8% | 158%ⓜ | 5.5× |
| FY25 | 56.2% | 356% | 6.3× |
| H1-26 YoY | 89.0% | 274% | 3.1× |
| Q2-26 YoY | 92.8% | 239% | 2.6× |

DOL is falling as margins mature. Earnings will grow closer to the rate of revenue from here, so the extra margin-expansion boost is shrinking.

### Balance sheet & liquidity (Jun 30, 2026)

| Item | Value |
|---|---|
| Cash + marketable securities | **$9,409M** ($9.2B of this is cash and short-term Treasuries) |
| Debt | **$0**. A $500M revolver is undrawn |
| Current ratio / quick ratio | **7.23× / 7.09×** (Dec-25 current ratio: 7.11×) |
| Total equity | $9,885M |

### Working capital

| Metric | FY24 | FY25 | TTM |
|---|---|---|---|
| DSO (days to collect, on TTM revenue) | 73 | 85 | **88** ⚠️ rising |
| DIO / DPO | n/m (no inventory; AP ≈ $8M) | | |
| Operating NWC (AR + prepaids − payables, deferred revenue, deposits) | — | $5M | $155M (2.5% of revenue) |
| Contract liabilities | — | $0.8B | $1.1B |

The cash conversion cycle is effectively near zero because customer deposits and deferred revenue fund the receivables.
- **Watch item:** receivables grew **+42.5% in six months**, and DSO keeps rising. Customer I's 27% share of receivables is a collection-timing risk. It is not a credit risk if Customer I is a US agency, but the 10-Q does not name it.

### Cash flow (TTM)

| Item | Value |
|---|---|
| Operating cash flow | $3,399.8M |
| Capex | $42.1M (about 0.7% of revenue, so maintenance capex is negligible) |
| Free cash flow (FCF) | **$3,357.7M** (FCF yield **0.67%**) |
| FCF − SBC | $2,522M (yield **0.50%**) |
| FY26 adj. FCF guide | **$4.5–4.7B** |

**FY25 cash flow waterfall:**

| Item | $M |
|---|---|
| Operating cash flow | 2,134 |
| Capex | (34) |
| FCF | 2,101 |
| Dividends | 0 |
| Buybacks | (75) |
| M&A | n/a |
| Debt | 0 |

Cash and equivalents fell by $675M during FY25 only because cash was moved into Treasury securities.

---

## 4. Valuation Metrics

Basis: price **$209.05**.
- Basic shares at 6/30/26: 2,402.9M (Class A + B + F), giving a **market cap of $502.3B**.
- On Q2 diluted weighted shares (2,568.7M), market cap is **$537.0B**.
- **EV = $492.9B** (basic market cap minus $9.4B cash and securities).

| Metric | Current | 1-Yr Ago | 10-Yr Median | Sector / Peer |
|---|---|---|---|---|
| P/E (TTM, GAAP) | **178.7×** | n/r | — | Peer avg 43.9× (Simply Wall St) |
| P/E (normalized: 21% tax, excl. securities gains) | **~226×** | — | — | — |
| P/E (forward, FY26 adj. EPS ≈ $1.67, my estimate) | **~125×** | — | — | GuruFocus 115× (Sep 1) · software median 19.7× |
| PEG (forward P/E ÷ ~60% EPS growth) | ~2.1 | — | — | — |
| P/B | 51.4× | — | — | — |
| P/S (TTM) | 81.6× | — | — | — |
| EV/Sales (TTM / FY26 guide) | **80.1× / 60.5×** | — | **29.5×** (GuruFocus) | NET ~49.9×, DDOG ~23.4× (trailing, 9/29/26) · NOW P/S ~9.4× (10/7/26) |
| EV/EBITDA (TTM) | **185×** | — | — | — |
| EV/FCF (TTM) · diluted mkt cap / FY26 adj. FCF | 147× · **117×** | — | — | — |
| Dividend yield / payout | 0% / n/a | — | — | — |

n/r = not retrieved.

**Peer context (mixed dates and bases, MEDIUM confidence):**
- CrowdStrike: P/S ~51×, forward P/E ~215× (Motley Fool, Oct 7 2026).
- ServiceNow: P/S ~9.4×, forward P/E ~33× (same source).
- Snowflake: ~7.9× NTM EV/revenue (TIKR, May 1 2026, stale).

PLTR is the most expensive large-cap software stock on every sales and earnings multiple. Its growth (~82–93%) is also roughly 2–4× faster than any of those peers, which partly but not fully explains the gap.

---

## 5. Key Ratios

| Ratio | Current (TTM / Jun-26) | Assessment |
|---|---|---|
| ROE | **35.2%** (FY25: 26.2%) | Excellent, and achieved with no leverage |
| ROA | 29.3% (FY25 avg-asset basis: 21.3%) | Excellent |
| ROIC (operating capital) | **~367%** | Asset-light; the measure is close to meaningless |
| Gross / operating / net margin | 84.8% / 42.8% / 49.0% | Top of software |
| Current / quick ratio | 7.23× / 7.09× | Fortress |
| Debt-to-equity | 0.00 | — |
| Interest coverage | n/m (no debt) | — |
| Asset turnover | 0.60× | Held down by the $9.4B cash pile |

---

## 6. DuPont Decomposition

**3-factor**

| | Net margin | Asset turnover | Equity multiplier | ROE |
|---|---|---|---|---|
| TTM Q2-26 | 49.0% | 0.598 | 1.199 | **35.2%** |
| FY25 | 36.3% | 0.587 | 1.230 | **26.2%** |
| FY24 (ending-balance basis) | 16.1% | 0.452 | 1.27 | 9.2% |

**5-factor (FY25)**

| Tax burden | Interest burden | EBIT margin | Asset turnover | Equity multiplier | ROE |
|---|---|---|---|---|---|
| 0.981 | **1.172** | 31.6% | 0.587 | 1.230 | 26.2% |

ROE is driven almost entirely by **margin**, the highest-quality driver. Two parts of it are flattering and will fade:
- **Interest burden above 1.0.** Interest income on the cash pile adds to pre-tax income.
- **Tax burden of ~0.98.** The effective tax rate is about 1.4% because a valuation allowance shelters profits from tax. At a normal ~21% tax rate, TTM net income would be about **$2.38B**, not $3.02B.

---

## 7. Competitive Position (Porter's Five Forces)

| Force | Intensity | Evidence |
|---|---|---|
| New entrants | M | Hyperscaler AI agent stacks, Databricks, Snowflake, Microsoft Fabric. Barriers are security accreditations and Ontology-driven workflows |
| Supplier power | L–M | Cloud hosting and LLM providers. A multi-model setup reduces dependence on any one |
| Buyer power | **M–H** | US government is ~42% of Q2 revenue. Contracts allow termination for convenience. Procurement and budget cycles apply |
| Substitutes | M | Customers building in-house on cloud-native tools. AI coding agents lower build costs |
| Rivalry | M | Few full-stack equivalents in classified work. Crowded in commercial analytics |

**Moat: Narrow, and widening.** The moat comes from:
- switching costs embedded in the Ontology,
- defense and intelligence accreditations,
- the forward-deployed engineering model,
- 157% net dollar retention (secondary source, GuruFocus summary; not in the SEC filings).

It is not yet proven durable for 20+ years in commercial markets.

---

## 8. Quality Scoring

### Piotroski F-Score: **8/9 (strong)**

| # | Criterion | FY25 vs FY24 | Score |
|---|---|---|---|
| 1 | ROA > 0 | 18.3% | 1 |
| 2 | Operating cash flow > 0 | $2,134M | 1 |
| 3 | ROA improved | 18.3% vs 7.3% | 1 |
| 4 | Cash flow / assets > ROA | 24.0% > 18.3% | 1 |
| 5 | Leverage not higher | No debt in either year | 1 |
| 6 | Current ratio improved | 7.23× vs 7.11× (Jun-26 vs Dec-25; FY24 not in the pack) | 1 |
| 7 | No dilution | Diluted shares 2,565M vs 2,451M (**+4.7%**) | **0** |
| 8 | Gross margin up | 82.4% vs 80.2% | 1 |
| 9 | Asset turnover up | 0.503 vs 0.452 | 1 |

### Earnings quality

- **Accruals ratio (FY25):** (1,625 − 2,134) / 7,620 = **−6.7%**. Profits are cash-backed.
- **Cash conversion:** operating cash flow / net income is 1.31× for FY25 and **1.13× TTM**. It is drifting lower because of receivables growth and non-cash gains.
- **Non-recurring items:**
  - H1-26 other income of $160M includes $64M of unrealized gains on public equity stakes, most of which can't be sold for now.
  - The near-zero tax rate won't last. Normalized TTM EPS is **~$0.92 vs $1.17 reported**.
- **Revenue recognition:** revenue is ratable and low risk. Risks to watch:
  - pilots and bootcamps run at the company's own cost,
  - accepting equity securities as payment (flagged in the 10-Q),
  - rising DSO.

---

## 9. ROIC / WACC

| ROIC component (TTM) | Value |
|---|---|
| EBIT | $2,634.6M |
| Tax rate (normalized; actual ~1.4%) | 21% |
| NOPAT | $2,081M |
| Operating invested capital (PP&E 61 + lease assets 230 + other operating assets 120 + operating NWC 155) | ~$567M |
| **ROIC** | **~367%** (FY25: ~296%) |
| NOPAT / total equity (if you count the cash pile) | 21.1% |

| WACC component | Value |
|---|---|
| Risk-free rate (FRED DGS10, 2026-10-08) | 5.22% |
| Beta (raw 5-yr monthly ~2.6ⓜ → Blume-adjusted) | **2.07** |
| Equity risk premium | 5.0% |
| Cost of equity = WACC (no debt) | **15.6%** |
| **EVA** = (367% − 15.6%) × $567M | **≈ +$2.0B / year** |

Two conclusions:
- **Value creation:** the business creates value at any reasonable cost of capital.
- **Discount-rate problem:** CAPM with a 2+ beta and a 5.2% risk-free rate gives a discount rate that would make the stock look very cheap to sell. I use a deliberately **generous 10%** for the base DCF and still find the stock overvalued.

---

## 10. DCF Valuation

**Method:**
- Value as of end-FY26. Explicit forecast for FY27–FY36.
- **FCF is measured after SBC**, treating stock compensation as a cash cost.
- Add $9.4B of net cash plus about $2.3B of H2-26 FCF.
- Divide by 2,568.7M diluted shares.

| Assumption | Bull | Base | Bear |
|---|---|---|---|
| FY26 revenue | $8.4B | $8.3B | $8.2B |
| Growth FY27→FY31 | 65/55/45/38/30% | 52/40/30/24/20% | 40/27/20/15/12% |
| Growth FY32→FY36 | 25/20/16/12/8% | 16/13/10/7/5% | 10/8/6/5/4% |
| FY36 revenue | **$118B** | **$55B** | $31B |
| FCF-after-SBC margin | 45% | 40% | 32% |
| WACC / terminal growth | 9% / 3.5% | 10% / 3.0% | 11% / 2.5% |
| **Value per share** | **~$231** | **~$84** | **~$36** |

- **Terminal value weight (base):** 62% of EV.
- **Exit-multiple cross-check:** the base terminal value equals about 12× FY36 EBITDA, which is reasonable for mature software.
- **At the CAPM WACC of 15.6%:** the base case is worth about $44.

**Sensitivity (base operating case, $/share):**

| WACC \ terminal g | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% |
|---|---|---|---|---|---|
| 7% | 122 | 130 | 140 | 154 | **170** |
| 8% | 101 | 107 | 113 | 121 | 131 |
| 9% | 86 | 90 | 94 | 99 | 105 |
| 10% | 75 | 77 | 81 | **84** | 88 |
| 11% | 66 | 68 | 70 | 73 | 75 |

**No cell reaches $209.**

**Reverse DCF:** to justify $209 at a 40% margin, 10% WACC and 3% terminal growth, revenue must compound at **~36% a year for 10 years**, reaching **~$176B in FY2036**. That is roughly Alphabet's 2020 revenue.

### Margin of safety
- Base intrinsic value is **$84** against a price of $209.05. The stock trades at a **149% premium** to it, so there is **no margin of safety**.
- The probability-weighted DCF (20/50/30) gives **~$99**.

---

## 11. Management Quality

**Capital allocation:** good on discipline, but the cash is idle.
- No debt and no large acquisitions.
- The cash pile keeps growing.
- Buybacks are effectively dormant: **$1.5M in H1-26** and $75M in FY25.
- Net dilution has slowed. Basic shares grew **+1.3% YoY** and Q2 diluted weighted shares were up only +0.2% YoY, even with SBC at 13.6% of revenue.

**Guidance track record:** revenue beat guidance in **8 of 8** quarters. Palantir does not give EPS guidance.

| Quarter | Revenue guide (midpoint) | Actual | Result |
|---|---|---|---|
| Q3-24ⓜ | $699M | $725.5M | Beat |
| Q4-24ⓜ | $777M | $827.5M | Beat |
| Q1-25ⓜ | $860M | $883.9M | Beat |
| Q2-25ⓜ | $936M | $1,003.7M | Beat |
| Q3-25ⓜ | $1,085M | $1,181.1M | Beat |
| Q4-25ⓜ | $1,329M | $1,406.4M | Beat |
| Q1-26 | n/r | $1,632.6M (8-K) | Beat (per release) |
| Q2-26 | **$1,799M (8-K)** | **$1,935.5M** | **Beat, +7.6%** |

Guidance is systematically conservative ("sandbagged"). The street knows this, so the bar for each print is the raise, not the guide.

**Insider ownership and alignment:**
- Founders control votes through the **Class B/F share structure**. Alignment is high, but governance protections for outside holders are weak.
- **Karp's Form 4, 2026-08-20:** converted 402,348 shares, then sold about 31K shares at roughly $172–174 under a **10b5-1 plan**. He holds about 6.8M shares directly.
- There are **no open-market insider buys**. Insiders sell steadily but on schedule. This is low-signal, but not supportive either.

**Compensation:** SBC is heavy, but net dilution is now about 1% a year. Say-on-pay results were not retrieved.

---

## 12. Analyst Consensus

| Metric | Value |
|---|---|
| Rating | **Moderate Buy** (MarketBeat, 36 analysts) · Buy (StockAnalysis, 31 analysts) |
| Split | ~20 Buy/Strong Buy, ~9 Hold, a few Sell (low target $80) |
| Mean target | **$195.33** (MarketBeat) · $195.57 (StockAnalysis) · $200.53 (TipRanks) |
| High / low target | $255 / $80 |
| **Upside to mean target** | **−6.6%**: the stock is above consensus |
| Latest move | **Goldman Sachs upgraded to Buy, $230 target (Oct 8, 2026)** |
| Estimate revisions | **Up** after the record Aug 3 guidance raise (inferred). The 30/90-day revision history and the ERM signal were not retrieved |

The mean target below the current price, plus fresh upgrades, means analysts are now chasing the stock. That is a sentiment-stretch signal.

**Positioning:**
- **Short interest:** low at ~2.8–3.6% of float, with 2.3 days to cover (Equibles, Aug 21; Brimind, Sep 4). There is no squeeze fuel and no strong bear pressure.
- **Options:** last observed ATM implied volatility was 51.7% with an IV rank of 33 (May 29, stale). The market priced a ±11.5% move into the Aug 3 print. The 2-year average earnings move is ±15.1%.
- **Next earnings:** about Nov 2–9, 2026 (Yahoo estimates Nov 2; Investing.com lists Nov 9).

---

## 13. Risk Assessment

**Business risk**

| Factor | Level | Note |
|---|---|---|
| Cyclicality | L–M | Government revenue acts as ballast. Commercial AI budgets are discretionary |
| Competition / disruption | M | Hyperscaler agent platforms and cheaper in-house builds |
| Customer concentration | **M** | US government ~42% of revenue. Customer I holds 27% of receivables |
| Regulatory / political | **M–H** | Exposure to the federal budget, FASA procurement changes, and AI regulation |
| ESG / litigation | M | Surveillance and defense controversy. Litigation is "not material" per the 10-Q |

**Financial risk:** **LOW** across the board. No debt, net cash of $9.4B, current ratio 7.2×, no pension obligations.
- Minor items: $167M in private equity stakes, and public equity stakes received as payment that can add volatility.

**Valuation risk** (the dominant risk)

| Scenario | Value | Premium of price to value |
|---|---|---|
| Bull DCF | $231 | price −9% |
| Base DCF | $84 | 2.5× |
| Bear DCF | $36 | 5.8× |

- **Multiple compression:** EV/sales falling from 60× to 25× on FY27 sales of about $12.6B would mean roughly **$127/share** (−39%) even if growth is delivered.
- **Guidance miss:** a guide that merely "meets", with no raise, has historically produced moves of ±13–15%. At 125× forward earnings, a 10–20% EPS miss could plausibly cost 20–35%.

**Macro risk**

| Factor | Level | Note |
|---|---|---|
| Interest rates | **H** | 10-yr yield at 5.22%. About 62% of the value sits in the terminal value, so this is a very long-duration equity |
| USD / FX | L | Revenue is 80% US |
| Tariffs / commodities | L | Software business |
| Geopolitics | Mixed | Conflicts (Ukraine, Middle East, Iran strikes per the 10-Q) are a demand tailwind for defense work but add headline risk |

---

## 14. Output Summary

1. **Thesis:** world-class growth and profitability, with valuation as the problem. The price discounts about 36% revenue CAGR for a decade.
2. **Valuation:** **Overvalued** on intrinsic value (base DCF $84, best sensitivity cell $170). On a 12-month market basis it is roughly fully valued, because the price is already at or above the consensus targets of $195–200.
3. **Quality:**
   - F-Score **8/9**.
   - Earnings quality is good, with negative accruals. Watch the tax normalization and DSO.
   - ROIC is ~367% against a 15.6% WACC, so the company **creates value**.
4. **Management:** guidance credibility is high (8/8 beats). Capital allocation is conservative but leaves cash idle. Founder control is strong; outside holders have little governance influence. Insider selling is routine 10b5-1 sales.
5. **Consensus:** Moderate Buy, mean target $195 (−7%). Revisions are rising and Goldman upgraded on Oct 8.
6. **Top 3 risks:**
   - (a) De-rating: EV/sales falling from 60× toward 25× even if the plan is delivered.
   - (b) US government budget or procurement disruption, made worse by 42% revenue exposure and termination-for-convenience clauses.
   - (c) Slowing growth: the guide implies Q4 growth of +72%, and Q3 is the first test.
7. **12-month price targets** (market-multiple method on FY28E revenue):

   | Case | Target | Assumptions | Probability |
   |---|---|---|---|
   | Bull | **$280** | ~39× NTM sales holds; FY28 revenue $17.7B | 25% |
   | Base | **$180** | ~25× NTM sales | 45% |
   | Bear | **$90** | 15× on $14.6B of revenue | 30% |
   | **Weighted** | **~$178 (−15%)** | | |

8. **Entry zone:**
   - A true intrinsic-value margin of safety is not available near current prices.
   - Investors willing to underwrite growth-multiple risk could stage entries at **$150–175**. That range matches the August consolidation, Karp's Form 4 sale prices of about $172–174, and ~25× FY27 sales.
   - **$209 is not an entry.**

---

## References

**Primary (SEC / FRED)**
1. Data pack `data/fixtures/PLTR.md`: FY25 10-K XBRL, acc. 0001321655-26-000011, filed 2026-02-17. [Filing index](https://www.sec.gov/Archives/edgar/data/1321655/000132165526000011/0001321655-26-000011-index.htm)
2. 10-Q for 2026-06-30, filed 2026-08-04, acc. 0001321655-26-000041. Local file `data/filings/PLTR/PLTR_2026-06-30_10-Q.txt`. [Filing index](https://www.sec.gov/Archives/edgar/data/1321655/000132165526000041/0001321655-26-000041-index.htm)
3. [Q2-26 press release, 8-K Ex.99.1, 2026-08-03](https://www.sec.gov/Archives/edgar/data/0001321655/000132165526000039/a2026q2ex991pressrelease.htm)
4. [Q1-26 press release, 8-K Ex.99.1, 2026-05-04](https://www.sec.gov/Archives/edgar/data/0001321655/000132165526000026/a2026q1ex991pressrelease.htm)
5. [Form 4, A. Karp, 2026-08-20](https://www.sec.gov/Archives/edgar/data/0001321655/000182395126000009/wk-form4_1787616121.xml)
6. [FRED DGS10, 5.22% on 2026-10-08](https://fred.stlouisfed.org/series/DGS10)

**Secondary (retrieved 2026-10-11)**
- Price and 52-week range:
  - [CNBC quote](https://www.cnbc.com/quotes/PLTR)
  - [Morningstar](https://www.morningstar.com/stocks/xnas/pltr/quote)
  - [StockAnalysis](https://stockanalysis.com/stocks/pltr/)
  - [Investing.com](https://www.investing.com/equities/palantir-technologies-inc)
  - [Yahoo Finance](https://sg.finance.yahoo.com/quote/PLTR/)
- Consensus:
  - [MarketBeat forecast](https://www.marketbeat.com/stocks/NASDAQ/PLTR/forecast/)
  - [StockAnalysis forecast](https://stockanalysis.com/stocks/pltr/forecast/)
  - [ChartMill](https://www.chartmill.com/stock/quote/PLTR/analyst-ratings)
  - [Finbold / TipRanks](https://finbold.com/wall-street-analyst-updates-palantir-stock-price-target-5/)
  - [24/7 Wall St., Goldman upgrade (2026-10-09)](https://247wallst.com/investing/2026/10/09/goldman-sachs-upgrades-palantir-to-buy-sees-18-upside-and-further-outperformance-into-2027/)
  - [MCH Advisory](https://www.mchadvisoryservices.com/research/pltr-research-2026.html)
- Short interest:
  - [Equibles](https://equibles.com/stocks/PLTR)
  - [Brimind](https://brimindinvest.com/stocks/pltr/statistics)
  - [Benzinga](https://www.benzinga.com/quote/PLTR/sentiment)
  - [ChartMill ownership](https://www.chartmill.com/stock/quote/PLTR/ownership)
- Options: [earnings-watcher implied move](https://earnings-watcher.com/wiki/pltr-implied-move) · [Options Analysis Suite](https://www.optionsanalysissuite.com/stocks/pltr/probability)
- Multiples and peers:
  - [GuruFocus EV/Revenue](https://www.gurufocus.com/term/enterprise-value-to-revenue/PLTR)
  - [GuruFocus forward P/E](https://www.gurufocus.com/term/forward-pe-ratio/PLTR)
  - [Simply Wall St](https://simplywall.st/stocks/us/software/nasdaq-pltr/palantir-technologies/valuation)
  - [Public.com](https://public.com/stocks/pltr/pe-ratio)
  - [Motley Fool, CRWD vs NOW (2026-10-07)](https://www.fool.com/coverage/better-buy/2026/10/07/crowdstrike-vs-servicenow-which-technology-stock-is-a-better-buy-in-2026/)
  - [SaaS multiples study](https://saasvaluationmultiple.com/verticals/devops-saas-multiples)
  - [TIKR DDOG vs SNOW](https://www.tikr.com/blog/datadog-vs-snowflake-which-cloud-data-stock-is-the-better-growth-play)
- Earnings call:
  - [GuruFocus Q2-26 call highlights](https://www.gurufocus.com/news/9000347/palantir-technologies-inc-pltr-q2-2026-earnings-call-highlights-record-93-revenue-growth-and-raised-guidance-signal-unprecedented-ai-demand)
  - [TIKR guidance raise](https://www.tikr.com/blog/palantirs-q2-earnings-call-produced-its-largest-ever-guidance-raise-heres-what-changed)
  - [CNBC Q2-26](https://www.cnbc.com/2026/08/03/palantir-pltr-earnings-q2-2026.html)
  - [Quartz](https://qz.com/palantir-q2-2026-earnings-revenue-guidance-080426)

---

## Thesis Invalidation

**The signal is NEUTRAL. It turns BULLISH if:**
- FY26 revenue tracks to **≥$8.6B** and the Q4 guide implies **≥80% growth**, meaning growth re-accelerates rather than fading as guided.
- The stock pulls back to **≤$160** with no change to the fundamentals. That is about 20× FY27 sales.
- Net dollar retention, US commercial growth, or both hold above **100%** through Q4-26, and international commercial growth exceeds 40%.

**It turns BEARISH if:**
- The F-Score drops below 5, or ROIC falls below WACC. This is unlikely and would mean a real business break.
- The Q3 print (around Nov 2–9) **only meets** guidance (~$2.16B) or the FY guide is raised by less than 2%.
- DSO goes above **100 days**, or Customer I's share of receivables rises above 35%.
- The 10-yr yield sustains above **5.5%**, which would compress long-duration multiples.

**Re-run this analysis when:**
- [ ] Next earnings release (Q3-26, about Nov 2–9, 2026)
- [ ] Price moves ±15% from $209 (below $178 or above $240)
- [ ] 60 days have elapsed (2026-12-10)
- [ ] Material news: a large federal contract or cancellation, budget or continuing-resolution disruption, a buyback authorization, or leadership change

╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      NEUTRAL                         ║
║ Confidence:  MEDIUM                          ║
║ Horizon:     MEDIUM-TERM                     ║
║ Score:       4.5 / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      HOLD                            ║
║ Conviction:  MODERATE                        ║
╚══════════════════════════════════════════════╝

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

The score maps a near-top business-quality reading (about 9/10) against a bottom-decile valuation reading (about 1.5/10) and stretched sentiment: the stock is at its 52-week high and above the mean target. That nets to a HOLD for existing holders and no new buying at $209.

**Disclaimer:** Educational analysis only. Not financial advice.