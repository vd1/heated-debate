# Context Snapshot — RFC Draft v0.4 Review

## Document 1: RFC Draft v0.4 (Primary Document Under Review)

---
title: '[RFC] A Morpho-compatible DeFi Collateral Asset Risk Framework - Phase 1'

---

# [RFC] A Morpho compatible DeFi Collateral Asset Risk Framework - Phase 1
*v0.5 — April 2026*
 
## Abstract
 
### The Problem: Four illusions at the heart of onchain lending
 
Morpho's isolated market architecture is a genuine advance: each market is a standalone unit, and a default in one market does not mechanically drain another. But this architectural compartmentalisation has created a false sense of independence among lenders and borrowers alike. The DeFi Integration Graph (DIG) and Yield Tree Decomposition (YTD), two tools we have built and are running on live blockchain states reveal a **quadruple root of illusion** that persists across lending platforms, including Morpho:
 
**1. The collateral independence illusion:** markets that appear isolated share hidden dependencies through their collateral assets. A vault may lend on market M₁: siUSD/USDC, where the collateral siUSD, a staked form of vault token contains wsrUSD (itself another staked form of vault token from Reservoir) in its yield tree decomposition. A depeg of wsrUSD propagates upward through the YTD and depegs siUSD; the default probability of M₁ therefore depends on the default probability of a market it has no direct contractual link to. Isolated markets are not independent markets when their collateral assets share recursive roots.
 
**2. The TVL illusion:** headline TVL figures count the same capital multiple times as it flows through layers of wrapping, vaulting, and re-depositing. A single dollar of USDC deposited into a vault, lent against collateral that is itself a vault token backed by the same USDC, inflates reported TVL at every layer. The aggregate number suggests depth and diversification that do not exist. The DIG traces capital through these recursive loops and reports the actual terminal exposure at each leaf.
 
**3. The diversification illusion:** a vault allocating across five Morpho markets appears diversified. But if 85% of the underlying collateral across those markets resolves to two BTC custodians (Coinbase and BitGo) through the YTD, the vault holds a concentrated BTC custody bet dressed up as a multi-market strategy. Diversification measured at the market level can vanish entirely when measured at the terminal asset level.
 
**4. The (non-)leverage illusion:** a passive depositor in a vault may believe their exposure is unleveraged. But if another user loops through the same vault, depositing the vault token as collateral to borrow the underlying, redepositing, and repeating, the passive depositor's capital is silently leveraged by the looper's activity. The increased risk is not visible at the investment surface. These dark loops are detectable from onchain state but are not surfaced by any existing interface.
 
These four illusions are not edge cases. They are structural features of composable DeFi that affect the majority of Morpho vaults by TVL today. Our tooling exists to make them visible.
 
### What we have built
 
Here is what our tooling produces today on a live Morpho collateral asset.
 
**wsrUSD — Yield Tree (live output, April 2026)**
 
```
Wrapped Savings rUSD (wsrUSD) [4626] | rate: 1.074463
└── rUSD [Reservoir]
    ├── steakUSDC (Morpho) [V1] — $20M   ← 96%+ of backing
    │   ├── cbBTC/USDC (86% LLTV) — $109M (52.8%) @ 1.89% APY
    │   ├── WBTC/USDC  (86% LLTV) — $68M  (33.0%) @ 1.89% APY
    │   ├── wstETH/USDC(86% LLTV) — $29M  (14.2%) @ 1.89% APY
    │   └── WETH/USDC  (86% LLTV) — ~$0   (~0%)   @ 1.89% APY
    ├── [PSM] PSM-USDC — $500K
    ├── steakRUSD — $53K
    └── smokeUSDT [V1] — $2
        └── wsrUSD/USDT (94% LLTV) — $39.5M (99.6%) @ 3.37% APY
            ├── [collateral] wsrUSD    ← circular: wsrUSD backs itself
            └── [borrow] USDT
            ...
```
 
What this surfaces immediately: 85.8% BTC concentration across two custodians (Coinbase, BitGo); 86% LLTV with a 14% buffer before liquidation cascades; 4–5 layers of recursive smart contract risk; a reflexivity loop where wsrUSD collateralises its own backing vault at 94% LLTV; and a base APY of ~1.89% that is inadequate compensation for this structural complexity.
 
This output was produced by our **DeFi Integration Graph (DIG)** and **Yield Tree Decomposition (YTD)**, two operational tools running on live blockchain state. The full decomposition is in the Evidence Appendix.
 
**This is an observability layer Morpho currently lacks. This RFC proposes to deliver it as a public good.**
 
### What this RFC asks for
 
This grant funds a **reproducible disclosure infrastructure** for Morpho collateral assets: a public registry of structural decompositions, a continuous diff stream tracking onchain mutations, standardised nutrition labels for every covered vault, and a manifest template that any curator can adopt. The scope is the top 30 Morpho vaults by TVL (snapshot taken at Month 1), plus all recursive dependencies representing ≥5% of any covered vault's backing.
 
We are not building a risk authority. We are not producing safe/unsafe verdicts, aggregate grades, or composite risk scores. We are building a **disclosure layer**: structured, reproducible, machine-readable facts about what a collateral asset actually is, what it depends on, and how those dependencies change over time. Categorical badges (e.g., `circular dependency detected`, `single-EOA minting role`,`hardcoded oracle`) flag structural features; they do not grade or rank.
 
The claim is modest and verifiable: **if these disclosures had existed before the major collateral failures of 2025–2026, the onchain signals behind each failure would have been visible, labelled, and trackable in advance**.
 
## The Morpho curationship model and its structural gap
 
Morpho has redefined lending protocol design by separating infrastructure from risk management. Anyone can spin up an ERC-4626 vault, define collateral exposure, set supply caps, choose oracles, and offer curated lending strategies to depositors. The protocol provides the rails; the curator provides the judgment.
 
The model's appeal is real. But its rapid expansion has exposed a structural gap: **the rigor of collateral risk assessment varies enormously across curators, and depositors have consistently lacked the tools to evaluate it**.
 
This gap is not a matter of opinion. Independent research published in April 2026 by Luca Prosperi (*Physics of On-Chain Lending*) documented 20–100x mispricing of collateral risk across major DeFi lending markets. Risk analytics firm Chaos Labs, in its post-mortem of the Resolv/USR exploit, documented the same structural failure: hardcoded oracles, unchecked minting roles, and leverage loops that were all readable from public blockchain state before any damage occurred. The problem is architectural, not incidental, and it recurs because no shared framework exists to read the onchain signals systematically.
 
### A growing pattern of confidence failures
 
Two recent episodes made curator collateral risk impossible to ignore:
 
- **November 2025, Stream Finance / xUSD:** Curators routed USDC deposits into recursive leverage loops backed by the synthetic stablecoin xUSD, leaving an estimated $285M–$700M at risk across multiple lending protocols when its oracle refused to update. **Our tooling is designed to detect recursive leverage loop structures and oracle staleness**.
- **March 2026, Resolv / USR Exploit:** An attacker exploited a flaw in Resolv's USR minting contract, creating approximately 80 million unbacked tokens from roughly $200,000 in USDC. The oracle was hardcoded and never repriced: wstUSR was marked at $1.13 while trading at $0.63 on secondary markets. Fifteen Morpho vaults were impacted. Chaos Labs founder Omer Goldberg documented the mechanism in real time. **Our tooling is designed to detect privileged single-EOA minting roles with no mint limits and hardcoded feeds with no deviation circuit breaker**.

A full onchain signal analysis for each incident is provided in the Evidence Appendix.
 
### Motivation
 
These incidents share a common thread: they were not fundamentally unpredictable. The risks were present onchain before each failure, in oracle configurations, minting mechanics, governance structures, liquidity depth, and backing ratios. What was missing was **a systematic framework to read those signals and make them visible to curators and depositors before something breaks**.
 
This RFC proposes to build that framework: a modular, open-source disclosure infrastructure for Morpho collateral assets, delivered as a public good and community-verified. Its goals are concrete:
 
- **Continuity:** disclosures update from live onchain data, not from periodic manual reviews.
- **Comparability:** structural features are labelled consistently across asset types using categorical badges, not aggregate grades.
- **Auditability:** every output is traceable to a specific onchain read and a documented methodology.
- **Reproducibility:** any third party can verify any disclosure from the same blockchain state.

## Prior Art: Credora by RedStone
 
Credora (acquired by RedStone in September 2025) introduced consensus-based risk ratings on Morpho in March 2025 and deserves credit for establishing that collateral risk transparency belongs in the protocol interface. Our work operates at a different layer: rather than producing periodic, curator-opt-in ratings, **we produce a continuous, fully onchain-derivable disclosure infrastructure that updates from live blockchain state and is available for any asset, any vault, without opt-in**. The two approaches are complementary; ours does not replace Credora's ratings but fills structural gaps recursive dependency unwrapping, governance mutation tracking, real-time oracle monitoring, and machine-readable decompositions that point-in-time ratings cannot address by design.
 
## What this grant delivers
 
### The data intelligence layer
 
What we are building is a **data intelligence layer** for Morpho collateral assets, infrastructure that continuously reads, decomposes, and discloses the structural reality of onchain collateral. It has four concrete outputs:
 
**1. The collateral registry:** a public, machine-readable registry covering every collateral asset in the top 30 Morpho vaults (by TVL, snapshot at Month 1), plus all recursive dependencies representing ≥5% of any covered vault's backing. Each registry entry contains a full DIG dependency graph, a recursive YTD yield tree, terminal asset exposure, and categorical badges for structural features (circularity, single-EOA roles, hardcoded oracles, leverage loops, concentrated custody).
 
**2. The diff stream:** a continuous onchain monitoring feed that tracks mutations to registered assets: oracle configuration changes, governance role transfers, timelock modifications, supply velocity anomalies, new leverage loop formation, and liquidity deterioration. The diff stream turns static decompositions into a live surveillance layer. Alerts fire on specific structural events, not on aggregate score thresholds.
 
**3. Nutrition labels:** a standardised, human-readable summary for each covered vault, a one-page disclosure document that answers: what does this collateral actually depend on? How deep is the wrapping? Where is the concentration? What governance controls exist? What oracle architecture is in use? Nutrition labels use categorical badges only (e.g., "4+ recursive layers", "85%+ single-asset concentration", "no timelock on admin role"), no aggregate grade, no safe/unsafe language.
 
**4. The Manifest template:** an open-source template that any Morpho curator can adopt to produce standardised structural disclosures for their own vaults, regardless of whether Sigma Labs covers them. The manifest template is designed to be self-serve: a curator fills in the structural fields, and the template generates a nutrition label. The goal is to make disclosure the default, not the exception.
 
### Delivery Schedule
 
All deliverables are public, free, and community-verifiable from day one.
 
| Deliverable | Target |
|---|---|
| DIG + YTD live on top 30 Morpho vaults by TVL (Month-1 snapshot), open-sourced | Months 1–2 |
| Oracle staleness, governance mutation, and leverage-loop alert system (diff stream) | Months 3–4 |
| Dashboard v1: per-vault dependency graphs, yield trees, nutrition labels | Month 5-6 |
| Manifest template published for curator self-serve disclosure | Month 5-6 |
 
### What is built today
 
Sigma Labs has built and validated two operational tools currently running on live onchain data.
 
The **Dependency Graph Engine (DIG)** monitors 7+ protocol integrations and maps the full onchain relationship graph of any EVM asset, including wrappers, LP positions, Pendle PT/YT structures, lending markets, and pledge relationships, producing structured JSON output and visual dependency trees. **Live outputs cover assets with 500+ nodes in their dependency graph**.
 
The **Yield Tree Decomposition (YTD)** translates the dependency graph into a recursive breakdown of yield sources, collateral allocation, LLTV exposure, and concentration risk at every layer of a composed asset. The wsrUSD output in the Abstract and the reUSD graph below are direct outputs of these tools running on live blockchain state, not illustrations or mock-ups.
 
### First results
 
**Dependency Graph: reUSD**
 
The graph below illustrates the recursive dependency unwrapping engine applied to reUSD (Re Protocol), tracing every wrapper, LP position, Pendle market, and Morpho lending market from the top-level asset down to individual collateral markets.
 
