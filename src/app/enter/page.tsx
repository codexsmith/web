import type { Metadata } from "next";
import { HomeEntryExperience } from "@/components/home-entry-experience";

export const metadata: Metadata = {
  title: "Enter the Lab",
  description: "An optional visual threshold into Boundary First Labs.",
  alternates: { canonical: "/" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnterTheLabPage() {
  return <HomeEntryExperience />;
}
