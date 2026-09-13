export type Point = readonly [number, number];
export type Mode = "bfs" | "astar" | "minimax" | "expectimax" | "mdp" | "bayes";
export type Action = "N" | "S" | "E" | "W" | "STOP";
export type ClosureResult = "reached" | "defect";

export type BeliefCell = {
  point: Point;
  probability: number;
};

export type CandidateScore = {
  action: Action;
  score: number;
};

export type ValueCell = {
  point: Point;
  value: number;
};

export type PolicyCell = {
  point: Point;
  action: Action;
};

export type SearchCost = {
  g: number;
  h: number;
  f: number;
};

export type LabFrame = {
  tick: number;
  agent: Point;
  pursuer: Point;
  target: Point;
  explored: Point[];
  frontier: Point[];
  path: Point[];
  beliefs: BeliefCell[];
  values?: ValueCell[];
  policy?: PolicyCell[];
  ping?: number;
  candidateScores?: CandidateScore[];
  selectedAction?: Action;
  searchCost?: SearchCost;
  narration: string;
};

export type TraceSummary = {
  signal: string;
  detail: string;
  selectedAction?: Action;
};

export type WorldModel = {
  label: string;
  shortLabel: string;
  represented: string[];
  hidden: string[];
  assumed: string[];
  output: string;
  equation: string;
  explanation: string;
  accent: string;
};

export type LabTrace = {
  mode: Mode;
  frames: LabFrame[];
  worldModel: WorldModel;
  closure: ClosureResult;
  summary: TraceSummary;
};

export type BuildOptions = {
  retainParents?: boolean;
};

export type ComparisonRow = {
  mode: Mode;
  label: string;
  output: string;
  signal: string;
  detail: string;
  selectedAction?: Action;
};

export const MAZE_ROWS = [
  "###############",
  "#.....#.......#",
  "#.###.#.#####.#",
  "#.#...#.....#.#",
  "#.#.#####.#.#.#",
  "#.#.......#.#.#",
  "#.#######.#.#.#",
  "#.........#...#",
  "#.###########.#",
  "#.............#",
  "###############",
] as const;

export const WORLD = {
  width: MAZE_ROWS[0].length,
  height: MAZE_ROWS.length,
  agentStart: [1, 9] as Point,
  pursuerStart: [3, 9] as Point,
  target: [13, 1] as Point,
};

const DIRECTIONS: Array<{ action: Exclude<Action, "STOP">; dx: number; dy: number }> = [
  { action: "E", dx: 1, dy: 0 },
  { action: "N", dx: 0, dy: -1 },
  { action: "W", dx: -1, dy: 0 },
  { action: "S", dx: 0, dy: 1 },
];

const pointKey = ([x, y]: Point) => `${x},${y}`;

export function isWall([x, y]: Point) {
  return y < 0 || y >= WORLD.height || x < 0 || x >= WORLD.width || MAZE_ROWS[y][x] === "#";
}

export function walkablePoints(): Point[] {
  const points: Point[] = [];
  for (let y = 0; y < WORLD.height; y += 1) {
    for (let x = 0; x < WORLD.width; x += 1) {
      if (!isWall([x, y])) points.push([x, y]);
    }
  }
  return points;
}

export function neighbors(point: Point, includeStop = false): Array<{ action: Action; point: Point }> {
  const result: Array<{ action: Action; point: Point }> = [];
  for (const direction of DIRECTIONS) {
    const next: Point = [point[0] + direction.dx, point[1] + direction.dy];
    if (!isWall(next)) result.push({ action: direction.action, point: next });
  }
  if (includeStop) result.push({ action: "STOP", point });
  return result;
}

function shortestDistance(start: Point, goal: Point): number {
  if (pointKey(start) === pointKey(goal)) return 0;
  const queue: Array<{ point: Point; distance: number }> = [{ point: start, distance: 0 }];
  const seen = new Set<string>([pointKey(start)]);
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor++];
    for (const next of neighbors(current.point)) {
      const key = pointKey(next.point);
      if (seen.has(key)) continue;
      if (key === pointKey(goal)) return current.distance + 1;
      seen.add(key);
      queue.push({ point: next.point, distance: current.distance + 1 });
    }
  }
  return Number.POSITIVE_INFINITY;
}

