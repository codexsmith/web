# Executable Visual Mathematics — Web Program Projection Backlog

**Status:** backlog / implementation projection  
**Captured:** 2026-09-10  
**Repository role:** public website implementation and product projection  
**Upstream research owner:** Boundary First Labs / Boundary First Visual Mathematics  
**Upstream candidate package:** `16_Boundary_First_Visual_Mathematics_Product/02_Executable_Visual_Mathematics/` in `codexsmith/boundary-first-labs`  
**Upstream review:** Boundary First Labs PR #291, `Add Executable Visual Mathematics artifact suite`  
**Related web backlog:** `backlog/21_scientific_visualization_sandboxes/`

---

## Why this backlog item exists

The Distinction Space / Visual Mathematics work began in the web repository as a visual and interaction project. It has now produced enough mathematical, computational, communication, and market structure to require an upstream Boundary First Labs artifact package.

That upstream package is the semantic/research owner. This backlog item translates it back into **website work**.

The web repository should not become a second source of mathematical truth. Its job is to turn the Lab material into legible public surfaces, executable demonstrations, interactive instruments, benchmark views, and partner-facing paths while preserving upstream claim status.

The web proposition is:

> **Mathematics you can operate.**

The supporting program lifecycle is:

`formal object -> executable representation -> computational experiment -> observable -> visualization -> benchmark -> reusable engineering object`

The website should make that lifecycle visible without requiring a visitor to understand Boundary Theory before first contact.

---

## Authority boundary

### The Lab owns

- mathematical definitions and formal claims;
- theorem status;
- Distinction Space / Boundary Theory interpretations;
- canonical specimen definitions;
- benchmark methodology once frozen;
- claim ledgers and promotion history;
- Boundary Attractor research status;
- publication and white-paper source material.

### The web repository owns

- navigation and public information architecture;
- interactive rendering and controls;
- browser-safe computational implementations;
- public explanation and progressive disclosure;
- presentation of benchmark results supplied by or reconciled with the Lab;
- public capture/share UX;
- website copy projections;
- partner/demo journeys;
- accessibility and responsive behavior.

### The web repository must not independently promote

- a visualization into proof;
- an experimental BFL object into established mathematics;
- a benchmark observation into a general complexity theorem;
- `Hopf-Like Braid` into a Hopf-fibration claim;
- a candidate Lab document into canonical public doctrine merely because it has been implemented on the site.

Until Lab PR #291 is merged/promoted, treat that package as **candidate upstream material**. The site may continue to implement already-established surfaces, but new public theory/performance claims should retain candidate/provisional language where they depend on that package.

---

# Current web state

The web repository already demonstrates several pieces of the program.

## Homepage mathematical objects

Current visual language includes live procedural mathematics rather than static decorative assets:

- **Research:** Hopf fibration field;
- **People:** Clifford-family geometry;
- **Products:** tesseract / 4D cube projection;
- **Publications:** Lp / norm-ball morph.

The design principle remains:

> **The fun stuff is fun. The regular stuff is regular.**

Advanced mathematical motion should remain concentrated in places where it communicates research/product identity rather than becoming a global visual skin.

## Distinction Space sandbox

Stable route:

`/sandbox/distinction-space`

The current instrument provides:

- Boundary Attractor exploration;
- input controls;
- specimen chamber;
- run and playback transport;
- telemetry / observables;
- operate / record / explain interaction structure;
- collapsible input and telemetry panels;
- bounded web-native simulation endpoint;
- homepage Research launcher.

This is the first public executable-mathematics instrument, not yet the complete program surface.

---

# Web product thesis

The site should communicate a progression rather than one giant theory claim:

`recognize -> interact -> inspect -> compare -> understand -> investigate`

A useful credibility path is:

1. **Here is mathematics you already recognize.**
2. **Here is our executable representation of it.**
3. **Here is what you can change and inspect.**
4. **Here is how the representation compares with conventional approaches.**
5. **Here is the experimental Boundary First mathematics.**

Canonical mathematical objects therefore do double duty: they are public fascinations and scientific controls.

