# 投資速查表

> 一頁印出來、放在螢幕旁：如何解讀訊號區塊與 Data & Sources 標頭、真正重要的指標及其概略的好／壞區間、交易前檢查表、哪個問題該用哪個技能，以及警訊。所有區間都是經驗法則，不是定律——產業與成長階段永遠是關鍵。完整定義見[術語表](glossary-zh-tw.html)，每一項背後的道理見[學習中心](learning-zh-tw.html)的各課。

---

## 1 · 訊號區塊解碼

每一份分析都以同一個方塊作結；每一行都是*不同的軸*（[概念 → 訊號區塊解剖](concepts-zh-tw.html#訊號區塊解剖)）。

| 欄位 | 回答什麼 | *不是*什麼 |
|------|---------|-----------|
| **Signal（訊號）**——BULLISH / NEUTRAL / BEARISH | 證據指向哪個方向 | 不是價格目標 |
| **Confidence（信心）**——HIGH / MEDIUM / LOW | 背後資料有多完整、乾淨 | 不是有多看多；看空的判斷也可以高度有信心 |
| **Horizon（時間框架）**——SHORT / MEDIUM / LONG-TERM | 論點在多長期間內兌現 | 不是不論如何都要持有的時間 |
| **Score（分數）**——0–10 | 對上述的單一綜合判讀 | 不是機率 |
| **Action（行動）**——BUY / HOLD / SELL | 訊號隱含的決策 | 不是建議——是要壓力測試的預設值 |
| **Conviction（信念強度）**——STRONG / MODERATE / WEAK | 分析對該行動有多堅定 | 不等於信心：資料乾淨但安全邊際太薄，信念仍弱 |

```
Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)
```

分數區間：8.0–10.0 強烈看多 · 6.0–7.9 溫和看多 · 4.0–5.9 中性 · 2.0–3.9 溫和看空 · 0.0–1.9 強烈看空。信心：HIGH（資料強、訊號清楚）· MEDIUM（訊號混雜）· LOW（資料有限、訊號衝突）。時間框架：短期（1 週–3 個月）· 中期（3 個月–1 年）· 長期（1 年以上）。

**一致性檢查：**
- 分數與訊號必須相符：分數 ≥ 6.0 為 BULLISH，4.0–5.9 為 NEUTRAL，低於 4.0 為 BEARISH。例外是 `fact-check`，它的分數是查核分數（Verification Score）。
- 把方塊當成一句話來讀：「在【時間框架】內，證據呈現【訊號】，信心為【信心】（【分數】），隱含以【信念強度】信念採取【行動】。」這句話自相矛盾，分析本身也就自相矛盾。
- 高分數搭配 LOW 信心，代表題材看似不錯但證據薄弱——行動前要更深入挖掘。

---

## 2 · Data & Sources 標頭

每份產出最前面的標頭，說明數字從哪裡來（[資料與準確性](data-and-accuracy-zh-tw.html#資料與來源標頭data--sources)）。

```
Data & Sources
  As of:      2026-07-02
  Source:     SEC EDGAR 10-K（FY2025）· 公司 IR · FRED
  Retrieval:  使用者貼上   （或：網路／工具檢索 · 模型記憶）
  Confidence: HIGH — 第一手、最新
```

| 欄位 | 要檢查什麼 |
|------|-----------|
| **As of** | 數字所代表的日期；過時的資料應被標示 |
| **Source** | 第一手文件：申報文件、公司 IR、FRED、交易所資料 |
| **Retrieval** | *使用者貼上*（最可靠）→ *網路／工具檢索*（需驗證）→ *模型記憶*（最不可靠，只是佔位符） |
| **Confidence** | HIGH（第一手、最新）· MEDIUM（混合／次級）· LOW（記憶或資料缺漏） |

**規則：** Retrieval 為「模型記憶」時，Confidence 必須是 LOW。來源不一致時，優先採用第一手來源、其次是最新日期者；兩個數值都列出，絕不取平均。

---

## 3 · 真正重要的指標

### 獲利能力與品質

| 指標 | 公式 | 好 | 壞／留意 |
|------|------|----|---------|
| [毛利率](glossary-zh-tw.html#gross-margin) | `(營收 − COGS) ÷ 營收` | 高且穩定或上升（訂價能力） | 持續下滑（競爭） |
| [營業利益率](learning-statements-zh-tw.html#三種利潤率) | `EBIT ÷ 營收` | 數年來穩定或上升 | 侵蝕中；與毛利率差距大代表管銷沉重 |
| [自由現金流 FCF](glossary-zh-tw.html#fcf-free-cash-flow) | `營業現金流 − 資本支出` | 持續為正且成長，≈ 或 > 淨利 | 為負又沒有成長故事，或與利潤分歧 |
| [ROIC](glossary-zh-tw.html#roic-return-on-invested-capital) | `NOPAT ÷ 投入資本` | > 15% 優異 · 10–15% 良好 | 低於 WACC＝在毀滅價值 |
| [ROE](glossary-zh-tw.html#roe-return-on-equity) | `淨利 ÷ 股東權益` | > 15% 強 · 10–15% 尚可 | < 10% 弱；ROE 高而 ROA 低＝靠負債撐 |
| [Piotroski F 分數](glossary-zh-tw.html#piotroski-f-score) | 9 項通過／不通過檢核 | 7–9 強 | 4–6 中等 · 0–3 弱 |

### 資產負債表

| 指標 | 公式 | 好 | 壞／留意 |
|------|------|----|---------|
| [負債權益比](glossary-zh-tw.html#debt-to-equity-de) | `總負債 ÷ 股東權益` | < 1.0 保守 | 1.0–2.0 中等 · > 2.0 高槓桿（銀行、公用事業本就偏高） |
| [淨負債 / EBITDA](learning-quality-zh-tw.html#資產負債表健康度) | `(負債 − 現金) ÷ EBITDA` | 低於約 2 倍舒適 | 高於約 4 倍緊繃 |
| [利息保障倍數](glossary-zh-tw.html#interest-coverage-ratio) | `EBIT ÷ 利息費用` | > 5 倍安全 | 2–5 倍尚可 · < 1.5 倍危險 |
| [流動比率](glossary-zh-tw.html#current-ratio) | `流動資產 ÷ 流動負債` | > 1.5 充裕 | 1.0–1.5 尚可 · < 1.0 可能吃緊 |
| [Altman Z 分數](glossary-zh-tw.html#altman-z-score) | 五項加權比率 | > 3.0 安全 | 1.8–3.0 灰色地帶 · < 1.8 財務困境 |

### 估值與收益

| 指標 | 公式 | 好 | 壞／留意 |
|------|------|----|---------|
| [P/E](glossary-zh-tw.html#pe-price-to-earnings) | `股價 ÷ EPS` | 沒有放諸四海皆準的水準；與自身歷史和同業比 | 虧損公司無用；會被一次性項目扭曲 |
| [PEG](glossary-zh-tw.html#peg-ratio) | `P/E ÷ 盈餘成長率（%）` | < 1.0 可能便宜 · ~1.0 合理 | > 2.0 偏貴；成長預估很脆弱 |
| [EV/EBITDA](glossary-zh-tw.html#evebitda) | `(市值 + 負債 − 現金) ÷ EBITDA` | < 10 倍常屬便宜 · 10–15 倍合理 | > 15 倍偏貴（依產業）；忽略資本支出 |
| [P/S](glossary-zh-tw.html#ps-price-to-sales) | `市值 ÷ 營收` | 適用於早期、未獲利公司，與同業比 | 沒有獲利的營收可能一文不值 |
| [FCF 殖利率](glossary-zh-tw.html#fcf-yield) | `FCF ÷ 市值` | > 5% 具吸引力 · 3–5% 合理 | < 3% 偏貴；資本支出起伏會扭曲單一年度 |
| [股利發放率](glossary-zh-tw.html#dividend-payout-ratio) | `股利 ÷ 淨利` | < 60% 可持續 | 60–80% 留意 · > 100% 發得比賺得多 |
| [股息殖利率](glossary-zh-tw.html#dividend-yield) | `年度股利 ÷ 股價` | 有 FCF 支撐 | > 約 7% 常是市場已預期減息（[殖利率陷阱](glossary-zh-tw.html#yield-trap)） |
| [安全邊際](glossary-zh-tw.html#margin-of-safety) | `(價值 − 股價) ÷ 價值` | 穩定型約 20% · 中等約 30% · 難預測 40% 以上 | 零或負值＝等待，不買 |

### 市場、投資組合與基金

| 指標 | 公式 | 好 | 壞／留意 |
|------|------|----|---------|
| [Beta](glossary-zh-tw.html#beta-β) | 相對市場的波動 | 1＝與市場同步；衡量風險大小，不是成績 | 高 beta 同時放大獲利*與*虧損 |
| [夏普比率](glossary-zh-tw.html#sharpe-ratio) | `(報酬 − 無風險利率) ÷ 波動度` | > 1 良好 · > 2 很好 | < 1 偏弱 |
| [最大回撤](glossary-zh-tw.html#drawdown--max-drawdown) | 從高點到低點的最大跌幅 | 持有之前就要知道 | 跌 50% 需要漲 100% 才能回本 |
| [相關性](glossary-zh-tw.html#correlation) | −1 到 +1 | 核心持股間 < 0.5 | > 0.8＝同一個賭注押兩次；崩盤時相關性趨近 1 |
| [RSI](learning-market-zh-tw.html#動能震盪指標rsi-與-macd) | 0–100 的動能指標 | 30–70 屬正常 | > 70 超買 · < 30 超賣（是警示旗，不是交易指令） |
| [回補天數](glossary-zh-tw.html#days-to-cover-short-interest-ratio)／[放空比例](glossary-zh-tw.html#short-float-short-interest-) | `放空股數 ÷ 平均日成交量`／`÷ 流通股數` | — | > 5 天值得注意、> 10 天高 · 放空比例 > 10% 偏高、> 20% 擁擠 |
| [費用率](glossary-zh-tw.html#expense-ratio) | `年度基金成本 ÷ 平均資產` | 寬基指數 ≤ 0.10% | 特殊主題 0.20–0.50% · > 0.75% 需要理由 |

---

## 4 · 交易前檢查表

整理自[第 6 課](learning-portfolio-zh-tw.html#一份簡單的交易前檢查表)、[第 7 課](learning-playbook-zh-tw.html#步驟-8--交易計畫寫下來)與[第 13 課](learning-psychology-zh-tw.html#兩份檢查表)。每一格都勾了才下單。

- [ ] **論點**已寫成一段話：必須發生什麼、市場為何錯、為何是現在
- [ ] **品質：**ROIC 高於 WACC、利潤率穩定、資產負債表健全
- [ ] **報表：**FCF 撐得起利潤；下方的警訊沒有一項是無法解釋的
- [ ] **估值：**有熊市／基準／牛市的合理價值區間，安全邊際依不確定性調整
- [ ] **市場：**已知道趨勢、籌碼佈局，以及下一個催化事件或財報日
- [ ] **3–5 個附門檻的 KPI**，以及會讓你出場的**失效觸發條件**
- [ ] 讀過**空方觀點**，能說出最讓你擔心的論點
- [ ] **事前驗屍**已寫好：「現在是 12 個月後，這筆部位虧了 40%，因為……」
- [ ] **部位大小**在你的上限內（單一名稱常見 5–10%，投機性部位更小），並知道 −30% 與 −50% 時的金額損失
- [ ] **交易計畫**已寫下：起始買進、加碼價位、減碼價位、時間框架；依論點賣出，而非依報價
- [ ] **Data & Sources** 已檢查：as-of 日期是最新的、來自第一手來源，沒有未經驗證的「模型記憶」數字
- [ ] 下的是**限價**單，而且是明天你仍願意付的價格
- [ ] **日誌條目**在下單*之前*就寫好草稿

**情緒交易檢查。** 以下任一項成立就停下來：這檔股票今天波動超過 10%，而那就是你來這裡的原因 · 今天已經看價格超過三次 · 正根據過去一小時內的頭條行動 · 想「回到成本」或「不想錯過」 · 說不出哪一個觸發條件被觸發了 · 正要對論點 WEAKENED 或 BROKEN 的部位加碼。若有兩項以上成立：等 24 小時，再重跑一次檢查表。

| 賣出的**規則** | 不是規則（只是感覺） |
|---------------|--------------------|
| 論點被打破：某個 KPI 越過門檻或觸發條件成立 | 「已經跌了 20%」·「已經漲了 40%」 |
| 遠超過連牛市情境都不及的價值，而基本面未變 | 「我抱膩了」 |
| 資金有明顯更好的去處 | 「有一則嚇人的頭條」 |
| 部位成長到超過上限 | 「大家都在賣」 |
| 這筆錢原本的目標到了，需要用錢 | |

---

## 5 · 哪個問題用哪個技能

| 問題 | 技能 | 接著 |
|------|------|------|
| 這檔值得一看嗎？ | `stock-eval` | `result-validator` |
| 它值多少？ | `stock-valuation` | `bear-case` |
| 財報有沒有藏東西？ | `financial-report-analyst` | `forensic-accounting` |
| 它還得起債嗎？ | `credit-check` | — |
| 護城河是真的嗎？ | `competitor-analysis` | `industry-map` |
| 股利安全嗎？ | `dividend-analysis` | `portfolio-review` |
| 反對它最強的論點是什麼？ | `bear-case` | `stock-eval` |
| 這兩三檔該選哪一檔？ | `compare` | — |
| 何時進場或出場？ | `technical-analysis` | `chart-master` |
| 財報前價格已經反映了什麼？ | `earnings-preview` | `earnings-call-analysis` |
| 聰明錢往哪裡去？ | `institutional-ownership` | `insider-trading` |
| 這檔 ETF 好不好？ | `etf-analysis` | `portfolio-review` |
| 部位該怎麼建？ | `position-ladder` | `thesis-tracker` |
| 我的論點還成立嗎？ | `thesis-tracker --update` | `bear-case` |
| 我的投組最多可能虧多少？ | `risk-stress-test` | `portfolio-review` |
| 這筆交易要繳多少稅？ | `tax-lens` | — |
| 報告裡的數字是真的嗎？ | `fact-check` | `result-validator` |
| 這份產出是什麼意思？ | `learning-coach` | — |

完整對照見[選擇技能](choose-a-skill-zh-tw.html)。

---

## 6 · 警訊

| 警訊 | 可能代表什麼 | 課程 |
|------|-------------|------|
| 營收上升、**FCF 縮水** | 成長沒有轉化為現金 | [2](learning-statements-zh-tw.html#常見警訊) |
| **應收帳款成長快過銷售** | 收到現金前就認列銷售，或客戶付不出錢 | [2](learning-statements-zh-tw.html#常見警訊) |
| **存貨堆積**而銷售未跟上 | 產品賣不動；可能要認列跌價損失 | [2](learning-statements-zh-tw.html#常見警訊) |
| 利潤靠**一次性項目**撐起 | 這樣的獲利不會重複 | [2](learning-statements-zh-tw.html#常見警訊) |
| 獲利持平卻**負債暴增**；利息保障倍數 < 2 倍 | 脆弱度上升，利息侵蝕未來利潤 | [3](learning-quality-zh-tw.html#資產負債表健康度) |
| **ROIC 朝 WACC 滑落**、利潤率侵蝕 | 不論經營團隊怎麼說，護城河都在變窄 | [3](learning-quality-zh-tw.html#從數字驗證護城河而非從行銷話術) |
| **在高於內在價值時買回庫藏股**；連續併購 | 資本配置正在摧毀價值 | [3](learning-quality-zh-tw.html#資本配置) |
| **股利發放率 > 100%** 或殖利率 > 約 7% | 市場可能已預期減息 | [術語表](glossary-zh-tw.html#yield-trap) |
| DCF 結論**因 WACC 小幅變動就翻轉**；終值佔答案的大部分 | 估計很脆弱，要當成區間看 | [4](learning-valuation-zh-tw.html#dcf-是你的假設所組成的模型不是事實) |
| 槓桿型、反向型或 ETN 結構；AUM < $100M；追蹤差距超過費用 | 不適合長期持有 | [10](learning-etfs-zh-tw.html#長期持有者應避開的結構) |
| 「模型記憶」卻標 HIGH 信心；沒有 as-of 日期；分數與訊號不符 | 驗證之前別信這份產出 | [資料](data-and-accuracy-zh-tw.html#辨識幻覺數字) |
| 對 WEAKENED 或 BROKEN 的論點加碼；說不出觸發條件 | 這是一筆情緒交易 | [13](learning-psychology-zh-tw.html#我是不是正要做一筆情緒交易) |

---

> **下一步／相關：** 回到[學習中心](learning-zh-tw.html)看每一行背後的課程 · 每個指標的定義見[術語表](glossary-zh-tw.html) · 心智模型見[概念](concepts-zh-tw.html) · 要動手分析，見[選擇技能](choose-a-skill-zh-tw.html)。

*僅為教育內容，並非財務建議。區間皆為經驗法則。*
