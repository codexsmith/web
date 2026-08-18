# Boundary First Labs Introductory Experience
## Mermaid Diagrams, Work-Layer Views, Context Halos, and Wireframes v0.3

**Status:** implementation-guidance draft  
**Supersedes:** `bfl_introductory_experience_mermaid_wireframes_v0_1.md` for presentation configuration; it does not supersede the canonical node data.  
**Purpose:** extend the guided experience with differentiated work entities and a mesoscopic Context Halo for facet-level navigation into the wider corpus.

## 1. Governing architecture

One union graph is exposed through multiple projections. The conceptual graph remains canonical; the work and evidence entities are joined through typed relations.

```mermaid
flowchart TB
    CONCEPT[(Canonical Concept Graph)]
    WORK[(Programs · Projects · Products · Services)]
    EVIDENCE[(Artifacts · Releases · Pilots · Testbeds)]
    SEQ[(Sequence and Pathway Overlay)]

    CONCEPT --> UNION[(Typed Union Graph)]
    WORK --> UNION
    EVIDENCE --> UNION
    SEQ --> UNION

    UNION --> RADIAL[Radial]
    UNION --> TREE[Tree]
    UNION --> NODE[Node / Entity Detail]
    UNION --> PATH[Pathway]
    UNION --> WORKVIEW[Work Portfolio]
    UNION --> ATLAS[Atlas]
```

## 2. Type architecture

```mermaid
flowchart TD
    INST[Boundary First Labs\nINSTITUTION]
    THEORY((Theory / Formal Object))
    DISC((Discipline / Method))
    PROGRAM([PROGRAM])
    PROJECT[PROJECT]
    PRODUCT{{PRODUCT}}
    FAMILY{{PRODUCT FAMILY}}
    ARTIFACT{ARTIFACT}
    SERVICE[/SERVICE/]
    TESTBED{{TESTBED}}

    INST --> THEORY
    INST --> DISC
    INST --> PROGRAM
    THEORY -->|informs| PROGRAM
    DISC -->|guides| PROGRAM
    PROGRAM -->|organizes| PROJECT
    PROJECT -->|advances| PRODUCT
    PROJECT -->|advances| FAMILY
    PROJECT -->|produces| ARTIFACT
    PROJECT -->|creates| TESTBED
    PRODUCT -->|supported by| SERVICE
    PRODUCT -->|generates evidence| ARTIFACT
    TESTBED -->|generates evidence| ARTIFACT
    ARTIFACT -->|refines| THEORY
    ARTIFACT -->|refines| DISC
```

### Semantic distinction

- **Program:** a sustained line of inquiry, construction, or public work.
- **Project:** a bounded effort with an objective, scope, milestones, and closure condition.
- **Product:** a maintained thing made available to users with stewardship and retirement obligations.
- **Artifact:** a publication, release, dataset, report, diagram, or other durable witness.
- **Service:** a repeatable professional offering.
- **Testbed:** a bounded environment built to gather evidence.

## 3. Revised first-passage sequence

```mermaid
flowchart LR
    S0[0 Problem]
    S1[1 Boundary First]
    S2[2 Roots]
    S3[3 Synthesis]
    S4[4 Lived Convergence]
    S5[5 On-Ramps]
    S6[6 Distinction Space]
    S7[7 Boundary Theory]
    S8[8 Representational Mechanics]
    S9[9 Choose a Path]
    S10[10 The Work Takes Form\nPrograms · Projects · Products]
    S11[11 Work Earns Promotion\nEvidence · criticism · repair]
    S12[12 Atlas Reveal]

    S0 --> S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8 --> S9 --> S10 --> S11 --> S12
    S10 -->|See what we are building| PROJECTS[Projects]
    S10 -->|See what you can use| PRODUCTS[Products]
    PROJECTS --> S11
    PRODUCTS --> S11
```

### Scene 10 narrative contract

> Projects move the work forward. Products keep selected results available in the world. Artifacts witness what happened. Services repeat a bounded practice. Testbeds expose the work to reality.

The scene must show that a project can produce an artifact without producing a product, and that a product can continue through many projects.

```mermaid
flowchart LR
    PROGRAM[PROGRAM\nBoundary-First Software]
    P1[PROJECT\nPublication pass]
    P2[PROJECT\nWorkbench prototype]
    P3[PROJECT\nExternal pilot]
    A1{ARTIFACT\nField guide}
    PROD{{PRODUCT\nWorkbench}}
    A2{ARTIFACT\nPilot report}

    PROGRAM --> P1
    PROGRAM --> P2
    PROGRAM --> P3
    P1 --> A1
    P2 --> PROD
    P3 --> PROD
    P3 --> A2
```

