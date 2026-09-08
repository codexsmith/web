# Adaptive Machine Card Projection Grammar
## Version 0.1 — design contract before consolidation implementation

**Status:** design contract; implementation intentionally deferred  
**Scope:** Lab Machine cards and relation-rail projections  
**Primary evidence:** current Core / Full responsive implementation pass  
**Related doctrine:** `DESIGN_INVARIANTS.md`, `bfl_apparatus_interaction_grammar_v0_1.md`

---

## 1. Problem statement

The current responsive pass has established that a machine card is not a fixed visual component that is merely resized at browser breakpoints.

The same semantic node has several lawful representations depending on the space allocated to it, the apparatus projection in which it appears, and the user's current attention.

A useful abstract model is:

\[
R = P(S, G, C, A)
\]

where:

- `S` = semantic source / node role;
- `G` = geometry actually allocated to the card;
- `C` = apparatus context;
- `A` = attention / focus state;
- `R` = rendered representation.

The design problem is therefore not "make the card responsive."

It is:

> **Choose the smallest lawful representation that preserves the semantics required by the current context.**

This is an extension of the existing BF-UX invariant:

> **Responsive design is projection, not shrinkage.**

---

## 2. Evidence from the current implementation pass

The mobile apparatus work has already exposed multiple stable representation regimes.

### Tour / About

At generous responsive widths they behave as compact launchers with icon + eyebrow + title.

At the narrowest Relations-open geometry the same nodes are better represented as header-only plates:

```text
WHY
About

START HERE
Tour
```

The long Tour label is not useful in that projection; the semantic short identity `Tour` is sufficient.

### People / Products / Publications

At ordinary responsive widths they can occupy a three-card row and use a horizontal compact form:

```text
[ icon ]  eyebrow
          title
```

At narrower widths they can collapse to a vertical micro-control without losing identity.

### Research

Research is not merely another navigation card. It is the structural hub and visual engine of the machine.

It therefore preserves more chassis than its neighbors and, in very narrow structural projections, may retain extra block-size even after explanatory content is removed so multiple relation ports remain physically legible.

### Pipeline / Method / Timeline / Governance

In Full they are subordinate controls below Research.

When the relation gutter already exposes structure, these machine-side cards can collapse aggressively to identity plates because displaying a second full work surface would duplicate information and weaken Research as the anchor.

### Relation rail

The relation rail has a separate focus-dependent behavior. Cards farther from visual focus can show only identity; near/focused cards progressively expose relation type, target, and additional local structure.

This is not the same axis as geometric compression.

---

## 3. Core doctrine

### 3.1 The semantic object is invariant

A card representation may omit information from the current visual projection, but it must not invent a different semantic object.

Label, question/eyebrow, boundary, state, metadata, and canonical relations continue to originate from the shared machine model.

### 3.2 Geometry is local

Responsive presentation should depend primarily on the geometry allocated to the card or its immediate rack, not on global viewport width.

A phone-width viewport can give radically different card geometry depending on:

- Core vs Full;
- relation gutter closed vs open;
- two-card vs three-card row;
- device orientation;
- browser zoom;
- future embedding context.

Therefore:

> **Card projection follows container geometry before viewport geometry.**

Viewport media queries remain legitimate for environment-level behavior, but they should not be the primary source of truth for internal card morphology.

### 3.3 Content determines chassis size

Except where topology requires a physical port field, cards should size from:

```text
content + bounded padding + bounded gap
```

not:

```text
fixed chassis height + leftover empty area
```

Research is the current important exception: hub geometry may intentionally preserve additional block-size to carry multiple distinct ports.

### 3.4 Compression removes secondary semantics before identity

The preferred information-removal sequence is:

```text
metadata/footer
→ boundary/explanation
→ icon hardware
→ eyebrow
→ title
```

Title / accessible identity is the final invariant.

No representation may depend on unreadably small text to preserve an earlier visual arrangement.

### 3.5 Representation and attention are orthogonal

