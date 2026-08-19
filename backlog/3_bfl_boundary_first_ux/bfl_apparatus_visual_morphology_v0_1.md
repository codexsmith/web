# Boundary First Apparatus Visual Morphology
## Version 0.1 — physical grammar before renderer implementation

**Status:** morphology design contract; no production renderer yet  
**Depends on:** `bfl_apparatus_interaction_grammar_v0_1.md` and `bfl_apparatus_static_studies_v0_1.md`  
**Active renderer:** Card  
**Reserved renderer:** Apparatus  
**Purpose:** resolve the physical appearance and behavior of the seven Apparatus primitives without creating a second semantic system

---

## 1. Governing visual statement

> **The Apparatus should look assembled because the information is assembled, not because machinery is fashionable.**

The visual language should suggest a maintained instrument, rack, panel, fixture, or workbench assembly without imitating a literal machine.

Three structural scales remain canonical:

```text
Root   = backplane
Branch = assembly
Leaf   = instrument
```

The same seven primitives remain sufficient:

```text
Module / boundary
Port
Trace
Gate
State readout
Command
Repair path
```

No visual decision in this document may introduce a new semantic primitive by accident.

---

## 2. Material stack

The existing industrial palette already defines the material hierarchy. Apparatus should make that hierarchy physical through **surface level**, not through extra colors.

```text
Iron chassis      deepest application frame
Gunmetal backplane working field / mounting plane
Steel module       bounded subject or contained object
Raised steel        operator control / selected inspection surface
Recess              port bank, gate detail, Through aperture, retained record well
Alloy line          structural seam, route, divider, inactive connector
```

### Depth rules

Use only four physical levels:

1. **Chassis** — deepest fixed frame.
2. **Backplane** — recessed working field.
3. **Module face** — normal readable content plane.
4. **Operator face** — control or currently targeted surface.

Do not create arbitrary z-depth for visual interest.

### Edge treatment

- corners stay tight: nominal 2–4 px radius;
- one-pixel/high-DPI hairlines carry most structure;
- top/left highlight and bottom/right shadow may imply machined depth;
- no chrome, mirror metal, heavy bevel, embossing, or skeuomorphic screws;
- surface texture remains extremely low contrast;
- wear is non-semantic and may never imply lifecycle state or defect.

---

## 3. Typography registers

Apparatus needs two text registers, not a new type system.

### Content register

Used for object names, summaries, context, evidence, and prose.

- normal sentence case;
- current site reading font;
- generous line height;
- never compressed to preserve diagram geometry.

### Instrument register

Used for small structural labels such as:

```text
TRACE
STATE
PORT
GATE
DEPTH
THROUGH
PEERS
```

- uppercase;
- modest tracking;
- compact system-mono or existing technical register if already available;
- never used for paragraphs;
- minimum readable size must survive browser zoom and mobile reflow.

Object type remains textual (`METHOD`, `STANDARD`, `PUBLICATION`, `PROJECT`) rather than requiring a unique pictogram.

---

## 4. Module morphology

### 4.1 One rectilinear family

Do **not** create a shape zoo for products, projects, research, methods, publications, and standards.

All modules use the same rectilinear material family. Type is expressed by:

1. explicit type label;
2. title and metadata;
3. structural role in the assembly;
4. optional restrained edge treatment.

Color never encodes object type.

### 4.2 Structural variants

Only three module morphologies are allowed in the first renderer.

#### Bay / container

A recessed bounded field that contains other modules.

Use for Root regions and branch contained-module fields.

```text
┌─ BAY LABEL ─────────────────────┐
│                                │
│  mounted modules / ports       │
│                                │
└────────────────────────────────┘
```

#### Faceplate / object

A closed steel plate representing one content object.

```text
┌ METHOD ─────────────────────────┐
│ Executable Representation      │
│ short context                  │
│ STATE ...              [ENTER] │
└────────────────────────────────┘
```

#### Instrument / leaf

A larger single-object face with dedicated state, context, relation, gate, and Through zones.

```text
┌ PUBLICATION · INSTRUMENT ───────┐
│ Software Before Code            │
│                                 │
│ STATE / AUDIENCE / CLAIM        │
│ context                         │
│                                 │
│ ports      gate       Through   │
└─────────────────────────────────┘
```

The distinction is structural scale, not content taxonomy.

### 4.3 Current Focus

Current Focus receives a **focus collar** rather than a violet fill.

The collar may combine:

- 1–2 px violet outer line;
- a short violet index mark on the title edge;
- slightly stronger edge highlight;
- `aria-current` / equivalent semantic state.

The module body remains metal. Violet means operator selection, not object identity.

---

## 5. Port morphology

### 5.1 Port is an edge-mounted terminal

The canonical port is a small **rectilinear terminal integrated into a module boundary**.

