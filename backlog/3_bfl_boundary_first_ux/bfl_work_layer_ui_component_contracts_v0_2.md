# Boundary First Labs Work-Layer UI Component Contracts
## Projects, Products, Artifacts, Services, Testbeds, and Context Halos v0.2

**Status:** implementation-guidance draft  
**Purpose:** make the kind, maturity, availability, stewardship, and graph placement of concrete work immediately legible in every projection.

## 1. Non-negotiable recognition rule

Every work entity must answer, without opening its detail page:

1. What kind of thing is this?
2. Is it being worked on, or can I use it?
3. How mature is it?
4. Who is responsible for it?
5. What does it produce or depend upon?
6. Where does it sit in the larger body of work?

Type must be communicated by **shape, label, and semantics**. Color may reinforce type or state, but cannot carry either alone.

## 2. Shape and label grammar

| Entity | Shape | Required kicker | Primary temporal meaning |
|---|---|---|---|
| Program | Rounded rectangle | `PROGRAM` | Long-lived direction |
| Project | Rectangle with progress edge | `PROJECT` | Bounded effort and change |
| Product | Hexagon | `PRODUCT` | Maintained thing available to users |
| Product family | Stacked hexagons | `PRODUCT FAMILY` | Related offerings not yet split into concrete products |
| Artifact | Diamond | `ARTIFACT` | Published, demonstrated, or recorded output |
| Service | Parallelogram | `SERVICE` | Repeatable professional offering |
| Testbed | Dashed hexagon | `TESTBED` | Controlled environment for gathering evidence |

## 3. Project card contract

```text
┌─────────────────────────────────────────────────────┐
│ PROJECT · ACTIVE · VALIDATION                       │
│ Corpus Forge Agent Pipeline                         │
│ Build and test the supervised Operator–Critic loop. │
│                                                     │
│ Advances  Corpus Forge Workbench                    │
│ Produces  Pipeline specification · critic template  │
│ Steward   Unassigned                                │
│ Next gate First complete vertical slice             │
│                                                     │
│ [Open project] [View outputs] [Follow]               │
└─────────────────────────────────────────────────────┘
```

Required fields:

- type kicker;
- title;
- objective or one-sentence summary;
- operating state;
- project phase;
- parent program or domain;
- products/programs advanced;
- outputs produced;
- steward;
- next gate or milestone.

Do not show a generic percentage unless milestones and completion semantics are explicit.

## 4. Product card contract

```text
⬡ PRODUCT · CONFIRMED · BOUNDED PROTOTYPE
  Corpus Forge Workbench
  Governed transformation of source material into
  traceable research systems.

  For          Researchers · authors · labs
  Availability Internal prototype / pilot preparation
  Stewardship  Owner needed · maintenance path pending
  Evidence     3 internal jobs · external pilot pending

  [View product] [Follow progress] [Related projects]
```

Required fields:

- type kicker;
- title;
- value proposition;
- portfolio standing;
- lifecycle stage;
- operating state;
- intended users;
- availability;
- evidence summary;
- stewardship summary;
- related projects.

A concept, prototype, testbed, or pilot may be displayed in the Products collection, but its lifecycle label must remain visible. It must not be described simply as an available product.

## 5. Detail-page shells

### Project

```text
PROJECT / Corpus Forge Agent Pipeline
ACTIVE · VALIDATION

Objective | Scope | Current gate | Steward

[Overview] [Scope] [Workstreams] [Milestones]
[Outputs] [Evidence] [Dependencies] [History]
```

### Product

```text
PRODUCT / Corpus Forge Workbench
CONFIRMED · GOVERNED CONCEPT · ACTIVE DEVELOPMENT

Value proposition | Users | Availability | Stewardship

[Overview] [Users] [Capabilities] [Availability]
[Evidence] [Projects] [Stewardship] [Releases] [Roadmap]
```

## 6. Atlas behavior

The atlas opens in `Concepts` mode. Work entities are available through explicit layer toggles:

```text
[ Concepts ] [ Work ] [ Evidence ] [ All ]
```

- `Concepts`: institution, theories, formal objects, disciplines, methods, domains.
- `Work`: programs, projects, products, product families, services.
- `Evidence`: artifacts, releases, case studies, pilots, testbeds.
- `All`: union graph with aggressive filtering and semantic zoom.

At highest zoom, do not render every project and artifact. Show counts on parent entities, for example `4 active projects · 2 products · 8 artifacts`.

## 7. Radial presets

### Concept-centered

```text
Center     Theory / discipline / domain
Inner ring Active programs and projects
Outer ring Products, artifacts, testbeds, evidence
```

### Project-centered

