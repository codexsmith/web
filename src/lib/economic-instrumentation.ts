export type EconomicPlane = "reference" | "referent" | "maintenance" | "closure";
export type InstrumentKind = "counter" | "flow" | "condition" | "reserve" | "backlog" | "status" | "divergence";
export type EvidenceClass = "observed" | "derived" | "illustrative" | "unobserved";
export type SignalDirection = "up" | "down" | "flat" | "unknown";
export type ConsequenceEdgeKind = "dependency" | "burden" | "repair" | "claim";

export type InstrumentSource = {
  label: string;
  href?: string;
  asOf?: string;
};

export type EconomicInstrumentDatum = {
  id: string;
  label: string;
  shortLabel: string;
  plane: EconomicPlane;
  kind: InstrumentKind;
  evidence: EvidenceClass;
  value?: number;
  displayValue: string;
  unit?: string;
  direction?: SignalDirection;
  status?: "nominal" | "watch" | "warning" | "unknown";
  description: string;
  measures: string;
  doesNotMeasure: string[];
  source: InstrumentSource;
};

export type EconomicMapNode = {
  id: string;
  label: string;
  type: "power" | "water" | "road" | "school" | "housing" | "institution";
  x: number;
  y: number;
  role: string;
  description: string;
  instrumentIds: string[];
};

export type EconomicConsequenceEdge = {
  id: string;
  from: string;
  to: string;
  kind: ConsequenceEdgeKind;
  label: string;
  evidence: "illustrative" | "declared";
  description: string;
};

export const economicInstruments: EconomicInstrumentDatum[] = [
  {
    id: "federal-debt-live",
    label: "Federal debt outstanding",
    shortLabel: "Federal debt",
    plane: "reference",
    kind: "counter",
    evidence: "unobserved",
    displayValue: "LIVE SOURCE REQUIRED",
    direction: "unknown",
    status: "unknown",
    description: "A legitimate financial-stock instrument. The public console should populate this from a live authoritative source rather than freeze a stale number into the interface.",
    measures: "Outstanding federal financial obligations represented in the selected authoritative debt series.",
    doesNotMeasure: ["infrastructure condition", "maintenance backlog", "productive capacity", "institutional competence"],
    source: {
      label: "U.S. Treasury Fiscal Data — integration pending",
      href: "https://fiscaldata.treasury.gov/",
    },
  },
  {
    id: "nsh-pavement-good",
    label: "National Highway System pavement in good condition",
    shortLabel: "NHS pavement · good",
    plane: "referent",
    kind: "condition",
    evidence: "observed",
    value: 63,
    displayValue: "63%",
    unit: "% mileage",
    status: "nominal",
    description: "A condition instrument on the physical road network rather than a financial proxy for it.",
    measures: "Share of National Highway System pavement mileage reported in good condition.",
    doesNotMeasure: ["all U.S. road mileage", "maintenance funding sufficiency", "future deterioration"],
    source: {
      label: "Federal Highway Administration — Our Nation's Highways 2026",
      href: "https://www.fhwa.dot.gov/policyinformation/pubs/our_nations_highways_2026/safety_condition_performance.cfm",
      asOf: "2026 report",
    },
  },
  {
    id: "nsh-pavement-poor",
    label: "National Highway System pavement in poor condition",
    shortLabel: "NHS pavement · poor",
    plane: "maintenance",
    kind: "condition",
    evidence: "observed",
    value: 10,
    displayValue: "10%",
    unit: "% mileage",
    status: "watch",
    description: "A visible portion of the physical network already reporting degraded condition.",
    measures: "Share of National Highway System pavement mileage reported in poor condition.",
    doesNotMeasure: ["repair cost", "local roads", "bridge condition", "causal responsibility"],
    source: {
      label: "Federal Highway Administration — Our Nation's Highways 2026",
      href: "https://www.fhwa.dot.gov/policyinformation/pubs/our_nations_highways_2026/safety_condition_performance.cfm",
      asOf: "2026 report",
    },
  },
  {
    id: "drinking-water-needs",
    label: "Identified drinking-water infrastructure need",
    shortLabel: "Drinking water need",
    plane: "maintenance",
    kind: "backlog",
    evidence: "observed",
    value: 625,
    displayValue: "$625B / 20 yr",
    unit: "survey-estimated need",
    status: "watch",
    description: "A survey-derived future infrastructure requirement. It is not a Treasury liability and should not be animated like a continuously observed debt stock.",
    measures: "EPA-estimated drinking-water infrastructure needs over the survey horizon.",
    doesNotMeasure: ["current federal debt", "annual appropriation", "real-time deterioration", "all water-system costs"],
    source: {
      label: "U.S. EPA — 7th Drinking Water Infrastructure Needs Survey and Assessment",
      href: "https://www.epa.gov/dwsrf/epas-7th-drinking-water-infrastructure-needs-survey-and-assessment",
      asOf: "20-year survey horizon",
    },
  },
  {
    id: "clean-water-needs",
    label: "Identified clean-water infrastructure need",
    shortLabel: "Clean water need",
    plane: "maintenance",
    kind: "backlog",
    evidence: "observed",
    value: 630,
    displayValue: ">= $630B / 20 yr",
    unit: "survey-estimated need",
    status: "watch",
    description: "A national estimate covering wastewater, stormwater, and related clean-water infrastructure needs over a twenty-year horizon.",
    measures: "Survey-identified clean-water infrastructure needs.",
    doesNotMeasure: ["real-time backlog growth", "federal liability", "all local capital needs"],
    source: {
      label: "U.S. EPA — Clean Watersheds Needs Survey",
      href: "https://www.epa.gov/cwns",
      asOf: "20-year survey horizon",
    },
  },
  {
    id: "capital-replacement-ratio",
    label: "Public capital replacement ratio",
    shortLabel: "Capital replacement",
    plane: "maintenance",
    kind: "reserve",
    evidence: "derived",
    displayValue: "MODEL NOT WIRED",
    direction: "unknown",
    status: "unknown",
    description: "Candidate ratio comparing public investment with estimated depreciation. It remains deliberately uncomputed until the exact BEA series and transformation contract are fixed.",
    measures: "Once wired: whether selected public fixed-asset investment is keeping pace with selected depreciation.",
    doesNotMeasure: ["asset usefulness", "geographic bottlenecks", "distributional access", "maintenance quality"],
    source: {
      label: "Bureau of Economic Analysis — Fixed Assets Accounts",
      href: "https://www.bea.gov/itable/fixed-assets",
    },
  },
  {
    id: "closure-maintenance",
    label: "Maintenance closure",
    shortLabel: "Maintenance closure",
    plane: "closure",
    kind: "status",
    evidence: "illustrative",
    displayValue: "OPEN",
    status: "warning",
    description: "Illustrative closure lamp demonstrating that financial completion and maintenance completion are separate states.",
    measures: "Whether a represented maintenance obligation has been scheduled, funded, executed, and verified.",
    doesNotMeasure: ["national maintenance closure", "legal liability", "automatic causal attribution"],
    source: { label: "Boundary First illustrative instrument contract" },
  },
  {
    id: "household-consequence",
    label: "Household consequence signal",
    shortLabel: "Household consequence",
    plane: "closure",
    kind: "status",
    evidence: "unobserved",
    displayValue: "NO SIGNAL",
    status: "unknown",
    description: "A deliberate unknown-not-zero state. Absence of an instrument is represented as absence of observation, not as absence of consequence.",
    measures: "Nothing yet — this is an instrumentation gap made visible.",
    doesNotMeasure: ["zero burden", "no effect", "no affected households"],
    source: { label: "Uninstrumented — source contract required" },
  },
];

