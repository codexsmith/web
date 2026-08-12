import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems Audit & Enterprise Practice",
  description:
    "Boundary First Systems Audit and scoped systems architecture and engineering for organizations operating under consequential constraints.",
  alternates: {
    canonical: "/business",
  },
};

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
