import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.LEAF_QA_PORT ?? 3223);
const base = `http://127.0.0.1:${port}`;
const artifactDir = path.resolve("qa-artifacts/p4/leaf-surfaces");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const routes = [
  { id: "mission", path: "/public-interest/mission" },
  { id: "principles", path: "/public-interest/principles" },
  { id: "aspirations", path: "/public-interest/goals-aspirations" },
  { id: "citywatch", path: "/products/shipped/citywatch" },
  { id: "projectr", path: "/products/pipeline/projectr" },
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 430, height: 900 },
};

let serverOutput = "";
const results = [];
const failures = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(server) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next server exited with ${server.exitCode}\n${serverOutput}`);
    try {
      const response = await fetch(`${base}/public-interest/mission`, { signal: AbortSignal.timeout(2500) });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Retry until production server is ready.
    }
    await sleep(350);
  }
  throw new Error(`Timed out waiting for leaf QA server\n${serverOutput}`);
}

async function stopServer(server) {
  if (server.exitCode !== null) return;
  const exited = new Promise((resolve) => server.once("exit", resolve));
  server.kill("SIGTERM");
  await Promise.race([exited, sleep(2000)]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

function slug(value) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

async function inspect(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      if (!(el instanceof HTMLElement || el instanceof SVGElement)) return false;
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
    };
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        left: Math.round(r.left * 10) / 10,
        right: Math.round(r.right * 10) / 10,
        top: Math.round(r.top * 10) / 10,
        bottom: Math.round(r.bottom * 10) / 10,
        width: Math.round(r.width * 10) / 10,
        height: Math.round(r.height * 10) / 10,
      };
    };
    const px = (value) => Number.parseFloat(value || "0") || 0;

    const leaf = document.querySelector(".leaf-world");
    const heading = document.querySelector(".leaf-world > .world-heading");
    const subject = document.querySelector(".leaf-world__field > .subject-pane");
    if (!leaf || !heading || !subject || !visible(leaf) || !visible(heading) || !visible(subject)) {
      return { missing: true, url: location.pathname + location.search };
    }

    const leafStyle = getComputedStyle(leaf);
    const headingStyle = getComputedStyle(heading);
    const subjectStyle = getComputedStyle(subject);
    const leafRect = rect(leaf);
    const headingRect = rect(heading);
    const subjectRect = rect(subject);
    const mobile = innerWidth <= 980;

    const clipped = Array.from(leaf.querySelectorAll("h1,h2,h3,h4,p,strong,small,a,button,span"))
      .filter(visible)
      .filter((el) => {
        const style = getComputedStyle(el);
        if (style.textOverflow === "ellipsis") return false;
        const horizontal = el.scrollWidth > el.clientWidth + 3 && /hidden|clip/.test(style.overflowX);
        const vertical = el.scrollHeight > el.clientHeight + 3 && /hidden|clip/.test(style.overflowY);
        return horizontal || vertical;
      })
      .slice(0, 12)
      .map((el) => (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100));

    const subjectHasIndependentHousing = [
      subjectStyle.borderTopWidth,
      subjectStyle.borderRightWidth,
      subjectStyle.borderBottomWidth,
      subjectStyle.borderLeftWidth,
    ].some((value) => px(value) > 0.5)
      || subjectStyle.boxShadow !== "none"
      || subjectStyle.backgroundImage !== "none"
      || !/rgba\([^)]*,\s*0\)|transparent/.test(subjectStyle.backgroundColor);

    return {
      missing: false,
      url: location.pathname + location.search,
      viewport: [innerWidth, innerHeight],
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      boundaryFrameCount: document.querySelectorAll(".boundary-frame.boundary-frame--visible").length,
      leafRect,
      headingRect,
      subjectRect,
      leafBorder: px(leafStyle.borderTopWidth),
      leafGap: Math.max(px(leafStyle.columnGap), px(leafStyle.rowGap)),
      leafBoxShadow: leafStyle.boxShadow,
      headingBoxShadow: headingStyle.boxShadow,
      subjectHasIndependentHousing,
      containsHeading: headingRect.left >= leafRect.left - 2 && headingRect.right <= leafRect.right + 2 && headingRect.top >= leafRect.top - 2 && headingRect.bottom <= leafRect.bottom + 2,
      containsSubject: subjectRect.left >= leafRect.left - 2 && subjectRect.right <= leafRect.right + 2 && subjectRect.top >= leafRect.top - 2 && subjectRect.bottom <= leafRect.bottom + 2,
      continuityDelta: mobile
        ? Math.abs(subjectRect.top - headingRect.bottom)
        : Math.abs(subjectRect.left - headingRect.right),
      desktopTopAlignment: mobile ? null : Math.max(Math.abs(headingRect.top - leafRect.top), Math.abs(subjectRect.top - leafRect.top)),
      clipped,
    };
  });
}

async function visit(browser, route, viewportName) {
  const context = await browser.newContext({ viewport: viewports[viewportName], reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300));
  });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 300)));

  const name = `${route.id}-${viewportName}`;
  const response = await page.goto(`${base}${route.path}`, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(150);
  const metrics = await inspect(page);
  const issues = [];

  if (!response || !response.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.missing) issues.push("leaf shell, heading, or subject pane missing");
  else {
    if (metrics.boundaryFrameCount !== 1) issues.push(`expected one visible Boundary Frame, found ${metrics.boundaryFrameCount}`);
    if (metrics.horizontalOverflow) issues.push("document has horizontal overflow");
    if (metrics.leafBorder < 0.5) issues.push("leaf object has no outer shell border");
    if (metrics.leafGap > 1.5) issues.push(`identity/content banks still separated by ${metrics.leafGap}px gap`);
    if (metrics.subjectHasIndependentHousing) issues.push("SubjectPane still renders as an independent major housing");
    if (metrics.headingBoxShadow !== "none") issues.push("identity bank still renders with an independent card shadow");
    if (!metrics.containsHeading || !metrics.containsSubject) issues.push("leaf shell does not contain both identity and content banks");
    if (metrics.continuityDelta > 3) issues.push(`identity/content seam is discontinuous by ${metrics.continuityDelta}px`);
    if (metrics.desktopTopAlignment !== null && metrics.desktopTopAlignment > 3) issues.push(`desktop banks do not share the same outer top edge (${metrics.desktopTopAlignment}px)`);
    if (metrics.clipped.length) issues.push(`clipped leaf text: ${metrics.clipped.join(" | ")}`);
  }
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  const screenshotPath = path.join(screenshotDir, `${slug(name)}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  results.push({ name, route: route.path, viewport: viewports[viewportName], metrics, issues, consoleErrors, pageErrors, screenshot: path.relative(artifactDir, screenshotPath) });
  if (issues.length) failures.push({ name, issues });
  await context.close();
}

