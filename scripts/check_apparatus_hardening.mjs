import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireExists(path, message) {
  if (!fs.existsSync(path)) throw new Error(`${message} (${path})`);
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) throw new Error(`${message} (${path})`);
}

const hardening = "src/app/apparatus-prototype-hardening.css";
requireExists(hardening, "Apparatus prototype hardening layer must remain present");

requireMatch(
  "src/app/layout.tsx",
  /apparatus-prototype\.css[\s\S]*apparatus-prototype-hardening\.css/,
  "Apparatus hardening must load after the base prototype morphology",
);

requireMatch(
  hardening,
  /--apparatus-hit-target:\s*2\.75rem/,
  "Prototype must retain a 44px-class baseline hit target",
);
requireMatch(
  hardening,
  /@media \(max-width:\s*1100px\)[\s\S]*\.apparatus-prototype__workfield[\s\S]*overflow:\s*visible/,
  "Collapsed Apparatus topology must avoid nested workfield scrolling",
);
requireMatch(
  hardening,
  /@media \(max-width:\s*760px\)[\s\S]*\.apparatus-prototype__global-commands[\s\S]*grid-template-columns:\s*repeat\(2/,
  "Narrow Apparatus commands must reflow rather than compress",
);
requireMatch(
  hardening,
  /@media \(max-width:\s*760px\)[\s\S]*\.apparatus-relation-trace[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)[\s\S]*\.apparatus-relation-trace__line[\s\S]*display:\s*none/,
  "Narrow relation routing must become a typed linear transition instead of a miniature schematic",
);
requireMatch(
  hardening,
  /@media \(max-width:\s*430px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
  "Very narrow topology must collapse operator controls to one column",
);
requireMatch(
  hardening,
  /@media \(pointer:\s*coarse\)[\s\S]*min-height:\s*3rem/,
  "Coarse-pointer controls must preserve touch-size targets",
);
requireMatch(
  hardening,
  /@media \(forced-colors:\s*active\)[\s\S]*CanvasText[\s\S]*Highlight/,
  "Forced-colors mode must carry structure and focus without depending on the industrial palette",
);

requireMatch(
  "src/app/[[...slug]]/page.tsx",
  /uiShell\s*===\s*"apparatus"[\s\S]*robots:[\s\S]*index:\s*false[\s\S]*follow:\s*false/,
  "Apparatus prototype pages must remain noindex and nofollow",
);
requireMatch(
  "src/lib/ui-shell.ts",
  /cards:\s*"active"[\s\S]*apparatus:\s*"prototype"[\s\S]*candidate\s*===\s*"apparatus"\s*\?\s*"apparatus"\s*:\s*"cards"/,
  "Card must remain production-active while explicit apparatus queries enter prototype state",
);
requireMatch(
  "src/components/world-app.tsx",
  /uiShell\s*===\s*"apparatus"[\s\S]*ApparatusPrototypeFrame/,
  "Apparatus must render inside the shared World state machine rather than a second app",
);
requireMatch(
  "src/components/world-app.tsx",
  /const exitPrototype[\s\S]*router\.replace\(stateUrl\(focusId,\s*projection,\s*processScope,\s*"cards"\)/,
  "Returning to Card must replace renderer state without adding navigation history",
);

console.log("apparatus hardening contracts: pass");
