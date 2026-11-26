import type { Metadata } from "next";
import { DoctrineHomePage } from "@/components/institutional/DoctrineFrontDoor";

export const metadata: Metadata = {
  title: { absolute: "Boundary First Labs" },
  description:
    "Independent, founder-led research and engineering for public good: understanding, maintaining and improving consequential systems.",
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
      "Independent founder-led research and engineering for consequential systems, AI governance and constructive human agency.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <DoctrineHomePage />
    </>
  );
}
