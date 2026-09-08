# Task: Prototype Screen Wall Catalog Interface

**Status:** backlog / implementation candidate  
**Date:** 2026-08-27  
**Related design context:**
- `backlog/16_bfl_playground_satire_audio_interactive_ux_v0_1/playground_information_architecture_v0_1.md`
- `backlog/16_bfl_playground_satire_audio_interactive_ux_v0_1/composable_patchbay_and_physical_grammar_v0_1.md`
- `backlog/15_bfl_interaction_memory_sandbox_ux_v0_1/README.md`
- `backlog/15_scientific_visualization_sandboxes/`

## Goal

Prototype a **Screen Wall** / **Arcade Wall** as a first-class catalog projection for Boundary First Labs interactive environments.

The reference experience is the large multi-screen wall of a Las Vegas sportsbook: not the casino aesthetic, but the information architecture of a room in which many bounded events remain simultaneously visible at large scale.

Translate that functional feature into the Playground and interactive catalog:

> **One room. Dozens of simultaneously visible worlds. Every screen is both a preview and a portal.**

The Screen Wall should feel more like a broadcast control room, industrial instrument wall, arcade, and fabrication lab than a conventional grid of website cards.

## Core proposition

A conventional catalog says:

```text
Here are things you may open.
```

The Screen Wall should say:

```text
All of these things are happening around you right now.
```

The central Boundary First UX proposition is:

> **A catalog does not have to describe its contents. It can project them.**

Each catalog object is therefore represented first as a **bounded live projection** of the environment itself, not merely as a screenshot plus metadata.

## Primary interaction depth

Use three explicit depths:

```text
WALL -> SCREEN -> WORLD
```

### Wall

Discovery, gestalt, and spatial orientation.

Many environments remain simultaneously visible. The visitor can scan the field, notice motion and scale, and develop a spatial sense of what exists without serially opening detail pages.

### Screen

Inspection without immediate ejection from the catalog.

Selecting a screen enlarges or foregrounds it while preserving enough of the surrounding wall to maintain orientation. The inspection state may expose:

- title and artifact kind;
- one-line premise;
- live or representative state;
- status / maturity;
- related Lab projection;
- inputs / outputs where meaningful;
- `ENTER WORLD` or equivalent explicit transition.

### World

Immersion in the actual interactive environment, sandbox, visualization, machine, game, audio object, or other experience.

Entering a World may change route or application surface, but there must be a clear return path to the originating wall state when practical.

## Spatial encoding

The wall should deliberately avoid a uniform card grid.

Useful channels:

| Visual property | Meaning |
|---|---|
| screen size | prominence / landmark weight |
| position | neighborhood / loose semantic adjacency |
| motion | activity / liveness |
| screen contents | representation of the actual environment |
| frame treatment | state / status / type boundary |
| selection | current attention |

Do not freeze all of these mappings into mandatory semantics in the first prototype. The key requirement is that **geometry carries catalog information** rather than serving as decoration.

Large environments may act as landmarks. Small, strange, or experimental objects may occupy peripheral screens. A temporarily active or featured environment may be promoted to a larger screen without changing its canonical identity.

## Live projection posture

Prefer a tiny live projection of each environment over a static thumbnail when technically and semantically appropriate.

Examples:

- a generative geometry object slowly evolving;
- a particle or wave simulation running in a bounded preview state;
- a chess environment displaying a puzzle or analysis position;
- a cellular automaton updating at low frequency;
- an audio object displaying a live waveform or score without autoplaying sound;
- a Strange Machine visibly processing state;
- a Rube Goldberg / patchbay environment showing its current chain operating.

The desired traversal is:

```text
world -> observe -> inspect -> enter
```

rather than:

```text
thumbnail -> description -> launch
```

Live preview is an enhancement, not an accessibility requirement. Every screen must remain meaningful when motion, audio, WebGL, or expensive computation is unavailable.

## Performance and accessibility boundary

The Screen Wall must not become a resource-exhaustion demo.

Prototype requirements:

- no autoplay audio;
- reduced-motion support;
- static or low-motion fallback for every preview;
- pause or substantially reduce work for nonvisible previews;
- cap simultaneous expensive simulations;
- preserve useful first-frame content before preview runtimes initialize;
- all primary actions reachable by tap/click and keyboard;
- visible focus state;
- no hover-only information;
- mobile recomposes the wall rather than shrinking a desktop mosaic into illegibility;
- inspection state remains understandable without animation;
- deep-linked Worlds retain a clear path back to Playground / Wall context.

The wall is allowed to feel busy. It is not allowed to become unreadable or operationally hostile.

## Neighborhoods and wall modes

