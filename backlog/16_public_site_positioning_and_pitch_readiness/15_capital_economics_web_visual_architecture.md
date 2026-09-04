# Capital / Economics Web — visual architecture and diagram contract

Status: backlog / UX architecture / visual-system definition  
Date: 2026-08-31  
Parent package: `16_public_site_positioning_and_pitch_readiness`  
Related backlog:
- `12_case_for_boundary_first_labs_capital_projection.md`
- `13_capital_projection_institutional_capability_synthesis.md`
- `14_bring_us_your_difficult_system_problem_intake.md`

Related structured content:
- `src/content/lab-machine-capital.json`
- `src/content/lab-machine-institutional-capacity.json`
- `src/content/lab-machine-problem-intake.json`

Implementation status: visual architecture defined; production component not yet implemented.

---

## Purpose

The capital/funding material now has enough content depth that a normal page of cards and prose would undersell the underlying structure.

The correct projection is a **systems infographic rendered in the native Boundary First Labs control-interface grammar**.

The page should make one thing immediately visible:

> **Boundary First Labs is the machine in the middle of an economic, institutional, and problem-solving web.**

Resources enter. Difficult systems enter. Research and engineering transform them. Evidence, capability, software, public artifacts, partnerships, revenue, and public value leave. Some value returns as retained institutional capacity, learning, maintenance capability, and renewed research.

This is not a generic startup flywheel and not a decorative org chart.

It is a **consequence-bearing infrastructure view of the Lab**.

---

# Primary composition

The projection has two main visual parts:

1. **BFL / the Lab Machine** — the central institutional chassis.
2. **The Economics Web** — the surrounding resource, problem, validation, distribution, revenue, partnership, and value-return infrastructure.

The page should read first as a complete machine and second as a set of inspectable modules.

At full desktop scale, the visitor should be able to understand the rough topology before reading all copy.

---

# Core spatial model

```text
                 RESEARCH FUNDING     CAPITAL      SPONSORSHIP
                         \              |              /
                          \             |             /
                           +------ CAPACITY INPUT ----+
                                      |
                                      v

                  +----------------------------------+
                  |                                  |
  PROBLEM INPUT ->|       BOUNDARY FIRST LABS        |-> PRODUCTS
                  |                                  |-> SERVICES
                  |          [ LAB MACHINE ]         |-> PUBLIC WORK
                  |                                  |-> STANDARDS
                  +----------------------------------+
                                      |
                            EVIDENCE / VALIDATION
                                      |
                                      v

             PARTNERSHIPS <- DISTRIBUTION <- TRANSFER -> REVENUE
                    \                                  /
                     +------ RETAINED CAPACITY -------+
```

This is conceptual topology only. The production layout should use the native BFL physical-control grammar rather than literal boxes and arrows.

---

# Two input manifolds

The diagram should expose two conceptually different ways something enters the Lab.

## 1. CAPITAL / CAPACITY INPUT

Question:

> **What additional responsible capacity should enter the Lab?**

Possible inputs:

- research funding;
- sponsorship;
- grants/philanthropy;
- strategic/patient capital;
- consulting/product revenue;
- infrastructure;
- implementation support;
- stewardship capacity.

Capital is not shown flowing directly into impact or return.

It enters through capacity.

Preferred rail:

`Capital -> Capacity -> Work -> Validation -> Transfer -> Retained Capability`

## 2. PROBLEM INPUT

Question:

> **What difficult reality should enter the Lab's inquiry machinery?**

Possible inputs:

- overloaded software;
- brittle processes;
- unclear authority;
- hidden maintenance;
- evidence sprawl;
- exception-built systems;
- cross-boundary failure;
- wicked or unstable problems.

Preferred rail:

`Real Problem -> Diagnostic Work -> Evidence -> Repair / Better Instrument -> Transfer`

These two inputs should look related but not identical.

Capital supplies **capacity**.

Problem Intake supplies **consequence-bearing reality**.

---

# Central BFL chassis

BFL belongs visually in the center.

The center is not merely a logo badge. It represents the institutional machine that holds the transformation logic.

The central assembly should include:

- BFL mark;
- `BOUNDARY FIRST LABS`;
- `Institutional Lab Machine` or equivalent compact descriptor;
- visible input/output terminals;
- a small number of machine-state indicators;
- surrounding internal functional modules.

