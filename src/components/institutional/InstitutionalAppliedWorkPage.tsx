import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AppliedWork.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  appliedWorkBoundaries,
  appliedWorkFamilies,
  appliedWorkOutputs,
  appliedWorkProcess,
  systemsArchitectureReviewDemo,
} from "./content/appliedWork";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAppliedWorkPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.appliedWorkPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.appliedWorkHero}
        eyebrow={<>CONSULTING / APPLIED WORK</>}
        title={<>Consulting for difficult systems.</>}
        lead={
          <>
            Systems / Architecture Review. Agency / AI Governance Audit. Knowledge /
            Representation Infrastructure Diagnostic.
          </>
        }
        support={
          <>
            Bring a system, workflow, decision, or failure that is expensive to misunderstand.
            We start with the buyer&apos;s problem, leave behind durable artifacts, and introduce
            deeper machinery only where the diagnosis justifies it.
          </>
        }
        childLinks={institutionalChildRoutes.appliedWork}
      >
        <aside className={styles.appliedWorkStatus}>
          <span>CONSULTING AVAILABILITY</span>
          <strong>Currently prioritizing bounded Systems / Architecture Reviews, with governance and knowledge-infrastructure diagnostics available where the problem calls for them.</strong>
          <p>
            The work draws on prior professional experience in software engineering,
            architecture, consulting, Lean–Agile delivery, startup iteration, and systems
            diagnosis. BFL-specific client case studies are still being built.
          </p>
          <Link
            className={styles.appliedWorkHeroCta}
            href="/contact?type=applied-work&source=applied-work-hero"
          >
            Start a consulting conversation <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.appliedServicesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>SERVICES</>}
          title={<>Three offers. Nine bounded engagement shapes.</>}
          note={<>Choose the buyer problem first. The inner cards show concrete ways the work can begin.</>}
        />

        <div className={styles.appliedServiceStack}>
          {appliedWorkFamilies.map((family) => (
            <article
              className={styles.appliedServiceFamily}
              data-applied-tone={family.tone}
              key={family.code}
            >
              <header>
                <span>{family.code}</span>
                <div>
                  <h3>{family.title}</h3>
                  <p>{family.description}</p>
                </div>
              </header>

              <div className={styles.appliedOfferGrid}>
                {family.offers.map((offer) => (
                  <div key={offer.title}>
                    <strong>{offer.title}</strong>
                    <p>{offer.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedDemoSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>{systemsArchitectureReviewDemo.eyebrow}</>}
          title={<>See exactly what a Systems / Architecture Review is doing.</>}
          note={<>Synthetic example, not a customer case. Read the setup first, then follow the analysis from representation gap to repair.</>}
        />

        <div className={styles.appliedDemoSetup} aria-label="Synthetic review setup">
          {systemsArchitectureReviewDemo.setup.map((item, index) => (
            <article key={item.label}>
              <span>{formatOrdinal(index)}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.appliedDemoFrame}>
          <article className={styles.appliedDemoLead}>
            <span>01 / REPRESENTATION GAP</span>
            <h3>{systemsArchitectureReviewDemo.title}</h3>
            <p>{systemsArchitectureReviewDemo.summary}</p>
            <blockquote>{systemsArchitectureReviewDemo.question}</blockquote>

            <div className={styles.appliedDemoStateCompare}>
              <div>
                <small>CURRENT SYSTEM VIEW</small>
                {systemsArchitectureReviewDemo.coarseStates.map((state) => (
                  <strong key={state}>{state}</strong>
                ))}
              </div>
              <div>
                <small>ACTUAL PAYMENT LIFECYCLE</small>
                {systemsArchitectureReviewDemo.reconstructedStates.map((state) => (
                  <span key={state}>{state}</span>
                ))}
              </div>
            </div>
          </article>

          <div className={styles.appliedDemoAnalysis}>
            <div className={styles.appliedDemoDefects}>
              <span>02 / WHAT BREAKS WHEN STATES COLLAPSE</span>
              <div>
                {systemsArchitectureReviewDemo.defectClasses.map((defect) => (
                  <article key={defect.title}>
                    <strong>{defect.title}</strong>
                    <p>{defect.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.appliedDemoRepair}>
              <span>03 / REPAIR THE REPRESENTATION</span>
              <ol>
                {systemsArchitectureReviewDemo.repairPath.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className={styles.appliedDemoFooter}>
          <div>
            <span>WHAT THE REVIEW LEAVES BEHIND</span>
            <div className={styles.appliedDemoDeliverables}>
              {systemsArchitectureReviewDemo.deliverables.map((deliverable) => (
                <strong key={deliverable}>{deliverable}</strong>
              ))}
            </div>
          </div>
          <div>
            <span>CLAIM CEILING</span>
            <p>{systemsArchitectureReviewDemo.claim}</p>
          </div>
          <Link
            className={styles.appliedDemoCta}
            href="/contact?type=applied-work&source=systems-architecture-demo"
          >
            Bring a system to review <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.appliedOutputsSection}>
        <div className={styles.appliedOutputsLead}>
          <p className={styles.sectionIndex}>WHAT YOU SHOULD GET</p>
          <h2>The work should leave behind artifacts, not just conversation.</h2>
          <p>
            The exact deliverables depend on the engagement, but the output should make the
            problem clearer, the decision easier, or the system more operable after BFL is gone.
          </p>
        </div>

        <div className={styles.appliedOutputGrid}>
          {appliedWorkOutputs.map((output, index) => (
            <article key={output.title}>
              <span>{formatOrdinal(index)}</span>
              <strong>{output.title}</strong>
              <p>{output.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW AN ENGAGEMENT STARTS</>}
          title={<>Start with the smallest piece of work that can change the next decision.</>}
          note={<>Pricing and duration belong after the problem and deliverable are bounded, not before.</>}
        />

        <div className={styles.appliedProcessRail}>
          {appliedWorkProcess.map(([title, description], index) => (
            <article key={title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedBoundariesSection}>
        <div className={styles.appliedBoundariesLead}>
          <p className={styles.sectionIndex}>CONSULTING PRINCIPLES</p>
          <h2>Useful consulting should reduce ambiguity without manufacturing certainty.</h2>
          <p>
            Boundary First Labs is most useful when the engagement can make state,
            responsibility, assumptions, evidence, and repair more explicit.
          </p>
        </div>

        <div className={styles.appliedBoundaryGrid}>
          {appliedWorkBoundaries.map((boundary) => (
            <article key={boundary.label}>
              <span>{boundary.label}</span>
              <p>{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.appliedWorkClose}>
        <p className={styles.sectionIndex}>A GOOD FIRST ENGAGEMENT</p>
        <h2>Bring one system that is expensive to misunderstand.</h2>
        <p>
          A useful first step may be a review, workshop, diagnostic, prototype, or bounded
          pilot. If the work creates evidence and the next problem becomes clearer, the
          relationship can grow from there.
        </p>

        <nav className={styles.appliedWorkCloseLinks} aria-label="Applied work next steps">
          <Link href="/contact?type=applied-work&source=applied-work">Start a consulting conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/collaboration">Explore collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">See applied projects <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">See the funding model <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
