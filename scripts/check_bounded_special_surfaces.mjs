import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const expect = (condition, message) => {
  if (!condition) {
    console.error(`Bounded special-surface contract failed: ${message}`);
    process.exit(1);
  }
};

const paperMineRoute = read("src/app/research/paper-mine/page.tsx");
const timelineRoute = read("src/app/about/provenance/timeline/page.tsx");
const instrumentShell = read("src/components/institutional/InstitutionalInstrumentShell.tsx");
const css = read("src/app/p9-bounded-special-surfaces.css");
const layout = read("src/app/layout.tsx");

expect(
  paperMineRoute.includes("InstitutionalInstrumentShell") &&
    paperMineRoute.includes('canonical: "/research/paper-mine"'),
  "Paper Mine must render inside the institutional instrument shell with its canonical route.",
);
expect(
  timelineRoute.includes("InstitutionalInstrumentShell") &&
    timelineRoute.includes("index: false"),
  "Founder timeline must render inside the institutional instrument shell and retain its noindex boundary.",
);
expect(
  instrumentShell.includes("<InstitutionalHeader") &&
    instrumentShell.includes("<InstitutionalFooter"),
  "Institutional instruments must retain the shared institutional header and footer.",
);
expect(
  instrumentShell.includes('href="#institutional-main"') &&
    instrumentShell.includes('id="institutional-main"'),
  "Institutional instruments must retain skip navigation and a stable main landmark.",
);
expect(
  css.includes('a[href="/research/paper-mine"]') && css.includes('a[href="/about/provenance/timeline"]'),
  "Paper Mine and founder timeline entry cards must both receive featured placement.",
);
expect(
  css.includes("display: contents") && css.includes("order: 1") && css.includes("order: 2"),
  "Featured destination groups must be promoted below the hero without moving supporting context above the region map.",
);

const p8 = layout.indexOf('import "./p8-type-scale-legibility.css";');
const p9 = layout.indexOf('import "./p9-bounded-special-surfaces.css";');
expect(p8 >= 0 && p9 > p8, "P9 bounded special-surface refinement must load after P8 type scale.");

console.log("Bounded special-surface contracts passed.");
