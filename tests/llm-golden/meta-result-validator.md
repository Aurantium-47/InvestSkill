# Result Validator: META FY2025 financial report analysis

**Validated:** `output/meta/02-financial-report-analyst.md`
**Checked against:** `data/filings/META/META_2026_10-K.txt` (accession 0001628280-26-003942) and `data/fixtures/META.md`. No browsing.

```
Data & Sources
  As of:      2025-12-31 (fiscal year end) · validation run 2026-10-11
  Source:     SEC EDGAR 10-K FY2025, accession 0001628280-26-003942 · XBRL pack data/fixtures/META.md
  Retrieval:  pasted by user (local files; no browsing)
  Confidence: HIGH for the figure checks · price $718.67 taken from the pack, not independently verified
```

## Contract check

| Required piece | Status |
|---|---|
| `Data & Sources` header (As of · Source · Retrieval · Confidence) | ✅ All four fields present. Retrieval is "pasted by user", not model memory. |
| Thesis Invalidation section | ✅ Present, with bullish and bearish branches and re-run triggers |
| Investment Signal block and closing order | ✅ Block, then the three guide lines, a mapping paragraph and the Disclaimer. Nothing follows. |

No caps apply.

## Figure audit

**Confirmed against the 10-K text (about 45 figures):**
- **Income statement:** revenue $200,966M / $164,501M; the segment split (196,175 + 2,584 + 2,207); constant currency $201.38B and the $418M FX headwind; impressions +12% and price per ad +9%; DAP 3.58B; ARPP $57.03.
- **Cash flow:** company FCF $43,585M / $52,103M; finance-lease principal $2,524M.
- **Tax:** the $15.93B / $14.03B OBBBA charge; the 30% → 13% effective tax rate; $11.23B uncertain tax positions; $7.58B cash taxes paid; the $15.89B IRS notice; $1.48B Tax Court gap.
- **Useful-life change:** $2.92B / $2.59B / $1.00 per diluted share.
- **Commitments:** $103.77B unstarted leases; $131.05B commitments ($30.63B due in 2026); $45.95B venture exposure; $12.31B venture leases; about $28B RVG threshold; $1.83B equity stake.
- **Investments:** Scale AI $13.80B; Jio $5.82B; equity-method investments $7.45B.
- **Capital return:** $26.26B buybacks (40M shares); $18.40B RSU withholding tax; $5.32B dividends; $29.91B notes issued; $25.03B authorization left; $0.525 dividend.
- **Balance sheet and other:** PP&E $176,400M (+45%); retained earnings +$18.67B; 2,187M + 343M shares; $59.0B debt principal; $1.55B legal-accrual lapping; headcount 78,865; capex guide of $115–135B; $660.09 year-end close.

**Recomputed from the data pack (all match within rounding):**
- **Margins:** gross 82.0%, operating 41.4% (−74 bps), net 30.1%.
- **Cash flow:** FCF margin 21.7%; FCF conversion 72%; capex / D&A 3.7x; SBC at 10.2% of revenue.
- **Balance sheet ratios:** DSO 35.9 vs 37.7 days; Debt/EBITDA 0.58x; interest coverage 71.5x; net debt $22.9B and net cash $(22.8)B including securities.
- **Valuation:** market cap about $1.82T; EV about $1.80T; EV/EBITDA 17.6x; P/E 30.6x; FCF yield 2.4%; payout 11.5% / 12.2%.
- **Line items:** all YoY growth rates in the income-statement table.

The report correctly spots that the pack's "SG&A" is G&A only: 36,175 + 57,372 + 11,991 + 12,152 = $117,690M of costs, and revenue minus that equals the $83,276M operating income.

**Errors found:**

| # | Claim in report | What the filing supports | Impact |
|---|---|---|---|
| 1 | "Without it, the effective tax rate would have been 13% … net income about **$76.4B (+22%)**", normalized EPS **$29.68** | The 10-K's 13% excludes only the **$14.03B valuation allowance**. The other ~$1.9B is the reduced FDII deduction, which continues after 2025. Adding back the full $15.93B implies an 11.1% rate, not 13%. Consistent with 13%: NI ≈ **$74.5B (+19.4%)**, EPS ≈ **$28.94**, normalized P/E ≈ **24.8x** (not 24.2x), normalized FCF conversion ≈ 58.5%. | Moderate. Normalized earnings are overstated by about $1.9B, and the "came entirely from a one-time charge" framing is partly wrong. The call doesn't change. |
| 2 | 2026 capex midpoint "+72% over FY2025 capex" | $125B ÷ $69.69B = **+79%**. The +72–73% only works against $72.2B, which includes finance-lease principal. The sentence labels the base as capex. | Minor. It understates the step-up. |
| 3 | "Over **$280B** of off-balance-sheet … commitments" (103.8 + 131.1 + 45.95) | The $45.95B venture exposure includes the $12.31B venture leases, which start in 2029. These very likely also sit inside the $103.77B of leases starting 2026–2030. It also includes the $1.83B equity stake, which is **on** the balance sheet. | Moderate presentation error. The real total is roughly $265B or less, and the report repeats $280B in the signal rationale. |
| 4 | Operating margin without the useful-life change "about 39.9%" | (83,276 − 2,920) ÷ 200,966 = **40.0%** | Trivial |
| 5 | Other income "includes $1.14B of unrealized equity gains" | The filing confirms unrealized gains drove the increase. It shows $413M on marketable equity, but I couldn't find the $1.14B total in the text. | ❓ Unverified |

## Dimension scores

