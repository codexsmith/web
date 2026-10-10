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
import { ArchitectureProjectionSection } from "./ArchitectureProjectionSection";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalApparatusPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.apparatusPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.apparatusHero}
          eyebrow={<>APPARATUS</>}
          title={<>Tools that keep research inspectable, testable, and transferable.</>}
          lead={<>A paper can show the result. Serious research also needs a durable record of how that result was reached.</>}
          support={<>Boundary First Labs builds tools for tracking questions, sources, experiments,
              claims, evidence, criticism, failures, revisions, and responsibility. The goal is
              simple: another person should be able to see what happened, challenge it, and
              continue the work without depending on hidden context.</>}
          childLinks={institutionalChildRoutes.apparatus}
          >
          <blockquote className={styles.apparatusThesis}>
            <span>DESIGN POSTURE</span>
            Human-readable. Machine-checkable. Open to correction.
            Transferable without hidden dependence.<br />
            AI can propose. Tools can check. Evidence decides.
          </blockquote>
        </InstitutionalRouteHero>

        <ArchitectureProjectionSection
          eyebrow="HOW THE LAB KEEPS TRACK"
          title="Separate sources of truth, connected deliberately."
          copy={[
            "The Lab does not force every kind of research state into one master database. Papers, experiments, products, source records, and operations keep their own responsible homes, while shared directories and links make them easier to find.",
            "Tools can search, compare, validate, transform, and summarize that material, but using a tool does not give the tool authority to declare a scientific claim true or make a consequential decision on its own.",
          ]}
          variant="apparatus-stack"
          pullLine="Make the work easy to inspect without making the machinery the authority."
        />

        <section className={styles.machineryRegistry}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>TECHNICAL MACHINERY DIRECTORY</>}
            title={<>What tools exist, what they do, and where they stop.</>}
            note={
              <>
                The detailed registry below is for readers who want the engineering view.
                It records each tool&apos;s source location, maturity, inputs, outputs, and
                limits. Being listed here does not mean a tool may run automatically or make
                scientific or institutional decisions.
              </>
            }
          />

          <div className={styles.machinerySnapshot}>
            <div>
              <span>TECHNICAL SNAPSHOT</span>
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
            <p className={styles.privateSourceNote}>
              Canonical machinery registry is private. This dated public snapshot
              exposes selected identities, responsibilities, and declared limits.
            </p>
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
                    <span>DECLARED CONFIGURATION</span>
                    <strong>{machine.manifestStatus}</strong>
                  </div>
                  <div>
                    <span>CHANGE TYPE</span>
                    <strong>{machine.sideEffectClass}</strong>
                  </div>
                </div>

                <div className={styles.machineryHome}>
                  <span>SOURCE LOCATION</span>
                  <code>{machine.canonicalHome}</code>
                </div>

                <div className={styles.machineryIoGrid}>
                  <div>
                    <span>HOW IT IS USED</span>
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
                    <span>DURABLE OUTPUTS / VIEWS</span>
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
                    <span>WHAT IT MAY DO</span>
                    <p>{machine.authorityCeiling}</p>
                  </div>
                  <div>
                    <span>WHAT COMES NEXT</span>
                    <p>{machine.nextIntegrationStep}</p>
                  </div>
                </div>

                {machine.projectionPolicy ? (
                  <div className={styles.machineryProjectionPolicy}>
                    <span>HOW DERIVED VIEWS ARE HANDLED</span>
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
            eyebrow={<>WHAT THE TOOLS ARE FOR</>}
            title={<>Different tools, different jobs, clear limits.</>}
            note={<>This section explains the public-facing purpose of the Lab&apos;s main research tools. The technical registry above preserves their internal engineering identities.</>}
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
                    <span>WHAT IT TRACKS OR CHANGES</span>
                    <p>{instrument.observes}</p>
                  </div>
                  <div>
                    <span>WHY IT EXISTS</span>
                    <p>{instrument.prevents}</p>
                  </div>
                  <div className={styles.instrumentAuthority}>
                    <span>WHAT IT MAY DO</span>
                    <p>{instrument.authority}</p>
                  </div>
                  <div className={styles.instrumentNoAuthority}>
                    <span>WHAT IT MAY NOT DECIDE</span>
                    <p>{instrument.noAuthority}</p>
                  </div>
                </div>

                <div className={styles.instrumentHandoff}>
                  <span>HANDOFF / OWNERSHIP</span>
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
