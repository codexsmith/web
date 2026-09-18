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
const institutionalHome = read("src/components/institutional/InstitutionalHomePreview.tsx");
const institutionalChrome = read("src/components/institutional/InstitutionalChrome.tsx");

expect(
  rootPage.includes("LabMachineHomeRoute") && !rootPage.includes("InstitutionalHomePreview"),
  "root must remain the existing Lab Machine compatibility surface until an explicit cutover",
);
expect(
  v2Page.includes("LabMachineHomeRoute") &&
    v2Page.includes('canonical: "/v2"') &&
    v2Page.includes('<DevProductSwitch active="dev" floating />'),
  "/v2 must own the Dev / Lab Machine surface and expose the version switch",
);
expect(
  v3Page.includes("InstitutionalHomePreview") &&
    v3Page.includes('canonical: "/v3"') &&
    !v3Page.includes("LabMachineHomeRoute"),
  "/v3 must own the Product / institutional surface without embedding the Lab Machine",
);
expect(
  previewAlias.includes('permanentRedirect("/v3")'),
  "/institutional-preview must remain an alias redirect to /v3",
);
expect(
  switcher.includes('href="/v2"') &&
    switcher.includes('href="/v3"') &&
    switcher.includes("Dev") &&
    switcher.includes("Product"),
  "the Dev / Product switch must link the two versioned surfaces explicitly",
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
