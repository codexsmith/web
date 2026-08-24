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

// World owns narrative content; Evidence and Process remain genuinely different depths.
requireMatch(
  "src/lib/view-projection.ts",
  /projectionModes\s*=\s*\["world",\s*"evidence",\s*"gestalt"\]/,
  "Projection vocabulary must remain World / Evidence / Process",
);
requireMatch(
  "src/lib/view-projection.ts",
  /defaultProjectionForNode[\s\S]*return\s+"world"/,
  "Every canonical content URL must default to the content-bearing World surface",
);
requireMatch(
  "src/lib/view-projection.ts",
  /Evidence and Process deepen that state without[\s\S]*repeating its narrative content/,
  "Specialized projections must add a distinct representation rather than repeat World content",
);
requireMatch(
  "src/app/[[...slug]]/page.tsx",
  /legacyRecordDestination[\s\S]*permanentRedirect\(recordDestination\)/,
  "Legacy Record URLs must resolve to their canonical World or Provenance destination",
);

// Hero = threshold; entered root = structural world. The threshold must not become a second root map.
requireMatch(
  "src/components/hero-screen.tsx",
  /Software for difficult systems\.[\s\S]*Enter the lab/,
  "Hero must make the public proposition and expose an explicit entry action",
);
forbidMatch(
  "src/components/hero-screen.tsx",
  /district-grid|rootBranches|Enter region|onNavigate/,
  "Hero must not duplicate entered-world structure or traversal controls",
);
requireMatch(
  "src/app/[[...slug]]/page.tsx",
  /initialHeroVisible\s*=\s*node\.id\s*===\s*"root"\s*&&\s*worldState\s*!==\s*"1"/,
  "Bare root URL must resolve to the entry threshold while ?world=1 resolves to the entered world",
);
requireMatch(
  "src/components/world-app.tsx",
  /focusId\s*===\s*"root"\)\s*params\.set\("world",\s*"1"\)/,
  "Entered root state must be reconstructible in the URL",
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
  "Entered root must not repeat the hero proposition",
);
forbidMatch(
  "src/components/world-view.tsx",
  /Root World · operating environment/,
  "Entered root must not carry redundant Root World / operating-environment labeling",
);
requireMatch(
  "src/components/world-view.tsx",
  /!isRoot\s*\?\s*<p className="eyebrow">\{node\.eyebrow\}<\/p>\s*:\s*null/,
  "Entered root must use the institution name directly rather than a redundant root eyebrow",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /aria-label="Boundary First Labs home"/,
  "Frame identity must name the Lab without redundant Root World copy",
);
forbidMatch(
  "src/components/boundary-frame.tsx",
  /Root world/i,
  "Frame chrome must not repeat Root World labeling",
);

// Focus Path = actual traversal history. Temporal replay uses a cursor; new traversal
// branches from the active cursor and must discard abandoned forward history.
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
  /function branchTraversal\(path:\s*string\[\],\s*cursor:\s*number,\s*targetId:\s*string\)/,
  "WorldApp must define cursor-aware traversal branching",
);
requireMatch(
  "src/components/world-app.tsx",
  /activePath\s*=\s*normalizedCursor\s*>=\s*0\s*\?\s*path\.slice\(0,\s*normalizedCursor\s*\+\s*1\)\s*:\s*\[\]/,
  "New traversal from rewound history must truncate the abandoned forward path",
);
requireMatch(
  "src/components/world-app.tsx",
  /const ids\s*=\s*\[\.\.\.activePath,\s*targetId\][\s\S]*cursor:\s*ids\.length\s*-\s*1/,
  "A new graph traversal must append the actual target to the active traversal branch",
);
requireMatch(
  "src/components/world-app.tsx",
  /const nextTraversal\s*=\s*branchTraversal\(traversalIds,\s*traversalCursor,\s*targetId\)[\s\S]*setTraversalIds\(nextTraversal\.ids\)[\s\S]*setTraversalCursor\(nextTraversal\.cursor\)/,
  "Graph traversal must commit both the branched sequence and its active cursor",
);
requireMatch(
  "src/components/world-app.tsx",
  /function resolveExistingTraversalCursor[\s\S]*path\.lastIndexOf\(targetId\)/,
  "Browser and remembered traversal must resolve an existing temporal cursor before branching",
);
requireMatch(
  "src/components/world-app.tsx",
  /const moveTraversalCursor\s*=\s*useCallback[\s\S]*setTraversalCursor\(nextCursor\)/,
  "Back, Forward, and history replay must move the cursor without appending traversal state",
);
requireMatch(
  "src/components/world-app.tsx",
  /moveTraversalCursor\(traversalCursor\s*-\s*1\)[\s\S]*moveTraversalCursor\(traversalCursor\s*\+\s*1\)/,
  "Back and Forward must be temporal cursor operations",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /aria-label="Focus traversal history"/,
  "Left rail must identify itself semantically as traversal history",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /onTraversalPath\(node\.id,\s*index\)/,
  "Earlier Focus Path steps must be actionable traversal-history replay points",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /path-node__role[\s\S]*Focus/,
  "Current Focus must remain the terminal traversal endpoint",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /siblingNodes\s*=\s*siblings\.filter/,
  "Sibling traversal must remain owned by adjacency rather than the Focus Path",
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
  /function SupportingContext[\s\S]*Related paths[\s\S]*Explore further/,
  "World must retain useful related paths and deeper inspection content inline",
);
requireMatch(
  "src/components/world-view.tsx",
  /id="public-interest-context"[\s\S]*<SupportingContext/,
  "Public Interest must retain supporting content after Record retirement",
);
forbidMatch(
  "src/components/world-view.tsx",
  /RecordView|FounderRecord|NodeDetail/,
  "Retired Record rendering must not remain as a duplicate content surface",
);

