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

const MODE_LABELS: Record<Mode, { title: string; technical: string; port: string }> = {
  bfs: { title: "Pathfinder", technical: "BFS", port: "GRAPH / QUEUE" },
  minimax: { title: "Adversary", technical: "Minimax", port: "GAME TREE / MIN" },
  expectimax: { title: "Stochastic", technical: "Expectimax", port: "GAME TREE / E" },
  bayes: { title: "Blind Bayesian", technical: "Bayes filter", port: "BELIEF / SENSOR" },
};

const ACTION_LABELS: Record<Action, string> = {
  N: "north",
  S: "south",
  E: "east",
  W: "west",
  STOP: "stop",
};

const TRACE_STAGES = ["WORLD", "OBSERVE", "REPRESENT", "INFER", "ACT", "CONSEQUENCE"] as const;
const CELL = 38;
const keyOf = ([x, y]: Point) => `${x},${y}`;

function scoreText(score: number) {
  return Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1);
}

function currentBeliefPeak(frame: LabFrame) {
  if (frame.beliefs.length === 0) return null;
  return frame.beliefs.reduce((best, cell) => (cell.probability > best.probability ? cell : best));
}

function activeTraceStage(step: number, total: number) {
  if (total <= 1) return TRACE_STAGES.length - 1;
  return Math.min(TRACE_STAGES.length - 1, Math.floor((step / (total - 1)) * TRACE_STAGES.length));
}

