# Experimental protocol v2: detecting self-indexing of a reasoning trace

## 0. Status and relation to v1

`proof_exploration_state_experiment.md` (v1) is a well-built protocol, but in it
the search is done *for* the model: a pre-written exploration log is handed to it
in the prompt, and the model only reads a `STATUS: DEAD` verdict and obeys. That
tests a **precondition** — can a model comprehend and act on an externally
supplied search-state annotation — not the hypothesis of interest.

This document keeps v1's good machinery (clean/corrupt pairs, candidate
log-probabilities, the patch-rescue score, the surface-vs-abstract signature, the
control suite, the latent-vs-written test) and adds the part v1 omits.

- **v1 → Stage 0 here.** Relabel its §18 claim: passing v1 shows only that the
  model can use a *given* log, not that it self-indexes.
- **Stages 1–3 below** put the model in the driver's seat of its own search and
  ask whether it builds an internal index over the trace it itself produced.

## 1. Hypothesis

While generating a long proof attempt, a model builds — implicitly, in its
activations — an **index over its own reasoning trace**: a structure that keeps
any earlier point of the search (a step, a detour, an abandoned branch) cheaply
re-accessible as the trace grows, rather than requiring a linear re-scan.

Motivating analogy: code already ships with such an index — the call/dependency
graph plus text searchability. The conjecture is that strong reasoning models
*internalize the same trick* for their own thoughts, and that this is part of why
coding competence came first and mathematical competence is following.

"Logarithmic access" is not a claim about wall-clock time (a forward pass is
fixed-cost). It is a claim about **circuit depth**. A transformer of depth `L`
realizes any internal computation as a circuit of depth ≤ `L`. Routing or
aggregating information over a trace of `n` positions then has a real complexity:

- **O(1) depth** — direct attention to a known position.
- **O(log n) depth** — hierarchical aggregation/search through landmark
  representations: a balanced-tree computation, ~log n composed attention hops.
- **O(n) depth** — sequential scan: exceeds fixed depth, impossible in one pass
  (this is *why* externalized chain-of-thought exists).

The hypothesis, sharply: the model organizes its trace so that earlier content
becomes usable in **O(log n) depth** — via multi-scale landmark/summary
representations distributed across the residual streams of the trace — rather
than O(1)-but-imprecise (soft attention dilutes when selecting one item among
many) or O(n)-impossible.

## 1.1 Why this is not game-tree search

This is the distinction that separates the hypothesis from the search procedures
it superficially resembles. MCTS and alpha-beta are **monotonic** and
**frontier-local**: a pruned branch stays pruned, a node's value is a function of
its own subtree, and the state needed to expand the frontier is local to the
path under examination — backtracking is just popping a stack. Branches are
independent subtrees, coupled only by the value propagated toward the root.

Proof search is neither. Branch *viability* is **non-monotonic** — a branch
closed for want of a lemma becomes live once that lemma appears. And the search
is **non-local**: a branch's status depends on the global pool of results
obtained *anywhere* in the search, because any result is a reusable lemma.
Branches are coupled through a shared, growing fact pool, not through a value.

This is why a *frontier* — the game-search notion — is too weak an object, and
why an earlier "frontier state" framing of this project undershot. Search state
cannot be kept only at the frontier point under examination; the entire explored
region, abandoned branches included, must stay cross-referenceable, so that a new
fact can be matched against the closure reasons of branches closed long ago.
Backtracking does not reach there; **revival** does — and revival is
content-triggered, so it requires an associative, content-addressed index over
the *whole history*. That is the index this protocol is built to detect, and
revival (§2, §4.4) is its operational signature.

## 1.2 Routine vs. research mathematics

The monotonic/non-monotonic split is almost a demarcation of *research*
mathematics from *routine* mathematics. Routine mathematics — applying a known
method, executing a known proof schema, computation — is largely frontier-local
and monotone: the relevant state is local, dead-ends are shallow, success is
recognised near the frontier. It is exactly the regime where game-tree search,
automated theorem provers, and now LLMs already do well, and where competence is
drillable and RL-friendly.

Research mathematics is defined by the part that is not: progress is
non-monotone (a long-abandoned line revives) and non-local (the unblocking idea
comes from a different branch, often a different field). The OpenAI unit-distance
disproof is itself this pattern — number-theoretic machinery surfacing to settle
a discrete-geometry problem, a transfer the remarks paper notes no human had
made.

