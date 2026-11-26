import type { Metadata } from "next";
import { PublicInstrumentCollection } from "@/components/institutional/PublicInstrumentCollection";
export const metadata: Metadata = {
  title: "Instruments · Observatory",
  description: "Explore bounded, fictional teaching instruments and worked examples of representation, evidence, verification, repair and computational authority.",
  alternates: { canonical: "/observatory/instruments" },
};
export default function Page() { return <PublicInstrumentCollection />; }
