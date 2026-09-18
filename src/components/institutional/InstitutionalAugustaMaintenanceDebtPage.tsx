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