function manhattan(a: Point, b: Point) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function actionBetween(a: Point, b: Point): Action {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 1) return "E";
  if (dx === -1) return "W";
  if (dy === -1) return "N";
  if (dy === 1) return "S";
  return "STOP";
}

function reconstructPath(parent: Map<string, Point | null>, goal: Point): Point[] | null {
  if (!parent.has(pointKey(goal))) return null;
  const path: Point[] = [];
  let current: Point | null = goal;
  while (current) {
    path.push(current);
    current = parent.get(pointKey(current)) ?? null;
  }
  path.reverse();
  return pointKey(path[0]) === pointKey(WORLD.agentStart) ? path : null;
}

function searchWorldModel(mode: "bfs" | "astar", retainParents: boolean, pathFound: boolean): WorldModel {
  const astar = mode === "astar";
  const represented = [
    "current position",
    "walkable adjacency",
    "goal cell",
    "search frontier",
    ...(astar ? ["heuristic distance h(n)"] : []),
    ...(retainParents ? ["predecessor relation"] : []),
  ];
  const hidden = [
    "pursuer intent",
    "sensor uncertainty",
    "future reward",
    ...(!retainParents ? ["predecessor relation discarded"] : []),
  ];
  return {
    label: astar ? "Directed Pathfinder / A*" : "Pathfinder / Breadth-First Search",
    shortLabel: astar ? "A* PATHFINDER" : "PATHFINDER",
    represented,
    hidden,
    assumed: astar
      ? ["each legal move has equal cost", "Manhattan distance is an admissible heuristic", "the world is fully observable"]
      : ["each legal move has equal cost", "the world is fully observable"],
    output: pathFound ? "a reconstructible path from start to goal" : "goal recognition without a reconstructible route",
    equation: astar ? "f(n) = g(n) + h(n)" : "W → graph → queue traversal → path",
    explanation: !retainParents
      ? "The search still reaches the goal, but the representation discarded the relation required to reconstruct how it got there."
      : astar
        ? "Same graph. A heuristic changes which frontier distinction receives attention first."
        : "Same maze. Here the world is treated as a graph of admissible transitions.",
    accent: !retainParents
      ? "Representational closure failure: the consequence requires a distinction the model discarded."
      : astar
        ? "A* spends attention selectively while preserving optimality here."
        : "Breadth-first search exposes reachability uniformly.",
  };
}

function buildBfsTrace(retainParents: boolean): LabTrace {
  const start = WORLD.agentStart;
  const goal = WORLD.target;
  const queue: Point[] = [start];
  const seen = new Set<string>([pointKey(start)]);
  const parent = new Map<string, Point | null>([[pointKey(start), null]]);
  const frames: LabFrame[] = [];
  const explored: Point[] = [];
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor++];
    explored.push(current);
    const frontier = queue.slice(cursor);
    frames.push({
      tick: frames.length,
      agent: start,
      pursuer: WORLD.pursuerStart,
      target: goal,
      explored: [...explored],
      frontier: [...frontier],
      path: [],
      beliefs: [],
      narration: `Expand (${current[0]}, ${current[1]}). The queue marks the current boundary of known reachability.`,
    });

    if (pointKey(current) === pointKey(goal)) break;

    for (const next of neighbors(current)) {
      const key = pointKey(next.point);
      if (seen.has(key)) continue;
      seen.add(key);
      if (retainParents) parent.set(key, current);
      queue.push(next.point);
    }
  }

  const path = retainParents ? reconstructPath(parent, goal) : null;
  if (!path) {
    frames.push({
      tick: frames.length,
      agent: start,
      pursuer: WORLD.pursuerStart,
      target: goal,
      explored: [...explored],
      frontier: [],
      path: [],
      beliefs: [],
      narration: "Goal recognized. Route reconstruction fails because predecessor links were not retained.",
    });
  } else {
    for (let i = 0; i < path.length; i += 1) {
      frames.push({
        tick: frames.length,
        agent: path[i],
        pursuer: WORLD.pursuerStart,
        target: goal,
        explored: [...explored],
        frontier: [],
        path,
        beliefs: [],
        selectedAction: i < path.length - 1 ? actionBetween(path[i], path[i + 1]) : "STOP",
        narration:
          i === 0
            ? `Goal found after ${explored.length} expansions. Retained predecessor relations close the route.`
            : "Execute the recovered path. The representation produced a route, not a policy or a belief.",
      });
    }
  }

  return {
    mode: "bfs",
    frames,
    worldModel: searchWorldModel("bfs", retainParents, Boolean(path)),
    closure: path ? "reached" : "defect",
    summary: {
      signal: `${explored.length} expansions`,
      detail: path ? `${Math.max(0, path.length - 1)}-step shortest path` : "goal found; path unreconstructible",
      selectedAction: path && path.length > 1 ? actionBetween(path[0], path[1]) : undefined,
    },
  };
}

