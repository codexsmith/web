"use client";

import { useMemo, useState } from "react";
import aboutSource from "@/content/lab-machine-about.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-about.css";

export type AboutProjectionMode = "institutional-profile" | "provenance" | "ethos";

const aboutProjectionModes: AboutProjectionMode[] = ["institutional-profile", "provenance", "ethos"];

export function isAboutProjectionMode(value: string): value is AboutProjectionMode {
  return aboutProjectionModes.includes(value as AboutProjectionMode);
}

type Distinction = { id: string; left: string; right: string; relation: string; why: string };
type OperatingStep = { id: string; label: string; role: string };
type EvidenceClass = { id: string; label: string; meaning: string };
type ProvenanceNode = { id: string; label: string; period: string; evidence: string[]; status: string; summary: string; sourceRef: string };
type ProvenanceEdge = { from: string; to: string; relation: string };
type Principle = { id: string; title: string; declaration: string; operationalImplication: string; visitorExpectation: string; sourceRef: string; linkedSubsystem: string };

type AboutData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  identity: {
    name: string;
    kind: string;
    method: string;
    statedAim: string;
    materialization: string;
    claimPosture: string;
    sourceStatus: string;
  };
  distinctions: Distinction[];
  operatingModel: { materialization: OperatingStep[]; promotion: string[]; disclosure: string[] };
  provenance: { evidenceClasses: EvidenceClass[]; nodes: ProvenanceNode[]; edges: ProvenanceEdge[]; constraints: string[] };
  principles: Principle[];
};

const about = aboutSource as AboutData;

const modeLabels: Record<AboutProjectionMode, { label: string; description: string }> = {
  "institutional-profile": {
    label: "The Institution",
    description: "Inspect the Lab as an institutional object: what it says it is, what it keeps distinct, how work materializes, and how artifacts acquire stronger institutional standing.",
  },
  provenance: {
    label: "Where It Came From",
    description: "See the institution as a convergence of technical formation, executable systems practice, long-run research, pre-AI apparatus, representation programs, and later controlled reconstruction without smoothing over provenance gaps.",
  },
  ethos: {
    label: "Operating Principles",
    description: "Inspect declared institutional principles beside the operational consequences and visitor-visible behaviors they are supposed to produce.",
  },
};

export function LabMachineAboutProjection({
  initialMode = "institutional-profile",
  onBack,
  onClose,
}: {
  initialMode?: AboutProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<AboutProjectionMode>(initialMode);
  const [selectedDistinctionId, setSelectedDistinctionId] = useState(about.distinctions[0]?.id ?? "");
  const [selectedOriginId, setSelectedOriginId] = useState(about.provenance.nodes[0]?.id ?? "");
  const [selectedPrincipleId, setSelectedPrincipleId] = useState(about.principles[0]?.id ?? "");

  const originById = useMemo(() => new Map(about.provenance.nodes.map((node) => [node.id, node])), []);
  const selectedDistinction = about.distinctions.find((item) => item.id === selectedDistinctionId) ?? about.distinctions[0];
  const selectedOrigin = originById.get(selectedOriginId) ?? about.provenance.nodes[0];
  const selectedPrinciple = about.principles.find((item) => item.id === selectedPrincipleId) ?? about.principles[0];

  return (
    <LabMachineProjectionShell
      subsystem="About"
      projection={modeLabels[mode].label}
      eyebrow="IDENTITY PROJECTION · INSTITUTION / PROVENANCE / ETHOS"
      title="What Kind of Institution Is This?"
      description={modeLabels[mode].description}
      status={`${about.provenance.nodes.length} PROVENANCE NODES · ${about.principles.length} OPERATING PRINCIPLES`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-about">
        <section className="bf-about__controls" aria-label="About projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>{aboutProjectionModes.map((candidate) => (
              <button key={candidate} type="button" aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>{modeLabels[candidate].label}</button>
            ))}</span>
          </div>
          <p>{about.posture}</p>
        </section>

        <section className="bf-about__identity-readout" aria-label="Institution identity readout">
          <div><small>INSTITUTION</small><strong>{about.identity.name}</strong></div>
          <div><small>TYPE</small><strong>{about.identity.kind}</strong></div>
          <div><small>OPERATIONAL METHOD</small><strong>{about.identity.method}</strong></div>
          <p>{about.identity.statedAim}</p>
        </section>

        {mode === "institutional-profile" ? (
          <InstitutionalProfile
            distinctions={about.distinctions}
            materialization={about.operatingModel.materialization}
            promotion={about.operatingModel.promotion}
            disclosure={about.operatingModel.disclosure}
            selectedId={selectedDistinction.id}
            onSelect={setSelectedDistinctionId}
          />
        ) : null}

        {mode === "provenance" ? (
          <ProvenanceMap
            nodes={about.provenance.nodes}
            edges={about.provenance.edges}
            evidenceClasses={about.provenance.evidenceClasses}
            selectedId={selectedOrigin.id}
            onSelect={setSelectedOriginId}
          />
        ) : null}

        {mode === "ethos" ? <EthosMap principles={about.principles} selectedId={selectedPrinciple.id} onSelect={setSelectedPrincipleId} /> : null}

        <AboutInspection
          mode={mode}
          distinction={selectedDistinction}
          origin={selectedOrigin}
          principle={selectedPrinciple}
          provenanceConstraints={about.provenance.constraints}
          identity={about.identity}
        />
      </div>
    </LabMachineProjectionShell>
  );
}

