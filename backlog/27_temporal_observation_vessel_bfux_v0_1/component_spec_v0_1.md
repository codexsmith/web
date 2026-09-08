# Temporal Observation Vessel — Component Specification v0.1

**Status:** implementation contract / prototype candidate  
**Date:** 2026-09-08  
**Parent:** [`README.md`](./README.md)  
**Visual brief:** [`visual_concept_brief_v0_1.md`](./visual_concept_brief_v0_1.md)  

---

## 1. Objective

Define the smallest reusable component system required to prototype the Temporal Observation Vessel without committing prematurely to a full 3D renderer.

The implementation must preserve four semantic facts independently:

```text
DATA           what events and branches exist
LAYOUT         where branches live around the temporal axis
OBSERVATION    how the operator is currently viewing/filtering the structure
PROJECTION     how that observation state is rendered on this device
```

Do not collapse these layers into one mutable visualization state.

A filter must not rewrite the branch topology. A camera/rotation change must not rewrite chronology. A responsive projection must not create a different information architecture.

---

## 2. Recommended v0.1 rendering strategy: 2.5D first

The first prototype does **not** require WebGL or a fully navigable 3D scene.

A cylindrical projection can produce the desired physical sensation with deterministic two-dimensional rendering:

```text
branch angular position + current rotation
                 ↓
           projected x
           frontness/depth
           scale/detail/opacity
                 ↓
        SVG / Canvas geometry
        HTML/SVG label overlay
```

This approach is preferred for v0.1 because it gives:

- stable geometry;
- simpler hit testing;
- easier semantic overlays;
- easier accessibility;
- predictable responsive behavior;
- less temptation to add unnecessary free-camera motion;
- a clean path to Canvas/WebGL later if real data volume demands it.

The renderer should be replaceable without changing the data model or observation-state contract.

---

## 3. Component family

Suggested component boundaries are semantic rather than ornamental.

### `TemporalObservationVessel`

Owns orchestration, observation state, input routing, and projection selection.

Responsibilities:

- accepts timeline data;
- owns or receives controlled observation state;
- resolves observability;
- selects desktop/spatial versus planar/responsive projection;
- exposes state changes to parent routes;
- coordinates inspection without mutating topology.

### `TemporalSpecimen`

Renders the branched temporal object.

Responsibilities:

- vertical chronology;
- stable branch angular positions;
- branch and event geometry;
- front/side/rear projection;
- visibility tiers;
- relation geometry when enabled;
- event hit regions.

### `VesselFrame`

Renders the fixed observational boundary.

Responsibilities:

- stationary curved-surface cues;
- temporal scale/ticks;
- rotation/orientation reference marks;
- observational state summary;
- edge occlusion/reveal indicators.

The frame must not rotate with the specimen.

### `ObservationControls`

Controls observational variables.

Required v0.1 controls:

- mode: full / focus / isolate;
- observation depth;
- detail threshold;
- temporal aperture;
- branch-family visibility;
- annotation density;
- relation visibility;
- restore defaults.

### `BranchVisibilityControl`

Provides explicit branch-level policy:

```text
AUTO
SHOW
GHOST
HIDE
PIN
```

`PIN` is an additional privilege flag rather than merely another visual tier.

### `TemporalInspector`

Shows metadata for the selected event or branch without moving the user to a different conceptual location.

### `HiddenStructureIndicator`

Represents known but currently unrendered structure.

Examples:

```text
3 hidden lineages
12 events outside aperture
7 branches suppressed by detail threshold
rear structure occluded
```

### `PlanarTimelineProjection`

Accessible/non-spatial representation of the same timeline and observation state.

It must not be a separate feature with separate filters.

---

## 4. Data contract

The exact application schema can adapt to the site's existing governed-object model, but the visualization needs the following logical information.

```ts
type TemporalId = string;

type TemporalBranch = {
  id: TemporalId;
  label: string;
  parentBranchId?: TemporalId;
  category?: string;
  importance?: number;          // normalized or domain-specific rank
  startTime?: string | number;
  endTime?: string | number;
  angularHint?: number;         // optional stable seed, not required
  metadata?: Record<string, unknown>;
};

type TemporalEvent = {
  id: TemporalId;
  branchId: TemporalId;
  time: string | number;
  label: string;
  importance?: number;
  relationIds?: TemporalId[];
  metadata?: Record<string, unknown>;
};

type TemporalRelation = {
  id: TemporalId;
  sourceId: TemporalId;
  targetId: TemporalId;
  type: string;
  label?: string;
};

type TemporalDataset = {
  branches: TemporalBranch[];
  events: TemporalEvent[];
  relations?: TemporalRelation[];
};
```

### Invariant

Branch identity and event identity must remain stable across projections, filters, route changes, and restore operations.

