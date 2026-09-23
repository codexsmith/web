import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.V3_RELEASE_QA_PORT ?? 3237);
const base = `http://127.0.0.1:${port}`;
const artifactDir = path.resolve(
  process.env.V3_RELEASE_QA_ARTIFACT_DIR ?? "qa-artifacts/v3-release",
);
const screenshotDir = path.join(artifactDir, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const routeSource = fs.readFileSync("src/lib/site-release.ts", "utf8");
const routeBlock = routeSource.match(
  /institutionalPublicRoutes\s*=\s*\[([\s\S]*?)\]\s*as const/,
)?.[1];
const contentNodeRouteBlock = routeSource.match(
  /institutionalContentNodeRoutes\s*=\s*\[([\s\S]*?)\]\s*as const/,
)?.[1];

if (!routeBlock) {
  throw new Error("Could not read institutionalPublicRoutes from src/lib/site-release.ts");
}

const publicRoutes = [
  ...new Set([
    ...[...routeBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    ...(contentNodeRouteBlock
      ? [...contentNodeRouteBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1])
      : []),
  ]),
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  compact: { width: 1180, height: 900 },
  tablet: { width: 820, height: 1000 },
  mobile: { width: 390, height: 844 },
  narrow: { width: 320, height: 800 },
};

const stressRoutes = new Set([
  "/",
  "/research",
  "/projects",
  "/publications",
  "/ai-governance",
  "/open-lab",
  "/products",
  "/products/agentic-scientific-method",
  "/representation-atlas",
]);

const screenshotRoutes = new Set(stressRoutes);

const visits = [];
for (const route of publicRoutes) {
  visits.push({ route, viewportName: "desktop", viewport: viewports.desktop });
  visits.push({ route, viewportName: "mobile", viewport: viewports.mobile });
}
for (const route of stressRoutes) {
  visits.push({ route, viewportName: "compact", viewport: viewports.compact });
  visits.push({ route, viewportName: "tablet", viewport: viewports.tablet });
  visits.push({ route, viewportName: "narrow", viewport: viewports.narrow });
}

const results = [];
const failures = [];
let serverOutput = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slug(value) {
  return value
    .replace(/^\/+/, "")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "v3-home";
}

async function waitForServer(server) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(
        `Next server exited before readiness with code ${server.exitCode}\n${serverOutput}`,
      );
    }
    try {
      const response = await fetch(`${base}/`, {
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) return;
    } catch {
      // Keep polling until the production server is ready.
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

function recordFailure(name, issues) {
  if (!issues.length) return;
  failures.push({ name, issues });
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
        return false;
      }
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity || 1) > 0 &&
        rect.width > 1 &&
        rect.height > 1
      );
    };

    const accessibleName = (element) => {
      const ariaLabel = element.getAttribute("aria-label")?.trim();
      if (ariaLabel) return ariaLabel;

      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) {
        const text = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
          .filter(Boolean)
          .join(" ")
          .trim();
        if (text) return text;
      }

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const labels = Array.from(element.labels ?? [])
          .map((label) => label.textContent?.trim() ?? "")
          .filter(Boolean)
          .join(" ");
        if (labels) return labels;
      }

      return (element.textContent ?? "").trim().replace(/\s+/g, " ");
    };

    const interactive = Array.from(
      document.querySelectorAll("a[href],button,input,select,textarea,[role='button'],[role='link']"),
    ).filter(visible);

    const unnamedInteractive = interactive
      .filter((element) => !accessibleName(element))
      .slice(0, 20)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className:
          typeof element.className === "string" ? element.className.slice(0, 120) : "",
      }));

    const interactiveGeometry = interactive.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    });

    const targetSpacingViolations = interactiveGeometry
      .filter(({ element, rect }) => {
        if (rect.width >= 24 && rect.height >= 24) return false;

        if (
          element.matches("a") &&
          (getComputedStyle(element).display === "inline" ||
            Boolean(element.closest("p, li, dd, dt, figcaption, blockquote")))
        ) {
          return false;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        return interactiveGeometry.some((other) => {
          if (other.element === element) return false;
          return (
            Math.abs(other.centerX - centerX) < 24 &&
            Math.abs(other.centerY - centerY) < 24
          );
        });
      })
      .slice(0, 20)
      .map(({ element, rect }) => ({
        tag: element.tagName.toLowerCase(),
        name: accessibleName(element).slice(0, 100),
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
      }));

    const clippedText = Array.from(
      document.querySelectorAll("h1,h2,h3,h4,p,li,strong,small,a,button,span"),
    )
      .filter(visible)
      .filter((element) => {
        if (element.getAttribute("aria-hidden") === "true") return false;
        const style = getComputedStyle(element);
        if (style.textOverflow === "ellipsis") return false;
        const horizontal =
          element.scrollWidth > element.clientWidth + 3 &&
          /hidden|clip/.test(style.overflowX);
        const vertical =
          element.scrollHeight > element.clientHeight + 3 &&
          /hidden|clip/.test(style.overflowY);
        return horizontal || vertical;
      })
      .slice(0, 20)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className:
          typeof element.className === "string" ? element.className.slice(0, 120) : "",
        text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      }));

    const longMotion = Array.from(document.querySelectorAll("*"))
      .filter(visible)
      .flatMap((element) => {
        const style = getComputedStyle(element);
        const durations = [...style.animationDuration.split(","), ...style.transitionDuration.split(",")]
          .map((part) => part.trim())
          .map((part) =>
            part.endsWith("ms")
              ? Number.parseFloat(part) / 1000
              : Number.parseFloat(part) || 0,
          );
        const longest = Math.max(0, ...durations);
        return longest > 0.05
          ? [
              {
                tag: element.tagName.toLowerCase(),
                className:
                  typeof element.className === "string"
                    ? element.className.slice(0, 120)
                    : "",
                seconds: longest,
              },
            ]
          : [];
      })
      .slice(0, 20);

    const overflowElements = Array.from(document.querySelectorAll("body *"))
      .filter(visible)
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > innerWidth + 2 || rect.left < -2;
      })
      .slice(0, 30)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className:
            typeof element.className === "string" ? element.className.slice(0, 180) : "",
          text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
          rect: [
            Math.round(rect.left * 10) / 10,
            Math.round(rect.right * 10) / 10,
            Math.round(rect.width * 10) / 10,
          ],
        };
      });

    const h1s = Array.from(document.querySelectorAll("h1")).filter(visible);
    const mains = Array.from(document.querySelectorAll("main")).filter(visible);
    const imagesWithoutAlt = Array.from(document.querySelectorAll("img"))
      .filter(visible)
      .filter((image) => !image.hasAttribute("alt"))
      .slice(0, 20)
      .map((image) => image.getAttribute("src") ?? "(unknown)");

    return {
      title: document.title,
      viewport: [innerWidth, innerHeight],
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      horizontalOverflow:
        document.documentElement.scrollWidth > innerWidth + 2 ||
        document.body.scrollWidth > innerWidth + 2,
      h1Count: h1s.length,
      mainCount: mains.length,
      headerCount: document.querySelectorAll("header").length,
      footerCount: document.querySelectorAll("footer").length,
      unnamedInteractive,
      targetSpacingViolations,
      overflowElements,
      clippedText,
      longMotion,
      imagesWithoutAlt,
    };
  });
}

