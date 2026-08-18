# Boundary First UX
## Content, Navigation, Governance, and Collaboration Guide
### Version 0.6 — paired with `nodes_boundary_theory_reorganized_v0_3.json`

**Status:** implementation-guidance draft paired to canonical webpage content  
**Canonical content source:** `nodes_boundary_theory_reorganized_v0_3.json`  
**Primary institutional node:** `identity`  
**Identity content version:** `4.17.0`

---

## 1. Purpose

Boundary First UX is the presentation pattern through which Boundary First Labs makes a large, typed, consequence-bearing body of work progressively legible.

> **Boundary First UX is a multi-scale information architecture for revealing what an object is, how it relates, what governs it, what it affects, how it earns authority, and how it may be challenged or repaired—without requiring the user to comprehend the whole system at once.**

This guide restores the original pairing between:

1. the canonical webpage content JSON; and
2. the Mermaid/Markdown interaction and presentation guide.

The content graph and the UX guide have different authority:

- **The JSON says what the public content currently is.**
- **The guide says how that content should be encountered and navigated.**

The guide may sequence, group, summarize, and project canonical material. It may not silently:

- rewrite a canonical statement;
- promote a proposed policy into an adopted one;
- turn an aspiration into evidence of operation;
- convert a collaboration into endorsement;
- convert lineage into authority;
- convert a project into a maintained product;
- or publish reserved research substance that has not passed its own review.

---

# Part I — The paired institutional object

## 2. Canonical public identity

The `identity` node now defines Boundary First Labs as:

> **An applied public-interest research institute operating publicly under the moniker “Lab.”**

The public moniker does not narrow the institute to experimental research alone. It maintains an orientation toward:

- lawful consequence;
- contact with reality;
- experiment;
- observation;
- testing;
- public use;
- and repair.

The institute’s present operating reality is:

> **A founder-led, AI-enabled micro-lab producing its first public products, publications, methods, and introductions.**

Its medium institutional aim is:

> **To become a self-sufficient public-interest steward capable of maintaining the research, products, publications, evidence, criticism, and repair obligations it places into public use.**

### Canonical source paths

```text
identity.institution
identity.institutionalStage
identity.mission
identity.vision
identity.founderAndInstitution
identity.goals
```

### UX requirement

The interface must show these as staged realities rather than compressing them into one heroic institutional claim:

```text
Present fact
→ near-term operating aim
→ medium-term stewardship aim
→ bounded long horizon
```

The present page must not visually imply that multi-person governance, institutional independence, or self-sufficient stewardship already exists.

---

## 3. Mission, method, and maxims

The canonical mission is:

> **Make consequential systems more legible, governable, accountable, and repairable.**

The operational method line is:

> **Declare the boundary. Preserve the invariant. Expose the defect. Restore the path to repair.**

The preferred institutional maxim is:

> **One method. One living system. Many boundaries to repair.**

The strategic companion maxim is:

> **Our roots must balance our branches.**

These should not be presented as interchangeable statements.

| Content kind | Function in the UX |
|---|---|
| Mission | What the institute is presently organized to do |
| Method | How it begins examining or changing a system |
| Maxim | Memorable orientation without direct procedural force |
| Vision | The future condition toward which the institute works |
| Policy | A declared institutional permission, prohibition, or gate |

### Canonical source paths

```text
identity.mission
identity.vision
identity.operatingGuidelines
identity.manifesto
```

---

## 4. Institutional covenant taxonomy

The webpage content now contains an adjudicated classification of nine high-salience statements.

### Maxims

- **One method. One living system. Many boundaries to repair.**
- **Our roots must balance our branches.**

### Principles

- **No consequence without representation.**
- **Responsibility must land.**
- **Repair is infrastructure.**

### Design doctrines

- **No hidden human shock absorbers.**
- **No undeclared “we.”**

### Policies

- **AI may assist but may not become the location where responsibility disappears.**
- **No product without stewardship and closure.**

### Canonical source path

```text
identity.operatingGuidelines
```

### UX requirement

The interface must visibly preserve the category. A maxim should not look like a policy. A policy should not look like a proven operating capability.

Every institutional statement card should support:

```text
Type
Statement
Summary
Scope
Binding status
Operational status
Owner
Evidence of operation
Known defect
Review or replacement history
```

The current JSON establishes classification but does not establish complete formal adoption, ownership, implementation, or audit records. Missing fields must remain visibly missing.

---

# Part II — Boundary First UX principles

## 5. Progressive distinction

Introduce only the distinctions required for the user’s present task.

The first encounter should not require the user to understand:

- the full theoretical hierarchy;
- every applied domain;
- every work entity;
- every policy;
- or every historical lineage.

The interface progressively teaches its legend.

## 6. Typed objects

The system must preserve visible distinctions among:

- institution;
- formal object;
- theory;
- theoretical facet;
- discipline;
- formal apparatus;
- method;
- practice;
- program;
- project;
- product;
- product family;
- artifact;
- service;
- testbed;
- policy;
- principle;
- design doctrine;
- evidence;
- lineage source;
- collaborator role.

Color alone must never carry these distinctions.

## 7. Preserved context

A user who dives into a node, relation, work item, policy, lineage card, or collaboration record should be able to return to the exact prior state.

Preserve:

- selected path;
- camera position;
- active filters;
- pinned entities;
- comparison state;
- open relation;
- sequence progress.

## 8. Semantic zoom

The same union graph should expose different detail at different scales.

```text
Far
Institution · theories · programs · domain families

Middle
Facets · projects · products · policies · collaboration modes

Near
Claims · artifacts · releases · evidence · roles · obligations · relations
```

## 9. Status firewalls

The interface must preserve at least four distinct status systems.

### Institutional force

```text
Descriptive
Aspirational
Declared principle
Declared commitment
Proposed policy
Adopted
Operationalized
Audited
Under revision
Superseded
Withdrawn
```

### Research maturity

Use the domain-specific claim and evidence fields already present in each node. Do not infer one universal research ladder.

### Work lifecycle

Projects and products retain their separate statuses and lifecycle stages.

### Collaboration lifecycle

```text
Inquiry
Fit review
Scoped
Active
Under review
Released
Continued
Paused
Completed
Closed
Withdrawn
```

No visual similarity should allow these systems to collapse into one another.

## 10. Consequence-aware navigation

From any consequential claim, product, project, policy, publication, or collaboration, the interface should be able to answer:

1. What kind of object is this?
2. What is it authorized to claim or do?
3. What boundary applies?
4. What must it preserve?
5. What evidence allowed it to advance?
6. Who is responsible?
7. Who is affected?
8. Who may contest it?
9. What happens when it fails?
10. Who can correct, replace, withdraw, transfer, or retire it?

---

# Part III — Navigation architecture

## 11. The eight complementary projections

Boundary First UX now uses eight primary projections over one typed union graph.

| Projection | User question |
|---|---|
| Guided Sequence | What should I understand next? |
| Atlas | Where does this sit in the whole? |
| Context Halo | What is locally related through its facets? |
| Lineage Lens | What established work does this inherit or answer to? |
| Work & Evidence | What is being built, released, tested, or maintained? |
| Institutional Closure Map | How does the lab bind its own power and obligations? |
| Collaboration Path | How may people enter, influence, test, build, and leave the work? |
| Node / Record Detail | What exactly does this object contain? |

These are projections of one system, not separate websites.

---

## 12. Guided first passage v0.6

The canonical first passage should now use fifteen scenes.

### Scene 0 — The problem

**Every consequential system draws a boundary.**

Introduce excluded consequence, hidden defect, and the need for representation.

### Scene 1 — Boundary First

Introduce:

- boundary;
- invariant;
- defect;
- repair.

### Scene 2 — The roots

Introduce the source traditions:

- information;
- computation;
- practical mechanics;
- physics;
- mathematics;
- scientific method.

### Scene 3 — The synthesis

Introduce:

- agentic computation;
- research methods;
- formal grammar;
- Agile and Lean practice;
- systems engineering.

### Scene 4 — Lived convergence

Show professional software practice and independent research meeting around recurring representation and closure failures.

### Scene 5 — On-ramps

Offer familiar doors such as:

- chess;
- soccer;
- software;
- maps and models;
- institutions;
- geometry;
- physical boundaries.

### Scene 6 — Distinction Space

Introduce the central formal object before the full theory.

