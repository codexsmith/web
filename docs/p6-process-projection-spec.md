# P6 · Boundary First Process Projection Specification

## Governing invariant

`view=process` is not a project-management pipeline and must not become one through responsive wrapping.

The process projection represents a **repairable operating circuit** around the current bounded object:

> **Frame → Make / Operate → Answer / Repair → Promote / Steward → Reopen when evidence changes**

The object remains the same object. The projection changes which operational relationships around it are made visible.

## Canonical process stages

The existing nine stages remain canonical:

1. Intake / Observe
2. Boundary / Constraint
3. Representation / Model
4. Hypothesis / Claim
5. Construction / Prototype
6. Execution / Delivery
7. Validation / Measurement
8. Repair / Learning
9. Promotion / Stewardship

P6 changes their **morphology**, not their identity or placement scoring.

## Functional zones

### Zone A · Frame the work

Contains:

- Intake / Observe
- Boundary / Constraint
- Representation / Model
- Hypothesis / Claim

Purpose: establish the object, relevant regime, admissible representation, and bounded claim before implementation becomes the dominant representation.

### Zone B · Make & operate

Contains:

- Construction / Prototype
- Execution / Delivery

Purpose: force the representation into an inspectable artifact and let that artifact encounter a meaningful operating environment.

### Zone C · Answer & repair

Contains:

- Validation / Measurement
- Repair / Learning

Purpose: let consequence disagree with the claim, preserve discrepancy, and return defects to the boundary, representation, artifact, or operating rule that must change.

### Continuation dock · Promotion / Stewardship

Promotion is not rendered as a ninth equal pipeline tile.

It is a continuation gate responsible for deciding what may now be:

- claimed,
- published,
- shipped,
- maintained,
- transferred,
- superseded,
- archived,
- or retired.

Promotion does not imply terminal closure. Maintained work remains exposed to new evidence and consequence.

## Return path

The process surface must explicitly show that repair, later evidence, changed conditions, or stewardship observations can reopen prior work.

The return path may target:

- Intake when the observed state or problem changes,
- Boundary when scope or constraint assumptions fail,
- Representation when the model omitted a required distinction,
- Construction when the artifact is defective,
- or another earlier gate identified by evidence.

The visual contract is therefore a circuit rather than a one-way arrow.

## Stage card contract

Stage cards are orientation instruments, not miniature articles.

Each card carries:

- ordinal stage identity,
- BFUX semantic glyph,
- current placement standing: Stage / Participating / Primary,
- stage name,
- one stage question,
- and, where scope permits, the expected output.

`scope=full` prioritizes topology and keeps outputs compact.

`scope=phase` shows a smaller sub-circuit and may expose expected outputs.

`scope=local` is allowed to expose placement reasons because fewer process objects are present.

Long explanation belongs below the circuit in placement notes or in the underlying object/evidence surfaces, not by increasing stage-card height indefinitely.

## Operating disciplines

The following are overlays, not temporal stages:

- Agentic
- Lean Startup
- Agile
- Scientific
- Computational
- Constructive

They are rendered in a compact **Operating lenses** dock.

Each lens shows which process stages it participates in, while the explanatory role remains secondary to the process topology.

No discipline may visually masquerade as another process phase.

## Desktop composition

The full-loop desktop board uses spatial containment to expose role:

- Frame occupies the dominant upper field.
- Make & Operate forms a narrower execution rail.
- Answer & Repair occupies the downstream evidence/repair field.
- Promotion / Stewardship is an attached continuation dock rather than another equal tile.
- A full-width return rail makes reopening explicit.

The layout should read as an operating apparatus even before every label is read.

## Tablet composition

Below the desktop circuit threshold, preserve the functional zones but release the racetrack geometry:

1. Frame remains a full-width bounded zone.
2. Make & Operate and Answer & Repair occupy paired zones where width permits.
3. Promotion / Stewardship becomes a full-width dock.
4. The return path remains explicit.

This is a semantic recomposition, not a wrapped desktop grid.

## Mobile composition

Mobile is a zone-grouped vertical stepper.

Required invariants:

- zone identity remains visible;
- stage order remains visible;
- stage cards become short horizontal instruments;
- full/phase views omit secondary output prose when necessary to preserve scanning density;
- local scope may expose additional reasons/output because the visible stage set is smaller;
- the return path remains visible after the active circuit;
- method lenses become compact coverage instruments rather than full paragraphs.

The mobile representation must never try to preserve desktop XY geometry at the expense of readable content.

## DOM / component structure

```text
GestaltView
├── heading + placement scope
├── ProcessCircuit
│   ├── circuit heading
│   ├── process board
│   │   ├── ProcessZonePanel · Frame
│   │   │   └── StageCard × visible frame stages
│   │   ├── ProcessZonePanel · Make & Operate
│   │   │   └── StageCard × visible operating stages
│   │   ├── ProcessZonePanel · Answer & Repair
│   │   │   └── StageCard × visible answer/repair stages
│   │   ├── StewardshipDock · when Promotion is visible
│   │   └── ReturnRail · when full loop or repair/promotion is visible
│   └── DisciplineDock · except local scope
├── placement explanation
└── process peers
```

The founder/root Gestalt remains a timeline and continues to use the older timeline-specific stage morphology. P6 only replaces non-root `view=process`.

## Accessibility and projection parity

- Process zones are semantic `<section>` elements.
- Ordered stage collections remain `<ol>`.
- Stage state is not communicated by color alone.
- The return path has textual semantics, not only an arrow.
- Discipline coverage retains accessible stage names.
- Forced-colors preserves boundaries and active/primary distinction.
- Mobile preserves the same process order and zone meaning without requiring spatial interpretation.

## Acceptance criteria

A full-loop process view is acceptable only if:

1. it renders Frame, Make & Operate, Answer & Repair, Promotion / Stewardship, and a return path as distinct functional structures;
2. Promotion is not an equal ninth pipeline tile;
3. the six disciplines are visually subordinate overlays, not sequential stages;
4. desktop does not degrade into an auto-fit row of narrow cards;
5. tablet explicitly recomposes the circuit rather than relying on accidental wrapping;
6. mobile renders a readable zone-grouped vertical process without document horizontal overflow;
7. `scope=phase` and `scope=local` remain lawful sub-circuit projections;
8. placement derivation and the underlying nine-stage data model remain unchanged;
9. root/founder timeline behavior is unchanged;
10. process projection remains visibly inside the Boundary Frame.