Geometry answers:

> How much representation can fit here?

Attention answers:

> How much of the available representation matters right now?

Do not collapse these into one state machine.

---

## 4. Semantic facets

A machine node currently exposes some or all of these facets:

| Facet | Current source | Meaning |
|---|---|---|
| `label` | `LabMachineNode.label` | durable identity |
| `eyebrow` | `LabMachineNode.question` | semantic role / question |
| `icon` | renderer mapping | visual identity redundancy |
| `boundary` | `LabMachineNode.boundary` | explanatory boundary statement |
| `state` | `LabMachineNode.state` | observed standing |
| `meta` | `LabMachineNode.meta` | secondary machine metadata |
| `relations` | `labMachineEdges` | canonical topology |
| `tone` | `LabMachineNode.tone` | established machine signal / identity tone |

The current model already contains semantic `kind`; presentation policy must not casually duplicate this with another independent taxonomy.

`Tour` remains a special apparatus object rather than a canonical `LabMachineNode` and needs an explicit presentation adapter.

---

## 5. Geometry projection states

The first shared vocabulary is four geometric representations.

### 5.1 Surface

A bounded object under direct inspection.

Typical available facets:

```text
icon
+ eyebrow
+ title
+ boundary/context
+ state/meta where useful
```

Use when the object is the primary subject or sufficient geometry exists and explanatory context materially helps.

### 5.2 Control

A compact navigational or operational control.

Typical facets:

```text
icon
+ eyebrow
+ title
```

Preferred layout when width permits:

```text
[ icon ]  eyebrow
          title
```

### 5.3 Plate

A highly compressed but still typed identity surface.

Typical facets:

```text
eyebrow
+ title
```

Icons and explanatory copy are removed before text is made too small.

### 5.4 Micro

The minimum durable identity projection.

Typical facets:

```text
title / explicit short label
```

Micro must not derive mysterious abbreviations automatically. If a shorter visible identity is needed, it must be an explicit semantic alias such as `Tour` for `Tour & takeaways`.

---

## 6. Attention states

Attention is currently most useful in the relation rail and should remain a separate axis.

### Far

Show the minimum identity needed to preserve one-to-one correspondence.

### Near

Expose the primary local relation.

### Focused

Expose primary relation plus additional local structure when space allows; modestly strengthen scale / contrast / pipe emphasis.

Attention transitions must not destabilize the source-card topology or cause large layout jumps.

A compact card may therefore be described as:

```text
role: navigation
geometry: plate
attention: focused
```

and reveal more relation information without becoming a full Surface.

---

## 7. Presentation roles

Version 0.1 should derive presentation role from existing machine semantics rather than adding a second free-form role field to `LabMachineNode`.

Provisional mapping for the current Lab Machine:

| Presentation role | Current nodes | Existing semantic source |
|---|---|---|
| `launcher` | About | `identity` |
| `launcher-special` | Tour | apparatus adapter |
| `navigation` | People, Products, Publications | `transparent`, `package`, `publication` |
| `hub` | Research | `core` |
| `operation` | Pipeline, Method, Timeline | `pipeline`, `attachment`, `record` |
| `authority` | Governance | `authority` |

This mapping is intentionally narrow.

If later machines demonstrate that `LabMachineNode.kind` and presentation responsibility are genuinely independent, an explicit presentation role may be admitted. Do not add it merely because the current CSS has node-specific selectors.

---

## 8. Role-specific compression policy

### Launcher

Priority:

```text
identity → immediate invitation
```

Preferred progression:

```text
Control → Plate → Micro
```

Boundary copy is expendable early.

### Navigation

Priority:

```text
identity → semantic category → target recognition
```

Preferred progression:

```text
Control → vertical Control → Plate
```

Three-across grouping may be preserved while internal morphology changes.

### Hub

Priority:

```text
identity → structural dominance → usable relation-port field
```

Preferred progression:

```text
Surface → compact Surface → hub Plate
```

