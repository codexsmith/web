# Public interface system

This document is the maintenance contract for the current Boundary First Labs public interface. It records the decisions established during the top-level page, navigation, color, Record-retirement, and Evidence-refinement phase.

## 1. One shared top-level page grammar

Products, Public Interest, Publications, About, and Research are different content regions, not separate microsites. Their World views must compose the same primitives from `src/components/world-view.tsx`:

1. `WorldHero` — title, summary, and At a glance.
2. `RegionGrid` — the section's immediate destinations.
3. `SupportingContext` — non-duplicative related paths, longer context, and deeper inspections.

Public Interest may keep its Augusta feature and civic morphology, but its hero and region choices still use `WorldHero` and `RegionGrid`. New top-level exceptions should be composed around these primitives rather than copying them.

### Hero behavior

- The title and summary occupy the left side; At a glance occupies the right.
- At a glance uses the first body paragraph, falling back to the summary. It does not add labels such as “Research content.”
- Public Interest and Research give the right column more width because their At a glance copy is denser.
- At 760px and below, the hero becomes a single editorial column. The desktop split must not be reproduced as a squeezed mobile row.

### Region-card behavior

- Immediate children of a top-level section omit their descriptive paragraph. Eyebrow, title, standing when relevant, and **View** are enough.
- Deeper branch cards retain summaries because visitors need more context after entering a section.
- A top-level card's content color comes from its section; the persistent header, navigation, focus treatment, and general site controls use the neutral silver action palette.

Current section mapping:

| Section | Content accent |
| --- | --- |
| Public Interest | blue |
| Products | red/coral |
| Publications | green |
| About | amber |
| Research | purple |

The source of truth is `src/app/bf-industrial-tokens.css`. Do not use these categorical colors as global shell accents or reinterpret the state colors for unrelated meaning.

## 2. Supporting context instead of a generic More dump

`SupportingContext` keeps useful depth on the World page without competing with the primary region map.

The order is intentional:

1. **Related paths** links appear first.
2. Additional body context follows.
3. **Explore further** inspections come last.

Links to immediate child cards are removed from Supporting Context because they duplicate the region grid. Additional actions use counted inline disclosure after the first four items.

When authoring a top-level node:

- Put the strongest orientation paragraph first in `body`; it becomes At a glance.
- Put only genuinely additive paragraphs after it.
- Do not add a `link` to an immediate child merely to repeat the card.
- Use cross-section links for useful next paths.
- Use `inspection` for bounded deeper explanation, claim calibration, or retained context—not for ordinary navigation.

## 3. Navigation and recovery

The Focus Path is the visitor's actual traversal history, not a breadcrumb derived from content ancestry.

- Clicking a content panel appends a traversal step.
- Once a panel has been entered, a previous step remains available.
- The current focus is not duplicated among the peer options.
- Rewinding to a previous history item truncates later traversal history.
- Home is the explicit history reset.
- Browser Back/Forward remains authoritative and URLs must reconstruct public state.
- On small screens the left rail moves above the content and its controls flow horizontally.

Do not rebuild Focus Path from `getAncestors`. Ancestry describes the content graph; traversal history describes the visitor's path through it.

## 4. Projection responsibilities

### World

World is the default and complete public reading surface. A visitor should not need to select another depth to understand the focal object. Branches use the shared hero, region grid, and supporting context. Leaves use a subject pane plus declared containment and typed relation ports.

### Evidence

Evidence is not another narrative page.

An object Evidence view answers:

- What is the current standing?
- Which claims does the record support?
- Which sources support each claim?
- What is explicitly outside the claim?
- What gate remains before promotion?
- Which changes to standing have been admitted?

A branch Evidence view summarizes evidence-bearing descendants, standing distribution, declared gates, and recent changes. It links into object Evidence views instead of flattening their full ledgers into the branch.

Use an explicit package in `src/lib/evidence-content.ts` when claim wording, source binding, or limits require editorial control. Generated profiles are acceptable for nodes whose canonical status, publication metadata, or semantic events supply a truthful bounded standing. A missing route-specific gate should remain visibly missing rather than being invented.

Source availability has three public meanings:

- `public` — a visitor can open the record.
- `retained` — the Lab records the source but does not expose it as a public link.
- `internal` — an internal register supports the statement; this is not independent public verification.

### Process

Process places the object in the Boundary First operating sequence. It should explain placement, dependencies, and operating movement rather than repeat World copy or act as a second content inventory.

### Retired Record depth

Do not add a Record renderer back. `view=record` is a compatibility input only and redirects to World or provenance. Content that is useful enough to retain belongs in World, Supporting Context, Evidence, or a clearly named retained public route.

## 5. Content and implementation boundaries

Canonical identity, path, parent, kind, status, and publication standing belong in the content registry. Hydration modules may add or refine public copy, links, and inspections; they should not silently upgrade lifecycle standing or overwrite provenance.

The active stylesheet cascade is intentionally layered. New rules should first determine whether they belong in the shared structural layer, the section-organization layer, or the Evidence layer. Avoid adding another late global stylesheet for a one-page correction when a scoped rule in the existing owner file will do.

Keep public wording bounded:

- Shipped means delivered or operated, not currently affiliated.
- Active development does not mean production-ready.
- Planned does not mean authorized, funded, or underway.
- Publication maturity does not validate the subject.
- First-party provenance does not become independent evidence.
- AI assistance does not become evidence or authority.

## 6. Closeout checklist

Before closing a page-system or content-structure phase:

- Confirm all five top-level pages still use the shared hero/card/context grammar.
- Confirm top-level cards remain concise and use **View**.
- Confirm Related paths precede prose and Explore further.
- Confirm immediate-child links are not repeated in Supporting Context.
- Confirm the shell uses the neutral action accent and Publications remains green.
- Confirm Public Interest and Research do not become unnecessarily tall at desktop widths.
- Confirm mobile collapses to one column without clipped copy or vertical button stacks in the top navigation.
- Confirm unavailable Evidence depth redirects to World.
- Confirm legacy `view=record` redirects canonically.
- Run `npm run verify`.
