# Institutional component architecture

The institutional surface separates **content**, **composition**, and **presentation**.

## Component layers

- **InstitutionalChrome.tsx** — shared header/footer only.
- **InstitutionalPageShell.tsx** — owns the page wrapper, shared chrome, and semantic `<main>`.
- **InstitutionalPrimitives.tsx** — stable structural grammar:
  - route hero
  - section header
  - section lead
- **content/*.ts** — declarative route content models and repeated source-governed data.
- **Institutional*Page.tsx** — route-specific composition and domain semantics.
- **styles/** — layered CSS architecture documented separately.

## Extension contract

A new institutional route should:

1. define repeated/static route data in `content/<route>.ts`;
2. compose the page with `InstitutionalPageShell`;
3. use shared primitives where the DOM grammar is genuinely shared;
4. keep domain-specific cards and semantics in the route renderer;
5. use `formatOrdinal` instead of reimplementing display indexing;
6. compose Foundation + RouteShared + one route CSS module;
7. avoid direct ownership of global header/footer markup.

Do not create a universal schema-driven page renderer. Shared structure belongs in primitives; domain meaning stays local.

## Dead-code rule

Once a route has a real page renderer, do not keep a second preview/front-door renderer or duplicate route copy in the navigation registry. One route has one composition authority.


## Section composition

Large route-local interaction surfaces should be extracted when they have their own internal grammar. The first reference is `sections/ResearchContextSection.tsx`: the Research page owns ordering, while the section owns its contextual Reflow Field, card summaries, and expanded detail composition.


The Products route follows the same boundary with `sections/ProductContextSection.tsx`: primary product objects remain directly readable, while Why Products Matter and the supporting Research-to-Market through Public Product Object sequence are compressed into a six-object focus-stage Reflow field.


The Projects route follows the same section boundary with `sections/ProjectContextSection.tsx`: featured project objects remain directly readable, while Transfer Evidence, Project-Page Grammar, Status Rule, Permanent Firewall, and Capability Transfer are compressed into a focus-stage Reflow field.


The Apparatus route uses `sections/ApparatusContextSection.tsx`: the Instrument Bench remains directly readable as the substantive apparatus surface, while every supporting Apparatus section is compressed into a nine-object focus-stage Reflow field.


The Publications route currently uses `sections/PublicationContextSection.tsx` as a temporary whole-body context scaffold because no genuine publication-object catalog is directly rendered yet. All existing publication discipline/page-grammar sections live in an eleven-object focus-stage Reflow field. Future publication objects belong directly on the route above this context section, following the same substantive-object / contextual-machinery split used elsewhere.


The Publications route now has a separate `sections/PublicationCatalogSection.tsx` substantive surface above its context field. Its initial records are explicit UI stubs used only to design the catalog grammar; they claim no publication date, DOI, review state, release state, or scientific authority. Replace those stubs with source-governed publication records when canonical documents are ingested.


Institutional navigation distinguishes global routes from contextual child routes. Child pages are not repeated in the top-level header navigation; parent routes expose them through the shared lower-right hero child-page rail. The footer deliberately exposes stable child destinations directly alongside the global routes. Apparatus is reachable as a child of both Research and Open Lab while retaining its canonical `/v3/apparatus` route. Funding is reachable as a child of About, Research, and Open Lab while retaining its canonical `/v3/funding` route. Founder is a child of About at `/v3/founder`. Collaboration is reachable from About, Research, Products, Projects, and Open Lab at `/v3/collaboration`. Applied Work is reachable from About, Products, Projects, Funding, and Collaboration at `/v3/applied-work`. Evidence is reachable from About, Products, Projects, Funding, Applied Work, and Founder at `/v3/evidence`. Funding, Applied Work, Evidence, Apparatus, Collaboration, and Founder are also direct footer destinations.


The Open Lab route uses `sections/OpenLabContextSection.tsx`: Intake Status is promoted into the hero, Public Participation and the Institutional Promise remain directly readable, and Agency, Stewardship, Shared Infrastructure, Humanist Interface, and Capability Transfer are compressed into a five-object focus-stage Reflow field.


The About route now treats its three narrative chapters as three independent focus-stage Reflow fields in `sections/AboutReflowGroups.tsx`: Representation + Method (5 objects), Agency + Stewardship (3 objects), and Institutional Practice (4 objects). Visually, each chapter owns the dominant outer plate and its Reflow objects sit on an inset work surface inside it, so the page reads as three chapter cards containing subordinate cards rather than one wall of peers. The closing “Lab in one sentence” synthesis remains directly readable outside the fields.


The Funding route is a contextual child route at `/v3/funding`. It is intentionally absent from the global header navigation, is exposed through the About, Research, and Open Lab hero child-page rails, and is also directly available from the footer. Funding owns one coherent public narrative: existing capacity -> bounded conversion -> inspectable evidence -> external contact -> renewed capacity.

The public Funding route does not duplicate internal target lists or financing operations. It projects the canonical funding doctrine into an institutional explanation of what support makes possible, which channels fit different kinds of work, how a funder can evaluate a bounded program, and why capital state must remain orthogonal to epistemic state.


The Founder route is an About child rather than a global header route. It presents Nicholas T. Smith as computer scientist, systems engineer, founder-builder, and independent researcher; traces the professional/research formation of the Boundary First method; and explicitly states the institutional boundary that founder history is provenance, not validation. The Lab's work must remain independently criticizable and transferable beyond the founder.


The Collaboration route is the public relationship front door rather than a generic partnership pitch. It projects the canonical comparative-advantage doctrine, multiple bounded relationship forms, and the existing named collaboration/outreach landscape into one governed surface. The named map explicitly distinguishes readiness/dependency states and states that inclusion does not imply contact, partnership, endorsement, agreement, or current fit. This lets the site carry a large and evolving set of institutions, businesses, researchers, creators, funders, critics, and public-interest organizations without flattening them into one undifferentiated logo wall.


The Collaboration page's public copy intentionally translates internal operating language into ordinary business language. Internal concepts such as bounded engagement, evidence gates, routing state, provenance, and comparative advantage remain preserved in the underlying doctrine, while the public surface answers simpler visitor questions: what BFL already has, what another party might bring, what the first step could be, what useful outcomes can result, and what must stay clear around ownership, evidence, endorsement, and exit.


The Applied Work route is the commercial front door. It deliberately avoids requiring visitors to understand or adopt Boundary First theory before they can evaluate a service. The page groups offer-ready work into three visible service families—software and systems; AI and operational governance; research and institutional infrastructure—with concrete inner engagement shapes. It also discloses the present commercialization boundary: the offers descend from substantial professional practice and are packaged enough to scope, while BFL-native external client evidence and repeat service revenue are still being built. Public pricing is deferred until the problem, scope, and deliverable are bounded.


The Evidence route is the institutional proof boundary rather than a brag sheet. It separates externally corroborated records, founder professional provenance, BFL-native inspectable artifacts, and evidence that remains to be earned. The strongest historical public example is CityWatch, where the recovered Augusta–Richmond County IT annual-report record and GMIS International award record support the existence and institutional recognition of the civic project. The route explicitly prevents adjacent evidence from being promoted beyond its scope: prior career is not BFL traction, institutional awards are not automatically personal awards, artifacts do not prove claims, prototypes do not prove market fit, named targets do not imply affiliation, and funding does not confer truth.
