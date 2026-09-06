# Task: Pac-Man Representational Sandbox MVP

**Status:** implementation-ready backlog  
**Date:** 2026-09-03  
**Branch:** `agent/pacman-representational-sandbox-mvp`  
**Target surface:** Boundary First Labs Playground / research sandbox  
**Related:**
- `backlog/15_scientific_visualization_sandboxes/README.md`
- `backlog/18_screen_wall_catalog_interface.md`
- Boundary First Labs core-theory record: `24_pacman_as_representational_laboratory.md`

## Goal

Ship a small public interactive that demonstrates one idea directly:

> **The world did not change. The representation did. And that changed what the machine could see, infer, and do.**

The MVP should preserve one recognizable maze world while allowing the visitor to switch the agent's reasoning machinery and immediately see the resulting change in behavior and internal representation.

This is intentionally not a broad AI curriculum product. It is a compact Representational Mechanics instrument built from an existing educational object.

## Product proposition

Working title:

# Same World, Different Reasoner

The visitor sees one maze and one agent. A small control strip changes the active reasoning mode.

Initial modes:

- **Pathfinder** — breadth-first search or A*;
- **Adversary** — minimax;
- **Stochastic** — expectimax;
- **Planner** — Markov decision process / value iteration;
- **Blind Bayesian** — noisy observation + belief-state inference;
- **Learner** — Q-learning or a simple feature-based policy, only if it remains cheap enough for the first pass.

The MVP does not need every Berkeley project or every algorithm. It needs enough modes to make the representational contrast undeniable.

## Why this is unusually cheap to build

The difficult conceptual and algorithmic work already exists in mature public teaching material. The website already has:

- a Next.js front end;
- an existing Python serverless simulation endpoint pattern in `api/simulate.py`;
- scientific sandbox UX conventions;
- Playground / screen-wall plans for hosting interactive objects.

Therefore the shortest implementation path is not to re-create a generalized AI framework. It is:

```text
permitted Pac-Man project scaffold/runtime
        +
small set of owned/staff/permitted reasoning agents
        +
thin instrumentation layer
        +
JSON state/frame output
        +
React maze renderer + mode buttons + explanation panel
```

The core engineering problem is mostly adaptation and instrumentation.

## Licensing / provenance boundary

Use Berkeley's public Pac-Man project materials only within their stated educational-use terms and preserve required attribution.

Important constraint:

> Do not publish student assignment solutions or source copied from repositories containing completed coursework solutions.

For the public BFL implementation:

- prefer Berkeley-provided scaffold/runtime files and staff-provided example agents where reuse is allowed;
- implement any missing algorithms ourselves from the published algorithm definitions;
- keep a `NOTICE` / attribution file adjacent to vendored Berkeley-derived code;
- do not assume that Pac-Man character art, sounds, logos, or Bandai Namco branding are separately cleared for arbitrary public reuse;
- if asset rights are unclear, retain the educational engine/maze grammar but replace branded visual assets with an original BFL maze-agent skin before public launch.

For MVP development, architectural compatibility with the Pac-Man codebase matters more than final branding.

## Architecture

### 1. Python engine / adapter

Add a bounded endpoint, likely:

```text
api/pacman.py
```

or a small package under:

```text
api/pacman/
```

Responsibilities:

- load a fixed small maze/layout;
- initialize game state;
- select an agent implementation by mode;
- step the simulation for a bounded number of ticks;
- expose agent-visible state separately from world truth where useful;
- collect instrumentation events;
- return JSON suitable for deterministic browser playback.

Suggested request:

```json
{
  "mode": "astar",
  "seed": 17,
  "layout": "small",
  "max_steps": 120
}
```

Suggested response shape:

```json
{
  "mode": "astar",
  "world": { ... },
  "representation": { ... },
  "frames": [ ... ],
  "events": [ ... ],
  "summary": { ... }
}
```

Do not stream live Python game graphics to the browser. The Python layer should return state and instrumentation; the browser owns rendering.

### 2. Stable frame schema

Each frame should contain only what the renderer and explanatory layer need.

Candidate:

```ts
type PacmanFrame = {
  t: number;
  pacman: [number, number];
  ghosts: Array<[number, number]>;
  food: Array<[number, number]>;
  score?: number;
  visibleGhosts?: Array<[number, number]>;
  explored?: Array<[number, number]>;
  frontier?: Array<[number, number]>;
  values?: Record<string, number>;
  beliefs?: Record<string, number>;
  particles?: Array<[number, number]>;
  chosenAction?: string;
};
```

The schema should make world truth and represented/observed state distinct rather than collapsing them into one object.

### 3. Front-end route

Create one dedicated route, for example:

```text
/playground/same-world-different-reasoner
```

or the closest current Playground route convention.

The route needs only four major areas:

```text
+--------------------------------------------------+
| SAME WORLD, DIFFERENT REASONER                   |
| [Search] [Adversary] [Stochastic] [MDP] [Bayes] |
+-----------------------------+--------------------+
|                             | CURRENT WORLD      |
|         MAZE                | MODEL              |
|                             |                    |
|                             | represented        |
|                             | hidden             |
|                             | assumed            |
+-----------------------------+--------------------+
| compact explanation / event narration           |
+--------------------------------------------------+
```

Do not begin with a giant control dashboard.

## MVP mode behavior

### Search

Recommended first implementation: BFS + A* toggle inside one mode.

Visualize:

- explored cells;
- current frontier;
- final path;
- optional A* heuristic values.

Explanation:

```text
WORLD MODEL
state = current position
walls = inadmissible transitions
goal = target food

The maze is being represented as a graph.
```

A later sub-demo can add the Corners problem to show why `position` ceases to be a sufficient state.

### Minimax / adversarial

Visualize:

- current lookahead depth;
- candidate Pac-Man actions;
- ghost branch treatment as `MIN`;
- selected action.

Explanation:

```text
ASSUMPTION
ghost = adversarial agent

The ghost is represented as choosing the outcome worst for Pac-Man.
```

### Expectimax / stochastic

Keep the same maze and ideally the same initial state as minimax.

Change only the ghost model:

```text
MIN -> EXPECTATION
```

Explanation:

```text
ASSUMPTION
ghost action ~ probability distribution

Nothing visible about the ghost changed. Its formal type changed.
```

This pair is one of the highest-value contrasts in the entire sandbox and should be implemented early.

### MDP / value iteration

Visualize a value field over walkable cells and policy arrows.

Explanation:

```text
WORLD MODEL
state
transition probability
reward
discount

OUTPUT
value function + policy
```

The visible transformation from `path` to `value field / policy` is the point.

### Blind Bayesian

This is the flagship partial-observability mode.

The browser should be able to show two layers:

- **world truth** — optionally revealable for the visitor;
- **agent belief** — what the reasoner actually has access to.

Visualize:

- hidden ghost;
- noisy distance ping;
- belief heatmap or discrete probabilities;
- optional particle cloud.

Explanation:

```text
HIDDEN
ghost position

OBSERVED
noisy distance

INTERNAL STATE
belief distribution
```

The visitor should be able to watch the belief distribution update as evidence arrives.

## Essential instrumentation interface

The most important UI is not the algorithm buttons. It is the representation panel.

Use a stable structure across modes:

```text
CURRENT WORLD MODEL

REPRESENTED
- ...

HIDDEN / FORGOTTEN
- ...

ASSUMED
- ...

OUTPUT OBJECT
- path / action / value / belief / policy
```

This makes algorithm switching legible as representational change rather than as a benchmark menu.

## One deliberate defect for MVP

If scope permits, include exactly one `BREAK THE MODEL` control.

Best first candidate: a state-memory defect in a goal that requires history.

Example:

```text
Remember visited targets: ON / OFF
```

Turning it off collapses a state such as

```text
(position, visitedTargets)
```

to

```text
position
```

and the UI can diagnose:

```text
REPRESENTATIONAL CLOSURE FAILURE
Required distinction lost: traversal history
```

If this complicates the first implementation materially, defer it to MVP+1. Algorithm switching is sufficient for MVP acceptance.

## Rendering strategy

Do not attempt to embed Berkeley's original desktop graphics stack directly into the site.

Render the maze natively in the browser using either:

- SVG for simplicity and inspectability; or
- Canvas if animation volume makes SVG unnecessarily expensive.

SVG is preferred for the first pass because the environment is small and overlays such as frontiers, policies, probabilities, labels, and selected cells are easier to layer and inspect.

