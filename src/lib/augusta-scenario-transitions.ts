export type AugustaScenarioControlId =
  | "maintenance-allocation"
  | "replacement-timing"
  | "capacity-load"
  | "institutional-continuity"
  | "household-burden";

export type AugustaScenarioOptionPosture = "baseline" | "intervention" | "stress";

export type AugustaScenarioOption = {
  id: string;
  label: string;
  posture: AugustaScenarioOptionPosture;
  description: string;
  affectedNodeIds: string[];
  affectedEdgeIds: string[];
  admissibility: string[];
  observables: string[];
  unresolved: string[];
};

export type AugustaScenarioControl = {
  id: AugustaScenarioControlId;
  label: string;
  shortLabel: string;
  question: string;
  description: string;
  baselineOptionId: string;
  options: AugustaScenarioOption[];
};

export type AugustaScenarioSelections = Record<AugustaScenarioControlId, string>;

export type AugustaScenarioEvaluation = {
  status: "baseline-only" | "assumptions-declared";
  transitionStatus: "NOT EXECUTED";
  forecastStatus: "NOT A FORECAST";
  activeOptions: Array<{
    control: AugustaScenarioControl;
    option: AugustaScenarioOption;
  }>;
  affectedNodeIds: string[];
  affectedEdgeIds: string[];
  admissibility: string[];
  observables: string[];
  unresolved: string[];
};

export const augustaScenarioContract = {
  id: "BF-ECO-AUG-SCENARIO-01",
  label: "Scenario transition contract",
  rule:
    "A scenario may declare interventions, affected objects, and consequence paths before a calibrated model exists. It may not fabricate changed measurements, probabilities, or forecast outcomes.",
  executionBoundary:
    "The first executable layer is consequence bookkeeping: input -> admissibility -> affected state -> consequence paths -> required observables -> unresolved remainder. Numerical state transition functions remain explicitly unwired.",
} as const;

