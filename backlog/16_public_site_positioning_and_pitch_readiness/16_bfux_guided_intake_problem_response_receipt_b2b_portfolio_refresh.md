# BFUX Guided Intake, Problem-Response Receipt, and B2B Portfolio Refresh

Status: backlog / public-interface synthesis  
Date: 2026-09-06  
Parent package: `16_public_site_positioning_and_pitch_readiness`  
Related web backlog: `14_bring_us_your_difficult_system_problem_intake.md`  
Related historical implementation lineage: `agent/p1-public-shell` `/inquire`, `/business`, `/work`; Agency & Representation Audit intake; Lab Machine `INTAKE` / `INSPECT` rail interfaces  
Related Lab public-interface source: `organized_library_curated/999_Library/06_Website_Content/03_public_projection__website_projection/public_interface_four_facets_v0_1.md`

---

## Why this exists

Two external marketability / business-readiness reviews on 2026-09-06 independently identified the same practical defect in the current public projection:

- the Lab has substantial products, methods, research, shipped work, and institutional machinery;
- the website does not yet give a cold visitor a sufficiently simple translation and action layer;
- market-facing capabilities are present but not assembled into a clear B2B portfolio;
- the public engagement path is difficult to discover or reconstruct from the current presentation.

This is a useful diagnosis, but it is **not** evidence that Boundary First Labs never designed an intake or business-facing interface.

The relevant machinery already exists in earlier forms and should be recovered rather than reinvented.

The current task is therefore:

> **Recover the prior intake and enterprise interfaces, update them with the newer public-interface grammar, and present the result as a simpler Boundary First UX workflow.**

The target is not a generic sales funnel.

It is a guided decision interface that helps a visitor determine:

1. what kind of problem or intent they actually have;
2. what distinctions matter;
3. what evidence and constraints are present;
4. what class of problem this most closely resembles;
5. what response class normally follows;
6. what Boundary First Labs can responsibly do next;
7. what would change or falsify that routing decision.

Most importantly, the classification must not disappear inside the Lab.

The user should receive it back as a clean, durable state result.

---

# Historical lineage to preserve

This work has a real design history.

## v0 — product-specific inquiry

The Agency & Representation Audit already had a bounded engagement CTA:

`Agency / Representation Audit -> Start an audit inquiry -> Collaborate`

This established the first important invariant:

> A concrete public capability should terminate in an explicit engagement interface.

## v0.5 — difficult-system intake

`14_bring_us_your_difficult_system_problem_intake.md` generalized the entrance beyond any one service.

Its strongest design law remains current:

> The visitor should not need to know which Boundary First product, theory, method, or service applies before beginning.

They should be able to start with the difficult system as they actually experience it.

The intake may validly conclude that:

- BFL can take a bounded engineering engagement;
- an audit or pilot is appropriate;
- the object is primarily a research question;
- more evidence is required;
- a domain expert or partner is required first;
- the problem should be decomposed further;
- no responsible intervention is currently available;
- BFL is not the right steward.

That non-commercial closure is a feature, not a failure.

## v1 — context-preserving inquiry

The `agent/p1-public-shell` `/inquire` implementation preserved:

- intent;
- topic;
- record;
- source.

It also explicitly kept first contact small and used a generated email handoff instead of silently introducing an ungoverned contact database.

The durable lesson is:

> **Do not make the user restate context that the interface already knows.**

## v1 machine integration — INTAKE / INSPECT

The Lab Machine capital rail later made `INTAKE` and `INSPECT` actual boundary-interface modules rather than decorative labels.

This is the correct systems metaphor:

`INTAKE -> transformation machinery -> INSPECT`

The system accepts a state, transforms it, and exposes the resulting state for inspection.

## v2 — typed institutional intake

The newer Lab public-interface work distinguishes four public contracts that must not be flattened into generic Contact:

1. Public Infrastructure Analysis
2. Critique Boundary First
3. Collaboration Invitations
4. Bring Us Your Work / History / Goals

The present backlog item extends that grammar with the **commercial / difficult-system path** and the **user-visible classification result**.

---

# Core design thesis

