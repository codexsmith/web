# Consequence-Bearing Development

## A lawful, bounded, repairable reconstruction of Lean, Agile, Scrum, and Kanban

## Definition

**Consequence-Bearing Development** is a method in which every meaningful claim, requirement, plan, design, implementation, and repair must eventually encounter an independent consequence channel capable of confirming it, correcting it, or keeping the circuit open.

Its governing rule is:

> **Do not use process to protect the plan from reality. Use process to make reality difficult to evade.**

## The bounded consequential circuit

```text
Represent → Bound → Commit → Execute → Instrument
→ Observe → Compare → Repair → Verify → Close
```

### Represent

State what is believed, intended, needed, expected, or promised. Preserve its source, type, assumptions, uncertainty, and affected parties.

### Bound

Declare the operating domain, scope, authority, risk, budget, time, and protected invariants. Prevent unlimited or ambiguous commitment.

### Commit

Select a limited action that is sufficiently specified to encounter consequence.

### Execute

Perform the action in a real or validly representative environment.

### Instrument

Expose system state and effects through tests, logs, telemetry, measurements, user response, audit records, or other evidence channels.

### Observe

Record what occurred without converting surprise into narrative defense.

### Compare

Measure discrepancy between the represented expectation and observed consequence.

### Repair

Modify the responsible representation, implementation, process, boundary, or authority assignment.

### Verify

Rerun the relevant consequence channel and determine whether the defect was removed, displaced, or transformed.

### Close

Record what was actually earned. Leave the circuit open when evidence is insufficient.

## Recovered meanings

### Lean → Consequence Economy

Lean is the discipline of limiting irreversible effort before a representation has earned confidence.

> Waste is effort detached from validated consequence.

### Agile → Correctable Development

Agility is not speed. It is the capacity to remain correctable while acting.

> Speed without correction is accelerated error.

### Scrum → Bounded Consequence Cycle

A sprint is a bounded interval in which selected assumptions are exposed to execution and evidence.

- Planning asks: what is ready to encounter consequence?
- Review asks: what reached reality, and what did it do?
- Retrospective asks: what in our operating system must now be repaired?

### Kanban → Consequence Flow

The board represents where uncertainty, commitment, evidence, repair, and responsibility currently reside.

Recommended states:

```text
Proposed
→ Typed and Bounded
→ Committed
→ In Contact
→ Evidence Returned
→ Discrepancy Found / No Material Discrepancy
→ Repairing
→ Verification Pending
→ Closed / Accepted Open Risk
```

`Done` is too weak when the claimed consequence has not been checked.

## Recovered development terms

| Conventional term | Consequence-bearing term |
|---|---|
| Requirement | Consequence claim |
| User story | Situated need hypothesis |
| Acceptance criteria | Closure conditions |
| Sprint | Bounded consequence cycle |
| Backlog | Unresolved possibility field |
| Work in progress | Open consequential commitment |
| Blocker | Boundary condition |
| Deliverable | Consequence-bearing artifact |
| Demo | Reality-contact review |
| Feedback | Returned consequence |
| Retrospective | Repair cycle |
| Definition of done | Closure contract |
| Technical debt | Deferred repair obligation |
| Velocity | Throughput of responsibly closed circuits |
| Product owner | Consequence steward |
| Scrum master | Circuit-integrity steward |
| Stakeholder | Represented consequence-holder |

## Doctrine

Plans, requirements, tickets, diagrams, code, tests, dashboards, and AI outputs are representations. They are not self-validating.

A backlog is not a promise. It is a field of unresolved possibilities.

A sprint is not a pressure chamber for output. It is a bounded consequential experiment.

A board is not proof of progress. It is a representation of responsibility, uncertainty, evidence, and repair state.

A review is not a demonstration of labor. It is an encounter between a claim and a result.

A retrospective is not ceremonial reflection. It is the repair function of the operating system.

Work is not closed when effort stops. It is closed when:

- the represented need is sufficiently explicit;
- the delivered change exists;
- the observed consequence is known;
- material discrepancies have been repaired or consciously accepted;
- remaining risk has an owner, boundary, and review condition;
- the closure record is auditable.

## Central management question

Every team should be able to answer:

> **What claim did we make, what consequence would test it, where did contact occur, what evidence returned, what discrepancy appeared, what repair followed, and what earned closure?**

When those answers cannot be produced, the process has become social theater rather than consequential development.
