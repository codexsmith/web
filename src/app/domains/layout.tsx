import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Domains",
  description:
    "Browse the Boundary First Labs content architecture from foundations through formal systems, research methods, engineering, institutions, and public interface.",
  alternates: {
    canonical: "/domains",
  },
};

export default function DomainsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
