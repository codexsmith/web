# Content data and Boundary First UX application audit v0.2

**Date:** 2026-07-29  
**Status:** implementation-selection backlog  
**Scope:** live-site review, current content source, and `backlog/bfl_boundary_first_ux`  
**Quantitative appendix:** `content_data_holes_audit_v0_1.md`

## Outcome

The next pass should not add another projection, another navigation family, or
another broad layer of visual polish.

The major Boundary First UX shells are already present:

- the fifteen-scene guided first passage;
- the five-stage domain architecture;
- conventional domain records;
- the global Atlas and its lenses;
- facet focus;
- the four-layer Context Halo;
- the institutional closure view;
- the collaboration framework;
- the typed Work presentation;
- and an accessible public Search route.

The highest-value work now is to reconnect those shells to current,
individually addressable, source-bearing records while restoring the semantic
distinctions that the guide requires.

The recommended immediate tranche is:

1. rebase the Boundary First UX packet to the current canonical source;
2. separate architectural stage, domain family, entity type, status, and
   interaction state in data and presentation;
3. create one canonical public-record registry for claims, documents,
   relations, facets, lineage, and work records;
4. use Representational Mechanics as the first complete, source-bearing
   Context Halo vertical slice.

Small route and focus-scope corrections should ship with this tranche because
they directly enforce the guide's preserved-context rule.

---

## Evidence used

### Live routes reviewed

- `/`
- `/domains`
- `/domain/representational-mechanics`
- `/map?mode=atlas&node=identity&view=work`
- `/map?mode=atlas&node=identity&view=lineage`
- `/map?mode=focus&node=representational-mechanics&view=domains`
- `/map?mode=halo&node=representational-mechanics&view=domains&relation=facet-representational-mechanics-declaration-regime-carrier`
- `/about`
- `/work`
- `/collaborate`
- `/search`

The review used the rendered interaction and accessibility trees, not only
source inspection.

### Current implementation sources reviewed

- `src/content/nodes.json`
- `src/content/facetStatusEvidence.json`
- `src/content/work_portfolio.json`
- `src/app/context/graphNodes.json`
- `src/app/domain/[slug]/page.tsx`
- `src/app/map/page.tsx`
- `src/app/search/page.tsx`
- `src/components/context-halo.tsx`
- `src/lib/map-semantics.ts`
- `scripts/build_graph_context.py`

### Boundary First UX sources reviewed

- `bfl_boundary_first_ux_guide_v0_6.md`
- `bfl_boundary_first_ux_mermaid_wireframes_v0_6.md`
- `bfl_boundary_first_ux_content_pairing_map_v0_1.md`
- `bfl_boundary_first_ux_pairing_audit_v0_1.md`
- `bfl_context_halo_ordering_placement_spec_v0_1.md`
- `bfl_context_halo_relation_schema_v0_1.json`
- `bfl_context_halo_reference_representational_mechanics_v0_1.json`
- `bfl_domain_family_palette_v0_1.json`
- `bfl_work_layer_ui_component_contracts_v0_3.md`
- `bfl_projects_products_migration_plan_v0_1.md`
- the institutional and lineage audits, schemas, and component contracts under
  `bfl_boundary_first_ux/Later`

The very large institutional and lineage registers were queried for their
source, status, and coverage rather than treated as approved public copy.

---

## The central finding: the UX packet is no longer paired to the live corpus

The durable principles in the guide remain useful. Its claimed canonical
pairing does not.

| Boundary | Packet | Live site | Consequence |
| --- | --- | --- | --- |
| Canonical node source | `nodes_boundary_theory_reorganized_v0_3.json` | `src/content/nodes.json` | The guide cannot currently serve as a literal field contract. |
| Node count | 26 | 29 | `contexture`, `system`, and `corpus-forge` are absent from the paired packet source. |
| Identity content version | `4.17.0` | `5.0.0` | Institutional copy remains broadly aligned, but the pairing assertion is stale. |
| Domain architecture | Not defined as the current five-stage browser | 5 stages across 28 non-identity nodes | The most successful new conventional navigation surface is not yet governed by the guide. |
| Representational Mechanics facets | Old nine-facet taxonomy | New nine-facet study-package taxonomy | The packet's strongest Halo seed cannot be copied into production. |
| Packet manifest | v0.5 claims 32 files; contains 31 entries | 38 files are present | The directory has 13 listed paths that moved and 20 present files not represented by the manifest. |

