# Boundary First Visual Grammar
## Unification Specification v0.1

**Date:** 2026-08-25  
**Status:** design-system unification draft  
**Scope:** Boundary First UX surface morphology, edge/accessory language, Apparatus, Mermaid/UML diagrams, Context Halo, Atlas, and future spatial projections.

## 1. Governing principle

> **Information structure manifests at boundaries.**

Boundary First Visual Grammar (BFVG) is not an industrial aesthetic applied to information. It is a system for causing real information structure—containment, interfaces, relations, state, admissibility, agency, consequence, evidence, history, inspection, and repair—to acquire visible form.

Therefore:

> **Visual complexity must be earned by semantic complexity.**

A greeble, edge feature, trace, plate, notch, aperture, indicator, connector, or diagram element is legitimate when it reveals something about the represented system. If removing it changes neither what the user can understand nor what the user can do, it is decorative.

Low-contrast material texture and wear may establish maintained-instrument character, but they are non-semantic and may never imply state, defect, maturity, or authority.

---

## 2. Canonical primitive vocabulary

The existing Apparatus grammar remains the semantic kernel:

1. **Module / Boundary** — a thing with an inside, outside, identity, scope, or responsibility.
2. **Port** — a lawful interface across a boundary.
3. **Trace** — a relation, traversal, route, or connection.
4. **Gate** — a condition governing whether a transition is admissible.
5. **State Readout** — what is presently true about an object.
6. **Command** — agency available to an operator.
7. **Repair Path** — a route from a defect or failed transition toward admissibility.

`Through`, peer banks, relation banks, inspection drawers, next-step checklists, and similar structures are compositions of these primitives rather than new primitives.

---

## 3. Scale-invariance law

The grammar must recurse. The same semantic relation must remain recognizable as representation scale changes.

| Semantic idea | Micro / edge | Object / page | Mermaid / UML | Halo / Atlas |
|---|---|---|---|---|
| Boundary | seam, recess, plate edge | module / bay | node or subgraph | cluster / region |
| Interface | notch / terminal | labeled port | edge endpoint | local adjacency |
| Relation | short trace | routed connector | typed arrow | graph edge |
| Constraint | crossbar / marker | expandable gate | guarded transition | blocked edge |
| State | signal mark + text | state strip | node annotation | status annotation |
| Agency | violet control edge | command plate | actionable node/edge | selected action |
| Inspection | recess | Through aperture | inspection branch | drill-in without re-root |
| Repair | fault marker | repair route | feedback transition | recovery path |
| History | index / step | traversal trace | sequence / replay | traversed-path overlay |

The representation may change. The semantic owner may not.

---

## 4. Boundary recursion

Every major surface may itself be treated as a boundary:

```text
Application / viewport boundary
    └── projection / page boundary
          └── assembly boundary
                └── object boundary
                      └── interface / port
                            └── internal state or evidence boundary
```

The Boundary Frame is the largest-scale instance: its edges carry traversal, current focus, adjacency, search/context change, projection, and local position because those properties belong at the boundary between operator and represented space.

The same law recurses into pages, modules, diagrams, tools, and records.

---

## 5. Semantic greebling

BFVG formally adopts **semantic greebling**: accessory detail functions as interface notation rather than ornament.

Canonical accessory families include:

- terminal;
- notch;
- index mark;
- collar;
- seam;
- crossbar;
- aperture;
- signal marker;
- bus / port bank;
- retained layer;
- trace junction;
- structural bracket.

### Canonical meanings

**Terminal** — something may lawfully connect or transition here.  
**Collar** — this boundary is currently selected or bound by the operator.  
**Crossbar** — passage across this interface is constrained.  
**Recess** — inspect deeper structure without leaving the current object.  
**Signal marker** — observed state.  
**Trace junction** — relations meet, branch, or continue here.  
**Retained layer** — prior state, provenance, supersession, or underlying structure remains inspectable.

Reject fake vents, screws, bolts, rivets, glowing circuitry, gauges without measured variables, decorative wires, and other machinery whose removal loses no meaning.

> **Greebling is interface notation, not ornament.**

---

## 6. Module grammar

All bounded objects remain members of one primarily rectilinear family. Avoid a shape zoo.

Three structural morphologies are canonical:

### Backplane
A bounded working region containing several subsystems.  
**Canonical use:** Root.

### Assembly
A subject plus contained objects and selected local relationships.  
**Canonical use:** Branch.

### Instrument
One consequential object under close inspection.  
**Canonical use:** Leaf.

