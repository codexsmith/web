import Link from "next/link";
import { BfuxIcon, type BfuxIconName } from "@/components/bfux-icons";
import weatherContent from "@/content/product-landing-pages/boundary-first-weather.json";
import type { ContentNode } from "@/lib/content-registry";
import type { ProductLandingEntry } from "@/lib/product-landing-routing";

type WeatherResearchRecordDetailProps = {
  owner: ContentNode;
  entry: ProductLandingEntry;
};

const mappingGlyphs: BfuxIconName[] = [
  "container",
  "boundary",
  "pressure",
  "contexture",
  "closure",
  "defect",
  "witness",
];

const sceneGlyphs: Record<string, BfuxIconName> = {
  Flow: "pressure",
  Boundary: "boundary",
  Flux: "transition",
  Scale: "contexture",
  Forecast: "projection",
  Witness: "witness",
  Defect: "defect",
  Refine: "repair",
  Compare: "evidence",
};

export function WeatherResearchRecordDetail({ owner, entry }: WeatherResearchRecordDetailProps) {
  const record = weatherContent;
  const returnHref = owner.path ? `/${owner.path}` : "/?world=1";

  return (
    <main
      className="world-viewport detail-surface weather-testbed-surface"
      data-detail-kind="record"
      data-record-id={entry.id}
      aria-labelledby="weather-testbed-title"
    >
      <article className="detail-workbench weather-testbed">
        <header className="weather-testbed__masthead">
          <div className="weather-testbed__identity">
            <BfuxIcon name="boundary" className="weather-testbed__mark" />
            <div>
              <span>{record.program.statusLabel}</span>
              <h1 id="weather-testbed-title">{record.program.primaryLine}</h1>
            </div>
          </div>
          <div className="weather-testbed__tools">
            <span>{record.program.shortName}</span>
            <Link href={returnHref}>
              <BfuxIcon name="back" />
              Return to object
            </Link>
          </div>
          <p>{record.hero.deck}</p>
          <div className="weather-testbed__boundary-line">
            <span>Established weather science below</span>
            <i aria-hidden="true" />
            <span>Experimental Boundary First layer above</span>
          </div>
        </header>

        <section className="weather-testbed__posture" aria-labelledby="weather-posture-title">
          <div className="weather-testbed__section-heading">
            <span>Scientific posture</span>
            <h2 id="weather-posture-title">Build on weather science. Do not pretend to replace it.</h2>
            <p>{record.scientificPosture.rule}</p>
          </div>
          <div className="weather-testbed__posture-grid">
            <article>
              <BfuxIcon name="invariant" />
              <span>Established infrastructure</span>
              <ul>{record.scientificPosture.baseLayer.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <BfuxIcon name="reveal" />
              <span>Experimental layer</span>
              <ul>{record.scientificPosture.boundaryFirstLayer.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="weather-testbed__hypothesis" aria-labelledby="weather-hypothesis-title">
          <div>
            <span>Core hypothesis</span>
            <h2 id="weather-hypothesis-title">{record.coreHypothesis.title}</h2>
            <p>{record.coreHypothesis.statement}</p>
            <p className="weather-testbed__implication">{record.coreHypothesis.implication}</p>
          </div>
          <aside>
            <BfuxIcon name="warning" />
            <strong>Does not claim</strong>
            <ul>{record.coreHypothesis.doesNotClaim.map((item) => <li key={item}>{item}</li>)}</ul>
            <p><b>Test:</b> {record.coreHypothesis.test}</p>
          </aside>
        </section>

        <section className="weather-testbed__pipeline" aria-labelledby="weather-pipeline-title">
          <div className="weather-testbed__section-heading">
            <span>Representation chain</span>
            <h2 id="weather-pipeline-title">{record.forecastPipeline.title}</h2>
            <p>{record.forecastPipeline.boundaryFirstQuestion}</p>
          </div>
          <div className="weather-testbed__pipeline-flow" aria-label={record.forecastPipeline.compact}>
            {["Observed atmosphere", "Discrete state", "Admissible update", "Forecast atmosphere", "Observational witness"].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                {index < 4 ? <BfuxIcon name="forward" /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="weather-testbed__mapping" aria-labelledby="weather-mapping-title">
          <div className="weather-testbed__section-heading">
            <span>Weather closure object</span>
            <h2 id="weather-mapping-title">{record.paradigm.title}</h2>
            <p className="weather-testbed__notation">{record.weatherClosureObject.notation}</p>
          </div>
          <div className="weather-testbed__mapping-grid">
            {record.paradigm.mapping.map((item, index) => (
              <article key={item.boundaryFirst}>
                <BfuxIcon name={mappingGlyphs[index] ?? "object"} />
                <span>{item.boundaryFirst}</span>
                <p>{item.weather}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="weather-testbed__claims" aria-labelledby="weather-claims-title">
          <div className="weather-testbed__section-heading">
            <span>Claim ladder</span>
            <h2 id="weather-claims-title">{record.researchProgram.title}</h2>
            <p>No lower rung licenses a higher claim.</p>
          </div>
          <div className="weather-testbed__claim-ladder">
            {record.researchProgram.levels.map((level) => (
              <article key={level.id}>
                <span>{level.id}</span>
                <strong>{level.name}</strong>
                <small>{level.claimCeiling}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="weather-testbed__demo" aria-labelledby="weather-demo-title">
          <div className="weather-testbed__section-heading">
            <span>{record.flagshipDemo.status}</span>
            <h2 id="weather-demo-title">{record.flagshipDemo.title}</h2>
            <p>{record.flagshipDemo.subtitle}</p>
          </div>
          <div className="weather-testbed__scene-bank">
            {record.flagshipDemo.scenes.map((scene) => (
              <div key={scene}>
                <BfuxIcon name={sceneGlyphs[scene] ?? "inspect"} />
                <span>{scene}</span>
              </div>
            ))}
          </div>
          <p className="weather-testbed__reaction">{record.flagshipDemo.desiredReaction}</p>
        </section>

        <section className="weather-testbed__refinement" aria-labelledby="weather-refinement-title">
          <div className="weather-testbed__section-heading">
            <span>{record.adaptiveRefinement.workingName}</span>
            <h2 id="weather-refinement-title">{record.adaptiveRefinement.title}</h2>
            <p>{record.adaptiveRefinement.claimRule}</p>
          </div>
          <div className="weather-testbed__refinement-loop">
            {record.adaptiveRefinement.loop.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="weather-testbed__metrics">
            <span>Matched-baseline measures</span>
            <ul>{record.adaptiveRefinement.evaluation.map((metric) => <li key={metric}>{metric}</li>)}</ul>
          </div>
        </section>

        <section className="weather-testbed__ensemble" aria-labelledby="weather-ensemble-title">
          <div className="weather-testbed__section-heading">
            <span>Ensemble diagnostics</span>
            <h2 id="weather-ensemble-title">{record.ensembleAnalysis.title}</h2>
            <p>{record.ensembleAnalysis.claimBoundary}</p>
          </div>
          <div className="weather-testbed__ensemble-grid">
            {record.ensembleAnalysis.possibleOutputs.map((output) => (
              <div key={output}><BfuxIcon name="evidence" /><span>{output}</span></div>
            ))}
          </div>
        </section>

        <section className="weather-testbed__validation" aria-labelledby="weather-validation-title">
          <div className="weather-testbed__section-heading">
            <span>Validation ladder</span>
            <h2 id="weather-validation-title">{record.validationLadder.title}</h2>
            <p>{record.validationLadder.promotionRule}</p>
          </div>
          <ol className="weather-testbed__validation-ladder">
            {record.validationLadder.stages.map((stage, index) => (
              <li key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage}</strong>
                {index < record.validationLadder.stages.length - 1 ? <BfuxIcon name="promotion" /> : <BfuxIcon name="witness" />}
              </li>
            ))}
          </ol>
        </section>

        <section className="weather-testbed__pilot" aria-labelledby="weather-pilot-title">
          <div>
            <span>Pilot question</span>
            <h2 id="weather-pilot-title">{record.pilot.title}</h2>
            <p>{record.pilot.primaryQuestion}</p>
            <strong>{record.pilot.important}</strong>
          </div>
          <aside>
            <span>Required deliverables</span>
            <ul>{record.pilot.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </section>

        <section className="weather-testbed__firewall" aria-labelledby="weather-firewall-title">
          <div className="weather-testbed__section-heading">
            <span>Claim firewall</span>
            <h2 id="weather-firewall-title">{record.claimFirewall.title}</h2>
          </div>
          <div className="weather-testbed__firewall-grid">
            <article>
              <BfuxIcon name="admissibility" />
              <span>Allowed now</span>
              <ul>{record.claimFirewall.allowed.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <BfuxIcon name="warning" />
              <span>Not allowed yet</span>
              <ul>{record.claimFirewall.notAllowedYet.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <footer className="weather-testbed__footer">
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
