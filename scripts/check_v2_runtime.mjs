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

async function expectRedirect(path, expectedLocation) {
  const response = await fetchWithTimeout(`${base}${path}`);
  if (response.status !== 308) {
    throw new Error(`${path} returned HTTP ${response.status}; expected permanent redirect`);
  }

  if (response.headers.get("location") !== expectedLocation) {
    throw new Error(`${path} redirected to ${response.headers.get("location")}; expected ${expectedLocation}`);
  }
}

async function stopServer() {
  if (server.exitCode !== null) return;

  const gracefulExit = new Promise((resolve) => server.once("exit", resolve));
  server.kill("SIGTERM");
  await Promise.race([
    gracefulExit,
    sleep(2_000),
  ]);

  if (server.exitCode === null) {
    const forcedExit = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGKILL");
    await Promise.race([forcedExit, sleep(2_000)]);
  }
}

try {
  await waitForServer();

  // The canonical root is the new doctrine-led institutional introduction.
  const homeMarkers = [
    "Boundary First Labs", "Research and engineering for consequential systems.",
    "We study the boundaries where systems become real.",
    "Trace what follows. Design for repair.", "Boundary First Labs is maintenance.",
    'data-doctrine-links="home"',
  ];
  await expectPage("/", homeMarkers, ["THE LAB MACHINE", "Root World · operating environment"]);

  // Retired root-world query state is harmless legacy noise. It must not revive
  // the Lab Machine or the old hero/entered-root split on the canonical site.
  await expectPage("/?world=1", homeMarkers, [
    "THE LAB MACHINE",
    "Enter the lab",
    "Root World",
    "operating environment",
  ]);

  for (const [path, context] of [
    ["/codexware", "codexware"], ["/observatory", "observatory"], ["/work-with-us", "work-with-us"],
    ["/codexware/economic-maintenance", "codexware/economic-maintenance"],
    ["/codexware/civic-record", "codexware/civic-record"],
    ["/digital-native-institution", "digital-native-institution"], ["/evidence-and-trust", "evidence-and-trust"],
    ["/work-with-us/professional-services", "work-with-us/professional-services"],
    ["/work-with-us/paper-auditing", "work-with-us/paper-auditing"],
    ["/work-with-us/public-service", "work-with-us/public-service"],
    ["/work-with-us/funding", "work-with-us/funding"],
    ["/observatory/intellectual-lineage", "observatory/intellectual-lineage"],
    ["/observatory/research-architecture", "observatory/research-architecture"],
    ["/observatory/computational-inquiry", "observatory/computational-inquiry"],
    ["/observatory/demonstrations", "observatory/demonstrations"], ["/observatory/instruments", "observatory/instruments"],
    ["/consequential-systems", "related"], ["/ai-governance", "related"], ["/constructive-human-agency", "related"],
  ]) {
    await expectPage(path, [`data-doctrine-links="${context}"`]);
    await expectRedirect(`/v3${path}`, path);
  }
  await expectPage("/contact", ["data-inquiry-composer", "Start with what brought you here.", "Copy inquiry draft"]);
  await expectPage("/", ['href="/digital-native-institution"']);
  await expectPage("/work-with-us", ['href="/digital-native-institution"']);
  await expectPage("/digital-native-institution", ["A Digital-Native Institution", "One person, supported by carefully governed computational tools."], ["One human. Governed computational leverage."]);

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
