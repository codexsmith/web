import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) throw new Error(`${message} (${path})`);
}

function forbidMatch(path, pattern, message) {
  const source = read(path);
  if (pattern.test(source)) throw new Error(`${message} (${path})`);
}

const hero = "src/components/hero-screen.tsx";
const heroCss = "src/app/hero-screen.css";

requireMatch(
  hero,
  /Boundary First Labs[\s\S]*Software for difficult systems\.[\s\S]*wicked problems/,
  "Landing hierarchy must keep BFL identity, the difficult-systems proposition, and explicit wicked-problem framing",
);
requireMatch(
  hero,
  /hero-apparatus__port--top">Model<[\s\S]*hero-apparatus__port--left">Observe<[\s\S]*hero-apparatus__port--right">Act<[\s\S]*hero-apparatus__port--bottom">Evidence</,
  "Landing instrument must expose Model / Observe / Act / Evidence around the operating loop",
);
forbidMatch(
  hero,
  /hero-apparatus__label--outer/,
  "The circular landing instrument must not restore Boundary as an outer visible label",
);
requireMatch(
  heroCss,
  /\.hero-screen\s*\{[\s\S]*height:\s*100svh;[\s\S]*overflow:\s*hidden;/,
  "Desktop landing must fit one small viewport rather than create page-level Y overflow",
);
requireMatch(
  heroCss,
  /\.hero-screen h1\s*\{[\s\S]*font-size:\s*clamp\([^;]*8\.5svh[^;]*6\.25rem\)/,
  "Landing proposition typography must respond to viewport height instead of dominating short displays",
);
requireMatch(
  heroCss,
  /\.hero-apparatus\s*\{[\s\S]*width:\s*min\([^;]*48svh[^;]*400px\)/,
  "Landing instrument must be height-aware so it remains inside the desktop viewport",
);
requireMatch(
  heroCss,
  /@media \(max-width:\s*880px\)[\s\S]*\.hero-screen\s*\{[\s\S]*height:\s*auto;[\s\S]*min-height:\s*100svh;[\s\S]*overflow:\s*visible;/,
  "Constrained layouts must preserve content by returning to normal document flow",
);

console.log("landing review contracts: pass");
