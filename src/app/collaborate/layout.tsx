import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Explore bounded participation and collaboration pathways with explicit roles, authority, evidence, stewardship, and closure.",
  alternates: {
    canonical: "/collaborate",
  },
};

export default function CollaborateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
