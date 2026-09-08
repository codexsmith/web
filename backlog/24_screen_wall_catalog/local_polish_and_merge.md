# Task: Polish and Harden Screen Wall Prototype

**Status:** merged prototype / local polish follow-up  
**Date:** 2026-08-28  
**Canonical route:** `/proto/playground`  
**Prototype source branch:** `agent/screen-wall-catalog`  
**Predecessor design task:** `backlog/18_screen_wall_catalog_interface.md`  
**Related navigation task:** `backlog/17_local_topology_minimap_navigation.md`

## Goal

Continue local browser QA and polish of the implemented Screen Wall prototype now integrated as a bounded prototype route at:

```text
/proto/playground
```

This is **not** a request to redesign the Screen Wall from scratch. The core interaction grammar and visual apparatus have already been implemented. Remaining work is primarily:

```text
run -> inspect -> verify -> repair -> polish
```

Preserve the proposition:

> **A catalog does not have to describe its contents. It can project them.**

and the interaction depth:

```text
WALL -> SCREEN -> WORLD
```

where `SCREEN` is a magnified inspection state that preserves surrounding wall context.

## Integrated implementation

The prototype consists of:

```text
src/app/proto/playground/page.tsx
src/components/playground/ScreenWallCatalog.tsx
src/components/playground/screen-wall.css
src/components/playground/screen-wall-spatial-refinement.css
src/components/playground/screen-wall-traces.css
src/components/playground/screen-wall-chassis.css
src/components/playground/screen-wall-activity.css
src/components/playground/screen-wall-focus.css
src/components/playground/screen-wall-lab-machine.css
```

## What is already built

### Spatial catalog

The wall presents nonuniform bounded interactive environments rather than a conventional card grid. Representative modules include Atlas Engine, Boundary Chess, Distinction Geometry, Patch Bay, Wave Bench, Lab Radio, Corpus Forge, and Oddments.

Three projections are available over the same object set:

- Curated Wall;
- Arcade Wall;
- Workbench Wall.

Desktop uses mode-specific spatial placement; tablet recomposes to two columns; mobile becomes a sequential catalog.

### Typed ports and relations

Visible input/output ports only render where the object declares them. The current relation classes are:

- `projection`;
- `signal`;
- `artifact`.

Declared routes remain authoritative. Physical trays, clamps, junction boxes, crossing bridges, conduit bends, and strain relief explain transport but do not invent connectivity.

### Physical apparatus grammar

The content field has been aligned with the site's Lab Machine visual family:

- recessed technical backplane;
- mounted faceplates;
- visible fasteners;
- restrained luminous state colors;
- serif object names with mono register labels;
- live instrument-like displays;
- keyed boundary ports;
- installed conduit / cable treatment;
- service-panel inspection state.

The site's outer navigation frames remain authoritative. The Screen Wall does not add its own competing footer frame.

### Chassis families

Object type influences enclosure morphology while preserving one shared grammar:

```text
Atlas Engine                       system engine
Boundary Chess                     game cabinet
Distinction Geometry / Wave Bench  measurement instrument
Patch Bay / Corpus Forge           service chassis
Lab Radio                          audio receiver
Oddments                           experimental fixture
```

### Low-motion previews

Preview behavior is CSS-only and intentionally restrained. There are no audio loops, JS timers, canvas render loops, or simulation workers in the catalog surface. `prefers-reduced-motion` disables preview animation, and dimmed screens pause activity.

### In-place inspection

`Wall -> Screen` moves the selected screen forward while retaining peripheral modules. The existing inspector acts as the sidecar for premise, state, boundary type, I/O, declared relations, and explicit `Enter world` action.

Fixed wall traces are hidden during magnification because their original endpoints would no longer coincide with the moved module. The textual relation register remains available.

## Local pickup

```bash
git switch main
git pull --ff-only
npm install
npm run dev
```

Open:

```text
http://localhost:3000/proto/playground
```

Before changing Next.js conventions, follow `AGENTS.md` and inspect the relevant installed Next 16 documentation under `node_modules/next/dist/docs/`.

## Required verification

Run the canonical repository check:

```bash
npm run verify
```

This currently covers lint, TypeScript, contracts, build, and runtime checks.

Also inspect the prototype in a real browser. Geometry, relation alignment, magnification, and responsive behavior cannot be validated reliably from static source inspection alone.

## High-priority checks

1. **Next.js CSS import posture** — confirm the route/component global CSS imports are valid for the installed Next 16 configuration.
2. **Rounded SVG route support** — `screen-wall-traces.css` currently uses CSS `d: path(...)` overrides for installed conduit geometry. If support or selector stability is weak, move rounded paths into typed `TraceRoute` data.
3. **Route-to-port alignment** — inspect every active connection in all three desktop modes.
4. **No false topology** — crossings, service trays, and junction hardware must not imply undeclared relations.
5. **Magnified inspection** — selected module must remain recognizably the same physical object; peripheral screens should remain understandable and selectable.
6. **Keyboard behavior** — mode controls, screen selection, Wall, Enter world, and world return must be keyboard reachable with visible focus.
7. **Reduced motion** — static first frames must remain meaningful.
8. **Responsive composition** — check roughly 1440+, 1100-1200, ~900, and <=760 widths.
9. **Visual restraint** — preserve the Lab Machine family without adding ornamental hardware that implies nonexistent function.

## Known prototype boundaries

The following are intentionally incomplete and should not trigger a redesign:

- World depth remains a bounded placeholder rather than the final destination applications;
- the object list is representative rather than a canonical Playground registry;
- relation classes are the smaller `projection / signal / artifact` set;
- traces are hidden during magnified movement rather than dynamically rerouted;
- no expensive live simulations run in the catalog;
- no drag-and-drop patching exists yet.

## Boundary First UX invariants

- **No ornamental semantics.** Consequential visible structure should correspond to real state, type, interface, or relation.
- **No false topology.** A line crossing is not a connection; a tray is not an edge; a junction box does not create graph structure.
- **Boundary crossings are explicit.** Inputs and outputs remain visible at the device boundary.
- **Geometry carries meaning.** Do not flatten the wall back into uniform cards merely for layout convenience.
- **Inspection preserves orientation.** The first selection is local magnification, not a route trapdoor.

## Completion criteria

The follow-up polish item is complete when:

- `/proto/playground` renders under the installed Next.js version;
- `npm run verify` passes;
- all three wall projections render correctly;
- mode switching leaves no stale layout or selection state;
- visible ports and relations correspond to declared data;
- conduit routing is legible and does not imply false junctions;
- desktop/tablet inspection preserves surrounding context;
- mobile is coherent as a sequential projection;
- keyboard focus remains usable;
- reduced-motion is meaningful;
- there is no autoplay audio;
- the content field reads as part of the same Lab Machine / Boundary First physical UX family as the rest of the site.

## Do not lose the point

```text
many bounded worlds remain visible
        -> attention selects one
        -> selection magnifies without destroying context
        -> interfaces and relations become inspectable
        -> entry into the world is deliberate
```

The target is a catalog that behaves like a room full of working apparatus rather than a page of links.
