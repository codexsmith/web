# Map, Domain Navigation, and Boundary First UX Follow-up Backlog

**Version:** 0.1  
**Date:** 2026-07-27  
**Scope:** Website navigation, domain information architecture, atlas/focus/relation maps, responsive behavior, accessibility, graph content integration, and non-artifact UX.

## Current implemented baseline

- Three map scales are distinguished: **Global atlas**, **Domain focus**, and **Relation context**.
- Semantic lenses no longer force users out of the current map scale.
- The institution-level domain view is organized as:
  1. Foundations
  2. Processes & formalization
  3. Programs & practice
  4. Applications & public use
  5. Evidence & stewardship
- Architecture stages use collapsible panels.
- Content-page links are primary; **View graph relations** is an explicit secondary action.
- The institution architecture no longer uses the graph inset or journey rail.
- Domain content pages return to the selected node's focus map.
- Same-route map changes update browser history and restore through Back/Forward.
- Map pages use the shared site header.
- Lint and production builds currently pass.
- **[Completed 2026-07-28]** Map node clicks navigate directly to the canonical `/domain/[slug]` page.
- **[Completed 2026-07-28]** Facet "Open record" actions correctly resolve to facet-specific domain pages.
- **[Completed 2026-07-28]** Fixed overlapping UI between the semantic legend and zoom controls.
- **[Completed 2026-07-28]** Cleaned up unstyled, redundant instructional text in the focus map header.

---

# Recommended target information architecture

The largest remaining structural issue is that `/map` still carries both a content-navigation experience and a graph-visualization experience.

Recommended destination model:

```text
/ or /start
  Guided introduction

/domains or /explore
  Canonical collapsible content architecture
  Foundations → processes → programs → applications → stewardship

/domain/[slug]
  Content-first record page

/map?mode=atlas
  Global graph visualization

/map?mode=focus&node=[id]
  Local internal graph structure

/map?mode=halo&node=[id]
  Mesoscopic relation context
```

This would let **Domains** consistently mean content navigation and **Atlas** consistently mean graph visualization.

---

# P0 — Navigation and state correctness

## NAV-001 — Resolve the remaining “Explore Atlas” ambiguity

**Problem:** The shared-header action is labeled **Explore Atlas**, but `/map` currently defaults to the institution content architecture rather than the global atlas.

**Recommended change:**

- Either point **Explore Atlas** to `/map?mode=atlas&node=identity&view=domains`; or
- Rename the current destination **Browse domains** and add a separate **Atlas** link.

**Acceptance criteria:**

- “Atlas” always opens the global atlas.
- “Domains” or “Browse domains” always opens the content architecture.
- No identically labeled control has different behavior on different pages.

## NAV-002 — Add a canonical domain-architecture route

Move or mirror the collapsible architecture at `/domains` or `/explore`.

**Acceptance criteria:**

- The architecture is directly linkable without map query parameters.
- The page uses the standard site header and footer.
- Map visualization state is not required to browse domain content.
- `/map` can default to the global atlas without losing the architecture.

## NAV-003 — Complete a route/destination matrix

Audit every header, breadcrumb, logo, CTA, map-scale control, footer icon, mobile selector, content-card link, and Back action.

Test at minimum:

| Origin | Action | Expected destination |
|---|---|---|
| Any page | Logo | Start page |
| Any page | Atlas | Global atlas |
| Any page | Domains | Domain architecture |
| Architecture | Node title | `/domain/[slug]` |
| Architecture | View graph relations | Selected node focus map |
| Domain page | View in map | Same node focus map |
| Focus map | Relation context | Same node relation context |
| Relation context | Domain focus | Same node focus map |
| Any map state | Browser Back | Exact prior state |

## NAV-004 — Centralize map URL parsing and serialization

Extract `MapState` handling from the page component.

Suggested interface:

```ts
type MapState = {
  mode: "atlas" | "focus" | "halo";
  nodeId: string;
  projection: MapProjection;
  relationId?: string;
};
```

**Acceptance criteria:**

- One parser validates incoming URLs.
- One serializer writes canonical URLs.
- Invalid combinations normalize deterministically.
- Unit tests cover every mode/projection/relation combination.

## NAV-005 — Review domain-page global navigation

Domain pages currently use an immersive “View in map” control rather than the standard site header.

Decide whether domain records should:

- use the full shared header; or
- retain an immersive header with a clearly available global navigation menu.

The current hybrid should not leave users without obvious access to Start, Domains, Institute, Work, Collaboration, and Search.

---

# P0 — Responsive and legibility defects

## UI-001 — Establish a formal viewport and zoom test matrix

Required widths:

- 360
- 390
- 768
- 1024
- 1280
- 1440
- 1920

Required browser zoom:

- 100%
- 125%
- 150%

For every combination, check:

- header wrapping and duplicate controls;
- panel clipping;
- inset overlap;
- fixed-footer overlap;
- nested-scroll traps;
- node-label readability;
- touch-target size;
- content reachable without manual page zoom.

## UI-002 — Remove nested-scroll ambiguity

The architecture, map canvas, inset, and page can each become independently scrollable.

**Acceptance criteria:**

- At most one primary vertical scroll container per breakpoint.
- Scrollbars clearly belong to their content.
- Keyboard and touch users can reach all content without getting trapped.
- Opening a panel does not hide its heading behind sticky navigation.

## UI-003 — Enforce minimum readable typography

Create explicit minimums:

- body and node-card labels: at least 13–14px;
- metadata: at least 10px with adequate weight;
- no essential text below 10px;
- avoid ultra-light weights;
- line height of at least 1.35 for dense labels.

Test Windows font rendering at 100% scaling and common 125%/150% display scaling.

## UI-004 — Recheck fixed and sticky UI collisions

Audit:

- site header;
- map mode/lens bar;
- semantic legend;
- journey rail;
- selection inset;
- mobile node selector;
- domain-page sticky return control.

No fixed element should obscure graph nodes, content headings, panel controls, or the last reachable item.

---

# P1 — Domain architecture refinements

## IA-001 — Move stage membership into graph content metadata

`domainArchitectureStages` currently hardcodes node IDs in the component.

Add canonical presentation metadata generated through `build_graph_context.py`, for example:

```json
{
  "architectureStage": "foundations",
  "architectureOrder": 20,
  "architectureParent": "boundary-theory"
}
```

**Acceptance criteria:**

- Every public non-identity node belongs to exactly one top-level stage.
- Duplicate and orphan memberships fail `graph:check`.
- Ordering is content-controlled rather than component-controlled.
- The UI does not invent institutional facts absent from canonical content.

## IA-002 — Decide accordion behavior

Evaluate:

- multiple panels open;
- exactly one panel open;
- first panel open by default;
- remember state during content-page round trips.

Recommended default: one panel open on narrow screens, multiple allowed on desktop.

## IA-003 — Preserve architecture state across content-page visits

When returning from a domain page, restore:

- open stage;
- prior scroll position;
- focused node;
- optional search/filter state.

Use URL state or session history rather than opaque global state.

## IA-004 — Add architecture search and filtering

Potential filters:

- stage;
- semantic family;
- entity role;
- research/practice/application;
- maturity/status where canonical data supports it.

Search must not imply that hidden results are absent from the corpus.

## IA-005 — Add short stage introductions

Each stage should explain:

- what belongs here;
- what does not;
- how it depends on the prior stage;
- what kind of validation or evidence applies.

Keep copy sourced from the canonical JSON and Boundary First UX guide.

## IA-006 — Show dependency without recreating an edge wall

Consider restrained dependency affordances:

- “Builds on” text;
- parent breadcrumb;
- small dependency count;
- optional reveal-on-demand connector view.

Avoid drawing all cross-stage graph edges in the architecture page.

---

# P1 — Map interaction and graph refinement

## MAP-001 — Reassess whether Domain focus needs the large side inset

For selected domains, consider:

- a compact summary drawer;
- an inline content-page CTA;
- showing the inset only after facet selection;
- moving full descriptive content entirely to `/domain/[slug]`.

The focus map should primarily explain local structure, not duplicate the content page.

## MAP-002 — Retire or redesign the journey rail

Current risks:

- too many unlabeled icons;
- unclear ordering;
- visual competition with scale and lens controls;
- accidental graph navigation;
- poor small-screen fit.

Options:

1. remove it;
2. convert it to a labeled “previous/next domain” control;
3. show it only during the guided sequence;
4. replace it with an accessible domain index.

## MAP-003 — Improve graph-node label fitting

Create deterministic rules for:

- maximum lines;
- minimum font size;
- abbreviation;
- tooltip/full-label reveal;
- long-word handling;
- selected-node enlargement.

Never resolve label problems solely by shrinking text.

## MAP-004 — Reduce long, crossing, or misleading edges

Add:

- typed edge routing;
- local bundling where appropriate;
- edge suppression below semantic zoom thresholds;
- hover/focus isolation;
- explicit cross-stage or cross-domain markers;
- collision tests for labels and nodes.

## MAP-005 — Make graph actions explicit and reversible

Every graph interaction should distinguish:

- select;
- inspect facet;
- open relation;
- open content record;
- change scale;
- change lens.

The interface should always provide a visible path back to the exact previous state.

## MAP-006 — Revisit zoom behavior

Test:

- first-load fit;
- reset behavior;
- trackpad;
- mouse wheel with modifiers;
- keyboard controls;
- touch pinch;
- browser zoom interaction.

Map zoom should not be required to compensate for page-layout scaling.

