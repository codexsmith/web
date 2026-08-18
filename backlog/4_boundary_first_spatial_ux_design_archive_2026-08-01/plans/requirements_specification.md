# Product Requirements Specification

## 1. Product family

- Boundary First Labs public environment
- Atlas
- Corpus Forge Workbench
- Binding Protocol Studio
- Scientific Method Lens
- Spatial Research Environment
- Boundary-Aware Spatial Pointer
- RTS Research Operations View

## 2. Product principles

The system shall:

1. meet users through recognizable roles, objects, and practices;
2. preserve one canonical semantic state across projections;
3. distinguish sources, inference, claims, tests, results, and promotion;
4. expose uncertainty, contradiction, and negative results;
5. require explicit authority for consequential transitions;
6. provide direct efficient workflows alongside immersive views;
7. remain inspectable and exportable without hidden agent memory;
8. allow closure to be purpose-bounded and lawfully reopened.

## 3. Core functional requirements

### FR-001 — Canonical object identity

Every durable object shall have:

- stable identifier;
- object type;
- version;
- provenance;
- creation and modification history;
- current status;
- disclosure class;
- owning or accountable actor;
- dependency and relation links.

### FR-002 — Claim representation

Every claim shall support:

- exact text or formal expression;
- claim class;
- evidence class;
- claim ceiling;
- operating domain;
- assumptions;
- supporting sources and results;
- counterevidence and contradictions;
- maturity;
- review status;
- permitted public wording;
- reopening or falsification conditions.

### FR-003 — Durable workflow state

Each job or inquiry shall preserve:

- purpose;
- included and excluded sources;
- current phase;
- completed transitions;
- generated artifacts;
- failures and deviations;
- repair history;
- next lawful actions;
- required gates.

### FR-004 — Projection independence

The system shall be able to render the same object state in:

- public article/card form;
- Atlas node/graph form;
- dense workbench panel form;
- Scientific Method Lens;
- review packet;
- publication layout;
- spatial artifact form.

No projection may silently mutate canonical state.

### FR-005 — Binding protocol

A binding profile shall define:

- source schema and semantic mapping;
- workflow profile;
- view regions and components;
- object-to-component bindings;
- interaction rules;
- visibility and role conditions;
- validation constraints;
- fallback behavior;
- 2D and optional spatial representation;
- export metadata.

### FR-006 — Adaptive entrance

The public experience shall offer recognizable paths including at least:

- systems/software;
- building/engineering;
- research/science;
- policy/institutions;
- physics/cosmology/mathematics;
- learning/exploration.

Each path shall lead into the same underlying Lab and Atlas, not a forked content silo.

### FR-007 — Atlas behavior

The Atlas shall provide:

- calm cluster-first overview;
- zoom and pan;
- persistent selected-node context;
- guided camera paths;
- minimap;
- search;
- breadcrumbs;
- deeper typed-edge views;
- claim and artifact status within node details;
- stable browser/history behavior.

### FR-008 — Corpus Forge workflow

The workbench shall support:

```text
Collect → Slag → Compression → Bloom → Folding → Tempering → Review Packet
```

It shall retain source anchors through every transformation and separate original material, paraphrase, inference, and external verification.

### FR-009 — Critic independence

The critic shall not silently edit the work it evaluates. Critic findings shall be separate durable artifacts with severity, evidence, repair requirement, and verdict.

### FR-010 — Human promotion

Canonical promotion, public release, restricted-material handling, destructive changes, and claim elevation shall require explicit human authority according to policy.

### FR-011 — Scientific Method Lens

The system shall synchronize:

- Familiar View;
- Expanded Forge View;
- Research-State View.

Selecting a familiar scientific step shall reveal the underlying Forge phases and artifacts that implement it.

### FR-012 — Negative-result preservation

A negative result shall remain searchable and connected to:

- tested hypothesis or route;
- method and conditions;
- observed failure;
- affected claims;
- resulting constraint;
- next possible work.

### FR-013 — Spatial environment

Every spatial room, object, boundary, environmental effect, and transition shall bind to actual semantic state or workflow behavior. Decorative objects may exist but may not impersonate operational status.

### FR-014 — Spatial pointer

The pointer shall support:

- candidate exposure before commitment;
- geometric and semantic depth;
- local-frame binding;
- visible admissibility;
- preview of proposed target and action;
- explicit ambiguity handling;
- cancellation and recovery;
- alternate non-spatial control.

### FR-015 — RTS overview

The strategic view shall support:

- multiple scales;
- active and blocked work;
- queues;
- alerts;
- saved research contexts;
- minimap/Atlas relation;
- bounded group operations;
- visible authority and promotion gates.

It shall not use points, artificial scarcity, fake deadlines, or conquest metaphors as default incentives.

## 4. Nonfunctional requirements

### NFR-001 — Traceability

A user must be able to traverse from any public claim to its source, method, result, review, and promotion history when access permits.

### NFR-002 — Performance

- Initial public page usable within ordinary web-performance expectations.
- Atlas overview remains interactive at the intended corpus scale through clustering and progressive loading.
- Dense workbench actions provide immediate visual acknowledgment.
- Spatial mode shall offer scalable quality settings and a non-3D fallback.

### NFR-003 — Accessibility

All consequential functions must be available through:

- keyboard;
- screen-reader semantics;
- high-contrast mode;
- reduced-motion mode;
- text/list projection;
- direct search and command palette.

### NFR-004 — Reproducibility

Every exportable job shall support a package containing:

- manifest;
- source inventory;
- bindings;
- transformations;
- versions;
- outputs;
- checksums;
- review and promotion state.

### NFR-005 — Security and disclosure

The system shall enforce object-level and action-level access boundaries. Restricted status shall affect data access, display, search, export, and agent permissions.

### NFR-006 — Explainability

When an action is unavailable or a target is deprioritized, the user shall be able to inspect the relevant rule, permission, ambiguity, or missing requirement.

### NFR-007 — Portability

Core schemas and bindings should use documented, human-readable formats where practical. The archive must remain interpretable independently of a single proprietary interface.

## 5. Acceptance scenarios

### Scenario A — Publish a failed fine-structure-constant route

A user can publish the tested construction as a negative result, showing assumptions, computation, instability under perturbation, and the resulting constraint without presenting it as a derivation.

### Scenario B — Atlas path from learner to theory

A learner enters through a familiar on-ramp, follows a guided path, opens Distinction Space, and reaches the full Atlas without losing path state.

### Scenario C — Repair a contradicted claim

A claim gains a contradiction. The user can inspect both sources, create a repair branch, preserve the prior claim, run critic review, and promote a bounded replacement only after approval.

### Scenario D — Generate a workbench from a schema

A user supplies a claims graph schema, selects “Living Workbench,” maps fields through the Binding Studio, previews the result, resolves missing mappings, and exports a versioned binding file.

### Scenario E — Spatially select an occluded artifact

In a dense workbench scene, the user probes an overlapping set, changes depth, previews the intended claim, binds to its local frame, and sees only admissible actions. The same operation is available through a list/keyboard fallback.
