# Task: Pick Up and Refine Atlas Space Locally

**Status:** handoff / local implementation  
**Date:** 2026-08-27  
**Current branch:** `feature/atlas-space-instrument`  
**Current PR:** #47 — `Add physical layered Atlas Space instrument`  
**Prototype route:** `src/app/prototypes/atlas-space/page.tsx`  

## Goal

Continue the Boundary First **Atlas Space** prototype locally from the current implemented state rather than reconstructing its design logic from screenshots or conversation history.

Atlas Space is a physicalized, navigable representation of atlasification. It treats domain atlases as layered boards in an instrument, preserves scale and object identity while navigating between them, and makes correspondence claims explicit through typed physical routing rather than generic graph edges.

The current implementation has progressed beyond a visualization mockup. It now includes:

```text
META
  -> FAMILY
    -> FABRICATE
      -> STACK
        -> EXTRACT / LOCAL
          -> CALIBRATE
            -> SUBCHART where available
```

The critical design proposition is:

> **Representation state is operational state.**

A mapped corpus domain, a fabricated UI board, a calibrated semantic mapping, and a validated theory are separate facts and must remain separately represented.

---

## Core epistemic rules

Treat these as invariants, not copywriting:

```text
CORPUS MEMBERSHIP ≠ UI IMPLEMENTATION
FABRICATED IDENTITY ≠ CALIBRATED SEMANTICS
ACCEPTED MAPPING ≠ CLAIM VALIDATION
CORRESPONDENCE ≠ IDENTITY
```

The instrument should never silently promote one state into another.

A corpus domain may exist without a board. A board may be fabricated without semantic ports. A candidate port may exist without being accepted. An accepted local mapping may faithfully represent a source without externally validating the theory asserted by that source.

---

## Current representational scale

The global scale rail is:

```text
META <-> FAMILY <-> STACK <-> LOCAL <-> SUBCHART
```

### META

Shows the four canonical corpus domain families:

- Formal systems
- Natural systems
- Engineered systems
- Linguistic systems

META intentionally does **not** expand when provisional boards are fabricated. It represents canonical family topology, not currently instantiated hardware.

### FAMILY

Shows the real child-domain topology from the canonical Boundary First Library atlas.

Current families and children include:

**Formal systems**
- Mathematics & logic — calibrated/mounted exemplar
- Research systems & methods
- Millennium problems

**Natural systems**
- Physics — calibrated/mounted exemplar
- Biology
- Medicine
- Human factors

**Engineered systems**
- Software engineering
- AI & computation — calibrated/mounted exemplar
- Telecommunications engineering
- Robotics
- Chess
- Soccer

**Linguistic systems**
- Law & governance — calibrated/mounted exemplar
- Politics & economics
- Land, property & housing
- Institutions & organizations
- Education
- Civic infrastructure
- Civilizational systems

### STACK

Contains the four authored exemplar boards plus any provisional boards fabricated during the current session.

Existing authored boards:

- Mathematics & logic
- Physics
- AI & computation
- Law & governance

Generated boards use the same physical rack grammar but are marked as generated / uncalibrated until reviewed mappings exist.

### LOCAL / SUBCHART

Authored boards expose recursive conceptual charts.

Physics currently proves recursion:

```text
Physics
  -> Transport/evolution
    -> Field / physical state
      -> Field chart
```

Generated boards do not inherit or imitate these charts. Until calibrated, their extracted face is a calibration bench.

---

## Corpus authority

Atlas Space currently grounds topology in:

```text
Repository:
  codexsmith/boundary-first-labs

Canonical atlas:
  organized_library_curated/999_Library/00_Library_Atlas.md

Domain root:
  organized_library_curated/999_Library/03_Domains
```

The public prototype may mount corpus topology, package names, source paths, routing metadata, and provenance.

Do **not** copy unpublished Atlasification manuscripts or internal research into the public web repo merely because the source exists in the Lab corpus.

Corpus existence is not publication clearance.

---

## Physical routing contract

Cross-atlas relationships are not generic point-to-point graph edges.

The current routing grammar is:

```text
LOCAL JACK
  -> BOARD TRACE
    -> NUMBERED EDGE CONTACT
      -> TYPED REAR BACKPLANE CHANNEL
        -> OTHER LOCAL JACKS
```

Connector families:

