# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Claude Code / /design-login**
  Detail: <question> Workflow . Fan out web searches on a question, fetch and cross-check sources, and synthesize a cited report /design-login Authorize design-system access for /design-sync with your claude.ai account /design-sync [hint] Skill . Convert your repo’s React design system and upload it to Claude Design , so designs it produces use your real compo
  Source: Claude Code commands: https://code.claude.com/docs/en/commands
- **Claude Code / /design-sync**
  Detail: question, fetch and cross-check sources, and synthesize a cited report /design-login Authorize design-system access for /design-sync with your claude.ai account /design-sync [hint] Skill . Convert your repo’s React design system and upload it to Claude Design , so designs it produces use your real components. Optionally name the design system, for ex
  Source: Claude Code commands: https://code.claude.com/docs/en/commands
- **Claude Code / /design-sync [hint]**
  Detail: and synthesize a cited report /design-login Authorize design-system access for /design-sync with your claude.ai account /design-sync [hint] Skill . Convert your repo’s React design system and upload it to Claude Design , so designs it produces use your real components. Optionally name the design system, for example /design-sync Acme DS . A first-time sync v
  Source: Claude Code commands: https://code.claude.com/docs/en/commands
- **Claude Code / As**
  Detail: As of v2.1.196, the PowerShell tool matches the Bash tool’s handling of search and diff exit codes. Exit code 1 from grep , egrep , fgrep , and git grep means no matches, and exit code 1 from git diff means differences exist, so these results aren’t reported to Claude as command failures.
  Source: Claude Code tools reference: https://code.claude.com/docs/en/tools-reference
- **Claude Code / Binary**
  Detail: Binary messages : not passed through. Claude receives a placeholder line such as [binary frame, 512 bytes] instead.
  Source: Claude Code tools reference: https://code.claude.com/docs/en/tools-reference
- **Claude Code / Connect**
  Detail: Connect to a WebSocket feed and report each message as it arrives
  Source: Claude Code tools reference: https://code.claude.com/docs/en/tools-reference

## Code_2026 Project Candidates

- **gaa** (/Users/v/Code_2026/gaa) score=71
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **agQSL** (/Users/v/Code_2026/agQSL) score=58
  Context files: /Users/v/Code_2026/agQSL/README.md, /Users/v/Code_2026/agQSL/CLAUDE.md, /Users/v/Code_2026/agQSL/pyproject.toml
  Summary: README.md: # agQSL `agQSL` is the working repository for the Quantum Software Lab vendor evaluation and debate project. It holds the local artefacts used to compare quantum hardware vendors, curate vendor/application evidence, run portability dossiers from recent hardware papers, and support the Ezratty-backed debate/search bots. The repository is deliberately filesystem-first: generated outputs should be rebuilt from source data, and agent handoffs should be visible in versioned Markdown...
- **mopsus** (/Users/v/Code_2026/mopsus) score=58
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **predictionMarkets** (/Users/v/Code_2026/predictionMarkets) score=46
  Context files: /Users/v/Code_2026/predictionMarkets/CLAUDE.md
  Summary: CLAUDE.md: # CLAUDE.md This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. When writing code, first explore the project structure. Use the frontend-design skill if writing or modifying a user interface. ## Project Overview This is a prediction markets research and analysis project focused on Polymarket's infrastructure, particularly Bitcoin price prediction markets. It combines theoretical research (LaTeX), data collection scripts, and...
- **babycc** (/Users/v/Code_2026/babycc) score=43
  Context files: /Users/v/Code_2026/babycc/README.md, /Users/v/Code_2026/babycc/pyproject.toml
  Summary: README.md: # babycc A teaching-scale rewrite of the Claude Code agent loop, running against gemma4:26b served by Ollama on vms.local. Stdlib only, about 300 lines. ## Run ```bash cd ~/Code_2026/babycc uv run babycc # new session in the current directory uv run babycc -c # resume the latest session for this directory uv run babycc --yolo # skip bash approval prompts ``` The SSH tunnel to vms.local opens automatically if Ollama is not already reachable on 127.0.0.1:11434. It authenticates as...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-06-30 08:30.
