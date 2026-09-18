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
] as const;

export const recurringStructures = [
  "State",
  "Boundary",
  "Distinction",
  "Transformation",
  "Constraint",
  "Invariant",
  "Closure",
  "Information loss",
  "Failure",
  "Revision",
] as const;

export const methodCycle = [
  ["01", "Practice", "Start with a real system and a real failure or need."],
  ["02", "Comparison", "Look sideways into neighboring disciplines and working machinery."],
  ["03", "Systematization", "Identify the recurring structure without erasing local meaning."],
  ["04", "Formalization", "State the pattern precisely enough to fail."],
  ["05", "Instrumentation", "Build ways to inspect, test, compare, or execute it."],
  ["06", "Deployment", "Put the machinery into a bounded real environment."],
  ["07", "Observation", "Watch what survives contact and what breaks."],
  ["08", "Revision", "Repair the representation and repeat."],
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