---

## 5. Stable branch layout

Each branch receives a stable angular anchor `theta` around the temporal axis.

The anchor should be deterministic from semantic structure rather than assigned anew on every render.

Possible v0.1 strategy:

1. reserve an angular neighborhood for each root branch;
2. place child branches inside their parent's neighborhood;
3. stable-sort siblings by explicit order, start time, or ID;
4. persist the resulting angular layout for the dataset/session;
5. do not repack simply because a branch becomes hidden.

This preserves spatial memory.

### Important rule

> **Filtering changes observability, not angular ownership.**

If a hidden branch leaves an apparent gap, the gap is often preferable to a silent global rearrangement.

An explicit `repack layout` experiment may be considered later, but it must never be the implicit default.

---

## 6. Projection model

Let:

```text
y       = normalized temporal position
θ       = stable branch angle
φ       = current specimen rotation
r       = branch radius from the central temporal axis
δ       = θ - φ
```

A minimal cylindrical projection can use:

```text
projectedX = centerX + r * sin(δ)
frontness  = cos(δ)
```

`frontness` can then influence presentation:

```text
frontness near +1   → observational foreground
frontness near  0   → side / oblique
frontness near -1   → rear
```

Do not treat `frontness` as semantic importance. It is only one input into effective presentation.

### Curved-surface cue

A mild non-linear horizontal compression function may be applied near vessel edges, but it should never deform chronology or make hit targets unreliable.

### Radius

Radius can encode structural separation or branching depth, but v0.1 should keep it visually restrained. Do not overload radius with multiple semantic meanings.

---

## 7. Observation state

The observation state should be serializable and independent of the renderer.

```ts
type BranchPolicy = "auto" | "show" | "ghost" | "hide";
type ObservationMode = "full" | "focus" | "isolate";
type ObservationDepth = "front" | "front-sides" | "full" | "transparent";
type DetailLevel = "major" | "standard" | "detailed" | "all";
type AnnotationDensity = "low" | "standard" | "high";

type TemporalObservationState = {
  rotation: number;                 // normalized turn or radians
  temporalWindow: [number, number];
  mode: ObservationMode;
  observationDepth: ObservationDepth;
  detailLevel: DetailLevel;
  annotationDensity: AnnotationDensity;
  focusedBranchId?: TemporalId;
  selectedEventId?: TemporalId;
  pinnedBranchIds: TemporalId[];
  branchPolicies: Record<TemporalId, BranchPolicy>;
  enabledCategories: string[];
  enabledRelationTypes: string[];
};
```

The route may choose to persist some or all of this state in URL/query/session state later. The component contract should not prevent shareable observation states.

---

## 8. Visibility resolution

Visibility is not a single boolean.

Use two layers:

### Semantic admission

Is the object eligible for the current observation?

Possible reasons for exclusion:

```text
outside temporal aperture
category filter
explicit hide
isolate mode
importance threshold
relation-type filter
```

### Projection tier

If admitted, how strongly should it be rendered from the current orientation?

```ts
type ObservabilityTier =
  | "primary"
  | "secondary"
  | "ghost"
  | "suppressed";
```

A resolver should return both tier and reason data:

```ts
type VisibilityResolution = {
  tier: ObservabilityTier;
  reasons: string[];
  explicitlyControlled: boolean;
  occluded: boolean;
};
```

That reason data is important for truthful hidden-structure indicators and debugging.

### Suggested resolver order

1. explicit branch policy;
2. temporal aperture;
3. category / semantic filters;
4. focus / isolate mode;
5. pinned privilege;
6. detail threshold / importance;
7. angular frontness and observation-depth mode;
8. geometry occlusion;
9. label collision budget;
10. final tier.

Explicit user choices should dominate automatic decluttering whenever possible.

---

## 9. Tier behavior

### Primary

Use for focused, pinned, selected, or strongly front-facing structures that pass semantic filters.

May receive:

- full branch stroke/geometry;
- event markers;
- full label candidates;
- relationship detail;
- direct interaction affordances.

### Secondary

Use for nearby context.

May receive:

- full structural geometry;
- reduced event markers;
- abbreviated labels;
- interaction on hover/focus.

### Ghost

Use to retain topology and orientation.

May receive:

- faint branch silhouette;
- sparse anchor markers;
- no persistent long-form labels;
- reveal/promote affordance.

### Suppressed

Do not draw ordinary branch/event geometry in the specimen.

Instead, contribute to:

- hidden counts;
- branch-family counts;
- occlusion indicators;
- filter summaries;
- restore/reveal controls.

---

## 10. Rotation interaction

### Pointer

Horizontal drag rotates the specimen around its temporal axis.

Behavior goals:

- direct manipulation;
- no vertical-axis wobble;
- subtle physical resistance/settling;
- precision at low speed;
- no uncontrolled spin.

