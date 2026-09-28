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
        eyebrow={<>FUNDING / CAPITALIZATION</>}
        title={<>Capitalize the conversion engine, not the theory.</>}
        lead={
          <>
            Boundary First Labs already has research, software, methods, product candidates,
            service capability, and institutional machinery. The near-term capital question is
            what resource removes which constraint — and what closes afterward.
          </>
        }
        support={
          <>
            Runway protects conversion capacity. Services earn revenue. Product/company
            capital builds reusable commercial leverage. Research capital funds public-good
            inquiry and review. Working capital should follow contracts, awards, receivables,
            cash flow, or other underwritable evidence.
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
          eyebrow={<>CURRENT FUNDING LANES</>}
          title={<>BFL is building multiple paths to revenue and funded research.</>}
          note={
            <>
              These are the current lead objects at the top of four funding lanes, not a permanent
              ceiling on the portfolio. More services, products, software, and fundable research
              can emerge from the corpus as they become ready for external tests.
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
                <span>CURRENT LEAD OBJECT</span>
                <strong>{lane.example}</strong>
              </div>
              <p>{lane.description}</p>
              <div className={styles.fundingLaneEvidence}>
                <span>NEXT EVIDENCE</span>
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
              Different lanes need different things. The useful question is concrete: what does
              the money pay for next, and what market, partner, customer, or research event should
              exist because of it?
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
                <span>SHOULD CLOSE AS</span>
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
          eyebrow={<>THE CAPITAL STACK</>}
          title={<>Different capital has different jobs.</>}
          note={
            <>
              BFL does not ask one funder, one product, or one financing instrument to carry
              the entire institution. Each capital source should be matched to the boundary it
              can actually move.
            </>
          }
        />

        <div className={styles.fundingChannelGrid}>
          {fundingCapitalRoles.map((role, index) => (
            <article className={styles.fundingChannelCard} key={role.name}>
              <div className={styles.fundingChannelTopline}>
                <span>{formatOrdinal(index)}</span>
                <small>CAPITAL JOB</small>
              </div>
              <h3>{role.name}</h3>
              <p className={styles.fundingChannelPurpose}>{role.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>WHAT IT SHOULD FINANCE</span>
                <p>{role.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>EVIDENCE BOUNDARY</span>
                <p>{role.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fundingChannelsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CAPITAL STRUCTURES</>}
          title={<>Match the structure to the economic job.</>}
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
                <span>BOUNDARY</span>
                <p>{channel.boundary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className={styles.fundingChannelsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE FUNDED-PERIOD TEST</>}
          title={<>Judge the capital by what crosses into external evidence.</>}
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
                <small>MEASUREMENT HORIZON</small>
              </div>
              <h3>{horizon.name}</h3>
              <p className={styles.fundingChannelPurpose}>{horizon.purpose}</p>
              <div className={styles.fundingChannelField}>
                <span>CANDIDATE CLOSURES</span>
                <p>{horizon.bestFor}</p>
              </div>
              <div className={styles.fundingChannelBoundary}>
                <span>CLAIM CEILING</span>
                <p>{horizon.boundary}</p>
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
        <h2>Use capital to make the institution less capital-fragile.</h2>
        <p>
          The objective is not indefinite sponsorship. It is to convert already-existing
          productive inventory into contracts, products, funded research, publications,
          external review, reusable machinery, and transferable operations — while learning
          which lanes deserve more capital and which should narrow or stop.
        </p>

        <nav className={styles.fundingEvidenceLinks} aria-label="Funding evidence routes">
          <Link href="/contact?type=funding&source=funding">Start a funding conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/research">Inspect the research <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/applied-work">Inspect applied work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/products">Inspect products <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/publications">Inspect publications <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
