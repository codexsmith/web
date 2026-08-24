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

const component = "src/components/weather-research-record-detail.tsx";
const css = "src/app/p4-weather-research-testbed.css";
const contract = "docs/weather-research-testbed-contract.md";
const page = "src/app/[[...slug]]/page.tsx";

for (const path of [component, css, contract]) {
  requireExists(path, "Weather specialized research-testbed artifact must remain present");
}

requireMatch(
  page,
  /recordDetail\.entry\.id === "boundary-first-weather"[\s\S]*<WeatherResearchRecordDetail/,
  "Weather retained record must bypass the generic third-layer renderer",
);
requireMatch(
  component,
  /Established infrastructure[\s\S]*record\.scientificPosture\.baseLayer[\s\S]*Experimental layer[\s\S]*record\.scientificPosture\.boundaryFirstLayer/,
  "Weather must preserve established scientific infrastructure separately from the experimental layer",
);
requireMatch(
  component,
  /record\.coreHypothesis\.statement[\s\S]*Does not claim[\s\S]*record\.coreHypothesis\.doesNotClaim[\s\S]*record\.coreHypothesis\.test/,
  "Weather must present hypothesis, non-claims, and test together",
);
requireMatch(
  component,
  /record\.researchProgram\.levels[\s\S]*claimCeiling/,
  "Weather must preserve W0-W5 as typed claim levels with ceilings",
);
requireMatch(
  component,
  /record\.flagshipDemo\.status[\s\S]*record\.flagshipDemo\.scenes[\s\S]*record\.flagshipDemo\.desiredReaction/,
  "Weather flagship demonstrator must retain its experimental standing and inspectable modes",
);
requireMatch(
  component,
  /record\.adaptiveRefinement\.loop[\s\S]*Matched-baseline measures[\s\S]*record\.adaptiveRefinement\.evaluation/,
  "Weather refinement experiment must expose its loop and matched-baseline measures",
);
requireMatch(
  component,
  /record\.adaptiveRefinement\.claimRule/,
  "Weather refinement experiment must retain its efficiency claim rule",
);
requireMatch(
  component,
  /record\.ensembleAnalysis\.possibleOutputs[\s\S]*record\.ensembleAnalysis\.claimBoundary/,
  "Weather ensemble outputs must remain candidate diagnostics under an explicit claim boundary",
);
requireMatch(
  component,
  /record\.validationLadder\.stages/,
  "Weather must retain an ordered validation ladder",
);
requireMatch(
  component,
  /record\.validationLadder\.promotionRule/,
  "Weather validation ladder must retain its promotion rule",
);
requireMatch(
  component,
  /record\.pilot\.primaryQuestion[\s\S]*record\.pilot\.important[\s\S]*record\.pilot\.deliverables/,
  "Weather pilot must preserve its primary question, negative-result rule, and deliverables",
);
requireMatch(
  component,
  /Allowed now[\s\S]*record\.claimFirewall\.allowed[\s\S]*Not allowed yet[\s\S]*record\.claimFirewall\.notAllowedYet/,
  "Weather must preserve its public claim firewall",
);
forbidMatch(
  component,
  /GenericValue|ProductLandingRenderer|SiteHeader|SiteFooter|lucide-react/,
  "Weather specialized detail must not regress to generic record, standalone chrome, or a second icon grammar",
);

requireMatch(
  css,
  /weather-testbed__claim-ladder[\s\S]*grid-template-columns:\s*repeat\(6/,
  "Wide Weather layout must expose W0-W5 as one claim ladder",
);
requireMatch(
  css,
  /@media \(max-width: 560px\)[\s\S]*weather-testbed__claim-ladder[\s\S]*grid-template-columns:\s*1fr/,
  "Narrow Weather layout must preserve claim order in one column",
);
requireMatch(
  css,
  /@media \(forced-colors: active\)/,
  "Weather research testbed must provide a forced-colors projection",
);

requireMatch(
  contract,
  /Hypothesis is not result[\s\S]*No lower rung licenses a higher claim[\s\S]*Negative results are admissible[\s\S]*Claim firewall remains visible/,
  "Weather contract must preserve hypothesis, claim ceiling, negative-result, and firewall laws",
);

console.log("P4 Weather research-testbed contracts: pass");
