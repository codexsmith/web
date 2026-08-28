"use client";

import { useMemo, useState } from "react";
import pipelineSource from "@/content/lab-machine-pipeline.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-pipeline.css";

export type PipelineProjectionMode = "flow-map" | "live-queue" | "promotion-path";

const pipelineProjectionModes: PipelineProjectionMode[] = ["flow-map", "live-queue", "promotion-path"];

export function isPipelineProjectionMode(value: string): value is PipelineProjectionMode {
  return pipelineProjectionModes.includes(value as PipelineProjectionMode);
}

type PipelineState = {
  id: string;
  label: string;
  shortLabel: string;
  role: string;
  entryConditions: string[];
  exitSignals: string[];
  canReopen: boolean;
};

type PipelineGate = {
  id: string;
  label: string;
  between: [string, string];
  question: string;
  checks: string[];
  failureRoute: string;
};

type QueueItem = {
  id: string;
  title: string;
  operatingState: string;
  projectPhase: string;
  normalizedStage: string;
  portfolioStanding: string;
  projectType: string;
  visibility: string;
  summary: string;
  sourceRef: string;
  mappingNote: string;
};

type TraceStep = {
  stateId: string;
  status: "complete" | "current" | "pending" | "reopened";
  artifact: string;
  witness: string;
  note: string;
};

type PipelineTrace = {
  id: string;
  label: string;
  shortLabel: string;
  objectType: string;
  currentStage: string;
  note: string;
  sourceRef: string;
  steps: TraceStep[];
};

type PipelineData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  provenanceNote: string;
  states: PipelineState[];
  gates: PipelineGate[];
  queueSnapshot: { asOf: string; basis: string; items: QueueItem[] };
  traces: PipelineTrace[];
};

const pipeline = pipelineSource as PipelineData;

const modeLabels: Record<PipelineProjectionMode, { label: string; description: string }> = {
  "flow-map": {
    label: "Work Flow",
    description: "Inspect the states and gates that move work from observation into maintainable institutional objects without erasing why a transition was allowed.",
  },
  "live-queue": {
    label: "Current Work",
    description: "Project current work into normalized pipeline stages while preserving the source project phase instead of pretending the projection is canonical state.",
  },
  "promotion-path": {
    label: "How Things Become Real",
    description: "Trace a concrete project through capture, validation, promotion, maintenance, or reopening and inspect the witnesses required at each transition.",
  },
};

