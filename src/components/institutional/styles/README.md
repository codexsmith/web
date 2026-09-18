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