function buildAstarTrace(retainParents: boolean): LabTrace {
  const start = WORLD.agentStart;
  const goal = WORLD.target;
  const open: Array<{ point: Point; g: number; f: number }> = [{ point: start, g: 0, f: manhattan(start, goal) }];
  const bestG = new Map<string, number>([[pointKey(start), 0]]);
  const parent = new Map<string, Point | null>([[pointKey(start), null]]);
  const closed = new Set<string>();
  const explored: Point[] = [];
  const frames: LabFrame[] = [];

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f || a.g - b.g || pointKey(a.point).localeCompare(pointKey(b.point)));
    const current = open.shift()!;
    const currentKey = pointKey(current.point);
    if (closed.has(currentKey)) continue;
    closed.add(currentKey);
    explored.push(current.point);

    const frontier = open.filter((entry) => !closed.has(pointKey(entry.point))).map((entry) => entry.point);
    const h = manhattan(current.point, goal);
    frames.push({
      tick: frames.length,
      agent: start,
      pursuer: WORLD.pursuerStart,
      target: goal,
      explored: [...explored],
      frontier,
      path: [],
      beliefs: [],
      searchCost: { g: current.g, h, f: current.g + h },
      narration: `Expand (${current.point[0]}, ${current.point[1]}): g=${current.g}, h=${h}, f=${current.g + h}. Lowest estimated total cost crosses the attention boundary first.`,
    });

    if (currentKey === pointKey(goal)) break;

    for (const next of neighbors(current.point)) {
      const key = pointKey(next.point);
      const tentativeG = current.g + 1;
      if (tentativeG >= (bestG.get(key) ?? Number.POSITIVE_INFINITY)) continue;
      bestG.set(key, tentativeG);
      if (retainParents) parent.set(key, current.point);
      open.push({ point: next.point, g: tentativeG, f: tentativeG + manhattan(next.point, goal) });
    }
  }

  const path = retainParents ? reconstructPath(parent, goal) : null;
  if (!path) {
    frames.push({
      tick: frames.length,
      agent: start,
      pursuer: WORLD.pursuerStart,
      target: goal,
      explored: [...explored],
      frontier: [],
      path: [],
      beliefs: [],
      narration: "A* reaches the goal, but the path cannot be reconstructed because predecessor identity was discarded.",
    });
  } else {
    for (let i = 0; i < path.length; i += 1) {
      frames.push({
        tick: frames.length,
        agent: path[i],
        pursuer: WORLD.pursuerStart,
        target: goal,
        explored: [...explored],
        frontier: [],
        path,
        beliefs: [],
        selectedAction: i < path.length - 1 ? actionBetween(path[i], path[i + 1]) : "STOP",
        narration: i === 0 ? `Goal found after ${explored.length} expansions. A route closes through retained predecessor links.` : "Execute the A* route.",
      });
    }
  }

  return {
    mode: "astar",
    frames,
    worldModel: searchWorldModel("astar", retainParents, Boolean(path)),
    closure: path ? "reached" : "defect",
    summary: {
      signal: `${explored.length} expansions`,
      detail: path ? `${Math.max(0, path.length - 1)}-step shortest path` : "goal found; path unreconstructible",
      selectedAction: path && path.length > 1 ? actionBetween(path[0], path[1]) : undefined,
    },
  };
}

