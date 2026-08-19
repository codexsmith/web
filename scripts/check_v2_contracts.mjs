import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
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

// One canonical home: root is World, every non-root canonical node defaults to Record.
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

// Root-world consolidation: the app may not revive the separate landing state machine.
forbidMatch(
  "src/components/world-app.tsx",
  /LandingSequence|landingProgress|introEnabled|skipLanding/,
  "Canonical WorldApp must not carry a second landing/home state machine",
);
requireMatch(
  "src/components/world-app.tsx",
  /router\.push\("\/",\s*\{\s*scroll:\s*false\s*\}\)/,
  "BF home must resolve to the canonical root URL",
);
forbidMatch(
  "src/components/world-app.tsx",
  /WorldEcology|gestaltId|initialGestaltId/,
  "Standard World traversal must not depend on the retired containment-Gestalt ecology",
);

// Navigation ownership: root structure lives in the Root World, not a duplicate top nav.
forbidMatch(
  "src/components/boundary-frame.tsx",
  /primary-nav|rootBranches/,
  "Boundary Frame must not duplicate root district navigation",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /path-node__role[\s\S]*Focus/,
  "Focus must be represented by the terminal Focus Path endpoint",
);
requireMatch(
  "src/components/boundary-frame.tsx",
  /peerNodes\s*=\s*siblings\.filter/,
  "Sibling traversal must be owned by the complete peer set",
);

// Record must expose the public body and structural children rather than hiding them in World.
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
requireMatch(
  "src/components/world-view.tsx",
  /Software for difficult systems\./,
  "Root World must carry the public home introduction",
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

// Dead architectural layers should not remain active through global CSS imports.
forbidMatch(
  "src/app/layout.tsx",
  /world-ecology\.css|focus-telemetry|state-ecology|state-surface-projection|landing-stability/,
  "Retired landing/telemetry/ecology layers must not remain in the active stylesheet cascade",
);
requireMatch(
  "src/app/layout.tsx",
  /root-world-and-content-stability\.css/,
  "Canonical root/readability stability layer must be active",
);

console.log("v2 architecture contracts: pass");
