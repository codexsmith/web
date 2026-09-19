export const productEvidence = [
  ["Attention", "Does anyone stop and care?"],
  ["Comprehension", "Do people understand the capability?"],
  ["Return use", "Do they choose to come back?"],
  ["Willingness to pay", "Will usefulness survive a price?"],
  ["Retention", "Does value persist after novelty?"],
  ["Criticism", "What breaks under real use?"],
] as const;

export const secondaryProducts = [
  {
    name: "Software Before Code",
    state: "SOURCE DEVELOPMENT",
    description:
      "Possible book, training product, field guide, templates, and educational tooling for software engineers.",
    next: "Package the source into a bounded offer and test whether practitioners want it.",
  },
  {
    name: "ToddlerTalk",
    state: "MVP RECONSTRUCTION",
    description:
      "A real consumer/family product family with an emotionally legible need.",
    next:
      "Reconstruct the product, then clear safety, privacy, security, and operating-model gates before commercialization.",
  },
  {
    name: "Modern Posture",
    state: "SOURCE DEVELOPMENT",
    description:
      "Potential public educational/product work with a higher health and evidence burden.",
    next:
      "Complete literature/clinical review, define safety boundaries, and test public-facing tools before aggressive commercialization.",
  },
] as const;

export const productPageQuestions = [
  "What is it?",
  "Who is it for?",
  "What can I do with it?",
  "What exists now?",
  "Can I buy, try, license, or partner around it yet?",
  "What evidence exists that it works for users?",
  "What remains unproven?",
  "What is the next product milestone?",
  "How can I give feedback or report a defect?",
  "What rights or stewardship boundary matters?",
  "Who maintains, repairs, transfers, or retires it?",
  "What data, attention, energy, infrastructure, or ecological burden does continued use impose?",
] as const;
