# PlayHTML Runtime Posture v0.1

## Purpose

Record how the small PlayHTML library may be used as an interaction/collaboration runtime without allowing it to define Boundary First Labs artifacts, provenance, or canonical research state.

## Why it is interesting

PlayHTML exposes a compact set of concepts that map well onto the participation plane:

- persistent element state;
- persistent page state;
- ephemeral presence;
- ephemeral events;
- element-level interaction capabilities;
- shared state that can be rendered through different markup/projections.

This makes it a useful candidate for rapidly prototyping an inhabited research site and collaborative sandbox.

## Boundary First interpretation

| PlayHTML concept | BFL interpretation |
|---|---|
| room | bounded shared interaction domain |
| element state | state of a shared object |
| page data | state of the containing workspace/system |
| presence | observers/operators currently inside the boundary |
| events | transient interventions / interaction flux |
| hover/awareness | current inspection/attention signal |
| move/duplicate/toggle | admissible state transformations |
| shared element | one underlying shared object with multiple projections |
| read-only consumer | observation without mutation authority |
| custom play behavior | domain-specific transformation grammar |

This mapping is architectural inspiration, not a claim that PlayHTML implements Boundary Theory.

## Appropriate uses

Evaluate PlayHTML for:

- coarse live occupancy on paper/object pages;
- section/object awareness;
- shared experiment state;
- shared whiteboard/sandbox state;
- transient remote-inspection indicators;
- collaborative movement or grouping of sandbox objects;
- custom domain interactions for math/physics/Distinction Space experiments;
- sharing one model state across distinct visual projections.

## High-value experiment candidates

### Shared Distinction Field

Participants can create, duplicate, move, bind, inspect, and group distinctions in one shared space.

### Collective Fourier Machine

Participants contribute or manipulate components of a common signal while the site renders the shared function, spectrum, and reconstruction.

### Shared Observer Sandbox

Participants share one underlying physical/model state while retaining local observer/camera/measurement projections where appropriate.

This directly tests the distinction between:

```text
shared system state
vs.
local observer representation
```

### Shared research whiteboard

Participants manipulate a BFL sandbox board whose schema remains portable outside the room.

## Architectural prohibition

PlayHTML must not define the canonical object model.

```text
.bflab / BFL typed model
        |
        +--> local IndexedDB
        +--> portable file
        +--> optional account persistence
        +--> shared-room synchronization
                  |
               PlayHTML candidate
```

The BFL data model must remain usable if PlayHTML is removed or replaced.

## Persistence posture

The current PlayHTML/public-host model should be treated as experimental collaboration infrastructure, not archival storage.

Before any serious public-write deployment, evaluate:

- hosting/control of the shared-state service;
- room access and authorization model;
- encryption/privacy posture;
- retention and deletion;
- abuse/rate limits;
- moderation needs for public shared rooms;
- data export/recovery;
- provider failure or migration path.

A public prototype may use a hosted default only with non-sensitive disposable data and clear experimental framing.

## Projection principle

One of the most valuable ideas to preserve is that a shared source state can appear through different projections.

Conceptually:

```text
shared object S
    |
    +--> research graph projection
    +--> paper projection
    +--> sandbox card projection
    +--> read-only embed projection
```

This should inform the BFL schema even if the final runtime is not PlayHTML.

## Presence posture

Use PlayHTML-style presence for meaningful occupancy rather than cursor theater on ordinary reading pages.

Preferred:

- `2 here`;
- `1 viewing this section`;
- `experiment active`;
- `3 participants in board`;
- remote-inspection tick.

Reserve named avatars, cursors, and follow-user behaviors for explicitly collaborative rooms.

## Custom interaction posture

Custom behaviors should operate on typed domain objects and admissible transformations.

Examples:

```text
Distinction -> create / bind / separate / group
Fourier mode -> add / remove / amplitude / phase
Research object -> reference / snapshot / fork / connect
Sandbox node -> move / annotate / duplicate / relate
```

The runtime should not become a second ontology encoded implicitly in DOM attributes. Domain actions should map back to explicit typed operations in the BFL participation model.

## Evaluation criteria

A PlayHTML prototype is successful only if it demonstrates one or more of the following cheaply:

- useful social presence with low complexity;
- shared manipulation of typed objects;
- clear shared-state/local-projection separation;
- fast collaborative sandbox implementation;
- graceful interoperability with local/portable BFL artifacts.

It is not successful merely because elements can be dragged around collaboratively.

## Exit strategy

Any prototype should make replacement possible.

Keep behind a collaboration adapter such as:

```text
PresenceProvider
SharedRoomProvider
SharedBoardTransport
EphemeralEventBus
```

The rest of the application consumes BFL domain events/state rather than PlayHTML-specific data structures directly.

This allows future replacement with PartyKit directly, Yjs/CRDT infrastructure, another provider, or a self-hosted collaboration layer without changing the `.bflab` model.

## Acceptance criteria

- PlayHTML remains optional collaboration infrastructure.
- Local sandbox and file import/export work without it.
- Canonical content never depends on it.
- Shared-room state can serialize back into a BFL artifact.
- Public presence defaults to coarse anonymous awareness.
- Runtime-specific state is isolated behind an adapter boundary.
- A prototype tests domain-specific interaction rather than generic draggable HTML alone.
