import { buildInquiryHref } from "@/lib/inquiry";

export type OutreachProjection = {
  id: string;
  audience: string;
  headline: string;
  summary: string;
  proofPoints: string[];
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  boundary: string;
};

export const outreachProjections: OutreachProjection[] = [
  {
    id: "software-leader",
    audience: "Software and systems leaders",
    headline: "Make the actual system legible before another change compounds the problem.",
    summary:
      "Boundary First helps teams map the system they really have, name what must remain true, expose hidden ownership and failure paths, and define a repairable path forward.",
    proofPoints: [
      "Software-first practitioner path",
      "Boundary First Systems Audit",
      "Stable Work records and evidence boundaries",
    ],
    primaryAction: {
      label: "Start with software",
      href: "/software",
    },
    secondaryAction: {
      label: "Inquire about a system",
      href: buildInquiryHref({
        intent: "work",
        topic: "software or systems problem",
        source: "/outreach/software-leader",
      }),
    },
    boundary:
      "This projection describes the current public practice and portfolio. It is not a claim of universal applicability or certification authority.",
  },
  {
    id: "researcher",
    audience: "Researchers and technical readers",
    headline: "Inspect the mechanics, evidence boundaries, and formal objects beneath the practice.",
    summary:
      "The research path separates method, evidence, research architecture, and formal theory so readers can inspect each layer without treating proximity as proof.",
    proofPoints: [
      "Evidence and claim ceilings",
      "Research architecture and Atlas",
      "Boundary Theory, Distinction Space, Formal Grammars, Representational Mechanics",
    ],
    primaryAction: {
      label: "Enter research",
      href: "/research",
    },
    secondaryAction: {
      label: "Inspect evidence",
      href: "/evidence",
    },
    boundary:
      "Formal and research material carries its own maturity and evidence status. This route does not imply that all objects are settled or equivalently mature.",
  },
  {
    id: "institutional-partner",
    audience: "Institutional and public-interest partners",
    headline: "Make responsibility, consequence, and repair inspectable across organizational boundaries.",
    summary:
      "Boundary First Labs studies and builds representations for systems where responsibility crosses teams, institutions, policies, infrastructure, or public consequence.",
    proofPoints: [
      "Governance and stewardship doctrine",
      "Portfolio-to-capability promotion grammar",
      "Context-preserving collaboration and inquiry",
    ],
    primaryAction: {
      label: "Inspect the institute",
      href: "/about",
    },
    secondaryAction: {
      label: "Propose a collaboration",
      href: buildInquiryHref({
        intent: "collaboration",
        topic: "institutional or public-interest collaboration",
        source: "/outreach/institutional-partner",
      }),
    },
    boundary:
      "Civic and institutional analysis does not create legal authority, public office, regulatory standing, or an operating public program unless explicitly established elsewhere.",
  },
  {
    id: "critic-reviewer",
    audience: "Reviewers, critics, and evaluators",
    headline: "You do not need to trust the claim. Inspect the record and its limits.",
    summary:
      "BFL separates standing, provenance, claim ceilings, operating evidence, governance, and open institutional gaps so criticism can land on something durable.",
    proofPoints: [
      "Public trust register",
      "Evidence status and claim ceilings",
      "Governance, criticism, correction, and repair commitments",
    ],
    primaryAction: {
      label: "Open trust register",
      href: "/trust",
    },
    secondaryAction: {
      label: "Inspect work index",
      href: "/work/index",
    },
    boundary:
      "Inspectability is an institutional commitment, not a guarantee that every published object is correct, complete, or externally validated.",
  },
];

export function getOutreachProjection(id: string): OutreachProjection | undefined {
  return outreachProjections.find((projection) => projection.id === id);
}
