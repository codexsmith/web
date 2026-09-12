# Temporal Observation Vessel — Visual Concept Brief v0.1

**Status:** visual direction / mockup-ready  
**Date:** 2026-09-08  
**Parent:** [`README.md`](./README.md)  
**Implementation contract:** [`component_spec_v0_1.md`](./component_spec_v0_1.md)  

---

## 1. Visual thesis

Create a desktop interface that feels like a **scientific observation instrument for a temporal specimen**.

The user should immediately perceive three things:

1. time runs vertically and remains fixed;
2. the branched timeline is a physical-seeming object that can rotate around that temporal axis;
3. only some of the total structure is currently emphasized, while hidden/ghosted structure is known to remain present.

The key emotional register is:

> **institutional scientific apparatus from a future in which complicated information structures are ordinary objects of inspection.**

The image should feel rigorous, calm, engineered, and slightly unfamiliar — not theatrical science fiction.

---

## 2. Primary composition

Design one wide desktop view dominated by a tall central observation vessel.

### Frame

The vessel is a bounded, vertically oriented observation surface with subtle cylindrical curvature.

It should read as a stationary instrument frame rather than a floating glass card.

The frame may include:

- restrained steel/alloy edge structure;
- fine temporal tick marks;
- a small orientation/rotation scale;
- subtle fixed calibration marks;
- a narrow observation-state readout;
- one or two edge highlights suggesting curved transparent material.

The frame itself does **not** rotate.

### Temporal axis

A clear but understated vertical chronological axis runs through the specimen.

At the top:

```text
EARLIER
```

At the bottom:

```text
LATER
```

Add a few legible year/date ticks so the chronology is immediately grounded.

Do not style the time axis like a glowing laser column. It is a calibrated reference, not spectacle.

### Specimen

Inside the frame, render a branched timeline with approximately 6 major lineages and a larger number of subordinate branches.

The topology should suggest a three-dimensional branching structure wrapped around the central temporal axis.

One or two branches are close to the front observation plane and therefore:

- crisp;
- structurally complete;
- fully labeled;
- visually easiest to inspect.

Branches moving toward the sides should:

- compress slightly;
- lose some label density;
- appear more oblique;
- remain structurally readable.

Rear branches should be:

- ghosted;
- partially occluded;
- represented by faint structure, anchor marks, or silhouette;
- never made to look deleted.

The viewer should be able to infer that rotating the specimen would bring those branches forward.

---

## 3. Curved-surface cues

The glass/containment-vessel inspiration should be present primarily through **optical behavior**, not literal scenery.

Use:

- gentle horizontal compression toward the far left and right of the vessel;
- extremely subtle edge refraction;
- small parallax differences between front and rear structures;
- one restrained specular highlight along a curved side edge;
- faint fixed markings that visually sit on the vessel surface rather than on the timeline;
- a slight loss of contrast for structures viewed through greater apparent depth.

Avoid:

- water;
- bubbles;
- condensation;
- laboratory fog;
- thick aquarium glass;
- visible liquid meniscus;
- biohazard theatrics;
- cinematic lens effects.

The user should think **observation chamber**, not **fish tank**.

---

## 4. Controlled Observability in the mockup

The mockup must visibly demonstrate that branch visibility is an instrument setting.

Show four presentation states simultaneously:

### Primary

One selected/front-facing lineage is crisp and fully labeled.

### Secondary

A few neighboring branches remain visible with less emphasis.

### Ghost

Several rear or contextual branches remain as faint structural traces.

### Suppressed

Some branches are not drawn in full, but the interface explicitly acknowledges them.

Example readout:

```text
14 STRUCTURES HIDDEN
3 REAR LINEAGES OCCLUDED
```

or a restrained equivalent.

The goal is to make the user feel:

> **I am changing what I can currently observe, not changing what exists.**

---

## 5. Example instrument state

Use a concrete state so the image tells a story rather than looking like an empty component library demo.

Suggested state:

```text
MODE               FOCUS
OBSERVATION DEPTH  FRONT + SIDES
DETAIL             STANDARD
TEMPORAL APERTURE  2018 — 2026
ANNOTATIONS        STANDARD
RELATIONS           LINEAGE
HIDDEN              14
```

