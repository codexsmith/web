# Content, source, and relationship holes audit v0.1

> **Application follow-up:** See
> `content_data_and_boundary_first_ux_application_audit_v0_2.md` for the
> live-site/Boundary First UX crosswalk and the selected next implementation
> tranche. This v0.1 document remains the quantitative appendix.

Date: 2026-07-29  
Status: diagnostic backlog; no public artifact requirement is introduced by this audit

## Outcome

The website does not primarily suffer from a lack of content. It suffers from
content that is present in `nodes.json` but disconnected, flattened, hidden, or
described by generated administrative copy instead of substantive records.

The highest-value corrections are:

1. create stable joins among claims, documents, library sources, facets, and
   relations;
2. repair facet-taxonomy drift that is currently discarding existing evidence;
3. stop presenting node paths, record counts, and corpus versions as evidence;
4. expose the typed relations, lineage entries, claim ceilings, programs, and
   product records already present in `nodes.json`;
5. replace facet and projection boilerplate only after the underlying joins are
   reliable.

## Audit scope

Canonical and generated data reviewed:

- `src/content/nodes.json`
- `src/content/facetStatusEvidence.json`
- `src/app/context/graphNodes.json`
- `src/app/context/facetSummaries.ts`
- `src/app/context/facetStatuses.ts`
- `scripts/build_graph_context.py`

Active or potentially reusable UI consumers reviewed:

- `src/app/domain/[slug]/page.tsx`
- `src/components/node-detail-sections.tsx`
- `src/components/domain-topology-plot.tsx`
- `src/components/context-halo.tsx`
- `src/components/domain-record-overlay.tsx`

The live localhost browser pass could not be completed because the in-app
browser entered a blocked error URL after an initial connection refusal. The
UI findings below are therefore based on the active render paths and generated
runtime data rather than screenshots from this pass.

## Corpus snapshot

| Measure | Current result |
| --- | ---: |
| Domain nodes | 29 |
| Facet assignments | 260 |
| Unique facet slugs | 256 |
| Claims | 128 |
| Structured claim records | 0 |
| Document references | 129 |
| Unique document IDs | 97 |
| Unique document titles | 105 |
| Publicly addressable document references | 0 |
| Historical lineage references | 115 |
| Facet-status source references | 312 |
| Unique facet-status source labels | 152 |
| Explicit top-level node-to-node semantic edges | 231 |
| Public Markdown artifacts | 0, intentionally acceptable |

## P0 — credibility and data-loss holes

### DATA-001 — Build one canonical source and document registry

Current hole:

- All 129 `documents` entries have an ID, title, type, and maturity.
- Only one entry has `canonicalSource`, one has `canonicalHome`, and one has
  `audience`.
- No document has a durable public or internal locator, author/creator,
  publication date, citation, rights state, review date, or replacement chain.
- The UI labels these entries **Evidence sources**, although they are currently
  named document references rather than inspectable sources.
- `facetStatusEvidence.json` contains 312 source references as free-text labels.
  Of its 152 unique labels, only 42, or 28%, normalize to a title in the node
  document inventory. The remaining 110 have no stable join.

Task:

- Introduce a source registry keyed by stable source ID.
- Convert `nodes[].documents`, facet-status evidence, historical citations, and
  program artifact lists to source IDs rather than title strings.
- Until a referenced document is addressable, label it **Referenced record** or
  **Internal source record**, not **Evidence source**.

Minimum source record:

```text
id
title
recordKind
creators
issuedAt
version
canonicalHomeNode
locator
availability: public | internal | unavailable | planned
maturity
citation
rights
supersedes
supersededBy
reviewedAt
reviewOwner
```

Acceptance criteria:

- Every source label used by a facet, claim, program, or relation resolves to
  exactly one source ID.
- An unavailable source remains a valid record but is explicitly marked
  unavailable; no paper artifact needs to be published.
- Duplicate use of the same source across domains points to one canonical
  record.

### DATA-002 — Give claims stable identities and evidence joins

Current hole:

- All 128 claims are plain strings.
- Claims have no IDs, claim class, maturity, claim ceiling, source links,
  counterevidence, limitations, review state, owner, or supersession history.
