# Process Machine and Execution Trace — Development Rationale and Spec

**Status:** deferred architecture / future implementation spec  
**Date:** 2026-09-08  
**Workstream:** Pass 20 — Public Front Door and Projection Consolidation  
**Related:** `process_projection_deferred_rework.md`, PR #54  

## 1. Refined finding

The current Process circuit being generic is probably **not itself the design failure**.

The stronger lineage hypothesis is that the website Process circuit is a generalized/public-facing port of the **Agentic Scientific Method / Boundary First operating machine**.

That machine is supposed to be reusable across different kinds of work.

The mismatch happened one level later: the site presented the reusable operating machine as though it were the **specific process history of the focal object**.

The corrected distinction is:

```text
PROCESS MACHINE
How Boundary First work may lawfully proceed in general.

PROCESS TRACE
How this particular object actually moved through that machine.
```

This spec preserves the machine and defines the missing trace layer.

## 2. Architectural lineage

The current family can be read as a sequence of projections of the same underlying research-control grammar.

### 2.1 Agentic Scientific Method

The Agentic Scientific Method defines a recursive inquiry/control cycle in which situated agents:

```text
observe
  -> distinguish / model
  -> take admissible action
  -> produce witness / evidence / defect
  -> critique / adjudicate
  -> retain / reject / revise / promote / quarantine / repair
  -> successor research state
```

Canonical Lab reference:

`boundary-first-labs/.../agentic_scientific_method_verification_checklist.md`

The important characteristics are already present:

- explicit inquiry and consequence boundary;
- representation construction;
- hypotheses / candidate actions;
- admissibility;
- execution;
- evidence and witness;
- defect;
- criticism;
- repair;
- promotion;
- successor state;
- reopening.

### 2.2 BFUX social projection

The BFUX family already translates the same machine into a more legible human workflow:

```text
Ask -> Plan -> Run -> Check -> Improve -> Share
```

Canonical Lab reference:

`.../bfl_ux_family_rdp_v0_1/docs/04_AGENTIC_SCIENTIFIC_METHOD_SOCIAL_PROJECTION.md`

Its own principle is:

> Remove the big words, not the structure.

This is strong evidence that the operating machinery was intentionally being projected into different UX vocabularies while preserving the same underlying distinctions.

### 2.3 Website Process circuit

The web repo generalizes the machine again as:

```text
Intake / Observe
  -> Boundary / Constraint
  -> Representation / Model
  -> Hypothesis / Claim
  -> Construction / Prototype
  -> Execution / Delivery
  -> Validation / Measurement
  -> Repair / Learning
  -> Promotion / Stewardship
  -> reopen
```

The first P6 implementation was explicitly committed as a **BFUX process circuit projection** and grouped the stages into:

```text
Frame the work
  -> Make & operate
  -> Answer & repair
  -> Stewardship
  -> Return / reopen
```

The same implementation overlays Agentic, Lean Startup, Agile, Scientific, Computational, and Constructive lenses over the shared circuit.

### 2.4 Working lineage model

The current architecture is therefore best understood as:

```text
AGENTIC SCIENTIFIC METHOD
research-control machine
        |
        v
BFUX SOCIAL PROJECTION
human-operable research workflow
        |
        v
BFL PROCESS CIRCUIT
general institutional operating machine
        |
        v
CURRENT ?view=process
machine + inferred focal-object placement
```

The final step conflated **machine** and **trace**.

## 3. Why Products and Publications looked the same

The earlier review found that Products, Publications, Research, About, and other nodes produced highly similar Process pages.

That observation remains correct, but the interpretation changes.

The sameness is expected at the **machine** layer.

Products and Publications should both be able to pass through the same Boundary First operating grammar.

The problem is that the current page mostly shows:

```text
THE SAME MACHINE
+ a title
+ an inferred primary stage
+ placement reasons
+ same-stage peers
```

rather than:

```text
THE SAME MACHINE
+ THIS OBJECT'S ACTUAL PATH THROUGH IT
```

So the machine was doing its job as a universal coordinate/operating system, while the UI asked it to perform the job of a history/trace object it did not yet have.

## 4. Preserve three separate concepts

Future implementation should keep these concepts distinct.

### 4.1 Process Machine

A canonical, reusable grammar of Boundary First work.

Answers:

- What stages exist?
- What is each stage responsible for?
- What does each stage produce?
- Where may repair/reopening occur?
- Which method lenses operate over the circuit?
- What are lawful promotion/stewardship boundaries?

This object is intentionally generic.

### 4.2 Process Placement

An inferred or declared location of an object relative to the machine.

Answers:

- Where does this object appear to sit now?
- What public signals support that placement?
- Is that placement inferred, declared, or recorded?

The current `deriveProcessPlacement()` machinery already does this reasonably well.

