import {
  economicInstruments,
  type EconomicConsequenceEdge,
  type EconomicInstrumentDatum,
  type EconomicMapNode,
} from "@/lib/economic-instrumentation";

export type AugustaSystemLayer = "material" | "civic" | "historical" | "household";
export type AugustaNodeEvidence = "official-local" | "source-bound-seed" | "research-hypothesis" | "schematic";
export type AugustaEdgeEvidence = "illustrative" | "source-bound" | "interpretive";

export type AugustaInstrumentDatum = EconomicInstrumentDatum & {
  scope: string;
};

export type AugustaMapNode = EconomicMapNode & {
  layer: AugustaSystemLayer;
  evidence: AugustaNodeEvidence;
  sourceLabel: string;
  sourceHref?: string;
};

export type AugustaConsequenceEdge = Omit<EconomicConsequenceEdge, "evidence"> & {
  evidence: AugustaEdgeEvidence;
};

export const augustaCrossSection = {
  id: "augusta-civilizational-cross-section-v0-1",
  label: "Augusta civilizational cross-section",
  geography: "Augusta-Richmond County, Georgia",
  status: "prototype",
  coordinateContract: "Schematic positions only. Node x/y values do not encode real coordinates or distance.",
  evidenceContract:
    "Named local systems use official or source-bound references where available. Unverified topology remains explicitly illustrative or interpretive.",
} as const;

const blackAugustaConceptUrl =
  "https://github.com/codexsmith/boundary-first-labs/blob/main/organized_library_curated/999_Library/03_Domains/0701_public_engagement_and_media/Black_Augusta_Excellence/01_PUBLIC_CONCEPT_NOTE.md";
const blackAugustaSeedUrl =
  "https://github.com/codexsmith/boundary-first-labs/blob/main/organized_library_curated/999_Library/03_Domains/0701_public_engagement_and_media/Black_Augusta_Excellence/08_augusta_excellence_graph_seed_v0_1.json";
const georgiaPowerCaseUrl =
  "https://github.com/codexsmith/boundary-first-labs/blob/main/organized_library_curated/999_Library/03_Domains/0401_civilization_and_existential_risk/04_Civilization_Mechanics_Product/boundary_first_accounting/georgia_power_case.md";

export const augustaSystemLayers: Array<{
  id: AugustaSystemLayer;
  label: string;
  description: string;
}> = [
  {
    id: "material",
    label: "Material systems",
    description: "Water, electric, and transportation substrates that keep embodied activity possible.",
  },
  {
    id: "civic",
    label: "Civic institutions",
    description: "Public institutions that organize education, administration, access, and local execution capacity.",
  },
  {
    id: "historical",
    label: "Capability history",
    description: "Historical institutions and places being studied as infrastructure beneath repeated human capability and achievement.",
  },
  {
    id: "household",
    label: "Household endpoints",
    description: "The lived boundary where service, price, access, administrative work, and unresolved burdens ultimately arrive.",
  },
];

