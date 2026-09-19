import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function routeFromPage(file) {
  const rel = path
    .relative(path.join(root, "src/app"), file)
    .replaceAll(path.sep, "/");
  const withoutPage = rel.replace(/\/page\.tsx$/, "");
  return withoutPage ? "/" + withoutPage : "/";
}

function canonicalRouteFromPage(file) {
  const route = file === rootPageFile ? "/" : canonicalRouteFromPage(file);
  if (route === "/v3") return "/";
  return route.startsWith("/v3/") ? route.slice(3) : route;
}

const v3PageFiles = walk(path.join(root, "src/app/v3"))
  .filter((file) => file.endsWith(path.sep + "page.tsx"))
  .filter((file) => !file.includes("["))
  .filter((file) => routeFromPage(file) !== "/v3");
const rootPageFile = path.join(root, "src/app/page.tsx");
const publicPageFiles = [rootPageFile, ...v3PageFiles];

const routeSet = new Set(["/", ...v3PageFiles.map(canonicalRouteFromPage)]);
const routeInventory = read("src/lib/site-release.ts");
const routeBlock = routeInventory.match(
  /institutionalPublicRoutes\s*=\s*\[([\s\S]*?)\]\s*as const/,
)?.[1];
const inventoryRoutes = new Set(
  routeBlock ? [...routeBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]) : [],
);

for (const route of [...routeSet].sort()) {
  if (!inventoryRoutes.has(route)) {
    fail("v3 route missing from institutional public inventory: " + route);
  }
}

for (const route of [...inventoryRoutes].sort()) {
  if (!routeSet.has(route)) {
    fail("institutional public inventory points to missing route: " + route);
  }
}

for (const file of publicPageFiles) {
  const route = routeFromPage(file);
  const source = fs.readFileSync(file, "utf8");

  if (!/export const metadata\s*:\s*Metadata\s*=/.test(source)) {
    fail(route + " must export typed Metadata");
  }

  const hasCanonical =
    source.includes('canonical: "' + route + '"') ||
    source.includes("canonical: '" + route + "'");

  if (!hasCanonical) {
    fail(route + " must declare its own canonical URL");
  }

  if (route !== "/" && /robots\s*:\s*\{[\s\S]*?index\s*:\s*false/.test(source)) {
    fail(
      route +
        " hard-codes noindex; v3 child-route indexing must be controlled by src/app/v3/layout.tsx",
    );
  }
}

const v3Alias = read("src/app/v3/page.tsx");
if (!v3Alias.includes('permanentRedirect("/")')) {
  fail("/v3 must redirect to the canonical institutional root");
}

const scanFiles = [
  ...walk(path.join(root, "src/components/institutional")).filter((file) =>
    /\.(?:ts|tsx)$/.test(file),
  ),
  ...walk(path.join(root, "src/app/v3")).filter((file) =>
    /\.(?:ts|tsx)$/.test(file),
  ),
];

const staticHrefPatterns = [
  /href\s*=\s*["'](\/v3(?:\/[^"'?#]*)?(?:\?[^"'#]*)?(?:#[^"']*)?)["']/g,
  /href\s*:\s*["'](\/v3(?:\/[^"'?#]*)?(?:\?[^"'#]*)?(?:#[^"']*)?)["']/g,
];

for (const file of scanFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of staticHrefPatterns) {
    for (const match of source.matchAll(pattern)) {
      const target =
        match[1].split(/[?#]/, 1)[0].replace(/\/$/, "") || "/v3";
      if (!routeSet.has(target)) {
        fail(
          "broken institutional link " +
            target +
            " in " +
            path.relative(root, file).replaceAll(path.sep, "/"),
        );
      }
    }
  }
}

const v3Layout = read("src/app/v3/layout.tsx");
if (!v3Layout.includes("institutionalIndexingEnabled")) {
  fail("v3 layout must own the centralized indexing release gate");
}

const robots = read("src/app/robots.ts");
if (
  !robots.includes('disallow.push("/v3/")') ||
  !robots.includes("institutionalPublicRoutes.filter")
) {
  fail("robots.ts must keep legacy and canonical institutional child routes closed while the release gate is false");
}

const sitemap = read("src/app/sitemap.ts");
if (!sitemap.includes("institutionalPublicRoutes")) {
  fail("sitemap.ts must consume the institutional public route inventory");
}

const shell = read(
  "src/components/institutional/InstitutionalPageShell.tsx",
);
if (
  !shell.includes('href="#institutional-main"') ||
  !shell.includes('id="institutional-main"')
) {
  fail("institutional shell must provide skip navigation to a stable main landmark");
}

const nextConfig = read("next.config.ts");
if (
  !nextConfig.includes("institutionalPublicRoutes") ||
  !nextConfig.includes("async redirects()") ||
  !nextConfig.includes("async rewrites()")
) {
  fail("next.config.ts must own canonical institutional rewrites plus /v3 compatibility redirects");
}
for (const header of [
  "X-Content-Type-Options",
  "Referrer-Policy",
  "X-Frame-Options",
  "Permissions-Policy",
]) {
  if (!nextConfig.includes(header)) {
    fail("next.config.ts missing launch security header: " + header);
  }
}

if (!fs.existsSync(path.join(root, "src/app/v3/not-found.tsx"))) {
  fail("v3 must provide a not-found recovery surface");
}

if (!fs.existsSync(path.join(root, "src/app/v3/error.tsx"))) {
  fail("v3 must provide a route error recovery surface");
}

if (failures.length) {
  console.error("Website v3 launch hardening contract failures:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log(
  "Website v3 launch hardening contracts passed for " +
    routeSet.size +
    " public routes.",
);
