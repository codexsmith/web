import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/About.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { AboutReflowGroups } from "./sections/AboutReflowGroups";
import { institutionalChildRoutes } from "./institutionalRoutes";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAboutPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.aboutPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.aboutHero}
          eyebrow={<>ABOUT BOUNDARY FIRST LABS</>}
          title={
            <>
              A practice-born lab for scientific software modeling, executable representation,
              and consequential systems.
            </>
          }
          lead={<>Software Before Code is the center doctrine. Boundary-First Engineering is the practice used to construct, execute, test, and repair bounded models of real systems.</>}
          support={<>The work grew from software delivery and consulting, then expanded through mathematics, physics, scientific method, formal grammars, and agentic computation. The recurring question is what a representation must preserve for the next lawful transformation to remain adequate under consequence.</>}
          childLinks={institutionalChildRoutes.about}
          >
          <blockquote className={styles.aboutAgencyQuestion}>
            <span>THE HUMAN QUESTION</span>
            What happens to human agency when a system&apos;s representation becomes operational?
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.aboutOperatingModel}>
          <div className={styles.aboutOperatingLead}>
            <p className={styles.sectionIndex}>THE OPERATING MODEL</p>
            <h2>Solo by headcount. Institutional by design.</h2>
          </div>

          <div className={styles.aboutOperatingCopy}>
            <p>
              Boundary First Labs is a solo, technical-founder-led applied systems laboratory
              and business: AI-enabled, digital-native, and engineered as an executable
              institutional machine. It was not first built as a conventional institution and
              later mirrored in software; its institutional machinery is computationally
              represented by construction.
            </p>
            <p>
              That makes the Lab different from a digital twin. A twin is a representation of
              something that exists elsewhere. Here, governed state, provenance, work,
              experiments, claims, authority, validation, and projection are part of how the
              institution operates. Websites, dashboards, reports, graphs, and simulations are
              projections over that state rather than substitutes for it.
            </p>
            <p>
              The organization itself is part of the engineering problem. Research lanes,
              claims, experiments, software, products, provenance, work state, and authority
              are represented as inspectable objects that repositories, automation, and AI
              agents can help operate. That lets one founder work across an unusually broad
              surface without pretending the machine replaces human judgment, scientific
              validation, promotion authority, or external accountability.
            </p>
            <p>
              Boundary First Labs is the fourth startup its founder has been involved in.
              Earlier startup work supplied practical experience with product formation,
              technical delivery, customer-facing systems, and the difference between having
              an idea and building an institution that can repeatedly execute on it.
            </p>
          </div>
        </section>

        <AboutReflowGroups />

      </InstitutionalPageShell>
  );
}
