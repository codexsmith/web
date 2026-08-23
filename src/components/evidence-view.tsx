"use client";

import Link from "next/link";
import type { ContentNode } from "@/lib/content-registry";
import {
  getBranchEvidenceSummary,
  getEvidenceProfile,
  type BranchEvidenceEvent,
  type EvidenceAvailability,
  type EvidenceProfile,
  type EvidenceSource,
} from "@/lib/evidence-content";
import type { SemanticEvent } from "@/lib/semantic-events";

type EvidenceViewProps = {
  focusNode: ContentNode;
  onNavigate: (id: string) => void;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  const monthName = monthNames[Number(month) - 1];
  if (!year || !monthName || !day) return value;
  return `${monthName} ${Number(day)}, ${year}`;
}

function humanize(value: string) {
  return value.replaceAll("-", " ");
}

function availabilityLabel(availability: EvidenceAvailability) {
  if (availability === "public") return "Public";
  if (availability === "internal") return "Internal register";
  return "Retained";
}

function EvidenceHeading({ profile }: { profile: EvidenceProfile }) {
  return (
    <>
      <header className="evidence-view__heading">
        <div>
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1>{profile.title}</h1>
          <p>{profile.question}</p>
        </div>
        <dl className="evidence-view__scope">
          <div>
            <dt>Current standing</dt>
            <dd>{profile.currentStanding}</dd>
          </div>
          <div>
            <dt>Evidence level</dt>
            <dd>{profile.evidenceLevel}</dd>
          </div>
          <div>
            <dt>Last evidence update</dt>
            <dd>{profile.lastUpdated ? formatDate(profile.lastUpdated) : "Not declared"}</dd>
          </div>
          <div>
            <dt>Next gate</dt>
            <dd>{profile.nextGate}</dd>
          </div>
        </dl>
      </header>

      <section className="evidence-ceiling" aria-label="Claim ceiling">
        <span>Claim ceiling</span>
        <p>{profile.claimCeiling}</p>
      </section>
    </>
  );
}