The Python code should function as the simulation/reasoning engine, not the presentation layer.

## Runtime posture

The repository already demonstrates a Python serverless endpoint pattern in `api/simulate.py`. Reuse that deployment shape unless the Pac-Man runtime reveals a concrete incompatibility.

Keep every execution bounded:

- fixed small layouts;
- capped search expansions;
- capped game-tree depth;
- capped simulation steps;
- deterministic seed support;
- no long-running training on request;
- pretrain or use tiny deterministic Q-learning demonstrations if learning is included;
- response-size ceiling.

The public sandbox should feel instant and inspectable, not like a remote desktop running a game.

## Front-end interaction sequence

First visit:

```text
1. Maze appears immediately.
2. Search mode is selected by default.
3. User presses RUN or PLAY.
4. Search frontier becomes visible.
5. User clicks ADVERSARY.
6. Maze resets to the same starting state.
7. Internal representation panel changes.
8. User clicks STOCHASTIC.
9. Same world, different ghost semantics, different consequence.
10. User clicks BLIND BAYESIAN.
11. Ghost disappears from agent view; probability appears instead.
```

This sequence alone proves the experience.

## Explanatory copy posture

Keep explanatory text operational and local to the current mode.

Avoid introductory walls of theory.

Good examples:

```text
Same maze. New state definition.
```

```text
The ghost did not change. The assumption did.
```

```text
Pac-Man cannot see the ghost. It can only update a belief about where the ghost may be.
```

```text
This mode produces a policy, not a route.
```

A short `WHY THIS MATTERS` disclosure can connect the sandbox to Representational Mechanics after the visitor has already interacted with it.

## Implementation sequence

### Phase 0 — source audit

1. Identify the canonical Berkeley Pac-Man release to adapt.
2. Record attribution and reuse terms.
3. Separate scaffold/runtime files from assignment-solution files.
4. Identify the minimum dependencies required for headless execution.
5. Confirm which algorithms already have permitted reference/staff implementations and which BFL should implement independently.

### Phase 1 — headless engine

1. Vendor or adapt the smallest permissible engine subset.
2. Run one fixed maze without desktop graphics.
3. Serialize world state per tick.
4. Add deterministic seed/reset behavior.
5. Implement one search mode and one multi-agent mode.

### Phase 2 — browser instrument

1. Create the new route.
2. Render the fixed maze in SVG.
3. Add PLAY / RESET.
4. Add mode buttons.
5. Add `CURRENT WORLD MODEL` panel.
6. Animate returned frames.

At this point the MVP is already demonstrable.

### Phase 3 — high-value representation contrasts

Add in this order:

1. BFS/A* frontier visualization;
2. minimax vs expectimax on the same initial world state;
3. Bayesian hidden-ghost belief visualization;
4. MDP value/policy field;
5. Q-learning only if still small and legible.

### Phase 4 — public polish

1. Add source / attribution disclosure.
2. Replace any questionable branded assets with original BFL assets.
3. Add mobile layout.
4. Add reduced-motion behavior.
5. Add static first frame.
6. Add the object to Playground / Screen Wall catalog surfaces.
7. Run the repository verification contract before merge.

## Deliberate non-goals for MVP

Do not initially build:

- arbitrary user-designed mazes;
- a complete CS 188 course clone;
- code editors;
- configurable search depths everywhere;
- live model training;
- multiplayer;
- every Pac-Man project;
- generalized plugin architecture;
- expensive WebGL rendering;
- a giant formal-theory explanation page before the instrument works.

## Acceptance criteria

The MVP succeeds if a visitor can, without leaving the page:

1. see one fixed maze world;
2. run at least three materially different reasoning modes;
3. switch modes with one click;
4. watch the internal visualization change with the mode;
5. inspect what the agent represents, hides, assumes, and outputs;
6. compare minimax and expectimax from the same initial state;
7. experience at least one partial-observability / belief-state example;
8. understand the sentence:

> **The same world can become a different computational object depending on how it is represented.**

## MVP cut line

The smallest version worth shipping is:

```text
fixed maze
+ SVG renderer
+ Python headless engine
+ Search
+ Minimax
+ Expectimax
+ Bayesian belief mode
+ mode selector
+ representation panel
+ concise explanatory copy
```

Everything else is extension.

That is already a substantial public demonstration of Representational Mechanics.
