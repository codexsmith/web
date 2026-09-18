import { InstitutionalFooter, InstitutionalHeader } from "./InstitutionalChrome";
import styles from "./InstitutionalHomePreview.module.css";

const instruments = [
  {
    code: "REG",
    title: "Lab Registry Registrar",
    verb: "GOVERNS",
    status: "REVIEWABLE v0.1 SEED CONTRACT",
    tone: "control",
    question: "What registries exist, where do they live, and what are they allowed to say?",
    summary:
      "Makes the Lab's registry, register, ledger, catalog, queue, map, and index surfaces discoverable without absorbing their contents or ownership.",
    observes: "Registry surfaces, canonical homes, semantic owners, authority ceilings, maintenance and projection roles.",
    prevents: "A generated index or discovery surface being mistaken for the authority that owns the object.",
    authority: "Institutional discovery and meta-control over registry descriptions.",
    noAuthority: "Does not rewrite or promote the objects contained in those registries.",
    handoff: "Preserves where authoritative state lives and who owns its semantics.",
  },
  {
    code: "LANE",
    title: "Research Lane Register",
    verb: "RECORDS",
    status: "DURABLE RESEARCH STATE",
    tone: "research",
    question: "What durable questions is the Lab pursuing?",
    summary:
      "Preserves continuing inquiries that can survive many experiments, conversations, papers, failures, revisions, splits, merges, and supersessions.",
    observes: "Governing question, inquiry boundary, posture, sources, experiments, publications, dependencies, lineage, and next targets.",
    prevents: "A long-running inquiry collapsing into disconnected papers, chats, or short-term memory.",
    authority: "Records the durable identity and continuity of a research lane.",
    noAuthority: "Registration does not establish that the lane's hypothesis is correct.",
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
      "Preserves empirical and computational experiments, formal stress tests, simulations, benchmarks, replications, adversarial tests, falsification attempts, and negative or inconclusive work.",
    observes: "Bounded evidence-bearing operations and their outcomes.",
    prevents: "Failed or inconvenient experiments disappearing from the institutional record.",
    authority: "Registration and evidence routing.",
    noAuthority: "Experiment registration does not promote scientific claim status.",
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
      "Keeps structured claim state outside polished prose: supported claims, hypotheses, tests, dependencies, evidence relationships, objections, promotion gates, and supersession.",
    observes: "Claim maturity and evidence relationships appropriate to the local domain.",
    prevents: "A polished paragraph silently inheriting more authority than the underlying claim state supports.",
    authority: "Local claim-state control where the owning research object defines it.",
    noAuthority: "There is not one Lab-wide canonical Claim Ledger, and the taxonomy is not universal across domains.",
    handoff: "Lets a new reader distinguish current claim state from historical wording and presentation.",
  },
  {
    code: "SRC",
    title: "Source & provenance registers",
    verb: "RECORDS",
    status: "PACKET / DOMAIN-LOCAL FAMILY",
    tone: "local",
    question: "Where did this come from?",
    summary:
      "Tracks literature, data, software, standards, internal artifacts, conversations, authorities, historical material, and criticism behind a research object.",
    observes: "Origin, provenance, and source relationships.",
    prevents: "Derived interpretation being confused with source authority or provenance disappearing during reuse.",
    authority: "Establishes where material came from and how it entered the research object.",
    noAuthority: "A source record does not prove every interpretation of that source is correct; there is no universal Lab-wide Source Register.",
    handoff: "Shows what was received, transformed, added, and where stronger authority lives.",
  },
  {
    code: "FORGE",
    title: "Corpus Forge",
    verb: "TRANSFORMS",
    status: "ACTIVE OPERATIONAL SUBSYSTEM",
    tone: "machine",
    question: "How does bounded source material become a reviewable research artifact?",
    summary:
      "Transforms bounded source material into traceable candidate artifacts through controlled refinement, criticism, comparison, repair, review, and explicit promotion boundaries.",
    observes: "Bounded job packets, schemas, claim/evidence maps, critic packets, provenance, comparison results, and review state.",
    prevents: "The shortcut 'model writes text → text becomes canon.'",
    authority: "Source-bounded refinement, criticism, evidence production, and candidate repair.",
    noAuthority: "Tool output, critic agreement, a green validator, or coherent structure never promotes a claim automatically.",
    handoff: "Machine-readable lifecycle and review context preserves why a candidate exists and what human decision remains.",
  },
  {
    code: "RDP",
    title: "Research Deployment Packet",
    verb: "TRANSFERS",
    status: "STRONG PRODUCTION FORMAT CANDIDATE",
    tone: "transfer",
    question: "How does research leave the environment in which it was developed?",
    summary:
      "Packages bounded research state so another person, laboratory, organization, or machine can recover and continue the work without reconstructing the originating conversation.",
    observes: "Orientation, canonical editable state, claims, provenance, handoff context, next work, inventory, and projection separation.",
    prevents: "Research becoming inseparable from the originating chat, machine, or researcher.",
    authority: "Packages and transfers declared research state.",
    noAuthority: "Packet completeness does not establish the truth of its contents, and current convergence evidence does not create a universal global type.",
    handoff: "Recoverability is the invariant: what we think, why, what could falsify it, what happens next, and who stewards it.",
  },
  {
    code: "MACH",
    title: "Lab Machinery Registry",
    verb: "PROJECTS",
    status: "HUMAN-REVIEWED SEED REGISTRY",
    tone: "machine",
    question: "What executable or operational capabilities exist?",
    summary:
      "Records independently addressable machinery, canonical homes, functional roles, maturity, integration level, entrypoints, side-effect class, authority ceiling, and next integration step.",
    observes: "Operational capabilities and their integration state.",
    prevents: "Capability discovery from being confused with permission to execute or scientific authority.",
    authority: "Discovery, routing, interoperability planning, and integration state.",
    noAuthority: "A machinery entry grants neither scientific authority nor runtime authority by itself.",
    handoff: "Makes operational capability addressable while preserving who may authorize action, stop it, and own repair.",
  },
  {
    code: "MET",
    title: "Formal Metrology",
    verb: "OBSERVES",
    status: "WORKING INSTRUMENTATION LAYER",
    tone: "metrology",
    question: "What hidden structure can we make observable without manufacturing false precision?",
    summary:
      "A working name for instrumenting reasoning systems through traceability, visibility, coverage, loss, closure, revision, freshness, authority, repair, stewardship, and contestability observables.",
    observes: "Properties such as claim traceability, dependency visibility, defects, representational loss, revision state, authority boundaries, and repair paths.",
    prevents: "Important structural questions being ignored because they do not reduce cleanly to a single score.",
    authority: "Trace, classify, compare, witness, bound, and measure where justified.",
    noAuthority: "Not every property becomes a number; metrology is not a universal score of research quality.",
    handoff: "Makes hidden structure visible enough to contest, maintain, transfer, and repair.",
  },
] as const;

