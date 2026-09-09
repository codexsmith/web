# Deferred Process Projection Rework

**Status:** deferred / hidden from ordinary subpage UI  
**Date:** 2026-09-08  
**Workstream:** Pass 20 — Public Front Door and Projection Consolidation  
**Related change:** PR #54 — hide the Process projection control on non-root pages while preserving the projection machinery

## 1. Decision

For now, keep the Lab-root **Timeline** available, but stop advertising **Process** as a normal view on subpages.

Do **not** delete the Process projection, URL compatibility, placement logic, process scopes, or circuit renderer.

The current Process surface contains useful machinery, but the public presentation is not yet semantically rich enough to justify a peer-level **Core / Evidence / Process** choice on most content objects.

The temporary public rule is therefore:

```text
ROOT
Core / Evidence / Timeline

SUBPAGES
Core / Evidence
Process hidden from normal controls

DIRECT PROCESS URL
still addressable for development / inspection
```

This is a deferral, not a rejection of the Process concept.

## 2. What triggered the review

The issue became obvious while comparing:

- the Publications Process page with the ordinary Publications/Core presentation;
- the Products Process page with the ordinary Products/Core presentation;
- the Lab-root Timeline, which uses the same internal `gestalt` projection key but performs a genuinely different temporal job.

The Publications and Products Process pages felt much more alike than their underlying domains should warrant.

Changing the focal object changed the title, inferred placement, placement reasons, and neighboring objects, but much of the visible page remained the same operating shell.

That produced two related problems:

1. **redundancy** — Process often repeated orientation already available from Core/status/context without adding enough new object-specific information;
2. **genericness** — pages from materially different branches inherited the same circuit, explanatory framing, stage vocabulary, and lower-page structure, so the projection read more like a template applied to an object than a new representation of that object's actual operating history.

## 3. What the current Process implementation actually does

For non-root nodes, `GestaltView` currently:

1. derives a `ProcessPlacement` for the focal node;
2. identifies a primary Boundary First process stage;
3. renders the shared Process Circuit at `full`, `phase`, or `local` scope;
4. explains why the object was placed at that stage;
5. shows other public nodes that resolve to the same primary stage.

The placement engine is transparent and useful. It derives stage scores from signals such as:

- node kind;
- declared status/stage;
- historical standing;
- inspections and source-bound evidence;
- retained/public links;
- semantic events such as introduced, developed, piloted, validated, shipped, revised, superseded, retired, reopened, evidence attached, or claim ceiling set.

It also explicitly warns that the result is a **projection from public signals**, not independently measured project-management state unless an underlying source records that state.

That distinction is important and should be preserved.

## 4. Why the pages become generic

The problem is not mainly visual styling. It follows from the current information model.

The Process projection mostly answers:

> Given what kind of object this is, its declared standing, and the public signals attached to it, where would it most naturally be placed in the Boundary First operating circuit?

That is a useful **classification / inferred placement** question.

But the public label **Process** suggests a stronger question:

> What actually happened to this object as it moved through the Boundary First operating process?

Those are not the same representation.

Because the current machinery is mostly inferential, many objects of the same broad kind/status naturally collapse toward similar stages and therefore similar pages.

Examples of the mechanism:

- product-like objects receive strong Construction / Execution priors;
- research-like objects receive Hypothesis / Validation priors;
- branches and documents tend toward Representation / Promotion;
- status values such as active development, pilot, developed, or shipped add the same stage-weight patterns across otherwise very different objects.

The result is lawful but coarse.

It tells us where an object *fits* in the generic process more reliably than it tells us the object's *specific process*.

## 5. Core already carries much of the missing specificity

The ordinary Core/section surfaces are generally object-specific:

- Products tells the visitor what the products are, how they differ, what state they are in, and where to go next;
- Publications/Paper Mine can expose actual publication objects, stages, claims, provenance, and corpus relationships;
- Research surfaces can expose the particular theory/program/artifact rather than only its inferred lifecycle position.

When Process adds only a generic stage placement on top of that, it can feel like a second explanation of status rather than a distinct operational representation.

This is why the redundancy was especially visible on Publications and Products: their Core views already have strong domain-specific organization, while Process currently reprojects them into the same universal nine-stage circuit.

## 6. The root Timeline proves the projection can be valuable when the relation is real

The root is the important counterexample.

The same internal `gestalt` key is special-cased at the Lab root into a founder/institutional **Timeline**.

That root view works better because it changes the relation being represented:

```text
Core      = what the Lab is / contains
Evidence  = what supports its standing and provenance
Timeline  = how it developed through time
```

The Timeline therefore contributes new structure rather than merely reclassifying the root object.

This reinforces the Pass-20 semantic distinction:

```text
Timeline = temporal relation
Process  = operational relation
Evidence = epistemic relation
```

The eventual Process projection should earn the same degree of semantic independence.

## 7. Preserve the machinery: the underlying idea is still strong

The current implementation should not be thrown away.

Several pieces are already valuable:

- the explicit nine-stage Boundary First operating circuit;
- stage questions and expected outputs;
- overlapping Agentic / Lean / Agile / Scientific / Computational / Constructive lenses;
- transparent stage scoring;
- process scope (`full`, `phase`, `local`);
- semantic-event integration;
- same-stage peer discovery;
- the warning boundary between inferred placement and recorded operational fact.

These can become the skeleton of a much stronger operational projection once the underlying object graph records more actual process state.

