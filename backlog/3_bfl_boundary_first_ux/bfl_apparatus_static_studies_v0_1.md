# Boundary First Apparatus Static Studies
## Version 0.1 — root, branch, and leaf studies before renderer implementation

**Status:** static design studies; not production UI  
**Depends on:** `bfl_apparatus_interaction_grammar_v0_1.md`  
**Renderer state:** Card active; Apparatus reserved  
**Purpose:** test topology and interaction ownership before creating apparatus components or CSS

---

## 1. Study rules

These are **semantic wireframes**, not visual comps. They intentionally avoid detailed sizing, decorative materials, animation, icon shapes, or final connector routing.

Every study must use the same seven primitive classes:

1. Module / boundary
2. Port
3. Trace
4. Gate
5. State readout
6. Command
7. Repair path

And every study is judged against the same seven questions:

```text
Boundary    What belongs to what?
State       What condition is the subject in now?
Path        How did I arrive, and what can I reach next?
Constraint  What blocks or qualifies a transition?
Agency      Where can I act?
Consequence What changes if I act?
Recovery    What remains and how can failure be repaired?
```

No study may improve itself by changing the underlying BFL graph, content, traversal semantics, or publication/process state.

---

# Study A — Root apparatus
## Boundary First Labs / `/?world=1`

### Source facts represented

The entered Root World contains five first-class regions:

```text
Products
Public Interest
Research
Publications
About
```

The hero remains outside this assembly as the entry threshold. Root itself is not a sixth destination card.

### Primary burden

Can a visitor understand one institutional chassis containing five independent public regions **without** recreating a conventional nav bar, dashboard, or set of decorative cards?

### Wide semantic wireframe

```text
┌─ IRON CHASSIS · BOUNDARY FIRST LABS ────────────────────────────────────────────┐
│                                                                                │
│  TRACE                                                                         │
│  [ ROOT ● ]                                                                    │
│                                                                                │
│  ┌─ GUNMETAL BACKPLANE · ROOT WORLD ─────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  Five bounded public bays                                                 │ │
│  │                                                                           │ │
│  │  ┌─ PRODUCTS ──────────┐   ┌─ PUBLIC INTEREST ──┐   ┌─ RESEARCH ───────┐ │ │
│  │  │ built / developing │   │ public-purpose     │   │ methods / testbeds│ │ │
│  │  │ / planned work     │   │ work               │   │ / foundations     │ │ │
│  │  │             [ENTER]◉│   │            [ENTER]◉│   │           [ENTER]◉│ │ │
│  │  └────────────────────┘   └─────────────────────┘   └───────────────────┘ │ │
│  │                                                                           │ │
│  │        ┌─ PUBLICATIONS ─────────┐       ┌─ ABOUT ─────────────────┐        │ │
│  │        │ written-work pipeline │       │ institution / provenance│        │ │
│  │        │                [ENTER]◉│       │                 [ENTER]◉│        │ │
│  │        └───────────────────────┘       └─────────────────────────┘        │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                │
│  DEPTH   [ WORLD ● ] [ RECORD ] [ EVIDENCE ] [ GESTALT ]                       │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Primitive mapping

| Apparatus primitive | Root use |
|---|---|
| Module / boundary | Chassis, root backplane, five public bays |
| Port | Each bay exposes one labeled `ENTER` traversal port |
| Trace | `ROOT` is the current traversal endpoint |
| Gate | None by default; all five root regions are traversable |
| State readout | Not required for Root itself unless a real institutional state is being shown |
| Command | Enter a region; change Depth |
| Repair path | Not present in the nominal state |

### Important negative space

The Root apparatus **does not** show:

- a second top navigation containing the same five regions;
- a giant central `Boundary First Labs` module repeating the hero;
- cross-domain edges among all five regions;
- publication counts, product counts, or status dashboards merely because data exists;
- decorative gauges or global “system health.”

The five bays are enough.

### Interaction ownership

- Selecting an `ENTER` port changes Focus and appends the target to Focus traversal history.
- The selected bay may receive a violet boundary/port treatment only during operator targeting.
- The bay itself remains structural steel; it does not become violet as a permanent identity color.
- Depth changes representation of Root; it does not add a traversal step.

### Responsive collapse

At constrained width the five-bay topology becomes a single ordered bank:

```text
ROOT
 │
 ├─ Products          [ENTER]
 ├─ Public Interest   [ENTER]
 ├─ Research          [ENTER]
 ├─ Publications      [ENTER]
 └─ About             [ENTER]
