# Local section navigation contract

Boundary First UX distinguishes traversal between content objects from movement among coordinates inside one content object.

## Two coordinate systems

### Object traversal

Object traversal changes the focused content object. It may change the URL, traversal history, containment relation, peer relation, or typed cross-tree relation.

### Local section movement

Local section movement keeps the same content object in focus. It changes only the visitor's position inside that object's current World representation.

Therefore a local-section jump must not:

- append a traversal-history entry,
- change the focused node,
- pretend a section is a child content object,
- change projection,
- manufacture a new URL topology, or
- alter evidence or publication standing.

## Declaration

Objects opt into local section navigation through the canonical local-section registry. A declaration supplies:

- a stable semantic key,
- the rendered section id,
- a human label, and
- an optional accessibility label.

The content registry attaches those declarations to the content node. The boundary frame does not contain node-specific section knowledge.

## Renderer contract

A renderer for an object with local sections must render elements whose ids match the declared section ids. Sections should share a scroll context when the representation uses an internal scrolling surface.

The frame:

1. reads the focused node's declared local sections,
2. resolves the rendered section elements,
3. finds their shared scroll container when one exists,
4. observes the visitor's position,
5. marks the active local coordinate, and
6. scrolls to a requested coordinate without changing object focus.

Reduced-motion preferences are honored when a local-section jump occurs.

## First migrated object

`public-interest` declares:

- Overview,
- Augusta Civic Infrastructure, and
- Supporting context.

These are the same existing sections that were previously hard-coded into `BoundaryFrame`. The migration changes their source of authority, not their visual or content hierarchy.

## BFUX invariant

> Local position is a coordinate within an object, not another object merely because it can be navigated to.

This preserves the distinction between containment topology and within-representation position while allowing any future multi-section World renderer to reuse the same frame mechanism.