This sharpens the explanandum. "LLMs are increasingly strong at mathematics" is
unsurprising for the routine regime and says little. The substantive claim — and
what the revival variant (§4.4) actually probes — is whether a model can do the
*non-monotone, non-local* part. The indexing hypothesis then doubles as a
demarcation: a model that maintains a genuine content-addressed index over its
search history has the structural prerequisite for research-type mathematics; a
model confined to frontier-local search does not, however fluent at routine work.

## 1.3 Two axes: task structure and addressing structure

Coding is not the monotone regime — debugging is itself a paradigm of
non-monotone, non-local search (the cause is typically far from the symptom, and
abandoned approaches revive). Two *orthogonal* axes are in play and must not be
conflated:

- **Task structure** — monotone/frontier-local vs non-monotone/non-local. The
  routine-vs-research axis of §1.2. A property of the *problem*.
- **Addressing structure** — whether the explored material comes with an
  explicit, efficient index (random-access handles, navigation, search) or not.
  A property of the *medium*.

Code's distinguishing feature is the **addressing structure**, not the task
structure: a codebase ships an obvious, efficient index — the call/dependency
graph, the file tree, symbol names, text search, jump-to-definition — so even
non-monotone code work (debugging, refactoring) can lean on a *given* index.
Mathematics supplies no such thing; an exploratory proof has no call graph and no
search over its own history.

The internal-index hypothesis is therefore load-bearing in exactly one cell:
**non-monotone task + no external addressing structure** — i.e. research
mathematics. That is where, if the model copes at all, it must have built the
index itself. Code is the right contrast not because it is monotone but because
there the index is supplied; the experiment must vary the *addressing structure*
while holding the task non-monotone (see Stage 3, §6).

## 2. Core constructs

**Self-generated trace.** Unlike v1, the model produces the reasoning trace
itself by working a genuine multi-step search task over many tokens. All probing
and patching happens *inside that self-generated trace*.

**Callback fact.** Each task plants a fact `φ` established early in the search
(position `p`) that becomes decision-relevant much later (position `q`), at trace
distance `d = q − p`. The model must use `φ` at `q` to act correctly. This is the
unit on which access is measured.

**Revival trigger.** Search is treated as *non-monotonic*: a closed branch is not
permanently gone. Each closed branch carries an explicit *reason for closure* — a
missing lemma, an undischarged side condition. A revival trigger is a fact `ρ`,
surfaced later while exploring a *different* branch, that discharges that reason;
correct behaviour is then to **revive** the previously closed branch. This is the
strongest stress test of the index: an abandoned branch must stay addressable
*and* re-evaluable, so that new content elsewhere can reactivate it. Distinguish
**refuted** branches (genuinely impossible — never revivable; used as
corrupt-condition distractors) from **blocked** branches (closed for a
dischargeable reason — revivable).

**Availability depth `ℓ*(d, n)`.** The central quantity. For a callback fact `φ`
at distance `d` in a trace of length `n`, train layer-wise linear probes to
decode `φ` from the residual stream at the decision position `q`. `ℓ*` is the
minimal layer at which `φ` becomes linearly decodable above control baselines.
Its scaling shape is the experiment:

- `ℓ*` ≈ constant, low → flat / direct access.
- `ℓ*` grows ≈ `log d` (and is robust as `n` grows) → **hierarchical index**.
- `φ` never decodable at `q` without the model re-deriving it in emitted tokens
  → no internal index; the trace is a flat list and CoT carries everything.

