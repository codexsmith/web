import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import agencyAuditContent from "@/content/product-landing-pages/agency-representation-audit.json";
import softwareBeforeCodeContent from "@/content/product-landing-pages/software-before-code.json";
import {
  getProductLandingDescription,
  getProductLandingPresentationContent,
  getProductLandingTitle,
  type ProductLandingContent,
} from "@/lib/product-landing-content";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type RecordDetailSurfaceProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
  content: ProductLandingContent;
};

type DetailSectionProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "attention" | "quiet";
};

const hiddenGenericKeys = new Set([
  "id",
  "slug",
  "title",
  "status",
  "statusLabel",
  "visibility",
  "pageType",
  "version",
  "renderPolicy",
  "notes",
  "internal",
  "metadata",
  "sourceKeys",
  "relationshipStatus",
  "pageIntent",
  "cta",
  "hero",
]);

function titleCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function statusLabel(value: string) {
  return titleCase(value);
}

function DetailSection({ eyebrow, title, children, id, variant = "default" }: DetailSectionProps) {
  return (
    <section className="record-detail__section" data-variant={variant} id={id}>
      <header className="record-detail__section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </header>
      <div className="record-detail__section-body">{children}</div>
    </section>
  );
}

function RecordShell({
  owner,
  entry,
  title,
  eyebrow,
  description,
  icon,
  children,
}: {
  owner: ContentNode;
  entry: ProductLandingEntry;
  title: string;
  eyebrow: string;
  description: string;
  icon: BfuxIconName;
  children: React.ReactNode;
}) {
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface detail-surface--record"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="record-detail-title"
    >
      <article className="detail-workbench record-detail">
        <header className="record-detail__masthead">
          <div className="record-detail__identity">
            <BfuxIcon name={icon} className="record-detail__identity-glyph" />
            <div>
              <span className="record-detail__kicker">Retained record · {eyebrow}</span>
              <h1 id="record-detail-title">{title}</h1>
            </div>
          </div>
          <div className="record-detail__masthead-tools">
            <span className="record-detail__status">{statusLabel(entry.status)}</span>
            <Link className="record-detail__return" href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p className="record-detail__lede">{description}</p>
          <div className="record-detail__boundary-line">
            <span>Same object</span>
            <i aria-hidden="true" />
            <span>Deeper retained representation</span>
          </div>
        </header>

        <div className="record-detail__scroll">{children}</div>
      </article>
    </main>
  );
}

