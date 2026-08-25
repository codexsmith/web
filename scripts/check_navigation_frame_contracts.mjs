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
  "Top-frame traversal navigation must retain its final refinement layer",
);

requireExists(
  "src/lib/traversal-state.ts",
  "Traversal continuity must have explicit bootstrap primitives",
);

requireMatch(
  "src/lib/traversal-state.ts",
  /bootstrapTraversal[\s\S]*while \(cursor\.parentId\)[\s\S]*ids\.unshift\(cursor\.id\)/,
  "A deep canonical entry must bootstrap a usable ancestry-backed traversal trace",
);

requireMatch(
  "src/components/world-app.tsx",
  /initialTraversal\s*=\s*bootstrapTraversal\(initialNodeId\)[\s\S]*useState<string\[\]>\(initialTraversal\.ids\)[\s\S]*useState\(initialTraversal\.cursor\)/,
  "Deep routes must expose a usable Back path on the first rendered frame",
);

requireMatch(
  "src/components/world-app.tsx",
  /else if \(remembered\.ids\[remembered\.cursor\] === initialNodeId\)[\s\S]*branchTraversal\(remembered\.ids, remembered\.cursor, initialNodeId\)/,
  "A newly loaded route must append to remembered traversal unless it is already the active state",
);

requireMatch(
  "src/components/world-app.tsx",
  /navigateHome[\s\S]*branchTraversal\(traversalIds, traversalCursor, "root"\)[\s\S]*setTraversalIds\(nextTraversal\.ids\)[\s\S]*setTraversalCursor\(nextTraversal\.cursor\)/,
  "Home/root navigation must append to traversal rather than reset it",
);

forbidMatch(
  "src/components/world-app.tsx",
  /return\s+path\.lastIndexOf\(targetId\)/,
  "Revisiting a previously seen root or node must not rewind to an unrelated historical occurrence",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /activeTrace[\s\S]*index <= traversalCursor[\s\S]*aria-label="Focus traversal history"/,
  "The top frame must show the active traversal trace through the current cursor",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /onTraversalPath\(node\.id, index\)/,
  "Visible prior trace nodes must remain replayable",
);

requireMatch(
  "src/components/boundary-frame.tsx",
  /aria-label="Back through traversal history"[\s\S]*aria-label="Forward through traversal history"/,
  "Back and Forward must remain temporal cursor controls",
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

requireMatch(
  "src/app/p7-structural-path-navigation.css",
  /\.frame-trace-path[\s\S]*\.boundary-frame__neighborhood-nav/,
  "The final navigation layer must style both traversal continuity and local neighborhood axes",
);

console.log("Navigation frame contracts passed.");
