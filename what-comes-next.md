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
Test `claude -p --input-format stream-json --output-format stream-json`
to keep a single process alive via stdin/stdout. Could replace shelley's
per-turn process spawning with a faster Python-driven orchestrator that
still uses subscription (no API credits).

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

## 5. RL over dial vectors
Treat the dial vector (per agent, per round, per phase) as the action
space. Judge score is the reward. Low-dimensional optimization —
Bayesian opt or evolutionary strategies, not deep RL.
