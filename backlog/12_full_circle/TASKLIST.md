# Phase 12 Full Circle — Alignment and Refinement Task List

**Status:** Implementation in progress; Systems Audit, Chess, and Atlas view decisions incorporated  
**Opened:** 2026-08-10  
**Governing vision:** [`product_owner_vision.md`](./product_owner_vision.md)  
**Acceptance checklist:** [`ALIGNMENT_REVIEW_CHECKLIST.md`](./ALIGNMENT_REVIEW_CHECKLIST.md)

## Goal

Bring the current site into clear launch alignment with the product-owner vision by establishing BFL as an independent public-interest research and engineering laboratory. Preserve the strongest implemented systems: the visual language, People / Problem / Repair on-ramp, Atlas, public record, claim-evidence boundaries, governance, stewardship, collaboration doctrine, and responsive public shell.

## Governing identity synthesis

> **Boundary First Labs is an independent public-interest research and engineering laboratory. Centered on consequence, governance, and repair, BFL researches consequential and public systems for the public good by making hidden structure explicit across software, AI, mathematics, scientific computation, and institutional systems.**

Implementation must preserve these layers:

- **public identity:** independent public-interest research and engineering laboratory;
- **current operating scale:** founder-led, AI-enabled micro-lab;
- **subject:** consequential and public systems;
- **purpose:** public good;
- **method:** making hidden structure explicit;
- **domains:** software, AI, mathematics, scientific computation, and institutional systems;
- **governing center:** consequence, governance, and repair.

The site should use this identity directly and avoid adding a second, loftier institutional label.

## Priority definitions

- **P0 — Launch spine:** required for the public identity, primary routes, truthful offer, or claim boundary to be coherent.
- **P1 — Launch depth:** required for the vision to be substantively represented beyond the hero.
- **P2 — Refinement and evidence:** improves comprehension, conversion, testing, and maintainability after the spine is stable.
- **P3 — Later:** valuable work that should not block the Phase 12 launch alignment.

## Implementation rules

- The product-owner vision governs positioning, priority, audiences, calls to action, and intended portfolio status.
- Canonical source records govern formal definitions, evidence, proof, adoption, and operational verification.
- Use Laboratory as the public institutional noun; retain founder-led micro-lab language only where current operating scale matters.
- Do not hand-edit generated files in `src/content/public-projections`.
- Do not use founder experience, a large corpus, AI assistance, collaboration, funding, or product implementation as proof of a mathematical or scientific claim.
- Preserve epistemic claim class and evidence/operational maturity as distinct dimensions.
- Before changing Next.js routes, metadata, or framework conventions, follow `Webpage/AGENTS.md` and read the relevant installed Next.js 16.2.12 documentation in `node_modules/next/dist/docs/`.

## Dependency decisions

These decisions gate copy and information architecture but do not block preparatory content modeling or tests.

- [x] **FC-D01 — Public identity architecture:** use “independent public-interest research and engineering laboratory” as the single public identity and “founder-led, AI-enabled micro-lab” only for current operating scale. Join both through consequential/public systems, public good, explicit hidden structure, and consequence/governance/repair. Exact channel-specific copy remains part of FC-003 and FC-010.
- [ ] **FC-D02 — Schemathematics relationship:** decide whether Schemathematics contains, renames, or sits beside the current Boundary Theory / Distinction Space / Contexture / Representational Mechanics architecture.
- [x] **FC-D03 — Service architecture:** Boundary First Systems Audit is the primary general service; AI Consequence-Loop Audit is a focused track for one AI-assisted workflow or product slice; Enterprise Practice is the broader architecture and engineering context for separately scoped delivery.
- [ ] **FC-D04 — Portfolio maturity:** complete the remaining portfolio adjudication.
  - [x] Boundary First Systems Audit — Available on request; produced against the actual system rather than statically offered.
  - [x] Boundary First Chess — Available / Launching; current, launching, and future-software forms are separated.
  - [ ] AI and Agentic Systems — final public fulfillment boundary pending.
  - [ ] Mathematical and Research Tooling — final prototype grouping and evidence boundary pending.
