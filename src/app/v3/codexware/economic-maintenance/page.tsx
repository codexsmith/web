import type { Metadata } from "next";
import { CodexwareEconomicMaintenancePage } from "@/components/institutional/CodexwareEconomicMaintenancePage";

export const metadata: Metadata = {
  title: "Economic Maintenance · Codexware · Boundary First Labs",
  description: "Research questions about the cost of sustaining a life, material capability, value, maintenance, and verified repair that motivate Codexware's intended individual-directed tools.",
  alternates: { canonical: "/codexware/economic-maintenance" },
};

export default function Page() {
  return <CodexwareEconomicMaintenancePage />;
}
