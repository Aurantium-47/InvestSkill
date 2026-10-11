# Fact Check: `output/nvda/01-financial-report-analyst.md` (NVDA 10-K FY2026)

```
Data & Sources
  As of:      2026-01-25 (FY2026 fiscal year end) · cover-page shares as of 2026-02-20 · price as of 2026-10-09 close (from the pack)
  Source:     NVIDIA Form 10-K for the FY ended 2026-01-25, filed 2026-02-25, accession 0001045810-26-000021
              (data/filings/NVDA/NVDA_2026_10-K.txt, plus the .json filing metadata) · XBRL data pack data/fixtures/NVDA.md
              (scripts/fetch-fundamentals.js, retrieved 2026-10-11)
  Retrieval:  pasted by user (local files; no browsing, as instructed)
  Confidence: HIGH for reported figures (Tier 1, checked line by line) · LOW–MEDIUM for price and share count (user-supplied pack only)
```

> ⚠️ **No live market data was used.** Every claim was checked against the two user-supplied files. The $229.28 price and the 24,100M share count come only from the data pack, so verification of those stops at the pack. They were not independently confirmed.

**Verification summary:** 114 claims · 85 verified · 22 recomputed (22 agree) · 2 mismatches · 1 unverifiable · 4 stale (flagged on recomputed multiples) · 4 qualitative (2 supported, 1 qualified, 1 unsupported) · **Verification Score 8.5 / 10 · Caps fired: none**

---

## 1. Signal-driving claims

| ★ | Claim | Verdict | Source · location | Delta |
|---|---|---|---|---|
| ★1 | Revenue $215.9B, +65.5% | ✅ | [1] Income Statement p.51: 215,938 / 130,497 → +65.47% | 0 |
| ★2 | FCF $96.7B, 44.8% margin | ✅ + 🔁 agrees | [4] Cash Flows p.55: OCF 102,718 − capex 6,042 = 96,676; ÷ 215,938 = 44.77% | 0 |
| ★3 | $54.1B net cash | 🔁 agrees, with a definition caveat | [2] p.53 / [7] p.42: 62,556 − 8,468 = 54,088 | 0. It includes $12.9B of public equities, $10.5B of them locked up. Excluding equities it is **$41.2B** |
| ★4 | P/E 46.8x (FY26 EPS $4.90) | 🔁 agrees · 🕒 | [1] diluted EPS $4.90; 229.28 ÷ 4.90 = 46.79x | 0. EPS is 8.5 months old, which the report discloses |
| ★5 | Two direct customers = 36% (22% + 14%); top one up from 12% | ✅ | [6] Concentration of Revenue p.41; [13] Note 16 p.78 | 0 |

The other number the signal rests on, the 16/21 accounting-quality total, sums correctly (3+2+2+1+3+3+2).

---

## 2. Claim ledger

Type codes: R = reported · D = derived · M = market · F = fact · Q = qualitative. ★ marks signal-driving claims. References [n] are listed in §8.

