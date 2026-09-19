import fs from "node:fs";

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const qa = fs.readFileSync("scripts/qa_v3_release.mjs", "utf8");
const workflow = fs.readFileSync(".github/workflows/v3-release-qa.yml", "utf8");
const foundation = fs.readFileSync(
  "src/components/institutional/styles/InstitutionalFoundation.module.css",
  "utf8",
);
const shell = fs.readFileSync(
  "src/components/institutional/InstitutionalPageShell.tsx",
  "utf8",
);

expect(
  qa.includes("institutionalPublicRoutes"),
  "v3 release QA must derive its route matrix from institutionalPublicRoutes",
);
for (const width of ["1440", "1180", "820", "390", "320"]) {
  expect(qa.includes(`width: ${width}`), `v3 release QA must cover the ${width}px viewport`);
}
expect(qa.includes('reducedMotion: "reduce"'), "v3 release QA must exercise reduced-motion rendering");
expect(qa.includes("Skip to main content"), "v3 release QA must exercise the skip link");
expect(qa.includes("Control+K"), "v3 release QA must exercise keyboard command-palette access");
expect(qa.includes("__release-qa-missing__"), "v3 release QA must exercise the institutional 404 state");
expect(qa.includes("horizontalOverflow"), "v3 release QA must check horizontal overflow");
expect(qa.includes("clippedText"), "v3 release QA must check clipped text");
expect(qa.includes("unnamedInteractive"), "v3 release QA must check interactive accessible names");
expect(qa.includes("undersizedControls"), "v3 release QA must check minimum control targets");
expect(qa.includes("longMotion"), "v3 release QA must check reduced-motion regressions");

expect(
  workflow.includes("node-version: 24"),
  "v3 release QA workflow must use the repository Node 24 runtime",
);
expect(
  workflow.includes("playwright@1.55.0"),
  "v3 release QA workflow must pin its Playwright harness",
);
expect(
  workflow.includes("node scripts/qa_v3_release.mjs"),
  "v3 release QA workflow must execute the release harness",
);
expect(
  workflow.includes("qa-artifacts/v3-release"),
  "v3 release QA workflow must retain reports and screenshots",
);

expect(
  shell.includes('className={styles.skipLink}') &&
    shell.includes('href="#institutional-main"'),
  "institutional page shell must retain a skip link to #institutional-main",
);
expect(
  foundation.includes(".skipLink:focus"),
  "institutional stylesheet must keep a visible focused skip link",
);
expect(
  foundation.includes("@media (prefers-reduced-motion: reduce)"),
  "institutional stylesheet must retain reduced-motion handling",
);

if (failures.length) {
  console.error("Website v3 release QA contract failures:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Website v3 release QA contracts passed.");
