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
  "institutionalFormat.ts",
]) {
  expect(fs.existsSync(`${root}/${required}`), `missing shared component ${required}`);
}

const chrome = read(`${root}/InstitutionalChrome.tsx`);
const primitives = read(`${root}/InstitutionalPrimitives.tsx`);
const labObjectIdentity = read(`${root}/LabObjectIdentity.tsx`);
const homePage = read(`${root}/InstitutionalHomePage.tsx`);
const homeContent = read(`${root}/content/home.ts`);

expect(chrome.startsWith('"use client";'), "Institutional chrome must own route/scroll interaction as a client boundary");
expect(chrome.includes("usePathname"), "Institutional header must derive active navigation from the current route");
expect(chrome.includes("IntersectionObserver"), "Institutional header must observe the route hero before compacting the brand");
expect(chrome.includes('data-header-compact={heroPassed ? "true" : "false"}'), "Institutional header must expose compact state to CSS");
expect(chrome.includes('aria-current={active ? "page" : undefined}'), "Institutional navigation must expose current-page semantics");
expect(primitives.includes("data-institutional-hero"), "Shared route heroes must identify themselves to the sticky header");
expect(labObjectIdentity.includes("data-kind={kind}"), "LabObjectIdentity must expose object-kind semantics to presentation");
expect(labObjectIdentity.includes("identifierLabel = \"ID\""), "LabObjectIdentity must distinguish source identifiers from local codes");
expect(labObjectIdentity.includes("statusLabel = \"STATUS\""), "LabObjectIdentity must preserve source-native status labeling");
expect(homePage.includes("data-institutional-hero"), "Homepage hero must identify itself to the sticky header");
expect(homeContent.includes('title: "Boundary First Weather"'), "Featured work slot four must be Boundary First Weather");
expect(homeContent.includes('href: "/v3/products/boundary-first-weather"'), "Featured Boundary First Weather must link to its immersive product page");
expect(homeContent.includes('href: "/v3/products/agentic-scientific-method"'), "Featured Agentic Scientific Method must link to its immersive product page");
expect(homeContent.includes('title: "YouTube Knowledge Explorer"'), "Featured work must use the YouTube Knowledge Explorer public name");
expect(homeContent.includes('href: "/v3/products/youtube-knowledge-explorer"'), "Featured YouTube Knowledge Explorer must link to its immersive product page");
expect(!homeContent.includes("Projectr"), "v3 homepage public naming must not expose Projectr");
expect(!homeContent.includes('title: "Public Infrastructure Analysis"'), "Public Infrastructure Analysis must no longer occupy featured work slot four");
expect(homePage.includes("item.href ?"), "Homepage featured work must support direct product entry links");
expect(homePage.includes("styles.inMotionSection"), "Homepage must expose the Lab in Motion institutional access layer");
expect(homeContent.includes("homeNowSnapshot"), "Homepage content must expose a current Now / Roadmap snapshot");
expect(homeContent.includes('href: "/v3/now"'), "Homepage Now snapshot must link to the public roadmap");
expect(homeContent.includes('href: "/v3/applied-work"'), "Homepage must expose Applied Work as an institutional front door");
expect(homeContent.includes('href: "/v3/collaboration"'), "Homepage must expose Collaboration as an institutional front door");
expect(homeContent.includes('href: "/v3/funding"'), "Homepage must expose Funding as an institutional front door");
expect(homeContent.includes("Externalize → test → repair → repeat → transfer."), "Homepage Now snapshot must preserve the current operating thesis");
expect(homePage.includes("homeInstitutionalFrontDoors.map"), "Homepage institutional front doors must render from the content model");

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
    "InstitutionalEvidencePage.tsx",
    "evidence"
  ],
  [
    "InstitutionalNowPage.tsx",
    "now"
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
  "InstitutionalEvidencePage.tsx",
  "InstitutionalNowPage.tsx",
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
expect(!routeRegistry.includes('{ label: "Apparatus", href: "/v3/apparatus" },\n  { label: "Publications"'), "Apparatus must not remain in top-level institutional navigation");
expect(!topLevelRouteRegistry.includes('/v3/funding'), "Funding must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/apparatus'), "Apparatus must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/founder'), "Founder must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/collaboration'), "Collaboration must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/applied-work'), "Applied Work must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/evidence'), "Evidence must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/now'), "Now / Roadmap must remain a contextual child route rather than top-level navigation");
expect(!topLevelRouteRegistry.includes('/v3/contact'), "Contact must remain outside top-level header navigation");
expect(!topLevelRouteRegistry.includes('/v3/atlas'), "Lab Atlas must remain a contextual route rather than top-level navigation");
expect(routeRegistry.includes("institutionalChildRoutes"), "route registry must expose contextual child-page navigation");
expect(routeRegistry.includes("institutionalFooterRoutes"), "route registry must expose an explicit footer route collection");
expect(routeRegistry.includes('{ label: "Apparatus", href: "/v3/apparatus" }'), "footer route collection must include Apparatus");
expect(routeRegistry.includes('{ label: "Lab Atlas", href: "/v3/atlas" }'), "footer route collection must include Lab Atlas");
expect(routeRegistry.includes('{ label: "Founder", href: "/v3/founder" }'), "footer route collection must include Founder");
expect(routeRegistry.includes('{ label: "Collaboration", href: "/v3/collaboration" }'), "footer route collection must include Collaboration");
expect(routeRegistry.includes('{ label: "Applied Work", href: "/v3/applied-work" }'), "footer route collection must include Applied Work");
expect(routeRegistry.includes('{ label: "Evidence", href: "/v3/evidence" }'), "footer route collection must include Evidence");
expect(routeRegistry.includes('{ label: "Now", href: "/v3/now" }'), "footer route collection must include Now / Roadmap");
expect(routeRegistry.includes('{ label: "Contact", href: "/v3/contact" }'), "footer route collection must include Contact");

