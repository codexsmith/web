import type { ContentNode as BaseContentNode, GraphEdge } from "@/lib/content";
import type { PublicationMetadata } from "@/lib/publication-types";

export type PersistencePublicationNode = BaseContentNode & {
  publication?: PublicationMetadata;
};

const publication: PublicationMetadata = {
  stage: "draft",
  label: "Bounded research preview · mixed evidence",
  documentClass: "Philosophy-of-science research preview",
  version: "v0.1",
  claimMaturity: "partial-structural-reframing",
  audience: "science / mathematics / philosophy of science",
  nextGate:
    "Freeze comparative cases and transformation families, test against nearest alternatives, preserve counterexamples, and obtain external domain review.",
  sourceRef: "src/content/artifacts/persistence-mathematical-effectiveness.md",
};

export const persistencePublicationNodes: PersistencePublicationNode[] = [
  {
    id: "pub-persistence-mathematical-effectiveness",
    label: "Why Mathematics Works So Well",
    shortLabel: "Mathematical Effectiveness",
    path: "publications/research/persistence-mathematical-effectiveness",
    parentId: "publication-research",
    kind: "document",
    eyebrow: "Bounded research preview",
    summary:
      "A hypothesis testing whether part of mathematics' effectiveness in physics can be explained by structures that remain recoverable across declared transformations, scales, resolutions, and observer interfaces.",
    body: [
      "The Persistence Thesis proposes a partial structural reframing of Wigner's effectiveness puzzle: physical inquiry may preferentially stabilize invariant, covariant, robust, universal, or recoverable structure because those relations remain usable across transformations that inquiry actually performs.",
      "The current evidence is mixed and bounded. Stability is explicitly not sufficient for truth, and neighboring results from renormalization-group theory, persistent homology, and observer-record formalisms are treated as comparison points rather than validation of the generic hypothesis.",
    ],
    publication,
    links: [
      {
        label: "Research",
        href: "/research",
        eyebrow: "Underlying research context",
        summary:
          "Explore the wider research program while keeping publication maturity separate from scientific validation.",
      },
    ],
    inspection: [
      {
        id: "pub-persistence-mathematical-effectiveness-publication-state",
        label: "Publication development record",
        eyebrow: publication.label,
        summary:
          "This record describes manuscript/publication maturity only. It does not silently promote the evidence or validation standing of the underlying hypothesis.",
        bullets: [
          `Document class: ${publication.documentClass}.`,
          `Claim maturity: ${publication.claimMaturity}.`,
          `Audience: ${publication.audience}.`,
          `Version: ${publication.version}.`,
          `Next gate: ${publication.nextGate}`,
          `Source: ${publication.sourceRef}.`,
        ],
        sourceRef: publication.sourceRef,
      },
      {
        id: "pub-persistence-mathematical-effectiveness-claim-boundary",
        label: "What the current result does not establish",
        eyebrow: "Claim firewall",
        summary:
          "The public artifact is a partial structural reframing with explicit negative cases, not a solution to Wigner's puzzle or a universal persistence theorem.",
        bullets: [
          "Persistence is not sufficient for truth, ontology, or complete reconstruction.",
          "Renormalization-group universality and persistent homology are neighboring formal results, not validation of Boundary Theory.",
          "Deterministic benchmark success validates internal distinctions, not the overarching philosophical thesis.",
          "Particularity, novel applicability, extraordinary precision, surplus structure, and representation choice remain open parts of Wigner's puzzle.",
        ],
        sourceRef: publication.sourceRef,
      },
    ],
  },
];

export const persistencePublicationEdges: GraphEdge[] = [];
