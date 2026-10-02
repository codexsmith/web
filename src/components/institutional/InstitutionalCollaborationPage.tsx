import Link from "next/link";
import { publicContactMailto } from "@/lib/site-contact";
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
            Boundary First Labs develops research, software, methods, products, and prototypes.
            Collaboration connects that work with real expertise, users, infrastructure,
            distribution, funding, and constraints that the Lab should not try to reproduce alone.
          </>
        }
        childLinks={institutionalChildRoutes.collaboration}
      />

      <section className={styles.collaborationExchangeSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>WHAT EACH SIDE BRINGS</>}
          title={<>BFL brings developed work. Collaborators bring real-world capability.</>}
          note={
            <>
              Start with the smallest useful relationship. Each side should contribute
              something the other should not have to duplicate.
            </>
          }
        />

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
      </section>

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
          eyebrow={<>WHO COLLABORATION IS FOR</>}
          title={<>Bring expertise, users, infrastructure, distribution, funding, or a hard question.</>}
          note={
            <>
              The public page is organized around collaborator types rather than a list of
              organizations BFL may someday contact.
            </>
          }
        />

        <div className={styles.collaborationMapFrame}>
          <section className={styles.collaborationLane} data-collaboration-tone="local">
            <header><span>01</span><div><h3>Domain experts + practitioners</h3><p>People who know the field well enough to expose errors, constraints, missing context, or better methods.</p></div></header>
          </section>
          <section className={styles.collaborationLane} data-collaboration-tone="application">
            <header><span>02</span><div><h3>Users, customers + communities</h3><p>People who can test whether a product, method, explanation, or system is actually useful in practice.</p></div></header>
          </section>
          <section className={styles.collaborationLane} data-collaboration-tone="research">
            <header><span>03</span><div><h3>Research + technical institutions</h3><p>Organizations that can review methods, reproduce work, provide stronger test environments, or collaborate on a defined research question.</p></div></header>
          </section>
          <section className={styles.collaborationLane} data-collaboration-tone="public">
            <header><span>04</span><div><h3>Funders, sponsors + public-interest partners</h3><p>Organizations that can support a clearly scoped program, experiment, product, or public-interest build.</p></div></header>
          </section>
          <section className={styles.collaborationLane} data-collaboration-tone="mirror">
            <header><span>05</span><div><h3>Reviewers, educators + communicators</h3><p>People who can challenge, explain, visualize, teach, or translate specific work for wider audiences.</p></div></header>
          </section>
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
        <p className={styles.sectionIndex}>A GOOD FIRST STEP</p>
        <h2>Bring a real problem, capability, audience, or resource. We will look for the smallest useful thing we can do together.</h2>
        <p>
          That might be a review, pilot, workshop, co-developed artifact, funding
          conversation, distribution test, or introduction. If there is no clear exchange
          of value, there may simply be nothing to do yet—and that is a useful answer too.
        </p>
        <nav className={styles.collaborationCloseLinks} aria-label="Collaboration next steps">
          <a href={publicContactMailto("Boundary First Labs — Collaboration")}>Start a collaboration conversation <span aria-hidden="true">-&gt;</span></a>
          <Link href="/open-lab">Explore Open Lab <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">How funding works <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/projects">See current projects <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
