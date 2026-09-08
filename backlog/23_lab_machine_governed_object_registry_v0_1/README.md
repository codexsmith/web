# Boundary First Labs Lab Machine Governed Object Registry v0.1

**Status:** Prototype handoff · local polish, validation, and merge required  
**Date:** 2026-08-28  
**Scope:** Lab Machine apparatus, second-layer subsystem projections, cross-machine traversal, governed-object carrier state, selectable governed-object registry, visual/runtime polish, and merge handoff  
**Source branch:** `prototype/lab-machine-second-layer-content`  
**Pre-registry prototype head:** `aa06ddadf2e8ac023dfedabe9f2a923ae8ddab1e`  
**Earlier traversal checkpoint:** `54384ad5ad83c614ae0e43574efc6ea82aa11dd8`

## 1. Decision

The Lab Machine should represent **one institutional system containing many governed objects**, not a collection of unrelated pages.

The core interaction principle is:

> One governed object may appear differently in Research, Products, Applications, Service, Public Value, People, Method, Governance, Publications, Timeline, and About, but those surfaces remain projections of the same object rather than independent sources of truth.

The prototype now carries both:

1. **subsystem traversal state** — where the visitor is moving in the institutional machine; and
2. **governed-object carrier state** — what bounded object is being inspected while moving through those subsystem projections.

The merge-quality implementation should preserve both distinctions.

## 2. What already exists on the branch

### 2.1 Physical Lab Machine apparatus

The Lab Machine is rendered as a physical industrial apparatus rather than a conventional dashboard. It currently models twelve institutional subsystems:

- Research
- Products
- Publications
- Applications
- Method
- Pipeline
- Governance
- About
- People
- Timeline
- Service Bus
- Public Value

The graph is intentionally semantic rather than merely visual. Nodes represent institutional boundaries and edges represent typed relations such as `develops`, `publishes`, `applies`, `constrains`, `records`, `disseminates`, and `serves`.

The physical cables currently visualize graph state but are **not themselves interactive controls**. Navigation occurs through subsystem nodes and relation rails.

### 2.2 Second-layer institutional content

Every subsystem has a generic second-layer contract describing:

- institutional role;
- boundary / contains / excludes;
- what enters the subsystem;
- how it transforms;
- what exits;
- rationale;
- validation signals;
- available projections;
- institutional takeaway.

This is the semantic floor beneath specialized interfaces.

### 2.3 Specialized subsystem projections

Dedicated specialized projection components currently exist for:

- Timeline
- Products
- Research
- Method
- Pipeline
- Governance
- About
- People
- Applications
- Service Bus
- Public Value

**Publications remains the important specialized-projection gap.** It still has generic second-layer content and participates in traversal, but it does not yet have its own dedicated projection component.

The generic Publications contract already defines the required modes and should be used rather than inventing replacements:

- `publication-map` → **Publication Program**
- `maturity-board` → **Maturity**
- `claim-provenance` → **Claim Provenance**

Framing question:

> When is research ready to become a public claim?

Required institutional takeaway:

> Publishing is a governed boundary crossing: research becomes public without losing its provenance or uncertainty.

### 2.4 Cross-machine traversal

The prototype shares traversal state across generic detail panels and specialized projection shells.

Tracked state includes:

- focus subsystem;
- current subsystem;
- traversed semantic relations;
- visited nodes;
- adjacent nodes;
- active relation cables;
- reset / rewind behavior.

A click on a directly related subsystem records the connecting graph relation. A jump to an unrelated subsystem currently starts a new subsystem focus rather than fabricating an edge.

### 2.5 First governed-object carrier

The first complete carrier seed is **Agency + Representation Audit**.

Primary outward route:

`Research → Products → Applications → Service Bus → Public Value → People`

It also has source-backed orthogonal projections through Method, Pipeline, Governance, Publications, Timeline, and About.

This carrier intentionally preserves distinctions including:

- person or condition ≠ representation;
- authority remains traceable;
- consequence remains traceable beyond the local decision;
- contestability is tested in the executable process;
- source correction does not count as closure while downstream consequence remains unrepaired;
- scope, evidence standing, and claim ceiling survive projection changes.

The audit remains a pilot-intake systems capability. The carrier must not imply legal, regulatory, compliance, fairness, safety, cybersecurity, or delegated institutional authority.

## 3. Registry expansion in this pass

Pass 17 generalizes the carrier into a selectable object registry.

The current prototype registry contains five source-backed seeds when combined with the original audit carrier:

| Object | Current standing | Primary projection route |
| --- | --- | --- |
| Agency + Representation Audit | Public service · pilot intake | Research → Products → Applications → Service → Public Value → People |
| Boundary First UX | Working public standard · launch candidate | Products → Service → Public Value |
| Software Before Code | Working public method | Method → Service → Public Value |
| Augusta CityWatch | Historical build · modern bridge draft | Applications → Service → Public Value |
| Boundary First Weather | Research program · pilot candidate | Research → Applications |

The object selector is intentionally **not** a generic content catalog. Selecting an object loads that object's declared first projection, resets the prior traversal trail, and marks the institutional boundaries through which that object currently has a declared projection.

### 3.1 Boundary First UX

The registry preserves these current boundaries:

- renderer independence;
- identity and provenance through transformation;
- accessible equivalents as lawful projections;
- consequence and path preservation;
- closure is scoped and earned;
- candidate BFUX conformance levels remain proposed, not canonical.

Its Public Value standing remains E1: capability is reachable. Public availability does not establish comprehension, independent reuse, changed outcomes, or durable value.

### 3.2 Software Before Code

The registry treats Software Before Code as a working public engineering method whose central invariant is to determine the represented object and protected distinctions before selecting mechanisms.

It must remain distinct from:

- big design up front;
- anti-code or anti-framework doctrine;
- proof of correctness;
- universal superiority over competent established software practice.

Its Public Value standing also remains E1.

### 3.3 Augusta CityWatch

CityWatch is represented deliberately as:

> Historical build · modern bridge draft

The registry must **not** transform historical implementation into a current Augusta-Richmond County affiliation, collaboration, deployment, or endorsement.

Its Service Bus projection is intentionally represented as a **distribution-package gap** because there is no currently promoted maintained Service Bus package for CityWatch. That gap is a feature of the model, not missing copy to fill by inference.

Historical outcomes and awards require retained or independent evidence before stronger public promotion.

### 3.4 Boundary First Weather

Weather is represented as a research program and pilot candidate, not a validated forecasting system.

Current carrier boundaries prohibit claims that Boundary First Weather:

- improves forecast accuracy;
- is faster than operational NWP;
- predicts severe weather earlier;
- replaces established weather models;
- has been externally validated by a weather institution.

The primary route intentionally stops at Applications because a supported Service Bus package or Public Value result has not yet been earned.

## 4. Registry mechanics

The implementation now distinguishes **object projection sequence** from **semantic graph adjacency**.

This matters because an object's institutional projection sequence is not always a literal sequence of adjacent graph edges. For example, a method may have a Method projection and a Service projection even when the current semantic graph does not contain a direct Method → Service edge.

Prototype behavior:

- route buttons may move directly to the selected object's next declared projection;
- the semantic traversal system still refuses to invent a relation where no graph edge exists;
- an unrelated jump therefore resets graph-focus/trail state under the current traversal semantics;
- cable highlighting now marks only actual graph edges connecting **consecutive route stages**, rather than any edge whose endpoints merely appear somewhere in the same object route;
- unmapped local projections display an explicit gap rather than generated filler.

This distinction should be reviewed locally. A likely refinement is to formalize two different operations:

1. **Traverse relation** — move across an actual semantic graph edge.
2. **Project object** — inspect the same governed object in another subsystem even if no direct graph edge connects the two subsystem nodes.