const apparatusPath = [
  ["01", "Research question", "Durable inquiry begins"],
  ["02", "Research lane", "Inquiry identity persists"],
  ["03", "Experiment / probe / implementation", "Bounded evidence-bearing operation"],
  ["04", "Claim + source control", "What is asserted, supported, open, rejected, or gated"],
  ["05", "Corpus Forge", "Refinement, criticism, repair, review"],
  ["06", "Human promote / stop / revise", "Authority-bearing decision"],
  ["07", "Research Deployment Packet", "Transferable research state"],
  ["08", "Publication / website / implementation / collaboration", "Public or operational projection"],
] as const;

const publicExposure = [
  {
    title: "Publicly legible",
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
    title: "Public summary",
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
    title: "Source-governed / internal",
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

const designQuestions = [
  "What does it observe or control?",
  "What problem does it prevent?",
  "What authority does it have?",
  "What authority does it explicitly not have?",
  "Who can challenge, correct, or stop it?",
  "How does its state survive handoff?",
] as const;

export function InstitutionalApparatusPage() {
  return (
    <div className={styles.page}>
      <InstitutionalHeader />

      <main className={styles.apparatusPage}>
        <section className={styles.apparatusHero}>
          <div>
            <p className={styles.eyebrow}>APPARATUS</p>
            <h1>Operational tools for knowledge infrastructure.</h1>
            <p className={styles.routeLead}>
              Research creates more structure than a paper can hold.
            </p>
            <p className={styles.routeSupport}>
              Boundary First Labs builds apparatus for preserving, inspecting, and
              transferring questions, experiments, claims, evidence, provenance,
              criticism, defects, authority, repair, and forward state.
            </p>
          </div>

          <blockquote className={styles.apparatusThesis}>
            <span>DESIGN POSTURE</span>
            Legible by humans. Executable by machines. Repairable under critique.
            Transferable without hidden dependence.
          </blockquote>
        </section>

        <section className={styles.apparatusWhy}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>WHY APPARATUS MATTERS</p>
            <h2>Good ideas can fail because their machinery is opaque.</h2>
            <p>
              Apparatus makes claims, evidence, experiments, sources, failures,
              authority, and handoff state easier to inspect instead of leaving them in
              memory, prose, or disconnected folders.
            </p>
          </div>

          <div className={styles.apparatusQuestions}>
            {[
              "What are we actually investigating?",
              "What have we tried?",
              "What is being claimed?",
              "What supports that claim?",
              "Which source owns the current meaning?",
              "What failed?",
              "What changed afterward?",
              "What is safe to publish?",
              "Who can make the next authority-bearing decision?",
              "Who owns correction and maintenance?",
            ].map((question, index) => (
              <div className={styles.apparatusQuestionPlate} key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.apparatusFederation}>
          <div>
            <p className={styles.sectionIndex}>FEDERATED ARCHITECTURE</p>
            <h2>No universal research database.</h2>
            <p>
              Different instruments own different kinds of state. Discovery,
              registration, validation, publication, execution, and promotion are
              intentionally separate authority boundaries.
            </p>
          </div>

          <div className={styles.authorityFirewall}>
            <code>visibility ≠ authority</code>
            <code>validation ≠ truth</code>
            <code>registration ≠ promotion</code>
            <code>publication ≠ closure</code>
            <code>capability ≠ permission</code>
            <code>transfer ≠ abandonment</code>
          </div>
        </section>

        <section className={styles.instrumentBench}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>INSTRUMENT BENCH</p>
              <h2>Different tools. Explicit authority ceilings.</h2>
            </div>
            <span>
              The apparatus is a federation of instruments, not one fictional master database.
            </span>
          </div>

          <div className={styles.instrumentGrid}>
            {instruments.map((instrument) => (
              <article
                className={styles.instrumentCard}
                data-instrument-tone={instrument.tone}
                key={instrument.title}
              >
                <div className={styles.instrumentTopline}>
                  <span className={styles.instrumentCode}>{instrument.code}</span>
                  <span className={styles.instrumentVerb}>{instrument.verb}</span>
                </div>

                <div className={styles.instrumentStatus}>{instrument.status}</div>
                <h3>{instrument.title}</h3>
                <blockquote>{instrument.question}</blockquote>
                <p className={styles.instrumentSummary}>{instrument.summary}</p>

                <div className={styles.instrumentDetailGrid}>
                  <div>
                    <span>OBSERVES / CONTROLS</span>
                    <p>{instrument.observes}</p>
                  </div>
                  <div>
                    <span>PREVENTS</span>
                    <p>{instrument.prevents}</p>
                  </div>
                  <div className={styles.instrumentAuthority}>
                    <span>AUTHORITY</span>
                    <p>{instrument.authority}</p>
                  </div>
                  <div className={styles.instrumentNoAuthority}>
                    <span>DOES NOT HAVE AUTHORITY TO</span>
                    <p>{instrument.noAuthority}</p>
                  </div>
                </div>

                <div className={styles.instrumentHandoff}>
                  <span>HANDOFF / STEWARDSHIP</span>
                  {instrument.handoff}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.apparatusPathSection}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>HOW IT WORKS TOGETHER</p>
              <h2>A simplified research path.</h2>
            </div>
            <span>No box silently inherits the authority of the next one.</span>
          </div>

          <div className={styles.apparatusPath}>
            {apparatusPath.map(([index, title, description]) => (
              <div className={styles.apparatusPathStep} key={title}>
                <span>{index}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className={styles.apparatusSurround}>
            <div>
              <span>AROUND THE PATH</span>
              <strong>Registry Registrar</strong>
              <p>Which institutional state surfaces exist?</p>
            </div>
            <div>
              <span>AROUND THE PATH</span>
              <strong>Lab Machinery Registry</strong>
              <p>Which operational capabilities exist?</p>
            </div>
            <div>
              <span>ACROSS THE PATH</span>
              <strong>Steward / authority / correction path</strong>
              <p>Who may act, repair, stop, and remain responsible through transfer?</p>
            </div>
          </div>
        </section>

        <section className={styles.humanGateSection}>
          <div>
            <p className={styles.sectionIndex}>HUMAN GATES</p>
            <h2>Human gates are not anti-automation.</h2>
            <p>
              Search, indexing, comparison, extraction, transformation, checking,
              routing, synthesis, and bounded execution can be automated aggressively.
              The gate appears where an operation changes authority, public claim state,
              irreversible consequence, or stewardship.
            </p>
          </div>
          <blockquote>
            Automation may extend capability without silently absorbing responsibility.
          </blockquote>
        </section>

        <section className={styles.paperProjectionSection}>
          <div>
            <p className={styles.sectionIndex}>PUBLICATION MODEL</p>
            <h2>A paper is one view of the machine.</h2>
            <p>
              The readable article can remain the public front door while surrounding
              apparatus preserves the state needed to inspect, challenge, revise, and
              continue the work.
            </p>
          </div>

          <div className={styles.paperProjectionRail}>
            {[
              "Claim",
              "Source",
              "Dependency",
              "Experiment",
              "Evidence",
              "Criticism",
              "Defect",
              "Repair",
              "Status",
              "Revision",
              "Publication",
              "Successor use",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className={styles.publicExposureSection}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionIndex}>PUBLIC EXPOSURE</p>
              <h2>Inspectability needs boundaries too.</h2>
            </div>
            <span>
              Transparency is not indiscriminate disclosure. Stewardship requires both
              legibility and boundary discipline.
            </span>
          </div>

          <div className={styles.exposureGrid}>
            {publicExposure.map((group) => (
              <article
                className={styles.exposureCard}
                data-exposure-tone={group.tone}
                key={group.title}
              >
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.apparatusDesignQuestions}>
          <div className={styles.sectionLead}>
            <p className={styles.sectionIndex}>DESIGN POSTURE</p>
            <h2>Every instrument should answer six questions quickly.</h2>
          </div>
          <div className={styles.designQuestionGrid}>
            {designQuestions.map((question, index) => (
              <div className={styles.designQuestionPlate} key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.instrumentTrust}>
          <div>
            <p className={styles.sectionIndex}>TRUST PRINCIPLE</p>
            <h2>No instrument is allowed to promote itself.</h2>
            <p>
              A validator cannot declare a theory true because its schema passed. A registry
              cannot promote an object because it indexed it. A generated page cannot become
              source authority because it is public. A complete packet cannot establish the
              truth of its contents merely because it is complete.
            </p>
          </div>

          <div>
            <p className={styles.sectionIndex}>STEWARDSHIP PRINCIPLE</p>
            <h2>Launch is not closure.</h2>
            <p>
              Every durable artifact needs an owner, a correction path, and a transfer,
              succession, migration, retirement, or maintenance story.
            </p>
          </div>
        </section>

        <section className={styles.apparatusClose}>
          <p className={styles.sectionIndex}>CLOSING TEST</p>
          <h2>Research becomes durable when its state can survive transfer.</h2>
          <p>
            The apparatus preserves more than conclusions. It preserves questions,
            sources, experiments, defects, criticism, repair, authority, and forward
            state—leaving the next person with more capability and less hidden dependence.
          </p>
        </section>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
