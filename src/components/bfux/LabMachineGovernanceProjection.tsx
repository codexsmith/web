"use client";

import { useMemo, useState } from "react";
import governanceSource from "@/content/lab-machine-governance.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-governance.css";

export type GovernanceProjectionMode = "authority-map" | "gate-map" | "repair-map" | "ethos-to-rule";

const governanceProjectionModes: GovernanceProjectionMode[] = ["authority-map", "gate-map", "repair-map", "ethos-to-rule"];

export function isGovernanceProjectionMode(value: string): value is GovernanceProjectionMode {
  return governanceProjectionModes.includes(value as GovernanceProjectionMode);
}

type AuthorityClass = {
  id: string;
  label: string;
  shortLabel: string;
  scope: string;
  may: string[];
  mayNot: string[];
  requiredWitness: string;
  sourceRef: string;
};

type GovernanceGate = {
  id: string;
  label: string;
  transition: string;
  authority: string[];
  question: string;
  conditions: string[];
  failureRoute: string;
};

type RepairStep = { id: string; label: string; question: string; output: string };
type RepairCase = { id: string; label: string; trigger: string; protectedHistory: string; obligations: string[]; closureWitness: string };
type Principle = { id: string; principle: string; mechanism: string; observableConsequence: string; sourceRef: string };

type GovernanceData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  authorityClasses: AuthorityClass[];
  gates: GovernanceGate[];
  repairLoop: RepairStep[];
  repairCases: RepairCase[];
  principles: Principle[];
};

const governance = governanceSource as GovernanceData;

const modeLabels: Record<GovernanceProjectionMode, { label: string; description: string }> = {
  "authority-map": {
    label: "Authority",
    description: "Separate origin, stewardship, review, promotion, release, repair, and affected-party witness functions so consequential authority remains inspectable even when roles are presently combined.",
  },
  "gate-map": {
    label: "Institutional Gates",
    description: "Inspect the conditions and responsible authority functions that constrain movement through the Lab's institutional pipeline.",
  },
  "repair-map": {
    label: "Repair",
    description: "Treat correction as governed state transition: preserve evidence, contain consequence, trace dependencies, repair, retest, supersede, and maintain.",
  },
  "ethos-to-rule": {
    label: "Principle → Mechanism",
    description: "Translate institutional principles into concrete control mechanisms and observable consequences rather than leaving ethos as surrounding prose.",
  },
};

