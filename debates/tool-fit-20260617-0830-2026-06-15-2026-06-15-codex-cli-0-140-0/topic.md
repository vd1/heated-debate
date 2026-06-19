# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: Added /usage views for daily, weekly, and cumulative account token activity. ( #27925 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: /goal now preserves oversized text, large pasted blocks, and image attachments, including in remote app-server sessions. ( #27508 , #27509 , #27510 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: Added permanent session deletion through codex delete , /delete , and app-server thread/delete , with confirmation safeguards and subagent cleanup. ( #25018 , #27476 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: Added /import for selectively importing setup, project configuration, and recent chats from Claude Code. ( #27070 , #27071 , #27703 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: Typing @ now opens the unified mentions menu for files, plugins, and skills by default. ( #27499 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog
- **Codex / 2026-06-15 / 2026-06-15 / Codex CLI 0.140.0**
  Detail: Added managed Amazon Bedrock API-key authentication and encrypted local storage for CLI and MCP OAuth credentials. ( #27443 , #27689 , #27504 , #27535 , #27539 , #27541 )
  Source: Codex changelog: https://developers.openai.com/codex/changelog

## Code_2026 Project Candidates

- **mopsus** (/Users/v/Code_2026/mopsus) score=69
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **agQSL** (/Users/v/Code_2026/agQSL) score=47
  Context files: /Users/v/Code_2026/agQSL/README.md, /Users/v/Code_2026/agQSL/CLAUDE.md, /Users/v/Code_2026/agQSL/pyproject.toml
  Summary: README.md: # agQSL `agQSL` is the working repository for the Quantum Software Lab vendor evaluation and debate project. It holds the local artefacts used to compare quantum hardware vendors, curate vendor/application evidence, run portability dossiers from recent hardware papers, and support the Ezratty-backed debate/search bots. The repository is deliberately filesystem-first: generated outputs should be rebuilt from source data, and agent handoffs should be visible in versioned Markdown...
- **heated-debate** (/Users/v/Code_2026/heated-debate) score=47
  Context files: /Users/v/Code_2026/heated-debate/README.md, /Users/v/Code_2026/heated-debate/CLAUDE.md, /Users/v/Code_2026/heated-debate/pyproject.toml, /Users/v/Code_2026/heated-debate/package.json
  Summary: README.md: # heated-debate Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds. ## Quick start ```bash # TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login) bun shelley.ts 5 # 5 rounds, default topic bun shelley.ts -f debates/stock-trades/topic.md 3 # 3 rounds, file topic MODEL_A=codex:gpt-5...
- **gaa** (/Users/v/Code_2026/gaa) score=43
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **snapNotesApp** (/Users/v/Code_2026/snapNotesApp) score=41
  Context files: /Users/v/Code_2026/snapNotesApp/README.md, /Users/v/Code_2026/snapNotesApp/pyproject.toml
  Summary: README.md: # SnapNotes Assistant scolaire IA de poche - AI-powered pocket school assistant. Upload your handwritten notes and receive: - Digital notes - Summary - Quiz - Flashcards ## Repository Layout - `app.py` - Flask application entry point. - `models/`, `routes/`, `services/` - core backend modules. - `templates/`, `static/` - web UI assets. - `migrations/` - Alembic/Flask-Migrate database migrations. - `gemma_local/`, `eval_data/`, `reports/`, `scripts/` - local evaluation harness and...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-06-17 08:30.
