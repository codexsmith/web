export type Point = readonly [number, number];
export type Mode = "bfs" | "minimax" | "expectimax" | "bayes";
export type Action = "N" | "S" | "E" | "W" | "STOP";

export type BeliefCell = {
  point: Point;
  probability: number;
};

export type CandidateScore = {
  action: Action;
  score: number;
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
  ping?: number;
  candidateScores?: CandidateScore[];
  selectedAction?: Action;
  narration: string;
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

function buildBfsTrace(): LabTrace {
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
      narration: `Expand (${current[0]}, ${current[1]}). The maze is a graph; the queue is the current boundary of known reachability.`,
    });

    if (pointKey(current) === pointKey(goal)) break;

    for (const next of neighbors(current)) {
      const key = pointKey(next.point);
      if (seen.has(key)) continue;
      seen.add(key);
      parent.set(key, current);
      queue.push(next.point);
    }
  }

  const path: Point[] = [];
  let current: Point | null = goal;
  while (current) {
    path.push(current);
    current = parent.get(pointKey(current)) ?? null;
  }
  path.reverse();

  const finalExplored = [...explored];
  for (let i = 0; i < path.length; i += 1) {
    frames.push({
      tick: frames.length,
      agent: path[i],
      pursuer: WORLD.pursuerStart,
      target: goal,
      explored: finalExplored,
      frontier: [],
      path,
      beliefs: [],
      selectedAction: i < path.length - 1 ? actionBetween(path[i], path[i + 1]) : "STOP",
      narration:
        i === 0
          ? `Goal found after ${finalExplored.length} expansions. A path is now reconstructible from the retained parent relation.`
          : `Execute the recovered path. The search representation produced a route, not a policy or a belief.`,
    });
  }

  return {
    mode: "bfs",
    frames,
    worldModel: {
      label: "Pathfinder / Breadth-First Search",
      shortLabel: "PATHFINDER",
      represented: ["current position", "walkable adjacency", "goal cell", "search frontier"],
      hidden: ["pursuer intent", "sensor uncertainty", "future reward"],
      assumed: ["each legal move has equal cost", "the world is fully observable"],
      output: "a path from start to goal",
      equation: "W → graph → queue traversal → path",
      explanation: "Same maze. Here the world is treated as a graph of admissible transitions.",
      accent: "Search exposes reachability.",
    },
  };
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
    const score =
      mode === "minimax"
        ? Math.min(...leafScores)
        : leafScores.reduce((sum, value) => sum + value, 0) / leafScores.length;
    return { action: pacmanMove.action, score };
  });

  const selected = candidateScores.reduce((best, candidate) => (candidate.score > best.score ? candidate : best));
  const selectedPacman = pacmanMoves.find((move) => move.action === selected.action) ?? pacmanMoves[0];
  const replyScores = ghostReplies.map((ghostMove) => ({ ghostMove, score: leafUtility(selectedPacman.point, ghostMove.point) }));
  const realizedReply =
    mode === "minimax"
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
      narration:
        mode === "minimax"
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
      narration: `${operator} changes the decision surface. Pac-Man chooses ${selected.action} from the same initial world state.`,
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
      narration:
        mode === "minimax"
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
      equation: minimax ? "ghost = MIN" : "ghost = expectation",
      explanation: minimax
        ? "The visible pursuer did not change. Its formal type changed to adversary."
        : "The visible pursuer did not change. Its formal type changed to probability distribution.",
      accent: minimax ? "Worst-case semantics favor safety." : "Expected-value semantics can tolerate risk.",
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
  const ghostTruth: Point[] = [
    WORLD.pursuerStart,
    [4, 9],
    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
  ];
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
      narration:
        tick === 0
          ? `The pursuer is hidden. A noisy distance ping (${ping}) updates a uniform prior into a belief state.`
          : `Predict through the transition model, receive ping ${ping}, then update P(position | observations).`,
    });
  }

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
  };
}

const TRACE_BUILDERS: Record<Mode, () => LabTrace> = {
  bfs: buildBfsTrace,
  minimax: () => buildGameTreeTrace("minimax"),
  expectimax: () => buildGameTreeTrace("expectimax"),
  bayes: buildBayesTrace,
};

export function buildTrace(mode: Mode): LabTrace {
  return TRACE_BUILDERS[mode]();
}

export const MODE_ORDER: Mode[] = ["bfs", "minimax", "expectimax", "bayes"];
