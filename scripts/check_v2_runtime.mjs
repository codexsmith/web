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
    "Entry threshold",
  ], [
    "Enter region",
    "Root World · operating environment",
  ]);

  await expectPage("/?world=1", [
    "Root World · operating environment",
    "Products",
    "Public Interest",
    "Research",
    "About",
    "Enter region",
  ], [
    "Enter the lab",
  ]);

  await expectPage("/public-interest", [
    "Public Interest",
    "Contained regions",
  ]);

  await expectPage("/public-interest?view=world", [
    "Public Interest",
    "Enter region",
  ]);

  await expectPage("/public-interest?view=gestalt", [
    "Gestalt / process projection",
    "Agentic · Lean Startup · Agile · Scientific · Computational · Constructive",
  ]);

  await expectPage("/public-interest/goals-aspirations", [
    "Goals &amp; Aspirations",
  ]);

  console.log("v2 production runtime smoke: pass");
} finally {
  await stopServer();
}
