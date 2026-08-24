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
    "View",
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
    "Related paths",
    "Publication status is tracked separately",
    "Essays &amp; Arguments",
    "Methods &amp; Standards",
    "Research Programs",
    "Learning &amp; Visuals",
    "View",
  ], [
    "A public essay presents a bounded argument",
    "Enter region",
  ]);

  await expectPage("/products", [
    "Products",
    "At a glance",
    "Current Work",
    "Shipped Work",
    "Product Pipeline",
    "Tools &amp; Experiments",
    "Related paths",
    "How We Work",
    "View",
  ], [
    "Work with a current public operating surface",
    "Systems that were actually delivered or operated",
    "Product concepts with enough architecture",
    "Small artifacts that test an interaction",
    "Enter region",
  ]);

  await expectPage("/research", [
    "Research",
    "At a glance",
    "Software",
    "Applied Testbeds",
    "Foundations",
    "Formal Theory",
    "Related paths",
    "Explore further",
    "View",
  ], [
    "A coherent software lane",
    "Enter region",
  ]);

  await expectPage("/about", [
    "About",
    "At a glance",
    "The Lab",
    "How We Work",
    "Provenance",
    "Contact",
    "Related paths",
    "View",
  ], [
    "Boundary First Labs as a software research and engineering lab whose primary medium",
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
    "Publication evidence",
    "Executable Distinctions",
    "Working v0.1 publication · review pending",
    "Claim ceiling",
    "Records behind the claims",
    "What remains outside the claim",
  ]);

  await expectPage("/products?view=evidence", [
    "Portfolio evidence",
    "Products",
    "Current portfolio distribution",
    "Evidence-bearing work",
    "Corpus Forge",
    "View evidence",
  ]);

  await expectPage("/products/current/corpus-forge?view=evidence", [
    "Product evidence",
    "What establishes Corpus Forge as an active program",
    "Claim ceiling",
    "Records behind the claims",
    "Effective date not established",
  ], [
    "src/content/",
    "Typed relations",
    "Retained / public records",
  ]);

  await expectPage("/about/contact?view=evidence", [
    "Contact",
    "Projection boundary",
    "data-projection=\"world\"",
    "data-projection-intent=\"evidence\"",
    "data-projection-fallback=\"true\"",
    "unavailable for ",
    "remains preferred and will resume when supported.",
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

  await expectRedirect("/public-interest?view=record", "/public-interest");

  await expectPage("/public-interest?view=process", [
    "Process projection",
    "Agentic · Lean Startup · Agile · Scientific · Computational · Constructive",
  ]);

  await expectPage("/public-interest/goals-aspirations", [
    "Goals &amp; Aspirations",
    "At a glance",
  ]);

  await expectRedirect(
    "/agency-audit",
    "/products/current/agency-representation-audit?detail=record:agency-representation-audit",
  );

  await expectPage(
    "/products/current/agency-representation-audit?detail=record:agency-representation-audit",
    [
      "data-detail-kind=\"record\"",
      "Retained record",
      "Make the chain from representation to consequence inspectable.",
      "Six questions locate the operating relationship.",
      "Five passes from authority to repair.",
      "Good pilot candidates are bounded, consequential, and inspectable.",
      "This is a systems audit, not delegated institutional authority.",
      "Return to object",
    ],
    ["Governed public landing", "Reading frame"],
  );

  await expectRedirect(
    "/software-before-code",
    "/publications/methods/software-before-code?detail=record:software-before-code",
  );

  await expectPage(
    "/publications/methods/software-before-code?detail=record:software-before-code",
    [
      "data-detail-kind=\"record\"",
      "Retained record",
      "Determine the object before selecting the mechanism.",
      "Nine questions before architecture hardens.",
      "Representation is controlled forgetting.",
      "Symptoms become useful when they point back to a lost distinction.",
      "What this method is not.",
      "Return to object",
    ],
    ["Governed public landing"],
  );

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
    "Publication evidence",
    "Software Before Code",
    "Working Public Method",
    "Records behind the claims",
  ]);

  console.log("v2 production runtime smoke: pass");
} finally {
  await stopServer();
}
