# Product Landing Route Status

This backlog document is an inspection and promotion ledger for the manifest-backed product landing pages introduced on `agent/product-landing-pages-content`.

The executable source of truth remains `src/content/product-landing-pages/manifest.json` plus the routing policy in `src/lib/product-landing-routing.ts`. This file is intentionally human-readable and should not be used to override those policies.

## Status legend

- **Public / active route** — route is served by the shared renderer, indexable, sitemap-eligible, and available for public discovery.
- **Unlisted / active route** — route is served by the shared renderer for direct-link use only; it is `noindex` / `nofollow` and excluded from public navigation and sitemap discovery.
- **Private / hold** — content exists in the registry but the public router must block it. These are not active public routes.
- **Inspection** — manual presentation/content review status for this backlog. New entries begin as `pending`.

## Public routes

| Inspect | Route | Program / page | Manifest status | Runtime status | Discovery group |
|---|---|---|---|---|---|
| [ ] | `/boundary-first-ux` | Boundary First UX | `launch-candidate` | Public / active route | Software |
| [ ] | `/software-before-code` | Software Before Code | `working-public-method` | Public / active route | Software |
| [ ] | `/closure-driven-software-development` | Closure-Driven Software Development | `advanced-practitioner-draft` | Public / active route | Software |
| [ ] | `/weather` | Boundary First Weather | `pilot-ready-research-program` | Public / active route | Research |
| [ ] | `/law` | Constitutional Law & Jurisprudence | `working-public-research-program` | Public / active route | Research |
| [ ] | `/schemathematics` | Schemathematics | `research-program-draft` | Public / active route | Research |
| [ ] | `/chess` | Boundary-First Chess | `working-public-doctrine` | Public / active route | Work |
| [ ] | `/soccer` | Boundary-First Soccer | `working-public-doctrine` | Public / active route | Work |
| [ ] | `/corpus-forge` | Corpus Forge | `active-development` | Public / active route | Work |
| [ ] | `/agency-audit` | Agency & Representation Audit | `pilot-intake` | Public / active route | Work |

## Unlisted collaboration routes

These routes are intentionally inspectable by direct URL while remaining undiscoverable through ordinary public navigation.

| Inspect | Route | Bridge | Relationship boundary | Manifest status | Runtime status |
|---|---|---|---|---|---|
| [ ] | `/bridge/ground-news` | Ground News | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/gothamchess` | GothamChess | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/rupaul-world-of-wonder` | RuPaul / World of Wonder | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/augusta-citywatch` | Augusta / CityWatch | `historical-project-no-current-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/robocup` | RoboCup | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/georgia-tech-gtri` | Georgia Tech / GTRI | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/topos-institute` | Topos Institute | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/santa-fe-institute` | Santa Fe Institute | `exploratory-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/south-carolina-legal-modernization` | South Carolina legal modernization | `target-class-no-affiliation` | `draft` | Unlisted / active route |
| [ ] | `/bridge/weather-research-operations` | Weather research / operations | `target-class-no-affiliation` | `draft` | Unlisted / active route |

## Private / hold records

These are retained content objects, **not active routes**. Attempting to resolve them through the public landing router should result in the blocked / unavailable path.

| Inspect | Candidate path | Record | Manifest status | Collection | Runtime status |
|---|---|---|---|---|---|
| [ ] | `/boundary-first-labs` | Boundary First Labs recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/corpus-forge-workbench` | Corpus Forge Workbench recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/boundary-first-engineering` | Boundary-First Engineering recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/representational-relativity` | Representational Relativity recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/emergence-theory` | Emergence Theory recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/volumology-labs` | Volumology Labs recovered landing | `archived` | `legacy-recovered` | Private / hold |
| [ ] | `/codexsmith` | Codexsmith / Substack recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/ai-as-forge` | AI as Forge recovered landing | `draft` | `legacy-recovered` | Private / hold |
| [ ] | `/learning-navigator` | Learning Navigator reconciliation record | `draft` | `reconciliation` | Private / hold |

## Inspection checklist

For each active route, inspect at minimum:

- Hero title, deck, and CTA hierarchy are legible and correctly scoped.
- Page-type framing matches Software, Research, Work, or bounded Bridge context.
- No internal manifest / rendering / metadata fields leak into presentation.
- Claim boundaries, legal notices, and relationship boundaries remain visible where required.
- Internal links and anchor CTAs resolve correctly.
- Mobile and desktop layouts preserve hierarchy and readable line lengths.
- Public pages expose the expected parent navigation state.
- Unlisted bridges remain absent from public directory/navigation/sitemap surfaces.

## Promotion notes

