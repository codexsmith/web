export const augustaCase = {
  id: "BFL-CIVIC-AUG-MD-001",
  location: "Augusta–Richmond County, Georgia",
  state: "CASE_CANDIDATE / RESEARCH_ACTIVE / NOT_PROMOTED",
  opened: "2026-08-14",
  evidence: "Primarily public institutional records; working analysis remains bounded by the case controls.",
  question:
    "What lifecycle obligations does Augusta already carry in public infrastructure and public-service assets, which are demonstrably overdue, what consequences are produced by deferral, and what changes if unresolved obligations are carried forward in a lifecycle ledger?",
  conclusion:
    "The public record is sufficient to establish the phenomenon, but not a citywide maintenance-debt balance.",
} as const;

export const augustaCaseNav = [
  ["#finding", "Finding"],
  ["#ledger", "Lifecycle ledger"],
  ["#evidence", "Evidence"],
  ["#fleet-test", "Fleet test"],
  ["#controls", "Accounting controls"],
  ["#next-gate", "Next gate"],
] as const;

export const augustaMetrics = [
  {
    value: ">$240M",
    label: "2014 stormwater repair backlog",
    detail:
      "Historical documented maintenance / renewal stock. The current residual balance is unknown.",
    tone: "debt",
  },
  {
    value: "161",
    label: "Sheriff fleet vehicles in the known 10+ year cohort",
    detail:
      "A supported physical replacement backlog under the program's stated eight-year lifecycle objective.",
    tone: "physical",
  },
  {
    value: "612",
    label: "Minimum vehicle-years beyond the stated lifecycle target",
    detail:
      "A time-weighted physical backlog measure. It is neither a vehicle count nor a dollar liability.",
    tone: "time",
  },
  {
    value: "~1,080",
    label: "Center-lane miles in the road maintenance portfolio",
    detail:
      "Network scale is documented. The condition-to-due-date join needed to quantify overdue road stock is not public yet.",
    tone: "network",
  },
  {
    value: "~$39.019M",
    label: "FY2024 landfill closure / post-closure liability",
    detail:
      "A conventional lifecycle-liability comparison object, not a road, fleet, facility, or stormwater debt subtotal.",
    tone: "comparison",
  },
  {
    value: "~$88.4M",
    label: "Hurricane Helene recovery-related costs",
    detail:
      "External shock cost carried in a separate ledger unless asset-level evidence supports a precondition-amplification term.",
    tone: "shock",
  },
] as const;

export const augustaSupportedClaims = [
  "Deferred lifecycle work has existed as a large quantified backlog.",
  "Replacement deferral can transfer cost into later operating and capital budgets.",
  "Preservation and restoration work are materially embedded inside capital programs.",
  "Some future lifecycle obligations are already recognized conventionally while others remain fragmented across operational, capital, physical-condition, and funding records.",
  "Enough municipal instrumentation appears to exist to attempt a consolidated lifecycle ledger.",
] as const;

export const augustaBlockedClaims = [
  "One audited citywide maintenance-debt number.",
  "A claim that every preservation-oriented capital dollar is maintenance debt.",
  "A claim that depreciation is physical maintenance need.",
  "A claim that Hurricane Helene recovery costs are maintenance debt.",
  "A claim that committed funding closes a physical obligation before the required condition is restored.",
] as const;

export const augustaLedgerSteps = [
  ["01", "Asset identity", "What physical thing or service obligation are we talking about?"],
  ["02", "Condition", "What is its present physical or operational state?"],
  ["03", "Due state", "What intervention was required, and when did it become due?"],
  ["04", "Funding", "What money, if any, is committed to this exact obligation?"],
  ["05", "Intervention", "What maintenance, repair, renewal, replacement, or retirement actually occurred?"],
  ["06", "Closure", "Was the required condition restored, superseded, or explicitly retired?"],
  ["07", "Consequence", "What service loss, added repair, downtime, risk, or other consequence remained while the obligation stayed open?"],
] as const;

