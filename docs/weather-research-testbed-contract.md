# Boundary First Weather Research-Testbed Surface Contract

## Purpose

Boundary First Weather is a computational research program, not an operational forecast product. Its third-layer surface must therefore behave like a research instrument: hypotheses, baselines, diagnostics, experiments, validation standing, and claim ceilings must be visible before persuasive narrative.

Canonical detail route:

`/research/applied-testbeds/weather?detail=record:boundary-first-weather`

The legacy `/weather` route is only a compatibility entrance.

## Core invariant

> A research interface must make it easier to distinguish hypothesis, experiment, evidence, validation standing, and claim ceiling than to confuse them.

## Representation laws

### 1. Established infrastructure and experimental layer stay distinct

Numerical weather prediction, PDE methods, assimilation, ensembles, observations, atmospheric physics, and learned models are the established substrate. Boundary-aware diagnostics, defect localization, structural comparison, selective refinement, compression, and surrogate features are experimental additions.

The interface must not make interoperability look like replacement.

### 2. Hypothesis is not result

The boundary-selective computation hypothesis is testable: boundary or defect indicators may predict where disagreement and forecast-relevant change concentrate. Its presence in the interface does not imply that the hypothesis has been validated.

### 3. Claim levels are independent gates

W0 through W5 are separate research claims with separate ceilings. Success at structural description does not imply transition prediction, ensemble ranking, compression benefit, or simulation acceleration.

No lower rung licenses a higher claim.

### 4. Demonstrator standing is explicit

The planned 2D shallow-water / moist-flow demonstrator remains at specification-and-experiment stage until implemented and evaluated. A compelling visualization is not evidence of operational forecast skill.

### 5. Baseline comparison is part of the experiment

Boundary-Selective Refinement must be evaluated against an appropriately matched baseline. Wall-clock time, update count, memory, forecast-relevant error, boundary-position error, transport error, conservation error, transition lead time, and compute outside active regions are experiment outputs, not assumed advantages.

### 6. Ensemble diagnostics remain candidate diagnostics

Structural-consistency, boundary-displacement, transport-consistency, transition disagreement, defect growth, and regime clustering are candidates for comparison with established ensemble methods. They are not replacements for calibrated probabilistic forecasting.

### 7. Validation is a ladder

The validation sequence runs from synthetic geometry through scalar transport, shallow water, moist/Boussinesq-like systems, compressible/moist atmospheric models, offline established-model comparison, and independent meteorological evaluation.

No lower validation rung may visually imply standing belonging to a later rung.

### 8. Negative results are admissible

A well-bounded negative result is a successful research pilot when the experiment has a matched baseline, declared metrics, reproducible artifacts, and a preserved counterexample record.

### 9. Claim firewall remains visible

The public surface may say that Boundary First Weather is a research program proposing measurable diagnostics and matched-baseline experiments. It must not say that it already improves forecast accuracy, outperforms operational NWP, predicts severe storms earlier, replaces weather models, or has external institutional validation.

## Required instruments

The specialized surface must expose at least:

- established weather-science substrate vs experimental Boundary First layer;
- boundary-selective computation hypothesis and explicit non-claims;
- forecast representation chain;
- Boundary First to weather object mapping;
- W0-W5 claim ladder and claim ceilings;
- planned flagship demonstrator and its experimental standing;
- adaptive-refinement loop;
- matched-baseline evaluation metrics;
- ensemble candidate diagnostics and their claim boundary;
- seven-rung validation ladder;
- bounded pilot question and deliverables;
- explicit admissibility of a negative result;
- public claim firewall.

## Responsive law

Responsive behavior is a lawful projection of the same research state.

- Wide layouts may display claim ladders, validation ladders, and experiment stages horizontally.
- Intermediate layouts may recompose those banks into fewer columns.
- Narrow layouts must preserve order and standing in a single reading flow.
- Sequence, claim ceiling, and validation standing may not disappear merely because the viewport is small.

## Accessibility / forced colors

Material effects may disappear in forced-colors mode. Hypothesis/result distinction, established/experimental distinction, claim levels, validation rungs, baseline measures, and claim firewall must remain legible.

## Acceptance criteria

The Weather third layer is correct when:

1. `/weather` resolves to the canonical research-owned detail surface;
2. the generic structured-record renderer is bypassed;
3. established weather infrastructure and the experimental layer are visibly separate;
4. the core hypothesis is shown together with its test and non-claims;
5. W0-W5 remain distinct claim ceilings;
6. the flagship demonstrator is visibly pre-validation;
7. adaptive refinement is paired with matched-baseline metrics;
8. ensemble outputs are labeled candidate diagnostics;
9. validation is represented as ordered standing, not a decorative roadmap;
10. a negative result remains an admissible successful pilot outcome;
11. the claim firewall rejects operational-performance claims not yet established;
12. desktop, narrow, and forced-colors projections preserve these distinctions.
