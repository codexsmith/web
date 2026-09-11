# BFUX Layout Studio

The Lab Machine has accumulated enough responsive and physical-layout behavior that screenshot -> CSS -> screenshot tuning is no longer an acceptable primary workflow.

## Rule

A tunable instrument should have exactly two active styling layers:

1. **skin** — material, color, typography, iconography;
2. **geometry contract** — position, size, internal allocation, and named tuning variables.

Do not add a third `*-polish.css`, cascade-lock patch, or resolution-specific override for the same geometry. If a value needs tuning, expose it as a named CSS custom property in the geometry contract.

## Representation Lab billboard pilot

Active files:

- `RepresentationLabBillboardCard.tsx` — semantic DOM only;
- `representation-lab-billboard-card.css` — visual skin;
- `representation-lab-billboard-contract.css` — the single active geometry contract;
- `RepresentationLabBillboardCardMount.tsx` — one job only: anchor the billboard above Products and request one initial reveal;
- `BfuxLayoutStudio.tsx` — live visual tuning surface;
- `BfuxPartsBox.tsx` / `bfux-parts-box.css` — reusable physical-part palette.

Legacy `representation-lab-billboard-layout.css` and `representation-lab-billboard-polish.css` are retained as history but are no longer imported by the card and must not receive new fixes.

## Open the studio

Append `?bfux=edit` to the Lab Machine URL.

The billboard pilot exposes:

- card width;
- card height, with intrinsic `AUTO HEIGHT` as the default;
- gap above Products;
- visual/copy split;
- maze scale and X position;
- maze padding;
- copy padding;
- title scale;
- lower control-row height.

Changing the height slider establishes an explicit pixel height for that projection. `AUTO HEIGHT` removes the explicit height and returns the card to content-driven sizing. The existing billboard mount observes the resulting resize and re-anchors the card above Products, so changing height does not require a second positioning system.

Changes apply immediately to the rendered card and persist in browser `localStorage` separately for Core and Full. `COPY CONFIG` exports the current values as JSON so a finished visual state can be baked into the contract in one commit instead of recreated through screenshot iteration.

## Parts Box

The first Parts Box is a palette of primitives already represented by the physical Lab Machine language rather than a new visual vocabulary. It includes:

- connector: `SINGLE`, `MULTI`, `PLEX`, `EXTENDED`, `PORT`;
- tube: straight `TUBE` and `ELBOW`;
- panel: `MODULE` and `WIDE MODULE`.

The connector forms are derived from the machine's existing contact banks, adjacency connectors, lower dock, and dedicated ports. The tube forms are derived from the conjoined-module underpipe and its couplings. The module panels reuse the mounted face/shell/fastener grammar.

Every part tile is draggable now and emits a stable `application/x-bfux-part` payload with schema `bfux.part/v1` plus a plain-text part id. V0.2 intentionally stops at a drag-ready palette; the machine does not yet accept arbitrary dropped parts. That receiver should be implemented against declared placement contracts rather than by writing ad hoc inline CSS.

## Next

Generalize the editor registry from the billboard to any `[data-bfux-editable]` instrument, then add direct drag/resize handles, named child-region selection, and a bounded drop/placement canvas for Parts Box primitives. The important constraint is unchanged: the editor manipulates declared layout/placement variables; it does not write arbitrary CSS overrides.
