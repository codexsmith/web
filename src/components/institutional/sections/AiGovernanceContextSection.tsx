import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/AiGovernance.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  certificateQuestions,
  claimFirewall,
  consequenceChain,
  governanceDistinctions,
  governanceReviewComplements,
  reviewInstruments,
  selfGovernanceAllowed,
  selfGovernanceWithheld,
} from "../content/aiGovernance";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const governanceContextOrder = [
  "governance-boundary",
  "accountable-consequence",
  "deployment-claim",
  "review-surfaces",
  "lab-self-governance",
  "claim-firewall",
] as const;

function GovernanceSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.governanceContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function GovernanceCard({
  id,
  label,
  eyebrow,
  title,
  description,
  className,
  tone,
  children,
}: {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  className: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <ReflowFieldItem
      id={id}
      label={label}
      className={[styles.governanceContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <GovernanceSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function AiGovernanceContextSection() {
  return (
    <section className={styles.governanceContext}>
      <div className={styles.governanceContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>INSPECT THE GOVERNANCE MACHINERY</>}
          title={<>Open the part you need.</>}
          note={<>The doctrine stays simple. The machinery underneath remains inspectable.</>}
        />

        <ReflowField
          className={styles.governanceContextGrid}
          ariaLabel="AI governance supporting machinery"
          layoutMode="focus-stage"
          itemOrder={governanceContextOrder}
        >
          <GovernanceCard
            id="governance-boundary"
            label="Governance Boundary"
            eyebrow="GOVERNANCE BOUNDARY"
            title="Tool → delegated agency."
            description="Separate capability from consequential action, authority, and accountability."
            className={styles.contextBoundary}
            tone="boundary"
          >
            <div className={styles.governanceDetail}>
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
            </div>
          </GovernanceCard>

          <GovernanceCard
            id="accountable-consequence"
            label="Accountable Consequence"
            eyebrow="ACCOUNTABLE CONSEQUENCE"
            title="Agency must land somewhere."
            description="Follow automated action all the way to an accountable owner and a repair path."
            className={styles.contextConsequence}
            tone="consequence"
          >
            <div className={styles.governanceDetail}>
              <div className={styles.consequenceRail} aria-label="AI consequence chain">
                {consequenceChain.map((step, index) => (
                  <div key={step}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{step}</strong>
                    {index < consequenceChain.length - 1 ? <i aria-hidden="true">→</i> : null}
                  </div>
                ))}
              </div>
              <blockquote className={styles.contextGovernanceQuote}>
                Power should not become less answerable merely because it traveled through software.
              </blockquote>
            </div>
          </GovernanceCard>

          <GovernanceCard
            id="deployment-claim"
            label="Bounded Deployment Claim"
            eyebrow="BOUNDED DEPLOYMENT CLAIM"
            title="Declare where the system may act."
            description="Authority should name its scope, invariants, evidence, contest paths, and revocation conditions."
            className={styles.contextCertificate}
            tone="certificate"
          >
            <div className={styles.governanceDetail}>
              <blockquote className={styles.contextGovernanceQuote} data-tone="certificate">
                This system may act here, for this purpose, under this authority, while
                preserving these invariants, subject to these controls, contest paths,
                monitoring conditions, and revocation rules.
              </blockquote>
              <div className={styles.certificateQuestionGrid}>
                {certificateQuestions.map((question, index) => (
                  <div key={question}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{question}</strong>
                  </div>
                ))}
              </div>
            </div>
          </GovernanceCard>

          <GovernanceCard
            id="review-surfaces"
            label="Practical Review Surfaces"
            eyebrow="PRACTICAL REVIEW SURFACES"
            title="Governance should leave artifacts."
            description="Turn review into concrete, inspectable objects rather than policy prose alone."
            className={styles.contextAudit}
            tone="audit"
          >
            <div className={styles.governanceDetail}>
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
            </div>
          </GovernanceCard>

          <GovernanceCard
            id="lab-self-governance"
            label="Lab Self-Governance"
            eyebrow="THE LAB UNDER THE SAME RULE"
            title="The doctrine constrains us too."
            description="AI may extend capability. Publication authority and consequential responsibility stay human."
            className={styles.contextSelfGovernance}
            tone="self"
          >
            <div className={styles.governanceDetail}>
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
              <blockquote className={styles.contextGovernanceQuote}>
                Automation may extend capability. Authority remains declared. Consequence remains owned.
              </blockquote>
            </div>
          </GovernanceCard>

          <GovernanceCard
            id="claim-firewall"
            label="Claim Firewall"
            eyebrow="CLAIM FIREWALL"
            title="Keep the doctrine narrower than the rhetoric."
            description="State explicitly what this framework does not establish."
            className={styles.contextFirewall}
            tone="firewall"
          >
            <div className={styles.governanceDetail}>
              <div className={styles.firewallGrid}>
                {claimFirewall.map((claim, index) => (
                  <div key={claim}>
                    <span>{formatOrdinal(index)}</span>
                    <p>{claim}</p>
                  </div>
                ))}
              </div>
            </div>
          </GovernanceCard>
        </ReflowField>
      </div>
    </section>
  );
}
