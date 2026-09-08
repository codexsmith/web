# Pass 20 — Public Front Door and Projection Consolidation

**Status:** backlog / strategic information-architecture refinement  
**Date:** 2026-09-08  
**Scope:** public homepage/front-door architecture, flagship artifact surfacing, Paper Mine/Publications consolidation, Timeline/Process/Evidence distinction repair, Research Lane placement, intake placement, and preservation of the existing Lab Machine as the deeper research engine

## 1. Decision

BoundaryFirstLabs.com already contains a substantial working research interface. The current landing experience says **ENTER THE LAB**, and that label is accurate: the visitor crosses directly into the Lab Machine and the research/institutional machinery.

The next step should **not** replace that machinery.

It should move the machinery one level deeper and place a more conventional, curated Boundary First Labs front door in front of it.

The public homepage should answer, quickly and concretely:

1. What is Boundary First Labs?
2. What has it made?
3. What can I inspect or use now?
4. What is happening inside the research program?
5. How can I bring a problem, collaborate, critique, or engage?
6. How do I enter the full Lab machinery?

The core architectural move is:

```text
PUBLIC FRONT DOOR
    |
    +--> flagship work
    +--> strongest institutional/research artifacts
    +--> interactive sandboxes
    +--> guided intake / engagement
    |
    v
ENTER THE LAB
    |
    v
CURRENT LAB MACHINE / RESEARCH ENGINE
```

The current site is therefore not being discarded. It becomes the deeper layer visitors deliberately enter after orientation.

## 2. Why this refinement is needed

Earlier front-door work emphasized a guided intake / wizard as the primary explanatory experience. That remains valuable, but the current site now has enough strong artifacts and enough available interface space that the homepage does not need to explain the Lab mainly through a single workflow.

The stronger approach is to let existing work explain the institution.

The homepage should surface the best objects that are currently buried inside the Lab, then allow the visitor to choose whether to inspect work, play with an instrument, bring a problem, or enter the machinery.

This changes the public sequence from:

```text
explain the institution
    -> classify the visitor
    -> reveal the work
```

into:

```text
orient
    -> show the work
    -> reveal the common method
    -> offer interaction / intake
    -> enter the Lab
```

The guided intake survives as a first-class action surface rather than carrying the entire burden of institutional explanation.

## 3. Homepage inventory

The current intended homepage inventory is deliberately small.

### 3.1 Flagship work

The strongest current outward-facing work should be visible immediately:

- **Software Before Code** — current flagship public method/book/product and clearest conventional entry into Boundary First engineering;
- **Boundary First UX** — interaction/design method and the website's own operating grammar;
- **Boundary First Chess** — education, cognition, product, and method demonstration;
- **Weather at Home / Boundary First Weather** — applied scientific/public-facing systems testbed.

Software Before Code should receive the strongest visual weight because it is currently the most legible bridge from established founder/software-engineering background into the wider Lab method.

The homepage should explain BFL by showing work first rather than requiring a visitor to accept the deepest research framing before seeing a concrete artifact.

### 3.2 Institutional / research gems

Three research-system surfaces should be promoted out of the machinery and onto the front door:

- **Timeline** — where the work came from and how the Lab developed;
- **Paper Mine** — the publication landscape, controlled papers, mined candidates, frontier, disciplines, relations, and maturation toward public research artifacts;
- **Research Lane** — planned live view of what is actively moving through the Lab now.

These three objects form a useful temporal/operational triad:

```text
TIMELINE
Where did this come from?

PAPER MINE
What is this becoming as publication/research output?

RESEARCH LANE
What is moving through the Lab now?
```

Research Lane is not yet implemented and should remain visibly forthcoming until there is a real underlying object/state model.

### 3.3 Interactive entry

The homepage should eventually surface the interactive/sandbox family without requiring the visitor to find it through the deeper research navigation.

The strongest initial anchor remains a familiar computational world such as the Python/Pac-Man sandbox because it permits the visitor to inspect state, boundaries, agents, local decisions, global structure, and emergence without simultaneously learning an unfamiliar domain.

