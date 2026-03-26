#!/usr/bin/env bun
// shelley.ts — multi-agent debate engine (TypeScript entrypoint)

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, resolve } from "path";

// === Dials (inlined from dials.py) ===

type AgentKey = "A" | "B";
type Backend = "claude" | "codex";
type DialLevel = 1 | 2 | 3 | 4 | 5;

interface BackendSpec {
  backend: Backend;
  model: string;
}

interface ParsedArgs {
  topicFile?: string;
  rounds: number;
  topic: string;
  logDir: string;
}

const DIAL_LABELS: Record<DialLevel, string> = {
  5: "Wild", 4: "Creative", 3: "Balanced", 2: "Focused", 1: "Precise",
};

const DIAL_PROMPTS: Record<DialLevel, string> = {
  5: "Explore radical alternatives. Question the premise. Propose unconventional approaches even if risky.",
  4: "Suggest improvements and alternatives. Challenge assumptions. Consider non-obvious solutions.",
  3: "Mix new ideas with refinement. Address open questions. Weigh tradeoffs.",
  2: "Refine the current approach. Fix issues. Tighten the spec. Avoid introducing new directions.",
  1: "Converge and finalize the architectural decisions into a clear bulleted plan. DO NOT write code diffs or attempt to apply changes.",
};

function getDial(roundZeroIdx: number, total: number): DialLevel {
  if (total <= 1) return 5;
  const t = roundZeroIdx / (total - 1);
  const dial = Math.min(5, Math.max(1, Math.round(5 - 4 * t)));
  return dial as DialLevel;
}

function dialPrefix(level: DialLevel): string {
  return `[Creativity: ${level}/5] ${DIAL_PROMPTS[level]}\n\n`;
}

// === Types ===

interface TurnResult {
  text: string;
  seconds: number;
}

interface CallOpts {
  model: string;
  agentKey: AgentKey;
  systemPrompt?: string;
  sessionId?: string; // round 1: new session
  resume?: string;    // rounds 2+: resume existing
  prompt: string;
}

interface TurnRecord {
  round: number;
  agent: AgentKey;
  model: string;
  seconds: number;
}

// === Module-level log path (set in main before any I/O) ===

let logFile = "";
let stderrFile = "";
const activeProcs = new Set<BunSubprocess>();
const SHELLEY_TIMEOUT_MS = Math.max(1_000, Number.parseInt(process.env.SHELLEY_TIMEOUT_MS ?? "420000", 10) || 420000);
const VALID_REASONING_EFFORTS = new Set(["minimal", "low", "medium", "high", "xhigh"]);

function appendStderr(backend: Backend, model: string, err: string) {
  if (!err || !stderrFile) return;
  const stamp = new Date().toISOString();
  appendFileSync(stderrFile, `[${stamp}] ${backend}:${model}\n${err}\n\n`);
}

// === Env sanitation ===
//
// Bun auto-loads .env into process.env. For subscription-backed CLIs we strip
// provider API keys so spawned CLIs stay on account/session auth.

const CLAUDE_ENV_BLOCKLIST = [
  "CLAUDE_CODE",
  "CLAUDECODE",
  "ANTHROPIC_API_KEY",
  "ANTHROPIC_AUTH_TOKEN",
  "ANTHROPIC_BASE_URL",
] as const;

const CODEX_ENV_BLOCKLIST = [
  "OPENAI_API_KEY",
  "OPENAI_BASE_URL",
] as const;

function sanitizedEnv(blocklist: readonly string[]): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const key of blocklist) delete env[key];
  return env;
}

interface CliResult {
  out: string;
  err: string;
  code: number;
  seconds: number;
  timedOut: boolean;
}

function codexReasoningEffortForModel(model: string): string {
  const raw = process.env.CODEX_REASONING_EFFORT ?? "high";
  const requested = raw.trim().toLowerCase();
  if (!requested || !VALID_REASONING_EFFORTS.has(requested)) {
    throw new Error(
      `Invalid CODEX_REASONING_EFFORT=${JSON.stringify(raw)}. Expected one of: minimal, low, medium, high, xhigh.`,
    );
  }
  return requested;
}

function shortProcessError(out: string, err: string, code: number): string {
  const source = (err || out).trim();
  if (!source) return `exit code ${code}`;
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-8)
    .join("\n");
}

