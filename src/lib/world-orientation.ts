export type WorldOrientationDefinition = {
  boundary: string;
};

const worldOrientationByNodeId: Record<string, WorldOrientationDefinition> = {
  products: {
    boundary: "What the Lab builds, ships, pilots, or deliberately keeps at concept status.",
  },
  "public-interest": {
    boundary: "Where technical capacity is directed toward public legibility, accountability, and repair.",
  },
  publications: {
    boundary: "Where research and doctrine become versioned public artifacts with explicit maturity.",
  },
  about: {
    boundary: "Where institutional identity, method, provenance, and contact remain inspectable.",
  },
  research: {
    boundary: "Where claims, methods, mechanisms, and formal structure are developed and tested.",
  },

  "current-work": {
    boundary: "Active development and bounded pilot surfaces.",
  },
  "shipped-work": {
    boundary: "Delivered systems retained as historical evidence, not current affiliation.",
  },
  "planned-products": {
    boundary: "Developed or planned product concepts without a shipped claim.",
  },
  "tools-experiments": {
    boundary: "Small probes used to test representations before promotion.",
  },

  "public-mission": {
    boundary: "What public purpose the Lab is organized to serve.",
  },
  "public-principles": {
    boundary: "Commitments that constrain how public-purpose work is carried out.",
  },
  "augusta-civic": {
    boundary: "A bounded civic-infrastructure direction grounded in prior delivery and current evidence.",
  },
  "public-aspirations": {
    boundary: "Desired future capacity separated from present capability claims.",
  },

  software: {
    boundary: "Executable engineering doctrine: representation, architecture, interaction, verification, and governance.",
  },
  "applied-testbeds": {
    boundary: "Bounded domains used to test whether the method survives contact with specific reality.",
  },
  foundations: {
    boundary: "Primitive objects and distinctions used to reconstruct the deeper formal program.",
  },
  "formal-theory": {
    boundary: "Generalization layer where the strongest abstractions carry the highest proof burden.",
  },

  "publication-essays": {
    boundary: "Public-facing arguments and doctrine, with claim ceilings kept visible.",
  },
  "publication-methods": {
    boundary: "Operational guidance intended for bounded practitioner use.",
  },
  "publication-research": {
    boundary: "Formal and cross-domain manuscripts tied to unresolved validation or proof burdens.",
  },
  "publication-learning": {
    boundary: "Explanatory representations that increase access without flattening uncertainty.",
  },

  "the-lab": {
    boundary: "Institutional identity, scope, and present operating boundary.",
  },
  "how-we-work": {
    boundary: "The construction, evidence, review, and repair discipline used across the Lab.",
  },
  provenance: {
    boundary: "Where the work came from and which sources support its lineage.",
  },
  contact: {
    boundary: "The boundary for collaboration, pilots, engineering, and public-interest engagement.",
  },
};

export function getWorldOrientation(nodeId: string): WorldOrientationDefinition | undefined {
  return worldOrientationByNodeId[nodeId];
}