function InstitutionalProfile({
  distinctions,
  materialization,
  promotion,
  disclosure,
  selectedId,
  onSelect,
}: {
  distinctions: Distinction[];
  materialization: OperatingStep[];
  promotion: string[];
  disclosure: string[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-about-profile" aria-label="Institutional profile">
      <div className="bf-about-profile__distinctions">
        <header><small>IDENTITY BOUNDARY</small><strong>Keep unlike institutional claims unlike.</strong></header>
        <div>{distinctions.map((item) => (
          <button key={item.id} type="button" data-selected={item.id === selectedId ? "true" : "false"} onClick={() => onSelect(item.id)}>
            <span>{item.left}</span><b>{item.relation}</b><span>{item.right}</span>
          </button>
        ))}</div>
      </div>

      <div className="bf-about-profile__rails">
        <section>
          <header><small>MATERIALIZATION</small><strong>How research encounters consequence</strong></header>
          <div className="bf-about-profile__materialization">{materialization.map((step, index) => (
            <article key={step.id}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step.label}</strong><p>{step.role}</p></article>
          ))}</div>
        </section>
        <section>
          <header><small>INSTITUTIONAL PROMOTION</small><strong>Stronger standing requires stronger support</strong></header>
          <div className="bf-about-profile__ladder">{promotion.map((item, index) => <span key={item}><small>{String(index).padStart(2, "0")}</small><strong>{item}</strong></span>)}</div>
        </section>
        <section>
          <header><small>PUBLIC DISCLOSURE</small><strong>Orientation before formal depth</strong></header>
          <div className="bf-about-profile__ladder">{disclosure.map((item, index) => <span key={item}><small>{String(index).padStart(2, "0")}</small><strong>{item}</strong></span>)}</div>
        </section>
      </div>
    </section>
  );
}

