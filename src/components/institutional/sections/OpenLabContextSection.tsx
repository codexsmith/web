import type { ReactNode } from "react";
import Link from "next/link";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/OpenLab.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  stewardshipGates,
  sharedEnvelope,
  capabilityOutcomes,
} from "../content/openLab";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const openLabContextOrder = [
  "agency",
  "stewardship",
  "shared-infrastructure",
  "humanist-interface",
  "capability-transfer",
] as const;

function OpenLabContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.openLabContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function OpenLabContextCard({
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
      className={[styles.openLabContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <OpenLabContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function OpenLabContextSection() {
  return (
    <section className={styles.openLabContext}>
      <div className={styles.openLabContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT HAPPENS AFTER FIRST CONTACT</>}
          title={<>Simple entry, clearer rules as the relationship deepens.</>}
          note={<>The first email is intentionally lightweight. More structured review, data handling, publication, or collaboration should add clearer consent, privacy, ownership, and responsibility rules as needed.</>}
        />

        <ReflowField
          className={styles.openLabContextGrid}
          ariaLabel="Open Lab governance and stewardship context"
          layoutMode="focus-stage"
          itemOrder={openLabContextOrder}
        >
          <OpenLabContextCard
            id="agency"
            label="Challenge and Response"
            eyebrow="CHALLENGE AND RESPONSE"
            title="The Lab can be challenged without treating every submission as correct."
            description="Criticism and local knowledge should be reviewable, while the Lab still distinguishes evidence, scope, and responsibility."
            className={styles.openLabContextAgency}
            tone="agency"
          >
            <div className={styles.openLabAgencyDetail}>
              <p>
                The Lab may inspect a public system, and the public may inspect the Lab.
                A collaborator may reject BFL&apos;s framing. A critic may expose a missing
                distinction. A community may know consequences the public record does not
                represent adequately.
              </p>
              <blockquote>
                The institution should be able to receive information without pretending every
                submission is correct, actionable, or within scope.
              </blockquote>
              <Link className={styles.openLabGovernanceBridge} href="/v3/ai-governance">
                Inspect the Lab&apos;s AI agency and accountability doctrine
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </OpenLabContextCard>

          <OpenLabContextCard
            id="stewardship"
            label="Privacy and Consent"
            eyebrow="PRIVACY AND CONSENT"
            title="Collecting information creates obligations immediately."
            description="Any structured intake should make privacy, consent, retention, security, moderation, and response expectations explicit."
            className={styles.openLabContextStewardship}
            tone="stewardship"
          >
            <div className={styles.openLabContextDetail}>
              <p>
                Email is the current first-contact boundary. If a relationship moves into
                structured collection or review, these controls should be established before
                asking for more material.
              </p>
              <div className={styles.openLabGateGrid}>
                {stewardshipGates.map((gate, index) => (
                  <div className={styles.openLabGatePlate} key={gate}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{gate}</strong>
                  </div>
                ))}
              </div>
            </div>
          </OpenLabContextCard>

          <OpenLabContextCard
            id="shared-infrastructure"
            label="Keep the Request Intact"
            eyebrow="KEEP THE REQUEST INTACT"
            title="One contact system should not erase what the person actually asked for."
            description="Shared routing can support multiple kinds of participation while preserving whether the person brought a critique, system, collaboration idea, or other work."
            className={styles.openLabContextInfrastructure}
            tone="infrastructure"
          >
            <div className={styles.openLabContextDetail}>
              <p>
                A future backend may share identity, consent, provenance, privacy, and routing
                machinery while preserving what kind of relationship the person actually
                requested.
              </p>
              <div className={styles.openLabEnvelope}>
                <span>COMMON ENVELOPE — CANDIDATE</span>
                <div>
                  {sharedEnvelope.map((field) => <code key={field}>{field}</code>)}
                </div>
              </div>
            </div>
          </OpenLabContextCard>

          <OpenLabContextCard
            id="humanist-interface"
            label="Plain-Language Intake"
            eyebrow="PLAIN-LANGUAGE INTAKE"
            title="The Lab should do the categorizing, not the visitor."
            description="People should be able to describe what happened, what they have, what keeps failing, or what they are trying to do in ordinary language."
            className={styles.openLabContextInterface}
            tone="interface"
          >
            <div className={styles.openLabContextDetail}>
              <p>
                People should not need to translate themselves into research lanes,
                registries, critique objects, evidence-source types, or product categories
                before the Lab is willing to understand what they are trying to say.
              </p>
              <div className={styles.openLabTranslation}>
                <span>PUBLIC LANGUAGE</span>
                <strong>What happened? What do you have? What keeps failing? What are you trying to do?</strong>
                <span>INTERNAL ROUTING — LATER</span>
                <strong>Research lane · critique object · collaboration record · project candidate · evidence source · civic case</strong>
              </div>
            </div>
          </OpenLabContextCard>

          <OpenLabContextCard
            id="capability-transfer"
            label="Leave Capability Behind"
            eyebrow="LEAVE CAPABILITY BEHIND"
            title="Useful work should make the other side stronger."
            description="The preferred outcome is durable knowledge, tools, documentation, or process rather than dependence on Boundary First Labs."
            className={styles.openLabContextCapability}
            tone="capability"
          >
            <div className={styles.openLabContextDetail}>
              <p>
                When BFL does work with a person or institution, the preferred outcome is
                increased durable capability rather than manufactured dependency on the Lab.
              </p>
              <div className={styles.openLabCapabilityGrid}>
                {capabilityOutcomes.map((outcome, index) => (
                  <div className={styles.openLabCapabilityPlate} key={outcome}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{outcome}</strong>
                  </div>
                ))}
              </div>
            </div>
          </OpenLabContextCard>
        </ReflowField>
      </div>
    </section>
  );
}
