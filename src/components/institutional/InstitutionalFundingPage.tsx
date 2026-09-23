import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Funding.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  fundingBoundaries,
  fundingChannels,
  fundingConversionStages,
  fundingEvaluationQuestions,
  fundingOutputs,
} from "./content/funding";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalFundingPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.fundingPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.fundingHero}
        eyebrow={<>FUNDING</>}
        title={<>Fund the conversion, not the theory.</>}
        lead={
          <>
            Boundary First Labs is not asking a funder to underwrite belief in one
            unbounded research program.
          </>
        }
        support={
          <>
            Near-term support converts existing research, software, methods, prototypes,
            and product candidates into public, reviewable work that can meet external
            evidence and leave behind durable value.
          </>
        }
        childLinks={institutionalChildRoutes.funding}
      >
        <blockquote className={styles.fundingThesis}>
          <span>CAPITAL FIREWALL</span>
          Resources can make an inquiry, experiment, review, or build admissible.
          They cannot make its conclusion true.
        </blockquote>
      </InstitutionalRouteHero>

      <section className={styles.fundingConversion}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE FUNDING MODEL</>}
          title={<>Capital should turn latent capacity into inspectable work.</>}
          note={
            <>
              Existing capacity -&gt; bounded conversion -&gt; evidence -&gt; external
              contact -&gt; renewed capacity.
            </>
          }
        />

        <div className={styles.fundingConversionRail}>
          {fundingConversionStages.map((stage, index) => (
            <article className={styles.fundingConversionStage} key={stage.title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.fundingOutputBand}>
          <span>WHAT SUPPORT SHOULD PRODUCE</span>
          <div>
            {fundingOutputs.map((output) => (
              <strong key={output}>{output}</strong>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fundingChannelsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>FUNDING CHANNELS</>}
          title={<>Different work needs different kinds of support.</>}
          note={
            <>
              The Lab uses a portfolio model rather than depending on one funder type,
              one product, or one speculative revenue stream.
            </>
          }
        />

        <div className={styles.fundingChannelGrid}>
          {fundingChannels.map((channel, index) => (
            <article className={styles.fundingChannelCard} key={channel.name}>
              <div className={styles.fundingChannelTopline}>
                <span>{formatOrdinal(index)}</span>
                <small>CHANNEL</small>
              </div>
              <h3>{channel.name}</h3>
              <p className={styles.fundingChannelPurpose}>{channel.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>BEST FIT</span>
                <p>{channel.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>BOUNDARY</span>
                <p>{channel.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fundingEvaluation}>
        <div className={styles.fundingEvaluationIntro}>
          <p className={styles.sectionIndex}>HOW TO EVALUATE A BOUNDED ASK</p>
          <h2>A funder should be able to judge the work without buying the worldview.</h2>
          <p>
            Boundary First Labs spans multiple witness domains. That breadth does not require
            any supporter to endorse every domain, every theory, or the strongest claim in the
            corpus. The useful evaluation unit is the bounded conversion being proposed now.
          </p>
        </div>

        <ol className={styles.fundingQuestionList}>
          {fundingEvaluationQuestions.map((question, index) => (
            <li key={question}>
              <span>{formatOrdinal(index)}</span>
              <strong>{question}</strong>
            </li>
          ))}
        </ol>

        <div className={styles.fundingBoundaryGrid}>
          {fundingBoundaries.map((boundary) => (
            <article key={boundary.label}>
              <span>{boundary.label}</span>
              <p>{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fundingClose}>
        <p className={styles.sectionIndex}>CURRENT FUNDING POSTURE</p>
        <h2>Fund the institution&apos;s ability to turn difficult work into inspectable evidence and durable capability.</h2>
        <p>
          The objective is not indefinite sponsorship. It is a bounded conversion process:
          private corpus into public laboratory; public laboratory into useful artifacts;
          useful artifacts into external review, products, services, partnerships, and
          sustainable research operations.
        </p>

        <nav className={styles.fundingEvidenceLinks} aria-label="Funding evidence routes">
          <Link href="/contact?type=funding&source=funding">Start a funding conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/research">Inspect the research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">Inspect applied work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/products">Inspect products <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/publications">Inspect publications <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