function writeReport() {
  fs.writeFileSync(path.join(artifactDir, "report.json"), JSON.stringify({ failures, results }, null, 2));
  const lines = [
    "# Second-layer leaf surface QA",
    "",
    `Failures: **${failures.reduce((sum, item) => sum + item.issues.length, 0)}**`,
    "",
    "| Surface | Viewport | Outer shell | Gap | Independent SubjectPane | Issues |",
    "|---|---:|---:|---:|---:|---|",
    ...results.map((item) => `| ${item.name} | ${item.viewport.width}×${item.viewport.height} | ${item.metrics?.leafBorder ?? "—"}px | ${item.metrics?.leafGap ?? "—"}px | ${item.metrics?.subjectHasIndependentHousing ? "yes" : "no"} | ${item.issues.length ? item.issues.join("; ") : "—"} |`),
  ];
  fs.writeFileSync(path.join(artifactDir, "report.md"), `${lines.join("\n")}\n`);
  console.log(lines.join("\n"));
}

const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

let browser;
try {
  await waitForServer(server);
  browser = await chromium.launch({ headless: true });
  for (const route of routes) {
    for (const viewportName of ["desktop", "mobile"]) await visit(browser, route, viewportName);
  }
  writeReport();
} finally {
  if (browser) await browser.close();
  await stopServer(server);
  fs.writeFileSync(path.join(artifactDir, "server.log"), serverOutput);
}

if (failures.length) process.exitCode = 1;
