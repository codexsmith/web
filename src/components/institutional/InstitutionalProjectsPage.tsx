import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Projects.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { projects } from "./content/projects";
import { ProjectContextSection } from "./sections/ProjectContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalProjectsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.projectsPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.projectsHero}
          eyebrow={<>PROJECTS</>}
          title={<>Theory should travel.</>}
          lead={<>A method becomes more interesting when it survives outside the environment
              in which it was developed.</>}
          support={<>Projects put ideas, representations, instruments, and workflows under
              different kinds of pressure in bounded real systems.</>}
          childLinks={institutionalChildRoutes.projects}
          >
          <blockquote className={styles.projectHeroQuestion}>
            <span>PROJECT QUESTION</span>
            What happened — or what are we preparing to test — when the Lab&apos;s
            machinery encountered an actual bounded system?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.featuredProjectsRoute}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FEATURED PROJECTS</>}
            title={<>Five different places for the machinery to succeed, bend, or fail.</>}
            note={<>Status comes from the source object. These projects do not share one lifecycle.</>}
            />

          <div className={styles.projectCaseGrid}>
            {projects.map((project) => {
              const content = (
                <>
                  <div className={styles.projectCaseTopline}>
                    <span className={styles.projectCaseCode}>{project.code}</span>
                    <span className={styles.projectNativeStatus}>{project.status}</span>
                  </div>

                  <p className={styles.projectCaseType}>{project.type}</p>
                  <h3>{project.title}</h3>

                  <div className={styles.projectCaseFacts}>
                    <div>
                      <span>NATIVE DOMAIN</span>
                      <strong>{project.domain}</strong>
                    </div>
                    <div>
                      <span>PRIMARY STRESS</span>
                      <strong>{project.stress}</strong>
                    </div>
                  </div>

                  <blockquote>{project.question}</blockquote>

                  <div className={styles.projectCaseResult}>
                    <span>WHAT EXISTS / CURRENT RESULT</span>
                    <p>{project.result}</p>
                  </div>

                  <div className={styles.projectConsequenceGrid}>
                    <div>
                      <span>AGENCY</span>
                      <p>{project.agency}</p>
                    </div>
                    <div>
                      <span>STEWARDSHIP</span>
                      <p>{project.stewardship}</p>
                    </div>
                  </div>

                  <div className={styles.projectTransferSignal}>
                    <span>TRANSFER SIGNAL</span>
                    {project.transfer}
                  </div>
                </>
              );

              return (
                <Link
                  className={styles.projectCaseCard}
                  data-project-tone={project.tone}
                  href={project.href}
                  key={project.title}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <ProjectContextSection />

        <section className={styles.projectsClose}>
          <p className={styles.sectionIndex}>CLOSING TEST</p>
          <h2>
            Research becomes more credible when it has somewhere to fail.
          </h2>
          <p>
            Sometimes the machinery becomes a paper, product, benchmark, or better
            instrument. Sometimes the domain forces a repair. Sometimes established
            practice wins. All of those outcomes are useful when evidence, status, and
            consequence remain visible.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}
