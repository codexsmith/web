import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Atlas",
  description:
    "Explore Boundary First Labs domains, their internal facets, and typed relations across work, evidence, lineage, governance, and collaboration.",
  alternates: {
    canonical: "/map",
  },
};

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
