# Representational Lab UI Patterns

This directory contains the web implementation chassis for the curated Representational Laboratory Suite.

The chassis is intentionally **smaller than the theory** and **smaller than the experiment runtime**. It standardizes repeated web anatomy without pretending that chess, diagonalization, topology, partial observability, and Distinction Space share one visual world or one domain model.

## Two separate contracts

Future labs should separate two things that are easy to accidentally couple:

1. **Lab definition** — serializable identity and catalog information: ID, version, route, layout, experimental question, description, claim ceiling, status, and supported operations.
2. **Lab implementation** — React state, domain logic, visualization, controls, traces, and other executable behavior.

`RepresentationalLabDefinition` is deliberately free of React nodes and local experiment state. It can therefore be reused later by the Screen Wall, route metadata, registries, telemetry, or a Schemathematics-facing apparatus without importing the executable client component.

Current definitions live in `lab-definitions.ts`. New labs should add a definition before or alongside their implementation.

## Stable shared anatomy

A representational lab normally has five layers:

1. **Identity** — lab code, title, short experimental question.
2. **Claim boundary** — what the fixture demonstrates and what it does not establish.
3. **Operative surface** — the controls, carrier, diagram, board, matrix, or other domain-native object that actually changes execution.
4. **Consequence surface** — status/verdict, output, defect, trace, or comparison produced by the current representation.
5. **Recovery surface** — reset/replay, repair, refinement, or an explanatory hood that keeps the path reconstructable.

The shell owns only the first two plus responsive slot geometry. Reusable primitives may own display semantics such as status tone and trace rendering. The individual lab owns experiment state and mathematical/domain behavior.

## Layout modes

### `control-stage`

Use when the user manipulates a compact set of assumptions/facts/conditions and the consequence appears in a larger stage.

Current family examples: Chess boundary tests, software representation loss, legal claim-regime tests, weather refinement, readiness/closure tests.

```text
[ controls / source representation ] [ consequence / verdict / stage ]
```

### `instrument-inspector`

Use when a dominant executable instrument should stay visually primary while a narrower inspector exposes state, trace, provenance, or formal detail.

Current family examples: Cantor Closure & Defect, Distinction Space.

```text
[            executable instrument            ] [ inspector ]
```

### `comparison`

Use when the experiment depends on keeping two operative representations visible at the same time and comparing what each preserves, forgets, admits, or computes.

Primary future example: Same World, Different Reasoner / Pac-Man.

```text
[ representation A ] [ representation B ]
```

Comparison is a layout contract, not an assertion of equivalence. The experiment must state the comparison contract and preserved distinctions.

## Shared semantic primitives

`RepresentationalLabShell`
: Identity, claim boundary, responsive layout slots, optional metric and footer.

`RepresentationalLabPanel`
: Neutral bounded panel chrome. It does not impose experiment semantics.

`RepresentationalLabStatus`
: Live consequence/status readout with semantic tones (`info`, `change`, `warning`, `defect`, `repair`, `success`).

`RepresentationalLabTrace`
: Ordered reconstructable consequence trace. Events use the shared `RepresentationalLabTraceEvent` contract.

`RepresentationalLabSectionLabel`
: Consistent instrument/inspector labeling.

## Shared operation vocabulary

The definition contract currently admits these operation labels:

`distinguish`, `bound`, `admit`, `represent`, `execute`, `observe`, `stress`, `detect`, `trace`, `repair`, `compare`, `promote`, `reset`.

These are capability/catalog labels, not a universal state machine. A lab should only declare operations it actually exposes or makes materially inspectable.

## What should NOT be abstracted yet

Do not put these into the shared shell merely because two labs currently need them:

- chess move/state logic;
- Cantor diagonal construction;
- graph routing/topology execution;
- Pac-Man world or inference state;
- Distinction Space geometry;
- Schemathematical transformation semantics;
- domain-specific visualization components;
- a universal lab state store;
- a universal graph representation.

Promote a repeated mechanism only after at least two materially different labs demonstrate that the semantics, not just the CSS, are genuinely shared.

## Phase relationship

Phase 1 uses this package as a **curated lab chassis**.

Phase 2 may reveal common Schemathematical operations behind the labs, but that apparatus should compile into or coordinate these interfaces rather than be silently inferred from React component structure.

## Authoring checklist

Before adding a new sandbox:

- add its serializable lab definition;
- choose the closest layout mode;
- write the one-sentence experimental question;
- state the claim boundary;
- identify what the user can change;
- identify what operational consequence changes;
- declare only supported operations;
- emit a trace when reconstructability matters;
- provide reset/replay;
- keep the domain-native visualization local;
- add shared machinery only when cross-lab evidence justifies it.
