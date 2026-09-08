# Satire & Audio Content Model v0.1

**Status:** Proposed  
**Date:** 2026-08-25  
**Parent:** [README.md](./README.md)

## 1. Purpose

Define a durable content and production model for satire, spoken-word pieces, synthetic performances, dialogue, and audio-native Boundary First Labs artifacts.

The central rule is:

> Audio is a projection. Satire is a transformation. Neither should erase the source structure or the artifact's epistemic status.

## 2. Editorial contract

Satire is permitted to exaggerate, compress, fictionalize, juxtapose, personify, and dramatize.

It is not permitted to become ambiguous about whether its invented elements are canonical research evidence.

Every satirical artifact should make at least the following states mechanically representable:

- this is satire;
- this contains fictionalization, if material;
- this uses synthetic performance, if applicable;
- this is related to one or more serious/canonical objects, when such objects exist;
- this has a human-editable script or transcript;
- this may have sources/reference notes independent of the comic performance.

## 3. Boundary Violations series model

**Boundary Violations** is the preferred recurring satire series title.

Its format should be broad enough to include text, audio, video-like scripted material, and interactive pieces.

A minimal episode structure:

```text
BOUNDARY VIOLATIONS
Episode title

Target system / domain
Structural defect or contradiction
Comic projection
Serious/canonical relationships
Disclosure state
Script / transcript
Optional audio performance
Optional interactive projection
```

The series should not require every episode to teach Boundary Theory explicitly. The method can remain structural while the public artifact simply works as comedy.

## 4. Candidate artifact schema

Illustrative only; adapt to the repository's actual content architecture.

```ts
type PlaygroundArtifact = {
  id: string
  slug: string
  title: string
  kind:
    | 'satire'
    | 'audio'
    | 'interactive'
    | 'toy'
    | 'visual'
    | 'hybrid'

  series?: string
  summary?: string
  status?: 'draft' | 'prototype' | 'published' | 'archived'

  epistemic: {
    satire?: boolean
    fictionalized?: boolean
    syntheticPerformance?: boolean
    canonical?: false
  }

  script?: {
    format?: 'narration' | 'dialogue' | 'scene' | 'memo' | 'hearing' | 'psa' | 'other'
    text: string
  }

  transcript?: string

  audio?: {
    asset?: string
    durationSeconds?: number
    performerMode?: 'human' | 'synthetic' | 'mixed'
    providerMetadata?: Record<string, unknown>
  }

  relations?: Array<{
    type: string
    targetId: string
  }>

  sourceNotes?: Array<{
    label?: string
    uri?: string
    note?: string
  }>

  publishedAt?: string
  updatedAt?: string
}
```

Provider-specific speech configuration should remain optional metadata rather than defining the artifact itself.

## 5. Script as canonical production object

For audio-first pieces, retain the script independently of generated audio.

Recommended production chain:

```text
idea / structural defect
        |
        v
script
        |
        +--> editorial revision
        +--> fact/source check where relevant
        +--> disclosure metadata
        |
        v
performance specification
        |
        +--> human performance
        +--> synthetic performance
        +--> mixed performance
        |
        v
audio asset
        |
        +--> transcript
        +--> web player
        +--> excerpts / alternate projections
```

This keeps the BFL artifact portable across providers and permits later re-performance without reconstructing the original logic from an audio file.

## 6. Synthetic repertory company

A useful production metaphor is a small **synthetic repertory company**: a reusable cast of fictional or generic voice roles used across many BFL pieces.

Possible recurring roles:

- Extremely Concerned Narrator
- Deputy Assistant Administrator
- Helpful Corporate Voice
- Systems Engineer Who Has One Question
- Committee Chair
- Compliance Voice
- The Machine
- Public Information Officer
- Customer Who Has Read the Documentation

These are roles, not imitations of identifiable people.

A recurring cast can create recognizable BFL audio texture without coupling the work to celebrity mimicry or individual identity.

## 7. Performance specification

A script may carry optional direction separate from text:

```text
voice_role
pace
tone
energy
interruptibility
pause markers
scene / speaker boundaries
pronunciation notes
sound cues
```

Keep the semantic script clean enough to render as readable text even when the performance layer is unavailable.

Avoid embedding a single provider's proprietary prompt syntax as the only copy of performance direction.

## 8. Synthetic-performance disclosure

The UI should make synthetic performance discoverable without turning every piece into a compliance banner.

