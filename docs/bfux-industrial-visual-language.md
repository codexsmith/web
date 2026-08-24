# BFUX industrial visual language

P3 makes the existing Boundary First UX structure look like the apparatus it already behaves like. This is a visual-system pass: material, edge, depth, glyph, and instrument state. It does not redefine traversal, containment, projection, evidence standing, or process semantics.

## Provenance

Primary iconography reference: **Boundary First Visual Grammar Reference.png**, retained in the Boundary First workspace Library on 2026-08-22.

The reference is a flat PNG, not a vector asset pack. The website therefore reconstructs its visual grammar as clean inline SVG primitives in `src/components/bfux-icons.tsx` rather than embedding or tracing raster icons at runtime.

The reconstructed glyphs preserve the reference rules:

- one concept per icon;
- one stroke language across the family;
- rounded, geometric construction;
- composition from a small structural alphabet;
- legibility at control scale;
- meaning that survives monochrome rendering.

## Structural alphabet

The visual grammar begins from a small set of reusable marks:

- point / node;
- circle / unit;
- box / container;
- line / relation;
- edge / boundary;
- direction / transition;
- cut / defect;
- port / interface.

Higher glyphs should be composed from these rather than drawn as pictorial illustrations.

## Current website glyph mapping

| Website function | BFUX grammar |
| --- | --- |
| Lab root | invariant / witness inside a unit |
| Back / Forward | trace + directed transition |
| Up | nested context + outward containment traversal |
| Search | inspect |
| World | contexture / bounded object |
| Evidence | witness + evidence trace |
| Process | transition / propagation |
| Widen / Narrow process | contexture + scale change |
| Peers | relation between adjacent bounded objects |
| Traversal rail | trace |
| Projection boundary | defect / boundary condition |

The mapping is semantic. A new icon should not be introduced merely because a control lacks decoration.

## Material hierarchy

The P3 tokens define four physical roles.

### Frame

The darkest structural surface. It contains the public world and should read as the instrument housing.

### Panel

Raised or bounded working surfaces inside the frame. Panels receive etched edges, subtle brushed texture, and low lift.

### Well

Recessed control groups and readout areas. Wells use inset shadow and darker material to communicate that they contain state rather than float above it.

### Control

Operator-actuated elements. Controls use a small bezel, a highlight edge, a dark lower seam, and a pressed state that moves into the surface.

Depth is semantic: a shadow should explain containment, elevation, or actuation.

## Edge hierarchy

1. **Housing edge** — strong boundary between apparatus and content/world.
2. **Panel seam** — etched separation between instrument groups.
3. **Control edge** — smaller bezel around actionable elements.
4. **Trace / evidence line** — semantic linework inside a representation, never confused with a panel seam.

Not every object needs a box. The edge exists where a boundary carries information.

## Texture

Texture is deliberately low amplitude. Brushed-metal and fine-grid layers are structural atmosphere, not decorative noise. They may reinforce a housing, well, or diagnostic surface but must not reduce text contrast or imply fake damage.

Avoid:

- rust, dirt, scratches, or faux wear;
- glossy sci-fi panels;
- neon outlines without semantic state;
- high-frequency noise behind prose;
- gradients that make controls look like consumer-app buttons.

## State colors

Existing Boundary First signal colors remain authoritative. Material styling may frame them but must not invent new standing:

- valid / operative;
- attention / warning;
- information;
- defect / failure;
- unknown / neutral.

Categorical section accents remain separate from evidence or machine state.

## Responsive projection

Industrial language must survive responsive projection without forcing desktop geometry onto a small screen. Mobile may simplify bezels, remove nonessential microcopy, and compress control groups, but it should preserve:

- glyph identity;
- active/inactive state;
- containment boundaries;
- readable focus rings;
- minimum touch targets;
- the distinction between raised controls and recessed state.

## Accessibility

The icon is never the only accessible name for a control. Icon-only presentations keep explicit `aria-label` text. The glyph family uses `currentColor`, supports forced-colors mode, and should remain readable without state color.

## P3 acceptance rule

> Draw the structure first. Give it material only when material improves comprehension.

The industrial pass succeeds when the interface feels engineered because its boundaries, controls, and states are legible—not because it has accumulated visual decoration.
