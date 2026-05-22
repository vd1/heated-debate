# Detecting a Map-in-Context: An Experiment Design for Frontier-State Abstraction in Long LLM Reasoning

## 1. Research question

When a large language model runs for a long time on a hard mathematics problem, does it build an internal representation of its own evolving proof search — a navigable account of which lines of attack are live, which are dead, and where the new leads are?

The motivating intuition is a code-versus-math analogy. Models such as Claude Opus are exceptionally strong at coding, and one plausible reason is that code carries a *natural random-access navigation structure*: the call/dependency graph plus plain-text searchability give the model — and the human — cheap, content-addressable access to any part of the artifact. Mathematical reasoning over a long chain of thought has a comparable branching texture — backtracks, dead-ends, fresh ideas, an exploration that *looks* MCTS-like — but no externally given index. The conjecture is that the model may build the analogue *internally*: a structured representation that organizes the search so that the live frontier remains accessible and usable as the trace grows.

"MCTS-like" is used here strictly as a metaphor for branching search texture. It is not a claim about rollouts, value backup, or visit counts, and the experiment below is designed so that confirming it requires no such machinery.

## 2. From metaphor to a testable claim

The original note speaks of an "indexed chain of thought" giving logarithmic-time access to the reasoning chain. As an operational hypothesis this is overloaded: "logarithmic-time" has no well-defined meaning for parallel attention over a KV cache, and "internal map" invites a hidden-memory reading that is simply false for a standard decoder-only transformer. Given a fixed model, tokenization, and attention mask, the KV cache after a visible transcript is a *deterministic function of that transcript*. There is no separate mutable workspace; "original cached state versus transcript-only reconstruction" is not a meaningful contrast when the transcript is identical and complete.

This forces a clean fork. A **map-beyond-transcript** claim — hidden reasoning tokens, recurrent latent state, external memory, tool state — is only testable on systems that actually have such state, and is out of scope here. The interesting and tractable claim for ordinary transformers is a **map-in-context** claim:

> The model computes a compact, surface-invariant frontier-state abstraction from the visible history, and that abstraction causally mediates branch selection.

The "map" is not extra information the model secretly retains; it is *structure the model computes from the tokens it can already see*. The claim is therefore about activation geometry — that the transcript-induced representation contains a low-dimensional, invariant, causally-usable encoding of search progress — and not about memory. This is the formulation the debate converged on, and it is what the experiment must confirm or falsify.

## 3. Operational definition of "abstract frontier state"

"Isomorphic to the task frontier" must not require a full graph isomorphism — that is too strong and not what control needs. The operational definition is an equivalence relation on histories:

> Two histories map to the *same abstract frontier state* iff they imply the same branch statuses (live / dead / solved / blocked), the same branch priorities, the same valid next-action set, and the same next-action distribution under the task policy.

Only the variables that drive control are preserved. Two important sharpenings follow. First, "not labeled" must not mean "not inferable": the state is never written in natural language as `dead` or `frontier`, but it must be recoverable from prior observations and actions — otherwise the test asks for impossible mind-reading. Second, "latent" means *internally represented*, not *informationally extra*: the model computes a useful representation from the transcript; it does not access facts absent from it.

## 4. The experiment

### 4.1 Dataset

The primary substrate is **synthetic symbolic search tasks with known ground-truth frontier state**. Natural math traces are deliberately not the object of study: the unit-distance disproof and similar specimens are rewritten, human-digested, and public, so their apparent branch graph reflects exposition rather than the model's search topology, and they offer terrible ground truth.

Synthetic tasks give exact ground truth and adversarial control. Requirements:

- **No explicit state labels.** Branch status must be inferable from prior observations and actions, never stated as `dead`/`live`/`frontier` in prose.
- **Adversarially nonlinguistic encoding.** Nodes are arbitrary IDs; branch labels are permuted per episode; rhetorical markers ("maybe", "but", "the catch is") are randomized or absent; local next-token cues are made deliberately misleading. This blocks a probe from succeeding by reading literary backtracking cues or action-label tokens.
- **Paired histories.** For each test item, two histories share an *identical final suffix*, an *identical action menu*, and identical local wording around the next decision, and differ only in *one controlled branch-status variable* set earlier in the trace — e.g. node `A7Q` was shown to fail several steps ago versus `A7Q` was never eliminated and remains live.
- **Counterbalancing.** Each node ID appears equally often as live/dead, as early/late evidence, as target/non-target, across action-menu positions, and across symbol encodings, so that no probe can win on position or token statistics.

