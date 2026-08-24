import { spawn } from "node:child_process";

const port = 3214;
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
  throw new Error(`Timed out waiting for Weather runtime server\n${output}`);
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

  const redirect = await fetchWithTimeout("/weather");
  const expectedLocation = "/research/applied-testbeds/weather?detail=record:boundary-first-weather";
  if (redirect.status !== 308 || redirect.headers.get("location") !== expectedLocation) {
    throw new Error(
      `/weather did not redirect to ${expectedLocation}; got ${redirect.status} ${redirect.headers.get("location")}`,
    );
  }

  const detail = await fetchWithTimeout(expectedLocation);
  if (detail.status !== 200) {
    throw new Error(`Weather detail route returned HTTP ${detail.status}`);
  }

  const html = await detail.text();
  const expected = [
    "data-detail-kind=\"record\"",
    "Compute where the weather is changing.",
    "Established infrastructure",
    "Experimental layer",
    "Core hypothesis",
    "Claim ladder",
    "Watch a forecast lose the boundary.",
    "Matched-baseline measures",
    "Validation ladder",
    "A well-bounded negative result is still a successful research pilot.",
    "Not allowed yet",
    "Return to object",
  ];

  for (const marker of expected) {
    if (!html.includes(marker)) {
      throw new Error(`Weather detail route did not contain expected marker: ${marker}`);
    }
  }

  for (const forbidden of ["Structured retained record", "Governed public landing"]) {
    if (html.includes(forbidden)) {
      throw new Error(`Weather detail route contained forbidden fallback marker: ${forbidden}`);
    }
  }

  console.log("P4 Weather production research testbed: pass");
} finally {
  await stopServer();
}
