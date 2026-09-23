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
        title={<>How does the Lab bound what it asserts?</>}
        lead={
          <>
            A Claim is a research-control object: an assertion with identity, state,
            provenance, validation posture, and a declared authority ceiling.
          </>
        }
        support={
          <>
            Claims belong to research lanes and other owning contexts. This route defines the
            object family; it is not intended to become one flattened Lab-wide claim ledger.
          </>
        }
        childLinks={institutionalChildRoutes.claims}
      >
        <div className={styles.sourcePanel}>
          <span>CURRENT RECOVERED COHORT</span>
          <strong>{claimProjection.ownerResearch.title}</strong>
          <p>{claimRecords.length} owner-local {claimProjection.idNamespace} claims</p>
          <dl>
            <div>
              <dt>OWNER</dt>
              <dd>{claimProjection.ownerResearch.code}</dd>
            </div>
            <div>
              <dt>LEDGER STATE</dt>
              <dd>{claimProjection.ledgerStatus}</dd>
            </div>
          </dl>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.authorityBand}>
        <span>AUTHORITY CEILING</span>
        <strong>Registration is not truth.</strong>
        <p>{claimProjection.authority}</p>
      </section>

      <section className={styles.surveySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CLAIM OBJECT</>}
          title={<>Claims should be read beside the research that owns them.</>}
          note={<>The global route explains the object family; contextual routes supply scientific meaning.</>}
        />

        <div className={styles.surveyGrid}>
          <article>
            <span>WHAT IT IS</span>
            <h3>Bounded assertion.</h3>
            <p>
              A claim records what is being asserted, its current status, whether validation
              remains open, and what source or evidence relationships are actually declared.
            </p>
          </article>
          <article>
            <span>WHERE IT BELONGS</span>
            <h3>Owned by a research context.</h3>
            <p>
              Foundational claims belong with research lanes. Product and project claims
              should appear beside the artifacts, tests, and decisions that give them meaning.
            </p>
          </article>
          <article>
            <span>WHAT THIS PAGE DOES</span>
            <h3>Scope, not universal ledger.</h3>
            <p>
              This route defines Claim as an institutional object and reports which claim
              cohorts are currently safe to project publicly.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.scopeSection}>
        <div>
          <p className={styles.sectionIndex}>CURRENT PUBLIC RECOVERY</p>
          <h2>Information Mechanics is one admitted cohort, not “the Lab’s claims.”</h2>
          <p>
            The current public source is owner-local to {claimProjection.ownerResearch.title}.
            Its presence demonstrates the claim machinery without pretending other research
            programs share the same namespace or ledger semantics.
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
          <p className={styles.sectionIndex}>NEXT PLACEMENT PASS</p>
          <h2>Put claims beside their owners, evidence, and tests.</h2>
          <p>
            The next pass will attach filtered claim views to research lanes, products, and
            projects. This route will remain the institutional explanation of Claim objects.
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
