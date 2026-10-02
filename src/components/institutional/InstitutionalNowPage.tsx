import Link from "next/link";
import { publicContactMailto } from "@/lib/site-contact";
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
        eyebrow={<>NOW / ROADMAP — OCTOBER 2026</>}
        title={<>What is Boundary First Labs doing now?</>}
        lead={
          <>
            Turning a very large body of existing work into a smaller set of public,
            testable, useful things that can survive contact with people outside the Lab.
          </>
        }
        support={
          <>
            This is a public view of the Lab&apos;s current priorities, what they depend on,
            and what would count as meaningful progress. It is not a promise calendar or a
            copy of every internal task.
          </>
        }
        childLinks={institutionalChildRoutes.now}
      >
        <aside className={styles.nowOperatingThesis}>
          <span>CURRENT OPERATING THESIS</span>
          <strong>Make it public → let people use it → learn → repair → transfer.</strong>
          <p>
            The immediate problem is not generating more ideas. It is turning existing
            research, software, methods, and products into things people outside the Lab can
            inspect, use, criticize, fund, buy, review, or help improve.
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
          title={<>Six priorities, each with a clear definition of progress.</>}
          note={
            <>
              Priority means the Lab is spending current attention here. It does not mean
              every task in that area is happening at the same time.
            </>
          }
        />

        <NowPriorityExplorer />
      </section>

      <section className={styles.roadmapHorizonsSection}>
        <InstitutionalSectionHeader
          styles={styles}
          eyebrow={<>NOW → NEXT → LATER</>}
          title={<>The order matters more than an artificial deadline.</>}
          note={
            <>
              Later work becomes credible only after earlier work produces the evidence,
              capability, or infrastructure it depends on.
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
            Activity is not the objective. Progress means something changed in the outside
            world: a clearer public institution, independent use, a paid engagement, a
            reviewed publication, stronger evidence, or a process another person can operate.
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
        <h2>Can the Lab become useful to people who did not build it?</h2>
        <p>
          The next phase is less about adding new areas than about proving which existing
          areas are genuinely useful. Funding increases capacity. Collaboration and customers
          introduce outside reality. Evidence decides what deserves to grow, change, or stop.
        </p>

        <nav className={styles.nowCloseLinks} aria-label="Roadmap next steps">
          <a href={publicContactMailto("Boundary First Labs — General inquiry")}>Start a conversation <span aria-hidden="true">-&gt;</span></a>
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
