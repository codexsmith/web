import type { Metadata } from "next";
import { CodexwareIntroductionPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Codexware",
  description: "Putting institutional computational tools into individual hands. Application vision in development.",
  alternates: { canonical: "/codexware" },
};

export default function Page() {
  return <CodexwareIntroductionPage />;
}
