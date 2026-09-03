# Boundary First UX pass — Representation Lab

This note records the semantic topology applied to the MVP so later visual refinement does not collapse it back into a generic dashboard.

## Invariants

- `WORLD-01` is the persistent carrier object. Switching reasoning modes must not imply a different world.
- Reasoning modes are replaceable formal cartridges. A mode switch changes the operative representation, not carrier identity.
- The representation boundary must expose admitted and withheld distinctions.
- The causal path remains visible: `WORLD -> OBSERVE -> REPRESENT -> INFER -> ACT -> CONSEQUENCE`.
- Closure is displayed as earned state after the bounded trace completes; it is not a world-action control.
- World truth and agent-visible state remain distinct, especially in Bayesian mode.
- Responsive and accessibility representations preserve the same semantic distinctions rather than degrading to a simplified copy.

## Physical grammar

- frames = explicit semantic boundaries;
- ports = distinctions crossing or failing to cross a representation boundary;
- reasoner cartridge = replaceable formal model;
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

## Controlled defect

Search cartridges expose a stress rig for the predecessor relation.

With predecessor retention enabled, goal recognition closes into a reconstructible route. With that relation deliberately dropped, BFS/A\* can still discover the goal but cannot reconstruct the path. The resulting state is explicitly represented as a **representational closure defect** rather than a generic runtime error.

This is an important BFUX constraint: the interface should show *which distinction was lost* and *which downstream consequence became impossible*.

## Standing

This surface is a **laboratory demonstration** of Boundary First UX and Representational Mechanics. It is not a certification surface and does not claim canonical BFUX conformance.