| # | Claim (report §) | Type | Verdict | Source · location |
|---|---|---|---|---|
| | **Orientation (Ph 1)** | | | |
| 1 | FYE 2026-01-25, 52-week year | F | ✅ | [8] Note 1 "Fiscal Year" p.56 |
| 2 | Filed 2026-02-25, 31 days after FYE | F/D | ✅ | Filing metadata (.json); audit report dated 2026-02-25 [14] |
| 3 | PwC unqualified; ICFR effective | F | ✅ | [14] pp.49–50; Item 9A p.45 |
| 4 | CAM = inventory provisions and excess purchase commitments | F | ✅ | [14] p.50 |
| 5 | No auditor change | F | ✅ | [14] "auditor since 2004" |
| 6 | Restatement / clawback boxes unchecked | F | ✅ | [17] cover |
| | **Revenue (Ph 2.1)** | | | |
| 7★ | Revenue 215,938 / 130,497, +65.5% | R | ✅ | [1] |
| 8 | Data Center 193,737 / 115,186, +68.2% | R | ✅ | [13] p.79 |
| 9 | DC compute +59%, networking +142% | R | ✅ | [6] p.40; [13] 162,361/102,196 and 31,376/12,990 |
| 10 | Gaming 16,042 / 11,350, +41.3%, plus supply-headwind quote | R | ✅ (quote abridged, see §5) | [13]; [5] p.37 |
| 11 | ProViz 3,191 / 1,878, +69.9% | R | ✅ | [13] |
| 12 | Automotive 2,349 / 1,694, +38.7% | R | ✅ | [13] |
| 13 | OEM & Other 619 / 389, +59.1% | R | ✅ | [13] |
| 14 | US 149,617 / 77,482, +93.1%, 69% of revenue | R | ✅ | [13] p.78 |
| 15 | Taiwan 42,345 / 23,600, +79.4% | R | ✅ | [13] |
| 16 | China incl. HK 19,677 / 25,048, −21.4%; 9.1% of revenue vs 19.2% | R/D | ✅ | [13] |
| 17 | Other 4,299 / 4,367, −1.5% | R | ✅ (−1.56%, within 0.1 pp) | [13] |
| 18 | C&N +67%, Graphics +57% | R | ✅ | [6] p.40 |
| 19 | Groq: no customer contracts; acquisitions $1.5B net; pro forma not material | F | ✅ | [8] Note 2 p.61; [4] 1,535 |
| 20 | RPO $2.3B, 42% within 12 months | R | ✅ | [10] Note 9 p.69 |
| 21 | Deferred revenue additions $11.1B vs $5.1B | R | ✅ | [10] 11,137 / 5,083 |
| | **Margins (Ph 2.2)** | | | |
| 22 | GM 71.1% vs 75.0%, −390 bps | R | ✅ | [5] p.37 |
| 23 | H20 charge $4.5B | R | ✅ | [5] p.36; [6] p.41 |
| 24 | GM excl. H20 73.2%, −180 bps | D | 🔁 agrees | 157,963 ÷ 215,938 = 73.15% |
| 25 | Op margin 60.4% vs 62.4%, −200 bps | R | ✅ | [6] % table p.40 |
| 26 | Opex +41% | R | ✅ | [5] |
| 27 | Op margin excl. H20 62.5%, +10 bps | D | 🔁 agrees | 62.47% vs 62.42% (+5 bps unrounded) |
| 28 | Net margin 55.6% vs 55.8% | R | ✅ | [6] |
| 29★ | FCF margin 44.8% vs 46.6%, −180 bps | D | 🔁 agrees | 60,853 ÷ 130,497 = 46.63% |
| 30 | The 10-K presents no non-GAAP figures | F | ✅ | "non-GAAP" does not appear anywhere in the filing |
| 31 | Provisions $7.2B vs $3.7B; net GM drag 2.6 vs 2.3 pts | R | ✅ | [6] Gross Margin p.41 |
| 32 | "Even excluding H20, provisions rose" | D | ⚠️ **MISMATCH** | [6]: 7.2 − 4.5 = **2.7 vs 3.7, a fall** |
| | **Liquidity (Ph 2.3)** | | | |
| 33 | Cash + MS $62.6B; 30.2% of assets | R/D | ✅ | [7] p.42; [2] 62,556 ÷ 206,803 |
| 34 | $10.5B under lock-up | R | ✅ | [9] Note 7 fn.1 p.65 |
| 35 | Notes $8,468M; maturities 1.0 / 2.75 / 4.75B; non-financial covenants | R | ✅ | [7] p.44; [11] Note 11 p.70 |
| 36 | CP program $575M → $25.0B, none outstanding | R | ✅ | [11] |
| 37 | $4B Groq payable in accrued liabilities | R | ✅ | [8] Note 2; [10] accrued purchase consideration 3,921 |
| 38★ | OCF 102,718; capex 6,042; FCF 96,676 | R/D | ✅ | [4] |
| 39 | Buybacks $40.1B, 282M shares | R | ✅ cash-flow basis | [4] 40,086; [3] 282M. MD&A states $40.4B (equity statement 40,388) |
| 40 | Dividends $974M | R | ✅ | [4] |
| 41 | Buybacks + dividends = 42.5% of FCF | D | 🔁 agrees | 41,060 ÷ 96,676 = 42.47% |
| 42 | $7.9B employee stock-plan tax withholding | R | ✅ | [4] 7,948 |
| 43 | $58.5B buyback authorization remaining | R | ✅ | [7] p.43 |
| 44 | $95.2B supply commitments, "substantially all" through FY27 | R | ✅ | [12] Note 12 p.70 |
| 45 | $27B cloud commitments | R | ✅ | [12] |
| 46 | $11.4B investment commitments | R | ✅ | [12] |
| 47 | $3.4B other commitments | R | ✅ | [12] |
| 48 | $3.5B lease guarantees, $712M escrow | R | ✅ (located in Note 10, not Note 12) | [11] Note 10 p.69 |
| | **Forward-looking (Ph 2.4)** | | | |
| 49 | "expect to increase capital expenditures in fiscal year 2027" | F | ✅ | [7] p.44 |
| 50 | One-year cadence / Rubin; GB300 since Q2 FY26 | F | ✅ | [5] p.36 |
| 51 | H200 license Feb 2026; no revenue; 25% tariff | F | ✅ | [5] p.36 |
| 52 | OpenAI "no assurance" | F | ✅ | [7] p.44 |
| | **Income statement (Ph 3.1)** | | | |
| 53 | COGS 62,475 / 32,639, +91.4% | R | ✅ | [1] |
| 54 | GP 153,463 / 97,858, +56.8% | R | ✅ | [1] |
| 55 | R&D 18,497 / 12,914, +43%, 8.6% / 9.9%; compute and infrastructure +79% | R | ✅ | [1]; [6] p.41 |
| 56 | SG&A 4,579 / 3,491, +31%, 2.1% / 2.7% | R | ✅ | [1]; [6] |
| 57 | Op income 130,387 / 81,453, +60% | R | ✅ | [1] |
| 58 | Interest expense 259 / 247; coverage 503x | R/D | ✅ 🔁 | 130,387 ÷ 259 = 503.4 |
| 59 | Other income 9,022 / 1,034, +$8.0B, incl. Intel gains | R | ✅ | [1]; [6] p.42 |
| 60 | Tax rate 15.1% / 13.3%; $711M VA release; OBBBA | R | ✅ | [6] p.42 |
| 61 | NI 120,067 / 72,880, +65% | R | ✅ | [1] |
| 62 | Diluted EPS 4.90 / 2.94, +67%; diluted shares −1.2% | R/D | ✅ 🔁 | [1] 24,514 / 24,804 = −1.17% |
| 63 | Gains are 6.4% of pre-tax income | D | 🔁 agrees | 9,022 ÷ 141,450 = 6.38% |
| 64 | EPS growth ex-gains ≈60% (not 67%) | D | 🔁 agrees (approx.) | ex-gains pre-tax +59.7%; at each year's tax rate, EPS growth ≈58% |
| 65 | AR +66.8%; DSO 65.0 vs 64.5 | D | 🔁 agrees | [2] 38,466 / 23,065; ×365 on revenue |
| | **Balance sheet (Ph 3.2)** | | | |
| 66 | AR 38,466 | R | ✅ | [2] |
| 67 | Inventory 21,403, +112%, DIO 125 vs 113; WIP / FG / raw materials | R/D | ✅ 🔁 | [2]; [10] Note 9; DIO on COGS |
| 68 | Goodwill + intangibles 24,138 (11.7% of assets); goodwill 20,832 from 5,188 | R/D | ✅ 🔁 | [2] |
| 69 | Non-marketable equity 22,251 from 3,387; 10.8% of assets; ~6.5x | R/D | ✅ 🔁 | [2]; [9] Note 8 (6.57x) |
| 70 | DTA 13,258 | R | ✅ | [2] |
| 71 | Debt 999 / 7,469 / 8,468 | R | ✅ | [2] |
| 72★ | Net cash (54,088) | D | 🔁 agrees (caveat) | See ★3 |
| 73 | EBITDA ≈ $133.2B; Debt/EBITDA 0.06x | D | 🔁 agrees | 130,387 + 2,843; 8,468 ÷ 133,230 = 0.064 |
| 74 | RE 146,973 from 68,038; buybacks to RE 40,158; AOCI 178 | R | ✅ | [2]; [3] |
| 75 | Pack's net debt understates cash by ~$52B | D | 🔁 agrees | 54,088 − 2,137 = 51,951 |
| | **Cash flow (Ph 3.3)** | | | |
| 76 | FCF conversion 80.5% (prior 83.5%) | D | 🔁 agrees | 96,676 ÷ 120,067; 60,853 ÷ 72,880 |
| 77 | ~87% vs NI ex-gains | D | 🔁 agrees | 96,676 ÷ 111,149 = 87.0% |
| 78 | FCF after Groq 83,676 = 69.7% of NI | D | 🔁 agrees | [4] Groq (13,000) |
| 79 | Working-capital lines; net ≈ (15,949) | R/D | ✅ 🔁 | [4] sum of six lines |
| 80 | SBC 6,386; 3.0% vs 3.6% of revenue | R/D | ✅ 🔁 | [4] |
| 81 | D&A 2,843; 1.3% of revenue; capex/D&A 2.1x | R/D | ✅ 🔁 | [4] |
| 82 | Equity gains deducted (8,918) | R | ✅ | [4] |
| 83 | $17.5B into private companies; includes AI model makers that buy NVIDIA products | R/F | ✅ | [5] p.37; [4] 17,502 |
| | **Risk and legal (Ph 4)** | | | |
| 84★ | Concentration 22% + 14% = 36%; top one up from 12% | R | ✅ | [6]; [13] |
| 85 | One AI lab "meaningful amount" of revenue via cloud | F | ✅ | [6] p.41 |
| 86 | Groq "significant, nonrefundable payments" | F | ✅ | [16] Item 1A |
| 87 | Cloud timing "changed and may continue to shift"; "may not deliver anticipated benefits" | F | ✅ | [16] |
| 88 | Counterparty-risk factor | F | ✅ | [16] |
| 89 | Energy / capital constraints; open-source risk | F | ✅ | [5] p.36 |
| 90 | 4:18-cv-07669 pending; derivative suits stayed | F | ✅ | [12] pp.71–72 |
| 91 | UTB $4.0B; IRS examining FY2023–24 | R | ✅ | [7] p.44 |
| | **Footnotes (Ph 5)** | | | |
| 92 | Groq: $14.4B goodwill, $2.5B intangible, 5-year life, cost-to-recreate, workforce; ~$0.5B/yr amortization | R/D | ✅ 🔁 | [8] Note 2 (quote truncated, see §5) |
| 93 | Measurement alternative | F | ✅ | [5] p.38; [9] Note 8 |
| 94 | Segments C&N and Graphics | F | ✅ | [5] |
| 95 | Item 13 incorporated from the proxy | F | ✅ | [15] p.47 |
| | **Insider (Ph 8)** | | | |
| 96 | Kress plan adopted 2025-12-18, 500,000 shares, through 2027-03-23 | F | ✅ | [15] Item 9B p.46 |
| 97 | Dabiri plan ~3,984 shares | F | ✅ | [15] |
| | **Valuation** | | | |
| 98 | Price $229.28 (2026-10-09) | M | ✅ (user-supplied) | [18] |
| 99 | Shares 24,100M as of 2026-08-21 | M | ❓ | Not in the 10-K. The 10-K cover gives **24.3B as of 2026-02-20** [17] |
| 100 | Market cap ~$5.53T | D | 🔁 agrees on report inputs | $5.57T on the 10-K count (+0.8%) |
| 101 | EV ~$5.47T | D | 🔁 agrees | $5.52T on 24.3B |
| 102★ | P/E 46.8x | D | 🔁 agrees · 🕒 | |
| 103 | EV / revenue 25.3x | D | 🔁 agrees · 🕒 | 25.5x on 24.3B |
| 104 | EV / EBIT 42.0x | D | 🔁 agrees · 🕒 | 42.3x on 24.3B |
| 105 | FCF yield 1.75% | D | 🔁 agrees · 🕒 | 1.74% on 24.3B |
| | **Insights / composites** | | | |
| 106 | Share count −0.7% | D | 🔁 agrees | [3] 24,304 vs 24,477 |
| 107 | "$27.6B of combined AR and inventory build" | D | ⚠️ **MISMATCH** | [4] 15,399 + 11,324 = **$26.7B** |
| 108 | FY26 gross provisions = 3.3% of revenue | D | 🔁 agrees | 7.2 ÷ 215.9 |
| 109 | Accounting Quality 16/21 | D | 🔁 agrees | sum of rows |
| 110 | Score 6.8 sits in the BULLISH band | F | ✅ | Band rule ≥ 6.0 |
| | **Qualitative** | | | |
| 111 | "Ecosystem NVIDIA increasingly finances itself" / "circular financing" | Q | **qualified** | The evidence (investments, guarantees) holds, but Item 1A says: "We have not entered into any financing arrangements." [16] |
| 112 | "$27B of cloud capacity bought back from customer-CSPs" | Q | **[unsupported]** | Note 12 describes multi-year cloud agreements "to support our research and development". It says nothing about buying back capacity |
| 113 | Groq booked as a business combination | Q | supported | $14.4B goodwill recognized [8] |
| 114 | "No channel-stuffing signal" | Q | supported | DSO flat (row 65) |

