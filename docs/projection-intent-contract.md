# Projection intent contract

Boundary First UX distinguishes the representation a visitor requests from the representation a particular object can currently render.

## Two projection states

### Projection intent

Projection intent is the visitor's preferred representation: World, Evidence, or Process. It is durable across ordinary object traversal and is serialized in the URL.

### Rendered projection

Rendered projection is the admissible representation for the current focused object. It is derived from:

`rendered projection = normalize(current object, projection intent)`

The rendered projection may temporarily differ from projection intent when the requested representation is unavailable for the focused object.

## Transport behavior

If a visitor is in Evidence and traverses to an object without an Evidence projection:

1. Evidence remains the projection intent.
2. World is rendered as the admissible fallback.
3. The projection-boundary notice names both the requested and rendered projections.
4. The URL retains `view=evidence` rather than being rewritten to World.
5. Traversing onward to an object that supports Evidence automatically restores Evidence.

The fallback therefore changes the current representation without silently changing the visitor's request.

## Explicit override

A visitor may clear retained intent by explicitly selecting another available projection. For example, selecting World while Evidence is temporarily unavailable changes the intent to World, even though World is already the rendered fallback.

Home / entry traversal deliberately resets projection intent to World.

## Browser history and direct URLs

Projection intent is part of browser-visible state. Back/forward navigation restores the intent encoded by the historical URL and then derives the admissible rendered projection for that object.

Direct URLs requesting an unavailable projection are not redirected to a different projection URL. The requested state is preserved and the client renders an explicit fallback.

## BFUX invariants

- Projection failure must not erase projection intent.
- Projection intent must not manufacture a representation that the object does not support.
- A rendered fallback must remain explicit and reversible.
- Restoring a preferred projection changes representation only; it does not change object identity, evidence standing, publication maturity, or graph topology.
- URLs represent the requested view; normalization represents the admissible current view.

> Intent is durable; rendering is admissible.
