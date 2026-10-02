import {
  executeAdditiveBoundaryRatioTransition,
  formatTransitionRatio,
  type AdditiveBoundaryRatioTransitionContract,
} from "@/lib/calibrated-transition";

const augustaUtilitiesFacilitiesSource = {
  label: "Augusta Utilities Department — Facilities",
  href: "https://www.augustaga.gov/2214/Facilities",
  asOf: "retrieved 2026-08-27",
} as const;

export const highlandAvenueWaterTransitionContract: AdditiveBoundaryRatioTransitionContract = {
  kind: "additive-boundary-ratio",
  id: "BF-ECO-AUG-WATER-01",
  label: "Highland Avenue average-flow / design-capacity transition",
  domain: "water infrastructure",
  scope:
    "Highland Avenue surface-water treatment plant only. The baseline and boundary quantities are reported by Augusta Utilities for the same named plant.",
  baseline: {
    id: "highland-average-flow",
    label: "Reported average daily plant flow",
    symbol: "Q_0",
    unit: "MGD",
    role: "baseline",
    evidence: "observed",
    value: 24,
    source: augustaUtilitiesFacilitiesSource,
    scope: "Highland Avenue surface-water treatment plant",
  },
  boundary: {
    id: "highland-design-capacity",
    label: "Reported plant design capacity",
    symbol: "C_design",
    unit: "MGD",
    role: "boundary",
    evidence: "observed",
    value: 60,
    source: augustaUtilitiesFacilitiesSource,
    scope: "Highland Avenue surface-water treatment plant",
  },
  scenarioInput: {
    id: "highland-added-average-flow",
    label: "Hypothetical added average daily plant flow",
    symbol: "deltaQ",
    unit: "MGD",
    role: "scenario-input",
    evidence: "declared",
    scope: "Scenario declaration applied to Highland Avenue average daily plant flow",
  },
  scenarioQuantity: {
    id: "highland-scenario-average-flow",
    label: "Scenario average daily plant flow",
    symbol: "Q_1",
    unit: "MGD",
    role: "derived",
    evidence: "derived",
    scope: "Arithmetic scenario quantity for Highland Avenue only",
  },
  ratioQuantity: {
    id: "highland-flow-design-ratio",
    label: "Average-flow / reported-design-capacity ratio",
    symbol: "rho",
    unit: "ratio",
    role: "derived",
    evidence: "derived",
    scope: "Highland Avenue arithmetic ratio only",
  },
  remainderQuantity: {
    id: "highland-arithmetic-headroom",
    label: "Arithmetic remainder to reported design capacity",
    symbol: "H_arith",
    unit: "MGD",
    role: "derived",
    evidence: "derived",
    scope: "Difference between reported design capacity and scenario average flow",
  },
  equation: "rho_1 = (Q_0 + deltaQ) / C_design",
  admissibility: [
    "Baseline flow, scenario input, design-capacity boundary, scenario flow, and arithmetic remainder use the same MGD unit.",
    "Baseline and boundary quantities refer to the same named Highland Avenue treatment plant.",
    "The design-capacity boundary is finite and greater than zero.",
    "The scenario input is finite and non-negative.",
  ],
  uncertainty: [
    {
      class: "scope",
      label: "Plant scope only",
      description: "The transform does not represent Augusta's entire water supply or distribution system.",
    },
    {
      class: "operational",
      label: "Design capacity is not operating reserve",
      description: "Reported design capacity is used as an arithmetic boundary, not a claim about permissible continuous operation or reserve policy.",
    },
    {
      class: "temporal",
      label: "Average flow is not peak flow",
      description: "The baseline observation is reported average daily flow and does not capture peak or seasonal demand.",
    },
    {
      class: "model",
      label: "No demand forecast",
      description: "The hypothetical added flow is user-declared and is not inferred from demographic, industrial, or climate projections.",
    },
  ],
  unresolvedObservables: [
    "peak and seasonal plant flow",
    "operational reserve definition",
    "distribution-system constraints and losses",
    "groundwater and other supply contributions",
    "planned outages and maintenance constraints",
    "future demand timing and coincidence",
  ],
  claimBoundary:
    "This arithmetic ratio is not a system-wide utilization rate, peak-demand model, operational reserve margin, reliability estimate, or forecast of future capacity sufficiency.",
  interpretation: {
    notConfigured: "No hypothetical added average flow has been supplied; baseline observations remain unchanged.",
    inadmissibleInput: "Added-flow input must be a finite non-negative MGD quantity. No transition has been executed.",
    executed:
      "The declared hypothetical average flow remains arithmetically below the plant's reported design capacity. This does not establish operational reserve, peak sufficiency, or system-wide capacity.",
    boundaryCrossed:
      "The declared hypothetical average flow is arithmetically above the plant's reported design capacity. This is a representation-boundary crossing, not a prediction of failure or a statement about permissible operations.",
    contractInvalid:
      "The calibrated transition contract failed its own registration checks. No arithmetic transition may execute until units and boundary quantities are coherent.",
  },
};