It should read as a lawful connection point without becoming a decorative socket.

```text
module edge ───────────────┤ RELATION / TARGET ├─
```

Or, when compact:

```text
[ TARGET ]▮
```

The visible click target includes the label plate; the tiny terminal mark is not the hit target.

### 5.2 Port anatomy

Every interactive port has:

```text
relation or action label
explicit target label
terminal mark
focus treatment
accessible name
```

Example:

```text
DEPENDS ON / EXECUTABLE REPRESENTATION   ▮
```

### 5.3 Port classes share one shape

Do not invent different socket silhouettes for containment, Through, peer, relation, parent, or command targets.

Meaning is carried by **label + placement + relation text**, with geometry only reinforcing the distinction.

Suggested placement:

```text
Top edge       parent / containing boundary port
Bottom edge    contained-object traversal ports
Left/right     typed cross-relations
Interior well  Through / retained-record aperture
Chassis side   peer bank
```

Placement is never the sole semantic carrier.

### 5.4 Port states

```text
available      structural terminal + violet response on hover/focus
selected       violet terminal + local collar/line
pending gate   amber state marker adjacent to terminal
unavailable    gray marker + reason discoverable
failed         red only at the violated boundary/state marker
```

A port does not become green merely because it can be used.

---

## 6. Connector morphology

### 6.1 Connectors are traces, not wires

Use **orthogonal routed traces** on a restrained layout grid.

```text
A ▮────────┐
           └────────▮ B
```

Avoid decorative cable curves, glowing circuitry, animated electricity, or physical plug metaphors.

### 6.2 Routing laws

1. Prefer zero crossings.
2. Increase separation before rerouting semantics.
3. Route locally within the subject assembly.
4. Put the relation label at a terminal or one stable midpoint, not repeatedly along the line.
5. Structural traces use alloy/steel line colors.
6. Violet is reserved for the currently targeted relation or operator traversal.
7. State color may appear at a terminal/readout but should not recolor an entire structural trace unless the trace itself carries state.

### 6.3 Density threshold

Default view may show at most **three persistent labeled structural connectors** in one assembly.

If a fourth connector would:

- create a crossing;
- force labels below readable size;
- obscure module identity;
- or materially increase scan cost;

collapse the lower-priority relations into a labeled **port bank** instead.

A focused relation may temporarily reveal one additional routed trace. The renderer should not exceed **four simultaneous visible routed relations** in the first implementation.

This is a presentation threshold, not a limit on graph relations.

### 6.4 Port bank

A port bank is a compact list of lawful relations attached to the relevant boundary.

```text
RELATIONS · 5
├─ grounds / Distinction Space      ▮
├─ documents / Executable Dist.     ▮
├─ demonstrates / Corpus Forge      ▮
└─ +2 more
```

The bank preserves relation type and target without pretending every edge must be spatially drawn.

---

## 7. Trace morphology

### 7.1 Trace owns arrival history

Focus traversal remains a separate chassis instrument. It is never replaced by structural ancestry.

Wide layout: a narrow **left chassis rail**.

```text
TRACE
01  Root
│
02  Research
│
03  Software   ●
```

Prior steps are neutral metal/alloy. Current endpoint receives the violet marker.

Duplicate visits remain visible and retain step numbers.

### 7.2 Rewind affordance

Each prior trace step is a labeled command surface large enough to operate directly. Rewinding truncates later semantic traversal exactly as the Card renderer does.

### 7.3 Narrow layout

At constrained width, Trace becomes an ordered top strip or disclosure:

```text
TRACE · 3   Root → Research → Software ●
```

Opening it reveals numbered rewind targets.

Do not turn it into breadcrumbs or silently deduplicate repeated visits.

---

## 8. Gate morphology

### 8.1 Gate is a crossbar on a transition

A gate belongs to a port/transition, not to the page generally.

Closed form:

```text
RELEASE ▮  WAITING · 1 CONDITION
```

Expanded form:

```text
RELEASE
├─ Tests              ADMISSIBLE
├─ Security review    ADMISSIBLE
├─ Owner approval     WAITING
└─ Deployment slot    ADMISSIBLE

STATE PRESERVED: REVIEWED BUILD
NEXT: obtain owner approval
```

### 8.2 Visual state

- open/admissible: green state marker + text;
- pending/incomplete: amber + text;
- unavailable/unknown: gray + text;
- failed invariant: red + text;
- operator action that may satisfy the gate: violet command.

Never paint the entire gate red or amber when one condition is responsible.

### 8.3 Expansion

Gate detail expands **inline from the transition it constrains**. It should not default to a modal or detached tooltip because the user must retain the object and attempted path while reading the constraint.

---

## 9. State readout morphology

The canonical state readout is a compact **signal strip**:

```text
STATE  ●  WORKING PUBLIC
```

