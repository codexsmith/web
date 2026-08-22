# Boundary First Apparatus Interaction Grammar
## Version 0.1 — design contract before renderer implementation

**Status:** design contract; implementation intentionally deferred  
**Active renderer:** Card  
**Reserved renderer:** Apparatus  
**Shared substrate:** content graph, traversal history, World / Record / Evidence / Gestalt projections, publication state, process state, industrial semantic palette

---

## 1. Purpose

The Apparatus renderer is a second representation of the same Boundary First semantic system. It must not create a second information architecture, second content model, or second navigation model.

> **Card explains the system as bounded readable modules. Apparatus explains the same system as a bounded operational assembly.**

The apparatus exists to make relations, state, paths, gates, agency, consequence, and repair physically legible without turning the interface into decorative machinery.

**It is not a cockpit skin and not a cyberpunk dashboard.** It is also not:

- a denser card grid;
- a miniature engineering schematic for its own sake;
- a replacement for Record, Evidence, or Gestalt;
- or an excuse to expose every graph edge simultaneously.

The existing Card renderer remains the production baseline until the apparatus passes the design and prototype gates in this document.

---

## 2. Expressive test

For any consequential interactive object, the apparatus grammar must have a lawful place to answer these questions when they matter:

1. **Boundary** — What belongs to what?
2. **State** — What condition is this in now?
3. **Path** — How did the user or object arrive here, and what transitions are reachable next?
4. **Constraint** — Why is a transition allowed, blocked, provisional, or unavailable?
5. **Agency** — Who or what can act?
6. **Consequence** — What changes if the action succeeds?
7. **Recovery** — What state is preserved on failure, and what repair path remains?

Not every screen must display all seven. The grammar must be capable of expressing all seven without inventing a new primitive for each domain.

### Primitive discipline

> **If two concepts can be expressed clearly using existing primitives, do not invent another primitive.**

Forms, workflows, permissions, errors, async operations, navigation, collaboration, and dense data are validation cases for the same grammar rather than reasons to create separate visual languages.

---

## 3. Material and color semantics

Apparatus and Card share one industrial palette.

### Material

```text
Iron      = application chassis / deepest structure
Gunmetal  = working backplane / environment
Steel     = modules, controls, bounded surfaces
Alloy     = edges, separators, secondary structure
```

### Operator agency

```text
Violet = where the operator can act, is acting, or has selected a transition target
```

Violet does not mean generic importance and does not communicate system health.

### Observed machine state

```text
Green = admissible / verified / healthy
Amber = provisional / unresolved / inspect
Blue  = informational / observed / external signal
Red   = actual defect, failed invariant, or destructive fault
Gray  = unknown / unavailable / unresolved state
```

A successful operation does not turn the command green. The resulting system state may become green.

### Surface doctrine

- gradients communicate material depth, not decoration;
- wear is microstructure, not caricature;
- no fake rust;
- no gratuitous scratches;
- no decorative rivet fields;
- no hazard stripes unless a real hazardous boundary exists;
- **wear implies use, not neglect.**

---

## 4. Minimum apparatus vocabulary

The first apparatus implementation should be built from seven visual primitives only.

### 4.1 Module / boundary

A module is a bounded object or subsystem.

It may represent a root region, branch, leaf object, publication, project, method, or another typed content object. Type remains visible through labels, morphology, and metadata; color alone may not carry type.

A module answers:

- what object is this?
- what is inside this boundary?
- what state belongs to this object rather than its neighbors?

A module is not automatically a card. It may be a plate, bay, bounded field, or assembly housing.

### 4.2 Port

A port is an explicit lawful connection point.

A port may represent:

- containment entry;
- typed graph relation;
- inspection / Through aperture;
- retained record;
- admissible command target;
- parent boundary;
- external input or output.

Ports must be labeled. Connection existence and connection permission are separate concepts.

A disabled or gated port remains legible when knowing that the capability exists is useful. The interface should explain why passage is blocked rather than reducing the distinction to hidden versus visible.

### 4.3 Trace

A trace represents path through the system.

For the website, the primary trace is the visitor's actual Focus traversal history. It must remain semantically identical to the Card renderer's traversal history.

A trace may also represent workflow progress or async transition state when the domain requires it.

Trace is not ancestry. Structural containment belongs to the assembly itself.

### 4.4 Gate

A gate is a constraint on a transition.

It answers:

- what must be true before passage?
- which requirement is missing?
- who owns the missing condition?
- is the transition impossible, unauthorized, incomplete, or merely pending?

