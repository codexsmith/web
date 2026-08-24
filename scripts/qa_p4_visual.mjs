import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.P4_QA_PORT ?? 3221);
const base = `http://127.0.0.1:${port}`;
const artifactDir = path.resolve(process.env.P4_QA_ARTIFACT_DIR ?? "qa-artifacts/p4");
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const viewports = {
  desktop: { width: 1440, height: 1000 },
  compact: { width: 980, height: 900 },
  tablet: { width: 720, height: 1000 },
  mobile: { width: 430, height: 900 },
};

const detailRoutes = [
  { id: "agency", alias: "/agency-audit", recordId: "agency-representation-audit" },
  { id: "software-before-code", alias: "/software-before-code", recordId: "software-before-code" },
  { id: "corpus-forge", alias: "/corpus-forge", recordId: "corpus-forge" },
  { id: "boundary-first-ux", alias: "/boundary-first-ux", recordId: "boundary-first-ux" },
  { id: "closure-driven", alias: "/closure-driven-software-development", recordId: "closure-driven-software-development" },
  { id: "weather", alias: "/weather", recordId: "boundary-first-weather" },
  { id: "schemathematics", alias: "/schemathematics", recordId: "schemathematics" },
  { id: "law", alias: "/law", recordId: "constitutional-law-and-jurisprudence" },
  { id: "chess", alias: "/chess", recordId: "boundary-first-chess" },
  { id: "soccer", alias: "/soccer", recordId: "boundary-first-soccer" },
];

const worldRoutes = [
  { id: "research", path: "/research" },
  { id: "public-interest", path: "/public-interest" },
  { id: "products", path: "/products" },
  { id: "publications", path: "/publications" },
  { id: "about", path: "/about" },
];

