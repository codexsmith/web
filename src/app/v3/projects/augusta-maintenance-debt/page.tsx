import type { Metadata } from "next";
import { InstitutionalAugustaMaintenanceDebtPage } from "@/components/institutional/InstitutionalAugustaMaintenanceDebtPage";

export const metadata: Metadata = {
  title: "Augusta Maintenance Debt Civic Case · Boundary First Labs",
  description:
    "A public-record study of Augusta–Richmond County infrastructure obligations: what is documented, what appears overdue, what is funded, what remains uncertain, and what evidence is still missing.",
  alternates: { canonical: "/projects/augusta-maintenance-debt" },
};

export default function Page() {
  return <InstitutionalAugustaMaintenanceDebtPage />;
}
