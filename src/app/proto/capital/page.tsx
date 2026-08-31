import type { Metadata } from "next";
import { CapitalEconomicsFrame } from "@/components/bfux/CapitalEconomicsFrame";
import "./capital-frame.css";

export const metadata: Metadata = {
  title: "Boundary First Labs · Capital Economics Prototype",
  description: "Prototype institutional economics and capital projection for Boundary First Labs.",
  robots: { index: false, follow: false },
};

export default function CapitalPrototypePage() {
  return (
    <main className="capital-prototype-page">
      <CapitalEconomicsFrame />
    </main>
  );
}
