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
          <i /><i /><i /><i /><i /><i />
        </span>

        <aside className="bf-research-exhaust__plenum bf-research-exhaust__plenum--left">
          <span /><span /><span />
        </aside>

        <div className="bf-research-exhaust__core">
          <div className="bf-research-exhaust__display">
            <strong>RESEARCH EXHAUST</strong>
            <small>LIVE OUTPUT</small>
          </div>
          <span className="bf-research-exhaust__scope" />
          <span className="bf-research-exhaust__status"><i /><i /><i /></span>
        </div>

        <aside className="bf-research-exhaust__plenum bf-research-exhaust__plenum--right">
          <span /><span /><span />
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
