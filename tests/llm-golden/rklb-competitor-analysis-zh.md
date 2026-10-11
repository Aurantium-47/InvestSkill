# Rocket Lab（RKLB）競爭護城河分析

```
Data & Sources
  As of:      財報數字：2025-12-31（FY2025 10-K）與 2026-06-30（10-Q）· 股價：2026-10-09 收盤 · 網路資料：截至 2026-10-11
  Source:     ① SEC EDGAR 10-K FY2025（accession 0001819994-26-000013，申報日 2026-02-26），XBRL companyfacts
              ② SEC EDGAR 10-Q 2026-06-30（accession 0001819994-26-000062，申報日 2026-08-10）
              ③ NASDAQ 收盤價 $68.21（2026-10-09），股數 598 M（10-Q 封面，2026-08-05）
              ④ 網路：同業財報、52 週區間、做空比率、Form 4、法說會逐字稿、發射次數（逐項附日期，見文末 References）
  Retrieval:  ①②③ 由使用者提供（data/fixtures/RKLB.md、data/filings/RKLB/…10-Q.txt）· ④ 網路檢索
  Confidence: 申報數字 HIGH · 同業與市場數據 MEDIUM（彙整網站數字彼此有出入）· 標示「記憶」的項目 LOW
```

> **我自己算的數字（以申報資料推算，非公司揭露）**
> - 市值 = $68.21 × 598 M ≈ **$40.8 B**
> - 現金加有價證券約 $2.36 B（10-Q：現金 $2.1 B，有價證券 $258.1 M），可轉債 $13.4 M → **EV ≈ $38.4 B**
> - TTM 營收 = FY25 $602 M − 1H25 $267.1 M + 1H26 $434.4 M = **$769.3 M**
> - **EV / TTM 營收 ≈ 50x**

---

## 一、執行摘要

1. Rocket Lab 有**窄護城河（Narrow Moat），而且正在變寬**。主要來源是 Electron 小型火箭的成本與飛行紀錄、垂直整合的衛星零組件，以及已建立的美國政府客戶關係。Neutron 還沒首飛，Iridium 也還沒完成收購，這兩項都不能算進護城河。
2. 競爭地位明顯在進步：
   - 2026 Q2 營收年增 62%
   - 在手訂單 $2.36 B，半年內增加 27.5%
   - 每次發射的營收從 $7.9 M 升到 $9.1 M，成本從 $5.0 M 降到 $4.4 M
   - 毛利率從 FY24 的 26.6% 升到 1H26 的 37.1%
3. 問題在價格：約 50 倍 EV/營收，已經先把「寬護城河加上 Neutron 成功」計入股價；同業只有 2 到 8 倍營收。結論是 **NEUTRAL / HOLD**。

---

## 二、護城河辨識

| 護城河來源 | 是否具備 | 證據（附來源） |
|---|---|---|
| **成本優勢** | ✅ 中等 | 2026 Q2 每次發射營收 $9.1 M、成本 $4.4 M，發射毛利約 52%；1H26 為 $9.2 M / $4.9 M（10-Q）。自有發射場、3D 列印電動渦輪泵引擎、碳纖維箭體（10-Q Overview）。 |
| **無形資產**（飛行紀錄、政府資格） | ✅ 中等 | 截至 2026-06-30 共 87 次成功任務、送 250 多顆衛星入軌；2025 年發射次數全球第二（10-Q）。2026 年 7 月拿到美國太空軍兩份合約：$266 M 次軌道發射、$397 M SB-AMTI Flatellite 衛星（10-Q Recent Developments）。 |
| **轉換成本** | ⚠️ 部分 | 衛星零組件（反應輪、星追蹤器、太陽能板、光通訊）有太空驗證紀錄，客戶更換供應商要重新驗證。Beck 在 Q2 法說會稱零組件是「big moat」（Yahoo Finance 法說會摘要，2026-08）。 |
| **網路效應** | ❌ 無 | 發射與衛星製造屬專案型業務，沒有網路效應。若 Iridium 收購完成，會帶進 66 顆衛星星系與超過 250 萬用戶（Q2 法說會，Motley Fool 2026-08-17）。 |
| **有效規模** | ⚠️ 弱 | 小型專屬發射市場不大，對手陸續退出或延後：Stoke 延到 2027（Yahoo/Insider Monkey 2026-10-06）；Firefly Alpha 2026 年只發射 3 次（Firefly Q2，2026-08-11）。 |

