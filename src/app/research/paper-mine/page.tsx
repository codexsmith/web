import { redirect } from "next/navigation";
import { suspendedPublicationDestination } from "@/lib/site-publication";

// Intentionally disconnected from the retained catalog and graph machinery.
// The next public edition requires a separate editorial admission.
export default function PaperMinePage() {
  redirect(suspendedPublicationDestination);
}
