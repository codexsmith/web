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
      <div className={s.setupFrame}>
        <aside className={s.setupSpine} aria-label="Live setup status">
          <div className={s.spineHead}>
            <span><i aria-hidden="true" /> LIVE SETUP</span>
            <strong>WORLD-01</strong>
            <small>FIXED WORLD</small>
          </div>

          <div className={s.spineSequence} aria-hidden="true">
            <div className={s.spineStep} data-channel="job">
              <b>01</b>
              <span>JOB</span>
              <small>question</small>
            </div>
            <div className={s.spineLink} />
            <div className={s.spineStep} data-channel="method">
              <b>02</b>
              <span>METHOD</span>
              <small>reasoner</small>
            </div>
          </div>

          <div className={s.spineFit} data-fit={recommended ? "recommended" : "experimental"}>
            <span>FIT</span>
            <strong>{recommended ? "NATURAL" : "EXPERIMENTAL"}</strong>
            <small>{recommended ? "standard pairing" : "comparison pairing"}</small>
          </div>
        </aside>

        <div className={s.setupBody}>
          <div className={s.controlBand} data-channel="job">
            <article className={s.selectedModule} data-channel="job">
              <span>01 · JOB</span>
              <strong>{taskLabel.title}</strong>
              <small>{taskSpec.question}</small>
              <em>ACTIVE</em>
            </article>

            <div className={s.controlRack} data-channel="job">
              <header className={s.controlRackHeader}>
                <span>CONTROL A</span>
                <strong>Change the job</strong>
                <small>Change the question. Keep the maze fixed.</small>
              </header>
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
          </div>

          <div className={s.requirementStrip}>
            <span>THE JOB CURRENTLY NEEDS</span>
            <div>{taskSpec.required.map((item) => <code key={item}>{item}</code>)}</div>
            <small>These facts must survive the representation.</small>
          </div>

          <div className={s.controlBand} data-channel="method">
            <article className={s.selectedModule} data-channel="method">
              <span>02 · METHOD</span>
              <strong>{modeLabel.title}</strong>
              <small>{modeLabel.technical} · {modeLabel.short}</small>
              <em>ACTIVE</em>
            </article>

            <div className={s.controlRack} data-channel="method">
              <header className={s.controlRackHeader}>
                <span>CONTROL B</span>
                <strong>Change how it reasons</strong>
                <small>Swap the reasoning module. Keep the job and maze visible.</small>
              </header>
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
          </div>
        </div>
      </div>
    </section>
  );
}
