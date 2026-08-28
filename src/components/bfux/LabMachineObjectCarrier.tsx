"use client";

import governedObjectsSource from "@/content/lab-machine-governed-objects.json";
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
  defaultObjectId: string;
  objects: GovernedObject[];
};

const governedObjects = governedObjectsSource as GovernedObjectsData;

export function LabMachineObjectCarrier({ compact = false }: { compact?: boolean }) {
  const navigation = useLabMachineNavigation();
  if (!navigation?.activeObjectId) return null;

  const object = governedObjects.objects.find((item) => item.id === navigation.activeObjectId);
  if (!object) return null;

  const currentNodeId = navigation.currentNodeId ?? object.route[0];
  const projection = object.projections[currentNodeId];
  const routeIndex = object.route.indexOf(currentNodeId);

  return (
    <section className="bf-object-carrier" data-compact={compact ? "true" : "false"} aria-label={`Governed object carrier: ${object.label}`}>
      <header>
        <div>
          <small>CARRIER OBJECT · SAME OBJECT / NEW PROJECTION</small>
          <strong>{object.label}</strong>
          <span>{object.status}</span>
        </div>
        <button type="button" onClick={() => navigation.setActiveObjectId(null)}>CLEAR CARRIER</button>
      </header>

      <div className="bf-object-carrier__route" aria-label="Object route through Lab Machine">
        {object.route.map((nodeId, index) => {
          const node = getLabMachineNode(nodeId);
          const active = nodeId === currentNodeId;
          const passed = routeIndex >= 0 && index < routeIndex;
          return (
            <button key={nodeId} type="button" data-active={active ? "true" : "false"} data-passed={passed ? "true" : "false"} onClick={() => navigation.navigateTo(nodeId)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{node?.label ?? nodeId}</strong>
              <span>{object.projections[nodeId]?.role ?? "projection"}</span>
            </button>
          );
        })}
      </div>

      {projection ? (
        <div className="bf-object-carrier__projection">
          <section>
            <small>LOCAL ROLE</small>
            <strong>{projection.role}</strong>
            <span>{projection.standing}</span>
          </section>
          <section className="bf-object-carrier__representation">
            <small>THIS PROJECTION OF THE OBJECT</small>
            <p>{projection.representation}</p>
          </section>
          {!compact ? (
            <>
              <section>
                <small>PRESERVES</small>
                <ul>{projection.preserves.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <small>WITNESS</small>
                <ul>{projection.witness.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="bf-object-carrier__wide">
                <small>NEXT ADMISSIBLE MOVE</small>
                <p>{projection.next}</p>
              </section>
              <section className="bf-object-carrier__wide bf-object-carrier__boundary">
                <small>CLAIM BOUNDARY</small>
                <p>{projection.claimBoundary}</p>
                <em>{projection.sourceRef}</em>
              </section>
            </>
          ) : null}
        </div>
      ) : (
        <div className="bf-object-carrier__projection bf-object-carrier__projection--outside">
          <section><small>ORTHOGONAL VIEW</small><strong>{getLabMachineNode(currentNodeId)?.label ?? currentNodeId}</strong><p>This subsystem can still inspect or constrain the carrier object, but it is not part of the object's primary outward route.</p></section>
        </div>
      )}
    </section>
  );
}
