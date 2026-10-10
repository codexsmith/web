import type { Metadata } from "next";
import { InstitutionalCollaborationPage } from "@/components/institutional/InstitutionalCollaborationPage";

export const metadata: Metadata = {
  title: "Work With Us · Boundary First Labs",
  description:
    "Hire Boundary First Labs for systems consulting, propose a research partnership, submit expert criticism, or support a defined project or research milestone.",
  alternates: { canonical: "/collaboration" },
};

export default function Page() {
  return <InstitutionalCollaborationPage />;
}