async function runCli(args: string[], env: NodeJS.ProcessEnv): Promise<CliResult> {
  const start = Date.now();
  const proc = Bun.spawn(args, { env, stdout: "pipe", stderr: "pipe" });
  activeProcs.add(proc);

  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    try { proc.kill("SIGTERM"); } catch { /* no-op */ }
    setTimeout(() => {
      try { proc.kill("SIGKILL"); } catch { /* no-op */ }
    }, 750);
  }, SHELLEY_TIMEOUT_MS);

  try {
    const [out, err, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ]);
    const seconds = Math.round((Date.now() - start) / 1000);
    return { out: out.trim(), err: err.trim(), code, seconds, timedOut };
  } finally {
    clearTimeout(timeout);
    activeProcs.delete(proc);
  }
}

// === Claude backend ===

async function callClaude(opts: CallOpts): Promise<TurnResult> {
  const buildArgs = (prompt: string): string[] => {
    const a = ["claude", "-p"];
    if (opts.resume) {
      a.push("--resume", opts.resume);
    } else {
      a.push("--model", opts.model);
      if (opts.systemPrompt) a.push("--system-prompt", opts.systemPrompt);
      if (opts.sessionId) a.push("--session-id", opts.sessionId);
    }
    a.push(prompt);
    return a;
  };

  const env = sanitizedEnv(CLAUDE_ENV_BLOCKLIST);
  let totalSeconds = 0;

  // First attempt
  const r1 = await runCli(buildArgs(opts.prompt), env);
  totalSeconds += r1.seconds;
  if (r1.err) appendStderr("claude", opts.model, r1.err);
  if (r1.timedOut) throw new Error(`claude timed out after ${SHELLEY_TIMEOUT_MS}ms`);
  if (r1.code !== 0) throw new Error(shortProcessError(r1.out, r1.err, r1.code));
  if (r1.out) return { text: r1.out, seconds: totalSeconds };

  // Retry once on empty output with a nudge prompt
  const nudge = opts.resume
    ? "Your previous response was empty. Please provide your response to the debate."
    : opts.prompt;
  const retryArgs = opts.resume ? buildArgs(nudge) : buildArgs(opts.prompt);

  const r2 = await runCli(retryArgs, env);
  totalSeconds += r2.seconds;
  if (r2.err) appendStderr("claude", opts.model, `[retry] ${r2.err}`);
  if (r2.timedOut) throw new Error(`claude timed out after ${SHELLEY_TIMEOUT_MS}ms (retry)`);
  if (r2.code !== 0) throw new Error(shortProcessError(r2.out, r2.err, r2.code));
  if (!r2.out) throw new Error("claude returned empty output (after retry)");
  return { text: r2.out, seconds: totalSeconds };
}

// === Codex backend ===
//
// codex exec is currently used as stateless calls; we inject a window of
// prior turns for each agent to preserve role continuity.

interface CodexHistoryTurn {
  prompt: string;
  response: string;
}

const codexHistory: Record<AgentKey, CodexHistoryTurn[]> = { A: [], B: [] };
const CODEX_HISTORY_WINDOW = Math.max(1, parseInt(process.env.CODEX_HISTORY_WINDOW ?? "6", 10) || 6);
const DEFAULT_CODEX_MODEL = process.env.CODEX_MODEL ?? "gpt-5.4";

function composeCodexPrompt(opts: CallOpts): string {
  const history = codexHistory[opts.agentKey];
  const recent = history.slice(-CODEX_HISTORY_WINDOW);
  const parts: string[] = [];

  if (opts.systemPrompt) {
    parts.push(`System role:\n${opts.systemPrompt}`);
  }

  if (recent.length > 0) {
    const turns = recent
      .map((t, i) => [
        `Turn ${i + 1} - User`,
        t.prompt,
        "",
        `Turn ${i + 1} - Assistant`,
        t.response,
      ].join("\n"))
      .join("\n\n");
    parts.push(`Conversation history:\n\n${turns}`);
  }

  parts.push(`Current user message:\n${opts.prompt}`);
  parts.push("Respond as the assistant only. Do not include tool logs.");
  return parts.join("\n\n");
}

async function callCodex(opts: CallOpts): Promise<TurnResult> {
  const reasoningEffort = codexReasoningEffortForModel(opts.model);
  const args = ["codex", "exec", "--sandbox", "read-only", "-c", `model_reasoning_effort=${JSON.stringify(reasoningEffort)}`];
  if (opts.model) args.push("--model", opts.model);
  args.push(composeCodexPrompt(opts));

  const env = sanitizedEnv(CODEX_ENV_BLOCKLIST);
  env.CODEX_REASONING_EFFORT = reasoningEffort;

  const { out, err, code, seconds, timedOut } = await runCli(args, env);
  if (err) appendStderr("codex", opts.model, err);
  if (timedOut) throw new Error(`codex timed out after ${SHELLEY_TIMEOUT_MS}ms`);
  if (code !== 0) throw new Error(shortProcessError(out, err, code));

  const text = out;
  if (!text) throw new Error("codex returned empty output");
  codexHistory[opts.agentKey].push({ prompt: opts.prompt, response: text });

  return { text, seconds };
}

