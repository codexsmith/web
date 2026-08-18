# Modular Feature Catalog

## Priority definitions

- **P0:** foundational; required before dependent modules can close.
- **P1:** first public/product vertical slice.
- **P2:** expansion after the core loop is reliable.
- **P3:** advanced or research-intensive.

| ID | Module | Priority | User value | MVP | Primary dependencies |
|---|---|---:|---|---|---|
| F-001 | Semantic research kernel | P0 | One coherent research state across products | Core schemas, relations, statuses, versions | None |
| F-002 | Transition and governance engine | P0 | Prevents unlawful or silent state changes | State machine, roles, gates, audit events | F-001 |
| F-003 | Binding-file protocol | P0 | Separates data, semantics, workflow, and presentation | Parse, validate, version, and apply one binding profile | F-001, F-002 |
| F-004 | Shared design tokens and component semantics | P0 | Consistency across public, workbench, and spatial UI | Status tokens, object types, icons, typography, interaction states | F-001 |
| F-010 | Adaptive public front door | P1 | Meets visitors where they are | Six role cards and adaptive institutional narrative | F-004 |
| F-011 | Institutional architecture pages | P1 | Makes the Lab legible before the theory | The Lab, Work, Corpus Forge, Explore | F-010 |
| F-012 | Responsible publication cards | P1 | Makes unfinished and negative work publishable responsibly | Artifact class, outcome, claim ceiling, history | F-001, F-002, F-004 |
| F-020 | Atlas cluster overview | P1 | Calm, explorable map | Bubble clusters, zoom, inspector, minimap | F-001, F-003, F-004 |
| F-021 | Guided camera paths | P1 | Teaches the legend before revealing the whole graph | Canonical path and progress rail | F-020 |
| F-022 | Deep typed-edge graph | P2 | Shows explicit relationships at depth | Edge types, filters, breadcrumbs | F-020 |
| F-030 | Corpus Forge job intake | P1 | Starts bounded work cleanly | Job purpose, source boundary, claim ceiling, disclosure | F-001, F-002 |
| F-031 | Forge pipeline board | P1 | Makes transformation stages visible | Collect through Review Packet | F-030 |
| F-032 | Artifact cards and provenance inspector | P1 | Makes sources and claims operable | Cards, anchors, dependencies, status | F-001, F-031 |
| F-033 | Ledgers, critic, and promotion gate | P1 | Connects synthesis to accountable consequence | Ledgers, critic report, human gate | F-002, F-032 |
| F-034 | Branch/diff and repair workflow | P2 | Preserves failed and superseded states | Branch comparison, repair records, affected dependencies | F-033 |
| F-040 | Binding Studio schema intake | P1 | Begins data-independent interface construction | Schema families and desired outcomes | F-003 |
| F-041 | Workflow template library | P1 | Reuses proven mappings and layouts | Atlas, Workbench, Review, Form, Explorer templates | F-040 |
| F-042 | Visual binding canvas | P1 | Maps fields to components and behaviors | Drag/connect, derived fields, conditions | F-040, F-041 |
| F-043 | Live preview and validation | P1 | Catches mapping defects before export | Preview, missing/ambiguous warnings, fixtures | F-042 |
| F-044 | Binding artifact export | P1 | Produces durable portable UI specs | YAML/JSON binding file, component map, view schema | F-043 |
| F-050 | Scientific Method Lens | P1 | Connects familiar scientific practice to the fuller cycle | Familiar, Expanded, State views | F-001, F-003, F-031 |
| F-051 | Method-profile library | P2 | Supports different inquiry families without fragmenting the system | Empirical, computational, mathematical, literature, engineering, policy | F-050 |
| F-052 | Correspondence and defect localization | P2 | Makes mismatch productive | Expected/observed comparison and repair target | F-050, F-034 |
| F-060 | Spatial Central Workbench | P2 | Makes artifacts and relations inhabitable | One room, artifacts, camera, inspector | F-003, F-032 |
| F-061 | Full spatial room system | P3 | Spatializes the complete research lifecycle | Nine rooms and transitions | F-060 |
| F-062 | Environmental epistemic state | P3 | Communicates status through stability, light, tension, barriers | Visual state rules | F-061, F-002 |
| F-070 | Boundary-aware spatial pointer | P2 research | Improves 3D target resolution with depth and admissibility | Orient, Probe, Bind, Act | F-060 |
| F-071 | Boundary selection / group operation | P3 research | Operates on meaningful sets rather than screen rectangles | Volumetric and semantic group selection | F-070 |
| F-072 | Nested semantic-depth traversal | P3 research | Traverses publication-to-source depth without mode breaks | Containment and scale navigation | F-070, F-001 |
| F-080 | RTS strategic overview | P2 | Makes programs, queues, and blockage visible | Minimap, alerts, queues, zoom levels | F-020, F-031 |
| F-081 | Saved control groups and research contexts | P2 | Rapidly revisits artifact sets and workflows | Named groups, filters, focus state | F-080 |
| F-082 | Agent assignment and activity fields | P3 | Makes delegated work visible without anthropomorphic theater | Assignments, boundaries, touched artifacts, proposed deltas | F-033, F-080 |
| F-090 | Accessibility projection | P0/P1 | Keeps all functions usable without spatial or visual dependence | Keyboard, list mode, reduced motion, screen-reader structure | All surfaces |
| F-091 | Search and command palette | P1 | Fast direct navigation across every projection | Search, actions, recent context | F-001 |
| F-092 | Export, archive, and reproducibility package | P1 | Preserves design and research state durably | Manifests, checksums, release package | F-002, F-044 |

## Recommended MVP bundle

The smallest coherent product bundle is:

```text
F-001 + F-002 + F-003 + F-004
+ F-010 + F-012
+ F-020 + F-021
+ F-030 + F-031 + F-032 + F-033
+ F-040 + F-042 + F-043 + F-044
+ F-050
+ F-090 + F-091 + F-092
```

The spatial environment, pointer, and RTS layer should then be added as independent experiments over this working foundation rather than as prerequisites for launch.
