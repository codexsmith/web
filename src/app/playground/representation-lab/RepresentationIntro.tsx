"use client";

import { useState } from "react";
import type { Mode, WorldModel } from "./engine";
import { TASK_ORDER, TASK_SPECS, type TaskId } from "./state-sufficiency";
import s from "./representation-lab-intro.module.css";
import g from "./representation-lab-guided.module.css";

const TASK_COPY: Record<TaskId, { title: string; detail: string }> = {
  reach: { title: "Get to the goal", detail: "Find a route from the start to one target." },
  "visit-all": { title: "Visit every target", detail: "Remember what has already been visited while moving through the maze." },
  survive: { title: "Stay safe", detail: "Choose a move while another agent is moving too." },
  maximize: { title: "Plan for the best long-term score", detail: "Balance rewards, risks, and what may happen several moves from now." },
  locate: { title: "Find something you cannot see", detail: "Use noisy clues to track where a hidden pursuer might be." },
};

const MODE_COPY: Record<Mode, { title: string; technical: string; detail: string; output: string }> = {
  bfs: { title: "Search outward evenly", technical: "Breadth-first search (BFS)", detail: "Check nearby possibilities in order until a route is found.", output: "a route to the goal" },
  astar: { title: "Search with a hint", technical: "A* search", detail: "Use an estimate of distance to spend less attention on unlikely routes.", output: "a route to the goal" },
  minimax: { title: "Plan for the worst case", technical: "Minimax", detail: "Assume the pursuer will choose the move that is worst for you.", output: "one next move" },
  expectimax: { title: "Plan under uncertainty", technical: "Expectimax", detail: "Treat the pursuer as uncertain rather than perfectly hostile.", output: "one next move" },
  mdp: { title: "Plan across future rewards", technical: "Markov decision process", detail: "Build a policy by comparing long-term reward and risk across the maze.", output: "a plan for many possible states" },
  bayes: { title: "Track what you cannot see", technical: "Bayesian filtering", detail: "Update a probability map as noisy observations arrive.", output: "a probability map of where the pursuer may be" },
};

const MODE_ORDER: Mode[] = ["bfs", "astar", "minimax", "expectimax", "mdp", "bayes"];

function friendlyFact(value: string) {
  const exact: Record<string, string> = {
    "current position": "the agent's current position",
    "walkable adjacency": "which neighboring squares are legal",
    "goal cell": "where the goal is",
    "search frontier": "which places are still waiting to be checked",
    "heuristic distance h(n)": "a rough estimate of distance to the goal",
    "predecessor relation": "where each visited square came from",
    "pursuer intent": "whether the pursuer is acting against the agent",
    "sensor uncertainty": "uncertainty in what the agent can observe",
    "future reward": "long-term rewards and penalties",
    "agent actions": "moves the agent can make",
    "pursuer actions": "moves the pursuer can make",
    "lookahead outcomes": "what can happen after each move",
    "distance to target": "distance to the goal",
    "long-term learning": "learning from many repeated episodes",
    "state cells": "the possible states of the maze",
    "transition probabilities": "how likely each move outcome is",
    reward: "rewards and penalties",
    discount: "how much future rewards count",
    "terminal goal": "which state counts as success",
    "hazard state": "which state counts as danger",
    "opponent intent": "whether another agent is deliberately opposing you",
    "true pursuer position": "the hidden pursuer's exact position",
    "exact posterior distribution": "a full probability for every possible position",
  };
  return exact[value] ?? value
    .replace("relation discarded", "history needed to reconstruct the route")
    .replace("uniformly stochastic", "treated as random")
    .replace("empirical posterior", "sampled probability estimate");
}

function StepNumber({ number, state }: { number: string; state: "active" | "done" | "locked" }) {
  return <span className={s.stepNumber} data-state={state}>{state === "done" ? "✓" : number}</span>;
}

