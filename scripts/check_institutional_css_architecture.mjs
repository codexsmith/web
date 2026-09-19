import fs from "node:fs";

const root = "src/components/institutional";
const stylesRoot = `${root}/styles`;
const read = (path) => fs.readFileSync(path, "utf8");
const expect = (condition, message) => {
  if (!condition) throw new Error(`Institutional CSS architecture failed: ${message}`);
};

expect(
  !fs.existsSync(`${root}/InstitutionalHomePreview.module.css`),
  "legacy monolithic stylesheet must stay removed",
);

const requiredStyles = [
  "InstitutionalFoundation.module.css",
  "InstitutionalRouteShared.module.css",
  "LabObjectIdentity.module.css",
  "LabCommandPalette.module.css",
  "RecentChangesStrip.module.css",
  "AudienceJourneyGrid.module.css",
  "Research.module.css",
  "Products.module.css",
  "ProductExperience.module.css",
  "BoundaryFirstChess.module.css",
  "BoundaryFirstWeather.module.css",
  "YouTubeKnowledgeExplorer.module.css",
  "AgenticScientificMethod.module.css",
  "Projects.module.css",
  "Apparatus.module.css",
  "Publications.module.css",
  "About.module.css",
  "Funding.module.css",
  "Founder.module.css",
  "Collaboration.module.css",
  "AppliedWork.module.css",
  "Evidence.module.css",
  "Experiments.module.css",
  "Claims.module.css",
  "Now.module.css",
  "Changes.module.css",
  "Start.module.css",
  "Contact.module.css",
  "OpenLab.module.css",
  "Atlas.module.css",
  "RepresentationAtlas.module.css",
];

for (const file of requiredStyles) {
  expect(fs.existsSync(`${stylesRoot}/${file}`), `missing style module ${file}`);
}

const foundation = read(`${stylesRoot}/InstitutionalFoundation.module.css`);
const routeShared = read(`${stylesRoot}/InstitutionalRouteShared.module.css`);
const labObjectIdentity = read(`${stylesRoot}/LabObjectIdentity.module.css`);
const commandPaletteCss = read(`${stylesRoot}/LabCommandPalette.module.css`);
const atlasCss = read(`${stylesRoot}/Atlas.module.css`);
const audienceJourneyCss = read(`${stylesRoot}/AudienceJourneyGrid.module.css`);
const representationAtlasCss = read(`${stylesRoot}/RepresentationAtlas.module.css`);

for (const token of ["--royal-blue", "--old-gold", "--osha-red", "--osha-green"]) {
  expect(foundation.includes(token), `Foundation must own design token ${token}`);
}

for (const sharedClass of [".routeLead", ".routeSupport", ".routeHero", ".routeMain"]) {
  expect(routeShared.includes(sharedClass), `RouteShared must own ${sharedClass}`);
}

