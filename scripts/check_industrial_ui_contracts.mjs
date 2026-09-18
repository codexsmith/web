import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireExists(path, message) {
  if (!fs.existsSync(path)) throw new Error(`${message} (${path})`);
}

function forbidExists(path, message) {
  if (fs.existsSync(path)) throw new Error(`${message} (${path})`);
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) throw new Error(`${message} (${path})`);
}

function forbidMatch(path, pattern, message) {
  const source = read(path);
  if (pattern.test(source)) throw new Error(`${message} (${path})`);
}

const apparatusPrototype = "src/components/apparatus-prototype.tsx";
const apparatusPrototypeCss = "src/app/apparatus-prototype.css";

for (const path of [
  "src/lib/ui-shell.ts",
  "src/app/bf-industrial-tokens.css",
  "src/app/industrial-card-ui.css",
  apparatusPrototype,
  apparatusPrototypeCss,
]) {
  requireExists(path, "Industrial UI foundation, Apparatus design records, and bounded prototype must remain present");
}

// Card remains the production renderer. Apparatus may exist only as an explicitly
// addressed prototype over the same semantic engine.
requireMatch(
  "src/lib/ui-shell.ts",
  /uiShellModes\s*=\s*\["cards",\s*"apparatus"\]/,
  "UI shell vocabulary must preserve Card and Apparatus",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /activeUiShell:\s*UiShellMode\s*=\s*"cards"/,
  "Card must remain the production-active shell during prototype review",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /cards:\s*"active"[\s\S]*apparatus:\s*"prototype"/,
  "Apparatus readiness must be prototype rather than production-active",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /parseUiShell[\s\S]*candidate === "apparatus" \? "apparatus" : "cards"/,
  "Unknown or absent UI-shell requests must fall back to Card",
);
forbidExists(
  "src/app/industrial-apparatus-ui.css",
  "Production Apparatus styling must remain absent during bounded prototype review",
);
forbidExists(
  "src/components/apparatus-world.tsx",
  "Production Apparatus World renderer must remain absent during bounded prototype review",
);

// Retired backlog-only Apparatus doctrine files were removed from the active repository.
// The executable prototype and its scoped CSS are now the enforceable source of truth.
// Bounded implementation prototype: real registry data, shared World state, explicit query.
requireMatch(
  apparatusPrototype,
  /getChildren[\s\S]*getCrossEdges[\s\S]*getParent/,
  "Apparatus prototype must derive topology from the shared content registry",
);
requireMatch(
  apparatusPrototype,
  /RootApparatus[\s\S]*BranchApparatus[\s\S]*LeafApparatus/,
  "Prototype must exercise root, branch, and leaf apparatus scales",
);
requireMatch(
  apparatusPrototype,
  /relations\.slice\(0, 3\)[\s\S]*relations\.slice\(3\)/,
  "Prototype must enforce the three-persistent-connector budget and overflow bank",
);
requireMatch(
  apparatusPrototype,
  /TraceSteps[\s\S]*onTraversalPath[\s\S]*Duplicate|TraceSteps[\s\S]*onTraversalPath/,
  "Prototype trace must use the shared rewind callback rather than ancestry",
);
requireMatch(
  apparatusPrototype,
  /projectionModes[\s\S]*onProjectionChange/,
  "Prototype Depth selector must drive the shared projection callback",
);
requireMatch(
  apparatusPrototype,
  /node\.publication\.nextGate[\s\S]*State preserved[\s\S]*node\.publication\.sourceRef/,
  "Publication instrument must expose the real next gate, preserved state, and source",
);
requireMatch(
  apparatusPrototype,
  /apparatus-through[\s\S]*onInspect/,
  "Prototype Through aperture must inspect the current object without inventing graph traversal",
);

requireMatch(
  "src/components/world-app.tsx",
  /initialUiShell[\s\S]*useState<UiShellMode>[\s\S]*data-ui-renderer=\{uiShell\}/,
  "WorldApp must own renderer state alongside existing focus/projection state",
);
requireMatch(
  "src/components/world-app.tsx",
  /if \(uiShell === "apparatus"\) params\.set\("ui", "apparatus"\)/,
  "WorldApp state URLs must preserve explicit Apparatus prototype addressing",
);
requireMatch(
  "src/components/world-app.tsx",
  /ApparatusPrototypeFrame[\s\S]*traversalPath=\{traversalPath\}[\s\S]*onTraversalPath=\{navigateTraversalPath\}[\s\S]*onProjectionChange=\{changeProjection\}/,
  "Apparatus frame must reuse the same traversal and Depth callbacks as Card",
);
requireMatch(
  "src/components/world-app.tsx",
  /exitPrototype[\s\S]*setUiShell\("cards"\)[\s\S]*router\.replace/,
  "Prototype must provide a no-traversal return to the Card renderer",
);

