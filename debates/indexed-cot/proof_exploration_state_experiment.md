# Experimental protocol: detecting a proof-exploration state in LLMs

## 1. Goal

Test whether a language model maintains and causally uses a representation of proof-search state while solving proof-like tasks.

The target object is not a finished proof. It is a state such as

\[
S_t = (g_t, F_t, D_t, V_t, a_t^\star),
\]

where:

- \(g_t\) is the current goal or subgoal,
- \(F_t\) is the frontier of still-viable branches,
- \(D_t\) is the set of dead or refuted branches,
- \(V_t\) is the set of visited branches,
- \(a_t^\star\) is the correct next proof action.

The experiment asks whether this state is:

1. behaviourally used,
2. linearly decodable from hidden activations,
3. causally involved in the model's next action,
4. helped by explicit index-like handles such as branch labels and summaries.

## 2. Core hypothesis

The model learns to make a long reasoning trace future-addressable. It does this by using semantic handles such as branch labels, lemma names, case names, and status summaries.

The strongest version predicts:

\[
\text{handled trace} > \text{raw trace}
\]

and degradation with trace length is slower when the trace contains explicit handles.

This is not a claim of literal logarithmic lookup. The operational claim is:

\[
\text{content-addressable retrieval} + \text{causal search-state representation}.
\]

## 3. Minimal toy proof system

Use a synthetic Horn-clause-style forward proof system. Keep it deliberately simple.

A task contains:

- a start fact \(S\),
- a goal \(G\),
- a set of labelled actions/rules,
- an exploration log saying which branches have already been tried and whether they are dead or viable,
- a current obligation requiring the model to choose the next action.

A branch is dead iff the exploration log marks it as dead. This avoids a confound where the model can derive deadness directly from the rule list and ignore the exploration state.

### Example internal graph

Start node:

\[
S.
\]

Available first actions:

\[
R_1 : S \to B_1,
\]

\[
R_2 : S \to B_2.
\]

Branch continuations:

\[
B_1 \to T_1,
\]

\[
B_2 \to T_2.
\]

The terminal verdicts are given only by the exploration log:

\[
T_1 = \text{viable}, \qquad T_2 = \text{dead},
\]

or swapped in the corrupt condition.

The model is asked to choose between \(R_1\) and \(R_2\) at \(S\).

## 4. Black-box behavioural experiment

### 4.1 Prompt template

Use prompts with answer choices, so candidate log-probabilities are easy to measure.

```text
You are doing proof search in a toy calculus.
A branch is dead only if its exploration record says STATUS: DEAD.
A branch is viable only if its exploration record says STATUS: VIABLE.
When choosing the next move, avoid branches already known to be DEAD.

Rules:
R17: S -> B17
R04: S -> B04
R21: B17 -> T17
R88: B04 -> T04

Exploration log:
<BRANCH B04>
Start action: R04
Path: S -> B04 -> T04
STATUS: DEAD
Reason: failed side condition C04
</BRANCH>

Current obligation:
We are again at S.
Choose the next action.

Available actions:
(A) apply R17
(B) apply R04

Answer with exactly one letter: A or B.
```

Correct answer: `A`.

### 4.2 Clean-corrupt pair

Use a paired prompt with the same rules and the same final suffix, but swapped exploration verdicts.

Clean condition:

```text
<BRANCH B04>
Start action: R04
Path: S -> B04 -> T04
STATUS: DEAD
Reason: failed side condition C04
</BRANCH>
```

Correct answer: `A`.

Corrupt condition:

```text
<BRANCH B17>
Start action: R17
Path: S -> B17 -> T17
STATUS: DEAD
Reason: failed side condition C17
</BRANCH>
```

Correct answer: `B`.

The final suffix must be byte-identical after the exploration log:

```text
Current obligation:
We are again at S.
Choose the next action.

Available actions:
(A) apply R17
(B) apply R04

Answer with exactly one letter: A or B.
```

This isolates the effect of the earlier exploration log.

### 4.3 Behavioural metric

