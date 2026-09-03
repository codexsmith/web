import { neighbors, type Mode, type Point, WORLD } from "./engine";

export type TaskId = "reach" | "visit-all" | "survive" | "maximize" | "locate";
export type StateDefinition = "position" | "position+visited";

export type TaskSpec = {
  id: TaskId;
  label: string;
  shortLabel: string;
  question: string;
  required: string[];
  canonicalModes: Mode[];
};

export type VisitAllResult = {
  stateDefinition: StateDefinition;
  stateLabel: string;
  closure: "reached" | "defect";
  expansions: number;
  routeSteps: number | null;
  path: Point[];
  output: string;
  lostDistinction?: string;
};

export const TASK_ORDER: TaskId[] = ["reach", "visit-all", "survive", "maximize", "locate"];

export const TASK_SPECS: Record<TaskId, TaskSpec> = {
  reach: {
    id: "reach",
    label: "Reach target",
    shortLabel: "REACH",
    question: "Can the agent reach the designated target?",
    required: ["current position", "legal transitions", "target identity"],
    canonicalModes: ["bfs", "astar"],
  },
  "visit-all": {
    id: "visit-all",
    label: "Visit all targets",
    shortLabel: "VISIT ALL",
    question: "Can the agent close only after every required target has been visited?",
    required: ["current position", "legal transitions", "visited-target history"],
    canonicalModes: ["bfs", "astar"],
  },
  survive: {
    id: "survive",
    label: "Survive pursuer",
    shortLabel: "SURVIVE",
    question: "Which action remains defensible under a pursuer model?",
    required: ["agent actions", "pursuer actions", "pursuer semantics"],
    canonicalModes: ["minimax", "expectimax"],
  },
  maximize: {
    id: "maximize",
    label: "Maximize return",
    shortLabel: "MAX RETURN",
    question: "Which policy maximizes expected discounted consequence?",
    required: ["state", "transition probabilities", "reward", "discount"],
    canonicalModes: ["mdp"],
  },
  locate: {
    id: "locate",
    label: "Locate hidden pursuer",
    shortLabel: "LOCATE",
    question: "Where may the hidden pursuer be given noisy evidence?",
    required: ["observation model", "transition model", "belief state"],
    canonicalModes: ["bayes"],
  },
};

export const VISIT_ALL_TARGETS: Array<{ point: Point; label: string }> = [
  { point: [1, 9], label: "SW" },
  { point: [1, 1], label: "NW" },
  { point: [13, 1], label: "NE" },
  { point: [13, 9], label: "SE" },
];

const pointKey = ([x, y]: Point) => `${x},${y}`;
const targetIndex = new Map(VISIT_ALL_TARGETS.map((target, index) => [pointKey(target.point), index]));
const FULL_MASK = (1 << VISIT_ALL_TARGETS.length) - 1;

function visit(mask: number, point: Point) {
  const index = targetIndex.get(pointKey(point));
  return typeof index === "number" ? mask | (1 << index) : mask;
}

function stateKey(point: Point, mask: number, definition: StateDefinition) {
  return definition === "position" ? pointKey(point) : `${pointKey(point)}|${mask}`;
}

export function buildVisitAllResult(definition: StateDefinition): VisitAllResult {
  const startMask = visit(0, WORLD.agentStart);
  const startKey = stateKey(WORLD.agentStart, startMask, definition);
  const queue: Array<{ point: Point; mask: number; distance: number; key: string }> = [
    { point: WORLD.agentStart, mask: startMask, distance: 0, key: startKey },
  ];
  const seen = new Set<string>([startKey]);
  const parent = new Map<string, string | null>([[startKey, null]]);
  const states = new Map<string, { point: Point; mask: number }>([[startKey, { point: WORLD.agentStart, mask: startMask }]]);
  let cursor = 0;
  let goalKey: string | null = null;
  let goalDistance: number | null = null;

  while (cursor < queue.length) {
    const current = queue[cursor++];
    if (current.mask === FULL_MASK) {
      goalKey = current.key;
      goalDistance = current.distance;
      break;
    }

    for (const next of neighbors(current.point)) {
      const nextMask = visit(current.mask, next.point);
      const key = stateKey(next.point, nextMask, definition);
      if (seen.has(key)) continue;
      seen.add(key);
      parent.set(key, current.key);
      states.set(key, { point: next.point, mask: nextMask });
      queue.push({ point: next.point, mask: nextMask, distance: current.distance + 1, key });
    }
  }

  if (!goalKey || goalDistance === null) {
    return {
      stateDefinition: definition,
      stateLabel: "state = position",
      closure: "defect",
      expansions: cursor,
      routeSteps: null,
      path: [],
      output: "search exhausts represented states before the task can close",
      lostDistinction: "visited-target history",
    };
  }

  const path: Point[] = [];
  let currentKey: string | null = goalKey;
  while (currentKey) {
    const state = states.get(currentKey);
    if (!state) break;
    path.push(state.point);
    currentKey = parent.get(currentKey) ?? null;
  }
  path.reverse();

  return {
    stateDefinition: definition,
    stateLabel: "state = (position, visitedTargets)",
    closure: "reached",
    expansions: cursor,
    routeSteps: goalDistance,
    path,
    output: "all four target obligations are distinguishable until closure",
  };
}

export const VISIT_ALL_RESULTS = {
  lossy: buildVisitAllResult("position"),
  sufficient: buildVisitAllResult("position+visited"),
};

export const STATE_WITNESS = {
  position: WORLD.agentStart,
  historyA: {
    visited: ["SW"],
    remaining: ["NW", "NE", "SE"],
    projectedPosition: "(1,9)",
    augmentedState: "(1,9; {SW})",
  },
  historyB: {
    visited: ["SW", "NW"],
    remaining: ["NE", "SE"],
    projectedPosition: "(1,9)",
    augmentedState: "(1,9; {SW,NW})",
  },
};

export function taskRelation(task: TaskId, mode: Mode) {
  const canonical = TASK_SPECS[task].canonicalModes.includes(mode);
  return {
    state: canonical ? "aligned" as const : "cross-examine" as const,
    label: canonical ? "ALIGNED" : "CROSS-EXAMINE",
    detail: canonical
      ? "The loaded reasoner is a canonical specimen for this task in the laboratory."
      : "The task remains fixed while this representation is deliberately examined outside its canonical use.",
  };
}
