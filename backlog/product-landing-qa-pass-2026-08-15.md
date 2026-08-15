# Product Landing QA Pass — 2026-08-15

Branch: `agent/product-landing-shared-contract`

This note records the source-level QA and the remaining rendered inspection gate for the ten public manifest-backed landing pages. It supplements `backlog/product-landing-route-status.md`; it does not override the manifest, routing policy, or the inspection checkboxes in that ledger.

## Public route population

The governed public boundary remains ten routes:

- Software: `/boundary-first-ux`, `/software-before-code`, `/closure-driven-software-development`
- Research: `/weather`, `/law`, `/schemathematics`
- Work: `/chess`, `/soccer`, `/corpus-forge`, `/agency-audit`

Seven routes use purpose-built projections and three reference surfaces continue to use the shared renderer:

- Authored projections: Boundary First UX, Closure-Driven Software Development, Schemathematics, Boundary-First Chess, Boundary-First Soccer, Corpus Forge, Agency & Representation Audit
- Shared renderer: Software Before Code, Boundary First Weather, Constitutional Law & Jurisprudence

No maturity state was promoted as part of presentation work.

## Source-level QA completed

### Route and content identity

Added `tests/product-landing-presentation.test.ts` to enforce:

- public content `id`, `slug`, `visibility`, and `status` remain aligned with the manifest;
- every declared public CTA has a label and either an internal path or an anchor target;
- anchor targets resolve to governed section keys or declared content IDs;
- the seven authored projections remain explicitly routed;
- the three reference surfaces remain on the shared renderer;
- every authored projection remains connected to the shared `PublicLandingRail`;
- public maturity remains visible on every authored projection.

The existing `test:contracts` command now includes this presentation-contract file in addition to `tests/public-architecture.test.ts`.

### Legal notice priority

The shared renderer previously placed `PublicLandingRail` between the Law hero and the high-prominence legal notice, contradicting the content contract that the notice appear directly below the hero.

The renderer now extracts `legalNotice` from ordinary body rendering and renders a dedicated priority notice immediately below the hero, before the public field guide.

The notice intentionally suppresses structural presentation fields such as `placement` and `prominence` while preserving the actual notice title, body, and reliance rules.

### Authored section order

The shared renderer previously applied a global section ranking and then alphabetized unknown section keys. On dense reference pages and collaboration bridges this could move a `closing` section ahead of domain-specific material and scramble the order deliberately authored in the governed JSON.

The shared renderer now preserves governed JSON insertion order for body sections. Presentation order therefore belongs to the content object rather than to an unrelated global ranking table.

### Presentation metadata leakage

`audience` and `pageIntent` are now presentation-control metadata and are hidden from generic body rendering. This prevents unlisted collaboration briefs from exposing segmentation or internal framing fields as public pseudo-content.

Existing hidden structural keys such as `renderPolicy`, `metadata`, `notes`, `sourceKeys`, and top-level `cta` remain suppressed.

### Parent context

`/work` and `/work/index` remain intentionally distinct:

- `/work` is the Work & Evidence overview;
- `/work/index` is the canonical filterable portfolio inventory.

Work landing pages may therefore link to `/work/index` as their discovery parent without treating `/work/index` as an accidental duplicate of `/work`.

### Homepage carousel identity

The legacy `Boundary First UX · Public landing pages` eyebrow is normalized to `Boundary First Labs · Public work`, keeping Boundary First UX as an interaction method rather than presenting it as the parent identity of all public programs.

## Automated review-gate state

The repository review workflow runs on branch pushes and includes, in order, content checks, graph checks/tests, UI stabilization checks, architecture contracts, public contract tests, lint, build, and runtime acceptance.

The latest inspected run for this branch stops at the existing UI stabilization gate before the new landing contracts, lint, and build execute.

Observed failure:

- `src/components/product-landing/BoundaryFirstUxSandboxSession.tsx: raw foreground alpha text utility remains`

That file is not modified by this landing-page branch. The failure is therefore treated as a pre-existing repository gate failure, not as evidence that the landing-page changes themselves failed or passed build validation.

No unrelated CI fix is included in this branch without an explicit decision to broaden scope.

## Rendered QA availability

A branch Vercel preview is not expected under the current repository policy. `vercel.json` explicitly enables deployments for `main` and disables them for `*` branches.

The current execution environment also cannot clone or fetch GitHub through its local container network, so a local Next.js render cannot be produced here independently of GitHub Actions.

Therefore no route inspection checkbox should be marked complete yet.

## Remaining rendered gate

Before checking any public route complete, inspect at minimum at a desktop and narrow-mobile viewport:

1. Hero headline/deck line length and CTA hierarchy.
2. Visible maturity/status and claim-boundary language.
3. Public field-guide current-state indication and horizontal traversal.
4. Every hero anchor CTA lands on the intended section without hiding the heading beneath sticky navigation.
5. Parent-context links return to Software, Research, or the intended Work inventory surface.
6. Dense cards/lists do not create horizontal page overflow.
7. Five- and six-stage process grids collapse into readable single-column or low-column layouts on narrow screens.
8. Legal notice on `/law` is the first content immediately below the hero and remains visually prominent.
9. Claim firewalls on Law, Schemathematics, Agency Audit, Closure-Driven, Chess, Soccer, and Corpus Forge remain conspicuous rather than visually subordinate to promotional copy.
10. `/boundary-first-ux`, `/software-before-code`, `/weather`, and `/law` remain useful as reference surfaces rather than appearing less intentional than the newly authored projections.
11. Carousel and rail keyboard focus, arrow controls, native horizontal scrolling, and `aria-current` state remain usable.
12. No unlisted collaboration route appears in ordinary public navigation, directory, carousel, or sitemap surfaces.

## Gate decision

Source/presentation contract: **hardened**.

Automated full review gate: **blocked by pre-existing UI stabilization failure before landing contracts/lint/build**.

Rendered desktop/mobile inspection: **not yet available on this branch under current deployment policy**.

Public-route inspection checkboxes: **remain open**.