const results = [];
const criticalFailures = [];
const globalWarnings = [];
let serverOutput = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(server) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited before readiness with code ${server.exitCode}\n${serverOutput}`);
    }
    try {
      const response = await fetch(`${base}/?world=1`, { signal: AbortSignal.timeout(3000) });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Retry until ready.
    }
    await sleep(350);
  }
  throw new Error(`Timed out waiting for production server\n${serverOutput}`);
}

async function stopServer(server) {
  if (server.exitCode !== null) return;
  const exited = new Promise((resolve) => server.once("exit", resolve));
  server.kill("SIGTERM");
  await Promise.race([exited, sleep(2500)]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

function slug(value) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

async function inspectLayout(page) {
  return page.evaluate(() => {
    const isVisible = (element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0 && rect.width > 1 && rect.height > 1;
    };

    const serializeRect = (rect) => ({
      left: Math.round(rect.left * 10) / 10,
      right: Math.round(rect.right * 10) / 10,
      top: Math.round(rect.top * 10) / 10,
      bottom: Math.round(rect.bottom * 10) / 10,
      width: Math.round(rect.width * 10) / 10,
      height: Math.round(rect.height * 10) / 10,
    });

    const rectOf = (selector) => {
      const element = document.querySelector(selector);
      if (!element || !isVisible(element)) return null;
      return serializeRect(element.getBoundingClientRect());
    };

    const intersects = (a, b) => Boolean(
      a && b
      && a.left < b.right - 2
      && a.right > b.left + 2
      && a.top < b.bottom - 2
      && a.bottom > b.top + 2
    );

    const clippedText = Array.from(document.querySelectorAll("h1,h2,h3,h4,p,li,strong,small,a,button,span"))
      .filter(isVisible)
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.position === "absolute" && (element.clientWidth <= 2 || element.clientHeight <= 2)) return false;
        if (element.getAttribute("aria-hidden") === "true") return false;
        if (style.textOverflow === "ellipsis") return false;
        const horizontalClip = element.scrollWidth > element.clientWidth + 3 && /hidden|clip/.test(style.overflowX);
        const verticalClip = element.scrollHeight > element.clientHeight + 3 && /hidden|clip/.test(style.overflowY);
        return horizontalClip || verticalClip;
      })
      .slice(0, 20)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
        text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      }));

    const detailHeading = document.querySelector("main.detail-surface h1");
    const detailHeadingRect = detailHeading && isVisible(detailHeading) ? detailHeading.getBoundingClientRect() : null;
    const topFrame = document.querySelector(".boundary-frame__top");
    const topFrameRect = topFrame && isVisible(topFrame) ? topFrame.getBoundingClientRect() : null;
    const traceFrame = document.querySelector(".boundary-frame__left");
    const traceFrameRect = traceFrame && isVisible(traceFrame) ? traceFrame.getBoundingClientRect() : null;
    const worldViewport = document.querySelector(".site-shell .world-viewport");
    const rootCards = Array.from(document.querySelectorAll('.branch-world[data-gestalt-id="root"] .district-card[data-node-id]'))
      .filter(isVisible)
      .map((card) => ({
        id: card.getAttribute("data-node-id"),
        ...serializeRect(card.getBoundingClientRect()),
      }));

    const regionKindPathologies = Array.from(document.querySelectorAll(".branch-world:not(.branch-world--root-world) .district-card__kind"))
      .filter(isVisible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent ?? "").trim().replace(/\s+/g, " "),
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      })
      .filter((item) => item.text.length >= 10 && item.width < 72 && item.height > item.width * 1.8)
      .slice(0, 10);

    return {
      url: location.pathname + location.search,
      title: document.title,
      viewport: [innerWidth, innerHeight],
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
      boundaryFrameCount: document.querySelectorAll(".boundary-frame.boundary-frame--visible").length,
      detailCount: document.querySelectorAll("main.detail-surface[data-detail-kind='record']").length,
      modalCount: document.querySelectorAll("[aria-modal='true']").length,
      rootCardCount: document.querySelectorAll(".section-region-grid [data-node-id]").length,
      topFrame: rectOf(".boundary-frame__top"),
      leftFrame: rectOf(".boundary-frame__left"),
      rightFrame: rectOf(".boundary-frame__right"),
      detailSurface: rectOf("main.detail-surface"),
      detailHeading: detailHeadingRect ? serializeRect(detailHeadingRect) : null,
      headingUnderTopFrame: intersects(detailHeadingRect, topFrameRect),
      headingUnderLeftFrame: intersects(detailHeadingRect, traceFrameRect),
      rootCards,
      worldViewport: worldViewport && isVisible(worldViewport) ? {
        ...serializeRect(worldViewport.getBoundingClientRect()),
        scrollTop: Math.round(worldViewport.scrollTop * 10) / 10,
        scrollHeight: worldViewport.scrollHeight,
        clientHeight: worldViewport.clientHeight,
      } : null,
      regionKindPathologies,
      clippedText,
      genericFallback: document.body.innerText.includes("Structured retained record"),
      standaloneLanding: document.body.innerText.includes("Governed public landing"),
      returnToObjectCount: Array.from(document.querySelectorAll("a")).filter((a) => a.textContent?.includes("Return to object") && isVisible(a)).length,
      searchButtonCount: Array.from(document.querySelectorAll("button")).filter((button) => button.getAttribute("aria-label") === "Search" && isVisible(button)).length,
    };
  });
}

function assessCommon(name, metrics, consoleErrors, pageErrors, isDetail = false) {
  const issues = [];
  const warnings = [];

  if (metrics.horizontalOverflow) issues.push(`horizontal overflow: ${metrics.scrollWidth}px > ${metrics.viewport[0]}px`);
  if (metrics.boundaryFrameCount !== 1) issues.push(`expected one visible Boundary Frame, found ${metrics.boundaryFrameCount}`);
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);
  if (!metrics.searchButtonCount) issues.push("Search control is not visible in the Boundary Frame");
  if (metrics.headingUnderTopFrame) issues.push("detail heading is occluded by the top Boundary Frame");
  if (metrics.headingUnderLeftFrame) issues.push("detail heading is occluded by the traversal shelf/frame");
  if (metrics.regionKindPathologies.length) {
    issues.push(`region type/eyebrow collapsed into a narrow vertical strip: ${metrics.regionKindPathologies.map((item) => item.text).join(" | ")}`);
  }
  if (metrics.clippedText.length) warnings.push(`${metrics.clippedText.length} potentially clipped text element(s)`);

  if (isDetail) {
    if (metrics.detailCount !== 1) issues.push(`expected one record detail surface, found ${metrics.detailCount}`);
    if (metrics.modalCount) issues.push(`substantive detail regained modal semantics (${metrics.modalCount})`);
    if (metrics.genericFallback) issues.push("generic retained-record fallback rendered instead of specialization");
    if (metrics.standaloneLanding) issues.push("standalone landing chrome rendered inside canonical detail route");
    if (!metrics.returnToObjectCount) issues.push("Return to object control is not visible");
  }

  if (issues.length) criticalFailures.push({ name, issues });
  return { issues, warnings };
}

async function visit(browser, config) {
  const context = await browser.newContext({ viewport: config.viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 500));
  });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 500)));

  const response = await page.goto(`${base}${config.path}`, { waitUntil: "networkidle", timeout: 30_000 });
  if (!response || !response.ok()) {
    criticalFailures.push({ name: config.name, issues: [`HTTP ${response?.status() ?? "no response"}`] });
  }
  await page.waitForTimeout(150);

  if (config.expectedRecordId) {
    const selector = `main.detail-surface[data-record-id="${config.expectedRecordId}"]`;
    await page.locator(selector).waitFor({ state: "visible", timeout: 10_000 });
    if (!page.url().includes(`detail=record%3A${config.expectedRecordId}`) && !page.url().includes(`detail=record:${config.expectedRecordId}`)) {
      criticalFailures.push({ name: config.name, issues: [`legacy alias did not resolve to canonical record detail URL: ${page.url()}`] });
    }
  }

  const metrics = await inspectLayout(page);
  const assessment = assessCommon(config.name, metrics, consoleErrors, pageErrors, Boolean(config.expectedRecordId));

  if (config.root) {
    if (metrics.rootCardCount !== 5) {
      const issue = `expected five root World doors, found ${metrics.rootCardCount}`;
      assessment.issues.push(issue);
      criticalFailures.push({ name: config.name, issues: [issue] });
    }
    if (config.viewport.width <= 720) {
      const collapsed = metrics.rootCards.filter((card) => card.height < 150);
      if (collapsed.length) {
        const issue = `compact root door collapsed below 150px: ${collapsed.map((card) => `${card.id}:${card.height}px`).join(", ")}`;
        assessment.issues.push(issue);
        criticalFailures.push({ name: config.name, issues: [issue] });
      }
    }
  }

  const screenshotPath = path.join(screenshotDir, `${slug(config.name)}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: Boolean(config.fullPage) });

  results.push({
    name: config.name,
    requestedPath: config.path,
    finalUrl: page.url(),
    viewport: config.viewport,
    metrics,
    consoleErrors,
    pageErrors,
    ...assessment,
    screenshot: path.relative(artifactDir, screenshotPath),
  });

  await context.close();
}

