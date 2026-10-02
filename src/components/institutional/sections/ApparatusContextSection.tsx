import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Apparatus.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  apparatusPath,
  designQuestions,
  publicExposure,
} from "../content/apparatus";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const apparatusQuestions = [
  "What are we actually investigating?",
  "What have we tried?",
  "What is being claimed?",
  "What supports that claim?",
  "Which source owns the current meaning?",
  "What failed?",
  "What changed afterward?",
  "What is safe to publish?",
  "Who can make the next authority-bearing decision?",
  "Who owns correction and maintenance?",
] as const;

const publicationState = [
  "Claim",
  "Source",
  "Dependency",
  "Experiment",
  "Evidence",
  "Criticism",
  "Defect",
  "Repair",
  "Status",
  "Revision",
  "Publication",
  "Successor use",
] as const;

const apparatusContextOrder = [
  "why-apparatus",
  "federated-architecture",
  "research-path",
  "human-gates",
  "publication-model",
  "public-exposure",
  "design-posture",
  "trust-stewardship",
  "closing-test",
] as const;

function ApparatusContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.apparatusContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ApparatusContextCard({
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
      className={[styles.apparatusContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ApparatusContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function ApparatusContextSection() {
  return (
    <section className={styles.apparatusContext}>
      <div className={styles.apparatusContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>APPARATUS CONTEXT</>}
          title={<>How the Lab keeps tools useful without letting tools become the authority.</>}
          note={<>These sections explain ownership, review, publication, automation, transfer, and correction in plain language.</>}
        />

        <ReflowField
          className={styles.apparatusContextGrid}
          ariaLabel="Apparatus operating context"
          layoutMode="focus-stage"
          itemOrder={apparatusContextOrder}
        >
          <ApparatusContextCard
            id="why-apparatus"
            label="Why Apparatus Matters"
            eyebrow="WHY APPARATUS MATTERS"
            title="Good ideas can fail because their machinery is opaque."
            description="Apparatus makes research state inspectable instead of leaving it in memory, prose, or disconnected folders."
            className={styles.apparatusContextWhy}
            tone="why"
          >
            <div className={styles.apparatusContextDetail}>
              <p>
                Apparatus makes claims, evidence, experiments, sources, failures,
                authority, and handoff state easier to inspect instead of leaving them in
                memory, prose, or disconnected folders.
              </p>
              <div className={styles.apparatusQuestions}>
                {apparatusQuestions.map((question, index) => (
                  <div className={styles.apparatusQuestionPlate} key={question}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{question}</strong>
                  </div>
                ))}
              </div>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="federated-architecture"
            label="Federated Architecture"
            eyebrow="FEDERATED ARCHITECTURE"
            title="There is no single master database for all research."
            description="Different kinds of work keep their own source records, and shared tools connect them without taking ownership."
            className={styles.apparatusContextFederation}
            tone="federation"
          >
            <div className={styles.apparatusContextDetail}>
              <p>
                Different tools are responsible for different jobs. Finding a record,
                registering it, checking it, publishing it, running code, and accepting a
                result are intentionally separate actions with separate responsibility.
              </p>
              <div className={styles.authorityFirewall}>
                <code>visible ≠ authoritative</code>
                <code>validated ≠ true</code>
                <code>registered ≠ accepted</code>
                <code>published ≠ finished</code>
                <code>capable ≠ permitted</code>
                <code>transferred ≠ abandoned</code>
              </div>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="research-path"
            label="How It Works Together"
            eyebrow="HOW IT WORKS TOGETHER"
            title="A simplified research path."
            description="Each step does its own job; no tool or record silently gains the decision rights of the next step."
            className={styles.apparatusContextPath}
            tone="path"
          >
            <>
              <div className={styles.apparatusPath}>
                {apparatusPath.map(([index, title, description]) => (
                  <div className={styles.apparatusPathStep} key={title}>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>

              <div className={styles.apparatusSurround}>
                <div>
                  <span>AROUND THE PATH</span>
                  <strong>Lab record directory</strong>
                  <p>Which durable record systems exist, and where is their source of truth?</p>
                </div>
                <div>
                  <span>AROUND THE PATH</span>
                  <strong>Tool directory</strong>
                  <p>Which operational tools exist, and what are they designed to do?</p>
                </div>
                <div>
                  <span>ACROSS THE PATH</span>
                  <strong>Owner / decision / correction path</strong>
                  <p>Who may act, who may stop the process, who corrects errors, and who remains responsible after handoff?</p>
                </div>
              </div>
            </>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="human-gates"
            label="Human Gates"
            eyebrow="HUMAN GATES"
            title="Human review does not mean avoiding automation."
            description="Automation can do substantial work while consequential decisions remain with the people responsible for them."
            className={styles.apparatusContextHuman}
            tone="human"
          >
            <div className={styles.apparatusHumanDetail}>
              <p>
                Search, indexing, comparison, extraction, transformation, checking,
                routing, synthesis, and clearly scoped execution can be automated heavily.
                Human review becomes essential when an action changes an official claim,
                affects another person or system, creates an irreversible consequence, or
                changes who is responsible.
              </p>
              <blockquote>
                Automation may extend capability without silently absorbing responsibility.
              </blockquote>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="publication-model"
            label="Publication Model"
            eyebrow="PUBLICATION MODEL"
            title="A paper is the readable result, not the entire research record."
            description="The article can remain the front door while supporting records preserve how the result was produced, challenged, and revised."
            className={styles.apparatusContextPublication}
            tone="publication"
          >
            <div className={styles.apparatusContextDetail}>
              <p>
                The readable article can remain the public front door while surrounding
                apparatus preserves the state needed to inspect, challenge, revise, and
                continue the work.
              </p>
              <div className={styles.paperProjectionRail}>
                {publicationState.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="public-exposure"
            label="Public Exposure"
            eyebrow="PUBLIC EXPOSURE"
            title="Transparency still needs boundaries."
            description="Being inspectable does not mean publishing private, sensitive, security-relevant, or poorly contextualized material."
            className={styles.apparatusContextExposure}
            tone="exposure"
          >
            <div className={styles.exposureGrid}>
              {publicExposure.map((group) => (
                <article
                  className={styles.exposureCard}
                  data-exposure-tone={group.tone}
                  key={group.title}
                >
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="design-posture"
            label="Design Posture"
            eyebrow="DESIGN POSTURE"
            title="Every tool should answer six questions quickly."
            description="A reader should be able to tell what a tool tracks, why it exists, what decisions it may make, what decisions remain human, and who owns it after handoff."
            className={styles.apparatusContextDesign}
            tone="design"
          >
            <div className={styles.designQuestionGrid}>
              {designQuestions.map((question, index) => (
                <div className={styles.designQuestionPlate} key={question}>
                  <span>{formatOrdinal(index)}</span>
                  <strong>{question}</strong>
                </div>
              ))}
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="trust-stewardship"
            label="Trust and Stewardship"
            eyebrow="TRUST + STEWARDSHIP"
            title="No tool gets to declare its own success."
            description="Passing a check, becoming visible, being published, or looking complete never removes the need for responsible review, maintenance, and correction."
            className={styles.apparatusContextTrust}
            tone="trust"
          >
            <div className={styles.instrumentTrustGrid}>
              <div>
                <p className={styles.sectionIndex}>TRUST PRINCIPLE</p>
                <h3>No tool is allowed to approve its own conclusions.</h3>
                <p>
                  A validator cannot declare a theory true because a schema passed. A directory
                  cannot accept a claim simply because it indexed it. A generated page does not
                  become the source of truth merely because it is public. A complete packet does
                  not make the claims inside it correct.
                </p>
              </div>

              <div>
                <p className={styles.sectionIndex}>STEWARDSHIP PRINCIPLE</p>
                <h3>Launch is not closure.</h3>
                <p>
                  Every durable artifact needs an owner, a correction path, and a transfer,
                  succession, migration, retirement, or maintenance story.
                </p>
              </div>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="closing-test"
            label="Closing Test"
            eyebrow="CLOSING TEST"
            title="Research becomes durable when another person can pick it up."
            description="The Lab tries to preserve questions, sources, failed attempts, criticism, revisions, responsibility, and next steps—not only conclusions."
            className={styles.apparatusContextClosing}
            tone="closing"
          >
            <div className={styles.apparatusContextDetail}>
              <p>
                The apparatus preserves more than conclusions. It preserves questions,
                sources, experiments, defects, criticism, repair, authority, and forward
                state—leaving the next person with more capability and less hidden dependence.
              </p>
            </div>
          </ApparatusContextCard>
        </ReflowField>
      </div>
    </section>
  );
}
