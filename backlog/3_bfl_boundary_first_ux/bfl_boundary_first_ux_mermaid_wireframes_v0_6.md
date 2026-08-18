# Boundary First UX
## Mermaid Diagrams and Wireframes v0.6
### Paired with `nodes_boundary_theory_reorganized_v0_3.json`

---

## 1. One content graph, multiple projections

```mermaid
flowchart TB
    JSON[(Canonical Webpage Content JSON)]
    CONCEPT[(Concepts & Theory)]
    WORK[(Programs · Projects · Products · Services)]
    EVIDENCE[(Claims · Artifacts · Releases · Pilots)]
    INSTITUTION[(Mission · Covenant · Governance · Policy)]
    COLLAB[(Participation · Collaboration · Roles · Rights)]
    LINEAGE[(Foundations & Lineage)]

    JSON --> CONCEPT
    JSON --> WORK
    JSON --> EVIDENCE
    JSON --> INSTITUTION
    JSON --> COLLAB
    JSON --> LINEAGE

    CONCEPT --> UNION[(Typed Union Graph)]
    WORK --> UNION
    EVIDENCE --> UNION
    INSTITUTION --> UNION
    COLLAB --> UNION
    LINEAGE --> UNION

    UNION --> SEQ[Guided Sequence]
    UNION --> ATLAS[Atlas]
    UNION --> HALO[Context Halo]
    UNION --> LIN[Lineage Lens]
    UNION --> GOV[Institutional Closure Map]
    UNION --> CP[Collaboration Path]
    UNION --> WE[Work & Evidence]
    UNION --> NODE[Node / Record Detail]
```

---

## 2. Navigation scales

```mermaid
flowchart LR
    S[Sequence<br/>What should I understand next?]
    A[Atlas<br/>Where is this in the whole?]
    H[Context Halo<br/>What surrounds this locally?]
    L[Lineage Lens<br/>What does it inherit?]
    W[Work & Evidence<br/>What is built and tested?]
    G[Closure Map<br/>How is it governed?]
    C[Collaboration Path<br/>How may others enter and act?]
    N[Node Record<br/>What exactly is here?]

    S --> A
    A --> H
    H --> L
    H --> W
    H --> G
    H --> C
    H --> N
    L --> N
    W --> N
    G --> N
    C --> N
    N --> H
```

---

## 3. Revised first passage v0.6

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
    S10[10 Work Takes Form]
    S11[11 Work Enters Relation]
    S12[12 Work Earns Promotion]
    S13[13 Institution Binds Itself]
    S14[14 Atlas Reveal]

    S0 --> S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8 --> S9 --> S10 --> S11 --> S12 --> S13 --> S14
```

### Scene 11 — Work enters relation

```mermaid
flowchart LR
    WORK[Bounded work]
    PURPOSE[Declared purpose]
    ROLES[Roles & authority]
    RIGHTS[Rights & information]
    BUILD[Co-development]
    REVIEW[Evidence & disagreement]
    RELEASE[Release decision]
    CLOSE[Stewardship or closure]

    WORK --> PURPOSE --> ROLES --> RIGHTS --> BUILD --> REVIEW --> RELEASE --> CLOSE
```

---

## 4. Institutional stage

```mermaid
flowchart LR
    NOW[Founder-led, AI-enabled micro-lab<br/>formation-stage]
    NEAR[Self-supporting applied<br/>public-interest research lab]
    MEDIUM[Self-sufficient public-interest steward]
    LONG[Bounded long-horizon research]

    NOW --> NEAR --> MEDIUM --> LONG
```

The long horizon is visually separated from current institutional capability.

---

## 5. Mission, method, and covenant

```mermaid
flowchart TB
    MISSION[MISSION<br/>Make consequential systems legible,<br/>governable, accountable, repairable]
    METHOD[METHOD<br/>Declare boundary · Preserve invariant<br/>Expose defect · Restore repair]
    MAXIMS[MAXIMS<br/>Orient]
    PRINCIPLES[PRINCIPLES<br/>Must remain true]
    DOCTRINES[DESIGN DOCTRINES<br/>Shape systems and communication]
    POLICIES[POLICIES<br/>Bind institutional action]
    EVIDENCE[EVIDENCE OF OPERATION<br/>Show what actually happens]

    MISSION --> METHOD
    METHOD --> MAXIMS
    MAXIMS --> PRINCIPLES
    PRINCIPLES --> DOCTRINES
    DOCTRINES --> POLICIES
    POLICIES --> EVIDENCE
