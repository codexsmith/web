import {
  neighbors,
  walkablePoints,
  type Action,
  type Point,
  type PolicyCell,
  type ValueCell,
  WORLD,
} from "./engine";

export type FeatureId =
  | "goalProgress"
  | "goalRange"
  | "hazardProgress"
  | "hazardRange"
  | "collisionRisk"
  | "mobility"
  | "wallBump";

export type FeatureResolution = "full" | "coarse" | "off";
export type FeatureConfig = Record<FeatureId, FeatureResolution>;
export type QCarrier = "tabular" | "features";

export type FeatureDefinition = {
  id: FeatureId;
  label: string;
  detail: string;
  binary?: boolean;
};

export type AliasWitness = {
  left: { point: Point; action: Action; q: number };
  right: { point: Point; action: Action; q: number };
  exactGap: number;
};

export type FeatureQResult = {
  policy: PolicyCell[];
  values: ValueCell[];
  weights: Array<{ id: "bias" | FeatureId; label: string; value: number }>;
  startAction: Action;
  referenceStartAction: Action;
  policyAgreement: number;
  hazardZoneAgreement: number;
  meanAbsoluteQDefect: number;
  hazardMistakes: number;
  parameters: number;
  referenceEntries: number;
  uniqueSignatures: number;
  largestAliasClass: number;
  conflictedAliasClasses: number;
  aliasWitness: AliasWitness | null;
  trainingEpisodes: number;
};

export const FEATURE_DEFINITIONS: FeatureDefinition[] = [
  { id: "goalProgress", label: "goal progress", detail: "Does this action reduce shortest-path distance to the target?" },
  { id: "goalRange", label: "goal range", detail: "How close is the resulting state to the target?" },
  { id: "hazardProgress", label: "hazard separation", detail: "Does this action increase distance from the hazard?" },
  { id: "hazardRange", label: "hazard range", detail: "How close is the resulting state to the hazard?" },
  { id: "collisionRisk", label: "collision risk", detail: "Does the represented action land on the hazard state?", binary: true },
  { id: "mobility", label: "local mobility", detail: "How many exits remain from the resulting state?" },
  { id: "wallBump", label: "wall contact", detail: "Does the requested action collapse to the same state?", binary: true },
];

export const DEFAULT_FEATURE_CONFIG: FeatureConfig = {
  goalProgress: "full",
  goalRange: "full",
  hazardProgress: "full",
  hazardRange: "full",
  collisionRisk: "full",
  mobility: "full",
  wallBump: "full",
};

export const FEATURE_PRESETS: Array<{ id: string; label: string; detail: string; config: FeatureConfig }> = [
  {
    id: "full",
    label: "FULL MAP",
    detail: "Continuous geometry plus explicit hazard and wall distinctions.",
    config: DEFAULT_FEATURE_CONFIG,
  },
  {
    id: "forget-hazard",
    label: "FORGET HAZARD",
    detail: "Remove every feature that distinguishes proximity or motion relative to the hazard.",
    config: {
      ...DEFAULT_FEATURE_CONFIG,
      hazardProgress: "off",
      hazardRange: "off",
      collisionRisk: "off",
    },
  },
  {
    id: "coarse",
    label: "COARSE ALL",
    detail: "Replace continuous distances and mobility with broad buckets.",
    config: {
      goalProgress: "coarse",
      goalRange: "coarse",
      hazardProgress: "coarse",
      hazardRange: "coarse",
      collisionRisk: "full",
      mobility: "coarse",
      wallBump: "full",
    },
  },
  {
    id: "goal-only",
    label: "GOAL ONLY",
    detail: "Retain only target-directed geometry. Everything else is forgotten.",
    config: {
      goalProgress: "full",
      goalRange: "full",
      hazardProgress: "off",
      hazardRange: "off",
      collisionRisk: "off",
      mobility: "off",
      wallBump: "off",
    },
  },
];

const ACTIONS: Array<Exclude<Action, "STOP">> = ["N", "S", "E", "W"];
const LEFT: Record<Exclude<Action, "STOP">, Exclude<Action, "STOP">> = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT: Record<Exclude<Action, "STOP">, Exclude<Action, "STOP">> = { N: "E", E: "S", S: "W", W: "N" };
const GAMMA = 0.9;
const LIVING_REWARD = -0.12;
const GOAL_VALUE = 15;
const HAZARD_VALUE = -12;
const TRAINING_EPISODES = 1600;
const TRAINING_STEPS = 72;
const ALPHA = 0.015;
const CONFLICT_THRESHOLD = 0.5;
const TERMINALS = new Set([pointKey(WORLD.target), pointKey(WORLD.pursuerStart)]);
const POINTS = walkablePoints();
const NON_TERMINALS = POINTS.filter((point) => !TERMINALS.has(pointKey(point)));