Scientific/mathematical sandboxes can sit alongside or beneath this first familiar instrument as they mature.

### 3.4 Bring us a problem

The guided intake / problem-response workflow remains first-class:

```text
orient
    -> preserve distinctions
    -> classify
    -> explain
    -> route
    -> return state / receipt
```

The intake should not be reduced to a contact form. If BFL classifies a visitor's situation, the visitor should receive the classification, relevant signals, uncertainty, proposed response class, and conditions that would change the result.

However, the intake is now **one homepage instrument**, not the homepage's entire information architecture.

### 3.5 Enter the Lab

**ENTER THE LAB** should remain a major transition.

Its meaning becomes stronger after this refactor:

> Everything above is curated public orientation. Everything behind this boundary is the working research/institutional machinery.

The existing Lab Machine should remain available as a deeper research-engine experience rather than being flattened into conventional marketing pages.

## 4. Publications and Paper Mine are currently mis-layered

The current `LabMachinePublicationsProjection` does useful work, but its actual job is not what a conventional visitor expects from a page labeled **Publications**.

Its modes are:

- Publication Program;
- Maturity;
- Claim Provenance.

It explains publication-system definitions, governed boundary crossing, lifecycle/maturity vocabulary, validation signals, and claim provenance. It explicitly does **not** present itself as live inventory counts.

That makes the current Publications projection closer to:

- **Publication System**;
- **Publication Protocol**;
- **Publication Governance**;
- **How BFL Publishes**.

The **Paper Mine**, by contrast, is already the richer publication corpus. Its current public projection includes controlled publication objects and mined paper candidates, organized by discipline/stage/frontier with baselines, failure outcomes, claim ceilings, aliases, exclusions, and provenance.

### 4.1 Public information-architecture decision

Do not expose **Publications** and **Paper Mine** as two peer homepage cards.

Make **Paper Mine** the first-class public publication/research landscape.

Recommended structure:

```text
/publications
    |
    +--> conventional filtered publication index
    |       derived from Paper Mine controlled objects
    |
    +--> Explore the full Paper Mine
    |       controlled publications
    |       mined candidates
    |       frontier
    |       disciplines
    |       relationships
    |
    +--> How BFL publishes
            Publication System / Protocol
            maturity vocabulary
            claim provenance
            validation rules
```

Keep the existing Publications machinery, but **demote and rename it according to its real semantic job** rather than deleting it.

The homepage should therefore contain a **Paper Mine** card, not separate Paper Mine and Publications cards.

## 5. Timeline, Process, and Evidence must retain separate semantics

A similar naming collapse exists around Timeline.

The generic projection system already understands three different jobs:

- **Core** — content/context;
- **Evidence** — standing/sources/provenance;
- **Process** — operating sequence.

However, the internal `gestalt` / Process projection has historically also accepted or presented the label **Timeline** at the Lab root.

At the root, that projection is special-cased into a small Founder Timeline. Everywhere else, the same projection places an object inside the Boundary First operating process.

This means one label is currently spanning two different relation types:

```text
TIMELINE = temporal relation
PROCESS  = operational relation
```

These should no longer be collapsed.

### 5.1 Canonical semantic distinction

Use the following rule:

```text
Timeline = temporal relation
Process  = operational relation
Evidence = epistemic relation
```

More concretely:

- **Timeline** answers: when did this happen, what preceded/followed it, what did the Lab look like at time T, and where do lineages converge?
- **Process** answers: where does this object sit in the operating circuit, what enters, what transforms, what exits, and what can happen next?
- **Evidence** answers: what supports this claim/standing, what are the sources, what remains outside the claim, what changed, and under what provenance/evidence class?

Do not use Timeline as a public alias for generic Process once the dedicated temporal machinery exists.

## 6. Consolidate the timeline family

There are currently several timeline-like artifacts:

