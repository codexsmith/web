import type { ContentNode } from "@/lib/content";
import {
  productLandingManifest,
  type ProductLandingEntry,
} from "@/lib/product-landing-routing";

export type BridgeClass =
  | "collaborator-probe"
  | "research-validation"
  | "operational-pilot"
  | "historical-standing";

export type GovernedBridgeRecord = {
  entry: ProductLandingEntry;
  bridgeClass: BridgeClass;
  sourceNodeIds: string[];
};

const bridgeMetadata: Record<
  string,
  { bridgeClass: BridgeClass; sourceNodeIds: string[] }
> = {
  "ground-news": {
    bridgeClass: "collaborator-probe",
    sourceNodeIds: ["executable-representation", "corpus-forge", "boundary-first-ux"],
  },
  gothamchess: {
    bridgeClass: "collaborator-probe",
    sourceNodeIds: ["boundary-first-chess"],
  },
  "rupaul-world-of-wonder": {
    bridgeClass: "collaborator-probe",
    sourceNodeIds: ["public-interest", "agency-audit"],
  },
  "augusta-citywatch": {
    bridgeClass: "historical-standing",
    sourceNodeIds: ["citywatch", "augusta-civic"],
  },
  "boundary-first-robocup": {
    bridgeClass: "research-validation",
    sourceNodeIds: ["boundary-first-soccer", "executable-representation"],
  },
  "georgia-tech-gtri-research-bridge": {
    bridgeClass: "research-validation",
    sourceNodeIds: ["schemathematics", "corpus-forge"],
  },
  "topos-institute-research-bridge": {
    bridgeClass: "research-validation",
    sourceNodeIds: ["schemathematics", "boundary-theory"],
  },
  "santa-fe-institute-research-bridge": {
    bridgeClass: "research-validation",
    sourceNodeIds: ["boundary-theory", "distinction-space"],
  },
  "south-carolina-legal-modernization-bridge": {
    bridgeClass: "operational-pilot",
    sourceNodeIds: ["constitutional-law", "agency-audit"],
  },
  "weather-research-operations-bridge": {
    bridgeClass: "operational-pilot",
    sourceNodeIds: ["boundary-first-weather"],
  },
};

const manifestBridgeEntries = productLandingManifest.pages.filter(
  (entry) => entry.collection === "bridge",
);

const unmappedBridgeIds = manifestBridgeEntries
  .filter((entry) => !bridgeMetadata[entry.id])
  .map((entry) => entry.id);

if (unmappedBridgeIds.length > 0) {
  throw new Error(
    `Bridge entries require a governed World mapping before use: ${unmappedBridgeIds.join(", ")}`,
  );
}

export const governedBridgeRecords: GovernedBridgeRecord[] = manifestBridgeEntries.map(
  (entry) => ({
    entry,
    ...bridgeMetadata[entry.id],
  }),
);

export function getBridgeRecordsByClass(bridgeClass: BridgeClass) {
  return governedBridgeRecords.filter((record) => record.bridgeClass === bridgeClass);
}

export function getBridgeRecordsForNode(nodeId: string) {
  return governedBridgeRecords.filter((record) => record.sourceNodeIds.includes(nodeId));
}

export function isBridgeDiscoverable(record: GovernedBridgeRecord) {
  return (
    record.entry.visibility === "public" &&
    record.entry.routingEligibility === "public-candidate"
  );
}

const directLinkCount = governedBridgeRecords.filter(
  (record) =>
    record.entry.visibility === "unlisted" &&
    record.entry.routingEligibility === "unlisted-only",
).length;

const discoverableCount = governedBridgeRecords.filter(isBridgeDiscoverable).length;

