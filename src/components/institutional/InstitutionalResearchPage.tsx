import { InstitutionalFooter, InstitutionalHeader } from "./InstitutionalChrome";
import styles from "./InstitutionalHomePreview.module.css";

const programs = [
  {
    code: "RM",
    title: "Representational Mechanics",
    role: "Theoretical-core discipline / active research surface",
    status: "Working discipline; claims remain evidence-bounded",
    tone: "working",
    question:
      "How do representations become load-bearing under consequential transformation, coupling, use, failure, repair, and reuse?",
    summary:
      "Constructs and tests typed representations under declared pressures, constraints, boundaries, invariants, closure conditions, and repair obligations.",
  },
  {
    code: "BT",
    title: "Boundary Theory",
    role: "Integrative research program",
    status: "Bounded internal synthesis; independent review pending",
    tone: "review",
    question:
      "Can distinctions, obligations, evidence, authority, defects, repair, composition, and closure be coordinated without erasing domain-native theories?",
    summary:
      "Studies how consequential distinctions and lawful variations are constituted, represented, transformed, composed, assessed, repaired, and promoted across bounded regimes.",
  },
  {
    code: "IM",
    title: "Information Mechanics",
    role: "Active engine-core working theory",
    status: "Internal research / working theory",
    tone: "internal",
    question:
      "What may a system safely forget while preserving the structure required for relevant behavior, observation, inference, and transformation?",
    summary:
      "Studies admissible configurations, reachability, preserved distinctions, safe forgetting, and how those claims can be tested.",
  },
  {
    code: "AG",
    title: "Schemathematics / Atlas Grammars",
    role: "Promoted research program / working formal-method surface",
    status: "Registered lane RL-ATLAS-001",
    tone: "registered",
    question:
      "How can formal structures be indexed, compared, reconstructed, transformed, and searched by what they do rather than only by what they are called?",
    summary:
      "Treats mathematical objects as operative profiles while preserving native mathematics as authoritative.",
  },
  {
    code: "ASM",
    title: "Agentic Scientific Method",
    role: "Active registered research lane and engineered research program",
    status: "Registered lane RL-ASM-001",
    tone: "registered",
    question:
      "What operational machinery is required to construct, test, localize defects in, and repair theories under empirical and structural pressure?",
    summary:
      "Connects theory reification, search, typed theory edits, evaluation, provenance, evidence handling, defect localization, and executable research workflows.",
  },
  {
    code: "CHA",
    title: "Constructive Humanist Agentics",
    role: "Institutional and social-science research concern",
    status: "Published institutional surface; broader formalization remains research",
    tone: "mixed",
    question:
      "How should systems be designed when the people represented by them are themselves agents capable of judgment, refusal, criticism, revision, and repair?",
    summary:
      "Develops agency-centered methods that preserve dignity, contestability, responsibility, and reachable action space.",
  },
  {
    code: "SCR",
    title: "Statistical–Computational Regime",
    role: "Active bounded cross-lane experiment / emerging research surface",
    status: "Routed through ASM + Atlas Grammars + Representational Mechanics",
    tone: "experiment",
    question:
      "Can statistical-mechanical and computational descriptions constrain one another without erasing their native meanings?",
    summary:
      "Uses state, ensemble, transition, coarse-graining, reachability, and representation as a bounded cross-domain experiment rather than a mature standalone lane.",
  },
] as const;

const principles = [
  ["01", "Systematize before you speculate.", "Begin with machinery that already works. Name inheritance and prior art. Generalize only after comparison."],
  ["02", "Treat representations as operational objects.", "A representation determines which distinctions, operations, and failures are available to the system using it."],
  ["03", "Prefer inspectable artifacts.", "Definitions, experiments, schemas, code, claims, evidence, counterexamples, and status should remain connected where possible."],
  ["04", "Let counterexamples improve the machinery.", "A failed comparison or broken abstraction can identify the exact boundary where a representation stops being useful."],
  ["05", "Preserve agency under consequence.", "Where systems act on people, ask who can understand, choose, contest, refuse, correct, appeal, repair, and remain accountable."],
  ["06", "Leave capability behind.", "A mature research artifact should become increasingly continuable by someone other than its originator."],
] as const;

const maturityStates = [
  ["Exploration", "A question or comparison is being investigated."],
  ["Conjecture", "A bounded proposition has been stated but not established."],
  ["Working model", "Formal, computational, or operational machinery exists."],
  ["Experimented", "Defined cases have been tested."],
  ["Corroborated", "Relevant evidence or literature materially supports the bounded result."],
  ["Publication candidate", "A bounded artifact is being prepared for external technical review."],
  ["Published", "A public artifact has been released."],
  ["Revised / Superseded / Refuted", "Later evidence changed its status."],
] as const;

const researchObjectFields = [
  "Governing question",
  "Status",
  "Claims",
  "Evidence",
  "Dependencies",
  "Experiments",
  "Counterexamples & defects",
  "Open questions",
  "Agency / consequence",
  "Stewardship",
  "Related artifacts",
  "Revision history",
] as const;

const artifactFamilies = [
  ["Working Papers", "Human-readable arguments, analyses, and bounded formal results."],
  ["Experiment Register", "Evidence-bearing attempts, including negative and null outcomes."],
  ["Claim-control ledgers", "Claims, statuses, dependencies, evidence, objections, and unresolved questions where the research object uses them."],
  ["Source & provenance registers", "Literature, evidence, provenance, and supporting material where the research object maintains them."],
  ["Research Deployment Packets", "Portable bundles for external inspection, reproduction, implementation, or handoff."],
  ["Executable Artifacts", "Reference implementations, formal schemas, checkers, transformation systems, and bounded demonstrations."],
] as const;