1. a small founder-development arc in the root Process/Gestalt projection;
2. the detailed **Master Founder & Intellectual Provenance Timeline** source object;
3. the newer **Lab Machine Timeline** interaction model with tracks, checkpoints, events, lineage, convergence, and Lab-at-time-T reconstruction;
4. dated change history inside Evidence views.

These are not all redundant, but they should become lawful projections of one temporal system rather than separately maintained concepts competing for the word Timeline.

Recommended architecture:

```text
CANONICAL TEMPORAL RECORD
Founder + intellectual + institutional chronology
        |
        +--> public Timeline
        |       tracks
        |       checkpoints
        |       lineages
        |       convergences
        |       Lab at time T
        |
        +--> compact founder arc
        |       summary projection
        |
        +--> Evidence inspection
                sources
                evidence class
                unresolved chronology
                verification tasks
```

The detailed founder/intellectual provenance timeline supplies the stronger chronology/evidence substrate.

The Lab Machine Timeline supplies the stronger public interaction model.

The small six-stage founder arc should become a summary projection of that underlying temporal model, not an independent timeline to maintain manually.

Evidence retains dated change history, but that history is an epistemic view over admitted changes rather than a competing institutional chronology.

## 7. Homepage card grammar

The homepage should avoid five unrelated bespoke marketing treatments.

Flagship/research cards should share a consistent grammar where useful, for example:

```text
NAME
one-sentence proposition

DOMAIN
FORM
STATE

Explore ->
```

The exact visual implementation may vary by importance, but the visitor should be able to tell:

- what the object is;
- what domain it belongs to;
- what form it takes;
- what state/maturity it is currently in;
- what action opens it.

Software Before Code may occupy a larger flagship footprint without implying that other Lab programs are invalid or abandoned.

## 8. Suggested public homepage sequence

A useful first composition is:

```text
1. HERO / INSTITUTIONAL ORIENTATION
   Boundary First Labs
   concise proposition
   Explore Work / Bring a Problem / Enter the Lab

2. FLAGSHIP WORK
   Software Before Code
   Boundary First UX
   Boundary First Chess
   Weather at Home

3. EXPLORE THE RESEARCH MACHINE
   Timeline
   Paper Mine
   Research Lane (when implemented)

4. INTERACTIVE LAB
   Pac-Man / familiar computational sandbox
   scientific / mathematical sandboxes as ready

5. BRING US A PROBLEM
   guided intake / problem-response receipt

6. ENTER THE LAB
   explicit transition into the existing Lab Machine
```

The order should remain adaptable to visual composition and mobile constraints. The key point is the semantic layering, not a rigid vertical marketing template.

## 9. Relationship to existing backlog work

This pass does not invalidate earlier work. It clarifies how several prior workstreams now compose.

### Pass 15 — Interaction Memory / Sandbox

Still a future participation layer. Useful later for sending canonical objects into a user-owned mutable workbench, but it is not required for the first front-door refactor.

### Pass 15 — Scientific Visualization Sandboxes

Still directly relevant. The new front door gives these experiences a public placement instead of requiring the Playground to be their only discovery surface.

### Pass 16 — Playground

Still useful as a deeper playful projection/catalog. It no longer needs to compete with the Lab as the only alternate root entrance. Playground objects may instead be surfaced selectively from the conventional homepage and then expanded into the dedicated Playground experience.

### Pass 16 — Public Site Positioning / Guided Intake

Still highly relevant. This pass narrows one assumption: the five-minute public explanation does not need to be carried primarily by a wizard. The site has enough strong work to explain itself through curated artifacts, with intake remaining a first-class action surface.

### Pass 17 — Governed Object Registry / Lab Machine

Provides the deeper engine that should be preserved behind **Enter the Lab**. It also makes the projection-semantics cleanup important: object identity should survive transitions among temporal, operational, epistemic, publication, and other projections without those relation types being mislabeled.

### Passes 18–19 — Screen Wall / Apparatus Landing

Remain useful prototype and visual-grammar sources. The Screen Wall may become a rich catalog for interactive worlds; the Apparatus Landing supplies a physical public-front-door direction. Neither should force the public homepage into a single giant apparatus or catalog metaphor if a calmer institutional front door works better.

