import { spawn } from "node:child_process";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const HOST = "127.0.0.1";
const PORT = Number(process.env.BFL_ACCEPTANCE_PORT ?? 4317);
const BASE_URL = `http://${HOST}:${PORT}`;
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const serverOutput = [];
const pageCache = new Map();

function recordServerOutput(chunk) {
  const text = chunk.toString();
  serverOutput.push(text);
  if (serverOutput.length > 80) serverOutput.shift();
}

function fail(message) {
  throw new Error(message);
}

function normalizeRenderedHtml(html) {
  return html
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function includesText(html, text) {
  return normalizeRenderedHtml(html).toLowerCase().includes(text.toLowerCase());
}

function requireText(html, text, context) {
  if (!includesText(html, text)) {
    fail(`${context}: missing expected rendered text: ${text}`);
  }
}

function requireHref(html, href, context) {
  const quoted = [`href="${href}"`, `href='${href}'`];
  if (!quoted.some((value) => html.includes(value))) {
    fail(`${context}: missing expected rendered link: ${href}`);
  }
}

async function fetchPage(route) {
  if (pageCache.has(route)) return pageCache.get(route);

  const response = await fetch(`${BASE_URL}${route}`, {
    redirect: "follow",
    cache: "no-store",
  });
  const html = await response.text();
  if (!response.ok) {
    fail(`${route}: expected successful response, received ${response.status}`);
  }

  const page = { route, response, html };
  pageCache.set(route, page);
  return page;
}

async function waitForServer(server) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      fail(`Next production server exited before acceptance checks began (exit ${server.exitCode}).`);
    }
    try {
      const response = await fetch(`${BASE_URL}/`, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await delay(250);
  }
  fail("Next production server did not become ready within the acceptance window.");
}

async function stopServer(server) {
  if (server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(3000).then(() => {
      if (server.exitCode === null) server.kill("SIGKILL");
    }),
  ]);
}

const criteria = [
  {
    id: "institution-legible",
    outcome: "Institution is legible before theory taxonomy.",
    check: async () => {
      const { html } = await fetchPage("/");
      requireText(html, "Independent research & engineering lab", "/");
      requireText(
        html,
        "Boundary First Labs studies how complex systems are structured, how their parts depend on one another, and how they can be changed without losing what matters.",
        "/",
      );
      requireHref(html, "/about", "/");
    },
  },
  {
    id: "software-preferred",
    outcome: "Software is the preferred concrete entrance.",
    check: async () => {
      const root = await fetchPage("/");
      const software = await fetchPage("/software");
      requireText(root.html, "Start with a real problem", "/");
      requireHref(root.html, "/software", "/");
      requireText(software.html, "Preferred practical entrance", "/software");
      requireText(software.html, "Real software problems. A method for making them legible.", "/software");
    },
  },
  {
    id: "practice-before-abstraction",
    outcome: "Recognizable practice precedes formal abstraction.",
    check: async () => {
      const { html } = await fetchPage("/software");
      requireText(html, "The bug is somewhere in here.", "/software");
      requireText(html, "Working vocabulary", "/software");
      requireText(html, "Boundary", "/software");
      requireText(html, "Invariant", "/software");
      requireHref(html, "/methods", "/software");
    },
  },
  {
    id: "progressive-depth",
    outcome: "Practice can descend through method, evidence, research, and theory without losing route orientation.",
    check: async () => {
      const methods = await fetchPage("/methods");
      const evidence = await fetchPage("/evidence");
      const research = await fetchPage("/research");
      const theory = await fetchPage("/theory");

      requireHref(methods.html, "/software", "/methods");
      requireHref(methods.html, "/evidence", "/methods");
      requireHref(evidence.html, "/methods", "/evidence");
      requireHref(evidence.html, "/research", "/evidence");
      requireHref(research.html, "/evidence", "/research");
      requireHref(research.html, "/theory", "/research");
      requireHref(theory.html, "/research", "/theory");
    },
  },
  {
    id: "status-inspectable",
    outcome: "Evidence, authority, experimental standing, and institutional state remain inspectable.",
    check: async () => {
      const evidence = await fetchPage("/evidence");
      const work = await fetchPage("/work/index");
      const sandbox = await fetchPage("/sandbox");
      const trust = await fetchPage("/trust");

      requireText(evidence.html, "claim", "/evidence");
      if (!includesText(work.html, "governed") && !includesText(work.html, "provisional")) {
        fail("/work/index: expected governed or provisional authority language");
      }
      requireText(sandbox.html, "Sandbox", "/sandbox");
      requireText(trust.html, "Formation state", "/trust");
    },
  },
  {
    id: "contextual-contact",
    outcome: "Inquiry context survives the route into contact.",
    check: async () => {
      const { html } = await fetchPage(
        "/inquire?intent=work&source=%2Fsoftware&topic=release%20change&record=acceptance-demo",
      );
      requireText(html, "Context-preserving inquiry", "/inquire");
      requireText(html, "release change", "/inquire");
      requireText(html, "/software", "/inquire");
      requireText(html, "acceptance-demo", "/inquire");
      requireText(html, "mailto:", "/inquire");
    },
  },
  {
    id: "purpose-bypass",
    outcome: "Visitors can bypass Software for other legitimate purposes.",
    check: async () => {
      const { html } = await fetchPage("/");
      for (const href of ["/work", "/research", "/about", "/collaborate"]) {
        requireHref(html, href, "/");
      }
    },
  },
  {
    id: "inner-corpus-retained",
    outcome: "The retained deeper corpus remains reachable from the public architecture.",
    check: async () => {
      for (const route of [
        "/domains",
        "/relations",
        "/publications",
        "/map?mode=atlas&view=domains",
      ]) {
        await fetchPage(route);
      }

      const research = await fetchPage("/research");
      requireHref(research.html, "/domains", "/research");
      if (!research.html.includes("/map?mode=atlas") && !research.html.includes("/map?mode=atlas&amp;")) {
        fail("/research: missing rendered Atlas route");
      }
    },
  },
];

async function main() {
  const server = spawn(
    process.execPath,
    [nextBin, "start", "-H", HOST, "-p", String(PORT)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
        NODE_ENV: "production",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", recordServerOutput);
  server.stderr.on("data", recordServerOutput);

  try {
    await waitForServer(server);

    for (const criterion of criteria) {
      await criterion.check();
      console.log(`PASS ${criterion.id} — ${criterion.outcome}`);
    }

    console.log(`Runtime launch-readiness contracts pass: ${criteria.length}/${criteria.length}`);
    console.log(`Rendered routes exercised: ${pageCache.size}`);
    console.log(
      "Human review remains open for comprehension, visual hierarchy, keyboard/focus/reduced-motion behavior, evidence sufficiency, and progressive-disclosure quality.",
    );
  } catch (error) {
    console.error("Runtime launch-readiness acceptance failed:");
    console.error(error instanceof Error ? error.message : error);
    if (serverOutput.length > 0) {
      console.error("Recent Next server output:");
      console.error(serverOutput.join("").trim());
    }
    process.exitCode = 1;
  } finally {
    await stopServer(server);
  }
}

await main();
