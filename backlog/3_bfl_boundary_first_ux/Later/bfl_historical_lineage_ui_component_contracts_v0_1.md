# Historical Lineage UI Component Contracts v0.1

## 1. Lineage Lens

**Purpose:** expose the external foundations, inherited formalisms, neighboring research traditions, critical counterpoints, and shared problems associated with a selected node or pathway.

Required controls:

- `Idea`
- `Foundations`
- `Present Development`
- `Open Lineage Lens`
- `View source / citation status`

The default state remains the present idea. Historical material is available but does not displace the selected work.

## 2. Lineage card

A card must contain:

```text
FOUNDATIONAL FORMALISM
Riemannian Geometry
Bernhard Riemann · 1854

What it established
...

Why it matters here
...

Present use
...

Not claimed
...

Citation: edition verification required
```

Required fields:

- relation type kicker
- work or formalism
- attribution and date
- contribution summary
- local relevance
- present use or comparison
- explicit non-claim
- evidence and citation status

## 3. Context Halo lineage mode

Add `Lineage` to the Halo filter bar:

```text
[ Domains ] [ Work ] [ Evidence ] [ Lineage ]
```

When active:

- historical works appear at the outer horizon;
- lineage edges use dotted or fine-dashed strokes;
- current logical dependencies remain visually distinct;
- hovering a work highlights the facets it informs or challenges;
- the relation card states whether the link is foundational, methodological, critical, neighboring, or comparative;
- no historical node is placed visually above the current node as an implied authority.

## 4. Introductory-scene strip

```text
┌──────────────────────────────────────────────────────┐
│ DISTINCTION SPACE                                    │
│ [The Idea] [Foundations] [Present Development]       │
├──────────────────────────────────────────────────────┤
│ Riemannian geometry · topology · operator theory     │
│ spectral and noncommutative geometry                 │
│                                                      │
│ Foundations and comparison obligations—not claims   │
│ of equivalence, endorsement, or validation.          │
│                                  [Explore lineage]   │
└──────────────────────────────────────────────────────┘
```

Limit inline cards to four. Use a summary trail plus `Explore lineage` for larger sets.

## 5. Node tabs

Required order:

```text
Overview · Facets · Research · Work · Evidence · Lineage · History
```

`Lineage` is external intellectual inheritance. `History` is internal corpus development.

## 6. Search and cards

Lineage search results must use the kicker `FOUNDATION`, `FORMALISM`, `METHOD`, `PRECEDENT`, `CRITICAL COUNTERPOINT`, or `NEIGHBORING LINEAGE`; never show a historical name as though it were a canonical Boundary First node.

## 7. Accessibility

- Never encode relation class through line style alone; provide text.
- All hover states must be keyboard-focusable and pinnable.
- Screen-reader summaries must say the target, relation class, contribution, and non-claim.
- Dates and names must be ordinary text, not text embedded only in graphics.
- Reduced motion uses opacity and cuts rather than animated historical timelines.

## 8. Mobile

On mobile, lineage becomes a vertical sequence of grouped cards:

```text
FOUNDATIONS
Geometry and structured space (4)
Operators and spectra (3)
Critical comparisons (2)
```

Each group expands as an accordion. The global non-claim remains visible at the top of the sheet.
