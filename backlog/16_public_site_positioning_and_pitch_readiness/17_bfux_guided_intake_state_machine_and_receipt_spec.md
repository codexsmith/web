# BFUX Guided Intake — State Machine, Classification, and Receipt Specification

Status: backlog / implementation-facing UX specification  
Date: 2026-09-06  
Parent synthesis: `16_bfux_guided_intake_problem_response_receipt_b2b_portfolio_refresh.md`  
Conceptual ancestor: `14_bring_us_your_difficult_system_problem_intake.md`  
Scope: public guided intake, state preservation, classification, routing, explanation, and user-visible receipt

---

## Purpose

This document turns the v2 BFUX intake synthesis into a concrete interaction and state specification.

The product goal is not merely to collect enough information to contact Boundary First Labs.

The product goal is to help the visitor move from:

> **I have a difficult situation and I do not know what kind of problem this is.**

through a sequence of bounded distinctions toward:

> **This is the current class of problem, this is why that classification fits, this is the response class that normally follows, these are the unresolved distinctions, and this is what would change the result.**

The resulting state must be visible to the user and portable beyond the intake session.

---

# Design contract

The guided intake must satisfy all of the following:

1. **No prerequisite ontology.** The visitor does not need Boundary First terminology.
2. **Progressive distinction.** Ask only for distinctions necessary to improve the current state.
3. **Unknown is lawful.** `I do not know`, `mixed`, `other`, and `not enough evidence` are valid states.
4. **No silent collapse.** Do not map multiple materially different answers into one hidden category without preserving the source distinctions.
5. **Visible transformation.** The visitor can see how their answers contributed to the proposed classification.
6. **Reversibility.** Prior answers can be changed and the downstream state recomputed.
7. **No hidden authority inflation.** A classification is a routing hypothesis, not professional certification or domain authority.
8. **Uncertainty survives.** Competing classifications and unresolved questions remain visible when material.
9. **User receives the result.** The interface returns a problem-response receipt before any contact submission is required.
10. **Submission is optional.** A useful classification can exist without creating a lead, account, or stored record.
11. **Context follows the user.** If the visitor elects to contact BFL, already-captured state travels with the inquiry.
12. **Later reclassification is explicit.** Human review may refine the route, but should record why the classification changed.

---

# Interaction topology

Canonical state progression:

```text
START
  ↓
ORIENT
  ↓
BOUND
  ↓
LOCATE
  ↓
PRESERVE
  ↓
EVIDENCE
  ↓
OUTCOME
  ↓
CLASSIFY
  ↓
EXPLAIN
  ↓
RECEIPT
  ├─ revise answers ───────────────┐
  ├─ continue to BFL inquiry      │
  ├─ copy / print / share         │
  └─ stop with useful result      │
                                  │
                 recompute ◄──────┘
```

This is a state machine, not a fixed linear survey.

Some branches may skip questions that are not relevant. Some answers may open a clarifying sub-step. The visible interface should still feel like one coherent sequence.

---

# State layers

Do not treat all collected information as one undifferentiated form object.

Use explicit layers.

## 1. Source state

Facts supplied directly by the visitor or already known from navigation context.

Examples:

```text
source_route
source_artifact
source_product
visitor_intent
visitor_free_text
selected_object_classes[]
selected_failure_signals[]
selected_invariants[]
selected_evidence[]
desired_outcomes[]
explicit_unknowns[]
```

This layer should remain recoverable even if the classification rules later change.

## 2. Derived distinction state

Machine-readable distinctions inferred from source state.

Examples:

```text
cross_boundary_failure = likely
representation_mismatch = possible
agency_gap = unknown
invariant_density = high
evidence_availability = medium
domain_authority_required = possible
intervention_readiness = low
```

Derived distinctions are hypotheses. They are not equivalent to visitor-supplied facts.

## 3. Classification state

Candidate problem classes with fit and support.

```text
candidate_classes[]
primary_class
secondary_classes[]
fit_state
supporting_signals[]
contradicting_signals[]
unresolved_discriminators[]
```

## 4. Response state

Proposed next response.

```text
response_class
bfl_surface
alternative_responses[]
prerequisites[]
authority_requirements[]
next_actions[]
```

## 5. Receipt state

Public projection returned to the visitor.

The receipt should contain the minimum state necessary to understand and reuse the result without leaking internal notes or operational triage.