- A node can list claims and documents, but nothing states which document
  supports, qualifies, contradicts, or merely discusses which claim.

Task:

- Convert claims to structured records while preserving their current wording.
- Add typed claim-to-source edges.

Minimum claim record:

```text
id
statement
claimClass
claimCeiling
maturity
evidenceSourceIds
counterevidenceSourceIds
limitations
status
reviewedAt
reviewOwner
supersedes
supersededBy
```

Acceptance criteria:

- Every public claim has a stable anchor.
- Every promoted claim identifies its evidence, limitation, and correction
  path.
- A claim with no supporting source is visibly marked as an assertion,
  hypothesis, proposal, or scoped position rather than being silently grouped
  under “Evidence.”

### DATA-003 — Remove false “source record” affordances

Current hole in generated projection data:

- 792 generated projection records use the action label **Open source record**.
- Those actions point to the parent `/domain/{node}` page, not to the source
  represented by the selected item.
- 584 projection records use `Canonical source path: ...` as their evidence.
  That is implementation provenance, not epistemic evidence.
- 108 document projection summaries say only “A source document reference
  associated with this domain.”
- 124 claim projection records repeat that a claim is canonical and remains
  bounded by the parent record.

Task:

- Reserve **Open source record** for an action that opens an actual source
  registry entry.
- Use **Open parent domain** when the parent domain is the only destination.
- Distinguish:
  - implementation provenance: where the website loaded the field from;
  - epistemic provenance: the observation, work, dataset, test, or authority
    supporting the claim.
- Hide generated evidence and closure rows when they add no information beyond
  the selected record’s location.

Acceptance criteria:

- No action promises a source and returns the reader to the same parent page.
- `nodes.json#...` paths may appear in diagnostics but never as public evidence.
- Empty evidence is shown honestly as **No linked evidence record yet**.

### DATA-004 — Repair facet-status taxonomy drift

Current hole:

- 58 facet-status keys no longer match current node/facet keys.
- The stale keys strand:
  - 96 documented-research source references;
  - 8 prototype-product source references;
  - 49 active-research declarations.
- The current generated graph consequently classifies the 260 facets as:
  - 74 documented;
  - 56 active;
  - 130 scoped.
- The largest stale-key clusters are:
  - Representational Mechanics: 14;
  - Distinction Space: 8;
  - Distinction: 7;
  - Admissibility: 5;
  - Formal Grammars: 4;
  - System: 4.

Task:

- Add stable facet IDs independent of display labels and slugs.
- Migrate all status evidence to the stable IDs.
- Add a build-time alias map for intentional renames.
- Fail the graph check on orphan facet-status keys rather than silently
  downgrading them to scoped taxonomy.

Acceptance criteria:

- Zero orphan facet-status keys.
- Every migrated source remains attached to the intended facet.
- Facet renaming does not change evidence status.

### DATA-005 — Stop treating corpus metadata as substantive evidence

Current hole:

- All 240 generated relation records have an “evidence” sentence, but none has a
  linked source.
- Relation evidence consists of statements such as:
  - the target is a versioned canonical node;
  - the relation is declared in graph metadata;
  - the source node contains a number of claims and documents.
- Every one of the 260 generated facet records receives the same form of
  versioned-record closure sentence.
- The governance projection manufactures three records for every node:
  claim boundary, evidence gate, and correction/closure. Eighty-seven baseline
  records therefore repeat node counts and version language before any
  node-specific governance content is considered.

Task:

- Treat relation declaration, source-path provenance, evidence, and governance
  as separate fields.
- Do not show a record count as evidence of a relation or claim.
- Use node-specific claim ceilings, validation gates, prohibited claims, review
  rules, and source links where they already exist.
- When no substantive governance or evidence record exists, show one concise
  absence state instead of three generated cards.

Acceptance criteria:

- A relation can be declared without falsely implying evidentiary support.
- Every displayed evidence statement resolves to a source, test, citation, or
  explicitly identified rationale.
- Version metadata is confined to a clear record-status area.

## P1 — relationship and content-model holes

### DATA-006 — Render the typed relationship model already in `nodes.json`

