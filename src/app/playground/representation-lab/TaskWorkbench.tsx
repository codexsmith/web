"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComparisonRow, Mode, WorldModel } from "./engine";
import { SetupConsole } from "./SetupConsole";
import {
  STATE_WITNESS,
  TASK_SPECS,
  VISIT_ALL_RESULTS,
  VISIT_ALL_TARGETS,
  type StateDefinition,
  type TaskId,
} from "./state-sufficiency";
import s from "./representation-lab-task.module.css";
import a from "./representation-lab-alignment.module.css";

type Snapshot = {
  mode: Mode;
  task: TaskId;
  stateDefinition: StateDefinition;
  worldModel: WorldModel;
};

type DiffItem = {
  kind: "add" | "remove" | "change";
  label: string;
  value: string;
};

const MODE_NAMES: Record<Mode, string> = {
  bfs: "BFS",
  astar: "A*",
  minimax: "MINIMAX",
  expectimax: "EXPECTIMAX",
  mdp: "MDP",
  bayes: "BAYES",
};

function fingerprint(snapshot: Snapshot) {
  return JSON.stringify(snapshot);
}

function difference(before: string[], after: string[]) {
  const previous = new Set(before);
  const current = new Set(after);
  return {
    added: after.filter((item) => !previous.has(item)),
    removed: before.filter((item) => !current.has(item)),
  };
}

function buildDiff(before: Snapshot | null, after: Snapshot): DiffItem[] {
  if (!before) return [];
  const result: DiffItem[] = [];

  if (before.task !== after.task) {
    result.push({ kind: "change", label: "task", value: `${TASK_SPECS[before.task].shortLabel} → ${TASK_SPECS[after.task].shortLabel}` });
  }
  if (before.mode !== after.mode) {
    result.push({ kind: "change", label: "reasoner", value: `${MODE_NAMES[before.mode]} → ${MODE_NAMES[after.mode]}` });
  }
  if (before.stateDefinition !== after.stateDefinition) {
    result.push({
      kind: "change",
      label: "state",
      value: before.stateDefinition === "position" ? "position → position + history" : "position + history → position",
    });
  }

  const represented = difference(before.worldModel.represented, after.worldModel.represented);
  const assumed = difference(before.worldModel.assumed, after.worldModel.assumed);
  for (const item of represented.added) result.push({ kind: "add", label: "admitted", value: item });
  for (const item of represented.removed) result.push({ kind: "remove", label: "admitted", value: item });
  for (const item of assumed.added) result.push({ kind: "add", label: "assumption", value: item });
  for (const item of assumed.removed) result.push({ kind: "remove", label: "assumption", value: item });

  if (before.worldModel.output !== after.worldModel.output) {
    result.push({ kind: "change", label: "output", value: `${before.worldModel.output} → ${after.worldModel.output}` });
  }
  if (before.worldModel.equation !== after.worldModel.equation) {
    result.push({ kind: "change", label: "operator", value: `${before.worldModel.equation} → ${after.worldModel.equation}` });
  }
  return result;
}