// === Dispatch ===

function parseBackend(specRaw: string): BackendSpec {
  const spec = specRaw.trim();
  const i = spec.indexOf(":");
  if (i === -1) {
    if (spec === "codex") return { backend: "codex", model: DEFAULT_CODEX_MODEL };
    return { backend: "claude", model: spec };
  }
  const backendRaw = spec.slice(0, i).toLowerCase();
  const model = spec.slice(i + 1).trim();
  if (backendRaw !== "claude" && backendRaw !== "codex") {
    throw new Error(`Unsupported backend "${backendRaw}". Use "claude:<model>" or "codex:<model>".`);
  }
  const backend: Backend = backendRaw;
  if (backend === "codex" && !model) return { backend, model: DEFAULT_CODEX_MODEL };
  return { backend, model };
}

async function call(backend: Backend, opts: CallOpts): Promise<TurnResult> {
  return backend === "codex" ? callCodex(opts) : callClaude(opts);
}

// === Arg parsing ===

const DEFAULT_TOPIC =
  "Design a Python function that takes a list of stock trades (ticker, qty, price, buy/sell) " +
  "and outputs a portfolio summary with current positions, average cost basis, and realized P&L. " +
  "Propose an implementation plan: data structures, function signatures, edge cases.";

function parseArgs(): ParsedArgs {
  const argv = process.argv.slice(2);
  if (argv[0] === "-f") {
    const file = argv[1];
    if (!file || !existsSync(file)) {
      console.error(`Topic file not found: ${file}`);
      process.exit(1);
    }
    return {
      topicFile: file,
      rounds: parsePositiveInt(argv[2], 5, "rounds"),
      topic: readFileSync(file, "utf8").trim(),
      logDir: dirname(file),
    };
  }
  return {
    topicFile: undefined,
    rounds: parsePositiveInt(argv[0], 5, "rounds"),
    topic: argv[1] ?? DEFAULT_TOPIC,
    logDir: `${process.cwd()}/debates`,
  };
}

function parsePositiveInt(raw: string | undefined, fallback: number, name: string): number {
  const value = raw ?? `${fallback}`;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    console.error(`Invalid ${name}: "${value}". Expected an integer >= 1.`);
    process.exit(1);
  }
  return parsed;
}

// === Resume support ===

interface ResumeState {
  startRound: number;
  seedPromptA: string;
}

function extractLastAgentBByRound(segment: string): string {
  const m = segment.match(/### Agent B[^\n]*\n\n([\s\S]*?)(?=\n### Agent |\n## Round |\n---\n|\n\*Debate finished|\s*$)/);
  return m?.[1]?.trim() ?? "";
}

function inferResumeStateFromLog(logPath: string, targetRounds: number): ResumeState {
  if (!existsSync(logPath)) {
    throw new Error(`Resume log not found: ${logPath}`);
  }
  const text = readFileSync(logPath, "utf8");
  const roundRe = /^## Round (\d+)\/(\d+) —/gm;
  const matches: Array<{ round: number; idx: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = roundRe.exec(text)) !== null) {
    const round = Number.parseInt(m[1], 10);
    if (!Number.isSafeInteger(round) || round < 1) {
      throw new Error(`Invalid round marker in resume log: ${m[0]}`);
    }
    matches.push({ round, idx: m.index });
  }
  if (matches.length === 0) {
    throw new Error(`No rounds found in resume log: ${logPath}`);
  }

  let completed = 0;
  let lastB = "";
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].idx;
    const end = i + 1 < matches.length ? matches[i + 1].idx : text.length;
    const segment = text.slice(start, end);
    const bText = extractLastAgentBByRound(segment);
    if (bText) {
      completed = Math.max(completed, matches[i].round);
      lastB = bText;
    }
  }

  if (completed < 1 || !lastB) {
    throw new Error(`No completed round with Agent B output found in: ${logPath}`);
  }

  const startRound = completed + 1;
  if (startRound > targetRounds) {
    throw new Error(`Nothing to resume: completed round ${completed} already reaches target ${targetRounds}.`);
  }
  return { startRound, seedPromptA: lastB };
}

// === Context loading ===