## 4. Build and Use pathway

```mermaid
flowchart LR
    RM((Representational Mechanics))
    BF((Boundary First))
    BFE((Boundary-First Engineering))
    PROGRAM[PROGRAM]
    PROJECT[PROJECT]
    PRODUCT{{PRODUCT}}
    USE[Public or professional use]
    EVIDENCE{Evidence}
    REPAIR[Revision and repair]

    RM --> BF --> BFE --> PROGRAM --> PROJECT --> PRODUCT --> USE --> EVIDENCE --> REPAIR
    PROJECT -->|may instead produce| EVIDENCE
    REPAIR -.refines.-> RM
    REPAIR -.creates a new project.-> PROJECT
```

## 5. Corpus Forge identity split

The name `Corpus Forge` currently spans several roles. The UI must type each occurrence.

```mermaid
flowchart TD
    M((Corpus Forge\nMETHOD))
    PG([Corpus Forge\nPROGRAM])
    PJ[Agent Pipeline\nPROJECT]
    WB{{Corpus Forge Workbench\nPRODUCT}}
    CEL{{Claim & Evidence Ledger\nPRODUCT}}
    SETUP{Pipeline Setup\nARTIFACT}
    REPORT{Critic Report\nARTIFACT}

    M -->|guides| PG
    PG -->|organizes| PJ
    PJ -->|advances| WB
    PJ -->|advances| CEL
    PJ -->|produces| SETUP
    PJ -->|produces| REPORT
```

## 6. Boundary-First Chess identity split

```mermaid
flowchart TD
    PROGRAM([Boundary-First Chess\nPROGRAM / ON-RAMP])
    EDIT[Digital edition\nPROJECT]
    MANUSCRIPT{Manuscript\nARTIFACT}
    BOOK{{Digital edition\nPRODUCT}}
    SOFTWARE{{Chess software\nPRODUCT FAMILY}}
    LAUNCH[Launch campaign\nPROJECT]

    PROGRAM --> EDIT
    EDIT --> MANUSCRIPT
    EDIT --> BOOK
    PROGRAM --> SOFTWARE
    BOOK --> LAUNCH
```

## 7. Portfolio atlas modes

