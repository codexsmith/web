import type { Metadata } from "next";
import { InstitutionalOpenLabPage } from "@/components/institutional/InstitutionalOpenLabPage";

export const metadata: Metadata = {
  title: "Open Lab · Boundary First Labs",
  description:
    "Bring Boundary First Labs a critique, a consequential public system, a collaboration idea, or technical and research work that does not fit neatly elsewhere.",
  alternates: { canonical: "/open-lab" },
};

export default function Page() {
  return <InstitutionalOpenLabPage />;
}
