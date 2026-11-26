import type { Metadata } from "next";
import { PublicObservatoryExhibitPage } from "@/components/institutional/PublicObservatoryExhibitPage";

export const metadata: Metadata = {
  title: "Selected demonstrations \u00b7 Observatory",
  description: "A carefully chosen example can make a research question tangible without revealing unpublished research. The three examples here use elementary arithmetic and fictional records; each is independently checkable from the information shown.",
  alternates: { canonical: "/observatory/demonstrations" },
};

export default function Page() {
  return <PublicObservatoryExhibitPage slug="observatory/demonstrations" />;
}
