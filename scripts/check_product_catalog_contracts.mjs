import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

function requireAbsent(source, pattern, message) {
  if (pattern.test(source)) throw new Error(message);
}

const catalog = read("src/lib/product-catalog.ts");
const content = read("src/lib/content.ts");
const publications = read("src/lib/publication-portfolio.ts");
const manifest = JSON.parse(read("src/content/product-landing-pages/manifest.json"));
const worldView = read("src/components/world-view.tsx");
const layout = read("src/app/layout.tsx");
const css = read("src/app/p15-product-catalog.css");
const packageJson = read("package.json");

const requiredGroups = [
  "software-systems",
  "methods-standards-services",
  "research-testbeds",
  "public-artifacts",
];

for (const groupId of requiredGroups) {
  requireMatch(catalog, new RegExp(`id:\\s*\\"${groupId}\\"`), `Products catalog is missing group: ${groupId}`);
}

const requiredBaseNodeEntries = [
  "corpus-forge",
  "projectr",
  "youtube-knowledge-explorer",
  "cross-platform-bookshelf",
  "need-capacity-map",
  "agency-audit",
  "boundary-first-engineering",
  "ontological-software",
  "executable-representation",
  "boundary-first-architecture",
  "boundary-first-ux",
  "verification-governance",
  "boundary-first-weather",
  "boundary-first-chess",
  "boundary-first-soccer",
  "constitutional-law",
  "schemathematics",
  "citywatch",
  "augusta-civic",
];

for (const nodeId of requiredBaseNodeEntries) {
  requireMatch(catalog, new RegExp(`nodeId:\\s*\\"${nodeId}\\"`), `Products catalog is missing canonical node: ${nodeId}`);
  requireMatch(content, new RegExp(`id:\\s*\\"${nodeId}\\"`), `Products catalog references unknown content node: ${nodeId}`);
}

const requiredPublicationInstrumentEntries = [
  "pub-consequence-bearing-development",
  "pub-bounded-consequence-circuit",
  "pub-people-review-worksheet",
  "pub-language-garden",
  "pub-operational-homology",
  "pub-original-visual-grammar",
  "pub-civilizational-first-passage",
];

for (const nodeId of requiredPublicationInstrumentEntries) {
  requireMatch(catalog, new RegExp(`nodeId:\\s*\\"${nodeId}\\"`), `Products catalog is missing publication-born instrument: ${nodeId}`);
  requireMatch(publications, new RegExp(`id:\\s*\\"${nodeId}\\"`), `Products catalog references unknown publication instrument: ${nodeId}`);
}

const requiredRouteEntries = [
  ["software-before-code", "/software-before-code"],
  ["closure-driven-software-development", "/closure-driven-software-development"],
  ["paper-mine", "/research/paper-mine"],
  ["founder-provenance-timeline", "/about/provenance/timeline"],
];

for (const [id, href] of requiredRouteEntries) {
  requireMatch(catalog, new RegExp(`id:\\s*\\"${id}\\"`), `Products catalog is missing route entry: ${id}`);
  requireMatch(catalog, new RegExp(`href:\\s*\\"${href.replaceAll("/", "\\/")}\\"`), `Products catalog route mismatch for: ${id}`);
}

const landingIdToCatalogId = {
  "boundary-first-ux": "boundary-first-ux",
  "software-before-code": "software-before-code",
  "closure-driven-software-development": "closure-driven-software-development",
  "boundary-first-weather": "boundary-first-weather",
  "constitutional-law-and-jurisprudence": "constitutional-law",
  "boundary-first-chess": "boundary-first-chess",
  "boundary-first-soccer": "boundary-first-soccer",
  "corpus-forge": "corpus-forge",
  "agency-representation-audit": "agency-audit",
  "schemathematics": "schemathematics",
};

const publicLandingPages = manifest.pages.filter(
  (page) => page.visibility === "public" && page.routingEligibility === "public-candidate",
);

for (const page of publicLandingPages) {
  const catalogId = landingIdToCatalogId[page.id];
  if (!catalogId) {
    throw new Error(`Public landing candidate is not mapped into the Products catalog contract: ${page.id}`);
  }
  requireMatch(
    catalog,
    new RegExp(`(?:nodeId|id):\\s*\\"${catalogId}\\"`),
    `Public landing candidate is missing from Products catalog: ${page.id}`,
  );
}

const heldOrUnlistedEntries = [
  "corpus-forge-workbench",
  "learning-navigator",
  "ground-news",
  "gothamchess",
  "boundary-first-robocup",
];

for (const id of heldOrUnlistedEntries) {
  requireAbsent(catalog, new RegExp(`(?:nodeId|id):\\s*\\"${id}\\"`), `Held or unlisted entry leaked into public Products catalog: ${id}`);
}

requireMatch(
  catalog,
  /Publication objects are cross-listed[\s\S]*method, protocol, instrument, learning surface,[\s\S]*rather than merely because a manuscript exists/,
  "Products catalog must keep a functional threshold for publication cross-listing.",
);

requireMatch(
  worldView,
  /renderedNode\.id === "products"[\s\S]*?<ProductsWorld/,
  "WorldView must render the dedicated cross-cutting ProductsWorld for the products node.",
);
requireMatch(
  worldView,
  /onNavigate\(entry\.nodeId, "cross"\)/,
  "Canonical catalog node cards must traverse cross-tree instead of changing canonical parentage.",
);
requireMatch(
  worldView,
  /href=\{entry\.href\}/,
  "Standalone public product artifacts must retain their canonical route hrefs.",
);
requireMatch(
  worldView,
  /Canonical home:\s*\{canonicalHome\}/,
  "Catalog cards must expose canonical home rather than implying Products owns every object.",
);
requireMatch(
  worldView,
  /<h2>Lifecycle views<\/h2>[\s\S]*?<RegionGrid node=\{node\} regions=\{regions\}/,
  "The previous lifecycle hierarchy must remain available as a secondary Products projection.",
);

requireMatch(css, /\.product-catalog-grid\s*\{/, "Product catalog grid styling is missing.");
requireMatch(css, /\.product-catalog-card\s*\{/, "Product catalog card styling is missing.");
requireMatch(
  css,
  /\.product-catalog-group\s*\{[\s\S]*grid-template-columns:\s*minmax\(12rem,\s*0\.34fr\)\s*minmax\(0,\s*1fr\)/,
  "Desktop Products families must use the compact family-rail layout.",
);
requireMatch(
  css,
  /\.product-catalog-group::before\s*\{[\s\S]*var\(--bf-action\)/,
  "Products family rail must retain a functional section accent.",
);
requireMatch(
  css,
  /\.product-catalog-card\s*>\s*p\s*\{[\s\S]*-webkit-line-clamp:\s*3/,
  "Products card summaries must remain bounded for catalog density.",
);
requireMatch(
  css,
  /\.products-world\s*>\s*\.world-hero\s+\.subject-pane--glance\s*\{\s*display:\s*none;/,
  "Products hero must not repeat the catalog explanation in a second glance panel.",
);

const p14Index = layout.indexOf('import "./p14-root-instrumentation.css";');
const p15Index = layout.indexOf('import "./p15-product-catalog.css";');
if (p14Index < 0 || p15Index < 0 || p15Index < p14Index) {
  throw new Error("p15 product catalog refinement must be imported after p14 root instrumentation.");
}

requireMatch(
  packageJson,
  /node scripts\/check_product_catalog_contracts\.mjs/,
  "contracts:check must run the Products catalog contract checker.",
);

console.log("Product catalog contracts passed.");