- `THR` — through-channel
- `KEY` — keyed / gated channel
- `TST` — diagnostic / provisional jumper

The rear-bus channel represents a correspondence claim, never literal identity.

The current shared fibers are:

- bound distinction
- state
- admissibility
- closure

Do not add a generated domain to a fiber simply because a matching word sounds plausible.

---

## Generated-board fabrication

Implemented in:

```text
src/components/atlas-space/generated-domain-board.ts
```

A canonical corpus domain with no authored board may fabricate a provisional shell.

Fabrication is allowed to derive only:

- family identity;
- domain identity;
- source path;
- rack code;
- board mark;
- family-specific board pattern;
- physical/UI shell.

Fabrication is **not** allowed to derive:

- conceptual anchors;
- local regions;
- transitions;
- correspondence mappings;
- cross-atlas terminations.

Generated shells therefore begin with no anchors.

The empty wiring is intentional and semantically meaningful.

---

## Biology calibration pilot

Biology is the first generated domain with a real calibration dataset.

Current canonical Biology directory:

```text
organized_library_curated/999_Library/03_Domains/
02_natural_systems__domain_family/
02_biology__domain/
```

Current source:

```text
01_volumion_biology__research_note.md
```

Source blob SHA at calibration time:

```text
f306a240b1d35c345f28ebf151813408aee1a515
```

This SHA matters. A later source revision should be detectable rather than silently changing what an earlier accepted mapping was based on.

### Installed Biology candidate ports

The current source directly or strongly supports four candidate mappings:

| Fiber | Biology-local representation | Evidence posture |
|---|---|---|
| bound distinction | Self-maintaining boundary / `Σ` | direct |
| state | Biological state / `(X, Σ, Φ)` | direct |
| admissibility | Closure-stability threshold | strong |
| closure | Self-maintaining closure / `Σ*` | direct |

Each candidate carries:

- local label;
- local explanatory note;
- evidence summary;
- source section location;
- source path;
- source blob SHA;
- evidence strength.

Implementation:

```text
src/components/atlas-space/domain-calibration.ts
```

### Review states

Each port is independently reviewable:

```text
PENDING
ACCEPTED
REJECTED
```

Partial calibration is a first-class state.

For example:

```text
Boundary      PENDING
State         REJECTED
Admissibility PENDING
Closure       ACCEPTED
```

must produce exactly one live Biology termination: Closure.

No all-or-nothing promotion is allowed.

---

## Durable calibration provenance

A versioned calibration ledger is now implemented in:

```text
src/components/atlas-space/calibration-records.ts
```

Current schema version:

```text
1.0
```

Current browser-storage key:

```text
bf-atlas-calibration-ledger:v1
```

The ledger is intentionally **append-only at the event level**.

Changing a fiber from ACCEPTED to REJECTED creates another record. It does not erase the earlier decision.

The effective current state is reconstructed by taking the latest record for each `(layerId, fiberId)` pair.

A record contains:

```text
schemaVersion
recordId
recordedAt
layerId
familyId / familyCode
domainId / domainCode / domainLabel
fiberId
localLabel
decision

evidence:
  strength
  summary
  location

source:
  repository
  path
  blobSha

corpus:
  atlasPath
  atlasGeneratedAt
  fingerprint
```

This is intentionally suitable for later movement from local browser persistence into a checked-in artifact, API, research ledger, or control-plane service without changing the conceptual object.

### Why append-only

The history matters.

A change from ACCEPTED to REJECTED may mean:

- a source changed;
- a better chart was found;
- the earlier correspondence was too broad;
- a reviewer changed the interpretation;
- a calibration test failed.

Overwriting the old state would destroy exactly the kind of defect / repair history Boundary First is intended to preserve.

---

## Important current implementation detail

The generated board's `anchors` field is a live view of the calibration registry.

Accepted decisions therefore feed the **same routing engine** used by authored boards rather than creating a parallel visual-only system.

Intended chain:

```text
review decision
  -> append calibration record
  -> hydrate/update calibration registry
  -> generated board anchor set changes
  -> existing AtlasSpace renderer reruns
  -> accepted local jack appears
  -> existing trace + edge contact + rear bus path appears
```

This reuse is important. Do not create a separate "calibration wire" renderer.

---

## Known local follow-up: renderer invalidation

