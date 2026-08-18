# Next Work Register — BFL Live Research System

| ID | Task | Goal | Output | Dependency | Status |
|---|---|---|---|---|---|
| LRS-001 | Inventory existing content and graph-like records | establish what already exists before defining new containers | entity/relation census | pass 10 projections | NEXT |
| LRS-002 | Adjudicate entity types | separate field, facet, theme, project, practice, output, and institutional objects | type registry and definitions | LRS-001 | QUEUED |
| LRS-003 | Adjudicate status dimensions | prevent one misleading maturity ladder | epistemic/validation/operational/review vocabularies | LRS-001 | QUEUED |
| LRS-004 | Define relationship vocabulary | make cross-object meaning explicit and testable | relation registry with inverse labels | LRS-002 | QUEUED |
| LRS-005 | Map current flat JSON and projections | preserve compatibility while establishing typed records | reversible mapping and parity report | LRS-002–004 | QUEUED |
| LRS-006 | Implement registry validation | reject dangling, overstated, or untraceable records | deterministic validator and tests | LRS-005 | QUEUED |
| LRS-007 | Build research-object page contract | reveal type, status, relationships, limitations, and provenance | reusable page/card components | LRS-006 | QUEUED |
| LRS-008 | Build unified Outputs projection | replace generic-feed assumptions with a typed research archive | outputs index and filters | LRS-006–007 | QUEUED |
| LRS-009 | Build Research architecture projection | expose field, facets, themes, and projects without flattening | research hub vertical slice | LRS-006–007 | QUEUED |
| LRS-010 | Connect Atlas V2 to typed graph | test the graph as an additional projection while preserving Atlas V1 | feature-gated Atlas V2 data adapter | LRS-006 | QUEUED |
| LRS-011 | Draft Research & Institutional Strategy | distinguish current, active, proposed, and dependency-bound work | bounded public strategy page | institutional review | QUEUED |
| LRS-012 | Define Boundary First Studio contract | specify the applied bridge without implying an active program | program decision record and draft page | practice/governance review | QUEUED |
| LRS-013 | Audit people and organization relationships | prevent institutional-scale theater | evidence-backed relationship register | LRS-004 | QUEUED |
| LRS-014 | Test candidate top-level projection | compare current five pillars with Research/Practice/Outputs/Learn/Network/About | newcomer comprehension report | LRS-008–009 | DEFERRED |
| LRS-015 | Decide navigation and source cutover | change only after parity and user evidence | decision record and migration plan | LRS-005, LRS-014 | BLOCKED |

## Recommended first implementation slice

The first code slice should complete LRS-001 through LRS-007 for a deliberately small set of existing objects:

- Boundary Theory;
- Distinction Space;
- one theory facet;
- one research theme;
- one project;
- one method or practice;
- two linked outputs;
- one explicit feedback relationship.

This slice should prove the model, validation, provenance path, and object-page contract before bulk migration.

## Review gates

1. **Ontology gate:** types and relations are semantically distinct and grounded in current BFL work.
2. **Evidence gate:** statuses, roles, reviews, validations, and partnerships have linked evidence.
3. **Parity gate:** existing public routes and content remain reachable and materially complete.
4. **Projection gate:** list, object-page, and Atlas projections derive from the same records.
5. **Accessibility gate:** text-first, keyboard, mobile, and reduced-motion paths expose equivalent meaning.
6. **Navigation gate:** no global navigation replacement occurs without newcomer test evidence and an explicit decision.
