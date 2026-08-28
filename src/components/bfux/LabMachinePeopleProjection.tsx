"use client";

import { useMemo, useState } from "react";
import peopleSource from "@/content/lab-machine-people.json";
import { LabMachineProjectionShell } from "./LabMachineProjectionShell";
import "./lab-machine-people.css";

export type PeopleProjectionMode = "participation-network" | "roles" | "provenance-network";

const peopleProjectionModes: PeopleProjectionMode[] = ["participation-network", "roles", "provenance-network"];

export function isPeopleProjectionMode(value: string): value is PeopleProjectionMode {
  return peopleProjectionModes.includes(value as PeopleProjectionMode);
}

type RoleType = {
  id: string;
  label: string;
  shortLabel: string;
  function: string;
  canContribute: string[];
  doesNotImply: string[];
  evidenceNeeded: string;
};

type RelationType = { id: string; label: string; meaning: string; nonImplication: string };
type RecordField = { field: string; question: string; requiredForPublicInstance: boolean };
type ProvenanceAnchor = {
  id: string;
  label: string;
  kind: string;
  status: string;
  roles: string[];
  relations: string[];
  targets: string[];
  evidence: string;
  nonImplications: string[];
  sourceRef: string;
};

type PeopleData = {
  schemaVersion: string;
  status: string;
  purpose: string;
  posture: string;
  publicRegister: { status: string; instanceCount: number; sourceRef: string; protectedFieldPolicy: string };
  roleTypes: RoleType[];
  relationTypes: RelationType[];
  recordContract: RecordField[];
  provenanceAnchors: ProvenanceAnchor[];
  rules: string[];
};

const people = peopleSource as PeopleData;

const modeLabels: Record<PeopleProjectionMode, { label: string; description: string }> = {
  "participation-network": {
    label: "Participation Network",
    description: "See the Lab as a center connected to typed participation functions while preserving the current source truth: no public operational collaboration instances are recorded.",
  },
  roles: {
    label: "Roles",
    description: "Inspect what different forms of participation mean, what they can contribute, what evidence they require, and—critically—what they do not imply.",
  },
  "provenance-network": {
    label: "Contribution Provenance",
    description: "Inspect the record contract and currently supportable provenance anchors without promoting outreach, history, repository activity, or planned relationships into stronger collaboration claims.",
  },
};

