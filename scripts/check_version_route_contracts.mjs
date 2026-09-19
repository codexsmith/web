import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const expect = (condition, message) => {
  if (!condition) throw new Error(`Version route contract failed: ${message}`);
};

const rootPage = read("src/app/page.tsx");
const v2Page = read("src/app/v2/page.tsx");
const v3Page = read("src/app/v3/page.tsx");
const previewAlias = read("src/app/institutional-preview/page.tsx");
const switcher = read("src/components/version-switch/DevProductSwitch.tsx");
const institutionalHome = read("src/components/institutional/InstitutionalHomePage.tsx");
const institutionalChrome = read("src/components/institutional/InstitutionalChrome.tsx");

expect(
  rootPage.includes("InstitutionalHomePage") &&
    rootPage.includes('canonical: "/"') &&
    !rootPage.includes("LabMachineHomeRoute"),
  "root must own the Product / institutional Website v3 home after cutover",
);
expect(
  v2Page.includes("LabMachineHomeRoute") &&
    v2Page.includes('canonical: "/v2"') &&
    v2Page.includes('<DevProductSwitch active="dev" floating />'),
  "/v2 must retain the Dev / Lab Machine surface and expose the version switch",
);
expect(
  v3Page.includes('permanentRedirect("/")'),
  "/v3 must remain a compatibility alias to the canonical root home",
);
expect(
  previewAlias.includes('permanentRedirect("/")'),
  "/institutional-preview must remain an alias redirect to the canonical root home",
);
expect(
  switcher.includes('href="/v2"') &&
    switcher.includes('href="/"') &&
    switcher.includes("Dev") &&
    switcher.includes("Product"),
  "the Dev / Product switch must link the Lab Machine and canonical institutional home",
);
expect(
  institutionalChrome.includes('href="/"') &&
    !institutionalChrome.includes('href="/v3" aria-label="Boundary First Labs Website v3 home"'),
  "institutional chrome home links must resolve to the canonical root",
);
expect(
  !institutionalHome.includes("DevProductSwitch") &&
    !institutionalHome.includes('href="/v2"') &&
    !institutionalChrome.includes('href="/v2"') &&
    !institutionalHome.includes("Enter the Lab") &&
    !institutionalChrome.includes("Enter the Lab"),
  "the institutional surface must keep /v2 available by route without publicly advertising the Lab engine",
);

console.log("Version route contracts passed.");