- [ ] **FC-D05 — Funding destination:** choose `/fund`, `/support`, or a stable deep-linked collaboration mode. Recommended: `/fund` as a concise public explanation that hands inquiries into the governed collaboration system.
- [ ] **FC-D06 — Founder disclosure:** approve name, Georgia Tech wording, career summary, “third company,” and the role of AI in the research narrative.
- [ ] **FC-D07 — Public claim display:** approve a two-axis taxonomy and plain-language labels.
- [ ] **FC-D08 — Navigation vocabulary:** approve Research as a primary label and the final placement of Start, Learn, Work, Collaborate, Fund, and About.
- [x] **FC-D09 — Atlas view architecture:** retain `/map` as the interactive Map view and make `/map/refined` the traditional List view of the same governed public record set. Treat List view as complete for record coverage, stitch graph-only relations and lenses through explicit handoffs, and keep `/domains` as the broader research architecture route.

## Wave 0 — Govern the new product direction

### FC-001 — Register the Phase 12 vision as a governed launch source

**Priority:** P0  
**Status:** In progress  
**Targets:** `backlog/12_full_circle/product_owner_vision.md`, content build inputs, projection provenance

- [ ] Create a versioned machine-readable binding or equivalent structured record for the vision’s identity, audiences, sections, research programs, offers, maturity labels, calls to action, metadata, and founder copy.
- [ ] Record which fields are product-owner direction versus formal/canonical claims requiring a deeper source.
- [ ] Add source path, version, status, and content hash to generated launch projections.
- [ ] Define a supersession relationship with the Phase 10 public-content master rather than silently overwriting its history.

**Increment note:** `src/content/phase12_launch.binding.json` now governs launch identity, the approved Systems Audit and Chess states, selected homepage work, actions, authority, and a Phase 10 supersession boundary. Full-vision projection coverage and content hashing remain.

**Acceptance:** A reviewer can trace every launch-critical sentence to the Phase 12 vision or an explicitly named canonical source, and generated projections identify that lineage.

### FC-002 — Retire conflicting hard-coded projection policies

**Priority:** P0  
**Status:** In progress  
**Targets:** `scripts/build_public_content.mjs`, projection tests

- [ ] Replace the hard-coded rule to preserve the current homepage hero.
- [ ] Replace or revise the hard-coded rule to preserve the current global navigation pillars.
- [ ] Move policy decisions into a versioned source/binding so later product-owner changes do not require hidden build-script edits.
- [ ] Add checks that prevent two active launch policies from claiming authority over the same hero or navigation slot.

**Acceptance:** `npm run content:check` detects drift, and no generated projection claims the old hero/nav policy after Phase 12 is adopted.

### FC-003 — Resolve the public nomenclature map

**Priority:** P0  
**Status:** In progress  
**Dependencies:** FC-D01, FC-D02, FC-D03

- [x] Map “independent public-interest research and engineering laboratory” to the public identity and keep founder-led scale/stage as a separate operating fact.
- [x] Preserve consequential/public systems, public good, explicit hidden structure, domain breadth, and consequence/governance/repair in the identity schema.
- [ ] Map Schemathematics, Boundary Theory, Distinction Theory, Distinction Space, Contexture, Representational Mechanics, Formal Grammars, and Boundary-First Engineering.
- [x] Map Systems Audit, AI Consequence-Loop Audit, Enterprise Practice, and related engagement language.
- [ ] Record canonical labels, aliases, deprecated labels, route labels, and redirect/search synonyms.

**Acceptance:** Home, Research, Work, About, metadata, and search cannot independently choose conflicting names.

### FC-004 — Build the two-axis claim and maturity crosswalk

**Priority:** P0  
**Status:** Not started  
**Dependencies:** FC-D07