export function LabMachinePeopleProjection({
  initialMode = "participation-network",
  onBack,
  onClose,
}: {
  initialMode?: PeopleProjectionMode;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<PeopleProjectionMode>(initialMode);
  const [selectedRoleId, setSelectedRoleId] = useState(people.roleTypes[0]?.id ?? "");
  const [selectedAnchorId, setSelectedAnchorId] = useState(people.provenanceAnchors[0]?.id ?? "");

  const roleById = useMemo(() => new Map(people.roleTypes.map((role) => [role.id, role])), []);
  const relationById = useMemo(() => new Map(people.relationTypes.map((relation) => [relation.id, relation])), []);
  const selectedRole = roleById.get(selectedRoleId) ?? people.roleTypes[0];
  const selectedAnchor = people.provenanceAnchors.find((anchor) => anchor.id === selectedAnchorId) ?? people.provenanceAnchors[0];

  return (
    <LabMachineProjectionShell
      subsystem="People"
      projection={modeLabels[mode].label}
      eyebrow="PARTICIPATION PROJECTION · ROLE / RELATION / PROVENANCE"
      title="Who Participates—and What Does That Mean?"
      description={modeLabels[mode].description}
      status={`${people.roleTypes.length} ROLE TYPES · ${people.relationTypes.length} RELATIONS · ${people.publicRegister.instanceCount} PUBLIC LIVE INSTANCES`}
      onBack={onBack}
      onClose={onClose}
    >
      <div className="bf-people">
        <section className="bf-people__controls" aria-label="People projection controls">
          <div>
            <small>PROJECTION MODE</small>
            <span>{peopleProjectionModes.map((candidate) => (
              <button key={candidate} type="button" aria-pressed={mode === candidate} onClick={() => setMode(candidate)}>{modeLabels[candidate].label}</button>
            ))}</span>
          </div>
          <p>{people.posture}</p>
        </section>

        <section className="bf-people__readout" aria-label="Participation register status">
          <div><small>ROLE TYPES</small><strong>{people.roleTypes.length}</strong></div>
          <div><small>RELATION TYPES</small><strong>{people.relationTypes.length}</strong></div>
          <div data-empty={people.publicRegister.instanceCount === 0 ? "true" : "false"}><small>PUBLIC OPERATIONAL INSTANCES</small><strong>{people.publicRegister.instanceCount}</strong></div>
          <p>{people.publicRegister.protectedFieldPolicy}</p>
        </section>

        {mode === "participation-network" ? <ParticipationNetwork roles={people.roleTypes} selectedId={selectedRole.id} onSelect={setSelectedRoleId} registerStatus={people.publicRegister.status} /> : null}
        {mode === "roles" ? <RoleMatrix roles={people.roleTypes} selectedId={selectedRole.id} onSelect={setSelectedRoleId} /> : null}
        {mode === "provenance-network" ? <ProvenanceNetwork anchors={people.provenanceAnchors} selectedId={selectedAnchor.id} onSelect={setSelectedAnchorId} contract={people.recordContract} roleById={roleById} relationById={relationById} /> : null}

        <PeopleInspection mode={mode} role={selectedRole} anchor={selectedAnchor} rules={people.rules} roleById={roleById} relationById={relationById} />
      </div>
    </LabMachineProjectionShell>
  );
}

function ParticipationNetwork({ roles, selectedId, onSelect, registerStatus }: { roles: RoleType[]; selectedId: string; onSelect: (id: string) => void; registerStatus: string }) {
  return (
    <section className="bf-people-network" aria-label="Typed participation network">
      <header><small>PARTICIPATION TOPOLOGY</small><strong>Role nodes are admissible relationship types, not claims that a named person currently occupies every node.</strong></header>
      <div className="bf-people-network__field">
        <article className="bf-people-network__core">
          <small>INSTITUTIONAL OBJECT</small>
          <strong>BOUNDARY FIRST LABS</strong>
          <span>{registerStatus.replaceAll("-", " ").toUpperCase()}</span>
          <p>Connections become public facts only when a typed instance satisfies the participation record contract.</p>
        </article>
        <div className="bf-people-network__roles">{roles.map((role, index) => (
          <button key={role.id} type="button" data-selected={role.id === selectedId ? "true" : "false"} onClick={() => onSelect(role.id)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{role.label}</strong>
            <span>{role.shortLabel}</span>
          </button>
        ))}</div>
      </div>
      <footer><b>0 PUBLIC LIVE INSTANCES</b><span>Empty is represented explicitly rather than filled with aspirational partners, outreach targets, or implied relationships.</span></footer>
    </section>
  );
}

function RoleMatrix({ roles, selectedId, onSelect }: { roles: RoleType[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <section className="bf-people-roles" aria-label="Participation role definitions">
      {roles.map((role, index) => (
        <button key={role.id} type="button" data-selected={role.id === selectedId ? "true" : "false"} onClick={() => onSelect(role.id)}>
          <header><small>{String(index + 1).padStart(2, "0")} · ROLE</small><strong>{role.label}</strong><span>{role.shortLabel}</span></header>
          <p>{role.function}</p>
          <div><small>CAN CONTRIBUTE</small><ul>{role.canContribute.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><small>DOES NOT IMPLY</small><ul>{role.doesNotImply.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </button>
      ))}
    </section>
  );
}

function ProvenanceNetwork({
  anchors,
  selectedId,
  onSelect,
  contract,
  roleById,
  relationById,
}: {
  anchors: ProvenanceAnchor[];
  selectedId: string;
  onSelect: (id: string) => void;
  contract: RecordField[];
  roleById: Map<string, RoleType>;
  relationById: Map<string, RelationType>;
}) {
  return (
    <section className="bf-people-provenance" aria-label="Contribution provenance network">
      <div className="bf-people-provenance__anchors">
        <header><small>SOURCE-BACKED ANCHORS</small><strong>What can be represented now without inventing a public team roster</strong></header>
        {anchors.map((anchor) => (
          <button key={anchor.id} type="button" data-selected={anchor.id === selectedId ? "true" : "false"} onClick={() => onSelect(anchor.id)}>
            <small>{anchor.kind}</small>
            <strong>{anchor.label}</strong>
            <span>{anchor.status}</span>
            <p>{anchor.targets.join(" · ")}</p>
            <div>{anchor.roles.map((id) => <em key={id}>{roleById.get(id)?.shortLabel ?? id}</em>)}{anchor.relations.map((id) => <em key={id}>{relationById.get(id)?.label ?? id}</em>)}</div>
          </button>
        ))}
      </div>
      <div className="bf-people-provenance__contract">
        <header><small>LIVE PARTICIPATION RECORD CONTRACT</small><strong>Required before a relationship is promoted as an operational public instance</strong></header>
        {contract.map((field, index) => (
          <article key={field.field}><small>{String(index + 1).padStart(2, "0")}</small><strong>{field.field}</strong><p>{field.question}</p><span>{field.requiredForPublicInstance ? "REQUIRED" : "OPTIONAL"}</span></article>
        ))}
      </div>
    </section>
  );
}

function PeopleInspection({
  mode,
  role,
  anchor,
  rules,
  roleById,
  relationById,
}: {
  mode: PeopleProjectionMode;
  role: RoleType;
  anchor: ProvenanceAnchor;
  rules: string[];
  roleById: Map<string, RoleType>;
  relationById: Map<string, RelationType>;
}) {
  if (mode === "participation-network" || mode === "roles") return (
    <aside className="bf-people-inspection">
      <header><small>INSPECT · PARTICIPATION ROLE</small><h3>{role.label}</h3></header>
      <p>{role.function}</p>
      <div className="bf-people-inspection__grid">
        <section><small>CAN CONTRIBUTE</small><ul>{role.canContribute.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>DOES NOT IMPLY</small><ul>{role.doesNotImply.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><small>EVIDENCE NEEDED</small><p>{role.evidenceNeeded}</p></section>
        <section><small>CONTROL RULE</small><p>Type the relationship before projecting the person. Participation should never acquire extra meaning merely because a name is visible.</p></section>
      </div>
    </aside>
  );

  return (
    <aside className="bf-people-inspection">
      <header><small>INSPECT · PROVENANCE ANCHOR</small><h3>{anchor.label}</h3></header>
      <p>{anchor.evidence}</p>
      <div className="bf-people-inspection__grid">
        <section><small>STATUS</small><p>{anchor.status}</p></section>
        <section><small>ROLES</small><p>{anchor.roles.map((id) => roleById.get(id)?.label ?? id).join(" · ")}</p></section>
        <section><small>RELATIONS</small><p>{anchor.relations.map((id) => relationById.get(id)?.label ?? id).join(" · ")}</p></section>
        <section><small>SOURCE</small><p>{anchor.sourceRef}</p></section>
        <section className="bf-people-inspection__wide"><small>NON-IMPLICATIONS</small><ul>{anchor.nonImplications.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="bf-people-inspection__wide"><small>PARTICIPATION RULES</small><ul>{rules.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
    </aside>
  );
}