Placement remains useful as:

- fallback;
- inspection aid;
- search/filter coordinate;
- provisional state when no richer history exists.

It must remain visibly distinct from recorded history.

### 4.3 Process Trace

A governed execution record showing how a particular object actually traversed the machine.

Answers:

- Where did this object enter?
- Which stages did it actually visit?
- In what order?
- What artifacts crossed each transition?
- Which evidence caused branching, repair, reopening, promotion, or retirement?
- Which stages were skipped, repeated, or abandoned?
- What state is active now?
- What transitions are admissible next?

This is the missing first-class object.

## 5. Process Trace is not a linear timeline

A Process Trace must not degrade into a progress bar.

The primary value of the Boundary First machine is precisely that work may:

- loop;
- reopen;
- repair an earlier representation;
- narrow a boundary;
- reject a hypothesis;
- preserve a failed experiment;
- fork into multiple constructions;
- return from field evidence to intake;
- promote one claim while leaving another unresolved;
- supersede or retire prior work.

Example:

```text
INTAKE
  |
BOUNDARY
  |
REPRESENTATION
  |
HYPOTHESIS
  |
CONSTRUCTION
  |
EXECUTION
  |
VALIDATION
  |\
  | defect
  v
REPAIR
  |
  +----> REPRESENTATION
            |
         CONSTRUCTION
            |
         VALIDATION
            |
         PROMOTION
```

That nonlinearity is not visual decoration. It is the operational content.

## 6. Proposed data model

Do not freeze this schema yet, but future machinery needs a typed event/transition substrate sufficient to derive a trace.

Illustrative model:

```text
ProcessTrace {
  traceId
  objectId
  machineVersion
  currentState
  events[]
  openTransitions[]
  standing
}

ProcessEvent {
  eventId
  objectId
  stage
  eventType
  occurredAt / sequence
  actorRefs[]
  authorityRef?
  inputRefs[]
  outputRefs[]
  evidenceRefs[]
  defectRefs[]
  claimRefs[]
  boundaryRefs[]
  decision?
  fromStage?
  toStage?
  closureState?
  notes?
}

ProcessTransition {
  transitionId
  fromStage
  toStage
  causeEventId
  admissibility
  authority
  evidenceRefs[]
  producedRefs[]
}
```

The important invariant is:

> A trace is derived from governed events and transitions, not manually painted onto the diagram.

## 7. Recorded history vs inferred placement

The UI and data model should support three epistemic levels.

### Recorded

A source-backed process event explicitly says the object crossed or occupied a process stage.

Example:

```text
validation event EVT-204
result: counterexample found
transition: Validation -> Repair
repair artifact: DEFECT-19
```

### Declared

A maintained object/status record explicitly declares current process standing, but does not provide the full transition history.

### Inferred

The existing scoring system estimates placement from kind, status, evidence, links, and semantic events.

These must never be silently merged.

Suggested UI language:

```text
Recorded trace
Declared standing
Inferred placement
```

## 8. Relationship to Evidence, Timeline, and Core

These projections should all operate over shared governed objects without becoming synonyms.

```text
CORE
What is this object?
What does it contain / connect to?

EVIDENCE
What supports, constrains, or contests its standing and claims?

TIMELINE
When did events occur and how did lineage develop through time?

PROCESS
What operational transitions occurred and why?
```

The same event may participate in more than one projection.

Example:

```text
2026-09-08 validation run finds defect
```

Timeline cares about **when** it occurred.

Evidence cares about **what the result supports or contradicts**.

Process cares about **what transition the result caused**.

Core may expose the resulting defect or revised artifact as part of the object's present state.

This is lawful reuse, not duplication.

## 9. Relationship to Research Lane

Research Lane is likely a live operational projection over many traces.

A useful distinction is:

```text
PROCESS MACHINE
The grammar.

PROCESS TRACE
One object's execution through the grammar.

RESEARCH LANE
Many active traces viewed as current institutional flow.
```

This suggests Research Lane should not maintain a separate incompatible workflow model.

It should consume the same event/transition substrate where possible.

## 10. Relationship to Knowledge Transform Graph

The wider Knowledge Transform Graph may become the durable substrate beneath all three.

A likely composition is:

```text
GOVERNED OBJECT / TRANSFORM / EVENT GRAPH
          |
          +--> Process Machine
          |      admissible transformation grammar
          |
          +--> Process Trace
          |      realized path through transformations
          |
          +--> Research Lane
          |      live aggregation of active realized paths
          |
          +--> Timeline
          |      temporal projection
          |
          +--> Evidence
                 epistemic projection
```

In that architecture, the Process machine is not merely a web diagram.

It becomes a **grammar of lawful institutional transformation**.