---

## 3. Mismatches in detail

**M1, row 32: "Even excluding H20, provisions rose, which fits the CAM focus."**
- **Source:** gross provisions were "$7.2 billion and $3.7 billion … *including* $4.5 billion associated with H20" [6, p.41].
- **Recomputed:** excluding H20, gross provisions were **$2.7B vs $3.7B, down 27%**. Net of the $1.5B / $0.689B releases they were about $1.2B vs $3.0B.
- **Likely cause:** the H20 component was never subtracted before the comparison.
- **Effect:** removes one supporting point for Red Flag #3. The flag still stands on inventory +112% and the $95.2B commitment base. The signal does not change.
- **Related:** the 3.3% "FY26 gross" baseline in Thesis Invalidation is arithmetically correct (row 108), but it includes the one-off H20 charge. Excluding it, the figure is about 1.25%.

**M2, row 107: "$27.6B of combined AR and inventory build."**
- **Source:** 15,399 + 11,324 = **$26,723M** [4]. The balance-sheet deltas give the same answer (15,401 + 11,323).
- **Size:** overstated by $0.9B (+3.3%).
- **Likely cause:** transposed digits.
- **Effect:** none. The working-capital criterion score of 1 is unaffected.

**Unverifiable, row 99: 24,100M shares "as of 2026-08-21."**
- The pack labels this as the "cover-page count". But this accession's cover page reads "24.3 billion" as of **2026-02-20** [17], and a filing made on 2026-02-25 cannot carry an August date.
- The figure almost certainly comes from a later filing, likely the Q2 FY2027 10-Q cover, which is not in the files. That 10-Q's cover page would settle it.
- On the 10-K's own 24.3B count, every valuation multiple moves by under 1% (rows 100–105). P/E is per-share and does not change. The valuation conclusions survive either way.

