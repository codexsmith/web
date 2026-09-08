"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComparisonRow, Mode, WorldModel } from "./engine";
import {
  STATE_WITNESS,
  TASK_ORDER,
  TASK_SPECS,
  VISIT_ALL_RESULTS,
  VISIT_ALL_TARGETS,
  taskRelation,
  type StateDefinition,
  type TaskId,
} from "./state-sufficiency";
import s from "./representation-lab-task.module.css";

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
  worldModel,
  comparison,
  onModeChange,
}: {
  mode: Mode;
  worldModel: WorldModel;
  comparison: ComparisonRow[];
  onModeChange: (mode: Mode) => void;
}) {
  const [task, setTask] = useState<TaskId>("reach");
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

  const taskSpec = TASK_SPECS[task];
  const relation = taskRelation(task, mode);
  const diff = useMemo(() => buildDiff(previous, currentSnapshot), [previous, currentSnapshot]);
  const stateResult = stateDefinition === "position" ? VISIT_ALL_RESULTS.lossy : VISIT_ALL_RESULTS.sufficient;
  const minimax = comparison.find((row) => row.mode === "minimax");
  const expectimax = comparison.find((row) => row.mode === "expectimax");
  const gameTreeLoaded = mode === "minimax" || mode === "expectimax";

  return (
    <section className={s.workbench} aria-label="Task and representation workbench">
      <div className={s.taskBus}>
        <div className={s.busLabel}>
          <span>TASK BUS</span>
          <strong>Hold the world. Change the question.</strong>
        </div>
        <div className={s.taskButtons} role="group" aria-label="Task specification">
          {TASK_ORDER.map((item) => {
            const spec = TASK_SPECS[item];
            const selected = task === item;
            return (
              <button key={item} type="button" aria-pressed={selected} className={selected ? s.taskActive : s.taskButton} onClick={() => setTask(item)}>
                <span>{spec.label}</span>
                <small>{spec.shortLabel}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className={s.taskSpec}>
        <div>
          <span>CURRENT QUESTION</span>
          <strong>{taskSpec.question}</strong>
        </div>
        <div className={s.requiredBank}>
          <span>REQUIRED DISTINCTIONS</span>
          <div>{taskSpec.required.map((item) => <code key={item}>{item}</code>)}</div>
        </div>
        <div className={s.relation} data-state={relation.state}>
          <span>TASK / REASONER</span>
          <strong>{relation.label}</strong>
          <small>{relation.detail}</small>
        </div>
      </div>

      {task === "visit-all" ? (
        <div className={s.sufficiencyRig} data-closure={stateResult.closure}>
          <div className={s.stateSelector}>
            <span>STATE SUFFICIENCY RIG</span>
            <strong>What must count as state?</strong>
            <div role="group" aria-label="State definition">
              <button type="button" aria-pressed={stateDefinition === "position"} onClick={() => setStateDefinition("position")}>POSITION ONLY</button>
              <button type="button" aria-pressed={stateDefinition === "position+visited"} onClick={() => setStateDefinition("position+visited")}>POSITION + VISITED TARGETS</button>
            </div>
          </div>

          <div className={s.taskMap} aria-label="Four target obligations">
            <span>TASK OBLIGATIONS</span>
            <div>
              {VISIT_ALL_TARGETS.map((target) => <code key={target.label}>{target.label}<small>({target.point[0]},{target.point[1]})</small></code>)}
            </div>
          </div>

          <div className={s.sufficiencyResult}>
            <span>CLOSURE TEST</span>
            <strong>{stateResult.closure === "reached" ? "SUFFICIENT" : "INSUFFICIENT"}</strong>
            <dl>
              <div><dt>state</dt><dd>{stateResult.stateLabel}</dd></div>
              <div><dt>expansions</dt><dd>{stateResult.expansions}</dd></div>
              <div><dt>route</dt><dd>{stateResult.routeSteps === null ? "NO CLOSURE" : `${stateResult.routeSteps} steps`}</dd></div>
            </dl>
            <p>{stateResult.output}</p>
          </div>

          <div className={s.witness}>
            <span>COLLISION WITNESS · SAME POSITION</span>
            <strong>Both histories project to {STATE_WITNESS.historyA.projectedPosition}</strong>
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
            <p>{stateDefinition === "position" ? "The projection identifies consequentially different histories as the same state." : "The augmented state preserves the distinction required by the task."}</p>
          </div>
        </div>
      ) : null}

      <div className={s.lowerRack}>
        <div className={s.assumptionBay} data-loaded={gameTreeLoaded ? "true" : "false"}>
          <div>
            <span>ASSUMPTION BAY · PURSUER SEMANTICS</span>
            <strong>Change one operator. Hold WORLD-01 fixed.</strong>
          </div>
          <div className={s.lever} role="group" aria-label="Pursuer semantics">
            <button type="button" aria-pressed={mode === "minimax"} onClick={() => onModeChange("minimax")}>
              <span>MIN</span><small>adversary</small><code>→ {minimax?.selectedAction ?? "?"}</code>
            </button>
            <div aria-hidden="true"><i data-side={mode === "expectimax" ? "right" : "left"} /></div>
            <button type="button" aria-pressed={mode === "expectimax"} onClick={() => onModeChange("expectimax")}>
              <span>EXPECTATION</span><small>random variable</small><code>→ {expectimax?.selectedAction ?? "?"}</code>
            </button>
          </div>
          <p>The pursuer geometry is unchanged. Only branch aggregation changes; the rational action flips when the formal type flips.</p>
        </div>

        <div className={s.diffPanel} aria-live="polite">
          <div className={s.diffHeading}>
            <span>REPRESENTATION DIFF</span>
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
            <p>Change a task, state definition, reasoner, or stressed distinction. This instrument records exactly what crossed the representation boundary.</p>
          )}
        </div>
      </div>
    </section>
  );
}
