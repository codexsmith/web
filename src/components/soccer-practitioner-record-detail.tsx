import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import soccerContent from "@/content/product-landing-pages/boundary-first-soccer.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type SoccerPractitionerRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const lensGlyphs: BfuxIconName[] = [
  "traverse",
  "relation",
  "pressure",
  "orient",
  "promotion",
  "repair",
];

const phaseGlyphs: BfuxIconName[] = [
  "boundary",
  "relation",
  "pressure",
  "promotion",
  "repair",
];

export function SoccerPractitionerRecordDetail({ owner, entry }: SoccerPractitionerRecordDetailProps) {
  const record = soccerContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface soccer-practitioner-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="soccer-practitioner-title"
    >
      <article className="detail-workbench soccer-practitioner">
        <header className="soccer-practitioner__masthead">
          <div className="soccer-practitioner__identity">
            <BfuxIcon name="contexture" className="soccer-practitioner__mark" />
            <div>
              <span>{record.hero.eyebrow}</span>
              <h1 id="soccer-practitioner-title">{record.hero.headline}</h1>
            </div>
          </div>
          <div className="soccer-practitioner__tools">
            <span>{record.status}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.support}</p>
          <div className="soccer-practitioner__principle">
            <BfuxIcon name="projection" />
            <div>
              <span>Field rule</span>
              <strong>{record.definition.title}</strong>
              <p>{record.definition.rule}</p>
            </div>
          </div>
        </header>

        <section className="soccer-practitioner__field" aria-labelledby="soccer-field-title">
          <div className="soccer-practitioner__section-heading">
            <span>Current team state</span>
            <h2 id="soccer-field-title">{record.fieldLens.title}</h2>
            <p>{record.definition.body}</p>
          </div>
          <div className="soccer-practitioner__field-map">
            <div className="soccer-practitioner__pitch" aria-label="Reachability field diagram">
              <div className="soccer-practitioner__halfway" />
              <div className="soccer-practitioner__center-circle" />
              <div className="soccer-practitioner__zone soccer-practitioner__zone--build">
                <span>Build</span>
              </div>
              <div className="soccer-practitioner__zone soccer-practitioner__zone--pressure">
                <span>Pressure boundary</span>
              </div>
              <div className="soccer-practitioner__zone soccer-practitioner__zone--promotion">
                <span>Promotion space</span>
              </div>
              <div className="soccer-practitioner__ball" aria-hidden="true" />
              <div className="soccer-practitioner__route soccer-practitioner__route--forward" aria-hidden="true" />
              <div className="soccer-practitioner__route soccer-practitioner__route--reset" aria-hidden="true" />
              <div className="soccer-practitioner__field-caption">
                <BfuxIcon name="transition" />
                <strong>Actionable space is relational.</strong>
                <small>Access depends on timing, support, orientation, pressure, and the next state the team can construct.</small>
              </div>
            </div>
            <div className="soccer-practitioner__lens-bank">
              {record.fieldLens.dimensions.map((dimension, index) => (
                <article key={dimension.name}>
                  <BfuxIcon name={lensGlyphs[index] ?? "inspect"} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{dimension.name}</strong>
                  <p>{dimension.question}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="soccer-practitioner__method" id={record.method.id} aria-labelledby="soccer-method-title">
          <div className="soccer-practitioner__section-heading">
            <span>Phase-reading rail</span>
            <h2 id="soccer-method-title">{record.method.title}</h2>
            <p>Read possession as a controlled change in reachable team states, not as ball location alone.</p>
          </div>
          <ol className="soccer-practitioner__phase-rail">
            {record.method.passes.map((pass, index) => (
              <li key={pass.name}>
                <div className="soccer-practitioner__phase-index">
                  <BfuxIcon name={phaseGlyphs[index] ?? "inspect"} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <strong>{pass.name.replace(/^\d+\.\s*/, "")}</strong>
                  <p>{pass.question}</p>
                  <small>Output · {pass.output}</small>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="soccer-practitioner__example" id={record.workedExample.id} aria-labelledby="soccer-example-title">
          <div className="soccer-practitioner__section-heading">
            <span>Worked possession trace</span>
            <h2 id="soccer-example-title">{record.workedExample.title}</h2>
            <p>{record.workedExample.setup}</p>
          </div>
          <div className="soccer-practitioner__possession-trace" aria-label="Backward pass repair and promotion trace">
            <article className="soccer-practitioner__trace-node soccer-practitioner__trace-node--pressure">
              <span>Pressure authored</span>
              <BfuxIcon name="pressure" />
              <strong>Touchline + inside-out press</strong>
              <p>{record.workedExample.boundaryTrace[0]}</p>
            </article>
            <BfuxIcon name="forward" className="soccer-practitioner__trace-arrow" />
            <article className="soccer-practitioner__trace-node soccer-practitioner__trace-node--trap">
              <span>Naive progression</span>
              <BfuxIcon name="warning" />
              <strong>Forward pass enters the authored future</strong>
              <p>{record.workedExample.boundaryTrace[1]}</p>
            </article>
            <BfuxIcon name="forward" className="soccer-practitioner__trace-arrow" />
            <article className="soccer-practitioner__trace-node soccer-practitioner__trace-node--repair">
              <span>Repair action</span>
              <BfuxIcon name="repair" />
              <strong>Reset through central support</strong>
              <p>{record.workedExample.boundaryTrace[3]}</p>
            </article>
            <BfuxIcon name="forward" className="soccer-practitioner__trace-arrow" />
            <article className="soccer-practitioner__trace-node soccer-practitioner__trace-node--promotion">
              <span>Promotion test</span>
              <BfuxIcon name="promotion" />
              <strong>Did the reset enlarge the next action set?</strong>
              <p>{record.workedExample.boundaryTrace[4]}</p>
            </article>
          </div>
          <div className="soccer-practitioner__example-detail">
            <article>
              <span>Conventional-looking read</span>
              <p>{record.workedExample.naiveRead}</p>
              <ul>{record.workedExample.boundaryTrace.slice(2, 3).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <span>Promotion condition</span>
              <p>{record.workedExample.promotionTest}</p>
              <small>{record.workedExample.scopeNote}</small>
            </article>
            <article>
              <span>Method lesson</span>
              <p>{record.workedExample.lesson}</p>
            </article>
          </div>
        </section>

        <section className="soccer-practitioner__tags" aria-labelledby="soccer-tags-title">
          <div className="soccer-practitioner__section-heading">
            <span>Candidate observation layer</span>
            <h2 id="soccer-tags-title">{record.taggingGrammar.title}</h2>
            <p>{record.taggingGrammar.rule}</p>
          </div>
          <div className="soccer-practitioner__tag-bank">
            {record.taggingGrammar.tags.map((tag) => (
              <span key={tag}><BfuxIcon name="claim" />{tag}</span>
            ))}
          </div>
        </section>

        <section className="soccer-practitioner__validation" aria-labelledby="soccer-validation-title">
          <div className="soccer-practitioner__section-heading">
            <span>Match-evidence boundary</span>
            <h2 id="soccer-validation-title">{record.validation.title}</h2>
            <p>{record.validation.claimRule}</p>
          </div>
          <div className="soccer-practitioner__validation-grid">
            {record.validation.targets.map((target, index) => (
              <article key={target}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <BfuxIcon name={index >= 2 ? "witness" : "inspect"} />
                <p>{target}</p>
              </article>
            ))}
          </div>
          <div className="soccer-practitioner__truth-line">
            <BfuxIcon name="witness" />
            <div>
              <span>External evidence condition</span>
              <strong>Video, event data, tracking data, coaching interpretation, and established tactical frameworks remain authoritative witnesses.</strong>
              <p>Illustrative fit is not validation; the proposed tags must survive observation and comparison.</p>
            </div>
          </div>
        </section>

        <section className="soccer-practitioner__standing" aria-labelledby="soccer-standing-title">
          <div className="soccer-practitioner__section-heading">
            <span>Current standing</span>
            <h2 id="soccer-standing-title">{record.claimBoundary.title}</h2>
          </div>
          <div className="soccer-practitioner__standing-grid">
            <article>
              <BfuxIcon name="admissibility" />
              <span>Safe to say</span>
              <ul>{record.claimBoundary.safe.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <BfuxIcon name="warning" />
              <span>Not established</span>
              <ul>{record.claimBoundary.notEstablished.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <aside className="soccer-practitioner__proof">
            <div>
              <span>Built</span>
              <ul>{record.proof.built.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <p>{record.proof.claimBoundary}</p>
          </aside>
        </section>

        <footer className="soccer-practitioner__footer">
          <BfuxIcon name="trace" />
          <div>
            <span>{record.closing.eyebrow}</span>
            <strong>{record.closing.title}</strong>
            <p>{record.closing.finalLine}</p>
          </div>
        </footer>
      </article>
    </main>
  );
}
