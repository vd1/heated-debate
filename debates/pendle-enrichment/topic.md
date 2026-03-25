## Phase B: Pendle Market Metadata Enrichment — Plan Review

PT/YT/SY tokens already appear in the neighborhood graph as regular nodes via
Enso BFS (role=stripped, edge type=STRIP). But they carry no Pendle-specific
data — no implied APR, no market TVL, no expiry. This phase enriches existing PT
nodes with market-level metadata without adding new nodes or edges.

### Proposed implementation

1. **Refactor shared market fetch (core/neigh_helpers.py)**
   - Extract the paginated fetch loop from `fetch_expired_pendle_addresses()` into `_fetch_all_pendle_markets(chain_id)` with session-level caching
   - `fetch_expired_pendle_addresses()` becomes a thin consumer of the shared fetch
   - No behavior change, just eliminates redundant API calls

2. **New adapter (core/neigh_adapter_pendle.py, ~50 lines)**
   - `_enrich_pendle_pt_nodes(graph, eligible_ids)` — does NOT create nodes or edges
   - Builds pt_address → market lookup from `_fetch_all_pendle_markets()`
   - Walks graph nodes matching PT pattern (symbol starts with "PT-", project=pendle)
   - Injects into node.extra: implied_apr, base_apr, reward_apr, expiry, pendle_market_address
   - Sets node.tvl from market liquidity if not already set
   - Does NOT overwrite apy_base (Pendle implied APR is a different concept)

3. **Wire into BFS and CLI**
   - Add `with_pendle: bool` to `build_neighborhood_double_bfs()`
   - Add `--with-pendle` CLI flag
   - Call after venue adapters with same eligible_ids=upstream_ids

4. **Tests (5 cases)**
   - PT node enriched with implied_apr/expiry
   - apy_base NOT overwritten
   - YT/SY nodes not enriched
   - No matching market → node unchanged
   - Fetch failure → warning, no crash

### Key design questions for debate
- Is enriching only PT nodes correct, or should YT nodes also get market data?
- Should the adapter also enrich SY nodes with aggregate data across their markets?
- Is the v2 API (`/core/v2/markets/all`) the right source, or should we use the v1 active-only endpoint from pendleWatch?
- Should expired-but-in-graph PT nodes also get enriched (e.g. for historical context)?
- Is `_fetch_all_pendle_markets` the right abstraction boundary, or should we expose a higher-level lookup?