A gate should make blocked transitions legible instead of reducing them to a gray control.

Example:

```text
RELEASE
  Tests             ADMISSIBLE
  Security review   ADMISSIBLE
  Owner approval    WAITING
  Deployment slot   ADMISSIBLE
```

The gate is a composition of state + constraint + transition, not a new workflow-specific widget family.

### 4.5 State readout

A state readout reports observed system condition.

It may show:

- lifecycle standing;
- publication stage;
- validation result;
- async state;
- queue state;
- defect state;
- unknown / missing record.

State readouts use machine-state colors and text/icon redundancy. They never use violet merely because the state is important.

### 4.6 Command

A command is an available act by the operator.

Commands use violet as the agency signal. They should make consequence legible enough that the user can distinguish:

- navigation;
- inspection;
- reversible modification;
- irreversible or destructive action;
- queued / asynchronous execution.

Command color does not encode success. Success belongs to the resulting state readout.

### 4.7 Repair path

Repair is a first-class path after defect or blocked transition.

A fault presentation should identify:

1. attempted transition;
2. boundary where it failed;
3. violated or unmet constraint;
4. state preserved after failure;
5. available repair or recovery path.

Repair does not require a unique decorative primitive. It is a trace from a fault/gate state toward a reachable corrective action or restored state.

---

## 5. Apparatus screen grammar

The apparatus should remain surprisingly flat.

```text
IRON CHASSIS
└── GUNMETAL BACKPLANE
    ├── Focus traversal trace
    ├── Subject assembly
    │   ├── identity / overview plate
    │   ├── state readout
    │   ├── contained modules or bays
    │   ├── ports
    │   └── gates / repair traces when relevant
    ├── Peer bank
    └── Depth controls
```

The same semantic owners from Card remain:

- **Hero** = threshold into the environment;
- **Focus trace** = actual traversal history;
- **Subject assembly** = current World object;
- **Peer bank** = siblings;
- **Ports** = ordinary structural / relational traversal;
- **Depth controls** = World / Record / Evidence / Gestalt;
- **Through** = inspection aperture without changing conceptual location.

The apparatus may change physical placement and morphology, but not those responsibilities.

---

## 6. Root, branch, and leaf apparatuses

### 6.1 Root apparatus

The Root World should behave as a backplane with five first-class bays:

```text
Products
Public Interest
Research
Publications
About
```

Root itself should not become a sixth giant module repeating the hero or explaining the same structure again.

The visitor should be able to understand that the five regions are independent bounded subsystems attached to one Lab chassis.

### 6.2 Branch apparatus

A branch apparatus has one focal subject assembly plus contained modules.

The subject assembly should immediately expose:

- identity;
- one key context statement;
- current/publication standing where relevant;
- up to four high-value ordinary next actions;
- contained modules;
- typed relation ports.

Longer context and secondary paths remain one inline disclosure away, preserving the existing progressive-disclosure contract.

Containment is represented by placement inside the branch assembly; it should not require ancestry breadcrumbs.

### 6.3 Leaf apparatus

A leaf has no contained-module field.

Its apparatus should emphasize:

- subject identity;
- standing;
- primary context;
- parent / external relation ports;
- Through / evidence aperture;
- retained records;
- next admissible actions or gates.

A leaf should feel like a single instrument under inspection rather than an empty branch canvas.

### 6.4 Publication apparatus

Publication is a leaf specialization of the same grammar, not a separate design system.

It should expose:

- document class;
- manuscript stage;
- claim maturity;
- audience;
- next gate;
- source/provenance;
- relations to the work it documents.

Publication maturity must remain visually distinct from research validity and product delivery.

---

## 7. Interaction rules

### Traverse

Clicking a contained module, peer, or relation port changes Focus and appends that semantic movement to traversal history.

### Rewind

Selecting an earlier item in the Focus trace rewinds/truncates traversal history exactly as the Card renderer does.

### Inspect

Through opens evidence/inspection without changing Focus or pretending inspection is graph traversal.

### Change depth

Record, Evidence, and Gestalt change representation of the same Focus. They do not create Focus-history steps.

### Gated action

A blocked command remains interpretable. At minimum, the user must be able to discover:

- why it is blocked;
- whether it is impossible, unauthorized, incomplete, or pending;
- which state remains active;
- what repair/requirement can change the condition.

### Async action

If the apparatus later represents asynchronous operations, state should be explicit:

```text
SENT → QUEUED → PROCESSING → COMPLETE
```