- [ ] Define the epistemic classes: Established, Reformulation, Derived, Computational, Conjecture, Open Question, and Speculative.
- [ ] Define how those classes coexist with Source-stated, Operationally verified, Bounded cases, Breakpoints, promotion stage, and product availability.
- [ ] Add plain-language help for “not proven,” “not verified in operation,” “not yet offered,” and “available with limits.”
- [ ] Define domain-specific requirements for mathematics, physics, software, institutional doctrine, products, and services.
- [ ] Create fixtures and contract tests for valid and invalid combinations.

**Acceptance:** No UI badge conflates epistemic standing, evidence maturity, operational adoption, or market availability.

### FC-005 — Adjudicate launch portfolio status

**Priority:** P0  
**Status:** In progress  
**Dependencies:** FC-D03, FC-D04

- [x] Verify the available fulfillment path for Boundary First Systems Audit.
- [x] Decide the status and relationship of AI Consequence-Loop Audit and Enterprise Practice.
- [x] Verify what “Boundary First Chess — Available / Launching” permits a visitor to buy, read, request, or join now.
- [ ] Bound “AI and Agentic Systems — Available / Developing.”
- [ ] Bound “Mathematical and Research Tooling — Research Prototype.”
- [ ] Record owner/steward, inquiry receiver, support boundary, evidence status, and next action for each promoted item.

**Acceptance:** Every launch portfolio card has a truthful status, a useful next action, and no missing fulfillment or stewardship boundary.

## Wave 1 — Rebuild the launch spine

### FC-010 — Align global identity, metadata, and structured data

**Priority:** P0  
**Status:** In progress  
**Targets:** `src/app/layout.tsx`, `src/app/page.jsx`, route layouts, `src/components/site-footer.tsx`, `src/app/manifest.ts`, `public/og.png` or successor

- [x] Apply the approved Laboratory identity to root description, Organization schema, footer, Open Graph, Twitter, manifest, and homepage metadata.
- [ ] Map the one-sentence, 30-second, meta, and social descriptions to explicit channels.
- [x] Present formation stage as an operating fact where relevant, not as a second public identity.
- [ ] Review the current social card against the new proposition; retain the visual system if only copy needs revision.

**Acceptance:** Search snippets, social previews, structured data, footer, and the visible hero describe the same institution.

### FC-011 — Reframe the homepage hero and primary actions

**Priority:** P0  
**Status:** In progress  
**Targets:** `src/components/entrance/SplashEntranceHome.tsx`, governed home projection, homepage tests

- [x] Use “Make the hidden structure explicit.” as the approved H1.
- [x] Identify BFL as an independent public-interest research and engineering laboratory in the opening descriptor or immediate supporting copy.
- [x] Connect consequential/public systems and public good to the explicit-structure method and consequence/governance/repair center.
- [x] State the operating breadth: software, AI, mathematics, scientific computation, and institutional systems.
- [x] Include the approved “Research the structure / Build the representation / Preserve what matters” line or record its retirement.
- [ ] Expose direct actions for Explore Research, Work With BFL, Collaborate, and Fund the Research.
- [x] Keep Boundary First Chess as a prominent secondary product action with its confirmed maturity visible.
- [ ] Preserve visual distinctiveness and avoid turning the hero into a wall of equal-weight buttons.

**Acceptance:** At desktop and mobile widths, a first-time visitor can identify the institution and reach all four owner-defined actions without first entering the routing instrument.

### FC-012 — Re-sequence the homepage body

**Priority:** P0  
**Status:** In progress

- [ ] Add a concise “Why Boundary First?” section using the owner vision’s lost-representation failure patterns and prior questions.
- [ ] Add “What We Do” with distinct Research, Engineering, and Products cards.
- [ ] Add a compact named-research-program preview.
- [x] Add a curated products/services preview with maturity labels.
- [x] Move People / Problem / Repair below the institutional proposition and operating model while keeping it prominent as an alternate on-ramp.
- [x] Retain social mission, stewardship, world-class responsibility, and claim-evidence context at a depth that supports rather than displaces the launch story.
- [ ] Remove or fold repeated copy that does not change the visitor’s understanding or next action.

