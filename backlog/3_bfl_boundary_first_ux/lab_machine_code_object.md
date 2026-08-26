# Lab Machine — Code Object Prototype

Status: prototype / backlog implementation artifact

This prototype turns the visual-grammar exploration into code rather than treating the generated image as a design to reproduce literally.

## Architecture

`src/components/bfux/lab-machine-model.ts`

- canonical typed nodes and relations;
- node kinds encode structural roles rather than decorative card variants;
- the same graph emits a Mermaid topology.

`src/components/bfux/LabMachine.tsx`

- custom renderer for the intentionally non-linear, Tetris-like machine layout;
- Research is the central core;
- Method and Pipeline attach on one side;
- About attaches directly to Research;
- People, Governance, and Timeline sit below;
- Products, Publications, and Applications sit above;
- Applications feed a Service Bus and Public Value, which closes the semantic loop by serving People;
- optional Mermaid projection renders the same graph as a conventional schematic.

`src/components/bfux/lab-machine.css`

- implements BFUX morphology without generic industrial greebling;
- attachment hardware appears only on attachment/pipeline roles;
- package arms appear only on outward-facing package/application roles;
- People uses a transparent treatment to communicate aggregation/dissemination;
- Governance gets a stronger authority boundary;
- Timeline gets record morphology;
- Research gets core morphology;
- connector line styles distinguish ordinary relation, constraint, record, and service flow.

## Lawfulness rule

Every visible structure must correspond to one of:

1. containment;
2. interface;
3. relation;
4. state;
5. constraint;
6. agency;
7. history;
8. inspection;
9. repair/output.

If a repeated screw, toggle, conduit, lamp, trace, or panel cannot answer one of those questions, it should not be rendered.

## Projection rule

Mermaid owns topology and provides the inspectable schematic projection. The custom renderer owns spatial morphology and placement. Both consume the same graph model; neither may invent a relationship merely to improve composition.

## Next integration step

Mount `LabMachine` as an experimental `/world` projection or behind a temporary query/feature switch before replacing the current five-card root. The current root remains the production fallback until this object has been visually pressure-tested at desktop and narrow widths.
