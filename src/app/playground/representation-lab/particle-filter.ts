import {
  neighbors,
  walkablePoints,
  WORLD,
  type BeliefCell,
  type LabFrame,
  type Point,
} from "./engine";
import type { BayesSubphase } from "./semantic-trace";

export const PARTICLE_BUDGETS = ["exact", 500, 100, 20, 5] as const;
export type ParticleBudget = (typeof PARTICLE_BUDGETS)[number];

export type WeightedParticle = {
  point: Point;
  weight: number;
};

export type ParticleFrame = {
  particles: Point[];
  beliefs: BeliefCell[];
  predictedParticles: Point[];
  predictedBeliefs: BeliefCell[];
  weightedParticles: WeightedParticle[];
  weightedBeliefs: BeliefCell[];
  totalVariation: number;
  effectiveSampleSize: number;
  support: number;
  predictedSupport: number;
  weightedSupport: number;
};

export type ParticlePhaseView = {
  phase: BayesSubphase | "CARRIER";
  particles: Point[];
  beliefs: BeliefCell[];
  weights: number[] | null;
  support: number;
  operation: string;
};

const pointKey = ([x, y]: Point) => `${x},${y}`;
const manhattan = (a: Point, b: Point) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

function likelihood(point: Point, ping: number) {
  const error = Math.abs(manhattan(WORLD.agentStart, point) - ping);
  return error === 0 ? 0.55 : error === 1 ? 0.22 : error === 2 ? 0.07 : 0.015;
}

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let mixed = Math.imul(value ^ (value >>> 15), 1 | value);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function initializeParticles(points: Point[], budget: number): Point[] {
  return Array.from({ length: budget }, (_, index) => {
    const pointIndex = Math.min(points.length - 1, Math.floor(((index + 0.5) * points.length) / budget));
    return points[pointIndex];
  });
}

function empiricalBeliefs(points: Point[], particles: Point[]): BeliefCell[] {
  const counts = new Map<string, number>();
  for (const particle of particles) {
    const key = pointKey(particle);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return points.map((point) => ({ point, probability: (counts.get(pointKey(point)) ?? 0) / particles.length }));
}

function weightedBeliefs(points: Point[], particles: Point[], weights: number[]): BeliefCell[] {
  const mass = new Map<string, number>();
  particles.forEach((particle, index) => {
    const key = pointKey(particle);
    mass.set(key, (mass.get(key) ?? 0) + (weights[index] ?? 0));
  });
  return points.map((point) => ({ point, probability: mass.get(pointKey(point)) ?? 0 }));
}

export function totalVariationDistance(reference: BeliefCell[], candidate: BeliefCell[]) {
  const referenceByPoint = new Map(reference.map((cell) => [pointKey(cell.point), cell.probability]));
  return 0.5 * candidate.reduce(
    (sum, cell) => sum + Math.abs(cell.probability - (referenceByPoint.get(pointKey(cell.point)) ?? 0)),
    0,
  );
}

function supportOf(beliefs: BeliefCell[]) {
  return beliefs.filter((cell) => cell.probability > 0).length;
}

function systematicResample(particles: Point[], weights: number[], budget: number, random: () => number): Point[] {
  const result: Point[] = [];
  const start = random() / budget;
  let cursor = 0;
  let cumulative = weights[0] ?? 1;

  for (let index = 0; index < budget; index += 1) {
    const threshold = start + index / budget;
    while (threshold > cumulative && cursor < weights.length - 1) {
      cursor += 1;
      cumulative += weights[cursor];
    }
    result.push(particles[cursor]);
  }
  return result;
}

export function particlePhaseView(frame: ParticleFrame, subphase?: BayesSubphase): ParticlePhaseView {
  if (subphase === "PREDICT") {
    return {
      phase: "PREDICT",
      particles: frame.predictedParticles,
      beliefs: frame.predictedBeliefs,
      weights: null,
      support: frame.predictedSupport,
      operation: "Transport particles through the hidden-state transition model before evidence arrives.",
    };
  }

  if (subphase === "OBSERVE") {
    return {
      phase: "OBSERVE",
      particles: frame.weightedParticles.map((particle) => particle.point),
      beliefs: frame.weightedBeliefs,
      weights: frame.weightedParticles.map((particle) => particle.weight),
      support: frame.weightedSupport,
      operation: "Keep particle locations fixed while the sensor likelihood changes their relative mass.",
    };
  }

  if (subphase === "UPDATE") {
    return {
      phase: "UPDATE",
      particles: frame.particles,
      beliefs: frame.beliefs,
      weights: null,
      support: frame.support,
      operation: "Resample the weighted hypotheses into the bounded empirical posterior carrier.",
    };
  }

  return {
    phase: "CARRIER",
    particles: frame.particles,
    beliefs: frame.beliefs,
    weights: null,
    support: frame.support,
    operation: "The current finite carrier retains the most recently resampled posterior.",
  };
}

export function buildParticleApproximation(exactFrames: LabFrame[], budget: number): ParticleFrame[] {
  const points = walkablePoints().filter((point) => pointKey(point) !== pointKey(WORLD.agentStart));
  let particles = initializeParticles(points, budget);
  const frames: ParticleFrame[] = [];

  for (let tick = 0; tick < exactFrames.length; tick += 1) {
    const exactFrame = exactFrames[tick];
    const ping = exactFrame.ping;
    if (typeof ping !== "number") throw new Error("Particle approximation requires Bayesian frames with distance observations.");

    const random = mulberry32(budget * 1009 + tick * 9176 + 17);
    const predictedParticles = tick === 0
      ? [...particles]
      : particles.map((particle) => {
          const exits = neighbors(particle, true);
          return exits[Math.floor(random() * exits.length)].point;
        });
    const predictedBeliefs = empiricalBeliefs(points, predictedParticles);

    const rawWeights = predictedParticles.map((particle) => likelihood(particle, ping));
    const weightTotal = rawWeights.reduce((sum, weight) => sum + weight, 0);
    const weights = rawWeights.map((weight) => weight / weightTotal);
    const effectiveSampleSize = 1 / weights.reduce((sum, weight) => sum + weight * weight, 0);
    const weightedParticles = predictedParticles.map((point, index) => ({ point, weight: weights[index] }));
    const observedBeliefs = weightedBeliefs(points, predictedParticles, weights);

    particles = systematicResample(predictedParticles, weights, budget, random);
    const beliefs = empiricalBeliefs(points, particles);

    frames.push({
      particles: [...particles],
      beliefs,
      predictedParticles: [...predictedParticles],
      predictedBeliefs,
      weightedParticles,
      weightedBeliefs: observedBeliefs,
      totalVariation: totalVariationDistance(exactFrame.beliefs, beliefs),
      effectiveSampleSize,
      support: supportOf(beliefs),
      predictedSupport: supportOf(predictedBeliefs),
      weightedSupport: supportOf(observedBeliefs),
    });
  }

  return frames;
}