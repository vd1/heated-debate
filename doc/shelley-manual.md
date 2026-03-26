# Shelley Manual

Quick reference for running a multi-agent debate with `shelley.ts`.

## What It Does

Shelley orchestrates a round-based debate between two LLM agents:

- **Agent A** (architect) proposes and refines plans
- **Agent B** (reviewer) critiques and challenges

A **creativity dial** cools from 5 (Wild) to 1 (Precise) across rounds, steering agents from divergent exploration toward convergent decisions. Output is a timestamped markdown transcript.

## Running a Debate

```bash
# Default: 5 rounds, default topic, both agents use codex
bun shelley.ts

# Set round count
bun shelley.ts 3

# Inline topic
bun shelley.ts 4 "Design a rate limiter with sliding window"

# Topic from file (recommended — also sets log directory)
bun shelley.ts -f debates/my-topic/topic.md 5
```

## Setting Up a New Debate

Create a directory under `debates/` with at least a `topic.md`:

```
debates/my-topic/
  topic.md        # required — the debate prompt (markdown)
  context.txt     # optional — files to inline into round 1
```

**topic.md** — Write the problem statement, proposed approach, and specific questions for the agents to debate. Can be any length; agents see the full text.

**context.txt** — One file path per line, relative to the repo root. Lines starting with `#` are comments. Each file is read and appended to both agents' round-1 prompts.

```
# Example context.txt
src/core/adapter.py
tests/test_adapter.py
docs/rfc-new-adapter.md
```

## Choosing Models

Set `MODEL_A` and `MODEL_B` environment variables. Default for both is `codex:gpt-5.4`.

```bash
# Both agents use Claude Opus
MODEL_A=claude:claude-opus-4-6 MODEL_B=claude:claude-opus-4-6 bun shelley.ts -f debates/my-topic/topic.md 4

# Mixed: Codex architect, Claude reviewer
MODEL_A=codex MODEL_B=claude:claude-sonnet-4-6 bun shelley.ts 3

# Shorthand: bare name defaults to Claude backend
MODEL_A=haiku MODEL_B=haiku bun shelley.ts 2
```

Format: `backend:model` where backend is `claude` or `codex`. A bare model name (no colon) defaults to Claude. Bare `codex` uses the default Codex model.

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `MODEL_A` | `codex:gpt-5.4` | Agent A model spec |
| `MODEL_B` | `codex:gpt-5.4` | Agent B model spec |
| `SHELLEY_TIMEOUT_MS` | `420000` (7 min) | Per-turn timeout |
| `CODEX_REASONING_EFFORT` | `high` | Codex reasoning: `minimal\|low\|medium\|high\|xhigh` |
| `CODEX_HISTORY_WINDOW` | `6` | Turns of history injected per Codex call |
| `RESUME_FROM_LOG` | — | Path to prior transcript to resume from |
| `START_ROUND` | `1` | Round to start at (requires seed prompt) |
| `SEED_PROMPT_A` | — | Text seed for Agent A when resuming |
| `SEED_PROMPT_A_FILE` | — | File containing seed for Agent A |
| `MODERATOR` | — | Enable moderator, e.g. `claude:claude-haiku-4-5` |
| `MODERATOR_LEVEL` | `2` | Moderator aggressiveness: `1\|2\|3` |
| `DIAL_EXPONENT` | `1` | Dial curve shape: <1 cools early, >1 stays wild longer |
| `PANEL` | — | Enable expert panel, e.g. `claude:claude-opus-4-6` |
| `PANEL_OUTPUT` | `{log}_panel.json` | Override panel JSON output path |

## Resuming an Interrupted Debate

If a debate is interrupted, resume from its transcript:

```bash
RESUME_FROM_LOG=debates/my-topic/20260325_140000.md bun shelley.ts -f debates/my-topic/topic.md 5
```

Shelley parses the log to find the last completed round and Agent B's final output, then continues from the next round. The transcript is written to a *new* file (does not append to the old one).

## Dynamic Moderator

When `MODERATOR` is set, a lightweight agent runs between every turn, observing the latest exchange and producing structured guidance for the next agent. The moderator can:

- Nudge agents back on topic if they're drifting
- Push for more creativity if the debate converges too early
- Urge convergence when rounds are running out
- Override the dial level for the next turn