### Scene 7 — Boundary Theory

Place Distinction Theory, Admissibility Theory, and Emergence Theory around Distinction Space.

### Scene 8 — Representational Mechanics

Present the discipline and Formal Grammars as its explicit apparatus.

### Scene 9 — Choose a path

Offer pathway families rather than an undifferentiated node wall.

### Scene 10 — The work takes form

Differentiate:

- programs;
- projects;
- products;
- artifacts;
- services;
- testbeds.

### Scene 11 — The work enters relation

Introduce collaboration as bounded co-development.

Core statement:

> **Boundaries are not barriers to collaboration; they are the conditions that make collaboration coherent.**

Show that participation, advice, review, funding, contribution, authorship, ownership, endorsement, and institutional authority are distinct relations.

### Scene 12 — Work earns promotion

Show evidence, criticism, negative cases, correction, release, and domain-specific promotion gates.

### Scene 13 — The institution binds itself

Introduce the institutional covenant and closure map:

```text
Purpose
→ Invariants
→ Authority
→ Gates
→ Standing
→ Repair
→ Continuity
```

### Scene 14 — Atlas reveal

Pull back to the complete typed graph. The user arrives with the legend already learned.

---

## 13. The “How the Lab Operates” pathway

Public title:

> **Purpose, Power, and Repair**

Sequence:

```text
Why the lab exists
→ what it presently is
→ what it works to preserve
→ who may decide
→ how claims and products advance
→ how people participate
→ how collaboration is bounded
→ how criticism lands
→ how failure is repaired
→ how obligations continue or close
```

Primary canonical sources:

```text
identity.institution
identity.institutionalStage
identity.mission
identity.vision
identity.manifesto
identity.governance
identity.institutePolicy
identity.publicationAdmissibility
identity.evidenceArchitecture
identity.participation
identity.collaboration
identity.portfolioGovernance
identity.founderAndInstitution
identity.goals
```

---

## 14. Collaboration pathway

Public title:

> **Collaborate Through Declared Boundaries**

Compact content:

> Collaborate through declared roles, bounded authority, visible contribution, preserved disagreement, fair attribution, evidence, stewardship, and closure.

### Lifecycle

```text
Inquiry
→ Fit & Boundary Review
→ Scoped Agreement
→ Active Collaboration
→ Review & Evidence
→ Release or Promotion Decision
→ Stewardship or Closure
```

### Collaboration modes

The UX should expose the nine canonical modes:

1. Research & Formalization
2. Independent Review & Criticism
3. Pilot & Testbed
4. Software & Product Co-development
5. Case, Data & Artifact Contribution
6. Advisory & Domain Expertise
7. Education & Facilitation
8. Institutional & Distribution Partnership
9. Funding & Public-interest Support

### Role classes

The UX should distinguish the ten canonical roles:

- Program Steward
- Research Collaborator or Co-author
- Domain Advisor
- Independent Reviewer or Critic
- Pilot Partner or Participant
- Builder or Maintainer
- Affected-party or Local-knowledge Contributor
- Partner Institution
- Sponsor or Funder
- Data, Media, or Material Rights Holder

### Public collaboration record

A public card should expose enough information to avoid misleading implication while protecting confidential or restricted detail.

Minimum public fields:

```text
Mode
Status
Purpose
Scope
Roles
Authority
Outputs
Evidence
Claim ceiling
Attribution
Material conflicts
Publication status
Stewardship
Closure
```

### Collaboration non-equivalences

The UI should state plainly:

```text
Participation ≠ authorship
Advice ≠ approval
Review ≠ endorsement
Funding ≠ epistemic authority
Contribution ≠ ownership
Access ≠ publication right
Partnership ≠ institutional office
Release ≠ promotion to canon
```

### Evidence rule

Collaboration earns institutional value by placing work under:

- use;
- criticism;
- comparison;
- failure;
- repair.

It does not earn authority by name, prestige, funding, or proximity.

---

# Part IV — Local and graph interaction

## 15. Context Halo

The Context Halo remains the mesoscopic layer between the atlas and the node record.

Layers:

```text
Center object
Facet ring
Close relation band
Domain horizon
```

Encodings:

| Visual property | Meaning |
|---|---|
| Angle | Facet affinity |
| Radius | Structural distance |
| Hue family | Domain family |
| Shape | Entity type |
| Edge weight | Relationship strength |
| Edge style | Relationship type |
| Opacity | Interaction prominence |

New filters should include:

```text
Domains
Work
Evidence
Lineage
Governance
Collaboration
```

### Collaboration mode in the halo

With `Collaboration` active:

- collaborator roles appear as typed relation nodes or records;
- active or historical collaborations appear near the relevant facet, project, product, or artifact;
- authority, authorship, review, funding, maintenance, and rights remain separate edges;
- confidential content remains hidden behind the visibility boundary;
- closure status remains visible.

## 16. Lineage Lens

Historical context remains works-first rather than personality-first.

Each lineage record should answer:

1. What did the work establish?
2. Why does it matter here?
3. How is it used or compared?
4. What is not being claimed?
5. What is the citation status?

Required global non-claim:

> These references identify foundational works, inherited formalisms, neighboring research traditions, and critical comparisons. They do not imply endorsement, equivalence, direct succession, or validation of Boundary First Labs.

## 17. Work and evidence

The type grammar remains:

```text
Concept / theory / domain     circle
Program                       rounded rectangle
Project                       rectangle with progress edge
Product                       hexagon
Product family                stacked hexagons
Artifact                      diamond
Service                       parallelogram
Testbed                       dashed hexagon
```

The policy **No product without stewardship and closure** should be visible in product detail surfaces.

A product card should not display a maintained or available state without:

- named steward;
- maintenance path;
- support boundary;
- funding path;
- correction process;
- retirement, transfer, or open-release condition.

## 18. Governance lens

The governance lens should expose relations such as:

```text
authorizedBy
boundBy
reviewedUnder
stewardedBy
fundedBy
contestableBy
affectedBy
correctedBy
withdrawnBy
retiredBy
succeedsTo
```

It should work from any:

- claim;
- policy;
- project;
- product;
- publication;
- service;
- collaboration;
- artifact.

---

# Part V — Institutional and collaboration components

## 19. Institutional statement card

Required fields:

```text
Statement
Primary category
Secondary role
Scope
Classification status
Binding status
Operating status
Source
Owner
Evidence of operation
Known defects
Review date
Replacement history
```

Current fallback:

> **Classification adjudicated; binding force requires formal adoption and operational support.**

## 20. Institutional stage card

The identity page should expose:

```text
Formation-stage
Applied public-interest research institute
Founder-led, AI-enabled micro-lab
Open Collective registration present
Domain secured
Independent multi-person governance not yet established
Self-sufficient stewardship not yet established
```

This is not a weakness to hide. It is the truthful operating boundary.

## 21. Collaboration mode card

Required fields:

```text
Mode
Purpose
Typical outputs
Eligible roles
Required records
Evidence expectations
Promotion boundary
Closure conditions
Primary action
```

## 22. Collaboration record card

Required public shell:

```text
COLLABORATION · STATUS
Title
Purpose and public-value thesis
Scope and exclusions
Parties and declared roles
Authority and decision rights
Outputs and current gate
Evidence and limitations
Attribution and conflicts
Publication status
Stewardship and closure
```

The first click should reveal context. Explicit actions should handle:

- open record;
- view related work;
- view evidence;
- view rights and attribution;
- propose criticism;
- view closure.

## 23. Participation entry cards

The canonical participation pathways should remain distinct from collaboration modes.

Participation cards answer:

> How may I enter?

Collaboration cards answer:

> Under what declared relationship will the work proceed?

The participation path `build-collaboratively` should route into `identity.collaboration` rather than duplicating collaboration rules.

## 24. Quote bank

The quote bank may power a rotating slide or quiet transition surface.

Rules:

- distinguish user-originated, institutional, historical, and assistant-developed candidate language;
- do not present a quote-bank line as adopted policy;
- do not use long-horizon rhetoric to inflate current institutional maturity;
- link a selected quote to its relevant node or essay, not automatically to the mission statement.

---

# Part VI — Conventional and Boundary First views

## 25. One content source, two public projections

The same canonical records should support:

### Conventional view

