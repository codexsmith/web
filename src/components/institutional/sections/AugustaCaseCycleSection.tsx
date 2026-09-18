import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/AugustaMaintenanceDebt.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  augustaAccountingRules,
  augustaBlockedClaims,
  augustaCase,
  augustaCaseCycle,
  augustaEvidenceDomains,
  augustaFleet,
  augustaLedgerSteps,
  augustaMetrics,
  augustaMissingJoin,
  augustaNextTargets,
  augustaSupportedClaims,
} from "../content/augustaMaintenanceDebt";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const cycleOrder = augustaCaseCycle.map((stage) => stage.id);

function CycleSummary({
  stage,
}: {
  stage: (typeof augustaCaseCycle)[number];
}) {
  return (
    <div className={styles.caseStageSummary} id={stage.id}>
      <div className={styles.caseStageTopline}>
        <span>{stage.index}</span>
        <strong>{stage.verb}</strong>
      </div>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>
      <div className={styles.caseStageTransform}>
        <span>{stage.input}</span>
        <i aria-hidden="true">→</i>
        <strong>{stage.output}</strong>
      </div>
      <span className={styles.caseStageConnector} aria-hidden="true">
        {stage.connector}
      </span>
    </div>
  );
}

function CycleStage({
  stage,
  className,
  children,
}: {
  stage: (typeof augustaCaseCycle)[number];
  className: string;
  children: ReactNode;
}) {
  return (
    <ReflowFieldItem
      id={stage.id}
      label={stage.index + " " + stage.verb}
      className={[styles.caseStage, className].join(" ")}
      dataTone={stage.tone}
      summary={<CycleSummary stage={stage} />}
      detail={<div className={styles.caseStageDetail}>{children}</div>}
    />
  );
}

