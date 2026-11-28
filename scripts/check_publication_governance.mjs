import fs from "node:fs";
import assert from "node:assert/strict";
import { institutionalPublicationEntries, curatedReaderRoutes, institutionalDiscoveryRoutes, supportingPublicationEntries, suspendedPublicationRoutes, suspendedPublicationDestination } from "../src/lib/site-publication.ts";

const read = (path) => fs.readFileSync(path, "utf8");
const expectedInstitutional = [
  "/",
  "/consequential-systems",
  "/ai-governance",
  "/constructive-human-agency",
  "/codexware",
  "/observatory",
  "/work-with-us",
  "/digital-native-institution",
  "/evidence-and-trust",
  "/contact"
];
const expectedSupporting = [
  "/work-with-us/professional-services",
  "/work-with-us/paper-auditing",
  "/work-with-us/public-service",
  "/work-with-us/funding",
  "/observatory/intellectual-lineage",
  "/observatory/research-architecture",
  "/observatory/computational-inquiry",
  "/observatory/demonstrations",
  "/codexware/economic-maintenance",
  "/codexware/civic-record",
  "/observatory/instruments"
];
const sorted = (items) => [...items].sort();
const compare = (actual, expected, message) => assert.deepEqual(sorted(actual), sorted(expected), message);
const paths = institutionalPublicationEntries.map(entry => entry.href);
assert.equal(paths.length, new Set(paths).size, "Publication routes must be unique");
for (const entry of institutionalPublicationEntries) {
  assert.ok(entry.label.trim() && entry.href.startsWith("/"), "Each editorial admission must name a canonical public route");
  assert.ok(["institutional", "supporting"].includes(entry.tier), "Unrecognized discovery tier");
  assert.ok(entry.purpose.trim().length > 20, "Every reader must have a specific editorial purpose: " + entry.href);
  if (entry.tier === "institutional") assert.ok(!("parent" in entry), "Institutional readers do not inherit identity from a supporting product");
}
compare(institutionalPublicationEntries.filter(entry => entry.tier === "institutional").map(entry => entry.href), expectedInstitutional, "Explicit institutional identity scope");
compare(institutionalPublicationEntries.filter(entry => entry.tier === "supporting").map(entry => entry.href), expectedSupporting, "Explicit supporting-reader scope");
const expectedOwners = {
  "/codexware/economic-maintenance": "/codexware",
  "/codexware/civic-record": "/codexware",
  "/observatory/intellectual-lineage": "/observatory",
  "/observatory/research-architecture": "/observatory",
  "/observatory/computational-inquiry": "/observatory",
  "/observatory/demonstrations": "/observatory",
  "/observatory/instruments": "/observatory",
  "/work-with-us/professional-services": "/work-with-us",
  "/work-with-us/paper-auditing": "/work-with-us",
  "/work-with-us/public-service": "/work-with-us",
  "/work-with-us/funding": "/work-with-us"
};
assert.deepEqual(Object.fromEntries(supportingPublicationEntries.map(entry => [entry.href, entry.parent])), expectedOwners, "Every supporting reader must have an explicitly approved institutional parent");
for (const entry of supportingPublicationEntries) {
  assert.ok(expectedInstitutional.includes(entry.parent) && entry.href.startsWith(entry.parent + "/"), "Supporting reader must belong to its canonical parent: " + entry.href);
}
assert.deepEqual(curatedReaderRoutes.map(entry => entry.href), paths, "Reader search must share the discovery policy");
assert.deepEqual(institutionalDiscoveryRoutes, paths, "Sitemap discovery must share the discovery policy");
const release = read("src/lib/site-release.ts");
const literalRoutes = (name) => {
  const block = release.match(new RegExp(name + "\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const"))?.[1];
  assert.ok(block, "Missing release route inventory " + name);
  return [...block.matchAll(/"([^"]+)"/g)].map(match => match[1]);
};
const inventory = [...literalRoutes("institutionalPublicRoutes"), ...literalRoutes("institutionalContentNodeRoutes")];
assert.equal(inventory.length, new Set(inventory).size, "Release route inventory must be unique");
for (const route of paths) assert.ok(inventory.includes(route), "Discovery cannot admit an unavailable route: " + route);
const reference = inventory.filter(route => !paths.includes(route));
assert.ok(reference.length > 0, "Reference availability is independent of discovery");
const registry = read("src/components/institutional/institutionalRoutes.ts");
const primary = registry.match(/export const institutionalRoutes = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
assert.deepEqual([...primary.matchAll(/href: "([^"]+)"/g)].map(match => match[1]), ["/codexware", "/observatory", "/work-with-us"], "Three public entry points");
const footer = registry.match(/export const institutionalFooterGroups = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
assert.ok(footer, "Missing institutional footer");
for (const [, route] of footer.matchAll(/href: "([^"]+)"/g)) assert.ok(expectedInstitutional.includes(route), "Non-institutional route in global footer: " + route);
assert.ok(registry.includes('export { curatedReaderRoutes } from "@/lib/site-publication"'), "Search registry must re-export editorial policy");
const sitemap = read("src/app/sitemap.ts");
assert.ok(sitemap.includes("institutionalDiscoveryRoutes") && !sitemap.includes("institutionalPublicRoutes"), "Sitemap must not promote full release inventory");
const config = read("next.config.ts");
assert.ok(config.includes("institutionalReferenceRoutes.map") && config.includes('key: "X-Robots-Tag", value: "noindex, follow"'), "Reference routes need a crawl-visible noindex response");
assert.ok(release.includes("!discoveryRouteSet.has(route)"), "Reference policy is the complement of discovery within admitted routes");
// Edition suspension is independent of the legacy catalog's continued existence.
assert.equal(new Set(suspendedPublicationRoutes).size, suspendedPublicationRoutes.length, "Suspended routes must be unique");
assert.ok(paths.includes(suspendedPublicationDestination), "Suspension redirects to an admitted reader");
for (const route of suspendedPublicationRoutes) {
  assert.ok(!inventory.includes(route) && !paths.includes(route), "Suspended route cannot enter the release inventory: " + route);
  const page = read("src/app" + route + "/page.tsx");
  assert.ok(page.includes("redirect(suspendedPublicationDestination)") && !/PaperMineView|paperMineSnapshot|@\/lib\/paper-mine/.test(page), "Suspended route must not import or render the old catalog");
}
assert.ok(config.includes("...suspendedPublicationRoutes.map") && config.includes("destination: suspendedPublicationDestination") && config.includes("permanent: false"), "The reserved route must use temporary compatibility redirection");
for (const file of [
  "src/lib/content.ts",
  "src/lib/content-registry.ts",
  "src/components/institutional/institutionalRoutes.ts",
  "src/components/institutional/InstitutionalResearchPage.tsx",
]) {
  assert.ok(!read(file).includes("/research/paper-mine"), "Suspended edition must not have a reader-facing route declaration: " + file);
}
console.log(`Publication governance passed: ${expectedInstitutional.length} institutional, ${expectedSupporting.length} supporting, ${reference.length} reference routes; ${inventory.length} available routes.`);