function loadContext(topicFile: string | undefined, repoRoot: string): string {
  if (!topicFile) return "";
  const listPath = resolve(dirname(topicFile), "context.txt");
  if (!existsSync(listPath)) return "";
  let out = "";
  for (const rel of readFileSync(listPath, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))) {
    const abs = resolve(repoRoot, rel);
    if (!existsSync(abs)) {
      console.error(`Context file not found: ${rel}`);
      process.exit(1);
    }
    out += `\n\n--- ${rel} ---\n${readFileSync(abs, "utf8")}`;
  }
  return out;
}

// === Logging ===

function log(line: string) {
  process.stdout.write(line + "\n");
  appendFileSync(logFile, line + "\n");
}

// === Stats footer ===

function writeFooter(turns: TurnRecord[]) {
  const sumSec = (rows: TurnRecord[]) => rows.reduce((s, t) => s + t.seconds, 0);
  const sA = sumSec(turns.filter((t) => t.agent === "A"));
  const sB = sumSec(turns.filter((t) => t.agent === "B"));

  log("<details><summary><strong>Stats</strong></summary>");
  log("");
  log("| Round | Agent | Duration |");
  log("|------:|:-----:|---------:|");
  for (const t of turns) {
    log(`| ${t.round} | ${t.agent} | ${t.seconds}s |`);
  }
  log(`| | **Agent A** | **${sA}s** |`);
  log(`| | **Agent B** | **${sB}s** |`);
  log(`| | **Total** | **${sA + sB}s** |`);
  log("");
  log("</details>");
}

// === Main ===