expect(foundation.includes(".nav a"), "Foundation must own shared navigation behavior");
expect(foundation.includes(".footerNav a"), "Foundation must own shared footer navigation behavior");
expect(foundation.includes(".audienceEntrySection"), "Homepage foundation must style audience-specific traversal");
expect(foundation.includes(".audienceEntryLink"), "Homepage foundation must expose the full Start here path from the compact journey layer");
expect(foundation.includes("grid-template-columns: auto minmax(0, 1fr) auto"), "Header must end with a three-column desktop placement guard");
expect(foundation.includes(".headerTools {\n  grid-column: 3;"), "Desktop header tools must occupy the explicit third column");
expect(foundation.includes(".nav {\n  grid-column: 2;"), "Desktop primary navigation must remain on the first header row");
expect(audienceJourneyCss.includes("--reflow-columns: 12"), "Audience journey field must define the reflow grid");
expect(audienceJourneyCss.includes("--reflow-selected-span: 10"), "Audience journey field must reserve a centered focal stage");
expect(audienceJourneyCss.includes('.journey[data-reflow-state="selected"]'), "Audience journey styling must distinguish the selected focal state");
expect(audienceJourneyCss.includes(".fieldCompact"), "Audience journey reflow must support the compact homepage projection");
expect(audienceJourneyCss.includes("min-height: 0"), "Audience journey cards must not force artificial minimum height");
expect(audienceJourneyCss.includes("align-items: start"), "Audience reflow must top-align content-sized cards");
expect(audienceJourneyCss.includes("grid-auto-rows: max-content"), "Audience reflow rows must size to card content");
expect(audienceJourneyCss.includes("font-size: .58rem"), "Compact audience path tags must remain legible at the larger tag scale");
expect(foundation.includes("align-items: start"), "Homepage audience section must not stretch the reflow field to the lead column");
expect(audienceJourneyCss.includes("@media (max-width: 720px)"), "Audience journey reflow must collapse to a single-column mobile field");
expect(representationAtlasCss.includes(".mechanicsCircuit"), "Representation Atlas must style the six-slot mechanics circuit");
expect(representationAtlasCss.includes("grid-template-columns: repeat(6,minmax(0,1fr))"), "Representation Atlas mechanics circuit must expose all six structural roles on wide screens");
expect(representationAtlasCss.includes(".compareRows"), "Representation Atlas must style cross-domain role comparison");
expect(representationAtlasCss.includes('[data-tone="violet"]'), "Representation Atlas must preserve distinct witness-domain tones");
expect(representationAtlasCss.includes('[data-tone="green"]'), "Representation Atlas must preserve the physical witness-domain tone");
expect(representationAtlasCss.includes("@media (max-width: 720px)"), "Representation Atlas must collapse its interaction for mobile");
expect(foundation.includes("flex-wrap: wrap"), "footer navigation must wrap when contextual child routes are exposed");
expect(!routeShared.includes(".nav a"), "RouteShared must not own shared site chrome");
expect(!routeShared.includes(".footerNav a"), "RouteShared must not own shared site chrome");
expect(labObjectIdentity.includes('[data-kind="product"]'), "Lab object identity must expose object-family accents");
expect(labObjectIdentity.includes('[data-variant="compact"]'), "Lab object identity must support compact embedding inside cards");
expect(labObjectIdentity.includes('[data-appearance="inverse"]'), "Lab object identity must support inverse product-hero presentation");
expect(commandPaletteCss.includes(".dialog::backdrop"), "Lab command palette must own a modal backdrop");
expect(commandPaletteCss.includes('[data-active="true"]'), "Lab command palette must expose keyboard-active result state");
expect(commandPaletteCss.includes('[data-kind="research"]'), "Lab command palette must preserve object-kind visual distinction");
expect(commandPaletteCss.includes('[data-kind="evidence"]'), "Lab command palette must preserve Evidence object distinction");
expect(commandPaletteCss.includes('[data-kind="experiment"]'), "Lab command palette must preserve Experiment object distinction");
expect(commandPaletteCss.includes('[data-kind="apparatus"]'), "Lab command palette must preserve Apparatus object distinction");
expect(commandPaletteCss.includes('[data-kind="claim"]'), "Lab command palette must preserve Claim object distinction");
expect(atlasCss.includes('.kindGroup[data-kind="evidence"]'), "Lab Atlas must preserve Evidence object-family distinction");
expect(atlasCss.includes('.kindGroup[data-kind="experiment"]'), "Lab Atlas must preserve Experiment object-family distinction");
expect(atlasCss.includes('.kindGroup[data-kind="apparatus"]'), "Lab Atlas must preserve Apparatus object-family distinction");
expect(atlasCss.includes('.kindGroup[data-kind="claim"]'), "Lab Atlas must preserve Claim object-family distinction");
expect(labObjectIdentity.includes('[data-kind="evidence"]'), "Lab object identity must preserve Evidence semantics");
expect(labObjectIdentity.includes('[data-kind="claim"]'), "Lab object identity must preserve Claim semantics");
expect(routeShared.includes("grid-template-rows: repeat(3, auto)"), "child-page navigation must cap desktop stacks at three cards tall");
expect(routeShared.includes("grid-auto-flow: column"), "child-page navigation must flow additional links into new columns");
expect(routeShared.includes(".routeChildLinks:has(> .routeChildLink:nth-child(4):last-child)"), "exactly four child-page links must rebalance into a two-by-two grid");
expect(routeShared.includes("min-height: 58px"), "child-page cards must remain compact enough for dense contextual navigation");
expect(routeShared.includes("grid-auto-columns: minmax(200px, 1fr)"), "child-page columns must preserve a hard readable minimum width");
expect(routeShared.includes("min-width: 200px"), "child-page links must not collapse below their readable label width");
expect(routeShared.includes("white-space: nowrap"), "child-page labels must remain intact rather than hyphenating across lines");
const products = read(`${stylesRoot}/Products.module.css`);
const productExperience = read(`${stylesRoot}/ProductExperience.module.css`);
const boundaryFirstChess = read(`${stylesRoot}/BoundaryFirstChess.module.css`);
const boundaryFirstWeather = read(`${stylesRoot}/BoundaryFirstWeather.module.css`);
const youtubeKnowledgeExplorer = read(`${stylesRoot}/YouTubeKnowledgeExplorer.module.css`);
const agenticScientificMethod = read(`${stylesRoot}/AgenticScientificMethod.module.css`);
expect(products.includes(".primaryProductCard:focus-visible"), "Clickable primary product cards must expose keyboard focus");
expect(products.includes(".primaryProductCard:hover .productDetailLink span"), "Full-card product hover must animate its directional cue");
expect(productExperience.includes(".productExperienceHero"), "shared product-detail stylesheet must own the immersive hero");
expect(productExperience.includes(".productExperienceNav"), "shared product-detail stylesheet must own local sticky navigation");
expect(productExperience.includes('[data-product-theme="weather"]'), "shared product-detail stylesheet must expose a Weather visual theme");
expect(productExperience.includes('[data-product-theme="explorer"]'), "shared product-detail stylesheet must expose an Explorer visual theme");
expect(productExperience.includes('[data-product-theme="asm"]'), "shared product-detail stylesheet must expose an ASM visual theme");
expect(boundaryFirstChess.includes(".chessBoard"), "Boundary-First Chess must own a board visualization");
expect(boundaryFirstChess.includes(".chessLensControls"), "Boundary-First Chess must own interactive analysis-lens controls");
expect(boundaryFirstWeather.includes(".weatherField"), "Boundary First Weather must own a simulation-field visualization");
expect(boundaryFirstWeather.includes(".weatherModeControls"), "Boundary First Weather must own interactive diagnostic-mode controls");
expect(boundaryFirstWeather.includes(".weatherClaimLadder"), "Boundary First Weather must expose the W0-W5 claim ladder");
expect(youtubeKnowledgeExplorer.includes(".explorerVideo"), "YouTube Knowledge Explorer must own a source-video visualization");
expect(youtubeKnowledgeExplorer.includes(".explorerModeControls"), "YouTube Knowledge Explorer must own interactive exploration-mode controls");
expect(youtubeKnowledgeExplorer.includes(".explorerArchitectureStack"), "YouTube Knowledge Explorer must expose the portable-core architecture stack");
expect(agenticScientificMethod.includes(".asmPhaseGroups"), "Agentic Scientific Method must own an inquiry-state machine visualization");
expect(agenticScientificMethod.includes(".asmTwinSpaces"), "Agentic Scientific Method must visualize represented and observed state spaces");
expect(agenticScientificMethod.includes(".asmValidationLadder"), "Agentic Scientific Method must expose its validation ladder");