The three live-only nodes are:

- `contexture`;
- `system`;
- `corpus-forge`.

Substantive fields also changed across Boundary Theory, Distinction Space,
Distinction, Admissibility, Emergence, Representational Mechanics, Formal
Grammars, Computational Systems, Corpus, AI as Forge, Boundary First, and the
identity node. This is not a filename-only drift.

### Packet disposition

The packet should be treated in three classes:

1. **Stable design doctrine** — safe to apply now.
2. **Reusable schema or editorial method** — safe after rebasing to the live
   source.
3. **Candidate content seed** — not safe to publish without migration and
   review.

---

## What is already working and should be preserved

### Guided first passage

The live homepage implements all fifteen scenes from Problem through Atlas
Reveal, including Work Takes Form, Work Enters Relation, Work Earns Promotion,
and The Institution Binds Itself.

**Decision:** do not spend the next pass rebuilding the introductory sequence.
Only repair a scene when a source or route change creates a concrete defect.

### Domain architecture

`/domains` now gives the corpus a legible five-stage conventional index:

1. Foundations
2. Processes & formalization
3. Programs & practice
4. Applications & public use
5. Evidence & stewardship

It avoids organizing the corpus around the identity node and gives content
pages priority over graph exploration.

**Decision:** preserve this surface and add it to the next guide as the
conventional Domain Architecture Index. It is not another graph projection.

### Institutional closure

`/about` visibly separates present stage, near-term aim, medium-term aim, and
bounded horizon. It also preserves maxim, principle, doctrine, and policy
categories and truthfully shows missing adoption and operating evidence.

**Decision:** the shell is strong. The next institutional work is source,
owner, adoption, operation, and review data—not another layout.

### Collaboration

`/collaborate` implements modes, lifecycle, roles, non-equivalences, public
record expectations, visibility boundary, and closure language.

**Decision:** keep the framework. Do not fabricate collaboration instances.
Add instance records only when a real scoped relationship exists.

### Work

`/work` teaches the type grammar, promotion sequence, lifecycle, and product
stewardship gate, and displays the migrated portfolio.

**Decision:** do not add more generic work cards. The next Work pass should
promote first-class records with steward, evidence, availability, and closure.

---

## Where the live site now violates or only partially applies the guide

| Surface | Live finding | Boundary First UX principle | Apply next |
| --- | --- | --- | --- |
| Packet/source binding | Guide v0.6 and several seeds target older canonical files. | One content source, paired projections | Rebase before accepting another packet seed. |
| Atlas and Halo color | `paletteForNode` selects color from `node.layer`; Mathematics, Physics, and Computation therefore share the `research` palette. The legend says hue means domain family. | Typed objects; domain-family hue; color not used alone | Add explicit `domainFamily`; keep `layer` and `architectureStage` separate. |
| Atlas node type | Entity kind is often inferred from free-text role/name patterns. | Typed objects | Add an explicit validated `entityKind`. |
| Domain to map | `View in map` uses the identity Atlas URL and calls `setActiveNodeId("identity")`. | Preserved context | Open the Atlas with the current domain selected and retain `returnTo`. |
| Facet focus | The focus side panel still offers `Read the domain record` and `Browse the domain tree`; the instructional paragraph also advertises leaving focus. | Progressive distinction; focus contract | Keep only focus instructions and scale changes. Put record exits back in Atlas or Halo selection actions. |
| Facet focus legend | The focus surface lacks the semantic legend available in Atlas and Halo. | Teach the legend; accessible graph equivalent | Restore a compact focus legend or an equivalent always-available text summary. |
| Context Halo model | The visual has Center, Facet Ring, Close Relation Band, and Domain Horizon, but `HaloEntity` drops semantic affinity, structural distance, relationship strength, evidence maturity, targets, and provenance. | Independent relation dimensions; semantic zoom | Implement the relation schema rather than flattening it into generic copy. |
| Halo facet content | The selected facet reports a taxonomy membership or source count, then generic authority and versioned-record closure text. | Consequence-aware navigation | Show the actual source-bearing relation records for the facet. |
| Domain record evidence | `Evidence sources` expands to ID, title, type, and maturity; it provides no citation, locator, canonical source, summary, availability, or replacement state. | Evidence at the point where it matters | Replace the document dump with public source records. |
| Domain record claims | Claims are plain strings without stable IDs or evidence joins. | Claim ceiling; status firewall | Promote claims to first-class records and connect them to sources and counterevidence. |
| Domain relations | The record renders only `dependsOn`, `relatedTo`, and a nonexistent `pairedWith` field, omitting other typed edges already in `nodes.json`. | One union graph; relation type remains visible | Render the validated relation registry instead of three hard-coded arrays. |
| Search | The page says it finds a domain, publication, claim, or document, but claims/documents only contribute text to a parent-domain match. They are not results. | Direct conventional route; accessible record index | Index and return individual typed records. |
| Lineage lens | The correct five academic foundation nodes are highlighted, but `Open lineage source` opens the identity record and no citation-level lineage record is exposed. | Lineage does not confer authority; works first | Keep the lens; withhold candidate cards until citation review, then expose real source records. |
| Work provenance | `src/content/work_portfolio.json` still cites `nodes_boundary_theory_reorganized_v0_1.json` source paths. | Provenance and replacement history | Rebase work provenance before calling migrated entries canonical. |