Do not collapse those operations merely to make the UI feel smoother.

## 5. Source architecture

Current prototype sources include:

- `src/components/bfux/LabMachine.tsx`
- `src/components/bfux/LabMachineNavigationContext.tsx`
- `src/components/bfux/LabMachineDetailPanel.tsx`
- `src/components/bfux/LabMachineProjectionShell.tsx`
- `src/components/bfux/LabMachineObjectCarrier.tsx`
- `src/components/bfux/LabMachineRelationRail.tsx`
- `src/components/bfux/lab-machine-model.ts`
- `src/components/bfux/lab-machine-traversal.css`
- `src/components/bfux/lab-machine-object-carrier.css`
- `src/content/lab-machine-governed-objects.json`
- `src/content/lab-machine-object-registry.json`
- subsystem-specific `src/content/lab-machine-*.json` files.

The first audit object currently remains in `lab-machine-governed-objects.json`; the four newer seeds live in `lab-machine-object-registry.json`. This split is acceptable for the handoff branch but should be reconsidered before merge.

A merge-quality version may choose one canonical registry schema and generator rather than preserving two manually imported JSON sources.

## 6. Local pickup procedure

A local implementation pass should begin from this branch rather than reproducing the prototype from screenshots or prose.

Recommended sequence:

1. Check out `prototype/lab-machine-second-layer-content`.
2. Install dependencies using the repository's normal Node workflow.
3. Follow `AGENTS.md`: inspect the relevant local Next.js documentation under `node_modules/next/dist/docs/` before modifying framework-sensitive code.
4. Run `npm run verify` before declaring the prototype mergeable. This repository command covers lint, TypeScript, contracts, build, and runtime checks.
5. Run `npm run dev` and visually inspect the Lab Machine on wide desktop, narrow desktop/tablet, and mobile widths.
6. Exercise keyboard-only navigation through nodes, relation rails, registry selector, carrier route, back/reset controls, and specialized projection modes.
7. Test each of the five carrier seeds and verify that changing objects resets object/traversal state coherently.
8. Inspect non-contiguous projection jumps and decide whether `project object` deserves a distinct state transition from `traverse relation`.
9. Verify fixed SVG cable paths against the current graph ordering and physical card positions.
10. Complete or explicitly defer the specialized Publications projection using the already-declared three view IDs.
11. Reconcile duplicate/manual registry content into a maintainable canonical model where practical.
12. Polish typography, spacing, responsive behavior, cable routing, focus states, reduced-motion behavior, and high-contrast/forced-color behavior.
13. Add targeted contracts/tests for registry integrity and route references if the prototype survives review.
14. Review/squash the prototype branch history as appropriate so the merge into `main` is coherent and reviewable.

## 7. Required local verification

No remote statement in this backlog substitutes for local verification.

Before merge, run at minimum:

```bash
npm run verify
```

Then perform runtime/visual QA for:

- desktop apparatus layout;
- mobile/reflow layout;
- keyboard focus order;
- visible focus treatment;
- reduced motion;
- high contrast / forced colors where supported;
- all specialized projection open/back/close flows;
- object change/clear/load flows;
- direct relation traversal vs cross-projection jumps;
- trail rewind/reset;
- route/cable highlighting;
- explicit unmapped projection gaps.

## 8. Known prototype risks and debts

### Runtime validation has not been performed in the connector environment

The current work was assembled against source files through the GitHub connector. It has **not** been locally built, typechecked, linted, rendered, or visually inspected in this environment.

### Cable geometry is index-coupled

Physical and apparatus SVG cable paths are fixed arrays whose indexes correspond to `labMachineEdges` ordering. This is brittle. Reordering or adding edges can silently connect semantic edges to the wrong physical cable geometry.

A merge-quality implementation should consider binding geometry to edge keys instead of array position.

### Projection sequence and graph traversal are currently partially conflated