```

---

## 6. Covenant map

```mermaid
flowchart TB
    M1[One method. One living system.<br/>Many boundaries to repair.]
    M2[Our roots must balance our branches.]

    P1[No consequence without representation.]
    P2[Responsibility must land.]
    P3[Repair is infrastructure.]

    D1[No hidden human shock absorbers.]
    D2[No undeclared “we.”]

    Y1[AI may assist but may not become<br/>the location where responsibility disappears.]
    Y2[No product without stewardship and closure.]

    M1 --> P1
    M2 --> P3
    P1 --> D1
    P1 --> D2
    P2 --> Y1
    P3 --> Y2
```

Edges show operational implication, not category equivalence.

---

## 7. Institutional closure map

```mermaid
flowchart TB
    BFL((Boundary First Labs))
    P[Purpose<br/>Identity · Mission · Vision]
    I[Invariants<br/>Maxims · Principles · Manifesto]
    A[Authority<br/>Roles · Decision rights · Accountability]
    G[Gates<br/>Evidence · Publication · Portfolio · Restriction]
    S[Standing<br/>Participation · Collaboration · Contestability]
    R[Repair<br/>Correction · Replacement · Withdrawal]
    C[Continuity<br/>Stewardship · Transfer · Retirement · Succession]

    BFL --> P --> I --> A --> G --> S --> R --> C
    C -.institutional learning.-> P
```

---

## 8. Collaboration lifecycle

```mermaid
flowchart LR
    I[Inquiry]
    F[Fit & Boundary Review]
    S[Scoped Agreement]
    A[Active Collaboration]
    R[Review & Evidence]
    P[Release or Promotion Decision]
    C[Stewardship or Closure]

    I --> F --> S --> A --> R --> P --> C
    R -->|repair required| A
    P -->|hold or revise| A
    C -->|continued work| I
```

---

## 9. Collaboration modes

```mermaid
flowchart TB
    COLLAB((Bounded Co-development))
    RF[Research & Formalization]
    CR[Independent Review & Criticism]
    PT[Pilot & Testbed]
    SP[Software & Product Co-development]
    CA[Case, Data & Artifact Contribution]
    AD[Advisory & Domain Expertise]
    ED[Education & Facilitation]
    IP[Institutional & Distribution Partnership]
    FS[Funding & Public-interest Support]

    COLLAB --> RF
    COLLAB --> CR
    COLLAB --> PT
    COLLAB --> SP
    COLLAB --> CA
    COLLAB --> AD
    COLLAB --> ED
    COLLAB --> IP
    COLLAB --> FS
```

---

## 10. Role and authority firewall

```mermaid
flowchart TB
    R[Declared relationship]
    AUTH[Authority]
    AUTHOR[Authorship]
    REVIEW[Review]
    OWNER[Ownership / rights]
    FUND[Funding]
    MAINT[Maintenance]
    ENDORSE[Endorsement]

    R --> AUTH
    R --> AUTHOR
    R --> REVIEW
    R --> OWNER
    R --> FUND
    R --> MAINT
    R --> ENDORSE

    AUTHOR -.not equivalent.-> OWNER
    REVIEW -.not equivalent.-> ENDORSE
    FUND -.not equivalent.-> AUTH
    MAINT -.not equivalent.-> AUTHOR
```

---

## 11. Participation to collaboration routing

```mermaid
flowchart LR
    ENTRY[Ways to Enter the Work]
    TEST[Test an Instrument]
    PILOT[Propose a Pilot]
    REVIEW[Review Research]
    CASE[Contribute a Case]
    BUILD[Collaborate on Software or Research]
    CRITIC[Join Criticism Network]
    LICENSE[Adopt or License]
    SUPPORT[Support the Lab]

    FRAMEWORK[Collaboration Framework]

    ENTRY --> TEST
    ENTRY --> PILOT
    ENTRY --> REVIEW
    ENTRY --> CASE
    ENTRY --> BUILD
    ENTRY --> CRITIC
    ENTRY --> LICENSE
    ENTRY --> SUPPORT

    PILOT --> FRAMEWORK
    REVIEW --> FRAMEWORK
    CASE --> FRAMEWORK
    BUILD --> FRAMEWORK
    CRITIC --> FRAMEWORK
    SUPPORT --> FRAMEWORK
