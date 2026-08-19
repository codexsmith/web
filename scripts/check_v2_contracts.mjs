import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireExists(path, message) {
  if (!fs.existsSync(path)) {
    throw new Error(`${message} (${path})`);
  }
}

function requireMatch(path, pattern, message) {
  const source = read(path);
  if (!pattern.test(source)) {
    throw new Error(`${message} (${path})`);
  }
}

function forbidMatch(path, pattern, message) {
  const source = read(path);
  if (pattern.test(source)) {
    throw new Error(`${message} (${path})`);
  }
}

// Projection vocabulary stays stable: Root defaults to World; non-root canonical nodes default to Record.
requireMatch(
  "src/lib/view-projection.ts",
  /projectionModes\s*=\s*\["world",\s*"record",\s*"evidence",\s*"gestalt"\]/,
  "Projection vocabulary must remain World / Record / Evidence / Gestalt",
);
requireMatch(
  "src/lib/view-projection.ts",
  /nodeId\s*===\s*"root"\s*\?\s*"world"\s*:\s*"record"/,
  "Root must default to World and non-root content to Record",
);

// Hero = threshold; Root World = structural operating world. The threshold must not become a second root map.
requireMatch(
  "src/components/hero-screen.tsx",
  /Software for difficult systems\.[\s\S]*Enter the lab/,
  "Hero must make the public proposition and expose an explicit entry action",
);
forbidMatch(
  "src/components/hero-screen.tsx",
  /district-grid|rootBranches|Enter region|onNavigate/,
  "Hero must not duplicate Root World structure or traversal controls",
);
requireMatch(
  "src/app/[[...slug]]/page.tsx",
  /initialHeroVisible\s*=\s*node\.id\s*===\s*"root"\s*&&\s*worldState\s*!==\s*"1"/,
  "Bare root URL must resolve to the entry threshold while ?world=1 resolves to the entered world",
);
requireMatch(
  "src/components/world-app.tsx",
  /focusId\s*===\s*"root"\)\s*params\.set\("world",\s*"1"\)/,
  "Entered Root World state must be reconstructible in the URL",
);
requireMatch(
  "src/components/world-app.tsx",
  /router\.replace\(stateUrl\("root",\s*"world",\s*"full"\)/,
  "Crossing the hero threshold must replace rather than pollute browser history",
);
forbidMatch(
  "src/components/world-app.tsx",
  /LandingSequence|landingProgress|introEnabled|skipLanding/,
  "Hero restoration must not revive the retired scroll-driven duplicate landing state machine",
);
forbidMatch(
  "src/components/world-view.tsx",
  /Software for difficult systems\./,
  "Root World must not repeat the hero proposition",
);
requireMatch(
  "src/components/world-view.tsx",
  /Root World · operating environment/,
  "Entered root must identify itself as the operating world",
);

// Focus Path = actual traversal history. Content structure belongs to World/Record/Peers, not the left rail.
forbidMatch(
  "src/components/world-app.tsx",
  /getAncestors|breadcrumbs/,
  "Focus Path must not be derived from content ancestry",
);
requireMatch(
  "src/components/world-app.tsx",
  /const \[traversalIds,\s*setTraversalIds\]\s*=\s*useState<string\[\]>/,
  "WorldApp must hold an explicit traversal sequence",
);
requireMatch(
  "src/components/world-app.tsx",
  /function appendTraversal\(/,
  "WorldApp must define traversal append semantics",
);
requireMatch(
  "src/components/world-app.tsx",
  /function rewindTraversal\(/,
  "WorldApp must define traversal rewind semantics",
);
requireMatch(
  "src/components/world-app.tsx",
  /setTraversalIds\(\(current\)\s*=>\s*appendTraversal\(current,\s*targetId\)\)/,
  "Graph traversal must append the actual target to the Focus Path",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /aria-label="Focus traversal history"/,
  "Left rail must identify itself semantically as traversal history",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /onTraversalPath\(node\.id,\s*index\)/,
  "Earlier Focus Path steps must be actionable traversal-history rewind points",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /path-node__role[\s\S]*Focus/,
  "Current Focus must remain the terminal traversal endpoint",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /peerNodes\s*=\s*siblings\.filter/,
  "Sibling traversal must remain owned by the peer rail rather than the Focus Path",
);

// Record must expose public body and structural children rather than hiding them in World.
requireMatch(
  "src/components/world-view.tsx",
  /Contained regions/,
  "Record projection must expose contained regions",
);
requireMatch(
  "src/components/world-view.tsx",
  /inspection\.summary/,
  "Record/World inspection affordances must expose substantive inspection summaries",
);

// Text preservation wins over decorative geometry under zoom / viewport compression.
requireMatch(
  "src/app/root-world-and-content-stability.css",
  /\.district-card\s*\{[\s\S]*overflow:\s*visible/,
  "District cards must be allowed to grow rather than clip content",
);
requireMatch(
  "src/app/root-world-and-content-stability.css",
  /-webkit-line-clamp:\s*unset/,
  "District summaries must not be permanently line-clamped",
);
requireMatch(
  "src/app/root-world-and-content-stability.css",
  /overflow-wrap:\s*anywhere/,
  "Long public text must have an explicit containment escape rule",
);

// Gestalt is process placement/filter, not ancestry or spatial containment zoom.
requireMatch(
  "src/lib/bfl-process.ts",
  /"intake"[\s\S]*"boundary"[\s\S]*"representation"[\s\S]*"hypothesis"[\s\S]*"construction"[\s\S]*"execution"[\s\S]*"validation"[\s\S]*"repair"[\s\S]*"promotion"/,
  "Boundary First process stages must remain explicit and ordered",
);
requireMatch(
  "src/components/gestalt-view.tsx",
  /Agentic · Lean Startup · Agile · Scientific · Computational · Constructive/,
  "Gestalt must expose the BFL operating synthesis",
);

// Active style cascade must include the threshold and traversal semantics, but not retired ecology layers.
forbidMatch(
  "src/app/layout.tsx",
  /world-ecology\.css|focus-telemetry|state-ecology|state-surface-projection|landing-stability/,
  "Retired landing/telemetry/ecology layers must not remain in the active stylesheet cascade",
);
requireMatch(
  "src/app/layout.tsx",
  /root-world-and-content-stability\.css[\s\S]*hero-screen\.css[\s\S]*traversal-history\.css/,
  "Root readability, hero threshold, and traversal-history layers must all be active",
);

// The retired archive must represent final v1, including the late journey-refinement branch merged into main.
for (const path of [
  "retired_v1/src/components/journey/EntranceIntentConsole.tsx",
  "retired_v1/src/components/journey/EvidenceClaimReader.tsx",
  "retired_v1/src/components/journey/MethodStackNavigator.tsx",
  "retired_v1/src/components/journey/ResearchJourneyRail.tsx",
  "retired_v1/src/components/journey/SoftwareProblemRouter.tsx",
  "retired_v1/tests/site-journey-refinement.test.ts",
]) {
  requireExists(path, "Final v1 journey refinement must remain preserved in retired_v1");
}
requireMatch(
  "retired_v1/src/components/entrance/InstitutionalVestibuleHome.tsx",
  /EntranceIntentConsole/,
  "Retired v1 homepage must include its final intent-console refinement",
);

console.log("v2 architecture contracts: pass");
