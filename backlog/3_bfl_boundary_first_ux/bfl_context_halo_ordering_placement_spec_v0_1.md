# Boundary First Labs Context Halo
## Facet Ordering and Context Placement Specification v0.1

**Status:** implementation-guidance draft  
**Purpose:** produce stable, legible local relation fields without flattening independent relation dimensions into a single score.

## 1. Stable facet identity

Every displayed facet must have a stable local ID. Facets remain parts of the center entity; they do not need to become top-level atlas nodes.

```text
representational-mechanics::rm-boundary-constraint-closure
representational-mechanics::rm-invariant-defect-transport
```

The human-readable label may evolve without breaking saved views, relations, or analytics.

## 2. Authoring relation dimensions

Keep these dimensions independent:

| Dimension | Meaning | Primary visual encoding |
|---|---|---|
| Semantic affinity | How directly the subject concerns the facet | Angle and angular pull |
| Structural distance | How many conceptual or institutional steps separate the entities | Radius band |
| Relationship strength | How load-bearing the relation is | Edge weight |
| Sharedness | How many facets or clusters the entity connects | Edge count and summary |
| Evidence maturity | How established the asserted relationship is | Text, edge annotation, and filters |

No runtime should calculate one hidden “relevance score” and discard these fields.

## 3. Suggested facet-order computation

Treat each facet as a weighted vector over external context entities. A weighted overlap score can suggest adjacency:

\[
S(f_i,f_j)=rac{\sum_n \min(w_{in},w_{jn})}{\sum_n \max(w_{in},w_{jn})}
\]

Seek a circular order that:

1. places highly similar facets near one another;
2. minimizes edge crossings;
3. encourages contiguous domain-family neighborhoods;
4. honors pinned conceptual adjacencies;
5. keeps the closing adjacency between the last and first facet meaningful.

The result is a **suggestion**, not an autonomous rewrite. An editor approves and versions the stable order.

## 4. Pinned adjacency rules for Representational Mechanics

The v0.1 reference order preserves these deliberate adjacencies:

```text
Formal Grammars
→ Pressure, Cycle & Capacity
→ Distinction & Representation
→ Distinction-Space Analysis
→ Boundary, Constraint & Closure
→ Invariant, Defect & Transport
→ Agency, Consequence & Repair
→ Institutional & Economic Representation
→ Operational Grammar Design
→ back to Formal Grammars
```

The circular wrap keeps Operational Grammar Design adjacent to Formal Grammars.

## 5. Context-node angular placement

For a context node with target facets at angles \(	heta_i\) and relation weights \(w_i\), use a weighted circular mean:

\[
	heta=\operatorname{atan2}\left(\sum_i w_i\sin	heta_i,\sum_i w_i\cos	heta_iight)
\]

Then apply a small family-sector regularization so nearby members of Mathematics, Physics, Computation, Engineering, and Public Consequence form readable constellations without overriding facet affinity.

## 6. Radius placement

Use structural distance, not importance:

```text
1  close relation band
2–3 middle relation band
4–5 domain horizon
```

Relationship strength may make an edge heavier, but it must not pull a structurally distant entity into the close band.

## 7. Collision and edge handling

Apply these operations in order:

1. preserve facet order;
2. preserve family order within each horizon sector;
3. increase radius before changing angle;
4. bundle edges by domain family, then split near the target facets;
5. show only high-strength edges by default;
6. reveal the full local bundle on hover or pin;
7. permit an editorial override for bridge entities.

A bridge entity connected to distant facets may use one canonical node plus faint secondary attachment anchors. Do not duplicate clickable identities.

## 8. Semantic zoom

- **Far:** family arc, family label, and relation count.
- **Medium:** subdiscipline labels and strongest relations.
- **Near:** individual entities, relation labels, evidence maturity, and navigation actions.

## 9. Stability and versioning

A context layout should carry:

```text
facetOrderVersion
relationDataVersion
layoutOverrideVersion
paletteVersion
```

New relations may alter density without moving approved facet positions. Major reordering requires an explicit presentation migration.

## 10. Accessibility and interaction

- Hover may preview but never be the only way to access information.
- Keyboard focus performs the same highlight as hover.
- Enter or Space pins a selection.
- Escape clears the most recent pin.
- A screen-reader summary lists the selected facet, related entities, relation types, and strengths.
- Reduced motion uses opacity and immediate position changes rather than animated orbiting.
