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
        support={<>{objective.body?.[0]}</>}
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
            <strong>Long-horizon objective</strong>
          </div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.detailBoundaryStrip}>
        <div>
          <span>CLAIM BOUNDARY</span>
          <strong>Direction, not completion.</strong>
        </div>
        <p>
          This page describes an objective, present footholds, and open burdens. It
          does not claim scientific validation, deployed capability, external
          adoption, market value, or inevitability.
        </p>
        <Link href="/research/moonshots">
          Moonshots index <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.detailBodySection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WORKING DIRECTION</>}
          title={<>What the objective currently means.</>}
          note={
            <>
              The description remains provisional where the research burden is
              unresolved.
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
              <span>SOURCE REFERENCE</span>
              <code>{inspection.sourceRef}</code>
            </div>
          ) : null}
        </section>
      ))}

      {objective.links?.length ? (
        <section className={styles.relatedSection}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>CURRENT FOOTHOLDS / RELATED WORK</>}
            title={<>Where this objective touches work that already exists.</>}
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
          <h2>One objective inside a larger long-horizon program.</h2>
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
