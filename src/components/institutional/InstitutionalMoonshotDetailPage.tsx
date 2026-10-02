import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import type { ContentNode } from "@/lib/content";
import { moonshotObjectives } from "./content/moonshots";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Moonshots.module.css";
import { composeCssModules } from "./styles/composeCssModules";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalMoonshotDetailPage({
  objective,
}: {
  objective: ContentNode;
}) {
  const currentIndex = moonshotObjectives.findIndex(
    (candidate) => candidate.id === objective.id,
  );

  return (
    <InstitutionalPageShell mainClassName={styles.moonshotDetailPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.moonshotDetailHero}
        eyebrow={<>MOONSHOTS · {objective.eyebrow}</>}
        title={<>{objective.label}</>}
        lead={<>{objective.summary}</>}
      >
        <div className={styles.detailHeroLedger}>
          <div>
            <span>OBJECTIVE</span>
            <strong>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(moonshotObjectives.length).padStart(2, "0")}
            </strong>
          </div>
          <div>
            <span>PROGRAM</span>
            <strong>Moonshots</strong>
          </div>
          <div>
            <span>STATUS</span>
            <strong>Long-horizon research goal</strong>
          </div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.detailBoundaryStrip}>
        <div>
          <span>IMPORTANT LIMIT</span>
          <strong>This is a direction, not a completed result.</strong>
        </div>
        <p>
          This page describes the goal, work that already exists, and the main unresolved
          problems. It does not claim scientific validation, deployed capability, external
          adoption, market value, or inevitability.
        </p>
        <Link href="/research/moonshots">
          Moonshots index <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.detailBodySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT THIS GOAL MEANS TODAY</>}
          title={<>The current interpretation, footholds, and open problems.</>}
          note={
            <>
              Where the research is unresolved, the description remains provisional.
            </>
          }
        />

        <div className={styles.detailBodyGrid}>
          {(objective.body ?? []).map((paragraph, index) => (
            <article key={`${objective.id}-body-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      {(objective.inspection ?? []).map((inspection) => (
        <section className={styles.inspectionSection} key={inspection.id}>
          <div className={styles.inspectionLead}>
            <p className={styles.sectionIndex}>{inspection.eyebrow}</p>
            <h2>{inspection.label}</h2>
            <p>{inspection.summary}</p>
          </div>

          <ol className={styles.inspectionList}>
            {inspection.bullets.map((bullet, index) => (
              <li key={bullet}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{bullet}</p>
              </li>
            ))}
          </ol>

          {inspection.sourceRef ? (
            <div className={styles.sourceField}>
              <span>RESEARCH SOURCE</span>
              <code>{inspection.sourceRef}</code>
            </div>
          ) : null}
        </section>
      ))}

      {objective.links?.length ? (
        <section className={styles.relatedSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>WORK THAT ALREADY EXISTS</>}
            title={<>Current projects and research that move this goal forward.</>}
          />

          <div className={styles.relatedLedger}>
            {objective.links.map((link, index) => (
              <Link href={link.href} key={link.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{link.eyebrow}</small>
                  <strong>{link.label}</strong>
                  {link.summary ? <p>{link.summary}</p> : null}
                </div>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.detailClose}>
        <div>
          <p className={styles.sectionIndex}>PROGRAM CONTEXT</p>
          <h2>One research goal inside a larger long-horizon program.</h2>
        </div>
        <nav aria-label="Moonshots navigation">
          <Link href="/research/moonshots">
            All Moonshots <span aria-hidden="true">→</span>
          </Link>
          <Link href="/research">
            Research <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
