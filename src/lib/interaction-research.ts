export const interactionResearchStatus =
  "Design research / CONTEXT. These patterns are not production interaction standards or validated governance instruments.";

export const interactionGraduationRule =
  "A concept graduates only when it has a concrete object, operational semantics, an accessibility equivalent, and a reason to exist in a real user journey.";

export const universalActions = [
  "Orient",
  "Traverse",
  "Inspect",
  "Reveal",
  "Reframe",
  "Trace",
  "Gate",
  "Stress",
  "Repair",
  "Promote",
] as const;

export const workbenchOperators = [
  "Distill",
  "Condense",
  "Overlay",
  "Calibrate",
] as const;

export const systemEvents = [
  "Leak",
  "Crack",
  "Overflow",
  "Stall",
  "Orphan",
  "Drift",
  "Collision",
  "Closure",
] as const;

export const lexiconDistinction = [
  {
    term: "Actions",
    definition: "What the investigator does.",
  },
  {
    term: "Operators",
    definition: "What the apparatus does to representations.",
  },
  {
    term: "Events",
    definition: "What reality does back to the model.",
  },
] as const;

export const depthSemantics = [
  {
    position: "Behind",
    meaning: "Prior context, provenance, assumptions, and causes that support the current representation.",
  },
  {
    position: "On",
    meaning: "The representation currently being inspected or acted upon.",
  },
  {
    position: "In front",
    meaning: "Projected consequence, candidate next state, or promoted representation that has not yet replaced the current one.",
  },
] as const;

export const motionSemantics = [
  { motion: "Lateral movement", operation: "Traverse" },
  { motion: "Through-screen movement", operation: "Reveal depth" },
  { motion: "Rotation", operation: "Reframe" },
  { motion: "Zoom outward", operation: "Promote" },
] as const;

export const motionLaws = [
  {
    law: "Continuity",
    question: "Can the reader tell what object persisted across the transition?",
  },
  {
    law: "Conservation",
    question: "Which invariant information must remain represented after movement?",
  },
  {
    law: "Causality",
    question: "Does the transition preserve why the next representation follows from the current one?",
  },
  {
    law: "Persistence",
    question: "Do identity, status, and evidence survive a change of view unless explicitly transformed?",
  },
  {
    law: "Reversibility",
    question: "Can a reader return without losing the context needed to interpret the prior state?",
  },
  {
    law: "Containment",
    question: "Does movement preserve which context owns or bounds the object?",
  },
] as const;

export const boundaryTimelineStages = [
  "Origin",
  "Decision",
  "Commitment",
  "Action",
  "Consequence",
  "Observation",
  "Adaptation",
  "Repair",
  "Next state",
] as const;

export const syntheticTimelineExample = [
  ["Origin", "A production change is requested."],
  ["Decision", "The change receives a named owner and declared boundary."],
  ["Commitment", "Test and rollback obligations are accepted before release."],
  ["Action", "The implementation moves toward the release gate."],
  ["Consequence", "A previously unrepresented dependency changes."],
  ["Observation", "The evidence gauge records a failed regression check."],
  ["Adaptation", "The release gate closes and the residual is retained."],
  ["Repair", "The dependency and rollback path are brought back inside the model."],
  ["Next state", "The change becomes eligible for a new admission decision."],
] as const;

export const antiCharismaControls = [
  {
    id: "boundary",
    label: "Boundary precedes intervention",
    question: "Was the operative boundary declared before the preferred intervention was selected?",
  },
  {
    id: "evidence",
    label: "Evidence can falsify the recommendation",
    question: "Is there evidence that could force the proposed intervention to be rejected or revised?",
  },
  {
    id: "alternatives",
    label: "Alternatives remain visible",
    question: "Are competing explanations and materially different interventions still represented?",
  },
  {
    id: "consequence",
    label: "Consequences stay represented",
    question: "Are displaced costs, affected parties, residuals, and unresolved defects visible after the decision?",
  },
  {
    id: "repair",
    label: "Repair and reversal are explicit",
    question: "Is there an owned path to correct, reverse, or retire the intervention when it fails?",
  },
  {
    id: "self-application",
    label: "The method applies to its own operator",
    question: "Can the same analysis criticize the investigator, Boundary First Labs, and the chosen method itself?",
  },
] as const;

export const closureEngineDemo = {
  title: "Synthetic software release gate",
  status: "Bounded semantic demonstration",
  userJourney:
    "A practitioner is trying to decide whether a software change is admissible for production without losing ownership, evidence, rollback, or an unresolved dependency.",
  invariant:
    "A production change may pass the release boundary only when ownership, test evidence, and a rollback path are represented and no known residual leak remains unaccounted for.",
  conditions: [
    {
      id: "owner",
      label: "Named owner",
      description: "Responsibility for the release and repair path has somewhere to land.",
    },
    {
      id: "evidence",
      label: "Test evidence",
      description: "The release decision has an observable evidence surface rather than assertion alone.",
    },
    {
      id: "rollback",
      label: "Rollback path",
      description: "A failed release can return to a known admissible state.",
    },
  ],
  apparatus: [
    {
      object: "Vessel",
      instance: "Change context",
      semantics: "The bounded context containing the change, owner, obligations, and current state.",
    },
    {
      object: "Pipe",
      instance: "Implementation transport",
      semantics: "Carries the change between contexts without implying it is admissible at the destination.",
    },
    {
      object: "Valve",
      instance: "Release gate",
      semantics: "Blocks transport until declared admission conditions are satisfied.",
    },
    {
      object: "Gauge",
      instance: "Evidence readiness",
      semantics: "Makes the represented admission conditions observable without changing them.",
    },
    {
      object: "Leak",
      instance: "Unrepresented dependency",
      semantics: "Represents a known consequence or dependency that has escaped the current model and therefore prevents closure.",
    },
    {
      object: "Condenser",
      instance: "Invariant statement",
      semantics: "Reduces the working context to the condition that must survive the release transition.",
    },
  ],
} as const;
