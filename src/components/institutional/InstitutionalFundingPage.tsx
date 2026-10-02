import Link from "next/link";
import { publicContactMailto } from "@/lib/site-contact";
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
  fundingCapitalRoles,
  fundingChannels,
  fundingClosureHorizons,
  fundingEvaluationQuestions,
  fundingNearTermUses,
  fundingLanes,
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
        title={<>Support specific work with a clear next result.</>}
        lead={
          <>
            Boundary First Labs already has research, software, products, service capability,
            and public-interest work in progress. Funding is most useful when it helps move a
            specific piece of that work into external use, review, publication, or delivery.
          </>
        }
        support={
          <>
            Different kinds of support fit different jobs: operating runway, paid services,
            product development, sponsored research, grants, public campaigns, or later
            investment in a clearly defined commercial product.
          </>
        }
        childLinks={institutionalChildRoutes.funding}
      >
        <blockquote className={styles.fundingThesis}>
          <span>FUNDING DOES NOT DETERMINE TRUTH</span>
          Money can make research, review, product work, or delivery possible.
          It cannot make a scientific or technical conclusion correct.
        </blockquote>
      </InstitutionalRouteHero>

      <section className={styles.fundingConversion}>
        <div className={styles.fundingUseIntro}>
          <span>WHAT ALREADY EXISTS</span>
          <div>
            <h3>There is already work to move forward.</h3>
            <p>
              The Lab is not raising money around an empty concept. Current work includes
              research programs, software, products, publications, service capability, and
              operating tools. Funding should help one of those existing lines reach a clearer
              external result.
            </p>
          </div>
        </div>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CURRENT FUNDING LANES</>}
          title={<>Four current ways support can move work forward.</>}
          note={
            <>
              These are current examples, not a permanent limit on the portfolio. Each one has
              a concrete next test that outside support can help make possible.
            </>
          }
        />

        <div className={styles.fundingLaneGrid}>
          {fundingLanes.map((lane) => (
            <Link className={styles.fundingLaneCard} href={lane.href} key={lane.title}>
              <div className={styles.fundingLaneTopline}>
                <small>{lane.eyebrow}</small>
              </div>
              <h3>{lane.title}</h3>
              <div className={styles.fundingLaneLead}>
                <span>CURRENT EXAMPLE</span>
                <strong>{lane.example}</strong>
              </div>
              <p>{lane.description}</p>
              <div className={styles.fundingLaneEvidence}>
                <span>WHAT WE NEED TO LEARN NEXT</span>
                <p>{lane.nextEvidence}</p>
              </div>
              <em>Inspect this lane <span aria-hidden="true">-&gt;</span></em>
            </Link>
          ))}
        </div>

        <div className={styles.fundingUseIntro}>
          <span>WHAT FUNDING UNLOCKS NOW</span>
          <div>
            <h3>Move the lead objects into external contact.</h3>
            <p>
              The useful question is concrete: what will the support pay for, and what customer,
              user, partner, publication, review, or research result should exist afterward?
            </p>
          </div>
        </div>

        <div className={styles.fundingUseGrid}>
          {fundingNearTermUses.map((item) => (
            <article className={styles.fundingUseCard} key={item.lane}>
              <span>{item.eyebrow}</span>
              <h3>{item.lane}</h3>
              <strong>{item.use}</strong>
              <p>{item.description}</p>
              <div>
                <span>WHAT SUCCESS COULD LOOK LIKE</span>
                <p>{item.closure}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.fundingOutputBand}>
          <span>WHAT SHOULD EXIST AFTERWARD</span>
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
          eyebrow={<>TYPES OF SUPPORT</>}
          title={<>Different kinds of funding fit different kinds of work.</>}
          note={
            <>
              The Lab does not expect one funder or financing method to support everything.
              Support should be matched to the specific work it is actually meant to advance.
            </>
          }
        />

        <div className={styles.fundingChannelGrid}>
          {fundingCapitalRoles.map((role, index) => (
            <article className={styles.fundingChannelCard} key={role.name}>
              <div className={styles.fundingChannelTopline}>
                <span>{formatOrdinal(index)}</span>
                <small>ROLE</small>
              </div>
              <h3>{role.name}</h3>
              <p className={styles.fundingChannelPurpose}>{role.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>BEST USED FOR</span>
                <p>{role.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>WHAT IT DOES NOT PROVE</span>
                <p>{role.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fundingChannelsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WAYS SUPPORT CAN BE STRUCTURED</>}
          title={<>Choose the funding arrangement that matches the work.</>}
          note={
            <>
              Sponsorship, prepayment, grants, public support, product capital, and later
              credit can all be legitimate — but they create different obligations and prove
              different things.
            </>
          }
        />

        <div className={styles.fundingChannelGrid}>
          {fundingChannels.map((channel, index) => (
            <article className={styles.fundingChannelCard} key={channel.name}>
              <div className={styles.fundingChannelTopline}>
                <span>{formatOrdinal(index)}</span>
                <small>STRUCTURE</small>
              </div>
              <h3>{channel.name}</h3>
              <p className={styles.fundingChannelPurpose}>{channel.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>BEST FIT</span>
                <p>{channel.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>LIMITS</span>
                <p>{channel.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className={styles.fundingChannelsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW TO JUDGE A FUNDED PERIOD</>}
          title={<>Judge support by what becomes real outside the Lab.</>}
          note={
            <>
              The Lab does not promise an arbitrary productivity multiple. A bounded funded
              period should declare closure targets in advance, record success and failure, and
              update the capital thesis when reality disagrees.
            </>
          }
        />

        <div className={styles.fundingChannelGrid}>
          {fundingClosureHorizons.map((horizon, index) => (
            <article className={styles.fundingChannelCard} key={horizon.name}>
              <div className={styles.fundingChannelTopline}>
                <span>{formatOrdinal(index)}</span>
                <small>TIME HORIZON</small>
              </div>
              <h3>{horizon.name}</h3>
              <p className={styles.fundingChannelPurpose}>{horizon.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>WHAT PROGRESS COULD LOOK LIKE</span>
                <p>{horizon.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>WHAT SHOULD NOT BE OVERCLAIMED</span>
                <p>{horizon.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fundingEvaluation}>
        <div className={styles.fundingEvaluationIntro}>
          <p className={styles.sectionIndex}>HOW TO EVALUATE A FUNDING REQUEST</p>
          <h2>You should be able to judge the work without endorsing the whole Lab.</h2>
          <p>
            Boundary First Labs works across several domains. Supporting one project, paper,
            product, or public-interest effort does not require endorsing every other part of
            the Lab. Evaluate the specific work being proposed now.
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
        <p className={styles.sectionIndex}>CURRENT FUNDING GOAL</p>
        <h2>Use support to create more independent evidence, revenue, and capability.</h2>
        <p>
          The objective is not indefinite sponsorship. It is to convert already-existing
          productive inventory into contracts, products, funded research, publications,
          external review, reusable machinery, and transferable operations — while learning
          which lanes deserve more capital and which should narrow or stop.
        </p>

        <nav className={styles.fundingEvidenceLinks} aria-label="Funding evidence routes">
          <a href={publicContactMailto("Boundary First Labs — Funding")}>Start a funding conversation <span aria-hidden="true">-&gt;</span></a>
          <Link href="/research">Inspect the research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/applied-work">Inspect applied work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/products">Inspect products <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/publications">Inspect publications <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
