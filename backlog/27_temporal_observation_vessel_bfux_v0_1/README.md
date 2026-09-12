# Temporal Observation Vessel — Boundary First UX

**Status:** concept / design-ready  
**Date:** 2026-09-08  
**Workstream:** 27  
**Primary surface:** Timeline / process / historical-lineage interfaces  
**Secondary surfaces:** research histories, version lineages, institutional histories, branching process records  
**Design family:** Boundary First Apparatus  

---

## Purpose

The **Temporal Observation Vessel** is a Boundary First UX pattern for inspecting dense, branching temporal structure without flattening it into a widening two-dimensional tree or hiding complexity behind disconnected panels.

The core interaction is simple:

> **Hold time fixed. Rotate its structure.**

Time remains an invariant vertical axis. Branches occupy stable angular positions around that axis. The user rotates the branched temporal object inside a fixed observational frame, bringing different lineages toward or away from the primary viewing plane.

A second principle completes the interaction model:

> **Control observability without pretending hidden structure ceased to exist.**

The interface can foreground, ghost, suppress, filter, isolate, and reveal branches as the user rotates and changes observational settings. These are changes to the **projection and observation conditions**, not changes to the underlying data object.

This workstream captures three artifacts:

1. this design-principles document;
2. [`component_spec_v0_1.md`](./component_spec_v0_1.md), the implementation/component contract;
3. [`visual_concept_brief_v0_1.md`](./visual_concept_brief_v0_1.md), the visual and mockup brief.

The pattern is a specialization of the existing [`Boundary First Apparatus Interaction Grammar`](../3_bfl_boundary_first_ux/bfl_apparatus_interaction_grammar_v0_1.md) and should inherit its progressive-disclosure, graph-discipline, semantic-color, and responsive-design rules. It is not a second information architecture or a decorative sci-fi skin.

---

## 1. Design thesis

A conventional timeline usually maps time to one screen axis and branching to the other. As branch count grows, the display widens, crossings accumulate, labels collide, and the interface eventually solves overload by collapsing or removing structure.

The Temporal Observation Vessel uses a different representational move:

```text
vertical position  = chronology
angular position   = branch orientation
frontness          = observational priority / detail
visibility state   = current observational setting
```

The timeline is treated as a **temporal specimen**: a bounded structure that can be inspected from different orientations while its chronology remains stable.

The third dimension is therefore not decorative. It has one job: **provide additional representational capacity for branch structure and controlled information density.**

---

## 2. Core invariants

### 2.1 Time is the invariant axis

Top is earlier. Bottom is later.

Rotation must never make chronology ambiguous. The user is not orbiting a generic 3D graph and is not rotating time itself.

> **Chronology is axial. Perspective is angular.**

### 2.2 Branch orientation is stable

Each branch receives a stable angular position around the temporal axis. Filtering, focusing, or changing detail must not casually re-pack branches into new positions, because that destroys spatial memory.

A branch that was behind the specimen before a filter change should still be understood as belonging to that region after the filter change unless the user explicitly requests a re-layout.

### 2.3 The vessel is fixed; the specimen moves

The observational frame remains stationary while the internal temporal structure rotates.

This is the strongest perceptual cue that the user is manipulating an object under observation rather than moving a camera through a generic 3D scene.

### 2.4 Curvature is a perceptual instrument, not decoration

The interface should suggest a curved observational surface through restrained optical behavior:

- subtle horizontal compression near the lateral edges;
- small perspective/parallax differences between front, side, and rear structures;
- reduced detail and contrast for oblique or rear-facing branches;
- faint edge reflections or refraction cues;
- fixed scale marks or frame markings that do not rotate with the specimen.

Do not render literal water, aquarium effects, excessive glassmorphism, or cinematic laboratory scenery.

### 2.5 Visibility is not existence

A hidden branch still exists in the underlying timeline.

The UI must distinguish at least:

- absent from the data;
- outside the temporal aperture;
- filtered by the user;
- suppressed for density;
- occluded by projection;
- intentionally isolated away;
- present but ghosted as context.

Whenever one of these distinctions matters to orientation, the user should be able to discover it.

### 2.6 Observability is a first-class control

The user is allowed to change the conditions under which the structure is presented.

This includes branch families, observation depth, detail threshold, temporal aperture, connection types, annotation density, focus state, and isolation state.

The interface should feel less like deleting rows from a dataset and more like tuning an instrument into legibility.