```

This is still the same apparatus. It is **not** a miniature desktop diagram.

### Expressive audit

| Question | Result |
|---|---|
| Boundary | Strong — chassis/backplane/bays make containment explicit |
| State | Intentionally quiet — no fake global status required |
| Path | Strong — Root trace endpoint visible |
| Constraint | N/A nominally; no fabricated gates |
| Agency | Strong — only labeled `ENTER` ports + Depth controls use action treatment |
| Consequence | Clear — Enter changes Focus to that region |
| Recovery | Existing Back / trace semantics remain available after traversal |

### Finding A

**Root should feel like a backplane with five attached public subsystems, not a home-page dashboard.** The apparatus earns its difference from Card by making containment and entry points physically explicit while remaining semantically sparse.

---

# Study B — Branch apparatus
## Software / `/research/software`

### Source facts represented

Software is a Research branch described as a coherent lane around boundaries, ontology, executable representation, architecture, UX, verification, and governance.

Its contained modules are:

```text
Boundary First Engineering      developed doctrine
Ontological Software            method
Executable Representation      method + inspections
Boundary First Architecture     method
Boundary First UX               developed standard / launch candidate
Verification & Governance       method + inspection
```

Relevant local typed relationships include:

```text
Ontological Software       --depends on--> Executable Representation
Boundary First Engineering --contains----> Boundary First Architecture
Boundary First UX          --applies to--> Executable Representation
```

Additional external relations exist from these contained objects, but the apparatus should not draw all of them simultaneously.

### Primary burden

Can a branch show **containment and selected local relationships at the same time** without becoming graph spaghetti or a six-card grid with decorative wires?

### Wide semantic wireframe

```text
┌─ CHASSIS ────────────────────────────────────────────────────────────────────────┐
│ TRACE  Root ─ Research ─ [ SOFTWARE ● ]                                          │
│                                                                                 │
│ ┌─ SUBJECT ASSEMBLY · SOFTWARE ────────────────────────────────────────────────┐ │
│ │ Software doctrine                                                           │ │
│ │ A coherent software lane: boundaries, ontology, executable representation,  │ │
│ │ architecture, UX, state, verification, and governance.                      │ │
│ │                                                                             │ │
│ │ [More context · N]                                      [Depth / Through]   │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ ┌─ CONTAINED MODULE FIELD ────────────────────────────────────────────────────┐ │
│ │                                                                             │ │
│ │ ┌ ENGINEERING ───────────┐       contains       ┌ ARCHITECTURE ──────────┐ │ │
│ │ │ STATE: DEVELOPED  BLUE │◉────────────────────◉│ dependency structure  │ │ │
│ │ │ Make boundaries...     │                      │                         │ │ │
│ │ │ [ENTER]◉               │                      │ [ENTER]◉                │ │ │
│ │ └────────────────────────┘                      └─────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ┌ ONTOLOGY ──────────────┐      depends on      ┌ EXECUTABLE REP. ───────┐ │ │
│ │ │ Determine what exists… │◉────────────────────◉│ Software as executable│ │ │
│ │ │ [ENTER]◉               │                      │ representation         │ │ │
│ │ └────────────────────────┘                      │ [THROUGH · 2]◉         │ │ │
│ │                                                 │ [ENTER]◉               │ │ │
│ │ ┌ BFUX ──────────────────┐      applies to      └─────────────────────────┘ │ │
│ │ │ STATE: DEVELOPED /     │◉──────────────────────────┘                     │ │
│ │ │ LAUNCH CANDIDATE BLUE  │                                                │ │
│ │ │ [STANDARD] [ENTER]◉    │        ┌ VERIFICATION & GOVERNANCE ──────────┐ │ │
│ │ └────────────────────────┘        │ testing / authority / repair       │ │ │
│ │                                   │ [THROUGH · 1]◉  [ENTER]◉           │ │ │
│ │                                   └─────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ PEERS  Applied Testbeds · Foundations · Formal Theory                            │
│ DEPTH  [ WORLD ● ] [ RECORD ] [ EVIDENCE ] [ GESTALT ]                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Why connectors are selective

