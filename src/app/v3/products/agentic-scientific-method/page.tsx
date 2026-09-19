import type { Metadata } from "next";
import { AgenticScientificMethodExperience } from "@/components/institutional/products/AgenticScientificMethodExperience";

export const metadata: Metadata = {
  title: "Agentic Scientific Method · Boundary First Labs",
  description:
    "An operational research protocol for making goals, boundaries, state spaces, action selection, evidence, criticism, repair, authority, and closure explicit.",
  alternates: { canonical: "/products/agentic-scientific-method" },
};

export default function Page() {
  return <AgenticScientificMethodExperience />;
}
