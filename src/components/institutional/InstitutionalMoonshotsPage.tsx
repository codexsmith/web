import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { LabObjectIdentity } from "./LabObjectIdentity";
import {
  moonshotObjectives,
  moonshotsEvaluation,
  moonshotsProgram,
  moonshotSlug,
} from "./content/moonshots";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Moonshots.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalMoonshotsPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.moonshotsPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.moonshotsHero}
        eyebrow={<>MOONSHOTS</>}
        title={<>Long-horizon objectives. Explicit open problems.</>}
        lead={<>{moonshotsProgram.summary}</>}
      >
        <div className={styles.moonshotsHeroLedger}>
          <div>
            <span>PROGRAM CLASS</span>
            <strong>Long-horizon research objectives</strong>
          </div>
          <div>
            <span>OBJECTIVES</span>
            <strong>{String(moonshotObjectives.length).padStart(2, "0")}</strong>
          </div>
          <div>
            <span>CLAIM BOUNDARY</span>
            <strong>Ambition is not achieved capability.</strong>
          </div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.moonshotsOrientation}>
        <div>
          <p className={styles.sectionIndex}>HOW TO READ THIS PAGE</p>
          <h2>Direction is visible. Status stays earned.</h2>
        </div>
        <p>
          {moonshotsProgram.body?.[1]}
        </p>
        <aside>
          <span>EVIDENCE BEFORE RHETORIC</span>
          <strong>Every objective must decompose into bounded work.</strong>
          <p>
            Progress should leave inspectable intermediate capability, explicit open
            problems, and evidence another person can challenge.
          </p>
        </aside>
      </section>

      <section className={styles.objectiveSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>OBJECTIVE INDEX</>}
          title={<>Long-horizon directions for capability the Lab has not yet earned.</>}
          note={
            <>
              Each objective is a research direction, not a product promise,
              scientific result, or forecast.
            </>
          }
        />

        <ol className={styles.objectiveLedger}>
          {moonshotObjectives.map((objective, index) => (
            <li key={objective.id}>
              <Link href={`/research/moonshots/${moonshotSlug(objective)}`}>
                <span className={styles.objectiveOrdinal}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.objectiveIdentity}>
                  <small>{objective.eyebrow}</small>
                  <strong>{objective.label}</strong>
                </div>
                <p>{objective.summary}</p>
                <span className={styles.objectiveArrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {moonshotsEvaluation ? (
        <section className={styles.evaluationSection}>
          <div className={styles.evaluationLead}>
            <p className={styles.sectionIndex}>{moonshotsEvaluation.eyebrow}</p>
            <h2>{moonshotsEvaluation.label}</h2>
            <p>{moonshotsEvaluation.summary}</p>
          </div>

          <ol className={styles.evaluationList}>
            {moonshotsEvaluation.bullets.map((bullet, index) => (
              <li key={bullet}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{bullet}</p>
              </li>
            ))}
          </ol>

          {moonshotsEvaluation.sourceRef ? (
            <div className={styles.sourceField}>
              <span>SOURCE REFERENCE</span>
              <code>{moonshotsEvaluation.sourceRef}</code>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className={styles.moonshotsBoundary}>
        <div>
          <p className={styles.sectionIndex}>PROGRAM BOUNDARY</p>
          <h2>Moonshots is a coordination surface for difficult work.</h2>
        </div>

        <LabObjectIdentity
          kind="research"
          status="Long-horizon objectives"
          statusLabel="PROGRAM STATE"
          secondary="Evidence before rhetoric"
          secondaryLabel="RELEASE RULE"
          variant="compact"
        />

        <p>
          The program is useful only insofar as its objectives produce smaller,
          falsifiable, inspectable work. Negative results, demotions, and exposed
          limits count as progress when they prevent stronger false claims.
        </p>
      </section>

      <section className={styles.moonshotsClose}>
        <p className={styles.sectionIndex}>NEXT SURFACES</p>
        <h2>Follow the work at the scale where it currently exists.</h2>
        <nav aria-label="Moonshots related surfaces">
          <Link href="/research">Research <span aria-hidden="true">→</span></Link>
          <Link href="/projects">Projects <span aria-hidden="true">→</span></Link>
          <Link href="/open-lab">Open Lab <span aria-hidden="true">→</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
