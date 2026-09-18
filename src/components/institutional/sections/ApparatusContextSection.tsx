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
    <div className={styles.apparatusContextSummary}>
      <span>{index}</span>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ApparatusContextCard({
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
      className={[styles.apparatusContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <ApparatusContextSummary
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

export function ApparatusContextSection() {
  return (
    <section className={styles.apparatusContext}>
      <div className={styles.apparatusContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>APPARATUS CONTEXT</>}
          title={<>The operating discipline around the instrument bench.</>}
          note={<>Select any plate to inspect the surrounding authority, publication, transfer, and stewardship machinery.</>}
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
            index="01"
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
            index="02"
            eyebrow="FEDERATED ARCHITECTURE"
            title="No universal research database."
            description="Different instruments own different state and preserve separate authority boundaries."
            className={styles.apparatusContextFederation}
            tone="federation"
          >
            <div className={styles.apparatusContextDetail}>
              <p>
                Different instruments own different kinds of state. Discovery,
                registration, validation, publication, execution, and promotion are
                intentionally separate authority boundaries.
              </p>
              <div className={styles.authorityFirewall}>
                <code>visibility ≠ authority</code>
                <code>validation ≠ truth</code>
                <code>registration ≠ promotion</code>
                <code>publication ≠ closure</code>
                <code>capability ≠ permission</code>
                <code>transfer ≠ abandonment</code>
              </div>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="research-path"
            label="How It Works Together"
            index="03"
            eyebrow="HOW IT WORKS TOGETHER"
            title="A simplified research path."
            description="No box silently inherits the authority of the next one."
            className={styles.apparatusContextPath}
            tone="path"
          >
            <>
              <div className={styles.apparatusPath}>
                {apparatusPath.map(([index, title, description]) => (
                  <div className={styles.apparatusPathStep} key={title}>
                    <span>{index}</span>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>

              <div className={styles.apparatusSurround}>
                <div>
                  <span>AROUND THE PATH</span>
                  <strong>Registry Registrar</strong>
                  <p>Which institutional state surfaces exist?</p>
                </div>
                <div>
                  <span>AROUND THE PATH</span>
                  <strong>Lab Machinery Registry</strong>
                  <p>Which operational capabilities exist?</p>
                </div>
                <div>
                  <span>ACROSS THE PATH</span>
                  <strong>Steward / authority / correction path</strong>
                  <p>Who may act, repair, stop, and remain responsible through transfer?</p>
                </div>
              </div>
            </>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="human-gates"
            label="Human Gates"
            index="04"
            eyebrow="HUMAN GATES"
            title="Human gates are not anti-automation."
            description="Automation can extend capability aggressively without silently absorbing responsibility."
            className={styles.apparatusContextHuman}
            tone="human"
          >
            <div className={styles.apparatusHumanDetail}>
              <p>
                Search, indexing, comparison, extraction, transformation, checking,
                routing, synthesis, and bounded execution can be automated aggressively.
                The gate appears where an operation changes authority, public claim state,
                irreversible consequence, or stewardship.
              </p>
              <blockquote>
                Automation may extend capability without silently absorbing responsibility.
              </blockquote>
            </div>
          </ApparatusContextCard>

          <ApparatusContextCard
            id="publication-model"
            label="Publication Model"
            index="05"
            eyebrow="PUBLICATION MODEL"
            title="A paper is one view of the machine."
            description="Readable publication can remain the front door while apparatus preserves inspectable research state."
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
            index="06"
            eyebrow="PUBLIC EXPOSURE"
            title="Inspectability needs boundaries too."
            description="Transparency is not indiscriminate disclosure; stewardship needs both legibility and boundary discipline."
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
            index="07"
            eyebrow="DESIGN POSTURE"
            title="Every instrument should answer six questions quickly."
            description="An instrument should expose what it observes, prevents, may do, may not do, and how responsibility survives handoff."
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
            index="08"
            eyebrow="TRUST + STEWARDSHIP"
            title="No instrument promotes itself. Launch is not closure."
            description="Validation, visibility, publication, and completeness never erase authority ceilings or maintenance obligations."
            className={styles.apparatusContextTrust}
            tone="trust"
          >
            <div className={styles.instrumentTrustGrid}>
              <div>
                <p className={styles.sectionIndex}>TRUST PRINCIPLE</p>
                <h3>No instrument is allowed to promote itself.</h3>
                <p>
                  A validator cannot declare a theory true because its schema passed. A registry
                  cannot promote an object because it indexed it. A generated page cannot become
                  source authority because it is public. A complete packet cannot establish the
                  truth of its contents merely because it is complete.
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
            index="09"
            eyebrow="CLOSING TEST"
            title="Research becomes durable when its state can survive transfer."
            description="The apparatus preserves questions, sources, defects, criticism, repair, authority, and forward state—not only conclusions."
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
