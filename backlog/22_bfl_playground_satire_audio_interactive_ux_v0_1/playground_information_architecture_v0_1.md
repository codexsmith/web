# Playground Information Architecture v0.1

**Status:** Proposed  
**Date:** 2026-08-25  
**Parent:** [README.md](./README.md)

## 1. Purpose

Define a public information architecture in which Boundary First Labs can support two modes of entry and traversal:

1. **The Lab** — canonical research, publications, experiments, products, evidence, and tools.
2. **The Playground** — satire, audio, interactive pieces, web toys, strange machines, sandboxes, and representational experiments.

The architectural goal is not separation for its own sake. It is to make the visitor's current epistemic and experiential mode explicit while allowing typed crossings between them.

## 2. Landing-page split

The current **ENTER THE LAB** call to action already establishes a useful institutional threshold. Preserve that language and add a second threshold rather than replacing it.

### Candidate A — explicit pair

```text
ENTER THE LAB
Research · Experiments · Tools · Publications

ENTER THE PLAYGROUND
Satire · Audio · Interactive Things · Digital Experiments
```

Advantages:

- immediately legible;
- accessible without contextual humor;
- makes the Playground first-class;
- easy to prototype and test.

### Candidate B — front door / back door

```text
ENTER THE LAB →

or go around back →
```

Advantages:

- more personality;
- suggests the same institution rather than two brands;
- creates a physical/spatial metaphor compatible with BFL's industrial framing.

Risk:

- the destination may be insufficiently clear for a first-time visitor.

Recommended prototype posture: use Candidate A as the semantic/accessibility baseline and test Candidate B as a visual/microcopy enhancement, potentially with an explicit `Playground` label nearby.

## 3. Two modes, one institution

The site should avoid a binary of serious versus unserious.

Instead model the distinction as two operating modes:

| Mode | Primary contract | Typical objects |
|---|---|---|
| Lab | establish, test, document, derive, build | papers, claims, experiments, products, datasets, tools |
| Playground | perform, distort, recombine, dramatize, explore | satire, audio, toys, machines, generative objects, sandboxes |

Both modes may operate on the same source objects.

A visitor should be able to recognize that they remain inside Boundary First Labs even when an individual Playground artifact adopts a highly distinctive visual or sonic identity.

## 4. Suggested Playground top level

Preferred initial navigation families:

```text
PLAYGROUND
├── Boundary Violations
├── Radio / Audio
├── Strange Machines
├── Web Toys
├── Sandboxes
├── Experiments in Representation
└── Things We Made Because We Could
```

Do not require all of these to ship simultaneously.

The first public slice can be much smaller:

```text
PLAYGROUND
├── Boundary Violations
├── Audio
└── Machines / Toys
```

The broader taxonomy should remain available as the content grows.

## 5. Content cards and discovery

A Playground index should favor objects and experiences over institutional taxonomy.

Each card can expose a compact set of typed signals:

- title;
- artifact kind;
- duration or interaction scope when meaningful;
- satire / synthetic-performance disclosure when relevant;
- one-line premise;
- related serious object count or direct `See the serious version` link;
- state such as `new`, `prototype`, `live`, `archived`, or `experiment` where useful.

Avoid turning the page into a generic media-stream feed. The object should feel like something on a workbench, shelf, patch panel, or rack rather than a social post.

## 6. Cross-mode navigation

Crossing between Lab and Playground should be modeled as a typed relationship, not an escape hatch.

### Playground to Lab

Preferred affordance:

```text
SEE THE SERIOUS VERSION →
```

Alternate labels may be specialized by relationship:

- Source research
- Underlying claim
- View the experiment
- Read the derivation
- Open canonical object

### Lab to Playground

A restrained reciprocal affordance can be more playful:

```text
THIS DESERVES THE OTHER TREATMENT →
```

or more neutral:

```text
RELATED PLAYGROUND PROJECTION →
```

The serious surface should not become visually dominated by promotional content for the Playground.

## 7. Relation model

Candidate semantic relations:

```text
related_projection
satirizes
performs
narrates
sonifies
visualizes
interacts_with
compresses
remixes
forks_from
source_object
```

