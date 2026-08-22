# Boundary First Labs Live Research System UX v0.1

**Status:** Proposed backlog pass 11  
**Date:** 2026-08-09  
**Scope:** Research information model, public projections, object-page contracts, epistemic status, provenance, and institutional feedback loops  
**Preceding pass:** [10_social_mission_preagent_ux](../10_social_mission_preagent_ux/)  
**Source synthesis:** [source_synthesis_topos_sfi_bfl.md](./source_synthesis_topos_sfi_bfl.md)

## 1. Decision

Pass 11 expands the current website from a coordinated public interface into a legible representation of Boundary First Labs as a research system.

The synthesis is:

- **vertical axis:** research -> translation -> application/public service -> institution -> research feedback;
- **horizontal axis:** field -> facets -> themes -> projects -> people/relationships -> outputs -> learning/network;
- **Boundary First axis:** epistemic status, provenance, admissibility, validation, limitation, and feedback.

The result should not be a larger marketing site. It should be a public, navigable projection of the actual research program.

## 2. Phase boundary

This is a large refinement and expansion, **not a route or folder reorganization**.

Pass 11 must preserve:

- the current homepage and People / Problem / Repair entrances;
- the five-pillar global navigation until an evidence-backed replacement is approved;
- the current Atlas at `/map`;
- the refined Atlas experience at `/map/refined`;
- existing canonical URLs, content records, and public projections;
- the pass 10 rule that the website projects the corpus rather than becoming a second corpus.

The candidate navigation **Research · Practice · Outputs · Learn · Network · About** is recorded as a future projection to test, not an authorized replacement.

## 3. Institutional model

Boundary Theory is the unmistakable theoretical center. Other objects must be represented according to what kind of object they are rather than flattened into one generic “work” level.

```text
Boundary First Labs
|
+-- Boundary Theory                         field / theoretical center
|   +-- Distinction Space                   central formal object
|   +-- Distinction Theory                  theory facet
|   +-- Admissibility Theory                theory facet
|   +-- Emergence Theory                    theory facet
|
+-- Representational Mechanics             discipline
|   +-- Formal Grammars                     formal apparatus
|
+-- Research Themes                         persistent questions
|   +-- Mathematical & Formal Foundations
|   +-- Representation & Computation
|   +-- Institutions, Agency & Governance
|   +-- Human Systems & Accessibility
|   +-- Physical / Complex Systems
|
+-- Projects                                bounded investigations
+-- Boundary First                          operational method
|   +-- Boundary-First Engineering          applied practice / translation bridge
|
+-- Outputs                                 produced artifacts
+-- People and Organizations                explicit real relationships
+-- Learning                                primers, readings, workshops
+-- Institutional Stewardship               mission, standards, governance, strategy
```

This hierarchy is one orientation projection. The underlying model is relational rather than a strict tree.

## 4. Core product principles

### 4.1 Represent the object that exists

A field is not a theme. A theme is not a project. A project is not an output. A person is not a generic team member. Each record must declare its actual type and relationships.

### 4.2 Research is a closure loop

The public model must show feedback rather than a one-way academic pipeline:

```text
theory -> mechanics -> practice -> consequence
   ^                                |
   +--------- evidence / repair ----+
```

Equivalent institutional language:

```text
research -> translation -> application -> governance
    ^                                      |
    +----------- observed feedback --------+
```

### 4.3 The graph precedes the menu

Navigation is a projection of the research graph. It must not become the canonical ontology.

### 4.4 Epistemic status is first-class

Every public research object must expose a carefully governed status, evidence boundary, known limitations, and update history where applicable. Visual prominence must not imply maturity.

### 4.5 Do not imitate institutional scale

People and organization records must use precise, evidenced relationship types such as Founder, Collaborator, Advisor, Reviewer, Research Partner, Client/Partner, or Contributor. Empty institutional categories and implied networks are prohibited.

## 5. Public object contract

A full research-object page should be able to answer:

| Field | Question answered |
|---|---|
| Type | What kind of object is this? |
| Status | What is its present epistemic or operational maturity? |
| Summary | What does it currently claim or do? |
| Parent / context | Where does it sit in the research architecture? |
| Central objects | What formal or operational objects does it depend on? |
| Relationships | What does it inform, test, use, produce, support, or challenge? |
| Projects | Which bounded investigations develop or test it? |
| Outputs | What artifacts support or document it? |
| Applications | Where has it been applied or proposed for application? |
| Evidence / validation | What evaluation has actually occurred? |
| Known limitations | What is not established? |
| Open questions | What remains unresolved? |
| Provenance | Which canonical sources authorize the public projection? |
| Revision record | When and why did the public record change? |

