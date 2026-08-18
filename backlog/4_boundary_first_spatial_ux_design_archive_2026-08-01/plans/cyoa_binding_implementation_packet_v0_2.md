# CYOA Binding Implementation Packet v0.2

**Date:** 2026-08-02  
**Status:** Draft binding implemented; ready for feature expansion and user-test refinement  
**Route:** `/cyoa/problem`  
**Binding ID:** `bfl-cyoa-adaptive-onramps`  
**Claim ceiling:** Pedagogical on-ramp

## Purpose

This packet promotes the Choose Your Own On-Ramp prototype from component-owned copy into a small binding-driven projection. It is intended to be the first bounded implementation of the binding approach described in `binding_protocol_and_schema_plan.md`.

The problem projection now sits beneath the three-part `/cyoa` threshold. That parent instrument connects People to `/audience`, Problem to `/cyoa/problem`, and Repair to the existing solution introduction at `/`. The triad is governed separately by `src/content/entry-triad.binding.json` so the entrance architecture does not become part of the problem-branch content model.

The implementation does not claim to be the general Binding Protocol. It exercises the minimum useful separation:

```text
Canonical Atlas nodes
        ↓ validated references
Canonical teaching concepts
        ↓ governed CYOA content
Workflow and projection binding
        ↓ renderer adapter
Next.js route projection
```

## Plan coverage

The packet implements a bounded portion of:

- FR-004 — Projection independence;
- FR-005 — Binding protocol;
- FR-006 — Adaptive entrance;
- NFR-003 — Accessibility;
- NFR-006 — Explainability;
- F-003 — Binding-file protocol;
- F-004 — Shared component semantics;
- F-010 — Adaptive public front door;
- F-090 — Accessibility projection.

It does not yet implement canonical state mutation, saved user state, analytics, promotion, a general workflow engine, or a visual Binding Studio.

## Governed artifacts

### Binding artifact

`src/content/cyoa.binding.json`

Contains:

- binding identity, semantic version, status, provenance, and compatibility;
- explicit pedagogical claim ceiling;
- canonical teaching-concept registry;
- six required on-ramp families;
- twelve scene choices;
- canonical node references and destination-node identifiers;
- workflow states and transitions;
- renderer regions and component contracts;
- accessibility and governance constraints;
- declared export targets.

### Published schema

`src/content/schemas/cyoa-binding.schema.json`

Documents the portable JSON contract. Runtime validation is implemented in `src/lib/cyoa/schema.ts` so invalid bindings fail during tests and the production build without adding an external validator dependency.

### Fixtures

`src/content/fixtures/cyoa-binding.fixtures.json`

Provides valid root, on-ramp, and arrival states plus invalid cross-family and over-depth routes. Fixtures are intended for renderer regression, alternate-projection work, and future user-test automation.

## Canonical reference policy

1. Every displayed concept references one or more canonical IDs from `src/content/nodes.json`.
2. Every on-ramp and choice declares its canonical node neighborhood.
3. A choice destination is stored as a canonical node ID, not a handwritten URL.
4. The renderer derives the destination URL through the shared domain-route adapter.
5. A destination must also appear in the choice's canonical node references.
6. Unknown concept or node references fail validation.

The CYOA concept registry is a teaching vocabulary. It does not create new top-level Atlas nodes. A later promotion decision may elevate selected concepts into canonical semantic objects.

## Governance policy

- Every choice requires a metaphor firewall.
- The binding claim ceiling must remain `pedagogical-on-ramp` until reviewed and explicitly promoted.
- Choice data may adapt the route but may not classify the visitor.
- Navigation may not mutate canonical semantic state.
- Consequential destinations must resolve through the canonical node register.
- The binding status remains `draft` until editorial and user validation are complete.

## Extension rules

### Adding a choice

A new choice must include:

- stable ID and route slug;
- familiar scene;
- registered concept references;
- canonical node references;
- lesson and structural move;
- metaphor firewall and formal bridge;
- canonical destination node;
- fixture coverage.

### Adding an on-ramp

A new on-ramp must have a distinct use case not already covered by the six required families, at least two choices, canonical node references, and a test explaining why the new family is required.

### Adding a projection

An alternate renderer should consume the existing binding and declare a new projection ID. It may change layout and component mappings but must preserve IDs, claim ceiling, metaphor firewalls, canonical references, workflow order, and accessible fallbacks.

## Acceptance checks

- Binding shape validates at application import.
- All canonical concept and destination references resolve.
- The six required on-ramps remain present.
- Choices cannot reference unregistered concepts.
- Destinations cannot detach from their declared canonical neighborhood.
- Routes remain unique and statically generable.
- Invalid cross-family paths resolve as not found.
- All interactions retain native-link keyboard behavior and browser history.
- Existing CYOA appearance and route structure remain compatible with v0.1.

## Recommended next feature packet

Build the validation-ready feedback and research layer over this binding:

1. define a privacy-bounded feedback event schema;
2. bind feedback prompts to arrival states without changing semantic content;
3. add a no-storage/local fixture mode first;
4. create a user-test script comparing `/cyoa` and `/audience`;
5. add decision thresholds for merge, coexistence, or retirement;
6. promote the binding from `draft` to `review` only after editorial sign-off.
