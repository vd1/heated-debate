# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Codex / 2026-06-22 / 2026-06-22 / Codex CLI 0.142.0**
  Detail: /usage can now show and redeem earned usage-limit reset credits, with confirmation, retry, and refreshed availability states. ( #28154 , #28793 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-22 / 2026-06-22 / Codex CLI 0.142.0**
  Detail: /plugins now organizes remote plugins into OpenAI Curated, Workspace, and Shared with me sections, while eligible turns can recommend and install relevant plugins. ( #26703 , #28399 , #28400 , #27704 , #28403 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-22 / Codex CLI 0.142.0 / Codex can now receive scheduled UTC time reminders and query the current time directly, including through client-provided app-server clocks. ( #28822 , #28824 , #28835 , #29011 )**
  Detail: Exec-server processes and stdio MCP sessions now survive transient disconnects, including signed-URL refresh and retry-safe stdin writes. ( #28512 , #28374 , #28546 , #28895 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-22 / Codex CLI 0.142.0 / Codex can now receive scheduled UTC time reminders and query the current time directly, including through client-provided app-server clocks. ( #28822 , #28824 , #28835 , #29011 )**
  Detail: Remote environments now preserve executor-native paths, shells, AGENTS.md discovery, and sandbox behavior across operating systems. ( #28146 , #28152 , #28958 , #28983 , #29099 , #29108 , #29113 , #29424 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-22 / Codex CLI 0.142.0 / Codex can now receive scheduled UTC time reminders and query the current time directly, including through client-provided app-server clocks. ( #28822 , #28824 , #28835 , #29011 )**
  Detail: Plugin loading and installation now handle root marketplace layouts, manifest fallbacks, multiple skill paths, actionable download errors, and immediate tool refreshes. ( #28771 , #28789 , #28790 , #28863 , #28951 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-22 / Codex CLI 0.142.0 / Codex can now receive scheduled UTC time reminders and query the current time directly, including through client-provided app-server clocks. ( #28822 , #28824 , #28835 , #29011 )**
  Detail: Parent agents now receive terminal subagent errors instead of seeing failed work as an empty successful completion. ( #28375 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog

## Code_2026 Project Candidates

- **mopsus** (/Users/v/Code_2026/mopsus) score=60
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **soY** (/Users/v/Code_2026/soY) score=43
  Context files: /Users/v/Code_2026/soY/CLAUDE.md
  Summary: CLAUDE.md: # soYDetection - syrupUSDC Oracle Detection & Analysis ## Project Overview Tools for querying and analyzing Chainlink price feeds for syrupUSDC/USDC across multiple chains, and comparing oracle behavior. ## Quick Start ```bash # Load environment variables (RPC URLs) source env.sh # Run with virtual environment .venv/bin/python scripts/atDetector.py --help # Install new packages uv pip install <package> ``` ## Key Files | File | Purpose | |------|---------| |...
- **gaa** (/Users/v/Code_2026/gaa) score=41
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **heated-debate** (/Users/v/Code_2026/heated-debate) score=39
  Context files: /Users/v/Code_2026/heated-debate/README.md, /Users/v/Code_2026/heated-debate/CLAUDE.md, /Users/v/Code_2026/heated-debate/pyproject.toml, /Users/v/Code_2026/heated-debate/package.json
  Summary: README.md: # heated-debate Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds. ## Quick start ```bash # TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login) bun shelley.ts 5 # 5 rounds, default topic bun shelley.ts -f debates/stock-trades/topic.md 3 # 3 rounds, file topic MODEL_A=codex:gpt-5...
- **qsens** (/Users/v/Code_2026/qsens) score=37
  Context files: /Users/v/Code_2026/qsens/README.md, /Users/v/Code_2026/qsens/pyproject.toml
  Summary: README.md: # qsens Quantum sensing knowledge-ingestion pilot. First instance of the agQSL pipeline pattern (collect, analyse, context), built standalone so the reusable template can be extracted from the diff against agQSL. ## Layers - **Collect.** `scan` appends candidate rows to `data/candidates.jsonl`; `triage` admits and labels them into `data/store.json`. - **Analyse.** `analyse` runs one analyser pass per admitted item into `data/artefacts/<id>.md`. - **Context.** Per-platform primers...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-06-24 08:30.
