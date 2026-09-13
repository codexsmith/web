# Visual Mathematics Workstation implementation note

**Canonicalized:** 2026-09-13  
**Provenance:** extracted from `agent/representational-labs-cantor-mvp`, where it was originally stored under the superseded Workstream 28 Representational Laboratory Suite path.

This work is being implemented on a dedicated branch from `main` so the Cantor / generic Representational Lab chassis can remain independently reviewable.

The architecture has two layers:

1. **Representational Lab chassis** — cross-domain family pattern for claim boundaries, execution/consequence surfaces, trace, and recovery.
2. **Visual Mathematics Workstation** — mathematics-specific instrument with specimen rack, chamber, specimen-defined controls and telemetry, Operate / Record / Explain commands, construction-path inspection, and later Compare.

The first architecture-proof milestone is intentionally only two specimens:

- Boundary Attractor — experimental BFL dynamics;
- Hopf fibration — established mathematical control implemented from the same construction already used by the homepage research visualization.

The workstation must not collapse the two objects into a common domain model. It standardizes the instrument interface while each specimen retains its own mathematical/runtime implementation.

Compare / Benchmark is explicitly deferred until multiple canonical specimens use the workstation successfully.