requireMatch(
  "src/app/[...slug]/page.tsx",
  /ui\?: string \| string\[\][\s\S]*parseUiShell\(query\.ui\)[\s\S]*robots: uiShell === "apparatus" \? \{ index: false, follow: false \}/,
  "Apparatus prototype pages must be explicitly addressed and no-index",
);
requireMatch(
  "src/app/[...slug]/page.tsx",
  /initialUiShell=\{initialUiShell\}/,
  "Page routing must pass the requested prototype renderer into WorldApp",
);

requireMatch(
  apparatusPrototypeCss,
  /^\/\*[\s\S]*\.apparatus-prototype-shell/,
  "Prototype styling must remain scoped to the Apparatus prototype shell",
);
requireMatch(
  apparatusPrototypeCss,
  /grid-template-areas:[\s\S]*"trace work peers"[\s\S]*@media \(max-width: 1100px\)[\s\S]*@media \(max-width: 760px\)/,
  "Prototype CSS must implement wide, banked, and narrow topology modes",
);
requireMatch(
  apparatusPrototypeCss,
  /prefers-reduced-motion: reduce[\s\S]*forced-colors: active/,
  "Prototype must include reduced-motion and forced-colors treatments",
);
requireMatch(
  apparatusPrototypeCss,
  /apparatus-relation-trace[\s\S]*grid-template-columns[\s\S]*apparatus-port-bank/,
  "Prototype must provide routed relation traces with banked overflow",
);

// Shared palette semantics: material, operator agency, and observed state have different jobs.
const requiredTokens = [
  ["--bf-iron-950", "#11161b"],
  ["--bf-gunmetal-900", "#182129"],
  ["--bf-steel-800", "#242e35"],
  ["--bf-steel-700", "#303b42"],
  ["--bf-steel-600", "#38444b"],
  ["--bf-alloy-500", "#52616a"],
  ["--bf-alloy-400", "#748188"],
  ["--bf-silver-300", "#aab4b8"],
  ["--bf-workshop-100", "#e4e7e3"],
  ["--bf-site-action", "var(--bf-silver-300)"],
  ["--bf-action", "var(--bf-site-action)"],
  ["--bf-valid", "#8edb9a"],
  ["--bf-attention", "#f2c66d"],
  ["--bf-info", "#77b9e8"],
  ["--bf-defect", "#e77c73"],
  ["--bf-unknown", "#748188"],
];

const tokenSource = read("src/app/bf-industrial-tokens.css");
for (const [token, value] of requiredTokens) {
  if (!tokenSource.includes(`${token}: ${value}`)) {
    throw new Error(`Industrial semantic token drifted: ${token} must remain ${value}`);
  }
}
requireMatch(
  "src/app/bf-industrial-tokens.css",
  /Metal = structure and operator agency[\s\S]*Signal colors = observed machine state/,
  "Industrial token layer must preserve material / agency / state semantic separation",
);
requireMatch(
  "src/app/bf-industrial-tokens.css",
  /Wear implies use, not neglect/,
  "Industrial token layer must preserve restrained wear doctrine",
);

// Card renderer consumes the same shared palette and remains the default.
requireMatch(
  "src/app/industrial-card-ui.css",
  /body\[data-ui-shell="cards"\]/,
  "Card styling must remain isolated behind the production Card shell boundary",
);
requireMatch(
  "src/app/industrial-card-ui.css",
  /\.district-card[\s\S]*var\(--bf-bg-surface\)[\s\S]*\.district-card:hover[\s\S]*var\(--bf-action-line\)/,
  "Card material and operator-action states must consume shared industrial semantics",
);
requireMatch(
  "src/app/industrial-card-ui.css",
  /\.world-heading::before[\s\S]*display:\s*none/,
  "Card UI must retire the stale CURRENT WHOLE heading label",
);
requireMatch(
  "src/app/industrial-card-ui.css",
  /data-stage="shipped"[\s\S]*--bf-valid[\s\S]*data-stage="developed"[\s\S]*--bf-info[\s\S]*data-stage="pilot"[\s\S]*--bf-attention/,
  "Card status chips must distinguish observed state from operator agency",
);
forbidMatch(
  "src/app/industrial-card-ui.css",
  /data-stage=[^\n]*[\s\S]{0,180}var\(--bf-defect\)/,
  "Lifecycle maturity must not be mislabeled as a defect state",
);

requireMatch(
  "src/app/layout.tsx",
  /activeUiShell[\s\S]*bf-industrial-tokens\.css[\s\S]*industrial-card-ui\.css[\s\S]*apparatus-prototype\.css[\s\S]*data-ui-shell=\{activeUiShell\}/,
  "Layout must keep shared tokens, Card default styling, and scoped prototype styling in one root shell",
);

console.log("industrial UI contracts: pass");