const childRouteContracts = [
  ["about", ["funding", "appliedWork", "evidence", "now", "collaboration", "founder"]],
  ["research", ["atlas", "apparatus", "funding", "now", "collaboration"]],
  ["products", ["appliedWork", "evidence", "collaboration"]],
  ["projects", ["appliedWork", "evidence", "now", "collaboration"]],
  ["funding", ["appliedWork", "evidence", "now"]],
  ["collaboration", ["appliedWork"]],
  ["appliedWork", ["evidence"]],
  ["founder", ["evidence"]],
  ["evidence", ["now"]],
  ["openLab", ["apparatus", "funding", "now", "collaboration"]],
];

for (const [routeKey, childKeys] of childRouteContracts) {
  const routeStart = routeRegistry.indexOf(`  ${routeKey}: [`);
  expect(routeStart >= 0, `${routeKey} must exist in institutionalChildRoutes`);
  const routeEnd = routeRegistry.indexOf("  ],", routeStart);
  const routeSlice = routeRegistry.slice(routeStart, routeEnd);
  for (const childKey of childKeys) {
    expect(
      routeSlice.includes(`institutionalChildPages.${childKey}`),
      `${routeKey} must expose ${childKey} as a contextual child route`,
    );
  }
}

expect(primitives.includes("routeChildNav"), "shared route hero must render child-page navigation");
expect(primitives.includes("routeChildIcon"), "child-page cards must expose typed relationship icons");
expect(primitives.includes("<small>{link.relation}</small>"), "child-page cards must render their relationship label");
expect(primitives.includes('aria-label="Child pages"'), "child-page navigation must expose semantic navigation labeling");
expect(!routeRegistry.includes("institutionalRouteFrontDoors"), "route registry must not duplicate page copy");
expect(!routeRegistry.includes("InstitutionalRouteFrontDoor"), "route registry must remain navigation-only");
expect(chrome.includes("institutionalFooterGroups"), "footer must use grouped institutional footer navigation");
expect(chrome.includes("institutionalFooterGroups.map"), "footer must render grouped footer navigation");

const researchPage = read(`${root}/InstitutionalResearchPage.tsx`);
expect(researchPage.includes("childLinks={institutionalChildRoutes.research}"), "Research hero must expose its contextual child pages");
expect(researchPage.includes("<ResearchContextSection />"), "Research must compose its contextual bento as a section component");
expect(!researchPage.includes('id="reader-agency"'), "Research page must not inline Reflow Field context cards");
expect(fs.existsSync(`${root}/sections/ResearchContextSection.tsx`), "ResearchContextSection must exist as the route-local composition boundary");

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
expect(openLabPage.includes("childLinks={institutionalChildRoutes.openLab}"), "Open Lab hero must expose its contextual child pages");
expect(openLabPage.includes("openLabHeroIntake"), "Open Lab must surface Intake Status in the hero");
expect(!openLabPage.includes('className={styles.openLabAvailability}'), "Open Lab must not keep Intake Status as a body section");
expect(openLabPage.includes('className={styles.openLabContracts}'), "Open Lab must keep Public Participation directly readable");
expect(openLabPage.includes("<OpenLabContextSection />"), "Open Lab must compose supporting sections as one context module");
expect(openLabPage.includes('className={styles.openLabClose}'), "Open Lab must keep Institutional Promise directly readable");
expect(openLabPage.includes('/v3/contact?type=open-lab&source=open-lab'), "Open Lab must expose conversational contact without opening formal submission");
expect(fs.existsSync(`${root}/sections/OpenLabContextSection.tsx`), "OpenLabContextSection must exist as the route-local composition boundary");

