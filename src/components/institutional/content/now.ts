export const nowPriorityLanes = [
  {
    code: "01",
    status: "ACTIVE",
    title: "Keep the public institution current and useful",
    description:
      "The core website reconciliation is complete. The current job is to keep the public site synchronized with real Lab state and use it as an active interface for readers, collaborators, clients, funders, and reviewers.",
    work: [
      "Keep Now and What Changed current as doctrine, research, products, services, and institutional priorities materially move.",
      "Use first-time-reader feedback, accessibility checks, and actual inquiries to repair confusing language, missing context, or dead-end navigation.",
      "Treat the website as a maintained public record: new claims should point to real evidence, and completed work should stop appearing as unfinished.",
    ],
    closure:
      "A first-time visitor can understand what BFL is today, see what changed recently, distinguish established work from active research, and reach a useful next action without a founder walkthrough.",
    tone: "public",
  },
  {
    code: "02",
    status: "ACTIVE",
    title: "Get real-world evidence from customers, users, partners, reviewers, and funders",
    description:
      "Move the Lab's current service, product, software, and research-funding opportunities into contact with people outside the Lab.",
    work: [
      "Use Systems & Architecture Review as the near-term B2B services test.",
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
    title: "Make sure the Lab's records actually cover the work they claim to cover",
    description:
      "The Lab now has a complete directory of its durable record systems. The next question is whether those records actually contain all the research programs, experiments, publications, products, and other durable objects they are supposed to contain.",
    work: [
      "Continue checking record completeness without reopening the already completed whole-Lab registry discovery work.",
      "Use experiments as a concrete test: every durable experiment should link to the research program it belongs to, including work that has not started or is not yet ready to run.",
      "Repair missing or broken links while preserving the original source records and change history.",
    ],
    closure:
      "The Lab can reliably list its durable research objects from their source records, identify who owns each record, and find no experiment detached from its research program.",
    tone: "apparatus",
  },
  {
    code: "04",
    status: "ACTIVE",
    title: "Run tests that can prove the Lab's strongest ideas wrong",
    description:
      "Compare Boundary Theory, Distinction Space, Information Mechanics, and related methods against established mathematics, physics, computer science, and the native methods of each field.",
    work: [
      "Advance the statistical-mechanics / representational-entropy program through exact projection, memory, lumpability, and coarse-graining benchmarks.",
      "Continue the fine-structure program only where normalization, resolution, RG, and parameter-selection claims survive explicit no-go and native-theory controls.",
      "Preserve negative results and record 'added value: none' when Boundary First vocabulary does not outperform or clarify the established account.",
    ],
    closure:
      "The strongest active research programs have tests strong enough to preserve, narrow, rename, or reject claims rather than simply creating more terminology.",
    tone: "evidence",
  },
  {
    code: "05",
    status: "ACTIVE",
    title: "Turn mature research into specific papers people can review",
    description:
      "Convert the strongest research into specific manuscripts with clear claims, sources, related work, evidence limits, and a visible path for correction.",
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
    title: "Make more of the Lab operable by someone other than its founder",
    description:
      "Turn recurring Lab procedures into durable records and tools so another person can understand and operate bounded parts of the institution without depending on founder memory.",
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
    title: "Keep the public institution current while pushing the strongest work into outside contact and hard tests.",
    items: [
      "Keep Now, What Changed, services, products, and research descriptions synchronized with the Lab's current state.",
      "Move services, products, collaboration, and funding opportunities into real outside contact.",
      "Execute at least one end-to-end research or institutional loop using the machinery that now exists.",
      "Continue the record-completeness audit, including the rule that every durable experiment belongs to a durable research program.",
      "Run hard native-domain research tests and move the strongest manuscripts toward external review.",
    ],
  },
  {
    label: "NEXT",
    horizon: "After the current closures",
    title: "Turn outside contact and internal machinery into evidence another person can inspect and continue.",
    items: [
      "Record paid work, product use, funding decisions, collaboration, review, and failed-fit events as distinct kinds of outside evidence.",
      "Keep only the research machinery that survives comparison with established field methods and adversarial testing.",
      "Release a small first cohort of manuscripts with clear review status and correction paths.",
      "Test the Lab's architecture and record-keeping tools against real institutional changes rather than only controlled examples.",
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
    title: "Complete and connected records",
    description:
      "Durable research programs, experiments, packets, and other audited records can be listed from their sources, connected correctly, and contain no known orphan records in the audited scope.",
  },
  {
    title: "A research test that could change the conclusion",
    description:
      "A major claim or method survives—or is narrowed by—a defined mathematical, computational, experimental, or field-native comparison whose negative results are preserved."
  },
  {
    title: "A publication with a clear record",
    description:
      "A released paper or research object has clear claims, sources, status, related work, review state, correction path, and a stable public identity."
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
