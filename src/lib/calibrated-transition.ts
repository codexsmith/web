export type CalibratedTransitionStatus =
  | "not-configured"
  | "contract-invalid"
  | "inadmissible-input"
  | "executed"
  | "boundary-crossed"
  | "balance-constraint-crossed";

export type TransitionQuantityEvidence = "observed" | "declared" | "derived";
export type TransitionQuantityRole = "baseline" | "boundary" | "scenario-input" | "derived";
export type TransitionUncertaintyClass = "measurement" | "scope" | "model" | "temporal" | "operational";

export type TransitionSource = {
  label: string;
  href?: string;
  asOf?: string;
};

export type TransitionQuantity = {
  id: string;
  label: string;
  symbol: string;
  unit: string;
  role: TransitionQuantityRole;
  evidence: TransitionQuantityEvidence;
  value?: number;
  source?: TransitionSource;
  scope: string;
};

export type TransitionUncertainty = {
  class: TransitionUncertaintyClass;
  label: string;
  description: string;
};

type TransitionContractBase = {
  id: string;
  label: string;
  domain: string;
  scope: string;
  equation: string;
  admissibility: string[];
  uncertainty: TransitionUncertainty[];
  unresolvedObservables: string[];
  claimBoundary: string;
};

export type AdditiveBoundaryRatioTransitionContract = TransitionContractBase & {
  kind: "additive-boundary-ratio";
  baseline: TransitionQuantity & { role: "baseline"; value: number };
  boundary: TransitionQuantity & { role: "boundary"; value: number };
  scenarioInput: TransitionQuantity & { role: "scenario-input" };
  scenarioQuantity: TransitionQuantity & { role: "derived" };
  ratioQuantity: TransitionQuantity & { role: "derived"; unit: "ratio" };
  remainderQuantity: TransitionQuantity & { role: "derived" };
  interpretation: {
    notConfigured: string;
    inadmissibleInput: string;
    executed: string;
    boundaryCrossed: string;
    contractInvalid: string;
  };
};

export type AdditiveStockTransitionContract = TransitionContractBase & {
  kind: "additive-stock";
  baseline: TransitionQuantity & { role: "baseline"; value: number };
  scenarioInput: TransitionQuantity & { role: "scenario-input" };
  scenarioQuantity: TransitionQuantity & { role: "derived" };
  interpretation: {
    notConfigured: string;
    inadmissibleInput: string;
    executed: string;
    contractInvalid: string;
  };
};

export type StockFlowBalanceTransitionContract = TransitionContractBase & {
  kind: "stock-flow-balance";
  baseline: TransitionQuantity & { role: "baseline"; value: number };
  admittedInput: TransitionQuantity & { role: "scenario-input" };
  resolvedInput: TransitionQuantity & { role: "scenario-input" };
  netChangeQuantity: TransitionQuantity & { role: "derived" };
  scenarioQuantity: TransitionQuantity & { role: "derived" };
  interpretation: {
    notConfigured: string;
    inadmissibleInput: string;
    executed: string;
    balanceConstraintCrossed: string;
    contractInvalid: string;
  };
};

export type CalibratedTransitionContract =
  | AdditiveBoundaryRatioTransitionContract
  | AdditiveStockTransitionContract
  | StockFlowBalanceTransitionContract;

export type AdditiveBoundaryRatioTransitionResult = {
  contractId: string;
  status:
    | "not-configured"
    | "contract-invalid"
    | "inadmissible-input"
    | "executed"
    | "boundary-crossed";
  executed: boolean;
  boundaryCrossed: boolean;
  inputValue: number | null;
  baselineValue: number;
  boundaryValue: number;
  scenarioValue: number | null;
  baselineRatio: number | null;
  scenarioRatio: number | null;
  arithmeticRemainder: number | null;
  equation: string;
  interpretation: string;
  claimBoundary: string;
  uncertainty: TransitionUncertainty[];
  unresolvedObservables: string[];
};

export type AdditiveStockTransitionResult = {
  contractId: string;
  status:
    | "not-configured"
    | "contract-invalid"
    | "inadmissible-input"
    | "executed";
  executed: boolean;
  inputValue: number | null;
  baselineValue: number;
  scenarioValue: number | null;
  equation: string;
  interpretation: string;
  claimBoundary: string;
  uncertainty: TransitionUncertainty[];
  unresolvedObservables: string[];
};

