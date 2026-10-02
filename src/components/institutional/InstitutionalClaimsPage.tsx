import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { claimProjection, claimRecords } from "./content/claims";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Claims.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

const validationRequired = claimRecords.filter((claim) => claim.requiresValidation === true).length;
const sourceLinkedClaims = claimRecords.filter((claim) => Boolean(claim.source)).length;

export function InstitutionalClaimsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.claimsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.claimsHero}
        eyebrow={<>CLAIMS</>}
        title={<>What is the Lab actually claiming?</>}
        lead={
          <>
            A claim is a specific statement the Lab is willing to track separately from the
            prose around it, along with its current status, supporting evidence, and unresolved
            tests.
          </>
        }
        support={
          <>
            Claims stay with the research program, product, or project that gives them meaning.
            This page shows one current research cohort and explains how to read it; it is not
            a single master list of everything the Lab believes.
          </>
        }
        childLinks={institutionalChildRoutes.claims}
      >
        <div className={styles.sourcePanel}>
          <span>CURRENT PUBLIC COHORT</span>
          <strong>{claimProjection.ownerResearch.title}</strong>
          <p>{claimRecords.length} owner-local {claimProjection.idNamespace} claims</p>
          <dl>
            <div>
              <dt>OWNER</dt>
              <dd>{claimProjection.ownerResearch.code}</dd>
            </div>
            <div>
              <dt>RECORD STATUS</dt>
              <dd>{claimProjection.ledgerStatus}</dd>
            </div>
          </dl>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>CLAIM STATUS BOUNDARY</span>
        <strong>Being listed does not make a claim true.</strong>
        <p>{claimProjection.authority}</p>
      </section>

      <section className={styles.surveySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW TO READ A CLAIM</>}
          title={<>Read the statement together with its status, evidence, and open tests.</>}
          note={<>A claim makes the most sense beside the research that owns it; this page provides a shared orientation layer.</>}
        />

        <div className={styles.surveyGrid}>
          <article>
            <span>WHAT IT IS</span>
            <h3>A specific statement.</h3>
            <p>
              A claim records what is being asserted, how mature the statement currently is,
              whether testing remains open, and which sources or evidence are actually linked to it.
            </p>
          </article>
          <article>
            <span>WHERE IT BELONGS</span>
            <h3>Kept with the work that gives it meaning.</h3>
            <p>
              Research claims belong with their research program. Product and project claims
              should appear beside the artifacts, tests, use, and decisions that give them meaning.
            </p>
          </article>
          <article>
            <span>WHAT THIS PAGE DOES</span>
            <h3>One example, not a universal ledger.</h3>
            <p>
              This route explains the Lab's claim-tracking approach and reports one cohort
              that is currently suitable for public inspection.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.scopeSection}>
        <div>
          <p className={styles.sectionIndex}>CURRENT PUBLIC EXAMPLE</p>
          <h2>Information Mechanics is one research program&apos;s claim set—not “everything BFL claims.”</h2>
          <p>
            The current source belongs to {claimProjection.ownerResearch.title}. It shows how
            one research program records claims without implying that every BFL program uses
            the same IDs, statuses, or evidence structure.
          </p>
        </div>

        <div className={styles.scopeGrid}>
          <article>
            <span>CLAIMS</span>
            <strong>{claimRecords.length}</strong>
            <p>{claimProjection.idNamespace} namespace</p>
          </article>
          <article>
            <span>VALIDATION OPEN</span>
            <strong>{validationRequired}</strong>
            <p>Rows explicitly marked as requiring validation.</p>
          </article>
          <article>
            <span>SOURCE LOCATORS</span>
            <strong>{sourceLinkedClaims}</strong>
            <p>Rows with a declared source locator in the current ledger.</p>
          </article>
        </div>
      </section>

      <section className={styles.placementSection}>
        <div>
          <p className={styles.sectionIndex}>WHERE CLAIMS BELONG</p>
          <h2>Keep claims beside the research, evidence, and tests that can change them.</h2>
          <p>
            This route remains the shared explanation of claim tracking. More specific claim
            views should live beside the research programs, products, and projects they actually
            describe.
          </p>
        </div>
        <nav aria-label="Claim placement destinations">
          <Link href="/research">Research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/evidence">Evidence <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/experiments">Experiments <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/publications">Publications <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