```text
About
Mission
Vision
Values
Governance
Policies
Research Integrity
Publications
Participation
Collaboration
Projects
Products
Corrections
Stewardship
Goals
Contact
```

### Boundary First UX

```text
Purpose
→ Invariants
→ Authority
→ Admissibility and gates
→ Work and relation
→ Evidence
→ Standing
→ Repair
→ Continuity
```

The standard format is not a lesser interface. It supports:

- accessibility;
- citation;
- printing;
- search;
- legal and professional review;
- institutional comparison;
- users who need a direct answer.

The Boundary First projection supplies mechanical and relational context.

---

# Part VII — Accessibility, mobile, and safety

## 26. Accessibility

The UX must not rely on:

- color alone;
- hover alone;
- spatial memory alone;
- motion alone;
- dense graph literacy;
- specialized theoretical language without definitions.

Every graph projection needs:

- keyboard navigation;
- list or table equivalent;
- persistent focus state;
- text relation labels;
- reduced-motion mode;
- screen-reader ordering;
- high-contrast rendering;
- direct conventional-page route.

## 27. Mobile behavior

On narrow screens:

- radial and horizon views become grouped lists or horizontal scrollers;
- filters remain explicit;
- selected context becomes a persistent bottom sheet;
- hover contracts become focus and tap contracts;
- pin state survives panel changes;
- collaboration and governance relations are grouped by type;
- the conventional view is always available.

## 28. Confidentiality and visibility

The collaboration framework defines a visibility boundary.

Public records should expose enough scope, role, funding, evidence, and authority to avoid misleading implication. They should not expose:

- protected participant information;
- confidential partner material;
- safeguarding details;
- restricted research;
- unpublished claims;
- private contractual data;
- security-sensitive operations.

The UX should display an explicit protected-field marker rather than pretending the missing field does not exist.

---

# Part VIII — Content pairing and implementation

## 29. Canonical field order for the identity node

Use the canonical `institutionalSectionsOrder`:

```text
identity
founding-rationale
history-and-lineage
mission
vision
manifesto
governance
institute-policy
publication-admissibility
evidence-architecture
participation
collaboration
portfolio-governance
founder-and-institution
goals
```

The Boundary First projection may traverse these nonlinearly, but the conventional detail page should preserve this order unless the content model itself is revised.

## 30. Reserved-content boundary

This guide does not elaborate the substantive programs referred to elsewhere as:

- Self-Improving Representations;
- Agentic Scientific Method.

Those subjects require separate development and review.

The public UX may use only the bounded long-horizon language already present in:

```text
identity.vision.longHorizon
```

No scene, quote, node, or pathway should imply that these programs are already public, formalized, validated, or available.

## 31. Implementation order

1. Bind the guide to `nodes_boundary_theory_reorganized_v0_3.json`.
2. Render identity stage, mission, vision, and operating guidelines from canonical fields.
3. Add statement-type and binding-status components.
4. Restore the fifteen-scene first passage.
5. Add `Collaboration` to the Context Halo and Atlas filters.
6. Build participation-to-collaboration routing.
7. Build collaboration mode and record cards.
8. Bind governance relations to work, evidence, and collaboration records.
9. Preserve conventional pages from the same source fields.
10. Add field-level provenance and replacement history as those records become available.

## 32. Acceptance criteria

The pair is correctly implemented when:

- no institutional statement is presented at a stronger status than the JSON supports;
- mission, method, maxim, principle, doctrine, and policy remain distinguishable;
- the current founder-led micro-lab is not visually presented as a mature independent institute;
- the public institutional form is not reduced to product studio or venture identity;
- the collaboration lifecycle is inspectable;
- roles, authority, authorship, review, funding, and ownership are not conflated;
- work may be navigated through theory, evidence, governance, and collaboration;
- hidden or restricted detail remains visibly bounded rather than silently omitted;
- products expose stewardship and closure;
- historical lineage does not confer authority;
- reserved long-horizon research is not prematurely released;
- every graph view has an accessible conventional equivalent.

---

## 33. Compact design doctrine

> **Teach the legend before revealing the atlas. Preserve distinctions while moving between scales. Show authority, consequence, evidence, and repair at the point where they matter. Let every user enter through a legible boundary—and leave without losing context, rights, provenance, or obligation.**
