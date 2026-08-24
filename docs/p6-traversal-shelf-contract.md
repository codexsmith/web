# P6 · Traversal Shelf Contract

The traversal projection must not become a second global navigation bar.

## Semantic ownership

The top frame already owns traversal transport:

- Back
- Forward
- Home

The compact or shallow horizontal shelf therefore owns only local orientation:

1. **Containing boundary** — where the current object is contained.
2. **Current focus** — the object presently being viewed.
3. **Adjacent choices** — peer objects reachable without changing containment depth.

Traversal history is not repeated inside the horizontal shelf. Repeating it consumes scarce vertical space and duplicates the meaning of the top-frame Back/Forward controls.

## Geometry

A horizontal traversal shelf is a single row.

It must not render a separate `TRAVERSAL` title/header row above the controls.

The default compact/shallow shelf budget is 48px. The world/detail surface begins immediately below:

`top = frame top + traversal shelf`

The current focus receives the strongest visual standing. Parent and adjacent choices remain subordinate controls.

## Responsive law

The shelf representation is used in either of two conditions:

- compact width (`<= 980px`), or
- wide-but-shallow viewport (`> 980px` and `<= 560px` high).

A wide-but-shallow screen is vertically constrained even if it has desktop width. Preserving the full left apparatus there wastes the scarce axis and creates the same failure as a mobile layout that refuses to recompose.

## Compact morphology

- history nodes are hidden because Back/Forward already provide traversal transport;
- the `TRAVERSAL` apparatus header is hidden;
- parent, current, and peer controls occupy one horizontal flow;
- parent/current/peer controls use short single-line labels;
- secondary prose such as `parent boundary` or `Focus · You are here` is removed from the shelf;
- the row may horizontally scroll when peer count exceeds available width;
- the document itself must not horizontally overflow.

## BFUX rule

> **Do not duplicate a relation merely because another renderer previously used it. In a compact projection, each frame region must own one distinct navigational meaning.**

The top frame answers **where have I traversed?**

The shelf answers **where am I locally, what contains me, and what is adjacent?**

## Acceptance criteria

The traversal shelf is acceptable only if:

1. no visible `TRAVERSAL` header consumes a separate row;
2. no history node is repeated inside the shelf;
3. Back/Forward remain available in the top frame when traversal history exists;
4. parent, current, and adjacent choices occupy one row;
5. the shelf height is no more than 50px in the compact/shallow projection;
6. the world/detail surface begins immediately below the shelf;
7. shallow landscape uses the same single-row law even above the normal width breakpoint;
8. horizontal overflow remains internal to the shelf, never the document;
9. current focus remains visually dominant over parent and peers;
10. ordinary tall desktop retains the full vertical traversal apparatus.
