# Review Notes — New Files

## CLAUDE.md & debate.md
Minimal and correct. The protocol doc ("don't fetch, code is local", "check the diff on the commit") is a good guardrail for the two-agent review workflow. Minor gap: should note `git fetch` before diffing, since `git pull` can report "already up to date" when the remote is ahead.

## what-comes-next.md
Clear arc from practical to ambitious:

- **Soft dials** — prompt-injected behavioral knobs instead of API temperature. Whether models respond predictably to "creativity: 3/5" is the open empirical question.
- **Stream JSON** — persistent process would cut the ~40-60s per-turn spawning cost in shelley.sh.
- **Phase architecture** — brainstorm→spec→scaffold→test→implement. Each phase in its own conversation avoids context bloat.
- **Tournament + judge** — beam search over design space. Ambitious but well-framed.
- **RL over dial vectors** — Bayesian opt over a low-dimensional action space with judge scores as reward. Smart scoping — no deep RL infrastructure needed.

## Debate logs
The empty first log (`230600`) is a failed run, likely before the stderr fix — useful provenance. The second (`230831`) is a strong 3-round Sonnet vs Sonnet exchange. Agent B catches real bugs (float precision, Decimal construction boundary, `allow_short` semantics) and Agent A incorporates feedback cleanly. The Decimal-from-float cascade across three rounds is exactly the iterative refinement this setup is designed to produce.
