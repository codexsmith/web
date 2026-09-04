# Boundary First UX pass — Representation Lab

This note records the semantic topology applied to the MVP so later visual refinement does not collapse it back into a generic dashboard.

## Invariants

- `WORLD-01` is the persistent carrier object. Switching reasoning modes must not imply a different world.
- Reasoning modes are replaceable formal cartridges. A mode switch changes the operative representation, not carrier identity.
- Task specification is independent from reasoner selection. Changing the question must not silently change the represented world or algorithm.
- The representation boundary must expose admitted and withheld distinctions.
- State sufficiency is task-relative: a projection may close one task and fail another without any algorithmic failure.
- Representation budget is an explicit engineering variable. Approximation must expose both the retained carrier and the measurable defect against a reference when one is available.
- Admissible forgetting is consequence-relative. Compression is not good because it is small; it is admissible only while distinctions required by the declared consequence remain preserved.
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
- budget rail = explicit bound on the carrier used to preserve a representation;
- feature boundary = explicit projection of concrete state-action identity into retained, coarsened, or forgotten features;
- alias witness = concrete pair of represented-as-equivalent cases whose reference consequences materially diverge;
- bus / trace line = causal propagation;
- wells = subordinate internal state;
- status lamps / labels = machine state, never decoration.

## Current cartridge set

The laboratory now holds six projections over the same carrier world:

1. **BFS** — graph + FIFO attention; output is a shortest path.
2. **A\*** — graph + admissible heuristic; output remains a shortest path while the attention policy changes.
3. **Minimax** — pursuer typed as adversary; output is a worst-case action.
4. **Expectimax** — pursuer typed as stochastic variable; output is an expected-value action.
5. **MDP / value iteration** — transition probability, reward, and discount become load-bearing; output is a value field + policy. This cartridge can now replace tabular state-action identity with a learned linear feature projection.
6. **Bayesian filter** — true pursuer state is outside the agent boundary; output is a belief distribution. This cartridge can now replace the explicit posterior with a bounded particle carrier.

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

Task changes, reasoner changes, state-definition changes, assumption changes, output-type changes, stressed distinctions, representation-budget changes, and feature-boundary changes are recorded as an explicit `previous -> current` semantic diff.

The goal is to remove mental bookkeeping from comparison: the apparatus should say exactly what crossed, left, or changed at the representation boundary.

## Bounded belief representation

The Bayesian cartridge exposes the posterior carrier as an explicit budget:

```text
EXACT -> 500 -> 100 -> 20 -> 5 particles
```

The exact mode retains an explicit probability for every candidate hidden state. Finite modes replace that field with sampled hypotheses propagated through the same transition model, weighted by the same noisy observation likelihood, and systematically resampled.

The active maze rendering changes with the carrier: the exact posterior is a probability field; finite representations are literal particle tokens.

The exact posterior remains available only to the laboratory as a diagnostic reference. It is outside the active particle representation and is used to compute total-variation distance. This lets the interface expose a graded approximation defect instead of treating approximate inference as simply correct or incorrect.

The important BFUX distinction is:

```text
bounded representation != broken representation
```

A finite carrier can preserve enough structure for useful inference while accumulating measurable defect. The budget rail makes that trade visible and operable.

## Feature projection and admissible forgetting

The MDP cartridge now exposes a second carrier choice:

```text
TABULAR Q* <-> FEATURE Q
```

The tabular reference retains one address for every nonterminal state-action pair. The feature carrier instead learns

```text
Q(s,a) = w · f(s,a)
```

with seeded semi-gradient Q-learning against the same stochastic transition and reward model.

The feature boundary exposes seven candidate distinctions:

- goal progress;
- goal range;
- hazard separation;
- hazard range;
- collision risk;
- local mobility;
- wall contact.

Continuous features can be retained at full resolution, coarsened into buckets, or forgotten. Binary features can be retained or forgotten. The main maze switches from the tabular value/policy field to the learned feature-Q field when this carrier is active.

The experiment measures both compression and consequence:

- greedy-policy agreement with tabular Q*;
- policy agreement specifically near the hazard;
- mean absolute Q defect;
- learned parameter count versus tabular state-action entries;
- number of distinct feature signatures;
- largest alias class;
- consequential alias classes whose hidden Q* span exceeds the declared threshold;
- hazard-entering mistakes introduced by the projection.

When a consequential collision exists, the interface surfaces a concrete **alias witness**: two state-action pairs mapped to the same feature vector while their reference Q* values materially differ.

This supplies an operational test for admissible forgetting:

```text
forget identity -> generalize
forget a required distinction -> alias incompatible consequences
```

A small representation is therefore not automatically better. The relevant question is whether the quotient preserves the distinctions required by the active consequence.

## Controlled defect

Search cartridges expose a stress rig for the predecessor relation.

With predecessor retention enabled, goal recognition closes into a reconstructible route. With that relation deliberately dropped, BFS/A\* can still discover the goal but cannot reconstruct the path. The resulting state is explicitly represented as a **representational closure defect** rather than a generic runtime error.

This is an important BFUX constraint: the interface should show *which distinction was lost* and *which downstream consequence became impossible*.

## Standing

This surface is a **laboratory demonstration** of Boundary First UX and Representational Mechanics. It is not a certification surface and does not claim canonical BFUX conformance.
