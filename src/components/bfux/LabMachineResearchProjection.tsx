"use client";

import { useMemo, useState } from "react";
import researchSource from "@/content/lab-machine-research.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-research.css";

export type ResearchProjectionMode =
  | "program-map"
  | "method-map"
  | "claim-flow"
  | "cross-domain-map";

const researchProjectionModes: ResearchProjectionMode[] = [
  "program-map",
  "method-map",
  "claim-flow",
  "cross-domain-map",
];

export function isResearchProjectionMode(value: string): value is ResearchProjectionMode {
  return researchProjectionModes.includes(value as ResearchProjectionMode);
}

type ResearchProgramKind =
  | "theory"
  | "formal-object"
  | "discipline"
  | "formal-program"
  | "comparative-program"
  | "method-program";

type ResearchMethod = {
  id: string;
  label: string;
  description: string;
};

type ResearchRelation = {
  to: string;
  label: string;
};

type ResearchProgram = {
  id: string;
  label: string;
  shortLabel: string;
  kind: ResearchProgramKind;
  status: string;
  role: string;
  question: string;
  description: string;
  claimBoundary: string;
  methods: string[];
  inputs: string[];
  outputs: string[];
  relations: ResearchRelation[];
  currentStage: string;
  sourceRef: string;
};

type ClaimStage = {
  id: string;
  label: string;
  question: string;
  gate: string;
};

type CrossDomainCandidate = {
  id: string;
  label: string;
  posture: string;
  question: string;
  domainSignals: Record<string, string>;
  breakpoints: string[];
  sourceRef: string;
};

type ResearchProjectionData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  coverageNote: string;
  methods: ResearchMethod[];
  programs: ResearchProgram[];
  claimStages: ClaimStage[];
  domains: Array<{ id: string; label: string }>;
  crossDomainCandidates: CrossDomainCandidate[];
};

const researchData = researchSource as ResearchProjectionData;

const modeLabels: Record<ResearchProjectionMode, { label: string; description: string }> = {
  "program-map": {
    label: "Research Programs",
    description: "Inspect the current research architecture as a set of typed programs, formal objects, disciplines, and methodological layers rather than as a flat list of topics.",
  },
  "method-map": {
    label: "Methods in Use",
    description: "See which research procedures are exercised by which programs and where the same method is being tested across different formal roles.",
  },
  "claim-flow": {
    label: "Claim Development",
    description: "Follow the governed path from a clue or question through bounded representation, counterexample search, review, promotion, and repair.",
  },
  "cross-domain-map": {
    label: "Cross-Domain Invariants",
    description: "Inspect candidate recurring structures across domains while keeping lexical resemblance, bounded analogy, breakpoints, and stronger structural claims distinct.",
  },
};

const kindLabels: Record<ResearchProgramKind, string> = {
  theory: "Theory",
  "formal-object": "Formal object",
  discipline: "Discipline",
  "formal-program": "Formal program",
  "comparative-program": "Comparative program",
  "method-program": "Method program",
};

