# QSL's Role in ProQure Evaluation: A Governance Proposal

**Prepared for:** DSIT, Innovate UK, NQCC, University of Edinburgh
**Date:** April 2026
**Status:** Policy drafting — not legal advice

---

## Executive Summary

The UK's ProQure programme will invest up to £1 billion in quantum computing hardware. Credible technical evaluation of vendor platforms is essential to sound procurement decisions. The Quantum Software Lab (QSL) at the University of Edinburgh — the UK's largest quantum-software research centre and NQCC's primary academic R&D partner — is the only UK institution with cross-platform benchmarking capability spanning superconducting, ion-trap, neutral-atom, photonic, and annealing systems.

DSIT has indicated that QSL should not participate in ProQure calls. This brief argues that blanket exclusion is not the lowest-risk option. It trades a manageable conflict-of-interest risk for an unmanageable evaluation-quality risk. Under the Procurement Act 2023 (ss.81–83), the conflicts assessment must document what alternative evaluation capability exists. If the honest answer is "none of comparable breadth on the required timeline," then exclusion is itself a procurement vulnerability.

**We propose governed engagement, not institutional trust.** The architecture is designed to minimise QSL discretion rather than rely on QSL neutrality:

- **QSL is excluded from bid award** — in the live 2026 competition and all future rounds. No scoring, no ranking, no interview panels, no gateway decisions. Non-negotiable.

- **QSL is permitted bounded post-award verification** — executing pre-defined benchmark protocols on awarded testbeds with no discretion over workload selection, thresholds, or interpretation. Subject to process assurance, red-route exclusions, and six bright-line prohibitions frozen into procurement documents.

- **For future calls and Phase 2**, QSL may develop evaluation methodology through formal Preliminary Market Engagement (ss.16–17), with protocols frozen and escrowed before the tender notice is issued.

- **Vendor-specific conflict routing** (the "red-route" model) automatically excludes QSL from verifying any vendor where there is active co-development on the same subsystem with overlapping personnel — rather than requiring an all-or-nothing institutional decision.

- **Capability escrow** at NQCC ensures that benchmark tools can be run by others if a conflict trigger fires, reducing DSIT's dependency on any single institution.

- **A dedicated evaluation budget** (£1.5–2.5M for Phase 1, ~1–2% of contract value) transforms QSL from an unfunded dependency into a contracted evaluation function with defined scope and accountability.

The counterfactual must be faced directly: excluding QSL does not produce a conflict-free evaluation — it produces a weaker one. No alternative UK institution can replicate QSL's full evaluation pipeline within ProQure Phase 1 timelines. The choice is not between compromised evaluation and clean evaluation. It is between governed engagement with auditable constraints, and ungoverned exclusion with unexamined quality risk.

---

## 1. Legal Baseline

This proposal is framed under the **Procurement Act 2023**, which governs the ProQure competition (opened 27 March 2026):

- **ss.81–83 (Conflicts of interest):** A conflicts assessment must be prepared, maintained, and kept under review. Where a conflict exists, proportionate mitigation is required. Exclusion is appropriate only where the conflict cannot be neutralised by lesser measures.

- **ss.16–17 (Preliminary market engagement):** PME is permitted provided it is transparent and non-distortive. Methodology developed through declared PME and published as open specifications is a legally clean route to QSL involvement in evaluation design.

- **s.23 (Award criteria):** Criteria must be set before evaluation begins. s.24 governs any refinement. QSL must have no role in setting or modifying award criteria during a live competition.

The conflicts record must be maintained in a form suitable for disclosure if challenged.

## 2. Phase Regimes

| Phase | QSL Role | Scope | Timing |
|---|---|---|---|
| **A — Pre-competitive methodology** | Develops and publishes open benchmark specifications through formal PME; protocols frozen before tender notice; QATCH vendor relationships declared in published register | Future calls and Phase 2 only | Before tender notice |
| **B — Live competition** | **Fully excluded** | All rounds including 2026 | Tender notice → contract award |
| **C — Post-award verification** | Executes pre-defined benchmark protocols as contracted service; no discretion over workloads, thresholds, or interpretation rules | All rounds including 2026 | Post-award → Phase 2 gateway |