export const augustaInstruments: AugustaInstrumentDatum[] = [
  ...economicInstruments.map((instrument) => ({
    ...instrument,
    scope: "National reference / comparison",
  })),
  {
    id: "augusta-water-design-capacity",
    label: "Highland Avenue surface-water treatment design capacity",
    shortLabel: "Surface-water design capacity",
    plane: "referent",
    kind: "reserve",
    evidence: "observed",
    value: 60,
    displayValue: "60 MGD",
    unit: "design capacity",
    status: "unknown",
    description:
      "Augusta Utilities reports a 60 million-gallon-per-day design capacity for the Highland Avenue surface-water treatment plant.",
    measures: "Reported design capacity of the Highland Avenue surface-water treatment plant.",
    doesNotMeasure: ["system-wide peak reserve", "future demand", "distribution condition", "water affordability"],
    source: {
      label: "Augusta Utilities Department — Facilities",
      href: "https://www.augustaga.gov/2214/Facilities",
      asOf: "retrieved 2026-08-27",
    },
    scope: "Augusta-Richmond County",
  },
  {
    id: "augusta-water-average-flow",
    label: "Highland Avenue surface-water average daily flow",
    shortLabel: "Surface-water average flow",
    plane: "referent",
    kind: "flow",
    evidence: "observed",
    value: 24,
    displayValue: "~24 MGD",
    unit: "average daily flow",
    status: "unknown",
    description:
      "Augusta Utilities reports average daily flows of approximately 24 MGD at the Highland Avenue surface-water treatment plant.",
    measures: "Reported average daily plant flow for the Highland Avenue surface-water treatment plant.",
    doesNotMeasure: ["peak demand", "distribution losses", "service interruptions", "future capacity sufficiency"],
    source: {
      label: "Augusta Utilities Department — Facilities",
      href: "https://www.augustaga.gov/2214/Facilities",
      asOf: "retrieved 2026-08-27",
    },
    scope: "Augusta-Richmond County",
  },
  {
    id: "augusta-road-local-condition",
    label: "Augusta local transportation condition series",
    shortLabel: "Local road condition",
    plane: "maintenance",
    kind: "condition",
    evidence: "unobserved",
    displayValue: "LOCAL SERIES REQUIRED",
    status: "unknown",
    description:
      "The cross-section needs a local road/bridge condition and maintenance series before national highway condition figures can be translated into an Augusta claim.",
    measures: "Nothing yet — this is an explicit local instrumentation gap.",
    doesNotMeasure: ["zero local maintenance need", "good local condition", "federal highway condition"],
    source: { label: "Local transportation source contract pending" },
    scope: "Augusta-Richmond County",
  },
  {
    id: "augusta-power-audit-state",
    label: "Georgia Power lifecycle risk-return audit",
    shortLabel: "Power lifecycle audit",
    plane: "closure",
    kind: "status",
    evidence: "unobserved",
    displayValue: "AUDIT OPEN",
    status: "watch",
    description:
      "Boundary First Labs is reconstructing how risk, return, maintenance, repair, capital, ownership, and public support are allocated across the Georgia Power lifecycle. This is a research status, not a finding of wrongdoing.",
    measures: "Research closure state for the Georgia Power lifecycle allocation case study.",
    doesNotMeasure: ["utility reliability", "legal liability", "regulatory capture", "Augusta-specific customer burden"],
    source: {
      label: "Boundary First Labs — Georgia Power case study working notes",
      href: georgiaPowerCaseUrl,
    },
    scope: "Georgia / Augusta application under study",
  },
  {
    id: "rcss-students",
    label: "Richmond County School System students",
    shortLabel: "RCSS students",
    plane: "referent",
    kind: "condition",
    evidence: "observed",
    value: 28000,
    displayValue: "28,000+",
    unit: "students",
    status: "unknown",
    description: "RCSS currently reports more than 28,000 students across the system.",
    measures: "Reported student population served by Richmond County School System.",
    doesNotMeasure: ["educational quality", "institutional capacity per student", "household burden", "historical continuity"],
    source: {
      label: "Richmond County School System — official site",
      href: "https://www.rcboe.org/",
      asOf: "retrieved 2026-08-27",
    },
    scope: "Richmond County School System",
  },
  {
    id: "rcss-schools-programs",
    label: "Richmond County School System schools and programs",
    shortLabel: "RCSS schools + programs",
    plane: "referent",
    kind: "condition",
    evidence: "observed",
    value: 54,
    displayValue: "54",
    unit: "schools + programs",
    status: "unknown",
    description: "RCSS currently reports 54 schools and programs.",
    measures: "Reported count of RCSS schools and programs.",
    doesNotMeasure: ["facility condition", "staffing sufficiency", "access time", "program quality"],
    source: {
      label: "Richmond County School System — official site",
      href: "https://www.rcboe.org/",
      asOf: "retrieved 2026-08-27",
    },
    scope: "Richmond County School System",
  },
  {
    id: "rcss-graduation-rate",
    label: "Richmond County School System graduation rate",
    shortLabel: "RCSS graduation rate",
    plane: "referent",
    kind: "condition",
    evidence: "observed",
    value: 81.7,
    displayValue: "81.7%",
    unit: "reported graduation rate",
    status: "unknown",
    description: "RCSS currently reports an 81.7% graduation rate on its public system overview.",
    measures: "Reported district graduation rate.",
    doesNotMeasure: ["individual school performance", "long-run capability formation", "causal contribution of any institution"],
    source: {
      label: "Richmond County School System — official site",
      href: "https://www.rcboe.org/",
      asOf: "retrieved 2026-08-27",
    },
    scope: "Richmond County School System",
  },
  {
    id: "black-augusta-ecology-state",
    label: "Black Augusta capability-producing civic ecology",
    shortLabel: "Capability ecology",
    plane: "referent",
    kind: "status",
    evidence: "illustrative",
    displayValue: "RESEARCH HYPOTHESIS",
    status: "unknown",
    description:
      "The Black Augusta project studies schools, colleges, churches, families, businesses, neighborhoods, mentors, cultural institutions, and other maintainers as an ecology of capability. The ecology-level object remains a research hypothesis.",
    measures: "Current research status of the ecology-level synthesis object.",
    doesNotMeasure: ["a single causal lineage", "complete institutional membership", "quantified causal effect"],
    source: {
      label: "Boundary First Labs — Black Augusta concept note and graph seed",
      href: blackAugustaConceptUrl,
    },
    scope: "Black Augusta historical synthesis",
  },
  {
    id: "black-augusta-entity-seed",
    label: "Historical institution/place research state",
    shortLabel: "Historical entity state",
    plane: "closure",
    kind: "status",
    evidence: "observed",
    displayValue: "ENTITY SEEDED",
    status: "unknown",
    description:
      "The named institution or place exists in the noncanonical Black Augusta graph seed for schema and tooling validation. Entity inclusion is not itself proof of a specific causal or affiliation edge.",
    measures: "Presence of the selected object in the Black Augusta research seed dataset.",
    doesNotMeasure: ["historical causal role", "direct mentorship", "institutional affiliation", "complete historical review"],
    source: {
      label: "Boundary First Labs — Augusta excellence graph seed v0.1",
      href: blackAugustaSeedUrl,
      asOf: "2026-08-22 seed",
    },
    scope: "Black Augusta research corpus",
  },
  {
    id: "black-augusta-review-flag",
    label: "Historical label review flag",
    shortLabel: "Historical review",
    plane: "closure",
    kind: "status",
    evidence: "observed",
    displayValue: "REVIEW REQUIRED",
    status: "watch",
    description:
      "The graph seed explicitly flags the Golden Blocks / Laney-Walker label for historical review before stronger public use.",
    measures: "Research review state of the selected historical label.",
    doesNotMeasure: ["historical invalidity", "causal significance", "current neighborhood boundary"],
    source: {
      label: "Boundary First Labs — Augusta excellence graph seed v0.1",
      href: blackAugustaSeedUrl,
      asOf: "2026-08-22 seed",
    },
    scope: "Black Augusta research corpus",
  },
];

