# Boundary First Labs Interaction Memory & Sandbox UX v0.1

**Status:** Proposed backlog pass 15  
**Date:** 2026-08-25  
**Scope:** Live presence, computational wear, interaction traces, personal whiteboard/sandbox, portable artifacts, semantic transfer, and collaborative runtime posture  
**Preceding pass:** [14_boundary-first-labs-starter_v2](../14_boundary-first-labs-starter_v2/)  
**Companion specs:** [interaction_memory_and_presence_v0_1.md](./interaction_memory_and_presence_v0_1.md), [sandbox_transfer_artifact_model_v0_1.md](./sandbox_transfer_artifact_model_v0_1.md), [playhtml_runtime_posture_v0_1.md](./playhtml_runtime_posture_v0_1.md), [next_work_register.md](./next_work_register.md)

## 1. Decision

Pass 15 records a new interaction model for the public Boundary First Labs website:

> The site should behave less like a pristine document viewer and more like an apparatus with memory, while preserving a strict boundary between canonical Lab content and visitor-controlled exploratory state.

The core product addition is a **personal whiteboard / sandbox** that acts as the visitor-owned mutable boundary between the public corpus and exploratory work.

The public site remains canonical and provenance-governed. The sandbox is mutable, portable, forkable, optionally collaborative, and explicitly non-canonical until a later validation/capture step.

This pass also introduces a material language for interaction history:

- **structure** is represented by the industrial material/chassis;
- **machine state** is represented by semantic state colors;
- **current agency** is represented by the interaction/accent layer;
- **history** is represented by wear, scoring, burnishing, and accumulated trace texture.

The key principle is:

> **Wear should imply use, not neglect.**

## 2. Architectural boundary

The system should be divided into two planes.

```text
CANONICAL PLANE
repo -> corpus -> typed records -> papers -> provenance -> public projections
                         |
                         | semantic transfer
                         v
PARTICIPATION PLANE
personal history -> sandbox -> annotations -> traces -> shared room -> candidate artifact
                                                            |
                                                            | explicit capture
                                                            v
                                                     validation / canonicalization
```

The participation plane must never silently become authoritative.

A user may inspect, collect, rearrange, annotate, fork, and share representations of canonical objects without altering the canonical object itself.

## 3. Interaction memory model

Pass 15 distinguishes three timescales of interaction.

| Layer | Meaning | Candidate visual language |
|---|---|---|
| Personal history | I have visited, inspected, or worked with this object | scoring, crosshatch, engraved marks, local edge wear |
| Collective history | People repeatedly traverse or use this object/path | burnishing, polished rails, denser material wear |
| Live presence | Someone is here or acting here now | restrained indicator, occupancy tick, faint activity pulse |

These layers must remain visually and semantically separate.

The target effect is an inhabited research apparatus, not a social-media feed.

### 3.1 Personal wear

Personal wear should approximate **relationship with an object**, not raw click count.

A future scoring function may combine bounded signals such as:

```text
wear(user, object) = f(
  distinct visits,
  meaningful dwell/exposure,
  depth traversed,
  sections inspected,
  actions taken,
  return frequency,
  annotations or transfers
)
```

The exact function is an implementation detail and should remain monotone, explainable, bounded, and resistant to accidental repeated clicks.

### 3.2 Collective wear

Collective wear should expose durable social navigation without becoming popularity ranking.

Examples:

- frequently traversed relations become subtly polished;
- commonly inspected sections accumulate visible but quiet wear;
- high-use controls become more materially burnished;
- repeated paths through the research graph develop "desire paths."

The interface should communicate "this path has been used" rather than "this is trending."

### 3.3 Live presence

Presence should describe meaningful domain occupancy rather than raw cursor position.

Good examples:

- `2 here` on a paper;
- one reader currently around `§3 Closure`;
- an experiment is currently being manipulated;
- a graph node is being inspected;
- a shared sandbox contains three active participants.

The UI should avoid claims the browser cannot support. A viewport observer may establish that a section is currently visible; it must not claim that a person is cognitively "reading" it.

## 4. Social translucence posture

Public presence should default to **social translucence rather than social exposure**.

Default public representations should prefer:

