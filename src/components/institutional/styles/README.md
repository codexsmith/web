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
