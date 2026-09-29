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
        title={<>The Lab has a history.</>}
        lead={
          <>
            A long-horizon, source-bound timeline of consequential milestones in the work
            that became Boundary First Labs.
          </>
        }
        support={
          <>
            Five milestones mark the route from early experimental work to the current
            institution. The point is continuity, not completeness.
          </>
        }
        childLinks={institutionalChildRoutes.labThroughTime}
      >
        <details className={styles.timelineProjectionPanel}>
          <summary>
            <span>PUBLIC TIMELINE PROJECTION</span>
            <strong>{labTimelineEvents.length} reviewed durable events in the current seed</strong>
            <small>Inspect authority and source state</small>
          </summary>
          <div className={styles.timelineProjectionDetails}>
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
          <strong>One founder can operate a wider surface.</strong>
          <p>
            The leverage becomes a computational micro-lab with explicit machinery, not
            simulated organizational headcount.
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
          <strong>The founder retains the decision boundary.</strong>
          <p>
            The founder still decides what the Lab believes, promotes, publishes, promises,
            funds, represents externally, or treats as an institutional commitment.
          </p>
        </div>
      </section>

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
          <p className={styles.sectionIndex}>THE ACCELERATION BOUNDARY</p>
          <h2>Commercial AI changed the throughput, not the starting point.</h2>
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
            <strong>Software made representation mechanically consequential.</strong>
            <p>
              Production systems made state, ownership, failure, and repair practical
              engineering concerns rather than abstract vocabulary.
            </p>
          </article>

          <article>
            <span>03 · COMMERCIAL AI ARRIVES</span>
            <strong>A prepared operator met a new class of leverage.</strong>
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
