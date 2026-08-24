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

const component = "src/components/chess-practitioner-record-detail.tsx";
const css = "src/app/p4-chess-practitioner-decision-board.css";
const contract = "docs/chess-practitioner-decision-board-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Chess specialized practitioner artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "boundary-first-chess"[\s\S]*<ChessPractitionerRecordDetail/,
  "Chess retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /record\.definition\.title/,
  "Chess must preserve the state-transition definition",
);
requireMatch(
  component,
  /record\.definition\.rule/,
  "Chess must preserve the move-plus-resulting-state decision rule",
);
requireMatch(
  component,
  /record\.positionLens\.dimensions\.map/,
  "Chess must expose the six position-lens dimensions",
);
requireMatch(
  component,
  /record\.method\.passes\.map/,
  "Chess must expose the five ordered commitment passes",
);
requireMatch(
  component,
  /Candidate move consequence trace/,
  "Chess must render the worked example as a consequence trace",
);
requireMatch(
  component,
  /record\.workedExample\.naiveRead/,
  "Chess must preserve the naive material-gain read for comparison",
);
requireMatch(
  component,
  /record\.workedExample\.boundaryRead/,
  "Chess must preserve the reply-aware boundary reading",
);
requireMatch(
  component,
  /record\.workedExample\.scopeNote/,
  "Chess must preserve the constructed-example / non-benchmark boundary",
);
requireMatch(
  component,
  /record\.validation\.targets\.map/,
  "Chess must expose practitioner validation targets",
);
requireMatch(
  component,
  /Agreement with established chess analysis on the actual position/,
  "Chess must retain established chess analysis as the external truth condition",
);
requireMatch(
  component,
  /record\.validation\.claimRule/,
  "Chess must retain the comparative-evidence ceiling",
);
requireMatch(
  component,
  /record\.claimBoundary\.safe\.map/,
  "Chess must expose safe current claims",
);
requireMatch(
  component,
  /record\.claimBoundary\.notEstablished\.map/,
  "Chess must expose not-yet-established claims",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "Chess specialized detail must not regress to generic record, standalone chrome, or another icon grammar",
);

requireMatch(
  css,
  /chess-practitioner__position-board[\s\S]*grid-template-columns:/,
  "Wide Chess representation must provide a spatial position instrument",
);
requireMatch(
  css,
  /chess-practitioner__pass-rail[\s\S]*repeat\(5/,
  "Wide Chess representation must expose the five commitment passes as one ordered rail",
);
requireMatch(
  css,
  /@media \(max-width: 520px\)[\s\S]*chess-practitioner__pass-rail[\s\S]*grid-template-columns:\s*1fr/,
  "Compact Chess representation must linearize the commitment rail",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Chess practitioner board must provide a forced-colors projection",
);

requireMatch(
  contract,
  /Position precedes move score/,
  "Chess contract must make resulting state primary to isolated move score",
);
requireMatch(
  contract,
  /Calculation remains authoritative for concrete lines/,
  "Chess contract must preserve calculation authority",
);
requireMatch(
  contract,
  /The worked example remains illustrative/,
  "Chess contract must preserve the non-benchmark standing of the example",
);
requireMatch(
  contract,
  /Established chess remains the external witness/,
  "Chess contract must preserve established domain truth conditions",
);
requireMatch(
  contract,
  /Teaching claims require evidence/,
  "Chess contract must prevent explanatory fit from becoming performance claims",
);

console.log("P4 Chess practitioner decision-board contracts: pass");
