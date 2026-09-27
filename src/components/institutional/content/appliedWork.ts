export const appliedWorkFamilies = [
  {
    code: "01",
    title: "Systems / Architecture Review",
    description:
      "For consequential systems that are difficult to understand, modernize, integrate, migrate, or repair because the structure itself has become part of the problem.",
    tone: "software",
    offers: [
      {
        title: "System / architecture reconstruction",
        description:
          "Map state, interfaces, dependencies, ownership, boundaries, invariants, and failure paths so the system can be reasoned about before changes are proposed.",
      },
      {
        title: "Modernization / migration review",
        description:
          "Compare repair and migration paths against the behavior, constraints, and semantic obligations that must survive the change.",
      },
      {
        title: "Bounded implementation / pilot",
        description:
          "Turn one selected repair into an inspectable prototype or pilot with explicit assumptions, acceptance conditions, and handoff state.",
      },
    ],
  },
  {
    code: "02",
    title: "Agency / AI Governance Audit",
    description:
      "For systems where people, software, AI, policy, and automation interact but decision rights, review, escalation, or accountable authority are unclear.",
    tone: "governance",
    offers: [
      {
        title: "Agency + authority map",
        description:
          "Trace who or what recommends, ranks, approves, denies, escalates, acts, verifies, and promotes—and where capability and permission have drifted apart.",
      },
      {
        title: "Governance + promotion controls",
        description:
          "Define Forge / Certify / Forbid boundaries, human gates, verifier requirements, contestability, provenance, and repair paths for consequential actions.",
      },
      {
        title: "Decision-chain / failure reconstruction",
        description:
          "Reconstruct a consequential outcome across people, software, policy, and evidence to locate authority gaps and the smallest credible repair.",
      },
    ],
  },
  {
    code: "03",
    title: "Knowledge / Representation Infrastructure Diagnostic",
    description:
      "For organizations that need durable provenance, state, evidence, handoff, and authority across research, documents, schemas, software, and AI transformations.",
    tone: "research",
    offers: [
      {
        title: "Source / claim / evidence architecture",
        description:
          "Map how source material becomes claims, decisions, artifacts, and promoted institutional state—and where provenance or authority is currently lost.",
      },
      {
        title: "Representation + handoff analysis",
        description:
          "Identify semantic loss, hidden projection choices, reconstruction risk, and continuation failures across documents, schemas, interfaces, reports, and teams.",
      },
      {
        title: "Knowledge infrastructure pilot",
        description:
          "Design a bounded provenance, research-operations, or shared-knowledge pilot using the smallest useful combination of workflow and machinery.",
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


export const systemsArchitectureReviewDemo = {
  eyebrow: "SYNTHETIC REVIEW EXAMPLE",
  title: "A system can be “paid” before it is paid.",
  summary:
    "A synthetic invoice workflow shows the review shape without pretending to be a customer case. Coarse statuses hide consequential transitions, outside repair, and ambiguous completion.",
  question:
    "What is this representation allowed to forget without changing a consequential decision?",
  coarseStates: ["APPROVED", "PAID", "FAILED"],
  reconstructedStates: [
    "Accounting approved",
    "Payment authorized",
    "Submitted",
    "Gateway acknowledged",
    "Settled",
    "Reconciled",
    "Closed",
  ],
  defectClasses: [
    {
      title: "Authority collapse",
      description: "Accounting approval and payment authority are treated as the same state.",
    },
    {
      title: "Acknowledgment / settlement collapse",
      description: "An integration acknowledgment is allowed to stand in for business completion.",
    },
    {
      title: "Hidden repair",
      description: "Spreadsheet, email, or direct-data fixes make the workflow succeed outside its represented process.",
    },
    {
      title: "Retry / duplicate ambiguity",
      description: "Recovery can create a second financial action because replay semantics are not explicit.",
    },
    {
      title: "Policy-version drift",
      description: "The system cannot reliably reconstruct which rule set governed an earlier decision.",
    },
  ],
  repairPath: [
    "Declare protected distinctions",
    "Locate ownership + authority",
    "Separate canonical state from projections",
    "Represent repair explicitly",
    "Define closure",
    "Migrate incrementally",
  ],
  deliverables: [
    "System reconstruction",
    "Boundary / ownership map",
    "Defect + invariant registers",
    "Repair / migration options",
    "Decision packet",
    "Handoff context",
  ],
  claim:
    "The synthetic case demonstrates the review workflow and durable artifact package. It is not a customer case and does not establish unique superiority, field effectiveness, cost savings, or product-market fit.",
} as const;
