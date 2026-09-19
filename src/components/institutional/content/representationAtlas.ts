export type RepresentationMechanicId =
  | "frame"
  | "representation"
  | "transport"
  | "invariant"
  | "defect"
  | "repair";

export type RepresentationDomainId =
  | "social"
  | "knowledge"
  | "strategy"
  | "agency"
  | "physical";

export type RepresentationMechanicSlot = {
  id: RepresentationMechanicId;
  ordinal: string;
  label: string;
  formal: string;
  prompt: string;
};

export type RepresentationDomain = {
  id: RepresentationDomainId;
  label: string;
  shortLabel: string;
  domainClass: string;
  tone: "violet" | "blue" | "gold" | "teal" | "green";
  witnessProblem: string;
  witnessQuestion: string;
  contribution: string;
  mechanics: Record<RepresentationMechanicId, string>;
};

export const representationAtlasProjection = {
  status: "working comparative lens",
  sourceRevision: "3a8c984712ae1d87c7ec714876c356c20242cb15",
  authority:
    "The Atlas compares recurring analytical roles across witness domains. Similar placement does not establish formal equivalence, empirical validation, or transfer of authority between domains.",
  witnessDomainsSource:
    "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/01_Foundations/01_institutional_core__foundation/09_Witness_Domains.md",
  representationMechanicsSource:
    "https://github.com/codexsmith/boundary-first-labs/blob/3a8c984712ae1d87c7ec714876c356c20242cb15/organized_library_curated/999_Library/02_Core_Theory/02_engine_core__theory/03_work_packets/boundary_first_labs_representation_transport_breakthrough_v0_1/03_representation_mechanics_spine_patch_v0_1.md",
} as const;

export const representationMechanicSlots: readonly RepresentationMechanicSlot[] = [
  {
    id: "frame",
    ordinal: "01",
    label: "Frame",
    formal: "Context / frame",
    prompt: "What fixes the coordinates, resolution, comparison rules, and consequential boundary?",
  },
  {
    id: "representation",
    ordinal: "02",
    label: "Representation",
    formal: "Actionable representation",
    prompt: "What structure is made available for reasoning or action?",
  },
  {
    id: "transport",
    ordinal: "03",
    label: "Admissible change",
    formal: "Represented transport",
    prompt: "Which transformations are allowed, and what structure should survive them?",
  },
  {
    id: "invariant",
    ordinal: "04",
    label: "Invariant",
    formal: "Protected distinction",
    prompt: "What must remain recoverable if the representation is still doing its job?",
  },
  {
    id: "defect",
    ordinal: "05",
    label: "Returned defect",
    formal: "Consequence-sensitive defect",
    prompt: "What failure reveals that a consequential distinction was lost, distorted, or unavailable?",
  },
  {
    id: "repair",
    ordinal: "06",
    label: "Repair / test",
    formal: "Refinement and consequence",
    prompt: "How can the representation, frame, capacity, or action map be revised and tested again?",
  },
] as const;

