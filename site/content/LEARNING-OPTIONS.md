# Options for Stock Investors

> You do not need to trade options to benefit from understanding them. The options market prices, every day, how much a stock is expected to move — information any holder can read for free — and a handful of simple strategies let a stockholder earn income on shares already owned, get paid to wait for a lower entry, or insure a position before a risky event. This lesson explains calls and puts, what an option's price is made of, the Greeks in plain words, implied volatility and what it says about earnings, and those few strategies with their real costs — then explains, with arithmetic, why naked option selling and cheap out-of-the-money calls are where beginners lose the most.

**What you'll learn**

- What a call and a put are, what one contract controls, and the difference between intrinsic value and time value
- The Greeks in plain words — delta, theta, vega, gamma — and the one sentence each is good for
- Implied volatility, IV rank, and how to turn IV into an expected move (and why it collapses after earnings)
- Covered calls: income in exchange for capped upside, assignment, the ex-dividend trap, and the tax clock
- Cash-secured puts as a limit buy that pays you to wait
- Protective puts and collars, and what insurance actually costs per year
- Liquidity — bid-ask spreads and open interest — as the cost nobody quotes
- Why not to sell naked options or buy lottery-ticket calls, worked through on the fictional ZEPH

---

## Calls, puts, and the contract

A **[call](glossary.html#call-option)** is the right, not the obligation, to **buy** 100 shares at a fixed price — the **[strike](glossary.html#strike-price)** — until the **expiration** date. A **[put](glossary.html#put-option)** is the right to **sell** 100 shares at the strike. The buyer pays a **premium** for that right; the seller (the "writer") collects the premium and takes on the obligation. US equity options are **American-style**: the buyer can exercise at any time before expiration, and the seller can be **[assigned](glossary.html#assignment--early-exercise)** at any time.

One contract covers **100 shares**, so a premium quoted at $1.10 costs $110 per contract. Options are described by where the strike sits relative to the stock price:

- **[In the money (ITM)](glossary.html#moneyness-itm--atm--otm):** a call with the strike below the stock price, or a put with the strike above it — exercising it now would be worth something.
- **At the money (ATM):** strike about equal to the stock price.
- **Out of the money (OTM):** a call with the strike above the price, or a put with the strike below it — worth nothing if exercised now; its whole price is hope plus time.

### Intrinsic value vs. time value (illustrative, rounded)

Every premium splits into two parts. **[Intrinsic value](glossary.html#intrinsic--time-value)** is what the option would be worth if exercised right now (never below zero). **Time value** is everything else — what the market charges for the chance the option becomes more valuable before it expires. Time value shrinks to zero at expiration.

ZEPH (the fictional Zephyr Robotics from Lesson 12) trades at a round **$50**. Options expiring in **45 days**, with implied volatility around 40%:

| Option | Premium | Intrinsic value | Time value |
|---|---|---|---|
| $45 call (ITM) | $5.90 | 50 − 45 = **$5.00** | 5.90 − 5.00 = **$0.90** |
| $50 call (ATM) | $2.80 | **$0** | **$2.80** |
| $55 call (OTM) | $1.10 | **$0** | **$1.10** |
| $55 put (ITM) | $6.10 | 55 − 50 = **$5.00** | **$1.10** |
| $45 put (OTM) | $0.90 | **$0** | **$0.90** |

Time value is largest at the money — that is where the outcome is most uncertain. An option buyer pays time value and needs the stock to move far enough, fast enough, to overcome it; an option seller collects it and needs the stock *not* to move too far.

---

## The Greeks in plain words

The [Greeks](glossary.html#greeks-options) describe how an option's price reacts to the things that change it. You need one sentence for each.

| Greek | Plain words | ZEPH example (45-day options at $50) | What it's good for |
|---|---|---|---|
| **[Delta](glossary.html#delta)** | How much the option moves for a $1 move in the stock | $55 call: delta ≈ **0.27** → about $0.27 per $1; the ATM call ≈ 0.53 | **Hedge ratio:** one 0.27-delta call behaves like ~27 shares. **Rough odds:** a 0.27 delta is often read as about a one-in-four chance of finishing in the money — a shorthand, not an exact probability |
| **[Theta](glossary.html#theta)** | How much value the option loses per day, all else equal | ATM call loses about **$0.03 a day** with 45 days left, about **$0.07 a day** with 10 days left | Time decay **accelerates** in the last weeks — it works for the seller and against the buyer |
| **[Vega](glossary.html#vega)** | How much the option moves for a 1-point change in implied volatility | ATM call: about **$0.07** per vol point; if IV falls from 40% to 30%, it loses ≈ **$0.70** with the stock unchanged | Explains why an option can lose money even when you guessed the direction right |
| **[Gamma](glossary.html#gamma)** | How fast delta itself changes as the stock moves | ATM call: delta rises from ≈ 0.53 to ≈ 0.59 on a $1 rise | Highest at the money near expiration — positions there swing fastest, in both directions |

> **Key idea:** An option is a bet on three things at once — direction (delta), timing (theta), and how much movement the market expects (vega). A stock is a bet on one. That is why options feel easy to win and are easy to lose.

---

## Implied volatility and IV rank

[Implied volatility (IV)](glossary.html#implied-volatility-iv) is the volatility number that makes an option's market price come out right — the market's consensus on how much the stock will move, expressed as an annualized percentage. High IV means expensive options; low IV, cheap ones.

Because "40% IV" means nothing in isolation — 40% is calm for a small biotech and wild for a utility — compare it with the stock's own history. **[IV rank](glossary.html#iv-rank--iv-percentile)** places today's IV within its 52-week range:

*ZEPH's IV ranged from 25% to 65% over the past year and is 40% today: IV rank = (40 − 25) ÷ (65 − 25) = **37.5**.* Options are middling-priced versus their own history. A high IV rank (above ~50) favours *selling* premium ([covered calls](glossary.html#covered-call), [cash-secured puts](glossary.html#cash-secured-put)); a low one favours *buying* it ([protective puts](glossary.html#protective-put--collar) are cheaper then).

### What IV means for a holder

Even if you never trade an option, IV gives you the market's own estimate of the range ahead. A one-standard-deviation expected move over a period is roughly:

**expected move ≈ stock price × IV × √(days ÷ 365)**

For ZEPH over 30 days: 50 × 0.40 × √(30 ÷ 365) = 50 × 0.40 × 0.287 ≈ **±$5.73**, or about **±11.5%**. Roughly two times in three, ZEPH should finish the month inside $44–$56 if the market is right; one time in three, outside. A stop 5% below the price is inside ordinary noise.

Around earnings the same idea becomes the [implied move](glossary.html#implied-move) from Lesson 12: ZEPH's at-the-money straddle for the expiration right after the print costs $3.00, so the market expects about **±6%** on the day — size, not direction. Front-month IV rises into the print and **collapses** the morning after (the "[IV crush](glossary.html#iv-crush)"), because the uncertainty has been resolved. An option with a vega of $0.07 whose IV drops 30 points overnight loses about 0.07 × 30 = **$2.10** with the stock unchanged — which is why buying calls before earnings can lose money on a correct "beat" call.

---

## Covered calls — income for a cap

A **covered call** is selling one call against every 100 shares you already own. You collect the premium now; in exchange you agree to sell your shares at the strike if the stock is above it at expiration (or earlier, if assigned). It converts some of your upside into cash today.

### A worked covered call on ZEPH (illustrative, rounded)

You own 100 ZEPH at $50 (bought long ago at $42). You sell one **$55 call** expiring in 45 days for **$1.10** — **$110** collected, 2.2% of the position. At expiration:

| ZEPH at expiration | Shares | Premium | Covered call result | Just holding |
|---|---|---|---|---|
| $45 | −$500 | +$110 | **−$390** | −$500 |
| $50 | $0 | +$110 | **+$110** | $0 |
| $55 | +$500 | +$110 | **+$610** | +$500 |
| $65 | +$500 (called away at $55) | +$110 | **+$610** | +$1,500 |

The premium cushions the downside by $1.10 (break-even $48.90) and pays you in a flat market, but the **maximum gain is fixed at $610**. If ZEPH jumps to $65 on a takeover rumour, you gave up $890 of upside for $110. Covered calls suit a stock you would be content to sell at the strike, ideally when IV rank is high; they are a poor fit for the compounder you never want to part with.

### Assignment, dividends, and the tax clock

- **Assignment can come early.** If ZEPH is above $55, the call holder can exercise at any time and your shares are gone at $55. Usually it happens at expiration; the common early case is the day before an **[ex-dividend date](glossary.html#ex-dividend-date)**.
- **The dividend trap.** ZEPH pays $0.10 a quarter. If ZEPH is at $57 the day before it goes ex-dividend and your $55 call has only $0.05 of time value left — less than the $0.10 dividend — the holder is better off exercising to collect the dividend. You lose the shares *and* the dividend. Rule: an in-the-money short call whose time value is below the coming dividend is at risk.
- **The tax clock.** Being called away is a sale: with a $42 basis, assignment at $55 realizes a $1,300 gain. Worse, writing a call that is deep in the money or very short-dated can fall outside the tax code's "qualified covered call" rules, and that can **suspend or even reset the holding period** on the shares — turning an expected long-term gain into a short-term one, or a [qualified dividend](glossary.html#qualified-dividend) into an ordinary one. The details are technical; check them in Lesson 11 and with `tax-lens` *before* writing calls on a position with a large unrealized gain.

---

## Cash-secured puts — a paid limit order

A **cash-secured put** is selling a put while holding enough cash to buy the shares if assigned. It is the options version of a [limit order](glossary.html#limit-order) below the market — except you are paid while you wait.

You would like to own ZEPH, but at $45, not $50. Instead of a $45 limit buy, you sell one **$45 put** expiring in 45 days for **$0.90** and set aside **$4,500** in cash.

| ZEPH at expiration | What happens | Result |
|---|---|---|
| $50 (or anywhere ≥ $45) | Put expires worthless | Keep **$90** — 2.0% on the $4,500 reserved, in 45 days |
| $40 | Assigned: you buy 100 at $45 | Effective cost 45 − 0.90 = **$44.10**; paper loss (40 − 44.10) × 100 = **−$410** — versus −$500 for a filled $45 limit buy |
| $60 | Put expires worthless | Keep $90 — but you own nothing of a 20% rally a plain buy at $50 would have caught |

Two conditions make it sensible: you genuinely want the stock at the strike (the thesis comes first), and the cash is really there — no margin. Its weakness is the mirror of the covered call: if the stock runs away, you collect a small premium and miss the move; if it collapses, you own it at $44.10 while it trades much lower.

---

## Protective puts and collars — what insurance costs

A **protective put** is buying a put on shares you own: a floor under the position, for a price.

You own 100 ZEPH at $50 ahead of a binary event. A **$45 put** expiring in 90 days costs about **$1.80** — **3.6% of the position for three months**. Your worst case at expiration is (50 − 45) + 1.80 = **$6.80 a share, $680** (13.6%), however far ZEPH falls. Roll that insurance every quarter and it costs about 4 × 1.80 ÷ 50 ≈ **14% a year** — more than the stock's likely return. Insurance is for a specific risk and a specific window, not a permanent state.

A **collar** pays for the put by selling a call. Add a **$57.50 call**, 90 days, for about **$1.50**: net cost 1.80 − 1.50 = **$0.30**.

| | Protective put alone | Collar ($45 put / $57.50 call) |
|---|---|---|
| Up-front cost | $1.80 ($180) | $0.30 ($30) |
| Worst case at expiration | (50 − 45) + 1.80 = **−$680** | (50 − 45) + 0.30 = **−$530** |
| Best case at expiration | Unlimited minus $180 | (57.50 − 50) − 0.30 = **+$720** |

The collar is cheap because you have sold your upside above $57.50. It is a reasonable tool for a concentrated position you cannot sell yet — a [lock-up](glossary.html#lock-up-expiry), a tax reason — and a poor one for a stock you expect to compound.

---

## Liquidity: the cost nobody quotes

On a busy stock, an option's [bid-ask spread](glossary.html#bid-ask-spread) may be a cent or two. On a thinly traded one it can be a large share of the premium. Suppose ZEPH's $55 call is quoted **$1.00 bid / $1.20 ask**: the midpoint is $1.10 and the spread is $0.20 — **18% of the premium**. Buy at the ask and sell at the bid and you have lost $20 per contract before the stock moves.

- **[Open interest](glossary.html#open-interest)** — the number of contracts outstanding at that strike — should be in the hundreds or more; a strike with open interest of 12 may have no real buyer when you need one.
- **Volume** on the day shows whether anyone is trading it now.
- Always use a **limit order** at or near the midpoint, never a market order, and prefer the monthly expirations and round strikes where liquidity concentrates.

---

## What not to do

- **Do not sell naked options.** A short put without the cash is leveraged ownership: sell ten ZEPH $45 puts on margin for "$900 of income", and if ZEPH gaps to $25 on an accounting scandal you owe (45 − 25 − 0.90) × 100 × 10 = **$19,100**. A short call without the shares has no ceiling at all: if a buyer bids $80 for ZEPH, one naked $55 call costs (80 − 55 − 1.10) × 100 = **$2,390** — and nothing stops the bid from being $100.
- **Do not buy lottery tickets.** A ZEPH $60 call expiring in 30 days costs about $0.15. To break even ZEPH must rise above **$60.15 — over 20% in a month** — when the market's one-standard-deviation move is ±11.5%. Its delta is about 0.06: the market gives it roughly a one-in-twenty chance of even finishing in the money. Buying twenty of them for $300 feels small and usually goes to zero.
- **Do not hold short options through earnings without a plan.** The realized move exceeds the implied move in a meaningful share of quarters (Lesson 12).
- **Do not buy calls before earnings expecting to profit from a beat.** IV crush can take more from the premium than the move adds.
- **Do not ignore assignment and the ex-dividend date** on any in-the-money short call.
- **Do not let options grow the position.** Count option exposure in shares (delta × 100 × contracts) against your position limits; a few calls can quietly double your exposure to one name.
- **Do not forget the [wash sale](glossary.html#wash-sale) rule.** Buying a call on a stock you just sold at a loss counts as a replacement purchase.

---

## Using options-analysis

`options-analysis` reads the options market for a ticker and recommends strategy setups. Four modes matter to a stockholder:

- **`--greeks`** — delta, theta, vega, and gamma at the money and at the key strikes, across near-term expirations.
- **`--iv`** — IV rank and percentile, term structure (is the front month inflated by an event?), skew, and IV versus realized volatility.
- **`--earnings`** — the implied move for the next print against the stock's historical reactions; pair it with `earnings-preview`.
- **`--strategy`** — setups for an outlook (for example `--strategy bullish`), each with max profit, max loss, break-even, and sizing; covered calls and cash-secured puts are favoured when IV rank is high.

Read any strategy it suggests against three questions before acting: *Would I be happy to buy (or sell) the stock at this strike? Is the risk defined and sized to my plan? Can I get in and out at a fair price?*

*In the plugin:* `options-analysis` handles the Greeks, IV, and strategy; `earnings-preview` gives the implied-vs-realized earnings move; `position-ladder` sets the share-count ceiling that option exposure counts against; `tax-lens` checks the holding-period and wash-sale effects; `thesis-tracker` decides whether you should own the stock at all.

---

## Related skills

```bash
/us-stock-analysis:options-analysis ZEPH --greeks          # delta, theta, vega, gamma by strike
/us-stock-analysis:options-analysis ZEPH --iv              # IV rank / percentile, term structure, skew
/us-stock-analysis:options-analysis ZEPH --earnings        # implied move vs. past reactions
/us-stock-analysis:options-analysis ZEPH --strategy bullish
/us-stock-analysis:earnings-preview ZEPH                   # the event the options are pricing
/us-stock-analysis:tax-lens ZEPH                           # holding period, wash sale, lots
```

Using another assistant? Paste `prompts/options-analysis.md` and ask the same question.

---

## Check yourself

1. ZEPH is at $50. A $45 call costs $5.90 and a $55 call costs $1.10. Split each premium into intrinsic and time value.
2. ZEPH is at $60 with IV of 30%. What is the rough one-standard-deviation expected move over the next 30 days?
3. You own 100 ZEPH at $50 and sell a $55 call for $1.10. ZEPH finishes at $70. What did you make, and what would plain holding have made?
4. You sell a $45 put for $0.90 with $4,500 set aside, and are assigned when ZEPH is at $41. What is your effective cost per share and your paper loss?
5. Your short $55 call is in the money with $0.04 of time value left, and ZEPH goes ex-dividend tomorrow with a $0.10 dividend. What is likely to happen, and why?

<details><summary>Answers</summary>

1. $45 call: intrinsic 50 − 45 = **$5.00**, time value **$0.90**. $55 call: intrinsic **$0** (it is out of the money), time value **$1.10** — all of it.
2. 60 × 0.30 × √(30 ÷ 365) = 60 × 0.30 × 0.287 ≈ **±$5.16**, about **±8.6%**. Size, not direction.
3. Called away at $55: (55 − 50) × 100 + $110 = **$610**. Plain holding: (70 − 50) × 100 = **$2,000**. The capped upside cost $1,390.
4. Effective cost 45 − 0.90 = **$44.10**; paper loss (41 − 44.10) × 100 = **−$310** — versus −$400 for a $45 limit buy that filled.
5. **Early assignment.** The call's remaining time value ($0.04) is less than the dividend ($0.10), so the holder gains by exercising today to own the shares before the ex-date. You lose the shares at $55 and do not receive the dividend.

</details>

---

## Key takeaways

- A call is the right to buy, a put the right to sell, 100 shares at the strike; every premium is **intrinsic value plus time value**, and time value goes to zero at expiration.
- **Delta** is the hedge ratio and a rough probability; **theta** is daily decay that accelerates near expiry; **vega** is sensitivity to IV; **gamma** is how fast delta changes.
- **IV** is the market's expected movement; **IV rank** says whether options are cheap or dear versus their own history; price × IV × √(days ÷ 365) turns it into an expected range — and IV collapses after earnings.
- **Covered calls** trade upside for income — expect assignment, watch ex-dividend dates, and check the holding-period rules before writing on a large gain.
- **Cash-secured puts** are a paid limit order on a stock you genuinely want, with the cash really there.
- **Protective puts** cost real money — often double-digit percent a year if rolled; a **collar** is cheaper because it sells your upside.
- Liquidity is a cost: check the spread and open interest and use limit orders.
- Never sell naked options, and treat cheap far-OTM calls as what they are — a near-certain small loss with a lottery tail.

---

> **Next / Related:** Previous lesson — [Macro & the Fed Cycle](learning-macro.html). You have finished Part II: head back to the [Learning hub](learning.html), or see the loop end in a deliberate *no* in [**Case Study: When the Answer Is No**](learning-case-pass.html). Then [Choose a Skill](choose-a-skill.html) to put it to work. See also [Concepts](concepts.html) and the [Glossary](glossary.html).

*Educational content only. Not financial advice.*
