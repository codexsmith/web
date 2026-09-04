"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./representation-lab.module.css";
import x from "./representation-lab-expansion.module.css";
import particleStyles from "./representation-lab-particle.module.css";
import { FeatureQWorkbench } from "./FeatureQWorkbench";
import { ParticleBudgetWorkbench } from "./ParticleBudgetWorkbench";
import { TaskWorkbench } from "./TaskWorkbench";
import {
  buildComparison,
  buildTrace,
  isWall,
  MAZE_ROWS,
  MODE_ORDER,
  type Action,
  type LabFrame,
  type Mode,
  type Point,
  type WorldModel,
  WORLD,
} from "./engine";
import {
  buildFeatureQ,
  DEFAULT_FEATURE_CONFIG,
  FEATURE_DEFINITIONS,
  featureResolutionLabel,
  type FeatureConfig,
  type QCarrier,
} from "./feature-q";
import {
  buildParticleApproximation,
  type ParticleBudget,
} from "./particle-filter";

const MODE_LABELS: Record<Mode, { title: string; technical: string; port: string }> = {
  bfs: { title: "Pathfinder", technical: "BFS", port: "GRAPH / QUEUE" },
  astar: { title: "Directed Search", technical: "A*", port: "GRAPH / HEURISTIC" },
  minimax: { title: "Adversary", technical: "Minimax", port: "GAME TREE / MIN" },
  expectimax: { title: "Stochastic", technical: "Expectimax", port: "GAME TREE / E" },
  mdp: { title: "Planner", technical: "Value iteration", port: "MDP / POLICY" },
  bayes: { title: "Blind Bayesian", technical: "Bayes filter", port: "BELIEF / SENSOR" },
};

const ACTION_LABELS: Record<Action, string> = {
  N: "north",
  S: "south",
  E: "east",
  W: "west",
  STOP: "stop",
};

const POLICY_GLYPHS: Record<Action, string> = { N: "↑", S: "↓", E: "→", W: "←", STOP: "·" };
const TRACE_STAGES = ["WORLD", "OBSERVE", "REPRESENT", "INFER", "ACT", "CONSEQUENCE"] as const;
const CELL = 38;
const keyOf = ([x, y]: Point) => `${x},${y}`;
const isSearchMode = (mode: Mode) => mode === "bfs" || mode === "astar";

function scoreText(score: number) {
  return Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1);
}

function currentBeliefPeak(beliefs: LabFrame["beliefs"]) {
  if (beliefs.length === 0) return null;
  return beliefs.reduce((best, cell) => (cell.probability > best.probability ? cell : best));
}

function activeTraceStage(step: number, total: number) {
  if (total <= 1) return TRACE_STAGES.length - 1;
  return Math.min(TRACE_STAGES.length - 1, Math.floor((step / (total - 1)) * TRACE_STAGES.length));
}

function playbackInterval(mode: Mode) {
  if (mode === "bfs" || mode === "astar") return 90;
  if (mode === "mdp") return 420;
  return 900;
}

function particleOffset(index: number) {
  const slot = index % 49;
  const layer = Math.floor(index / 49) % 3;
  return {
    x: ((slot % 7) - 3) * 3 + (layer - 1) * 0.7,
    y: (Math.floor(slot / 7) - 3) * 3 - (layer - 1) * 0.7,
  };
}

