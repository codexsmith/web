import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/About.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { representations, recurringFailures, oldMachinery, recurringStructures, methodCycle, agencyRoutes, capabilityOutputs, stewardshipQuestions, labInstruments } from "./content/about";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAboutPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.aboutPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.aboutHero}
          eyebrow={<>ABOUT BOUNDARY FIRST LABS</>}
          title={<>A laboratory for the machinery beneath knowledge.</>}
          lead={<>Boundary First Labs studies how complex systems are represented,
              transformed, tested, measured, and made operational.</>}
          support={<>The technical question is paired with a human one: what happens to people&apos;s
              ability to understand, choose, contest, repair, and act when those
              representations become consequential?</>}
          >
          <blockquote className={styles.aboutAgencyQuestion}>
            <span>THE HUMAN QUESTION</span>
            What happens to human agency when a system&apos;s representation becomes operational?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.knowledgeInfrastructure}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>KNOWLEDGE IS INFRASTRUCTURE</>}
            title={<>Complex reasoning depends on representations.</>}
            description={<>Representations make difficult systems manageable. They also determine what
              a system can see, distinguish, store, transform, and sometimes act upon.</>}
            />

          <div className={styles.representationGrid}>
            {representations.map(([title, description], index) => (
              <div className={styles.representationPlate} key={title}>
                <span>{formatOrdinal(index)}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.humanRepresentation}>
          <div>
            <p className={styles.sectionIndex}>REPRESENTATION HAS CONSEQUENCES</p>
            <h2>A useful category is never the whole person.</h2>
            <p>
              A person may enter a system as a patient, student, employee, citizen,
              customer, applicant, account, demographic category, diagnosis, or case.
              Those abstractions may be necessary. They are not the whole person.
            </p>
          </div>

          <blockquote>
            No human being is exhausted by the category through which an institution
            encounters them.
          </blockquote>
        </section>

        <section className={styles.recurringProblemSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>THE RECURRING PROBLEM</>}
            title={<>Many hard systems failures have the same shape.</>}
            note={<>The representation and the reality it stands for have drifted apart.</>}
            />

          <div className={styles.recurringFailureGrid}>
            {recurringFailures.map(([title, description], index) => (
              <article className={styles.recurringFailureCard} key={title}>
                <span>{formatOrdinal(index)}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.oldMachinerySection}>
          <div className={styles.oldMachineryCopy}>
            <p className={styles.sectionIndex}>OLD MACHINERY, RE-UNDERSTOOD</p>
            <h2>Start with what already works.</h2>
            <p>
              Boundary First does not begin by assuming established disciplines need to be
              replaced. It puts mature machinery beside mature machinery and asks which
              recurring structures are genuinely useful—and which similarities are only analogy.
            </p>
          </div>

          <div className={styles.oldMachineryWorkbench}>
            <div className={styles.oldMachineryList}>
              <span>WORKING MACHINERY</span>
              {oldMachinery.map((item) => <strong key={item}>{item}</strong>)}
            </div>
            <div className={styles.recurringStructureList}>
              <span>RECURRING STRUCTURES</span>
              {recurringStructures.map((item) => <strong key={item}>{item}</strong>)}
            </div>
          </div>
        </section>

        <section className={styles.aboutMethodCycle}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>HOW THE METHOD DEVELOPED</>}
            title={<>Practice first. Then comparison, formalization, and test.</>}
            note={<>Systematize before speculating.</>}
            />

          <div className={styles.aboutCycleRail}>
            {methodCycle.map(([index, title, description]) => (
              <div className={styles.aboutCycleStep} key={title}>
                <span>{index}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className={styles.aboutMethodOrigins}>
            <article>
              <span>PRACTICE-BORN</span>
              <h3>Repair the representation.</h3>
              <p>
                In software, data, organizations, and public systems, deeper failures often
                came from an incomplete state model, collapsed distinction, hidden condition,
                or abstraction that had reached its limit.
              </p>
            </article>
            <article>
              <span>RESEARCH-BACKED</span>
              <h3>Compare against deep neighboring traditions.</h3>
              <p>
                Mathematics, physics, computer science, information theory, statistics,
                logic, systems engineering, and scientific method each provide mature ways
                of reasoning about structure, state, evidence, uncertainty, and change.
              </p>
            </article>
            <article>
              <span>FORMALLY GENERALIZED</span>
              <h3>Make the pattern precise enough to fail.</h3>
              <p>
                A useful generalization should recover the cases it came from, expose
                consequential distinctions, produce operational consequences, and become
                implementable or testable where possible.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.aboutAgencySection}>
          <div>
            <p className={styles.sectionIndex}>AGENCY IS NOT AUTONOMY ALONE</p>
            <h2>Humans are agents too.</h2>
            <p>
              Agency includes the capacity to perceive, distinguish, reason, choose,
              refuse, create, revise, and repair. Consequential systems should not erase
              those capacities unnecessarily.
            </p>
          </div>

          <div className={styles.agencyRouteGrid}>
            {agencyRoutes.map((route, index) => (
              <div className={styles.agencyRoutePlate} key={route}>
                <span>{formatOrdinal(index)}</span>
                <strong>{route}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.constructiveHumanism}>
          <div>
            <p className={styles.sectionIndex}>CONSTRUCTIVE HUMANISM</p>
            <h2>Critique matters. Repair matters more.</h2>
            <p>
              The question is not only what is wrong with a system. It is what
              representation, instrument, process, or institution would leave people more
              capable afterward.
            </p>
          </div>

          <div className={styles.capabilityOutputGrid}>
            {capabilityOutputs.map((output, index) => (
              <div className={styles.capabilityOutputPlate} key={output}>
                <span>{formatOrdinal(index)}</span>
                <strong>{output}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.aboutStewardship}>
          <div>
            <p className={styles.sectionIndex}>STEWARDSHIP</p>
            <h2>Capability creates obligations.</h2>
            <p>
              If people depend on something the Lab builds, launch is not closure.
              Maintenance, correction, provenance, migration, retirement, repair, and
              transfer become part of the engineering problem.
            </p>
          </div>

          <div className={styles.aboutStewardshipGrid}>
            {stewardshipQuestions.map((question, index) => (
              <div className={styles.aboutStewardshipPlate} key={question}>
                <span>{formatOrdinal(index)}</span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.whyLabSection}>
          <div>
            <p className={styles.sectionIndex}>WHY A LAB?</p>
            <h2>Because ideas need apparatus.</h2>
            <p>
              A laboratory is an environment where questions become operational. Boundary
              First Labs applies that posture to reasoning systems: make difficult ideas
              inspectable enough to improve and transferable enough that they do not remain
              trapped inside one person&apos;s head.
            </p>
          </div>

          <div className={styles.labInstrumentRail}>
            {labInstruments.map((instrument, index) => (
              <div key={instrument}>
                <span>{formatOrdinal(index)}</span>
                <strong>{instrument}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.criticismFriendlyInstitution}>
          <div>
            <p className={styles.sectionIndex}>CRITICISM-FRIENDLY INSTITUTION</p>
            <h2>Some of our ideas will be wrong.</h2>
            <p>
              Claims should have states. Assumptions should be visible. Experiments and
              counterexamples should remain attached. Revision should be normal. A criticism
              mechanism that cannot change anything is only theater.
            </p>
          </div>
          <blockquote>What we ask of systems, we must ask of ourselves.</blockquote>
        </section>

        <section className={styles.collaborationSection}>
          <div>
            <p className={styles.sectionIndex}>COLLABORATION WITHOUT ABSORPTION</p>
            <h2>The smallest lawful relationship that lets the work meet strong reality.</h2>
            <p>
              BFL should not recreate domain authority, lived knowledge, infrastructure,
              distribution, capital, or stewardship merely to keep everything inside the
              Lab. Collaboration may mean review, co-development, data access, a pilot,
              licensing, publication, sponsorship, or transfer.
            </p>
          </div>

          <div className={styles.collaborationQuestions}>
            <blockquote>
              What does BFL contribute that the collaborator does not already have?
            </blockquote>
            <blockquote>
              What does the collaborator contribute that BFL cannot or should not reproduce?
            </blockquote>
          </div>
        </section>

        <section className={styles.publicGoodSection}>
          <div>
            <p className={styles.sectionIndex}>PUBLIC GOOD</p>
            <h2>Institutions run on representations too.</h2>
            <p>
              Forms, records, categories, eligibility rules, databases, metrics, legal
              statuses, interfaces, and workflows determine what institutions can see and
              do. A missing distinction can become a broken process; a lossy handoff can
              become information that never reaches the institution that needs it.
            </p>
          </div>
          <p>
            That is why public-interest systems belong inside the Lab&apos;s scope. The same
            machinery used to inspect technical and scientific systems can help institutions
            become more legible and more answerable to the people who depend on them.
          </p>
        </section>

        <section className={styles.aboutClose}>
          <p className={styles.sectionIndex}>THE LAB IN ONE SENTENCE</p>
          <h2>
            Boundary First Labs is an applied systems research laboratory studying the
            machinery by which knowledge is represented, transformed, tested, and made
            operational.
          </h2>
          <p>
            The deeper ambition: build systems that help people and institutions understand
            more clearly, act more capably, exercise power more accountably, and repair what fails.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}
