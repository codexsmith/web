# Atlas Map / List View Decision

**Status:** Implemented  
**Date:** 2026-08-10  
**Routes:** `/map`, `/map/refined`, `/domains`, `/relations`

## Decision

`/map/refined` is the traditional, non-graph **List view** of the Research Atlas. `/map` remains the interactive **Map view**.

“Refined Atlas” is retired as a public-facing label. The URL remains stable for compatibility.

## Overlap finding

The two Atlas routes use the same graph context. The current corpus contains 29 graph nodes: one institutional identity node and 28 public domain records across five architecture stages.

The List view is therefore a complete alternate projection for **domain-record coverage**. It is not a complete functional replacement for the interactive map:

| Capability | Map view | List view |
|---|---:|---:|
| All 28 public domain records | Yes | Yes |
| Readable record links | Yes | Yes |
| Architecture-stage organization | Spatial / contextual | Explicit staged list |
| Search and stage filtering | Indirect | Primary interaction |
| Typed topology and spatial relations | Yes | No |
| Semantic lenses | Yes | No |
| Facet focus and relation inspection | Yes | Direct handoff to Map view |

This makes the views parallel rather than competing: List view answers “what records exist and where do they sit?” Map view answers “how is this record related, and what changes under another lens?”

## Stitching contract

- Both routes expose the same **Map view / List view** control.
- A selected map node opens highlighted in the corresponding List view stage.
- Every list card opens either the readable domain record or a focused graph view.
- Domain records preserve their List-view return path.
- “View in map” opens the focused node rather than resetting to the global Atlas.
- `/domains` remains the broader Research domain-architecture route; it reuses the same indexed component but does not replace the Atlas view switch.

## Evidence integration

- `/map/refined?filter=evidence&stage=evidence` is the canonical public-record and evidence-list destination.
- The Record lenses navigation appears immediately after Atlas provenance on that view.
- Work is the primary evidence content: 142 generated records across 29 domain groups, expanded by default inside one collapsible surface.
- Evidence, Lineage, Governance, and Collaboration lenses continue into `/relations` without removing their existing inventories.
- Generic “Open relation index” calls to action are removed because Work is available in context.

## Public language

- **Map view:** interactive topology, semantic lenses, facets, and relation context.
- **List view:** complete, staged, searchable, non-graph index of the same governed public records.
- **Record index:** text-first Evidence, Lineage, Governance, and Collaboration inventories; Work is surfaced directly in the Atlas Evidence view.

No view changes a record's authority, evidence, maturity, or provenance.
