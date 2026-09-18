import fs from "node:fs";

const component = fs.readFileSync("src/components/bfux/ReflowField.tsx", "utf8");
const research = fs.readFileSync("src/components/institutional/InstitutionalResearchPage.tsx", "utf8");
const researchCss = fs.readFileSync("src/components/institutional/styles/Research.module.css", "utf8");

const expect = (condition, message) => {
  if (!condition) throw new Error(`BFUX Reflow Field contract failed: ${message}`);
};

expect(component.startsWith('"use client"'), "Reflow Field must own interaction state in a client boundary");
expect(component.includes("aria-expanded={selected}"), "selection must be exposed accessibly");
expect(component.includes('event.key === "Escape"'), "Escape must collapse committed inspection");
expect(component.includes("useReducedMotion"), "Motion reduced-motion preference must gate layout animation");
expect(component.includes("LayoutGroup"), "reference renderer must coordinate sibling layout animation with Motion");
expect(component.includes("<motion.article"), "Reflow items must delegate geometry interpolation to Motion");
expect(component.includes("AnimatePresence"), "expanded detail should use a maintained enter/exit primitive");
expect(component.includes('data-reflow-state={selected ? "selected" : "rest"}'), "item state must be explicit in DOM");
expect(research.includes('<div className={styles.researchProgramGrid}>'), "Active Surfaces must remain ordinary always-visible substantive content");
expect(research.includes('className={styles.researchContextGrid}'), "supporting Research context must own the Reflow Field");
expect(research.includes('id="reader-agency"'), "Reader Agency must be represented in the context field");
expect(research.includes('id="closing-test"'), "Closing Test must be represented in the context field");
expect(research.indexOf('className={styles.researchProgramGrid}') < research.indexOf('className={styles.researchContextGrid}'), "substantive Active Surfaces must precede the contextual Reflow Field");
expect(researchCss.includes('.researchContextCard[data-reflow-state="selected"]'), "Research context renderer must visibly distinguish committed inspection");
expect(researchCss.includes("--reflow-columns: 12"), "wide Research context should use an authored bento grid rather than auto-fit columns");
expect(researchCss.includes(".contextReader { --reflow-span: 5; }"), "Research context should declare magazine-like compact spans");
expect(researchCss.includes(".contextClosing { --reflow-span: 7; }"), "Research context should pack the final row without dead field space");

console.log("BFUX Reflow Field contracts passed.");
