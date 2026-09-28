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
              A software engineer spent fifteen years studying mathematics and physics.
              Boundary First Labs grew out of the convergence.
            </>
          }
          lead={
            <>
              Boundary First Labs is a solo, technical-founder-led applied systems laboratory
              and business: AI-enabled, digital-first, and engineered as an executable
              institutional machine. It studies how complex systems are represented,
              transformed, tested, measured, repaired, and made operational.
            </>
          }
          support={
            <>
              The organization itself is part of the engineering problem. Research lanes,
              claims, experiments, software, products, provenance, work state, and authority
              are represented as inspectable objects that repositories, automation, and AI
              agents can help operate. That lets one founder work across an unusually broad
              surface without pretending the machine replaces human judgment, scientific
              validation, promotion authority, or external accountability.
            </>
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
