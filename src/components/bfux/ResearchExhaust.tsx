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
      <span className="bf-research-exhaust__neck" />

      <div className="bf-research-exhaust__housing">
        <span className="bf-research-exhaust__fasteners">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </span>

        <aside className="bf-research-exhaust__identity">
          <div className="bf-research-exhaust__identity-plate">
            <strong>RESEARCH<br />EXHAUST</strong>
            <small>LIVE OUTPUT</small>
          </div>
          <div className="bf-research-exhaust__identity-vents">
            <i /><i /><i /><i /><i />
          </div>
        </aside>

        <div className="bf-research-exhaust__screen">
          <span className="bf-research-exhaust__screen-grid" />
          <span className="bf-research-exhaust__screen-scan" />
          <span className="bf-research-exhaust__screen-baseline" />
        </div>

        <aside className="bf-research-exhaust__service">
          <span className="bf-research-exhaust__service-lights"><i /><i /><i /></span>
          <span className="bf-research-exhaust__service-vents"><i /><i /><i /><i /><i /></span>
        </aside>

        <div className="bf-research-exhaust__rail" aria-hidden="true">
          <i data-channel="artifact" />
          <i data-channel="publication" />
          <i data-channel="application" />
          <i data-channel="evidence" />
          <i data-channel="unresolved" />
        </div>

        <div className="bf-research-exhaust__routing" aria-hidden="true">
          <i data-channel="artifact" />
          <i data-channel="publication" />
          <i data-channel="application" />
          <i data-channel="evidence" />
          <i data-channel="unresolved" />
        </div>
      </div>

      <span className="bf-research-exhaust__lower-rail" />
    </div>
  );
}