const aboutPage = read(`${root}/InstitutionalAboutPage.tsx`);
expect(aboutPage.includes("childLinks={institutionalChildRoutes.about}"), "About hero must expose its contextual child pages");
expect(aboutPage.includes("<AboutReflowGroups />"), "About page must delegate grouped doctrine to the Reflow section component");
expect(aboutPage.indexOf("<AboutReflowGroups />") < aboutPage.indexOf('className={styles.aboutClose}'), "About closing synthesis must remain outside and after the Reflow chapters");
expect(fs.existsSync(`${root}/sections/AboutReflowGroups.tsx`), "AboutReflowGroups must exist as the About doctrine composition boundary");
const aboutGroups = read(`${root}/sections/AboutReflowGroups.tsx`);
expect((aboutGroups.match(/className={styles.aboutGroup}/g) || []).length === 3, "About Reflow component must preserve three narrative groups");
expect((aboutGroups.match(/<ReflowField(?:\s|>)/g) || []).length === 3, "About must use one Reflow field per narrative group");
expect(aboutGroups.includes('data-about-group="representation"'), "About must preserve Representation + Method");
expect(aboutGroups.includes('data-about-group="agency"'), "About must preserve Agency + Stewardship");
expect(aboutGroups.includes('data-about-group="institution"'), "About must preserve Institutional Practice");

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
expect(evidencePage.includes("What has actually been demonstrated?"), "Evidence hero must lead with the evaluation question");
expect(evidenceContent.includes("EXTERNALLY CORROBORATED"), "Evidence must distinguish external corroboration");
expect(evidenceContent.includes("PROFESSIONAL RECORD"), "Evidence must distinguish founder professional provenance");
expect(evidenceContent.includes("BFL-NATIVE + INSPECTABLE"), "Evidence must distinguish BFL-native artifacts");
expect(evidenceContent.includes("EMERGING / NOT YET ESTABLISHED"), "Evidence must expose proof gaps");
expect(evidenceContent.includes("Prior career != BFL traction"), "Evidence must forbid prior-career inflation into BFL traction");
expect(evidencePage.includes("EVIDENCE STILL TO EARN"), "Evidence page must expose the next proof points directly");
expect(evidencePage.includes("childLinks={institutionalChildRoutes.evidence}"), "Evidence hero must expose Now / Roadmap as a child page");

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
expect(founderPage.includes("./content/founder"), "Founder page must own a route-local content model");
expect(founderPage.includes("Nicholas T. Smith"), "Founder page must identify Nicholas T. Smith");
expect(founderPage.includes("computer scientist, systems engineer"), "Founder hero must state the requested professional identity");
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
expect(apparatusPage.includes("<ApparatusContextSection />"), "Apparatus must compose its supporting machinery as a section component");
expect(apparatusPage.includes('className={styles.instrumentBench}'), "Instrument Bench must remain directly composed on the Apparatus page");
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
expect(publicationsCatalogForObjects.includes("status={publication.recordState}"), "Publication identity must preserve record state");


const atlasPage = read(`${root}/InstitutionalAtlasPage.tsx`);
const atlasExplorer = read(`${root}/LabAtlasExplorer.tsx`);
const atlasContent = read(`${root}/content/atlas.ts`);
expect(atlasPage.includes("<LabAtlasExplorer />"), "Lab Atlas route must compose the relationship explorer");
expect(atlasExplorer.startsWith('"use client";'), "Lab Atlas relationship selection must remain inside a bounded client component");
expect(atlasExplorer.includes("LabObjectIdentity"), "Lab Atlas inspector must reuse the canonical object identity grammar");
expect(atlasContent.includes("export const atlasEdges"), "Lab Atlas relationships must live in an explicit content model");
expect(atlasContent.includes("PROJECT CASE OF"), "Lab Atlas must declare project-to-product relationships explicitly");
expect(atlasContent.includes("PUBLIC PRODUCT SURFACE"), "Lab Atlas must declare the ASM research-to-product relationship explicitly");
expect(!atlasContent.includes("similarity"), "Lab Atlas content model must not infer semantic edges from similarity");