```text
┌───────────────────────────────────────────────────────────────────┐
│ WORK & PORTFOLIO ATLAS                                            │
│ [ Concepts ] [ Work ] [ Evidence ] [ All ]                        │
│                                                                   │
│ Search __________________  Type ▾  State ▾  Maturity ▾  Domain ▾  │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ○ Representational Mechanics                                    │
│         │                                                         │
│      [PROGRAM] Boundary-First Engineering                         │
│       ├── [PROJECT] Workbench prototype                           │
│       ├── [PROJECT] External pilot                                │
│       └── ⬡ PRODUCT Boundary-First Engineering Workbench          │
│                   └── ◇ ARTIFACT Pilot report                     │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Semantic zoom

- Far: concepts and programs, plus counts such as `4 projects · 2 products`.
- Mid: active projects and maintained/developing products.
- Near: artifacts, milestones, releases, evidence, and relation labels.

## 8. Projects collection

```text
┌──────────────────────────────────────────────────────────────────┐
│ PROJECTS                                                         │
│ Bounded efforts advancing research, products, and public work.   │
│                                                                  │
│ [Active] [Planned] [Review] [Complete] [All]                     │
│ Program ▾  Phase ▾  Participation ▾  Updated ▾                   │
├──────────────────────────────────────────────────────────────────┤
│ PROJECT · ACTIVE · VALIDATION                                    │
│ Corpus Forge Agent Pipeline                                      │
│ Build and test the supervised Operator–Critic workflow.          │
│ Advances: Corpus Forge Workbench · Claim & Evidence Ledger       │
│ Produces: Pipeline specification · critic reports                 │
│ Next gate: first complete vertical slice                          │
│ [Open project] [View outputs] [Follow]                            │
├──────────────────────────────────────────────────────────────────┤
│ PROJECT · ACTIVE · DEFINITION                                    │
│ Boundary First Labs Introductory Experience                      │
│ Build the guided passage, pathway system, and atlas reveal.      │
│ Produces: wireframes · implementation config · work-layer packet │
└──────────────────────────────────────────────────────────────────┘
```

## 9. Products collection

```text
┌──────────────────────────────────────────────────────────────────┐
│ PRODUCTS                                                         │
│ Tools, publications, instruments, platforms, and utilities.      │
│                                                                  │
│ [Available] [Pilot] [Prototype] [Concept] [Retired]              │
│ Class ▾  Standing ▾  Lifecycle ▾  Availability ▾                 │
├──────────────────────────────────────────────────────────────────┤
│ PRODUCT · CONFIRMED · GOVERNED CONCEPT                           │
│ Corpus Forge Workbench                                           │
│ Governed transformation of source material into durable,         │
│ traceable research systems.                                      │
│ For: researchers · authors · labs · institutions                 │
│ Availability: active development                                 │
│ [View product] [Follow progress] [Related projects]               │
├──────────────────────────────────────────────────────────────────┤
│ PRODUCT FAMILY · CONFIRMED · GOVERNED CONCEPT                    │
│ Boundary-First Chess Software                                    │
│ Interactive teaching and analysis surfaces derived from the      │
│ Boundary-First Chess program.                                    │
│ Availability: concrete products not yet separated                │
└──────────────────────────────────────────────────────────────────┘
```

## 10. Project detail shell

```text
┌──────────────────────────────────────────────────────────────────┐
│ PROJECT                                                          │
│ Corpus Forge Agent Pipeline                     ACTIVE · VALIDATION│
│ Build and validate a supervised corpus-refinement workflow.      │
│                                                                  │
│ Program: Corpus Forge       Steward: Unassigned                  │
│ Current gate: First complete vertical slice                      │
│                                                                  │
│ [Overview] [Scope] [Workstreams] [Milestones]                    │
│ [Outputs] [Evidence] [Dependencies] [History]                    │
├──────────────────────────────────────────────────────────────────┤
│ Objective                                                        │
│ Scope / exclusions                                               │
│ Workstreams                                                      │
│ Products advanced                                                │
│ Artifacts produced                                               │
└──────────────────────────────────────────────────────────────────┘
```

## 11. Product detail shell

```text
┌──────────────────────────────────────────────────────────────────┐
│ PRODUCT                                                          │
│ Corpus Forge Workbench                    CONFIRMED · CONCEPT     │
│ Governed corpus transformation for researchers and institutions. │
│                                                                  │
│ Availability: Active development                                 │
│ Stewardship: Owner / maintenance / funding / incident / sunset   │
│                                                                  │
│ [Overview] [Users] [Capabilities] [Availability]                 │
│ [Evidence] [Projects] [Stewardship] [Releases] [Roadmap]         │
├──────────────────────────────────────────────────────────────────┤
│ Value proposition                                                │
│ Intended users                                                   │
│ Current capabilities and limitations                             │
│ Related projects and evidence                                    │
└──────────────────────────────────────────────────────────────────┘
```

## 12. Data-preservation rule

The current `products-testbeds.softwarePortfolio` array is not deleted during migration. Every entry is copied intact into the migration seed under `sourceData`. Type, lifecycle, and operating-state recommendations are additive and remain reviewable until promoted into canonical first-class entities.

## 13. Implementation order

1. Add the entity-type registry, shape grammar, and text kickers.
2. Add the `Work` projection and atlas layer toggles.
3. Add first-class Project and Product card/detail components.
4. Insert `The Work Takes Form` into the first-passage sequence.
5. Add the Build and Use pathway.
6. Load the project seed and portfolio migration seed as non-canonical overlays.
7. Human-review ambiguous source entries before promotion.
8. Split overloaded names such as Corpus Forge, Boundary-First Chess, Weather@Home, and Boundary-First Soccer into typed entities.


# Context Halo refinement

## 18. Four navigational scales

```mermaid
flowchart LR
    S[Guided Sequence
What should I understand next?]
    A[Atlas
Where is this in the whole corpus?]
    H[Context Halo
What is locally related through each facet?]
    N[Node Record
What does this object contain?]

    S --> A
    A --> H
    H --> N
    N --> H
    H --> A
```

The Context Halo is the mesoscopic layer between the full atlas and the isolated node record.

## 19. Context Halo anatomy

```mermaid
flowchart TB
    CENTER((Selected discipline or object))
    FACETS((Addressable facet ring))
    CLOSE[Close relation band]
    HORIZON[Domain horizon]

    CENTER --> FACETS
    FACETS --> CLOSE
    CLOSE --> HORIZON
