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

for (const path of [
  "src/lib/record-detail-routing.ts",
  "src/components/record-detail-surface.tsx",
  "src/app/p4-detail-surfaces.css",
  "src/app/p10-inspection-card-layer.css",
  "docs/third-layer-detail-surface-contract.md",
]) {
  if (!fs.existsSync(path)) throw new Error(`P4 detail-surface artifact is missing (${path})`);
}

requireMatch(
  "src/components/inspection-panel.tsx",
  /world-viewport inspection-card-layer/,
  "Inspection must stay inside the bounded content viewport as an attached layer",
);
requireMatch(
  "src/components/inspection-panel.tsx",
  /inspection-workbench inspection-card/,
  "Inspection must render as a bounded card rather than replacing the whole content surface",
);
requireMatch(
  "src/components/inspection-panel.tsx",
  /inspection-surface__close--icon[\s\S]*inspection-surface__close--footer/,
  "Inspection must expose clear close controls at both the top and bottom of the card",
);
forbidMatch(
  "src/components/inspection-panel.tsx",
  /aria-modal|inspection-layer__backdrop|role="dialog"|useRouter|router\.(?:push|replace)/,
  "Inspection must remain non-modal and must not become its own route",
);
requireMatch(
  "src/app/p10-inspection-card-layer.css",
  /\.inspection-card-layer[\s\S]*pointer-events:\s*none[\s\S]*\.inspection-card[\s\S]*pointer-events:\s*auto/,
  "Inspection card layer must preserve the surrounding World while keeping the card interactive",
);
requireMatch(
  "src/components/subject-pane.tsx",
  /getRecordDetailHrefForLink\(node, record\.href\) \?\? record\.href/,
  "Owned retained-record actions must prefer canonical in-frame detail routes",
);
requireMatch(
  "src/lib/record-detail-routing.ts",
  /publicationOwnsLanding[\s\S]*publicationOwners\.length === 1[\s\S]*node\.id === entry\.id[\s\S]*linkedOwners\.length === 1/,
  "Canonical retained-record ownership must prefer provenance, then identity, then one unique explicit link",
);
requireMatch(
  "src/lib/record-detail-routing.ts",
  /const canonicalOwner = getCanonicalRecordOwner\(entry\)[\s\S]*buildRecordDetailPath\(canonicalOwner, entry\)/,
  "Cross-context record links must traverse to the canonical owner rather than re-parenting the record",
);
requireMatch(
  "src/lib/record-detail-routing.ts",
  /const owner = getCanonicalRecordOwner\(entry\)[\s\S]*owner\.id !== node\.id[\s\S]*return \{ entry, owner \}/,
  "Record detail URLs must resolve only on their one canonical graph owner",
);
requireMatch(
  "src/app\/[[...slug]]\/page.tsx",
  /getCanonicalRecordOwner[\s\S]*permanentRedirect\(buildRecordDetailPath\(owner, decision\.entry\)\)/,
  "Legacy landing aliases must redirect to canonical graph-owned record detail",
);
requireMatch(
  "src/app\/[[...slug]]\/page.tsx",
  /RecordDetailSurface[\s\S]*recordDetail && recordContent/,
  "Canonical node routes must project retained record detail into the bounded content area",
);
requireMatch(
  "src/components/record-detail-surface.tsx",
  /agency-representation-audit[\s\S]*software-before-code/,
  "Agency Audit and Software Before Code must have specialized third-layer projections",
);
requireMatch(
  "src/components/record-detail-surface.tsx",
  /Same object[\s\S]*Deeper retained representation/,
  "Record detail must make same-object/deeper-representation semantics explicit",
);

console.log("P4 third-layer detail surface contracts: pass");
