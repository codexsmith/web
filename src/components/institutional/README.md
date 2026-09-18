# Institutional component architecture

The institutional surface separates **content**, **composition**, and **presentation**.

## Component layers

- **InstitutionalChrome.tsx** — shared header/footer only.
- **InstitutionalPageShell.tsx** — owns the page wrapper, shared chrome, and semantic `<main>`.
- **LabSnapshotRow.tsx** — reusable compact observational-metrics row; receives data by props and owns no Lab authority or fetching.
- **LabObjectIdentity.tsx** — shared object-kind / source-identifier / source-state grammar used across products, research, projects, publications, and later evidence-bearing objects.
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

### Lab object identity contract

`LabObjectIdentity` standardizes presentation, not authority. It may render an object kind, a source-provided identifier or local code, a source-reported status/state, and one secondary classification. It must not fabricate a canonical ID, translate native lifecycle states into a universal maturity score, or promote an object because it appears on a public route. Registered IDs remain IDs; local codes remain codes; unadmitted identities remain unadmitted.

## Dead-code rule

Once a route has a real page renderer, do not keep a second preview/front-door renderer or duplicate route copy in the navigation registry. One route has one composition authority.


## Section composition

Large route-local interaction surfaces should be extracted when they have their own internal grammar. The first reference is `sections/ResearchContextSection.tsx`: the Research page owns ordering, while the section owns its contextual Reflow Field, card summaries, and expanded detail composition.


The Products route follows the same boundary with `sections/ProductContextSection.tsx`: primary product objects remain directly readable, while Why Products Matter and the supporting Research-to-Market through Public Product Object sequence are compressed into a six-object focus-stage Reflow field.


The Projects route follows the same section boundary with `sections/ProjectContextSection.tsx`: featured project objects remain directly readable, while Transfer Evidence, Project-Page Grammar, Status Rule, Permanent Firewall, and Capability Transfer are compressed into a focus-stage Reflow field.


The Apparatus route uses `sections/ApparatusContextSection.tsx`: the Instrument Bench remains directly readable as the substantive apparatus surface, while every supporting Apparatus section is compressed into a nine-object focus-stage Reflow field.


The Publications route currently uses `sections/PublicationContextSection.tsx` as a temporary whole-body context scaffold because no genuine publication-object catalog is directly rendered yet. All existing publication discipline/page-grammar sections live in an eleven-object focus-stage Reflow field. Future publication objects belong directly on the route above this context section, following the same substantive-object / contextual-machinery split used elsewhere.


The Publications route now has a separate `sections/PublicationCatalogSection.tsx` substantive surface above its context field. Its initial records are explicit UI stubs used only to design the catalog grammar; they claim no publication date, DOI, review state, release state, or scientific authority. Replace those stubs with source-governed publication records when canonical documents are ingested.


Institutional navigation distinguishes global routes from contextual child routes. Child pages are not repeated in the top-level header navigation; parent routes expose them through the shared lower-right hero child-page rail. The footer deliberately exposes stable child destinations directly alongside the global routes. Apparatus is reachable as a child of both Research and Open Lab while retaining its canonical `/v3/apparatus` route. Funding is reachable as a child of About, Research, and Open Lab while retaining its canonical `/v3/funding` route. Founder is a child of About at `/v3/founder`. Collaboration is reachable from About, Research, Products, Projects, and Open Lab at `/v3/collaboration`. Applied Work is reachable from About, Products, Projects, Funding, and Collaboration at `/v3/applied-work`. Evidence is reachable from About, Products, Projects, Funding, Applied Work, and Founder at `/v3/evidence`. Now / Roadmap is reachable from About, Research, Projects, Funding, Evidence, and Open Lab at `/v3/now`. Funding, Applied Work, Evidence, Now, Apparatus, Collaboration, Founder, and Contact are also direct footer destinations.


The Open Lab route uses `sections/OpenLabContextSection.tsx`: Intake Status is promoted into the hero, Public Participation and the Institutional Promise remain directly readable, and Agency, Stewardship, Shared Infrastructure, Humanist Interface, and Capability Transfer are compressed into a five-object focus-stage Reflow field.