**Acceptance:** The homepage follows a comprehensible sequence: identity → why → what → research/work proof → choose an on-ramp → mission/evidence → action.

### FC-013 — Establish an editorial Research overview

**Priority:** P0  
**Status:** In progress; approved offer published, response contract remains  
**Dependencies:** FC-D02, FC-003, FC-004

- [ ] Add `/research` or approve `/domains` as the editorial Research route. Recommended: add `/research` and retain `/domains` as the architecture index.
- [ ] Explain Boundary Theory, the Cut, Distinction Spaces, Schemathematics, Contexture, Representational Mechanics, the Atlas, and proof/verification research in a newcomer sequence.
- [ ] Present current research questions and long-horizon targets with explicit epistemic labels.
- [ ] Link each summary to canonical domain, publication, artifact, evidence, or open-question records.
- [ ] Provide clear continuations to Publications, Domains, Atlas, Collaboration, and Funding.

**Acceptance:** A technically literate newcomer can explain the research program and distinguish its established background, proposed machinery, and open questions without navigating the graph first.

### FC-014 — Repair and orient the Research Domains route

**Priority:** P0  
**Status:** Not started  
**Targets:** `src/app/domains/page.tsx`, `src/components/domain-architecture-tree.tsx`, `src/app/domains/layout.tsx`

- [ ] Add a visible H1 and concise description of what the route represents.
- [ ] State its relationship to Research, Atlas, Relations, and the public record.
- [ ] Preserve stage filtering, search, graph transitions, return context, and current accessible controls.
- [ ] Add a direct path back to the editorial Research overview.

**Acceptance:** The route has a valid heading hierarchy and no longer opens with unexplained filters and architecture.

### FC-015 — Align global navigation and route language

**Priority:** P0  
**Status:** Not started  
**Dependencies:** FC-D08  
**Targets:** `src/lib/site-navigation.ts`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, contextual navigation, sitemap

- [ ] Make Research a legible top-level destination.
- [ ] Decide whether Start remains primary or becomes a secondary orientation action.
- [ ] Keep Learn, Work, Collaborate, Fund, and About reachable without crowding desktop or mobile navigation.
- [ ] Update active-route groupings, labels, contextual navigation, footer groups, and search language.
- [ ] Preserve current route compatibility with one-hop redirects where paths change.

**Acceptance:** Users can predict the difference among Research, Learn, Work, and Start, and all owner-defined actions are reachable in at most one intentional handoff from the global shell.

### FC-016 — Publish one clear current service contract

**Priority:** P0  
**Status:** In progress; approved offer published, response contract remains  
**Dependencies:** FC-D03, FC-D04  
**Targets:** `src/app/work/page.tsx`, `src/app/business/page.tsx`, service records, engagement heroes

- [x] Present the approved Boundary First Systems Audit name and positioning.
- [x] State ideal client/problem, bounded scope, inputs, concrete deliverables, exclusions, evidence/success conditions, and next step.
- [x] Explain any relationship to AI Consequence-Loop Audit and Enterprise Practice.
- [x] Preserve appropriate legal, regulatory, privacy, and operational claim ceilings.
- [x] Repair “Request Consultation” so its destination provides an actual consultation action.
- [ ] Add response expectation and inquiry ownership once approved.

**Acceptance:** A qualified visitor can determine fit and initiate the service without reading the full portfolio or encountering a conversion dead end.

### FC-017 — Create a direct governed funding path

**Priority:** P0  
**Status:** In progress  
**Dependencies:** FC-D05  
**Targets:** new funding route or collaboration state, homepage CTA, navigation/footer, metadata