---

# P1 — Relation Context and semantic content

## HALO-001 — Audit all inset and relation copy for placeholders

Search for generic text such as:

- “A facet related through facet affinity.”
- inferred authority statements;
- fallback evidence;
- generic closure language.

Replace only where canonical semantic records exist. Missing data should remain visibly missing rather than being invented.

## HALO-002 — Validate facet-to-domain relation generation

Check:

- duplicated nodes;
- repeated theoretical facets;
- incorrect parent resolution;
- relation records pointing to identity;
- horizon nodes appearing in the close band;
- projection filters changing structural meaning.

## HALO-003 — Clarify selected-relation state

When a relation is selected:

- highlight only the selected edge and endpoints;
- dim unrelated elements without making them illegible;
- expose relation type, authority, evidence, status, and closure;
- provide content-page links for both endpoints;
- preserve selection in the URL.

## HALO-004 — Review semantic legend variants

The map and architecture use different encodings.

Maintain one semantic system, but ensure each surface explains only the encodings it actually uses.

---

# P1 — Accessibility

## A11Y-001 — Full keyboard interaction audit

Verify:

- logical tab order;
- visible focus;
- collapsible panel operation;
- map-node activation;
- no keyboard traps;
- Escape behavior for overlays;
- focus restoration after closing records or returning from maps.

## A11Y-002 — Screen-reader naming audit

Avoid repeated or ambiguous names such as:

- “Map” versus “Atlas”;
- “Home” versus “Domain architecture”;
- node label repeated with its entity type;
- several “Open record” controls without context.

## A11Y-003 — Reduced-motion support

Respect `prefers-reduced-motion` for:

- Framer Motion transitions;
- graph movement;
- zoom animation;
- hover translations;
- panel transitions.

## A11Y-004 — Contrast and non-color encoding

Confirm every semantic color family is accompanied by:

- stage;
- role/type label;
- shape where applicable;
- text description.

Test active, hover, dimmed, disabled, and selected states.

---

# P1 — Content build and validation

## DATA-001 — Extend `build_graph_context.py` for architecture metadata

The builder should:

- copy validated architecture stage/order metadata;
- report missing node IDs;
- reject duplicate IDs;
- reject unknown parents;
- validate canonical URLs;
- emit a summary of architecture membership.

## DATA-002 — Add graph-content regression tests

Test invariants:

- unique node IDs;
- all stage members exist;
- every public node is reachable;
- facet slugs are stable;
- relation IDs are unique;
- record links resolve;
- no placeholder record silently replaces canonical content.

## DATA-003 — Document when graph build commands must run

Add a short contributor guide covering:

- source of truth;
- generated outputs;
- `graph:dry-run`;
- `graph:check`;
- `graph:test`;
- `graph:build`;
- expected diffs;
- how manual UI metadata survives regeneration.

---

# P2 — Content-page improvements

## CONTENT-001 — Add an in-page table of contents

Generate a compact TOC from available sections:

- overview;
- takeaways;
- facets;
- claims;
- evidence;
- lineage;
- governance;
- work;
- artifacts when present.

## CONTENT-002 — Add “Where this sits” context

Each domain page should expose:

- architecture stage;
- immediate parent or dependency;
- neighboring nodes;
- content-page links;
- explicit **View in map** action.

## CONTENT-003 — Reduce duplicated map/content copy

Assign responsibilities:

- architecture: browse and orient;
- content page: read and inspect records;
- focus map: understand internal structure;
- relation context: inspect local relationships;
- atlas: understand the whole system.

## CONTENT-004 — Improve missing-content states

Use explicit bounded states:

- not yet published;
- classification present, evidence missing;
- proposed, not adopted;
- reserved for review;
- source record unavailable.

Do not fill gaps with generic promotional prose.

---

# P2 — Testing, performance, and maintainability

## TEST-001 — Add browser interaction tests

Automate:

- header destination matrix;
- architecture panel toggling;
- content-page round trip;
- explicit graph action;
- scale transitions;
- projection changes;
- URL normalization;
- Back/Forward restoration;
- mobile menu behavior.

## TEST-002 — Add screenshot regression coverage

Capture key states at 100%, 125%, and 150%:

- architecture;
- global atlas;
- selected domain focus;
- selected facet;
- relation context;
- long-label node;
- mobile menu;
- domain content page.

## PERF-001 — Profile graph initialization

Measure:

- D3 simulation startup;
- cached-node reuse;
- route transition cost;
- hydration delay;
- large JSON parsing;
- hidden map components still performing work.

The content architecture route should not load D3 or Framer Motion unless graph exploration is requested.

## CODE-001 — Split the oversized map page

Candidate modules:

- `map-state.ts`
- `map-mode-header.tsx`
- `map-selection-inset.tsx`
- `map-journey.tsx`
- `projection-content.ts`
- `map-route-state.test.ts`