---

## Boundary First UX principles translated into current implementation rules

### 1. Progressive distinction

The live route family should be constrained as follows:

| Scale or surface | Route | Question answered |
| --- | --- | --- |
| Guided sequence | `/` | What should I understand next? |
| Domain Architecture Index | `/domains` | Where can I browse the content hierarchy directly? |
| Canonical domain record | `/domain/[slug]` | What does this domain publicly contain? |
| Global Atlas | `/map?mode=atlas...` | Where does this sit in the whole? |
| Facet focus | `/map?mode=focus&node=...` | What are the selected domain's internal facets? |
| Relation Context / Halo | `/map?mode=halo&node=...&relation=...` | What is locally related, by what typed relation, and with what evidence? |

`/domains` is the conventional index, not a map mode. Facet focus is a
temporary local scale, not a content destination. Lenses modify what is
emphasized inside the current graph scale; they must not silently switch
scale.

### 2. Typed objects

At minimum, stop overloading one field for several visual meanings:

```text
architectureStage  -> content-tree position
layer              -> present graph/organizational layer
domainFamily       -> hue family
entityKind         -> shape and visible type kicker
status             -> textual status badge
interactionState   -> opacity, outline, and temporary emphasis
```

Color must not encode type or status by itself.

### 3. Preserved context

Every transition among Domain Index, record, Atlas, focus, and Halo should
round-trip:

```text
selected node
selected facet or relation
active lens
return route
map zoom/camera where practical
open domain stage
search query or filter
```

The current `returnTo` mechanism on domain-index links is a good base. The
hard-coded identity Atlas return is the clearest remaining violation.

### 4. Status firewalls

The current About page demonstrates the right behavior. Apply the same rule to
claims, documents, facets, lineage, and work:

```text
classification != adoption
source membership != evidence
document maturity != claim maturity
lineage != authority
portfolio inclusion != product availability
taxonomy membership != a documented facet synthesis
```

### 5. Consequence-aware navigation

The guide's ten consequence questions should become a shared record contract,
not repeated prose templates. Unknown fields should say `Not yet recorded`.
They should not be replaced with a claim about a versioned parent record.

### 6. Accessible conventional equivalent

The Domain Architecture Index and domain records are the graph's conventional
equivalent. Search must become the conventional index for the smaller records
inside them:

- claim;
- document/source;
- relation;
- facet;
- lineage record;
- work entity;
- publication.

---

## Packet assets: use, migrate, or defer

### Use now

#### `bfl_boundary_first_ux_guide_v0_6.md`

Reuse the durable doctrines:

- progressive distinction;
- typed objects;
- preserved context;
- semantic zoom;
- status firewalls;
- consequence-aware navigation;
- one content source with conventional and relational projections;
- accessibility and mobile fallbacks.

Do not retain its v0.3 canonical pairing assertion.

#### `bfl_context_halo_relation_schema_v0_1.json`

Its separation of:

- semantic affinity;
- structural distance;
- relationship strength;
- sharedness;
- evidence maturity;
- display override;
- provenance;

is directly useful. Bump the schema version only if the live taxonomy requires
new relation types or source kinds.

#### `bfl_domain_family_palette_v0_1.json`

The semantic rule is ready:

> hue identifies domain family; shape identifies entity type; opacity is
> reserved for interaction prominence.

The live nodes still need explicit family assignments and contrast/grayscale
validation.

#### `bfl_context_halo_ordering_placement_spec_v0_1.md`

The independent-dimension, collision, edge-bundling, stable-order, and
accessibility rules remain applicable.

### Migrate before use

#### Representational Mechanics Halo reference

The reference contains:

- 39 context nodes;
- 39 relation records;
- source references on all 39;
- 19 canonical, 17 supported-local, and 3 exploratory maturity assessments;
- all eight intended domain families.

It is valuable editorial work, but every relation is marked as requiring
editorial review and its facet targets use the retired taxonomy:

```text
Formal Grammars
Pressure, Cycle & Capacity
Distinction & Representation
Distinction-Space Analysis
Boundary, Constraint & Closure
Invariant, Defect & Transport
Agency, Consequence & Repair
Institutional & Economic Representation
Operational Grammar Design
```

The live taxonomy is:

```text
Declaration, Regime & Carrier
Representation & Instrument
Perturbation & Evidence
Competent Baseline Comparison
Boundary, Closure & Defect
Repair Accounting & Hidden Labor
Reassessment, Promotion & Stop Rules
Distinction-Space and Contexture Analysis
Formal Grammar Design
```

Do not perform a mechanical rename. Some old targets split, merge, or no
longer have a one-to-one home. Preserve source references, then adjudicate each
target and description against the live study-package model.

#### Work migration data

The contracts and type grammar are useful. Rebase source references from the
old v0.1 node file, then adjudicate steward, evidence, availability, and
closure before treating a card as an available product.

### Defer as public content

#### Historical lineage seed

The seed contains 122 relations across 22 targets, but:

- all 122 are `candidate`;
- 115 require edition verification;
- 7 require source and edition verification.

Use the schema and editorial standard now. Do not expose the seed as
publication-ready lineage.

#### Institutional registers

The extended and core registers contain 1,485 and 651 records, respectively,
but they were harvested from `nodes_boundary_theory_reorganized_v0_1.json`,
are explicitly non-canonicalized, and have been moved under `Later`.

The current About page is already honest. Regenerate the register from the
live source before binding it to cards. Do not copy the old register into
runtime merely to fill visible fields.

---

## Immediate implementation tranche

### BFUX-001 — Rebase the guide and packet manifest

**Priority:** P0  
**Purpose:** restore one authoritative pairing before more generated content is
added.

#### Work

1. Declare the exact current canonical source or create an immutable,
   versioned snapshot from `src/content/nodes.json`.
2. Update the guide pairing from the 26-node v0.3 source to the current
   29-node source.
3. Add the five-stage Domain Architecture Index to the guide as a conventional
   surface, not a ninth graph projection.
4. Add the route/scale contract in this audit to the guide.
5. Create a current manifest that includes the v0.6/v0.7 guide, pairing map,
   current node snapshot, `Later` paths, and actual checksums.
6. Mark every old seed as `usable`, `migration-input`, or `candidate-only`.
7. Define what `contentVersion` versions and how a guide records its compatible
   content version.

#### Acceptance criteria

- The guide names a file that exists and matches the live build source.
- The paired node count is 29.
- Contexture, System, Corpus Forge, and the five architecture stages are
  represented.
- No runtime import or provenance label claims an obsolete v0.1/v0.3 source is
  current.
- The manifest's declared and actual entries agree.

### SEM-001 — Separate semantic axes and restore context-preserving routes

**Priority:** P0  
**Purpose:** make the UI's visual language truthful and reduce projection
sprawl.

#### Work

1. Add explicit, validated `domainFamily` and `entityKind` values to every
   canonical node.
2. Preserve `architectureStage`, `layer`, family, type, and status as separate
   axes.
3. Use the domain-family palette for hue; continue to show shape and a type
   kicker.
4. Update the legend so every label describes the actual data field used.
5. Change a domain record's `View in map` action to select that domain in the
   Atlas and preserve the prior return route.
6. Remove record/tree exits and exit-oriented copy from the compact facet-focus
   panel.
7. Restore the focus legend or an equivalent compact semantic summary.
8. Ensure lens changes never force a scale change.

#### Acceptance criteria

- Mathematics, Physics, and Computation can be distinguished by family hue
  without confusing their shared research/program placement.
