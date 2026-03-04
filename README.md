# heated-debate

Multi-agent debate engine that pits LLM agents against each other in structured, round-based design reviews. An architect proposes, a reviewer critiques, and a creativity dial cools from wild to precise across rounds.

## Quick start

```bash
# TypeScript frontend (bun + CLI backends; supports claude/codex CLI subscription login)
bun shelley.ts 5                                          # 5 rounds, default topic
bun shelley.ts -f debates/stock-trades/topic.md 3         # 3 rounds, file topic
MODEL_A=codex:gpt-5 MODEL_B=codex:gpt-5 bun shelley.ts -f debates/stock-trades/topic.md 3

# Python frontend (uses LiteLLM — needs API keys in .env)
uv run later/pynaille.py --rounds 5 --topic "Design a cache"
uv run later/pynaille.py --agent-a gemini/gemini-2.5-flash --agent-b gemini/gemini-2.5-flash
```

## Files

| File | Description |
|------|-------------|
| `shelley.ts` | Bun frontend — orchestrates debates via CLI backends. Supports `claude:*` and `codex:*` model specs (via CLI subscriptions, not API keys). |
| `later/pynaille.py` | Python frontend — orchestrates debates via LiteLLM. Supports any model LiteLLM can route to. Outputs JSON logs. |
| `later/dials.py` | Shared creativity dial + temperature schedule. Importable as a Python module and callable as a CLI. Maps round number to a creativity level (5→1) and temperature (1.0→0.3). |
| `later/streamy.py` | Test harness for `claude -p --output-format stream-json`. Exploratory — not used in debates yet. |
| `pyproject.toml` | Python project config. Dependencies: `litellm`, `python-dotenv`. |
| `debate.md` | Protocol doc for agent-to-agent code review via GitHub issues. |
| `doc/what-comes-next.md` | Roadmap: stream-json mode, phase architecture, tournament + judge, RL over dial vectors. |
| `doc/review-notes.md` | Review notes on the project’s docs and early debate logs. |
## Debate topics

Each topic lives in its own directory under `debates/`:

```
debates/
  stock-trades/
    topic.md              ← what we're debating (1-3 sentences)
    20260223_230831.md    ← timestamped transcript
    20260223_pynaille.md
  review-dials-refactor/
    topic.md
    context.txt           ← file paths for agents to review
```

- **`topic.md`** — a short description of the debate topic. No code, no instructions.
- **`context.txt`** — optional list of file paths (relative to repo root, one per line). shelley.ts reads the actual files and includes them in the agents' first-round prompts. No copies — agents always see current source.
- **Transcripts** — timestamped markdown logs written after each run.

## Creativity dial

The dial cools linearly from 5 (Wild) to 1 (Precise) across rounds. Each level prepends a behavioral instruction to the agent's prompt:

| Dial | Label | Instruction |
|------|-------|-------------|
| 5 | Wild | Explore radical alternatives. Question the premise. |
| 4 | Creative | Suggest improvements. Challenge assumptions. |
| 3 | Balanced | Mix new ideas with refinement. Weigh tradeoffs. |
| 2 | Focused | Refine the current approach. Fix issues. No new directions. |
| 1 | Precise | Converge. Correctness, consistency, completeness only. |

In later/pynaille.py, the API temperature also cools (1.0→0.3). In shelley.ts, the dial prefix is the only behavioral modulator (claude/codex CLI doesn't expose temperature).

## Environment

- Python ≥3.12, managed with `uv`
- TypeScript frontend requires `bun`; bun auto-loads `.env`, so shelley.ts strips provider API keys when spawning `claude`/`codex` CLIs to stay on subscription auth
- Python frontend requires a `.env` with API keys for your chosen LiteLLM provider