`nodes.json` contains 231 explicit node-ID edges. The graph builder consumes 212
of them, but the `/domain/[slug]` relationship section displays only
`dependsOn`, `relatedTo`, and a nonexistent `pairedWith` field.

The content page therefore exposes 157 edges and omits 74:

- 55 edges already supported by the graph builder, including:
  `contains`, `definedWithin`, `studiedBy`, `formalizedThrough`,
  `operationalizedBy`, `appliedThrough`, `appliedBy`, `appliedWithin`,
  `theoreticalGrounding`, `facetOf`, `centralObject`,
  `formalApparatusFor`, and `encodes`;
- 19 valid node-ID edges not handled by the builder:

| Ignored field | Edges |
| --- | ---: |
| `composedOf` | 1 |
| `discipline` | 3 |
| `distinctFrom` | 3 |
| `formalApparatus` | 1 |
| `governedBy` | 1 |
| `operatedThrough` | 1 |
| `operatesOn` | 1 |
| `pairedResearchLane` | 2 |
| `siblingFacets` | 6 |

Task:

- Use one typed-relation registry on map and content pages.
- Add incoming as well as outgoing relations.
- Preserve relation label, direction, rationale, claim boundary, and evidence.
- Replace the content page’s `pairedWith` lookup with the actual relation
  contract.

Acceptance criteria:

- The same selected node reports the same relations in Atlas, focus, relation
  view, and its domain record.
- Relation direction and inverse labels are explicit.
- No valid node-ID relation field is silently ignored.

### DATA-007 — Resolve symmetric-versus-directed relation ambiguity

Current hole:

- `relatedTo` is described as shared contextual adjacency, but 56 of its 98
  directed declarations have no reverse declaration.
- `distinctFrom` is symmetric between AI as Forge and Corpus Forge, but the
  AI-as-Forge-to-Computational-Systems declaration has no reverse.
- Content pages show outbound arrays only, so a target can omit a relation that
  is visible from its source.

Task:

- Declare each relation type as directed, symmetric, or inverse-paired.
- Generate safe inverse records for symmetric and inverse-paired types.
- Validate reciprocal declarations when source data requires them.

Acceptance criteria:

- Selecting either side of a symmetric relation yields the same connection.
- Directed relationships use different source and target labels when needed.
- A build error identifies contradictory directionality.

### DATA-008 — Add an explicit facet-to-domain target registry

Current hole:

- Only 18 of 260 facet assignments map to a canonical domain by exact
  label-slug equality.
- The identity node resolves only 11 of its 26 facets this way.
- Semantically obvious groupings fail exact matching, for example:
  - `Contexture & System Formalization`;
  - `Corpus Forge & Research Operations`;
  - `Computational & Machine Intelligence Research`;
  - `Software, Products & Public Infrastructure`;
  - `Public Philosophy, Satire & Speaking`.
- Four facet slugs are reused across different parent domains, so a global
  slug-only content lookup is not a sufficient identity contract.

Task:

- Give each facet a stable ID and optional `targetNodeIds`.
- Permit one facet to target a domain, several grouped domains, or no domain.
- Keep the parent node ID in every facet key.

Acceptance criteria:

- Facet navigation never depends on display-label equality.
- Group facets open a bounded chooser or grouped content page.
- Duplicate facet labels cannot collide.

### CONTENT-001 — Replace stale and generated facet summaries

Current hole:

- `facetSummaries.ts` defines 40 summaries.
- Only 8 definitions match a current facet assignment.
- Thirty-two summaries belong to an earlier taxonomy and are unused.
- Domain content pages therefore render generic status prose for 252 of 260
  facet assignments.
- The focus-map data uses generated “research surface that narrows the parent
  domain” text for 246 of 260 facets.

Task:

- Key summaries by stable parent-facet ID.
- Prefer concise definitions and scope boundaries already available in
  structured program, shelf, and theory records.
- Separate:
  - what the facet is;
  - why it belongs to the parent;
  - current evidence status;
  - current product status.
- Do not use corpus-processing status as the definition of the facet.

Acceptance criteria:

- Every visible facet has a specific one- or two-sentence definition.
- Status copy appears in a status field, not in place of a definition.
- No current facet relies on the generic fallback.

