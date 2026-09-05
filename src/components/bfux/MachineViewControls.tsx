import { BfuxIcon } from "@/components/bfux-icons";

type MachineViewControlsProps = {
  activeSurface?: "capital" | "full";
  onCapital: () => void;
  onFull: () => void;
};

export function MachineViewControls({
  activeSurface,
  onCapital,
  onFull,
}: MachineViewControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onCapital}
        aria-pressed={activeSurface === "capital"}
        aria-label="Capital cycle: show how resources become retained Lab capability"
        title="Show the capital conversion cycle"
        data-machine-surface="capital"
      >
        <BfuxIcon name="pressure" className="projection-switcher__glyph" />
        <span className="projection-switcher__copy">
          <span className="projection-switcher__mode-name">Capital</span>
          <small className="projection-switcher__mode-purpose">Cycle</small>
        </span>
      </button>
      <button
        type="button"
        onClick={onFull}
        aria-pressed={activeSurface === "full"}
        aria-label="Full loop: show the complete Lab Machine"
        title="Show the complete Lab Machine"
        data-machine-resolution="mid"
      >
        <BfuxIcon name="widen" className="projection-switcher__glyph" />
        <span className="projection-switcher__copy">
          <span className="projection-switcher__mode-name">Full</span>
          <small className="projection-switcher__mode-purpose">Loop</small>
        </span>
      </button>
    </>
  );
}