---

## 4. Recomputation table

```
Revenue growth     215,938 ÷ 130,497 − 1                 = 65.47%   ✓ 65.5%
FCF                102,718 − 6,042                        = 96,676   ✓
FCF margin         96,676 ÷ 215,938                       = 44.77%   ✓ 44.8%
FCF conversion     96,676 ÷ 120,067                       = 80.52%   ✓ 80.5%   (prior 60,853 ÷ 72,880 = 83.50% ✓)
GM ex-H20          (153,463 + 4,500) ÷ 215,938            = 73.15%   ✓ 73.2%
Op margin ex-H20   (130,387 + 4,500) ÷ 215,938            = 62.47%   ✓ 62.5%
Net cash           62,556 − 8,468                         = 54,088   ✓  (ex-public equities: 62,556 − 12,886 − 8,468 = 41,202)
EBITDA; D/EBITDA   130,387 + 2,843 = 133,230; 8,468 ÷ …   = 0.064x   ✓ 0.06x
Interest coverage  130,387 ÷ 259                          = 503.4x   ✓
DSO / DIO          38,466 ÷ 215,938 × 365 = 65.0;  21,403 ÷ 62,475 × 365 = 125.0 (prior 64.5 / 112.7)  ✓
Capital return     (40,086 + 974) ÷ 96,676                = 42.47%   ✓ 42.5%
Provisions ex-H20  7.2 − 4.5 = 2.7 vs 3.7                 → FELL     ✗ report "rose"
AR + Inv build     15,399 + 11,324                        = 26,723   ✗ report 27,600
Market cap         24,100 × 229.28 = $5.526T ✓ · (24,300 × 229.28 = $5.572T)
EV                 5,525.6 − 54.1 = $5.472T ✓ · (5,517.4)
P/E                229.28 ÷ 4.90                          = 46.79x   ✓
EV/Rev · EV/EBIT   5,471.6 ÷ 215.9 = 25.3x ✓ · ÷ 130.4 = 42.0x ✓
FCF yield          96,676 ÷ 5,525,648                     = 1.75%    ✓
Groq amortization  2.5B ÷ 5 yrs                           = 0.5B/yr  ✓  (consideration 13.0 + 4.0 ≈ GW 14.4 + IA 2.5 ✓)
Accounting score   3+2+2+1+3+3+2                          = 16/21    ✓
```

