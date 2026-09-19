export const aiGovernanceDoctrine = [
  {
    code: "01",
    key: "forge",
    verb: "Forge",
    title: "Use AI aggressively where it expands human capability.",
    description:
      "Draft, search, compare, translate, prototype, inspect, program, organize, challenge, and transform work without silently transferring consequential authority.",
    boundary:
      "Assistance does not itself create authority, and automation does not make responsibility disappear.",
  },
  {
    code: "02",
    key: "certify",
    verb: "Certify",
    title: "Declare the boundary when AI materially acts.",
    description:
      "When an AI-enabled system can change another person's meaningful options, require explicit authority, protected invariants, provenance, failure modes, contestability, repair, monitoring, and revocation.",
    boundary:
      "A certificate is a bounded deployment claim—not proof of permanent safety, legality, fairness, conformity, or social desirability.",
  },
  {
    code: "03",
    key: "forbid",
    verb: "Forbid",
    title: "Do not automate domination merely because it is possible.",
    description:
      "Some delegated powers deserve restriction or prohibition where coercion, deception, destructive autonomy, irreversible agency loss, or responsibility laundering cannot be repaired by better monitoring.",
    boundary:
      "Technical possibility does not create legitimate authority.",
  },
] as const;

export const governanceDistinctions = [
  {
    label: "Capability",
    question: "What can the system do?",
    note: "A capability can exist without being reachable, permitted, or deployed.",
  },
  {
    label: "Agency",
    question: "What can the deployed system cause to happen?",
    note: "Agency depends on tools, permissions, memory, interfaces, infrastructure, and workflow position—not model weights alone.",
  },
  {
    label: "Authority",
    question: "What is it permitted to cause, by whom, where, and under what conditions?",
    note: "Operational access and legitimate delegated authority are not the same thing.",
  },
  {
    label: "Accountability",
    question: "Who answers when the consequence is wrong or the boundary fails?",
    note: "Responsibility cannot terminate in “the system did it.”",
  },
] as const;

export const consequenceChain = [
  "Model / agent output",
  "Recommendation or decision",
  "Authorization",
  "Action",
  "Affected party",
  "Consequence",
  "Accountable owner",
  "Contest / remedy / repair",
] as const;

export const certificateQuestions = [
  "What system is acting?",
  "On whose authority?",
  "In what domain?",
  "Who can it affect?",
  "What actions may it take?",
  "What actions are prohibited?",
  "Which invariants must it preserve?",
  "What evidence supports deployment?",
  "What failure modes are known?",
  "What provenance is retained?",
  "How can an affected party understand or challenge a result?",
  "What remedy or rollback exists?",
  "Who is accountable for the consequence?",
  "When is authority suspended or revoked?",
] as const;

export const reviewInstruments = [
  {
    title: "Agency Audit",
    description:
      "Map who gains and loses meaningful action space, through which mechanism, against which success metric, with what accountability.",
  },
  {
    title: "Agentic Boundary Audit",
    description:
      "Inspect the action envelope, tool permissions, memory boundary, escalation boundary, human override, rollback, and external-system access.",
  },
  {
    title: "Agentic Closure Certification Readiness Review",
    description:
      "A non-legal readiness artifact examining declared authority, protected invariants, evidence, known failure modes, contestability, provenance, consequence closure, and revocation conditions.",
  },
  {
    title: "AI Governance Board Memo",
    description:
      "An executive-readable map of system boundary, authority, material risks, consequence chains, open defects, and proposed controls.",
  },
  {
    title: "Deployment Invariant Declaration",
    description:
      "A concise statement of what a deployment must preserve even while optimizing local objectives.",
  },
  {
    title: "Contestability + Repair Review",
    description:
      "Inspect how affected parties can understand, correct, challenge, reverse, escalate, or otherwise obtain remedy when an automated process is wrong.",
  },
] as const;

export const selfGovernanceAllowed = [
  "Propose",
  "Transform",
  "Search and compare",
  "Draft and implement bounded work",
  "Expose defects",
] as const;

export const selfGovernanceWithheld = [
  "Create scientific truth",
  "Promote claims by itself",
  "Acquire publication authority",
  "Erase provenance requirements",
  "Absorb responsibility for consequential deployment",
] as const;

export const claimFirewall = [
  "BFL has not solved AI alignment globally.",
  "Every AI system does not require the same governance burden.",
  "A governance review does not prove a model safe.",
  "BFL does not currently provide statutory or legally binding certification.",
  "The refusal / Treaty layer is public doctrine, not enacted law.",
  "Human review alone does not create accountability.",
  "Transparency alone does not repair a defective deployment.",
  "Logging alone does not make a system contestable.",
  "A well-governed AI system is not automatically socially desirable.",
] as const;

export const governanceReviewComplements = [
  "Domain-specific safety engineering",
  "Cybersecurity",
  "Legal counsel",
  "Regulatory compliance",
  "Privacy review",
  "Model evaluation",
  "Red teaming",
  "Independent audit / conformity assessment",
] as const;