async function runInteractionChecks(browser) {
  const context = await browser.newContext({ viewport: viewports.desktop, reducedMotion: "reduce" });
  const page = await context.newPage();
  const failures = [];

  await page.goto(`${base}/?world=1`, { waitUntil: "networkidle" });
  const researchDoor = page.locator('[data-node-id="research"]');
  await researchDoor.click();
  await page.waitForTimeout(250);
  if (!page.url().includes("/research")) failures.push(`root Research door did not navigate to /research (${page.url()})`);

  const back = page.getByRole("button", { name: "Back through traversal history" });
  if (!(await back.isVisible())) {
    failures.push("Back traversal control was not visible after entering Research");
  } else {
    await back.click();
    await page.waitForTimeout(250);
    const rootCards = await page.locator(".section-region-grid [data-node-id]").count();
    if (rootCards !== 5) failures.push(`Back traversal did not restore the five-door World (${rootCards})`);
  }

  const search = page.getByRole("button", { name: "Search", exact: true });
  await search.click();
  await page.waitForTimeout(100);
  const searchVisible = await page.locator(".search-panel").isVisible().catch(() => false);
  if (!searchVisible) failures.push("Search control did not open the global search instrument");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  const searchStillVisible = await page.locator(".search-panel").isVisible().catch(() => false);
  if (searchStillVisible) failures.push("Escape did not close the Search instrument");

  await page.goto(`${base}/corpus-forge`, { waitUntil: "networkidle" });
  const returnLink = page.getByRole("link", { name: /Return to object/i });
  if (!(await returnLink.isVisible())) {
    failures.push("Corpus Forge detail did not expose Return to object");
  } else {
    await returnLink.click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).searchParams.has("detail")) failures.push("Return to object retained detail state");
  }

  if (failures.length) criticalFailures.push({ name: "interaction-checks", issues: failures });
  results.push({ name: "interaction-checks", issues: failures, warnings: [] });
  await context.close();
}