export const augustaScenarioControls: AugustaScenarioControl[] = [
  {
    id: "maintenance-allocation",
    label: "Maintenance allocation",
    shortLabel: "Maintenance",
    question: "Where does repair capacity enter the system?",
    description:
      "Changes the declared maintenance posture without assuming a dollar amount, backlog reduction, or failure-rate improvement.",
    baselineOptionId: "maintenance-baseline",
    options: [
      {
        id: "maintenance-baseline",
        label: "Current baseline",
        posture: "baseline",
        description: "Retain the current observation frame. No hypothetical maintenance posture is applied.",
        affectedNodeIds: [],
        affectedEdgeIds: [],
        admissibility: [],
        observables: [],
        unresolved: [],
      },
      {
        id: "maintenance-preventive",
        label: "Preventive priority",
        posture: "intervention",
        description: "Declare preventive maintenance and renewal as an upstream priority across represented material and civic systems.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport", "rcss"],
        affectedEdgeIds: ["water-households", "power-households", "transport-rcss", "transport-households"],
        admissibility: [
          "Asset- or system-specific maintenance requirement is identified.",
          "Responsible operator and intervention authority are known.",
          "Preventive work can be distinguished from emergency repair in the source data.",
        ],
        observables: [
          "identified maintenance requirement",
          "preventive work executed",
          "emergency repair incidence",
          "service interruption or access disruption",
        ],
        unresolved: [
          "required funding magnitude",
          "asset-specific intervention sequence",
          "effect size and time-to-effect",
        ],
      },
      {
        id: "maintenance-reactive",
        label: "Reactive priority",
        posture: "stress",
        description: "Declare a posture in which repair capacity is preferentially consumed after defects become operationally visible.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport", "rcss", "augusta-households"],
        affectedEdgeIds: ["water-households", "power-households", "transport-rcss", "transport-households", "rcss-households"],
        admissibility: [
          "Reactive and preventive work are separately observable.",
          "Failure or service-interruption events can be associated with affected systems.",
        ],
        observables: [
          "emergency repair incidence",
          "restoration time",
          "deferred work remaining",
          "household-facing service disruption",
        ],
        unresolved: [
          "failure probability",
          "repair-cost differential",
          "household burden magnitude",
        ],
      },
    ],
  },
  {
    id: "replacement-timing",
    label: "Replacement timing",
    shortLabel: "Replacement",
    question: "When is renewal allowed to occur?",
    description:
      "Declares whether replacement is advanced or deferred relative to an as-yet-unwired asset lifecycle model.",
    baselineOptionId: "replacement-baseline",
    options: [
      {
        id: "replacement-baseline",
        label: "Current baseline",
        posture: "baseline",
        description: "No hypothetical replacement schedule is applied.",
        affectedNodeIds: [],
        affectedEdgeIds: [],
        admissibility: [],
        observables: [],
        unresolved: [],
      },
      {
        id: "replacement-advance",
        label: "Advance renewal",
        posture: "intervention",
        description: "Declare earlier renewal as a scenario assumption for systems with established replacement criteria.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport"],
        affectedEdgeIds: ["water-households", "power-households", "transport-households"],
        admissibility: [
          "Replacement criteria and expected service life are defined.",
          "Current condition and remaining-life evidence exist at the relevant asset boundary.",
          "Capital authority and procurement path are represented.",
        ],
        observables: ["remaining service life", "replacement completion", "capital outlay", "post-renewal service state"],
        unresolved: ["replacement cost", "optimal timing", "avoided failure or repair burden"],
      },
      {
        id: "replacement-defer",
        label: "Defer renewal",
        posture: "stress",
        description: "Declare delayed renewal without converting delay into a predicted failure event.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport", "augusta-households"],
        affectedEdgeIds: ["water-households", "power-households", "transport-households"],
        admissibility: [
          "A replacement trigger or expected service-life boundary exists.",
          "Deferral duration can eventually be specified against that boundary.",
        ],
        observables: ["condition trajectory", "maintenance demand", "service interruption", "eventual replacement timing"],
        unresolved: ["failure probability", "deferral duration", "cost escalation", "downstream consequence magnitude"],
      },
    ],
  },
  {
    id: "capacity-load",
    label: "Capacity and load",
    shortLabel: "Load",
    question: "How does demand change relative to reserve?",
    description:
      "Declares a load posture while preserving the distinction between design capacity, average flow, usable reserve, and actual future demand.",
    baselineOptionId: "load-baseline",
    options: [
      {
        id: "load-baseline",
        label: "Current baseline",
        posture: "baseline",
        description: "Keep current source-scoped capacity and flow observations unchanged.",
        affectedNodeIds: [],
        affectedEdgeIds: [],
        admissibility: [],
        observables: [],
        unresolved: [],
      },
      {
        id: "load-reserve",
        label: "Protect reserve",
        posture: "intervention",
        description: "Declare reserve preservation as a constraint on future load admission and system expansion.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport"],
        affectedEdgeIds: ["water-households", "power-households", "transport-households"],
        admissibility: [
          "Operational reserve is defined independently from design capacity.",
          "Load admission or growth decisions can be associated with the represented system.",
        ],
        observables: ["peak load", "usable reserve", "capacity additions", "constraint violations"],
        unresolved: ["reserve threshold", "future demand", "cross-system substitution effects"],
      },
      {
        id: "load-growth",
        label: "Add load",
        posture: "stress",
        description: "Declare additional demand entering the represented systems without inventing its magnitude or timing.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport", "rcss", "augusta-households"],
        affectedEdgeIds: ["water-households", "power-households", "transport-rcss", "transport-households", "rcss-households"],
        admissibility: [
          "The added load has a defined source, boundary, and service requirements.",
          "Relevant capacity and reserve measures exist before a feasibility claim is made.",
        ],
        observables: ["added service demand", "peak load", "reserve margin", "access or service congestion"],
        unresolved: ["load magnitude", "arrival schedule", "capacity expansion requirement", "household distribution of effects"],
      },
    ],
  },
  {
    id: "institutional-continuity",
    label: "Institutional continuity",
    shortLabel: "Institutions",
    question: "What capability infrastructure must remain reproducible?",
    description:
      "Treats institutional continuity as maintainable capacity without converting historical importance into a quantified causal effect.",
    baselineOptionId: "institution-baseline",
    options: [
      {
        id: "institution-baseline",
        label: "Current baseline",
        posture: "baseline",
        description: "No hypothetical continuity intervention is applied.",
        affectedNodeIds: [],
        affectedEdgeIds: [],
        admissibility: [],
        observables: [],
        unresolved: [],
      },
      {
        id: "institution-preserve",
        label: "Preserve continuity",
        posture: "intervention",
        description: "Declare continuity, repair capacity, and institutional memory as protected scenario requirements.",
        affectedNodeIds: ["rcss", "black-augusta-ecology", "paine-college", "haines-institute", "tabernacle-baptist", "ct-walker-school", "golden-blocks"],
        affectedEdgeIds: ["rcss-households", "paine-ecology", "haines-ecology", "tabernacle-ecology"],
        admissibility: [
          "The function being preserved is distinguished from the building, organization, or label that currently carries it.",
          "Historical correspondence is not treated as proof of direct causal lineage.",
        ],
        observables: ["institutional function retained", "access continuity", "maintainer capacity", "archival or organizational continuity"],
        unresolved: ["causal contribution", "minimum viable institutional form", "resource requirement", "function substitution"],
      },
      {
        id: "institution-migrate",
        label: "Allow function migration",
        posture: "stress",
        description: "Declare that institutional functions may move, consolidate, or be displaced, while requiring the lost/replaced function to remain visible in consequence accounting.",
        affectedNodeIds: ["rcss", "black-augusta-ecology", "augusta-households"],
        affectedEdgeIds: ["rcss-households", "paine-ecology", "haines-ecology", "tabernacle-ecology"],
        admissibility: [
          "The institutional function is separately represented from its current carrier.",
          "Replacement, consolidation, or displacement paths are explicitly named.",
        ],
        observables: ["function retained or lost", "access distance or friction", "maintainer continuity", "household substitution work"],
        unresolved: ["equivalence of replacement function", "transition cost", "cultural or capability loss", "distribution of burden"],
      },
    ],
  },
  {
    id: "household-burden",
    label: "Household burden transfer",
    shortLabel: "Households",
    question: "Where is unresolved work allowed to land?",
    description:
      "Declares how unresolved operational work is treated at the household boundary without inventing an aggregate burden score.",
    baselineOptionId: "household-baseline",
    options: [
      {
        id: "household-baseline",
        label: "Current baseline",
        posture: "baseline",
        description: "Retain the current explicit NO SIGNAL posture for aggregate household burden.",
        affectedNodeIds: [],
        affectedEdgeIds: [],
        admissibility: [],
        observables: [],
        unresolved: [],
      },
      {
        id: "household-upstream-close",
        label: "Close upstream",
        posture: "intervention",
        description: "Declare that repair, administrative, and service obligations should be resolved upstream before they are counted as household work.",
        affectedNodeIds: ["savannah-water", "georgia-power-system", "augusta-transport", "rcss", "augusta-households"],
        affectedEdgeIds: ["water-households", "power-households", "transport-households", "rcss-households"],
        admissibility: [
          "Household-facing obligations can be distinguished from provider or institutional obligations.",
          "Transferred work is observable rather than silently excluded from the system boundary.",
        ],
        observables: ["household administrative work", "out-of-pocket repair or workaround cost", "access time", "service restoration work"],
        unresolved: ["aggregate burden magnitude", "distribution across households", "value of unpaid time", "substitution behavior"],
      },
      {
        id: "household-pass-through",
        label: "Permit pass-through",
        posture: "stress",
        description: "Declare unresolved work as allowed to cross into households, while forcing that transfer to remain visible as an open consequence.",
        affectedNodeIds: ["augusta-households"],
        affectedEdgeIds: ["water-households", "power-households", "transport-households", "rcss-households"],
        admissibility: [
          "The transferred obligation can be named at the boundary where it leaves the provider or institution.",
          "A household endpoint exists for consequence accounting.",
        ],
        observables: ["time shifted to households", "direct household expenditure", "travel or access workaround", "administrative steps transferred"],
        unresolved: ["burden valuation", "who bears the transfer", "adaptation or failure to adapt", "long-run capability effect"],
      },
    ],
  },
];