export function LabMachineGovernanceProjection({
  initialMode = "authority-map",
  onBack,
  onClose,
}: {
  initialMode?: GovernanceProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<GovernanceProjectionMode>(initialMode);
  const [selectedAuthorityId, setSelectedAuthorityId] = useState(governance.authorityClasses[0]?.id ?? "");
  const [selectedGateId, setSelectedGateId] = useState(governance.gates[0]?.id ?? "");
  const [selectedRepairId, setSelectedRepairId] = useState(governance.repairCases[0]?.id ?? "");
  const [selectedPrincipleId, setSelectedPrincipleId] = useState(governance.principles[0]?.id ?? "");

  const authorityById = useMemo(() => new Map(governance.authorityClasses.map((item) => [item.id, item])), []);
  const selectedAuthority = authorityById.get(selectedAuthorityId) ?? governance.authorityClasses[0];
  const selectedGate = governance.gates.find((item) => item.id === selectedGateId) ?? governance.gates[0];
  const selectedRepair = governance.repairCases.find((item) => item.id === selectedRepairId) ?? governance.repairCases[0];
  const selectedPrinciple = governance.principles.find((item) => item.id === selectedPrincipleId) ?? governance.principles[0];

  return (
    <LabMachineProjectionShell
      subsystem="Governance"
      projection={modeLabels[mode].label}
      eyebrow="GOVERNANCE PROJECTION · AUTHORITY / GATES / REPAIR"
      title="What Keeps the Machine Trustworthy"
      description={modeLabels[mode].description}
      status={`${governance.authorityClasses.length} AUTHORITY FUNCTIONS · ${governance.gates.length} GATES · ${governance.principles.length} PRINCIPLES`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-governance">
        <section className="bf-governance__controls" aria-label="Governance projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>{governanceProjectionModes.map((candidate) => (
              <button key={candidate} type="button" aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>{modeLabels[candidate].label}</button>
            ))}</span>
          </div>
          <p>{governance.posture}</p>
        </section>

        <section className="bf-governance__readout" aria-label="Governance readout">
          <div><small>AUTHORITY FUNCTIONS</small><strong>{governance.authorityClasses.length}</strong></div>
          <div><small>PIPELINE GATES</small><strong>{governance.gates.length}</strong></div>
          <div><small>REPAIR STAGES</small><strong>{governance.repairLoop.length}</strong></div>
          <p>Authority is modeled as a typed function. A person, model, artifact, product status, or publication state does not gain additional authority merely by appearing authoritative.</p>
        </section>

        {mode === "authority-map" ? <AuthorityMap authorities={governance.authorityClasses} selectedId={selectedAuthority.id} onSelect={setSelectedAuthorityId} /> : null}
        {mode === "gate-map" ? <GateMap gates={governance.gates} authorityById={authorityById} selectedId={selectedGate.id} onSelect={setSelectedGateId} /> : null}
        {mode === "repair-map" ? <RepairMap steps={governance.repairLoop} cases={governance.repairCases} selectedId={selectedRepair.id} onSelect={setSelectedRepairId} /> : null}
        {mode === "ethos-to-rule" ? <PrincipleMap principles={governance.principles} selectedId={selectedPrinciple.id} onSelect={setSelectedPrincipleId} /> : null}

        <GovernanceInspection mode={mode} authority={selectedAuthority} gate={selectedGate} repairCase={selectedRepair} principle={selectedPrinciple} authorityById={authorityById} />
      </div>
    </LabMachineProjectionShell>
  );
}

