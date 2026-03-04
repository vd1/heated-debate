# What comes next

## 1. Soft temperature via prompt dials
Replace real temperature (API-only) with prompt-injected behavioral knobs.
Start with a single scalar (creativity 1-5), test whether claude -p
output meaningfully shifts between dial settings. Then expand to a vector:
- Creativity: 1-5
- Risk tolerance: 1-5
- Verbosity: 1-5
- Deference: 1-5

Embed the dial in each exchange so it can vary per round per agent.
This is the trainable signal for RL later.

## 2. Stream JSON mode
~~Test `claude -p --input-format stream-json --output-format stream-json`
to keep a single process alive via stdin/stdout.~~ **Tested — doesn't work
that way.** `--input-format stream-json` is for piping one process's output
into another (`claude ... | claude --input-format stream-json`), not for
interactive multi-turn on a single process. Multi-turn still requires
`--resume` with separate invocations.

What *does* work: `--output-format json` gives structured results (session
ID, token counts, result text) instead of raw text. A Python orchestrator
using `--resume` + JSON output is the realistic subscription-path upgrade
over the legacy shell runner — same per-turn spawning, but with proper structured parsing
and asyncio concurrency.

For true single-process persistent agents, need the Agent SDK
(`claude-agent-sdk`) which requires an API key (not subscription).

## 3. Phase architecture
Split the debate into sequential phases, each its own conversation:

1. **Brainstorm** — high creativity dial, divergent exploration
2. **Hard spec** — low creativity, converge on precise plan
3. **Scaffold** — lay out files, interfaces, types from the spec
4. **Test** — write tests against the spec before implementation
5. **Fill in** — implement with continuous review per chunk

Output of each phase feeds as context to the next.

## 4. Tournament + judge
Run N parallel conversations (same phase, different dial settings or
model pairings). A judge agent (or panel of 3) scores the outputs.
Winner advances to next phase.

## 5. RL (or bayesian opt) over dial vectors
Treat the dial vector (per agent, per round, per phase) as the action
space. Judge score is the reward. Low-dimensional optimization —
Bayesian opt or evolutionary strategies, not deep RL.


## 6. Variations

add tokens to players moves in log
should we let agents digress from the topic?
exchange tips between agents -> write to agent's memory
interet user (≠ interet benchmark) -> on comprend mieux ses besoins et les difficultés

## 7. Streamy: Python orchestrator (subscription path)

Use a Python asyncio orchestrator (`streamy.py`) as the subscription path:
- Spawns `claude -p --output-format json --resume <session>` per turn
- Parses structured JSON for session IDs, token usage, results
- Manages two agent sessions via `--resume` + `--session-id`
- Runs concurrently where possible (e.g. both agents' tool init)
- Logs to markdown like shelley, but with token counts per turn
- Integrates `later/dials.py` via `--append-system-prompt`

Still one process per turn (unavoidable on subscription), but structured
output + Python control flow > bash string wrangling.

## 8. Agent SDK path (API key path)

For true efficiency gains, the Claude Agent SDK (`pip install claude-agent-sdk`)
gives persistent in-process agents with no per-turn spawning overhead:
- `query()` returns async iterator of typed messages
- Session continuity via `resume=session_id`
- Hooks for pre/post tool use, permissions callbacks
- Custom subagents with focused tool access
- Structured output via `--json-schema`

Trade-off: requires `ANTHROPIC_API_KEY` (API billing), not subscription.
But eliminates the ~50s cold-start per turn and gives native Python control
over the agent loop. Worth exploring once the debate protocol stabilizes.