The signal color is redundant with explicit text.

For multi-axis standing, do not merge statuses:

```text
PUBLICATION   ● WORKING PUBLIC
CLAIM         ● PRACTITIONER METHOD
DELIVERY      — NOT APPLICABLE
```

This preserves the existing firewall among publication maturity, research standing, and product delivery.

No radial gauges, percentages, or progress bars appear unless a real measured variable exists.

---

## 10. Command morphology

Commands are **operator plates**, not state lamps.

```text
[ ENTER ]
[ INSPECT THROUGH ]
[ REWIND TO 02 ]
[ OPEN RECORD ]
```

### Command treatment

- steel control face;
- violet edge/underline/terminal for available operator agency;
- stronger violet focus collar on keyboard focus;
- subtle physical depression on active press;
- no permanent green primary buttons;
- destructive commands, if introduced later, require explicit language and consequence confirmation rather than relying on red fill.

Minimum hit area remains accessible even when the visible plate is compact.

---

## 11. Through morphology

Through is a **recessed inspection aperture**, not another navigation port.

Closed:

```text
THROUGH · 2 RECORDS  ▣
```

Open:

```text
┌─ THROUGH / INSPECTION ────────────┐
│ Executable Distinctions          │
│ Original Visual Grammar          │
└───────────────────────────────────┘
```

Opening Through deepens the current object without adding a Focus traversal step.

The aperture should visually recess into the module rather than protrude like an `ENTER` command.

---

## 12. Repair morphology

Repair begins at the **specific failed gate or state boundary**.

```text
COMMAND
   │
   ▼
GATE ── ✕ OWNER APPROVAL MISSING
           │
           └── REPAIR PATH ── [REQUEST / RESOLVE] ──► RECHECK
```

Rules:

- red identifies the actual failure point only;
- the preserved state is named;
- the corrective action remains violet because it is agency;
- the route back to admissible state is structural until selected;
- successful repair changes the state readout, not the historical fact that the defect occurred if history is retained.

---

## 13. Peer bank morphology

Peers remain a **right chassis bank**, outside the subject assembly.

```text
PEERS · 5
├─ Engineering        ▮
├─ Ontology           ▮
├─ Architecture       ▮
├─ BFUX               ▮
└─ Verification       ▮
```

The current Focus may be omitted or shown as a non-command current marker.

Peers do not draw wires into the subject. Their relationship is already sibling adjacency and should not be theatricalized.

At narrow width, Peer bank becomes an ordered disclosure beneath the subject assembly.

---

## 14. Depth control morphology

World / Record / Evidence / Gestalt remain one **four-position depth selector** attached to the chassis rather than the subject content.

```text
DEPTH   WORLD ●   RECORD   EVIDENCE   GESTALT
```

The active position receives a violet index mark / underline. The whole segment should not become a bright violet pill.

Depth changes representation of the same Focus. It does not add a trace step and should not animate like traversal.

---

## 15. Motion morphology

Motion may reinforce semantics but never create semantics unavailable without motion.

### Traverse

Focus change uses restrained lateral displacement of the subject assembly or selected module, approximately one small spatial unit rather than a full-screen slide.

Semantic reading: **move to another object**.

### Through

Inspection uses a short recess/opening movement into the current module.

Semantic reading: **look through the current boundary without leaving it**.

### Depth change

World / Record / Evidence / Gestalt uses a low-motion reassembly/crossfade around the same fixed Focus anchor.

Semantic reading: **same object, different representation**.

### Gate expansion

Constraint detail opens directly beneath/from its port with short vertical expansion.

### State change

State markers update immediately with at most a restrained transition. No pulsing healthy states, celebratory flashes, or continuously animated machinery.

### Reduced motion

All semantic distinctions remain through position, label, boundary, and state text. Motion may collapse to immediate replacement and opacity change.

---

## 16. Selection and hover

### Hover

Hover may preview one local relation by increasing line contrast and emphasizing its two terminals.

### Keyboard focus

Keyboard focus must receive at least the same information as hover plus the shared violet focus collar.

### Selected relation

A selected relation may use:

- violet terminals;
- one violet routed trace;
- stronger relation label;
- local dimming of unrelated traces, never of essential text.

Do not glow the entire graph or module.

---

## 17. Responsive topology

The first renderer should implement three topology modes, not arbitrary scale-down.

### Wide — spatial assembly

```text
Trace rail | subject + bays + selected traces | peer bank
                         Depth below
```

### Medium — banked assembly

```text
Trace strip
Subject
Contained modules in 2-column bank
Relation banks / selected traces only
Peers disclosure
Depth
```

### Narrow — linear control path

```text
Trace disclosure
Subject
State
Primary commands
Contained modules
Relations
Through / records
Gate / repair
Peers
Depth
```

The semantic order is preserved even when geometry changes completely.