const publicationCss = read(`${stylesRoot}/Publications.module.css`);
expect(publicationCss.includes(".publicationControlSources"), "Publications must style the three publication-control authorities");
expect(publicationCss.includes(".publicationSourceContract"), "Publications must style source-record provenance contracts");
expect(publicationCss.includes(".publicationControlDetails"), "Publications must style source governance details");
expect(publicationCss.includes(".publicationAuthorityFirewall"), "Publications must style per-record authority ceilings");

const apparatusCss = read(`${stylesRoot}/Apparatus.module.css`);
expect(apparatusCss.includes(".machineryRegistry"), "Apparatus must style the registered machinery surface");
expect(apparatusCss.includes(".machineryGrid"), "Apparatus must style the machinery object grid");
expect(apparatusCss.includes(".machineryAuthorityGrid"), "Apparatus must preserve authority and integration-step distinction");

const routeContracts = [
  ["InstitutionalResearchPage.tsx", "Research.module.css"],
  ["InstitutionalProductsPage.tsx", "Products.module.css"],
  ["InstitutionalProjectsPage.tsx", "Projects.module.css"],
  ["InstitutionalApparatusPage.tsx", "Apparatus.module.css"],
  ["InstitutionalPublicationsPage.tsx", "Publications.module.css"],
  ["InstitutionalAboutPage.tsx", "About.module.css"],
  ["InstitutionalFundingPage.tsx", "Funding.module.css"],
  ["InstitutionalFounderPage.tsx", "Founder.module.css"],
  ["InstitutionalCollaborationPage.tsx", "Collaboration.module.css"],
  ["InstitutionalAppliedWorkPage.tsx", "AppliedWork.module.css"],
  ["InstitutionalEvidencePage.tsx", "Evidence.module.css"],
  ["InstitutionalExperimentsPage.tsx", "Experiments.module.css"],
  ["InstitutionalClaimsPage.tsx", "Claims.module.css"],
  ["InstitutionalNowPage.tsx", "Now.module.css"],
  ["InstitutionalChangesPage.tsx", "Changes.module.css"],
  ["InstitutionalStartPage.tsx", "Start.module.css"],
  ["InstitutionalContactPage.tsx", "Contact.module.css"],
  ["InstitutionalOpenLabPage.tsx", "OpenLab.module.css"],
  ["InstitutionalAtlasPage.tsx", "Atlas.module.css"],
  ["InstitutionalRepresentationAtlasPage.tsx", "RepresentationAtlas.module.css"],
];

for (const [component, routeModule] of routeContracts) {
  const source = read(`${root}/${component}`);
  expect(source.includes("InstitutionalFoundation.module.css"), `${component} must import Foundation`);
  expect(source.includes("InstitutionalRouteShared.module.css"), `${component} must import RouteShared`);
  expect(source.includes(routeModule), `${component} must import ${routeModule}`);
  expect(source.includes("composeCssModules"), `${component} must compose CSS modules`);
  expect(!source.includes("InstitutionalHomePreview.module.css"), `${component} references legacy monolith`);
}

for (const component of ["InstitutionalHomePage.tsx", "InstitutionalChrome.tsx"]) {
  const source = read(`${root}/${component}`);
  expect(source.includes("InstitutionalFoundation.module.css"), `${component} must use Foundation`);
  expect(!source.includes("InstitutionalHomePreview.module.css"), `${component} references legacy monolith`);
}

for (const routeFile of requiredStyles.slice(2)) {
  const source = read(`${stylesRoot}/${routeFile}`);
  expect(!source.includes("--royal-blue:"), `${routeFile} must not redefine institutional palette tokens`);
  expect(!source.includes("--old-gold:"), `${routeFile} must not redefine institutional palette tokens`);
}

console.log("Institutional CSS architecture passed.");
