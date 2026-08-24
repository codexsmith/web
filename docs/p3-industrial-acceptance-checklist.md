# P3 industrial visual QA checklist

This checklist verifies the industrial visual-language pass without reopening settled P0-P2 navigation semantics.

## Canonical surfaces

- [ ] `/?world=1`
- [ ] `/research`
- [ ] `/public-interest`
- [ ] `/products`
- [ ] `/publications`
- [ ] `/about`

## Frame and control chrome

- [ ] Top frame reads as a structural housing, not a floating navbar.
- [ ] Home + Back/Forward read as one recessed traversal instrument.
- [ ] Search reads as Inspect, with a recognizable BFUX glyph at 24px-class scale.
- [ ] World / Evidence / Process each have distinct glyphs and remain legible before selection.
- [ ] Active projection is mechanically distinct from inactive projections without relying only on color.
- [ ] Widen/Narrow controls read as context-scale operations rather than generic plus/minus buttons.
- [ ] Disabled controls remain visibly disabled.
- [ ] Focus-visible state remains obvious on keyboard traversal.

## Traversal and local coordinates

- [ ] Traversal rail has etched trace continuity.
- [ ] Current focus is visually stronger than historical nodes.
- [ ] Containment/Up uses nested-context grammar.
- [ ] Peers use adjacency/relation grammar.
- [ ] Local sections read as coordinates within one object, not peer navigation.
- [ ] History and local coordinate controls remain usable on mobile.

## Search

- [ ] Search reads as a diagnostic console rather than a generic modal.
- [ ] Search input reads as a recessed instrument field.
- [ ] Facets read as constrained controls.
- [ ] Result cards retain clear match-reason hierarchy.
- [ ] Close, Escape, focus trap, and focus restoration still work.

## Inspection

- [ ] Inspection reads as a diagnostic bay/drawer.
- [ ] Retained source uses trace/evidence grammar.
- [ ] Close remains accessible and obvious.
- [ ] Long source identifiers remain readable and do not overflow the housing.

## Content surfaces

- [ ] Region cards feel like bounded modules rather than generic SaaS cards.
- [ ] Subject action cards distinguish record, inspection, and relation through glyph semantics.
- [ ] World content remains the visual primary surface despite stronger chrome.
- [ ] Evidence cards use the same material law without weakening evidentiary distinctions.
- [ ] Claim ceiling remains visually distinct.
- [ ] Process stages retain sequence and primary-placement legibility.

## Material discipline

- [ ] Brushed texture is visible only at low amplitude.
- [ ] Text contrast is not reduced by texture.
- [ ] Raised controls, recessed wells, and panel housings have distinguishable depth.
- [ ] Borders have hierarchy; not every surface is equally boxed.
- [ ] No decorative rust, scratches, faux wear, or neon sci-fi effects were introduced.
- [ ] Section accents remain categorical, not evidence-state signals.

## Responsive and accessibility

- [ ] Desktop: 1440px-class viewport.
- [ ] Compact desktop/tablet: 980px boundary.
- [ ] Mobile: 720px and 430px boundaries.
- [ ] Touch targets remain adequate.
- [ ] Projection microcopy remains understandable where space allows.
- [ ] Forced-colors mode removes decorative material while preserving boundaries and glyph meaning.
- [ ] Icons are never the sole accessible name for icon-only controls.
- [ ] Meaning remains intelligible in monochrome.

## Projection transport regression

- [ ] Evidence intent survives an unsupported-object fallback.
- [ ] World fallback is visibly explicit.
- [ ] Evidence automatically resumes on the next supported object.
- [ ] Industrial styling does not make fallback look like stronger evidence standing.

## Exit criterion

P3 is visually ready when the interface reads immediately as a Boundary First industrial apparatus while the content, topology, provenance, and interaction contracts remain easier—not harder—to inspect.
