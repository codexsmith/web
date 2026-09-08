# Current Status — Lab Machine Governed Object Registry

**Canonical workstream:** 23  
**Status:** core implemented / historical handoff; residual hardening remains  
**Updated:** 2026-09-08

The original `README.md` records the prototype-handoff state and is retained as implementation provenance. Some of its open-gap language is now stale.

## Closed since the handoff

- The Lab Machine and governed-object registry architecture are present on `main`.
- A specialized Publications projection now exists at `src/components/bfux/LabMachinePublicationsProjection.tsx`.
- Publications now exposes the three modes anticipated by the handoff: **Publication Program**, **Maturity**, and **Claim Provenance**.
- Therefore the README statements that Publications is the major specialized-projection gap or that “Publications remains incomplete” are no longer current.

## Residual work

- Distinguish **traverse relation** from **project object** wherever graph traversal and cross-subsystem projection remain partially conflated.
- Reconcile manually curated registry sources toward a canonical generated/typed governed-object model.
- Replace index-coupled cable geometry with edge-keyed geometry if that implementation debt still remains.
- Revisit the default loaded carrier.
- Continue targeted runtime, responsive, keyboard, reduced-motion, high-contrast, and forced-color QA as the Lab Machine evolves.
- Preserve distinct semantics for temporal, operational, epistemic, publication, and other projections.

## Successor / dependency

Public-layer projection naming and consolidation are now tracked in:

`backlog/20_public_front_door_and_projection_consolidation/`

This `STATUS.md` is authoritative for current backlog state; `README.md` remains the historical handoff record.
