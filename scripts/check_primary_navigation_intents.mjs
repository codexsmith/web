import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const navigation = read("src/lib/site-navigation.ts");
const routes = read("src/components/institutional/institutionalRoutes.ts");
const chrome = read("src/components/institutional/InstitutionalChrome.tsx");
const publicInventory = read("src/lib/site-release.ts");
const observatoryPage = read("src/components/institutional/InstitutionalObservatoryPage.tsx");
const observatoryContent = read("src/components/institutional/content/observatory.ts");
const collaboration = read("src/components/institutional/InstitutionalCollaborationPage.tsx");

const list = navigation.match(
  /export const PRIMARY_NAV_ITEMS:\s*SiteNavigationItem\[\]\s*=\s*\[([\s\S]*?)\];/,
)?.[1];
const entries = list
  ? [...list.matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"\s*\}/g)].map(
      ([, label, href]) => ({ label, href }),
    )
  : [];
const expected = [
  { label: "Products", href: "/products" },
  { label: "Observatory", href: "/observatory" },
  { label: "Work With Us", href: "/collaboration" },
];
expect(
  JSON.stringify(entries) === JSON.stringify(expected),
  "Site-wide primary navigation must have exactly the three distinct use/inspect/engage doors",
);
expect(
  routes.includes("institutionalRoutes = PRIMARY_NAV_ITEMS"),
  "Institutional chrome must reuse site-wide nav rather than declaring a second menu",
);
expect(
  chrome.includes("isNavigationItemActive(pathname, route.href)"),
  "Institutional active-route ownership must delegate to the same shared resolver",
);
expect(
  navigation.includes("primaryNavigationOwner(pathname) === destinationPath(href)"),
  "One unique primary owner must determine all active-state highlights",
);
expect(
  chrome.includes('pathname === route.href ? "page" : "location"'),
  "Deep-route nav must distinguish exact page from selected location",
);

for (const entry of expected) {
  expect(
    publicInventory.includes('"' + entry.href + '"'),
    "Primary destination must be in public Website v3 route inventory: " + entry.href,
  );
}

const groups = [...navigation.matchAll(
  /^\s*"(\/(?:products|observatory|collaboration))":\s*\[([\s\S]*?)^\s*\],/gm,
)];
expect(groups.length === 3, "Every primary door must own one explicit route group");
const seen = new Map();
for (const [, owner, body] of groups) {
  for (const [, prefix] of body.matchAll(/"(\/[^"]+)"/g)) {
    const previous = seen.get(prefix);
    expect(!previous, "Route prefix " + prefix + " appears in both " + previous + " and " + owner);
    seen.set(prefix, owner);
  }
}
for (const [prefix, owner] of [
  ["/research", "/observatory"],
  ["/publications", "/observatory"],
  ["/projects", "/observatory"],
  ["/apparatus", "/observatory"],
  ["/applied-work", "/collaboration"],
  ["/open-lab", "/collaboration"],
  ["/funding", "/collaboration"],
]) {
  expect(seen.get(prefix) === owner, prefix + " must have exactly one intended nav owner");
}

expect(
  routes.includes("institutionalChildPages.research") &&
    observatoryContent.indexOf('id: "research"') < observatoryContent.indexOf('id: "maps"'),
  "Observatory must make research the first primary inspection lens",
);
expect(
  observatoryPage.indexOf("styles.lensSection") < observatoryPage.indexOf("styles.roleSection"),
  "Observatory must offer inspection routes before machine architecture exposition",
);
for (const needle of ['href="/applied-work"', 'href="/open-lab"', 'href="/funding"', "Research Partnership"]) {
  expect(collaboration.includes(needle), "Work With Us must offer this actionable route: " + needle);
}
expect(
  collaboration.includes("styles.engagementHeroNav"),
  "Engagement choices must be visible in the first hero, not buried below the institution's background",
);

for (const [path, forbidden] of [
  ["src/components/institutional/sections/PublicationCatalogSection.tsx", "href={source.href}"],
  ["src/components/institutional/sections/PublicationCards.tsx", "href={publication.sourceHref}"],
  ["src/components/institutional/InstitutionalApparatusPage.tsx", "href={machineryProjection.sourceHref}"],
]) {
  const source = read(path);
  expect(!source.includes(forbidden), path + " must not publicly link to a private Lab repository");
  expect(source.includes("privateSourceNote"), path + " must label its public/private evidence boundary");
}

if (failures.length) {
  console.error("Primary visitor-intent navigation contracts failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Primary visitor-intent navigation contracts passed.");
