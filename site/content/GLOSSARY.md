# Financial Glossary

> Plain-English definitions for every metric the InvestSkill frameworks emit. Each entry gives the formula, a rough "good vs. bad" range, and which skill surfaces it. Ranges are rules of thumb, not absolute rules — context (industry, growth stage, rates) always matters.

**Jump to:** [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [I](#i) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w) · [Y](#y)

---

## A

### Accruals Ratio (Sloan)
How much of reported earnings is accounting judgment rather than cash. Cash-flow version: `(Net Income − (Operating CF + Investing CF)) ÷ Average Net Operating Assets`; the quick version is `(Net Income − Operating CF) ÷ Average Total Assets`. Sloan (1996) found that high-accrual firms went on to underperform.
- **Good / bad:** between −10% and +10% normal · +10% to +20% elevated — explain it · > +20% red flag. Strongly negative usually means heavy investment, not trouble.
- **Surfaced by:** `forensic-accounting`, `stock-eval`. See [Lesson 2 → Accrual vs. cash accounting](learning-statements.html#accrual-vs-cash-accounting-why-profit--cash).

### Alpha
Return earned *above* what the market (or a benchmark) would predict for a given level of risk. Positive alpha = skill or edge; zero alpha = you just matched the market.
- **Surfaced by:** `portfolio-review`.

### Altman Z-Score
Bankruptcy-risk score combining five weighted ratios (working capital, retained earnings, EBIT, equity, sales — all relative to assets).
- **Good / bad:** > 3.0 safe · 1.8–3.0 grey zone · < 1.8 distress.
- **Surfaced by:** `financial-report-analyst`, `result-validator`.

### Anchoring
The bias of judging a stock by a reference price — usually what you paid — instead of what it is worth today. Antidote: "would I buy it at this price today?"
- **Good / bad:** A behavioral trap, not a metric. The written thesis and its triggers are the cure.
- **Surfaced by:** `thesis-tracker`, `position-ladder`, `learning-coach`.

### Asset Turnover
How efficiently a company converts assets into revenue. `Revenue ÷ Total Assets`.
- **Good / bad:** higher is better, but it's industry-specific (retail runs high, utilities low).
- **Surfaced by:** `fundamental-analysis`.

### Assignment / Early Exercise
Being assigned means an option you sold has been exercised against you: a short call delivers your shares at the strike, a short put makes you buy them. US equity options are American-style, so it can happen on any day before expiration — most often at expiration, or the day before an ex-dividend date when a short call's remaining time value is less than the dividend.
- **Good / bad:** Not a mishap — it is the outcome you agreed to. Plan for it on every in-the-money short option.
- **Surfaced by:** `options-analysis`, `tax-lens`. See [Lesson 15 → Covered calls](learning-options.html#covered-calls--income-for-a-cap).

### ATR (Average True Range)
The average daily trading range over N days (usually 14), where each day's true range is the largest of high − low, |high − previous close| and |low − previous close|. How far the stock actually moves, in dollars.
- **Good / bad:** A ruler, not a verdict. `position-ladder` spaces rungs at 1.0–1.5 × ATR(14) and wants ATR of roughly 1.5–5% of price; rungs tighter than ~0.5 × ATR all fill on one day's noise.
- **Surfaced by:** `technical-analysis`, `position-ladder`.

### AUM (Assets Under Management)
Total market value of the assets a fund holds. For an ETF, the first liquidity and viability check.
- **Good / bad:** > $1B comfortable · $100M–1B fine · < $100M closure risk and wider spreads.
- **Surfaced by:** `etf-analysis`.

---

## B

### Beat and Drop
A stock that beats consensus on the headline numbers yet falls after the print — because expectations were higher than consensus, guidance was cut, or the beat was low quality.
- **Good / bad:** Common in stocks that ran into earnings. The guide, not the print, moves the stock.
- **Surfaced by:** `earnings-preview`, `earnings-call-analysis`.

### Beneish M-Score
An eight-variable model (receivables, gross-margin, asset-quality, sales-growth, depreciation, SG&A, accruals and leverage indices) that scores how closely a company's statements resemble those of past earnings manipulators. Annual data, non-financial companies only.
- **Good / bad:** > −1.78 likely-manipulator zone (Beneish's cutoff) · −2.22 to −1.78 grey zone · < −2.22 unlikely. A screen, not a verdict — a genuine fast grower can trip it on sales growth alone.
- **Surfaced by:** `forensic-accounting` (computes it), `bear-case`, `financial-report-analyst`, `stock-eval`.

### Beta (β)
How much a stock moves relative to the market. β = 1 moves with the market; β > 1 is more volatile; β < 1 is calmer; negative β moves opposite.
- **Good / bad:** not good or bad — it sizes *risk*. High beta amplifies both gains and losses.
- **Surfaced by:** `dcf-valuation` (feeds WACC), `technical-analysis`, `portfolio-review`.

### Bid-Ask Spread
The gap between the highest price a buyer will pay and the lowest a seller will accept. A round-trip cost you pay on every trade.
- **Good / bad:** ≤ 0.05% of price for a liquid large cap or broad ETF · > 0.25% thin — use limit orders.
- **Surfaced by:** `etf-analysis`, `technical-analysis`.

### Book Value
Net assets on the balance sheet: `Total Assets − Total Liabilities`. The accounting "breakup" value of equity.
- **Surfaced by:** `stock-valuation`, `fundamental-analysis`.

### Burn Rate
How fast a company spends cash in excess of revenue, usually for pre-profit firms. Paired with **runway** (months of cash left).
- **Good / bad:** lower burn + longer runway is safer. Negative free cash flow with short runway is a red flag.
- **Surfaced by:** `financial-report-analyst`.

### Business Cycle Phases
The four rough stages an economy moves through: **early** (recovery, rates low, curve steep), **mid** (solid but moderating growth), **late** (tight capacity, rising inflation, curve flat or inverted) and **recession** (output falling, the Fed cutting). Different sectors have *tended* to lead in each.
- **Good / bad:** A historical tendency, dated only in hindsight — use it to check your exposure, not to rotate on a schedule.
- **Surfaced by:** `economics-analysis`, `sector-analysis`, `risk-stress-test`. See [Lesson 14 → The business cycle](learning-macro.html#the-business-cycle-and-sector-leadership).

---

## C

### CAGR (Compound Annual Growth Rate)
The smoothed annual growth rate over a multi-year period. `(End ÷ Start)^(1/years) − 1`.
- **Surfaced by:** `dividend-analysis`, `fundamental-analysis`.

### Call Option
The right, not the obligation, to **buy** 100 shares at the strike price until expiration. The buyer pays a premium; the seller (writer) collects it and must deliver the shares if assigned.
- **Good / bad:** A long call can lose only its premium; a short call without the shares (naked) has no ceiling on its loss.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Calls, puts, and the contract](learning-options.html#calls-puts-and-the-contract).

### Cash-Secured Put
Selling a put while holding the cash to buy the shares if assigned — a limit buy below the market that pays you a premium while you wait. Effective cost if assigned = strike − premium.
- **Good / bad:** Sensible only on a stock you want at the strike, with the cash really there (no margin). If the stock runs away you keep a small premium and miss the move.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Cash-secured puts](learning-options.html#cash-secured-puts--a-paid-limit-order).

### Consensus Estimate
The average of published analyst forecasts for revenue, EPS, or guidance. The bar a company is measured against on earnings day.
- **Good / bad:** Not good or bad — the question is whether the *price* already assumes more than consensus.
- **Surfaced by:** `earnings-preview`, `stock-valuation`.

### Correlation
How closely two holdings move together, from −1 to +1. Diversification only works when correlations are low — and they rise toward 1 in a crash.
- **Good / bad:** < 0.5 between core holdings is real diversification · > 0.8 is the same bet twice.
- **Surfaced by:** `portfolio-review`, `risk-stress-test`.

### Covenant
A condition in a loan agreement or bond indenture the borrower must keep — typically a maximum leverage (debt / EBITDA) or minimum interest-coverage test, measured on the agreement's own, usually generous, EBITDA definition. A breach lets lenders accelerate repayment or reprice the debt.
- **Good / bad:** Headroom below 15% is tight; a waiver or amendment in the last two years is a flag. Most investment-grade bonds carry none.
- **Surfaced by:** `credit-check`, `financial-report-analyst`, `dividend-analysis`, `forensic-accounting`.

### Covered Call
Selling one call against every 100 shares you own: premium now, in exchange for selling at the strike if the stock is above it. Converts part of your upside into income; break-even falls by the premium.
- **Good / bad:** Suits a stock you would be content to sell at the strike, ideally when IV rank is high. Watch ex-dividend dates (early assignment) and the holding-period rules before writing on a large gain.
- **Surfaced by:** `options-analysis`, `catalyst-calendar`. See [Lesson 15 → Covered calls](learning-options.html#covered-calls--income-for-a-cap).

### CPI (Consumer Price Index)
The Bureau of Labor Statistics' monthly measure of out-of-pocket prices paid by urban consumers, released around mid-month at 8:30 am ET; **core CPI** excludes food and energy. It peaked at about 9.1% year over year in June 2022.
- **Good / bad:** The market's inflation number — first out, so it moves yields on the day. It usually runs a few tenths above PCE, and the Fed's 2% target is defined on PCE, not CPI.
- **Surfaced by:** `economics-analysis`, `catalyst-calendar`, `fact-check`. See [Lesson 14 → Inflation](learning-macro.html#inflation-cpi-vs-core-pce).

### Credit Spread
The extra yield a corporate bond pays over a Treasury of the same maturity, usually quoted as an option-adjusted spread in basis points. The credit market's price for default risk.
- **Good / bad:** Investment grade < 100 bp normal · > 150 bp stress. High yield < 350 bp normal · > 500 bp distress · > 800 bp crisis. Spreads widening while stocks hold steady is a warning.
- **Surfaced by:** `economics-analysis`, `credit-check`, `sector-analysis`, `portfolio-review`. See [Lesson 14 → Credit](learning-macro.html#channel-2--credit).

### Current Ratio
Short-term liquidity: `Current Assets ÷ Current Liabilities`. Can the company cover the next 12 months of bills?
- **Good / bad:** > 1.5 comfortable · 1.0–1.5 adequate · < 1.0 potential strain.
- **Surfaced by:** `fundamental-analysis`, `financial-report-analyst`.

---

## D

### Days-to-Cover (Short Interest Ratio)
Days of normal trading volume it would take short sellers to buy back (cover) all shorted shares. `Shares Short ÷ Average Daily Volume`.
- **Good / bad:** higher = more squeeze fuel. > 5 days is notable; > 10 is high.
- **Surfaced by:** `short-interest`.

### DCF (Discounted Cash Flow)
Valuation method that projects future free cash flows and discounts them back to today's value using a discount rate (WACC). The output is an **intrinsic value** per share.
- **Surfaced by:** `dcf-valuation`, `stock-valuation`. See [Concepts → How intrinsic value works](concepts.html#how-intrinsic-value-works).

### Debt-to-Equity (D/E)
Leverage: `Total Debt ÷ Shareholders' Equity`. How much the company funds itself with debt vs. owner capital.
- **Good / bad:** < 1.0 conservative · 1.0–2.0 moderate · > 2.0 leveraged (industry-dependent — banks and utilities run high).
- **Surfaced by:** `fundamental-analysis`, `dividend-analysis`.

### Delta
How much an option's price moves for a $1 move in the stock: 0 to 1 for calls, 0 to −1 for puts, about ±0.5 at the money. Doubles as a hedge ratio (a 0.27-delta call behaves like ~27 shares) and a rough probability of finishing in the money.
- **Good / bad:** Count option exposure in shares — delta × 100 × contracts — against your position limits.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → The Greeks](learning-options.html#the-greeks-in-plain-words).

### Disposition Effect
The tendency to sell winners too early and hold losers too long, because realizing a loss hurts more than realizing a gain feels good.
- **Good / bad:** The most expensive bias for individual investors. Pre-committed exit rules are the antidote.
- **Surfaced by:** `thesis-tracker`, `position-ladder`, `learning-coach`.

### Dividend Coverage Ratio
How many times earnings (or free cash flow) cover the dividend. `EPS ÷ Dividend per Share`, or the FCF version.
- **Good / bad:** > 2x healthy · 1.5–2x adequate · < 1.2x fragile.
- **Surfaced by:** `dividend-analysis`.

### Dividend Payout Ratio
Share of earnings paid out as dividends. `Dividends ÷ Net Income`.
- **Good / bad:** < 60% generally sustainable · 60–80% watch · > 100% paying more than it earns (yield-trap warning).
- **Surfaced by:** `dividend-analysis`.

### Dividend Yield
Annual dividend as a percent of price. `Annual Dividend ÷ Price`.
- **Good / bad:** a very high yield (e.g., > 7%) is often a *warning*, not a gift — the market may expect a cut. See [yield trap](#yield-trap).
- **Surfaced by:** `dividend-analysis`.

### Drawdown / Max Drawdown
The fall from a peak to the following trough, as a percentage. Max drawdown is the worst such fall over a period — the number that decides whether you can hold on.
- **Good / bad:** Know it before you own it: a 50% drawdown needs a 100% gain to recover.
- **Surfaced by:** `risk-stress-test`, `portfolio-review`.

### Dual Mandate
The Federal Reserve's two goals, set by Congress: **maximum employment** and **stable prices** — defined since 2012 as 2% inflation over the longer run, measured by the PCE index. When the two conflict, markets spend months guessing which risk the Fed will tolerate.
- **Surfaced by:** `economics-analysis`. See [Lesson 14 → What the Fed is trying to do](learning-macro.html#what-the-fed-is-trying-to-do).

### Dual-Class Shares
A structure in which one share class — usually the founders' — carries more votes per share than the class the public buys: control without a majority of the economic ownership.
- **Good / bad:** It protects good long-term founders and entrenches poor ones; outside shareholders cannot vote management out. A governance risk flag, not a disqualifier.
- **Surfaced by:** `bear-case`, `compare`.

---

## E

### EBITDA
Earnings Before Interest, Taxes, Depreciation & Amortization — a proxy for operating cash generation that strips out capital structure and accounting choices.
- **Caution:** ignores real capital costs; "EBITDA is not cash flow."
- **Surfaced by:** `stock-valuation`, `fundamental-analysis`.

### EPS (Earnings Per Share)
Net income attributable to each share. `Net Income ÷ Shares Outstanding`. "Diluted EPS" includes options/convertibles.
- **Surfaced by:** nearly every fundamental skill.

### Estate Tax (Non-Resident)
US federal estate tax on **US-situs** assets — US-domiciled stocks and ETFs — held by a non-resident alien at death, above an exemption of only **$60,000**, at rates up to 40%, unless an estate-tax treaty applies.
- **Good / bad:** Treasuries, bank deposits, and non-US-domiciled funds (e.g. Irish UCITS) are outside the net. Not tax advice.
- **Surfaced by:** `tax-lens --non-us`.

### EV (Enterprise Value)
The whole-company price a buyer pays: `Market Cap + Total Debt − Cash`. Used instead of market cap so debt-heavy and cash-rich firms compare fairly.
- **Surfaced by:** `stock-valuation`.

### EV/EBITDA
Enterprise value relative to operating earnings — a capital-structure-neutral valuation multiple.
- **Good / bad:** < 10x often cheap · 10–15x fair · > 15x rich (sector-dependent).
- **Surfaced by:** `stock-valuation`.

### Ex-Dividend Date
The first day a stock trades *without* the right to the next dividend. Buy before it to receive the payment; the price typically drops by roughly the dividend on that day.
- **Good / bad:** Matters for the qualified-dividend holding-period test and for timing sales.
- **Surfaced by:** `dividend-analysis`, `tax-lens`, `catalyst-calendar`.

### Expense Ratio
A fund's annual fee as a percentage of assets, deducted from returns automatically. `Annual fund costs ÷ Average assets`.
- **Good / bad:** ≤ 0.10% for a broad index fund · 0.20–0.50% for specialty · > 0.75% needs a reason.
- **Surfaced by:** `etf-analysis`.

---

## F

### FCF (Free Cash Flow)
Cash left after operating expenses *and* capital spending. `Operating Cash Flow − CapEx`. The cash an owner could actually take out.
- **Good / bad:** consistently positive and growing is the gold standard. Negative FCF needs a growth story to justify it.
- **Surfaced by:** `dcf-valuation`, `fundamental-analysis`, `dividend-analysis`.

### FCF Yield
Free cash flow relative to market cap. `FCF ÷ Market Cap`. The cash-return version of an earnings yield.
- **Good / bad:** > 5% attractive · 3–5% fair · < 3% expensive.
- **Surfaced by:** `stock-valuation`.

### Federal Funds Rate
The overnight rate banks charge each other, set by the FOMC as a target range — 5.25–5.50% from July 2023 until the first cut in September 2024. It anchors short-term rates and, through them, the risk-free rate in every valuation.
- **Good / bad:** The market prices the *path* (fed funds futures), so it is the surprise versus that path, not the level, that moves stocks.
- **Surfaced by:** `economics-analysis`. See [Lesson 14 → What the Fed is trying to do](learning-macro.html#what-the-fed-is-trying-to-do).

### FOMC & Dot Plot
The Federal Open Market Committee — twelve voting members — sets the federal funds rate at eight scheduled meetings a year: statement at 2:00 pm ET, press conference at 2:30 pm, minutes three weeks later. The **dot plot**, in the Summary of Economic Projections at the March, June, September and December meetings, shows where each participant thinks the rate should be at each year-end.
- **Good / bad:** The dots are forecasts, not commitments. The gap between the median dot and futures pricing is what moves on meeting day.
- **Surfaced by:** `catalyst-calendar`, `options-analysis`, `thesis-tracker`. See [Lesson 14 → FOMC mechanics](learning-macro.html#fomc-mechanics).

### Form 13F
The quarterly SEC filing in which institutional managers with more than $100 million in US equities list their long holdings, due up to 45 days after quarter-end.
- **Good / bad:** Holdings can be about four months old when you read them, and shorts and most hedges are invisible — confirmation, not a trading signal.
- **Surfaced by:** `institutional-ownership`, `short-interest`, `fact-check`. See [Lesson 5 → Sentiment and smart-money positioning](learning-market.html#2-sentiment-and-smart-money-positioning).

### Form 4
The SEC filing an insider (officer, director, or > 10% holder) must make within **two business days** of buying or selling the company's stock.
- **Good / bad:** Open-market purchases (code P) are the informative ones; sales are often 10b5-1 plan executions or for taxes and diversification. Several insiders buying at once is the strongest signal.
- **Surfaced by:** `insider-trading`, `forensic-accounting`, `financial-report-analyst`, `fact-check`. See [Lesson 5 → Sentiment and smart-money positioning](learning-market.html#2-sentiment-and-smart-money-positioning).

### Form 8-K
The "current report" a company files within four business days of a material event — earnings releases (Item 2.02, with the non-GAAP reconciliation as Exhibit 99.1), material agreements such as new debt (1.01), auditor changes (4.01), non-reliance on past financials (4.02), and officer departures (5.02).
- **Good / bad:** Item 4.01 and 4.02 filings are red flags. Read the exhibit, not the headline.
- **Surfaced by:** `fact-check`, `forensic-accounting`, `credit-check`, `earnings-call-analysis`, `10k-digest`.

---

## G

### GAAP vs. Non-GAAP
GAAP earnings follow US accounting rules; non-GAAP ("adjusted") earnings are management's version, usually excluding stock-based compensation, amortisation of acquired intangibles and "one-time" charges. The company must reconcile the two, typically in its 8-K earnings exhibit.
- **Good / bad:** Gap % = (Non-GAAP − GAAP net income) ÷ |GAAP net income|. Under 10% and stable is clean; a gap widening three periods running, or "one-time" charges that recur most years, is a flag.
- **Surfaced by:** `forensic-accounting`, `financial-report-analyst`, `fact-check`, `bear-case`.

### Gamma
How fast an option's delta changes as the stock moves — the option's acceleration. Highest at the money close to expiration.
- **Good / bad:** High gamma means exposure swings fastest, in both directions; short options near expiry carry the most of it, and dealer hedging of it can fuel squeezes.
- **Surfaced by:** `options-analysis`, `short-interest`. See [Lesson 15 → The Greeks](learning-options.html#the-greeks-in-plain-words).

### Goodwill & Impairment
Goodwill is the amount paid in an acquisition above the fair value of the net assets acquired; it sits on the balance sheet and is tested for impairment at least annually. An **impairment** writes it down — a non-cash charge that admits the company overpaid.
- **Good / bad:** Goodwill above 30% of total assets without a clear acquisition rationale deserves scrutiny; repeated impairments mark a serial overpayer.
- **Surfaced by:** `financial-report-analyst`, `dividend-analysis`, `stock-eval`.

### Greeks (Options)
Sensitivities of an option's price: **Delta** (vs. underlying price), **Gamma** (rate of delta change), **Theta** (time decay), **Vega** (vs. volatility), **Rho** (vs. interest rates). The first four have their own entries: [Delta](#delta), [Gamma](#gamma), [Theta](#theta), [Vega](#vega).
- **Surfaced by:** `options-analysis`. See [Lesson 15 → The Greeks](learning-options.html#the-greeks-in-plain-words).

### Gross Margin
Profit after the direct cost of goods. `(Revenue − COGS) ÷ Revenue`. A first read on pricing power.
- **Good / bad:** higher and stable signals a moat; falling margins signal competition.
- **Surfaced by:** `fundamental-analysis`, `competitor-analysis`.

### Guidance
Management's own forecast for the coming quarter or year, given with the earnings release. The stock reacts more to the guide than to the reported quarter.
- **Good / bad:** "Beat and raise" is the bullish case; "beat and lower" is the classic beat-and-drop.
- **Surfaced by:** `earnings-preview`, `earnings-call-analysis`.

---

## I

### Implied Move
The size of the earnings-day move the options market is pricing: roughly the at-the-money straddle price ÷ stock price for the first expiry after the print. Magnitude only — it says nothing about direction.
- **Good / bad:** Compare with the realized median move of past prints: implied ÷ realized > 1.2 means the event is expensively insured.
- **Surfaced by:** `earnings-preview`, `options-analysis`.

### Implied Volatility (IV)
The market's expected future volatility, baked into option prices. Higher IV = pricier options = bigger expected swings.
- **Surfaced by:** `options-analysis`.

### Initial Jobless Claims
The weekly count of first-time unemployment-insurance filings, released Thursdays at 8:30 am ET. The most timely labour-market gauge, and one of the LEI's components.
- **Good / bad:** Watch the four-week average: a sustained rise from the low matters; a single spike from a storm or holiday does not.
- **Surfaced by:** `economics-analysis`. See [Lesson 14 → Leading indicators](learning-macro.html#leading-indicators-worth-a-glance).

### Interest Coverage Ratio
How easily operating earnings pay interest. `EBIT ÷ Interest Expense` (EBITDA ÷ interest is the looser variant).
- **Good / bad:** > 5x safe · 2–5x adequate · < 1.5x danger. `credit-check` scores EBIT / interest > 15x as strongest and < 1.5x, or three years of decline, as weakest — the trend matters as much as the level.
- **Surfaced by:** `credit-check`, `financial-report-analyst`, `dividend-analysis`, `stock-eval`.

### Intrinsic & Time Value
The two parts of every option premium. **Intrinsic value** is what the option is worth if exercised now — call: stock − strike; put: strike − stock; never below zero (not the same as a DCF's intrinsic value). **Time value** is the rest — the price of the chance it gains before expiry — and decays to zero at expiration.
- **Good / bad:** Time value is largest at the money. A buyer pays it and needs a big enough, fast enough move; a seller collects it.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Calls, puts, and the contract](learning-options.html#calls-puts-and-the-contract).

### Investment Policy Statement (IPS)
A one-page written contract with yourself: goal, horizon, target allocation with bands, contribution schedule, rebalancing rule, position limits, and the list of things you will not do.
- **Good / bad:** Exists and is reviewed on a date — or does not exist. `portfolio-review` grades a portfolio against it.
- **Surfaced by:** `portfolio-review`, `thesis-tracker`.

### ISM PMI
The Institute for Supply Management's monthly purchasing-managers survey — manufacturing on the first business day, services shortly after — reported as a diffusion index.
- **Good / bad:** > 50 expansion · < 50 contraction; the new-orders component leads the headline. Manufacturing PMI sat below 50 for most of late 2022–2024 without a recession following.
- **Surfaced by:** `economics-analysis`. See [Lesson 14 → Leading indicators](learning-macro.html#leading-indicators-worth-a-glance).

### IV Crush
The sharp drop in implied volatility once an anticipated event — usually earnings — is out, because the uncertainty the options were pricing has been resolved. Front-month IV often falls 30–50% the next day.
- **Good / bad:** A long option loses about vega × the IV drop even with the stock unchanged — why buying calls into earnings can lose money on a correct "beat" call.
- **Surfaced by:** `options-analysis`, `catalyst-calendar`. See [Lesson 15 → Implied volatility](learning-options.html#implied-volatility-and-iv-rank).

### IV Rank / IV Percentile
Where current implied volatility sits versus its own past year (0–100). Tells you if options are "expensive" or "cheap" relative to their own history.
- **Good / bad:** high IV rank favors *selling* premium; low favors *buying* it.
- **Surfaced by:** `options-analysis`.

---

## L

### LEI (Leading Economic Index)
The Conference Board's monthly composite of ten forward-looking series — manufacturing hours, jobless claims, orders, building permits, the yield curve, credit, stock prices and consumer expectations.
- **Good / bad:** Three or more consecutive monthly declines, or a year-over-year fall of more than 4%, has historically lined up with recessions — yet it fell for about two years from 2022 with no recession following.
- **Surfaced by:** `economics-analysis`. See [Lesson 14 → Leading indicators](learning-macro.html#leading-indicators-worth-a-glance).

### Limit Order
An order to buy or sell only at a stated price or better. The default order type for an investor: it caps what you pay and cannot fill 2% away in a thin market.
- **Good / bad:** Use limit orders; reserve market orders for the most liquid names during regular hours, if at all.
- **Surfaced by:** `position-ladder` (rungs are resting limit orders).

### Lock-up Expiry
The date — usually 90 to 180 days after an IPO — when insiders and early investors are first allowed to sell. A known, datable overhang of supply.
- **Good / bad:** The larger the share of the float becoming eligible, the larger the risk; check how the stock behaved in the 2–4 weeks around past expiries.
- **Surfaced by:** `catalyst-calendar`, `bear-case`, `compare`, `thesis-tracker`.

---

## M

### MACD (Moving Average Convergence Divergence)
A momentum indicator: the 12-day EMA minus the 26-day EMA, plotted with a 9-day EMA of that line as the **signal line**; the histogram is the gap between the two.
- **Good / bad:** A cross above the signal line is bullish momentum, below is bearish; a divergence from price is the more useful read. Like every moving average, it lags.
- **Surfaced by:** `technical-analysis`, `chart-master`. See [Lesson 5 → Technical analysis basics](learning-market.html#1-technical-analysis-basics).

### Margin of Safety
The discount between a stock's price and its estimated intrinsic value. The buffer that protects you if your estimate is wrong.
- **Good / bad:** value investors often want 20–40%+ before buying.
- **Surfaced by:** `dcf-valuation`, `stock-eval`. See [Concepts → Margin of safety](concepts.html#margin-of-safety--position-sizing).

### Market Order
An order to buy or sell immediately at the best available price. Fast, but the fill price is whatever the book offers — costly on illiquid tickers, at the open, or in extended hours.
- **Good / bad:** Avoid unless the stock is deeply liquid and the market is open. See Limit Order.
- **Surfaced by:** —

### Maturity Wall
When a company's debt falls due, set against the cash, undrawn committed revolver and free cash flow available to repay it. Also: refinancing wall.
- **Good / bad:** Window coverage = (Cash + Undrawn revolver + Cumulative FCF) ÷ Maturities: > 2.0× self-funded · 1.0–2.0× manageable · 0.5–1.0× refinancing-dependent · < 0.5× a wall.
- **Surfaced by:** `credit-check`, `bear-case`, `catalyst-calendar`, `financial-report-analyst`. See [Lesson 14 → Credit](learning-macro.html#channel-2--credit).

### Moat
A durable competitive advantage that protects long-term profits — brand, network effects, switching costs, scale, or patents.
- **Good / bad:** wide > narrow > none. Shows up as persistently high ROIC and stable margins.
- **Surfaced by:** `competitor-analysis`, `stock-eval`. See [Concepts → Reading a moat](concepts.html#reading-a-moat).

### Moneyness (ITM / ATM / OTM)
Where an option's strike sits against the stock price. **In the money:** a call with the strike below the price, or a put with it above — it has intrinsic value. **At the money:** strike ≈ price. **Out of the money:** a call above, a put below — the premium is all time value.
- **Good / bad:** Far out-of-the-money options are cheap because they usually expire worthless.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Calls, puts, and the contract](learning-options.html#calls-puts-and-the-contract).

---

## N

### Net Debt / EBITDA
Leverage measured in years of operating earnings: `(Total Debt − Cash & ST Investments) ÷ EBITDA`.
- **Good / bad:** Net cash or < 1.0× strong · > 6.0× (or negative EBITDA) weakest in `credit-check` scoring; on its rating-band guide (gross debt / EBITDA) 2–3× is typical of BBB and 3–4× of BB. Use GAAP EBITDA — "adjusted" EBITDA can flatter it by a turn or more. Utilities and REITs run higher.
- **Surfaced by:** `credit-check`, `stock-eval`, `financial-report-analyst`, `dividend-analysis`.

---

## O

### Open Interest
The number of option contracts outstanding at a strike and expiration — positions opened and not yet closed. Not the same as volume, which counts contracts traded today.
- **Good / bad:** Hundreds of contracts or more is workable; a strike with open interest of a dozen may have no real buyer when you need one.
- **Surfaced by:** `options-analysis`, `short-interest`, `technical-analysis`. See [Lesson 15 → Liquidity](learning-options.html#liquidity-the-cost-nobody-quotes).

### Operating Leverage (DOL)
How much operating income swings for a given change in revenue, because fixed costs do not move with sales. `DOL = % Change in Operating Income ÷ % Change in Revenue`.
- **Good / bad:** DOL above 3× amplifies both directions — great on the way up, painful in a downturn. Claimed operating leverage should show up as operating-margin expansion.
- **Surfaced by:** `stock-eval`, `financial-report-analyst`, `stock-valuation`.

### Overlap (Holdings Overlap)
The share of an ETF that duplicates what you already own, computed as Σ min(weight in ETF, weight in your portfolio) over shared holdings.
- **Good / bad:** < 25% complementary · 25–60% partial · > 60% the same bet in a second wrapper.
- **Surfaced by:** `etf-analysis`, `portfolio-review`.

---

## P

### P/B (Price-to-Book)
Price relative to accounting net worth. `Price ÷ Book Value per Share`.
- **Good / bad:** most useful for asset-heavy/financial firms; < 1.0 can mean cheap *or* troubled.
- **Surfaced by:** `stock-valuation`.

### P/E (Price-to-Earnings)
Price per dollar of earnings. `Price ÷ EPS`. The most-quoted multiple; compare to the company's own history and peers, not in isolation.
- **Good / bad:** there is no universal "good" P/E — a 40x grower can be cheaper than a 10x decliner. Pair with growth (see PEG).
- **Surfaced by:** `stock-valuation`, `stock-eval`.

### P/S (Price-to-Sales)
Price per dollar of revenue. `Market Cap ÷ Revenue`. Useful for unprofitable or early-stage firms where P/E is meaningless.
- **Surfaced by:** `stock-valuation`.

### PCE / Core PCE
The Bureau of Economic Analysis's Personal Consumption Expenditures price index, released near month-end. Broader than CPI — it includes spending made on households' behalf — with shifting weights and a much smaller shelter share. The Fed's 2% target is defined on PCE; **core PCE** (excluding food and energy) is its preferred guide to the trend.
- **Good / bad:** Usually a few tenths below CPI. CPI moves the market first; core PCE tells you what the Fed will think.
- **Surfaced by:** `economics-analysis`, `catalyst-calendar`. See [Lesson 14 → Inflation](learning-macro.html#inflation-cpi-vs-core-pce).

### PEG Ratio
P/E adjusted for growth. `P/E ÷ Earnings Growth Rate (%)`. Puts fast and slow growers on the same footing.
- **Good / bad:** ~1.0 fairly priced · < 1.0 potentially cheap · > 2.0 expensive.
- **Surfaced by:** `stock-valuation`, `stock-eval`.

### Piotroski F-Score
A 0–9 checklist of fundamental health across profitability, leverage/liquidity, and operating efficiency. Each "yes" scores a point.
- **Good / bad:** 7–9 strong · 4–6 middling · 0–3 weak.
- **Surfaced by:** `stock-eval`, `fundamental-analysis`.

### Porter's Five Forces
A framework rating industry attractiveness across five pressures: competitive rivalry, supplier power, buyer power, threat of substitutes, threat of new entrants.
- **Surfaced by:** `competitor-analysis`.

### Pre-Mortem
Writing, before you buy, the paragraph that begins "It is twelve months later and this position lost 40% because…". Forces the most likely failure path into the open while it can still become an invalidation trigger.
- **Good / bad:** Every thesis file should have one.
- **Surfaced by:** `thesis-tracker`, `bear-case`.

### Process vs. Outcome
The 2×2 that separates a good decision from a good result: good decision / good outcome, good decision / bad outcome (bad luck — keep the process), bad decision / good outcome (the dangerous one — you learn the wrong lesson), bad decision / bad outcome.
- **Good / bad:** Judge yourself on the process column; the market decides the outcome column.
- **Surfaced by:** `thesis-tracker` (decision log), `learning-coach`.

### Protective Put & Collar
A **protective put** is buying a put on shares you own — a floor at the strike, for the premium. A **collar** pays for that put by also selling a call above the price, giving up the upside beyond the call's strike.
- **Good / bad:** Insurance for a specific risk and window: a put rolled every quarter can cost double-digit percent a year. A collar is cheap because it sells your upside — a fit for a concentrated position you cannot sell yet.
- **Surfaced by:** `options-analysis`, `catalyst-calendar`. See [Lesson 15 → Protective puts and collars](learning-options.html#protective-puts-and-collars--what-insurance-costs).

### Put Option
The right, not the obligation, to **sell** 100 shares at the strike price until expiration. A long put gains as the stock falls; a short put obliges you to buy at the strike if assigned.
- **Good / bad:** Long puts are insurance; sell puts only cash-secured, on a stock you want to own.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Calls, puts, and the contract](learning-options.html#calls-puts-and-the-contract).

### Put/Call Ratio
Put volume (or open interest) divided by call volume — a sentiment gauge, read *contrarian* at the extremes.
- **Good / bad:** < 0.6 complacency (a contrarian warning) · 0.7–1.0 neutral · > 1.3 extreme fear (a contrarian buy signal). For a single stock, an open-interest ratio above 1.5 means heavy hedging or a bearish bet.
- **Surfaced by:** `technical-analysis`, `short-interest`, `options-analysis`. See [Lesson 5 → Sentiment and smart-money positioning](learning-market.html#2-sentiment-and-smart-money-positioning).

---

## Q

### QE / QT (Quantitative Easing / Tightening)
QE: the Fed buys Treasuries and mortgage bonds to push long-term yields down and add liquidity. QT: it lets those bonds run off its balance sheet without replacing them — the reverse, more slowly.
- **Good / bad:** QE has tended to support valuations; QT is a slow extra tightening on top of rate hikes.
- **Surfaced by:** — See [Lesson 14 → What the Fed is trying to do](learning-macro.html#what-the-fed-is-trying-to-do).

### Qualified Dividend
A dividend taxed at the lower long-term capital-gains rates instead of ordinary rates. Requires an eligible payer and holding the stock **more than 60 days in the 121-day window** around the ex-dividend date. REIT dividends are generally not qualified.
- **Good / bad:** Qualified → lower tax; non-qualified → ordinary income. US rules; not tax advice.
- **Surfaced by:** `tax-lens`, `dividend-analysis`.

### Quick Ratio (Acid Test)
Stricter liquidity than current ratio — excludes inventory. `(Current Assets − Inventory) ÷ Current Liabilities`.
- **Good / bad:** > 1.0 comfortable.
- **Surfaced by:** `fundamental-analysis`.

---

## R

### Residual Income
Earnings above the cost of the equity capital used to produce them. Value is created only when returns exceed the cost of capital.
- **Surfaced by:** `stock-valuation`.

### Reverse DCF
A DCF run backwards: start from today's price and solve for the growth (or margin) the price *requires* at your discount rate. It turns "is it cheap?" into "is that much growth plausible?"
- **Good / bad:** Implied growth far above anything the business has achieved = priced for perfection; implied growth below your base case = the price asks for less than the business should deliver.
- **Surfaced by:** `bear-case`, `compare`, `earnings-preview`, `learning-coach`. See [Lesson 12 → What's priced in](learning-earnings.html#whats-priced-in).

### ROA (Return on Assets)
Profit per dollar of assets. `Net Income ÷ Total Assets`. How well management uses the asset base.
- **Good / bad:** > 5% solid (industry-dependent).
- **Surfaced by:** `fundamental-analysis`.

### ROE (Return on Equity)
Profit per dollar of shareholder equity. `Net Income ÷ Equity`. Watch for ROE inflated by heavy debt.
- **Good / bad:** > 15% strong · 10–15% decent · < 10% weak.
- **Surfaced by:** `fundamental-analysis`, `stock-eval`.

### ROIC (Return on Invested Capital)
The cleanest profitability measure: returns on *all* capital (debt + equity) put to work. `NOPAT ÷ Invested Capital`. Compare to WACC — value is created only when **ROIC > WACC**.
- **Good / bad:** > 15% excellent · 10–15% good · below WACC = destroying value.
- **Surfaced by:** `stock-eval`, `fundamental-analysis`, `competitor-analysis`.

### Rule of 40
A shortcut for growth software: **revenue growth % + FCF margin %** should be at least 40.
- **Good / bad:** ≥ 40 healthy, measured on the SBC-adjusted FCF margin; well below 40 means growth is being bought too expensively, or has stalled.
- **Surfaced by:** `stock-eval`, `financial-report-analyst`, `compare`.

---

## S

### Sahm Rule
A real-time recession signal: it triggers when the three-month average unemployment rate rises **0.50 percentage points** or more above its lowest three-month average of the prior twelve months.
- **Good / bad:** It flagged every US recession since 1970 — and triggered in **August 2024** (the July jobs report) with no recession declared since, partly because the rise came from labour-force growth, not layoffs. A shift in probability, not a verdict.
- **Surfaced by:** `economics-analysis`, `learning-coach`. See [Lesson 14 → Leading indicators](learning-macro.html#leading-indicators-worth-a-glance).

### Settlement (T+1)
US stock trades settle one business day after the trade date: that is when shares are delivered and cash is final. Selling and immediately re-spending the proceeds can run into settlement rules in cash accounts.
- **Good / bad:** Know when your cash is actually available before placing the next order.
- **Surfaced by:** —

### Sharpe Ratio
Risk-adjusted return: excess return per unit of volatility. `(Return − Risk-free Rate) ÷ Std Dev`.
- **Good / bad:** > 1 good · > 2 very good · < 1 weak.
- **Surfaced by:** `portfolio-review`.

### Short Float (Short Interest %)
Percent of freely tradable shares sold short. `Shares Short ÷ Float`.
- **Good / bad:** > 10% elevated · > 20% high (crowded short, squeeze potential).
- **Surfaced by:** `short-interest`.

### Sortino Ratio
Like the Sharpe ratio, but penalizes only *downside* volatility: `(Return − Risk-free) ÷ Downside deviation`. Rewards portfolios whose swings are mostly upward.
- **Good / bad:** > 1 acceptable · > 2 strong. Compare against a benchmark over the same period.
- **Surfaced by:** `portfolio-review`, `risk-stress-test`.

### Specific Identification (Lot Selection)
Choosing *which* shares (tax lot) you sell — instead of the broker's default, usually FIFO. Must be designated at or before the trade. Lets you pick the lot that produces the gain or loss you want.
- **Good / bad:** Almost always better than FIFO for a partial sale of a long-held winner. US rules; not tax advice.
- **Surfaced by:** `tax-lens`, `position-ladder`.

### Stock-Based Compensation (SBC)
Pay in shares or options instead of cash. A real cost — it dilutes owners — but excluded from non-GAAP earnings and added back in operating cash flow, so it flatters both.
- **Good / bad:** As % of revenue: < 5% normal · 5–15% material — value FCF on the SBC-adjusted line, `FCF − SBC` · > 15% severe. Buybacks that only offset SBC are compensation paid in cash.
- **Surfaced by:** `forensic-accounting`, `stock-eval`, `financial-report-analyst`, `stock-valuation`, `bear-case`.

### Strike Price
The fixed price at which an option can be exercised — what a call holder pays for the shares, or a put holder receives for them. Its distance from the stock price sets the option's moneyness.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → Calls, puts, and the contract](learning-options.html#calls-puts-and-the-contract).

### Support & Resistance
Price levels where buying (support) or selling (resistance) has historically clustered. Breaks of these levels are technical signals.
- **Surfaced by:** `technical-analysis`.

---

## T

### Tax-Loss Harvesting
Selling a position at a loss to offset realized gains (and up to a small amount of ordinary income), then holding a *similar but not substantially identical* replacement for 31 days to avoid a wash sale.
- **Good / bad:** Defers tax, does not eliminate it — the replacement's basis is lower. US rules; not tax advice.
- **Surfaced by:** `tax-lens`, `portfolio-review`.

### Terminal Value
In a DCF, the value of all cash flows *beyond* the explicit forecast period — often 60–80% of the total. Highly sensitive to the assumed perpetual growth rate.
- **Surfaced by:** `dcf-valuation`. See [Concepts → How intrinsic value works](concepts.html#how-intrinsic-value-works).

### Theta
How much value an option loses each day from the passage of time, all else equal. Decay accelerates in the last weeks before expiration.
- **Good / bad:** It works for the seller and against the buyer — a buyer needs the move to come soon.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → The Greeks](learning-options.html#the-greeks-in-plain-words).

### Tracking Difference
A fund's actual return minus its index's return over a period. For a well-run index fund it is roughly −(expense ratio); anything worse is a gap to explain.
- **Good / bad:** ≈ −ER is fine · a gap beyond −(ER + 0.10%)/yr is a flag. Not the same as tracking error.
- **Surfaced by:** `etf-analysis`.

### Tracking Error
The *volatility* of the difference between a fund's returns and its index's returns — how consistently it tracks, not how much it lags. Low tracking error with a large tracking difference means a fund that reliably underperforms.
- **Good / bad:** < 0.10% annualized for a physical broad-market ETF is tight.
- **Surfaced by:** `etf-analysis`.

---

## U

### UCITS ETF
An ETF domiciled in the EU (most often Ireland) under the UCITS framework. For non-US investors it typically means 15% fund-level US withholding under the US–Ireland treaty, accumulating share classes, and no US estate-tax exposure — at a slightly higher fee and wider spreads. US persons should not buy them (PFIC rules).
- **Good / bad:** Often wins after tax for a no-treaty investor despite the higher TER. Not tax advice.
- **Surfaced by:** `tax-lens --non-us`, `etf-analysis`.

---

## V

### VaR / CVaR (Value at Risk / Conditional VaR)
VaR: the loss you would not expect to exceed over a horizon at a confidence level (e.g. 95%, one month). CVaR (expected shortfall): the *average* loss in the cases beyond VaR — the tail VaR ignores.
- **Good / bad:** Parametric VaR assumes normal returns and understates crashes; trust the historical scenario replay when they disagree.
- **Surfaced by:** `risk-stress-test`.

### Vega
How much an option's price changes for a one-point move in implied volatility. Long options gain when IV rises and lose when it falls.
- **Good / bad:** It explains IV crush: a vega of $0.07 with IV falling 30 points costs about $2.10, with the stock unchanged.
- **Surfaced by:** `options-analysis`. See [Lesson 15 → The Greeks](learning-options.html#the-greeks-in-plain-words).

### VIX
The Cboe Volatility Index — the 30-day implied volatility of S&P 500 options, often called the market's "fear gauge".
- **Good / bad:** Under ~20 calm · 20–30 elevated · above 30 stress (a review trigger in `risk-stress-test`); it closed above 80 in March 2020. It measures expected movement, not direction, and spikes are usually short.
- **Surfaced by:** `economics-analysis`, `risk-stress-test`, `options-analysis`.

---

## W

### W-8BEN
The IRS form a non-US individual gives a broker to certify non-US status and claim any treaty rate on US-source income. Generally valid through the end of the third calendar year after signing; an expired form means statutory withholding.
- **Good / bad:** On file and current — or 30% (and possibly backup withholding). Not tax advice.
- **Surfaced by:** `tax-lens --non-us`.

### WACC (Weighted Average Cost of Capital)
The blended required return on a company's debt and equity — the discount rate in a DCF. `(E/V × Cost of Equity) + (D/V × Cost of Debt × (1−tax))`.
- **Good / bad:** not good/bad — it's the hurdle. A small WACC change swings intrinsic value a lot.
- **Surfaced by:** `dcf-valuation`.

### Wash Sale
A loss that is disallowed for US tax because the same or a substantially identical security was bought within **30 days before or after** the sale (a 61-day window) — in any of your accounts, including DRIP purchases and IRAs. The loss is added to the replacement shares' basis, not lost.
- **Good / bad:** Check the window before every loss sale. US rules; not tax advice.
- **Surfaced by:** `tax-lens`, `position-ladder`.

### Whisper Number
The unofficial, buy-side expectation for a company's results — usually above the published consensus for a stock that has been running. The bar the stock *actually* trades against. Always an estimate; label its source.
- **Good / bad:** A large whisper gap over consensus is how a headline "beat" becomes a drop.
- **Surfaced by:** `earnings-preview`.

### Withholding Tax
Tax taken out of a dividend before it reaches the investor. For a non-US holder of US stocks the statutory rate is **30%**, reduced only by an income-tax treaty claimed on a W-8BEN (Taiwan, Hong Kong, and Singapore have no US treaty). A 3.0% gross yield is 2.1% net at 30%.
- **Good / bad:** The single largest tax cost for most non-US dividend investors. Not tax advice.
- **Surfaced by:** `tax-lens --non-us`, `dividend-analysis`.

---

## Y

### Yield Curve / Inversion
Treasury yields plotted by maturity, normally sloping upward. The curve is **inverted** when short-term yields exceed long-term ones — watched as the 10-year minus 2-year ("2s10s") and 10-year minus 3-month spreads.
- **Good / bad:** A 10y−3m inversion preceded every US recession since the late 1960s, with a 6–24-month lag; the re-steepening is often the nearer warning. The 2022–2024 inversion — the longest on record for 2s10s — has not been followed by a declared recession. A probability dial, not a timer.
- **Surfaced by:** `economics-analysis`, `sector-analysis`. See [Lesson 14 → The yield curve](learning-macro.html#the-yield-curve-and-inversion).

### Yield Trap
A stock with a tempting dividend yield that is unsustainable — the market has priced in a coming cut. Spotted via payout ratio > 100%, falling FCF, or rising debt.
- **Surfaced by:** `dividend-analysis`. See [Use Cases → The dividend investor](use-cases.html#the-dividend--income-investor).

---

> **See also:** [Concepts](concepts.html) for the mental models behind these metrics · [Choose a Skill](choose-a-skill.html) to find the right framework · [Data & Accuracy](data-and-accuracy.html) for how to trust the numbers.

*Educational reference only. Not financial advice.*