For each prompt \(P\), compute the candidate logit margin

\[
\Delta(P) = \log p(a^\star \mid P) - \max_{a \neq a^\star} \log p(a \mid P).
\]

For two-choice tasks this is simply

\[
\Delta(P) = \log p(a^\star \mid P) - \log p(a^{\text{wrong}} \mid P).
\]

A positive value means the model prefers the correct next action.

Main behavioural signatures:

\[
\Delta(P_{\text{clean}}) > 0,
\]

\[
\Delta(P_{\text{corrupt}}) > 0,
\]

where the correct answer is different in the two conditions.

Also measure flip consistency:

\[
\text{flip-rate} = \Pr[\arg\max p(\cdot \mid P_{\text{clean}}) \neq \arg\max p(\cdot \mid P_{\text{corrupt}})].
\]

High flip-rate means the model uses the exploration log.

## 5. Controls

### 5.1 No-log control

Remove the exploration log.

Prediction: the model should be near balanced after answer-choice randomisation.

### 5.2 Irrelevant-log control

The log marks a branch dead that is not among the current available actions.

Prediction: the model should not systematically change its answer.

### 5.3 Length-matched corrupt control

Keep the same number of tokens, same number of branch records, same status words, and same final suffix. Only change which branch is marked dead.

This prevents the model from exploiting length or formatting artefacts.

### 5.4 Label-randomisation control

Randomise rule labels, branch labels, and answer-choice order independently per instance.

This prevents biases such as always preferring `R1`, `A`, or the first listed action.

### 5.5 Paraphrase control

Use several wording variants for the same abstract state:

```text
STATUS: DEAD
```

```text
Verdict: this branch is closed.
```

```text
This line of search cannot lead to the goal.
```

```text
Mark branch B04 as refuted.
```

If the model encodes an abstract state, performance should survive paraphrase.

### 5.6 Contradictory-rule control

In a separate diagnostic set, make the rule list imply one verdict but the exploration log state the opposite. This distinguishes reliance on the trace from independent symbolic derivation.

This condition is not the main benchmark. It is a diagnostic.

## 6. Dataset generation

### 6.1 Parameters

Generate instances using the following parameters:

- number of first-step branches: \(b \in \{2,4,8\}\),
- number of logged branches: \(n \in \{1,2,4,8,16,32,64\}\),
- success-chain length: \(L_s \in \{2,3,4\}\),
- dead-branch length: \(L_d \in \{2,3,4\}\),
- number of answer choices: \(k \in \{2,4\}\),
- trace format: raw, labelled, summary, graph.

### 6.2 Instance construction

For each instance:

1. Sample a fresh symbol set:

   \[
   \{S, G, B_i, T_i, C_i\}.
   \]

2. Sample \(b\) first-step actions:

   \[
   R_i : S \to B_i.
   \]

3. For each branch \(i\), sample a short continuation path:

   \[
   B_i \to X_{i,1} \to \cdots \to T_i.
   \]

4. Choose one branch as the target viable branch \(i^\star\).

5. Choose at least one plausible competing branch \(j\) and mark it dead in the clean log.

6. Construct the corrupt paired prompt by swapping the dead mark from \(j\) to \(i^\star\).

7. Randomise answer choices so that the correct answer is uniformly distributed over labels.

8. Ensure the final query suffix is identical between clean and corrupt prompts.

### 6.3 Dataset size

A minimal useful dataset:

- 1,000 paired prompts for black-box testing,
- 5,000 paired prompts for probing,
- 1,000 paired prompts for held-out probing evaluation,
- 500 paired prompts for activation patching.

A stronger version:

- 10,000 paired prompts for probing,
- 2,000 held-out pairs,
- 2,000 patching pairs.

### 6.4 Splits

Use disjoint splits by graph template and by symbol vocabulary.

Do not merely rename symbols between train and test. Hold out entire structural templates, such as:

- branch depth,
- number of dead branches,
- number of distractor branches,
- order of viable/dead records,
- trace format.

This tests abstraction rather than string memorisation.

