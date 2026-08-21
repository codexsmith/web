import { spawn } from "node:child_process";

const port = 3210;
const base = `http://127.0.0.1:${port}`;
const nextCli = "node_modules/next/dist/bin/next";
const server = spawn(process.execPath, [nextCli, "start", "-p", String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (chunk) => { output += chunk.toString(); });
server.stderr.on("data", (chunk) => { output += chunk.toString(); });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url) {
  return fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited before readiness with code ${server.exitCode}\n${output}`);
    }

    try {
      const response = await fetchWithTimeout(base);
      if (response.status >= 200 && response.status < 500) return;
    } catch (error) {
      lastError = error;
    }

    await sleep(350);
  }

  throw new Error(`Timed out waiting for production server${lastError ? `: ${lastError}` : ""}\n${output}`);
}

async function expectPage(path, expectedStrings, forbiddenStrings = []) {
  const response = await fetchWithTimeout(`${base}${path}`);
  if (response.status !== 200) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }

  const html = await response.text();
  for (const expected of expectedStrings) {
    if (!html.includes(expected)) {
      throw new Error(`${path} did not contain expected public marker: ${expected}`);
    }
  }

  for (const forbidden of forbiddenStrings) {
    if (html.includes(forbidden)) {
      throw new Error(`${path} contained forbidden public marker: ${forbidden}`);
    }
  }
}

async function stopServer() {
  if (server.exitCode !== null) return;

  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    sleep(2_000),
  ]);

  if (server.exitCode === null) {
    server.kill("SIGKILL");
    await new Promise((resolve) => server.once("exit", resolve));
  }
}

try {
  await waitForServer();

  await expectPage("/", [
    "Software for difficult systems.",
    "Enter the lab",
    "Boundary First Labs",
  ], [
    "Enter region",
    "Root World · operating environment",
    "The hero is the threshold",
    "Cross the threshold to activate",
    "One proposition · one action · one world beyond it",
  ]);

  await expectPage("/?world=1", [
    "Boundary First Labs",
    "Follow the work, the evidence behind it, and the obligations it creates.",
    "Products",
    "Public Interest",
    "Research",
    "Publications",
    "About",
    "Enter region",
    "Depth",
  ], [
    "Enter the lab",
    "Root World",
    "operating environment",
    "Back through trace",
    "Forward through trace",
  ]);

  await expectPage("/?world=1&view=timeline", [
    "Founder timeline",
    "From practice to Boundary First Labs",
    "Development arc",
  ]);

  await expectPage("/publications", [
    "Publications",
    "At a glance",
    "Continue from here",
    "Publication status is tracked separately",
    "Essays &amp; Arguments",
    "Methods &amp; Standards",
    "Research Programs",
    "Learning &amp; Visuals",
    "Enter region",
  ]);

  await expectPage("/publications/methods/software-before-code", [
    "Software Before Code",
    "At a glance",
    "Working Public Method",
    "Next publication gate",
    "External practitioner review",
  ]);

  await expectPage("/publications/essays/executable-distinctions?view=evidence", [
    "Evidence / lineage projection",
    "Executable Distinctions",
    "Working publication · review pending",
    "Publication development state is independent",
  ]);

  await expectPage("/public-interest", [
    "Public Interest",
    "At a glance",
    "Mission",
    "Principles",
    "Goals &amp; Aspirations",
    "Augusta Civic Infrastructure",
    "Open project record",
  ]);

  await expectPage("/public-interest?view=record", [
    "Public Interest",
    "Contained regions",
    "Inspect through this node",
  ]);

  await expectPage("/public-interest?view=process", [
    "Process projection",
    "Agentic · Lean Startup · Agile · Scientific · Computational · Constructive",
  ]);

  await expectPage("/public-interest/goals-aspirations", [
    "Goals &amp; Aspirations",
    "At a glance",
  ]);

  // Explicitly addressed, no-index Apparatus prototype. Card remains the default route.
  await expectPage("/?world=1&ui=apparatus", [
    "APPARATUS",
    "bounded prototype",
    "ROOT WORLD · BACKPLANE",
    "Products",
    "Public Interest",
    "Research",
    "Publications",
    "About",
    "Return to Card",
    "noindex",
  ], [
    "Enter region",
  ]);

  await expectPage("/research/software?ui=apparatus", [
    "APPARATUS",
    "Software",
    "CONTAINED MODULES",
    "Boundary First Engineering",
    "Executable Representation",
    "Boundary First UX",
    "Verification &amp; Governance",
    "LOCAL ROUTING",
  ]);

  await expectPage("/publications/methods/software-before-code?ui=apparatus", [
    "APPARATUS",
    "Software Before Code",
    "Working Public Method",
    "GATE · NEXT PUBLICATION GATE",
    "External practitioner review",
    "Return to Card",
  ]);

  await expectPage("/publications/methods/software-before-code?view=evidence&ui=apparatus", [
    "APPARATUS",
    "Evidence / lineage projection",
    "Software Before Code",
    "Working Public Method",
  ]);

  console.log("v2 production runtime smoke: pass");
} finally {
  await stopServer();
}