The central object may be rectangular, square, or an irregular equipment chassis.

It **should not** be dominated by a large circular pressure vessel or circular pipe.

The BFL identity should read as the main chassis/backplane into which the rest of the system routes.

---

# Inner Lab Machine modules

The most important functional nodes belong near the central chassis.

Recommended inner set:

- Research
- Governance
- Methods
- Public Value
- Instruments
- Public Artifacts
- Software
- Pilots

These are not an exhaustive representation of the Lab. They are the minimum readable transformation set for the capital/economics projection.

A useful conceptual flow is:

`Research -> Methods -> Instruments -> Software -> Pilots -> Public Artifacts`

with Governance, Evidence, Public Value, and Repair operating across the rail rather than only at one endpoint.

---

# Outer economics web

The outer web should make the institution's economic ecology visible without reducing it to revenue.

Recommended major nodes:

## Inbound / resource side

- Capital
- Research Funding
- Strategic Capital
- Sponsorship
- Problem Intake

## Outbound / exchange side

- Consulting Revenue
- Product Revenue
- Partnerships
- Validation
- Distribution
- Institutional Capacity

## Possible later nodes

Only add these when the governed content and page density justify them:

- Grant / philanthropy
- Membership / public support
- Academic collaboration
- Standards / licensing
- Curriculum / training
- External stewardship
- Public infrastructure

Do not add every possible funding channel merely because the funding architecture contains it. The diagram must remain readable.

---

# Strategic side panels

The diagram should retain a small set of thesis panels that explain how to interpret the machinery.

Recommended four:

## CAPACITY BEFORE EXPANSION

> Build depth. Then scale.

## FUND THE CONVERSION ENGINE

> Sustain the machinery between insight and validated capability.

## ACCUMULATED PRODUCTIVE CAPACITY + BOUNDED VALIDATION

> The due-diligence object is what already exists plus a clearly bounded next test.

## BRING US YOUR DIFFICULT SYSTEM

> Start with the problem as it actually exists.

These should read as mounted institutional registers / doctrine plates, not marketing cards.

---

# Flow-guide instrument

A compact guide should make the primary logic readable without tracing every connection manually.

## CAPITAL TO TRANSFER

`Capital -> Capacity -> Work -> Validation -> Transfer`

## PROBLEM TO BETTER INSTRUMENTS

`Real Problems -> Diagnostic Work -> Evidence -> Better Instruments`

The exact icons are secondary. The conceptual sequence is primary.

---

# Flow semantics

The diagram must not use undifferentiated decorative connectors.

At minimum, support three relationship classes.

## Primary flow

Meaning:

- direct resource flow;
- direct work transformation;
- primary handoff.

Visual treatment:

- strongest line;
- solid;
- clear directional terminal or arrow where direction matters.

## Secondary / enabling flow

Meaning:

- governance;
- support;
- enabling dependency;
- cross-cutting relation.

Visual treatment:

- lighter/dashed or lower-contrast path.

## Value return

Meaning:

- evidence;
- revenue;
- learning;
- public value;
- retained capability;
- improved method/instrument;
- reusable institutional memory.

Visual treatment:

- semantic green or other carefully bounded state accent;
- should visibly return toward retained capacity or future work rather than imply shareholder return.

Important:

> `Value Return` is not synonymous with financial return.

The page must preserve public, institutional, technical, and economic forms of returned value separately where needed.

---

# Visual style authority

The production website is the authority for this projection.

The diagram should not invent a separate infographic brand.

Current relevant style sources include:

- `src/app/bf-industrial-tokens.css`
- `src/app/p3-industrial-control-panel.css`
- `src/app/p17-root-card-visual-grammar.css`
- `src/app/p14-root-instrumentation.css`
- `src/app/lab-machine-home-final.css`
- `src/app/hero-screen.css`
- `src/lib/ui-shell.ts`

The current production renderer is the **Card** shell. Apparatus remains a prototype. Therefore this projection should inherit the mature Card/control-panel grammar first and may later become an Apparatus-native projection when that renderer is production-ready.

---

# Physical design grammar

The correct metaphor is:

> **A modern public-works control interface, not a photograph of public-works equipment.**

Think:

- water treatment control room;
- power-distribution operator surface;
- municipal infrastructure panel;
- instrumentation rack;
- process-control console;
- industrial supervisory interface.

Do **not** think:

- exposed plumbing wall;
- steampunk machine;
- boiler room;
- rusty mechanical plant;
- sci-fi cockpit;
- generic SaaS dashboard;
- flat systems-engineering poster.

The site already defines a useful hierarchy:

- **seams** separate housings;
- **bezels** lift controls;
- **wells** recess subordinate state;
- **registers** label or expose state;
- **terminals** indicate lawful traversal/connection;
- **rails/traces** expose routing;
- **signal color** indicates semantic state, not decoration.

That hierarchy should govern this projection.

---

# Material treatment

Preferred production treatment:

- dark matte gunmetal / slate backplane;
- stepped steel values for housings and controls;
- quiet brushed-metal or etched-line detail;
- off-white / workshop-white primary text;
- silver secondary text;
- restrained shadows and recesses;
- small signal lights;
- semantic accent colors used sparingly;
- minimal texture;
- clean, new, institutional condition.

The physicality should be inferred through edge behavior and hierarchy, not simulated with excessive photographic realism.

---

# Avoid the literal-pipe failure mode

Several early visual studies used large circular pipes or rings around BFL.

That is now explicitly rejected.

## Why the circular pipe is wrong

It implies:

- one closed mechanical process;
- forced circular causality;
- a literal fluid system;
- false symmetry;
- a decorative halo around the logo.

The actual system is a typed network with multiple inputs, transformations, branches, validation paths, transfers, and return relationships.

The Economics Web should therefore use:

- thin routed traces;
- terminal blocks;
- cable/conduit-like rails;
- bus structures;
- directional process lines;
- junctions;
- cross-links;
- clear local topology.

No giant circular pipe.

No mandatory radial symmetry.

No connection should exist only to make the composition visually complete.

---

# Diagram density

The surface should feel information-rich but not busy for its own sake.

Recommended density hierarchy:

## Level 0 — gestalt

Visible at a glance:

- BFL in center;
- resources/problems enter;
- work happens inside;
- validation/transfer/value leave;
- value/capability returns.

## Level 1 — named modules

Visitor can identify:

- major capital channels;
- major Lab Machine functions;
- major output/transfer relationships.

## Level 2 — explanation

Hover/focus/click reveals:

- short descriptor;
- current state;
- relation meaning;
- evidence / claim standing;
- related canonical projection.

## Level 3 — diligence

Traversal opens the relevant governed page or evidence surface.

The full explanatory copy should not be printed onto the machine face at once.

---

# Interaction model

The economics projection should behave like an instrument, not a static poster.

## Hover / focus

Highlight:

- selected node;
- direct inbound/outbound routes;
- relationship type;
- small contextual explanation.

De-emphasize unrelated connections rather than hiding them completely.

## Click / enter

Open a bounded detail register or traverse to the canonical projection.

Examples:

- Capital -> capital relationship modes / what capital unlocks
- Research Funding -> funding architecture / current fundable work
- Problem Intake -> Bring Us Your Difficult System
- Validation -> evidence / witness-domain material
- Distribution -> Service Bus
- Public Value -> Public Value projection
- Product Revenue -> Products / commercial evidence
- Institutional Capacity -> institutional-capacity projection

## Inspect mode

A visitor should be able to select a flow and answer:

- what enters;
- what changes;
- who/what owns the transition;
- what evidence is produced;
- what failure looks like;
- where responsibility moves next.

This is a natural use of Boundary First UX rather than generic infographic interaction.

---

# State treatment

The page should distinguish **type**, **state**, and **claim status**.

Color should not do all three jobs.

Recommended state examples:

- current / operational;
- available;
- formation-stage;
- opportunity identified;
- not yet exercised;
- validation required;
- externally reviewed;
- blocked;
- stopped / retired;
- transferred.

Do not put a global `OPERATIONAL` badge on the entire Lab unless its meaning is tightly defined. A status indicator may instead refer specifically to the page/instrument being live or to individual subsystem state.

---

# Formation-stage visibility

The design must not visually imply more institutional maturity than exists.

Avoid interface cues that accidentally suggest:

- a large staff;
- established independent governance;
- active strategic investors;
- existing sponsors;
- validated partnerships;
- recurring product revenue;
- broad external replication;
- mature institutional succession.

Nodes may exist as **relationship classes** even when no current relationship exists, but their state must be represented honestly.

Example:

`STRATEGIC CAPITAL` may be a lawful port labeled `OPEN / STRUCTURE TBD`, not a glowing active revenue channel.

---

# Content hierarchy

The diagram should not require every module to carry a paragraph.

Recommended module anatomy:

```text
+--------------------------------+
| CAPITAL INPUT             C-04 |
|                                |
| STRATEGIC CAPITAL              |
| Long-horizon capacity          |
|                                |
| +-- CONVERTS TO -------------+ |
| | validation capacity        | |
| | institutional capacity     | |
| +----------------------------+ |
+--------------------------------+
| INSPECT / ROUTE            [ ] |
+--------------------------------+
```

This matches the site's current physical logic better than a decorative plaque.

---

# Capital modules should expose consequence

Selecting a capital module should reveal more than use-of-funds copy.

Each capital class should expose:

- current bottleneck;
- capacity unlocked;
- work enabled;
- root/stewardship obligation;
- closure event;
- evidence generated;
- transfer/public-value/revenue path;
- stop/reversal condition.

This is the existing Capacity Console concept expressed spatially.

---

# Branch / Root interlock in the diagram

Whenever an expansion node is highlighted, the UI should be capable of revealing its root requirement.

Examples:

| Branch | Root |
| --- | --- |
| New research lane | provenance + review + evidence path |
| New product | maintenance + support + retirement owner |
| New partnership | authority + attribution + expectation + repair contract |
| New public claim | evidence + claim ceiling + correction path |
| New automation | authorization + observation + suspension + accountability |
| New standard | versioning + conformance + stewardship + correction |

Possible visual treatment:

- branch node brightens;
- paired ROOT register opens below/behind it;
- unsupported branch displays an incomplete terminal/state.

---

# Problem Intake treatment

`BRING US YOUR DIFFICULT SYSTEM` should not be a minor footer CTA.

It should be visible as a genuine input port into the institutional machine.

Recommended presentation:

- strong but not dominant doctrine plate on the left or lower-left;
- direct trace into `PROBLEM INTAKE`;
- from Problem Intake, route to diagnostic/reconstruction machinery;
- allow traversal to the full Problem Input projection.

Preferred language:

> **Bring us your difficult system.**

Supporting line:

> **You do not need to simplify the problem before you bring it to us.**

---

# Relationship to the entry hero

The current site has a valuable tonal transition:

1. light, editorial, restrained entry threshold;
2. `Enter the lab`;
3. darker industrial machine environment.

The capital/economics projection can exploit the same transition.

One possible narrative sequence:

## Editorial threshold

Light, calm copy:

> **The Case for Boundary First Labs**
>
> Capitalizing Boundary First Labs means funding the machinery between insight and validated capability.

Action:

`INSPECT THE MACHINE ->`

## Machine view

The page transitions into the dark economics/control-board projection.

This prevents the capital case from becoming visually exhausting while still giving the institutional machinery a memorable full-system view.

---

# Responsive behavior

The desktop composition can be spatial.

Mobile must not merely shrink the entire machine.

## Desktop

- central BFL chassis;
- left/right infrastructure banks;
- visible routing;
- inspectable full topology.

## Tablet

- central chassis remains prominent;
- modules cluster into collapsible banks;
- fewer simultaneous traces;
- selected route emphasized.

## Mobile

Use a linear instrument sequence while preserving topology through interaction.

Possible order:

1. BFL / Lab Machine
2. Capital Input bank
3. Problem Input bank
4. Internal conversion modules
5. Validation
6. Distribution / transfer
7. Return / retained capacity

Apply the existing Boundary First mobile principle where ordinary scrolling can become information-bearing: during active scroll/hold, cards may compress or shift to reveal routing/connection context beside them rather than forcing every connection into the static narrow view.

Do not reproduce the full desktop web as unreadable miniature wiring.

---

# Accessibility

The diagram cannot rely on spatial position or line color alone.

Requirements:

- full keyboard traversal;
- meaningful focus order;
- accessible node labels;
- accessible relation descriptions;
- reduced-motion mode;
- non-color flow distinctions;
- text/list equivalent of the graph;
- screen-reader representation of primary flows;
- no essential information stored only in hover;
- mobile equivalent maintains semantic parity.

A linear textual projection should be mechanically derivable from the same structured content.

---

# Visual anti-patterns

Reject the following during implementation/review:

- giant circular pipe around BFL;
- literal water/sewage plumbing as the primary metaphor;
- beige faux-industrial wall of pipes as a separate visual brand;
- rust, grime, distressed steel, or aged factory effects;
- unnecessary bolts/screws on every object;
- steampunk styling;
- neon sci-fi control room;
- generic node-link network diagram;
- generic startup flywheel;
- circular arrows implying all flows are equivalent;
- arrows that exist only for visual symmetry;
- every node glowing green and therefore appearing active/validated;
- revenue and public value merged into one output;
- capital flowing directly to impact/returns;
- financial-market option value visually promoted as current capability;
- an infographic image that cannot become an interactive governed projection;
- dense tiny copy printed permanently onto every module.

---

# Visual QA questions

Before accepting a production pass, ask:

1. Does it look like the current BFL site rather than a new infographic brand?
2. Is BFL unmistakably the central institutional chassis?
3. Can the visitor distinguish the Lab Machine from the Economics Web?
4. Are Capital Input and Problem Input visibly different concepts?
5. Can the visitor understand the gestalt without reading every label?
6. Are connections semantically typed rather than decorative?
7. Does the page show resource input, work, validation, transfer, and return without forcing a fake circle?
8. Does public value remain distinct from revenue?
9. Does retained capacity remain distinct from investor return?
10. Are inactive / formation-stage / unvalidated ports visually honest?
11. Does every capital-enabled branch have a discoverable root obligation?
12. Can the user inspect what a connection actually means?
13. Does the surface preserve the current BFUX housing / bezel / well / register / terminal grammar?
14. Is the machine clean, matte, institutional, and modern rather than decorative industrial cosplay?
15. Does mobile preserve topology without shrinking the desktop board into illegibility?
16. Can the same data render as an accessible linear projection?

---

# Implementation backlog

## P0 — diagram data contract

- [ ] Add explicit node IDs for all capital/economics modules.
- [ ] Add typed relation objects: `primary_flow`, `secondary_flow`, `value_return`, `governance`, `evidence`, `transfer`.
- [ ] Add per-node `state`, `claimStatus`, `canonicalRef`, and `rootObligationRefs`.
- [ ] Add graph-level distinction between `lab_machine`, `capital_input`, `problem_input`, `economics_web`, and `value_return` regions.
- [ ] Ensure the graph can emit both spatial and linear projections.

## P0 — visual prototype

- [ ] Build a static production-style study using current BFUX Card/control-panel tokens.
- [ ] Remove all giant circular-pipe/ring geometry.
- [ ] Use the central BFL chassis + surrounding infrastructure-bank composition.
- [ ] Implement Primary / Secondary / Value Return line semantics.
- [ ] Implement four strategic doctrine registers.
- [ ] Implement compact flow-guide instrument.

## P0 — interaction

- [ ] Hover/focus route highlighting.
- [ ] Bounded detail register on selection.
- [ ] Canonical traversal from nodes to governed projections.
- [ ] Inspect relation semantics.
- [ ] Explicit inactive / formation-stage states.

## P1 — capital consequence inspection

- [ ] Current bottleneck.
- [ ] Capacity unlocked.
- [ ] Work enabled.
- [ ] Root obligation.
- [ ] Closure event.
- [ ] Evidence generated.
- [ ] Transfer/value path.
- [ ] Stop/reversal condition.

## P1 — responsive projections

- [ ] Tablet banked layout.
- [ ] Mobile linear apparatus layout.
- [ ] Mobile routing reveal interaction.
- [ ] Accessible text/list projection.

## P1 — editorial threshold

- [ ] Test light editorial `The Case for Boundary First Labs` threshold before machine reveal.
- [ ] Reuse current HeroScreen transition logic where practical rather than inventing unrelated motion language.

---

# Success criterion

The projection succeeds when a cold visitor can look at it for roughly ten seconds and understand:

> **Boundary First Labs is a machine that accepts difficult problems and institutional resources, converts them through research, methods, instruments, software, pilots, governance, and validation, and returns useful capability through products, services, public artifacts, partnerships, distribution, public value, revenue, and retained institutional capacity.**

Then, with inspection, the visitor should be able to answer:

> **What exactly enters here? What happens to it? What evidence is produced? What responsibility does the transition create? What comes out? What returns to the Lab? And what claim is the system actually entitled to make?**

That is the economics web.
