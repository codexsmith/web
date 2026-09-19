import type { ReactNode } from "react";
import Link from "next/link";
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
  "operating-braid",
  "stewardship-of-knowledge",
  "equivalence-firewall",
  "research-state",
  "public-research-object",
  "artifact-families",
  "closing-test",
] as const;

function ContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.contextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ContextCard({
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
      className={[styles.researchContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ContextSummary
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
            eyebrow="WORKING PRINCIPLES"
            title="How research is handled."
            description="Six operating rules for building, testing, criticizing, and transferring work."
            className={styles.contextPrinciples}
            tone="principles"
          >
            <div className={styles.principleGrid}>
              {principles.map(([index, title, description]) => (
                <article className={styles.principlePlate} key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </ContextCard>

          <ContextCard
            id="operating-braid"
            label="Operating Braid"
            eyebrow="THREE RECURSIVE DISCIPLINES"
            title="Flow, evidence, and search constrain one another."
            description="Lean–Agile practice, scientific method, and agentic reasoning are distinct lineages that meet in the Lab's operating loop."
            className={styles.contextPrinciples}
            tone="principles"
          >
            <div className={styles.principleGrid}>
              <article className={styles.principlePlate}>
                <h3>Lean–Agile</h3>
                <p>
                  Externalize state, limit work in progress, respect capacity, deliver a
                  coherent increment, inspect the result, and adapt the next move.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>Scientific method</h3>
                <p>
                  Ask a discriminating question, state hypotheses and alternatives, test
                  under explicit conditions, preserve nulls, separate observation from
                  interpretation, and let evidence constrain the claim.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>Agentic reasoning</h3>
                <p>
                  Search alternatives, decompose the problem, select tools, construct and
                  compare representations, localize defects, synthesize evidence, and
                  propose repairs under explicit authority boundaries.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>The braid</h3>
                <p>
                  Flow decides what can be attempted next. Evidence decides what was
                  learned. Agentic search decides what alternatives deserve attention.
                  Boundary First records the representation, consequence, defect, repair,
                  and successor state that connect the loop.
                </p>
              </article>
            </div>
            <blockquote className={styles.contextQuote}>
              “Agent proposes; machine verifies; world adjudicates.”
            </blockquote>
          </ContextCard>

          <ContextCard
            id="stewardship-of-knowledge"
            label="Stewardship"
            eyebrow="INTELLECTUAL / HUMAN / ECOLOGICAL"
            title="Research creates obligations beyond producing a result."
            description="A mature research object should preserve the knowledge, respect the people around it, and keep wider material consequences visible."
            className={styles.contextPrinciples}
            tone="principles"
          >
            <div className={styles.principleGrid}>
              <article className={styles.principlePlate}>
                <h3>Intellectual stewardship</h3>
                <p>
                  Preserve sources, provenance, uncertainty, failed attempts, criticism,
                  supersession, attribution, and handoff so the record remains usable after
                  the originating researcher or tool is gone.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>Humanist stewardship</h3>
                <p>
                  Do not treat research subjects, users, collaborators, or affected
                  communities as mere inputs. Preserve consent, standing, local knowledge,
                  contestability, credit, and routes to correction where consequence reaches them.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>Ecological stewardship</h3>
                <p>
                  Keep material and computational substrate inside the model where it
                  matters: energy, infrastructure, equipment, waste, land, water, supply
                  chains, and burdens shifted onto future people or ecosystems.
                </p>
              </article>
              <article className={styles.principlePlate}>
                <h3>Stewardship test</h3>
                <p>
                  What must still be maintained, explained, repaired, transferred, or
                  retired after the paper, experiment, model run, or product milestone is complete?
                </p>
              </article>
            </div>
            <Link className={styles.researchGovernanceBridge} href="/v3/ai-governance">
              When agentic systems become consequential, inspect the AI Governance boundary
              <span aria-hidden="true">→</span>
            </Link>
          </ContextCard>

          <ContextCard
            id="equivalence-firewall"
            label="Permanent Firewall"
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
