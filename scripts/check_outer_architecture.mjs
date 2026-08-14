import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const acceptancePath = path.join(
  SRC,
  "content",
  "architecture_acceptance_v0_1.json",
);

function fail(errors, message) {
  errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function routeExists(route) {
  if (route === "/") return fs.existsSync(path.join(SRC, "app", "page.jsx"));
  const clean = route.split(/[?#]/, 1)[0].replace(/^\//, "");
  return fs.existsSync(path.join(SRC, "app", clean, "page.tsx"));
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
  for (const label of ["Software", "Work", "Research", "Institute", "Collaborate"]) {
    requireText(errors, "src/lib/site-navigation.ts", `label: "${label}"`);
  }

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
  console.log("Human usability/evidence/accessibility review remains intentionally open");
}

main();
