import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Collaboration.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  collaborationBoundaries,
  collaborationExchange,
  collaborationLanes,
  collaborationModes,
  collaborationOutcomes,
  collaborationProcess,
  collaborationRoles,
  collaborationStageLabels,
  collaborationStageLegend,
} from "./content/collaboration";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalCollaborationPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.collaborationPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.collaborationHero}
        eyebrow={<>COLLABORATION</>}
        title={<>Work together where each side brings something the other needs.</>}
        lead={
          <>
            Boundary First Labs develops research, software, methods, and prototypes. It
            looks for people and organizations who can test them, challenge them, put them
            to work, reach users, or help them scale.
          </>
        }
        support={
          <>
            A collaboration can be as small as one expert review or as substantial as a
            funded pilot, co-developed product, publication, licensing arrangement, or
            transfer to a better long-term home. We start with the smallest useful
            relationship and expand only when the work earns it.
          </>
        }
        childLinks={institutionalChildRoutes.collaboration}
      >
        <div className={styles.collaborationExchange}>
          {collaborationExchange.map((side) => (
            <article key={side.label}>
              <span>{side.label}</span>
              <strong>{side.title}</strong>
              <ul>
                {side.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </InstitutionalRouteHero>

      <section className={styles.collaborationModesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT COLLABORATION CAN LOOK LIKE</>}
          title={<>You do not need to become a strategic partner to do useful work together.</>}
          note={
            <>
              One review, one pilot, one workshop, one funded milestone, or one introduction
              can be a complete and valuable relationship.
            </>
          }
        />

        <div className={styles.collaborationModeBand}>
          {collaborationModes.map(([mode, purpose], index) => (
            <div key={mode}>
              <span>{formatOrdinal(index)}</span>
              <strong>{mode}</strong>
              <p>{purpose}</p>
            </div>
          ))}
        </div>

        <div className={styles.collaborationRoleStrip}>
          <span>WAYS TO CONTRIBUTE</span>
          <div>
            {collaborationRoles.map((role) => <strong key={role}>{role}</strong>)}
          </div>
        </div>

        <div className={styles.collaborationRoleStrip}>
          <span>POSSIBLE RESULTS</span>
          <div>
            {collaborationOutcomes.map((outcome) => <strong key={outcome}>{outcome}</strong>)}
          </div>
        </div>
      </section>

      <section className={styles.collaborationMapSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHO WE ARE DESIGNED TO WORK WITH</>}
          title={<>Different collaborators bring different kinds of reality to the work.</>}
          note={
            <>
              Some can test research. Some have users, customers, data, or infrastructure.
              Some can distribute products, fund public-interest work, or simply tell us
              where an idea is wrong.
            </>
          }
        />

        <aside className={styles.collaborationMapDisclaimer}>
          <span>POSSIBLE FITS, NOT AFFILIATIONS</span>
          <p>
            These names come from BFL&apos;s collaboration and outreach planning. Inclusion
            does not mean we have contacted them, they have expressed interest, or they
            endorse the Lab. The status badge describes what BFL still needs before a serious
            approach; every route should be checked again before use.
          </p>
        </aside>

        <div className={styles.collaborationMapFrame}>
          {collaborationLanes.map((lane) => (
            <section
              className={styles.collaborationLane}
              data-collaboration-tone={lane.tone}
              key={lane.code}
            >
              <header>
                <span>{lane.code}</span>
                <div>
                  <h3>{lane.title}</h3>
                  <p>{lane.description}</p>
                </div>
              </header>

              <div className={styles.collaborationEntityGrid}>
                {lane.entries.map((entry) => (
                  <article key={entry.name}>
                    <div>
                      <strong>{entry.name}</strong>
                      <p>{entry.role}</p>
                    </div>
                    <span data-stage={entry.stage}>{collaborationStageLabels[entry.stage]}</span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.collaborationLegend}>
          {collaborationStageLegend.map(([stage, description]) => (
            <div key={stage}>
              <strong>{collaborationStageLabels[stage]}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.collaborationProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>HOW A COLLABORATION STARTS</>}
          title={<>Start small. Define success. Expand only if the work earns it.</>}
          note={<>The same basic process works for a business, researcher, funder, community, creator, or institution.</>}
        />

        <div className={styles.collaborationProcessRail}>
          {collaborationProcess.map(([title, description], index) => (
            <article key={title}>
              <span>{formatOrdinal(index)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.collaborationBoundaries}>
        <div className={styles.collaborationBoundaryLead}>
          <p className={styles.sectionIndex}>CLEAR TERMS, CLEAN BOUNDARIES</p>
          <h2>A collaboration should make responsibility clearer, not blur it.</h2>
          <p>
            Good collaborations say who is doing what, who owns what, what evidence is
            being produced, what may be published, and what happens if the work succeeds,
            changes direction, or stops.
          </p>
        </div>

        <div className={styles.collaborationBoundaryGrid}>
          {collaborationBoundaries.map((boundary) => (
            <article key={boundary.label}>
              <span>{boundary.label}</span>
              <p>{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.collaborationClose}>
        <p className={styles.sectionIndex}>A GOOD FIRST CONVERSATION</p>
        <h2>Bring a real problem, capability, audience, or resource. We will look for the smallest useful thing we can do together.</h2>
        <p>
          That might be a review, pilot, workshop, co-developed artifact, funding
          conversation, distribution test, or introduction. If there is no clear exchange
          of value, there may simply be nothing to do yet—and that is a useful answer too.
        </p>
        <nav className={styles.collaborationCloseLinks} aria-label="Collaboration next steps">
          <Link href="/v3/contact?type=collaboration&source=collaboration">Start a collaboration conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/open-lab">Explore Open Lab <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/funding">How funding works <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/v3/projects">See current projects <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