Use this section for route-specific defects, decisions, or promotion work discovered during inspection.

### Shared public-landing contract — 2026-08-15

Implemented on `agent/product-landing-shared-contract`:

- Generic public landings now expose manifest/content maturity visibly in the hero and representation panel instead of hiding draft, pilot, or active-development status.
- Generic public landings now include the same public field-guide rail used by Boundary First UX, preserving the larger Software / Research / Work context after a visitor enters an individual landing page.
- Compact `sections[]` records render as authored landing sections rather than as generic `Heading` / `Body` object cards.
- Top-level `cta` is treated as presentation control rather than generic page content, preventing CTA labels from leaking into the body as pseudo-data.
- Closure-Driven Software Development, Schemathematics, Boundary-First Chess, Boundary-First Soccer, Corpus Forge, and Agency & Representation Audit now declare explicit CTA destinations.
- Agency & Representation Audit points directly to collaboration intake; doctrine/program pages currently point to their governing Software, Research, or Work context until deeper purpose-built routes are promoted.

Still pending manual route inspection before checking any route complete:

- desktop/mobile visual QA;
- anchor and internal-link verification on the dense Weather, Law, and Software Before Code records;
- page-specific authored templates or demonstrations for Chess, Soccer, and Corpus Forge;
- homepage carousel eyebrow copy review so Boundary First UX is presented as the interaction method used by the carousel rather than as the parent identity of all public work.

### Agency & Representation Audit — 2026-08-15

Promotion pass implemented without changing the governed maturity state from `pilot-intake`:

- Expanded the governed content object to a service-ready narrative with an executive brief, diagnostic questions, failure modes, five-pass audit method, pilot-fit criteria, bounded intake shape, declared outputs, evidence rule, claim boundary, and closing proposition.
- Added a purpose-built `AgencyAuditLanding` projection that reads from the governed JSON content rather than duplicating the audit claims in an unrelated page object.
- The hero now presents an explicit consequence trace from authority through representation, consequence, contest, and repair, plus direct intake and method CTAs.
- Pilot fit and non-fit conditions are visible before intake so broad certification, predetermined-conclusion, penetration-test, and disguised legal-opinion requests are rejected by the public page itself.
- The claim firewall explicitly states that the audit does not provide legal advice, compliance certification, algorithmic fairness/safety/bias certification, cybersecurity certification, universal discovery guarantees, or automatic endorsement.
- `/agency-audit` now routes to the purpose-built projection while continuing to use the manifest/content registry for route eligibility, metadata, and public maturity.

The inspection checkbox remains open until the route receives desktop/mobile visual QA and live anchor/link verification.

### Closure-Driven Software Development — 2026-08-15

Promotion pass implemented without changing the governed maturity state from `advanced-practitioner-draft`:

- Reframed the method around a six-stage closure loop: discover, bound, skeleton, execute, witness, and repair/promote.
- Added an explicit readiness model where domain certainty and executable certainty must overlap at the granularity of the next commitment; complete knowledge is not required.
- Added a delivery-skeleton contract that requires a real input, protected distinctions, a meaningful operation, a domain witness, a failure path, observation, and repair ownership.
- Added a worked CSV-export example showing how a seemingly small UI request hides permissions, filtering, historical-state, ordering, delivery, retention, and audit distinctions.
- Evidence targets are now framed as measurements for comparative validation rather than as established performance claims.
- Added a public claim boundary stating that the method remains an active draft and has not established general superiority over existing delivery approaches.
- `/closure-driven-software-development` now routes to a purpose-built `ClosureDrivenLanding` projection sourced from the governed content object.

The inspection checkbox remains open until desktop/mobile visual QA and live anchor/link verification are complete.

### Schemathematics — 2026-08-15

Promotion pass implemented without changing the governed maturity state from `research-program-draft`:

- Added an eight-field operative profile covering entity, admissibility, transformations, invariants, closure, boundary, provenance, and defect/repair.
- Added a worked monoid-to-group comparison using established algebra so the page demonstrates the representation method without treating the underlying mathematics as novel.
- The comparison makes the added universal-invertibility condition visible together with the operations it guarantees and the operations a general monoid does not guarantee.
- Validation is framed as a comparative research program across discrimination, prerequisite reconstruction, operation selection, translation, pedagogy, retrieval, and machine reasoning.
- The claim firewall explicitly distinguishes a Boundary First research framing from priority claims, benchmark claims, or claims that a new primitive is necessary when established mathematics is sufficient.
- `/schemathematics` now routes to a purpose-built `SchemathematicsLanding` projection sourced from the governed content object.

The inspection checkbox remains open until desktop/mobile visual QA and live anchor/link verification are complete.