---

# P0 — Establish the upstream/downstream contract

- [ ] Treat the Lab Executable Visual Mathematics package as the upstream semantic source once merged/promoted.
- [ ] Record the final merged Lab commit / package version in this backlog item when available.
- [ ] Map Lab artifacts to website projection surfaces rather than copying them wholesale.
- [ ] Preserve the existing web conversation capture as design provenance, not mathematical authority.
- [ ] Keep `backlog/21_scientific_visualization_sandboxes/` as the broader interaction/research-experience concept family.
- [ ] Reconcile this item with `EXECUTABLE_VISUAL_MATHEMATICS_WORK_PLAN.md`; implementation work should roll forward here rather than creating a third independent planning surface.

### Lab-to-web projection map

| Lab artifact | Web responsibility |
|---|---|
| `00_STATUS_AND_INDEX.md` | internal status/claim badges and implementation gating |
| `01_PROGRAM_BRIEF.md` | Visual Mathematics / Research public overview |
| `02_WHITE_PAPER_EXECUTABLE_VISUAL_MATHEMATICS.md` | long-form web explainer / publication route / excerpts |
| `03_COMPUTATIONAL_BENCHMARK_SUITE.md` | benchmark instrument requirements and displayed metrics |
| `04_MARKET_AND_APPLICATION_THESIS.md` | partner/funder/demo paths; selective public capability language |
| `05_PUBLIC_COPY_BANK.md` | website copy source bank |
| `06_CONVERSATION_PROVENANCE_2026-09-10.md` | internal design-history reference only |
| `07_WEB_INTEGRATION_HANDOFF.md` | direct implementation contract for this repository |
| `08_SPECIMEN_REGISTRY_DRAFT.md` | website specimen registry projection / typed UI model |

---

# P1 — Contextualize the existing sandbox

The current sandbox is visually strong but still asks the visitor to infer too much of its significance.

## Add public context without burying the instrument

- [ ] Add a concise sandbox introduction above or immediately adjacent to the instrument.
- [ ] Use `BOUNDARY FIRST VISUAL MATHEMATICS` as the program eyebrow where appropriate.
- [ ] Test `Mathematics you can operate.` as the primary headline.
- [ ] Explain that known mathematical objects and experimental BFL objects coexist intentionally.
- [ ] Add a small `WHY THIS EXISTS` / `ABOUT THIS INSTRUMENT` affordance rather than a large wall of text.
- [ ] Make the instrument useful before the visitor opens technical explanation.

## Minimum public explanation

The visitor should be able to learn, in under a minute, that:

- the object is mathematically generated, not a pre-rendered animation;
- parameters change the executable object;
- telemetry is derived from the run rather than being decorative;
- established controls and experimental BFL objects have different claim status;
- the apparatus is intended for research, benchmarking, education, and scientific communication.

## Claim/status UI

- [ ] Introduce a compact specimen status vocabulary such as:
  - `ESTABLISHED CONTROL`
  - `ESTABLISHED OBJECT / BFL REPRESENTATION`
  - `EXPERIMENTAL BFL DYNAMICS`
  - `HYPOTHESIS-FACING PROTOTYPE`
- [ ] Keep claim status visible inside `EXPLAIN` / `OPEN THE HOOD` even if the default view is minimal.
- [ ] Explicitly distinguish the canonical Hopf specimen from the `Hopf-Like Braid` Boundary Attractor regime.

---

# P2 — Turn the sandbox into a specimen workbench

The current Boundary Attractor should become the first specimen loaded by a reusable instrument rather than the permanent definition of the instrument.

## Specimen registry projection

Create a typed web-facing registry derived from the Lab specimen registry.

Candidate fields:

```ts
interface VisualMathSpecimen {
  id: string;
  title: string;
  status: "established-control" | "established-bfl-view" | "experimental" | "prototype";
  family: string;
  definitionSummary: string;
  constructionPath: string[];
  parameters: ParameterDefinition[];
  projections: ProjectionDefinition[];
  observables: ObservableDefinition[];
  invariants?: InvariantDefinition[];
  benchmarkImplementations?: BenchmarkImplementation[];
  claimBoundary: string;
  sourceRef: string;
  renderer: string;
}
```