---

## 5. Report consistency findings

- **Numbers vs. narrative:** one contradiction, M1. Everything else in the narrative matches its tables.
- **Internal consistency:**
  - Buybacks are quoted on the cash-flow basis ($40.1B) throughout and on the retained-earnings basis ($40,158M) where labelled. That is consistent.
  - The MD&A's $40.4B is a third basis the report never cites, which is fine.
- **Net-cash definition (★3):**
  - The $54.1B figure counts $12.9B of publicly held equities, $10.5B of which are locked up.
  - §2.3 mentions the lock-up, but the dashboard and the signal rationale don't. Excluding equities, net cash is $41.2B.
  - This is a disclosure gap, not a wrong number.
- **Quotes edited inside quotation marks:**
  - The Gaming quote reads "…Q1 FY27 and beyond". The filing says "to Gaming in the first quarter of fiscal 2027 and beyond".
  - The Groq goodwill quote stops at "primarily attributable to the workforce" and drops "and future development of the licensed technology". That omission slightly strengthens the report's "unusual" framing.
- **Characterizations:**
  - Row 111 should acknowledge the filing's explicit "We have not entered into any financing arrangements".
  - Row 112's "bought back" wording has no support in the filing.
- **Citation locations:**
  - The lease guarantees are listed under "Off-balance-sheet commitments (Note 12)". They are in Note 10, and they are credit derivatives carried at fair value. The report's own Red Flag #2 cites Note 10 correctly.
  - "$4.5B write-down … (Note 9)": the H20 figure is in the MD&A, while Note 9 holds the $4.0B + $3.2B provisions that include it.
  - Both are imprecise but not fabricated, because the figures exist in the filing. No citation is unopenable, so the zero cap does not fire.