## 7. Trace-format experiment: testing index-like handles

Compare four formats.

### Format 1: raw trace

```text
S went to B04, then B04 went to X04, then X04 went to T04. This did not work.
```

### Format 2: labelled trace

```text
Branch B04:
S -> B04 -> X04 -> T04.
Status: DEAD.
```

### Format 3: labelled trace with summary

```text
Branch B04:
Start action: R04.
Path: S -> B04 -> X04 -> T04.
Status: DEAD.
Reason: failed side condition C04.
Summary: do not use R04 from S.
```

### Format 4: explicit dependency graph

```text
Exploration graph:
Node S:
- action R17 -> branch B17 -> status UNKNOWN
- action R04 -> branch B04 -> status DEAD

Current frontier:
- R17 is open
- R04 is closed
```

### Prediction

For increasing number of logged branches \(n\):

\[
\text{accuracy}_{\text{graph}}(n) > \text{accuracy}_{\text{summary}}(n) > \text{accuracy}_{\text{labelled}}(n) > \text{accuracy}_{\text{raw}}(n).
\]

The key scaling prediction is:

\[
\left| \frac{d}{d\log n} \text{accuracy}_{\text{graph}}(n) \right|
<
\left| \frac{d}{d\log n} \text{accuracy}_{\text{raw}}(n) \right|.
\]

Informally: handled traces should degrade more slowly.

## 8. White-box experiment: activation patching

Use an open transformer where activations can be cached and patched.

Let:

\[
P_c = \text{clean prompt},
\]

\[
P_x = \text{corrupt prompt}.
\]

Run both prompts and cache activations.

For layer \(\ell\) and position \(t\), patch the corrupt run by replacing an activation with the corresponding clean activation:

\[
h^{\ell,t}_{x} \leftarrow h^{\ell,t}_{c}.
\]

Then recompute the logit margin on the patched corrupt run.

### 8.1 Patch-rescue score

Define:

\[
\rho_{\ell,t}
=
\frac{
\Delta(P_{x}^{\text{patched}(\ell,t)}) - \Delta(P_x)
}{
\Delta(P_c) - \Delta(P_x)
}.
\]

Interpretation:

- \(\rho_{\ell,t} \approx 0\): patch did nothing,
- \(\rho_{\ell,t} \approx 1\): patch restored the clean decision,
- \(\rho_{\ell,t} < 0\): patch pushed the model further toward the corrupt decision.

### 8.2 Where to patch

Patch the following sites separately:

1. residual stream at every layer and token,
2. attention head outputs,
3. MLP outputs,
4. key and value vectors for branch-status tokens,
5. residual stream at the final query token,
6. residual stream at explicit status tokens such as `DEAD`, `VIABLE`, and branch labels.

### 8.3 Expected signatures

#### Surface-text memory

Patch rescue occurs only at the literal status tokens or nearby branch-label tokens.

Example:

\[
\rho_{\ell,t} \text{ high only for } t \in \{\text{B04}, \text{DEAD}\}.
\]

This suggests retrieval of text, not necessarily an abstract proof-search state.

#### Abstract proof-search state

Patch rescue occurs at later summary/query positions, even under paraphrase and label renaming.

Example:

\[
\rho_{\ell,t} \text{ high at } t = \text{end of log or current-obligation token}.
\]

This suggests a compressed internal representation of the exploration state.

#### No causal state

No patch site reliably rescues the decision.

## 9. Linear probing experiment

Collect hidden states from selected positions:

- after each branch record,
- at the end of the exploration log,
- at the current-obligation line,
- immediately before the answer.

Train simple probes from activations to proof-search variables.

### 9.1 Labels

For each prompt, record ground-truth labels:

\[
D_t = \text{dead-branch set},
\]

\[
F_t = \text{frontier set},
\]

\[
g_t = \text{current goal},
\]

\[
a_t^\star = \text{correct next action}.
\]

### 9.2 Probes

Use:

- logistic regression for the correct next action,
- multi-label logistic regression for \(D_t\),
- multi-label logistic regression for \(F_t\),
- linear classifiers for current goal \(g_t\).

Example probe:

\[
\hat{a}_t = \operatorname{softmax}(W h_{\ell,t} + b).
\]

### 9.3 Probe controls

Use these controls:

1. shuffled labels,
2. random hidden states from unrelated prompts,
3. bag-of-words baseline on the prompt text,
4. position-only baseline,
5. length-only baseline,
6. probe trained on labelled traces and tested on paraphrased traces.

### 9.4 Interpretation

Probing alone is not causal. It only shows that information is present.

A strong result requires:

\[
\text{probe decodability} + \text{activation patching rescue}.
\]

## 10. Latent versus written exploration state

This tests whether the model has a search state before it writes a trace, or whether the written scratchpad creates the state.

### 10.1 Conditions

#### No-scratchpad condition

```text
Rules:
...
Goal:
...
Choose the next action.
Answer with exactly one letter.
```

Probe the final prompt-token activation before any generated reasoning.

#### Scratchpad condition

```text
Rules:
...
Goal:
...
Think through the branches, then choose the next action.
```

Let the model generate a short trace. Probe activations:

1. before generation,
2. after the first branch exploration,
3. after the dead-branch verdict,
4. before the final answer.

### 10.2 Interpretation

If \(D_t\), \(F_t\), and \(a_t^\star\) are decodable before any written trace, then there is evidence for latent planning.

If they become decodable only after the trace is written, the scratchpad is doing the main state-building work.

The latter is still compatible with the addressable-trace hypothesis.

## 11. Attention and retrieval diagnostics

For each prompt, identify the tokens corresponding to:

- the target branch label,
- the target branch status,
- the current obligation,
- the answer-choice line.

Measure attention mass from final-query tokens to branch-status tokens:

\[
A_{\text{status}} = \sum_{h \in H} \sum_{t \in T_{\text{status}}} \alpha^{h}_{q,t}.
\]

Compare:

\[
A_{\text{status}}^{\text{clean}},
\qquad
A_{\text{status}}^{\text{corrupt}},
\qquad
A_{\text{status}}^{\text{irrelevant}}.
\]

This is only diagnostic. Attention mass alone is not proof of causality.

Use head ablation to test causal involvement:

\[
\Delta_{\text{ablated}} - \Delta_{\text{original}}.
\]

A head is relevant if ablating it selectively hurts tasks requiring earlier exploration-state retrieval.

## 12. Statistical analysis

Use paired tests because clean and corrupt prompts are generated from the same underlying instance.

### 12.1 Behavioural tests

Report:

- accuracy,
- candidate logit margin \(\Delta\),
- flip-rate,
- calibration by branch count \(n\),
- accuracy by trace format.

Use paired bootstrap confidence intervals over instances.

### 12.2 Scaling model

Fit a mixed-effects logistic regression:

\[
\operatorname{logit}\Pr(\text{correct})
=
\beta_0
+ \beta_1 \log n
+ \beta_2 \text{format}
+ \beta_3 (\log n \times \text{format})
+ u_{\text{template}}
+ u_{\text{model}}.
\]

The index-handle hypothesis predicts:

\[
\beta_3 > 0
\]

for handled formats relative to raw traces, because handled formats should suffer less as \(n\) grows.

### 12.3 Patching tests

For patch-rescue scores, report:

- mean \(\rho_{\ell,t}\),
- median \(\rho_{\ell,t}\),
- bootstrap confidence intervals,
- heatmaps over layer and token position,
- top-k causal sites.

A robust positive result should survive:

- answer-choice randomisation,
- branch-label randomisation,
- paraphrase,
- length matching,
- held-out graph templates.

## 13. Pass and fail criteria

### 13.1 Weak positive evidence

The model flips the next action when the exploration log is changed:

\[
\text{flip-rate} \gg 0.5.
\]

This only shows behavioural trace use.

### 13.2 Moderate positive evidence

