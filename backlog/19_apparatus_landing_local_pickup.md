# Task: Pick Up and Refine the Apparatus Landing Locally

**Status:** handoff / local implementation  
**Date:** 2026-08-27  
**Current implementation:** `src/components/entrance/ApparatusLandingHome.tsx`  
**Originating PR:** #44 — `Add apparatus landing component`  
**Merged commit:** `3b3c3ae9f14b3bab127efca5122fef29abed253b`

## Goal

Continue the new Boundary First Labs public landing-page direction locally, using the merged `ApparatusLandingHome` component as the concrete starting point.

The work is no longer at the loose mood-board stage. A first React/Tailwind implementation now exists. The next step is to render it in the browser, refine its proportions and physical grammar against the intended visual language, and then decide how it should enter the site's actual entrance architecture.

The target is:

> **An understated institutional instrument panel that unmistakably belongs to the Boundary First UX family.**

It should feel physical and engineered without becoming decorative machinery, retro-futurist theater, cyberpunk, steampunk, or a generic admin dashboard.

## Current state

`ApparatusLandingHome` is merged into `main` as a standalone component.

It is intentionally **not yet wired as the canonical root landing page**. This keeps the design isolated while it is being tuned.

The component currently contains:

- a full-page warm institutional-beige enclosure;
- restrained panel seams, inset surfaces, screws, and side handles;
- a top identity/status rail;
- the existing proposition: **Software for difficult systems.**;
- the existing public-purpose copy;
- four compact domain markers: Method, Research, Products, Public interest;
- an `ENTER THE LAB` action, defaulting to `/software`;
- a large right-side **Representation loop** instrument;
- a deliberately blank lower panel reserved for later use;
- a darker green apparatus accent currently set to `#355f3f`.

The Representation Loop center contains only a powered/status point. The earlier `BF` mark was specifically removed from that instrument. The separate `BF` identity tile in the upper-left header remains.

## Design decisions already made

These decisions should be treated as constraints for the next local pass rather than reopened accidentally during implementation.

### 1. Institutional beige chic, not worn industrial

The desired physicality is clean, cared-for, and institutional:

```text
scientific instrument
+ university / government lab equipment
+ precision office machinery
+ tasteful industrial design
```

Not:

```text
rust
+ grime
+ distressed metal
+ submarine boiler room
+ steampunk prop
```

Surface variation should come primarily from panel depth, seams, fasteners, subtle material shifts, and mechanical construction—not dirt or artificial age.

### 2. Understated before busy

An earlier apparatus direction became too crowded with gauges, switches, health lamps, log output, and decorative controls.

That was intentionally simplified.

The landing page should have enough physical structure to establish the UX family immediately, but it should still breathe like a public-facing editorial page.

Useful rule:

> **Physical hierarchy over mechanical density.**

If a control, meter, port, label, or fitting has no present semantic job, do not add it merely to increase apparatus-ness.

### 3. Darker green is the primary signal accent

The accent moved from purple, to a high-visibility pastel green idea, and then to a darker version of that green so the page remained restrained.

The current implementation uses:

```text
#355f3f
```

Treat this as a working value, not necessarily a permanent brand token. The important visual behavior is:

- beige / cream carries the physical body;
- charcoal carries language and structure;
- green indicates powered state, active paths, labels, or intentional emphasis;
- green should not flood large areas of the page.

### 4. The Representation Loop is an instrument, not a logo holder

The right-side object should read as a real conceptual instrument:

```text
MODEL
  |
REPRESENTATION
  |
EVIDENCE

OBSERVE --- center --- ACT
```

Its geometry should feel systematic, inspectable, and mechanically plausible.

Do not put `BF` back in the middle.

The center may be a light, indicator, aperture, node, or other neutral operating element.

### 5. The lower apparatus panel stays blank for now

The lower panel previously contained knobs, system-health indicators, and log output. That content was removed deliberately.

The current blank panel is a placeholder for future information architecture.

Do not populate it simply because the empty space feels unfinished. Its emptiness is currently part of the composition.

## Local pickup sequence

Start from current `main`:

```bash
git checkout main
git pull
npm install
npm run dev
```

Before changing Next.js routing or framework behavior, read the repository `AGENTS.md`. This project is on Next.js 16.3 and explicitly requires checking the locally installed Next documentation rather than relying on older framework conventions.

### Fastest way to render the component

The cleanest first local move is to give the component a temporary dedicated preview route rather than replacing the root immediately.

For example, create:

```text
src/app/apparatus-landing/page.tsx
```

with:

```tsx
import { ApparatusLandingHome } from "@/components/entrance/ApparatusLandingHome";

export default function ApparatusLandingPreviewPage() {
  return <ApparatusLandingHome />;
}
```

Then inspect:

```text
http://localhost:3000/apparatus-landing
```

A dedicated route makes it easy to compare the apparatus version against the existing root experience without prematurely changing routing, entrance selection, metadata, or the larger `WorldApp` behavior.

