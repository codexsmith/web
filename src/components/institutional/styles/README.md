# Institutional CSS architecture

Website v3 uses layered CSS Modules rather than a single route-spanning stylesheet.

## Layers

1. **InstitutionalFoundation.module.css**
   - institutional palette and design tokens
   - page root, header, footer, typography, BFUX/material language
   - homepage realization of the institutional grammar

2. **InstitutionalRouteShared.module.css**
   - route-level hero, lead/support copy, common section/status primitives
   - shared by institutional content routes

3. **Route modules**
   - Research, Products, Projects, Apparatus, Publications, About, and Open Lab
   - contain only route-specific projection rules

4. **composeCssModules.ts**
   - composes semantic class names across layers
   - preserves shared and local generated class names when selectors overlap

## Extension contract

For a new institutional route:

- import Foundation;
- import InstitutionalRouteShared;
- create one route-specific CSS Module;
- compose the layers with composeCssModules;
- put institutional design tokens in Foundation, not a route file;
- promote a route-local primitive into RouteShared only when it is genuinely reused;
- do not append route CSS to Foundation;
- preserve the BFUX rule: fixtures look mounted, controls look pressable, status color is semantic rather than decorative.

The architecture contract is enforced by `scripts/check_institutional_css_architecture.mjs`.


## Curated public-reader visual standard — design freeze

The curated publication layer uses `DoctrineFrontDoor.module.css` for a shared reader grammar across the 21 discovery routes. Foundation owns the institutional palette and chrome; the reader module inherits that palette and owns its local material tokens in one declaration. This is not permission to migrate or republish the retained reference routes.

The frozen composition consists of:

| Register | Treatment |
| --- | --- |
| Reading | Light editorial paper, Georgia headings, Arial body copy, restrained chapter ordinals and engraved seams |
| Institutional orientation | Existing wave mark, royal blue and aged gold; six supporting route glyphs; four decorative wide-screen masthead fields |
| Inspection | Matte information plates and reversible native disclosure; scientific figures with explicit scale, locally numbered navy caption bands and readable scope notes |
| Operation | Recessed light wells, navy local-teaching-model nameplates, native controls, derived readouts and gauges; no visual authority beyond the underlying model |
| Heritage | Warm paper and restrained seams for the attributed origin, human purpose, lineage and stewardship passages only |

All registers retain canonical text, reading order, route identity, attribution, evidence limitations and meaningful actions. Narrow screens reflow rather than lose knowledge. Decorative fields yield to space; forced colors use system colors; native keyboard focus, contrast and reduced-motion behavior remain mandatory. No status decoration may imply verification or authorization.

**Change boundary:** the visual design phase is closed. Future edits should address demonstrated defects, accessibility, content corrections or explicitly approved requirements, rather than accumulating speculative finish layers. New visual treatments must identify their semantic role and pass the existing reader acceptance checks. Visual design freeze is not release approval, accessibility certification, or public-disclosure authorization.

### Title-first metadata refinement

The approved refinement puts H1/H2 first, followed by the existing eyebrow and, where present, tagline or introductory sentence. A single responsive flex metadata row uses natural wrapping rather than fixed columns, duplicated labels, font shrinking, or CSS reordering. On wide screens short label/tagline pairs occupy one line; longer copy and narrow projections wrap while preserving the reading measure. Heading IDs, the homepage identity marker, original metadata text, links, and claim/status limits are preserved. Standalone section labels without a heading and card/figure labels retain their existing semantics. The browser witness checks title order, containment, non-overlap, visibility and representative wide/narrow Observatory states. No changes to the frozen page grid or operational models.


### Semantic type and whitespace hierarchy

Use size, weight, tracking, spacing and face together. A display heading establishes the page; the stronger serif section heading establishes a subject; a bold 1.5–1.875rem question establishes the purpose of a card; its uppercase .75rem audience is a quiet classification; 1rem explanatory copy keeps its 1.55 line height; .9375rem bold underlined links identify actions. The existing Georgia/Arial pairing is retained. A heading and audience label belong to one local sequence, followed by its description and a fine action seam. Long explanatory text and long labels must wrap; typography is not compressed to force a single line.

The local spacing tokens distinguish attached (6px), related (12px), grouped (24px), subject boundaries (20–36px per section edge) and panel insets (16–20px). Hero top padding is 24–64px, the legacy 252px entry-card height floor is removed, and chapter separations use two related-space units. The preserved grid, body text, focus clearance, touch targets and explicit claim boundaries take precedence over compactness. Browser acceptance compares actual computed font ratios, line-height, action affordance, geometric spacing and canonical Observatory card content, including compact and forced-color modes. More aggressive changes to grid topology and chapter ordinal placement are out of scope for this refinement.


### Semantic collection syntax

Collection layout expresses the relation among the children, not simply their shared component ancestry. The local typed renderer choices are gateway (primary whole-card traversal), pathways (peer questions with bounded actions), directory (named destinations with explicit standing and one action), reference (divided noninteractive title/body rows), comparison (a bounded row with positive and negative evidence limits), sequence (native ordered list with continuous seams), cases (separate scope-bearing plates), and parallel (peer capabilities/offers).

References and directories do not acquire action affordances just because they share a prior card implementation. Wide rows align labels and descriptions for scanning; narrow rows follow the same DOM order with no horizontal clipping. Observatory's three audience questions and Civic Record's three intended-use cases use three peer columns only at sufficiently wide viewports. Evidence types retain the exact two claim boundaries per object, side by side at wide widths and stacked within one row otherwise. Sequential stages remain chronological/ordered rather than forming disconnected card banks. Keep cases, scientific evidence, local controls, heritage and publication/claim status materially distinct. Preserve action labels, route identities, direct contact, native disclosures, focus and touch sizes, and all source wording. Browser witnesses check rendered row geometry, seams, destination and content identity, responsive comparisons, noninteractive reference semantics and explicit case limits. Repetition across entire pages remains a separate editorial review; this pass does not delete distinct orientation, evidence or trust statements.


### Semantic economy and contextual inheritance

Use the enclosing representation to supply context, rather than restating its name in every child. A collection heading names the collection; a directory member distinguishes its own identity and destination; a link names its action. A heading and eyebrow coexist only where they convey distinct information. Lead, tagline, and explanatory copy must advance understanding rather than repeat invitations. Do not shorten body copy merely to fit a layout.

Context-dependent labels are explicit model fields, not text parsed from a rendered heading. Preserve the full canonical label on an independently addressable page. A local claim or status limitation is not redundant merely because the page has a general disclaimer: fictional examples, evidence authority, attribution, release state, and participation boundaries remain legible where they govern interpretation. The Observatory is the first application: descriptive section headings absorb redundant eyebrows; exhibit-directory labels inherit their context; standalone exhibits retain complete identity; claim-bearing teaching and release qualifications remain unchanged. Acceptance checks compare local and independent projections to the model and inspect preserved claim boundaries, not only word count.
