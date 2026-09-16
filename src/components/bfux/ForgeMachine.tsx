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
        <span className="bf-machine-forge__fasteners">
          <i /><i /><i /><i />
        </span>

        <div className="bf-machine-forge__plate">
          <strong>FORGE</strong>
          <small>MATTER → MEANING</small>
        </div>

        <div className="bf-machine-forge__chamber">
          <span className="bf-machine-forge__data">0101 · 1100 · 0011</span>
          <span className="bf-machine-forge__scan" />
        </div>
      </div>

      <span className="bf-machine-forge__coupler" />
    </div>
  );
}
