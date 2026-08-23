# Relation directionality contract

Boundary First UX treats a typed graph edge as one relation with two lawful endpoint projections. The relation does not change when traversal direction changes, but the phrase used to present it often must.

## Contract

For an edge `A -R-> B`:

- the edge type `R` is stable in both directions;
- the declared edge phrase remains preserved as provenance;
- the forward endpoint receives a forward display label;
- the inverse endpoint receives a lawful inverse display label;
- renderers consume the resolved directed relation instead of constructing grammar such as `Incoming · <forward label>`;
- symmetric relations may intentionally use the same phrase in both directions.

The content registry returns directed cross-tree edges with:

- `direction`: `outgoing` or `incoming` relative to the focused object;
- `label`: the resolved phrase for that endpoint;
- `declaredLabel`: the originally declared forward phrase;
- `forwardLabel` and `inverseLabel`: the resolved pair;
- `sourceNode`, `targetNode`, and `node`: stable endpoint identity plus the adjacent traversal target.

## Default inverse vocabulary

| Edge type | Forward | Inverse |
| --- | --- | --- |
| contains | contains | contained by |
| specializes | specializes | specialized by |
| implements | implements | implemented by |
| demonstrates | demonstrates | demonstrated by |
| grounds | grounds | grounded by |
| derived-from | derived from | source for |
| depends-on | depends on | dependency of |
| applies-to | applies to | applied by |
| extends | extends | extended by |
| contrasts-with | contrasts with | contrasts with |
| governs | governs | governed by |
| measures | measures | measured by |
| documents | documents | documented by |
| instantiates | instantiates | instantiated by |

## Edge-specific vocabulary

Some edges carry a more specific public phrase than their broad edge type. Their inverse must preserve that specificity instead of falling back mechanically.

Examples:

- `Augusta Civic Infrastructure -derived-from-> CityWatch`: `informed by` / `informs`.
- `Corpus Forge -depends-on-> Verification & Governance`: `requires` / `required by`.
- `The Bit -instantiates-> Bound Distinction`: `calibrates` / `calibrated by`.
- `Boundary First Weather -demonstrates-> Executable Representation`: `tests transport of` / `transport tested by`.

## Epistemic boundary

Direction-specific wording is representational repair, not a change in evidentiary standing. An inverse label must not strengthen the source relation. When no more specific lawful inverse is declared, the resolver uses the conservative inverse vocabulary associated with the typed edge.