The About route now treats its three narrative chapters as three independent focus-stage Reflow fields in `sections/AboutReflowGroups.tsx`: Representation + Method (5 objects), Agency + Stewardship (3 objects), and Institutional Practice (4 objects). Visually, each chapter owns the dominant outer plate and its Reflow objects sit on an inset work surface inside it, so the page reads as three chapter cards containing subordinate cards rather than one wall of peers. The closing “Lab in one sentence” synthesis remains directly readable outside the fields.


The Funding route is a contextual child route at `/v3/funding`. It is intentionally absent from the global header navigation, is exposed through the About, Research, and Open Lab hero child-page rails, and is also directly available from the footer. Funding owns one coherent public narrative: existing capacity -> bounded conversion -> inspectable evidence -> external contact -> renewed capacity.

The public Funding route does not duplicate internal target lists or financing operations. It projects the canonical funding doctrine into an institutional explanation of what support makes possible, which channels fit different kinds of work, how a funder can evaluate a bounded program, and why capital state must remain orthogonal to epistemic state.


The Founder route is an About child rather than a global header route. It presents Nicholas T. Smith as computer scientist, systems engineer, founder-builder, and independent researcher; traces the professional/research formation of the Boundary First method; and explicitly states the institutional boundary that founder history is provenance, not validation. The Lab's work must remain independently criticizable and transferable beyond the founder.


The Collaboration route is the public relationship front door rather than a generic partnership pitch. It projects the canonical comparative-advantage doctrine, multiple bounded relationship forms, and the existing named collaboration/outreach landscape into one governed surface. The named map explicitly distinguishes readiness/dependency states and states that inclusion does not imply contact, partnership, endorsement, agreement, or current fit. This lets the site carry a large and evolving set of institutions, businesses, researchers, creators, funders, critics, and public-interest organizations without flattening them into one undifferentiated logo wall.


The Collaboration page's public copy intentionally translates internal operating language into ordinary business language. Internal concepts such as bounded engagement, evidence gates, routing state, provenance, and comparative advantage remain preserved in the underlying doctrine, while the public surface answers simpler visitor questions: what BFL already has, what another party might bring, what the first step could be, what useful outcomes can result, and what must stay clear around ownership, evidence, endorsement, and exit.


The Applied Work route is the commercial front door. It deliberately avoids requiring visitors to understand or adopt Boundary First theory before they can evaluate a service. The page groups offer-ready work into three visible service families—software and systems; AI and operational governance; research and institutional infrastructure—with concrete inner engagement shapes. It also discloses the present commercialization boundary: the offers descend from substantial professional practice and are packaged enough to scope, while BFL-native external client evidence and repeat service revenue are still being built. Public pricing is deferred until the problem, scope, and deliverable are bounded.


The Evidence route is the institutional proof boundary rather than a brag sheet. It separates externally corroborated records, founder professional provenance, BFL-native inspectable artifacts, and evidence that remains to be earned. The strongest historical public example is CityWatch, where the recovered Augusta–Richmond County IT annual-report record and GMIS International award record support the existence and institutional recognition of the civic project. The route explicitly prevents adjacent evidence from being promoted beyond its scope: prior career is not BFL traction, institutional awards are not automatically personal awards, artifacts do not prove claims, prototypes do not prove market fit, named targets do not imply affiliation, and funding does not confer truth.


The Now / Roadmap route is a dated public projection of the canonical active work queue and major program roadmaps, not a second operational backlog or a promise calendar. It compresses current work into six public priority lanes with explicit closure conditions, then separates NOW / NEXT / LATER so later institutional scale remains dependent on evidence earned earlier. The page also makes roadmap mutability explicit: negative results, external criticism, dependencies, finite capacity, funding, and transfer opportunities can change sequence or scope without changing claim standards.


The Contact route at `/v3/contact` is the contextual inquiry boundary. It is deliberately a direct footer destination rather than another top-level header route or another hero-card dependency on every page. Applied Work, Collaboration, Funding, Open Lab, and Now link into Contact with typed query context so the reason for contact survives navigation. The form is intentionally small: name, email, optional affiliation, inquiry type, optional desired outcome, and message.