> **Root is a backplane. Branch is an assembly. Leaf is an instrument.**

Content type is expressed primarily through explicit labels, relation structure, state, and restrained edge/accessory morphology—not arbitrary silhouette changes.

---

## 7. Edge grammar

Edges are active semantic surfaces.

Suggested reinforcement:

```text
top edge       contextual / containing interface
bottom edge    contained traversal
left / right   typed cross-relations
interior well  Through / retained-record inspection
outer chassis  peer / structural interface
```

Placement is never the sole semantic carrier. Every meaningful interface retains a readable relation/action label and accessible name.

---

## 8. Port grammar

The Port is a primary BFUX motif.

Canonical forms:

```text
DEPENDS ON / EXECUTABLE REPRESENTATION   ▮
```

or compactly:

```text
[ EXECUTABLE REPRESENTATION ]▮
```

A port communicates:

- relation or action;
- target;
- availability;
- operator focus.

Port classes share one physical family. Meaning comes from label + relation + placement + adjacent state/gate.

> **Ports carry meaning before wires do.**

---

## 9. Trace and connector grammar

Connectors are **traces**, not wires.

Default traits:

- orthogonal routing;
- restrained contrast;
- minimal crossings;
- local routing within the owning assembly;
- readable endpoints;
- one stable relation label.

Default density budget:

```text
persistent local relations <= 3
selected additional relation <= 1
```

Overflow collapses into a **Port Bank**:

```text
RELATIONS · 5
├─ grounds / Distinction Space
├─ documents / Executable Representation
├─ demonstrates / Corpus Forge
└─ +2 more
```

The data graph may be dense. The active representation should not be.

---

## 10. Gate grammar

A Gate belongs to a transition, not generically to an object.

Closed:

```text
RELEASE ▮  WAITING · 1 CONDITION
```

Expanded:

```text
RELEASE
├─ Tests              ADMISSIBLE
├─ Security review    ADMISSIBLE
├─ Owner approval     WAITING
└─ Deployment slot    ADMISSIBLE

STATE PRESERVED: REVIEWED BUILD
NEXT: obtain owner approval
```

A gate represents:

```text
current state
+ desired transition
+ conditions
+ failed / missing condition
+ preserved state
+ possible repair
```

Gate detail expands in context from the constrained transition rather than defaulting to a detached modal.

---

## 11. State grammar

State reports. It does not invite action.

```text
STATE  ●  WORKING PUBLIC
```

Independent state systems remain independent:

```text
PUBLICATION   ● WORKING PUBLIC
CLAIM         ● PRACTITIONER METHOD
DELIVERY      — NOT APPLICABLE
```

Research maturity, institutional force, product lifecycle, collaboration lifecycle, publication stage, and operational standing must never silently collapse into one generic status ladder.

---

## 12. Command grammar

Commands represent **agency**:

```text
[ ENTER ]
[ INSPECT ]
[ OPEN SOURCE ]
[ REWIND ]
[ REQUEST REVIEW ]
```

Canonical color law:

> **Metal = structure. Violet = agency / operator focus. State colors = observed state.**

Green does not mean “click me.” Violet means “you may act here.”

---

## 13. Through grammar

`Through` means:

> **Inspect through this boundary without changing conceptual location.**

```text
TRAVERSE
current object → another object

THROUGH
current object → deeper inspection of current object
```

Through should visually recess rather than protrude. Traverse, Through, and projection/depth change remain distinct operations throughout the system.

---

## 14. Mermaid / UML as the schematic register

Mermaid/UML diagrams are not external illustrations. They are the **schematic representation of the same BFVG grammar**.

A content surface may say:

```text
[ CLAIM ]▮── grounded by ──▮[ SOURCE ]
```

The schematic projection says:

```text
SOURCE ──grounds──▶ CLAIM
```

The Halo and Atlas preserve the same relation at different spatial scales.

One semantic graph may therefore be projected as:

- Guided Sequence;
- Atlas;
- Context Halo;
- Lineage Lens;
- Work & Evidence;
- Institutional Closure Map;
- Collaboration Path;
- Node / Record Detail;
- Structure / Schematic.

The renderer chooses morphology. It does not redefine semantics.

---

## 15. Diagram families

A node or domain may expose a **Structure** projection when meaningful structure actually exists.

Canonical families:

### Containment / assembly
```text
System
├── subsystem
├── subsystem
└── subsystem
```

### Dependency
```text
A → B → C
```

### Lifecycle
```text
Inquiry → Scope → Active → Review → Release → Closure
```