export function getDefaultAugustaScenarioSelections(): AugustaScenarioSelections {
  return Object.fromEntries(
    augustaScenarioControls.map((control) => [control.id, control.baselineOptionId]),
  ) as AugustaScenarioSelections;
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

export function evaluateAugustaScenario(selections: AugustaScenarioSelections): AugustaScenarioEvaluation {
  const activeOptions = augustaScenarioControls
    .map((control) => {
      const option = control.options.find((candidate) => candidate.id === selections[control.id])
        ?? control.options.find((candidate) => candidate.id === control.baselineOptionId)!;
      return { control, option };
    })
    .filter(({ option }) => option.posture !== "baseline");

  return {
    status: activeOptions.length ? "assumptions-declared" : "baseline-only",
    transitionStatus: "NOT EXECUTED",
    forecastStatus: "NOT A FORECAST",
    activeOptions,
    affectedNodeIds: unique(activeOptions.flatMap(({ option }) => option.affectedNodeIds)),
    affectedEdgeIds: unique(activeOptions.flatMap(({ option }) => option.affectedEdgeIds)),
    admissibility: unique(activeOptions.flatMap(({ option }) => option.admissibility)),
    observables: unique(activeOptions.flatMap(({ option }) => option.observables)),
    unresolved: unique(activeOptions.flatMap(({ option }) => option.unresolved)),
  };
}