For the **live 2026 competition** (closes 29 May 2026 at 11:00), only Phase C involvement is realistic. Full governance architecture applies to future rounds.

## 3. Bright-Line Prohibitions

QSL must not, at any point during a live competition or post-award verification:

1. Advise bidders on submissions, technical approach, or response strategy
2. Access bidder-confidential material beyond what is strictly necessary to run fixed tests on awarded testbeds
3. Alter benchmarks, thresholds, or protocol parameters — any modification requires formal change control approved by the process assurance body
4. Score, rank, moderate, or sit on interview panels at any stage
5. Provide informal briefings that interpret or contextualise results beyond the protocol's published output format
6. Participate in Phase 2 gateway decisions

These prohibitions are frozen into the conflicts assessment, contract terms, and audit trail — not advisory.

## 4. Red-Route Model

Rather than an all-or-nothing institutional decision, conflicts are managed **per vendor, per subsystem.**

**Automatic trigger** (all three conditions must be met):

1. An active QATCH work package involves QSL personnel in co-development with a ProQure vendor
2. The work package covers the same subsystem as defined by the verification protocol scope — not broad architecture labels
3. Named personnel overlap: at least one QSL researcher who is PI/Co-I, work-package lead, benchmark or harness author, code owner, or holds access to non-public vendor material on the QATCH work package is also assigned to (or was assigned within the preceding 6 months) the Phase C verification team for that vendor

**Where all three conditions are met, QSL must not conduct that vendor's verification activity.** The verification is routed to the process assurance body or non-QSL NQCC staff using escrowed tools.

**Where conditions 1 and 2 are met but not 3:** the conflict is logged; the NQCC ProQure Technical Lead decides whether to escalate. If that lead is themselves conflicted, authority passes to the NQCC Director or a named deputy.

**QSL reporting duty:** new QATCH work packages or personnel changes must be reported within 10 working days. Failure to report is itself a conflicts-assessment finding.

**Conflict register:** maps QATCH work packages to ProQure vendors and verification protocol scopes; updated quarterly by QSL; audited by the process assurance body.

**Minimum evidence for the ss.81–83 record (per exclusion):** QATCH work package ID; named personnel; affected vendor and verification protocol scope; nature of subsystem overlap; date range; routing decision and tools used; dual sign-off by NQCC ProQure Technical Lead and process assurance body.

## 5. Process Assurance

No UK body can replicate QSL's full evaluation stack. The second key is **procedural assurance**, not peer evaluation:

| Function | Description |
|---|---|
| **Protocol approval** | Reviews and approves the frozen benchmark protocol before verification use |
| **Witnessed runs** | Observes a defined subset of benchmark executions |
| **Random reruns** | Authority to select and rerun any benchmark without prior notice to QSL |
| **Deviation log** | Independent record of any departure from the frozen protocol |
| **Chain-of-custody sign-off** | Co-signs the evidence pack confirming protocol was followed |
| **Rerun authority** | Can require rerun where process drift is suspected |

The process assurance body has continuous read access to escrow artefacts and audit logs. It does not have unrestricted access to vendor-confidential outputs — access is limited to what is necessary for protocol review, witnessed runs, and deviation logging.

**Candidate bodies:** NPL, competed commercial contractor, Fraunhofer IPA / PTB Berlin.
**Estimated cost:** £500K–£1.5M per phase (<1% of Phase 1 contract value).

## 6. Capability Escrow

QSL's benchmark tools are deposited at NQCC so that others can execute them if a conflict trigger fires.

