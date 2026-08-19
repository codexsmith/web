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

// Projection vocabulary stays stable, but World is now the ordinary public surface.
requireMatch(
  "src/lib/view-projection.ts",
  /projectionModes\s*=\s*\["world",\s*"record",\s*"evidence",\s*"gestalt"\]/,
  "Projection vocabulary must remain World / Record / Evidence / Gestalt",
);
requireMatch(
  "src/lib/view-projection.ts",
  /defaultProjectionForNode[\s\S]*return\s+"world"/,
  "Every canonical content URL must default to the content-bearing World surface",
);
requireMatch(
  "src/lib/view-projection.ts",
  /Record, Evidence, and Gestalt deepen that state/,
  "Specialized projections must deepen the ordinary World rather than own basic content discovery",
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

// Ordinary World traversal must expose useful content/actions before specialized views are needed,
// while progressive disclosure keeps the initial pane legible instead of dumping every retained item.
requireExists(
  "src/components/subject-pane.tsx",
  "Content-first World must have a reusable subject overview pane",
);
requireExists(
  "src/app/content-first-world.css",
  "Content-first World layout/style layer must exist",
);
requireMatch(
  "src/components/world-view.tsx",
  /SubjectPane[\s\S]*!isRoot[\s\S]*SubjectPane/,
  "Branch and leaf World surfaces must expose the selected subject overview directly",
);
forbidMatch(
  "src/components/world-view.tsx",
  /world-heading__context/,
  "Body copy must live in the normal content pane rather than being squeezed into the World heading",
);
requireMatch(
  "src/components/subject-pane.tsx",
  /const immediateBody\s*=\s*body\[0\][\s\S]*const remainingBody\s*=\s*body\.slice\(1\)/,
  "World must expose one key context paragraph immediately and keep longer context inline-disclosable",
);
requireMatch(
  "src/components/subject-pane.tsx",
  /const primaryActions\s*=\s*orderedActions\.slice\(0,\s*4\)[\s\S]*const remainingActions\s*=\s*orderedActions\.slice\(4\)/,
  "World must expose a bounded set of immediate next actions instead of dumping every action",
);
requireMatch(
  "src/components/subject-pane.tsx",
  /relationActions\[0\][\s\S]*recordActions\[0\][\s\S]*inspectionActions\[0\]/,
  "Immediate World actions must remain diverse across traversal, retained records, and inspection when available",
);
requireMatch(
  "src/components/subject-pane.tsx",
  /At a glance[\s\S]*Continue from here[\s\S]*More context ·[\s\S]*More paths ·/,
  "Primary content/actions must be visible while secondary material remains one counted inline disclosure away",
);
requireMatch(
  "src/components/world-view.tsx",
  /Contained regions/,
  "Record projection must remain an exhaustive structural/document surface",
);
requireMatch(
  "src/components/world-view.tsx",
  /inspection\.summary/,
  "Record inspection affordances must expose substantive inspection summaries",
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
requireMatch(
  "src/app/content-first-world.css",
  /subject-pane[\s\S]*overflow-wrap:\s*anywhere[\s\S]*@media \(max-width: 980px\)/,
  "Inline subject content must preserve text and collapse lawfully under constrained widths",
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

// Active style cascade must include content-first World, threshold, and traversal semantics, but not retired ecology layers.
forbidMatch(
  "src/app/layout.tsx",
  /world-ecology\.css|focus-telemetry|state-ecology|state-surface-projection|landing-stability/,
  "Retired landing/telemetry/ecology layers must not remain in the active stylesheet cascade",
);
requireMatch(
  "src/app/layout.tsx",
  /root-world-and-content-stability\.css[\s\S]*hero-screen\.css[\s\S]*traversal-history\.css[\s\S]*content-first-world\.css/,
  "Root readability, hero threshold, traversal history, and content-first World layers must all be active",
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