```text
Center     Project
Inner ring Workstreams and milestones
Middle     Dependencies and collaborators
Outer      Products advanced and artifacts produced
```

### Product-centered

```text
Center     Product
Inner ring Users and capabilities
Middle     Projects, releases, and testbeds
Outer      Theory, evidence, stewardship, related products
```

## 8. Search and breadcrumbs

Search results must include a type kicker before the title:

```text
PROJECT  Corpus Forge Agent Pipeline
PRODUCT  Corpus Forge Workbench
METHOD   Corpus Forge
ARTIFACT Corpus Forge Pipeline Setup
```

Breadcrumbs must preserve typed identity:

```text
Corpus Operations / Program / Corpus Forge / Project / Agent Pipeline
```

Never use the same unlabeled name for a method, program, project, and product.

## 9. Accessibility

- No hover-only information.
- Every shape has a text kicker.
- Status text must meet contrast requirements.
- Reduced-motion mode uses cuts and opacity changes rather than animated graph travel.
- Screen-reader labels announce entity type first.
- Mobile cards preserve type, state, maturity, and availability before secondary prose.


# Context Halo component contracts

## 10. Context Halo recognition rule

A local cluster must communicate four layers without requiring the reader to decode a raw graph:

1. selected center entity;
2. its stable, addressable facet ring;
3. close external relations;
4. the quieter domain horizon.

The center and facets remain foreground. External context begins at reduced prominence and becomes legible through focus, pinning, filtering, or semantic zoom.

## 11. Encoding contract

| Information | Required encoding |
|---|---|
| Facet affinity | Angular placement |
| Structural distance | Radial band |
| Domain family | Hue plus visible family label |
| Subdiscipline | Shade within family plus text |
| Entity type | Existing shape and type kicker |
| Relationship strength | Edge weight |
| Relationship type | Edge style and focused label |
| Interaction state | Opacity and outline |
| Evidence maturity | Relation card text and filter |

Do not use saturation for relationship strength; saturation is needed for family and interaction consistency.

## 12. Quiet default state

- Center object and facet labels: full prominence.
- External node labels: 20–30% prominence.
- Family arc labels: visible but subdued.
- Inactive edges: only the strongest may remain faintly visible.
- Projects, products, and artifacts: preserve shape, but remain background-ish until focused.

## 13. Facet focus contract

On pointer hover or keyboard focus:

- outline and raise the facet;
- reveal directly related external nodes;
- reveal relevant family arcs;
- draw edge bundles and split them near the facet;
- provide a relationship summary with counts and strongest entities;
- keep a visible instruction: `Press Enter to pin`.

## 14. Context-node focus contract

On pointer hover or keyboard focus:

- raise the node to full opacity;
- illuminate all connected facets;
- label the relation type and strength for each focused edge;
- show domain family, entity type, structural distance, and evidence maturity;
- explain the local relationship in one or two sentences.

The first click or Enter key pins. It must not navigate immediately.

## 15. Pinned and compare states

A pinned selection provides:

```text
Open node
View in atlas
Start pathway here
Clear selection
```

Two pinned entities enter compare mode. Compare mode must show:

- shared facets;
- unique facets;
- bridge relations;
- differences in relation type, strength, structural distance, and evidence maturity.

Maximum pinned entities in v0.3: two.

## 16. Domain-family contract

Use `bfl_domain_family_palette_v0_1.json` as the semantic palette source. The UI must still show family labels and entity shapes. In grayscale, the view must remain usable through text, shape, edge style, and perimeter marks.

## 17. Projects and products in Context Halo

Work entities retain their differentiated grammar:

```text
▭ Project
⬡ Product
◇ Artifact
▱ Service
```

A work entity's hue comes from its primary domain family, not from its lifecycle state. Lifecycle and operating state remain textual badges. Work entities normally occupy the middle or horizon bands unless they are the selected center.

## 18. Facet-order stability

Facet order may be suggested computationally but becomes stable after editorial approval. Saved links and user spatial memory depend on that stability. A data refresh may change visible relation density without rotating the facet wheel.

## 19. Mobile and touch

- Tap previews and pins; a separate button opens the entity.
- Domain horizons collapse into family accordions with relation counts.
- The selected relationship card appears below the facet visualization.
- No clipped node is the only route to content.
- Horizontal drag may rotate a wheel only when a clear static reset is available.

## 20. Accessibility additions

- Keyboard focus equals hover preview.
- Enter or Space pins.
- Escape clears the latest pin.
- Screen readers announce center entity, focused facet or node, relation count, relation types, and available actions.
- Edge style differences must be at least as legible as color differences.
- Reduced motion disables animated orbiting and edge drawing.