- Grayscale still exposes type and family through label, shape, and perimeter
  mark.
- `/domain/representational-mechanics` returns to an Atlas state with
  Representational Mechanics selected.
- Atlas → Focus → Halo → Back restores the selected node and lens.
- Focus contains only focus-relevant actions.

### RECORD-001 — Build one canonical public-record registry

**Priority:** P0  
**Purpose:** replace source counts, internal paths, and parent-domain search
matches with addressable public records.

#### Minimum record types

```text
claim
document/source
facet
relation
lineage relation
work entity
publication
institutional statement
```

#### Minimum common fields

```text
id
kind
label
summary
sourceNodeId
canonicalPath
publicHref or explicit not-public status
status vocabulary and status system
claim ceiling where relevant
source/evidence links
provenance
owner/steward where relevant
correction/supersession/closure
review state
```

#### Work

1. Normalize document IDs, types, and maturity vocabularies.
2. Add canonical/public locators, availability, summaries, and replacement
   state to document records.
3. Promote claims from strings to stable records with source, evidence,
   counterevidence, limitation, and claim-ceiling joins.
4. Promote all semantic node edges to typed relation records with declared
   directionality.
5. Add stable local facet IDs and explicit facet-to-domain/context targets.
6. Make `build_graph_context.py` consume the registry and refuse to substitute
   implementation provenance for evidence.
7. Make Search return individual typed records and link to the exact record,
   not only its parent domain.
8. Make the domain Evidence Sources section render the public record contract,
   not raw object fields.

#### Acceptance criteria

- Searching a claim or document returns that claim or document as the result.
- Every `Open source record` action has a real, distinct source destination or
  is replaced by an honest unavailable state.
- `nodes.json#...` may appear as implementation provenance, never as
  substantive evidence.
- A record's status vocabulary identifies which status system it belongs to.
- Duplicate IDs and conflicting source metadata fail validation.

### HALO-001 — Complete the Representational Mechanics vertical slice

**Priority:** P0  
**Purpose:** prove the full Boundary First UX contract on one consequential
domain before attempting corpus-wide generation.

#### Work

1. Give the nine live Representational Mechanics facets stable local IDs.
2. Create an explicit editorial crosswalk from the old Halo reference facets
   to the current study-package facets.
3. Review all 39 reference relations; retain their source references while
   adjudicating target facets, relation type, wording, and maturity.
4. Extend `HaloEntity` and its renderer to preserve:
   - facet targets;
   - semantic affinity;
   - structural distance;
   - relationship strength;
   - sharedness;
   - evidence maturity;
   - provenance.
5. Use structural distance for radius and affinity for angle; do not infer one
   hidden relevance score.
6. Make a selected relation's side panel show its actual source records,
   maturity, boundary, and correction/closure state.
7. Keep selection/pin separate from navigation.
8. Add the same records to the domain page and Search index.

#### Acceptance criteria

- All nine current facets have approved stable IDs and summaries.
- No old facet ID survives without an explicit migration record.
- Each visible external Halo node has at least one reviewed source reference or
  an explicit exploratory/unverified label.
- Radius, edge weight, edge style, hue, shape, and opacity correspond to the
  fields documented by the guide.
- The path Atlas → Representational Mechanics → Focus → facet → Halo → source
  → Back is complete, keyboard operable, and state preserving.
- The selected facet no longer falls back to `versioned parent record`
  boilerplate.

---

## Following tranche

### LINEAGE-001 — Verify and publish bounded lineage records

Start only after the record registry exists.

- verify work, author/institution, date, edition, and page where required;
- separate external lineage from internal corpus history;
- preserve the global non-claim;
- expose works first and people second;
- route each card to a real citation/source state.

### INST-001 — Regenerate the institutional register from the live source

The current closure UI may remain as-is while this work proceeds.

- regenerate from the current canonical node source;
- adjudicate source variants rather than copying all 1,485 harvested strings;
- add owner, adoption, operation, evidence, review, defect, and replacement
  fields only when supported;
- expose `Not yet recorded` where the institution has not established a
  mechanism.

### WORK-001 — Promote a small first-class work set

Do not begin with all 24 portfolio entries.

Select three records with materially different types, for example:

- Corpus Forge as a program;
- Agency Audit Platform as a product/prototype;
- Boundary-First Soccer as a project.

Require objective/value, lifecycle, availability, steward, evidence, next
gate, correction path, and closure before using them as reference cards.