Compact cards and listings may show a subset, but they must retain type, status, and provenance access.

## 6. Primary public projections

Pass 11 should make the same graph legible through several bounded views:

1. **Research architecture:** field, formal objects, facets, disciplines, themes, and projects.
2. **Practice:** method, engineering bridge, domain applications, audits, and engagements.
3. **Outputs:** papers, working notes, software, tools, case studies, books, talks, and media.
4. **Learning:** primer, glossary, reading paths, explanatory essays, and real workshops when available.
5. **Network:** explicit people, organization, event, authorship, contribution, and partnership relationships.
6. **Institution:** mission, stewardship, research standards, strategy, governance, and support.
7. **Atlas:** spatial and textual projections of the same typed graph.

The homepage should continue to orient rather than explain the entire ontology.

## 7. Priority institutional mechanisms

### 7.1 Outputs registry

Create a unified, typed outputs registry rather than treating a generic blog as the research archive. Each output should link upward to its project, theme, theory objects, authors/contributors, status, and source artifact.

### 7.2 Research & Institutional Strategy

Add a bounded public strategy page that distinguishes:

- what exists now;
- what is actively being developed;
- what is proposed;
- what would require funding, collaborators, governance, or validation;
- how institutional sustainability and oversight relate to research quality.

### 7.3 Boundary First Studio

Record a future applied interface for bringing an institutional, technical, organizational, or representational problem into a bounded engagement. The Studio is a translation mechanism, not a claim that an operational program already exists.

A future Studio contract should identify intake boundary, problem model, obligations, admissible transitions, failure modes, repair paths, outputs, evidence ownership, confidentiality, closure, and feedback into research.

## 8. Data and migration posture

Do not enlarge the existing flat content JSON into a universal ontology.

The first implementation slice should be additive:

1. inventory existing records and generated public projections;
2. define typed registries and relation vocabularies;
3. map current records into the model without deleting or moving them;
4. generate public projections from the typed layer;
5. run parity, provenance, link, and route checks;
6. consider source cutover only after the generated views match or improve the current site.

The current flat JSON remains a compatibility source during the pass. Any later breakup requires a reversible migration record and parity evidence.

## 9. Epistemic vocabulary boundary

The source proposes a maturity path such as Exploratory -> Conjecture -> Formalization -> Derived Result -> Computationally Tested -> Empirically Benchmarked -> Externally Reviewed -> Reproduced/Validated.

Pass 11 must **not** silently adopt that sequence as a universal ladder. Research maturity may be multi-dimensional and non-linear. The vocabulary must be adjudicated against actual BFL objects and should distinguish at least:

- epistemic status;
- validation method;
- operational/adoption status;
- publication/review status;
- provenance confidence;
- known limitations.

## 10. Acceptance criteria

- Boundary Theory is legible as the conceptual center without flattening other object types beneath it.
- Field, facet, discipline, formal object, theme, project, practice, output, claim, person, organization, and case study are distinguishable records.
- Each published object exposes type, bounded status, source provenance, and meaningful relationships.
- Projects can link to methods used, theories tested, outputs produced, contributors, partners, and feedback.
- Outputs form a searchable/filterable research archive rather than a generic chronological feed.
- Practice is visibly connected to theory and visibly returns evidence or limitations to research.
- Institutional stewardship remains an institution-level mission and quality function.
- No relationship, program, review state, validation state, or institutional scale is implied without evidence.
- Existing routes and both Atlas versions remain available throughout the pass.
- The current global navigation is not replaced without a separate decision and newcomer evidence.
- Mobile, keyboard, reduced-motion, and text-first graph access remain supported.
- Public projections can be regenerated deterministically and traced to their sources.

## 11. Non-goals

Pass 11 does not authorize:

- a wholesale route rename or folder reorganization;
- deleting the existing flat JSON before parity is demonstrated;
- replacing the five-pillar navigation immediately;
- presenting proposed programs as operational;
- inventing a faculty, team, partner network, review process, or validation history;
- forcing all research objects onto a single linear maturity ladder;
- replacing the current Atlas with the refined version;
- converting the entire site into a consultancy funnel.

## 12. Source status

The Topos Institute and Santa Fe Institute comparison is a supplied synthesis used to derive design principles. Its links are preserved in the source note. Pass 11 treats those institutions as structural precedents, not authorities over BFL terminology or evidence. External claims should be rechecked before publication as comparative copy.
