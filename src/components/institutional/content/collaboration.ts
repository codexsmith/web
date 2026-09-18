export const collaborationExchange = [
  {
    label: "BFL BRINGS",
    title: "Research, tools, and prototypes that already exist.",
    items: [
      "Developed research and formal methods",
      "Software, prototypes, and product concepts",
      "Ways to map complex systems, decisions, and failure",
      "Source-controlled research and evidence workflows",
      "Cross-domain questions already shaped into testable work",
    ],
  },
  {
    label: "COLLABORATORS BRING",
    title: "Real-world capabilities the Lab should not try to duplicate.",
    items: [
      "Domain expertise and practical experience",
      "Users, customers, audiences, and communities",
      "Data, facilities, benchmarks, and technical infrastructure",
      "Distribution, implementation capacity, and institutional access",
      "Funding, publication channels, or long-term stewardship",
    ],
  },
] as const;

export const collaborationModes = [
  ["Expert review", "Review and challenge a specific paper, claim, method, or prototype."],
  ["Domain advice", "Help the Lab understand an industry, field, community, or operating constraint."],
  ["Pilot / case study", "Try a specific method or tool on a real problem and document what happens."],
  ["Co-development", "Build a defined piece of work together, with roles and ownership clear."],
  ["Publication", "Write or publish a specific joint artifact without implying broader endorsement."],
  ["Distribution / licensing", "Bring a tested product or method to users through an existing channel."],
  ["Funding / sponsorship", "Fund a defined program, experiment, product, or public-interest effort."],
  ["Stewardship / transfer", "Take long-term responsibility for work that fits another organization better."],
] as const;

export const collaborationRoles = [
  "User / practitioner",
  "Expert reviewer",
  "Domain partner",
  "Translator / educator",
  "Connector",
  "Host",
  "Pilot partner",
  "Funder / sponsor",
  "Advisor",
  "Co-builder",
] as const;

export const collaborationOutcomes = [
  "Independent review",
  "Pilot evidence",
  "Joint research",
  "Product validation",
  "New users or distribution",
  "Paid implementation",
  "Funding readiness",
  "Licensing or transfer",
] as const;

export const collaborationStageLabels = {
  READY: "READY NOW",
  MATERIAL: "NEEDS MATERIAL",
  PREPARED: "ROUTE PREPARED",
  EVIDENCE: "NEEDS EVIDENCE",
  HORIZON: "LATER STAGE",
  SEED: "POSSIBLE FIT",
} as const;

export const collaborationStageLegend = [
  ["READY", "BFL has a concrete reason to talk and a small first step that can be proposed after checking the current contact route."],
  ["MATERIAL", "A stronger demo, page, sample, or packet should exist before outreach."],
  ["PREPARED", "BFL already has tailored material, but current fit and contact details need fresh verification."],
  ["EVIDENCE", "A pilot, external review, institutional partner, or comparable result should come first."],
  ["HORIZON", "A plausible later-stage fit once the Lab has more evidence, partners, or operating scale."],
  ["SEED", "A person or organization worth researching as a possible reviewer, translator, host, or collaborator."],
] as const;