## CODE-002 — Consolidate navigation configuration

Define header labels and destinations once. Reuse them across desktop, mobile, standard, and minimal headers.

---

# Suggested delivery order

## Milestone 1 — Stable navigation

1. NAV-001
2. NAV-002
3. NAV-003
4. NAV-004
5. NAV-005
6. TEST-001

## Milestone 2 — Responsive and accessible architecture

1. UI-001
2. UI-002
3. UI-003
4. IA-001
5. IA-002
6. IA-003
7. A11Y-001 through A11Y-004

## Milestone 3 — Map simplification

1. MAP-001
2. MAP-002
3. MAP-003
4. MAP-004
5. MAP-005
6. MAP-006

## Milestone 4 — Semantic and content integrity

1. HALO-001 through HALO-004
2. DATA-001 through DATA-003
3. CONTENT-001 through CONTENT-004

## Milestone 5 — Hardening

1. TEST-002
2. PERF-001
3. CODE-001
4. CODE-002

---

# Work log

## Completed 2026-07-28 - canonical navigation and record orientation pass

- **NAV-001 completed:** all shared header, mobile menu, and footer Atlas
  entries now use the deterministic global destination
  `/map?mode=atlas&node=identity&view=domains`.
- **NAV-002 completed:** `/domains` is the canonical collapsible content
  navigator and now uses both the standard shared header and footer.
- **NAV-003 advanced:** shared destinations are represented by tested route
  helpers; the Domains/Atlas distinction, immersive header, mobile menu, and
  footer were browser-verified. A full route matrix across legacy page-local
  links remains useful.
- **NAV-005 completed:** domain records retain the immersive shared header with
  its global mobile menu and now include the standard footer.
- **IA-003 advanced:** domain records link back to their exact architecture
  stage and selected node. The architecture restores the stage, visually marks
  the record, scrolls it into view, and moves keyboard focus to it.
- **UI-002 advanced:** the domain-record sidebar no longer creates an
  independent vertical scroll container.
- **UI-003 advanced:** architecture role labels were raised from 8px to the
  explicit 10px essential-text floor.
- **CONTENT-002 advanced:** domain records now expose a "Where this sits"
  panel with architecture stage, stage description, previous/next records, a
  stage return action, and the separate explicit View in map action.
- **CODE-002 completed:** primary and immersive header destinations, Atlas and
  Domains constants, active-route matching, and domain/map round-trip URL
  builders now live in `src/lib/site-navigation.ts`.
- Added route-contract unit coverage in
  `src/lib/site-navigation.test.ts`.

### Verification

- `npm run lint` - passed with no errors; six pre-existing unused-symbol
  warnings remain in unrelated components.
- `npm run test:ui -- --run` - 14 tests passed.
- `npm run graph:check` - 29 nodes validated; generated graph files current.
- `npm run build` - production build passed.
- Browser checks passed at 1440x900 and 390x844 for architecture navigation,
  mobile menu, single-panel mobile accordion behavior, content-page round trip,
  selected-node restoration, record-page scrolling, deterministic Atlas entry,
  horizontal overflow, and console errors.

## Completed 2026-07-28 - architecture discovery and record navigation pass

- **IA-004 completed:** `/domains` now supports full-text search over domain
  labels, titles, descriptions, roles, and facets plus an explicit architecture
  stage filter.
- Search and stage filtering use a native GET form. The state is atomic,
  directly linkable, keyboard-compatible, and available before client-side
  hydration.
- Filtered views expose both result count and corpus count, state explicitly
  that hidden records remain in the corpus, and provide a bounded no-results
  state.
- **IA-003 advanced:** architecture search, stage filter, open stage, selected
  node, and focus target survive the content-page round trip through validated
  same-site return URLs. Browser Back continues to preserve the prior scroll
  position.
- **CONTENT-001 completed:** long domain records now generate a compact
  "On this page" index from the sections actually available on each record.
- Claims and evidence-source records are exposed as separate anchored details
  sections. A TOC deep link opens a collapsed details section before focusing
  its content.
- Takeaways, dependencies and relations, record sections, the Facets section,
  and every individual facet heading now have direct anchors.
- Architecture role and facet search behavior is covered by pure unit tests;
  route tests cover filter preservation and rejection of external return
  destinations.
- Browser verification found and eliminated a client-router submission race by
  replacing it with progressive-enhancement form navigation.

### Verification

- `npm run lint` - passed with no errors; the same six unrelated unused-symbol
  warnings remain.
- `npm run test:ui -- --run` - 20 tests passed across 3 test files.
- `npm run graph:check` - 29 nodes validated; generated graph files current.
- `npm run build` - production build passed.
- Browser checks passed for search, stage filtering, clear state, filtered
  content links, validated return state, selected-node focus, TOC anchors,
  automatic details expansion, mobile layout, console errors, and 100/125/150
  percent zoom-equivalent viewport matrices.
