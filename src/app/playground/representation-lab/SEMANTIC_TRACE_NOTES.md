# Semantic trace pass — Representation Lab

## Law

A causal trace is a semantic account of an operation, not an animation-progress indicator.

The previous instrument projected frame index proportionally onto:

```text
WORLD -> OBSERVE -> REPRESENT -> INFER -> ACT -> CONSEQUENCE
```

That was visually useful but formally weak: a search expansion is inference regardless of whether it occurs 10% or 70% through playback, and Bayesian filtering revisits prediction, observation, and update repeatedly rather than traversing a causal vocabulary once.

The primary apparatus now uses an explicit semantic timeline.

## Linear reasoners

### BFS / A*

```text
WORLD
-> REPRESENT
-> INFER ... INFER       search/frontier expansion
-> ACT ... ACT           recovered route execution
-> CONSEQUENCE           route closed or representational defect exposed
```

### Minimax / Expectimax

```text
WORLD
-> REPRESENT
-> INFER                  aggregate branch consequences
-> ACT                    commit selected action
-> CONSEQUENCE            realize modeled reply
```

### MDP / value iteration

```text
WORLD
-> REPRESENT
-> INFER ... INFER        propagate expected future value
-> CONSEQUENCE            expose stationary policy
```

Feature-Q remains a learned snapshot over the MDP carrier and is therefore presented at its consequence state while its feature-boundary workbench explains the learned projection.

## Bayesian reasoner

Bayes expands each observation into an explicit three-operation cycle:

```text
PREDICT -> OBSERVE -> UPDATE
```

Operationally:

1. **PREDICT** transports the previous posterior through the hidden-state transition model. On the first observation, the initial prior is carried forward without a preceding motion step.
2. **OBSERVE** admits the noisy range evidence while keeping the predicted distribution unchanged.
3. **UPDATE** applies the sensor likelihood and normalization to produce the new posterior.

The full trace is therefore:

```text
WORLD
-> REPRESENT
-> [PREDICT -> OBSERVE -> UPDATE] x 6
-> CONSEQUENCE
```

For the fixed WORLD-01 tape this produces 21 explicit semantic operations rather than six posterior snapshots.

## BFUX implication

Semantic trace state must be derived from the operative meaning of the current frame, not from elapsed time, normalized index, scroll position, or animation percentage.

A cyclic process may revisit a semantic phase. A phase bus therefore indicates **what operation is active**, not how far the user has progressed through a one-way pipeline.

This matters because causality is part of the represented object. If the interface labels causality inaccurately, the interface itself introduces a representational defect.