The moderator **augments** the fixed dial schedule — it doesn't replace it. Guidance is logged as HTML comments in the transcript (visible in source, hidden when rendered).

```bash
# Enable moderator with haiku, aggressiveness 2
MODERATOR=claude:claude-haiku-4-5 bun shelley.ts -f debates/my-topic/topic.md 5

# More aggressive moderator
MODERATOR=claude:claude-haiku-4-5 MODERATOR_LEVEL=3 bun shelley.ts -f debates/my-topic/topic.md 5
```

## Expert Panel

When `PANEL` is set, three expert agents independently evaluate the debate after it concludes, then a synthesizer merges their assessments:

- **Pragmatist** — Is the plan actionable and implementable?
- **Devil's Advocate** — What was missed? What was conceded too easily?
- **Architect** — Are the design decisions technically sound?

Each expert scores four dimensions (1-10): convergence quality, intellectual depth, practical feasibility, debate dynamics. The synthesizer produces key conclusions, unresolved disagreements, and a recommendation.

Output: `{timestamp}_panel.json` (machine-readable) + `## Expert Panel` section appended to the transcript.

```bash
# Run debate with panel evaluation
PANEL=claude:claude-opus-4-6 bun shelley.ts -f debates/my-topic/topic.md 5

# Full setup: moderator (haiku) + panel (opus)
MODERATOR=claude:claude-haiku-4-5 PANEL=claude:claude-opus-4-6 bun shelley.ts -f debates/my-topic/topic.md 5
```

## Parameter Optimization

`optimize.py` uses Optuna to search for optimal debate parameters, using panel scores as the reward signal.

```bash
# Run 20 trials on a topic
uv run optimize.py --topic debates/stock-trades/topic.md --trials 20

# Average over 2 reps per config to handle non-determinism
uv run optimize.py --topic debates/stock-trades/topic.md --trials 20 --reps 2
```

Parameters searched: dial exponent, round count, moderator level/model, agent A/B models. Study persists to `optuna_shelley.db` (SQLite) and is resumable across runs.

## How the Dial Works

The dial maps each round to a creativity level from 5 down to 1. By default the interpolation is linear, but `DIAL_EXPONENT` changes the curve shape (`5 - 4 * t^exponent`):

| Rounds | Dial sequence |
|--------|--------------|
| 5 | 5, 4, 3, 2, 1 |
| 3 | 5, 3, 1 |
| 2 | 5, 1 |
| 1 | 5 |

Each turn is prefixed with a behavioral instruction:

- **5 (Wild):** Explore radical alternatives. Question the premise.
- **4 (Creative):** Challenge assumptions. Consider non-obvious solutions.
- **3 (Balanced):** Mix new ideas with refinement. Weigh tradeoffs.
- **2 (Focused):** Refine the current approach. Fix issues. No new directions.
- **1 (Precise):** Converge and finalize into a clear bulleted plan.

## Output

Transcripts are saved to the topic's directory (or `debates/` for inline topics) as `YYYYMMDD_HHMMSS.md` with a stats footer showing per-turn durations. A sidecar `.stderr.log` captures backend warnings.

## Agent System Prompts

These are fixed — agents are told to output architectural decisions and feedback, not code:

- **Agent A:** "You are a software architect in a debate. Propose and refine implementation plans. Be concise. Output bulleted decisions, tradeoffs, and architectural patterns. Do not write code diffs, code blocks, commands, or final implementations."
- **Agent B:** "You are a critical code reviewer in a debate. Challenge proposals, find flaws, and suggest improvements. Be concise. Output feedback on the architectural approach and risks. Do not write code diffs, code blocks, commands, or final implementations."

## Backend Details

**Claude** — Spawns `claude -p` with `--session-id` (round 1) or `--resume` (rounds 2+). Retries once on empty output. API keys are stripped from env to force subscription auth.

**Codex** — Spawns `codex exec --sandbox read-only`. Stateless; shelley maintains a sliding history window per agent and composes it into each prompt. No retry on empty output.

## Python Alternative

`later/pynaille.py` is a parallel orchestrator using LiteLLM (supports any provider). Outputs JSON with token counts.

```bash
uv run later/pynaille.py --rounds 3 --topic "Design a cache" --agent-a gemini/gemini-2.5-flash --agent-b gpt-4o
```