function pointKey([x, y]: Point) {
  return `${x},${y}`;
}

function stateActionKey(point: Point, action: Action) {
  return `${pointKey(point)}|${action}`;
}

function samePoint(a: Point, b: Point) {
  return a[0] === b[0] && a[1] === b[1];
}

function move(point: Point, action: Exclude<Action, "STOP">): Point {
  return neighbors(point).find((candidate) => candidate.action === action)?.point ?? point;
}

function distanceMap(target: Point) {
  const distances = new Map<string, number>([[pointKey(target), 0]]);
  const queue: Point[] = [target];
  let cursor = 0;
  while (cursor < queue.length) {
    const current = queue[cursor++];
    const distance = distances.get(pointKey(current)) ?? 0;
    for (const next of neighbors(current)) {
      const key = pointKey(next.point);
      if (distances.has(key)) continue;
      distances.set(key, distance + 1);
      queue.push(next.point);
    }
  }
  return distances;
}

const GOAL_DISTANCE = distanceMap(WORLD.target);
const HAZARD_DISTANCE = distanceMap(WORLD.pursuerStart);
const MAX_GOAL_DISTANCE = Math.max(...GOAL_DISTANCE.values());
const MAX_HAZARD_DISTANCE = Math.max(...HAZARD_DISTANCE.values());

function terminalValue(point: Point) {
  if (samePoint(point, WORLD.target)) return GOAL_VALUE;
  if (samePoint(point, WORLD.pursuerStart)) return HAZARD_VALUE;
  return null;
}

function transition(point: Point, action: Exclude<Action, "STOP">) {
  const outcomes = new Map<string, { point: Point; probability: number }>();
  for (const [probability, realized] of [[0.8, action], [0.1, LEFT[action]], [0.1, RIGHT[action]]] as const) {
    const next = move(point, realized);
    const key = pointKey(next);
    const existing = outcomes.get(key);
    outcomes.set(key, { point: next, probability: (existing?.probability ?? 0) + probability });
  }
  return [...outcomes.values()];
}

function buildReference() {
  let values = new Map<string, number>(POINTS.map((point) => [pointKey(point), 0]));
  values.set(pointKey(WORLD.target), GOAL_VALUE);
  values.set(pointKey(WORLD.pursuerStart), HAZARD_VALUE);

  for (let iteration = 0; iteration < 160; iteration += 1) {
    const nextValues = new Map(values);
    let delta = 0;
    for (const point of NON_TERMINALS) {
      let best = Number.NEGATIVE_INFINITY;
      for (const action of ACTIONS) {
        const expected = transition(point, action).reduce(
          (sum, outcome) => sum + outcome.probability * (values.get(pointKey(outcome.point)) ?? 0),
          0,
        );
        best = Math.max(best, LIVING_REWARD + GAMMA * expected);
      }
      nextValues.set(pointKey(point), best);
      delta = Math.max(delta, Math.abs(best - (values.get(pointKey(point)) ?? 0)));
    }
    nextValues.set(pointKey(WORLD.target), GOAL_VALUE);
    nextValues.set(pointKey(WORLD.pursuerStart), HAZARD_VALUE);
    values = nextValues;
    if (delta < 1e-10) break;
  }

  const q = new Map<string, number>();
  const policy = new Map<string, Exclude<Action, "STOP">>();
  for (const point of NON_TERMINALS) {
    let bestAction: Exclude<Action, "STOP"> = "N";
    let bestValue = Number.NEGATIVE_INFINITY;
    for (const action of ACTIONS) {
      const expected = transition(point, action).reduce(
        (sum, outcome) => sum + outcome.probability * (values.get(pointKey(outcome.point)) ?? 0),
        0,
      );
      const value = LIVING_REWARD + GAMMA * expected;
      q.set(stateActionKey(point, action), value);
      if (value > bestValue) {
        bestValue = value;
        bestAction = action;
      }
    }
    policy.set(pointKey(point), bestAction);
  }
  return { q, policy, values };
}

const REFERENCE = buildReference();

type RawFeatureValues = Record<FeatureId, number>;
type FeatureCacheEntry = { full: RawFeatureValues; coarse: RawFeatureValues };
const FEATURE_CACHE = new Map<string, FeatureCacheEntry>();

