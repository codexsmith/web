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
  "Research.module.css",
  "Products.module.css",
  "ProductExperience.module.css",
  "BoundaryFirstChess.module.css",
  "Projects.module.css",
  "Apparatus.module.css",
  "Publications.module.css",
  "About.module.css",
  "Funding.module.css",
  "Founder.module.css",
  "Collaboration.module.css",
  "AppliedWork.module.css",
  "Evidence.module.css",
  "Now.module.css",
  "Contact.module.css",
  "OpenLab.module.css",
];

for (const file of requiredStyles) {
  expect(fs.existsSync(`${stylesRoot}/${file}`), `missing style module ${file}`);
}

const foundation = read(`${stylesRoot}/InstitutionalFoundation.module.css`);
const routeShared = read(`${stylesRoot}/InstitutionalRouteShared.module.css`);

for (const token of ["--royal-blue", "--old-gold", "--osha-red", "--osha-green"]) {
  expect(foundation.includes(token), `Foundation must own design token ${token}`);
}

for (const sharedClass of [".routeLead", ".routeSupport", ".routeHero", ".routeMain"]) {
  expect(routeShared.includes(sharedClass), `RouteShared must own ${sharedClass}`);
}

expect(foundation.includes(".nav a"), "Foundation must own shared navigation behavior");
expect(foundation.includes(".footerNav a"), "Foundation must own shared footer navigation behavior");
expect(foundation.includes("flex-wrap: wrap"), "footer navigation must wrap when contextual child routes are exposed");
expect(!routeShared.includes(".nav a"), "RouteShared must not own shared site chrome");
expect(!routeShared.includes(".footerNav a"), "RouteShared must not own shared site chrome");
expect(routeShared.includes("grid-template-rows: repeat(3, auto)"), "child-page navigation must cap desktop stacks at three cards tall");
expect(routeShared.includes("grid-auto-flow: column"), "child-page navigation must flow additional links into new columns");
expect(routeShared.includes(".routeChildLinks:has(> .routeChildLink:nth-child(4):last-child)"), "exactly four child-page links must rebalance into a two-by-two grid");
expect(routeShared.includes("min-height: 58px"), "child-page cards must remain compact enough for dense contextual navigation");
expect(routeShared.includes("grid-auto-columns: minmax(200px, 1fr)"), "child-page columns must preserve a hard readable minimum width");
expect(routeShared.includes("min-width: 200px"), "child-page links must not collapse below their readable label width");
expect(routeShared.includes("white-space: nowrap"), "child-page labels must remain intact rather than hyphenating across lines");
const productExperience = read(`${stylesRoot}/ProductExperience.module.css`);
const boundaryFirstChess = read(`${stylesRoot}/BoundaryFirstChess.module.css`);
expect(productExperience.includes(".productExperienceHero"), "shared product-detail stylesheet must own the immersive hero");
expect(productExperience.includes(".productExperienceNav"), "shared product-detail stylesheet must own local sticky navigation");
expect(boundaryFirstChess.includes(".chessBoard"), "Boundary-First Chess must own a board visualization");
expect(boundaryFirstChess.includes(".chessLensControls"), "Boundary-First Chess must own interactive analysis-lens controls");

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
  ["InstitutionalNowPage.tsx", "Now.module.css"],
  ["InstitutionalContactPage.tsx", "Contact.module.css"],
  ["InstitutionalOpenLabPage.tsx", "OpenLab.module.css"],
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
