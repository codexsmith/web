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
const about = fs.readFileSync("src/components/institutional/InstitutionalAboutPage.tsx", "utf8");
const aboutGroups = fs.readFileSync("src/components/institutional/sections/AboutReflowGroups.tsx", "utf8");
const aboutCss = fs.readFileSync("src/components/institutional/styles/About.module.css", "utf8");
const home = fs.readFileSync("src/components/institutional/InstitutionalHomePage.tsx", "utf8");
const homeOrientation = fs.readFileSync("src/components/institutional/sections/HomeOrientationSection.tsx", "utf8");
const homeCss = fs.readFileSync("src/components/institutional/styles/InstitutionalFoundation.module.css", "utf8");
const augusta = fs.readFileSync("src/components/institutional/InstitutionalAugustaMaintenanceDebtPage.tsx", "utf8");
const augustaCycle = fs.readFileSync("src/components/institutional/sections/AugustaCaseCycleSection.tsx", "utf8");
const augustaCss = fs.readFileSync("src/components/institutional/styles/AugustaMaintenanceDebt.module.css", "utf8");
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
expect(productContext.includes('id="why-products-matter"'), "Product Context must begin with Why Products Matter");
expect(productContext.indexOf('id="why-products-matter"') < productContext.indexOf('id="research-market"'), "Why Products Matter must precede Research to Market");
expect(productContext.includes('id="research-market"'), "Product Context must include Research to Market");
expect(productContext.includes('id="public-product-object"'), "Product Context must include Public Product Object");
expect(!products.includes('className={styles.productEvidenceSection}'), "Why Products Matter must no longer be a standalone Products section");
expect(productCss.includes("--reflow-focus-span: 6"), "six-card Product focus-stage must place two compact cards per wide row");
expect(productCss.includes(".productContextWhy { --reflow-span: 5; }"), "Why Products Matter must participate in the authored REST composition");
expect(productCss.includes(".productContextResearchMarket { --reflow-span: 4; }"), "Product Context REST state must retain authored magazine spans");
expect(productCss.includes(".productContextObject { --reflow-span: 4; }"), "Product Object must participate in the authored REST composition");
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
expect(about.includes("<AboutReflowGroups />"), "About page must compose its three doctrine chapters as Reflow groups");
expect((aboutGroups.match(/<ReflowField(?:\s|>)/g) || []).length === 3, "About must expose one independent Reflow field per narrative chapter");
expect((aboutGroups.match(/layoutMode="focus-stage"/g) || []).length === 3, "All About chapter fields must use focus-stage reflow");
expect(aboutGroups.includes("itemOrder={representationOrder}"), "Representation + Method must declare stable ordering");
expect(aboutGroups.includes("itemOrder={agencyOrder}"), "Agency + Stewardship must declare stable ordering");
expect(aboutGroups.includes("itemOrder={institutionOrder}"), "Institutional Practice must declare stable ordering");
expect(aboutGroups.includes('id="knowledge-infrastructure"'), "About Representation field must include Knowledge Is Infrastructure");
expect(aboutGroups.includes('id="stewardship"'), "About Agency field must include Stewardship");
expect(aboutGroups.includes('id="public-good"'), "About Institutional Practice field must include Public Good");
expect(aboutCss.includes(".aboutRepresentationGrid"), "About must style a dedicated Representation Reflow field");
expect(aboutCss.includes(".aboutAgencyGrid"), "About must style a dedicated Agency Reflow field");
expect(aboutCss.includes(".aboutInstitutionGrid"), "About must style a dedicated Institutional Reflow field");
expect(aboutCss.includes("min-height: 166px"), "About REST Reflow cards should use the compact card floor");
expect(aboutCss.includes("height: 112px"), "About focus-stage peers should use the compact peer height");
expect(aboutCss.includes('border-top: 7px solid var(--old-gold)'), "About chapters must own a dominant outer plate perimeter");
expect(aboutCss.includes('.aboutGroupGrid {\n  margin: 16px 18px 0;'), "About Reflow fields must read as inset work surfaces inside chapter plates");
expect(aboutCss.includes('border-top-width: 3px'), "About child cards must use lower visual elevation than their chapter container");

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

