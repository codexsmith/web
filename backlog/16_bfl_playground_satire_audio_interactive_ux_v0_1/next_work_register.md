# Playground / Satire / Audio Next Work Register

**Status:** Open backlog  
**Date:** 2026-08-25  
**Parent:** [README.md](./README.md)

## Immediate objective

Prove that Boundary First Labs can expose **Lab** and **Playground** as two legible, first-class modes of the same institution without confusing the epistemic boundary between canonical research and playful transformations.

## P0 — Landing-page two-entry prototype

- [ ] Prototype **ENTER THE LAB** beside **ENTER THE PLAYGROUND** using the current landing-page grammar.
- [ ] Prototype the alternate microcopy **or go around back →** while retaining an explicit Playground label for clarity.
- [ ] Check narrow-screen, keyboard, touch, reduced-motion, and high-contrast behavior.
- [ ] Confirm the Playground entrance reads as a first-class path rather than a hidden easter egg.
- [ ] Preserve a no-audio/no-animation-required path through the landing page.

### Decision to make

Choose whether the production landing uses:

1. explicit paired entrances;
2. Lab entrance + back-door microcopy;
3. explicit Playground label with back-door visual treatment.

Current recommendation: prototype #3 first.

## P0 — Minimal Playground index

- [ ] Create a `/playground` or equivalent route using the existing BFL structural chassis.
- [ ] Add a persistent path back to the Lab.
- [ ] Seed the index with representative placeholder/prototype objects rather than waiting for a full corpus.
- [ ] Support at minimum the artifact families `satire`, `audio`, and `interactive`.
- [ ] Ensure artifact kind/disclosure remains visible on deep-linked objects.

### Seed set

Use three deliberately different artifacts to test the architecture:

1. one **Boundary Violations** satire/audio item;
2. one **Strange Machine** / web toy;
3. one existing or planned visualization/sandbox artifact.

## P0 — Boundary Violations pilot

- [ ] Select one already well-understood systems contradiction from the BFL corpus.
- [ ] Identify the structural defect in one or two sentences before writing comedy.
- [ ] Draft one short script using a repeatable format such as institutional announcement, hearing, training film, or support call.
- [ ] Retain source/canonical relationships separately from invented dialogue.
- [ ] Add visible `SATIRE` labeling.
- [ ] Test whether the piece still exposes the intended structure after the jokes are removed from consideration.

### Pilot success question

Can a visitor understand the underlying contradiction more quickly after hearing/reading the piece, then follow a clear link into the serious material?

## P0 — Audio projection primitive

- [ ] Define the minimum audio artifact fields in the site's actual content architecture.
- [ ] Retain script and transcript separately when needed.
- [ ] Add synthetic-performance metadata.
- [ ] Implement no-autoplay player behavior.
- [ ] Make transcript readable without playback.
- [ ] Define graceful fallback when an audio asset fails.
- [ ] Keep speech-provider configuration replaceable.

## P1 — Synthetic repertory company

- [ ] Define a small cast of generic/fictional recurring voice roles.
- [ ] Establish performance-direction metadata independent of provider syntax.
- [ ] Evaluate one or more text-to-speech/script-performance providers for multi-character rendering, pronunciation control, pacing, cost, licensing, and export reliability.
- [ ] Record provider evaluation separately from the canonical artifact schema.
- [ ] Create a disclosure component for synthetic or mixed performance.
- [ ] Avoid ordinary production workflows that depend on real-person voice imitation.

## P1 — Typed Lab ↔ Playground relations

- [ ] Determine where stable content IDs currently live in the web/corpus architecture.
- [ ] Add a relation representation capable of many-to-many projections.
- [ ] Support an initial `related_projection` relation.
- [ ] Prototype `SEE THE SERIOUS VERSION →` on a Playground object.
- [ ] Prototype a restrained reciprocal link on one serious object.
- [ ] Confirm neither side duplicates the canonical content body as a second source of truth.

### Candidate relation vocabulary

- `related_projection`
- `satirizes`
- `performs`
- `narrates`
- `sonifies`
- `visualizes`
- `compresses`
- `remixes`
- `forks_from`
- `source_object`

Do not freeze this vocabulary until it is reconciled with the existing corpus relation model.

## P1 — Playground card grammar

- [ ] Define a card/object grammar that feels like a workbench object rather than a social-media post.
- [ ] Expose kind, premise, status, duration/interaction scope, and disclosure only when meaningful.
- [ ] Allow a card to show a serious-source relationship without turning it into citation clutter.
- [ ] Explore material treatments that loosen the Lab's finish while preserving its structural frame.

## P1 — Content integrity checks

- [ ] Validate satire category/disclosure before publish.
- [ ] Validate synthetic-performance disclosure when applicable.
- [ ] Require transcript for public audio.
- [ ] Check related source IDs.
- [ ] Ensure fictional dialogue cannot render as a sourced quotation by accident.
- [ ] Check media availability and fallback.
- [ ] Confirm interactive state is not labeled canonical.

