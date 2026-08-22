# Provenance and Scope Protocol

## Representational layers

```text
L0  upstream working corpus / repositories / original artifacts
      ↓ editorial selection
L1  current source packets (02 UX, 12 Webpage, website packet)
      ↓ present refinement
L2  refined public-interface stack in this archive
      ↓ later implementation/publication
L3  deployed website, atlas views, documents, and public assets
```

## Rules

- L1 is the bounded source input for this refinement pass; it is not asserted to exhaust L0.
- Manifest omissions in L1 do not establish upstream nonexistence.
- L2 editorial cleanup may deduplicate, re-sequence, classify, and align current nomenclature, but historical sources remain untouched in `source_snapshot/`.
- L3 may compress L2 for audience and medium but should retain a path to source/provenance and current claim status.
- No downstream layer may promote a research claim merely through polish, repetition, or visibility.
