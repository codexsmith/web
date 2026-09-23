import fs from "node:fs";

const root = "src/components/institutional";
const read = (path) => fs.readFileSync(path, "utf8");
const expect = (condition, message) => {
  if (!condition) throw new Error(`Institutional component architecture failed: ${message}`);
};

for (const required of [
  "InstitutionalChrome.tsx",
  "InstitutionalPageShell.tsx",
  "InstitutionalPrimitives.tsx",
  "LabObjectIdentity.tsx",
  "LabCommandPalette.tsx",
  "institutionalFormat.ts",
]) {
  expect(fs.existsSync(`${root}/${required}`), `missing shared component ${required}`);
}

const chrome = read(`${root}/InstitutionalChrome.tsx`);
const primitives = read(`${root}/InstitutionalPrimitives.tsx`);
const labObjectIdentity = read(`${root}/LabObjectIdentity.tsx`);
const commandPalette = read(`${root}/LabCommandPalette.tsx`);
const commandPaletteContent = read(`${root}/content/commandPalette.ts`);
const homePage = read(`${root}/InstitutionalHomePage.tsx`);
const homeContent = read(`${root}/content/home.ts`);

expect(chrome.startsWith('"use client";'), "Institutional chrome must own route/scroll interaction as a client boundary");
expect(chrome.includes("usePathname"), "Institutional header must derive active navigation from the current route");
expect(chrome.includes("IntersectionObserver"), "Institutional header must observe the route hero before compacting the brand");
expect(chrome.includes('data-header-compact={heroPassed ? "true" : "false"}'), "Institutional header must expose compact state to CSS");
expect(chrome.includes('aria-current={active ? "page" : undefined}'), "Institutional navigation must expose current-page semantics");
expect(chrome.includes("<LabCommandPalette />"), "Institutional header must mount global Lab command navigation");
expect(!chrome.includes('href="/v3/start"'), "Institutional header must not duplicate the homepage audience traversal entry");
expect(!chrome.includes("Start here"), "Institutional header must not render the retired Start here control");
expect(commandPalette.includes('title="Search Lab (⌘/Ctrl K)"'), "Lab search trigger must preserve a discoverable shortcut tooltip");
expect(!commandPalette.includes("<span>Search Lab</span>"), "Lab search trigger must remain icon-only");
expect(!commandPalette.includes("<kbd>⌘/Ctrl K</kbd>"), "Lab search trigger must not render shortcut chrome in the header");
expect(!chrome.includes("Start here"), "Retired Start here utility must stay out of the institutional header");
expect(commandPalette.startsWith('"use client";'), "Lab command palette must own its bounded browser interaction");
expect(commandPalette.includes("event.metaKey || event.ctrlKey"), "Lab command palette must support Command/Ctrl-K");
expect(commandPalette.includes("dialog.showModal()"), "Lab command palette must use a modal dialog boundary");
expect(commandPalette.includes('role="listbox"'), "Lab command palette must expose keyboard-search result semantics");
expect(commandPaletteContent.includes("atlasNodes"), "Lab command search must derive object entries from the public Atlas");
expect(commandPaletteContent.includes("atlasEdges"), "Lab command search must include only explicit Atlas relationship data");
expect(commandPaletteContent.includes('/atlas?focus='), "Lab object search results must deep-link to the canonical Atlas focus state");
expect(primitives.includes("data-institutional-hero"), "Shared route heroes must identify themselves to the sticky header");
expect(labObjectIdentity.includes("data-kind={kind}"), "LabObjectIdentity must expose object-kind semantics to presentation");
expect(labObjectIdentity.includes("identifierLabel = \"ID\""), "LabObjectIdentity must distinguish source identifiers from local codes");
expect(labObjectIdentity.includes("statusLabel = \"STATUS\""), "LabObjectIdentity must preserve source-native status labeling");
expect(homePage.includes("data-institutional-hero"), "Homepage hero must identify itself to the sticky header");
expect(homeContent.includes('title: "Boundary First Weather"'), "Featured work slot four must be Boundary First Weather");
expect(homeContent.includes('href: "/products/boundary-first-weather"'), "Featured Boundary First Weather must link to its immersive product page");
expect(homeContent.includes('href: "/products/agentic-scientific-method"'), "Featured Agentic Scientific Method must link to its immersive product page");
expect(homeContent.includes('title: "YouTube Knowledge Explorer"'), "Featured work must use the YouTube Knowledge Explorer public name");
expect(homeContent.includes('href: "/products/youtube-knowledge-explorer"'), "Featured YouTube Knowledge Explorer must link to its immersive product page");
expect(!homeContent.includes("Projectr"), "v3 homepage public naming must not expose Projectr");
expect(!homeContent.includes('title: "Public Infrastructure Analysis"'), "Public Infrastructure Analysis must no longer occupy featured work slot four");
expect(homePage.includes("item.href ?"), "Homepage featured work must support direct product entry links");
expect(homePage.includes("styles.inMotionSection"), "Homepage must expose the Lab in Motion institutional access layer");
expect(homeContent.includes("homeNowSnapshot"), "Homepage content must expose a current Now / Roadmap snapshot");
expect(homeContent.includes('href: "/now"'), "Homepage Now snapshot must link to the public roadmap");
expect(homeContent.includes('href: "/applied-work"'), "Homepage must expose Applied Work as an institutional front door");
expect(homeContent.includes('href: "/collaboration"'), "Homepage must expose Collaboration as an institutional front door");
expect(homeContent.includes('href: "/funding"'), "Homepage must expose Funding as an institutional front door");
expect(homeContent.includes("Externalize → test → repair → repeat → transfer."), "Homepage Now snapshot must preserve the current operating thesis");
expect(homePage.includes("homeInstitutionalFrontDoors.map"), "Homepage institutional front doors must render from the content model");
expect(!homePage.includes("The public site should not stop at describing what Boundary First Labs is."), "Lab in Motion must not carry explanatory site-meta prose");
expect(!homePage.includes("homeNowSnapshot.description"), "Lab in Motion Now card must stay focused on state, thesis, lanes, and action");
expect(!homePage.includes("door.description"), "Lab in Motion front doors must stay focused on title, compact note, and action");
expect(!homeContent.includes("The immediate problem is not generating more ideas."), "Removed Lab in Motion descriptive prose must not remain in the homepage content model");

const foundationCss = read(`${root}/styles/InstitutionalFoundation.module.css`);
expect(foundationCss.includes('border-color: rgba(184, 154, 71, .46)'), "Institutional header must carry a muted antique-gold perimeter");
expect(foundationCss.includes("border-bottom-width: .5px"), "Institutional header bottom rule must remain the thinnest perimeter edge");
expect(foundationCss.includes('.header[data-header-compact="true"] {\n  min-height: 44px;'), "Post-hero header must physically contract to the compact rail");
expect(foundationCss.includes('.header[data-header-compact="true"] .logo {\n  width: 28px;\n  height: 28px;'), "Compact header must shrink the persistent logo");
expect(foundationCss.includes(".inMotionSection"), "Homepage foundation must style the Lab in Motion layer");
expect(foundationCss.includes(".nowSnapshot"), "Homepage foundation must style the current-state roadmap surface");
expect(foundationCss.includes(".frontDoorStack"), "Homepage foundation must style the Applied Work / Collaboration / Funding entry stack");

const pageShell = read(`${root}/InstitutionalPageShell.tsx`);
expect(pageShell.includes("<InstitutionalHeader />"), "PageShell must own the shared header");
expect(pageShell.includes("<InstitutionalFooter />"), "PageShell must own the shared footer");
expect(pageShell.includes("<main"), "PageShell must own the semantic main boundary");

const routeContracts = [
  [
    "InstitutionalHomePage.tsx",
    "home"
  ],
  [
    "InstitutionalResearchPage.tsx",
    "research"
  ],
  [
    "InstitutionalProductsPage.tsx",
    "products"
  ],
  [
    "InstitutionalProjectsPage.tsx",
    "projects"
  ],
  [
    "InstitutionalApparatusPage.tsx",
    "apparatus"
  ],
  [
    "InstitutionalPublicationsPage.tsx",
    "publications"
  ],
  [
    "InstitutionalAboutPage.tsx",
    "about"
  ],
  [
    "InstitutionalFundingPage.tsx",
    "funding"
  ],
  [
    "InstitutionalFounderPage.tsx",
    "founder"
  ],
  [
    "InstitutionalCollaborationPage.tsx",
    "collaboration"
  ],
  [
    "InstitutionalAppliedWorkPage.tsx",
    "appliedWork"
  ],
  [
    "InstitutionalAiGovernancePage.tsx",
    "aiGovernance"
  ],
  [
    "InstitutionalEvidencePage.tsx",
    "evidence"
  ],
  [
    "InstitutionalExperimentsPage.tsx",
    "experiments"
  ],
  [
    "InstitutionalClaimsPage.tsx",
    "claims"
  ],
  [
    "InstitutionalNowPage.tsx",
    "now"
  ],
  [
    "InstitutionalChangesPage.tsx",
    "changes"
  ],
  [
    "InstitutionalStartPage.tsx",
    "audiences"
  ],
  [
    "InstitutionalContactPage.tsx",
    "contact"
  ],
  [
    "InstitutionalOpenLabPage.tsx",
    "openLab"
  ],
  [
    "InstitutionalAtlasPage.tsx",
    "atlas"
  ],
  [
    "InstitutionalRepresentationAtlasPage.tsx",
    "representationAtlas"
  ]
];

for (const [file, slug] of routeContracts) {
  const source = read(`${root}/${file}`);
  expect(source.includes("InstitutionalPageShell"), `${file} must use InstitutionalPageShell`);
  expect(!source.includes("InstitutionalHeader"), `${file} must not own global header markup`);
  expect(!source.includes("InstitutionalFooter"), `${file} must not own global footer markup`);
  expect(!source.includes("className={styles.page}"), `${file} must not recreate the page shell`);
  const routeOwnsContent = source.includes(`./content/${slug}`);
  const sectionOwnsContent =
    (slug === "publications" &&
      read(`${root}/sections/PublicationContextSection.tsx`).includes("../content/publications")) ||
    (slug === "about" &&
      read(`${root}/sections/AboutReflowGroups.tsx`).includes("../content/about")) ||
    (slug === "products" &&
      read(`${root}/sections/ProductContextSection.tsx`).includes("../content/products"));
  expect(routeOwnsContent || sectionOwnsContent, `${file} or its route-local section must import the content model`);
  expect(fs.existsSync(`${root}/content/${slug}.ts`), `missing content model for ${file}`);
  expect(!source.includes('padStart(2, "0")'), `${file} must use formatOrdinal rather than inline formatting`);
}

for (const file of [
  "InstitutionalResearchPage.tsx",
  "InstitutionalProductsPage.tsx",
  "InstitutionalProjectsPage.tsx",
  "InstitutionalApparatusPage.tsx",
  "InstitutionalPublicationsPage.tsx",
  "InstitutionalAboutPage.tsx",
  "InstitutionalFundingPage.tsx",
  "InstitutionalFounderPage.tsx",
  "InstitutionalCollaborationPage.tsx",
  "InstitutionalAppliedWorkPage.tsx",
  "InstitutionalAiGovernancePage.tsx",
  "InstitutionalEvidencePage.tsx",
  "InstitutionalExperimentsPage.tsx",
  "InstitutionalNowPage.tsx",
  "InstitutionalChangesPage.tsx",
  "InstitutionalStartPage.tsx",
  "InstitutionalContactPage.tsx",
  "InstitutionalOpenLabPage.tsx",
  "InstitutionalAtlasPage.tsx",
]) {
  const source = read(`${root}/${file}`);
  expect(source.includes("InstitutionalRouteHero"), `${file} must compose the shared route hero`);
}

expect(
  !fs.existsSync(`${root}/InstitutionalRoutePreview.tsx`),
  "obsolete route preview scaffold must stay removed",
);