---

# ORIENT — establish intent before classification

The first screen asks:

> **What brings you here?**

Initial typed intent values:

```text
DIFFICULT_SYSTEM
WORK_HISTORY_GOALS
COLLABORATION
CRITIQUE_BFL
PUBLIC_SYSTEM_NOMINATION
SUPPORT_OR_FUND
EXPLORE_ONLY
```

The intent may change later.

Example: a visitor may begin with `DIFFICULT_SYSTEM` and discover that the proper route is actually `COLLABORATION` because they possess complementary domain capability rather than a service need.

That is not a failed intake. It is a successful reclassification.

---

# BOUND — identify the object without demanding precision

For the difficult-system branch, ask:

> **What kind of thing are you dealing with?**

Initial object classes:

```text
SOFTWARE_TECHNICAL_SYSTEM
WORKFLOW_PROCESS
ORGANIZATION_INSTITUTION
POLICY_RULE_GOVERNANCE
KNOWLEDGE_INFORMATION_SYSTEM
PHYSICAL_CIVIC_INFRASTRUCTURE
MODEL_ANALYTIC_SYSTEM
MULTI_SYSTEM
UNKNOWN_OBJECT
OTHER
```

Multiple selection may be allowed where appropriate.

## Why this question exists

The purpose is not industry segmentation.

It determines which later distinctions are meaningful.

For example:

- source code is relevant evidence for software;
- policy text is relevant evidence for governance;
- maintenance history is critical for infrastructure;
- decision rights become especially important for institutions;
- provenance and contradiction handling become especially important for knowledge systems.

The interface may adapt without forcing the visitor into a domain-specific sales taxonomy.

---

# LOCATE — expose failure signatures

Ask:

> **Where does the difficulty show up?**

Initial signal registry:

```text
EXCEPTION_DOMINATED
NO_WHOLE_SYSTEM_VIEW
MEANING_DIFFERS_BY_GROUP
LOCAL_FIX_GLOBAL_BREAK
HANDOFF_RESPONSIBILITY_GAP
DOCUMENTATION_REALITY_MISMATCH
HUMAN_MEMORY_AS_INFRASTRUCTURE
PROVENANCE_OR_EVIDENCE_LOSS
EDGE_CASE_FAILURE
CHANGE_BRITTLENESS
HIDDEN_STATE
UNCLEAR_AUTHORITY
UNCLEAR_REPAIR_OWNER
UNBOUNDED_SCOPE
CONFLICTING_OBJECTIVES
UNKNOWN_FAILURE_LOCATION
OTHER_SIGNAL
```

Each public signal should have:

```text
id
public_label
plain_language_description
internal_distinctions[]
example
```

The public label is the contract.

Internal mappings may evolve.

---

# PRESERVE — collect invariants

Ask:

> **If this changes, what absolutely must not be lost or broken?**

Initial invariant registry:

```text
PEOPLE_SAFETY
LEGAL_REGULATORY
OPERATIONAL_CONTINUITY
CURRENT_FUNCTIONALITY
DATA_HISTORY
PRIVACY_SECURITY
ACCESSIBILITY
PUBLIC_ACCOUNTABILITY
CONTRACTUAL_OBLIGATION
FINANCIAL_CONTINUITY
INSTITUTIONAL_RELATIONSHIP
REVERSIBILITY
AUDITABILITY
USER_SPECIFIED
UNKNOWN_INVARIANT
```

## BFUX rule

Do not allow the proposed response to imply that an invariant can be violated merely because the visitor did not select it.

Unselected invariants mean **not declared**, not **unimportant**.

This distinction is especially important for safety, legal, security, privacy, accessibility, and public-consequence boundaries.

---

# EVIDENCE — describe inspectability

Ask:

> **What can we inspect today?**

Initial evidence registry:

```text
LIVE_SYSTEM
SOURCE_CODE
ARCHITECTURE_DOCS
PROCESS_DOCS
POLICY_RULE_TEXT
DATASET
REPORTS
INCIDENTS_TICKETS
METRICS_DASHBOARDS
USER_REPORTS
SCREENSHOTS_RECORDINGS
OPERATORS
DOMAIN_EXPERTS
RESEARCH_LITERATURE
FINANCIAL_OR_OPERATING_RECORDS
NO_FORMAL_EVIDENCE
OTHER_EVIDENCE
```

