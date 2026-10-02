import Link from "next/link";
import { publicContactMailto } from "@/lib/site-contact";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { AudienceJourneyGrid } from "./AudienceJourneyGrid";
import {
  audienceJourneys,
  audienceTraversalPrinciples,
} from "./content/audiences";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Start.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { institutionalChildRoutes } from "./institutionalRoutes";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalStartPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.startPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.startHero}
        eyebrow={<>START HERE</>}
        title={<>What are you here to do?</>}
        lead={
          <>
            You do not need to understand the whole Lab first. Choose the question closest to
            yours—evaluate the research, solve a systems problem, collaborate, fund a specific
            piece of work, challenge a claim, or simply explore.
          </>
        }
        support={
          <>
            Every path leads through the same public research, products, evidence, and current
            work. The order changes to save you time; the underlying record does not.
          </>
        }
        childLinks={institutionalChildRoutes.start}
      >
        <aside className={styles.pathIndex}>
          <span>CHOOSE A STARTING POINT</span>
          <nav aria-label="Audience path index">
            {audienceJourneys.map((journey) => (
              <a href={"#" + journey.id} key={journey.id}>
                {journey.shortLabel}
              </a>
            ))}
          </nav>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.principlesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW THESE PATHS WORK</>}
          title={<>Different needs. The same underlying Lab.</>}
          note={
            <>
              These paths only change the order in which pages are suggested. They do not create
              different versions of the research, evidence, products, or institutional state.
            </>
          }
        />

        <div className={styles.principleGrid}>
          {audienceTraversalPrinciples.map((principle) => (
            <article key={principle.label}>
              <span>{principle.label}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.journeysSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PICK THE PATH THAT FITS</>}
          title={<>Start with the smallest useful sequence.</>}
          note={
            <>
              Each suggestion is an ordinary public page. Follow the sequence if it helps, or
              branch anywhere once you find the object or question you care about.
            </>
          }
        />

        <AudienceJourneyGrid journeys={audienceJourneys} />
      </section>

      <section className={styles.startClose}>
        <p className={styles.sectionIndex}>NONE OF THESE FIT?</p>
        <h2>Browse freely, or tell us what you are trying to do.</h2>
        <p>
          The Lab Atlas can help you browse public work directly. General contact is also fine
          when you know the problem or question but not which BFL page it belongs on.
        </p>
        <div>
          <Link href="/atlas">Browse the Lab Atlas <span aria-hidden="true">→</span></Link>
          <a href={publicContactMailto("Boundary First Labs — General inquiry")}>General contact <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
