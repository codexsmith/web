import { spawn } from "node:child_process";

const port = 3218;
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
  throw new Error(`Timed out waiting for Soccer runtime server\n${output}`);
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

  const redirect = await fetchWithTimeout("/soccer");
  const expectedLocation = "/research/applied-testbeds/soccer?detail=record:boundary-first-soccer";
  if (redirect.status !== 308 || redirect.headers.get("location") !== expectedLocation) {
    throw new Error(
      `/soccer did not redirect to ${expectedLocation}; got ${redirect.status} ${redirect.headers.get("location")}`,
    );
  }

  const detail = await fetchWithTimeout(expectedLocation);
  if (detail.status !== 200) {
    throw new Error(`Soccer detail route returned HTTP ${detail.status}`);
  }

  const html = await detail.text();
  const expected = [
    "data-detail-kind=\"record\"",
    "Before asking where the ball should go, ask what boundary must change.",
    "Field rule",
    "Current team state",
    "Actionable space is relational.",
    "Phase-reading rail",
    "Worked possession trace",
    "Pressure authored",
    "Repair action",
    "Promotion test",
    "constructed tactical teaching phase",
    "Candidate observation layer",
    "Match-evidence boundary",
    "External evidence condition",
    "Video, event data, tracking data, coaching interpretation, and established tactical frameworks remain authoritative witnesses.",
    "Not established",
    "Return to object",
  ];

  for (const marker of expected) {
    if (!html.includes(marker)) {
      throw new Error(`Soccer detail route did not contain expected marker: ${marker}`);
    }
  }

  for (const forbidden of ["Structured retained record", "Governed public landing", "aria-modal=\"true\""]) {
    if (html.includes(forbidden)) {
      throw new Error(`Soccer detail route contained forbidden fallback/modal marker: ${forbidden}`);
    }
  }

  console.log("P4 Soccer production spatial practitioner field: pass");
} finally {
  await stopServer();
}