A small release settle is acceptable. Large inertial rotations are not.

### Rotational reference

The fixed frame should contain a subtle orientation reference so the user can perceive that the specimen moved relative to the vessel.

### Selection and surfacing

Selecting a branch should highlight it **in place** by default.

An explicit `Bring to front` action may rotate the shortest path needed to surface it. This avoids surprising large rotations while preserving the satisfying physical interaction when requested.

Search/deep-link flows may surface a target automatically if the transition clearly communicates the rotation.

### Keyboard

Minimum proposed commands:

```text
Left / Right          rotate one increment
Shift + Left / Right  rotate larger increment
Up / Down             move temporal focus/window
+ / -                 change temporal resolution
Enter                  inspect selected item
F                      focus selected branch
I                      isolate selected branch
P                      pin/unpin selected branch
Escape                 step back from isolate/focus or close inspection
```

Final shortcuts must avoid collision with site/global navigation.

---

## 11. Temporal traversal

The vessel lives inside an ordinary webpage, so the component must not casually trap page scroll.

Preferred behavior:

- normal wheel/trackpad scroll remains page scroll until the vessel is explicitly engaged;
- vertical drag inside an engaged specimen may pan the temporal window;
- dedicated temporal aperture/scroll controls remain available;
- pinch or an explicit scale control changes temporal resolution;
- on touch devices, distinguish horizontal rotation from vertical page movement with conservative gesture thresholds.

The user should never struggle to leave the component.

---

## 12. Focus, isolate, and pin

### Focus

Focus changes **emphasis**, not existence.

Recommended behavior:

- selected lineage → Primary;
- immediate relatives / relevant neighboring branches → Secondary;
- other admitted branches → Ghost;
- already suppressed branches remain Suppressed.

### Isolate

Isolation is stronger.

Recommended behavior:

- selected lineage → Primary;
- semantically connected neighborhood → Secondary or Ghost;
- unrelated admitted structure → Suppressed;
- frame displays an explicit isolation state and suppressed count.

### Pin

Pinned branches remain at least Secondary regardless of angular depth unless an explicit user filter hides them.

Pinning is useful for rotational comparison.

A pinned branch on the rear side may be rendered as a transparent/ghosted through-vessel trace rather than pretending it is physically in front.

---

## 13. Hidden-structure communication

The component must not silently discard structure.

Useful indicators include:

- rear-edge branch shadows;
- small count badges attached to branch anchors;
- `N hidden lineages` readout;
- filter summary in the frame;
- temporal-window counts above/below aperture;
- edge markers for structures outside the current time range;
- explicit `Reveal all` / `Restore observation` action.

Indicators must explain **why** content is hidden when that distinction affects interpretation.

---

## 14. Label system

Labels are the first thing likely to overwhelm the projection, so branch existence and label existence must be separate.

Suggested label priority:

1. focused branch identity;
2. selected event;
3. pinned branch identities;
4. front-facing Primary branch labels;
5. high-importance Secondary labels;
6. everything else on hover/focus/inspection.

The label resolver should have a hard viewport collision budget.

Do not shrink text below usable sizes to preserve label count.

When labels cannot fit, reduce labels before reducing structural truth.

---

## 15. Relations

Relations are optional overlays, not permanent graph spaghetti.

Default v0.1 behavior:

- lineage/branch structure is always represented;
- additional relation classes are off or sparse by default;
- enabling a relation type shows only local/currently relevant edges;
- relation lines terminate at identifiable nodes/branches;
- selected relation may receive operator emphasis;
- hidden relation count can be reported without drawing every edge.

This follows the existing Apparatus Interaction Grammar's connector discipline.

---

## 16. Visual-state semantics

Inherit the existing Boundary First apparatus palette and role semantics.

Do not invent a rainbow merely to distinguish branches.

Branch identity should be redundantly communicated through some combination of:

- label;
- morphology;
- line weight/style;
- grouping;
- marker shape;
- restrained domain accent where the broader visual grammar already defines one.

Operator agency/selection may use the existing violet semantic. Machine-state colors remain reserved for actual state meanings rather than branch categorization.

Transparency and frontness may communicate projection depth, but never carry the only copy of a meaningful state distinction.

---

## 17. Responsive projection

Follow the existing apparatus rule:

> **Reflow topologically, not miniaturize geometrically.**

### Wide viewport

Use the full rotational vessel.

### Medium viewport

Reduce radius, label density, and peripheral controls while preserving rotation if it remains comfortable.

### Narrow/mobile viewport

Prefer a planar or stepped lineage projection with the same:

- temporal window;
- selected branch;
- focus/isolate state;
- filters;
- hidden counts;
- inspector;
- branch policies.

