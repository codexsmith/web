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
  "institutionalFormat.ts",
]) {
  expect(fs.existsSync(`${root}/${required}`), `missing shared component ${required}`);
}

const chrome = read(`${root}/InstitutionalChrome.tsx`);
const primitives = read(`${root}/InstitutionalPrimitives.tsx`);
const homePage = read(`${root}/InstitutionalHomePage.tsx`);

expect(chrome.startsWith('"use client";'), "Institutional chrome must own route/scroll interaction as a client boundary");
expect(chrome.includes("usePathname"), "Institutional header must derive active navigation from the current route");
expect(chrome.includes("IntersectionObserver"), "Institutional header must observe the route hero before compacting the brand");
expect(chrome.includes('data-header-compact={heroPassed ? "true" : "false"}'), "Institutional header must expose compact state to CSS");
expect(chrome.includes('aria-current={active ? "page" : undefined}'), "Institutional navigation must expose current-page semantics");
expect(primitives.includes("data-institutional-hero"), "Shared route heroes must identify themselves to the sticky header");
expect(homePage.includes("data-institutional-hero"), "Homepage hero must identify itself to the sticky header");

const foundationCss = read(`${root}/styles/InstitutionalFoundation.module.css`);
expect(foundationCss.includes('border-color: rgba(184, 154, 71, .46)'), "Institutional header must carry a muted antique-gold perimeter");
expect(foundationCss.includes("border-bottom-width: .5px"), "Institutional header bottom rule must remain the thinnest perimeter edge");
expect(foundationCss.includes('.header[data-header-compact="true"] {\n  min-height: 44px;'), "Post-hero header must physically contract to the compact rail");
expect(foundationCss.includes('.header[data-header-compact="true"] .logo {\n  width: 28px;\n  height: 28px;'), "Compact header must shrink the persistent logo");

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
    "InstitutionalOpenLabPage.tsx",
    "openLab"
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
      read(`${root}/sections/AboutReflowGroups.tsx`).includes("../content/about"));
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
  "InstitutionalOpenLabPage.tsx",
]) {
  const source = read(`${root}/${file}`);
  expect(source.includes("InstitutionalRouteHero"), `${file} must compose the shared route hero`);
}

expect(
  !fs.existsSync(`${root}/InstitutionalRoutePreview.tsx`),
  "obsolete route preview scaffold must stay removed",
);

const routeRegistry = read(`${root}/institutionalRoutes.ts`);
expect(!routeRegistry.includes('{ label: "Apparatus", href: "/v3/apparatus" },\n  { label: "Publications"'), "Apparatus must not remain in top-level institutional navigation");
expect(routeRegistry.includes("institutionalChildRoutes"), "route registry must expose contextual child-page navigation");
expect(routeRegistry.includes('research: [\n    { label: "Apparatus", href: "/v3/apparatus" }'), "Research must own Apparatus as a child-page link");
expect(routeRegistry.includes('openLab: [\n    { label: "Apparatus", href: "/v3/apparatus" }'), "Open Lab must expose Apparatus as a child-page link");
expect(primitives.includes("routeChildNav"), "shared route hero must render child-page navigation");
expect(primitives.includes("routeChildDependencyIcon"), "child-page cards must expose a dependency icon");
expect(primitives.includes("<small>DEPENDENCY</small>"), "child-page cards must label their dependency relationship");
expect(primitives.includes('aria-label="Child pages"'), "child-page navigation must expose semantic navigation labeling");
expect(!routeRegistry.includes("institutionalRouteFrontDoors"), "route registry must not duplicate page copy");
expect(!routeRegistry.includes("InstitutionalRouteFrontDoor"), "route registry must remain navigation-only");

