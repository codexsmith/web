---
title: "The Bounded Consequence Circuit"
slug: bounded-consequence-circuit-protocol-preview
parent: software-engineering-practice
claim_maturity: candidate-protocol-preview
misuse_potential: medium
public_legibility: practitioner
public_summary: "A candidate operational protocol for moving a bounded claim through action, independent consequence, owned repair, verification, and earned closure."
---

# The Bounded Consequence Circuit

The Bounded Consequence Circuit is a candidate operational protocol for work that must do more than produce a convincing representation. It turns a claim into a bounded action, brings back evidence through a declared consequence channel, assigns repair when the result differs from the claim, and preserves a record of what actually closed.

It is the protocol layer beneath [Consequence-Bearing Development and AI Repair Loops](/artifact/consequence-bearing-development-and-ai-repair-loops). The broader doctrine explains why representational completion is insufficient. This circuit proposes how a team can make contact with consequence explicit and auditable.

## Circuit invariant

At every stage, the system must preserve the distinction between:

1. what was claimed;
2. what was authorized;
3. what was done;
4. what was observed;
5. what was inferred;
6. what was repaired;
7. what remains open.

Collapsing these distinctions creates common false closures. A test can be mistaken for evidence even when it only restates the implementation. A plausible diagnosis can be mistaken for an observed cause. Permission to inspect can be mistaken for permission to change. A successful rerun can be mistaken for broad proof beyond the original boundary.

## The candidate sequence

> Represent → Bound → Commit → Execute → Instrument → Observe → Compare → Repair → Verify → Close

The sequence is not a demand that every project adopt ten new ceremonies. It is a diagnostic grammar. Existing issues, pull requests, runbooks, experiments, reviews, or incident processes may already implement several stages. The question is whether the necessary distinctions and return paths remain intact.

## Minimum circuit objects

Before consequential execution, a circuit should identify:

- a typed claim and its source;
- the operating boundary;
- protected invariants and affected parties;
- the expected consequence;
- at least one discriminating observation channel;
- the rule for recognizing material discrepancy;
- repair permissions and forbidden actions;
- escalation conditions;
- the verification procedure;
- the person or process authorized to record closure.

These objects do not guarantee correctness. They make the proposed route to correction visible before fluent output or organizational momentum can substitute for it.

## A practical state model

The candidate state progression is:

```text
DRAFT
  → claim typed and sourced
BOUNDED
  → authority and closure conditions accepted
COMMITTED
  → execution begins with instrumentation present
IN_CONTACT
  → observation returns
EVIDENCE_RETURNED
  ├─ no material discrepancy → VERIFICATION_PENDING
  └─ discrepancy detected → REPAIR_REQUIRED
REPAIR_REQUIRED
  → diagnosis and repair ownership established
REPAIR_AUTHORIZED
  → bounded repair executed
VERIFICATION_PENDING
  ├─ verified → CLOSED
  ├─ partial or failed → REPAIR_REQUIRED
  └─ invalid or contested test → HUMAN_ADJUDICATION_REQUIRED
```

The important feature is not the labels. It is that returned discrepancy cannot silently disappear into discussion, and that repair cannot bypass authority merely because a technical system is capable of acting.

## Five stage gates

### 1. Claim admissibility

A claim enters the circuit only when its type, source, operating domain, claim ceiling, and at least one discriminating consequence are declared.

### 2. Commitment admissibility

Execution begins only when the necessary authority is present, affected boundaries are known, containment or rollback exists where needed, the action is small enough to diagnose, and instrumentation is ready before the change.

### 3. Evidence integrity

Returned evidence preserves its time, source, environment, measurement method, missing-data conditions, independence from the generator, and known limitations.

### 4. Repair admissibility

A repair executes only when the observed symptom is distinguished from the proposed cause, the operator has authority over the affected boundary, protected invariants remain represented, side effects and rollback are declared, and verification is ready.

### 5. Closure admissibility

Closure is recorded only after the stated verification runs, the result is preserved, material discrepancy is not hidden, accepted residual risk is explicit, dependent work is updated, and the original generator is not the sole basis for success.

## Roles and conflicts

The circuit distinguishes five responsibilities:

- the **claim steward** preserves the original claim, source, intent, and ceiling;
- the **consequence steward** protects the validity and independence of observation;
- the **repair operator** performs permitted diagnosis and intervention;
- the **authority holder** approves consequential or irreversible action;
- the **closure witness** confirms that declared conditions were met.

One person or system may occupy several roles in low-risk work. The resulting conflict should be visible and acceptable rather than silently erased. Higher-consequence work requires stronger independence.

## Minimal closure record

A closed circuit should be able to answer:

```text
Claim:
Claim type and source:
Boundary and protected invariant:
Expected consequence:
Observation channel:
Observed consequence:
Material discrepancy:
Diagnosis and alternatives:
Repair:
Authority:
Verification:
Residual risk:
Closure witness and time:
```

This record is intentionally compact. It can be attached to a pull request, experiment, operational decision, research claim, or service workflow before more specialized schemas are introduced.

## Present claim ceiling

This is a **candidate protocol preview**, not a validated standard or certification scheme. The state model and gates require comparison with existing assurance, safety, incident, research, and governance practices. They must also survive use in real workflows without creating ceremonial overhead that exceeds their corrective value.

The next proof is operational: one worked case with a preserved claim, an independent consequence return, a material discrepancy, an authorized repair, rerun verification, and a closure record that can later be reopened.

