import type { Metadata } from "next";
import { InstitutionalHomePage } from "@/components/institutional/InstitutionalHomePage";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Boundary First Labs is an applied systems laboratory for scientific software modeling, executable representation, research machinery, products, and public-interest systems work.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boundary First Labs",
    url: "https://boundaryfirstlabs.com",
    description:
      "An applied systems laboratory for scientific software modeling, executable representation, inspectable research machinery, products, and public-interest work.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <InstitutionalHomePage />
    </>
  );
}
