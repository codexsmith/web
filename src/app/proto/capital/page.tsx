import type { Metadata } from "next";
import { CapitalEconomicsFrame } from "@/components/bfux/CapitalEconomicsFrame";
import "./capital-frame.css";
import "./capital-frame-civics.css";
import "./capital-frame-boundary-voice.css";
import "./capital-frame-manifolds.css";
import "./capital-frame-connector-interfaces.css";
import "./capital-frame-canonical-connectors.css";
import "./capital-frame-side-interface-fit.css";
import "./capital-frame-end-interface-contact.css";

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
