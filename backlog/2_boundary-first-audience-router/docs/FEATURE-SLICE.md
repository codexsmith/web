# Audience-Aware Corpus Router — Feature Slice

## Purpose

This feature answers a visitor-centered question before exposing the full Boundary First Labs atlas:

> Who is arriving, what pressure brought them, what transformation are they seeking, and what is the smallest useful path through the corpus?

It does **not** create a second content system. It is a presentation and routing overlay over the canonical node graph.

## Boundary-first definition

### Consequential boundary

The slice begins at the boundary between a visitor's current need and the lab's large corpus.

### Protected invariants

1. Canonical content remains canonical; audience data references node IDs rather than copying node bodies.
2. A visitor is not permanently classified by one choice.
3. The first route exposes the minimum useful conceptual burden.
4. Every route preserves an escape to restart or open the full atlas.
5. Invalid intent/audience/doorway combinations do not silently degrade; they return 404.

### Closure condition

A route closes when it yields:

- an explicit desired transformation;
- a short ordered path;
- canonical node references;
- a concrete next action;
- a success signal.

### Known defects prevented

- discipline-first routing that recreates silos;
- dumping the complete graph on first-time visitors;
- duplicating and drifting canonical prose;
- treating audience identity as permanent;
- routing to content without an actionable next step;
- allowing incompatible URL combinations.

## Route grammar

```text
/audience
/audience/:intent
/audience/:intent/:audience
/audience/:intent/:audience/:doorway?depth=:depth
```

Example:

```text
/audience/diagnose/working-practitioner/software?depth=use
```

The route is progressive disclosure:

```text
arrival intent → current relation → familiar doorway → bounded route
```

## Configurable outlet

`AudienceRouteOutlet` is presentation-only. It receives:

```ts
{
  dataset: AudienceDataset;
  config: AudienceRouteConfig;
  selection: RouteSelection;
}
```

The catch-all page is an adapter. To mount the feature elsewhere, create another catch-all route and pass a different config:

```tsx
// app/start/[[...path]]/page.tsx
import { AudienceRouteOutlet } from "@/components/audience/AudienceRouteOutlet";
```

Set `config.basePath` to `/start`. The resolver, dataset, and outlet remain unchanged.

## Data compatibility

The file `data/audience.nodes.json` uses the familiar node properties:

- `id`;
- `slug`;
- `type`;
- `title`;
- `related`;
- arrays of referenced node IDs.

Audience-specific fields are additive. The overlay can coexist with a canonical `nodes.json`, and `recommendedNodeIds`, `domainNodeIds`, and route `nodeRefs` can be resolved against that graph at build time.

A production integration should add a cross-dataset validation step:

```ts
for (const id of allAudienceReferences) {
  if (!canonicalNodesById.has(id)) throw new Error(`Unknown canonical node: ${id}`);
}
```

## Static generation

The route adapter uses `generateStaticParams` to prebuild all valid combinations and sets `dynamicParams = false`. This makes the valid route set explicit and allows static hosting when the rest of the app is compatible.

## Extension points

1. Replace the sample dataset with generated audience records from the corpus pipeline.
2. Resolve node references into cards, previews, or atlas focus states.
3. Add analytics events for route selection and completion.
4. Add a small route recommender while preserving explicit human-readable rules.
5. Add locale-specific datasets without changing the outlet.
6. Add per-program outlets by supplying a filtered dataset and different labels.
7. Add an accessibility layer that varies format without changing conceptual destination.

## Acceptance criteria

- Root route lists intents.
- Intent route lists only compatible audiences.
- Audience route lists only compatible doorways.
- Complete route renders ordered steps, node references, boundary conditions, and next action.
- Query parameter selects a valid depth or falls back to configured default.
- Invalid route combinations return 404.
- Dataset validation fails on duplicate IDs, duplicate slugs, invalid depths, or broken internal audience references.
- Outlet can be mounted under another catch-all route by changing `basePath`.