async function visit(browser, config) {
  const context = await browser.newContext({
    viewport: config.viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text().slice(0, 500));
    }
  });
  page.on("pageerror", (error) => pageErrors.push(String(error).slice(0, 500)));

  const response = await page.goto(`${base}${config.route}`, {
    waitUntil: "networkidle",
    timeout: 30_000,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);

  const metrics = await inspectPage(page);
  const issues = [];

  if (!response?.ok()) issues.push(`HTTP ${response?.status() ?? "no response"}`);
  if (metrics.horizontalOverflow) {
    issues.push(
      `horizontal page overflow: document ${metrics.documentWidth}px / body ${metrics.bodyWidth}px > viewport ${metrics.viewport[0]}px`,
    );
  }
  if (metrics.mainCount !== 1) issues.push(`expected one visible main landmark; found ${metrics.mainCount}`);
  if (metrics.h1Count !== 1) issues.push(`expected one visible h1; found ${metrics.h1Count}`);
  if (!metrics.headerCount) issues.push("institutional header is missing");
  if (!metrics.footerCount) issues.push("institutional footer is missing");
  if (metrics.unnamedInteractive.length) {
    issues.push(`${metrics.unnamedInteractive.length} unnamed interactive control(s)`);
  }
  if (metrics.targetSpacingViolations.length) {
    issues.push(
      `${metrics.targetSpacingViolations.length} undersized interactive target(s) violate 24px spacing`,
    );
  }
  if (metrics.horizontalOverflow && metrics.overflowElements.length) {
    issues.push(
      `overflowing elements: ${metrics.overflowElements
        .slice(0, 8)
        .map((item) => `${item.tag}.${item.className || "(no-class)"} [${item.rect.join(", ")}]`)
        .join(" | ")}`,
    );
  }
  if (metrics.clippedText.length) {
    issues.push(`${metrics.clippedText.length} potentially clipped text element(s)`);
  }
  if (metrics.longMotion.length) {
    issues.push(
      `${metrics.longMotion.length} visible element(s) retain >50ms motion under prefers-reduced-motion`,
    );
  }
  if (metrics.imagesWithoutAlt.length) {
    issues.push(`${metrics.imagesWithoutAlt.length} visible image(s) lack alt attributes`);
  }
  if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(" | ")}`);
  if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(" | ")}`);

  const shouldCapture =
    screenshotRoutes.has(config.route) || issues.length > 0;
  let screenshot = null;
  if (shouldCapture) {
    const filename = `${slug(config.route)}--${config.viewportName}.png`;
    const screenshotPath = path.join(screenshotDir, filename);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    screenshot = path.relative(artifactDir, screenshotPath);
  }

  const name = `${config.route} @ ${config.viewportName}`;
  recordFailure(name, issues);
  results.push({
    name,
    route: config.route,
    viewportName: config.viewportName,
    responseStatus: response?.status() ?? null,
    metrics,
    consoleErrors,
    pageErrors,
    issues,
    screenshot,
  });

  await context.close();
}

