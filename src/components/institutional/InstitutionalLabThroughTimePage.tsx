import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { TemporalViewNav } from "./TemporalViewNav";
import { LabTimelineExplorer } from "./LabTimelineExplorer";
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

        <LabTimelineExplorer />
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

      <section className={styles.accelerationSection}>
        <div className={styles.accelerationLead}>
          <p className={styles.sectionIndex}>THE ACCELERATION BOUNDARY</p>
          <h2>Commercial AI changed the throughput, not the starting point.</h2>
          <p>
            By the time capable commercial language models became broadly usable, the founder
            was not encountering AI, software systems, or research practice for the first time.
            Georgia Tech training had already combined computer science, AI, systems,
            architecture, and academic research; professional work added years of building and
            delivering software under production constraints; and independent research had
            already accumulated a substantial pre-generative-AI corpus.
          </p>
        </div>

        <div className={styles.accelerationGrid}>
          <article>
            <span>01 · TECHNICAL FORMATION</span>
            <strong>Georgia Tech: CS, AI, systems, architecture, research.</strong>
            <p>
              Formal training and undergraduate research supplied machine models, research
              discipline, and repeated practice testing claims against observed behavior.
            </p>
          </article>

          <article>
            <span>02 · PROFESSIONAL PRACTICE</span>
            <strong>Software made representation mechanically consequential.</strong>
            <p>
              Production engineering, consulting, architecture, Lean/Agile practice, and
              real delivery constraints turned questions of state, ownership, failure, and
              repair into everyday operating problems.
            </p>
          </article>

          <article>
            <span>03 · COMMERCIAL AI ARRIVES</span>
            <strong>A prepared operator met a new class of leverage.</strong>
            <p>
              Language models added representational throughput: faster compilation,
              comparison, search, synthesis, translation, and orchestration across a corpus
              and software environment that already existed.
            </p>
          </article>
        </div>

        <details className={styles.accelerationDetail}>
          <summary>
            <span>WHY THIS MATTERS TO THE CURRENT LAB</span>
            <strong>The preparation was unusually well matched to the tool.</strong>
            <small>Expand provenance interpretation</small>
          </summary>
          <div>
            <p>
              The current Boundary First Labs operating model depends on that convergence.
              Research training made model outputs something to interrogate rather than
              simply accept. AI and systems education made the computational substrate
              legible. Professional software practice made automation, decomposition,
              interfaces, state, testing, and failure familiar engineering concerns.
              Independent research supplied years of accumulated questions, artifacts,
              terminology, diagrams, code, and partially formalized structure waiting to be
              compiled and connected.
            </p>
            <p>
              Commercial AI therefore did not create the research program from an empty
              prompt. It changed the economics and speed of working with an unusually large
              pre-existing body of thought. Tasks that once required repeated manual
              transcription, comparison, indexing, drafting, and cross-referencing could be
              delegated to computational machinery while the founder retained responsibility
              for framing, judgment, promotion, correction, and external commitments.
            </p>
            <blockquote>
              The narrower provenance claim is not “AI generated the Lab.” It is that a
              founder already trained in AI and research, seasoned in professional systems
              engineering, and carrying a long independent research corpus was unusually
              ready to turn capable commercial AI into laboratory machinery.
            </blockquote>
            <p>
              That acceleration explains how a single-person, founder-led organization can
              now maintain a much larger research and engineering surface than headcount
              alone would suggest. It does not validate the Lab&apos;s scientific claims;
              those still have to survive evidence, criticism, comparison, and use.
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
