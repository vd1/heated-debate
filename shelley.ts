#!/usr/bin/env bun
// shelley.ts — multi-agent debate engine (TypeScript entrypoint)

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
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

const DIAL_EXPONENT = Math.max(0.1, parseFloat(process.env.DIAL_EXPONENT ?? "1"));

function getDial(roundZeroIdx: number, total: number): DialLevel {
  if (total <= 1) return 5;
  const t = Math.pow(roundZeroIdx / (total - 1), DIAL_EXPONENT);
  const dial = Math.min(5, Math.max(1, Math.round(5 - 4 * t)));
  return dial as DialLevel;
}

function dialPrefix(level: DialLevel): string {
  return `[Creativity: ${level}/5] ${DIAL_PROMPTS[level]}\n\n`;
}

// === Convergence detection ===

type ConvergenceAction = "disrupt" | "stop" | "off";

const CONVERGENCE_THRESHOLD = Math.max(0.1, Math.min(1, parseFloat(process.env.CONVERGENCE_THRESHOLD ?? "0.55")));
const CONVERGENCE_ACTION: ConvergenceAction = (() => {
  const raw = (process.env.CONVERGENCE ?? "disrupt").toLowerCase().trim();
  if (raw === "stop" || raw === "off") return raw;
  return "disrupt";
})();

const DISRUPTION_PROMPTS = [
  "DISRUPTION: The debate has converged too early. You MUST now argue the strongest possible case AGAINST the current consensus. Identify the single most dangerous assumption in the agreed plan and show how it fails. Do not agree — find the fault line.",
  "DISRUPTION: Both sides are repeating the same points. Take the opposite position from your last response. What would a skeptic say? What critical failure mode has been hand-waved? Attack the weakest link.",
  "DISRUPTION: This debate is stalling. Introduce a concrete scenario where the agreed approach breaks down catastrophically. Be specific — name the failure, the trigger, and the consequence. Do not hedge.",
];

/**
 * Compute similarity between two texts using bigram Jaccard coefficient.
 * Returns 0..1 where 1 = identical.
 */
