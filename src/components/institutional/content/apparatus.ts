export const instruments = [
  {
    code: "REG",
    title: "Lab Registry Registrar",
    verb: "GOVERNS",
    status: "REVIEWABLE v0.1 SEED CONTRACT",
    tone: "control",
    question: "What durable records exist, where do they live, and which source is responsible for each one?",
    summary:
      "Acts as a directory for the Lab's registers, ledgers, catalogs, queues, maps, and indexes without taking ownership of the records inside them.",
    observes: "Which record systems exist, where their source of truth lives, who owns them, and how they are maintained.",
    prevents: "A search index, generated page, or convenience view being mistaken for the source of truth.",
    authority: "May describe and route people or software to the Lab's record systems.",
    noAuthority: "May not rewrite the underlying research, product, publication, or operational records simply because it can find them.",
    handoff: "Makes it clear where the current record lives and who is responsible for its meaning."
  },
  {
    code: "LANE",
    title: "Research Lane Register",
    verb: "RECORDS",
    status: "DURABLE RESEARCH STATE",
    tone: "research",
    question: "What durable questions is the Lab pursuing?",
    summary:
      "Keeps a long-running research question identifiable across experiments, conversations, papers, failures, revisions, and changes of direction."
    observes: "Governing question, inquiry boundary, posture, sources, experiments, publications, dependencies, lineage, and next targets.",
    prevents: "A long-running inquiry collapsing into disconnected papers, chats, or short-term memory.",
    authority: "May record the identity, history, and current state of a research program.",
    noAuthority: "Being registered does not make the hypothesis correct."
    handoff: "Lets another researcher recover the question, lineage, sources, and current next work.",
  },
  {
    code: "EXP",
    title: "Experiment Register",
    verb: "TESTS",
    status: "REGISTRATION + EVIDENCE ROUTING",
    tone: "experiment",
    question: "What has the Lab actually tried?",
    summary:
      "Keeps a durable record of experiments, simulations, benchmarks, replications, stress tests, attempts to disprove a claim, and negative or inconclusive results."
    observes: "Bounded evidence-bearing operations and their outcomes.",
    prevents: "Failed or inconvenient experiments disappearing from the institutional record.",
    authority: "May record what was tried and connect the result to the relevant research.",
    noAuthority: "Recording an experiment does not make a scientific claim established."
    handoff: "Shows another reviewer what has already been tried, including null, negative, blocked, and superseded work.",
  },
  {
    code: "CLAIM",
    title: "Claim-control ledgers",
    verb: "RECORDS",
    status: "PACKET / DOMAIN-LOCAL FAMILY",
    tone: "local",
    question: "What exactly are we asserting?",
    summary:
      "Keeps the status of a claim separate from polished prose: what is supported, still hypothetical, under test, disputed, revised, or superseded.",
    observes: "What a claim currently says, what supports it, what challenges it, and how confident the owning research program is allowed to be.",
    prevents: "Confident writing from sounding stronger than the underlying evidence.",
    authority: "May record claim status inside the research object that owns that claim.",
    noAuthority: "There is no single Lab-wide claim scale that overrides the standards of every field.",
    handoff: "Lets a new reader distinguish the current claim from older wording and presentation."
  },
  {
    code: "SRC",
    title: "Source & provenance registers",
    verb: "RECORDS",
    status: "PACKET / DOMAIN-LOCAL FAMILY",
    tone: "local",
    question: "Where did this come from?",
    summary:
      "Tracks the literature, data, software, standards, historical material, conversations, and criticism that a piece of research depends on.",
    observes: "Where material came from, how it was used, and how it relates to the current work.",
    prevents: "The Lab's interpretation from being confused with what the original source actually said.",
    authority: "May record source history and how material entered the work.",
    noAuthority: "A source record does not prove that every interpretation of that source is correct.",
    handoff: "Shows what came from elsewhere, what the Lab changed or added, and where to inspect the stronger source."
  },
  {
    code: "FORGE",
    title: "Corpus Forge",
    verb: "TRANSFORMS",
    status: "ACTIVE OPERATIONAL SUBSYSTEM",
    tone: "machine",
    question: "How can software and AI help turn source material into research that a person can review?",
    summary:
      "Helps organize, compare, criticize, revise, and package clearly scoped research while preserving where it came from and what still requires human judgment.",
    observes: "The assigned task, source material, claim-and-evidence relationships, criticism, comparison results, revision history, and review state.",
    prevents: "The shortcut 'an AI wrote it, therefore the Lab accepts it.'",
    authority: "May perform clearly scoped research operations such as organizing, comparing, criticizing, and proposing repairs.",
    noAuthority: "Tool output, critic agreement, or a passing validator never makes a scientific claim official on its own.",
    handoff: "Preserves what the tool did, why the candidate exists, and which human decision is still required."
  },
  {
    code: "RDP",
    title: "Research Deployment Packet",
    verb: "TRANSFERS",
    status: "DEVELOPED TRANSFER FORMAT",
    tone: "transfer",
    question: "How does research leave the environment in which it was developed?",
    summary:
      "Packages a clearly scoped body of research so another person, laboratory, organization, or machine can understand and continue it without reconstructing the original conversation.",
    observes: "The current editable work, claims, sources, context, open questions, next steps, and file inventory.",
    prevents: "Research becoming inseparable from one chat, one computer, or one researcher.",
    authority: "May package and transfer the declared research record.",
    noAuthority: "A complete packet does not make the claims inside it true.",
    handoff: "The test is recoverability: what we think, why, what could change our mind, what happens next, and who is responsible for the work."
  },
  {
    code: "MACH",
    title: "Lab Machinery Registry",
    verb: "PROJECTS",
    status: "HUMAN-REVIEWED RECONCILIATION v0.2",
    tone: "machine",
    question: "What executable or operational capabilities exist?",
    summary:
      "Keeps a technical directory of the Lab's software and operational tools: where each one lives, what it does, how mature it is, and what limits apply.",
    observes: "Which tools exist and how they fit into the Lab's operating system.",
    prevents: "Knowing that a tool exists from being confused with permission to run it or trust its output automatically.",
    authority: "May support discovery, routing, integration planning, and technical maintenance.",
    noAuthority: "Being listed does not give a tool permission to run or decide scientific questions.",
    handoff: "Makes each capability findable while preserving who may authorize its use and who owns repair."
  },
  {
    code: "MET",
    title: "Formal Metrology",
    verb: "OBSERVES",
    status: "WORKING INSTRUMENTATION LAYER",
    tone: "metrology",
    question: "What important features of a reasoning system can we make visible without pretending everything has one meaningful score?",
    summary:
      "A working program for measuring and inspecting things such as traceability, coverage, information loss, revision history, responsibility, repair paths, and whether a result can be challenged.",
    observes: "Whether claims can be traced, dependencies can be seen, information was lost, revisions are current, responsibilities are clear, and repair paths exist.",
    prevents: "Important structural questions being ignored simply because they do not collapse into one number.",
    authority: "May trace, classify, compare, and measure where a meaningful measurement is available.",
    noAuthority: "Not every important property is numeric, and this is not a universal score of research quality.",
    handoff: "Makes otherwise hidden structure visible enough to challenge, maintain, transfer, and repair."
  },
] as const;

