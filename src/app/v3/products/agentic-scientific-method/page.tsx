import type { Metadata } from "next";
import { AgenticScientificMethodExperience } from "@/components/institutional/products/AgenticScientificMethodExperience";

export const metadata: Metadata = {
  title: "Agentic Scientific Method · Boundary First Labs",
  description:
    "A structured research method for making questions, tests, evidence, criticism, revision, human responsibility, and durable research memory explicit.",
  alternates: { canonical: "/products/agentic-scientific-method" },
};

export default function Page() {
  return <AgenticScientificMethodExperience />;
}