- [ ] Explain the mixed funding model from the owner vision.
- [ ] Name appropriate funder audiences and what support enables.
- [ ] State that funding does not purchase conclusions, endorsement, authorship, institutional office, or epistemic authority.
- [ ] Make the destination stable, shareable, indexable as appropriate, and accessible without manipulating a local-only tab state.
- [ ] Route the inquiry into the existing collaboration authority and closure framework.

**Acceptance:** “Fund the Research” reaches a specific, honest, and actionable destination whose governance boundary is explicit.

### FC-018 — Establish parallel Atlas Map and List views

**Priority:** P0  
**Status:** Complete  
**Targets:** `src/app/map/page.tsx`, `src/app/map/refined/page.tsx`, Atlas navigation, domain-record return paths

- [x] Replace the sporadic “Refined Atlas” presentation with the stable public label “List view” while retaining the route for compatibility.
- [x] Present all public Atlas domain records as a conventional staged, searchable, non-graph index.
- [x] Add a site-native Map view / List view switch to both projections.
- [x] Preserve selected-node context from Map view to List view and from List view through readable domain records.
- [x] Keep topology, semantic lenses, facets, and relation inspection available through direct Map-view handoffs.
- [x] Place the Record lenses and the complete Work projection at the top of the Atlas Evidence view.
- [x] Make the 142-record Work projection expanded by default and collapsible as one bounded surface, while retaining independently collapsible domain groups.
- [x] Remove the generic relation-index CTA and route public-record links to the Atlas Evidence view.
- [x] Keep Record lenses focused on Work, Evidence, Lineage, Governance, and Collaboration by removing the competing Global, Domains, and Relation map controls from that strip.
- [x] Compact the shared record inventories into a responsive two-column disclosure directory with full-width open groups and denser record cards.
- [x] Add a coverage contract proving that every public graph record appears exactly once in the List view architecture.
- [x] Verify both views at desktop and mobile widths with no horizontal overflow or application console errors.

**Acceptance:** A visitor can choose a spatial or conventional Atlas interface without losing record coverage, selection context, provenance boundaries, or access to graph-specific capabilities. The Evidence filter leads with the bounded Work record projection and preserves direct access to the remaining relation lenses.

### FC-019 — Clarify readable domain-record hierarchy

**Priority:** P0  
**Status:** Complete  
**Targets:** `src/app/domain/[slug]/page.tsx`, domain-record section/navigation components, domain-record navigation contracts

- [x] Lead each readable record with a visible H1, stage context, and concise orientation copy.
- [x] Reduce the sticky on-page bar to section shortcuts by removing the redundant domain breadcrumb/back control and `View in map` action.
- [x] Keep Core Thesis visible as a bounded sticky desktop rail while the visitor moves through the record.
- [x] Use the editorial sequence Overview → Takeaways → Relations → Placement → claim material → evidence material in both the page and shortcut rail.
- [x] Fold the facet inventory into a collapsed disclosure inside Overview so orientation and section navigation precede detailed scope.
- [x] Bound each relation group to a three-record preview with an explicit “show more” disclosure, remove repeated relation framing, and keep one unique `#relationships` target.
- [x] Preserve established hash compatibility, including `#relationships`, while presenting the clearer public label “Relations.”
- [x] Replace the clipped narrow-screen shortcut rail with a compact mobile section picker; allow desktop/tablet shortcuts to wrap without hidden overflow, expose the active section, and retain 44 px minimum targets.
- [x] Open hash-target disclosures and their ancestors before scrolling, then align direct and cold-load deep links below the sticky shell.
- [x] Use semantic section headings and shared disclosure behavior throughout the record while retaining a single page H1.
- [x] Cover optional-section ordering and nested-anchor resolution with focused navigation contracts and verify desktop/mobile rendering without application console errors.

**Acceptance:** A readable domain record leads with identity and interpretation, keeps its thesis available as orientation, moves through bounded relation and placement context, and only then reaches claims and evidence. Navigation remains active, unclipped, semantically legible, and correctly aligned for direct links at desktop and mobile widths without duplicating map controls.

## Wave 2 — Represent the full product-owner vision