- The zoom matrix found no horizontal overflow, control overlap, nested record
  scrollers, or TOC target below 40px.

## Completed 2026-07-28 - publication-readiness and map simplification pass

- **MAP-001 completed:** the default Domain focus inset is now a compact,
  content-specific selected-domain summary. The larger detail surface appears
  only after an explicit facet or relation selection.
- **MAP-002 completed:** the fixed journey rail, dense icon sequence, mobile
  node select, and duplicate Next controls were removed from every map mode.
  Global / Domain / Relations is now the single map-scale model.
- **MAP-003 advanced:** Domain focus has a dedicated, constrained mode header
  with explicit Domain tree and Relations actions. Projection lenses remain
  hidden in focus and operate only in Atlas or Relation context.
- **NAV-003 completed for public Atlas entry points:** remaining page-local
  `/map` destinations now use the deterministic global Atlas URL. Atlas node
  activation opens the canonical domain record, whose explicit View in map
  action opens the bounded focus map.
- The record overlay was retired from the map. Full content now lives only on
  `/domain/[slug]`; the map supplies summary, status, source context, and
  navigation.
- Atlas and facet-selection copy now names the selected domain or relation
  instead of presenting generic placeholder-style summaries.
- Initial graph scale is now mode- and breakpoint-aware. At 390x844 the focus
  map begins at 130% instead of the clipping 165%; at 1440x900 the global atlas
  begins at 88% so all 29 rendered nodes remain inside the canvas.
- Full-atlas node descriptions were removed from the marks while accessible
  names retain the record destination. Larger visible labels now prioritize
  scanability and reduce micro-text.
- The guided first-passage rail retains horizontal swipe behavior on small
  screens without exposing a native scrollbar.
- Public V1/V2 preview-switch links were removed from the launch UI.
- Canonical titles and descriptions were added for Atlas, Domains, domain
  records, Institute, Work, Collaboration, Enterprise, and Search.
- Added `robots.txt`, a 35-URL sitemap containing 28 public domain records, and
  a branded, no-index 404 recovery page.
- Root canonical metadata is scoped to the homepage rather than inherited by
  unknown routes; invalid artifact slugs now return the same real HTTP 404
  instead of a visually missing record with a success status.
- Cleared the six pre-existing lint warnings in the guided-sequence visual
  components.

### Verification

- `npm run lint` - passed with zero errors and zero warnings.
- `npm run test:ui -- --run` - 20 tests passed across 3 test files.
- `npm run graph:check` - 29 nodes validated; generated graph files current.
- `npm run build` - production build and TypeScript checks passed.
- Production-mode browser checks passed at 1440x900 and 390x844 for Atlas,
  Domain focus, Relation context, projection changes, facet selection,
  atlas-to-record-to-map navigation, mobile menu, domain tree, guided first
  passage, branded 404, horizontal overflow, clipped graph nodes, and console
  warnings/errors.
- `robots.txt` and `sitemap.xml` return HTTP 200; the sitemap contains 35 URLs,
  including all 28 public domain records. An unknown route returns HTTP 404.

# Recommended morning publish checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the exact production origin
   `https://boundaryfirstlabs.com`.
2. Run `npm run graph:check`, `npm run test:ui`, and `npm run build` from a clean
   deployment checkout.
3. Deploy the production build without regenerating graph content unless the
   canonical source files changed after this log entry.
4. On the live origin, verify `/`, `/domains`, one `/domain/[slug]` record,
   `/map?mode=atlas&node=identity&view=domains`, `/robots.txt`, `/sitemap.xml`,
   and one unknown path.
5. Confirm the Open Graph image resolves on the live origin and inspect the
   first live mobile load for font delivery, map completion, and console
   errors.

After publication, the next implementation cluster should be **TEST-002 +
PERF-001**: automate the map-mode/viewport regression matrix and move graph
layout computation off the first interactive frame or persist a deterministic
precomputed atlas layout.

---

# Launch and post-publication task register - 2026-07-28

This register extends the UX backlog beyond the graph itself. It separates
actions required at the production boundary from work that can safely follow a
successful release. Priority describes release impact, not conceptual
importance.

## Completed 2026-07-28 - final publication polish pass

- **NAV-006 completed:** removed the duplicate Atlas destination from the
  default desktop and mobile navigation. `Explore Atlas` is now the single
  Atlas call to action, while the normal navigation retains Domains as the
  content-tree destination.
- **NAV-007 completed:** aligned footer language with the header: Institute,
  Collaborate, and Enterprise Practice.
- **A11Y-005 advanced:** the global Atlas now has a semantic page heading,
  compact guided-scene controls have descriptive accessible names, and the
  shared mobile menu plus Atlas secondary action meet deliberate touch-target
  sizing.