for (const point of NON_TERMINALS) {
  for (const action of ACTIONS) {
    const next = move(point, action);
    const exits = ACTIONS.filter((candidate) => !samePoint(move(next, candidate), next)).length;
    const goalBefore = GOAL_DISTANCE.get(pointKey(point)) ?? MAX_GOAL_DISTANCE;
    const goalAfter = GOAL_DISTANCE.get(pointKey(next)) ?? MAX_GOAL_DISTANCE;
    const hazardBefore = HAZARD_DISTANCE.get(pointKey(point)) ?? MAX_HAZARD_DISTANCE;
    const hazardAfter = HAZARD_DISTANCE.get(pointKey(next)) ?? MAX_HAZARD_DISTANCE;
    const full: RawFeatureValues = {
      goalProgress: goalBefore - goalAfter,
      goalRange: 1 - goalAfter / MAX_GOAL_DISTANCE,
      hazardProgress: hazardAfter - hazardBefore,
      hazardRange: 1 - Math.min(hazardAfter, MAX_HAZARD_DISTANCE) / MAX_HAZARD_DISTANCE,
      collisionRisk: samePoint(next, WORLD.pursuerStart) ? 1 : 0,
      mobility: exits / 4,
      wallBump: samePoint(next, point) ? 1 : 0,
    };
    const coarse: RawFeatureValues = {
      goalProgress: Math.sign(full.goalProgress),
      goalRange: goalAfter <= 8 ? 1 : 0,
      hazardProgress: Math.sign(full.hazardProgress),
      hazardRange: hazardAfter <= 2 ? 1 : 0,
      collisionRisk: full.collisionRisk,
      mobility: exits <= 2 ? 1 : 0,
      wallBump: full.wallBump,
    };
    FEATURE_CACHE.set(stateActionKey(point, action), { full, coarse });
  }
}

function featureVector(point: Point, action: Exclude<Action, "STOP">, config: FeatureConfig) {
  const cached = FEATURE_CACHE.get(stateActionKey(point, action));
  if (!cached) return { bias: 1 } as Record<"bias" | FeatureId, number>;
  const vector: Partial<Record<"bias" | FeatureId, number>> = { bias: 1 };
  for (const definition of FEATURE_DEFINITIONS) {
    const resolution = config[definition.id];
    if (resolution === "off") continue;
    vector[definition.id] = resolution === "coarse" ? cached.coarse[definition.id] : cached.full[definition.id];
  }
  return vector as Record<"bias" | FeatureId, number>;
}

function activeFeatureIds(config: FeatureConfig) {
  return FEATURE_DEFINITIONS.filter((definition) => config[definition.id] !== "off").map((definition) => definition.id);
}

function createRandom(seed = 0xc0ffee) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function greedyAction(point: Point, qValue: (point: Point, action: Exclude<Action, "STOP">) => number) {
  let bestAction: Exclude<Action, "STOP"> = "N";
  let bestValue = Number.NEGATIVE_INFINITY;
  for (const action of ACTIONS) {
    const value = qValue(point, action);
    if (value > bestValue) {
      bestValue = value;
      bestAction = action;
    }
  }
  return bestAction;
}

function sampleTransition(point: Point, action: Exclude<Action, "STOP">, random: () => number) {
  const roll = random();
  const realized = roll < 0.8 ? action : roll < 0.9 ? LEFT[action] : RIGHT[action];
  return move(point, realized);
}

function featureSignature(point: Point, action: Exclude<Action, "STOP">, config: FeatureConfig) {
  const vector = featureVector(point, action, config);
  const ids = activeFeatureIds(config);
  return [1, ...ids.map((id) => Number((vector[id] ?? 0).toFixed(5)))].join("|");
}

function aliasDiagnostics(config: FeatureConfig) {
  const groups = new Map<string, Array<{ point: Point; action: Exclude<Action, "STOP">; q: number }>>();
  for (const point of NON_TERMINALS) {
    for (const action of ACTIONS) {
      const signature = featureSignature(point, action, config);
      const group = groups.get(signature) ?? [];
      group.push({ point, action, q: REFERENCE.q.get(stateActionKey(point, action)) ?? 0 });
      groups.set(signature, group);
    }
  }

  let largestAliasClass = 1;
  let conflictedAliasClasses = 0;
  let worstWitness: AliasWitness | null = null;
  for (const group of groups.values()) {
    largestAliasClass = Math.max(largestAliasClass, group.length);
    if (group.length < 2) continue;
    const sorted = [...group].sort((a, b) => a.q - b.q);
    const exactGap = sorted[sorted.length - 1].q - sorted[0].q;
    if (exactGap <= CONFLICT_THRESHOLD) continue;
    conflictedAliasClasses += 1;
    if (!worstWitness || exactGap > worstWitness.exactGap) {
      worstWitness = {
        left: sorted[0],
        right: sorted[sorted.length - 1],
        exactGap,
      };
    }
  }

  return {
    uniqueSignatures: groups.size,
    largestAliasClass,
    conflictedAliasClasses,
    aliasWitness: worstWitness,
  };
}

