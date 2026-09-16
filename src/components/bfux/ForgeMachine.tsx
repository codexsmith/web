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
      <div className="bf-machine-forge__plume">
        {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
      </div>
      <span className="bf-machine-forge__emitter" />

      <aside className="bf-machine-forge__nameplate">
        <i /><i /><i /><i />
        <strong>Forge</strong>
      </aside>

      <span className="bf-machine-forge__pipe bf-machine-forge__pipe--left" />
      <span className="bf-machine-forge__pipe bf-machine-forge__pipe--right" />
      <span className="bf-machine-forge__conduit bf-machine-forge__conduit--left" />
      <span className="bf-machine-forge__conduit bf-machine-forge__conduit--right" />

      <span className="bf-machine-forge__mount bf-machine-forge__mount--left" />
      <span className="bf-machine-forge__mount bf-machine-forge__mount--right" />

      <div className="bf-machine-forge__housing">
        <span className="bf-machine-forge__top-rail" />
        <span className="bf-machine-forge__fasteners">
          <i /><i /><i /><i /><i /><i />
        </span>

        <header className="bf-machine-forge__header">
          <div className="bf-machine-forge__plate">
            <strong>FABRICATION CELL</strong>
            <small>MATTER → MEANING</small>
          </div>
          <span className="bf-machine-forge__status">
            <i />
            READY
          </span>
        </header>

        <div className="bf-machine-forge__body">
          <aside className="bf-machine-forge__service bf-machine-forge__service--left">
            <span className="bf-machine-forge__service-trace" />
            <i /><i /><i />
          </aside>

          <div className="bf-machine-forge__chamber">
            <span className="bf-machine-forge__chamber-rim" />
            <span className="bf-machine-forge__chamber-frame" />
            <div className="bf-machine-forge__data">
              <span>0101 1100 0011 1010</span>
              <span>1100 0010 1110 0101</span>
              <span>0011 1011 0100 1100</span>
              <span>1010 0110 1101 0011</span>
            </div>
            <span className="bf-machine-forge__scan" />
            <span className="bf-machine-forge__workbed" />
          </div>

          <aside className="bf-machine-forge__service bf-machine-forge__service--right">
            <span className="bf-machine-forge__service-trace" />
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