- **INTRO-001 completed:** guided scenes now restore valid `?scene=N` deep
  links on the first render, update the URL as the visitor moves, and return
  scene zero to the clean canonical `/` URL. The behavior also applies to the
  retained, unlinked V2 route.
- **SEO-001 advanced:** added an install manifest, theme color, Open Graph site
  identity and locale, and Organization/WebSite JSON-LD. Atlas document naming
  is now consistently "Research Atlas."
- **SEC-001 advanced:** upgraded Next.js and its lint configuration from
  16.2.10 to 16.2.12, moved the build-only `shadcn` CLI out of runtime
  dependencies, removed the framework disclosure header, and added safe
  baseline content-type, framing, referrer, and permissions headers.
- **DATA-002 advanced:** repaired the graph-builder regression fixtures for
  required architecture stage/order metadata and the present 29-node corpus.
  All seven Python regression tests now pass.
- Renamed the package from the scaffold placeholder `temp_app` to
  `boundary-first-labs-web`.

### Verification

- `npm run lint` - passed with zero errors and zero warnings.
- `npm run test:ui -- run` - 20 tests passed across 3 test files.
- `npm run graph:test` - 7 Python regression tests passed.
- `npm run graph:check` - 29 nodes validated; 0 artifacts; generated files
  current.
- `npm run build` - production build and TypeScript checks passed on Next.js
  16.2.12.
- Production-mode browser checks passed at 1440x900 and 390x844 across the
  homepage, guided deep link, Domains, a long domain record, Atlas, focus,
  relation context, Search, Work, Institute, Collaboration, Enterprise, and
  the branded 404. Every checked route had one page heading, no horizontal
  overflow, and no browser console errors.
- HTTP checks returned 200 for the manifest, robots file, sitemap, and primary
  routes; an unknown route returned 404; the sitemap retained 35 URLs.
- Security-header checks confirmed no `X-Powered-By` disclosure plus
  `nosniff`, `DENY` framing, strict-origin referrer policy, and disabled camera,
  geolocation, and microphone permissions.
- `npm audit --omit=dev` reduced from 7 findings (5 high) to 3 high findings.
  The remaining PostCSS and Sharp findings are transitive dependencies of the
  latest available Next.js 16.2.12 and are tracked in REL-006 rather than
  overridden outside the framework's declared compatibility range.

## Completed 2026-07-28 - publication suite first public slice

- **PUB-001 completed:** added `/publications` as a bounded publication index
  distinct from the graph artifact index and the Work portfolio.
- **PUB-002 completed:** added
  `/publications/civilizational-mechanics` as an accessible long-form
  publication containing the suite's 6 phases, 12 expandable learning steps,
  10 root lenses, 8 expandable repair routes, claim ceiling, and links back to
  canonical domain records.
- **PUB-003 completed:** publication discovery now exists from Work & Evidence,
  Search, the footer, and the sitemap without adding another top-level header
  item. Search terms cover the publication's doctrine, mechanisms,
  consequences, repairs, root lenses, and repair-route fields.
- **SEO-003 completed:** the default production origin, environment example,
  canonical metadata, robots sitemap reference, sitemap URLs, and publication
  Article JSON-LD now use `https://boundaryfirstlabs.com`.
- **A11Y-008 advanced:** the publication uses native disclosures, named
  contents navigation, reduced-motion-safe static content, text alternatives
  for planned visuals, and 40px-or-greater compact controls. Footer text links
  now also expose deliberate touch targets.
- **CONTENT-006 clarified:** zero public paper artifacts is an accepted launch
  state. Publications are public interpretation and learning routes; they do
  not manufacture artifact maturity or evidence status.

### Verification

- `npm run lint` - passed.
- `npm run test:ui -- run` - 20 tests passed.
- `npm run graph:test` - 7 tests passed.
- `npm run graph:check` - 29 nodes validated; 0 artifacts; generated files
  current.
- `npm run build` - passed with both publication routes statically rendered.
- Production-mode browser checks passed at 1440x900 and 390x844 for the
  publication index, full publication, contents rail, learning-step
  disclosure, Search discovery, footer discovery, headings, and horizontal
  overflow. No browser console errors were recorded.
- The sitemap now contains 37 URLs, including both publication routes, and all
  generated sitemap/robots origins use `https://boundaryfirstlabs.com`.

## Completed 2026-07-28 - interactive publication mechanics phase

- **PUB-007 completed:** implemented the suite's six priority interaction
  surfaces in one bounded lab: nested interiors, boundary accounting,
  business/AI agency rate, radial root lenses, the Boundary First cycle, and
  the root-to-repair router.
- All projections use curated semantic structure. D3 supplies hierarchy,
  radial, arc, and path mechanics without allowing force simulation to invent
  theoretical hierarchy or authority.
