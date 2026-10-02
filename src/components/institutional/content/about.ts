export const representations = [
  ["Equations", "represent physical systems"],
  ["Schemas", "represent data"],
  ["Programs", "represent processes"],
  ["Measurements", "represent properties"],
  ["Models", "represent observations"],
  ["Institutions", "represent people and events through categories, records, procedures, and rules"],
] as const;

export const recurringFailures = [
  ["Reality and model disagree", "The real system changes while its representation stays wrong or incomplete."],
  ["A distinction disappears", "Something consequential to the task is collapsed into a category that cannot express it."],
  ["State diverges", "Two parts of a system disagree about what is true now."],
  ["Meaning is lost in translation", "A transformation preserves format or syntax while dropping what mattered."],
  ["The abstraction reaches its edge", "A model works for ordinary cases and breaks when reality crosses its design boundary."],
  ["The measure is precise but wrong", "A metric can be accurate about the thing it measures and still miss the thing that matters."],
] as const;

export const oldMachinery = [
  "State machines",
  "Databases",
  "Type systems",
  "Compilers",
  "Statistical mechanics",
  "Measurement",
  "Formal grammars",
  "Version control",
  "Scientific models",
  "Experimental method",
  "Probability",
  "Information theory",
  "Software architecture",
  "Agile delivery",
  "Kanban",
  "Lean Startup",
] as const;

export const recurringStructures = [
  "Domain",
  "Obligation",
  "Distinction",
  "State",
  "Boundary",
  "Transformation",
  "Invariant",
  "Admissibility",
  "Projection",
  "Authority",
  "Provenance",
  "Witness",
  "Consequence",
  "Closure",
  "Defect",
  "Repair",
  "Handoff",
] as const;

export const methodCycle = [
  ["01", "Observe", "Start with the real system, its language, artifacts, behavior, and consequences."],
  ["02", "Bound", "Name the smallest coherent obligation, protected distinctions, and authority boundary."],
  ["03", "Represent", "Construct continuation-sufficient state, lawful transitions, invariants, and projections."],
  ["04", "Execute", "Run the smallest useful transformation that can expose whether the representation is adequate."],
  ["05", "Witness", "Collect domain-recognized evidence instead of treating implementation or ticket state as closure."],
  ["06", "Criticize", "Search for counterexamples, hidden distinctions, invalid authority, and representation loss."],
  ["07", "Repair", "Change the model, boundary, transformation, or machinery where the evidence locates defect."],
  ["08", "Transfer", "Leave durable state, provenance, decisions, and capability for the next lawful continuation."],
] as const;

export const agencyRoutes = [
  "Understand",
  "Contest",
  "Correct",
  "Refuse where refusal is legitimate",
  "Appeal",
  "Repair",
  "Escalate",
  "Recover from error",
] as const;

export const capabilityOutputs = [
  "A clearer model",
  "A working tool",
  "A dataset",
  "A method",
  "A documented process",
  "An educational artifact",
  "A research packet",
  "An interface",
  "A repair path",
  "A handoff to a better long-term steward",
] as const;

export const stewardshipFacets = [
  {
    label: "INTELLECTUAL",
    title: "Steward the knowledge.",
    description:
      "Preserve provenance, uncertainty, criticism, negative results, supersession, rights, and enough context for the work to remain inspectable and transferable.",
  },
  {
    label: "HUMANIST",
    title: "Steward human agency.",
    description:
      "Protect dignity, local knowledge, accessibility, contestability, repair, and capability transfer so a useful system does not make the people it serves less able to act.",
  },
  {
    label: "ECOLOGICAL",
    title: "Steward the substrate.",
    description:
      "Follow material, energy, infrastructure, social, and ecological consequences beyond the local boundary, including burdens shifted onto communities, ecosystems, maintainers, or future generations.",
  },
] as const;

export const stewardshipQuestions = [
  "Who exercises power?",
  "Who bears its effects?",
  "Who maintains the system?",
  "Who can challenge it?",
  "Who is responsible for repair?",
  "Can the work move to a better steward?",
  "Are future users inheriting capability or dependency?",
] as const;

export const labInstruments = [
  "Instruments",
  "Procedures",
  "Records",
  "Calibration",
  "Experiments",
  "Controls",
  "Failure analysis",
  "Revision",
] as const;