### CONTENT-002 — Expose and complete historical references

Useful data already available:

- 21 nodes contain 115 structured lineage entries.
- Every entry already has author, work, year, local relation, and status.
- Twenty-one nodes repeat an explicit citation note saying that editions,
  translations, page references, and the exact claim relation still require
  verification.

Current holes:

- The domain record field list does not render `history`.
- The 115 references have no edition, publisher/container, page locator,
  identifier, URL, review owner, or last-reviewed date.
- Six nodes have no history object:
  `boundary-theory`, `distinction-space`, `contexture`, `system`,
  `boundary-first`, and `corpus-forge`.
- `emergence-theory` and `formal-grammars` have history content but no
  `buildsFrom` reference list.

Task:

- Surface a bounded **Lineage & references** section.
- Complete citation metadata before presenting lineage as a bibliography.
- Preserve the existing local-relation explanation; it is more useful than a
  bare bibliography.

Acceptance criteria:

- Every public historical reference has a verifiable citation.
- Each reference says why it is present and what it does not establish.
- Nodes without a reviewed lineage use a clear absence state.

### CONTENT-003 — Reconcile product/program records with evidence status

The clearest contradiction is `products-testbeds`:

- 24 structured portfolio entries;
- 15 marked confirmed, 6 emerging, and 3 candidate;
- 5 public claim strings;
- 0 document references;
- 0 documented facets;
- 0 prototype or operational facet statuses;
- 0 linked facet source records.

Other high-density program inventories with sparse document linkage include:

| Node | Program/work records | Documents |
| --- | ---: | ---: |
| `infrastructure-repair` | 16 | 5 |
| `on-ramps` | 11 | 2 |
| `law-public-trust` | 9 | 4 |
| `finance-capital` | 8 | 4 |
| `constructive-humanist-agentics` | 7 | 2 |
| `governance-institutions` | 7 | 2 |
| `public-philosophy-satire` | 6 | 1 |

Task:

- Join every public program/product record to its source, decision record,
  maturity rubric, and parent facets.
- Reconcile node portfolio status with facet product status.
- Populate the explicit product-card and lifecycle work already requested by
  `products-testbeds.nextPortfolioActions`.

Acceptance criteria:

- “Confirmed,” “prototype,” “operational,” and “public” have one shared
  definition.
- No product is simultaneously presented as confirmed and absent from all
  product evidence.
- Each public product/program has a source, steward, stage, next gate, and
  retirement condition.

### DATA-009 — Remove evidence truncation by ordering

Current hole:

- The graph builder caps evidence projection records at 12 after adding claims
  before documents.
- It therefore omits 4 of 128 claims and 21 of 129 document references.
- The map then displays only the first 8 records.
- The visible map evidence set contains 118 claims and only 80 documents.
- Identity, Positions, and Corpus have documents but expose no document in the
  first eight map evidence records.

Task:

- Group claims and sources rather than concatenating and slicing them.
- Show balanced counts and let the record page provide the complete index.
- Preserve source and claim IDs in selection state.

Acceptance criteria:

- No record disappears solely because its parent has many claims.
- The map states that it is showing a subset and links to the complete filtered
  index.
- Keyboard and URL state can reach every record.

## P2 — normalization and editorial debt

### DATA-010 — Normalize document IDs, types, and maturity

Current hole:

- 129 document references use 69 distinct `type` values and 30 distinct
  `maturity` values.
- Vocabulary contains near-duplicates such as `professional-doctrine` and
  `professional doctrine`.
- Statuses mix different axes: publication, formal rigor, workflow state,
  review state, readiness, and access.
- Nine reused document IDs have conflicting titles:

| Document ID | Conflicting title forms |
| --- | --- |
| `operational_facets_packet` | Distinction, Admissibility, and Emergence as Operational Facets; Operational Facets Packet |
| `formal_artifacts_legacy_supplement_v0_1` | Formal Artifacts Legacy Supplement; Formal Artifacts Legacy Supplement v0.1 |
| `boundary_theory_research_program` | Boundary Theory: A Research Program for Distinction Spaces; Boundary Theory Research Program |
| `edge_admissibility_concept_note_v0_1` | Edge Admissibility; Edge Admissibility Concept Note v0.1 |
| `distinction_theory_isotropic_computing_and_compression` | Isotropic Computing; Isotropic Computing and Compression |
| `distinction_theory_academic_publication_audit_v0_1` | versioned and unversioned title forms |
| `distinction_theory_rough_unreviewed_audit_v0_1` | versioned and unversioned title forms |
| `boundary_first_engineering_revised_v_0_2_marked` | Boundary First Engineering; Boundary-First Engineering |
| `corpus_forge_methods_packet` | Corpus Forge Vertical Slice and Methods Packet; Corpus Forge Methods Packet |

Task:

- Separate document kind, claim maturity, review state, publication state, and
  availability.
- Choose one canonical title for each ID and preserve alternate titles as
  aliases.

Acceptance criteria:

- Controlled vocabularies validate at build time.
- A reused ID cannot carry contradictory canonical metadata.
- Filtering does not depend on punctuation or free-form status text.

### DATA-011 — Define what `contentVersion` versions

Current hole:

- Node versions currently span `0.13.0`, `0.14.0`, `1.0.0`, `4.14.0`, and
  `5.0.0`.
- No field states whether this versions prose, schema, taxonomy, evidence,
  relations, or an external corpus.
- Generated relation statuses inherit the source node version, making the
  number appear relation-specific when it is not.

Task:

- Separate `schemaVersion`, `recordVersion`, `taxonomyVersion`, and
  `evidenceAuditDate` where those concepts are actually needed.
- Add `updatedAt`, change summary, and replacement history to public versioned
  records.
- Remove a version badge from derived relations unless the relation itself has
  a revision.

Acceptance criteria:

- A reader can explain what changed between two displayed versions.
- Versions from unrelated tracks are not visually compared as one sequence.
- Audit dates and record revisions are not conflated.

### CONTENT-004 — Replace self-reference with the strongest available local data

Current reusable data is richer than the default copy:

- 115 historical lineage references;
- 231 explicit semantic edges;
- 24 product portfolio records;
- 15 computational research programs;
- 16 infrastructure programs;
- 11 software-practice programs;
- claim ceilings, validation gates, prohibited claims, safe claims, and review
  rules distributed across several nodes.

Task:

- Prefer those structures over sentences about the canonical corpus, current
  audit, parent record, or versioned record.
- Keep administrative status in small metadata labels.
- Remove dormant copy paths that could reintroduce old placeholders, including
  the unused `StatusBox` and the unreferenced `domain-record-overlay` with its
  hard-coded `2024-Q2` audit label, unless they are intentionally restored and
  brought onto the current data contract.

Acceptance criteria:

- Every prominent panel answers a reader question about the subject, not about
  how the site stores the subject.
- Administrative copy is not repeated across every node.

### DATA-012 — Add content-integrity validation to the graph check

Add build failures or explicit warnings for:

- orphan facet-status keys;
- unresolved source labels;
- duplicate source IDs with conflicting canonical titles;
- claims without IDs after migration;
- promoted claims without evidence or a declared exception;
- unknown node relation targets;
- ignored node-ID relation fields;
- invalid relation directionality;
- `Open source record` actions without a source target;
- current facets using fallback definitions;
- public references missing required citation fields;
- controlled-vocabulary drift;
- public records whose configured evidence list is truncated without an
  explicit subset contract.

## Explicit holes already declared inside `nodes.json`

These tasks do not need to be rediscovered:

- Mathematics requests a canonical program-to-artifact and replacement index,
  complete publication pipelines, claim-regime separation, expert comparison,
  and publication of negative results.
- Physics requests a canonical hypothesis/derivation/model index, dimensional
  and numerical audits, known-physics recovery tests, external review, and
  public derivation/simulation/negative-result ledgers.
- Computational Systems requests execution-authority resolution, a controlled
  external pilot, preserved baselines and traces, and a canonical
  program-to-source/claim/experiment index.
- Software Engineering requests a canonical corpus index, separation of
  experience/doctrine/result, comparative literature maps, worked and negative
  cases, external pilots, and professional criticism.
- Products & Testbeds requests asset verification, canonical names and aliases,
  portfolio scoring, one-page product cards, lifecycle ownership, evidence,
  review, and a public decision register.