The current branch now exposes an `onCalibrationChange` callback through `GeneratedBoardCalibration` and `LocalAtlasChart`, but the final parent invalidation hook still needs to be wired into `AtlasSpace.tsx`.

Do this cleanly locally rather than using a UI trick such as temporarily switching active fibers.

Recommended implementation:

1. Add a small `calibrationRevision` state counter in `AtlasSpace`.
2. Pass `onCalibrationChange={() => setCalibrationRevision((value) => value + 1)}` into `LocalAtlasChart`.
3. Ensure the render path reads generated `layer.anchors` after the increment.
4. Confirm an ACCEPT decision immediately produces exactly one new jack/trace without changing board, fiber, or depth selection.
5. Confirm REJECT or RETURN TO PENDING immediately removes the corresponding live trace.

The revision counter itself does not need semantic meaning. It is merely an explicit React invalidation signal after the external calibration registry changes.

A later cleanup could move the entire calibration registry into React state or a dedicated store, but do not do that until the interaction is proven in-browser.

---

## Local pickup sequence

Start by preserving the feature branch state.

```bash
git fetch origin
git checkout feature/atlas-space-instrument
git pull --ff-only
```

Note: at handoff time the branch is ahead of `main` but `main` has advanced with an unrelated apparatus-landing backlog document. Inspect current divergence before merging or rebasing. Do not mechanically rewrite the feature branch merely to absorb unrelated documentation.

Read:

```text
AGENTS.md
```

before framework/routing changes.

This repo uses Next.js 16.x and repository instructions require checking the locally installed Next documentation rather than assuming older Next behavior.

Install and run:

```bash
npm install
npm run dev
```

Open the isolated prototype route rather than replacing the production root.

Likely route:

```text
http://localhost:3000/prototypes/atlas-space
```

Keep the prototype no-indexed while iterating.

---

## First browser validation sequence

Use Biology because it exercises the complete generated-board path.

Perform this exact traversal:

```text
META
-> Natural systems
-> FAMILY
-> Biology
-> FABRICATE PROVISIONAL BOARD
-> STACK
-> EXTRACT
-> CALIBRATION BENCH
```

Then verify:

1. Biology initially has no live semantic traces if the local ledger is empty.
2. Each of the four candidate mappings shows evidence text, source location, and source SHA.
3. Accept Closure only.
4. Exactly one Biology port becomes live.
5. Exactly one Biology trace reaches the correct typed backplane channel.
6. The other three remain unterminated.
7. Reload the page and navigate back to Biology.
8. The Closure acceptance is restored from `localStorage`.
9. Reject Closure.
10. The trace disappears and both decision events remain in the underlying ledger.
11. Return Closure to PENDING and confirm that is also recorded rather than deleting history.

Inspect browser storage under:

```text
bf-atlas-calibration-ledger:v1
```

Confirm records include the Biology source blob SHA.

---

## Source-drift behavior to implement next

The ledger now records source SHA, but source-drift comparison is not yet surfaced in the UI.

The next principled state is:

```text
CALIBRATED / SOURCE CURRENT
CALIBRATED / SOURCE CHANGED
```

Do not silently preserve an accepted mapping as if nothing happened after its source changes.

Recommended behavior:

1. candidate dataset carries current source SHA;
2. latest accepted calibration record carries reviewed source SHA;
3. compare them;
4. if they differ, keep the historical record but mark the termination `REVIEW REQUIRED / SOURCE CHANGED`;
5. decide whether the physical trace should remain visible but amber/stale, or be electrically opened until re-review;
6. do not delete or mutate the original record.

This creates an executable provenance dependency:

```text
source revision
  -> calibration validity state
    -> visible instrument state
```

---

## Export / import next step

The ledger already has a serializable JSON representation.

A useful local follow-up is a small calibration-ledger utility surface that can:

- copy/export ledger JSON;
- import a ledger after schema validation;
- clear local experimental state deliberately;
- show event count and current effective state;
- optionally filter by domain or fiber.

Do not conflate "clear local browser state" with deleting canonical research history. Browser persistence is currently an experimental local store.

Longer-term destinations could include:

- a checked-in calibration artifact;
- Lab control-plane persistence;
- an RDP provenance object;
- an append-only research ledger service.

The schema should remain transportable across those projections.

---

## Candidate next domain

After Biology works correctly end-to-end, do **not** immediately mass-generate semantic mappings for every domain.

