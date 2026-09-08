# Task: Guided Tour Panel / Five-Minute Orientation

**Status:** backlog / concept ready for implementation design  
**Date:** 2026-08-31  
**Primary surface:** main Boundary First Labs apparatus / landing machinery  
**Type:** content panel + guided routing layer  

## Goal

Add a **guided tour panel** to the main Boundary First Labs machinery that gives a visitor a coherent five-minute understanding of the Lab without sending them to a separate explainer page.

The experience should answer the practical visitor constraint:

> **You have five minutes. Make me understand what this place is, what the central move is, what the Lab actually does, and where I should go next.**

This is not intended to replace the exploratory site architecture. It is a bounded traversal through that architecture.

The tour should behave as an **interpretive instrument attached to the apparatus**.

## Core design decision

The five-minute experience should **not** be implemented as a standalone `Start Here`, `About`, or marketing-summary page.

Instead, expose it as an additional physical/content panel attached to the main machinery.

Conceptually:

```text
MAIN APPARATUS
    |
    +-- normal exploratory operation
    |
    +-- TOUR PANEL
           |
           +-- 5 MIN ORIENTATION
```

When the tour begins, the existing apparatus remains present. The tour panel temporarily constrains attention and routes the visitor through selected existing objects.

Useful formulation:

> **Tour = ordered traversal through existing site objects + narration + viewport/focus state.**

## Why this exists

The site already supports depth, exploration, multiple domains, research artifacts, products, public-interest work, and increasingly spatial/apparatus-style interaction.

What is missing is a deliberately engineered **compression layer** for a visitor who is interested but time-bounded.

The five-minute tour should preserve the most important invariants of the larger site:

1. **Identity** — what Boundary First Labs is.
2. **Problem** — what class of failure the Lab is concerned with.
3. **Insight / method** — what the Boundary-First move is.
4. **Evidence** — what has actually been built, researched, or applied.
5. **Invitation / routing** — where the visitor should go next based on their interest.

The experience is therefore better understood as a **temporal projection of the Lab** than as a short About page.

## Interaction model

### Attached panel

The tour should appear as a physically integrated module in the Boundary First apparatus family.

Possible compact default state:

```text
┌─────────────────────────┐
│ GUIDED TOUR             │
│                         │
│ 5 MIN — ORIENTATION     │
│                         │
│ [ START TOUR ]          │
└─────────────────────────┘
```

The public-facing label may be as compact as:

```text
5 MIN
```

or:

```text
TOUR
```

The internal/content name can remain:

> **Boundary First Labs Five-Minute Orientation**

### Active state

Once activated, the panel remains available while the visitor moves through the apparatus.

Example:

```text
┌──────────────────────────┐
│ BOUNDARY FIRST LABS      │
│ GUIDED TOUR              │
├──────────────────────────┤
│ ● ● ● ○ ○ ○              │
│                          │
│ 03 / 06                  │
│ REPRESENTATION           │
│                          │
│ A representation does    │
│ not merely describe a    │
│ system. It determines    │
│ what can be observed     │
│ and acted upon.          │
│                          │
│ [ BACK ]     [ NEXT ]    │
│                          │
│ EXPLORE THIS             │
│ EXIT TOUR                │
└──────────────────────────┘
```

### The machinery should respond

The tour should not become a stack of text cards floating independently above the website.

Each stop should operate the real apparatus where practical:

- bring a relevant card or module forward;
- dim or de-emphasize irrelevant machinery;
- illuminate a relevant connector or route;
- pan or focus the viewport where appropriate;
- expand an existing object;
- expose a compact demonstration;
- optionally prompt one small interaction;
- restore normal exploratory behavior when the tour ends.

The interaction pattern should be:

```text
instruction
    -> focus
        -> demonstration
            -> movement
```

rather than:

```text
instruction
    -> instruction
        -> instruction
            -> instruction
```

## Five-minute orientation content arc

The exact number of stops can change during prototyping. Approximately five to seven stops is likely appropriate.

### Stop 1 — What is this?

Approximate time: 0:00–0:45

Establish the Lab before introducing theory vocabulary.

Working proposition:

> **Boundary First Labs is a public-interest applied systems lab.**

Explain, in plain language, that the Lab studies how representations shape what people and machines can see, reason about, and do, and builds methods, tools, experiments, and applications around that observation.

Do not require prior familiarity with Boundary Theory, Distinction Space, Representational Mechanics, or the internal research taxonomy.

### Stop 2 — What problem is being attacked?

Approximate time: 0:45–1:30

Show several apparently unrelated failures, such as:

- brittle or opaque software interfaces;
- inaccessible bureaucratic / civic systems;
- AI workflows whose assumptions and transformations are difficult to inspect;
- scientific or mathematical representations that hide important assumptions;
- systems whose abstractions remove the distinctions a user actually needs.

Then expose the common structural question:

> **Which boundaries matter, and what became hidden, misplaced, or inadmissible when the system was represented?**

This stop should help explain why software, science, mathematics, law, UX, AI, and civic systems can coexist within the same Lab without reading as unrelated projects.

### Stop 3 — The Boundary-First move

Approximate time: 1:30–2:30

Give the visitor the primitive operational move before exposing formal machinery.

Working formulation:

> **Find the distinctions that actually matter. Make the boundaries explicit. Determine what can cross them. Preserve what must remain invariant. Then build outward.**

Prefer a demonstration over a paragraph.

A strong version would let the visitor see a cluttered or misleading representation reorganized into a boundary-first one.

The visitor should *experience* the method before being asked to learn its full vocabulary.

### Stop 4 — Show that the Lab actually does this

Approximate time: 2:30–4:00

Use a deliberately small set of proof points rather than a large project catalog.

Candidate lenses:

```text
RESEARCH       -> Boundary Theory / Representational Mechanics
ENGINEERING    -> Boundary First UX / executable representations
SCIENCE        -> formal-system experimentation / Agentic Scientific Method
PUBLIC INTEREST -> law / education / civic infrastructure
```

Each proof point should ideally receive:

- one existing artifact or live object;
- one visual;
- one sentence;
- one optional `EXPLORE THIS` route.

The goal is not exhaustive coverage. The goal is evidence that the same structural method recurs across multiple domains.

### Stop 5 — What is this becoming?

Approximate time: 4:00–5:00

Zoom back out and compress the proposition.

Working takeaway:

> **Boundary First Labs is building a general methodology and technical apparatus for making complicated systems more inspectable, testable, executable, and usable.**

This should end in routing rather than a generic `Read more` button.

Candidate exits:

```text
UNDERSTAND THE THEORY
SEE THE MACHINERY
EXPLORE THE RESEARCH
USE SOMETHING
WORK WITH US
```

The visitor has completed orientation. The apparatus should now hand them into normal exploratory operation at an appropriate location.

## Escape hatches and agency

The tour is a guided path, not a railroad.

Every stop should permit at least one of:

- `EXPLORE THIS`
- `EXIT TOUR`
- normal inspection of the currently highlighted object

If a visitor becomes interested in something before five minutes are up, the tour has succeeded.

Leaving the tour should not require returning to the beginning of the site.

## Guided reduction of degrees of freedom

This interaction is a useful Boundary UX pattern in its own right.

The full site contains many admissible routes and degrees of freedom. The tour temporarily reduces those degrees of freedom enough to establish a coherent traversal while leaving the underlying system intact.

This can be treated as:

> **guided reduction of degrees of freedom for orientation**

The tour therefore does not construct a simplified duplicate of the site. It temporarily supplies a routing and attention layer over the full representation.

## Content / implementation abstraction

Do not hard-code the entire tour as bespoke component state if a small declarative model can support it.

Candidate conceptual schema:

```ts
type TourStop = {
  id: string;
  title: string;
  narration: string;
  target?: string;
  focusBehavior?: string;
  interaction?: string;
  durationHint?: number;
  exploreHref?: string;
};

type GuidedTour = {
  id: string;
  title: string;
  durationMinutes: number;
  stops: TourStop[];
};
```

The actual types should be refined against the site's current architecture rather than copied literally from this backlog note.

The important architectural separation is:

```text
TOUR CONTENT
+ TARGET OBJECT
+ FOCUS / VIEWPORT BEHAVIOR
+ OPTIONAL INTERACTION
+ NEXT ROUTE
```

This makes the pattern reusable rather than coupling it permanently to one sequence of DOM manipulations.

## Future extension: tours as a content family

Design the first implementation narrowly enough to ship, but avoid blocking future guided routes.

Possible later tour programs:

```text
5 MIN  — ORIENTATION
15 MIN — METHOD
30 MIN — DEEP DIVE
```

Other tours could eventually be defined by audience or subject rather than duration:

```text
FOR ENGINEERS
FOR RESEARCHERS
FOR EDUCATORS
PUBLIC INTEREST
BOUNDARY THEORY
BOUNDARY FIRST UX
```

This should **not** be implemented up front unless it falls naturally out of the five-minute architecture. It is a reason to keep the underlying tour model reusable.

## Responsive behavior

### Desktop

Prefer a docked or physically attached side panel integrated with the apparatus enclosure.

The panel can remain persistent while the main viewport shifts focus.

### Mobile

The same conceptual object should probably become a persistent bottom drawer / tray rather than consuming half the viewport.

It should coordinate with existing mobile spatial-navigation ideas rather than introduce an unrelated overlay grammar.

The minimum mobile requirement is:

- current stop remains accessible;
- next/back/exit are easy to reach;
- highlighted content remains visible above the panel;
- `EXPLORE THIS` can release the user cleanly into normal mobile navigation.

## Visual direction

Use the established clean physical-apparatus language:

```text
institutional beige
+ restrained precision instrument
+ real semantic controls
+ physical hierarchy
+ minimal decorative machinery
```

Avoid turning the tour into:

```text
product onboarding SaaS modal
+ tooltip confetti
+ glowing sci-fi HUD
+ generic slide deck
+ separate marketing microsite
```

A useful mental model is a **docent/control module bolted onto a scientific instrument**.

Possible small status language:

```text
PROGRAM: BFL / ORIENTATION
RUNTIME: ~05:00
DEPTH: INTRODUCTORY
PREREQUISITES: NONE
```

Use this only if it remains understated and legible rather than theatrical.

## Acceptance criteria for first implementation

A first implementation is successful if:

- the tour is visibly attached to the main apparatus experience;
- it can be started without navigating to a separate explainer page;
- it contains a coherent beginning, middle, and end that can reasonably be traversed in about five minutes;
- each stop focuses or activates real site content where possible;
- the visitor can move forward and backward;
- the visitor can exit at any time;
- at meaningful stops the visitor can choose `EXPLORE THIS` and enter ordinary site navigation from the current context;
- ending the tour routes the visitor into several appropriate deeper paths;
- the full apparatus remains the canonical representation rather than being duplicated for the tour;
- mobile behavior is intentionally designed rather than relying on a desktop overlay shrinking onto a phone;
- the content model leaves room for future tours without requiring those tours to be implemented now.

## Deeper product principle

This feature suggests a broader content hierarchy for Boundary First Labs:

```text
glance
    -> five-minute understanding
        -> exploration
            -> technical depth
```

The five-minute layer can also function as a **compression/coherence test** for Lab work.

If a project, paper, theory, or product cannot be projected into a short representation while preserving its essential identity, problem, mechanism, evidence, and implications, that may reveal a presentation or coherence problem in the underlying material.

Longer-term, `five-minute takeaway` may therefore become a reusable content type across the Lab rather than remaining exclusive to the homepage.

## Relationship to current apparatus work

This task should be developed *with* the main machinery, not as a competing entrance architecture.

The existing apparatus landing work intentionally preserves a blank lower panel for future information architecture. That area may be one candidate location for the tour control, but placement should be decided visually and structurally rather than assumed from this note.

The critical invariant is attachment to the main machinery and operation of the real site beneath it.

## Short formulation

> **Add a five-minute guided tour as a physical content panel attached to the Boundary First Labs apparatus. The tour should temporarily constrain and route attention through existing site objects, explain the Lab through demonstration rather than a duplicate summary page, and release visitors into normal exploration whenever they choose.**
