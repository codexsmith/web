import Link from "next/link";
import { ArchitectureProjectionSection } from "./ArchitectureProjectionSection";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import {
  observatoryBoundary,
  observatoryLensGroups,
  observatoryRoles,
} from "./content/observatory";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Observatory.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalObservatoryPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.observatoryPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.observatoryHero}
        eyebrow={<>OBSERVATORY</>}
        title={<>A public window into the current state of the Lab.</>}
        lead={
          <>
            Explore the research, maps, experiments, evidence, machinery, and history behind
            Boundary First Labs without learning the internal filing system first.
          </>
        }
        support={
          <>
            The Observatory is an inspection layer, not a new source of truth. It helps you
            find the object, follow declared relationships, and increase resolution while
            authority remains with the owning research, product, publication, or operational
            source.
          </>
        }
        childLinks={institutionalChildRoutes.observatory}
      >
        <aside className={styles.observatoryHeroNote}>
          <span>PUBLIC INSPECTION SURFACE</span>
          <strong>Start with the map. Descend only when you need more resolution.</strong>
          <p>
            The Registrar tells us what exists. Atlases map selected structures. Apparatus
            operates. Observatory lets people look. Open Lab lets them answer back.
          </p>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.roleSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT EACH LAYER DOES</>}
          title={<>Six roles. One institution.</>}
          note={
            <>
              These roles connect, but they should not collapse into one another. A map is not
              the thing it maps; an instrument is not the authority it observes.
            </>
          }
        />

        <div className={styles.roleGrid}>
          {observatoryRoles.map((role) => (
            <article
              className={styles.roleCard}
              data-current={role.current ? "true" : "false"}
              key={role.label}
            >
              <span>{role.verb}</span>
              <h3>{role.label}</h3>
              <p>{role.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <ArchitectureProjectionSection
        eyebrow="HOW INSPECTION STAYS BOUNDED"
        title="Address the work without moving its authority into the website."
        copy={[
          "Source-owned work stays in its responsible home. Registrar and registry machinery make durable objects addressable; public projections select and compress only what is appropriate to show.",
          "The Observatory sits over that structure as a read-and-derive surface. It can reveal state, relationships, omissions, and routes to deeper objects without promoting a claim or rewriting the source.",
        ]}
        variant="registrar-overview"
        pullLine="Observatory observes. Owners own."
      />

      <section className={styles.lensSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CHOOSE A LENS</>}
          title={<>Inspect the question you actually have.</>}
          note={
            <>
              Existing pages remain canonical public deep links. The Observatory gives them a
              shared parent so you do not have to infer how they fit together.
            </>
          }
        />

        <div className={styles.lensGrid}>
          {observatoryLensGroups.map((group) => (
            <article className={styles.lensCard} data-lens={group.id} key={group.id}>
              <span>{group.eyebrow}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <nav aria-label={group.eyebrow + " Observatory routes"}>
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </nav>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.boundarySection}>
        <div>
          <p className={styles.sectionIndex}>{observatoryBoundary.eyebrow}</p>
          <h2>{observatoryBoundary.title}</h2>
          <p>{observatoryBoundary.description}</p>
        </div>

        <nav className={styles.boundaryActions} aria-label="Observatory participation boundary">
          <Link href="/open-lab">
            Talk back through Open Lab
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/collaboration">
            Explore collaboration
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
