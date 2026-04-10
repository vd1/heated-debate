# Context: KilDef Notes on Yield Sources

From the KilDef project research notes:

## 4 sources of yield:

- farming (incentives)
- chain staking (underlying chain fees)
- arb-fund (liquidation, arbitrage, ruin of other people on perps, etc)
- RWAs

## Related observations from notes:

- Ethena's sUSDe blends perp funding rates (arb-fund) with MENA token incentives (farming)
- Morpho vaults mix lending spreads with MORPHO token incentives
- Hard-coded oracle exploits create yield from mispricing (arb-fund edge case)
- Term finance / termMax offer fixed-rate lending (lending spread as yield)
- Resolv's USR exit shock shows how curator behavior affects borrow rates across markets
- The question of sustainability: RWA is the only source backed by cash flows external to crypto
- "Who is the payer?" analysis:
  - Farming: protocol treasury / token holders (dilution)
  - Staking: network users (tx fees)
  - Arb-fund: other market participants (zero-sum)
  - RWA: real-world borrowers / governments
  - LP fees?: traders (for immediacy)
