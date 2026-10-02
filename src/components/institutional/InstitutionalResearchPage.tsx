import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Research.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { programs } from "./content/research";
import { ResearchContextSection } from "./sections/ResearchContextSection";
import { ResearchProgramCard } from "./sections/ResearchProgramCard";
import { MoonshotsFeature } from "./MoonshotsFeature";
import { institutionalChildRoutes } from "./institutionalRoutes";
import { ArchitectureProjectionSection } from "./ArchitectureProjectionSection";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalResearchPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.researchPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.researchHero}
          eyebrow={<>RESEARCH</>}
          title={<>Research as executable, inspectable representation.</>}
          lead={<>Boundary First Labs develops theories, experiments, scientific models,
              formal artifacts, software, and working systems.</>}
          support={<>The Lab treats scientific modeling as a representation problem before it
              becomes a calculation problem: state, transformations, invariants, projections,
              evidence, authority, and repair should remain explicit enough to inspect. Execution
              can test a representation; it does not substitute for domain-native validation.</>}
          childLinks={institutionalChildRoutes.research}
          >
          <blockquote className={styles.researchQuestion}>
            <span>GOVERNING QUESTION</span>
            Can a scientific or engineered model be made explicit enough to execute, test,
            compare, criticize, and repair without erasing the native standards of the domain?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.researchGatewayBand}>
          <div className={styles.researchOrientation}>
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
                Status is shown so a reader does not have to infer confidence from tone,
                credentials, design, or institutional authority.
              </p>
            </div>
            <div className={styles.orientationRule}>
              <span className={styles.routeSignal} aria-hidden="true" />
              <strong>SOURCE-GOVERNED STATUS</strong>
              <p>Visible state is descriptive, not a score or endorsement.</p>
            </div>
          </div>

          <aside className={styles.researchPublicationsFeature}>
            <p className={styles.sectionIndex}>PUBLICATIONS</p>
            <h2>Read the argument. Inspect the machinery behind it.</h2>
            <p>
              Working papers, technical reports, formal specifications, experiment reports,
              reference implementations, and Research Deployment Packets remain connected to
              their source and status.
            </p>
            <div className={styles.researchPublicationsActions}>
              <Link href="/publications">
                Explore Publications <span aria-hidden="true">→</span>
              </Link>
              <Link href="/research/paper-mine">
                Open Paper Mine <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </section>

        <ArchitectureProjectionSection
          eyebrow="BEHIND THE PAPER"
          title="A research result is one projection of a larger object."
          copy={[
            "A serious research lane may contain governing questions, definitions, claims, sources, experiments, code, datasets, counterexamples, open defects, formal artifacts, publications, and revision history.",
            "Boundary First Labs uses the Research Lane as a continuity spine for that work. A paper may summarize the lane. It does not replace it.",
          ]}
          variant="research-lane"
          pullLine="Research should increase the reader's ability to inspect the claim, not merely the reader's exposure to the claim."
        />

        <section className={styles.researchPrograms}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>ACTIVE SURFACES</>}
            title={<>Research programs and working lanes.</>}
            note={<>Common analytical roles do not imply formal equivalence across domains.</>}
          />

          <div className={styles.researchProgramGrid}>
            {programs.map((program) => (
              <ResearchProgramCard key={program.title} program={program} styles={styles} />
            ))}
          </div>
        </section>

        <MoonshotsFeature context="research" />

        <ResearchContextSection />
      </InstitutionalPageShell>
  );
}
