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

const pageShell = read(`${root}/InstitutionalPageShell.tsx`);
expect(pageShell.includes("<InstitutionalHeader />"), "PageShell must own the shared header");
expect(pageShell.includes("<InstitutionalFooter />"), "PageShell must own the shared footer");
expect(pageShell.includes("<main"), "PageShell must own the semantic main boundary");

const routeContracts = [
  [
    "InstitutionalHomePreview.tsx",
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
  expect(source.includes(`./content/${slug}`), `${file} must import its content model`);
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
expect(!routeRegistry.includes("institutionalRouteFrontDoors"), "route registry must not duplicate page copy");
expect(!routeRegistry.includes("InstitutionalRouteFrontDoor"), "route registry must remain navigation-only");

console.log("Institutional component architecture passed.");
