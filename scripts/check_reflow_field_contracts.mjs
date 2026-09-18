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
expect(component.includes("prefers-reduced-motion: reduce") === false, "motion preference belongs in CSS / matchMedia, not hard-coded markup");
expect(component.includes("matchMedia"), "reduced-motion preference must gate animated view transitions");
expect(component.includes("startViewTransition"), "reference renderer should progressively enhance spatial reflow");
expect(component.includes('data-reflow-state={selected ? "selected" : "rest"}'), "item state must be explicit in DOM");
expect(research.includes("<ReflowField"), "Research program collection must use the BFUX primitive");
expect(research.includes("<ReflowFieldItem"), "Research programs must be individually selectable");
expect(!research.includes('<div className={styles.researchProgramGrid}>'), "Research must not retain the old static program grid");
expect(researchCss.includes('[data-reflow-state="selected"]'), "Research renderer must visibly distinguish committed inspection");
expect(researchCss.includes("grid-template-columns: repeat(3"), "wide Research projection should use a two-dimensional compact field");

console.log("BFUX Reflow Field contracts passed.");