### FC-020 — Create or update canonical foundational research records

**Priority:** P1  
**Status:** Not started  
**Dependencies:** FC-D02, FC-003, FC-004

- [ ] Establish the approved public record for Schemathematics.
- [ ] Establish the Cut and its relationship to Distinction, Boundary Theory, and topology.
- [ ] Review Distinction Space, Contexture, category-theory interpretation, Representational Mechanics, and Atlas language against canonical research sources.
- [ ] Create or update proof/verification architecture and research-question records.
- [ ] Add assumptions, source lineage, claim class, maturity, limitations, and supersession paths.

**Acceptance:** The website projection does not rely on `product_owner_vision.md` alone as the formal authority for mathematical definitions or research claims.

### FC-021 — Curate Products and Services

**Priority:** P1  
**Status:** In progress  
**Dependencies:** FC-005

- [x] Create a concise Products and Services section or route organized by available, launching, developing, and research prototype.
- [ ] Promote Systems Audit, Chess, AI and Agentic Systems, and Mathematical and Research Tooling using approved status records.
- [x] Keep the complete work graph accessible as the governed inventory.
- [x] Add direct next actions appropriate to each maturity state: engage, purchase/read, collaborate/test, follow research, or inspect evidence.

**Acceptance:** Visitors do not have to infer market availability from internal work types, portfolio placement, or research-stage terminology.

### FC-022 — Promote Boundary First Chess honestly

**Priority:** P1  
**Status:** Implemented for the approved current scope  
**Dependencies:** FC-D04

- [x] Separate manuscript/publication, instruction, training material, software, and future-product claims.
- [x] Publish the exact current availability and launch action.
- [x] Explain Chess as both a standalone product and a bounded demonstration of Boundary First reasoning.
- [x] Preserve the distinction between an accessible testbed and evidence that the method transports universally.

**Acceptance:** A visitor can tell what exists now, what can be requested, and what remains future work.

### FC-023 — Create the AI and Agentic Systems summary

**Priority:** P1  
**Status:** Not started

- [ ] Summarize permission boundaries, escalation, provenance, human responsibility, containment, recoverability, delegated authority, consequence tracking, and multi-agent workflows.
- [ ] Separate research, governance method, engineering service, and product/tooling claims.
- [ ] Link to current artifacts, Work, Systems Audit/AI audit as appropriate, and collaboration.
- [ ] Use the approved “lawful, observable agency with explicit consequence paths” language with a visible claim boundary.

**Acceptance:** The public route distinguishes what BFL researches, advises on, builds, and currently offers.

### FC-024 — Create the Mathematical and Research Tooling summary

**Priority:** P1  
**Status:** Not started

- [ ] Curate Schemathematics tooling, Contexture representations, proof checking, claim ledgers, deployment tooling, visualization, and representational comparison.
- [ ] Identify which items have runnable artifacts, internal prototypes, public demos, or only research specifications.
- [ ] Link each item to evidence or explicitly mark the evidence gap.

**Acceptance:** “Research Prototype” is informative rather than promotional shorthand.

### FC-025 — Add the approved founder narrative

**Priority:** P1  
**Status:** In progress  
**Dependencies:** FC-D06  
**Targets:** `src/app/about/page.jsx` or a dedicated founder route, metadata, canonical institutional record

- [ ] Add approved education, cross-domain engineering history, institutional-knowledge failure pattern, independent research arc, role of AI, and third-company progression.
- [ ] Distinguish biographical fact, founder interpretation, and institutional proposition.
- [ ] Link the narrative to the research and engineering program without treating biography as validation.
- [ ] Retain formation-stage and governance disclosures.

**Acceptance:** The founder story explains the origin and continuity of the lab while preserving claim discipline.

### FC-026 — Surface the institutional philosophy and Oathbound principle

**Priority:** P1  
**Status:** Not started

