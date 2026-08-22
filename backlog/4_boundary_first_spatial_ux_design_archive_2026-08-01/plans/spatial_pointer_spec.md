# Boundary-Aware Spatial Pointer Specification

## Problem

Perspective projection is many-to-one. A screen point corresponds to a set of possible world targets, yet conventional cursors behave as though the inverse mapping were unique. Nearest-surface ray casting resolves geometry but often discards depth intent, semantic context, containment, permissions, and consequence.

## Interaction state

```text
I_t = (
  view ray or volume,
  depth interval,
  candidate objects,
  semantic scope,
  task context,
  action mode,
  interaction history,
  authority context
)
```

## Four states

### Orient

Survey frames, rooms, and artifact clusters without commitment.

### Probe

Expose candidate targets along a spatial and semantic volume. Narrow by depth, intent, focus, and current operation.

### Bind

Commit to a target and its local reference frame. Surface provenance, dependencies, and available actions.

### Act

Execute a permitted transformation with preview, validation, and feedback.

## Candidate resolution

Candidate ranking may consider:

- geometric correspondence;
- depth;
- containment;
- semantic relation to task;
- interaction continuity;
- admissibility;
- authority;
- consequence of error.

Ranking must remain visible enough to avoid becoming an opaque agent guess.

## Input mapping example

- mouse movement: angular orientation;
- wheel: depth through candidate field;
- click: propose/commit boundary;
- hold and move: manipulate within local frame;
- escape: return to previous closure;
- modifier: change semantic scale or candidate type.

## Required properties

- preview before consequential commit;
- stable selection hysteresis;
- explicit ambiguity state;
- visible forbidden/unauthorized actions and reason;
- local-frame manipulation;
- nested containment traversal;
- keyboard/list fallback;
- configurable motion and visual intensity.

## Prototype boundary

The first prototype should use one room, ten artifacts, three depth layers, one nested source-to-claim path, one restricted object, and one promotion gate.