### 2.7 Orientation survives filtering

Every visibility control should preserve orientation.

When branches are ghosted or suppressed, preserve enough information to answer:

- where am I in time?
- which branch am I following?
- what structure still exists outside the current view?
- what has been hidden and why?
- how do I restore it?

### 2.8 Progressive disclosure remains mandatory

The vessel must not solve legibility by displaying the whole graph at full detail.

The immediate view should answer:

```text
What am I looking at?
Where am I in time?
Which structures are currently foregrounded?
What can I reveal or inspect next?
```

More detail appears through rotation, focus, filtering, inspection, or explicit depth changes.

### 2.9 The apparatus metaphor must remain semantic

The scientific-instrument feeling is useful only when the controls correspond to real representational variables.

A dial is justified if it controls density, depth, temporal aperture, or another meaningful parameter. A dial is not justified merely because a dial looks futuristic.

The existing apparatus doctrine still applies:

> **Not a cockpit skin. Not a cyberpunk dashboard.**

### 2.10 Three-dimensionality cannot be required for comprehension

The information model must remain accessible through a planar/tree/list projection.

The curved vessel is a powerful projection, not the sole truth-bearing representation. Keyboard users, reduced-motion users, screen-reader users, constrained devices, and narrow screens must retain the same semantic state and controls.

---

## 3. Controlled Observability

**Controlled Observability** is the reusable Boundary First UX principle developed by this workstream:

> When a structure is too complex to display all at once, preserve the total structure while allowing the operator to regulate what is currently observable.

The first implementation should use four effective visibility tiers.

| Tier | Meaning | Typical presentation | Interaction |
| --- | --- | --- | --- |
| **Primary** | Current focus or observational foreground | crisp geometry, full labels, full metadata affordance | fully interactive |
| **Secondary** | Relevant visible context | lower emphasis, reduced labels | interactive |
| **Ghost** | Topological/orienting context | faint geometry, sparse markers, minimal labeling | inspectable or promotable |
| **Suppressed** | Present but intentionally not drawn in the main specimen | represented through counts, anchors, filter state, or reveal affordance | restorable |

These tiers are presentation states. They do not mutate the underlying branch.

A branch can also carry independent semantic flags such as **selected**, **focused**, **pinned**, **filtered**, or **outside aperture**. The renderer resolves those states into the effective presentation tier.

---

## 4. Rotation and visibility cooperate

Rotation should naturally redistribute detail.

As a branch approaches the primary observation plane, it can progress through representational resolution:

```text
existence → structure → abbreviated detail → full detail
```

As it moves away:

```text
full detail → abbreviated detail → structure → existence
```

This progression should be continuous enough to feel physically coherent while remaining deterministic and readable.

A front-facing branch may become Primary. Side branches may become Secondary. Rear branches may become Ghost or become occluded according to the current observation-depth setting.

Explicit user choices override automatic decluttering. A pinned branch must not silently disappear simply because it rotates toward the rear.

---

## 5. Primary observational controls

The first prototype should support these controls as actual instrument parameters:

### Branch family

Show, ghost, or suppress selected branch categories or named lineages.

### Observation depth

Controls how much of the rotational depth field is presented.

Suggested modes:

```text
FRONT
FRONT + SIDES
FULL
TRANSPARENT / EXPLODED
```

### Detail threshold

Controls how much low-significance structure is admitted into the current projection.

Suggested coarse states:

```text
MAJOR
STANDARD
DETAILED
ALL
```

### Focus

Promotes one branch and preserves others as contextual structure.

### Isolate

Shows the selected lineage and its directly relevant neighborhood while suppressing unrelated branches.

### Pin

Keeps a branch observationally privileged while the specimen rotates or filters change.

### Temporal aperture

Restricts the visible time window without changing the underlying chronology.

### Connection visibility

Controls optional relation classes such as lineage, dependency, causal hypothesis, publication relation, or process relation.

### Annotation density

Controls labels and annotations independently from branch existence.

---

## 6. Information-overload strategy

The vessel should manage overload in layers rather than with one giant binary filter.

A useful resolution order is:

1. determine which data belongs to the current semantic query;
2. apply the temporal aperture;
3. apply explicit branch-family and relation filters;
4. preserve focused and pinned structures;
5. apply importance/detail threshold;
6. determine front/side/rear observational priority from rotation;
7. resolve occlusion and label collisions;
8. downgrade remaining low-priority structure to Ghost or Suppressed;
9. expose counts or markers for suppressed material when orientation would otherwise be lost.

