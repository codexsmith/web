# Boundary First Labs Institutional UX Component Contracts v0.1

**Status:** provisional implementation contract; content register and adoption audit remain authoritative.

## Boundary First UX definition

> **Boundary First UX is a multi-scale information architecture for making complex, consequential bodies of knowledge legible without flattening their distinctions. It progressively reveals what an object is, how it relates, what governs it, what it affects, and how it can be challenged or repaired.**

## Institutional projection

The user-facing view is **How the Lab Operates**. The internal projection ID is `institutional-closure-map`.

```text
Purpose
  ↓
Institutional invariants
  ↓
Bounded authority
  ↓
Promotion and release gates
  ↓
Standing and participation
  ↓
Criticism, correction, and repair
  ↓
Stewardship and continuity
```

## Required components

### InstitutionalClosureMap

Must render the seven operating layers around the Boundary First Labs institution node. It reads from the institutional register rather than duplicating prose.

Required behavior:

- default to concise, low-density statements;
- expose exact source wording and source path on expansion;
- show binding and operationalization status in text;
- never infer that a proposed or declared statement is adopted, implemented, or audited;
- preserve the user's sequence, halo, atlas, or node return state.

### InstitutionalStatementCard

Required fields:

```text
TYPE · STATUS · SCOPE
Statement label
Exact or approved concise statement
Source
Binding status
Operationalization status
Owner, if known
Review date, if known
Known defects or unresolved adjudication
```

### GovernanceStatusBadge

Supported status vocabulary:

```text
Descriptive
Aspirational
Declared principle
Declared commitment
Proposed policy
Provisionally adopted
Adopted
Operationalized
Audited
Under revision
Superseded
Withdrawn
Unverified
```

Only statuses supported by explicit records may be displayed. This packet does not establish any statement as provisionally adopted, adopted, operationalized, or audited.

### AuthorityAndRepairTrace

Available from claims, projects, products, policies, publications, and services.

It should answer:

```text
What kind of object is this?
What is it authorized to claim or do?
What boundary applies?
What must it preserve?
What evidence allowed it to advance?
Who approved or stewards it?
Who is affected?
Who can contest it?
What happens if it fails?
Who can repair, replace, withdraw, transfer, or retire it?
```

Unknown answers must be rendered as **Not yet recorded**, not omitted.

### GovernanceLens

Add a `Governance` filter to Atlas and Context Halo. Supported relations:

```text
authorizedBy
boundBy
reviewedBy
publishedUnder
stewardedBy
maintainedBy
fundedBy
contestableBy
affectedBy
correctedBy
retiredBy
succeedsTo
```

### ConventionalInstitutionalPage

The conventional pages remain first-class, printable, accessible, linkable records. Each page must link to its Boundary First projection and vice versa.

## Introductory-sequence touchpoints

1. **Promise:** concise mission and long-horizon vision near the opening.
2. **Method:** mission connected to Boundary First's operating questions.
3. **Self-binding:** after evidence and work, show how the lab applies authority, admissibility, criticism, and repair to itself.
4. **Optional pathway:** `How the Lab Operates` / `Purpose, Power, and Repair`.

## Accessibility

- status may not be encoded by color alone;
- institutional rings must have a linear reading order;
- every relationship must be available in a text list;
- hover behavior must have focus, tap, and pin equivalents;
- reduced-motion mode replaces animated closure cycles with stepped transitions;
- exact source text must remain available without opening a visual graph.