async function checkSkipAndFocus(browser, viewportName) {
  const context = await browser.newContext({
    viewport: viewports[viewportName],
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const issues = [];

  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");

  const firstFocus = await page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return null;
    const rect = active.getBoundingClientRect();
    return {
      text: (active.textContent ?? "").trim().replace(/\s+/g, " "),
      href: active.getAttribute("href"),
      visible:
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < innerHeight,
    };
  });

  if (
    !firstFocus ||
    !firstFocus.text.includes("Skip to main content") ||
    !firstFocus.visible
  ) {
    issues.push(`first Tab did not expose the skip link: ${JSON.stringify(firstFocus)}`);
  }

  await page.keyboard.press("Enter");
  await page.waitForTimeout(80);
  const mainFocused = await page.evaluate(
    () => document.activeElement?.id === "institutional-main",
  );
  if (!mainFocused) issues.push("skip link did not move focus to #institutional-main");

  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const focusSamples = [];
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    const sample = await page.evaluate(() => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement)) return null;
      const style = getComputedStyle(active);
      const rect = active.getBoundingClientRect();
      const hasOutline =
        style.outlineStyle !== "none" &&
        style.outlineWidth !== "0px" &&
        style.outlineColor !== "transparent";
      const hasBoxShadow = style.boxShadow !== "none";
      return {
        tag: active.tagName.toLowerCase(),
        name:
          active.getAttribute("aria-label") ||
          (active.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100),
        hasVisibleFocus: hasOutline || hasBoxShadow,
        focusVisible: active.matches(":focus-visible"),
        outline: {
          style: style.outlineStyle,
          width: style.outlineWidth,
          color: style.outlineColor,
          offset: style.outlineOffset,
        },
        boxShadow: style.boxShadow,
        visible:
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < innerHeight,
      };
    });
    if (sample) focusSamples.push(sample);
  }

  const invisibleFocus = focusSamples.filter(
    (sample) => sample.visible && !sample.hasVisibleFocus,
  );
  if (invisibleFocus.length) {
    issues.push(
      `${invisibleFocus.length} keyboard focus sample(s) had no visible outline or focus shadow`,
    );
  }

  const name = `keyboard focus @ ${viewportName}`;
  recordFailure(name, issues);
  results.push({ name, issues, focusSamples });
  await context.close();
}

