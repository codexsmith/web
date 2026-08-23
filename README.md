# Boundary First Labs public site

The Boundary First Labs site is a multi-route Next.js application built around a typed content graph and a persistent navigation frame. Its public interface presents five top-level sections—Products, Public Interest, Publications, About, and Research—through one shared page system while preserving distinct section colors and content.

This is not a conventional collection of independently authored pages. Canonical content, route relationships, evidence standing, and presentation depth remain separate so the same subject can be understood as ordinary content, inspected as evidence, or placed in the Boundary First process without duplicating its narrative.

## Run locally

Requirements:

- Node.js 20.9 or newer
- npm

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a change

Run the full closeout suite before considering an interface or content phase complete:

```bash
npm run verify
```

This checks code quality, types, architectural contracts, the production build, redirects, and representative public routes. Individual checks remain available as `npm run lint`, `npm run typecheck`, `npm run contracts:check`, `npm run build`, and `npm run runtime:check`. The runtime check expects a current production build.

## Route and projection model

Every canonical graph node has a real route. Examples include:

```text
/
/?world=1
/products
/products/current/corpus-forge
/public-interest
/publications
/research
/research/software
/about
/about/provenance
```

The bare root is the entry threshold. `/?world=1` is the entered institutional world.

A content route can expose three depths:

- **World** is the default content-bearing surface.
- **Evidence** shows standing, sources, claim boundaries, gates, and admitted changes when evidence exists.
- **Process** places the focal object inside the Boundary First operating process.

The former `view=record` depth is retired. Legacy Record URLs redirect to the canonical World or provenance destination instead of maintaining a duplicate content surface.

## Current interface architecture

- `src/components/world-view.tsx` owns the shared hero, region-card grid, supporting context, branch layout, and leaf layout.
- `src/components/subject-pane.tsx` owns At a glance content, action ordering, and progressive disclosure.
- `src/components/world-app.tsx` owns focus, projections, real traversal history, and URL synchronization.
- `src/components/boundary-frame.tsx` owns the persistent shell, home recovery, history, peers, and depth controls.
- `src/components/evidence-view.tsx` owns object and portfolio Evidence presentations.
- `src/lib/content-registry.ts` combines canonical content and publication nodes into one registry.
- `src/lib/content-projections.ts` applies bounded editorial hydration without overwriting canonical identity or standing.
- `src/lib/evidence-content.ts` declares and derives Evidence profiles.
- `src/app/bf-industrial-tokens.css` defines the neutral shell palette and section accents.
- `src/app/section-hero-organization.css` defines the top-level hero, concise card, and supporting-context organization.
- `src/app/evidence-projection-refinement.css` defines the Evidence ledger presentation.

See [Public interface system](docs/PUBLIC-INTERFACE-SYSTEM.md) before changing a top-level section, navigation behavior, supporting context, or Evidence view.

## Content sources

The canonical graph begins in `src/lib/content.ts`; Publications are added through `src/lib/publication-portfolio.ts`. Content hydration modules such as `product-content.ts`, `research-content.ts`, `about-content.ts`, and `public-depth-content.ts` add bounded public copy over those canonical nodes.

Rich retained sources remain under `src/content` and `backlog`. They are source material, not automatically public UI. Promotion into a page requires editorial selection, an accurate maturity boundary, and an appropriate route or disclosure surface.

## Design invariants

Before adding an interaction or another representation, preserve these conditions:

1. Visitors can tell where they are and how they arrived.
2. Top-level pages inherit the same structural primitives.
3. Navigation labels describe the action directly; region cards use **View**.
4. The shell remains neutral while content inherits its section color.
5. Ordinary World pages contain enough content to stand on their own.
6. Evidence and Process deepen a subject without repeating its narrative.
7. Maturity, evidence, publication state, and institutional standing remain separate claims.
8. Mobile layouts preserve content and interaction semantics when spatial arrangements collapse.
9. Home is the explicit reset; ordinary traversal preserves a previous step.
10. Native browser Back/Forward and stable URLs remain authoritative.