function ClaimSection({ profile }: { profile: EvidenceProfile }) {
  const sourceById = new Map(profile.sources.map((source) => [source.id, source]));

  return (
    <section className="evidence-section evidence-section--claims">
      <header className="evidence-section__heading">
        <span>Claims</span>
        <h2>What the current record supports</h2>
      </header>
      <div className="evidence-claims">
        {profile.claims.map((claim) => {
          const supports = claim.supportIds
            .map((sourceId) => sourceById.get(sourceId))
            .filter((source): source is EvidenceSource => Boolean(source));

          return (
            <article key={claim.id} data-standing={claim.standing}>
              <div className="evidence-claim__standing">{claim.standing}</div>
              <h3>{claim.statement}</h3>
              {supports.length ? (
                <div className="evidence-claim__support">
                  <span>Supported by</span>
                  <ul>
                    {supports.map((source) => (
                      <li key={source.id}>
                        <a href={`#evidence-source-${source.id}`}>{source.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {claim.boundary ? (
                <div className="evidence-claim__boundary">
                  <span>Boundary</span>
                  <p>{claim.boundary}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SourceLink({ source }: { source: EvidenceSource }) {
  if (!source.href) return null;
  if (source.href.startsWith("/")) return <Link href={source.href}>View public record</Link>;
  return <a href={source.href}>View public record</a>;
}

function SourceSection({ sources }: { sources: EvidenceSource[] }) {
  if (!sources.length) return null;

  return (
    <section className="evidence-section evidence-section--sources">
      <header className="evidence-section__heading">
        <span>Sources</span>
        <h2>Records behind the claims</h2>
      </header>
      <div className="evidence-sources">
        {sources.map((source) => (
          <article id={`evidence-source-${source.id}`} key={source.id}>
            <header>
              <span>{source.type}</span>
              <small data-availability={source.availability}>{availabilityLabel(source.availability)}</small>
            </header>
            <h3>{source.label}</h3>
            {source.owner || source.date ? (
              <dl>
                {source.owner ? (
                  <div>
                    <dt>Owner</dt>
                    <dd>{source.owner}</dd>
                  </div>
                ) : null}
                {source.date ? (
                  <div>
                    <dt>Date</dt>
                    <dd>{formatDate(source.date)}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            {source.note ? <p>{source.note}</p> : null}
            <SourceLink source={source} />
          </article>
        ))}
      </div>
    </section>
  );
}

function LimitsSection({ profile }: { profile: EvidenceProfile }) {
  const limits = profile.limits ?? [];
  const unknowns = profile.unknowns ?? [];
  if (!limits.length && !unknowns.length) return null;

  return (
    <section className="evidence-section evidence-section--limits">
      <header className="evidence-section__heading">
        <span>Limits</span>
        <h2>What remains outside the claim</h2>
      </header>
      <div className="evidence-limits">
        {limits.length ? (
          <div>
            <h3>Boundaries</h3>
            <ul>
              {limits.map((limit) => <li key={limit}>{limit}</li>)}
            </ul>
          </div>
        ) : null}
        {unknowns.length ? (
          <div>
            <h3>Open questions</h3>
            <ul>
              {unknowns.map((unknown) => <li key={unknown}>{unknown}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function EventDate({ event }: { event: SemanticEvent }) {
  if (event.effectiveAt) {
    return <time dateTime={event.effectiveAt}>Effective {formatDate(event.effectiveAt)}</time>;
  }

  return (
    <span className="evidence-event__date">
      <time dateTime={event.recordedAt}>Recorded {formatDate(event.recordedAt)}</time>
      <small>Effective date not established</small>
    </span>
  );
}

function EventCards({ events, showNode = false }: { events: Array<SemanticEvent | BranchEvidenceEvent>; showNode?: boolean }) {
  return (
    <div className="evidence-events">
      {events.map((event) => {
        const branchEvent = event as BranchEvidenceEvent;
        return (
          <article key={event.id} data-event-type={event.type}>
            <header>
              <div>
                <span>{showNode && branchEvent.node ? branchEvent.node.label : humanize(event.type)}</span>
                <h3>{event.label}</h3>
              </div>
              <EventDate event={event} />
            </header>
            <p>{event.summary}</p>
            <dl>
              <div>
                <dt>Actor</dt>
                <dd>{event.actor.label}</dd>
              </div>
              <div>
                <dt>Standing effect</dt>
                <dd>{event.standingEffect}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function HistorySection({ events }: { events: SemanticEvent[] }) {
  if (!events.length) return null;

  return (
    <section className="evidence-section evidence-section--history">
      <header className="evidence-section__heading">
        <span>Change history</span>
        <h2>Admitted changes to standing</h2>
      </header>
      <EventCards events={events} />
    </section>
  );
}

function ObjectEvidenceView({ focusNode }: { focusNode: ContentNode }) {
  const profile = getEvidenceProfile(focusNode);
  if (!profile) return null;

  return (
    <main className="world-viewport evidence-viewport">
      <article className="evidence-view evidence-view--object" aria-label={`Evidence for ${profile.title}`}>
        <EvidenceHeading profile={profile} />
        <div className="evidence-view__grid">
          <ClaimSection profile={profile} />
          <SourceSection sources={profile.sources} />
          <LimitsSection profile={profile} />
          <HistorySection events={profile.events} />
        </div>
      </article>
    </main>
  );
}

function BranchEvidenceView({ focusNode, onNavigate }: EvidenceViewProps) {
  const summary = getBranchEvidenceSummary(focusNode);
  const shownGates = summary.gates.slice(0, 8);
  const remainingGates = summary.gates.length - shownGates.length;

  return (
    <main className="world-viewport evidence-viewport">
      <article className="evidence-view evidence-view--branch" aria-label={`Portfolio evidence for ${focusNode.label}`}>
        <header className="evidence-view__heading">
          <div>
            <p className="eyebrow">Portfolio evidence</p>
            <h1>{focusNode.label}</h1>
            <p>{summary.question}</p>
          </div>
          <dl className="evidence-view__scope">
            <div>
              <dt>Evidence-bearing objects</dt>
              <dd>{summary.items.length}</dd>
            </div>
            <div>
              <dt>Standing categories</dt>
              <dd>{summary.stageCounts.length}</dd>
            </div>
            <div>
              <dt>Declared next gates</dt>
              <dd>{summary.gates.length}</dd>
            </div>
            <div>
              <dt>Admitted changes</dt>
              <dd>{summary.events.length}</dd>
            </div>
          </dl>
        </header>

        <div className="evidence-view__grid">
          {summary.stageCounts.length ? (
            <section className="evidence-section evidence-section--distribution">
              <header className="evidence-section__heading">
                <span>Standing</span>
                <h2>Current portfolio distribution</h2>
              </header>
              <dl className="evidence-distribution">
                {summary.stageCounts.map(({ stage, count }) => (
                  <div key={stage} data-stage={stage}>
                    <dt>{humanize(stage)}</dt>
                    <dd>{count}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="evidence-section evidence-section--portfolio">
            <header className="evidence-section__heading">
              <span>Evidence-bearing work</span>
              <h2>Objects with declared standing or support</h2>
            </header>
            <div className="evidence-portfolio">
              {summary.items.map((item) => (
                <button type="button" key={item.node.id} onClick={() => onNavigate(item.node.id)} data-stage={item.stage}>
                  <span>{humanize(item.stage)}</span>
                  <strong>{item.node.label}</strong>
                  <small>{item.standing}</small>
                  <i aria-hidden="true">View evidence →</i>
                </button>
              ))}
            </div>
          </section>

          {shownGates.length ? (
            <section className="evidence-section evidence-section--gates">
              <header className="evidence-section__heading">
                <span>Promotion gates</span>
                <h2>What must happen next</h2>
              </header>
              <div className="evidence-gates">
                {shownGates.map(({ node, gate }) => (
                  <article key={node.id}>
                    <button type="button" onClick={() => onNavigate(node.id)}>{node.label}</button>
                    <p>{gate}</p>
                  </article>
                ))}
                {remainingGates > 0 ? (
                  <p className="evidence-gates__remainder">
                    {remainingGates} additional {remainingGates === 1 ? "gate is" : "gates are"} available on individual evidence views.
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {summary.events.length ? (
            <section className="evidence-section evidence-section--history">
              <header className="evidence-section__heading">
                <span>Recent changes</span>
                <h2>Admitted changes across this portfolio</h2>
              </header>
              <EventCards events={summary.events} showNode />
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}

export function EvidenceView(props: EvidenceViewProps) {
  if (props.focusNode.kind === "branch") return <BranchEvidenceView {...props} />;
  return <ObjectEvidenceView focusNode={props.focusNode} />;
}
