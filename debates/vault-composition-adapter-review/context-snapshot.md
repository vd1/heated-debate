# Context: Vault Composition Adapter Design + Relevant Source Files

## 1. Design Spec

# Vault Composition Adapter — Design Spec

**Date:** 2026-04-02
**Status:** Draft
**Module:** `neigh/neigh_adapter_compositions.py`

## Problem

The neighborhood BFS relies on Enso's `underlyingTokens` field to discover
token composition. For opaque vaults — tokens whose backing is managed
off-chain or by a multisig — Enso returns `type: "base"` with no underlyings.
The ERC-4626 `asset()` probe only yields the single deposit token, not the
vault's internal allocation.

**Example:** Elixir deUSD is a mintable ERC-20 governed by a Gnosis Safe
multisig. Its reserves were allocated across multiple vaults (including
Elixir xUSD), but none of this is discoverable on-chain via a standard
interface. The November 2025 depeg was caused by a cyclical configuration
between deUSD and xUSD — a cycle the risk engine *would* have detected if the
composition edges existed in the graph.

**Impact on risk signals:**

| Signal | Without composition | With composition |
|--------|-------------------|-----------------|
| Leverage cycles | Blind — stops at opaque node | Detects cycles through allocations |
| Blast radius | Misses downstream exposure | Walks through to underlying markets |
| Exit liquidity | Cannot find redemption paths | Reaches terminal assets |
| Opacity | 100% (entire TVL unaccounted) | Drops to reflect verified fraction |

## Design

### Composition Manifest

A JSON file mapping opaque vault addresses to their known allocations. One
file per chain, or a single file keyed by chain ID.

```json
{
  "1": {
    "0x15700b564ca08d9439c58ca5053166e8317aa138": {
      "label": "deUSD",
      "protocol": "elixir",
      "source": "manual:2026-03-15",
      "allocations": [
        {
          "address": "0x...",
          "edge_type": "CONTAINS",
          "label": "Elixir xUSD vault",
          "weight": 0.45
        },
        {
          "address": "0x...",
          "edge_type": "CONTAINS",
          "label": "Morpho USDC market (via strategy)",
          "weight": 0.30
        }
      ]
    }
  }
}
```

**Fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `label` | yes | Human-readable name of the opaque vault |
| `protocol` | yes | Protocol slug (e.g., `elixir`, `ethena`) |
| `source` | yes | Provenance: `manual:YYYY-MM-DD` for curated, `onchain:reader_name` for programmatic |
| `allocations[].address` | yes | Target vault/position address |
| `allocations[].edge_type` | yes | Composition edge type: `CONTAINS` (multi-asset) or `VAULT` (single-underlying) |
| `allocations[].label` | no | Human-readable name of the target |
| `allocations[].weight` | no | Allocation fraction (0.0–1.0). If absent, equal split assumed |

### Provenance and Opacity

The `source` field directly feeds the risk engine's opacity classification:

| Source pattern | Opacity proof class |
|---------------|-------------------|
| `onchain:*` | `onchain_provable` |
| `manual:*` | `offchain_asserted` |

This means manually-curated entries still contribute to opacity (they're
attested, not verified), but they're far better than the current 100%
unaccounted state.

### Adapter: `neigh_adapter_compositions.py`

**Signature:**

```python
def _attach_composition_edges(
    graph: Graph,
    manifest_path: str,
    cache: EnsoCache,
    chain_id: int,
    onchain_probe: bool,
    downstream_depth: int,
) -> None:
```

**Flow:**

1. Load and validate the manifest JSON
2. Iterate all token nodes in `graph.nodes`
3. For each node, check if `(chain_id, address)` has a manifest entry
4. If found, for each allocation:
   a. Create a child token node (or reuse if already in graph)
   b. Add a composition edge (CONTAINS or VAULT) from the opaque node to the child
   c. Tag the edge with `source` from the manifest entry
5. Re-enter downstream BFS from each injected child — they get full Enso
   expansion, ERC-4626 probes, and recursive downstream traversal up to
   `downstream_depth` remaining hops
6. Record in `graph.meta["compositionAdapterEntries"]` which manifest entries
   were applied (for completeness reporting)

### Pipeline Position

```
Enso BFS (downstream + upstream)
  --> composition adapter (fills gaps, re-enters BFS)   <-- NEW
  --> venue adapters (Morpho, Aave, Euler, UniV3)
  --> enrichers (Pendle)
  --> risk engine
```

The adapter runs *after* the initial BFS but *before* venue adapters. This
ensures that:
- Injected children get their own downstream expansion
- Venue adapters see the full token set (including composition children)
- The risk engine operates on the complete graph

### CLI Integration

**Flag:** `--with-compositions <path>`

```bash
uv run python neigh/neigh.py 0x15700b...aa138 \
  --with-compositions manifests/mainnet.json \
  --with-morpho --with-euler --with-risk \
  --outdir graphs/deusd
```

### Integration with `neigh_bfs.py`

The `build_neighborhood_double_bfs` function gains a new parameter:

```python
def build_neighborhood_double_bfs(
    ...
    compositions_manifest: Optional[str] = None,  # NEW
) -> Graph:
```

After the downstream and upstream BFS loops complete, and before venue
adapters run:

```python
if compositions_manifest:
    _attach_composition_edges(
        graph=g,
        manifest_path=compositions_manifest,
        cache=cache,
        chain_id=chain_id,
        onchain_probe=onchain_probe,
        downstream_depth=downstream_depth,
    )
```

### Risk Engine Changes

**None required.** The injected edges are standard composition edges
(CONTAINS/VAULT) already in `COMPOSITION_EDGES`. All five signals traverse
them without modification.

The only addition: `assess_completeness()` in `neigh_risk.py` should report
which composition manifest entries were applied, alongside adapter coverage.

### Testing

1. **Unit test** (`test_neigh_adapter_compositions.py`):
   - Mock graph with an opaque node, run adapter with a test manifest
   - Assert child nodes and composition edges are created
   - Assert edge source matches manifest provenance
   - Assert BFS re-entry expands children downstream

2. **Risk regression** (`test_neigh_risk.py` addition):
   - Build a graph with deUSD-like opaque node
   - Run risk analysis without composition → opacity = 100%
   - Run with composition manifest → opacity drops, blast radius changes

3. **Integration test**:
   - Full pipeline on a real opaque vault address with manifest
   - Verify graph contains expected downstream structure through injected
     composition edges

## Files Changed

| File | Change |
|------|--------|
| `neigh/neigh_adapter_compositions.py` | **New.** Composition adapter implementation |
| `neigh/neigh_bfs.py` | Add `compositions_manifest` parameter, call adapter after BFS |
| `neigh/neigh.py` | Add `--with-compositions` CLI flag |
| `neigh/neigh_risk.py` | `assess_completeness()` reports manifest entries applied |
| `neigh/test_neigh_adapter_compositions.py` | **New.** Unit tests |
| `neigh/test_neigh_risk.py` | Add opacity regression test with composition |
| `manifests/mainnet.json` | **New.** Initial manifest with deUSD entry (to be populated after research) |
| `neigh/README.md` | Document new flag and manifest format |

## Open Questions

1. **Manifest location convention:** should manifests live in `neigh/manifests/`
   or at the repo root in `manifests/`?
2. **Staleness detection:** should the adapter warn if a `manual:YYYY-MM-DD`
   source is older than N days?
