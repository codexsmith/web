import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { changesProjection, recentChanges } from "./content/changes";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Changes.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalChangesPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.changesPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.changesHero}
        eyebrow={<>WHAT CHANGED?</>}
        title={<>State changes, not activity theater.</>}
        lead={
          <>
            A dated public delta stream for material changes to the Lab corpus and its
            institutional interface.
          </>
        }
        support={
          <>
            This is not every commit, task, or idea. It is a curated projection of changes
            that altered canonical state, public legibility, research continuity, or
            institutional machinery.
          </>
        }
        childLinks={institutionalChildRoutes.changes}
      >
        <aside className={styles.projectionPanel}>
          <span>SOURCE-BOUND DELTA SNAPSHOT</span>
          <strong>{recentChanges.length} material changes in the current public window</strong>
          <dl>
            <div>
              <dt>WEB HEAD</dt>
              <dd>{changesProjection.webRevision.slice(0, 12)}</dd>
            </div>
            <div>
              <dt>LAB HEAD</dt>
              <dd>{changesProjection.labRevision.slice(0, 12)}</dd>
            </div>
          </dl>
          <p>{changesProjection.authority}</p>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.changeBoundary}>
        <span>DELTA RULE</span>
        <strong>Changed means canonical state moved.</strong>
        <p>
          CSS polish, intermediate replay commits, queue motion, and speculative notes are not
          automatically public changes. A record belongs here when it materially changes what
          exists, what is canonical, what is publicly inspectable, or what another person can
          now do.
        </p>
      </section>

      <section className={styles.changeCatalog}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>RECENT MATERIAL DELTAS</>}
          title={<>A small state-transition log over a large moving corpus.</>}
          note={
            <>
              Each item points back to an exact repository revision. Interpretation remains
              bounded to what that revision actually changed.
            </>
          }
        />

        <div className={styles.changeStack}>
          {recentChanges.map((change) => (
            <article className={styles.changeCard} data-scope={change.scope} key={change.id}>
              <div className={styles.changeTopline}>
                <span>{change.scope}</span>
                <time dateTime={change.date}>{change.date}</time>
              </div>
              <h2>{change.title}</h2>
              <p>{change.summary}</p>
              <div className={styles.consequence}>
                <span>WHAT CHANGED IN PRACTICE</span>
                <p>{change.consequence}</p>
              </div>
              <div className={styles.provenance}>
                <div>
                  <span>REPOSITORY</span>
                  <strong>{change.sourceRepository}</strong>
                </div>
                <div>
                  <span>REVISION</span>
                  <code>{change.sourceRevision}</code>
                </div>
              </div>
              <nav aria-label={"Links for " + change.title}>
                <a href={change.sourceHref} target="_blank" rel="noreferrer">
                  Inspect source revision <span aria-hidden="true">→</span>
                </a>
                {change.surfaceHref ? (
                  <a href={change.surfaceHref}>
                    Open public surface <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </nav>
            </article>
          ))}
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
