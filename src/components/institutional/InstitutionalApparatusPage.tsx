import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Apparatus.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { instruments } from "./content/apparatus";
import { ApparatusContextSection } from "./sections/ApparatusContextSection";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalApparatusPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.apparatusPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.apparatusHero}
          eyebrow={<>APPARATUS</>}
          title={<>Operational tools for knowledge infrastructure.</>}
          lead={<>Research creates more structure than a paper can hold.</>}
          support={<>Boundary First Labs builds apparatus for preserving, inspecting, and
              transferring questions, experiments, claims, evidence, provenance,
              criticism, defects, authority, repair, and forward state.</>}
          >
          <blockquote className={styles.apparatusThesis}>
            <span>DESIGN POSTURE</span>
            Legible by humans. Executable by machines. Repairable under critique.
            Transferable without hidden dependence.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.instrumentBench}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>INSTRUMENT BENCH</>}
            title={<>Different tools. Explicit authority ceilings.</>}
            note={<>The apparatus is a federation of instruments, not one fictional master database.</>}
            />

          <div className={styles.instrumentGrid}>
            {instruments.map((instrument) => (
              <article
                className={styles.instrumentCard}
                data-instrument-tone={instrument.tone}
                key={instrument.title}
              >
                <div className={styles.instrumentTopline}>
                  <span className={styles.instrumentCode}>{instrument.code}</span>
                  <span className={styles.instrumentVerb}>{instrument.verb}</span>
                </div>

                <div className={styles.instrumentStatus}>{instrument.status}</div>
                <h3>{instrument.title}</h3>
                <blockquote>{instrument.question}</blockquote>
                <p className={styles.instrumentSummary}>{instrument.summary}</p>

                <div className={styles.instrumentDetailGrid}>
                  <div>
                    <span>OBSERVES / CONTROLS</span>
                    <p>{instrument.observes}</p>
                  </div>
                  <div>
                    <span>PREVENTS</span>
                    <p>{instrument.prevents}</p>
                  </div>
                  <div className={styles.instrumentAuthority}>
                    <span>AUTHORITY</span>
                    <p>{instrument.authority}</p>
                  </div>
                  <div className={styles.instrumentNoAuthority}>
                    <span>DOES NOT HAVE AUTHORITY TO</span>
                    <p>{instrument.noAuthority}</p>
                  </div>
                </div>

                <div className={styles.instrumentHandoff}>
                  <span>HANDOFF / STEWARDSHIP</span>
                  {instrument.handoff}
                </div>
              </article>
            ))}
          </div>
        </section>

        <ApparatusContextSection />

      </InstitutionalPageShell>
  );
}