![reUSD_neigh](https://hackmd.io/_uploads/rkw5Eug2We.png)
 
**Deep Risk Decomposition: wsrUSD (Reservoir)**
 
wsrUSD is 96%+ a wrapper around steakUSDC, itself a Morpho vault with 85.8% BTC concentration at 86% LLTV, 4–5 layers of recursive smart contract risk, a circular reflexivity loop via smokeUSDT, and a base APY of ~1.89% inadequate for this structural complexity. The full yield tree and findings are provided in the Evidence Appendix.
 
### Morpho Coverage
 
This grant covers the top 30 Morpho vaults by TVL (snapshot taken at Month 1), including all major collateral types: wrapped BTC variants (cbBTC, WBTC), LSTs (wstETH, weETH, rsETH), synthetic stablecoins (USDe, sUSDe, USD0), and RWA-backed assets. Each vault entry includes a dependency graph, a full recursive yield tree, categorical badges, a nutrition label, and an alert configuration. All recursive dependencies representing ≥5% of any covered vault's backing are traced to their terminal assets.
 
## Proposed Budget
 
**Total Grant Request: $110,000 in $MORPHO tokens**
 
*All amounts denominated in USD equivalent, paid in $MORPHO tokens at the 7-day TWAP price on the disbursement date.*
 
| Category | Description | Amount |
|---|---|---|
| Infrastructure & Data | RPC nodes, archive access, cryo data pipeline, WebSocket monitoring | $25,000 |
| DIG / YTD Engineering | Protocol watchers, JSON output, dependency graph engine, yield tree engine | $30,000 |
| Dashboard & Alerts | Dashboard v1, nutrition labels, oracle/governance/leverage-loop alert system | $25,000 |
| Curator Trials | Integration with 2 named Morpho curator teams, feedback cycles | $10,000 |
| Operations & Legal | Entity costs, legal review, open-source licensing | $10,000 |
| Contingency | | $10,000 |
| **Total** | | **$120,000** |
 
 
 
## Team: Sigma Labs
 
Sigma Labs is a French quantitative research team, combining academic backgrounds from **École Polytechnique**, **École Normale Supérieure (ENS)**, **Université Paris Dauphine–PSL** and **ESILV** with hands-on experience co-founding and operating DeFi protocols. The live DIG/YTD outputs in this RFC are our primary proof of work.
 
**Vincent Danos:** École Polytechnique alumnus, co-founder of DeFi protocols and Research Director at CNRS.
 
**Amaury Denny:** Paris Dauphine–PSL, Quantitative Finance & Technology; 42 School Paris. Former VC research at KuCoin Labs, co-founder of a crypto family office with $20M+ AuM.
 
**Hamza E.:** ENS alumnus, PhD in Financial Markets, co-founder of DeFi protocols and quant prop shops.
 
**Daniel J.:** ESILV alumnus, co-founder of a liquid fund, treasury manager and investor.
 
## Sustainability and exit clause
 
This framework is designed to outlast its initial grant. All code, models, and outputs will be fully open-sourced under the [MIT License](https://opensource.org/license/mit) upon delivery, with the GitHub repository public and forkable by any community member, curator, or independent researcher from Month 1 onward.
 
If milestones are not delivered by Month 6, the community retains full ownership of all outputs produced to date. If Sigma Labs ceases operations or is unable to continue at any point during the project, all data pipelines, specifications, and documentation will be transferred to a community-designated maintainer. No single entity, including Sigma Labs, should be a point of failure for disclosure infrastructure that the Morpho ecosystem depends on.
 
## What Comes Next
 
This RFC covers a six-month disclosure infrastructure build. We have further plans: a quantitative risk translation layer that takes the structural decompositions produced here and translates them into calibrated, cross-asset comparable risk signals, factor scores, effective volatility estimates, and contextual default probabilities conditioned on specific Morpho market structures. The mathematical foundation for this layer is documented in our [DeFi Collateral Asset Risk Model — Mathematical Reference v3.0](https://docsend.com/v/63dkk/defi-collat-asset-risk-model). Whether and when to propose this as a follow-on grant will depend on the evidence produced by this Phase 1 delivery, and will be submitted as a separate RFC for community evaluation on its own merits.
 
## Next steps
 
The feedback window is three weeks from the date of this post. We welcome input from **curators**, **depositors**, **risk researchers**, and the broader Morpho community on scope, milestone structure, and budget before the vote is called.
 
To engage: comment directly on this thread or reach out at [research@sigmalabs.fi](mailto:research@sigmalabs.fi). Once rough consensus is reached, this proposal will be submitted for onchain vote.
 
## Considerations
 
All code will be fully open-sourced upon delivery under the MIT License. The GitHub repository will be public and accessible to the entire community, including dependency graph engines, yield tree decomposition scripts, alert pipelines, dashboard code, and manifest templates. Every output will be traceable to a specific onchain read and a documented methodology. Community members, independent researchers, and third-party auditors are explicitly encouraged to verify, challenge, and build on top of the framework.
 
This RFC is accompanied by an **Evidence Appendix** containing the claim register, the wsrUSD decomposition, and the retroactive case studies against xUSD and Resolv/USR.
 
---
 
# Evidence Appendix
 
## E1. Claim Register
 
| Component | Status | Evidence |
|---|---|---|
| Dependency Graph Engine (DIG) | **Built** | 7+ protocol watchers, live outputs (reUSD, wsrUSD, cUSD: 500+ nodes) |
| Yield Tree Decomposition (YTD) | **Built** | Structured JSON + visual trees (wsrUSD, reUSD, Sentora PYUSD) |
| Recursive structural decomposition | **Built** | wsrUSD analysis: 6 findings, scorecard, circular exposure identified |
| Oracle / governance / leverage-loop alert system | Phase 1 deliverable | Not yet built; Month 3 target |
| Dashboard v1 + nutrition labels | Phase 1 deliverable | Not yet built; Month 5 target |
| Manifest template | Phase 1 deliverable | Not yet built; Month 6 target |

 
## E2. wsrUSD Decomposition
 
*[Screenshot to be inserted]*
 
*[Link to Sigma Labs analysis: to be provided]*
 
## E3. Retroactive Case Study
 
The following analysis documents what was visible onchain before two major Morpho incidents. The purpose is not to claim predictive certainty but to demonstrate that the structural signals behind each failure were present and readable from public blockchain state before the damage occurred. **Our tooling is designed to detect each of these signal categories systematically**.
 
### Case 1: Stream Finance / xUSD (November 2025)
 
**What happened:** curators routed USDC deposits into recursive leverage loops backed by xUSD. When xUSD's oracle refused to update, an estimated $285M–$700M was left at risk across Morpho, Euler, and Silo. Curators who had publicly claimed zero exposure were found to hold significant positions when the protocol collapsed.
 
**What was visible onchain before the incident:**
 
*Leverage loop structure (YTD):* the recursive loop, **USDC deposits → xUSD collateral → USDC borrow → repeat**, was fully visible from Morpho market interactions and supply/borrow balances at each layer, with leverage ratios reportedly reaching 10x. The YTD is designed to detect and flag this structure.
 
*Oracle staleness risk:* xUSD's oracle depended on offchain infrastructure with a documented maximum staleness window readable from the oracle contract's heartbeat parameter. Under stress, the oracle's failure to reprice was a documented design characteristic, not a surprise.
 
*Supply velocity and redemption queue:* xUSD's `totalSupply` growth rate in the weeks before the collapse was abnormally high relative to its backing. The 65-day redemption queue was readable from the protocol contract and created a structural mismatch with 10x leverage positions.
 
| Signal | Category | Detectable |
|---|---|---|
| Recursive leverage loop structure | Leverage loop / YTD | ✅ |
| Oracle staleness heartbeat window | Oracle configuration | ✅ |
| Abnormal supply velocity | Counterparty / issuance | ✅ |
| 65-day redemption queue | Counterparty / liquidity | ✅ |
 
### Case 2: Resolv / USR Exploit (March 22, 2026)
 
**What happened:** an attacker exploited a flaw in Resolv's USR minting contract, minting 80 million unbacked USR tokens from approximately $200,000 in USDC and extracting roughly $25 million in ETH. The wstUSR oracle was hardcoded and never repriced: wstUSR was marked at $1.13 while trading at $0.63 on secondary markets. Fifteen Morpho vaults were impacted. Some curators' automated systems continued supplying liquidity into compromised markets hours after the exploit began.
 
**What was visible onchain before the incident:**
 
*Privileged minting role:* The USR minting function was controlled by a single EOA with no mint limits, no oracle checks, and no multisig requirement. A single private key held uncapped minting authority over a stablecoin integrated into $500M+ of DeFi lending, readable from the contract's access control storage slots.
 
*Hardcoded oracle:* The wstUSR:USDC oracle was hardcoded with no secondary market reference and no circuit breaker. Once USR depegged, the oracle continued reporting stale prices while the asset traded at a steep discount, exactly the mechanism that enabled the collateral arbitrage.
 
*Leverage loop and contract age:* Resolv's TVL grew from under $50M to over $650M in under three months, driven by leveraged looping on Morpho and Euler. The minting contract had high TVL relative to its age.
 
| Signal | Category | Detectable |
|---|---|---|
| Single EOA minting role, no mint limits | Governance / access control | ✅ |
| Hardcoded oracle, no deviation circuit breaker | Oracle configuration | ✅ |
| Recursive leverage loop, reflexive dependency | Leverage loop / YTD | ✅ |
| High TVL, low contract age | Smart contract maturity | ✅ |
 
### Summary
 
Across both incidents, the structural signals were present onchain before the damage occurred. None required inside information, offchain intelligence, or predictive modelling to detect. They required systematic reading of publicly available blockchain state, exactly what this disclosure framework is designed to provide.
 
| Incident | Primary signals | Categories |
|---|---|---|
| Stream / xUSD (Nov 2025) | Leverage loop, oracle staleness, 65-day redemption queue | Leverage, Oracle, Counterparty |
| Resolv / USR (Mar 2026) | Single EOA minter, hardcoded oracle, leverage loop, low contract age | Governance, Oracle, Leverage, Maturity |
 

## Document 2: v0.3 Debate Review (what this draft was supposed to address)

# Debate — 2026-04-23 12:39

| | |
|---|---|
| **Agent A** (architect) | `claude-opus-4-6` · session `cf9c3b6c` |
| **Agent B** (reviewer) | `gpt-5.4` · session `3bc29420` |
| **Rounds** | 5 |
| **Timeout** | 420000ms |
| **Debug stderr** | `debates/rfc-draft-v03-review/20260423_123907.md.stderr.log` |
| **Convergence** | disrupt @ 0.55 |

<details><summary><strong>Topic</strong></summary>

Review draft v0.3 of the RFC "A Morpho-compatible DeFi Collateral Asset Risk Framework" for submission to Morpho governance. This draft incorporates feedback from the v0.1 review (see summary-20260408_100040.md in ../rfc-draft-v01-review/) — notably the phased/tranched structure, the Credora positioning fix, the sustainability model with exit clause, and the "designed to detect" reframing. Evaluate: (1) whether v0.3 successfully resolves the issues flagged in the v0.1 review, (2) new gaps or regressions introduced since v0.1, (3) strength of the phased structure and tranche-gate credibility, (4) whether overclaims remain after the reframing, (5) budget and milestone realism, (6) team presentation, (7) Credora positioning, (8) sustainability model and exit clause, (9) clarity of the public-good framing. Context includes the full v0.3 draft, the Chaos Labs/Aave departure, LlamaRisk's response, Prosperi's lending risk article, LucaB's curation economics thread, the sustainability section draft, and meeting feedback notes.

</details>

**Context:** debates/rfc-draft-v03-review/context-snapshot.md

---

## Round 1/5 — Wild (5/5)

### Agent A · `claude-opus-4-6` · 148s

# RFC v0.3 Review — Proposing Side Analysis

## Overall Assessment

**v0.3 is a dramatically stronger document than v0.1.** The phased structure, the Credora repositioning, the claim register, the "designed to detect" reframing, and the sustainability model all landed. This is now a credible governance proposal. But it has three structural problems that could sink it, and several calibration issues that weaken it unnecessarily.

---

## (1) Resolution of v0.1 Issues — Mostly Successful

**Resolved well:**
- ✅ Phased/tranched structure with a real gate between Phase 1 and Phase 2
- ✅ Credora repositioned as "complementary, different architectural layer" — no longer picking a fight
- ✅ "Designed to detect" reframing in all three case studies — no longer claiming predictive certainty
- ✅ Claim Register (E1) is honest and granular — clearly separates "built" from "Phase 1 deliverable" from "Phase 2 deliverable"
- ✅ Technical model moved to appendix per meeting feedback
- ✅ Budget line items are specific and defensible

**Partially resolved:**
- ⚠️ The Abstract still leads with the wsrUSD output, which is strong, but then immediately pivots to a 3-paragraph essay on Morpho's curation model before returning to the problem statement. The "grab them by the collar" effect of the yield tree is diluted by the architectural throat-clearing that follows.
- ⚠️ Team section is improved but still thin on relevant track record (see §6 below)

**Not resolved:**
- ❌ No Letters of Interest from curators — this was flagged in meeting feedback as critical. The RFC mentions "2 named Morpho curator trials" as a Month 5 deliverable but doesn't name them or cite any expressions of interest. For a governance vote, this is a credibility gap.

---

## (2) New Gaps and Regressions Since v0.1

**Three genuine problems introduced:**

### Problem A: The Prosperi Paradox
Prosperi's article documents 20–100x mispricing of collateral risk in DeFi lending markets. The RFC cites this as validation. But it also undermines the entire sustainability model: **if risk is 20–100x mispriced, and curators aren't currently paying for accurate risk data, why would they start?**

- The RFC assumes curators will pay $20K/yr for a risk feed because it helps them "avoid incidents." But the curators who ran USD0++, xUSD, and Resolv/USR positions *already knew* they were taking concentrated risks — they chose to do so because the yield justified the TVL-based revenue.
- Prosperi's framework implies the real buyer isn't the curator — it's the *depositor*. But depositors don't pay for subscriptions.
- **Proposal:** The RFC should explicitly address the Prosperi paradox — acknowledge that curators may be *rationally* underpricing risk because depositor ignorance is their business model, and argue that the tooling shifts the equilibrium by making risk *visible to depositors*, which in turn forces curators to compete on risk quality rather than yield alone. This is a much stronger pitch than "curators will pay to protect their depositors."

### Problem B: The Quantitative Ambition vs. Calibration Data Problem
The Layer 2 model is impressively specified — GJR-GARCH(1,1)-t with HMM regime-switching, Merton PD layer, Vasicek correlations. But:

- **DeFi collateral assets don't have enough history to calibrate these models reliably.** Most Morpho collateral tokens have <2 years of liquid trading history. GJR-GARCH needs hundreds of data points to estimate γ̂ (asymmetry) reliably. HMM needs multiple regime transitions to identify transition probabilities. The Vasicek correlation structure needs cross-sectional data across stress events that have only occurred 3 times in the dataset.
- The MAP estimation fallback for new tokens is acknowledged but undersold — in practice, *most* assets will be using the prior-dominated estimates, not converged MLE.
- **This isn't fatal**, but the RFC should be more explicit about the epistemic limits. The backtesting framework (T7) claims walk-forward validation, but against how many stress events? Three case studies is a basis for calibration sanity checks, not for statistical confidence in PD estimates.
- **Proposal:** Add a paragraph in the Technical Appendix titled "Known Limitations of Calibration in Thin-History Regimes" that honestly addresses this. The strength is the *framework's* generality, not any specific PD estimate's precision. Lean into "structured conservatism" — the model should be presented as a disciplined way to be *approximately right* rather than precisely wrong (which is what curators do today with gut feel).

### Problem C: The 12+12 Sustainability Cliff
The RFC promises 12 months of funded development + 12 months of maintenance. But:

- What happens at Month 25? The sustainability model requires 10+ curators at $20K avg to reach $200K ARR. But the paid product (block-by-block feeds, WebSocket, SLA) isn't delivered until Month 11–12, meaning the sales cycle doesn't start until Month 12 at earliest.
- Realistic enterprise sales cycle in DeFi: 2–4 months from first demo to signed subscription. So first revenue arrives Month 14–16 at the optimistic end.
- The maintenance commitment (12 months post-grant) is unfunded — the team is betting they can close enough subscriptions during months 12–24 to cover ongoing costs.
- **This is actually fine** if explicitly acknowledged — the grant buys the team enough runway to build the product and start the sales cycle, and the 12-month maintenance commitment is the team's skin in the game. But the RFC doesn't frame it this way. It presents sustainability as a solved problem when it's actually a bet.
- **Proposal:** Add a sentence: "The 12-month post-grant maintenance commitment is funded by Sigma Labs' own operations and any early subscription revenue. We accept the risk that if the paid product does not find market fit within this period, the public-good layer remains fully functional and community-owned."

---

## (3) Phased Structure and Tranche-Gate Credibility — Strong

This is one of v0.3's best features:

- **Single governance vote, two tranches** — politically efficient (one vote, not two)
- **Phase 2 gated on Phase 1 delivery** — real accountability
- **Phase 1 deliverables are concrete and verifiable** — "DIG + YTD live on top 30 Morpho vaults" is a binary check
- **60-day shadow mode** before any binding integration — shows restraint and confidence

**One weakness:** The "verified Phase 1 delivery" gate has no specified verifier. Who confirms that Phase 1 was delivered? A community checkpoint post is mentioned, but there's no quorum, no arbiter, no criteria beyond "the community is satisfied." 

- **Proposal:** Name a specific verification mechanism: "Phase 2 disbursement requires a community checkpoint post by Sigma Labs at Month 6, with a 14-day objection period. If no objection post with >10,000 MORPHO-weighted support is submitted during this period, Phase 2 proceeds automatically." This removes ambiguity without adding bureaucracy.

---

## (4) Overclaims After Reframing — Mostly Eliminated, Two Survivors

The "designed to detect" reframing works well across all three case studies. But two overclaims survive:

### Overclaim 1: "Observability layer Morpho currently lacks"
The Abstract states: "This is an observability layer Morpho currently lacks." But Credora/RedStone provides ratings on the Morpho interface, and curators like Steakhouse publish their own analysis. The claim should be: "This is a *structural decomposition and continuous monitoring* layer Morpho currently lacks." The distinction matters — Morpho has *some* observability, it just lacks *this kind* of observability.

### Overclaim 2: The retroactive case studies still overreach
The case study section says: "The structural risk signals were present onchain before the damage occurred. None required inside information, offchain intelligence, or predictive modelling to detect."

But the USD0++ case *did* require offchain intelligence to act on — the signal (hardcoded oracle, no timelock) only becomes actionable if you also believe that Usual Protocol would exercise its governance power adversely. Many protocols have admin keys without timelocks; most don't rug their users. The *onchain signal* identified risk capacity, not risk likelihood. The distinction between "this *could* happen" (true) and "this *would* happen" (unprovable) is elided.

- **Proposal:** Add a qualifier: "These signals identify structural *capacity* for failure — conditions under which a governance or market event could cascade into losses. They do not predict the triggering event itself. The framework's value is in identifying and quantifying these structural conditions continuously, so that curators can price them rather than ignore them."

---

## (5) Budget and Milestone Realism — Surprisingly Credible, One Red Flag

- $250K for 12 months of work by a 4-person team is $62.5K/person — below market rate for quant engineers, which signals genuine commitment (or naivety about burn rate)
- Budget breakdown is specific: $25K infrastructure, $40K DIG/YTD engineering, etc.
- Contingency is modest ($15K total, 6%) — standard for crypto grants
- $20K external methodology review is a strong signal of intellectual honesty

**Red flag:** The Phase 2 budget allocates $60K to "Quantitative Research" covering Z₁–Z₆ calibration, GJR-GARCH-t, HMM regime-switching, Merton PD layer, AND backtesting framework. This is an enormous scope of quantitative work. $60K buys ~3 months of a single quant. For calibrating a 6-factor model with regime-switching across 50+ assets, this is tight.

- **Proposal:** Either narrow the Phase 2 quantitative scope (e.g., deliver Z₁–Z₄ in Phase 2, Z₅–Z₆ in a follow-up), or acknowledge that team members are contributing time beyond what the grant covers. The latter is likely true and should be stated — "The grant covers direct costs; Sigma Labs contributes approximately X months of senior researcher time as in-kind contribution."

---

## (6) Team Presentation — Weakest Section

The team section lists credentials (École Polytechnique, ENS, Dauphine–PSL) but not *relevant accomplishments*. For a governance vote:

- "Co-founder of DeFi protocols" — which ones? What TVL? What outcomes?
- "Research Director at CNRS" — impressive but what has Vincent published on DeFi risk?
- "Co-founder of a crypto family office with $20M+ AuM" — who is the family office? Is it still operating?
- "Co-founder of a liquid fund, treasury manager and investor" — again, specifics matter

**The proof of work IS the DIG/YTD output**, and the RFC acknowledges this. But the team section reads like a CV, not like evidence. 

- **Proposal:** Replace the credential list with a 2-sentence summary per person focused on what they *did* that's relevant: "Amaury Denny built the quantitative risk model underlying this RFC and operates Ellen Capital, a [describe]. He previously led research at KuCoin Labs covering [X]. Daniel curates Morpho vaults managing $[X]M TVL and serves as treasury manager for [Y]." Specifics > credentials.

---

## (7) Credora Positioning — Well Handled

The v0.3 positioning is nearly optimal:
- "Credit for establishing that collateral risk transparency belongs in the protocol interface"
- "Different architectural layer"
- "Complementary; ours does not replace Credora's ratings"
- Detailed technical comparison deferred to appendix

This is diplomatic without being sycophantic and draws a clear technical distinction. **No changes needed.**

---

## (8) Sustainability Model and Exit Clause — Good Framework, Needs Stress-Testing

**Exit clause is strong:**
- MIT license on Phase 1 delivery
- Community-designated maintainer fallback
- "No single entity should be a point of failure"

**Sustainability model (Document 6) is the best section of the supporting materials.** The two-tier public/professional split is smart. The Chaos Labs comparison is well-argued. The insurance pricing downstream market is a genuine insight.

**But three weaknesses:**

1. **No named early customers.** "The Morpho ecosystem currently has 50+ active curators" is a market-sizing exercise, not evidence of demand. Even one curator saying "I would pay for this" transforms the credibility of the sustainability model.

2. **The free tier may be too generous.** Daily snapshots + weekly factor scores + 30-day PD updated weekly + top 30 vault coverage — for many curators, this is *enough*. The paid tier's marginal value is speed (block-by-block vs. daily), but most curators don't rebalance at block speed. The differentiation needs to be sharper.
   - **Proposal:** The free tier should cover top 10 vaults, not top 30. Or: free tier scores are delayed by 24 hours, not published daily. Create real pain at the free tier for anyone managing serious TVL.

3. **Insurance pricing is mentioned but not developed.** This is potentially a larger revenue opportunity than curator subscriptions. A calibrated PD estimate for a specific vault is worth *a lot* to an insurer — it's the core input to their pricing function. Even a brief sizing exercise would strengthen this: "Nexus Mutual covers $X in DeFi lending positions; accurate PD inputs could reduce their capital requirements by Y%, worth $Z to the insurer."

---

## (9) Public-Good Framing — Clear but Needs One Adjustment

The framing works: grant funds the commons (dependency graphs, methodology, open-source code), team sustains on the operational layer (speed, coverage, SLA). This is a proven model (Redis, Elasticsearch, Grafana).

**One adjustment needed:** The RFC should explicitly distinguish between "public good" (non-excludable, non-rivalrous) and "open source" (source-available, forkable). The *methodology* is a public good. The *live operational infrastructure* (RPC nodes, WebSocket feeds, SLA guarantees) is not — it's a private good built on public-good foundations. This distinction matters because governance voters will ask: "Why should the DAO pay for something the team will commercialize?"

- **Proposal:** Add: "The grant funds the creation of public-good methodology and open-source tooling. The commercial layer operates *on top of* these public goods without enclosing them. Any community member can fork the codebase and run their own instance. The paid product is operational convenience and service quality, not methodology access."

---

## Top 5 Concrete Actions Before Submission

1. **Get at least 2 Letters of Interest from curators** — Steakhouse and one other. This is the single highest-impact action for governance vote success.

2. **Add the "Known Limitations" paragraph to the Technical Appendix** — honest about calibration challenges in thin-history regimes. Turns a vulnerability into a strength (intellectual rigor).

3. **Specify the Phase 2 gate verification mechanism** — who confirms delivery, what the process is, what happens if contested.

4. **Rewrite the Team section with specifics** — name the protocols, the funds, the TVL numbers. Vague credentials invite skepticism.

5. **Address the Prosperi Paradox directly** — the sustainability model assumes curators want accurate risk data, but Prosperi's evidence suggests they profit from its absence. Make the argument that *transparency changes the game*, don't assume the game is already changed.

---

## Radical Alternative Worth Considering

**What if the RFC dropped Layer 2 entirely from the initial proposal?**

Layer 1 (DIG/YTD) is built and demonstrably valuable. Layer 3 (monitoring/alerts) is a natural extension. Layer 2 (quantitative scoring with GARCH/HMM/Merton) is the most ambitious, most expensive, and most vulnerable to calibration criticism. It's also the part most likely to draw "you haven't proven this works" objections from governance voters.

A smaller, Layer 1 + Layer 3 only proposal at $120K would:
- Be easier to approve (lower budget, less risk for voters)
- Ship faster (6 months, not 12)
- Establish credibility for a follow-up Layer 2 proposal with *real* curator usage data backing it
- Avoid the Prosperi Paradox entirely — you're not claiming to price risk, you're claiming to make risk *visible*

The tradeoff: it's less ambitious, potentially less fundable (governance voters may prefer a complete vision), and it delays the quantitative differentiation that separates this from a dashboard project.

**My position:** Keep Layer 2 in the proposal but be radically honest about its epistemic limits. The phased structure already provides the off-ramp if Layer 2 proves harder than expected. But the *ambition* of Layer 2 is what makes this proposal interesting rather than incremental.

### Agent B · `gpt-5.4` · 46s

The proposing analysis is still too generous. v0.3 is not yet a “credible governance proposal”; it is a polished proposal with an unresolved core contradiction: it asks Morpho governance to fund a public-good risk layer, a commercial curator product, and an unvalidated quantitative model in one package. Those are three different businesses with different buyers, incentives, and failure modes.

**Main Counterarguments**

1. **The phased gate is weaker than it looks.**  
A single vote for both phases means Phase 2 has already been politically pre-approved. A Month 6 checkpoint post is not a serious gate unless someone independent can block disbursement. The proposer’s suggested “automatic unless objected” mechanism is too soft. Better: Phase 1 and Phase 2 should be separate votes, or Phase 2 funds should be escrowed and released only after independent review.

2. **Layer 2 should not be kept just because it is interesting.**  
The proposing side admits Layer 2 is the most vulnerable part, then recommends keeping it. That is backwards. Governance voters fund deliverables, not intellectual ambition. GARCH/HMM/Merton language may impress some readers, but sophisticated voters will see calibration fragility immediately. A bad PD number is worse than no PD number because it creates false precision.

3. **The “Prosperi Paradox” is not a paragraph problem. It is the business model problem.**  
Adding a paragraph does not solve the fact that curators may not want risk made legible if their economics depend on depositors mispricing risk. The proposal assumes the customer is the curator, but the beneficiary may be the depositor, the insurer, or Morpho governance. Those are different go-to-market paths. The RFC should pick one.

4. **“Public good plus paid API” is under-theorized.**  
The current framing risks angering governance voters: the DAO pays to create infrastructure, then Sigma Labs monetizes speed, coverage, and SLA. That can be acceptable, but only if the boundary is explicit and enforceable. “Open source later” is not enough. The repo, schemas, methodology, and reproducibility harness should be public from Phase 1 start, not merely after delivery.

5. **Team risk is bigger than weak bios.**  
The proposal needs conflict-of-interest disclosure. If Sigma Labs members curate, advise, invest in, or manage exposure to assets they later score, that must be stated. A risk-score provider with undisclosed economic exposure becomes a governance liability.

6. **The “onchain-only” claim is still overextended.**  
Custody, legal enforceability, RWA marks, issuer solvency, redemption discretion, and operational controls are not fully observable onchain. The framework can detect onchain symptoms and permissions, not the full risk. The RFC should stop implying that “entirely onchain-derivable” equals comprehensive.

7. **Budget realism cuts both ways.**  
The proposing side treats the low $250K budget as a positive signal. It may instead signal under-scoping, hidden subsidy, or future dependency. If the work needs millions in equivalent labor, say so. If it does not, stop comparing to Chaos Labs. You cannot simultaneously argue “Chaos validates the scale of the problem” and “we can solve the relevant stack for $250K.”

**Specific Pushbacks On The Proposed Fixes**

- Letters of Interest help, but they do not prove willingness to pay. Require paid pilots, signed integration commitments, or at least named trial scopes.
- A “Known Limitations” paragraph is insufficient. Layer 2 needs downgraded language throughout: no “probability of default” branding until validated. Call it “stress indicator” or “model-implied liquidation failure estimate.”
- The proposed objection threshold for Phase 2 release is gameable and vague. Use independent reviewers with named criteria.
- Making the free tier worse to force paid conversion undermines the public-good claim. Do not cripple the commons after asking the DAO to fund it.
- Insurance pricing is speculative. Mentioning it without evidence weakens the proposal. Either get insurer feedback or remove it.

**Radical Alternatives**

1. **Drop Layer 2 entirely from this RFC.**  
Submit a six-month, $120K proposal for DIG/YTD plus monitoring only. Make the promise: “We will make collateral structure visible.” No PD, no ratings, no model theater. Then return with real usage data.

2. **Turn this into a Morpho Risk Registry, not a Sigma Labs product.**  
Create a public machine-readable registry of collateral facts: oracle type, admin roles, timelocks, mint authority, liquidity depth, dependencies, recursive exposure, redemption gates. Let Credora, curators, insurers, and researchers build scores on top.

3. **Use a bounty market instead of a grant.**  
Morpho governance defines detector categories: hardcoded oracle, stale oracle, recursive leverage, privileged minter, no timelock, low liquidity, circular collateral. Sigma Labs and others earn payments per validated detector and covered asset. This avoids vendor lock-in and rewards measurable outputs.

4. **Make curators disclose risk manifests as a governance norm.**  
Rather than funding an external scorer, require every major curator to publish a standardized collateral risk manifest for each vault. Sigma Labs can build the tooling that generates those manifests. This shifts accountability back to curators.

5. **Build depositor-facing “nutrition labels.”**  
If the real problem is depositor mispricing, stop selling to curators. Build simple public labels: oracle rigidity, admin mutation risk, liquidity exit capacity, recursive exposure, collateral concentration. No PD claims. No complex math. Maximum governance usefulness.

**Bottom Line**

The proposal’s strongest asset is not the quantitative model. It is the structural decomposition engine. The RFC should stop trying to be a full risk oracle, curator SaaS business, academic model, and public-good grant at once.

Best improvement: narrow v0.3 to “Morpho Collateral Transparency Infrastructure,” ship verifiable public outputs fast, then earn the right to propose scoring later.

---

## Round 2/5 — Creative (4/5)

### Agent A · `claude-opus-4-6` · 79s

# Proposing Side — Response to Rebuttal

The opposing critique is largely correct where it hits hardest. I'm revising my position rather than defending v0.3 wholesale. Three of these counterarguments genuinely change the proposal; two go too far; one reveals something both sides missed.

---

## Conceded — These Points Land

### Conceded 1: Phased gate as currently structured is theatre
The opposing side is right that a single vote pre-approves Phase 2 politically. My "14-day objection window" fix is indeed gameable. **Better: Phase 2 funds held in a community-controlled multisig, released only on a separate lightweight vote at Month 6 with named reviewer report as the trigger condition.** This is a genuine gate, not a formality. The team loses some certainty; the DAO gains real optionality. Worth the trade.

### Conceded 2: Conflict of interest disclosure is a missing must-have
This is the most damaging gap the opposing side surfaced and I missed entirely. Sigma Labs includes an active Morpho curator (Daniel). A risk-score provider that curates vaults is structurally conflicted: the scores they publish affect the vaults they manage. This MUST be disclosed with specifics — which vaults, which assets, which time windows, and what firewall procedures apply. Without this, the proposal is one tweet away from "Sigma Labs scored its own positions" discredit.

### Conceded 3: "Open source upon delivery" is insufficient
Open the repo on Day 1, not Month 6. Public commits, public issue tracker, public CI. The DAO is funding construction, not delivery. If the team can't show the work in progress, they haven't earned the grant. This is a small concession that costs the team almost nothing but transforms the trust equation.

### Conceded 4: "Onchain-only" overextends
The opposing side is right: custody, legal enforceability, RWA marks, issuer solvency, and operational controls are not fully onchain-observable. The framework detects *structural conditions* — not full risk. Language throughout the RFC should drop "entirely onchain-derivable" and substitute "onchain-observable structural signals." Weaker claim, stronger position.

### Conceded 5: PD branding is premature
"Probability of default" implies calibration that doesn't exist yet for DeFi-native collateral. **Rename to "Model-Implied Stress Indicator" or "Liquidation Failure Score."** Same math, honest labeling. When 24 months of live data validate the numbers, upgrade the branding. Prematurely claiming "PD" invites the exact criticism that will torpedo adoption among sophisticated readers.

---

## Pushback — These Points Overreach

### Pushback 1: "Three different businesses" is a category error
The opposing side frames this as public-good + curator SaaS + unvalidated quant model as three separate businesses. **This is the wrong decomposition.** The correct decomposition is:

- **One product**: a structural decomposition engine that reads onchain state
- **Two delivery modes**: slow/open (public good) and fast/operational (paid)
- **One research track** (Layer 2) that runs *on top* of the product to add interpretive scoring

The quantitative model is not a separate business — it's an analytical layer over the same data pipeline. The "three businesses" framing collapses if Layer 2 is reframed as *research and validation*, not *product*.

### Pushback 2: Dropping Layer 2 entirely gives up the defensible moat
If the proposal is only DIG/YTD + monitoring, the opposing side's radical alternative #2 (Morpho Risk Registry) is strictly better — why pay Sigma Labs to build something that belongs in a community registry? Layer 2 is what justifies *this team* rather than *any team*. The answer isn't to drop it; it's to **fund Layer 2 as exploratory research with no product claims**. Deliver the methodology, the calibration attempt, the honest backtest, and the limitations document. Don't ship it as scores curators should rely on. This preserves the intellectual differentiation without the false-precision risk.

### Pushback 3: The bounty market alternative underestimates the integration problem
Bounty markets work for discrete, verifiable detectors. But risk infrastructure value comes from *integration* — the dependency graph, the yield tree, the cross-factor correlations all compose into something larger than the sum of individual detectors. A bounty for "detect hardcoded oracle" produces a script; a funded team produces an integrated system with shared schemas, consistent taxonomy, and coherent API. The bounty approach gives you GitHub dust, not infrastructure.

---

## Integration — The Best Radical Alternatives Strengthen the Proposal

The opposing side's alternatives aren't substitutes for the RFC; they're missing pieces. I'm absorbing three of them:

### Absorbing Alternative #2 (Morpho Risk Registry)
The Phase 1 deliverable should explicitly produce a **machine-readable Collateral Risk Registry** — not just dashboards and dossiers. Schema-defined, versioned, queryable. This makes the public good a *substrate* others can build on, not a *product* that competes with them. Credora can consume it. Curators can consume it. Insurers can consume it. This frames Sigma Labs as infrastructure, not vendor.

### Absorbing Alternative #4 (Curator Risk Manifests)
The "Decision Support" layer (Layer 4) should include a **Risk Manifest Template** that curators publish alongside each vault. The tooling generates the manifest from onchain state; the curator signs off and publishes it. This shifts accountability to curators (where it belongs) while making Sigma Labs' tooling the de-facto standard for compliance. It also solves the "who pays" problem: curators pay to generate reliable manifests because depositor trust depends on them.

### Absorbing Alternative #5 (Depositor Nutrition Labels)
The opposing side is right that if depositor mispricing is the root cause (per Prosperi), the direct fix is depositor-facing transparency. Add a **public-facing Vault Label** to Phase 1 deliverables: oracle rigidity, admin mutation risk, recursive exposure, collateral concentration — plain language, no model theater. This is the *most governance-fundable artifact in the entire proposal* because it directly serves the "user education" direction Morpho leans toward (per Albist's meeting feedback).

---

## What Both Sides Missed

**The proposal's real buyer is Morpho governance itself.**

Neither side named this clearly. Morpho benefits from curator risk visibility because:
- It reduces protocol-level tail risk (another USD0++ incident threatens Morpho's brand, not just the curator's)
- It enables tiered curator certification ("verified by risk manifest") as a trust signal
- It counters the narrative that permissionless curation = unbounded risk

If Morpho governance is the real beneficiary, then **the public-good layer isn't a grant at all — it's protocol infrastructure that Morpho should operate or subsidize in perpetuity, not a one-time commons subsidy**. The sustainability problem partially dissolves: Sigma Labs builds and operates under an ongoing service contract, not a one-shot grant + commercial pivot.

This is a much stronger pitch than "fund the commons, we'll monetize on the side." It reframes the question from "will curators pay?" to "does Morpho want this infrastructure to exist?"

---

## Revised Proposal — "Morpho Collateral Transparency Infrastructure"

**What changes from v0.3:**

1. **Title and framing:** Drop "Risk Framework" → "Collateral Transparency Infrastructure." Signals scope honestly.
2. **Layer 2 scope:** Keep, but reframe as *research track* producing a methodology paper + shadow-mode calibration + external review. No product claims. Budget cut from $130K to $80K.
3. **Phase 1 deliverables:** Add machine-readable Risk Registry (schema + API), Vault Nutrition Labels (depositor-facing), Risk Manifest Template (curator-facing). Budget stays at $120K.
4. **Gate mechanism:** Phase 2 funds in community multisig, released via separate Month 6 vote tied to named deliverables. No automatic release.
5. **Conflict disclosure:** Full disclosure of any team member's economic exposure to scored assets, updated quarterly, with documented firewall procedures.
6. **Open source:** Day 1, not Month 6. Public repo, public CI, public issue tracker.
7. **Language:** "Probability of default" → "Stress indicator." "Onchain-derivable" → "Onchain-observable." "Predict" → never used.
8. **Sustainability:** Reframe as protocol infrastructure with ongoing service relationship, not one-shot grant + commercial pivot. Commercial layer (speed/SLA) remains optional, but is not the load-bearing assumption.
9. **Budget:** Cut total to **$200K** ($120K Phase 1 + $80K Phase 2 research). The math being "suspiciously low" is a real signal the opposing side identified. Either scope to fit the budget honestly, or raise the budget honestly. I'd scope down.

---

## Bottom Line

The opposing critique moves my position substantially. v0.3 is not ready as submitted. With the six concessions above, the three absorbed alternatives, and the reframe around Morpho governance as the true beneficiary, there is a **v0.4** that is both more ambitious (protocol infrastructure, not vendor product) and more modest (no PD branding, no false-precision claims). That version is worth submitting. v0.3 as drafted would pass, but at the cost of locking in claims the team will struggle to back up in 12 months.

**The best improvement is the opposing side's framing**: ship verifiable public outputs fast, earn the right to propose scoring later. I'd just add one word: ship them as *infrastructure*, not *dashboards*.

### Agent B · `gpt-5.4` · 52s

The response is a major improvement, but it now risks overcorrecting in one direction: it replaces the weak “curators will pay” story with an equally underproven “Morpho governance is the buyer” story. That may be true, but it needs evidence. A protocol service contract is not easier than curator SaaS; it just moves the sales problem from 10 curators to one DAO.

**Main Assessment**

The strongest move here is the reframing from “risk framework” to **“collateral transparency infrastructure.”** That is the right center of gravity. It lowers the burden of proof, aligns with Morpho’s likely user-education interest, and makes the already-built DIG/YTD tooling the hero instead of the speculative quant layer.

But the revised proposal still needs sharper boundaries. It should not say, implicitly or explicitly:

> “Morpho should fund us because we are the future risk layer.”

It should say:

> “Morpho should fund a public, machine-readable collateral transparency substrate. Sigma Labs is the first implementation team. The output should remain useful even if Sigma Labs disappears.”

That distinction matters.

**Where The Response Is Strong**

The concessions are correct.

Day-1 open source, conflict disclosures, weaker “onchain-observable” language, and dropping PD branding are not cosmetic changes. They are governance-survival changes.

The three absorbed alternatives are also directionally right:

- **Collateral Risk Registry** is the most durable public-good artifact.
- **Curator Risk Manifests** shift accountability back to curators.
- **Vault Nutrition Labels** directly address depositor mispricing and Morpho’s user-education interest.

Those should become the spine of v0.4.

**Where It Still Overclaims**

1. **“Morpho governance is the real buyer” is plausible, not proven.**

This is a good hypothesis, but the response treats it as a discovery. Governance may benefit from this infrastructure, but that does not mean governance wants to fund, operate, or politically defend it.

Morpho may prefer to remain neutral infrastructure and avoid endorsing any risk taxonomy. A public label that marks one curator’s vault as having “high admin mutation risk” could create political conflict. That is not a reason to avoid it, but it is a reason to design the system as neutral disclosure infrastructure, not an official risk judgment layer.

Better phrasing:

> “Morpho governance is the natural sponsor of the public disclosure layer, while curators, insurers, and data consumers are possible downstream buyers of operational services.”

2. **The conflict-of-interest fix needs teeth.**

Quarterly disclosures and firewall language are necessary but not sufficient. If a team member actively curates Morpho vaults, the issue is not only whether Sigma Labs scores its own positions. The issue is whether Sigma Labs’ public labels could move deposits toward or away from competitors.

v0.4 should include:

- List of all vaults, assets, protocols, advisory roles, and economic interests held by team members.
- Recusal rule for any manual annotation or qualitative dossier involving those assets.
- Machine-generated facts separated from analyst commentary.
- Public changelog for label logic and manual overrides.
- Independent reviewer access to reproduce registry outputs.

Most importantly: **the registry should publish facts, not judgments, wherever possible.**

For example:

- Good: “Oracle type: hardcoded. Market reference: none detected. Timelock: none detected.”
- Riskier: “Oracle risk: high.”
- Most dangerous: “This vault is unsafe.”

3. **Renaming PD does not fully solve false precision.**

“Stress indicator” is better than “Probability of Default,” but if the output is still a scalar number with red/yellow/green interpretation, users will treat it as a risk score.

The fix is not just terminology. It is product design.

For Phase 1, avoid scalar composite scores entirely. Use categorical fact labels:

- Oracle: `market-referenced`, `hardcoded`, `delayed`, `unknown`
- Admin control: `timelocked`, `multisig`, `EOA`, `unknown`
- Recursive exposure: `none detected`, `present`, `circular`
- Liquidity: `exit depth below X% of vault exposure`
- Collateral concentration: top dependency percentages

Phase 2 can explore composite indicators, but Phase 1 should be a facts-first registry.

4. **The multisig + Month 6 vote still may be overcomplicated.**

If Phase 2 is now only an $80K research track, the cleaner move is probably not to pre-authorize it at all.

Best structure:

- Submit **Phase 1 only** now: $120K, six months.
- Include a non-binding roadmap for Phase 2.
- At Month 6, publish outputs, curator feedback, usage metrics, and a new Phase 2 proposal.

This is politically cleaner than escrow, multisig release criteria, reviewer reports, and a quasi-vote. It also shows confidence: “judge us on what we ship.”

5. **The Risk Registry needs governance design, not just schema design.**

A machine-readable registry sounds obvious, but the hard parts are operational:

- Who controls schema changes?
- How are disputed entries handled?
- What happens when detection fails?
- Are unknown values allowed, or are they treated as risk?
- Can curators submit corrections?
- Are historical registry states preserved?
- Can third parties run the same pipeline and reproduce the same output?

v0.4 should specify this.

Suggested language:

> “Every registry entry will include the block number, contract addresses, data source, extraction method, confidence level, and parser version. Historical states will remain queryable. Disputed entries will be tracked publicly through GitHub issues, with corrections linked to reproducible onchain evidence.”

That makes the registry credible.

**Best v0.4 Structure**

I would simplify the proposal into three public artifacts and one optional research track.

**Phase 1: $120K, 6 Months**

Deliverables:

1. **Collateral Risk Registry**
   Machine-readable, versioned, open schema covering top 30 Morpho vaults.

2. **Vault Nutrition Labels**
   Depositor-facing fact summaries generated from registry fields. No composite score.

3. **Curator Risk Manifest Template**
   A standard disclosure format curators can publish, sign, and update.

4. **Monitoring Alerts**
   Oracle staleness, hardcoded feed divergence, privileged role mutation, leverage loop formation, liquidity deterioration, circular exposure.

5. **Public Dashboard**
   Useful, but secondary. The registry is the core deliverable; the dashboard is merely one interface.

6. **Open Repo From Day 1**
   Public code, schemas, docs, issues, CI, reproducibility harness.

**Phase 2: Separate Future Proposal**

Do not fund it now. Describe it as:

- exploratory stress-indicator research,
- shadow-mode only,
- externally reviewed,
- no governance or curator reliance until validated over live data.

This removes the biggest attack surface from the current proposal while preserving the ambition.

**Non-Obvious Improvement**

Add a **“risk label diff”** feature.

The most useful thing for curators and depositors may not be a dashboard showing current state. It may be a changelog showing what changed:

- oracle switched,
- admin role changed,
- timelock shortened,
- liquidity dropped,
- new recursive dependency appeared,
- collateral concentration crossed threshold,
- vault exposure to an asset increased.

This is much more actionable than a static score. It also fits the “designed to detect” framing perfectly.

Suggested deliverable:

> “For each covered vault, the system will publish a human-readable and machine-readable diff whenever a monitored structural risk attribute changes.”

That is governance gold.

**Alternative Worth Taking Seriously**

Create a **Morpho Collateral Disclosure Standard** instead of only a Sigma Labs implementation.

The RFC could propose:

- an open JSON schema,
- required fields,
- recommended update cadence,
- reference implementation by Sigma Labs,
- optional adoption by curators,
- compatibility with Credora and other risk providers.

This turns the proposal from “fund our risk product” into:

> “Fund the first implementation of a public disclosure standard for Morpho collateral.”

That is harder to attack and easier for others to build on.

**Bottom Line**

The response is moving in the right direction, but v0.4 should go one step further:

- Phase 1 only.
- Facts before scores.
- Registry before dashboard.
- Disclosure standard before Sigma Labs product.
- Separate future vote for quantitative scoring.
- Treat Morpho governance as a sponsor hypothesis, not a guaranteed buyer.

The strongest possible version is not “A Morpho-compatible DeFi Collateral Asset Risk Framework.”

It is:

**“Morpho Collateral Transparency Infrastructure: an open registry, disclosure standard, and monitoring layer for curator vault risk.”**

---

## Round 3/5 — Balanced (3/5)

### Agent A · `claude-opus-4-6` · 104s

# Proposing Side — Final Consolidation

The opposing critique is now stronger than my position in several places. Rather than defend, I'm consolidating. The debate has converged on a sharper proposal than either side started with. Below: what I fully concede, what I refine, where genuine tradeoffs remain unresolved, and one overlooked tension in the "standard vs. implementation" framing.

---

## Full Concessions

### Concession 1: Phase 1 only, no pre-authorized Phase 2
The opposing side is right. Escrow + Month 6 multisig release + named reviewer is bureaucratic overhead that pretends to provide a gate. The cleaner move is **$120K, 6 months, one vote, one deliverable bundle**. Phase 2 becomes a future proposal judged on Phase 1 outputs. This also implicitly resolves the "three businesses" problem — there's only one business in front of governance, and it's transparency infrastructure.

### Concession 2: Facts before scores, categorically
This is the most important product design move in the entire debate, and I missed it. A scalar "stress indicator" with threshold coloring will be read as a risk score no matter what it's labeled. The Phase 1 output must be **categorical fact labels with explicit taxonomy** — `oracle: hardcoded`, `admin: EOA`, `recursive_exposure: circular`. This removes the false-precision attack surface *and* sidesteps the conflict-of-interest issue (facts are reproducible; scores involve judgment).

### Concession 3: The "Morpho governance is the buyer" framing was a hypothesis disguised as a discovery
Accepted. Governance may *benefit* from this infrastructure without wanting to *endorse* a specific risk taxonomy. The revised framing is correct: **"natural sponsor of the public disclosure layer"** — not committed customer. This preserves the argument without overreaching.

### Concession 4: Conflict-of-interest needs operational teeth, not just disclosure
The opposing side's specific list — recusal rules, fact/commentary separation, public changelog, independent reviewer reproducibility — is correct. I'd add one more: **any Sigma Labs team member curating Morpho vaults must not manually annotate or override registry entries for assets in those vaults. Their contribution is limited to pipeline code, not per-asset judgment.** This is enforceable via git commit attribution.

### Concession 5: The risk label diff is the right primary artifact
This is the non-obvious improvement of the entire debate. Static snapshots show state; diffs show *change*, which is what actually matters for monitoring. It also perfectly fits the "designed to detect" framing. Every one of the 2025–2026 incidents in the case studies would produce a diff event under this design. **Promote "structural attribute diff stream" to a headline Phase 1 deliverable, not a sub-feature.**

### Concession 6: Registry governance must be specified
Schema control, dispute resolution, confidence levels, reproducibility harness, historical state preservation — all non-negotiable. The opposing side's proposed registry entry format (block number, contract addresses, data source, extraction method, confidence level, parser version) is correct. Adopt it verbatim.

---

## Refinements

### Refinement 1: "Disclosure Standard" is overreaching in one specific way
The opposing side's final alternative — position the RFC as funding "the first implementation of a public disclosure standard" — is almost right. But a standard requires multi-party adoption to be a standard. A schema published by one team is a *schema*, not a standard. History of DeFi "standards": EIPs gain standard status only after multiple independent implementations. Before that, they're proposals.

**Refined framing:** "Morpho Collateral Transparency Infrastructure, including a **proposed** open disclosure schema (published as an EIP or equivalent) and a reference implementation by Sigma Labs." This keeps the standards ambition honest — the RFC *proposes* a standard and *builds* the reference implementation. Whether it becomes an actual standard depends on adoption by others, which the RFC cannot promise.

### Refinement 2: The facts/judgment boundary is fuzzier than "facts before scores" admits
Even categorical fact labels involve judgment at the boundaries:
- "Oracle: hardcoded" — what counts as hardcoded? A Chainlink feed with a 24-hour heartbeat? A fixed constant? A price that updates from a single signer?
- "Recursive exposure: circular" — how many hops qualify? Does wsrUSD → smokeUSDT → wsrUSD count as 2-hop circular or 1-hop self-reference?

These boundaries are where conflict of interest could bite. The fix: **publish the detection rules as code, not prose**. Every categorical label is produced by a named, versioned detector with explicit input/output. Anyone can fork the detector, run it on the same onchain state, and confirm the same output. Facts become reproducible instead of interpretable.

### Refinement 3: One concrete addition to the registry schema
Add a **`last_verified_block`** field per entry, separate from `extracted_at_block`. Purpose: distinguish between "this fact is stale but still the best we have" and "this fact was confirmed at block N." Consumers can then decide their tolerance for staleness. This is a cheap engineering addition that massively improves downstream trust.

---

## Remaining Tradeoffs Neither Side Has Resolved

### Tradeoff 1: Sigma Labs' differentiation shrinks as the proposal narrows
The opposing side's version is cleaner, more defensible, and more governance-fundable. It also weakens the argument for *this specific team*. Anyone with strong protocol engineering skills can build a collateral registry. The team's differentiation was the quantitative model and the already-built DIG/YTD. By deferring Layer 2 entirely, we're left with "we built DIG/YTD, which you can see, and we'll build the registry next." That's enough to win the grant, but it's a weaker moat than the full vision.

**Honest answer:** a weaker moat is worth accepting in exchange for a much higher probability of approval. If the team disappears after Phase 1, the registry + monitoring is still useful. If the team ships well, Phase 2 becomes an easier ask because it's judged on real Phase 1 outputs.

### Tradeoff 2: Morpho-specific vs. EVM-general
The proposal targets Morpho collateral. But nothing in DIG/YTD/registry is Morpho-specific — they work on any EVM asset. This creates a tension:
- If scoped narrowly to Morpho, governance asks "why fund generally useful infrastructure from Morpho's treasury?"
- If scoped broadly to EVM, governance asks "why should Morpho pay for Aave/Compound/Euler benefit?"

**Proposed resolution:** Phase 1 covers **top 30 Morpho vaults** as primary scope, with the underlying engine designed to generalize. The schema, detectors, and pipeline are protocol-agnostic by construction. If other protocols adopt the registry, that's upside; if they don't, Morpho still gets the full Morpho-specific output. This is honest about the work's generality without overclaiming multi-protocol impact.

### Tradeoff 3: Who operates the registry post-grant is unresolved
Neither side has answered this. The opposing side argues for "published to remain useful if Sigma Labs disappears" — fine for code, but a live registry requires ongoing operation: RPC calls, pipeline execution, schema updates, dispute adjudication. If Sigma Labs is the sole operator, the commons claim is weaker. If a third party operates it, who pays them?

**Candidate resolution:** the registry source code is MIT-licensed from Day 1, but the *canonical live instance* is operated by Sigma Labs during the grant period and for 12 months after. A governance-designated fallback maintainer is named as backup. Any community member can run their own instance at any time. This is the most honest available answer; it's not fully resolved, but it's resolvable.

---

## One Overlooked Issue

**Detection failure is a reputational risk that the proposal still hasn't priced.**

The RFC claims the tooling is "designed to detect" specific structural signals. But detection systems have false negatives. The next USD0++-class incident may involve a signal category the detectors didn't cover, or a detector that had a bug, or a case that was missed. When that happens — and it will — how does Sigma Labs respond?

The current proposal implies detection is a capability built once and then operational. But in practice, detection coverage is a living specification that needs continuous expansion. Every incident not caught by existing detectors is evidence that the detector library is incomplete.

**Proposed addition to v0.4:** a **Detection Gap Log** as an ongoing public artifact. Every time an onchain incident occurs, Sigma Labs publishes within 14 days:
- Whether the relevant signal was in the detector library
- If yes, whether it fired (and if not, why not)
- If no, a proposal to add it
- What the registry would have shown at the block before the incident

This is uncomfortable to commit to — it makes every miss public. But it's the strongest possible signal of intellectual honesty, and it turns detection from a closed capability claim into an open, auditable learning process.

---

## Final v0.4 Structure (Consolidated Across Both Sides)

**Title:** *Morpho Collateral Transparency Infrastructure — An Open Registry, Disclosure Schema, and Monitoring Layer for Curator Vault Risk*

**Phase 1 Only: $120K, 6 months, single governance vote**

Deliverables:

1. **Collateral Risk Registry**
   - Machine-readable, versioned schema with proposed EIP submission
   - Top 30 Morpho vaults covered
   - Every entry includes block number, source, extraction method, confidence level, parser version, `last_verified_block`
   - Categorical fact labels only; no composite scores in Phase 1
   - Detector logic published as code; rules reproducible from onchain state

2. **Structural Attribute Diff Stream**
   - Human-readable and machine-readable diff events when monitored attributes change
   - Covers oracle changes, admin role mutations, timelock updates, liquidity shifts, new dependencies, circular exposure emergence, concentration threshold crossings

3. **Vault Nutrition Labels**
   - Depositor-facing fact summaries derived from registry fields
   - Plain language, no composite score, no red/yellow/green
   - One label per vault, updated on diff events

4. **Curator Risk Manifest Template**
   - Standardized disclosure format for curators to publish alongside vaults
   - Tooling generates the manifest draft from registry state; curator signs and publishes

5. **Monitoring Alerts**
   - Oracle staleness, hardcoded feed divergence, privileged role mutation, leverage loop formation, liquidity deterioration, circular exposure

6. **Public Dashboard** *(secondary interface)*

7. **Detection Gap Log** *(ongoing commitment)*

**Operational Commitments:**
- Open repo from Day 1 (code, schemas, docs, issues, CI)
- Full conflict-of-interest disclosure with operational firewalls
- Recusal rule on manual annotation for assets team members are exposed to
- Independent reviewer reproducibility harness
- Canonical instance operated by Sigma Labs for grant period + 12 months; named fallback maintainer

**Phase 2 (future proposal, not funded now):**
- Exploratory stress-indicator research
- Shadow-mode only, externally reviewed
- No governance or curator reliance until validated over 12+ months of live data
- Submitted as a separate RFC with Phase 1 usage metrics as evidence

---

## Bottom Line

The proposal that survives the debate is substantively different from v0.3:

- Narrower scope (transparency infrastructure, not risk framework)
- Honest artifacts (facts, not scores)
- Real commitments (Day 1 open source, conflict disclosure, detection gap log)
- Clean governance (Phase 1 only, earn Phase 2 later)
- Reframed ambition (reference implementation of a proposed standard, not a proprietary risk product)

Both sides contributed essential moves. The opposing side was right about the load-bearing issues — Prosperi Paradox, conflict of interest, false precision from scalar scores, phased vote theatre. The proposing side was right that Layer 1 has real structural value, that the team's DIG/YTD work is non-trivial, and that "public good + operational layer" can work *if the boundary is honest*.

**The single biggest insight from this debate:** the product design question (facts vs. scores) and the governance question (fund what, when, gated how) are tangled together. Scalar scores require calibration commitments that require Phase 2 pre-authorization that requires political theatre around the gate. Categorical facts require none of that. Fixing the product design collapses the governance complexity.

v0.4 is worth submitting. v0.3 is not.

### Agent B · `gpt-5.4` · 39s

This consolidation is basically the right v0.4. It turns the proposal from “trust our model” into “fund reproducible collateral facts.” That is a much stronger governance object.

I would still tighten a few things before turning it into the RFC.

**Remaining Issues**

1. **Do not overpromise an EIP.**  
An EIP may be premature and distracting. The first deliverable should be `MCTI Schema v0.1`, with a commitment to pursue standardization only after at least one independent curator, risk provider, or data consumer adopts it. “Proposed disclosure schema” is enough.

2. **Define “top 30 Morpho vaults” precisely.**  
Use a deterministic selection rule: top 30 by TVL at grant start, plus any vault entering the top 10 during the grant period. Otherwise the target keeps moving.

3. **Avoid manual annotation in Phase 1 where possible.**  
Manual notes create conflict risk. Phase 1 should be detector output plus confidence metadata. If analyst commentary exists, it should be clearly separated as non-canonical and excluded from machine-readable registry facts.

4. **Nutrition labels need usability without becoming scores.**  
“No red/yellow/green” is directionally right, but depositors still need hierarchy. Use neutral categorical badges:
   - `oracle: fixed-price`
   - `admin: EOA-controlled`
   - `timelock: none detected`
   - `recursive exposure: circular`
   - `liquidity depth: below vault exposure`
   
   No aggregate grade, no “safe/unsafe,” no implied investment recommendation.

5. **Detection Gap Log needs scoped language.**  
Do not commit to postmortem every onchain incident in DeFi. Commit to every material incident involving covered Morpho vaults or covered collateral assets. Otherwise the obligation becomes unbounded.

6. **Fallback maintainer may be hard to name upfront.**  
Better: “fallback maintainer process” unless a credible maintainer has already agreed. Naming someone without a signed acceptance creates a fake safeguard.

7. **Add adoption milestones, not just build milestones.**  
Even for public infrastructure, governance voters want signs of use. Phase 1 should include:
   - 2 curator feedback sessions,
   - 1 external reproducibility review,
   - 1 public schema review period,
   - at least 1 third-party consumer or curator trial if possible.

8. **Keep Letters of Interest in the action list.**  
Even after narrowing to public infrastructure, LOIs still matter. They no longer need to say “we will pay.” They can say: “we would review/use/test this registry if delivered.”

**Suggested Final Framing**

The cleanest pitch is:

> Morpho’s curator model needs shared collateral transparency infrastructure. This grant funds a facts-first, open-source registry and monitoring layer for the top Morpho vaults. It does not fund risk scores, investment recommendations, or parameter-setting authority. Sigma Labs will build the reference implementation using its existing DIG/YTD tooling, with all detector logic, schemas, and outputs reproducible from onchain state.

That is hard to attack because it avoids the original traps: no false precision, no vendor black box, no pre-authorized quant expansion, no claim that Sigma Labs becomes Morpho’s risk authority.

**One More Non-Obvious Addition**

Add signed registry snapshots.

Each published registry state should have:
- content hash,
- timestamp,
- block number,
- detector version,
- Git commit hash,
- optional signature by Sigma Labs’ publishing key.

This makes historical claims auditable. If someone later asks “what did the registry show before incident X?”, there is a verifiable answer.

**Final Judgment**

v0.4 is worth submitting if it stays disciplined:

- Phase 1 only.
- Facts, not scores.
- Registry, diffs, labels, manifests.
- Open code from day 1.
- Reproducibility over authority.
- Future scoring as a separate earned proposal.

The biggest risk now is scope creep. Do not let the quantitative model sneak back into the main ask through softer language. Mention it only as future research. The governance proposal should live or die on the concrete value of transparent, reproducible collateral facts.

---

## Round 4/5 — Focused (2/5)

### Agent A · `claude-opus-4-6` · 55s

# Proposing Side — Final Submission Spec

The debate has converged. I accept all eight refinements without modification. The signed registry snapshot addition is correct and belongs in the spec. Below is the consolidated submission-ready version, plus four small tightenings that close remaining operational ambiguity.

---

## Accepted Refinements (all eight)

1. ✅ **`MCTI Schema v0.1`** (not EIP). Standardization path conditional on at least one independent adopter.
2. ✅ **Top 30 selection rule:** vaults ranked by TVL at grant start date, plus any vault entering top 10 during the grant period. Snapshot published in Month 1 deliverables.
3. ✅ **No manual annotation in registry facts.** Detector output + confidence metadata only. Analyst commentary, if produced, lives in a separate non-canonical document and is never merged into machine-readable fields.
4. ✅ **Categorical badges, no aggregate grade.** Examples from opposing side adopted verbatim.
5. ✅ **Detection Gap Log scoped** to material incidents involving covered vaults or covered collateral assets. Unbounded obligation removed.
6. ✅ **Fallback maintainer *process*, not named party.** Named party requires signed acceptance, which the proposal cannot secure upfront without it becoming a separate negotiation.
7. ✅ **Adoption milestones added:** 2 curator feedback sessions, 1 external reproducibility review, 1 public schema review period, 1 third-party consumer trial if feasible.
8. ✅ **Letters of Interest retained** with softer ask: "would review/use/test this registry if delivered."

---

## Accepted Addition: Signed Registry Snapshots

Every published registry state includes:
- Content hash
- Timestamp
- Block number
- Detector version
- Git commit hash
- Optional publisher signature

This makes historical claims auditable and closes one of the biggest "black box" risks that destroyed trust in closed-source risk providers.

---

## Four Small Tightenings

### Tightening 1: Detector changelog and deprecation policy
When detector logic changes, old outputs must remain retrievable and tagged with the original detector version. Add to the registry spec: **"Detectors are versioned semantically. Output of a retired detector is preserved with its `detector_version` tag; consumers can pin to specific versions. Detector changes require a changelog entry with rationale, effective block, and comparison to prior output on covered assets."** This prevents silent rewriting of history.

### Tightening 2: Conflict disclosure update trigger
Beyond quarterly, add: **"Disclosure is updated within 30 days of any material change in team members' economic exposure to covered assets or protocols."** Without a trigger, quarterly cadence creates up to 90-day blind spots.

### Tightening 3: Scope-limit the future-work mention
To prevent Phase 2 language from creeping back into the main RFC: any future-work reference is limited to **one paragraph in a `Future Work` section, with no budget numbers, no deliverable commitments, and no timeline**. It exists only to signal intellectual continuity, not to pre-authorize anything.

### Tightening 4: Bound the adoption milestones
- **Curator feedback sessions:** structured 90-minute sessions, written feedback published with consent, curator names disclosed unless confidentiality requested.
- **Schema review period:** 21-day public comment window, comments preserved publicly, resolution notes published.
- **External reproducibility review:** reviewer names and method published; reviewer must be able to regenerate at least one registry snapshot from source code and onchain state alone.
- **Third-party trial:** defined as one non-Sigma-Labs team consuming the registry in their own pipeline for ≥30 days and providing written feedback.

Without bounds, these become checkbox milestones. Bounded, they become evidence.

---

## Final RFC-Ready Spec

**Title:** *Morpho Collateral Transparency Infrastructure — An Open Registry, Disclosure Schema, and Monitoring Layer for Curator Vault Risk*

**Ask:** $120K, 6 months, single governance vote. Phase 1 only.

**Pitch (verbatim from opposing side, accepted):**
> Morpho's curator model needs shared collateral transparency infrastructure. This grant funds a facts-first, open-source registry and monitoring layer for the top Morpho vaults. It does not fund risk scores, investment recommendations, or parameter-setting authority. Sigma Labs will build the reference implementation using its existing DIG/YTD tooling, with all detector logic, schemas, and outputs reproducible from onchain state.

**Deliverables:**

| # | Deliverable | Artifact type |
|---|---|---|
| 1 | Collateral Risk Registry (`MCTI Schema v0.1`) | Machine-readable, versioned, signed |
| 2 | Structural Attribute Diff Stream | Event stream on covered assets |
| 3 | Vault Nutrition Labels | Depositor-facing categorical badges |
| 4 | Curator Risk Manifest Template | Signable disclosure format |
| 5 | Monitoring Alerts | Oracle, admin, liquidity, dependency |
| 6 | Public Dashboard | Secondary interface |
| 7 | Detection Gap Log | Ongoing commitment for covered scope |

**Operational Commitments:**
- Open repo from Day 1 (code, schemas, docs, issues, CI, reproducibility harness)
- Signed registry snapshots with full provenance
- Versioned detectors with changelog and deprecation policy
- Conflict-of-interest disclosure with 30-day update trigger and recusal rules
- Canonical instance operated by Sigma Labs through grant + 12 months; fallback maintainer process documented
- `MCTI Schema v0.1` published; standardization pursued only after independent adoption

**Adoption Milestones (bounded):**
- 2 structured curator feedback sessions with published notes
- 21-day public schema review period
- 1 external reproducibility review with published method
- 1 third-party trial (≥30 days consumption + written feedback)

**Future Work (one paragraph, no budget, no timeline):**
- Quantitative stress-indicator research as exploratory track. Shadow-mode only. Externally reviewed. No reliance until validated over 12+ months of live data. Any formal Phase 2 is a separate RFC judged on Phase 1 evidence.

---

## Bottom Line

The debate is finished. v0.4 as specified above is submittable and survives serious scrutiny:

- **No false precision** (facts, not scores)
- **No vendor lock-in** (reproducible from source + onchain state)
- **No pre-authorized scope creep** (Phase 1 only, future work capped at one paragraph)
- **No undisclosed conflicts** (operational firewalls, recusal rules, 30-day update trigger)
- **No unbounded commitments** (Detection Gap Log scoped to covered assets; adoption milestones have concrete boundaries)
- **No black box** (signed snapshots, versioned detectors, public changelog)

The proposal now earns its grant on the concrete value of **transparent, reproducible collateral facts delivered in 6 months**, not on the promise of a future quantitative authority. That is a much smaller target for critics and a much more defensible position for governance voters.

The single rule to hold through drafting: **if any language in the RFC implies Sigma Labs becomes Morpho's risk authority, that language is wrong.** The team is the reference implementer of a public disclosure substrate. Nothing more in this proposal. Everything more must be earned in a separate vote with real usage evidence.

### Agent B · `gpt-5.4` · 33s

This is now submission-ready. I would not change the architecture. The remaining work is to remove small ambiguities that critics could exploit.

**Final Tightenings**

1. **Make canonical signatures mandatory, not optional.**  
If the artifact is called a signed registry snapshot, the canonical published snapshot should always include a Sigma Labs publisher signature. Optional signatures can apply to mirrors or third-party attestations.

Suggested wording:

> Each canonical registry snapshot will include a content hash, timestamp, block number, detector version, Git commit hash, and Sigma Labs publisher signature. Third-party mirrors may add independent signatures.

2. **Define “material incident.”**  
The Detection Gap Log should not rely on subjective scope.

Suggested wording:

> A material incident means any exploit, oracle failure, governance mutation, liquidity impairment, liquidation cascade, depeg, or collateral failure that affects a covered Morpho vault or a covered collateral asset and is publicly reported by the protocol, curator, oracle provider, security researcher, or Morpho governance participant.

3. **Define “covered collateral asset.”**  
Otherwise the scope can expand unpredictably through dependencies.

Suggested wording:

> Covered collateral assets include assets directly accepted as collateral in the covered top 30 vault set, plus recursively detected dependencies that represent at least 5% of vault exposure or are part of a circular dependency path.

4. **Separate diff stream from alerts.**  
Right now they overlap. Make the distinction explicit:

> The diff stream is the canonical record of detected structural changes. Alerts are notification rules triggered from that diff stream or monitored thresholds.

5. **Define confidence levels.**  
Keep it simple and mechanical.

Suggested enum:

- `verified`: directly read from contract state or event logs
- `inferred`: derived from deterministic parsing across multiple contracts
- `partial`: detector succeeded but some dependency data was unavailable
- `unknown`: detector could not classify the field
- `unsupported`: asset pattern not yet supported by detector library

6. **Add acceptance criteria per deliverable.**  
Governance voters need to know what “done” means.

For example:

| Deliverable | Minimum acceptance criterion |
|---|---|
| Registry | Top 30 vaults covered, schema documented, snapshots reproducible |
| Diff stream | Structural changes emitted with before/after values and detector version |
| Nutrition labels | One label per covered vault, derived only from registry fields |
| Risk manifest | Template published and generated for covered vaults |
| Alerts | At least oracle, admin, liquidity, dependency, and circularity alerts live |
| Dashboard | Public interface displaying registry state, labels, and diffs |
| Gap log | Public process and first template entry published |

7. **Make the TVL source deterministic.**  
Do not just say “top 30 by TVL.” Say who measures it and when.

Suggested wording:

> The initial covered set will be the top 30 Morpho vaults by TVL using a published Month 1 snapshot. The snapshot will specify the data source, timestamp, block number where applicable, and vault addresses. Any vault entering the top 10 by the same methodology during the grant period will be added.

8. **Tighten the conflict rule.**  
Since registry facts are detector-generated, the key risk is manual exception handling.

Suggested wording:

> Team members with disclosed economic exposure to a covered vault, collateral asset, or directly competing curator may not author or approve manual overrides, non-canonical commentary, dispute resolutions, or detector exceptions for that asset or vault.

**Final Verdict**

This spec is ready to become v0.4. The key discipline is preserved: Phase 1 funds reproducible collateral facts, not risk authority.

The strongest final formulation is:

> Sigma Labs is not asking Morpho to endorse a risk model. Sigma Labs is asking Morpho to fund an open, reproducible disclosure substrate for collateral structure, dependencies, oracle design, admin control, liquidity exposure, and structural change detection.

That sentence should guide the rewrite. Any language that sounds like scoring, recommendation, certification, or parameter authority should be cut or moved to the one-paragraph Future Work section.

---

## Round 5/5 — Precise (1/5)

### Agent A · `claude-opus-4-6` · 39s

# Proposing Side — Final Architectural Decisions

Accepted. All eight final tightenings are adopted verbatim. The architecture is frozen. Below is the consolidated decision record — a bulleted plan suitable for handing to whoever drafts v0.4.

---

## Frozen Architectural Decisions

### Proposal Identity
- **Title:** *Morpho Collateral Transparency Infrastructure — An Open Registry, Disclosure Schema, and Monitoring Layer for Curator Vault Risk*
- **Ask:** $120K, 6 months, single governance vote, Phase 1 only
- **Guiding sentence (drives all rewrites):** *"Sigma Labs is not asking Morpho to endorse a risk model. Sigma Labs is asking Morpho to fund an open, reproducible disclosure substrate for collateral structure, dependencies, oracle design, admin control, liquidity exposure, and structural change detection."*
- **Any language implying scoring, recommendation, certification, or parameter authority is cut or relocated to the one-paragraph Future Work section.**

### Scope Definitions (Locked)
- **Covered vault set:** Top 30 Morpho vaults by TVL from a published Month 1 snapshot specifying data source, timestamp, block number, and vault addresses. Any vault entering the top 10 by the same methodology during the grant period is added.
- **Covered collateral asset:** Assets directly accepted as collateral in the covered vault set, plus recursively detected dependencies representing ≥5% of vault exposure or part of a circular dependency path.
- **Material incident:** Any exploit, oracle failure, governance mutation, liquidity impairment, liquidation cascade, depeg, or collateral failure that affects a covered vault or covered collateral asset, publicly reported by the protocol, curator, oracle provider, security researcher, or Morpho governance participant.

### Deliverables (Seven, Each with Acceptance Criterion)

| # | Deliverable | Minimum acceptance criterion |
|---|---|---|
| 1 | Collateral Risk Registry (`MCTI Schema v0.1`) | Top 30 vaults covered, schema documented, snapshots reproducible |
| 2 | Structural Attribute Diff Stream | Changes emitted with before/after values and detector version |
| 3 | Vault Nutrition Labels | One label per covered vault, derived only from registry fields |
| 4 | Curator Risk Manifest Template | Template published and generated for covered vaults |
| 5 | Monitoring Alerts | Oracle, admin, liquidity, dependency, and circularity alerts live |
| 6 | Public Dashboard | Public interface displaying registry state, labels, diffs |
| 7 | Detection Gap Log | Public process and first template entry published |

### Registry Spec (Locked)
- **Canonical snapshot fields (mandatory):** content hash, timestamp, block number, detector version, Git commit hash, Sigma Labs publisher signature
- **Third-party mirrors** may add independent signatures
- **Detector versioning:** semantic; retired detector outputs preserved with original version tag; changes require changelog entry with rationale, effective block, and prior-output comparison on covered assets
- **Confidence enum:** `verified` / `inferred` / `partial` / `unknown` / `unsupported`
- **Registry facts are detector-generated only.** No manual annotation enters machine-readable fields. Analyst commentary lives in separate non-canonical documents.

### Diff Stream vs. Alerts (Locked Distinction)
- **Diff stream:** canonical record of detected structural changes
- **Alerts:** notification rules triggered from the diff stream or monitored thresholds
- No overlap in the spec; alerts are a consumer of the diff stream

### Operational Commitments (Locked)
- **Open repository from Day 1:** code, schemas, docs, issues, CI, reproducibility harness
- **Canonical instance operation:** Sigma Labs, grant period + 12 months
- **Fallback maintainer process** documented (no named party without signed acceptance)
- **Standardization path:** `MCTI Schema v0.1` published; EIP or equivalent pursued only after ≥1 independent adopter
- **Nutrition labels:** categorical badges only; no aggregate grade; no safe/unsafe claims; no investment recommendation

### Conflict-of-Interest Regime (Locked)
- **Disclosure trigger:** quarterly + within 30 days of any material change in team members' economic exposure to covered assets or protocols
- **Scope of recusal:** team members with disclosed economic exposure to a covered vault, collateral asset, or directly competing curator may not author or approve:
  - manual overrides
  - non-canonical commentary
  - dispute resolutions
  - detector exceptions
  for that asset or vault
- **Enforcement:** git commit attribution; contributions limited to pipeline code for recused assets

### Adoption Milestones (Bounded)
- **2 curator feedback sessions:** 90 minutes each, structured, written feedback published with consent, curator names disclosed unless confidentiality requested
- **21-day public schema review period:** comments preserved publicly, resolution notes published
- **1 external reproducibility review:** reviewer name and method published; reviewer must regenerate at least one registry snapshot from source code and onchain state alone
- **1 third-party trial:** one non-Sigma-Labs team consumes the registry in their own pipeline for ≥30 days with written feedback

### Future Work Section (Strict Cap)
- **One paragraph maximum**
- **No budget numbers**
- **No timeline**
- **No deliverable commitments**
- Exists only to signal intellectual continuity for potential stress-indicator research in a separate future RFC judged on Phase 1 evidence

### Pre-Submission Actions (Outside the RFC Text)
- Collect Letters of Interest with softer ask: "would review/use/test this registry if delivered"
- Draft Month 1 TVL snapshot methodology so it is ready on grant start
- Prepare detector library inventory to back the "designed to detect" claim

---

## What Is Explicitly Out of Scope for This Proposal
- Probability of default estimates
- Intrinsic ratings (AAA–CCC)
- Composite risk scores
- GARCH / HMM / Merton calibration deliverables
- Parameter-setting authority for any vault
- Endorsement of any specific curator
- Insurance pricing claims
- Multi-protocol coverage commitments (only top 30 Morpho vaults are in scope)

---

## Ready for Drafting

v0.4 is architecturally frozen. The remaining work is prose: rewrite v0.3 against this spec, cut every sentence that implies risk authority, and verify that the Future Work section stays one paragraph. The governance proposal now lives or dies on the concrete value of transparent, reproducible collateral facts delivered in six months — which is exactly the bet worth making.

### Agent B · `gpt-5.4` · 46s

Locked. The v0.4 architecture should now be drafted against the following final plan.

**Core Proposal**
- Title: *Morpho Collateral Transparency Infrastructure — An Open Registry, Disclosure Schema, and Monitoring Layer for Curator Vault Risk*
- Ask: `$120K`, `6 months`, `single governance vote`, `Phase 1 only`
- Core framing:
  - Sigma Labs is not asking Morpho to endorse a risk model.
  - Sigma Labs is asking Morpho to fund an open, reproducible disclosure substrate for collateral structure, dependencies, oracle design, admin control, liquidity exposure, and structural change detection.
- Remove any language implying:
  - risk scoring
  - investment recommendations
  - curator certification
  - parameter-setting authority
  - Morpho endorsement of Sigma Labs as a risk authority

**Scope**
- Covered vaults:
  - Top 30 Morpho vaults by TVL from a Month 1 published snapshot.
  - Snapshot must include data source, timestamp, block number where applicable, and vault addresses.
  - Any vault entering the top 10 by the same methodology during the grant period is added.
- Covered collateral assets:
  - Assets directly accepted as collateral in covered vaults.
  - Recursively detected dependencies representing at least `5%` of vault exposure.
  - Any dependency involved in a circular exposure path.
- Material incidents:
  - Exploit, oracle failure, governance mutation, liquidity impairment, liquidation cascade, depeg, or collateral failure affecting a covered vault or covered collateral asset.
  - Must be publicly reported by a protocol, curator, oracle provider, security researcher, or Morpho governance participant.

**Deliverables**
- Collateral Risk Registry, `MCTI Schema v0.1`
  - Top 30 vaults covered.
  - Schema documented.
  - Snapshots reproducible.
- Structural Attribute Diff Stream
  - Emits before/after changes.
  - Includes detector version.
  - Serves as the canonical record of structural changes.
- Vault Nutrition Labels
  - One per covered vault.
  - Derived only from registry fields.
  - Categorical badges only.
  - No aggregate grade, no safe/unsafe language, no investment recommendation.
- Curator Risk Manifest Template
  - Standardized disclosure format.
  - Generated for covered vaults from registry state.
  - Curators can sign and publish it.
- Monitoring Alerts
  - Alert rules triggered by diff stream or monitored thresholds.
  - Covers oracle, admin, liquidity, dependency, and circularity events.
- Public Dashboard
  - Secondary interface.
  - Displays registry state, labels, and diffs.
- Detection Gap Log
  - Public process plus first template entry.
  - Scoped only to material incidents involving covered vaults or covered collateral assets.

**Registry Rules**
- Canonical registry snapshots must include:
  - content hash
  - timestamp
  - block number
  - detector version
  - Git commit hash
  - Sigma Labs publisher signature
- Third-party mirrors may add independent signatures.
- Detector versions are semantic.
- Retired detector outputs remain retrievable with original version tags.
- Detector changes require:
  - changelog entry
  - rationale
  - effective block
  - comparison to prior outputs on covered assets
- Confidence enum:
  - `verified`
  - `inferred`
  - `partial`
  - `unknown`
  - `unsupported`
- Machine-readable registry facts are detector-generated only.
- Analyst commentary, if any, must remain non-canonical and separate.

**Operational Commitments**
- Open repository from Day 1:
  - code
  - schemas
  - docs
  - issues
  - CI
  - reproducibility harness
- Sigma Labs operates the canonical instance during the grant period plus 12 months.
- Fallback maintainer process documented.
- No named fallback maintainer unless signed acceptance exists.
- `MCTI Schema v0.1` is published as a proposed schema.
- EIP or equivalent standardization pursued only after at least one independent adopter.

**Conflict Regime**
- Disclosures updated:
  - quarterly
  - within 30 days of any material change in team economic exposure to covered assets or protocols
- Recused team members may not author or approve for the affected asset or vault:
  - manual overrides
  - non-canonical commentary
  - dispute resolutions
  - detector exceptions
- Enforcement basis:
  - git commit attribution
  - recused contributors limited to general pipeline code, not asset-specific judgment

**Adoption Milestones**
- 2 curator feedback sessions:
  - 90 minutes each
  - structured format
  - written feedback published with consent
  - names disclosed unless confidentiality requested
- 21-day public schema review:
  - comments preserved publicly
  - resolution notes published
- 1 external reproducibility review:
  - reviewer name and method published
  - reviewer regenerates at least one registry snapshot from source code and onchain state alone
- 1 third-party trial:
  - non-Sigma-Labs team consumes registry in its own pipeline for at least 30 days
  - written feedback provided

**Future Work**
- One paragraph maximum.
- No budget.
- No timeline.
- No deliverable commitments.
- May mention exploratory stress-indicator research only as potential future work.
- Any Phase 2 must be a separate RFC judged on Phase 1 evidence.

**Explicitly Out of Scope**
- Probability of default estimates
- Intrinsic ratings
- Composite risk scores
- GARCH, HMM, or Merton calibration deliverables
- Vault parameter recommendations
- Curator endorsement or certification
- Insurance pricing claims
- Multi-protocol coverage commitments

**Pre-Submission Checklist**
- Collect Letters of Interest using the softer ask: “would review/use/test this registry if delivered.”
- Prepare Month 1 TVL snapshot methodology.
- Prepare detector library inventory supporting the “designed to detect” claim.
- Rewrite v0.3 around the registry, diff stream, labels, and manifests.
- Cut every sentence that implies Sigma Labs becomes Morpho’s risk authority.

This is the final architecture. The draft should now be a prose execution of this decision record, with no reintroduction of scoring or Phase 2 commitments through softer language.

---

*Debate finished 2026-04-23 12:49. 5 rounds.*

<details><summary><strong>Stats</strong></summary>

| Round | Agent | Duration |
|------:|:-----:|---------:|
| 1 | A | 148s |
| 1 | B | 46s |
| 2 | A | 79s |
| 2 | B | 52s |
| 3 | A | 104s |
| 3 | B | 39s |
| 4 | A | 55s |
| 4 | B | 33s |
| 5 | A | 39s |
| 5 | B | 46s |
| | **Agent A** | **425s** |
| | **Agent B** | **216s** |
| | **Total** | **641s** |

</details>



## Document 3: Chaos Labs Exits Aave

# Chaos Labs Exits Aave After Three-Year Risk Management Run

**Source:** [Omer Goldberg on X](https://x.com/omeragoldberg/status/2041185313163276302) — April 6, 2026

---

## Summary

Chaos Labs has officially departed as Aave's primary risk management partner after more than three years of service. Founder Omer Goldberg announced the departure citing misalignment on risk strategy, operational overload from other departing contributors, and unsustainable economics as Aave transitions to V4.

## Key Facts

- **Duration:** 3+ years as Aave's risk manager
- **Track record:** Zero material bad debt while Aave grew from $5.2B to $26B+ TVL, processed $2.5T+ in cumulative deposit volume, facilitated $2B+ in liquidations
- **Infrastructure built:** Risk Oracles, real-time parameter update systems, scaling Aave to 250+ markets across 19 blockchains

## Why Chaos Labs Left

### 1. Budget Misalignment
The V3 → V4 migration would substantially increase technical and operational demands. Chaos Labs requested $8M to manage the transition; Aave offered $5M — a $3M shortfall. Goldberg stated the firm operated at **negative margins for three years**; even a $1M increase would not achieve sustainability.

### 2. Architecture-Driven Risk Paradigm Shift
Goldberg explained: *"Risk is downstream of architecture. When the architecture changes completely, the risk engagement changes completely. Unlike turnkey solutions such as price oracles or proof-of-reserves, Risk Oracles and their accompanying systems are purpose-built for each protocol's architecture. When that architecture is rewritten from scratch, the risk infrastructure must follow."*

### 3. Contributor Exodus
The departure follows exits by other major Aave contributors:
- **BGD Labs** — main team handling V3, concluded engagement April 1, 2026
- **Aave Chan Initiative (ACI)** — stepped down amid governance tensions

The compounding departures increased Chaos Labs' workload and operational risk beyond what was sustainable.

### 4. Governance Tensions
Goldberg characterized a "deep misalignment" with Aave Labs over risk management strategy during the V4 rollout. The dispute reflects broader tensions within the protocol regarding centralized control over governance and revenue distribution.

## What Chaos Labs Built: Risk Oracles

Risk Oracles — first launched on Aave by Chaos Labs — allowed the protocol to **self-heal and update parameters in real time** in line with dynamic, volatile market conditions. This infrastructure enabled Aave to scale across 19 blockchains, streaming hundreds of parameter updates per month while maintaining operational rigor.

## Implications for DeFi Risk Management

- Aave must urgently identify replacement risk management expertise for both V3 and V4
- The departure highlights the **unsustainable economics of DeFi risk management** as a service — even at $5M+/year, Chaos Labs ran at negative margins
- The "risk is downstream of architecture" framing has direct implications for any protocol-specific risk model, including Morpho-focused proposals
- AAVE token traded at ~$95.38 (+3.9%) at time of announcement

## Relevance to Morpho Risk Model RFC

This departure is highly relevant context for Daniel's RFC:

1. **Validates demand:** If Aave's $26B protocol can't retain its risk manager, the market for risk infrastructure is real and underserved
2. **Pricing lesson:** Chaos Labs operated at negative margins for 3 years at $5M+/year — the RFC's $250K budget looks modest by comparison, but also raises questions about long-term sustainability of risk-as-a-service
3. **Architecture specificity:** Goldberg's point that risk systems must be purpose-built per protocol architecture supports the case for a Morpho-native risk model rather than a generic solution
4. **Governance risk:** The Aave governance dysfunction is a cautionary tale for any team seeking DAO grant funding — political alignment matters as much as technical quality

Sources:
- [Omer Goldberg on X](https://x.com/omeragoldberg/status/2041185313163276302)
- [Crypto Economy](https://crypto-economy.com/top-aave-risk-manager-chaos-labs-exits-amid-deepening-governance-rift/)
- [Crypto Times](https://www.cryptotimes.io/2026/04/07/chaos-labs-exits-aave-after-three-year-risk-management-run/)


## Document 4: LlamaRisk Response

# LlamaRisk: Ensuring Continuity of Aave's Risk Management

**Source:** [Aave Governance Forum](https://governance.aave.com/t/llamarisk-ensuring-continuity-of-aaves-risk-management/24397)
**Posted:** April 7, 2026 — LlamaRisk

---

## Summary

Following Chaos Labs' departure, LlamaRisk (16-person team, Aave risk provider since 2024, no external investors) proposes absorbing all departing functions and transitioning Aave's risk management from delegated services into **protocol-owned infrastructure**.

## Key Points

### What they're absorbing

| Function | Readiness |
|---|---|
| Supply/Borrow cap automation | Transitioning to CRE automation |
| Interest rate parameter management | Full IRM coverage via manual AGRS |
| Liquidation parameter calibration | All markets + dynamic RWA models |
| E-Mode configuration | Active, including Liquid E-Mode |
| Oracle design & sanity checks | CAPO, adaptive feeds, CRE-native |
| Risk oracle infrastructure | Protocol-owned, replacing closed-source |
| New asset/chain evaluation | Full technical, risk, and legal |
| V4 risk architecture | Hub & Spoke, credit lines, Umbrella |
| Monitoring & alerting | Real-time deviation tracking |

### Core argument: protocol-owned > delegated

LlamaRisk critiques the old model for concentrating critical responsibility in a **closed-source external provider** with limited protocol visibility. Two incidents support this:

1. **March 10 wstETH CAPO Oracle Malfunction** — $1.03M in borrower damages, 47 wrongful liquidations, 4+ hours of depressed pricing. LlamaRisk couldn't detect or block it because of black-box architecture.
2. **February Slope2 Analysis** — significant divergence in risk oracle behavior during utilization spike, revealing undisclosed methodology gaps.

### Two-phase transition

- **Phase 1:** Immediate migration of Manual Risk Steward controls with co-ownership
- **Phase 2:** Progressive transition to protocol-owned CRE architecture — transparent, verifiable, no privileged access

### Resources

LlamaRisk: *"absorbing the full scope of a departing risk provider while simultaneously scaling protocol-owned infrastructure for V4 and Horizon cannot happen at current resource levels."* Detailed renewal proposal with budget coming soon.

---

## Relevance to Morpho RFC

1. **"Protocol-owned infrastructure"** is exactly the framing for our open-source, grant-funded transparency layer. LlamaRisk is making the same argument on Aave that we're making on Morpho.

2. **Closed-source risk providers are a liability.** The wstETH CAPO incident — $1M in damages because the risk oracle was a black box — is the strongest possible argument for auditable, reproducible risk tooling. Our RFC's "every output traceable to an onchain read" directly addresses this.

3. **16-person team absorbing Chaos Labs' scope** — shows the scale required for full risk management. Our RFC wisely targets the transparency layer only, not full parameter management.

4. **LlamaRisk's infrastructure stack** (LlamaGuard NAV, CRE automation, stress testing, VaR, liquidation cascade analysis) shows the mature version of what a risk provider looks like. Useful reference for our roadmap.

5. **The "protocol-owned" vs "vendor" debate** is live and active in DeFi governance right now. Our pitch — *"fund the commons, don't rent a vendor"* — rides this wave.


## Document 5: Prosperi — Physics of On-Chain Lending

# The Physics of On-Chain Lending (I)

**Developing Appropriate Risk Pricing Frameworks for Decentralized Lending**

By Luca Prosperi | April 6, 2026

---

## Overview

This article examines mathematical frameworks for pricing credit risk in decentralized lending markets, particularly within Morpho's architecture. The author argues that current market pricing significantly undercompensates lenders for the risks they bear.

## Key Thesis

"Overcollateralized lending on liquid crypto-native collateral is Morpho's bread and butter...we observe consistently narrower spreads (5-10x) over risk-free vs. what rational lenders would require."

---

## Mathematical Framework

### Merton Model Application

The analysis adapts Robert Merton's 1974 structural credit model to DeFi contexts. In simplified form, a firm with assets worth V and debt L defaults when asset value falls below L at maturity. This creates debt as equivalent to "a risk-free bond and a short put option."

### Black-Cox Extension: First-Passage Problem

Rather than observing collateral only at maturity, DeFi protocols monitor continuously via oracles. When collateral reaches a liquidation threshold (LLTV), positions are automatically liquidated. The probability model uses geometric Brownian motion:

**dC = μC dt + σC dW**

This yields a closed-form solution for first-passage probability—the likelihood that collateral touches the barrier within timeframe T before recovering.

### Credit Spread Formula

The annualized credit spread should be:

**s = −(1/T) ln(1 − LGD × P(τ_B ≤ T))**

Where LGD is loss given default. For liquid crypto collateral like ETH/BTC, this approximates the liquidation incentive.

---

## Critical Findings

### Simulation Results

For an ETH position at 70% LTV against 86% LLTV with 75% annualized volatility:

- **Distance to Default**: 0.59 sigma units (alarmingly close)
- **Without rebalancing**: 70-80% probability of liquidation within one year
- **Required spread**: 400+ basis points

However, observed depositor rates in Morpho's USDC markets range from 0-20 basis points—**a 20-100x underpricing relative to theoretical requirements**.

### Rebalancing Assumptions

- **Pure jump risk only** (continuous rebalancing): 45 bps minimum
- **20% extra capital available**: 350 bps spread needed
- **100% extra capital**: 130 bps spread needed
- **Realistic daily monitoring with finite capital**: 250-400 bps

---

## Why Is Credit Mispriced?

The article identifies five compounding factors:

1. **Depositor Misperception**: Retail users treat USDC deposits as risk-free savings, not as short puts on crypto collateral. They're "implicitly selling puts without recognizing it."

2. **Regulatory Arbitrage**: Stablecoin legislation restricts traditional intermediaries from offering competing yields, making Morpho the "most convenient, immediate, no-KYC non-custodial savings account."

3. **Survivorship Bias**: Major losses hit specific vaults; flagship Steakhouse and Gauntlet-curated USDC markets have avoided catastrophic losses, reinforcing a "safe yield" narrative.

4. **Bull Market Masking**: Under real-world (physical) market conditions, positive ETH/BTC returns reduce observed liquidation frequency, though risk-neutral pricing remains invariant to drift.

5. **Token Subsidies**: MORPHO incentives compress observed rates by subsidizing both borrowers and lenders.

---

## Leverage Looping Strategies

The analysis distinguishes looping trades (depositing asset A, borrowing B, converting back) as fundamentally different from simple lending:

- **Risk type**: Basis volatility, not directional price risk
- **Carry sources**: (Staking yield − borrow rate) × leverage
- **Historical example**: sUSDe looping at 7-10x leverage during high funding rates peaked at $1b+ TVL through Maker → Spark → Morpho → Ethena tower

At moderate leverage (3-5x), basis would need 15-30% moves to trigger liquidation. Above 10x, strategies become convex bets that "blow up precisely during liquidity crises."

---

## RWA Collateral: Models Break Completely

For non-crypto-native collateral, every Merton assumption fails:

1. **Unobservable Volatility**: Prices are quarterly marks, not market prices. Smoothed marks artificially suppress measured volatility, creating dangerous illusion of safety.

2. **Discrete Monitoring Defeats First-Passage**: Weekly or monthly updates allow collateral to fall far below LLTV before detection. The effective barrier shifts by approximately **β·σ·√(Δt)** where β ≈ 0.58.

3. **Liquidation Isn't Atomic**: Selling private credit takes weeks/months. Collateral deteriorates during delays, compounding losses with fire-sale discounts of 20-50%.

4. **Enforceability**: Tokenized claims still require legal enforcement across jurisdictions.

**Author's Position**: "I remain extremely bearish on non-crypto-native collateralized lending...adverse selection risk on those assets is high."

---

## Morpho v2: Intent-Based Markets

The upcoming upgrade introduces intent-based matching and fixed-rate, fixed-term loans. While ambitious, the author notes missing pieces:

- Insufficient solver depth for illiquid pairs
- Duration risk management systems remain underdeveloped
- Institutional capital requirements for counterparty certainty remain unmet

---

## Conclusion

Current DeFi lending spreads represent profound mispricing relative to mathematical models accounting for volatility, first-passage dynamics, and realistic rebalancing constraints. The gap reflects regulatory arbitrage, retail misperception, and survivorship bias rather than accurate risk pricing. The mispricing "will become visible when the market turns."


## Document 6: LucaB — Curation Economics Thread

# LucaB: "If you're thinking of starting a bootstrapped DeFi curation business: don't"

**Source:** [@LucaB_Cassa thread](https://x.com/LucaB_Cassa/status/2041410696378982483) — April 7, 2026
**Stats:** 46 likes, 11.7K views

---

## The Thread

**1.** If you're thinking of starting a bootstrapped DeFi curation business: don't. Here's the math.

**2.** What curation requires at bare minimum:
1. Biz dev (relationships with protocols, capital sources)
2. Quant (modeling risk, pricing strategies). Market rate: $200-250k/year
3. Developer (automation, monitoring, reallocation bots)

That's three people BARE minimum.

**3.** Revenue model: performance fees. Problem: you only collect fees after you have TVL. Bigger problem: you need to pay salaries while you're building that TVL. Bootstrap problem from hell.

**4.** The effort/reward mismatch is brutal. You're responsible for $100M+ in user funds. Monitoring 24/7. Reputation on the line. Revenue in a good month? Not great, unless you are chasing high returns. Which means you'll spend your profits in lawyers eventually.

**5.** Who makes it work: curators who are already doing something else. Asset managers deploying their own capital on-chain. Protocol teams running their own liquidity. Incubators supporting ecosystem projects. Curation is a complement. Not a product.

**6.** The best curators aren't curator-only-businesses. They're smart capital allocators who happen to operate on-chain. If you're starting from zero with curation as your only revenue line, the math doesn't work.

---

## Relevance to RFC

This thread directly shapes the sustainability argument:

1. **Our team fits the "who makes it work" profile.** Daniel curates vaults while doing treasury management. Amaury runs Ellen Capital. Vincent does independent research. Nobody is curation-only. This is a strength, not a weakness.

2. **The quant cost validates our pricing.** LucaB says a quant alone costs $200-250K/yr. A $20K/yr risk feed subscription is a bargain vs hiring in-house — reinforces the curator-subscription business model.

3. **"Curation is a complement, not a product"** — risk tooling sold to curators is the product that makes curation viable. We're not building a curation business; we're building the infrastructure curators need but can't justify building alone.

4. **The bootstrap problem** — performance fees only flow after TVL. A grant bridges this gap. The RFC should frame the grant as solving exactly this cold-start problem for risk infrastructure.


## Document 7: Meeting Feedback (from prep notes Part 4)

## Part 4: Meeting Feedback

1. **Clarify post-hoc claims.** We are not claiming we would have predicted past incidents — we are saying that once the tooling is operational, we can demonstrate it would have flagged the structural weaknesses behind USD0++, xUSD, and Resolv/USR before they materialized. This does not imply we will catch every future risk.

2. **Separate what's done from what's ahead.** Draw a clear line between the DIG + YTD proof-of-concept (built) and the remaining work needed to reach our milestones — notably Amaury's risk factor model (calibration, backtesting, live scoring).

3. **Add ETAs to each goal.** Every claimed deliverable needs a concrete target date.

4. **Get Letters of Interest from curators.** Daniel has a list: Steakhouse, Gauntlet, Re7, Rockaway/MEV, etc. Curator endorsements materially strengthen a governance proposal.

5. **Add market-facing milestones.** Example: “In 3 months we deliver DIG + YTD tooling to [curator X]'s team for trial and feedback.” Real users testing real outputs.

6. **Understand what Morpho actually wants to fund.** Is the goal a retail-facing risk score on the Morpho GUI, or an active risk monitoring product for curators? According to Albist, Morpho leans toward user education. This shapes the entire deliverable framing.

7. **Move Amaury's technical model to a separate appendix.** Keep the main RFC focused on the transparency layer and proof of work.
