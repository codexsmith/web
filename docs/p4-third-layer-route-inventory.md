# P4 Third-Layer Route Inventory

This inventory reviews the active public manifest-backed records against their canonical BFUX graph objects.

The structural migration is uniform: the legacy alias becomes a compatibility entrance and the retained record renders inside the canonical object's main content area. The visual/content migration is intentionally not uniform: each important record should eventually receive a composition suited to what it represents.

| Legacy alias | Canonical graph object | Detail status | Next design burden |
| --- | --- | --- | --- |
| `/agency-audit` | `/products/current/agency-representation-audit` | **Specialized P4** | Validate service/audit workflow density and pilot-call-to-action behavior. |
| `/software-before-code` | `/publications/methods/software-before-code` | **Specialized P4** | Validate method trace, diagnostics, and long-form reading rhythm. |
| `/corpus-forge` | `/products/current/corpus-forge` | **Specialized P4 · research-operations workbench** | Validate workbench density and decide whether later interactive drill-down adds value without turning the record into an application shell. |
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

## Specialized grammars established so far

P4 now has three deliberately different third-layer grammars rather than one universal template:

1. **Agency & Representation Audit** — diagnostic/service workflow: operating questions, failure field, audit passes, pilot boundary, evidence rule, claim firewall.
2. **Software Before Code** — practitioner method: object trace, boundary questions, method sequence, stress test, diagnostics, closure, validation ladder.
3. **Corpus Forge** — research-operations workbench: lifecycle backplane, typed object bank, contradiction trace, promotion gates, validation surface, repair/claim boundary.

The generic structured record remains a migration safety net, not a target design.

## Migration priority

The next specialized third-layer designs should prioritize by public importance and representational payoff rather than by manifest order:

1. **Boundary First UX** — the doctrine should demonstrate its own conformance/interaction grammar.
2. **Closure-Driven Software Development** — naturally maps to a gate/trace/process instrument.
3. **Weather** — establishes the research-testbed visual grammar reusable for other experimental domains.
4. **Schemathematics** — establishes the formal-research visual grammar.
5. **Law** — establishes a high-provenance domain-research grammar.
6. **Chess / Soccer** — establish practitioner/testbed variants once the reusable research grammar is stable.