export const augustaMapNodes: AugustaMapNode[] = [
  {
    id: "savannah-water",
    label: "Savannah River water system",
    type: "water",
    layer: "material",
    x: 16,
    y: 25,
    role: "water source + utility",
    evidence: "official-local",
    description:
      "Augusta Utilities identifies the Savannah River as the source for its surface-water treatment system, with treatment at the Highland Avenue plant.",
    sourceLabel: "Augusta Utilities Department — Facilities",
    sourceHref: "https://www.augustaga.gov/2214/Facilities",
    instrumentIds: [
      "augusta-water-design-capacity",
      "augusta-water-average-flow",
      "drinking-water-needs",
      "clean-water-needs",
      "closure-maintenance",
    ],
  },
  {
    id: "georgia-power-system",
    label: "Georgia Power service system",
    type: "power",
    layer: "material",
    x: 75,
    y: 23,
    role: "essential electric infrastructure",
    evidence: "research-hypothesis",
    description:
      "A local application node for the open Georgia Power lifecycle audit. No Augusta-specific reliability or burden metric is asserted here yet.",
    sourceLabel: "Boundary First Labs — Georgia Power case study working notes",
    sourceHref: georgiaPowerCaseUrl,
    instrumentIds: ["capital-replacement-ratio", "augusta-power-audit-state", "closure-maintenance"],
  },
  {
    id: "augusta-transport",
    label: "Augusta transportation network",
    type: "road",
    layer: "material",
    x: 52,
    y: 51,
    role: "mobility substrate",
    evidence: "schematic",
    description:
      "A deliberately schematic local transportation object. National highway condition data remain comparison instruments until an Augusta road/bridge source contract is wired.",
    sourceLabel: "Local transportation dataset pending",
    instrumentIds: ["augusta-road-local-condition", "nsh-pavement-good", "nsh-pavement-poor", "closure-maintenance"],
  },
  {
    id: "rcss",
    label: "Richmond County School System",
    type: "school",
    layer: "civic",
    x: 35,
    y: 61,
    role: "education + capability infrastructure",
    evidence: "official-local",
    description:
      "The contemporary public-school system is represented as civic infrastructure with observable scale and output measures, without treating those measures as a complete model of capability formation.",
    sourceLabel: "Richmond County School System — official site",
    sourceHref: "https://www.rcboe.org/",
    instrumentIds: ["rcss-students", "rcss-schools-programs", "rcss-graduation-rate", "household-consequence"],
  },
  {
    id: "augusta-households",
    label: "Augusta households",
    type: "housing",
    layer: "household",
    x: 78,
    y: 70,
    role: "lived consequence endpoint",
    evidence: "schematic",
    description:
      "A household endpoint for tracing where service, price, access, administrative work, and unresolved burdens may ultimately arrive. No aggregate burden number is inferred.",
    sourceLabel: "Boundary First schematic endpoint",
    instrumentIds: ["household-consequence", "federal-debt-live"],
  },
  {
    id: "black-augusta-ecology",
    label: "Black Augusta capability ecology",
    type: "institution",
    layer: "historical",
    x: 49,
    y: 75,
    role: "historical capability infrastructure",
    evidence: "research-hypothesis",
    description:
      "A research object for the infrastructure beneath achievement: schools, colleges, churches, families, businesses, neighborhoods, teachers, clergy, artists, organizers, professional networks, and cultural institutions.",
    sourceLabel: "Boundary First Labs — Black Augusta: An Ecology of Excellence",
    sourceHref: blackAugustaConceptUrl,
    instrumentIds: ["black-augusta-ecology-state"],
  },
  {
    id: "paine-college",
    label: "Paine College",
    type: "institution",
    layer: "historical",
    x: 29,
    y: 46,
    role: "historical institution seed",
    evidence: "source-bound-seed",
    description: "Public institution entity present in the noncanonical Black Augusta research seed.",
    sourceLabel: "Boundary First Labs — Augusta excellence graph seed v0.1",
    sourceHref: blackAugustaSeedUrl,
    instrumentIds: ["black-augusta-entity-seed"],
  },
  {
    id: "haines-institute",
    label: "Haines Normal and Industrial Institute",
    type: "school",
    layer: "historical",
    x: 40,
    y: 35,
    role: "historical education seed",
    evidence: "source-bound-seed",
    description: "Public institution entity present in the noncanonical Black Augusta research seed.",
    sourceLabel: "Boundary First Labs — Augusta excellence graph seed v0.1",
    sourceHref: blackAugustaSeedUrl,
    instrumentIds: ["black-augusta-entity-seed"],
  },
  {
    id: "tabernacle-baptist",
    label: "Tabernacle Baptist Church",
    type: "institution",
    layer: "historical",
    x: 64,
    y: 38,
    role: "historical civic + cultural seed",
    evidence: "source-bound-seed",
    description: "Public institution entity present in the noncanonical Black Augusta research seed.",
    sourceLabel: "Boundary First Labs — Augusta excellence graph seed v0.1",
    sourceHref: blackAugustaSeedUrl,
    instrumentIds: ["black-augusta-entity-seed"],
  },
  {
    id: "ct-walker-school",
    label: "C. T. Walker school",
    type: "school",
    layer: "historical",
    x: 72,
    y: 54,
    role: "historical education seed",
    evidence: "source-bound-seed",
    description:
      "Public institution entity present in the noncanonical Black Augusta research seed. No additional affiliation or causal edge is implied by inclusion.",
    sourceLabel: "Boundary First Labs — Augusta excellence graph seed v0.1",
    sourceHref: blackAugustaSeedUrl,
    instrumentIds: ["black-augusta-entity-seed"],
  },
  {
    id: "golden-blocks",
    label: "Golden Blocks / Laney-Walker",
    type: "institution",
    layer: "historical",
    x: 22,
    y: 68,
    role: "historic business + civic district seed",
    evidence: "source-bound-seed",
    description:
      "Place entity present in the Black Augusta seed. The seed explicitly marks its label as requiring historical review.",
    sourceLabel: "Boundary First Labs — Augusta excellence graph seed v0.1",
    sourceHref: blackAugustaSeedUrl,
    instrumentIds: ["black-augusta-entity-seed", "black-augusta-review-flag"],
  },
];

