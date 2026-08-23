# Design invariants surfaced by the traversal / apparatus pass

This document records the durable Boundary First UX laws surfaced by the implementation pass archived in this folder. These are intended to outlive the particular CSS, card geometry, or visual mockups that helped reveal them.

## 1. Navigation is traversal, not address selection

A conventional site map asks: **what destinations exist?**

The Boundary First UX navigation asks:

- **How did I get here?**
- **What transitions are admissible from here?**

A useful abstract navigation state is:

\[
\mathcal N = (\tau, x, A(x))
\]

where:

- `τ` is the realized ordered traversal;
- `x` is the current location;
- `A(x)` is the currently admissible local neighborhood.

The broader traversal model may describe:

\[
A(x)=\{\operatorname{parent}(x)\}\cup\operatorname{siblings}(x)\cup\operatorname{children}(x)
\]

subject to local gates and boundary constraints.

The current **website rail is deliberately stricter than that abstract model**. It projects:

- realized history;
- current focus;
- same-level alternatives.

Parent movement is already represented by the trace and temporal back control. Child movement belongs to the page content. This avoids duplicated controls and competing interaction channels.

## 2. The current node is the boundary between history and possibility

The current item is not merely a highlighted menu choice.

It is the terminal of the path already realized and the origin of the choices that remain possible.

That gives the interface a mechanically meaningful visual grammar:

```text
realized traversal
      │
      ▼
 current focus
      │
      ├─ peer choice
      ├─ peer choice
      └─ peer choice
```

The rail should visually preserve this continuity rather than presenting history and possible moves as unrelated panels.

## 3. History is evidence, not a shortcut menu

A traversal trace records what actually happened.

Therefore:

- history stays ordered;
- old entries remain visible as evidence when useful;
- old entries should not all become arbitrary teleport links;
- the immediately previous state may be replayed as a continuous rewind;
- forward may replay a previously traversed future state after a rewind.

This distinction keeps temporal navigation and hierarchical navigation coherent.

## 4. Structural movement and temporal replay are different operations

**Back / Forward** answer: “what state did I occupy before / after this one in my actual traversal?”

Structural navigation answers: “what local transition is currently allowed?”

These are not synonyms.

In particular, a structural move to a parent is not conceptually identical to pressing Back. The current website avoids the ambiguity by not duplicating parent/up in the rail; the trace itself preserves the ancestry of the walk.

## 5. Search is an explicit context change

Search is valuable precisely because it can find nonlocal material. That makes it different from ordinary bounded traversal.

A search selection should therefore be treated as a new context / re-rooting operation rather than silently inserted into the trace as though the user had walked there through local edges.

If future UX allows nonlocal jumps elsewhere, they should likewise be visibly marked as a mode or context transition.

## 6. The rail and page have separate responsibilities

The final simplified website division is:

### Rail

- realized traversal;
- current focus;
- same-level alternatives.

### Page

- the meaning of the current object;
- contained children;
- deeper actions / transitions;
- evidence and contextual disclosures.

This eliminates the earlier duplication where child/down actions appeared both in navigation and in the content itself.

## 7. Do not display the internal model when interaction can embody it

The Boundary Tree / Trace / Sibling experiment was useful because it separated implementation concepts. It failed as final UX because it required users to understand those concepts independently.

The lesson is not “never model these separately.” The software should maintain whatever distinctions are needed internally.

The UX should expose the **single continuous object the user acts through**.

Likewise, explanatory labels should be removed when the spatial and interaction structure already makes their role legible. The current rail retains `Traversal` and removes repeated prose such as:

- “Where you have been”;
- “Where you can go next”;
- “Where you have been · nearby choices.”

## 8. Continuity is a constraint, not decoration

The purpose of the traversal rail is not merely to make navigation look connected.

It constrains interaction so the user cannot casually jump across arbitrary distant parts of the hierarchy. The continuity law reduces disorientation by construction.

This is a general BF-UX principle:

> **A navigation interface is a controlled walk through a bounded state space.**

## 9. Responsive design is projection, not shrinkage

The desktop apparatus and phone reading surface should preserve the same semantic object while projecting it differently.

### Desktop

- spatial relationships can coexist;
- title establishes a horizontal boundary across the top;
- supporting subject context and contained regions can share the row beneath;
- traversal can remain a narrow side instrument.

### Small screen

- title / masthead first;
- deck and immediate context next;
- subsections flow vertically like newspaper stories;
- card chrome is reduced;
- navigation becomes compact supporting furniture.

The goal is invariant preservation across representations, not pixel similarity.

## 10. Structure should consume less space than the work it supports

A persistent apparatus can easily become visually dominant simply because it occupies the full viewport.

The traversal rail therefore follows these spatial laws:

- height follows content until a viewport cap is reached;
- long histories scroll internally and auto-follow recent entries;
- width is deliberately subordinate to the primary workfield;
- hierarchy is represented by one compact spine / alignment column rather than repeated nested indentation;
- scrollbar gutters do not reserve space unless needed.

Current desktop target:

```css
--frame-left: clamp(196px, 15vw, 232px);
```

## 11. Main subject first, contained structure second

A branch page should establish **what the current subject is** before presenting its contained regions.

The desktop branch composition therefore uses:

1. a full-width title / subject heading;
2. supporting At-a-glance context beneath;
3. contained regions alongside that context.

This corrects the earlier layout where the title lived in a narrow vertical column and visually competed with the region field.

## 12. Material and semantic color remain distinct

The current visual grammar is:

> **Metal represents structure. Violet represents agency. Green, amber, blue, and red represent observed system state.**

Material hierarchy:

- Black Iron — chassis / deepest frame;
- Cold Gunmetal — workfield;
- Tool / Worked Steel — contained instruments;
- Machined Silver / Workshop White — readable structure and text.

Violet is not a generic decoration. It marks current focus, operator action, and selected state.

State colors should not be used merely to make a panel visually interesting.

## 13. Wear implies use, not neglect

Texture can communicate a physical instrument, but the surface should remain clean, precise, and operational.

The intended feeling is a maintained workbench / control system, not distressed industrial cosplay.

## 14. Mockups specify grammar, not fictional data

Generated concept images are legitimate sources for:

- hierarchy;
- composition;
- control morphology;
- rhythm;
- icon language;
- material relationships.

They are **not** authorization to invent:

- telemetry;
- counts;
- system health claims;
- buttons without handlers;
- relationships not present in the content model.

The implementation should translate the mockup into truthful semantics.