function leafUtility(agent: Point, pursuer: Point) {
  const targetDistance = shortestDistance(agent, WORLD.target);
  const collisionPenalty = pointKey(agent) === pointKey(pursuer) ? 4 : 0;
  return -targetDistance - collisionPenalty;
}

function buildGameTreeTrace(mode: "minimax" | "expectimax"): LabTrace {
  const pacmanMoves = neighbors(WORLD.agentStart);
  const ghostReplies = neighbors(WORLD.pursuerStart, true);

  const candidateScores: CandidateScore[] = pacmanMoves.map((pacmanMove) => {
    const leafScores = ghostReplies.map((ghostMove) => leafUtility(pacmanMove.point, ghostMove.point));
    const score = mode === "minimax" ? Math.min(...leafScores) : leafScores.reduce((sum, value) => sum + value, 0) / leafScores.length;
    return { action: pacmanMove.action, score };
  });

  const selected = candidateScores.reduce((best, candidate) => (candidate.score > best.score ? candidate : best));
  const selectedPacman = pacmanMoves.find((move) => move.action === selected.action) ?? pacmanMoves[0];
  const replyScores = ghostReplies.map((ghostMove) => ({ ghostMove, score: leafUtility(selectedPacman.point, ghostMove.point) }));
  const realizedReply = mode === "minimax"
    ? replyScores.reduce((worst, candidate) => (candidate.score < worst.score ? candidate : worst)).ghostMove
    : replyScores.find((candidate) => candidate.ghostMove.action === "E")?.ghostMove ?? replyScores[0].ghostMove;

  const operator = mode === "minimax" ? "MIN" : "E";
  const frames: LabFrame[] = [
    {
      tick: 0,
      agent: WORLD.agentStart,
      pursuer: WORLD.pursuerStart,
      target: WORLD.target,
      explored: [],
      frontier: [],
      path: [],
      beliefs: [],
      candidateScores,
      selectedAction: selected.action,
      narration: mode === "minimax"
        ? "Treat the pursuer as adversarial: every candidate action is scored by its worst legal reply."
        : "Treat the pursuer as stochastic: every legal reply contributes equally to the expected score.",
    },
    {
      tick: 1,
      agent: selectedPacman.point,
      pursuer: WORLD.pursuerStart,
      target: WORLD.target,
      explored: [],
      frontier: [],
      path: [],
      beliefs: [],
      candidateScores,
      selectedAction: selected.action,
      narration: `${operator} changes the decision surface. The agent chooses ${selected.action} from the same initial world state.`,
    },
    {
      tick: 2,
      agent: selectedPacman.point,
      pursuer: realizedReply.point,
      target: WORLD.target,
      explored: [],
      frontier: [],
      path: [],
      beliefs: [],
      candidateScores,
      selectedAction: selected.action,
      narration: mode === "minimax"
        ? "The pursuer realizes the worst reply. The ontology supplied to the tree is: opponent."
        : "One legal stochastic reply is realized. The ontology supplied to the tree is: random variable.",
    },
  ];

  const minimax = mode === "minimax";
  return {
    mode,
    frames,
    worldModel: {
      label: minimax ? "Adversary / Minimax" : "Stochastic / Expectimax",
      shortLabel: minimax ? "ADVERSARY" : "STOCHASTIC",
      represented: ["agent actions", "pursuer actions", "lookahead outcomes", "distance to target"],
      hidden: ["long-term learning", "sensor uncertainty"],
      assumed: [
        minimax ? "pursuer selects the worst outcome" : "pursuer actions are uniformly stochastic",
        "the current world state is fully observable",
      ],
      output: "one action selected from a game tree",
      equation: minimax ? "pursuer = MIN" : "pursuer = expectation",
      explanation: minimax
        ? "The visible pursuer did not change. Its formal type changed to adversary."
        : "The visible pursuer did not change. Its formal type changed to probability distribution.",
      accent: minimax ? "Worst-case semantics favor safety." : "Expected-value semantics can tolerate risk.",
    },
    closure: "reached",
    summary: {
      signal: `choose ${selected.action}`,
      detail: minimax ? "worst-case reply operator" : "expected reply operator",
      selectedAction: selected.action,
    },
  };
}