- **Signal vs. score:** 6.8 sits correctly in the BULLISH band. BULLISH with HOLD is explained in the report's note.
- **The report's own `Data & Sources` header:**
  - It reads `Retrieval: pasted by user (local files; no browsing) · Confidence: HIGH for reported FY2026 figures · MEDIUM for valuation`.
  - The verification supports it: 85 of 85 reported figures checked against the 10-K matched.
  - The one gap: "shares as of 2026-08-21" is attributed to sources that cannot contain an August date. The header is not overstated, so no cap fires.
- **Side note on the data pack (not the report):** `fetch-fundamentals.js` appears to label the latest `dei:EntityCommonStockSharesOutstanding` value as this 10-K's cover-page count. It may be pulling the newest filing's value instead of the cited accession's. Worth checking before the next demo.

---

## 6. Corrected report: changed passages and citation map

Only the passages that change are reprinted below, with the original struck through. Every other figure stands as written and carries the citations in the map that follows.

**§2.2, after the margins table:**
> Inventory provisions were $7.2B gross against $3.7B, with net GM drag of 2.6 pts against 2.3 pts [6]. ~~Even excluding H20, provisions rose, which fits the CAM focus.~~ **Excluding the $4.5B H20 charge, gross provisions fell to about $2.7B from $3.7B [6] (recomputed); the year-on-year increase is the H20 event.** *(Correction: the H20 amount is included in the $7.2B and was not subtracted.)*

