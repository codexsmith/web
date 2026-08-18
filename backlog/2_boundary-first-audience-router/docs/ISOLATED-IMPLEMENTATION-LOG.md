# Isolated implementation log

Status: closed on 2026-08-02 after integration into the main site. Post-close product-disposition decisions are tracked in `../TASKLIST.md`.

## Original isolated-preview boundary

The audience router was first made available at `/audience` and its generated
child routes. During the isolated-preview phase it was intentionally:

- absent from the public header, footer, homepage, Atlas, Domains, and
  publication navigation;
- marked `noindex, nofollow`;
- server-rendered without client-side state or persistence;
- visually self-contained while using the site's existing font and color
  tokens;
- a routing overlay over canonical records, not a duplicate content store.

## Closure disposition

At closure, the router is integrated into the main application and the
homepage exposes it as the People entrance. It remains `noindex, nofollow`
pending the product decision recorded in `../TASKLIST.md`. The dataset remains
an independently versioned routing overlay imported by the live compatibility
bridge.

The existing Atlas, Domains, domain-record, publication, and shared site
components were not changed. The only compatibility change outside the
isolated slice corrects the publication-suite import after its backlog folder
was numbered.

## Implemented route grammar

```text
/audience
/audience/:intent
/audience/:intent/:audience
/audience/:intent/:audience/:doorway?depth=:depth
```

Invalid slugs, incompatible intent/audience pairings, incompatible
audience/doorway pairings, and paths longer than three segments resolve to
not-found. Requested depth is bounded to the selected audience's declared
entry/maximum range.

## Compatibility bridge

The reference JSON remains unchanged. The isolated runtime maps superseded
references to current canonical node IDs before anything is displayed:

| Reference packet ID | Current canonical node |
| --- | --- |
| `agency-audit` | `governance-institutions` |
| `ai-as-forge` | `ai-forge` |
| `boundary-first-chess` | `products-testbeds` |
| `boundary-first-engineering` | `bfe` |
| `boundary-first-soccer` | `products-testbeds` |
| `claim-ledger` | `corpus` |
| `closure` | `boundary-theory` |
| `closure-driven-development` | `software-engineering-practice` |
| `contradiction-register` | `corpus-forge` |
| `corpus-operations` | `corpus` |
| `education` | `on-ramps` |
| `formal-spine` | `representational-mechanics` |
| `human-factors` | `constructive-humanist-agentics` |
| `lab-overview` | `identity` |
| `mathematics-formal-structures` | `mathematics` |
| `modern-posture` | `positions` |
| `physics-physical-regimes` | `physics` |
| `public-interface` | `public-philosophy-satire` |
| `research-programs` | `boundary-theory` |
| `software-before-code` | `bfe` |
| `software-engineering` | `software-engineering-practice` |

Six one-sided doorway declarations in the packet are also made reciprocal at
runtime. The audience's declared `doorwayIds` are treated as authoritative,
because those values determine the intended route:

- Curious → Software
- Self-directed learner → Software
- Working practitioner → Institutions
- Working practitioner → Mathematics and formal systems
- Collaborator/partner → Mathematics and formal systems
- Collaborator/partner → Software

Obsolete action URLs are routed to existing site destinations:

| Reference URL | Preview destination |
| --- | --- |
| `/start` | `/` |
| `/learn` | `/publications/civilizational-mechanics` |
| `/tools/boundary-review` | `/publications/civilizational-mechanics#interactive-mechanics` |
| `/projects` | `/work` |
| `/services/agency-audit` | `/domain/governance-institutions` |
| `/agency` | `/domain/constructive-humanist-agentics` |
| `/teach` | `/domain/on-ramps` |
| `/research` | `/domain/boundary-theory` |
| `/review` | `/domain/corpus` |

## Publication-suite bridge

Each audience result receives one deep-linked passage from the existing
Civilizational Mechanics publication. This tests the audience router and
publication suite together without changing the publication page:

| Audience | Publication mechanic |
| --- | --- |
| Curious recognizer | `nested-world` |
| Self-directed learner | `boundary-first-cycle` |
| Working practitioner | `accounting-software` |
| Builder/product user | `ai-acceleration` |
| Organizational leader | `business-agent` |
| Affected participant | `externality-transfer` |
| Educator/translator | `nested-world` |
| Formal researcher | `representational-evolution` |
| Critic/reviewer | `repair-router` |
| Collaborator/partner | `mission-atlas` |

The publication claim ceiling is displayed beside the recommendation so the
route does not promote orientation material into formal or empirical proof.

## Implementation locations

- `src/app/audience/[[...path]]/page.tsx`
- `src/components/audience/AudienceRouteOutlet.tsx`
- `src/components/audience/audience.module.css`
- `src/lib/audience/`

The root TypeScript project excludes the standalone reference app under this
backlog folder. The production slice imports only its JSON dataset; this
prevents the packet's own demo aliases and app scaffolding from becoming part
of the live Next.js type graph.

## Review questions before integration

1. Should the eventual entry surface be the homepage, a `/start` page, the
   publication suite, or an optional Atlas action?
2. Is explicit audience selection useful, or should intent and doorway alone
   infer a reversible starting relation?
3. Are the compatibility mappings above conceptually correct, especially
   sports/chess → `products-testbeds`, closure → `boundary-theory`, and
   research programs → `boundary-theory`?
4. Are the ten publication recommendations the right first passages?
5. Should depth materially alter page content, or remain a route preference
   until depth-specific canonical artifacts exist?
6. Should an approved dataset be promoted into `src/content`, or remain an
   independently versioned routing overlay?
7. What, if any, anonymous route analytics would be justified without
   turning a temporary visitor need into a persistent classification?

## Verification

- Audience contract and resolver tests: 12 passing
- Full UI test suite: 38 passing
- Graph builder tests: 15 passing
- ESLint: passing
- Next.js production build: passing
- Graph integrity check: passing (29 nodes, 0 artifacts; generated files current)