export type StockFlowBalanceTransitionResult = {
  contractId: string;
  status:
    | "not-configured"
    | "contract-invalid"
    | "inadmissible-input"
    | "executed"
    | "balance-constraint-crossed";
  executed: boolean;
  constraintCrossed: boolean;
  baselineValue: number;
  admittedValue: number | null;
  resolvedValue: number | null;
  netChangeValue: number | null;
  arithmeticNextValue: number | null;
  lawfulNextValue: number | null;
  equation: string;
  interpretation: string;
  claimBoundary: string;
  uncertainty: TransitionUncertainty[];
  unresolvedObservables: string[];
};

function boundaryRatioContractIsValid(contract: AdditiveBoundaryRatioTransitionContract) {
  const sameUnit =
    contract.baseline.unit === contract.boundary.unit
    && contract.baseline.unit === contract.scenarioInput.unit
    && contract.baseline.unit === contract.scenarioQuantity.unit
    && contract.baseline.unit === contract.remainderQuantity.unit;

  return sameUnit
    && Number.isFinite(contract.baseline.value)
    && Number.isFinite(contract.boundary.value)
    && contract.boundary.value > 0;
}

function additiveStockContractIsValid(contract: AdditiveStockTransitionContract) {
  const sameUnit =
    contract.baseline.unit === contract.scenarioInput.unit
    && contract.baseline.unit === contract.scenarioQuantity.unit;

  return sameUnit
    && Number.isFinite(contract.baseline.value)
    && contract.baseline.value >= 0;
}

function stockFlowBalanceContractIsValid(contract: StockFlowBalanceTransitionContract) {
  const sameUnit =
    contract.baseline.unit === contract.admittedInput.unit
    && contract.baseline.unit === contract.resolvedInput.unit
    && contract.baseline.unit === contract.netChangeQuantity.unit
    && contract.baseline.unit === contract.scenarioQuantity.unit;

  return sameUnit
    && Number.isFinite(contract.baseline.value)
    && contract.baseline.value >= 0;
}

export function executeAdditiveBoundaryRatioTransition(
  contract: AdditiveBoundaryRatioTransitionContract,
  rawInput: string,
): AdditiveBoundaryRatioTransitionResult {
  const baselineValue = contract.baseline.value;
  const boundaryValue = contract.boundary.value;
  const baselineRatio = boundaryValue > 0 ? baselineValue / boundaryValue : null;

  const common = {
    contractId: contract.id,
    baselineValue,
    boundaryValue,
    baselineRatio,
    equation: contract.equation,
    claimBoundary: contract.claimBoundary,
    uncertainty: contract.uncertainty,
    unresolvedObservables: contract.unresolvedObservables,
  };

  if (!boundaryRatioContractIsValid(contract)) {
    return {
      ...common,
      status: "contract-invalid",
      executed: false,
      boundaryCrossed: false,
      inputValue: null,
      scenarioValue: null,
      scenarioRatio: null,
      arithmeticRemainder: null,
      interpretation: contract.interpretation.contractInvalid,
    };
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      ...common,
      status: "not-configured",
      executed: false,
      boundaryCrossed: false,
      inputValue: null,
      scenarioValue: null,
      scenarioRatio: null,
      arithmeticRemainder: null,
      interpretation: contract.interpretation.notConfigured,
    };
  }

  const inputValue = Number(trimmed);
  if (!Number.isFinite(inputValue) || inputValue < 0) {
    return {
      ...common,
      status: "inadmissible-input",
      executed: false,
      boundaryCrossed: false,
      inputValue: Number.isFinite(inputValue) ? inputValue : null,
      scenarioValue: null,
      scenarioRatio: null,
      arithmeticRemainder: null,
      interpretation: contract.interpretation.inadmissibleInput,
    };
  }

  const scenarioValue = baselineValue + inputValue;
  const scenarioRatio = scenarioValue / boundaryValue;
  const arithmeticRemainder = boundaryValue - scenarioValue;
  const boundaryCrossed = scenarioValue > boundaryValue;

  return {
    ...common,
    status: boundaryCrossed ? "boundary-crossed" : "executed",
    executed: true,
    boundaryCrossed,
    inputValue,
    scenarioValue,
    scenarioRatio,
    arithmeticRemainder,
    interpretation: boundaryCrossed
      ? contract.interpretation.boundaryCrossed
      : contract.interpretation.executed,
  };
}