The system may declutter automatically, but it must never create the false impression that suppressed structure does not exist.

---

## 7. Interaction grammar

### Rotate specimen

Horizontal drag or an equivalent rotational control changes angular orientation while keeping the temporal axis fixed.

Rotation should have restrained physicality: enough momentum or settling to communicate mass, but never free-spinning physics that interferes with precision.

### Traverse time

Vertical movement changes the temporal window or position along the specimen. The implementation must not hijack ordinary page scrolling unexpectedly.

### Change temporal resolution

Zoom changes the amount of time represented in the viewport, not merely pixel magnification.

### Focus branch

Selection foregrounds a branch. Bringing the selected branch to the observation plane may be a separate explicit command so the user can inspect a branch in place without unexpected rotation.

### Isolate branch

Suppress unrelated structures while preserving enough topology to communicate what was removed.

### Reveal hidden structure

Occluded or suppressed regions expose counts, shadows, anchor marks, or a reveal affordance such as `3 hidden lineages`.

### Inspect event

Inspection opens event metadata or evidence without changing the branch's place in the temporal specimen.

---

## 8. Physical and visual character

The target emotional register is:

> **institutional scientific apparatus from a future in which complicated information structures are normal things laboratories inspect.**

That means restrained, functional, calibrated, and legible.

It does **not** mean:

- cyberpunk neon;
- holographic HUD clutter;
- aquarium water or bubbles;
- excessive chrome, rivets, knobs, or cinematic machinery;
- decorative glassmorphism cards;
- arbitrary glow around every edge;
- free-orbit 3D navigation;
- illegible micro-labels placed merely to look technical.

The specimen should feel unusual because its representational behavior is unusual, not because the page has been dressed as science fiction.

---

## 9. Accessibility and alternate projections

The Temporal Observation Vessel must have a semantic equivalent outside the spatial projection.

Minimum requirements:

- keyboard rotation in discrete, predictable increments;
- keyboard temporal traversal and focus movement;
- a reduced-motion mode that replaces inertial/continuous rotation with short deterministic transitions;
- a planar branch/tree view using the same filters, focus, temporal aperture, and selection state;
- screen-reader representation of branch ancestry, time, event labels, hidden/suppressed counts, and current observation settings;
- no information encoded only by color, transparency, or spatial depth;
- touch targets and text that remain legible at zoom;
- responsive reflow that becomes a lawful linear/planar control path rather than a miniaturized desktop tank.

---

## 10. When to use this pattern

Use the Temporal Observation Vessel when all of the following are materially true:

- time is a primary ordering dimension;
- the history branches, forks, merges, or contains simultaneous lineages;
- preserving branch relationships matters;
- the number of branches can exceed a comfortable planar width;
- users benefit from selectively surfacing different lineages while maintaining global orientation.

Good candidates include:

- Boundary First Labs institutional timeline;
- research-program lineage;
- project and publication histories;
- version/decision histories;
- branching process or experiment records.

Do not use it for a simple linear chronology with a handful of events. In that case, a normal timeline is clearer.

---

## 11. Success criteria

The pattern succeeds when a user can:

- explain the top-to-bottom chronological rule without instruction;
- rotate the specimen without losing their place in time;
- discover a branch that was initially behind another branch;
- reduce information density without mistaking hidden data for deleted data;
- focus or isolate one lineage and restore the broader topology easily;
- understand when additional structure exists outside the current projection;
- use the same timeline semantics through keyboard and planar fallback modes;
- feel physical rotation and curved depth without the interface becoming a visual-effects demo.

The strongest qualitative test is simple:

> **The user should feel that they are inspecting a temporal object, not operating a 3D website.**

---

## 12. Next gate

Build a deliberately small interactive prototype with synthetic branching timeline data.

The prototype should validate only the representational mechanics first:

1. fixed vertical time axis;
2. stable angular branch assignment;
3. specimen rotation inside a stationary frame;
4. front/side/rear detail transitions;
5. Primary / Secondary / Ghost / Suppressed observability tiers;
6. branch focus, isolate, pin, and restore;
7. temporal aperture and density control;
8. non-3D equivalent projection using the same state.

Do not begin by polishing the tank. Prove that the observational grammar makes a dense timeline easier to understand.