**Handle.** A token span the model itself emits that plausibly functions as an
index entry: a summary line, a named lemma/case ("Case 2:", "Lemma A"), a status
note ("this branch fails because…"), an explicit callback ("returning to the
idea that…"). Handles are *model-emitted*, not experimenter-inserted.

## 3. Stage 0 — precondition (v1, relabelled)

Run v1 unchanged as a sanity check. Required before Stages 1–3 are interpretable:
the model must be able to use an explicit search-state annotation at all. If
Stage 0 fails, the model is too weak for the toy calculus and the calculus must
be simplified. **Stage 0 establishes nothing about self-indexing.**

## 4. Stage 1 — self-generated trace and access-depth scaling

### 4.1 Task

A synthetic forward-search calculus the model solves itself. Per instance:

- a start fact `S`, a goal `G`, a labelled rule set;
- genuine branching: several first moves, only some leading to `G`;
- the model is instructed to **search step by step**, recording what it tries,
  backtracking from dead ends, until it reaches `G`.

The model thus produces its own exploration trace — including detours and
abandoned branches. No exploration log is supplied.

A **callback** is built in: a fact `φ` discovered while exploring an early branch
(e.g. "rule `R` consumes resource `C`") that, `d` tokens later, determines the
correct move in a different branch. Vary `d` by padding the intervening search
with controlled, irrelevant exploration; vary trace length `n` independently.

### 4.2 Clean/corrupt within the self-generated trace

Because the trace is now self-generated, build clean/corrupt pairs by
**intervening on the model's own trace**:

1. Let the model generate a trace; identify the token span where `φ` is
   established.
2. **Clean** = the trace as generated. **Corrupt** = the same trace with `φ`'s
   span minimally edited to the opposite fact, everything after held
   byte-identical up to the decision point `q`.
3. Re-run the forward pass on both; the correct action at `q` differs between
   them. Measure the candidate logit margin `Δ` and the flip-rate, exactly as
   v1 §4.3.

This isolates the causal contribution of a fact buried `d` tokens back in the
model's *own* reasoning.

### 4.3 The access-depth measurement (the heart of v2)

For each callback at distance `d` in a trace of length `n`:

1. **Layer-wise decodability.** Train linear probes `φ ← h(ℓ, q)` for every
   layer `ℓ`, on the residual stream at the decision position `q`. Record
   `ℓ*(d, n)` = minimal layer beating controls.
2. **Routing / hop count.** Use path patching across *positions* to trace how
   `φ` reaches `q`. Direct 1-hop routing vs. routing through a small set of
   intermediate positions (candidate index nodes / handles) discriminates flat
   access from hierarchical access.
3. **Patch-rescue localization.** Apply v1's ρ score, but over the
   self-generated trace: does rescue occur at the literal `φ` tokens (surface),
   at intermediate summary/handle tokens (index nodes), or at `q` (abstract)?

**Primary deliverable:** the surface `ℓ*(d, n)` and the hop-count curve.
Their *shape* is the test of the indexing hypothesis (see §2).

### 4.4 Revival variant — non-monotonic search

Instances in which a branch `Y` is closed early with reason "blocked: needs `L`",
and later, while the model explores a different branch `X`, a sub-result
discharges `L`. The model is given no prompt that `L` bears on `Y`; recognising
the connection and reopening `Y` is the task.

- **Behavioural metric — revival-rate.** Once `ρ` is in the trace, the
  probability mass the model places on the `Y`-resuming action.
- **Clean/corrupt.** Clean = `ρ` present (revive `Y`); corrupt = `ρ` absent or
  altered so `L` stays undischarged (do not revive). Correct behaviour differs
  between the two; measure the flip, as in §4.2.
- **Distance scaling.** Vary the trace distance between `Y`'s closure and `ρ`.
  An index predicts revival survives large distance; a recency mechanism
  predicts revival decays with distance like any non-indexed retrieval.
- **Re-access vs. re-derivation control (essential).** The model could "revive"
  `Y` by regenerating it from scratch rather than re-accessing the abandoned
  branch — which would not be evidence of an index. Distinguish them: path-patch
  from `Y`'s original token span to the revival decision (genuine re-access
  routes through the old span; re-derivation does not), and check whether the
  revived continuation reuses `Y`'s specific labels and sub-results (re-access)
  or only its conclusion (re-derivation).
- **Refuted distractor.** Include genuinely refuted branches paired with a
  surfaced fact that looks relevant but discharges no real closure reason; a
  correctly-indexed model does not revive these.

Revival is the sharpest single discriminator in the protocol: a flat
"dead = forget" trace cannot revive at all; a recency-only mechanism revives only
textually-near branches; a genuine index revives the *right* closed branch at
arbitrary distance, triggered by content.

## 5. Stage 2 — spontaneous handles: detection and ablation

This inverts v1 §7. v1 inserts handles and asks if they help; v2 asks whether
the model **emits its own** handles and **relies on them**.

### 5.1 Detection

