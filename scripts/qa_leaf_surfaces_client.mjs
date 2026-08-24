import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.LEAF_QA_BASE ?? "http://127.0.0.1:3223";
const artifactDir = path.resolve("qa-artifacts/p4/leaf-surfaces");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const routes = [
  ["mission", "/public-interest/mission"],
  ["principles", "/public-interest/principles"],
  ["aspirations", "/public-interest/goals-aspirations"],
  ["citywatch", "/products/shipped/citywatch"],
  ["projectr", "/products/pipeline/projectr"],
];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 430, height: 900 },
};
const failures = [];
const results = [];

async function inspect(page) {
  return page.evaluate(() => {
    const q = (selector) => document.querySelector(selector);
    const px = (value) => Number.parseFloat(value || "0") || 0;
    const rect = (element) => {
      const value = element.getBoundingClientRect();
      return { left: value.left, right: value.right, top: value.top, bottom: value.bottom, width: value.width, height: value.height };
    };
    const leaf = q(".leaf-world");
    const heading = q(".leaf-world > .world-heading");
    const subject = q(".leaf-world__field > .subject-pane");
    if (!leaf || !heading || !subject) return { missing: true };

    const leafStyle = getComputedStyle(leaf);
    const headingStyle = getComputedStyle(heading);
    const subjectStyle = getComputedStyle(subject);
    const outer = rect(leaf);
    const identity = rect(heading);
    const content = rect(subject);
    const mobile = innerWidth <= 980;
    const subjectBorders = [subjectStyle.borderTopWidth, subjectStyle.borderRightWidth, subjectStyle.borderBottomWidth, subjectStyle.borderLeftWidth]
      .some((value) => px(value) > 0.5);
    const opaqueSubjectBackground = subjectStyle.backgroundImage !== "none"
      || !/rgba\([^)]*,\s*0\)|transparent/.test(subjectStyle.backgroundColor);

    const clipped = Array.from(leaf.querySelectorAll("h1,h2,h3,h4,p,strong,small,a,button,span"))
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden" || style.textOverflow === "ellipsis") return false;
        return (element.scrollWidth > element.clientWidth + 3 && /hidden|clip/.test(style.overflowX))
          || (element.scrollHeight > element.clientHeight + 3 && /hidden|clip/.test(style.overflowY));
      })
      .slice(0, 10)
      .map((element) => (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 90));

    return {
      missing: false,
      boundaryFrameCount: document.querySelectorAll(".boundary-frame.boundary-frame--visible").length,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      leafBorder: px(leafStyle.borderTopWidth),
      leafGap: Math.max(px(leafStyle.columnGap), px(leafStyle.rowGap)),
      subjectIndependentHousing: subjectBorders || subjectStyle.boxShadow !== "none" || opaqueSubjectBackground,
      headingBoxShadow: headingStyle.boxShadow,
      continuityDelta: mobile ? Math.abs(content.top - identity.bottom) : Math.abs(content.left - identity.right),
      desktopTopDelta: mobile ? 0 : Math.max(Math.abs(identity.top - outer.top), Math.abs(content.top - outer.top)),
      containsIdentity: identity.left >= outer.left - 2 && identity.right <= outer.right + 2 && identity.top >= outer.top - 2 && identity.bottom <= outer.bottom + 2,
      containsContent: content.left >= outer.left - 2 && content.right <= outer.right + 2 && content.top >= outer.top - 2 && content.bottom <= outer.bottom + 2,
      clipped,
    };
  });
}

async function visit(browser, id, route, viewportName) {
  const context = await browser.newContext({ viewport: viewports[viewportName], reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300)); });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));

  const name = `${id}-${viewportName}`;
  const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 15_000 });
  await page.locator(".leaf-world").waitFor({ state: "visible", timeout: 8_000 });
  await page.waitForTimeout(100);
  const metrics = await inspect(page);
  const issues = [];

  if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.missing) issues.push("unified leaf surface is missing");
  else {
    if (metrics.boundaryFrameCount !== 1) issues.push(`expected one visible Boundary Frame, found ${metrics.boundaryFrameCount}`);
    if (metrics.horizontalOverflow) issues.push("document has horizontal overflow");
    if (metrics.leafBorder < 0.5) issues.push("leaf object has no outer shell border");
    if (metrics.leafGap > 1.5) issues.push(`identity/content banks retain a ${metrics.leafGap}px gap`);
    if (metrics.subjectIndependentHousing) issues.push("SubjectPane still renders as an independent major housing");
    if (metrics.headingBoxShadow !== "none") issues.push("identity bank still renders with an independent card shadow");
    if (metrics.continuityDelta > 3) issues.push(`identity/content seam is discontinuous by ${metrics.continuityDelta.toFixed(1)}px`);
    if (metrics.desktopTopDelta > 3) issues.push(`desktop banks do not share the outer top edge (${metrics.desktopTopDelta.toFixed(1)}px)`);
    if (!metrics.containsIdentity || !metrics.containsContent) issues.push("outer leaf shell does not contain both internal banks");
    if (metrics.clipped.length) issues.push(`clipped leaf text: ${metrics.clipped.join(" | ")}`);
  }
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  const screenshot = path.join(screenshotDir, `${name}.png`);
  await page.screenshot({ path: screenshot, fullPage: false });
  results.push({ name, route, viewport: viewports[viewportName], metrics, issues, screenshot: path.relative(artifactDir, screenshot) });
  if (issues.length) failures.push({ name, issues });
  await context.close();
}

const browser = await chromium.launch({ headless: true });
try {
  for (const [id, route] of routes) {
    for (const viewportName of ["desktop", "mobile"]) await visit(browser, id, route, viewportName);
  }
} finally {
  await browser.close();
}

const failureCount = failures.reduce((sum, item) => sum + item.issues.length, 0);
fs.writeFileSync(path.join(artifactDir, "report.json"), JSON.stringify({ failureCount, failures, results }, null, 2));
const lines = [
  "# Second-layer leaf surface QA",
  "",
  `Failures: **${failureCount}**`,
  "",
  "| Surface | Viewport | Outer border | Gap | Separate SubjectPane | Issues |",
  "|---|---:|---:|---:|---:|---|",
  ...results.map((item) => `| ${item.name} | ${item.viewport.width}×${item.viewport.height} | ${item.metrics.leafBorder ?? "—"}px | ${item.metrics.leafGap ?? "—"}px | ${item.metrics.subjectIndependentHousing ? "yes" : "no"} | ${item.issues.length ? item.issues.join("; ") : "—"} |`),
];
fs.writeFileSync(path.join(artifactDir, "report.md"), `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
if (failureCount) process.exitCode = 1;
