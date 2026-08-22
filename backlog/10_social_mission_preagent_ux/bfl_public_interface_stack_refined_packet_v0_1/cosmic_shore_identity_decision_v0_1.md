# Cosmic Shore identity decision v0.1

**Status:** Superseded by authored reusable asset and adopted for the public website on 2026-08-11  
**Backlog relation:** PI-007; supports the low-motion baseline required before PI-009
**Authoritative implementation:** `backlog/12_full_circle/logo/BoundaryFirstWaveLogo.tsx`

## Decision

Use the authored, fixed-geometry `BoundaryFirstWaveLogo` component as the
persistent Boundary First Labs identity. This implementation supersedes the
earlier storyboard-derived trace. It replaces the concentric-ring brand graphic
in the homepage hero, site header, site footer, browser/app icon, and social
preview. `CircleDot` icons that describe records, states, or interface actions
remain semantic UI icons and are not brand marks.

## Constructive grammar

The authored component defines the visible construction of the emblem:

1. a broken navy circular/celestial ring;
2. a four-point north star in the ring opening;
3. one small navy celestial dot;
4. a teal planetary land mass;
5. three ivory shoreline bands flowing through a navy lower ocean.

Its geometry remains fixed. Production color is controlled through the asset's
semantic variables: boundary, field, field-mid, depth, witness, and spark.

## Color decision

- Light surfaces use the documented statesman palette: navy boundary, teal field,
  slate depth, and gold witness/spark.
- Dark surfaces retain the same semantic roles with ivory boundary and lighter
  teal field values for contrast.
- Deep social/hero field when needed: `#07172C`.

No geometry is changed between surface variants.

## Implemented surfaces

- Authored production component: `src/components/BoundaryFirstWaveLogo.tsx`
- Compatibility wrapper: `src/components/cosmic-shore-mark.tsx`
- Public vector exports: `public/boundary-first-wave-logo.svg` and
  `public/cosmic-shore-mark.svg`
- Homepage hero: `src/components/entrance/SplashEntranceHome.tsx`
- Persistent navigation and footer: `src/components/site-header.tsx` and
  `src/components/site-footer.tsx`
- Cosmic Shore study: `src/components/public-interface/CosmicShore.tsx`
- App icon and manifest: `src/app/icon.svg` and `src/app/manifest.ts`
- Social cards: `src/app/opengraph-image.tsx` and
  `src/app/twitter-image.tsx`

The previous ring favicon and social preview remain recoverable under
`backlog/brand-archive/`.

## Boundary of completion

This decision completes the static identity selection and accessible low-motion
application. It does not complete PI-009: the steward-to-Earth-to-mark cinematic
morph remains a separate progressive-enhancement task.