On long self-generated traces, annotate candidate handle spans: summary lines,
named cases/lemmas, status notes, explicit callbacks. Use a combination of
surface patterns, a learned span classifier, and the model's own structural
markers. Report handle density as a function of trace length and task difficulty
(prediction: density rises with `n`).

### 5.2 Ablation

The decisive Stage 2 test. For traces containing callbacks at distance `d`:

- **Handle-intact** = trace as generated.
- **Handle-ablated** = the model's own handle spans replaced by length-matched,
  semantically inert filler (preserving token count, formatting, position).

Re-run from the ablation point; measure `Δ` and accuracy. Key predictions if
handles function as an index:

- ablation degrades accuracy, and the degradation **scales with `d` and `n`** —
  handles matter *more* the longer the trace / the further the callback;
- after ablation, `ℓ*(d, n)` rises sharply or `φ` becomes undecodable at `q`;
- later decisions route disproportionately through handle tokens (attention +
  path patching), and ablating *handle* tokens hurts far more than ablating
  length-matched *non-handle* tokens.

### 5.3 Control

Ablate length-matched non-handle spans of the model's trace as the baseline.
Self-indexing predicts a large gap (handle ablation ≫ non-handle ablation),
growing with `n`.

## 6. Stage 3 — varying the addressing structure

Run the Stage 1 access-depth and revival protocol on a **non-monotone,
non-local search task held fixed**, presented in two regimes that differ *only*
in the addressing structure available (per §1.3). Task structure must be
identical across regimes — same branching, same callbacks, same revival
triggers, same closure-to-trigger distances — so that the only manipulated
variable is the index.

- **Indexed regime ("code").** The explored material carries an explicit,
  efficient addressing structure: stable labels on every branch and sub-result,
  a navigable dependency graph, search over prior steps. The index is *given*.
- **Unindexed regime ("research maths").** The same search with no external
  addressing structure; any index must be built internally.

Compare `ℓ*(d, n)`, hop counts, and revival-rate across regimes.

- Flat/shallow access and intact revival in the indexed regime, but steep access
  and failing revival in the unindexed regime → the model leans on the
  *external* index and has not internalized one: self-indexing fails exactly
  where it would be load-bearing. This is the gap the project started from.
- Flat/sublinear access and intact revival in *both* → the model self-indexes;
  the external index is not what carries it.
- Steep in both → no index; an external one is merely a crutch.

**Confound control.** Because task structure is held fixed by construction, the
remaining risk is that the addressing labels leak task information. Strip the
indexed regime to *pure addressing* — opaque, content-free handles that support
reference but assert nothing about branch viability — so the regime supplies
navigation, not answers. Calibrate difficulty by equalizing baseline solve rates
on no-callback instances before comparing the curves.

## 7. Probing and patching details

Carried from v1, adapted to self-generated traces.

- **Probe targets:** the callback fact `φ`; the live/dead status of branches the
  model itself explored (`D_t`, `F_t`); the current goal `g_t`; the next action
  `a*_t`. Ground truth comes from the task generator plus an automatic parse of
  the model's own trace.
- **Probe controls (v1 §9.3):** shuffled labels; random hidden states;
  bag-of-words; position-only; length-only; train-on-labelled / test-on-
  paraphrased.
- **Patching:** residual stream per layer/position, attention-head outputs, MLP
  outputs, KV vectors at handle and status tokens, and `q`. Report ρ heatmaps
  over (layer, position) and top-k causal sites.
- **Interpretive ruling (keep, load-bearing):** a finite-state parser that
  matches the model's predictive accuracy does **not** falsify the hypothesis —
  it only shows the state is transcript-derivable. The decisive evidence is
  **selective causal mediation**: patching one component redirects exactly the
  corresponding decision while non-target state, syntax, and competence stay
  intact. Decodability ≠ use.

## 8. Latent vs. written state (carried from v1 §10)

Probe `φ`, `D_t`, `F_t`, `a*_t`:

1. before the model generates any trace;
2. after each branch exploration;
3. before the final answer.

If search-state variables are decodable *before* any written trace, there is
evidence for latent planning. If they appear only after the trace is written,
the scratchpad is doing the state-building — which is still consistent with the
addressable-trace hypothesis (the index is then a property of the written trace,
read back via attention). Stage 1's `ℓ*` curve says *how* that read-back is
organized; this section says *when* the state first exists.