- anonymous occupancy counts;
- coarse section/object-level presence;
- aggregated historical wear;
- typed machine/human presence where necessary;
- opt-in identity only for explicitly collaborative contexts.

Avoid exposing:

- precise reading duration tied to identity;
- exact cursor history outside an explicitly shared workspace;
- location or demographic inference;
- individual browsing histories;
- raw telemetry as a public feature.

Presence must create awareness without converting research navigation into surveillance.

## 5. Sandbox as transfer surface

The sandbox is not a generic drawing canvas. It is a semantic workbench capable of receiving typed objects from the site.

Eligible transfer objects should include:

- paper;
- paper section;
- claim;
- equation;
- figure;
- citation/reference;
- graph node or relation;
- search/filter result;
- experiment state;
- traversal trail;
- exploration session;
- future external/local artifact.

The canonical interaction should be **Send to Sandbox**.

A persistent Sandbox Port in the site chassis may make this boundary crossing visible. Dragging to the port is allowed as an enhancement, but every transfer must also have a non-drag accessible control.

## 6. Transfer semantics

Transfer must serialize **meaning**, not HTML or DOM fragments.

The same underlying object may have multiple projections:

```text
                     canonical object O
                          /   |   \
                         /    |    \
                        v     v     v
                 website   sandbox   file
                projection projection representation
```

Pass 15 defines three transfer modes:

### Reference

A live reference to the canonical object. The sandbox may later indicate that its source has changed.

### Snapshot

A frozen representation of what the user saw at a particular source version/time. This is important for research provenance and reproducibility.

### Fork

A mutable derivative initialized from the source object, retaining provenance but explicitly diverging from the canonical object.

The UI must make these semantics legible whenever the distinction matters.

## 7. Trace history as a first-class object

A navigation history becomes valuable when it can cross the boundary into the sandbox as a manipulable representation.

Candidate capture controls:

```text
SAVE / SEND TO SANDBOX
- Object
- Section
- Trail
- Session
```

A **trail** is the meaningful path through selected objects/relations.

A **session** may additionally include bounded timing, expanded evidence, annotations, search/filter context, and experiment states.

Once transferred to the sandbox, the trail can be rearranged, annotated, compared with the surrounding canonical graph, collapsed, branched, or exported.

This transforms navigation into a research object:

```text
observed traversal -> explicit representation -> manipulable artifact
```

## 8. Local ownership and persistence

The minimum sandbox should work without an account.

Persistence tiers:

1. **Browser-local autosave** using IndexedDB or equivalent durable first-party browser storage.
2. **Portable file export** to a user-controlled `.bflab` artifact.
3. **Portable re-import** through file picker and drag/drop.
4. **Optional direct-file save/reopen** through File System Access APIs where supported.
5. **Optional shared room** for real-time collaboration.
6. **Optional account/cloud persistence** only as a later additive capability.

Browser storage must be described as device/browser-local rather than archival. The portable file is the user-controlled long-lived artifact.

## 9. Portable Lab artifact

The first implementation may use a JSON-based `.bflab` file. A later version may become a ZIP container while retaining a stable manifest.

Candidate future container:

```text
my-board.bflab
├── manifest.json
├── board.json
├── trace.json
├── provenance.json
└── assets/
    ├── figure-01.png
    └── notes.md
```

The artifact must retain:

- schema/version;
- stable board ID;
- object IDs and kinds;
- source canonical IDs/URIs where applicable;
- transfer mode (`reference`, `snapshot`, `fork`);
- source version/hash when available;
- local edits/annotations;
- relationship geometry/layout;
- provenance and import warnings;
- optional embedded assets.

The artifact format belongs to Boundary First Labs, not to the collaboration runtime.

## 10. Collaboration/runtime boundary

PlayHTML is a promising small runtime for live/shared interaction because its model separates persistent element state, persistent page state, ephemeral presence, and ephemeral events.

It should be evaluated for:

- live object awareness;
- anonymous occupancy;
- shared sandbox state;
- transient events;
- domain-specific `can-play` interactions;
- shared underlying state rendered by different projections.

PlayHTML should **not** become:

- the canonical research database;
- the `.bflab` artifact definition;
- the sole persistence layer;
- the provenance authority;
- a requirement for local/offline sandbox use.

The collaboration runtime synchronizes a board. The BFL schema defines what a board is.

