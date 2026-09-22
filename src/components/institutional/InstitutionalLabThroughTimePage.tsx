import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { TemporalViewNav } from "./TemporalViewNav";
import { labTimelineEvents, publicStateProjection } from "./content/publicState";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/LabThroughTime.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalLabThroughTimePage() {
  return (
    <InstitutionalPageShell mainClassName={styles.timelinePage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.timelineHero}
        eyebrow={<>LAB THROUGH TIME — PUBLIC PROVENANCE SEED</>}
        title={<>The Lab has a history.</>}
        lead={
          <>
            A long-horizon, source-bound timeline of consequential milestones in the work
            that became Boundary First Labs.
          </>
        }
        support={
          <>
            This first public projection is intentionally conservative. It renders only the
            durable events currently admitted into the canonical Lab Timeline Register.
            Five events are a seed, not the complete history.
          </>
        }
        childLinks={institutionalChildRoutes.labThroughTime}
      >
        <aside className={styles.timelineProjectionPanel}>
          <span>PUBLIC TIMELINE PROJECTION</span>
          <strong>{labTimelineEvents.length} reviewed durable events in the current seed</strong>
          <dl>
            <div>
              <dt>LAB REVISION</dt>
              <dd>{publicStateProjection.labRevision.slice(0, 12)}</dd>
            </div>
            <div>
              <dt>TIMELINE STATE</dt>
              <dd>{publicStateProjection.timeline.registerStatus}</dd>
            </div>
            <div>
              <dt>PROJECTION MODE</dt>
              <dd>{publicStateProjection.projectionStatus}</dd>
            </div>
          </dl>
          <p>{publicStateProjection.timeline.authorityCeiling}</p>
        </aside>
      </InstitutionalRouteHero>

      <TemporalViewNav activeView="timeline" />

      <section className={styles.timelineBoundary}>
        <span>LONG-HORIZON RULE</span>
        <strong>Milestones, not a long changelog.</strong>
        <p>
          Timeline membership means the Lab has admitted a durable temporal witness with
          source provenance. It does not turn chronology into causation, or a historical
          milestone into scientific validation, product readiness, or external recognition.
        </p>
      </section>

      <section className={styles.timelineCatalog}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CURRENT DURABLE SEED</>}
          title={<>A small temporal spine over a much larger history.</>}
          note={
            <>
              The seed deliberately preserves uncertainty. Approximate dates remain
              approximate; unresolved provenance remains visible until the source machinery
              earns a stronger statement.
            </>
          }
        />

        <div className={styles.timelineStack}>
          {labTimelineEvents.map((event, index) => (
            <article
              className={styles.timelineEvent}
              data-category={event.category}
              key={event.id}
            >
              <div className={styles.timelineRail}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{event.period}</time>
              </div>

              <div className={styles.timelineBody}>
                <div className={styles.timelineTopline}>
                  <span>{event.category}</span>
                  <code>{event.id}</code>
                </div>
                <h2>{event.title}</h2>
                <p>{event.summary}</p>

                <div className={styles.timelineMeta}>
                  <div>
                    <span>EVIDENCE POSTURE</span>
                    <strong>{event.epistemicStatus}</strong>
                  </div>
                  <div>
                    <span>SOURCE EVENT</span>
                    <strong>{event.sourceEventId}</strong>
                  </div>
                  <div>
                    <span>AFFECTED SYSTEMS</span>
                    <strong>{event.affectedSystems.join(" · ")}</strong>
                  </div>
                </div>

                {event.unresolved ? (
                  <div className={styles.timelineOpen}>
                    <span>OPEN PROVENANCE</span>
                    <p>{event.unresolved}</p>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.continuitySection}>
        <div>
          <p className={styles.sectionIndex}>CONTINUITY BEFORE THE CURRENT ACCELERATION</p>
          <h2>Four admitted milestones precede the 2026 institutionalization event.</h2>
          <p>
            That is already enough to show a dated continuity spine extending well before
            the current public Lab. It is not enough to tell the whole story. The next
            projection pass should recover additional reviewed events and attach approved
            primary artifacts where they exist.
          </p>
        </div>

        <aside>
          <span>NEXT PROJECTION WORK</span>
          <ul>
            <li>Recover additional Timeline events from the longer provenance sources.</li>
            <li>Attach public-safe photographs, documents, diagrams, code, and other evidence.</li>
            <li>
              Mark the computational-acceleration boundary only when the admitted source
              evidence supports a precise public statement.
            </li>
          </ul>
        </aside>
      </section>

      <section className={styles.timelineClose}>
        <p className={styles.sectionIndex}>THREE TIME SCALES</p>
        <h2>Recent motion. Present posture. Long memory.</h2>
        <p>
          <strong>What Changed</strong> records consequential recent transitions.{" "}
          <strong>Now</strong> projects current priorities and closure conditions.{" "}
          <strong>Lab Through Time</strong> preserves the longer provenance spine that
          explains how the current institution accumulated.
        </p>
        <nav aria-label="Temporal views">
          <Link href="/changes">What Changed <span aria-hidden="true">→</span></Link>
          <Link href="/now">Now <span aria-hidden="true">→</span></Link>
          <Link href="/founder">Founder <span aria-hidden="true">→</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
