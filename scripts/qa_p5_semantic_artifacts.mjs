import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.P5_QA_BASE ?? "http://127.0.0.1:3225";
const artifactDir = path.resolve("qa-artifacts/p5-semantic-artifacts");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const routes = [
  { id: "mission", path: "/public-interest/mission", artifactId: "mission-return-path", kind: "loop" },
  { id: "corpus-forge", path: "/products/current/corpus-forge", artifactId: "corpus-forge-lifecycle", kind: "loop" },
  { id: "agency-audit", path: "/products/current/agency-representation-audit", artifactId: "agency-audit-five-pass", kind: "sequence" },
  { id: "how-we-work", path: "/about/how-we-work", artifactId: "how-we-work-loop", kind: "loop" },
  { id: "bfux", path: "/research/software/boundary-first-ux", artifactId: "bfux-operator-grammar", kind: "loop" },
  { id: "verification", path: "/research/software/verification-governance", artifactId: "verification-consequence-loop", kind: "loop" },
  { id: "capacity-map", path: "/products/pipeline/need-capacity-map", artifactId: "capacity-admissible-match", kind: "convergence" },
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 430, height: 900 },
};

const results = [];
const failures = [];

function pushFailure(name, issue) {
  failures.push({ name, issue });
}

async function layoutProbe(page, selector) {
  return page.evaluate((artifactSelector) => {
    const artifact = document.querySelector(artifactSelector);
    if (!artifact) return { missing: true };

    const visible = (element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
    };

    const clipped = Array.from(artifact.querySelectorAll("strong,small,p,span"))
      .filter(visible)
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.textOverflow === "ellipsis") return false;
        const horizontal = element.scrollWidth > element.clientWidth + 3 && /hidden|clip/.test(style.overflowX);
        const vertical = element.scrollHeight > element.clientHeight + 3 && /hidden|clip/.test(style.overflowY);
        return horizontal || vertical;
      })
      .slice(0, 10)
      .map((element) => (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100));

    const sequence = artifact.querySelector("ol.bfux-artifact__sequence");

    return {
      missing: false,
      documentHorizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      boundaryFrameCount: document.querySelectorAll(".boundary-frame.boundary-frame--visible").length,
      artifactKind: artifact.getAttribute("data-artifact-kind"),
      artifactWidth: Math.round(artifact.getBoundingClientRect().width),
      orderedSequenceCount: artifact.querySelectorAll("ol.bfux-artifact__sequence").length,
      peerSetCount: artifact.querySelectorAll("ul.bfux-artifact__set").length,
      sequenceHorizontalOverflow: sequence ? sequence.scrollWidth > sequence.clientWidth + 2 : false,
      clipped,
    };
  }, selector);
}

