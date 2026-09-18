import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AugustaMaintenanceDebt.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import {
  augustaAccountingRules,
  augustaBlockedClaims,
  augustaCase,
  augustaCaseNav,
  augustaEvidenceDomains,
  augustaFleet,
  augustaLedgerSteps,
  augustaMetrics,
  augustaMissingJoin,
  augustaNextTargets,
  augustaSuccessCriteria,
  augustaSupportedClaims,
} from "./content/augustaMaintenanceDebt";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAugustaMaintenanceDebtPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.augustaPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.augustaHero}
        eyebrow={<>CIVIC CASE · AUGUSTA–RICHMOND COUNTY</>}
        title={<>What does a city owe its own infrastructure?</>}
        lead={
          <>
            Maintenance debt is easy to say and surprisingly easy to miscount. This case asks
            whether Augusta&apos;s unresolved lifecycle obligations can be reconstructed from
            public records without collapsing maintenance, renewal, new capacity, financing,
            depreciation, and external shock into one rhetorical number.
          </>
        }
        support={
          <>
            The target is not the largest possible estimate. The target is a ledger another
            person can inspect, reproduce, correct, and eventually hand back to the institutions
            that own the physical systems.
          </>
        }
      >
        <aside className={styles.caseControl}>
          <div className={styles.caseControlTopline}>
            <span>CASE CONTROL</span>
            <strong>{augustaCase.state}</strong>
          </div>

          <dl>
            <div><dt>CASE ID</dt><dd>{augustaCase.id}</dd></div>
            <div><dt>OPENED</dt><dd>{augustaCase.opened}</dd></div>
            <div><dt>BOUNDARY</dt><dd>{augustaCase.location}</dd></div>
            <div><dt>EVIDENCE</dt><dd>PUBLIC-INSTITUTIONAL FIRST</dd></div>
          </dl>

          <blockquote>
            <span>CURRENT CLAIM CEILING</span>
            {augustaCase.conclusion}
          </blockquote>

          <nav aria-label="Augusta case sections">
            {augustaCaseNav.map(([href, label]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.findingSection} id="finding">
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CURRENT DEFENSIBLE FINDING</>}
          title={<>The phenomenon is visible. The total is not.</>}
          note={
            <>
              The research is deliberately allowed to stop at &quot;insufficient evidence for
              aggregation&quot; rather than reward itself for producing a dramatic number.
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
      </section>

      <section className={styles.ledgerSection} id="ledger">
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
              One physical obligation may have many administrative representations. Join the
              records around the obligation; do not sum the records as though each were new debt.
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
      </section>

      <section className={styles.evidenceSection} id="evidence">
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHERE THE EVIDENCE ALREADY BITES</>}
          title={<>Six systems. Six different accounting meanings.</>}
          note={
            <>
              A useful ledger preserves those differences instead of forcing every public
              number into the same category.
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
      </section>

      <section className={styles.fleetSection} id="fleet-test">
        <div className={styles.fleetLead}>
          <p>FIRST COMPONENT-LEVEL QUANTITATIVE TEST</p>
          <h2>The first defensible debt measure does not have to be dollars.</h2>
          <p>
            Fleet replacement exposes a cleaner lifecycle rule than most asset classes:
            Augusta already publishes a desired lifecycle, an aged cohort, and evidence that
            delayed replacement can push cost into reactive maintenance.
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
      </section>

      <section className={styles.controlsSection} id="controls">
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>ACCOUNTING DISCIPLINE</>}
          title={<>The interesting part is often what the ledger refuses to count.</>}
          note={
            <>
              These controls exist to keep a civic accounting instrument from turning
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
      </section>

      <section className={styles.nextGateSection} id="next-gate">
        <div className={styles.nextGateLead}>
          <p>NEXT QUANTITATIVE GATE</p>
          <h2>Join the physical state to the administrative state.</h2>
          <p>
            A genuine deferred-renewal subtotal starts to emerge only when the same canonical
            obligation carries condition, due state, cost, funding, and closure together.
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
      </section>

      <section className={styles.successSection}>
        <div>
          <p>WHAT SUCCESS LOOKS LIKE</p>
          <h2>A reproducible civic account, even if the honest result is still incomplete.</h2>
          <p>
            The case succeeds when another reader can see the state of the obligations and the
            state of the evidence separately—and can tell exactly what would have to change
            before a stronger aggregate becomes admissible.
          </p>
        </div>

        <div className={styles.successGrid}>
          {augustaSuccessCriteria.map((item) => <span key={item}>{item}</span>)}
        </div>

        <nav className={styles.successLinks} aria-label="Augusta case next steps">
          <Link href="/v3/projects">Back to Projects <span aria-hidden="true">→</span></Link>
          <Link href="/v3/collaboration">Explore civic collaboration <span aria-hidden="true">→</span></Link>
          <a
            href="https://github.com/codexsmith/boundary-first-labs/tree/main/organized_library_curated/999_Library/03_Domains/04_linguistic_systems__domain_family/07_civilizational_systems__domain/01_civilization_mechanics__product/civic_change_infrastructure/cases/augusta_ga_maintenance_debt"
            rel="noreferrer"
            target="_blank"
          >
            Inspect the case record <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