Only the three high-value **local** relations among currently visible modules are drawn.

External relations such as Corpus Forge demonstrating Executable Representation do not get permanent lines in this branch view. They should remain available through a labeled relation port / local port bank on the relevant module or after entering that module.

This preserves the distinction:

```text
visible local topology ≠ every known graph edge
```

### Module anatomy

A branch-contained module may contain at most these immediate layers:

```text
TYPE / short label
Name
one-line purpose
optional state readout
up to one or two high-value ports
ENTER command port
```

It should **not** become the full Card Overview inside a smaller box.

### State semantics

Boundary First Engineering and Boundary First UX both have developed standing in current records. That standing can appear as a blue informational readout because the interface is reporting recorded lifecycle state.

The violet `ENTER` port remains separate.

```text
BLUE = what the record says the object currently is
VIOLET = what the operator can do next
```

This study therefore tests the agency/state distinction directly.

### Through semantics

Executable Representation has two inspectable records. Verification & Governance has one.

The branch apparatus may expose compact `THROUGH · N` ports on those modules because inspection exists without requiring Focus traversal.

Selecting Through:

- opens the inspection aperture;
- does not append to Focus traversal history;
- does not change containment;
- does not convert the inspection into another module.

### Peer bank

At this Focus, structural peers under Research include Applied Testbeds, Foundations, and Formal Theory.

They remain in a **Peer bank outside the Software subject assembly**. They are siblings, not ports inside Software's containment boundary.

### Responsive collapse

On narrow surfaces, connector geometry collapses into typed local annotations:

```text
SOFTWARE

ENGINEERING       DEVELOPED
  Enter →
  contains → Architecture

ARCHITECTURE
  Enter →

ONTOLOGY
  Enter →
  depends on → Executable Representation

EXECUTABLE REPRESENTATION
  Enter →
  Through · 2 →

BFUX              DEVELOPED · LAUNCH CANDIDATE
  Enter →
  applies to → Executable Representation

VERIFICATION & GOVERNANCE
  Enter →
  Through · 1 →
```

The relation survives; the wire does not have to.

### Expressive audit

| Question | Result |
|---|---|
| Boundary | Strong — Software assembly contains six modules |
| State | Strong — only modules with recorded standing show readouts |
| Path | Strong — trace is independent from containment |
| Constraint | Neutral nominal state; no invented gates |
| Agency | Strong — Enter/Through remain explicit ports |
| Consequence | Clear — Enter changes Focus; Through opens evidence only |
| Recovery | Trace rewind and Back remain available |

### Finding B

**The apparatus should prefer local connector meaning over global graph completeness.** A branch becomes legible when module placement shows containment and only a handful of relevant ports/relations become wires. The moment every edge is persistent, the apparatus stops being operational and becomes an atlas.

---

# Study C — Leaf / publication apparatus
## Software Before Code / `/publications/methods/software-before-code`

### Source facts represented

Publication record:

```text
Title            Software Before Code
Class            Public engineering method / practitioner guide
Stage            Working Public Method
Claim maturity   working-public-method
Audience         software practitioners
Next gate        External practitioner review, worked cases,
                 and stabilization of the release boundary
Source           src/content/product-landing-pages/software-before-code.json
```

The publication has ordinary public paths to:

```text
Open Software Before Code               /software-before-code
Boundary First Engineering              /research/software/boundary-first-engineering
```

And a typed relation:

```text
Software Before Code --documents--> Boundary First Engineering
```

### Primary burden

Can a leaf apparatus make **current standing + next gate + source + evidence/record paths + typed relation** immediately legible without turning the object into a dashboard?

### Wide semantic wireframe

