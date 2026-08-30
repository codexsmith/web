"use client";

import { useState } from "react";
import valueSource from "@/content/lab-machine-public-value.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-public-value.css";

export type PublicValueProjectionMode = "capability-map";

export function isPublicValueProjectionMode(value: string): value is PublicValueProjectionMode {
  return value === "capability-map";
}

type Beneficiary = { id: string; label: string; promise: string };
type Dimension = { id: string; label: string; question: string; observable: string };
type EvidenceLevel = { id: string; label: string; claimCeiling: string; requires: string[]; notEnoughFor: string };
type ValueRecord = {
  id: string;
  label: string;
  kind: string;
  evidenceLevelId: string;
  beneficiaryIds: string[];
  dimensionIds: string[];
  capability: string;
  currentEvidence: string;
  missingEvidence: string[];
  independenceTest: string;
  claimBoundary: string;
  sourceRef: string;
};
type PublicValueData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  beneficiaryScales: Beneficiary[];
  valueDimensions: Dimension[];
  evidenceLadder: EvidenceLevel[];
  currentRecords: ValueRecord[];
  antiTheaterTests: string[];
  impactRule: string;
  claimFirewall: string;
};

const publicValue = valueSource as PublicValueData;

export function LabMachinePublicValueProjection({
  initialMode = "capability-map",
  onBack,
  onClose,
}: {
  initialMode?: PublicValueProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode] = useState<PublicValueProjectionMode>(initialMode);
  const [selectedRecordId, setSelectedRecordId] = useState(publicValue.currentRecords[0]?.id ?? "");
  const selected = publicValue.currentRecords.find((item) => item.id === selectedRecordId) ?? publicValue.currentRecords[0]!;
  const selectedLevel = publicValue.evidenceLadder.find((level) => level.id === selected.evidenceLevelId)!;

  return (
    <LabMachineProjectionShell
      subsystem="Public Value"
      projection="Capability Map"
      eyebrow="CONSEQUENCE PROJECTION · CAPABILITY / EVIDENCE / INDEPENDENCE"
      title="What Actually Leaves the Lab?"
      description="Distinguish output from usable capability, and usable capability from evidence that people or institutions can act differently because the work exists."
      status={`${publicValue.currentRecords.length} VALUE RECORDS · ${publicValue.valueDimensions.length} DIMENSIONS · CURRENT CLAIM CEILINGS EXPLICIT`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-value" data-mode={mode}>
        <section className="bf-value__posture">
          <div><small>PROJECTION MODE</small><button type="button" aria-pressed="true">Capability Map</button></div>
          <p>{publicValue.posture}</p>
        </section>

        <section className="bf-value__equation" aria-label="Public value consequence rail">
          <header><small>CONSEQUENCE RAIL</small><strong>Output ≠ access ≠ use ≠ changed action ≠ independent capacity</strong><p>{publicValue.impactRule}</p></header>
          <div>
            <span><small>01</small><b>DISTRIBUTED CAPABILITY</b></span><i>→</i>
            <span><small>02</small><b>REACHABLE BY OTHERS</b></span><i>→</i>
            <span><small>03</small><b>USABLE / UNDERSTOOD</b></span><i>→</i>
            <span><small>04</small><b>OBSERVED CONSEQUENCE</b></span><i>→</i>
            <span><small>05</small><b>INDEPENDENT / DURABLE</b></span>
          </div>
        </section>

        <section className="bf-value__scales" aria-label="Beneficiary scales">
          <header><small>WHO SHOULD GAIN CAPABILITY?</small><strong>Public value is relational: value to whom, under what consequence?</strong></header>
          <div>{publicValue.beneficiaryScales.map((scale) => <article key={scale.id}><small>{scale.id}</small><strong>{scale.label}</strong><p>{scale.promise}</p></article>)}</div>
        </section>

        <section className="bf-value__dimensions" aria-label="Public value dimensions">
          <header><small>VALUE DIMENSIONS</small><strong>Observable differences, not activity categories</strong></header>
          <div>{publicValue.valueDimensions.map((dimension) => <article key={dimension.id}><strong>{dimension.label}</strong><p>{dimension.question}</p><span>WITNESS · {dimension.observable}</span></article>)}</div>
        </section>

        <section className="bf-value__ladder" aria-label="Evidence ladder">
          <header><small>CLAIM LADDER</small><strong>Evidence must rise before impact language does.</strong></header>
          <div>{publicValue.evidenceLadder.map((level) => <article key={level.id}><small>{level.id}</small><strong>{level.label}</strong><p>{level.claimCeiling}</p><span>NOT ENOUGH FOR · {level.notEnoughFor}</span></article>)}</div>
        </section>

        <section className="bf-value__ledger" aria-label="Current public value evidence ledger">
          <header><small>CURRENT EVIDENCE LEDGER</small><strong>Low claim ceilings are a feature, not an embarrassment.</strong></header>
          <div>{publicValue.currentRecords.map((record) => (
            <button key={record.id} type="button" data-selected={record.id === selected.id ? "true" : "false"} onClick={() => setSelectedRecordId(record.id)}>
              <small>{record.kind}</small><strong>{record.label}</strong><span>{record.evidenceLevelId}</span><p>{record.capability}</p>
            </button>
          ))}</div>
        </section>

        <ValueInspection record={selected} level={selectedLevel} beneficiaries={publicValue.beneficiaryScales} dimensions={publicValue.valueDimensions} />

        <section className="bf-value__theater" aria-label="Anti-theater tests">
          <header><small>ANTI-THEATER GATE</small><strong>Before calling an output public value, ask:</strong></header>
          <ol>{publicValue.antiTheaterTests.map((test) => <li key={test}>{test}</li>)}</ol>
          <p>{publicValue.claimFirewall}</p>
        </section>
      </div>
    </LabMachineProjectionShell>
  );
}

function ValueInspection({ record, level, beneficiaries, dimensions }: { record: ValueRecord; level: EvidenceLevel; beneficiaries: Beneficiary[]; dimensions: Dimension[] }) {
  const beneficiaryLabels = record.beneficiaryIds.map((id) => beneficiaries.find((item) => item.id === id)?.label ?? id);
  const dimensionLabels = record.dimensionIds.map((id) => dimensions.find((item) => item.id === id)?.label ?? id);
  return (
    <aside className="bf-value-inspection">
      <header><small>INSPECT · VALUE RECORD</small><h3>{record.label}</h3><span>{level.id} · {level.label}</span></header>
      <p>{record.capability}</p>
      <div className="bf-value-inspection__meta">
        <section><small>BENEFICIARIES</small><strong>{beneficiaryLabels.join(" · ")}</strong></section>
        <section><small>VALUE DIMENSIONS</small><strong>{dimensionLabels.join(" · ")}</strong></section>
        <section><small>CURRENT CLAIM CEILING</small><strong>{level.claimCeiling}</strong></section>
      </div>
      <div className="bf-value-inspection__grid">
        <section><small>CURRENT EVIDENCE</small><p>{record.currentEvidence}</p></section>
        <section><small>MISSING EVIDENCE</small><ul>{record.missingEvidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>INDEPENDENCE TEST</small><p>{record.independenceTest}</p></section>
        <section><small>CLAIM BOUNDARY</small><p>{record.claimBoundary}</p></section>
        <section className="bf-value-inspection__wide"><small>EVIDENCE REQUIRED AT {level.id}</small><ul>{level.requires.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="bf-value-inspection__wide"><small>SOURCE SURFACE</small><p>{record.sourceRef}</p></section>
      </div>
    </aside>
  );
}