export const apparatusPath = [
  ["01", "Research question", "Durable inquiry begins"],
  ["02", "Research program", "The question keeps a stable identity over time"],
  ["03", "Experiment / probe / implementation", "A clearly scoped attempt produces evidence"],
  ["04", "Claims + sources", "Record what is being said, what supports it, and what remains open"],
  ["05", "Corpus Forge", "Organize, compare, criticize, revise, and prepare for review"],
  ["06", "Human review", "A responsible person accepts, revises, pauses, or rejects the result"],
  ["07", "Research Deployment Packet", "Package the work so someone else can recover it"],
  ["08", "Publication / website / implementation / collaboration", "Share the appropriate public or operational view"],
] as const;

export const publicExposure = [
  {
    title: "Public detail",
    tone: "green",
    items: [
      "Research Lane Register concept",
      "Experiment Register concept",
      "Research Deployment Packet",
      "Corpus Forge overview",
      "Registry Registrar overview",
      "Lab Machinery overview",
      "Claim/source-control patterns",
      "Publication/research-object status surfaces",
    ],
  },
  {
    title: "Public overview",
    tone: "yellow",
    items: [
      "Machine-readable registry catalogs",
      "Detailed authority contracts",
      "Internal queues",
      "Full claim/evidence graphs",
      "Red-team packets",
      "Operator control surfaces",
      "Machine execution state",
    ],
  },
  {
    title: "Private or source-controlled",
    tone: "red",
    items: [
      "Sensitive or private source material",
      "Unpublished partner material",
      "Protected personal information",
      "Security-sensitive operational detail",
      "Authority-bearing mutation controls",
      "Unreviewed internal artifacts without adequate context",
    ],
  },
] as const;

export const designQuestions = [
  "What does it observe or control?",
  "What problem does it prevent?",
  "What decisions may it make?",
  "What decisions must remain with someone else?",
  "Who can challenge, correct, or stop it?",
  "How does its state survive handoff?",
] as const;
