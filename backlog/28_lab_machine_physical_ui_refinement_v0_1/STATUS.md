# Workstream 28 status — Lab Machine Physical UI Refinement

**Status:** Design-ready / implementation open  
**Date:** 2026-09-13  
**Authority:** current workstream status

## Current job

Translate the approved Forge, Research Engine, and Research Exhaust concepts into maintainable web primitives and integrate them into the current Lab Machine apparatus without losing semantic structure, accessibility, restraint, or responsive behavior.

## Required implementation sequence

1. Inspect the current Lab Machine / entrance implementation and nearest local specs.
2. Establish reusable physical primitives: metal bindings, smoked plexiglass, attached plates, ports, conduits, indicator lights, restrained glow.
3. Refine Research first; use it as the material-grammar reference implementation.
4. Install Forge above Tour as a standalone machine, not a card.
5. Add Research Exhaust below the research machinery with a static normalized event feed.
6. Add the adapter boundary for future durable research events.
7. Complete responsive, accessibility, reduced-motion, and performance passes.

## Dependencies / neighbors

- `backlog/19_apparatus_landing_local_pickup.md` — restraint and physical-hierarchy constraints.
- `backlog/23_lab_machine_governed_object_registry_v0_1/visual_grammar_v0_1.md` — upstream Lab Machine visual grammar.
- `backlog/11_bfl_live_research_system_ux_v0_1/` — live research system concepts relevant to future Exhaust inputs.

## Non-goals for this backlog write

- no production component implementation yet;
- no live registry/event backend yet;
- no replacement of concept references with raster assets as the final UI;
- no reopening of unrelated navigation/information architecture.
