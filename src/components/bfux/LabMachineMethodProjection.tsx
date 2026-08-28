"use client";

import { useMemo, useState } from "react";
import methodSource from "@/content/lab-machine-method.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-method.css";

export type MethodProjectionMode = "method-stack" | "procedure-player" | "method-comparison";

const methodProjectionModes: MethodProjectionMode[] = ["method-stack", "procedure-player", "method-comparison"];

export function isMethodProjectionMode(value: string): value is MethodProjectionMode {
  return methodProjectionModes.includes(value as MethodProjectionMode);
}

type KernelStep = { id: string; label: string; question: string };
type MethodLayer = { id: string; label: string; question: string; methods: string[] };
type MethodRecord = {
  id: string;
  label: string;
  shortLabel: string;
  kind: string;
  purpose: string;
  useWhen: string[];
  inputs: string[];
  outputs: string[];
  failureMode: string;
  sourceRef: string;
};
type ProcedureStep = {
  kernel: string;
  operator: string;
  question: string;
  state: string;
  output: string;
  witness: string;
  ifSkipped: string;
};
type ProcedureRecord = {
  id: string;
  label: string;
  shortLabel: string;
  startingState: string;
  desiredConsequence: string;
  sourceRef: string;
  steps: ProcedureStep[];
};
type ComparisonRecord = {
  task: string;
  primary: string[];
  secondary: string[];
  avoid: string;
  reason: string;
};
type MethodData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  kernel: KernelStep[];
  layers: MethodLayer[];
  methods: MethodRecord[];
  procedures: ProcedureRecord[];
  comparisons: ComparisonRecord[];
};

const methodData = methodSource as MethodData;

const modeLabels: Record<MethodProjectionMode, { label: string; description: string }> = {
  "method-stack": {
    label: "Method Stack",
    description: "See how orientation, representation, traversal, execution, validation, and repair compose into one procedural apparatus.",
  },
  "procedure-player": {
    label: "Run the Method",
    description: "Step through a bounded example and watch the represented problem change state as different methods act on it.",
  },
  "method-comparison": {
    label: "Compare Methods",
    description: "Choose method families by epistemic task instead of treating every problem as the same kind of search or validation problem.",
  },
};

