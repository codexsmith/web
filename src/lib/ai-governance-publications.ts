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
      "The current refinement keeps four governance questions distinct: capability is what a system can do; agency is what the deployed system can cause to happen; authority is what it is permitted to cause under delegated conditions; accountability is who answers when the consequence is wrong or the boundary fails. The distinctions are offered as a working analytical representation, not a novelty claim.",
      "A model never acts in isolation. It acts through tools, permissions, data, persistence, infrastructure, interfaces, operators, incentives, and institutional authority. The same model can therefore occupy different governance positions depending on the system around it.",
      "Forge covers bounded assistance that expands human capacity while responsibility remains traceable. Certificate means a bounded, inspectable, revocable declaration of delegated authority—not a safety badge. Prohibition names uses or capabilities that should not be normalized as ordinary deployments merely because more monitoring or paperwork can be added.",
      "This publication is a governance doctrine under review, not a completed regulatory framework, recognized certification program, legal instrument, or claim that Boundary First terminology replaces established AI risk management, assurance, safety, privacy, security, law, or sector-specific controls.",
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
          "A ten-question diagnostic for authorization, executable representation, consequence, contestability, responsibility, and repair.",
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
        id: "bounded-ai-governance-layers",
        label: "Capability · Agency · Authority · Accountability",
        eyebrow: "Keep the governance questions distinct",
        summary:
          "The working decomposition separates what a system can do from what it can cause, what it is permitted to cause, and who answers for the consequence.",
        bullets: [
          "Capability — what can the system do?",
          "Agency — what can the deployed system cause to happen?",
          "Authority — what is it permitted to cause, by whom, where, and under what conditions?",
          "Accountability — who answers when the consequence is wrong or the boundary fails?",
          "A modest model can produce severe consequence when embedded in a high-authority workflow; a capable model can remain comparatively bounded when exercisable agency is narrow and revocable.",
          "This is an analytical representation under review, not a claim that BFL invented the distinctions or that existing governance frameworks lack equivalents.",
        ],
        sourceRef: "src/content/artifacts/bounded-ai.md",
      },
      {
        id: "bounded-ai-three-regions",
        label: "Forge · Certificate · Prohibition",
        eyebrow: "Three governance regions",
        summary:
          "The representation separates ordinary assistance from consequential delegated agency and from uses that should cross a visible prohibition boundary.",
        bullets: [
          "Forge — bounded assistance that helps people think, make, learn, research, translate, create, inspect, or repair without silently acquiring authority over other people.",
          "Certificate — a bounded, inspectable, revocable declaration of delegated authority with stronger evidence, monitoring, contestability, accountability, remedy, and revocation obligations.",
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
          "A claim that humans remain in control should identify mechanisms that make control observable and falsifiable.",
        bullets: [
          "Authorization — who may grant the system authority, and in what domain?",
          "Observability — what evidence shows the system remains inside its authorized region?",
          "Interruption and constraint — who can halt, override, or restrict operation?",
          "Suspension and revocation — when and how is delegated authority withdrawn?",
          "Responsibility and repair — who answers when the boundary fails, and what closes the consequence path?",
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
          "It does not claim that certification proves safety, legality, fairness, conformity, or permanent validity.",
          "It does not claim that all AI deployments require certification.",
          "It does not claim novelty for the capability / agency / authority / accountability distinction or for existing AI assurance and oversight practices.",
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
      "A ten-question diagnostic for making authority, executable representation, decision, consequence, contestability, responsibility, and repair inspectable in one consequential process.",
    body: [
      "Consequential institutions and automated systems often distribute authority, evidence, decision, consequence, and repair across separate actors and interfaces. A process can appear complete while the affected person is represented incompletely, responsibility is displaced, appeal exists only formally, or reversal fails to repair the consequence already produced.",
      "The diagnostic now makes one distinction explicit: possessing information about a person is not the same as using that information in the consequence-bearing path. The critical object may be the executable representation—the score, category, state, record, model output, interface condition, or derived value that the operating process actually recognizes and acts upon.",
      "No Consequence Without Representation is a bounded diagnostic rather than a universal score. It asks collaborators to reconstruct one real decision path closely enough to identify what is represented, what becomes executable, how authority moves, where consequence lands, whether contest is meaningful, and who owns repair.",
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
          "Which affected people, facts, distinctions, or conditions are omitted?",
          "What evidence and transformations produce the executable representation that actually drives the consequential action?",
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
        id: "no-consequence-executable-representation",
        label: "Find the executable representation",
        eyebrow: "Representation becomes consequential when the process can act on it",
        summary:
          "A rich upstream record can still produce an impoverished downstream decision when only a compressed score, state, category, or model output is executable.",
        bullets: [
          "Separate the person or world condition from the information available about it.",
          "Identify which information is admitted into the process and which distinctions are discarded.",
          "Identify the score, category, state, record, output, or interface condition that actually triggers or authorizes the transition.",
          "Trace the authorized transition from that executable representation to material consequence.",
          "Verify whether correction propagates through downstream records, decisions, and repair obligations.",
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
