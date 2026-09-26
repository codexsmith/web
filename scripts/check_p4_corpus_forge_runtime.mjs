import { spawn } from "node:child_process";

const port = 3211;
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

async function fetchWithTimeout(path) {
  return fetch(`${base}${path}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited before readiness with code ${server.exitCode}\n${output}`);
    }
    try {
      const response = await fetchWithTimeout("/");
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Retry until the production server is ready.
    }
    await sleep(350);
  }
  throw new Error(`Timed out waiting for Corpus Forge runtime server\n${output}`);
}

async function stopServer() {
  if (server.exitCode !== null) return;
  const gracefulExit = new Promise((resolve) => server.once("exit", resolve));
  server.kill("SIGTERM");
  await Promise.race([gracefulExit, sleep(2_000)]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

try {
  await waitForServer();

  const redirect = await fetchWithTimeout("/corpus-forge");
  const expectedLocation = "/products/current/corpus-forge?detail=record:corpus-forge";
  if (redirect.status !== 308 || redirect.headers.get("location") !== expectedLocation) {
    throw new Error(
      `/corpus-forge did not redirect to ${expectedLocation}; got ${redirect.status} ${redirect.headers.get("location")}`,
    );
  }

  const detail = await fetchWithTimeout(expectedLocation);
  if (detail.status !== 200) {
    throw new Error(`Corpus Forge detail route returned HTTP ${detail.status}`);
  }

  const html = await detail.text();
  const expected = [
    "Corpus Forge",
    "Research operations software and method",
    "Active development",
    "CURRENT PUBLIC RECORD",
    "What this work currently says.",
    "A governed memory and research-operations system for provenance, typed claims, contradiction, review, promotion, supersession, and repair.",
    "What exists now",
    "The six-stage source-to-repair lifecycle is specified and public.",
    "The current public claim is a developed research-operations method plus an active software program, not a claim of finished platform deployment.",
  ];

  for (const marker of expected) {
    if (!html.includes(marker)) {
      throw new Error(`Canonical Corpus Forge route did not contain expected marker: ${marker}`);
    }
  }

  for (const forbidden of ["Structured retained record", "Governed public landing"]) {
    if (html.includes(forbidden)) {
      throw new Error(`Canonical Corpus Forge route contained forbidden fallback marker: ${forbidden}`);
    }
  }

  console.log("P4 Corpus Forge canonical production surface: pass");
} finally {
  await stopServer();
}