Choose one second domain with good source coverage and a different representational character.

Good candidates:

- Robotics — tests engineered-system semantics;
- Education — tests linguistic/institutional semantics;
- Medicine — tests adjacency to Biology while requiring careful separation;
- Software engineering — tests a mature engineered representational regime.

The purpose of the second calibration is to test whether the calibration grammar generalizes, not to maximize the number of lit-up boards.

---

## Files to understand first

Core navigation and model:

```text
src/components/atlas-space/AtlasSpaceNavigator.tsx
src/components/atlas-space/AtlasSpace.tsx
src/components/atlas-space/atlas-space-model.ts
src/components/atlas-space/lab-corpus-atlas.ts
```

Family / fabrication:

```text
src/components/atlas-space/MetaAtlasOverview.tsx
src/components/atlas-space/FamilyDomainAtlas.tsx
src/components/atlas-space/generated-domain-board.ts
```

Calibration / provenance:

```text
src/components/atlas-space/GeneratedBoardCalibration.tsx
src/components/atlas-space/GeneratedBoardCalibration.module.css
src/components/atlas-space/domain-calibration.ts
src/components/atlas-space/calibration-records.ts
```

Recursive authored charts:

```text
src/components/atlas-space/LocalAtlasChart.tsx
src/components/atlas-space/local-atlas-recursion.ts
```

Physical routing:

```text
src/components/atlas-space/AtlasSpaceWiring.module.css
src/components/atlas-space/atlas-space-wiring-notes.md
```

Scale / projection:

```text
src/components/atlas-space/AtlasSpaceNavigator.module.css
src/components/atlas-space/AtlasSpaceFamilyScale.module.css
src/components/atlas-space/meta-atlas-layout.ts
```

---

## Known engineering cleanup

Do these only after the browser path is working:

- wire the final calibration renderer invalidation callback in `AtlasSpace.tsx`;
- run and fix TypeScript / lint / build issues;
- reconcile the branch with the latest `main` deliberately;
- remove any dead navigator imports / derived values left from earlier projection geometry;
- fix the reduced-motion semantic timer mismatch (`560ms` JS transition vs near-zero CSS motion);
- consider deriving projection duration from transition-end rather than a fixed timer;
- make the extracted generated-board readout say calibration state rather than generic `LOCAL CHART ONLINE`;
- consider a first-class status model instead of encoded display strings;
- preserve keyboard access for all family and calibration controls;
- consider route persistence for family/domain/fiber/path/depth state;
- inspect empty or zero-layer/fiber custom-model behavior;
- avoid creating semantic mappings for unreviewed domains as a side effect of cleanup.

---

## Suggested explicit status model

A future cleanup should make epistemic state data rather than infer it from text labels.

For example:

```ts
presence: "indexed";
board: "mounted" | "generated" | "absent";
mapping: "mapped" | "unmapped" | "partial";
publication: "public" | "internal" | "unknown";
correspondence: "none" | "candidate" | "structural" | "invariant";
calibration: "uncalibrated" | "working" | "validated" | "stale";
```

This is not yet canonical. Refine it against actual needs before introducing it broadly.

---

## Validation commands

Run at minimum:

```bash
npm run lint
npm run typecheck
npm run build
```

Then preferably:

```bash
npm run verify
```

At the time this handoff was written, no successful local npm/typecheck/build had been executed from the connector-only implementation environment. Do not treat PR mergeability or GitHub file writes as build validation.

---

## Acceptance criteria for the next local pass

Atlas Space is ready for the next semantic expansion when all of the following are true:

- META -> FAMILY -> generated board -> STACK -> EXTRACT works in-browser;
- Biology calibration decisions persist across reload;
- calibration records preserve full event history;
- records contain source path and source blob SHA;
- accepting one fiber creates exactly one physical termination;
- rejecting or pending it removes that termination immediately;
- no unrelated fibers appear on generated boards;
- authored exemplar boards remain unchanged;
- source-drift state has a defined UI behavior;
- lint passes;
- typecheck passes;
- build passes;
- the branch is reconciled intentionally with current `main` before merge.

The key test is:

> **Can a reviewer see exactly why a wire exists, which source revision justified it, what decision activated it, and what would cause that wire to require review again?**

If the answer is yes, Atlas Space has crossed from a visual metaphor into an executable representational instrument.
