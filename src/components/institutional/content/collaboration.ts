export const collaborationExchange = [
  {
    label: "BFL BRINGS",
    title: "Developed work that is expensive to recreate from zero.",
    items: [
      "Research programs and formal artifacts",
      "Representational systems and methods",
      "Software, prototypes, and product candidates",
      "Source-controlled synthesis and research machinery",
      "Cross-domain questions that can be tested in bounded settings",
    ],
  },
  {
    label: "COLLABORATORS BRING",
    title: "Capabilities the Lab should not pretend to reproduce.",
    items: [
      "Domain authority and practical judgment",
      "Users, audiences, communities, and distribution",
      "Data, facilities, benchmarks, and infrastructure",
      "Implementation capacity and institutional access",
      "Capital, publication authority, or long-term stewardship",
    ],
  },
] as const;

export const collaborationModes = [
  ["Expert criticism", "Attack one bounded artifact, claim, method, or prototype."],
  ["Advisory review", "Bring domain judgment the Lab does not possess."],
  ["Pilot / case study", "Test one method against a real, bounded environment."],
  ["Co-development", "Build a defined artifact with explicit contribution boundaries."],
  ["Publication", "Produce a named joint artifact without implying broader endorsement."],
  ["Distribution / licensing", "Carry a tested product or method through an existing channel."],
  ["Funding / sponsorship", "Resource a bounded program while keeping truth claims independent."],
  ["Stewardship / transfer", "Place mature work with a party better equipped to sustain it."],
] as const;

export const collaborationStageLegend = [
  ["READY", "BFL has a bounded on-ramp that can be pursued after current-route verification."],
  ["MATERIAL", "The relationship depends on a specific public artifact, page, packet, or demo."],
  ["PREPARED", "Tailored research-routing material exists; current fit and contact state must be reverified."],
  ["EVIDENCE", "A pilot, external review, institutional collaborator, or comparable evidence should come first."],
  ["HORIZON", "Scale-, consortium-, or institution-dependent; visible now, not a near-term obligation."],
  ["SEED", "A possible critic, translator, host, or collaborator. Inclusion is a research lead only."],
] as const;

export const collaborationLanes = [
  {
    code: "01",
    title: "Local + builder ecosystem",
    description:
      "Commercialization, prototyping, founder support, technical introductions, and regional institutional access.",
    tone: "local",
    entries: [
      { name: "ATDC Augusta", role: "company + wedge selection", stage: "READY" },
      { name: "Augusta University Academic Entrepreneurship", role: "commercialization + prototyping", stage: "READY" },
      { name: "Georgia Cyber Center / AU SCCS", role: "secure software + technical discovery", stage: "READY" },
      { name: "UGA SBDC Augusta", role: "pricing + financial model + lender readiness", stage: "READY" },
      { name: "theClubhou.se", role: "founder community + introductions", stage: "READY" },
      { name: "CREATE-X Startup Launch", role: "prototype + founder activation", stage: "MATERIAL" },
      { name: "VentureLab / I-Corps", role: "customer discovery + research commercialization", stage: "MATERIAL" },
      { name: "Chris Klaus / related GT founder ecosystem", role: "builder critique + prototype activation", stage: "MATERIAL" },
    ],
  },
  {
    code: "02",
    title: "Direct application + distribution",
    description:
      "Organizations that already possess an audience, product surface, domain workflow, or distribution channel relevant to a bounded BFL application.",
    tone: "application",
    entries: [
      { name: "GothamChess", role: "chess pedagogy + audience + product evaluation", stage: "MATERIAL" },
      { name: "Ground News", role: "news representation + provenance pilot", stage: "MATERIAL" },
      { name: "World of Wonder", role: "gender representation + public agency", stage: "MATERIAL" },
      { name: "Complexly", role: "educational translation + bounded series", stage: "MATERIAL" },
      { name: "Learning Equality", role: "open learning + navigation pilot", stage: "MATERIAL" },
      { name: "Climate Central", role: "weather-risk communication + visualization review", stage: "MATERIAL" },
    ],
  },
  {
    code: "03",
    title: "Research + technical ecosystems",
    description:
      "Formal, computational, scientific, and competition environments where the work can encounter benchmarks, prior art, domain expertise, and reproducibility pressure.",
    tone: "research",
    entries: [
      { name: "RoboCup Soccer Simulation League", role: "multi-agent testbed + reviewer / team contact", stage: "READY" },
      { name: "Georgia Tech / GTRI", role: "formal + computational collaboration + research re-entry", stage: "PREPARED" },
      { name: "Microsoft Research", role: "empirical research engineering + null-results discipline", stage: "PREPARED" },
      { name: "Topos Institute", role: "formal systems + Schemathematics", stage: "PREPARED" },
      { name: "Galois", role: "formal systems + compositional computation", stage: "PREPARED" },
      { name: "CARMA", role: "AI reasoning + scientific infrastructure", stage: "PREPARED" },
      { name: "FutureHouse / Edison Scientific", role: "AI-for-science + mathematical knowledge", stage: "PREPARED" },
      { name: "Santa Fe Institute", role: "complex systems + emergence", stage: "PREPARED" },
      { name: "Unconventional AI", role: "empirical systems + unconventional computation", stage: "PREPARED" },
      { name: "FQXi", role: "foundations research routing", stage: "PREPARED" },
      { name: "Templeton", role: "research / funding routing", stage: "PREPARED" },
    ],
  },
  {
    code: "04",
    title: "Public-interest + scale institutions",
    description:
      "Funders, public-interest organizations, universities, and agencies whose participation only becomes credible after the appropriate evidence and governance gates exist.",
    tone: "public",
    entries: [
      { name: "Emergent Ventures", role: "founder conversion + whole-lab runway", stage: "MATERIAL" },
      { name: "Patrick J. McGovern Foundation", role: "public-interest AI + research infrastructure", stage: "EVIDENCE" },
      { name: "Mozilla Foundation", role: "open knowledge + accountable AI infrastructure", stage: "EVIDENCE" },
      { name: "Georgia Research Alliance", role: "university-linked applied / formal research", stage: "EVIDENCE" },
      { name: "Gates Foundation", role: "education evidence + later-stage scale", stage: "EVIDENCE" },
      { name: "ACLU / civil-rights organizations", role: "agency + representation audits", stage: "HORIZON" },
      { name: "NOAA", role: "weather + scientific programs", stage: "HORIZON" },
      { name: "NASA", role: "scientific + engineering programs", stage: "HORIZON" },
      { name: "NSF", role: "research programs + consortium routes", stage: "HORIZON" },
      { name: "Public Interest Technology University Network", role: "public systems + technical / institutional bridge", stage: "SEED" },
    ],
  },
  {
    code: "05",
    title: "Critics + translators + public mirrors",
    description:
      "Named people and public organizations that could test legibility, novelty, evidence, pedagogy, or public consequence. These are not presumed partners.",
    tone: "mirror",
    entries: [
      { name: "Sabine Hossenfelder", role: "physics / foundations adversarial critique", stage: "SEED" },
      { name: "Sean Carroll / Mindscape", role: "physics + philosophy-of-science translation", stage: "SEED" },
      { name: "Curt Jaimungal / Theories of Everything", role: "long-form technical explanation", stage: "SEED" },
      { name: "Institute of Art and Ideas", role: "cross-disciplinary debate", stage: "SEED" },
      { name: "PBS Space Time", role: "advanced public-science translation", stage: "SEED" },
      { name: "Veritasium", role: "demonstrable-result explanatory stress test", stage: "SEED" },
      { name: "3Blue1Brown", role: "mathematical visualization + legibility", stage: "SEED" },
      { name: "Numberphile", role: "public mathematical on-ramp", stage: "SEED" },
      { name: "Stand-up Maths", role: "skeptical public mathematics", stage: "SEED" },
      { name: "Dave Farley / Continuous Delivery", role: "software delivery + evidence loops", stage: "SEED" },
      { name: "Simon Brown", role: "software architecture + modeling", stage: "SEED" },
      { name: "Cleo Abram", role: "demonstrable future-facing public narrative", stage: "SEED" },
      { name: "Adam Conover", role: "public systems criticism", stage: "SEED" },
      { name: "Philip DeFranco", role: "public consequence + broad commentary", stage: "SEED" },
    ],
  },
] as const;

