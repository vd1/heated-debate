# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: Expanded /import to migrate Cursor and Claude Code settings, MCP servers, plugins, sessions, commands, and project-scoped memories. ( #31672 , #33411 , #33426 , #33444 )
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog
- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: Prevented slow or conflicting MCP startup and authentication flows by enforcing startup timeouts, avoiding blocking OAuth discovery, serializing refreshes, and reusing tool catalogs safely. ( #32229 , #32781 , #32825 , #33184 , #33297 )
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog
- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: Improved Windows execution and sandbox reliability, including native exec-server sandboxing, network-proxy enforcement, hidden helper consoles, and correctly quoted hook commands. ( #32849 , #32857 , #33926 , #34423 )
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog
- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: Updated the bundled OpenAI Docs skill with current GPT-5.6 model resolution, prompting, and migration guidance across macOS, Linux, and Windows. ( #31842 , #33121 )
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog
- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: Reduced startup and large-context overhead with concurrent skill/plugin discovery and more efficient remote compaction. ( #31566 , #33369 , #33423 , #34431 )
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog
- **Codex / 2026-07-23 / 2026-07-21 / Codex CLI 0.145.0**
  Detail: #31566 perf(skills): reuse walk inventory for host loading @jif-oai
  Source: Codex changelog: https://learn.chatgpt.com/docs/changelog

## Code_2026 Project Candidates

- **babycc** (/Users/v/Code_2026/babycc) score=54
  Context files: /Users/v/Code_2026/babycc/README.md, /Users/v/Code_2026/babycc/pyproject.toml
  Summary: README.md: # babycc A teaching-scale rewrite of the Claude Code agent loop, running against gemma4:26b served by Ollama on vms.local. Stdlib only, about 300 lines. ## Run ```bash cd ~/Code_2026/babycc uv run babycc # new session in the current directory uv run babycc -c # resume the latest session for this directory uv run babycc --yolo # skip bash approval prompts ``` ## Math practice ```bash uv run babycc math-practice # 27 curated text exercises uv run babycc math-practice --set visual #...
- **infPrime** (/Users/v/Code_2026/infPrime) score=54
  Context files: /Users/v/Code_2026/infPrime/README.md, /Users/v/Code_2026/infPrime/CLAUDE.md, /Users/v/Code_2026/infPrime/pyproject.toml
  Summary: README.md: # infprime Infinitude-of-primes knowledge-ingestion pilot. Second clean instance of the agQSL/qsens pipeline pattern (collect, analyse, context), built standalone so the reusable template can be extracted from the qsens vs infprime diff. Design: `infprime-pilot-design.md`. Plan: `infprime-pilot-plan.md`. ## Interactive class This repo can also run as a self-paced class inside Codex or Claude Code. ```bash git clone <repo-url> cd infPrime ./course/preflight ./course/enter-codex ```...
- **mopsus** (/Users/v/Code_2026/mopsus) score=53
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **heated-debate** (/Users/v/Code_2026/heated-debate) score=50
  Context files: /Users/v/Code_2026/heated-debate/README.md, /Users/v/Code_2026/heated-debate/CLAUDE.md, /Users/v/Code_2026/heated-debate/pyproject.toml, /Users/v/Code_2026/heated-debate/package.json
  Summary: README.md: # heated-debate Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds. ## Quick start ```bash # TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login) bun shelley.ts 5 # 5 rounds, default topic bun shelley.ts -f debates/stock-trades/topic.md 3 # 3 rounds, file topic MODEL_A=codex:gpt-5...
- **nanoGPT-agentic-class** (/Users/v/Code_2026/nanoGPT-agentic-class) score=50
  Context files: /Users/v/Code_2026/nanoGPT-agentic-class/README.md, /Users/v/Code_2026/nanoGPT-agentic-class/CLAUDE.md
  Summary: README.md: # nanoGPT ![nanoGPT](assets/nanogpt.jpg) --- **Update Nov 2025** nanoGPT has a new and improved cousin called [nanochat](https://github.com/karpathy/nanochat). It is very likely you meant to use/find nanochat instead. nanoGPT (this repo) is now very old and deprecated but I will leave it up for posterity. --- The simplest, fastest repository for training/finetuning medium-sized GPTs. It is a rewrite of [minGPT](https://github.com/karpathy/minGPT) that prioritizes teeth over...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Before arguing usefulness, apply this admissibility gate to every bug-fix or newly-enabled command candidate: does the proposed local project exhibit the exact condition fixed or enabled by the release item? Show evidence from git state, config, command failure, log excerpt, repo structure, or documented workflow. If the condition is absent or unproven, reject that candidate before project-specific argument.

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-07-26 08:30.
