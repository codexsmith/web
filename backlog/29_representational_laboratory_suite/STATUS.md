# Workstream 29 status — Representational Laboratory Suite

**Status:** Cantor architecture proof recovered for validation  
**Date:** 2026-09-13  
**Authority:** current workstream status

## Current state

The original Cantor Representational Lab MVP was found on stale branch `agent/representational-labs-cantor-mvp`, which had useful implementation work but was hundreds of commits behind current `main`.

That stale history is **not** being rebased wholesale.

The exact bounded Cantor implementation has instead been transplanted onto a fresh branch cut from current `main`:

- branch: `recovery/cantor-representational-lab`
- recovery PR: #62
- recovery commit: `596cf2133012b0ee020219e5c111a400506657e2`
- original source head: `94d280521716794c7244ce76b5970fe9d572346d`

## Important product distinction

Current `main` already contains the compact Distinction Space / visual-mathematics instrument at `/sandbox/distinction-space`, presently backed by `BoundaryFascinatorInstrument`.

The recovered Cantor work is a **separate representational-laboratory vertical slice** at `/sandbox/cantor`.

Do not replace or overwrite the compact existing instrument merely because the larger Representational Lab chassis now exists. The two surfaces currently prove different things:

- compact visual-mathematics instrument — focused specimen/instrument interaction;
- Representational Lab chassis — cross-domain identity, claim boundary, operative surface, consequence trace, and recovery semantics.

Their common machinery should be inferred only after both are validated in current code.

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
7. no public navigation exposure is added accidentally.

The connected recovery environment could not resolve `github.com`, so local verification was not falsely recorded as complete.

## Next sequence

If Cantor passes the validation gate:

1. merge the recovered Cantor slice;
2. treat it as Workstream 29 architecture proof #1;
3. build **Chess Admissibility Laboratory** as architecture proof #2;
4. compare Cantor and Chess before promoting more shared runtime machinery;
5. only then decide which, if any, shell concepts should converge with the compact Visual Mathematics / Distinction Space instrument family.

This preserves the original program rule: shared infrastructure must be earned by at least two materially different experiments rather than inferred from one implementation.