export const augustaConsequenceEdges: AugustaConsequenceEdge[] = [
  {
    id: "water-households",
    from: "savannah-water",
    to: "augusta-households",
    kind: "dependency",
    label: "water service dependency",
    evidence: "illustrative",
    description: "Illustrative systems topology: households depend on functioning water treatment and distribution.",
  },
  {
    id: "power-households",
    from: "georgia-power-system",
    to: "augusta-households",
    kind: "dependency",
    label: "electric service dependency",
    evidence: "illustrative",
    description: "Illustrative systems topology: households depend on functioning electrical service.",
  },
  {
    id: "transport-rcss",
    from: "augusta-transport",
    to: "rcss",
    kind: "dependency",
    label: "access path",
    evidence: "illustrative",
    description: "Illustrative access topology between transportation infrastructure and public institutions.",
  },
  {
    id: "transport-households",
    from: "augusta-transport",
    to: "augusta-households",
    kind: "dependency",
    label: "mobility path",
    evidence: "illustrative",
    description: "Illustrative transport dependency for household access to work, institutions, goods, and services.",
  },
  {
    id: "rcss-households",
    from: "rcss",
    to: "augusta-households",
    kind: "burden",
    label: "household interface",
    evidence: "illustrative",
    description:
      "Illustrative consequence path for tracing how institutional execution, access, or administrative requirements may move work into households. No aggregate burden is asserted.",
  },
  {
    id: "paine-ecology",
    from: "paine-college",
    to: "black-augusta-ecology",
    kind: "claim",
    label: "contextual correspondence",
    evidence: "interpretive",
    description:
      "The Black Augusta seed contains an unreviewed CULTURALLY_CORRESPONDS_WITH edge. It is research framing, not a direct causal lineage claim.",
  },
  {
    id: "haines-ecology",
    from: "haines-institute",
    to: "black-augusta-ecology",
    kind: "claim",
    label: "contextual correspondence",
    evidence: "interpretive",
    description:
      "The Black Augusta seed contains an unreviewed CULTURALLY_CORRESPONDS_WITH edge. It is research framing, not a direct causal lineage claim.",
  },
  {
    id: "tabernacle-ecology",
    from: "tabernacle-baptist",
    to: "black-augusta-ecology",
    kind: "claim",
    label: "contextual correspondence",
    evidence: "interpretive",
    description:
      "The Black Augusta seed contains an unreviewed CULTURALLY_CORRESPONDS_WITH edge. It is research framing, not a direct causal lineage claim.",
  },
];
