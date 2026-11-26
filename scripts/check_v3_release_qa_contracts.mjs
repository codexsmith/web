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
const readerUx = fs.readFileSync("scripts/lib/reader_ux_qa.mjs", "utf8");
expect(qa.includes("await verifyReaderUx(browser, base, mode, readerReviewDir)") && qa.includes('forcedColors: "active"') && readerUx.includes("all eight authority states") && readerUx.includes("local draft boundary") && readerUx.includes("reversible reader disclosure"), "release QA must execute BFUX reader behavior, including forced colors and protected local state");
expect(readerUx.includes("bounded reader density and preserved engagement paths") && readerUx.includes("closing a local representation must not erase the draft") && readerUx.includes("institutional wordmark must remain visible on arrival"), "reader acceptance must protect initial orientation, reversible disclosure, and direct engagement");
expect(readerUx.includes("forced-color sticky rail must have an opaque system-color background") && foundation.includes("background: Canvas;"), "forced-color reader rail must preserve containment when gradients are suppressed");
expect(readerUx.includes("reader glyphs preserve written labels and decorative semantics") && readerUx.includes("doctrine-glyphs"), "reader glyphs must preserve canonical destinations, written labels and decorative accessibility");
expect(readerUx.includes("scientific illustration fidelity and accessible projection") && readerUx.includes("equal-area rectangles must preserve the same length scale") && readerUx.includes("non-color-only reservation markers"), "public scientific plates must preserve bounded examples and accessibility");
expect(readerUx.includes("masthead engraving containment and projection") && readerUx.includes("masthead ornament must occupy only unclaimed reading space") && readerUx.includes("ornament must yield in compact and forced-color projections"), "masthead ornament must remain decorative, non-interfering and responsive");
expect(readerUx.includes("editorial chapter sequence and caption identity") && readerUx.includes("chapter heading identity must survive editorial numbering") && readerUx.includes("reused figure numbering belongs to the local reader"), "editorial finish must preserve canonical reader copy and local numbering");
expect(readerUx.includes("repair gauge geometry and numeric readout must agree") && readerUx.includes("engraved scale endpoints must match native control bounds") && readerUx.includes("effective visual state must derive from effective authority"), "instrument finish must preserve derived readouts and actual effective policy state");
const readerStyle = fs.readFileSync("src/components/institutional/styles/DoctrineFrontDoor.module.css", "utf8");
expect((readerStyle.match(/--df-reader-paper\s*:/g) ?? []).length === 1 && (readerStyle.match(/--df-ink\s*:/g) ?? []).length === 1, "curated reader tokens must have a single local owner");
expect(readerUx.includes("repair gauge must be an unanimated, unpadded state projection") && readerUx.includes("100 * 900 / 2100"), "repair gauge acceptance must exercise stable geometry and non-integral coverage");
expect(readerUx.includes("nameplate text contrast must preserve reading and system-color choice") && readerUx.includes("data-science-caption-band") && readerStyle.includes("--df-reader-chassis:"), "operational and scientific contrast must preserve readable text and forced-color agency");
expect(readerUx.includes("heritage rendering must preserve the founder-attributed ordered account") && readerUx.includes("human purpose remains the existing authored text") && readerUx.includes("instrument scope remains visible independently of letter case"), "heritage finish must preserve attributed history, human purpose, and visible instrument scope");
expect(readerUx.includes("title-first compact heading metadata") && readerUx.includes("short Observatory hero metadata shares a single line when there is room") && readerUx.includes("compact Observatory metadata wraps instead of forcing overflow"), "title-first hierarchy must preserve reading order and natural width-aware metadata wrapping");
expect(readerUx.includes("typographic roles must be distinctly readable without smaller body copy or targets") && readerUx.includes("related text and actions must use the bounded spacing hierarchy"), "reader typography and spacing must preserve readable body text and reachable actions");
expect(readerUx.includes("semantic collection syntax and scope preservation") && readerUx.includes("collection role determines containment and row/peer structure") && readerUx.includes("evidence comparison must retain both the positive and negative claim boundary in each row") && readerUx.includes("reference material is not an invented interactive destination"), "reader collections must preserve their semantic type, order, boundaries and available actions");
expect(readerUx.includes("narrow pathways retain independent peer boundaries and explicit destinations") && readerUx.includes("institutional background uses the same directory grammar") && readerUx.includes("memberMaterial") && !readerStyle.includes('[data-work-group],[data-work-section="know"],[data-audience-paths="work-with-us"]'), "collection role must own row and peer material across narrow and wide projections; preserve computed material diagnostics");
expect(readerUx.includes("Observatory editorial economy and contextual identity") && readerUx.includes("local labels preserve the complete standalone identity") && readerUx.includes("editorial compression must not erase local claim boundaries"), "contextual editorial compression must retain independent identity and claim scope");
expect(readerUx.includes("primary reader editorial economy and engagement choice") && readerUx.includes("gateway classifications, descriptions and actions remain distinct and addressable") && readerUx.includes("independent engagement choices must not imply a numbered procedure") && readerUx.includes("editorial economy preserves Codexware authorization, execution and assurance limits"), "primary reader editorial economy must preserve identity, independent choices, and authority limits");
expect(readerUx.includes("closed disclosure height belongs to its own summary, not an adjacent panel") && readerUx.includes("closing the disclosure must recover its original compact geometry") && readerUx.includes("captureFrames") && readerUx.includes("editorial capture must expose the region start below the sticky rail without moving focus") && readerStyle.includes(".surface .reading > .readerDetails"), "reader disclosure geometry and editorial evidence framing must preserve local state and keyboard focus");
expect(readerUx.includes("compact sticky section navigation and local identity") && readerUx.includes("section activation moves focus to its real fragment destination") && readerUx.includes("closed local navigation must occupy one compact rail") && readerStyle.includes(".surface .sectionNav[data-section-nav-ready") && !readerStyle.includes(".surface .hero::after"), "long reader navigation must replace the decorative seam with compact, focus-preserving fragment traversal");
const doctrineNavigation = fs.readFileSync("scripts/lib/doctrine_navigation_qa.mjs", "utf8");
expect(doctrineNavigation.includes("section navigation must cover every rendered closing section in its declared order"), "section navigation must not omit an admitted evidence or doctrine closing section");
expect(readerUx.includes("focusWitness") && readerUx.includes("focusSamples") && readerUx.includes("focus obligation failed") && workflow.includes("name: v3-reader-review"), "reader QA must preserve focus diagnostics and a compact human-review artifact");
expect(qa.includes("await checkPublicationDiscovery()") && qa.includes("sitemap.xml") && qa.includes("robots.txt") && qa.includes('["x-robots-tag"]'), "release QA must exercise live discovery policy and reference response headers");
expect(workflow.includes('BFL_V3_INDEXABLE: "true"'), "release QA must exercise production indexing policy on the isolated build");
expect(qa.includes('page.locator("main a[href]")') && qa.includes("supportingPublicationEntries") && qa.includes("supporting reader lacks a visible contextual return") && qa.includes("homepage directly promotes retained reference route"), "release QA must verify editorial parent/child traversal and homepage prominence");
expect(qa.includes("doctrineNavigationIssues(page, config.route)"), "release QA must check the doctrine closing section in rendered pages");
expect(qa.includes("verifyDoctrineTraversals(browser, base"), "release QA must traverse all twelve principal-page doctrine links");
expect(qa.includes("clippedText"), "v3 release QA must check clipped text");
expect(qa.includes("unnamedInteractive"), "v3 release QA must check interactive accessible names");
expect(qa.includes("targetSpacingViolations"), "v3 release QA must check minimum target size and spacing");
expect(qa.includes("longMotion"), "v3 release QA must check reduced-motion regressions");

expect(
  workflow.includes("node-version: 24"),
  "v3 release QA workflow must use the repository Node 24 runtime",
);
expect(
  workflow.includes("runs-on: ubuntu-24.04"),
  "v3 release QA must use the Ubuntu 24.04 runner supported by its pinned browser harness",
);
expect(
  workflow.includes('npm install --prefix "$RUNNER_TEMP/v3-release-qa"') &&
    workflow.includes("V3_RELEASE_QA_PLAYWRIGHT_MODULE:") &&
    qa.includes("process.env.V3_RELEASE_QA_PLAYWRIGHT_MODULE"),
  "v3 release QA must install its browser harness outside the application dependency tree",
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