```

Participation is an entrance. Collaboration is the declared operating relationship.

---

## 12. Collaboration evidence loop

```mermaid
flowchart LR
    CLAIM[Claim or method]
    USE[Use / pilot / implementation]
    POS[Positive or useful case]
    NEG[Null, negative, failed,<br/>or limiting case]
    DISSENT[Disagreement and critique]
    REVIEW[Review under claim ceiling]
    DECISION[Promote · repair · hold · withdraw]

    CLAIM --> USE
    USE --> POS
    USE --> NEG
    USE --> DISSENT
    POS --> REVIEW
    NEG --> REVIEW
    DISSENT --> REVIEW
    REVIEW --> DECISION
    DECISION -.repair.-> CLAIM
```

---

## 13. Context Halo with new filters

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ REPRESENTATIONAL MECHANICS               [Node] [Halo] [Lineage] [Map] │
│                                                                          │
│ [Domains] [Work] [Evidence] [Lineage] [Governance] [Collaboration]      │
├──────────────────────────────────────────────────────────────────────────┤
│     MATHEMATICS                          PHYSICS                          │
│       ○       ○                            ○       ○                      │
│         ╲   ╱                                ╲   ╱                        │
│          ╲ ╱         faint relation field     ╲ ╱                         │
│                                                                          │
│             ╭──────────────────────────────────╮                         │
│             │             FACETS               │                         │
│             │    REPRESENTATIONAL MECHANICS    │                         │
│             ╰──────────────────────────────────╯                         │
│                ╱       ╲          ╱       ╲                              │
│               ▭         ⬡        ◇         ○                             │
│           PROJECT    PRODUCT   EVIDENCE  COLLABORATOR ROLE               │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ RELATION SUMMARY · type · authority · evidence · status · closure   │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 14. Institutional page — desktop

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ BOUNDARY FIRST LABS                           [Standard] [Closure Map]    │
│ Applied public-interest research institute                               │
│ FORMATION-STAGE · FOUNDER-LED · AI-ENABLED MICRO-LAB                    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│      PURPOSE                                                             │
│        ╲                                                                 │
│  CONTINUITY — INVARIANTS                                                 │
│       ╲          ╱                                                       │
│        BOUNDARY FIRST LABS            ┌───────────────────────────────┐  │
│       ╱          ╲                    │ SELECTED RECORD               │  │
│   REPAIR       AUTHORITY              │ PRINCIPLE · CLASSIFIED        │  │
│       ╲          ╱                    │ No consequence without        │  │
│     STANDING — GATES                  │ representation.               │  │
│                                      │ Binding: not yet adopted      │  │
│                                      │ Operation: evidence pending   │  │
│                                      │ [Source] [Related policies]   │  │
│                                      └───────────────────────────────┘  │
│                                                                          │
│ [Identity] [Mission] [Covenant] [Governance] [Participation]             │
│ [Collaboration] [Portfolio] [Continuity]                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 15. Collaboration landing — desktop

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ COLLABORATE THROUGH DECLARED BOUNDARIES                                  │
│ Boundaries are the conditions that make collaboration coherent.          │
├──────────────────────────────────────────────────────────────────────────┤
│ [Research] [Criticism] [Pilot] [Build] [Contribute] [Advise] [Teach]    │
│ [Partner] [Support]                                                       │
├──────────────────────────────────────────────────────────────────────────┤
│ LIFECYCLE                                                                │
│ Inquiry → Fit review → Scoped → Active → Review → Release → Closure      │
├──────────────────────────────────────────────────────────────────────────┤
│ PUBLIC PROMISE                                                           │
│ Understand what you are entering, what you may influence, what you       │
│ remain responsible for, how your work is credited and used, how          │
│ disagreement is preserved, and how the relationship may end.             │
│                                                                          │
│ [Propose collaboration] [Review work] [Bring a pilot] [Support the lab]  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 16. Collaboration record

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ COLLABORATION · ACTIVE · PILOT & TESTBED                                 │
│ Boundary-First Software Review Pilot                                     │
├──────────────────────────────────────────────────────────────────────────┤
│ Purpose          Test a bounded review instrument in live practice       │
│ Scope            Declared repository and review period                   │
│ Roles            Program Steward · Pilot Partner · Independent Reviewer  │
│ Authority        Review and recommend; no deployment authority           │
│ Outputs          Findings report · negative cases · revised method       │
│ Evidence gate    Predeclared success and failure criteria                │
│ Attribution      Declared contributors and review responsibility         │
│ Publication      Review required                                         │
│ Stewardship      Named owner                                              │
│ Closure          Data disposition · report · continuation decision       │
├──────────────────────────────────────────────────────────────────────────┤
│ [Overview] [Roles] [Rights] [Evidence] [Disagreement] [Closure]          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 17. Product stewardship gate

```mermaid
flowchart LR
    CAND[Candidate product]
    USER[Declared users and value]
    STEWARD[Named steward]
    MAINT[Maintenance and support]
    FUND[Funding path]
    REPAIR[Correction and incident path]
    END[Retirement · transfer · open release]
    PROD{{Maintained product}}

    CAND --> USER --> STEWARD --> MAINT --> FUND --> REPAIR --> END --> PROD
