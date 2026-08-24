# Corpus Forge Third-Layer Workbench Contract

## Purpose

Corpus Forge is the first P4 retained record whose public detail should behave like an operational research instrument rather than a long-form landing page.

The content already defines a governed memory system with typed objects, lifecycle transitions, review gates, maturity states, contradictions, supersession, and repair. The interface should expose that machinery directly.

## Invariant

> Corpus Forge is a governed state machine over typed research objects. The public workbench should make the state, transition, witness, disagreement, promotion, and repair structure visible before it asks the reader to absorb long prose.

The retained record remains detail of the canonical `/products/current/corpus-forge` object. It does not become a new graph object or a second site.

## Primary workbench grammar

The specialized record has six persistent semantic bays:

1. **Lifecycle backplane** — ingest → extract → relate → review → promote → supersede / repair.
2. **Typed object bank** — Source, Claim, Evidence, Contradiction, Decision, Supersession.
3. **Contradiction trace** — a worked example where incompatible representations remain visible until reviewed.
4. **Promotion grammar** — maturity states and the gates required before stronger standing.
5. **Validation surface** — concrete operational targets and the current evidence ceiling.
6. **Claim firewall** — safe public standing separated from capabilities or outcomes not yet established.

These are not decorative sections. They expose different kinds of state and obligation in the Corpus Forge model.

## Object law

Unlike objects must remain unlike.

- A Source is not a Claim.
- A Claim is not Evidence.
- Contradiction is not noise to be averaged away.
- A Decision must remain attributable to a witness or review responsibility.
- Supersession replaces a representation for a declared purpose without deleting the historical object.

The UI therefore uses explicit type labels and distinct instrument modules. Color may reinforce state but cannot carry type by itself.

## Transition law

Lifecycle stages must be presented as transitions with outputs, not six independent feature cards.

Every stage answers a different admissibility question and emits an artifact that constrains the next stage. Responsive layouts may reflow the stages, but they must not erase their order.

## Promotion law

Maturity is not visual prominence.

A claim moves through declared states only when the relevant provenance, scope, evidence, inference, review, replacement, and repair gates are satisfied. The promotion ladder and gate bank must therefore remain visually separate.

## Contradiction and repair

Corpus Forge should preserve disagreement before reconciliation.

The worked contradiction trace must retain both source representations, the tension between extracted claims, the review basis, the bounded promoted finding, and any supersession / repair obligation. Updating the displayed prose alone is not an adequate representation of change.

## Program boundary

The public record must keep these expressions distinct:

- **Corpus Forge** — the research-operations method and program.
- **Corpus Forge Workbench** — a software/product expression of the method.
- **Claim & Evidence Ledger** — a focused product surface within the wider governance model.

The page must not imply that every planned Workbench or Ledger capability is deployed or validated.

## Responsive law

- Wide: lifecycle, object bank, promotion gates, and validation can expose multiple simultaneous instruments.
- Medium: modules bank into two- or three-column assemblies.
- Narrow: the same order becomes a single reading/operation flow.

Responsive behavior may change geometry but not lifecycle order, object type, maturity standing, or claim boundary.

## Accessibility

- Every icon has adjacent textual meaning.
- Type and standing do not depend on color alone.
- Lifecycle and maturity sequences use ordered-list semantics.
- Workbench section navigation uses ordinary anchors.
- Forced-colors mode removes material effects while preserving borders, labels, and hierarchy.

## Acceptance tests

The specialized Corpus Forge record is valid when:

1. `/corpus-forge` redirects to the canonical in-frame detail route;
2. the detail route does not render the generic structured-record fallback;
3. all six lifecycle stages remain visible and ordered;
4. all six object types remain explicit;
5. the contradiction example preserves review, promotion, and supersession / repair;
6. maturity states and promotion gates remain separate structures;
7. validation targets are shown beside the active-development evidence ceiling;
8. Method, Workbench, and Ledger remain distinct;
9. safe public standing and not-established claims are visibly separated;
10. the Boundary Frame continues to contain the record.
