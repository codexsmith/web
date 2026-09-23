import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { institutionalChildRoutes } from "./institutionalRoutes";
import { AiGovernanceContextSection } from "./sections/AiGovernanceContextSection";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AiGovernance.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { aiGovernanceDoctrine } from "./content/aiGovernance";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

export function InstitutionalAiGovernancePage() {
  return (
    <InstitutionalPageShell mainClassName={styles.aiGovernancePage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.aiGovernanceHero}
        eyebrow={<>AI GOVERNANCE</>}
        title={<>AI should expand human agency without escaping human accountability.</>}
        lead={
          <>
            Boundary First Labs uses artificial intelligence extensively. The question is not
            “AI yes” or “AI no,” but where AI assists human work and where it exercises
            consequential delegated agency.
          </>
        }
        support={
          <>
            Governance burden should rise with the agency exercised and the consequences
            produced. Useful capability should accelerate. Consequential authority should
            become explicit, contestable, repairable, and answerable.
          </>
        }
        childLinks={institutionalChildRoutes.aiGovernance}
      >
        <aside className={styles.governanceHeroInstrument} aria-label="AI governance doctrine">
          <div className={styles.governanceHeroSignalCard}>
            <span className={styles.governanceHeroSignalLabel}>THREE-LAYER DOCTRINE</span>
            <div className={styles.governanceHeroTags}>
              <strong data-tone="forge">
                <i aria-hidden="true" />
                <span>FORGE</span>
              </strong>
              <strong data-tone="certify">
                <i aria-hidden="true" />
                <span>CERTIFY</span>
              </strong>
              <strong data-tone="forbid">
                <i aria-hidden="true" />
                <span>FORBID</span>
              </strong>
            </div>
          </div>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.forgeSection}>
        <div className={styles.forgeLead}>
          <p className={styles.sectionIndex}>AI IS A FORGE, NOT AN ORACLE</p>
          <h2>Capability can amplify craft without becoming authority.</h2>
        </div>
      </section>

      <section className={styles.doctrineSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE GOVERNANCE MAP</>}
          title={<>Forge what helps. Certify what acts. Forbid what dominates.</>}
          note={<>Different uses deserve different governance burdens.</>}
        />

        <aside className={styles.doctrineInstrument} aria-label="Three-layer AI governance doctrine">
          <span className={styles.doctrineInstrumentEyebrow}>THREE-LAYER DOCTRINE</span>
          <div className={styles.doctrineInstrumentRail}>
            <div data-tone="forge">
              <strong>FORGE</strong>
              <small>what helps</small>
            </div>
            <i aria-hidden="true">→</i>
            <div data-tone="certify">
              <strong>CERTIFY</strong>
              <small>what acts</small>
            </div>
            <i aria-hidden="true">→</i>
            <div data-tone="forbid">
              <strong>FORBID</strong>
              <small>what dominates</small>
            </div>
          </div>
          <blockquote>
            Accelerate bounded assistance. Govern consequential agency. Refuse
            unaccountable domination.
          </blockquote>
          <div className={styles.doctrineInstrumentStatus}>
            <span>PUBLIC DOCTRINE + PRACTICAL REVIEW METHOD</span>
            <strong>Not a legal certification regime.</strong>
          </div>
        </aside>

        <div className={styles.doctrineGrid}>
          {aiGovernanceDoctrine.map((region) => (
            <article
              className={styles.doctrineCard}
              data-governance-tone={region.key}
              key={region.key}
            >
              <div className={styles.doctrineTopline}>
                <strong>{region.verb.toUpperCase()}</strong>
              </div>
              <h3>{region.title}</h3>
              <p>{region.description}</p>
              <div className={styles.doctrineBoundary}>
                <span>BOUNDARY</span>
                <p>{region.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AiGovernanceContextSection />

      <section className={styles.governanceClose}>
        <p className={styles.sectionIndex}>THE INSTITUTIONAL POSITION</p>
        <h2>Pro-capability. Anti-unaccountable consequence.</h2>
        <p>
          AI can expand what people and small institutions are able to build, inspect,
          understand, and repair. Consequential authority should remain bounded and answerable.
        </p>

        <div className={styles.governanceCloseActions}>
          <Link href="/products/agentic-scientific-method">
            Explore Agentic Scientific Method <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact?type=applied-work&source=ai-governance">
            Discuss a bounded AI governance review <span aria-hidden="true">→</span>
          </Link>
          <Link href="/open-lab?type=BFL_CRITIQUE#open-lab-intake">
            Critique this doctrine <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
