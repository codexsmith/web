import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.P6_QA_BASE ?? "http://127.0.0.1:3226";
const artifactDir = path.resolve("qa-artifacts/p6-process-circuit");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const cases = [
  { id: "full-desktop", path: "/about/how-we-work?view=process", viewport: { width: 1440, height: 1000 }, scope: "full" },
  { id: "full-tablet", path: "/about/how-we-work?view=process", viewport: { width: 900, height: 1100 }, scope: "full" },
  { id: "full-mobile", path: "/about/how-we-work?view=process", viewport: { width: 430, height: 900 }, scope: "full" },
  { id: "phase-desktop", path: "/products/current/corpus-forge?view=process&scope=phase", viewport: { width: 1440, height: 1000 }, scope: "phase" },
  { id: "phase-mobile", path: "/products/current/corpus-forge?view=process&scope=phase", viewport: { width: 430, height: 900 }, scope: "phase" },
  { id: "local-desktop", path: "/research/applied-testbeds/weather?view=process&scope=local", viewport: { width: 1440, height: 1000 }, scope: "local" },
  { id: "local-mobile", path: "/research/applied-testbeds/weather?view=process&scope=local", viewport: { width: 430, height: 900 }, scope: "local" },
];

const fullStageWords = ["Intake", "Boundary", "Representation", "Hypothesis", "Construction", "Execution", "Validation", "Repair", "Promotion"];
const failures = [];
const results = [];

function fail(name, issue) {
  failures.push({ name, issue });
}

async function probe(page) {
  return page.evaluate((expectedStageWords) => {
    const circuit = document.querySelector(".process-circuit");
    if (!circuit) return { missing: true };

    const visible = (element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && box.width > 1 && box.height > 1;
    };

    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const value = element.getBoundingClientRect();
      return { left: value.left, right: value.right, top: value.top, bottom: value.bottom, width: value.width, height: value.height };
    };

    const stageCards = Array.from(document.querySelectorAll(".process-stage-card"));
    const stageWidths = stageCards.map((element) => element.getBoundingClientRect().width);
    const zoneStages = Array.from(document.querySelectorAll(".process-zone__stages .process-stage-card")).map((element) => element.getAttribute("data-stage"));
    const axis = document.querySelector(".process-lens-axis");
    const axisHeaders = Array.from(document.querySelectorAll(".process-lens-axis__stage"));
    const axisWords = axisHeaders.map((element) => element.querySelector("strong")?.textContent?.trim() ?? "");
    const compactStageLabels = Array.from(document.querySelectorAll(".process-lens__cell-stage"))
      .filter(visible)
      .map((element) => element.textContent?.trim() ?? "");
    const visibleParticipatingCells = Array.from(document.querySelectorAll('.process-lens__cell[data-participates="true"]')).filter(visible);
    const visibleNonparticipatingCells = Array.from(document.querySelectorAll('.process-lens__cell[data-participates="false"]')).filter(visible);

    const clipped = Array.from(circuit.querySelectorAll("strong,p,small,span,h2"))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        if (style.display === "none" || style.visibility === "hidden" || box.width <= 1 || box.height <= 1) return false;
        if (style.textOverflow === "ellipsis") return false;
        const horizontal = element.scrollWidth > element.clientWidth + 3 && /hidden|clip/.test(style.overflowX);
        const vertical = element.scrollHeight > element.clientHeight + 3 && /hidden|clip/.test(style.overflowY);
        return horizontal || vertical;
      })
      .slice(0, 10)
      .map((element) => (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120));

    return {
      missing: false,
      scope: circuit.getAttribute("data-process-scope"),
      boundaryFrameCount: document.querySelectorAll(".boundary-frame.boundary-frame--visible").length,
      documentHorizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      zoneCount: document.querySelectorAll(".process-zone").length,
      frame: rect(".process-zone--frame"),
      operate: rect(".process-zone--operate"),
      answer: rect(".process-zone--answer"),
      stewardship: rect(".process-stewardship"),
      returnRail: rect(".process-return-rail"),
      stageCount: stageCards.length,
      minStageWidth: stageWidths.length ? Math.min(...stageWidths) : 0,
      maxStageWidth: stageWidths.length ? Math.max(...stageWidths) : 0,
      promotionInsideOrderedZones: zoneStages.includes("promotion"),
      stewardshipCount: document.querySelectorAll(".process-stewardship").length,
      lensCount: document.querySelectorAll(".process-lens").length,
      lensTableCount: document.querySelectorAll('.process-lens-board[role="table"]').length,
      lensAxisHeaderCount: axisHeaders.length,
      lensAxisVisible: axis ? visible(axis) : false,
      lensAxisWords: axisWords,
      lensAxisHasFullWords: expectedStageWords.every((word) => axisWords.includes(word)),
      currentAxisCount: document.querySelectorAll('.process-lens-axis__stage[data-current="true"]').length,
      lensCellCount: document.querySelectorAll(".process-lens__cell").length,
      appliesCellCount: document.querySelectorAll('.process-lens__cell[data-participates="true"] strong').length,
      anonymousCoverageCount: document.querySelectorAll(".process-lens__coverage").length,
      visibleParticipatingCellCount: visibleParticipatingCells.length,
      visibleNonparticipatingCellCount: visibleNonparticipatingCells.length,
      compactStageLabels,
      compactLabelsAreFullWords: compactStageLabels.every((label) => expectedStageWords.includes(label)),
      oldPipelineCount: document.querySelectorAll(".gestalt-view:not(.founder-timeline-view) .gestalt-pipeline").length,
      oldDisciplineMapCount: document.querySelectorAll(".gestalt-discipline-map").length,
      clipped,
    };
  }, fullStageWords);
}