function writeReports() {
  const report = {
    generatedAt: new Date().toISOString(),
    base,
    criticalFailureCount: criticalFailures.reduce((sum, item) => sum + item.issues.length, 0),
    criticalFailures,
    warningCount: results.reduce((sum, item) => sum + (item.warnings?.length ?? 0), 0) + globalWarnings.length,
    globalWarnings,
    results,
  };

  fs.writeFileSync(path.join(artifactDir, "report.json"), JSON.stringify(report, null, 2));

  const lines = [
    "# P4 Visual / Interaction QA",
    "",
    `Generated: ${report.generatedAt}`,
    `Critical failures: **${report.criticalFailureCount}**`,
    `Warnings: **${report.warningCount}**`,
    "",
    "## Critical failures",
    "",
  ];

  if (!criticalFailures.length) lines.push("None.");
  for (const failure of criticalFailures) {
    lines.push(`### ${failure.name}`);
    failure.issues.forEach((issue) => lines.push(`- ${issue}`));
    lines.push("");
  }

  lines.push("## Route matrix", "", "| Route | Viewport | Overflow | Frame | Detail | Clipped text | Issues |", "|---|---:|---:|---:|---:|---:|---|");
  for (const result of results.filter((item) => item.metrics)) {
    lines.push(`| ${result.name} | ${result.viewport.width}×${result.viewport.height} | ${result.metrics.horizontalOverflow ? "FAIL" : "ok"} | ${result.metrics.boundaryFrameCount} | ${result.metrics.detailCount} | ${result.metrics.clippedText.length} | ${(result.issues ?? []).join("; ") || "—"} |`);
  }

  lines.push("", "## Potential clipping", "");
  let clippingFound = false;
  for (const result of results.filter((item) => item.metrics?.clippedText?.length)) {
    clippingFound = true;
    lines.push(`### ${result.name}`);
    for (const item of result.metrics.clippedText) lines.push(`- \`${item.tag}.${item.className}\` — ${item.text}`);
    lines.push("");
  }
  if (!clippingFound) lines.push("No potentially clipped text detected by the automated layout probe.");

  fs.writeFileSync(path.join(artifactDir, "report.md"), lines.join("\n"));
  console.log(lines.join("\n"));
}

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

let browser;
try {
  await waitForServer(server);
  browser = await chromium.launch({ headless: true });

  for (const [viewportName, viewport] of Object.entries(viewports)) {
    await visit(browser, {
      name: `root-${viewportName}`,
      path: "/?world=1",
      viewport,
      root: true,
      fullPage: viewportName === "desktop" || viewportName === "mobile",
    });
  }

  for (const route of worldRoutes) {
    for (const viewportName of ["desktop", "mobile"]) {
      await visit(browser, {
        name: `${route.id}-${viewportName}`,
        path: route.path,
        viewport: viewports[viewportName],
      });
    }
  }

  for (const route of detailRoutes) {
    for (const viewportName of ["desktop", "mobile"]) {
      await visit(browser, {
        name: `${route.id}-${viewportName}`,
        path: route.alias,
        viewport: viewports[viewportName],
        expectedRecordId: route.recordId,
        fullPage: viewportName === "desktop",
      });
    }
  }

  await runInteractionChecks(browser);
} catch (error) {
  criticalFailures.push({ name: "qa-harness", issues: [error instanceof Error ? error.stack ?? error.message : String(error)] });
} finally {
  if (browser) await browser.close();
  await stopServer(server);
  fs.writeFileSync(path.join(artifactDir, "server.log"), serverOutput);
  writeReports();
}

if (criticalFailures.length) process.exitCode = 1;
