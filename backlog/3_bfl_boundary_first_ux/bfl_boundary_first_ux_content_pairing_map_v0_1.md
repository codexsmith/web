# Boundary First UX Content Pairing Map
## `nodes_boundary_theory_reorganized_v0_3.json` → UX surfaces

This crosswalk prevents the Markdown presentation layer from drifting away from the canonical webpage content JSON.

| Canonical JSON path | Canonical function | Boundary First UX surface | Conventional surface |
|---|---|---|---|
| `identity.institution` | Institutional identity and portfolio relation | Identity center; institutional record | About |
| `identity.institutionalStage` | Present facts and staged aims | Stage rail; status card | About / Status |
| `identity.mission` | Mission, method, operating line, preferred maxim | Opening sequence; Purpose view | Mission |
| `identity.vision` | Public, institutional, compact, bounded long horizon | Vision scene; stage rail | Vision |
| `identity.operatingGuidelines` | Typed maxims, principles, doctrines, policies | Covenant map; statement cards | Values / Policies |
| `identity.manifesto` | Broader public commitments | Invariant ring | Manifesto / Values |
| `identity.governance` | Internal commitments and humane tests | Governance lens; Authority view | Governance |
| `identity.institutePolicy` | Proposed institute-policy framework | Policy cards; Gates view | Policies |
| `identity.publicationAdmissibility` | Release and claim gates | Evidence/promotion scene | Research Integrity / Publications |
| `identity.evidenceArchitecture` | How claims and work earn promotion | Work & Evidence view | Research Integrity |
| `identity.participation` | Ways to enter the work | Participation entry cards | Participate |
| `identity.collaboration` | Bounded co-development framework | Collaboration Path; relation cards | Collaboration |
| `identity.portfolioGovernance` | Program/project/product governance | Work layer; product gate | Projects / Products |
| `identity.founderAndInstitution` | Founder provenance and institutional separation | Provenance relation; continuity view | Founder / Institution |
| `identity.goals` | Near-, medium-, and long-term goals | Stage and roadmap view | Goals / Roadmap |
| `identity.quoteBank` | Rotating or contextual quotation content | Quote slides and transitions | Quotes / Essays where used |
| `identity.institutionalSectionsOrder` | Canonical conventional page order | Node detail ordering | Institutional index |
| `identity.preferredProjection` | Preferred graphical projection | Opens Closure Map | N/A |
| `identity.displayUI` | Compatibility display setting | Fallback node view | N/A |
| `*.facets` | Local internal structure | Facet ring / node tabs | Section navigation |
| `*.history` and `*.conceptualLineage` | Development and inherited context | History and Lineage lenses | History / Sources |
| `*.claims` | Claim records and status | Evidence view; claim cards | Research / Claims |
| `*.documents` | Durable source and publication records | Artifact nodes | Publications |
| `*.governance` | Domain-specific governance | Governance relations | Domain governance section |
| `products-testbeds.*` | Portfolio source and product/testbed context | Work projection | Products / Testbeds |
| `on-ramps.*` | Familiar entry paths | On-ramp scene | Start Here |
| `corpus.*` | Research operations and provenance infrastructure | Evidence and corpus views | Research Operations |

## Pairing rules

1. The JSON field is authoritative for content.
2. The guide is authoritative only for presentation behavior.
3. A missing canonical field remains missing in the UI.
4. A proposed policy retains its proposed status.
5. A collaboration relation does not imply endorsement or authorship.
6. A project does not become a product without an explicit product record and stewardship gate.
7. A quote-bank statement does not become mission, policy, or evidence through display frequency.
8. Reserved research programs require separate content promotion before appearing in public pathways.
