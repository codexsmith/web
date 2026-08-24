import { spawn } from "node:child_process";

const port = 3217;
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
  throw new Error(`Timed out waiting for Chess runtime server\n${output}`);
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

  const redirect = await fetchWithTimeout("/chess");
  const expectedLocation = "/research/applied-testbeds/chess?detail=record:boundary-first-chess";
  if (redirect.status !== 308 || redirect.headers.get("location") !== expectedLocation) {
    throw new Error(
      `/chess did not redirect to ${expectedLocation}; got ${redirect.status} ${redirect.headers.get("location")}`,
    );
  }

  const detail = await fetchWithTimeout(expectedLocation);
  if (detail.status !== 200) {
    throw new Error(`Chess detail route returned HTTP ${detail.status}`);
  }

  const html = await detail.text();
  const expected = [
    "data-detail-kind=\"record\"",
    "See the position before you calculate the move.",
    "Decision rule",
    "Position state",
    "Reachable futures under adversarial constraint",
    "Commitment rail",
    "Candidate move consequence trace",
    "Material gain",
    "Defender leaves its post",
    "Closure test",
    "constructed teaching pattern",
    "Validation board",
    "External truth condition",
    "Agreement with established chess analysis on the actual position.",
    "Not established",
    "Return to object",
  ];

  for (const marker of expected) {
    if (!html.includes(marker)) {
      throw new Error(`Chess detail route did not contain expected marker: ${marker}`);
    }
  }

  for (const forbidden of ["Structured retained record", "Governed public landing", "aria-modal=\"true\""]) {
    if (html.includes(forbidden)) {
      throw new Error(`Chess detail route contained forbidden fallback/modal marker: ${forbidden}`);
    }
  }

  console.log("P4 Chess production practitioner decision board: pass");
} finally {
  await stopServer();
}
