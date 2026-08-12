import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work, Products & Services",
  description:
    "Request a Boundary First Systems Audit, explore Boundary First Chess, and inspect BFL software, analysis, products, research programs, and evidence gates.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
