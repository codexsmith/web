import type { Metadata } from "next";
import { CodexwareIntroductionPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Codexware",
  description: "A developing computational platform from Boundary First Labs. Institutional tools in individual hands; Civic is its first intended application.",
  alternates: { canonical: "/codexware" },
};

export default function Page() {
  return <CodexwareIntroductionPage />;
}