function checkDesktopShape(name, metrics) {
  if (!metrics.frame || !metrics.operate || !metrics.answer || !metrics.stewardship || !metrics.returnRail) {
    fail(name, "full desktop circuit is missing one or more functional structures");
    return;
  }

  if (!(metrics.frame.right <= metrics.operate.left + 14)) fail(name, "Frame zone is not spatially upstream of Make & Operate");
  if (!(metrics.answer.top >= metrics.frame.bottom - 14)) fail(name, "Answer & Repair is not spatially downstream of Frame");
  if (!(metrics.stewardship.right <= metrics.answer.left + 14)) fail(name, "Stewardship dock is not distinct from Answer & Repair");
  const downstreamBottom = Math.max(metrics.answer.bottom, metrics.stewardship.bottom, metrics.operate.bottom);
  if (!(metrics.returnRail.top >= downstreamBottom - 14)) fail(name, "Return rail does not close beneath the operating circuit");
  if (metrics.minStageWidth < 120) fail(name, `desktop stage card collapsed to ${Math.round(metrics.minStageWidth)}px`);
}

function checkLensSemantics(name, metrics, viewport) {
  if (metrics.lensTableCount !== 1) fail(name, `expected one semantic operating-lens matrix, found ${metrics.lensTableCount}`);
  if (metrics.anonymousCoverageCount !== 0) fail(name, "anonymous pill coverage strips returned");
  if (metrics.lensCellCount !== 54) fail(name, `expected 54 lens/stage cells, found ${metrics.lensCellCount}`);
  if (metrics.appliesCellCount < 1) fail(name, "operating-lens matrix has no explicit Applies states");
  if (metrics.currentAxisCount < 1) fail(name, "current object placement is not represented on the stage axis");

  if (viewport.width > 1180) {
    if (!metrics.lensAxisVisible) fail(name, "wide process view hides the canonical stage axis");
    if (metrics.lensAxisHeaderCount !== 9) fail(name, `wide process view should expose nine stage headers, found ${metrics.lensAxisHeaderCount}`);
    if (!metrics.lensAxisHasFullWords) fail(name, `wide process stage axis is missing full words: ${metrics.lensAxisWords.join(", ")}`);
  } else {
    if (metrics.lensAxisVisible) fail(name, "compact process view retained the wide matrix axis instead of recomposing");
    if (metrics.visibleNonparticipatingCellCount !== 0) fail(name, "compact lens cards show non-participating matrix cells instead of a participation list");
    if (metrics.visibleParticipatingCellCount < 1) fail(name, "compact lens cards lost their participating stages");
    if (!metrics.compactLabelsAreFullWords) fail(name, `compact lens cards use compressed stage labels: ${metrics.compactStageLabels.join(", ")}`);
  }
}

