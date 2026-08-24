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

const component = "src/components/law-research-record-detail.tsx";
const css = "src/app/p4-law-provenance-research.css";
const contract = "docs/law-provenance-research-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Law specialized provenance-research artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "constitutional-law-and-jurisprudence"[\s\S]*<LawResearchRecordDetail/,
  "Law retained record must bypass the generic third-layer renderer",
);

for (const [pattern, message] of [
  [/record\.legalNotice\.title/, "Law must retain the prominent research-not-advice boundary"],
  [/record\.legalNotice\.rules\.map/, "Law must retain the operational rules on legal reliance"],
  [/record\.constitutionalBaseline\.anchors\.map/, "Law must expose current-law authority anchors"],
  [/anchor\.sourceKeys\.map/, "Law authority anchors must retain visible source keys"],
  [/record\.claimRegimes\.types\.map/, "Law must expose typed legal claim regimes"],
  [/data-claim-type/, "Law claim status must remain visible in the rendered structure"],
  [/record\.legalProcessModel\.chain\.map/, "Law must retain the full legal-process systems chain"],
  [/record\.legalProcessModel\.closureRule/, "Law must distinguish procedural finality from systems closure"],
  [/record\.dueProcessBridge\.mathewsFactors/, "Law must retain the due-process current-doctrine bridge"],
  [/record\.standingBridge\.criticalBoundary/, "Law must retain the boundary between standing doctrine and analogy"],
  [/record\.controlledCompression\.statusOfCandidate/, "Law must label controlled compression as proposed jurisprudence"],
  [/record\.privatePower\.warning/, "Law must prevent private consequential power from becoming state-action doctrine"],
  [/record\.boundaryFirstJurisprudence\.questions\.map/, "Law must preserve its proposed jurisprudential inspection grammar"],
  [/record\.flagshipDemo\.legalBoundary/, "Law synthetic demonstration must retain its jurisdiction/non-advice boundary"],
  [/record\.flagshipDemo\.sequence\.map/, "Law must render the synthetic consequence-to-repair sequence"],
  [/record\.repair\.important/, "Law repair taxonomy must retain the actual-law availability boundary"],
  [/record\.legalDiagnostic\.questions\.map/, "Law must preserve the repeatable systems diagnostic"],
  [/record\.legalDiagnostic\.output\.map/, "Law diagnostic must expose reconstructable outputs"],
  [/Object\.entries\(record\.citations\.sourceKeys\)/, "Law must render an authority/source register"],
  [/record\.citations\.strategy/, "Law must preserve primary/official-source provenance strategy"],
  [/record\.lawyerCollaboration\.premise/, "Law must preserve the professional-counsel boundary"],
  [/record\.claimFirewall\.items\.map/, "Law must preserve its public claim firewall"],
]) {
  requireMatch(component, pattern, message);
}

forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react|aria-modal|role="dialog"/,
  "Law specialized detail must not regress to generic record, standalone chrome, modal detail, or another icon grammar",
);

requireMatch(
  css,
  /law-research__authority-grid[\s\S]*grid-template-columns:\s*repeat\(3/,
  "Wide Law layout must expose authority anchors as an inspectable register",
);
requireMatch(
  css,
  /law-research__claim-grid[\s\S]*grid-template-columns:\s*repeat\(4/,
  "Wide Law layout must expose legal claim regimes without collapsing standing",
);
requireMatch(
  css,
  /law-research__process-chain[\s\S]*grid-template-columns:\s*repeat\(9/,
  "Wide Law layout must expose the complete legal process chain",
);
requireMatch(
  css,
  /@media \(max-width: 560px\)[\s\S]*law-research__process-chain[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow Law layout must linearize the process while preserving sequence",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Law provenance research instrument must provide a forced-colors projection",
);

for (const [pattern, message] of [
  [/Current law precedes proposed doctrine/, "Law contract must preserve current-law precedence"],
  [/Consequential propositions carry standing/, "Law contract must preserve claim typing"],
  [/Authority remains reconstructable/, "Law contract must preserve source provenance"],
  [/Jurisdiction remains a boundary condition/, "Law contract must preserve jurisdiction boundaries"],
  [/Analogy is not doctrine/, "Law contract must keep analogy distinct from doctrine"],
  [/Proposal is not entitlement/, "Law contract must prevent proposals from manufacturing legal rights"],
  [/Synthetic demonstrations remain synthetic/, "Law contract must preserve synthetic-case standing"],
  [/Research stops where professional application begins/, "Law contract must preserve the lawyer/application boundary"],
]) {
  requireMatch(contract, pattern, message);
}

console.log("P4 Law provenance-research contracts: pass");
