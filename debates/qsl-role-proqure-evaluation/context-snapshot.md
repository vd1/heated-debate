# Context: QSL's role in ProQure evaluation

## The actors

- **DSIT** (Department for Science, Innovation and Technology): Ultimate procurement decision-maker. Has insisted QSL should not be part of upcoming ProQure calls.
- **NQCC** (National Quantum Computing Centre): Government-funded national lab hosting testbeds. Already runs joint TTE programme with QSL. Steered by Director Cuthbert.
- **QSL** (Quantum Software Lab, University of Edinburgh): UK's largest quantum-software centre, 70+ researchers, 32 industry partners. Led by Prof. Kashefi (also NQCC Chief Scientist). Primary academic R&D partner of NQCC.
- **ProQure vendors**: Up to 10 hardware companies funded at £14M each in Phase 1, scaling to £75M in Phase 2, within a £1B total programme.

## QATCH programme (QSL's funded research)

- £20M EPSRC grant, Apr 2026 – Mar 2030 (4 years)
- Three research pillars: Quantum Advantage Engine (algorithms), HPC & Fault-Tolerant Architecture (systems), Performance Evaluation (benchmarking/verification)
- Six application sectors: Healthcare, Materials, Cybersecurity, Finance, Energy, AI & Data Science
- 32 partners including IBM, Quantinuum, Phasecraft, ORCA Computing, Rigetti, Algorithmiq, Quandela, NuQuantum, Q-CTRL, Jij, Alice & Bob, Xanadu, BT, Nomura, HSBC, Rolls-Royce, NVIDIA, Cambridge Consultants
- Key tools being built: Testbed Technical Evaluation toolkit, Resource Estimation tool, Digital Twin, Verification-Inspired Benchmarking, Distributed Compiler
- QATCH explicitly describes QSL as both "validator" and "catalyst" — it verifies hardware performance AND co-designs applications with vendors
- Kashefi is both QSL Director and NQCC Chief Scientist — a dual role that embodies the collaboration but also concentrates the conflict-of-interest question

## ProQure Phase 1

- Contracts for Innovation (not grants) — vendors deliver R&D services
- Up to 10 Phase 1 contracts at £14M each
- Vendors must deliver operational testbeds "for independent evaluation and verification" — accessible 3 months before Phase 1 completion
- Phase 2: up to £75M per vendor
- Total future procurement: £1B+
- Timeline: applications by May 2026, contracts awarded Sep 2026, start Oct 2026
- Evaluation by 5 independent assessors + interview panel
- ProQure is a DSIT programme administered by Innovate UK

## Existing QSL-NQCC evaluation work (TTE)

- QSL already runs Testbed Technical Evaluation across ion-trap, superconducting, neutral-atom, photonic, and annealing platforms on NQCC testbeds
- First consolidated Validation Report and Cross-Testbed Benchmarking Toolkit v1.0 due in 2026
- Uses Zero-Trust Verification framework and Entropy Benchmarking
- García-Patrón's entropy-based benchmarking informs NQCC-NPL standards
- This is the existing "active neutrality" model — QSL co-develops evaluation methodology through engagement with platform providers

## The tension

1. DSIT wants QSL separated from ProQure. But QSL is the only institution with the full evaluation pipeline: component benchmarking → system evaluation → application validation → resource estimation → verification → error correction assessment.

2. QATCH is a research programme, not a procurement evaluation budget. It has no funded mandate for ProQure evaluation. If the UK spends £1B on procurement, the evaluation infrastructure needs dedicated funding.

3. Many QATCH partners (IBM, Quantinuum, Phasecraft, ORCA, Rigetti, etc.) are likely ProQure applicants. QATCH milestones depend on co-development with these vendors. Full separation would undermine QATCH deliverables.

4. QSL's methodology-transfer model: learn benchmarking methodology through active collaboration with some vendors, then apply it at arm's length to all vendors (including non-collaborators). This is the "active neutrality" argument. But it may create a perception of a two-tier system.

5. The dual role of Kashefi (QSL Director + NQCC Chief Scientist) concentrates both the expertise and the conflict-of-interest concern in one person.

## What a convincing argument to DSIT needs to address

- Legal defensibility under UK procurement law
- Perception of fairness by vendors who are NOT QSL collaborators
- Governance mechanisms (Chinese walls, recusal, audit trails, rotation)
- The counterfactual: what happens if QSL is excluded? Who evaluates? At what cost in quality?
- Precedent from comparable programmes (DARPA, ESA, CERN procurement)
- The funding gap: QATCH doesn't cover ProQure evaluation, and NQCC alone may lack the research depth
