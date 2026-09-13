# Workstream 29 — Representational Laboratory Suite

**Status:** backlog / implementation-ready umbrella  
**Captured:** 2026-09-10  
**Canonicalized:** 2026-09-13  
**Target surface:** Boundary First Labs Playground, Screen Wall, research/public-learning instruments  
**Primary web concern:** turn the lab's Representational Laboratory Suite into a staged public interactive program  
**Upstream research source:** `codexsmith/boundary-first-labs` PR #289, `representational_laboratory_suite_v0_1` work packet  
**Canonicalization note:** originally drafted as Workstream 28 in web PR #59; renumbered to 29 during backlog consolidation because current `main` already assigns Workstream 28 to Lab Machine Physical UI Refinement.  
**Related web workstreams / predecessors:**
- `backlog/20_pacman_representational_sandbox_mvp.md`
- `backlog/21_scientific_visualization_sandboxes/`
- `backlog/24_screen_wall_catalog/`
- `backlog/26_fallacies_of_distributed_reality_public_essay/`
- `backlog/15_bfl_interaction_memory_sandbox_ux_v0_1/`
- `backlog/28_lab_machine_physical_ui_refinement/`

## Web recontextualization

The lab repository now contains a governed research/design packet defining five coordinated representational laboratories. The web repository should not duplicate that theory packet or become a second authority for the mathematics.

This workstream translates that packet into a website product backlog:

> **Build a small public suite of executable representational experiments in which visitors can change distinctions, rules, models, or boundary conditions and observe the consequences directly.**

The public object is not a collection of unrelated demos. It is a curated Representational Mechanics suite sharing a recognizable interaction grammar while preserving domain-native visual forms.

## Product proposition

Working public framing:

# Five Ways a Representation Becomes Consequential

A visitor should be able to enter one of five compact instruments:

1. **Distinction Space Laboratory** — change the distinctions/relations a formal space preserves and inspect the resulting possibility structure.
2. **Cantor Closure & Defect Laboratory** — execute a finite diagonal-style construction, expose a witness outside the represented list, and show the distinction between a finite teaching fixture, the classical diagonal argument, and the BFL successor-space interpretation.
3. **Chess Admissibility Laboratory** — use familiar chess rules to distinguish imaginable actions, legal actions, reachable states, and strategic evaluation.
4. **Same World, Different Reasoner** — hold a recognizable maze world approximately fixed while changing state definitions, observability, ghost models, inference machinery, and output objects.
5. **Distributed Reality Laboratory** — vary reliability, latency, capacity, admissibility, topology, governance, transport cost, and heterogeneity and test whether a required global invariant still closes.

The visitor should not need to learn Schemathematics before using any of these.

## Why this is its own web workstream

This item is broader than the existing scientific-visualization backlog and more coherent than treating each experiment as an isolated playground toy.

Workstream 21 remains the owner of the broader **Scientific Visualization Sandboxes** program, especially physics and Fourier / spectral instruments. Workstream 29 owns the **Representational Mechanics public laboratory suite** defined by the new lab packet.

The two should reuse compatible instrument UX where useful, but neither absorbs the other wholesale.

The existing Pac-Man sandbox backlog is a direct predecessor and should be treated as the detailed first-pass specification for the `Same World, Different Reasoner` member of this suite. During implementation cleanup, move or link that specification under this workstream rather than maintaining two competing ownership stories.

Workstream 26 remains the public essay/publication surface for the Fallacies of Distributed Reality. Workstream 29 turns the same underlying boundary-consequence structure into an executable experiment.

## Core UX rule

The suite should preserve the existing BFL scientific-sandbox principle:

> **Phenomenon first. Representation second. Parameters last.**

Do not open with a schema editor, parameter wall, or theory lecture.

Each lab should begin with one obvious action, create an immediate operational consequence, then reveal the representation responsible for that consequence.

Recommended three-layer pattern:

### Layer 1 — Do something

Examples:

- **REMOVE A DISTINCTION**
- **BUILD THE DIAGONAL WITNESS**
- **TRY THE ILLEGAL MOVE**
- **CHANGE THE GHOST MODEL**
- **TURN LATENCY ON**
- **BREAK THE ROUTE**

### Layer 2 — Explain the consequence

Compact local narration:

- Distinction removed.
- States collapsed.
- Move inadmissible.
- Output changed.
- Boundary crossing failed.
- Closure defect detected.
- Alternate route found.

### Layer 3 — Open the representation

Expose the relevant formal object:

- represented distinctions;
- hidden / forgotten distinctions;
- admissibility law;
- state definition;
- transition structure;
- assumptions;
- transport profile;
- invariant / stopping condition;
- defect trace;
- repair / refinement.

## Shared semantic interaction grammar

The labs should share semantic actions where they genuinely apply:

```text
DISTINGUISH
BOUND
ADMIT
REPRESENT
EXECUTE
OBSERVE
STRESS
DETECT
TRACE
REPAIR
COMPARE
PROMOTE
```

These labels do not need to appear verbatim in every public interface. They define the reusable internal/UX contract.

