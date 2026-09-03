# Boundary First UX pass — Representation Lab

This note records the semantic topology applied to the MVP so later visual refinement does not collapse it back into a generic dashboard.

## Invariants

- `WORLD-01` is the persistent carrier object. Switching reasoning modes must not imply a different world.
- Reasoning modes are replaceable formal cartridges. A mode switch changes the operative representation, not carrier identity.
- Task specification is independent from reasoner selection. Changing the question must not silently change the represented world or algorithm.
- The representation boundary must expose admitted and withheld distinctions.
- State sufficiency is task-relative: a projection may close one task and fail another without any algorithmic failure.
- The causal path remains visible: `WORLD -> OBSERVE -> REPRESENT -> INFER -> ACT -> CONSEQUENCE`.
- Closure is displayed as earned state after the bounded trace completes; it is not a world-action control.
- World truth and agent-visible state remain distinct, especially in Bayesian mode.
- Responsive and accessibility representations preserve the same semantic distinctions rather than degrading to a simplified copy.

## Physical grammar

- frames = explicit semantic boundaries;
- ports = distinctions crossing or failing to cross a representation boundary;
- reasoner cartridge = replaceable formal model;
- task bus = replaceable consequence/question while carrier identity remains fixed;
- assumption lever = one declared semantic operator changing while neighboring structure remains fixed;
- representation diff = explicit record of distinctions admitted, removed, or retyped across an interaction;
- bus / trace line = causal propagation;
- wells = subordinate internal state;
- status lamps / labels = machine state, never decoration.

## Current cartridge set

The laboratory now holds six projections over the same carrier world:

1. **BFS** — graph + FIFO attention; output is a shortest path.
2. **A\*** — graph + admissible heuristic; output remains a shortest path while the attention policy changes.
3. **Minimax** — pursuer typed as adversary; output is a worst-case action.
4. **Expectimax** — pursuer typed as stochastic variable; output is an expected-value action.
5. **MDP / value iteration** — transition probability, reward, and discount become load-bearing; output is a value field + policy.
6. **Bayesian filter** — true pursuer state is outside the agent boundary; output is a belief distribution.

The counterfactual rack exists to compare these outputs without changing `WORLD-01`.

## Task bus

The laboratory can now hold the world fixed while changing the question independently of the reasoner:

- reach a target;
- visit all targets;
- survive a pursuer;
- maximize expected return;
- locate a hidden pursuer.

The task/reasoner indicator distinguishes canonical pairings from deliberate cross-examination. It is descriptive laboratory instrumentation, not a universal sufficiency score.

## State sufficiency experiment

The four-target task provides a direct task-relative closure test.

Two state definitions are compared:

```text
state = position
```

and

```text
state = (position, visitedTargets)
```

With `position` alone, the search exhausts the 72 represented maze positions without task closure because histories with different remaining obligations collide under the same state key.

With `(position, visitedTargets)`, the same world and search grammar close the task in a 36-step route after 305 state expansions.

The witness is intentionally concrete: two histories both arrive at `(1,9)`, but one has visited only `SW` while the other has visited `SW,NW`. Their future obligations differ. Position-only projection erases that distinction; augmented state retains it.

## Assumption lever

The pursuer-semantics bay exposes the minimax/expectimax contrast as a single declared operator change:

```text
MIN <-> EXPECTATION
```

The world geometry and visible pursuer remain fixed while branch aggregation changes. On the fixed initial state, the selected rational action changes with that formal type.

## Representation diff

Task changes, reasoner changes, state-definition changes, assumption changes, output-type changes, and stressed distinctions are recorded as an explicit `previous -> current` semantic diff.

The goal is to remove mental bookkeeping from comparison: the apparatus should say exactly what crossed, left, or changed at the representation boundary.

## Controlled defect

Search cartridges expose a stress rig for the predecessor relation.

With predecessor retention enabled, goal recognition closes into a reconstructible route. With that relation deliberately dropped, BFS/A\* can still discover the goal but cannot reconstruct the path. The resulting state is explicitly represented as a **representational closure defect** rather than a generic runtime error.

This is an important BFUX constraint: the interface should show *which distinction was lost* and *which downstream consequence became impossible*.

## Standing

This surface is a **laboratory demonstration** of Boundary First UX and Representational Mechanics. It is not a certification surface and does not claim canonical BFUX conformance.