This is a website projection schema, not a replacement for the Lab registry.

## Initial specimen set

- [ ] Tesseract / generalized n-cube.
- [ ] Clifford-family geometry.
- [ ] Canonical Hopf fibration.
- [ ] Lp / norm-ball family.
- [ ] Precisely bounded Calabi-Yau specimen after the Lab freezes one.
- [ ] Boundary Attractor dynamic system.

## Common instrument behaviors

- [ ] Select specimen without leaving the instrument chassis.
- [ ] Preserve camera / projection controls where semantically compatible.
- [ ] Swap control racks according to specimen parameters.
- [ ] Swap telemetry according to specimen observables.
- [ ] Preserve status / claim vocabulary consistently.
- [ ] Allow a canonical specimen to launch from a homepage fascinator when appropriate.

---

# P3 — OPEN THE HOOD

The public experience should remain phenomenon-first, but the mathematics must be inspectable.

For every specimen, provide a technical layer exposing as applicable:

- [ ] mathematical definition / equations;
- [ ] construction sequence;
- [ ] coordinate system / carrier;
- [ ] projection chain;
- [ ] numerical method;
- [ ] approximation tolerance;
- [ ] parameters and legal ranges;
- [ ] observables;
- [ ] known invariants;
- [ ] renderer-only transforms;
- [ ] source / provenance pointer;
- [ ] current claim status;
- [ ] benchmark implementation identity.

The presentation layer must not make color, bloom, persistence trails, camera transforms, or other renderer effects look like mathematical state variables.

---

# P4 — Build the computational benchmark instrument

The benchmark is not a marketing animation. It is a comparison surface.

## Required comparator classes

Where meaningful, support:

1. **Classical direct** — strongest reasonable explicit/analytic implementation.
2. **Classical generic / dense** — reasonable general numerical representation.
3. **Boundary First / Distinction Space** — the candidate executable representation.

Do not create a Distinction Space win by comparing it only against an intentionally weak dense baseline.

## Initial specimen ladder

### Tesseract / n-cube

Test finite combinatorics, dimensional growth, slicing, partial materialization, and projection.

### Clifford-family geometry

Use as a smooth direct-parameterization control. A Big-O rendering tie is acceptable and useful.

### Hopf fibration

Use as the fiber/base/total-space calibration object. A direct renderer is expected to be approximately linear in the visible fiber samples. The benchmark should therefore look for representation, projection, provenance, sparse selection, or incremental-update differences rather than assume an asymptotic rendering win.

### Lp family

Test reusable parameterized geometry and changing boundaries.

### Calabi-Yau bounded specimen

Do not implement a generic `Calabi-Yau` benchmark until the upstream Lab artifact freezes equations, patch, slice/section, projection, tolerance, and requested observable.

### Boundary Attractor

Use as the dynamic / evolving-state benchmark rather than as an established canonical control.

## Display metrics

- [ ] analytic time complexity;
- [ ] analytic space complexity;
- [ ] wall-clock runtime;
- [ ] peak memory where measurable;
- [ ] states evaluated;
- [ ] visible primitives emitted;
- [ ] intermediate representation size;
- [ ] incremental-update cost;
- [ ] projection-change cost;
- [ ] numerical / invariant error;
- [ ] browser frame time;
- [ ] provenance recoverability / path availability.

## Provisional BFL-specific metrics

### Work amplification

`rho_work = states_evaluated / states_required_by_requested_observation`

### Representation amplification

`rho_representation = materialized_intermediate_state / final_observational_state`

These names and formulas remain provisional until the upstream benchmark method freezes them.

## Result UX

The UI must comfortably display:

- `CLASSICAL WINS`
- `TIE / OUTPUT-BOUND`
- `CONSTANT-FACTOR DIFFERENCE`
- `REPRESENTATION ADVANTAGE`
- `INCREMENTAL ADVANTAGE`
- `SPARSE / OUTPUT-SENSITIVE ADVANTAGE`
- `BOUNDED ASYMPTOTIC ADVANTAGE`