```

```text
┌────────────────────────────────────────────────────────────────────┐
│ MATHEMATICS                         PHYSICS                         │
│ Geometry · Topology                 Fields · Quantum · Thermo       │
│      ○        ○                         ○        ○                   │
│       ╲      ╱                           ╲      ╱                    │
│        ╲    ╱      faint relation field   ╲    ╱                     │
│                                                                    │
│             ╭──────────────────────────────────╮                   │
│             │          FACET RING              │                   │
│             │                                  │                   │
│             │    REPRESENTATIONAL MECHANICS    │                   │
│             │                                  │                   │
│             ╰──────────────────────────────────╯                   │
│                 ╱       ╲              ╱       ╲                   │
│                ○         ○            ○         ○                  │
│        COMPUTATION   ENGINEERING   GOVERNANCE   LAW                │
│                                                                    │
│ [Close only] [Domains] [Projects] [Products] [Evidence]            │
└────────────────────────────────────────────────────────────────────┘
```

## 20. Representational Mechanics reference order

```mermaid
flowchart LR
    FG[Formal Grammars] --> PC[Pressure, Cycle & Capacity]
    PC --> DR[Distinction & Representation]
    DR --> DS[Distinction-Space Analysis]
    DS --> BC[Boundary, Constraint & Closure]
    BC --> ID[Invariant, Defect & Transport]
    ID --> AC[Agency, Consequence & Repair]
    AC --> IE[Institutional & Economic Representation]
    IE --> OG[Operational Grammar Design]
    OG --> FG
```

This circular ordering clusters many formal and scientific relations across the upper and right arcs while preserving the wrap adjacency between Operational Grammar Design and Formal Grammars.

## 21. Domain horizon families

```mermaid
flowchart TB
    RM((Representational Mechanics))
    M[Math and Formal Structures
red family]
    P[Physics
blue family]
    C[Computation
violet family]
    E[Engineering and Software
amber family]
    G[Governance, Law, Finance, Infrastructure
teal family]
    U[Public Interface
rose family]
    R[Corpus and Evidence
slate family]

    M --- RM
    P --- RM
    C --- RM
    E --- RM
    G --- RM
    U --- RM
    R --- RM
```

Color remains supplemental. Shape identifies entity type; labels identify domain family; edge weight and style identify relationship strength and type.

## 22. Interaction states

```mermaid
stateDiagram-v2
    [*] --> Quiet
    Quiet --> FacetPreview: hover or keyboard focus facet
    Quiet --> ContextPreview: hover or keyboard focus external node
    FacetPreview --> Pinned: click / Enter / Space
    ContextPreview --> Pinned: click / Enter / Space
    Pinned --> Compare: pin second entity
    Compare --> Pinned: remove one selection
    Pinned --> NodeDive: explicit Open node
    Pinned --> AtlasFocus: explicit View in atlas
    Pinned --> Pathway: explicit Start pathway here
    Pinned --> Quiet: Clear / Escape
    NodeDive --> Pinned: close or Back
```

### Facet focus

Hovering or focusing a facet:

- raises related context nodes to full legibility;
- reveals their edge bundles;
- suppresses unrelated horizon nodes;
- opens a compact relationship summary.

### Context-node focus

Hovering or focusing an external entity:

- highlights every connected facet;
- labels each relation type and strength;
- explains why the entity belongs in the local field.

The first click pins context; navigation requires an explicit action.

## 23. Projects and products at the horizon

```mermaid
flowchart LR
    RM((Representational Mechanics))
    F1((Agency, Consequence & Repair))
    F2((Operational Grammar Design))
    PJ[PROJECT
Corpus Forge Agent Pipeline]
    PR{{PRODUCT
Corpus Forge Workbench}}
    AA{{PRODUCT
Agency Audit Platform}}

    RM --> F1
    RM --> F2
    PJ --> F2
    PR --> F2
    AA --> F1
```

Entity shape remains the project/product grammar from the v0.2 work layer. Domain-family hue indicates where the work primarily lives.

## 24. Context relationship card

```text
┌────────────────────────────────────────────────────┐
│ TOPOLOGY, HOMOLOGY & OBSTRUCTION                   │
│ MATHEMATICS · RESEARCH SHELF                       │
│                                                    │
│ Boundary, Constraint & Closure       strong        │
│ Formalizes boundary and gluing structure.          │
│                                                    │
│ Invariant, Defect & Transport        load-bearing  │
│ Supplies cycles, obstruction classes, persistence. │
│                                                    │
│ [Pin] [Open node] [View in atlas] [Start here]      │
└────────────────────────────────────────────────────┘
```

## 25. Mobile Context Halo

```text
┌──────────────────────────────┐
│ Representational Mechanics  │
│ [Node] [Halo] [Atlas]       │
├──────────────────────────────┤
│     scrollable facet wheel  │
│                              │
│  Related domains            │
│  MATHEMATICS  8 relations   │
│  PHYSICS      7 relations   │
│  COMPUTATION  6 relations   │
│                              │
│  Selected relation card     │
│  [Pin] [Open] [Atlas]       │
└──────────────────────────────┘
```

On narrow screens, the horizon becomes grouped, expandable family lists rather than clipped free-floating nodes. The same relation data and pin state are preserved.
