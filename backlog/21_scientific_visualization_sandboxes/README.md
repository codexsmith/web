# Scientific Visualization Sandboxes — Backlog Concept

**Status:** backlog / concept exploration  
**Captured:** 2026-08-24  
**Scope:** Boundary First Labs website interactive research / public-learning surfaces

## Why this exists

Boundary First Labs already has enough mathematical, physical, computational, and visual material to support small interactive instruments rather than only static pages and papers. The near-term opportunity is not to build generic parameter dashboards. It is to create curated, high-impact scientific experiences that let a visitor press a large action such as **SHOW ME SOMETHING COOL** and watch a rigorous mathematical or physical structure unfold.

The core interaction principle is:

> **Phenomenon first. Representation second. Parameters last.**

A visitor should choose a question, event, or transformation. The software should select the representation needed to make it legible. Equations, coordinates, tolerances, numerical parameters, and implementation details remain available behind an **OPEN THE HOOD** layer rather than being the entry point.

This backlog item currently contains two closely related sandbox families:

1. **Physics Sandbox** — relativity, black holes, horizons, gravitational waves, observers, spacetime, quantum states, and representation changes.
2. **Fourier / Distinction Space Spectral Sandbox** — Fourier analysis, sparse and structured spectral problems, boundary-aware decomposition, admissible forgetting, effective distinction dimension, and benchmarked computational experiments.

These should eventually feel like different instruments observing the same underlying object rather than unrelated demos.

---

# 1. Shared UX Model

## Giant curated actions, not knob walls

Avoid opening with sliders, numeric inputs, dropdown forests, or a Mathematica-style control panel.

Good first actions look like:

- **FALL INTO A BLACK HOLE**
- **MAKE TWO BLACK HOLES COLLIDE**
- **CHASE A PHOTON**
- **MAKE A HORIZON**
- **WATCH SPACETIME BEND**
- **SHOW ME WHAT LIGO SAW**
- **FIND THE THING THAT DOESN'T CHANGE**
- **LOSE INFORMATION SAFELY**
- **GIVE FOURIER A NIGHTMARE**
- **MAKE EVERYTHING REPEAT**
- **MAKE FFT WIN**
- **SURPRISE ME**

Each action should launch a deliberately selected, visually strong regime where the mathematics or physics becomes obvious through behavior.

## Three-layer interaction model

### Layer 1 — spectacle

One compelling action and an immediate visual result.

The visitor should be able to understand that *something structurally meaningful happened* without reading equations first.

### Layer 2 — structural narration

During execution, reveal compact statements such as:

- Distinction introduced.
- Boundary formed.
- Invariant preserved.
- Observer changed.
- Causal access contracted.
- Representation lost information here.
- This distinction can be forgotten safely.
- This distinction cannot.
- Defect introduced.
- Repair found.

### Layer 3 — OPEN THE HOOD

Expose the rigorous apparatus:

- equations;
- assumptions;
- coordinate systems;
- numerical method;
- approximation tolerance;
- baseline algorithm;
- raw data;
- error / reconstruction metrics;
- citations and references;
- Boundary Theory / Distinction Space interpretation.

The public-facing experience should be inviting without hiding the mathematical substrate.

---

# 2. Physics Sandbox

The Physics Sandbox should use standard, validated physics as the computational substrate wherever possible. Boundary Theory and Distinction Space should appear as an explicit interpretive or representational layer rather than being silently substituted for established physics.

A useful UI separation is:

**ESTABLISHED PHYSICS**  ↔  **VIEW THROUGH BOUNDARY THEORY**

That distinction protects scientific clarity while still making the BFL structural interpretation visible.

## Candidate flagship experiences

### FALL INTO A BLACK HOLE

Begin far from the object and progressively reveal:

- light bending;
- redshift;
- proper-time separation;
- escape cones;
- null cones;
- causal accessibility;
- horizon crossing;
- observer-dependent views.

Then transform the same event through several representations:

`scene → light rays → causal structure → metric/curvature quantities → observer projection → Boundary/Distinction representation`

The horizon is especially valuable as a visual example of a boundary of admissible causal relation.

### MAKE TWO BLACK HOLES COLLIDE

Show one physical event through multiple lawful projections:

1. orbiting bodies;
2. curvature / geometry;
3. propagating gravitational-wave structure;
4. field / vector / tensor representation;
5. detector strain;
6. waveform;
7. Fourier spectrum;
8. Distinction Space / boundary evolution.

Follow with a large action:

**SHOW ME WHAT LIGO ACTUALLY SAW**

The cinematic geometry collapses into the detector signal. Then let the visitor reconstruct the inference chain backward.

### CHANGE OBSERVERS

Use one relativistic event and move continuously between observers while keeping the invariant interval visible.

Curated regimes can include:

- almost at rest;
- halfway to light speed;
- almost chasing the photon;
- near a strong gravitational field;
- crossing a horizon.

