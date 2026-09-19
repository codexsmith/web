import type { Metadata } from "next";
import { InstitutionalProductsPage } from "@/components/institutional/InstitutionalProductsPage";

export const metadata: Metadata = {
  title: "Products · Boundary First Labs",
  description: "Products and product-shaped work being developed at Boundary First Labs.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return <InstitutionalProductsPage />;
}