Hub may retain deliberate block-size after content compression when incident relation routing needs physical separation.

Hub should not automatically collapse to the same chassis dimensions as ordinary controls.

### Operation

Priority:

```text
identity → operational relation to hub
```

Preferred progression:

```text
Control → Plate
```

When a relation gutter already explains the topology, explanatory boundary copy is redundant and should disappear early.

### Authority

Priority:

```text
authority identity → constraint relationship
```

Preferred progression:

```text
slim Control → Plate
```

Governance should remain visibly subordinate to Research rather than becoming another full work surface.

---

## 9. Apparatus context

Geometry selection is constrained by the current apparatus projection.

### Core / closed Relations

Preserve the public hierarchy:

```text
Tour + About
People + Products + Publications
Research
```

### Core / open Relations

Machine cards contract to preserve a usable structural gutter.

Source cards provide identity and attachment geometry; the gutter provides local topology and attention-dependent relation detail.

### Full / closed Relations

Preserve the extended hierarchy:

```text
Tour + About
People + Products + Publications
Research
Pipeline + Method + Timeline
Governance
```

Research remains the central visual anchor.

### Full / open Relations

Machine-side operational cards may compress more aggressively because their structural relation to Research is simultaneously represented in the gutter / pipe layer.

Do not duplicate full explanatory surfaces on both sides.

---

## 10. Selection responsibility: CSS first, measurement only where necessary

### CSS / container-query responsibility

Use card/rack container geometry for:

- internal horizontal vs vertical arrangement;
- icon visibility and size;
- boundary visibility;
- eyebrow visibility;
- padding / gap scale;
- typography scale within readable bounds;
- intrinsic chassis sizing.

The intended implementation direction is to make the card (or an immediate wrapper) an inline-size query container and let descendants choose their lawful representation from actual allocated width.

Avoid using JavaScript merely to reproduce width breakpoints.

### JavaScript responsibility

Use measured geometry only when the behavior depends on relationships CSS cannot express cleanly, including:

- viewport-relative fisheye focus;
- source/target pipe coordinates;
- offscreen continuation routing;
- collision-aware lane / port allocation;
- persistent interaction state such as relation reveal onboarding.

The existing relation layer is therefore correctly measurement-driven; ordinary card compression should become increasingly container-driven.

---

## 11. Proposed presentation contract

The renderer should eventually expose a small stable semantic contract rather than encoding every decision in node-id selectors.

A conceptual contract is:

```ts
type MachineCardProjection =
  | "surface"
  | "control"
  | "plate"
  | "micro";

type MachineCardAttention =
  | "far"
  | "near"
  | "focused";
```

A projection policy consumes:

```ts
{
  kind,
  nodeId,
  apparatusResolution,
  relationReveal,
  availableInlineSize,
  attention,
  relationDegree
}
```

and determines the lawful representation.

This is a conceptual API only in v0.1. Do not implement it until the validation matrix below is complete.

---

## 12. Content visibility matrix

Default facet policy:

| Facet | Surface | Control | Plate | Micro |
|---|---:|---:|---:|---:|
| title | yes | yes | yes | yes |
| eyebrow | yes | yes | yes | optional |
| icon | yes | yes | no | no |
| boundary/context | yes | no | no | no |
| state | contextual | no | no | no |
| meta/footer | contextual | no | no | no |
| relation ports | contextual | contextual | contextual | contextual |

Role policy may strengthen this minimum but should not silently weaken durable identity.

---

## 13. Topology and relation-port invariants

Card compression must not invalidate the relation layer.

1. A canonical edge remains structural even when one endpoint scrolls offscreen.
2. Visible endpoints attach to the actual card chassis boundary.
3. Shared hubs receive distinct fan-in / fan-out ports.
4. Hub block-size may be preserved to provide a usable port field.
5. Geometry compression must trigger pipe remeasurement without changing edge semantics.
6. Relation cards and source cards are different projections of the same canonical relation data.

