# Would Open Collider's "collision" idea produce better heated-debate outcomes?

Review the proposition that injecting **structurally-distant domain capsules** into the architect/reviewer prompts of `heated-debate` — in the spirit of Open Collider's operationalization of Koestler's bisociation — would produce *better debate outcomes* than the current creativity-dial-alone setup.

## What Open Collider does (one paragraph)

Open Collider (CL-ML/open-collider) is a Claude Code skill / API pipeline for non-trivial idea generation. Its central move: before asking the model for ideas, *force* it to reason through a counter-intuitive principle from a structurally distant knowledge domain — a "collision." Pipeline is: generate distant domains → for each (reference text × domain) pair, generate ~20 ideas in an isolated context → score against user-defined axes → curate with human love/like/trash → next iteration biases domain selection (fresh / deepen / refresh) from feedback. Premise: direct prompting traps outputs in a "default-prompt basin"; only cross-matrix injection escapes it.

## What heated-debate currently does

A round-based adversarial loop between an architect and a reviewer. A creativity dial cools linearly from 5 (Wild — "explore radical alternatives, question the premise") to 1 (Precise — "converge; correctness only"). The dial text is *instructional only* — no external content is injected. Topics are intended to be review-framed (see `todo.md`); imperative topics cause agents to drift into implementation.

## What the debate must decide

1. **Define "better outcome" first.** Less basin-convergence between architect and reviewer? More genuinely novel proposals surviving to round 1 (Precise)? Faster convergence on good plans? Higher-quality minority reports? Be concrete — the debate is useless without an operationalization the architect and reviewer both accept.

2. **At which dial levels would collision help vs. hurt?** Plausibly: helpful at dial 5 (Wild), neutral at 3 (Balanced), actively harmful at 1 (Precise) where it would re-open settled ground. Argue the shape of the curve.

3. **Is bisociation redundant given the adversarial structure?** The architect/reviewer split is *already* a frame-collision (proposer vs. critic). Does adding a distant-domain capsule on top compound the effect, or does the second frame drown out the first?

4. **Concrete design.** If collision helps, what's the minimal patch? Options: (a) inject one distant-domain capsule into both agents on dial=5 only; (b) inject *different* domains into A and B to deliberately desynchronize their frames; (c) make the domain a per-round parameter and let the dial control its "distance"; (d) keep collision out of the dial entirely and put it in a separate `--collide` flag that runs before round 1 as a "framing pass."

5. **Failure modes.** Where does this break? Too-distant domains producing noise; domains the model already over-associates with the topic (no actual collision); architect and reviewer agreeing on the *domain* rather than on the *topic* (worst case: both agents writing about the metaphor instead of the problem).

6. **Falsification.** Propose one concrete A/B that would settle whether collision improves heated-debate outcomes on a representative topic (e.g., one of the existing `debates/` cases). What gets measured, on what topic, against what baseline?

## Out of scope

- Implementing the patch.
- Defending or attacking Koestler's broader theory of creativity.
- The Open Collider scoring/curation loop — heated-debate has no equivalent and that's a separate question.

Architect: propose a concrete, testable integration (or argue convincingly that collision shouldn't be integrated at all). Reviewer: be willing to call the whole proposal a category error if the adversarial structure already does the work bisociation claims to do.
