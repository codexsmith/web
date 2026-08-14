import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const acceptancePath = path.join(
  SRC,
  "content",
  "architecture_acceptance_v0_1.json",
);
const PAGE_EXTENSIONS = ["tsx", "ts", "jsx", "js"];

function fail(errors, message) {
  errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function routeExists(route) {
  const clean = route.split(/[?#]/, 1)[0].replace(/^\//, "");
  const routeDirectory = clean ? path.join(SRC, "app", clean) : path.join(SRC, "app");
  return PAGE_EXTENSIONS.some((extension) =>
    fs.existsSync(path.join(routeDirectory, `page.${extension}`)),
  );
}

function requireText(errors, relativePath, text) {
  const content = read(relativePath);
  if (!content.includes(text)) {
    fail(errors, `${relativePath}: missing required architecture contract: ${text}`);
  }
}

function main() {
  const errors = [];
  const acceptance = JSON.parse(fs.readFileSync(acceptancePath, "utf8"));

  if (acceptance.status !== "implementation-review-pending") {
    fail(errors, "architecture acceptance status must remain implementation-review-pending until human review closes it");
  }

  if (acceptance.validation?.automatedGate !== "npm run architecture:check") {
    fail(errors, "architecture acceptance must identify the structural architecture gate");
  }
  if (acceptance.validation?.runtimeGate !== "npm run acceptance:runtime") {
    fail(errors, "architecture acceptance must identify the production runtime gate");
  }
  if (acceptance.validation?.runtimeStatus !== "verified") {
    fail(errors, "architecture acceptance runtime status must remain verified after Release 9 runtime acceptance");
  }

  const requiredRoutes = new Set([
    "/",
    "/software",
    "/methods",
    "/evidence",
    "/research",
    "/theory",
    "/work",
    "/work/index",
    "/trust",
    "/trust/architecture",
    "/inquire",
    "/collaborate",
    "/sandbox",
    "/sandbox/representation-lab",
    "/sandbox/interaction-research",
    "/outreach",
    "/domains",
    "/relations",
    "/publications",
  ]);

  for (const criterion of acceptance.criteria ?? []) {
    if (criterion.state !== "implemented-review-pending") {
      fail(
        errors,
        `architecture criterion ${criterion.id ?? "unknown"}: expected implemented-review-pending`,
      );
    }
    for (const item of criterion.evidence ?? []) {
      if (typeof item.href !== "string" || !item.href.startsWith("/")) continue;
      const route = item.href.split(/[?#]/, 1)[0];
      if (route !== "/map") requiredRoutes.add(route);
    }
  }

  for (const route of requiredRoutes) {
    if (!routeExists(route)) fail(errors, `route missing for architecture contract: ${route}`);
  }

  requireText(errors, "src/lib/site-navigation.ts", 'export const START_HREF = "/software"');
  for (const label of ["Software", "Work", "Research", "Laboratory", "Collaborate"]) {
    requireText(errors, "src/lib/site-navigation.ts", `label: "${label}"`);
  }
  requireText(errors, "src/lib/site-navigation.ts", '"/research": ["/research", "/evidence", "/theory", "/sandbox"');
  requireText(errors, "src/lib/site-navigation.ts", '"/collaborate": ["/collaborate", "/inquire", "/outreach"]');

  requireText(errors, "src/app/methods/page.tsx", 'href: "/software"');
  requireText(errors, "src/app/methods/page.tsx", 'href: "/evidence"');
  requireText(errors, "src/app/evidence/page.tsx", 'href: "/methods"');
  requireText(errors, "src/app/evidence/page.tsx", 'href: "/research"');
  requireText(errors, "src/app/research/page.tsx", 'href: "/evidence"');
  requireText(errors, "src/app/research/page.tsx", 'href: "/theory"');
  requireText(errors, "src/app/theory/page.tsx", 'href: "/research"');

  requireText(errors, "src/lib/work-records.ts", 'authority: "governed"');
  requireText(errors, "src/lib/work-records.ts", 'authority: "provisional"');
  requireText(errors, "src/lib/sandbox-registry.ts", "Sandbox contact may produce evidence");
  requireText(errors, "src/lib/inquiry.ts", "source");
  requireText(errors, "src/lib/inquiry.ts", "record");
  requireText(errors, "src/app/trust/page.tsx", 'href="/trust/architecture"');
  requireText(errors, "src/app/trust/architecture/page.tsx", "criterion.state");
  requireText(errors, "src/app/trust/architecture/page.tsx", "CircleDashed");
  requireText(errors, "src/app/trust/architecture/page.tsx", "runtimeStatus");
  requireText(errors, ".github/workflows/review-gate.yml", "npm run acceptance:runtime");

  const vercelPath = path.join(ROOT, "vercel.json");
  if (fs.existsSync(vercelPath)) {
    const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
    const deployment = vercel?.git?.deploymentEnabled;
    if (deployment?.main !== true || deployment?.["*"] !== false) {
      fail(errors, "vercel.json: expected branch deployments disabled with main explicitly enabled");
    }
  }

  if (errors.length > 0) {
    console.error("Outer architecture acceptance check failed:");
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  console.log("Outer architecture structural acceptance contracts pass");
  console.log(`Acceptance criteria encoded: ${acceptance.criteria.length}`);
  console.log(`Structural routes checked: ${requiredRoutes.size}`);
  console.log(`Runtime acceptance record: ${acceptance.validation.runtimeStatus}`);
  console.log("Human usability/evidence/accessibility review remains intentionally open");
}

main();
