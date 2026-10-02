import type { Metadata } from "next";
import { YouTubeKnowledgeExplorerExperience } from "@/components/institutional/products/YouTubeKnowledgeExplorerExperience";

export const metadata: Metadata = {
  title: "Projectr / YouTube Knowledge Explorer · Boundary First Labs",
  description:
    "Projectr is Boundary First Labs' knowledge-exploration software. Its current YouTube implementation turns long-form video into searchable, timestamped, persistent knowledge with direct paths back to the source.",
  alternates: { canonical: "/products/youtube-knowledge-explorer" },
};

export default function Page() {
  return <YouTubeKnowledgeExplorerExperience />;
}
