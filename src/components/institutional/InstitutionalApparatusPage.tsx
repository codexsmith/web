import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Apparatus.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { instruments } from "./content/apparatus";
import { machineryProjection, machineryRecords } from "./content/machinery";
import { LabObjectIdentity } from "./LabObjectIdentity";
import { ApparatusContextSection } from "./sections/ApparatusContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";
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
              criticism, defects, authority, repair, and forward state. Lean–Agile flow
              keeps work and capacity visible; scientific method supplies evidence and
              falsification discipline; agentic reasoning supplies bounded search,
              decomposition, tool use, and critique. The apparatus makes those loops
              durable enough to inspect and hand off. That is intellectual stewardship made
              operational; when the machinery reaches people, institutions, infrastructure,
              or the physical world, humanist and ecological stewardship bound what
              technically successful operation is allowed to mean.</>}
          childLinks={institutionalChildRoutes.apparatus}
          >
          <blockquote className={styles.apparatusThesis}>
            <span>DESIGN POSTURE</span>
            Legible by humans. Executable by machines. Repairable under critique.
            Transferable without hidden dependence.<br />
            Agent proposes. Machine verifies. World adjudicates.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.machineryRegistry}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>REGISTERED MACHINERY</>}
            title={<>Addressable components, not a fictional master machine.</>}
            note={
              <>
                This source-bound projection preserves component identity, maturity,
                integration state, side effects, and authority ceilings without turning
                registry membership into runtime permission.
              </>
            }
          />

          <div className={styles.machinerySnapshot}>
            <div>
              <span>SOURCE-BOUND SNAPSHOT</span>
              <strong>{machineryRecords.length} registered BFL-MACH-* components</strong>
              <p>{machineryProjection.sourceStatus}</p>
            </div>
            <dl>
              <div>
                <dt>LAB REVISION</dt>
                <dd>{machineryProjection.sourceRevision.slice(0, 12)}</dd>
              </div>
              <div>
                <dt>REGISTRY DATE</dt>
                <dd>{machineryProjection.registryDate}</dd>
              </div>
            </dl>
            <p className={styles.machineryAuthority}>{machineryProjection.authority}</p>
            <a href={machineryProjection.sourceHref} target="_blank" rel="noreferrer">
              Inspect canonical machinery registry <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className={styles.machineryGrid}>
            {machineryRecords.map((machine) => (
              <article
                className={styles.machineryCard}
                id={"machinery-" + machine.machineId.toLowerCase()}
                key={machine.machineId}
              >
                <LabObjectIdentity
                  kind="apparatus"
                  kindLabel="Machinery"
                  identifier={machine.machineId}
                  identifierLabel="MACHINE"
                  status={machine.maturity}
                  statusLabel="MATURITY"
                  secondary={machine.integrationLevel}
                  secondaryLabel="INTEGRATION"
                />

                <div className={styles.machineryHeading}>
                  <h3>{machine.name}</h3>
                  <div className={styles.machineryRoles}>
                    {machine.functionRoles.map((role) => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.machineryMeta}>
                  <div>
                    <span>MANIFEST</span>
                    <strong>{machine.manifestStatus}</strong>
                  </div>
                  <div>
                    <span>SIDE EFFECT CLASS</span>
                    <strong>{machine.sideEffectClass}</strong>
                  </div>
                </div>

                <div className={styles.machineryHome}>
                  <span>CANONICAL HOME</span>
                  <code>{machine.canonicalHome}</code>
                </div>

                <div className={styles.machineryIoGrid}>
                  <div>
                    <span>ENTRYPOINTS</span>
                    <ul>
                      {machine.entrypoints.map((entrypoint, index) => (
                        <li key={entrypoint.kind + "-" + index}>
                          <strong>{entrypoint.kind}</strong>
                          <code>{entrypoint.locator}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>DURABLE PROJECTIONS</span>
                    {machine.durableProjections.length ? (
                      <ul>
                        {machine.durableProjections.map((projection) => (
                          <li key={projection}>{projection}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>None declared in the registry.</p>
                    )}
                  </div>
                </div>

                <div className={styles.machineryAuthorityGrid}>
                  <div>
                    <span>AUTHORITY CEILING</span>
                    <p>{machine.authorityCeiling}</p>
                  </div>
                  <div>
                    <span>NEXT INTEGRATION STEP</span>
                    <p>{machine.nextIntegrationStep}</p>
                  </div>
                </div>

                {machine.projectionPolicy ? (
                  <div className={styles.machineryProjectionPolicy}>
                    <span>PROJECTION POLICY</span>
                    <p>{machine.projectionPolicy}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.instrumentBench}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>INSTRUMENT BENCH</>}
            title={<>Different tools. Explicit authority ceilings.</>}
            note={<>The Instrument Bench names the public apparatus vocabulary; registered BFL-MACH-* components above are the independently addressable machinery.</>}
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