## 8. What a future Process projection should represent

Before Process returns as a normal public subpage control, it should become materially more object-specific.

A stronger Process projection should be able to answer questions such as:

### 8.1 What entered?

- source problem / pressure;
- intake artifact;
- originating request or research question;
- initial constraints;
- inherited assumptions;
- prior state.

### 8.2 What boundaries were chosen?

- scope decisions;
- exclusions;
- invariants;
- claim ceilings;
- actors / authorities;
- admissible and inadmissible states.

### 8.3 What representation was constructed?

- schema;
- model;
- grammar;
- prototype;
- publication object;
- software artifact;
- experiment;
- interface;
- transformation graph.

### 8.4 What transitions actually occurred?

Rather than only an inferred current placement, record object-specific events such as:

```text
intake -> boundary
boundary -> representation
representation -> hypothesis
hypothesis -> construction
construction -> execution
execution -> validation
validation -> repair
repair -> construction
validation -> promotion
```

The important feature is that the path need not be linear.

The real value of Boundary First Process is likely in showing **closure attempts, loops, repairs, abandoned paths, reopened states, and promotion gates**, not merely highlighting one stage in a canonical sequence.

### 8.5 What artifacts crossed each boundary?

Each transition should ideally expose its object:

- source bundle;
- specification;
- prototype;
- test result;
- counterexample;
- defect ledger;
- review artifact;
- claim update;
- deployment;
- publication packet;
- supersession record.

### 8.6 What evidence changed the next action?

Process should connect operational sequence to evidence without collapsing Process into Evidence.

The useful distinction is:

```text
Evidence: what supports or constrains the claim?
Process:  what did the system do because of that evidence?
```

### 8.7 What can happen next?

A useful operational projection should show admissible next transitions, not merely current placement.

For example:

- validate;
- repair representation;
- narrow claim;
- reopen intake;
- construct next artifact;
- promote;
- supersede;
- retire.

That would make Process genuinely actionable and explain how the Lab operates.

## 9. Likely data-model requirement

The key missing substrate is an object-specific **operational event / transition record**.

The current semantic-event system is already a useful beginning, but Process needs enough typed state to distinguish:

```text
INFERRED PLACEMENT
"this object looks like it belongs near Validation"

from

RECORDED PROCESS HISTORY
"this object entered Validation on event X because artifact Y produced observation Z;
that observation reopened Representation and generated repair artifact R"
```

A future model may resemble:

```text
ProcessEvent {
  objectId
  stage
  eventType
  timestamp / ordering
  inputRefs[]
  outputRefs[]
  evidenceRefs[]
  decision / transition
  authority / actor
  claimCeilingBefore
  claimCeilingAfter
  nextAdmissibleStages[]
  notes / boundary statement
}
```

This is illustrative, not a frozen schema.

The important design requirement is that **process state should be derived from actual governed events when available**, with heuristic placement retained only as a clearly marked fallback.

## 10. Relationship to the Knowledge Transform Graph / Research Lane

This deferred work may become easier once the wider Lab machinery records transforms as first-class objects.

The Process projection should probably not become a second manually maintained project-management system.

Instead, it should eventually be a projection over the same governed transform/event substrate used by:

- Research Lane;
- publication maturation;
- artifact promotion;
- evidence attachment;
- repair/supersession;
- Knowledge Transform Graph relationships.

A useful future architecture is:

```text
GOVERNED OBJECT + EVENT / TRANSFORM GRAPH
        |
        +--> Core
        |     content / context / topology
        |
        +--> Evidence
        |     sources / standing / claim boundary
        |
        +--> Timeline
        |     temporal ordering / lineage
        |
        +--> Process
              operational transitions / closure attempts / next actions
```

The projections should share the same underlying objects while answering different relation questions.

## 11. Re-exposure gate

Do not restore Process as a normal subpage button merely because the current generic page is visually improved.

Re-expose it when at least several real objects demonstrate that the projection adds information unavailable from Core.

A practical gate:

- [ ] Process can distinguish recorded operational history from inferred placement.
- [ ] At least three materially different object classes have object-specific process histories.
- [ ] The page shows actual transitions/loops, not only a highlighted generic stage.
- [ ] Inputs and outputs can be attached to process transitions.
- [ ] Evidence can explain why a transition occurred without collapsing Evidence and Process.
- [ ] The projection can expose lawful next actions / gates.
- [ ] Publications and Products no longer look like the same template with different nouns.
- [ ] Process gives a cold visitor a reason to select it after already reading Core.

## 12. Current implementation posture

Until those conditions are met:

- keep the homepage/root Timeline;
- hide Process from ordinary subpage view controls;
- preserve direct Process URLs for inspection and development;
- preserve `bfl-process` placement logic and Process Circuit components;
- do not invest in cosmetic polishing of generic Process pages as a substitute for richer operational data;
- revisit Process alongside Research Lane / governed transforms / executable knowledge-graph work.

## 13. Core finding

The Process idea was not the failure.

The current projection was **one semantic layer too early**.

The site already has enough information to infer where an object belongs in a generic operating circuit. It does not yet consistently have enough object-specific operational history to make **Process** a distinct public representation of that object.

So the correct move is not deletion and not further generic templating.

It is to preserve the apparatus, remove the premature public affordance, and return when the underlying event/transform graph can make the projection truthful, specific, and useful.
