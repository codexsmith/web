# Web backlog control register

This file is the status authority for the root `backlog/` workstream namespace.

## Numbering rule

The numeric prefix on a root backlog item is its **current canonical workstream ID**.

Historical documents may still say `Pass 15`, `Pass 16`, `item 20`, and so on. Those labels record when and how the material was created. They are provenance, not a second active numbering system, and should not be rewritten merely to make history look cleaner.

Supporting notes, progress checkpoints, and predecessor specifications belong **inside** their current workstream rather than competing for another root number.

A workstream-local `STATUS.md` is authoritative when an older README preserves stale handoff language for historical reasons.

## Workstreams 15+

| ID | Workstream | Current status | Current job |
| --- | --- | --- | --- |
| 15 | Interaction Memory & Sandbox UX | Open | Transfer schema, `.bflab`, local board, semantic transfer, trails, presence, and participation boundary |
| 16 | Public Site Positioning & Pitch Readiness | Active | Five-minute public understanding, positioning, evidence, action surfaces, and guided intake |
| 17 | Local Topology Mini-map | Open implementation candidate | Local graph / containing-boundary navigation primitive |
| 19 | Apparatus Landing | Prototype landed / integration open | Refine the institutional-instrument entrance and integrate it deliberately |
| 20 | Public Front Door & Projection Consolidation | Active | Curated homepage, flagship work, Paper Mine/Publications consolidation, Timeline/Process/Evidence repair, intake placement, and `Enter the Lab` boundary |
| 21 | Scientific Visualization Sandboxes | Concept / open | Physics and Fourier / Distinction Space interactive instruments |
| 22 | Playground / Satire / Audio / Interactive UX | Partial | Broader playful public projection beyond the already-built Screen Wall prototype |
| 23 | Lab Machine Governed Object Registry | Core implemented / residual hardening | Preserve governed-object identity across projections; see local `STATUS.md` |
| 24 | Screen Wall Catalog | Prototype merged / QA-polish open | Harden `/proto/playground`; implemented design spec retained in the workstream |
| 25 | Bridge Governance + Operations | Active hardening | Core governance/security CI-gated; browser mutation, concurrency, production access verification, and UX polish remain |
| 26 | Fallacies of Distributed Reality | Publication candidate | Develop and publish the public engineering essay |
| 27 | Temporal Observation Vessel BFUX | Concept / design-ready | Prototype a fixed-time, rotatable branching timeline with controlled observability, spatial-memory preservation, and planar accessibility fallback |
| 28 | Representational Laboratory Suite | Backlog / implementation-ready umbrella | Build five curated Representational Mechanics instruments and later reveal their shared Schemathematics apparatus |

## Retired / absorbed root IDs

**18 — Screen Wall design task** was implemented and absorbed into workstream 24. Its original design specification is retained there as `design_spec.md`.

Several previously root-numbered 20/21 artifacts are now supporting material inside workstream 20:

- guided five-minute tour;
- single-page overview / tour map;
- representation / boundary / human stewardship framing.

Bridge progress notes now live with workstream 25 instead of consuming separate root IDs.

The older root-level `20_pacman_representational_sandbox_mvp.md` is a predecessor specification for workstream 28. Preserve its historical content; reconcile its long-term location/ownership when workstream 28 implementation begins rather than maintaining a competing active workstream identity.

There is intentionally no requirement that active IDs be gapless. **Uniqueness and current semantic ownership matter more than cosmetic continuity.**

## Cleanup rules going forward

1. One active root workstream gets one numeric ID.
2. Progress notes and supporting artifacts go inside that workstream.
3. Implemented predecessor specs remain with the successor workstream or under an explicit completed/history surface.
4. Do not leave a historical handoff README as the only source of current status.
5. Do not create a new root item merely because a workstream gains another document.
6. When a later synthesis absorbs an earlier concept, preserve the earlier artifact as supporting provenance and make the successor relationship explicit.
