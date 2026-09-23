import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import { evidenceClasses, evidenceLadder } from "./content/evidence";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Evidence.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalEvidencePage() {
  return (
    <InstitutionalPageShell mainClassName={styles.evidencePage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.evidenceHero}
        eyebrow={<>EVIDENCE</>}
        title={<>What supports a claim, product, project, or research result?</>}
        lead={
          <>
            Evidence is contextual. A source, artifact, reproduction, user outcome, or
            external review only means something relative to the object it supports.
          </>
        }
        support={
          <>
            This page defines the Lab&apos;s evidence vocabulary and strength ladder. Detailed
            evidence lists will live beside the research lanes, products, projects, and
            publications they actually support.
          </>
        }
        childLinks={institutionalChildRoutes.evidence}
      >
        <div className={styles.evidenceClassLedger}>
          {evidenceClasses.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </InstitutionalRouteHero>

      <section className={styles.surveySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>EVIDENCE OBJECT</>}
          title={<>Evidence should travel with the thing it supports.</>}
          note={<>The global route defines classes and strength; contextual routes carry the actual evidence.</>}
        />

        <div className={styles.surveyGrid}>
          <article>
            <span>WHAT IT IS</span>
            <h3>Support with a boundary.</h3>
            <p>
              Evidence may be a source, artifact, execution record, external review,
              reproduction, adoption signal, or other observation tied to a specific question.
            </p>
          </article>
          <article>
            <span>WHERE IT BELONGS</span>
            <h3>Attached to an object.</h3>
            <p>
              Research claims need scientific evidence. Products need use and adoption
              evidence. Projects need delivery evidence. Publications need cited artifacts and review state.
            </p>
          </article>
          <article>
            <span>WHAT THIS PAGE DOES</span>
            <h3>Vocabulary and calibration.</h3>
            <p>
              This route explains evidence classes and relative strength without flattening
              every supporting artifact into one long institutional list.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.classSection}>
        <div>
          <p className={styles.sectionIndex}>EVIDENCE CLASSES</p>
          <h2>Different evidence answers different questions.</h2>
        </div>
        <div className={styles.classGrid}>
          {evidenceClasses.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.evidenceLadderSection}>
        <div className={styles.evidenceLadderLead}>
          <p className={styles.sectionIndex}>EVIDENCE LADDER</p>
          <h2>Existence is the beginning of evidence, not the end.</h2>
          <p>
            Stronger questions require stronger forms of support. The ladder is a calibration
            aid, not a universal score.
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

      <section className={styles.placementSection}>
        <div>
          <p className={styles.sectionIndex}>NEXT PLACEMENT PASS</p>
          <h2>Put evidence next to the claim or artifact it actually supports.</h2>
          <p>
            The next pass will project filtered evidence into research lanes, products,
            projects, and publications. This route will remain the shared evidence vocabulary.
          </p>
        </div>
        <nav aria-label="Evidence placement destinations">
          <Link href="/research">Research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/products">Products <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">Projects <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/publications">Publications <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
