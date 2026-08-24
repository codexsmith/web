# P4 Third-Layer Route Inventory

This inventory reviews the active public manifest-backed records against their canonical BFUX graph objects.

The structural migration is uniform: the legacy alias becomes a compatibility entrance and the retained record renders inside the canonical object's main content area. The visual/content migration is intentionally not uniform: each important record should eventually receive a composition suited to what it represents.

| Legacy alias | Canonical graph object | Detail status | Next design burden |
| --- | --- | --- | --- |
| `/agency-audit` | `/products/current/agency-representation-audit` | **Specialized P4** | Validate service/audit workflow density and pilot-call-to-action behavior. |
| `/software-before-code` | `/publications/methods/software-before-code` | **Specialized P4** | Validate method trace, diagnostics, and long-form reading rhythm. |
| `/corpus-forge` | `/products/current/corpus-forge` | Transitional structured record | Build a research-operations workbench: ingest → extract → relate → review → promote → repair, with provenance/claim ledgers as instruments. |
| `/boundary-first-ux` | `/publications/methods/boundary-first-ux` | Transitional structured record | Build a standard/conformance surface: primitives, interaction grammar, accessibility obligations, renderer independence, conformance ladder, examples. |
| `/closure-driven-software-development` | `/publications/methods/closure-driven-software-development` | Transitional structured record | Build a progressive-closure delivery instrument with gates, uncertainty reduction, witness, repair, and worked-case slots. |
| `/weather` | `/research/applied-testbeds/weather` | Transitional structured record | Build a computational-research testbed surface: hypothesis, baseline, diagnostics, simulation/ensemble comparison, validation ladder, claim firewall. |
| `/law` | `/research/applied-testbeds/law` | Transitional structured record | Build a legal-research surface emphasizing authority, source hierarchy, claim standing, precedent/interpretation relations, and explicit non-advice boundary. |
| `/chess` | `/research/applied-testbeds/chess` | Transitional structured record | Build a practitioner/testbed board: doctrine, position/decision examples, observable consequences, validation against established chess practice. |
| `/soccer` | `/research/applied-testbeds/soccer` | Transitional structured record | Build a practitioner/testbed field: spatial boundaries, role/transition grammar, examples, observable tactical consequences, validation burden. |
| `/schemathematics` | `/research/formal-theory/schemathematics` | Transitional structured record | Build a formal-program surface: object vocabulary, definitions, dependency graph, propositions/conjectures, worked constructions, proof/validation standing. |

## Canonical ownership notes

Publication-backed public methods and standards are owned by the publication node when its publication metadata names the manifest JSON as `sourceRef`. This prevents a research or engineering-context link from re-parenting the public record.

Exact identity owns the record next: for example, `corpus-forge`, `boundary-first-weather`, `boundary-first-chess`, `boundary-first-soccer`, and `schemathematics` have graph identities aligned with their retained-record IDs.

Unique explicit link ownership handles records whose graph ID intentionally differs from the manifest ID, including Agency & Representation Audit and Constitutional Law & Jurisprudence.

## Non-active exceptions

Unlisted collaboration bridges are not silently promoted into this system. They remain governed direct-link surfaces with explicit relationship-status policy until a public canonical graph identity is deliberately declared.

Held legacy/reconciliation records remain blocked from public routing.

## Migration priority

The next specialized third-layer designs should prioritize by public importance and representational payoff rather than by manifest order:

1. **Corpus Forge** — strongest opportunity for an actual operational workbench rather than prose.
2. **Boundary First UX** — the doctrine should demonstrate its own conformance/interaction grammar.
3. **Closure-Driven Software Development** — naturally maps to a gate/trace/process instrument.
4. **Weather** — establishes the research-testbed visual grammar reusable for other experimental domains.
5. **Schemathematics** — establishes the formal-research visual grammar.
6. **Law** — establishes a high-provenance domain-research grammar.
7. **Chess / Soccer** — establish practitioner/testbed variants once the reusable research grammar is stable.

The generic structured record is therefore a migration safety net, not a target design.