The physical arrangement itself can become a catalog dimension.

Candidate neighborhoods:

```text
GENERATIVE SYSTEMS      GAMES + PUZZLES

        CENTRAL / FEATURE STAGE

VISUALIZATION + MATH    TOOLS + MAKING

             WEIRD STUFF
```

These are illustrative, not canonical taxonomy.

Candidate wall projections:

- **Curated Wall** — intentional BFL arrangement;
- **Live Wall** — environments currently active or recently updated;
- **My Wall** — objects the visitor has interacted with or retained through the personal sandbox model;
- **Random Wall** — deliberate serendipitous reconfiguration;
- **Research Wall** — interactive research artifacts and visual experiments;
- **Arcade Wall** — games, toys, playful experiments, and strange machines;
- **Workbench Wall** — environments exposing composable inputs and outputs.

Do not implement these as seven separate products. They are alternate projections over the same typed object set.

## Relationship to Playground information architecture

The Screen Wall is a **catalog projection**, not a replacement for the Playground content model.

The Playground still needs stable object identity, typed relationships, disclosure, status, serious-source links, searchability, and deep-link behavior.

The wall changes how those objects are encountered:

```text
object registry
      |
      +-> conventional list / accessible index
      |
      +-> Screen Wall projection
      |
      +-> search / filter projection
      |
      +-> sandbox / personal-board projection
```

A nonvisual or low-motion catalog projection must remain available even if the Screen Wall eventually becomes the primary discovery surface.

## Relationship to the patchbay

The Screen Wall should be architected so it can later graduate from **catalog** to **composition surface**.

Initial screen behavior:

```text
SCREEN = destination / projection
```

Potential later behavior:

```text
SCREEN = destination + typed apparatus
```

Example:

```text
[ Music Generator ]
      AUDIO OUT o-------------------o AUDIO IN
                                  [ Visualizer ]
```

This creates a progression:

```text
catalog -> observation -> navigation -> composition
```

The first Screen Wall prototype does **not** need patching. It should merely avoid a design that would make typed ports or connections impossible later.

## Boundary First interpretation

The pattern is especially compatible with Boundary First UX because the wall is made of explicit bounded objects.

Each screen establishes:

- what belongs to the projected environment;
- what state is currently observable;
- what can cross the screen boundary;
- what transition occurs when the visitor selects or enters it;
- what typed relations connect it to other objects.

The screen frame therefore is not ornamental. It is the visible interaction boundary between catalog context and environment state.

This suggests a useful named pattern:

> **Screen Wall:** a spatial catalog in which bounded environments remain simultaneously observable, selectable, and traversable.

## Visual posture

Preserve the physicality of the reference without copying casino styling.

Desired character:

- dark or subdued surrounding structure;
- clearly bounded luminous screens;
- nonuniform screen dimensions;
- visible gaps, rails, frames, or structural members between screens;
- subdued labels and status marks;
- screens remaining visible beyond the immediate focus;
- large-scale instrument-cluster / control-room composition;
- restrained use of motion as evidence that an environment is alive.

Target blend:

```text
broadcast control room
+ sportsbook scale
+ arcade legibility
+ fabrication lab
+ Boundary First industrial frame
```

Avoid:

- neon-casino pastiche;
- generic streaming-service tile grid;
- Pinterest masonry with no semantic geometry;
- a social-media feed;
- constant high-energy animation;
- uniform cards pretending to be screens.

## First prototype sequence

1. Build a static wall using 8-12 representative Playground / sandbox objects.
2. Use deliberately nonuniform screen geometry.
3. Establish at least three loose spatial neighborhoods.
4. Make every screen selectable by click/tap and keyboard.
5. Implement `Wall -> Screen` foreground inspection while preserving surrounding context.
6. Implement one `Screen -> World` transition and a reliable return path.
7. Replace 2-3 static previews with bounded live projections.
8. Add reduced-motion / static fallback.
9. Measure CPU/GPU cost and define a preview-budget policy before increasing liveness.
10. Compare comprehension and discovery behavior against a conventional Playground card grid.

Do not begin with dynamic personalization, patch cables, or dozens of expensive runtimes. Prove the spatial-catalog grammar first.

## Acceptance test

The prototype succeeds if a visitor can answer, primarily from the wall itself:

- What kinds of interactive things exist here?
- Which objects appear active, important, strange, or related?
- What happens if I select one?
- Can I inspect it without losing where I was?
- Can I enter it deliberately?
- Can I return to the larger field?

And, crucially:

> Does the catalog itself feel like an environment worth exploring rather than an index one must pass through?

If yes, the Screen Wall has established the intended new discovery primitive.