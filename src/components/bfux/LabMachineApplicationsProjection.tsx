"use client";

import { useMemo, useState } from "react";
import applicationsSource from "@/content/lab-machine-applications.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-applications.css";

export type ApplicationsProjectionMode = "domain-map" | "transfer-analysis";

const applicationModes: ApplicationsProjectionMode[] = ["domain-map", "transfer-analysis"];

export function isApplicationsProjectionMode(value: string): value is ApplicationsProjectionMode {
  return applicationModes.includes(value as ApplicationsProjectionMode);
}

type Mapping = { from: string; to: string };
type Application = {
  id: string;
  label: string;
  domain: string;
  domainKind: string;
  standing: string;
  standingLabel: string;
  sourceMechanism: string;
  transferQuestion: string;
  transferStage: string;
  mapping: Mapping[];
  preservedCandidates: string[];
  adaptations: string[];
  newConstraints: string[];
  witnesses: string[];
  failureSignals: string[];
  returnToResearch: string;
  claimBoundary: string;
  sourceRef: string;
};
type TransferCandidate = { id: string; label: string; description: string; posture: string };
type ApplicationsData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  applications: Application[];
  transferCandidates: TransferCandidate[];
  transferRule: string;
};

const applications = applicationsSource as ApplicationsData;

const modeLabels: Record<ApplicationsProjectionMode, { label: string; description: string }> = {
  "domain-map": {
    label: "Domains",
    description: "Inspect bounded application environments by current standing, transfer question, domain-native mapping, witnesses, and explicit claim boundary.",
  },
  "transfer-analysis": {
    label: "Transfer Analysis",
    description: "Compare what appears to survive across domains, what must change, where new constraints enter, and which failures should flow back into Research.",
  },
};

export function LabMachineApplicationsProjection({
  initialMode = "domain-map",
  onBack,
  onClose,
}: {
  initialMode?: ApplicationsProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<ApplicationsProjectionMode>(initialMode);
  const [selectedApplicationId, setSelectedApplicationId] = useState(applications.applications[0]?.id ?? "");
  const [selectedCandidateId, setSelectedCandidateId] = useState(applications.transferCandidates[0]?.id ?? "");

  const applicationById = useMemo(() => new Map(applications.applications.map((item) => [item.id, item])), []);
  const selectedApplication = applicationById.get(selectedApplicationId) ?? applications.applications[0];
  const selectedCandidate = applications.transferCandidates.find((item) => item.id === selectedCandidateId) ?? applications.transferCandidates[0];

  return (
    <LabMachineProjectionShell
      subsystem="Applications"
      projection={modeLabels[mode].label}
      eyebrow="DOMAIN TRANSFER PROJECTION · TEST GENERALITY"
      title="What Happens When the Method Leaves the Lab?"
      description={modeLabels[mode].description}
      status={`${applications.applications.length} BOUNDED APPLICATIONS · ${applications.transferCandidates.length} CANDIDATE TRANSFER STRUCTURES`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-applications">
        <section className="bf-applications__controls" aria-label="Applications projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>{applicationModes.map((candidate) => (
              <button key={candidate} type="button" aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>{modeLabels[candidate].label}</button>
            ))}</span>
          </div>
          <p>{applications.posture}</p>
        </section>

        <section className="bf-applications__rule">
          <small>TRANSFER RULE</small>
          <p>{applications.transferRule}</p>
        </section>

        {mode === "domain-map" ? (
          <DomainMap applications={applications.applications} selectedId={selectedApplication.id} onSelect={setSelectedApplicationId} />
        ) : (
          <TransferAnalysis
            applications={applications.applications}
            candidates={applications.transferCandidates}
            selectedId={selectedCandidate.id}
            onSelect={setSelectedCandidateId}
          />
        )}

        <ApplicationInspection mode={mode} application={selectedApplication} candidate={selectedCandidate} />
      </div>
    </LabMachineProjectionShell>
  );
}

