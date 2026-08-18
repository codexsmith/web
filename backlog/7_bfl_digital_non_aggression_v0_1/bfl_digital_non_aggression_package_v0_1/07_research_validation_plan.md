# Research and Validation Plan

## Objective

Determine whether the proposed digital non-aggression / non-destruction / non-interference framework identifies a real governance gap, supplies useful distinctions, and can be translated into legally, technically, and institutionally workable instruments.

## Workstream A — Technical threat validation

### Questions

- Which forms of agentic propagation have been demonstrated?
- What assumptions are required?
- Which defenses already exist?
- Which controls fail under adaptive or locally hosted systems?
- What is novel relative to traditional worms, prompt injection, supply-chain compromise, and automated exploitation?

### Outputs

- annotated literature review;
- threat taxonomy;
- demonstration matrix;
- defense matrix;
- incident and proof-of-concept corpus;
- limitations and negative-results register.

### Promotion gate

At least two security researchers review the technical characterization and agree that the project does not exaggerate the demonstrations.

## Workstream B — Legal and international-norms mapping

### Domains

- cybercrime law;
- international law on sovereignty, intervention, use of force, and armed attack;
- state responsibility and attribution;
- international humanitarian law where applicable;
- computer misuse and unauthorized-access law;
- data protection and privacy;
- product liability and negligence;
- platform and intermediary responsibility;
- export controls and dual-use governance;
- arms-control and confidence-building mechanisms;
- responsible vulnerability disclosure.

### Outputs

- current-law map;
- gap and overlap analysis;
- terminology risk memo;
- institutional-form comparison;
- exception and defensive-action memo.

### Promotion gate

A qualified legal reviewer confirms that the public text clearly separates existing doctrine from proposed doctrine.

## Workstream C — Boundary-first formalization

### Objects to formalize

- actor and principal;
- authorization boundary;
- propagation graph;
- consequence ceiling;
- protected invariant;
- defect state;
- closure condition;
- repair operator;
- responsibility edge;
- recertification state.

### Candidate representation

Model an operation as:

```text
O = (P, A, T, R, X, I, L, S)
```

where:

- `P` = accountable principal;
- `A` = authorized action set;
- `T` = target boundary;
- `R` = resource boundary;
- `X` = propagation and delegation constraints;
- `I` = protected invariants;
- `L` = logging and witness requirements;
- `S` = stop, repair, and recertification mechanisms.

An operation is presumptively inadmissible when it performs a consequential transition outside `A`, `T`, `R`, or `X`, violates `I`, or lacks proportionate `L` and `S`.

### Outputs

- typed threat model;
- formal vocabulary;
- propagation diagrams;
- admissibility tests;
- case-study encodings.

### Promotion gate

The formalism must improve analysis of at least three cases without merely renaming ordinary security concepts.

## Workstream D — Technical control profile

### Control families

- data/instruction separation;
- provenance and trust labeling;
- memory and retrieval integrity;
- least privilege;
- tool-use authorization;
- propagation rate and destination limits;
- execution isolation;
- credential partitioning;
- stop and revocation mechanisms;
- evidence and audit trails;
- restoration and recertification.

### Outputs

- control catalog;
- maturity levels;
- test procedures;
- example system profile;
- red-team scenarios;
- certification candidate.

### Promotion gate

A small prototype or test harness demonstrates that at least one proposed control can be evaluated reproducibly.

## Workstream E — Institutional and public-interest review

### Stakeholders

- security practitioners;
- infrastructure operators;
- civil society;
- digital-rights and privacy advocates;
- open-source and open-weight communities;
- researchers;
- incident responders;
- government and diplomatic experts;
- organizations likely to bear compliance costs.

### Questions

- Could the framework be abused to restrict research, interoperability, protest, journalism, or open-source development?
- Does verification create surveillance or centralization risks?
- Are small actors burdened disproportionately?
- Can the rules be enforced against state and corporate actors symmetrically?
- What remedy is available to affected individuals and organizations?

### Outputs

- abuse-case register;
- rights-impact assessment;
- stakeholder feedback log;
- revised principles and exceptions.

## Workstream F — Publication sequence

### Paper 1

**From Morris-II to Adaptive Worms: Propagation, Delegation, and Authorized-Purpose Integrity**

Bounded technical and conceptual analysis.

### Paper 2

**Artificial Intelligence, Not Automated Aggression**

Normative argument with explicit legal caution.

### Paper 3

**The Digital Agency and Propagation Audit**

Practical method and worksheets.

### Paper 4

**The Forge, the Certificate, and the Accord**

Institutional stack connecting development practice, certification, and shared prohibitions.

### Paper 5

**A Draft Digital Non-Aggression / Non-Destruction / Non-Interference Instrument**

Only after expert and comparative review.