### 4.2 Representation (probing) test

Train a compact map from activations to the frontier variables — `status(A7Q)`, priority rank, valid-action set — and evaluate it on *held-out node names, encodings, and surface formats*. Compare against strong baselines (Section 5).

This test establishes that frontier state is *decodable* and *surface-invariant*. It is necessary but **not sufficient**, and this is the central methodological point. A linear probe can recover many quantities the model never causally uses; decodability is not use. Worse, because a transformer must derive any state it uses from its tokens, *any* sufficiently expressive external decoder will also recover the state. The probe alone therefore cannot distinguish "the model organizes a frontier representation and steers on it" from "the frontier is merely transcript-derivable." That distinction is what the causal test exists to settle.

### 4.3 Causal interchange-intervention test (decisive)

Take a pair of runs differing only in one target variable, `A7Q live` versus `A7Q dead`. Using the representation map from 4.2, identify the activation component corresponding to `status(A7Q)` and **patch only that component** from one run into the other (an interchange intervention, not generic activation patching). Then ask whether the recipient model behaves *as though that variable had changed*, and decode the other branch variables to confirm they are undisturbed.

This is the decisive test because it discriminates *correlation* from *causal mediation*. A positive result is not "the model gets worse" — generic damage proves nothing. A positive result is **selective redirection**: patching the `A7Q live` component into an `A7Q dead` run specifically raises the probability of expanding `A7Q`, while non-target branch statuses, action syntax, arithmetic, and fluency remain intact. That pattern is very hard to explain as anything other than the model implementing `status(A7Q)` as a causal variable in its branch-selection policy. It is exactly what a probe cannot show on its own.

## 5. Metrics, controls, baselines

**Metrics.** Target action logit/probability shift; KL drift over non-target actions; syntax/action validity; task success; stability of *decoded* non-target branch states post-patch; robustness of all of the above under node renaming and encoding changes.

**Baselines.** Held-out predictive accuracy of the activation probe must beat: a suffix-only probe (next decision context alone); a finite-state transcript parser; a learned finite-state state-tracker trained directly on logs; an explicit graph-state model (given the search graph but no prose); and a future-token-statistics baseline.

**Controls.** Random-subspace patching (the learned component must beat it); full activation patching as an upper-bound sanity check; suffix-only histories; randomized rhetorical and token-position cues; action-menu order randomization.

## 6. Success criteria and falsifiers

**Success requires *all* of:** held-out predictive accuracy above the strong transcript/state-tracker baselines; transfer across node renamings and equivalent encodings; selective causal redirection of the target branch under interchange intervention; low non-target drift; intact syntax and task competence; and no dependence on explicit labels, rhetorical markers, or menu position.

**Falsifiers — the claim fails if any hold:** probe performance collapses under renaming or encoding changes; the patch shifts confidence or style rather than branch choice; non-target branch variables drift substantially; random subspaces work as well as the learned component; or the effects are explained entirely by suffix/action-menu statistics.

## 7. Staging plan

1. **Toy symbolic search**, where the frontier state is exactly known and fully controllable. This is where the representation and causal tests are run with real rigor.
2. **Logged theorem-prover or code-search tasks**, where the model takes explicit search actions and the explored graph is externally logged. Here the synthetic mechanisms are checked against a more ecologically valid search, with cleaner ground truth than natural prose offers.
3. **Natural math traces** (e.g. the OpenAI unit-distance disproof) as **qualitative transfer tests only** — to see whether the representation geometry found in stages 1–2 reappears — never as ground truth, and never load-bearing for the causal claim.

Toy worlds risk inducing artificial mechanisms that do not transfer; natural traces have ecological validity but no usable ground truth. The staged path buys clean causal evidence first and tests generalization second.

## 8. Closing note: the key interpretive ruling

One result must be read correctly to avoid a false negative. **A finite-state transcript parser that matches the model's predictive accuracy does NOT falsify the hypothesis.** Because a transformer must derive whatever state it uses from its tokens, the frontier state being transcript-derivable is *expected*, not damning. A matching parser shows only that the state is recoverable from the transcript; it weakens claims about compression or uniqueness, but it says nothing about whether the model itself computes and steers on that state.

The decisive evidence is **selective causal mediation under interchange intervention**: a compact, surface-invariant activation component whose targeted patching redirects exactly the corresponding branch choice, leaving everything else stable. That, and not predictive decodability, is what would establish a map-in-context — a navigable internal representation of search progress — and distinguish it from ordinary transcript processing.
