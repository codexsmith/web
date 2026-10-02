import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero } from "./InstitutionalPrimitives";
import { AugustaCaseCycleSection } from "./sections/AugustaCaseCycleSection";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AugustaMaintenanceDebt.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import {
  augustaCase,
  augustaCaseNav,
  augustaSuccessCriteria,
} from "./content/augustaMaintenanceDebt";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAugustaMaintenanceDebtPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.augustaPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.augustaHero}
        eyebrow={<>PUBLIC-INFRASTRUCTURE RESEARCH · AUGUSTA–RICHMOND COUNTY</>}
        title={<>Which infrastructure obligations are actually overdue—and what do the public records support?</>}
        lead={
          <>
            This case studies roads, drainage, vehicles, facilities, and other public assets
            without collapsing maintenance, replacement, new construction, financing,
            depreciation, and storm recovery into one headline number.
          </>
        }
        support={
          <>
            The goal is a reproducible public-record account that separates what is known,
            what is overdue, what is funded, what remains uncertain, and what additional records
            would be needed for a stronger conclusion.
          </>
        }
      >
        <aside className={styles.caseControl}>
          <div className={styles.caseControlTopline}>
            <span>CASE STATUS</span>
            <strong>{augustaCase.state}</strong>
          </div>

          <dl>
            <div><dt>CASE ID</dt><dd>{augustaCase.id}</dd></div>
            <div><dt>OPENED</dt><dd>{augustaCase.opened}</dd></div>
            <div><dt>PLACE</dt><dd>{augustaCase.location}</dd></div>
            <div><dt>PRIMARY SOURCES</dt><dd>PUBLIC INSTITUTIONAL RECORDS</dd></div>
          </dl>

          <blockquote>
            <span>STRONGEST CURRENT CONCLUSION</span>
            {augustaCase.conclusion}
          </blockquote>

          <nav aria-label="Augusta case cycle stages">
            {augustaCaseNav.map(([href, label]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>
        </aside>
      </InstitutionalRouteHero>

      <AugustaCaseCycleSection />

      <section className={styles.successSection}>
        <div>
          <p>WHAT SUCCESS LOOKS LIKE</p>
          <h2>A useful public account can still be incomplete.</h2>
          <p>
            The case succeeds when another reader can see the infrastructure obligations and
            the evidence separately—and can tell exactly which missing records or classifications
            prevent a stronger citywide estimate.
          </p>
        </div>

        <div className={styles.successGrid}>
          {augustaSuccessCriteria.map((item) => <span key={item}>{item}</span>)}
        </div>

        <nav className={styles.successLinks} aria-label="Augusta case next steps">
          <Link href="/projects">Back to Projects <span aria-hidden="true">→</span></Link>
          <Link href="/collaboration">Discuss public-interest collaboration <span aria-hidden="true">→</span></Link>
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