export function InstitutionalResearchPage() {
  return (
    <div className={styles.page}>
      <InstitutionalHeader />

      <main className={styles.researchPage}>
        <section className={styles.researchHero}>
          <div>
            <p className={styles.eyebrow}>RESEARCH</p>
            <h1>Research as inspectable machinery.</h1>
            <p className={styles.routeLead}>
              Boundary First Labs develops theories, experiments, computational models,
              formal artifacts, and working systems.
            </p>
          </div>

          <blockquote className={styles.researchQuestion}>
            <span>GOVERNING QUESTION</span>
            Can the machinery used to reason about complex systems itself be made more
            explicit, testable, comparable, and operational?
          </blockquote>
        </section>

        <section className={styles.researchOrientation}>
          <div>
            <p className={styles.sectionIndex}>HOW TO READ THIS PAGE</p>
            <h2>Different objects. Different maturity.</h2>
          </div>
          <div className={styles.orientationCopy}>
            <p>
              The Lab maintains research programs, working theories, registered research
              lanes, experiments, implementations, and publication candidates at different
              stages.
            </p>
            <p>
              A public page may summarize those objects, but it does not promote them.
              Status is shown so a reader does not have to infer confidence from tone,
              credentials, design, or institutional authority.
            </p>
          </div>
          <div className={styles.orientationRule}>
            <span className={styles.routeSignal} aria-hidden="true" />
            <strong>SOURCE-GOVERNED STATUS</strong>
            <p>Visible state is descriptive, not a score or endorsement.</p>
          </div>
        </section>

        <section className={styles.researchPrograms}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>ACTIVE SURFACES</p>
              <h2>Research programs and working lanes.</h2>
            </div>
            <span>Common analytical roles do not imply formal equivalence across domains.</span>
          </div>

          <div className={styles.researchProgramGrid}>
            {programs.map((program) => (
              <article className={styles.researchProgramCard} data-tone={program.tone} key={program.title}>
                <div className={styles.programTopline}>
                  <span className={styles.programCode}>{program.code}</span>
                  <span className={styles.programStatus}>{program.status}</span>
                </div>
                <h3>{program.title}</h3>
                <p className={styles.programRole}>{program.role}</p>
                <p className={styles.programSummary}>{program.summary}</p>
                <blockquote>{program.question}</blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.epistemicAgency}>
          <div>
            <p className={styles.sectionIndex}>READER AGENCY</p>
            <h2>Research should increase epistemic agency.</h2>
            <p>
              Inspectability changes the relationship between researcher and reader. A
              reader should be able to see what is claimed, what supports it, what remains
              uncertain, what failed, and what would change the conclusion.
            </p>
          </div>
          <blockquote>
            “Here is enough structure for you to make a better judgment of your own.”
          </blockquote>
        </section>

        <section className={styles.researchPrinciples}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>WORKING PRINCIPLES</p>
              <h2>How research is handled.</h2>
            </div>
          </div>

          <div className={styles.principleGrid}>
            {principles.map(([index, title, description]) => (
              <article className={styles.principlePlate} key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.equivalenceFirewall}>
          <p className={styles.sectionIndex}>PERMANENT FIREWALL</p>
          <h2>Common role is not equivalence.</h2>
          <blockquote>
            Similar vocabulary is not mathematical equivalence. A useful analogy is not a
            theorem. A shared representation is not a shared ontology.
          </blockquote>
          <p>
            Software state, physical state, mathematical state, institutional state, and
            epistemic state may occupy comparable analytical roles while remaining
            different objects with different native semantics.
          </p>
        </section>

        <section className={styles.researchState}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>RESEARCH STATE</p>
              <h2>“Published” is not the only useful status.</h2>
            </div>
            <span>Use the canonical status when a source system has a more precise state.</span>
          </div>

          <div className={styles.stateRail}>
            {maturityStates.map(([state, description], index) => (
              <div className={styles.statePlate} key={state}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{state}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.researchObject}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>PUBLIC RESEARCH OBJECT</p>
            <h2>What a mature object should expose.</h2>
            <p>
              A research page should answer more than “what is this about?” It should expose
              enough state for independent inspection and continuation.
            </p>
          </div>

          <div className={styles.objectFieldGrid}>
            {researchObjectFields.map((field, index) => (
              <div className={styles.objectField} key={field}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{field}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.artifactFamilies}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>MORE THAN PAPERS</p>
              <h2>Research connects prose to machinery.</h2>
            </div>
          </div>

          <div className={styles.artifactGrid}>
            {artifactFamilies.map(([title, description]) => (
              <article className={styles.artifactPlate} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.instrumentationClose}>
          <p className={styles.sectionIndex}>CLOSING TEST</p>
          <h2>A theory should survive instrumentation.</h2>
          <p>
            A useful theory should increasingly be representable, testable, refinable, and
            inspectable by people other than its author.
          </p>
          <div className={styles.instrumentQuestions}>
            <span>Can its objects be represented clearly?</span>
            <span>Can its assumptions be made explicit?</span>
            <span>Can its transformations be tested?</span>
            <span>Can its failure modes be localized?</span>
            <span>Can another person reconstruct what was done?</span>
            <span>Can another qualified person criticize or continue the work?</span>
          </div>
        </section>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