export function buildFeatureQ(config: FeatureConfig): FeatureQResult {
  const ids = activeFeatureIds(config);
  const weights: Partial<Record<"bias" | FeatureId, number>> = { bias: 0 };
  for (const id of ids) weights[id] = 0;
  const random = createRandom();

  const qValue = (point: Point, action: Exclude<Action, "STOP">) => {
    const vector = featureVector(point, action, config);
    return (weights.bias ?? 0) + ids.reduce((sum, id) => sum + (weights[id] ?? 0) * (vector[id] ?? 0), 0);
  };

  for (let episode = 0; episode < TRAINING_EPISODES; episode += 1) {
    let point = NON_TERMINALS[Math.min(NON_TERMINALS.length - 1, Math.floor(random() * NON_TERMINALS.length))];
    const epsilon = Math.max(0.03, 0.35 * (1 - episode / TRAINING_EPISODES));

    for (let tick = 0; tick < TRAINING_STEPS; tick += 1) {
      const action = random() < epsilon
        ? ACTIONS[Math.min(ACTIONS.length - 1, Math.floor(random() * ACTIONS.length))]
        : greedyAction(point, qValue);
      const next = sampleTransition(point, action, random);
      const terminal = terminalValue(next);
      const target = terminal === null
        ? LIVING_REWARD + GAMMA * qValue(next, greedyAction(next, qValue))
        : LIVING_REWARD + GAMMA * terminal;
      const delta = target - qValue(point, action);
      const vector = featureVector(point, action, config);
      weights.bias = (weights.bias ?? 0) + ALPHA * delta;
      for (const id of ids) {
        weights[id] = (weights[id] ?? 0) + ALPHA * delta * (vector[id] ?? 0);
      }
      point = next;
      if (terminal !== null) break;
    }
  }

  const policy: PolicyCell[] = [];
  const values: ValueCell[] = [];
  let agreements = 0;
  let hazardZoneStates = 0;
  let hazardZoneAgreements = 0;
  let hazardMistakes = 0;
  let qDefect = 0;
  let qCount = 0;

  for (const point of NON_TERMINALS) {
    const action = greedyAction(point, qValue);
    const referenceAction = REFERENCE.policy.get(pointKey(point)) ?? "N";
    const value = Math.max(...ACTIONS.map((candidate) => qValue(point, candidate)));
    policy.push({ point, action });
    values.push({ point, value });
    if (action === referenceAction) agreements += 1;

    const hazardDistance = HAZARD_DISTANCE.get(pointKey(point)) ?? Number.POSITIVE_INFINITY;
    if (hazardDistance <= 4) {
      hazardZoneStates += 1;
      if (action === referenceAction) hazardZoneAgreements += 1;
    }

    if (samePoint(move(point, action), WORLD.pursuerStart) && !samePoint(move(point, referenceAction), WORLD.pursuerStart)) {
      hazardMistakes += 1;
    }

    for (const candidate of ACTIONS) {
      qDefect += Math.abs(qValue(point, candidate) - (REFERENCE.q.get(stateActionKey(point, candidate)) ?? 0));
      qCount += 1;
    }
  }

  values.push({ point: WORLD.target, value: GOAL_VALUE });
  values.push({ point: WORLD.pursuerStart, value: HAZARD_VALUE });

  const aliases = aliasDiagnostics(config);
  const weightRows: FeatureQResult["weights"] = [
    { id: "bias", label: "bias", value: weights.bias ?? 0 },
    ...FEATURE_DEFINITIONS
      .filter((definition) => config[definition.id] !== "off")
      .map((definition) => ({ id: definition.id, label: definition.label, value: weights[definition.id] ?? 0 })),
  ];

  return {
    policy,
    values,
    weights: weightRows,
    startAction: greedyAction(WORLD.agentStart, qValue),
    referenceStartAction: REFERENCE.policy.get(pointKey(WORLD.agentStart)) ?? "N",
    policyAgreement: agreements / NON_TERMINALS.length,
    hazardZoneAgreement: hazardZoneStates > 0 ? hazardZoneAgreements / hazardZoneStates : 1,
    meanAbsoluteQDefect: qCount > 0 ? qDefect / qCount : 0,
    hazardMistakes,
    parameters: ids.length + 1,
    referenceEntries: NON_TERMINALS.length * ACTIONS.length,
    uniqueSignatures: aliases.uniqueSignatures,
    largestAliasClass: aliases.largestAliasClass,
    conflictedAliasClasses: aliases.conflictedAliasClasses,
    aliasWitness: aliases.aliasWitness,
    trainingEpisodes: TRAINING_EPISODES,
  };
}

export function featureResolutionLabel(resolution: FeatureResolution) {
  if (resolution === "full") return "FULL";
  if (resolution === "coarse") return "COARSE";
  return "FORGOTTEN";
}

export function nextFeatureResolution(feature: FeatureDefinition, resolution: FeatureResolution): FeatureResolution {
  if (feature.binary) return resolution === "off" ? "full" : "off";
  if (resolution === "full") return "coarse";
  if (resolution === "coarse") return "off";
  return "full";
}
