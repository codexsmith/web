import fs from "node:fs";

const files = {
  registry: fs.readFileSync("src/lib/bfux-content-artifacts.ts", "utf8"),
  component: fs.readFileSync("src/components/bfux-content-artifact.tsx", "utf8"),
  subject: fs.readFileSync("src/components/subject-pane.tsx", "utf8"),
  inspection: fs.readFileSync("src/components/inspection-panel.tsx", "utf8"),
  css: fs.readFileSync("src/app/p5-semantic-content-artifacts.css", "utf8"),
  layout: fs.readFileSync("src/app/layout.tsx", "utf8"),
};

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

expect(files.layout.includes('import "./p5-semantic-content-artifacts.css";'), "P5 artifact CSS must load after prior projection layers");
expect(files.subject.includes("getNodeContentArtifacts(node.id)"), "SubjectPane must resolve node-level semantic artifacts");
expect(files.subject.includes("<BfuxContentArtifact"), "SubjectPane must render semantic artifacts in the main content surface");
expect(files.inspection.includes("<BfuxInspectionArtifacts inspection={inspection}"), "Inspection surfaces must render compiled BFUX artifacts");
expect(!files.inspection.includes("inspection.bullets.map"), "Inspection bullets must not fall back to a raw list renderer");

for (const nodeId of [
  "public-mission",
  "public-principles",
  "public-aspirations",
  "corpus-forge",
  "agency-audit",
  "augusta-civic",
  "boundary-first-engineering",
  "ontological-software",
  "executable-representation",
  "boundary-first-ux",
  "verification-governance",
  "youtube-knowledge-explorer",
  "cross-platform-bookshelf",
  "need-capacity-map",
  "the-lab",
  "how-we-work",
  "contact",
]) {
  expect(files.registry.includes(`"${nodeId}"`) || files.registry.includes(`${nodeId}: [`), `Node artifact registry must cover ${nodeId}`);
}

for (const kind of ["sequence", "loop", "set", "ladder", "fanout", "convergence"]) {
  expect(files.registry.includes(`| "${kind}"`) || files.registry.includes(`kind: "${kind}"`), `Artifact grammar must retain ${kind}`);
}

for (const [semantic, selector] of [
  ["sequence", ".bfux-artifact__sequence"],
  ["loop return", ".bfux-artifact__return"],
  ["bounded set", ".bfux-artifact__set"],
  ["ladder", ".bfux-artifact__ladder"],
  ["fan-out/convergence", ".bfux-artifact__fan"],
]) {
  expect(files.css.includes(selector), `Artifact CSS must expose ${semantic} semantics`);
}

expect(files.registry.includes("const ARROW"), "Inspection compiler must recognize explicit arrow sequences");
expect(files.registry.includes("parseArrowBullet"), "Inspection compiler must project arrow prose into ordered artifacts");
expect(files.registry.includes("isHorizonLabel"), "Inspection compiler must recognize staged maturity/capability horizons");
expect(files.component.includes('<ol className="bfux-artifact__sequence"'), "Sequences must preserve ordered-list accessibility semantics");
expect(files.component.includes('<ul className="bfux-artifact__set"'), "Peer sets must preserve unordered-list accessibility semantics");
expect(files.component.includes('<ol className="bfux-artifact__ladder"'), "Ladders must preserve ordered-list accessibility semantics");
expect(files.component.includes('data-artifact-kind={artifact.kind}'), "Rendered artifacts must expose their semantic kind for QA and inspection");
expect(files.css.includes("@media (forced-colors: active)"), "Semantic artifacts must preserve forced-colors support");
expect(files.css.includes("@media (max-width: 980px)"), "Semantic artifacts must explicitly recompose for compact projection");

if (failures.length) {
  console.error("P5 semantic artifact contract failures:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("P5 semantic artifact contracts passed.");
