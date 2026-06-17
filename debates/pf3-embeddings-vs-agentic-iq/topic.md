# Motion

A third pathfinder route built on dense embeddings ("PF3") can REPLACE the
paper-vs-paper recourse to per-candidate agentic drafting that PF1 and PF2 both
depend on, without losing the shared-artefact discipline that makes their
verdicts trustworthy.

## The debate must resolve which of these is true

1. **Replacement (the strong motion).** Embedding similarity, calibrated against
   a gold set, can decide "plausible vs not-applicable" well enough to retire
   per-candidate LLM drafting. PF3 stands alone.
2. **Prefilter (the weak claim).** Embeddings cut the candidate count to a
   sub-quadratic k-nearest-neighbour shortlist, but an LLM agent must still draft
   the verdict for each survivor. The quadratic cost becomes sub-quadratic; the
   agentic verdict does not go away.
3. **Orthogonal discovery (a different claim).** Embeddings surface joins the
   hand-built vocabularies cannot name, but neither replace nor prefilter the
   existing routes; they feed the vocabulary, not the verdict.

Do not let the debate settle into vague agreement. The crux is sharp: similarity
is not a shared artefact. A useful outcome names the experiment that would
decide between 1, 2 and 3, and states the calibration or hybrid design that the
strong motion would require to hold.

Full architecture and the empirical collision evidence are in the attached
context.
