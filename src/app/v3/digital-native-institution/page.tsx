import type { Metadata } from "next";
import { DigitalNativeInstitutionPage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: "Digital-Native Institution · Boundary First Labs",
  description: "How a solo-operated, computationally leveraged research and engineering institution preserves knowledge, governs work and develops transferable capabilities.",
  alternates: { canonical: "/digital-native-institution" },
};

export default function Page() {
  return <DigitalNativeInstitutionPage />;
}
