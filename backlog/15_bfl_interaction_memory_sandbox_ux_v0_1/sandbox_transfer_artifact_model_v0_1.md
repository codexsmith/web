# Sandbox Transfer and Artifact Model v0.1

## Purpose

Define how objects cross from the canonical Boundary First Labs website into a user-controlled whiteboard/sandbox, how they persist locally, and how they may later return to the Lab as candidate artifacts without collapsing provenance boundaries.

## Core rule

> Transfer meaning, not DOM.

The public website, sandbox, and saved file are projections of typed objects. The transfer layer should serialize semantic identity, provenance, and transfer semantics rather than copying arbitrary HTML.

## Canonical-to-sandbox flow

```text
canonical object
      |
      | Send to Sandbox
      v
transfer envelope
      |
      v
sandbox object
```

Candidate transferable kinds:

- paper;
- section;
- claim;
- equation;
- figure;
- citation;
- graph node;
- graph relation;
- search result set;
- experiment state;
- trail;
- session;
- external/local artifact later.

## Transfer envelope

Illustrative shape:

```json
{
  "schema": "bfl-transfer/1",
  "kind": "paper",
  "id": "paper:bound-distinction",
  "title": "Bound Distinction and Distinction Space",
  "transferMode": "reference",
  "source": {
    "uri": "/publications/bound-distinction",
    "canonicalId": "paper:bound-distinction",
    "version": "sha256:..."
  },
  "projection": {
    "label": "Bound Distinction",
    "section": null,
    "excerpt": "..."
  }
}
```

The exact schema should be versioned and validated before implementation.

## Transfer modes

### Reference

Retains a live relationship to a canonical object.

Required behavior:

- retains stable canonical ID/URI;
- may resolve current source metadata;
- may report `source updated since added`;
- local layout/annotation does not mutate the source.

### Snapshot

Freezes the relevant source representation at a known version/time.

Required behavior:

- records source ID and version/hash;
- preserves enough material to reconstruct what was captured;
- remains stable even if the canonical source later changes;
- may link to current canonical state for comparison.

### Fork

Creates a mutable derivative with retained provenance.

Required behavior:

- records source ancestry;
- explicitly marks the object non-canonical;
- allows user edits;
- may later be packaged as a candidate artifact;
- never silently updates the canonical source.

## Sandbox object model

Minimum board object fields should include:

```text
id
kind
title / label
transfer mode
source provenance
local position / geometry
local presentation state
annotations
relations
created / imported timestamps
schema version
```

Optional typed payloads may support equations, figures, experiments, citations, or structured claims.

## Trail object

A trail captures meaningful traversal through the public corpus.

Illustrative shape:

```json
{
  "schema": "bfl-transfer/1",
  "kind": "trail",
  "events": [
    { "type": "visit", "target": "research:schemathematics" },
    { "type": "visit", "target": "paper:schema-object" },
    { "type": "inspect", "target": "paper:schema-object#invariants" }
  ]
}
```

A trail imported into a board becomes manipulable: nodes may be repositioned, annotated, collapsed, compared, or surrounded by untraversed canonical relations.

## Session object

A session may include a bounded superset of a trail:

- traversal events;
- searches/filters;
- sections inspected;
- expanded evidence;
- experiment states;
- local notes;
- objects sent to sandbox;
- explicit user-created bookmarks.

Session capture must remain user-directed. Raw exhaustive telemetry should not automatically become a portable artifact without clear UX and privacy boundaries.

## Sandbox Port

The site may expose a persistent **Sandbox Port**.

Supported actions:

- button/menu: `Send to Sandbox`;
- context action on typed objects;
- drag-to-port enhancement;
- keyboard accessible equivalent;
- touch accessible equivalent.

Dragging a canonical object into the port means copy/project into sandbox, not remove from source.

Within the sandbox, dragging normally means mutate local layout.

The UI should distinguish these semantics.

## Local persistence

### Browser-local

Use IndexedDB or equivalent for autosave and recovery.

UI language should be explicit:

> Stored on this device/browser

Do not represent browser-local persistence as archival guarantee.

### Portable file

Export a user-owned `.bflab` artifact.

Initial implementation may serialize JSON directly under the custom extension.

Future container:

```text
board.bflab
├── manifest.json
├── board.json
├── trace.json
├── provenance.json
└── assets/
```

### Re-import

Support:

- explicit file picker;
- drag/drop;
- schema/version validation;
- provenance warnings;
- unknown/unsupported object preservation where feasible;
- migration path for older schema versions.

### File System Access enhancement

Where supported, direct open/save handles may improve the desktop-like workflow. This must remain progressive enhancement rather than a platform requirement.

## `.bflab` manifest candidate

```json
{
  "schema": "bflab/1",
  "artifactId": "uuid",
  "kind": "sandbox-board",
  "createdAt": "...",
  "updatedAt": "...",
  "app": {
    "name": "Boundary First Labs",
    "schemaVersion": 1
  },
  "contents": {
    "board": "board.json",
    "trace": "trace.json",
    "provenance": "provenance.json"
  }
}
```

The schema should eventually specify canonical serialization rules if hashes/signatures are used for provenance or reproducibility.

## Shared-room transition

A local board may explicitly become collaborative.

```text
PRIVATE LOCAL BOARD
        |
        | Share / Create room
        v
SHARED ROOM
```

The shared room is a synchronization state, not a change in canonical status.

At any point a participant should be able to save a local `.bflab` copy of the board state they are authorized to access.

## Return path to the Lab

Future candidate flow:

```text
sandbox/fork
   |
   | Package candidate
   v
candidate artifact
   |
   | validate provenance / content / permissions
   v
review boundary
   |
   v
canonical corpus
```

This is intentionally not automatic synchronization.

A candidate should retain:

- ancestry;
- changed objects;
- author/contributor attribution when provided;
- evidence/assets;
- provenance;
- schema version;
- explicit statement of what is being proposed for capture.

## Security and trust boundary

Imported `.bflab` files are untrusted input.

Implementation must:

- validate schema and size limits;
- avoid executing embedded script/HTML;
- sanitize textual rendering where necessary;
- treat embedded assets as data, not executable content;
- constrain decompression/resource use if ZIP containers are adopted;
- preserve unknown data only when safe;
- clearly warn on broken/missing provenance.

## Acceptance criteria

- Semantic typed objects cross into the sandbox without DOM copying.
- Reference, snapshot, and fork are explicit transfer modes.
- Trail/session data can be represented as first-class objects.
- Browser-local autosave works without account infrastructure.
- A portable artifact can be exported and re-imported.
- Imported files are validated as untrusted input.
- Sharing a board does not make it canonical.
- A future return-to-Lab flow has an explicit validation boundary.
- Dragging is optional enhancement, never the only transfer method.
