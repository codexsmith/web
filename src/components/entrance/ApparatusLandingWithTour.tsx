import { ApparatusLandingHome } from "./ApparatusLandingHome";
import { FiveMinuteOrientationPanel } from "./FiveMinuteOrientationPanel";

export function ApparatusLandingWithTour() {
  return (
    <div className="relative min-h-screen pb-32 sm:pb-36">
      <ApparatusLandingHome />

      <aside
        aria-label="Boundary First Labs guided tour"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-2 pb-2 sm:px-3 sm:pb-3"
      >
        <div className="pointer-events-auto mx-auto max-h-[84vh] max-w-[112rem] overflow-y-auto rounded-[1.15rem] border border-[#aaa598] bg-[#f1ece1] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_-10px_34px_rgba(48,45,38,0.16)]">
          <FiveMinuteOrientationPanel />
        </div>
      </aside>
    </div>
  );
}