export const collaborationProcess = [
  ["Recognized problem", "Start from a real problem or bounded question, not a generalized request to partner."],
  ["Existing BFL asset", "Choose the smallest paper, prototype, method, dataset, product, or diagnostic that can cross the boundary."],
  ["Bounded contact", "Define the review, pilot, co-build, distribution test, or other relationship with explicit authority and stopping conditions."],
  ["Declared evidence", "Say what would count as success, failure, repair, contradiction, adoption, or a reason to stop."],
  ["Next decision", "Expand, repeat, narrow, pause, transfer, publish, license, fund, or exit based on what the contact produced."],
] as const;

export const collaborationRoles = [
  "Witness",
  "Critic",
  "Domain reviewer",
  "Translator",
  "Connector",
  "Host",
  "Pilot partner",
  "Sponsor / patron",
  "Advisor",
  "Collaborator",
] as const;

export const collaborationBoundaries = [
  {
    label: "PARTICIPATION != ENDORSEMENT",
    description:
      "A conversation, critique, pilot, funding relationship, or joint artifact does not imply endorsement of Boundary First Labs or the broader theory unless explicitly agreed.",
  },
  {
    label: "NO WHOLE-LAB BUY-IN REQUIRED",
    description:
      "A collaborator should be able to evaluate one bounded object while remaining agnostic about every other project, theory, product, or claim.",
  },
  {
    label: "PROVENANCE SURVIVES THE BOUNDARY",
    description:
      "Preexisting work, joint contributions, data, publication authority, branding, and commercialization rights should remain explicit rather than being blurred by collaboration.",
  },
  {
    label: "CLAIMS DO NOT INHERIT PRESTIGE",
    description:
      "A famous person, university, company, funder, or public institution cannot make a scientific or technical claim stronger by association.",
  },
  {
    label: "AFFECTED PEOPLE HAVE STANDING",
    description:
      "In consequential civic, legal, educational, health-adjacent, or governance work, lived conditions and practical repair cannot be reduced to an external expert opinion.",
  },
  {
    label: "EXIT IS A VALID RESULT",
    description:
      "The smallest lawful relationship may end after one critique or pilot. A clean no, negative result, or transfer to a better steward can be successful closure.",
  },
] as const;
