# Task: Prototype Local Topology Mini-Map Navigation

**Status:** backlog / implementation candidate  
**Canonical design home:** `backlog/3_bfl_boundary_first_ux/bfl_local_topology_minimap_navigation_spec_v0_1.md`

## Goal

Prototype the Boundary First UX local-topology mini-map as a first-class website navigation primitive.

The mini-map should unify the site's existing **web / graph** and **onion / nested-boundary** models so the visitor can see:

- the current node;
- the containing boundary / parent context;
- nearby peers and children;
- explicitly modeled bridges;
- the realized traversal path used to arrive here.

The interaction should preserve the established rule:

> **Navigation is graph traversal, not address selection.**

## Core behavior

- center the map on the current page / object;
- use concentric distance bands to show structural depth and containment;
- distinguish containment geometry from traversal-history geometry;
- selecting a node navigates to it and recenters the topology around that node;
- preserve the realized path as a trace rather than duplicating it as another navigation control;
- treat search and other nonlocal jumps as explicit re-rooting rather than local adjacency;
- support the same topology at three scales: **mini-map -> local map -> atlas**.

## Prototype sequence

1. Render current node + containing context + 3-5 local nodes from real navigation data.
2. Overlay realized traversal history.
3. Implement click-to-recenter through actual route transitions.
4. Compare against the current traversal rail for duplicated controls, especially `Contained By` versus history / parent movement.
5. Reuse Context Halo geometry and relation data where possible.
6. Test desktop and compact mobile projections.
7. Decide whether the existing traversal rail should be reduced, merged, or retained.

## Acceptance test

The visitor should be able to answer, primarily from geometry rather than explanatory copy:

- Where am I?
- What contains this?
- What is nearby?
- Where can I lawfully go next?
- How did I get here?

The mini-map should **remove navigation redundancy**, not add another competing site-map widget.

## Reference

See the full design and data-contract note:

`backlog/3_bfl_boundary_first_ux/bfl_local_topology_minimap_navigation_spec_v0_1.md`