function AuthorityMap({ authorities, selectedId, onSelect }: { authorities: AuthorityClass[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-governance-authority" aria-label="Functional authority map">
      <header><small>FUNCTIONAL AUTHORITY MODEL</small><strong>Not a staffing chart</strong><p>Semantic separation prevents authorship, review, promotion, release, and repair from collapsing into one unexplained permission.</p></header>
      <div>{authorities.map((authority, index) => (
        <button key={authority.id} type="button" data-selected={authority.id === selectedId ? "true" : "false"} onClick={() => onSelect(authority.id)}>
          <small>{String(index + 1).padStart(2, "0")} · FUNCTION</small>
          <strong>{authority.label}</strong>
          <span>{authority.shortLabel}</span>
          <p>{authority.scope}</p>
        </button>
      ))}</div>
    </section>
  );
}

function GateMap({ gates, authorityById, selectedId, onSelect }: { gates: GovernanceGate[]; authorityById: Map<string, AuthorityClass>; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-governance-gates" aria-label="Institutional governance gates">
      <div className="bf-governance-gates__rail">
        {gates.map((gate, index) => (
          <button key={gate.id} type="button" data-selected={gate.id === selectedId ? "true" : "false"} onClick={() => onSelect(gate.id)}>
            <small>{String(index + 1).padStart(2, "0")} · GATE</small>
            <b aria-hidden="true">◆</b>
            <strong>{gate.label}</strong>
            <span>{gate.transition}</span>
            <em>{gate.authority.map((id) => authorityById.get(id)?.shortLabel ?? id).join(" + ")}</em>
          </button>
        ))}
      </div>
      <footer><span>WEAKER STATE</span><b>CONDITIONS + AUTHORITY + WITNESS →</b><span>STRONGER STATE</span></footer>
    </section>
  );
}

function RepairMap({ steps, cases, selectedId, onSelect }: { steps: RepairStep[]; cases: RepairCase[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-governance-repair" aria-label="Governance repair loop">
      <div className="bf-governance-repair__loop">
        {steps.map((step, index) => (
          <article key={step.id}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{step.label}</strong>
            <p>{step.question}</p>
            <span>{step.output}</span>
          </article>
        ))}
        <b aria-hidden="true">↶ NEW EVIDENCE / DEFECT / CONSEQUENCE CAN REOPEN EARLIER STATE</b>
      </div>
      <nav aria-label="Representative repair cases">
        <small>REPAIR CLASS</small>
        {cases.map((repairCase) => <button type="button" key={repairCase.id} aria-pressed={repairCase.id === selectedId} onClick={() => onSelect(repairCase.id)}>{repairCase.label}</button>)}
      </nav>
    </section>
  );
}

function PrincipleMap({ principles, selectedId, onSelect }: { principles: Principle[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-governance-principles" aria-label="Principle to mechanism map">
      {principles.map((principle, index) => (
        <button key={principle.id} type="button" data-selected={principle.id === selectedId ? "true" : "false"} onClick={() => onSelect(principle.id)}>
          <div><small>{String(index + 1).padStart(2, "0")} · PRINCIPLE</small><strong>{principle.principle}</strong></div>
          <b aria-hidden="true">→</b>
          <div><small>MECHANISM</small><p>{principle.mechanism}</p></div>
          <b aria-hidden="true">→</b>
          <div><small>OBSERVABLE CONSEQUENCE</small><p>{principle.observableConsequence}</p></div>
        </button>
      ))}
    </section>
  );
}

function GovernanceInspection({
  mode,
  authority,
  gate,
  repairCase,
  principle,
  authorityById,
}: {
  mode: GovernanceProjectionMode;
  authority: AuthorityClass;
  gate: GovernanceGate;
  repairCase: RepairCase;
  principle: Principle;
  authorityById: Map<string, AuthorityClass>;
}) {
  if (mode === "authority-map") return (
    <aside className="bf-governance-inspection">
      <header><small>INSPECT · AUTHORITY FUNCTION</small><h3>{authority.label}</h3></header>
      <p>{authority.scope}</p>
      <div className="bf-governance-inspection__grid">
        <section><small>MAY</small><ul>{authority.may.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>MAY NOT</small><ul>{authority.mayNot.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>REQUIRED WITNESS</small><p>{authority.requiredWitness}</p></section>
        <section><small>SOURCE SURFACE</small><p>{authority.sourceRef}</p></section>
      </div>
    </aside>
  );

  if (mode === "gate-map") return (
    <aside className="bf-governance-inspection">
      <header><small>INSPECT · INSTITUTIONAL GATE</small><h3>{gate.label}</h3></header>
      <p>{gate.question}</p>
      <div className="bf-governance-inspection__grid">
        <section><small>TRANSITION</small><p>{gate.transition}</p></section>
        <section><small>AUTHORITY</small><p>{gate.authority.map((id) => authorityById.get(id)?.label ?? id).join(" · ")}</p></section>
        <section><small>CONDITIONS</small><ul>{gate.conditions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>IF GATE FAILS</small><p>{gate.failureRoute}</p></section>
      </div>
    </aside>
  );

  if (mode === "repair-map") return (
    <aside className="bf-governance-inspection">
      <header><small>INSPECT · REPAIR CLASS</small><h3>{repairCase.label}</h3></header>
      <p>{repairCase.trigger}</p>
      <div className="bf-governance-inspection__grid">
        <section><small>PROTECTED HISTORY</small><p>{repairCase.protectedHistory}</p></section>
        <section><small>REPAIR OBLIGATIONS</small><ul>{repairCase.obligations.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>CLOSURE WITNESS</small><p>{repairCase.closureWitness}</p></section>
      </div>
    </aside>
  );

  return (
    <aside className="bf-governance-inspection">
      <header><small>INSPECT · PRINCIPLE / CONTROL</small><h3>{principle.principle}</h3></header>
      <div className="bf-governance-inspection__grid">
        <section><small>MECHANISM</small><p>{principle.mechanism}</p></section>
        <section><small>OBSERVABLE CONSEQUENCE</small><p>{principle.observableConsequence}</p></section>
        <section><small>SOURCE SURFACE</small><p>{principle.sourceRef}</p></section>
      </div>
    </aside>
  );
}