**§2.3, last bullet:**
> $3.5B lease guarantees to early-stage partners, with $712M in escrow ~~(Note 12)~~ **(Note 10; credit derivatives at fair value, not material)** [11]

**Executive Summary and Dashboard, net cash:**
> $54.1B net cash once marketable securities are included [2][7] (recomputed) **(includes $12.9B of public equities, $10.5B locked up [9]; $41.2B excluding equities)**

**Valuation Snapshot:**
> | Market cap | ~$5.53T | 24,100M shares [?] × $229.28 [18] **(10-K cover: 24.3B shares as of 2026-02-20 [17] → $5.57T)** |

**Negatives, circular financing:**
> **Circular-financing exposure:** $17.5B into private AI firms that buy NVIDIA products [5][4], $3.5B of lease guarantees to early-stage partners [11], a pending OpenAI deal [7], and ~~$27B of cloud capacity bought back from customer-CSPs~~ **$27B of multi-year cloud-service commitments [12] [unsupported as "bought back"]**. **The 10-K states "We have not entered into any financing arrangements" [16]; "vendor financing" is this report's characterization.**

**Accounting Quality Score, Working capital row:**
> Inventory doubled; ~~$27.6B~~ **$26.7B** [4] (recomputed) of combined AR and inventory build

**Citation map for the unchanged figures:**
- Executive Summary: [1][4][5][6][8][12][14]
- Dashboard: [1][2][4] (recomputed)
- Phase 1: [8][14][17] and filing metadata
- Phase 2.1: [6][8][10][13]
- Phase 2.2: [5][6] (rows 24, 27, 29 recomputed)
- Phase 2.3: [3][4][7][8][9][10][11][12]
- Phase 2.4: [5][7]
- Phase 3.1: [1][6]
- Phase 3.2: [2][3][9][10]
- Phase 3.3: [4][8]
- Phase 4: [6][12][16]
- Phase 5: [5][8][9][15]
- Phase 8: [15]
- Valuation: [1][2][18] (recomputed; 🕒 FY26 EPS)
- Key Insights and Red Flags: as above
- Thesis Invalidation: the "3.3%" baseline is [6] (recomputed) and includes H20

## References

