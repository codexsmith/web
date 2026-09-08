import {
  neighbors,
  walkablePoints,
  WORLD,
  type BeliefCell,
  type LabFrame,
  type LabTrace,
  type Point,
} from "./engine";

export const TRACE_STAGES = ["WORLD", "OBSERVE", "REPRESENT", "INFER", "ACT", "CONSEQUENCE"] as const;
export const BAYES_SUBPHASES = ["PREDICT", "OBSERVE", "UPDATE"] as const;

export type TraceStage = (typeof TRACE_STAGES)[number];
export type BayesSubphase = (typeof BAYES_SUBPHASES)[number];

export type SemanticLabFrame = LabFrame & {
  phase: TraceStage;
  sourceFrame: number;
  semanticLabel: string;
  subphase?: BayesSubphase;
  cycle?: number;
};

const pointKey = ([x, y]: Point) => `${x},${y}`;

function normalize(weights: Map<string, number>, points: Point[]): BeliefCell[] {
  const total = points.reduce((sum, point) => sum + (weights.get(pointKey(point)) ?? 0), 0);
  const divisor = total > 0 ? total : 1;
  return points.map((point) => ({ point, probability: (weights.get(pointKey(point)) ?? 0) / divisor }));
}

function diffuse(previous: BeliefCell[], points: Point[]): BeliefCell[] {
  const weights = new Map<string, number>();
  for (const cell of previous) {
    const exits = neighbors(cell.point, true);
    const share = cell.probability / exits.length;
    for (const exit of exits) {
      const key = pointKey(exit.point);
      weights.set(key, (weights.get(key) ?? 0) + share);
    }
  }
  return normalize(weights, points);
}

function stripInference(frame: LabFrame): LabFrame {
  return {
    ...frame,
    explored: [],
    frontier: [],
    path: [],
    beliefs: [],
    values: undefined,
    policy: undefined,
    ping: undefined,
    candidateScores: undefined,
    selectedAction: undefined,
    searchCost: undefined,
  };
}

function semanticFrame(
  frame: LabFrame,
  phase: TraceStage,
  sourceFrame: number,
  semanticLabel: string,
  extra: Partial<Pick<SemanticLabFrame, "subphase" | "cycle">> = {},
): SemanticLabFrame {
  return {
    ...frame,
    phase,
    sourceFrame,
    semanticLabel,
    ...extra,
  };
}

function setupFrames(trace: LabTrace): SemanticLabFrame[] {
  const first = stripInference(trace.frames[0]);
  return [
    semanticFrame(
      { ...first, narration: "WORLD-01 is held fixed before any reasoning operation is admitted." },
      "WORLD",
      0,
      "Carrier world established",
    ),
    semanticFrame(
      { ...first, narration: `Load ${trace.worldModel.shortLabel}. The representation boundary is now explicit before inference begins.` },
      "REPRESENT",
      0,
      "Representation boundary loaded",
    ),
  ];
}

function buildBayesTimeline(trace: LabTrace): SemanticLabFrame[] {
  const points = walkablePoints().filter((point) => pointKey(point) !== pointKey(WORLD.agentStart));
  const uniform: BeliefCell[] = points.map((point) => ({ point, probability: 1 / points.length }));
  const firstRaw = trace.frames[0];
  const base = stripInference(firstRaw);
  const frames: SemanticLabFrame[] = [
    semanticFrame(
      { ...base, beliefs: uniform, narration: "WORLD-01 contains a hidden pursuer trajectory. World truth exists before the agent observes it." },
      "WORLD",
      0,
      "Hidden world established",
    ),
    semanticFrame(
      { ...base, beliefs: uniform, narration: "Represent hidden position as a probability distribution. Truth remains outside the agent boundary." },
      "REPRESENT",
      0,
      "Belief-state carrier loaded",
    ),
  ];

  let previousPosterior = uniform;

  trace.frames.forEach((raw, index) => {
    const predicted = index === 0 ? previousPosterior : diffuse(previousPosterior, points);
    const cycle = index + 1;

    frames.push(
      semanticFrame(
        {
          ...raw,
          beliefs: predicted,
          ping: undefined,
          narration: index === 0
            ? "PREDICT: carry the initial prior forward. No motion transition precedes the first observation."
            : "PREDICT: transport the previous posterior through the hidden-state transition model before seeing new evidence.",
        },
        "INFER",
        index,
        "Predict hidden state",
        { subphase: "PREDICT", cycle },
      ),
    );

    frames.push(
      semanticFrame(
        {
          ...raw,
          beliefs: predicted,
          narration: `OBSERVE: receive noisy range ping ${raw.ping}. The evidence exists before it is folded into the posterior.`,
        },
        "OBSERVE",
        index,
        "Receive noisy evidence",
        { subphase: "OBSERVE", cycle },
      ),
    );

    frames.push(
      semanticFrame(
        {
          ...raw,
          narration: "UPDATE: combine predicted belief with the sensor likelihood and normalize into the new posterior.",
        },
        "INFER",
        index,
        "Update posterior belief",
        { subphase: "UPDATE", cycle },
      ),
    );

    previousPosterior = raw.beliefs;
  });

  const finalRaw = trace.frames[trace.frames.length - 1];
  frames.push(
    semanticFrame(
      {
        ...finalRaw,
        narration: "CONSEQUENCE: the current belief state is now the computational object available for downstream decision and comparison.",
      },
      "CONSEQUENCE",
      trace.frames.length - 1,
      "Belief state exposed as consequence",
    ),
  );

  return frames;
}

function buildLinearTimeline(trace: LabTrace): SemanticLabFrame[] {
  const frames = setupFrames(trace);

  trace.frames.forEach((raw, index) => {
    const last = index === trace.frames.length - 1;
    let phase: TraceStage = "INFER";
    let label = "Inference operating";

    if (trace.mode === "bfs" || trace.mode === "astar") {
      if (last && (trace.closure === "defect" || raw.selectedAction === "STOP")) {
        phase = "CONSEQUENCE";
        label = trace.closure === "defect" ? "Closure defect exposed" : "Recovered route completed";
      } else if (raw.selectedAction) {
        phase = "ACT";
        label = "Execute recovered route";
      } else {
        phase = "INFER";
        label = "Expand search frontier";
      }
    } else if (trace.mode === "minimax" || trace.mode === "expectimax") {
      phase = index === 0 ? "INFER" : index === 1 ? "ACT" : "CONSEQUENCE";
      label = index === 0 ? "Aggregate candidate outcomes" : index === 1 ? "Commit selected action" : "Realize modeled consequence";
    } else if (trace.mode === "mdp") {
      phase = "INFER";
      label = "Propagate expected future value";
    }

    frames.push(semanticFrame(raw, phase, index, label));
  });

  if (trace.mode === "mdp") {
    const finalRaw = trace.frames[trace.frames.length - 1];
    frames.push(
      semanticFrame(
        { ...finalRaw, narration: "CONSEQUENCE: converged value estimates expose a stationary policy over the represented state space." },
        "CONSEQUENCE",
        trace.frames.length - 1,
        "Policy exposed as consequence",
      ),
    );
  }

  return frames;
}

export function buildSemanticTimeline(trace: LabTrace): SemanticLabFrame[] {
  return trace.mode === "bayes" ? buildBayesTimeline(trace) : buildLinearTimeline(trace);
}