The suite should share semantics, run records, traces, reset/replay behavior, and provenance where practical.

It should **not** force every lab through one generic graph editor or one visual metaphor.

## Member 1 — Distinction Space Laboratory

### Web job

Create the cleanest possible formal sandbox for showing that changing represented distinctions changes the space of lawful relation and transformation.

### Minimum useful interaction

- render a small finite carrier;
- expose a small set of distinctions / equivalence relations / typed relations;
- let the visitor merge, split, retain, or forget one distinction;
- recompute reachable/admissible relations;
- show what changed and what remained invariant;
- provide one deliberate reconstruction failure caused by over-aggressive forgetting.

### Required explanation surface

```text
PRESERVED
- ...

FORGOTTEN
- ...

NEWLY IDENTIFIED
- ...

CONSEQUENCE
- ...
```

### Non-goal

Do not begin by exposing the full Schemathematics grammar or asking users to author arbitrary schemas.

## Member 2 — Cantor Closure & Defect Laboratory

### Web job

Make the diagonal construction mechanically visible as a closure/defect experiment without overstating what the demo proves.

### Minimum useful interaction

- show a finite list of fixed-length strings;
- construct the diagonal complement/witness step by step;
- make it obvious that the generated witness differs from every listed row at at least one indexed position;
- distinguish `not in this finite enumeration` from claims about infinite sets;
- provide an `OPEN THE HOOD` explanation of the classical argument separately from the BFL interpretation;
- optionally let the user expand the admissible symbol grammar and rerun the construction.

### Required epistemic labels

```text
FINITE DEMONSTRATION
CLASSICAL RESULT
BFL INTERPRETATION
```

These must not be collapsed into one claim.

## Member 3 — Chess Admissibility Laboratory

### Web job

Use a familiar, rule-complete world to show that a grammar constructs a reachable state/action space.

### Minimum useful interaction

- fixed small position or curated puzzle state;
- select a piece;
- show imaginable targets vs legal targets;
- reject an illegal move with the actual rule/boundary that blocks it;
- execute a legal move and update reachability;
- optionally overlay pressure/attack/defense relations after the move.

### Important separation

Keep these distinct:

```text
imaginable move
legal / admissible move
strategically preferred move
```

The laboratory is principally about admissibility and consequence, not about claiming a new chess engine.

## Member 4 — Same World, Different Reasoner

### Web job

Promote the existing Pac-Man representational-sandbox specification into the suite as the flagship **representation -> consequence** experiment.

The existing detailed backlog already defines the MVP architecture and should be reused rather than rewritten from scratch.

Required conceptual invariant:

> **The visible world can remain recognizably the same while the operative representation changes, and that change can alter what the reasoner sees, infers, and does.**

Highest-value contrasts remain:

- BFS / A* frontier representation;
- minimax vs expectimax from the same state;
- full vs partial observability;
- world truth vs belief state;
- path output vs value/policy output;
- one deliberate missing-state / representational-closure defect.

Public implementation should use a clean-room/original BFL visual identity unless reuse rights for branded assets are explicitly clear.

## Member 5 — Distributed Reality Laboratory

### Web job

Turn the networking-fallacies / boundary-consequence note into a compact executable coordination lab.

Represent a boundary consequence profile approximately as:

```text
failure
latency
capacity
admissibility
topology
governance
transport cost
heterogeneity
```

The visitor begins with the unrealistic idealization that every crossing is free/transparent, then turns consequences on one at a time.

### Minimum useful interaction

- 4-8 local nodes/systems;
- one declared global invariant, such as `every accepted request must produce exactly one authorized result`;
- executable routes rather than decorative edges;
- toggles/presets for the eight consequence dimensions;
- visible propagation;
- queues/delay/failure/authorization/translation effects where relevant;
- defect trace when the global invariant fails;
- one repair action such as reroute, retry policy, capacity increase, translation adapter, governance rule, or permission change.

### Core rule

If a displayed edge is presented as consequential, it must participate in the actual simulation/propagation path.

Do not animate particles down decorative lines that are unrelated to execution.

## Shared web architecture

Do not decide exact route names until implementation begins and the current Playground conventions are re-audited.

The intended information architecture is approximately:

```text
Playground / Screen Wall catalog
        -> Representational Laboratory Suite landing / collection
            -> Distinction Space
            -> Cantor Closure & Defect
            -> Chess Admissibility
            -> Same World, Different Reasoner
            -> Distributed Reality
```

Each experiment should be individually deep-linkable.

The suite landing should be thin. Its job is orientation and selection, not a long theory essay.

## Shared runtime / component opportunities

Create shared infrastructure only where at least two labs genuinely need it.

Likely reusable pieces:

- bounded run/reset/replay state;
- deterministic seed support where randomness exists;
- experiment-event log;
- `CURRENT REPRESENTATION` / `WORLD MODEL` inspector;
- preserved / hidden / forgotten distinction list;
- defect banner + trace;
- `OPEN THE HOOD` disclosure;
- claim/provenance/source disclosure;
- experiment deep-link state;
- accessibility-safe non-visual summaries of current state and consequence.

