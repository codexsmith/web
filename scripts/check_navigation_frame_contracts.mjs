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
  "src/app/p12-content-density-refinement.css",
  "Final navigation and content-density refinement must exist",
);

requireExists(
  "src/app/p13-root-busy-board.css",
  "Root World tactile instrument refinement must exist",
);

requireExists(
  "src/app/p14-root-instrumentation.css",
  "Root World functional instrumentation refinement must exist",
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
  /navigateHome[\s\S]*router\.push\("\/world"\)/,
  "The institutional home control must return to the Lab Machine",
);

requireMatch(
  "src/components/world-app.tsx",
  /navigateUp[\s\S]*getParent\(focusId\)[\s\S]*navigate\(nextParent\.id, "up"\)/,
  "Hierarchy navigation must remain separate from the institutional home control",
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

requireMatch(
  "src/app/layout.tsx",
  /p11-hero-viewport-resilience\.css";\s*\nimport "\.\/p12-content-density-refinement\.css";\s*\nimport "\.\/p13-root-busy-board\.css";\s*\nimport "\.\/p14-root-instrumentation\.css";/,
  "The root instrumentation refinement must load after the prior UI refinement layers",
);

requireMatch(
  "src/app/p12-content-density-refinement.css",
  /\.frame-trace-path__node--current \.path-node__role\s*\{[\s\S]*display:\s*none;/,
  "The current trace chip must present the node label without a redundant location narration",
);

requireMatch(
  "src/app/p12-content-density-refinement.css",
  /\.branch-world\[data-world-id="research"\] \.branch-world__context-body\s*\{[\s\S]*display:\s*none;/,
  "The Research branch must omit the redundant secondary routing paragraph from the public surface",
);

requireMatch(
  "src/app/p12-content-density-refinement.css",
  /\.branch-world__context-group\[aria-label="Explore further"\][\s\S]*\.subject-pane__action-copy > small\s*\{[\s\S]*display:\s*none;/,
  "Explore further cards must not repeat the description shown after opening the inspection",
);

requireMatch(
  "src/app/p13-root-busy-board.css",
  /\.district-card__number[\s\S]*display:\s*none\s*!important;/,
  "Root World cards must not restore numbered register chips",
);

requireMatch(
  "src/app/p13-root-busy-board.css",
  /\.district-card__kind::before[\s\S]*radial-gradient[\s\S]*\.district-card__kind::after/,
  "Root World cards must carry one tactile switch/light assembly without introducing nested controls",
);

requireMatch(
  "src/app/p13-root-busy-board.css",
  /\.district-card:hover[\s\S]*\.district-card__kind::after[\s\S]*translateX\(38px\)[\s\S]*\.district-card:active[\s\S]*scale\(0\.985\)/,
  "The tactile root control must respond to hover/focus and press states",
);

requireMatch(
  "src/app/p13-root-busy-board.css",
  /\.section-region-card__glyph[\s\S]*border:[\s\S]*radial-gradient[\s\S]*box-shadow/,
  "Root World semantic icons must retain a shallow colored physical housing",
);

requireMatch(
  "src/app/p13-root-busy-board.css",
  /@media \(prefers-reduced-motion: reduce\)[\s\S]*transition:\s*none;/,
  "Busy-board interaction must respect reduced-motion preferences",
);

requireMatch(
  "src/app/p14-root-instrumentation.css",
  /\.district-card > p\s*\{[\s\S]*display:\s*none;/,
  "Root World cards must keep descriptive prose in source without rendering it on the door surface",
);

requireMatch(
  "src/app/p14-root-instrumentation.css",
  /\.district-card__kind\s*\{[\s\S]*position:\s*static\s*!important[\s\S]*padding-right:[\s\S]*\.section-region-card__glyph\s*\{[\s\S]*position:\s*absolute[\s\S]*right:/,
  "Root World eyebrow copy must align to the text edge while the enlarged semantic icon occupies the right side",
);

requireMatch(
  "src/app/p14-root-instrumentation.css",
  /\.district-card__kind::before\s*\{[\s\S]*bottom:\s*var\(--root-busy-bottom\)[\s\S]*\.district-card__action::after\s*\{[\s\S]*content:\s*var\(--root-axis-label\)/,
  "The tactile switch must replace the old lower-right arrow and leave only a compact axis register in the action rail",
);

requireMatch(
  "src/app/p14-root-instrumentation.css",
  /data-node-id="public-interest"[\s\S]*--root-axis-label:\s*"WHO"[\s\S]*data-node-id="products"[\s\S]*--root-axis-label:\s*"WHAT"[\s\S]*data-node-id="publications"[\s\S]*--root-axis-label:\s*"WHERE"[\s\S]*data-node-id="about"[\s\S]*--root-axis-label:\s*"WHY"[\s\S]*data-node-id="research"[\s\S]*--root-axis-label:\s*"HOW"/,
  "The five root instruments must preserve the who/what/where/why/how semantic guide",
);

requireMatch(
  "src/app/p14-root-instrumentation.css",
  /\.district-card::after\s*\{[\s\S]*background:\s*var\(--root-instrument-motif\)[\s\S]*pointer-events:\s*none/,
  "Root World doors must carry quiet non-interactive internal diagram motifs",
);

console.log("Navigation frame contracts passed.");