### CONTENT-001 — Continue the corpus-wide facet and document cleanup

After the vertical slice proves the contract:

- reconcile the 58 stale facet-status keys;
- replace the 32 stale curated summaries;
- migrate the remaining 251+ generic facet summaries;
- remove evidence truncation by explicit ordering rather than `slice`;
- expose richer node fields selectively through typed sections.

---

## Work explicitly deferred

The following would create more surface area without repairing the current
boundary:

- another Atlas or Halo projection;
- another header navigation family;
- automatic import of the old Representational Mechanics facet layout;
- publication of all 122 candidate lineage records;
- runtime binding to the old institutional registers;
- broad graph edge or force-layout changes before relation data is verified;
- more generic closure, authority, or evidence prose;
- collaboration instance cards without real collaborations;
- product availability claims without stewardship and evidence;
- paper artifacts created only to avoid a zero-artifact count.

Zero public paper artifacts remains an intentional and acceptable boundary.

---

## Crosswalk to the quantitative holes audit

| Quantitative audit tasks | Consolidated work here |
| --- | --- |
| DATA-001, DATA-002, DATA-003, DATA-005, DATA-010, DATA-012 | RECORD-001 |
| DATA-004, DATA-008, CONTENT-001 | HALO-001, then corpus-wide CONTENT-001 |
| DATA-006, DATA-007 | RECORD-001 typed relation registry |
| DATA-009 | RECORD-001 ordering and Search behavior |
| DATA-011 | BFUX-001 content/guide version contract |
| CONTENT-002 | LINEAGE-001 |
| CONTENT-003 | WORK-001 |
| CONTENT-004 | RECORD-001 and HALO-001 |

The quantitative audit remains the source for corpus counts, node coverage, and
the full list of data defects. This document selects the next application
sequence.

---

## Definition of done for the next pass

The next pass is complete when:

1. the Boundary First UX guide and manifest are paired to the current 29-node
   source;
2. the guide recognizes the Domain Architecture Index and clearly separates
   index, record, Atlas, focus, and Halo;
3. domain family, architecture stage, entity type, status, and interaction
   emphasis no longer share one visual field;
4. a domain record returns to the same selected domain in the Atlas;
5. facet focus contains only focus-relevant interaction;
6. claims, documents, facets, and relations have stable public-record IDs;
7. Search can return an individual claim or source;
8. the Representational Mechanics Halo uses reviewed current-facet relations
   with visible evidence maturity and provenance;
9. no action labeled as a source opens only a parent domain;
10. corpus-wide expansion is deferred until this vertical slice passes
    keyboard, screen-reader, route-state, and graph-content validation.

## Recommended execution order

```text
BFUX-001 packet/source rebase
    -> SEM-001 semantic axes and route scope
    -> RECORD-001 public-record registry
    -> HALO-001 Representational Mechanics vertical slice
    -> lineage, institutional, work, and corpus-wide expansion
```

This sequence applies Boundary First UX to the website's present defect: the
interface has learned the distinctions faster than the underlying public
records have.

---

## Applied slice — 2026-07-29

The DATA-006/DATA-007 relation slice and its directly dependent facet work are
now implemented:

- one source relation registry covers all 25 active relation fields;
- 231 declarations normalize to 200 canonical semantic edges, each with two
  view-relative records;
- directed, symmetric, and inverse-paired behavior is validated at build time;
- Domain, Halo, and Atlas relation consumers use generated semantic records;
- facet navigation uses stable parent-facet metadata rather than display-label
  equality;
- the initial facet target registry contains 27 single-domain and 6 grouped
  targets, with explicit no-target behavior elsewhere;
- all 260 current facets now have separated definition, belonging, evidence,
  and product fields;
- stale facet-summary and dormant record-overlay/status code has been removed.

This closes the relation portion of RECORD-001 and establishes the shared
contract needed by HALO-001. It does **not** complete the claim/source portion
of RECORD-001: relation-specific evidence remains honestly marked `not-linked`
until DATA-001 through DATA-005 supply stable source and claim joins.

The next high-value continuation from this document is therefore:

```text
DATA-001..005 claim/source registry
    -> attach evidenceRefs to typed relations and facets
    -> editorial review of 213 parent-derived facet definitions
    -> Representational Mechanics evidence-aware Halo slice
```
