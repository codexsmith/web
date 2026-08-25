import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) throw new Error(`${message} (${path})`);
}

const refinement = "src/app/p11-hero-viewport-resilience.css";
const layout = "src/app/layout.tsx";

if (!fs.existsSync(refinement)) {
  throw new Error(`Hero viewport refinement is missing (${refinement})`);
}

requireMatch(
  layout,
  /p10-inspection-card-layer\.css[\s\S]*p11-hero-viewport-resilience\.css/,
  "Hero viewport resilience must load after the existing interface refinement layers",
);

requireMatch(
  refinement,
  /\.hero-screen::before\s*\{[\s\S]*var\(--bf-bg-base\)/,
  "Landing threshold must use one continuous bounded card surface",
);

requireMatch(
  refinement,
  /\.hero-screen__chassis\s*\{[\s\S]*background:\s*transparent;[\s\S]*box-shadow:\s*none;/,
  "Landing header must be an internal band rather than a second floating cap",
);

requireMatch(
  refinement,
  /@media \(min-width:\s*881px\) and \(max-height:\s*720px\)[\s\S]*grid-template-rows:\s*46px minmax\(0,\s*1fr\) 28px;[\s\S]*8\.6svh[\s\S]*39svh/,
  "Short desktop viewports must compact both proposition typography and the instrument",
);

requireMatch(
  refinement,
  /@media \(min-width:\s*881px\) and \(max-height:\s*560px\)[\s\S]*hero-screen__eyebrow[\s\S]*display:\s*none;[\s\S]*35svh/,
  "Very short zoomed viewports must remove redundant copy before clipping core content",
);

console.log("hero viewport resilience contracts: pass");
