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
- Observation uncertainty and model mismatch are distinct defect classes. A posterior can become more concentrated while becoming less faithful to world truth when its generative assumptions are wrong.
- Causal phase is semantic state, not elapsed playback. A trace stage must name the operation actually being performed rather than infer meaning from percentage-through-animation.
- Exact and bounded carriers should expose the same causal decomposition when the computation contains distinct stages. Approximation may change the carrier without erasing `PREDICT -> OBSERVE -> UPDATE`.
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
- model assumption bay = explicit generative assumptions held against a fixed world-truth and evidence tape;
- calibration witness = a concrete frame where model confidence rises while probability assigned to truth falls;
- causal particle chamber = finite-carrier view where transport, weighting, and resampling remain separately inspectable;
- weighted particle = persistent hypothesis identity whose relative mass changes under observation before resampling changes multiplicity;
- bus / trace line = causal propagation, not completion percentage;
- wells = subordinate internal state;
- status lamps / labels = machine state, never decoration.

## Current cartridge set

The laboratory now holds six projections over the same carrier world:

1. **BFS** — graph + FIFO attention; output is a shortest path.
2. **A\*** — graph + admissible heuristic; output remains a shortest path while the attention policy changes.
3. **Minimax** — pursuer typed as adversary; output is a worst-case action.
4. **Expectimax** — pursuer typed as stochastic variable; output is an expected-value action.
5. **MDP / value iteration** — transition probability, reward, and discount become load-bearing; output is a value field + policy. This cartridge can now replace tabular state-action identity with a learned linear feature projection.
6. **Bayesian filter** — true pursuer state is outside the agent boundary; output is a belief distribution. This cartridge can replace the explicit posterior with a bounded particle carrier and can independently stress the sensor and hidden-state transition assumptions used to construct that posterior.

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

The exact posterior remains available only to the laboratory as a diagnostic reference. It is outside the active particle representation and is used to compute total-variation distance. This lets the interface expose a graded approximation defect instead of treating approximate inference as simply correct or incorrect.

The important BFUX distinction is:

```text
bounded representation != broken representation
```

A finite carrier can preserve enough structure for useful inference while accumulating measurable defect. The budget rail makes that trade visible and operable.

### Causal particle carrier

Finite inference must not collapse its internal causal steps merely because the carrier is approximate. The bounded carrier therefore exposes the same Bayesian cycle as the exact carrier:

```text
PREDICT -> OBSERVE -> UPDATE
```

with carrier-specific operations:

```text
TRANSPORT -> WEIGHT -> RESAMPLE
```

The distinctions are operational:

- **PREDICT / TRANSPORT** — particle identities move through the hidden-state transition model before the new ping crosses the observation boundary. Tokens still carry equal mass.
- **OBSERVE / WEIGHT** — particle locations remain fixed while the sensor likelihood changes their relative mass. Effective sample size becomes meaningful here. Resampling has not happened yet.
- **UPDATE / RESAMPLE** — high-weight hypotheses replicate and low-weight hypotheses disappear while the total token budget stays fixed. The resulting empirical distribution is the bounded posterior carrier.

The causal particle chamber renders those states directly. During observation, token size and intensity encode relative likelihood weight without moving the hypotheses. During update, multiplicity changes visibly. Phase-relative total-variation defect is measured against the exact belief available at that same semantic stage rather than against a future posterior.

This yields another BFUX constraint:

```text
approximation may change representation fidelity
approximation must not falsify causal order
```

## Bayesian model mismatch

The Bayesian cartridge also exposes a **model assumption bay**. This experiment holds the canonical hidden trajectory and six noisy distance observations fixed while changing the generative assumptions used by inference.

Sensor models:

- calibrated bounded-noise likelihood;
- overconfident likelihood concentrated sharply on exact range matches;
- `+2` range bias, representing an assumption that the sensor under-reports true distance.

Transition models:

- calibrated local random walk;
- sticky dynamics with 80% probability of remaining in place;
- false westward drift with 80% probability assigned to westward motion when available.

The interface compares the active posterior with the calibrated reference on the same evidence and reports:

- posterior peak confidence;
- probability mass assigned to the actual hidden state;
- posterior entropy;
- graph-distance miss between posterior peak and truth;
- total-variation distance from the calibrated posterior.

The compound `CONFIDENTLY WRONG` preset supplies a concrete pathology. On the final observation, the active model reaches roughly 91% posterior confidence at a location 13 cells from truth while assigning only about 0.08% probability to the actual hidden state. Its posterior is roughly 73% TV from the calibrated reference.

This demonstrates a separate defect class from observation noise or particle approximation:

```text
uncertain evidence -> posterior uncertainty
bounded carrier -> approximation defect
wrong generative model -> confident inference about the wrong world
```

More samples or more computation can reduce approximation error inside a model. They cannot repair a false model assumption by themselves.

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

## Semantic causal trace

The primary trace bus uses explicit semantic operations rather than normalized playback position.

- BFS / A*: setup is `WORLD -> REPRESENT`, frontier expansion is `INFER`, recovered route motion is `ACT`, and final route or reconstruction defect is `CONSEQUENCE`.
- Minimax / Expectimax: branch aggregation is `INFER`, selected move is `ACT`, and modeled reply is `CONSEQUENCE`.
- MDP: value propagation remains `INFER` until the policy is exposed as `CONSEQUENCE`.
- Bayes: every observation repeats `PREDICT -> OBSERVE -> UPDATE`.

For the six-observation Bayesian tape the semantic timeline is:

```text
WORLD -> REPRESENT -> [PREDICT -> OBSERVE -> UPDATE] x 6 -> CONSEQUENCE
```

A causal bus may therefore revisit a phase. It is an operation indicator, not a progress meter.

## Controlled defect

Search cartridges expose a stress rig for the predecessor relation.

With predecessor retention enabled, goal recognition closes into a reconstructible route. With that relation deliberately dropped, BFS/A\* can still discover the goal but cannot reconstruct the path. The resulting state is explicitly represented as a **representational closure defect** rather than a generic runtime error.

This is an important BFUX constraint: the interface should show *which distinction was lost* and *which downstream consequence became impossible*.

## Standing

This surface is a **laboratory demonstration** of Boundary First UX and Representational Mechanics. It is not a certification surface and does not claim canonical BFUX conformance.
