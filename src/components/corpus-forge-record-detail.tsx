import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import corpusForgeContent from "@/content/product-landing-pages/corpus-forge.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type CorpusForgeRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const stageGlyphs: BfuxIconName[] = [
  "trace",
  "claim",
  "relation",
  "witness",
  "promotion",
  "repair",
];

const objectGlyphs: Record<string, BfuxIconName> = {
  Source: "trace",
  Claim: "claim",
  Evidence: "evidence",
  Contradiction: "defect",
  Decision: "witness",
  Supersession: "repair",
};

function titleCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function CorpusForgeRecordDetail({ owner, entry }: CorpusForgeRecordDetailProps) {
  const record = corpusForgeContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface detail-surface--record corpus-forge-detail"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="record-detail-title"
    >
      <article className="detail-workbench record-detail corpus-forge-workbench">
        <header className="record-detail__masthead corpus-forge__masthead">
          <div className="record-detail__identity">
            <BfuxIcon name="contexture" className="record-detail__identity-glyph" />
            <div>
              <span className="record-detail__kicker">Retained record · {record.hero.eyebrow}</span>
              <h1 id="record-detail-title">{record.title}</h1>
            </div>
          </div>

          <div className="record-detail__masthead-tools">
            <span className="record-detail__status">{titleCase(entry.status)}</span>
            <Link className="record-detail__return" href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>

          <p className="record-detail__lede">{record.hero.support}</p>
          <div className="record-detail__boundary-line">
            <span>Same object</span>
            <i aria-hidden="true" />
            <span>Research-operations workbench</span>
          </div>
        </header>

        <div className="record-detail__scroll corpus-forge__scroll">
          <nav className="corpus-forge__instrument-nav" aria-label="Corpus Forge workbench sections">
            <a href="#corpus-forge-lifecycle">Lifecycle</a>
            <a href="#corpus-forge-objects">Objects</a>
            <a href="#worked-example">Contradiction trace</a>
            <a href="#corpus-forge-promotion">Promotion</a>
            <a href="#corpus-forge-validation">Validation</a>
            <a href="#corpus-forge-boundary">Claim boundary</a>
          </nav>

          <section className="corpus-forge__overview" aria-labelledby="corpus-forge-definition">
            <div className="corpus-forge__definition">
              <span className="record-detail__micro-label">Operating definition</span>
              <h2 id="corpus-forge-definition">{record.definition.title}</h2>
              <p>{record.definition.body}</p>
              <blockquote>{record.definition.rule}</blockquote>
            </div>

            <aside className="corpus-forge__control-panel" aria-label="Corpus Forge control plane">
              <header>
                <BfuxIcon name="contexture" />
                <div>
                  <span>Control plane</span>
                  <strong>Governed memory cycle</strong>
                </div>
              </header>
              <dl>
                <div>
                  <dt>Input</dt>
                  <dd>Sources with provenance boundaries</dd>
                </div>
                <div>
                  <dt>Transform</dt>
                  <dd>Typed extraction, relation, review, and promotion</dd>
                </div>
                <div>
                  <dt>Output</dt>
                  <dd>Reconstructable claims, history, and repair obligations</dd>
                </div>
              </dl>
              <div className="corpus-forge__signals" aria-label="Operating constraints">
                <span><BfuxIcon name="trace" /> Preserve source</span>
                <span><BfuxIcon name="defect" /> Keep disagreement visible</span>
                <span><BfuxIcon name="repair" /> Repair downstream state</span>
              </div>
            </aside>
          </section>

          <section className="corpus-forge__bay" id="corpus-forge-lifecycle" aria-labelledby="corpus-forge-lifecycle-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Lifecycle backplane</span>
                <h2 id="corpus-forge-lifecycle-title">{record.lifecycle.title}</h2>
              </div>
              <p>Each stage changes what may lawfully happen next while preserving the path back to the source.</p>
            </header>

            <ol className="corpus-forge__pipeline" aria-label="Corpus Forge six-stage lifecycle">
              {record.lifecycle.stages.map((stage, index) => (
                <li key={stage.name} data-stage={index + 1}>
                  <div className="corpus-forge__pipeline-terminal">
                    <BfuxIcon name={stageGlyphs[index] ?? "transition"} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="corpus-forge__pipeline-copy">
                    <strong>{stage.name.replace(/^\d+\.\s*/, "")}</strong>
                    <p>{stage.question}</p>
                    <small>Artifact · {stage.artifact}</small>
                  </div>
                  {index < record.lifecycle.stages.length - 1 ? (
                    <span className="corpus-forge__pipeline-link" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="corpus-forge__bay" id="corpus-forge-objects" aria-labelledby="corpus-forge-objects-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Typed object bank</span>
                <h2 id="corpus-forge-objects-title">{record.objects.title}</h2>
              </div>
              <p>Source, claim, evidence, contradiction, decision, and supersession stay distinguishable so one representation cannot silently impersonate another.</p>
            </header>

            <div className="corpus-forge__object-bank">
              {record.objects.types.map((object) => (
                <article key={object.name} data-object-type={object.name.toLowerCase()}>
                  <div className="corpus-forge__object-terminal">
                    <BfuxIcon name={objectGlyphs[object.name] ?? "object"} />
                  </div>
                  <div>
                    <span>Typed object</span>
                    <h3>{object.name}</h3>
                    <p>{object.purpose}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="corpus-forge__relation-bus" aria-label="Example typed relations">
              <span><BfuxIcon name="relation" /> supports</span>
              <span><BfuxIcon name="defect" /> contradicts</span>
              <span><BfuxIcon name="chain" /> depends on</span>
              <span><BfuxIcon name="reframe" /> refines</span>
              <span><BfuxIcon name="trace" /> duplicates</span>
              <span><BfuxIcon name="repair" /> supersedes</span>
            </div>
          </section>

          <section className="corpus-forge__bay corpus-forge__bay--trace" id={record.workedExample.id} aria-labelledby="corpus-forge-example-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Contradiction trace</span>
                <h2 id="corpus-forge-example-title">{record.workedExample.title}</h2>
              </div>
              <p>{record.workedExample.setup}</p>
            </header>

            <ol className="corpus-forge__example-trace">
              {record.workedExample.trace.map((step, index) => (
                <li key={step.stage} data-trace-step={index + 1}>
                  <div className="corpus-forge__trace-marker">
                    <BfuxIcon name={stageGlyphs[index] ?? "transition"} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <strong>{step.stage}</strong>
                    <p>{step.state}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="corpus-forge__trace-outcome">
              <BfuxIcon name="closure" />
              <div>
                <span>Operational lesson</span>
                <p>{record.workedExample.lesson}</p>
                <small>{record.workedExample.scopeNote}</small>
              </div>
            </div>
          </section>

          <section className="corpus-forge__bay" id="corpus-forge-promotion" aria-labelledby="corpus-forge-promotion-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Promotion grammar</span>
                <h2 id="corpus-forge-promotion-title">{record.promotionGrammar.title}</h2>
              </div>
              <p>Higher maturity is earned by an attributable transition through explicit gates; visual prominence alone does not promote a claim.</p>
            </header>

            <div className="corpus-forge__promotion-grid">
              <ol className="corpus-forge__maturity-ladder" aria-label="Claim maturity states">
                {record.promotionGrammar.states.map((state, index) => (
                  <li key={state} data-maturity-state={index + 1}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <BfuxIcon name={index === record.promotionGrammar.states.length - 1 ? "repair" : index >= 3 ? "promotion" : "state"} />
                    <strong>{state}</strong>
                  </li>
                ))}
              </ol>

              <div className="corpus-forge__gate-bank">
                <header>
                  <BfuxIcon name="gate" />
                  <div>
                    <span>Promotion gates</span>
                    <strong>Required before stronger standing</strong>
                  </div>
                </header>
                <ul>
                  {record.promotionGrammar.gates.map((gate) => (
                    <li key={gate}><BfuxIcon name="admissibility" />{gate}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="corpus-forge__bay" id="corpus-forge-validation" aria-labelledby="corpus-forge-validation-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Validation surface</span>
                <h2 id="corpus-forge-validation-title">{record.validation.title}</h2>
              </div>
              <p>The program should be judged by reconstructability, contradiction handling, maturity integrity, replacement history, repair propagation, and review cost.</p>
            </header>

            <div className="corpus-forge__validation-grid">
              {record.validation.targets.map((target, index) => (
                <article key={target}>
                  <span>V{String(index + 1).padStart(2, "0")}</span>
                  <BfuxIcon name={index === record.validation.targets.length - 1 ? "pressure" : "stress"} />
                  <p>{target}</p>
                </article>
              ))}
            </div>

            <aside className="corpus-forge__claim-rule">
              <BfuxIcon name="warning" />
              <div>
                <span>Current evidence ceiling</span>
                <p>{record.validation.claimRule}</p>
              </div>
            </aside>
          </section>

          <section className="corpus-forge__bay" aria-labelledby="corpus-forge-relationship-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>System boundary</span>
                <h2 id="corpus-forge-relationship-title">{record.relationship.title}</h2>
              </div>
              <p>{record.relationship.boundary}</p>
            </header>

            <div className="corpus-forge__relationship-grid">
              <article>
                <BfuxIcon name="contexture" />
                <span>Method / program</span>
                <strong>Corpus Forge</strong>
                <p>The public research-operations method and software-development program represented here.</p>
              </article>
              <article>
                <BfuxIcon name="object" />
                <span>Software expression</span>
                <strong>Corpus Forge Workbench</strong>
                <p>{record.relationship.workbench}</p>
              </article>
              <article>
                <BfuxIcon name="claim" />
                <span>Focused surface</span>
                <strong>Claim &amp; Evidence Ledger</strong>
                <p>{record.relationship.ledger}</p>
              </article>
            </div>
          </section>

          <section className="corpus-forge__bay corpus-forge__bay--boundary" id="corpus-forge-boundary" aria-labelledby="corpus-forge-boundary-title">
            <header className="corpus-forge__bay-heading">
              <div>
                <span>Claim firewall</span>
                <h2 id="corpus-forge-boundary-title">{record.claimBoundary.title}</h2>
              </div>
              <p>Development standing and validation targets remain separate from claims of deployed capability or measured superiority.</p>
            </header>

            <div className="corpus-forge__boundary-grid">
              <article data-claim-side="supported">
                <header><BfuxIcon name="evidence" /><span>Safe public standing</span></header>
                <ul>{record.claimBoundary.safe.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article data-claim-side="open">
                <header><BfuxIcon name="warning" /><span>Not established</span></header>
                <ul>{record.claimBoundary.notEstablished.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
          </section>

          <footer className="record-detail__closing corpus-forge__closing">
            <BfuxIcon name="repair" />
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