export const collaborationLanes = [
  {
    code: "01",
    title: "Local business + startup ecosystem",
    description:
      "Organizations that can help with company building, prototyping, pricing, commercialization, introductions, and regional technical connections.",
    tone: "local",
    entries: [
      { name: "ATDC Augusta", role: "startup coaching, company building, and market strategy", stage: "READY" },
      { name: "Augusta University Academic Entrepreneurship", role: "university commercialization and prototype support", stage: "READY" },
      { name: "Georgia Cyber Center / AU SCCS", role: "cybersecurity, software, and technical research connections", stage: "READY" },
      { name: "UGA SBDC Augusta", role: "pricing, financial planning, and lender readiness", stage: "READY" },
      { name: "theClubhou.se", role: "local founder community, workspace, and introductions", stage: "READY" },
      { name: "CREATE-X Startup Launch", role: "startup coaching, product validation, and founder support", stage: "MATERIAL" },
      { name: "VentureLab / I-Corps", role: "customer discovery and research commercialization", stage: "MATERIAL" },
      { name: "Chris Klaus / related GT founder ecosystem", role: "founder feedback, introductions, and possible prototype support", stage: "MATERIAL" },
    ],
  },
  {
    code: "02",
    title: "Product, media + education partners",
    description:
      "Organizations that already have users, audiences, teaching expertise, product channels, or domain workflows where a specific BFL idea could be tested.",
    tone: "application",
    entries: [
      { name: "GothamChess", role: "test and distribute chess teaching material", stage: "MATERIAL" },
      { name: "Ground News", role: "test news-comparison, framing, and source-provenance tools", stage: "MATERIAL" },
      { name: "World of Wonder", role: "explore representation, media, and public-agency work", stage: "MATERIAL" },
      { name: "Complexly", role: "educational content and public explanation", stage: "MATERIAL" },
      { name: "Learning Equality", role: "open education and learning-navigation pilots", stage: "MATERIAL" },
      { name: "Climate Central", role: "weather-risk communication and visualization review", stage: "MATERIAL" },
    ],
  },
  {
    code: "03",
    title: "Research + technical institutions",
    description:
      "Places where the work can be compared with established methods, tested against benchmarks, reviewed by specialists, or reproduced in stronger technical environments.",
    tone: "research",
    entries: [
      { name: "RoboCup Soccer Simulation League", role: "multi-agent simulation testbed and domain review", stage: "READY" },
      { name: "Georgia Tech / GTRI", role: "research collaboration across formal methods, computing, and engineering", stage: "PREPARED" },
      { name: "Microsoft Research", role: "research engineering, AI, systems, and experimental discipline", stage: "PREPARED" },
      { name: "Topos Institute", role: "category theory, formal systems, and compositional mathematics", stage: "PREPARED" },
      { name: "Galois", role: "formal methods, verified software, and compositional computation", stage: "PREPARED" },
      { name: "CARMA", role: "AI reasoning and scientific infrastructure", stage: "PREPARED" },
      { name: "FutureHouse / Edison Scientific", role: "AI for science and scientific knowledge systems", stage: "PREPARED" },
      { name: "Santa Fe Institute", role: "complex systems and emergence", stage: "PREPARED" },
      { name: "Unconventional AI", role: "alternative computing and systems experiments", stage: "PREPARED" },
      { name: "FQXi", role: "foundations research and scientific funding routes", stage: "PREPARED" },
      { name: "Templeton", role: "research and funding routes across science and foundational questions", stage: "PREPARED" },
    ],
  },
  {
    code: "04",
    title: "Funders, public-interest organizations + agencies",
    description:
      "Organizations that could fund, evaluate, host, or scale public-interest, educational, scientific, or institutional work once the right evidence and governance are in place.",
    tone: "public",
    entries: [
      { name: "Emergent Ventures", role: "early-stage funding for founder-led research and institution building", stage: "MATERIAL" },
      { name: "Patrick J. McGovern Foundation", role: "public-interest AI and responsible-technology infrastructure", stage: "EVIDENCE" },
      { name: "Mozilla Foundation", role: "open knowledge, open technology, and accountable AI", stage: "EVIDENCE" },
      { name: "Georgia Research Alliance", role: "university-linked research and commercialization", stage: "EVIDENCE" },
      { name: "Gates Foundation", role: "education evidence and later-stage scaling", stage: "EVIDENCE" },
      { name: "ACLU / civil-rights organizations", role: "civil-liberties review of consequential systems and representation", stage: "HORIZON" },
      { name: "NOAA", role: "weather, forecasting, and public-science programs", stage: "HORIZON" },
      { name: "NASA", role: "science, engineering, and research programs", stage: "HORIZON" },
      { name: "NSF", role: "research funding, academic collaboration, and consortium programs", stage: "HORIZON" },
      { name: "Public Interest Technology University Network", role: "public-interest technology and university connections", stage: "SEED" },
    ],
  },
  {
    code: "05",
    title: "External reviewers, educators + public communicators",
    description:
      "People and organizations who could challenge, explain, visualize, or translate specific work for wider audiences. They are not presumed partners or endorsers.",
    tone: "mirror",
    entries: [
      { name: "Sabine Hossenfelder", role: "critical review of physics and foundations claims", stage: "SEED" },
      { name: "Sean Carroll / Mindscape", role: "physics and philosophy-of-science discussion", stage: "SEED" },
      { name: "Curt Jaimungal / Theories of Everything", role: "long-form technical discussion and explanation", stage: "SEED" },
      { name: "Institute of Art and Ideas", role: "cross-disciplinary discussion and debate", stage: "SEED" },
      { name: "PBS Space Time", role: "advanced public-science explanation", stage: "SEED" },
      { name: "Veritasium", role: "public explanation built around a demonstrable result or experiment", stage: "SEED" },
      { name: "3Blue1Brown", role: "mathematical visualization and explanation", stage: "SEED" },
      { name: "Numberphile", role: "public mathematical explanation and on-ramp", stage: "SEED" },
      { name: "Stand-up Maths", role: "skeptical, accessible mathematical review", stage: "SEED" },
      { name: "Dave Farley / Continuous Delivery", role: "software delivery, feedback, and evidence loops", stage: "SEED" },
      { name: "Simon Brown", role: "software architecture and modeling", stage: "SEED" },
      { name: "Cleo Abram", role: "public explanation of demonstrable technical work", stage: "SEED" },
      { name: "Adam Conover", role: "public systems criticism and institutional explanation", stage: "SEED" },
      { name: "Philip DeFranco", role: "public discussion when a real newsworthy event or consequence exists", stage: "SEED" },
    ],
  },
] as const;

