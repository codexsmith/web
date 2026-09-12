import type { ContentNode, GraphEdge } from "@/lib/content";
import type { PublicationMetadata } from "@/lib/publication-types";

export type AiGovernancePublicationNode = ContentNode & {
  publication: PublicationMetadata;
};

export const aiGovernancePublicationNodes: AiGovernancePublicationNode[] = [
  {
    id: "pub-bounded-ai",
    label: "Bounded AI",
    path: "publications/essays/bounded-ai",
    parentId: "publication-essays",
    kind: "document",
    eyebrow: "Public AI governance doctrine · review draft",
    summary:
      "A public governance doctrine for distinguishing bounded AI assistance, consequential artificial agency, and uses that should cross a prohibition boundary rather than enter ordinary deployment.",
    body: [
      "Boundary First Labs proposes a three-region public map: Forge what helps; Certify what acts; Forbid what dominates. The purpose is not to place the same burden on every AI use, but to make the authority and consequence boundary easier to inspect.",
      "A model never acts in isolation. It acts through tools, permissions, data, infrastructure, interfaces, operators, incentives, and institutional authority. The governance question is therefore not only what a model can do, but what agency the deployed system can exercise, who authorized it, who bears the consequence, and whether affected people can inspect, contest, reverse, or repair the result.",
      "Forge covers bounded assistance that expands human capacity while responsibility remains traceable. Certificate names the stronger operating boundary required when an AI-enabled system can materially act on others. Prohibition names uses or capabilities that should be prohibited or exceptionally restricted rather than normalized as merely higher-risk deployments.",
      "This publication is a governance doctrine under review, not a completed regulatory framework, recognized certification program, legal instrument, or claim that Boundary First terminology replaces established AI risk management, assurance, safety, privacy, security, or sector-specific controls.",
    ],
    publication: {
      stage: "review",
      label: "Public AI governance doctrine · review draft",
      documentClass: "Public AI governance doctrine / synthesis essay",
      version: "v0.2 public projection",
      claimMaturity: "governance-doctrine-review",
      audience: "general / policy / technical",
      nextGate:
        "Editorial and AI-governance/legal nearest-practice review, audience testing, and worked deployment cases.",
      sourceRef: "src/content/artifacts/bounded-ai.md",
    },
    links: [
      {
        label: "No Consequence Without Representation",
        href: "/publications/methods/no-consequence-without-representation",
        eyebrow: "Executable governance diagnostic",
        summary:
          "A ten-question diagnostic for authorization, representation, consequence, contestability, responsibility, and repair.",
      },
      {
        label: "Agency & Representation Audit",
        href: "/products/current/agency-representation-audit",
        eyebrow: "Applied systems audit",
        summary:
          "A bounded professional audit for reconstructing authority, representation, consequence, contestability, and repair around one consequential process.",
      },
    ],
    inspection: [
      {
        id: "bounded-ai-three-regions",
        label: "Forge · Certificate · Prohibition",
        eyebrow: "Three governance regions",
        summary:
          "The representation separates ordinary assistance from consequential delegated agency and from uses that should cross a visible prohibition boundary.",
        bullets: [
          "Forge — bounded assistance that helps people think, make, learn, research, translate, create, inspect, or repair without silently acquiring authority over other people.",
          "Certificate — stronger declared authority, evidence, monitoring, contestability, accountability, remedy, and revocation when an AI-enabled system can materially act on others.",
          "Prohibition — a visible red line for uses or capabilities that should not become ordinary deployments simply because more monitoring or paperwork can be added.",
          "The same underlying model can occupy different governance positions depending on tools, permissions, institutional authority, affected parties, and consequence.",
        ],
        sourceRef: "src/content/artifacts/bounded-ai.md",
      },
      {
        id: "bounded-ai-control-claim",
        label: "Make control testable",
        eyebrow: "Operational control claim",
        summary:
          "A claim that humans remain in control should identify the mechanisms that make control observable and falsifiable.",
        bullets: [
          "Who may authorize the system, and in what domain?",
          "What may the system do, and which transitions must remain forbidden?",
          "What conditions must remain invariant throughout operation?",
          "What evidence shows the system remains inside its authorized region?",
          "Who can interrupt, override, constrain, suspend, or revoke authority?",
          "Where does responsibility land when the system acts?",
          "What happens when the boundary is crossed and harm must be reversed or repaired?",
        ],
        sourceRef: "src/content/artifacts/bounded-ai.md",
      },
      {
        id: "bounded-ai-claim-firewall",
        label: "What this publication does not claim",
        eyebrow: "Claim firewall",
        summary:
          "The public projection keeps the maturity boundary visible rather than presenting a review draft as settled policy or certification.",
        bullets: [
          "It is not a completed federal or international AI regulatory framework.",
          "It does not claim that a new legal treaty is necessarily required.",
          "It does not claim that certification proves safety, legality, fairness, or permanent validity.",
          "It does not claim that all AI deployments require certification.",
          "It does not claim that Boundary First invented AI risk management, assurance, impact assessment, conformity assessment, oversight, monitoring, or prohibited-use governance.",
          "It does not replace technical safety, privacy, security, robustness, law, or domain-specific controls.",
        ],
        sourceRef: "src/content/artifacts/bounded-ai.md",
      },
    ],
  },
  {
    id: "pub-no-consequence-without-representation",
    label: "No Consequence Without Representation",
    shortLabel: "No Consequence",
    path: "publications/methods/no-consequence-without-representation",
    parentId: "publication-methods",
    kind: "document",
    eyebrow: "Candidate public-interest systems diagnostic",
    summary:
      "A ten-question diagnostic for making authority, representation, decision, consequence, contestability, responsibility, and repair inspectable in one consequential process.",
    body: [
      "Consequential institutions and automated systems often distribute authority, evidence, decision, consequence, and repair across separate actors and interfaces. A process can appear complete while the affected person is represented incompletely, responsibility is displaced, appeal exists only formally, or reversal fails to repair the consequence already produced.",
      "No Consequence Without Representation is a bounded diagnostic rather than a universal score. It asks collaborators to reconstruct one real decision path closely enough to identify what is represented, what is omitted, how authority moves, where consequence lands, whether contest is meaningful, and who owns repair.",
      "The diagnostic is designed to be criticized against real cases. It does not itself establish legal sufficiency, algorithmic fairness, safety, compliance, or institutional endorsement.",
    ],
    publication: {
      stage: "draft",
      label: "Candidate diagnostic · external criticism requested",
      documentClass: "Public-interest systems diagnostic / review instrument",
      version: "v0.1",
      claimMaturity: "candidate-diagnostic-v0.1",
      audience: "policy / legal / public-interest technology / institutional operations",
      nextGate:
        "Legal critique, affected-party or community critique, and one bounded case test with documented findings and repair limits.",
      sourceRef: "src/content/artifacts/no-consequence-without-representation.md",
    },
    links: [
      {
        label: "Bounded AI",
        href: "/publications/essays/bounded-ai",
        eyebrow: "AI governance doctrine",
        summary:
          "The broader Forge / Certificate / Prohibition representation for distinguishing assistance, consequential artificial agency, and prohibition boundaries.",
      },
      {
        label: "Agency & Representation Audit",
        href: "/products/current/agency-representation-audit",
        eyebrow: "Applied audit service",
        summary:
          "The professional engagement model that extends the diagnostic into a bounded systems audit with explicit deliverables and scope controls.",
      },
    ],
    inspection: [
      {
        id: "no-consequence-ten-questions",
        label: "The ten questions",
        eyebrow: "Diagnostic sequence",
        summary:
          "The instrument is intentionally small enough to apply to one bounded process without pretending to certify an institution as a whole.",
        bullets: [
          "Who authorized the system or decision?",
          "Who and what does the system represent?",
          "Which affected people or conditions are omitted?",
          "What evidence and transformations produce the decision?",
          "What distinctions and invariants must the process preserve?",
          "What notice and reasons are provided?",
          "Can an affected person meaningfully interrupt, contest, or correct the process?",
          "Where does responsibility land?",
          "Can the decision be reversed, and can resulting harm actually be repaired?",
          "Which claims are technical findings, legal findings, lived-experience findings, or proposed reforms?",
        ],
        sourceRef: "src/content/artifacts/no-consequence-without-representation.md",
      },
      {
        id: "no-consequence-boundary",
        label: "Use and authority boundary",
        eyebrow: "What the diagnostic is for",
        summary:
          "The diagnostic contributes a systems representation while preserving the authority of legal, technical, operational, and affected-party experts.",
        bullets: [
          "Use it on a bounded consequential process or decision path, not as an institution-wide moral score.",
          "Qualified legal collaborators retain authority over legal interpretation, jurisdiction, and legal sufficiency.",
          "Affected people and community representatives retain authority over lived conditions, omitted burdens, accessibility, and whether repair works in practice.",
          "Participation or criticism does not imply endorsement of Boundary First Labs or the diagnostic.",
          "A finding should remain traceable to an observed artifact, declared rule, executable behavior, stakeholder account, or clearly labeled inference.",
        ],
        sourceRef: "src/content/artifacts/no-consequence-without-representation.md",
      },
    ],
  },
];

export const aiGovernancePublicationEdges: GraphEdge[] = [
  {
    from: "pub-bounded-ai",
    to: "pub-no-consequence-without-representation",
    type: "applies-to",
    label: "operationalized by diagnostic",
  },
  {
    from: "pub-bounded-ai",
    to: "agency-audit",
    type: "applies-to",
    label: "applied through audit",
  },
  {
    from: "pub-no-consequence-without-representation",
    to: "agency-audit",
    type: "documents",
    label: "provides diagnostic basis for",
  },
];
