import type { Metadata } from "next";
import { YouTubeKnowledgeExplorerExperience } from "@/components/institutional/products/YouTubeKnowledgeExplorerExperience";

export const metadata: Metadata = {
  title: "YouTube Knowledge Explorer · Boundary First Labs",
  description:
    "Turn long-form YouTube into searchable, timestamped, structured knowledge while preserving direct paths back to source evidence.",
  alternates: { canonical: "/products/youtube-knowledge-explorer" },
};

export default function Page() {
  return <YouTubeKnowledgeExplorerExperience />;
}