```text
┌─ CHASSIS ────────────────────────────────────────────────────────────────────────┐
│ TRACE  Root ─ Publications ─ Methods & Standards ─ [ SOFTWARE BEFORE CODE ● ]    │
│                                                                                 │
│ ┌─ SINGLE INSTRUMENT · SOFTWARE BEFORE CODE ──────────────────────────────────┐ │
│ │ Public engineering method / practitioner guide                             │ │
│ │                                                                             │ │
│ │ Determine the represented domain, distinctions, invariants, boundaries,     │ │
│ │ witnesses, and closure conditions before implementation mechanisms dominate.│ │
│ │                                                                             │ │
│ │ STATE READOUT                                                               │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ WORKING PUBLIC METHOD                      INFORMATION / BLUE            │ │ │
│ │ │ Claim maturity: working-public-method                                  │ │ │
│ │ │ Audience: software practitioners                                      │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ NEXT GATE                                                                   │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ External practitioner review                                           │ │ │
│ │ │ Worked cases                                                           │ │ │
│ │ │ Stabilize release boundary                                             │ │ │
│ │ │                                                         [INSPECT GATE]◉│ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ PORT BANK                                                                   │ │
│ │ ◉ [OPEN METHOD]         ordinary retained public record                     │ │
│ │ ◉ [ENGINEERING]         documents → Boundary First Engineering              │ │
│ │ ◉ [THROUGH · STATE]     publication development record                      │ │
│ │ ◉ [SOURCE]              retained source / provenance                         │ │
│ │                                                                             │ │
│ │ [More context · N]   [More paths · N]                                      │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ PEERS  other Methods & Standards publications                                   │
│ DEPTH  [ WORLD ● ] [ RECORD ] [ EVIDENCE ] [ GESTALT ]                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Why the next gate is visible

The publication record explicitly names a next gate. That is operationally meaningful state and should not be buried exclusively in Evidence or Gestalt.

The gate is **not** represented as failure red.

The manuscript is already Working Public. Its next release boundary is simply incomplete / awaiting further evidence, so amber is available where a state color is helpful.

```text
Working-public standing = informational blue
Next incomplete gate    = attention amber
Operator action          = violet
```

### Gate expansion

Selecting `INSPECT GATE` should not pretend the website can perform external practitioner review. It opens the gate conditions as information:

```text
ADVANCE TOWARD STABLE RELEASE

[ ] External practitioner review recorded
[ ] Worked cases attached
[ ] Release boundary stabilized

Current state preserved: WORKING PUBLIC METHOD
Responsible next actor: not inferred unless source records one
```

This is a crucial apparatus rule:

> **A gate can describe a required transition without manufacturing the authority or capability to complete it.**

### Source / provenance

`SOURCE` is a port to evidence/provenance, not a decorative filename plate.

If opening the source is not publicly routable, the apparatus may expose the source reference through Through/Evidence without pretending it is a user-accessible external link.

### Typed relation

The `ENGINEERING` port expresses the `documents` relation to Boundary First Engineering.

It should carry both:

```text
relation: documents
object: Boundary First Engineering
```

Selecting it changes Focus and appends Engineering to the actual traversal history.

### No containment field

Because Software Before Code is a leaf, there is no empty child-bay grid.

The instrument itself expands to use the available space. This avoids the common spatial-UI failure where leaf nodes look unfinished merely because they have no children.

### Responsive collapse

```text
SOFTWARE BEFORE CODE
Working Public Method

Public engineering method / practitioner guide

STATE
Working public · informational
Claim maturity: working-public-method
Audience: software practitioners

NEXT GATE
External practitioner review
Worked cases
Stabilize release boundary
[Inspect gate]

