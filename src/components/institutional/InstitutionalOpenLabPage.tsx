import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader, InstitutionalSectionLead } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";

import { participationContracts, stewardshipGates, sharedEnvelope, capabilityOutcomes } from "./content/openLab";
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
          <blockquote className={styles.openLabThesis}>
            <span>FOUR PUBLIC CONTRACTS</span>
            We inspect public systems.<br />
            Inspect us.<br />
            Build with us.<br />
            Bring us what does not fit.
          </blockquote>
        </InstitutionalRouteHero>

        <section className={styles.openLabAvailability}>
          <div className={styles.openLabAvailabilitySignal} aria-hidden="true" />
          <div>
            <span>INTAKE STATUS</span>
            <h2>Participation contracts designed. Submission pipeline not yet live.</h2>
            <p>
              Privacy, retention, security, moderation, consent, and response-capacity
              rules must be defined before the site invites people to send material.
              Please do not submit sensitive information through ad hoc channels in the
              meantime.
            </p>
          </div>
        </section>

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

        <section className={styles.openLabAgency}>
          <div>
            <p className={styles.sectionIndex}>AGENCY IN BOTH DIRECTIONS</p>
            <h2>Permeability with governance.</h2>
            <p>
              The Lab may inspect a public system, and the public may inspect the Lab.
              A collaborator may reject BFL&apos;s framing. A critic may expose a missing
              distinction. A community may know consequences the public record does not
              represent adequately.
            </p>
          </div>

          <blockquote>
            The institution should be able to receive information without pretending every
            submission is correct, actionable, or within scope.
          </blockquote>
        </section>

        <section className={styles.openLabStewardship}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>STEWARDSHIP BEGINS AT COLLECTION</>}
            title={<>Intake creates obligations before it creates opportunities.</>}
            description={<>The site should not invite disclosure merely because a form can technically
              accept it. These controls must exist before public submission goes live.</>}
            />

          <div className={styles.openLabGateGrid}>
            {stewardshipGates.map((gate, index) => (
              <div className={styles.openLabGatePlate} key={gate}>
                <span>{formatOrdinal(index)}</span>
                <strong>{gate}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.openLabInfrastructure}>
          <div>
            <p className={styles.sectionIndex}>SHARED INFRASTRUCTURE, DISTINCT CONTRACTS</p>
            <h2>One envelope can route four typed intents.</h2>
            <p>
              A future backend may share identity, consent, provenance, privacy, and routing
              machinery while preserving what kind of relationship the person actually
              requested.
            </p>
          </div>

          <div className={styles.openLabEnvelope}>
            <span>COMMON ENVELOPE — CANDIDATE</span>
            <div>
              {sharedEnvelope.map((field) => <code key={field}>{field}</code>)}
            </div>
          </div>
        </section>

        <section className={styles.openLabInterfaceRule}>
          <div>
            <p className={styles.sectionIndex}>HUMANIST INTERFACE RULE</p>
            <h2>The institution owns the burden of routing.</h2>
            <p>
              People should not need to translate themselves into research lanes,
              registries, critique objects, evidence-source types, or product categories
              before the Lab is willing to understand what they are trying to say.
            </p>
          </div>

          <div className={styles.openLabTranslation}>
            <span>PUBLIC LANGUAGE</span>
            <strong>What happened? What do you have? What keeps failing? What are you trying to do?</strong>
            <span>INTERNAL ROUTING — LATER</span>
            <strong>Research lane · critique object · collaboration record · project candidate · evidence source · civic case</strong>
          </div>
        </section>

        <section className={styles.openLabCapability}>
          <InstitutionalSectionLead
            styles={styles}
            eyebrow={<>CAPABILITY, NOT DEPENDENCE</>}
            title={<>Useful work should leave something behind.</>}
            description={<>When BFL does work with a person or institution, the preferred outcome is
              increased durable capability rather than manufactured dependency on the Lab.</>}
            />

          <div className={styles.openLabCapabilityGrid}>
            {capabilityOutcomes.map((outcome, index) => (
              <div className={styles.openLabCapabilityPlate} key={outcome}>
                <span>{formatOrdinal(index)}</span>
                <strong>{outcome}</strong>
              </div>
            ))}
          </div>
        </section>

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
        </section>
      </InstitutionalPageShell>
  );
}