const LEFT: Record<Exclude<Action, "STOP">, Exclude<Action, "STOP">> = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT: Record<Exclude<Action, "STOP">, Exclude<Action, "STOP">> = { N: "E", E: "S", S: "W", W: "N" };

function move(point: Point, action: Exclude<Action, "STOP">): Point {
  const direction = DIRECTIONS.find((item) => item.action === action)!;
  const next: Point = [point[0] + direction.dx, point[1] + direction.dy];
  return isWall(next) ? point : next;
}

function buildMdpTrace(): LabTrace {
  const points = walkablePoints();
  const gamma = 0.9;
  const livingReward = -0.12;
  const goalReward = 15;
  const hazardReward = -12;
  const iterations = 18;
  let values = new Map<string, number>(points.map((point) => [pointKey(point), 0]));
  values.set(pointKey(WORLD.target), goalReward);
  values.set(pointKey(WORLD.pursuerStart), hazardReward);
  const frames: LabFrame[] = [];

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const nextValues = new Map(values);
    const policy: PolicyCell[] = [];

    for (const point of points) {
      const key = pointKey(point);
      if (key === pointKey(WORLD.target) || key === pointKey(WORLD.pursuerStart)) continue;

      let bestAction: Exclude<Action, "STOP"> = "N";
      let bestValue = Number.NEGATIVE_INFINITY;
      for (const action of ["N", "S", "E", "W"] as const) {
        const intended = values.get(pointKey(move(point, action))) ?? 0;
        const slipLeft = values.get(pointKey(move(point, LEFT[action]))) ?? 0;
        const slipRight = values.get(pointKey(move(point, RIGHT[action]))) ?? 0;
        const q = livingReward + gamma * (0.8 * intended + 0.1 * slipLeft + 0.1 * slipRight);
        if (q > bestValue) {
          bestValue = q;
          bestAction = action;
        }
      }
      nextValues.set(key, bestValue);
      policy.push({ point, action: bestAction });
    }

    nextValues.set(pointKey(WORLD.target), goalReward);
    nextValues.set(pointKey(WORLD.pursuerStart), hazardReward);
    values = nextValues;
    const startPolicy = policy.find((cell) => pointKey(cell.point) === pointKey(WORLD.agentStart));
    frames.push({
      tick: iteration,
      agent: WORLD.agentStart,
      pursuer: WORLD.pursuerStart,
      target: WORLD.target,
      explored: [],
      frontier: [],
      path: [],
      beliefs: [],
      values: points.map((point) => ({ point, value: values.get(pointKey(point)) ?? 0 })),
      policy,
      selectedAction: startPolicy?.action,
      narration: iteration === 0
        ? "Initialize state values. Reward, transition uncertainty, and discount are now part of the represented world."
        : `Value iteration ${iteration + 1}/${iterations}: future consequence propagates backward through the transition model.`,
    });
  }

  const finalFrame = frames[frames.length - 1];
  return {
    mode: "mdp",
    frames,
    worldModel: {
      label: "Planner / Markov Decision Process",
      shortLabel: "PLANNER",
      represented: ["state cells", "transition probabilities", "reward", "discount", "terminal goal", "hazard state"],
      hidden: ["search frontier", "opponent intent", "sensor uncertainty"],
      assumed: ["80% intended transition", "10% slip left / right", `discount γ=${gamma}`, `living reward ${livingReward}`],
      output: "a value function and stationary policy",
      equation: "V(s) = max_a [ R(s) + γ E V(s') ]",
      explanation: "The maze is no longer primarily a route problem. It is a field of expected future consequence.",
      accent: "Planning turns geometry into value and action into policy.",
    },
    closure: "reached",
    summary: {
      signal: `policy ${finalFrame.selectedAction ?? "STOP"}`,
      detail: `${iterations} value-iteration sweeps`,
      selectedAction: finalFrame.selectedAction,
    },
  };
}

function normalizeBeliefs(weights: Map<string, number>, points: Point[]): BeliefCell[] {
  const total = points.reduce((sum, point) => sum + (weights.get(pointKey(point)) ?? 0), 0);
  const divisor = total > 0 ? total : 1;
  return points.map((point) => ({ point, probability: (weights.get(pointKey(point)) ?? 0) / divisor }));
}

