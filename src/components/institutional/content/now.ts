export const nowPriorityLanes = [
  {
    code: "01",
    status: "ACTIVE",
    title: "Finish the public institutional boundary",
    description:
      "Make the Lab understandable to people who do not already know the vocabulary, while keeping the deeper corpus available for inspection.",
    work: [
      "Finish the institutional website's remaining trust/governance surface and connect the contextual inquiry receiver.",
      "Keep Funding, Collaboration, Applied Work, Evidence, Contact, and the roadmap connected to the substantive work beneath them.",
      "Verify the full path from public explanation to inquiry, routing, evidence capture, and repair without turning the site into a marketing shell detached from the corpus.",
    ],
    closure:
      "A first-time visitor can understand what BFL is, what it does, what is still uncertain, and where to go next without founder narration.",
    tone: "public",
  },
  {
    code: "02",
    status: "ACTIVE",
    title: "Turn capability into outside evidence",
    description:
      "Move from founder history and inspectable internal artifacts to BFL-native pilots, client work, external review, and repeat use.",
    work: [
      "Scope the first Applied Work engagements and bounded pilots.",
      "Capture case-study evidence without inflating prototypes or historical work into current traction.",
      "Use product behavior, collaborator feedback, and failed engagements as evidence about what should continue.",
    ],
    closure:
      "At least one BFL-native external engagement or pilot produces inspectable evidence that can be separated from the founder's prior career.",
    tone: "evidence",
  },
  {
    code: "03",
    status: "ACTIVE",
    title: "Execute the representational laboratory program",
    description:
      "Test whether shared representational machinery survives materially different domains instead of assuming that a common vocabulary is already justified.",
    work: [
      "Complete acceptance and integration work for the active representation laboratories.",
      "Bring multiple domain-specific labs under a shared runtime only where cross-domain evidence earns the abstraction.",
      "Preserve replay, provenance, accessibility, claim ceilings, and negative results as part of the apparatus.",
    ],
    closure:
      "Multiple materially different laboratories execute under an evidence-backed shared apparatus without erasing domain-native semantics.",
    tone: "apparatus",
  },
  {
    code: "04",
    status: "NEXT",
    title: "Bind publications and invite criticism",
    description:
      "Convert substantial manuscript and research material into canonical public objects with explicit review and authority states.",
    work: [
      "Select bounded publication candidates by claim maturity rather than manuscript volume.",
      "Bind source, claim, evidence, status, and review metadata to each released object.",
      "Route appropriate work to domain experts, technical reviewers, collaborators, and critics.",
    ],
    closure:
      "Publications can be evaluated as specific objects with clear claims, sources, review state, and correction paths rather than as a large undifferentiated corpus.",
    tone: "publication",
  },
  {
    code: "05",
    status: "ACTIVE",
    title: "Advance ready relationships, funding, and distribution",
    description:
      "Use the work already assembled to test real collaboration, funding, commercialization, and distribution routes.",
    work: [
      "Advance ready-now local, technical, research, and founder-network relationships.",
      "Use bounded briefs, demos, pilots, and evidence packets instead of whole-Lab persuasion.",
      "Pursue patronage, grants, paid work, sponsorship, licensing, and product revenue according to the kind of work being funded.",
    ],
    closure:
      "High-fit counterparties have a declared stage and next action, and at least some routes produce real review, use, funding, distribution, or a clean reason to stop.",
    tone: "external",
  },
  {
    code: "06",
    status: "ACTIVE",
    title: "Keep one coherent body of work",
    description:
      "Continue consolidating the research library so public pages, experiments, publications, and tools point back to stable source objects rather than parallel versions.",
    work: [
      "Consolidate overlapping domain and theory surfaces without deleting distinct evidence or failed reasoning.",
      "Keep canonical records, historical lineage, generated artifacts, and live runtime state distinguishable.",
      "Make more of the corpus machine-addressable and executable without pretending every indexed object is already an autonomous machine.",
    ],
    closure:
      "The Lab can change quickly without creating multiple competing sources of truth or losing the provenance needed to reconstruct why a decision was made.",
    tone: "coherence",
  },
] as const;

export const roadmapHorizons = [
  {
    label: "NOW",
    horizon: "Current cycle",
    title: "Externalize, test, and close the obvious gaps.",
    items: [
      "Finish the public institutional interface.",
      "Package and scope Applied Work.",
      "Execute the active laboratory and corpus-coherence work.",
      "Advance ready-now collaboration and funding routes.",
      "Prepare publication objects for bounded review.",
    ],
  },
  {
    label: "NEXT",
    horizon: "After the first external loops",
    title: "Turn contact into evidence.",
    items: [
      "Complete external pilots, reviews, or paid engagements.",
      "Bind the first strong BFL-native case studies.",
      "Release publication objects with explicit review state.",
      "Collect repeat product-use and distribution evidence.",
      "Repair the public story from what outsiders actually misunderstand.",
    ],
  },
  {
    label: "LATER",
    horizon: "After repeated evidence",
    title: "Promote repeatable capability into durable programs.",
    items: [
      "Move from one-off projects to programs only where repeated capability is demonstrated.",
      "Train non-founder operators, facilitators, reviewers, and contributors.",
      "Expand institutional partnerships and larger public-interest funding routes.",
      "Transfer mature products or methods when another steward can operate them better.",
      "Make release, correction, governance, and contributor development sustainable beyond one person's active memory.",
    ],
  },
] as const;

export const roadmapGates = [
  {
    title: "Legible institution",
    description:
      "A new reader can explain what the Lab is, distinguish method from theory, inspect evidence, and find a relevant path without reading the entire corpus.",
  },
  {
    title: "External evidence",
    description:
      "At least one BFL-native pilot, engagement, review, or product interaction produces evidence that did not originate inside the Lab.",
  },
  {
    title: "Canonical publication",
    description:
      "A released research object has bound claims, sources, status, review state, correction path, and a stable public identity.",
  },
  {
    title: "Cross-domain apparatus",
    description:
      "Shared machinery is demonstrated across multiple materially different laboratories rather than asserted from one example.",
  },
  {
    title: "Independent use",
    description:
      "At least one non-founder practitioner can use a bounded method or tool on a new case without ordinary delivery requiring founder interpretation.",
  },
  {
    title: "Repeatable external loop",
    description:
      "Public projection leads to contact, contact leads to use or review, and the resulting evidence changes the work, roadmap, or public representation.",
  },
] as const;

export const roadmapChangeRules = [
  {
    label: "EVIDENCE CAN MOVE WORK",
    description:
      "A negative result, failed pilot, external criticism, or stronger neighboring method can demote, redirect, or close a line of work.",
  },
  {
    label: "FUNDING CHANGES SPEED, NOT TRUTH",
    description:
      "Runway can increase conversion capacity and parallelism. It does not promote a research claim or waive evidence gates.",
  },
  {
    label: "DEPENDENCIES COME BEFORE CALENDAR",
    description:
      "Some work cannot responsibly start until a prerequisite artifact, reviewer, partner, technical capability, or governance boundary exists.",
  },
  {
    label: "CAPACITY IS FINITE",
    description:
      "The Lab will not pretend every interesting workstream is an active priority. Lower-priority programs remain visible without being represented as current commitments.",
  },
  {
    label: "TRANSFER IS A SUCCESS CONDITION",
    description:
      "A line of work may move to another institution, collaborator, maintainer, or product owner when that creates stronger long-term stewardship.",
  },
  {
    label: "THE ROADMAP IS DATED",
    description:
      "This is a public planning projection of the current Lab state. It should be updated when the active queue materially changes rather than treated as a permanent promise.",
  },
] as const;
