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

const component = "src/components/soccer-practitioner-record-detail.tsx";
const css = "src/app/p4-soccer-spatial-practitioner-field.css";
const contract = "docs/soccer-spatial-practitioner-field-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Soccer specialized practitioner artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "boundary-first-soccer"[\s\S]*<SoccerPractitionerRecordDetail/,
  "Soccer retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /record\.fieldLens\.dimensions\.map/,
  "Soccer must expose the six field-state lenses",
);
requireMatch(
  component,
  /record\.method\.passes\.map/,
  "Soccer must expose the five ordered phase-reading passes",
);
requireMatch(
  component,
  /Actionable space is relational/,
  "Soccer field diagram must state the relational-space rule",
);
requireMatch(
  component,
  /Backward pass repair and promotion trace/,
  "Soccer must render the worked phase as a repair-to-promotion trace",
);
requireMatch(
  component,
  /record\.workedExample\.promotionTest/,
  "Soccer must preserve the explicit promotion condition",
);
requireMatch(
  component,
  /record\.workedExample\.scopeNote/,
  "Soccer must preserve the constructed-example boundary",
);
requireMatch(
  component,
  /record\.taggingGrammar\.tags\.map/,
  "Soccer must expose the candidate analyst vocabulary",
);
requireMatch(
  component,
  /record\.taggingGrammar\.rule/,
  "Soccer must preserve compatibility with established analysis vocabularies",
);
requireMatch(
  component,
  /record\.validation\.targets\.map/,
  "Soccer must expose validation targets",
);
requireMatch(
  component,
  /Video, event data, tracking data, coaching interpretation, and established tactical frameworks remain authoritative witnesses/,
  "Soccer must retain established evidence channels as external witnesses",
);
requireMatch(
  component,
  /record\.validation\.claimRule/,
  "Soccer must preserve the comparative-evidence ceiling",
);
requireMatch(
  component,
  /record\.claimBoundary\.safe\.map/,
  "Soccer must expose safe current claims",
);
requireMatch(
  component,
  /record\.claimBoundary\.notEstablished\.map/,
  "Soccer must expose not-yet-established claims",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "Soccer specialized detail must not regress to generic record, standalone chrome, or another icon grammar",
);

requireMatch(
  css,
  /soccer-practitioner__field-map[\s\S]*grid-template-columns:/,
  "Wide Soccer representation must provide a spatial field instrument",
);
requireMatch(
  css,
  /soccer-practitioner__phase-rail[\s\S]*repeat\(5/,
  "Wide Soccer representation must expose the five phase passes as one ordered rail",
);
requireMatch(
  css,
  /@media \(max-width: 720px\)[\s\S]*soccer-practitioner__phase-rail[\s\S]*grid-template-columns:\s*1fr/,
  "Compact Soccer representation must linearize the phase rail",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Soccer practitioner field must provide a forced-colors projection",
);

requireMatch(
  contract,
  /The field is relational, not empty geometry/,
  "Soccer contract must preserve relational space",
);
requireMatch(
  contract,
  /Territory is not progress/,
  "Soccer contract must distinguish progress from forward ball motion",
);
requireMatch(
  contract,
  /Support is continuation, not proximity/,
  "Soccer contract must preserve the support distinction",
);
requireMatch(
  contract,
  /Candidate tags remain observational hypotheses/,
  "Soccer contract must preserve candidate vocabulary standing",
);
requireMatch(
  contract,
  /Established soccer evidence remains the external witness/,
  "Soccer contract must preserve domain evidence authority",
);
requireMatch(
  contract,
  /Performance claims require comparative evidence/,
  "Soccer contract must prevent illustrative fit from becoming performance claims",
);

console.log("P4 Soccer spatial practitioner-field contracts: pass");