- [1] NVIDIA Corp., Form 10-K for the FY ended 2026-01-25, filed 2026-02-25, accession 0001045810-26-000021. Consolidated Statements of Income, p.51. `data/filings/NVDA/NVDA_2026_10-K.txt`, pasted by user.
- [2] Same filing. Consolidated Balance Sheets, p.53.
- [3] Same filing. Consolidated Statements of Shareholders' Equity, p.54.
- [4] Same filing. Consolidated Statements of Cash Flows, p.55.
- [5] Same filing. Item 7 MD&A: Recent Developments, FY2026 Summary, Critical Accounting Estimates, pp.36–38.
- [6] Same filing. Item 7 MD&A: Results of Operations (% table, Reportable Segments, Concentration of Revenue, Gross Margin, Opex, Other Income, Income Taxes), pp.40–42.
- [7] Same filing. Item 7 MD&A: Liquidity, Capital Return, Indebtedness, Material Cash Requirements, pp.42–44.
- [8] Same filing. Note 1 Fiscal Year (p.56); Note 2 Groq (p.61); Note 5 Goodwill (p.63).
- [9] Same filing. Note 7 Cash Equivalents and Marketable Securities (pp.65–66); Note 8 Non-marketable Equity Securities (pp.66–67).
- [10] Same filing. Note 9 Balance Sheet Components, including deferred revenue and RPO, pp.67–69.
- [11] Same filing. Note 10 Facility Lease Guarantees (p.69); Note 11 Debt (p.70).
- [12] Same filing. Note 12 Commitments (p.70) and Litigation (pp.71–72).
- [13] Same filing. Note 16 Segment Information: geographic revenue (p.78), revenue by end market (p.79).
- [14] Same filing. Report of Independent Registered Public Accounting Firm, PwC, dated 2026-02-25, pp.49–50; Item 9A, pp.45–46.
- [15] Same filing. Item 9B Other Information (p.46); Part III Items 10–14 (pp.46–47).
- [16] Same filing. Item 1A Risk Factors: Groq license, cloud service agreements, and "Commercial arrangements expose us to counterparty risks". Page numbers were not captured in the text extract.
- [17] Same filing. Cover page: error-correction checkboxes; "24.3 billion" shares outstanding as of 2026-02-20.
- [18] User-supplied: `data/fixtures/NVDA.md`, generated by `scripts/fetch-fundamentals.js` on 2026-10-11. Price $229.28 (NASDAQ close 2026-10-09) and shares 24,100M. Pasted by user; not independently verified.

---

## 7. Thesis Invalidation for these verdicts

- **A new filing restates a relied-on figure.** An 8-K or 10-K/A turns the affected ✅ verdicts into 🕒 until they are re-checked.
- **Valuation:**
  - **Shares:** loading the Q2 FY2027 10-Q settles row 99, either confirming 24,100M or replacing it.
  - **Trailing EPS:** the same 10-Q gives trailing-twelve-month EPS, which retires the 🕒 on rows 102–105.
- **The price** is checked against an independent quote. Today it rests only on the pack.
- **Re-run when:**
  - [ ] The FY2027 10-Qs or the FY2027 10-K land in `data/filings/NVDA/`
  - [ ] The report is regenerated with the corrections above
  - [ ] The 2026-10-09 price passes 90 days (2027-01-07)
  - [ ] Before this report is published as a site demo

## 8. Investment Signal

```
╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      BULLISH                         ║
║ Confidence:  MEDIUM                          ║
║ Horizon:     LONG-TERM                       ║
║ Score:       8.5 / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      HOLD                            ║
║ Conviction:  MODERATE                        ║
╚══════════════════════════════════════════════╝
```

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

Mirrors the report's signal, quoted rather than re-derived: BULLISH / HOLD / MODERATE / LONG-TERM, at the report's own 6.8.

The Score above is the Verification Score. It breaks down as follows:

| Component | Weight | Score | Basis |
|---|---|---|---|
| Coverage | 30% | 9 | 107/114 claims (93.9%) verified or recomputed-agree |
| Signal-driving accuracy | 30% | 9 | All five within tolerance, with the net-cash definition and P/E vintage caveats |
| Recomputation | 15% | 8 | 22 of 24 derived figures agree |
| Source quality | 15% | 8.5 | Tier 1 with page-level locations; price and shares come from the user-supplied pack only |
| Freshness | 10% | 6 | Fundamentals are 8.5 months old (disclosed); the share-count date is untraceable |

Weighted total: 8.5. Caps fired: none.

Verification would support HIGH confidence, but the box keeps the report's own MEDIUM. That rating reflects the missing FY2027 data, which verification doesn't change.

**Disclaimer:** Educational analysis only. Not financial advice. Verification is limited to the sources available at run time; an unverifiable claim is neither confirmed nor refuted.