A simplified Boundary First UX intake should look familiar enough to use immediately:

- wizard;
- workflow;
- decision tree;
- progressive disclosure;
- one question at a time;
- visible current state;
- reversible navigation;
- ordinary-language choices.

The novelty is not the visual form.

The novelty is the **representational discipline** underneath it.

A conventional lead funnel tries to classify the visitor quickly enough to route them into sales.

A Boundary First guided intake instead tries to reconstruct enough of the problem boundary to make the routing defensible and useful to the visitor.

Canonical workflow:

```text
ORIENT
  -> BOUND
  -> LOCATE
  -> PRESERVE
  -> EVIDENCE
  -> PROJECT
  -> ACT
  -> RETAIN
```

Where:

- **ORIENT** — why are you here?
- **BOUND** — what kind of object or system are we talking about?
- **LOCATE** — where does the difficulty or intent actually appear?
- **PRESERVE** — what must remain true if anything changes?
- **EVIDENCE** — what can be inspected now?
- **PROJECT** — what problem class and response class best fit the available state?
- **ACT** — what is the next bounded action?
- **RETAIN** — return the classification and reasoning to the visitor as a durable state result.

---

# First-screen public orientation

Candidate top-level question:

> **What brings you here?**

Candidate paths:

- **I have a difficult system or problem.**
- **I want to bring you work, history, or an idea.**
- **I want to collaborate.**
- **I want to critique or correct Boundary First.**
- **I want the Lab to inspect a public system.**
- **I want to understand, support, or fund the Lab.**

These are actor intents, not internal organizational categories.

Do not begin with:

- product taxonomy;
- Boundary Theory vocabulary;
- industry taxonomy;
- procurement language;
- company size;
- budget;
- sales qualification.

Those distinctions may become relevant later, but they are not the first boundary.

---

# Guided difficult-system path

The commercial / B2B path should be the clearest concrete demonstration of the pattern.

## Step 1 — BOUND: What kind of thing is giving you trouble?

Candidate ordinary-language classes:

- software or technical system;
- workflow or operational process;
- organization or institution;
- policy, rule, or governance structure;
- information / knowledge system;
- physical / civic / infrastructure system;
- several of these together;
- **I do not know yet.**

`I do not know` is a lawful state.

The interface must never force false precision merely to keep the decision tree moving.

## Step 2 — LOCATE: Where does the difficulty show up?

Use recognizable failure patterns rather than internal theory terms.

Examples:

- Too many exceptions or workarounds.
- Nobody sees the whole system.
- Different groups use the same thing to mean different things.
- Fixing one problem creates another somewhere else.
- Responsibility disappears at handoffs.
- Documentation, policy, and actual operation disagree.
- The system works only because specific people remember what the representation forgot.
- Information is abundant but trustworthy conclusions are difficult to recover.
- The normal path works; edge cases fail badly.
- The system is difficult to change without breaking something unrelated.
- We know something is wrong but cannot yet locate it.
- Something else.

The internal system may translate these into Boundary First structures later.

The visitor should not need to perform that translation.

## Step 3 — PRESERVE: What absolutely must remain true?

Candidate invariant prompts:

- people / safety;
- legal or regulatory obligations;
- operational continuity;
- existing functionality;
- historical records / institutional memory;
- privacy / security;
- accessibility;
- public accountability;
- contractual obligations;
- critical relationships or handoffs;
- a user-specified invariant.

This question is a major BFUX differentiator.

A change request without preserved invariants is not yet a sufficiently bounded intervention.

## Step 4 — EVIDENCE: What exists already?

Candidate evidence types:

- working software or system;
- source code;
- diagrams / architecture docs;
- policies / rules / contracts;
- datasets;
- reports;
- incident records / tickets;
- dashboards / metrics;
- user complaints or support history;
- screenshots / recordings;
- people who operate the system;
- domain experts;
- research / literature;
- no formal evidence yet.

This is not a completeness gate.

It is a state description.

## Step 5 — Desired change

Ask:

> **What would a meaningfully better state look like?**

Candidate responses may include:

