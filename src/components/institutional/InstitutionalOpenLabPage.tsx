import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/OpenLab.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import {
  InstitutionalRouteHero,
  InstitutionalSectionHeader,
} from "./InstitutionalPrimitives";
import { OpenLabIntakeInstrument } from "./OpenLabIntakeInstrument";
import {
  openLabSourceProjection,
  participationContracts,
  type OpenLabRuntimeConfig,
  type OpenLabSubmissionType,
} from "./content/openLab";
import { OpenLabContextSection } from "./sections/OpenLabContextSection";
import { institutionalChildRoutes } from "./institutionalRoutes";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalOpenLabPage({
  initialType,
  intakeConfig,
}: {
  initialType: OpenLabSubmissionType;
  intakeConfig: OpenLabRuntimeConfig;
}) {
  return (
    <InstitutionalPageShell mainClassName={styles.openLabPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.openLabHero}
        eyebrow={<>OPEN LAB</>}
        title={<>A research institution should have a permeable boundary.</>}
        lead={
          <>Boundary First Labs should not be a one-way publishing machine.</>
        }
        support={
          <>
            The public should be able to bring consequential systems, criticism,
            expertise, collaboration, failed reproductions, counterexamples, and
            unusual work to the Lab without first learning the Lab&apos;s internal
            vocabulary. Scientific method needs disconfirming evidence; agentic
            reasoning needs outside observations it did not generate for itself.
          </>
        }
        childLinks={institutionalChildRoutes.openLab}
      >
        <div className={styles.openLabHeroAsideStack}>
          <aside
            className={styles.openLabHeroIntake}
            data-live={intakeConfig.enabled ? "true" : "false"}
            aria-label="Open Lab intake status"
          >
            <div className={styles.openLabHeroIntakeSignal} aria-hidden="true" />
            <div>
              <span>INTAKE STATUS</span>
              <strong>
                {intakeConfig.enabled
                  ? "Governed submission receiver active."
                  : "Submission machinery staged; collection closed."}
              </strong>
              <p>
                {intakeConfig.enabled
                  ? "This deployment declares the receiver, authenticated handoff, policy version, retention window, and source-review acknowledgement required by the intake boundary."
                  : "The four contracts and transport machinery are implemented, but public collection stays closed until every deployment-level governance gate is explicitly satisfied."}
              </p>
              <small>
                SOURCE PROJECTION:{" "}
                {openLabSourceProjection.pageProjection.lifecycle.toUpperCase()} ·{" "}
                {openLabSourceProjection.pageProjection.institutionalStage.toUpperCase()} ·
                HUMAN REVIEW FLAG:{" "}
                {openLabSourceProjection.pageProjection.humanReviewed
                  ? "TRUE"
                  : "FALSE"}
              </small>
            </div>
          </aside>

          <blockquote className={styles.openLabThesis}>
            <span>FOUR PUBLIC CONTRACTS</span>
            We inspect public systems.
            <br />
            Inspect us.
            <br />
            Build with us.
            <br />
            Bring us what does not fit.
          </blockquote>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.openLabContracts}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PUBLIC PARTICIPATION</>}
          title={<>Four routes. Four different relationships.</>}
          note={
            <>
              Shared infrastructure can route them, but the public contracts stay
              distinct all the way into the versioned intake envelope.
            </>
          }
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
              <p className={styles.openLabContractSubtitle}>
                {contract.subtitle}
              </p>
              <p className={styles.openLabContractDescription}>
                {contract.description}
              </p>

              <div className={styles.openLabOrdinaryLanguage}>
                <span>WHAT WE ASK IN ORDINARY LANGUAGE</span>
                <ul>
                  {contract.ordinaryLanguage.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
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

              <Link
                className={styles.openLabContractAction}
                href={
                  "/v3/open-lab?type=" +
                  encodeURIComponent(contract.type) +
                  "#open-lab-intake"
                }
              >
                Inspect this intake route{" "}
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <OpenLabIntakeInstrument
        initialType={initialType}
        runtimeConfig={intakeConfig}
      />

      <OpenLabContextSection />

      <section className={styles.openLabClose}>
        <p className={styles.sectionIndex}>INSTITUTIONAL PROMISE</p>
        <h2>
          Make the boundary permeable enough that valuable observations,
          criticism, people, and work can enter—without forcing them into the
          wrong category first.
        </h2>
        <p>
          Open Lab is the designed public boundary of the institution. The four
          contracts now have a typed transport envelope, explicit collection
          controls, and a visible review-state model. Activation remains separate
          from implementation: the deployment must declare the stewardship
          conditions under which it is actually prepared to collect material.
        </p>
        <nav
          className={styles.openLabCloseLinks}
          aria-label="Open Lab next steps"
        >
          <Link href="/v3/contact?type=open-lab&source=open-lab">
            Start a conversation without formal intake{" "}
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link href="#open-lab-intake">
            Inspect the governed intake boundary{" "}
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
