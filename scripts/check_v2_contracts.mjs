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

// Rich retained content is projected through bounded editorial layers instead of being wired raw into runtime.
for (const path of [
  "src/content/public-projections/home.json",
  "src/content/public-projections/work.json",
  "src/content/work_portfolio.json",
  "backlog/10_social_mission_preagent_ux/bfl_public_content_flat_dedup_v0_3.json",
  "backlog/10_social_mission_preagent_ux/03_The_Institute.md",
  "backlog/10_social_mission_preagent_ux/05_founders_note.md",
  "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md",
  "backlog/10_social_mission_preagent_ux/07_public_mission.md",
]) {
  requireExists(path, "Rich retained public-content source must remain available");
}
requireMatch(
  "src/lib/content-projections.ts",
  /hydrateProductNode[\s\S]*hydrateRootNode/,
  "Canonical content hydration must include bounded Product and Root content projections",
);
requireMatch(
  "src/lib/product-content.ts",
  /src\/content\/public-projections\/work\.json/,
  "Product fill must retain a visible source path to the curated work projection",
);
requireMatch(
  "src/lib/product-content.ts",
  /pipeline-retained-families[\s\S]*projectr-constructive-media-family[\s\S]*need-capacity-map-first-wedge/,
  "Product fill must preserve hidden product-family context without promoting every source entity into navigation",
);
forbidMatch(
  "src/lib/product-content.ts",
  /\bincomePotential\s*:/,
  "Opportunity hypotheses from the retained work corpus must not be silently promoted into the public product projection",
);
forbidMatch(
  "src/lib/product-content.ts",
  /\bstatus\s*:/,
  "Editorial product fill must not override canonical lifecycle status",
);
requireMatch(
  "src/lib/root-content.ts",
  /No consequence without representation[\s\S]*Bring us the system that almost works[\s\S]*How to read the Lab/,
  "Root content must expose mission, practical entry, and public-surface orientation from the curated home projection",
);
requireMatch(
  "src/lib/root-content.ts",
  /src\/content\/public-projections\/home\.json/,
  "Root fill must retain a visible source path to the curated home projection",
);
forbidMatch(
  "src/lib/root-content.ts",
  /Software for difficult systems\./,
  "Root content fill must not duplicate the hero proposition",
);

// Public institutional depth is append-only and must preserve its governance/engagement claim boundaries.
requireExists(
  "src/lib/public-depth-content.ts",
  "Public institutional depth projection must exist",
);
requireMatch(
  "src/lib/content-projections.ts",
  /hydratePublicDepthNode[\s\S]*hydratePublicInterestNode/,
  "Canonical content hydration must apply Public Depth after the primary Public Interest projection",
);
requireMatch(
  "src/lib/public-depth-content.ts",
  /What we ask of systems, we must ask of ourselves[\s\S]*No undeclared “we”[\s\S]*No product without stewardship/,
  "Public depth must preserve the institutional covenant rather than reducing governance to generic values",
);
requireMatch(
  "src/lib/public-depth-content.ts",
  /What is the smallest relationship that allows the work to encounter the strongest relevant reality/,
  "Public depth must preserve the bounded collaboration test",
);
requireMatch(
  "src/lib/public-depth-content.ts",
  /World class is what you give the world[\s\S]*Contribution standard, not prestige certification/,
  "Public depth must preserve contribution-over-prestige framing with its claim ceiling",
);
requireMatch(
  "src/lib/public-depth-content.ts",
  /founder -> work -> lab[\s\S]*Biography explains origin; it does not validate theory/,
  "Public depth must keep founder provenance separate from work substance and institutional stewardship",
);
forbidMatch(
  "src/lib/public-depth-content.ts",
  /\bstatus\s*:/,
  "Append-only public depth must not override canonical lifecycle status",
);
forbidMatch(
  "src/lib/public-depth-content.ts",
  /href:\s*"\/(help|governance|record\/challenge|start|learn)"/,
  "Public depth must not revive stale historical UX routes",
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
