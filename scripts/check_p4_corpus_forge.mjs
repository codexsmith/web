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

const component = "src/components/corpus-forge-record-detail.tsx";
const css = "src/app/p4-corpus-forge-workbench.css";
const contract = "docs/corpus-forge-workbench-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Corpus Forge specialized workbench artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "corpus-forge"[\s\S]*<CorpusForgeRecordDetail/,
  "Corpus Forge record detail must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /Research-operations workbench[\s\S]*record\.lifecycle\.stages/,
  "Corpus Forge must present the retained record as a research-operations workbench with the lifecycle visible",
);
requireMatch(
  component,
  /record\.objects\.types[\s\S]*supports[\s\S]*contradicts[\s\S]*supersedes/,
  "Corpus Forge must preserve typed objects and typed relation semantics",
);
requireMatch(
  component,
  /record\.workedExample\.trace[\s\S]*Operational lesson[\s\S]*scopeNote/,
  "Corpus Forge must retain an inspectable contradiction trace through review and repair",
);
requireMatch(
  component,
  /record\.promotionGrammar\.states[\s\S]*Promotion gates[\s\S]*record\.promotionGrammar\.gates/,
  "Maturity states and promotion gates must remain separate structures",
);
requireMatch(
  component,
  /record\.validation\.targets[\s\S]*Current evidence ceiling[\s\S]*record\.validation\.claimRule/,
  "Validation targets must remain adjacent to the active-development evidence ceiling",
);
requireMatch(
  component,
  /record\.relationship\.boundary[\s\S]*Corpus Forge Workbench[\s\S]*Claim &amp; Evidence Ledger/,
  "Method, software expression, and focused ledger surface must remain distinct",
);
requireMatch(
  component,
  /Safe public standing[\s\S]*record\.claimBoundary\.safe[\s\S]*Not established[\s\S]*record\.claimBoundary\.notEstablished/,
  "Corpus Forge must preserve its public claim firewall",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter/,
  "Corpus Forge specialized detail must not regress to a generic record or standalone landing renderer",
);

requireMatch(
  css,
  /corpus-forge__pipeline[\s\S]*grid-template-columns:\s*repeat\(6/,
  "Wide Corpus Forge layout must expose the six-stage lifecycle as one ordered backplane",
);
requireMatch(
  css,
  /@media \(max-width: 620px\)[\s\S]*corpus-forge__pipeline[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow Corpus Forge layout must reflow lifecycle semantics into one column",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Corpus Forge workbench must preserve a forced-colors representation",
);

requireMatch(
  contract,
  /governed state machine over typed research objects[\s\S]*Maturity is not visual prominence[\s\S]*preserve disagreement before reconciliation/,
  "Corpus Forge contract must preserve the state, promotion, and contradiction laws",
);

console.log("P4 Corpus Forge workbench contracts: pass");