- Public Philosophy & Satire explicitly says its content inventory is not yet
  consolidated and lists scripts, recurring characters, premises, recordings,
  talk variants, and doctrine links still to inventory.

These should become structured task/status records or backlog links rather than
remaining buried in public content data.

## Node coverage matrix

`D/A/S` means documented / active / scoped facet status under the current
taxonomy. “Lost status keys” counts stale status records associated with that
node. “Program/work records” combines the primary structured program, practice,
portfolio, and on-ramp arrays.

| Node | Claims | Docs | Facets | D/A/S | Lost status keys | History refs | Program/work records |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `identity` | 16 | 3 | 26 | 1/12/13 | 0 | 4 | 0 |
| `boundary-theory` | 4 | 3 | 8 | 6/0/2 | 2 | 0 | 0 |
| `distinction-space` | 4 | 6 | 8 | 0/0/8 | 8 | 0 | 0 |
| `contexture` | 4 | 3 | 7 | 4/0/3 | 3 | 0 | 0 |
| `system` | 3 | 2 | 6 | 2/0/4 | 4 | 0 | 0 |
| `distinction-theory` | 3 | 6 | 5 | 3/0/2 | 7 | 5 | 0 |
| `admissibility-theory` | 3 | 8 | 6 | 3/0/3 | 5 | 5 | 0 |
| `emergence-theory` | 3 | 3 | 7 | 4/0/3 | 3 | 0 | 0 |
| `representational-mechanics` | 4 | 9 | 9 | 3/0/6 | 14 | 5 | 0 |
| `formal-grammars` | 3 | 4 | 8 | 4/0/4 | 4 | 0 | 0 |
| `boundary-first` | 3 | 2 | 7 | 0/0/7 | 0 | 0 | 0 |
| `positions` | 9 | 4 | 11 | 3/2/6 | 0 | 4 | 0 |
| `constructive-humanist-agentics` | 4 | 2 | 11 | 4/2/5 | 0 | 5 | 7 |
| `mathematics` | 1 | 6 | 7 | 5/1/1 | 0 | 6 | 10 |
| `physics` | 2 | 4 | 8 | 4/1/3 | 0 | 6 | 11 |
| `computational-systems` | 5 | 13 | 7 | 2/3/2 | 0 | 6 | 15 |
| `bfe` | 2 | 3 | 9 | 1/4/4 | 0 | 5 | 0 |
| `software-engineering-practice` | 6 | 12 | 14 | 4/8/2 | 0 | 7 | 11 |
| `ai-forge` | 3 | 3 | 5 | 4/0/1 | 1 | 5 | 0 |
| `corpus-forge` | 3 | 4 | 8 | 5/0/3 | 3 | 0 | 0 |
| `governance-institutions` | 4 | 2 | 11 | 2/8/1 | 0 | 5 | 7 |
| `law-public-trust` | 5 | 4 | 8 | 2/4/2 | 0 | 6 | 9 |
| `finance-capital` | 5 | 4 | 8 | 1/3/4 | 0 | 6 | 8 |
| `infrastructure-repair` | 5 | 5 | 10 | 3/2/5 | 0 | 6 | 16 |
| `systems-criticism` | 4 | 4 | 8 | 0/2/6 | 0 | 6 | 6 |
| `products-testbeds` | 5 | 0 | 8 | 0/2/6 | 0 | 5 | 24 |
| `on-ramps` | 2 | 2 | 12 | 1/1/10 | 0 | 6 | 11 |
| `public-philosophy-satire` | 4 | 1 | 6 | 2/0/4 | 0 | 6 | 6 |
| `corpus` | 9 | 7 | 12 | 1/1/10 | 3 | 6 | 0 |

## Recommended implementation order

1. Repair facet IDs and migrate the 58 stale status keys so no existing
   evidence is lost during later work.
2. Introduce the source registry and canonical document aliases.
3. Convert claims to stable records and add claim-source joins.
4. Remove false source actions and administrative evidence copy from generated
   projections.
5. Use one typed relation registry across map and content pages.
6. Add explicit facet target mappings.
7. Surface the already available lineage, claim ceiling, validation, program,
   and product data.
