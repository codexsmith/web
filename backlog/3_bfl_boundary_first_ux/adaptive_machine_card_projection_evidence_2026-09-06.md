# Adaptive Machine Card Projection — Quick Evidence Snapshot

**Date:** 2026-09-06  
**Status:** sufficient evidence to proceed with consolidation implementation

This is intentionally a short snapshot. Git history preserves the full sequence of visual experiments and selector changes.

## Evidence by responsibility

| Responsibility | Current evidence | Conclusion |
|---|---|---|
| Topology | `mobile-machine-card-flow.css`, `mobile-machine-full-flow.css` | Core and Full have stable semantic ordering independent of internal card morphology. |
| Geometry projection | `mobile-machine-card-scale.css` plus the ultra-small card refinements | The same node needs different lawful forms at different allocated widths; viewport width alone is insufficient. |
| Apparatus context | `mobile-machine-structure.css` | Opening Relations materially changes the card's available inline size and therefore its lawful representation. |
| Attention | `mobile-machine-structure-aligned.css` | Fisheye disclosure is a separate axis from geometric compression. |
| Relation routing | `MobileMachineStructureLayer.tsx` + aligned CSS | Pipe coordinates, offscreen continuation, lane routing, and shared-hub ports legitimately require measured geometry. |
| Semantics | `lab-machine-model.ts` | Identity, boundary, kind, state, metadata, tone, and canonical edges already have one source of truth. |

## Stable observations

1. Non-hub cards do not need explanatory boundary copy once they become compact controls.
2. A horizontal `icon | eyebrow/title` control is the useful middle representation when enough inline space exists.
3. At narrow allocated widths, icon hardware should disappear before text is compressed into illegibility; `eyebrow + title` is the stable Plate representation.
4. Tour needs an explicit short visual identity (`Tour`) while retaining its full accessible identity.
5. Research is exceptional because hub semantics require visual dominance and a usable multi-port attachment field even after content compression.
6. Governance is semantically subordinate in the machine overview and should not expand into another full work surface merely because width is available.
7. Container geometry should own ordinary card morphology; JavaScript should remain limited to attention, pipe geometry, collision-aware routing, and interaction state.

## Implementation decision

Proceed directly with the first consolidation slice:

- annotate stable card facets in the DOM;
- make physical machine cards inline-size query containers;
- establish shared `Control -> Plate -> Micro` projection behavior from actual card width;
- retain a hub-specific Research policy;
- retain existing topology and relation-routing implementations;
- do not delete the accumulated responsive CSS until the new layer has visual parity.

No additional static study is required before this slice. The current screenshots and branch history are the validation corpus.