function DomainMap({ applications: items, selectedId, onSelect }: { applications: Application[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-applications-map" aria-label="Application domain map">
      <div className="bf-applications-map__rail">
        {items.map((item, index) => (
          <button key={item.id} type="button" data-selected={item.id === selectedId ? "true" : "false"} onClick={() => onSelect(item.id)}>
            <small>{String(index + 1).padStart(2, "0")} · {item.domainKind}</small>
            <strong>{item.label}</strong>
            <span>{item.domain}</span>
            <em>{item.standingLabel}</em>
            <p>{item.transferQuestion}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function TransferAnalysis({
  applications: items,
  candidates,
  selectedId,
  onSelect,
}: {
  applications: Application[];
  candidates: TransferCandidate[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="bf-applications-transfer" aria-label="Cross-domain transfer analysis">
      <nav>
        <small>CANDIDATE STRUCTURE</small>
        {candidates.map((candidate) => (
          <button key={candidate.id} type="button" aria-pressed={candidate.id === selectedId} onClick={() => onSelect(candidate.id)}>{candidate.label}</button>
        ))}
      </nav>
      <div className="bf-applications-transfer__matrix">
        <header>
          <div><small>DOMAIN</small></div>
          <div><small>PRESERVE</small></div>
          <div><small>ADAPT</small></div>
          <div><small>NEW CONSTRAINTS</small></div>
          <div><small>FAILURE / RETURN</small></div>
        </header>
        {items.map((item) => (
          <article key={item.id}>
            <div><strong>{item.label}</strong><span>{item.standingLabel}</span></div>
            <div><ul>{item.preservedCandidates.slice(0, 2).map((entry) => <li key={entry}>{entry}</li>)}</ul></div>
            <div><ul>{item.adaptations.slice(0, 2).map((entry) => <li key={entry}>{entry}</li>)}</ul></div>
            <div><ul>{item.newConstraints.slice(0, 3).map((entry) => <li key={entry}>{entry}</li>)}</ul></div>
            <div><p>{item.failureSignals[0]}</p><em>{item.returnToResearch}</em></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ApplicationInspection({ mode, application, candidate }: { mode: ApplicationsProjectionMode; application: Application; candidate: TransferCandidate }) {
  if (mode === "transfer-analysis") return (
    <aside className="bf-applications-inspection">
      <header><small>INSPECT · CANDIDATE TRANSFER STRUCTURE</small><h3>{candidate.label}</h3></header>
      <p>{candidate.description}</p>
      <div className="bf-applications-inspection__grid">
        <section><small>POSTURE</small><p>{candidate.posture}</p></section>
        <section><small>RESEARCH CONDITION</small><p>Recurrence is not invariance until domain-native definitions, breakpoints, counterexamples, and witnesses survive comparison.</p></section>
        <section><small>FAILURE VALUE</small><p>A failed transfer narrows the claim and should feed Research rather than being reclassified as an implementation exception.</p></section>
      </div>
    </aside>
  );

  return (
    <aside className="bf-applications-inspection">
      <header><small>INSPECT · BOUNDED APPLICATION</small><h3>{application.label}</h3><span>{application.standingLabel}</span></header>
      <p>{application.transferStage}</p>
      <div className="bf-applications-inspection__mapping">
        {application.mapping.map((item) => <div key={`${item.from}-${item.to}`}><span>{item.from}</span><b>→</b><strong>{item.to}</strong></div>)}
      </div>
      <div className="bf-applications-inspection__grid">
        <section><small>SOURCE MECHANISM</small><p>{application.sourceMechanism}</p></section>
        <section><small>WITNESSES</small><ul>{application.witnesses.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>FAILURE SIGNALS</small><ul>{application.failureSignals.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>RETURN TO RESEARCH</small><p>{application.returnToResearch}</p></section>
        <section className="bf-applications-inspection__wide"><small>CLAIM BOUNDARY</small><p>{application.claimBoundary}</p><em>{application.sourceRef}</em></section>
      </div>
    </aside>
  );
}
