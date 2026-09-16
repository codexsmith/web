import type { LabMachineResolution } from "./LabMachine";
import "./research-exhaust.css";

export function ResearchExhaust({ resolution }: { resolution: LabMachineResolution }) {
  return (
    <div
      className="bf-research-exhaust"
      data-resolution={resolution}
      data-machine-layer="hardware"
      aria-hidden="true"
    >
      <span className="bf-research-exhaust__riser" />
      <span className="bf-research-exhaust__coupler" />

      <div className="bf-research-exhaust__housing">
        <span className="bf-research-exhaust__fasteners">
          <i /><i /><i /><i />
        </span>

        <div className="bf-research-exhaust__display">
          <strong>RESEARCH EXHAUST</strong>
          <small>LIVE OUTPUT</small>
        </div>

        <div className="bf-research-exhaust__rail" aria-hidden="true">
          <i data-channel="artifact" />
          <i data-channel="publication" />
          <i data-channel="application" />
          <i data-channel="evidence" />
          <i data-channel="unresolved" />
        </div>
      </div>
    </div>
  );
}
