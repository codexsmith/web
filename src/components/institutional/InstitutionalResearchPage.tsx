import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Research.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { programs, principles, maturityStates, researchObjectFields, artifactFamilies } from "./content/research";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalResearchPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.researchPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.researchHero}
          eyebrow={<>RESEARCH</>}
          title={<>Research as inspectable machinery.</>}
          lead={<>Boundary First Labs develops theories, experiments, computational models,
              formal artifacts, and working systems.</>}
          >
          <blockquote className={styles.researchQuestion}>
            <span>GOVERNING QUESTION</span>
            Can the machinery used to reason about complex systems itself be made more
            explicit, testable, comparable, and operational?
          </blockquote>
        </InstitutionalRouteHero>

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
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>ACTIVE SURFACES</>}
            title={<>Research programs and working lanes.</>}
            note={<>Common analytical roles do not imply formal equivalence across domains.</>}
            />

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
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>WORKING PRINCIPLES</>}
            title={<>How research is handled.</>}
            />

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
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>RESEARCH STATE</>}
            title={<>“Published” is not the only useful status.</>}
            note={<>Use the canonical status when a source system has a more precise state.</>}
            />

          <div className={styles.stateRail}>
            {maturityStates.map(([state, description], index) => (
              <div className={styles.statePlate} key={state}>
                <span>{formatOrdinal(index)}</span>
                <strong>{state}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.researchObject}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>PUBLIC RESEARCH OBJECT</>}
            title={<>What a mature object should expose.</>}
            description={<>A research page should answer more than “what is this about?” It should expose
              enough state for independent inspection and continuation.</>}
            />

          <div className={styles.objectFieldGrid}>
            {researchObjectFields.map((field, index) => (
              <div className={styles.objectField} key={field}>
                <span>{formatOrdinal(index)}</span>
                <strong>{field}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.artifactFamilies}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>MORE THAN PAPERS</>}
            title={<>Research connects prose to machinery.</>}
            />

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
      </InstitutionalPageShell>
  );
}