- **Custody:** NQCC manages the escrow repository; QSL has write-only deposit access and cannot delete or modify deposited versions
- **Format:** Each protocol version is deposited as an immutable, hashed release; fallback execution may be authorised only from the last verified executable version
- **Cadence:** Deposited at each protocol version; NQCC verifies executability within 10 working days
- **Artefacts:** Source code, configuration files, parameter definitions, expected-output baselines, operating procedures, and a runbook sufficient for a competent quantum computing researcher to execute the protocol
- **Access:** Process assurance body has continuous read access to artefacts and audit logs
- **Fallback triggers:** (1) red-route exclusion declared; (2) judicial review or formal procurement challenge filed naming QSL; (3) process assurance body identifies unresolvable process drift

## 7. Institutional Split

| Function | Owner | QSL Role |
|---|---|---|
| Public benchmark methodology | QSL (future calls, via PME) | Lead, under PME rules |
| Bid assessment and scoring | Innovate UK panel (5 assessors) | **Excluded** |
| Post-award technical verification | NQCC (QSL as contracted executor) | Execute fixed protocols |
| Process assurance and co-signing | Independent body (NPL / competed) | None |
| Capability escrow | NQCC (custody) | Deposit only |
| Phase 2 gateway decisions | DSIT / Innovate UK | **Excluded** |

## 8. Kashefi Dual Role

Prof. Kashefi holds a dual appointment as QSL Director and NQCC Chief Scientist — a structure that concentrates both the expertise and the conflict-of-interest concern.

- **Short-term:** Recuses from all ProQure-related decisions in her NQCC capacity; NQCC appoints a separate ProQure Technical Lead; recusal documented in the conflicts assessment
- **Medium-term:** NQCC plans succession so the dual appointment is not perpetuated as ProQure scales toward £1B — a structural design choice, not a reflection on the individual

## 9. Dedicated Evaluation Budget

QATCH is EPSRC research funding. It was not designed for — and cannot legally be redirected to — government procurement evaluation. If ProQure deploys £140M in Phase 1 alone, the evaluation infrastructure cannot rely on unfunded goodwill.

| Phase | Budget | % of contract value |
|---|---|---|
| Phase 1 | £1.5–2.5M | 1–2% |
| Phase 2+ | Scales at 1–1.5% | — |

**Covers:** QSL Phase C verification (contracted), process assurance body, escrow maintenance, conflict register and audit infrastructure.

**Administered by** Innovate UK. **Managed technically by** NQCC. This is not QSL's budget to control — it is payment for a contracted evaluation service with defined scope and liability.

## 10. The Argument to DSIT

DSIT's position is driven by two concerns: legal challenge from losing vendors, and reputational risk from perceived insider dealing. Both are legitimate. Neither is best addressed by blanket exclusion.

**On legal risk:** Exclusion does not eliminate legal exposure — it relocates it. If the evaluation methodology used by substitute assessors is demonstrably weaker, losing vendors can challenge the *quality* of assessment, not just the process. Weak evaluation of a £1B programme is itself a judicial review target. Under ss.81–83, the conflicts assessment must demonstrate that the chosen mitigation is proportionate — including the proportionality of excluding the most capable evaluator.

**On the counterfactual:** Which UK institution has cross-platform benchmarking capability across superconducting, ion-trap, neutral-atom, photonic, and annealing systems? The honest answer is: none other than QSL, within the required timeline. International alternatives (Sandia, NIST, Fraunhofer) are not subject to UK procurement law and add jurisdictional complexity. Building a credible substitute requires 18–24 months. ProQure Phase 1 starts October 2026. The counterfactual is not "use someone else" — it is "evaluate badly or delay the programme."

**The ask:** DSIT approves a governed engagement model with the constraints described above. In exchange, QSL accepts formal constraints — bid-stage exclusion, bright-line prohibitions, red-route triggers, capability escrow, process assurance, and Kashefi recusal. These commitments are frozen into procurement documents, the conflicts assessment, and contract terms — not advisory memoranda.

**The principle:** the strongest foundation for procurement defensibility is not the absence of expertise, but the presence of auditable constraints on how that expertise is used.