A trace is an execution of that grammar.

## 11. Product / Publication examples

### 11.1 Product

A product trace might look like:

```text
Need / intake record
  -> bounded product problem
  -> product representation / architecture
  -> value or behavior hypothesis
  -> prototype
  -> pilot execution
  -> measurements
  -> repair
  -> second prototype
  -> validation
  -> ship
  -> field evidence
  -> reopen / maintain
```

The value comes from the actual artifacts and decisions attached to those transitions.

### 11.2 Publication

A publication trace might look like:

```text
research result
  -> bounded claim
  -> formal representation
  -> candidate manuscript
  -> internal criticism
  -> evidence repair / claim narrowing
  -> revised artifact
  -> promotion gate
  -> public version
  -> external criticism / citation / counterexample
  -> correction / supersession / maintenance
```

Products and Publications therefore use the same machine while producing visibly different traces.

## 12. Public UX direction

Do not restore the old Process button by simply drawing the generic circuit more beautifully.

A future object-level Process view should foreground the trace.

Possible composition:

```text
[ object identity ]
[ current operational standing ]

TRACE
actual visited stages and transitions
with loops / defects / branch points

SELECT EVENT
inputs
outputs
evidence
decision
authority
claim/boundary changes

MACHINE CONTEXT
show full canonical circuit as coordinate system

NEXT ADMISSIBLE MOVES
validate / repair / promote / reopen / retire ...
```

The generic machine becomes context/backplane rather than the entire page.

## 13. Separate first-class machine surface

Because the machine is useful in its own right, consider giving it an explicit home rather than relying on arbitrary object Process pages to explain it.

Candidate public/internal labels:

- Boundary First Operating Circuit
- How the Lab Works
- BFL Operating Machine
- Agentic Scientific Method / Operating Circuit

Naming should be decided later, but the semantic role should be explicit:

> This is the reusable operating grammar, not one object's history.

## 14. Implementation phases

### Phase A — preserve and name

- [x] Hide Process from normal subpage controls for now.
- [x] Preserve direct routes and existing machine components.
- [ ] Document the machine/placement/trace distinction in code-facing docs.
- [ ] Decide canonical public/internal name for the machine.

### Phase B — trace substrate

- [ ] Define typed process event schema.
- [ ] Define typed transition schema.
- [ ] Distinguish recorded / declared / inferred standing.
- [ ] Connect existing semantic events where lawful.
- [ ] Attach input/output/evidence/defect/artifact references.
- [ ] Represent reopen, repair, supersession, promotion, and retirement explicitly.

### Phase C — first real traces

Implement traces for at least three materially different object classes, preferably:

- [ ] one Product;
- [ ] one Research program/object;
- [ ] one Publication / Paper Mine object.

Use real repo history/artifacts rather than synthetic demo data where possible.

### Phase D — Process projection

- [ ] Render realized trace over/alongside canonical machine.
- [ ] Support nonlinear loops and branch points.
- [ ] Event inspector exposes causes, evidence, artifacts, and authority.
- [ ] Show next admissible transitions.
- [ ] Fall back to clearly labeled inferred placement only when no trace exists.

### Phase E — institutional aggregation

- [ ] Reuse traces in Research Lane.
- [ ] Test aggregation across products/publications/research.
- [ ] Integrate with Knowledge Transform Graph / governed transform substrate.

## 15. Re-exposure gate

Restore Process as a normal public subpage projection only when:

- [ ] the machine is explicitly distinguished from the trace;
- [ ] trace events are source/governance backed;
- [ ] the view shows actual realized transitions;
- [ ] loops, repairs, and reopenings are representable;
- [ ] artifacts/evidence can be inspected at transitions;
- [ ] recorded, declared, and inferred state are visually distinct;
- [ ] Products and Publications visibly differ because their traces differ, not because their machine differs;
- [ ] the generic circuit still functions as a common coordinate system;
- [ ] at least three real object traces provide useful information unavailable from Core alone.

## 16. Non-goals

This work is not:

- a generic project-management dashboard;
- a linear stage/progress tracker;
- a second manually maintained lifecycle database;
- a replacement for Timeline;
- a replacement for Evidence;
- a bespoke workflow per object class;
- an argument that every object must traverse every stage;
- a requirement that all work reaches Promotion;
- a claim that inferred placement is recorded operational truth.

## 17. Core rationale

The most important correction is:

> **We accidentally presented the operating machine as though it were an object's execution trace through the machine.**

The machine's generality is likely a feature inherited from the Agentic Scientific Method / Boundary First operating architecture.

The next development task is therefore not to specialize the machine separately for Products, Publications, Research, About, and every other branch.

It is to build the missing **typed execution trace** over a shared machine.

That preserves the universal grammar while restoring object-specific operational meaning.
