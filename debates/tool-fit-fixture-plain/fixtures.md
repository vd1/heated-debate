# Redacted Tool-Fit Fixture

This is a redacted, static fixture for comparing ordinary prompt context with a structured protocol cartridge. It is not live blackboard, Telegram, dataroom, or changelog state.

## Tool/Command Candidates

- **Codex / Codex changelog**
  Detail: Permissions
  Evidence strength: medium
  Relevant risk: may reduce accidental overreach, but can also create false confidence if policy is not tested against real workflows.
- **Codex / Codex changelog**
  Detail: MCP for deep research
  Evidence strength: low
  Relevant risk: tempting for research-heavy repos, but source authority and provenance boundaries are unclear in this fixture.
- **Codex / Codex changelog**
  Detail: MCP Apps in ChatGPT
  Evidence strength: low
  Relevant risk: useful for connected apps, but not obviously local-first or reversible for these projects.
- **Codex / Codex changelog**
  Detail: MCP Server
  Evidence strength: medium
  Relevant risk: creates a typed local context surface, but can become a privileged path into personal or stale data.
- **Codex / Codex changelog**
  Detail: Skills & Plugins
  Evidence strength: medium
  Relevant risk: useful for packaging repeatable agent protocols, but can devolve into framework work.
- **Codex / Codex CLI / Codex IDE extension / Codex cloud**
  Detail: Computer use
  Evidence strength: low
  Relevant risk: powerful but operationally noisy for a first pilot.

## Project Candidates

- **mopsus** (`/Users/v/Code_2026/mopsus`) score=25
  Summary: long-lived Telegram daemon with Claude and Codex backends, blackboard state, data room integration, daily think phase, tool digest job, and automatic heated-debate staging.
  Pilot risk: high. Personal-data-adjacent, daemonised, already has many moving parts.
  Reversibility: medium if feature-flagged, low if runtime paths depend on the new interface.

- **heated-debate** (`/Users/v/Code_2026/heated-debate`) score=24
  Summary: multi-agent debate engine with topic directories, optional `context.txt`, CLI-backed Claude/Codex debates, and transcript logs.
  Pilot risk: low. It is an evaluation harness rather than a production daemon.
  Reversibility: high if the experiment is limited to new debate directories.

- **gaa** (`/Users/v/Code_2026/gaa`) score=20
  Summary: scheduled headless repo hygiene and review agent with explicit noninteractive constraints.
  Pilot risk: medium. Guardrail experiments fit, but unattended mode makes ambiguous changes unattractive.
  Reversibility: medium if report-only.

- **dataroom** (`/Users/v/Code_2026/dataroom`) score=18
  Summary: local activity collection and summary system feeding Mopsus.
  Pilot risk: high. It contains personal activity channels and collector credentials nearby.
  Reversibility: medium for docs, low for collector/runtime changes.

- **agQSL** (`/Users/v/Code_2026/agQSL`) score=15
  Summary: evidence-heavy quantum vendor evaluation repository with portability dossiers and explicit provenance rules.
  Pilot risk: medium-high. Research workflows benefit from tooling, but weak provenance can pollute curated claims.
  Reversibility: medium if confined to comments or plans.

## Comparison Setup

The plain run receives only this fixture. The structured run receives the same fixture plus a rubric and protocol. A better structured result should be more grounded, specific, reversible, and cautious about authority. It should not merely sound more procedural.
