import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import chessContent from "@/content/product-landing-pages/boundary-first-chess.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type ChessPractitionerRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const lensGlyphs: BfuxIconName[] = [
  "admissibility",
  "boundary",
  "traverse",
  "pressure",
  "projection",
  "repair",
];

const passGlyphs: BfuxIconName[] = [
  "boundary",
  "pressure",
  "transition",
  "invariant",
  "repair",
];

export function ChessPractitionerRecordDetail({ owner, entry }: ChessPractitionerRecordDetailProps) {
  const record = chessContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface chess-practitioner-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="chess-practitioner-title"
    >
      <article className="detail-workbench chess-practitioner">
        <header className="chess-practitioner__masthead">
          <div className="chess-practitioner__identity">
            <BfuxIcon name="state" className="chess-practitioner__mark" />
            <div>
              <span>{record.hero.eyebrow}</span>
              <h1 id="chess-practitioner-title">{record.hero.headline}</h1>
            </div>
          </div>
          <div className="chess-practitioner__tools">
            <span>{record.status}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.support}</p>
          <div className="chess-practitioner__principle">
            <BfuxIcon name="transition" />
            <div>
              <span>Decision rule</span>
              <strong>{record.definition.title}</strong>
              <p>{record.definition.rule}</p>
            </div>
          </div>
        </header>

        <section className="chess-practitioner__position" aria-labelledby="chess-position-title">
          <div className="chess-practitioner__section-heading">
            <span>Position state</span>
            <h2 id="chess-position-title">{record.positionLens.title}</h2>
            <p>{record.definition.body}</p>
          </div>
          <div className="chess-practitioner__position-board">
            <div className="chess-practitioner__position-core">
              <span>Current state</span>
              <BfuxIcon name="state" />
              <strong>Reachable futures under adversarial constraint</strong>
              <small>Do not score a move independently of the state it creates.</small>
            </div>
            <div className="chess-practitioner__lens-bank">
              {record.positionLens.dimensions.map((dimension, index) => (
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

        <section className="chess-practitioner__method" id={record.method.id} aria-labelledby="chess-method-title">
          <div className="chess-practitioner__section-heading">
            <span>Commitment rail</span>
            <h2 id="chess-method-title">{record.method.title}</h2>
            <p>A candidate move earns calculation time by surviving progressively stronger boundary tests.</p>
          </div>
          <ol className="chess-practitioner__pass-rail">
            {record.method.passes.map((pass, index) => (
              <li key={pass.name}>
                <div className="chess-practitioner__pass-index">
                  <BfuxIcon name={passGlyphs[index] ?? "inspect"} />
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

        <section className="chess-practitioner__example" id={record.workedExample.id} aria-labelledby="chess-example-title">
          <div className="chess-practitioner__section-heading">
            <span>Worked decision trace</span>
            <h2 id="chess-example-title">{record.workedExample.title}</h2>
            <p>{record.workedExample.setup}</p>
          </div>
          <div className="chess-practitioner__candidate-trace" aria-label="Candidate move consequence trace">
            <article className="chess-practitioner__candidate chess-practitioner__candidate--naive">
              <span>Candidate read</span>
              <BfuxIcon name="promotion" />
              <strong>Material gain</strong>
              <p>{record.workedExample.naiveRead}</p>
            </article>
            <BfuxIcon name="forward" className="chess-practitioner__trace-arrow" />
            <article className="chess-practitioner__candidate chess-practitioner__candidate--boundary">
              <span>Boundary moved</span>
              <BfuxIcon name="responsibility" />
              <strong>Defender leaves its post</strong>
              <p>{record.workedExample.boundaryRead[0]}</p>
            </article>
            <BfuxIcon name="forward" className="chess-practitioner__trace-arrow" />
            <article className="chess-practitioner__candidate chess-practitioner__candidate--forcing">
              <span>Best reply</span>
              <BfuxIcon name="pressure" />
              <strong>Forcing continuation</strong>
              <p>{record.workedExample.boundaryRead[1]}</p>
            </article>
            <BfuxIcon name="forward" className="chess-practitioner__trace-arrow" />
            <article className="chess-practitioner__candidate chess-practitioner__candidate--closure">
              <span>Closure test</span>
              <BfuxIcon name="closure" />
              <strong>Can the king-safety state survive?</strong>
              <p>{record.workedExample.boundaryRead[3]}</p>
            </article>
          </div>
          <div className="chess-practitioner__example-detail">
            <article>
              <span>Consequence tree</span>
              <ul>
                {record.workedExample.boundaryRead.slice(2).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article>
              <span>Method lesson</span>
              <p>{record.workedExample.lesson}</p>
              <small>{record.workedExample.scopeNote}</small>
            </article>
          </div>
        </section>

        <section className="chess-practitioner__validation" aria-labelledby="chess-validation-title">
          <div className="chess-practitioner__section-heading">
            <span>Validation board</span>
            <h2 id="chess-validation-title">{record.validation.title}</h2>
            <p>{record.validation.claimRule}</p>
          </div>
          <div className="chess-practitioner__validation-grid">
            {record.validation.targets.map((target, index) => (
              <article key={target}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <BfuxIcon name={index === record.validation.targets.length - 1 ? "witness" : "inspect"} />
                <p>{target}</p>
              </article>
            ))}
          </div>
          <div className="chess-practitioner__truth-line">
            <BfuxIcon name="witness" />
            <div>
              <span>External truth condition</span>
              <strong>Agreement with established chess analysis on the actual position.</strong>
              <p>Boundary First vocabulary does not outrank board facts, calculation, tablebases, established motifs, or engine analysis.</p>
            </div>
          </div>
        </section>

        <section className="chess-practitioner__standing" aria-labelledby="chess-standing-title">
          <div className="chess-practitioner__section-heading">
            <span>Current standing</span>
            <h2 id="chess-standing-title">{record.claimBoundary.title}</h2>
          </div>
          <div className="chess-practitioner__standing-grid">
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
          <aside className="chess-practitioner__proof">
            <div>
              <span>Built</span>
              <ul>{record.proof.built.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <p>{record.proof.claimBoundary}</p>
          </aside>
        </section>

        <footer className="chess-practitioner__footer">
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