export function LabMachineResearchProjection({
  initialMode = "program-map",
  onBack,
  onClose,
}: {
  initialMode?: ResearchProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<ResearchProjectionMode>(initialMode);
  const [kindFilter, setKindFilter] = useState<ResearchProgramKind | "all">("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedProgramId, setSelectedProgramId] = useState(researchData.programs[0]?.id ?? null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(researchData.crossDomainCandidates[0]?.id ?? null);

  const visiblePrograms = useMemo(() => researchData.programs.filter((program) => {
    if (kindFilter !== "all" && program.kind !== kindFilter) return false;
    if (methodFilter !== "all" && !program.methods.includes(methodFilter)) return false;
    return true;
  }), [kindFilter, methodFilter]);

  const selectedProgram = researchData.programs.find((program) => program.id === selectedProgramId) ?? visiblePrograms[0] ?? null;
  const selectedCandidate = researchData.crossDomainCandidates.find((candidate) => candidate.id === selectedCandidateId) ?? null;
  const activeMethodCount = new Set(visiblePrograms.flatMap((program) => program.methods)).size;

  return (
    <LabMachineProjectionShell
      subsystem="Research"
      projection={modeLabels[mode].label}
      eyebrow="RESEARCH PROJECTION · EPISTEMIC ENGINE"
      title="How the Lab Turns Questions Into Structure"
      description={modeLabels[mode].description}
      status={`${visiblePrograms.length} PROGRAMS · ${activeMethodCount} METHODS`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-research-projection">
        <section className="bf-research-projection__controls" aria-label="Research projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>
              {researchProjectionModes.map((candidate) => (
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
          <p>{researchData.coverageNote}</p>
        </section>

        <section className="bf-research-projection__filters" aria-label="Research filters">
          <div>
            <small>PROGRAM TYPE</small>
            <button type="button" aria-pressed={kindFilter === "all"} onClick={() => setKindFilter("all")}>ALL</button>
            {(Object.keys(kindLabels) as ResearchProgramKind[]).map((kind) => (
              <button type="button" key={kind} aria-pressed={kindFilter === kind} onClick={() => setKindFilter(kind)}>{kindLabels[kind]}</button>
            ))}
          </div>
          <div>
            <small>METHOD</small>
            <button type="button" aria-pressed={methodFilter === "all"} onClick={() => setMethodFilter("all")}>ALL</button>
            {researchData.methods.map((method) => (
              <button type="button" key={method.id} aria-pressed={methodFilter === method.id} onClick={() => setMethodFilter(method.id)}>{method.label}</button>
            ))}
          </div>
        </section>

        <section className="bf-research-projection__readout" aria-label="Research program readout">
          <div><small>VISIBLE PROGRAMS</small><strong>{visiblePrograms.length}</strong></div>
          <div><small>METHODS IN USE</small><strong>{activeMethodCount}</strong></div>
          <div><small>CLAIM POSTURE</small><strong>BOUND · TEST · REPAIR</strong></div>
          <p>Recurring structure is treated as a research clue until a bounded mapping, counterexample search, evidence gate, and appropriate review support a stronger claim.</p>
        </section>

        {mode === "program-map" ? (
          <ProgramMap programs={visiblePrograms} selectedId={selectedProgram?.id ?? null} onSelect={setSelectedProgramId} />
        ) : null}
        {mode === "method-map" ? (
          <MethodMap programs={visiblePrograms} methods={researchData.methods} onSelect={setSelectedProgramId} />
        ) : null}
        {mode === "claim-flow" ? (
          <ClaimFlow programs={visiblePrograms} stages={researchData.claimStages} onSelect={setSelectedProgramId} />
        ) : null}
        {mode === "cross-domain-map" ? (
          <CrossDomainMap
            candidates={researchData.crossDomainCandidates}
            domains={researchData.domains}
            selectedId={selectedCandidate?.id ?? null}
            onSelect={setSelectedCandidateId}
          />
        ) : null}

        {mode === "cross-domain-map" ? (
          <CandidateInspection candidate={selectedCandidate} domains={researchData.domains} />
        ) : (
          <ProgramInspection program={selectedProgram} methods={researchData.methods} />
        )}
      </div>
    </LabMachineProjectionShell>
  );
}

function ProgramMap({ programs, selectedId, onSelect }: { programs: ResearchProgram[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const byId = new Map(programs.map((program) => [program.id, program]));
  return (
    <section className="bf-research-program-map" aria-label="Research program map">
      {programs.map((program, index) => (
        <button
          type="button"
          key={program.id}
          data-kind={program.kind}
          data-selected={selectedId === program.id ? "true" : "false"}
          onClick={() => onSelect(program.id)}
        >
          <header><span>{String(index + 1).padStart(2, "0")}</span><small>{kindLabels[program.kind]}</small></header>
          <strong>{program.label}</strong>
          <em>{program.status}</em>
          <p>{program.description}</p>
          <div><small>SYSTEM ROLE</small><span>{program.role}</span></div>
          <footer>
            {program.relations.map((relation) => (
              <span key={`${program.id}-${relation.to}`}>{relation.label} → {byId.get(relation.to)?.shortLabel ?? relation.to}</span>
            ))}
          </footer>
        </button>
      ))}
    </section>
  );
}

function MethodMap({ programs, methods, onSelect }: { programs: ResearchProgram[]; methods: ResearchMethod[]; onSelect: (id: string) => void }) {
  return (
    <section className="bf-research-method-map" aria-label="Research method map">
      {methods.map((method) => {
        const linked = programs.filter((program) => program.methods.includes(method.id));
        if (!linked.length) return null;
        return (
          <article key={method.id}>
            <header><small>METHOD</small><strong>{method.label}</strong><p>{method.description}</p></header>
            <span aria-hidden="true">→</span>
            <div>
              {linked.map((program) => (
                <button type="button" key={program.id} onClick={() => onSelect(program.id)}>
                  <small>{kindLabels[program.kind]}</small>
                  <strong>{program.shortLabel}</strong>
                  <span>{program.currentStage}</span>
                </button>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function ClaimFlow({ programs, stages, onSelect }: { programs: ResearchProgram[]; stages: ClaimStage[]; onSelect: (id: string) => void }) {
  return (
    <section className="bf-research-claim-flow" aria-label="Research claim development flow">
      <div className="bf-research-claim-flow__stages">
        {stages.map((stage, index) => {
          const atStage = programs.filter((program) => program.currentStage === stage.id);
          return (
            <article key={stage.id}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage.label}</strong></header>
              <p>{stage.question}</p>
              <div><small>GATE</small><span>{stage.gate}</span></div>
              <footer>
                {atStage.length ? atStage.map((program) => (
                  <button type="button" key={program.id} onClick={() => onSelect(program.id)}>{program.shortLabel}</button>
                )) : <small>NO SEEDED PROGRAM PARKED HERE</small>}
              </footer>
            </article>
          );
        })}
      </div>
      <p className="bf-research-claim-flow__rule">Promotion is not the terminal state. New evidence can reopen a claim, lower its maturity, supersede a representation, or create a repair obligation downstream.</p>
    </section>
  );
}

function CrossDomainMap({
  candidates,
  domains,
  selectedId,
  onSelect,
}: {
  candidates: CrossDomainCandidate[];
  domains: Array<{ id: string; label: string }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bf-research-cross-domain" role="region" aria-label="Cross-domain candidate map" tabIndex={0}>
      <table>
        <thead><tr><th>Candidate structure</th>{domains.map((domain) => <th key={domain.id}>{domain.label}</th>)}<th>Posture</th></tr></thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} data-selected={selectedId === candidate.id ? "true" : "false"}>
              <th scope="row"><button type="button" onClick={() => onSelect(candidate.id)}>{candidate.label}</button><small>{candidate.question}</small></th>
              {domains.map((domain) => <td key={domain.id}>{candidate.domainSignals[domain.id] ?? "—"}</td>)}
              <td><strong>{candidate.posture}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgramInspection({ program, methods }: { program: ResearchProgram | null; methods: ResearchMethod[] }) {
  if (!program) return <aside className="bf-research-inspection"><small>THROUGH · PROGRAM INSPECTION</small><h3>No program matches the current filter.</h3></aside>;
  const methodById = new Map(methods.map((method) => [method.id, method.label]));
  return (
    <aside className="bf-research-inspection" aria-live="polite">
      <header><div><small>THROUGH · PROGRAM INSPECTION</small><h3>{program.label}</h3></div><span>{program.status}</span></header>
      <p>{program.question}</p>
      <div className="bf-research-inspection__grid">
        <section><small>ROLE</small><p>{program.role}</p></section>
        <section><small>METHODS</small><ul>{program.methods.map((method) => <li key={method}>{methodById.get(method) ?? method}</li>)}</ul></section>
        <section><small>INPUTS</small><ul>{program.inputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>OUTPUTS</small><ul>{program.outputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>CURRENT CLAIM STAGE</small><p>{program.currentStage}</p></section>
        <section><small>CLAIM BOUNDARY</small><p>{program.claimBoundary}</p></section>
      </div>
      <footer><small>SOURCE SURFACE</small><span>{program.sourceRef}</span></footer>
    </aside>
  );
}

function CandidateInspection({ candidate, domains }: { candidate: CrossDomainCandidate | null; domains: Array<{ id: string; label: string }> }) {
  if (!candidate) return null;
  return (
    <aside className="bf-research-inspection" aria-live="polite">
      <header><div><small>THROUGH · CANDIDATE INSPECTION</small><h3>{candidate.label}</h3></div><span>{candidate.posture}</span></header>
      <p>{candidate.question}</p>
      <div className="bf-research-inspection__grid">
        {domains.map((domain) => (
          <section key={domain.id}><small>{domain.label.toUpperCase()}</small><p>{candidate.domainSignals[domain.id] ?? "No seeded mapping."}</p></section>
        ))}
        <section><small>KNOWN BREAKPOINTS</small><ul>{candidate.breakpoints.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      <footer><small>SOURCE SURFACE</small><span>{candidate.sourceRef}</span></footer>
    </aside>
  );
}
