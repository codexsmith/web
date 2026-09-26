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
  await waitForServer();

  // The canonical public root is the institutional site.
  await expectPage("/", [
    "Boundary First Labs",
    "Systematizing knowledge for science, engineering, and public reasoning.",
    "Boundary First Labs is an applied systems research laboratory",
    "Explore Applied Work",
    "Read the Research",
    "FEATURED WORK",
    "THE LAB IN MOTION",
    "OUR STANCE",
  ], [
    "THE LAB MACHINE",
    "Enter the lab",
    "Root World · operating environment",
    "The hero is the threshold",
    "Cross the threshold to activate",
  ]);

  // Retired root-world query state is harmless legacy noise. It must not revive
  // the Lab Machine or the old hero/entered-root split on the canonical site.
  await expectPage("/?world=1", [
    "Boundary First Labs",
    "Systematizing knowledge for science, engineering, and public reasoning.",
    "Explore Applied Work",
    "Read the Research",
  ], [
    "THE LAB MACHINE",
    "Enter the lab",
    "Root World",
    "operating environment",
  ]);

  // The Lab Machine remains available at the explicit versioned development
  // surface. This is the only place this smoke test expects Lab Machine identity.
  await expectPage("/v2", [
    "THE LAB MACHINE",
    "Powered by Research. Built for People.",
    "Products",
    "People",
    "Research",
  ], [
    "Systematizing knowledge for science, engineering, and public reasoning.",
  ]);

  // Legacy/version aliases must resolve into the canonical institutional route
  // space rather than creating parallel public roots.
  await expectRedirect("/world", "/");
  await expectRedirect("/v3", "/");
  await expectRedirect("/v3/research", "/research");

  console.log("current routing production runtime smoke: pass");
} finally {
  await stopServer();
}
