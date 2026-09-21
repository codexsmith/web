# Boundary First Visual Mathematics Workstation

This package is the mathematics-specific instrument layer beneath `/sandbox/distinction-space`.

It is intentionally distinct from the cross-domain Representational Lab chassis.

```text
Representational Laboratory family
  -> Visual Mathematics Workstation
       -> specimen definition
       -> specimen runtime adapter
       -> specimen-specific mathematics
```

## Stable workstation anatomy

The workstation owns:

- minimal program/room context;
- specimen rack and active-specimen identity;
- explicit claim/status display;
- `OPERATE / RECORD / EXPLAIN` command pod;
- fixed input-rack / specimen-chamber / telemetry geometry;
- transport controls when a specimen has temporal or phase state;
- a lower inspection bay that does not replace the live chamber;
- a common record envelope for specimen identity, implementation, operative state, presentation, construction path, and provenance.

## Specimen contract

A specimen has two deliberately separate pieces.

### Definition

`VisualMathSpecimenDefinition` is plain data. It declares:

- stable ID and version;
- public label;
- epistemic / claim status;
- experimental question;
- claim boundary;
- implementation identity;
- provenance;
- representation/construction path;
- supported capabilities.

This layer is serializable and can later feed catalog, Screen Wall, provenance, or routing surfaces.

### Runtime adapter

The React specimen component owns the actual mathematics and state:

- controls;
- execution;
- chamber rendering;
- telemetry;
- transport;
- specimen-specific record payload;
- specimen-specific explanation.

Runtime adapters are **not** required to share a domain state model.

## Architecture-proof specimens

### Hopf fibration

Status: `ESTABLISHED CONTROL`

The workstation and homepage use the same `HopfFiberCanvas` implementation. The homepage card opens `/sandbox/distinction-space?specimen=hopf`, so the public object becomes the specimen loaded into the instrument rather than a disconnected animation.

Construction path:

```text
S2 base
  -> section / lift
  -> S1 fiber action
  -> S3 state
  -> stereographic projection
  -> visible R3 object
```

The classical mathematics is not claimed as BFL-original. The workstation and rendering/inspection treatment are BFL implementation work.

### Boundary Attractor

Status: `EXPERIMENTAL BFL DYNAMICS`

This specimen continues to execute the existing bounded `/api/simulate` contract. Its operative state and telemetry remain dynamics-specific: seed, sampling, boundary terms, transport terms, closure, defect, persistence, extent, frame, trail, and camera state.

Its presence beside Hopf is intentionally adversarial to over-abstraction: the two specimens share an instrument interface without being claimed to share one mathematical ontology.

## Command semantics

### OPERATE

Manipulate the selected mathematical object through its own lawful controls. The rack and chamber remain stable while the contents reconfigure by specimen.

### RECORD

Preserve a reconstructable record envelope:

- specimen ID/version/status;
- implementation;
- operative state;
- presentation state;
- construction path;
- provenance;
- state URL / record note.

The record schema is shared. Its `state` and `presentation` payloads remain specimen-specific.

### EXPLAIN

Open the specimen's representation/construction path while leaving the chamber visible. Explanation should expose actual computational stages rather than replace the instrument with documentation prose.

## Deferred intentionally

Do not add yet:

- Compare / Benchmark as a permanent command;
- universal mathematical state schema;
- universal renderer;
- forced common telemetry;
- Clifford/tesseract/Lp/Calabi-Yau cartridges before this two-specimen architecture is validated;
- Schemathematics runtime semantics inferred from React structure.

`COMPARE` should be introduced only after multiple canonical specimens demonstrate that the comparison contract is meaningful and reconstructable.

## Next validation gates

1. Build/typecheck the two-specimen route.
2. Verify homepage Hopf -> `?specimen=hopf` continuity.
3. Verify specimen switching does not erase the other specimen's in-session state.
4. Verify Record manifests retain claim status and provenance.
5. Verify Explain keeps the chamber visible on desktop and mobile.
6. Verify the established-control / experimental-BFL distinction remains visually structural.
7. Only then add the next specimen cartridge.
