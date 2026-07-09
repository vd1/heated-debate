# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Claude Code / Claude Code changelog / 2.1.202 / July 6, 2026**
  Detail: Added a “Dynamic workflow size” setting in /config for controlling how large Claude generally makes dynamic workflows (small/medium/large agent counts) — an advisory guideline, not an enforced cap
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / Claude Code changelog / 2.1.202 / July 6, 2026**
  Detail: Fixed /rename on background sessions being reverted when the job restarts, which broke addressing the session by its new name
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / Claude Code changelog / 2.1.202 / July 6, 2026**
  Detail: Fixed /remote-control sessions showing the wrong permission mode in the mobile and web apps
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / Claude Code changelog / 2.1.202 / July 6, 2026**
  Detail: Improved /workflows agent list layout: wider titles, a dedicated time column, shorter model names, and no per-row tool-call counts
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / Claude Code changelog / 2.1.202 / July 6, 2026**
  Detail: Changed /review <pr> back to a fast single-pass review; use /code-review <level> <pr#> for the multi-agent review at a chosen effort level
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Codex / Codex SDK / Codex changelog / 2026-07-06**
  Detail: Improved plugin autocomplete with installed plugins and their icons.
  Source: Codex changelog: https://developers.openai.com/codex/changelog

## Code_2026 Project Candidates

- **babycc** (/Users/v/Code_2026/babycc) score=78
  Context files: /Users/v/Code_2026/babycc/README.md, /Users/v/Code_2026/babycc/pyproject.toml
  Summary: README.md: # babycc A teaching-scale rewrite of the Claude Code agent loop, running against gemma4:26b served by Ollama on vms.local. Stdlib only, about 300 lines. ## Run ```bash cd ~/Code_2026/babycc uv run babycc # new session in the current directory uv run babycc -c # resume the latest session for this directory uv run babycc --yolo # skip bash approval prompts ``` The SSH tunnel to vms.local opens automatically if Ollama is not already reachable on 127.0.0.1:11434. It authenticates as...
- **mopsus** (/Users/v/Code_2026/mopsus) score=71
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **gaa** (/Users/v/Code_2026/gaa) score=69
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **agQSL** (/Users/v/Code_2026/agQSL) score=60
  Context files: /Users/v/Code_2026/agQSL/README.md, /Users/v/Code_2026/agQSL/CLAUDE.md, /Users/v/Code_2026/agQSL/pyproject.toml
  Summary: README.md: # agQSL `agQSL` is the working repository for the Quantum Software Lab vendor evaluation and debate project. It holds the local artefacts used to compare quantum hardware vendors, curate vendor/application evidence, run portability dossiers from recent hardware papers, and support the Ezratty-backed debate/search bots. The repository is deliberately filesystem-first: generated outputs should be rebuilt from source data, and agent handoffs should be visible in versioned Markdown...
- **heated-debate** (/Users/v/Code_2026/heated-debate) score=56
  Context files: /Users/v/Code_2026/heated-debate/README.md, /Users/v/Code_2026/heated-debate/CLAUDE.md, /Users/v/Code_2026/heated-debate/pyproject.toml, /Users/v/Code_2026/heated-debate/package.json
  Summary: README.md: # heated-debate Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds. ## Quick start ```bash # TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login) bun shelley.ts 5 # 5 rounds, default topic bun shelley.ts -f debates/stock-trades/topic.md 3 # 3 rounds, file topic MODEL_A=codex:gpt-5...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-07-08 08:30.
