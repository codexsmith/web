import fs from "node:fs";

const failures = [];

function fail(message) {
  failures.push(message);
}

function parse(version) {
  return String(version)
    .replace(/^[^0-9]*/, "")
    .split(".")
    .slice(0, 3)
    .map((part) => Number.parseInt(part, 10) || 0);
}

function atLeast(actual, minimum) {
  const a = parse(actual);
  const m = parse(minimum);
  for (let index = 0; index < 3; index += 1) {
    if (a[index] > m[index]) return true;
    if (a[index] < m[index]) return false;
  }
  return true;
}

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
const workflow = fs.readFileSync(".github/workflows/review-gate.yml", "utf8");
const nvmrc = fs.readFileSync(".nvmrc", "utf8").trim();

if (packageJson.engines?.node !== "24.x") {
  fail('package.json engines.node must remain "24.x"');
}

if (nvmrc !== "24") {
  fail('.nvmrc must pin local development to Node 24');
}

if (!/node-version:\s*24(?:\.x)?\s*$/m.test(workflow)) {
  fail("Review Gate must run on Node 24");
}

const deploymentEnabled = vercelConfig.git?.deploymentEnabled;
if (
  deploymentEnabled?.["**"] !== false ||
  deploymentEnabled?.main !== true ||
  Object.prototype.hasOwnProperty.call(deploymentEnabled ?? {}, "*")
) {
  fail(
    'vercel.json must disable automatic Git deployments with "**": false and explicitly enable only main; "*" does not cover slash-delimited branches',
  );
}

if (vercelConfig.ignoreCommand !== "sh scripts/vercel-ignore-build.sh") {
  fail("vercel.json must retain the quota-preserving ignored-build script");
}

const nextDeclared = packageJson.dependencies?.next;
if (!nextDeclared || !atLeast(nextDeclared, "16.3.3")) {
  fail("package.json must require Next.js 16.3.3 or newer");
}

const otelDeclared = packageJson.dependencies?.["@vercel/otel"];
const otelApiDeclared = packageJson.dependencies?.["@opentelemetry/api"];
const otelLogsDeclared = packageJson.dependencies?.["@opentelemetry/api-logs"];
if (!otelDeclared || !atLeast(otelDeclared, "2.1.3")) {
  fail("package.json must require @vercel/otel 2.1.3 or newer");
}
if (!otelApiDeclared || !atLeast(otelApiDeclared, "1.9.0")) {
  fail("package.json must require @opentelemetry/api 1.9.0 or newer");
}
if (!otelLogsDeclared || !atLeast(otelLogsDeclared, "0.222.0")) {
  fail("package.json must require @opentelemetry/api-logs 0.222.0 or newer");
}

const instrumentationPath = "src/instrumentation.ts";
if (!fs.existsSync(instrumentationPath)) {
  fail("Vercel OpenTelemetry instrumentation must exist at src/instrumentation.ts");
} else {
  const instrumentation = fs.readFileSync(instrumentationPath, "utf8");
  if (!instrumentation.includes('from "@vercel/otel"')) {
    fail("src/instrumentation.ts must register Vercel OpenTelemetry");
  }
  if (!instrumentation.includes('serviceName: "boundary-first-labs-web"')) {
    fail('src/instrumentation.ts must retain serviceName "boundary-first-labs-web"');
  }
}


const serverObservabilityPath = "src/lib/server-observability.ts";
if (!fs.existsSync(serverObservabilityPath)) {
  fail("Structured server observability helper must exist");
} else {
  const serverObservability = fs.readFileSync(serverObservabilityPath, "utf8");
  if (!serverObservability.includes('request.headers.get("x-vercel-id")')) {
    fail("Structured request logs must preserve the Vercel request correlation id");
  }
  if (!serverObservability.includes('msg: "start"') || !serverObservability.includes('msg: "done"') || !serverObservability.includes('msg: "failed"')) {
    fail("Structured server observability must retain start/done/failed lifecycle logs");
  }
}

for (const routePath of [
  "src/app/api/bfux/layout-studio/route.ts",
  "src/app/api/inquiry/route.ts",
  "src/app/api/open-lab/route.ts",
  "src/app/api/simulate/route.ts",
]) {
  const routeSource = fs.readFileSync(routePath, "utf8");
  if (!routeSource.includes("observeRequest(")) {
    fail(`${routePath} must retain structured request observability`);
  }
}

const bridgeActions = fs.readFileSync("src/app/ops/bridges/actions.ts", "utf8");
if (!bridgeActions.includes("startServerActionObservation(")) {
  fail("Bridge server actions must retain structured action observability");
}

const floors = [
  ["node_modules/@vercel/otel", "2.1.3", "Vercel OTel"],
  ["node_modules/@opentelemetry/api", "1.9.0", "OpenTelemetry API"],
  ["node_modules/@opentelemetry/api-logs", "0.222.0", "OpenTelemetry Logs API"],
  ["node_modules/next", "16.3.3", "Next.js"],
  ["node_modules/js-yaml", "4.3.2", "js-yaml"],
  ["node_modules/mermaid", "11.16.1", "Mermaid"],
  ["node_modules/dompurify", "3.4.13", "DOMPurify"],
  ["node_modules/nanoid", "3.3.19", "nanoid"],
  ["node_modules/sharp", "0.35.4", "Sharp"],
  ["node_modules/baseline-browser-mapping", "2.11.25", "baseline-browser-mapping"],
  ["node_modules/browserslist", "4.29.0", "Browserslist"],
  ["node_modules/brace-expansion", "1.1.21", "brace-expansion"],
  [
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion",
    "5.0.12",
    "typescript-estree brace-expansion",
  ],
];

for (const [path, minimum, label] of floors) {
  const actual = packageLock.packages?.[path]?.version;
  if (!actual) {
    fail(`${label} is missing from package-lock.json`);
  } else if (!atLeast(actual, minimum)) {
    fail(`${label} must be >= ${minimum}; locked ${actual}`);
  }
}

for (const packageName of [
  "@next/env",
  "@next/swc-darwin-arm64",
  "@next/swc-darwin-x64",
  "@next/swc-linux-arm64-gnu",
  "@next/swc-linux-arm64-musl",
  "@next/swc-linux-x64-gnu",
  "@next/swc-linux-x64-musl",
  "@next/swc-win32-arm64-msvc",
  "@next/swc-win32-x64-msvc",
]) {
  const actual = packageLock.packages?.[`node_modules/${packageName}`]?.version;
  if (actual !== "16.3.3") {
    fail(`${packageName} must stay aligned to Next.js 16.3.3; locked ${actual ?? "missing"}`);
  }
}

if (!workflow.includes("npm audit --audit-level=high")) {
  fail("Review Gate must block high-severity dependency advisories");
}

if (failures.length) {
  console.error("Runtime/dependency hardening contract failures:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Runtime/dependency hardening contracts passed.");
