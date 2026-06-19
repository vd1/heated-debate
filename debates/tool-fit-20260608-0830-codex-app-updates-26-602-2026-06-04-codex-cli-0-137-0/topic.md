# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Plugin workflows gained machine-readable codex plugin list --json output and cached remote catalog suggestions ( #25330 , #25457 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Platform reliability improved for macOS app launches and Windows SQLite startup, thread resume, and sandbox setup refreshes ( #25485 , #25490 , #25509 , #25949 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Plugin loading preserves app manifest order, deduplicates local/remote curated installs, and treats malformed skills fields as warnings ( #25491 , #25681 , #25717 , #25782 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Permission requests and approvals now carry environment identity, and managed MITM proxying exports readable CA bundles to child commands ( #25850 , #25858 , #25862 , #22668 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Added app-server docs and generated schema updates for monthly credit limits, remote-control RPCs, and environment-scoped permission approvals ( #24812 , #25675 , #25785 , #25862 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / Codex app updates 26.602 / 2026-06-04 / Codex CLI 0.137.0**
  Detail: Shared prompts, context fragments, and skills plumbing moved into dedicated crates/extension paths to reduce codex-core coupling ( #25151 , #25953 , #25959 , #26106 , #26122 , #26167 ).
  Source: Codex changelog: https://developers.openai.com/codex/changelog

## Code_2026 Project Candidates

- **mopsus** (/Users/v/Code_2026/mopsus) score=43
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **heated-debate** (/Users/v/Code_2026/heated-debate) score=42
  Context files: /Users/v/Code_2026/heated-debate/README.md, /Users/v/Code_2026/heated-debate/CLAUDE.md, /Users/v/Code_2026/heated-debate/pyproject.toml, /Users/v/Code_2026/heated-debate/package.json
  Summary: README.md: # heated-debate Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds. ## Quick start ```bash # TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login) bun shelley.ts 5 # 5 rounds, default topic bun shelley.ts -f debates/stock-trades/topic.md 3 # 3 rounds, file topic MODEL_A=codex:gpt-5...
- **gaa** (/Users/v/Code_2026/gaa) score=35
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **agQSL** (/Users/v/Code_2026/agQSL) score=33
  Context files: /Users/v/Code_2026/agQSL/README.md, /Users/v/Code_2026/agQSL/CLAUDE.md, /Users/v/Code_2026/agQSL/pyproject.toml
  Summary: README.md: # agQSL `agQSL` is the working repository for the Quantum Software Lab vendor evaluation and debate project. It holds the local artefacts used to compare quantum hardware vendors, curate vendor/application evidence, run portability dossiers from recent hardware papers, and support the Ezratty-backed debate/search bots. The repository is deliberately filesystem-first: generated outputs should be rebuilt from source data, and agent handoffs should be visible in versioned Markdown...
- **dataroom** (/Users/v/Code_2026/dataroom) score=33
  Context files: /Users/v/Code_2026/dataroom/doc/README.md, /Users/v/Code_2026/dataroom/pyproject.toml
  Summary: doc/README.md: # Documentation Index Core documentation now lives under `doc/`: - `doc/functionalities.md` — system capabilities and architecture notes - `doc/tasks.md` — backlog and status tracking - `doc/collect_pipeline_architecture.excalidraw` — pipeline architecture diagram - `doc/mopsus_v2_build_checklist.md` — actionable phased implementation checklist for Mopsus v2 - `doc/mopsus_v2_multi_agent_architecture.excalidraw` — Mopsus v2 architecture diagram These files were moved from the...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-06-08 08:30.
