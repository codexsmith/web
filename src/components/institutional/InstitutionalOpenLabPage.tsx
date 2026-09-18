import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";

import { participationContracts } from "./content/openLab";
import { OpenLabContextSection } from "./sections/OpenLabContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";
const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalOpenLabPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.openLabPage}>
        <InstitutionalRouteHero
          styles={styles}
          className={styles.openLabHero}
          eyebrow={<>OPEN LAB</>}
          title={<>A research institution should have a permeable boundary.</>}
          lead={<>Boundary First Labs should not be a one-way publishing machine.</>}
          support={<>The public should be able to bring consequential systems, criticism,
              expertise, collaboration, and unusual work to the Lab without first
              learning the Lab&apos;s internal vocabulary.</>}
          childLinks={institutionalChildRoutes.openLab}
          >
          <div className={styles.openLabHeroAsideStack}>
            <aside className={styles.openLabHeroIntake} aria-label="Open Lab intake status">
              <div className={styles.openLabHeroIntakeSignal} aria-hidden="true" />
              <div>
                <span>INTAKE STATUS</span>
                <strong>Submission pipeline not yet live.</strong>
                <p>
                  Participation contracts are designed. Privacy, consent, retention,
                  security, moderation, and response-capacity controls must be ready before
                  public submission opens.
                </p>
              </div>
            </aside>

            <blockquote className={styles.openLabThesis}>
              <span>FOUR PUBLIC CONTRACTS</span>
              We inspect public systems.<br />
              Inspect us.<br />
              Build with us.<br />
              Bring us what does not fit.
            </blockquote>
          </div>
        </InstitutionalRouteHero>

        <section className={styles.openLabContracts}>
          <InstitutionalSectionHeader
            styles={styles}
            eyebrow={<>PUBLIC PARTICIPATION</>}
            title={<>Four routes. Four different relationships.</>}
            note={<>Shared infrastructure may route them later, but the public contracts stay distinct.</>}
            />

          <div className={styles.openLabContractGrid}>
            {participationContracts.map((contract) => (
              <article
                className={styles.openLabContractCard}
                data-open-lab-tone={contract.tone}
                key={contract.title}
              >
                <div className={styles.openLabContractTopline}>
                  <span className={styles.openLabContractCode}>{contract.code}</span>
                  <code>{contract.type}</code>
                </div>

                <h3>{contract.title}</h3>
                <p className={styles.openLabContractSubtitle}>{contract.subtitle}</p>
                <p className={styles.openLabContractDescription}>{contract.description}</p>

                <div className={styles.openLabOrdinaryLanguage}>
                  <span>WHAT WE WOULD ASK IN ORDINARY LANGUAGE</span>
                  <ul>
                    {contract.ordinaryLanguage.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className={styles.openLabOutcome}>
                  <span>POSSIBLE ROUTING / OUTCOME</span>
                  <p>{contract.possibleOutcomes}</p>
                </div>

                <div className={styles.openLabBoundary}>
                  <span>BOUNDARY</span>
                  <p>{contract.boundary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <OpenLabContextSection />

        <section className={styles.openLabClose}>
          <p className={styles.sectionIndex}>INSTITUTIONAL PROMISE</p>
          <h2>
            Make the boundary permeable enough that valuable observations, criticism,
            people, and work can enter—without forcing them into the wrong category first.
          </h2>
          <p>
            Open Lab is the designed public boundary of the institution. The contracts are
            now legible; the submission machinery should only become active when its
            stewardship controls are ready.
          </p>
          <nav className={styles.openLabCloseLinks} aria-label="Open Lab next steps">
            <a href="/v3/contact?type=open-lab&source=open-lab">
              Start a conversation without submitting material <span aria-hidden="true">-&gt;</span>
            </a>
          </nav>
        </section>
      </InstitutionalPageShell>
  );
}
