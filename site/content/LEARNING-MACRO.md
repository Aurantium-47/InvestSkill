# Macro & the Fed Cycle

> Every stock you own sits inside an economy, and the price of money in that economy is set, more or less, by twelve people around a table in Washington eight times a year. This lesson explains what the Federal Reserve is trying to do, how a change in the policy rate reaches your portfolio, what the yield curve and the leading indicators have and have *not* predicted — including the long 2022–2024 inversion that was not followed by a recession — and how to use the macro backdrop as a dial on your confidence and sizing rather than a reason to trade the headline.

**What you'll learn**

- The Fed's dual mandate, the policy rate, and why "higher for longer" matters more than any single hike
- The three transmission channels — discount rates and valuations, credit, and the dollar — and why long-duration growth stocks feel rates first
- What the yield curve is, what an inversion has historically signalled, and what happened after the 2022–2024 inversion
- CPI vs. core PCE: which inflation number the Fed targets and why the two differ
- The four business-cycle phases and the sectors that have *tended* to lead in each
- The leading indicators worth a glance — LEI, ISM PMI, jobless claims, the Sahm rule — and their recent false alarms
- FOMC mechanics: the calendar, the statement, the press conference, the dot plot, and the blackout
- How to run `economics-analysis` and `sector-analysis`, and the mistakes that turn macro into a loss

---

## What the Fed is trying to do

The Federal Reserve's **dual mandate**, set by Congress, is **maximum employment** and **stable prices**. Since 2012 it has defined stable prices as **2% inflation over the longer run**, measured by the PCE price index (below). The two goals usually point the same way; when they conflict — inflation high *and* unemployment rising — the Fed has to choose which risk to tolerate, and markets spend months guessing which one it will pick.

Its main tool is the **federal funds rate** — the overnight rate banks charge each other, set as a target range (for example 5.25–5.50%). The Fed also changes the size of its balance sheet: buying bonds (**quantitative easing**) pushes long-term yields down; letting them run off (**quantitative tightening**) does the opposite, more slowly.

The recent cycle in one line: the Fed held the range at 0–0.25% through 2021, began hiking in **March 2022** as CPI inflation climbed to a peak of about **9.1% (June 2022)**, reached **5.25–5.50% in July 2023** — 5.25 percentage points in sixteen months, the fastest tightening in four decades — held there for over a year, and made its first cut, of 0.50 points, in **September 2024**.

> **Key idea:** The market prices the *path* of rates, not the level. A hike that was fully expected moves nothing; a "hold" accompanied by a hint that cuts are further away than hoped can move everything. What matters is the gap between what the Fed does and says and what was already priced.

---

## How the policy rate reaches your stock

### Channel 1 — discount rates and valuations

