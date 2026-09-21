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
          title={<>A laboratory for the machinery beneath knowledge.</>}
          lead={<>Boundary First Labs is a founder-led, single-person applied systems
              laboratory and business. It studies how complex systems are represented,
              transformed, tested, measured, and made operational.</>}
          support={<>The Lab is computationally leveraged: software, automation, AI agents,
              repositories, and structured research machinery expand what one founder can
              inspect and build while decision authority, external commitments, and
              accountability remain with the founder. The technical question is paired with
              a human one: what happens to people&apos;s ability to understand, choose, contest,
              repair, and act when those representations become consequential?</>}
          childLinks={institutionalChildRoutes.about}
          >
          <blockquote className={styles.aboutAgencyQuestion}>
            <span>THE HUMAN QUESTION</span>
            What happens to human agency when a system&apos;s representation becomes operational?
          </blockquote>
        </InstitutionalRouteHero>

        <AboutReflowGroups />

        <section className={styles.aboutClose}>
          <p className={styles.sectionIndex}>THE LAB IN ONE SENTENCE</p>
          <h2>
            Boundary First Labs is a founder-led, single-person, computationally leveraged
            applied systems research laboratory and business studying the machinery by which
            knowledge is represented, transformed, tested, and made operational.
          </h2>
          <p>
            The deeper ambition: build systems that help people and institutions understand
            more clearly, act more capably, exercise power more accountably, and repair what fails.
          </p>
        </section>
      </InstitutionalPageShell>
  );
}
