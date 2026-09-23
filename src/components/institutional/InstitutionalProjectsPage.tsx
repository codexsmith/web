import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Projects.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { projects } from "./content/projects";
import { ProjectContextSection } from "./sections/ProjectContextSection";
import { FeaturedProjectCard } from "./sections/FeaturedProjectCard";
import { MoonshotsFeature } from "./MoonshotsFeature";
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
            {projects.map((project) => (
              <FeaturedProjectCard
                key={project.code}
                project={project}
                styles={styles}
              />
            ))}
          </div>
        </section>

        <MoonshotsFeature context="projects" />

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
