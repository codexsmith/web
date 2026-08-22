import type { ContentNode, NodeKind } from "@/lib/content";
import { nodes } from "@/lib/content";
import { getSemanticEvents, type SemanticEventType } from "@/lib/semantic-events";

export const processStageIds = [
  "intake",
  "boundary",
  "representation",
  "hypothesis",
  "construction",
  "execution",
  "validation",
  "repair",
  "promotion",
] as const;

export type ProcessStageId = (typeof processStageIds)[number];

export type ProcessStage = {
  id: ProcessStageId;
  label: string;
  shortLabel: string;
  question: string;
  output: string;
};

export const processStages: ProcessStage[] = [
  {
    id: "intake",
    label: "Intake / Observe",
    shortLabel: "Intake",
    question: "What is actually here, and what uncertainty or pressure made it worth examining?",
    output: "Observed domain state, source material, unresolved need, or candidate problem.",
  },
  {
    id: "boundary",
    label: "Boundary / Constraint",
    shortLabel: "Bound",
    question: "What is inside the problem, what is outside it, and which constraints must remain explicit?",
    output: "Boundary map, actors, admissible states, invariants, exclusions, and claim ceilings.",
  },
  {
    id: "representation",
    label: "Representation / Model",
    shortLabel: "Represent",
    question: "What representation preserves the distinctions required to reason and act without hiding consequence?",
    output: "Executable schema, model, grammar, map, interface, or other inspectable representation.",
  },
  {
    id: "hypothesis",
    label: "Hypothesis / Claim",
    shortLabel: "Hypothesize",
    question: "What do we think the representation lets us explain, predict, repair, or build?",
    output: "Bounded hypothesis, candidate claim, acceptance condition, or falsifiable research question.",
  },
  {
    id: "construction",
    label: "Construction / Prototype",
    shortLabel: "Construct",
    question: "What is the smallest coherent artifact that makes the hypothesis executable or inspectable?",
    output: "Prototype, proof object, method, simulation, dataset, software slice, or working artifact.",
  },
  {
    id: "execution",
    label: "Execution / Delivery",
    shortLabel: "Execute",
    question: "Can the artifact run, reach a meaningful user or environment, and carry consequence under real constraints?",
    output: "Executable path, bounded delivery, pilot surface, deployment, or operational use.",
  },
  {
    id: "validation",
    label: "Validation / Measurement",
    shortLabel: "Validate",
    question: "What does reality say back, including negative evidence and states the model failed to represent?",
    output: "Measurements, tests, observations, review, counterexamples, failures, and retained evidence.",
  },
  {
    id: "repair",
    label: "Repair / Learning",
    shortLabel: "Repair",
    question: "Which boundary, representation, assumption, artifact, or operating rule must change?",
    output: "Defect ledger, revised model, corrected artifact, new constraint, pivot, or explicit retirement decision.",
  },
  {
    id: "promotion",
    label: "Promotion / Stewardship",
    shortLabel: "Promote",
    question: "What may now be claimed, published, shipped, maintained, transferred, superseded, or retired?",
    output: "Promoted claim, public artifact, shipped work, maintained capability, supersession, or archival standing.",
  },
];

export type ProcessDisciplineId =
  | "agentic"
  | "lean"
  | "agile"
  | "scientific"
  | "computational"
  | "constructive";

export type ProcessDiscipline = {
  id: ProcessDisciplineId;
  label: string;
  role: string;
  stages: ProcessStageId[];
};

/**
 * BFL operating synthesis. These are overlapping disciplines, not sequential phases.
 * The process stages above are the temporal/operational loop; these lenses explain how
 * BFL performs work inside that loop.
 */
export const processDisciplines: ProcessDiscipline[] = [
  {
    id: "agentic",
    label: "Agentic",
    role: "Agents scale search, synthesis, execution, checking, and repair while authority and claim promotion remain bounded.",
    stages: ["intake", "representation", "construction", "execution", "validation", "repair"],
  },
  {
    id: "lean",
    label: "Lean Startup",
    role: "Build the smallest coherent thing that can produce validated learning before scaling cost, scope, or institutional commitment.",
    stages: ["intake", "boundary", "hypothesis", "construction", "validation", "repair", "promotion"],
  },
  {
    id: "agile",
    label: "Agile",
    role: "Use bounded closure attempts, demonstrations, refinement, and retrospectives to adapt delivery under evidence rather than plan fiction.",
    stages: ["boundary", "construction", "execution", "validation", "repair"],
  },
  {
    id: "scientific",
    label: "Scientific",
    role: "Treat hypotheses, measurements, counterexamples, and negative results as first-class constraints on what may be claimed next.",
    stages: ["intake", "boundary", "hypothesis", "validation", "repair", "promotion"],
  },
  {
    id: "computational",
    label: "Computational",
    role: "Turn representations into executable, simulable, searchable, measurable systems so hidden assumptions can fail visibly.",
    stages: ["representation", "construction", "execution", "validation", "repair"],
  },
  {
    id: "constructive",
    label: "Constructive",
    role: "Force understanding into artifacts, proofs, prototypes, schemas, and systems that can be inspected, tested, and repaired.",
    stages: ["representation", "hypothesis", "construction", "execution", "promotion"],
  },
];

