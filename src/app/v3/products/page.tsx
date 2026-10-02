import type { Metadata } from "next";
import { InstitutionalProductsPage } from "@/components/institutional/InstitutionalProductsPage";

export const metadata: Metadata = {
  title: "Products · Boundary First Labs",
  description: "Books, software, research tools, engineering methods, and public testbeds from Boundary First Labs, with current state and unproven claims kept visible.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return <InstitutionalProductsPage />;
}