### Gate / promotion
```text
Candidate → evidence → review → gate → maintained state
```

### Governance / authority
```text
authorized by
bound by
reviewed by
stewarded by
contestable by
repairable by
```

### Evidence / claim
```text
source → observation → evidence → claim → review
```

### Defect / repair
```text
state → failed boundary → defect → repair → re-evaluation
```

---

## 16. Diagram rules

A BFVG diagram MUST:

1. derive semantic content from canonical records whenever possible;
2. preserve typed edges;
3. preserve direction where direction matters;
4. distinguish containment from relation;
5. expose state text rather than relying on color;
6. label non-obvious relations;
7. preserve gates and repair loops;
8. progressively disclose density;
9. offer a linear/textual equivalent;
10. never invent a relation to improve composition.

A diagram MUST NOT become a second uncontrolled content model.

Suggested secondary line grammar:

```text
solid       asserted structural relation
arrow       direction / transition
dashed      conditional / feedback / repair route
highlight   selected relation
dim         contextual relation
```

Relation type + label remain primary. Explicit non-equivalence remains textual where needed (`review ≠ endorsement`, `funding ≠ authority`).

---

## 17. Universal interaction lifecycle

The spatial-pointer work generalizes cleanly into a universal BFUX interaction lifecycle:

```text
ORIENT → PROBE → BIND → ACT
```

**Orient** — understand the field without commitment.  
**Probe** — expose candidate target, relation, state, and consequence.  
**Bind** — select an object/relation and make its local frame explicit.  
**Act** — perform an available transition or operation.

For low-consequence traversal, Bind and Act may collapse into one gesture. For consequential mutation they should remain distinguishable.

---

## 18. Context Halo

The Context Halo is the mesoscopic expression of BFVG. Independent relation dimensions remain independent:

```text
semantic affinity       → angle
structural distance     → radius
relationship strength   → edge weight
sharedness              → edge count / summary
evidence maturity       → annotation / filtering
```

Do not flatten these into one hidden relevance score.

The Halo is not a decorative force-directed graph. It is an explicit projection of typed local relationships.

---

## 19. Atlas

The Atlas is the same grammar at a larger scale.

Semantic zoom:

```text
FAR
programs / domains / large bounded regions

MIDDLE
facets / projects / methods / products

NEAR
claims / evidence / roles / relations / gates
```

Continuity should be visible:

```text
module → cluster
port → adjacency
trace → graph edge
gate → constrained transition
state → node annotation
Through → inspect
repair → path
```

The Atlas should therefore feel learned rather than newly introduced.

---

## 20. Responsive law

> **Responsive design preserves semantics, not geometry.**

Canonical topology progression:

```text
WIDE    spatial assembly
MEDIUM  banked assembly
NARROW  linear control path
```

Example:

```text
A ▮──────── grounds ────────▮ B
```

may become:

```text
A
grounds → B
```

The wire disappears. The relation survives.

A Mermaid/UML diagram may similarly become a structured relation list instead of shrinking until labels become unreadable.

---

## 21. Material and color law

Canonical semantic palette:

```text
Metal     structure
Violet    operator agency / focus
Green     admissible / verified
Amber     provisional / waiting / incomplete
Blue      informational / recorded standing
Red       actual defect / violated invariant
Gray      unknown / unavailable / not established
```

Color must always be redundant with text, geometry, marker, or relation state.

Physical hierarchy:

```text
Iron chassis
Gunmetal backplane
Steel module
Raised operator surface
Recessed inspection surface
Alloy structural line
```

Avoid arbitrary z-depth and heavy skeuomorphism.

---

## 22. Motion grammar

Motion communicates the class of transformation:

```text
Traverse   slight lateral movement
Through    recess / open inward
Depth      reassemble / crossfade around fixed Focus
Gate       expand from constrained transition
State      restrained local update
Repair     reveal path from exact failure point
```

Motion never creates semantics unavailable without motion. Reduced-motion mode preserves distinctions through boundary, position, labels, and immediate state replacement.

---

## 23. Semantic truth contract

Every semantic visual element requires a truthful source.

- state marker → recorded state;
- trace → actual relation or traversal;
- gate → real condition;
- red marker → actual recorded defect;
- command → actual capability;
- port → real target/interface;
- diagram edge → actual relationship;
- count → actual data.

Generated visual studies may specify hierarchy, composition, control morphology, material relationships, rhythm, and icon language. They do not authorize fictional telemetry, authority, state, relationships, or controls.

---

