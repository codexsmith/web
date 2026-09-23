import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { allChanges, changesProjection } from "./content/changes";
import { institutionalChildRoutes } from "./institutionalRoutes";
import { TemporalViewNav } from "./TemporalViewNav";
import { ChangesExplorer } from "./ChangesExplorer";
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
        <details className={styles.projectionPanel}>
          <summary>
            <span>SOURCE-BOUND DELTA SNAPSHOT</span>
            <strong>{allChanges.length} material changes in the curated public archive</strong>
            <small>Inspect source binding</small>
          </summary>
          <div className={styles.projectionDetails}>
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
          </div>
        </details>
      </InstitutionalRouteHero>

      <TemporalViewNav activeView="changes" />

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
          eyebrow={<>MATERIAL DELTA ARCHIVE</>}
          title={<>A curated state-transition history over a large moving corpus.</>}
          note={
            <>
              Each item points back to an exact repository revision. Recent entries are joined
              by selected earlier milestones so the page can show institutional development
              without pretending to be a complete GitHub activity feed.
            </>
          }
        />

        <ChangesExplorer />
      </section>
    </InstitutionalPageShell>
  );
}
