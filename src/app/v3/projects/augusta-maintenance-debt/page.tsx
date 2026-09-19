import type { Metadata } from "next";
import { InstitutionalAugustaMaintenanceDebtPage } from "@/components/institutional/InstitutionalAugustaMaintenanceDebtPage";

export const metadata: Metadata = {
  title: "Augusta Maintenance Debt Civic Case · Boundary First Labs",
  description:
    "A public-interest lifecycle-accounting case studying Augusta–Richmond County infrastructure obligations without manufacturing a false citywide maintenance-debt total.",
  alternates: { canonical: "/projects/augusta-maintenance-debt" },
};

export default function Page() {
  return <InstitutionalAugustaMaintenanceDebtPage />;
}
