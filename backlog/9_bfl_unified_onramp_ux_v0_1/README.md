# Boundary First Labs Unified On-Ramp UX Specification v0.1

**Status:** Proposed UX/content specification  
**Scope:** Public front door, self-selection, route promises, and first destinations  
**Date:** 2026-08-03  
**Implementation scope:** UX, information architecture, content, and route framing only. This document does not prescribe code structure.

## Phase 1 implementation record

The implemented routing contract, validation evidence, refined decisions, residual risks, and Phase 2 sequence are recorded in [`bfl_layered_routing_phase_1_implementation_review_v0_1.md`](./bfl_layered_routing_phase_1_implementation_review_v0_1.md).

## 1. Decision to make

Boundary First now has three strong public entrances:

- People: begin with an affected person, responsibility, or active need.
- Problem: begin with a familiar situation where something stopped making sense.
- Repair: begin with the method for making consequence repairable.

The next UX iteration should make these feel like one coherent front door. Visitors should understand both:

1. why they might choose a path; and
2. what useful thing they will receive after choosing it.

The experience should move from recognition to value before asking for extensive refinement.

## 2. Product principle

> Choose what is clearest. Receive one useful next step. Expand when ready.

Self-selection should be based on a visitor's current situation, question, or desired action—not on a fixed identity category. A visitor may change paths at any time.

## 3. Canonical front-door model

### Homepage

**Eyebrow:** Boundary First  
**Headline:** See where consequence goes. Restore a path to repair.  
**Support text:** Begin with the part of the situation that is already clearest to you.

The three primary cards should use the following structure:

| Path | Visitor-facing question | Promise | First destination |
|---|---|---|---|
| People | Who is living with the consequence? | Find a focused path based on what you need now. | `/audience` |
| Problem | What happened? | Start with a familiar scene, name the boundary that failed, and reach the formal concept behind it. | `/cyoa/problem` |
| Repair | What restores the path? | Learn how consequence becomes repairable work, evidence, and practice. | `/learn` |

Each card should include a small effort label:

- **People:** Choose once, then refine if useful.
- **Problem:** One familiar scene → one formal doorway.
- **Repair:** Fifteen short scenes; skip ahead whenever you want.

Each card should also include a secondary line: **“You can change paths later.”**

### Supplemental homepage links

Keep the following below the three primary paths:

- Open the circular entrance → `/cyoa`
- See the work and evidence → `/work`
- Browse the Atlas as a list → `/relations`

The conventional relation index should be presented as an explicit alternative view, not left discoverable only through deep navigation.

## 4. Route contracts

### People route: `/audience`

**Purpose:** Help visitors select a current need without classifying themselves.

**First-screen question:** What brings you here?

Retain the reassurance:

> This choice describes what you need now. It does not classify you or limit the rest of the corpus.

The first selection should be sufficient to reveal useful destinations. Deeper questions—relation, doorway, and depth—should be framed as optional refinement rather than a mandatory funnel.

After the first choice, show three recommended next steps:

1. one relevant publication or doctrine seed;
2. one practical artifact, worksheet, or work object;
3. one Atlas or relation-index view.

Example destination framing:

> You chose **Diagnose**. Start with the consequence map, compare it with the repair-loop method, or inspect the related Atlas records.

The route should preserve a visible escape hatch:

- Browse all work
- Enter the Atlas
- Try another starting point

### Problem route: `/cyoa/problem`

**Purpose:** Convert recognition of a familiar situation into a formal conceptual doorway.

**First-screen question:** Where did the trouble become visible?

The current six-world structure is strong. The first viewport should make it obvious that the visitor can act immediately. Show at least one row of world choices or a clear “Choose a familiar world” action without requiring a long scroll through the editorial hero.

The route contract is:

> Familiar world → concrete trouble → boundary/invariant/defect → formal language → related work or Atlas destination.

Every result should answer three questions:

- What did you already recognize?
- What structural distinction did that reveal?
- Where can you go next if you want more depth?

The final screen should provide at least two exits:

- continue into the formal Atlas or related work;
- return to the three paths.

### Repair route: `/learn`

**Purpose:** Provide a guided conceptual introduction to the Boundary First method.

The route should be framed explicitly as a guided tour rather than as the repair itself.

Recommended framing:

> A short guided tour of how Boundary First turns consequence into repairable work.

Add an approximate time or effort indicator, for example:

- 15 short scenes
- approximately 8–10 minutes
- skip to the Atlas at any time

The sequence should end with clearly named destinations:

- Apply the method to a problem
- See current work and evidence
- Browse the Atlas
- Return to the starting paths

Avoid presenting “On-Ramps” and “Choose a Path” inside the guided sequence as if they are competing entrances. They should be labeled as conceptual scenes within the tour, or as explicit route-change controls.

## 5. Status and claim language

The public CYOA should not call itself an “isolated prototype” now that it is integrated into the main site. That wording conflicts with the current backlog status and creates avoidable trust friction.

Use a compact status treatment instead:

> Teaching bridge · concept-stage route

Where a route introduces a draft framework, state the claim ceiling in plain language:

> This is a teaching and research route. It does not represent an adopted institutional policy or a verified operational system.

Keep status close to the relevant claim, but do not let administrative status language dominate the visitor's first action.

## 6. Content examples as self-selection

The front door should include a small “You may be here because…” group beneath the primary paths. These are not additional navigation systems; they are concrete examples that help visitors recognize themselves.

Suggested examples:

- People make the value; people are not overhead.
- An AI system can act without being authorized to decide.
- A policy can exist without creating a reachable path to repair.
- A system can satisfy its local rules and still fail at the boundary between parts.

Each example should carry a status label such as:

- Public doctrine seed
- Concept-stage program preview
- Bounded pilot
- Research seed

This will surface the newer work without overstating its maturity.

## 7. Navigation and return behavior

Every on-ramp screen should make the following actions available without requiring browser back navigation:

- Start over
- Try another path
- Continue to the recommended destination

The global header can remain simple. The most important addition is contextual return behavior within each route.

The relation index should be linked from Explore, Atlas result screens, Work, and the CYOA result state with consistent wording:

> View this material as a conventional list

## 8. Validation checklist

Before implementation is considered successful, test whether a first-time visitor can answer these questions within the first screen or two:

1. What is this site for?
2. Which starting path fits my current situation?
3. What will I get if I choose it?
4. How long or how demanding is the path?
5. Can I change my mind without losing access?
6. Is the material provisional, proposed, adopted, or verified?

Recommended lightweight tests:

- Ask participants to choose a path without explaining the site first.
- Ask them to predict what will happen after each choice.
- Ask them to find one concrete work object or publication within two minutes.
- Ask them to distinguish a public doctrine seed from an operationally verified institutional practice.

## 9. Acceptance criteria

- The homepage communicates the three paths and their outcomes without additional explanation.
- The People route provides useful destinations after one primary selection.
- The Problem route exposes the first actionable choices without excessive scrolling.
- The Repair route clearly identifies itself as a guided introduction and provides time/effort framing.
- Prototype language no longer contradicts integrated public status.
- New public work is discoverable through examples without overstating maturity.
- Every route has visible start-over, alternate-path, and Atlas/work exits.
- The relation index is reachable as an explicit conventional equivalent.
- Claim ceilings remain visible where they matter, without becoming the primary front-door message.
