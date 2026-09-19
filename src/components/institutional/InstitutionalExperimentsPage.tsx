import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { LabObjectIdentity } from "./LabObjectIdentity";
import { experimentProjection, experimentRecords } from "./content/experiments";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Experiments.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalExperimentsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.experimentsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.experimentsHero}
        eyebrow={<>EXPERIMENTS</>}
        title={<>What has the Lab actually tried?</>}
        lead={
          <>
            Experiments are bounded evidence-bearing operations: computational runs,
            formal stress tests, comparisons, simulations, controls, falsification attempts,
            and planned tests with explicit predicates.
          </>
        }
        support={
          <>
            This is a static public projection of the Lab-wide Experiment Register.
            Registration preserves identity, status, provenance, and evidence routing. It does
            not promote a scientific claim, turn a planned run into a completed one, or make a
            positive result dispositive.
          </>
        }
        childLinks={institutionalChildRoutes.experiments}
      >
        <div className={styles.sourcePanel}>
          <span>SOURCE-BOUND SNAPSHOT</span>
          <strong>{experimentRecords.length} durable EXP-* records</strong>
          <p>{experimentProjection.sourceStatus}</p>
          <dl>
            <div>
              <dt>REVISION</dt>
              <dd>{experimentProjection.sourceRevision.slice(0, 12)}</dd>
            </div>
            <div>
              <dt>DATED</dt>
              <dd>{experimentProjection.sourceRevisionDate}</dd>
            </div>
          </dl>
          <a
            href={experimentProjection.sourceHref}
            target="_blank"
            rel="noreferrer"
          >
            Inspect canonical register <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>REGISTER AUTHORITY</span>
        <strong>{experimentProjection.authority}</strong>
        <p>
          The website is a projection. Domain/project packages remain canonical owners of the
          experiments themselves, while the Lab-wide register owns durable cross-cutting
          identity and evidence routing.
        </p>
      </section>

      <section className={styles.catalogSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>SOURCE-BOUND EXPERIMENT RECORDS</>}
          title={<>Completed, planned, mixed, and provisional work stays visibly different.</>}
          note={
            <>
              Result posture is copied from the Lab register. No website scoring or maturity
              translation is applied.
            </>
          }
        />

        <div className={styles.experimentStack}>
          {experimentRecords.map((experiment) => (
            <article
              className={styles.experimentCard}
              id={"experiment-" + experiment.id.toLowerCase()}
              key={experiment.id}
            >
              <LabObjectIdentity
                kind="experiment"
                identifier={experiment.id}
                identifierLabel="EXPERIMENT"
                status={experiment.status}
                statusLabel="STATUS"
                secondary={experiment.resultPosture}
                secondaryLabel="RESULT POSTURE"
              />

              <div className={styles.experimentHeading}>
                <div>
                  <span>PROGRAM</span>
                  <strong>{experiment.program}</strong>
                </div>
                <h2>{experiment.title}</h2>
              </div>

              <div className={styles.laneRow}>
                {experiment.researchLanes.map((lane) => (
                  <div data-role={lane.role} key={experiment.id + "-" + lane.laneId}>
                    <span>{lane.role === "primary" ? "PRIMARY LANE" : "SECONDARY LANE"}</span>
                    <strong>{lane.laneId}</strong>
                    <small>{lane.label}</small>
                  </div>
                ))}
              </div>

              <div className={styles.questionBlock}>
                <span>QUESTION / PURPOSE</span>
                <p>{experiment.questionOrPurpose}</p>
              </div>

              <div className={styles.detailGrid}>
                {experiment.carrierOrTestbed ? (
                  <div>
                    <span>CARRIER / TESTBED</span>
                    <p>{experiment.carrierOrTestbed}</p>
                  </div>
                ) : null}
                {experiment.control ? (
                  <div>
                    <span>CONTROL</span>
                    <p>{experiment.control}</p>
                  </div>
                ) : null}
                {experiment.method ? (
                  <div>
                    <span>METHOD</span>
                    <p>{experiment.method}</p>
                  </div>
                ) : null}
                {experiment.acceptancePredicate ? (
                  <div>
                    <span>ACCEPTANCE PREDICATE</span>
                    <p>{experiment.acceptancePredicate}</p>
                  </div>
                ) : null}
                {experiment.resultSummary ? (
                  <div className={styles.resultBlock}>
                    <span>RESULT SUMMARY</span>
                    <p>{experiment.resultSummary}</p>
                  </div>
                ) : null}
                {experiment.limitations ? (
                  <div className={styles.limitationsBlock}>
                    <span>LIMITATIONS</span>
                    <p>{experiment.limitations}</p>
                  </div>
                ) : null}
              </div>

              <div className={styles.provenanceGrid}>
                <div>
                  <span>CANONICAL SOURCE</span>
                  <code>{experiment.canonicalSource}</code>
                </div>
                {experiment.implementation ? (
                  <div>
                    <span>IMPLEMENTATION</span>
                    <code>{experiment.implementation}</code>
                  </div>
                ) : null}
                {experiment.evidence ? (
                  <div>
                    <span>EVIDENCE</span>
                    <p>{experiment.evidence}</p>
                  </div>
                ) : null}
                {experiment.nextOperation ? (
                  <div>
                    <span>NEXT DISCRIMINATING OPERATION</span>
                    <p>{experiment.nextOperation}</p>
                  </div>
                ) : null}
              </div>

              <div className={styles.firewall}>
                <span>AUTHORITY FIREWALL</span>
                <p>{experiment.firewall}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closeSection}>
        <span>EXPERIMENT REGISTER RULE</span>
        <h2>Negative, null, blocked, contradictory, and superseded work belongs here too.</h2>
        <p>
          The current public snapshot is only a seeded recovery. Its incompleteness is part
          of the record: a missing experiment is not silently reconstructed from papers,
          source folders, or website language.
        </p>
      </section>
    </InstitutionalPageShell>
  );
}
