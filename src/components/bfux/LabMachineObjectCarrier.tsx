"use client";

import { useState } from "react";
import legacySource from "@/content/lab-machine-governed-objects.json";
import registrySource from "@/content/lab-machine-object-registry.json";
import { getLabMachineNode } from "./lab-machine-model";
import { useLabMachineNavigation } from "./LabMachineNavigationContext";
import "./lab-machine-object-carrier.css";

type ObjectProjection = {
  role: string;
  standing: string;
  representation: string;
  preserves: string[];
  witness: string[];
  next: string;
  claimBoundary: string;
  sourceRef: string;
};

type GovernedObject = {
  id: string;
  label: string;
  kind: string;
  status: string;
  framing: string;
  objectBoundary: string;
  claimBoundary: string;
  invariants: string[];
  route: string[];
  sourceRefs: string[];
  projections: Record<string, ObjectProjection>;
};

type GovernedObjectsData = {
  defaultObjectId?: string;
  objects: GovernedObject[];
};

const legacy = legacySource as GovernedObjectsData;
const registry = registrySource as GovernedObjectsData;
const governedObjects = [...legacy.objects, ...registry.objects];

export function LabMachineObjectCarrier({ compact = false }: { compact?: boolean }) {
  const navigation = useLabMachineNavigation();
  const [selecting, setSelecting] = useState(false);
  if (!navigation) return null;

  const object = governedObjects.find((item) => item.id === navigation.activeObjectId);
  const currentNodeId = navigation.currentNodeId ?? object?.route[0] ?? null;
  const projection = object && currentNodeId ? object.projections[currentNodeId] : undefined;
  const routeIndex = object && currentNodeId ? object.route.indexOf(currentNodeId) : -1;

  if (!object || selecting) {
    return (
      <section className="bf-object-carrier bf-object-carrier--selector" data-compact={compact ? "true" : "false"} aria-label="Governed object registry">
        <header>
          <div><small>OBJECT REGISTRY · SELECT ONE GOVERNED OBJECT</small><strong>Load an object into the machine</strong><span>{governedObjects.length} source-backed carrier seeds</span></div>
          {object ? <button type="button" onClick={() => setSelecting(false)}>CANCEL</button> : null}
        </header>
        <div className="bf-object-carrier__selector-grid">
          {governedObjects.map((candidate, index) => (
            <button key={candidate.id} type="button" data-active={candidate.id === navigation.activeObjectId ? "true" : "false"} onClick={() => { navigation.loadObject(candidate.id); setSelecting(false); }}>
              <small>{String(index + 1).padStart(2, "0")} · {candidate.kind}</small>
              <strong>{candidate.label}</strong>
              <span>{candidate.status}</span>
              {!compact ? <p>{candidate.framing}</p> : null}
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bf-object-carrier" data-compact={compact ? "true" : "false"} aria-label={`Governed object carrier: ${object.label}`}>
      <header>
        <div>
          <small>CARRIER OBJECT · SAME OBJECT / NEW PROJECTION</small>
          <strong>{object.label}</strong>
          <span>{object.status}</span>
        </div>
        <div className="bf-object-carrier__commands"><button type="button" onClick={() => setSelecting(true)}>CHANGE OBJECT</button><button type="button" onClick={() => navigation.setActiveObjectId(null)}>CLEAR</button></div>
      </header>

      <div className="bf-object-carrier__route" aria-label="Object projection route through Lab Machine">
        {object.route.map((nodeId, index) => {
          const node = getLabMachineNode(nodeId);
          const active = nodeId === currentNodeId;
          const passed = routeIndex >= 0 && index < routeIndex;
          return (
            <button key={nodeId} type="button" data-active={active ? "true" : "false"} data-passed={passed ? "true" : "false"} onClick={() => navigation.navigateTo(nodeId)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{node?.label ?? nodeId}</strong>
              <span>{object.projections[nodeId]?.role ?? "projection gap"}</span>
            </button>
          );
        })}
      </div>

      {projection ? (
        <div className="bf-object-carrier__projection">
          <section><small>LOCAL ROLE</small><strong>{projection.role}</strong><span>{projection.standing}</span></section>
          <section className="bf-object-carrier__representation"><small>THIS PROJECTION OF THE OBJECT</small><p>{projection.representation}</p></section>
          {!compact ? <>
            <section><small>PRESERVES</small><ul>{projection.preserves.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><small>WITNESS</small><ul>{projection.witness.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="bf-object-carrier__wide"><small>NEXT ADMISSIBLE MOVE</small><p>{projection.next}</p></section>
            <section className="bf-object-carrier__wide bf-object-carrier__boundary"><small>CLAIM BOUNDARY</small><p>{projection.claimBoundary}</p><em>{projection.sourceRef}</em></section>
          </> : null}
        </div>
      ) : (
        <div className="bf-object-carrier__projection bf-object-carrier__projection--outside">
          <section><small>UNMAPPED / ORTHOGONAL VIEW</small><strong>{currentNodeId ? getLabMachineNode(currentNodeId)?.label ?? currentNodeId : "No subsystem selected"}</strong><p>This subsystem may constrain or inspect the carrier, but this registry seed does not yet claim a source-backed local projection here. The gap stays visible rather than being filled by inference.</p></section>
        </div>
      )}
    </section>
  );
}