A stock is worth its future cash flows discounted back to today ([DCF](glossary.html#dcf-discounted-cash-flow)). The discount rate — your [WACC](glossary.html#wacc-weighted-average-cost-of-capital), or your required return — is built on top of the risk-free rate. When Treasury yields rise, the bar every stock must clear rises with them.

The effect is not equal. A company whose cash arrives mostly in the *far* future — a fast-growing business still reinvesting everything — is a **long-duration** asset, and its value is far more sensitive to the discount rate than a mature business paying cash now. The simplest model (a growing perpetuity, value = cash flow ÷ (r − g)) shows it.

### A tiny worked illustration (illustrative, rounded)

| | Next year's cash flow | Growth (g) | Value at r = 8% | Value at r = 9% | Change |
|---|---|---|---|---|---|
| **Steady Co.** (mature, pays out) | $5.00 | 2% | 5 ÷ 0.06 = **$83.33** | 5 ÷ 0.07 = **$71.43** | **−14%** |
| **ZEPH** (fictional growth name) | $1.00 | 6% | 1 ÷ 0.02 = **$50.00** | 1 ÷ 0.03 = **$33.33** | **−33%** |

The same one-point rise in the discount rate costs the growth stock more than twice as much, because its value sits in the distant [terminal value](glossary.html#terminal-value). That is, in one table, the 2022 bear market in unprofitable tech — and why the same stocks can rally hard on a single soft inflation print.

### Channel 2 — credit

Higher policy rates make borrowing dearer and lenders stricter. Watch three things: **credit spreads** (the extra yield on corporate bonds over Treasuries — widening spreads mean lenders are getting nervous), **bank lending standards** (the Fed's quarterly Senior Loan Officer Survey), and the **refinancing wall** — companies that borrowed cheaply in 2020–2021 and must roll that debt at today's rates. Small caps, with more floating-rate debt, feel this channel first. Lesson 3's interest-coverage ratio is where it shows up in a single company.

### Channel 3 — the dollar

Higher US rates relative to the rest of the world tend to strengthen the dollar. A strong dollar shrinks the dollar value of foreign sales — and a large share of S&P 500 revenue is earned abroad — so multinationals guide down "on FX". It also tightens conditions in emerging markets that borrowed in dollars. For a non-US investor the dollar cuts the other way: it changes the return in your home currency even if the stock price does not move.

---

## The yield curve and inversion

The **yield curve** plots Treasury yields across maturities. Normally it slopes upward — lenders want more to lock money up for ten years than for three months. When short-term yields rise *above* long-term ones the curve is **inverted**: the market is betting that the Fed is tight now and will have to cut later, usually because growth will weaken. The two spreads most quoted are the **10-year minus 2-year** ("2s10s") and the **10-year minus 3-month** (the one the New York Fed uses for its recession-probability model).

**What it has predicted.** An inversion of the 10-year/3-month spread preceded every US recession since the late 1960s, with very few false alarms. But the lead time has ranged from roughly six months to two years, and many analysts consider the *re-steepening* — the curve turning positive again, usually because the Fed starts cutting — the more immediate warning.

**What it hasn't.** The 2019 inversion was "followed" by the 2020 recession, which was caused by a pandemic no bond market could forecast. And the most recent episode is the largest test case of all:

| | 2s10s | 10y−3m |
|---|---|---|
| Inverted | Durably from **July 2022** (a brief dip in early April 2022) | From late **October 2022** |
| Deepest | About **−1.1 points**, mid-2023 | Close to **−1.9 points**, in 2023 |
| Turned positive | Late **August / early September 2024** — about two years, the longest 2s10s inversion on record | **December 2024** |
| Recession? | As of this writing (late 2026), the NBER has not declared a US recession beginning in 2022–2024 | |

Explanations offered afterward include pandemic-era household savings, large fiscal deficits, a labour-supply surge, and companies that had locked in low fixed-rate debt and so felt the hikes late. Whichever is right, the lesson for a stock investor is the same: an inverted curve **raises the probability** of a slowdown and argues for a wider [margin of safety](glossary.html#margin-of-safety) on cyclical and richly valued names; it is **not a timing tool**, and anyone who sold everything in July 2022 missed the 2023–2024 rally.

> **Key idea:** A macro signal with a 6–24-month lead time and an occasional false alarm cannot tell you when to sell. It can tell you how much confidence and how much leverage to carry while you wait.

---

## Inflation: CPI vs. core PCE

| | CPI | PCE price index |
|---|---|---|
| **Publisher / timing** | Bureau of Labor Statistics, around mid-month, 8:30 am ET | Bureau of Economic Analysis, near month-end, with personal income and spending |
| **Covers** | Out-of-pocket spending by urban consumers | All personal consumption, including spending made *on behalf of* households (e.g. employer health insurance) |
| **Weights** | Fixed basket, updated periodically; shelter is about a third | Shift as people substitute; shelter weight is much smaller |
| **Typical level** | Usually runs a few tenths of a point above PCE | Lower, smoother |
| **Who watches** | The market — it comes first and moves yields on the day | The Fed — its 2% target is defined on PCE |

**Core** strips out food and energy, which swing with weather and geopolitics. The Fed's target is headline PCE, but it watches **core PCE** as the better guide to where inflation is heading. In practice: CPI day moves the market because it is first; core PCE tells you what the Fed will think about it. A hot CPI followed by a mild core PCE two weeks later is a common, and often reversed, scare.

---

## The business cycle and sector leadership

The economy moves through four rough phases. Sectors have *tended* to lead in different ones, because their profits depend on different things — credit, capital spending, consumer confidence, or just people needing to buy groceries.

| Phase | What's happening | Fed & curve | Sectors that have tended to lead |
|---|---|---|---|
| **Early** | Recovery from a recession; growth accelerating from a low base; credit loosening | Rates low or falling; curve steep | Financials, consumer discretionary, industrials, real estate, small caps |
| **Mid** | Growth solid but moderating; profits strong | Neutral, gradually tightening | Technology, communication services — leadership is broad and rotation mild |
| **Late** | Capacity tight; inflation rising; growth peaking | Tightening; curve flattening or inverted | Energy, materials, consumer staples, health care |
| **Recession** | Output and profits contract; unemployment rising | Cutting; curve re-steepening | Defensives — staples, utilities, health care — and long-dated Treasuries |

**The caveat matters more than the table.** This is a historical *tendency* averaged over many cycles, not a rule. Phases are only identified with hindsight (the NBER dates a recession months after it starts), cycles do not last a fixed time, and a powerful secular theme can overwhelm the cycle completely: in 2023, with the curve deeply inverted and every late-cycle alarm ringing, mega-cap technology led the market on the AI investment wave. Use the table to ask "is my portfolio unusually exposed to the phase that might come next?", not to rotate on a schedule.

---

## Leading indicators worth a glance

| Indicator | What it is | Rule of thumb | Recent record |
|---|---|---|---|
| **LEI** (Conference Board Leading Economic Index) | Monthly composite of ten forward-looking series — orders, claims, permits, the curve, credit, sentiment | A sustained six-month decline has historically preceded recessions | Fell for roughly two years from 2022; the Conference Board eventually dropped its recession call. No recession followed |
| **ISM Manufacturing PMI** | Monthly survey of purchasing managers, first business day | Above 50 = expansion, below 50 = contraction; the **new orders** component leads the headline | Spent most of late 2022 through 2024 below 50 — a manufacturing slump inside a growing, services-led economy |
| **Initial jobless claims** | Weekly first-time unemployment filings, Thursdays 8:30 am ET | Watch the four-week average; a sustained rise from the low matters, a single spike (a storm, a holiday) does not | The most timely labour gauge; noisy week to week |
| **Sahm rule** | Triggers when the three-month average unemployment rate rises **0.50 points** or more above its low of the prior twelve months | Historically flagged the start of every US recession since 1970 (on revised data) | **Triggered with the July 2024 jobs report (released 2 August 2024)**; as of this writing no recession has been declared since |

The Sahm-rule episode is a useful lesson in reading an indicator rather than obeying it. Claudia Sahm, who devised the rule, pointed out at the time that unemployment was rising partly because the labour force was growing quickly — more people looking for work, not mainly more people being laid off — which is not how recessions usually begin. The rule's mechanics fired; its usual cause was not present. A signal is only as good as the reason behind it.

---

## FOMC mechanics

The **Federal Open Market Committee** sets the policy rate. Twelve members vote (the seven Board governors, the New York Fed president, and four of the other eleven regional presidents on a rotating basis); all nineteen participate in the discussion.

- **Eight scheduled meetings a year**, each over two days. The calendar is published a year ahead — put the dates in your `catalyst-calendar`.
- **Decision day:** the statement is released at **2:00 pm ET**; the Chair's press conference starts at **2:30 pm ET**. The statement's changed wording is often more market-moving than the rate decision itself, and the press conference often reverses the first reaction.
- **Minutes** of each meeting come out **three weeks later**, and can move markets by revealing how divided the committee was.
- **The blackout:** from the second Saturday before a meeting until the day after it, officials do not give speeches on policy. A "Fed source" story in that window is unofficial by definition.
- **The dot plot** appears in the **Summary of Economic Projections** at four meetings a year (March, June, September, December). Each participant places one dot for where they think the rate *should* be at the end of each of the next few years and in the longer run. The median dot is quoted everywhere. It is a set of individual forecasts, **not a commitment**, and the dots have moved a long way within a single year many times.

The market's own forecast of the path is in **fed funds futures** (summarized by tools such as CME FedWatch). Comparing the median dot with futures pricing tells you which side has to give — and that gap, not the decision, is what moves on meeting day.

---

## Using economics-analysis and sector-analysis

`economics-analysis` reads the regime: the policy rate and the market-implied path, the 2s10s and 10y−3m spreads, the latest CPI and core PCE, payrolls and unemployment (with the Sahm-rule distance), PMI, and claims — each with its release date — and closes with a macro signal. `sector-analysis` takes that regime and maps it to sector leadership, relative strength, and valuation, and flags when a rotation trade is already crowded. Run them top-down, then go back to the stock:

1. **Read the regime** with `economics-analysis`. Write down the phase you think you are in *and your confidence in it* — usually medium at best.
2. **Map it** with `sector-analysis`. Note which of your holdings sit in sectors the regime favours or fights.
3. **Translate it into a dial, not a trade.** A hostile macro regime for your highest-multiple names means a wider margin of safety, a smaller position, or a lower add ceiling (`position-ladder`) — not an automatic sale.
4. **Stress it** with `risk-stress-test`, which replays the 2022 rate shock and shows your portfolio's rate, dollar, and oil sensitivity in dollars.
5. **Calendar it.** Put the FOMC dates, CPI, PCE, and payrolls days for your horizon into `catalyst-calendar`, next to your earnings dates.

### What not to do

- **Do not trade the macro headline.** A CPI print or a jobs number moves the index for an hour; it does not change what your company earns over five years. If the reaction is the reason for the trade, you are trading noise against professionals with faster data.
- **Do not treat "don't fight the Fed" as a law.** The Fed cut aggressively through 2001 and 2007–2008 and stocks kept falling, because it was cutting *into* a recession. Cuts for "insurance" and cuts in response to a collapse are different events; ask *why* it is cutting.
- **Do not sell everything on an inversion.** The 2022–2024 inversion was the longest on record and was followed, so far, by rising markets rather than recession.
- **Do not confuse a phase table with a forecast.** The sector tendencies are averages across cycles with large exceptions; a secular theme can dominate for years.
- **Do not anchor on the dot plot.** It is a forecast by people who will change it when the data change.
- **Do not let one indicator vote alone.** LEI, PMI, and the Sahm rule all flashed between 2022 and 2024. Look for agreement *and* for a plausible mechanism.

*In the plugin:* `economics-analysis` reads the regime and the indicators; `sector-analysis` maps it to sector leadership; `risk-stress-test` measures rate and dollar sensitivity; `catalyst-calendar` holds the FOMC and data dates; `stock-eval` and `stock-valuation` show how sensitive a single name's value is to the discount rate.

---

## Related skills

```bash
/us-stock-analysis:economics-analysis          # the regime: rates, curve, inflation, labour, PMI
/us-stock-analysis:sector-analysis             # map the regime to sector leadership and rotation
/us-stock-analysis:risk-stress-test            # 2022 rate-shock replay; rate / USD / oil sensitivity
/us-stock-analysis:catalyst-calendar ZEPH      # FOMC, CPI and jobs dates next to the earnings date
/us-stock-analysis:stock-valuation ZEPH        # how far the value moves with the discount rate
```

Using another assistant? Paste `prompts/economics-analysis.md` or `prompts/sector-analysis.md` and ask the same question.

---

## Check yourself

1. A stock's next-year cash flow is $2.00, growing 5% forever. What is it worth at an 8% discount rate, and at 9%? What is the percentage change?
2. The 2s10s curve was inverted from July 2022 until about September 2024, and no recession has been declared since. Does that prove the yield curve is useless? What *is* it good for?
3. The unemployment rate's three-month average is 4.20%; its lowest three-month average over the prior twelve months was 3.65%. Has the Sahm rule triggered? What would you check before acting on it?
4. The Fed cuts by 0.50 points and the market falls 3% that afternoon. How can a rate cut be bearish?
5. `economics-analysis` says late cycle; 40% of your portfolio is in technology. What does the sector table suggest, and what should you actually do?

<details><summary>Answers</summary>

1. 2 ÷ (0.08 − 0.05) = **$66.67**; 2 ÷ (0.09 − 0.05) = **$50.00**; a fall of **25%**. A mature stock with $4.00 growing 1% goes from 4 ÷ 0.07 = $57.14 to 4 ÷ 0.08 = $50.00, only −12.5% — the long-duration name is twice as rate-sensitive.
2. No. The sample of recessions is small, the lead time is long and variable, and that cycle had unusual buffers (savings, fiscal deficits, locked-in low-rate debt, a labour-supply surge). It raises the probability of a slowdown and argues for more margin of safety and less leverage; it has never been a timing signal.
3. Yes: 4.20 − 3.65 = **0.55 points**, above the 0.50 threshold. Check *why* unemployment rose — layoffs (claims rising, payrolls falling) or labour-force growth (more people looking for work) — and whether other indicators agree. In August 2024 it was largely the second.
4. Because the market prices the reason as well as the cut: a larger-than-expected cut can signal that the Fed sees weakness the market had not priced. Cuts *into* a recession (2001, 2007–2008) came with falling stocks.
5. Late-cycle tendencies favour energy, materials, staples, and health care, and long-duration growth tends to be rate-sensitive. But that is a tendency, not a rule. Check your IPS limits and each holding's thesis and valuation; if 40% breaches your sector cap, trim toward the cap and raise your margin-of-safety bar for adds. Do not swap the whole portfolio on a phase label.

</details>

---

## Key takeaways

- The Fed targets **maximum employment and 2% PCE inflation**; the market prices the *path* of rates, so the surprise versus expectations is what moves stocks.
- Rates reach stocks through **discount rates** (hardest on long-duration growth), **credit** (hardest on leveraged and small companies), and the **dollar** (hardest on multinationals and on non-US investors' returns).
- An inverted curve has preceded past recessions with a long, variable lag; the **2022–2024 inversion** — the longest on record for 2s10s — has not been followed by a declared recession as of this writing. It is a probability dial, not a timer.
- CPI moves the market first; **core PCE** is what the Fed steers by.
- The business-cycle sector table is a **tendency**; phases are dated in hindsight and secular themes can overwhelm them.
- LEI, PMI, and the **Sahm rule (triggered August 2024)** all flashed without a recession following; read the mechanism behind a signal, and look for agreement.
- Put **FOMC days, CPI, PCE, and payrolls** on your calendar; use macro to set confidence, sizing, and margin of safety — never to trade the headline.

---

> **Next / Related:** Previous lesson — [Psychology & Process](learning-psychology.html). Next: [**Options for Stock Investors**](learning-options.html) — what the options market is pricing and the few strategies a stockholder can actually use. Or head back to the [Learning hub](learning.html), then [Choose a Skill](choose-a-skill.html) to put it to work. See also [Concepts](concepts.html) and the [Glossary](glossary.html).

*Educational content only. Not financial advice.*
