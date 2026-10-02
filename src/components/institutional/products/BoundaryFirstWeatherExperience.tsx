import Link from "next/link";
import { ProductExperienceShell } from "./ProductExperienceShell";
import { BoundaryFirstWeatherField } from "./BoundaryFirstWeatherField";
import {
  boundaryFirstWeatherNav,
  boundaryFirstWeatherProduct,
  weatherDecisionSurface,
  weatherPartnerMeasures,
  weatherRecord,
} from "../content/boundaryFirstWeather";
import styles from "../styles/BoundaryFirstWeather.module.css";

export function BoundaryFirstWeatherExperience() {
  return (
    <ProductExperienceShell
      actions={[
        { href: "#instrument", label: "Enter the Weather Lab" },
        {
          href: "/research/applied-testbeds/weather",
          label: "Open research record",
          kind: "secondary",
        },
      ]}
      heroVisual={<BoundaryFirstWeatherField />}
      navItems={boundaryFirstWeatherNav}
      product={boundaryFirstWeatherProduct}
    >
      <section className={styles.weatherHypothesisSection} id="hypothesis">
        <div className={styles.weatherHypothesisLead}>
          <p>THE RESEARCH QUESTION</p>
          <h2>Weather does not change uniformly.</h2>
          <p>
            A weather model represents a volume of atmosphere, but the most consequential
            change can concentrate around fronts, moisture boundaries, vortices, shear
            layers, convective edges, and other moving structures.
          </p>
        </div>

        <div className={styles.weatherHypothesisStatement}>
          <blockquote>{weatherRecord.openingClaim.callout}</blockquote>
          <span>
            Boundary First Weather asks whether tracking moving boundaries, transport, and
            model disagreement can help identify where additional computation or analyst
            attention would be most useful.
          </span>
        </div>

        <div className={styles.weatherScienceBoundary}>
          <article>
            <span>ESTABLISHED WEATHER SCIENCE</span>
            <strong>Infrastructure we build on.</strong>
            <div>
              {weatherRecord.scientificPosture.baseLayer.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </article>

          <div className={styles.weatherBoundaryDivider} aria-hidden="true">
            <span>INTEROPERATE</span>
            <i />
            <span>TEST</span>
          </div>

          <article>
            <span>EXPERIMENTAL LAYER</span>
            <strong>Ideas that still have to earn their value in comparison.</strong>
            <div>
              {weatherRecord.scientificPosture.boundaryFirstLayer.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.weatherInstrumentSection} id="instrument">
        <div className={styles.weatherSectionLead}>
          <p>THE PUBLIC WEATHER VIEW</p>
          <h2>Show what changed between forecasts, where models disagree, and why it matters.</h2>
          <span>
            The first public instrument is a decision-support view for comparing forecast
            changes over time, seeing uncertainty and model disagreement, and connecting those
            changes to a location or decision that matters.
          </span>
        </div>

        <div className={styles.weatherEventWorkbench}>
          <div className={styles.weatherEventTimeline}>
            <div>
              <span>T−12H</span>
              <strong>BOUNDARY FORMS</strong>
            </div>
            <div>
              <span>T−06H</span>
              <strong>MODELS DIVERGE</strong>
            </div>
            <div data-active="true">
              <span>T−02H</span>
              <strong>TRANSITION WINDOW</strong>
            </div>
            <div>
              <span>T+00H</span>
              <strong>WITNESS</strong>
            </div>
          </div>

          <div className={styles.weatherDecisionGrid}>
            {weatherDecisionSurface.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.weatherRepresentationChain}>
          <span>OBSERVED ATMOSPHERE</span>
          <i>→</i>
          <span>DISCRETE STATE</span>
          <i>→</i>
          <span>ADMISSIBLE UPDATE</span>
          <i>→</i>
          <span>FORECAST ATMOSPHERE</span>
          <i>→</i>
          <span>OBSERVATIONAL WITNESS</span>
        </div>
      </section>

      <section className={styles.weatherResearchSection} id="research">
        <div className={styles.weatherResearchLead}>
          <p>WHAT THE RESEARCH MUST PROVE, STEP BY STEP</p>
          <h2>Six research questions that should be tested separately.</h2>
          <span>
            Showing a useful structure does not automatically prove better prediction,
            better ensemble ranking, useful compression, or faster simulation.
          </span>
        </div>

        <div className={styles.weatherClaimLadder}>
          {weatherRecord.researchProgram.levels.map((level) => (
            <article key={level.id}>
              <span>{level.id}</span>
              <strong>{level.name}</strong>
              <small>{level.claimCeiling}</small>
            </article>
          ))}
        </div>

        <div className={styles.weatherRefinementBench}>
          <div className={styles.weatherRefinementCopy}>
            <span>{weatherRecord.adaptiveRefinement.workingName}</span>
            <h3>{weatherRecord.adaptiveRefinement.title}</h3>
            <p>{weatherRecord.adaptiveRefinement.claimRule}</p>
          </div>

          <div className={styles.weatherRefinementLoop}>
            {weatherRecord.adaptiveRefinement.loop.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <aside className={styles.weatherMetrics}>
            <span>MATCHED-BASELINE MEASURES</span>
            <div>
              {weatherRecord.adaptiveRefinement.evaluation.map((metric) => (
                <small key={metric}>{metric}</small>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.weatherPilotSection} id="pilot">
        <div className={styles.weatherPilotQuestion}>
          <p>A PRACTICAL PILOT</p>
          <h2>Pick one historical weather event and compare the method against a clear baseline.</h2>
          <blockquote>{weatherRecord.pilot.primaryQuestion}</blockquote>
          <strong>{weatherRecord.pilot.important}</strong>
        </div>

        <div className={styles.weatherPilotBody}>
          <div className={styles.weatherMeasureGrid}>
            {weatherPartnerMeasures.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <aside className={styles.weatherPartnerCall}>
            <span>WHO COULD HELP TEST THIS</span>
            <h3>Weather expertise and real data matter more than endorsement.</h3>
            <p>{weatherRecord.partners.ask}</p>
            <div>
              {weatherRecord.partners.categories.map((category) => (
                <small key={category}>{category}</small>
              ))}
            </div>
            <Link href="/contact?type=collaboration&source=boundary-first-weather">
              Discuss a bounded Weather pilot <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.weatherEvidenceSection} id="evidence">
        <div className={styles.weatherFirewallHeader}>
          <div>
            <p>WHAT WE CAN AND CANNOT SAY YET</p>
            <h2>A compelling visualization is not the same as a better forecast.</h2>
          </div>
          <blockquote>
            No lower rung licenses a higher claim.
          </blockquote>
        </div>

        <div className={styles.weatherFirewallGrid}>
          <article data-kind="allowed">
            <span>SUPPORTED DESCRIPTION TODAY</span>
            {weatherRecord.claimFirewall.allowed.map((claim) => (
              <p key={claim}>{claim}</p>
            ))}
          </article>

          <article data-kind="blocked">
            <span>NOT ESTABLISHED YET</span>
            {weatherRecord.claimFirewall.notAllowedYet.map((claim) => (
              <p key={claim}>{claim}</p>
            ))}
          </article>
        </div>

        <div className={styles.weatherClosing}>
          <span>CURRENT RESEARCH / TESTBED STATE</span>
          <h2>{weatherRecord.closing.title}</h2>
          <p>{weatherRecord.closing.finalLine}</p>
          <div>
            <Link href="/research/applied-testbeds/weather?detail=record:boundary-first-weather">
              Inspect the full research record <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products">
              Back to Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </ProductExperienceShell>
  );
}
