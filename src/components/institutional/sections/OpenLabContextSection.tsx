import type { ReactNode } from "react";
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
          eyebrow={<>OPEN LAB CONTEXT</>}
          title={<>The governance machinery around a permeable boundary.</>}
          note={<>Public participation stays visible; these supporting rules explain how intake, routing, stewardship, and transfer remain bounded.</>}
        />

        <ReflowField
          className={styles.openLabContextGrid}
          ariaLabel="Open Lab governance and stewardship context"
          layoutMode="focus-stage"
          itemOrder={openLabContextOrder}
        >
          <OpenLabContextCard
            id="agency"
            label="Agency in Both Directions"
            eyebrow="AGENCY IN BOTH DIRECTIONS"
            title="Permeability with governance."
            description="The Lab can receive criticism and local knowledge without pretending every submission is correct, actionable, or within scope."
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
            </div>
          </OpenLabContextCard>

          <OpenLabContextCard
            id="stewardship"
            label="Stewardship Begins at Collection"
            eyebrow="STEWARDSHIP BEGINS AT COLLECTION"
            title="Intake creates obligations before it creates opportunities."
            description="Collection should not go live until privacy, consent, retention, security, moderation, and response controls are ready."
            className={styles.openLabContextStewardship}
            tone="stewardship"
          >
            <div className={styles.openLabContextDetail}>
              <p>
                The site should not invite disclosure merely because a form can technically
                accept it. These controls must exist before public submission goes live.
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
            label="Shared Infrastructure, Distinct Contracts"
            eyebrow="SHARED INFRASTRUCTURE, DISTINCT CONTRACTS"
            title="One envelope can route four typed intents."
            description="Shared identity, consent, provenance, privacy, and routing machinery should preserve the relationship the person actually requested."
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
            label="Humanist Interface Rule"
            eyebrow="HUMANIST INTERFACE RULE"
            title="The institution owns the burden of routing."
            description="People should not need to translate themselves into the Lab's internal taxonomies before the Lab is willing to understand them."
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
            label="Capability, Not Dependence"
            eyebrow="CAPABILITY, NOT DEPENDENCE"
            title="Useful work should leave something behind."
            description="The preferred outcome is durable capability rather than manufactured dependence on Boundary First Labs."
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
