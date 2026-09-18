import Link from "next/link";
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

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalStartPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.startPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.startHero}
        eyebrow={<>START HERE / AUDIENCE PATHS</>}
        title={<>You do not need to understand the whole Lab first.</>}
        lead={
          <>
            Choose what you came here to do. Each path reorders the same public Lab around a
            different question: evaluate it, use it, fund it, work with it, challenge it, or
            simply understand it.
          </>
        }
        support={
          <>
            These are suggested traversals, not separate versions of the institution.
            Nothing changes truth, status, evidence, or authority because a different
            audience entered through a different door.
          </>
        }
      >
        <aside className={styles.pathIndex}>
          <span>SEVEN WAYS IN</span>
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
          eyebrow={<>TRAVERSAL CONTRACT</>}
          title={<>Different questions. One underlying institution.</>}
          note={
            <>
              Audience routing is a navigation convenience. It must never become audience-specific
              claims, hidden evidence, or a forked representation of Lab state.
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
          eyebrow={<>CHOOSE YOUR PATH</>}
          title={<>Start with intent, then follow the smallest useful sequence.</>}
          note={
            <>
              Each step is an ordinary public route. The sequence is meant to reduce orientation
              cost, not constrain exploration.
            </>
          }
        />

        <AudienceJourneyGrid journeys={audienceJourneys} />
      </section>

      <section className={styles.startClose}>
        <p className={styles.sectionIndex}>NONE OF THESE FIT?</p>
        <h2>Search the Lab, or just tell us why you are here.</h2>
        <p>
          The global search can jump directly to public objects and pages. General contact is
          also valid when the institutional lane is not obvious yet.
        </p>
        <div>
          <Link href="/v3/atlas">Browse the Lab Atlas <span aria-hidden="true">→</span></Link>
          <Link href="/v3/contact?type=general&source=start">General contact <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