export function RepresentationLab() {
  const [mode, setMode] = useState<Mode>("bfs");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [revealTruth, setRevealTruth] = useState(false);
  const trace = useMemo(() => buildTrace(mode), [mode]);
  const frame = trace.frames[Math.min(step, trace.frames.length - 1)];
  const beliefPeak = currentBeliefPeak(frame);
  const closureReached = step >= trace.frames.length - 1;
  const traceStage = activeTraceStage(step, trace.frames.length);

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

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };

  const togglePlayback = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (closureReached) setStep(0);
    setPlaying(true);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <a className={styles.crumb} href="/">Boundary First Labs / Playground</a>
          <p className={styles.eyebrow}>Representational Mechanics Instrument 001 · BFUX laboratory demonstration</p>
          <h1>Same World, Different Reasoner</h1>
          <p className={styles.lede}>Hold the carrier world fixed. Replace the formal apparatus. Watch different distinctions become load-bearing.</p>
        </div>
        <div className={styles.identityPlate} aria-label="Persistent world identity">
          <span>SEMANTIC OBJECT</span>
          <strong>WORLD-01</strong>
          <dl>
            <div><dt>identity</dt><dd>persistent</dd></div>
            <div><dt>geometry</dt><dd>fixed</dd></div>
            <div><dt>reasoner</dt><dd>replaceable</dd></div>
          </dl>
        </div>
      </header>

      <section className={styles.apparatus} aria-label="Representation laboratory apparatus">
        <div className={styles.cartridgeBank}>
          <div className={styles.bankLabel}>
            <span>REASONER BUS</span>
            <strong>Replace one formal cartridge</strong>
          </div>
          <div className={styles.modeStrip} role="group" aria-label="Reasoning cartridge">
            {MODE_ORDER.map((item) => {
              const selected = mode === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  className={selected ? styles.cartridgeActive : styles.cartridge}
                  onClick={() => setMode(item)}
                >
                  <span>{MODE_LABELS[item].title}</span>
                  <small>{MODE_LABELS[item].technical}</small>
                  <code>{MODE_LABELS[item].port}</code>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.boundaryRail} aria-label="Representation boundary">
          <div className={styles.boundaryTitle}>
            <span>REPRESENTATION BOUNDARY</span>
            <strong>What crosses into the active model?</strong>
          </div>
          <PortBank label="ADMITTED" items={trace.worldModel.represented} state="open" />
          <PortBank label="WITHHELD / FORGOTTEN" items={trace.worldModel.hidden} state="closed" />
        </div>

        <div className={styles.instrument}>
          <section className={styles.worldHousing} aria-label="Persistent carrier world">
            <div className={styles.worldHeader}>
              <div>
                <span>WORLD-01 · CARRIER STATE</span>
                <strong>Maze geometry remains invariant</strong>
              </div>
              <div className={styles.statusCluster}>
                <StatusLamp label="WORLD" value="FIXED" state="valid" />
                <StatusLamp label="MODEL" value={trace.worldModel.shortLabel} state="attention" />
                <StatusLamp label="CLOSURE" value={closureReached ? "REACHED" : "OPEN"} state={closureReached ? "valid" : "unknown"} />
              </div>
            </div>

            <div className={styles.worldToolbar}>
              <div className={styles.runControls}>
                <button type="button" className={styles.primaryControl} onClick={togglePlayback}>
                  {playing ? "PAUSE TRACE" : closureReached ? "REPLAY TRACE" : "RUN TRACE"}
                </button>
                <button type="button" className={styles.secondaryControl} onClick={reset}>RESET STATE</button>
                <button type="button" className={styles.stepControl} onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} aria-label="Previous frame">←</button>
                <button type="button" className={styles.stepControl} onClick={() => setStep((value) => Math.min(trace.frames.length - 1, value + 1))} disabled={closureReached} aria-label="Next frame">→</button>
              </div>
              <div className={styles.frameCounter}>state {step + 1} / {trace.frames.length}</div>
            </div>

            <div className={styles.mazeFrame}>
              <svg className={styles.maze} viewBox={`0 0 ${WORLD.width * CELL} ${WORLD.height * CELL}`} role="img" aria-labelledby="representation-lab-maze-title representation-lab-maze-desc">
                <title id="representation-lab-maze-title">WORLD-01 rendered through the active reasoner</title>
                <desc id="representation-lab-maze-desc">The maze and object identity remain fixed while overlays expose the active representation and inference state.</desc>
                {MAZE_ROWS.map((row, y) => [...row].map((_, x) => {
                  const point: Point = [x, y];
                  const key = keyOf(point);
                  const belief = beliefs.get(key) ?? 0;
                  return (
                    <g key={key}>
                      <rect x={x * CELL} y={y * CELL} width={CELL} height={CELL} className={isWall(point) ? styles.wall : styles.floor} />
                      {belief > 0 ? <rect x={x * CELL + 3} y={y * CELL + 3} width={CELL - 6} height={CELL - 6} rx={4} className={styles.belief} opacity={Math.min(0.88, 0.08 + belief * 18)} /> : null}
                      {explored.has(key) ? <rect x={x * CELL + 6} y={y * CELL + 6} width={CELL - 12} height={CELL - 12} rx={3} className={styles.explored} /> : null}
                      {frontier.has(key) ? <circle cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={7} className={styles.frontier} /> : null}
                      {path.has(key) ? <circle cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={4} className={styles.pathDot} /> : null}
                    </g>
                  );
                }))}
                <circle cx={frame.target[0] * CELL + CELL / 2} cy={frame.target[1] * CELL + CELL / 2} r={10} className={styles.target} />
                <circle cx={frame.agent[0] * CELL + CELL / 2} cy={frame.agent[1] * CELL + CELL / 2} r={12} className={styles.agent} />
                <path d={`M ${frame.agent[0] * CELL + 13} ${frame.agent[1] * CELL + CELL / 2} h 12`} className={styles.agentDirection} />
                {mode !== "bayes" || revealTruth ? (
                  <path d={`M ${frame.pursuer[0] * CELL + CELL / 2} ${frame.pursuer[1] * CELL + 7} L ${frame.pursuer[0] * CELL + CELL - 7} ${frame.pursuer[1] * CELL + CELL / 2} L ${frame.pursuer[0] * CELL + CELL / 2} ${frame.pursuer[1] * CELL + CELL - 7} L ${frame.pursuer[0] * CELL + 7} ${frame.pursuer[1] * CELL + CELL / 2} Z`} className={styles.pursuer} />
                ) : null}
              </svg>

              {mode === "bayes" ? (
                <div className={styles.truthControl}>
                  <span>OUTSIDE AGENT BOUNDARY</span>
                  <button type="button" onClick={() => setRevealTruth((value) => !value)} aria-pressed={revealTruth}>{revealTruth ? "HIDE WORLD TRUTH" : "REVEAL WORLD TRUTH"}</button>
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
          </section>

          <aside className={styles.modelPanel} aria-live="polite">
            <div className={styles.panelHeading}>
              <span>LOADED CARTRIDGE</span>
              <strong>{trace.worldModel.label}</strong>
              <small>{trace.worldModel.explanation}</small>
            </div>
            <ModelSection title="ASSUMPTIONS" items={trace.worldModel.assumed} />
            <div className={styles.outputBlock}><span>OUTPUT OBJECT</span><strong>{trace.worldModel.output}</strong></div>
            <div className={styles.equation}>{trace.worldModel.equation}</div>

            {frame.candidateScores ? (
              <div className={styles.candidateBlock}>
                <span>DECISION SURFACE</span>
                {frame.candidateScores.map((candidate) => (
                  <div key={candidate.action} className={candidate.action === frame.selectedAction ? styles.candidateSelected : styles.candidate}>
                    <strong>{ACTION_LABELS[candidate.action]}</strong><code>{scoreText(candidate.score)}</code>
                  </div>
                ))}
              </div>
            ) : null}

            {typeof frame.ping === "number" ? (
              <div className={styles.pingBlock}>
                <span>OBSERVATION PORT · NOISY RANGE</span>
                <strong>{frame.ping}</strong>
                {beliefPeak ? <small>peak belief: ({beliefPeak.point[0]}, {beliefPeak.point[1]}) at {(beliefPeak.probability * 100).toFixed(1)}%</small> : null}
              </div>
            ) : null}
          </aside>
        </div>

        <div className={styles.traceBus} aria-label="Causal trace">
          {TRACE_STAGES.map((stage, index) => (
            <div key={stage} className={index <= traceStage ? styles.traceStageActive : styles.traceStage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </div>
          ))}
        </div>

        <section className={styles.eventLedger} aria-live="polite">
          <div><span>CURRENT EVENT</span><p>{frame.narration}</p></div>
          <div><span>REPRESENTATIONAL CONSEQUENCE</span><p>{trace.worldModel.accent}</p></div>
          <div className={closureReached ? styles.closureReached : styles.closureOpen}>
            <span>CLOSURE STATE</span>
            <strong>{closureReached ? "TRACE RECONCILED" : "BOUNDARY OPEN"}</strong>
          </div>
        </section>
      </section>

      <section className={styles.why}>
        <div><p className={styles.eyebrow}>Why this matters</p><h2>The algorithm is downstream of a choice about what the world is.</h2></div>
        <p>This apparatus keeps one semantic world persistent while changing what crosses the representation boundary, what assumptions enter inference, and what kind of output object is produced.</p>
        <p>Intellectual lineage: the UC Berkeley CS188 Pac-Man projects use one common environment to teach search, multi-agent reasoning, probabilistic inference, and reinforcement learning. This clean-room BFL laboratory does not publish course assignment solutions or reuse branded game assets.</p>
        <a href="https://ai.berkeley.edu/project_overview.html" target="_blank" rel="noreferrer">View the Berkeley project overview ↗</a>
      </section>
    </main>
  );
}

function PortBank({ label, items, state }: { label: string; items: string[]; state: "open" | "closed" }) {
  return (
    <div className={styles.portBank}>
      <span>{label}</span>
      <div className={styles.ports}>
        {items.map((item) => <div key={item} className={state === "open" ? styles.portOpen : styles.portClosed}><i aria-hidden="true" /><small>{item}</small></div>)}
      </div>
    </div>
  );
}

function StatusLamp({ label, value, state }: { label: string; value: string; state: "valid" | "attention" | "unknown" }) {
  return <div className={styles.statusLamp} data-state={state}><i aria-hidden="true" /><span>{label}</span><strong>{value}</strong></div>;
}

function ModelSection({ title, items }: { title: string; items: string[] }) {
  return <div className={styles.modelSection}><span>{title}</span><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
