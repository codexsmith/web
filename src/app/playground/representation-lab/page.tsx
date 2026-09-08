import type { Metadata } from "next";
import { RepresentationLab } from "./RepresentationLab";
import "./representation-lab-physical.css";

export const metadata: Metadata = {
  title: "Same World, Different Reasoner",
  description:
    "An interactive Boundary First Labs instrument showing how the same maze becomes a different computational object under search, adversarial, stochastic, and Bayesian representations.",
};

export default function RepresentationLabPage() {
  return (
    <div className="representation-lab-physical-shell" data-bfux-skin="physical" data-section-theme="research">
      <RepresentationLab />
    </div>
  );
}