- [ ] Map the owner vision’s institutional philosophy, Oathbound passage, and core principles to About, Mission, or Governance without duplicating all prose on every page.
- [ ] Preserve “agency” and “consequence” as a coupled principle.
- [ ] Provide a concise public version and a deeper inspectable version.

**Acceptance:** The ethical program is recognizable and actionable without eclipsing the lab’s research and engineering identity.

## Wave 3 — Simplify, verify, and learn

### FC-030 — Create a public content disposition register

**Priority:** P1  
**Status:** Not started

- [ ] Inventory each launch route and major section.
- [ ] Assign retain, promote, fold, defer, archive, or replace.
- [ ] Record represented object, audience, unique purpose, source, claim boundary, owner, and next action.
- [ ] Prioritize Home, Work, About, Publications, Collaboration, and overlapping institutional content.

**Acceptance:** Content is reduced or moved because its role is understood, not merely because a page is long.

### FC-031 — Create a curated Work landing layer

**Priority:** P1  
**Status:** In progress  
**Targets:** `src/app/work/page.tsx`, `src/components/public-interface/WorkProjectionGroups.tsx`, work projection

- [x] Lead with current offer, promoted products, selected public work, and evidence posture.
- [ ] Move the full promotion ladder and governed inventory behind clear progressive disclosure or subordinate routes.
- [x] Preserve access to every canonical work object and its provenance.
- [x] Ensure availability and maturity can be scanned before inventory detail.

**Acceptance:** A newcomer can find the current service and top public work quickly; a researcher or auditor can still inspect the complete register.

### FC-032 — Make funding and collaboration modes deep-linkable

**Priority:** P2  
**Status:** Not started  
**Targets:** `src/app/collaborate/page.tsx`, route/state tests

- [ ] Encode the selected collaboration mode in a stable URL or anchor.
- [ ] Restore the selected mode on reload and browser navigation.
- [ ] Give each mode a meaningful heading target and canonical sharing rule.
- [ ] Preserve keyboard tab behavior and avoid duplicating canonical content for each state.

**Acceptance:** A link to Funding, Research & Formalization, or another mode opens that exact state and remains accessible.

### FC-033 — Improve conversion contracts

**Priority:** P1  
**Status:** Not started

- [ ] Decide whether mailto remains the primary contact mechanism or a bounded form is needed.
- [ ] Record receiver/owner, expected response window, required information, privacy, retention, and decline/closure behavior.
- [ ] Use action-specific subjects or form types for service, research collaboration, product, and funding inquiries.
- [ ] Test the complete action, not only the presence of a link.

**Acceptance:** Each CTA has an accountable receiving path and a defined end state.

### FC-034 — Add content-contract and route tests

**Priority:** P1  
**Status:** In progress

- [ ] Test the canonical hero, descriptor, field breadth, and four primary actions.
- [ ] Test the Research overview’s required program names and claim labels.
- [x] Test every promoted portfolio item’s action contract and prevent supporting work from being silently promoted to Available.
- [ ] Test global metadata and structured data identity.
- [ ] Test `/domains` heading/orientation and Research return path.
- [ ] Test service consultation, funding, collaboration-mode, hash-target, and mail/form actions.
- [ ] Test that generated projection provenance references the Phase 12 source.

**Acceptance:** A future content or code change cannot silently restore the previous launch spine or drop a required owner action.

### FC-035 — Run responsive and accessibility verification

**Priority:** P1  
**Status:** In progress

- [ ] Review 390, 768, 1024, and 1440 px layouts.
- [ ] Verify keyboard, screen-reader sequence, reduced motion, touch, and 200% zoom.
- [ ] Validate heading hierarchy, landmark names, focus restoration, tab state, and visible focus.
- [ ] Confirm that primary action priority survives wrapping and mobile menus.

**Increment note:** Home, Work, and Business passed production-browser review at 390 × 844 and 1440 × 900 with zero horizontal overflow, duplicate IDs, or console errors. The 768/1024, keyboard, reduced-motion, touch, and 200% zoom passes remain.

