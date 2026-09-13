import type {
  StockFlowBalanceTransitionContract,
  TransitionQuantity,
  TransitionSource,
} from "@/lib/calibrated-transition";

export type ReplacementBacklogContractInput = {
  id: string;
  label: string;
  domain: string;
  scope: string;
  unit: string;
  baselineValue: number;
  baselineLabel: string;
  baselineSymbol?: string;
  source: TransitionSource;
  admittedLabel?: string;
  admittedSymbol?: string;
  resolvedLabel?: string;
  resolvedSymbol?: string;
  unresolvedObservables: string[];
  claimBoundary: string;
};

function quantity(
  id: string,
  label: string,
  symbol: string,
  unit: string,
  role: TransitionQuantity["role"],
  evidence: TransitionQuantity["evidence"],
  scope: string,
): TransitionQuantity {
  return { id, label, symbol, unit, role, evidence, scope };
}

export function createReplacementBacklogTransitionContract(
  input: ReplacementBacklogContractInput,
): StockFlowBalanceTransitionContract {
  const prefix = input.id.toLowerCase();

  return {
    kind: "stock-flow-balance",
    id: input.id,
    label: input.label,
    domain: input.domain,
    scope: input.scope,
    baseline: {
      ...quantity(
        `${prefix}-baseline`,
        input.baselineLabel,
        input.baselineSymbol ?? "B_t",
        input.unit,
        "baseline",
        "observed",
        input.scope,
      ),
      role: "baseline",
      value: input.baselineValue,
      source: input.source,
    },
    admittedInput: {
      ...quantity(
        `${prefix}-admitted`,
        input.admittedLabel ?? "Newly admitted replacement / maintenance work",
        input.admittedSymbol ?? "A_t",
        input.unit,
        "scenario-input",
        "declared",
        input.scope,
      ),
      role: "scenario-input",
    },
    resolvedInput: {
      ...quantity(
        `${prefix}-resolved`,
        input.resolvedLabel ?? "Resolved replacement / maintenance work",
        input.resolvedSymbol ?? "R_t",
        input.unit,
        "scenario-input",
        "declared",
        input.scope,
      ),
      role: "scenario-input",
    },
    netChangeQuantity: {
      ...quantity(
        `${prefix}-net-change`,
        "Net backlog change",
        "DeltaB_t",
        input.unit,
        "derived",
        "derived",
        input.scope,
      ),
      role: "derived",
    },
    scenarioQuantity: {
      ...quantity(
        `${prefix}-next`,
        "Next-period replacement / maintenance backlog",
        "B_t+1",
        input.unit,
        "derived",
        "derived",
        input.scope,
      ),
      role: "derived",
    },
    equation: "B_(t+1) = B_t + A_t - R_t",
    admissibility: [
      "Baseline backlog, admitted work, resolved work, net change, and next-period backlog use the same accounting unit.",
      "Baseline backlog is source-bound, finite, and non-negative.",
      "Admitted and resolved quantities are both explicit finite non-negative declarations; blank is not treated as zero.",
      "A negative arithmetic next-period backlog is exposed as a balance-constraint crossing rather than clamped silently to zero.",
      "Admission and resolution use the same inclusion criteria, scope, and period boundary as the baseline stock.",
    ],
    uncertainty: [
      {
        class: "scope",
        label: "Backlog definition controls the model",
        description: "Changing what counts as admitted or resolved work changes the state variable itself; inclusion criteria must remain explicit.",
      },
      {
        class: "temporal",
        label: "Period boundary is material",
        description: "Admissions and resolutions must belong to a declared time interval before the recurrence can be interpreted as state evolution.",
      },
      {
        class: "model",
        label: "Quantity closure is not consequence closure",
        description: "A reduced backlog stock does not by itself establish improved condition, reliability, access, cost, or avoided failure.",
      },
      {
        class: "operational",
        label: "Resolution must be verified",
        description: "Authorized, funded, scheduled, started, and completed work are distinct states and must not be collapsed into resolved work without a chosen closure rule.",
      },
    ],
    unresolvedObservables: input.unresolvedObservables,
    claimBoundary: input.claimBoundary,
    interpretation: {
      notConfigured:
        "The recurrence is blocked until both admitted work and resolved work are explicitly declared. Omitted flows are not silently interpreted as zero.",
      inadmissibleInput:
        "Admitted and resolved work must each be finite non-negative quantities on the contract's declared accounting basis.",
      executed:
        "The next-period backlog has been computed by explicit stock-flow accounting. This is state evolution of the declared backlog variable, not a forecast of physical condition or service consequence.",
      balanceConstraintCrossed:
        "Declared resolution exceeds the baseline plus newly admitted backlog on this accounting basis. The negative arithmetic result is preserved as a constraint violation rather than silently clamped to zero; reconcile the scope, baseline, admissions, or resolution evidence.",
      contractInvalid:
        "The replacement/backlog contract failed registration checks. No recurrence may execute until baseline and flow quantities use a coherent accounting unit and non-negative source-bound baseline.",
    },
  };
}
