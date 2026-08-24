import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireExists(path, message) {
  if (!fs.existsSync(path)) throw new Error(`${message} (${path})`);
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) throw new Error(`${message} (${path})`);
}

function forbidMatch(path, pattern, message) {
  const source = read(path);
  if (pattern.test(source)) throw new Error(`${message} (${path})`);
}

const component = "src/components/boundary-first-ux-record-detail.tsx";
const css = "src/app/p4-boundary-first-ux-conformance.css";
const contract = "docs/boundary-first-ux-conformance-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Boundary First UX specialized conformance artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "boundary-first-ux"[\s\S]*<BoundaryFirstUxRecordDetail/,
  "Boundary First UX retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /Current representation boundary demonstration[\s\S]*Useful local view[\s\S]*Deferred structure/,
  "BFUX must expose the current representation boundary and deferred outside structure before doctrine",
);
requireMatch(
  component,
  /record\.flagship\.sequence[\s\S]*record\.flagship\.acts[\s\S]*record\.timelineProof\.sequence/,
  "BFUX flagship must preserve interaction sequence, acts, and lifecycle timeline proof",
);
requireMatch(
  component,
  /semantic state[\s\S]*record\.rendererIndependence\.projections[\s\S]*record\.semanticRule/,
  "BFUX must distinguish one semantic core from its renderer projections",
);
requireMatch(
  component,
  /record\.grammar\.worldActions[\s\S]*record\.grammar\.workbench[\s\S]*record\.grammar\.worldEvents[\s\S]*record\.grammar\.closureRule/,
  "BFUX must preserve world actions, workbench operators, world events, and closure-as-state",
);
requireMatch(
  component,
  /record\.conceptualTangibility\.screenDepth[\s\S]*record\.conceptualTangibility\.motionSemantics[\s\S]*record\.motionLaws/,
  "BFUX must retain operational semantics for depth, motion, and physical metaphor",
);
requireMatch(
  component,
  /record\.accessibility\.requirements[\s\S]*record\.accessibility\.rule/,
  "Accessibility must remain a lawful projection of the BFUX semantic world",
);
requireMatch(
  component,
  /record\.conformance\.questions[\s\S]*record\.conformance\.candidateLevels[\s\S]*record\.conformance\.candidateLevelsStatus/,
  "BFUX conformance questions and provisional levels must remain visibly distinct",
);
requireMatch(
  component,
  /record\.sandbox\.standard[\s\S]*record\.sandbox\.demo[\s\S]*record\.sandbox\.lab[\s\S]*record\.sandbox\.promotionRule/,
  "Standard, demonstration, laboratory, and promotion gate must remain separate",
);
requireMatch(
  component,
  /record\.notThis\.map/,
  "BFUX specialized surface must retain explicit non-claims",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "BFUX specialized detail must not regress to generic record, standalone landing chrome, or a second icon grammar",
);

requireMatch(
  css,
  /bfux-standard__action-sequence[\s\S]*grid-template-columns:\s*repeat\(9/,
  "Wide BFUX layout must expose the complete nine-step flagship grammar in one ordered bank",
);
requireMatch(
  css,
  /@media \(max-width: 700px\)[\s\S]*bfux-standard__action-sequence[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow BFUX layout must recompose the interaction sequence into a single ordered flow",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "BFUX conformance instrument must provide a forced-colors representation",
);

requireMatch(
  contract,
  /renderer does not own semantic truth[\s\S]*Closure is a state[\s\S]*Accessibility is paradigm correctness[\s\S]*proposed, not yet canonical/,
  "BFUX contract must preserve renderer, closure, accessibility, and provisional-conformance laws",
);

console.log("P4 Boundary First UX conformance contracts: pass");
