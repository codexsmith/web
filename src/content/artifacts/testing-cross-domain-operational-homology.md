---
title: "Testing Cross-Domain Operational Homology"
slug: testing-cross-domain-operational-homology
parent: representational-mechanics
claim_maturity: active-bounded-research-program
misuse_potential: high
public_legibility: technical
public_summary: "A negative-capable research program with a source-backed starter lexicon, an L0-L5 mapping scale, two bounded comparative cases, and an explicit counterexample ledger."
---

# Testing Cross-Domain Operational Homology

**Document class:** Working public research note  
**Version:** v0.1  
**Program state:** Active bounded comparison; external domain review pending

## From recurring clue to testable comparison

Software, law, public administration, research operations, mathematics, and institutional life repeatedly use terms such as **object**, **state**, **role**, **operation**, **authority**, **witness**, **record**, **defect**, and **repair**.

That recurrence is a clue. It is not a result.

The research question is whether selected mappings preserve linked operational structure rather than merely sharing a word or a loose meaning.

> **Mature domains that govern consequential transformation tend to represent entity roles, state, admissible transition, invariant, witness, responsibility, defect, and repair. Some mappings may preserve enough of that structure to warrant formal testing.**

This program is deliberately capable of returning a negative answer. A bounded or rejected mapping is a successful result when it identifies the breakpoint and prevents a stronger false claim.

## Unit of comparison

The unit is not an isolated term. It is an operational tuple:

```text
(entity roles,
 relations,
 state representation,
 admissible transitions,
 protected invariants,
 boundary conditions,
 witness mechanisms,
 failure modes,
 responsibility routing,
 repair operations)
```

A candidate mapping must declare which elements survive, which do not, and what evidence supports the judgment.

## Definitions before mappings

The starter lexicon keeps each term in its native source context before asking whether it corresponds to anything elsewhere.