- **PUB-008 completed for the v0.1 local workflow:** mechanic, root-lens, and
  repair-route state is directly linkable and restores on reload. Free-text
  problem descriptions remain local, are excluded from the URL, are never
  submitted, and reset on reload.
- The repair router recommends one of 8 typed routes from the selected root
  lens, exposes all alternatives, collects the 6 minimum closure fields, and
  generates a copyable repair packet with route outputs, closure test, and an
  explicit non-diagnostic claim boundary.
- **A11Y-009 completed for this slice:** the mechanic rail implements roving
  tab focus with arrow, Home, and End navigation; every control is named and
  keyboard operable; SVGs have titles/descriptions; and live status text
  communicates trace, audit, copy, and completion results.
- Narrow screens use explicit vertical semantic fallbacks instead of shrinking
  SVG labels into microtext. The repair router uses normal page flow rather
  than nested vertical scrollers.
- Added 4 pure URL-state regression tests for mechanic, lens, route, and clean
  default-anchor serialization.

### Verification

- `npm run lint` - passed.
- `npm run test:ui -- run` - 24 tests passed across 4 test files.
- `npm run graph:test` - 7 tests passed.
- `npm run graph:check` - 29 nodes validated; 0 artifacts; generated files
  current.
- `npm run build` - passed; the publication remains statically rendered.
- Production-mode desktop interaction checks passed for all 6 mechanics,
  transfer tracing, accounting-boundary recalculation, review-gate changes,
  root selection, complete four-question audit, route selection, repair-packet
  generation, and direct URL restoration.
- Production-mode checks at 390x844 confirmed no horizontal overflow, no
  undersized controls, no nested vertical scrollers, readable mobile
  fallbacks, and no browser console errors.

## P0 - production boundary and release decision

| ID | Task | Acceptance criteria |
| --- | --- | --- |
| REL-001 | Confirm the production origin | Source defaults and `.env.example` now use `https://boundaryfirstlabs.com`. Confirm the deployment environment uses that exact HTTPS origin, with no preview or trailing-path value, and verify canonical, sitemap, Open Graph, and JSON-LD URLs on the live host. |
| REL-002 | Run the immutable release gate | From the exact deployment checkout, `npm ci`, `npm run graph:check`, `npm run lint`, `npm run test:ui -- --run`, and `npm run build` all pass without regenerating canonical graph content. |
| REL-003 | Perform a live-origin smoke test | Verify `/`, `/domains`, one long domain record, Atlas, focus, relation context, Publications, Civilizational Mechanics, Search, Work, Institute, Collaboration, Enterprise, manifest, robots, sitemap, and a real 404 on desktop and one physical phone. |
| REL-004 | Verify public communication paths | `contact@boundaryfirst.com` is owned, monitored, and accepts delivery; every mail action uses that address and communicates the expected response boundary. |
| REL-005 | Establish rollback | Record the deployed commit/archive, previous production version, environment values, deployment time, and a tested one-command or one-click rollback path. |
| REL-006 | Resolve or accept the residual dependency finding | `npm audit --omit=dev` still reports the PostCSS and Sharp packages bundled by Next 16.2.12. Confirm that no untrusted CSS build input or `next/image` path exists, record a time-bounded exception if policy permits, and upgrade as soon as Next publishes compatible patched transitive versions. A zero-high policy blocks release. |
| REL-007 | Validate social and search presentation | Test the live Open Graph card, favicon, manifest, robots, sitemap, canonical tags, JSON-LD, and page titles with production-origin tools; capture results in the release log. |

## P1 - first seven days after publication