const aboutSummarySource = aboutGroups.slice(
  aboutGroups.indexOf("function AboutContextSummary"),
  aboutGroups.indexOf("function AboutContextCard"),
);
expect(!/\bindex\b/.test(aboutSummarySource), "About Reflow summaries must not render ordinal number plates");

for (const [name, source] of [
  ["Research", researchCss],
  ["Products", productCss],
  ["Projects", projectCss],
  ["Apparatus", apparatusCss],
  ["Publications", publicationCss],
  ["Open Lab", openLabCss],
  ["About", aboutCss],
]) {
  expect(!source.includes("ContextSummary > span"), `${name} Reflow CSS must not retain ordinal plate styling`);
  expect(source.includes("min-height: 166px"), `${name} REST Reflow cards should use the compact card floor`);
  expect(source.includes("height: 112px"), `${name} focus-stage peers should use the compact peer height`);
}

expect(home.includes("<HomeOrientationSection />"), "Homepage must compose Choose Your Own Path through Stewardship as one Reflow field");
expect(!home.includes("\\n\\n"), "Homepage must not render escaped newline literals around the orientation field");
expect(!home.includes('className={styles.audienceEntrySection}'), "Homepage orientation bands must no longer render as standalone sections");
expect(reflow.includes('type ReflowRestLayout = "natural" | "rectangle"'), "Reflow must expose an explicit rectangle REST layout rule");
expect(reflow.includes("rectangleTileForIndex"), "Rectangle Reflow must compute balanced full-width rows");
expect(reflowCss.includes('data-reflow-rest-layout="rectangle"'), "Rectangle Reflow must own its REST grid geometry");
expect(reflowCss.includes('> .item:not([data-reflow-state="selected"])'), "Reflow focus-stage layout rules must target direct child cards only");
expect(reflowCss.includes('data-reflow-rest-layout="rectangle"][data-reflow-active="false"] > .item'), "Rectangle layout rules must not leak into nested Reflow fields");
expect(audienceJourneys.includes('restLayout="rectangle"'), "Audience journey REST cards must tile into a complete rectangle");

