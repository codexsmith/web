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

for (const path of [
  "src/content/publication_content.json",
  "src/content/publication_pathway.json",
  "src/content/artifacts/executable-distinctions.md",
  "src/content/artifacts/consequence-bearing-development-and-ai-repair-loops.md",
  "src/content/artifacts/bounded-consequence-circuit-protocol-preview.md",
  "src/content/artifacts/digital-non-aggression-program-introduction.md",
  "src/content/artifacts/governing-the-language-garden.md",
  "src/content/artifacts/original-visual-grammar.md",
  "src/content/artifacts/people-are-not-overhead-review-worksheet.md",
  "src/content/artifacts/people-make-the-value-people-are-not-overhead.md",
  "src/content/artifacts/social-lawfulness-consequence-and-repair.md",
  "src/content/artifacts/testing-cross-domain-operational-homology.md",
  "src/content/artifacts/world-class-is-a-capacity-we-give.md",
  "src/lib/publication-types.ts",
  "src/lib/publication-portfolio.ts",
  "src/lib/content-registry.ts",
]) {
  requireExists(path, "First-class publication source/registry must remain available");
}

requireMatch(
  "src/lib/publication-types.ts",
  /"seed"[\s\S]*"draft"[\s\S]*"working-public"[\s\S]*"review"[\s\S]*"launch-candidate"[\s\S]*"published"[\s\S]*"superseded"/,
  "Publication lifecycle vocabulary must remain explicit and independent from delivery status",
);

requireMatch(
  "src/lib/publication-portfolio.ts",
  /id:\s*"publications"[\s\S]*parentId:\s*"root"[\s\S]*id:\s*"publication-essays"[\s\S]*id:\s*"publication-methods"[\s\S]*id:\s*"publication-research"[\s\S]*id:\s*"publication-learning"/,
  "Publications must remain a first-class root region with the four publication portfolio categories",
);

for (const id of [
  "pub-executable-distinctions",
  "pub-people-are-not-overhead",
  "pub-software-before-code",
  "pub-closure-driven-development",
  "pub-boundary-first-ux",
  "pub-consequence-bearing-development",
  "pub-bounded-consequence-circuit",
  "pub-operational-homology",
  "pub-digital-non-aggression",
  "pub-schemathematics",
  "pub-civilizational-first-passage",
  "pub-original-visual-grammar",
]) {
  requireMatch(
    "src/lib/publication-portfolio.ts",
    new RegExp(`id:\\s*"${id}"`),
    `Publication portfolio must retain ${id}`,
  );
}

requireMatch(
  "src/lib/publication-portfolio.ts",
  /Publication status is tracked separately[\s\S]*Publication is not validation/,
  "Publications must keep manuscript maturity separate from research/product validation",
);

forbidMatch(
  "src/lib/publication-portfolio.ts",
  /stage:\s*"published"/,
  "No selected in-flight publication may be silently promoted to stable published standing",
);

requireMatch(
  "src/lib/content-registry.ts",
  /nodes:\s*ContentNode\[\]\s*=\s*\[\.\.\.baseNodes,\s*\.\.\.publicationNodes\][\s\S]*edges:\s*GraphEdge\[\]\s*=\s*\[\.\.\.baseEdges,\s*\.\.\.publicationEdges\]/,
  "Active graph registry must combine the base spine with publication nodes and typed relations",
);

for (const path of [
  "src/app/[[...slug]]/page.tsx",
  "src/components/world-app.tsx",
  "src/components/world-view.tsx",
  "src/components/evidence-view.tsx",
  "src/components/search-panel.tsx",
]) {
  requireMatch(
    path,
    /@\/lib\/content-registry/,
    "Routing, traversal, world, evidence, and search must use the combined first-class content registry",
  );
}

requireMatch(
  "src/components/subject-pane.tsx",
  /publication-status-chip[\s\S]*Next publication gate[\s\S]*publication\.nextGate/,
  "World must expose publication development state and next gate",
);

requireMatch(
  "src/lib/evidence-content.ts",
  /publication-manuscript[\s\S]*Manuscript maturity and epistemic validity remain separate axes/,
  "Evidence projection must describe a human-facing publication source and keep manuscript state separate from validation",
);
requireMatch(
  "src/components/evidence-view.tsx",
  /Records behind the claims[\s\S]*What remains outside the claim/,
  "Evidence projection must bind publication claims to sources and explicit limits",
);

requireMatch(
  "src/components/search-panel.tsx",
  /publication\?\.label[\s\S]*publication\?\.claimMaturity[\s\S]*publication\?\.nextGate/,
  "Search must index publication development metadata",
);

requireMatch(
  "src/lib/root-content.ts",
  /Publications shows which written artifacts exist[\s\S]*Five public surfaces[\s\S]*Publications: what written artifacts exist/,
  "Root orientation must treat Publications as the fifth public surface",
);

requireMatch(
  "src/app/publication-portfolio.css",
  /data-node-id="publications"[\s\S]*publication-status-panel[\s\S]*@media \(max-width: 1360px\)/,
  "Root morphology and publication state UI must include Publications with a responsive fallback",
);

requireMatch(
  "src/app/layout.tsx",
  /publication-portfolio\.css/,
  "Publication morphology/status styles must be active",
);

console.log("publication portfolio contracts: pass");