Carrier route buttons reuse subsystem navigation. Non-adjacent projection changes therefore reset graph traversal focus. This is logically defensible but may feel surprising. Preserve the distinction and then design the interaction deliberately.

### Registry data is manually curated

The registry is source-backed but manually assembled. It is not yet generated from a canonical cross-object identity graph.

Longer-term target:

`governed object → subsystem projections → claims → evidence → sources → evaluations → defects → obligations`

### Default object may be too opinionated

The Agency + Representation Audit currently loads as the default carrier because it was the first full-path demonstration object. Final public UX may be better with no carrier loaded initially, a guided sample, or a task-derived default.

### Publications remains incomplete

Publications is the only semantic graph node without a specialized projection component. This should be resolved or consciously accepted before calling the Lab Machine family complete.

### No runtime screenshot review yet

The apparatus has not been visually inspected after the registry changes. Watch especially for selector density, physical card overlap, carrier labels, mobile overflow, and the top-row cable added for Products → Applications.

## 9. Claim and relationship safeguards

The local polish pass must preserve the existing evidence discipline.

- **People:** the public operational collaboration register currently records zero instances. Do not invent collaborators, partners, reviewers, funders, or endorsements.
- **CityWatch:** do not imply current Augusta-Richmond County collaboration or affiliation.
- **Weather:** do not imply forecast-performance improvement or external validation.
- **Boundary First UX:** proposed conformance levels are not canonical.
- **Public Value E1:** reachable capability is not evidence of usability, changed behavior, impact, independent reuse, or durable public capacity.
- **Publications:** publication does not equal peer review, correctness, endorsement, or authority.
- **Graph semantics:** the Products → Applications relation was introduced as a design-level semantic relation to express product transfer into application. Review it explicitly before treating it as a canonical institutional ontology edge.

## 10. Acceptance criteria for merge readiness

- `npm run verify` passes locally.
- The Lab Machine renders without console/runtime errors.
- Every registry object can be selected, cleared, and reloaded without stale state.
- Selecting a new carrier initializes the declared first subsystem and clears the old traversal trail.
- Object identity remains visible while moving through its declared projections.
- Missing projections remain visibly missing; the UI does not fabricate a mapping.
- Actual semantic edges and object projection sequences remain distinguishable.
- Carrier cable highlighting never implies a graph edge that does not exist.
- Registry and relation controls are keyboard accessible.
- Responsive and reduced-motion behavior is acceptable.
- Source-backed status and claim ceilings survive the UI projection.
- CityWatch, Weather, People, BFUX conformance, and Public Value claims retain the safeguards above.
- The specialized Publications decision is resolved or explicitly documented as a merge exception.
- The route/cable geometry coupling is either hardened or covered by a contract/test.
- Visual QA screenshots or equivalent review evidence are attached to the local PR.
- The PR distinguishes source-backed relationships from design-inferred graph structure.
- Prototype history is squashed/reviewed as needed before merge to keep `main` coherent.

## 11. Non-goals

Pass 17 does not authorize:

- automatically inferring missing cross-domain or cross-subsystem mappings;
- turning a projection sequence into a claimed causal relation;
- treating visual cable geometry as the canonical ontology;
- promoting public availability into impact evidence;
- implying collaborations, endorsements, external validation, or institutional authority that source records do not establish;
- making every object traverse every subsystem merely for visual completeness;
- forcing all objects into one identical lifecycle;
- treating the registry's hand-authored seed data as the final canonical corpus architecture;
- merging the prototype without local build/runtime/visual verification.

## 12. Handoff target

The useful local question is no longer "can the Lab Machine be prototyped?"

The prototype demonstrates the architectural idea:

> **A visitor can bind one governed object, move it through multiple institutional representations, and inspect what changes, what remains invariant, what evidence licenses each state, and where the representation honestly stops.**

The local task is now to make that apparatus trustworthy enough to merge: validate it, simplify it, complete the missing publication surface, harden the data model, polish the physical interaction, and preserve every claim boundary while doing so.