The preview route can remain local-only while iterating, or be committed later if it proves useful as an intentional design sandbox.

## First local refinement pass

Prioritize visual composition before architectural generalization.

### A. Tune the enclosure

Inspect at several desktop widths, especially wide screens where the apparatus frame should feel like a coherent physical object rather than a webpage with rounded corners.

Questions:

- Is the outer enclosure too thick or too soft?
- Do the side handles help imply physical scale, or do they become decorative noise?
- Are the screws sparse enough?
- Does the beige have enough value separation between body, plate, and inset panel?
- Do shadows communicate depth without making the design glossy?

### B. Tune the hero balance

The page should remain editorially calm.

The left proposition is the primary verbal object. The right instrument is the primary visual object. Neither should overwhelm the other.

Look especially at:

- headline scale and line breaks;
- amount of empty space above and below the copy;
- density of the four Method / Research / Products / Public interest summaries;
- CTA height and physical treatment;
- vertical alignment between hero and instrument.

If the page starts feeling like a dashboard, remove elements before adding more.

### C. Refine the Representation Loop

This is the strongest opportunity to make the component feel native to Boundary First rather than generically skeuomorphic.

Improve it through **logical physicality**:

- precise rings and axes;
- believable attachment / terminal locations;
- clear distinction between structural lines and active green paths;
- labels that correspond to actual conceptual positions;
- a center that reads as operating state rather than branding;
- subtle panel/grid backing rather than luminous sci-fi effects.

The final result should make the conceptual structure easier to read because it is physicalized.

### D. Preserve restraint

Avoid adding back:

- decorative analog gauges;
- generic knobs;
- arbitrary toggle banks;
- fake terminal logs;
- large clusters of status LEDs;
- excessive piping;
- labels whose only function is atmosphere.

Those motifs belong elsewhere in the broader Boundary First apparatus family when the represented object actually warrants them.

## Integration boundary

Do **not** make this the production root merely by swapping it into the catch-all route.

The current site has substantial root/WorldApp behavior, governed product landing routing, projection state, and entrance machinery. The apparatus landing should be proven visually first, then integrated intentionally.

After the local visual pass, choose among these integration paths:

1. **Root replacement** — apparatus becomes the public `/` landing while existing deeper routing remains unchanged.
2. **Entrance variant** — apparatus becomes another explicit entrance implementation alongside the existing entrance components.
3. **Apparatus shell extraction** — physical enclosure primitives become reusable BFUX components, and the root page composes them with the existing entrance/content architecture.
4. **Design sandbox only** — keep this component as a reference/prototype and translate only its successful grammar into the production surfaces.

Do not decide this before seeing the component running locally.

## Likely reusable primitives

If the local refinement confirms the direction, candidates for later extraction include:

- `InsetPanel`
- `StatusPlate`
- fastener / screw treatment
- physical frame / enclosure
- instrument label treatment
- powered-state indicator
- apparatus accent token
- representation instrument geometry

Do not extract these prematurely. First establish that their visual grammar is correct in one strong composition.

## Known rough edges to inspect

The current component was created as a first implementation pass and has not yet gone through the full local browser/toolchain loop.

Explicitly check:

- TypeScript;
- ESLint;
- Tailwind arbitrary-value compilation;
- responsive behavior below desktop widths;
- text wrapping in the top rail;
- Representation Loop label collisions;
- large-screen vertical fit;
- focus states and keyboard navigation;
- contrast of muted labels against beige surfaces;
- whether the side handles interfere with content at intermediate widths.

Run at minimum:

```bash
npm run lint
npm run typecheck
npm run build
```

The repository also exposes the comprehensive validation command:

```bash
npm run verify
```

Use that before merging any final integration change.

## Acceptance test for the next pass

The local refinement is ready for integration discussion when all of the following are true:

- the first impression is **institutional instrument**, not vintage machinery;
- the page is obviously part of the same physical Boundary First UX family as the other apparatus work;
- the layout still feels calm and public-facing rather than like an operator dashboard;
- the green accent is distinctive but restrained;
- the Representation Loop is legible without a logo in its center;
- every visible physical detail appears intentional;
- the blank lower panel still works compositionally without filler content;
- desktop proportions feel deliberate at common laptop, 1440p, and ultrawide widths;
- mobile/tablet recomposition remains understandable even if it is less physically immersive;
- lint, typecheck, and build pass locally.

A useful final question is:

> **If the text disappeared, would the structure still look like Boundary First machinery—and if the machinery disappeared, would the page still work as a strong public landing page?**

The target is for both answers to be yes.

## Handoff summary

The visual direction is established and the first component is merged. The immediate job is not to invent another landing page. It is to **render this one, tune it, remove anything that is merely decorative, strengthen the logical physicality of the Representation Loop, and only then decide how the apparatus grammar should join the production entrance system.**
