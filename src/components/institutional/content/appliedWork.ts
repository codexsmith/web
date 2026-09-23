export const appliedWorkFamilies = [
  {
    code: "01",
    title: "Software + systems",
    description:
      "For software that is hard to change, hard to explain, or carrying more consequence than its architecture was designed for.",
    tone: "software",
    offers: [
      {
        title: "Architecture review",
        description:
          "Map state, interfaces, ownership, dependencies, failure paths, and the decisions the current architecture makes difficult.",
      },
      {
        title: "Rescue / modernization",
        description:
          "Find the smallest structural changes that reduce risk and make an aging or tangled system easier to change, test, operate, and hand off.",
      },
      {
        title: "Prototype / pilot design",
        description:
          "Turn an uncertain idea into a bounded technical experiment with a working artifact, explicit assumptions, and a clear test for what happens next.",
      },
    ],
  },
  {
    code: "02",
    title: "AI + operational governance",
    description:
      "For organizations introducing automation into decisions, workflows, or services where authority and accountability matter.",
    tone: "governance",
    offers: [
      {
        title: "AI governance + agency review",
        description:
          "Trace where an AI-enabled system recommends, ranks, approves, denies, escalates, or acts—and whether people can inspect, contest, repair, or override the result.",
      },
      {
        title: "Process / institutional boundary audit",
        description:
          "Find places where responsibility, authority, information, or maintenance cross teams and systems without a reliable owner or handoff.",
      },
      {
        title: "Failure postmortem",
        description:
          "Reconstruct a consequential failure as a system: what was represented, what was assumed, where the boundary failed, and what repair would prevent recurrence.",
      },
    ],
  },
  {
    code: "03",
    title: "Research + institutional infrastructure",
    description:
      "For teams with valuable knowledge or research that is difficult to verify, navigate, transfer, or operate as a shared system.",
    tone: "research",
    offers: [
      {
        title: "Research / provenance infrastructure",
        description:
          "Set up source, claim, evidence, status, decision, and handoff structures so a body of work can be inspected and continued without relying on oral memory.",
      },
      {
        title: "Workshop / working session",
        description:
          "Use a bounded live session to map a difficult system, clarify a decision, surface hidden assumptions, or establish a shared operating model.",
      },
      {
        title: "Retained or fractional technical advisory",
        description:
          "Ongoing support for architecture, software, AI, research systems, technical risk, and difficult cross-boundary decisions when a full-time role is not the right shape.",
      },
    ],
  },
] as const;

export const appliedWorkGoodFit = [
  "The system works, but nobody can clearly explain where state, ownership, or responsibility lives.",
  "A modernization effort keeps moving code without resolving the underlying architecture.",
  "AI or automation changes who can decide, approve, deny, rank, or act, and governance has not caught up.",
  "A critical workflow depends on spreadsheets, meetings, memory, or manual glue to preserve context.",
  "Research or institutional knowledge exists, but provenance, status, handoff, or reproducibility are weak.",
  "You need a pilot small enough to learn something before committing to a large transformation.",
  "A local success metric is hiding maintenance, labor, infrastructure, community, resource, or ecological costs outside the frame.",
] as const;

export const appliedWorkOutputs = [
  {
    title: "System map",
    description: "A concrete picture of actors, state, interfaces, dependencies, authority, and consequence.",
  },
  {
    title: "Risk + defect register",
    description: "Named failure modes, assumptions, unknowns, ownership gaps, and repair priorities.",
  },
  {
    title: "Architecture / governance recommendations",
    description: "Specific changes tied to the problems they are intended to solve, not a generic best-practice report.",
  },
  {
    title: "Pilot or prototype",
    description: "Where useful, a bounded working artifact or test that creates evidence before larger commitment.",
  },
  {
    title: "Decision package",
    description: "A concise record of options, tradeoffs, evidence, open questions, and the next decision.",
  },
  {
    title: "Handoff-ready artifacts",
    description: "Documentation and operating structure designed to remain useful after the engagement ends.",
  },
  {
    title: "Stewardship plan",
    description: "Named ownership for maintenance, repair, transfer, retirement, affected people, and material or ecological consequences that persist after delivery.",
  },
] as const;

export const appliedWorkProcess = [
  ["Bring a real problem", "Start with the system, decision, failure, or opportunity—not a request for a fashionable methodology."],
  ["Inspect what exists", "Review the software, workflow, documents, data, people, constraints, and prior attempts that already shape the problem."],
  ["Bound the engagement", "Respect actual capacity and agree on the smallest coherent review, workshop, prototype, pilot, or advisory scope that can finish, produce evidence, and change the next decision."],
  ["Make the work inspectable", "Deliver maps, artifacts, findings, code, decisions, or evidence that someone other than the consultant can examine."],
  ["Inspect and adapt", "Treat the result as new system state: repair, build, continue, transfer, pause, or stop based on what the engagement actually revealed."],
] as const;

export const appliedWorkBoundaries = [
  {
    label: "LEAN–AGILE BY PRACTICE, NOT CEREMONY",
    description:
      "Use visible state, bounded work, real capacity, small coherent increments, and short evidence loops. Test important assumptions instead of requiring clients to adopt a process brand.",
  },
  {
    label: "HUMAN AUTHORITY STAYS VISIBLE",
    description:
      "AI may search, compare, simulate, draft, or critique, but consequential decisions remain with the people and domain experts who actually hold the relevant authority.",
  },
  {
    label: "STEWARDSHIP OUTLIVES DELIVERY",
    description:
      "Account for maintenance, repair, transfer, retirement, affected people, and material consequences. Useful work should remain operable after the engagement ends.",
  },
  {
    label: "NO THEORY BUY-IN REQUIRED",
    description:
      "Clients do not need Boundary First terminology or agreement with the Lab's research program. The engagement has to stand on the usefulness of the work itself.",
  },
  {
    label: "SCOPE BEFORE SCALE",
    description:
      "Prefer a review, workshop, prototype, or pilot that can finish and create evidence before proposing a large transformation.",
  },
  {
    label: "EVIDENCE OVER PERFORMANCE",
    description:
      "Findings should expose assumptions, uncertainty, disagreement, and the evidence needed for the next decision—not merely produce a confident-looking deck.",
  },
] as const;

export const appliedWorkAudiences = [
  "CTOs + engineering leaders",
  "Founders + product teams",
  "Research groups",
  "Public-interest organizations",
  "Institutions with complex workflows",
  "Teams deploying consequential AI",
] as const;