## 11. Canonical lifecycle

The long-term artifact loop should be explicit.

```text
OBSERVE
  |
  v
PUBLIC CORPUS
  |
  | send/reference/snapshot/fork
  v
PERSONAL SANDBOX
  |              \
  |               \
  v                v
LOCAL FILE       SHARED ROOM
  \                /
   \              /
    v            v
       REFINE
         |
         v
   CANDIDATE ARTIFACT
         |
         | validation / provenance / review
         v
    CANONICAL CORPUS
```

Nothing silently crosses into the canonical plane.

The user should always be able to determine:

- what came from the Lab;
- what is a live reference;
- what is a frozen snapshot;
- what has been forked or changed;
- what exists only locally;
- what is currently shared;
- what is canonical;
- what can be carried away.

## 12. Initial product surfaces

### 12.1 Sandbox Port

Persistent site affordance for sending semantic objects into the user's active board.

### 12.2 Personal Workbench / Whiteboard

A route or panel that renders typed objects, supports layout and annotation, and can save/load portable artifacts.

### 12.3 Trail Capture

Capture current meaningful traversal into the sandbox.

### 12.4 Wear Layer

Opt-in or default-subtle personal wear, then later collective wear.

### 12.5 Presence Layer

Anonymous coarse occupancy for papers/sections/experiments, eventually shared-board collaborators.

### 12.6 Shared Room

Explicitly create a collaborative session from a local board or current sandbox state.

## 13. Design grammar constraints

The existing industrial UX grammar should remain intact.

- **Metal/material** = structure.
- **Violet/accent** = operator agency/current interaction.
- **Green/amber/blue/red** = observed machine/system state.
- **Wear/texture** = history.

Wear must not borrow semantic state colors.

A paper does not become purple because it was visited repeatedly. A heavily traversed path does not become green. History changes finish/texture; current agency and system state retain their own channels.

## 14. Acceptance criteria

- A user can send a canonical typed object into a sandbox without copying raw DOM/HTML.
- A sandbox object preserves source identity/provenance when applicable.
- Reference, snapshot, and fork semantics are representable and distinguishable.
- A meaningful navigation trail can become a sandbox object.
- The sandbox works locally without account or shared-room infrastructure.
- The user can export and later re-import a portable Lab artifact.
- Browser-local state is not described as permanent archival storage.
- Collaboration runtime state is non-canonical by default.
- Live presence remains coarse and privacy-preserving in public contexts.
- Personal history, collective history, and live presence are visually distinct.
- Wear communicates historical use through texture/finish rather than semantic status color.
- Every drag-based transfer has a keyboard/tap accessible alternative.
- Reduced-motion, high-contrast/forced-colors, keyboard, touch, and narrow-screen behavior remain supported.
- No implementation claims that visibility equals cognitive attention/readership.
- No shared-state provider becomes a hidden authority for canonical research content.

## 15. Non-goals

Pass 15 does not authorize:

- turning the public site into a social network;
- public identity tracking by default;
- exposing individual browsing histories;
- ranking research by popularity;
- treating click count as research significance;
- replacing canonical repo/corpus provenance with browser/shared-room state;
- requiring an account for basic sandbox use;
- requiring PlayHTML for local sandbox operation;
- silently uploading local artifacts;
- treating a visitor fork as a canonical Lab revision;
- copying arbitrary DOM into the sandbox as the primary transfer model;
- introducing rich collaborative cursors everywhere on the reading experience.

## 16. Research lineage / references to retain

The implementation should preserve a short design-research note pointing to relevant prior art:

- Hill, Hollan, Wroblewski, McCandless (CHI 1992), **Edit Wear and Read Wear** — computational wear/history embedded in digital objects.
- Social navigation / "Footprints" work — durable traces of others' navigation as orientation rather than social ranking.
- Erickson & Kellogg, **Social Translucence** — visibility/awareness/accountability without indiscriminate exposure.
- PlayHTML — framework-agnostic shared element/page state, presence, and event primitives; candidate participation runtime.
- Browser platform primitives — IndexedDB, File/Blob, drag/drop/file input, and File System Access as progressive enhancement for portable local artifacts.

These are design/implementation antecedents, not claims that the BFL interaction model is identical to any one predecessor.
