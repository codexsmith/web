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

const nextDeclared = packageJson.dependencies?.next;
if (!nextDeclared || !atLeast(nextDeclared, "16.3.3")) {
  fail("package.json must require Next.js 16.3.3 or newer");
}

const floors = [
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
