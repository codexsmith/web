import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Evidence.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  evidenceClasses,
  evidenceLadder,
  evidenceNonImplications,
  evidenceToEarn,
  nativeEvidence,
  priorExecution,
} from "./content/evidence";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalEvidencePage() {
  return (
    <InstitutionalPageShell mainClassName={styles.evidencePage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.evidenceHero}
        eyebrow={<>EVIDENCE / TRACK RECORD</>}
        title={<>What has actually been demonstrated?</>}
        lead={
          <>
            Boundary First Labs has real prior execution, a large body of inspectable
            current work, and important evidence it still has to earn.
          </>
        }
        support={
          <>
            This page keeps those categories separate. Shipped software is not scientific
            validation. A prototype is not product-market fit. A founder&apos;s career is not
            the same thing as BFL customer traction.
          </>
        }
        childLinks={institutionalChildRoutes.evidence}
      >
        <div className={styles.evidenceClassLedger}>
          {evidenceClasses.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </InstitutionalRouteHero>

      <section className={styles.priorExecutionSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PRIOR EXECUTION</>}
          title={<>The Lab did not begin with an untested founder.</>}
          note={
            <>
              Historical work can establish capability and provenance. It must remain
              clearly separated from current BFL traction and from validation of later theory.
            </>
          }
        />

        <div className={styles.priorExecutionStack}>
          {priorExecution.map((item, index) => (
            <article className={styles.priorExecutionCard} key={item.title}>
              <header>
                <span>{formatOrdinal(index)}</span>
                <small>{item.status}</small>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </header>

              <div className={styles.priorEvidenceField}>
                <span>EVIDENCE BASIS</span>
                <p>{item.evidence}</p>
              </div>

              <div className={styles.priorBoundaryField}>
                <span>WHAT THIS DOES NOT PROVE</span>
                <p>{item.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.nativeEvidenceSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>INSPECTABLE NOW</>}
          title={<>BFL-native evidence starts with objects another person can inspect.</>}
          note={
            <>
              These surfaces prove that work exists, has structure, and can be examined.
              They do not automatically establish market, scientific, or institutional authority.
            </>
          }
        />

        <div className={styles.nativeEvidenceGrid}>
          {nativeEvidence.map((item, index) => (
            <article key={item.title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.href}>{item.linkLabel} <span aria-hidden="true">-&gt;</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.evidenceLadderSection}>
        <div className={styles.evidenceLadderLead}>
          <p className={styles.sectionIndex}>EVIDENCE LADDER</p>
          <h2>Existence is the beginning of evidence, not the end.</h2>
          <p>
            Different questions require different proof. A software artifact may need a
            user. A scientific claim may need independent reproduction. A service may need a
            client case study. A method may need successful transfer to another operator.
          </p>
        </div>

        <ol className={styles.evidenceLadder}>
          {evidenceLadder.map(([stage, description], index) => (
            <li key={stage}>
              <span>{formatOrdinal(index)}</span>
              <div>
                <strong>{stage}</strong>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.evidenceToEarnSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>EVIDENCE STILL TO EARN</>}
          title={<>The next proof points are concrete.</>}
          note={
            <>
              The gaps are not an embarrassment to hide. They are the work required to
              turn accumulated capability into an externally tested institution.
            </>
          }
        />

        <div className={styles.evidenceToEarnGrid}>
          {evidenceToEarn.map((item, index) => (
            <article key={item.title}>
              <span>{formatOrdinal(index)}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.nonImplicationSection}>
        <div className={styles.nonImplicationLead}>
          <p className={styles.sectionIndex}>DO NOT INFER</p>
          <h2>Good evidence gets weaker when its boundaries are blurred.</h2>
          <p>
            The Lab would rather present a narrower claim with a clear source than borrow
            authority from something adjacent.
          </p>
        </div>

        <div className={styles.nonImplicationGrid}>
          {evidenceNonImplications.map(([title, description]) => (
            <article key={title}>
              <span>{title}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.evidenceClose}>
        <p className={styles.sectionIndex}>HOW TO EVALUATE BFL</p>
        <h2>Inspect the object that corresponds to the claim.</h2>
        <p>
          If the question is commercial capability, inspect Applied Work and prior execution.
          If the question is what exists now, inspect Projects, Products, and Apparatus. If
          the question is scientific authority, inspect Research and Publications—and pay
          attention to what is still awaiting external review.
        </p>

        <nav className={styles.evidenceCloseLinks} aria-label="Evidence next steps">
          <a href="/v3/applied-work">Applied Work <span aria-hidden="true">-&gt;</span></a>
          <a href="/v3/projects">Projects <span aria-hidden="true">-&gt;</span></a>
          <a href="/v3/research">Research <span aria-hidden="true">-&gt;</span></a>
          <a href="/v3/publications">Publications <span aria-hidden="true">-&gt;</span></a>
          <a href="/v3/funding">Funding <span aria-hidden="true">-&gt;</span></a>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
