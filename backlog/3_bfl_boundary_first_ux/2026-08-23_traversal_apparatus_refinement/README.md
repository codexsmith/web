# BF-UX Traversal + Apparatus Refinement — 2026-08-23

**Status:** implemented design pass + design-history archive  
**Website branch:** `feature/v2-spine-integration`  
**Parent implementation state:** `ce04350bad2dd28546a3500754ac3d73a95af2c5`  
**Scope:** Card renderer, traversal apparatus, secondary World composition, small-screen projection, and landing threshold

This folder preserves the August 2026 website pass that moved the public Boundary First Labs site from a dark card interface toward a more coherent **Boundary First UX apparatus**.

The most important result of the pass was not a particular visual treatment. Repeated perturbation of the navigation design exposed a stronger interaction invariant:

> **Navigation is graph traversal, not address selection.**

The navigation surface should answer two questions without offering discontinuous teleportation:

1. Where have I been?
2. What nearby choices are admissible from where I am now?

The website projection settled on an intentionally narrow division of responsibility:

- **Traversal rail:** realized history, current focus, and same-level alternatives.
- **Page content:** children / deeper contained regions and actions.
- **Back / Forward:** temporal replay through traversal history.
- **Search:** an explicit context change rather than pretending a nonlocal result was an ordinary local step.

This is a stricter projection of the broader BF-UX admissible-traversal model. The canonical theory can describe parent, sibling, and child transitions; the current website deliberately does not duplicate all three in the rail. Parent movement is already legible in history/back, and child movement is embodied by the page itself.

## What this pass changed

### 1. Apparatus visual grammar

The site was pushed away from generic dark-SaaS cards toward a bounded operating surface:

- matte gunmetal structure;
- restrained shallow edge treatment;
- tighter corners instead of soft pills;
- violet reserved for operator agency / selected focus;
- green, amber, blue, and red reserved for observed system state;
- serif titles paired with compact technical / monospaced registers;
- panels treated as instruments mounted in a workfield rather than floating marketing cards.

The material rule remains:

> **Metal represents structure. Violet represents agency. State colors represent observed condition.**

### 2. Root World

The production Card renderer received the apparatus-style five-region control board rather than relying on the separate Apparatus prototype. The canonical top-level regions remain:

1. Public Interest
2. Products
3. Publications
4. About
5. Research

Concept imagery included illustrative telemetry and footer controls, but those were intentionally **not** copied unless backed by real data or real handlers.

### 3. Traversal navigation

The navigation went through several useful failures:

- local sibling menu;
- separate Boundary Tree / Trace / Adjacent Options sections;
- unified recursive tree;
- explicit Up / Across / Down controls;
- finally, the current constrained continuity instrument.

The split Tree / Trace / Sibling design was logically descriptive but visually disjointed. The user had to understand implementation concepts before the rail made sense. The later tree-only version improved continuity, but still exposed too much of the hierarchy as if it were a site map.

The invariant became clearer when the question was reframed around **continuity** rather than hierarchy display.

Current website behavior:

- prior traversal is preserved in order;
- older history is evidence, not a teleport menu;
- the current node is the terminal of realized history;
- rail-side outgoing choices are peers in the current boundary;
- children are entered through the content surface;
- a long trace uses a bounded scrolling viewport that follows the latest entries;
- the rail itself sizes to its content rather than becoming a full-height wall.

### 4. Secondary World composition

An earlier desktop layout incorrectly interpreted “vertical organization” as a left title/overview column beside a tall region field. In practice this made pages such as **Products** feel narrow and columnar.

The corrected desktop composition is **top-first**:

1. full-width title / subject heading across the top;
2. At-a-glance / subject panel below-left;
3. contained-region field below-right.

This is not the small-screen newspaper layout. It preserves useful desktop spatial relationships beneath a strong horizontal title band.

### 5. Small-screen projection

At phone widths the apparatus deliberately changes projection rather than shrinking the desktop board.

The content flows like a newspaper:

> masthead / title → deck → lead context → subsections

Card chrome is reduced, horizontal rules and typography carry more structure, and navigation becomes compact supporting furniture. This preserves meaning while changing geometry.

### 6. Landing threshold

The landing page was brought into the same BF-UX language without turning it into a second site map. It remains one proposition and one lawful transition:

> **Software for difficult systems.**  
> **Enter the lab.**

The landing surface now reads as a threshold into the apparatus: bounded chassis, Outside → Boundary → Inside register, representation loop, and one explicit operator action.

## Current desktop rail geometry

The latest refinement makes the traversal rail supporting furniture rather than a second content column:

- width: `clamp(196px, 15vw, 232px)`;
- content-sized height with viewport cap;
- compact header and flow padding;
- one alignment column shared by history, current focus, and peer choices;
- trace spine moved close to the chassis edge;
- history scroll gutter only appears when needed.

The heading is now simply **Traversal**. Explanatory labels such as “Where you have been,” “Where you can go next,” and “Where you have been · nearby choices” were removed once the structure was strong enough to communicate the distinction visually.

## Files in this archive

- `DESIGN_INVARIANTS.md` — the interaction and visual laws surfaced by the pass.
- `IMPLEMENTATION_LOG.md` — chronological design / implementation evolution and notable commits.
- `VISUAL_REFERENCES.md` — interpretation notes for generated concepts and implementation snapshots.
- `MANIFEST.json` — machine-readable inventory of this packet.
- `images/` — optimized archival previews of generated concepts and implementation observations.

## Visual archive policy

The WebP files in `images/` are optimized archival previews created from the higher-resolution concept and screenshot sources used during this pass. They preserve the design information while keeping the backlog lightweight. They are references, not pixel-perfect production specifications.

## What remains open

This pass establishes a substantially stronger interaction grammar, but several later refinements remain reasonable:

- consolidate exploratory CSS override layers into fewer canonical BF-UX stylesheets once the visual system stabilizes;
- create the minimal canonical BF-UX icon grammar instead of relying on temporary marks;
- continue validating rail width and editorial rhythm across narrow laptops and small phones;
- instrument region readouts only when real data exists;
- evaluate whether Search should visually communicate re-rooting / context replacement before navigation occurs;
- continue removing explanatory copy wherever the structure can safely carry the meaning itself.

The key acceptance test is no longer “does this look like the mockup?” It is:

> **Does the interface make the current boundary, the realized path, and the admissible next interaction mechanically legible without exposing arbitrary jumps?**