// Top-level sections share one presentation grammar. Public Interest may compose a
// specialized feature section, but it must not fork the hero, region-card, or context system.
requireExists(
  "src/app/section-hero-organization.css",
  "Top-level section organization styles must remain explicit",
);
requireMatch(
  "src/components/world-view.tsx",
  /function WorldHero[\s\S]*function RegionGrid[\s\S]*function PublicInterestWorld[\s\S]*<WorldHero[\s\S]*<RegionGrid[\s\S]*function SupportingContext[\s\S]*function BranchWorld/,
  "Top-level sections must compose the shared WorldHero, RegionGrid, and SupportingContext primitives",
);
requireMatch(
  "src/components/world-view.tsx",
  /const isTopLevelSection\s*=\s*node\.parentId\s*===\s*"root"[\s\S]*!isTopLevelSection\s*\?\s*<p>\{child\.summary\}<\/p>\s*:\s*null/,
  "Top-level region cards must stay concise while deeper region cards retain useful descriptions",
);
requireMatch(
  "src/components/world-view.tsx",
  /district-card__action[\s\S]*View/,
  "Region cards must use direct View wording",
);
forbidMatch(
  "src/components/world-view.tsx",
  /Enter region/,
  "The retired Enter region wording must not return",
);
requireMatch(
  "src/app/section-hero-organization.css",
  /public-interest-page--overview[\s\S]*grid-template-columns[\s\S]*data-world-id="research"[\s\S]*grid-template-columns/,
  "Dense Public Interest and Research heroes must retain their wider content columns",
);
requireMatch(
  "src/app/layout.tsx",
  /section-hero-organization\.css[\s\S]*evidence-projection-refinement\.css/,
  "Section and Evidence refinements must remain active after the shared layout layers",
);

// Evidence is a claim-and-source representation at object depth and a standing summary at branch depth.
requireExists(
  "src/lib/evidence-content.ts",
  "Evidence packages and generated evidence profiles must remain explicit",
);
requireExists(
  "src/app/evidence-projection-refinement.css",
  "Evidence projection layout must remain explicit",
);
requireMatch(
  "src/components/evidence-view.tsx",
  /function ObjectEvidenceView[\s\S]*ClaimSection[\s\S]*SourceSection[\s\S]*LimitsSection[\s\S]*HistorySection/,
  "Object Evidence must bind claims to sources, limits, and admitted changes",
);
requireMatch(
  "src/components/evidence-view.tsx",
  /function BranchEvidenceView[\s\S]*Current portfolio distribution[\s\S]*Evidence-bearing work[\s\S]*Promotion gates[\s\S]*Admitted changes/,
  "Branch Evidence must summarize standing, evidence-bearing work, gates, and changes",
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
  "District cards must be allowed to grow rather than clip content in general World layouts",
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
requireExists(
  "src/app/card-world-viewport-fit.css",
  "Card World viewport-budget refinement must remain active",
);
requireMatch(
  "src/app/card-world-viewport-fit.css",
  /--frame-top:\s*52px[\s\S]*--frame-bottom:\s*52px[\s\S]*world-viewport[\s\S]*padding:\s*clamp\(8px/,
  "Card World must keep its compact frame budget and a low-padding working viewport",
);
requireMatch(
  "src/app/card-world-viewport-fit.css",
  /data-gestalt-id="root"[\s\S]*district-grid[\s\S]*height:\s*100%[\s\S]*district-card[\s\S]*height:\s*100%/,
  "Entered root must spend the available viewport before introducing scroll",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /boundary-frame__top[\s\S]*frame-home-tray[\s\S]*onBack[\s\S]*onForward[\s\S]*frame-tools[\s\S]*projection-switcher/,
  "Temporal replay and projection controls must remain explicit but relationally distinct in the top frame housing",
);
forbidMatch(
  "src/components/boundary-frame.tsx",
  /<footer[^>]*boundary-frame__bottom/,
  "The retired bottom control rail must not return as a second global coordinate system",
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

// Active style cascade must include content-first World, threshold, traversal semantics, and viewport-fit layer, but not retired ecology layers.
forbidMatch(
  "src/app/layout.tsx",
  /world-ecology\.css|focus-telemetry|state-ecology|state-surface-projection|landing-stability/,
  "Retired landing/telemetry/ecology layers must not remain in the active stylesheet cascade",
);
requireMatch(
  "src/app/layout.tsx",
  /root-world-and-content-stability\.css[\s\S]*hero-screen\.css[\s\S]*traversal-history\.css[\s\S]*content-first-world\.css[\s\S]*industrial-card-ui\.css[\s\S]*card-world-viewport-fit\.css/,
  "Root readability, hero threshold, traversal history, content-first World, and Card viewport-fit layers must all be active",
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
