# Workstream 28 — Phase 2: Instrumental Depth and Continuity

**Status:** Deferred / later phase  
**Gate:** Begin only after Phase 1 (Forge, Research Engine, Research Exhaust, shared physical primitives, responsive/accessibility/performance polish) is stable.  
**Authority:** Supporting Phase 2 plan under Workstream 28; `STATUS.md` remains the current workstream-status authority.

## Intent

Phase 2 should deepen the Lab Machine as an inspectable, semantically faithful apparatus without increasing visual density for its own sake.

The north-star is not “more machinery.” It is:

> **Make the institution inspectable as a machine.**

Every new physical metaphor must correspond to a real semantic or operational distinction. This phase should make the existing apparatus easier to trace, inspect, and understand—not turn it into a denser game HUD.

## Phase 2 features

### 1. Shared apparatus backbone / bus

Introduce one understated physical backbone behind the apparatus: part power rail, part data bus, part dependency spine.

- Subsystems connect through explicit couplers rather than visually floating near one another.
- Semantic subsystem colors may pulse through the bus only when relevant.
- Idle state remains dark and quiet.
- The bus should clarify shared infrastructure and causality, not become a decorative neon line.

### 2. Typed relationship ports

Replace generic connectors with relationship-aware ports where the underlying model supports them.

Candidate labels include:

- `USES`
- `TESTS`
- `PRODUCES`
- `SUPPORTS`
- `CHALLENGES`
- `INFORMS`
- `APPLIES`
- `FEEDS BACK INTO`
- `CONSTRAINS`
- `AUTHORIZES`
- `REVIEWS`

A port is a semantic interface, not merely a styled endpoint. Port labels and accessible names should derive from real relationship types whenever possible.

### 3. Provenance hatches / inspection drawers

Allow research events, claims, artifacts, projects, publications, or governed objects to expose a small physical inspection surface instead of resetting into a generic modal.

An inspection drawer may reveal:

- canonical source(s);
- claim / object identity;
- validation state;
- revision/version;
- typed relationships;
- limitations;
- open questions;
- provenance state;
- linked artifact or publication targets.

The drawer should feel mechanically attached to the object being inspected.

### 4. Multi-dimensional status instruments

Do not collapse research maturity into one progress score.

Use restrained independent indicators for dimensions such as:

- `EPISTEMIC`
- `VALIDATION`
- `OPERATIONAL`
- optionally `PUBLICATION` / `PROVENANCE` when relevant

These may appear as narrow lamps, indicator windows, segmented strips, or instrument cells. They should preserve the distinction between dimensions rather than imply a universal linear ladder.

### 5. Claim Ceiling limiter / governor

Where a governed research record carries a claim ceiling, represent that boundary with a restrained physical stop, governor, limit marker, or constrained travel indicator.

Purpose: communicate **where the evidence stops**.

This is not a score, warning gimmick, or dramatic redline. It is a boundary instrument that prevents the projection from visually implying more than the source record supports.

### 6. Artifact cartridges / cassettes

Develop a standardized carrier grammar for outputs moving through the machine.

Potential carriers include:

- paper / publication;
- claim packet;
- dataset;
- software artifact;
- experiment result;
- index / Atlas update;
- case study;
- governed object projection.

Cartridges should retain type, identity, state, provenance, and destination. The carrier metaphor should help the same object remain visually recognizable across Forge, Research, Pipeline, Publications, or deeper projections.

### 7. Defect / reject route

Research output must visibly include negative and corrective results, not only successful production.

Support routes for events such as:

- failed tests;
- rejected sources;
- challenged claims;
- superseded artifacts;
- invalidated assumptions;
- blocked promotion / validation gates.

This may appear as a restrained `DEFECT`, `REJECT`, or repair path rather than a theatrical failure animation. Research Exhaust should remain able to report these events as first-class telemetry.

### 8. Machine-state choreography

Move from continuous decorative animation toward brief causal sequences triggered by real or simulated events.

Example:

```text
port wakes
  -> conduit carries a restrained pulse
  -> Research state changes
  -> downstream output activates
  -> Research Exhaust emits an event
  -> apparatus returns to quiet idle
```

This should make causal structure legible. Reduced-motion users receive equivalent state changes without animated travel.

### 9. Physical zoom continuity

Deep navigation should preserve machine identity.

When a visitor enters Research, a project, an artifact, or another subsystem, prefer the experience of moving **into the same apparatus** over replacing it with a generic page shell.

Preserve recognizable elements where practical:

- frame / enclosure;
- material identity;
- port locations;
- object identity plate;
- active relationships;
- current path / bound context.

A deeper projection should feel like a higher-resolution inspection of the same machine.

### 10. Service / inspection mode

Add an explicit user-controlled inspection mode for visitors who want the machinery exposed.

Possible exposed fields:

- machine / governed-object ID;
- typed ports and relationships;
- current states;
- provenance links;
- source bindings;
- route / traversal identity;
- revision metadata;
- validation / claim-boundary information.

This should align with the existing Lab Machine interaction sequence:

`ORIENT -> PROBE -> BIND -> ACT`

Normal mode stays clean. Inspection mode reveals the wiring.

## Phase 2 implementation gate

Do not begin Phase 2 merely because Phase 1 renders successfully once.

Phase 2 begins only after Phase 1 has:

1. stable physical primitives;
2. accepted responsive behavior;
3. accepted keyboard and assistive-technology behavior;
4. reduced-motion behavior;
5. acceptable performance on representative devices;
6. a real normalized Research Exhaust adapter boundary;
7. confirmed visual restraint in production context.

## Phase 2 acceptance principles

- No new machine part without a semantic job.
- Typed ports must correspond to real relationship semantics.
- Inspection drawers must expose real model/provenance fields rather than atmospheric filler.
- Status dimensions remain independent; no unsupported universal maturity meter.
- Claim Ceiling visuals must constrain interpretation rather than dramatize it.
- Negative research outcomes are first-class machine events.
- Deeper navigation preserves apparatus identity where practical.
- Motion communicates causality and becomes quiet again.
- Mobile and reduced-motion fallbacks preserve the semantic structure.

## Relationship to Phase 1

Phase 1 establishes the material grammar and three anchor machines:

- Forge;
- Research Engine;
- Research Exhaust.

Phase 2 makes that grammar **traceable, inspectable, and continuous across depth**.

Phase 2 is explicitly **not required** for the Phase 1 definition of done and should not delay the first implementation pass.