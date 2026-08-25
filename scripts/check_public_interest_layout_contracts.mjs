import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const expect = (condition, message) => {
  if (!condition) throw new Error(`Public Interest layout contract failed: ${message}`);
};

const worldView = read("src/components/world-view.tsx");
const repair = read("src/app/p16-public-interest-layout-repair.css");
const layout = read("src/app/layout.tsx");

const publicInterestBlock = worldView.match(/function PublicInterestWorld[\s\S]*?function LeafWorld/)?.[0] ?? "";

expect(
  publicInterestBlock.includes('eyebrow={<p className="eyebrow">{node.eyebrow}</p>}') &&
    publicInterestBlock.includes('glance={<SubjectPane node={node} variant="glance" />}'),
  "Public Interest must keep the same shared WorldHero copy treatment as the other top-level sections.",
);
expect(
  !publicInterestBlock.includes('className="public-interest-hero__intro"') &&
    !publicInterestBlock.includes("titleAreaClassName="),
  "The retired bespoke Public Interest hero typography must not return.",
);
expect(
  /@media \(min-width: 761px\)[\s\S]*\.public-interest-page--overview[\s\S]*> \.world-hero[\s\S]*display: grid;[\s\S]*grid-template-columns:[\s\S]*padding:/.test(repair),
  "The nested shared WorldHero must receive its missing desktop grid and padding geometry.",
);

const p15 = layout.indexOf('import "./p15-product-catalog.css";');
const p16 = layout.indexOf('import "./p16-public-interest-layout-repair.css";');
expect(p15 >= 0 && p16 > p15, "The Public Interest repair layer must load after the current refinement stack.");

console.log("Public Interest layout contracts passed.");
