export const fundingConversionStages = [
  {
    title: "Existing capacity",
    description:
      "Research corpus, methods, software, prototypes, manuscripts, product candidates, and institutional machinery already exist. Funding does not begin the work at zero.",
  },
  {
    title: "Protected conversion",
    description:
      "Resources buy concentrated time, external review, specialist support, bounded experiments, publication work, product preparation, and the operational capacity to finish what is already latent.",
  },
  {
    title: "Inspectable artifacts",
    description:
      "Private accumulation becomes public code, research packets, papers, demonstrations, pilots, products, datasets, methods, or documented procedures that other people can inspect.",
  },
  {
    title: "External contact",
    description:
      "Reviewers, users, customers, collaborators, datasets, and operating environments create evidence that can disagree with the Lab and force revision.",
  },
  {
    title: "Renewed capacity",
    description:
      "Useful results can generate earned revenue, grants, sponsorship, membership, product income, stronger partnerships, or transfer to a better steward. Negative results narrow the program rather than disappearing.",
  },
] as const;

export const fundingOutputs = [
  "Reviewable public artifacts",
  "Independent criticism",
  "Bounded experiments and pilots",
  "Reusable research infrastructure",
  "Durable products and services",
  "More sustainable research operations",
] as const;

export const fundingChannels = [
  {
    name: "Founding sponsorship / patronage",
    purpose: "Buy concentrated runway for translation and institutionalization.",
    bestFor:
      "Public-facing artifacts, research packaging, publication infrastructure, product preparation, and a bounded conversion sprint.",
    boundary:
      "Support should be tied to visible outputs and closure events rather than open-ended belief in the entire research program.",
  },
  {
    name: "Grants / research philanthropy",
    purpose: "Finance public-good research, open infrastructure, review, and larger bounded programs.",
    bestFor:
      "Responsible technology, public-interest systems, open science, education, research infrastructure, and domain work with a mature reviewable object.",
    boundary:
      "A grant can make work admissible; it cannot raise the scientific claim ceiling of the result.",
  },
  {
    name: "Paid pilots / applied services",
    purpose: "Create earned support while testing the method against real institutional problems.",
    bestFor:
      "Bounded audits, advisory work, prototypes, workshops, systems analysis, integration, and partner-specific experiments.",
    boundary:
      "The engagement should produce a concrete outcome, evidence, or reusable capability rather than a vague consulting relationship.",
  },
  {
    name: "Open science / public campaigns",
    purpose: "Fund scoped public artifacts while making the work visible and inspectable.",
    bestFor:
      "Reproducible experiments, educational material, public diagnostic tools, open research infrastructure, and clearly declared studies.",
    boundary:
      "Public enthusiasm is demand evidence or participation; it is not scientific validation.",
  },
  {
    name: "Academic / institutional collaboration",
    purpose: "Bring domain criticism, data, facilities, expertise, review, and grant bridges into the work.",
    bestFor:
      "Specific claims, experiments, paper candidates, replication work, and programs that require authority or infrastructure BFL should not reproduce.",
    boundary:
      "Collaboration should test or extend a bounded object, not ask another institution to endorse the whole Lab.",
  },
  {
    name: "Products / memberships / product-specific capital",
    purpose: "Diversify recurring support around useful outputs that can stand on their own.",
    bestFor:
      "Products, software, publications, recurring public-lab work, and patient capital tied to a defined commercial object.",
    boundary:
      "Investment belongs to a specific scalable product or vehicle; the research program itself is not a substitute for a commercial object.",
  },
] as const;

export const fundingEvaluationQuestions = [
  "Is the problem real and consequential?",
  "Is the proposed work bounded enough to finish, fail, or revise?",
  "What already exists that makes the Lab prepared to do it?",
  "What evidence, artifact, or capability will the support produce?",
  "What would count as failure, revision, or successful closure?",
  "Who can inspect, criticize, reproduce, use, or reject the result?",
  "What useful value remains if the strongest hypothesis fails?",
] as const;

export const fundingBoundaries = [
  {
    label: "CAPITAL STATE != EPISTEMIC STATE",
    description:
      "A grant, sponsorship, purchase, contract, or resource commitment may unlock work. It may not directly make a mathematical, scientific, or engineering claim more true.",
  },
  {
    label: "SUPPORT != WHOLE-LAB ENDORSEMENT",
    description:
      "A funder can support one bounded program, artifact, pilot, or public-interest build while remaining agnostic about every other domain and stronger claim.",
  },
  {
    label: "NEGATIVE RESULTS CAN CLOSE WORK",
    description:
      "A well-run experiment that falsifies a path, exposes a boundary, or prevents wasted scale is a legitimate output when the evidence and reasoning remain inspectable.",
  },
  {
    label: "DEPENDENCY IS NOT THE GOAL",
    description:
      "Good support should leave behind more capability, evidence, infrastructure, revenue options, or better stewardship—not permanent dependence on the same source of capital.",
  },
] as const;