export const augustaEvidenceDomains = [
  {
    code: "STORMWATER",
    status: "HISTORICAL BACKLOG SUPPORTED",
    title: "A large repair backlog is directly documented.",
    body:
      "The case record carries a historical stormwater repair backlog above $240 million, including more than $100 million described as critical. That establishes a historical lifecycle-obligation stock; it does not establish today's residual balance.",
    signal: "Known historical stock → current residual unknown",
    tone: "blue",
  },
  {
    code: "FLEET",
    status: "DEFERRED RENEWAL SUPPORTED",
    title: "The first component-level physical debt measure already closes.",
    body:
      "The Sheriff's Office reports 103 vehicles aged 10–14 years and 58 aged 15+ against a desired structured eight-year lifecycle. At minimum, that is 161 vehicles and 612 vehicle-years beyond the stated target.",
    signal: "Physical stock supported → dollar balance awaits unit reconciliation",
    tone: "green",
  },
  {
    code: "ROADS",
    status: "MODEL DEFINED / STOCK UNQUANTIFIED",
    title: "The road network is visible; the condition join is not.",
    body:
      "Augusta publicly exposes road identity and describes a condition-based resurfacing practice. The missing object is the native condition table joined to intervention threshold, due state, project, funding, and completion.",
    signal: "Asset population known → due-state table missing",
    tone: "gold",
  },
  {
    code: "CAPITAL",
    status: "MIXED / CLASSIFICATION REQUIRED",
    title: "Capital programs carry preservation without becoming one debt subtotal.",
    body:
      "Resurfacing, repair, rehabilitation, replacement, reconstruction, renovation, and new capacity can coexist inside the same program or project. Each line has to be decomposed before aggregation.",
    signal: "Capital is a funding representation → not a physical classification",
    tone: "orange",
  },
  {
    code: "LANDFILL",
    status: "COMPARISON OBJECT",
    title: "Municipal accounting already carries some future lifecycle obligations forward.",
    body:
      "The FY2024 landfill closure and post-closure liability provides a useful comparison: standards can require a future physical obligation to appear as a present accounting liability. The case does not assume identical GAAP treatment for roads, fleets, or buildings.",
    signal: "Existing lifecycle-liability precedent → parallel civic ledger question",
    tone: "slate",
  },
  {
    code: "HELENE",
    status: "SEPARATE SHOCK LEDGER",
    title: "Shock is not maintenance debt by default.",
    body:
      "Recovery-related costs are explicitly separated from deferred maintenance. A precondition-amplification term would require asset-level evidence connecting prior condition to additional storm loss.",
    signal: "External shock → separate unless causally decomposed",
    tone: "red",
  },
] as const;

export const augustaFleet = {
  cohorts: [
    ["103", "vehicles aged 10–14 years"],
    ["58", "vehicles aged 15+ years"],
    ["161", "known vehicles already >2 years beyond an 8-year target"],
    ["612", "minimum vehicle-years beyond the stated target"],
  ],
  formula: "103 × (10 − 8) + 58 × (15 − 8) = 612 vehicle-years",
  explanation:
    "Vehicle-years are an obligation-time measure: they preserve both how many obligations are open and how long the known minimum backlog has persisted.",
  waitsFor: [
    "Unit-level replacement qualification under Augusta's own replacement matrix",
    "The date each unit first qualified for replacement",
    "Current in-service state and current replacement cost",
    "Committed funding attached to the same unit",
    "Replacement versus net-new capacity classification",
    "Maintenance and downtime cost attributable to deferral rather than ordinary lifecycle operation",
  ],
} as const;

export const augustaAccountingRules = [
  ["NO FALSE SINGLE NUMBER", "Do not publish a citywide maintenance-debt total until coverage, identity, classification, and uncertainty are defensible."],
  ["STOCKS ≠ FLOWS", "Backlogs, budgets, appropriations, expenditures, depreciation, financing, and shock costs are different quantities."],
  ["IDENTITY BEFORE AGGREGATION", "One physical obligation can appear in multiple administrative systems. Join those records; do not sum their representations."],
  ["SHOCK ≠ DEBT", "External damage stays separate unless a pre-existing condition contribution is independently supported."],
  ["CAPITAL MUST DECOMPOSE", "Classify new capacity, scheduled renewal, deferred renewal, failure recovery, mixed scope, and unresolved scope before aggregation."],
  ["FUNDING ≠ PHYSICAL CLOSURE", "A funded project remains an open physical obligation until required condition is restored or the obligation is explicitly superseded or retired."],
  ["EVERY DOLLAR HAS A BASIS", "Historical estimate, current estimate, appropriation, contract, expenditure, accounting liability, and derived revaluation cannot be silently mixed."],
  ["MISSINGNESS IS TYPED", "Not maintained, not provided, withheld, not found, and unknown are different evidence states."],
] as const;

export const augustaMissingJoin = [
  "asset identity",
  "condition",
  "obligation due date",
  "work-order / project state",
  "current cost",
  "committed funding",
  "service consequence",
  "physical closure",
] as const;

export const augustaNextTargets = [
  "Sheriff's fleet unit inventory plus replacement and maintenance history",
  "Final Fire apparatus units funded by SPLOST 9 plus service-life history",
  "Detention-center work breakdown separating existing-facility renewal from expansion",
  "Drainage-project identity mapped back to the historical stormwater backlog where possible",
  "Road-segment condition scores, intervention thresholds, and due-year data",
  "Parks subproject allocation plus facility-condition assessments",
  "Utilities work breakdown separating canal repair from water and treatment improvements",
] as const;

export const augustaSuccessCriteria = [
  "What obligations are known",
  "Which portion is demonstrably overdue",
  "What remains unknown",
  "What funding is committed",
  "What consequences are associated with deferral",
  "What evidence would be required for a defensible aggregate",
] as const;
