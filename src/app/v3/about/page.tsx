import type { Metadata } from "next";
import { InstitutionalAboutPage } from "@/components/institutional/InstitutionalAboutPage";

export const metadata: Metadata = {
  title: "About · Boundary First Labs",
  description: "Boundary First Labs is a solo, technical-founder-led, AI-enabled applied systems laboratory and business engineered as a digital-first, executable institution.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <InstitutionalAboutPage />;
}
