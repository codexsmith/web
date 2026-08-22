export const founderProfile = {
  name: 'Nicholas "Nick" Smith',
  role: "Founder · Boundary First Labs",
  summary:
    "Georgia Tech-trained computer scientist, senior software engineer, systems thinker, and independent researcher. The founder record exists to explain provenance and present responsibility for the Lab without asking biography to validate the work.",
  currentPhase:
    "Convert a long-running body of software, research, methods, and public-interest work into durable products, public goods, independently testable research, and institutional structure.",
};

export const founderRecordSections = [
  {
    label: "Founder contribution",
    body:
      "The founder contribution is a combination of software-systems practice, independent inquiry, and a recurring engineering pattern: find the hidden boundary, name what must survive, expose the defect, build the smallest useful artifact, test whether reality closes, and refine.",
  },
  {
    label: "Professional grounding",
    body:
      "The public founder record describes Georgia Tech computer-science training in artificial intelligence and systems architecture, followed by roughly thirteen years building, repairing, integrating, and delivering software across web applications, APIs, databases, cloud infrastructure, mobile systems, consulting environments, regulated contexts, and startup-style teams.",
  },
  {
    label: "Research continuity",
    body:
      "Boundary First Labs did not begin as a recent response to generative AI. Its source record describes a long-running software, research, and systems-analysis practice spanning software, artificial intelligence, mathematics, physics, cognition, research methods, institutions, governance, weather, games, and public systems.",
  },
  {
    label: "Institutional boundary",
    body:
      "Founder provenance explains origin and present accountability; it does not validate theory. The institutional goal is to move memory, method, decisions, criticism, correction, and stewardship out of private founder dependence and into structures other capable people can inspect, challenge, improve, operate, and eventually steward.",
  },
] as const;

export const founderEvidenceItems = [
  {
    label: "Training and delivery practice",
    eyebrow: "Provenance evidence",
    summary:
      "Georgia Tech computer-science training plus a long professional software-delivery record under real requirements, budgets, deadlines, inherited systems, and operational constraints.",
    source: "Founder's Note · The Founder Contribution",
  },
  {
    label: "Pre-AI continuity",
    eyebrow: "Origin boundary",
    summary:
      "The underlying questions, practical methods, and much of the corpus predate the current generative-AI boom; AI accelerated assembly rather than originating the program.",
    source: "Founder's Note · From Founder Sweat Equity to Public Infrastructure",
  },
  {
    label: "Inspectable corpus",
    eyebrow: "Work-product evidence",
    summary:
      "The source record points to a structured body of manuscripts, methods, source registers, claim ledgers, experiment plans, prototypes, software concepts, public essays, teaching systems, governance instruments, and domain applications.",
    source: "Founder's Note · What Is Being Converted",
  },
  {
    label: "AI is a forge, not an oracle",
    eyebrow: "Authority boundary",
    summary:
      "Language models are treated as accelerants for comparison, reorganization, candidate formalization, and implementation work. Generated fluency is not treated as evidence or authorizing authority.",
    source: "Founder's Note · AI as a Bridge, Not an Authority",
  },
  {
    label: "Founder concentration is an explicit risk",
    eyebrow: "Institutional risk",
    summary:
      "The current formation-stage risk is concentration of corpus memory, method, decision history, and productive capacity in the founder.",
    source: "Founder's Note · Founder Risk and Institutionalization",
  },
  {
    label: "Institutionalization has a concrete mitigation path",
    eyebrow: "Repair path",
    summary:
      "Stable source and claim registers, repeatable protocols, bounded specifications, external review, critic passes, visible correction history, stewardship rules, and partnership records are the stated path away from founder dependence.",
    source: "Founder's Note · Founder Risk and Institutionalization",
  },
] as const;

export const founderClaimBoundaries = [
  "Biography establishes provenance and responsibility; it does not validate mathematical, scientific, legal, or institutional claims.",
  "Corpus size establishes that there is work to inspect; volume is not a substitute for evidence quality.",
  "Professional software delivery establishes relevant operating experience; it does not automatically validate claims in other domains.",
  "AI assistance accelerates representation and comparison; it does not become the authority for what the Lab publishes or operates.",
  "Boundary First Labs is still formation-stage, so institutional durability remains a work in progress rather than a completed claim.",
] as const;

export const founderTimeline = [
  {
    period: "Training",
    label: "Computer science as the first formal operating language",
    summary:
      "Georgia Tech training centered on computer science, artificial intelligence, and systems architecture, with human-factors and cognition work contributing to the representation problem from another direction.",
  },
  {
    period: "Professional practice",
    label: "Software delivery under consequence",
    summary:
      "Roughly thirteen years of building, repairing, integrating, and delivering software made incomplete requirements, inherited constraints, operational failure, testing, and repair part of the research substrate rather than abstract examples.",
  },
  {
    period: "Independent inquiry",
    label: "A long-running cross-domain research practice",
    summary:
      "Questions about representation, boundaries, invariants, failure, cognition, mathematics, physics, institutions, governance, games, weather, and public systems accumulated before the present Lab identity and before the current generative-AI cycle.",
  },
  {
    period: "AI-assisted acceleration",
    label: "The corpus became more comparable and inspectable",
    summary:
      "Capable language models accelerated externalization, comparison, reorganization, code inspection, and candidate formalization across a corpus too large for unaided working memory, while remaining explicitly subordinate to human responsibility and evidence.",
  },
  {
    period: "Boundary First Labs",
    label: "Research practice becomes an institution and portfolio",
    summary:
      "The current phase organizes the accumulated work into products, public-interest programs, publications, research objects, methods, source registers, and governed public surfaces rather than leaving it as founder-held material.",
  },
  {
    period: "Institutionalization",
    label: "Make the work capable of surviving the founder",
    summary:
      "The next transition is from founder-mediated coherence to durable shared structure: external criticism, explicit provenance, repeatable protocols, correction history, stewardship, transfer, and governance that other capable people can operate.",
  },
] as const;
