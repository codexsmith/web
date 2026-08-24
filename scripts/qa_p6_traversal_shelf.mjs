import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.P6_QA_BASE ?? "http://127.0.0.1:3226";
const artifactDir = path.resolve("qa-artifacts/p6-process-circuit");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const cases = [
  { id: "traversal-tall-desktop", viewport: { width: 1440, height: 1000 }, mode: "rail" },
  { id: "traversal-shallow-wide", viewport: { width: 1536, height: 366 }, mode: "shelf" },
  { id: "traversal-tablet", viewport: { width: 900, height: 700 }, mode: "shelf" },
  { id: "traversal-mobile", viewport: { width: 430, height: 900 }, mode: "shelf" },
];

const failures = [];
const results = [];

function fail(id, issue) {
  failures.push({ id, issue });
}

function visible(element) {
  if (!element) return false;
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
}

async function probe(page) {
  return page.evaluate(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const r = element.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const isVisible = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && r.width > 1 && r.height > 1;
    };
    const visibleCount = (selector) => Array.from(document.querySelectorAll(selector)).filter((element) => {
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && r.width > 1 && r.height > 1;
    }).length;

    return {
      top: rect(".boundary-frame__top"),
      traversal: rect(".boundary-frame__trace-nav"),
      world: rect(".site-shell[data-root-focus=\"false\"] .world-viewport"),
      headerVisible: isVisible(".traversal-nav__header"),
      historyVisibleCount: visibleCount(".traversal-nav__history-node"),
      currentVisible: isVisible(".traversal-nav__current"),
      parentVisible: isVisible(".traversal-nav__containment"),
      peerButtonVisibleCount: visibleCount(".traversal-nav__peer-list button"),
      backVisible: isVisible(".frame-tool--trace-back"),
      current: rect(".traversal-nav__current > div"),
      parent: rect(".traversal-nav__up"),
      firstPeer: rect(".traversal-nav__peer-list button"),
      documentHorizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
    };
  });
}

const browser = await chromium.launch({ headless: true });
try {
  for (const testCase of cases) {
    const context = await browser.newContext({ viewport: testCase.viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(String(error).slice(0, 240)));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text().slice(0, 240)); });

    const response = await page.goto(`${base}/about/how-we-work`, { waitUntil: "domcontentloaded", timeout: 20_000 });
    await page.locator(".boundary-frame__trace-nav").waitFor({ state: "visible", timeout: 12_000 });
    await page.waitForTimeout(120);
    const metrics = await probe(page);
    const issues = [];

    if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
    if (!metrics.traversal || !metrics.world || !metrics.top) issues.push("frame geometry missing");
    if (metrics.documentHorizontalOverflow) issues.push("document has horizontal overflow");
    if (!metrics.currentVisible) issues.push("current focus is not visible in traversal navigation");
    if (!metrics.backVisible) issues.push("top-frame Back transport is not visible");

    if (testCase.mode === "shelf" && metrics.traversal && metrics.world) {
      if (metrics.headerVisible) issues.push("redundant TRAVERSAL header is visible in shelf projection");
      if (metrics.historyVisibleCount !== 0) issues.push(`shelf repeats ${metrics.historyVisibleCount} history node(s) already owned by Back/Forward`);
      if (metrics.traversal.height > 50.5) issues.push(`shelf is ${Math.round(metrics.traversal.height)}px high; budget is 50px max`);
      if (metrics.traversal.width < metrics.viewportWidth - 4) issues.push("shelf does not span the available reading width");
      if (Math.abs(metrics.world.left) > 2) issues.push(`world remains inset ${Math.round(metrics.world.left)}px as if desktop rail still existed`);
      const verticalGap = metrics.world.top - metrics.traversal.bottom;
      if (verticalGap < -2 || verticalGap > 4) issues.push(`world begins ${Math.round(verticalGap)}px from shelf boundary instead of immediately below it`);
      if (metrics.current && metrics.current.height > 40.5) issues.push(`current-focus control is too tall at ${Math.round(metrics.current.height)}px`);
      if (metrics.parent && metrics.parent.height > 40.5) issues.push(`parent control is too tall at ${Math.round(metrics.parent.height)}px`);
      if (metrics.firstPeer && metrics.firstPeer.height > 40.5) issues.push(`peer control is too tall at ${Math.round(metrics.firstPeer.height)}px`);
      if (!metrics.parentVisible) issues.push("containing boundary is missing from shelf");
      if (metrics.peerButtonVisibleCount < 1) issues.push("adjacent choices are missing from shelf");
    }

    if (testCase.mode === "rail" && metrics.traversal && metrics.world) {
      if (!metrics.headerVisible) issues.push("tall desktop lost the vertical traversal apparatus header");
      if (metrics.traversal.height <= 50.5) issues.push("tall desktop incorrectly collapsed to compact shelf");
      if (metrics.world.left < metrics.traversal.right - 6) issues.push("tall desktop world overlaps the vertical traversal rail");
    }

    if (errors.length) issues.push(`browser errors: ${errors.join(" | ")}`);

    const screenshot = path.join(screenshotDir, `${testCase.id}.png`);
    await page.screenshot({ path: screenshot, fullPage: false });
    results.push({ ...testCase, metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
    issues.forEach((issue) => fail(testCase.id, issue));
    await context.close();
  }
} finally {
  await browser.close();
}

const report = [
  "# P6 Traversal Shelf QA",
  "",
  `Failures: **${failures.length}**`,
  "",
  "| Surface | Viewport | Projection | Header | History in shelf | Shelf / rail | World top | Overflow | Issues |",
  "|---|---:|---|---|---:|---:|---:|---|---|",
  ...results.map((item) => `| ${item.id} | ${item.viewport.width}×${item.viewport.height} | ${item.mode} | ${item.metrics.headerVisible ? "visible" : "hidden"} | ${item.metrics.historyVisibleCount} | ${Math.round(item.metrics.traversal?.height ?? 0)}px | ${Math.round(item.metrics.world?.top ?? 0)}px | ${item.metrics.documentHorizontalOverflow ? "FAIL" : "ok"} | ${item.issues.length ? item.issues.join("; ") : "—"} |`),
];

fs.writeFileSync(path.join(artifactDir, "traversal-shelf-report.json"), JSON.stringify({ failures, results }, null, 2));
fs.writeFileSync(path.join(artifactDir, "traversal-shelf-report.md"), `${report.join("\n")}\n`);
console.log(report.join("\n"));

if (failures.length) process.exitCode = 1;
