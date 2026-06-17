# Context: the pathfinder routes and the PF3 question

## What pathfinder is

agQSL joins two paper corpora. On one side, QSL papers, each tagged with the
technique it supplies (a capability such as error mitigation, decoding,
benchmarking, assurance, or a concrete algorithm or method like a VQE variant).
On the other side, vendor-application edges: a specific result where a named
vendor ran a QPU on an application (for example IBM running a VQE for portfolio
optimisation, or QuEra running an analog Rydberg schedule for maximum
independent set). The goal of a pathfinder route is to find (QSL paper, vendor
edge) pairs where the paper's technique could plug into the vendor's result, and
to give a defensible reason why.

## PF1, the application-group route

Composition of three relations: paper supplies a capability; a hand-built bridge
maps that capability to one or more application groups; each application group is
realised by vendor edges. PF1 reaches all 71 joinable papers and emits 432
candidate groups (4560 edge-level rows). It is high recall and loose: an
application-group match does not mean the technique actually composes with that
vendor's workload.

## PF2, the primitive route

Composition of two relations: a paper names or targets an executed primitive
(VQE, QAOA, QPE, Trotterised or analog Hamiltonian evolution, sampling, boson
sampling); a vendor edge runs that primitive. It joins on the executed primitive
and is high precision where it fires, but only 21 papers reach a vendor through
it, and it is structurally blind to the crypto, QEC, networking and assurance
families because they name no primitive. PF2 was built as a cross-check on PF1:
a pair that both routes reach and rate plausible is a triangulation.

## The shared cost the motion targets

Both routes are two-stage:

1. **Deterministic candidate generation** (cheap, byte-stable, no model calls):
   compose the relations and emit candidate (paper, edge, capability) rows.
2. **Agentic drafting** (one LLM agent per surviving candidate): the agent reads
   the full paper text and the edge, then writes a verdict, one of `plausible`,
   `weak`, `not-applicable`, `undercuts`. It must name the single concrete shared
   artefact (the same circuit, the same code family, the same syndrome data, the
   same observable, the same workload family) and state an explicit disqualifier.
   `not-applicable` is a first-class verdict.

PF1 now drafts every candidate (432 agents in the last run). The drafting cost
scales with the candidate count, which is papers times reachable edges; as the
corpus grows and more families are bridged it trends quadratic, toward paper by
paper at the limit. That is the "quadratic recourse to agentic IQ" the motion
wants to escape. There is at present no retrieval or embedding layer anywhere in
the pipeline; the join is entirely vocabulary-bridge plus per-candidate agent.

## The discipline the agentic draft enforces (why it is not just cost)

The value of the draft is anti-hype. A verbatim mention, or a shared category
word such as "optimization", "Ising" or "error detection", is necessary but not
sufficient. The agent has to locate a concrete shared artefact and commit to a
disqualifier. This is not theoretical. In the body-tier primitive experiment,
108 candidate pairs were drafted and 102 dissolved on inspection; 6 survived as
genuine triangulations across 3 papers. The 102 failures are the instructive
part, and every one is a high-similarity pair that is still not applicable:

- a review paper that defines metrics over VQE, QAOA and Trotterised simulation,
  so it sits near every vendor edge in any semantic space, yet targets none of
  them;
- an `adiabatic` token that appears only inside a citation to other people's
  work, in a paper that itself runs a gate-model Grover oracle;
- a classical simulator that consumes QAOA and VQE circuits as benchmark inputs
  and never executes them on hardware;
- a `boson sampling` token that appears in a "for example, in boson sampling-like
  circuits" aside, in a paper that dequantises kernel methods.

These are exactly the pairs a similarity metric ranks as close. "Discusses" and
"targets" are near-identical in embedding space and opposite in verdict. The
agentic IQ is the thing that separates the 6 from the 102.

## The PF3 proposal (the motion under debate)

Equip the pipeline with dense embeddings. Embed the QSL paper text (or its
capability quotes) and the vendor-edge text into a shared vector space and
connect nearest neighbours. No hand-built bridge, no per-candidate LLM draft.
Candidate generation, and on the strong reading the verdict itself, becomes a
vector operation: sub-quadratic with an approximate-nearest-neighbour index,
model-free at query time, deterministic, and able to surface joins the
hand-built vocabularies cannot name. The pipeline's own design notes flag the
absence of any such retrieval layer as a known gap.

## The crux, and what a good outcome looks like

Can embedding similarity substitute for the agentic draft, or can it only
re-order candidates?

- **For the motion.** Embeddings collapse the candidate explosion to a k-nearest
  shortlist, capture proximity the rigid vocabulary misses, cost almost nothing,
  and re-run deterministically. A similarity threshold calibrated on the existing
  drafted verdicts (the 6-versus-102 outcomes are a ready gold set) could stand
  in for "plausible", and a single cheap verifier could replace per-candidate
  drafting at scale.
- **Against the motion.** Similarity is not a shared artefact. The 102 collisions
  are precisely high-similarity, not-applicable pairs. Embeddings cannot emit a
  disqualifier, cannot tell necessary from sufficient, and cannot perform the
  "find the one concrete shared circuit" reasoning that the verdict is. At best
  PF3 is a recall or prefilter layer that reduces the agent count; replacing the
  verdict re-imports the hype the discipline was built to stop.

The debate should not stop at "embeddings help with recall". It should decide
between replacement, prefilter and orthogonal discovery, and it should produce a
concrete decision procedure: what to embed (full text, abstract, or the curated
capability quotes), how to calibrate against the existing drafted gold set, what
precision or recall on the 6-versus-102 set would justify retiring the agent, and
what a defensible hybrid (embeddings for candidates, agent for verdicts) would
actually buy versus the current bridge-plus-agent design.
