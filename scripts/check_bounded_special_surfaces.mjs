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
const wrapper = read("src/components/bounded-standalone-surface.tsx");
const css = read("src/app/p9-bounded-special-surfaces.css");
const layout = read("src/app/layout.tsx");

expect(
  paperMineRoute.includes("BoundedStandaloneSurface") && paperMineRoute.includes('parentNodeId="research"'),
  "Paper Mine must render inside the bounded standalone BFUX frame rooted in Research.",
);
expect(
  timelineRoute.includes("BoundedStandaloneSurface") && timelineRoute.includes('parentNodeId="provenance"'),
  "Founder timeline must render inside the bounded standalone BFUX frame rooted in Provenance.",
);
expect(
  wrapper.includes("<BoundaryFrame") && wrapper.includes("<SearchPanel"),
  "Standalone surfaces must carry the shared Boundary frame and global search instrument.",
);
expect(
  wrapper.includes("getAncestors(parentNode.id)") && wrapper.includes("traversalPath"),
  "Standalone surfaces must bootstrap a canonical trace into the special surface.",
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