function AgencyAuditRecord({ owner, entry }: { owner: ContentNode; entry: ProductLandingEntry }) {
  const record = agencyAuditContent;
  const passGlyphs: BfuxIconName[] = ["actor", "projection", "consequence", "gate", "repair"];

  return (
    <RecordShell
      owner={owner}
      entry={entry}
      title={record.hero.headline}
      eyebrow={record.hero.eyebrow}
      description={record.hero.support}
      icon="responsibility"
    >
      <section className="record-detail__opening record-detail__opening--audit">
        <div className="record-detail__opening-copy">
          <span className="record-detail__micro-label">Operating proposition</span>
          <h2>{record.executiveBrief.title}</h2>
          <p>{record.executiveBrief.summary}</p>
          <blockquote>{record.executiveBrief.decisionUse}</blockquote>
        </div>
        <ol className="record-detail__trace" aria-label="Agency Audit five-pass trace">
          {record.method.passes.map((pass, index) => (
            <li key={pass.name}>
              <BfuxIcon name={passGlyphs[index] ?? "transition"} />
              <span>Pass {String(index + 1).padStart(2, "0")}</span>
              <strong>{pass.name.replace(/^\d+\.\s*/, "")}</strong>
              <small>{pass.output}</small>
            </li>
          ))}
        </ol>
      </section>

      <DetailSection eyebrow="Diagnostic frame" title="Six questions locate the operating relationship.">
        <div className="record-detail__question-grid">
          {record.executiveBrief.questions.map((question, index) => (
            <article key={question}>
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Failure field" title={record.problem.title} variant="quiet">
        <p className="record-detail__prose">{record.problem.body}</p>
        <div className="record-detail__defect-list">
          {record.problem.failureModes.map((failure) => (
            <div key={failure}>
              <BfuxIcon name="defect" />
              <p>{failure}</p>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Method" title={record.method.title} id={record.method.id}>
        <div className="record-detail__method-stack">
          {record.method.passes.map((pass, index) => (
            <article key={pass.name}>
              <div className="record-detail__method-index">
                <BfuxIcon name={passGlyphs[index] ?? "transition"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3>{pass.name.replace(/^\d+\.\s*/, "")}</h3>
                <p>{pass.question}</p>
                <small>Output · {pass.output}</small>
              </div>
            </article>
          ))}
        </div>
        <aside className="record-detail__closure">
          <BfuxIcon name="closure" />
          <div>
            <span>Closure test</span>
            <p>{record.method.closureTest}</p>
          </div>
        </aside>
      </DetailSection>

      <DetailSection eyebrow="Pilot boundary" title={record.candidateWork.title}>
        <div className="record-detail__fit-grid">
          <article data-fit="yes">
            <span>Strong fit</span>
            <ul>{record.candidateWork.goodFit.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article data-fit="example">
            <span>Example processes</span>
            <ul>{record.candidateWork.examples.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article data-fit="no">
            <span>Not the right starting shape</span>
            <ul>{record.candidateWork.notYetFit.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </DetailSection>

      <DetailSection eyebrow="Pilot intake" title={record.firstAsk.title}>
        <p className="record-detail__prose">{record.firstAsk.shape}</p>
        <div className="record-detail__handoff-grid">
          <article>
            <span>What you bring</span>
            <ul>{record.firstAsk.whatYouBring.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span>What you receive</span>
            <ul>{record.firstAsk.whatYouReceive.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <p className="record-detail__evidence-rule">
          <BfuxIcon name="witness" />
          {record.firstAsk.evidenceRule}
        </p>
      </DetailSection>

      <DetailSection eyebrow="Claim firewall" title={record.claimBoundary.title} variant="attention">
        <p className="record-detail__prose">{record.claimBoundary.body}</p>
        <div className="record-detail__boundary-grid">
          <div>
            <span>Does not provide</span>
            <ul>{record.claimBoundary.doesNotProvide.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <blockquote>{record.claimBoundary.claimRule}</blockquote>
        </div>
      </DetailSection>

      <footer className="record-detail__closing">
        <BfuxIcon name="responsibility" />
        <div>
          <span>{record.closing.eyebrow}</span>
          <h2>{record.closing.title}</h2>
          <p>{record.closing.finalLine}</p>
        </div>
      </footer>
    </RecordShell>
  );
}

function SoftwareBeforeCodeRecord({ owner, entry }: { owner: ContentNode; entry: ProductLandingEntry }) {
  const record = softwareBeforeCodeContent;
  const questionGlyphs: BfuxIconName[] = [
    "projection",
    "point",
    "boundary",
    "admissibility",
    "invariant",
    "closure",
    "defect",
    "witness",
    "consequence",
  ];

  return (
    <RecordShell
      owner={owner}
      entry={entry}
      title={record.product.primaryLine}
      eyebrow={record.hero.eyebrow}
      description={record.hero.deck}
      icon="object"
    >
      <section className="record-detail__opening record-detail__opening--software">
        <div className="record-detail__opening-copy">
          <span className="record-detail__micro-label">Method profile</span>
          <h2>{record.opening.title}</h2>
          <p>{record.opening.body}</p>
          <blockquote>{record.product.coreProposition}</blockquote>
          <div className="record-detail__tags">
            {record.product.classification.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <ol className="record-detail__trace record-detail__trace--software" aria-label="Software object trace">
          {record.coreObject.chain.map((item, index) => (
            <li key={item}>
              <BfuxIcon name={index === 0 ? "container" : index === record.coreObject.chain.length - 1 ? "witness" : "transition"} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>

      <DetailSection eyebrow="Representation before mechanism" title={record.problem.title} variant="quiet">
        <p className="record-detail__prose">{record.problem.diagnosis}</p>
        <div className="record-detail__downstream-grid">
          {record.problem.examples.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <aside className="record-detail__note">
          <BfuxIcon name="reframe" />
          <div>
            <strong>{record.notBigDesignUpFront.title}</strong>
            <p>{record.notBigDesignUpFront.body}</p>
          </div>
        </aside>
      </DetailSection>

      <DetailSection eyebrow="Boundary questions" title="Nine questions before architecture hardens.">
        <div className="record-detail__question-grid record-detail__question-grid--nine">
          {record.nineQuestions.map((item, index) => (
            <article key={item.name}>
              <BfuxIcon name={questionGlyphs[index] ?? "inspect"} />
              <span>Q{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.question}</p>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Method" title={record.method.title} id={record.method.id}>
        <ol className="record-detail__sequence">
          {record.method.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <aside className="record-detail__closure">
          <BfuxIcon name="witness" />
          <div>
            <span>Delivery skeleton</span>
            <p>{record.deliverySkeleton.title}</p>
            <ul>{record.deliverySkeleton.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </aside>
      </DetailSection>

      <DetailSection eyebrow="Representational mechanics" title={record.controlledForgetting.title} variant="attention">
        <p className="record-detail__prose">{record.controlledForgetting.body}</p>
        <blockquote>{record.controlledForgetting.rule}</blockquote>
        <p className="record-detail__principle-line">{record.controlledForgetting.line}</p>
      </DetailSection>

      <DetailSection eyebrow="Flagship stress test" title={record.flagship.title}>
        <p className="record-detail__prose">{record.flagship.challenge}</p>
        <div className="record-detail__comparison-grid">
          <article>
            <span>Naive representation</span>
            <ul>{record.flagship.naiveRepresentations.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span>Hidden distinctions</span>
            <ul>{record.flagship.hiddenDistinctions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span>Protected invariants</span>
            <ul>{record.flagship.protectedInvariants.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <blockquote>{record.flagship.publicationLine}</blockquote>
      </DetailSection>

      <DetailSection eyebrow="Defect diagnosis" title="Symptoms become useful when they point back to a lost distinction." variant="quiet">
        <div className="record-detail__diagnostic-table" role="table" aria-label="Software Before Code diagnostic map">
          <div role="row" className="record-detail__diagnostic-head">
            <span role="columnheader">Smell</span>
            <span role="columnheader">Likely defect</span>
            <span role="columnheader">Repair</span>
          </div>
          {record.diagnostics.map((item) => (
            <div role="row" key={item.smell}>
              <span role="cell">{item.smell}</span>
              <span role="cell">{item.likelyDefect}</span>
              <span role="cell">{item.repair}</span>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Closure" title={record.closure.title}>
        <div className="record-detail__closure-tests">
          {record.closure.tests.map((item) => (
            <span key={item}><BfuxIcon name="closure" />{item}</span>
          ))}
        </div>
        <div className="record-detail__two-column-notes">
          <article>
            <span>Architecture</span>
            <h3>{record.architecture.title}</h3>
            <p>{record.architecture.body}</p>
          </article>
          <article>
            <span>AI</span>
            <h3>{record.ai.title}</h3>
            <p>{record.ai.body}</p>
          </article>
        </div>
      </DetailSection>

      <DetailSection eyebrow="Validation ladder" title="Promotion depends on consequence, not formalism alone.">
        <ol className="record-detail__validation-ladder">
          {record.validation.ladder.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
          ))}
        </ol>
        <p className="record-detail__evidence-rule">
          <BfuxIcon name="stress" />
          {record.validation.immediateExperiment}
        </p>
        <blockquote>{record.validation.claimRule}</blockquote>
      </DetailSection>

      <DetailSection eyebrow="Claim firewall" title="What this method is not." variant="attention">
        <div className="record-detail__not-grid">
          {record.notThis.map((item) => (
            <span key={item}><BfuxIcon name="warning" />{item}</span>
          ))}
        </div>
      </DetailSection>

      <footer className="record-detail__closing">
        <BfuxIcon name="closure" />
        <div>
          <span>{record.closing.eyebrow}</span>
          <h2>{record.closing.title}</h2>
          <p>{record.closing.finalLine}</p>
        </div>
      </footer>
    </RecordShell>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function GenericValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return <p>{String(value)}</p>;
  }

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string" || typeof item === "number")) {
      return <ul>{value.map((item) => <li key={String(item)}>{String(item)}</li>)}</ul>;
    }
    return (
      <div className="record-detail__generic-cards">
        {value.map((item, index) => (
          <article key={index}>
            <GenericValue value={item} depth={depth + 1} />
          </article>
        ))}
      </div>
    );
  }

  if (isRecord(value)) {
    return (
      <div className="record-detail__generic-fields">
        {Object.entries(value)
          .filter(([key]) => !hiddenGenericKeys.has(key))
          .map(([key, nested]) => (
            <section key={key}>
              <h3>{titleCase(key)}</h3>
              <GenericValue value={nested} depth={depth + 1} />
            </section>
          ))}
      </div>
    );
  }

  return null;
}

function GenericRecord({
  owner,
  entry,
  content,
}: RecordDetailSurfaceProps) {
  const presentation = getProductLandingPresentationContent(content);
  const title = getProductLandingTitle(entry, content);
  const description = getProductLandingDescription(entry, content);

  return (
    <RecordShell
      owner={owner}
      entry={entry}
      title={title}
      eyebrow={entry.pageType}
      description={description}
      icon="trace"
    >
      <DetailSection eyebrow="Structured retained record" title="Public record detail">
        <GenericValue value={presentation} />
      </DetailSection>
    </RecordShell>
  );
}

export function RecordDetailSurface(props: RecordDetailSurfaceProps) {
  if (props.entry.id === "agency-representation-audit") {
    return <AgencyAuditRecord owner={props.owner} entry={props.entry} />;
  }
  if (props.entry.id === "software-before-code") {
    return <SoftwareBeforeCodeRecord owner={props.owner} entry={props.entry} />;
  }
  return <GenericRecord {...props} />;
}
