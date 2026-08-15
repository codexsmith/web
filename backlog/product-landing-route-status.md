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

- _No manual inspection notes recorded yet._
