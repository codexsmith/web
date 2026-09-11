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
- `BfuxPartsBox.tsx` / `bfux-parts-box.css` — reusable physical-part palette;
- `BfuxPlacementLayer.tsx` / `bfux-placement-layer.css` — bounded part instantiation, placement, movement, and selection.

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

Changes apply immediately to the rendered card and persist in browser `localStorage` separately for Core and Full. `COPY CONFIG` exports the current layout values plus the placed-parts record so a finished visual state can be baked into a contract rather than recreated through screenshot iteration.

## Parts Box

The Parts Box is a palette of primitives already represented by the physical Lab Machine language rather than a new visual vocabulary. It includes:

- connector: `SINGLE`, `MULTI`, `PLEX`, `EXTENDED`, `PORT`;
- tube: straight `TUBE` and `ELBOW`;
- panel: `MODULE` and `WIDE MODULE`.

The connector forms are derived from the machine's existing contact banks, adjacency connectors, lower dock, and dedicated ports. The tube forms are derived from the conjoined-module underpipe and its couplings. The module panels reuse the mounted face/shell/fastener grammar.

Every part tile emits a stable `application/x-bfux-part` payload with schema `bfux.part/v1` plus a plain-text part id. The catalog and glyph renderer are exported from `BfuxPartsBox.tsx` so the palette and placed instances use the same primitive definition rather than parallel copies.

## Placement contract

Layout Studio v0.3 installs a drop receiver on the physical Lab Machine apparatus. Dragging a Parts Box primitive onto the machine creates a new instance at that location. Each drag from the palette creates another independent instance of the selected primitive.

Placed parts are bounded to the apparatus and stored as normalized center coordinates instead of raw screen coordinates. That keeps a placement tied to the machine surface as the viewport geometry changes. The renderer maps those declared coordinates through `--bfux-part-x`, `--bfux-part-y`, `--bfux-part-width`, and `--bfux-part-height`; it does not write arbitrary layout rules into the machine stylesheet.

A placed instance can be:

- selected by clicking it;
- moved by dragging it to another location on the apparatus;
- removed by double-clicking it or pressing Delete / Backspace while it has focus.

Placed parts persist in browser `localStorage` independently for Core and Full. A placed-instance drag uses schema `bfux.placement/v1`; a new palette drag continues to use `bfux.part/v1`.

The drop target is intentionally the apparatus surface, not arbitrary document DOM. This is the first bounded placement canvas and gives us a controlled base for future snapping, attachment semantics, rotation, resizing, and connector routing.

## Next

Generalize the editor registry from the billboard to any `[data-bfux-editable]` instrument, then add direct resize/rotation handles, named child-region selection, snapping/attachment points, and semantic connector routing for placed Parts Box primitives. The important constraint is unchanged: the editor manipulates declared layout/placement variables; it does not write arbitrary CSS overrides.
