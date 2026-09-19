import type { Metadata } from "next";
import { InstitutionalHomePage } from "@/components/institutional/InstitutionalHomePage";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Boundary First Labs is an applied research laboratory building inspectable research machinery, products, projects, and public-interest systems work.",
  alternates: { canonical: "/v3" },
};

export default function V3Page() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boundary First Labs",
    url: "https://boundaryfirstlabs.com/v3",
    description:
      "An applied research laboratory building inspectable research machinery, products, projects, and public-interest systems work.",
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
