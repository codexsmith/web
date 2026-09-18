import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Publications.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

const publicationFields = [
  ["01", "Status", "What stage has this work actually reached?"],
  ["02", "Claim ceiling", "What can this artifact responsibly support?"],
  ["03", "Key claims", "What is actually being asserted?"],
  ["04", "Evidence", "What supports or constrains those claims?"],
  ["05", "Dependencies", "What prior results, data, software, or literature does it require?"],
  ["06", "Open questions", "What remains unresolved?"],
  ["07", "Counterexamples / negative results", "What has resisted the claim?"],
  ["08", "Related artifacts", "What experiments, code, data, packets, or successor work belong with it?"],
  ["09", "Revision & correction", "What changed after release?"],
] as const;

const publicationStates = [
  "Working note",
  "Working paper",
  "Experiment report",
  "Publication candidate",
  "Under review",
  "Published",
  "Revised",
  "Superseded",
  "Retracted / refuted",
] as const;

const publicationTypes = [
  {
    code: "WP",
    title: "Working papers",
    description:
      "Formal or technical arguments developed far enough for focused external inspection but not necessarily final review.",
  },
  {
    code: "TR",
    title: "Technical reports",
    description:
      "Bounded methods, system designs, implementation results, infrastructure analyses, or formal engineering artifacts.",
  },
  {
    code: "RN",
    title: "Research notes",
    description:
      "Smaller objects preserving a question, derivation, comparison, conjecture, or conceptual repair that does not yet justify a full paper.",
  },
  {
    code: "ER",
    title: "Experiment reports",
    description:
      "Evidence-bearing descriptions of bounded tests, including null, negative, blocked, or inconclusive outcomes.",
  },
  {
    code: "FS",
    title: "Formal specifications",
    description:
      "Precise executable or mathematical contracts intended to make a system inspectable and implementable.",
  },
  {
    code: "PI",
    title: "Public-interest analyses",
    description:
      "Evidence-led analyses of civic or institutional systems with explicit provenance, uncertainty, and claim boundaries.",
  },
  {
    code: "RI",
    title: "Reference implementations",
    description:
      "Code or executable artifacts demonstrating a bounded mechanism without treating implementation success as automatic validation of a larger theory.",
  },
  {
    code: "RDP",
    title: "Research Deployment Packets",
    description:
      "Transferable research state for another person, institution, reviewer, or machine to inspect and continue.",
  },
] as const;

const readerDistinctions = [
  "Observation",
  "Interpretation",
  "Inference",
  "Conjecture",
  "Formal result",
  "Empirical validation",
  "Deployment evidence",
] as const;

const critiqueInputs = [
  "Publication or claim",
  "Exact passage / object",
  "Kind of defect",
  "Supporting source or argument",
  "Counterexample",
  "Failed reproduction",
  "Missing prior art",
  "Stronger neighboring literature",
  "Implementation defect",
  "Accessibility problem",
  "Overclaim concern",
] as const;

const stewardshipQuestions = [
  "Is this still current?",
  "Has a stronger artifact superseded it?",
  "Has terminology changed?",
  "Have important counterexamples emerged?",
  "Has a correction been issued?",
  "Is the source material still available?",
  "Who owns the next revision?",
  "Should the work be archived or retired?",
] as const;

const flagshipPattern = [
  "Identity",
  "Current status",
  "Claim ceiling",
  "Abstract / orientation",
  "Key claims",
  "Evidence",
  "Experiments",
  "Negative results",
  "Defects",
  "Open questions",
  "Related apparatus",
  "Revision",
  "Critique",
] as const;

