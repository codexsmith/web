# Search traversal contract

Boundary First Search is a traversal instrument over the public corpus, not a conventional site-wide text box.

## Contract

Search has three separate responsibilities:

1. **Candidate retrieval** — query text identifies objects whose public representation contains the requested distinction.
2. **Admissibility constraints** — schema-backed facets restrict traversal by object type, declared product/publication stage, typed relation, and Evidence availability.
3. **Match explanation** — every query-driven result names the representation channel that justified the match.

## Searchable representation channels

The current public index distinguishes:

- Identity — label, short label, path, and eyebrow.
- Boundary orientation — the concise World orientation projection.
- Object record — summary and public body content.
- Declared standing — product/service status or publication development state.
- Evidence — current standing, evidence level, claim ceiling, next gate, claims, and source metadata.
- Typed relation — edge type, edge label, direction, and related object identity.
- Inspection record — public inspection summaries, bullets, and source references.
- Standing event — admitted semantic-event search text.

These channels are weighted separately. Identity is strongest; standing, evidence, orientation, and typed relation outrank incidental body prose.

## Facets

Facet values derive from the current public corpus rather than a second hand-maintained taxonomy:

- Object type uses publication identity where applicable and otherwise the node kind.
- Standing / stage uses the declared product/service stage or publication stage.
- Typed relation can require any edge or one specific public edge type.
- Evidence availability uses the same projection-availability test as the Evidence view.

## Boundary First invariants

- A relation match does not pretend the related text belongs to the focal object's own prose.
- A publication stage does not imply research validity.
- Evidence availability does not imply evidence sufficiency.
- Filters constrain which traversals are admissible; they do not rewrite object identity.
- Search results expose why they appeared instead of hiding ranking behind an opaque relevance score.

## Accessibility

The Search dialog traps keyboard focus, closes on Escape, and restores focus to the invoking control when it closes. Result metadata and match reasons remain textual rather than color- or position-only.
