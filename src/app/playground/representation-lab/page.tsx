import type { Metadata } from "next";
import { RepresentationLab } from "./RepresentationLab";

export const metadata: Metadata = {
  title: "Same World, Different Reasoner",
  description:
    "An interactive Boundary First Labs instrument showing how the same maze becomes a different computational object under search, adversarial, stochastic, and Bayesian representations.",
};

export default function RepresentationLabPage() {
  return <RepresentationLab />;
}