export const processScopes = ["full", "phase", "local"] as const;
export type ProcessScope = (typeof processScopes)[number];

export const processScopeLabels: Record<ProcessScope, string> = {
  full: "Full loop",
  phase: "Phase context",
  local: "Local placement",
};

export function parseProcessScope(value: string | string[] | undefined): ProcessScope | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return processScopes.includes(candidate as ProcessScope) ? (candidate as ProcessScope) : undefined;
}

type StageScore = {
  score: number;
  reasons: string[];
};

export type ProcessPlacement = {
  nodeId: string;
  primaryStage: ProcessStageId;
  activeStages: ProcessStageId[];
  stageScores: Record<ProcessStageId, number>;
  reasons: Record<ProcessStageId, string[]>;
  basis: "declared-and-derived" | "derived";
};

const kindStageWeights: Partial<Record<NodeKind, Partial<Record<ProcessStageId, number>>>> = {
  root: { representation: 4, promotion: 2 },
  branch: { representation: 4, promotion: 2 },
  product: { construction: 4, execution: 3 },
  service: { construction: 3, execution: 4, validation: 2 },
  project: { intake: 2, construction: 4, execution: 3 },
  research: { hypothesis: 4, validation: 3, representation: 2 },
  method: { representation: 3, construction: 3, promotion: 3 },
  standard: { representation: 3, validation: 2, promotion: 4 },
  foundation: { representation: 4, hypothesis: 3 },
  theory: { representation: 3, hypothesis: 5, validation: 2 },
  about: { representation: 4, promotion: 2 },
  document: { representation: 4, promotion: 2 },
};

const eventStageMap: Record<SemanticEventType, ProcessStageId[]> = {
  introduced: ["intake"],
  developed: ["construction"],
  piloted: ["execution", "validation"],
  validated: ["validation"],
  shipped: ["execution", "promotion"],
  revised: ["repair"],
  superseded: ["repair", "promotion"],
  retired: ["promotion"],
  reopened: ["intake", "repair"],
  "standing-recorded": ["promotion"],
  "evidence-attached": ["validation"],
  "claim-ceiling-set": ["boundary"],
};

function freshScores(): Record<ProcessStageId, StageScore> {
  return {
    intake: { score: 0, reasons: [] },
    boundary: { score: 0, reasons: [] },
    representation: { score: 0, reasons: [] },
    hypothesis: { score: 0, reasons: [] },
    construction: { score: 0, reasons: [] },
    execution: { score: 0, reasons: [] },
    validation: { score: 0, reasons: [] },
    repair: { score: 0, reasons: [] },
    promotion: { score: 0, reasons: [] },
  };
}

function add(
  scores: Record<ProcessStageId, StageScore>,
  stage: ProcessStageId,
  amount: number,
  reason: string,
) {
  scores[stage].score += amount;
  if (!scores[stage].reasons.includes(reason)) scores[stage].reasons.push(reason);
}

