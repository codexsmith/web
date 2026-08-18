# Implementation Roadmap

## Delivery doctrine

- Build vertical slices, not isolated mock screens.
- Keep the semantic kernel and binding protocol ahead of renderer-specific work.
- Validate interaction hypotheses before expanding visual scope.
- Use Corpus Forge to manage the development corpus, contradictions, tests, and releases.

## Phase 0 — Stabilize the specification

**Outputs**

- product glossary;
- canonical module inventory;
- core object and status schema;
- initial transition/gate rules;
- one sample inquiry corpus;
- binding-file v0.1 draft;
- design-token inventory derived from the concept boards.

**Exit condition**

The sample inquiry can be represented without relying on any one UI mockup.

## Phase 1 — Foundation and 2D vertical slice

**Build**

- semantic kernel;
- provenance and event log;
- policy/gate service;
- binding parser and validator;
- simple component registry;
- accessible list projection;
- public institutional front door;
- minimum Atlas cluster view;
- minimum Corpus Forge job view.

**Demonstration**

One sample inquiry appears in the public site, Atlas, and workbench from the same state.

**Do not include yet**

- full 3D rooms;
- autonomous promotion;
- large agent hierarchy;
- generalized no-code builder.

## Phase 2 — Corpus Forge closure loop

**Build**

- complete Forge stages;
- artifact cards;
- source anchors;
- contradiction ledger;
- repair branches;
- critic report;
- human promotion gate;
- publication candidate export;
- negative-result page.

**Exit condition**

A real bounded research item can move from source intake through criticism to approved public artifact with complete provenance.

## Phase 3 — Binding Protocol Studio

**Build**

- schema family detection;
- desired-outcome selection;
- workflow templates;
- visual field-to-component mapping;
- derived and conditional bindings;
- preview fixtures;
- validation report;
- exportable binding package.

**Exit condition**

The Atlas and Workbench sample interfaces can be regenerated from their binding profiles without manual layout rewrites.

## Phase 4 — Scientific Method Lens

**Build**

- familiar method ring;
- expanded Forge lifecycle;
- research-state graph;
- method-profile schema;
- correspondence panel;
- defect localization;
- repair and closure states.

**Exit condition**

A scientist can begin in familiar language and inspect the fuller lifecycle without duplicate or divergent state.

## Phase 5 — Single-room spatial prototype

**Environment**

- Central Workbench only;
- limited artifact vocabulary;
- camera orbit/pan/zoom;
- inspector panel;
- direct transition to list/workbench mode;
- binding-driven object placement and appearance.

**Purpose**

Test whether spatial arrangement improves orientation and relation comprehension before constructing a full world.

## Phase 6 — Spatial pointer experiment

**Conditions**

1. nearest-surface ray cast;
2. ray cast plus disambiguation menu;
3. volumetric candidate field with progressive closure.

**Measures**

- selection errors;
- task completion time;
- nested target access;
- recovery time;
- confidence;
- cognitive workload;
- learnability;
- visual fatigue.

**Gate**

Do not promote the pointer as an improvement unless it produces measurable benefits for defined tasks.

## Phase 7 — RTS operational view

**Build**

- strategic program map;
- minimap;
- work queues;
- alerts;
- saved contexts/control groups;
- multi-scale selection;
- agent assignment visibility;
- replay/history.

**Exit condition**

A user can identify blocked work, trace the cause, assign a bounded next action, and observe the resulting state transition.

## Phase 8 — Full spatial environment

Add rooms incrementally:

1. Threshold;
2. Instrument Gallery;
3. Correspondence Hall;
4. Experiment Chamber;
5. Repair Forge;
6. Review Chamber;
7. Archive;
8. Observatory / Atlas.

Each room requires:

- semantic purpose;
- object vocabulary;
- admissible actions;
- access policy;
- transition rules;
- dense-workbench equivalent;
- accessibility equivalent;
- user test.

## Technical workstreams

### Data and state

- typed object store;
- event sourcing or equivalent immutable audit history;
- graph relation layer;
- full-text and semantic search;
- version and branch model.

### Rules and governance

- policy evaluation;
- roles and authority;
- claim promotion state machine;
- disclosure handling;
- review and critic interfaces.

### Binding runtime

- schema adapters;
- semantic mapper;
- component registry;
- workflow engine;
- validation engine;
- renderer adapters.

### 2D client

- public web;
- Atlas;
- workbench;
- Binding Studio;
- review/publication.

### Spatial client

- likely WebGL/WebGPU-capable renderer after the 2D core closes;
- shared state and component semantics;
- performance and accessibility fallback.

### Quality and observability

- interaction analytics with privacy boundaries;
- reproducible fixtures;
- screenshot and state regression tests;
- binding validation;
- accessibility tests;
- provenance integrity checks.

## Suggested repository layout

```text
boundary-first-platform/
├── schemas/
├── protocols/
├── bindings/
├── components/
├── workflows/
├── policies/
├── sample-data/
├── apps/
│   ├── public-site/
│   ├── atlas/
│   ├── corpus-forge/
│   ├── binding-studio/
│   └── spatial-lab/
├── packages/
│   ├── semantic-kernel/
│   ├── governance-engine/
│   ├── binding-runtime/
│   ├── atlas-renderer/
│   ├── ui-components/
│   └── spatial-components/
├── tests/
├── research/
│   └── spatial-pointer/
└── docs/
```
