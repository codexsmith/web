# Binding Protocol and Schema Plan

## 1. Purpose

The binding protocol is the constructive bridge between governed semantic state and any particular interface. It allows one corpus or inquiry to be rendered as a public article, Atlas, workbench, review flow, conventional dashboard, or spatial environment without rewriting the underlying meaning.

## 2. Separation of concerns

```text
Raw source formats
        ↓ adapters
Canonical semantic objects
        ↓ governance and transitions
Workflow profile
        ↓ binding rules
Presentation pattern
        ↓ renderer
2D, document, Atlas, or spatial interface
```

## 3. Binding-file sections

```yaml
binding_protocol:
  id: string
  version: semver
  title: string
  status: draft|review|approved|superseded

source:
  schema_family: json-schema|graph|relational|openapi|documents|events|custom
  schema_reference: uri
  adapters: []

semantics:
  entity_mappings: []
  relation_mappings: []
  enum_mappings: []
  derived_fields: []

workflow:
  profile: corpus-forge|scientific-method|review|publication|custom
  states: []
  transitions: []
  gates: []

views:
  - id: string
    pattern: atlas|workbench|inspector|form|document|spatial-room
    regions: []
    components: []

interactions:
  actions: []
  conditions: []
  fallbacks: []
  keyboard_equivalents: []

spatial:
  environment_family: optional
  object_bindings: []
  room_bindings: []
  environmental_state_rules: []
  pointer_profile: optional

validation:
  required_bindings: []
  type_constraints: []
  accessibility_constraints: []
  governance_constraints: []

export:
  targets: []
  documentation: true
  fixtures: true
```

## 4. Reusable workflow families

### Atlas from graph

Recognizes nodes, relations, clusters, paths, status, documents, and claims.

### Workbench from ledgers

Recognizes jobs, stages, queues, artifacts, sources, contradictions, review, and promotion.

### Claims review flow

Recognizes claim, evidence, provenance, maturity, contradiction, critic finding, and decision.

### Scientific inquiry

Recognizes question, model/hypothesis, method, protocol, trace, comparison, defect, repair, and closure.

### Document explorer

Recognizes collections, documents, sections, anchors, entities, references, and derived artifacts.

### Spatial research room

Recognizes object types, containment, room function, interaction affordances, environmental states, and access boundaries.

## 5. Component semantic contracts

A component is not only a visual widget. It declares what semantic object and action grammar it can faithfully represent.

Example:

```yaml
component: claim-status-token
accepts:
  object_type: claim
  field: status
requires:
  - claim_ceiling
  - evidence_class
behaviors:
  inspect: true
  promote: policy-controlled
fallback:
  render_as: text-with-description
```

## 6. Spatial bindings

```yaml
environment:
  family: research-observatory

object_bindings:
  source:
    form: archive_document
    actions: [open, anchor, cite, compare]
  claim:
    form: illuminated_specimen_card
    actions: [inspect, trace, compare, contradict, submit_for_review]
  contradiction:
    form: tension_link
    environmental_effect: visible_strain
  negative_result:
    form: completed_terminal_path
  promoted_artifact:
    form: sealed_archive_volume

room_bindings:
  active_inquiry: central_workbench
  experiment: experiment_chamber
  comparison: correspondence_hall
  repair: repair_forge
  review: review_chamber
  canonical_corpus: archive
  atlas: observatory
```

## 7. Validation rules

The Binding Studio shall detect:

- unbound required fields;
- duplicate mappings;
- ambiguous semantic relations;
- incompatible component contracts;
- missing labels or accessible names;
- actions without authority policy;
- visual status without semantic source;
- spatial object with no operational meaning;
- missing non-spatial fallback;
- renderer-specific state mutation;
- export incompatibility.

## 8. Version and promotion

Bindings themselves are governed artifacts. They require:

- provenance;
- diff;
- validation report;
- sample fixtures;
- compatibility declaration;
- review status;
- promotion and supersession history.
