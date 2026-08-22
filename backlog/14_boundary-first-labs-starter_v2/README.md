# Boundary First Labs Starter

A starter Next.js implementation of the Boundary First Labs staged sitemap and interaction model.

This is intentionally not a conventional marketing-site template. It treats the site as a bounded digital space with a typed content graph underneath a tree-oriented, spatial navigation system.

## Core interaction grammar

- Click changes focus and traverses the graph.
- Direction communicates the relationship that was traversed.
- Gestalt zoom changes the containing whole while preserving the focal object.
- Through-inspection opens evidence without changing conceptual location.
- The Boundary Frame preserves global context, location, and recovery controls.
- Every meaningful node still has a real URL and browser Back/Forward remains authoritative.

## Included

- Next.js App Router + TypeScript
- Catch-all, web-native routes for the knowledge tree
- Typed content nodes and graph edges
- Four root worlds: Products, Public Interest, Research, About
- Software research lane with starter doctrine nodes
- Public-interest Augusta civic-infrastructure project node
- Traditional hero -> threshold -> root-world landing sequence
- Hero logo -> world anchor -> frame/home mark transition concept
- Persistent Boundary Frame
- Parent/child/sibling/cross-graph transition grammar
- Focus-preserving Gestalt Zoom controls
- Search overlay
- Through-inspection overlay
- Reduced-motion handling
- Mobile fallback that preserves semantics even when the spatial layout compresses
- No animation library or icon library yet; the starter keeps the dependency boundary small

## Run it

Requirements:

- Node.js 20.9 or newer
- npm, pnpm, yarn, or bun

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Route examples

```text
/
/products
/public-interest
/public-interest/augusta-civic-infrastructure
/research
/research/software
/research/software/executable-representation
/research/software/boundary-first-ux
/research/foundations/distinction-space
/research/formal-theory/boundary-theory
/about
```

The root URL `/` plays the introductory landing sequence. Returning home from inside the world uses `/?world=1` so the root world can be recovered without forcing the arrival sequence to replay.

## Content graph

All initial content structure lives in:

```text
src/lib/content.ts
```

A `ContentNode` carries:

- stable ID
- route path
- parent ID
- ontological kind
- label and summary
- optional body content
- optional through-inspection artifacts

A `GraphEdge` carries a typed cross-tree relationship such as:

- grounds
- implements
- demonstrates
- depends-on
- applies-to
- extends
- instantiates

This is the important architectural boundary: the UI should render the semantics in the content model rather than infer meaning from arbitrary page layout.

## Focus vs. gestalt

The client state intentionally separates two concepts:

```text
focusId    = the object the visitor is following
gestaltId  = the boundary currently treated as the operative whole
```

Example:

```text
Focus: Boundary First UX
Gestalt: Boundary First UX

zoom out

Focus: Boundary First UX
Gestalt: Software

zoom out

Focus: Boundary First UX
Gestalt: Research

zoom out

Focus: Boundary First UX
Gestalt: Boundary First Labs
```

At each zoom level the focus remains intact while its containing context becomes the visible world.

## Gestalt compactification

The current starter implements the state model and world replacement needed for compactification, but the visual representation is still deliberately simple.

The intended next step is not to shrink every child card indefinitely. Instead, lower-order complexity should resolve into higher-order objects:

```text
APIs + schemas + contracts + state + tests
                ->
      Boundary First Engineering
                ->
              Software
                ->
              Research
                ->
        Boundary First Labs
```

A production implementation can give each scale its own morphology, much like RTS/city-builder interfaces change what is rendered as the camera moves between local, district, and world scales.

## Literal browser zoom experiment

The conceptual design calls for browser zoom to participate in gestalt control: zooming outward should allow the current world to compact into its containing world.

This starter does **not** intercept Ctrl/Cmd +/- or prevent native browser zoom. Native browser zoom is an accessibility control and must remain reliable.

A safe experiment should be added as an adapter, not baked into navigation. Candidate signals include:

- `window.visualViewport`
- changes to effective CSS viewport width
- `devicePixelRatio`
- explicit semantic zoom controls as the authoritative fallback

The adapter should satisfy these invariants:

1. Native text enlargement still works.
2. No content becomes inaccessible at 200%+ browser zoom.
3. Responsive device-width changes are not blindly mistaken for epistemic zoom.
4. Gestalt can always be controlled explicitly without browser shortcuts.
5. Reduced-motion and assistive-technology modes receive equivalent state transitions.

## Main files

```text
src/app/[[...slug]]/page.tsx
    Resolves real URLs into content nodes.

src/components/world-app.tsx
    Client state machine: focus, gestalt, transitions, search, inspection.

src/components/boundary-frame.tsx
    Persistent operational shell and global navigation.

src/components/landing-sequence.tsx
    Hero -> threshold -> world reveal interaction.

src/components/world-view.tsx
    Branch worlds, node surfaces, directional traversal, typed connections.

src/components/inspection-panel.tsx
    Through interaction.

src/components/search-panel.tsx
    Global traversal by name.

src/lib/content.ts
    Information architecture and typed graph semantics.

src/app/globals.css
    Spatial frame, world morphology, transition grammar, responsive behavior.
```

## Recommended next implementation stages

### Stage A - replace starter content with evidence

1. Add the real Boundary First Labs product pages.
2. Add actual case studies and screenshots.
3. Expand Augusta into its real public-interest project structure.
4. Add sources/provenance to research nodes.
5. Keep claims separated into shipped work, method, formal result, conjecture, and aspiration.

### Stage B - make worlds ontologically distinct

Products should feel constructed and operational.

Research should feel structural, layered, and exploratory.

Public Interest should feel civic, territorial, and institutional.

About should feel chronological and provenance-oriented.

These should remain alternate morphologies over one content graph, not separate microsites.

### Stage C - compactification renderer

Introduce a scale-aware renderer with semantic levels such as:

```text
node -> local cluster -> branch -> institution
```

Each level decides which distinctions remain visible and which are promoted into a higher-order object.

### Stage D - representation overlays

Add overlays for:

- products / implementations
- research grounding
- public-interest applications
- dependencies
- provenance
- software architecture

The underlying graph should remain invariant while the overlay changes which relationships are salient.

### Stage E - orientation/minimap

Build the small path representation into a true orientation instrument that can converge with the primary world view as gestalt zoom moves outward.

## Design invariants

Before adding a new interaction, ask:

1. Orientation: does the visitor know where they are?
2. Affordance: can they tell what they can do?
3. Relationship: does the UI communicate why this destination is connected?
4. Continuity: is context preserved across the transition?
5. Recovery: can the visitor immediately return to a known state?

If an effect is visually impressive but weakens one of those conditions, it does not belong in the Boundary First interaction grammar.

## Dependency philosophy

This package intentionally starts with only Next.js, React, and TypeScript.

Once the interaction model stabilizes, good candidates to evaluate are:

- a professional icon system for typed relationship semantics
- a motion library only if CSS transitions stop being sufficient
- a headless CMS or typed content source once the corpus outgrows `content.ts`
- MDX for research/article bodies while retaining graph metadata in structured data
- a graph database only when query requirements justify the operational cost

Start with the smallest coherent executable representation, then promote structure when the system earns it.
