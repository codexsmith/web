import type { Metadata } from "next";
import { PublicObservatoryExhibitPage } from "@/components/institutional/PublicObservatoryExhibitPage";

export const metadata: Metadata = {
  title: "Intellectual lineage \u00b7 Observatory",
  description: "Boundary First begins in the work of understanding and repairing systems. Its intellectual foundations are inherited from established disciplines; its research questions arise where their representations meet consequential practice.",
  alternates: { canonical: "/observatory/intellectual-lineage" },
};

export default function Page() {
  return <PublicObservatoryExhibitPage slug="observatory/intellectual-lineage" />;
}
