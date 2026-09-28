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
          title={<>Boundary First Labs.</>}
          lead={
            <>
              Boundary First Labs is a solo, technical-founder-led applied systems laboratory
              and business: AI-enabled, digital-first, and engineered as an executable
              institutional machine. Research, software, methods, products, operations,
              provenance, work state, and decision authority are represented as inspectable
              machinery rather than left as tacit founder memory.
            </>
          }
          support={
            <>
              The through-line is concrete: a software engineer spent roughly fifteen years
              studying mathematics and physics while also building software, data systems,
              startups, and public infrastructure. BFL grew from that convergence. Computation,
              repositories, automation, and AI agents extend what one person can inspect and
              build, while human judgment, promotion authority, and external accountability
              remain explicit.
            </>
          }
        }
          childLinks={institutionalChildRoutes.about}
          >
          <blockquote className={styles.aboutAgencyQuestion}>
            <span>THE HUMAN QUESTION</span>
            What happens to human agency when a system&apos;s representation becomes operational?
          </blockquote>
        </InstitutionalRouteHero>

        <AboutReflowGroups />

      </InstitutionalPageShell>
  );
}
