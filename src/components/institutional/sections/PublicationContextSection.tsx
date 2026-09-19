import type { ReactNode } from "react";
import { ReflowField, ReflowFieldItem } from "@/components/bfux/ReflowField";
import { InstitutionalSectionHeader } from "../InstitutionalPrimitives";
import { formatOrdinal } from "../institutionalFormat";
import foundationStyles from "../styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "../styles/InstitutionalRouteShared.module.css";
import routeStyles from "../styles/Publications.module.css";
import { composeCssModules } from "../styles/composeCssModules";
import {
  critiqueInputs,
  flagshipPattern,
  publicationFields,
  publicationStates,
  publicationTypes,
  readerDistinctions,
  stewardshipQuestions,
} from "../content/publications";

const styles = composeCssModules(
  foundationStyles,
  routeSharedStyles,
  routeStyles,
);

const publicationContextOrder = [
  "projection-authority",
  "publication-anatomy",
  "source-owned-status",
  "reader-agency",
  "publication-types",
  "critique-route",
  "public-index",
  "stewardship",
  "flagship-pattern",
  "design-posture",
  "publication-covenant",
] as const;

function PublicationContextSummary({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.publicationContextSummary}>
      <p className={styles.sectionIndex}>{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function PublicationContextCard({
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
      className={[styles.publicationContextCard, className].join(" ")}
      dataTone={tone}
      summary={
        <PublicationContextSummary
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      }
      detail={children}
    />
  );
}

export function PublicationContextSection() {
  return (
    <section className={styles.publicationContext}>
      <div className={styles.publicationContextFrame}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>PUBLICATION CONTEXT</>}
          title={<>The machinery around public research artifacts.</>}
          note={<>The selected records above are source-bound public projections. This field explains the publication discipline that keeps visibility, maturity, evidence, and authority from collapsing into one another.</>}
        />

        <ReflowField
          className={styles.publicationContextGrid}
          ariaLabel="Publication discipline and research-object context"
          layoutMode="focus-stage"
          itemOrder={publicationContextOrder}
        >
          <PublicationContextCard
            id="projection-authority"
            label="Projection and Authority"
            eyebrow="PROJECTION ≠ AUTHORITY"
            title="Publications are views of research state."
            description="Visibility, polish, execution, and release never silently promote scientific authority."
            className={styles.publicationContextProjection}
            tone="authority"
          >
            <div className={styles.publicationContextDetail}>
              <p>
                Editing a public page does not change scientific state. A polished PDF does
                not promote a claim. A merged pull request does not prove a theorem.
                Executable evidence does not automatically establish general validity.
              </p>
              <div className={styles.publicationBoundaryGrid}>
                <code>public visibility ≠ publication authority</code>
                <code>polish ≠ maturity</code>
                <code>executable evidence ≠ general validity</code>
                <code>publication ≠ closure</code>
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="publication-anatomy"
            label="Publication Anatomy"
            eyebrow="PUBLICATION ANATOMY"
            title="What a publication page should expose."
            description="Enough surrounding state for a reader to judge the work independently."
            className={styles.publicationContextAnatomy}
            tone="anatomy"
          >
            <div className={styles.publicationFieldGrid}>
              {publicationFields.map(([index, title, description]) => (
                <article className={styles.publicationFieldCard} key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="source-owned-status"
            label="Source-Owned Status"
            eyebrow="SOURCE-OWNED STATUS"
            title="Publication state should be visible."
            description="The website may render status, but it does not invent or promote it."
            className={styles.publicationContextStatus}
            tone="status"
          >
            <div className={styles.publicationContextDetail}>
              <p>
                Where canonical research or publication control has a more precise state,
                that source wins.
              </p>
              <div className={styles.publicationStateRail}>
                {publicationStates.map((state, index) => (
                  <div className={styles.publicationStatePlate} key={state}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{state}</strong>
                  </div>
                ))}
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="reader-agency"
            label="Reader Agency"
            eyebrow="READER AGENCY"
            title="Do not make the reader inherit confidence from typography."
            description="Expose the distinctions that let a reader tell observation, inference, conjecture, result, and deployment apart."
            className={styles.publicationContextReader}
            tone="reader"
          >
            <div className={styles.publicationContextDetail}>
              <p>
                Publication design should expose the distinctions that matter for the
                particular work so the reader can tell what is observed, inferred,
                conjectured, established, or merely deployed.
              </p>
              <div className={styles.readerDistinctionRail}>
                {readerDistinctions.map((item, index) => (
                  <span key={item}>
                    <small>{formatOrdinal(index)}</small>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="publication-types"
            label="Publication Types"
            eyebrow="PUBLICATION TYPES"
            title="Different artifacts carry different burdens."
            description="Working papers, reports, notes, specifications, implementations, analyses, and packets are not interchangeable."
            className={styles.publicationContextTypes}
            tone="types"
          >
            <div className={styles.publicationTypeGrid}>
              {publicationTypes.map((type) => (
                <article className={styles.publicationTypeCard} key={type.title}>
                  <span>{type.code}</span>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </article>
              ))}
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="critique-route"
            label="Critique This Work"
            eyebrow="CRITIQUE THIS WORK"
            title="A criticism-friendly publication is one whose state can change."
            description="Corrections and objections should enter research machinery instead of disappearing into a generic inbox."
            className={styles.publicationContextCritique}
            tone="critique"
          >
            <div className={styles.publicationCritiqueDetail}>
              <p>
                Significant publications should expose a correction route that can enter
                the Lab&apos;s research and publication machinery rather than disappear into
                a generic inbox.
              </p>
              <div className={styles.critiqueInputGrid}>
                {critiqueInputs.map((item, index) => (
                  <div className={styles.critiqueInputPlate} key={item}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="public-index"
            label="Public Index"
            eyebrow="PUBLIC INDEX"
            title="Simple outside. Richer underneath."
            description="The public index should aid discovery without becoming the Lab's internal operations dashboard."
            className={styles.publicationContextIndex}
            tone="index"
          >
            <div className={styles.publicIndexModel}>
              <div className={styles.publicIndexFilters}>
                <span>DISCIPLINE / DOMAIN</span>
                <span>TYPE</span>
                <span>STATUS</span>
                <span>RESEARCH LANE</span>
                <span>RECENT REVISIONS</span>
                <span>EXECUTABLE / DATA AVAILABLE</span>
              </div>
              <div className={styles.internalIndexState}>
                <span>INTERNAL CONTROL MAY ALSO TRACK</span>
                <p>
                  Readiness, blockers, dependencies, claim risk, evidence plans, event
                  history, and control-queue priority.
                </p>
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="stewardship"
            label="Stewardship"
            eyebrow="STEWARDSHIP"
            title="Publication creates long-lived obligations."
            description="Discoverability can outlive assumptions, terminology, evidence, and successor work."
            className={styles.publicationContextStewardship}
            tone="stewardship"
          >
            <div className={styles.publicationContextDetail}>
              <p>
                A document can remain discoverable long after assumptions, terminology,
                evidence, or successor work changes. Sometimes the responsible state is
                revised. Sometimes it is superseded, archived, or retired.
              </p>
              <div className={styles.stewardshipQuestionGrid}>
                {stewardshipQuestions.map((question, index) => (
                  <div className={styles.stewardshipQuestionPlate} key={question}>
                    <span>{formatOrdinal(index)}</span>
                    <strong>{question}</strong>
                  </div>
                ))}
              </div>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="flagship-pattern"
            label="Flagship Research-Object Pattern"
            eyebrow="FLAGSHIP RESEARCH-OBJECT PATTERN"
            title="A reusable public research page."
            description="Representational Mechanics establishes a first pattern; the site should generalize the grammar rather than duplicate a one-off."
            className={styles.publicationContextFlagship}
            tone="flagship"
          >
            <div className={styles.flagshipPatternRail}>
              {flagshipPattern.map((item, index) => (
                <div key={item}>
                  <span>{formatOrdinal(index)}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="design-posture"
            label="Design Posture"
            eyebrow="DESIGN POSTURE"
            title="Publication pages should look calmer than the claims they contain."
            description="Readable typography and restrained metadata should invite inspection rather than manufacture confidence."
            className={styles.publicationContextDesign}
            tone="design"
          >
            <div className={styles.publicationContextDetail}>
              <p>
                Readable typography, generous margins, citation legibility, restrained status
                metadata, clear correction surfaces, accessible equations and figures, and
                stable anchors should make the page feel like an invitation to inspect rather
                than an instrument of promotion.
              </p>
            </div>
          </PublicationContextCard>

          <PublicationContextCard
            id="publication-covenant"
            label="Publication Covenant"
            eyebrow="THE PUBLICATION COVENANT"
            title="A reader should be able to say:"
            description="The publication succeeds when the reader can locate claims, evidence, uncertainty, machinery, critique, and revision."
            className={styles.publicationContextCovenant}
            tone="covenant"
          >
            <div className={styles.publicationCovenantDetail}>
              <blockquote>
                I know what this claims.<br />
                I know what kind of evidence supports it.<br />
                I know where the uncertainty is.<br />
                I know where to inspect the machinery.<br />
                I know how to challenge it.<br />
                I know whether it has changed.
              </blockquote>
            </div>
          </PublicationContextCard>
        </ReflowField>
      </div>
    </section>
  );
}