PATHS
Open method →
Documents → Boundary First Engineering
Through → Publication development record
Source → provenance
```

No semantic information is lost when the spatial assembly becomes linear.

### Expressive audit

| Question | Result |
|---|---|
| Boundary | Strong — one leaf instrument owns its state and ports |
| State | Strong — manuscript standing is explicit |
| Path | Strong — trace shows actual route into this publication |
| Constraint | Strong — named next gate is first-class |
| Agency | Strong — actions are distinct from state/gate conditions |
| Consequence | Clear — relation traversal changes Focus; Through does not |
| Recovery | Gate preserves Working Public state; trace/Back provide navigation recovery |

### Finding C

**Leaf apparatuses may be where this representation earns the most value.** A single consequential object can expose state, provenance, next gate, ordinary paths, and evidence aperture as one coherent instrument without requiring the user to know which specialized view contains each fact.

---

# 4. Cross-study findings

## 4.1 The apparatus has a stable center

Across all three studies, the center is not a graph node icon. It is a **subject assembly whose boundary owns the immediately relevant state and actions**.

```text
Root   → backplane / subsystem assembly
Branch → subject assembly + contained modules
Leaf   → single instrument under inspection
```

The topology changes with object role, while the semantic owners remain stable.

## 4.2 Ports are more important than wires

The studies suggest the primary apparatus primitive is the **labeled port**, not the connector line.

A port can remain useful when:

- the other endpoint is off-screen;
- responsive layout removes the wire;
- a relation is gated;
- the relation is compressed into a bank;
- a screen reader linearizes the interface.

A wire without a legible port is therefore weak representation. A port without a permanent wire can still be complete.

## 4.3 State, gate, and command must remain visually separate

The Software Before Code study makes this especially clear:

```text
BLUE   Working Public Method        observed standing
AMBER  next release gate incomplete transition condition
VIOLET Inspect / traverse           operator agency
```

Those meanings should survive every apparatus morphology.

## 4.4 Trace should remain outside the subject assembly

Traversal history belongs to the user's interaction with the environment, not to the current object's structural containment.

Keeping Trace outside the subject assembly prevents the old mistake of treating content ancestry as Focus Path.

## 4.5 Peer bank should remain outside containment

Peers are alternatives at the current structural boundary, not contents of the current Focus. The same peer owner can therefore survive both Card and Apparatus.

## 4.6 Apparatus should not replace Depth

World is where the apparatus matters most.

Record, Evidence, and Gestalt may later receive apparatus-compatible skins, but the first renderer prototype should **not** redesign those projections simultaneously. Doing so would make it impossible to tell whether failures come from the apparatus grammar or from changed projection semantics.

## 4.7 Responsive conversion is semantic translation

The studies support the design rule:

> **wide = spatial relation when useful; narrow = typed local transition; never shrink semantics to preserve geometry.**

This is stronger than ordinary responsive CSS. It is a representation change that preserves the same relation.

---

# 5. Primitive pressure test

Did any study require an eighth primitive?

**No.**

The apparent candidates all reduce cleanly:

| Apparent new thing | Existing composition |
|---|---|
| Peer bank | module/boundary + ports |
| Next-step checklist | gate + state readouts |
| Through count | port + state/count annotation |
| Publication standing panel | state readout inside module |
| Relation line | two ports + structural connector |
| Responsive list row | module/port reflow, not new primitive |
| Disabled capability explanation | gate + state + repair/requirement path |

This is evidence in favor of keeping the vocabulary compact.

---

# 6. Outstanding design questions before code

The static studies do **not** settle these issues yet:

1. **Port morphology** — socket, tab, terminal, edge notch, or another form?
2. **Connector routing** — orthogonal, curved, bus-like, or mixed by relation semantics?
3. **Module morphology by type** — how much should method, publication, product, project, and theory differ without producing iconography sprawl?
4. **Gate expansion** — inline bay, popover, lower drawer, or Through-like aperture?
5. **Trace placement** — fixed left rail transformed into trace hardware, or integrated into chassis edge?
6. **Peer bank morphology** — vertical bank, bus, rotary-like selector, or responsive strip?
7. **Depth control morphology** — keep current rail initially, or make it an apparatus selector bank?
8. **Motion semantics** — which movement communicates Traverse, Through, gate inspection, and state transition without theatrical animation?
9. **Relationship density threshold** — how many visible connectors may coexist before relations collapse into a port bank?
10. **Module selection state** — how to use violet enough to make agency obvious without turning the apparatus into a neon diagram?

These are now constrained visual-design questions rather than information-architecture questions.

---

# 7. Recommended next gate

Before production code, create a **single visual study sheet** that places these three apparatus states side-by-side using the shared industrial palette:

```text
Root backplane
Software branch assembly
Software Before Code leaf instrument
```

The study sheet should experiment only with:

- module and port morphology;
- connector routing;
- trace / peer-bank physical form;
- state/gate/command differentiation;
- material depth and restrained wear;
- responsive transformation annotation.

It should not add features or change content.

After visual review, either:

1. revise the grammar/studies and remain `reserved`; or
2. accept a first apparatus morphology, move readiness to a prototype state, and only then create `apparatus-world.tsx` / apparatus CSS.

---

## Compact result

> **Root is a backplane. Branch is an assembly. Leaf is an instrument.**

> **Ports carry meaning before wires do.**

> **State reports. Gate constrains. Command acts. Trace remembers. Repair returns.**
