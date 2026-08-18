# Bounded Consequence Circuit Protocol

**Protocol ID:** BFL-BCCP-001  
**Version:** 0.1  
**Status:** Candidate operational standard

## Objective

Provide a domain-independent procedure for transforming a representation into a bounded action, exposing it to consequence, repairing discrepancy, and recording earned closure.

## Circuit invariant

At every stage, the system must preserve the distinction between:

1. what was claimed;
2. what was done;
3. what was observed;
4. what was inferred;
5. what was repaired;
6. what remains open.

## Required objects

Every circuit must contain:

- a typed claim;
- a source and provenance record;
- an operating boundary;
- protected invariants;
- affected parties;
- a consequence channel;
- expected observations;
- discrepancy thresholds;
- repair permissions;
- escalation conditions;
- verification conditions;
- a closure record.

## State machine

```text
DRAFT
  ↓ claim typed and sourced
BOUNDED
  ↓ authority and closure conditions accepted
COMMITTED
  ↓ execution begins
IN_CONTACT
  ↓ observation returns
EVIDENCE_RETURNED
  ├─ no material discrepancy → VERIFICATION_PENDING
  └─ discrepancy detected → REPAIR_REQUIRED
REPAIR_REQUIRED
  ↓ diagnosis completed
REPAIR_AUTHORIZED
  ↓ repair executed
VERIFICATION_PENDING
  ├─ verified → CLOSED
  ├─ partial → REPAIR_REQUIRED
  └─ invalid test → HUMAN_ADJUDICATION_REQUIRED
```

## Stage gates

### Gate 1 — Claim admissibility

A claim may enter the circuit only if:

- its type is declared;
- its source is known;
- its operating domain is bounded;
- its language does not exceed its evidence;
- at least one discriminating consequence is identified.

### Gate 2 — Commitment admissibility

An action may be committed only if:

- required authority is present;
- affected systems and parties are known;
- rollback or containment is available where required;
- the action is small enough to diagnose;
- instrumentation is in place before execution.

### Gate 3 — Evidence integrity

Returned evidence must preserve:

- time;
- source;
- environment;
- measurement method;
- missing-data conditions;
- whether the channel is independent of the generator;
- known limitations.

### Gate 4 — Repair admissibility

A repair may execute only if:

- the diagnosed cause is distinguished from the observed symptom;
- the repair authority includes the affected boundary;
- protected invariants remain preserved;
- expected side effects and rollback are declared;
- a verification test is ready.

### Gate 5 — Closure admissibility

Closure may be recorded only if:

- the stated verification was run;
- the result is preserved;
- no material discrepancy remains hidden;
- accepted residual risk is explicit;
- dependent circuits are updated;
- closure was not declared solely by the generator of the artifact.

## Roles

### Claim steward

Maintains the original claim, source, intent, and claim ceiling.

### Consequence steward

Owns the validity and independence of the observation channel.

### Repair operator

Performs permitted diagnosis and repair.

### Authority holder

Approves consequential or irreversible actions.

### Closure witness

Confirms that the closure conditions were actually met. Must be independent where risk requires it.

One person or system may occupy multiple roles only when the resulting conflict is explicit and acceptable.

## Failure states

- **False closure:** completion declared without sufficient consequence.
- **Displaced consequence:** costs are borne outside the represented system.
- **Recursive confirmation:** the generator validates itself through derivative representations.
- **Ceremonial repair:** a defect is discussed but no accountable state changes.
- **Unowned discrepancy:** evidence returns but no role owns repair.
- **Repair drift:** the intervention changes a neighboring structure while leaving the responsible defect intact.
- **Instrumentation capture:** the metric becomes optimized while the intended consequence degrades.
- **Authority collapse:** capability is treated as permission.

## Minimal audit record

Every closed circuit should answer:

```text
Claim:
Claim type:
Source:
Boundary:
Protected invariant:
Expected consequence:
Observation channel:
Observed consequence:
Discrepancy:
Diagnosis:
Repair:
Authority:
Verification:
Residual risk:
Closure witness:
Closure time:
```