8. Replace facet summaries and projection copy after the data joins are stable.
9. Complete node-specific editorial and citation work, starting with
   `products-testbeds`, `public-philosophy-satire`, `on-ramps`,
   `distinction-space`, `representational-mechanics`, `boundary-first`,
   `systems-criticism`, `corpus`, and `identity`.
10. Add the integrity gates in DATA-012 before the next corpus rebuild.

## Intentional non-hole

Zero public paper artifacts remains acceptable for the present release. The
required correction is honesty and structure:

- do not imply that an internal or planned record is publicly inspectable;
- retain the source name and status;
- state its availability;
- preserve a future canonical target;
- do not promote a claim merely because a document title exists.

---

## Implementation log — 2026-07-29 relation and facet contract pass

This pass used DATA-006 and DATA-007 as the semantic foundation for DATA-008,
CONTENT-001, CONTENT-004, and the incidentally dependent validation work in
DATA-012.

| Task | Status after this pass | Implemented boundary |
| --- | --- | --- |
| DATA-006 | Complete for current node-ID fields and public consumers | Added `src/content/relationTypes.json` as the single 25-type registry; all 231 source declarations now generate typed records with stable canonical IDs, view-relative targets, direction, inverse label, rationale, claim boundary, evidence status, and provenance. Domain records, Halo relation entities, and symmetric Atlas links consume generated records rather than reconstructing raw fields. |
| DATA-007 | Complete for the current corpus | Declared directed, symmetric, and inverse-paired semantics. Missing symmetric reverses now produce the same canonical connection from either node; explicit reverse declarations are deduplicated; incoming directed views use inverse labels; contradictory inverse orientation is a build error. |
| DATA-008 | Structural contract complete; editorial target coverage remains open | Facet IDs remain parent-qualified. Added `src/content/facetMetadata.json` with explicit zero/one/many target semantics and no label-equality navigation. The initial registry supplies 27 single targets and 6 grouped targets; all other current facets intentionally emit an empty target list. Group targets render as bounded choices in domain records and the map inspector. |
| CONTENT-001 | Runtime/content-contract complete; editorial refinement remains | Removed the stale global-slug `facetSummaries.ts` layer. All 260 current facets now emit a one- or two-sentence definition keyed by stable parent-facet ID, with `curated`, `structured-source`, `target-derived`, or `parent-derived` provenance. Eleven definitions are curated, 14 come from structured source records, 22 are target-derived, and 213 remain parent-derived candidates for later editorial refinement. Definition, belonging, evidence status, and product status are separate fields and UI rows. |
| CONTENT-004 | Complete for relation/facet surfaces; broader record prose remains open | Removed version/corpus/audit language from generated relation and facet descriptions, made unavailable evidence explicit, and moved content version to non-prominent source metadata. Removed dormant `StatusBox`, `domain-record-overlay.tsx`, `facetStatuses.ts`, and the stale facet summary module. Projection and source-record prose should still be reviewed when DATA-001 through DATA-005 are implemented. |
| DATA-012 | Partial, incidentally in scope | Added build failures for orphan facet keys, unknown facet targets, unregistered node-reference fields, invalid relation policy schemas, nonreciprocal inverse policy declarations, contradictory inverse orientation, self-relations, duplicate targets, and unknown relation targets. Added production coverage checks proving every active relation declaration appears at both participating nodes. |

Verification completed:

- `npm run graph:test` — 15 tests passed;
- `npm run graph:check` — generated graph current;
- `npm run lint` — passed;
- `npm run test:ui -- run` — 26 tests passed;
- `npm run build` — production build and TypeScript checks passed.

Remaining immediate work:

1. Editorially replace the 213 `parent-derived` facet definitions, prioritized
   by public traffic and evidence maturity.
2. Expand `facetMetadata.json` only where a real canonical target or bounded
   group exists; empty targets are intentional and must not be filled by label
   matching.
3. Implement claim/source registries before replacing relation
   `evidenceStatus: not-linked` with evidentiary assertions.
4. Extend the integrity report to emit a review queue for parent-derived
   definitions and empty target lists rather than treating either as an error.
