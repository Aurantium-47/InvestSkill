# PLTR — Technical Analysis (data through the 2026-10-09 close)

```
Data & Sources
  As of:      2026-10-09 close (price/volume) · 2026-06-30 (latest 10-Q) · 2025-12-31 (FY2025 10-K)
  Source:     • SEC EDGAR 10-K FY2025, acc. 0001321655-26-000011 (data/fixtures/PLTR.md)
              • SEC EDGAR 10-Q Q2 2026, filed 2026-08-04, acc. 0001321655-26-000041 (data/filings/PLTR/…10-Q.txt)
              • SEC 8-K Ex. 99.1 Q2 2026 press release, 2026-08-03 (guidance)
              • Yahoo Finance chart API, daily bars 2025-04-01 → 2026-10-09, retrieved 2026-10-11
              • QQQ daily closes, Yahoo Finance, through 2026-10-08, retrieved 2026-10-11
              • Short interest: Equibles (2026-08-21), FINRA settlements via Curved Trading (06-30, 07-15)
              • Form 4: BusinessQuant / agent402 aggregators (through 2026-08-24)
  Retrieval:  pasted by user (SEC pack + 10-Q) · web/tool retrieval (price history, SI, Form 4, QQQ)
  Confidence: HIGH for SEC figures · MEDIUM for price-derived indicators (see note)
```

