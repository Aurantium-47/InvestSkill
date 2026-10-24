# Forensic Accounting — Are the Reported Earnings Real?

## ⚠️ Data Verification — Do This Before Any Analysis

Before running any analysis, always retrieve the latest market data for the ticker:

1. **Fetch current price** — use web search or ask the user for the live price, 52-week range, and market cap. Never assume a price from training data. (Market cap feeds Altman's X4; everything else in this skill comes from the filings.)
2. **Pull the filings, not a data feed** — this skill needs **at least two, preferably three to five, consecutive fiscal years** of as-filed statements, plus their notes:
   - **10-K Item 8**: income statement, balance sheet, cash-flow statement (for every index below you need year *t* and year *t−1*).
   - **Revenue note** (ASC 606): disaggregation, contract assets / **unbilled receivables**, deferred revenue, remaining performance obligations, any bill-and-hold or principal-vs-agent judgment.
   - **Receivables / allowance note**, **inventory note** (reserves, LIFO/FIFO changes), **PP&E and intangibles notes** (capitalised software, useful-life changes), **capitalised contract costs** (ASC 340-40), **related-party note**, **stock-compensation note**, **commitments and contingencies**.
   - **Auditor's report** (opinion, **critical audit matters**, going-concern paragraph, tenure), **Item 9A** (internal control over financial reporting — material weaknesses), and **8-K Item 4.01** (auditor change) / **Item 4.02** (non-reliance — restatement) for the last five years.
   - **Earnings releases** for the non-GAAP reconciliation (8-K Exhibit 99.1), and **Form 4s** for insider sales around results.
   Use as-filed figures; when a later filing restated a prior year, note both and compute the indices on the restated basis (the restatement itself is a finding).
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

Every valuation in this catalog takes reported earnings as an input. This skill asks the question that comes first: **how much of that earnings number is cash, how much is judgment, and do the patterns in the statements look like the patterns that preceded past manipulations and failures?** It runs the academic screens that have a track record (Beneish's M-Score, Altman's Z, Sloan's accruals anomaly), then the practitioner checks that catch what the models miss — revenue-recognition stretch, cost capitalisation, the widening gap between "adjusted" and GAAP earnings, stock compensation treated as free, and the governance tells (auditor changes, material weaknesses, restatements, related parties).

**This is a screen for risk, not an accusation.** A high reading means "the statements have the shape of trouble and deserve a skeptical read," not "this company commits fraud." Most companies that trip one flag have an innocent explanation (an acquisition distorts DSRI; a fast grower has high SGI by definition). The skill's job is to compute the numbers exactly, explain each flag, and say which explanation the filings support.

**Where it sits.** `financial-report-analyst` reads the filing and gives an Accounting Quality Score; `10k-digest` summarises it; `bear-case` argues the short thesis and *mentions* Beneish without computing it. This skill does the arithmetic and returns a **Manipulation Risk Score (0–10, higher = more risk)**. Feed a high score into `bear-case` as evidence, check any surprising figure with `fact-check`, and read insider selling around the flagged periods with `insider-trading`.

---

## 1. Inputs

| Input | Required | Default if unstated |
|-------|----------|---------------------|
| Ticker | ✅ | — |
| Fiscal years to cover | recommended | latest 3 fiscal years (2 is the minimum for any index; 5 for trend checks) |
| Filings pasted by the user (10-K, 10-Q, earnings release) | optional | retrieve from SEC EDGAR; say which accession numbers were used |
| Sector override (`--sector bank / insurer / reit`) | optional | inferred from SIC code; changes which models apply (§2, Phase 7) |
| Peer tickers for DSO / accrual comparison | optional | 2–3 closest peers named in the 10-K or by `competitor-analysis` |
| Specific concern ("short report says channel stuffing") | optional | none — run the full screen |

**Quarterly mode.** If the user asks about a recent quarter, compute DSO/DIO/DPO, unbilled receivables and the non-GAAP gap on trailing-twelve-month figures and the last eight quarters; run Beneish and Altman on fiscal years only (the coefficients were estimated on annual data).

---

## 2. Framework

### Phase 1 — Beneish M-Score (8-variable model)

Compute each index from year *t* (latest) and year *t−1*. Show every input in a table so the reader can check the arithmetic.

| Index | Formula | What a high value suggests | Non-manipulator mean | Manipulator mean |
|-------|---------|---------------------------|---------------------|-----------------|
| **DSRI** Days' Sales in Receivables Index | (Receivables_t / Sales_t) ÷ (Receivables_t−1 / Sales_t−1) | Receivables growing faster than sales — revenue booked before cash | 1.031 | 1.465 |
| **GMI** Gross Margin Index | GM_t−1 ÷ GM_t, where GM = (Sales − COGS) / Sales | Deteriorating margins — pressure to manage earnings | 1.014 | 1.193 |
| **AQI** Asset Quality Index | [1 − (Current assets_t + Net PP&E_t + Securities_t) / Total assets_t] ÷ [same for t−1] | More costs parked in soft, non-current assets (capitalisation) | 1.039 | 1.254 |
| **SGI** Sales Growth Index | Sales_t ÷ Sales_t−1 | Growth firms face pressure to sustain it; not manipulation by itself | 1.134 | 1.607 |
| **DEPI** Depreciation Index | [Dep_t−1 / (Dep_t−1 + Net PP&E_t−1)] ÷ [Dep_t / (Dep_t + Net PP&E_t)] | Slower depreciation — useful lives lengthened | 1.001 | 1.077 |
| **SGAI** SG&A Index | (SG&A_t / Sales_t) ÷ (SG&A_t−1 / Sales_t−1) | SG&A rising relative to sales — weaker efficiency | 1.054 | 1.041 |
| **LVGI** Leverage Index | [(Current liabilities_t + Total long-term debt_t) / Total assets_t] ÷ [same for t−1] | Rising leverage — debt-covenant incentives | 1.037 | 1.111 |
| **TATA** Total Accruals to Total Assets | (Income from continuing operations_t − Cash from operations_t) / Total assets_t | Earnings not backed by cash | 0.018 | 0.031 |

Reference means are from Beneish (1999), "The Detection of Earnings Manipulation," *Financial Analysts Journal*.

**The model:**

```
M = −4.84 + 0.920·DSRI + 0.528·GMI + 0.404·AQI + 0.892·SGI
          + 0.115·DEPI − 0.172·SGAI + 4.679·TATA − 0.327·LVGI
```

| M-Score | Reading |
|---------|---------|
| > −1.78 | **Likely manipulator zone** (Beneish's original cutoff) |
| −2.22 to −1.78 | **Grey zone** — the widely used, more conservative −2.22 cutoff (originally paired with the 5-variable model) flags it; the original does not |
| < −2.22 | Unlikely manipulator |

Report the M-Score against **both** cutoffs and name the one or two indices that drive it (largest coefficient × deviation from the non-manipulator mean). A score above the threshold driven only by SGI (a genuine fast grower) is weaker evidence than one driven by DSRI + TATA + AQI.

**Computation rules.**
- *Securities* in AQI = long-term investments (not cash). If the balance sheet shows none, use 0 and say so.
- *Depreciation* excludes amortisation of acquired intangibles where the filing separates them; *Net PP&E* excludes operating-lease right-of-use assets (ASC 842 inflates AQI otherwise — note it if the adoption year is in the window).
- A major acquisition in year *t* distorts DSRI, AQI and SGI. Flag it and, if the target's pro-forma figures are disclosed, recompute on a pro-forma basis.
- The model was estimated on non-financial firms; do not run it on banks, insurers or REITs (Phase 7).

### Phase 2 — Altman Z (distress, not fraud — but distress is a motive)

Choose the version by the company's profile, state which you used and why:

| Version | Use for | Formula | Safe | Grey | Distress |
|---------|---------|---------|------|------|----------|
| **Z** (1968) | Public **manufacturers** / asset-heavy industrials | 1.2·X1 + 1.4·X2 + 3.3·X3 + 0.6·X4 + 1.0·X5 | > 2.99 | 1.81 – 2.99 | < 1.81 |
| **Z'** (1983) | **Private** manufacturers (no market cap) | 0.717·X1 + 0.847·X2 + 3.107·X3 + 0.420·X4′ + 0.998·X5 | > 2.90 | 1.23 – 2.90 | < 1.23 |
| **Z''** (1995) | **Non-manufacturers** (services, software, retail) and **emerging-market** issuers | 6.56·X1 + 3.26·X2 + 6.72·X3 + 1.05·X4′ | > 2.60 | 1.10 – 2.60 | < 1.10 |

Where X1 = working capital / total assets; X2 = retained earnings / total assets; X3 = EBIT / total assets; X4 = market value of equity / total liabilities; X4′ = book equity / total liabilities; X5 = sales / total assets. Z'' drops X5 because asset turnover varies too much across non-manufacturing industries. For emerging-market issuers, Altman's EM score adds a constant of 3.25 to Z'' (zones > 5.85 / 4.35–5.85 / < 4.35).

**Caveats to print.** Large buybacks drive retained earnings (X2) negative for healthy companies — say so rather than calling them distressed. Asset-light software firms with big deferred revenue look worse on X1 than they are. Never apply Z to banks, insurers, or REITs.

### Phase 3 — Accruals and cash conversion

**Sloan accruals ratio — balance-sheet version** (Sloan 1996):

```
Accruals_BS = (ΔCurrent assets − ΔCash) − (ΔCurrent liabilities − ΔShort-term debt − ΔTaxes payable) − Depreciation & amortisation
Accruals ratio_BS = Accruals_BS / Average total assets
```

**Cash-flow version** (cleaner; unaffected by acquisitions and reclassifications):

```
Accruals_CF = Net income − (Cash from operations + Cash from investing)
Accruals ratio_CF = Accruals_CF / Average net operating assets
   (NOA = (Total assets − Cash & investments) − (Total liabilities − Total debt))
```

| Accruals ratio (either version) | Reading |
|-------------------------------|---------|
| between −10% and +10% | Normal |
| +10% to +20% | Elevated — earnings running ahead of cash; explain it |
| > +20% | Red flag — Sloan's top accrual decile historically underperformed |
| < −10% | Conservative accounting or heavy investment (check CFI) — usually benign |

**Cash conversion.** OCF / Net income for each of the last 3–5 years, and the cumulative ratio (Σ OCF / Σ NI) across the window. Cumulative ≥ 1.0 is healthy for a mature company; **below 0.8 cumulatively** is a flag. One bad year is noise; a declining trend while net income rises is the classic divergence. Also check *where* OCF comes from: a one-off boost from stretching payables, selling receivables (factoring), or supplier-finance programmes is not durable — look for it in the working-capital lines and the supplier-finance disclosure (ASU 2022-04).

**SBC-adjusted free cash flow.**

```
FCF          = OCF − Capex (including capitalised software)
SBC-adj. FCF = FCF − Stock-based compensation
SBC % revenue = SBC / Revenue
```

| SBC % of revenue | Reading |
|------------------|---------|
| < 5% | Normal for most sectors |
| 5% – 15% | Material — value FCF only on the SBC-adjusted line |
| > 15% | Severe — reported FCF overstates owner earnings; check net share count growth |

Report net dilution (diluted share count change, after buybacks) alongside it: buybacks that only offset SBC are a compensation expense paid in cash.

### Phase 4 — Revenue recognition and working capital

**Working-capital days, 3–5 years, vs. 2–3 peers:**

```
DSO = Accounts receivable / Revenue × 365
DIO = Inventory / COGS × 365
DPO = Accounts payable / COGS × 365
CCC = DSO + DIO − DPO
```

Flag any of these **rising more than 15% year on year without a disclosed reason** (mix shift, new large customer with longer terms, acquisition). DSO rising while revenue accelerates is the core channel-stuffing pattern; DIO rising with flat sales signals obsolescence the reserve may not cover; DPO rising sharply flatters OCF temporarily.

**Revenue-recognition red flags — check each, mark ✅ none found / ⚠️ present / ❓ not disclosed:**

| Flag | Where to look | What it looks like |
|------|---------------|-------------------|
| **Unbilled receivables / contract assets growing faster than revenue** | Revenue note (ASC 606 contract balances) | Revenue recognised on progress or milestones before the customer can be billed — judgment-heavy |
| **Channel stuffing** | MD&A, receivables, distributor disclosures, quarterly revenue shape | DSO up, quarter-end revenue spike, distributor inventory rising, extended payment terms or rights of return, next-quarter weakness |
| **Bill-and-hold** | Revenue policy note | Revenue on goods the company still holds; ASC 606 allows it only under strict criteria — any mention needs scrutiny |
| **Principal vs. agent** | Revenue policy | Gross revenue booked on pass-through transactions inflates growth (not profit) |
| **Changes in estimates** | Policy note, CAMs | Shift in percentage-of-completion inputs, variable consideration, returns reserves, useful lives |
| **Deferred revenue falling while revenue rises** | Balance sheet | For subscription businesses, a leading indicator that future revenue is weakening or terms changed |
| **Allowance for doubtful accounts falling as % of receivables** | Receivables note | Reserve release flattering earnings |
| **Quarter-end concentration / large "other" revenue** | 10-Q segment data | Revenue that does not fit the segment story |

### Phase 5 — Capitalised costs and the GAAP vs. non-GAAP gap

**Capitalisation.** For each category, report the amount capitalised in the year, as % of the related expense, and the trend:

| Category | Standard | Flag when |
|----------|----------|-----------|
| Internal-use / for-sale software | ASC 350-40 / ASC 985-20 | Capitalised share of total software spend rising; amortisation period lengthened |
| Development costs (R&D) | US GAAP expenses most R&D; IFRS (IAS 38) capitalises development | IFRS filer whose capitalised development grows faster than revenue |
| Contract acquisition costs (commissions) | ASC 340-40 | Asset growing faster than revenue; amortisation period longer than the customer life |
| Capitalised interest, customer-acquisition or "pre-opening" costs | Various | Any new capitalisation policy in the window |

Capitalising costs moves them from the income statement and from OCF into investing cash flow — so check capex including capitalised software, not just PP&E capex.

**Non-GAAP vs. GAAP gap.** For each of the last 3–5 years (and 8 quarters):

```
Gap % = (Non-GAAP net income − GAAP net income) / |GAAP net income|
```

Itemise the adjustments. Flag: a gap **widening for three consecutive periods**; "one-time" restructuring charges that recur in most years; SBC excluded *and* buybacks presented as returning capital; acquisition-related amortisation excluded while acquisitions are the growth strategy; adjustments the company *added* this year.

### Phase 6 — Governance, audit, and related parties

| Check | Source | Risk reading |
|-------|--------|--------------|
| **Auditor change** in last 5 years | 8-K Item 4.01 | Resignation (vs. dismissal) and any reported disagreement or reportable event is a **major** flag; a move from a large audit firm to a much smaller one is a flag |
| **Critical audit matters** | Auditor's report | List them; CAMs on revenue recognition, inventory valuation, or capitalisation overlap with Phases 4–5 — read them together |
| **Going-concern** paragraph | Auditor's report, MD&A | Substantial doubt → hard floor (below) |
| **Material weakness** in ICFR | Item 9A | Any MW in the last 3 years; worse if it relates to revenue or the financial close, or remediation keeps slipping |
| **Restatement / non-reliance** | 8-K Item 4.02, "as restated" labels | "Big R" restatement (prior statements no longer reliable) is a major flag; "little r" revision less so — say which |
| **Late filing** | Form 12b-25 (NT 10-K / NT 10-Q) | Late filing plus auditor issues is the pattern that precedes most restatements |
| **Related-party transactions** | Related-party note, proxy | Sales to, purchases from, leases with, or loans to entities controlled by insiders; size vs. revenue or SG&A |
| **CFO / CAO turnover** | 8-K Item 5.02 | More than one finance-chief change in 3 years |
| **Insider selling around results** | Form 4 | Clustered sales by the CEO/CFO shortly before a weak print or a restatement — hand to `insider-trading` for the detail |
| **SEC inquiries, subpoenas, short-seller reports** | Contingencies note, 8-Ks, news | Note the allegation and whether the filings support or rebut it — do not adjudicate |

### Phase 7 — Sector exceptions (financials, insurers, REITs)

The standard models assume an operating company. For these sectors, **do not compute** the listed models — say they do not apply and use the substitutes:

| Sector | Do not apply | Use instead |
|--------|-------------|-------------|
| **Banks / lenders** | Beneish (excluded from its estimation sample), Altman Z / Z' / Z'', DSO/DIO, cash conversion (OCF is dominated by loan and deposit flows) | Provision for credit losses vs. net charge-offs (reserve releases flattering EPS), allowance / loans trend, Level 3 assets as % of equity, held-to-maturity unrealised losses (AOCI), non-GAAP "core" adjustments |
| **Insurers** | Beneish, Altman, DSO/DIO, OCF/NI | Prior-year reserve development (repeated favourable releases, then a large strengthening), reserve-to-premium trends, reinsurance with related or offshore entities, Level 3 investments |
| **REITs** | Altman X2 (REITs distribute nearly all income), EPS-based accruals | FFO / AFFO reconciliation (what is added back), straight-line rent and capitalised leasing costs as % of AFFO, capitalised interest on development, related-party management fees |

Governance checks (Phase 6) apply to every sector. For these companies the score is built from Phase 6 plus the substitutes; renormalise the weights (Phase 8) and say so.

### Phase 8 — Manipulation Risk Score (0–10, higher = more risk)

Score each component **0 (clean) to 10 (severe)** on the anchors, then weight:

| Component | Weight | 0 looks like | 5 looks like | 10 looks like |
|-----------|--------|-------------|-------------|---------------|
| Beneish M-Score | 20% | M < −2.50, no index above the manipulator mean | −2.22 < M < −1.78, or M > −1.78 driven only by SGI | M > −1.78 driven by DSRI, TATA, or AQI |
| Accruals & cash conversion | 20% | Accruals ratio within ±10%; cumulative OCF/NI ≥ 1.0 | Accruals 10–20%, or OCF/NI 0.8–1.0 | Accruals > 20% and OCF/NI < 0.8, or OCF propped up by factoring / supplier finance |
| Revenue recognition & working capital | 20% | Stable DSO/DIO vs. peers; no red flags | One flag with a plausible disclosed reason | DSO and unbilled receivables rising with revenue acceleration; bill-and-hold or rising returns rights |
| Capitalisation, non-GAAP & SBC | 15% | Stable capitalisation; gap < 10%; SBC < 5% of revenue | Gap widening, or SBC 5–15% | New/expanding capitalisation policy, gap widening 3 periods, SBC > 15% |
| Governance & audit | 15% | Long-tenured auditor, no MW, no restatement, minor related parties | One CAM in a sensitive area or a remediated MW | Auditor resignation, unremediated MW, Big-R restatement, material related-party revenue |
| Distress motive (Altman) | 10% | Safe zone | Grey zone | Distress zone |

```
Manipulation Risk Score (MRS) = Σ weight × component score
Box Score                     = 10 − MRS
```

**Hard floors on MRS** (state any that fired):
- Going-concern paragraph, auditor resignation with a disagreement, or a Big-R restatement in the last 3 years → MRS ≥ **7.0**
- Unremediated material weakness, late 10-K filing, or an open SEC enforcement inquiry → MRS ≥ **6.0**

**Missing data.** If a component cannot be computed (one year of data only, sector exception), drop it and renormalise the remaining weights to 100%, list what was dropped, and cap Confidence at MEDIUM. Never score an uncomputed component as 0.

| MRS | Reading | Box Score | Signal |
|-----|---------|-----------|--------|
| 0.0 – 4.0 | Low risk — earnings appear backed by cash and conservative policy | 6.0 – 10.0 | BULLISH |
| 4.1 – 6.0 | Moderate — specific items need monitoring | 4.0 – 5.9 | NEUTRAL |
| 6.1 – 10.0 | High — treat reported earnings as unreliable until explained | 0.0 – 3.9 | BEARISH |

---

## 3. Output Format

1. **Data & Sources** header (above), listing the filings (form, fiscal year, accession number) used
2. **Executive Summary** — three sentences: the MRS and what drives it, the single most important flag, what to do (monitor / dig further / avoid until explained)
3. **Beneish table** — eight indices with inputs, *t* and *t−1* values, the M-Score vs. −1.78 and −2.22, and the driving indices
4. **Altman table** — version used and why, X1–X5, Z, zone, and any caveat (buybacks, deferred revenue)
5. **Accruals & cash** — Sloan ratio (both versions), OCF/NI by year and cumulative, FCF vs. SBC-adjusted FCF, SBC % revenue, net dilution
6. **Revenue & working capital** — DSO/DIO/DPO/CCC trend vs. peers; red-flag checklist (✅ / ⚠️ / ❓)
7. **Capitalisation & non-GAAP** — capitalised amounts and trend; GAAP vs. non-GAAP bridge by year
8. **Governance & audit** — auditor, CAMs, going concern, MW, restatements, related parties, insider sales
9. **Manipulation Risk Score** — component table, hard floors fired, MRS, box Score = 10 − MRS
10. **Thesis Invalidation** — what would reverse the call (below)
11. **Investment Signal Block** — the standard box (below)

---

## Example

```
User: Run a forensic accounting check on ZEPH (fictional ticker, FY2024–FY2025 10-Ks pasted)

The assistant fills the Data & Sources header (two 10-Ks, pasted by user, HIGH),
then computes the Beneish indices. Hypothetical inputs: revenue grew from $800M to
$1,000M (SGI 1.25) while receivables grew from $120M to $200M, so DSRI =
(200/1,000) / (120/800) = 1.33 — well above the non-manipulator mean of 1.03.
Net income of $90M against OCF of $40M on $1,600M of assets gives TATA = 0.031,
at the manipulator mean. With GMI 1.02, AQI 1.10, DEPI 1.05, SGAI 0.95 and
LVGI 1.00, M = −4.84 + 1.227 + 0.539 + 0.444 + 1.115 + 0.121 − 0.163 + 0.146
− 0.327 = −1.74: above both cutoffs, driven by DSRI and SGI.

Z'' (ZEPH is a software company) sits in the safe zone, so there is no distress
motive. The cash-flow accruals ratio is +14% and cumulative OCF/NI over three years
is 0.62. The revenue note shows unbilled receivables up 140% against revenue up
25%, and capitalised commissions growing faster than revenue. The auditor is
unchanged and there is no material weakness.

Components: Beneish 8, accruals 8, revenue 8, capitalisation 6, governance 2,
distress 1 → MRS 6.1, box Score 3.9, BEARISH, MEDIUM confidence (two years only;
peer DSO not supplied). Next steps: `fact-check` the receivables figures,
`earnings-call-analysis` for management's explanation of unbilled growth,
`bear-case` to build the full short thesis.
```

---

## Notes

- **Screens, not verdicts.** Beneish's model catches a meaningful share of later-revealed manipulators but also flags many innocent firms; Altman's Z predicts distress, not fraud. Use the language "consistent with" and "warrants scrutiny," never "the company is manipulating earnings."
- **Never invent figures.** Every index needs two years of exact line items; if they were not retrieved or pasted, mark the index "not computed" rather than estimating it from memory.
- **Show the arithmetic.** Print the inputs to every ratio. A forensic report the reader cannot re-check is worthless — and `fact-check` will re-check it.
- **Context beats thresholds.** An acquisition, a change in fiscal year, ASC 606 / ASC 842 adoption, or a business-model shift (hardware to subscription) breaks year-over-year indices. Identify the event and, where possible, compute on a like-for-like basis.
- **Fast growers trip SGI and DSRI honestly.** Compare DSO with peers and with the company's own history before calling it stuffing.
- **Short-seller reports** are allegations; test their specific claims against the filings and report which are supported, contradicted, or unverifiable.
- Run before: `10k-digest` or `financial-report-analyst` (to orient in the filing). Run after: `bear-case` (to argue the risk), `fact-check` (to verify any figure that drives the score), `insider-trading` (for sales around flagged periods), `credit-check` (if the Altman reading is grey or distressed).

## Thesis Invalidation

After delivering the analysis signal, specify what would reverse it:

**If signal is BULLISH (low manipulation risk) — thesis breaks if:**
- DSO or unbilled receivables rise more than 15% year on year without a disclosed reason in the next 10-Q, or cumulative OCF/NI falls below 0.8
- The auditor resigns, a material weakness is disclosed, an 8-K Item 4.02 non-reliance notice is filed, or a 10-K is filed late (NT 10-K)
- The non-GAAP gap widens for a third consecutive period or a new capitalisation policy appears
- A credible short-seller report or SEC inquiry makes specific claims the filings cannot rebut

**If signal is BEARISH (high manipulation risk) — thesis breaks if:**
- The flagged receivables or contract assets convert to cash in the next one to two quarters (OCF catches up with net income)
- The driver of the M-Score is explained by an identified event (acquisition, ASC 606 transition) and the like-for-like recomputation falls below −2.22
- A material weakness is remediated with a clean ICFR opinion, or a new auditor issues a clean opinion without restating
- The company narrows its non-GAAP adjustments or begins expensing previously capitalised costs

**Re-run this analysis when:**
- [ ] Next 10-K is filed (the models are annual) — and each 10-Q for the working-capital and non-GAAP checks
- [ ] Any 8-K Item 4.01 (auditor change), 4.02 (non-reliance), or 5.02 (CFO departure)
- [ ] An NT 10-K / NT 10-Q late-filing notice, or a short-seller report is published
- [ ] Price moves ±15% from current level
- [ ] Material news event (acquisition, leadership change, regulatory decision)

## Standard Signal Output

This skill measures **reporting risk, not valuation or direction**, so state the mapping: `Signal: BULLISH` means the reported earnings look trustworthy enough to use as an input for valuation; `NEUTRAL` means specific items need monitoring before relying on them; `BEARISH` means treat the reported earnings as unreliable until the flags are explained. `Action: SELL` here means "do not underwrite a position on these numbers" — read *whether the stock is cheap* from `stock-valuation`, not from this block.

All analysis concludes with this standardized block:

In the output, the box below is followed immediately by this machine-readable footer — the same values as the box, filled in (no placeholders, no comments), so tools can read the result without parsing the box:

```json
{"investskill": "1", "skill": "forensic-accounting", "ticker": "<TICKER, or null for a portfolio / market-wide view>", "as_of": "<YYYY-MM-DD from Data & Sources>", "signal": "<BULLISH | NEUTRAL | BEARISH>", "confidence": "<HIGH | MEDIUM | LOW>", "horizon": "<SHORT-TERM | MEDIUM-TERM | LONG-TERM>", "score": 0.0, "action": "<BUY | HOLD | SELL>", "conviction": "<STRONG | MODERATE | WEAK>", "retrieval": "<pasted by user | web/tool retrieval | model memory>", "sources": ["<each primary source, dated>"]}
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

**Note:** The box Score is **10 − Manipulation Risk Score**, so higher manipulation risk produces a lower Score and a more bearish signal (MRS 7.0 → Score 3.0 → BEARISH); always print the MRS itself next to the box. Confidence is at most MEDIUM when fewer than three fiscal years were analysed or any component was dropped, and LOW when the figures came from model memory.

**Disclaimer:** Educational analysis only. Not financial advice.
