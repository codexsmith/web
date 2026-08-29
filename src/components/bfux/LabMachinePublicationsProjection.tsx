"use client";

import { useState } from "react";
import secondLayerSource from "@/content/lab-machine-second-layer.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-publications.css";

export type PublicationsProjectionMode = "publication-map" | "maturity-board" | "claim-provenance";

const publicationProjectionModes: PublicationsProjectionMode[] = ["publication-map", "maturity-board", "claim-provenance"];

export function isPublicationsProjectionMode(value: string): value is PublicationsProjectionMode {
  return publicationProjectionModes.includes(value as PublicationsProjectionMode);
}

type PublicationCard = {
  label: string;
  eyebrow: string;
  framingQuestion: string;
  systemRole: string;
  orientation: string;
  institutionalPurpose: string;
  boundary: { contains: string[]; excludes: string[] };
  process: { entersAs: string[]; transformsThrough: string[]; exitsAs: string[] };
  rationale: string[];
  validationSignals: string[];
  views: { id: string; label: string; purpose: string }[];
  takeaway: string;
};

type SecondLayerData = { cards: { publications: PublicationCard } };

const publication = (secondLayerSource as SecondLayerData).cards.publications;

const modeLabels: Record<PublicationsProjectionMode, { label: string; description: string }> = {
  "publication-map": {
    label: "Publication Program",
    description: "See the publication boundary as a program of public artifact families, the research objects that enter it, and the inspectable knowledge objects that leave it.",
  },
  "maturity-board": {
    label: "Maturity",
    description: "Inspect the maturity vocabulary without confusing a lifecycle state with review quality, correctness, endorsement, or empirical validation.",
  },
  "claim-provenance": {
    label: "Claim Provenance",
    description: "Trace the governed crossing from research result to public artifact while keeping source registration, maturity, versioning, uncertainty, and revision conditions visible.",
  },
};

const maturityStates = [
  { id: "exploratory", label: "Exploratory", description: "Working material whose question, evidence, or claim boundary is still being formed." },
  { id: "drafted", label: "Drafted", description: "A structured publication candidate. Draft status does not imply review or release." },
  { id: "reviewed", label: "Reviewed", description: "A review state whose reviewer, scope, and standard must remain explicit rather than inferred." },
  { id: "published", label: "Published", description: "A public, versioned artifact. Publication does not imply peer review, correctness, endorsement, or authority." },
  { id: "superseded", label: "Superseded", description: "A prior version retained in provenance while a later version becomes the current reference." },
] as const;