3. **Auto-discovery:** in the future, could a "composition watcher" periodically
   scan known protocols and update manifests automatically?

## 2. neigh_bfs.py (BFS builder)

# -*- coding: utf-8 -*-
"""
BFS traversal + Enso caching for neighborhood graph builder.
"""

from __future__ import annotations

import time
from typing import Any, Dict, List, Optional, Set, Tuple, Deque
from collections import deque

from providers.enso import (
    fetch_enso_token_with_price,
    find_tokens_with_underlying,
    EnsoAPIError,
)

from neighborhood_common import (
    Edge,
    Graph,
    Node,
    edge_type_for_source_role,
    node_id,
    node_from_enso_payload,
    normalize_addr,
    token_node_id,
)

from protocols import web3 as web3_utils
from utils import get_logger

from neigh_adapter_aave import _attach_aave_market_nodes
from neigh_adapter_euler import _attach_euler_market_nodes
from neigh_adapter_morpho import _attach_morpho_market_nodes
from neigh_enricher_pendle import _enrich_pendle_nodes
from neigh_adapter_univ3 import _attach_univ3_pool_nodes
from neigh_helpers import fetch_expired_pendle_addresses

log = get_logger("neigh")

_ERC4626_ASSET_ABI = [{"inputs":[],"name":"asset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]


def _erc4626_asset(chain_id: int, address: str) -> Optional[str]:
    """Return the ERC-4626 asset() address, or None if not a vault."""
    w3 = web3_utils.get_web3(chain_id)
    if not w3:
        return None
    try:
        c = w3.eth.contract(address=w3.to_checksum_address(address), abi=_ERC4626_ASSET_ABI)
        return normalize_addr(c.functions.asset().call())
    except Exception:
        return None


# ----------------------------------------------------------------------------
# Fetch/caching
# ----------------------------------------------------------------------------

class EnsoCache:
    def __init__(self):
        self.token: Dict[Tuple[int, str], Dict[str, Any]] = {}
        self.dependents: Dict[Tuple[int, str], List[Dict[str, Any]]] = {}

    def get_token(self, chain_id: int, address: str) -> Optional[Dict[str, Any]]:
        return self.token.get((chain_id, address))

    def put_token(self, chain_id: int, address: str, payload: Dict[str, Any]) -> None:
        self.token[(chain_id, address)] = payload

    def get_dependents(self, chain_id: int, address: str) -> Optional[List[Dict[str, Any]]]:
        return self.dependents.get((chain_id, address))

    def put_dependents(self, chain_id: int, address: str, items: List[Dict[str, Any]]) -> None:
        self.dependents[(chain_id, address)] = items


def fetch_token_cached(cache: EnsoCache, chain_id: int, address: str) -> Dict[str, Any]:
    cached = cache.get_token(chain_id, address)
    if cached:
        return cached
    payload = fetch_enso_token_with_price(address=address, chain_id=chain_id, underlying=0)
    cache.put_token(chain_id, address, payload)
    return payload


def list_underlyings_from_payload(payload: Dict[str, Any]) -> List[Dict[str, Any]]:
    return payload.get("underlyingTokens") or []


def list_dependents_cached(cache: EnsoCache, chain_id: int, address: str, page_size: int = 1000) -> List[Dict[str, Any]]:
    """
    Retrieve *all* dependents (wrappers/LPs/etc.) that reference `address` as underlying,
    by paging until empty.
    """
    cached = cache.get_dependents(chain_id, address)
    if cached is not None:
        return cached

    all_items: List[Dict[str, Any]] = []
    seen_ids: Set[str] = set()
    page = 1
    while True:
        try:
            res = find_tokens_with_underlying(address=address, chain_id=chain_id, page_size=page_size, page=page)
            items = res.get("items") or []
        except EnsoAPIError as exc:
            log.warning("Enso dependents fetch failed for %s:%s page=%d: %s", address, chain_id, page, exc)
            items = []

        # dedupe by (chainId,address)
        new_count = 0
        for it in items:
            a = normalize_addr(it.get("address"))
            ch = int(it.get("chainId") or chain_id)
            if not a:
                continue
            key = f"{ch}:{a}"
            if key not in seen_ids:
                seen_ids.add(key)
                all_items.append(it)
                new_count += 1

        if len(items) == 0 or new_count == 0:
            break
        page += 1

    cache.put_dependents(chain_id, address, all_items)
    return all_items


# ----------------------------------------------------------------------------
# Double BFS
# ----------------------------------------------------------------------------

def build_neighborhood_double_bfs(
    token_address: str,
    chain_id: int = 1,
    downstream_depth: int = 4,  # U direction (underlyings)
    upstream_depth: int = 4,    # U* direction (dependents)
    onchain_probe: bool = True,
    with_morpho: bool = False,
    with_aave: bool = False,
    with_euler: bool = False,
    with_pendle: bool = False,
    with_univ3: bool = False,
) -> Graph:
    """
    EXACT cones:
      - Downstream cone: Z s.t. Z ∈ ⋃_{k=1..downstream_depth} U^k(Y)
      - Upstream cone:   X s.t. Y ∈ ⋃_{k=1..upstream_depth} U^k(X)  (i.e., (U*)^k(Y))
    No mixing of directions during traversal.
    """
    addr0 = normalize_addr(token_address)
    if not addr0:
        raise ValueError(f"Invalid token address: {token_address}")
    root_id = token_node_id(chain_id, addr0)

    g = Graph(root=root_id, meta={
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "downstream": downstream_depth,
        "upstream": upstream_depth,
        "sources": [
            "Edges and nodes come from Enso (plus optional ERC-4626 probe)",
        ],
    })

    cache = EnsoCache()

    root_fetch_failed = False

    # Ensure root node exists
    try:
        root_payload = fetch_token_cached(cache, chain_id, addr0)
    except EnsoAPIError as exc:
        root_node = Node(
            id=root_id,
            address=addr0,
            chainId=chain_id,
            kind="token",
            label=addr0,
            role="other",
            extra={"error": str(exc)},
        )
        g.add_node(root_node)
        root_fetch_failed = True
    else:
        root_node = node_from_enso_payload(root_payload)
        g.add_node(root_node)

        # Optional promotion via ERC-4626 probe for the root
        asset_addr = _erc4626_asset(chain_id, addr0) if onchain_probe else None
        if asset_addr:
            root_node.role = "vault_share"

    if root_fetch_failed and onchain_probe:
        asset_addr = _erc4626_asset(chain_id, addr0)
        if asset_addr:
            root_node = g.nodes[root_id]
            root_node.role = "vault_share"
            asset_id = token_node_id(chain_id, asset_addr)
            g.add_node(Node(
                id=asset_id,
                address=asset_addr,
                chainId=chain_id,
                kind="token",
                label=asset_addr,
                role="plain",
                source="onchain",
            ))
            g.add_edge(Edge(
                src=root_id,
                dst=asset_id,
                type="VAULT",
                notes="erc4626.asset()",
                source="onchain",
            ))

    # ------------------ Downstream BFS (U) ------------------
    ds_depth_reached = 0
    us_depth_reached = 0
    boundary_nodes: Set[str] = set()

    if not root_fetch_failed and downstream_depth > 0:
        visited_ds: Set[Tuple[int, str]] = set()
        q_ds: Deque[Tuple[int, str, int]] = deque()
        q_ds.append((chain_id, addr0, 0))
        while q_ds:
            ch, addr, d = q_ds.popleft()
            if (ch, addr) in visited_ds:
                continue
            visited_ds.add((ch, addr))

            log.debug("downstream BFS: expanding %s depth=%d", addr, d)

            if d > ds_depth_reached:
                ds_depth_reached = d
            if d == downstream_depth:
                boundary_nodes.add(token_node_id(ch, addr))
                continue  # at boundary, do not expand

            # fetch this token & its underlyings
            try:
                tok = fetch_token_cached(cache, ch, addr)
            except EnsoAPIError as exc:
                log.warning("Enso fetch failed for %s:%s: %s", ch, addr, exc)
                continue

            src_node = node_from_enso_payload(tok)
            g.add_node(src_node)

            # promotion via ERC-4626 (for non-root too)
            asset_addr = _erc4626_asset(ch, addr) if onchain_probe else None
            if asset_addr:
                src_node.role = "vault_share"

            under = list_underlyings_from_payload(tok)
            for child in under:
                caddr = normalize_addr(child.get("address"))
                cchain = int(child.get("chainId") or ch)
                if not caddr:
                    continue

                child_payload = cache.get_token(cchain, caddr)
                if child_payload is None:
                    # create minimal node first; full payload when/if visited
                    child_node = Node(
                        id=token_node_id(cchain, caddr),
                        address=caddr,
                        chainId=cchain,
                        kind="token",
                        label=child.get("name") or caddr,
                        symbol=child.get("symbol"),
                        role="plain",
                        source="enso",
                    )
                    g.add_node(child_node)
                else:
                    g.add_node(node_from_enso_payload(child_payload))

                edge_type = edge_type_for_source_role(src_node.role)
                if asset_addr and caddr == asset_addr:
                    edge_type = "VAULT"
                    src_node.role = "vault_share"

                g.add_edge(Edge(
                    src=src_node.id,
                    dst=token_node_id(cchain, caddr),
                    type=edge_type,
                    notes=None if edge_type != "WRAPS" else "enso.underlyingTokens",
                    source="onchain" if edge_type == "VAULT" else "enso",
                ))

                if d + 1 < downstream_depth:
                    q_ds.append((cchain, caddr, d + 1))

    # ------------------ Upstream BFS (U*) ------------------
    # Track upstream node IDs (root + dependents) for venue adapter filtering.
    # Venue adapters should only attach to tokens that are "about" the root,
    # i.e. the root itself and its upstream cone — not downstream underlyings.
    upstream_ids: Set[str] = {root_id}

    if not root_fetch_failed and upstream_depth > 0:
        visited_us: Set[Tuple[int, str]] = set()
        q_us: Deque[Tuple[int, str, int]] = deque()
        q_us.append((chain_id, addr0, 0))
        while q_us:
            ch, addr, d = q_us.popleft()
            if (ch, addr) in visited_us:
                continue
            visited_us.add((ch, addr))

            log.debug("upstream BFS: expanding %s depth=%d", addr, d)

            if d > us_depth_reached:
                us_depth_reached = d
            if d == upstream_depth:
                boundary_nodes.add(token_node_id(ch, addr))
                continue  # at boundary, do not expand

            # find direct dependents of this 'addr' (reverse step)
            dependents = list_dependents_cached(cache, ch, addr, page_size=1000)

            # ensure the current node exists (once, not per-dependent)
            try:
                cur_payload = fetch_token_cached(cache, ch, addr)
                cur_node = node_from_enso_payload(cur_payload)
                g.add_node(cur_node)
            except EnsoAPIError as exc:
                log.warning("Enso fetch failed for %s:%s: %s", ch, addr, exc)
                cur_node = Node(
                    id=token_node_id(ch, addr),
                    address=addr,
                    chainId=ch,
                    kind="token",
                    label=addr,
                    role="other",
                )
                g.add_node(cur_node)

            expired_pendle = fetch_expired_pendle_addresses(ch)

            for dep in dependents:
                daddr = normalize_addr(dep.get("address"))
                dchain = int(dep.get("chainId") or ch)
                if not daddr:
                    continue

                if daddr in expired_pendle:
                    log.debug("upstream BFS: skipping expired Pendle token %s", daddr)
                    visited_us.add((dchain, daddr))  # prevent wrapper discovery
                    continue

                dep_node = node_from_enso_payload(dep)
                g.add_node(dep_node)
                upstream_ids.add(dep_node.id)

                # optional on-chain probe for dependent
                dep_asset = _erc4626_asset(dchain, daddr) if onchain_probe else None
                if dep_asset and dep_asset == addr:
                    dep_node.role = "vault_share"

                edge_type = edge_type_for_source_role(dep_node.role)
                if dep_asset and dep_asset == addr:
                    edge_type = "VAULT"

                g.add_edge(Edge(
                    src=dep_node.id,
                    dst=cur_node.id,
                    type=edge_type,
                    notes="dependents (enso)",
                    source="onchain" if edge_type == "VAULT" else "enso",
                ))

                # enqueue next reverse hop if within radius
                if d + 1 < upstream_depth:
                    q_us.append((dchain, daddr, d + 1))

    if with_morpho:
        _attach_morpho_market_nodes(g, eligible_ids=upstream_ids)
        adapters = g.meta.setdefault("venueAdapters", [])
        if "morpho" not in adapters:
            adapters.append("morpho")

    if with_aave:
        _attach_aave_market_nodes(g, eligible_ids=upstream_ids)
        adapters = g.meta.setdefault("venueAdapters", [])
        if "aave" not in adapters:
            adapters.append("aave")

    if with_euler:
        _attach_euler_market_nodes(g, eligible_ids=upstream_ids)
        adapters = g.meta.setdefault("venueAdapters", [])
        if "euler" not in adapters:
            adapters.append("euler")

    if with_univ3:
        _attach_univ3_pool_nodes(g, eligible_ids=upstream_ids)
        adapters = g.meta.setdefault("venueAdapters", [])
        if "univ3" not in adapters:
            adapters.append("univ3")

    if with_pendle:
        _enrich_pendle_nodes(g, eligible_ids=upstream_ids)
        enrichers = g.meta.setdefault("enrichers", [])
        if "pendle" not in enrichers:
            enrichers.append("pendle")

    # BFS completeness metadata for risk analysis
    g.meta["bfs_downstream_depth_reached"] = ds_depth_reached
    g.meta["bfs_upstream_depth_reached"] = us_depth_reached
    g.meta["bfs_boundary_nodes"] = sorted(boundary_nodes)

    return g

## 3. neigh_risk.py (Risk engine)

"""DIG risk signal engine — pure functional: immutable Graph in, RiskReport out."""

from __future__ import annotations

from collections import deque
from dataclasses import asdict
from typing import Dict, FrozenSet, List, Optional, Set, Tuple

from neighborhood_common import (
    COMPOSITION_EDGES,
    LIABILITY_EDGES,
    Graph,
    GraphView,
    Node,
)
from neigh_risk_types import (
    BlastRadiusResult,
    EvidenceBundle,
    ExitLiquidityResult,
    GraphCompleteness,
    LeverageCycle,
    OpacityResult,
    RiskConfig,
    RiskReport,
)

# Terminal assets whose backing is self-evident on-chain
_TERMINAL_SYMBOLS = frozenset({
    "ETH", "WETH", "USDC", "USDT", "DAI", "FRAX", "LUSD", "GHO",
    "WBTC", "cbBTC", "tBTC",
})

_AVAILABLE_ADAPTERS = ("morpho", "aave", "euler", "univ3")


# ---------------------------------------------------------------------------
# Signal 0: Graph completeness
# ---------------------------------------------------------------------------

def assess_completeness(graph: Graph) -> GraphCompleteness:
    meta = graph.meta
    ds_cfg = meta.get("downstream", 0)
    us_cfg = meta.get("upstream", 0)
    ds_reached = meta.get("bfs_downstream_depth_reached", 0)
    us_reached = meta.get("bfs_upstream_depth_reached", 0)
    boundary = tuple(meta.get("bfs_boundary_nodes", []))
    adapters_run = tuple(meta.get("venueAdapters", []))

    notes = []
    if ds_reached >= ds_cfg and ds_cfg > 0:
        notes.append("downstream BFS hit depth limit")
    if us_reached >= us_cfg and us_cfg > 0:
        notes.append("upstream BFS hit depth limit")
    missing = [a for a in _AVAILABLE_ADAPTERS if a not in adapters_run]
    if missing:
        notes.append(f"adapters not run: {', '.join(missing)}")

    return GraphCompleteness(
        downstream_depth_configured=ds_cfg,
        downstream_depth_reached=ds_reached,
        upstream_depth_configured=us_cfg,
        upstream_depth_reached=us_reached,
        boundary_node_ids=boundary,
        adapters_run=adapters_run,
        note="; ".join(notes) if notes else "graph appears complete",
    )


# ---------------------------------------------------------------------------
# Signal 1: Leverage cycle detection
# ---------------------------------------------------------------------------

def _normalize_cycle(path: Tuple[str, ...]) -> Tuple[str, ...]:
    """Rotate cycle so the lexicographically smallest node is first."""
    if not path:
        return path
    min_idx = path.index(min(path))
    return path[min_idx:] + path[:min_idx]


def _build_flow_adj(view: GraphView) -> Dict[str, List[Tuple[str, str]]]:
    """Build a directed flow adjacency list that understands DeFi semantics.

    Composition edges (WRAPS, VAULT, CONTAINS, STAKE, STRIP) are structural:
    src→dst means "src is built from dst". But the *flow* for leverage goes
    both ways — you can deposit the underlying to mint the wrapper. So we add
    reverse flow for composition edges (dst→src as "MINT").

    LEND edges (token→market) also get reverse flow (market→token as "LEND_OUT")
    because the market can distribute borrowed assets.

    PLEDGE edges are one-way only (collateral goes in, doesn't flow out).
    SWAP edges are followed in natural direction.

    This lets cycle detection find the Stream/Elixir pattern:
    underlying →MINT→ wrapper →PLEDGE→ market →LEND_OUT→ underlying
    """
    adj: Dict[str, List[Tuple[str, str]]] = {}

    for edge in view.edges:
        # Natural direction for all edges
        adj.setdefault(edge.src, []).append((edge.dst, edge.type))

        # Reverse flow for composition: deposit underlying → mint wrapper
        if edge.type in COMPOSITION_EDGES:
            adj.setdefault(edge.dst, []).append((edge.src, "MINT"))

        # Reverse flow for LEND: market distributes borrowed asset
        if edge.type == "LEND":
            adj.setdefault(edge.dst, []).append((edge.src, "LEND_OUT"))

    return adj


def find_leverage_cycles(
    view: GraphView, max_depth: int = 8
) -> List[LeverageCycle]:
    seen: Set[Tuple[str, ...]] = set()
    results: List[LeverageCycle] = []
    flow_adj = _build_flow_adj(view)

    for start_id in view.nodes:
        # DFS with bounded depth
        stack: List[Tuple[str, List[str], List[str]]] = []
        for dst, etype in flow_adj.get(start_id, []):
            if dst in view.nodes:
                stack.append((dst, [start_id, dst], [etype]))

        while stack:
            cur, path, etypes = stack.pop()
            if len(path) > max_depth + 1:
                continue

            for dst, etype in flow_adj.get(cur, []):
                if dst == start_id and len(path) >= 3:
                    cycle_edges = tuple(etypes + [etype])
                    pledge_count = sum(1 for e in cycle_edges if e == "PLEDGE")
                    if pledge_count == 0:
                        continue
                    cycle_path = tuple(path)
                    norm = _normalize_cycle(cycle_path)
                    if norm in seen:
                        continue
                    seen.add(norm)
                    market_ids = tuple(
                        nid for nid in cycle_path
                        if (view.node(nid) or Node(id="", address=None, chainId=0)).kind == "lending_market"
                    )
                    results.append(LeverageCycle(
                        path=cycle_path,
                        edge_types=cycle_edges,
                        pledge_count=pledge_count,
                        market_ids=market_ids,
                    ))
                elif dst not in path and len(path) < max_depth + 1:
                    stack.append((dst, path + [dst], etypes + [etype]))

    return results


# ---------------------------------------------------------------------------
# Signal 2: Blast radius
# ---------------------------------------------------------------------------

def _get_haircut(node: Node, default: float) -> float:
    """Extract protocol-specific collateral factor from node.extra."""
    extra = node.extra
    protocol = (node.protocol or "").lower()
    if "morpho" in protocol:
        lltv = extra.get("lltv")
        if lltv is not None:
            val = float(lltv)
            return val / 1e18 if val > 1.0 else val
    if "aave" in protocol:
        max_ltv = extra.get("max_ltv")
        if max_ltv is not None:
            return float(max_ltv)
    if "euler" in protocol:
        max_ltv = extra.get("max_ltv")
        if max_ltv is not None:
            val = float(max_ltv)
            # Messari subgraph returns LTV as percentage (0-100) or ratio (0-1)
            return val / 100.0 if val > 1.0 else val
    return default


def blast_radius(
    view: GraphView, token_id: str, config: RiskConfig = RiskConfig()
) -> BlastRadiusResult:
    # Find all lending_market nodes where token_id or its upstream derivatives
    # appear as collateral (PLEDGE edges: token → market)
    pledge_edges = frozenset({"PLEDGE"})
    direct_exposure = 0.0
    affected: List[str] = []
    haircuts: Dict[str, float] = {}

    # Collect token_id + upstream derivatives (nodes that WRAPS/VAULT into token)
    related_tokens = {token_id}
    for path, node in view.walk(token_id, direction="reverse", edge_types=COMPOSITION_EDGES, max_depth=4):
        related_tokens.add(node.id)

    # Find PLEDGE edges from any related token
    for tid in related_tokens:
        for edge, market in view.successors(tid, edge_types=pledge_edges):
            if market.kind != "lending_market":
                continue
            borrow_usd = market.extra.get("borrow_usd") or 0.0
            haircut = _get_haircut(market, config.cascade_default_haircut)
            exposure = float(borrow_usd) * haircut
            direct_exposure += exposure
            affected.append(market.id)
            haircuts[market.id] = haircut

    # Cascade: walk PLEDGE chains from affected markets (bounded)
    cascade_exposure = 0.0
    visited_cascade: Set[str] = set(affected)
    frontier = list(affected)
    for hop in range(config.cascade_max_hops):
        next_frontier: List[str] = []
        for mid in frontier:
            market_node = view.node(mid)
            if not market_node:
                continue
            utilization = float(market_node.extra.get("utilization") or 0.0)
            # Find what asset is lent from this market (LEND edges: asset → market)
            for edge, lent_token in view.predecessors(mid, edge_types=frozenset({"LEND"})):
                # Does this lent token get pledged elsewhere?
                for pedge, next_market in view.successors(lent_token.id, edge_types=pledge_edges):
                    if next_market.id in visited_cascade:
                        continue
                    if next_market.kind != "lending_market":
                        continue
                    next_borrow = float(next_market.extra.get("borrow_usd") or 0.0)
                    next_haircut = _get_haircut(next_market, config.cascade_default_haircut)
                    cascade_exposure += next_borrow * next_haircut * utilization
                    visited_cascade.add(next_market.id)
                    next_frontier.append(next_market.id)
                    if next_market.id not in affected:
                        affected.append(next_market.id)
                    haircuts[next_market.id] = next_haircut
        frontier = next_frontier

    return BlastRadiusResult(
        direct_exposure_usd=direct_exposure,
        cascade_exposure_usd=cascade_exposure,
        affected_markets=tuple(affected),
        haircuts_applied=haircuts,
    )


# ---------------------------------------------------------------------------
# Signal 3: Exit liquidity
# ---------------------------------------------------------------------------

def exit_liquidity(
    view: GraphView, token_id: str
) -> ExitLiquidityResult:
    swap_edges = frozenset({"SWAP"})
    dex_liquidity = 0.0
    pools: List[str] = []

    # DEX pools connected via SWAP edges
    for edge, pool in view.successors(token_id, edge_types=swap_edges):
        if pool.kind == "dex_pool":
            pool_tvl = pool.tvl or 0.0
            dex_liquidity += pool_tvl
            pools.append(pool.id)

    # Check composition paths to terminal assets (redemption)
    redemption_count = 0
    for path, leaf in view.walk(token_id, direction="forward", edge_types=COMPOSITION_EDGES, max_depth=8):
        sym = (leaf.symbol or "").upper()
        if sym in _TERMINAL_SYMBOLS or leaf.role == "plain":
            has_vault = False
            # Check if path traverses a VAULT edge
            for i in range(len(path) - 1):
                for e, _ in view.successors(path[i], edge_types=frozenset({"VAULT"})):
                    if _ and _.id == path[i + 1]:
                        has_vault = True
                        break
            if has_vault or sym in _TERMINAL_SYMBOLS:
                redemption_count += 1

    token_node = view.node(token_id)
    token_tvl = token_node.tvl if token_node else None

    if redemption_count > 0 and dex_liquidity > 0:
        mechanism = "hybrid"
    elif redemption_count > 0:
        mechanism = "vault_redeemable"
    elif dex_liquidity > 0:
        mechanism = "dex_only"
    else:
        mechanism = "no_exit"

    ratio = None
    if token_tvl and token_tvl > 0:
        ratio = dex_liquidity / token_tvl

    return ExitLiquidityResult(
        dex_liquidity_usd=dex_liquidity,
        token_tvl_usd=token_tvl,
        ratio=ratio,
        exit_mechanism=mechanism,
        pools=tuple(pools),
        redemption_paths=redemption_count,
    )


# ---------------------------------------------------------------------------
# Signal 4: Opacity score
# ---------------------------------------------------------------------------

def opacity_score(
    view: GraphView, token_id: str
) -> OpacityResult:
    token_node = view.node(token_id)
    claimed_tvl = float(token_node.tvl or 0.0) if token_node else 0.0

    verifiable = 0.0
    attested = 0.0
    proof_classes: Dict[str, str] = {}

    # Walk downstream through composition edges
    leaves_found = False
    for path, leaf in view.walk(token_id, direction="forward", edge_types=COMPOSITION_EDGES, max_depth=8):
        # A leaf is a node with no further composition successors
        further = view.successors(leaf.id, edge_types=COMPOSITION_EDGES)
        if further:
            continue  # not a leaf

        leaves_found = True
        leaf_tvl = float(leaf.tvl or 0.0)
        sym = (leaf.symbol or "").upper()

        if leaf.source == "onchain" or sym in _TERMINAL_SYMBOLS:
            proof_classes[leaf.id] = "onchain_provable"
            verifiable += leaf_tvl
        elif leaf.tvl is not None:
            proof_classes[leaf.id] = "oracle_attested"
            attested += leaf_tvl
        else:
            proof_classes[leaf.id] = "offchain_asserted"

    total_traced = verifiable + attested
    denominator = max(claimed_tvl, total_traced) if (claimed_tvl or total_traced) else 1.0
    unaccounted = max(0.0, denominator - total_traced)
    score = unaccounted / denominator if denominator > 0 else 0.0

    return OpacityResult(
        verifiable_usd=verifiable,
        attested_usd=attested,
        unaccounted_usd=unaccounted,
        opacity_score=score,
        proof_classes=proof_classes,
    )


# ---------------------------------------------------------------------------
# Evidence bundles
# ---------------------------------------------------------------------------

def build_evidence_bundles(
    cycles: List[LeverageCycle],
    blast: BlastRadiusResult,
    exit_liq: ExitLiquidityResult,
    opacity: OpacityResult,
    config: RiskConfig = RiskConfig(),
) -> List[EvidenceBundle]:
    signals_fired: List[str] = []

    has_cycle = len(cycles) > 0
    high_opacity = opacity.opacity_score > config.opacity_critical
    med_opacity = opacity.opacity_score > config.opacity_warning
    thin_exit = (exit_liq.ratio is not None and exit_liq.ratio < config.exit_liquidity_critical_pct)
    weak_exit = (exit_liq.ratio is not None and exit_liq.ratio < config.exit_liquidity_warning_pct)
    big_blast = (
        exit_liq.token_tvl_usd is not None
        and exit_liq.token_tvl_usd > 0
        and blast.direct_exposure_usd > config.blast_radius_warning_multiplier * exit_liq.token_tvl_usd
    )

    if has_cycle:
        signals_fired.append("leverage_cycle")
    if high_opacity:
        signals_fired.append("high_opacity")
    elif med_opacity:
        signals_fired.append("opacity")
    if thin_exit:
        signals_fired.append("thin_exit")
    elif weak_exit:
        signals_fired.append("weak_exit")
    if big_blast:
        signals_fired.append("large_blast_radius")

    bundles: List[EvidenceBundle] = []

    # Critical: cycle + high opacity + thin exit
    if has_cycle and high_opacity and thin_exit:
        bundles.append(EvidenceBundle(
            severity="critical",
            signals=tuple(signals_fired),
            summary="Leverage cycle with opaque backing and thin exit liquidity — high blowup risk",
        ))
    # Warning: any 2 signals
    elif len(signals_fired) >= 2:
        bundles.append(EvidenceBundle(
            severity="warning",
            signals=tuple(signals_fired),
            summary=f"Multiple risk signals: {', '.join(signals_fired)}",
        ))
    # Watch: any single signal
    elif len(signals_fired) == 1:
        bundles.append(EvidenceBundle(
            severity="watch",
            signals=tuple(signals_fired),
            summary=f"Single risk signal: {signals_fired[0]}",
        ))

    return bundles


# ---------------------------------------------------------------------------
# Orchestrator
# ---------------------------------------------------------------------------

def analyze(graph: Graph, config: Optional[RiskConfig] = None) -> RiskReport:
    if config is None:
        config = RiskConfig()

    view = GraphView(graph)
    token_id = graph.root

    completeness = assess_completeness(graph)
    cycles = find_leverage_cycles(view, max_depth=config.cycle_max_depth)
    blast = blast_radius(view, token_id, config=config)
    exit_liq = exit_liquidity(view, token_id)
    opac = opacity_score(view, token_id)
    bundles = build_evidence_bundles(cycles, blast, exit_liq, opac, config=config)

    return RiskReport(
        token_id=token_id,
        completeness=completeness,
        leverage_cycles=tuple(cycles),
        blast_radius=blast,
        exit_liquidity=exit_liq,
        opacity=opac,
        evidence_bundles=tuple(bundles),
    )


def report_to_dict(report: RiskReport) -> Dict:
    return asdict(report)

## 4. neighborhood_common.py (Data model)

"""Shared neighborhood graph model and Enso payload helpers."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field, fields
from typing import Any, Dict, Optional, Set, Tuple, List
from urllib.parse import quote

__all__ = [
    "Price",
    "Node",
    "Edge",
    "Graph",
    "GraphView",
    "COMPOSITION_EDGES",
    "LIABILITY_EDGES",
    "normalize_addr",
    "node_id",
    "token_node_id",
    "infer_role_from_enso",
    "edge_type_for_source_role",
    "node_from_enso_payload",
]

# Edge-type groupings for graph projections
COMPOSITION_EDGES = frozenset({"WRAPS", "CONTAINS", "VAULT", "STAKE", "STRIP"})
LIABILITY_EDGES = frozenset({"LEND", "PLEDGE", "SWAP"})


def normalize_addr(addr: Optional[str]) -> Optional[str]:
    if not isinstance(addr, str):
        return None
    addr = addr.strip()
    if addr.startswith("0x") and len(addr) == 42:
        return addr.lower()
    return None


def _normalize_node_key(key: Any) -> str:
    raw = str(key).strip()
    if not raw:
        raise ValueError("Node key must not be blank")
    if raw.startswith("0x") and len(raw) == 42:
        raw = raw.lower()
    return quote(raw, safe="")


def node_id(chain_id: int, address_or_namespace: str, key: Optional[str] = None) -> str:
    """
    Build a stable node id.

    Backward-compatible token form:
      node_id(1, "0x...")

    Generic form for non-token entities:
      node_id(1, "lending_market", "morpho-blue:0x...")
    """
    if key is None:
        namespace = "erc20"
        raw_key = address_or_namespace
    else:
        namespace = str(address_or_namespace).strip().lower()
        if not namespace:
            raise ValueError("Node namespace must not be blank")
        raw_key = key
    return f"eip155:{int(chain_id)}/{namespace}:{_normalize_node_key(raw_key)}"


def token_node_id(chain_id: int, address: str) -> str:
    return node_id(chain_id, "erc20", address)


@dataclass
class Price:
    value: Optional[float] = None
    timestamp: Optional[int] = None
    symbol: Optional[str] = None
    confidence: Optional[float] = None


def _is_blank(value: Any) -> bool:
    return value in (None, [], {}, "")


@dataclass
class Node:
    id: str
    address: Optional[str]
    chainId: int
    kind: str = "token"
    label: Optional[str] = None
    symbol: Optional[str] = None
    decimals: Optional[int] = None
    role: str = "plain"
    protocol: Optional[str] = None
    project: Optional[str] = None
    tvl: Optional[float] = None
    apy_base: Optional[float] = None
    apy_reward: Optional[float] = None
    price: Optional[Price] = None
    source: str = "enso"
    extra: Dict[str, Any] = field(default_factory=dict)

    def merge_from(self, other: "Node") -> None:
        for model_field in fields(self):
            key = model_field.name
            if key in ("id", "address", "chainId", "kind"):
                continue
            current = getattr(self, key)
            incoming = getattr(other, key)
            if _is_blank(current) and not _is_blank(incoming):
                setattr(self, key, incoming)


@dataclass
class Edge:
    src: str
    dst: str
    type: str
    notes: Optional[str] = None
    source: str = "enso"

    @property
    def key(self) -> Tuple[str, str, str]:
        return (self.src, self.type, self.dst)


@dataclass
class Graph:
    root: str
    nodes: Dict[str, Node] = field(default_factory=dict)
    edges: List[Edge] = field(default_factory=list)
    meta: Dict[str, Any] = field(default_factory=dict)
    _edge_set: Set[Tuple[str, str, str]] = field(default_factory=set, repr=False)

    def add_node(self, node: Node) -> None:
        if node.id in self.nodes:
            self.nodes[node.id].merge_from(node)
        else:
            self.nodes[node.id] = node

    def add_edge(self, edge: Edge) -> None:
        if edge.key not in self._edge_set:
            self.edges.append(edge)
            self._edge_set.add(edge.key)

    def to_dict(self) -> Dict[str, Any]:
        def _node_to_dict(node: Node) -> Dict[str, Any]:
            data = asdict(node)
            if node.price and isinstance(node.price, Price):
                data["price"] = asdict(node.price)
            return data

        return {
            "root": self.root,
            "nodes": [_node_to_dict(node) for node in self.nodes.values()],
            "edges": [asdict(edge) for edge in self.edges],
            "meta": self.meta,
        }

    def to_json(self, compact: bool = False) -> str:
        if compact:
            return json.dumps(self.to_dict(), separators=(",", ":"), sort_keys=False)
        return json.dumps(self.to_dict(), indent=2, sort_keys=False)

    def to_dot(self, min_tvl: float = 0.0, pendle_compact: bool = False) -> str:
        _VENUE_KINDS = {"lending_market", "dex_pool"}
        if min_tvl > 0:
            skip_ids = {
                n.id for n in self.nodes.values()
                if n.kind in _VENUE_KINDS and (n.tvl is None or n.tvl < min_tvl)
            }
        else:
            skip_ids = set()

        # Pendle compact: collapse SY/YT/PLP/PENDLE-LPT into the PT node
        # pendle_redirect maps collapsed node id → representative PT node id
        pendle_redirect: dict[str, str] = {}
        pendle_labels: dict[str, str] = {}  # representative id → combined label
        if pendle_compact:
            _PENDLE_SLUGS = {"pendle-sy", "pendle-yt", "pendle-markets", "pendle-pt"}
            pendle_nodes = {
                n.id: n for n in self.nodes.values()
                if (n.extra.get("protocol") or "").lower() in _PENDLE_SLUGS
            }
            # Group by shared SY: all pendle nodes that edge into the same SY
            # Find SY nodes
            sy_ids = {nid for nid, n in pendle_nodes.items()
                      if (n.extra.get("protocol") or "").lower() == "pendle-sy"}
            for sy_id in sy_ids:
                # Find all pendle nodes that wrap this SY (src → sy_id edges)
                group = {sy_id}
                for edge in self.edges:
                    if edge.dst == sy_id and edge.src in pendle_nodes:
                        group.add(edge.src)
                # Find PT in group
                pt_node = None
                yt_sym = None
                for nid in group:
                    n = pendle_nodes.get(nid)
                    if n and (n.extra.get("protocol") or "").lower() == "pendle-pt":
                        pt_node = n
                    if n and (n.symbol or "").startswith("YT-"):
                        yt_sym = n.symbol
                if pt_node is None:
                    continue
                # Map all non-PT group members to PT
                for nid in group:
                    if nid != pt_node.id:
                        pendle_redirect[nid] = pt_node.id
                        skip_ids.add(nid)
                # Build combined label
                base = (pt_node.symbol or "").replace("PT-", "")
                pendle_labels[pt_node.id] = f"Pendle {base}"

        role_color = {
            "plain": "#C3B091",
            "wrapper": "#C3B091",
            "lp": "#F8C0D8",
            "vault_share": "#FFF3B0",
            "staked": "#90EE90",
            "stripped": "#DDA0DD",
            "collateral": "#FFB366",
            "other": "#D0D0D0",
        }
        kind_color = {
            "token": None,
            "lending_market": "#FEEA9D",
            "dex_pool": "#E7A29D",
            "venue": "#F4EEEA",
        }
        # Protocol-specific overrides (checked before kind/role)
        protocol_color = {
            "pendle": "#B8E6B8",       # light green — PT/YT/SY
            "morpho": "#FEEA9D",       # pale yellow — lending markets
            "aave-v3": "#FDE68A",      # deeper yellow — Aave
            "euler": "#E8A317",        # dark gold — Euler vaults
            "uniswap-v3": "#E7A29D",   # salmon — dex pools
        }
        generated_at = self.meta.get("generatedAt") or ""
        lines = [
            "digraph G {",
            "  rankdir=LR;",
            '  node [shape=box, style="rounded,filled", fontname="Helvetica"];',
            f'  label="Generated {generated_at}";',
            '  labelloc=b; labeljust=r; fontsize=10; fontcolor="#888888";',
        ]
        for node in self.nodes.values():
            if node.id in skip_ids:
                continue
            color = (
                protocol_color.get(node.protocol or "")
                or protocol_color.get((node.project or "").lower())
                or kind_color.get(node.kind)
                or role_color.get(node.role, "#D0D0D0")
            )
            if node.id in pendle_labels:
                label = pendle_labels[node.id]
                sub = ["pendle"]
            else:
                label = node.label or node.symbol or node.address or node.id
                sub = []
                if node.kind and node.kind != "token":
                    sub.append(node.kind)
                if node.symbol and node.symbol != label:
                    sub.append(node.symbol)
                if node.role and node.role != "plain":
                    sub.append(node.role)
                if node.protocol:
                    sub.append(node.protocol)
            if sub:
                label = f"{label}\\n({', '.join(sub)})"
            penwidth = ', penwidth=3' if node.id == self.root else ''
            lines.append(f'  "{node.id}" [label="{label}", fillcolor="{color}"{penwidth}];')
        seen_edges: set[tuple[str, str, str]] = set()
        for edge in self.edges:
            src = pendle_redirect.get(edge.src, edge.src)
            dst = pendle_redirect.get(edge.dst, edge.dst)
            if src in skip_ids or dst in skip_ids:
                continue
            if src == dst:
                continue  # internal pendle edge after redirect
            key = (src, dst, edge.type)
            if key in seen_edges:
                continue
            seen_edges.add(key)
            lines.append(f'  "{src}" -> "{dst}" [label="{edge.type}"];')
        lines.append("}")
        return "\n".join(lines)


class GraphView:
    """Read-only traversal wrapper over a built Graph."""

    __slots__ = ("_graph", "_fwd", "_rev")

    def __init__(self, graph: Graph) -> None:
        self._graph = graph
        fwd: Dict[str, List[Tuple[Edge, str]]] = {}
        rev: Dict[str, List[Tuple[Edge, str]]] = {}
        for edge in graph.edges:
            fwd.setdefault(edge.src, []).append((edge, edge.dst))
            rev.setdefault(edge.dst, []).append((edge, edge.src))
        self._fwd = fwd
        self._rev = rev

    # --- read-only properties ---

    @property
    def root(self) -> str:
        return self._graph.root

    @property
    def nodes(self) -> Dict[str, Node]:
        return self._graph.nodes

    @property
    def edges(self) -> List[Edge]:
        return self._graph.edges

    @property
    def meta(self) -> Dict[str, Any]:
        return self._graph.meta

    # --- lookup ---

    def node(self, node_id: str) -> Optional[Node]:
        return self._graph.nodes.get(node_id)

    # --- adjacency queries ---

    def successors(
        self, node_id: str, edge_types: Optional[frozenset] = None
    ) -> List[Tuple[Edge, Node]]:
        out: List[Tuple[Edge, Node]] = []
        for edge, dst_id in self._fwd.get(node_id, []):
            if edge_types and edge.type not in edge_types:
                continue
            dst = self._graph.nodes.get(dst_id)
            if dst is not None:
                out.append((edge, dst))
        return out

    def predecessors(
        self, node_id: str, edge_types: Optional[frozenset] = None
    ) -> List[Tuple[Edge, Node]]:
        out: List[Tuple[Edge, Node]] = []
        for edge, src_id in self._rev.get(node_id, []):
            if edge_types and edge.type not in edge_types:
                continue
            src = self._graph.nodes.get(src_id)
            if src is not None:
                out.append((edge, src))
        return out

    def walk(
        self,
        start: str,
        direction: str = "forward",
        edge_types: Optional[frozenset] = None,
        max_depth: int = 8,
    ):
        """Bounded BFS yielding (path, node) tuples.

        direction: "forward" follows outgoing edges, "reverse" follows incoming.
        """
        from collections import deque

        adj = self._fwd if direction == "forward" else self._rev
        visited: Set[str] = {start}
        queue: deque = deque()
        for edge, nbr in adj.get(start, []):
            if edge_types and edge.type not in edge_types:
                continue
            if nbr not in visited:
                queue.append(([start, nbr], nbr, 1))
                visited.add(nbr)
        while queue:
            path, current, depth = queue.popleft()
            node = self._graph.nodes.get(current)
            if node is not None:
                yield path, node
            if depth < max_depth:
                for edge, nbr in adj.get(current, []):
                    if edge_types and edge.type not in edge_types:
                        continue
                    if nbr not in visited:
                        visited.add(nbr)
                        queue.append((path + [nbr], nbr, depth + 1))


_LST_SYMBOLS = {"stETH", "wstETH", "rETH", "eETH", "weETH", "cbETH", "mETH", "sfrxETH", "BETH"}


def infer_role_from_enso(token_payload: Dict[str, Any]) -> str:
    underlyings = token_payload.get("underlyingTokens") or []
    symbol = (token_payload.get("symbol") or "").strip()
    slug = (token_payload.get("protocolSlug") or "").lower()

    # Pendle principal/yield tokens
    if "pendle" in slug and (symbol.startswith("PT-") or symbol.startswith("YT-")):
        return "stripped"

    # Liquid staking derivatives
    if symbol in _LST_SYMBOLS:
        return "staked"

    # Count-based fallback
    if len(underlyings) >= 2:
        return "lp"
    if len(underlyings) == 1:
        return "wrapper"
    return "plain"


def edge_type_for_source_role(role: str) -> str:
    # This mapper is structural-only. Venue verbs such as PLEDGE or SWAP
    # belong on token -> venue edges emitted by protocol adapters.
    if role == "lp":
        return "CONTAINS"
    if role == "vault_share":
        return "VAULT"
    if role == "staked":
        return "STAKE"
    if role == "stripped":
        return "STRIP"
    return "WRAPS"


_ENSO_NODE_OMIT_KEYS = {
    "address",
    "chainId",
    "name",
    "symbol",
    "decimals",
    "type",
    "project",
    "protocolSlug",
    "primaryAddress",
    "apy",
    "apyBase",
    "apyReward",
    "tvl",
    "underlyingTokens",
    "logosUri",
    "price",
    "sources",
    "underlyingResolved",
}


def node_from_enso_payload(payload: Dict[str, Any]) -> Node:
    address = normalize_addr(payload.get("address")) or ""
    chain_id = int(payload.get("chainId") or payload.get("chain_id") or 1)
    price_payload = payload.get("price") or {}
    return Node(
        id=token_node_id(chain_id, address),
        address=address,
        chainId=chain_id,
        kind="token",
        label=payload.get("name"),
        symbol=payload.get("symbol"),
        decimals=payload.get("decimals"),
        role=infer_role_from_enso(payload),
        protocol=payload.get("protocolSlug"),
        project=payload.get("project"),
        tvl=payload.get("tvl"),
        apy_base=payload.get("apyBase"),
        apy_reward=payload.get("apyReward"),
        price=Price(
            value=price_payload.get("value"),
            timestamp=price_payload.get("timestamp"),
            symbol=price_payload.get("symbol"),
            confidence=price_payload.get("confidence"),
        )
        if payload.get("price") is not None
        else None,
        source="enso",
        extra={key: value for key, value in payload.items() if key not in _ENSO_NODE_OMIT_KEYS},
    )

## 5. neigh_risk_types.py (Risk types)

"""Immutable result types for DIG risk analysis."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Optional, Tuple


@dataclass(frozen=True)
class RiskConfig:
    """All thresholds configurable, not hardcoded."""
    cycle_max_depth: int = 8
    cascade_max_hops: int = 3
    cascade_default_haircut: float = 0.75
    exit_liquidity_critical_pct: float = 0.05
    exit_liquidity_warning_pct: float = 0.10
    opacity_critical: float = 0.5
    opacity_warning: float = 0.3
    blast_radius_warning_multiplier: float = 10.0
    yield_anomaly_threshold: float = 1.5


@dataclass(frozen=True)
class GraphCompleteness:
    downstream_depth_configured: int
    downstream_depth_reached: int
    upstream_depth_configured: int
    upstream_depth_reached: int
    boundary_node_ids: Tuple[str, ...]
    adapters_run: Tuple[str, ...]
    note: str


@dataclass(frozen=True)
class LeverageCycle:
    path: Tuple[str, ...]
    edge_types: Tuple[str, ...]
    pledge_count: int
    market_ids: Tuple[str, ...]


@dataclass(frozen=True)
class BlastRadiusResult:
    direct_exposure_usd: float
    cascade_exposure_usd: float
    affected_markets: Tuple[str, ...]
    haircuts_applied: Dict[str, float] = field(default_factory=dict)


@dataclass(frozen=True)
class ExitLiquidityResult:
    dex_liquidity_usd: float
    token_tvl_usd: Optional[float]
    ratio: Optional[float]
    exit_mechanism: str  # "vault_redeemable" | "hybrid" | "dex_only" | "no_exit"
    pools: Tuple[str, ...]
    redemption_paths: int


@dataclass(frozen=True)
class OpacityResult:
    verifiable_usd: float
    attested_usd: float
    unaccounted_usd: float
    opacity_score: float  # 0.0 (transparent) to 1.0 (fully opaque)
    proof_classes: Dict[str, str] = field(default_factory=dict)


@dataclass(frozen=True)
class EvidenceBundle:
    severity: str  # "watch" | "warning" | "critical"
    signals: Tuple[str, ...]
    summary: str


@dataclass(frozen=True)
class RiskReport:
    token_id: str
    completeness: GraphCompleteness
    leverage_cycles: Tuple[LeverageCycle, ...]
    blast_radius: BlastRadiusResult
    exit_liquidity: ExitLiquidityResult
    opacity: OpacityResult
    evidence_bundles: Tuple[EvidenceBundle, ...]

## 6. neigh_adapter_morpho.py (Example adapter)

# -*- coding: utf-8 -*-
"""Morpho venue adapter for neighborhood graph."""

from __future__ import annotations

from typing import Optional, Set

from neighborhood_common import Edge, Graph, Node, node_id, normalize_addr
from neigh_helpers import (
    _enrich_token_node,
    _token_nodes_by_chain,
    fetch_morpho_markets_for_chain,
)
from utils import get_logger, safe_float

log = get_logger("neigh")


def _attach_morpho_market_nodes(graph: Graph, eligible_ids: Optional[Set[str]] = None) -> None:
    token_nodes_by_chain = _token_nodes_by_chain(graph, eligible_ids=eligible_ids)
    if not token_nodes_by_chain:
        return

    for chain_id, token_nodes in token_nodes_by_chain.items():
        try:
            markets = fetch_morpho_markets_for_chain(chain_id)
        except Exception as exc:
            log.warning("Morpho market fetch failed for chain %s: %s", chain_id, exc)
            continue

        for market in markets:
            loan = market.get("loanAsset") or {}
            coll = market.get("collateralAsset") or {}
            loan_addr = normalize_addr(loan.get("address"))
            coll_addr = normalize_addr(coll.get("address"))
            loan_node = token_nodes.get(loan_addr) if loan_addr else None
            coll_node = token_nodes.get(coll_addr) if coll_addr else None
            if loan_node is None and coll_node is None:
                continue

            unique_key = market.get("uniqueKey") or ""
            if not unique_key:
                continue

            loan_symbol = loan.get("symbol") or "loan"
            coll_symbol = coll.get("symbol") or "collateral"
            _enrich_token_node(loan_node, symbol=loan_symbol, label=loan_symbol) if loan_node else None
            _enrich_token_node(coll_node, symbol=coll_symbol, label=coll_symbol) if coll_node else None

            state = market.get("state") or {}
            market_node = Node(
                id=node_id(chain_id, "lending_market", f"morpho:{unique_key}"),
                address=None,
                chainId=chain_id,
                kind="lending_market",
                label=f"{loan_symbol}/{coll_symbol} @ Morpho",
                symbol=f"{loan_symbol}/{coll_symbol}",
                role="other",
                protocol="morpho",
                project="Morpho",
                tvl=safe_float(state.get("supplyAssetsUsd"), default=None),
                apy_base=safe_float(state.get("avgSupplyApy"), default=None),
                source="morphoWatch",
                extra={
                    "unique_key": unique_key,
                    "loan_asset": loan_addr,
                    "collateral_asset": coll_addr,
                    "oracle": normalize_addr(market.get("oracleAddress")),
                    "irm": normalize_addr(market.get("irmAddress")),
                    "lltv": safe_float(market.get("lltv"), default=None),
                    "supply_usd": safe_float(state.get("supplyAssetsUsd"), default=None),
                    "borrow_usd": safe_float(state.get("borrowAssetsUsd"), default=None),
                    "liquidity_usd": safe_float(state.get("liquidityAssetsUsd"), default=None),
                    "utilization": safe_float(state.get("utilization"), default=None),
                    "apy_supply": safe_float(state.get("avgSupplyApy"), default=None),
                    "apy_borrow": safe_float(state.get("avgBorrowApy"), default=None),
                    "apy_net": safe_float(state.get("avgNetSupplyApy"), default=None),
                },
            )
            graph.add_node(market_node)

            if loan_node is not None:
                graph.add_edge(Edge(
                    src=loan_node.id,
                    dst=market_node.id,
                    type="LEND",
                    notes="morpho loanAsset",
                    source="morphoWatch",
                ))
            if coll_node is not None:
                graph.add_edge(Edge(
                    src=coll_node.id,
                    dst=market_node.id,
                    type="PLEDGE",
                    notes="morpho collateralAsset",
                    source="morphoWatch",
                ))

