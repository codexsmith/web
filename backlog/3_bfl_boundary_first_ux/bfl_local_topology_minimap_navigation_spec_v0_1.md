# Boundary First Labs Local Topology Mini-Map
## Navigation Specification v0.1

**Status:** backlog design note / implementation candidate  
**Date:** 2026-08-26  
**Scope:** persistent orientation, local graph traversal, containment legibility, traversal history, and semantic zoom

## 1. Core proposition

The Boundary First Labs website should be treated as both:

- a **web / graph of related content**, and
- an **onion of nested boundaries / contained systems**.

Those are not competing metaphors. They describe two projections of the same underlying topology.

The proposed navigation primitive is a **local topology mini-map**: a compact radial/concentric view centered on the page the visitor is currently viewing.

> **The page is the current node. The frame is its boundary. The mini-map is its local topology. Navigation is movement through distinction space.**

This gives the earlier concentric-node visualization a concrete UI responsibility rather than leaving it as an illustrative graph.

## 2. Current node is the center

The mini-map should not permanently center Boundary First Labs or the site root. It should center the visitor's **current object**.

When a visitor moves from one object to another, the map recenters around the destination and recomputes the visible neighborhood.

This makes navigation feel like moving the instrument / microscope through a structured space rather than loading unrelated documents.

Conceptual form:

```text
                   related
              o             o

         peer                   child
          o                       o

               +-------------+
               |      *      |
               |  CURRENT    |
               |    NODE     |
               +-------------+

          o                       o
         peer                   child

              o             o
                   parent
```

The exact layout may be circular rather than orthogonal; the invariant is that **current focus occupies the center of the local projection**.

## 3. Concentric rings carry boundary meaning

The rings must not be decoration. They encode structural relationships.

Suggested interpretation:

```text
center      current object
ring 1      immediate local neighborhood / same working boundary
ring 2      containing system or domain
ring 3      broader domain horizon / bridges
outside     nonlocal context requiring re-rooting or explicit search
```

This is compatible with the existing Context Halo rule that radius represents **structural distance, not importance**.

Relationship strength may affect edge weight, emphasis, or label treatment, but it should not collapse structural distance.

## 4. Containment and history are different geometries

A major benefit of the mini-map is that it can remove duplicated navigation controls.

The current traversal UI has exposed a recurring problem: a `Contained By` control often points to the same place as the latest parent-like entry in traversal history. Both may be semantically valid, but two controls performing effectively the same navigation action create UI redundancy.

The mini-map separates the concepts mechanically:

- **Containment = spatial topology.**
- **History = traversal topology.**

The parent or containing system can be represented by an enclosing ring, outer anchor, or boundary label rather than another rectangular `Contained By` button.

The realized visitor path can be drawn as a faint trace through previously occupied nodes.

```text
Boundary First
      \
       Theory
          \
           Representational Mechanics
                     \
                      Current Page *
```

The trace may use the site's existing wear / history language: repeated traversal can deepen or strengthen the path without changing the underlying topology.

## 5. Navigation operations become spatially legible

The local topology map gives existing navigation verbs concrete geometric meaning:

| Operation | Spatial meaning |
|---|---|
| **Zoom in** | descend into a child / contained boundary |
| **Zoom out** | move toward a containing system |
| **Pan / across** | move laterally among peers or adjacent nodes |
| **Bridge / jump** | traverse an explicitly modeled cross-domain relation |
| **Back / forward** | replay the realized traversal trace |
| **Search** | explicit re-rooting / context replacement |

This preserves the established traversal invariant:

> **Navigation is graph traversal, not address selection.**

Search and other nonlocal transitions should remain visibly different from ordinary local movement so the interface does not disguise teleportation as adjacency.

## 6. Clicking a node recenters the topology

The strongest interaction rule is simple:

> **Selecting a navigable node recenters the mini-map on that node.**

Example:

1. visitor is on `Representational Mechanics`;
2. `Recursive Systems` appears as an admissible related node;
3. visitor selects it;
4. page navigation occurs;
5. `Recursive Systems` moves to the center;
6. rings, local neighbors, containment, and history are recomputed around the new center;
7. the realized edge remains visible in the traversal trace.

This should be treated as a topology transition, not merely a link activation.

## 7. One topology, three projections

The same navigation object should support at least three scales.

### A. Mini-map

Persistent supporting furniture in the Boundary Frame.

Possible characteristics:

- approximately 100-160 px when space permits;
- current node clearly marked;
- only strongest / most useful nearby nodes visible;
- one or two meaningful boundary rings;
- faint realized traversal trace;
- minimal or abbreviated labels;
- tap/click expands the representation.

### B. Local map

Expanded view of the current neighborhood.

Adds:

- readable node labels;
- parent / child / peer distinctions;
- relationship labels where useful;
- stronger visibility of the traversal trace;
- more of the Context Halo relation field;
- explicit semantic zoom and focus controls.

### C. Atlas

Fuller site / corpus topology for deliberate exploration.

The Atlas may expose larger graph regions, cross-domain bridges, filters, provenance, evidence maturity, or research topology.

The key invariant is:

> **Mini-map -> local map -> atlas are projections of one topology, not three unrelated navigation systems.**

This makes the website itself an example of Representational Mechanics: representation changes with available space and task while the underlying object and relations remain invariant.

## 8. Relationship to the Context Halo

The existing Context Halo machinery is a natural geometric substrate for this primitive.

Reuse these rules where possible:

- angle can encode semantic affinity / family pull;
- radius encodes structural distance;
- edge weight encodes relationship strength;
- sharedness remains distinct from strength;
- evidence maturity remains metadata rather than being collapsed into relevance;
- collision handling should increase radius before perturbing stable angular identity;
- bridge entities should retain one canonical clickable identity;
- semantic zoom should progressively reveal family, subdiscipline, entity, relation, and navigation detail.

The mini-map is therefore not a replacement for the Context Halo. It is the **navigation projection of the same local-topology machinery**.

## 9. Relationship to the traversal rail

This proposal should be evaluated as a possible evolution or compression of the existing traversal apparatus, not as an additional competing navigation widget.

The current traversal work already establishes useful responsibilities:

- realized history is evidence;
- current focus terminates that realized path;
- nearby choices should be admissible from the current boundary;
- children are entered through meaningful content rather than exposed as a generic site tree;
- search is an explicit context change.

The mini-map can preserve those invariants while replacing some textual duplication with geometry.

Possible long-term division of responsibility:

- **Boundary Frame:** persistent orientation and apparatus controls;
- **Mini-map:** current boundary + local topology + traversal trace;
- **Page content:** substantive child regions, actions, and representations;
- **Back / forward:** temporal replay;
- **Search:** nonlocal re-rooting.

The goal is not to expose more navigation. The goal is to make the navigation relationships already present **mechanically legible with fewer duplicate controls**.

## 10. Responsive projection

The mini-map must change projection rather than merely shrink.

### Desktop / wide apparatus

- persistent mini-map may sit in the Boundary Frame or traversal furniture;
- enough space for two rings and several labeled or glyph-bearing nodes;
- expansion can occur in place or into a dedicated local-map surface.

### Narrow / mobile

- preserve the current-node mark and immediate orientation first;
- reduce visible nodes before reducing touch target size;
- use a compact map button / small radial field that expands on demand;
- keep all primary actions available without hover;
- prefer immediate position changes under reduced-motion settings.

The mobile projection should preserve the topology semantics even if it cannot preserve the desktop geometry.

## 11. Candidate data contract

A first implementation could derive the mini-map from a small local topology payload rather than loading the full site graph.

```ts
type LocalTopology = {
  current: NodeRef;
  parent?: NodeRef;
  peers: RelationRef[];
  children: RelationRef[];
  bridges: RelationRef[];
  history: NodeRef[];
  structuralDistances: Record<string, number>;
  relationDataVersion?: string;
  layoutVersion?: string;
};
```

The renderer should not invent topology from presentation order. Structural relations must come from explicit content / graph data.

## 12. Design constraints

1. **Do not turn the mini-map into a generic site map.** It is local first.
2. **Do not duplicate clickable identities** merely to show multiple relation types.
3. **Do not encode importance as radius.** Radius is structural distance.
4. **Do not hide necessary navigation behind hover.**
5. **Do not make every relation an edge by default.** Prefer strongest / most useful local structure.
6. **Do not erase traversal history when the map recenters.** Re-centering changes focus, not provenance.
7. **Do not allow arbitrary nonlocal jumps to masquerade as local adjacency.**
8. **Preserve stable node identity across projections.**
9. **Prefer geometry over explanatory labels when geometry can safely carry the meaning.**
10. **Treat motion as explanatory, not decorative.** A recenter transition should clarify what changed.

## 13. Acceptance questions

A useful prototype should answer these questions without requiring the visitor to understand the implementation model:

- Can I tell what object I am currently inside?
- Can I tell what larger system contains it?
- Can I tell what is nearby and lawfully reachable?
- Can I distinguish a peer from a child or bridge?
- Can I see how I arrived here?
- Can I move without losing orientation?
- Does selecting a node make the new local neighborhood understandable?
- Does the representation remain coherent when expanded from mini-map to local map to atlas?
- Does the mini-map eliminate rather than add redundant navigation furniture?

## 14. Suggested prototype sequence

1. Render current node + parent ring + 3-5 local nodes from existing navigation data.
2. Overlay the realized traversal trace.
3. Implement click-to-recenter using actual route transitions.
4. Compare the mini-map against the current textual traversal rail for redundancy and comprehension.
5. Add expansion into the existing Context Halo / local-map representation.
6. Test semantic zoom and mobile projection.
7. Only then evaluate whether the traversal rail should be reduced, merged, or retained alongside the mini-map.

## 15. Working summary

The website's earlier **web** and **onion** concepts can be unified as a navigation primitive:

- the web supplies adjacency and traversal;
- the onion supplies containment and structural depth;
- the traversal trace supplies history / provenance;
- the mini-map supplies persistent local orientation;
- the local map and atlas supply progressively broader projections of the same object.

The result is a navigation system that behaves like a Boundary First instrument rather than a conventional collection of menus and breadcrumbs.