Do not render a tiny 3D tank with unreadable labels.

---

## 18. Accessibility contract

The semantic tree must exist independently from the visual projection.

Minimum implementation requirements:

- every branch has an accessible name and ancestry;
- every event exposes time, branch, and label;
- current rotation is not required to discover an event through keyboard/tree navigation;
- hidden/suppressed counts are exposed textually;
- focus/isolate/filter state is announced;
- all observational controls are standard operable controls beneath their visual treatment;
- reduced-motion mode disables inertial settling and uses short direct transitions;
- `PlanarTimelineProjection` is available without resetting state;
- selected/focused objects remain consistent between projections.

---

## 19. Performance strategy

Optimize by **observation boundary**, not by throwing every event at the renderer.

### First line of defense

- temporal-window virtualization;
- branch-level culling;
- observability-tier culling;
- label budgets;
- relation overlays only when requested.

### Renderer escalation

Suggested progression:

```text
SVG / DOM hybrid
    ↓ if geometry count becomes a demonstrated bottleneck
Canvas geometry + DOM labels
    ↓ only if required by real scale
WebGL / GPU geometry + semantic overlay
```

Do not adopt a more complex renderer until the existing one fails measured requirements.

---

## 20. State persistence and deep links

Observation state is potentially valuable as a shareable research/publication view.

The design should therefore allow, even if v0.1 does not expose it yet:

```text
/timeline?focus=research&time=2024-2026&mode=isolate&rotation=...
```

Useful persistent fields may include:

- focused branch;
- temporal aperture;
- mode;
- enabled categories;
- enabled relation types;
- pinned branches;
- rotation.

Do not persist transient hover state.

---

## 21. Instrumentation / evaluation events

Prototype analytics should answer whether the spatial model is actually useful.

Candidate events:

```text
vessel_engaged
specimen_rotated
branch_focused
branch_isolated
branch_pinned
hidden_structure_revealed
observation_depth_changed
detail_threshold_changed
temporal_aperture_changed
planar_projection_opened
inspection_opened
observation_restored
```

Useful derived questions:

- Do users rotate to discover branches they later inspect?
- Do users use focus/isolate to reduce overload?
- Do they restore hidden structure successfully?
- Does planar fallback become a rescue path or a preferred representation?
- Where do users abandon the component?

---

## 22. Prototype slice

Use synthetic data before binding production timeline content.

Recommended test fixture:

- 6–8 major branch families;
- 20–30 subordinate branches;
- approximately 100–200 events;
- uneven event density;
- at least two periods of heavy branching;
- a few cross-branch relations;
- branches that begin/end at different times;
- enough rear occlusion to test hidden-structure indicators.

### Prototype order

#### P0 — geometry

- invariant vertical chronology;
- stable angular assignment;
- rotation;
- frontness projection;
- fixed frame.

#### P1 — observability

- four tiers;
- branch policies;
- hidden counts;
- detail threshold;
- observation-depth modes.

#### P2 — operator controls

- focus;
- isolate;
- pin;
- temporal aperture;
- inspection.

#### P3 — accessibility/responsive

- keyboard control;
- reduced motion;
- planar projection;
- mobile behavior;
- state equivalence tests.

#### P4 — visual polish

Only after representational validation:

- curved-surface compression;
- edge refraction/highlight;
- material treatment;
- subtle physical settling;
- final apparatus control morphology.

---

## 23. Acceptance criteria

The v0.1 prototype is successful when all of the following are true:

1. The time axis remains visually and semantically invariant during rotation.
2. Branch angular positions remain stable across filters and focus changes.
3. The frame remains stationary while the specimen rotates.
4. The user can distinguish foreground, secondary, ghosted, and suppressed structure.
5. Hidden content is countable/recoverable and does not masquerade as nonexistent data.
6. Focus, isolate, and pin produce distinct, reversible states.
7. Selecting or inspecting an event does not accidentally mutate topology.
8. The same observation state can be rendered in the planar fallback.
9. Keyboard and reduced-motion users can perform the core observational tasks.
10. The component remains usable at browser zoom and narrow widths.
11. The visual implementation respects existing Boundary First apparatus semantics rather than inventing a separate sci-fi theme.
12. A test user can use rotation and observability controls to make a dense synthetic timeline more legible than its unfiltered default view.

---

## 24. Non-goals for v0.1

Do not implement yet:

- arbitrary camera orbit;
- immersive 3D navigation;
- physics-engine branch motion;
- VR/AR;
- literal transparent glass simulation;
- automatic semantic inference of causal relations;
- production-scale graph rendering before the interaction model is validated;
- a unique control primitive for every dataset.

The prototype exists to test a single claim:

> **A fixed chronological axis plus rotational branch structure plus controlled observability can make dense timelines easier to inspect without destroying context.**