export function deriveProcessPlacement(node: ContentNode): ProcessPlacement {
  const scores = freshScores();
  const kindWeights = kindStageWeights[node.kind] ?? { representation: 1 };

  Object.entries(kindWeights).forEach(([stage, weight]) => {
    add(
      scores,
      stage as ProcessStageId,
      weight ?? 0,
      `${node.kind} objects naturally participate in ${processStages.find((candidate) => candidate.id === stage)?.shortLabel.toLowerCase() ?? stage}.`,
    );
  });

  add(scores, "representation", 1, "The public node is itself a governed representation of the underlying work.");

  const status = node.status;
  if (status?.stage === "planned") {
    add(scores, "intake", 3, "Declared planned standing keeps the work near intake and problem formation.");
    add(scores, "boundary", 2, "Planned work still requires bounded scope and claim ceilings before promotion.");
    add(scores, "hypothesis", 3, "Planned work is primarily a candidate direction rather than a delivery claim.");
  }
  if (status?.stage === "active-development") {
    add(scores, "construction", 4, "Declared active development places the work in active construction.");
    add(scores, "execution", 3, "Active development implies an executable path is being exercised.");
    add(scores, "validation", 2, "Active work remains subject to implementation and evidence feedback.");
  }
  if (status?.stage === "pilot") {
    add(scores, "execution", 3, "Pilot standing means the artifact or method is being exercised in a bounded setting.");
    add(scores, "validation", 5, "Pilot standing makes evaluation the dominant current gate.");
    add(scores, "repair", 2, "Pilot failures and observations should feed explicit repair.");
  }
  if (status?.stage === "developed") {
    add(scores, "construction", 3, "Developed standing establishes a substantive artifact or doctrine.");
    add(scores, "validation", 3, "Developed is still promotion-gated by evidence appropriate to the next claim.");
    add(scores, "promotion", 2, "The next meaningful boundary is what standing may lawfully be promoted.");
  }
  if (status?.stage === "shipped") {
    add(scores, "execution", 4, "Shipped standing establishes delivery or operation.");
    add(scores, "promotion", 5, "Delivered work is now governed by maintenance, provenance, and stewardship claims.");
    add(scores, "validation", 2, "Delivery does not remove the obligation to measure actual behavior and consequence.");
  }
  if (status?.historical) {
    add(scores, "repair", 2, "Historical standing requires preserved learning rather than pretending the work is current.");
    add(scores, "promotion", 4, "Historical work is primarily retained as provenance and bounded standing.");
  }

  const inspections = node.inspection ?? [];
  if (inspections.length) {
    add(scores, "validation", 2, `${inspections.length} inspectable evidence ${inspections.length === 1 ? "view is" : "views are"} attached to this object.`);
  }
  if (inspections.some((inspection) => Boolean(inspection.sourceRef))) {
    add(scores, "validation", 1, "At least one inspection is source-bound rather than assertion-only.");
  }
  if (node.links?.length) {
    add(scores, "promotion", 1, "Retained or public records create an explicit publication/promotion surface.");
  }

  const events = getSemanticEvents(node.id);
  events.forEach((event) => {
    eventStageMap[event.type].forEach((stage) => {
      add(scores, stage, 2, `Semantic event “${event.label}” contributes to ${processStages.find((candidate) => candidate.id === stage)?.shortLabel ?? stage}.`);
    });
  });

  const ordered = processStageIds
    .map((stage) => ({ stage, score: scores[stage].score }))
    .sort((a, b) => b.score - a.score || processStageIds.indexOf(a.stage) - processStageIds.indexOf(b.stage));
  const primaryStage = ordered[0]?.stage ?? "representation";
  const maximum = ordered[0]?.score ?? 0;
  const activeStages = ordered
    .filter((entry) => entry.score > 0 && entry.score >= maximum - 1)
    .slice(0, 3)
    .map((entry) => entry.stage)
    .sort((a, b) => processStageIds.indexOf(a) - processStageIds.indexOf(b));

  const stageScores = freshScores();
  const scoreRecord = {} as Record<ProcessStageId, number>;
  const reasonRecord = {} as Record<ProcessStageId, string[]>;
  processStageIds.forEach((stage) => {
    scoreRecord[stage] = scores[stage].score;
    reasonRecord[stage] = [...scores[stage].reasons];
  });
  void stageScores;

  return {
    nodeId: node.id,
    primaryStage,
    activeStages: activeStages.length ? activeStages : [primaryStage],
    stageScores: scoreRecord,
    reasons: reasonRecord,
    basis: status || events.length ? "declared-and-derived" : "derived",
  };
}

export function visibleProcessStages(placement: ProcessPlacement, scope: ProcessScope): ProcessStage[] {
  if (scope === "full") return processStages;

  const primaryIndex = processStages.findIndex((stage) => stage.id === placement.primaryStage);
  if (scope === "phase") {
    const start = Math.max(0, primaryIndex - 2);
    const end = Math.min(processStages.length, primaryIndex + 3);
    return processStages.slice(start, end);
  }

  const active = new Set(placement.activeStages);
  return processStages.filter((stage) => active.has(stage.id));
}

export function getProcessPeers(nodeId: string, stageId: ProcessStageId, limit = 8): ContentNode[] {
  return nodes
    .filter((node) => node.id !== nodeId && node.id !== "root")
    .map((node) => ({ node, placement: deriveProcessPlacement(node) }))
    .filter(({ placement }) => placement.primaryStage === stageId)
    .sort((a, b) => {
      const scoreDelta = b.placement.stageScores[stageId] - a.placement.stageScores[stageId];
      return scoreDelta || a.node.label.localeCompare(b.node.label);
    })
    .slice(0, limit)
    .map(({ node }) => node);
}
