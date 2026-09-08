# Current Status — Screen Wall Catalog

**Canonical workstream:** 24  
**Status:** prototype merged / QA and polish remain  
**Updated:** 2026-09-08

The original Screen Wall design spec has been implemented as the `/proto/playground` prototype. The active work is no longer conceptual design from scratch.

## Current implementation state

- The Wall -> Screen -> World interaction grammar is implemented.
- `/proto/playground` exists on `main`.
- The prototype includes Curated Wall, Arcade Wall, and Workbench Wall projections.
- Typed ports/relations, physical apparatus treatment, bounded low-motion previews, and in-place inspection are implemented.

## Remaining work

Use `local_polish_and_merge.md` as the active execution checklist:

- run `npm run verify`;
- inspect all desktop/tablet/mobile compositions in a real browser;
- verify route-to-port alignment and no false topology;
- verify keyboard/focus behavior;
- verify reduced motion;
- verify magnified inspection and return behavior;
- harden CSS/path support where needed;
- preserve the existing interaction grammar rather than redesigning the wall.

## Historical design

`design_spec.md` is retained as the implemented predecessor specification. It is design provenance, not a second open root workstream.
