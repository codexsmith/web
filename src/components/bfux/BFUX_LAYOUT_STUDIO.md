# BFUX Layout Studio

The Lab Machine has accumulated enough responsive and physical-layout behavior that screenshot -> CSS -> screenshot tuning is no longer an acceptable primary workflow.

## Rule

A tunable instrument should have exactly two active styling layers:

1. **skin** — material, color, typography, iconography;
2. **geometry contract** — position, size, internal allocation, and named tuning variables.

Do not add a third `*-polish.css`, cascade-lock patch, or resolution-specific override for the same geometry. If a value needs tuning, expose it as a named geometry value.

The editor is not merely a spec generator. It is a small source compiler: the same authored layout module it emits is consumed directly by the runtime.

## Active editor pieces

- `RepresentationLabBillboardCard.tsx` — semantic billboard DOM only;
- `representation-lab-billboard-card.css` — billboard visual skin;
- `representation-lab-billboard-contract.css` — the single active billboard geometry contract;
- `RepresentationLabBillboardCardMount.tsx` — default anchor above Products; yields when an editor or authored layout assigns an anchor-grid position;
- `BfuxLayoutStudio.tsx` — live visual tuning and source compilation surface;
- `BfuxPartsBox.tsx` / `bfux-parts-box.css` — reusable physical-part palette;
- `BfuxPlacementLayer.tsx` / `bfux-placement-layer.css` — bounded loose-part instantiation, placement, movement, and selection;
- `BfuxAnchorGrid.tsx` / `bfux-anchor-grid.css` — shared-point card placement system;
- `bfux-layout-source.ts` — stable serializable source contract;
- `bfux-layout-authored.generated.ts` — generated source of truth consumed by normal runtime;
- `BfuxAuthoredLayoutLayer.tsx` / `bfux-authored-layout.css` — runtime interpreter for authored layout source;
- `bfux-layout-compiler.ts` — deterministic source-file emitter;
- `src/app/api/bfux/layout-studio/route.ts` — fixed-path local-development source writer.

Legacy `representation-lab-billboard-layout.css` and `representation-lab-billboard-polish.css` are retained as history but are no longer imported by the card and must not receive new fixes.

## Open the studio

Append `?bfux=edit` to the Lab Machine URL.

The billboard pilot exposes card width/height, gap above Products, maze/copy split, maze scale/X position, visual/copy padding, title scale, and lower control-row height. `AUTO HEIGHT` returns the billboard to content-driven sizing.

Changes apply immediately and persist in browser `localStorage` separately for Core and Full while editing.

## Source compiler

Layout Studio v0.5 compiles the complete editor state for **both** Core and Full into:

`src/components/bfux/bfux-layout-authored.generated.ts`

That file is a drop-in source replacement, not an instruction packet for another agent. It contains the versioned `bfux.machine-layout/v1` object and is imported directly by `BfuxAuthoredLayoutLayer` during normal non-editor rendering.

The source output includes:

- billboard geometry;
- anchor-grid specification and card placements;
- instantiated loose parts and normalized positions.

The studio exposes four output paths:

- **COPY SOURCE** — copies the exact generated TypeScript file contents;
- **DOWNLOAD .TS** — downloads the exact generated source file;
- **WRITE REPO** — under local `next dev`, writes the exact generated source to the fixed canonical repository path and lets normal HMR pick it up;
- **COPY SPEC** — retains the plain data object as a secondary debugging/interchange form.

`WRITE REPO` is intentionally development-only. The API accepts no destination path from the browser, writes only the canonical generated file, validates the generated marker/schema, rejects oversized payloads, and returns `LOCAL_DEV_ONLY` outside development. A Vercel preview therefore cannot mutate repository source, but COPY SOURCE / DOWNLOAD .TS still require no AI interpretation.

On a fresh browser or after clearing editor-local state, v0.5 hydrates the editor from the authored generated module. Thus the loop is now:

`runtime source -> visual edit -> compile -> source -> runtime`

rather than:

`screenshot -> prose/spec -> AI -> CSS -> screenshot`.

## Anchor Grid

The Excel-style `PICK YOUR GRID` control is interpreted as a lattice of **points**, not boxes.

A card placement is represented by node id, anchor point `(column, row)`, and one attached corner: `NW`, `NE`, `SW`, or `SE`. The point is the shared alignment primitive; the corner tells the renderer which side of that point the object occupies.

The coordinate space is the **machine workfield**, not the apparatus box. The existing viewport-sized pan surface is the workfield DOM boundary; the movable apparatus remains a separate child layer containing semantic cards. The editor renders the complete lattice on the workfield and converts a selected workfield anchor back into apparatus-local coordinates only when positioning a card. This is a structural distinction, not an overflow trick.

Consequences:

- every visible grid point across the workfield is a real snap target;
- grid rails are tiled from the same row/column fractions used by snapping rather than painted as long pseudo-lines from apparatus points;
- two cards can share one point with opposite corners and become exactly adjacent;
- multiple cards can share a row or column without independently tuned offsets;
- changing grid density remaps existing anchors to the nearest corresponding points;
- a card whose own dimensions change remains attached by the same corner;
- `RELEASE` removes the grid placement and restores its underlying authored/default placement.

During drag, the editor tests every valid `(point, corner)` pair that keeps the card inside the **workfield**. The nearest valid relationship is previewed as a ghost before drop. Drag-over/drop capture is workfield-wide, so blank machine margins are as functional as the original authored board. While editing, placed cards are continuously reprojected from workfield anchors if the apparatus transform changes, so panning does not silently detach a card from its selected lattice point.

The generated source contract does not change: it still stores `(column, row, corner)`. Normal runtime interpretation uses the current desktop workfield to resolve those anchors and then projects them into apparatus-local coordinates. On mobile, where the desktop pan surface is intentionally hidden and the machine becomes a document rack, the runtime falls back to the prior apparatus-relative percentage interpretation.

## Parts Box and free placement

The Parts Box uses the physical Lab Machine vocabulary already present on the page:

- connector: `SINGLE`, `MULTI`, `PLEX`, `EXTENDED`, `PORT`;
- tube: straight `TUBE` and `ELBOW`;
- panel: `MODULE` and `WIDE MODULE`.

Dragging a primitive onto the machine creates an independent instance. Placed parts are bounded to the apparatus and stored as normalized center coordinates rather than raw screen coordinates. A part can be selected, moved by dragging, and removed by double-click or Delete / Backspace.

Cards and loose parts deliberately use different placement contracts: cards use the stricter shared workfield anchor lattice because mutual alignment is structural; loose machine parts currently use free apparatus-relative normalized placement.

## Next

Useful next increments are:

- make the generated source module the broader canonical desktop-machine geometry registry, not only the editor-authored deltas;
- make grid points nestable / locally refinable so a coarse workfield lattice can contain denser sub-lattices;
- expose direct card resize handles against the same geometry contracts;
- add magnetic attachment rules between card edges, ports, connectors, and tubes;
- add a guarded Git/GitHub commit action only if repository authentication is deliberately provisioned, rather than embedding credentials in the public editor.

The important constraint is unchanged: the editor manipulates declared geometry and attachment relationships; it does not accumulate arbitrary corrective CSS.