Contact submission is server-mediated through `/api/inquiry`. The public form is enabled only when the server-only `BFL_INQUIRY_WEBHOOK_URL` is configured; an optional `BFL_INQUIRY_WEBHOOK_TOKEN` can authenticate the receiver. If no receiver exists, the UI remains visibly disabled so the site cannot appear to accept and then lose messages. The API validates field length and type, preserves source context, uses a honeypot and lightweight per-process rate limiting, and forwards no requester IP or browser fingerprint to the receiver. Formal Open Lab submission remains separate and closed until its stronger privacy, consent, retention, moderation, and stewardship controls are ready.


Product detail pages use a separate immersive grammar from institutional child routes. The reusable boundary is `products/ProductExperienceShell.tsx` plus `ProductExperience.module.css`: shared institutional chrome, full-bleed product hero, product-status boundary, action rail, and sticky local product navigation. Each product supplies its own visual world and interaction rather than inheriting a generic card-heavy route body.

Boundary-First Chess is the first implementation at `/v3/products/boundary-first-chess`. Its hero instrument is an interactive illustrative chessboard with Create / Repair / Weaken / Exploit / Transform lenses. The page then projects the field-guide product object, explainable-analyzer authority layers, evidence gates, claim firewall, and release path. The board is explicitly a teaching map rather than engine evaluation, and the public page preserves the current research-product claim ceiling.


Boundary First Weather is the second immersive product implementation at `/v3/products/boundary-first-weather`. It reuses the product experience shell while projecting a distinct computational-weather visual system: an interactive Flow / Boundary / Defect / Refine / Compare simulation-field instrument, a visible split between established weather science and the experimental Boundary First layer, the W0-W5 claim ladder, matched-baseline refinement machinery, a bounded historical-event pilot surface, collaboration/evaluation measures, and an explicit claim firewall. The page projects the existing canonical `boundary-first-weather.json` research record rather than inventing a second Weather truth source.

The v3 homepage now treats Boundary First Weather as Featured Work 04, replacing Public Infrastructure Analysis in that four-item surface. Featured items may carry direct `href` targets so existing immersive product pages can be entered from the homepage without forcing every featured work item to have a dedicated page.


YouTube Knowledge Explorer is the third immersive product implementation at `/v3/products/youtube-knowledge-explorer`. Its public name intentionally omits the older Projectr label for now; this is a website naming decision, not a silent rewrite of the Lab's existing internal product IDs or implementation repository history. The page projects the active executable vertical slice into a source-first product story: synthetic source navigation in the hero, timestamped transcript evidence, deterministic outlines, concept-linked search, evidence-bound answering, insufficient-evidence handling, browser-local persistence, portable interchange, and a stack-independent core architecture.

The homepage and Products index use **YouTube Knowledge Explorer** as the public product name and link directly to the immersive page. Internal implementation and registry surfaces can retain their existing historical identifiers until a separate canonical product-identity migration is intentionally performed.


Agentic Scientific Method is the fourth immersive product implementation at `/v3/products/agentic-scientific-method`. It projects the canonical ASM operational suite as an inspectable inquiry machine rather than a static method explainer: the hero exposes controlled phase transitions and durable artifacts; the body separates represented and observed state spaces, localizes defects before repair, separates agent capability from promotion authority, makes durable scientific memory visible, presents the self-hosting run, and closes on the L0-L6 validation ladder plus the current claim firewall.

The v3 homepage now links Featured Work 03 directly to the ASM product page. The Products route also exposes a distinct Research Products rail for Boundary First Weather and Agentic Scientific Method so research-bounded products remain discoverable without being misclassified as the near-term B2C commercialization edge.


The homepage now includes a **Lab in Motion** institutional access layer between Featured Work and Working Posture. It treats the homepage as more than a descriptive front page: a large Now / Roadmap control surface exposes the current operating cycle and priority lanes, while Applied Work, Collaboration, and Funding are presented as distinct ways an outside person or institution can enter the work. This keeps the top navigation focused on what the Lab is while giving the newer operational child pages meaningful homepage prominence without promoting them into the global header.


The Lab Atlas route at `/v3/atlas` is a bounded public relationship projection across existing source-governed objects. Its first boundary includes research programs, immersive products, project cases, and selected publication records. Atlas-local routing IDs exist only to connect the public projection and are never rendered as canonical Lab identities. Every visible edge is declared explicitly in `content/atlas.ts`; the Atlas must not infer equivalence, dependency, validation, or authority from title similarity, shared vocabulary, or visual proximity. Missing edges remain missing until an authoritative public relationship is deliberately admitted.
