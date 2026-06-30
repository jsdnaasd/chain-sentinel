# Chain Sentinel

Static Web3 wallet risk scanner demo with a deterministic client-side scoring model.

中文说明：这是一个静态 Web3 钱包风险扫描 demo。它不会连接真实链上数据，而是在前端用确定性的示例模型把钱包地址转成风险分数和可读 findings。

[Live demo](https://jsdnaasd.github.io/chain-sentinel/) · [Repository](https://github.com/jsdnaasd/chain-sentinel)

<p align="center">
  <img src="assets/hero-dashboard.png" alt="Chain Sentinel dashboard screenshot" width="100%" />
</p>

## What Is Implemented

- Address input form with a default Ethereum-style wallet address.
- Deterministic pseudo-analysis based on the input address.
- Four visible signal groups: contract exposure, asset concentration, bridge activity, and behavior drift.
- Weighted score calculation and risk verdict.
- Report panel with human-readable findings.
- Static GitHub Pages deployment with no backend.

中文：

- 钱包地址输入表单。
- 根据输入地址生成确定性的 demo 分析结果。
- 展示四类信号：合约暴露、资产集中度、跨链桥活动、行为漂移。
- 用加权分数生成风险等级。
- 输出可读的风险发现。
- 作为静态页面部署到 GitHub Pages。

## Product Screens

<p align="center">
  <img src="assets/risk-report.png" alt="Wallet risk report preview" width="100%" />
</p>

<p align="center">
  <img src="assets/monitoring-workspace.png" alt="On-chain monitoring workspace preview" width="100%" />
</p>

## Scoring Model

The scoring logic is in [`script.js`](script.js). It does not call an indexer or RPC endpoint yet.

```text
wallet address
  -> normalize input
  -> derive deterministic seed
  -> generate four demo signals
  -> weighted risk score
  -> verdict and findings
```

Current weights:

```text
risk_score =
  contract_exposure * 0.30 +
  concentration      * 0.24 +
  bridge_activity    * 0.20 +
  behavior_drift     * 0.26
```

Verdict thresholds:

```text
75-100  High Risk
55-74   Review Required
0-54    Low Risk
```

中文：当前模型是前端 demo 模型，不代表真实钱包风险。它的价值在于展示风险产品的界面结构、信号解释方式和后续接入真实数据的接口位置。

## Architecture

<p align="center">
  <img src="assets/architecture.svg" alt="Chain Sentinel architecture" width="100%" />
</p>

Production data sources that could be added later:

- EVM RPC or indexer APIs for transaction history.
- Token metadata and liquidity sources.
- Approval and allowance scanners.
- Scam address and contract risk lists.
- Bridge event indexers.
- ENS labels and address book context.

中文后续可接入：

- EVM RPC 或链上索引器。
- Token 元数据和流动性数据。
- 授权与 allowance 风险扫描。
- 欺诈地址、风险合约名单。
- 跨链桥事件索引。
- ENS 标签和地址簿上下文。

## Run Locally

```bash
git clone https://github.com/jsdnaasd/chain-sentinel.git
cd chain-sentinel
python3 -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## Verification

Manual check:

- load the page
- submit the default wallet
- paste a different `0x...` address
- confirm the score, verdict, gauge, and findings update together

Static response check:

```bash
python3 -m http.server 5173
curl -I http://localhost:5173
```

中文：目前没有自动化测试。这个项目是静态前端 demo，验证重点是页面能打开、输入变化能触发报告更新、风险分数和 findings 保持一致。

## Known Limitations

- No real chain data ingestion yet.
- No wallet signature, auth, or backend storage.
- No RPC, Etherscan, Alchemy, Covalent, or The Graph integration.
- No real approval scanner.
- No address reputation database.
- The current score is useful only for UI and workflow demonstration.

中文限制：

- 还没有真实链上数据。
- 没有钱包签名、登录或后端存储。
- 没有接入 RPC 或第三方索引器。
- 没有真实授权扫描。
- 没有地址信誉库。
- 当前分数只能用于界面和流程演示，不能作为真实安全结论。

## Roadmap

- Add real EVM transaction ingestion.
- Add token approval risk checks.
- Add known contract labels and ENS context.
- Add address reputation import.
- Add exportable wallet risk report.
- Add source-grounded summary generation after real data exists.

中文下一步：

- 接入真实 EVM 交易数据。
- 增加 token 授权风险检查。
- 加入合约标签和 ENS 上下文。
- 导入地址信誉数据。
- 支持导出钱包风险报告。
- 在真实数据基础上生成带来源的摘要。

## Disclaimer

This project is an interface and workflow demo. It is not financial advice, investment advice, or a definitive security scanner.

中文：本项目只是界面和工作流 demo，不构成投资建议、金融建议或确定性的安全结论。