## 24. Density law

BFUX should represent **less than it knows**.

Initial active-subject budgets:

```text
persistent routed relations    <= 3
selected extra relation        <= 1
primary commands               <= 4
visible state axes             <= 3
open gate detail               <= 1
open Through aperture          <= 1
```

> **Never reduce legibility to preserve simultaneity.**

Collapse. Bank. Summarize. Inspect deeper. Change projection.

---

## 25. Accessibility as projection

Accessibility is another lawful representation of the same semantics.

Graphical:

```text
A ──depends on──▶ B
```

Textual:

```text
A
Depends on: B
```

Required properties include:

- keyboard Probe parity with hover;
- visible focus;
- readable labels;
- explicit state text;
- screen-reader relation summaries;
- reduced-motion parity;
- forced-colors support;
- 200% / 400% zoom preservation;
- no microscopic diagram text.

---

## 26. Visual grammar test

Every proposed BFUX element should answer at least one structural question:

- **Boundary** — What belongs to what?
- **Interface** — Where may something cross?
- **Relation** — What is connected, and how?
- **State** — What is presently true?
- **Constraint** — What permits or blocks transition?
- **Agency** — What may the user actually do?
- **Consequence** — What changes if they do it?
- **Inspection** — Can they deepen without relocating?
- **History** — What actually happened?
- **Repair** — What happens when something fails?

If a visual element answers none of these, it probably does not belong.

---

## 27. Removal test

For every greeble, remove it mentally.

If nothing is lost—no relationship, state, interaction, orientation, hierarchy, constraint, or affordance—remove it physically.

This is the primary defense against industrial cosplay while preserving a visually rich apparatus.

---

## 28. Translation test

Take any semantic relationship and render it at multiple scales.

Example:

### Object
```text
EXECUTABLE REPRESENTATION
DEPENDS ON / DISTINCTION SPACE ▮
```

### Assembly
```text
Executable Representation ▮──── depends on ────▮ Distinction Space
```

### Diagram
```text
Executable Representation ──depends on──▶ Distinction Space
```

### Atlas
Two spatial nodes connected by a `depends on` relation.

If the meaning changes across representations, the grammar has failed.

---

## 29. Production architecture

```text
Semantic Graph
      │
      ▼
Boundary First Visual Grammar
      │
      ├── Card / content projection
      ├── Apparatus projection
      ├── Structure / Mermaid projection
      ├── Evidence projection
      ├── Context Halo
      └── Atlas
```

> **The renderer chooses morphology. It does not redefine semantics.**

---

## 30. Initial implementation slice

1. Canonical BFVG primitives/components:
   - Boundary
   - Port
   - Trace
   - Gate
   - State
   - Command
   - Through
   - Repair
2. One unified Mermaid theme using the same material/state/agency rules.
3. Five live Structure diagrams:
   - Institutional Closure Map
   - Governance Lens
   - Collaboration Lifecycle
   - Collaboration Evidence Loop
   - Product Stewardship Gate
4. One leaf instrument: Software Before Code.
5. One branch assembly: Software.
6. Context Halo.
7. Atlas-scale continuation.

This sequence proves the grammar across scales before attempting a full spatial environment.

---

## 31. Compact doctrine

> **Structure has material.**  
> **Boundaries have interfaces.**  
> **Interfaces have ports.**  
> **Relations leave traces.**  
> **Transitions encounter gates.**  
> **Objects report state.**  
> **Operators exercise commands.**  
> **Defects expose repair paths.**  
> **Traversal leaves history.**  
> **Inspection goes Through.**  
> **Diagrams are schematics of the same system.**  
> **The Atlas is that same grammar at another scale.**

> **Boundary First UX has one visual grammar from the smallest edge detail to the largest map of the system.**

---

## Related backlog material

This document unifies and should be read with:

- `bfl_boundary_first_ux_guide_v0_6.md`;
- `bfl_boundary_first_ux_mermaid_wireframes_v0_6.md`;
- `bfl_apparatus_interaction_grammar_v0_1.md`;
- `bfl_apparatus_static_studies_v0_1.md`;
- `bfl_apparatus_visual_morphology_v0_1.md`;
- `2026-08-23_traversal_apparatus_refinement/DESIGN_INVARIANTS.md`;
- `bfl_context_halo_ordering_placement_spec_v0_1.md`;
- `../4_boundary_first_spatial_ux_design_archive_2026-08-01/`.

Those documents remain specialized specifications and design evidence. This document establishes the common visual-semantic grammar connecting them.