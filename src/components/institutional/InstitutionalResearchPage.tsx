import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Research.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";

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
              <article
                className={styles.researchProgramCard}
                data-tone={program.tone}
                key={program.title}
              >
                <div className={styles.programTopline}>
                  <span className={styles.programCode}>{program.code}</span>
                  <div className={styles.programState}>
                    <span className={styles.programStateLamp} aria-hidden="true" />
                    {program.state}
                  </div>
                </div>

                <p className={styles.programRole}>{program.role}</p>
                <h3>{program.title}</h3>
                <p className={styles.programSummary}>{program.summary}</p>

                <div className={styles.programStatusGrid}>
                  <div>
                    <span>{program.statusLabel}</span>
                    <strong>{program.status}</strong>
                  </div>
                  <div className={styles.programQuestionPanel}>
                    <span>GOVERNING QUESTION</span>
                    <p>{program.question}</p>
                  </div>
                </div>

                <div className={styles.programWorkingSurface}>
                  <span>WORKING SURFACE</span>
                  <div>
                    {program.workingSurface.map((item) => (
                      <strong key={item}>{item}</strong>
                    ))}
                  </div>
                </div>

                <div className={styles.programBoundary}>
                  <span>CLAIM / AUTHORITY BOUNDARY</span>
                  {program.boundary}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.researchContext}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>RESEARCH CONTEXT</>}
            title={<>The machinery around the research.</>}
            note={<>Select a plate to inspect it without leaving the page context.</>}
          />

          <ReflowField
            className={styles.researchContextGrid}
            ariaLabel="Research context and interpretation"
          >
            <ReflowFieldItem
              id="reader-agency"
              label="Reader Agency"
              className={[styles.researchContextCard, styles.contextReader].join(" ")}
              dataTone="agency"
              summary={
                <div className={styles.contextSummary}>
                  <span>01</span>
                  <p className={styles.sectionIndex}>READER AGENCY</p>
                  <h3>Research should increase epistemic agency.</h3>
                  <p>What a reader should be able to inspect, challenge, and judge independently.</p>
                </div>
              }
              detail={
                <div className={styles.contextDetail}>
                  <div>
                    <p>
                      Inspectability changes the relationship between researcher and reader.
                      A reader should be able to see what is claimed, what supports it, what
                      remains uncertain, what failed, and what would change the conclusion.
                    </p>
                  </div>
                  <blockquote className={styles.contextQuote}>
                    “Here is enough structure for you to make a better judgment of your own.”
                  </blockquote>
                </div>
              }
            />

            <ReflowFieldItem
              id="working-principles"
              label="Working Principles"
              className={[styles.researchContextCard, styles.contextPrinciples].join(" ")}
              dataTone="principles"
              summary={
                <div className={styles.contextSummary}>
                  <span>02</span>
                  <p className={styles.sectionIndex}>WORKING PRINCIPLES</p>
                  <h3>How research is handled.</h3>
                  <p>Six operating rules for building, testing, criticizing, and transferring work.</p>
                </div>
              }
              detail={
                <div className={styles.principleGrid}>
                  {principles.map(([index, title, description]) => (
                    <article className={styles.principlePlate} key={title}>
                      <span>{index}</span>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>
              }
            />

            <ReflowFieldItem
              id="equivalence-firewall"
              label="Permanent Firewall"
              className={[styles.researchContextCard, styles.contextFirewall].join(" ")}
              dataTone="firewall"
              summary={
                <div className={styles.contextSummary}>
                  <span>03</span>
                  <p className={styles.sectionIndex}>PERMANENT FIREWALL</p>
                  <h3>Common role is not equivalence.</h3>
                  <p>Cross-domain comparison must not silently become a theorem or shared ontology.</p>
                </div>
              }
              detail={
                <div className={styles.firewallDetail}>
                  <blockquote>
                    Similar vocabulary is not mathematical equivalence. A useful analogy is
                    not a theorem. A shared representation is not a shared ontology.
                  </blockquote>
                  <p>
                    Software state, physical state, mathematical state, institutional state,
                    and epistemic state may occupy comparable analytical roles while remaining
                    different objects with different native semantics.
                  </p>
                </div>
              }
            />

            <ReflowFieldItem
              id="research-state"
              label="Research State"
              className={[styles.researchContextCard, styles.contextState].join(" ")}
              dataTone="state"
              summary={
                <div className={styles.contextSummary}>
                  <span>04</span>
                  <p className={styles.sectionIndex}>RESEARCH STATE</p>
                  <h3>“Published” is not the only useful status.</h3>
                  <p>Source-governed states make uncertainty and maturity visible without scoring the work.</p>
                </div>
              }
              detail={
                <>
                  <p className={styles.contextDetailNote}>
                    Use the canonical status when a source system has a more precise state.
                  </p>
                  <div className={styles.stateRail}>
                    {maturityStates.map(([state, description], index) => (
                      <div className={styles.statePlate} key={state}>
                        <span>{formatOrdinal(index)}</span>
                        <strong>{state}</strong>
                        <p>{description}</p>
                      </div>
                    ))}
                  </div>
                </>
              }
            />

            <ReflowFieldItem
              id="public-research-object"
              label="Public Research Object"
              className={[styles.researchContextCard, styles.contextObject].join(" ")}
              dataTone="object"
              summary={
                <div className={styles.contextSummary}>
                  <span>05</span>
                  <p className={styles.sectionIndex}>PUBLIC RESEARCH OBJECT</p>
                  <h3>What a mature object should expose.</h3>
                  <p>Enough connected state for independent inspection, criticism, and continuation.</p>
                </div>
              }
              detail={
                <>
                  <p className={styles.contextDetailNote}>
                    A research page should answer more than “what is this about?”
                  </p>
                  <div className={styles.objectFieldGrid}>
                    {researchObjectFields.map((field, index) => (
                      <div className={styles.objectField} key={field}>
                        <span>{formatOrdinal(index)}</span>
                        <strong>{field}</strong>
                      </div>
                    ))}
                  </div>
                </>
              }
            />

            <ReflowFieldItem
              id="artifact-families"
              label="Research Artifact Families"
              className={[styles.researchContextCard, styles.contextArtifacts].join(" ")}
              dataTone="artifacts"
              summary={
                <div className={styles.contextSummary}>
                  <span>06</span>
                  <p className={styles.sectionIndex}>MORE THAN PAPERS</p>
                  <h3>Research connects prose to machinery.</h3>
                  <p>Arguments, evidence, provenance, packets, and executable artifacts stay connected.</p>
                </div>
              }
              detail={
                <div className={styles.artifactGrid}>
                  {artifactFamilies.map(([title, description]) => (
                    <article className={styles.artifactPlate} key={title}>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>
              }
            />

            <ReflowFieldItem
              id="closing-test"
              label="Closing Test"
              className={[styles.researchContextCard, styles.contextClosing].join(" ")}
              dataTone="closing"
              summary={
                <div className={styles.contextSummary}>
                  <span>07</span>
                  <p className={styles.sectionIndex}>CLOSING TEST</p>
                  <h3>A theory should survive instrumentation.</h3>
                  <p>Can another person represent, test, criticize, reconstruct, and continue the work?</p>
                </div>
              }
              detail={
                <div className={styles.closingDetail}>
                  <p>
                    A useful theory should increasingly be representable, testable, refinable,
                    and inspectable by people other than its author.
                  </p>
                  <div className={styles.instrumentQuestions}>
                    <span>Can its objects be represented clearly?</span>
                    <span>Can its assumptions be made explicit?</span>
                    <span>Can its transformations be tested?</span>
                    <span>Can its failure modes be localized?</span>
                    <span>Can another person reconstruct what was done?</span>
                    <span>Can another qualified person criticize or continue the work?</span>
                  </div>
                </div>
              }
            />
          </ReflowField>
        </section>
      </InstitutionalPageShell>
  );
}