async function visit(browser, testCase) {
  const context = await browser.newContext({ viewport: testCase.viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300)); });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));

  const response = await page.goto(`${base}${testCase.path}`, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page.locator(".process-circuit").waitFor({ state: "visible", timeout: 12_000 });
  await page.waitForTimeout(120);
  const metrics = await probe(page);
  const issues = [];

  if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.missing) issues.push("process circuit missing");
  else {
    if (metrics.scope !== testCase.scope) issues.push(`expected scope ${testCase.scope}, got ${metrics.scope}`);
    if (metrics.boundaryFrameCount !== 1) issues.push(`expected one visible Boundary Frame, found ${metrics.boundaryFrameCount}`);
    if (metrics.documentHorizontalOverflow) issues.push("process circuit caused document horizontal overflow");
    if (metrics.promotionInsideOrderedZones) issues.push("Promotion collapsed back into an equal ordered stage tile");
    if (metrics.oldPipelineCount !== 0) issues.push("legacy process pipeline still renders in non-root process projection");
    if (metrics.oldDisciplineMapCount !== 0) issues.push("legacy discipline-band map still renders");
    if (metrics.clipped.length) issues.push(`clipped text: ${metrics.clipped.join(" | ")}`);

    if (testCase.scope === "full") {
      if (metrics.stageCount !== 8) issues.push(`full circuit should render eight zoned stages plus stewardship, found ${metrics.stageCount} zoned stages`);
      if (metrics.stewardshipCount !== 1) issues.push(`full circuit should render one stewardship dock, found ${metrics.stewardshipCount}`);
      if (metrics.lensCount !== 6) issues.push(`full circuit should render six operating lenses, found ${metrics.lensCount}`);
      if (!metrics.returnRail) issues.push("full circuit is missing its return rail");
      checkLensSemantics(testCase.id, metrics, testCase.viewport);
    }

    if (testCase.scope === "phase") checkLensSemantics(testCase.id, metrics, testCase.viewport);
    if (testCase.scope === "local" && metrics.lensCount !== 0) issues.push("local scope should omit the operating-lens dock");

    if (testCase.id === "full-desktop") checkDesktopShape(testCase.id, metrics);
    if (testCase.viewport.width <= 430 && metrics.minStageWidth < 220) issues.push(`mobile step card is too narrow at ${Math.round(metrics.minStageWidth)}px`);
  }

  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  await page.locator(".process-circuit").scrollIntoViewIfNeeded();
  const screenshot = path.join(screenshotDir, `${testCase.id}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });

  results.push({ ...testCase, metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
  issues.forEach((issue) => fail(testCase.id, issue));
  await context.close();
}

async function checkFounderTimeline(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const name = "root-founder-timeline";
  const issues = [];
  const response = await page.goto(`${base}/?world=1&view=process`, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page.locator(".founder-timeline-view").waitFor({ state: "visible", timeout: 12_000 });
  const metrics = await page.evaluate(() => ({
    processCircuitCount: document.querySelectorAll(".process-circuit").length,
    founderTimelineCount: document.querySelectorAll(".founder-timeline .gestalt-pipeline__stages").length,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
  }));
  if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.processCircuitCount !== 0) issues.push("root founder timeline was incorrectly replaced by ProcessCircuit");
  if (metrics.founderTimelineCount !== 1) issues.push("root founder timeline no longer renders its development arc");
  if (metrics.horizontalOverflow) issues.push("root founder timeline caused horizontal overflow");
  const screenshot = path.join(screenshotDir, `${name}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });
  results.push({ id: name, path: "/?world=1&view=process", viewport: { width: 1440, height: 1000 }, metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
  issues.forEach((issue) => fail(name, issue));
  await context.close();
}

function writeReport() {
  const lines = [
    "# P6 BFUX Process Circuit QA",
    "",
    `Failures: **${failures.length}**`,
    "",
    "| Surface | Viewport | Scope | Zones | Stages | Lenses | Axis | Overflow | Issues |",
    "|---|---:|---|---:|---:|---:|---|---|---|",
    ...results.map((item) => `| ${item.id} | ${item.viewport.width}×${item.viewport.height} | ${item.scope ?? "timeline"} | ${item.metrics.zoneCount ?? "—"} | ${item.metrics.stageCount ?? "—"} | ${item.metrics.lensCount ?? "—"} | ${item.metrics.lensAxisVisible ? "matrix" : item.metrics.lensCount ? "full-word cards" : "—"} | ${item.metrics.documentHorizontalOverflow || item.metrics.horizontalOverflow ? "FAIL" : "ok"} | ${item.issues.length ? item.issues.join("; ") : "—"} |`),
  ];
  fs.writeFileSync(path.join(artifactDir, "report.json"), JSON.stringify({ failures, results }, null, 2));
  fs.writeFileSync(path.join(artifactDir, "report.md"), `${lines.join("\n")}\n`);
  console.log(lines.join("\n"));
}

const browser = await chromium.launch({ headless: true });
try {
  for (const testCase of cases) await visit(browser, testCase);
  await checkFounderTimeline(browser);
  writeReport();
} finally {
  await browser.close();
}

if (failures.length) process.exitCode = 1;