const classDefinitions: Array<{
  id: BridgeClass;
  label: string;
  path: string;
  eyebrow: string;
  summary: string;
  body: string[];
}> = [
  {
    id: "collaborator-probe",
    label: "Collaborator Probes",
    path: "about/bridges/collaborator-probes",
    eyebrow: "Recipient-specific bounded tests",
    summary:
      "Direct briefs that translate an existing Lab object into one recipient's domain and ask for critique, comparison, or a deliberately small experiment.",
    body: [
      "A collaborator probe is not a partnership announcement. It is a scoped interface that names the shared object, the smallest useful test, and the condition under which the proposed connection should be rejected.",
      "Current recipient-specific briefs remain unlisted unless their visibility state is explicitly promoted.",
    ],
  },
  {
    id: "research-validation",
    label: "Research Validation",
    path: "about/bridges/research-validation",
    eyebrow: "Reduction, falsification, and benchmark interfaces",
    summary:
      "Research bridges that ask established researchers or institutions to reduce, falsify, benchmark, or otherwise constrain a Boundary First research object.",
    body: [
      "The preferred result is informative constraint, not validation theater. Clean reduction to established machinery, a null result, or a demonstrated failure can all be successful outcomes.",
      "Each retained brief keeps the bounded result separate from any claim about Boundary Theory or the wider Lab portfolio.",
    ],
  },
  {
    id: "operational-pilot",
    label: "Operational Pilots",
    path: "about/bridges/operational-pilots",
    eyebrow: "Target-class application interfaces",
    summary:
      "Bridges aimed at a class of operating environments where one consequence-bearing workflow or archived case can test whether the representation adds practical value.",
    body: [
      "Operational bridges begin with one inspectable problem rather than a broad transformation program. The pilot must preserve established domain authority and compare Boundary First machinery against the relevant baseline.",
      "Target-class briefs remain explicitly unaffiliated until a real institution chooses to scope work.",
    ],
  },
  {
    id: "historical-standing",
    label: "Historical Standing",
    path: "about/bridges/historical-standing",
    eyebrow: "Prior work without implied current affiliation",
    summary:
      "Bridges that use documented historical delivery as standing for a new bounded question while preserving the boundary between past work and a present relationship.",
    body: [
      "Historical standing can establish that relevant work was actually performed. It cannot silently promote an old employer, client, institution, or project into a current Boundary First Labs collaborator.",
      "Any new engagement must earn its own scope, evidence, authority, and relationship record.",
    ],
  },
];

const bridgeSystemNode: ContentNode = {
  id: "bridges",
  label: "Bridges",
  path: "about/bridges",
  parentId: "about",
  kind: "branch",
  eyebrow: "Governed external interfaces",
  summary:
    "Bounded interfaces between existing Boundary First work and people, institutions, communities, or operating environments capable of testing, applying, criticizing, or extending it.",
  body: [
    "A Bridge is not evidence of partnership. It is a governed projection from a canonical Lab object into an external context, carrying only the distinctions needed to make a concrete shared question inspectable.",
    "The stable grammar is: their world -> Boundary First machinery -> shared object -> bounded test. Each bridge should also expose its falsification condition, relationship boundary, and smallest useful ask.",
    "The individual direct-link briefs remain governed by the product-landing manifest. The World explains the bridge system without turning an unlisted outreach target into a public relationship claim.",
  ],
  links: [
    {
      label: "Contact Boundary First Labs",
      href: "/about/contact",
      eyebrow: "Start a bounded conversation",
      summary:
        "Use the general contact boundary when a real collaboration question is ready to be scoped.",
    },
  ],
  inspection: [
    {
      id: "bridge-grammar",
      label: "Bridge grammar",
      eyebrow: "Institutional interface primitive",
      summary:
        "A bridge preserves both endpoints and makes the proposed relation itself inspectable rather than pretending either side has already adopted the other.",
      bullets: [
        "Their world: state the recipient or operating context in its own terms.",
        "BFL machinery: point back to the canonical Lab object rather than duplicating it.",
        "Shared object: name the exact thing both sides can inspect.",
        "Bounded test: ask for the smallest experiment, reduction, critique, or workflow that can fail.",
        "Relationship boundary: state what affiliation, endorsement, adoption, or authority is not implied.",
      ],
      sourceRef: "src/content/product-landing-pages/manifest.json",
    },
    {
      id: "bridge-visibility-firewall",
      label: "Visibility firewall",
      eyebrow: "Discovery is a governed state transition",
      summary:
        "Existence in the repository does not make a bridge public evidence of a relationship.",
      bullets: [
        `${governedBridgeRecords.length} governed bridge briefs are currently retained in the manifest.`,
        `${directLinkCount} are currently direct-link only under the unlisted routing policy.`,
        `${discoverableCount} are currently eligible for public discovery through the bridge registry.`,
        "Unlisted proposal -> public invitation -> active or historical relationship are distinct promotion states.",
        "Promotion must be explicit; routing, navigation, sitemap discovery, and relationship language must change together.",
      ],
      sourceRef: "src/content/product-landing-pages/manifest.json + src/lib/product-landing-routing.ts",
    },
  ],
};

const bridgeClassNodes: ContentNode[] = classDefinitions.map((definition) => {
  const count = getBridgeRecordsByClass(definition.id).length;
  return {
    id: `bridges-${definition.id}`,
    label: definition.label,
    path: definition.path,
    parentId: "bridges",
    kind: "about",
    eyebrow: definition.eyebrow,
    summary: definition.summary,
    body: [
      ...definition.body,
      `${count} governed direct-link brief${count === 1 ? " is" : "s are"} currently mapped to this class; individual targets remain undiscoverable here unless their manifest visibility is promoted.`,
    ],
  };
});

export const bridgeSystemNodes: ContentNode[] = [bridgeSystemNode, ...bridgeClassNodes];
