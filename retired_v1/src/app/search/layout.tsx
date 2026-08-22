import type { Metadata } from "next";
import { GraphProvider } from "../context/GraphContext";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Boundary First Labs public domain records, publications, claims, and documents.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GraphProvider>{children}</GraphProvider>;
}