Possible shared event envelope:

```ts
type LabEvent = {
  t: number;
  kind: string;
  source?: string;
  target?: string;
  operation?: string;
  consequence?: string;
  defect?: string;
  metadata?: Record<string, unknown>;
};
```

Do not standardize domain state more aggressively than the experiments justify.

## Phase plan

### Phase 0 — web/source audit

Before code:

1. Confirm the lab packet has merged or record the exact source revision being implemented.
2. Re-audit current Playground and Screen Wall routes/components.
3. Identify reusable scientific-sandbox components from workstream 21.
4. Reconcile the existing Pac-Man backlog with this umbrella workstream.
5. Identify whether any Distinction Space sandbox code already exists outside indexed `main`.
6. Freeze a small common event/inspection contract only after comparing at least two lab implementations.

### Phase 1 — curated public laboratories

Implement small, domain-native instruments.

Recommended order by conceptual/engineering leverage:

1. **Cantor** — smallest closure/defect vertical slice; useful for proving the common run/trace shell.
2. **Chess** — cheap rule-complete admissibility demonstration.
3. **Distributed Reality** — proves executable topology, stress, defect, and repair.
4. **Distinction Space** — refine once the common inspection vocabulary is proven in concrete labs.
5. **Same World, Different Reasoner** — reuse the existing deeper MVP plan; can proceed in parallel if desired.

This order is a backlog recommendation, not an authority claim. Reorder if existing code materially changes cost.

### Phase 1.5 — suite integration

- add all working instruments to a single collection/landing;
- normalize navigation and explanation surfaces;
- add cross-links between experiments using the shared action vocabulary;
- add source/provenance disclosures;
- add Screen Wall / Playground catalog entries;
- add mobile and reduced-motion behavior;
- verify non-visual accessibility paths.

### Phase 2 — Schemathematics apparatus reveal

Only after the curated labs work:

- show the schema/configuration underlying each experiment;
- expose retained vs forgotten distinctions;
- expose projection/refinement/quotient/extension/composition labels where justified;
- compare two or more lab schemas under an explicit preservation contract;
- show where a proposed common reduction fails;
- allow promotion of a closed substructure into a reusable higher-order object where an experiment genuinely supports it.

The phase-two UX should be framed as:

> **You have already been using this machinery. Here is the common apparatus underneath the experiments.**

### Later option — open workbench

A user-authored Schemathematics workbench is intentionally deferred. It is not required to ship the public suite.

## Acceptance criteria for the umbrella workstream

Workstream 29 is ready to call `phase-one complete` when:

1. at least four of the five curated laboratories are live and individually deep-linkable;
2. each lab has a single legible primary phenomenon rather than a parameter wall;
3. displayed consequential structures correspond to actual computation/simulation behavior;
4. each lab exposes what is represented, assumed, hidden/forgotten, and produced where those categories apply;
5. at least three labs support a deliberate stress or representation change that produces an inspectable consequence;
6. at least two labs produce a traceable defect and a repair/refinement path;
7. negative/adversarial cases are allowed rather than scripted away;
8. established mathematics/CS results and BFL interpretations are clearly separated;
9. all experiments have source/provenance disclosure;
10. the suite is discoverable from the Playground / Screen Wall public instrument surfaces;
11. the shared UX vocabulary feels consistent without erasing domain-native representations;
12. Schemathematics remains optional for first contact.

## Immediate implementation-ready cut

The first coding PR should not attempt the whole suite.

Recommended first vertical slice:

```text
one shared experiment shell
+ one representation inspector
+ one event/trace model
+ Cantor finite diagonal experiment
+ reset/replay
+ source/claim disclosure
```

That slice is sufficient to answer the architectural questions needed before building more shared infrastructure.

The next cheap validation is the Chess lab. If the same shell can host both without forcing them into the same visual model, the common contract is probably at the right level.

## Non-goals

Do not initially build:

- a universal graph editor;
- an arbitrary schema-authoring UI;
- a giant all-in-one dashboard;
- a generalized workflow engine before two or more labs require it;
- a claim that every lab is mathematically equivalent;
- a new chess engine as a prerequisite;
- live expensive AI training;
- unbounded simulation endpoints;
- decorative execution animations disconnected from real state;
- a long theory prerequisite before the experiments are usable.

## Source-of-truth boundary

The web repository owns:

- route/product integration;
- interaction design;
- rendering;
- bounded runtime implementation;
- public copy projection;
- accessibility;
- deep links;
- website provenance presentation;
- implementation status.

The lab repository owns:

- research definitions;
- theory relationships;
- claim ceilings;
- experimental interpretations;
- formal/research provenance;
- successor revisions to the underlying Representational Laboratory Suite.

If the web backlog and lab packet disagree about a research claim, the web implementation should defer to the current lab artifact rather than silently forking the theory.

## Current readiness

**Ready for implementation planning and a first bounded vertical slice.**

The conceptual architecture is sufficiently specified to begin coding. The remaining uncertainty is mostly product/runtime discovery inside the web repo, not uncertainty about what the suite is trying to demonstrate.
