export const participationContracts = [
  {
    code: "01",
    title: "Inspect a System",
    subtitle: "Bring public machinery that deserves inspection.",
    type: "PUBLIC_INFRASTRUCTURE_NOMINATION",
    tone: "public",
    description:
      "Nominate a civic, institutional, service, data, software, or infrastructure system that is consequential but difficult to understand, reconcile, contest, or repair.",
    ordinaryLanguage: [
      "What system or process is involved?",
      "Where does it operate?",
      "Who depends on it?",
      "What seems to fail, disappear, contradict, or remain unexplained?",
      "What public evidence exists?",
      "Why does it matter?",
    ],
    possibleOutcomes:
      "Bounded systems analysis, public explainer, consequence map, data review, process reconstruction, interface audit, research packet, prototype, or referral.",
    boundary:
      "Submission would not guarantee investigation, publication, advocacy, representation, or remediation.",
  },
  {
    code: "02",
    title: "Critique Our Work",
    subtitle: "If we are wrong, show us where.",
    type: "BFL_CRITIQUE",
    tone: "critique",
    description:
      "Report factual, mathematical, logical, implementation, accessibility, evidence, prior-art, overclaim, or stewardship defects in the Lab's work or behavior.",
    ordinaryLanguage: [
      "What object are you criticizing?",
      "What exact claim, passage, behavior, or implementation is at issue?",
      "What kind of defect is it?",
      "What evidence or counterexample supports the criticism?",
      "What consequence follows if the criticism is right?",
      "Would you want a public response?",
    ],
    possibleOutcomes:
      "Triage, reproduction, acceptance, partial acceptance, reasoned dispute, incorporation, rejection with reasons, or unresolved status.",
    boundary:
      "Disagreement should be able to change institutional state when the evidence warrants it; it is not a customer-support performance.",
  },
  {
    code: "03",
    title: "Work With Us",
    subtitle: "Collaboration without absorption.",
    type: "COLLABORATION_INQUIRY",
    tone: "collaboration",
    description:
      "Explore a bounded relationship when another person or organization has expertise, infrastructure, lived knowledge, implementation capacity, data, distribution, capital, or stewardship the work genuinely requires.",
    ordinaryLanguage: [
      "What does your team know, own, operate, or steward?",
      "What problem or opportunity are you working on?",
      "What does BFL contribute that you do not already have?",
      "What do you contribute that BFL cannot or should not reproduce?",
      "What is the smallest useful relationship?",
      "What publication, confidentiality, attribution, or transfer boundary matters?",
    ],
    possibleOutcomes:
      "Expert review, replication, advisory participation, a small joint experiment, co-development, data/infrastructure access, pilot, publication, licensing, sponsorship, investment, distribution, or stewardship transfer.",
    boundary:
      "Collaboration is not sought merely to make the Lab look larger or more legitimate.",
  },
  {
    code: "04",
    title: "Bring Us Your Work",
    subtitle: "You do not need to know what category it belongs in first.",
    type: "WORK_HISTORY_GOALS_INTAKE",
    tone: "intake",
    description:
      "Bring completed work, unusual experience, technical artifacts, evidence, stubborn systems failures, cross-disciplinary projects, or a question you cannot yet formulate cleanly.",
    ordinaryLanguage: [
      "Who are you or what is the organization?",
      "What have you already done?",
      "What are you working on now?",
      "What evidence or artifacts exist?",
      "What repeatedly fails or remains illegible?",
      "What are you trying to make possible?",
      "What do you know is missing?",
      "What do you not yet know how to ask?",
    ],
    possibleOutcomes:
      "Archive, resource routing, clarifying questions, bounded critique, method scaffolding, technical review, introduction, small experiment, or formal collaboration.",
    boundary:
      "No intake would create an entitlement to funding, collaboration, endorsement, publication, or internal access.",
  },
] as const;

export const stewardshipGates = [
  "Privacy and retention",
  "Confidential-material boundaries",
  "Personally identifying information handling",
  "Moderation and abuse controls",
  "Consent before publication",
  "Contributor credit",
  "Conflict-of-interest disclosure",
  "Response-capacity language",
  "Security boundaries",
  "Reliance boundaries where relevant",
  "Public-record implications",
  "Internal access-control rules",
] as const;

export const sharedEnvelope = [
  "submission_id",
  "submission_type",
  "submitter_type",
  "contact mode",
  "public / private preference",
  "summary",
  "artifacts / links",
  "claimed facts and provenance",
  "requested outcome",
  "privacy / safety flags",
  "consent / publication permissions",
  "routing state",
  "response state",
] as const;

export const capabilityOutcomes = [
  "Clearer system models",
  "Improved internal documentation",
  "Reusable tools",
  "A better dataset",
  "A maintained process",
  "New analytical skill",
  "Research infrastructure",
  "A public artifact",
  "A relationship with a better long-term steward",
] as const;