> **Data note.** I couldn't run `curl` or `node` in this session, so I pulled the daily bars through a web-fetch summarizer and worked out every indicator by hand. I checked the transcription against three outside data points, and all three match:
> - the Oct 2 close of $188.75 and the prior 52-week high close of $207.18 ([Pluang, 2026-10-03](https://pluang.com/en/news-feed/kenapa-harus-beli-saham-palantir-sebelum-31-oktober-2026))
> - Oct 6 turnover of $3.39B ([10jqka, 2026-10-07](https://stock.10jqka.com.cn/20261007/c680445442.shtml)), which equals 17.65M shares × $192.07
> - the Oct 9 close of $209.05 in the SEC pack
>
> Known gaps:
> - One bar (2025-06-20) is missing. It only affects MA365, and only slightly.
> - I didn't get opening prices, so candle bodies are read from where the close sits in the day's range.
> - ADX and volume-profile levels are approximate.
> - **No current options data was found.** The only implied-volatility figure available was an undated snapshot, so I didn't use it.
> - I found no source for why the stock jumped on Oct 8–9.
> - I used the press release instead of the Q2 call transcript.

**Fundamental backdrop (from the SEC data):**
- **Q2 2026:** revenue $1,935M, up 93% YoY. Gross margin 85%.
- **H1 2026 diluted EPS:** $0.75 ($1,932.4M net income ÷ 2,569.8M shares).
- **Trailing EPS:** about $1.17 (FY25 $0.63 − H1'25 $0.21 + H1'26 $0.75). At $209.05 that is a **P/E of about 178×**.
- **Market cap:** about $502B on basic shares (2,399.8M) or $537B diluted. Trailing revenue is $6.16B, so P/S is about 81×.
- **FY2026 guidance:** raised to $8.150–8.158B, about +82% vs FY25's $4,475M. Q3 guide is $2.160–2.164B.

At these multiples, the stock's next big move will likely come from the Q3 earnings report.

---

## 1. Moving Average Chart

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MOVING AVERAGE CHART — PLTR              2026-10-09
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Current Price : $209.05   (52-wk 106.37 – 209.58)

  MA       Value      vs Price    Signal
  ──────   ────────   ─────────   ───────────────────
  MA30     $183.06    ▲ +14.2%    Above ← Short-term
  MA60     $168.67    ▲ +23.9%    Above ← Intermediate
  MA90     $155.21    ▲ +34.7%    Above ← Medium-term
  MA200    $152.33    ▲ +37.2%    Above ← Long-term bull/bear
  MA365    $155.53    ▲ +34.4%    Above ← Annual baseline
  (MA50    $176.98    ▲ +18.1%    computed for the 50/200 cross)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MA Stack: MIXED → BULLISH-LEANING
  MA30 > MA60 > MA90 ✓, but MA90 ≈ MA365 and MA200 < MA365 ✗
  (the long end is flat: the Nov-2025→Jun-2026 drawdown is still in the window)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**ASCII trend chart: closes every 5 sessions, 2026-06-02 → 2026-10-09**

```
Price ($)
210 ┤                                                       ●      ← $209.05 ATH close
200 ┤
190 ┤                                     ●           ●  ●         ← "handle" 184.8–194.8
180 ┤                               ●        ●     ●  ·     ·      ← MA30 $183
170 ┤                                  ●        ●
160 ┤                            ●                                 ← Aug-4 earnings gap
150 ┤ ●===================================·===================     ← MA200 ≈ $152 (flat)
140 ┤ ·
130 ┤    ●  ●     ●  ●  ●     ·
120 ┤                      ●  ●
110 ┤          ●                                                   ← Jun-25 low $106.37
    └─┬─────────────────┬────────┬────────┬────────┬────────┬──→
     6/2               7/16     8/6      8/27     9/18     10/9
Legend: ● Price   · MA30   ═ MA200
```

### Crossover events

| Event | Date | Sessions ago | Status |
|---|---|---|---|
| **Price reclaims MA200** (breakout) | 2026-08-04 (gap from $125.65 to $162.66) | 47 | Held. No close below MA200 since; lowest later close was $155.92 |
| **MA30 crosses above MA60** (short golden cross) | 2026-08-10 (133.95 vs 133.73) | 43 | Spread is now +$14.4 |
| **MA50 crosses above MA200** (classic golden cross) | **2026-09-09** (152.11 vs 151.39) | **22** | **Most recent crossover.** MA50 is now $176.98 vs MA200 $152.33 |

## 2. MA-Based Trade Recommendation

```
╔══════════════════════════════════════════════════════════════════╗
║              MA-BASED TRADE RECOMMENDATION — PLTR               ║
╠══════════════════════════════════════════════════════════════════╣
║  Current Price : $209.05                                        ║
╠══════════════════════════════════════════════════════════════════╣
║  OPERATION      │ ENTRY PRICE   │ TARGET        │ STOP-LOSS     ║
║  ───────────────┼───────────────┼───────────────┼────────────── ║
║  BUY (pullback) │ $195          │ $221 / $235   │ $182          ║
║  HOLD (owners)  │ —             │ $221 / $235   │ trail $194    ║
╠══════════════════════════════════════════════════════════════════╣
║  Rationale: Above all 5 MAs with a fresh golden cross, but 14%  ║
║   over MA30, RSI ≈75 and above the upper Bollinger Band — buy   ║
║   the retest of the $194.7 breakout pivot; don't chase $209.    ║
║  Basis:     MA30 = $183.06 (rising ~$0.4/day) as trailing       ║
║             support; breakout pivot $194.7–195.7 as entry       ║
║  R/R Ratio: 1 : 2.0 (to $221) · 1 : 3.1 (to $235)               ║
║  Horizon:   SWING (2–8 weeks) — earnings ~Nov 2 inside window   ║
╚══════════════════════════════════════════════════════════════════╝
```

In one sentence: **$195 is a good BUY entry for PLTR.** It is a retest of the Sep 23–Oct 7 consolidation top ($194.78) and the unfilled Oct 8 gap ($194.70–195.65). The targets are the flag's measured move ($221.5) and then the 127.2% extension ($235). The stop goes below the handle low and MA30, at $182 (about 2.1 ATR). Buying at $209 with a stop under the breakout, at $194, gives only about 1:1.7.

## 3. Trend, Patterns and Candles

- **Primary trend: up, and young.** From the 2026-06-25 low ($107.27 close) the stock is +95%. It just posted a new all-time closing high, $209.05 vs $207.18 on 2025-11-04. Year over year it is only +13.9% ($183.56 on 2025-10-09), so the last 11 months were one big round trip.
- **Base: a roughly 48-week, 48%-deep cup** (Nov 2025 rim → Jun 2026 low → Oct 2026 rim). That is deep by classic cup-and-handle standards. Its theoretical measured move (about $310) is not a usable target.
- **Handle / bull flag:** Sep 23 – Oct 7, range $184.81–194.78. Volume dried up to 15–18M a day, against a 35M "pole" day on Sep 23. The breakout came on Oct 8 (41.9M, 1.74× the 20-day average) and continued Oct 9 (37.5M, 1.56×).
- **The breakout above the old ATH is thin:** +0.9% on one close. A standard 3% filter means **two closes above about $213.7** confirm it. Falling back below $207 would make this a failed breakout.
- **Candles:**
  - Oct 9 closed in the top 5% of an $11.28 range, a marubozu-style bar showing strong demand.
  - Oct 8 left an upper wick at $204.44 (selling into the high), which Oct 9 absorbed.
  - No reversal candle is present.
- **Unfilled gaps:**
  - $194.70–195.65 (Oct 8)
  - $158.00–159.96 (Aug 7)
  - **$126.96–143.28 (Aug 4 earnings gap)**

## 4. Indicators

| Indicator | Reading | Read |
|---|---|---|
| RSI(14), Wilder | **≈75** (68.6 on Oct 8) | Overbought. No bearish divergence, since price and RSI made new highs together |
| MACD (12/26/9) | 7.18 / signal 5.99 / histogram **+1.18** (rising) | Bullish cross on Sep 23. It sat on the signal line Oct 5–6 (marginal) and re-crossed up Oct 7. Momentum is picking up again |
| ADX(14) | ≈30–35 (estimated); 14-session +DI ≈40 vs −DI ≈6 | Trending, with buyers in control |
| Stochastic %K(14) / Williams %R | 98.1 / −1.9 | Pinned at the extreme. Fine in a trend, but a poor entry |
| ROC | 10-day +10.2% · 20-day +25.0% · 63-day +60.8% | Strong momentum |
| Bollinger (20, 2σ) | Upper $204.66 · middle $187.00 · lower $169.34; %B **1.12**; bandwidth 18.9% | Closing outside the upper band usually means the stock chops or pulls back toward the 20-day before going higher |
| ATR(14) | **$6.16 (2.9%)** | Use it to size stops |
| HV20 (annualized) | **≈28%** | Very low for PLTR. It's a quiet, grinding advance, and implied volatility usually rises into earnings |
| Volume / OBV | 20-day average 24.1M. OBV is rising; up-day volume has dominated since Aug 4 | Accumulation. The breakout came on above-average volume, but it wasn't a climax |
| Anchored VWAP from Aug 4 | ≈$175 (approximate) | The average buyer since the gap is about 20% in profit |

**Relative strength vs QQQ:** since 2026-06-25, PLTR is +85% vs QQQ +4.9% (QQQ at $751.27 on Oct 8). Since Jul 31, PLTR is +61.5% vs QQQ +9.2%. PLTR is clearly leading the market.

## 5. Support and Resistance

| Type | Level | Strength | Notes |
|---|---|---|---|
| Resistance | $235.0 | Medium | 127.2% extension of the $207.5→$106.4 decline |
| Resistance | $221.5 | Medium | Flag measured move ($26.7 pole + $194.8 breakout) |
| Resistance | $216.9 / $213.0 | Weak | Classic pivots R2 / R1 |
| Confirmation | $213.7 | — | 3% above the old ATH |
| Support | **$207.2–207.5** | Strong | Old ATH, the Nov 2025 rim. It must hold now that price is above it |
| Support | $201.7 | Weak | Pivot S1 (pivot point $205.64) |
| Support | **$194.4–195.7** | Strong | Handle top, Oct 8 gap, pivot S2 → **entry zone** |
| Support | $192.1 / $197.2 | Medium | Future cloud top / Tenkan |
| Support | $187.0–185.2 | Strong | MA20 / Kijun $187.07 / 23.6% Fibonacci retracement |
| Support | **$184.8–183.1** | Strong | Handle low (Sep 29) and MA30 → **stop just below** |
| Support | $172 ± 2 / $170.2 | Strong | Volume POC (Aug–Sep base) / 38.2% retracement |
| Support | $158–160 / $158.0 | Medium | Aug 7 gap / 50% retracement |
| Support | $152–156 | Strong | MA200 / MA90 / MA365 cluster |

Fibonacci retracements are measured on the Jun 25 → Oct 9 swing ($106.37 → $209.58): 23.6% = $185.22 · 38.2% = $170.15 · 50% = $157.98 · 61.8% = $145.80.

## 6. Multi-Timeframe Analysis (swing setup: Monthly / Weekly / Daily)

| Timeframe | Trend | Key signal | Support | Resistance | Alignment |
|---|---|---|---|---|---|
| Monthly (higher) | Up | The Nov→Jun series of lower highs broke. October so far is at an ATH, above the ~10-month MA ($152) | $152 | $235 | Bullish |
| Weekly (primary) | Up | Record weekly close of $209.05 (prior best $194.55, week of 2025-10-31) after a 3-week flag | $185 | $221 | Bullish |
| Daily (lower) | Up, overbought | RSI 75, %B 1.12, Stochastic 98 | $195 | $213.7 | Bullish trend, poor timing |
| **Overall** | | **Score: 3/3** | | | Take only long trades; **wait for the daily to reset** |

## 7. Ichimoku Cloud (daily)

- Tenkan **$197.20** > Kijun **$187.07**. That is a bullish TK cross, and it is above the cloud.
- **Current cloud:** Span A $165.52 / Span B $147.37. It is green and price is far above it.
- **Cloud 26 sessions ahead:** A $192.14 / B $164.60. It stays green and thick, so it is strong support below $192.
- Chikou: $209.05 vs the close 26 sessions ago ($169.46 on Sep 2), so it is above price.
- **5/5 bullish (Maximum Bullish).** No cloud twist is in view.

## 8. Volume Profile (composite, Jun 1 – Oct 9 2026, built from daily bars, approximate)

- **Shape: double distribution.**
  - Upper high-volume node (HVN): $168–190, **POC ≈ $172**.
  - Lower HVN: $122–136, the Jun–Jul base.
  - Low-volume node: **$140–158**, the Aug 4 gap zone, which price passed through fast.
- **Value Area ≈ $130–195. VAL ≈ $130, VAH ≈ $195.**
- **Price ($209) is above the VAH.** The market has accepted higher prices, and the playbook rule is to buy breakouts above the VAH on volume. Here that means using the $195 retest as the entry. A break back below $168 would put the low-volume node in play, and that is where moves speed up.

## 9. Positioning, Options and Insiders

- **Short interest:**
  - **Latest:** 68.1M shares, about 2.8% of float, about 2.3 days to cover ([Equibles, 2026-08-21](https://equibles.com/stocks/pltr/shortinterest)).
  - **Trend:** down from 87.3M on Jun 30 and 77.9M on Jul 15 (FINRA via [Curved Trading](https://curvedtrading.com/stocks/pltr/short-interest/)).
  - Low and falling, so there is no squeeze fuel. The rally is driven by buyers, not short covering.
- **Options:** I found no current IV, put/call ratio, max pain or gamma exposure data. The one IV snapshot (97.8% ATM, [FlashAlpha](https://flashalpha.com/stock/pltr/iv)) is undated, so I didn't use it. Expect implied volatility to rise toward earnings. Pull the chain from your broker before using options to express this.
- **Form 4 filings:**
  - Karp's last Form 4 was filed 2026-08-24, with about 6.43M shares held directly ([BusinessQuant](https://businessquant.com/stocks/pltr/insiders)).
  - In August, directors Moore and Friedman sold on the open market and COO Sankar gifted shares ([agent402](https://agent402.tools/reports/insider/PLTR)).
  - About 556K shares of net selling in September; the sellers aren't named.
  - Routine, mostly planned or tax-related selling. Weak signal.
- **Catalyst:** **Q3 2026 earnings expected Nov 2 after the close.** This is not confirmed. [Benzinga](https://www.benzinga.com/quote/PLTR/earnings) and [CoinCodex](https://coincodex.com/stock/PLTR/earnings/) say Nov 2; [Earnings Whispers](https://beta.earningswhispers.com/go/w/PLTR) says Nov 9. That is about 16 sessions away.
  - **Recent next-day moves after earnings:**

    | Report | Next-day move |
    |---|---|
    | Aug 2026 | +29.4% |
    | May 2026 | −6.9% |
    | Feb 2026 | +6.8%, then −11.6% the next day |
    | Nov 2025 | +3.3%, then −7.9% |

  - **A stop-loss will not protect you from an earnings gap.** Size the position for a ±15% overnight move.

## Summary

PLTR is in a confirmed, young uptrend:
- It has held above MA200 since the Aug 4 earnings gap.
- A short golden cross came on Aug 10 and a classic golden cross on Sep 9.
- Ichimoku is 5/5 and MTF alignment is 3/3.
- The stock broke out of a low-volume flag to an all-time closing high on rising volume, while beating QQQ by about 80 points since June.

What argues against buying today:
- The stock is extended: +14% over MA30, +37% over MA200, RSI about 75, closing above the upper Bollinger Band.
- The breakout above the Nov 2025 high is under 1% and not yet confirmed.
- A high-variance earnings report is about 3 weeks out.
- At about 178× P/E, the price leaves no room for disappointment.

**The best trade is to buy the pullback to $195, not to chase $209.**

## Thesis Invalidation

**The BULLISH signal breaks if:**
- PLTR closes below **$183** (handle low and MA30) on above-average volume. A close back below $207 right away would also mark a failed breakout. The full bull/bear line is MA200 at about $152.
- MA30 crosses below MA60 (now $183 vs $169) **and** RSI drops below 40.
- The macro picture turns: a surprise hawkish Fed, a recession probability above 60%, or a growth-stock de-rating led by QQQ, which is near its own 52-week high of $762.86.
- Q3 results miss the $2.160–2.164B revenue guide, or full-year guidance is cut. The Aug 4 gap ($126.96–143.28) shows how far an earnings re-rating can move this stock.

**Re-run this analysis when:**
- [ ] Next earnings release (expected Nov 2, 2026; confirm on Palantir IR)
- [ ] Price moves ±15% from $209 (above $240 or below $178)
- [ ] 60 days have elapsed (2026-12-08)
- [ ] Material news event (contract award, index or leadership change, regulatory decision), including the still-unexplained Oct 8–9 move

**Sources:**
- SEC: [Q2 2026 8-K press release (2026-08-03)](https://www.sec.gov/Archives/edgar/data/0001321655/000132165526000039/a2026q2ex991pressrelease.htm) · [10-Q Q2 2026 index](https://www.sec.gov/Archives/edgar/data/1321655/000132165526000041/0001321655-26-000041-index.htm) · [10-K FY2025 index](https://www.sec.gov/Archives/edgar/data/1321655/000132165526000011/0001321655-26-000011-index.htm)
- Prices: [Yahoo PLTR chart API](https://query1.finance.yahoo.com/v8/finance/chart/PLTR?range=2y&interval=1d) · [Yahoo QQQ chart API](https://query1.finance.yahoo.com/v8/finance/chart/QQQ?range=6mo&interval=1d) (both retrieved 2026-10-11)
- Cross-checks: [Pluang (2026-10-03)](https://pluang.com/en/news-feed/kenapa-harus-beli-saham-palantir-sebelum-31-oktober-2026) · [10jqka (2026-10-07)](https://stock.10jqka.com.cn/20261007/c680445442.shtml)
- Short interest: [Equibles](https://equibles.com/stocks/pltr/shortinterest) · [Curved Trading / FINRA](https://curvedtrading.com/stocks/pltr/short-interest/)
- Form 4: [BusinessQuant](https://businessquant.com/stocks/pltr/insiders) · [agent402](https://agent402.tools/reports/insider/PLTR)
- Earnings date: [Benzinga](https://www.benzinga.com/quote/PLTR/earnings) · [CoinCodex](https://coincodex.com/stock/PLTR/earnings/) · [Earnings Whispers](https://beta.earningswhispers.com/go/w/PLTR)
- Options (not used, undated): [FlashAlpha](https://flashalpha.com/stock/pltr/iv)

```
╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      BULLISH                         ║
║ Confidence:  MEDIUM                          ║
║ Horizon:     SHORT-TERM (swing)              ║
║ Score:       7.0 / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      BUY (on pullback to ~$195)      ║
║ Conviction:  MODERATE                        ║
╚══════════════════════════════════════════════╝
```

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

The trend evidence (MA structure, Ichimoku 5/5, MTF 3/3, relative strength) would support about 8. It is held to 7.0 for four reasons: the daily chart is overbought and extended, the ATH breakout is unconfirmed, earnings fall inside the swing window, and the price history was transcribed rather than downloaded. Confidence is MEDIUM for the same reasons.

**Disclaimer:** Educational analysis only. Not financial advice.