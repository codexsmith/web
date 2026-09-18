import fs from "node:fs";

const component = fs.readFileSync("src/components/bfux/ReflowField.tsx", "utf8");
const research = fs.readFileSync("src/components/institutional/InstitutionalResearchPage.tsx", "utf8");
const researchContext = fs.readFileSync("src/components/institutional/sections/ResearchContextSection.tsx", "utf8");
const products = fs.readFileSync("src/components/institutional/InstitutionalProductsPage.tsx", "utf8");
const productContext = fs.readFileSync("src/components/institutional/sections/ProductContextSection.tsx", "utf8");
const productCss = fs.readFileSync("src/components/institutional/styles/Products.module.css", "utf8");
const projects = fs.readFileSync("src/components/institutional/InstitutionalProjectsPage.tsx", "utf8");
const projectContext = fs.readFileSync("src/components/institutional/sections/ProjectContextSection.tsx", "utf8");
const projectCss = fs.readFileSync("src/components/institutional/styles/Projects.module.css", "utf8");
const apparatus = fs.readFileSync("src/components/institutional/InstitutionalApparatusPage.tsx", "utf8");
const apparatusContext = fs.readFileSync("src/components/institutional/sections/ApparatusContextSection.tsx", "utf8");
const apparatusCss = fs.readFileSync("src/components/institutional/styles/Apparatus.module.css", "utf8");
const publications = fs.readFileSync("src/components/institutional/InstitutionalPublicationsPage.tsx", "utf8");
const publicationContext = fs.readFileSync("src/components/institutional/sections/PublicationContextSection.tsx", "utf8");
const publicationCss = fs.readFileSync("src/components/institutional/styles/Publications.module.css", "utf8");
const openLab = fs.readFileSync("src/components/institutional/InstitutionalOpenLabPage.tsx", "utf8");
const openLabContext = fs.readFileSync("src/components/institutional/sections/OpenLabContextSection.tsx", "utf8");
const openLabCss = fs.readFileSync("src/components/institutional/styles/OpenLab.module.css", "utf8");
const researchCss = fs.readFileSync("src/components/institutional/styles/Research.module.css", "utf8");

const expect = (condition, message) => {
  if (!condition) throw new Error(`BFUX Reflow Field contract failed: ${message}`);
};

