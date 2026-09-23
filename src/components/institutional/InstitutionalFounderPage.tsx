import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Founder.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  founderMethod,
  founderPrinciples,
  founderRoles,
  founderTimeline,
} from "./content/founder";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalFounderPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.founderPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.founderHero}
        eyebrow={<>FOUNDER</>}
        title={<>Nicholas T. Smith</>}
        lead={
          <>
            Computer scientist, systems engineer, and founder of Boundary First Labs.
          </>
        }
        support={
          <>
            His work sits where software engineering, Lean–Agile practice, scientific method,
            agentic reasoning, formal systems, and institutional consequence meet:
            understand the representation, make state explicit, build the smallest coherent
            test, inspect what happens, and repair what fails.
          </>
        }
        childLinks={institutionalChildRoutes.founder}
      >
        <div className={styles.founderIdentityPlate}>
          <div className={styles.founderMonogram} aria-hidden="true">N</div>
          <div>
            <span>FOUNDER / BUILDER / RESEARCHER</span>
            <strong>Computer scientist · systems engineer</strong>
            <p>Georgia Tech–trained · independent researcher · Boundary First Labs</p>
          </div>
        </div>
      </InstitutionalRouteHero>

      <section className={styles.founderRolesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THREE WORKING IDENTITIES</>}
          title={<>The Lab grew from engineering and research practiced together.</>}
          note={<>Different labels for one recurring operation: make the system legible enough to act on and repair.</>}
        />

        <div className={styles.founderRoleGrid}>
          {founderRoles.map((role, index) => (
            <article className={styles.founderRoleCard} key={role.label}>
              <span>{formatOrdinal(index)}</span>
              <small>{role.label}</small>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.founderFormation}>
        <div className={styles.founderFormationLead}>
          <p className={styles.sectionIndex}>FORMATION</p>
          <h2>The method was not invented all at once.</h2>
          <p>
            It accumulated through research, production software, consulting, independent
            study, and repeated encounters with representations that stopped carrying the
            reality they were supposed to describe.
          </p>
        </div>

        <div className={styles.founderTimeline}>
          {founderTimeline.map((item, index) => (
            <article key={item.period}>
              <span>{formatOrdinal(index)}</span>
              <div>
                <small>{item.period}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.founderMethodSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>THE RECURRING METHOD</>}
          title={<>The domain changes. The operation persists.</>}
          note={<>A compact version of the practice that eventually became Boundary First.</>}
        />

        <div className={styles.founderMethodRail}>
          {founderMethod.map((step, index) => (
            <div key={step}>
              <span>{formatOrdinal(index)}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>

        <div className={styles.founderPrincipleGrid}>
          {founderPrinciples.map((principle) => (
            <article key={principle.label}>
              <span>{principle.label}</span>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.founderBoundary}>
        <div>
          <p className={styles.sectionIndex}>THE FOUNDER BOUNDARY</p>
          <h2>The Lab has to survive contact with people other than its founder.</h2>
          <p>
            Founder history explains where the machinery came from. It does not establish
            the machinery as correct. The work has to survive independent criticism,
            reproduce useful results, expose its defects, and become transferable enough
            that other people can inspect, operate, repair, reject, or extend it.
          </p>
        </div>

        <blockquote>
          The founder is evidence of one path through the machinery. He is not the
          justification for the machinery.
        </blockquote>
      </section>
    </InstitutionalPageShell>
  );
}
