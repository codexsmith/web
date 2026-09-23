import Link from "next/link";
import { InstitutionalPageShell } from "./InstitutionalPageShell";
import foundationStyles from "./styles/InstitutionalFoundation.module.css";
import routeSharedStyles from "./styles/InstitutionalRouteShared.module.css";
import routeStyles from "./styles/Now.module.css";
import { composeCssModules } from "./styles/composeCssModules";
import { InstitutionalRouteHero, InstitutionalSectionHeader } from "./InstitutionalPrimitives";
import { formatOrdinal } from "./institutionalFormat";
import { RecentChangesStrip } from "./RecentChangesStrip";
import { TemporalViewNav } from "./TemporalViewNav";
import { NowPriorityExplorer } from "./NowPriorityExplorer";
import { nowRecentChanges } from "./content/changes";
import { institutionalChildRoutes } from "./institutionalRoutes";
import {
  roadmapChangeRules,
  roadmapGates,
  roadmapHorizons,
} from "./content/now";

const styles = composeCssModules(foundationStyles, routeSharedStyles, routeStyles);

export function InstitutionalNowPage() {
  return (
    <InstitutionalPageShell mainClassName={styles.nowPage}>
      <InstitutionalRouteHero
        styles={styles}
        className={styles.nowHero}
        eyebrow={<>NOW / ROADMAP — SEPTEMBER 2026</>}
        title={<>What is Boundary First Labs doing now?</>}
        lead={
          <>
            Turning a very large body of existing work into a smaller set of public,
            testable, useful things that can survive contact with people outside the Lab.
          </>
        }
        support={
          <>
            This is a public projection of the active work queue, not a promise calendar
            and not a copy of every internal task. It shows the priority order, the major
            dependencies, and what would count as meaningful closure.
          </>
        }
        childLinks={institutionalChildRoutes.now}
      >
        <aside className={styles.nowOperatingThesis}>
          <span>CURRENT OPERATING THESIS</span>
          <strong>Externalize → test → repair → repeat → transfer.</strong>
          <p>
            The immediate problem is not generating more ideas. It is converting existing
            capability into bounded artifacts, outside evidence, criticism, revenue,
            publication, and repeatable institutional practice.
          </p>
        </aside>
      </InstitutionalRouteHero>

      <TemporalViewNav activeView="now" />

      <RecentChangesStrip
        changes={nowRecentChanges}
        title="What materially changed?"
        compact
      />

      <section className={styles.nowPrioritiesSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>CURRENT PRIORITIES</>}
          title={<>Six priority lanes, each with a closure condition.</>}
          note={
            <>
              Priority means the Lab is allocating current attention or near-term conversion
              capacity here. It does not mean every item inside the lane runs simultaneously.
            </>
          }
        />

        <NowPriorityExplorer />
      </section>

      <section className={styles.roadmapHorizonsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>NOW → NEXT → LATER</>}
          title={<>The sequence matters more than the date.</>}
          note={
            <>
              Later work becomes credible only after earlier work produces the evidence,
              capability, or institutional machinery it depends on.
            </>
          }
        />

        <div className={styles.roadmapHorizonGrid}>
          {roadmapHorizons.map((horizon, index) => (
            <article key={horizon.label}>
              <header>
                <span>{formatOrdinal(index)}</span>
                <div>
                  <small>{horizon.horizon}</small>
                  <h3>{horizon.label}</h3>
                </div>
              </header>
              <strong>{horizon.title}</strong>
              <ul>
                {horizon.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roadmapGatesSection}>
        <div className={styles.roadmapGatesLead}>
          <p className={styles.sectionIndex}>WHAT WOULD COUNT AS PROGRESS?</p>
          <h2>The roadmap closes on evidence, not activity.</h2>
          <p>
            A busy queue is not the objective. The useful question is whether the Lab can
            point to new states that did not exist before: a clearer institution, outside
            evidence, a bound publication, independent use, or machinery that transfers.
          </p>
        </div>

        <div className={styles.roadmapGateGrid}>
          {roadmapGates.map((gate, index) => (
            <article key={gate.title}>
              <span>{formatOrdinal(index)}</span>
              <strong>{gate.title}</strong>
              <p>{gate.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roadmapChangeSection}>
        <InstitutionalSectionHeader
          styles={styles}
          className={styles.roadmapChangeHeader}
          eyebrow={<>WHAT CAN CHANGE THE ROADMAP?</>}
          title={<>The plan is allowed to learn.</>}
          note={
            <>
              A roadmap that cannot respond to evidence becomes theater. These are the
              rules that can legitimately change sequence, scope, or priority.
            </>
          }
        />

        <div className={styles.roadmapChangeGrid}>
          {roadmapChangeRules.map((rule) => (
            <article key={rule.label}>
              <span>{rule.label}</span>
              <p>{rule.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.nowClose}>
        <p className={styles.sectionIndex}>CURRENT PUBLIC QUESTION</p>
        <h2>Can accumulated capability become an institution that other people can inspect, use, challenge, fund, and eventually operate?</h2>
        <p>
          The next year is less about widening the Lab than about closing that conversion
          loop. Funding increases the available capacity. Collaboration introduces outside
          reality. Evidence decides what deserves to continue.
        </p>

        <nav className={styles.nowCloseLinks} aria-label="Roadmap next steps">
          <Link href="/contact?type=general&source=now">Start a conversation <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/evidence">Evidence <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/applied-work">Applied Work <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/collaboration">Collaboration <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/funding">Funding <span aria-hidden="true">-&gt;</span></Link>
          <Link href="/open-lab">Open Lab <span aria-hidden="true">-&gt;</span></Link>
        </nav>
      </section>
    </InstitutionalPageShell>
  );
}
