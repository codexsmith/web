"use client";

import type { Mode } from "./engine";
import { MODE_ORDER } from "./engine";
import { TASK_ORDER, TASK_SPECS, type TaskId } from "./state-sufficiency";
import s from "./representation-lab-guided.module.css";

const TASK_LABELS: Record<TaskId, { title: string; short: string }> = {
  reach: { title: "Get to the goal", short: "Reach one target" },
  "visit-all": { title: "Visit every target", short: "Remember what is already done" },
  survive: { title: "Stay safe", short: "Act while a pursuer moves too" },
  maximize: { title: "Plan for the best long-term score", short: "Balance reward and risk" },
  locate: { title: "Find what you cannot see", short: "Reason from noisy clues" },
};

const MODE_LABELS: Record<Mode, { title: string; technical: string; short: string }> = {
  bfs: { title: "Search outward evenly", technical: "BFS", short: "Check nearby possibilities in order" },
  astar: { title: "Search with a hint", technical: "A*", short: "Use a distance estimate to focus attention" },
  minimax: { title: "Plan for the worst case", technical: "Minimax", short: "Assume the pursuer works against you" },
  expectimax: { title: "Plan under uncertainty", technical: "Expectimax", short: "Treat the pursuer as uncertain" },
  mdp: { title: "Plan future rewards", technical: "Value iteration", short: "Compare long-term reward and risk" },
  bayes: { title: "Track what is hidden", technical: "Bayes filter", short: "Update beliefs from noisy evidence" },
};

export function SetupConsole({
  mode,
  task,
  onModeChange,
  onTaskChange,
}: {
  mode: Mode;
  task: TaskId;
  onModeChange: (mode: Mode) => void;
  onTaskChange: (task: TaskId) => void;
}) {
  const taskSpec = TASK_SPECS[task];
  const taskLabel = TASK_LABELS[task];
  const modeLabel = MODE_LABELS[mode];
  const recommended = taskSpec.canonicalModes.includes(mode);

  return (
    <section className={s.setupConsole} aria-label="Active demonstration setup">
      <header className={s.setupHeader}>
        <div className={s.setupIndex}>LIVE SETUP</div>
        <div>
          <span>THIS IS WHAT YOU ARE CHANGING</span>
          <strong>One job + one reasoning method</strong>
          <small>The maze stays the same. Change either control bank and watch the model below rebuild around the new choice.</small>
        </div>
      </header>

      <div className={s.activeSetup}>
        <div className={s.activeSetupLabel}>
          <span>ACTIVE SETUP</span>
          <strong>Current configuration</strong>
          <small>These two selected choices define the demonstration.</small>
        </div>

        <article className={s.selectedModule} data-channel="job">
          <span>01 · JOB</span>
          <strong>{taskLabel.title}</strong>
          <small>{taskSpec.question}</small>
          <em>SELECTED</em>
        </article>

        <div className={s.setupJoin} aria-hidden="true">+</div>

        <article className={s.selectedModule} data-channel="method">
          <span>02 · METHOD</span>
          <strong>{modeLabel.title}</strong>
          <small>{modeLabel.technical} · {modeLabel.short}</small>
          <em>SELECTED</em>
        </article>

        <div className={s.fitModule} data-fit={recommended ? "recommended" : "experimental"}>
          <span>PAIRING</span>
          <strong>{recommended ? "NATURAL FIT" : "EXPERIMENTAL PAIRING"}</strong>
          <small>{recommended ? "This is a standard match between the job and the reasoning method." : "This is not the usual match. That makes it useful for comparison."}</small>
        </div>
      </div>

      <div className={s.controlRail} data-channel="job">
        <div className={s.controlLabel}>
          <span>CONTROL A</span>
          <strong>Change the job</strong>
          <small>This changes the question the agent is trying to answer.</small>
        </div>
        <div className={s.controlButtons} data-count="5" role="group" aria-label="Change the job">
          {TASK_ORDER.map((item) => {
            const selected = item === task;
            const label = TASK_LABELS[item];
            return (
              <button key={item} type="button" aria-pressed={selected} onClick={() => onTaskChange(item)}>
                <span>{label.title}</span>
                <small>{label.short}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className={s.controlRail} data-channel="method">
        <div className={s.controlLabel}>
          <span>CONTROL B</span>
          <strong>Change how it reasons</strong>
          <small>This changes the structure the computer uses to work on the same maze.</small>
        </div>
        <div className={s.controlButtons} data-count="6" role="group" aria-label="Change the reasoning method">
          {MODE_ORDER.map((item) => {
            const selected = item === mode;
            const label = MODE_LABELS[item];
            return (
              <button key={item} type="button" aria-pressed={selected} onClick={() => onModeChange(item)}>
                <span>{label.title}</span>
                <small>{label.technical}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className={s.requirementStrip}>
        <span>THE JOB CURRENTLY NEEDS</span>
        <div>{taskSpec.required.map((item) => <code key={item}>{item}</code>)}</div>
        <small>Compare this list with the model inputs below. If the model leaves out something the job needs, the mismatch becomes visible.</small>
      </div>
    </section>
  );
}