- understand what is actually happening;
- reduce failure / risk;
- repair a broken process;
- modernize or replace a system;
- make responsibility / authority clearer;
- improve maintainability;
- make the system easier to use;
- make knowledge / evidence trustworthy;
- prepare for a consequential decision;
- test whether an idea is viable;
- not sure yet.

---

# Problem classes and response classes

The guided intake should build a reusable **problem-response grammar**.

The exact taxonomy should remain evolvable, but the public site should be able to state patterns like:

| Observed problem class | Typical first response |
| --- | --- |
| Representation overload / collapsed distinctions | Representation or ontology reconstruction |
| Cross-boundary failure / handoff defect | Boundary First Systems Audit |
| Inherited or brittle system | System reconstruction / architecture recovery |
| Agency / responsibility / contestability gap | Agency & Representation Audit |
| Evidence / provenance overload | Knowledge / provenance audit; governed continuity tooling |
| Complex workflow / hidden state / non-happy-path failure | Boundary First UX / workflow reconstruction |
| Bounded implementation defect with clear invariants | Scoped engineering intervention |
| Unclear or unstable problem boundary | Discovery / reconstruction before solution selection |
| Unvalidated hypothesis | Research / testbed / bounded experiment |
| Complementary expertise is the primary need | Collaboration route |
| Required authority lies outside BFL | Domain expert / partner / referral |
| Evidence is insufficient for responsible action | Evidence-building / no intervention yet |

This table is not merely an internal routing mechanism.

It is part of the public value of the interface.

The visitor should be able to learn:

> **This class of problem normally begins with this class of response.**

---

# The critical output: a user-visible problem-response state

The wizard must not end with:

> Thanks. We received your message.

It should return a structured result.

Working names:

- **Boundary Receipt**
- **Problem Map**
- **Problem-Response Record**
- **Routing Record**
- **System Intake Result**

Preferred working internal object name:

`ProblemResponseReceipt`

Preferred public language can remain simpler:

> **Your problem map**

The core design law is:

> **If the system classified the user, the user is entitled to see the classification, the evidence used, the uncertainty retained, and the response that follows.**

---

# Proposed receipt structure

Example:

```text
BOUNDARY FIRST — YOUR PROBLEM MAP

You brought us:
A legacy software system that is difficult to change.

We classified it as:
Cross-boundary inherited-system failure

Primary signals:
- operational knowledge is distributed across code, people, and exceptions;
- changes create consequences outside the component being modified;
- responsibility becomes unclear at handoffs;
- existing behavior must be preserved during intervention.

Problem class:
SYSTEM RECONSTRUCTION / ARCHITECTURE

Proposed first response:
BOUNDARY FIRST SYSTEMS AUDIT

Why:
The immediate problem is not yet "rewrite the software."
The first task is to reconstruct what the existing system represents,
what must remain invariant, and where consequential boundaries are failing.

Likely outputs:
- system map;
- dependency / boundary map;
- invariant register;
- failure / exception atlas;
- repair options;
- recommended next intervention.

Unresolved:
- regulatory ownership boundary;
- availability of production evidence.

What would change this classification:
Evidence that the system is already adequately represented and the
remaining defect is isolated to a bounded implementation problem.

Future heuristic:
If you encounter this class of problem again, begin with system
reconstruction before selecting a rewrite or implementation strategy.
```

---

# Receipt schema

Candidate state object:

```text
receipt_id
receipt_version
created_at
source_route
visitor_intent
object_class
problem_class
classification_fit
observed_signals[]
invariants[]
evidence_present[]
evidence_missing[]
unknowns[]
proposed_response_class
proposed_bfl_surface
why_this_route
alternative_routes[]
disconfirming_conditions[]
next_actions[]
future_heuristic
privacy_mode
share_mode
provenance
```

The user-visible projection should omit private internal triage fields.

The internal intake projection may add:

```text
triage_status
assigned_lane
reviewer
capacity_state
risk_flags
authority_requirements
partner_requirements
response_commitment
internal_notes
```

Both projections should derive from the same underlying intake state rather than becoming independent records that drift.

---

# Classification uncertainty must remain visible

Do not present a route as certainty merely because the interface needs an answer.

Example:

```text
Classification: Cross-boundary system reconstruction
Fit: Strong
Unresolved: Regulatory ownership boundary
Proposed response: Systems Audit
Alternative if X is true: Domain-specialist review first
```

Possible public fit states:

- strong fit;
- plausible fit;
- weak / provisional fit;
- insufficient evidence;
- multiple competing classes.

The user should be able to see unresolved distinctions.

---

# RETAIN: make the result portable

The result should be useful even if the visitor never hires, funds, or collaborates with BFL.

Candidate actions:

- copy result;
- print / save as PDF through normal browser facilities;
- email result to self or team;
- share a privacy-safe link if explicitly opted in;
- continue into a BFL inquiry with the state attached;
- restart or revise prior answers;
- compare an updated result after new evidence is added.

Future versions may support a durable account/history, but v1 should not require identity or an account merely to receive the classification.

A BFL engagement should leave the actor with a more usable model of their own system, not merely with an answer produced by ours.

---

# Why this is Boundary First UX

The public wizard is intentionally simpler than the Lab Machine.

Boundary First UX does **not** mean showing every boundary at once.

It means:

> **Show the distinctions the actor needs at the moment they need them, preserve the state already established, and expose consequential transformations instead of hiding them.**

The UI can therefore remain extremely simple:

- one primary question per screen;
- four to eight ordinary-language choices;
- one short line explaining why the question matters;
- visible Back / Continue controls;
- a small persistent path/state strip;
- a lawful `I do not know` / `Other` state;
- no requirement to learn BFL vocabulary before using BFL machinery.

Candidate persistent path indicator:

```text
YOUR PATH
Difficult system -> Software -> Cross-team handoffs -> Preserve operations
```

The Lab Machine **shows the machine**.

The guided intake **lets someone use the machine**.

These are two projections of the same BFUX system.

---

# Public and internal transformation law

The complete flow should be inspectable:

```text
USER DESCRIPTION
      ↓
PRESERVED DISTINCTIONS
      ↓
PROBLEM CLASS
      ↓
ADMISSIBILITY / EVIDENCE CHECK
      ↓
RESPONSE CLASS
      ↓
PROPOSED INTERVENTION
      ↓
USER-VISIBLE RECEIPT
      +
INTERNAL ROUTING OBJECT
```

Do not silently implement:

```text
customer says X -> hidden sales tag Y
```

Prefer:

```text
You told us X.
We distinguished A, B, and C.
That makes this most consistent with class Y.
Problems in class Y normally begin with response Z.
Here is why.
Here is what remains uncertain.
Here is what would change the classification.
```

---

# B2B portfolio refresh

The enterprise surface already exists in prior public-shell work, especially `/business` and `/work`.

The older enterprise presentation contains useful scaffolding but some of its language is too consultancy-generic:

- Risk Mitigation
- Performance Scaling
- Strategic Alignment

These are not false, but they discard the specificity now available in the Lab's evidence and methods.

The refreshed B2B portfolio should instead organize around **recognizable problem classes, bounded response classes, concrete artifacts, and proof**.

## Suggested B2B capability families

### 1. Software & Systems Engineering

Typical problems:

- inherited systems nobody wants to change;
- architecture drift;
- distributed state and dependency failures;
- modernization under continuity constraints;
- integration and data-boundary defects;
- observability / maintenance gaps.

Possible responses:

- system reconstruction;
- architecture review;
- modernization plan;
- scoped implementation;
- prototype / vertical slice;
- observability and repair instrumentation.

### 2. Consequence-Bearing Systems

Typical contexts:

- public infrastructure;
- healthcare software;
- regulated environments;
- eligibility / access / classification systems;
- systems where local optimization exports consequence elsewhere.

Possible responses:

- Systems Audit;
- Agency & Representation Audit;
- consequence map;
- contest / repair path analysis;
- governance / authority boundary reconstruction.

### 3. Knowledge & AI Infrastructure

Typical problems:

- information growth without governed continuity;
- provenance loss;
- contradictory artifacts;
- AI output without durable evidence structure;
- research / knowledge operations that cannot reconstruct why a conclusion exists.

Possible responses:

- knowledge architecture;
- provenance / evidence audit;
- governed memory / continuity tooling;
- agentic workflow design;
- Corpus Forge / workbench-derived implementations where appropriate.

### 4. Boundary First UX & Workflow Engineering

Typical problems:

- complex workflows;
- hidden state;
- interfaces optimized for the happy path;
- users forced to reconstruct system context;
- non-happy-path users losing agency at boundaries.

Possible responses:

- workflow reconstruction;
- state / transition mapping;
- decision-tree / wizard interfaces;
- accessibility / exception-path review;
- operator-facing instrumentation.

### 5. Research, Testbeds, and Technical Due Diligence

Typical problems:

- a hypothesis is interesting but not yet operationally bounded;
- representation quality is uncertain;
- evidence conflicts;
- a new technical direction needs a test environment rather than a sales claim.

Possible responses:

- bounded research program;
- literature / evidence reconstruction;
- testbed design;
- falsification criteria;
- prototype / experiment;
- technical review.

---

# B2B portfolio evidence grammar

Do not present only a list of capabilities.

Each market-facing capability should show:

```text
Problem class
-> Why it is difficult
-> BFL response class
-> Inputs required
-> Artifacts / deliverables
-> Evidence / prior work
-> Limits / authority boundary
-> Next action
```

Candidate proof objects include, where the underlying public evidence supports them:

- CityWatch / Augusta-Richmond County civic systems delivery;
- consequence-bearing / institutional audit methods;
- healthcare imaging and complex-domain software work;
- inherited enterprise software / integration / cloud work;
- Corpus Forge / continuity / governed knowledge machinery;
- Boundary First UX implementations;
- current Systems Audit package;
- published software engineering methods.

Do not use a prior project as proof for a claim it does not support.

The evidence surface should preserve historical / current, client / independent, shipped / research, and founder / Lab distinctions.

---

# Relationship between the wizard and the B2B portfolio

The B2B portfolio should not merely say:

> Here are eight services.

It should let a visitor recognize themselves:

> **Here are recurring classes of problems we know how to distinguish, the response patterns we use, the artifacts we produce, and the evidence behind those responses.**

The guided intake then operationalizes that portfolio.

```text
B2B PORTFOLIO
problem classes + response classes + evidence
             ↓
GUIDED INTAKE
visitor describes actual state
             ↓
CLASSIFICATION
problem class + uncertainty
             ↓
PROPOSED RESPONSE
service / research / collaboration / referral
             ↓
BOUNDARY RECEIPT
portable user-visible understanding
```

The portfolio explains the grammar.

The wizard applies the grammar.

The receipt gives the grammar back to the user in their specific case.

---

# Integration with the four public interface facets

The simplified wizard should be a shared orientation layer, not a mechanism that collapses all public intents into one schema.

Top-level intents may share visual components and state infrastructure while retaining typed payloads such as:

```text
DIFFICULT_SYSTEM_INTAKE
PUBLIC_INFRASTRUCTURE_NOMINATION
BFL_CRITIQUE
COLLABORATION_INQUIRY
WORK_HISTORY_GOALS_INTAKE
FUNDING_SUPPORT_INQUIRY
```

Each branch gets its own lawful questions, evidence requirements, privacy boundary, response expectation, and routing rules.

The shared pattern is:

```text
orient -> preserve distinctions -> classify -> explain -> route -> return state
```

---

# Governance constraints before launch

A stored or submitted intake must define:

- privacy and retention policy;
- confidential-material boundary;
- PII handling;
- publication consent;
- attachment handling;
- abuse / moderation controls;
- response-capacity expectations;
- legal / medical / financial / safety authority boundaries where relevant;
- relationship / endorsement non-equivalence;
- deletion / correction path where applicable;
- internal routing authority;
- provenance and versioning of the classification rules.

Do not introduce a CRM or server-side intake database merely because a conventional marketing funnel expects one.

The state model and governance boundary should be designed first.

A first release may preserve the existing context-aware email handoff while still generating the user-visible receipt locally / client-side, provided no false persistence guarantee is made.

---

# Implementation proposal

## P0 — recover and reconcile prior work

