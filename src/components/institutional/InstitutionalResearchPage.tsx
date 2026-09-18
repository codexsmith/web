import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Research.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { programs } from "./content/research";
import { ResearchContextSection } from "./sections/ResearchContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";
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
          support={<>The research operation combines laboratory habits with software engineering
              and Lean–Agile delivery practice: make state visible, bound work, shorten
              feedback loops, preserve failed attempts, and revise from evidence. Those
              operating habits organize inquiry; they do not substitute for scientific validation.</>}
          childLinks={institutionalChildRoutes.research}
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

        <ResearchContextSection />
      </InstitutionalPageShell>
  );
}