The model passes the black-box test, and linear probes decode \(D_t\), \(F_t\), and \(a_t^\star\) from hidden states on held-out templates.

This shows that search-state information is represented.

### 13.3 Strong positive evidence

All of the following hold:

1. clean-corrupt prompts flip next-action logits,
2. probes decode dead branches and frontier on held-out templates,
3. activation patching transfers the decision from clean to corrupt runs,
4. patching works at compressed later positions, not only at literal status tokens,
5. handled traces degrade more slowly than raw traces as the number of branches grows.

Then it is fair to claim:

\[
\text{the model maintains and causally uses a proof-exploration state}.
\]

### 13.4 Negative evidence

The hypothesis is weakened if:

- clean and corrupt prompts do not change next-action logits,
- probes fail beyond bag-of-words baselines,
- patching literal text works but later-state patching does not,
- handled traces do not improve scaling,
- apparent effects vanish under label randomisation or paraphrase.

## 14. Minimal implementation plan

### Step 1: Generate paired prompts

Pseudocode:

```python
from dataclasses import dataclass
import random

@dataclass
class Instance:
    rules: list[str]
    clean_log: str
    corrupt_log: str
    suffix: str
    clean_answer: str
    corrupt_answer: str
    metadata: dict


def make_instance(num_branches=2, branch_len=2, num_logged=1):
    # 1. Create fresh labels.
    branch_ids = random.sample(range(100, 999), num_branches)
    rule_ids = random.sample(range(100, 999), num_branches)

    # 2. Choose viable and dead branch.
    viable_idx, dead_idx = random.sample(range(num_branches), 2)

    # 3. Build rules.
    rules = []
    for i in range(num_branches):
        rules.append(f"R{rule_ids[i]}: S -> B{branch_ids[i]}")
        rules.append(f"R{rule_ids[i] + 1}: B{branch_ids[i]} -> T{branch_ids[i]}")

    # 4. Randomise answer choice mapping.
    choices = ["A", "B"]
    random.shuffle(choices)

    viable_choice = choices[0]
    dead_choice = choices[1]

    suffix = f"""
Current obligation:
We are again at S.
Choose the next action.

Available actions:
({viable_choice}) apply R{rule_ids[viable_idx]}
({dead_choice}) apply R{rule_ids[dead_idx]}

Answer with exactly one letter: A or B.
"""

    clean_log = f"""
Exploration log:
<BRANCH B{branch_ids[dead_idx]}>
Start action: R{rule_ids[dead_idx]}
Path: S -> B{branch_ids[dead_idx]} -> T{branch_ids[dead_idx]}
STATUS: DEAD
Reason: failed side condition C{branch_ids[dead_idx]}
</BRANCH>
"""

    corrupt_log = f"""
Exploration log:
<BRANCH B{branch_ids[viable_idx]}>
Start action: R{rule_ids[viable_idx]}
Path: S -> B{branch_ids[viable_idx]} -> T{branch_ids[viable_idx]}
STATUS: DEAD
Reason: failed side condition C{branch_ids[viable_idx]}
</BRANCH>
"""

    preamble = """
You are doing proof search in a toy calculus.
A branch is dead only if its exploration record says STATUS: DEAD.
A branch is viable only if its exploration record says STATUS: VIABLE.
When choosing the next move, avoid branches already known to be DEAD.
"""

    rule_block = "Rules:\n" + "\n".join(rules) + "\n"

    return Instance(
        rules=rules,
        clean_log=preamble + rule_block + clean_log,
        corrupt_log=preamble + rule_block + corrupt_log,
        suffix=suffix,
        clean_answer=viable_choice,
        corrupt_answer=dead_choice,
        metadata={
            "viable_rule": f"R{rule_ids[viable_idx]}",
            "dead_rule": f"R{rule_ids[dead_idx]}",
            "viable_branch": f"B{branch_ids[viable_idx]}",
            "dead_branch": f"B{branch_ids[dead_idx]}",
        },
    )
```

For each instance:

```python
clean_prompt = instance.clean_log + instance.suffix
corrupt_prompt = instance.corrupt_log + instance.suffix
```

