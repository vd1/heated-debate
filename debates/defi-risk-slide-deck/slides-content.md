# DeFi Asset Risk Pipeline — Slide Deck Content
## Amaury Denny, Ellen Capital, March 2026

### Slide 1 (Title)
DeFi Asset Risk Pipeline — Phase 0 — Foundation Layer
On-Chain Data Pipeline · Asset Taxonomy · Proprietary PD Scoring

### Slide 2 (Agenda)
I. Motivation & Design Principles
II. Case Studies — Oct 10 crash · Nov stablecoin contagion · Aave oracle
III. Asset Taxonomy — Dependency unwrapping, five categories
IV. Quantitative Risk Model — Five PD components
V. PD Aggregation & Rating — Independence, recursion, credit scale
VI. Limitations & Roadmap

### Slide 3 (Section divider: I. Motivation)

### Slide 4 (Context)
- $30B+ TVL in DeFi lending (Morpho, Aave, Euler, Spark)
- Over-collateralised lending => risk = collateral quality
- Credora/RedStone: consensus ratings, quant + qualitative
- Most funds: manual DD, no systematic framework
Goal: A Bloomberg-grade pipeline producing proprietary PD scores and credit-scale ratings (AAA-D) for every major DeFi collateral asset.

### Slide 5 (Design Principles)
1. Purely Quantitative: Every input measurable, computable, reproducible. Zero qualitative judgment in the scoring loop.
2. On-Chain Native: Primary source = Ethereum RPC reads. No CoinGecko, no DeFiLlama.
3. Cross-Protocol Extensible: Asset risk != lending platform risk. Same USDC score on Morpho and Aave.
4. Dependency-Aware: Composed assets decomposed recursively. Each layer scored independently.

### Slide 6 (Section divider: II. Case Studies)

### Slide 7 (October 10, 2025 — The $19B Flash Crash)
What happened:
- $19B liquidated in ~24h
- $3.21B in one minute (21:15 UTC)
- 1.6M traders liquidated
- BTC -14%, ETH -12%
- Trigger: US-China tariff shock

What our model captures:
- PDmkt: vol spike sigma_7d >> 2*sigma_90d, stress kappa triggered
- PDliq: DEX depth collapse
- PDorc: Chainlink heartbeat delays

What it misses: all three spiked simultaneously, but independence assumption treats them separately.

### Slide 8 (November 2025 — DeFi Stablecoin Contagion)
What happened:
- Balancer V2 exploit -> cascade
- Stream Finance: $93M erased, xUSD -> $0.17
- YU stablecoin depegged to $0.44
- Half a dozen stablecoins lost peg
- $285M+ contagion losses

What our model captures:
- PDsc: Balancer bytecode complexity
- PDcpty: supply velocity spike
- PDmkt: |delta_t| > 5% sustained
- PDliq: pool imbalances

What it misses: composability creates hidden correlations across assets. Recursive PD helps but doesn't capture contagion dynamics.

### Slide 9 (March 2026 — Aave wstETH CAPO Oracle)
What happened:
- $27M forced liquidations
- No market crash, no attack
- CAPO oracle: stale parameters
- Max wstETH ~= 1.19 ETH vs market ~= 1.23
- Chainlink oracle was correct
- Failure in the risk oracle layer

What our model captures:
- PDorc: Oracle-DEX deviation 4%
- PDsc: config update < 30d
- PDmkt: R_dot_t < 0 on wstETH

What it misses: no governance factor (Z6) to detect admin config changes. Oracle and SC risks conflated.

### Slide 10 (Section divider: III. Asset Taxonomy)

### Slide 11 (The Dependency Unwrapping Principle)
Definition 1 (Dependency Chain): Every DeFi asset A decomposes into a DAG D = {d1, ..., dn}. Each di = asset | protocol | custodian | oracle | strategy. depth(A) = longest path in the DAG.

Example: sUSDe (Ethena) — depth 3:
| Layer | Component       | Type          | Risk vectors                          |
|-------|----------------|---------------|---------------------------------------|
| 3     | sUSDe vault    | ERC4626       | Smart contract, redemption delay      |
| 2     | USDe stablecoin| Synthetic     | Depeg, funding rate inversion         |
| 1b    | Short ETH perp | CEX position  | Counterparty (exchange)               |
| 1a    | stETH collateral| LST (Lido)   | Slashing, validator set, oracle       |
| 0     | ETH            | Native L1     | Market volatility                     |

