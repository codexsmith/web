# Public interface consolidation and Evidence refinement phase log v0.1

**Work stream:** Boundary First Labs Starter v2  
**Completed:** 2026-08-23  
**Status:** Complete  
**Implementation source of truth:** repository root (`Webpage/`), not the source snapshot in this backlog folder

## Purpose

Consolidate the public site's top-level sections into one coherent presentation and navigation system while preserving their content, categorical identity, and useful depth. Public Interest provided the closest initial reference: a strong above-the-fold title area, At a glance embedded in the hero, clear content panels, and an intentional supporting structure.

The phase also reduced unnecessary wording, clarified navigation history, retired the duplicate Record projection, and rebuilt Evidence as a distinct claim-and-source representation rather than another copy of World content.

## Completed scope

### Shared top-level presentation

- Products, Public Interest, Publications, About, and Research now compose the same shared hero, region-grid, and supporting-context primitives.
- Public Interest retains its Augusta civic feature and distinctive civic morphology without forking the common hero or region-card system.
- At a glance is part of the hero and uses the first substantive body paragraph without redundant labels such as “Research content.”
- Public Interest and Research use a left-shifted desktop divide so their denser At a glance copy receives more width and creates less vertical height.
- Mobile layouts preserve the same information in a single editorial column.

### Concise region cards and supporting context

- Descriptive paragraphs were removed from immediate top-level content cards while remaining available on deeper branch cards where additional context is useful.
- Card actions now use **View** instead of “Enter region.”
- Supporting Context replaces the generic, repetitive More section.
- Related links appear first, additional prose follows, and deeper inspections appear under Explore further.
- Links that duplicate immediate content cards are removed from Supporting Context.
- Secondary paths and context use counted progressive disclosure rather than appearing as an unbounded list.

### Color system

- The persistent shell, header, navigation, focus treatment, and general controls use a neutral silver action accent rather than purple or green.
- The five home cards use distinct categorical colors.
- Each top-level section carries its home-card color inside the content viewport while the surrounding shell stays neutral.
- The final section mapping is:

| Section | Content accent |
| --- | --- |
| Public Interest | blue |
| Products | red/coral |
| Publications | green |
| About | amber |
| Research | purple |

- Eyebrows inherit their local content treatment; they are not forced to use the shell accent.

### Navigation behavior

- The Focus Path represents actual traversal history rather than content ancestry.
- Entering a content panel preserves a previous step.
- The current focus is not duplicated among the current peer options.
- Selecting an earlier history entry rewinds and truncates later traversal history.
- Home is the explicit history reset.
- On small screens, the relocated top navigation flows horizontally rather than retaining a vertical left-rail orientation.
- Stable URLs and native browser Back/Forward remain authoritative.

### Projection model and Record retirement

- World is the complete default public reading surface.
- Useful Record material was promoted into World, At a glance, Supporting Context, or a clearly named public route.
- The duplicate Record renderer was removed.
- Legacy `view=record` inputs redirect to the canonical World or provenance destination.
- Evidence and Process remain deeper representations with distinct responsibilities rather than alternative narrative pages.

### Evidence refinement

- Object Evidence views now present current standing, evidence level, last update, next gate, claim ceiling, claims, bound sources, limits, open questions, and admitted changes.
- Branch Evidence views summarize evidence-bearing descendants, standing distribution, promotion gates, and recent changes across the portfolio.
- Explicit Evidence packages are used when claim wording and source binding require editorial control; bounded generated profiles cover nodes whose declared status, publication metadata, or semantic events are sufficient.
- Public, retained, and internal source availability remain visibly distinct.
- Evidence is intentionally a claim ledger, not a second navigation or content surface.

### Documentation and safeguards

- The root README was rewritten to describe the current site rather than the original starter.
- `docs/PUBLIC-INTERFACE-SYSTEM.md` records the maintenance contract for page structure, navigation, colors, projections, content authoring, and closeout.
- A single `npm run verify` command now runs code quality, type, architecture, production-build, redirect, and representative-route checks.
- Architecture contracts protect the shared top-level primitives, concise cards, View wording, dense hero proportions, Record retirement, and Evidence responsibilities.
- Runtime checks now cover all five top-level pages plus representative object/branch Evidence views and projection redirects.

## Primary implementation surfaces

The current implementation lives in the repository root. The most relevant owners are:

- `src/components/world-view.tsx` — shared hero, region grid, supporting context, branch and leaf World layouts.
- `src/components/subject-pane.tsx` — At a glance, action ordering, and progressive disclosure.
- `src/components/world-app.tsx` — focus, traversal history, projections, and URL synchronization.
- `src/components/boundary-frame.tsx` — persistent shell, home recovery, history, peers, and depth controls.
- `src/components/evidence-view.tsx` — object and branch Evidence views.
- `src/lib/evidence-content.ts` — explicit and generated Evidence profiles.
- `src/lib/view-projection.ts` — World, Evidence, Process, and compatibility rules.
- `src/app/bf-industrial-tokens.css` — neutral shell and categorical section accents.
- `src/app/section-hero-organization.css` — top-level page organization and dense hero proportions.
- `src/app/evidence-projection-refinement.css` — Evidence presentation.
- `scripts/check_v2_contracts.mjs` and `scripts/check_v2_runtime.mjs` — regression safeguards.

## Validation at closeout

The completed phase passed:

- ESLint with no warnings.
- TypeScript type checking.
- v2 architecture contracts.
- Next.js production build, including 87 generated pages.
- Production runtime route and redirect smoke checks.
- Repository diff whitespace validation.

This phase did not establish screenshot-based visual regression testing or automated browser interaction coverage. Those are appropriate additions when navigation behavior or responsive presentation next receives substantial changes.

## Decisions that should remain stable

1. Top-level sections are variations over shared layout primitives, not separate page implementations.
2. Public Interest may specialize around the shared system but should not fork it.
3. Top-level cards stay concise; deeper cards may explain.
4. Supporting Context must add information rather than duplicate region cards.
5. The shell remains neutral; categorical color belongs to content.
6. World owns the narrative; Evidence owns claim support and boundaries; Process owns operating placement.
7. Record remains retired.
8. Traversal history and content ancestry remain separate concepts.
9. Home is the explicit reset.
10. Maturity, publication state, evidence, provenance, and institutional standing remain separate claims.

## Follow-up register

These items are intentionally outside this completed phase:

- Add browser-level interaction tests for traversal rewind, current-peer deduplication, and home reset when navigation next changes materially.
- Add responsive screenshot baselines for the five top-level pages if automated visual-regression infrastructure is introduced.
- Continue replacing generated Evidence profiles with explicit claim/source packages where editorial review reveals route-specific evidence needs.
- Review public source availability and independently verifiable references as new evidence is released.
- Consolidate late CSS layers only as a dedicated refactor with the current architecture and route checks held constant.

## Archive note

The code inside `backlog/14_boundary-first-labs-starter_v2` is the original v2 seed and is retained for provenance. It should not be synchronized mechanically with the current application. This phase log records how that work stream developed; current code and maintenance documentation remain in the repository root.
