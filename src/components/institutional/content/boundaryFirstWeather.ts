import weatherRecord from "@/content/product-landing-pages/boundary-first-weather.json";

export { weatherRecord };

export const boundaryFirstWeatherProduct = {
  family: "COMPUTATIONAL RESEARCH / DECISION SUPPORT",
  name: "Boundary First Weather",
  tagline: weatherRecord.program.primaryLine,
  lead: weatherRecord.hero.deck,
  status: weatherRecord.program.statusLabel.toUpperCase(),
  statusNote: weatherRecord.program.claimBoundary,
  theme: "weather",
} as const;

export const boundaryFirstWeatherNav = [
  { href: "#hypothesis", label: "Hypothesis" },
  { href: "#instrument", label: "Instrument" },
  { href: "#research", label: "Research ladder" },
  { href: "#pilot", label: "Pilot" },
  { href: "#evidence", label: "Evidence" },
] as const;

export const weatherModes = [
  {
    id: "flow",
    label: "Flow",
    kicker: "TRANSPORT FIELD",
    title: "Where is energy, moisture, and momentum moving?",
    description:
      "Read the field as transport: not just what value exists in each cell, but where consequential state is crossing the represented domain.",
    question: "Which transport pathways are carrying the next meaningful change?",
  },
  {
    id: "boundary",
    label: "Boundary",
    kicker: "STRUCTURE FIELD",
    title: "Where is the atmosphere reorganizing?",
    description:
      "Fronts, shear layers, moisture edges, coastlines, and convective boundaries are places where the operating relation between neighboring regions changes.",
    question: "Which boundary is moving, sharpening, coupling, or breaking?",
  },
  {
    id: "defect",
    label: "Defect",
    kicker: "MISMATCH FIELD",
    title: "Where does the representation stop closing cleanly?",
    description:
      "Forecast disagreement, transport mismatch, unresolved gradients, and conservation stress become candidate defect regions for closer inspection.",
    question: "Where is the current representation losing consequential structure?",
  },
  {
    id: "refine",
    label: "Refine",
    kicker: "COMPUTE ALLOCATION",
    title: "Where should the model spend more attention?",
    description:
      "Boundary-Selective Refinement tests whether declared defect and boundary signals can identify high-consequence regions without assuming the answer in advance.",
    question: "Can compute be concentrated here without sacrificing the declared invariants?",
  },
  {
    id: "compare",
    label: "Compare",
    kicker: "MATCHED BASELINE",
    title: "Did the boundary-aware layer actually earn anything?",
    description:
      "The experimental view only matters if it can be compared against an appropriate baseline on error, conservation, runtime, update count, and failure cases.",
    question: "What changed relative to the baseline—and at what cost?",
  },
] as const;

export type WeatherModeId = (typeof weatherModes)[number]["id"];

export const weatherDecisionSurface = [
  ["Forecast change", "Show what changed between model updates rather than presenting each forecast as a disconnected snapshot."],
  ["Uncertainty envelope", "Keep the range of plausible states visible instead of compressing uncertainty into one confident-looking line."],
  ["Model disagreement", "Expose where forecasts diverge across a consequential region, threshold, or transition."],
  ["Consequence", "Connect structural change to the decision, exposure, or protected condition that makes the change matter."],
] as const;

export const weatherPartnerMeasures = [
  ["Boundary localization", "Can a user identify the relevant transition region more accurately or quickly?"],
  ["Uncertainty preservation", "Does the representation retain meaningful probabilistic information?"],
  ["Defect detection", "Does it expose disagreement, missing evidence, or closure gaps the baseline hides?"],
  ["Decision traceability", "Can a user explain how data became a category, alert, or recommendation?"],
  ["Repairability", "Can an analyst trace an error back to its source, transform, and correction path?"],
  ["Claim integrity", "Do conclusions remain inside the declared claim ceiling after the pilot?"],
] as const;