### Slide 12 (Where Unwrapping Works)
- wstETH (depth 2): wstETH -> stETH / Lido staking -> ETH. Clean, unidirectional DAG.
- Yield tokens on Morpho (depth 2-3): steakUSDC -> USDC supply on Morpho -> USDC -> USD. Vault strategy transparent.
Key property: clean DAGs with on-chain-readable exchange rates.

### Slide 13 (Where Unwrapping Breaks)
- sUSDe / USDe (Ethena): Naive DAG: sUSDe -> USDe -> strategy -> ETH. Reality: USDe is a senior tranche of sUSDe. sUSDe absorbs losses first. DAG direction is inverted in risk terms.
- RWAs (Real World Assets): Dependencies are off-chain (SPVs, legal entities, real estate). Cannot be read from the EVM. Breaks the on-chain-native principle.
=> Known structural limitation of the current model.

### Slide 14 (The Five Asset Categories)
1. Stablecoins (USDC, DAI, USDe, GHO, PYUSD): Fiat-backed | Crypto-backed/CDP | Algorithmic/Synthetic
2. Liquid Staking Tokens (wstETH, rETH, cbETH): Exchange rate vs underlying, validator risk, withdrawal queues
3. Wrapped / Bridged (WBTC, tBTC, cbBTC): Custodian/bridge risk, backing ratio
4. Native L1 (ETH, BTC): Pure market volatility, no counterparty, depth 0
5. Yield-Bearing Vaults (sUSDe, sDAI, steakUSDC, Pendle PT): Recursive: own contract + underlying strategy + base asset
Claims: Mutually exclusive. Covers all collateral on Morpho, Aave, Euler, Spark.

### Slide 15 (Section divider: IV. Risk Model)

### Slide 16 (Definition of Default)
PD_1Y(A) = P[min_{t in [0,T]} V_t(A)/V_peg_0(A) < 0.95], T = 1 year
V_peg_0 = peg target (stables) | underlying value (LSTs) | USD (native).

Five PD components (assumed independent): PDmkt, PDcpty, PDsc, PDliq, PDorc
PDtotal = 1 - prod_{k=1}^{5} (1 - PD_k)

### Slide 17 (PDmkt — Native L1: ETH, BTC)
Extreme Value Theory with Generalised Pareto Distribution
Log-returns: r_t = ln(P_t/P_{t-1}).
GPD exceedance above threshold u (95th percentile of losses):
F_u(y) = 1 - (1 + xi*y/sigma)^{-1/xi}, y > 0
PD from tail: PDmkt = F_bar(u) * (1 + xi*(x-u)/sigma)^{-1/xi}
x = -ln(0.95) (5% loss threshold), xi, sigma via MLE on rolling 90d.

### Slide 18 (PDmkt — Stablecoins & LSTs)
Stablecoins — Peg Deviation:
delta_t = P_t - P_peg
PD_mkt_stable = P[|delta_t| > 0.05] + lambda * 1[trend]
lambda = momentum penalty (24h rolling regression slope on delta_t).

LSTs — Exchange Rate:
R_t = convertToAssets(10^18)
PD_mkt_LST = P[R_t/R_{t-Delta} < 0.95]
Healthy LST: R_t monotonically increasing. R_dot_t < 0 over 7d => stress multiplier.

### Slide 19 (PDmkt — Yield-Bearing & Stress Detection)
Yield-Bearing Tokens — Exchange Rate + Yield Decay:
PD_mkt_vault = PD_mkt_rate + alpha * max(0, (APY_{t-30d} - APY_t) / APY_{t-30d})
alpha captures spiral risk: declining yield -> withdrawals -> liquidity crunch -> depeg.

Stress Regime Detection (all categories):
sigma_7d > 2 * sigma_90d => PDmkt := PDmkt * kappa, kappa in [1.5, 3.0]

Multi-Horizon Weighting:
PDmkt = 0.5 * PD(7d) + 0.3 * PD(30d) + 0.2 * PD(90d)

### Slide 20 (PDcpty — Counterparty Risk)
All qualitative inputs replaced by on-chain proxies.
Universal metrics: Holder Gini (top-1000), Supply velocity |Delta totalSupply|/totalSupply, Cross-chain concentration.
Category-specific: Stables: reserve ratio, redemption flow. LSTs: validator Gini, queue pressure. Wrapped: backing ratio (< 1.0 = risk). Vaults: withdrawal queue / TVL.
PDcpty = weighted sum of normalised proxies. Weights calibrated per sub-category.