- [ ] Treat `14_bring_us_your_difficult_system_problem_intake.md` as an active ancestor, not stale duplicate work.
- [ ] Diff the historical `/inquire`, `/business`, `/work`, Agency Audit CTA, and current public surface.
- [ ] Identify which older BFUX laws remain valid and which content assumptions are stale.
- [ ] Preserve the newer four-facet typed-intake grammar from the Lab source.

## P0 — define problem-response state model

- [ ] Define `ProblemResponseReceipt` schema.
- [ ] Define public vs internal projections of the same state.
- [ ] Define initial public problem-class taxonomy.
- [ ] Define response-class taxonomy.
- [ ] Define fit / uncertainty states.
- [ ] Define disconfirming-condition representation.
- [ ] Define `I do not know` / unresolved-state handling.

## P0 — guided intake prototype

- [ ] Build simple wizard shell with one question at a time.
- [ ] Preserve reversible state between steps.
- [ ] Show compact current-path indicator.
- [ ] Implement difficult-system path first.
- [ ] Produce a complete user-visible result without requiring submission.
- [ ] Allow result revision when the user changes prior answers.

## P1 — B2B portfolio refresh

- [ ] Replace generic consultancy categories with problem / response / artifact / evidence structure.
- [ ] Assemble canonical capability families.
- [ ] Select a small set of evidence-bearing case studies.
- [ ] Connect each capability to the guided intake.
- [ ] Connect each classified result back to the relevant portfolio evidence.
- [ ] Preserve explicit limits and authority boundaries.

## P1 — typed public branches

- [ ] Add Public Infrastructure Analysis path.
- [ ] Add Critique BFL path.
- [ ] Add Collaboration path.
- [ ] Add Work / History / Goals path.
- [ ] Add Support / Fund path only after its information and governance needs are bounded.

## P1 — submission and routing

- [ ] Attach the completed receipt state to any user-authorized inquiry.
- [ ] Preserve source / topic / record / intent where available.
- [ ] Do not ask the user to re-enter state already captured by the wizard.
- [ ] Route into typed internal queues without silently changing public classification.
- [ ] Record any later reclassification as a state transition, not an overwrite without explanation.

## P2 — durable receipts

- [ ] Add copy / share / print-friendly representation.
- [ ] Consider optional privacy-safe permalink.
- [ ] Consider version comparison after new evidence is added.
- [ ] Consider anonymous aggregate learning from problem classes only after privacy, consent, and governance are explicit.

---

# Success criteria

The refreshed interface succeeds when a cold visitor can truthfully say:

1. **I knew how to begin without learning Boundary First terminology.**
2. **The interface did not force me to pretend I knew what kind of problem I had.**
3. **I could see the state the system had inferred from my answers.**
4. **I received a comprehensible problem class, not merely a hidden routing tag.**
5. **I could see why that class was proposed.**
6. **I could see what remained uncertain.**
7. **I could see what would change the classification.**
8. **I received a proposed response class and concrete next step.**
9. **I learned what response normally applies if I encounter this problem class again.**
10. **I could keep the result even if I chose not to contact BFL.**
11. **If I did contact BFL, I did not have to restate the context I had already provided.**
12. **The B2B portfolio showed recognizable problem classes, evidence, artifacts, and limits rather than generic consultancy claims.**
13. **Referral, insufficient evidence, and no-intervention-yet remained valid outcomes.**
14. **The simple interface still behaved as a genuine Boundary First system.**

---

# Compact synthesis

The next public interface should not ask the visitor to understand the Lab before the Lab is willing to understand the visitor.

The simplified Boundary First UX pattern is:

> **Tell us what is happening. We will preserve the distinctions, reconstruct the problem boundary, show you the class of problem we think you have, explain the response that normally follows, expose the uncertainty, and give that state back to you.**

This turns intake from a sales endpoint into an educational and operational artifact.

The commercial value is still real: appropriate problems can route into audits, engineering, research, products, or collaborations.

But the deeper contract is stronger:

> **A Boundary First engagement should leave the actor with a more usable model of their own system, not merely with an answer produced by ours.**

That is the public BFUX demonstration.