async function checkCommandPalette(browser, viewportName) {
  const context = await browser.newContext({
    viewport: viewports[viewportName],
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const issues = [];

  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: /Search Lab objects and pages/i });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(80);

  const dialog = page.locator("dialog[open]");
  if (!(await dialog.isVisible().catch(() => false))) {
    issues.push("Control+K did not open the Lab command palette");
  }

  const inputFocused = await page.evaluate(
    () =>
      document.activeElement?.getAttribute("aria-label") ===
      "Search Lab objects, relationships, and pages",
  );
  if (!inputFocused) issues.push("command palette did not focus the search input");

  await page.keyboard.type("governance");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");

  const focusEscaped = await page.evaluate(() => {
    const dialog = document.querySelector("dialog[open]");
    return Boolean(dialog && !dialog.contains(document.activeElement));
  });
  if (focusEscaped) issues.push("keyboard focus escaped the open command palette dialog");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(80);
  if (await page.locator("dialog[open]").count()) {
    issues.push("Escape did not close the Lab command palette");
  }

  const triggerRestored = await page.evaluate(
    () =>
      document.activeElement?.getAttribute("aria-label") ===
      "Search Lab objects and pages. Keyboard shortcut Command or Control K.",
  );
  if (!triggerRestored) {
    issues.push("closing a trigger-opened command palette did not restore focus to its trigger");
  }

  await page.keyboard.press("Control+K");
  await page.waitForTimeout(60);
  if (!(await dialog.isVisible().catch(() => false))) {
    issues.push("Control+K did not open the Lab command palette");
  } else {
    await page.keyboard.press("Escape");
  }

  const name = `command palette @ ${viewportName}`;
  recordFailure(name, issues);
  results.push({ name, issues });
  await context.close();
}

async function checkNotFound(browser) {
  const context = await browser.newContext({
    viewport: viewports.mobile,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const issues = [];
  const response = await page.goto(`${base}/v3/__release-qa-missing__`, {
    waitUntil: "networkidle",
  });

  if (response?.status() !== 404) {
    issues.push(`missing institutional route returned HTTP ${response?.status() ?? "none"} instead of 404`);
  }
  if (!(await page.getByRole("heading", { level: 1 }).isVisible())) {
    issues.push("institutional 404 does not expose a visible h1");
  }
  if (!(await page.getByRole("link", { name: "Return to the Lab" }).isVisible())) {
    issues.push("institutional 404 does not expose a recovery link to the Lab");
  }

  const screenshotPath = path.join(screenshotDir, "v3-404--mobile.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const name = "institutional 404 @ mobile";
  recordFailure(name, issues);
  results.push({
    name,
    issues,
    responseStatus: response?.status() ?? null,
    screenshot: path.relative(artifactDir, screenshotPath),
  });
  await context.close();
}

function writeReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    base,
    publicRouteCount: publicRoutes.length,
    visitCount: visits.length,
    failureCount: failures.reduce((sum, failure) => sum + failure.issues.length, 0),
    failures,
    results,
  };

  fs.writeFileSync(
    path.join(artifactDir, "report.json"),
    JSON.stringify(report, null, 2),
  );

  const lines = [
    "# Website v3 release QA",
    "",
    `Generated: ${report.generatedAt}`,
    `Public routes: **${report.publicRouteCount}**`,
    `Viewport route visits: **${report.visitCount}**`,
    `Critical failures: **${report.failureCount}**`,
    "",
    "## Failures",
    "",
  ];

  if (!failures.length) lines.push("None.");
  for (const failure of failures) {
    lines.push(`### ${failure.name}`);
    for (const issue of failure.issues) lines.push(`- ${issue}`);
    lines.push("");
  }

  lines.push(
    "## Route matrix",
    "",
    "| Route | Viewport | HTTP | Overflow | H1 | Main | Clipped | Unnamed | Target spacing | Motion |",
    "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|",
  );

  for (const result of results.filter((item) => item.metrics)) {
    lines.push(
      `| ${result.route} | ${result.viewportName} | ${result.responseStatus ?? "—"} | ${result.metrics.horizontalOverflow ? "FAIL" : "ok"} | ${result.metrics.h1Count} | ${result.metrics.mainCount} | ${result.metrics.clippedText.length} | ${result.metrics.unnamedInteractive.length} | ${result.metrics.targetSpacingViolations.length} | ${result.metrics.longMotion.length} |`,
    );
  }

  fs.writeFileSync(path.join(artifactDir, "report.md"), lines.join("\n"));
  console.log(lines.join("\n"));
}

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
  {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

let browser;
try {
  await waitForServer(server);
  browser = await chromium.launch({ headless: true });

  for (const visitConfig of visits) {
    await visit(browser, visitConfig);
  }

  await checkSkipAndFocus(browser, "desktop");
  await checkSkipAndFocus(browser, "mobile");
  await checkCommandPalette(browser, "desktop");
  await checkCommandPalette(browser, "mobile");
  await checkNotFound(browser);

  writeReport();
} finally {
  await browser?.close();
  await stopServer(server);
}

if (failures.length) {
  console.error(
    `Website v3 release QA failed with ${failures.reduce(
      (sum, failure) => sum + failure.issues.length,
      0,
    )} issue(s).`,
  );
  process.exit(1);
}

console.log("Website v3 release QA passed.");
