## Resolv USR Blast-Radius Graph as Live Demo for Friday's DeFi Working Group

### Context

The DeFi working group meets at ENS this Friday (April 3, 2026). Johan reserved R2bis. The Resolv $25M hack — single compromised EOA, no multisig, unauthorized USR minting — was shared in the group chat days ago and is still fresh.

### The Resolv USR incident

Resolv's USR stablecoin suffered a $25M exploit when a single externally owned account (the mint authority) was compromised. The attacker used this key to mint unauthorized USR tokens. Key characteristics:

1. **Single point of failure**: No multisig on the mint authority — one compromised key was sufficient
2. **Unauthorized minting**: The attacker could mint arbitrary USR, diluting all holders
3. **Cascade exposure**: USR was integrated into lending markets, DEX pools, and vaults — the unauthorized supply propagated through all downstream positions
4. **Known ground truth**: Unlike slow-burn collapses, we know exactly which address was compromised and when, making this ideal for validating risk models

### Proposal

Build a minimal USR neighborhood graph using `neigh.py` from KilDef:

1. **Seed the graph**: Run the double-BFS traversal starting from USR's token address on the relevant chain
2. **Inject risk**: Set `risk=1.0` at the compromised mint authority address
3. **Run risk propagation**: Use `neigh_risk.py`'s `analyze()` pipeline — leverage cycle detection, blast radius calculation, exit liquidity assessment, opacity scoring
4. **Validate against ground truth**: The blast radius should correlate with the actual $25M in losses. The leverage cycles (if any) should match the known integration paths.

### What this gives the working group

- A **second case study** beyond the Stream xUSD collapse that validated the original DIG risk signals architecture (March 26 debate)
- A test of the **typed-edge attenuation model** on a different failure mode: key compromise causing unauthorized minting, rather than a slow depeg from opacity/leverage
- A **concrete visual** to anchor Friday's session — showing how a single-key compromise radiates through vaults, LPs, and downstream lending positions
- Validation that `neigh_risk.py`'s evidence bundles correctly flag the risk pattern (single mint authority = opacity signal; downstream lending = blast radius)

### Key questions for debate

1. **Graph construction**: What's the right BFS depth for USR? The DIG debate settled on depth=3 for xUSD. USR may need different parameters depending on how deeply it's integrated.

2. **Risk seeding**: Should we seed risk=1.0 at the mint authority (the compromised key), at the USR token itself (the minted supply), or both? The propagation model was designed for token-level risk, not key-level.

3. **Attenuation model**: The typed-edge attenuation from the March 26 debate (PLEDGE edges attenuate by haircut, SWAP edges by pool share) was designed for depeg cascades. Does it apply to a mint-authority compromise? A minting attack inflates supply — the risk propagation might need different weights.

4. **Missing signals**: The current `neigh_risk.py` has cycle detection, blast radius, exit liquidity, and opacity. For a key-compromise scenario, we might also want:
   - **Governance concentration**: How many keys control minting? (Not currently in the graph)
   - **Supply cap enforcement**: Does the protocol have on-chain mint caps? (Would need adapter support)

5. **Presentation format**: For a 30-45 minute working group slot, what's the right level of detail? Full graph visualization? Summary table? Live demo of running neigh.py + neigh_risk.py?

6. **Temporal dimension**: Can we reconstruct the pre-hack graph state to show what the risk signals would have looked like *before* the compromise? This would be the strongest argument for the system's predictive value.

### Reference material

- DIG risk signals debate (March 26): `KilDef/debates/dig_risk_signals/20260326_091126.md`
- Risk engine implementation: `KilDef/neigh/neigh_risk.py`
- Graph data model: `KilDef/neigh/neighborhood_common.py`
- BFS traversal engine: `KilDef/neigh/neigh_bfs.py`
