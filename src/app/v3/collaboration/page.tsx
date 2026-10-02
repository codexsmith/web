import type { Metadata } from "next";
import { InstitutionalCollaborationPage } from "@/components/institutional/InstitutionalCollaborationPage";

export const metadata: Metadata = {
  title: "Collaboration · Boundary First Labs",
  description:
    "Ways to work with Boundary First Labs through expert review, pilots, workshops, co-development, funding, distribution, research collaboration, or stewardship.",
  alternates: { canonical: "/collaboration" },
};

export default function Page() {
  return <InstitutionalCollaborationPage />;
}
