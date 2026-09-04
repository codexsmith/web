import {
  neighbors,
  walkablePoints,
  WORLD,
  type BeliefCell,
  type LabFrame,
  type Point,
} from "./engine";

export const PARTICLE_BUDGETS = ["exact", 500, 100, 20, 5] as const;
export type ParticleBudget = (typeof PARTICLE_BUDGETS)[number];

export type ParticleFrame = {
  particles: Point[];
  beliefs: BeliefCell[];
  totalVariation: number;
  effectiveSampleSize: number;
  support: number;
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

function totalVariation(exact: BeliefCell[], approximate: BeliefCell[]) {
  const exactByPoint = new Map(exact.map((cell) => [pointKey(cell.point), cell.probability]));
  return 0.5 * approximate.reduce(
    (sum, cell) => sum + Math.abs(cell.probability - (exactByPoint.get(pointKey(cell.point)) ?? 0)),
    0,
  );
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

export function buildParticleApproximation(exactFrames: LabFrame[], budget: number): ParticleFrame[] {
  const points = walkablePoints().filter((point) => pointKey(point) !== pointKey(WORLD.agentStart));
  let particles = initializeParticles(points, budget);
  const frames: ParticleFrame[] = [];

  for (let tick = 0; tick < exactFrames.length; tick += 1) {
    const exactFrame = exactFrames[tick];
    const ping = exactFrame.ping;
    if (typeof ping !== "number") throw new Error("Particle approximation requires Bayesian frames with distance observations.");

    const random = mulberry32(budget * 1009 + tick * 9176 + 17);
    if (tick > 0) {
      particles = particles.map((particle) => {
        const exits = neighbors(particle, true);
        return exits[Math.floor(random() * exits.length)].point;
      });
    }

    const rawWeights = particles.map((particle) => likelihood(particle, ping));
    const weightTotal = rawWeights.reduce((sum, weight) => sum + weight, 0);
    const weights = rawWeights.map((weight) => weight / weightTotal);
    const effectiveSampleSize = 1 / weights.reduce((sum, weight) => sum + weight * weight, 0);

    particles = systematicResample(particles, weights, budget, random);
    const beliefs = empiricalBeliefs(points, particles);
    const support = beliefs.filter((cell) => cell.probability > 0).length;

    frames.push({
      particles: [...particles],
      beliefs,
      totalVariation: totalVariation(exactFrame.beliefs, beliefs),
      effectiveSampleSize,
      support,
    });
  }

  return frames;
}
