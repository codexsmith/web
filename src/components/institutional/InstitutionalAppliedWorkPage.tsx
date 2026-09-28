import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AppliedWork.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { AppliedWorkEvidenceReflow } from "./sections/AppliedWorkEvidenceReflow";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  appliedWorkBoundaries,
  appliedWorkFamilies,
  appliedWorkProcess,
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

      <AppliedWorkEvidenceReflow />

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