---

## 18. Apparatus density budget

The Apparatus should feel **less busy than its possible data**, not more.

Per viewport / active subject:

```text
Persistent routed connectors   <= 3
Temporary selected connectors  <= 1 additional
Immediate primary commands     <= 4
Visible state axes             <= 3 before disclosure
Open gate details              1 at a time by default
Open Through apertures         1 at a time by default
```

These are UX presentation budgets, not data-model limits.

If the content exceeds a budget, use a bank, disclosure, or deeper representation rather than shrinking labels.

---

## 19. Morphology stress tests

### Form

```text
INPUT PORT / EMAIL
┌───────────────────────┐
│ name@example.com      │
└───────────────────────┘
STATE  ● FORMAT ADMISSIBLE
GATE   domain / required / authorization rules
COMMAND [SUBMIT]
```

A form remains input + state + constraint/evaluator + command, not a special alien UI family.

### Workflow

```text
TRACE  Intake → Review ●
PORTS  Approve / Return / Escalate
GATE   required evidence missing on Approve
STATE  REVIEW
REPAIR attach evidence → re-evaluate
```

### Permission

```text
DEPLOY ▮  UNAVAILABLE
GATE   authorization not held
STATE PRESERVED: reviewed release
ALTERNATE PORT: request approval
```

The capability remains visible even when unavailable.

### Async

```text
COMMAND [RUN]
STATE  SENT → QUEUED → PROCESSING → COMPLETE
```

Intermediate state is explicit rather than represented by a spinner alone.

### Error

```text
FAILED TRANSITION: IMPORT
BOUNDARY: schema validation
STATE PRESERVED: source file retained
REPAIR: inspect 4 rejected records
```

These cases use the same primitive morphology as the website studies.

---

## 20. Explicitly rejected morphology

Reject a visual comp that introduces any of the following:

- circular jack fields with no semantic need;
- unique physical icon/shape for every node kind;
- neon edge glow as default relation styling;
- curved decorative cables;
- faux oscilloscope screens;
- gauges without measured variables;
- screws, bolts, rivets, vents, hazard stripes, handles, or labels that do not correspond to structure;
- microscopic monospace text;
- multiple simultaneous open diagnostic drawers;
- a center-screen control console competing with the content;
- ancestry encoded into Trace;
- peers wired into the current object as if siblinghood were a graph relation requiring a cable;
- green commands or red non-defect maturity states;
- hiding a blocked capability when its boundary matters;
- motion that has no semantic interpretation.

---

## 21. Converged first-renderer decisions

The following morphology choices are now sufficiently resolved for an implementation prototype:

```text
Module family       rectilinear bay / faceplate / instrument
Current Focus       violet focus collar, never violet body fill
Port                labeled edge-mounted terminal
Connector           orthogonal alloy trace
Connector budget    3 persistent + 1 selected
Overflow relations  labeled port bank
Trace               numbered left chassis rail; compact top disclosure on narrow screens
Gate                transition crossbar with inline expandable conditions
State               text + small signal marker strip
Command             steel operator plate with violet action edge
Through             recessed inspection aperture
Peers               right chassis terminal bank; disclosure on narrow screens
Depth               four-position chassis selector with violet index
Repair              path from exact fault/gate to corrective command and recheck
Motion              restrained semantic Traverse / Through / Depth / Gate transitions
Responsive          wide spatial → medium banked → narrow linear
```

---

## 22. Remaining prototype questions

These should be answered by an implementation prototype and browser review rather than another abstract design layer:

1. exact port terminal width and label placement;
2. exact module padding and vertical density;
3. whether the focus collar is full perimeter or title-edge + corner indices;
4. exact trace rail width and step wrapping behavior;
5. whether orthogonal connectors should use square or subtly rounded elbows;
6. exact transition durations/easing within reduced-motion constraints;
7. how much material texture survives real displays without harming contrast;
8. forced-colors representation of terminal, trace, gate, and state distinctions;
9. 200% / 400% browser zoom behavior on real content;
10. touch ergonomics of dense port banks.

These are implementation-validation questions, not reasons to reopen the semantic grammar.

---

## 23. Gate to creating the Apparatus

The semantic grammar, three real-content static studies, and visual morphology are now sufficiently specified to make a **small implementation prototype** meaningful.

However, production activation remains prohibited until that prototype demonstrates:

- Root / Software / Software Before Code equivalence with Card semantics;
- correct Focus traversal preservation;
- no projection-induced trace steps;
- readable 200% and 400% zoom behavior;
- keyboard-complete ports, gates, Through, peers, and Depth;
- forced-colors legibility;
- reduced-motion parity;
- connector-density collapse into port banks;
- no content or status loss relative to the shared semantic model.

> **The next artifact may be an Apparatus prototype. It may not yet replace Card as the production shell.**