export function LabMachinePublicationsProjection({
  initialMode = "publication-map",
  onBack,
  onClose,
}: {
  initialMode?: PublicationsProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<PublicationsProjectionMode>(initialMode);

  return (
    <LabMachineProjectionShell
      subsystem="Publications"
      projection={modeLabels[mode].label}
      eyebrow="PUBLICATION PROJECTION · CLAIM / MATURITY / PROVENANCE"
      title={publication.framingQuestion}
      description={modeLabels[mode].description}
      status={`${publication.boundary.contains.length} ARTIFACT FAMILIES · ${maturityStates.length} MATURITY STATES · ${publication.validationSignals.length} VALIDATION SIGNALS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-publications-projection">
        <section className="bf-publications-projection__controls" aria-label="Publication projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>
              {publicationProjectionModes.map((candidate) => (
                <button key={candidate} type="button" aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>
                  {modeLabels[candidate].label}
                </button>
              ))}
            </span>
          </div>
          <p>{publication.orientation}</p>
        </section>

        <section className="bf-publications-projection__readout" aria-label="Publication program summary">
          <div><small>PUBLIC ARTIFACT FAMILIES</small><strong>{publication.boundary.contains.length}</strong></div>
          <div><small>MATURITY VOCABULARY</small><strong>{maturityStates.length}</strong></div>
          <div><small>VALIDATION SIGNALS</small><strong>{publication.validationSignals.length}</strong></div>
          <p>These are publication-system definitions, not live inventory counts. No release, review, or peer-review status is inferred here.</p>
        </section>

        {mode === "publication-map" ? <PublicationProgram /> : null}
        {mode === "maturity-board" ? <MaturityBoard /> : null}
        {mode === "claim-provenance" ? <ClaimProvenance /> : null}

        <PublicationInspection />
      </div>
    </LabMachineProjectionShell>
  );
}

function PublicationProgram() {
  return (
    <section className="bf-publication-program" aria-label="Publication program">
      <header>
        <small>PUBLIC KNOWLEDGE INTERFACE</small>
        <h3>{publication.institutionalPurpose}</h3>
        <p>The program is organized around kinds of public artifacts and the boundary conditions that keep public claims inspectable.</p>
      </header>
      <div className="bf-publication-program__families">
        {publication.boundary.contains.map((family, index) => (
          <article key={family}>
            <small>{String(index + 1).padStart(2, "0")} · ARTIFACT FAMILY</small>
            <h4>{toTitle(family)}</h4>
            <p>Eligible publication form within the Lab&apos;s public knowledge boundary. Individual maturity must still be established separately.</p>
          </article>
        ))}
      </div>
      <div className="bf-publication-program__flow">
        <section>
          <small>ENTERS THE PUBLICATION BOUNDARY AS</small>
          <div>{publication.process.entersAs.map((item) => <span key={item}>{item}</span>)}</div>
        </section>
        <b aria-hidden="true">→</b>
        <section>
          <small>LEAVES AS</small>
          <div>{publication.process.exitsAs.map((item) => <span key={item}>{item}</span>)}</div>
        </section>
      </div>
    </section>
  );
}

function MaturityBoard() {
  return (
    <section className="bf-publication-maturity" aria-label="Publication maturity vocabulary">
      <header>
        <small>MATURITY IS A STATE, NOT A QUALITY SCORE</small>
        <h3>Keep lifecycle state separate from evidentiary strength.</h3>
        <p>A public artifact can be carefully labeled without pretending that publication, review, or age establishes correctness.</p>
      </header>
      <div>
        {maturityStates.map((state, index) => (
          <article key={state.id}>
            <small>{String(index + 1).padStart(2, "0")} · STATE</small>
            <h4>{state.label}</h4>
            <p>{state.description}</p>
          </article>
        ))}
      </div>
      <aside>
        <small>REQUIRED SEPARATION</small>
        <p>Lifecycle maturity, evidentiary maturity, editorial review, peer review, public release, endorsement, and correctness are distinct properties. The interface should never collapse them into one badge.</p>
      </aside>
    </section>
  );
}

function ClaimProvenance() {
  return (
    <section className="bf-publication-provenance" aria-label="Claim provenance path">
      <header>
        <small>GOVERNED BOUNDARY CROSSING</small>
        <h3>Research becomes public through an inspectable transformation path.</h3>
        <p>Every stage should preserve enough context to trace a public claim backward and to revise it forward.</p>
      </header>
      <div className="bf-publication-provenance__path">
        <ProcessCard index="01" label="Research input" items={publication.process.entersAs} />
        <b aria-hidden="true">→</b>
        <ProcessCard index="02" label="Publication transformation" items={publication.process.transformsThrough} />
        <b aria-hidden="true">→</b>
        <ProcessCard index="03" label="Public output" items={publication.process.exitsAs} />
      </div>
      <div className="bf-publication-provenance__principles">
        {publication.rationale.map((item, index) => (
          <article key={item}><small>{String(index + 1).padStart(2, "0")} · PUBLICATION RULE</small><p>{item}</p></article>
        ))}
      </div>
    </section>
  );
}

function ProcessCard({ index, label, items }: { index: string; label: string; items: string[] }) {
  return (
    <article>
      <small>{index} · {label.toUpperCase()}</small>
      <h4>{label}</h4>
      <div>{items.map((item) => <span key={item}>{item}</span>)}</div>
    </article>
  );
}

function PublicationInspection() {
  return (
    <aside className="bf-publication-inspection">
      <header><small>PUBLICATION CONTROL SURFACE</small><h3>{publication.takeaway}</h3></header>
      <div className="bf-publication-inspection__grid">
        <section><small>VALIDATION SIGNALS</small><ul>{publication.validationSignals.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>THE BOUNDARY EXCLUDES</small><ul>{publication.boundary.excludes.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>SYSTEM ROLE</small><p>{publication.systemRole}</p></section>
        <section><small>OPERATING PURPOSE</small><p>{publication.institutionalPurpose}</p></section>
      </div>
    </aside>
  );
}

function toTitle(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
