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

const apparatusGrammar = "backlog/3_bfl_boundary_first_ux/bfl_apparatus_interaction_grammar_v0_1.md";
const apparatusStudies = "backlog/3_bfl_boundary_first_ux/bfl_apparatus_static_studies_v0_1.md";

for (const path of [
  "src/lib/ui-shell.ts",
  "src/app/bf-industrial-tokens.css",
  "src/app/industrial-card-ui.css",
  apparatusGrammar,
  apparatusStudies,
]) {
  requireExists(path, "Industrial UI foundation and Apparatus design records must remain present");
}

// Two render targets are named, but only Card may render until the documented Apparatus
// grammar and static studies have passed visual morphology review.
requireMatch(
  "src/lib/ui-shell.ts",
  /uiShellModes\s*=\s*\["cards",\s*"apparatus"\]/,
  "UI shell vocabulary must reserve Card and Apparatus",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /activeUiShell:\s*UiShellMode\s*=\s*"cards"/,
  "Card must remain the only active production shell for this phase",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /cards:\s*"active"[\s\S]*apparatus:\s*"reserved"/,
  "Apparatus must remain explicitly reserved rather than implicitly unfinished",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /bfl_apparatus_interaction_grammar_v0_1\.md[\s\S]*bfl_apparatus_static_studies_v0_1\.md[\s\S]*visual morphology review/,
  "UI shell must point to the documented Apparatus morphology gate",
);
forbidExists(
  "src/app/industrial-apparatus-ui.css",
  "Apparatus styling must not be implemented before visual morphology review",
);
forbidExists(
  "src/components/apparatus-world.tsx",
  "Apparatus renderer must not be implemented before visual morphology review",
);

// Apparatus grammar: one semantic engine, small primitive set, no cockpit theater.
requireMatch(
  apparatusGrammar,
  /Card explains the system as bounded readable modules[\s\S]*Apparatus explains the same system as a bounded operational assembly/,
  "Apparatus must remain a second representation of the same semantic system",
);
requireMatch(
  apparatusGrammar,
  /Boundary[\s\S]*State[\s\S]*Path[\s\S]*Constraint[\s\S]*Agency[\s\S]*Consequence[\s\S]*Recovery/,
  "Apparatus expressive test must preserve the seven Boundary First UX questions",
);
requireMatch(
  apparatusGrammar,
  /Module \/ boundary[\s\S]*Port[\s\S]*Trace[\s\S]*Gate[\s\S]*State readout[\s\S]*Command[\s\S]*Repair path/,
  "Apparatus primitive vocabulary must remain compact and explicit",
);
requireMatch(
  apparatusGrammar,
  /reflow topologically, not miniaturize geometrically/,
  "Apparatus responsive behavior must preserve semantics rather than shrink schematics",
);
requireMatch(
  apparatusGrammar,
  /not a cockpit skin[\s\S]*not a cyberpunk dashboard/,
  "Apparatus must reject cockpit/dashboard theater",
);

// Static studies must use real BFL content and preserve the same semantic owners at
// root, branch, and leaf scales before production morphology is chosen.
requireMatch(
  apparatusStudies,
  /Study A — Root apparatus[\s\S]*Products[\s\S]*Public Interest[\s\S]*Research[\s\S]*Publications[\s\S]*About/,
  "Root Apparatus study must preserve the five first-class Lab regions",
);
requireMatch(
  apparatusStudies,
  /Study B — Branch apparatus[\s\S]*Software[\s\S]*Boundary First Engineering[\s\S]*Executable Representation[\s\S]*Boundary First UX[\s\S]*Verification & Governance/,
  "Branch Apparatus study must exercise real Software modules and local relation topology",
);
requireMatch(
  apparatusStudies,
  /Study C — Leaf \/ publication apparatus[\s\S]*Software Before Code[\s\S]*Working Public Method[\s\S]*External practitioner review[\s\S]*worked cases/,
  "Leaf Apparatus study must expose real publication standing and its next gate",
);
requireMatch(
  apparatusStudies,
  /Root is a backplane\. Branch is an assembly\. Leaf is an instrument\./,
  "Static studies must preserve the scale-dependent Apparatus topology finding",
);
requireMatch(
  apparatusStudies,
  /Ports carry meaning before wires do/,
  "Static studies must preserve port-first connector discipline",
);
requireMatch(
  apparatusStudies,
  /Did any study require an eighth primitive\?[\s\S]*No\./,
  "Static studies must explicitly pressure-test the primitive count",
);
requireMatch(
  apparatusStudies,
  /Port morphology[\s\S]*Connector routing[\s\S]*Gate expansion[\s\S]*Trace placement[\s\S]*Relationship density threshold/,
  "Unsettled morphology questions must remain explicit before renderer implementation",
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
  ["--bf-action", "#a98cff"],
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
  /Metal = structure[\s\S]*Violet = operator agency[\s\S]*Signal colors = observed machine state/,
  "Industrial token layer must preserve material / agency / state semantic separation",
);
requireMatch(
  "src/app/bf-industrial-tokens.css",
  /Wear implies use, not neglect/,
  "Industrial token layer must preserve restrained wear doctrine",
);

// Card renderer consumes the shared palette instead of inventing a second color system.
requireMatch(
  "src/app/industrial-card-ui.css",
  /body\[data-ui-shell="cards"\]/,
  "Card styling must be isolated behind the Card shell boundary",
);
requireMatch(
  "src/app/industrial-card-ui.css",
  /\.district-card[\s\S]*var\(--bf-bg-surface\)[\s\S]*\.district-card:hover[\s\S]*var\(--bf-action-line\)/,
  "Card material and operator-action states must consume shared industrial semantics",
);
requireMatch(
  "src/app/industrial-card-ui.css",
  /world-heading::before[\s\S]*display:\s*none/,
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
  /activeUiShell[\s\S]*bf-industrial-tokens\.css[\s\S]*content-first-world\.css[\s\S]*industrial-card-ui\.css[\s\S]*data-ui-shell=\{activeUiShell\}/,
  "Layout must load shared tokens before the final Card skin and expose the active shell in DOM",
);

console.log("industrial UI contracts: pass");