These should connect stable IDs where the content system permits.

A single Playground object may have several canonical sources. A single canonical object may have several Playground projections.

The relation graph should therefore support many-to-many edges rather than a single `relatedArticleUrl` field.

## 8. Route posture

Candidate routes:

```text
/playground
/playground/boundary-violations
/playground/audio
/playground/machines
/playground/toys
/playground/sandboxes
/playground/representation-experiments
```

Potential convenience alias:

```text
/play -> /playground
```

Do not bind the content schema to these route names. Route naming may evolve while object kinds and relations remain stable.

## 9. Persistent mode awareness

Once inside either mode, the visitor should be able to answer:

- Am I in the Lab or Playground?
- Is this object canonical, playful, or derived?
- What is its relationship to the underlying source material?
- How do I cross back to the other mode?

Possible implementation patterns:

- a small mode marker in the persistent frame;
- different material finish while retaining the same chassis;
- a two-position Lab / Playground switch at appropriate high-level routes;
- contextual crosslinks attached to objects rather than persistent global toggling everywhere.

Avoid a theme-switcher metaphor. This is a change in information contract and content surface, not merely color mode.

## 10. Spatial metaphor

The site can lean into a building/workbench metaphor without requiring literal skeuomorphism.

Useful concepts:

- Lab = front entrance / instrument room / formal workbench;
- Playground = back door / service corridor / after-hours bench / patch bay;
- crosslinks = doors, hatches, patch points, or labeled transfer ports;
- sandbox = personal bench;
- Strange Machines = apparatuses temporarily bolted into the room.

The metaphor should help orientation, not become a puzzle visitors must decode.

## 11. Interaction posture

The Playground can be more kinetic than the Lab, but all essential navigation must work without motion, audio, hover, drag, or high-performance graphics.

Requirements:

- tap/click path for all primary actions;
- keyboard reachability and visible focus;
- no hover-only information;
- no autoplay audio;
- reduced-motion support;
- mobile layouts that recompose rather than merely shrink;
- descriptive fallback for interactive pieces when feasible;
- clear exit/back-to-Lab path;
- loading and failure states that preserve context.

## 12. Relationship to personal sandbox

The Playground should be able to send typed artifacts and states into the Pass 15 personal sandbox.

Candidate actions:

```text
SEND TO SANDBOX
SAVE STATE
FORK MACHINE
ADD TO BOARD
CAPTURE OUTPUT
```

Interactive outputs should serialize semantic state when possible rather than screenshots or raw DOM.

Examples:

- waveform parameters from a sonic toy;
- graph state from an interactive satire piece;
- selected objects from a Rube Goldberg web composition;
- current parameter vector from a Strange Machine;
- transcript segment or scene card from an audio piece.

## 13. Search and filtering

Playground filtering should be lightweight and object-oriented.

Candidate facets:

- kind: satire / audio / interactive / visual / hybrid;
- topic/domain;
- series;
- interaction level;
- duration;
- canonical relationship available;
- prototype/stable/archive status.

Do not lead with an exhaustive research taxonomy. Visitors should be encouraged to discover unexpected connections.

## 14. Deep-link behavior

A deep-linked Playground artifact must carry enough framing to prevent decontextualization.

At minimum expose:

- BFL identity;
- artifact kind;
- satire/fiction/synthetic-performance disclosure where applicable;
- direct path to the Playground index;
- direct path to related serious material when present.

This is especially important because individual audio or satire pages may be shared outside the BFL navigation context.

## 15. First prototype recommendation

Build the smallest experience that proves the architectural distinction:

1. retain the existing landing experience;
2. add a second Playground entry;
3. create a `/playground` index using existing BFL frame primitives;
4. seed it with three representative cards:
   - one Boundary Violations satire/audio piece;
   - one Strange Machine or interactive toy;
   - one sandbox/visual experiment;
5. implement one reciprocal Lab ↔ Playground relation;
6. observe whether the two-mode model is immediately understandable.

Do not begin by building a full media CMS. Prove the boundary and traversal model first.
