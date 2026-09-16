import type { LabMachineResolution } from "./LabMachine";
import "./forge-machine.css";

export function ForgeMachine({ resolution }: { resolution: LabMachineResolution }) {
  return (
    <div
      className="bf-machine-forge"
      data-resolution={resolution}
      data-machine-layer="hardware"
      aria-hidden="true"
    >
      <span className="bf-machine-forge__mount bf-machine-forge__mount--left" />
      <span className="bf-machine-forge__mount bf-machine-forge__mount--right" />

      <div className="bf-machine-forge__housing">
        <span className="bf-machine-forge__top-rail" />
        <span className="bf-machine-forge__fasteners">
          <i /><i /><i /><i /><i /><i />
        </span>

        <header className="bf-machine-forge__header">
          <div className="bf-machine-forge__plate">
            <strong>FORGE</strong>
            <small>MATTER → MEANING</small>
          </div>
          <span className="bf-machine-forge__status">
            <i />
            FABRICATION CELL
          </span>
        </header>

        <div className="bf-machine-forge__body">
          <aside className="bf-machine-forge__service bf-machine-forge__service--left">
            <i /><i /><i />
          </aside>

          <div className="bf-machine-forge__chamber">
            <span className="bf-machine-forge__chamber-frame" />
            <div className="bf-machine-forge__data">
              <span>0101 1100 0011 1010</span>
              <span>1100 0010 1110 0101</span>
              <span>0011 1011 0100 1100</span>
            </div>
            <span className="bf-machine-forge__scan" />
            <span className="bf-machine-forge__workbed" />
          </div>

          <aside className="bf-machine-forge__service bf-machine-forge__service--right">
            <i /><i /><i />
          </aside>
        </div>

        <footer className="bf-machine-forge__lower-deck">
          <span className="bf-machine-forge__bus" />
          <span className="bf-machine-forge__lower-label">REPRESENTATION FABRICATION BUS</span>
          <span className="bf-machine-forge__lower-status"><i /><i /><i /></span>
        </footer>
      </div>

      <span className="bf-machine-forge__base-rail" />
      <span className="bf-machine-forge__coupler" />
    </div>
  );
}
