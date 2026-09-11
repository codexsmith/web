import type { Metadata } from "next";
import { CantorClosureLab } from "@/components/representational-labs/CantorClosureLab";

export const metadata: Metadata = {
  title: "Cantor Closure & Defect Lab | Boundary First Labs",
  description:
    "A finite interactive calibration fixture for inspecting diagonal construction, representational closure failure, and successor-stage admission.",
  robots: { index: false, follow: false },
};

export default function CantorClosureLabPage() {
  return <CantorClosureLab />;
}
