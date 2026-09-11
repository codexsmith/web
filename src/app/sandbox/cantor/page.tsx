import type { Metadata } from "next";
import { CantorClosureLab } from "@/components/representational-labs/CantorClosureLab";
import { CANTOR_CLOSURE_LAB } from "@/components/representational-labs/lab-definitions";

export const metadata: Metadata = {
  title: `${CANTOR_CLOSURE_LAB.title} Lab | Boundary First Labs`,
  description: CANTOR_CLOSURE_LAB.description,
  robots: { index: false, follow: false },
};

export default function CantorClosureLabPage() {
  return <CantorClosureLab />;
}