async function main() {
  const args = parseArgs();
  const specA = parseBackend(process.env.MODEL_A ?? "claude:claude-opus-4-6");
  const specB = parseBackend(process.env.MODEL_B ?? `codex:${DEFAULT_CODEX_MODEL}`);
  if (specA.backend === "codex") codexReasoningEffortForModel(specA.model);
  if (specB.backend === "codex") codexReasoningEffortForModel(specB.model);
  const resumeLog = process.env.RESUME_FROM_LOG;
  const startRoundEnv = parsePositiveInt(process.env.START_ROUND, 1, "START_ROUND");
  const seedPromptFromFile = process.env.SEED_PROMPT_A_FILE
    ? readFileSync(process.env.SEED_PROMPT_A_FILE, "utf8").trim()
    : "";
  const seedPromptFromEnv = (process.env.SEED_PROMPT_A ?? "").trim();

  const SYSTEM_A =
    "You are a software architect in a debate. Propose and refine implementation plans. Be concise. Output bulleted decisions, tradeoffs, and architectural patterns. Do not write code diffs, code blocks, commands, or final implementations. Do not mention tools, sandbox, permissions, or execution limits.";
  const SYSTEM_B =
    "You are a critical code reviewer in a debate. Challenge proposals, find flaws, and suggest improvements. Be concise. Output feedback on the architectural approach and risks. Do not write code diffs, code blocks, commands, or final implementations. Do not mention tools, sandbox, permissions, or execution limits.";

  const sessionA = crypto.randomUUID();
  const sessionB = crypto.randomUUID();

  mkdirSync(args.logDir, { recursive: true });
  const ts = new Date()
    .toLocaleString("sv-SE")
    .replace(/[-:]/g, "")
    .replace(" ", "_")
    .slice(0, 15);
  logFile = `${args.logDir}/${ts}.md`;
  stderrFile = `${logFile}.stderr.log`;
  appendFileSync(
    stderrFile,
    `# Shelley stderr log\n# transcript: ${logFile}\n# started: ${new Date().toISOString()}\n\n`,
  );

  const gitOut = Bun.spawnSync(["git", "rev-parse", "--show-toplevel"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const repoRoot =
    gitOut.exitCode === 0
      ? new TextDecoder().decode(gitOut.stdout).trim()
      : import.meta.dir;

  const context = loadContext(args.topicFile, repoRoot);
  let startRound = startRoundEnv;
  let promptForA = "";
  if (resumeLog) {
    const inferred = inferResumeStateFromLog(resumeLog, args.rounds);
    startRound = inferred.startRound;
    promptForA = inferred.seedPromptA;
  } else if (startRound > 1) {
    promptForA = seedPromptFromFile || seedPromptFromEnv;
  }
  if (startRound > args.rounds) {
    console.error(`Start round ${startRound} exceeds total rounds ${args.rounds}.`);
    process.exit(1);
  }
  if (startRound > 1 && !promptForA) {
    console.error("Resume requires seed prompt for Agent A. Set RESUME_FROM_LOG or SEED_PROMPT_A(_FILE).");
    process.exit(1);
  }

  process.on("SIGINT", () => {
    for (const proc of activeProcs) {
      try { proc.kill("SIGTERM"); } catch { /* no-op */ }
    }
    process.stdout.write(`\nLog saved to ${logFile}\n`);
    process.exit(130);
  });

  // --- Header ---
  const startTime = new Date().toLocaleString("sv-SE").slice(0, 16);
  log(`# Debate — ${startTime}`);
  log("");
  log("| | |");
  log("|---|---|");
  log(`| **Agent A** (architect) | \`${specA.model}\` · session \`${sessionA.slice(0, 8)}\` |`);
  log(`| **Agent B** (reviewer) | \`${specB.model}\` · session \`${sessionB.slice(0, 8)}\` |`);
  log(`| **Rounds** | ${args.rounds} |`);
  log(`| **Timeout** | ${SHELLEY_TIMEOUT_MS}ms |`);
  log(`| **Debug stderr** | \`${stderrFile}\` |`);
  if (startRound > 1) log(`| **Start round** | ${startRound} |`);
  if (resumeLog) log(`| **Resumed from** | \`${resumeLog}\` |`);
  log("");
  log("<details><summary><strong>Topic</strong></summary>");
  log("");
  log(args.topic);
  log("");
  log("</details>");
  if (args.topicFile) {
    const ctxList = resolve(dirname(args.topicFile), "context.txt");
    if (existsSync(ctxList)) {
      const files = readFileSync(ctxList, "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"))
        .join(", ");
      log("");
      log(`**Context:** ${files}`);
    }
  }
  log("");

  // --- Rounds ---
  const turns: TurnRecord[] = [];
  for (let r = startRound; r <= args.rounds; r++) {
    const dial = getDial(r - 1, args.rounds);
    const prefix = dialPrefix(dial);
    const firstTurnInRun = r === startRound;

    log("---");
    log("");
    log(`## Round ${r}/${args.rounds} — ${DIAL_LABELS[dial]} (${dial}/5)`);
    log("");

    // Agent A
    let rA: TurnResult;
    try {
      rA = await call(specA.backend, {
        agentKey: "A",
        model: specA.model,
        ...(firstTurnInRun
          ? (startRound === 1
            ? { systemPrompt: SYSTEM_A, sessionId: sessionA, prompt: `${prefix}Plan this: ${args.topic}${context}` }
            : { systemPrompt: SYSTEM_A, sessionId: sessionA, prompt: `${prefix}${promptForA}` })
          : { resume: sessionA, prompt: `${prefix}${promptForA}` }),
      });
    } catch (e) {
      log(`> **ERROR:** Agent A failed in round ${r}: ${e}`);
      process.exit(1);
    }
    if (!rA.text) {
      log(`> **ERROR:** Agent A returned empty response in round ${r} — aborting.`);
      process.exit(1);
    }

    log(`### Agent A · \`${specA.model}\` · ${rA.seconds}s`);
    log("");
    log(rA.text);
    log("");
    turns.push({ round: r, agent: "A", model: specA.model, seconds: rA.seconds });

    // Agent B
    let rB: TurnResult;
    try {
      rB = await call(specB.backend, {
        agentKey: "B",
        model: specB.model,
        ...(firstTurnInRun
          ? (startRound === 1
            ? {
              systemPrompt: SYSTEM_B,
              sessionId: sessionB,
              prompt: `${prefix}You will review proposals for this task: ${args.topic}${context}\n\nHere is the first proposal:\n\n${rA.text}`,
            }
            : { systemPrompt: SYSTEM_B, sessionId: sessionB, prompt: `${prefix}${rA.text}` })
          : { resume: sessionB, prompt: `${prefix}${rA.text}` }),
      });
    } catch (e) {
      log(`> **ERROR:** Agent B failed in round ${r}: ${e}`);
      process.exit(1);
    }
    if (!rB.text) {
      log(`> **ERROR:** Agent B returned empty response in round ${r} — aborting.`);
      process.exit(1);
    }

    log(`### Agent B · \`${specB.model}\` · ${rB.seconds}s`);
    log("");
    log(rB.text);
    log("");
    turns.push({ round: r, agent: "B", model: specB.model, seconds: rB.seconds });

    promptForA = rB.text;
  }

  // --- Footer ---
  const endTime = new Date().toLocaleString("sv-SE").slice(0, 16);
  log("---");
  log("");
  log(`*Debate finished ${endTime}. ${args.rounds} rounds.*`);
  log("");
  writeFooter(turns);
  log("");
  process.stdout.write(`\nLog saved to ${logFile}\n`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
