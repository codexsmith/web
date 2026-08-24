import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import boundaryFirstUxContent from "@/content/product-landing-pages/boundary-first-ux.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type BoundaryFirstUxRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const actionGlyphs: Record<string, BfuxIconName> = {
  Orient: "orient",
  Traverse: "traverse",
  Inspect: "inspect",
  Reveal: "reveal",
  Reframe: "reframe",
  Trace: "trace",
  Gate: "gate",
  Stress: "stress",
  Repair: "repair",
  Promote: "promotion",
  Closure: "closure",
};

const eventGlyphs: Record<string, BfuxIconName> = {
  Leak: "defect",
  Crack: "defect",
  Overflow: "pressure",
  Stall: "gate",
  Orphan: "relation",
  Drift: "direction",
  Collision: "crossing",
  Closure: "closure",
};

const principleGlyphs: BfuxIconName[] = [
  "boundary",
  "invariant",
  "reveal",
  "consequence",
  "closure",
];

const projectionGlyphs: BfuxIconName[] = ["world", "projection", "inspect"];

export function BoundaryFirstUxRecordDetail({ owner, entry }: BoundaryFirstUxRecordDetailProps) {
  const record = boundaryFirstUxContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface bfux-standard-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="bfux-standard-title"
    >
      <article className="detail-workbench bfux-standard">
        <header className="bfux-standard__masthead">
          <div className="bfux-standard__identity">
            <BfuxIcon name="boundary" className="bfux-standard__mark" />
            <div>
              <span>Working public standard · launch candidate</span>
              <h1 id="bfux-standard-title">{record.product.primaryLine}</h1>
            </div>
          </div>
          <div className="bfux-standard__tools">
            <span>{record.product.shortName}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.deck}</p>
          <div className="bfux-standard__boundary-line">
            <span>Same semantic object</span>
            <i aria-hidden="true" />
            <span>Normative detail instrument</span>
          </div>
        </header>

        <div className="bfux-standard__scroll">
          <section className="bfux-standard__opening" aria-labelledby="bfux-opening-title">
            <div className="bfux-standard__opening-copy">
              <span className="bfux-standard__eyebrow">Representation boundary</span>
              <h2 id="bfux-opening-title">{record.opening.title}</h2>
              <p>{record.opening.body}</p>
              <blockquote>{record.product.commitment}</blockquote>
              <div className="bfux-standard__north-star">
                <BfuxIcon name="reveal" />
                <div>
                  <span>North star</span>
                  <strong>{record.product.northStar}</strong>
                </div>
              </div>
            </div>

            <div className="bfux-standard__boundary-demo" aria-label="Current representation boundary demonstration">
              <div className="bfux-standard__boundary-demo-labels">
                <span>inside current representation</span>
                <span>outside current representation</span>
              </div>
              <div className="bfux-standard__boundary-demo-frame">
                <div>
                  <BfuxIcon name="object" />
                  <strong>Useful local view</strong>
                  <small>identity · state · task</small>
                </div>
                <aside>
                  <BfuxIcon name="consequence" />
                  <strong>Deferred structure</strong>
                  <small>obligation · provenance · consequence</small>
                </aside>
              </div>
              <p>Partiality is visible. The outside is not erased merely because it is not currently rendered.</p>
            </div>
          </section>

          <section className="bfux-standard__principles" aria-labelledby="bfux-principles-title">
            <header>
              <span className="bfux-standard__eyebrow">Core laws</span>
              <h2 id="bfux-principles-title">Five obligations govern every BFUX representation.</h2>
            </header>
            <div>
              {record.principles.map((principle, index) => (
                <article key={principle}>
                  <BfuxIcon name={principleGlyphs[index] ?? "boundary"} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{principle}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="bfux-standard__flagship" id={record.flagship.id} aria-labelledby="bfux-flagship-title">
            <header>
              <span className="bfux-standard__eyebrow">Flagship proof</span>
              <h2 id="bfux-flagship-title">{record.flagship.title}</h2>
              <p>{record.flagship.premise}</p>
            </header>

            <ol className="bfux-standard__action-sequence" aria-label="Boundary First UX flagship interaction sequence">
              {record.flagship.sequence.map((action, index) => (
                <li key={action} data-act={index < 2 ? "trust" : index < 6 ? "discovery" : "reconstruction"}>
                  <BfuxIcon name={actionGlyphs[action] ?? "transition"} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{action}</strong>
                </li>
              ))}
            </ol>

            <div className="bfux-standard__acts">
              {Object.entries(record.flagship.acts).map(([act, actions]) => (
                <article key={act}>
                  <span>{act}</span>
                  <strong>{actions.join(" → ")}</strong>
                </article>
              ))}
            </div>

            <div className="bfux-standard__timeline-proof" aria-label="Project interval promoted into lifecycle context">
              <div className="bfux-standard__timeline-heading">
                <div>
                  <span>Timeline proof</span>
                  <strong>{record.timelineProof.question}</strong>
                </div>
                <p>{record.timelineProof.line}</p>
              </div>
              <div className="bfux-standard__timeline-rail">
                {record.timelineProof.sequence.map((stage, index) => (
                  <div key={stage}>
                    <i aria-hidden="true" />
                    <span>{stage}</span>
                    {index === record.timelineProof.sequence.length - 1 ? <em>project boundary</em> : null}
                  </div>
                ))}
                <aside>
                  <span>maintenance obligation</span>
                  <strong>10 years</strong>
                </aside>
              </div>
              <div className="bfux-standard__timeline-notes">
                <p><BfuxIcon name="reveal" />{record.timelineProof.reveal}</p>
                <p><BfuxIcon name="promotion" />{record.timelineProof.promotion}</p>
              </div>
            </div>
          </section>

          <section className="bfux-standard__semantic-world" aria-labelledby="bfux-semantic-world-title">
            <header>
              <span className="bfux-standard__eyebrow">Renderer independence</span>
              <h2 id="bfux-semantic-world-title">{record.rendererIndependence.thesis}</h2>
            </header>
            <div className="bfux-standard__renderer-grid">
              <div className="bfux-standard__semantic-core">
                <BfuxIcon name="invariant" />
                <span>semantic state</span>
                <strong>identity · provenance · consequence · closure</strong>
              </div>
              {record.rendererIndependence.projections.map((projection, index) => (
                <article key={projection}>
                  <BfuxIcon name={projectionGlyphs[index] ?? "projection"} />
                  <span>Projection {String(index + 1).padStart(2, "0")}</span>
                  <strong>{projection}</strong>
                </article>
              ))}
            </div>
            <blockquote>{record.semanticRule}</blockquote>
          </section>

          <section className="bfux-standard__stack" aria-labelledby="bfux-stack-title">
            <header>
              <span className="bfux-standard__eyebrow">Semantic stack</span>
              <h2 id="bfux-stack-title">Renderer is the outermost layer, not the source of truth.</h2>
            </header>
            <ol>
              {record.semanticStack.map((layer, index) => (
                <li key={layer}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{layer}</strong>
                </li>
              ))}
            </ol>
          </section>

          <section className="bfux-standard__grammar" aria-labelledby="bfux-grammar-title">
            <header>
              <span className="bfux-standard__eyebrow">Interaction grammar</span>
              <h2 id="bfux-grammar-title">A compact semantic grammar beneath many visual worlds.</h2>
            </header>

            <div className="bfux-standard__grammar-bank">
              <section>
                <span>World actions</span>
                <div>
                  {record.grammar.worldActions.map((action) => (
                    <article key={action}>
                      <BfuxIcon name={actionGlyphs[action] ?? "transition"} />
                      <strong>{action}</strong>
                    </article>
                  ))}
                </div>
              </section>
              <section>
                <span>Workbench operators</span>
                <div>
                  {record.grammar.workbench.map((action) => (
                    <article key={action}>
                      <BfuxIcon name="inspect" />
                      <strong>{action}</strong>
                    </article>
                  ))}
                </div>
              </section>
              <section>
                <span>World events</span>
                <div>
                  {record.grammar.worldEvents.map((event) => (
                    <article key={event}>
                      <BfuxIcon name={eventGlyphs[event] ?? "warning"} />
                      <strong>{event}</strong>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="bfux-standard__closure-law">
              <BfuxIcon name="closure" />
              <div>
                <span>State, not command</span>
                <strong>{record.grammar.closureRule}</strong>
              </div>
            </aside>
          </section>

          <section className="bfux-standard__mechanics" aria-labelledby="bfux-mechanics-title">
            <header>
              <span className="bfux-standard__eyebrow">Conceptual tangibility</span>
              <h2 id="bfux-mechanics-title">Physical metaphor is admissible only when it carries operational semantics.</h2>
            </header>
            <div className="bfux-standard__mechanics-grid">
              <article>
                <span>Art direction</span>
                <p>{record.conceptualTangibility.artDirection}</p>
                <blockquote>{record.conceptualTangibility.rule}</blockquote>
              </article>
              <article>
                <span>Screen depth</span>
                {Object.entries(record.conceptualTangibility.screenDepth).map(([position, meaning]) => (
                  <div key={position}><strong>{position}</strong><p>{meaning}</p></div>
                ))}
              </article>
              <article>
                <span>Motion semantics</span>
                {Object.entries(record.conceptualTangibility.motionSemantics).map(([motion, meaning]) => (
                  <div key={motion}><strong>{motion}</strong><p>{meaning}</p></div>
                ))}
              </article>
            </div>
            <div className="bfux-standard__motion-laws">
              {record.motionLaws.map((law) => <span key={law}><BfuxIcon name="transition" />{law}</span>)}
            </div>
          </section>

          <section className="bfux-standard__patterns" aria-labelledby="bfux-patterns-title">
            <header>
              <span className="bfux-standard__eyebrow">Pattern catalog</span>
              <h2 id="bfux-patterns-title">Reusable interactions remain named, inspectable, and composable.</h2>
            </header>
            <div>
              {record.interactionPatterns.map((pattern, index) => (
                <span key={pattern}><i>{String(index + 1).padStart(2, "0")}</i>{pattern}</span>
              ))}
            </div>
          </section>

          <section className="bfux-standard__accessibility" aria-labelledby="bfux-accessibility-title">
            <header>
              <BfuxIcon name="admissibility" />
              <div>
                <span className="bfux-standard__eyebrow">Accessibility</span>
                <h2 id="bfux-accessibility-title">{record.accessibility.principle}</h2>
              </div>
            </header>
            <div>
              {record.accessibility.requirements.map((requirement) => (
                <span key={requirement}><BfuxIcon name="witness" />{requirement}</span>
              ))}
            </div>
            <blockquote>{record.accessibility.rule}</blockquote>
          </section>

          <section className="bfux-standard__conformance" aria-labelledby="bfux-conformance-title">
            <header>
              <span className="bfux-standard__eyebrow">Conformance console</span>
              <h2 id="bfux-conformance-title">Conformance is a set of inspectable obligations, not a visual score.</h2>
              <p>The current levels are candidates. They are deliberately presented as proposed states rather than badges that imply certification.</p>
            </header>
            <div className="bfux-standard__conformance-body">
              <ol className="bfux-standard__criteria">
                {record.conformance.questions.map((question, index) => (
                  <li key={question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <BfuxIcon name="inspect" />
                    <p>{question}</p>
                  </li>
                ))}
              </ol>
              <aside className="bfux-standard__levels">
                <span>Candidate levels</span>
                {record.conformance.candidateLevels.map((level, index) => (
                  <div key={level}>
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <strong>{level}</strong>
                  </div>
                ))}
                <p><BfuxIcon name="warning" />{record.conformance.candidateLevelsStatus}</p>
              </aside>
            </div>
          </section>

          <section className="bfux-standard__sandbox" id="sandbox" aria-labelledby="bfux-sandbox-title">
            <header>
              <span className="bfux-standard__eyebrow">Standard / demonstration / lab</span>
              <h2 id="bfux-sandbox-title">{record.sandbox.title}</h2>
              <p>{record.sandbox.architecture}</p>
            </header>
            <div>
              <article>
                <BfuxIcon name="invariant" />
                <span>Standard</span>
                <strong>{record.sandbox.standard}</strong>
              </article>
              <article>
                <BfuxIcon name="witness" />
                <span>Demonstration</span>
                <strong>{record.sandbox.demo}</strong>
              </article>
              <article>
                <BfuxIcon name="stress" />
                <span>Experimental lab</span>
                <strong>{record.sandbox.lab}</strong>
              </article>
            </div>
            <blockquote>{record.sandbox.promotionRule}</blockquote>
          </section>

          <section className="bfux-standard__not-this" aria-labelledby="bfux-not-this-title">
            <header>
              <span className="bfux-standard__eyebrow">Claim boundary</span>
              <h2 id="bfux-not-this-title">What Boundary First UX is not.</h2>
            </header>
            <div>
              {record.notThis.map((item) => <span key={item}><BfuxIcon name="warning" />{item}</span>)}
            </div>
          </section>

          <footer className="bfux-standard__closing">
            <BfuxIcon name="boundary" />
            <div>
              <span>{record.closing.eyebrow}</span>
              <h2>{record.closing.title}</h2>
              <p>{record.closing.body}</p>
              <strong>{record.closing.finalLine}</strong>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