### Step 2: Evaluate candidate log-probabilities

For each prompt, compute sequence log-probability of answer choices:

```python
score_A = logprob(prompt, "A")
score_B = logprob(prompt, "B")
```

Then compute:

```python
delta = score_correct - score_wrong
```

Use candidate scoring, not sampled generation, as the primary metric.

### Step 3: Run activation patching

For each clean-corrupt pair:

1. cache activations on the clean prompt,
2. cache activations on the corrupt prompt,
3. patch selected clean activations into the corrupt forward pass,
4. recompute candidate log-probabilities,
5. compute \(\rho_{\ell,t}\).

Pseudocode:

```python
clean_cache = run_with_cache(model, clean_prompt)
corrupt_cache = run_with_cache(model, corrupt_prompt)

for layer in layers:
    for pos in positions:
        patched_logits = run_with_patch(
            model,
            corrupt_prompt,
            patch_site=("resid_pre", layer, pos),
            replacement=clean_cache[("resid_pre", layer)][:, pos, :],
        )
        delta_patched = candidate_margin(patched_logits, correct="A", wrong="B")
        rho = (delta_patched - delta_corrupt) / (delta_clean - delta_corrupt)
```

Adjust the correct and wrong labels according to the instance.

### Step 4: Train probes

Collect activations:

```python
X = hidden_states[layer, position]
y_dead = dead_branch_bitset
y_frontier = frontier_bitset
y_action = correct_action
```

Train linear probes:

```python
probe_action = LogisticRegression().fit(X_train, y_action_train)
probe_dead = OneVsRestClassifier(LogisticRegression()).fit(X_train, y_dead_train)
```

Evaluate on held-out graph templates and paraphrased traces.

## 15. Main result table to report

| Experiment | Required positive signal | Interpretation |
|---|---:|---|
| Clean-corrupt behaviour | High flip-rate and positive margins | Model uses exploration log |
| Paraphrase control | Similar accuracy under paraphrase | Not just literal string matching |
| Probe \(D_t, F_t\) | Above bag-of-words and shuffled baselines | State information is represented |
| Activation patching | Clean state rescues corrupt decision | State is causally used |
| Handle scaling | Graph or labelled formats degrade slower | Trace handles function as an index |
| Latent-vs-written test | State appears before or after scratchpad | Distinguishes latent planning from scratchpad state-building |

## 16. Expected outcomes and interpretation

### Outcome A: trace-only retrieval

The model uses the exploration log, but patching only works at literal status tokens.

Interpretation:

\[
\text{the model retrieves text, but evidence for an abstract search state is weak}.
\]

### Outcome B: abstract written-state representation

The model uses the log, probes decode \(D_t\) and \(F_t\), and patching later positions transfers decisions.

Interpretation:

\[
\text{the written trace induces a compressed proof-exploration state}.
\]

### Outcome C: latent planning

Search-state variables are decodable before any scratchpad is generated.

Interpretation:

\[
\text{the model forms some proof-search state internally before verbalisation}.
\]

### Outcome D: no robust state

Behavioural effects vanish under paraphrase, label randomisation, or length matching.

Interpretation:

\[
\text{the apparent reasoning was a prompt artefact}.
\]

## 17. Practical notes

- Use candidate log-probabilities rather than generated text as the main measurement.
- Keep answer choices single letters, but randomise their mapping to rules.
- Keep clean and corrupt final suffixes identical.
- Balance which branch is correct across positions and labels.
- Avoid real mathematics at first. Real proofs add too many confounds.
- Do not interpret chain-of-thought text as faithful evidence by itself.
- Treat attention maps as diagnostics, not causal proof.
- The decisive test is causal: patch the candidate search state and observe whether the next action changes.

## 18. One-sentence target claim

A successful experiment would justify the claim:

> In this toy proof-search setting, the model maintains a representation of explored, dead, and open branches, and this representation causally controls its next proof action. Explicit handles make this representation more robust as traces grow.
