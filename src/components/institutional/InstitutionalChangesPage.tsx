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
        title={<>What materially changed?</>}
        lead={
          <>
            A dated public record of changes that altered the Lab&apos;s research, methods,
            institution, or public interface.
          </>
        }
        support={
          <>
            This is not every commit, task, or idea. It highlights changes that materially
            changed what the Lab knows, how it works, what is publicly understandable, or
            what another person can now inspect or do.
          </>
        }
        childLinks={institutionalChildRoutes.changes}
      >
        <details className={styles.projectionPanel}>
          <summary>
            <span>ARCHIVE SNAPSHOT</span>
            <strong>{allChanges.length} material changes in the curated public archive</strong>
            <small>Inspect source details</small>
          </summary>
          <div className={styles.projectionDetails}>
            <dl>
              <div>
                <dt>WEB REVISION</dt>
                <dd>{changesProjection.webRevision.slice(0, 12)}</dd>
              </div>
              <div>
                <dt>LAB REVISION</dt>
                <dd>{changesProjection.labRevision.slice(0, 12)}</dd>
              </div>
              <div>
                <dt>ARCHIVE BUILD</dt>
                <dd>{changesProjection.generatedDate}</dd>
              </div>
            </dl>
            <p>{changesProjection.authority}</p>
          </div>
        </details>
      </InstitutionalRouteHero>

      <TemporalViewNav activeView="changes" />

      <section className={styles.changeBoundary}>
        <span>WHAT COUNTS AS A CHANGE?</span>
        <strong>A change belongs here when the Lab is meaningfully different afterward.</strong>
        <p>
          Routine polish, intermediate commits, task movement, and speculative notes do not
          automatically qualify. A record belongs here when it changes the durable research
          record, an institutional capability, a public explanation, or what another person
          can now inspect, test, use, or continue.
        </p>
      </section>

      <section className={styles.changeCatalog}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>MATERIAL CHANGE ARCHIVE</>}
          title={<>A curated history of changes that moved the Lab forward.</>}
          note={
            <>
              Each item points back to an exact repository revision. Recent entries are joined
              by selected earlier milestones so readers can follow institutional development
              without wading through a complete GitHub activity feed.
            </>
          }
        />

        <ChangesExplorer />
      </section>
    </InstitutionalPageShell>
  );
}
