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
  appliedWorkAudiences,
  appliedWorkBoundaries,
  appliedWorkFamilies,
  appliedWorkGoodFit,
  appliedWorkOutputs,
  appliedWorkProcess,
} from "./content/appliedWork";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalAppliedWorkPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.appliedWorkPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.appliedWorkHero}
        eyebrow={<>APPLIED WORK</>}
        title={<>What can Boundary First Labs help your organization do?</>}
        lead={
          <>
            Diagnose difficult systems. Repair software and architecture. Review AI
            used in consequential decisions and workflows. Design small pilots. Make research
            and institutional knowledge easier to inspect, operate, and hand off.
          </>
        }
        support={
          <>
            The commercial work is deliberately practical. A client does not need to buy
            the Lab&apos;s theory or vocabulary. The engagement has to produce something
            useful enough to inspect, use, test, or make a decision from.
          </>
        }
        childLinks={institutionalChildRoutes.appliedWork}
      >
        <aside className={styles.appliedWorkStatus}>
          <span>CURRENT COMMERCIAL POSTURE</span>
          <strong>Ready to scope. Still building BFL-specific case studies and repeat-client evidence.</strong>
          <p>
            These offers grow out of prior professional work in software engineering,
            architecture, consulting, Lean–Agile delivery, scientific-method discipline,
            agentic problem solving, startup iteration, and systems diagnosis. The public site does
            not imply that Boundary First Labs already has repeat external service revenue
            or a mature client case-study portfolio.
          </p>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.appliedFitSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHEN TO CALL</>}
          title={<>Good applied work starts with a problem you can already feel.</>}
          note={<>These are the kinds of conditions where the Lab&apos;s systems practice is most useful.</>}
        />

        <div className={styles.appliedFitGrid}>
          {appliedWorkGoodFit.map((signal, index) => (
            <article key={signal}>
              <span>{formatOrdinal(index)}</span>
              <p>{signal}</p>
            </article>
          ))}
        </div>

        <div className={styles.appliedAudienceBand}>
          <span>COMMON COUNTERPARTS</span>
          <div>{appliedWorkAudiences.map((audience) => <strong key={audience}>{audience}</strong>)}</div>
        </div>
      </section>

      <section className={styles.appliedServicesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>SERVICES</>}
          title={<>Three kinds of work. Nine concrete ways to start.</>}
          note={<>The outer category tells you the problem family; the inner cards are actual engagement shapes.</>}
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
          <p className={styles.sectionIndex}>WORKING BOUNDARIES</p>
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
          <Link href="/contact?type=applied-work&source=applied-work">Start an applied-work conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/collaboration">Explore collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">See applied projects <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">See the funding model <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
