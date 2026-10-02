import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { TemporalViewNav } from "./TemporalViewNav";
import { LabTimelineExplorer } from "./LabTimelineExplorer";
import { ProvenanceArtifactGallery } from "./ProvenanceArtifactGallery";
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
        eyebrow={<>LAB THROUGH TIME</>}
        title={<>How did Boundary First Labs get here?</>}
        lead={
          <>
            A selective history of the experiments, software practice, independent research,
            and institution-building that eventually became Boundary First Labs.
          </>
        }
        support={
          <>
            This public view contains five reviewed turning points from the Lab&apos;s canonical
            timeline. They show continuity across the work without pretending to be a complete
            biography or a complete history of every project.
          </>
        }
        childLinks={institutionalChildRoutes.labThroughTime}
      >
        <details className={styles.timelineProjectionPanel}>
          <summary>
            <span>TIMELINE SOURCE DETAILS</span>
            <strong>{labTimelineEvents.length} reviewed turning points in this public view</strong>
            <small>Inspect source and review status</small>
          </summary>
          <div className={styles.timelineProjectionDetails}>
            <dl>
              <div>
                <dt>LAB REVISION</dt>
                <dd>{publicStateProjection.labRevision.slice(0, 12)}</dd>
              </div>
              <div>
                <dt>SOURCE STATUS</dt>
                <dd>{publicStateProjection.timeline.registerStatus}</dd>
              </div>
              <div>
                <dt>WEB VIEW STATUS</dt>
                <dd>{publicStateProjection.projectionStatus}</dd>
              </div>
            </dl>
            <p>{publicStateProjection.timeline.authorityCeiling}</p>
          </div>
        </details>
      </InstitutionalRouteHero>

      <TemporalViewNav activeView="timeline" />

      <section className={styles.originBand} aria-label="How Boundary First Labs became practical">
        <article>
          <span>BEFORE</span>
          <strong>Research + systems practice already existed.</strong>
          <p>
            Academic research, professional engineering, and independent work predate the
            current institution.
          </p>
        </article>

        <div className={styles.originArrow} aria-hidden="true">→</div>

        <article>
          <span>ACCELERATION</span>
          <strong>AI lowers the cost of working across the corpus.</strong>
          <p>
            Search, comparison, coding, synthesis, and cross-referencing become fast enough
            to operate at corpus scale.
          </p>
        </article>

        <div className={styles.originArrow} aria-hidden="true">→</div>

        <article>
          <span>NOW</span>
          <strong>One founder can operate a much wider research surface.</strong>
          <p>
            AI and automation make it practical to search, compare, test, document, and
            maintain more of the Lab&apos;s work without pretending that software is a staff.
          </p>
        </article>
      </section>

      <section className={styles.authoritySplit} aria-label="Computational capability and human authority">
        <div>
          <span>COMPUTATIONAL CAPABILITY</span>
          <strong>Machines expand the workbench.</strong>
          <p>
            AI and automation can search, compare, draft, classify, execute bounded code,
            maintain registries, test machinery, and carry structured work across the corpus.
          </p>
        </div>

        <div>
          <span>HUMAN AUTHORITY</span>
          <strong>The founder remains responsible for consequential decisions.</strong>
          <p>
            AI and automation can perform substantial work, but the founder still decides
            what the Lab adopts, publishes, promises, funds, represents externally, or treats
            as an institutional commitment.
          </p>
        </div>
      </section>

      <section className={styles.timelineBoundary}>
        <span>WHAT BELONGS ON THIS TIMELINE?</span>
        <strong>Turning points, not every event.</strong>
        <p>
          A milestone appears here only after the Lab has reviewed it as part of its durable
          institutional history. Inclusion records that the event matters to the history; it
          does not prove that the event caused later work, validate a scientific claim, or
          establish product success or outside recognition.
        </p>
      </section>

      <section className={styles.timelineCatalog}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>FIVE TURNING POINTS</>}
          title={<>How the Lab took shape.</>}
          note={
            <>
              This is not a year-by-year biography. These are a few moments that changed how
              the work was approached, organized, tested, or carried forward.
            </>
          }
        />

        <aside className={styles.timelineStartupContext}>
          <span>STARTUP EXPERIENCE</span>
          <div>
            <strong>Boundary First Labs is the founder&apos;s fourth startup.</strong>
            <p>
              Earlier startup work brought repeated experience with product formation,
              technical delivery, customers, iteration, and the difference between building
              a project and building an organization that can keep executing.
            </p>
          </div>
        </aside>

        <LabTimelineExplorer />
      </section>

      <ProvenanceArtifactGallery />

      <section className={styles.accelerationSection}>
        <div className={styles.accelerationLead}>
          <p className={styles.sectionIndex}>WHAT AI CHANGED</p>
          <h2>AI changed the speed and scale of the work, not where it came from.</h2>
          <p>
            The chronology is the point. The room-scale research period and much of the
            underlying corpus predate the current AI-accelerated Lab. Commercial AI changed the
            cost of searching, comparing, coding, and reorganizing that material; it did not
            supply the starting point.
          </p>
        </div>

        <div className={styles.accelerationGrid}>
          <article>
            <span>01 · TECHNICAL FORMATION</span>
            <strong>Georgia Tech: CS, AI, systems, architecture, research.</strong>
            <p>
              Formal training and undergraduate research supplied computational models,
              research practice, and repeated contact with evidence.
            </p>
          </article>

          <article>
            <span>02 · PROFESSIONAL PRACTICE</span>
            <strong>Software made models consequential in practice.</strong>
            <p>
              Production systems made incomplete requirements, hidden state, ownership,
              failure, and repair practical engineering problems rather than abstract ideas.
            </p>
          </article>

          <article>
            <span>03 · COMMERCIAL AI ARRIVES</span>
            <strong>Existing skills met a new class of leverage.</strong>
            <p>
              Language models made comparison, translation, drafting, coding, and
              orchestration cheap enough to become routine laboratory operations.
            </p>
          </article>
        </div>

        <details className={styles.accelerationDetail}>
          <summary>
            <span>WHY THIS MATTERS TO THE CURRENT LAB</span>
            <strong>What changed was leverage, not authorship.</strong>
            <small>Expand the distinction</small>
          </summary>
          <div>
            <p>
              The sequence matters: training and engineering practice supplied judgment;
              independent research supplied the material; AI and automation lowered the cost
              of transforming, comparing, and coordinating it.
            </p>
            <p>
              That leverage helps explain the Lab&apos;s scale. It does not validate the
              research. Claims still have to survive evidence, comparison, criticism, and
              explicit human promotion.
            </p>
          </div>
        </details>
      </section>

      <section className={styles.timelineClose}>
        <p className={styles.sectionIndex}>THREE TIME SCALES</p>
        <h2>Recent changes. Current priorities. Long-term history.</h2>
        <p>
          <strong>What Changed</strong> records the latest material changes.{" "}
          <strong>Now</strong> shows what the Lab is prioritizing and what would count as
          progress. <strong>Lab Through Time</strong> preserves the longer history that
          explains how the current institution developed.
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