- **寬度：窄護城河**，預估可維持約 10 到 15 年。
- **趨勢：變寬中**，理由有三：
  - 收購一路補齊垂直整合：Sinclair、PSC、SolAero、ASI、GEOST、Mynaric、Motiv
  - 拿到第一批政府 GEO 衛星合約，超過 $160 M
  - 每次發射單價上升
- **必須說清楚的限制：**
  - ROIC 仍為負：FY25 營業虧損 −$229 M，TTM 約 −$224 M
  - 依照框架，ROIC 長期高於 WACC 才算確認的護城河，目前做不到。這是「營收面」的護城河，還不是「報酬率面」的護城河。

---

## 三、波特五力分析

| 力量 | 分數（1–5，5 = 對公司最有利） | 評估 |
|---|---|---|
| 產業內競爭 | **2** | SpaceX 2025 年發射 165 次 Falcon 9（Space.com），規模壓倒性。2026-06 上市，目前市值約 $2.2 T（Investing.com/TradingView，2026-10-11）。衛星製造端的對手有 Firefly、Redwire、Intuitive Machines、York，以及大型國防承包商。 |
| 新進入者威脅 | **3** | 資本門檻高、失敗率高，新進者多半延誤（Stoke 延到 2027，Neutron 本身也延誤）。但 SpaceX IPO 募了約 $75 B（CNBC 2026-06-12），資金充足的對手確實存在。 |
| 供應商議價力 | **3** | 垂直整合降低對外依賴。但 MDA 17 顆衛星平台合約因供應鏈延誤可能被求償違約金（10-Q Note 3），代表仍受關鍵供應商牽制。 |
| 買方議價力 | **2** | 單一政府客戶占 1H26 營收 **42%**，MDA 占應收帳款 11%（10-Q Note 3）。合約通常允許客戶付費後終止（10-Q Backlog）。 |
| 替代品威脅 | **3** | Falcon 9 共乘（Transporter）是 Electron 最主要的替代品，但報導指 SpaceX 2028 年後不再賣新的 Falcon 9 共乘（Yahoo/Insider Monkey 2026-10-06）。中長期還要面對 Starship 的大幅降價。 |
| **產業吸引力** | **2.6 / 5** | 一般產業，偏不利：頭部高度集中、政府買方強勢、資本密集。 |

---

## 四、市占率分析

- **發射次數：**
  - Electron 2024 年 16 次、2025 年 21 次、1H26 12 次，2026 全年約 24 次（10-Q）
  - Falcon 9 2025 年 165 次（Space.com）
  - 全球 2025 年約 321 到 329 次（McDowell，彙整來源）
  - 推算 Electron 約占全球發射次數 **6 到 7%**，SpaceX 約 **51%**
- **集中度：** 依發射次數估算，全球 HHI 超過 2,600，屬於**高度集中**。依營收計算的市占無法取得。
- **小型專屬發射這個利基：** Electron 實際上是主導者，排第二的 Firefly Alpha 2026 年只排 3 次。
- **Space Systems：**
  - 1H26 營收 $326.2 M，年增 76%，成長來自衛星製造與收購（10-Q）
  - 占總營收 75%，Rocket Lab 實質上已是**以衛星為主的公司**
- **市占成長方式：** 自然成長與併購並行。2026-06-30 的在手訂單中，Space Systems $1,415.8 M、Launch $940.2 M；10-Q 明說部分增量來自收購。

---

## 五、同業比較

