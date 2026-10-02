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
        title={<>Big research goals, with the open problems left visible.</>}
        lead={<>{moonshotsProgram.summary}</>}
      >
        <div className={styles.moonshotsHeroLedger}>
          <div>
            <span>WHAT THIS IS</span>
            <strong>Long-horizon research goals</strong>
          </div>
          <div>
            <span>OBJECTIVES</span>
            <strong>{String(moonshotObjectives.length).padStart(2, "0")}</strong>
          </div>
          <div>
            <span>IMPORTANT LIMIT</span>
            <strong>A goal is not an achieved capability.</strong>
          </div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.moonshotsOrientation}>
        <div>
          <p className={styles.sectionIndex}>HOW TO READ THIS PAGE</p>
          <h2>Show where the Lab wants to go without pretending it is already there.</h2>
        </div>
        <p>
          {moonshotsProgram.body?.[1]}
        </p>
        <aside>
          <span>HOW PROGRESS SHOULD WORK</span>
          <strong>Every big objective must break down into smaller testable work.</strong>
          <p>
            Progress should leave behind concrete intermediate capabilities, explicit open
            problems, and evidence another person can inspect or challenge.
          </p>
        </aside>
      </section>

      <section className={styles.objectiveSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>RESEARCH DIRECTIONS</>}
          title={<>Eight things the Lab is trying to become capable of doing.</>}
          note={
            <>
              Each item is a long-horizon research direction, not a product promise,
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
          <p className={styles.sectionIndex}>HOW TO READ THE PROGRAM</p>
          <h2>Moonshots organizes difficult work without turning aspiration into evidence.</h2>
        </div>

        <LabObjectIdentity
          kind="research"
          status="Long-horizon objectives"
          statusLabel="CURRENT STATUS"
          secondary="Evidence before stronger claims"
          secondaryLabel="CLAIM RULE"
          variant="compact"
        />

        <p>
          The program is useful only when its objectives produce smaller, testable,
          inspectable work. Negative results and exposed limits count as progress when
          they prevent stronger claims that the evidence cannot support.
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