function ProvenanceMap({
  nodes,
  edges,
  evidenceClasses,
  selectedId,
  onSelect,
}: {
  nodes: ProvenanceNode[];
  edges: ProvenanceEdge[];
  evidenceClasses: EvidenceClass[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  return (
    <section className="bf-about-provenance" aria-label="Institutional provenance map">
      <div className="bf-about-provenance__nodes">
        {nodes.map((node, index) => (
          <button type="button" key={node.id} data-selected={node.id === selectedId ? "true" : "false"} onClick={() => onSelect(node.id)}>
            <small>{String(index + 1).padStart(2, "0")} · {node.period}</small>
            <strong>{node.label}</strong>
            <span>{node.evidence.join(" / ")} · {node.status}</span>
            <p>{node.summary}</p>
          </button>
        ))}
      </div>
      <div className="bf-about-provenance__edges">
        <header><small>CAUSAL / STRUCTURAL EDGES</small><strong>Typed as working provenance, not inevitability.</strong></header>
        {edges.map((edge) => <div key={`${edge.from}-${edge.to}`}><span>{nodeById.get(edge.from)?.label ?? edge.from}</span><b>→ {edge.relation} →</b><span>{nodeById.get(edge.to)?.label ?? edge.to}</span></div>)}
      </div>
      <div className="bf-about-provenance__legend">
        <small>EVIDENCE CLASS</small>
        {evidenceClasses.map((item) => <span key={item.id}><b>{item.id}</b><strong>{item.label}</strong><p>{item.meaning}</p></span>)}
      </div>
    </section>
  );
}

function EthosMap({ principles, selectedId, onSelect }: { principles: Principle[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-about-ethos" aria-label="Operating principles">
      {principles.map((principle, index) => (
        <button key={principle.id} type="button" data-selected={principle.id === selectedId ? "true" : "false"} onClick={() => onSelect(principle.id)}>
          <div><small>{String(index + 1).padStart(2, "0")} · DECLARED PRINCIPLE</small><strong>{principle.title}</strong><p>{principle.declaration}</p></div>
          <b aria-hidden="true">→</b>
          <div><small>OPERATIONAL CONSEQUENCE</small><p>{principle.operationalImplication}</p></div>
          <b aria-hidden="true">→</b>
          <div><small>VISITOR SHOULD BE ABLE TO OBSERVE</small><p>{principle.visitorExpectation}</p><span>{principle.linkedSubsystem}</span></div>
        </button>
      ))}
    </section>
  );
}

function AboutInspection({
  mode,
  distinction,
  origin,
  principle,
  provenanceConstraints,
  identity,
}: {
  mode: AboutProjectionMode;
  distinction: Distinction;
  origin: ProvenanceNode;
  principle: Principle;
  provenanceConstraints: string[];
  identity: AboutData["identity"];
}) {
  if (mode === "institutional-profile") return (
    <aside className="bf-about-inspection">
      <header><small>INSPECT · IDENTITY DISTINCTION</small><h3>{distinction.left} / {distinction.right}</h3></header>
      <p>{distinction.why}</p>
      <div className="bf-about-inspection__grid">
        <section><small>RELATION</small><p>{distinction.relation}</p></section>
        <section><small>MATERIALIZATION POSTURE</small><p>{identity.materialization}</p></section>
        <section><small>CLAIM POSTURE</small><p>{identity.claimPosture}</p></section>
        <section><small>SOURCE STATUS</small><p>{identity.sourceStatus}</p></section>
      </div>
    </aside>
  );

  if (mode === "provenance") return (
    <aside className="bf-about-inspection">
      <header><small>INSPECT · PROVENANCE NODE</small><h3>{origin.label}</h3></header>
      <p>{origin.summary}</p>
      <div className="bf-about-inspection__grid">
        <section><small>PERIOD</small><p>{origin.period}</p></section>
        <section><small>EVIDENCE</small><p>{origin.evidence.join(" · ")}</p></section>
        <section><small>STATUS</small><p>{origin.status}</p></section>
        <section><small>SOURCE</small><p>{origin.sourceRef}</p></section>
        <section className="bf-about-inspection__wide"><small>PROVENANCE CONSTRAINTS</small><ul>{provenanceConstraints.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
    </aside>
  );

  return (
    <aside className="bf-about-inspection">
      <header><small>INSPECT · OPERATING PRINCIPLE</small><h3>{principle.title}</h3></header>
      <p>{principle.declaration}</p>
      <div className="bf-about-inspection__grid">
        <section><small>OPERATIONAL IMPLICATION</small><p>{principle.operationalImplication}</p></section>
        <section><small>OBSERVABLE EXPECTATION</small><p>{principle.visitorExpectation}</p></section>
        <section><small>LINKED SUBSYSTEM</small><p>{principle.linkedSubsystem}</p></section>
        <section><small>SOURCE SURFACE</small><p>{principle.sourceRef}</p></section>
      </div>
    </aside>
  );
}