export const highlandAvenueWaterCalibration = {
  id: highlandAvenueWaterTransitionContract.id,
  label: highlandAvenueWaterTransitionContract.label,
  sourceLabel: augustaUtilitiesFacilitiesSource.label,
  sourceHref: augustaUtilitiesFacilitiesSource.href,
  baselineAverageDailyFlowMgd: highlandAvenueWaterTransitionContract.baseline.value,
  reportedDesignCapacityMgd: highlandAvenueWaterTransitionContract.boundary.value,
  inputLabel: highlandAvenueWaterTransitionContract.scenarioInput.label,
  inputUnit: highlandAvenueWaterTransitionContract.scenarioInput.unit,
  equation: highlandAvenueWaterTransitionContract.equation,
  scope: highlandAvenueWaterTransitionContract.scope,
  claimBoundary: highlandAvenueWaterTransitionContract.claimBoundary,
  unresolvedObservables: highlandAvenueWaterTransitionContract.unresolvedObservables,
  admissibility: highlandAvenueWaterTransitionContract.admissibility,
  uncertainty: highlandAvenueWaterTransitionContract.uncertainty,
} as const;

export type HighlandWaterTransitionStatus =
  | "not-configured"
  | "contract-invalid"
  | "inadmissible-input"
  | "executed-arithmetic"
  | "reported-design-boundary-crossed";

export type HighlandWaterTransition = {
  status: HighlandWaterTransitionStatus;
  executed: boolean;
  inputMgd: number | null;
  baselineFlowMgd: number;
  designCapacityMgd: number;
  scenarioAverageFlowMgd: number | null;
  baselineRatio: number;
  scenarioRatio: number | null;
  arithmeticHeadroomMgd: number | null;
  equation: string;
  interpretation: string;
};

export function evaluateHighlandWaterTransition(input: string): HighlandWaterTransition {
  const result = executeAdditiveBoundaryRatioTransition(highlandAvenueWaterTransitionContract, input);
  const status: HighlandWaterTransitionStatus = result.status === "boundary-crossed"
    ? "reported-design-boundary-crossed"
    : result.status === "executed"
      ? "executed-arithmetic"
      : result.status;

  return {
    status,
    executed: result.executed,
    inputMgd: result.inputValue,
    baselineFlowMgd: result.baselineValue,
    designCapacityMgd: result.boundaryValue,
    scenarioAverageFlowMgd: result.scenarioValue,
    baselineRatio: result.baselineRatio ?? 0,
    scenarioRatio: result.scenarioRatio,
    arithmeticHeadroomMgd: result.arithmeticRemainder,
    equation: result.equation,
    interpretation: result.interpretation,
  };
}

export const formatWaterRatio = formatTransitionRatio;