| 指標 | **RKLB** | Firefly（FLY） | Redwire（RDW） | Intuitive Machines（LUNR） | SpaceX（SPCX） |
|---|---|---|---|---|---|
| Q2'26 營收 | $234.1 M | $117.7 M | $117.1 M | $206.2 M | n/a |
| Q2 營收年增 | +62% | +659%（低基期） | +89.6% | 約 +310% | n/a |
| 毛利率 | 36.1%（Q2 GAAP） / 37.2%（TTM） | n/a | 27.8%（Q2） | n/a | n/a |
| 營業利益率 | −24.6%（Q2） / −29.1%（TTM） | n/a | n/a | n/a | n/a |
| 淨利率 | −21.1%（Q2） | −78.4%（Q2） | n/a | n/a | n/a |
| ROIC / ROE | 負值（FY25 ROE 約 −19%） | 負值 | 負值 | n/a | n/a |
| 研發占營收 | 40.6%（TTM） | n/a | n/a | n/a | n/a |
| 在手訂單 | **$2.36 B** | $1.5 B | $542 M | $1.8 B | n/a |
| 2026 營收指引 / 估計 | 約 $949 M¹ | $420–450 M | $450–500 M | $900 M–1.0 B | n/a |
| 訂單 / 2026 營收 | 2.5x | 3.4x | 1.1x | 1.9x | n/a |
| 市值（約 2026-10-09） | **$40.8 B** | $3.3–3.5 B | $2.4–2.6 B | $2.1–3.1 B | 約 $2.2 T |
| 市值 / 2026 營收 | **約 43x** | 約 8x | 約 5x | 約 2–3x | n/a |

¹ 計算方式：1H26 實際 $434.4 M ＋ Q3 指引中值 $257.5 M（Q2 法說會）＋ Q4 假設與 Q3 持平。**這是我的假設，公司沒有給全年指引。**

**解讀：**
- RKLB 的強項：毛利率在同業中最高，虧損率最低，在手訂單絕對值最大。
- 營收面最接近的是 LUNR，2026 年營收指引相近，但 RKLB 市值是它的 13 到 19 倍。
- 市場付的溢價主要買的是三件事：Neutron 的選擇權、長期上看「下一個 SpaceX」，以及發射加衛星的垂直整合。
- 員工人均營收、NPS、留存率：資料中都沒有揭露，標示 n/a。

---

## 六、創新與顛覆評估

**Rocket Lab 是顛覆者，不是被顛覆者。** Electron 已證明可以高頻發射，還有回收第一級、邁向重複使用的可能（10-Q）。

**Neutron 是最大的不確定性：**
- 時程一再延誤：2024 → 2025 → 2026 年底，現在可能延到 2027（Spaceflight Now 2026-08-10）
- 2026 年 1 月第一級燃料箱在靜水壓測試中破裂（Spaceflight Now 2026-08-10）
- 10-Q 原文：「the window for an end-of-year launch date is narrowing」
- 正面因素：Archimedes 引擎已完成 400 多次熱試車（Q2 法說會）；至少 7 次 Neutron 商業發射已簽約到 2029（Yahoo/Insider Monkey 2026-10-06）；$397 M 的 Flatellite 合約指定用 Neutron 發射

**Iridium 收購（2026-06-28 簽約，預計 2027 年完成）：**
- **條件：** 每股 $27 現金加股票，股票部分有換股上下限。RKLB 10 日均價 ≤ $67.50 時換股比例為 0.4000，≥ $112.50 時為 0.2400；企業價值約 **$8.0 B**；需要超過 $3.0 B 現金，另需約 $1.8 B 再融資；已取得 $3.6 B 過橋貸款承諾（10-Q Note 1、MD&A）。
- **對護城河的影響：** 帶進 L 頻段頻譜與 FCC 執照（監管型無形資產）、約 $870 M 年營收（Q2 法說會），以及經常性服務收入。這是唯一可能讓公司跨進「寬護城河」的資產。
- **代價：**
  - 現價 $68.21 只略高於 $67.50 的下限，股價再跌就以 0.4000 換股，稀釋增加
  - 從淨現金約 $2.3 B 轉為明顯的淨負債
  - 需要 FCC、HSR，以及智利、法國、西班牙、瑞士、阿聯酋等多國核准（10-Q Item 1A）

