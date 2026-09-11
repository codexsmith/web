# BFUX Layout Studio

The Lab Machine has accumulated enough responsive and physical-layout behavior that screenshot -> CSS -> screenshot tuning is no longer an acceptable primary workflow.

## Rule

A tunable instrument should have exactly two active styling layers:

1. **skin** — material, color, typography, iconography;
2. **geometry contract** — position, size, internal allocation, and named tuning variables.

Do not add a third `*-polish.css`, cascade-lock patch, or resolution-specific override for the same geometry. If a value needs tuning, expose it as a named CSS custom property in the geometry contract.

## Active editor pieces

- `RepresentationLabBillboardCard.tsx` — semantic billboard DOM only;
- `representation-lab-billboard-card.css` — billboard visual skin;
- `representation-lab-billboard-contract.css` — the single active billboard geometry contract;
- `RepresentationLabBillboardCardMount.tsx` — default anchor above Products; yields when the editor assigns an anchor-grid position;
- `BfuxLayoutStudio.tsx` — live visual tuning surface;
- `BfuxPartsBox.tsx` / `bfux-parts-box.css` — reusable physical-part palette;
- `BfuxPlacementLayer.tsx` / `bfux-placement-layer.css` — bounded loose-part instantiation, placement, movement, and selection;
- `BfuxAnchorGrid.tsx` / `bfux-anchor-grid.css` — shared-point card placement system.

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

Changing the height slider establishes an explicit pixel height for that projection. `AUTO HEIGHT` removes the explicit height and returns the card to content-driven sizing.

Changes apply immediately and persist in browser `localStorage` separately for Core and Full. `COPY CONFIG` exports the billboard geometry, anchor-grid state, and free parts in one JSON payload so a finished visual state can be baked into code instead of recreated through screenshot iteration.

## Anchor Grid

Layout Studio v0.4 uses an Excel-style `PICK YOUR GRID` control, but the selected geometry is interpreted as a lattice of **points**, not boxes.

A card placement is represented by:

- node id;
- anchor point `(column, row)`;
- one attached corner: `NW`, `NE`, `SW`, or `SE`.

This is intentionally different from storing arbitrary `left/top` offsets. The point is the shared alignment primitive; the corner tells the renderer which side of that point the object occupies.

Consequences:

- two cards can share one point with opposite corners and become exactly adjacent;
- multiple cards can share a row or column without independently tuned offsets;
- changing grid density remaps existing anchors to the nearest corresponding points;
- a card whose own dimensions change remains attached by the same corner;
- `RELEASE` removes the grid placement and restores the authored CSS position.

During drag, the editor tests every valid `(point, corner)` pair that keeps the card inside the apparatus. The nearest valid corner/point relationship is previewed as a ghost before drop. The active point and its row/column are emphasized; the rest of the lattice remains subordinate.

The grid is stored separately for Core and Full. It is an editor contract, not production positioning, until a copied configuration is deliberately baked into the machine layout.

## Parts Box and free placement

The Parts Box is a palette of primitives already represented by the physical Lab Machine language rather than a new visual vocabulary. It includes:

- connector: `SINGLE`, `MULTI`, `PLEX`, `EXTENDED`, `PORT`;
- tube: straight `TUBE` and `ELBOW`;
- panel: `MODULE` and `WIDE MODULE`.

The connector forms are derived from the machine's existing contact banks, adjacency connectors, lower dock, and dedicated ports. The tube forms are derived from the conjoined-module underpipe and its couplings. The module panels reuse the mounted face/shell/fastener grammar.

Every part tile emits a stable `application/x-bfux-part` payload with schema `bfux.part/v1` plus a plain-text part id. The catalog and glyph renderer are exported from `BfuxPartsBox.tsx` so the palette and placed instances use the same primitive definition rather than parallel copies.

Dragging a Parts Box primitive onto the machine creates a new instance at that location. Each drag from the palette creates another independent instance. Placed parts are bounded to the apparatus and stored as normalized center coordinates rather than raw screen coordinates.

A placed part can be selected, moved by dragging, and removed by double-click or Delete / Backspace. Placed parts persist independently for Core and Full.

Cards and loose parts deliberately use different placement contracts: cards use the stricter shared anchor lattice because their mutual alignment is structural; loose machine parts currently use free normalized placement. A later pass can add magnetic card-edge/port attachment without collapsing those two models into one.

## Next

Useful next increments are:

- make grid points nestable / locally refinable so a coarse apparatus lattice can contain denser sub-lattices;
- expose direct card resize handles against the same geometry contracts;
- add magnetic attachment rules between card edges, ports, connectors, and tubes;
- promote a copied editor configuration into declarative production layout data rather than CSS literals.

The important constraint is unchanged: the editor manipulates declared geometry and attachment relationships; it does not accumulate arbitrary corrective CSS.