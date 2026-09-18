import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Research.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  artifactFamilies,
  maturityStates,
  principles,
  researchObjectFields,
} from "../content/research";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const researchContextOrder = [
  "reader-agency",
  "working-principles",
  "equivalence-firewall",
  "research-state",
  "public-research-object",
  "artifact-families",
  "closing-test",
] as const;

function ContextSummary({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.contextSummary}>
      <span>{index}</span>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ContextCard({
  id,
  label,
  index,
  eyebrow,
  title,
  description,
  className,
  tone,
  children,
}: {
  id: string;
  label: string;
  index: string;
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
      className={[styles.researchContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ContextSummary
          index={index}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function ResearchContextSection() {
  return (
    <section className={styles.researchContext}>
      <div className={styles.researchContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>RESEARCH CONTEXT</>}
          title={<>The machinery around the research.</>}
          note={<>Select any plate to inspect it without leaving the page context.</>}
        />

        <ReflowField
          className={styles.researchContextGrid}
          ariaLabel="Research context and interpretation"
          layoutMode="focus-stage"
          itemOrder={researchContextOrder}
        >
          <ContextCard
            id="reader-agency"
            label="Reader Agency"
            index="01"
            eyebrow="READER AGENCY"
            title="Research should increase epistemic agency."
            description="What a reader should be able to inspect, challenge, and judge independently."
            className={styles.contextReader}
            tone="agency"
          >
            <div className={styles.contextDetail}>
              <div>
                <p>
                  Inspectability changes the relationship between researcher and reader.
                  A reader should be able to see what is claimed, what supports it, what
                  remains uncertain, what failed, and what would change the conclusion.
                </p>
              </div>
              <blockquote className={styles.contextQuote}>
                “Here is enough structure for you to make a better judgment of your own.”
              </blockquote>
            </div>
          </ContextCard>

          <ContextCard
            id="working-principles"
            label="Working Principles"
            index="02"
            eyebrow="WORKING PRINCIPLES"
            title="How research is handled."
            description="Six operating rules for building, testing, criticizing, and transferring work."
            className={styles.contextPrinciples}
            tone="principles"
          >
            <div className={styles.principleGrid}>
              {principles.map(([index, title, description]) => (
                <article className={styles.principlePlate} key={title}>
                  <span>{index}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </ContextCard>

          <ContextCard
            id="equivalence-firewall"
            label="Permanent Firewall"
            index="03"
            eyebrow="PERMANENT FIREWALL"
            title="Common role is not equivalence."
            description="Cross-domain comparison must not silently become a theorem or shared ontology."
            className={styles.contextFirewall}
            tone="firewall"
          >
            <div className={styles.firewallDetail}>
              <blockquote>
                Similar vocabulary is not mathematical equivalence. A useful analogy is
                not a theorem. A shared representation is not a shared ontology.
              </blockquote>
              <p>
                Software state, physical state, mathematical state, institutional state,
                and epistemic state may occupy comparable analytical roles while remaining
                different objects with different native semantics.
              </p>
            </div>
          </ContextCard>

          <ContextCard
            id="research-state"
            label="Research State"
            index="04"
            eyebrow="RESEARCH STATE"
            title="“Published” is not the only useful status."
            description="Source-governed states make uncertainty and maturity visible without scoring the work."
            className={styles.contextState}
            tone="state"
          >
            <>
              <p className={styles.contextDetailNote}>
                Use the canonical status when a source system has a more precise state.
              </p>
              <div className={styles.stateRail}>
                {maturityStates.map(([state, description], index) => (
                  <div className={styles.statePlate} key={state}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{state}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </>
          </ContextCard>

          <ContextCard
            id="public-research-object"
            label="Public Research Object"
            index="05"
            eyebrow="PUBLIC RESEARCH OBJECT"
            title="What a mature object should expose."
            description="Enough connected state for independent inspection, criticism, and continuation."
            className={styles.contextObject}
            tone="object"
          >
            <>
              <p className={styles.contextDetailNote}>
                A research page should answer more than “what is this about?”
              </p>
              <div className={styles.objectFieldGrid}>
                {researchObjectFields.map((field, index) => (
                  <div className={styles.objectField} key={field}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{field}</strong>
                  </div>
                ))}
              </div>
            </>
          </ContextCard>

          <ContextCard
            id="artifact-families"
            label="Research Artifact Families"
            index="06"
            eyebrow="MORE THAN PAPERS"
            title="Research connects prose to machinery."
            description="Arguments, evidence, provenance, packets, and executable artifacts stay connected."
            className={styles.contextArtifacts}
            tone="artifacts"
          >
            <div className={styles.artifactGrid}>
              {artifactFamilies.map(([title, description]) => (
                <article className={styles.artifactPlate} key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </ContextCard>

          <ContextCard
            id="closing-test"
            label="Closing Test"
            index="07"
            eyebrow="CLOSING TEST"
            title="A theory should survive instrumentation."
            description="Can another person represent, test, criticize, reconstruct, and continue the work?"
            className={styles.contextClosing}
            tone="closing"
          >
            <div className={styles.closingDetail}>
              <p>
                A useful theory should increasingly be representable, testable, refinable,
                and inspectable by people other than its author.
              </p>
              <div className={styles.instrumentQuestions}>
                <span>Can its objects be represented clearly?</span>
                <span>Can its assumptions be made explicit?</span>
                <span>Can its transformations be tested?</span>
                <span>Can its failure modes be localized?</span>
                <span>Can another person reconstruct what was done?</span>
                <span>Can another qualified person criticize or continue the work?</span>
              </div>
            </div>
          </ContextCard>
        </ReflowField>
      </div>
    </section>
  );
}