Where practical, implement these as schema/build-time checks rather than editorial memory alone.

## P2 — Strange Machines

- [ ] Define the smallest typed interactive artifact contract.
- [ ] Build one machine with serializable semantic state.
- [ ] Add `SEND TO SANDBOX` or equivalent using the Pass 15 transfer model.
- [ ] Provide a non-drag interaction path.
- [ ] Preserve useful behavior on mobile.
- [ ] Provide a meaningful fallback when rich interaction is unavailable.

## P2 — Playground patching / Rube Goldberg mode

- [ ] Explore a patch-bay grammar for connecting output from one Playground object to input on another.
- [ ] Reuse Boundary First UX ports/access-panel grammar.
- [ ] Define typed input/output capability declarations.
- [ ] Separate transport/runtime concerns from artifact semantics.
- [ ] Evaluate PlayHTML where shared live state is useful, without making it the artifact authority.
- [ ] Prototype one absurd but legible chain across at least two tools/machines.

Example:

```text
text / data object
      |
      v
transform machine
      |
      v
visual or sonic generator
      |
      v
sandbox capture
```

## P2 — Audio as manipulable material

- [ ] Allow transcript segments to become sandbox objects.
- [ ] Explore scene-card rearrangement for dialogue pieces.
- [ ] Explore local re-performance from edited scene order.
- [ ] Treat performance parameters as typed state where useful.
- [ ] Explore sonification as a representation transform rather than a separate media silo.

## P3 — Discovery and search

- [ ] Add lightweight Playground facets only after enough content exists to justify them.
- [ ] Support kind, topic/domain, series, duration, interaction level, status, and source-relationship filters where useful.
- [ ] Avoid copying the full research taxonomy into the primary browsing experience.
- [ ] Preserve serendipitous cross-domain discovery.

## P3 — Editorial/generation tooling

- [ ] Define a reusable prompt/workflow for turning a selected structural defect into several satire format candidates.
- [ ] Preserve the human-selected structural target before generation begins.
- [ ] Add editorial checkpoint before voice rendering.
- [ ] Add source/disclosure checkpoint before publication.
- [ ] Add transcript verification after rendering.
- [ ] Store scripts in a provider-independent representation.
- [ ] Avoid optimizing the system for volume alone.

Candidate state machine:

```text
source-selected
-> structural-target-defined
-> script-draft
-> editorial-pass
-> source/disclosure-pass
-> performance-render
-> transcript-check
-> publishable-artifact
```

## Open naming questions

- [ ] Confirm **Playground** as the durable umbrella name.
- [ ] Confirm **Boundary Violations** as the recurring satire series.
- [ ] Decide whether **Radio / Audio** receives a stronger branded name after several pieces exist.
- [ ] Decide whether **Strange Machines** is a category, route label, or recurring series.
- [ ] Preserve **Things We Made Because We Could** as an optional catch-all rather than forcing it into navigation immediately.

## Open design questions

- [ ] How visibly different should Playground material finish be from the Lab?
- [ ] Does the persistent frame expose a Lab/Playground mode marker everywhere or only at high-level routes?
- [ ] How should a playful artifact visually express that its source is canonical while it is not?
- [ ] Should cross-projection links behave like doors, ports, hatches, or ordinary textual links?
- [ ] How much motion/sound is appropriate before the Playground begins to compete with accessibility and orientation?
- [ ] Can visitor interaction history/wear from Pass 15 produce useful Playground discovery without creating popularity ranking?

## Open architecture questions

- [ ] Reconcile Playground artifact typing with the site's existing content-data schema before introducing a parallel schema.
- [ ] Reconcile relation names with the existing corpus/knowledge-graph vocabulary.
- [ ] Identify whether audio assets belong in repo/static hosting, an object store, or another delivery layer.
- [ ] Decide whether script/transcript text should be included in the main searchable corpus.
- [ ] Define version/provenance behavior when a serious source changes after a satire projection is published.
- [ ] Define whether a Playground fork can ever graduate into a canonical artifact and, if so, through what explicit capture/review boundary.

## Acceptance gate for first implementation

Do not call the first Playground slice complete until:

- [ ] a visitor can choose Lab or Playground from the landing experience;
- [ ] the distinction is understandable without sound or animation;
- [ ] one satire/audio artifact is clearly labeled and transcript-accessible;
- [ ] one interactive artifact works by touch and keyboard as applicable;
- [ ] one Playground object links to serious material;
- [ ] one serious object can link back without becoming visually promotional;
- [ ] synthetic performance is disclosed where used;
- [ ] no Playground state silently becomes canonical;
- [ ] the visitor can always find a clear path back into the Lab.
