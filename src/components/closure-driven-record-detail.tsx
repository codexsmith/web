import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import closureDrivenContent from "@/content/product-landing-pages/closure-driven-software-development.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type ClosureDrivenRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const loopGlyphs: BfuxIconName[] = [
  "inspect",
  "boundary",
  "chain",
  "transition",
  "witness",
  "repair",
];

export function ClosureDrivenRecordDetail({ owner, entry }: ClosureDrivenRecordDetailProps) {
  const record = closureDrivenContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface closure-driven-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="closure-driven-title"
    >
      <article className="detail-workbench closure-driven">
        <header className="closure-driven__masthead">
          <div className="closure-driven__identity">
            <BfuxIcon name="closure" className="closure-driven__mark" />
            <div>
              <span>Advanced practitioner draft · delivery control surface</span>
              <h1 id="closure-driven-title">{record.hero.headline}</h1>
            </div>
          </div>
          <div className="closure-driven__tools">
            <span>{record.title}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.support}</p>
          <div className="closure-driven__boundary-line">
            <span>Same engineering method</span>
            <i aria-hidden="true" />
            <span>Progressive-closure instrument</span>
          </div>
        </header>

        <div className="closure-driven__scroll">
          <section className="closure-driven__opening" aria-labelledby="closure-driven-definition">
            <div className="closure-driven__definition">
              <span className="closure-driven__micro-label">Operating proposition</span>
              <h2 id="closure-driven-definition">{record.definition.title}</h2>
              <p>{record.definition.body}</p>
              <blockquote>{record.definition.maxim}</blockquote>
            </div>

            <div className="closure-driven__pressure" aria-label="Progressive closure model">
              <div className="closure-driven__pressure-dial" aria-hidden="true">
                <BfuxIcon name="pressure" />
                <span>uncertainty</span>
                <strong>bounded</strong>
              </div>
              <div>
                <span className="closure-driven__micro-label">Closure law</span>
                <p>
                  Each artifact is a bounded claim. Execution can confirm it, refine it,
                  or falsify it before the commitment becomes expensive to reverse.
                </p>
              </div>
            </div>
          </section>

          <section className="closure-driven__section closure-driven__section--loop" id={record.loop.id}>
            <header>
              <span className="closure-driven__micro-label">Delivery backplane</span>
              <h2>{record.loop.title}</h2>
              <p>
                The loop does not reward activity. Every stage must produce a witness that
                reduces consequential uncertainty or exposes the need for another pass.
              </p>
            </header>

            <ol className="closure-driven__loop" aria-label="Six-stage closure loop">
              {record.loop.steps.map((step, index) => (
                <li key={step.name}>
                  <div className="closure-driven__loop-index">
                    <BfuxIcon name={loopGlyphs[index] ?? "transition"} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{step.name}</h3>
                  <p>{step.question}</p>
                  <small>Witness · {step.witness}</small>
                  {index < record.loop.steps.length - 1 ? (
                    <BfuxIcon name="direction" className="closure-driven__loop-arrow" />
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="closure-driven__section closure-driven__section--certainty">
            <header>
              <span className="closure-driven__micro-label">Readiness instrument</span>
              <h2>{record.certainty.title}</h2>
              <p>{record.certainty.body}</p>
            </header>

            <div className="closure-driven__certainty">
              <article data-cone="domain">
                <div className="closure-driven__cone-heading">
                  <BfuxIcon name="contexture" />
                  <div>
                    <span>Domain cone</span>
                    <strong>Can we recognize the right change?</strong>
                  </div>
                </div>
                <ul>
                  {record.certainty.domainCone.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>

              <div className="closure-driven__intersection" aria-label="Implementation readiness intersection">
                <BfuxIcon name="crossing" />
                <span>Commitment window</span>
                <strong>Ready enough for the next irreversible decision</strong>
                <small>Intersection, not completeness</small>
              </div>

              <article data-cone="executable">
                <div className="closure-driven__cone-heading">
                  <BfuxIcon name="chain" />
                  <div>
                    <span>Executable cone</span>
                    <strong>Can the path run, fail, and be repaired?</strong>
                  </div>
                </div>
                <ul>
                  {record.certainty.executableCone.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </section>

          <section className="closure-driven__section closure-driven__section--skeleton">
            <header>
              <span className="closure-driven__micro-label">Executable skeleton</span>
              <h2>{record.deliverySkeleton.title}</h2>
              <p>{record.deliverySkeleton.body}</p>
            </header>

            <ol className="closure-driven__skeleton" aria-label="Minimum delivery skeleton requirements">
              {record.deliverySkeleton.requirements.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <BfuxIcon name={index === 4 ? "defect" : index === 5 ? "inspect" : index === 6 ? "responsibility" : "transition"} />
                  <p>{item}</p>
                </li>
              ))}
            </ol>
            <aside className="closure-driven__truth-path">
              <BfuxIcon name="witness" />
              <div>
                <span>Truth path</span>
                <strong>Real input → meaningful operation → recognizable output → observable failure → repair owner</strong>
              </div>
            </aside>
          </section>

          <section className="closure-driven__section closure-driven__section--example" id={record.workedExample.id}>
            <header>
              <span className="closure-driven__micro-label">Worked delivery loop</span>
              <h2>{record.workedExample.title}</h2>
              <p>{record.workedExample.request}</p>
            </header>

            <div className="closure-driven__ticket">
              <div className="closure-driven__ticket-request">
                <span>Requested surface</span>
                <strong>CSV export button</strong>
                <small>Simple UI request</small>
              </div>
              <BfuxIcon name="reveal" />
              <div className="closure-driven__ticket-domain">
                <span>Actual commitment</span>
                <strong>{record.workedExample.hiddenDistinctions.length} consequential distinctions</strong>
                <small>Authorization · history · ordering · delivery · retention · audit</small>
              </div>
            </div>

            <div className="closure-driven__example-grid">
              <article>
                <div className="closure-driven__panel-heading">
                  <BfuxIcon name="reveal" />
                  <div>
                    <span>Hidden distinctions</span>
                    <strong>What the button does not tell us</strong>
                  </div>
                </div>
                <ul className="closure-driven__distinctions">
                  {record.workedExample.hiddenDistinctions.map((item, index) => (
                    <li key={item}><span>D{String(index + 1).padStart(2, "0")}</span>{item}</li>
                  ))}
                </ul>
              </article>

              <article>
                <div className="closure-driven__panel-heading">
                  <BfuxIcon name="chain" />
                  <div>
                    <span>Smallest executable skeleton</span>
                    <strong>Enough path to expose the boundary</strong>
                  </div>
                </div>
                <ol className="closure-driven__example-skeleton">
                  {record.workedExample.smallestSkeleton.map((item, index) => (
                    <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
                  ))}
                </ol>
              </article>
            </div>

            <div className="closure-driven__closure-gate">
              <BfuxIcon name="gate" />
              <div>
                <span>Closure gate</span>
                <strong>A file downloading is not sufficient evidence of closure.</strong>
                <p>{record.workedExample.closureCheck}</p>
              </div>
            </div>

            <blockquote className="closure-driven__lesson">{record.workedExample.lesson}</blockquote>
          </section>

          <section className="closure-driven__section closure-driven__section--validation">
            <header>
              <span className="closure-driven__micro-label">Validation console</span>
              <h2>{record.validation.title}</h2>
              <p>{record.validation.comparisonShape}</p>
            </header>

            <div className="closure-driven__validation-grid">
              <article>
                <div className="closure-driven__panel-heading">
                  <BfuxIcon name="witness" />
                  <div>
                    <span>Evidence targets</span>
                    <strong>What would make the method testable?</strong>
                  </div>
                </div>
                <ul>
                  {record.validation.evidenceTargets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <aside>
                <BfuxIcon name="warning" />
                <span>Current evidence ceiling</span>
                <p>{record.validation.claimRule}</p>
              </aside>
            </div>
          </section>

          <section className="closure-driven__section closure-driven__section--claims">
            <header>
              <span className="closure-driven__micro-label">Claim firewall</span>
              <h2>{record.claimBoundary.title}</h2>
            </header>

            <div className="closure-driven__claim-grid">
              <article data-standing="safe">
                <div className="closure-driven__panel-heading">
                  <BfuxIcon name="admissibility" />
                  <div>
                    <span>Safe public standing</span>
                    <strong>What may be said now</strong>
                  </div>
                </div>
                <ul>{record.claimBoundary.safe.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article data-standing="open">
                <div className="closure-driven__panel-heading">
                  <BfuxIcon name="warning" />
                  <div>
                    <span>Not established</span>
                    <strong>What remains a validation burden</strong>
                  </div>
                </div>
                <ul>{record.claimBoundary.notEstablished.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
          </section>

          <footer className="closure-driven__closing">
            <BfuxIcon name="closure" />
            <div>
              <span>{record.closing.eyebrow}</span>
              <h2>{record.closing.title}</h2>
              <p>{record.closing.finalLine}</p>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
