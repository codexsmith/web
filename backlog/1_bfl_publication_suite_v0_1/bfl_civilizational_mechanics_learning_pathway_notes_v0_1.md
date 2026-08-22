# Boundary First Civilizational Mechanics Learning Pathway v0.1

## Purpose

This package turns the new Boundary First Labs public mission into an explorable learning sequence. It starts with familiar modern experiences—externalized burden, business agency, and AI acceleration—then introduces the shared root pattern, the operational mechanics, representational evolution, civilization-scale synthesis, and typed repair routes.

The pathway follows the existing public-architecture rule: **one graph, several lawful projections**. The sequence teaches the legend; radial, hierarchy, flow, state, node, and atlas views expose different relations in the same data. The canonical node and source records remain authoritative.

## Canonical spine

```text
There is no more outside
    → externality is an accounting boundary
        → business is constructed agency
            → AI accelerates institutional agency
                → abstraction without return
                    → accounting + software engineering
                        → Boundary First mechanics
                            → baseline formation and promotion
                                → representational evolution
                                    → Civilizational Mechanics
                                        → typed repair routes
                                            → Boundary First Labs mission and atlas
```

## Why this ordering works

1. **Begin with transfer, not terminology.** Readers already understand that waste, work, risk, and maintenance land somewhere.
2. **Name the acting system.** Business agency and AI acceleration make the institutional actor legible.
3. **Reveal the root.** The reader can then recognize several failures as severed return paths rather than isolated moral complaints.
4. **Introduce an available professional discipline.** Accounting establishes the represented boundary; software engineering demonstrates how to integrate exceptional states, consequences, witnesses, and repair.
5. **Teach the mechanics.** Boundary, invariant, defect, repair, and promotion become usable operations.
6. **Add time.** Representational evolution explains how systems learn, become new baselines, or fail beneath obsolete models.
7. **Scale carefully.** Civilizational Mechanics is introduced only after the mechanism has been demonstrated at familiar scales.
8. **End with repair.** The reader leaves with a typed route, not only a critique.

## Visualization architecture

| Relationship being taught | Preferred projection | D3 mechanism | Reason |
|---|---|---|---|
| Nested interiors and substrate dependence | Hierarchy / partition | `d3.hierarchy`, `d3.partition` | Shows that every apparent outside remains inside a larger system |
| Benefit and burden transfer | Flow | `d3-sankey` | Preserves source, receiver, and displaced burden |
| Institutional agency | Constrained network | `d3.forceSimulation` with fixed sectors | Shows a hybrid agent composed of people, procedures, software, capital, and law |
| Root pattern and doctrine branches | Radial cluster | `d3.cluster`, `d3.linkRadial` | Holds one shared root and distinct severances together |
| Happy path, failure, and recovery | Layered state graph | `d3-dag` Sugiyama layout | Shows operational integration of edge cases and repair paths |
| Boundary First mechanics | Radial cycle | `d3.arc`, radial links | Communicates recurrence, repair, and promotion |
| Representational evolution | Spiral / version path | `d3.lineRadial` plus version tree | Shows recurrence with a changed baseline, not an identical loop |
| Root → consequence → repair | Tripartite flow | `d3-sankey` | Routes diagnosis into concrete action without collapsing distinctions |
| Complete atlas | Curated network | fixed semantic coordinates, force collision, `d3.zoom` | Preserves architectural authority and spatial memory |

### Important implementation restriction

Do not begin with a universal automatic graph layout. The public sequence and canonical architecture should use curated semantic coordinates. Force simulation should manage collision, local relaxation, and drag behavior—not determine theoretical hierarchy or authority.

## Content layers

Every pathway step has four presentation layers:

1. **Card** — title and one-line quote.
2. **Expanded doctrine** — summary, mechanism, consequence, and repair.
3. **Interactive mechanics** — one manipulable relation and a small assessment.
4. **Deep dive** — canonical node, source, claim status, evidence, examples, and repair artifacts.

The root cards branch from **Abstraction Without Return**. The repair routes branch from **Route the Defect to Consequence Closure**. Both return to the same main pathway state.

## First implementation slice

Build these six surfaces first:

1. reusable pathway shell;
2. nested-interiors scene;
3. externality Sankey scene;
4. business/AI same-graph rate comparison;
5. radial root-card explorer;
6. repair router and generated repair packet.

Use static or lightly interactive diagrams before adding complex animation. All scenes must have mobile, keyboard, text-alternative, and reduced-motion forms.

## Files

- `bfl_learning_pathway_schema_v0_1.json` — validation and authoring contract.
- `bfl_civilizational_mechanics_learning_pathway_v0_1.json` — populated pathway, root cards, repair routes, and D3 display annotations.
