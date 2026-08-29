"use client";

import type { ReactNode } from "react";
import { BfuxIcon } from "@/components/bfux-icons";
import { getLabMachineNode } from "./lab-machine-model";
import { LabMachineObjectCarrier } from "./LabMachineObjectCarrier";
import { LabMachineRelationRail } from "./LabMachineRelationRail";
import { useLabMachineNavigation } from "./LabMachineNavigationContext";
import "./lab-machine-projection.css";
import "./lab-machine-density.css";

export function LabMachineProjectionShell({
  subsystem,
  projection,
  eyebrow,
  title,
  description,
  status,
  onBack,
  onClose,
  children,
}: {
  subsystem: string;
  projection: string;
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const rings = ["Boundary First Labs", "Lab Machine", subsystem, projection];
  const navigation = useLabMachineNavigation();

  return (
    <section className="bf-projection-shell" aria-label={`${subsystem}: ${projection}`}>
      <header className="bf-projection-shell__header">
        <div className="bf-projection-shell__title">
          <span className="bf-projection-shell__glyph"><BfuxIcon name="projection" /></span>
          <div>
            <p>{eyebrow}</p>
            <h2>{title}</h2>
            <strong>{description}</strong>
          </div>
        </div>
        <div className="bf-projection-shell__commands">
          {status ? <span className="bf-projection-shell__status">{status}</span> : null}
          <button type="button" onClick={onBack}>BACK TO {subsystem.toUpperCase()}</button>
          <button type="button" onClick={onClose} aria-label="Close projection">CLOSE ×</button>
        </div>
      </header>

      <aside className="bf-projection-map" aria-label="Boundary depth map">
        <div className="bf-projection-map__graphic" aria-hidden="true">
          <i data-ring="0" />
          <i data-ring="1" />
          <i data-ring="2" />
          <i data-ring="3" />
          <span />
        </div>
        <div className="bf-projection-map__legend">
          <small>BOUNDARY DEPTH</small>
          <ol>
            {rings.map((ring, index) => (
              <li key={ring} data-focus={index === rings.length - 1 ? "true" : "false"}>
                <span>{String(index).padStart(2, "0")}</span>
                <strong>{ring}</strong>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {navigation?.currentNodeId ? <div className="bf-projection-shell__traversal">
        <LabMachineObjectCarrier compact />
        <LabMachineRelationRail compact />
        <div className="bf-projection-shell__path">
          <small>BOUND PATH · {navigation.trail.length} RELATION{navigation.trail.length === 1 ? "" : "S"}</small>
          <strong>{navigation.focusLabel} → {getLabMachineNode(navigation.currentNodeId)?.label ?? subsystem}</strong>
          <span><button type="button" disabled={!navigation.trail.length} onClick={navigation.rewind}>BACK ONE</button><button type="button" disabled={!navigation.trail.length} onClick={navigation.clearTrail}>RESET FOCUS</button></span>
        </div>
      </div> : null}

      <div className="bf-projection-shell__workfield">{children}</div>
    </section>
  );
}
