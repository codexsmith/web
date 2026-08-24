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

const component = "src/components/schemathematics-formal-record-detail.tsx";
const css = "src/app/p4-schemathematics-formal-program.css";
const contract = "docs/schemathematics-formal-program-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Schemathematics specialized formal-program artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "schemathematics"[\s\S]*<SchemathematicsFormalRecordDetail/,
  "Schemathematics retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /record\.definition\.title[\s\S]*record\.definition\.body/,
  "Schemathematics must retain its definition boundary",
);
requireMatch(
  component,
  /record\.definition\.discipline/,
  "Schemathematics must preserve the obligation to import established mathematics where sufficient",
);
requireMatch(
  component,
  /record\.operativeProfile\.fields\.map/,
  "Schemathematics must expose the operative profile coordinates",
);
requireMatch(
  component,
  /profileGlyphs\[index\]/,
  "Schemathematics operative profile must retain typed BFUX glyphs",
);
requireMatch(
  component,
  /record\.coreQuestions\.map/,
  "Schemathematics must preserve its inspection questions",
);
requireMatch(
  component,
  /record\.workedExample\.purpose/,
  "The monoid-group example must retain its established-mathematics standing",
);
requireMatch(
  component,
  /record\.workedExample\.monoid\.admissibility/,
  "The monoid side must retain its admissibility conditions",
);
requireMatch(
  component,
  /record\.workedExample\.monoid\.notGuaranteed/,
  "The weaker structure must retain explicit non-guarantees",
);
requireMatch(
  component,
  /record\.workedExample\.group\.addedCondition/,
  "The monoid-group promotion must expose universal invertibility as the added condition",
);
requireMatch(
  component,
  /record\.workedExample\.group\.newlyGuaranteed/,
  "The promoted group structure must expose the newly guaranteed operations",
);
requireMatch(
  component,
  /record\.workedExample\.boundaryDistinction/,
  "Schemathematics must preserve the structural boundary distinction in the worked comparison",
);
requireMatch(
  component,
  /record\.researchHypotheses\.map[\s\S]*Standing · hypothesis/,
  "Schemathematics research hypotheses must remain visibly marked as hypotheses",
);
requireMatch(
  component,
  /record\.validation\.tests\.map/,
  "Schemathematics must retain its formal and representational validation tests",
);
requireMatch(
  component,
  /record\.validation\.comparisonShape/,
  "Schemathematics must retain a comparative benchmark shape",
);
requireMatch(
  component,
  /record\.validation\.claimRule/,
  "Schemathematics must retain its benchmark evidence ceiling",
);
requireMatch(
  component,
  /record\.claimBoundary\.safe\.map/,
  "Schemathematics must expose safe current public standing",
);
requireMatch(
  component,
  /record\.claimBoundary\.notYetEstablished\.map/,
  "Schemathematics must expose claims that are not yet established",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "Schemathematics specialized detail must not regress to generic record, standalone chrome, or another icon grammar",
);

requireMatch(
  css,
  /schemathematics-program__profile-grid[\s\S]*grid-template-columns:\s*repeat\(4/,
  "Wide Schemathematics layout must expose the operative profile as a formal atlas",
);
requireMatch(
  css,
  /schemathematics-program__dependency-trace[\s\S]*grid-template-columns:/,
  "Schemathematics must provide a spatial dependency trace on wide screens",
);
requireMatch(
  css,
  /@media \(max-width: 620px\)[\s\S]*schemathematics-program__dependency-trace[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow Schemathematics layout must linearize the dependency trace without losing order",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Schemathematics formal program must provide a forced-colors projection",
);

requireMatch(
  contract,
  /Formal fidelity precedes representational convenience/,
  "Schemathematics contract must preserve formal fidelity",
);
requireMatch(
  contract,
  /Established examples remain established mathematics/,
  "Schemathematics contract must prevent representational examples from becoming novelty claims",
);
requireMatch(
  contract,
  /Research hypotheses remain hypotheses/,
  "Schemathematics contract must preserve hypothesis standing",
);
requireMatch(
  contract,
  /Proof obligations and benchmark obligations are different/,
  "Schemathematics contract must separate formal and empirical validation burdens",
);
requireMatch(
  contract,
  /Representation is not novelty/,
  "Schemathematics contract must separate representation from novelty",
);

console.log("P4 Schemathematics formal-program contracts: pass");
