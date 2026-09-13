import {
  buildTrace,
  neighbors,
  walkablePoints,
  WORLD,
  type BeliefCell,
  type Point,
} from "./engine";

export type SensorModel = "calibrated" | "overconfident" | "biased-plus-2";
export type TransitionModel = "random-walk" | "sticky" | "west-drift";

export type BayesModelConfig = {
  sensor: SensorModel;
  transition: TransitionModel;
};

export type BayesModelFrame = {
  tick: number;
  ping: number;
  truth: Point;
  beliefs: BeliefCell[];
  referenceBeliefs: BeliefCell[];
  peak: Point;
  peakProbability: number;
  truthProbability: number;
  entropy: number;
  peakMissDistance: number;
  totalVariationFromReference: number;
  referencePeak: Point;
  referencePeakProbability: number;
  referenceTruthProbability: number;
  referenceEntropy: number;
  confidenceUpTruthDown: boolean;
};

export const SENSOR_MODELS: Array<{ id: SensorModel; label: string; detail: string }> = [
  { id: "calibrated", label: "CALIBRATED", detail: "Use the same bounded-noise likelihood that generated the reference posterior." },
  { id: "overconfident", label: "OVERCONFIDENT", detail: "Treat exact range matches as overwhelmingly more likely than nearby errors." },
  { id: "biased-plus-2", label: "BIAS +2", detail: "Assume the sensor under-reports distance by two cells, then update sharply around that shifted range." },
];

export const TRANSITION_MODELS: Array<{ id: TransitionModel; label: string; detail: string }> = [
  { id: "random-walk", label: "RANDOM WALK", detail: "Local moves, including staying in place, share probability uniformly." },
  { id: "sticky", label: "80% STAY", detail: "Assume the hidden pursuer usually remains in the same cell." },
  { id: "west-drift", label: "80% WEST", detail: "Assume strong westward drift even though the fixed world trajectory moves east." },
];

export const BAYES_MODEL_PRESETS: Array<{ id: string; label: string; detail: string; config: BayesModelConfig }> = [
  {
    id: "matched",
    label: "MATCHED",
    detail: "Reference sensor + reference transition model.",
    config: { sensor: "calibrated", transition: "random-walk" },
  },
  {
    id: "sharp-sensor",
    label: "SHARP SENSOR",
    detail: "Correct dynamics, but an overconfident likelihood.",
    config: { sensor: "overconfident", transition: "random-walk" },
  },
  {
    id: "wrong-dynamics",
    label: "WRONG DYNAMICS",
    detail: "Calibrated sensor, false westward transition prior.",
    config: { sensor: "calibrated", transition: "west-drift" },
  },
  {
    id: "confidently-wrong",
    label: "CONFIDENTLY WRONG",
    detail: "Overconfident sensor + false westward dynamics.",
    config: { sensor: "overconfident", transition: "west-drift" },
  },
];

const pointKey = ([x, y]: Point) => `${x},${y}`;
const manhattan = (a: Point, b: Point) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

function normalize(weights: Map<string, number>, points: Point[]): BeliefCell[] {
  const total = points.reduce((sum, point) => sum + (weights.get(pointKey(point)) ?? 0), 0);
  const divisor = total > 0 ? total : 1;
  return points.map((point) => ({ point, probability: (weights.get(pointKey(point)) ?? 0) / divisor }));
}

function sensorLikelihood(point: Point, ping: number, sensor: SensorModel) {
  const expectedRange = sensor === "biased-plus-2" ? ping + 2 : ping;
  const error = Math.abs(manhattan(WORLD.agentStart, point) - expectedRange);
  if (sensor === "calibrated") {
    return error === 0 ? 0.55 : error === 1 ? 0.22 : error === 2 ? 0.07 : 0.015;
  }
  return error === 0 ? 0.94 : error === 1 ? 0.045 : error === 2 ? 0.012 : 0.001;
}

