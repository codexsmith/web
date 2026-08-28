# Task: Polish, Verify, and Merge Screen Wall Catalog Prototype

**Status:** implementation handoff / local polish + merge candidate  
**Date:** 2026-08-27  
**Prototype branch:** `agent/screen-wall-catalog`  
**Current branch head at handoff:** `3c205b214aaf8862c677fb1b0d6b7cf50f0ccafd`  
**Branch base / current `main`:** `2f3b360ad38d988adeb522cd6511af47b6b0781e`  
**Predecessor design task:** `backlog/18_screen_wall_catalog_interface.md`  
**Related navigation task:** `backlog/17_local_topology_minimap_navigation.md`

## Goal

Take the implemented Screen Wall prototype on `agent/screen-wall-catalog`, run it locally, repair any actual browser / Next.js / TypeScript / CSS issues, refine the interaction and physical composition where needed, and merge it as a coherent Playground prototype.

This is **not** a request to redesign the Screen Wall from scratch.

The conceptual work in backlog item 18 has already been translated into a substantial implementation. The remaining work is primarily:

```text
inspect -> run -> verify -> repair -> polish -> review -> squash -> merge
```

The local pass should preserve the core proposition:

> **A catalog does not have to describe its contents. It can project them.**

And the primary interaction depth:

```text
WALL -> SCREEN -> WORLD
```

where `SCREEN` is a magnified inspection state that preserves wall context rather than ejecting the visitor into an unrelated detail page.

## Existing implementation

The prototype currently adds `/playground` and the following implementation files:

```text
src/app/playground/page.tsx
src/components/playground/ScreenWallCatalog.tsx
src/components/playground/screen-wall.css
src/components/playground/screen-wall-spatial-refinement.css
src/components/playground/screen-wall-traces.css
src/components/playground/screen-wall-chassis.css
src/components/playground/screen-wall-activity.css
src/components/playground/screen-wall-focus.css
```

At handoff, the branch is **14 commits ahead of `main` and 0 commits behind**. The prototype is therefore isolated and should be straightforward to inspect locally before integration.

## What has already been built

### 1. Screen Wall catalog projection

`/playground` presents a nonuniform spatial wall of bounded interactive environments rather than a conventional card grid.

Representative objects currently include:

- Atlas Engine;
- Boundary Chess;
- Distinction Geometry;
- Patch Bay;
- Wave Bench;
- Lab Radio;
- Corpus Forge;
- Oddments.

The object registry carries title, kind, status, mode membership, visual tone, preview type, and optional typed input / output descriptions.

### 2. Three wall modes

The current prototype supports:

- **Curated Wall**;
- **Arcade Wall**;
- **Workbench Wall**.

Each mode is a projection over the same object set, not a separate product.

The desktop spatial map is owned by `screen-wall-spatial-refinement.css`. A previous inline `gridArea` override has already been removed so the mode-specific stylesheet is now intended to be the single placement authority.

### 3. Landmark and neighborhood composition

Distinction Geometry acts as the central landmark. The desktop layout uses a six-column / four-row instrument-wall composition with mode-specific placement and zone labels.

Tablet recomposes into a two-column layout. Mobile becomes a sequential single-column catalog rather than shrinking the full wall into illegibility.

### 4. Typed ports and declared relations

Visible ports only exist when a screen declares the corresponding input or output.

The prototype currently distinguishes three relation kinds:

- `projection`;
- `signal`;
- `artifact`.

Declared relations include:

```text
Atlas Engine -> Distinction Geometry      graph state      projection
Distinction Geometry -> Patch Bay         field state      signal
Patch Bay -> Lab Radio                    artifact         artifact
Distinction Geometry -> Wave Bench        field state      signal
Lab Radio -> Oddments                     audio            signal
Corpus Forge -> Patch Bay                 artifact         artifact
```

The relation register in the inspector is the accessible / textual projection of these connections.

### 5. Physical routing grammar

Desktop relation traces have been developed beyond simple diagram lines into a physical routing language with:

- neutral cable trays / conduit infrastructure;
- typed colored conductors;
- source and target terminal shapes;
- strain-relief boots;
- service junction boxes;
- branch takeoff collars;
- periodic tray clamps;
- a non-junction crossing bridge;
- short-radius installed-conduit bends.

Important rule:

> **Physical infrastructure does not invent connectivity.**

The typed relation registry remains authoritative. Trays, boxes, clamps, and bridges only explain how a declared relation is carried.

### 6. Chassis families

The wall no longer treats every environment as the same black box.

The current chassis layer gives related machine types distinct but systematic physical morphology:

```text
Atlas Engine                     system engine
Boundary Chess                   game cabinet
Distinction Geometry / Wave Bench measurement instrument
Patch Bay / Corpus Forge         service chassis
Lab Radio                        audio receiver
Oddments                         experimental fixture
```

Every family still shares the same screen / status / label / port / relation grammar.

### 7. Low-motion live previews

The previews now have restrained CSS-only activity:

- Atlas orbital drift;
- chess consequence pulses;
- geometry field / particle drift;
- patchbay network flow;
- wave-scope sweep;
- radio meter cadence;
- forge processing stages;
- Oddments stepped output.

There are no audio loops, JS timers, canvas render loops, or simulation workers in this prototype.

Dimmed screens pause their activity. `prefers-reduced-motion` removes preview animation.

### 8. In-place magnification

The `Wall -> Screen` transition now moves the selected screen forward and enlarges it inside the wall instead of replacing the wall with an unrelated card.

Peripheral screens remain visible and selectable so attention can move locally without a mandatory return-to-index step.

The existing inspector acts as the selected screen's sidecar and retains:

- premise;
- state;
- boundary kind;
- input / output;
- declared relations;
- explicit `Enter world` action.

When the selected screen is physically moved into magnified inspection, the fixed SVG relation traces are deliberately hidden. Their endpoints correspond to the screen's wall position, so continuing to display them after the screen moves would falsely represent the cable termination. The relation register remains available in the inspector.

## Local pickup procedure

Start from the existing branch rather than recreating the work:

```bash
git fetch origin
git switch agent/screen-wall-catalog
git pull --ff-only
npm install
npm run dev
```

Open:

```text
http://localhost:3000/playground
```

Before changing Next.js conventions, follow the repository `AGENTS.md` instruction to inspect the relevant Next 16 documentation under `node_modules/next/dist/docs/` rather than relying on assumptions from older Next versions.

## Required local verification

This branch has been developed through repository connector edits and **has not yet had a local build, typecheck, lint, contract check, runtime check, or browser QA pass**.

Run the repository's canonical verification command:

```bash
npm run verify
```

The current `verify` script runs:

```text
lint
-> typecheck
-> contracts:check
-> build
-> runtime:check
```

Do not merge until this passes or failures are explicitly understood and resolved.

Also run the local dev server and exercise `/playground` in an actual browser. Static inspection alone is insufficient for this task because much of the work is geometric and interaction-dependent.

## High-priority hardening checks

### A. Next.js CSS import posture

The route currently imports:

```text
screen-wall-chassis.css
screen-wall-activity.css
screen-wall-focus.css
```

while `ScreenWallCatalog.tsx` imports:

```text
screen-wall.css
screen-wall-spatial-refinement.css
screen-wall-traces.css
```

Confirm that this global CSS import posture is valid for the installed Next.js 16.3 configuration and consistent with repository conventions.

If not, move the imports to the correct route/layout boundary or convert the appropriate layers without collapsing the useful separation between:

```text
base component grammar
spatial composition
relation routing
chassis morphology
preview activity
focus / magnification behavior
```

### B. Rounded SVG route implementation

`screen-wall-traces.css` currently promotes the simple TSX SVG routes into rounded installed-conduit paths using CSS `d: path(...)` rules and mode-specific `nth-of-type` selectors.

This needs browser verification.

If support or selector stability is inadequate, prefer moving the rounded path data into the typed `TraceRoute` registry in `ScreenWallCatalog.tsx` rather than preserving a fragile CSS-only path override.

The fallback orthogonal route data already exists in TSX.

### C. Route-to-port alignment

At desktop width, inspect every active connection in all three modes and confirm:

- source terminal aligns with the correct module output;
- target terminal aligns with the correct module input;
- rounded bends do not visually enter unrelated chassis;
- labels do not collide with screens or junctions;
- crossing bridges clearly mean **crossing, not connection**;
- junction hardware does not imply undeclared graph topology.

The traces use a normalized `1000 x 700` SVG viewBox over the wall, so visual browser inspection is required after the layout-authority fix.

### D. Magnified inspection geometry

Exercise every selectable screen in every mode.

Confirm that:

- selected screen visibly remains the same physical object;
- the screen gains priority without covering all peripheral context;
- the inspector reads as a sidecar to the selected apparatus;
- peripheral screens remain understandable and selectable;
- selecting a peripheral screen transfers focus cleanly;
- `Wall` returns to the previous wall projection;
- `Enter world` remains an explicit second transition;
- fixed traces are absent only while their geometry would be false;
- mobile remains coherent as a sequential projection.

If the sidecar and selected screen feel like two unrelated overlays, tighten their shared alignment / framing rather than returning to a generic drawer model.

### E. Chassis restraint

The chassis families should communicate role, not novelty.

During polish, remove any treatment that reads as decorative noise or implies functionality that does not exist.

Preserve the hierarchy:

```text
shared Screen Wall grammar
    -> family morphology
        -> individual object identity
```

Do not turn the wall into eight one-off illustrations.

### F. Motion budget

Verify:

- `prefers-reduced-motion` produces a useful static wall;
- dimmed screens actually pause their animation;
- mobile motion remains subdued;
- no preview distracts from the wall gestalt;
- no preview implies a real simulation result that is not actually being computed;
- no autoplay audio is introduced.

The correct feel is **live instrumentation**, not a wall of animated thumbnails.

