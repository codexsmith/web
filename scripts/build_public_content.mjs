import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const projectRoot = process.cwd();
const sourceRelativePath =
  "backlog/10_social_mission_preagent_ux/bfl_public_content_flat_dedup_v0_3.json";
const sourcePath = join(projectRoot, sourceRelativePath);
const outputDirectory = join(projectRoot, "src/content/public-projections");
const checkOnly = process.argv.includes("--check");

function fail(message) {
  throw new Error(`[public-content] ${message}`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

if (!existsSync(sourcePath)) {
  fail(`Content master is missing: ${sourceRelativePath}`);
}

const sourceText = readFileSync(sourcePath, "utf8");
const master = JSON.parse(sourceText);

if (master.schemaVersion !== "0.3.0") {
  fail(`Expected schema 0.3.0, received ${String(master.schemaVersion)}`);
}

if (!Array.isArray(master.phraseLibrary) || master.phraseLibrary.length === 0) {
  fail("The phrase library is empty or malformed.");
}

const phrases = new Map();
for (const phrase of master.phraseLibrary) {
  if (!phrase?.id || !Array.isArray(phrase.texts) || phrase.texts.length === 0) {
    fail("Every phrase must have an id and at least one text variant.");
  }
  if (phrases.has(phrase.id)) {
    fail(`Duplicate phrase id: ${phrase.id}`);
  }
  const preferredIndex = Number.isInteger(phrase.preferredTextIndex)
    ? phrase.preferredTextIndex
    : 0;
  const preferredText = phrase.texts[preferredIndex];
  if (typeof preferredText !== "string" || preferredText.trim() === "") {
    fail(`Phrase ${phrase.id} has no usable preferred text.`);
  }
  phrases.set(phrase.id, preferredText);
}

function resolveRefs(refs, context) {
  if (!Array.isArray(refs)) {
    fail(`${context} must be an array of phrase references.`);
  }
  return refs.map((ref) => {
    const text = phrases.get(ref);
    if (!text) fail(`Unresolved phrase reference ${String(ref)} at ${context}.`);
    return text;
  });
}

function materialize(value, context = "root") {
  if (Array.isArray(value)) {
    return value.map((item, index) => materialize(item, `${context}[${index}]`));
  }
  if (!value || typeof value !== "object") return value;

  const output = {};
  for (const [key, item] of Object.entries(value)) {
    output[key] = materialize(item, `${context}.${key}`);
    if (!key.endsWith("Refs")) continue;

    const materializedKey = key.slice(0, -4);
    if (Object.prototype.hasOwnProperty.call(value, materializedKey)) {
      fail(
        `Cannot materialize ${context}.${key}; ${materializedKey} already exists.`,
      );
    }
    output[materializedKey] = resolveRefs(item, `${context}.${key}`);
  }
  return output;
}

const source = {
  id: master.id,
  schemaVersion: master.schemaVersion,
  status: master.status,
  sha256: sha256(sourceText),
  path: sourceRelativePath.replaceAll("\\", "/"),
};

function projection(kind, payload) {
  return {
    projectionVersion: "1.0.0",
    kind,
    source,
    payload: materialize(payload, kind),
  };
}

const selectedHomeSections = [
  "representation",
  "institutional-repair",
  "how-we-help",
  "social-mission",
  "human-consequence",
  "institutional-covenant",
  "how-we-work",
  "formation-stage",
  "public-record",
];

const homeSections = Object.fromEntries(
  selectedHomeSections.map((id) => [id, master.siteModel.homepageSections[id]]),
);

const workGroupDefinitions = [
  {
    id: "programs-methods",
    label: "Programs & methods",
    description:
      "Governed methods, professional instruments, and active development programs.",
    entityIds: [
      "corpus-forge",
      "corpus-forge-workbench",
      "bfe-workbench",
      "agency-audit-platform",
      "claim-evidence-ledger",
    ],
  },
  {
    id: "public-products",
    label: "Public products & utilities",
    description:
      "Candidate public instruments organized by the needs they may serve, not by implied availability.",
    entityIds: [
      "projectr",
      "youtube-knowledge-explorer",
      "cross-platform-bookshelf",
      "constructive-media-protocol",
      "barter-capacity-exchange",
      "barter-ledger",
      "need-capacity-map",
      "child-safe-video-calling",
      "family-presence-mode",
      "single-purpose-phone-modes",
    ],
  },
  {
    id: "research-programs",
    label: "Research programs & testbeds",
    description:
      "Research-heavy programs and public on-ramps whose maturity remains visible.",
    entityIds: [
      "boundary-first-chess-software",
      "weather-at-home",
      "boundary-first-soccer",
    ],
  },
  {
    id: "selected-software",
    label: "Selected software work",
    description:
      "Technical assets retained as a selected software record, not promoted as current products.",
    entityIds: [
      "secure-multistream-video-storage",
      "cryptonium",
      "macro-deck-dashboard",
      "terminal-workspace-manager",
    ],
  },
  {
    id: "research-queue",
    label: "Research queue",
    description:
      "Aligned candidates that remain seeds until scope, stewardship, and evidence gates are recorded.",
    entityIds: [
      "home-boundary-maintenance-os",
      "infrastructure-maintenance-ledger",
    ],
  },
];

const workEntitiesById = new Map(
  master.work.entities.map((entity) => [entity.id, entity]),
);
const groupedEntityIds = new Set();
const workGroups = workGroupDefinitions.map((group) => ({
  ...group,
  entities: group.entityIds.map((id) => {
    const entity = workEntitiesById.get(id);
    if (!entity) fail(`Work projection references unknown entity: ${id}`);
    if (groupedEntityIds.has(id)) fail(`Work entity is grouped twice: ${id}`);
    groupedEntityIds.add(id);
    return entity;
  }),
}));

const ungroupedWorkIds = master.work.entities
  .map((entity) => entity.id)
  .filter((id) => !groupedEntityIds.has(id));
if (ungroupedWorkIds.length > 0) {
  fail(`Ungrouped work entities: ${ungroupedWorkIds.join(", ")}`);
}

const payloads = {
  "navigation.json": projection("navigation", {
    globalNavigationPolicy: {
      status: "adopted",
      rule: "Preserve Start, Learn, Explore, Work, and Laboratory as the global navigation. Render the proposed public-interface routes as contextual navigation beneath those pillars.",
    },
    proposedRoutes: master.siteModel.navigation,
  }),
  "home.json": projection("home", {
    heroPolicy: {
      status: "adopted",
      rule: "Preserve the current operational homepage hero. Use the content-master headline as a mission and doctrine proposition rather than a replacement hero.",
    },
    identity: master.siteModel.identity,
    doctrineHero: master.siteModel.homepage.hero,
    sequence: master.siteModel.homepage.sequence,
    sections: homeSections,
    socialMission: {
      headlineRefs: master.siteModel.socialMission.headlineRefs,
      corePropositionRefs: master.siteModel.socialMission.corePropositionRefs,
      humanTranslationOfPrimaryHeadlineRefs:
        master.siteModel.socialMission.humanTranslationOfPrimaryHeadlineRefs,
      scalesOfHelp: master.siteModel.socialMission.scalesOfHelp,
      impactRuleRefs: master.siteModel.socialMission.impactRuleRefs,
    },
    stewardship: {
      classification: "institutional quality and mission",
      headline: "Stewardship is how the institution remains answerable over time.",
      principleRefs: [
        "phr_0e163ae1b05a",
        "phr_1a718d5e4151",
        "phr_c2b1fee83307",
        "phr_ff4968e68891",
      ],
    },
  }),
  "mission.json": projection("mission", {
    missionPage: master.siteModel.missionPage,
    socialMission: master.siteModel.socialMission,
    governance: master.siteModel.governance,
    formation: master.siteModel.formation,
    stewardship: {
      classification: "institutional quality and mission",
      headline: "Stewardship is an institutional obligation, not an ornamental claim.",
      principleRefs: [
        "phr_0e163ae1b05a",
        "phr_1a718d5e4151",
        "phr_2e184c723f2f",
        "phr_c2b1fee83307",
        "phr_cc28122f5303",
        "phr_ff4968e68891",
      ],
    },
  }),
  "practice.json": projection("practice", {
    howWeHelp: master.siteModel.homepageSections["how-we-help"],
    howWeWork: master.siteModel.homepageSections["how-we-work"],
    boundaryFirstMethod:
      master.siteModel.homepageSections["boundary-first-method"],
    publicMethodStack: master.siteModel.publicMethodStack,
    boundaryFirstDoctrine: master.siteModel.boundaryFirstDoctrine,
    methodsPage: master.siteModel.methodsPage,
    glossary: master.siteModel.publicGlossary,
    impactRuleRefs: master.siteModel.socialMission.impactRuleRefs,
  }),
  "governance.json": projection("governance", {
    governance: master.siteModel.governance,
    publicRecord: master.siteModel.publicRecord,
    citationPolicy: master.siteModel.citationPolicy,
    formation: master.siteModel.formation,
    claimFirewalls: master.siteModel.socialMission.claimFirewalls,
    stewardship: {
      classification: "institutional quality and mission",
      principleRefs: [
        "phr_1a718d5e4151",
        "phr_c2b1fee83307",
        "phr_cc28122f5303",
        "phr_ff4968e68891",
      ],
    },
  }),
  "work.json": projection("work", {
    sourceStatus: master.work.sourceStatus,
    sourcePrinciple: master.work.sourcePrinciple,
    entityCount: master.work.entityCount,
    projectionPolicy: {
      rule: "The groups below are public projections over one work graph. They do not alter entity identity, standing, lifecycle, or source provenance.",
      caseStudyStatus:
        "No case study is promoted until a bounded case record and evidence gate are present.",
    },
    groups: workGroups,
  }),
  "atlas.json": projection("atlas", {
    versionPolicy: {
      current: "/map",
      refined: "/map/refined",
      rule: "The current Atlas remains available while the refined experience is reviewed for semantic and accessibility parity.",
    },
    experienceArchitecture: master.siteModel.experienceArchitecture,
    atlassification: master.siteModel.atlassification,
    publicMethodStack: master.siteModel.publicMethodStack,
  }),
  "record.json": projection("record", {
    publicRecord: master.siteModel.publicRecord,
    citationPolicy: master.siteModel.citationPolicy,
    governance: master.siteModel.governance,
    formation: master.siteModel.formation,
  }),
};

const serializedPayloads = Object.fromEntries(
  Object.entries(payloads).map(([name, value]) => [name, stableJson(value)]),
);

const manifest = {
  projectionVersion: "1.0.0",
  source,
  policy: {
    changeType: "expansion-and-refinement",
    reorganization: false,
    sourceRule:
      "The content master remains intact. Route-sized files are deterministic generated projections and must not be edited by hand.",
    missingArtifactWaiver: {
      status: "accepted",
      files: [
        "metadata/public_interface_relation_map.md",
        "source_snapshot/02_Boundary_First_UX.md",
        "source_snapshot/12_Webpage.md",
        "source_snapshot/website_packet.md",
      ],
    },
    stewardship: "institutional quality and mission",
    atlas: "preserve current; refine a parallel version",
  },
  files: Object.entries(serializedPayloads).map(([name, contents]) => ({
    name,
    sha256: sha256(contents),
  })),
};

const outputs = {
  "manifest.json": stableJson(manifest),
  ...serializedPayloads,
};

const mismatches = [];
for (const [name, contents] of Object.entries(outputs)) {
  const targetPath = join(outputDirectory, name);
  if (checkOnly) {
    if (!existsSync(targetPath) || readFileSync(targetPath, "utf8") !== contents) {
      mismatches.push(relative(projectRoot, targetPath));
    }
    continue;
  }
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, contents, "utf8");
}

if (checkOnly && mismatches.length > 0) {
  fail(`Generated projections are stale: ${mismatches.join(", ")}`);
}

console.log(
  checkOnly
    ? `[public-content] ${Object.keys(outputs).length} projections are current.`
    : `[public-content] Wrote ${Object.keys(outputs).length} projections from schema ${master.schemaVersion}.`,
);