| Dimension | Score | Rationale |
|---|---|---|
| **1. Data Quality** | **12 / 20** | Sources 5/5: named filing, accession and line-level citations. Recency 1/5: fundamentals are about 9 months old and none of the 2026 10-Qs were provided (the report says so). Completeness 3/5: several items honestly marked unavailable (revolver, risk-factor diff, insiders, guidance scorecard). Consistency 3/5: errors 1–3 above. |
| **2. Methodology** | **14 / 20** | Fit 4/5: the right approach for a statement-quality review, with a sensible choice of company vs. pack FCF definition. Stated 4/5: normalization and the illustrative 2026 FCF are labelled. Reasonable 3/5: the normalization adds back a recurring piece, and the "OCF +20%" assumption is arbitrary even though it's labelled. Cross-checked 3/5: reported and normalized P/E, EV/EBITDA and FCF yield, but no intrinsic valuation (expected for this skill). |
| **3. Signal Consistency** | **6 / 20** | Technical vs. fundamental 3/7: no technical input, and the fundamentals are themselves mixed (strong operations, falling FCF), which fits NEUTRAL. Sentiment 0/7: no insider or institutional data in scope. Macro 3/6: neutral, with tax-law and ad tailwinds against AI-capex and regulatory headwinds. The low score is structural for a single-filing skill, not an execution flaw. |
| **4. Risk Coverage** | **17 / 20** | Risks 7/7: nine ranked red flags, specific and sourced. Bear case 4/7: quantified 2026 FCF of $4–24B, but no downside price scenario. Catalysts 6/6: dated trials, the FTC appeal, the IRS notice and the next 10-Q. |
| **5. Reasoning Transparency** | **17 / 20** | Logic 6/7: a 5.6 NEUTRAL follows from the evidence, and error #1 doesn't move it. Contrarian 5/7: balanced positives and negatives, but the bearish invalidation branch is template boilerplate ("a new auditor clears all concerns and the restatement is resolved favorably", when there is no restatement or auditor issue). Limitations 6/6: an exemplary stale-period warning, with each data gap named. |

```
Data Quality:            12 / 20
Methodology Soundness:   14 / 20
Signal Consistency:       6 / 20
Risk Coverage:           17 / 20
Reasoning Transparency:  17 / 20
─────────────────────────────────
TOTAL CONFIDENCE:        66 / 100   → MEDIUM
```

## Flags

### 🚩 Red flags
- None. Nothing is fabricated, every load-bearing number traces to the filing, and no claim relies on model memory.

### ⚠ Warnings
- **Tax normalization is internally inconsistent** (13% rate vs. a $15.93B add-back). Normalized NI, EPS, P/E and FCF conversion are all slightly too favourable.
- **The "$280B off-balance-sheet" total double-counts** the venture leases and includes an on-balance-sheet stake. The headline figure also appears in the signal rationale.
- **The capex step-up is mislabelled** (+72% vs. the correct +79% on the capex line).
- **The bearish thesis-invalidation branch is boilerplate** and doesn't match this company's facts.
- The accounting-quality score gives **2/3 to related-party transactions while calling them "not assessable"**. That should be scored as n/a, not as credit.
- **The fundamentals are 9+ months old** at a $718.67 price that reflects three later quarters. The report discloses this itself.

### ✅ Strengths
- Figures are highly accurate. About 45 filing figures were confirmed and all pack-derived ratios recompute.
- It catches two real data-pack defects: G&A labelled as SG&A, and FCF that omits finance-lease principal.
- Its handling of stale data is exemplary: an explicit warning and each unavailable item named rather than guessed.
- It goes beyond the headline numbers: the VIE critical audit matter, the RVG, the $18.4B RSU withholding and the useful-life tailwind are all surfaced and quantified.

## Recommended next steps
1. **Fix the four errors above**, recomputing normalized NI, EPS and P/E with the $14.03B add-back, and re-state the commitments total without double counting.
2. **Load the Q1–Q3 2026 10-Qs** (`node scripts/fetch-edgar.js META --form 10-Q`). This is the biggest lever on Data Quality and on the stale-period caveat.
3. Run `fact-check` on the corrected report for a formal ledger, then `/stock-valuation` (04 in this series) to supply the intrinsic-value cross-check this skill doesn't do.
4. To raise Signal Consistency, pair this with `insider-trading` / `institutional-ownership` and `technical-analysis`.

## Adjusted signal

```
╔══════════════════════════════════════════════╗
║         VALIDATED INVESTMENT SIGNAL          ║
╠══════════════════════════════════════════════╣
║ Original Signal:  NEUTRAL                    ║
║ Original Score:   5.6 / 10                   ║
╠══════════════════════════════════════════════╣
║ Confidence Tier:  MEDIUM                     ║
║ Confidence Score: 66 / 100                   ║
╠══════════════════════════════════════════════╣
║ Adjusted Action:  HOLD                       ║
║ (Signal stands — errors are moderate and do  ║
║  not change direction; conviction weakened   ║
║  by 9-month-old fundamentals)                ║
╚══════════════════════════════════════════════╝
```

╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      NEUTRAL                         ║
║ Confidence:  MEDIUM                          ║
║ Horizon:     MEDIUM-TERM                     ║
║ Score:       5.6 / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      HOLD                            ║
║ Conviction:  WEAK                            ║
╚══════════════════════════════════════════════╝

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

The original NEUTRAL 5.6 / HOLD stands: correcting the tax normalization moves normalized P/E from 24.2x to about 24.8x, and correcting the commitments total trims a headline but not the thesis. Conviction drops from MODERATE to WEAK because the call rests entirely on fundamentals more than 9 months old, and the Q3 2026 10-Q is likely weeks away.

**Disclaimer:** Educational analysis only. Not financial advice.