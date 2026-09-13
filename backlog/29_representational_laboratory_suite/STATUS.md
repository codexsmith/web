# Workstream 29 status — Representational Laboratory Suite

**Status:** Cantor architecture proof recovered for validation; existing suite witnesses reconciled  
**Date:** 2026-09-13  
**Authority:** current workstream status

## Current state

Workstream 29 is **not starting from zero**.

Current `main` already contains two important adjacent / predecessor implementations:

1. **Same World, Different Reasoner / Representation Lab** — merged through PR #57 after the Pac-Man representational sandbox recovery and physical BFUX pass. This is already a substantial executable representation -> consequence experiment with multiple reasoner cartridges, explicit world/model boundaries, consequence traces, and model/state variation.
2. **Compact Distinction Space / Visual Mathematics sandbox** — merged through PR #58 at `/sandbox/distinction-space`, presently backed by `BoundaryFascinatorInstrument`. This is a compact specimen/instrument surface attached to Research, not yet the full Distinction Space Laboratory described by the suite.

The original **Cantor Representational Lab MVP** was found separately on stale branch `agent/representational-labs-cantor-mvp`, which had useful implementation work but was hundreds of commits behind current `main`.

That stale history is **not** being rebased wholesale.

The exact bounded Cantor implementation has instead been transplanted onto a fresh branch cut from current `main`:

- branch: `recovery/cantor-representational-lab`
- recovery PR: #62
- recovery commit: `596cf2133012b0ee020219e5c111a400506657e2`
- original source head: `94d280521716794c7244ce76b5970fe9d572346d`

## Important product distinction

There are now three related but non-identical implementation lines to preserve:

- **Same World, Different Reasoner** — already-merged cross-representation experiment; domain-specific and comparatively deep.
- **Compact Visual Mathematics / Distinction Space instrument** — already-merged focused specimen/instrument interaction.
- **Recovered Cantor lab** — first recovered implementation of the newer generic `RepresentationalLabShell` contract: identity, claim boundary, operative surface, consequence trace, inspector, and recovery semantics.

Do not overwrite one with another merely because their purposes overlap.

The recovery question is therefore **not** “which version wins?” It is:

> Which semantics are genuinely shared across these already-working instruments, and which should remain domain-native?

That comparison should happen only after Cantor builds and runs successfully on current `main`.

## Recovered Cantor slice

The recovery contains:

- `/sandbox/cantor`;
- `CantorClosureLab`;
- `RepresentationalLabShell`;
- serializable lab definitions and operation vocabulary;
- shared panel/status/trace primitives;
- responsive shell and Cantor styling;
- implementation guidance for future labs.

The finite fixture deliberately separates:

- the visible diagonal construction mechanism;
- the finite witness certificate;
- admission/promotion into the represented fixture;
- the classical Cantor theorem;
- any BFL transfinite interpretation.

## Validation gate

PR #62 remains a draft until the recovered slice is validated against current `main`.

Required before merge:

1. `npm run verify` or equivalent CI coverage;
2. `/sandbox/cantor` renders without runtime or hydration errors;
3. construct-witness, bit-toggle, admit, bounded-stage, reset, trace, and hood interactions behave correctly;
4. desktop and narrow layouts remain legible;
5. keyboard/focus behavior is usable;
6. the existing `/sandbox/distinction-space` remains unchanged;
7. the existing Same World, Different Reasoner / Representation Lab remains unchanged;
8. no public navigation exposure is added accidentally.

The connected recovery environment could not resolve `github.com`, so local verification was not falsely recorded as complete.

Current Vercel builds from `main` are already failing on unrelated BFUX TypeScript errors in the layout/drag machinery. Those ambient failures must be separated from Cantor-specific validation rather than attributed to the recovery branch.

## Revised implementation sequence

The actual maturity order is now clearer than the original conceptual backlog order:

1. **Same World, Different Reasoner** — already implemented and merged; treat as an existing suite witness and comparison target.
2. **Compact Visual Mathematics / Distinction Space** — already implemented and merged; treat as an adjacent instrument family and partial Distinction Space witness.
3. **Cantor Closure & Defect** — recovered as the first bounded implementation of the generic Representational Lab chassis; validate and merge.
4. **Chess Admissibility Laboratory** — build next as the second domain using the generic chassis.
5. Compare **Cantor + Chess + Same World, Different Reasoner + compact Visual Mathematics** before promoting additional shared runtime, trace, inspector, or shell machinery.
6. Then decide whether Distributed Reality and the fuller Distinction Space Laboratory should reuse the generic shell directly or only share lower-level semantic primitives.

This preserves the original program rule: shared infrastructure must be earned by cross-domain evidence rather than inferred from one implementation.