export function LabMachinePipelineProjection({
  initialMode = "flow-map",
  onBack,
  onClose,
}: {
  initialMode?: PipelineProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<PipelineProjectionMode>(initialMode);
  const [selectedStateId, setSelectedStateId] = useState(pipeline.states[0]?.id ?? "");
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);
  const [selectedQueueId, setSelectedQueueId] = useState(pipeline.queueSnapshot.items[0]?.id ?? "");
  const [selectedTraceId, setSelectedTraceId] = useState(pipeline.traces[0]?.id ?? "");

  const selectedState = pipeline.states.find((state) => state.id === selectedStateId) ?? pipeline.states[0];
  const selectedGate = pipeline.gates.find((gate) => gate.id === selectedGateId) ?? null;
  const selectedQueue = pipeline.queueSnapshot.items.find((item) => item.id === selectedQueueId) ?? pipeline.queueSnapshot.items[0];
  const selectedTrace = pipeline.traces.find((trace) => trace.id === selectedTraceId) ?? pipeline.traces[0];

  const queueByStage = useMemo(() => {
    const grouped = new Map<string, QueueItem[]>();
    for (const state of pipeline.states) grouped.set(state.id, []);
    for (const item of pipeline.queueSnapshot.items) {
      const bucket = grouped.get(item.normalizedStage) ?? [];
      bucket.push(item);
      grouped.set(item.normalizedStage, bucket);
    }
    return grouped;
  }, []);

  const activeStageCount = [...queueByStage.values()].filter((items) => items.length > 0).length;

  return (
    <LabMachineProjectionShell
      subsystem="Pipeline"
      projection={modeLabels[mode].label}
      eyebrow="WORKFLOW PROJECTION · INSTITUTIONAL STATE TRANSITION"
      title="How Work Becomes Maintainable"
      description={modeLabels[mode].description}
      status={`${pipeline.queueSnapshot.items.length} TRACKED OBJECTS · ${activeStageCount} OCCUPIED STATES`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-pipeline">
        <section className="bf-pipeline__controls" aria-label="Pipeline projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>
              {pipelineProjectionModes.map((candidate) => (
                <button
                  type="button"
                  key={candidate}
                  aria-pressed={mode === candidate}
                  onClick={() => setMode(candidate)}
                >
                  {modeLabels[candidate].label}
                </button>
              ))}
            </span>
          </div>
          <p>{pipeline.provenanceNote}</p>
        </section>

        <section className="bf-pipeline__readout" aria-label="Pipeline state readout">
          <div><small>TRACKED OBJECTS</small><strong>{pipeline.queueSnapshot.items.length}</strong></div>
          <div><small>GATES</small><strong>{pipeline.gates.length}</strong></div>
          <div><small>REOPENABLE STATES</small><strong>{pipeline.states.filter((state) => state.canReopen).length}</strong></div>
          <p>The pipeline records why state changed. “Done” is never allowed to erase the witness, owner, defect, or repair route that made promotion admissible.</p>
        </section>

        {mode === "flow-map" ? (
          <FlowMap
            states={pipeline.states}
            gates={pipeline.gates}
            selectedStateId={selectedStateId}
            selectedGateId={selectedGateId}
            onSelectState={(id) => { setSelectedStateId(id); setSelectedGateId(null); }}
            onSelectGate={(id) => setSelectedGateId(id)}
          />
        ) : null}

        {mode === "live-queue" ? (
          <LiveQueue states={pipeline.states} queueByStage={queueByStage} selectedQueueId={selectedQueue?.id ?? ""} onSelect={setSelectedQueueId} />
        ) : null}

        {mode === "promotion-path" ? (
          <PromotionPath traces={pipeline.traces} states={pipeline.states} selectedTraceId={selectedTrace?.id ?? ""} onSelect={setSelectedTraceId} />
        ) : null}

        <Inspection
          mode={mode}
          state={selectedState}
          gate={selectedGate}
          queueItem={selectedQueue}
          trace={selectedTrace}
        />
      </div>
    </LabMachineProjectionShell>
  );
}

function FlowMap({
  states,
  gates,
  selectedStateId,
  selectedGateId,
  onSelectState,
  onSelectGate,
}: {
  states: PipelineState[];
  gates: PipelineGate[];
  selectedStateId: string;
  selectedGateId: string | null;
  onSelectState: (id: string) => void;
  onSelectGate: (id: string) => void;
}) {
  return (
    <section className="bf-pipeline-flow" aria-label="Institutional pipeline state flow">
      <div className="bf-pipeline-flow__rail">
        {states.map((state, index) => {
          const gate = gates.find((candidate) => candidate.between[0] === state.id && candidate.between[1] === states[index + 1]?.id);
          return (
            <div className="bf-pipeline-flow__segment" key={state.id}>
              <button type="button" className="bf-pipeline-state" data-selected={selectedStateId === state.id ? "true" : "false"} onClick={() => onSelectState(state.id)}>
                <small>{String(index + 1).padStart(2, "0")} · STATE</small>
                <strong>{state.label}</strong>
                <span>{state.role}</span>
                {state.canReopen ? <em>REOPENABLE</em> : null}
              </button>
              {gate ? (
                <button type="button" className="bf-pipeline-gate" data-selected={selectedGateId === gate.id ? "true" : "false"} onClick={() => onSelectGate(gate.id)}>
                  <small>GATE</small>
                  <strong>{gate.label}</strong>
                  <span>◆</span>
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="bf-pipeline-flow__return" aria-hidden="true"><span>DEFECT / NEW EVIDENCE</span><b>↶ REOPEN / REPAIR</b></div>
    </section>
  );
}

function LiveQueue({
  states,
  queueByStage,
  selectedQueueId,
  onSelect,
}: {
  states: PipelineState[];
  queueByStage: Map<string, QueueItem[]>;
  selectedQueueId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-pipeline-queue" aria-label="Current work projected onto pipeline states">
      {states.map((state) => {
        const items = queueByStage.get(state.id) ?? [];
        return (
          <article key={state.id} data-occupied={items.length ? "true" : "false"}>
            <header><small>STATE</small><strong>{state.shortLabel}</strong><span>{items.length}</span></header>
            <div>
              {items.map((item) => (
                <button type="button" key={item.id} data-selected={selectedQueueId === item.id ? "true" : "false"} onClick={() => onSelect(item.id)}>
                  <small>{item.projectType}</small>
                  <strong>{item.title}</strong>
                  <span>{item.operatingState} · {item.projectPhase}</span>
                </button>
              ))}
              {!items.length ? <p>NO TRACKED OBJECTS</p> : null}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function PromotionPath({
  traces,
  states,
  selectedTraceId,
  onSelect,
}: {
  traces: PipelineTrace[];
  states: PipelineState[];
  selectedTraceId: string;
  onSelect: (id: string) => void;
}) {
  const trace = traces.find((candidate) => candidate.id === selectedTraceId) ?? traces[0];
  const stateById = new Map(states.map((state) => [state.id, state]));
  return (
    <section className="bf-pipeline-path" aria-label="Promotion path trace">
      <nav aria-label="Choose pipeline trace">
        <small>TRACE OBJECT</small>
        {traces.map((candidate) => (
          <button type="button" key={candidate.id} aria-pressed={candidate.id === trace.id} onClick={() => onSelect(candidate.id)}>
            <strong>{candidate.shortLabel}</strong><span>{candidate.currentStage}</span>
          </button>
        ))}
      </nav>
      <div className="bf-pipeline-path__steps">
        {trace.steps.map((step, index) => (
          <article key={`${trace.id}-${step.stateId}`} data-status={step.status}>
            <header><small>{String(index + 1).padStart(2, "0")} · {step.status}</small><strong>{stateById.get(step.stateId)?.label ?? step.stateId}</strong></header>
            <div><small>ARTIFACT</small><p>{step.artifact}</p></div>
            <div><small>WITNESS</small><p>{step.witness}</p></div>
            <footer>{step.note}</footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function Inspection({
  mode,
  state,
  gate,
  queueItem,
  trace,
}: {
  mode: PipelineProjectionMode;
  state: PipelineState;
  gate: PipelineGate | null;
  queueItem: QueueItem;
  trace: PipelineTrace;
}) {
  if (mode === "flow-map") {
    if (gate) {
      return (
        <aside className="bf-pipeline-inspection">
          <header><small>INSPECT · GATE</small><h3>{gate.label}</h3></header>
          <p>{gate.question}</p>
          <div className="bf-pipeline-inspection__grid">
            <section><small>CHECKS</small><ul>{gate.checks.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><small>IF THE GATE FAILS</small><p>{gate.failureRoute}</p></section>
          </div>
        </aside>
      );
    }
    return (
      <aside className="bf-pipeline-inspection">
        <header><small>INSPECT · STATE</small><h3>{state.label}</h3></header>
        <p>{state.role}</p>
        <div className="bf-pipeline-inspection__grid">
          <section><small>ENTRY CONDITIONS</small><ul>{state.entryConditions.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><small>EXIT SIGNALS</small><ul>{state.exitSignals.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><small>REOPENING</small><p>{state.canReopen ? "This state may be re-entered when new evidence, defect, dependency change, or maintenance obligation invalidates later closure." : "This is an intake state rather than a closure state."}</p></section>
        </div>
      </aside>
    );
  }

  if (mode === "live-queue") {
    return (
      <aside className="bf-pipeline-inspection">
        <header><small>INSPECT · PROJECTED QUEUE OBJECT</small><h3>{queueItem.title}</h3></header>
        <p>{queueItem.summary}</p>
        <div className="bf-pipeline-inspection__grid">
          <section><small>SOURCE PROJECT STATE</small><p>{queueItem.operatingState} · {queueItem.projectPhase}</p></section>
          <section><small>PIPELINE PROJECTION</small><p>{queueItem.normalizedStage}</p></section>
          <section><small>MAPPING NOTE</small><p>{queueItem.mappingNote}</p></section>
          <section><small>STANDING</small><p>{queueItem.portfolioStanding}</p></section>
          <section><small>VISIBILITY</small><p>{queueItem.visibility}</p></section>
          <section><small>SOURCE</small><p>{queueItem.sourceRef}</p></section>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bf-pipeline-inspection">
      <header><small>INSPECT · PROMOTION TRACE</small><h3>{trace.label}</h3></header>
      <p>{trace.note}</p>
      <div className="bf-pipeline-inspection__grid">
        <section><small>OBJECT TYPE</small><p>{trace.objectType}</p></section>
        <section><small>CURRENT STAGE</small><p>{trace.currentStage}</p></section>
        <section><small>SOURCE</small><p>{trace.sourceRef}</p></section>
      </div>
    </aside>
  );
}