The educational point is not parameter manipulation. It is seeing which quantities change under representation and which do not.

### FIND THE INVARIANT

Render the same physical object or event as:

- spacetime geometry;
- coordinate data;
- causal diagram;
- waveform;
- spectral decomposition;
- graph or relational structure.

Animate the transformations and highlight what survives every representation change.

This can become a signature BFL interaction because the subject is the relationship among representations, not merely the representation itself.

### TURN A DEFECT INTO GEOMETRY

Start with a coherent lattice/network/manifold-like structure, introduce an obstruction, and visualize the resulting transport, curvature, holonomy, frustration, or deformation behavior where mathematically justified.

Clearly distinguish established mathematical correspondences from Boundary Theory generalizations or analogies.

### BUILD IT BACKWARDS

Show a final structure and recursively reconstruct a plausible sequence of distinctions, boundaries, closures, or state transitions that produce it.

This directly demonstrates the recursive-construction perspective that underlies much of the broader BFL research program.

## Additional big-button candidates

- **WATCH GRAVITY TRAVEL**
- **BREAK AN ORBIT**
- **BUILD A WORMHOLE** — only with scientifically careful framing; distinguish mathematical spacetime constructions from physical realizability.
- **SHOW ME A QUANTUM STATE**
- **ROTATE THROUGH HIGHER DIMENSIONS**
- **SHOW ME A TENSOR**
- **SHOW ME SOMETHING WEIRD**

---

# 3. Fourier on Steroids / Distinction Space Spectral Sandbox

Fourier analysis is an ideal public bridge because physicists, mathematicians, and engineers already understand its importance. The BFL opportunity is not to claim a universally faster Fourier transform. For a generic dense input requiring an exact complete transform, the FFT remains the appropriate baseline.

The more interesting research hypothesis is:

> **Can Distinction Space reduce the computational dimension of spectral problems by identifying which distinctions must be preserved for a specified observable?**

## Core concept

For a full invertible transform of arbitrary data, there is no nontrivial safe information discard: the full spectrum retains enough information to reconstruct the input.

The opportunity appears when the required observable is restricted:

- only important frequencies;
- only a region;
- only changes since a previous state;
- only reconstruction within tolerance `epsilon`;
- only invariant or equivalence-class information;
- only boundary-relevant structure.

Define a provisional effective distinction dimension:

`N_eff(x, O, epsilon)`

where `O` is the required observable family and `epsilon` is admissible error.

The practical question becomes whether structured signals admit `N_eff << N`.

## Research regimes worth demonstrating

### HIDE A TINY SPECTRUM IN A HUGE SIGNAL

Compare ordinary FFT with sparse spectral methods and a Distinction-Space representation.

Show:

- total sample count;
- coefficients actually required;
- reconstruction error;
- runtime;
- memory;
- distinctions discarded;
- distinctions retained.

### GIVE FOURIER A NIGHTMARE

Construct sharp discontinuities, boundaries, interfaces, or locally regular regions.

Test whether representing regular interiors separately from boundary structure creates useful compression or factorization.

A promising abstract representation is:

`interior regularity + boundary structure + boundary coupling`

rather than treating every sample as equally informative.

### MAKE EVERYTHING REPEAT

Use repeated or symmetry-related local structures.

Ask whether equivalence detection allows a canonical representative to be transformed once and transported across related regions.

This should be compared against known symmetry-aware, graph-spectral, and structured Fourier techniques rather than presented as automatically novel.

### MOVE ONLY ONE BOUNDARY

Use a large structured state in which only a local interface changes.

Compare full recomputation against incremental / boundary-local recomputation.

This may be one of the strongest practical regimes for a Boundary-aware spectral engine.

### FOURIER ON A WEIRD SPACE

Move away from regular Euclidean grids into graph, relational, or Distinction-Space domains.

Construct a Laplacian-like or other justified operator from the domain structure and visualize its eigenmodes as the spectral basis.

The central question becomes whether Boundary/Distinction structure can expose useful quotient or factorization structure in domains where a universal FFT is unavailable.

### MAKE FFT WIN

Deliberately generate a dense, unstructured, adversarial case where there is no admissible compression.

Display the result clearly:

`N_eff ≈ N`

**FFT wins.**

This is important. The sandbox should behave as an experiment, not a marketing demonstration.

### SURPRISE ME

Generate a structured case, run the competing methods, and search for an interesting outcome:

- most dramatic safe compression;
- strongest symmetry quotient;
- largest structural change with preserved invariant;
- largest repair from smallest defect;
- worst case for Distinction Space;
- best case for FFT;
- unexpected representation equivalence.

## Required benchmark posture

The first implementation should be a benchmark harness, not a new-transform claim.

Compare against appropriate baselines such as:

- FFT;
- sparse Fourier techniques;
- graph/spectral methods;
- multiresolution or wavelet methods where appropriate;
- nonuniform Fourier methods where geometry/sampling warrants them;
- direct computation for bounded reference cases.