async function visitRoute(browser, route, viewportName) {
  const context = await browser.newContext({ viewport: viewports[viewportName], reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300)); });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));

  const name = `${route.id}-${viewportName}`;
  const selector = `.bfux-artifact[data-artifact-id="${route.artifactId}"]`;
  const response = await page.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page.locator(selector).waitFor({ state: "attached", timeout: 12_000 });
  await page.waitForTimeout(100);
  const metrics = await layoutProbe(page, selector);
  const issues = [];

  if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.missing) issues.push("semantic artifact missing");
  else {
    if (metrics.artifactKind !== route.kind) issues.push(`expected ${route.kind}, rendered ${metrics.artifactKind ?? "no kind"}`);
    if (metrics.boundaryFrameCount !== 1) issues.push(`expected one visible Boundary Frame, found ${metrics.boundaryFrameCount}`);
    if (metrics.documentHorizontalOverflow) issues.push("semantic artifact caused document horizontal overflow");
    if (metrics.artifactWidth < 100) issues.push(`artifact collapsed to ${metrics.artifactWidth}px`);
    if ((route.kind === "sequence" || route.kind === "loop") && metrics.orderedSequenceCount !== 1) issues.push("ordered artifact lost OL sequence semantics");
    if (viewportName === "desktop" && (route.kind === "sequence" || route.kind === "loop") && metrics.sequenceHorizontalOverflow) issues.push("desktop operator chain hides stages behind internal horizontal scrolling");
    if (metrics.clipped.length) issues.push(`clipped artifact text: ${metrics.clipped.join(" | ")}`);
  }
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  await page.locator(selector).scrollIntoViewIfNeeded();
  const screenshot = path.join(screenshotDir, `${name}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });

  results.push({ name, route: route.path, viewport: viewports[viewportName], metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
  issues.forEach((issue) => pushFailure(name, issue));
  await context.close();
}

async function inspectCompiledProse(browser) {
  const context = await browser.newContext({ viewport: viewports.desktop, reducedMotion: "reduce" });
  const page = await context.newPage();
  const name = "verification-inspection-compiled-prose";
  const issues = [];
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300)); });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));

  await page.goto(`${base}/research/software/verification-governance`, { waitUntil: "domcontentloaded", timeout: 20_000 });
  const trigger = page.getByRole("button", { name: /Consequence-Bearing Development/i }).first();
  await trigger.waitFor({ state: "visible", timeout: 12_000 });
  await trigger.click();
  const surface = page.locator('.inspection-surface[data-detail-kind="inspection"]');
  await surface.waitFor({ state: "visible", timeout: 10_000 });
  await page.waitForTimeout(100);

  const metrics = await page.evaluate(() => {
    const sequence = document.querySelector('.inspection-surface ol.bfux-artifact__sequence');
    return {
      artifactCount: document.querySelectorAll('.inspection-surface .bfux-artifact[data-artifact-kind]').length,
      loopCount: document.querySelectorAll('.inspection-surface .bfux-artifact[data-artifact-kind="loop"]').length,
      setCount: document.querySelectorAll('.inspection-surface .bfux-artifact[data-artifact-kind="set"]').length,
      rawFindingsCount: document.querySelectorAll(".inspection-surface__findings").length,
      ariaModalCount: document.querySelectorAll('.inspection-surface[aria-modal="true"], .inspection-surface [aria-modal="true"]').length,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      sequenceHorizontalOverflow: sequence ? sequence.scrollWidth > sequence.clientWidth + 2 : false,
    };
  });

  if (metrics.artifactCount < 2) issues.push(`expected compiled sequence plus boundary notes, found ${metrics.artifactCount} artifacts`);
  if (metrics.loopCount < 1) issues.push("arrow-authored consequence circuit did not compile into a loop artifact");
  if (metrics.setCount < 1) issues.push("remaining inspection findings did not compile into a bounded set");
  if (metrics.rawFindingsCount !== 0) issues.push("raw inspection findings list returned");
  if (metrics.ariaModalCount !== 0) issues.push("inspection regained modal semantics");
  if (metrics.horizontalOverflow) issues.push("compiled inspection artifacts caused document horizontal overflow");
  if (metrics.sequenceHorizontalOverflow) issues.push("compiled desktop consequence circuit hides stages behind internal horizontal scrolling");
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  const screenshot = path.join(screenshotDir, `${name}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });
  results.push({ name, route: "/research/software/verification-governance", viewport: viewports.desktop, metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
  issues.forEach((issue) => pushFailure(name, issue));
  await context.close();
}

function writeReport() {
  const lines = [
    "# P5 Semantic Content Artifact QA",
    "",
    `Failures: **${failures.length}**`,
    "",
    "| Surface | Viewport | Kind | Overflow | Clipping | Issues |",
    "|---|---:|---|---|---:|---|",
    ...results.map((item) => `| ${item.name} | ${item.viewport.width}×${item.viewport.height} | ${item.metrics.artifactKind ?? (item.metrics.loopCount ? "compiled inspection" : "—")} | ${item.metrics.documentHorizontalOverflow || item.metrics.horizontalOverflow || item.metrics.sequenceHorizontalOverflow ? "FAIL" : "ok"} | ${item.metrics.clipped?.length ?? 0} | ${item.issues.length ? item.issues.join("; ") : "—"} |`),
  ];
  fs.writeFileSync(path.join(artifactDir, "report.json"), JSON.stringify({ failures, results }, null, 2));
  fs.writeFileSync(path.join(artifactDir, "report.md"), `${lines.join("\n")}\n`);
  console.log(lines.join("\n"));
}

const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    for (const viewportName of ["desktop", "mobile"]) {
      await visitRoute(browser, route, viewportName);
    }
  }
  await inspectCompiledProse(browser);
  writeReport();
} finally {
  await browser.close();
}

if (failures.length) process.exitCode = 1;