export function executeAdditiveStockTransition(
  contract: AdditiveStockTransitionContract,
  rawInput: string,
): AdditiveStockTransitionResult {
  const baselineValue = contract.baseline.value;
  const common = {
    contractId: contract.id,
    baselineValue,
    equation: contract.equation,
    claimBoundary: contract.claimBoundary,
    uncertainty: contract.uncertainty,
    unresolvedObservables: contract.unresolvedObservables,
  };

  if (!additiveStockContractIsValid(contract)) {
    return {
      ...common,
      status: "contract-invalid",
      executed: false,
      inputValue: null,
      scenarioValue: null,
      interpretation: contract.interpretation.contractInvalid,
    };
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      ...common,
      status: "not-configured",
      executed: false,
      inputValue: null,
      scenarioValue: null,
      interpretation: contract.interpretation.notConfigured,
    };
  }

  const inputValue = Number(trimmed);
  if (!Number.isFinite(inputValue) || inputValue < 0) {
    return {
      ...common,
      status: "inadmissible-input",
      executed: false,
      inputValue: Number.isFinite(inputValue) ? inputValue : null,
      scenarioValue: null,
      interpretation: contract.interpretation.inadmissibleInput,
    };
  }

  return {
    ...common,
    status: "executed",
    executed: true,
    inputValue,
    scenarioValue: baselineValue + inputValue,
    interpretation: contract.interpretation.executed,
  };
}

export function executeStockFlowBalanceTransition(
  contract: StockFlowBalanceTransitionContract,
  rawInputs: { admitted: string; resolved: string },
): StockFlowBalanceTransitionResult {
  const baselineValue = contract.baseline.value;
  const common = {
    contractId: contract.id,
    baselineValue,
    equation: contract.equation,
    claimBoundary: contract.claimBoundary,
    uncertainty: contract.uncertainty,
    unresolvedObservables: contract.unresolvedObservables,
  };

  if (!stockFlowBalanceContractIsValid(contract)) {
    return {
      ...common,
      status: "contract-invalid",
      executed: false,
      constraintCrossed: false,
      admittedValue: null,
      resolvedValue: null,
      netChangeValue: null,
      arithmeticNextValue: null,
      lawfulNextValue: null,
      interpretation: contract.interpretation.contractInvalid,
    };
  }

  const admittedText = rawInputs.admitted.trim();
  const resolvedText = rawInputs.resolved.trim();

  if (!admittedText || !resolvedText) {
    return {
      ...common,
      status: "not-configured",
      executed: false,
      constraintCrossed: false,
      admittedValue: null,
      resolvedValue: null,
      netChangeValue: null,
      arithmeticNextValue: null,
      lawfulNextValue: null,
      interpretation: contract.interpretation.notConfigured,
    };
  }

  const admittedValue = Number(admittedText);
  const resolvedValue = Number(resolvedText);
  const admissibleInputs =
    Number.isFinite(admittedValue)
    && admittedValue >= 0
    && Number.isFinite(resolvedValue)
    && resolvedValue >= 0;

  if (!admissibleInputs) {
    return {
      ...common,
      status: "inadmissible-input",
      executed: false,
      constraintCrossed: false,
      admittedValue: Number.isFinite(admittedValue) ? admittedValue : null,
      resolvedValue: Number.isFinite(resolvedValue) ? resolvedValue : null,
      netChangeValue: null,
      arithmeticNextValue: null,
      lawfulNextValue: null,
      interpretation: contract.interpretation.inadmissibleInput,
    };
  }

  const netChangeValue = admittedValue - resolvedValue;
  const arithmeticNextValue = baselineValue + netChangeValue;
  const constraintCrossed = arithmeticNextValue < 0;

  return {
    ...common,
    status: constraintCrossed ? "balance-constraint-crossed" : "executed",
    executed: true,
    constraintCrossed,
    admittedValue,
    resolvedValue,
    netChangeValue,
    arithmeticNextValue,
    lawfulNextValue: constraintCrossed ? null : arithmeticNextValue,
    interpretation: constraintCrossed
      ? contract.interpretation.balanceConstraintCrossed
      : contract.interpretation.executed,
  };
}

export function formatTransitionRatio(value: number | null, digits = 1) {
  return value == null ? "—" : `${(value * 100).toFixed(digits)}%`;
}
