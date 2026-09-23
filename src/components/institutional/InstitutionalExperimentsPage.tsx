import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { experimentProjection, experimentRecords } from "./content/experiments";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Experiments.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

const experimentPrograms = [...new Set(experimentRecords.map((record) => record.program))];
const experimentLanes = [
  ...new Map(
    experimentRecords
      .flatMap((record) => record.researchLanes)
      .map((lane) => [lane.laneId, lane.label] as const),
  ).entries(),
];
const completedExperiments = experimentRecords.filter((record) =>
  record.status.startsWith("completed"),
).length;
const plannedExperiments = experimentRecords.filter((record) =>
  record.status.includes("planned"),
).length;

export function InstitutionalExperimentsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.experimentsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.experimentsHero}
        eyebrow={<>EXPERIMENTS</>}
        title={<>How does the Lab test its work?</>}
        lead={
          <>
            Experiments are bounded operations attached to research programs, products,
            projects, or apparatus. Their meaning comes from the thing being tested.
          </>
        }
        support={
          <>
            This page is the survey and scope boundary for Experiment objects. Detailed
            experiment lists will live with their owning research lanes and operating surfaces.
          </>
        }
        childLinks={institutionalChildRoutes.experiments}
      >
        <div className={styles.sourcePanel}>
          <span>CURRENT RECOVERY</span>
          <strong>{experimentRecords.length} durable EXP-* records</strong>
          <p>{experimentProjection.sourceStatus}</p>
          <dl>
            <div>
              <dt>PROGRAMS</dt>
              <dd>{experimentPrograms.length}</dd>
            </div>
            <div>
              <dt>RESEARCH LANES</dt>
              <dd>{experimentLanes.length}</dd>
            </div>
          </dl>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>SCOPE RULE</span>
        <strong>An experiment is not meaningful in isolation.</strong>
        <p>
          Registration preserves identity, status, provenance, and evidence routing. The
          owning lane, product, project, or apparatus supplies the question, boundary, and
          interpretation.
        </p>
      </section>

      <section className={styles.surveySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>EXPERIMENT OBJECT</>}
          title={<>A test belongs to the system that gives it a question.</>}
          note={<>The global route explains the object family. Contextual routes will carry the records.</>}
        />

        <div className={styles.surveyGrid}>
          <article>
            <span>WHAT IT IS</span>
            <h3>Bounded test.</h3>
            <p>
              A computational run, formal stress test, comparison, simulation, control,
              falsification attempt, or planned test with an explicit predicate.
            </p>
          </article>
          <article>
            <span>WHERE IT BELONGS</span>
            <h3>Attached to an owner.</h3>
            <p>
              Research lanes own scientific questions. Products and projects own operational
              tests. Apparatus owns instrument behavior and conformance checks.
            </p>
          </article>
          <article>
            <span>WHAT THIS PAGE DOES</span>
            <h3>Survey, not flat catalog.</h3>
            <p>
              This route defines the object family, reports recovered scope, and points toward
              the contexts where experiment records will be inspected.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.scopeSection}>
        <div>
          <p className={styles.sectionIndex}>CURRENT RECOVERED SCOPE</p>
          <h2>The register already crosses multiple programs and lanes.</h2>
        </div>
        <div className={styles.scopeGrid}>
          <article>
            <span>RECORDS</span>
            <strong>{experimentRecords.length}</strong>
            <p>{completedExperiments} completed · {plannedExperiments} planned or partially planned</p>
          </article>
          <article>
            <span>PROGRAMS</span>
            <strong>{experimentPrograms.length}</strong>
            <p>{experimentPrograms.join(" · ")}</p>
          </article>
          <article>
            <span>LANES</span>
            <strong>{experimentLanes.length}</strong>
            <p>{experimentLanes.map(([id, label]) => `${id} · ${label}`).join(" · ")}</p>
          </article>
        </div>
      </section>

      <section className={styles.liveLabsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>LIVE LABS</>}
          title={<>Two experiment surfaces can be entered directly.</>}
          note={<>These are apparatus surfaces, not the global experiment catalog.</>}
        />

        <div className={styles.liveLabsGrid}>
          <Link className={styles.liveLabCard} href="/labs/distinction-space">
            <span>VISUAL MATHEMATICS</span>
            <h3>Distinction Space Visual Lab</h3>
            <p>Bounded dynamics, closure, defect, and higher-dimensional structure.</p>
            <strong>Enter visual lab <span aria-hidden="true">-&gt;</span></strong>
          </Link>

          <Link className={styles.liveLabCard} href="/labs/representation-lab">
            <span>REPRESENTATION / AI</span>
            <h3>Same World, Different Reasoner</h3>
            <p>One grid world; changing task, reasoning method, inputs, and representation.</p>
            <strong>Enter representation lab <span aria-hidden="true">-&gt;</span></strong>
          </Link>
        </div>
      </section>

      <section className={styles.placementSection}>
        <div>
          <p className={styles.sectionIndex}>NEXT PLACEMENT PASS</p>
          <h2>Put experiment records where the research question lives.</h2>
          <p>
            The next pass will attach filtered experiment lists to research lanes, products,
            and projects rather than asking this global route to carry every record.
          </p>
        </div>
        <nav aria-label="Experiment placement destinations">
          <Link href="/research">Research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/products">Products <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">Projects <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/apparatus">Apparatus <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