const routeRegistry = read(`${root}/institutionalRoutes.ts`);
const topLevelRouteRegistry = routeRegistry.slice(0, routeRegistry.indexOf("const institutionalChildPages"));
expect(!topLevelRouteRegistry.includes('/v3/apparatus'), "Apparatus must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/funding'), "Funding must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/apparatus'), "Apparatus must stay out of the primary header route set");
expect(!topLevelRouteRegistry.includes('/v3/founder'), "Founder must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/collaboration'), "Collaboration must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/applied-work'), "Applied Work must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/ai-governance'), "AI Governance must remain a first-class secondary route rather than primary top navigation");
expect(!topLevelRouteRegistry.includes('/v3/evidence'), "Evidence must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/experiments'), "Experiments must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/claims'), "Claims must remain a contextual route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/now'), "Now / Roadmap must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/contact'), "Contact must remain outside top-level header navigation");
expect(!topLevelRouteRegistry.includes('/v3/atlas'), "Lab Atlas must remain a contextual route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/representation-atlas'), "Representation Atlas must remain a contextual route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/start'), "Start here must remain a utility route rather than top-level navigation");
expect(routeRegistry.includes("institutionalChildRoutes"), "route registry must expose contextual child-page navigation");
expect(routeRegistry.includes("institutionalFooterRoutes"), "route registry must expose an explicit footer route collection");
expect(routeRegistry.includes('{ label: "Apparatus", href: "/v3/apparatus" }'), "footer route collection must include Apparatus");
expect(routeRegistry.includes('{ label: "Lab Atlas", href: "/v3/atlas" }'), "footer route collection must include Lab Atlas");
expect(routeRegistry.includes('{ label: "Representation Atlas", href: "/v3/representation-atlas" }'), "footer route collection must include Representation Atlas");
expect(routeRegistry.includes('{ label: "Experiments", href: "/v3/experiments" }'), "footer route collection must include Experiments");
expect(routeRegistry.includes('{ label: "Claims", href: "/v3/claims" }'), "footer route collection must include Claims");
expect(routeRegistry.includes('{ label: "Founder", href: "/v3/founder" }'), "footer route collection must include Founder");
expect(routeRegistry.includes('{ label: "AI Governance", href: "/v3/ai-governance" }'), "footer route collection must include AI Governance");
expect(routeRegistry.includes('{ label: "Collaboration", href: "/v3/collaboration" }'), "footer route collection must include Collaboration");
expect(routeRegistry.includes('{ label: "Applied Work", href: "/v3/applied-work" }'), "footer route collection must include Applied Work");
expect(routeRegistry.includes('{ label: "Evidence", href: "/v3/evidence" }'), "footer route collection must include Evidence");
expect(routeRegistry.includes('{ label: "Now", href: "/v3/now" }'), "footer route collection must include Now / Roadmap");
expect(routeRegistry.includes('{ label: "What changed", href: "/v3/changes" }'), "footer route collection must include What changed");
expect(routeRegistry.includes('{ label: "Start here", href: "/v3/start" }'), "footer route collection must include Start here");
expect(routeRegistry.includes('{ label: "Contact", href: "/v3/contact" }'), "footer route collection must include Contact");

const childRouteContracts = [
  ["about", ["founder", "aiGovernance", "now", "funding", "collaboration", "appliedWork"]],
  ["research", ["atlas", "representationAtlas", "aiGovernance", "experiments", "claims", "apparatus"]],
  ["products", ["appliedWork", "evidence", "collaboration", "now"]],
  ["projects", ["appliedWork", "aiGovernance", "evidence", "now", "collaboration", "apparatus"]],
  ["publications", ["evidence", "claims", "experiments", "atlas", "apparatus"]],
  ["funding", ["now", "appliedWork", "evidence", "collaboration"]],
  ["collaboration", ["appliedWork", "funding", "evidence", "now"]],
  ["appliedWork", ["aiGovernance", "evidence", "collaboration", "funding", "now"]],
  ["aiGovernance", ["appliedWork", "evidence", "collaboration", "apparatus"]],
  ["founder", ["evidence", "now", "collaboration"]],
  ["evidence", ["claims", "experiments", "atlas", "now"]],
  ["now", ["changes", "funding", "appliedWork", "collaboration"]],
  ["changes", ["now", "atlas", "evidence", "apparatus"]],
  ["apparatus", ["experiments", "atlas", "evidence", "claims"]],
  ["experiments", ["evidence", "claims", "apparatus", "atlas", "representationAtlas"]],
  ["claims", ["evidence", "experiments", "atlas", "representationAtlas"]],
  ["atlas", ["representationAtlas", "apparatus", "experiments", "claims", "evidence"]],
  ["representationAtlas", ["atlas", "apparatus", "experiments", "collaboration"]],
  ["openLab", ["collaboration", "aiGovernance", "experiments", "claims", "evidence", "apparatus"]],
  ["contact", ["collaboration", "appliedWork", "funding"]],
  ["start", ["appliedWork", "funding", "collaboration", "evidence", "atlas", "now"]],
];

const contextualChildPageKeys = [
  "funding",
  "appliedWork",
  "evidence",
  "experiments",
  "claims",
  "now",
  "changes",
  "collaboration",
  "founder",
  "aiGovernance",
  "apparatus",
  "atlas",
  "representationAtlas",
];

const coveredChildPages = new Set();

for (const [routeKey, childKeys] of childRouteContracts) {
  const routeStart = routeRegistry.indexOf(`  ${routeKey}: [`);
  expect(routeStart >= 0, `${routeKey} must exist in institutionalChildRoutes`);
  const routeEnd = routeRegistry.indexOf("  ],", routeStart);
  const routeSlice = routeRegistry.slice(routeStart, routeEnd);
  const declaredChildKeys = [
    ...routeSlice.matchAll(/institutionalChildPages\.([A-Za-z]+)/g),
  ].map((match) => match[1]);

  expect(
    declaredChildKeys.length <= 6,
    `${routeKey} hero must expose at most six contextual child pages`,
  );
  expect(
    declaredChildKeys.length === childKeys.length,
    `${routeKey} hero child-page set must stay deliberately curated`,
  );

  for (const childKey of childKeys) {
    expect(
      routeSlice.includes(`institutionalChildPages.${childKey}`),
      `${routeKey} must expose ${childKey} as a contextual child route`,
    );
    coveredChildPages.add(childKey);
  }
}

for (const childKey of contextualChildPageKeys) {
  expect(
    coveredChildPages.has(childKey),
    `contextual child page ${childKey} must be linked from at least one route hero`,
  );
}

expect(primitives.includes("childLinks?.slice(0, 6)"), "Shared route hero must enforce the six-child visual ceiling");
expect(primitives.includes("visibleChildLinks.map"), "Shared route hero must render only the bounded child-link set");

expect(primitives.includes("routeChildNav"), "shared route hero must render child-page navigation");
expect(primitives.includes("routeChildIcon"), "child-page cards must expose typed relationship icons");
expect(primitives.includes("<small>{link.relation}</small>"), "child-page cards must render their relationship label");
expect(primitives.includes('aria-label="Child pages"'), "child-page navigation must expose semantic navigation labeling");
expect(read(`${root}/InstitutionalPublicationsPage.tsx`).includes("childLinks={institutionalChildRoutes.publications}"), "Publications hero must expose relevant contextual children");
expect(read(`${root}/InstitutionalAtlasPage.tsx`).includes("childLinks={institutionalChildRoutes.atlas}"), "Lab Atlas hero must expose relevant contextual children");
expect(read(`${root}/InstitutionalContactPage.tsx`).includes("childLinks={institutionalChildRoutes.contact}"), "Contact hero must expose relevant contextual children");
expect(read(`${root}/InstitutionalStartPage.tsx`).includes("childLinks={institutionalChildRoutes.start}"), "Start hero must expose relevant contextual children");
expect(!routeRegistry.includes("institutionalRouteFrontDoors"), "route registry must not duplicate page copy");
expect(!routeRegistry.includes("InstitutionalRouteFrontDoor"), "route registry must remain navigation-only");
expect(chrome.includes("institutionalFooterGroups"), "footer must use grouped institutional footer navigation");
expect(chrome.includes("institutionalFooterGroups.map"), "footer must render grouped footer navigation");

const researchPage = read(`${root}/InstitutionalResearchPage.tsx`);
expect(researchPage.includes("childLinks={institutionalChildRoutes.research}"), "Research hero must expose its contextual child pages");
expect(researchPage.includes("<ResearchContextSection />"), "Research must compose its contextual bento as a section component");
expect(
  researchPage.indexOf('<MoonshotsFeature context="research" />') <
    researchPage.indexOf("<ResearchContextSection />"),
  "Research Moonshots must sit immediately before the Research Context section",
);
expect(
  researchPage.indexOf("</section>", researchPage.indexOf("researchProgramGrid")) <
    researchPage.indexOf('<MoonshotsFeature context="research" />'),
  "Research active surfaces must precede Moonshots",
);
expect(!researchPage.includes('id="reader-agency"'), "Research page must not inline Reflow Field context cards");
expect(fs.existsSync(`${root}/sections/ResearchContextSection.tsx`), "ResearchContextSection must exist as the route-local composition boundary");
const researchProgramCard = read(`${root}/sections/ResearchProgramCard.tsx`);
const researchCss = read(`${root}/styles/Research.module.css`);
expect(labObjectIdentity.includes("hideStatus?: boolean"), "LabObjectIdentity must support split identity placement for Research cards");
expect(labObjectIdentity.includes('status.replaceAll("_", " ")'), "LabObjectIdentity must render source-style underscore statuses as readable inline text");
expect(!labObjectIdentity.includes('status.split("_")'), "LabObjectIdentity must not use underscores as forced line breaks");
expect(researchProgramCard.includes("programIdentityPrimary"), "Research program cards must place OBJECT / CODE beneath the title");
expect(researchProgramCard.includes("hideStatus"), "Research program primary identity must omit STATE");
expect(researchProgramCard.includes("programIdentityState"), "Research program cards must place STATE in its own lower-left plate");
expect(researchProgramCard.includes("hideKind"), "Research program state plate must omit duplicate object identity");
expect(researchProgramCard.includes('statusLabel="STATE"') && researchProgramCard.includes('variant="band"'), "Research program STATE must use the full-width identity treatment rather than the compact badge variant");
expect(
  researchProgramCard.indexOf("programIdentityPrimary") <
    researchProgramCard.indexOf("programIdentityState") &&
    researchProgramCard.indexOf("programIdentityState") <
    researchProgramCard.indexOf("programHeaderRight"),
  "Research program identity fields must remain in the left column before the summary",
);
expect(
  researchProgramCard.indexOf("programHeaderRight") <
    researchProgramCard.lastIndexOf("programRole"),
  "Research program role eyebrow must live in the right column above the summary",
);
expect(
  researchProgramCard.lastIndexOf("programRole") <
    researchProgramCard.indexOf("programSummary"),
  "Research program role eyebrow must precede the summary copy",
);
expect(researchCss.includes(".programIdentityPrimary"), "Research program cards must style the relocated OBJECT / CODE block");
expect(researchCss.includes(".programIdentityState"), "Research program cards must style the relocated STATE block");
expect(researchCss.includes(".programIdentityState {\n  width: 100%;"), "Research program STATE plate must stretch across the left column");
expect(researchCss.includes("width: 100%;\n  flex: 1 1 100%;\n  text-align: left;"), "Research program STATE field must remain left-aligned while stretching");
expect(researchCss.includes("border-left: 4px solid #5b63ad"), "Research program STATE bar must keep a visible research-object accent");

const productsPage = read(`${root}/InstitutionalProductsPage.tsx`);
expect(productsPage.includes("childLinks={institutionalChildRoutes.products}"), "Products hero must expose its contextual child pages");
expect(productsPage.includes("<ProductContextSection />"), "Products must compose its commercialization context as a section component");
expect(!productsPage.includes('className={styles.productEvidenceSection}'), "Why Products Matter must not remain a standalone Products section");
const productContext = read(`${root}/sections/ProductContextSection.tsx`);
expect(productContext.includes('id="why-products-matter"'), "Product Context must own Why Products Matter");
expect(!productsPage.includes('className={styles.productConversion}'), "Products page must not inline the superseded Research-to-Market section");
expect(!productsPage.includes('className={styles.productObjectGrammar}'), "Products page must not inline the superseded Public Product Object section");
expect(fs.existsSync(`${root}/sections/ProductContextSection.tsx`), "ProductContextSection must exist as the route-local composition boundary");
expect(productsPage.includes('/v3/products/boundary-first-chess'), "Products must link Boundary-First Chess to its immersive product page");
expect(productsPage.includes('/v3/products/youtube-knowledge-explorer'), "Products must link YouTube Knowledge Explorer to its immersive product page");
expect((productsPage.match(/<Link\s+[\s\S]*?className=\{styles\.primaryProductCard\}/g) || []).length === 2, "Primary product cards must be full-card links");
expect(!productsPage.includes("<article className={styles.primaryProductCard}"), "Primary product cards must not require a nested detail link for navigation");
expect(productsPage.includes("<h3>YouTube Knowledge Explorer</h3>"), "Products must use the YouTube Knowledge Explorer public name");
expect(!productsPage.includes("Projectr"), "Products public surface must not expose the retired Projectr name");
expect(productsPage.includes('className={styles.researchProducts}'), "Products must distinguish research products from the near-term B2C edge");
expect(productsPage.includes('/v3/products/boundary-first-weather'), "Products research-product rail must link Boundary First Weather");
expect(productsPage.includes('/v3/products/agentic-scientific-method'), "Products research-product rail must link Agentic Scientific Method");

const productExperienceShell = read(`${root}/products/ProductExperienceShell.tsx`);
const chessExperience = read(`${root}/products/BoundaryFirstChessExperience.tsx`);
const chessBoard = read(`${root}/products/BoundaryFirstChessBoard.tsx`);
const chessContent = read(`${root}/content/boundaryFirstChess.ts`);
const chessRoute = read("src/app/v3/products/boundary-first-chess/page.tsx");
expect(productExperienceShell.includes("ProductExperienceShell"), "Product detail pages must share a reusable experience shell");
expect(productExperienceShell.includes("data-institutional-hero"), "Product experience hero must participate in compact institutional header behavior");
expect(productExperienceShell.includes("productExperienceNav"), "Product experience shell must expose reusable local product navigation");
expect(chessExperience.includes("<ProductExperienceShell"), "Boundary-First Chess must use the shared product experience shell");
expect(chessExperience.includes("<BoundaryFirstChessBoard"), "Boundary-First Chess must expose an interactive board as its hero instrument");
expect(chessExperience.includes("This is not a Grandmaster course."), "Boundary-First Chess must preserve learner-facing positioning");
expect(chessBoard.startsWith('"use client";'), "Boundary-First Chess board interaction must own its client boundary");
expect(chessBoard.includes("aria-pressed"), "Boundary-First Chess lenses must expose pressed state accessibly");
expect(chessContent.includes("Create") && chessContent.includes("Repair") && chessContent.includes("Weaken") && chessContent.includes("Exploit") && chessContent.includes("Transform"), "Boundary-First Chess must preserve the five-operation learner grammar");
expect(chessContent.includes("Engine superiority"), "Boundary-First Chess must preserve its claim firewall");
expect(chessRoute.includes("BoundaryFirstChessExperience"), "Boundary-First Chess route must render the product experience");

const weatherExperience = read(`${root}/products/BoundaryFirstWeatherExperience.tsx`);
const weatherField = read(`${root}/products/BoundaryFirstWeatherField.tsx`);
const weatherContent = read(`${root}/content/boundaryFirstWeather.ts`);
const weatherRoute = read("src/app/v3/products/boundary-first-weather/page.tsx");
expect(weatherExperience.includes("<ProductExperienceShell"), "Boundary First Weather must use the shared product experience shell");
expect(weatherExperience.includes("<BoundaryFirstWeatherField"), "Boundary First Weather must expose an interactive simulation-field instrument");
expect(weatherExperience.includes("A compelling visualization is not forecast skill."), "Boundary First Weather must keep visualization separate from forecast-skill claims");
expect(weatherField.startsWith('"use client";'), "Boundary First Weather field interaction must own its client boundary");
expect(weatherField.includes("aria-pressed"), "Boundary First Weather diagnostic modes must expose pressed state accessibly");
expect(weatherContent.includes("Matched baseline") || weatherContent.includes("MATCHED BASELINE"), "Boundary First Weather must preserve matched-baseline comparison");
expect(weatherContent.includes("weatherRecord.program.claimBoundary"), "Boundary First Weather must project the canonical operational-forecast claim boundary");
expect(weatherRoute.includes("BoundaryFirstWeatherExperience"), "Boundary First Weather route must render the product experience");

const explorerExperience = read(`${root}/products/YouTubeKnowledgeExplorerExperience.tsx`);
const explorerInstrument = read(`${root}/products/YouTubeKnowledgeExplorerInstrument.tsx`);
const explorerContent = read(`${root}/content/youtubeKnowledgeExplorer.ts`);
const explorerRoute = read("src/app/v3/products/youtube-knowledge-explorer/page.tsx");
expect(explorerExperience.includes("<ProductExperienceShell"), "YouTube Knowledge Explorer must use the shared product experience shell");
expect(explorerExperience.includes("<YouTubeKnowledgeExplorerInstrument"), "YouTube Knowledge Explorer must expose an interactive source-navigation instrument");
expect(explorerExperience.includes("Ask the video. Make the answer show its work."), "YouTube Knowledge Explorer must foreground evidence-bound answering");
expect(explorerExperience.includes("The product model should outlive its current stack."), "YouTube Knowledge Explorer must expose portability as a product property");
expect(explorerInstrument.startsWith('"use client";'), "YouTube Knowledge Explorer instrument must own its client boundary");
expect(explorerInstrument.includes("aria-pressed"), "YouTube Knowledge Explorer modes and source moments must expose pressed state accessibly");
expect(explorerContent.includes("insufficient evidence") || explorerContent.includes("Insufficient evidence"), "YouTube Knowledge Explorer must preserve insufficient-evidence as a valid answer state");
expect(explorerContent.includes("timestamp"), "YouTube Knowledge Explorer must preserve timestamped source navigation");
expect(!explorerContent.includes("Projectr"), "YouTube Knowledge Explorer public content model must not expose Projectr");
expect(!explorerExperience.includes("Projectr"), "YouTube Knowledge Explorer public experience must not expose Projectr");
expect(explorerRoute.includes("YouTubeKnowledgeExplorerExperience"), "YouTube Knowledge Explorer route must render the product experience");

const asmExperience = read(`${root}/products/AgenticScientificMethodExperience.tsx`);
const asmInstrument = read(`${root}/products/AgenticScientificMethodInstrument.tsx`);
const asmContent = read(`${root}/content/agenticScientificMethod.ts`);
const asmRoute = read("src/app/v3/products/agentic-scientific-method/page.tsx");
expect(asmExperience.includes("<ProductExperienceShell"), "Agentic Scientific Method must use the shared product experience shell");
expect(asmExperience.includes("<AgenticScientificMethodInstrument"), "Agentic Scientific Method must expose an interactive inquiry-machine instrument");
expect(asmExperience.includes("Scientific method, with the hidden operations opened up."), "ASM must foreground the operational inquiry thesis");
expect(asmExperience.includes("Capability is not authority, and authority is not evidence."), "ASM must preserve its authority firewall");
expect(asmExperience.includes("No consequential transition should depend only on chat memory."), "ASM must expose durable scientific memory as a product property");
expect(asmInstrument.startsWith('"use client";'), "ASM inquiry-machine interaction must own its client boundary");
expect(asmInstrument.includes("aria-pressed"), "ASM phase transitions must expose pressed state accessibly");
expect(asmContent.includes("Orient") && asmContent.includes("Declare") && asmContent.includes("Bind") && asmContent.includes("Map") && asmContent.includes("Close") && asmContent.includes("Preserve"), "ASM must preserve the controlled inquiry lifecycle");
expect(asmContent.includes("External user pilot"), "ASM must preserve external validation as an unmet evidence gate");
expect(asmContent.includes("not a proven universal method"), "ASM must preserve its universality claim firewall");
expect(asmRoute.includes("AgenticScientificMethodExperience"), "ASM route must render the product experience");

const projectsPage = read(`${root}/InstitutionalProjectsPage.tsx`);
expect(projectsPage.includes("childLinks={institutionalChildRoutes.projects}"), "Projects hero must expose its contextual child pages");
expect(projectsPage.includes("<ProjectContextSection />"), "Projects must compose its transfer context as a section component");
expect(!projectsPage.includes('className={styles.transferEvidence}'), "Projects page must not inline Transfer Evidence");
expect(!projectsPage.includes('className={styles.projectNativeStatusRule}'), "Projects page must not inline Status Rule");
expect(!projectsPage.includes('className={styles.capabilityTransfer}'), "Projects page must not inline Capability Transfer");
expect(fs.existsSync(`${root}/sections/ProjectContextSection.tsx`), "ProjectContextSection must exist as the route-local composition boundary");

const openLabPage = read(`${root}/InstitutionalOpenLabPage.tsx`);
const openLabContent = read(`${root}/content/openLab.ts`);
const openLabIntake = read(`${root}/OpenLabIntakeInstrument.tsx`);
const openLabServerConfig = read("src/lib/open-lab-intake.ts");
const openLabApi = read("src/app/api/open-lab/route.ts");
const openLabRoute = read("src/app/v3/open-lab/page.tsx");
const environmentExample = read(".env.example");
expect(openLabPage.includes("childLinks={institutionalChildRoutes.openLab}"), "Open Lab hero must expose its contextual child pages");
expect(openLabPage.includes("openLabHeroIntake"), "Open Lab must surface Intake Status in the hero");
expect(!openLabPage.includes('className={styles.openLabAvailability}'), "Open Lab must not keep Intake Status as a body section");
expect(openLabPage.includes('className={styles.openLabContracts}'), "Open Lab must keep Public Participation directly readable");
expect(openLabPage.includes("<OpenLabIntakeInstrument"), "Open Lab must compose the governed intake instrument");
expect(openLabPage.includes("<OpenLabContextSection />"), "Open Lab must compose supporting sections as one context module");
expect(openLabPage.includes('className={styles.openLabClose}'), "Open Lab must keep Institutional Promise directly readable");
expect(openLabPage.includes('/v3/contact?type=open-lab&source=open-lab'), "Open Lab must preserve a conversational path distinct from formal intake");
expect(fs.existsSync(`${root}/sections/OpenLabContextSection.tsx`), "OpenLabContextSection must exist as the route-local composition boundary");
expect(fs.existsSync(`${root}/OpenLabIntakeInstrument.tsx`), "OpenLabIntakeInstrument must exist as the governed public-intake boundary");

expect(openLabContent.includes('sourceRevision: "1dbd3f5b53e55c8feff5230836ce11dc928cba69"'), "Open Lab must pin the governing Lab source revision");
expect(openLabContent.includes('lifecycle: "candidate"'), "Open Lab must preserve the candidate lifecycle of the page projection");
expect(openLabContent.includes("humanReviewed: false"), "Open Lab must not rewrite the source projection as human-reviewed");
expect(openLabContent.includes('OPEN_LAB_INTAKE_SCHEMA = "bfl.open-lab-intake.v1"'), "Open Lab must version its intake envelope");
expect(openLabContent.includes('"PUBLIC_INFRASTRUCTURE_NOMINATION"'), "Open Lab must preserve the public-system nomination contract");
expect(openLabContent.includes('"BFL_CRITIQUE"'), "Open Lab must preserve the criticism contract");
expect(openLabContent.includes('"COLLABORATION_INQUIRY"'), "Open Lab must preserve the collaboration contract");
expect(openLabContent.includes('"WORK_HISTORY_GOALS_INTAKE"'), "Open Lab must preserve the unusual-work intake contract");
expect(openLabContent.includes("PRIVATE REVIEW FIRST"), "Open Lab collection rules must default to private review");
expect(openLabContent.includes("NO FILE UPLOADS / NO SECRETS"), "Open Lab must forbid sensitive file intake");
expect(openLabContent.includes("NO AUTOMATIC PUBLICATION"), "Open Lab must separate intake from publication consent");

expect(openLabServerConfig.includes("BFL_OPEN_LAB_WEBHOOK_URL"), "Open Lab activation must require a dedicated receiver");
expect(openLabServerConfig.includes("BFL_OPEN_LAB_WEBHOOK_TOKEN"), "Open Lab activation must require authenticated receiver handoff");
expect(openLabServerConfig.includes("BFL_OPEN_LAB_POLICY_VERSION"), "Open Lab activation must require a declared policy version");
expect(openLabServerConfig.includes("BFL_OPEN_LAB_RETENTION_DAYS"), "Open Lab activation must require a declared retention window");
expect(openLabServerConfig.includes("reviewed:"), "Open Lab activation must require pinned-source review acknowledgement");
expect(openLabServerConfig.includes("gates.every((gate) => gate.ready)"), "Open Lab must stay closed unless every governance gate is ready");

expect(openLabApi.includes("isOpenLabSubmissionType"), "Open Lab API must validate the four typed participation contracts");
expect(openLabApi.includes('initialVisibility: "private_intake"'), "Open Lab intake must begin private");
expect(openLabApi.includes('publicationConsent: "separate_consent_required"'), "Open Lab API must require separate publication consent");
expect(openLabApi.includes("publicationPermissionGranted: false"), "Open Lab intake must never imply publication permission");
expect(openLabApi.includes("fileUploadsAccepted: false"), "Open Lab API must prohibit file uploads");
expect(openLabApi.includes("noSensitiveMaterialAcknowledged: true"), "Open Lab API must preserve the sensitive-material acknowledgement");
expect(openLabApi.includes("authorization: `Bearer ${token}`"), "Open Lab receiver handoff must be authenticated");
expect(openLabApi.includes("OL-"), "Open Lab must issue a stable receipt identifier after accepted handoff");
expect(openLabApi.indexOf("await fetch(receiver") < openLabApi.indexOf("submissionId,\n      state: \"received\""), "Open Lab receipt response must follow receiver acceptance");

expect(openLabIntake.includes("FORMAL INTAKE IS CURRENTLY CLOSED"), "Open Lab UI must make a closed collection boundary explicit in public-facing language");
expect(openLabIntake.includes("Anonymous / pseudonymous"), "Open Lab must support non-prestige-gated submitter identity");
expect(openLabIntake.includes("No reply path"), "Open Lab must support intake without a forced response identity");
expect(openLabIntake.includes("does not give permission") && openLabIntake.includes("publish my submission"), "Open Lab must distinguish public-response preference from publication consent");
expect(openLabIntake.includes("Submission closed"), "Open Lab submit action must visibly close when governance gates are incomplete");
expect(openLabIntake.includes("What happens after your submission arrives."), "Open Lab must expose the review process in public-facing language");
expect(openLabIntake.includes("Tell the Lab what you&apos;re bringing."), "Open Lab governed intake must lead with ordinary public-facing language");
expect(!openLabIntake.includes("Preserve the submission before deciding where it belongs."), "Open Lab intake must not expose internal routing language as its public headline");
expect(openLabIntake.includes("openLabQuickIntake"), "Open Lab must promote the submission experience ahead of explanatory machinery");
expect(openLabIntake.indexOf("openLabQuickIntake") < openLabIntake.indexOf("openLabReadiness"), "Open Lab form and route choice must precede governance/readiness detail");
expect(openLabIntake.includes("Add context or links"), "Open Lab must progressively disclose optional context rather than front-load every field");
expect(openLabIntake.indexOf('name="publicResponseRequested"') < openLabIntake.indexOf("</details>"), "Open Lab must keep public-response preference inside optional progressive disclosure");
expect(openLabIntake.includes("AFTER YOU SUBMIT"), "Open Lab must move explanatory routing context after the primary intake experience");
expect(openLabIntake.includes("HOW THE INTAKE IS GOVERNED"), "Open Lab must keep governance inspectable after the submission surface");
expect((openLabIntake.match(/<details className=\{styles\.openLabPostIntakeDisclosure\}>/g) ?? []).length === 3, "Open Lab must collapse its three post-intake context sections into native disclosures");
expect(!openLabIntake.includes('<details className={styles.openLabPostIntakeDisclosure} open'), "Open Lab post-intake disclosures must default closed to keep the submission experience primary");
expect(openLabIntake.includes("openLabReviewStateList"), "Review-process states must remain inspectable inside the collapsed review section");

expect(openLabRoute.includes("readOpenLabIntakeConfig"), "Open Lab route must derive runtime state from server governance configuration");
expect(openLabRoute.includes("isOpenLabSubmissionType"), "Open Lab route must deep-link only declared submission types");
expect(environmentExample.includes("BFL_OPEN_LAB_GOVERNANCE_ACK"), "Open Lab deployment variables must document the governance acknowledgement");
expect(environmentExample.includes("reviewed:1dbd3f5b53e55c8feff5230836ce11dc928cba69"), "Open Lab env example must document the exact pinned-source acknowledgement");

const aiGovernancePage = read(`${root}/InstitutionalAiGovernancePage.tsx`);
const aiGovernanceContext = read(`${root}/sections/AiGovernanceContextSection.tsx`);
expect(aiGovernancePage.includes("<AiGovernanceContextSection />"), "AI Governance page must delegate supporting governance machinery to the Reflow context section");
expect(aiGovernancePage.includes("AI IS A FORGE, NOT AN ORACLE"), "AI Governance must preserve the Forge thesis block");
expect(aiGovernancePage.includes("Capability can amplify craft without becoming authority."), "AI Governance Forge thesis must retain its core statement");
expect(!aiGovernancePage.includes("What source material entered the process?"), "AI Governance Forge thesis must not restore the removed question matrix");
expect(!aiGovernancePage.includes("Do not confuse fluency with temper."), "AI Governance Forge thesis must not restore the removed quote panel");
expect(!aiGovernanceCss.includes(".forgeQuestions"), "AI Governance must not retain dead Forge question-grid styling");
expect(!aiGovernanceCss.includes(".forgeQuote"), "AI Governance must not retain dead Forge quote styling");
expect(aiGovernanceCss.includes(".forgeLead {\n  max-width: 520px;"), "AI Governance Forge thesis must remain a compact single-column statement");
expect(!aiGovernancePage.includes('className={styles.boundarySection}'), "AI Governance must not restore the old always-expanded governance-boundary section");
expect(!aiGovernancePage.includes('className={styles.consequenceSection}'), "AI Governance must not restore the old always-expanded consequence section");
expect(!aiGovernancePage.includes('className={styles.certificateSection}'), "AI Governance must not restore the old always-expanded certificate section");
expect(!aiGovernancePage.includes('className={styles.auditSection}'), "AI Governance must not restore the old always-expanded review-surfaces section");
expect(!aiGovernancePage.includes('className={styles.selfGovernanceSection}'), "AI Governance must not restore the old always-expanded self-governance section");
expect(!aiGovernancePage.includes('className={styles.firewallSection}'), "AI Governance must not restore the old always-expanded firewall section");
expect(aiGovernanceContext.includes("Open the part you need."), "AI Governance Reflow context must explicitly orient the reader toward selective inspection");
const aiGovernanceCss = read(`${root}/styles/AiGovernance.module.css`);
expect(aiGovernanceCss.includes("grid-template-columns: minmax(0, 1.18fr) minmax(420px, .82fr)"), "AI Governance hero must render as a two-column institutional hero on desktop");
expect(aiGovernanceCss.includes('font-family: Georgia, "Times New Roman", serif;'), "AI Governance hero headline must use the institutional serif treatment");
expect(aiGovernanceCss.includes("border-bottom: 2px solid var(--old-gold)"), "AI Governance hero must close with the institutional gold boundary");
expect(aiGovernanceCss.includes("@media (max-width: 1080px)") && aiGovernanceCss.includes("grid-template-columns: 1fr"), "AI Governance hero must collapse cleanly below desktop width");
const aiGovernanceHeroSlice = aiGovernancePage.slice(
  aiGovernancePage.indexOf("<InstitutionalRouteHero"),
  aiGovernancePage.indexOf("</InstitutionalRouteHero>") + "</InstitutionalRouteHero>".length,
);
expect(aiGovernanceHeroSlice.includes("governanceHeroSignalCard"), "AI Governance hero must stage the doctrine labels on one visual signal card");
expect(aiGovernanceHeroSlice.includes("governanceHeroTags"), "AI Governance hero must expose the three doctrine labels as compact tags");
expect(aiGovernanceHeroSlice.includes('data-tone="forge"') && aiGovernanceHeroSlice.includes(">FORGE</span>"), "AI Governance hero must retain the Forge signal");
expect(aiGovernanceHeroSlice.includes('data-tone="certify"') && aiGovernanceHeroSlice.includes(">CERTIFY</span>"), "AI Governance hero must retain the Certify signal");
expect(aiGovernanceHeroSlice.includes('data-tone="forbid"') && aiGovernanceHeroSlice.includes(">FORBID</span>"), "AI Governance hero must retain the Forbid signal");
expect(!aiGovernanceHeroSlice.includes("what helps") && !aiGovernanceHeroSlice.includes("what acts") && !aiGovernanceHeroSlice.includes("what dominates"), "AI Governance hero must not repeat doctrine explanations inside the traffic-light signal");
expect(!aiGovernanceHeroSlice.includes("Accelerate bounded assistance. Govern consequential agency."), "AI Governance hero must leave doctrine exposition to body content");
expect(aiGovernancePage.includes("doctrineInstrument"), "AI Governance body must retain the full dark three-layer doctrine instrument");
expect(aiGovernancePage.includes("Accelerate bounded assistance. Govern consequential agency. Refuse"), "AI Governance body must preserve the full doctrine synthesis");
expect(aiGovernancePage.includes("PUBLIC DOCTRINE + PRACTICAL REVIEW METHOD"), "AI Governance body must preserve the doctrine status context");
expect(aiGovernanceCss.includes(".governanceHeroSignalCard"), "AI Governance hero traffic light must sit on a dedicated card");
expect(aiGovernanceCss.includes(".governanceHeroTags > strong i"), "AI Governance traffic-light tags must carry visible signal indicators");
expect(aiGovernanceCss.includes("font: 800 clamp(1.05rem, 1.45vw, 1.32rem)"), "AI Governance hero doctrine labels must retain strong visual weight without oversized buttons");
expect(aiGovernanceCss.includes("width: 224px"), "AI Governance traffic-light signals must use one compact shared width sized to Certify");
expect(aiGovernanceCss.includes("min-height: 50px"), "AI Governance traffic-light signals must stay vertically compact");
expect(aiGovernanceCss.includes("border-radius: 1px"), "AI Governance traffic-light indicators must render as squares rather than dots");
expect(!aiGovernancePage.includes('href="/v3/'), "AI Governance must not expose internal /v3 public links");

const aboutPage = read(`${root}/InstitutionalAboutPage.tsx`);
expect(aboutPage.includes("childLinks={institutionalChildRoutes.about}"), "About hero must expose its contextual child pages");
expect(aboutPage.includes("founder-led solopreneur operation"), "About may use solopreneur as shorthand for the current founder-led operating model");
expect(aboutPage.includes("single-person"), "About must define the operating model in plain language rather than relying on the solopreneur label");
expect(aboutPage.includes("computationally leveraged"), "About must state that the Lab is computationally leveraged");
expect(aboutPage.includes("<AboutReflowGroups />"), "About page must delegate grouped doctrine to the Reflow section component");
expect(aboutPage.indexOf("<AboutReflowGroups />") < aboutPage.indexOf('className={styles.aboutClose}'), "About closing synthesis must remain outside and after the Reflow chapters");
expect(fs.existsSync(`${root}/sections/AboutReflowGroups.tsx`), "AboutReflowGroups must exist as the About doctrine composition boundary");
const aboutGroups = read(`${root}/sections/AboutReflowGroups.tsx`);
expect((aboutGroups.match(/className={styles.aboutGroup}/g) || []).length === 3, "About Reflow component must preserve three narrative groups");
expect((aboutGroups.match(/<ReflowField(?:\s|>)/g) || []).length === 3, "About must use one Reflow field per narrative group");
expect(aboutGroups.includes('data-about-group="representation"'), "About must preserve Representation + Method");
expect(aboutGroups.includes('data-about-group="agency"'), "About must preserve Agency + Stewardship");
expect(aboutGroups.includes('data-about-group="institution"'), "About must preserve Institutional Practice");
expect(aboutGroups.includes("solopreneur operation"), "About Institutional Practice must explain the solopreneur business model");
expect(aboutGroups.includes("They are leverage, not staff."), "About must distinguish computational leverage from organizational headcount");

const appliedWorkPage = read(`${root}/InstitutionalAppliedWorkPage.tsx`);
const appliedWorkContent = read(`${root}/content/appliedWork.ts`);
expect(appliedWorkPage.includes("./content/appliedWork"), "Applied Work page must own a route-local content model");
expect(appliedWorkPage.includes("What can Boundary First Labs help your organization do?"), "Applied Work hero must lead with the ordinary commercial question");
expect(appliedWorkContent.includes("NO THEORY BUY-IN REQUIRED"), "Applied Work must separate service value from theory adoption");
expect(appliedWorkPage.includes("CURRENT COMMERCIAL POSTURE"), "Applied Work must disclose current BFL service maturity");
expect(appliedWorkPage.includes("appliedServiceFamily"), "Applied Work must group concrete offers inside larger service families");
expect(appliedWorkPage.includes("childLinks={institutionalChildRoutes.appliedWork}"), "Applied Work hero must expose Evidence as a child page");
expect(appliedWorkPage.includes('/v3/contact?type=applied-work&source=applied-work'), "Applied Work must expose a contextual Contact route");

const evidencePage = read(`${root}/InstitutionalEvidencePage.tsx`);
const evidenceContent = read(`${root}/content/evidence.ts`);
expect(evidencePage.includes("./content/evidence"), "Evidence page must own a route-local content model");
expect(evidencePage.includes("What supports a claim, product, project, or research result?"), "Evidence hero must frame Evidence as a contextual support object");
expect(evidencePage.includes("Evidence should travel with the thing it supports."), "Evidence survey must state the contextual-placement rule");
expect(evidencePage.includes("Vocabulary and calibration."), "Evidence global route must identify itself as vocabulary and calibration rather than a flat catalog");
expect(evidencePage.includes("EVIDENCE CLASSES"), "Evidence survey must retain the evidence-class vocabulary");
expect(evidencePage.includes("EVIDENCE LADDER"), "Evidence survey must retain the evidence-strength calibration ladder");
expect(evidencePage.includes("NEXT PLACEMENT PASS"), "Evidence survey must make the contextual-placement migration explicit");
expect(!evidencePage.includes("<EpistemicChainSection />"), "Global Evidence route must not inline a long publication-local epistemic chain");
expect(!evidencePage.includes("priorExecution.map"), "Global Evidence route must not inline the long prior-execution catalog");
expect(!evidencePage.includes("evidenceToEarn.map"), "Global Evidence route must not inline the long evidence-to-earn catalog");
expect(evidencePage.includes('href="/research"') && evidencePage.includes('href="/products"') && evidencePage.includes('href="/projects"') && evidencePage.includes('href="/publications"'), "Evidence survey must route toward contextual owners");
expect(evidenceContent.includes("EXTERNALLY CORROBORATED"), "Evidence must distinguish external corroboration");
expect(evidenceContent.includes("PROFESSIONAL RECORD"), "Evidence must distinguish founder professional provenance");
expect(evidenceContent.includes("BFL-NATIVE + INSPECTABLE"), "Evidence must distinguish BFL-native artifacts");
expect(evidenceContent.includes("EMERGING / NOT YET ESTABLISHED"), "Evidence must expose proof gaps");
const epistemicChainSection = read(`${root}/sections/EpistemicChainSection.tsx`);
const epistemicChainContent = read(`${root}/content/epistemicChains.ts`);
expect(epistemicChainContent.includes('"PUB-001B-CLAIM-EVIDENCE-MAP"'), "Epistemic chain machinery must remain available for later contextual placement");
expect(epistemicChainSection.includes("Missing cross-registry relations stay missing."), "Epistemic-chain UI must preserve its no-inference edge rule");
expect(evidencePage.includes("childLinks={institutionalChildRoutes.evidence}"), "Evidence hero must expose contextual child pages");

const apparatusMachineryPage = read(`${root}/InstitutionalApparatusPage.tsx`);
const machineryContent = read(`${root}/content/machinery.ts`);
expect(apparatusMachineryPage.includes("./content/machinery"), "Apparatus page must consume the source-bound machinery registry projection");
expect(apparatusMachineryPage.includes("machineryRecords.map"), "Apparatus page must render registered machinery records directly");
expect(apparatusMachineryPage.includes('kind="apparatus"'), "Registered machinery must identify as Apparatus objects");
expect(apparatusMachineryPage.includes('kindLabel="Machinery"'), "Registered machinery must distinguish component identity from conceptual apparatus vocabulary");
expect(apparatusMachineryPage.includes("identifier={machine.machineId}"), "Machinery projection must preserve canonical BFL-MACH-* identities");
expect(apparatusMachineryPage.includes("status={machine.maturity}"), "Machinery identity must preserve source maturity");
expect(apparatusMachineryPage.includes("secondary={machine.integrationLevel}"), "Machinery identity must preserve source integration level");
expect(machineryContent.includes('"BFL-MACH-CORPUS-FORGE"'), "Machinery projection must include Corpus Forge");
expect(machineryContent.includes('"BFL-MACH-UX-RECIPE-ADMISSION-PILOT"'), "Machinery projection must include the full ten-component seed cohort");
expect(machineryContent.includes('"sourceRevision": "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Machinery projection must pin the Lab source revision");
expect(machineryContent.includes("does not supersede component-local contracts"), "Machinery projection must preserve the registry authority ceiling");

const claimsPage = read(`${root}/InstitutionalClaimsPage.tsx`);
const claimsContent = read(`${root}/content/claims.ts`);
expect(claimsPage.includes("./content/claims"), "Claims page must own a route-local content model");
expect(claimsPage.includes("How does the Lab bound what it asserts?"), "Claims hero must frame Claim as an institutional object family");
expect(claimsPage.includes("Claims should be read beside the research that owns them."), "Claims survey must state contextual ownership");
expect(claimsPage.includes("Scope, not universal ledger."), "Claims global route must explicitly reject the flat universal-ledger model");
expect(claimsPage.includes("Information Mechanics is one admitted cohort, not “the Lab’s claims.”"), "Claims survey must identify Information Mechanics as one recovered cohort");
expect(claimsPage.includes("NEXT PLACEMENT PASS"), "Claims survey must make contextual placement the next step");
expect(!claimsPage.includes("claimRecords.map"), "Global Claims route must not inline the owner-local claim catalog");
expect(!claimsPage.includes("LabObjectIdentity"), "Global Claims survey must not masquerade as the claim-record detail surface");
expect(claimsPage.includes('href="/research"') && claimsPage.includes('href="/evidence"') && claimsPage.includes('href="/experiments"'), "Claims survey must route toward owner and support contexts");
expect(claimsPage.includes("childLinks={institutionalChildRoutes.claims}"), "Claims hero must expose contextual child pages");
expect(claimsContent.includes('"IM-C001"'), "Claims projection must preserve the first Information Mechanics claim for later contextual views");
expect(claimsContent.includes('"IM-C008"'), "Claims projection must preserve the full eight-claim Information Mechanics cohort");
expect(claimsContent.includes('"sourceRevision": "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Claims projection must pin the Lab source revision");
expect(claimsContent.includes("no claim truth, theorem proof, novelty, publication promotion, or cross-domain authority"), "Claims projection must preserve the registrar authority ceiling");
expect(claimsContent.includes('"atlasId": "research-im"'), "Claims projection must bind only to the declared Information Mechanics owner program");

const experimentsPage = read(`${root}/InstitutionalExperimentsPage.tsx`);
const experimentsContent = read(`${root}/content/experiments.ts`);
expect(experimentsPage.includes("./content/experiments"), "Experiments page must own a route-local content model");
expect(experimentsPage.includes("How does the Lab test its work?"), "Experiments hero must frame Experiment as a contextual test object");
expect(experimentsPage.includes("A test belongs to the system that gives it a question."), "Experiments survey must state contextual ownership");
expect(experimentsPage.includes("Survey, not flat catalog."), "Experiments global route must reject the flat record-catalog model");
expect(experimentsPage.includes("CURRENT RECOVERED SCOPE"), "Experiments survey must summarize recovered registry scope");
expect(experimentsPage.includes("NEXT PLACEMENT PASS"), "Experiments survey must make contextual placement the next step");
expect(!experimentsPage.includes("experimentRecords.map"), "Global Experiments route must not inline every experiment record");
expect(!experimentsPage.includes("LabObjectIdentity"), "Global Experiments survey must not masquerade as the experiment-record detail surface");
expect(experimentsPage.includes('href="/labs/distinction-space"') && experimentsPage.includes('href="/labs/representation-lab"'), "Experiments survey must retain direct live-lab entry points");
expect(experimentsPage.includes('href="/research"') && experimentsPage.includes('href="/products"') && experimentsPage.includes('href="/projects"'), "Experiments survey must route toward contextual owners");
expect(experimentsPage.includes("childLinks={institutionalChildRoutes.experiments}"), "Experiments hero must expose contextual child pages");
expect(experimentsContent.includes('id: "EXP-ATLAS-001"'), "Experiment projection must preserve Atlas seed experiments for later contextual views");
expect(experimentsContent.includes('id: "EXP-ASM-004"'), "Experiment projection must preserve ASM seed experiments through EXP-ASM-004");
expect(experimentsContent.includes('sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Experiment projection must pin the Lab source revision");
expect(experimentsContent.includes("Registration and evidence routing only"), "Experiment projection must preserve the register authority ceiling");
expect(evidenceContent.includes('surfaceKey: "citywatch"'), "Evidence source must preserve admitted evidence records for later contextual views");

const nowPage = read(`${root}/InstitutionalNowPage.tsx`);
const nowContent = read(`${root}/content/now.ts`);
expect(nowPage.includes("./content/now"), "Now / Roadmap page must own a route-local content model");
expect(nowPage.includes("What is Boundary First Labs doing now?"), "Now hero must lead with the current-work question");
expect(nowPage.includes("NOW → NEXT → LATER"), "Now page must expose the roadmap horizon sequence");
expect(nowPage.includes("WHAT CAN CHANGE THE ROADMAP?"), "Now page must make reprioritization rules explicit");
expect(nowContent.includes("Finish the public institutional boundary"), "Now priorities must include public institutional conversion");
expect(nowContent.includes("Turn capability into outside evidence"), "Now priorities must include BFL-native external evidence");
expect(nowContent.includes("Execute the representational laboratory program"), "Now priorities must include the active laboratory program");
expect(nowContent.includes("Independent use"), "Now roadmap gates must include transfer beyond the founder");
expect(nowPage.includes('/v3/contact?type=general&source=now'), "Now must expose a contextual Contact route");

const contactPage = read(`${root}/InstitutionalContactPage.tsx`);
const contactContent = read(`${root}/content/contact.ts`);
const inquiryForm = read(`${root}/InstitutionalInquiryForm.tsx`);
const inquiryApi = read("src/app/api/inquiry/route.ts");
expect(contactPage.includes("./content/contact"), "Contact page must own a route-local content model");
expect(contactPage.includes("Start with why you are reaching out."), "Contact hero must lead with the reason for contact");
expect(contactPage.includes("contactFamilyStack"), "Contact routing must group smaller inquiry routes inside larger families");
expect(contactPage.includes("<InstitutionalInquiryForm"), "Contact must compose the reusable inquiry form");
expect(contactContent.includes("Applied work / consulting"), "Contact must route applied-work inquiries");
expect(contactContent.includes("Funding / sponsorship"), "Contact must route funding inquiries");
expect(contactContent.includes("Research review / technical critique"), "Contact must route research-review inquiries");
expect(contactContent.includes("Media / speaking / education"), "Contact must route media and education inquiries");
expect(inquiryForm.startsWith('"use client";'), "Inquiry form must own its browser interaction boundary");
expect(inquiryForm.includes('fetch("/api/inquiry"'), "Inquiry form must submit through the server-side inquiry route");
expect(inquiryForm.includes('name="website"'), "Inquiry form must include a spam honeypot");
expect(inquiryApi.includes("BFL_INQUIRY_WEBHOOK_URL"), "Inquiry API must require an explicit receiving endpoint");
expect(inquiryApi.includes("RATE_LIMIT"), "Inquiry API must include a lightweight rate-limit boundary");
expect(inquiryApi.includes("sourceContext"), "Inquiry API must preserve inquiry source context");

const collaborationPage = read(`${root}/InstitutionalCollaborationPage.tsx`);
expect(collaborationPage.includes("./content/collaboration"), "Collaboration page must own a route-local content model");
expect(collaborationPage.includes("POSSIBLE FITS, NOT AFFILIATIONS"), "Collaboration map must explicitly prevent endorsement inference");
expect(collaborationPage.includes('className={styles.collaborationMapFrame}'), "Collaboration page must expose the named relationship map as a primary surface");
expect(collaborationPage.includes("collaborationStageLegend"), "Collaboration page must explain readiness semantics");
expect(collaborationPage.includes("smallest useful"), "Collaboration hero must preserve the smallest-useful-relationship doctrine");
expect(collaborationPage.includes("collaborationOutcomes"), "Collaboration page must state concrete business and funding outcomes");
expect(collaborationPage.includes("How funding works"), "Collaboration page must give potential funders a direct Funding route");
expect(collaborationPage.includes("childLinks={institutionalChildRoutes.collaboration}"), "Collaboration hero must expose Applied Work as a child page");
expect(collaborationPage.includes('/v3/contact?type=collaboration&source=collaboration'), "Collaboration must expose a contextual Contact route");

const founderPage = read(`${root}/InstitutionalFounderPage.tsx`);
const founderCss = read(`${root}/styles/Founder.module.css`);
expect(founderPage.includes("./content/founder"), "Founder page must own a route-local content model");
expect((founderPage.match(/Nicholas T\. Smith/g) ?? []).length === 1, "Founder hero must identify Nicholas T. Smith exactly once");
expect(founderPage.includes("title={<>Nicholas T. Smith</>}"), "Founder hero must use the canonical full name as the H1");
expect(founderPage.includes("eyebrow={<>FOUNDER</>}"), "Founder hero eyebrow must not repeat the founder name");
expect(!founderPage.includes("title={<>Nick.</>}"), "Founder hero must not restore the informal Nick. splash title");
expect(founderPage.includes("Computer scientist, systems engineer, and founder of Boundary First Labs."), "Founder hero must state the professional identity without repeating the name");
expect(!founderPage.includes("<strong>Nicholas T. Smith</strong>"), "Founder identity plate must not duplicate the founder name");
expect(founderCss.includes("font-size: clamp(3.8rem, 6.2vw, 7.4rem)"), "Founder H1 must use the normalized institutional name scale");
expect(founderPage.includes('className={styles.founderBoundary}'), "Founder page must state the founder-dependence boundary");
expect(founderPage.includes("childLinks={institutionalChildRoutes.founder}"), "Founder hero must expose Evidence as a child page");

const fundingPage = read(`${root}/InstitutionalFundingPage.tsx`);
expect(fundingPage.includes("./content/funding"), "Funding page must own a route-local content model");
expect(fundingPage.includes('className={styles.fundingConversion}'), "Funding must expose the conversion model directly");
expect(fundingPage.includes('className={styles.fundingChannelsSection}'), "Funding must expose channel options directly");
expect(fundingPage.includes('className={styles.fundingEvaluation}'), "Funding must expose evaluation and epistemic boundaries directly");
expect(fundingPage.includes("Fund the conversion, not the theory."), "Funding hero must state the public funding thesis");
expect(fundingPage.includes("childLinks={institutionalChildRoutes.funding}"), "Funding hero must expose Applied Work and Evidence as child routes");
expect(fundingPage.includes('/v3/contact?type=funding&source=funding'), "Funding must expose a contextual Contact route");

const apparatusPage = read(`${root}/InstitutionalApparatusPage.tsx`);
expect(apparatusMachineryPage.includes("<ApparatusContextSection />"), "Apparatus must compose its supporting machinery as a section component");
expect(apparatusMachineryPage.includes("childLinks={institutionalChildRoutes.apparatus}"), "Apparatus hero must expose Experiments as a contextual child page");
expect(apparatusMachineryPage.includes('className={styles.instrumentBench}'), "Instrument Bench must remain directly composed on the Apparatus page");
expect(!apparatusPage.includes('className={styles.apparatusWhy}'), "Apparatus page must not inline Why Apparatus Matters");
expect(!apparatusPage.includes('className={styles.apparatusPathSection}'), "Apparatus page must not inline the research path");
expect(!apparatusPage.includes('className={styles.apparatusClose}'), "Apparatus page must not inline Closing Test");
expect(fs.existsSync(`${root}/sections/ApparatusContextSection.tsx`), "ApparatusContextSection must exist as the route-local composition boundary");

const publicationsPage = read(`${root}/InstitutionalPublicationsPage.tsx`);
expect(publicationsPage.includes("<PublicationCatalogSection />"), "Publications must expose a substantive publication-catalog surface before context");
expect(publicationsPage.includes("<PublicationContextSection />"), "Publications must compose its current body as one context section");
expect(publicationsPage.indexOf("<PublicationCatalogSection />") < publicationsPage.indexOf("<PublicationContextSection />"), "Publication catalog must precede contextual publication machinery");
expect(!publicationsPage.includes('className={styles.publicationProjection}'), "Publications page must not inline Projection / Authority");
expect(!publicationsPage.includes('className={styles.publicationCovenant}'), "Publications page must not inline the Publication Covenant");
expect(fs.existsSync(`${root}/sections/PublicationCatalogSection.tsx`), "PublicationCatalogSection must exist as the substantive publication-object boundary");
expect(fs.existsSync(`${root}/sections/PublicationContextSection.tsx`), "PublicationContextSection must exist as the route-local composition boundary");
const publicationCatalog = read(`${root}/sections/PublicationCatalogSection.tsx`);
expect(publicationCatalog.includes("selectedPublications"), "Publication catalog must render the curated source-bound publication selection");
expect(publicationCatalog.includes("SOURCE-BOUND RECORDS"), "Publication catalog must expose that its visible records are source-bound");
expect(publicationCatalog.includes("selectedPublications.length"), "Publication catalog must derive its bound-record count from the selected publication source");
expect(publicationCatalog.includes("publicationClaimCeiling"), "Publication catalog must keep claim ceilings attached to visible records");
expect(publicationCatalog.includes("publicationProjection"), "Publication catalog must expose the pinned publication-control projection");
expect(publicationCatalog.includes("publicationProjection.sources.map"), "Publication catalog must expose all three publication-control authorities");
expect(publicationCatalog.includes("PublicationSourceContract"), "Publication catalog must bind every visible record back to its controlling source");
expect(publicationCatalog.includes("PublicationControlDetails"), "Publication catalog must expose source dependencies, gates, or evidence plans where declared");
expect(publicationCatalog.includes("PublicationAuthorityFirewall"), "Publication catalog must preserve the controlling registry authority ceiling");
expect(publicationCatalog.includes('id={"publication-" + publication.id}'), "Publication catalog records must support exact deep links");

console.log("Institutional component architecture passed.");


const labObjectProductExperienceShell = read(`${root}/products/ProductExperienceShell.tsx`);
const projectsPageForObjects = read(`${root}/InstitutionalProjectsPage.tsx`);
const publicationsCatalogForObjects = read(`${root}/sections/PublicationCatalogSection.tsx`);

expect(labObjectProductExperienceShell.includes("LabObjectIdentity"), "ProductExperienceShell must compose LabObjectIdentity");
expect(labObjectProductExperienceShell.includes('kind="product"'), "ProductExperienceShell must identify product objects without inventing IDs");
expect(labObjectProductExperienceShell.includes("status={product.status}"), "ProductExperienceShell must preserve source product status");
expect(researchPage.includes("LabObjectIdentity"), "Research program cards must compose LabObjectIdentity");
expect(researchPage.includes('kind="research"'), "Research program cards must identify research objects");
expect(researchPage.includes("identifier={program.code}"), "Research local codes must remain explicit codes");
expect(researchPage.includes("status={program.state}"), "Research program identity must preserve source state");
expect(projectsPageForObjects.includes("LabObjectIdentity"), "Project cards must compose LabObjectIdentity");
expect(projectsPageForObjects.includes('kind="project"'), "Project cards must identify project objects");
expect(projectsPageForObjects.includes("identifier={project.code}"), "Project local codes must remain explicit codes");
expect(projectsPageForObjects.includes("status={project.status}"), "Project identity must preserve source status");
expect(publicationsCatalogForObjects.includes("LabObjectIdentity"), "Publication records must compose LabObjectIdentity");
expect(publicationsCatalogForObjects.includes('kind="publication"'), "Publication records must identify publication objects");
expect(publicationsCatalogForObjects.includes("identifier={publication.id}"), "Publication record identifiers must remain source-provided records");
expect(publicationsCatalogForObjects.includes('identifierLabel="SOURCE ID"'), "Publication identities must disclose source-governed identifiers");
const publicationContentForObjects = read(`${root}/content/publications.ts`);
expect(publicationContentForObjects.includes('id: "PUB-001"'), "Publication source IDs must replace website-local publication aliases");
expect(publicationContentForObjects.includes('id: "PUB-002"'), "Publication source IDs must preserve the second sequence artifact");
expect(publicationContentForObjects.includes('id: "systems_interface_contracts"'), "Publication Source Registry canonical IDs must remain intact");
expect(!publicationContentForObjects.includes('id: "pub-closure-driven-development"'), "Website-local publication aliases must not survive as canonical publication IDs");
expect(publicationContentForObjects.includes('sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Publication projection must pin the Lab source revision");
expect(publicationContentForObjects.includes('"REG-PUBLICATION-SEQUENCE"'), "Publication projection must include Publication Sequence authority");
expect(publicationContentForObjects.includes('"REG-PUBLICATION-GRAPH"'), "Publication projection must include Publication Graph authority");
expect(publicationContentForObjects.includes('"REG-PUBLICATION-SOURCES"'), "Publication projection must include Publication Source Registry authority");
expect(publicationsCatalogForObjects.includes("status={publication.recordState}"), "Publication identity must preserve record state");


const atlasPage = read(`${root}/InstitutionalAtlasPage.tsx`);
const atlasExplorer = read(`${root}/LabAtlasExplorer.tsx`);
const atlasContent = read(`${root}/content/atlas.ts`);
expect(atlasPage.includes("<LabAtlasExplorer"), "Lab Atlas route must compose the relationship explorer");
expect(atlasPage.includes("initialSelectedId={initialFocus}"), "Lab Atlas route must pass deep-link focus into the explorer");
expect(atlasPage.includes('key={initialFocus ?? "atlas-default"}'), "Lab Atlas route must remount selection state when URL focus changes");
expect(atlasExplorer.startsWith('"use client";'), "Lab Atlas relationship selection must remain inside a bounded client component");
expect(atlasExplorer.includes("LabObjectIdentity"), "Lab Atlas inspector must reuse the canonical object identity grammar");
expect(atlasContent.includes("export const atlasEdges"), "Lab Atlas relationships must live in an explicit content model");
expect(atlasContent.includes("PROJECT CASE OF"), "Lab Atlas must declare project-to-product relationships explicitly");
expect(atlasContent.includes("PUBLIC PRODUCT SURFACE"), "Lab Atlas must declare the ASM research-to-product relationship explicitly");
expect(atlasContent.includes("priorExecution"), "Lab Atlas must admit the source-bound prior-execution evidence cohort");
expect(atlasContent.includes('kind: "evidence"'), "Lab Atlas must expose Evidence as an object family");
expect(atlasContent.includes('kind: "experiment"'), "Lab Atlas must expose Experiment as an object family");
expect(atlasContent.includes('kind: "apparatus"'), "Lab Atlas must expose Apparatus as an object family");
expect(atlasContent.includes('kind: "claim"'), "Lab Atlas must expose Claim as an object family");
expect(atlasContent.includes("claimRecords.map"), "Lab Atlas must admit the source-bound Information Mechanics claim cohort");
expect(atlasContent.includes("claimOwnerEdges"), "Lab Atlas must expose only the source-backed claim owner-program relationship in the initial claim cohort");
expect(atlasContent.includes('relation: "OWNER PROGRAM"'), "Claim edges must preserve owner-program semantics rather than imply validation");
expect(atlasContent.includes('/v3/claims#claim-'), "Claim Atlas nodes must route to exact native claim records");
expect(atlasContent.includes("claim.requiresValidation"), "Claim search must preserve validation posture");
expect(atlasContent.includes("claim.evidence"), "Claim search must preserve source evidence annotations");
expect(atlasContent.includes("machineryRecords.map"), "Lab Atlas must admit the source-bound machinery component cohort");
expect(atlasContent.includes('/v3/apparatus#machinery-'), "Machinery Atlas nodes must route to exact native machinery records");
expect(atlasContent.includes("machine.authorityCeiling"), "Machinery search must preserve authority ceilings");
expect(atlasContent.includes("machine.sideEffectClass"), "Machinery search must preserve side-effect classes");
expect(atlasContent.includes('/v3/publications#publication-'), "Publication Atlas nodes must deep-link exact publication records");
expect(atlasContent.includes("publication.sourceAuthority"), "Publication search must preserve source authority ceilings");
expect(atlasContent.includes("publication.dependencies"), "Publication search must preserve declared sequence dependencies");
expect(atlasContent.includes("publication.evidencePlan"), "Publication search must preserve graph evidence plans");
expect(atlasContent.includes("experimentResearchEdges"), "Lab Atlas must derive Experiment-to-Research edges from declared lane links");
expect(atlasContent.includes('relation: lane.role === "primary" ? "PRIMARY RESEARCH LANE" : "RELATED RESEARCH LANE"'), "Experiment edges must preserve primary versus secondary research-lane semantics");
expect(atlasContent.includes('/v3/experiments#experiment-'), "Experiment Atlas nodes must route to exact native experiment records");
expect(atlasContent.includes("experiment.acceptancePredicate"), "Experiment search must preserve acceptance predicates where present");
expect(atlasContent.includes("experiment.firewall"), "Experiment search must preserve authority firewalls");
expect(atlasContent.includes('/v3/evidence#evidence-'), "Evidence Atlas nodes must route back to their exact native surface");
expect(atlasContent.includes("searchTerms: [record.evidence, record.boundary]"), "Evidence search must preserve both basis and claim ceiling");
expect(!atlasContent.includes("identifier: record.surfaceKey"), "Atlas-local evidence routing keys must not become identifiers");
expect(atlasPage.includes("Research · Experiments · Claims · Machinery · Products · Projects · Publications · Evidence"), "Lab Atlas boundary copy must disclose the current Claim, Machinery, Experiment, and Evidence object families");
expect(commandPaletteContent.includes("node.searchTerms"), "Global object search must admit bounded object-specific search terms without inferring edges");
expect(!atlasContent.includes("similarity"), "Lab Atlas content model must not infer semantic edges from similarity");


const atlasRoute = read("src/app/v3/atlas/page.tsx");
expect(atlasRoute.includes("await searchParams"), "Atlas route must await Next.js searchParams before reading focus");
expect(atlasRoute.includes("initialFocus={focus}"), "Atlas route must pass focus as routing state into the institutional Atlas");
expect(atlasExplorer.includes("useRouter"), "Atlas explorer must use App Router navigation for focus-state URLs");
expect(atlasExplorer.includes("/v3/atlas?focus="), "Atlas explorer selection must preserve exact focus in the URL");


const changesPage = read(`${root}/InstitutionalChangesPage.tsx`);
const changesContent = read(`${root}/content/changes.ts`);
const homePageForChanges = read(`${root}/InstitutionalHomePage.tsx`);
const nowPageForChanges = read(`${root}/InstitutionalNowPage.tsx`);
expect(changesPage.includes("./content/changes"), "What changed route must consume the curated delta projection");
expect(changesPage.includes("State changes, not activity theater."), "What changed route must state its material-delta boundary");
expect(changesContent.includes('webRevision: "f6fc94a7dc84225c2718f16adef32b260775eb4f"'), "Change projection must pin the public web source revision");
expect(changesContent.includes('labRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Change projection must pin the Lab source revision");
expect(changesContent.includes("It reports selected material changes"), "Change projection must reject complete-activity-feed semantics");
expect(homePageForChanges.includes("<RecentChangesStrip"), "Homepage must surface the compact recent-change layer");
expect(nowPageForChanges.includes('title="What materially changed?"'), "Now page must surface recent material deltas");

const temporalViewNav = read(`${root}/TemporalViewNav.tsx`);
const publicStateContent = read(`${root}/content/publicState.ts`);
const publicStateProjection = read("src/generated/lab-public-state/public-state.json");
const labThroughTimePage = read(`${root}/InstitutionalLabThroughTimePage.tsx`);
const labThroughTimeRoute = read("src/app/v3/lab-through-time/page.tsx");
expect(temporalViewNav.includes("three temporal views"), "Temporal view navigation must explain the three time scales");
expect(temporalViewNav.includes('href={view.href}'), "Temporal view navigation must route from the shared projection model");
expect(nowPageForChanges.includes('<TemporalViewNav activeView="now"'), "Now must participate in the shared temporal navigation");
expect(changesPage.includes('<TemporalViewNav activeView="changes"'), "What Changed must participate in the shared temporal navigation");
expect(publicStateContent.includes("labTimelineEvents"), "Public state content must expose the Lab timeline seed");
expect(publicStateProjection.includes('"labRevision": "4be0a745d4e6f8148495c75ba727e04c1f21b21f"'), "Public state seed must pin the Lab source revision");
expect(publicStateProjection.includes('"projectionStatus": "initial_manual_seed"'), "Public state seed must disclose that cross-repo automation is not wired yet");
expect(publicStateProjection.includes('"id": "EVENT-TIMELINE-001"'), "Public timeline projection must use durable Timeline identities");
expect(publicStateProjection.includes('"id": "EVENT-TIMELINE-005"'), "Public timeline projection must preserve the current five-event seed boundary");
expect(labThroughTimePage.includes("Five events are a seed, not the complete history."), "Lab Through Time must disclose the incomplete seed boundary");
expect(labThroughTimePage.includes('<TemporalViewNav activeView="timeline"'), "Lab Through Time must participate in the shared temporal navigation");
expect(labThroughTimePage.includes("Milestones, not a long changelog."), "Lab Through Time must preserve the long-horizon materiality boundary");
expect(labThroughTimeRoute.includes('canonical: "/lab-through-time"'), "Lab Through Time must declare the canonical public route");
const nowPriorityExplorer = read(`${root}/NowPriorityExplorer.tsx`);
const changesExplorer = read(`${root}/ChangesExplorer.tsx`);
const labTimelineExplorer = read(`${root}/LabTimelineExplorer.tsx`);
for (const [name, source] of [
  ["Now priorities", nowPriorityExplorer],
  ["What Changed", changesExplorer],
  ["Lab Through Time", labTimelineExplorer],
]) {
  expect(source.includes("ReflowField"), name + " must use the shared BFUX reflow field");
  expect(source.includes('layoutMode="focus-stage"'), name + " must reallocate space around selected detail");
  expect(source.includes('restLayout="rectangle"'), name + " must present a compact rest-state field");
}
expect(nowPageForChanges.includes("<NowPriorityExplorer"), "Now must collapse priority detail into the reflow explorer");
expect(changesPage.includes("<ChangesExplorer"), "What Changed must collapse delta detail into the reflow explorer");
expect(labThroughTimePage.includes("<LabTimelineExplorer"), "Lab Through Time must collapse provenance detail into the reflow explorer");
expect(labThroughTimePage.includes("Accumulated practice + research"), "Lab Through Time must expose the pre-acceleration substrate");
expect(labThroughTimePage.includes("Commercial AI increases throughput"), "Lab Through Time must expose the computational acceleration boundary");
expect(labThroughTimePage.includes("Computationally leveraged micro-lab"), "Lab Through Time must connect acceleration to the current operating model");
expect(labThroughTimePage.includes("COMPUTATIONAL CAPABILITY"), "Lab Through Time must distinguish machine capability from authority");
expect(labThroughTimePage.includes("HUMAN AUTHORITY"), "Lab Through Time must preserve the founder authority boundary");
expect(labThroughTimePage.includes("Boundary First Labs became practical when decades of accumulated research"), "Lab Through Time hero must explain why the current Lab exists now");
expect(!labThroughTimePage.includes("continuitySection"), "Lab Through Time must not restore the redundant continuity interstitial");
expect(!labThroughTimePage.includes("NEXT PROJECTION WORK"), "Lab Through Time must keep projection backlog out of the public narrative flow");
expect(
  labThroughTimePage.indexOf("<ProvenanceArtifactGallery />") <
    labThroughTimePage.indexOf('className={styles.accelerationSection}'),
  "Lab Through Time must flow directly from provenance artifacts into the acceleration boundary",
);

const provenanceArtifactGallery = read(`${root}/ProvenanceArtifactGallery.tsx`);
const provenanceStillStrip = read(`${root}/ProvenanceStillStrip.tsx`);
const labThroughTimeCss = read(`${root}/styles/LabThroughTime.module.css`);
expect(labThroughTimePage.includes("<ProvenanceArtifactGallery"), "Lab Through Time must surface the first public provenance gallery");
expect(publicStateContent.includes("provenanceGallery"), "Public-state projection must type the provenance gallery");
expect(publicStateProjection.includes('"publicClaim": "A substantial pre-AI room-scale research environment existed."'), "Provenance projection must preserve the adjudicated narrow public claim");
expect(publicStateProjection.includes('"claimCeiling": "The media establishes scale, organization, and chronology of work.'), "Provenance projection must preserve the media authority ceiling");
for (const artifactPath of [
  "/provenance/lab-through-time/video-frame-01.jpg",
  "/provenance/lab-through-time/video-frame-02.jpg",
  "/provenance/lab-through-time/video-frame-03.jpg",
  "/provenance/lab-through-time/video-frame-04.jpg",
  "/provenance/lab-through-time/video-frame-05.jpg",
  "/provenance/lab-through-time/red-book-binder-top-right.jpg",
  "/provenance/lab-through-time/research-note-01.jpg",
  "/provenance/lab-through-time/technical-library-right-shelf.jpg",
]) {
  expect(publicStateProjection.includes(artifactPath), "Provenance projection must include " + artifactPath);
}
expect(provenanceArtifactGallery.includes("next/image"), "Provenance gallery must use Next Image for public artifacts");
expect(provenanceArtifactGallery.includes("WHAT THIS ESTABLISHES"), "Provenance gallery must separate evidence role from interpretation");
expect(provenanceArtifactGallery.includes("<ProvenanceStillStrip"), "Featured room provenance must use the stitched derived-video still strip");
expect(!provenanceArtifactGallery.includes("github.com"), "Public provenance gallery must not expose private-repository URLs");
expect(!provenanceArtifactGallery.includes("Inspect source"), "Public provenance gallery must not render private source-inspection links");
expect(!provenanceArtifactGallery.includes("PUBLIC USE"), "Public provenance cards must not render internal public-use adjudication rows");
expect(!provenanceArtifactGallery.includes("artifact.publicUse"), "Public provenance cards must keep public-use adjudication internal to projection data");
expect(labThroughTimeCss.includes(".provenanceMedia img"), "Provenance gallery must own explicit source-image framing");
expect(labThroughTimeCss.includes("object-fit: contain"), "Provenance images must show the whole source image rather than crop to fill");
expect(publicStateProjection.includes("red-book-binder-top-right.jpg"), "Red Book provenance must use the handpicked crop");
expect(publicStateProjection.includes("technical-library-right-shelf.jpg"), "Technical-library provenance must use the handpicked shelf crop");
expect(publicStateProjection.includes("ending at Deep Learning"), "Technical-library crop must preserve its declared right-edge framing");
expect(provenanceStillStrip.includes("sequence.frames.map"), "Research-room panorama must render every preserved frame simultaneously");
expect(!provenanceStillStrip.includes("useState"), "Research-room panorama must remain a static simultaneous evidence strip");
expect(labThroughTimeCss.includes("grid-template-columns: repeat(5, minmax(0, 1fr))"), "Research-room panorama must stitch all five frames side by side");
expect(labThroughTimeCss.includes("gap: 3px"), "Research-room panorama must preserve a small visible divider between frames");
expect(publicStateProjection.includes('"id": "ARTIFACT-PROV-ROOM-SURVEY"'), "Featured provenance object must identify the survey video rather than a single room photograph");
expect(publicStateProjection.includes('"sourceVideoSha256": "2e5af7f3a03a4041d29c3cb09b83aee546acccfda1543bdf58c1a40a664e8224"'), "Survey video projection must preserve original SHA-256 identity");
expect(publicStateProjection.includes("Exact extraction timestamps are not asserted"), "Survey still projection must not invent unverified timestamps");


expect(atlasContent.includes('version: "0.1"'), "Atlas must declare its frozen v0.1 public projection");
expect(atlasContent.includes("feature-frozen bounded public projection"), "Atlas v0.1 must declare feature-frozen status");


const startPage = read(`${root}/InstitutionalStartPage.tsx`);
const audiencesContent = read(`${root}/content/audiences.ts`);
const audienceGrid = read(`${root}/AudienceJourneyGrid.tsx`);
const homeForAudienceTraversal = read(`${root}/InstitutionalHomePage.tsx`);
const homeOrientationSection = read(`${root}/sections/HomeOrientationSection.tsx`);
expect(startPage.includes("./content/audiences"), "Start page must consume the canonical audience traversal model");
expect(startPage.includes("You do not need to understand the whole Lab first."), "Start page must lead with reduced orientation cost");
expect(startPage.includes("<AudienceJourneyGrid"), "Start page must compose the shared journey grid");
for (const audienceId of ["researcher", "engineer", "funder", "collaborator", "client", "critic", "curious"]) {
  expect(audiencesContent.includes(`id: "${audienceId}"`), `Audience traversal must expose ${audienceId}`);
}
expect((audiencesContent.match(/id: "/g) ?? []).length >= 7, "Audience traversal must expose all seven declared visitor paths");
expect(audiencesContent.includes('href: "/v3/contact?type=research-review&source=start-researcher"'), "Researcher path must terminate in typed research-review contact");
expect(audiencesContent.includes('href: "/v3/contact?type=applied-work&source=start-client"'), "Client path must terminate in typed applied-work contact");
expect(audiencesContent.includes('href: "/v3/contact?type=funding&source=start-funder"'), "Funder path must terminate in typed funding contact");
expect(audienceGrid.includes("journey.steps.map"), "Audience journey grid must render ordered steps from the shared model");
expect(audienceGrid.includes("@/components/bfux/ReflowField"), "Audience journey UI must use the BFUX ReflowField primitive");
expect(audienceGrid.includes("<ReflowField"), "Audience journey UI must expose a shared reflow field");
expect(audienceGrid.includes('layoutMode="focus-stage"'), "Audience journey UI must reflow into a focused stage on selection");
expect(audienceGrid.includes("itemOrder={itemOrder}"), "Audience journey reflow must preserve explicit source order");
expect(audienceGrid.includes("<ReflowFieldItem"), "Each audience path must be an inspectable reflow item");
expect(audienceGrid.includes("summary={<AudienceJourneySummary"), "Audience reflow must separate compact summary from expanded detail");
expect(audienceGrid.includes("detail={<AudienceJourneyDetail"), "Audience reflow must reveal ordered path detail only after selection");
expect(homeForAudienceTraversal.includes("<HomeOrientationSection"), "Homepage must delegate orientation content to HomeOrientationSection");
expect(homeOrientationSection.includes("homeAudienceJourneys"), "Homepage orientation section must reuse the same canonical audience traversal model");
expect(homeOrientationSection.includes("<AudienceJourneyGrid"), "Homepage orientation section must expose compact audience-specific traversal");
expect(!homeOrientationSection.includes("The same institution looks different depending on whether you came"), "Homepage audience lead must not repeat the audience-explanation paragraph");


expect(homeOrientationSection.includes("CHOOSE YOUR OWN PATH"), "Homepage audience layer must identify the reflow surface as Choose your own path");
expect(startPage.includes("CHOOSE YOUR OWN PATH"), "Start route must identify the full audience reflow surface as Choose your own path");


const representationAtlasPage = read(`${root}/InstitutionalRepresentationAtlasPage.tsx`);
const representationAtlasContent = read(`${root}/content/representationAtlas.ts`);
const representationAtlasExplorer = read(`${root}/RepresentationAtlasExplorer.tsx`);
expect(representationAtlasPage.includes("./content/representationAtlas"), "Representation Atlas route must own its comparative content model");
expect(representationAtlasPage.includes("<RepresentationAtlasExplorer"), "Representation Atlas route must mount the interactive explorer");
expect(representationAtlasPage.includes("One structural lens. Five very different worlds."), "Representation Atlas hero must lead with cross-domain structural comparison");
expect(representationAtlasPage.includes("mathematically equivalent."), "Representation Atlas hero must expose the non-equivalence firewall");
expect(representationAtlasContent.includes('sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15"'), "Representation Atlas must pin the Lab source revision");
for (const domainId of ["social", "knowledge", "strategy", "agency", "physical"]) {
  expect(representationAtlasContent.includes(`id: "${domainId}"`), `Representation Atlas must expose ${domainId} witness domain`);
}
for (const slotId of ["frame", "representation", "transport", "invariant", "defect", "repair"]) {
  expect(representationAtlasContent.includes(`id: "${slotId}"`), `Representation Atlas must expose ${slotId} mechanics slot`);
}
expect(representationAtlasContent.includes("Similar placement does not establish formal equivalence"), "Representation Atlas content model must preserve the comparative-lens authority ceiling");
expect(representationAtlasExplorer.includes('useState<RepresentationDomainId>("strategy")'), "Representation Atlas explorer must expose interactive domain selection");
expect(representationAtlasExplorer.includes('useState<RepresentationMechanicId>("representation")'), "Representation Atlas explorer must expose interactive mechanics selection");
expect(representationAtlasExplorer.includes("representationDomains.map"), "Representation Atlas explorer must render all witness domains from the shared model");
expect(representationAtlasExplorer.includes("representationMechanicSlots.map"), "Representation Atlas explorer must render the fixed mechanics spine");
expect(representationAtlasExplorer.includes("item.mechanics[mechanic.id]"), "Representation Atlas explorer must compare one selected mechanics role across domains");


const moonshotsFeature = read(`${root}/MoonshotsFeature.tsx`);
const moonshotsFeatureCss = read(`${root}/styles/MoonshotsFeature.module.css`);
const moonshotsResearchPage = read(`${root}/InstitutionalResearchPage.tsx`);
const moonshotsProjectsPage = read(`${root}/InstitutionalProjectsPage.tsx`);
const moonshotsOpenLabPage = read(`${root}/InstitutionalOpenLabPage.tsx`);
const moonshotsReleaseInventory = read("src/lib/site-release.ts");
const moonshotsChildRouteSegment = routeRegistry.slice(
  routeRegistry.indexOf("export const institutionalChildRoutes"),
  routeRegistry.indexOf("export const institutionalFooterGroups"),
);

expect(moonshotsFeature.includes('getNode("moonshots")'), "Moonshots feature must derive its parent object from the canonical content graph");
expect(moonshotsFeature.includes('getChildren("moonshots")'), "Moonshots feature must derive objectives from the canonical content graph");
expect(moonshotsFeature.includes('href="/research/moonshots"'), "Moonshots feature must route to the canonical Moonshots branch");
expect(moonshotsFeature.includes("Long-horizon objectives are not claims of completion"), "Moonshots feature must preserve the long-horizon claim boundary");
expect(moonshotsFeatureCss.includes(".moonshotsFeature"), "Moonshots feature must own a distinct visual treatment outside ordinary content-card grids");
expect(moonshotsFeature.includes("moonshotsFrame"), "Moonshots feature must use the v3 institutional framed-panel grammar");
expect(moonshotsFeature.includes("objectiveIndex"), "Moonshots feature must present objectives as a restrained index rather than ordinary content cards");
expect(!moonshotsFeature.includes("signalRail"), "Moonshots feature must not regress to the theatrical v2 signal-rail treatment");
expect(!moonshotsFeatureCss.includes("#081a38"), "Moonshots feature must not regress to the dark v2 hero palette");
expect(moonshotsFeatureCss.includes("var(--bfux-panel-edge-dark)"), "Moonshots feature must reuse the v3 BFUX panel edge system");
expect(moonshotsResearchPage.includes('<MoonshotsFeature context="research" />'), "Research must feature Moonshots as a standalone band");
expect(moonshotsProjectsPage.includes('<MoonshotsFeature context="projects" />'), "Projects must feature Moonshots as a standalone band");
expect(moonshotsOpenLabPage.includes('<MoonshotsFeature context="open-lab" />'), "Open Lab must feature Moonshots as a standalone band");
expect(moonshotsFeature.includes('const isOpenLab = context === "open-lab"'), "Open Lab Moonshots must own an explicit hierarchy variant");
expect(moonshotsFeature.includes("Moonshots — eight long-horizon objectives."), "Open Lab Moonshots must use the concise eight-objective title");
expect(moonshotsFeature.includes("The Lab invites criticism, counterexamples, specialist knowledge, and collaboration"), "Open Lab Moonshots must make criticism and collaboration the public invitation");
expect(!moonshotsFeature.includes("The long-horizon program should be exposed to outside pressure too."), "Open Lab Moonshots must not restore the verbose prior headline");
expect(!moonshotsFeature.includes("moonshotsIdentityTagline"), "Open Lab Moonshots must keep the simplified side identity free of duplicate tagline copy");
expect(moonshotsFeatureCss.includes('data-context="open-lab"'), "Open Lab Moonshots hierarchy must remain context-scoped");
expect(routeRegistry.includes('{ label: "Moonshots", href: "/research/moonshots" }'), "Research footer must link Moonshots directly");
expect(!moonshotsChildRouteSegment.includes("Moonshots"), "Moonshots must not be rendered as a contextual child-route button");
for (const route of [
  "/research/moonshots",
  "/research/moonshots/research-operating-system",
  "/research/moonshots/distributed-scientific-intelligence",
  "/research/moonshots/mathematical-interoperability",
  "/research/moonshots/executable-science",
  "/research/moonshots/formal-representation-mechanics",
  "/research/moonshots/self-improving-research-infrastructure",
  "/research/moonshots/millennium-problems-research",
  "/research/moonshots/fine-structure-constant",
]) {
  expect(moonshotsReleaseInventory.includes(`"${route}"`), `Release inventory must include ${route}`);
}


const moonshotsPage = read(`${root}/InstitutionalMoonshotsPage.tsx`);
const moonshotDetailPage = read(`${root}/InstitutionalMoonshotDetailPage.tsx`);
const moonshotsContent = read(`${root}/content/moonshots.ts`);
const moonshotsRoute = read("src/app/v3/research/moonshots/page.tsx");
const moonshotDetailRoute = read("src/app/v3/research/moonshots/[slug]/page.tsx");
const moonshotsRouteCss = read(`${root}/styles/Moonshots.module.css`);
const moonshotsContentGraph = read("src/lib/content.ts");

expect(moonshotsPage.includes("InstitutionalPageShell"), "Moonshots index must use the v3 institutional page shell");
expect(moonshotsPage.includes("InstitutionalRouteHero"), "Moonshots index must use the v3 institutional route hero");
expect(moonshotsPage.includes("objectiveLedger"), "Moonshots index must render objectives as a v3 ledger rather than legacy World cards");
expect(!moonshotsPage.includes("WorldApp"), "Moonshots index must never render through the legacy WorldApp");
expect(moonshotDetailPage.includes("InstitutionalPageShell"), "Moonshot detail routes must use the v3 institutional page shell");
expect(moonshotDetailPage.includes("detailBoundaryStrip"), "Moonshot detail routes must preserve an explicit claim boundary");
expect(!moonshotDetailPage.includes("WorldApp"), "Moonshot detail routes must never render through the legacy WorldApp");
expect(moonshotsContent.includes('parentId === moonshotsProgram.id'), "Moonshots v3 projection must derive objective membership from the canonical content graph");
expect(moonshotsRoute.includes("InstitutionalMoonshotsPage"), "Moonshots canonical rewrite target must resolve to the institutional index page");
expect(moonshotsRoute.includes('canonical: "/research/moonshots"'), "Moonshots route must preserve the canonical public path");
expect(moonshotDetailRoute.includes("generateStaticParams"), "Moonshot detail route must enumerate the canonical objective slugs");
expect(moonshotDetailRoute.includes("InstitutionalMoonshotDetailPage"), "Moonshot objective routes must resolve to the institutional detail page");
expect(moonshotsRouteCss.includes("var(--bfux-panel-edge-dark)"), "Moonshots route family must use the v3 BFUX panel grammar");
expect(!moonshotsRouteCss.includes("#081a38"), "Moonshots route family must not regress to the dark v2 World palette");
expect(moonshotsContentGraph.includes('id: "millennium-problems-research"'), "Moonshots content graph must include the Millennium Problems research program");
expect(moonshotsContentGraph.includes('id: "fine-structure-constant"'), "Moonshots content graph must include the fine-structure constant program");
expect(moonshotsContentGraph.includes("terminal success remains a valid mathematical proof"), "Millennium Problems Moonshot must preserve theorem-level proof authority");
expect(moonshotsContentGraph.includes("It does not yet contain a zero-free-parameter, first-principles derivation"), "Fine-structure Moonshot must preserve the current no-derivation claim ceiling");
expect(moonshotsContentGraph.includes("normalization obstruction"), "Fine-structure Moonshot must retain its strongest current negative result");
