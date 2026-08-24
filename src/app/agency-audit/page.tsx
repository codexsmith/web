import { permanentRedirect } from "next/navigation";

export default function AgencyAuditAliasPage() {
  permanentRedirect(
    "/products/current/agency-representation-audit?detail=record:agency-representation-audit",
  );
}