Then optionally ask:

> **What important evidence do you believe is missing or inaccessible?**

The difference between absent evidence and inaccessible evidence should remain available internally.

---

# OUTCOME — distinguish desired state from proposed solution

Ask:

> **What would a meaningfully better state look like?**

Initial outcome registry:

```text
UNDERSTAND_CURRENT_STATE
REDUCE_FAILURE_OR_RISK
REPAIR_PROCESS
MODERNIZE_SYSTEM
REPLACE_SYSTEM
CLARIFY_AUTHORITY
IMPROVE_MAINTAINABILITY
IMPROVE_USER_EXPERIENCE
RESTORE_EVIDENCE_TRUST
MAKE_DECISION
TEST_HYPOTHESIS
BUILD_NEW_CAPABILITY
TRANSFER_OR_HANDOFF
RETIRE_SYSTEM
UNKNOWN_OUTCOME
OTHER_OUTCOME
```

## Critical rule

Do not treat a requested implementation as the actual desired outcome.

Example:

> “We need to rewrite this application.”

may map to:

```text
requested_solution = rewrite application
underlying_outcome = improve maintainability + reduce failure
```

The requested solution is preserved, not discarded, but it is not automatically promoted to the response class.

---

# Classification grammar

Classification should be rule-supported and inspectable.

Avoid a black-box score that cannot produce a human-legible explanation.

A first implementation can use explicit weighted rules or deterministic predicates.

Example conceptual rule:

```text
IF
  object_class includes SOFTWARE_TECHNICAL_SYSTEM
AND
  signals include CHANGE_BRITTLENESS
AND
  signals include HUMAN_MEMORY_AS_INFRASTRUCTURE or DOCUMENTATION_REALITY_MISMATCH
AND
  invariants include OPERATIONAL_CONTINUITY
THEN
  candidate_class += INHERITED_SYSTEM_RECONSTRUCTION
  support += [selected signals and invariant]
```

A separate rule may add:

```text
IF
  HANDOFF_RESPONSIBILITY_GAP
OR LOCAL_FIX_GLOBAL_BREAK
THEN
  candidate_class += CROSS_BOUNDARY_SYSTEM_FAILURE
```

The receipt can then explain why two candidate classes are close rather than pretending only one class exists.

---

# Initial problem-class registry

## PC-01 — Unbounded / under-bounded problem

Typical signals:

- unknown failure location;
- conflicting objectives;
- multi-system scope;
- requested solution without clear invariant or failure definition.

Typical response:

**Discovery / reconstruction**

Primary purpose:

- recover the actual object;
- identify actors, boundaries, invariants, and evidence;
- avoid premature implementation selection.

## PC-02 — Representation mismatch

Typical signals:

- documentation and reality disagree;
- teams use the same object differently;
- important distinctions live only in conventions;
- one representation carries too many meanings.

Typical response:

**Representation / ontology reconstruction**

## PC-03 — Cross-boundary system failure

Typical signals:

- local components work but handoffs fail;
- local repair creates remote consequence;
- ownership changes across interfaces;
- state disappears or mutates at crossings.

Typical response:

**Boundary First Systems Audit**

## PC-04 — Inherited-system reconstruction

Typical signals:

- brittle change surface;
- undocumented behavior;
- hidden human knowledge;
- operational continuity is a strong invariant;
- rewrite pressure exceeds current system understanding.

Typical response:

**System reconstruction / architecture recovery**, often beginning through Systems Audit.

## PC-05 — Agency / responsibility gap

Typical signals:

- authority can act but responsibility is unclear;
- affected users lack meaningful contest or repair;
- ownership terminates at organizational handoffs;
- escalation paths do not close.

Typical response:

**Agency & Representation Audit**

## PC-06 — Knowledge / provenance continuity failure

Typical signals:

- too many artifacts;
- contradictory sources;
- authoritative state is unclear;
- provenance disappears during synthesis;
- AI output increases information without increasing trust.

Typical response:

**Knowledge / provenance audit** followed by governed continuity or workbench design where appropriate.

## PC-07 — Workflow / state-visibility failure

Typical signals:

- happy-path interface hides real process complexity;
- edge cases strand users;
- users must reconstruct state from multiple screens or systems;
- decision criteria are hidden or inconsistent.

Typical response:

**Boundary First UX / workflow reconstruction**