Any apparent Distinction-Space gain should be decomposed into:

1. gain already explained by established structured/sparse methods;
2. gain from changed approximation or observable requirements;
3. gain from a genuinely different quotient/factorization rule, if one survives comparison.

---

# 4. Representation Morphing as a Signature Interaction

The most important visual technique should be **continuous representation change** rather than hard cuts between unrelated diagrams.

Examples:

`spacetime geometry → field → detector measurement → waveform → Fourier spectrum → Distinction Space`

`surface → vector field → operator → eigenmodes → observable`

`signal → boundary segmentation → quotient representation → spectral basis → reconstruction`

An object should visibly become its mathematical representation whenever possible.

This is where the sandbox can move beyond a collection of pretty scientific animations: visitors can inspect what changes, what is lost, and what remains invariant as the representation changes.

---

# 5. Visual Inspiration / Reference Study

These references are inspirations for visual grammar and explanatory strategy, not templates to copy.

## Erik Norman

Useful principle: **mathematics as a procedural spatial object**.

Relevant qualities to study:

- mathematical surfaces that move and re-parameterize;
- fields and vector structures treated as visible objects;
- black-hole / gravitational-wave / singularity visualization;
- additional mathematical structure appearing as additional visible behavior;
- procedural geometry rather than static plotting.

## Physics Videos by Eugene Khutoryansky

Useful principle: **equations and physical representations becoming animation**.

Relevant topics include relativity, Minkowski spacetime, black holes, tensors, gravitational effects, Fourier transforms, state-space concepts, and higher-dimensional mathematical visualization.

Study how equations, vectors, geometry, and motion coexist rather than being presented as separate lecture slides.

## 3Blue1Brown

Useful principle: **conceptual construction before abstraction**.

Start from the compelling question, make the mathematical object visually intelligible, and reveal notation only after the viewer has a mental model for what it is doing.

## Combined BFL visual grammar

The desired synthesis is approximately:

- **Erik Norman:** mathematics becomes a spatial/procedural object.
- **Eugene Khutoryansky:** equations and physical structures become animation.
- **3Blue1Brown:** conceptual narrative constructs the abstraction visually.
- **BFL:** the visitor can continuously move between representations and inspect the invariants, boundaries, admissible transformations, information loss, and repair paths connecting them.

---

# 6. Relationship to the BFL Website

These are not intended as isolated Vercel toys long-term. They should become interactive instruments within the Boundary First Labs site and inherit the site's boundary-frame navigation and visual grammar.

Potential website treatment:

- research pages can launch directly into a relevant sandbox state;
- papers can expose interactive companions;
- a sandbox run can link back to the paper, derivation, evidence, or source artifact;
- a visitor can save/share a specific experiment state or trace;
- the same physical or mathematical object can move across multiple instruments;
- eventually, sandbox traces may become saveable artifacts that can be moved into the broader BFL whiteboard/workbench environment.

The sandbox should therefore be designed as a **projection of research artifacts into an interactive instrument**, not as a disconnected microsite.

---

# 7. Initial Implementation Order

## Phase A — visual proof

1. Build one polished Physics Sandbox sequence: **FALL INTO A BLACK HOLE** or **MAKE TWO BLACK HOLES COLLIDE**.
2. Support representation morphing rather than only scene switching.
3. Add **OPEN THE HOOD** with standard-physics equations and assumptions.
4. Add a clearly separate **VIEW THROUGH BOUNDARY THEORY** interpretive layer.

## Phase B — Fourier benchmark instrument

1. Build the benchmark harness around established FFT / structured baselines.
2. Implement **HIDE A TINY SPECTRUM**, **GIVE FOURIER A NIGHTMARE**, and **MAKE FFT WIN**.
3. Display `N`, provisional `N_eff`, runtime, memory, reconstruction error, and retained/discarded structural information.
4. Treat any Distinction-Space advantage as a test result requiring explanation, not a predetermined outcome.

## Phase C — shared scientific workbench

1. Allow the same object/run to open in Physics, Fourier, and Distinction views.
2. Preserve state while changing representations.
3. Add shareable experiment states / traces.
4. Connect experiments to source papers, claim ledgers, derivations, and evidence.
5. Explore export/import into the BFL whiteboard / sandbox environment.

---

# 8. Acceptance Principles

A sandbox experience is on the right track when:

- the first meaningful action does not require domain expertise;
- the visitor can launch a compelling experiment with one obvious control;
- the visual change corresponds to real mathematical/physical structure;
- parameters are available but not required for first contact;
- equations are inspectable rather than decorative;
- established science and BFL interpretation are visibly distinguished;
- alternative representations describe the same underlying state;
- representation changes make preserved invariants and lost information legible;
- negative results and baseline wins are allowed;
- the experience can eventually connect back to BFL papers, datasets, traces, and provenance.

The desired feeling is not **"here is a simulation with knobs."**

It is:

> **"Press this. Watch the mathematics reveal something."**
