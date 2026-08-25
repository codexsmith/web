# Next Work Register — Interaction Memory & Sandbox UX v0.1

## Objective

Turn the interaction-memory / sandbox concept into bounded implementation experiments without prematurely coupling the public site to a collaboration vendor or making exploratory state canonical.

## P0 — Define the domain model first

- [ ] Define `bfl-transfer/1` schema.
- [ ] Define `bflab/1` manifest schema.
- [ ] Define minimum sandbox object union/type registry.
- [ ] Define transfer modes: `reference`, `snapshot`, `fork`.
- [ ] Define source provenance fields and source-version/hash posture.
- [ ] Define trail/session event vocabulary.
- [ ] Define import validation, size limits, and unknown-object handling.
- [ ] Add schema fixtures and round-trip tests before UI work.

**Exit condition:** a typed object can round-trip from canonical record -> transfer envelope -> sandbox state -> portable JSON -> imported sandbox state with provenance intact.

## P0 — Minimal local whiteboard

- [ ] Create a sandbox/workbench prototype route or isolated feature flag.
- [ ] Render typed cards/nodes for at least paper, section, claim, and trail.
- [ ] Support selection, movement, connection, grouping, deletion, and annotation.
- [ ] Provide non-drag controls for all core actions.
- [ ] Autosave board state locally using IndexedDB.
- [ ] Clearly label local persistence as device/browser-local.
- [ ] Add `New board`, `Save to computer`, and `Open Lab file` actions.
- [ ] Validate and safely reject malformed imports.

**Exit condition:** anonymous user can build a board, close/reopen the site, export it, clear local state, then reconstruct it from file.

## P0 — Send to Sandbox

- [ ] Add an application-level semantic transfer adapter independent of DOM.
- [ ] Support `Send to Sandbox` from a paper/object page.
- [ ] Support `Send section` from a publication section.
- [ ] Preserve canonical IDs and URLs.
- [ ] Default initial transfer semantics explicitly; do not silently conflate reference/snapshot/fork.
- [ ] Prototype a visible Sandbox Port in the boundary frame/chassis.
- [ ] Add drag-to-port only after button/keyboard/touch transfer works.

**Exit condition:** canonical object becomes a typed sandbox object without copying raw page markup.

## P1 — Trail capture

- [ ] Define meaningful navigation-event filtering so the trail is not raw browser telemetry.
- [ ] Provide `Send trail to Sandbox`.
- [ ] Auto-layout imported trail as a path/graph.
- [ ] Allow collapse of navigation-only nodes.
- [ ] Allow reveal of nearby canonical branches around the personal trail.
- [ ] Support saving trail as part of `.bflab`.

**Exit condition:** a user's exploration through the research graph can become an inspectable/rearrangeable board object.

## P1 — Personal wear experiment

- [ ] Define a bounded wear score model.
- [ ] Start with local-only anonymous history.
- [ ] Implement 3–5 discreet material wear levels.
- [ ] Keep wear texture separate from semantic state colors.
- [ ] Provide accessible history metadata/tooling separate from texture.
- [ ] Respect reduced motion, forced colors, and high contrast.
- [ ] Add reset/clear-personal-history control.

**Exit condition:** returning user can perceptually distinguish untouched and familiar objects without the site looking damaged or gamified.

## P1 — Presence experiment

- [ ] Add a provider-neutral `PresenceProvider` interface.
- [ ] Prototype anonymous object-level occupancy.
- [ ] Prototype section visibility awareness using viewport observation.
- [ ] Use `viewing/here`, never unsupported cognitive language such as `reading`.
- [ ] Keep identities hidden on public reading surfaces.
- [ ] Add machine-vs-human type marker support for future operator/agent presence.

**Exit condition:** two browsers can see coarse, privacy-preserving mutual presence on a selected research surface.

## P1 — PlayHTML proof of concept

- [ ] Evaluate package/runtime compatibility with the current Next.js application.
- [ ] Keep integration behind adapter boundaries.
- [ ] Prototype one shared room with disposable/non-sensitive state.
- [ ] Prototype one domain-specific interaction, not merely drag/move.
- [ ] Candidate A: Shared Distinction Field.
- [ ] Candidate B: Collective Fourier Machine.
- [ ] Candidate C: Shared Observer Sandbox.
- [ ] Candidate D: Shared BFL whiteboard.
- [ ] Verify shared-room state can serialize to local BFL board state.
- [ ] Document hosting/privacy/retention posture before any public writable rollout.

**Exit condition:** PlayHTML either demonstrates a clear reduction in collaboration complexity while preserving the BFL model boundary, or is rejected without sunk architectural coupling.

## P2 — Collective wear / social navigation

- [ ] Define aggregate event collection that cannot reconstruct individual browsing history unnecessarily.
- [ ] Establish minimum traffic threshold before exposing collective signals.
- [ ] Prototype polished relation/path rendering.
- [ ] Prototype section-level aggregate wear.
- [ ] Ensure collective wear cannot be confused with quality/status/evidence maturity.
- [ ] Add opt-out / privacy posture as required by final telemetry implementation.

**Exit condition:** aggregate use creates useful orientation/desire paths without producing a leaderboard or surveillance surface.

## P2 — Shared room lifecycle

- [ ] `Create shared room` from local board.
- [ ] Explicit local -> shared boundary transition.
- [ ] Participant/permission model.
- [ ] Read-only sharing mode.
- [ ] Save current shared state to local `.bflab`.
- [ ] Re-open local `.bflab` into a new shared room.
- [ ] Room expiry/deletion/retention behavior.
- [ ] Abuse and public-room posture.

## P2 — Candidate artifact capture

- [ ] Define `Package as candidate artifact` action.
- [ ] Generate change/provenance summary from reference/snapshot/fork ancestry.
- [ ] Preserve local authorship/contributor information only when supplied/authorized.
- [ ] Define review boundary before repo/corpus import.
- [ ] Never write directly into canonical data from public sandbox state.

## Technical design questions

1. Should `.bflab` v1 be plain JSON with a custom extension, or ZIP from the beginning?
2. Which source-version identity is stable enough for snapshot/reference comparison: commit SHA, content hash, generated object version, or combination?
3. Should a board contain embedded source excerpts for reference objects, or resolve them dynamically unless explicitly snapshotted?
4. What is the minimum typed object registry needed to make the first whiteboard useful?
5. How much traversal history is meaningful enough to capture without becoming telemetry exhaust?
6. Can personal wear remain fully local initially?
7. What aggregate privacy threshold is required before collective wear is displayed?
8. Is PlayHTML sufficient for room persistence/conflict semantics, or should it be limited to presence/events while a CRDT/provider owns shared board state?
9. What explicit UI distinguishes copying/projecting an object into the sandbox from moving it inside the sandbox?
10. Should the Sandbox Port live persistently in the boundary frame or appear contextually when an object is transferable?

## Suggested first vertical slice

Build the smallest complete ownership loop before live collaboration:

```text
paper object
   |
Send to Sandbox
   |
   v
local board
   |
   +--> autosave IndexedDB
   |
   +--> export `.bflab`
            |
            v
        re-import
            |
            v
      reconstructed board
```

This proves the central Boundary First claim: a canonical representation can cross into a user-owned mutable boundary and return as a portable representation without losing identity or provenance.

Only after that loop works should live presence/shared-room infrastructure become a dependency.
