import type { Metadata } from "next";
import { RepresentationLab } from "./RepresentationLab";
import "./representation-lab-physical.css";
import "./representation-lab-density.css";
import "./representation-lab-wizard-global.css";

export const metadata: Metadata = {
  title: "Same World, Different Reasoner",
  description:
    "An interactive Boundary First Labs introduction showing how the same maze changes when we change the question, reasoning method, and information available to the model.",
};

export default function RepresentationLabPage() {
  return (
    <div className="representation-lab-physical-shell" data-bfux-skin="physical" data-section-theme="research">
      <RepresentationLab />
    </div>
  );
}