export function RepresentationIntro({
  mode,
  task,
  worldModel,
  loaded,
  onModeChange,
  onTaskChange,
  onLaunch,
  onEdit,
}: {
  mode: Mode;
  task: TaskId;
  worldModel: WorldModel;
  loaded: boolean;
  onModeChange: (mode: Mode) => void;
  onTaskChange: (task: TaskId) => void;
  onLaunch: () => void;
  onEdit: () => void;
}) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const taskCopy = TASK_COPY[task];
  const modeCopy = MODE_COPY[mode];
  const introCollapsed = activeStep > 1;

  const chooseTask = (nextTask: TaskId) => {
    onTaskChange(nextTask);
    const recommended = TASK_SPECS[nextTask].canonicalModes;
    const firstRecommended = recommended[0];
    if (!recommended.includes(mode) && firstRecommended) onModeChange(firstRecommended);
  };

  if (loaded) {
    return (
      <section className={s.loadedSummary} aria-label="WORLD-01 setup complete">
        <div className={s.loadedBadge}>04</div>
        <div>
          <span>WORLD-01 READY</span>
          <strong>{taskCopy.title} · {modeCopy.title}</strong>
          <small>The maze is now loaded below. Run it, step through it, or reopen setup to try another combination.</small>
        </div>
        <button type="button" onClick={() => { setActiveStep(1); onEdit(); }}>CHANGE SETUP</button>
      </section>
    );
  }

  return (
    <>
      {introCollapsed ? (
        <header className={s.intro} data-collapsed>
          <div className={s.introCopy}>
            <a href="/">Boundary First Labs / Playground</a>
            <p className={s.kicker}>INTERACTIVE INTRODUCTION · ABOUT 3 MINUTES</p>
            <h1>Same World, Different Reasoner</h1>
            <p className={s.lede}>A computer can only reason about the version of a problem we give it.</p>
            <p>In this demo the world stays the same. You will change the goal, choose how the computer reasons, and see which facts those choices makes important. Then you can choose again and watch the difference.</p>
            <div className={s.idea}>
              <span>THE BOUNDARY FIRST IDEA</span>
              <strong>Before trusting an answer, make the problem representation visible.</strong>
              <small>What does the system know? What does it ignore? Which assumptions are doing real work?</small>
            </div>
            <button type="button" className={g.compactIntroAction} onClick={() => setActiveStep(1)}>REVIEW INTRO + STEP 01</button>
          </div>
        </header>
      ) : (
        <header className={s.intro}>
        <div className={s.introCopy}>
          <a href="/">Boundary First Labs / Playground</a>
          <p className={s.kicker}>INTERACTIVE INTRODUCTION · ABOUT 3 MINUTES</p>
          <h1>Same World, Different Reasoner</h1>
          <p className={s.lede}>A computer can only reason about the version of a problem we give it.</p>
          <p>In this small maze, the scene stays the same. You will change the goal, choose how the computer reasons, and see which facts that choice makes important. Then you can run the same world and watch the difference.</p>
          <div className={s.idea}>
            <span>THE BOUNDARY FIRST IDEA</span>
            <strong>Before trusting an answer, make the problem representation visible.</strong>
            <small>What does the system know? What does it ignore? Which assumptions are doing real work?</small>
          </div>
        </div>
        <aside className={s.introPlate}>
          <span>YOU WILL CHANGE</span>
          <ol>
            <li><b>01</b> the job</li>
            <li><b>02</b> the reasoning method</li>
            <li><b>03</b> the information in the model</li>
          </ol>
          <div><b>04</b><strong>run WORLD-01</strong></div>
        </aside>
      </header>
      )}

      <section className={s.wizard} aria-label="Representation Lab introduction">
        <section className={s.step} data-state={activeStep === 1 ? "active" : "done"}>
          <button className={s.stepHeader} type="button" onClick={() => setActiveStep(1)} aria-expanded={activeStep === 1}>
            <StepNumber number="01" state={activeStep === 1 ? "active" : "done"} />
            <span><small>START WITH THE QUESTION</small><strong>What should the agent try to do?</strong></span>
            <em>{activeStep === 1 ? "OPEN" : taskCopy.title}</em>
          </button>
          {activeStep === 1 ? (
            <div className={s.stepBody}>
              <p>Same maze, different job. The job determines which information can matter.</p>
              <div className={s.choiceGrid} data-columns="5">
                {TASK_ORDER.map((item) => {
                  const copy = TASK_COPY[item];
                  return (
                    <button key={item} type="button" className={task === item ? s.choiceActive : s.choice} aria-pressed={task === item} onClick={() => chooseTask(item)}>
                      <strong>{copy.title}</strong>
                      <small>{copy.detail}</small>
                    </button>
                  );
                })}
              </div>
              <div className={s.stepFooter}><span>Selected: <b>{taskCopy.title}</b></span><button type="button" onClick={() => setActiveStep(2)}>NEXT · CHOOSE HOW IT THINKS →</button></div>
            </div>
          ) : null}
        </section>

        <section className={s.step} data-state={activeStep === 2 ? "active" : activeStep > 2 ? "done" : "locked"}>
          <button className={s.stepHeader} type="button" disabled={activeStep < 2} onClick={() => setActiveStep(2)} aria-expanded={activeStep === 2}>
            <StepNumber number="02" state={activeStep === 2 ? "active" : activeStep > 2 ? "done" : "locked"} />
            <span><small>CHOOSE A REASONING METHOD</small><strong>How should the computer approach that job?</strong></span>
            <em>{activeStep < 2 ? "LOCKED" : activeStep === 2 ? "OPEN" : modeCopy.title}</em>
          </button>
          {activeStep === 2 ? (
            <div className={s.stepBody}>
              <p>Each method turns the same maze into a different kind of computational problem. Methods marked “recommended” are a natural fit for the job you chose, but you can try any of them.</p>
              <div className={s.choiceGrid} data-columns="3">
                {MODE_ORDER.map((item) => {
                  const copy = MODE_COPY[item];
                  const recommended = TASK_SPECS[task].canonicalModes.includes(item);
                  return (
                    <button key={item} type="button" className={mode === item ? s.choiceActive : s.choice} aria-pressed={mode === item} onClick={() => onModeChange(item)}>
                      <span className={s.choiceFlag}>{recommended ? "RECOMMENDED" : "ALTERNATIVE"}</span>
                      <strong>{copy.title}</strong>
                      <small>{copy.detail}</small>
                      <code>{copy.technical}</code>
                    </button>
                  );
                })}
              </div>
              <div className={s.stepFooter}><span>Selected: <b>{modeCopy.title}</b></span><button type="button" onClick={() => setActiveStep(3)}>NEXT · SEE WHAT IT KNOWS →</button></div>
            </div>
          ) : null}
        </section>

        <section className={s.step} data-state={activeStep === 3 ? "active" : "locked"}>
          <button className={s.stepHeader} type="button" disabled={activeStep < 3} onClick={() => setActiveStep(3)} aria-expanded={activeStep === 3}>
            <StepNumber number="03" state={activeStep === 3 ? "active" : "locked"} />
            <span><small>LOOK INSIDE THE MODEL</small><strong>What information is this method allowed to use?</strong></span>
            <em>{activeStep < 3 ? "LOCKED" : "OPEN"}</em>
          </button>
          {activeStep === 3 ? (
            <div className={s.stepBody}>
              <p>This is the key move. The algorithm does not receive “the whole world.” It receives a selected representation of the world.</p>
              <div className={s.modelPreview}>
                <div data-kind="used"><span>THE COMPUTER GETS</span><ul>{worldModel.represented.map((item) => <li key={item}>{friendlyFact(item)}</li>)}</ul></div>
                <div data-kind="hidden"><span>THE COMPUTER DOES NOT GET</span><ul>{worldModel.hidden.map((item) => <li key={item}>{friendlyFact(item)}</li>)}</ul></div>
                <div data-kind="result"><span>THIS SETUP PRODUCES</span><strong>{modeCopy.output}</strong><small>{worldModel.explanation}</small></div>
              </div>
              <div className={s.launchBox}>
                <div><span>READY FOR STEP 04</span><strong>Load the maze and watch those choices become visible.</strong><small>You can run the demonstration automatically or move through it one step at a time.</small></div>
                <button type="button" onClick={onLaunch}>LOAD WORLD-01 →</button>
              </div>
            </div>
          ) : null}
        </section>
      </section>
    </>
  );
}