expect(homeOrientation.includes('layoutMode="focus-stage"'), "Homepage orientation must use focus-stage reflow");
expect(homeOrientation.includes("animatePeers"), "Homepage orientation must animate context peers with the selected card");
expect(homeOrientation.includes('focusPeerPlacement="before"'), "Homepage orientation must keep all three context peers together before the selected card");
expect(homeOrientation.includes("itemOrder={homeOrientationOrder}"), "Homepage orientation must declare stable source ordering");
expect((homeOrientation.match(/<ReflowFieldItem/g) || []).length === 4, "Homepage orientation must expose exactly four Reflow sections");
for (const id of ["choose-path", "approach", "operating-braid", "stewardship"]) {
  expect(homeOrientation.includes(`id="${id}"`), `Homepage orientation must retain the ${id} section`);
}
expect(homeCss.includes(".homeOrientationGrid"), "Homepage orientation must style a dedicated Reflow field");
expect(homeOrientation.includes("HomeOrientationMiniature"), "Homepage orientation summaries must preview their internal content grammar");
expect(!homeOrientation.includes("Start with why you came, not with the Lab&apos;s org chart."), "Expanded homepage Reflow details must not repeat the selected summary title");
expect(!homeOrientation.includes("<h2>Three practical lineages braid into one recursive method.</h2>"), "Operating Braid detail must not repeat its selected summary title");
expect(!homeOrientation.includes("<h2>What succeeds still has to be cared for.</h2>"), "Stewardship detail must not repeat its selected summary title");
expect(!homeOrientation.includes("InstitutionalSectionLead"), "Our Approach detail must use a title-free inner lead");
expect(!homeOrientation.includes('<p className={styles.sectionIndex}>OUR APPROACH</p>'), "Our Approach detail must not repeat its header eyebrow");
expect(!homeOrientation.includes('<p className={styles.sectionIndex}>OPERATING BRAID</p>'), "Operating Braid detail must not repeat its header eyebrow");
expect(!homeOrientation.includes('<p className={styles.sectionIndex}>STEWARDSHIP</p>'), "Stewardship detail must not repeat its header eyebrow");
expect(homeOrientation.includes("The braid is recursive:"), "Operating Braid detail must explain how the practices compose rather than repeat the header summary");
expect(!homeOrientation.includes("audienceEntryLead"), "Choose Your Own Path detail must not retain a redundant left sidebar");
expect(homeOrientation.includes("homeOrientationSummaryAction"), "Choose Your Own Path must expose its all-paths action in the selected header");
expect(homeOrientation.includes("homeOrientationAudienceDetail"), "Choose Your Own Path audience grid must use the full expanded detail width");
expect(homeCss.includes(".homeOrientationMosaic"), "Choose Your Own Path must expose a mosaic preview");
expect(homeCss.includes(".homeOrientationStack"), "Our Approach must expose stacked-row preview");
expect(homeCss.includes(".homeOrientationBraidMini"), "Operating Braid must expose a three-to-one preview");
expect(homeCss.includes(".homeOrientationStewardMini"), "Stewardship must expose a three-box preview");
expect(homeCss.includes("--reflow-columns: 12"), "Homepage orientation REST state must use a twelve-column field");
expect(homeCss.includes("--reflow-span: 6"), "Homepage orientation REST state must compose as a two-by-two field");
expect(homeCss.includes("--reflow-focus-span: 4"), "Homepage focus-stage must fit all three desktop context cards on one row");
expect(homeCss.includes("order: 1"), "Homepage non-selected context cards must share one row before the selected card");
expect(homeCss.includes("height: 112px"), "Homepage focus-stage peers must contract to compact context plates");
expect(homeCss.includes('.homeOrientationCard[data-reflow-state="selected"]'), "Homepage selected section must have an explicit committed-inspection state");

expect(augusta.includes("<AugustaCaseCycleSection />"), "Augusta civic case must compose its six substantive stages as one Reflow cycle");
expect(augustaCycle.includes('layoutMode="focus-stage"'), "Augusta civic case cycle must use focus-stage reflow");
expect(augustaCycle.includes("itemOrder={cycleOrder}"), "Augusta civic case cycle must declare stable source ordering");
expect((augustaCycle.match(/<CycleStage/g) || []).length === 6, "Augusta civic case must expose exactly six Reflow stages");
for (const id of ["finding", "ledger", "evidence", "fleet-test", "controls", "next-gate"]) {
  expect(augustaCycle.includes(`id={stage.id}`) || augustaCycle.includes(`id="${id}"`) || augustaCycle.includes(id), `Augusta civic case must retain the ${id} stage`);
}
expect(augustaCss.includes(".caseCycleGrid"), "Augusta civic case must style a dedicated Reflow cycle field");
expect(augustaCss.includes("--reflow-columns: 12"), "Augusta civic case REST cycle must use the authored twelve-column field");
expect(augustaCss.includes('grid-row: 2'), "Augusta civic case REST state must visually continue onto a second process row");
expect(augustaCss.includes("height: 112px"), "Augusta focus-stage peers must contract to compact context plates");
expect(augustaCss.includes('.caseStage[data-reflow-state="selected"]'), "Augusta selected stage must have an explicit committed-inspection state");
expect(augustaCss.includes(".caseCycleReturn"), "Augusta cycle must visibly return new evidence to the claim-boundary stage");

expect(component.includes('data-reflow-field={fieldId}'), "Reflow must mark field boundaries for nested interaction");
expect(component.includes("clickBelongsToNestedReflowField"), "Reflow must let nested fields own their own card clicks");

console.log("BFUX Reflow Field contracts passed.");
