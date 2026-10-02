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
          title={<>Show the work in a real system.</>}
          lead={<>Projects are where Boundary First Labs puts research, software, methods,
              and public-interest questions into contact with concrete domains.</>}
          support={<>Each project should make four things visible: what problem is being
              worked on, what actually exists, what the work has shown so far, and what still
              needs to be tested.</>}
          childLinks={institutionalChildRoutes.projects}
          >
          <blockquote className={styles.projectHeroQuestion}>
            <span>PROJECT QUESTION</span>
            What did the Lab build, test, learn, or discover when this work met a real domain?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.featuredProjectsRoute}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>FEATURED PROJECTS</>}
            title={<>Five projects at different stages of use, testing, and research.</>}
            note={<>The projects do not share one lifecycle. Each card preserves its own current status and evidence limits.</>}
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
          <p className={styles.sectionIndex}>WHY PROJECTS MATTER</p>
          <h2>
            A method becomes more credible when reality can disagree with it.
          </h2>
          <p>
            Sometimes a project becomes a product, paper, benchmark, tool, or better method.
            Sometimes the domain exposes a bad assumption or shows that established practice
            already works better. Those are all useful outcomes when the evidence and limits
            remain visible.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}