The relation layer may respond to changing card geometry; it must never become the source of truth for node identity or topology.

---

## 14. Accessibility invariants

Compression must preserve accessibility rather than merely visual identity.

- accessible names remain durable across projections;
- shortened visual labels do not replace the full accessible identity;
- keyboard / DOM traversal order remains semantic order, not visual CSS order alone;
- text remains readable before icon/chrome is preserved;
- color never becomes the sole identity or relation carrier;
- focus indication survives every geometry tier;
- reduced motion removes fisheye animation without removing information;
- relation reveal remains reachable without a gesture-only interaction.

---

## 15. Validation matrix before implementation

Do not begin consolidation until the following states have explicit expected representations.

### Apparatus states

- Core / Relations closed
- Core / Relations open
- Full / Relations closed
- Full / Relations open

### Geometry studies

At minimum inspect allocated card/rack widths representative of:

- generous tablet / browser-width responsive rack;
- ordinary phone;
- narrow phone;
- ultra-small relation-open rail;
- browser zoom / text growth where practical.

The threshold should be chosen from **content fit**, not from familiar device labels.

### Required representative nodes

- Tour — special launcher
- About — launcher
- People — navigation
- Publications — longest common navigation label
- Research — hub / high relation degree
- Pipeline — operation
- Timeline — operation with different semantics
- Governance — authority

### Assertions

Every study must verify:

- no clipped title or eyebrow;
- no meaningful text smaller merely to preserve geometry;
- no unexplained empty chassis;
- no relation endpoint detached from the visible card boundary;
- no pipe collision caused by compression;
- no card-specific content duplicated unnecessarily in the gutter;
- Research remains visually dominant in Full;
- Core and Full preserve semantic ordering;
- keyboard order remains lawful;
- full accessible identity survives visual short-label projection.

---

## 16. Migration plan

### Phase 0 — freeze discovery

Do not delete the current working responsive selectors yet. They are the empirical corpus from which the generalized grammar is being extracted.

### Phase 1 — inventory existing rules

Classify every current mobile-machine override into:

```text
topology
role
geometry projection
attention
relation routing
legacy conflict override
```

Anything that cannot be classified should be questioned before migration.

### Phase 2 — build a static projection matrix

Create a non-production study showing representative nodes in every geometry / context state.

The purpose is to tune thresholds and content policy without scrolling the full site repeatedly.

### Phase 3 — introduce shared projection primitives

Only after the matrix converges:

- introduce card/rack container-query ownership;
- introduce shared role selectors / adapters;
- preserve existing DOM semantics;
- keep relation measurement code independent.

### Phase 4 — migrate by role

Suggested order:

1. Tour / About launchers;
2. People / Products / Publications navigation controls;
3. Research hub;
4. Pipeline / Method / Timeline operational controls;
5. Governance authority control;
6. relation-rail card presentation.

Each migration must achieve visual/interaction parity before deleting the old node-specific override block.

### Phase 5 — remove superseded CSS

Only after all role families have migrated:

- delete duplicate viewport-specific card morphology;
- retain environment/topology breakpoints where still meaningful;
- preserve explicit exceptional rules only where the semantics are actually exceptional.

---

## 17. Implementation gate

Implementation may begin when all of the following are true:

- the four projection states are accepted;
- role mapping is accepted;
- the Core / Full context matrix is accepted;
- representative static studies identify transition thresholds from content fit;
- Research hub port-field behavior is explicitly specified;
- visual short-label behavior is explicit rather than generated accidentally;
- CSS vs JavaScript ownership is agreed;
- migration can proceed without changing canonical node or edge data.

Until then, additional selector tuning should be treated as evidence gathering, not architecture.

---

## 18. Compact doctrine

> **A machine card is a semantic object with multiple lawful geometric projections.**

> **Container geometry determines what can fit. Semantic role determines what must survive. Attention determines what should be revealed now.**

> **Compress information by priority; never compress meaning into illegibility.**
