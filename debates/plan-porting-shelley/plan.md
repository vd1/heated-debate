# Plan: Port the legacy shell runner to shelley.ts

## Context

The legacy shell runner is hitting its ceiling — JSON parsing, token tracking, and history management are painful in zsh. Rewrite in TypeScript (bun). Still shells out to CLI tools (subscription, no API key). Adds per-turn token/cost tracking.

## Key changes from the shell version

1. **Inline dials logic** — rewrite dials.py in TS, drop `getTemp` (dead code for CLI backends). Rename `DIAL_LEVELS` → `DIAL_PROMPTS`. Add upper clamp `Math.min(5, ...)`.
2. **CLI backends: claude + codex stubs** — per-agent backend via model prefix: `MODEL_A=claude:sonnet MODEL_B=codex:gpt-4o-mini`. No colon → default claude.
3. **Structured JSON output** — `claude -p --output-format json` for token/cost/duration tracking.
4. **Better markdown separation** — `---` between rounds, blank lines between turns, stats in `<details>`.

## Design

Single file: `shelley.ts` (~250 lines), bun shebang, no package.json.

### callClaude

```typescript
async function callClaude(opts: CallOpts): Promise<LLMResult> {
  const args = ["claude", "-p", "--output-format", "json", "--model", opts.model];
  if (opts.resume) {
    args.push("--resume", opts.resume);
  } else {
    if (opts.systemPrompt) args.push("--system-prompt", opts.systemPrompt);
    args.push("--session-id", opts.sessionId!);  // caller owns UUID
  }
  args.push(opts.prompt);

  const env = { ...process.env };
  delete env.CLAUDE_CODE;    // unset nested-session guard
  delete env.CLAUDECODE;
  const proc = Bun.spawn(args, { env, stdout: "pipe", stderr: "pipe" });
  // ... parse JSON response for .result, .usage, .total_cost_usd, .duration_ms
}
```

Session management: we own the UUID via `--session-id` / `--resume` (proven by the legacy shell runner).

### callCodex (stub)

`codex exec "prompt" --json` — stateless, no `--resume`. Maintain in-memory history, inject windowed (`HISTORY_WINDOW=6`) flattened history into prompt. Cost computed from `CODEX_COSTS_PER_M` table (claude returns cost directly, codex doesn't). Mark with `// STUB: verify codex CLI flags`.

### Logging

`appendFileSync` per line — no buffer, SIGKILL-safe at line granularity. Simpler than the legacy shell runner's `tee -a`, same crash resilience.

```typescript
import { appendFileSync } from "node:fs";
const log = (line: string) => {
  process.stdout.write(line + "\n");
  appendFileSync(logFile, line + "\n");
};
```

### Turn headers

```markdown
### Agent A · `sonnet` · 38s · 10,234→189 tokens · $0.0167
```

Duration from `duration_ms` in JSON (more accurate than wall-clock).

### Stats footer

Per-turn rows + per-agent subtotals + grand total, inside `<details>`:

```markdown
<details><summary><strong>Stats</strong></summary>

| Round | Agent | Duration | Input | Output | Cost |
|------:|:-----:|---------:|------:|-------:|-----:|
| 1 | A | 163s | 12,450 | 1,230 | $0.0412 |
| 1 | B | 79s | 14,200 | 890 | $0.0298 |
| | **Agent A** | **310s** | **52,100** | **3,890** | **$0.1542** |
| | **Agent B** | **270s** | **46,240** | **2,230** | **$0.1298** |
| | **Total** | **580s** | **98,340** | **6,120** | **$0.2840** |

</details>
```

### Function inventory

| Function | Purpose |
|----------|---------|
| `getDial`, `dialPrefix` | Inlined dials (no `getTemp`) |
| `parseBackend` | `"claude:sonnet"` → `{backend, model}` |
| `callClaude` | `--output-format json`, `delete env.CLAUDE_CODE` |
| `callCodex` | Stub with windowed history + `CODEX_COSTS_PER_M` |
| `parseArgs` | `-f topic_file [rounds]` or `[rounds] [topic]` |
| `loadContext` | Read context.txt, resolve paths from repo root |
| `log` | `appendFileSync` per line + stdout |
| `writeSummaryFooter` | Stats table with subtotals |
| `main` | Orchestration loop |

## Files

| File | Change |
|------|--------|
| `shelley.ts` | New — full port |
| Legacy shell runner | Removed after migration |
| `later/dials.py` | Keep as-is (`later/pynaille.py` imports it) |

## Verification

1. `bun shelley.ts -f debates/review-dials-refactor/topic.md 1` — 1 round, check tokens/cost in log
2. `bun shelley.ts 1` — default topic, no context.txt
3. Compare markdown structure with existing transcripts