Candidate labels:

```text
SYNTHETIC PERFORMANCE
AI-PERFORMED AUDIO
SYNTHETIC CAST
```

The disclosure should be visible near player metadata or artifact details and survive deep linking.

For mixed human/synthetic work, label the mixed state rather than implying all voices were produced the same way.

## 9. Satire disclosure

Candidate labels:

```text
SATIRE
SATIRICAL PROJECTION
FICTIONALIZED SATIRE
```

The label should not depend only on a tiny footer disclaimer.

An artifact can remain funny while still communicating its category clearly.

## 10. Source relationship

Satire can be source-grounded without pretending that every joke is a sourced factual proposition.

A useful separation is:

```text
SERIOUS SOURCES / CANONICAL OBJECTS
- source research
- evidence
- institutional document
- data object

SATIRICAL TRANSFORMATION
- invented dialogue
- compression
- exaggeration
- metaphor
- absurd extension
```

The artifact should link to the former while clearly identifying the latter as the performed transformation.

This enables visitors to move from laughter to inspection rather than being asked to trust the satire as evidence.

## 11. Audio UX requirements

Every public audio artifact should support:

- play/pause;
- seek;
- current time and duration when available;
- keyboard-operable controls;
- readable transcript;
- transcript available without requiring playback;
- no autoplay by default;
- clear artifact/disclosure metadata;
- graceful failure if the audio asset is unavailable;
- narrow-screen support;
- optional speed control if the player architecture can support it cleanly.

Audio should enhance the object, not gate access to its meaning.

## 12. Transcript posture

The transcript is a first-class projection, not merely an accessibility afterthought.

It enables:

- reading instead of listening;
- search/indexing;
- citation to specific passages if later supported;
- semantic extraction;
- alternate speech providers;
- translation or adaptation;
- linking script segments into the sandbox;
- future multimodal projections.

Where performance materially departs from the written script, preserve a true transcript or clearly distinguish `script` from `transcript`.

## 13. Initial format library

The Playground should make several repeatable production grammars easy to author.

### Institutional announcement

```text
OPEN: calm official premise
ESCALATE: procedural consequence
NORMALIZE: narrator treats absurdity as routine
REVEAL: underlying contradiction becomes unavoidable
BUTTON: short final line
```

### Fake hearing

```text
CHAIR: asks literal question
WITNESS: answers according to system incentives
CHAIR: notices mismatch
WITNESS: explains why mismatch is technically compliant
ESCALATION
```

### Training film

```text
WELCOME
DESIRED BEHAVIOR
SYSTEM RULE
IMPOSSIBLE EDGE CASE
CORRECT CORPORATE RESPONSE
CHEERFUL CLOSING
```

### Systems support call

```text
USER describes real-world problem
SYSTEM translates it into internal ontology
USER corrects the model
SYSTEM explains ontology is authoritative
```

### Documentary narrator

A sober voice describes the observed behavior literally enough that the contradiction supplies the comedy.

These are reusable grammars, not mandatory templates.

## 14. Generation pipeline posture

AI may assist with:

- drafting variants;
- converting source notes into a scene outline;
- creating dialogue alternatives;
- timing and shortening;
- performance direction;
- voice rendering;
- transcript normalization;
- tagging and relationship suggestions.

The pipeline should preserve checkpoints so that generated material is inspectable before publication.

Recommended state progression:

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

Do not optimize for one-click volume. The desired output is authored BFL material with machine assistance, not anonymous generated inventory.

## 15. Content integrity checks

Before publication, a satire/audio artifact should be mechanically or editorially checked for:

- artifact category present;
- satire label present when satire;
- synthetic-performance state present when synthetic;
- transcript present for audio;
- related canonical/source IDs valid when supplied;
- no broken media asset;
- no accidental claim that fictional dialogue is a quote;
- no unauthorized real-person voice imitation in ordinary production;
- no autoplay requirement;
- fallback content present for unavailable media.

## 16. Future interactive audio

Audio can later become a live Playground material rather than a linear file.

Possible experiments:

- route one machine's numeric output into synthesis parameters;
- patch a text object's structure into a sonic representation;
- let a visitor rearrange scene cards and re-render a local performance;
- transform a research traversal into narrated or musical structure;
- expose audio outputs as sandbox objects;
- connect multiple Playground machines through typed ports.

These should build on the semantic transfer model from Pass 15 rather than inventing a parallel untyped media graph.
