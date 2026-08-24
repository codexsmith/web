import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireExists(path, message) {
  if (!fs.existsSync(path)) throw new Error(`${message} (${path})`);
}

function requireMatch(path, pattern, message) {
  if (!pattern.test(read(path))) throw new Error(`${message} (${path})`);
}

function forbidMatch(path, pattern, message) {
  if (pattern.test(read(path))) throw new Error(`${message} (${path})`);
}

requireExists(
  "src/app/p7-structural-path-navigation.css",
  "Structural-path navigation must have an explicit final refinement layer",
);

requireMatch(
  "src/app/layout.tsx",
  /p6-traversal-shelf-refinement\.css[\s\S]*p7-structural-path-navigation\.css/,
  "Structural-path navigation must load after the traversal-shelf compatibility layer",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /getAncestors[\s\S]*structuralPath\s*=\s*\[\.\.\.getAncestors\(focusNode\.id\),\s*focusNode\]/,
  "Top-frame location must be derived from canonical content ancestry rather than temporal history",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /className="frame-location-path"[\s\S]*aria-current="page"/,
  "The top frame must expose the canonical structural path and mark the current node",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /frame-location-path__node--parent[\s\S]*onClick=\{onUp\}/,
  "The immediate structural parent must remain actionable from the top path",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /aria-label="Back through traversal history"[\s\S]*aria-label="Forward through traversal history"/,
  "Temporal history must remain a distinct Back/Forward transport in the top frame",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /showLeftNav\s*=\s*!isRootFocus\s*&&\s*siblingNodes\.length\s*>\s*0/,
  "The left frame must be governed by local adjacency rather than history or containment",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /Local relational neighborhood for[\s\S]*<strong>Adjacent<\/strong>/,
  "The left frame must identify itself as the current node's local relational neighborhood",
);

forbidMatch(
  "src/components/boundary-frame.tsx",
  />Contained by</,
  "The retired duplicate Contained By control must not render",
);

forbidMatch(
  "src/components/boundary-frame.tsx",
  /Focus · You are here/,
  "The retired large left-rail current-focus card must not render",
);

requireMatch(
  "src/app/p7-structural-path-navigation.css",
  /\.frame-location-path[\s\S]*\.boundary-frame__neighborhood-nav/,
  "The final navigation layer must style both structural location and local neighborhood axes",
);

console.log("Navigation frame contracts passed.");