export function RepresentationLab() {
  const [mode, setMode] = useState<Mode>("bfs");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [revealTruth, setRevealTruth] = useState(false);
  const [breakModel, setBreakModel] = useState(false);
  const [particleBudget, setParticleBudget] = useState<ParticleBudget>("exact");
  const [qCarrier, setQCarrier] = useState<QCarrier>("tabular");
  const [featureConfig, setFeatureConfig] = useState<FeatureConfig>({ ...DEFAULT_FEATURE_CONFIG });
  const searchMode = isSearchMode(mode);
  const trace = useMemo(
    () => buildTrace(mode, { retainParents: searchMode ? !breakModel : true }),
    [mode, breakModel, searchMode],
  );
  const comparison = useMemo(() => buildComparison(), []);
  const featureResult = useMemo(() => buildFeatureQ(featureConfig), [featureConfig]);
  const frame = trace.frames[Math.min(step, trace.frames.length - 1)];
  const particleFrames = useMemo(
    () => mode === "bayes" && particleBudget !== "exact"
      ? buildParticleApproximation(trace.frames, particleBudget)
      : null,
    [mode, particleBudget, trace.frames],
  );
  const particleFrame = particleFrames?.[Math.min(step, trace.frames.length - 1)] ?? null;
  const particleMode = mode === "bayes" && particleBudget !== "exact" && particleFrame !== null;
  const featureMode = mode === "mdp" && qCarrier === "features";
  const activeBeliefs = particleFrame?.beliefs ?? frame.beliefs;
  const beliefPeak = currentBeliefPeak(activeBeliefs);
  const closureReached = featureMode || step >= trace.frames.length - 1;
  const closureState = closureReached ? trace.closure : "open";
  const traceStage = featureMode ? TRACE_STAGES.length - 1 : activeTraceStage(step, trace.frames.length);

  const activeWorldModel = useMemo<WorldModel>(() => {
    if (mode === "mdp" && qCarrier === "features") {
      const representedFeatures = FEATURE_DEFINITIONS
        .filter((definition) => featureConfig[definition.id] !== "off")
        .map((definition) => `${definition.label} [${featureResolutionLabel(featureConfig[definition.id]).toLowerCase()}]`);
      const forgottenFeatures = FEATURE_DEFINITIONS.flatMap((definition) => {
        const resolution = featureConfig[definition.id];
        if (resolution === "off") return [definition.label];
        if (resolution === "coarse") return [`fine-grained ${definition.label}`];
        return [];
      });
      return {
        ...trace.worldModel,
        label: `Feature Q / ${featureResult.parameters} Learned Weights`,
        shortLabel: `FEATURE Q · ${featureResult.parameters}W`,
        represented: [
          "feature vector f(s,a)",
          ...representedFeatures,
          "weight vector w",
          "temporal-difference error δ",
          "reward and transition samples",
        ],
        hidden: ["tabular state-action identity", "explicit Q* table", ...forgottenFeatures],
        assumed: [
          ...trace.worldModel.assumed,
          "linear action-value approximation",
          `${featureResult.trainingEpisodes} deterministic seeded training episodes`,
        ],
        output: `a generalized action-value function carried by ${featureResult.parameters} learned parameters`,
        equation: "Q(s,a)=w·f(s,a);  w ← w + αδf(s,a)",
        explanation: "State-action identity is projected into a feature vector, allowing one learned weight to generalize across many concrete situations.",
        accent: featureResult.conflictedAliasClasses > 0
          ? "Compression crossed a consequential boundary: some feature-identical cases require materially different Q* values."
          : "The active projection forgets identity while preserving the tested action-value distinctions within the current collision threshold.",
      };
    }

    if (mode !== "bayes" || particleBudget === "exact") return trace.worldModel;
    return {
      ...trace.worldModel,
      label: `Particle Bayesian / ${particleBudget} Samples`,
      shortLabel: `PARTICLE ${particleBudget}`,
      represented: [
        "agent position",
        "noisy distance ping",
        `${particleBudget} sampled pursuer hypotheses`,
        "pursuer transition model",
        "resampling operator",
      ],
      hidden: ["true pursuer position", "exact posterior distribution"],
      assumed: [...trace.worldModel.assumed, "finite empirical posterior after resampling"],
      output: `an empirical belief distribution carried by ${particleBudget} particles`,
      equation: "particles → predict → weight → resample",
      explanation: "The Bayesian update is carried by a finite sample rather than an explicit probability for every candidate state.",
      accent: "A bounded carrier trades posterior fidelity for bounded representation cost.",
    };
  }, [featureConfig, featureResult, mode, particleBudget, qCarrier, trace.worldModel]);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
    setRevealTruth(false);
  }, [mode, breakModel, qCarrier]);

  useEffect(() => {
    if (!playing || featureMode) return;
    const interval = window.setInterval(() => {
      setStep((current) => {
        if (current >= trace.frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, playbackInterval(mode));
    return () => window.clearInterval(interval);
  }, [featureMode, mode, playing, trace.frames.length]);

  const explored = useMemo(() => new Set(frame.explored.map(keyOf)), [frame.explored]);
  const frontier = useMemo(() => new Set(frame.frontier.map(keyOf)), [frame.frontier]);
  const path = useMemo(() => new Set(frame.path.map(keyOf)), [frame.path]);
  const beliefs = useMemo(() => new Map(activeBeliefs.map((cell) => [keyOf(cell.point), cell.probability])), [activeBeliefs]);
  const activeValueCells = featureMode ? featureResult.values : (frame.values ?? []);
  const activePolicyCells = featureMode ? featureResult.policy : (frame.policy ?? []);
  const values = useMemo(() => new Map(activeValueCells.map((cell) => [keyOf(cell.point), cell.value])), [activeValueCells]);
  const policies = useMemo(() => new Map(activePolicyCells.map((cell) => [keyOf(cell.point), cell.action])), [activePolicyCells]);
  const maxAbsValue = useMemo(
    () => Math.max(1, ...activeValueCells.map((cell) => Math.abs(cell.value))),
    [activeValueCells],
  );

  const minimaxSummary = comparison.find((row) => row.mode === "minimax");
  const expectimaxSummary = comparison.find((row) => row.mode === "expectimax");
  const bfsSummary = comparison.find((row) => row.mode === "bfs");
  const astarSummary = comparison.find((row) => row.mode === "astar");
  const activePolicyAtStart = featureMode ? featureResult.startAction : frame.selectedAction;
  const activeNarration = featureMode
    ? `Approximate Q-learning has converged to a learned snapshot after ${featureResult.trainingEpisodes} seeded episodes. The current feature projection agrees with tabular Q* on ${(featureResult.policyAgreement * 100).toFixed(1)}% of represented states.`
    : frame.narration;
  const activeTraceSignal = featureMode ? `${(featureResult.policyAgreement * 100).toFixed(1)}% policy agreement` : trace.summary.signal;
  const activeTraceDetail = featureMode
    ? `${featureResult.parameters} learned weights replace ${featureResult.referenceEntries} tabular Q entries`
    : trace.summary.detail;

  const reset = () => {
    if (featureMode) return;
    setPlaying(false);
    setStep(0);
  };

  const togglePlayback = () => {
    if (featureMode) return;
    if (playing) {
      setPlaying(false);
      return;
    }
    if (closureReached) setStep(0);
    setPlaying(true);
  };

  const loadMode = (nextMode: Mode) => {
    setMode(nextMode);
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
          <div className={`${styles.modeStrip} ${x.modeStripExpanded}`} role="group" aria-label="Reasoning cartridge">
            {MODE_ORDER.map((item) => {
              const selected = mode === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  className={selected ? styles.cartridgeActive : styles.cartridge}
                  onClick={() => loadMode(item)}
                >
                  <span>{MODE_LABELS[item].title}</span>
                  <small>{MODE_LABELS[item].technical}</small>
                  <code>{MODE_LABELS[item].port}</code>
                </button>
              );
            })}
          </div>
        </div>

        <TaskWorkbench mode={mode} worldModel={activeWorldModel} comparison={comparison} onModeChange={loadMode} />

        {mode === "mdp" ? (
          <FeatureQWorkbench
            carrier={qCarrier}
            onCarrierChange={setQCarrier}
            config={featureConfig}
            onConfigChange={setFeatureConfig}
            result={featureResult}
          />
        ) : null}

        {mode === "bayes" ? (
          <ParticleBudgetWorkbench
            budget={particleBudget}
            onBudgetChange={setParticleBudget}
            exactFrame={frame}
            particleFrame={particleFrame}
          />
        ) : null}

        <div className={styles.boundaryRail} aria-label="Representation boundary">
          <div className={styles.boundaryTitle}>
            <span>REPRESENTATION BOUNDARY</span>
            <strong>What crosses into the active model?</strong>
          </div>
          <PortBank label="ADMITTED" items={activeWorldModel.represented} state="open" />
          <PortBank label="WITHHELD / FORGOTTEN" items={activeWorldModel.hidden} state="closed" />
        </div>

        <div className={x.stressRig} data-active={searchMode ? "true" : "false"} data-defect={breakModel && searchMode ? "true" : "false"}>
          <div>
            <span>STRESS RIG · RETENTION PORT</span>
            <strong>Predecessor relation</strong>
            <small>{searchMode ? "Required after goal recognition to reconstruct the route." : "Load BFS or A* to stress a required search distinction."}</small>
          </div>
          <button
            type="button"
            disabled={!searchMode}
            aria-pressed={breakModel && searchMode}
            onClick={() => setBreakModel((value) => !value)}
          >
            {breakModel && searchMode ? "DROPPED · MODEL BROKEN" : "RETAINED · DROP DISTINCTION"}
          </button>
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
                <StatusLamp label="MODEL" value={activeWorldModel.shortLabel} state="attention" />
                <StatusLamp
                  label="CLOSURE"
                  value={closureState === "defect" ? "DEFECT" : closureState === "reached" ? "REACHED" : "OPEN"}
                  state={closureState === "defect" ? "defect" : closureState === "reached" ? "valid" : "unknown"}
                />
              </div>
            </div>

            <div className={styles.worldToolbar}>
              <div className={styles.runControls}>
                <button type="button" className={styles.primaryControl} onClick={togglePlayback} disabled={featureMode}>
                  {featureMode ? "LEARNED SNAPSHOT" : playing ? "PAUSE TRACE" : closureReached ? "REPLAY TRACE" : "RUN TRACE"}
                </button>
                <button type="button" className={styles.secondaryControl} onClick={reset} disabled={featureMode}>RESET STATE</button>
                <button type="button" className={styles.stepControl} onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={featureMode || step === 0} aria-label="Previous frame">←</button>
                <button type="button" className={styles.stepControl} onClick={() => setStep((value) => Math.min(trace.frames.length - 1, value + 1))} disabled={featureMode || closureReached} aria-label="Next frame">→</button>
              </div>
              <div className={styles.frameCounter}>{featureMode ? `${featureResult.trainingEpisodes} training episodes` : `state ${step + 1} / ${trace.frames.length}`}</div>
            </div>

            <div className={styles.mazeFrame}>
              <svg className={styles.maze} viewBox={`0 0 ${WORLD.width * CELL} ${WORLD.height * CELL}`} role="img" aria-labelledby="representation-lab-maze-title representation-lab-maze-desc">
                <title id="representation-lab-maze-title">WORLD-01 rendered through the active reasoner</title>
                <desc id="representation-lab-maze-desc">The maze and object identity remain fixed while overlays expose search frontiers, exact or feature-projected value policies, game-tree decisions, exact beliefs, or finite particle beliefs.</desc>
                {MAZE_ROWS.map((row, y) => [...row].map((_, xPos) => {
                  const point: Point = [xPos, y];
                  const key = keyOf(point);
                  const belief = beliefs.get(key) ?? 0;
                  const value = values.get(key);
                  const policy = policies.get(key);
                  const valueOpacity = typeof value === "number" ? Math.min(0.68, 0.08 + Math.abs(value) / maxAbsValue * 0.6) : 0;
                  return (
                    <g key={key}>
                      <rect x={xPos * CELL} y={y * CELL} width={CELL} height={CELL} className={isWall(point) ? styles.wall : styles.floor} />
                      {typeof value === "number" && !isWall(point) ? (
                        <rect
                          x={xPos * CELL + 3}
                          y={y * CELL + 3}
                          width={CELL - 6}
                          height={CELL - 6}
                          rx={3}
                          className={`${x.valueCell} ${value >= 0 ? x.valuePositive : x.valueNegative}`}
                          opacity={valueOpacity}
                        />
                      ) : null}
                      {!particleMode && belief > 0 ? <rect x={xPos * CELL + 3} y={y * CELL + 3} width={CELL - 6} height={CELL - 6} rx={4} className={styles.belief} opacity={Math.min(0.88, 0.08 + belief * 18)} /> : null}
                      {explored.has(key) ? <rect x={xPos * CELL + 6} y={y * CELL + 6} width={CELL - 12} height={CELL - 12} rx={3} className={styles.explored} /> : null}
                      {frontier.has(key) ? <circle cx={xPos * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={7} className={styles.frontier} /> : null}
                      {path.has(key) ? <circle cx={xPos * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={4} className={styles.pathDot} /> : null}
                      {policy ? (
                        <text x={xPos * CELL + CELL / 2} y={y * CELL + CELL / 2 + 5} textAnchor="middle" className={x.policyGlyph}>
                          {POLICY_GLYPHS[policy]}
                        </text>
                      ) : null}
                    </g>
                  );
                }))}
                {particleMode ? particleFrame.particles.map((particle, index) => {
                  const offset = particleOffset(index);
                  return (
                    <circle
                      key={`${particle[0]}-${particle[1]}-${index}`}
                      cx={particle[0] * CELL + CELL / 2 + offset.x}
                      cy={particle[1] * CELL + CELL / 2 + offset.y}
                      r={1.7}
                      className={particleStyles.particle}
                    />
                  );
                }) : null}
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
              <span><i className={styles.legendPursuer} /> pursuer / hazard</span>
              <span><i className={styles.legendTarget} /> target</span>
              {searchMode ? <span><i className={styles.legendSearch} /> explored / frontier</span> : null}
              {mode === "mdp" ? <span><i className={x.legendValue} /> {featureMode ? "feature-Q value / policy" : "value / policy"}</span> : null}
              {mode === "bayes" && particleMode ? <span><i className={particleStyles.legendParticle} /> particle hypotheses</span> : null}
              {mode === "bayes" && !particleMode ? <span><i className={styles.legendBelief} /> exact belief probability</span> : null}
            </div>
          </section>

          <aside className={styles.modelPanel} aria-live="polite">
            <div className={styles.panelHeading}>
              <span>LOADED CARTRIDGE</span>
              <strong>{activeWorldModel.label}</strong>
              <small>{activeWorldModel.explanation}</small>
            </div>
            <ModelSection title="ASSUMPTIONS" items={activeWorldModel.assumed} />
            <div className={styles.outputBlock}><span>OUTPUT OBJECT</span><strong>{activeWorldModel.output}</strong></div>
            <div className={styles.equation}>{activeWorldModel.equation}</div>
            <div className={x.metricBlock}>
              <span>TRACE SUMMARY</span>
              <strong>{activeTraceSignal}</strong>
              <small>{activeTraceDetail}</small>
            </div>

            {frame.searchCost ? (
              <div className={x.metricBlock}>
                <span>SEARCH COST</span>
                <div className={x.costTriplet}><code>g {frame.searchCost.g}</code><code>h {frame.searchCost.h}</code><code>f {frame.searchCost.f}</code></div>
              </div>
            ) : null}

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

            {mode === "mdp" && activePolicyAtStart ? (
              <div className={x.metricBlock}>
                <span>POLICY AT START</span>
                <strong>{POLICY_GLYPHS[activePolicyAtStart]} {ACTION_LABELS[activePolicyAtStart]}</strong>
                <small>{featureMode ? `Tabular reference chooses ${ACTION_LABELS[featureResult.referenceStartAction]}.` : "The output is a policy over states, not a single recovered route."}</small>
              </div>
            ) : null}

            {typeof frame.ping === "number" ? (
              <div className={styles.pingBlock}>
                <span>OBSERVATION PORT · NOISY RANGE</span>
                <strong>{frame.ping}</strong>
                {beliefPeak ? <small>active peak: ({beliefPeak.point[0]}, {beliefPeak.point[1]}) at {(beliefPeak.probability * 100).toFixed(1)}%</small> : null}
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
          <div><span>CURRENT EVENT</span><p>{activeNarration}</p></div>
          <div><span>REPRESENTATIONAL CONSEQUENCE</span><p>{activeWorldModel.accent}</p></div>
          <div className={`${closureState === "reached" ? styles.closureReached : styles.closureOpen} ${closureState === "defect" ? x.closureDefect : ""}`}>
            <span>CLOSURE STATE</span>
            <strong>{closureState === "defect" ? "REPRESENTATIONAL DEFECT" : closureState === "reached" ? "TRACE RECONCILED" : "BOUNDARY OPEN"}</strong>
          </div>
        </section>
      </section>

      <section className={x.experimentRack} aria-label="Counterfactual comparison rack">
        <header className={x.rackHeader}>
          <div><span>COUNTERFACTUAL RACK</span><h2>Freeze WORLD-01. Compare the consequences.</h2></div>
          <p>Every cartridge below is evaluated against the same carrier world. Select one to load it into the apparatus above.</p>
        </header>

        <div className={x.contrastBank}>
          <article>
            <span>ATTENTION POLICY</span>
            <strong>BFS {bfsSummary?.signal} → A* {astarSummary?.signal}</strong>
            <p>Same graph and same optimal route. The heuristic changes which frontier states deserve attention first.</p>
          </article>
          <article>
            <span>ONTOLOGY SWITCH</span>
            <strong>MIN {minimaxSummary?.selectedAction ?? "?"} ≠ E {expectimaxSummary?.selectedAction ?? "?"}</strong>
            <p>Same pursuer sprite. Adversary semantics and stochastic semantics produce different rational actions.</p>
          </article>
          <article>
            <span>OUTPUT TYPE</span>
            <strong>path → action → policy → belief</strong>
            <p>The carrier world stays recognizable while the computational object produced by inference changes category.</p>
          </article>
        </div>

        <div className={x.comparisonGrid}>
          {comparison.map((row) => (
            <button key={row.mode} type="button" onClick={() => loadMode(row.mode)} aria-pressed={mode === row.mode} className={mode === row.mode ? x.compareCardActive : x.compareCard}>
              <span>{MODE_LABELS[row.mode].technical}</span>
              <strong>{row.label}</strong>
              <code>{row.signal}</code>
              <small>{row.detail}</small>
              <p>{row.output}</p>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.why}>
        <div><p className={styles.eyebrow}>Why this matters</p><h2>The algorithm is downstream of a choice about what the world is.</h2></div>
        <p>This apparatus keeps one semantic world persistent while changing what crosses the representation boundary, what assumptions enter inference, and what kind of output object is produced.</p>
        <p>The stress rigs now expose three distinct regimes: catastrophic closure failure, graded probabilistic approximation, and feature compression that can remain admissible or become defective when consequentially different cases alias.</p>
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

function StatusLamp({ label, value, state }: { label: string; value: string; state: "valid" | "attention" | "unknown" | "defect" }) {
  return <div className={`${styles.statusLamp} ${state === "defect" ? x.defectLamp : ""}`} data-state={state}><i aria-hidden="true" /><span>{label}</span><strong>{value}</strong></div>;
}

function ModelSection({ title, items }: { title: string; items: string[] }) {
  return <div className={styles.modelSection}><span>{title}</span><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