const researchPage = read(`${root}/InstitutionalResearchPage.tsx`);
expect(researchPage.includes("childLinks={institutionalChildRoutes.research}"), "Research hero must expose Apparatus as a child page");
expect(researchPage.includes("<ResearchContextSection />"), "Research must compose its contextual bento as a section component");
expect(!researchPage.includes('id="reader-agency"'), "Research page must not inline Reflow Field context cards");
expect(fs.existsSync(`${root}/sections/ResearchContextSection.tsx`), "ResearchContextSection must exist as the route-local composition boundary");

const productsPage = read(`${root}/InstitutionalProductsPage.tsx`);
expect(productsPage.includes("<ProductContextSection />"), "Products must compose its commercialization context as a section component");
expect(!productsPage.includes('className={styles.productConversion}'), "Products page must not inline the superseded Research-to-Market section");
expect(!productsPage.includes('className={styles.productObjectGrammar}'), "Products page must not inline the superseded Public Product Object section");
expect(fs.existsSync(`${root}/sections/ProductContextSection.tsx`), "ProductContextSection must exist as the route-local composition boundary");

const projectsPage = read(`${root}/InstitutionalProjectsPage.tsx`);
expect(projectsPage.includes("<ProjectContextSection />"), "Projects must compose its transfer context as a section component");
expect(!projectsPage.includes('className={styles.transferEvidence}'), "Projects page must not inline Transfer Evidence");
expect(!projectsPage.includes('className={styles.projectNativeStatusRule}'), "Projects page must not inline Status Rule");
expect(!projectsPage.includes('className={styles.capabilityTransfer}'), "Projects page must not inline Capability Transfer");
expect(fs.existsSync(`${root}/sections/ProjectContextSection.tsx`), "ProjectContextSection must exist as the route-local composition boundary");

const openLabPage = read(`${root}/InstitutionalOpenLabPage.tsx`);
expect(openLabPage.includes("childLinks={institutionalChildRoutes.openLab}"), "Open Lab hero must expose Apparatus as a child page");
expect(openLabPage.includes("openLabHeroIntake"), "Open Lab must surface Intake Status in the hero");
expect(!openLabPage.includes('className={styles.openLabAvailability}'), "Open Lab must not keep Intake Status as a body section");
expect(openLabPage.includes('className={styles.openLabContracts}'), "Open Lab must keep Public Participation directly readable");
expect(openLabPage.includes("<OpenLabContextSection />"), "Open Lab must compose supporting sections as one context module");
expect(openLabPage.includes('className={styles.openLabClose}'), "Open Lab must keep Institutional Promise directly readable");
expect(fs.existsSync(`${root}/sections/OpenLabContextSection.tsx`), "OpenLabContextSection must exist as the route-local composition boundary");

const aboutPage = read(`${root}/InstitutionalAboutPage.tsx`);
expect(aboutPage.includes("<AboutReflowGroups />"), "About page must delegate grouped doctrine to the Reflow section component");
expect(aboutPage.indexOf("<AboutReflowGroups />") < aboutPage.indexOf('className={styles.aboutClose}'), "About closing synthesis must remain outside and after the Reflow chapters");
expect(fs.existsSync(`${root}/sections/AboutReflowGroups.tsx`), "AboutReflowGroups must exist as the About doctrine composition boundary");
const aboutGroups = read(`${root}/sections/AboutReflowGroups.tsx`);
expect((aboutGroups.match(/className={styles.aboutGroup}/g) || []).length === 3, "About Reflow component must preserve three narrative groups");
expect((aboutGroups.match(/<ReflowField/g) || []).length === 3, "About must use one Reflow field per narrative group");
expect(aboutGroups.includes('data-about-group="representation"'), "About must preserve Representation + Method");
expect(aboutGroups.includes('data-about-group="agency"'), "About must preserve Agency + Stewardship");
expect(aboutGroups.includes('data-about-group="institution"'), "About must preserve Institutional Practice");

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
expect(publicationCatalog.includes("publicationStubs"), "Publication catalog must use explicit stub records until source-governed documents are bound");
expect(publicationCatalog.includes("0 BOUND"), "Publication catalog must make the absence of canonical documents explicit");

console.log("Institutional component architecture passed.");