export const collaborationProcess = [
  ["Start with a real need", "A problem, question, audience, dataset, workflow, or opportunity should already exist."],
  ["Match it to existing work", "Choose the BFL method, prototype, paper, product, or capability that actually fits."],
  ["Agree on a small first step", "Review one artifact, run one workshop, test one pilot, fund one milestone, or build one piece."],
  ["Decide what success looks like", "Set outputs, evidence, responsibilities, ownership, and stop conditions before expanding."],
  ["Continue only if it works", "Repeat, deepen, publish, license, fund, transfer, or stop based on what the first step showed."],
] as const;

export const collaborationBoundaries = [
  {
    label: "PARTICIPATION IS NOT ENDORSEMENT",
    description:
      "A conversation, review, pilot, grant, or joint artifact does not mean the other party endorses Boundary First Labs or every part of its research.",
  },
  {
    label: "ONE PROJECT DOES NOT MEAN WHOLE-LAB BUY-IN",
    description:
      "A collaborator can work on one specific problem while remaining completely neutral about the Lab's other projects and theories.",
  },
  {
    label: "OWNERSHIP, CREDIT, AND DATA STAY CLEAR",
    description:
      "Preexisting work, new contributions, data rights, publication rights, branding, and commercialization terms should be explicit before the relationship grows.",
  },
  {
    label: "REPUTATION IS NOT EVIDENCE",
    description:
      "A respected university, company, funder, or public figure can help test the work, but their name cannot make a technical or scientific claim true.",
  },
  {
    label: "PEOPLE AFFECTED BY THE WORK MATTER",
    description:
      "For civic, legal, educational, health-adjacent, or governance work, the people who experience the consequences need a real voice in defining the problem and judging repair.",
  },
  {
    label: "STOPPING CAN BE THE RIGHT RESULT",
    description:
      "A useful relationship may end after one review or pilot. A clear no, a negative result, or transfer to a better long-term owner can be successful closure.",
  },
] as const;