### Slide 21 (PDsc — Smart Contract Risk)
Zero audit scores. Entirely from bytecode + on-chain history.
Proxies: contract age (proportional to ln(days)), Lindy TVL (integral of TVL dt), bytecode size, DELEGATECALL count, upgrade recency (< 30d = risk), tx volume, unique callers.
Exploit Fingerprint Detection: Opcode frequency v in R^256, function selector set S:
sim(A, E) = cos(v_A, v_E) * |S_A intersect S_E| / |S_E|
Reference DB of ~50 exploited contracts. sim > 0.6 => additive PD penalty.

### Slide 22 (PDliq & PDorc)
PDliq — Liquidity Risk (all from DEX pool reads):
- Depth ratio: depth at +/-2% / total supply
- Bid-ask spread at $100k
- Liquidity vol: sigma(depth) 30d
- Withdrawal queue pressure
- Historical floor: min(depth) 90d
Illiquid assets amplify cascades.

PDorc — Oracle Risk:
- Heartbeat compliance
- Oracle-DEX deviation over 30d
- Transmitter count & diversity
- Max staleness observed
Deviation > 1% frequent = inaccurate.
Oracle risk interacts with market risk during stress, but not captured under independence assumption.

### Slide 23 (Section divider: V. PD Aggregation & Rating)

### Slide 24 (Simple Assets — Independence Aggregation)
Total PD (no dependency chain):
PDtotal(A) = 1 - prod_{k in {mkt, cpty, sc, liq, orc}} (1 - PD_k(A))
Independence assumption: the five components are treated as independent failure modes. Known simplification. Primary motivation for v2 of the model.

### Slide 25 (Composed Assets — Recursive Aggregation)
For asset A with dependencies {d1, ..., dn} at risk weights {w1, ..., wn}:
PDtotal(A) = 1 - (1 - PDown(A)) * prod_{i=1}^{n} (1 - w_i * PDtotal(d_i))
- PDown(A): PD from A's own contract (smart contract + oracle)
- PDtotal(d_i): recursively computed total PD of each dependency
- w_i in [0, 1]: risk weight by dependency type
- Recursion terminates at Native L1 tokens (depth 0, no dependencies)

### Slide 26 (PD-to-Rating Mapping)
| Rating | PD_1Y range   | Risk tier        | Expected assets       |
|--------|--------------|------------------|-----------------------|
| AAA    | < 0.05%      | Investment Grade | —                     |
| AA     | 0.05%-0.15%  | Investment Grade | USDC, ETH             |
| A      | 0.15%-0.40%  | Investment Grade | DAI, wstETH, WBTC     |
| BBB    | 0.40%-1.0%   | Investment Grade | GHO, rETH             |
| BB     | 1.0%-3.0%    | Speculative      | Smaller LSTs          |
| B      | 3.0%-8.0%    | Speculative      | Algo stables          |
| CCC    | 8.0%-20%     | High Risk        | Experimental          |
| CC     | 20%-40%      | High Risk        | —                     |
| C      | 40%-70%      | Extreme Risk     | —                     |
| D      | > 70%        | Default          | —                     |
Compatible with traditional credit scales (S&P/Moody's mapping).

### Slide 27 (Section divider: VI. Limitations & Roadmap)

### Slide 28 (Known Limitations of v1)
| Limitation             | Impact                                                                                              |
|------------------------|-----------------------------------------------------------------------------------------------------|
| Independence           | prod(1-PD_k) assumes factors don't interact. Underestimates tail risk 2-4x.                        |
| Static weights         | Multi-horizon weights (0.5, 0.3, 0.2) and stress kappa hand-tuned. No principled calibration.       |
| No regime detection    | Binary threshold (sigma_7d > 2*sigma_90d). No continuous regime awareness.                          |
| DAG simplification     | sUSDe: USDe is senior tranche of sUSDe. Risk direction inverted. RWAs: off-chain deps invisible.    |
| No governance factor   | Admin key abuse, parameter mutations, governance attacks not captured.                               |
| On-chain only          | Off-chain risks (legal, regulatory, custodian solvency) out of scope by design.                     |

### Slide 29 (Roadmap)
- Phase 0 — Asset Registry & Risk Pipeline (current): Taxonomy, 5-component PD model, data pipeline, AAA-D ratings
- Phase 1 — Lending Market Pipeline: Consumes asset PD to compute market-level PSL (Probability of Significant Loss)
- Phase 2 — Model v2: Factor correlation, GARCH residuals, HMM regime-switching, governance factor
- Phase 3 — Portfolio Optimisation: Automated allocation engine using asset + market risk scores

### Slide 30 (Questions?)
Amaury Denny · Ellen Capital