Negative or neutral results are part of the product credibility.

---

# P5 — Representation morphing

Develop continuous or staged views of **one object moving through lawful representations**.

Candidate chains:

`base -> lift -> fiber action -> total-space state -> stereographic projection -> screen`

`4D object -> 3D projection -> 2D screen`

`state -> boundary relation -> admissibility -> observable`

`geometry -> measurement -> waveform -> spectrum`

The goal is not a carousel of unrelated diagrams. The visitor should see:

- what changed;
- what remained invariant;
- what information was forgotten;
- which transform caused the change;
- whether the change is mathematical or merely presentational.

This should become a signature BFL web interaction if the underlying specimen definitions support it cleanly.

---

# P6 — Capture, provenance, and reproducibility

A saved experiment state should be portable and sufficiently descriptive to reconstruct the observation.

- [ ] specimen ID;
- [ ] implementation ID;
- [ ] parameters;
- [ ] seed where applicable;
- [ ] timestep / frame where applicable;
- [ ] projection;
- [ ] camera state where public reproduction requires it;
- [ ] renderer profile/version;
- [ ] source revision;
- [ ] claim status;
- [ ] benchmark measurements when in benchmark mode;
- [ ] deterministic permalink or shareable manifest where practical.

Prefer shared construction/provenance graphs over attaching redundant lineage metadata to every individual visual primitive.

---

# P7 — Program page / Research integration

Create a public context surface above the individual instrument.

Possible information architecture:

`Research -> Visual Mathematics -> Executable Visual Mathematics -> specimen / instrument`

The exact route can be chosen during implementation, but the page should answer:

- What is Executable Visual Mathematics?
- Why is BFL building it?
- What is established versus experimental?
- What can a visitor do today?
- What is the benchmark program testing?
- How might the machinery generalize?
- Where can a technical reader inspect the method / white paper / provenance?

Do not dump the entire Lab white paper onto the front door. Use progressive disclosure and link into deeper material.

---

# P8 — Public copy projections

Project selected material from the Lab copy bank into actual web surfaces.

Candidate phrases to test:

> **Mathematics you can operate.**

> **See the mathematics. Change the mathematics. Inspect what survives.**

> **Boundary First Labs turns difficult mathematical structures into inspectable computational objects.**

> **What if difficult mathematics could be packaged as executable, inspectable, reusable computational objects?**

> **Boundary First Labs is investigating whether mathematics can be engineered this way more generally.**

Do not stack every phrase on one page. Use them at different depths and for different audiences.

## FAQ targets

- [ ] Is this new mathematics?
- [ ] Is the Hopf visualization actually a Hopf fibration?
- [ ] What is the Hopf-Like Braid preset?
- [ ] Does Distinction Space make these calculations faster?
- [ ] Why visualize mathematical objects?
- [ ] What is the difference between a visualization, observation, hypothesis, and result?

---

# P9 — Partner / funder / demo path

The website should support a short path that demonstrates the program before requiring a long verbal explanation.

Suggested 3–5 minute sequence:

1. encounter live Hopf object on homepage;
2. open the Distinction Space / Visual Mathematics instrument;
3. manipulate an established control;
4. open the construction/provenance view;
5. compare implementations or representations;
6. show benchmark metrics;
7. switch to Boundary Attractor as an explicitly experimental native object;
8. close on the generalization thesis and collaboration path.

The website should make it possible to tell the story:

`curiosity -> education -> technical evaluation -> research -> partnership`

without building separate disconnected demo pages for every audience.

---

# P10 — Application bridge

Do not claim industry transformation directly from the mathematical sandbox.

The site may communicate candidate capability classes:

- constrained state spaces;
- changing boundaries;
- admissible / inadmissible transitions;
- path-dependent state;
- projection between representations;
- sparse requested observations;
- local versus global information;
- incremental recomputation;
- recursive / compositional structure;
- provenance-preserving transformation.