export const representationDomains: readonly RepresentationDomain[] = [
  {
    id: "social",
    label: "Social meaning",
    shortLabel: "SOCIAL",
    domainClass: "Cultural & social",
    tone: "violet",
    witnessProblem:
      "Identity, performance, recognition, and public legibility under socially consequential frames.",
    witnessQuestion:
      "What can become socially distinguishable, and what happens when a representation changes what others can recognize or act on?",
    contribution: "Gender and cultural representation mechanics.",
    mechanics: {
      frame:
        "Which social context, audience, and recognition regime determines what can be made legible?",
      representation:
        "How are identity, performance, and recognition encoded into a public or institutional meaning?",
      transport:
        "Which changes of presentation, role, category, or context preserve agency and intelligibility?",
      invariant:
        "Which distinctions must remain recoverable so the represented person or group is not flattened?",
      defect:
        "Where does the representation misrecognize, erase, or force consequential distinctions into the wrong category?",
      repair:
        "What changes when affected participants review, contest, refine, or replace the representation?",
    },
  },
  {
    id: "knowledge",
    label: "Public knowledge",
    shortLabel: "KNOWLEDGE",
    domainClass: "Epistemic & informational",
    tone: "blue",
    witnessProblem:
      "Events, sources, frames, omissions, disagreement, and the construction of public knowledge.",
    witnessQuestion:
      "How does an event become a represented public reality without losing source provenance or visible disagreement?",
    contribution: "Media representation and provenance mechanics.",
    mechanics: {
      frame:
        "Which event window, source set, editorial frame, and public context defines the represented episode?",
      representation:
        "How do events, sources, claims, omissions, and disagreement become a navigable public account?",
      transport:
        "Which summaries, comparisons, and reframings preserve source provenance and visible disagreement?",
      invariant:
        "Which source-to-claim relationships and uncertainty signals must stay recoverable?",
      defect:
        "Where do omission, framing loss, or false consensus make the public representation misleading?",
      repair:
        "Can provenance, competing accounts, missing context, or uncertainty be restored without hiding disagreement?",
    },
  },
  {
    id: "strategy",
    label: "Formal strategy",
    shortLabel: "STRATEGY",
    domainClass: "Formal & strategic",
    tone: "gold",
    witnessProblem:
      "Discrete state, admissible transitions, threat, closure, and repair in bounded strategic systems.",
    witnessQuestion:
      "Which transformations preserve or destroy strategic closure, and how early can that change be made legible?",
    contribution: "Boundary-First Chess.",
    mechanics: {
      frame:
        "Which board state, rules, horizon, and strategic objective define the current position?",
      representation:
        "Which relations, not only piece locations, make the position strategically actionable?",
      transport:
        "Which legal moves and plans preserve or deliberately transform strategic closure?",
      invariant:
        "Which constraints, threats, resources, or commitments must remain visible across candidate transitions?",
      defect:
        "Where does a move cross a boundary that later positions cannot repair cheaply?",
      repair:
        "Which continuation, rollback, exchange, or structural change restores a viable path?",
    },
  },
  {
    id: "agency",
    label: "Embodied agency",
    shortLabel: "AGENCY",
    domainClass: "Embodied & computational",
    tone: "teal",
    witnessProblem:
      "Multi-agent perception, coordination, role transfer, failure, recovery, and real-time action.",
    witnessQuestion:
      "How do agents coordinate, act, fail, and repair when each works from a bounded representation of a shared world?",
    contribution: "Boundary-First Soccer and agentic mechanics.",
    mechanics: {
      frame:
        "Which local perception, team role, field region, and task context defines what an agent can act on?",
      representation:
        "How does sensed state become a shared working model for coordination?",
      transport:
        "Which motions, handoffs, role changes, and plans remain admissible under real-time constraints?",
      invariant:
        "Which coordination commitments and recoverable shared state must survive local action?",
      defect:
        "Where do stale perception, conflicting roles, or failed handoffs break coordinated agency?",
      repair:
        "How does the team detect failure, re-plan, redistribute roles, and recover?",
    },
  },
  {
    id: "physical",
    label: "Physical dynamics",
    shortLabel: "PHYSICAL",
    domainClass: "Physical & predictive",
    tone: "green",
    witnessProblem:
      "Multiscale observation, modeling, prediction, uncertainty, and public decision under physical dynamics.",
    witnessQuestion:
      "How do models represent and predict multiscale physical reality under uncertainty?",
    contribution: "Boundary First Weather.",
    mechanics: {
      frame:
        "Which observation scale, model resolution, forecast horizon, and instrument set define the represented system?",
      representation:
        "How does multiscale observed weather become a computational model that supports prediction?",
      transport:
        "Which updates, refinements, scale changes, and forecast steps preserve the structures we care about?",
      invariant:
        "Which physical or predictive relationships should survive a change of resolution or representation?",
      defect:
        "Where do unresolved boundaries, model mismatch, or underestimated uncertainty become consequential?",
      repair:
        "Does refinement, recalibration, baseline comparison, or a changed model reduce returned error against observation?",
    },
  },
] as const;
