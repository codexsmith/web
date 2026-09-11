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
- `BfuxLayoutStudio.tsx` — live visual tuning surface.

Legacy `representation-lab-billboard-layout.css` and `representation-lab-billboard-polish.css` are retained as history but are no longer imported by the card and must not receive new fixes.

## Open the studio

Append `?bfux=edit` to the Lab Machine URL.

The first pilot exposes the billboard's:

- card width;
- gap above Products;
- visual/copy split;
- maze scale and X position;
- maze padding;
- copy padding;
- title scale;
- lower control-row height.

Changes apply immediately to the rendered card and persist in browser `localStorage` separately for Core and Full. `COPY CONFIG` exports the current values as JSON so a finished visual state can be baked into the contract in one commit instead of recreated through screenshot iteration.

## Next

Generalize the registry from the billboard to any `[data-bfux-editable]` instrument, then add direct drag/resize handles and named child-region selection. The important constraint is unchanged: the editor manipulates declared layout variables; it does not write arbitrary CSS overrides.