**AI 或平台轉移風險：** 最大的平台轉移是 Starship。若它把每公斤發射成本壓到很低，Electron 的定價優勢會被侵蝕。

---

## 七、定價能力

- **每次發射營收：** 1H 從 $7.5 M 升到 $9.2 M（+23%）；同期每次成本從 $5.3 M 降到 $4.9 M（−8%）（10-Q）。公司說原因是客戶組合與任務複雜度，不完全是漲價。不過發射次數同時增加（10 次升到 12 次）、價格沒有被壓低，算是**溢價能力的證據**。
- **毛利率趨勢：** FY24 26.6% → FY25 34.4% → 1H26 37.1%（GAAP，10-K / 10-Q）。營收成長的同時毛利率擴張，代表有定價能力或規模效益。
- **Q3 指引非 GAAP 毛利率 35 到 37%**，低於 Q2 的 41.5%（Q2 含一次性關稅退款，法說會）。毛利改善不是直線上升。
- **反面證據：** MDA 合約可能被求償違約金；Space Systems 多為固定價格合約，成本超支要由公司吸收（10-Q）。

---

## 八、管理層在競爭環境中的表現

| 面向 | 評價 |
|---|---|
| 資本配置 | 1H26 透過 ATM 募資淨額 **$1,512.9 M**（10-Q 現金流量表），稀釋股本換取打仗用的資金。稀釋後股數 FY25 531 M → 2026-08 598 M（+12.6%）。併購以垂直整合為主，整合紀錄大致順利，但 Iridium 的規模遠超過以往任何一筆。 |
| 策略一致性 | 「端到端太空公司」的策略自 2020 年起很一致，Iridium 是延伸。Beck：「the large space companies of the future are going to have the ability to launch their own satellites…on their own rocket」（Q2 法說會，Yahoo 摘要 2026-08）。 |
| 執行與承諾的落差 | **Neutron 一再延期是扣分項**；Electron 發射頻率與營收則達成或超越指引。 |
| 內部人交易 | CFO Adam Spice 2026-09-02 依 10b5-1 計畫賣出約 14 萬股，均價約 $62.63（insidertrades.com 2026-09-05）；2026 年 1 月賣出約 137 萬股，均價約 $75.50（MarketBeat）。CEO Beck 也有零星 10b5-1 出售。**全為預先排定的計畫賣出，沒有公開市場買進。**數字來自彙整網站，應以 EDGAR Form 4 原件核對。 |

---

## 九、護城河綜合評分

| 項目 | 權重 | 分數（0–10） | 說明 |
|---|---|---|---|
| 護城河來源強度 | 25% | 6 | 兩個中等來源：成本優勢、飛行紀錄與政府資格；轉換成本只有部分 |
| 護城河持久度 | 20% | 5 | 約 10 年可見度；Starship 與 Neutron 都是未知數 |
| 競爭地位 | 20% | 7 | 明顯在搶占份額：營收 +62%、訂單 $2.36 B、新政府合約 |
| 產業吸引力 | 15% | 5.2 | 五力 2.6 × 2 |
| 定價能力 | 10% | 7 | 每次發射單價 +23%、毛利率連續擴張 |
| 創新定位 | 10% | 7 | 顛覆者，但 Neutron 執行風險高 |
| **綜合分數** | 100% | **6.1 / 10** | **窄護城河（區間下緣），趨勢變寬** |

計算：6×0.25 + 5×0.20 + 7×0.20 + 5.2×0.15 + 7×0.10 + 7×0.10 = 1.50 + 1.00 + 1.40 + 0.78 + 0.70 + 0.70 = **6.08**

---

## 十、投資意涵