## 10. Implementation priorities

### P0 — Freeze the public semantic inventory

- [ ] Confirm homepage flagship cards: Software Before Code, Boundary First UX, Boundary First Chess, Weather at Home.
- [ ] Confirm research-system cards: Timeline, Paper Mine, Research Lane.
- [ ] Keep Research Lane marked forthcoming until backed by real state.
- [ ] Keep guided intake as a homepage action/instrument.
- [ ] Preserve Enter the Lab as the transition into the existing research engine.
- [ ] Decide whether interactive sandboxes appear as one family card initially or individual featured instruments.

### P0 — Repair naming and projection boundaries

- [ ] Stop presenting generic Process as Timeline.
- [ ] Keep `gestalt`/compatibility internals only as necessary; public labels should reflect semantic function.
- [ ] Reserve Timeline for temporal views.
- [ ] Keep Evidence for standing/sources/provenance.
- [ ] Rename/demote the current Publications subsystem surface to Publication System / Protocol / Governance language.

### P1 — Paper Mine / Publications consolidation

- [ ] Make `/publications` a conventional public index derived from controlled Paper Mine records.
- [ ] Link from the publication index into the full Paper Mine.
- [ ] Link from Paper Mine/publications into the Publication System explanation.
- [ ] Avoid duplicating publication inventory in manually maintained page data.
- [ ] Preserve maturity, claim ceiling, provenance, and human-gate distinctions.

### P1 — Timeline consolidation

- [ ] Define which temporal source is canonical.
- [ ] Map detailed founder/intellectual provenance events into the Lab Machine Timeline model where lawful.
- [ ] Preserve evidence classes, date precision, unresolved chronology, and verification tasks.
- [ ] Derive the compact founder arc from canonical temporal data rather than maintaining it separately.
- [ ] Keep Process and temporal traversal as separate operations.

### P1 — Public front-door implementation

- [ ] Add a new conventional public homepage layer without deleting the existing Lab Machine.
- [ ] Route **Enter the Lab** into the current machine/research experience.
- [ ] Surface flagship and research cards with real current status.
- [ ] Preserve mobile legibility and a clear no-animation path.
- [ ] Avoid generic SaaS/dashboard treatment.

### P2 — Interactive / intake expansion

- [ ] Feature first familiar sandbox when there is a stable public implementation.
- [ ] Add scientific visualization instruments as they become executable and validated.
- [ ] Implement guided intake/state receipt from the existing pass-16 specifications.
- [ ] Later connect canonical objects to Pass-15 sandbox transfer semantics.

## 11. Non-goals

This pass does **not** propose:

- deleting the Lab Machine;
- hiding or weakening the deep research program;
- turning BFL into a generic consulting/SaaS website;
- treating every research object as a commercial product;
- presenting Research Lane before real implementation/state exists;
- merging Process, Timeline, and Evidence for visual convenience;
- treating publication as peer review, correctness, endorsement, or authority;
- duplicating Paper Mine data into a second manually maintained Publications inventory;
- building the full sandbox/workbench before the front-door information architecture is useful.

## 12. Acceptance test

The front-door refinement succeeds when a cold visitor can answer, without entering the full Lab Machine:

- What is Boundary First Labs?
- What are its strongest current products/methods/projects?
- Where did this body of work come from?
- What is being turned into papers?
- What is actively moving through research now?
- Can I try anything?
- Can I bring the Lab a problem or collaborate?
- Where do I go if I want to inspect the actual machinery?

And when the visitor chooses **ENTER THE LAB**, the transition should feel semantically true:

> The curated institutional front door has ended. The working research machine begins.

## 13. Core refinement

The public website no longer has a material shortage. It has an information-architecture problem.

The strongest current move is therefore not to invent more explanatory copy. It is to **promote the existing gems, restore semantic distinctions where multiple projections have collapsed into one label, and make the Lab Machine the deep engine behind a clearer public boundary.**
