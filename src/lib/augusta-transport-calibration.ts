import {
  executeAdditiveStockTransition,
  type AdditiveStockTransitionContract,
} from "@/lib/calibrated-transition";

const augustaRoadwayResurfacingSource = {
  label: "Augusta Engineering — Roadway Resurfacing Program",
  href: "https://www.augustaga.gov/178/Roadway-Resurfacing-Program",
  asOf: "retrieved 2026-08-27",
} as const;

export const augustaResurfacingTransitionContract: AdditiveStockTransitionContract = {
  kind: "additive-stock",
  id: "BF-ECO-AUG-ROAD-01",
  label: "Augusta resurfaced-road mileage stock transition",
  domain: "transportation maintenance",
  scope:
    "Augusta-Richmond County Roadway Resurfacing Program output funded by the Sales Tax Program. The published baseline is cumulative resurfaced road mileage, not total network mileage or pavement condition.",
  baseline: {
    id: "augusta-resurfaced-miles",
    label: "Published cumulative resurfaced road mileage",
    symbol: "M_0",
    unit: "road-mi",
    role: "baseline",
    evidence: "observed",
    value: 119.6,
    source: augustaRoadwayResurfacingSource,
    scope: "Roads resurfaced by contracts funded by Augusta's Sales Tax Program",
  },
  scenarioInput: {
    id: "augusta-added-resurfacing-miles",
    label: "Hypothetical additional resurfacing mileage",
    symbol: "deltaM",
    unit: "road-mi",
    role: "scenario-input",
    evidence: "declared",
    scope: "Declared additional roadway resurfacing output under the same mileage accounting basis",
  },
  scenarioQuantity: {
    id: "augusta-scenario-resurfaced-miles",
    label: "Scenario cumulative resurfaced road mileage",
    symbol: "M_1",
    unit: "road-mi",
    role: "derived",
    evidence: "derived",
    scope: "Arithmetic cumulative resurfacing stock only",
  },
  equation: "M_1 = M_0 + deltaM",
  admissibility: [
    "Baseline and scenario input use the same road-mile accounting unit.",
    "Scenario input is finite and non-negative.",
    "The transform preserves the source program's cumulative-output meaning rather than converting mileage into a pavement-condition score.",
  ],
  uncertainty: [
    {
      class: "scope",
      label: "Program output is not network coverage",
      description: "The public source does not provide a denominator for total eligible or total paved road mileage on the same accounting basis.",
    },
    {
      class: "model",
      label: "Treatment mileage is not condition improvement",
      description: "A resurfaced mile cannot be converted into a citywide pavement-condition change without road-level before/after condition observations and weighting rules.",
    },
    {
      class: "temporal",
      label: "Cumulative stock lacks treatment age",
      description: "The published total does not encode when each road segment was resurfaced, so deterioration since treatment is unresolved.",
    },
    {
      class: "operational",
      label: "Road miles are not lane miles",
      description: "The source reports road mileage; lane count, treatment depth, reconstruction class, and cost intensity may vary substantially by segment.",
    },
  ],
  unresolvedObservables: [
    "total paved-road mileage on the same accounting basis",
    "road-level condition ratings and rating scale",
    "pre-treatment and post-treatment condition",
    "treatment dates and deterioration curves",
    "lane count and lane-mile equivalents",
    "treatment type and depth",
    "cost per treated mile and funding period",
    "remaining rated resurfacing backlog",
  ],
  claimBoundary:
    "This transition measures cumulative resurfacing output only. It does not establish the fraction of Augusta roads in good condition, the fraction of the network treated, remaining backlog, avoided failures, or future pavement condition.",
  interpretation: {
    notConfigured: "No hypothetical additional resurfacing mileage has been supplied; the published cumulative treatment stock remains unchanged.",
    inadmissibleInput: "Additional resurfacing mileage must be a finite non-negative road-mile quantity. No transition has been executed.",
    executed:
      "The declared additional mileage has been added to the published cumulative resurfacing stock. This is maintenance-output accounting, not a derived pavement-condition improvement or network-completion percentage.",
    contractInvalid:
      "The resurfacing transition contract failed its registration checks. No arithmetic transition may execute until quantity units and baseline stock are coherent.",
  },
};

export const augustaResurfacingCalibration = {
  id: augustaResurfacingTransitionContract.id,
  label: augustaResurfacingTransitionContract.label,
  sourceLabel: augustaRoadwayResurfacingSource.label,
  sourceHref: augustaRoadwayResurfacingSource.href,
  baselineMiles: augustaResurfacingTransitionContract.baseline.value,
  equation: augustaResurfacingTransitionContract.equation,
  scope: augustaResurfacingTransitionContract.scope,
  claimBoundary: augustaResurfacingTransitionContract.claimBoundary,
  unresolvedObservables: augustaResurfacingTransitionContract.unresolvedObservables,
} as const;

export function evaluateAugustaResurfacingTransition(input: string) {
  return executeAdditiveStockTransition(augustaResurfacingTransitionContract, input);
}
