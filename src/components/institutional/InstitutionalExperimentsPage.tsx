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
const publicCompletedExperiments = experimentRecords.filter((record) =>
  record.status.startsWith("completed"),
).length;
const publicPlannedExperiments = experimentRecords.filter((record) =>
  record.status.includes("planned"),
).length;

export function InstitutionalExperimentsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.experimentsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.experimentsHero}
        eyebrow={<>EXPERIMENTS</>}
        title={<>What has the Lab actually tested?</>}
        lead={
          <>
            Experiments include computational runs, formal stress tests, comparisons,
            simulations, replications, falsification attempts, operational tests, and negative
            or inconclusive results.
          </>
        }
        support={
          <>
            The Lab&apos;s register now contains {experimentProjection.registeredCount} durable
            experiment records. This page shows a smaller public sample in detail and points
            readers toward the research programs and tools that give those tests meaning.
          </>
        }
        childLinks={institutionalChildRoutes.experiments}
      >
        <div className={styles.sourcePanel}>
          <span>LAB-WIDE REGISTER</span>
          <strong>{experimentProjection.registeredCount} durable EXP-* records</strong>
          <p>{experimentProjection.sourceStatus}</p>
          <dl>
            <div>
              <dt>PUBLIC SAMPLE</dt>
              <dd>{experimentRecords.length} detailed records</dd>
            </div>
            <div>
              <dt>REGISTERED RESEARCH LANES</dt>
              <dd>{experimentProjection.registeredLaneCount}</dd>
            </div>
          </dl>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>HOW TO READ AN EXPERIMENT</span>
        <strong>A test only means something relative to the question it was designed to answer.</strong>
        <p>
          The register preserves identity, status, source, and evidence links. The owning
          research program, product, project, or tool provides the actual question, method,
          controls, and interpretation.
        </p>
      </section>

      <section className={styles.surveySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>EXPERIMENT RECORD</>}
          title={<>A test should expose the question, method, result, and limits.</>}
          note={<>The register keeps tests durable; the surrounding research context explains why they matter.</>}
        />

        <div className={styles.surveyGrid}>
          <article>
            <span>WHAT IT IS</span>
            <h3>A specific test with a stated scope.</h3>
            <p>
              A computational run, formal stress test, comparison, simulation, control,
              falsification attempt, or planned test with a stated success or failure condition.
            </p>
          </article>
          <article>
            <span>WHERE IT BELONGS</span>
            <h3>Attached to the work it is testing.</h3>
            <p>
              Research programs own scientific questions. Products and projects own operational
              tests. Lab tools own implementation and conformance checks.
            </p>
          </article>
          <article>
            <span>WHAT THIS PAGE DOES</span>
            <h3>A public sample, not the whole register.</h3>
            <p>
              This page reports the Lab-wide register size and presents a smaller detailed
              sample. The complete register remains in the Lab repository.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.scopeSection}>
        <div>
          <p className={styles.sectionIndex}>CURRENT REGISTER</p>
          <h2>The experiment register now spans dozens of tests across multiple research programs.</h2>
        </div>
        <div className={styles.scopeGrid}>
          <article>
            <span>REGISTERED EXPERIMENTS</span>
            <strong>{experimentProjection.registeredCount}</strong>
            <p>{experimentProjection.completedCount} completed · {experimentProjection.plannedCount} planned · {experimentProjection.otherCount} other active states</p>
          </article>
          <article>
            <span>DETAILED PUBLIC SAMPLE</span>
            <strong>{experimentRecords.length}</strong>
            <p>{publicCompletedExperiments} completed · {publicPlannedExperiments} planned or partially planned</p>
          </article>
          <article>
            <span>REGISTERED RESEARCH LANES</span>
            <strong>{experimentProjection.registeredLaneCount}</strong>
            <p>Current register entries resolve across {experimentProjection.registeredLaneCount} durable research-lane identities where ownership has been assigned.</p>
          </article>
        </div>
      </section>

      <section className={styles.liveLabsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>LIVE LABS</>}
          title={<>Two interactive experiment surfaces can be entered directly.</>}
          note={<>These are hands-on Lab tools, not a complete catalog of registered experiments.</>}
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
          <p className={styles.sectionIndex}>WHERE EXPERIMENTS BELONG</p>
          <h2>Keep detailed experiment records beside the question they were designed to test.</h2>
          <p>
            This page remains the Lab-wide orientation layer. Research, product, project, and
            apparatus pages should carry the detailed experiments that directly support or
            challenge their own claims.
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
