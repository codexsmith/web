# Third-Layer Detail Surface Contract

## Purpose

Boundary First UX does not treat deeper object detail as a reason to leave the bounded world.

The public site previously had two competing third-layer behaviors:

1. retained-record links could escape the Boundary Frame into a standalone product/publication landing renderer;
2. inspection links could open a modal-style window over the current object.

Both behaviors split one object into a primary BFUX identity and a secondary interface world.

## Invariant

> Object detail is a deeper representation of the current bounded object, not a new site and not a modal window.

A detail surface may replace the current main-content representation temporarily, but it does not create another graph object merely because more information is visible.

## Detail kinds

### Inspection

Inspection is a through-view into evidence, retained notes, source references, or diagnostic findings attached to the focused object.

Inspection:

- stays inside the main content viewport;
- keeps the Boundary Frame available;
- does not use `aria-modal`;
- does not create a backdrop;
- does not append a traversal-history object;
- returns to the same focused object.

Search remains different. Search is a global traversal instrument and may continue to use an overlay because its function is to select another object rather than deepen the current one.

### Retained record

A retained record is a richer public representation already attached to a canonical graph object.

When a manifest-backed landing record has a canonical owner in the content graph:

- the canonical object path remains the identity-bearing route;
- the record is addressed with `?detail=record:<record-id>`;
- legacy/top-level landing aliases redirect to that canonical detail route;
- the Boundary Frame remains the containing world;
- the record surface provides an explicit return to the canonical object representation;
- record detail does not become a fourth World/Evidence/Process projection.

This preserves the distinction between **projection** (how the same object is viewed) and **detail** (how deeply the current representation is opened).

## Canonical ownership

A retained record has one canonical graph owner. Multiple objects may point to the same public record, but a relation to a record is not permission to re-parent it according to whichever link happens to be traversed.

Ownership is resolved from existing declarations in descending strength:

1. **Publication provenance** — a publication whose `sourceRef` explicitly names the manifest file owns that public method/standard record.
2. **Semantic identity** — a graph node whose ID equals the retained-record ID owns the matching product/research record.
3. **Unique explicit record link** — when exactly one node points to the landing alias, that link may establish ownership.
4. **Unresolved ambiguity** — if several candidates remain after these rules, no owner is invented merely to eliminate a standalone page.

Cross-context links traverse to the canonical owner. They do not make the retained record appear as detail belonging to the linking context. This matters for records such as Software Before Code: Boundary First Engineering can point to the method, while the publication object remains the identity-bearing public record because it declares the retained JSON as its source.

## Raw-content migration

A raw JSON-shaped or generic landing renderer is not the target representation.

P4 establishes:

- `Agency & Representation Audit` as a purpose-built diagnostic/workflow record;
- `Software Before Code` as a purpose-built engineering-method record;
- a structured generic fallback for other owned retained records so they no longer render as unbounded raw pages while specialized projections are developed.

The generic fallback is transitional. High-value records should progressively receive domain-specific BFUX compositions rather than accumulating one universal template.

## Responsive law

Third-layer detail must project responsively inside the same bounded viewport:

- wide: instrument/workbench composition with multiple simultaneous fields;
- medium: stacked banks and reduced cross-axis density;
- narrow: single reading flow with the same headings, state, source, and return semantics.

Do not miniaturize desktop panels until they become unreadable.

## Accessibility

- inspection detail is ordinary document/main content, not a modal dialog;
- the focused object remains legible in the surrounding frame;
- return controls have explicit text, not icon-only semantics;
- structured records use headings, lists, and table roles where appropriate;
- forced-colors mode removes decorative material effects without removing hierarchy.

## Acceptance tests

A third-layer migration is correct when:

1. opening an inspection does not create a backdrop or modal dialog;
2. opening a retained record keeps the Boundary Frame visible;
3. a legacy landing alias redirects to the canonical graph owner when one exists;
4. another object linking the same record traverses to that canonical owner rather than re-parenting the record;
5. returning from detail restores the same canonical object rather than navigating to a guessed parent;
6. World/Evidence/Process semantics remain unchanged;
7. record detail does not add traversal history as though it were a separate object;
8. raw record data is projected into semantic sections rather than exposed as an undifferentiated data dump.
