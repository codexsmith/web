# Consequence Flow Board

## Board columns

1. **Proposed** — an unresolved possibility or claim.
2. **Typed and Bounded** — source, type, scope, invariants, and closure conditions declared.
3. **Committed** — authorized for a bounded action.
4. **In Contact** — executing against a consequence channel.
5. **Evidence Returned** — observation preserved and ready for comparison.
6. **Discrepancy / Verification** — mismatch classified or no-material-discrepancy claim awaiting verification.
7. **Repairing** — an owned and authorized repair is active.
8. **Closure Review** — verification complete; witness checks closure conditions.
9. **Closed** — consequence and repair record complete.
10. **Accepted Open Risk** — explicitly unresolved, owned, bounded, and scheduled for review.

## Required card fields

```text
Claim ID:
Claim type:
Source:
Boundary:
Invariant:
Consequence channel:
Current evidence:
Discrepancy:
Repair owner:
Authority level:
Verification:
Residual risk:
Next admissible transition:
```

## WIP rule

Limit work by the number of open consequential commitments, not by the number of people who appear busy.

## Pull rule

A card may move only when the receiving column's evidence and authority requirements are satisfied.