A spinner alone is insufficient when those distinctions affect operator decisions.

---

## 8. Progressive disclosure

Apparatus must not solve legibility by displaying the whole graph.

### Immediate

Show enough to answer:

```text
What is this?
What state is it in?
What can I do next?
```

### One ordinary click

Expose:

```text
additional context
secondary paths
constraint explanation
records / inspections
```

### Specialized depth

Use Record, Evidence, or Gestalt only when the user asks for a materially different representation.

The apparatus must preserve the current content-first rule:

> **Click → understand → act → deepen only when useful.**

---

## 9. Connector and edge discipline

Apparatus can fail by becoming graph spaghetti. Therefore:

- only local / currently relevant relations should be rendered as live connectors;
- all connectors must terminate in labeled ports;
- relation type must be inspectable without color decoding;
- crossings should be minimized through ordering and routing, not hidden by ambiguity;
- low-priority relations should compact into port banks rather than permanent lines;
- selected or operator-targeted relation may use violet;
- relation existence itself remains structural metal/alloy unless it is carrying observed state.

No edge should glow merely because it exists.

---

## 10. Responsive behavior

The apparatus must **reflow topologically, not miniaturize geometrically**.

At wide widths, a bounded two-dimensional assembly is allowed.

At constrained widths or browser zoom:

1. preserve subject identity and state;
2. preserve traversal trace;
3. preserve labeled ports and gate meaning;
4. convert spatial bays into ordered stacks / banks;
5. convert long connectors into local labeled transitions;
6. never shrink meaningful text into schematic micro-labels.

Mobile should resemble a lawful linear control path, not a zoomed-out desktop schematic.

---

## 11. Accessibility

- color is never the only carrier of type, state, or permission;
- every port and command has a text label or accessible name;
- keyboard order follows the same logical traversal as the visible apparatus;
- focused operator targets use the shared violet focus treatment plus shape/border change;
- machine states include textual/iconic redundancy;
- reduced motion removes unnecessary mechanical transitions;
- forced-colors mode must retain boundaries, ports, current focus, gates, and state distinctions;
- text growth outranks decorative geometry.

---

## 12. Anti-patterns

Reject an apparatus design if it depends on:

- fake machinery ornament;
- decorative gauges with no system variable;
- unlabeled sockets;
- mystery icons;
- glowing every edge;
- permanent display of every relationship;
- tiny text to preserve diagram shape;
- hidden unavailable functionality where the blocked boundary matters;
- green action buttons that confuse agency with resulting state;
- red maturity/status labels where no defect exists;
- a second navigation system that competes with Focus trace, peers, and graph traversal;
- a second content architecture that diverges from Card.

---

## 13. Validation corpus

Before Apparatus can become an implemented renderer, static studies should demonstrate the same minimum grammar across these recurring UX failures:

| Case | Apparatus burden |
|---|---|
| Form | port + state + evaluator/constraint + feedback + command |
| Workflow | current state + traversed path + next transitions + gates + ownership + repair |
| Permission | capability exists + authority gate + reason + alternate path |
| Error | failed transition + violated boundary + preserved state + repair |
| Async | command + queue/intermediate state + completion observation |
| Navigation | containment + adjacency + actual traversal history |
| Collaboration | actor/role + authority + provenance + bounded contribution |
| Dense data | identity + relation + projection without losing context |

The apparatus earns implementation only if the same small primitive set remains coherent across these cases.

---

## 14. Prototype gate before renderer implementation

Do not implement `apparatus-world.tsx` yet.

The next pass should create **three static apparatus studies** over real BFL content:

1. **Root apparatus study** — five-region Lab backplane;
2. **Branch apparatus study** — a content-rich branch with contained modules and relation ports;
3. **Leaf apparatus study** — a publication or research object with standing, evidence aperture, typed relations, and a visible next gate.

Each study must be reviewed against:

- seven-question expressive test;
- primitive count;
- progressive disclosure;
- interaction ownership;
- industrial color semantics;
- responsive collapse;
- accessibility;
- anti-cockpit / anti-ornament rules.

Only after those studies converge should `uiShellReadiness.apparatus` advance beyond `reserved` or production apparatus code be admitted.

---

## 15. Compact doctrine

> **The Apparatus is a representation of operation, not a picture of machinery.**

> **Structure is metal. Agency is violet. State is signal. Path is trace. Constraint is gate. Failure preserves state and exposes repair.**

> **The apparatus should make a difficult system feel inspectable, not theatrical.**
