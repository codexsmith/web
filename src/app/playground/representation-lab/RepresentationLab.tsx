"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./representation-lab.module.css";
import {
  buildTrace,
  isWall,
  MAZE_ROWS,
  MODE_ORDER,
  type Action,
  type LabFrame,
  type Mode,
  type Point,
  WORLD,
} from "./engine";

const MODE_LABELS: Record<Mode, { title: string; technical: string }> = {
  bfs: { title: "Pathfinder", technical: "BFS" },
  minimax: { title: "Adversary", technical: "Minimax" },
  expectimax: { title: "Stochastic", technical: "Expectimax" },
  bayes: { title: "Blind Bayesian", technical: "Bayes filter" },
};

const ACTION_LABELS: Record<Action, string> = {
  N: "north",
  S: "south",
  E: "east",
  W: "west",
  STOP: "stop",
};

const CELL = 38;

const keyOf = ([x, y]: Point) => `${x},${y}`;

function scoreText(score: number) {
  return Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1);
}

function currentBeliefPeak(frame: LabFrame) {
  if (frame.beliefs.length === 0) return null;
  return frame.beliefs.reduce((best, cell) => (cell.probability > best.probability ? cell : best));
}

export function RepresentationLab() {
  const [mode, setMode] = useState<Mode>("bfs");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [revealTruth, setRevealTruth] = useState(false);
  const trace = useMemo(() => buildTrace(mode), [mode]);
  const frame = trace.frames[Math.min(step, trace.frames.length - 1)];
  const beliefPeak = currentBeliefPeak(frame);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
    setRevealTruth(false);
  }, [mode]);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setStep((current) => {
        if (current >= trace.frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, mode === "bfs" ? 105 : 900);

    return () => window.clearInterval(interval);
  }, [mode, playing, trace.frames.length]);

  const explored = useMemo(() => new Set(frame.explored.map(keyOf)), [frame.explored]);
  const frontier = useMemo(() => new Set(frame.frontier.map(keyOf)), [frame.frontier]);
  const path = useMemo(() => new Set(frame.path.map(keyOf)), [frame.path]);
  const beliefs = useMemo(() => new Map(frame.beliefs.map((cell) => [keyOf(cell.point), cell.probability])), [frame.beliefs]);

  const selectMode = (nextMode: Mode) => {
    setMode(nextMode);
  };

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };

  const togglePlayback = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step >= trace.frames.length - 1) setStep(0);
    setPlaying(true);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <a className={styles.crumb} href="/">
            Boundary First Labs / Playground
          </a>
          <p className={styles.eyebrow}>Representational Mechanics Instrument 001</p>
          <h1>Same World, Different Reasoner</h1>
          <p className={styles.lede}>
            Hold the maze fixed. Change the formal model. Watch what the machine can see, infer, and do.
          </p>
        </div>
        <div className={styles.headerStatement} aria-label="Core proposition">
          <span>CONTROL VARIABLE</span>
          <strong>the world</strong>
          <span>MANIPULATED VARIABLE</span>
          <strong>the representation</strong>
        </div>
      </header>

      <section className={styles.modeStrip} aria-label="Reasoning mode">
        {MODE_ORDER.map((item) => {
          const selected = mode === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              className={selected ? styles.modeButtonActive : styles.modeButton}
              onClick={() => selectMode(item)}
            >
              <span>{MODE_LABELS[item].title}</span>
              <small>{MODE_LABELS[item].technical}</small>
            </button>
          );
        })}
      </section>

      <section className={styles.instrument}>
        <div className={styles.worldColumn}>
          <div className={styles.worldToolbar}>
            <div className={styles.runControls}>
              <button type="button" className={styles.primaryControl} onClick={togglePlayback}>
                {playing ? "Pause" : step >= trace.frames.length - 1 ? "Replay" : "Play"}
              </button>
              <button type="button" className={styles.secondaryControl} onClick={reset}>
                Reset
              </button>
              <button
                type="button"
                className={styles.stepControl}
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                disabled={step === 0}
                aria-label="Previous frame"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.stepControl}
                onClick={() => setStep((value) => Math.min(trace.frames.length - 1, value + 1))}
                disabled={step >= trace.frames.length - 1}
                aria-label="Next frame"
              >
                →
              </button>
            </div>
            <div className={styles.frameCounter}>
              frame {step + 1} / {trace.frames.length}
            </div>
          </div>

          <div className={styles.mazeFrame}>
            <svg
              className={styles.maze}
              viewBox={`0 0 ${WORLD.width * CELL} ${WORLD.height * CELL}`}
              role="img"
              aria-labelledby="representation-lab-maze-title representation-lab-maze-desc"
            >
              <title id="representation-lab-maze-title">A fixed maze rendered under the selected reasoning model</title>
              <desc id="representation-lab-maze-desc">
                Walls and object positions remain fixed while overlays expose search, adversarial, stochastic, or Bayesian internal state.
              </desc>
              {MAZE_ROWS.map((row, y) =>
                [...row].map((_, x) => {
                  const point: Point = [x, y];
                  const key = keyOf(point);
                  const belief = beliefs.get(key) ?? 0;
                  return (
                    <g key={key}>
                      <rect
                        x={x * CELL}
                        y={y * CELL}
                        width={CELL}
                        height={CELL}
                        className={isWall(point) ? styles.wall : styles.floor}
                      />
                      {belief > 0 ? (
                        <rect
                          x={x * CELL + 3}
                          y={y * CELL + 3}
                          width={CELL - 6}
                          height={CELL - 6}
                          rx={4}
                          className={styles.belief}
                          opacity={Math.min(0.88, 0.08 + belief * 18)}
                        />
                      ) : null}
                      {explored.has(key) ? (
                        <rect
                          x={x * CELL + 6}
                          y={y * CELL + 6}
                          width={CELL - 12}
                          height={CELL - 12}
                          rx={3}
                          className={styles.explored}
                        />
                      ) : null}
                      {frontier.has(key) ? (
                        <circle cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={7} className={styles.frontier} />
                      ) : null}
                      {path.has(key) ? (
                        <circle cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={4} className={styles.pathDot} />
                      ) : null}
                    </g>
                  );
                }),
              )}

              <circle
                cx={frame.target[0] * CELL + CELL / 2}
                cy={frame.target[1] * CELL + CELL / 2}
                r={10}
                className={styles.target}
              />
              <circle
                cx={frame.agent[0] * CELL + CELL / 2}
                cy={frame.agent[1] * CELL + CELL / 2}
                r={12}
                className={styles.agent}
              />
              <path
                d={`M ${frame.agent[0] * CELL + 13} ${frame.agent[1] * CELL + CELL / 2} h 12`}
                className={styles.agentDirection}
              />

              {mode !== "bayes" || revealTruth ? (
                <path
                  d={`M ${frame.pursuer[0] * CELL + CELL / 2} ${frame.pursuer[1] * CELL + 7} L ${
                    frame.pursuer[0] * CELL + CELL - 7
                  } ${frame.pursuer[1] * CELL + CELL / 2} L ${frame.pursuer[0] * CELL + CELL / 2} ${
                    frame.pursuer[1] * CELL + CELL - 7
                  } L ${frame.pursuer[0] * CELL + 7} ${frame.pursuer[1] * CELL + CELL / 2} Z`}
                  className={styles.pursuer}
                />
              ) : null}
            </svg>

            {mode === "bayes" ? (
              <div className={styles.truthControl}>
                <button type="button" onClick={() => setRevealTruth((value) => !value)} aria-pressed={revealTruth}>
                  {revealTruth ? "Hide world truth" : "Reveal world truth"}
                </button>
                <span>Agent access: pursuer position hidden</span>
              </div>
            ) : null}
          </div>

          <div className={styles.legend} aria-label="Visualization legend">
            <span><i className={styles.legendAgent} /> agent</span>
            <span><i className={styles.legendPursuer} /> pursuer</span>
            <span><i className={styles.legendTarget} /> target</span>
            {mode === "bfs" ? <span><i className={styles.legendSearch} /> explored / frontier</span> : null}
            {mode === "bayes" ? <span><i className={styles.legendBelief} /> belief probability</span> : null}
          </div>
        </div>

        <aside className={styles.modelPanel} aria-live="polite">
          <div className={styles.panelHeading}>
            <span>CURRENT WORLD MODEL</span>
            <strong>{trace.worldModel.shortLabel}</strong>
          </div>

          <ModelSection title="REPRESENTED" items={trace.worldModel.represented} />
          <ModelSection title="HIDDEN / FORGOTTEN" items={trace.worldModel.hidden} />
          <ModelSection title="ASSUMED" items={trace.worldModel.assumed} />

          <div className={styles.outputBlock}>
            <span>OUTPUT OBJECT</span>
            <strong>{trace.worldModel.output}</strong>
          </div>

          <div className={styles.equation}>{trace.worldModel.equation}</div>

          {frame.candidateScores ? (
            <div className={styles.candidateBlock}>
              <span>ACTION SCORES</span>
              {frame.candidateScores.map((candidate) => (
                <div key={candidate.action} className={candidate.action === frame.selectedAction ? styles.candidateSelected : styles.candidate}>
                  <strong>{ACTION_LABELS[candidate.action]}</strong>
                  <code>{scoreText(candidate.score)}</code>
                </div>
              ))}
            </div>
          ) : null}

          {typeof frame.ping === "number" ? (
            <div className={styles.pingBlock}>
              <span>NOISY SENSOR PING</span>
              <strong>{frame.ping}</strong>
              {beliefPeak ? (
                <small>
                  peak belief: ({beliefPeak.point[0]}, {beliefPeak.point[1]}) at {(beliefPeak.probability * 100).toFixed(1)}%
                </small>
              ) : null}
            </div>
          ) : null}
        </aside>
      </section>

      <section className={styles.narration} aria-live="polite">
        <div>
          <span>FRAME NOTE</span>
          <p>{frame.narration}</p>
        </div>
        <div>
          <span>REPRESENTATIONAL CHANGE</span>
          <p>{trace.worldModel.explanation}</p>
        </div>
        <strong>{trace.worldModel.accent}</strong>
      </section>

      <section className={styles.why}>
        <div>
          <p className={styles.eyebrow}>Why this matters</p>
          <h2>The algorithm is downstream of a choice about what the world is.</h2>
        </div>
        <p>
          This instrument holds the carrier world recognizable while changing state, assumptions, observability, and inference.
          The resulting computation changes because different distinctions have been made load-bearing.
        </p>
        <p>
          Intellectual lineage: the UC Berkeley CS188 Pac-Man projects use one common environment to teach search, multi-agent
          reasoning, probabilistic inference, and reinforcement learning. This BFL implementation is a clean-room educational
          instrument inspired by that curriculum; it does not publish course assignment solutions or reuse branded game assets.
        </p>
        <a href="https://ai.berkeley.edu/project_overview.html" target="_blank" rel="noreferrer">
          View the Berkeley project overview ↗
        </a>
      </section>
    </main>
  );
}

function ModelSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.modelSection}>
      <span>{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
