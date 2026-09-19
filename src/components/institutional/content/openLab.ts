export const openLabSourceProjection = {
  repository: "codexsmith/boundary-first-labs",
  sourceRevision: "1dbd3f5b53e55c8feff5230836ce11dc928cba69",
  sourceDate: "2026-09-18",
  authorityCeiling:
    "Source-governed design semantics for public participation. These sources do not by themselves authorize collection, promise response capacity, or permit sensitive-material intake.",
  pageProjection: {
    path: "organized_library_curated/06_Website_Content/0602_Public_Projection/open_lab_participation_v3_v0_1.md",
    lifecycle: "candidate",
    institutionalStage: "design / backlog",
    humanReviewed: false,
  },
  privacyProtocol: {
    path: "organized_library_curated/999_Library/03_Domains/00_socio_technical_systems__cross_domain_program/08_bfl_participation_protocol__socio_technical_system/03_PRIVACY_DIGITAL_RIGHTS_AND_DISCLOSURE.md",
    rule: "Collect the distinction required for the operation, not the maximum information available.",
  },
  criticismProtocol: {
    path: "organized_library_curated/999_Library/03_Domains/03_engineered_systems__domain_family/01_software_engineering__domain/01_boundary_first_ux__product/operational/governed_criticism_and_defect_intake.md",
    authorityStatus: "working_operational_protocol",
  },
} as const;

export const OPEN_LAB_INTAKE_SCHEMA = "bfl.open-lab-intake.v1";

export type OpenLabRuntimeGate = {
  id: string;
  label: string;
  ready: boolean;
  detail: string;
};

export type OpenLabRuntimeConfig = {
  enabled: boolean;
  schema: typeof OPEN_LAB_INTAKE_SCHEMA;
  policyVersion: string | null;
  retentionDays: number | null;
  sourceRevision: string;
  gates: readonly OpenLabRuntimeGate[];
};

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


export type OpenLabSubmissionType = (typeof participationContracts)[number]["type"];

export function isOpenLabSubmissionType(value: string): value is OpenLabSubmissionType {
  return participationContracts.some((contract) => contract.type === value);
}

export const openLabReviewStates = [
  {
    state: "received",
    meaning: "The governed receiver accepted the versioned intake envelope. No substantive judgment has been made.",
  },
  {
    state: "acknowledged",
    meaning: "A receipt or human acknowledgement has been issued when the contact mode permits it.",
  },
  {
    state: "triaged",
    meaning: "The submission has a declared route, owner, duplicate status, or bounded reason it cannot proceed.",
  },
  {
    state: "under_review",
    meaning: "Evidence, reproduction, fit, authority, safety, or stewardship questions are being examined.",
  },
  {
    state: "dispositioned",
    meaning: "The Lab has declared an outcome such as proceed, request evidence, refer, accept criticism, dispute with reasons, archive, or decline.",
  },
  {
    state: "closed",
    meaning: "Required downstream actions are resolved, routed, or explicitly preserved as open. Closed does not mean disproven.",
  },
] as const;

export const openLabCollectionRules = [
  {
    label: "PRIVATE REVIEW FIRST",
    description:
      "Initial submission authorizes bounded internal review and routing only. Publication permission is not granted by intake.",
  },
  {
    label: "NO FILE UPLOADS / NO SECRETS",
    description:
      "The public boundary accepts text and public links only. Credentials, private keys, protected personal data, confidential proprietary material, and other sensitive payloads stay out.",
  },
  {
    label: "PSEUDONYMOUS OR NO-REPLY IS ALLOWED",
    description:
      "A submitter may use a pseudonym and may decline a reply path. Epistemic force is not made dependent on prestige or legal identity.",
  },
  {
    label: "RETENTION MUST BE DECLARED",
    description:
      "The site does not enable submission unless a deployment declares a policy version and retention window alongside an authenticated receiver.",
  },
  {
    label: "NO AUTOMATIC PUBLICATION",
    description:
      "A public response request is not publication consent. Quotation, attribution, or publication requires a separate consent decision.",
  },
  {
    label: "ROUTING PRESERVES THE ORIGINAL",
    description:
      "Internal classification may add state, but it must not silently rewrite the submitter's original statement, evidence links, or requested outcome.",
  },
] as const;
