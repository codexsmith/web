import type { Metadata } from "next";
import { AugustaScenarioProvider } from "@/components/product-landing/AugustaScenarioContext";
import { EconomicInstrumentationApparatus } from "@/components/product-landing/EconomicInstrumentationApparatus";
import styles from "./economic-apparatus.module.css";

export const metadata: Metadata = {
  title: "Augusta Economic Instrumentation",
  description:
    "A Boundary First civilizational systems instrument for Augusta separating financial reference state, real state, maintenance state, closure state, temporal evidence frames, and explicit scenario transition contracts.",
};

export default function EconomicInstrumentationPage() {
  return (
    <AugustaScenarioProvider>
      <div className={styles.apparatus}>
        <EconomicInstrumentationApparatus />
      </div>
    </AugustaScenarioProvider>
  );
}
