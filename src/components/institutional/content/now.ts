export const nowPriorityLanes = [
  {
    code: "01",
    status: "ACTIVE",
    title: "Close the public and commercial interface",
    description:
      "Finish the current website, offer, funding, and inquiry surfaces so an outsider can understand the Lab and reach a concrete next action without founder narration.",
    work: [
      "Finish the current Website v3 commercial-execution pass across About, Applied Work, Funding, Now, and related entry surfaces.",
      "Keep the public story connected to real products, services, research objects, evidence, and contact paths instead of allowing a separate marketing canon to form.",
      "Use release QA, cold-reader review, and actual inquiry behavior to repair what remains confusing.",
    ],
    closure:
      "A first-time visitor can explain what BFL is, identify a relevant lane, inspect the evidence boundary, and take a real next step without a live founder walkthrough.",
    tone: "public",
  },
  {
    code: "02",
    status: "ACTIVE",
    title: "Turn four funding lanes into outside evidence",
    description:
      "Move the current lead objects in services, products, knowledge software, and research funding into contact with customers, partners, users, reviewers, and funders.",
    work: [
      "Use Systems / Architecture Review as the near-term B2B services test.",
      "Advance Boundary-First Chess and adjacent sports/game products through direct and partner-distributed market tests.",
      "Test Projectr / Knowledge Explorer as paid knowledge infrastructure only after repeated voluntary use, and advance Weather through grants, sponsored research, and scientific collaboration.",
    ],
    closure:
      "At least one lane produces a real external event—paid work, product use or sale, partner distribution, funded research, or clear negative evidence that narrows the lane.",
    tone: "external",
  },
  {
    code: "03",
    status: "ACTIVE",
    title: "Audit the population behind the Registrar",
    description:
      "The whole-Lab registry census is closed; the current question is whether durable object populations and their projections are actually complete, linked, and executable enough to support the institution.",
    work: [
      "Continue the Registry Population & Projection Audit without reopening the completed 620-registry discovery census.",
      "Use Experiments as a test of Research Lane completeness: every durable Experiment must resolve to a durable Research Lane, including not-ready and not-started execution states.",
      "Repair omissions in Research Lanes, Experiments, machine projections, and owner-local registries while preserving source authority and transaction history.",
    ],
    closure:
      "Durable research objects can be enumerated from source authorities with explicit ownership, machine projection, and no experiment left orphaned from a Research Lane.",
    tone: "apparatus",
  },
  {
    code: "04",
    status: "ACTIVE",
    title: "Run the research benchmarks that can falsify the stack",
    description:
      "Push Boundary Theory, Distinction Space, Information Mechanics, and related machinery through bounded comparisons against established mathematics, physics, computation, and native domain methods.",
    work: [
      "Advance the statistical-mechanics / representational-entropy program through exact projection, memory, lumpability, and coarse-graining benchmarks.",
      "Continue the fine-structure program only where normalization, resolution, RG, and parameter-selection claims survive explicit no-go and native-theory controls.",
      "Preserve negative results and record 'added value: none' when Boundary First vocabulary does not outperform or clarify the established account.",
    ],
    closure:
      "The strongest active research programs have executable or proof-facing tests that can keep, narrow, rename, or reject claims rather than merely extend the vocabulary.",
    tone: "evidence",
  },
  {
    code: "05",
    status: "ACTIVE",
    title: "Turn mature research into reviewable publication objects",
    description:
      "Convert the strongest paper candidates and already-paperized programs into specific manuscripts with claim ceilings, provenance, related-work boundaries, and correction paths.",
    work: [
      "Continue the Information Mechanics / Information + Physics paperization sequence from the canonical working manuscripts already created.",
      "Use normalized publication mines as routing maps rather than treating candidate volume as publication maturity.",
      "Select external reviewers by the claims actually made and preserve negative review, revision, and supersession as durable publication state.",
    ],
    closure:
      "A bounded set of manuscripts can be reviewed as specific objects with stable identity, source basis, novelty posture, evidence state, and correction path.",
    tone: "publication",
  },
  {
    code: "06",
    status: "NEXT",
    title: "Make the executable institution transferable",
    description:
      "Use the Observatory, Registrar, work protocols, and durable projections to reduce dependence on founder memory without pretending automation is institutional authority.",
    work: [
      "Keep revision, contradiction, dependency-impact, projection-loss, and authority semantics inspectable inside the Observatory and control plane.",
      "Turn recurring founder procedures into explicit artifacts, transactions, verifier states, and handoffable operating surfaces.",
      "Test whether bounded parts of the Lab can be inspected or operated by another person without losing provenance, claim ceilings, or promotion authority.",
    ],
    closure:
      "At least one meaningful institutional workflow can be followed or operated by a non-founder from durable state, with human authority boundaries still explicit.",
    tone: "coherence",
  },
] as const;

export const roadmapHorizons = [
  {
    label: "NOW",
    horizon: "Current cycle",
    title: "Externalize the institution and finish the next bounded audits.",
    items: [
      "Finish the current Website v3 public/commercial execution pass.",
      "Advance the four funding lanes into real external contact.",
      "Continue the Registry Population & Projection Audit, with Experiment → Research Lane completeness as an explicit invariant.",
      "Run the next statistical-mechanics, admissibility, and fine-structure control work.",
      "Move the strongest paperized research objects toward bounded external review.",
    ],
  },
  {
    label: "NEXT",
    horizon: "After the current closures",
    title: "Turn contact and machinery into evidence another person can inspect.",
    items: [
      "Bind paid work, product use, funding dispositions, collaboration, and failed-fit events as separate evidence.",
      "Promote only the research machinery that survives native-theory and adversarial controls.",
      "Release a small first cohort of manuscripts with explicit review and correction state.",
      "Exercise Observatory and Registrar projections against live institutional changes rather than only finite fixtures.",
      "Test non-founder use of selected tools, methods, or operating procedures.",
    ],
  },
  {
    label: "LATER",
    horizon: "After repeated evidence",
    title: "Promote repeatable capability into durable programs.",
    items: [
      "Scale only funding lanes that have repeatable external evidence.",
      "Move from one-off review and product tests to durable programs where demand or research value is demonstrated.",
      "Train non-founder operators, reviewers, collaborators, and maintainers around bounded machinery.",
      "Expand institutional partnerships and larger public-interest funding routes where the evidence warrants them.",
      "Transfer mature products, methods, or infrastructure when another steward can operate them better.",
    ],
  },
] as const;

export const roadmapGates = [
  {
    title: "Legible institution",
    description:
      "A new reader can explain what the Lab is, distinguish research from products and services, inspect the evidence boundary, and find a relevant path without reading the entire corpus.",
  },
  {
    title: "External transaction or use",
    description:
      "At least one BFL-native service, product, software, funding, or collaboration lane produces evidence that originated outside the Lab.",
  },
  {
    title: "Registry population completeness",
    description:
      "Durable Research Lanes, Experiments, research packets, and other audited object populations are source-bound, machine-projectable, and free of known orphan identities in the audited scope.",
  },
  {
    title: "Executable research benchmark",
    description:
      "A major theoretical claim or method survives—or is narrowed by—a preregistered proof-facing, computational, or native-domain comparison with preserved negative results.",
  },
  {
    title: "Canonical publication",
    description:
      "A released research object has bound claims, sources, status, related-work boundary, review state, correction path, and a stable public identity.",
  },
  {
    title: "Independent operation",
    description:
      "At least one non-founder can inspect or operate a bounded method, tool, or institutional workflow from durable state without ordinary execution depending on founder memory.",
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
