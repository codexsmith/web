import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Collaboration.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import {
  collaborationBoundaries,
  collaborationExchange,
  collaborationLanes,
  collaborationModes,
  collaborationProcess,
  collaborationRoles,
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
        title={<>Build the smallest relationship that lets the work meet reality.</>}
        lead={
          <>
            Boundary First Labs collaborates where there is a genuine division of
            comparative advantage.
          </>
        }
        support={
          <>
            The Lab does not seek association for its own sake. It looks for people and
            institutions that possess something the work genuinely needs and that BFL
            cannot, should not, or does not want to reproduce itself.
          </>
        }
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
          eyebrow={<>RELATIONSHIP FORMS</>}
          title={<>A useful relationship does not have to become a partnership.</>}
          note={
            <>
              Expert criticism, one pilot, one publication, one introduction, or a clean
              transfer can be the right complete relationship.
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
          <span>USEFUL ROLES</span>
          <div>
            {collaborationRoles.map((role) => <strong key={role}>{role}</strong>)}
          </div>
        </div>
      </section>

      <section className={styles.collaborationMapSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>COLLABORATION MAP</>}
          title={<>A large named surface, without pretending the names mean the same thing.</>}
          note={
            <>
              The Lab already maintains named routes across local institutions, research
              ecosystems, businesses, public-interest organizations, creators, critics,
              funders, and potential distribution partners.
            </>
          }
        />

        <aside className={styles.collaborationMapDisclaimer}>
          <span>MAPPED POSSIBILITIES, NOT AFFILIATIONS</span>
          <p>
            Inclusion here does not imply contact, partnership, endorsement, agreement, or
            current fit. The state badge describes BFL&apos;s present readiness or dependency,
            not the other party&apos;s interest. Every route should be reverified before use.
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
                    <span data-stage={entry.stage}>{entry.stage}</span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.collaborationLegend}>
          {collaborationStageLegend.map(([stage, description]) => (
            <div key={stage}>
              <strong>{stage}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.collaborationProcessSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>FROM CONTACT TO EVIDENCE</>}
          title={<>Recognized problem → bounded relationship → next decision.</>}
          note={<>The goal is not to maximize the number of relationships. It is to make each relationship evidence-generating and governable.</>}
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
          <p className={styles.sectionIndex}>COLLABORATION WITHOUT ABSORPTION</p>
          <h2>Work can cross an institutional boundary without losing its provenance.</h2>
          <p>
            Good collaboration makes the exchange clearer: who brought what, who has
            authority over which claim, what evidence was produced, what can be published,
            and what happens when the relationship ends.
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
        <p className={styles.sectionIndex}>THE COLLABORATION QUESTION</p>
        <h2>What do you have that the Lab should not rebuild—and what does the Lab have that would be expensive for you to recreate?</h2>
        <p>
          That is enough to start. The Open Lab is the designed public boundary for future
          intake; until that pipeline is live, the collaboration map remains an inspectable
          statement of where the Lab expects outside capability, criticism, and stewardship
          to matter.
        </p>
        <a href="/v3/open-lab">See the Open Lab boundary <span aria-hidden="true">-&gt;</span></a>
      </section>
    </InstitutionalPageShell>
  );
}