export function InstitutionalPublicationsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.publicationsPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.publicationsHero}
          eyebrow={<>PUBLICATIONS</>}
          title={<>Read the argument. Inspect the machinery behind it.</>}
          lead={<>Boundary First Labs publishes papers, technical reports, research notes,
              formal specifications, experiment reports, public-interest analyses,
              reference implementations, and Research Deployment Packets.</>}
          support={<>A publication is an important artifact. It is not automatically the whole
              research object.</>}
          >
          <blockquote className={styles.publicationCovenantLead}>
            <span>PUBLICATION PRINCIPLE</span>
            Publication should increase the reader&apos;s ability to inspect the work,
            not merely increase the author&apos;s authority.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.publicationProjection}>
          <div>
            <p className={styles.sectionIndex}>PROJECTION ≠ AUTHORITY</p>
            <h2>Publications are views of research state.</h2>
            <p>
              Editing a public page does not change scientific state. A polished PDF does
              not promote a claim. A merged pull request does not prove a theorem.
              Executable evidence does not automatically establish general validity.
            </p>
          </div>

          <div className={styles.publicationBoundaryGrid}>
            <code>public visibility ≠ publication authority</code>
            <code>polish ≠ maturity</code>
            <code>executable evidence ≠ general validity</code>
            <code>publication ≠ closure</code>
          </div>
        </section>

        <section className={styles.publicationAnatomy}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PUBLICATION ANATOMY</>}
            title={<>What a publication page should expose.</>}
            note={<>Enough surrounding state for the reader to judge the work independently.</>}
            />

          <div className={styles.publicationFieldGrid}>
            {publicationFields.map(([index, title, description]) => (
              <article className={styles.publicationFieldCard} key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.publicationStatusSection}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>SOURCE-OWNED STATUS</>}
            title={<>Publication state should be visible.</>}
            description={<>The website may render status, but it does not invent or promote it.
              Where canonical research or publication control has a more precise state,
              that source wins.</>}
            />

          <div className={styles.publicationStateRail}>
            {publicationStates.map((state, index) => (
              <div className={styles.publicationStatePlate} key={state}>
                <span>{formatOrdinal(index)}</span>
                <strong>{state}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.readerAgencySection}>
          <div>
            <p className={styles.sectionIndex}>READER AGENCY</p>
            <h2>Do not make the reader inherit confidence from typography.</h2>
            <p>
              Publication design should expose the distinctions that matter for the
              particular work so the reader can tell what is observed, inferred,
              conjectured, established, or merely deployed.
            </p>
          </div>

          <div className={styles.readerDistinctionRail}>
            {readerDistinctions.map((item, index) => (
              <span key={item}>
                <small>{formatOrdinal(index)}</small>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.publicationTypesSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PUBLICATION TYPES</>}
            title={<>Different artifacts carry different burdens.</>}
            />

          <div className={styles.publicationTypeGrid}>
            {publicationTypes.map((type) => (
              <article className={styles.publicationTypeCard} key={type.title}>
                <span>{type.code}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.critiquePublication}>
          <div>
            <p className={styles.sectionIndex}>CRITIQUE THIS WORK</p>
            <h2>A criticism-friendly publication is one whose state can change.</h2>
            <p>
              Significant publications should expose a correction route that can enter
              the Lab&apos;s research and publication machinery rather than disappear into
              a generic inbox.
            </p>
          </div>

          <div className={styles.critiqueInputGrid}>
            {critiqueInputs.map((item, index) => (
              <div className={styles.critiqueInputPlate} key={item}>
                <span>{formatOrdinal(index)}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.publicationPortfolioModel}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PUBLIC INDEX</>}
            title={<>Simple outside. Richer underneath.</>}
            note={<>The public index should help people find and understand work without turning
              into the Lab&apos;s internal operations dashboard.</>}
            />

          <div className={styles.publicIndexModel}>
            <div className={styles.publicIndexFilters}>
              <span>DISCIPLINE / DOMAIN</span>
              <span>TYPE</span>
              <span>STATUS</span>
              <span>RESEARCH LANE</span>
              <span>RECENT REVISIONS</span>
              <span>EXECUTABLE / DATA AVAILABLE</span>
            </div>
            <div className={styles.internalIndexState}>
              <span>INTERNAL CONTROL MAY ALSO TRACK</span>
              <p>
                Readiness, blockers, dependencies, claim risk, evidence plans, event
                history, and control-queue priority.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.publicationStewardship}>
          <div>
            <p className={styles.sectionIndex}>STEWARDSHIP</p>
            <h2>Publication creates long-lived obligations.</h2>
            <p>
              A document can remain discoverable long after assumptions, terminology,
              evidence, or successor work changes. Sometimes the responsible state is
              revised. Sometimes it is superseded, archived, or retired.
            </p>
          </div>

          <div className={styles.stewardshipQuestionGrid}>
            {stewardshipQuestions.map((question, index) => (
              <div className={styles.stewardshipQuestionPlate} key={question}>
                <span>{formatOrdinal(index)}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.flagshipPatternSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FLAGSHIP RESEARCH-OBJECT PATTERN</>}
            title={<>A reusable public research page.</>}
            note={<>Representational Mechanics establishes the first flagship pattern; the site
              should generalize the grammar rather than duplicate a one-off.</>}
            />

          <div className={styles.flagshipPatternRail}>
            {flagshipPattern.map((item, index) => (
              <div key={item}>
                <span>{formatOrdinal(index)}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.publicationDesignPosture}>
          <div>
            <p className={styles.sectionIndex}>DESIGN POSTURE</p>
            <h2>Publication pages should look calmer than the claims they contain.</h2>
          </div>
          <p>
            Readable typography, generous margins, citation legibility, restrained status
            metadata, clear correction surfaces, accessible equations and figures, and
            stable anchors should make the page feel like an invitation to inspect rather
            than an instrument of promotion.
          </p>
        </section>

        <section className={styles.publicationCovenant}>
          <p className={styles.sectionIndex}>THE PUBLICATION COVENANT</p>
          <h2>A reader should be able to say:</h2>
          <blockquote>
            I know what this claims.<br />
            I know what kind of evidence supports it.<br />
            I know where the uncertainty is.<br />
            I know where to inspect the machinery.<br />
            I know how to challenge it.<br />
            I know whether it has changed.
          </blockquote>
        </section>
      </InstitutionalPageShell>
  );
}