function transitionBeliefs(previous: BeliefCell[], points: Point[], transition: TransitionModel) {
  const weights = new Map<string, number>();
  const add = (point: Point, value: number) => {
    const key = pointKey(point);
    weights.set(key, (weights.get(key) ?? 0) + value);
  };

  for (const cell of previous) {
    const exits = neighbors(cell.point, true).map((exit) => exit.point);
    if (transition === "random-walk") {
      const share = cell.probability / exits.length;
      for (const point of exits) add(point, share);
      continue;
    }

    if (transition === "sticky") {
      const other = exits.filter((point) => pointKey(point) !== pointKey(cell.point));
      add(cell.point, cell.probability * 0.8);
      if (other.length === 0) {
        add(cell.point, cell.probability * 0.2);
      } else {
        for (const point of other) add(point, cell.probability * 0.2 / other.length);
      }
      continue;
    }

    const west: Point = [cell.point[0] - 1, cell.point[1]];
    const westExit = exits.find((point) => pointKey(point) === pointKey(west)) ?? cell.point;
    add(westExit, cell.probability * 0.8);
    const remainder = exits.filter((point) => pointKey(point) !== pointKey(westExit));
    if (remainder.length === 0) {
      add(westExit, cell.probability * 0.2);
    } else {
      for (const point of remainder) add(point, cell.probability * 0.2 / remainder.length);
    }
  }

  return normalize(weights, points);
}

function observe(previous: BeliefCell[], points: Point[], ping: number, sensor: SensorModel) {
  const weights = new Map<string, number>();
  for (const cell of previous) {
    weights.set(pointKey(cell.point), cell.probability * sensorLikelihood(cell.point, ping, sensor));
  }
  return normalize(weights, points);
}

function entropy(beliefs: BeliefCell[]) {
  return -beliefs.reduce((sum, cell) => cell.probability > 0 ? sum + cell.probability * Math.log(cell.probability) : sum, 0);
}

function peakOf(beliefs: BeliefCell[]) {
  return beliefs.reduce((best, cell) => cell.probability > best.probability ? cell : best);
}

function probabilityAt(beliefs: BeliefCell[], point: Point) {
  return beliefs.find((cell) => pointKey(cell.point) === pointKey(point))?.probability ?? 0;
}

function totalVariation(left: BeliefCell[], right: BeliefCell[]) {
  const rightByPoint = new Map(right.map((cell) => [pointKey(cell.point), cell.probability]));
  return 0.5 * left.reduce((sum, cell) => sum + Math.abs(cell.probability - (rightByPoint.get(pointKey(cell.point)) ?? 0)), 0);
}

export function buildBayesModelMismatch(config: BayesModelConfig): BayesModelFrame[] {
  const referenceFrames = buildTrace("bayes").frames;
  const points = walkablePoints().filter((point) => pointKey(point) !== pointKey(WORLD.agentStart));
  let beliefs: BeliefCell[] = points.map((point) => ({ point, probability: 1 / points.length }));
  const frames: BayesModelFrame[] = [];

  for (let tick = 0; tick < referenceFrames.length; tick += 1) {
    const reference = referenceFrames[tick];
    if (typeof reference.ping !== "number") throw new Error("Bayesian model mismatch requires a fixed observation tape.");
    if (tick > 0) beliefs = transitionBeliefs(beliefs, points, config.transition);
    beliefs = observe(beliefs, points, reference.ping, config.sensor);

    const peak = peakOf(beliefs);
    const referencePeak = peakOf(reference.beliefs);
    const truthProbability = probabilityAt(beliefs, reference.pursuer);
    const referenceTruthProbability = probabilityAt(reference.beliefs, reference.pursuer);
    const currentEntropy = entropy(beliefs);
    const referenceEntropy = entropy(reference.beliefs);

    frames.push({
      tick,
      ping: reference.ping,
      truth: reference.pursuer,
      beliefs,
      referenceBeliefs: reference.beliefs,
      peak: peak.point,
      peakProbability: peak.probability,
      truthProbability,
      entropy: currentEntropy,
      peakMissDistance: manhattan(peak.point, reference.pursuer),
      totalVariationFromReference: totalVariation(reference.beliefs, beliefs),
      referencePeak: referencePeak.point,
      referencePeakProbability: referencePeak.probability,
      referenceTruthProbability,
      referenceEntropy,
      confidenceUpTruthDown: peak.probability > referencePeak.probability && truthProbability < referenceTruthProbability,
    });
  }

  return frames;
}