One branch is focused.

A second branch is pinned for comparison and remains visible even though it has rotated partly toward the side/rear.

A small label such as:

```text
PINNED
```

or an existing Boundary First operator-agency treatment can communicate that status.

The focused branch should not rely solely on color. Give it clearer labeling, structural emphasis, or a selection bracket/marker.

---

## 6. Control morphology

Controls should feel like **calibrated observational controls**, not generic filters pasted beside a 3D visualization.

Possible forms:

- compact segmented selector for Full / Focus / Isolate;
- narrow calibrated slider for detail threshold;
- branch-family bank with show/ghost/hide state;
- small depth selector;
- temporal-aperture rail aligned to the time axis;
- rotational scrub ring or azimuth scale near the vessel base;
- annotation-density control;
- explicit `Restore observation` command.

Use only controls that map to real representational variables.

Do not fill the screen with decorative knobs, oscilloscope traces, meters, or status lights that have no function.

---

## 7. Suggested layout

A strong composition could be:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ TIMELINE / OBSERVATIONAL VIEW                FOCUS • 2018—2026       │
│                                                                      │
│   BRANCHES            ┌──────────────────────────────┐  OBSERVATION   │
│   ● Research          │            EARLIER           │  MODE  FOCUS   │
│   ◐ Products          │              │               │  DEPTH F+S    │
│   ○ Publications      │         ╱────│──╲            │  DETAIL STD   │
│   · Public Interest   │       ╱      │    ╲          │  LABELS STD   │
│   · ...               │      │      ╱│     │         │               │
│                       │      │   [FOCUS]    │         │  HIDDEN 14    │
│                       │      │        │     ╲         │  REVEAL       │
│                       │       ╲       │      │        │               │
│                       │        · · · rear · ·         │               │
│                       │              │               │               │
│                       │             LATER            │               │
│                       └──────────────────────────────┘               │
│                              ↺  042°  ↻                               │
└──────────────────────────────────────────────────────────────────────┘
```

This is only compositional guidance. The final design should be less boxy and more integrated than the ASCII diagram.

---

## 8. Visual hierarchy

The eye should land in this order:

1. selected/front-facing branch;
2. temporal axis and current time region;
3. surrounding branch structure;
4. ghost/rear structure;
5. observational controls;
6. metadata and secondary labels.

Do not let the frame or glass treatment become the most visually salient object.

The specimen is the subject. The vessel is the apparatus that makes it legible.

---

## 9. Material and color direction

Inherit the existing Boundary First apparatus visual grammar rather than creating a new palette.

Use the established material family conceptually:

```text
Iron / deepest chassis
Gunmetal / working field
Steel / bounded controls and modules
Alloy / separators and fine structural edges
```

Operator agency/selection can use the existing violet semantic.

Machine-state colors should remain reserved for actual state meanings. Do not use green/amber/red merely to make branch families distinguishable.

Branch differentiation should rely on redundant cues such as:

- labels;
- line morphology;
- marker shape;
- grouping;
- subtle domain accents where already defined;
- weight and detail hierarchy.

Avoid rainbow graph coloring.

The overall visual density can be dark/industrial if consistent with the surrounding Apparatus projection, but the design must preserve high legibility and accessible contrast.

---

## 10. Typography

Typography should feel like a contemporary scientific instrument, not a movie prop.

Use:

- clear sans-serif body labels;
- restrained monospace or tabular numerals for dates, angles, counts, and calibrated readouts;
- short uppercase instrument labels where useful;
- ordinary readable sentence case for event descriptions and explanatory content.

Avoid tiny all-caps technical filler.

Every visible label should mean something.

---

## 11. Motion implied by the still image

Even a static mockup should suggest rotational possibility.

Use cues such as:

- branch foreshortening at the sides;
- rear ghost structure;
- a rotational scale at the base;
- one branch partly disappearing behind another;
- one pinned branch remaining faintly traceable through the rear;
- subtle left/right drag affordance near the specimen.

Do not draw giant rotation arrows over the content unless producing an explanatory diagram rather than the product mockup.

---

## 12. What the image must not become

Reject concepts that look like:

- a spaceship cockpit;
- a cyberpunk HUD;
- an aquarium;
- a biotech horror containment chamber;
- a generic translucent glassmorphism dashboard;
- a VR graph explorer;
- a neon node-link network floating in space;
- a conventional timeline placed inside a rounded rectangle;
- a dense graph where every branch and relation is simultaneously bright;
- a literal steel tank whose machinery overwhelms the information.

The distinctive behavior is **rotational information architecture and controlled observability**, not sci-fi decoration.

---

## 13. Primary mockup brief

### Scene

A sophisticated Boundary First Labs web interface showing a tall branched timeline as a temporal specimen inside a stationary, subtly curved scientific observation vessel. Time runs vertically from EARLIER at the top to LATER at the bottom. The timeline has stable branches distributed around a central temporal axis, visibly wrapping into depth. A front-facing branch is crisp and fully labeled; side branches compress and lose label density; rear branches appear as faint ghosted topology through the curved surface. Several branches are intentionally suppressed, with a precise readout acknowledging hidden lineages rather than making them disappear without explanation.

### Interaction implied

The specimen appears horizontally rotatable while the vessel frame, temporal ticks, and calibration marks stay fixed. A restrained azimuth/rotation indicator at the base suggests physical manipulation. One branch is focused; another is pinned for comparison. Controls around the observation boundary adjust Focus/Isolate mode, observation depth, detail threshold, temporal aperture, branch visibility, relation visibility, and annotation density.

### Aesthetic

Institutional scientific apparatus, sober and engineered, slightly futuristic because the information object is unusual. Industrial material cues from iron/gunmetal/steel/alloy, subtle curved transparent-surface refraction, high legibility, minimal glow, precise labels, no gratuitous machinery. Operator-selected controls may use the established violet agency cue. The timeline remains the visual subject.

### Composition

Wide desktop product mockup, central vessel occupying most vertical space, narrow branch visibility controls on one side and observational controls on the other, sparse header/status area, enough negative space that the structure remains legible. The frame is fixed and quiet; the branched temporal specimen is layered and dimensional.

### Avoid

No aquarium water or bubbles. No cyberpunk neon. No holographic HUD. No spaceship cockpit. No thick glassmorphism cards. No rainbow branches. No excessive chrome, rivets, rust, pipes, fake warning stripes, smoke, fog, or cinematic lighting. No arbitrary 3D camera orbit. No unreadably tiny labels.

---

## 14. Suggested mockup sequence

If this concept is explored as multiple frames, use three states rather than three unrelated visual directions.

### Frame A — Full observation

Show the whole specimen with Primary / Secondary / Ghost tiers visible and a moderate hidden count.

Goal: communicate the object and curved rotational geometry.

### Frame B — Focus / rotate

Rotate a previously side/rear branch into the foreground. Keep the frame fixed. Reduce detail elsewhere.

Goal: prove the physical observation metaphor and perspective-dependent resolution.

### Frame C — Isolate / controlled observability

Isolate one lineage, keep direct context ghosted, suppress unrelated branches, and clearly show the hidden/suppressed count with a restore affordance.

Goal: prove that information-overload management is part of the representation rather than a separate filter page.

---

## 15. Visual acceptance test

Before using any concept image as implementation guidance, ask:

1. Can I tell which direction time moves without reading documentation?
2. Does the timeline look like it can rotate around time rather than like the whole screen can orbit?
3. Does the outer observation frame feel stationary?
4. Can I see evidence that rear/hidden structure still exists?
5. Does frontness control information resolution in a useful way?
6. Are the controls tied to actual observational variables?
7. Does the design still look like Boundary First apparatus rather than a new sci-fi theme?
8. Would the interface still make conceptual sense if the glass/refraction effect were removed?

If the answer to question 8 is no, the concept is relying on decoration instead of interaction grammar.

---

## 16. Canonical visual sentence

> **A fixed scientific observation frame contains a vertically ordered temporal specimen; the user holds time still, rotates its branching structure, and tunes what is observable without erasing what exists.**