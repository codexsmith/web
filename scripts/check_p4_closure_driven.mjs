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

const component = "src/components/closure-driven-record-detail.tsx";
const css = "src/app/p4-closure-driven-control-surface.css";
const contract = "docs/closure-driven-delivery-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Closure-Driven specialized delivery artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "closure-driven-software-development"[\s\S]*<ClosureDrivenRecordDetail/,
  "Closure-Driven retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /record\.definition\.title[\s\S]*Each artifact is a bounded claim[\s\S]*confirm it, refine it,[\s\S]*falsify it/,
  "Closure-Driven must present execution as evidence against a bounded plan",
);
requireMatch(
  component,
  /record\.loop\.steps[\s\S]*Six-stage closure loop/,
  "Closure-Driven must expose the complete six-stage loop with witnesses",
);
requireMatch(
  component,
  /record\.certainty\.domainCone/,
  "Closure-Driven must expose the domain-certainty cone",
);
requireMatch(
  component,
  /record\.certainty\.executableCone/,
  "Closure-Driven must expose the executable-certainty cone",
);
requireMatch(
  component,
  /Commitment window[\s\S]*Ready enough for the next irreversible decision[\s\S]*Intersection, not completeness/,
  "Closure-Driven readiness must remain an intersection rather than a confidence badge",
);
requireMatch(
  component,
  /record\.deliverySkeleton\.requirements[\s\S]*Truth path[\s\S]*Real input.*meaningful operation.*recognizable output.*observable failure.*repair owner/,
  "Closure-Driven must retain the executable truth-path skeleton",
);
requireMatch(
  component,
  /record\.workedExample\.hiddenDistinctions[\s\S]*record\.workedExample\.smallestSkeleton[\s\S]*Closure gate[\s\S]*record\.workedExample\.closureCheck/,
  "The export worked example must preserve hidden distinctions, executable skeleton, and closure gate",
);
requireMatch(
  component,
  /record\.validation\.evidenceTargets[\s\S]*Current evidence ceiling[\s\S]*record\.validation\.claimRule/,
  "Closure-Driven validation targets must remain adjacent to the evidence ceiling",
);
requireMatch(
  component,
  /Safe public standing[\s\S]*record\.claimBoundary\.safe[\s\S]*Not established[\s\S]*record\.claimBoundary\.notEstablished/,
  "Closure-Driven must preserve its public claim firewall",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "Closure-Driven specialized detail must not regress to generic record, standalone chrome, or another icon grammar",
);

requireMatch(
  css,
  /closure-driven__loop[\s\S]*grid-template-columns:\s*repeat\(6/,
  "Wide Closure-Driven layout must expose the six-stage loop as one ordered backplane",
);
requireMatch(
  css,
  /@media \(max-width: 700px\)[\s\S]*closure-driven__loop[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow Closure-Driven layout must preserve the loop as one ordered flow",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Closure-Driven delivery instrument must preserve a forced-colors representation",
);

requireMatch(
  contract,
  /Delivery is progressive closure under uncertainty[\s\S]*Readiness is an intersection[\s\S]*Ticket state is not closure[\s\S]*Repair and promotion are distinct outcomes/,
  "Closure-Driven contract must preserve uncertainty, readiness, closure, and repair/promotion laws",
);

console.log("P4 Closure-Driven delivery contracts: pass");
