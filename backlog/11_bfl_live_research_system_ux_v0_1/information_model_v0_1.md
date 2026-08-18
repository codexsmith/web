# BFL Live Research System — Information Model v0.1

**Status:** Draft contract for backlog pass 11  
**Authority:** Implementation model only; it does not create or promote research claims

## 1. Entity families

| Family | Initial types | Defining boundary |
|---|---|---|
| Theory architecture | `field`, `formal_object`, `theory_facet`, `discipline`, `formal_apparatus` | Formal or theoretical structure, not a bounded investigation |
| Research activity | `theme`, `project`, `research_question` | Persistent question or bounded program of investigation |
| Translation and practice | `method`, `practice`, `application`, `engagement`, `case_study` | Makes theory operational or records applied work |
| Evidence and expression | `claim`, `output`, `dataset`, `software`, `talk`, `media_record` | Carries, tests, or communicates work |
| Relationships | `person`, `organization`, `event`, `role_assignment` | Represents evidenced participation, authorship, partnership, or governance |
| Institution | `mission`, `standard`, `strategy`, `governance_record`, `stewardship_record` | Institutional-level purpose, quality, continuity, and accountability |
| Learning | `primer`, `glossary_term`, `reading_path`, `workshop` | Bounded educational interpretation or program |

Types may be refined after the inventory. A new type must have a distinct semantic boundary; visual convenience is not enough.

## 2. Minimum canonical record

```json
{
  "id": "stable-machine-id",
  "type": "project",
  "title": "Public title",
  "summary": "Bounded current description",
  "status": {
    "epistemic": "controlled-value",
    "operational": "controlled-value",
    "review": "controlled-value"
  },
  "claimCeiling": "What this record must not imply",
  "sources": ["canonical-source-id"],
  "relationships": ["relationship-id"],
  "limitations": ["limitation-id-or-text"],
  "openQuestions": ["question-id"],
  "revision": {
    "version": "0.1",
    "updatedAt": "YYYY-MM-DD",
    "reason": "Why the public record changed"
  }
}
```

Public projection fields may be generated from this record, but must not overwrite its source authority.

## 3. Relationship contract

Relationships are typed records, not loose tags.

```json
{
  "id": "relation-id",
  "type": "tests",
  "source": "project-id",
  "target": "theory-facet-id",
  "status": "asserted",
  "sources": ["canonical-source-id"],
  "validFrom": null,
  "validTo": null,
  "note": "Optional bounded explanation"
}
```

Initial relation vocabulary:

| Source | Relation | Target |
|---|---|---|
| facet | `informs` | theme |
| theme | `inspires` | project |
| project | `uses` | method |
| project | `tests` | theory object or claim |
| project | `produces` | output |
| output | `supports` / `challenges` | claim |
| output | `extends` / `documents` | theory object or project |
| person | `authors` | output |
| person | `contributes_to` / `reviews` / `advises` | project or output |
| organization | `partners_on` / `funds` / `hosts` | project, event, or output |
| practice | `applies` | theory object or method |
| practice | `produces` | case study or output |
| case study | `feeds_back_into` | theory object, claim, method, or standard |
| governance record | `constrains` / `authorizes` / `reviews` | institutional object or practice |

Inverse labels may be generated for presentation. They should not create a second canonical relation.

## 4. Status dimensions

Do not encode all maturity in one field.

| Dimension | Example questions |
|---|---|
| Epistemic | Is this exploratory, conjectural, formalized, derived, or supported? |
| Validation | Has it been checked computationally, empirically, externally, or reproducibly? |
| Operational | Is this proposed, piloted, active, paused, completed, or retired? |
| Publication | Is it a private note, public working record, submitted work, reviewed output, or published artifact? |
| Provenance | Is the public projection directly sourced, editorially synthesized, inferred, or awaiting source confirmation? |

Exact controlled values remain an adjudication task. The UI must not visually arrange these dimensions into an unsupported universal progression.

## 5. Storage and projection boundary

Recommended additive shape:

```text
canonical source material
        |
        v
typed registries + relationships
        |
        +--> validation and integrity reports
        |
        +--> public page projections
        |
        +--> list/search indexes
        |
        +--> Atlas graph projections
```

The current pass 10 public projections remain operational while this layer is introduced. No source file is retired until parity and provenance checks pass.

## 6. Integrity checks

The future generator should reject:

- duplicate stable IDs;
- unknown entity or relationship types;
- dangling relation endpoints;
- public records without type, source, or status boundaries;
- person/organization roles without source evidence;
- validation or review claims without a linked record;
- circular hierarchy where a hierarchy is asserted;
- public projections that silently exceed a source claim ceiling;
- broken canonical or compatibility URLs;
- output records that cannot link back to a project, claim, or explicit standalone rationale.