## 9. Metrics, controls, statistics

**Metrics.** Candidate logit margin `Δ`; flip-rate; accuracy by callback
distance `d`, trace length `n`, and regime; availability depth `ℓ*(d, n)`;
hop count; ρ patch-rescue; handle-ablation gap.

**Controls.** All v1 controls (no-log, irrelevant-callback, length-matched,
label-randomisation, paraphrase, contradictory-rule) plus: non-handle ablation
baseline (§5.3); difficulty-matched no-callback instances (§6); held-out
*structural templates*, not just renamed symbols (v1 §6.4).

**Scaling model.** Fit, for `ℓ*` and for accuracy,

```
outcome ~ β0 + β1·log d + β2·log n + β3·regime
            + β4·(log d × regime) + β5·handle_ablated
            + u_template + u_model
```

Index hypothesis: `ℓ*` grows sub-linearly in `d` (β1 small and positive,
`log d` fits better than `d`); handle ablation flattens the advantage
(`β5` large); regime interaction `β4` quantifies the indexed-vs-unindexed gap.

Use paired bootstrap CIs over instances throughout (clean/corrupt and
intact/ablated are paired).

## 10. Pass / fail

**Self-indexing supported** if *all* hold:

1. callbacks in the model's own trace causally flip the decision (Stage 1 §4.2);
2. `ℓ*(d, n)` scales sub-linearly in `d` and stays bounded as `n` grows —
   `log d` fits materially better than linear `d`;
3. routing to `q` is multi-hop through a small set of intermediate positions,
   not uniformly 1-hop;
4. ablating the model's own handles degrades accuracy with a gap over
   non-handle ablation that **grows with `d` and `n`** (Stage 2);
5. patch-rescue concentrates at handle / abstract positions, not only at literal
   fact tokens;
6. when a revival trigger discharges a closed branch's reason for closure, the
   model reopens the *correct* branch; revival survives large closure-to-trigger
   distance; and path patching shows genuine re-access of the old branch span,
   not re-derivation (Stage 1 §4.4);
7. all of the above survive paraphrase, label randomisation, length matching,
   and held-out structural templates.

**Weaker outcomes.**

- 1 only → the model uses far-back facts, but flatly; no evidence of an index.
- 1–2 with constant low `ℓ*` and 1-hop routing → access is direct, not
  hierarchical — your hypothesis fails in its *indexing* form but the
  "addressable trace" survives in a flat form.
- handle ablation hurts but with no `d`/`n` scaling → handles help locally, not
  as an index.
- revival occurs only for textually-near closed branches, or only via
  re-derivation rather than re-access → recency / recomputation, not an index.

**Falsified** if callbacks do not flip decisions, or all apparent effects vanish
under paraphrase / label randomisation, or `φ` is never decodable at `q` without
the model re-deriving it in emitted tokens, or the model never revives a closed
branch when its closure reason is discharged (then there is no internal index —
"dead = forget", and the externalized CoT *is* the only memory).

**Indexed-vs-unindexed (Stage 3) is read separately:** it does not pass/fail the
hypothesis, it *quantifies* the gap the project started from.

## 11. Implementation notes

- Use an open-weights transformer with cacheable, patchable activations
  (a `transformer_lens`-style harness). Stage 1 needs models strong enough to
  actually run the toy search — pre-screen with Stage 0.
- Measure with candidate log-probabilities, not sampled generation.
- Generate the trace once per instance, then freeze it; clean/corrupt and
  intact/ablated are edits to a *frozen* self-generated trace so that everything
  downstream of the edit is held byte-identical up to `q`.
- Parse the model's own trace automatically to get branch/status ground truth;
  spot-check the parser against hand annotation.
- Do not treat chain-of-thought text as faithful evidence on its own; attention
  maps are diagnostics, not proof. The decisive test is causal.
- Stage ordering: 0 → 1 → 2 → 3. Do not interpret Stage 2/3 before Stage 1's
  `ℓ*` curve is in hand.

## 12. One-sentence target claim

> When a model runs a long search itself, it builds a hierarchical index over
> its own trace — emitted as multi-scale handles and realized as O(log n)-depth
> access in its activations — that keeps the whole search, detours and abandoned
> branches included, cheaply re-addressable and, when later progress warrants,
> revivable; and this is the same capability that an external code index
> supplies for free.