export function AugustaCaseCycleSection() {
  const [
    findingStage,
    ledgerStage,
    evidenceStage,
    fleetStage,
    controlsStage,
    nextStage,
  ] = augustaCaseCycle;

  return (
    <section className={styles.caseCycleSection} id="case-cycle">
      <div className={styles.caseCycleFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE CIVIC ACCOUNTING LOOP</>}
          title={<>One case. Six linked state transitions.</>}
          note={
            <>
              Read the collapsed field as the method. Select any stage to inspect its
              evidence without losing the rest of the cycle.
            </>
          }
        />

        <div className={styles.caseCycleThesis}>
          <span>PUBLIC RECORD</span>
          <i>→</i>
          <span>BOUNDED CLAIM</span>
          <i>→</i>
          <span>CANONICAL OBLIGATION</span>
          <i>→</i>
          <span>NATIVE MEASURE</span>
          <i>→</i>
          <span>ADMISSIBLE ACCOUNT</span>
          <i>→</i>
          <span>NEW EVIDENCE</span>
          <i>↺</i>
        </div>

        <ReflowField
          className={styles.caseCycleGrid}
          ariaLabel="Augusta civic accounting research cycle"
          layoutMode="focus-stage"
          itemOrder={cycleOrder}
        >
          <CycleStage
            stage={findingStage}
            className={styles.caseStageFinding}
          >
            <div className={styles.findingSection}>
              <InstitutionalSectionHeader
                styles={styles}
                eyebrow={<>CURRENT DEFENSIBLE FINDING</>}
                title={<>The phenomenon is visible. The total is not.</>}
                note={
                  <>
                    The research is deliberately allowed to stop at &quot;insufficient evidence
                    for aggregation&quot; rather than reward itself for producing a dramatic
                    number.
                  </>
                }
              />

              <blockquote className={styles.caseQuestion}>
                <span>BOUNDED QUESTION</span>
                {augustaCase.question}
              </blockquote>

              <div className={styles.metricGrid}>
                {augustaMetrics.map((metric) => (
                  <article data-metric-tone={metric.tone} key={metric.label}>
                    <strong>{metric.value}</strong>
                    <h3>{metric.label}</h3>
                    <p>{metric.detail}</p>
                  </article>
                ))}
              </div>

              <div className={styles.claimFirewall}>
                <article data-kind="supported">
                  <span>SUPPORTED NOW</span>
                  <h3>What the record already licenses.</h3>
                  {augustaSupportedClaims.map((claim) => <p key={claim}>{claim}</p>)}
                </article>
                <article data-kind="blocked">
                  <span>NOT LICENSED YET</span>
                  <h3>What the same record does not license.</h3>
                  {augustaBlockedClaims.map((claim) => <p key={claim}>{claim}</p>)}
                </article>
              </div>
            </div>
          </CycleStage>

          <CycleStage
            stage={ledgerStage}
            className={styles.caseStageLedger}
          >
            <div className={styles.ledgerSection}>
              <div className={styles.ledgerLead}>
                <p>THE LIFECYCLE LEDGER</p>
                <h2>The missing object is not another budget. It is the join.</h2>
                <p>
                  The same obligation can appear as a GIS asset, work order, condition score,
                  capital project, purchase order, appropriation, repair contract, accounting
                  record, and service failure. Those are representations of the obligation—not
                  independent obligations to be added together.
                </p>
              </div>

              <div className={styles.ledgerWorkbench}>
                <div className={styles.ledgerRail}>
                  {augustaLedgerSteps.map(([index, title, description]) => (
                    <article key={title}>
                      <span>{index}</span>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>

                <div className={styles.ledgerThesis}>
                  <span>IDENTITY BEFORE AGGREGATION</span>
                  <blockquote>
                    One physical obligation may have many administrative representations.
                    Join the records around the obligation; do not sum the records as though
                    each were new debt.
                  </blockquote>
                  <div>
                    <code>physical obligation</code><i>→</i>
                    <code>due state</code><i>→</i>
                    <code>funding</code><i>→</i>
                    <code>intervention</code><i>→</i>
                    <code>closure</code>
                  </div>
                </div>
              </div>
            </div>
          </CycleStage>

          <CycleStage
            stage={evidenceStage}
            className={styles.caseStageEvidence}
          >
            <div className={styles.evidenceSection}>
              <InstitutionalSectionHeader
                styles={styles}
                eyebrow={<>WHERE THE EVIDENCE ALREADY BITES</>}
                title={<>Six systems. Six different accounting meanings.</>}
                note={
                  <>
                    A useful ledger preserves those differences instead of forcing every
                    public number into the same category.
                  </>
                }
              />

              <div className={styles.evidenceGrid}>
                {augustaEvidenceDomains.map((domain) => (
                  <article data-evidence-tone={domain.tone} key={domain.code}>
                    <div>
                      <span>{domain.code}</span>
                      <strong>{domain.status}</strong>
                    </div>
                    <h3>{domain.title}</h3>
                    <p>{domain.body}</p>
                    <blockquote>{domain.signal}</blockquote>
                  </article>
                ))}
              </div>
            </div>
          </CycleStage>

          <CycleStage
            stage={fleetStage}
            className={styles.caseStageFleet}
          >
            <div className={styles.fleetSection}>
              <div className={styles.fleetLead}>
                <p>FIRST COMPONENT-LEVEL QUANTITATIVE TEST</p>
                <h2>The first defensible debt measure does not have to be dollars.</h2>
                <p>
                  Fleet replacement exposes a cleaner lifecycle rule than most asset classes:
                  Augusta already publishes a desired lifecycle, an aged cohort, and evidence
                  that delayed replacement can push cost into reactive maintenance.
                </p>
              </div>

              <div className={styles.fleetInstrument}>
                <div className={styles.fleetReadouts}>
                  {augustaFleet.cohorts.map(([value, label]) => (
                    <article key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </article>
                  ))}
                </div>

                <div className={styles.fleetEquation}>
                  <span>MINIMUM OBLIGATION-TIME</span>
                  <code>{augustaFleet.formula}</code>
                  <p>{augustaFleet.explanation}</p>
                </div>

                <aside>
                  <span>WHY THE DOLLAR BALANCE WAITS</span>
                  <h3>Unit identity has to close first.</h3>
                  {augustaFleet.waitsFor.map((item) => <p key={item}>{item}</p>)}
                </aside>
              </div>
            </div>
          </CycleStage>

          <CycleStage
            stage={controlsStage}
            className={styles.caseStageControls}
          >
            <div className={styles.controlsSection}>
              <InstitutionalSectionHeader
                styles={styles}
                eyebrow={<>ACCOUNTING DISCIPLINE</>}
                title={<>The interesting part is often what the ledger refuses to count.</>}
                note={
                  <>
                    These controls keep a civic accounting instrument from turning
                    ambiguity into accusation or incomparable quantities into one total.
                  </>
                }
              />

              <div className={styles.controlGrid}>
                {augustaAccountingRules.map(([title, description], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </CycleStage>

          <CycleStage
            stage={nextStage}
            className={styles.caseStageNext}
          >
            <div className={styles.nextGateSection}>
              <div className={styles.nextGateLead}>
                <p>NEXT QUANTITATIVE GATE</p>
                <h2>Join the physical state to the administrative state.</h2>
                <p>
                  A genuine deferred-renewal subtotal starts to emerge only when the same
                  canonical obligation carries condition, due state, cost, funding, and
                  closure together.
                </p>

                <div className={styles.missingJoin} aria-label="Required lifecycle join">
                  {augustaMissingJoin.map((item, index) => (
                    <div key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.nextTargetPanel}>
                <span>IMMEDIATE EVIDENCE TARGETS</span>
                <ol>
                  {augustaNextTargets.map((target) => <li key={target}>{target}</li>)}
                </ol>
              </div>
            </div>
          </CycleStage>
        </ReflowField>

        <div className={styles.caseCycleReturn}>
          <span>06 REOPEN</span>
          <i aria-hidden="true">↺</i>
          <p>
            New evidence changes the admissible state of the case. Return to <strong>01
            Bound</strong>, recompute the claim ceiling, and run the loop again.
          </p>
        </div>
      </div>
    </section>
  );
}