```

No maintained product state appears before this gate closes.

---

## 18. Governance lens

```mermaid
flowchart LR
    O[Selected object]
    AUTH[Authorized by]
    BOUND[Bound by]
    REVIEW[Reviewed under]
    STEWARD[Stewarded by]
    FUND[Funded by]
    AFFECT[Affected parties]
    CONTEST[Contestable by]
    REPAIR[Corrected / withdrawn / retired by]

    AUTH --> O
    BOUND --> O
    REVIEW --> O
    STEWARD --> O
    FUND --> O
    O --> AFFECT
    AFFECT --> CONTEST
    CONTEST --> REPAIR
```

---

## 19. Conventional and Boundary First views

```mermaid
flowchart LR
    DATA[(Canonical webpage JSON)]
    STANDARD[Conventional pages<br/>About · Mission · Governance · Policies<br/>Participation · Collaboration · Products]
    BFUX[Boundary First UX<br/>Purpose → Invariants → Authority → Gates<br/>Relation → Evidence → Standing → Repair → Continuity]

    DATA --> STANDARD
    DATA --> BFUX
    STANDARD <--> BFUX
```

---

## 20. Status firewall

```text
Classification adjudicated
        ≠ formally adopted
        ≠ operationalized
        ≠ supported by evidence
        ≠ audited
```

```text
Collaboration inquiry
        ≠ partnership
        ≠ endorsement
        ≠ authorship
        ≠ ownership
        ≠ institutional authority
```

---

## 21. Mobile institutional view

```text
┌──────────────────────────────┐
│ Boundary First Labs         │
│ Formation-stage micro-lab   │
│ [Standard] [Map]            │
├──────────────────────────────┤
│ Purpose                     │
│ Invariants                  │
│ Authority                   │
│ Gates                       │
│ Standing                    │
│ Repair                      │
│ Continuity                  │
├──────────────────────────────┤
│ Selected record             │
│ TYPE · STATUS               │
│ Statement                   │
│ Binding / operation         │
│ [Source] [Related]          │
└──────────────────────────────┘
```

---

## 22. Mobile collaboration view

```text
┌──────────────────────────────┐
│ Collaboration               │
│ [Modes] [Lifecycle] [Roles] │
├──────────────────────────────┤
│ ▸ Research & Formalization  │
│ ▸ Review & Criticism        │
│ ▸ Pilot & Testbed           │
│ ▸ Software Co-development   │
│ ▸ Advisory                  │
│ ▸ Partnership               │
│ ▸ Funding & Support         │
├──────────────────────────────┤
│ Selected mode               │
│ Purpose                     │
│ Outputs                     │
│ Evidence                    │
│ Closure                     │
│ [Propose] [Read framework]  │
└──────────────────────────────┘
```

---

## 23. Reserved-content boundary

```mermaid
flowchart LR
    PUBLIC[Canonical public content]
    REVIEW[Separate craft and review]
    RESERVED[Reserved long-horizon program substance]

    PUBLIC -->|bounded reference only| REVIEW
    REVIEW -->|explicit promotion required| RESERVED
```

The current UX does not elaborate Self-Improving Representations or Agentic Scientific Method beyond the bounded canonical long-horizon statement.