| Domain | Native term | Working source-bounded definition | Source |
|---|---|---|---|
| Business-process modeling | Process | An end-to-end ordering of activities and messages among participants. | [OMG BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/) |
| Software security | Role | An organizationally meaningful collection of permissions through which operations are authorized. | [NIST RBAC](https://csrc.nist.gov/Projects/Role-Based-Access-Control) |
| Database systems | Transaction | Multiple database steps treated as one all-or-nothing operation under commit or rollback. | [PostgreSQL transactions](https://www.postgresql.org/docs/16/tutorial-transactions.html) |
| Provenance systems | Entity | A thing whose generation, use, revision, or invalidation can be represented. | [W3C PROV-O](https://www.w3.org/TR/prov-o/) |
| Provenance systems | Activity | A process over time that uses, transforms, or generates entities. | [W3C PROV-O](https://www.w3.org/TR/prov-o/) |
| Provenance systems | Agent | A represented bearer of responsibility for an entity or activity. | [W3C PROV-O](https://www.w3.org/TR/prov-o/) |
| Public invoice administration | Pending approval | An invoice is with the buyer and still moving through approval; payment readiness is not established. | [U.S. Treasury IPP status definitions](https://fiscal.treasury.gov/financial-management-solutions/invoice-processing-platform-ipp/finding-payment-status-invoices) |
| Public invoice administration | Approved to pay | Required approval conditions are satisfied, while a payment date may remain unset. | [U.S. Treasury IPP status definitions](https://fiscal.treasury.gov/financial-management-solutions/invoice-processing-platform-ipp/finding-payment-status-invoices) |
| Public invoice administration | Paid | Payment was issued and funds received; this is stronger than approval or scheduling. | [U.S. Treasury IPP status definitions](https://fiscal.treasury.gov/financial-management-solutions/invoice-processing-platform-ipp/finding-payment-status-invoices) |
| Research operations | Promotion | A human-authorized and scope-bounded move into a more authoritative working state. | Corpus Forge vertical slice, JOB-PUB-002 |
| Research operations | Critic report | A separate review record containing findings, repairs, retests, independence limits, and unresolved human decisions. | Corpus Forge vertical slice, JOB-PUB-002 |
| Research operations | Supersession | An append-only replacement relation that keeps predecessor material and the authority trail recoverable. | Corpus Forge vertical slice, JOB-PUB-002 |

These definitions are intentionally local. A definition written for an invoice platform, database, security model, or project protocol is not silently promoted into a universal meaning.

## Mapping grades

| Grade | Evidence level | Promotion rule |
|---|---|---|
| **L0** | Token resemblance | Same or similar word only. Log the clue; make no structural claim. |
| **L1** | Semantic resemblance | Related meanings. Keep as a lexical or pedagogical comparison. |
| **L2** | Functional role resemblance | Similar local function. Declare the scope and known false friends. |
| **L3** | Transition and invariant preservation | State changes and protected conditions survive the mapping. Promote only as a bounded structural analogy. |
| **L4** | Failure and repair preservation | Defects, witnesses, responsibility routes, and repair also survive. The mapping may become an operational-homology candidate. |
| **L5** | Composition-preserving formal map | A declared formal carrier preserves the structure when mappings compose. Formal review is required. |

No mapping below L4 may be called an operational homology.

## Case 1 — Invoice approval, payment, settlement, and repair

**Case boundary:** one fictional invoice from receipt through approval, authorization, execution, settlement, reconciliation, contest, and repair.

The ordinary request is simple: show whether the invoice is received, approved, or paid. That view is useful, but its coarse labels collapse states that authorize different actions.

```text
AccountingApproved != PaymentAuthorized
PaymentSubmitted    != PaymentSettled
PaymentSettled      != PaymentReconciled
Revoked             != Reversed
```

### Three representations

| Representation | What it reveals | What it omits or falsely compresses |
|---|---|---|
| Ordinary process view | The visible route and participant handoffs from receipt to payment. | A received-approved-paid sequence hides distinct authorities, finality evidence, reconciliation, and repair. |
| Software state and interaction view | Orthogonal state dimensions, guarded transitions, permissions, idempotent attempts, and append-only events. | Standing, affected-party legitimacy, and institutional repair remain absent unless explicitly modeled. |
| Boundary First view | The false quotient, protected invariants, required witnesses, and the route from defect to owned repair. | Comparative advantage over competent workflow, contract, or safety methods remains untested. |

### Comparative result

The single-status design is **apparently closed but materially non-closing**. It can issue a reassuring label without representing the authority, evidence, failure, or repair needed to justify that label.

The typed design is a **closure candidate only**. It makes better distinctions, but it has not yet passed executable, organizational, or matched-baseline trials.

**Mapping decision:** promote the software-state-machine to invoice-lifecycle correspondence as an **L3 bounded structural analogy**. It preserves consequential transitions and invariants and changes concrete design decisions. It is not yet an operational-homology claim.

**Breakpoint:** database rollback does not undo elapsed institutional consequence, supplier reliance, or external payment-network events.

## Case 2 — Research-claim promotion and supersession

**Case boundary:** one documented transition from an inherited research architecture to a bounded working architecture through sources, typed claims, criticism, human authority, promotion conditions, and recoverable supersession.

The ordinary publication lane says draft, review, publish. That sequence does not by itself show which source supports which claim, whose review counts, who may promote the result, what was excluded, or how a predecessor remains recoverable.

The Corpus Forge vertical slice represents a longer consequence chain:

```text
content-addressed sources
  -> bounded extraction
  -> typed claims
  -> contradiction records
  -> candidate architecture
  -> separate critic report
  -> human-scoped promotion
  -> deltas and supersession
  -> stable working files
```

### Three representations

| Representation | What it reveals | What it omits or falsely compresses |
|---|---|---|
| Ordinary publication view | A familiar route from draft through review to a retained or released result. | “Reviewed” collapses internal criticism, independent review, human authority, and release permission. |
| Software lifecycle and provenance view | Typed states, source hashes, dependency edges, permissions, validation, versioning, and reversible replacement records. | Schema validity and reproducibility cannot confer truth, legitimacy, independence, or release authority. |
| Boundary First view | Evidence, claim ceiling, critic witness, human authority, unresolved obligations, repair, and supersession remain coupled. | A retrospective case does not demonstrate general superiority, scalability, or lower burden. |

### Comparative result

The case preserves a bounded source-to-consequence transition and its repair trail. It contains a critic finding, a named human promotion decision, scoped conditions, rejected material, quarantined claims, and an append-only rollback or supersession route.

**Mapping decision:** promote the software-memento/version-record to research-provenance/supersession correspondence as an **L4 operational-homology candidate** for continued testing.

The promotion is intentionally narrow. The documented case preserves state, lineage, failure witness, human responsibility, repair, and recoverable replacement. It does not preserve composition formally, so it is not L5.

**Breakpoint:** a recoverable record can preserve decision history but cannot mechanize scholarly judgment or make an internal critic independent.

## Counterexample and breakage ledger

The program searches for breakage before promotion.

| ID | Proposed mapping | Breakpoint | Decision |
|---|---|---|---|
| BRK-001 | Software inheritance → biological inheritance | Biology includes reproduction, variation, population history, and selection rather than a declared subtype relation. | Reject at L1 |
| BRK-002 | Software object identity → personal identity | Persons possess subjectivity, standing, self-interpretation, and rights beyond a state-bearing object model. | Reject at L1 |
| BRK-003 | Compilation → judicial interpretation | Courts operate through contested facts, precedent, discretion, legitimacy, and appeal rather than fixed compiler semantics. | Bound at L2 |
| BRK-004 | Database rollback → historical or moral repair | Restoring data cannot cancel elapsed harm, reliance, memory, or responsibility. | Reject at L2 |
| BRK-005 | Singleton object → legitimate sovereignty | Uniqueness does not establish consent, legitimacy, checks, succession, or jurisdiction. | Reject at L1 |
| BRK-006 | Facade interface → public-service portal | Simplification can hide exceptions, reasons, affected parties, and appeal routes. | Bound at L2 |
| BRK-007 | Observer subscription → legal notice | Notice requires standing, timing, accessibility, delivery evidence, and an opportunity to respond. | Bound at L2 |
| BRK-008 | Object deletion → institutional termination | Termination leaves records, duties, affected people, liabilities, and successor obligations. | Reject at L2 |
| BRK-009 | Class membership → public-benefit eligibility | Eligibility may be contested, time-sensitive, jurisdictional, and subject to due process. | Bound at L2 |
| BRK-010 | Software composition → institutional merger | Institutional parts may retain agency, conflicting duties, exit rights, culture, and external standing. | Bound at L2 |

## What the current slice establishes

The program now contains:

- domain-native terms tied to named sources;
- a declared L0-L5 evidence ladder;
- an operational tuple for comparison;
- two completed bounded comparative readings;
- one L3 analogy promotion;
- one L4 operational-homology candidate;
- five explicit mapping rejections and five bounded-only results;
- a claim ceiling and open gates.

The result is not that software secretly explains everything.

The result is a research instrument for determining which correspondences expose a missing state, authority, witness, failure path, or repair—and which should be stopped.

## Open gates

Before the strongest candidate can advance, the program still requires:

1. external domain review of definitions and case judgments;
2. an executable invoice comparison against competent baseline methods;
3. independent review of the claim-promotion case;
4. a declared formal carrier and composition test for the L4 candidate;
5. prospective replication beyond the two current cases.

## Present claim ceiling

This is an active bounded comparative research program. It establishes a test structure, a source-backed starter lexicon, two completed comparative readings, and explicit positive and negative mapping decisions.

It does not establish a universal grammar, formal isomorphism across domains, field superiority, or license to reduce persons and institutions to software objects.

Begin with [Executable Distinctions](/artifact/executable-distinctions), inspect [Representational Mechanics](/domain/representational-mechanics), follow the evidence architecture in [Work](/work), or propose a bounded comparison through [Collaborate](/collaborate).