export function TaskWorkbench({
  mode,
  task,
  worldModel,
  comparison,
  onModeChange,
  onTaskChange,
}: {
  mode: Mode;
  task: TaskId;
  worldModel: WorldModel;
  comparison: ComparisonRow[];
  onModeChange: (mode: Mode) => void;
  onTaskChange: (task: TaskId) => void;
}) {
  const [stateDefinition, setStateDefinition] = useState<StateDefinition>("position");
  const currentSnapshot = useMemo<Snapshot>(() => ({ mode, task, stateDefinition, worldModel }), [mode, task, stateDefinition, worldModel]);
  const currentFingerprint = fingerprint(currentSnapshot);
  const lastRef = useRef<{ fingerprint: string; snapshot: Snapshot } | null>(null);
  const [previous, setPrevious] = useState<Snapshot | null>(null);

  useEffect(() => {
    const last = lastRef.current;
    if (!last) {
      lastRef.current = { fingerprint: currentFingerprint, snapshot: currentSnapshot };
      return;
    }
    if (last.fingerprint === currentFingerprint) return;
    setPrevious(last.snapshot);
    lastRef.current = { fingerprint: currentFingerprint, snapshot: currentSnapshot };
  }, [currentFingerprint, currentSnapshot]);

  const diff = useMemo(() => buildDiff(previous, currentSnapshot), [previous, currentSnapshot]);
  const stateResult = stateDefinition === "position" ? VISIT_ALL_RESULTS.lossy : VISIT_ALL_RESULTS.sufficient;
  const minimax = comparison.find((row) => row.mode === "minimax");
  const expectimax = comparison.find((row) => row.mode === "expectimax");
  const gameTreeLoaded = mode === "minimax" || mode === "expectimax";
  const recommended = TASK_SPECS[task].canonicalModes.includes(mode);

  return (
    <section className={s.workbench} aria-label="Task and representation workbench">
      <SetupConsole mode={mode} task={task} onModeChange={onModeChange} onTaskChange={onTaskChange} />

      {task === "visit-all" ? (
        <div className={s.sufficiencyRig} data-closure={stateResult.closure}>
          <div className={s.stateSelector}>
            <span>MEMORY TEST</span>
            <strong>Does position alone tell us enough?</strong>
            <div role="group" aria-label="State definition">
              <button type="button" aria-pressed={stateDefinition === "position"} onClick={() => setStateDefinition("position")}>POSITION ONLY</button>
              <button type="button" aria-pressed={stateDefinition === "position+visited"} onClick={() => setStateDefinition("position+visited")}>POSITION + VISITED TARGETS</button>
            </div>
          </div>

          <div className={s.taskMap} aria-label="Four target obligations">
            <span>TARGETS TO VISIT</span>
            <div>
              {VISIT_ALL_TARGETS.map((target) => <code key={target.label}>{target.label}<small>({target.point[0]},{target.point[1]})</small></code>)}
            </div>
          </div>

          <div className={s.sufficiencyResult}>
            <span>DOES THE MODEL HAVE ENOUGH MEMORY?</span>
            <strong>{stateResult.closure === "reached" ? "YES" : "NO"}</strong>
            <dl>
              <div><dt>state</dt><dd>{stateResult.stateLabel}</dd></div>
              <div><dt>expansions</dt><dd>{stateResult.expansions}</dd></div>
              <div><dt>route</dt><dd>{stateResult.routeSteps === null ? "NO COMPLETE ROUTE" : `${stateResult.routeSteps} steps`}</dd></div>
            </dl>
            <p>{stateResult.output}</p>
          </div>

          <div className={s.witness}>
            <span>WHY POSITION ALONE CAN FAIL</span>
            <strong>Both histories end at {STATE_WITNESS.historyA.projectedPosition}</strong>
            <div className={s.historyGrid}>
              <article>
                <span>HISTORY A</span>
                <code>{stateDefinition === "position" ? STATE_WITNESS.historyA.projectedPosition : STATE_WITNESS.historyA.augmentedState}</code>
                <small>visited {STATE_WITNESS.historyA.visited.join(", ")} · remaining {STATE_WITNESS.historyA.remaining.join(", ")}</small>
              </article>
              <article>
                <span>HISTORY B</span>
                <code>{stateDefinition === "position" ? STATE_WITNESS.historyB.projectedPosition : STATE_WITNESS.historyB.augmentedState}</code>
                <small>visited {STATE_WITNESS.historyB.visited.join(", ")} · remaining {STATE_WITNESS.historyB.remaining.join(", ")}</small>
              </article>
            </div>
            <p>{stateDefinition === "position" ? "The computer sees these as the same state even though the remaining job is different." : "Adding visit history keeps the difference the task actually needs."}</p>
          </div>
        </div>
      ) : null}

      <details className={s.lowerRackDrawer}>
        <summary className={s.lowerRackSummary}>
          <span>ANALYSIS BAY</span>
          <strong>Assumptions + representation diff</strong>
          <small>{gameTreeLoaded ? "PURSUER OPERATOR ACTIVE" : previous ? `${diff.length} RECORDED CHANGE${diff.length === 1 ? "" : "S"}` : "ARMED"}</small>
        </summary>
        <div className={s.lowerRack}>
          <div className={s.assumptionBay} data-loaded={gameTreeLoaded ? "true" : "false"}>
            <div>
              <span>HOW SHOULD WE TREAT THE PURSUER?</span>
              <strong>Same pursuer. Different assumption.</strong>
            </div>
            <div className={s.lever} role="group" aria-label="Pursuer semantics">
              <button type="button" aria-pressed={mode === "minimax"} onClick={() => onModeChange("minimax")}>
                <span>MIN</span><small>acts against you</small><code>→ {minimax?.selectedAction ?? "?"}</code>
              </button>
              <div aria-hidden="true"><i data-side={mode === "expectimax" ? "right" : "left"} /></div>
              <button type="button" aria-pressed={mode === "expectimax"} onClick={() => onModeChange("expectimax")}>
                <span>EXPECTATION</span><small>uncertain / random</small><code>→ {expectimax?.selectedAction ?? "?"}</code>
              </button>
            </div>
            <p>The geometry does not change. Only our assumption about the pursuer changes, and that can change the rational move.</p>
          </div>

          <div className={s.diffPanel} aria-live="polite">
            <div className={s.diffHeading}>
              <span>WHAT CHANGED IN THE MODEL?</span>
              <strong>{previous ? "PREVIOUS → CURRENT" : "ARMED"}</strong>
            </div>
            {previous && diff.length > 0 ? (
              <div className={s.diffItems}>
                {diff.map((item, index) => (
                  <div key={`${item.kind}-${item.label}-${index}`} data-kind={item.kind}>
                    <span>{item.kind === "add" ? "+" : item.kind === "remove" ? "−" : "Δ"} {item.label}</span>
                    <code>{item.value}</code>
                  </div>
                ))}
              </div>
            ) : (
              <p>Change the job, reasoning method, memory, or another assumption. This panel records exactly what changed.</p>
            )}
          </div>
        </div>
      </details>

      <section className={a.modelInputRow} aria-label="Model inputs and pairing">
        <aside className={a.modelRail} data-fit={recommended ? "recommended" : "experimental"}>
          <div className={a.modelRailStep}>
            <b>03</b>
            <span>MODEL</span>
            <small>inputs</small>
          </div>
          <div className={a.modelRailFit}>
            <span>FIT</span>
            <strong>{recommended ? "NATURAL" : "EXPERIMENTAL"}</strong>
            <small>{recommended ? "standard pairing" : "comparison pairing"}</small>
          </div>
        </aside>

        <div className={a.modelInputPanel}>
          <header className={a.modelInputHeader}>
            <span>MODEL INPUTS</span>
            <strong>What information can this method use?</strong>
            <small>Compare these inputs with what the job needs above.</small>
          </header>
          <div className={a.modelInputBanks}>
            <div className={a.modelBank} data-kind="used">
              <span>USED BY MODEL</span>
              <div>{worldModel.represented.map((item) => <code key={item}>{item}</code>)}</div>
            </div>
            <div className={a.modelBank} data-kind="hidden">
              <span>NOT USED / HIDDEN</span>
              <div>{worldModel.hidden.map((item) => <code key={item}>{item}</code>)}</div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
