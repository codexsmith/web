import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/AiGovernance.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import {
  aiGovernanceDoctrine,
  certificateQuestions,
  claimFirewall,
  consequenceChain,
  governanceDistinctions,
  governanceReviewComplements,
  reviewInstruments,
  selfGovernanceAllowed,
  selfGovernanceWithheld,
} from "./content/aiGovernance";

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
            Boundary First Labs uses artificial intelligence extensively. The governing
            distinction is not “AI yes” or “AI no.” It is whether a system is helping a
            person work—or exercising consequential delegated agency across a real boundary.
          </>
        }
        support={
          <>
            The governance burden should rise with the agency actually exercised and the
            consequences actually produced. Useful capability should accelerate. Consequential
            authority should become more explicit, contestable, repairable, and answerable.
          </>
        }
        childLinks={institutionalChildRoutes.aiGovernance}
      >
        <aside className={styles.governanceHeroInstrument} aria-label="AI governance doctrine">
          <span className={styles.governanceHeroEyebrow}>THREE-LAYER DOCTRINE</span>
          <div className={styles.governanceHeroRail}>
            <div data-tone="forge">
              <span>01</span>
              <strong>FORGE</strong>
              <small>what helps</small>
            </div>
            <i aria-hidden="true">→</i>
            <div data-tone="certify">
              <span>02</span>
              <strong>CERTIFY</strong>
              <small>what acts</small>
            </div>
            <i aria-hidden="true">→</i>
            <div data-tone="forbid">
              <span>03</span>
              <strong>FORBID</strong>
              <small>what dominates</small>
            </div>
          </div>
          <blockquote>
            Accelerate bounded assistance. Govern consequential agency. Refuse
            unaccountable domination.
          </blockquote>
          <div className={styles.governanceHeroStatus}>
            <span>PUBLIC DOCTRINE + PRACTICAL REVIEW METHOD</span>
            <strong>Not a legal certification regime.</strong>
          </div>
        </aside>
      </InstitutionalRouteHero>

      <section className={styles.forgeSection}>
        <div className={styles.forgeLead}>
          <p className={styles.sectionIndex}>AI IS A FORGE, NOT AN ORACLE</p>
          <h2>Capability can amplify craft without becoming authority.</h2>
          <p>
            A forge increases heat, pressure, shaping, and productive capacity. It does not
            decide what is worth making, whether the artifact is true or lawful, or who owns
            the consequence when it leaves the workshop.
          </p>
        </div>

        <div className={styles.forgeQuestions}>
          <span>What source material entered the process?</span>
          <span>What came from evidence versus inference?</span>
          <span>What defects did the AI expose or introduce?</span>
          <span>Which invariants must survive transformation?</span>
          <span>Who reviews the result?</span>
          <span>Who owns publication or deployment?</span>
        </div>

        <blockquote className={styles.forgeQuote}>
          Do not confuse fluency with temper.
        </blockquote>
      </section>

      <section className={styles.doctrineSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE GOVERNANCE MAP</>}
          title={<>Three regions, because not every use deserves the same burden.</>}
          note={
            <>
              The same underlying model can occupy different governance positions depending
              on tools, permissions, institutional authority, affected parties, and consequence.
            </>
          }
        />

        <div className={styles.doctrineGrid}>
          {aiGovernanceDoctrine.map((region) => (
            <article
              className={styles.doctrineCard}
              data-governance-tone={region.key}
              key={region.key}
            >
              <div className={styles.doctrineTopline}>
                <span>{region.code}</span>
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

      <section className={styles.boundarySection}>
        <div className={styles.boundaryLead}>
          <p className={styles.sectionIndex}>THE GOVERNANCE BOUNDARY</p>
          <h2>Tool → delegated agency.</h2>
          <p>
            A private drafting assistant and an autonomous benefits-denial workflow are not
            the same governance object. The relevant question is what the deployed system can
            actually cause, under whose authority, affecting whom, and with what possibility
            of contest and repair.
          </p>
        </div>

        <div className={styles.distinctionGrid}>
          {governanceDistinctions.map((item, index) => (
            <article key={item.label}>
              <span>{formatOrdinal(index)}</span>
              <strong>{item.label}</strong>
              <h3>{item.question}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>

        <blockquote className={styles.boundaryQuestion}>
          What agency does this system exercise, under whose authority, across which
          boundary, affecting whom, with what possibility of repair?
        </blockquote>
      </section>

      <section className={styles.consequenceSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>ACCOUNTABLE CONSEQUENCE</>}
          title={<>Agency must land somewhere.</>}
          note={
            <>
              Artificial agency is derivative. If responsibility disappears at a vendor
              boundary, API call, model output, automated workflow, or handoff, that
              disappearance is itself a governance defect.
            </>
          }
        />

        <div className={styles.consequenceRail} aria-label="AI consequence chain">
          {consequenceChain.map((step, index) => (
            <div key={step}>
              <span>{formatOrdinal(index)}</span>
              <strong>{step}</strong>
              {index < consequenceChain.length - 1 ? <i aria-hidden="true">→</i> : null}
            </div>
          ))}
        </div>

        <blockquote>
          Power should not become less answerable merely because it traveled through software.
        </blockquote>
      </section>

      <section className={styles.certificateSection}>
        <div className={styles.certificateLead}>
          <p className={styles.sectionIndex}>A BOUNDED DEPLOYMENT CLAIM</p>
          <h2>“Certificate” means declared authority under conditions—not “safe forever.”</h2>
          <p>
            For consequential artificial agency, the deployment should be able to state where
            it may act, what it must preserve, what evidence supports that authority, how it
            can fail, how people can contest it, and when that authority is suspended or revoked.
          </p>
          <blockquote>
            This system may act here, for this purpose, under this authority, while
            preserving these invariants, subject to these controls, contest paths,
            monitoring conditions, and revocation rules.
          </blockquote>
        </div>

        <div className={styles.certificateQuestionGrid}>
          {certificateQuestions.map((question, index) => (
            <div key={question}>
              <span>{formatOrdinal(index)}</span>
              <strong>{question}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.auditSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PRACTICAL REVIEW SURFACES</>}
          title={<>Governance should produce inspectable artifacts.</>}
          note={
            <>
              These are engineering and governance-review shapes. They complement—rather
              than replace—legal, regulatory, safety, security, privacy, and domain-specific authority.
            </>
          }
        />

        <div className={styles.auditGrid}>
          {reviewInstruments.map((instrument, index) => (
            <article key={instrument.title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{instrument.title}</h3>
              <p>{instrument.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.complementsBand}>
          <span>COMPLEMENTS, DOES NOT REPLACE</span>
          <div>
            {governanceReviewComplements.map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.selfGovernanceSection}>
        <div className={styles.selfGovernanceLead}>
          <p className={styles.sectionIndex}>THE LAB UNDER THE SAME RULE</p>
          <h2>What we ask of systems, we must ask of ourselves.</h2>
          <p>
            BFL uses AI inside research, software, publication, planning, synthesis, and
            operations. That makes the doctrine an internal constraint as well as a public position.
          </p>
        </div>

        <div className={styles.selfGovernanceGrid}>
          <article data-side="allowed">
            <span>AI MAY</span>
            {selfGovernanceAllowed.map((item) => <strong key={item}>{item}</strong>)}
          </article>
          <article data-side="withheld">
            <span>AI DOES NOT</span>
            {selfGovernanceWithheld.map((item) => <strong key={item}>{item}</strong>)}
          </article>
        </div>

        <blockquote>
          Automation may extend capability. Authority remains declared. Consequence remains owned.
        </blockquote>
      </section>

      <section className={styles.firewallSection}>
        <div className={styles.firewallLead}>
          <p className={styles.sectionIndex}>CLAIM FIREWALL</p>
          <h2>The doctrine is narrower than the rhetoric around AI.</h2>
          <p>
            The useful claim is not that one framework resolves AI governance. It is that
            exercised agency, authority, provenance, contestability, repair, and accountable
            consequence should become explicit before consequential deployment.
          </p>
        </div>

        <div className={styles.firewallGrid}>
          {claimFirewall.map((claim, index) => (
            <div key={claim}>
              <span>{formatOrdinal(index)}</span>
              <p>{claim}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.governanceClose}>
        <p className={styles.sectionIndex}>THE INSTITUTIONAL POSITION</p>
        <h2>Pro-capability. Anti-unaccountable consequence.</h2>
        <p>
          Boundary First Labs wants AI to help people learn faster, build more, understand
          difficult systems, preserve knowledge, repair institutions, conduct research, and
          reach capabilities that once required much larger organizations. That is precisely
          why consequential authority should remain bounded and answerable.
        </p>

        <div className={styles.governanceCloseActions}>
          <Link href="/v3/products/agentic-scientific-method">
            Explore Agentic Scientific Method <span aria-hidden="true">→</span>
          </Link>
          <Link href="/v3/contact?type=applied-work&source=ai-governance">
            Discuss a bounded AI governance review <span aria-hidden="true">→</span>
          </Link>
          <Link href="/v3/open-lab?type=BFL_CRITIQUE#open-lab-intake">
            Critique this doctrine <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
