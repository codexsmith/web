# Lab Machine visual grammar v0.1

**Status:** implementation constraint for backlog pass 17  
**Date:** 2026-08-28  
**Scope:** content-area styling and interaction grammar only; preserve the existing global top navigation frame and bottom Boundary First visual-grammar frame.

## Decision

The existing Lab Machine apparatus screenshot is **not a page mockup to reproduce literally**. It is the visual grammar for the second-layer UI being built inside the machine.

The content layer should therefore look as though it is physically part of the same apparatus rather than a conventional web page placed underneath it.

## Visual invariants

- Dark blue-black instrument background with subtle grid / scanline texture.
- Physical metal or coated-panel frames with seams, inset wells, fasteners, rails, and connector logic.
- Serif display labels for subsystem/object names; narrow monospace labels for machine state, ports, statuses, commands, evidence, and metadata.
- Semantic subsystem colors remain restrained signal channels, not decorative full-surface fills.
- Active state may glow softly; inactive structure remains dark and material.
- Cables, ports, traces, gates, lamps, segmented meters, status pills, and switch-bank controls are preferred over generic web-card decoration.
- Structure should feel precise and maintained rather than grimy, distressed, or retro-futurist for its own sake.
- Every physical metaphor should communicate an operational distinction.

## Content-layer translation

The generic detail layer should behave like an **inspection console**:

- subsystem header = engraved / instrument identity plate;
- system role, state, ports, views, and carrier binding = instrument strip;
- orientation / purpose = primary readout;
- boundary, process, rationale, validation = selectable console banks rather than four long prose sections shown simultaneously;
- governed object = carrier cassette / route rail;
- subsystem relations = physical interface bank;
- traversal history = bound-path readout;
- alternate projections = switch bank;
- institutional takeaway = output plate.

The specialized projection shell should remain the same apparatus at a deeper resolution. It should not visually reset into a generic dashboard.

## Interaction grammar

Preserve the current Boundary First interaction sequence:

`ORIENT -> PROBE -> BIND -> ACT`

Use the screenshot grammar consistently:

- **Boundary** = containment / panel / frame.
- **Port** = interface / connector.
- **Trace** = relation / cable / route.
- **Gate** = condition / promotion threshold.
- **State** = observed machine state / lamp / meter.
- **Command** = explicit user action / switch / button.
- **Through** = inspect deeper / change projection.

## Density rule

The UI may be information-dense, but not text-dense.

Prefer:

- short labeled readouts;
- segmented rows;
- status lamps;
- compact lists;
- instrument cells;
- route diagrams;
- tabs / switch banks;
- evidence meters;
- visually distinct input/output stages.

Avoid large uninterrupted paragraphs when the same information can be made inspectable as state, relationship, condition, route, or selectable detail.

## Responsive rule

On narrower widths, the apparatus may reflow into stacked instrument banks, but the semantic grammar must survive. Do not replace the mobile state with a generic card list that loses ports, state, boundaries, or route identity.

## Merge gate

Local polish should compare the rendered second-layer UI against the apparatus screenshot for **grammar**, not pixel identity. A successful pass should make it visually obvious that the second layer belongs to the same physical machine even when its specific content differs.