function diffuseBeliefs(previous: BeliefCell[], points: Point[]) {
  const weights = new Map<string, number>();
  for (const cell of previous) {
    const exits = neighbors(cell.point, true);
    const share = cell.probability / exits.length;
    for (const exit of exits) {
      const key = pointKey(exit.point);
      weights.set(key, (weights.get(key) ?? 0) + share);
    }
  }
  return normalizeBeliefs(weights, points);
}

function observeBeliefs(prior: BeliefCell[], agent: Point, ping: number) {
  const weights = new Map<string, number>();
  for (const cell of prior) {
    const error = Math.abs(manhattan(agent, cell.point) - ping);
    const likelihood = error === 0 ? 0.55 : error === 1 ? 0.22 : error === 2 ? 0.07 : 0.015;
    weights.set(pointKey(cell.point), cell.probability * likelihood);
  }
  return normalizeBeliefs(weights, prior.map((cell) => cell.point));
}

function buildBayesTrace(): LabTrace {
  const points = walkablePoints().filter((point) => pointKey(point) !== pointKey(WORLD.agentStart));
  let beliefs: BeliefCell[] = points.map((point) => ({ point, probability: 1 / points.length }));
  const ghostTruth: Point[] = [WORLD.pursuerStart, [4, 9], [5, 9], [6, 9], [7, 9], [8, 9]];
  const noise = [1, -1, 0, 1, 0, -1];
  const frames: LabFrame[] = [];

  for (let tick = 0; tick < ghostTruth.length; tick += 1) {
    if (tick > 0) beliefs = diffuseBeliefs(beliefs, points);
    const ping = Math.max(0, manhattan(WORLD.agentStart, ghostTruth[tick]) + noise[tick]);
    beliefs = observeBeliefs(beliefs, WORLD.agentStart, ping);
    frames.push({
      tick,
      agent: WORLD.agentStart,
      pursuer: ghostTruth[tick],
      target: WORLD.target,
      explored: [],
      frontier: [],
      path: [],
      beliefs,
      ping,
      narration: tick === 0
        ? `The pursuer is hidden. A noisy distance ping (${ping}) updates a uniform prior into a belief state.`
        : `Predict through the transition model, receive ping ${ping}, then update P(position | observations).`,
    });
  }

  const peak = frames[frames.length - 1].beliefs.reduce((best, cell) => cell.probability > best.probability ? cell : best);
  return {
    mode: "bayes",
    frames,
    worldModel: {
      label: "Blind Bayesian / Belief Filter",
      shortLabel: "BLIND BAYESIAN",
      represented: ["agent position", "noisy distance ping", "belief over pursuer position", "pursuer transition model"],
      hidden: ["true pursuer position"],
      assumed: ["pursuer performs a local random walk", "sensor error is bounded but nonzero"],
      output: "a probability distribution over hidden state",
      equation: "prior × likelihood → posterior",
      explanation: "Reality and observation separate. The agent acts on a belief about the world, not direct access to it.",
      accent: "Partial observability makes uncertainty part of state.",
    },
    closure: "reached",
    summary: {
      signal: `${(peak.probability * 100).toFixed(1)}% peak belief`,
      detail: `peak at (${peak.point[0]}, ${peak.point[1]}) after ${frames.length} observations`,
    },
  };
}

export function buildTrace(mode: Mode, options: BuildOptions = {}): LabTrace {
  const retainParents = options.retainParents ?? true;
  if (mode === "bfs") return buildBfsTrace(retainParents);
  if (mode === "astar") return buildAstarTrace(retainParents);
  if (mode === "minimax" || mode === "expectimax") return buildGameTreeTrace(mode);
  if (mode === "mdp") return buildMdpTrace();
  return buildBayesTrace();
}

export function buildComparison(): ComparisonRow[] {
  return MODE_ORDER.map((mode) => {
    const trace = buildTrace(mode);
    return {
      mode,
      label: trace.worldModel.shortLabel,
      output: trace.worldModel.output,
      signal: trace.summary.signal,
      detail: trace.summary.detail,
      selectedAction: trace.summary.selectedAction,
    };
  });
}

export const MODE_ORDER: Mode[] = ["bfs", "astar", "minimax", "expectimax", "mdp", "bayes"];
