# Executable Visual Mathematics — Work Plan

**Status:** active backlog / next-stage work plan  
**Captured:** 2026-09-10  
**Scope:** Boundary First Labs public visual mathematics, Distinction Space sandbox, computational benchmark suite, research communication, and product positioning  
**Parent backlog:** `backlog/21_scientific_visualization_sandboxes/README.md`

---

## 1. Objective

Turn the newly public Distinction Space / Visual Mathematics sandbox from a compelling standalone instrument into a coherent Boundary First Labs program surface.

The immediate proposition is:

> **Boundary First Labs is developing mathematics that can be represented as executable, inspectable, reusable computational objects.**

The work is not merely to create attractive mathematical imagery. The program should demonstrate a complete path:

`formal object -> executable representation -> computational experiment -> observable -> visualization -> benchmark -> reusable engineering object`

The sandbox should become a public window into that apparatus while preserving strict claim boundaries between:

- established mathematical objects;
- Boundary First representations of established objects;
- prototype dynamics;
- experimental observations;
- research hypotheses;
- formal results.

The image may invite attention; the mathematics must survive inspection.

---

## 2. Current State

The public site now has a live Visual Mathematics / Distinction Space sandbox and a homepage launcher attached to Research.

The visual language already includes or has working implementations for several useful mathematical specimens:

- Hopf fibration;
- tesseract / higher-dimensional cube projection;
- Clifford-family geometry;
- Lp / norm-ball morphing;
- Boundary Attractor dynamics;
- prior Calabi-Yau / higher-dimensional visualization work that can be recovered and normalized into the same apparatus.

The sandbox already provides an instrument-panel interaction language with controllable parameters, a specimen chamber, transport controls, telemetry, capture/provenance concepts, and an explicit distinction between operation, record, and explanation.

The next step is not to add visual complexity indiscriminately. It is to make the existing machinery legible as a research, computational, educational, and product program.

---

## 3. Program Thesis

The public-facing thesis should remain modest enough to survive technical inspection while still making the opportunity clear.

### Core statement

> **What if difficult mathematics could be packaged as executable, inspectable, reusable computational objects?**

### Supporting statement

Boundary First Labs is investigating whether mathematical structures can be represented in ways that make their distinctions, boundaries, transformations, projections, observables, and provenance directly operable in software.

### Important non-claim

Do **not** claim that Distinction Space automatically makes every mathematical computation faster.

The benchmark program must explicitly allow:

1. no advantage;
2. constant-factor advantage;
3. representation advantage;
4. incremental-update advantage;
5. sparse / output-sensitive advantage;
6. genuine asymptotic advantage where demonstrated.

The benchmark exists to determine which of these, if any, applies to a given class of object.

---

## 4. Workstream A — Public Positioning and Web Content

Create a coherent content stack around the sandbox so a visitor can understand what it is without first understanding Boundary Theory.

### A1. Sandbox hero / introduction

Develop and integrate copy around:

**Eyebrow:** `BOUNDARY FIRST VISUAL MATHEMATICS`

**Primary concept:** `Mathematics you can operate.`

Supporting explanation should establish that the sandbox combines known mathematical controls, higher-dimensional projections, dynamical systems, and experimental Boundary First constructions inside a common interactive environment.

### A2. “Why are we doing this?” section

Explain the transition:

`visualization -> instrument`

Most mathematical visualization asks how to show a finished object. BFL additionally asks how to operate it: change parameters, compare projections, inspect provenance, test stability, and measure what survives representation changes.

### A3. “How BFL proposes to use this mathematics” section

Connect the apparatus to concrete classes of use:

- mathematical research;
- computational benchmarking;
- scientific instrumentation;
- engineering mathematics;
- education;
- scientific communication;
- interactive publication;
- public engagement;
- reusable research infrastructure.

### A4. FAQ / claim boundary

Add a compact FAQ covering at least:

- Is this new mathematics?
- Is the Hopf object really a Hopf fibration?
- What is the difference between the Hopf specimen and the Hopf-Like Boundary Attractor preset?
- Does Distinction Space make the computation faster?
- Why visualize mathematical objects at all?
- What is established mathematics versus experimental BFL work?

### A5. Short marketing copy library

Preserve reusable short-form copy for:

- homepage teasers;
- Research page modules;
- social posts;
- partner decks;
- funder applications;
- conference/demo descriptions;
- video descriptions;
- press / outreach language.

Candidate compact statements:

> **See the mathematics. Change the mathematics. Inspect what survives.**

> **We are interested in what happens when mathematics stops being only something you write down and becomes something you can operate.**

> **Boundary First Labs turns difficult mathematical structures into inspectable computational objects.**

---

## 5. Workstream B — Computational Benchmark Suite