expect(component.startsWith('"use client"'), "Reflow Field must own interaction state in a client boundary");
expect(component.includes("aria-expanded={selected}"), "selection must be exposed accessibly");
expect(component.includes("onClick={handleSurfaceClick}"), "the card surface itself must toggle inspection");
expect(component.includes("clickBelongsToNestedControl"), "nested controls must not accidentally toggle the card");
expect(component.includes("window.getSelection"), "text selection must not accidentally toggle the card");
expect(component.includes("className={styles.surfaceAction}"), "keyboard semantics must remain available without a visible button");
expect(!component.includes("controlStrip"), "Reflow cards must not render redundant visible footer chrome");
expect(!component.includes("stateReadout"), "Reflow cards must not render AVAILABLE / INSPECTING readouts");
expect(!component.includes("surfaceCue"), "Reflow cards must not render redundant Inspect / Close footer cues");
expect(component.includes('event.key === "Escape"'), "Escape must collapse committed inspection");
expect(component.includes("useReducedMotion"), "Motion reduced-motion preference must gate layout animation");
expect(component.includes("LayoutGroup"), "reference renderer must coordinate sibling layout animation with Motion");
expect(!component.includes("<motion.section"), "the field container must snap rather than participate in the selected card layout animation");
expect(component.includes("layoutId={"), "each plate must expose a stable Motion identity across grid reflow");
expect(component.includes("<motion.article"), "Reflow items must delegate geometry interpolation to Motion");
expect(component.includes('layoutAnchor={{ x: 0.5, y: 0.5 }}'), "focus-stage resize should grow around the card center rather than snap from a corner");
expect(component.includes("duration: 0.52"), "focus-stage card should use a brisk but perceptible translation and resize");
expect(component.includes("ease: [0.45, 0, 0.55, 1]"), "selected card motion should ease in and out rather than snap toward its destination");
expect(component.includes("const snapLayoutTransition"), "non-selected field objects must have an explicit snap transition");
expect(component.includes("previousSelectedId"), "Reflow Field must remember the immediately prior focus object for close continuity");
expect(component.includes("selected || context.previousSelectedId === id"), "opening and closing focus cards must both carry layout motion");
expect(component.includes("reducedMotion || !carriesMotion"), "only the entering or exiting focus card should receive animated layout continuity");
expect(component.includes("AnimatePresence"), "expanded detail should use a maintained enter/exit primitive");
expect(component.includes('mode="popLayout"'), "detail exit must not hold the parent card in its expanded geometry");
expect(component.includes("delay: 0.12"), "detail content should stage shortly after opening motion begins");
expect(component.includes("duration: 0.12"), "detail content should clear immediately when closing begins");
expect(component.includes('data-reflow-state={selected ? "selected" : "rest"}'), "item state must be explicit in DOM");
expect(component.includes('data-reflow-placement={placement}'), "focus-stage placement must be explicit in DOM");
expect(component.includes('data-reflow-motion-carrier={carriesMotion ? "true" : "false"}'), "the moving focus card must expose a transient top-layer state");
expect(component.includes("window.setTimeout"), "the prior motion carrier must clear after the return transition completes");
expect(component.includes("560"), "motion-carrier lifetime must cover the 0.52s return transition");
expect(fs.readFileSync("src/components/bfux/ReflowField.module.css", "utf8").includes('z-index: var(--reflow-motion-z, 100)'), "the moving focus card must remain above the already-resized module while returning");
expect(component.includes('layoutMode?: ReflowLayoutMode'), "Reflow Field must expose a reusable layout-mode contract");
expect(component.includes("Math.ceil(remainingIds.length / 2)"), "focus-stage must balance remaining items above and below the selected object");
expect(research.includes('<div className={styles.researchProgramGrid}>'), "Active Surfaces must remain ordinary always-visible substantive content");
expect(research.includes("<ResearchContextSection />"), "Research page must compose the contextual field as one modular section");
expect(researchContext.includes('className={styles.researchContextGrid}'), "supporting Research context must own the Reflow Field");
expect(researchContext.includes('id="reader-agency"'), "Reader Agency must be represented in the context field");
expect(researchContext.includes('id="closing-test"'), "Closing Test must be represented in the context field");
expect(researchContext.includes('layoutMode="focus-stage"'), "Research Context must use focus-stage reflow");
expect(researchContext.includes("itemOrder={researchContextOrder}"), "Research Context must declare stable source ordering for focus-stage placement");
expect(research.indexOf('className={styles.researchProgramGrid}') < research.indexOf("<ResearchContextSection />"), "substantive Active Surfaces must precede the contextual Reflow Field");
expect(researchCss.includes('.researchContextCard[data-reflow-state="selected"]'), "Research context renderer must visibly distinguish committed inspection");
expect(researchCss.includes("--reflow-columns: 12"), "wide Research context should use an authored bento grid rather than auto-fit columns");
expect(researchCss.includes(".contextReader { --reflow-span: 5; }"), "Research context should declare magazine-like compact spans");
expect(researchCss.includes(".contextClosing { --reflow-span: 7; }"), "Research context should pack the final row without dead field space");
expect(researchCss.includes("--reflow-focus-span: 4"), "wide focus-stage must place three compact cards per row");
expect(researchCss.includes("--reflow-selected-start: 2"), "wide selected card must be centered rather than edge-to-edge");
expect(researchCss.includes("height: 112px"), "unselected focus-stage cards must contract to a compact predetermined height");
expect(products.includes("<ProductContextSection />"), "Products page must compose its commercialization context as one modular Reflow section");
expect(productContext.includes('layoutMode="focus-stage"'), "Product Context must use focus-stage reflow");
expect(productContext.includes("itemOrder={productContextOrder}"), "Product Context must declare stable source ordering");
expect(productContext.includes('id="research-market"'), "Product Context must begin with Research to Market");
expect(productContext.includes('id="public-product-object"'), "Product Context must include Public Product Object");
expect(productCss.includes("--reflow-focus-span: 6"), "five-card Product focus-stage must place two compact cards per wide row");
expect(productCss.includes(".productContextResearchMarket { --reflow-span: 5; }"), "Product Context REST state must retain authored magazine spans");
expect(productCss.includes(".productContextObject { --reflow-span: 6; }"), "Product Object must participate in the authored REST composition");
expect(projects.includes("<ProjectContextSection />"), "Projects page must compose its transfer context as one modular Reflow section");
expect(projectContext.includes('layoutMode="focus-stage"'), "Project Context must use focus-stage reflow");
expect(projectContext.includes("itemOrder={projectContextOrder}"), "Project Context must declare stable source ordering");
expect(projectContext.includes('id="transfer-evidence"'), "Project Context must include Transfer Evidence");
expect(projectContext.includes('id="project-page-grammar"'), "Project Context must include Project-Page Grammar");
expect(projectContext.includes('id="status-rule"'), "Project Context must include Status Rule");
expect(projectContext.includes('id="capability-transfer"'), "Project Context must include Capability Transfer");
expect(projectCss.includes("--reflow-focus-span: 6"), "five-card Project focus-stage must place two compact cards per wide row");
expect(projectCss.includes(".projectContextTransfer { --reflow-span: 5; }"), "Project Context REST state must retain authored magazine spans");
expect(projectCss.includes(".projectContextCapability { --reflow-span: 6; }"), "Capability Transfer must participate in the authored REST composition");
expect(apparatus.includes("<ApparatusContextSection />"), "Apparatus page must compose all non-bench sections as one modular Reflow surface");
expect(apparatus.includes('className={styles.instrumentBench}'), "Instrument Bench must remain ordinary always-visible substantive content");
expect(apparatusContext.includes('layoutMode="focus-stage"'), "Apparatus Context must use focus-stage reflow");
expect(apparatusContext.includes("itemOrder={apparatusContextOrder}"), "Apparatus Context must declare stable source ordering");
expect(apparatusContext.includes('id="why-apparatus"'), "Apparatus Context must include Why Apparatus Matters");
expect(apparatusContext.includes('id="closing-test"'), "Apparatus Context must include Closing Test");
expect(apparatusContext.includes('id="trust-stewardship"'), "Apparatus Context must include Trust and Stewardship");
expect(apparatusCss.includes("--reflow-focus-span: 3"), "nine-card Apparatus focus-stage must place four compact cards per wide row");
expect(apparatusCss.includes(".apparatusContextWhy { --reflow-span: 5; }"), "Apparatus Context REST state must retain authored magazine spans");
expect(apparatusCss.includes(".apparatusContextClosing { --reflow-span: 3; }"), "Apparatus Closing Test must participate in the authored REST composition");
expect(publications.includes("<PublicationContextSection />"), "Publications page must compose its current body as one modular Reflow surface");
expect(!publications.includes("publicationTypeGrid"), "Publication objects are not yet directly composed on the Publications page");
expect(publicationContext.includes('layoutMode="focus-stage"'), "Publication Context must use focus-stage reflow");
expect(publicationContext.includes("itemOrder={publicationContextOrder}"), "Publication Context must declare stable source ordering");
expect(publicationContext.includes('id="projection-authority"'), "Publication Context must include Projection and Authority");
expect(publicationContext.includes('id="publication-covenant"'), "Publication Context must include the Publication Covenant");
expect(publicationContext.includes('id="flagship-pattern"'), "Publication Context must include the flagship page grammar");
expect(publicationCss.includes("--reflow-columns: 10"), "eleven-card Publication Context must use a ten-column wide field");
expect(publicationCss.includes("--reflow-focus-span: 2"), "eleven-card Publication focus-stage must place five compact cards per wide row");
expect(publicationCss.includes(".publicationContextProjection { --reflow-span: 4; }"), "Publication Context REST state must retain authored magazine spans");
expect(publicationCss.includes(".publicationContextCovenant { --reflow-span: 5; }"), "Publication Covenant must participate in the authored REST composition");
expect(openLab.includes("<OpenLabContextSection />"), "Open Lab must compose supporting governance machinery as one modular Reflow section");
expect(openLab.includes('className={styles.openLabContracts}'), "Public Participation must remain ordinary always-visible substantive content");
expect(openLab.includes('className={styles.openLabClose}'), "Institutional Promise must remain ordinary always-visible closing content");
expect(!openLab.includes('className={styles.openLabAvailability}'), "Intake Status must move out of the body and into the hero");
expect(openLabContext.includes('layoutMode="focus-stage"'), "Open Lab Context must use focus-stage reflow");
expect(openLabContext.includes("itemOrder={openLabContextOrder}"), "Open Lab Context must declare stable source ordering");
expect(openLabContext.includes('id="agency"'), "Open Lab Context must include Agency in Both Directions");
expect(openLabContext.includes('id="stewardship"'), "Open Lab Context must include Stewardship");
expect(openLabContext.includes('id="shared-infrastructure"'), "Open Lab Context must include shared infrastructure");
expect(openLabContext.includes('id="humanist-interface"'), "Open Lab Context must include the Humanist Interface Rule");
expect(openLabContext.includes('id="capability-transfer"'), "Open Lab Context must include Capability, Not Dependence");
expect(openLabCss.includes("--reflow-focus-span: 6"), "five-card Open Lab focus-stage must place two compact cards per wide row");
expect(openLabCss.includes(".openLabContextAgency { --reflow-span: 5; }"), "Open Lab Context REST state must retain authored magazine spans");
expect(openLabCss.includes(".openLabContextCapability { --reflow-span: 6; }"), "Open Lab capability transfer must participate in the authored REST composition");

for (const [name, source] of [
  ["Research", researchContext],
  ["Products", productContext],
  ["Projects", projectContext],
  ["Apparatus", apparatusContext],
  ["Publications", publicationContext],
  ["Open Lab", openLabContext],
]) {
  expect(!/index="\d+"/.test(source), `${name} Reflow summaries must not render ordinal number plates`);
}

for (const [name, source] of [
  ["Research", researchCss],
  ["Products", productCss],
  ["Projects", projectCss],
  ["Apparatus", apparatusCss],
  ["Publications", publicationCss],
  ["Open Lab", openLabCss],
]) {
  expect(!source.includes("ContextSummary > span"), `${name} Reflow CSS must not retain ordinal plate styling`);
  expect(source.includes("min-height: 166px"), `${name} REST Reflow cards should use the compact card floor`);
  expect(source.includes("height: 112px"), `${name} focus-stage peers should use the compact peer height`);
}

console.log("BFUX Reflow Field contracts passed.");