## PC-08 — Bounded implementation defect

Typical signals:

- object and failure are clear;
- invariants are known;
- evidence is inspectable;
- repair scope is local and does not materially change system semantics.

Typical response:

**Scoped engineering intervention**

## PC-09 — Research / validation problem

Typical signals:

- hypothesis is not yet sufficiently tested;
- competing representations exist;
- implementation would outrun evidence;
- a controlled testbed can discriminate between alternatives.

Typical response:

**Research, testbed, or bounded experiment**

## PC-10 — Complementary-capability problem

Typical signals:

- primary need is domain knowledge, validation, distribution, implementation partnership, or reciprocal capability;
- no simple vendor/client relation captures the work.

Typical response:

**Collaboration pathway**

## PC-11 — Authority-external problem

Typical signals:

- legal, clinical, regulatory, financial, safety, or other professional authority is required before BFL can responsibly proceed.

Typical response:

**Domain expert / partner / referral first**

## PC-12 — Evidence-insufficient problem

Typical signals:

- claimed defect cannot currently be inspected;
- critical evidence is missing;
- proposed intervention has high consequence relative to evidence quality.

Typical response:

**Evidence-building / no intervention yet**

---

# Fit semantics

Avoid fake numerical precision in the public interface.

Initial public fit states:

```text
STRONG_FIT
PLAUSIBLE_FIT
PROVISIONAL_FIT
MULTIPLE_PLAUSIBLE_CLASSES
INSUFFICIENT_EVIDENCE
NO_RESPONSIBLE_CLASSIFICATION
```

Internal rule engines may use scores if useful, but public results should translate those scores into defensible semantic states.

## Required explanation fields

Every classification must be able to expose:

- supporting signals;
- important invariants;
- evidence state;
- unresolved discriminators;
- competing class if material;
- conditions that would change the result.

If the engine cannot explain the classification, the classification should not be used as a user-facing result.

---

# Disconfirming conditions

Every primary classification should have at least one explicit way it could be wrong.

Examples:

### Inherited-system reconstruction

Would weaken if:

- architecture and operative rules are already current and complete;
- the defect reproduces inside one well-bounded component;
- no cross-boundary consequence exists;
- operational continuity is not material.

### Agency / responsibility gap

Would weaken if:

- authority, responsibility, appeal, and repair ownership are already explicit and functioning;
- the apparent gap is actually an implementation defect rather than governance structure.

### Evidence-insufficient problem

Would change if:

- the missing logs, records, system access, or witnesses become available;
- independent reproduction becomes possible.

This is not decorative skepticism.

It gives the visitor a practical next way to improve the state.

---

# Response-class registry

Initial response classes:

```text
RC_DISCOVERY_RECONSTRUCTION
RC_SYSTEMS_AUDIT
RC_ARCHITECTURE_RECOVERY
RC_AGENCY_REPRESENTATION_AUDIT
RC_KNOWLEDGE_PROVENANCE_AUDIT
RC_BFUX_WORKFLOW_RECONSTRUCTION
RC_SCOPED_ENGINEERING
RC_RESEARCH_TESTBED
RC_COLLABORATION
RC_DOMAIN_REFERRAL
RC_EVIDENCE_BUILDING
RC_NO_INTERVENTION
```

A response class is not necessarily a BFL product.

Examples:

- `RC_DOMAIN_REFERRAL` may explicitly route away from BFL;
- `RC_EVIDENCE_BUILDING` may provide a checklist rather than an engagement;
- `RC_NO_INTERVENTION` may be appropriate when the consequence of acting exceeds the evidence or authority available.

This distinction protects the intake from becoming a self-serving recommendation engine.

---

# ProblemResponseReceipt public contract

The public receipt should answer seven questions in order:

1. **What did you bring us?**
2. **What class of problem does this currently resemble?**
3. **What signals led to that result?**
4. **What must remain true?**
5. **What remains uncertain?**
6. **What response usually comes first?**
7. **What would change this classification?**

Optional eighth question:

8. **What can you do next, with or without BFL?**

---

# Receipt versioning

The receipt must have a versioned classification basis.

Minimum metadata:

```text
receipt_id
receipt_schema_version
classification_rules_version
created_at
updated_at
source_state_hash
```

Why:

- the taxonomy will evolve;
- routing rules will improve;
- BFL products and services may change;
- a receipt should remain interpretable later;
- a visitor may revisit the same problem after new evidence appears.

Do not silently reinterpret an old receipt under new rules without identifying that a new evaluation occurred.

---

# Re-evaluation model

A later session may produce:

```text
Receipt A
  classification: inherited-system reconstruction
  evidence: low

New evidence added
  architecture map
  reproducible failure

Receipt B
  classification: bounded implementation defect
  evidence: high
```

The useful statement is:

> **The problem class changed because new evidence showed the failure is localized and the surrounding representation is already adequate.**

That transition is educational value.

---

# User journey examples

## Journey A — inherited enterprise application

Visitor says:

- software system;
- nobody wants to change it;
- documentation disagrees with production;
- three senior operators carry essential knowledge;
- operational continuity cannot be interrupted;
- source code, tickets, and operators are available;
- desired outcome is maintainability and modernization.

Likely result:

```text
Primary class: Inherited-system reconstruction
Secondary class: Cross-boundary system failure
Fit: Strong
Response: Systems Audit / architecture recovery
```

The interface should explicitly resist jumping straight to `rewrite`.

## Journey B — isolated API defect

Visitor says:

- technical system;
- reproducible failure in one service;
- dependencies are known;
- invariant is backward compatibility;
- tests and logs exist;
- desired outcome is repair.

Likely result:

```text
Primary class: Bounded implementation defect
Fit: Strong
Response: Scoped engineering intervention
```

The interface should not inflate every problem into a systems audit.

## Journey C — benefits eligibility process

Visitor says:

- policy + workflow + software;
- affected people receive decisions but cannot reconstruct why;
- appeals move between departments;
- authority exists but repair ownership is unclear;
- policy text and workflow records exist.

Likely result:

```text
Primary class: Agency / responsibility gap
Secondary class: Cross-boundary system failure
Response: Agency & Representation Audit
Authority note: domain/legal review may be required
```

## Journey D — research organization drowning in AI output

Visitor says:

- knowledge system;
- reports, chats, model outputs, and drafts multiply quickly;
- contradictions are hard to recover;
- nobody knows which claim is current;
- provenance must remain inspectable.

Likely result:

```text
Primary class: Knowledge / provenance continuity failure
Response: Knowledge/provenance audit
Possible later response: governed continuity workbench
```

## Journey E — speculative high-consequence idea

Visitor says:

- model / research hypothesis;
- evidence is weak;
- desired outcome is deployment;
- safety consequences are high;
- no independent testbed exists.

Likely result:

```text
Primary class: Research / validation problem
Secondary class: Evidence-insufficient problem
Response: Testbed / evidence-building
No deployment recommendation
```

---

# Visual BFUX requirements

The interface should remain visibly simpler than the Lab Machine.

## Screen grammar

Each step should normally contain:

- one primary question;
- one short explanation of why it matters;
- a compact set of choices;
- optional free-text refinement;
- `Back`;
- `Continue`;
- `I do not know` where meaningful;
- persistent current-path summary.

## State strip

Example:

```text
YOUR PATH
Difficult system
→ Software
→ Change breaks unrelated behavior
→ Preserve operations
→ Source code + operators available
```

The strip is not a breadcrumb of pages.

It is a compressed projection of the user's evolving state.

## Review-before-classify

Before generating the receipt, optionally show:

> **Here is what we heard.**

This summary should distinguish:

- direct visitor statements;
- selected categories;
- unresolved answers.

Then classify.

This creates an explicit boundary between source state and derived state.

---

# Accessibility and non-happy-path requirements

A BFUX intake cannot claim to preserve distinctions while making the interaction inaccessible.

Minimum requirements:

- full keyboard operation;
- semantic form controls;
- no meaning conveyed only through color;
- screen-reader-readable current state;
- no time limits;
- ability to save/copy current state before submission;
- no required drag gestures;
- clear validation language;
- free-text alternative where fixed choices fail;
- mobile-first single-question flow;
- reduced-motion behavior;
- state restoration after accidental navigation where technically safe;
- no mandatory account creation to see the result.

The `Other` and `I do not know` paths must be as usable as the preferred-path choices.

---

# Privacy boundary

Before any server persistence exists, distinguish three states:

```text
LOCAL_SESSION_ONLY
USER_EXPLICITLY_SUBMITTED
USER_EXPLICITLY_SHARED
```