export function LabMachineMethodProjection({
  initialMode = "method-stack",
  onBack,
  onClose,
}: {
  initialMode?: MethodProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<MethodProjectionMode>(initialMode);
  const [selectedMethodId, setSelectedMethodId] = useState(methodData.methods[0]?.id ?? "");
  const [selectedProcedureId, setSelectedProcedureId] = useState(methodData.procedures[0]?.id ?? "");
  const [procedureStepIndex, setProcedureStepIndex] = useState(0);

  const methodById = useMemo(() => new Map(methodData.methods.map((method) => [method.id, method])), []);
  const selectedMethod = methodById.get(selectedMethodId) ?? methodData.methods[0] ?? null;
  const selectedProcedure = methodData.procedures.find((procedure) => procedure.id === selectedProcedureId) ?? methodData.procedures[0];
  const currentProcedureStep = selectedProcedure?.steps[procedureStepIndex] ?? null;
  const kernelById = useMemo(() => new Map(methodData.kernel.map((step) => [step.id, step])), []);

  return (
    <LabMachineProjectionShell
      subsystem="Method"
      projection={modeLabels[mode].label}
      eyebrow="PROCEDURAL PROJECTION · REPLAYABLE REASONING"
      title="The Lab's Method as Machinery"
      description={modeLabels[mode].description}
      status={`${methodData.methods.length} METHODS · ${methodData.kernel.length} KERNEL STEPS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-method">
        <section className="bf-method__controls" aria-label="Method projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>
              {methodProjectionModes.map((candidate) => (
                <button type="button" key={candidate} aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>
                  {modeLabels[candidate].label}
                </button>
              ))}
            </span>
          </div>
          <p>{methodData.posture}</p>
        </section>

        <section className="bf-method__kernel" aria-label="Boundary First method kernel">
          {methodData.kernel.map((step, index) => (
            <article key={step.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.label}</strong>
              <p>{step.question}</p>
            </article>
          ))}
        </section>

        {mode === "method-stack" ? (
          <MethodStack layers={methodData.layers} methodById={methodById} selectedMethodId={selectedMethodId} onSelect={setSelectedMethodId} />
        ) : null}

        {mode === "procedure-player" && selectedProcedure && currentProcedureStep ? (
          <ProcedurePlayer
            procedures={methodData.procedures}
            selectedProcedure={selectedProcedure}
            stepIndex={procedureStepIndex}
            currentStep={currentProcedureStep}
            kernel={kernelById.get(currentProcedureStep.kernel)}
            onProcedureChange={(id) => {
              setSelectedProcedureId(id);
              setProcedureStepIndex(0);
            }}
            onStepChange={setProcedureStepIndex}
          />
        ) : null}

        {mode === "method-comparison" ? (
          <MethodComparison comparisons={methodData.comparisons} methodById={methodById} onSelect={setSelectedMethodId} />
        ) : null}

        <MethodInspection method={selectedMethod} />
      </div>
    </LabMachineProjectionShell>
  );
}

function MethodStack({
  layers,
  methodById,
  selectedMethodId,
  onSelect,
}: {
  layers: MethodLayer[];
  methodById: Map<string, MethodRecord>;
  selectedMethodId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-method-stack" aria-label="Method stack">
      {layers.map((layer) => (
        <article key={layer.id}>
          <header><small>{layer.label}</small><strong>{layer.question}</strong></header>
          <div>
            {layer.methods.map((id) => {
              const method = methodById.get(id);
              if (!method) return null;
              return (
                <button type="button" key={id} data-selected={selectedMethodId === id ? "true" : "false"} onClick={() => onSelect(id)}>
                  <small>{method.kind}</small>
                  <strong>{method.shortLabel}</strong>
                  <p>{method.purpose}</p>
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}

function ProcedurePlayer({
  procedures,
  selectedProcedure,
  stepIndex,
  currentStep,
  kernel,
  onProcedureChange,
  onStepChange,
}: {
  procedures: ProcedureRecord[];
  selectedProcedure: ProcedureRecord;
  stepIndex: number;
  currentStep: ProcedureStep;
  kernel?: KernelStep;
  onProcedureChange: (id: string) => void;
  onStepChange: (index: number) => void;
}) {
  const max = selectedProcedure.steps.length - 1;
  return (
    <section className="bf-method-player" aria-label="Method procedure player">
      <header>
        <div>
          <small>PROCEDURE</small>
          <div>{procedures.map((procedure) => (
            <button type="button" key={procedure.id} aria-pressed={selectedProcedure.id === procedure.id} onClick={() => onProcedureChange(procedure.id)}>{procedure.shortLabel}</button>
          ))}</div>
        </div>
        <div className="bf-method-player__mission">
          <small>DESIRED CONSEQUENCE</small>
          <strong>{selectedProcedure.label}</strong>
          <p>{selectedProcedure.desiredConsequence}</p>
        </div>
      </header>

      <div className="bf-method-player__start"><small>STARTING STATE</small><p>{selectedProcedure.startingState}</p></div>

      <div className="bf-method-player__rail" aria-label="Procedure steps">
        {selectedProcedure.steps.map((step, index) => (
          <button type="button" key={`${step.kernel}-${index}`} data-active={index === stepIndex ? "true" : "false"} data-complete={index < stepIndex ? "true" : "false"} onClick={() => onStepChange(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{kernel?.id === step.kernel && index === stepIndex ? kernel.label : step.kernel}</strong>
          </button>
        ))}
      </div>

      <div className="bf-method-player__state">
        <aside>
          <small>KERNEL STEP</small>
          <strong>{kernel?.label ?? currentStep.kernel}</strong>
          <p>{kernel?.question}</p>
          <span>OPERATOR · {currentStep.operator}</span>
        </aside>
        <main>
          <small>QUESTION</small><h3>{currentStep.question}</h3>
          <dl>
            <div><dt>CURRENT REPRESENTED STATE</dt><dd>{currentStep.state}</dd></div>
            <div><dt>OUTPUT</dt><dd>{currentStep.output}</dd></div>
            <div><dt>WITNESS</dt><dd>{currentStep.witness}</dd></div>
            <div><dt>IF SKIPPED</dt><dd>{currentStep.ifSkipped}</dd></div>
          </dl>
        </main>
      </div>

      <footer>
        <button type="button" disabled={stepIndex === 0} onClick={() => onStepChange(Math.max(0, stepIndex - 1))}>← PREVIOUS</button>
        <span>STEP {stepIndex + 1} / {selectedProcedure.steps.length}</span>
        <button type="button" disabled={stepIndex === max} onClick={() => onStepChange(Math.min(max, stepIndex + 1))}>NEXT →</button>
      </footer>
    </section>
  );
}

function MethodComparison({
  comparisons,
  methodById,
  onSelect,
}: {
  comparisons: ComparisonRecord[];
  methodById: Map<string, MethodRecord>;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-method-comparison" aria-label="Method comparison">
      {comparisons.map((comparison, index) => (
        <article key={comparison.task}>
          <header><span>{String(index + 1).padStart(2, "0")}</span><strong>{comparison.task}</strong></header>
          <div>
            <section><small>PRIMARY</small>{comparison.primary.map((id) => <MethodChip key={id} id={id} methodById={methodById} onSelect={onSelect} />)}</section>
            <section><small>SECONDARY</small>{comparison.secondary.map((id) => <MethodChip key={id} id={id} methodById={methodById} onSelect={onSelect} />)}</section>
            <section><small>AVOID</small><p>{comparison.avoid}</p></section>
            <section><small>WHY</small><p>{comparison.reason}</p></section>
          </div>
        </article>
      ))}
    </section>
  );
}

function MethodChip({ id, methodById, onSelect }: { id: string; methodById: Map<string, MethodRecord>; onSelect: (id: string) => void }) {
  const method = methodById.get(id);
  if (!method) return null;
  return <button type="button" onClick={() => onSelect(id)}>{method.shortLabel}</button>;
}

function MethodInspection({ method }: { method: MethodRecord | null }) {
  if (!method) return null;
  return (
    <aside className="bf-method-inspection" aria-live="polite">
      <header><div><small>THROUGH · METHOD INSPECTION</small><h3>{method.label}</h3></div><span>{method.kind}</span></header>
      <p>{method.purpose}</p>
      <div>
        <section><small>USE WHEN</small><ul>{method.useWhen.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>INPUTS</small><ul>{method.inputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>OUTPUTS</small><ul>{method.outputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>FAILURE MODE</small><p>{method.failureMode}</p></section>
      </div>
      <footer><small>SOURCE SURFACE</small><span>{method.sourceRef}</span></footer>
    </aside>
  );
}
