import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laboratory",
  description:
    "Boundary First Labs is an independent public-interest research and engineering laboratory for consequential systems.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
