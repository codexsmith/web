import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import lawContent from "@/content/product-landing-pages/constitutional-law-and-jurisprudence.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type LawResearchRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const processGlyphs: BfuxIconName[] = [
  "responsibility",
  "projection",
  "admissibility",
  "gate",
  "consequence",
  "witness",
  "claim",
  "repair",
  "promotion",
];

const claimGlyphs: Record<string, BfuxIconName> = {
  "constitutional-text": "invariant",
  "current-doctrine": "evidence",
  "doctrinal-analogy": "relation",
  "proposed-jurisprudence": "claim",
  "law-reform": "promotion",
  "empirical-hypothesis": "witness",
  "moral-proposition": "responsibility",
  "open-question": "inspect",
};

export function LawResearchRecordDetail({ owner, entry }: LawResearchRecordDetailProps) {
  const record = lawContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";
  const sourceEntries = Object.entries(record.citations.sourceKeys);

  return (
    <main
      className="world-viewport detail-surface law-research-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="law-research-title"
    >
      <article className="detail-workbench law-research">
        <header className="law-research__masthead">
          <div className="law-research__identity">
            <BfuxIcon name="responsibility" className="law-research__mark" />
            <div>
              <span>{record.program.statusLabel}</span>
              <h1 id="law-research-title">{record.program.primaryLine}</h1>
            </div>
          </div>
          <div className="law-research__tools">
            <span>{record.program.shortName}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.deck}</p>
          <blockquote>{record.hero.pullQuote}</blockquote>
        </header>

        <section className="law-research__notice" aria-labelledby="law-notice-title">
          <BfuxIcon name="warning" />
          <div>
            <span>Practice boundary</span>
            <h2 id="law-notice-title">{record.legalNotice.title}</h2>
            <p>{record.legalNotice.body}</p>
          </div>
          <ul>{record.legalNotice.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        </section>

        <section className="law-research__baseline" aria-labelledby="law-baseline-title">
          <div className="law-research__section-heading">
            <span>Authority baseline</span>
            <h2 id="law-baseline-title">{record.constitutionalBaseline.title}</h2>
            <p>{record.constitutionalBaseline.intro}</p>
            <strong>{record.constitutionalBaseline.rule}</strong>
          </div>
          <div className="law-research__authority-grid">
            {record.constitutionalBaseline.anchors.map((anchor) => (
              <article key={anchor.id} data-standing={anchor.status}>
                <div className="law-research__authority-header">
                  <BfuxIcon name="evidence" />
                  <span>{anchor.status.replaceAll("-", " ")}</span>
                </div>
                <h3>{anchor.title}</h3>
                <p>{anchor.summary}</p>
                <div className="law-research__source-keys" aria-label={`Sources for ${anchor.title}`}>
                  {anchor.sourceKeys.map((key) => <code key={key}>{key}</code>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="law-research__claim-regimes" id={record.claimRegimes.id} aria-labelledby="law-claims-title">
          <div className="law-research__section-heading">
            <span>Claim-status crosswalk</span>
            <h2 id="law-claims-title">{record.claimRegimes.title}</h2>
            <p>{record.claimRegimes.displayRule}</p>
          </div>
          <div className="law-research__claim-grid">
            {record.claimRegimes.types.map((type) => (
              <article key={type.id} data-claim-type={type.id}>
                <BfuxIcon name={claimGlyphs[type.id] ?? "claim"} />
                <strong>{type.label}</strong>
                <code>{type.id}</code>
              </article>
            ))}
          </div>
        </section>

        <section className="law-research__process" aria-labelledby="law-process-title">
          <div className="law-research__section-heading">
            <span>{record.legalProcessModel.status.replaceAll("-", " ")}</span>
            <h2 id="law-process-title">{record.legalProcessModel.title}</h2>
            <p className="law-research__notation">{record.legalProcessModel.compactObject}</p>
            <strong>{record.legalProcessModel.closureRule}</strong>
          </div>
          <ol className="law-research__process-chain">
            {record.legalProcessModel.chain.map((step, index) => (
              <li key={step}>
                <BfuxIcon name={processGlyphs[index] ?? "state"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="law-research__doctrine-map" aria-labelledby="law-doctrine-title">
          <div className="law-research__section-heading">
            <span>Doctrine / analogy / proposal</span>
            <h2 id="law-doctrine-title">Keep the legal standing of each bridge visible.</h2>
          </div>
          <div className="law-research__doctrine-grid">
            <article data-regime="current-doctrine">
              <div><BfuxIcon name="evidence" /><span>Current doctrine + analogy</span></div>
              <h3>{record.dueProcessBridge.title}</h3>
              <ul>{record.dueProcessBridge.mathewsFactors.map((factor) => <li key={factor}>{factor}</li>)}</ul>
              <p>{record.dueProcessBridge.boundaryFirstExtension}</p>
              <div className="law-research__source-keys">{record.dueProcessBridge.sourceKeys.map((key) => <code key={key}>{key}</code>)}</div>
            </article>
            <article data-regime="doctrinal-analogy">
              <div><BfuxIcon name="relation" /><span>Limited analogy</span></div>
              <h3>{record.standingBridge.title}</h3>
              <p>{record.standingBridge.currentDoctrine}</p>
              <dl>
                {Object.entries(record.standingBridge.analogy).map(([term, comparison]) => (
                  <div key={term}><dt>{term}</dt><dd>{comparison}</dd></div>
                ))}
              </dl>
              <strong>{record.standingBridge.criticalBoundary}</strong>
            </article>
            <article data-regime="proposed-jurisprudence">
              <div><BfuxIcon name="claim" /><span>{record.controlledCompression.status.replaceAll("-", " ")}</span></div>
              <h3>{record.controlledCompression.title}</h3>
              <p>{record.controlledCompression.body}</p>
              <blockquote>{record.controlledCompression.candidateDoctrine}</blockquote>
              <strong>{record.controlledCompression.statusOfCandidate}</strong>
            </article>
            <article data-regime="law-reform">
              <div><BfuxIcon name="promotion" /><span>{record.privatePower.proposedConcept.status.replaceAll("-", " ")}</span></div>
              <h3>{record.privatePower.title}</h3>
              <p>{record.privatePower.currentLaw}</p>
              <blockquote>{record.privatePower.proposedConcept.name}: {record.privatePower.proposedConcept.definition}</blockquote>
              <strong>{record.privatePower.warning}</strong>
            </article>
          </div>
        </section>

        <section className="law-research__jurisprudence" aria-labelledby="law-jurisprudence-title">
          <div className="law-research__section-heading">
            <span>{record.boundaryFirstJurisprudence.status.replaceAll("-", " ")}</span>
            <h2 id="law-jurisprudence-title">{record.boundaryFirstJurisprudence.title}</h2>
            <p>{record.boundaryFirstJurisprudence.definition}</p>
          </div>
          <div className="law-research__jurisprudence-grid">
            <div>
              <span>Inspection questions</span>
              <ol>{record.boundaryFirstJurisprudence.questions.map((question) => <li key={question}>{question}</li>)}</ol>
            </div>
            <div>
              <span>Proposed maxims</span>
              <ul>{record.boundaryFirstJurisprudence.maxims.map((maxim) => <li key={maxim}>{maxim}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="law-research__case" id={record.flagshipDemo.id} aria-labelledby="law-case-title">
          <div className="law-research__section-heading">
            <span>{record.flagshipDemo.eyebrow} · {record.flagshipDemo.status}</span>
            <h2 id="law-case-title">{record.flagshipDemo.title}</h2>
            <p>{record.flagshipDemo.subtitle}</p>
            <strong>{record.flagshipDemo.legalBoundary}</strong>
          </div>
          <ol className="law-research__case-sequence">
            {record.flagshipDemo.sequence.map((step, index) => (
              <li key={step} data-critical={step === "Consequence" || step === "Repair" ? "true" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < record.flagshipDemo.sequence.length - 1 ? <BfuxIcon name="forward" /> : <BfuxIcon name="closure" />}
              </li>
            ))}
          </ol>
          <blockquote>{record.flagshipDemo.desiredReaction}</blockquote>
        </section>

        <section className="law-research__repair" aria-labelledby="law-repair-title">
          <div className="law-research__section-heading">
            <span>{record.repair.status.replaceAll("-", " ")}</span>
            <h2 id="law-repair-title">{record.repair.title}</h2>
            <p>{record.repair.important}</p>
          </div>
          <div className="law-research__repair-grid">
            {record.repair.classes.map((repairClass) => (
              <div key={repairClass}><BfuxIcon name="repair" /><span>{repairClass}</span></div>
            ))}
          </div>
        </section>

        <section className="law-research__diagnostic" aria-labelledby="law-diagnostic-title">
          <div className="law-research__section-heading">
            <span>Systems review</span>
            <h2 id="law-diagnostic-title">{record.legalDiagnostic.title}</h2>
          </div>
          <div className="law-research__diagnostic-grid">
            <ol>{record.legalDiagnostic.questions.map((question) => <li key={question}>{question}</li>)}</ol>
            <aside>
              <span>Required outputs</span>
              <ul>{record.legalDiagnostic.output.map((item) => <li key={item}>{item}</li>)}</ul>
            </aside>
          </div>
        </section>

        <section className="law-research__sources" aria-labelledby="law-sources-title">
          <div className="law-research__section-heading">
            <span>Authority register</span>
            <h2 id="law-sources-title">Primary and official legal sources remain reconstructable.</h2>
            <p>{record.citations.strategy}</p>
          </div>
          <div className="law-research__source-register">
            {sourceEntries.map(([key, source]) => (
              <div key={key}><code>{key}</code><span>{source}</span></div>
            ))}
          </div>
        </section>

        <section className="law-research__counsel" aria-labelledby="law-counsel-title">
          <BfuxIcon name="boundary" />
          <div>
            <span>Professional boundary</span>
            <h2 id="law-counsel-title">{record.lawyerCollaboration.title}</h2>
            <p>{record.lawyerCollaboration.premise}</p>
            <strong>{record.lawyerCollaboration.primaryAsk.label}</strong>
            <small>{record.lawyerCollaboration.primaryAsk.description}</small>
          </div>
        </section>

        <section className="law-research__firewall" aria-labelledby="law-firewall-title">
          <div className="law-research__section-heading">
            <span>Claim firewall</span>
            <h2 id="law-firewall-title">{record.claimFirewall.title}</h2>
          </div>
          <ul>{record.claimFirewall.items.map((item) => <li key={item}><BfuxIcon name="warning" /><span>{item}</span></li>)}</ul>
        </section>

        <footer className="law-research__footer">
          <BfuxIcon name="trace" />
          <div>
            <span>{record.closing.eyebrow}</span>
            <strong>{record.closing.title}</strong>
            <p>{record.closing.body}</p>
            <b>{record.closing.finalLine}</b>
          </div>
        </footer>
      </article>
    </main>
  );
}
