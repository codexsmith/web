# The AI Repair Loop Playbook

## How to keep AI-generated work open until reality verifies it

**Document type:** Practical field guide and operating kit  
**Target length:** 6,000–9,000 words plus templates  
**Primary audience:** Engineering and AI leaders

## Core promise

Most AI development pipelines automate generation without automating correction. This playbook shows how to build auditable repair loops in which output must encounter evidence, discrepancies create accountable repair, authority remains bounded, and closure is independently earned.

## Proposed table of contents

### Executive summary

- The false-closure problem
- Why more review is not necessarily more evidence
- The bounded AI repair loop
- What leaders can implement immediately

### 1. AI made generation cheap; correctness did not become cheap

- Prompt → output → review → merge
- Fluency as a misleading completion signal
- Model critique and recursive confirmation
- Human approval under automation bias

### 2. Representation is not consequence

- Claims, code, plans, tickets, and dashboards as representations
- Social validation versus causal validation
- Completion versus closure
- The independent consequence channel

### 3. The bounded consequence circuit

```text
Represent → Bound → Commit → Execute → Instrument
→ Observe → Compare → Repair → Verify → Close
```

- required object at each stage;
- common failure at each stage;
- exit condition for each stage.

### 4. What AI may do

- claim parsing;
- test generation;
- execution;
- evidence collection;
- discrepancy classification;
- repair proposal;
- bounded repair;
- verification;
- documentation.

### 5. What AI may not infer from capability

- authorization;
- legitimacy;
- risk acceptance;
- canonical promotion;
- irreversible action;
- self-verification;
- self-closure.

### 6. Designing consequence channels

- software tests and CI;
- runtime telemetry;
- security and performance evidence;
- user and operational outcomes;
- reconciliation and downstream recognition;
- independent implementation and review.

### 7. Failure patterns

- representational closure;
- recursive confirmation;
- false closure;
- displaced consequence;
- ceremonial repair;
- unowned discrepancy;
- authority collapse;
- instrumentation capture.

### 8. Worked example: AI repairs a pull request

Suggested scenario:

- an issue describes a domain rule;
- AI generates a plausible implementation;
- shallow tests pass;
- an independently specified property or downstream reconciliation test fails;
- the loop records discrepancy;
- AI proposes alternatives;
- human authorizes one repair;
- CI and targeted runtime checks verify it;
- closure record preserves evidence and residual risk.

The example should show that fluent code review could miss the defect.

### 9. Team operating model

- consequence steward;
- repair operator;
- authority holder;
- closure witness;
- board states;
- escalation rules;
- reopened closure.

### 10. Implementation checklist

- one workflow;
- one claim schema;
- one independent channel;
- one bounded AI permission set;
- one repair record;
- one closure witness;
- one metric that tracks false closure.

### 11. Executive scorecard

Questions leaders can answer quarterly:

- What proportion of AI outputs meet independent verification?
- Where can tools self-approve or self-close?
- Which discrepancies lack repair owners?
- What costs are displaced beyond the team boundary?
- How often are closed items reopened?
- Which consequence channels are proxies rather than direct evidence?

### Conclusion

> **Do not ask only whether the AI can produce the artifact. Ask whether the system can prove the artifact survived consequence and repair.**

## Appendices

- Claim Contract
- Repair Job schema
- AI Repair Authority matrix
- Closure Record
- Consequence-flow board
- Audit worksheet
- Glossary