- **估值：** 依框架，窄護城河只值得「適度溢價」。實際上 RKLB 的市值是 2026 年營收的約 43 倍，同業只有 2 到 8 倍，股價隱含的是**寬護城河加上 Neutron 成功加上 Iridium 順利整合**三件事同時成立。
- **股價位置：** 52 週區間 $37.57 到 $151.00，現價 $68.21，距高點約 −55%（Investing.com / Motley Fool，2026-10-09～10）。大幅修正後，估值仍然很高。
- **做空比率：** 2026-06-30 交割日為流通股的 7.41%，回補天數約 1.3 天（Benzinga）；另一來源稱 2026-08-31 為 7.6%（Yahoo/Insider Monkey 2026-10-06）。屬中等，不構成軋空條件。
- **選擇權鏈：** 本次未取用，護城河分析不需要。如需隱含波動率，請另跑 `options-analysis`。

**多方論點（競爭面）：**
- Neutron 在 2026 Q4 到 2027 上半年成功首飛，切入 SpaceX 退出共乘後留下的中型發射市場
- Iridium 帶來頻譜與經常性收入，讓 Rocket Lab 成為唯一能「自己造、自己發射、自己營運」的上市小型太空公司
- 管理層說 Neutron 首飛成功後的下一季，調整後 EBITDA 將轉正（Q2 法說會）

**空方論點（競爭面）：**
- Neutron 再延期到 2027 下半年以後
- Starship 大幅降低每公斤發射成本
- 單一政府客戶占營收 42%，議價力在買方
- Iridium 收購帶來債務加稀釋的雙重壓力
- 估值沒有任何安全邊際

---

## 論點失效條件

**若訊號轉為 BULLISH，以下任一條件成立即失效：**
- 資金充足的對手進入核心市場（例如 SpaceX 推出小型專屬發射或延長共乘），或失去占營收 15% 以上的關鍵客戶
- Neutron 首飛失敗，或首飛延到 2027-06-30 以後
- 單季毛利率跌破 30%（GAAP），或在手訂單較前一季減少超過 10%

**若訊號轉為 BEARISH，以下任一條件成立即失效：**
- 宣布可擴大護城河的收購（例如 Iridium 順利以低於預期的稀釋完成），或主要競爭對手破產或退出
- Neutron 成功入軌，且 2027 年排定 5 次以上發射
- TTM 營業利益率轉正，或自由現金流轉正

**以下情況發生時，請重跑本分析：**
- [ ] 下一次財報（2026 Q3，約 2026 年 11 月）
- [ ] 股價偏離 $68.21 達 ±15%（低於 $58 或高於 $78）
- [ ] 已過 60 天（2026-12-10）
- [ ] 重大事件（Neutron 首飛、Iridium 監管核准或破局、管理層異動）

╔══════════════════════════════════════════════╗
║              INVESTMENT SIGNAL               ║
╠══════════════════════════════════════════════╣
║ Signal:      NEUTRAL                         ║
║ Confidence:  MEDIUM                          ║
║ Horizon:     LONG-TERM                       ║
║ Score:       5.6 / 10                        ║
╠══════════════════════════════════════════════╣
║ Action:      HOLD                            ║
║ Conviction:  MODERATE                        ║
╚══════════════════════════════════════════════╝

Score Guide: 8.0–10.0 Strongly Bullish | 6.0–7.9 Moderately Bullish | 4.0–5.9 Neutral | 2.0–3.9 Moderately Bearish | 0.0–1.9 Strongly Bearish
Confidence: HIGH (strong data, clear signals) | MEDIUM (mixed signals) | LOW (limited data, conflicting signals)
Horizon: SHORT-TERM (1 week–3 months) | MEDIUM-TERM (3 months–1 year) | LONG-TERM (1+ years)

分數對應說明：護城河綜合分數 6.1（窄護城河、變寬中）只衡量競爭地位。訊號分數下修到 5.6，原因有三：約 43 倍營收的估值已提前反映寬護城河；Neutron 首飛是二元風險；Iridium 收購會帶來槓桿與稀釋。所以結論是 NEUTRAL / HOLD，不是 BULLISH。信心度為 MEDIUM，因為同業毛利率與 ROIC 多數無法取得，且市場數據來自彼此有出入的彙整網站。

