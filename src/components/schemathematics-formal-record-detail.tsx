import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import schemathematicsContent from "@/content/product-landing-pages/schemathematics.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type SchemathematicsFormalRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const profileGlyphs: BfuxIconName[] = [
  "object",
  "admissibility",
  "transition",
  "invariant",
  "closure",
  "boundary",
  "trace",
  "repair",
];

const programLanes: Array<{
  label: string;
  value: string;
  icon: BfuxIconName;
}> = [
  { label: "Representation", value: schemathematicsContent.program.representation, icon: "projection" },
  { label: "Comparison", value: schemathematicsContent.program.comparison, icon: "relation" },
  { label: "Composition", value: schemathematicsContent.program.composition, icon: "chain" },
  { label: "Transport", value: schemathematicsContent.program.transport, icon: "transition" },
  { label: "Computation", value: schemathematicsContent.program.computation, icon: "process" },
  { label: "Pedagogy", value: schemathematicsContent.program.pedagogy, icon: "trace" },
];

export function SchemathematicsFormalRecordDetail({ owner, entry }: SchemathematicsFormalRecordDetailProps) {
  const record = schemathematicsContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface schemathematics-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="schemathematics-title"
    >
      <article className="detail-workbench schemathematics-program">
        <header className="schemathematics-program__masthead">
          <div className="schemathematics-program__identity">
            <div className="schemathematics-program__mark" aria-hidden="true">
              <BfuxIcon name="object" />
              <BfuxIcon name="relation" />
              <BfuxIcon name="invariant" />
            </div>
            <div>
              <span>{record.hero.eyebrow}</span>
              <h1 id="schemathematics-title">{record.hero.headline}</h1>
            </div>
          </div>
          <div className="schemathematics-program__tools">
            <span>{record.status}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.support}</p>
          <div className="schemathematics-program__standing-rail" aria-label="Research standing">
            <span><BfuxIcon name="claim" /> Research framing</span>
            <span><BfuxIcon name="invariant" /> Established mathematics imported where sufficient</span>
            <span><BfuxIcon name="witness" /> Stronger performance claims require benchmark evidence</span>
          </div>
        </header>

        <section className="schemathematics-program__definition" aria-labelledby="schemathematics-definition-title">
          <div className="schemathematics-program__section-heading">
            <span>Definition boundary</span>
            <h2 id="schemathematics-definition-title">{record.definition.title}</h2>
            <p>{record.definition.body}</p>
          </div>
          <aside>
            <BfuxIcon name="admissibility" />
            <span>Discipline</span>
            <p>{record.definition.discipline}</p>
          </aside>
        </section>

        <section className="schemathematics-program__profile" aria-labelledby="schemathematics-profile-title">
          <div className="schemathematics-program__section-heading">
            <span>Operative profile</span>
            <h2 id="schemathematics-profile-title">{record.operativeProfile.title}</h2>
            <p>A formal object is represented by the conditions and operations that make its behavior reconstructable.</p>
          </div>
          <div className="schemathematics-program__profile-grid">
            {record.operativeProfile.fields.map((field, index) => (
              <article key={field.name}>
                <BfuxIcon name={profileGlyphs[index] ?? "object"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{field.name}</strong>
                <p>{field.question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="schemathematics-program__questions" aria-labelledby="schemathematics-questions-title">
          <div className="schemathematics-program__section-heading">
            <span>Inspection grammar</span>
            <h2 id="schemathematics-questions-title">What must be recoverable from the representation?</h2>
          </div>
          <ol>
            {record.coreQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <BfuxIcon name={index % 2 === 0 ? "inspect" : "trace"} />
                <p>{question}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="schemathematics-program__lanes" aria-labelledby="schemathematics-lanes-title">
          <div className="schemathematics-program__section-heading">
            <span>Research program</span>
            <h2 id="schemathematics-lanes-title">Six ways the schema is tested as mathematical apparatus.</h2>
            <p>These are program lanes, not claims of novelty or proof.</p>
          </div>
          <div className="schemathematics-program__lane-grid">
            {programLanes.map((lane) => (
              <article key={lane.label}>
                <BfuxIcon name={lane.icon} />
                <strong>{lane.label}</strong>
                <p>{lane.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="schemathematics-program__comparison" aria-labelledby="schemathematics-comparison-title">
          <div className="schemathematics-program__section-heading">
            <span>Established mathematics witness</span>
            <h2 id="schemathematics-comparison-title">{record.workedExample.title}</h2>
            <p>{record.workedExample.purpose}</p>
          </div>

          <div className="schemathematics-program__dependency-trace" aria-label="Monoid to group dependency trace">
            <div>
              <BfuxIcon name="object" />
              <span>Base object</span>
              <strong>Set + binary operation</strong>
            </div>
            <BfuxIcon name="forward" />
            <div>
              <BfuxIcon name="admissibility" />
              <span>Required conditions</span>
              <strong>Closure · associativity · identity</strong>
            </div>
            <BfuxIcon name="forward" />
            <div className="is-monoid">
              <BfuxIcon name="closure" />
              <span>Structure</span>
              <strong>Monoid</strong>
            </div>
            <BfuxIcon name="promotion" />
            <div className="is-boundary">
              <BfuxIcon name="boundary" />
              <span>Added condition</span>
              <strong>Universal invertibility</strong>
            </div>
            <BfuxIcon name="forward" />
            <div className="is-group">
              <BfuxIcon name="invariant" />
              <span>Promoted structure</span>
              <strong>Group</strong>
            </div>
          </div>

          <div className="schemathematics-program__comparison-grid">
            <article className="schemathematics-program__structure-card">
              <header>
                <BfuxIcon name="closure" />
                <div><span>Object A</span><h3>Monoid</h3></div>
              </header>
              <p>{record.workedExample.monoid.entity}</p>
              <div>
                <span>Admissibility</span>
                <ul>{record.workedExample.monoid.admissibility.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <span>Guaranteed operations</span>
                <ul>{record.workedExample.monoid.guaranteedOperations.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="is-negative">
                <span>Not guaranteed</span>
                <ul>{record.workedExample.monoid.notGuaranteed.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>

            <article className="schemathematics-program__promotion-gate">
              <BfuxIcon name="promotion" />
              <span>Boundary distinction</span>
              <p>{record.workedExample.boundaryDistinction}</p>
              <strong>{record.workedExample.group.addedCondition}</strong>
            </article>

            <article className="schemathematics-program__structure-card is-group">
              <header>
                <BfuxIcon name="invariant" />
                <div><span>Object B</span><h3>Group</h3></div>
              </header>
              <p>{record.workedExample.group.entity}</p>
              <div>
                <span>Newly guaranteed</span>
                <ul>{record.workedExample.group.newlyGuaranteed.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="schemathematics-program__schema-lesson">
                <BfuxIcon name="reveal" />
                <span>Schema lesson</span>
                <p>{record.workedExample.schemaLesson}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="schemathematics-program__hypotheses" aria-labelledby="schemathematics-hypotheses-title">
          <div className="schemathematics-program__section-heading">
            <span>Research hypotheses</span>
            <h2 id="schemathematics-hypotheses-title">Claims under test, not promoted results.</h2>
          </div>
          <div className="schemathematics-program__hypothesis-grid">
            {record.researchHypotheses.map((hypothesis, index) => (
              <article key={hypothesis}>
                <div>
                  <BfuxIcon name="claim" />
                  <span>H{index + 1}</span>
                </div>
                <p>{hypothesis}</p>
                <small>Standing · hypothesis</small>
              </article>
            ))}
          </div>
        </section>

        <section className="schemathematics-program__validation" aria-labelledby="schemathematics-validation-title">
          <div className="schemathematics-program__section-heading">
            <span>Validation / proof burden</span>
            <h2 id="schemathematics-validation-title">{record.validation.title}</h2>
          </div>
          <div className="schemathematics-program__validation-grid">
            <ol>
              {record.validation.tests.map((test, index) => (
                <li key={test}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <BfuxIcon name={index === 0 ? "invariant" : index === 5 ? "admissibility" : "witness"} />
                  <p>{test}</p>
                </li>
              ))}
            </ol>
            <aside>
              <div>
                <BfuxIcon name="relation" />
                <span>Comparison shape</span>
                <p>{record.validation.comparisonShape}</p>
              </div>
              <div>
                <BfuxIcon name="warning" />
                <span>Evidence ceiling</span>
                <p>{record.validation.claimRule}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="schemathematics-program__firewall" aria-labelledby="schemathematics-firewall-title">
          <div className="schemathematics-program__section-heading">
            <span>Claim boundary</span>
            <h2 id="schemathematics-firewall-title">{record.claimBoundary.title}</h2>
          </div>
          <div className="schemathematics-program__firewall-grid">
            <article>
              <BfuxIcon name="admissibility" />
              <span>Safe public standing</span>
              <ul>{record.claimBoundary.safe.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <BfuxIcon name="warning" />
              <span>Not yet established</span>
              <ul>{record.claimBoundary.notYetEstablished.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <footer className="schemathematics-program__footer">
          <BfuxIcon name="trace" />
          <div>
            <span>{record.closing.title}</span>
            <strong>{record.closing.finalLine}</strong>
          </div>
        </footer>
      </article>
    </main>
  );
}