### G. Keyboard / focus behavior

Confirm that mode controls, screen selection, `Wall`, `Enter world`, and world return remain keyboard reachable with visible focus state.

Check focus order during magnified inspection, especially when peripheral screens remain available behind the selected screen / inspector composition.

No necessary information should exist only on hover.

## Visual polish targets

After correctness, make a restrained polish pass at several viewport sizes.

Suggested manual viewport checks:

```text
1440+ desktop / large wall
1100-1200 laptop boundary
~900 tablet
<=760 mobile
```

Prioritize:

1. believable physical hierarchy;
2. readable screen content;
3. clean spacing between chassis and conduit;
4. clear central landmark behavior;
5. enough asymmetry to feel spatial without becoming chaotic;
6. legible labels at realistic browser zoom;
7. institutional / industrial character rather than neon arcade styling.

Do not optimize for maximum detail density. The target is **complex but systematic, physically plausible, and not overwhelmingly busy**.

## Known prototype boundaries

The following are intentionally incomplete and should not block merging the Screen Wall as a prototype unless they create a broken experience:

- `World` depth is still a generic bounded placeholder rather than the actual destination applications;
- the object list is representative rather than a canonical Playground registry;
- there is no dynamic personalization / My Wall yet;
- relation classes are currently the smaller `projection / signal / artifact` set rather than the full BFUX wiring taxonomy;
- traces are hidden during magnified movement rather than dynamically rerouted to the new screen position;
- no expensive live simulations are running in the catalog;
- no drag-and-drop patching exists yet.

Do not expand scope into those systems during the polish pass unless a small change is required for correctness.

## Boundary First UX invariants to preserve

### No ornamental semantics

If a visible boundary, port, terminal, conductor, junction, status marker, or control appears consequential, it should correspond to actual object state or declared interface structure.

### No false topology

A line crossing does not mean a connection. A service tray does not mean a relation. A junction box does not create an edge. Typed relations remain authoritative.

### Boundary crossings are explicit

Inputs and outputs should remain visible at the actual screen boundary rather than dissolving into generic decoration.

### Geometry carries meaning

Screen size, position, focus, containment, and routing should help explain the catalog. Avoid falling back to uniform cards simply because they are easier to lay out.

### Inspection preserves orientation

`Wall -> Screen` should remain a local magnification operation. Do not turn the first click into a route trapdoor.

## Suggested implementation order

1. Check out and run the branch locally.
2. Read `AGENTS.md` and relevant installed Next 16 docs.
3. Resolve any compile / lint / CSS-import issues.
4. Run `npm run verify` until clean.
5. Validate desktop mode-specific placement after removal of inline `gridArea`.
6. Validate relation routing and decide whether CSS `d: path(...)` should move into typed route data.
7. Validate magnified screen + inspector composition.
8. Validate keyboard, reduced-motion, tablet, and mobile behavior.
9. Make only the visual polish needed after observing the real browser result.
10. Re-run `npm run verify`.
11. Review the full branch diff against `main` for accidental scope expansion.
12. Squash the branch to a coherent implementation commit if practical.
13. Open / finalize a PR and merge after review.

## Commit / merge posture

The repository asks for as few commits as possible, ideally one coherent commit per task / PR.

This prototype branch currently contains a sequence of implementation passes from remote development. Before merge, prefer squashing those commits into a coherent Screen Wall implementation commit unless preserving the history is materially useful for review.

Do not force-push or rewrite shared history casually. Perform the squash locally when preparing the PR and confirm the resulting diff before pushing.

Automatic Vercel preview deployment is not required for this development branch; repository policy reserves automatic Git deployments for `main` unless explicitly requested.

## Merge acceptance criteria

This work item is complete when:

- `/playground` renders successfully under the repository's installed Next.js version;
- `npm run verify` passes;
- all three wall modes render their intended distinct spatial compositions;
- mode switching does not leave stale selection or layout state;
- every visible port corresponds to a declared input / output;
- every visible relation corresponds to a declared relation;
- relation direction and type are inspectable without relying on color alone;
- desktop physical routing is legible and does not imply false junctions;
- `Wall -> Screen` preserves surrounding catalog context at desktop/tablet widths;
- peripheral screen selection works during inspection;
- `Screen -> World` remains an explicit separate action;
- mobile produces a coherent sequential projection;
- keyboard focus remains usable;
- reduced-motion produces a meaningful static catalog;
- there is no autoplay audio;
- the wall feels like one coherent physical apparatus rather than a generic card grid;
- the final diff is reviewed and appropriately squashed before merge.

## Do not lose the point

The most important thing to preserve during local cleanup is not any particular CSS value. It is the interaction grammar that the prototype is testing:

```text
many bounded worlds remain visible
        -> attention selects one
        -> selection magnifies without destroying context
        -> interfaces and relations become inspectable
        -> entry into the world is deliberate
```

The desired result is a catalog that behaves more like a room full of working apparatus than a page of links.
