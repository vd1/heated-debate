# Topic - should a new Codex/Claude tool change one Code_2026 project?

The latest Mopsus tool digest found concrete Codex/Claude tool or command changes. Debate whether any one of them should be piloted in a real `/Users/v/Code_2026` project, and pick exactly one tool-project pair or explicitly decide "no pilot".

## New Tool/Command Candidates

- **Claude Code / Claude Code changelog / 2.1.215 / July 19, 2026**
  Detail: Claude no longer runs the /verify and /code-review skills on its own; invoke them with /verify or /code-review when you want them
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / July 19, 2026 / 2.1.214 / July 18, 2026**
  Detail: Fixed background sessions parked with ← or /background and left idle keeping the background daemon and a worker process alive indefinitely
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / July 19, 2026 / 2.1.214 / July 18, 2026**
  Detail: Fixed /install-github-app and the /mcp settings menu being blocked in agent-view sessions — they’re now refused only in background sessions with no terminal attached
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / July 19, 2026 / 2.1.214 / July 18, 2026**
  Detail: Fixed /ultrareview refusing to run in repos with no merge base — it now offers to review all tracked files
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / July 19, 2026 / 2.1.214 / July 18, 2026**
  Detail: Fixed claude update and claude doctor hanging silently, and the /status System diagnostics section going blank, when a shell-config path is a directory
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog
- **Claude Code / July 19, 2026 / 2.1.214 / July 18, 2026**
  Detail: Fixed a permission-check bypass affecting commands run in Windows PowerShell 5.1 sessions
  Source: Claude Code changelog: https://code.claude.com/docs/en/changelog

## Code_2026 Project Candidates

- **mopsus** (/Users/v/Code_2026/mopsus) score=76
  Context files: /Users/v/Code_2026/mopsus/README.md, /Users/v/Code_2026/mopsus/pyproject.toml, /Users/v/Code_2026/mopsus/prompts/situation.md, /Users/v/Code_2026/mopsus/prompts/soul.md
  Summary: README.md: # Mopsus Dual-agent Telegram bot (Claude + Codex) with data room integration. Mopsus connects to your local data room, lets you query it via Telegram, and runs an autonomous daily think phase that proposes ideas based on your activity. ## Architecture ![Architecture diagram](doc/mopsus_architecture.png) Mopsus runs as a long-lived Telegram daemon with two AI backends (Claude CLI and Codex CLI). It maintains a **blackboard** — a persistent conversation log that both agents can read...
- **nanoGPT-agentic-class** (/Users/v/Code_2026/nanoGPT-agentic-class) score=70
  Context files: /Users/v/Code_2026/nanoGPT-agentic-class/README.md, /Users/v/Code_2026/nanoGPT-agentic-class/CLAUDE.md
  Summary: README.md: # nanoGPT ![nanoGPT](assets/nanogpt.jpg) --- **Update Nov 2025** nanoGPT has a new and improved cousin called [nanochat](https://github.com/karpathy/nanochat). It is very likely you meant to use/find nanochat instead. nanoGPT (this repo) is now very old and deprecated but I will leave it up for posterity. --- The simplest, fastest repository for training/finetuning medium-sized GPTs. It is a rewrite of [minGPT](https://github.com/karpathy/minGPT) that prioritizes teeth over...
- **infPrime** (/Users/v/Code_2026/infPrime) score=67
  Context files: /Users/v/Code_2026/infPrime/README.md, /Users/v/Code_2026/infPrime/CLAUDE.md, /Users/v/Code_2026/infPrime/pyproject.toml
  Summary: README.md: # infprime Infinitude-of-primes knowledge-ingestion pilot. Second clean instance of the agQSL/qsens pipeline pattern (collect, analyse, context), built standalone so the reusable template can be extracted from the qsens vs infprime diff. Design: `infprime-pilot-design.md`. Plan: `infprime-pilot-plan.md`. ## Interactive class This repo can also run as a self-paced class inside Codex or Claude Code. ```bash git clone <repo-url> cd infPrime ./course/preflight ./course/enter-codex ```...
- **gaa** (/Users/v/Code_2026/gaa) score=64
  Context files: /Users/v/Code_2026/gaa/prompts/situation.md, /Users/v/Code_2026/gaa/prompts/soul.md
  Summary: prompts/situation.md: You are running as a scheduled headless agent over the repositories in `~/Code_2026/`. ## Your workspace Each subdirectory under `~/Code_2026/` is a git repository (or may become one). The active projects as of April 2026 include: - **agQSL** - Quantum supply chain analysis and vendor debate system - **mopsus** - Dual-agent Telegram bot (Claude + Codex) with data room - **YieldTree** - DeFi yield resolver with recursive protocol decomposition - **mms** - Morpho Micro...
- **agQSL** (/Users/v/Code_2026/agQSL) score=49
  Context files: /Users/v/Code_2026/agQSL/README.md, /Users/v/Code_2026/agQSL/CLAUDE.md, /Users/v/Code_2026/agQSL/pyproject.toml
  Summary: README.md: # agQSL `agQSL` is the working repository for the Quantum Software Lab vendor evaluation and debate project. It holds the local artefacts used to compare quantum hardware vendors, curate vendor/application evidence, run portability dossiers from recent hardware papers, and support the Ezratty-backed debate/search bots. The repository is deliberately filesystem-first: generated outputs should be rebuilt from source data, and agent handoffs should be visible in versioned Markdown...

## Output Contract

Settle these questions concretely:

1. Which single tool or command, if any, is worth piloting?
2. Which single project should receive the pilot?
3. What exact workflow or file/module would change?
4. What is the smallest reversible experiment to run first?
5. What failure mode would make this a bad idea?

Before arguing usefulness, apply this admissibility gate to every bug-fix or newly-enabled command candidate: does the proposed local project exhibit the exact condition fixed or enabled by the release item? Show evidence from git state, config, command failure, log excerpt, repo structure, or documented workflow. If the condition is absent or unproven, reject that candidate before project-specific argument.

Do not summarize release notes generically. Argue from the project context. The final round must produce a go/no-go recommendation with one concrete next action.

Staged by Mopsus on 2026-07-20 08:30.