**Disclaimer:** Educational analysis only. Not financial advice.

---

### References

**使用者提供的申報資料**
1. RKLB 10-K FY2025，申報日 2026-02-26：https://www.sec.gov/Archives/edgar/data/1819994/000181999426000013/0001819994-26-000013-index.htm（data/fixtures/RKLB.md）
2. RKLB 10-Q 2026-06-30，申報日 2026-08-10：https://www.sec.gov/Archives/edgar/data/1819994/000181999426000062/rklb-20260630.htm（data/filings/RKLB/RKLB_2026-06-30_10-Q.txt）

**股價、市值與做空**
3. [Investing.com — RKLB 報價，2026-10-09](https://www.investing.com/equities/vector-acquisition)
4. [Motley Fool — Firefly vs Rocket Lab，2026-10-10](https://fool.com/coverage/better-buy/2026/10/10/firefly-aerospace-vs-rocket-lab-which-industrials-stock-is-a-better-buy-in-2026)
5. [Benzinga — RKLB 做空比率（2026-06-30 交割）](https://kr.benzinga.com/quote/RKLB/short-interest)
6. [Yahoo Finance / Insider Monkey — Falcon 9 共乘退出、做空 7.6%，2026-10-06](https://finance.yahoo.com/markets/stocks/articles/rocket-lab-capitalize-falcon-9-114141160.html)

**法說會**
7. [Motley Fool — RKLB Q2 2026 法說會逐字稿，2026-08-17](https://www.fool.com/earnings/call-transcripts/2026/08/17/rocket-lab-rklb-q2-2026-earnings-call-transcript/)
8. [Yahoo Finance — RKLB Q2 2026 法說會重點，2026-08](https://finance.yahoo.com/markets/stocks/articles/rocket-lab-corp-rklb-q2-050032558.html)

**Neutron 進度與發射次數**
9. [Spaceflight Now — Neutron 首飛窗口收窄，2026-08-10](https://spaceflightnow.com/2026/08/10/window-for-2026-launch-debut-of-rocket-labs-neutron-rocket-is-narrowing-as-development-continues/)
10. [Space.com — SpaceX 2025 年發射 165 次](https://space.com/space-exploration/private-spaceflight/spacex-shatters-its-rocket-launch-record-yet-again-167-orbital-flights-in-2025)

**同業**
11. [Firefly Q2 2026 新聞稿，2026-08-11](https://investors.fireflyspace.com/news-releases/news-release-details/firefly-aerospace-announces-second-quarter-2026-financial)
12. [Redwire Q2 2026 新聞稿，2026-08](https://ir.rdw.com/news-events/press-releases/detail/240/redwire-corporation-reports-second-quarter-2026-financial)
13. [Intuitive Machines Q2 2026 新聞稿，2026-08-13](https://www.globenewswire.com/news-release/2026/08/13/3344411/0/en/intuitive-machines-reports-second-quarter-2026-financial-results-continues-record-backlog-expansion-with-quarter-end-backlog-of-1-8-billion.html)
14. 同業股價與市值（約 2026-10-08～09）：[heygotrade FLY](https://www.heygotrade.com/en/us-stock/fly/)、[heygotrade RDW](https://www.heygotrade.com/en/us-stock/rdw/)、[Yahoo LUNR](https://finance.yahoo.com/quote/LUNR/)
15. [CNBC — SpaceX IPO，2026-06-12](https://www.cnbc.com/2026/06/12/spacex-ipo-spcx-live-updates.html)；[Investing.com — SPCX，2026-10-11](https://www.investing.com/equities/spacex)

**內部人交易**
16. [InsiderTrades — CFO Form 4 出售，2026-09-05](https://www.insidertrades.com/alerts/nasdaq-rklb-insider-buying-and-selling-2026-09-05/)