function textSimilarity(a: string, b: string): number {
  if (!a || !b) return 0;
  const bigrams = (s: string): Set<string> => {
    const tokens = s.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    const set = new Set<string>();
    for (let i = 0; i < tokens.length - 1; i++) set.add(`${tokens[i]} ${tokens[i + 1]}`);
    return set;
  };
  const sa = bigrams(a);
  const sb = bigrams(b);
  if (sa.size === 0 && sb.size === 0) return 1;
  let intersection = 0;
  for (const bg of sa) if (sb.has(bg)) intersection++;
  return intersection / (sa.size + sb.size - intersection);
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

// === Pipeline types ===

interface MechanicsReport {
  processScore: number;
  dialEffectiveness: string;
  convergenceQuality: string;
  contractAdherence: string;
  circularArguments: string[];
  offTopicDrifts: string[];
  agentDynamics: string;
  recommendations: string[];
}

interface SubstanceReport {
  settledConclusions: string[];
  openQuestions: string[];
  bestIdeas: string[];
  dependencyChains: string[];
  concreteProposals: string[];
  priorConstraints: string;
}

interface IterationDecision {
  action: "iterate" | "stop";
  rationale: string;
  contractFulfilled: boolean;
  noveltyRemaining: boolean;
  constraints: string;
}

interface PipelineConfig {
  enabled: boolean;
  spec: BackendSpec;
  maxIterations: number;
}

interface DebateResult {
  transcriptBody: string;
  logFile: string;
  logTimestamp: string;
  turns: TurnRecord[];
  topic: string;
  totalDebateSeconds: number;
  panelReport: PanelReport | null;
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

function codexReasoningEffort(): string {
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
const DEFAULT_CODEX_MODEL = process.env.CODEX_MODEL ?? "gpt-5.5";

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
  const reasoningEffort = codexReasoningEffort();
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

// === Moderator ===

interface ModeratorGuidance {
  dialOverride: DialLevel | null;
  injection: string;
  flags: { drifting: boolean; tooConvergent: boolean; urgentConverge: boolean };
}

interface ModeratorConfig {
  enabled: boolean;
  spec: BackendSpec;
  level: 1 | 2 | 3;
}

const MODERATOR_SYSTEM = `You are a debate moderator. You observe exchanges between an architect (Agent A) and a reviewer (Agent B) in a structured design debate. Your job is to keep the debate productive.

You will receive: the debate topic, the current round/total, the default creativity dial level, and the most recent exchange.

Respond with EXACTLY this JSON (no markdown, no explanation):
{"dialOverride": <1-5 or null>, "injection": "<1-3 sentences of guidance for the next agent>", "flags": {"drifting": <bool>, "tooConvergent": <bool>, "urgentConverge": <bool>}}

Rules:
- If the agents are on track, set injection to "" and dialOverride to null.
- If drifting off topic, nudge them back with a specific question.
- If converging too early (rounds remain but agents agree on everything), push for deeper challenge or unexplored angles.
- If running out of rounds, urge convergence on remaining open items.`;

const DEFAULT_MODERATOR_GUIDANCE: ModeratorGuidance = {
  dialOverride: null, injection: "", flags: { drifting: false, tooConvergent: false, urgentConverge: false },
};

async function callModerator(
  config: ModeratorConfig,
  topic: string,
  round: number,
  totalRounds: number,
  defaultDial: DialLevel,
  nextAgent: AgentKey,
  lastText: string,
): Promise<ModeratorGuidance> {
  const prompt = `Topic: ${topic.slice(0, 500)}
Round: ${round}/${totalRounds} | Default dial: ${defaultDial}/5 (${DIAL_LABELS[defaultDial]})
Next agent: ${nextAgent} | Aggressiveness: ${config.level}/3

Most recent exchange:
${lastText.slice(0, 3000)}`;

  try {
    const r = await call(config.spec.backend, {
      agentKey: "A", // reuse key; moderator is stateless
      model: config.spec.model,
      systemPrompt: MODERATOR_SYSTEM,
      sessionId: crypto.randomUUID(),
      prompt,
    });
    const parsed = JSON.parse(r.text.replace(/^```json\s*|```\s*$/g, "").trim());
    return {
      dialOverride: (parsed.dialOverride >= 1 && parsed.dialOverride <= 5) ? parsed.dialOverride : null,
      injection: typeof parsed.injection === "string" ? parsed.injection : "",
      flags: {
        drifting: !!parsed.flags?.drifting,
        tooConvergent: !!parsed.flags?.tooConvergent,
        urgentConverge: !!parsed.flags?.urgentConverge,
      },
    };
  } catch {
    return DEFAULT_MODERATOR_GUIDANCE;
  }
}

function parseModeratorConfig(): ModeratorConfig {
  const raw = process.env.MODERATOR;
  if (!raw) return { enabled: false, spec: { backend: "claude", model: "" }, level: 2 };
  const spec = parseBackend(raw);
  const lvl = parseInt(process.env.MODERATOR_LEVEL ?? "2", 10);
  const level = (lvl >= 1 && lvl <= 3 ? lvl : 2) as 1 | 2 | 3;
  return { enabled: true, spec, level };
}

// === Expert Panel ===

interface ExpertScore {
  expert: string;
  scores: { convergence: number; depth: number; feasibility: number; dynamics: number };
  commentary: string;
  bestIdea: string;
  weakness: string;
}

interface PanelReport {
  overallScore: number;
  expertScores: ExpertScore[];
  synthesis: {
    keyConclusions: string[];
    unresolvedDisagreements: string[];
    bestIdeas: string[];
    weaknesses: string[];
    recommendation: string;
  };
  metadata: {
    topic: string;
    rounds: number;
    models: { A: string; B: string };
    moderatorEnabled: boolean;
    totalDebateSeconds: number;
    totalPanelSeconds: number;
  };
}

interface ExpertPersona {
  name: string;
  focus: string;
}

const EXPERT_PERSONAS: ExpertPersona[] = [
  { name: "Pragmatist", focus: "whether the debate produced an actionable, implementable plan. Focus on feasibility, concrete next steps, and whether the scope is realistic" },
  { name: "Devil's Advocate", focus: "what the debate missed. Focus on unstated assumptions, unexamined risks, and arguments that were conceded too easily" },
  { name: "Architect", focus: "the technical depth and architectural soundness. Focus on whether design decisions are well-reasoned and tradeoffs properly analyzed" },
];

function expertPrompt(persona: ExpertPersona, topic: string, transcript: string): string {
  return `You are ${persona.name}, an expert evaluating a design debate.
Your focus: ${persona.focus}.

Calibration: 5 is average. Most debates land 4-7. Reserve 8+ for exceptional. 3 means the debate failed to produce useful output.

Topic:
${topic.slice(0, 1000)}

Transcript:
${transcript}

Score this debate on four dimensions (1-10 each):
1. Convergence quality: Did the agents reach a clear, actionable plan?
2. Intellectual depth: Were arguments substantive?
3. Practical feasibility: Is the final plan implementable?
4. Debate dynamics: Did agents genuinely challenge each other?

Respond with EXACTLY this JSON (no markdown, no explanation):
{"scores": {"convergence": N, "depth": N, "feasibility": N, "dynamics": N}, "commentary": "2-5 sentences", "bestIdea": "single best idea", "weakness": "single biggest weakness"}`;
}

const SYNTHESIZER_PROMPT_PREFIX = `You are synthesizing three expert evaluations of a design debate. Produce a final report merging their assessments. Where experts disagree, identify the disagreement rather than averaging it away.

Respond with EXACTLY this JSON (no markdown, no explanation):
{"keyConclusions": ["...", "...", "..."], "unresolvedDisagreements": ["..."], "bestIdeas": ["...", "..."], "weaknesses": ["...", "..."], "recommendation": "1-2 sentences"}

`;

async function callExpert(spec: BackendSpec, persona: ExpertPersona, topic: string, transcript: string): Promise<ExpertScore> {
  const r = await call(spec.backend, {
    agentKey: "A",
    model: spec.model,
    sessionId: crypto.randomUUID(),
    prompt: expertPrompt(persona, topic, transcript),
  });
  const parsed = JSON.parse(r.text.replace(/^```json\s*|```\s*$/g, "").trim());
  const s = parsed.scores ?? {};
  const clamp = (n: unknown) => Math.min(10, Math.max(1, typeof n === "number" ? Math.round(n) : 5));
  return {
    expert: persona.name,
    scores: { convergence: clamp(s.convergence), depth: clamp(s.depth), feasibility: clamp(s.feasibility), dynamics: clamp(s.dynamics) },
    commentary: String(parsed.commentary ?? ""),
    bestIdea: String(parsed.bestIdea ?? ""),
    weakness: String(parsed.weakness ?? ""),
  };
}

async function runExpertPanel(
  spec: BackendSpec,
  topic: string,
  transcript: string,
  metadata: Omit<PanelReport["metadata"], "totalPanelSeconds">,
): Promise<PanelReport> {
  const panelStart = Date.now();

  // Run all 3 experts in parallel
  const expertScores = await Promise.all(
    EXPERT_PERSONAS.map((p) => callExpert(spec, p, topic, transcript)),
  );

  // Synthesizer
  const synthPrompt = SYNTHESIZER_PROMPT_PREFIX + `Topic: ${topic.slice(0, 500)}\n\nExpert evaluations:\n` + JSON.stringify(expertScores, null, 2);
  const synthR = await call(spec.backend, {
    agentKey: "A",
    model: spec.model,
    sessionId: crypto.randomUUID(),
    prompt: synthPrompt,
  });
  const synthesis = JSON.parse(synthR.text.replace(/^```json\s*|```\s*$/g, "").trim());

  // Compute overall score
  const allScores = expertScores.flatMap((e) => Object.values(e.scores));
  const overallScore = Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10;

  const totalPanelSeconds = Math.round((Date.now() - panelStart) / 1000);

  return {
    overallScore,
    expertScores,
    synthesis: {
      keyConclusions: synthesis.keyConclusions ?? [],
      unresolvedDisagreements: synthesis.unresolvedDisagreements ?? [],
      bestIdeas: synthesis.bestIdeas ?? [],
      weaknesses: synthesis.weaknesses ?? [],
      recommendation: String(synthesis.recommendation ?? ""),
    },
    metadata: { ...metadata, totalPanelSeconds },
  };
}

function logPanelReport(report: PanelReport) {
  log("---");
  log("");
  log("## Expert Panel");
  log("");
  log(`**Overall Score: ${report.overallScore}/10**`);
  log("");
  log("| Expert | Convergence | Depth | Feasibility | Dynamics |");
  log("|--------|:-----------:|:-----:|:-----------:|:--------:|");
  for (const e of report.expertScores) {
    log(`| ${e.expert} | ${e.scores.convergence} | ${e.scores.depth} | ${e.scores.feasibility} | ${e.scores.dynamics} |`);
  }
  log("");
  for (const e of report.expertScores) {
    log(`**${e.expert}:** ${e.commentary}`);
    log("");
  }
  if (report.synthesis.keyConclusions.length > 0) {
    log("**Key Conclusions:**");
    for (const c of report.synthesis.keyConclusions) log(`- ${c}`);
    log("");
  }
  if (report.synthesis.unresolvedDisagreements.length > 0) {
    log("**Unresolved Disagreements:**");
    for (const d of report.synthesis.unresolvedDisagreements) log(`- ${d}`);
    log("");
  }
  if (report.synthesis.recommendation) {
    log(`**Recommendation:** ${report.synthesis.recommendation}`);
    log("");
  }
  log(`*Panel evaluation took ${report.metadata.totalPanelSeconds}s.*`);
  log("");
}

function parsePanelConfig(): BackendSpec | null {
  const raw = process.env.PANEL;
  if (!raw) return null;
  return parseBackend(raw);
}

function parsePipelineConfig(): PipelineConfig {
  const raw = process.env.PIPELINE;
  if (!raw) return { enabled: false, spec: { backend: "claude", model: "" }, maxIterations: 1 };
  const maxIter = Math.max(1, parseInt(process.env.PIPELINE_MAX_ITER ?? "1", 10) || 1);
  return { enabled: true, spec: parseBackend(raw), maxIterations: maxIter };
}

// === Post-Debate Pipeline Agents ===

const MECHANICS_SYSTEM = `You evaluate debate PROCESS quality, not content. You assess how well the debate engine performed mechanically: did agents follow instructions, did the creativity dial produce the right arc, did agents converge or talk past each other, were there circular arguments or off-topic drifts?

You are in a text-only evaluation — you cannot execute commands, save files, or access any tools.

Respond with EXACTLY this JSON (no markdown, no explanation):
{"processScore": <1-10>, "dialEffectiveness": "...", "convergenceQuality": "...", "contractAdherence": "...", "circularArguments": ["...", "..."], "offTopicDrifts": ["...", "..."], "agentDynamics": "...", "recommendations": ["...", "..."]}

Scoring: 5 is average. Most debates land 4-7. Reserve 8+ for genuinely well-run debates. 3 means the process broke down.`;

async function runMechanicsAgent(
  spec: BackendSpec,
  topic: string,
  transcript: string,
  rounds: number,
  logDir: string,
  timestamp: string,
): Promise<MechanicsReport> {
  const prompt = `Evaluate the PROCESS quality of this debate (not the content).

Topic (for reference — evaluate process, not substance):
${topic.slice(0, 500)}

Debate parameters: ${rounds} rounds, creativity dial cooling from Wild (5/5) to Precise (1/5).

Transcript:
${transcript}`;

  const r = await call(spec.backend, {
    agentKey: "A",
    model: spec.model,
    sessionId: crypto.randomUUID(),
    systemPrompt: MECHANICS_SYSTEM,
    prompt,
  });
  const parsed = JSON.parse(r.text.replace(/^```json\s*|```\s*$/g, "").trim());
  const clamp = (n: unknown) => Math.min(10, Math.max(1, typeof n === "number" ? Math.round(n) : 5));
  const report: MechanicsReport = {
    processScore: clamp(parsed.processScore),
    dialEffectiveness: String(parsed.dialEffectiveness ?? ""),
    convergenceQuality: String(parsed.convergenceQuality ?? ""),
    contractAdherence: String(parsed.contractAdherence ?? ""),
    circularArguments: Array.isArray(parsed.circularArguments) ? parsed.circularArguments.map(String) : [],
    offTopicDrifts: Array.isArray(parsed.offTopicDrifts) ? parsed.offTopicDrifts.map(String) : [],
    agentDynamics: String(parsed.agentDynamics ?? ""),
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.map(String) : [],
  };

  const mdPath = `${logDir}/meta-${timestamp}.md`;
  const jsonPath = `${logDir}/meta-${timestamp}.json`;
  writeFileSync(jsonPath, JSON.stringify(report, null, 2) + "\n");
  writeFileSync(mdPath, [
    `## Mechanics Report`,
    ``,
    `**Process Score: ${report.processScore}/10**`,
    ``,
    `**Dial Effectiveness:** ${report.dialEffectiveness}`,
    ``,
    `**Convergence Quality:** ${report.convergenceQuality}`,
    ``,
    `**Contract Adherence:** ${report.contractAdherence}`,
    ``,
    `**Agent Dynamics:** ${report.agentDynamics}`,
    ``,
    ...(report.circularArguments.length > 0 ? [`**Circular Arguments:**`, ...report.circularArguments.map(s => `- ${s}`), ``] : []),
    ...(report.offTopicDrifts.length > 0 ? [`**Off-Topic Drifts:**`, ...report.offTopicDrifts.map(s => `- ${s}`), ``] : []),
    ...(report.recommendations.length > 0 ? [`**Recommendations:**`, ...report.recommendations.map(s => `- ${s}`), ``] : []),
  ].join("\n"));

  return report;
}

function logMechanicsReport(report: MechanicsReport) {
  log("---");
  log("");
  log("## Mechanics Report");
  log("");
  log(`**Process Score: ${report.processScore}/10**`);
  log("");
  log(`**Dial Effectiveness:** ${report.dialEffectiveness}`);
  log(`**Convergence:** ${report.convergenceQuality}`);
  log(`**Contract Adherence:** ${report.contractAdherence}`);
  log(`**Agent Dynamics:** ${report.agentDynamics}`);
  log("");
  if (report.recommendations.length > 0) {
    log("**Recommendations:**");
    for (const r of report.recommendations) log(`- ${r}`);
    log("");
  }
}

const SUBSTANCE_SYSTEM = `You extract actionable content from a debate transcript into a SELF-CONTAINED summary. A reader who has NOT seen the transcript must be able to understand every point you make.

Critical rules:
- DEFINE every concept, term, or framework before using it. If the debate invented a name (e.g., "Leg Ledger Graph"), explain what it is in plain language before referencing it.
- Do NOT use shorthand or jargon from the debate without explanation.
- Each settled conclusion should be a complete, standalone statement — not a reference to something discussed.
- Each best idea should explain WHAT it is, WHY it matters, and HOW it works.
- Dependency chains should name the concrete entities and explain the causal link.

Produce a priorConstraints field: a block of text formatted as constraints for a follow-up debate. This text will be read by FRESH agents who have never seen the current debate. It must be fully self-contained — define all terms, explain all concepts, provide enough context that a new agent can understand and build on the conclusions without ambiguity. Settled items become "The following are established:" givens. Open questions become "Focus the debate on:" directives.

Focus on WHAT was decided, WHAT remains open, and WHAT the best ideas are. Ignore process quality — another agent handles that.

You are in a text-only evaluation — you cannot execute commands, save files, or access any tools.

Respond with EXACTLY this JSON (no markdown, no explanation):
{"settledConclusions": ["...", "..."], "openQuestions": ["...", "..."], "bestIdeas": ["...", "..."], "dependencyChains": ["...", "..."], "concreteProposals": ["...", "..."], "priorConstraints": "..."}`;

async function runSubstanceAgent(
  spec: BackendSpec,
  topic: string,
  transcript: string,
  logDir: string,
  timestamp: string,
): Promise<SubstanceReport> {
  const prompt = `Extract the substantive conclusions from this debate.

Topic:
${topic.slice(0, 1000)}

Transcript:
${transcript}`;

  const r = await call(spec.backend, {
    agentKey: "A",
    model: spec.model,
    sessionId: crypto.randomUUID(),
    systemPrompt: SUBSTANCE_SYSTEM,
    prompt,
  });
  const parsed = JSON.parse(r.text.replace(/^```json\s*|```\s*$/g, "").trim());
  const report: SubstanceReport = {
    settledConclusions: Array.isArray(parsed.settledConclusions) ? parsed.settledConclusions.map(String) : [],
    openQuestions: Array.isArray(parsed.openQuestions) ? parsed.openQuestions.map(String) : [],
    bestIdeas: Array.isArray(parsed.bestIdeas) ? parsed.bestIdeas.map(String) : [],
    dependencyChains: Array.isArray(parsed.dependencyChains) ? parsed.dependencyChains.map(String) : [],
    concreteProposals: Array.isArray(parsed.concreteProposals) ? parsed.concreteProposals.map(String) : [],
    priorConstraints: String(parsed.priorConstraints ?? ""),
  };

  const mdPath = `${logDir}/substance-${timestamp}.md`;
  const jsonPath = `${logDir}/substance-${timestamp}.json`;
  writeFileSync(jsonPath, JSON.stringify(report, null, 2) + "\n");
  writeFileSync(mdPath, [
    `## Substance Report`,
    ``,
    ...(report.settledConclusions.length > 0 ? [`**Settled Conclusions:**`, ...report.settledConclusions.map(s => `- ${s}`), ``] : []),
    ...(report.openQuestions.length > 0 ? [`**Open Questions:**`, ...report.openQuestions.map(s => `- ${s}`), ``] : []),
    ...(report.bestIdeas.length > 0 ? [`**Best Ideas:**`, ...report.bestIdeas.map(s => `- ${s}`), ``] : []),
    ...(report.dependencyChains.length > 0 ? [`**Dependency Chains:**`, ...report.dependencyChains.map(s => `- ${s}`), ``] : []),
    ...(report.concreteProposals.length > 0 ? [`**Concrete Proposals:**`, ...report.concreteProposals.map(s => `- ${s}`), ``] : []),
    `**Prior Constraints (for next iteration):**`,
    ``,
    report.priorConstraints,
    ``,
  ].join("\n"));

  return report;
}

function logSubstanceReport(report: SubstanceReport) {
  log("---");
  log("");
  log("## Substance Report");
  log("");
  if (report.settledConclusions.length > 0) {
    log("**Settled Conclusions:**");
    for (const c of report.settledConclusions) log(`- ${c}`);
    log("");
  }
  if (report.openQuestions.length > 0) {
    log("**Open Questions:**");
    for (const q of report.openQuestions) log(`- ${q}`);
    log("");
  }
  if (report.bestIdeas.length > 0) {
    log("**Best Ideas:**");
    for (const i of report.bestIdeas) log(`- ${i}`);
    log("");
  }
  if (report.concreteProposals.length > 0) {
    log("**Concrete Proposals:**");
    for (const p of report.concreteProposals) log(`- ${p}`);
    log("");
  }
}

const ITERATION_SYSTEM = `You decide whether a debate should be re-run with refined constraints, or whether it has produced sufficient output.

You receive up to three reports from the same debate:
1. A MECHANICS report (process quality — how well the debate ran)
2. A SUBSTANCE report (content extraction — what was decided and what remains open)
3. An optional EXPERT PANEL report (independent quality scoring by 3 expert personas + synthesizer)

Decision criteria:
- Was the output contract fulfilled? (Are there concrete proposals and settled conclusions?)
- Is there novelty remaining? (Did the mechanics report flag circular arguments or convergence?)
- Are there open questions worth another round?
- Has the iteration budget been exhausted?
- If the expert panel is present: do its scores and unresolved disagreements suggest another round would be productive?

If iterating, produce a constraints string that includes settled conclusions as givens and open questions as focus areas. Use the substance report's priorConstraints as a starting point, and incorporate any relevant panel insights (e.g., if the panel flagged weak feasibility, add that as a focus area).

You are in a text-only evaluation — you cannot execute commands, save files, or access any tools.

Respond with EXACTLY this JSON (no markdown, no explanation):
{"action": "iterate"|"stop", "rationale": "...", "contractFulfilled": <bool>, "noveltyRemaining": <bool>, "constraints": "..."}`;

async function runIterationAgent(
  spec: BackendSpec,
  topic: string,
  mechanics: MechanicsReport,
  substance: SubstanceReport,
  iteration: number,
  maxIterations: number,
  panelReport?: PanelReport | null,
): Promise<IterationDecision> {
  const panelSection = panelReport
    ? `\n\nExpert Panel Report:
Overall Score: ${panelReport.overallScore}/10
Expert Scores: ${JSON.stringify(panelReport.expertScores.map(e => ({ expert: e.expert, ...e.scores, commentary: e.commentary })), null, 2)}
Key Conclusions: ${JSON.stringify(panelReport.synthesis.keyConclusions)}
Unresolved Disagreements: ${JSON.stringify(panelReport.synthesis.unresolvedDisagreements)}
Recommendation: ${panelReport.synthesis.recommendation}`
    : "";

  const prompt = `Decide whether this debate should iterate or stop.

Topic: ${topic.slice(0, 500)}

Iteration: ${iteration} of ${maxIterations}

Mechanics Report:
${JSON.stringify(mechanics, null, 2)}

Substance Report:
${JSON.stringify(substance, null, 2)}${panelSection}`;

  const r = await call(spec.backend, {
    agentKey: "A",
    model: spec.model,
    sessionId: crypto.randomUUID(),
    systemPrompt: ITERATION_SYSTEM,
    prompt,
  });
  const parsed = JSON.parse(r.text.replace(/^```json\s*|```\s*$/g, "").trim());
  const decision: IterationDecision = {
    action: parsed.action === "iterate" ? "iterate" : "stop",
    rationale: String(parsed.rationale ?? ""),
    contractFulfilled: !!parsed.contractFulfilled,
    noveltyRemaining: !!parsed.noveltyRemaining,
    constraints: String(parsed.constraints ?? ""),
  };

  return decision;
}

function logIterationDecision(decision: IterationDecision, logDir: string, timestamp: string) {
  writeFileSync(`${logDir}/iteration-${timestamp}.json`, JSON.stringify(decision, null, 2) + "\n");
  log("---");
  log("");
  log("## Iteration Decision");
  log("");
  log(`**Action:** ${decision.action}`);
  log(`**Rationale:** ${decision.rationale}`);
  log(`**Contract Fulfilled:** ${decision.contractFulfilled}`);
  log(`**Novelty Remaining:** ${decision.noveltyRemaining}`);
  log("");
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

// === Debate runner (extracted from main for iteration support) ===

const SYSTEM_A =
  "You are the proposing side in a structured debate. Argue your position with clarity and conviction. Be concise. Output bulleted arguments, tradeoffs, and concrete proposals. You are in a text-only debate — you cannot execute commands, save files, or access any tools. Never ask for permissions, approval, or file access. Just argue your case directly.";
const SYSTEM_B =
  "You are the opposing side in a structured debate. Challenge proposals, find flaws, and push for better alternatives. Be concise. Output counterarguments, risks, and improvements. You are in a text-only debate — you cannot execute commands, save files, or access any tools. Never ask for permissions, approval, or file access. Just argue your case directly.";

async function runDebate(
  args: ParsedArgs,
  specA: BackendSpec,
  specB: BackendSpec,
  moderatorConfig: ModeratorConfig,
  panelSpec: BackendSpec | null,
  priorConstraints?: string,
): Promise<DebateResult> {
  // Reset codex history between iterations
  codexHistory.A = [];
  codexHistory.B = [];

  const resumeLog = process.env.RESUME_FROM_LOG;
  const startRoundEnv = parsePositiveInt(process.env.START_ROUND, 1, "START_ROUND");
  const seedPromptFromFile = process.env.SEED_PROMPT_A_FILE
    ? readFileSync(process.env.SEED_PROMPT_A_FILE, "utf8").trim()
    : "";
  const seedPromptFromEnv = (process.env.SEED_PROMPT_A ?? "").trim();

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
  const priorSection = priorConstraints
    ? `\n\n## Prior Constraints (from previous iteration)\n\n${priorConstraints}`
    : "";

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
  if (moderatorConfig.enabled) log(`| **Moderator** | \`${moderatorConfig.spec.model}\` · level ${moderatorConfig.level} |`);
  if (panelSpec) log(`| **Panel** | \`${panelSpec.model}\` |`);
  if (DIAL_EXPONENT !== 1) log(`| **Dial exponent** | ${DIAL_EXPONENT} |`);
  if (startRound > 1) log(`| **Start round** | ${startRound} |`);
  if (resumeLog) log(`| **Resumed from** | \`${resumeLog}\` |`);
  if (priorConstraints) log(`| **Prior constraints** | yes (from previous iteration) |`);
  if (CONVERGENCE_ACTION !== "off") log(`| **Convergence** | ${CONVERGENCE_ACTION} @ ${CONVERGENCE_THRESHOLD} |`);
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
  let transcriptBody = "";
  let prevTextA = "";
  let prevTextB = "";
  let convergenceStreak = 0;
  let disruptionCount = 0;
  for (let r = startRound; r <= args.rounds; r++) {
    const defaultDial = getDial(r - 1, args.rounds);
    const firstTurnInRun = r === startRound;

    log("---");
    log("");
    log(`## Round ${r}/${args.rounds} — ${DIAL_LABELS[defaultDial]} (${defaultDial}/5)`);
    log("");

    // Moderator guidance for Agent A (skip round 1 — no prior text to evaluate)
    let dialA = defaultDial;
    let injectionA = "";
    if (moderatorConfig.enabled && r > startRound && promptForA) {
      const g = await callModerator(moderatorConfig, args.topic, r, args.rounds, defaultDial, "A", promptForA);
      if (g.dialOverride !== null) dialA = g.dialOverride;
      injectionA = g.injection;
      if (injectionA || g.dialOverride !== null) {
        log(`<!-- moderator r=${r} nextAgent=A dial=${defaultDial}->${dialA} injection="${injectionA}" -->`);
      }
    }
    const prefixA = dialPrefix(dialA) + (injectionA ? `[Moderator] ${injectionA}\n\n` : "");

    // Agent A
    let rA: TurnResult;
    try {
      rA = await call(specA.backend, {
        agentKey: "A",
        model: specA.model,
        ...(firstTurnInRun
          ? (startRound === 1
            ? { systemPrompt: SYSTEM_A, sessionId: sessionA, prompt: `${prefixA}Plan this: ${args.topic}${context}${priorSection}` }
            : { systemPrompt: SYSTEM_A, sessionId: sessionA, prompt: `${prefixA}${promptForA}` })
          : { resume: sessionA, prompt: `${prefixA}${promptForA}` }),
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
    transcriptBody += `## Round ${r} — Agent A\n\n${rA.text}\n\n`;

    // Moderator guidance for Agent B
    let dialB = defaultDial;
    let injectionB = "";
    if (moderatorConfig.enabled) {
      const g = await callModerator(moderatorConfig, args.topic, r, args.rounds, defaultDial, "B", rA.text);
      if (g.dialOverride !== null) dialB = g.dialOverride;
      injectionB = g.injection;
      if (injectionB || g.dialOverride !== null) {
        log(`<!-- moderator r=${r} nextAgent=B dial=${defaultDial}->${dialB} injection="${injectionB}" -->`);
      }
    }
    const prefixB = dialPrefix(dialB) + (injectionB ? `[Moderator] ${injectionB}\n\n` : "");

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
              prompt: `${prefixB}You will review proposals for this task: ${args.topic}${context}${priorSection}\n\nHere is the first proposal:\n\n${rA.text}`,
            }
            : { systemPrompt: SYSTEM_B, sessionId: sessionB, prompt: `${prefixB}${rA.text}` })
          : { resume: sessionB, prompt: `${prefixB}${rA.text}` }),
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
    transcriptBody += `## Round ${r} — Agent B\n\n${rB.text}\n\n`;

    promptForA = rB.text;

    // --- Convergence detection ---
    if (CONVERGENCE_ACTION !== "off" && r > startRound && r < args.rounds) {
      const simA = textSimilarity(rA.text, prevTextA);
      const simB = textSimilarity(rB.text, prevTextB);
      const simCross = textSimilarity(rA.text, rB.text);
      const maxSim = Math.max(simA, simB, simCross);

      if (maxSim >= CONVERGENCE_THRESHOLD) {
        convergenceStreak++;
        const simLabel = `A=${simA.toFixed(2)} B=${simB.toFixed(2)} A×B=${simCross.toFixed(2)}`;
        log(`<!-- convergence r=${r}: ${simLabel} streak=${convergenceStreak} -->`);

        if (CONVERGENCE_ACTION === "stop" && convergenceStreak >= 2) {
          log("");
          log(`> **Early termination:** convergence detected for ${convergenceStreak} consecutive rounds (${simLabel}). Ending debate.`);
          log("");
          break;
        }

        if (CONVERGENCE_ACTION === "disrupt") {
          const disruption = DISRUPTION_PROMPTS[disruptionCount % DISRUPTION_PROMPTS.length];
          disruptionCount++;
          // Inject disruption into the next Agent A prompt
          promptForA = `${disruption}\n\nPrevious response from Agent B:\n\n${rB.text}`;
          log(`<!-- disruption injected for round ${r + 1} (streak=${convergenceStreak}) -->`);
        }
      } else {
        convergenceStreak = 0;
      }
    }
    prevTextA = rA.text;
    prevTextB = rB.text;
  }

  // --- Footer ---
  const endTime = new Date().toLocaleString("sv-SE").slice(0, 16);
  const totalDebateSeconds = turns.reduce((s, t) => s + t.seconds, 0);
  log("---");
  log("");
  const stoppedEarly = convergenceStreak >= 2 && CONVERGENCE_ACTION === "stop";
  const roundsCompleted = turns.filter(t => t.agent === "B").length;
  log(`*Debate finished ${endTime}. ${roundsCompleted}${stoppedEarly ? ` of ${args.rounds}` : ""} rounds.${stoppedEarly ? " (early termination: convergence)" : ""}*`);
  log("");
  writeFooter(turns);
  log("");

  // --- Expert Panel ---
  let panelReport: PanelReport | null = null;
  if (panelSpec) {
    process.stdout.write("\nRunning expert panel...\n");
    try {
      panelReport = await runExpertPanel(panelSpec, args.topic, transcriptBody, {
        topic: args.topic.slice(0, 200),
        rounds: args.rounds,
        models: { A: specA.model, B: specB.model },
        moderatorEnabled: moderatorConfig.enabled,
        totalDebateSeconds,
      });
      logPanelReport(panelReport);

      const panelOutputPath = process.env.PANEL_OUTPUT ?? `${logFile.replace(/\.md$/, "")}_panel.json`;
      writeFileSync(panelOutputPath, JSON.stringify(panelReport, null, 2) + "\n");
      process.stdout.write(`Panel report saved to ${panelOutputPath}\n`);
    } catch (e) {
      log(`> **PANEL ERROR:** ${e}`);
      process.stderr.write(`Panel failed: ${e}\n`);
    }
  }

  process.stdout.write(`\nLog saved to ${logFile}\n`);

  return {
    transcriptBody,
    logFile,
    logTimestamp: ts,
    turns,
    topic: args.topic,
    totalDebateSeconds,
    panelReport,
  };
}

// === Main ===

async function main() {
  const args = parseArgs();
  const specA = parseBackend(process.env.MODEL_A ?? "claude:claude-opus-4-7");
  const specB = parseBackend(process.env.MODEL_B ?? `codex:${DEFAULT_CODEX_MODEL}`);
  if (specA.backend === "codex") codexReasoningEffort();
  if (specB.backend === "codex") codexReasoningEffort();

  const moderatorConfig = parseModeratorConfig();
  const panelSpec = parsePanelConfig();
  const pipelineConfig = parsePipelineConfig();

  process.on("SIGINT", () => {
    for (const proc of activeProcs) {
      try { proc.kill("SIGTERM"); } catch { /* no-op */ }
    }
    process.stdout.write(`\nLog saved to ${logFile}\n`);
    process.exit(130);
  });

  let priorConstraints: string | undefined;
  const maxIter = pipelineConfig.enabled ? pipelineConfig.maxIterations : 1;

  for (let iter = 1; iter <= maxIter; iter++) {
    if (iter > 1) {
      process.stdout.write(`\n${"=".repeat(60)}\n=== Iteration ${iter}/${maxIter}\n${"=".repeat(60)}\n\n`);
    }

    const result = await runDebate(args, specA, specB, moderatorConfig, panelSpec, priorConstraints);

    if (!pipelineConfig.enabled) break;

    // Run Mechanics + Substance in parallel (independent extractions)
    process.stdout.write("\nRunning post-debate pipeline...\n");
    let mechanics: MechanicsReport;
    let substance: SubstanceReport;
    try {
      [mechanics, substance] = await Promise.all([
        runMechanicsAgent(pipelineConfig.spec, result.topic, result.transcriptBody, args.rounds, args.logDir, result.logTimestamp),
        runSubstanceAgent(pipelineConfig.spec, result.topic, result.transcriptBody, args.logDir, result.logTimestamp),
      ]);
    } catch (e) {
      log(`> **PIPELINE ERROR:** ${e}`);
      process.stderr.write(`Pipeline failed: ${e}\n`);
      break;
    }

    logMechanicsReport(mechanics);
    logSubstanceReport(substance);

    // If this is the last allowed iteration, stop
    if (iter >= maxIter) break;

    // Iteration Agent (sees both reports)
    try {
      const decision = await runIterationAgent(
        pipelineConfig.spec, result.topic, mechanics, substance, iter, maxIter, result.panelReport,
      );
      logIterationDecision(decision, args.logDir, result.logTimestamp);

      if (decision.action === "stop") {
        process.stdout.write(`\nIteration agent decided to stop: ${decision.rationale}\n`);
        break;
      }

      process.stdout.write(`\nIteration agent decided to iterate: ${decision.rationale}\n`);
      priorConstraints = decision.constraints;
    } catch (e) {
      log(`> **ITERATION ERROR:** ${e}`);
      process.stderr.write(`Iteration agent failed: ${e}\n`);
      break;
    }
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