**Acceptance:** The refined narrative and actions remain equivalent across input modes and viewport sizes.

### FC-036 — Run release verification

**Priority:** P0  
**Status:** In progress; changed-route release pass complete

- [x] `npm run content:check`
- [x] `npm run graph:check`
- [x] `npm run graph:test`
- [ ] `npm run test:ui -- --run`
- [x] `npm run lint`
- [x] `npm run build`
- [ ] Crawl sitemap and canonical routes.
- [ ] Check internal links, redirects, hash targets, metadata, and structured data.
- [x] Run desktop and mobile browser passes with zero application console errors for Home, Work, and Business.

**Verification note:** Phase 12 contract tests pass 3/3. The full UI suite passes 116/117; the remaining unrelated CYOA route-model test expects the empty route to resolve to `hub`, while current implementation resolves `problem`. Lint has 0 errors and 2 existing warnings in prior Playwright helper files. The production build completes all 135 routes.

**Acceptance:** All required checks pass from the exact release checkout, with any environment-only warning separated from application defects.

### FC-037 — Run newcomer comprehension tests

**Priority:** P2  
**Status:** Not started

- [ ] Ask a newcomer to explain what BFL is after the homepage hero.
- [ ] Ask them to name one research program and its maturity.
- [ ] Ask them to find the current service and explain its deliverables.
- [ ] Ask them to distinguish available, developing, prototype, conjectural, and open work.
- [ ] Ask them to reach Research, Collaboration, and Funding without coaching.
- [ ] Capture hesitation, label confusion, repeated copy, and abandoned paths.

**Acceptance:** At least the owner-defined core tasks can be completed without prior explanation; remaining failures create specific follow-up tasks.

### FC-038 — Add privacy-respecting journey evidence

**Priority:** P2  
**Status:** Not started

- [ ] Define events for primary CTA selection, research continuation, service inquiry, collaboration, funding, product action, and route switching.
- [ ] Document data minimization, retention, consent, and non-classification boundaries before implementation.
- [ ] Measure useful arrival and completed intent rather than raw page count.

**Acceptance:** Product decisions can use observed comprehension and route completion without creating an unnecessary visitor profile.

## P3 later work

- [ ] **FC-050 — Final brand mark and motion adjudication:** replace or approve the current CSS mark and verify static/reduced-motion equivalence.
- [ ] **FC-051 — Rich research visualizations:** add diagrams for the Cut, Distinction Space, Contexture, Representational Mechanics, and Atlas only after the formal records stabilize.
- [ ] **FC-052 — Publication and paper release system:** connect research questions and claim classes to versioned papers, proof artifacts, computations, and trusted checkers.
- [ ] **FC-053 — Product-specific funnels:** create dedicated product flows only when availability, fulfillment, support, maintenance, and retirement are recorded.
- [ ] **FC-054 — Public challenge and correction integration:** make correction/supersession status visible from every promoted research or product object.

## Recommended execution order

```text
FC-001 / FC-002
        ↓
FC-D01–D08 + FC-003 / FC-004 / FC-005
        ↓
FC-010 / FC-011 / FC-012 / FC-015
        ↓
FC-013 / FC-014 / FC-016 / FC-017
        ↓
FC-020–FC-026 + FC-030 / FC-031 / FC-033
        ↓
FC-034 / FC-035 / FC-036 / FC-037
        ↓
FC-038 and evidence-led follow-up
```

## Phase completion boundary

Close Phase 12 when:

- the owner-approved Laboratory identity governs the complete public shell without a competing institutional label;
- the foundational research program and open questions are discoverable and claim-bounded;
- one current service and each promoted product have truthful availability and fulfillment paths;
- Research, Work, Collaboration, and Funding are direct, working actions;
- founder and institutional narratives are approved and properly bounded;
- the full acceptance checklist passes;
- automated checks and responsive browser verification pass from the release checkout;
- newcomer testing shows that the launch spine is understandable without coaching.
