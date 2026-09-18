import fs from "node:fs";

const component = fs.readFileSync("src/components/bfux/ReflowField.tsx", "utf8");
const research = fs.readFileSync("src/components/institutional/InstitutionalResearchPage.tsx", "utf8");
const researchContext = fs.readFileSync("src/components/institutional/sections/ResearchContextSection.tsx", "utf8");
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
expect(researchCss.includes("height: 142px"), "unselected focus-stage cards must contract to a predetermined compact height");

console.log("BFUX Reflow Field contracts passed.");
