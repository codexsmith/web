# No Consequence Without Representation

**Subtitle:** A Boundary First diagnostic for consequential systems  
**Version:** v0.1  
**Artifact type:** public-interest systems diagnostic / review instrument  
**Audience:** policy / legal / public-interest technology / institutional operations  
**Publication stage:** draft  
**Claim maturity:** candidate-diagnostic-v0.1

## Governing proposition

Consequential systems should make authority, representation, decision, consequence, contestability, responsibility, and repair inspectable.

A compact working sequence is:

```text
Authorization
  -> admitted representation
  -> executable representation
  -> admissible decision / transition
  -> consequence
  -> notice and reasons
  -> contestability
  -> responsibility
  -> repair
```

The diagnostic does not ask whether an institution or AI system is globally good or bad. It asks whether one bounded consequential process can be reconstructed well enough to see where authority, representation, consequence, contest, responsibility, and repair succeed or fail.

## The ten questions

1. Who authorized the system or decision?
2. Who and what does the system represent?
3. Which affected people, facts, distinctions, or conditions are omitted?
4. What evidence and transformations produce the **executable representation** that actually drives the consequential action?
5. What distinctions and invariants must the process preserve?
6. What notice and reasons are provided?
7. Can an affected person meaningfully interrupt, contest, or correct the process?
8. Where does responsibility land?
9. Can the decision be reversed, and can the resulting harm actually be repaired?
10. Which claims are technical findings, legal findings, lived-experience findings, or proposed reforms?

## Why representation matters

A system may be formally complete while the affected person is represented incompletely or falsely. A category, score, case file, record, model output, or interface can stand in for a person or condition and then become actionable downstream.

That is not necessarily defective. Representation is unavoidable. The governance question is whether the representation preserves the distinctions needed for legitimate action and whether errors can be discovered, contested, corrected, and propagated through the systems that relied on them.

## The executable representation

Possessing information is not the same as using it in the consequence-bearing path.

An institution may possess a rich record—hundreds of fields, documents, notes, exceptions, and contextual facts—while the operational process acts on a much smaller state such as:

```text
risk_score = 0.81
eligible = false
fraud_flag = true
priority = low
```

For this diagnostic, the **executable representation** is the representation the operating process can actually recognize and act upon: the score, category, state, record, model output, interface condition, or derived value that triggers or authorizes a consequential transition.

The review should therefore distinguish:

```text
person / world condition
-> available source information
-> admitted representation
-> executable representation
-> authorized transition
-> consequence
-> contest
-> responsibility
-> repair
```

A process can fail even when its upstream record is rich if the downstream executable representation discards a distinction that materially matters.

## Why consequence matters

A decision is not closed merely because an administrative state changed.

Consequences can continue through:

- loss of access or eligibility;
- changed workload or employment conditions;
- reputation or identity effects;
- downstream automated decisions;
- financial or legal burdens;
- delayed services or benefits;
- safety or health effects;
- persistent records or classifications.

A reversal that does not repair these effects may leave the system formally corrected but materially open.

## Why responsibility must land somewhere

Consequential action often passes through chains of people, policies, vendors, models, interfaces, and institutions. Each local actor may point elsewhere.

The diagnostic resists that diffusion. Consequence may be distributed, but responsibility cannot terminate in “the system decided.” The chain should remain inspectable until it reaches accountable human or legal persons with actual authority and obligation to respond.

## A worked miniature

Consider a hypothetical benefits workflow:

```text
Source record:
  income documents
  household composition
  disability accommodation request
  prior eligibility history

Derived executable representation:
  eligibility_state = denied
  reason_code = income_threshold

Transition:
  benefits suspended

Contest question:
  Can the applicant discover which inputs and transformation produced the state?

Repair question:
  If the income representation was wrong, does correction restore only the record,
  or also the missed payment, downstream status, fees, and other consequences?
```

The point is not that this example establishes any legal rule. It shows what the diagnostic tries to make reconstructable: the representation that actually drove consequence, the authority for the transition, and the path from correction to material repair.

## Authority boundaries

Boundary First Labs may contribute:

- system and authority mapping;
- representation and data-boundary analysis;
- executable-representation identification;
- decision, consequence, appeal, and repair-path mapping;
- software and workflow analysis;
- source-controlled synthesis and provenance;
- explicit claim and uncertainty labeling.

Qualified legal collaborators retain authority over legal interpretation, jurisdictional claims, professional advice, litigation strategy, and legal sufficiency.

Affected people and community representatives retain authority over lived conditions, practical accessibility, omitted burdens, and whether proposed remedies work in reality.

No collaborator's participation implies endorsement of Boundary First Labs, the diagnostic, or an eventual publication unless explicitly agreed.

## What this diagnostic does not claim

It does not provide:

- legal advice or a legal determination;
- regulatory or compliance certification;
- algorithmic fairness, safety, or bias certification;
- cybersecurity or penetration-test certification;
- proof that every affected case or downstream consequence has been discovered;
- proof that every relevant representation has been recovered;
- automatic endorsement of the system or institution under review.

## First proposed use

Apply the diagnostic to one real or representative case and ask:

- where it reveals something useful;
- where it duplicates existing legal or technical practice;
- where it is wrong, incomplete, or inaccessible;
- which representation actually drove the consequence;
- which evidence cannot be obtained;
- whether the contest and repair paths work in practice; and
- what must change before the diagnostic could be responsibly reused.