Do not imply that a locally generated receipt is stored by BFL.

Do not persist free text, attachments, identity, or sensitive operational details merely to generate a classification unless a governed retention policy has been implemented and disclosed.

A first public implementation may classify entirely client-side from structured selections and generate a local receipt, then attach a user-approved summary to an email or inquiry handoff.

---

# Human review boundary

The public classification is a first-pass routing object.

A human reviewer may later:

- confirm;
- narrow;
- broaden;
- split;
- reject;
- request evidence;
- redirect to a domain expert;
- identify a previously hidden authority boundary.

If a user-visible classification changes materially after review, the response should say why.

Example:

> **We initially routed this as a Systems Audit. After reviewing the regulatory structure you identified, the first responsible step is domain-specialist review because the intervention boundary depends on statutory authority.**

This is preferable to silently changing the sales pipeline stage.

---

# Testing strategy

## Classification unit tests

For each problem class, maintain fixtures for:

- clear positive cases;
- near-neighbor cases;
- ambiguous cases;
- disconfirming cases;
- insufficient-evidence cases.

## UX state tests

Verify:

- Back restores prior state correctly;
- changing an upstream answer invalidates or recomputes dependent answers;
- skipped steps do not leave stale hidden values;
- `Unknown` does not accidentally map to a positive class;
- multi-selection preserves individual source distinctions;
- receipt always reflects the current state version.

## Adversarial tests

Ask whether the intake:

- recommends BFL for everything;
- over-routes to the most expensive service;
- confuses a requested solution with the underlying problem;
- treats missing evidence as evidence of absence;
- hides uncertainty to produce a cleaner result;
- assumes the submitter has authority they did not claim;
- converts sensitive context into public/shareable text without warning;
- forces edge cases into the nearest happy-path category.

---

# Instrumentation and metrics

Do not optimize only for conversion.

Useful BFUX measures include:

```text
orientation_completion_rate
unknown_option_rate
revision_rate
classification_distribution
multi_class_rate
insufficient_evidence_rate
referral_rate
receipt_completion_rate
receipt_copy_or_print_rate
voluntary_inquiry_rate
post_review_reclassification_rate
classification_disagreement_rate
```

Qualitative questions matter more than raw funnel efficiency:

- Did the visitor understand the resulting problem class?
- Did the result feel like an accurate compression of what they described?
- Did the proposed response make sense?
- Was uncertainty stated where expected?
- Did the visitor learn something reusable?
- Did the visitor feel pressured toward a BFL engagement?

A high referral or no-intervention rate may be evidence of discipline, not product failure.

---

# Explicit anti-patterns

Do not implement:

## Lead-form theater

```text
Name
Company
Email
Budget
Timeline
Tell us what you need
```

and call it Boundary First intake.

## Wizard-shaped taxonomy dump

Do not expose internal theory categories as radio buttons merely because the UI is stepwise.

## Hidden scoring

Do not display a confident class if the system cannot explain why it selected it.

## False closure

Do not force exactly one class when multiple are materially plausible.

## Service-first routing

Do not choose the BFL offer first and reverse-engineer a problem classification to justify it.

## Lost state

Do not ask the visitor to retype their problem into a contact form after the wizard has already reconstructed it.

## Overcollection

Do not collect confidential or sensitive detail before it is operationally necessary and governed.

---

# Minimal v1 implementation

A useful first release does not require a sophisticated classifier or backend.

Minimum viable BFUX:

1. typed `DIFFICULT_SYSTEM` route;
2. 5 core steps: object, failure signals, invariants, evidence, desired outcome;
3. explicit rule-based classification into a small initial problem registry;
4. semantic fit state;
5. visible supporting signals;
6. at least one unresolved / disconfirming condition;
7. proposed response class;
8. local user-visible receipt;
9. Back / revise / recompute;
10. optional context-preserving inquiry handoff.

That is sufficient to test the underlying interaction law.

Do not wait for the entire public participation platform before testing the difficult-system path.

---

# Core implementation invariant

The intake is successful when the user can leave with a better representation even if no relationship with BFL begins.

The operational test is:

> **Can the visitor explain, in their own words, what class of problem they appear to have, why that class fits, what response normally comes first, and what new evidence would change the conclusion?**

If yes, the interface has performed a lawful knowledge transform.

If no, it has merely collected data.