Create a formal benchmark suite that compares the same mathematical object under multiple representation strategies.

### B1. Required implementations per specimen

For each benchmark specimen, implement or identify:

1. **Classical-direct** — the best reasonable analytic / explicit implementation.
2. **Classical-generic or dense** — a reasonable general numerical representation where applicable.
3. **Boundary First / Distinction Space** — the executable representation constructed through explicit distinctions, relations, paths, boundaries, admissibility rules, and projections.

Do not compare Distinction Space only against an intentionally poor classical implementation.

### B2. Initial benchmark specimens

Use an ascending ladder of representational difficulty.

#### Control 1 — Tesseract / n-cube

Stress:

- finite combinatorics;
- dimensional growth;
- projection;
- slicing;
- partial materialization;
- local update behavior.

Important control result: complete n-cube output itself grows exponentially. Distinction Space should not be presented as eliminating the cost of output that is explicitly requested.

#### Control 2 — Clifford-family geometry

Stress:

- smooth continuous parameterization;
- representation size;
- sampling;
- projection changes;
- local versus full recomputation.

A direct classical parameterization may already be optimal in asymptotic rendering cost. That is a useful control outcome.

#### Control 3 — Hopf fibration

Stress:

- base / fiber / total-space structure;
- projection;
- path preservation;
- compositional provenance;
- sparse fiber selection.

Expected classical-direct baseline is approximately linear in requested fiber samples. A Big-O tie is acceptable and informative.

#### Control 4 — Lp / norm-ball family

Stress:

- parameterized families of geometry;
- continuous morphing;
- boundary change;
- representation reuse;
- incremental update behavior.

#### Stress Control — Calabi-Yau specimen

First define a precise bounded specimen rather than benchmarking the phrase “render a Calabi-Yau.”

The manifest must specify:

- defining equations;
- coordinate patch;
- slice / section;
- projection;
- resolution / tolerance;
- requested observable.

This is the first likely place to test whether admissibility-driven or sparse traversal avoids unnecessary ambient-state materialization.

#### Dynamic Control — Boundary Attractor

Stress:

- time evolution;
- bounded numerical integration;
- persistence;
- local change;
- history / replay cost;
- telemetry;
- operator substitution.

Keep its current prototype status explicit.

### B3. Metrics

For every specimen and implementation, record:

- analytic time complexity;
- analytic space complexity;
- wall-clock runtime;
- peak memory;
- mathematical states evaluated;
- output vertices / primitives emitted;
- intermediate representation size;
- incremental-update cost;
- projection-change cost;
- numerical / invariant error;
- provenance recoverability;
- browser frame time / interactive latency.

Add two Boundary First-specific ratios:

### Work amplification

`rho_work = states_evaluated / visible_or_admissible_states_required`

This asks how much computation was performed that did not survive to the requested observation.

### Representation amplification

`rho_representation = materialized_intermediate_state / final_observational_state`

This asks how much representation had to be constructed merely to produce the requested result.

These ratios should remain provisional until their exact definitions and units are stabilized.

---

## 6. Workstream C — Specimen Registry and Shared Interface

Turn the current collection of mathematical visualizations into a typed specimen family rather than independent demos.

### C1. Create a specimen manifest/schema

Each specimen should declare at least:

- `id`;
- `title`;
- `status`;
- established / experimental classification;
- mathematical definition or source;
- construction function / operator chain;
- parameters;
- admissible parameter bounds;
- projection(s);
- observables;
- known invariants;
- claim boundary;
- benchmark implementations available;
- provenance source;
- renderer;
- recommended public explanation.

### C2. Normalize existing objects

Move or wrap existing implementations behind the shared specimen interface:

- Hopf;
- Tesseract;
- Clifford;
- Lp morph;
- Boundary Attractor;
- recovered Calabi-Yau specimen.

### C3. Preserve mathematical provenance

A rendered point, curve, face, or state should remain traceable where practical through:

`source distinction -> construction -> transform -> projection -> visual primitive`

Do not duplicate full provenance metadata onto every rendered primitive when shared graph structure can preserve it more efficiently.

---

## 7. Workstream D — Sandbox Productization

The current sandbox is a strong first instrument. Extend it carefully into a reusable visual mathematics workbench.

### D1. Specimen selector

Allow the instrument to load canonical and experimental specimens through the same chassis.

The selector should make mathematical status visible at first contact:

- established control;
- established object / BFL representation;
- experimental BFL dynamics;
- hypothesis-facing prototype.

### D2. Open the Hood

For each specimen expose:

- equations / formal definition;
- construction sequence;
- numerical method if any;
- projection;
- parameters;
- runtime / memory metrics;
- current representation path;
- sources;
- claim status.

### D3. Benchmark mode

Add a comparison mode for:

`classical-direct <-> classical-generic <-> Distinction Space`

Display the measurements required by Workstream B without turning the default public experience into a dashboard wall.

### D4. Representation morphing

Where mathematically lawful, let a visitor move continuously between representations rather than switching between unrelated images.

Examples:

`base -> fiber -> total space -> projection`

`4D object -> 3D projection -> 2D screen`

`state -> boundary relation -> admissibility -> observable`

### D5. Capture / share

A saved run should preserve enough state to reproduce the observation:

- specimen;
- implementation;
- parameters;
- seed where relevant;
- projection;
- camera;
- frame / time;
- source revision;
- benchmark measurements;
- claim status.

---

## 8. Workstream E — Publication and White-Paper Suite

### E1. Program brief

Create an umbrella artifact:

**Executable Visual Mathematics — Program Brief**

Purpose:

- define the program;
- explain why BFL is building it;
- explain the relationship among Visual Mathematics, Distinction Space, Schemathematics, and Boundary Theory;
- establish the benchmark program;
- identify applications without overclaiming them.

### E2. White paper

Working title:

**Executable Visual Mathematics: From Mathematical Representation to Computational Instrument**

Core thesis:

> What becomes computationally possible when the representation preserves the distinctions, boundaries, transformations, and paths that matter to the requested observation?

The white paper should explicitly define the five acceptable benchmark outcomes:

- no advantage;
- constant-factor advantage;
- representation advantage;
- incremental advantage;
- asymptotic advantage.

### E3. Benchmark methods paper / technical report

Produce a methods artifact before interpreting benchmark results.

It should freeze:

- specimen definitions;
- implementation rules;
- hardware/runtime environment;
- metrics;
- tolerances;
- sampling rules;
- fairness criteria;
- statistical treatment;
- artifact / run manifest format.

### E4. Per-specimen technical notes

Create compact technical notes for:

- Tesseract / n-cube;
- Clifford;
- Hopf;
- Lp family;
- Calabi-Yau bounded specimen;
- Boundary Attractor.

Each should describe both the mathematics and why the specimen exists in the benchmark suite.

---

## 9. Workstream F — Application and Market Bridge

Do not jump directly from a mathematical visualizer to unsupported claims of industry transformation.

Instead define the reusable computational capabilities first, then test domains against them.

### Candidate capability classes

- constrained state spaces;
- changing boundaries;
- admissible / inadmissible transitions;
- path-dependent state;
- projection between representations;
- local versus global information;
- sparse observations;
- incremental recomputation;
- recursive / compositional structure;
- provenance-preserving transformation.

### Candidate application domains

Treat these as hypotheses / exploration targets, not validated markets:

- geometry processing;
- scientific simulation;
- optimization;
- control systems;
- signal processing;
- computational physics;
- topology / manifold computation;
- engineering design;
- technical education;
- interactive scientific publishing;
- machine reasoning / structured AI systems.

For each domain, ask:

1. What is the existing representation?
2. What is computationally expensive about it?
3. What observation is actually required?
4. Which distinctions must be preserved?
5. What information can be forgotten admissibly?
6. What does the best conventional method already do?
7. Does the Boundary First representation provide a measurable advantage?

---

## 10. Workstream G — Partner, Funder, and Market Materials

Create a lightweight materials stack that can be reused for outreach.

### G1. Partner brief

Explain:

- what is already built;
- what is established mathematics;
- what is experimental;
- what the benchmark program will test;
- why executable mathematical artifacts matter;
- what a partner could contribute or evaluate.

### G2. Funding narrative

Position the program as research infrastructure rather than a collection of images.

The strongest fundable unit is the conjunction of:

- original mathematical research;
- executable representation;
- reproducible experiment infrastructure;
- benchmark discipline;
- public-facing scientific communication;
- a reusable path from research artifact to interactive publication.

### G3. Demo script

Create a 3–5 minute demo path:

1. show live Hopf object on homepage;
2. open sandbox;
3. manipulate a known mathematical specimen;
4. expose provenance / construction;
5. compare two representations;
6. show benchmark measurements;
7. switch to Boundary Attractor as an experimental native object;
8. close on the generalization thesis.

The demo should allow the apparatus to prove the proposition instead of requiring a long verbal explanation first.

---

## 11. Workstream H — Research and Communication Discipline

Every public artifact must preserve a visible separation among:

### Definition

What the executable system literally computes.

### Observation

What appears or is measured in a specified run.

### Hypothesis

What may generalize beyond observed runs.

### Result

What has been established by appropriate mathematical or empirical support.

Additional rules:

- a striking image is never itself evidence of a theorem;
- a BFL interpretation of established mathematics must not be presented as replacing the established mathematics;
- dense classical baselines must not be used to manufacture a misleading performance win when a better standard method exists;
- negative results and classical baseline wins must remain publishable outcomes;
- benchmark tolerances and requested observables must be fixed before performance claims are made;
- renderer effects must remain distinguishable from mathematical structure.

---

## 12. Proposed Delivery Sequence

### Phase 0 — Capture and normalize

- [ ] Freeze this work plan.
- [ ] Create the Visual Mathematics specimen registry/schema.
- [ ] Inventory current Hopf, Tesseract, Clifford, Lp, Boundary Attractor, and Calabi-Yau implementations.
- [ ] Identify which implementation is authoritative for each specimen.
- [ ] Record current claim status and provenance for each object.

### Phase 1 — Public context

- [ ] Add sandbox introduction / hero copy.
- [ ] Add “Why this exists” and “How BFL will use it” sections.
- [ ] Add FAQ / claim-boundary content.
- [ ] Create reusable marketing-copy snippets.
- [ ] Establish a stable Visual Mathematics program page or equivalent public context surface.

### Phase 2 — Benchmark harness

- [ ] Define benchmark schema and run manifest.
- [ ] Implement runtime / memory / state-count instrumentation.
- [ ] Define work amplification and representation amplification precisely.
- [ ] Implement Classical-direct, Classical-generic, and DS modes where applicable.
- [ ] Run the first Tesseract / Clifford / Hopf controls.
- [ ] Publish negative or tie results without qualification pressure.

### Phase 3 — Higher-dimensional stress tests

- [ ] Normalize Lp family benchmark.
- [ ] Select and freeze one bounded Calabi-Yau specimen.
- [ ] Build classical and DS comparison implementations.
- [ ] Measure sparse/admissibility traversal versus ambient materialization where meaningful.
- [ ] Add projection / representation morphing tests.

### Phase 4 — Dynamic and incremental tests

- [ ] Integrate Boundary Attractor into the specimen/benchmark interface.
- [ ] Add local-change / incremental recomputation experiments.
- [ ] Compare replay/history/materialization strategies.
- [ ] Add operator-substitution experiment support.

### Phase 5 — Publication package

- [ ] Write `Executable Visual Mathematics — Program Brief`.
- [ ] Write the umbrella white paper.
- [ ] Publish benchmark methodology before benchmark conclusions.
- [ ] Produce per-specimen technical notes.
- [ ] Attach reproducibility manifests and source revisions to promoted outputs.

### Phase 6 — Market and partner validation

- [ ] Produce partner brief.
- [ ] Produce funder narrative.
- [ ] Produce 3–5 minute demo script.
- [ ] Identify 3–5 concrete partner / adopter classes.
- [ ] Run conversations focused on actual pain / opportunity, not abstract enthusiasm.
- [ ] Record which use cases generate willingness to fund, adopt, publish with, teach with, or integrate the apparatus.

---

## 13. Acceptance Criteria

This next stage is successful when:

- a new visitor can understand the sandbox proposition without prior Boundary Theory context;
- canonical controls and experimental BFL objects are visibly distinguished;
- each specimen has an inspectable mathematical definition / construction path;
- the same object can be viewed through multiple lawful projections or representations;
- benchmark comparisons use fair conventional baselines;
- performance claims name the exact observable, tolerance, and implementation compared;
- provenance survives from mathematical source to rendered output;
- negative results remain first-class outcomes;
- public copy can explain why the work matters without claiming that visualization is proof;
- partner/funder material explains a reusable computational platform rather than selling individual pretty images;
- at least one benchmark demonstrates clearly whether the relevant advantage is runtime, memory, representation size, sparse evaluation, incremental recomputation, provenance, or no advantage at all.

---

## 14. Immediate Next Actions

The next bounded implementation pass should do these in order:

1. **Create the specimen registry** for Hopf, Tesseract, Clifford, Lp Morph, Boundary Attractor, and a placeholder Calabi-Yau specimen.
2. **Write the benchmark protocol** before running comparative claims.
3. **Add public context around the existing sandbox** using the program thesis and FAQ above.
4. **Expose one canonical specimen inside the full instrument** in addition to Boundary Attractor, ideally Hopf because the classical direct implementation is already understood and provides a strong calibration control.
5. **Instrument runtime, representation size, and state counts.**
6. **Run the first honest benchmark** and allow a tie / classical win to stand.
7. **Write the umbrella Program Brief and white-paper draft** after the benchmark contract is stable.
8. **Build the partner/funder demo around the actual executable evidence.**

The desired end state is not a larger gallery.

It is a coherent public mathematical apparatus in which a visitor, engineer, researcher, student, or partner can move from:

`wonder -> operation -> inspection -> comparison -> evidence -> application`

without the mathematics losing its boundaries along the way.