export const economicMapNodes: EconomicMapNode[] = [
  { id: "river-intake", label: "Water system", type: "water", x: 18, y: 28, role: "material utility", description: "Schematic water intake, treatment, and distribution system.", instrumentIds: ["drinking-water-needs", "clean-water-needs", "closure-maintenance"] },
  { id: "grid-node", label: "Power node", type: "power", x: 72, y: 25, role: "energy utility", description: "Schematic generation / transmission node standing in for capacity and renewal obligations.", instrumentIds: ["capital-replacement-ratio", "closure-maintenance"] },
  { id: "arterial", label: "Road corridor", type: "road", x: 54, y: 58, role: "transport substrate", description: "Schematic arterial corridor carrying movement between housing, institutions, and utilities.", instrumentIds: ["nsh-pavement-good", "nsh-pavement-poor", "closure-maintenance"] },
  { id: "school-network", label: "School / institution", type: "school", x: 29, y: 69, role: "capability infrastructure", description: "Institutional node standing in for education, continuity, human capability, and local service capacity.", instrumentIds: ["household-consequence", "closure-maintenance"] },
  { id: "housing-district", label: "Housing district", type: "housing", x: 77, y: 73, role: "household endpoint", description: "Household district where material services, financial claims, and displaced burdens ultimately resolve into lived conditions.", instrumentIds: ["federal-debt-live", "household-consequence"] },
];

export const economicConsequenceEdges: EconomicConsequenceEdge[] = [
  { id: "water-household", from: "river-intake", to: "housing-district", kind: "dependency", label: "service dependency", evidence: "illustrative", description: "Illustrative topology: households depend on functioning water infrastructure." },
  { id: "power-housing", from: "grid-node", to: "housing-district", kind: "dependency", label: "energy dependency", evidence: "illustrative", description: "Illustrative topology: housing depends on electrical capacity and distribution." },
  { id: "road-school", from: "arterial", to: "school-network", kind: "dependency", label: "access path", evidence: "illustrative", description: "Illustrative access relation between transportation substrate and institutional capability." },
  { id: "road-housing", from: "arterial", to: "housing-district", kind: "dependency", label: "mobility path", evidence: "illustrative", description: "Illustrative transport dependency for household access." },
  { id: "school-housing", from: "school-network", to: "housing-district", kind: "burden", label: "household consequence", evidence: "illustrative", description: "Illustrative consequence path: institutional execution gaps can move unresolved work into households." },
  { id: "water-road", from: "river-intake", to: "arterial", kind: "repair", label: "repair interaction", evidence: "illustrative", description: "Illustrative repair coupling: underground utility work can interact with surface transportation assets." },
];

export const economicPlanes: Array<{ id: EconomicPlane; label: string; notation: string; description: string }> = [
  { id: "reference", label: "Reference state", notation: "M_t", description: "Money, debt, credit, valuations, and financial claims." },
  { id: "referent", label: "Real state", notation: "R_t", description: "Physical and institutional capacity to which claims ultimately resolve." },
  { id: "maintenance", label: "Maintenance state", notation: "K_t", description: "Condition, renewal, backlog, reserve, and repair obligations." },
  { id: "closure", label: "Closure state", notation: "C_t", description: "What is complete, open, displaced, unknown, or still awaiting verification." },
];