Application examples should remain explicitly exploratory until separately validated:

- geometry processing;
- optimization;
- scientific simulation;
- control systems;
- signal processing;
- computational physics;
- topology / manifold computation;
- engineering design;
- technical education;
- interactive scientific publishing;
- structured machine reasoning.

A strong web pattern would show **capability -> candidate domains -> evidence / benchmark status**, rather than presenting a flat list of industries.

---

# Implementation sequence

## Phase 1 — Context and status

- [ ] Upstream-source contract.
- [ ] Sandbox intro.
- [ ] Claim/status vocabulary.
- [ ] FAQ / explain layer.
- [ ] Program-page skeleton.

## Phase 2 — Shared specimen architecture

- [ ] Web specimen registry.
- [ ] Canonical Hopf integration.
- [ ] Clifford integration.
- [ ] Tesseract integration.
- [ ] Lp integration.
- [ ] Boundary Attractor adapter.
- [ ] Calabi-Yau blocked pending bounded upstream specimen.

## Phase 3 — Inspection and provenance

- [ ] Open the Hood.
- [ ] Construction-path viewer.
- [ ] Capture manifest.
- [ ] Reproducible links.
- [ ] Renderer-vs-mathematics separation.

## Phase 4 — Benchmarking

- [ ] Benchmark run schema.
- [ ] Runtime / state-count instrumentation.
- [ ] Strong classical-direct baselines.
- [ ] First Hopf control comparison.
- [ ] First n-cube scaling comparison.
- [ ] Publish neutral/negative results as readily as positive ones.

## Phase 5 — Public program and market bridge

- [ ] Program brief projection.
- [ ] White-paper/publication route.
- [ ] Partner/funder path.
- [ ] Demo mode.
- [ ] Application capability matrix.

---

# Acceptance criteria

This backlog is materially complete when:

- [ ] the website explains the sandbox without requiring prior Boundary Theory knowledge;
- [ ] canonical and experimental mathematical objects share one coherent instrument grammar;
- [ ] every public specimen exposes its status and claim boundary;
- [ ] the canonical Hopf object and Hopf-Like Boundary Attractor cannot be confused by a reasonable visitor;
- [ ] the technical layer exposes the mathematical construction and separates it from renderer effects;
- [ ] benchmark mode compares against a strong conventional baseline and can report a classical win without UX embarrassment;
- [ ] benchmark outputs are traceable to an upstream method/specimen version;
- [ ] saved runs preserve enough provenance for reproduction;
- [ ] a public program page connects the visual experience to BFL's research purpose and possible applications;
- [ ] partner/funder visitors can understand the proposition through the working apparatus rather than only marketing prose;
- [ ] the web repository remains a projection/implementation surface rather than silently becoming mathematical authority.

---

# Non-goals

This item does not authorize:

- promotion of the Lab candidate package;
- theorem claims;
- rewriting upstream Boundary Attractor authority;
- universal Distinction Space performance claims;
- unbounded browser numerical computation;
- implementing every Lab artifact verbatim as a public page;
- turning every BFL page into an instrument-panel aesthetic;
- inventing a Calabi-Yau benchmark before the mathematical specimen is properly bounded.

---

# Source continuity

The earlier web backlog and conversation records remain useful provenance:

- `backlog/21_scientific_visualization_sandboxes/README.md` — broader sandbox philosophy: phenomenon first, representation second, parameters last.
- `backlog/21_scientific_visualization_sandboxes/EXECUTABLE_VISUAL_MATHEMATICS_WORK_PLAN.md` — initial work plan developed before the Lab artifact suite was assembled.
- `backlog/21_scientific_visualization_sandboxes/CONVERSATION_CAPTURE_2026-09-10_EXECUTABLE_VISUAL_MATHEMATICS.md` — reconstructed design / reasoning provenance, including the multi-device conversation caveat.

This file is the **current web implementation backlog projection** of the richer Lab artifact suite. Future website implementation planning should update this file or link bounded child tasks back to it rather than re-copying the Lab documents into the web repository.
