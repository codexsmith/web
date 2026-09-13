import type { Metadata } from "next";
import { RepresentationLab } from "./RepresentationLab";
import "./representation-lab-physical.css";
import "./representation-lab-density.css";
import "./representation-lab-instrument-sync.css";
import "./representation-lab-drawers.css";
import "./representation-lab-wizard-global.css";

export const metadata: Metadata = {
  title: "Same World, Different Reasoner",
  description:
    "A guided Boundary First Labs introduction: keep one maze fixed, change the task, reasoning method, and information available to the model, then watch the result.",
};

export default function RepresentationLabPage() {
  return (
    <div className="representation-lab-physical-shell" data-bfux-skin="physical" data-section-theme="research">
      <RepresentationLab />
    </div>
  );
}