| ID | Task | Acceptance criteria |
| --- | --- | --- |
| OBS-001 | Add privacy-bounded error telemetry | Client and server exceptions, failed route loads, and graph initialization failures are observable without collecting page content, search terms, or unnecessary identity data. Alert ownership and retention are documented. |
| OBS-002 | Establish a real-user performance baseline | Capture Core Web Vitals by route and viewport, especially Atlas first interaction, font loading, and long domain records; record p50/p75 targets before optimizing. |
| TEST-002 | Automate the visual regression matrix | Store stable screenshots for homepage scenes, domain tree, domain record, Atlas, focus, and relation context at 390, 768, 1024, and 1440 widths plus 100/125/150 percent zoom equivalents. |
| TEST-003 | Add a live link and metadata checker | CI fails on broken internal links, accidental preview labels, invalid canonical URLs, missing descriptions, sitemap drift, manifest failure, or success-status missing pages. |
| A11Y-001 | Complete keyboard and focus testing | Every header, accordion, scene, map control, legend, facet, and relation flow works without a pointer; focus is visible and moves predictably after route and disclosure changes. |
| A11Y-006 | Add a shared skip link and main-target contract | Every public route exposes one reliable `#main-content` target and a visible-on-focus skip link without creating duplicate landmark names. |
| A11Y-007 | Run screen-reader and high-contrast checks | Test one Windows screen reader, landmark/headings, expanded states, map alternatives, forced colors, 200 percent zoom, and reduced motion; log defects by route. |
| PERF-001 | Profile and stabilize graph initialization | Measure layout, paint, scripting, and interaction time; precompute or persist deterministic atlas coordinates if layout work remains on the first interactive frame. |
| PERF-002 | Optimize publication assets | Produce a purpose-sized 1200x630 Open Graph image, confirm font subsets, remove unused scaffold SVGs only after reference checks, and enforce practical asset-size budgets. |
| SEO-002 | Register the live corpus | Submit the sitemap to relevant webmaster tools, validate structured data, confirm indexing policy for all 28 domain records, and record intentional exclusions. |
| CONTENT-005 | Perform the canonical editorial sweep | Review every public domain title, short description, architecture role, facet, status statement, source, limitation, and action for placeholder language, unsupported authority, duplication, and inconsistent terminology. |
| CONTENT-006 | Preserve the intentional zero-artifact boundary | No paper artifact is required for launch. Before the first artifact is exposed, document and enforce its minimum source, status, evidence, maintenance, correction, and closure fields; publications must not bypass this gate. |
| SEC-002 | Add dependency and release security automation | Run production-only audit/SBOM checks in CI, subscribe to framework advisories, define severity policy and exception expiry, and schedule patch updates independently from feature work. |
| PUB-004 | Promote publication source data | Move the validated runtime content from backlog provenance into a versioned `src/content/publications` source contract while retaining the suite package as immutable provenance. Build fails on schema drift, duplicate IDs, missing phase steps, or empty required fields. |
| PUB-005 | Complete the public-copy and source review | Review every doctrine sentence, mechanism, consequence, repair, and closure test for claim ceiling, sourcing, unintended universality, legal/empirical implication, terminology, and correction ownership. |
| PUB-006 | Decide controlled downloads | Decide whether the doctrine brief, implementation brief, and slide deck should be public downloads. If published, serve approved versions from durable public paths with size, format, version, accessibility, and supersession metadata. |

## P2 - refinement after operational evidence

| ID | Task | Acceptance criteria |
| --- | --- | --- |
| UX-005 | Decide the guided V2 disposition | Compare the retained `?version=v2` experience against the canonical first passage, then promote, remove, or move it behind an explicit non-indexed preview boundary. No unlabeled duplicate public experience remains. |
| UX-006 | Make Search state shareable | Query and filters round-trip through validated URL parameters, browser Back restores results and focus, empty/error states remain bounded, and private query analytics are not introduced by default. |
| UX-007 | Add contextual visitor feedback | A small, optional route-aware feedback path distinguishes factual correction, broken interaction, accessibility issue, and collaboration inquiry without implying endorsement or guaranteed response. |
| MAP-007 | Revisit mobile Atlas detail strategy | Use real-user evidence to decide whether the full atlas should default to overview, guided subsets, or a list/map handoff on narrow screens; preserve access to every record and semantic relation. |
| MAP-008 | Reduce residual edge ambiguity | Score long crossings and coincident labels in deterministic layouts, add visual regression fixtures for known dense clusters, and change only edges whose semantic source data is verified. |
| CODE-001 | Split map orchestration | Separate URL state, projection narrative, mode controls, selection detail, and layout orchestration into tested modules without duplicating map semantics. |
| DOC-001 | Replace scaffold documentation | Replace the generic Next.js README with project-specific setup, graph-build rules, validation commands, environment contract, deployment procedure, and rollback notes. |
| GOV-001 | Publish change and correction operations | Define how public records are corrected, withdrawn, superseded, or retired; make responsible owner, effective date, and closure state visible where consequence warrants it. |
| PUB-009 | Evaluate and expand the mechanics | After real-user observation, refine examples and instructions, measure where visitors abandon or misclassify a relation, and add only interactions that improve a defined learning objective. Preserve the static/public doctrine path. |
| PUB-010 | Version the repair-packet contract | Define a versioned, machine-readable packet schema and optional local download. Keep free text client-local by default; any future storage or sharing requires explicit consent, retention, deletion, and confidentiality boundaries. |

## Release evidence to retain

For each publication, retain:

1. source revision or immutable archive identifier;
2. production origin and non-secret environment-variable names;
3. graph-validation node/artifact counts;
4. lint, unit, production-build, dependency-audit, and live-smoke results;
5. desktop and mobile screenshots of the homepage, domain tree, one record,
   Atlas, focus, and relation context;
6. known exceptions with owner, consequence, mitigation, and expiry;
7. rollback target and the person authorized to invoke it.
