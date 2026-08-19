import type { ContentNode } from "@/lib/content";

/**
 * Public process language shared with the Gestalt projection.
 * This extends the existing About / How We Work record rather than replacing its
 * retained operating-method and claim-discipline content.
 */
export function hydrateProcessNode(node: ContentNode): ContentNode {
  if (node.id !== "how-we-work") return node;

  const synthesisParagraph =
    "Boundary First Labs describes the operating synthesis as agentic, Lean Startup, Agile, scientific, computational, and constructive. These are overlapping disciplines rather than sequential phases: agents scale bounded work; Lean supplies validated learning; Agile supplies adaptive delivery; scientific practice constrains claims through evidence and negative results; computation makes representations executable and measurable; constructive practice forces understanding into artifacts that can be inspected, tested, and repaired.";

  const loopParagraph =
    "Across those disciplines, the practical loop is: intake and observe -> bound the problem and its constraints -> build a representation -> state a bounded hypothesis or claim -> construct the smallest coherent artifact -> execute or deliver it in a meaningful environment -> measure and validate against reality -> repair what failed or was omitted -> promote, steward, supersede, or retire only what the retained evidence can support.";

  return {
    ...node,
    body: [
      ...(node.body ?? []),
      synthesisParagraph,
      loopParagraph,
    ],
    inspection: [
      ...(node.inspection ?? []),
      {
        id: "about-operating-synthesis",
        label: "Agentic, Lean, Agile, scientific, computational, constructive",
        eyebrow: "One operating synthesis, not six phases",
        summary:
          "The disciplines overlap across a repairable Boundary First loop; the process view separates the temporal work stages from the methods used inside them.",
        bullets: [
          "Agentic: scale search, synthesis, execution, checking, and repair while keeping authority and claim promotion bounded.",
          "Lean Startup: prefer the smallest coherent artifact that can produce validated learning before scaling cost or commitment.",
          "Agile: use bounded closure attempts, demonstrations, refinement, and retrospectives to adapt delivery under evidence.",
          "Scientific: let hypotheses, measurements, counterexamples, and negative results constrain what may be claimed next.",
          "Computational: make representations executable, simulable, searchable, and measurable so hidden assumptions can fail visibly.",
          "Constructive: turn understanding into artifacts, proofs, prototypes, schemas, or systems that can be inspected, tested, and repaired.",
          "Operating loop: Intake -> Boundary -> Representation -> Hypothesis -> Construction -> Execution -> Validation -> Repair -> Promotion / Stewardship.",
        ],
        sourceRef: "Boundary First Labs operating synthesis; public Gestalt process model",
      },
    ],
  };
}
