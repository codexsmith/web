# AI Repair Loop Operating Specification

**Specification ID:** BFL-AIRL-001  
**Version:** 0.1  
**Status:** Buildable candidate specification

## Mission

Place AI inside an instrumented, auditable, bounded circuit in which generation must encounter consequence, discrepancy must create accountable repair, and closure must be earned through an independent channel.

> **Generation gave AI a voice. Instrumented repair gives it a lawful relationship with reality.**

## Non-goal

The system does not treat fluent output, model consensus, self-critique, or human approval alone as proof that an artifact is correct.

## Capability decomposition

An AI repair system may perform some or all of the following:

1. parse and type a claim;
2. extract assumptions, dependencies, and invariants;
3. identify candidate consequence channels;
4. generate tests or probes;
5. execute within a bounded environment;
6. collect machine-readable evidence;
7. compare expected and observed states;
8. classify discrepancy;
9. trace candidate causes;
10. propose repairs;
11. execute authorized repairs;
12. rerun verification;
13. produce provenance and closure records;
14. escalate when authority, evidence, or interpretation is insufficient.

## Mandatory separation of functions

The architecture must distinguish:

- **Generation** — produces a candidate artifact or action.
- **Detection** — identifies mismatch.
- **Diagnosis** — proposes causal explanation.
- **Repair design** — proposes intervention.
- **Authorization** — grants permission to act.
- **Execution** — applies the intervention.
- **Verification** — tests the result.
- **Closure** — records that stated conditions were met.

An AI may perform several functions, but the system must preserve their distinct records and permissions.

## Minimum input schema

Each repair job requires:

- `claim_id`
- `claim_type`
- `source_provenance`
- `operating_domain`
- `assumptions`
- `protected_invariants`
- `expected_consequence`
- `observation_channel`
- `discrepancy_rule`
- `repair_permissions`
- `forbidden_actions`
- `escalation_conditions`
- `verification_procedure`
- `closure_authority`

See `templates/repair_job.yaml`.

## Consequence channels

### Software

- compilation and static analysis;
- unit, integration, regression, property, and acceptance tests;
- reproducible build and deployment;
- runtime logs and traces;
- performance and reliability telemetry;
- security scans;
- user-behavior evidence;
- downstream reconciliation;
- incident and rollback evidence.

### Research

- formal derivation;
- symbolic or numerical checking;
- independent implementation;
- dataset comparison;
- experimental measurement;
- benchmark performance;
- adversarial review;
- replication.

### Organizational process

- decision records;
- financial and operational outcomes;
- service-level evidence;
- exception and appeal records;
- stakeholder reports;
- audit trails;
- observed burden and displaced work.

## Independence requirement

A consequence channel is stronger when it is independent of the process that generated the claim.

Weak evidence:

- the same model restates the answer;
- another model agrees using the same prompt and sources;
- a human approves based on fluency;
- a test reproduces the implementation rather than the requirement.

Stronger evidence:

- a separately specified test;
- an independent implementation;
- real telemetry;
- external users or systems;
- a formal checker;
- a benchmark not optimized during generation;
- an adversarial reviewer with access to primary sources.

## Authority model

Default permission levels:

### L0 — Observe

Read, summarize, classify, and propose. No external changes.

### L1 — Reversible sandbox repair

Modify temporary or isolated artifacts; run tests; preserve full diff and rollback.

### L2 — Controlled non-production repair

Modify branches, drafts, staging systems, or queued workflows within declared scope.

### L3 — Human-approved production repair

Execute a specific reviewed change with rollback and post-action verification.

### L4 — Prohibited autonomous action

Irreversible deletion, unbounded publishing, legal or financial commitment, hidden surveillance, authority reassignment, canonical promotion, or safety-critical action without competent human authorization.

## Required outputs

Every job should produce:

- typed claim record;
- test or probe specification;
- evidence bundle;
- discrepancy report;
- diagnosis candidates with confidence and alternatives;
- repair proposal;
- authority decision;
- implementation diff or action log;
- verification result;
- residual-risk statement;
- closure record or escalation packet.

## Closure rule

> **An AI must never declare success from the quality of its own representation. Closure must arrive through a declared consequence channel and a permitted closure authority.**

## Reference implementation path

A first software prototype can be built around a GitHub repository:

```text
issue or claim
  → typed job packet
  → branch and tests
  → AI candidate change
  → CI consequence return
  → discrepancy classification
  → AI repair proposal
  → human approval where required
  → rerun CI and runtime checks
  → closure record attached to pull request
```

## Evaluation metrics

Avoid measuring only output volume. Track:

- false-closure rate;
- discrepancy detection rate;
- repair success rate after first attempt;
- regression rate;
- proportion of independent consequence channels;
- human escalation quality;
- time from evidence return to owned repair;
- residual-risk visibility;
- percentage of closed circuits later reopened;
- cost of consequence displaced outside the represented system.
