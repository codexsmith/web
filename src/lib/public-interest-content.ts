import type { ContentNode } from "@/lib/content";

type PublicInterestOverride = Pick<
  ContentNode,
  "eyebrow" | "summary" | "body" | "links" | "inspection"
>;

const publicInterestOverrides: Record<string, PublicInterestOverride> = {
  "public-interest": {
    eyebrow: "Public purpose, bounded by evidence",
    summary:
      "The part of Boundary First Labs concerned with what technical capacity is for: keeping consequential systems answerable to the people, conditions, communities, and futures that bear their effects.",
    body: [
      "Public Interest is not a charitable layer attached to otherwise neutral technical work. It is where the lab states which consequences it believes engineering, research, and institutional design should be able to see, and where current projects are separated from principles and future aspirations so intent never masquerades as delivery.",
    ],
  },
  "public-mission": {
    eyebrow: "Why the technical work matters",
    summary:
      "The systems that govern people's possibilities should remain answerable to the people, conditions, relationships, and futures that bear their consequences.",
    body: [
      "Civilization acts through representations. Laws, accounting systems, institutions, businesses, software, and AI all select what will count, encode those selections into action, and distribute consequence across people, organizations, places, and time.",
      "Abstraction is necessary. The failure is abstraction without return: a representation gains power over reality while losing a usable path for evidence, affected people, omitted conditions, or accumulated defects to change the model.",
      "Boundary First Labs therefore treats public-interest engineering as a problem of consequence literacy. Who is represented? Who bears the result? Where did authority come from? What was omitted? Can the affected state be understood, contested, reversed, maintained, or repaired?",
      "The goal is not to make every institution maximally powerful or every process maximally efficient. It is to increase useful capability while keeping that capability coupled to responsibility, standing, evidence, maintenance, and repair.",
    ],
    links: [
      {
        label: "Inspect the Agency & Representation Audit",
        href: "/agency-audit",
        eyebrow: "Public-interest instrument",
        summary: "A bounded audit for authority, representation, consequence, contestability, and repair.",
      },
      {
        label: "Inspect Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Software research",
        summary: "Testing, observability, provenance, permissions, auditability, and lifecycle responsibility inside one executable system boundary.",
      },
    ],
    inspection: [
      {
        id: "public-mission-consequence-surfaces",
        label: "Ten consequence surfaces",
        eyebrow: "Where the mission becomes concrete",
        summary:
          "The retained public-mission document names ten recurring places where incomplete representation becomes humanly visible.",
        bullets: [
          "Human agency and dignity: a person remains greater than the model used to classify or administer them.",
          "Standing, reasons, contestability, and recourse: consequential action should have a meaningful path back to explanation and repair.",
          "Accessibility and non-normative participation: real state spaces include different bodies, cognition, schedules, languages, resources, and recovery paths.",
          "Care, education, and capability transfer: useful service should increase practical agency where that can be done safely.",
          "Economic dignity, labor, and household continuity: hidden labor and exported burdens still belong to the mechanism.",
          "Public trust and bounded authority: unavoidable or essential power should remain explainable, limited, reviewable, and repairable.",
          "Humanly answerable software and AI: automation may scale action but cannot become the place where responsibility disappears.",
          "Public knowledge and educational access: difficult knowledge should become more legible without laundering uncertainty or provenance.",
          "Ecological and intergenerational continuity: present success should not silently consume the substrate and options required by future people.",
          "Maintenance, repair, and durable public capacity: construction is not closure when upkeep, incident response, adaptation, and replacement were omitted.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md",
      },
      {
        id: "public-mission-scales",
        label: "Three scales of help",
        eyebrow: "People, communities, institutions",
        summary:
          "The same mission should remain legible at different scales without pretending the lab can personally arbitrate every consequential dispute.",
        bullets: [
          "People: make systems easier to understand, navigate, contest, and repair.",
          "Practitioners and communities: preserve local distinctions, practical knowledge, and coordinated capacity that formal systems often omit.",
          "Institutions: represent real obligations and build enough authority, maintenance, evidence, and repair capacity that people do not have to compensate for institutional incapacity.",
          "Greater institutional capability is not treated as permission for greater unanswerable control.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md",
      },
      {
        id: "public-mission-political-posture",
        label: "Political without becoming partisan",
        eyebrow: "Structural posture",
        summary:
          "Public-interest work inevitably touches law, markets, infrastructure, institutions, and concentrated power, but the method does not convert structural analysis into party doctrine.",
        bullets: [
          "Identify who has authority and where that authority came from.",
          "Identify who is represented and who bears consequence.",
          "Distinguish private power from public obligation.",
          "Preserve meaningful alternatives, voice, exit, review, and recourse where the domain permits them.",
          "Keep responsibility coupled to practical capacity.",
          "Require policy or legal proposals to carry their own evidence, jurisdiction, objections, and implementation conditions.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md",
      },
    ],
  },
  "public-principles": {
    eyebrow: "Operating constraints on public-purpose work",
    summary:
      "Public-interest intent is not enough. The lab constrains how it builds, publishes, collaborates, scales, exercises authority, and represents people who bear the consequences.",
    body: [
      "The public-interest principles are engineering constraints rather than decorative values. They ask whether the lab's own representations, products, collaborations, and institutional behavior remain answerable to the same standards it applies elsewhere.",
      "The central test is whether a system gains local capability by exporting its defect into someone else's body, time, household, institution, environment, or future. If it does, the representation is not complete merely because the local dashboard closes.",
      "Boundary First Labs is strongly pro-progress. The constraint is that capability should strengthen, rather than silently consume, the human, material, institutional, and ecological conditions that future capability depends upon.",
    ],
    inspection: [
      {
        id: "public-principles-commitments",
        label: "Compact public commitments",
        eyebrow: "Ethos made operational",
        summary:
          "The retained ethos converts the lab's values into a set of inspectable commitments.",
        bullets: [
          "Keep power coupled to consequence.",
          "Treat people as greater than their profiles, classifications, or local system roles.",
          "Seek expertise without confusing authority for truth.",
          "Increase agency without disguising abandonment as empowerment.",
          "Design for non-normative states, degraded conditions, failure, and return paths rather than only the happy path.",
          "Make responsibility land where visibility, authority, evidence, resources, and repair capacity can meet.",
          "Treat maintenance and repair as first-class infrastructure.",
          "Do not hide human labor that is compensating for a system defect.",
          "Prefer capacity before expansion and stewardship before possession.",
          "Remain willing to expose, correct, retire, or repair the lab's own claims and systems.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md",
      },
      {
        id: "public-principles-human-test",
        label: "The human test",
        eyebrow: "Engineering acceptance criteria",
        summary:
          "Efficiency and technical correctness are insufficient if the system cannot represent the humans and consequences it acts upon.",
        bullets: [
          "Can the system recognize the people and states it materially acts upon?",
          "Can it represent non-normative users and meaningful failure states?",
          "Can affected people understand what happened at the level appropriate to them?",
          "Can they reach someone or something with the practical capacity to respond?",
          "Can the system learn from defects rather than repeatedly exporting them?",
          "Does the intervention leave people with greater usable agency where appropriate?",
          "Does it preserve the conditions required for maintenance, future action, and lawful retirement?",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md",
      },
      {
        id: "public-principles-self-application",
        label: "The lab must pass its own tests",
        eyebrow: "Institutional self-application",
        summary:
          "Boundary First Labs cannot demand provenance, accessibility, contestability, maintenance, or bounded authority from others while treating itself as exempt.",
        bullets: [
          "Claim status and source boundaries should be visible where consequential.",
          "AI assistance must not be laundered into authority or independent evidence.",
          "Accessibility obligations apply to the lab's own interfaces and publications.",
          "Corrections, disputed records, and supersessions should have a legible path.",
          "Tools should not be released without a stewardship, maintenance, transfer, or retirement story appropriate to their consequence.",
          "Founder authority and institutional branding are not exemptions from criticism.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md",
      },
    ],
  },
  "augusta-civic": {
    eyebrow: "Planned civic observability project",
    summary:
      "A bounded public-interest direction for making Augusta-area civic and historical infrastructure more inspectable through source-grounded maps, timelines, datasets, relationship models, and public analysis.",
    body: [
      "The project begins from a practical premise: software can be the machinery behind a public artifact without the artifact itself needing to be a commercial software product. Data collection, normalization, provenance, mapping, comparison, and relationship modeling can produce a useful public dataset, map, timeline, report, or interactive analysis.",
      "The strongest historical standing is CityWatch, delivered inside Augusta-Richmond County IT. That work demonstrated a citizen-facing representation joining project, spending, infrastructure status, timeline, media, and geographic context. It is relevant experience, not evidence of a current municipal partnership.",
      "The modern project should begin smaller than 'map the city.' The appropriate first unit is one bounded civic or historical infrastructure question with inspectable sources, explicit uncertainty, a representation/consequence map, and one public artifact that can be corrected when better evidence arrives.",
      "Potential questions include how public spending and projects connect across place and time, how maintenance and replacement obligations become visible, how historic infrastructure decisions propagate into present conditions, and how public records can be made easier to inspect without overstating what the records prove.",
    ],
    links: [
      {
        label: "Inspect historical CityWatch work",
        href: "/products/shipped/citywatch",
        eyebrow: "Historical shipped work",
        summary: "Delivered civic-transparency software and the explicit boundary around current affiliation.",
      },
      {
        label: "Inspect the Need & Capacity Map concept",
        href: "/products/pipeline/need-capacity-map",
        eyebrow: "Related product direction",
        summary: "A planned representation for matching underused capacity, unmet need, constraints, and trusted organizations.",
      },
      {
        label: "Inspect Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Related software doctrine",
        summary: "Testing, observability, provenance, permissions, auditability, authority, and lifecycle responsibility in operational systems.",
      },
    ],
    inspection: [
      {
        id: "augusta-project-boundary",
        label: "Current project boundary",
        eyebrow: "Planned, not municipal engagement",
        summary:
          "The current claim is a Boundary First Labs project direction informed by prior civic delivery; it is not a statement that Augusta-Richmond County presently sponsors, endorses, funds, or participates in the work.",
        bullets: [
          "CityWatch is historical professional standing.",
          "The new civic-infrastructure work is a separate Boundary First Labs direction.",
          "Public records and independently available sources can support an initial bounded analysis without implying institutional sponsorship.",
          "Any future municipal relationship should be named only after it actually exists and its scope is clear.",
        ],
        sourceRef: "src/content/product-landing-pages/augusta-citywatch.json + v2 spine project definition",
      },
      {
        id: "augusta-first-artifact",
        label: "What a first public artifact should contain",
        eyebrow: "Smallest coherent civic unit",
        summary:
          "The first useful release should be narrow enough to verify, correct, and maintain rather than visually impressive but epistemically vague.",
        bullets: [
          "One clearly stated civic or historical question.",
          "A source register with provenance and retrieval dates where appropriate.",
          "Normalization rules that preserve important distinctions instead of silently merging unlike records.",
          "A map, timeline, dataset, relationship view, or analysis that answers the bounded question.",
          "Explicit unknowns, disputed records, and claim ceilings.",
          "A correction path so public evidence can improve the representation after release.",
        ],
        sourceRef: "v2 Public Interest project model",
      },
      {
        id: "augusta-citywatch-lineage",
        label: "What CityWatch contributes",
        eyebrow: "Historical implementation lineage",
        summary:
          "CityWatch is useful because it demonstrates prior delivery of the same general civic-legibility instinct without being retroactively relabeled as a Boundary First Labs engagement.",
        bullets: [
          "Reconciled multiple kinds of civic project and spending information into a citizen-facing representation.",
          "Combined temporal, financial, status, media, infrastructure, and geographic context.",
          "Shows prior ability to make public records operationally legible through software.",
          "Does not establish that the present civic project has municipal authorization, access, funding, or endorsement.",
        ],
        sourceRef: "src/content/product-landing-pages/augusta-citywatch.json",
      },
    ],
  },
  "public-aspirations": {
    eyebrow: "Future capacity, not current claim",
    summary:
      "Directions Boundary First Labs wants to become capable of addressing over time, kept explicitly separate from delivered work, current pilots, and committed projects.",
    body: [
      "Aspirations belong on the public site because they explain why the lab is building capacity, but they must remain typed as aspirations. They are not promises of current services, funded programs, institutional partnerships, or validated solutions.",
      "The common thread is durable public capability: representations that help people and institutions see consequence earlier, preserve useful distinctions, maintain what persists, contest defective classifications, and repair systems before accumulated failure becomes the only correction mechanism.",
      "Some aspirations may become products. Others may become public datasets, open tools, educational material, research programs, partnerships, policy proposals, maintained infrastructure, or work that the lab ultimately decides should be stewarded by someone else.",
    ],
    links: [
      {
        label: "Inspect the Need & Capacity Map",
        href: "/products/pipeline/need-capacity-map",
        eyebrow: "Candidate public-interest product",
        summary: "A bounded first wedge for representing unmet need, available capacity, constraints, and trusted institutions.",
      },
      {
        label: "Inspect Corpus Forge",
        href: "/corpus-forge",
        eyebrow: "Public-knowledge infrastructure",
        summary: "A current research-operations program concerned with provenance, contradiction, promotion, supersession, and repair.",
      },
    ],
    inspection: [
      {
        id: "public-aspirations-horizon",
        label: "Capability horizon",
        eyebrow: "Near, intermediate, long-term",
        summary:
          "Aspirations can be made more credible by showing the capacity that would need to exist before each class of work could be responsibly claimed.",
        bullets: [
          "Near-term: publish bounded methods, public explanations, open artifacts, civic analyses, teaching surfaces, and small pilot instruments with visible claim boundaries.",
          "Intermediate: maintain reusable public datasets and tools, run externally reviewed pilots, support stronger civic observability, and establish repeatable collaboration and stewardship mechanisms.",
          "Longer-term: contribute to public systems that make authority, maintenance, ecological and economic burden, institutional memory, AI consequence, and repair more operationally legible.",
          "At every horizon, a negative result or a decision not to scale remains an admissible outcome.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md + 06_BFL_ethos.md",
      },
      {
        id: "public-aspirations-boundary",
        label: "What aspirations do not claim",
        eyebrow: "Claim firewall",
        summary:
          "The future-facing facet is deliberately prevented from borrowing credibility from shipped software or mature research in unrelated domains.",
        bullets: [
          "No current partnership is implied merely because an institution or civic domain is named as a possible application area.",
          "No policy, legal, ecological, economic, or scientific proposal is treated as validated because it fits the Boundary First vocabulary.",
          "No future product is treated as available because its architecture or concept has been developed.",
          "No aspiration becomes an institutional commitment until ownership, capacity, evidence, maintenance, and consequence boundaries are explicit enough to carry it.",
        ],
        sourceRef: "Public Interest claim-discipline projection",
      },
    ],
  },
};

export function hydratePublicInterestNode(node: ContentNode): ContentNode {
  const override = publicInterestOverrides[node.id];
  return override ? { ...node, ...override } : node;
}
