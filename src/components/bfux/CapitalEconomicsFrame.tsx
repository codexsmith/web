import capital from "@/content/lab-machine-capital.json";
import problemIntake from "@/content/lab-machine-problem-intake.json";

type ConversionStage = {
  id: string;
  number: string;
  label: string;
  copy: string;
  register: string;
  machine?: boolean;
  returnStage?: boolean;
};

type InstitutionalStage = {
  id: string;
  number: string;
  label: string;
  copy: string;
};

const fundingPortIds = ["grant", "sponsorship", "strategic-capital", "consulting"];

const fundingPorts = fundingPortIds
  .map((id) => capital.fundingRelationships.find((item) => item.id === id))
  .filter((item): item is (typeof capital.fundingRelationships)[number] => Boolean(item));

const conversionStages: ConversionStage[] = [
  {
    id: "capital",
    number: "01",
    label: "Capital",
    copy: "A bounded resource input with an explicit relationship and purpose.",
    register: "INPUT",
  },
  {
    id: "coherent-capacity",
    number: "02",
    label: "Coherent capacity",
    copy: "More work the Lab can responsibly hold, understand, govern, maintain, and repair.",
    register: "HOLD",
    machine: true,
  },
  {
    id: "bounded-work",
    number: "03",
    label: "Bounded work",
    copy: "A defined experiment, artifact, pilot, role, implementation, or transfer with closure conditions.",
    register: "WORK",
    machine: true,
  },
  {
    id: "validation",
    number: "04",
    label: "Validation",
    copy: "Market response, domain criticism, and technical reproduction answer to different realities.",
    register: "WITNESS",
    machine: true,
  },
  {
    id: "transfer",
    number: "05",
    label: "Transfer",
    copy: "Capability leaves the Lab in a form another party can recover, use, inspect, and maintain.",
    register: "EXPORT",
    machine: true,
  },
  {
    id: "retained-capability",
    number: "06",
    label: "Retained capability",
    copy: "Evidence, methods, software, revenue, relationships, standards, and institutional memory remain available for the next cycle.",
    register: "RETURN",
    returnStage: true,
  },
];

const institutionalStages: InstitutionalStage[] = [
  {
    id: "private-corpus",
    number: "A",
    label: "Private corpus",
    copy: "Accumulated research, code, notes, methods, and working capability.",
  },
  {
    id: "public-laboratory",
    number: "B",
    label: "Public laboratory",
    copy: "The work becomes legible, governed, inspectable, and open to criticism.",
  },
  {
    id: "useful-artifacts",
    number: "C",
    label: "Useful artifacts",
    copy: "Research becomes instruments, methods, software, publications, and public objects.",
  },
  {
    id: "products-services",
    number: "D",
    label: "Products / services",
    copy: "Bounded capability encounters users, institutions, constraints, and demand.",
  },
  {
    id: "external-review",
    number: "E",
    label: "External review",
    copy: "Claims and implementations encounter domain experts, benchmarks, pilots, and reproduction.",
  },
  {
    id: "sustainable-program",
    number: "F",
    label: "Sustainable research program",
    copy: "Earned support, public support, reusable capability, and stewardship fund continued inquiry.",
  },
];

const machineFunctions = [
  "Research",
  "Methods",
  "Instruments",
  "Software",
  "Pilots",
  "Governance",
  "Evidence",
  "Public artifacts",
];

const retainedReturns = [
  { label: "Evidence", copy: "What survived contact with reality." },
  { label: "Learning", copy: "What narrowed, failed, or changed the method." },
  { label: "Revenue / support", copy: "Resources earned or entrusted through useful work." },
  { label: "Institutional memory", copy: "Reusable methods, software, standards, relationships, and stewardship." },
];

function ConversionStagePlate({ stage }: { stage: ConversionStage }) {
  return (
    <article
      className={`capital-frame__conversion-stage${stage.machine ? " is-machine" : ""}${stage.returnStage ? " is-return" : ""}`}
      data-stage-id={stage.id}
    >
      <header>
        <span>{stage.number}</span>
        <strong>{stage.register}</strong>
      </header>
      <div>
        <h3>{stage.label}</h3>
        <p>{stage.copy}</p>
      </div>
      <i className="capital-frame__stage-terminal" aria-hidden="true" />
    </article>
  );
}

function InstitutionalStagePlate({ stage }: { stage: InstitutionalStage }) {
  return (
    <article className="capital-frame__institutional-stage" data-stage-id={stage.id}>
      <span>{stage.number}</span>
      <div>
        <h3>{stage.label}</h3>
        <p>{stage.copy}</p>
      </div>
    </article>
  );
}

export function CapitalEconomicsFrame() {
  return (
    <section className="capital-frame" aria-labelledby="capital-frame-title">
      <header className="capital-frame__topbar">
        <div className="capital-frame__identity">
          <span className="capital-frame__mark" aria-hidden="true">BFL</span>
          <div>
            <small>Boundary First Labs</small>
            <strong id="capital-frame-title">The conversion engine</strong>
          </div>
        </div>

        <div className="capital-frame__thesis-plate">
          <span>Capital posture</span>
          <strong>Fund the conversion engine, not an unbounded theory.</strong>
        </div>

        <div className="capital-frame__prototype-state" aria-label="Prototype state">
          <span>Capital projection</span>
          <strong>Prototype 02</strong>
        </div>
      </header>

      <section className="capital-frame__orientation" aria-labelledby="capital-orientation-title">
        <div>
          <span>What capital actually does</span>
          <h1 id="capital-orientation-title">Capital becomes capability only by passing through bounded work and evidence.</h1>
        </div>
        <p>
          The central object is not a list of projects or funding channels. It is a conversion system: resources increase coherent capacity; capacity closes bounded work; bounded work produces witnesses; validated capability transfers; what survives returns to the institution.
        </p>
      </section>

      <div className="capital-frame__body">
        <aside className="capital-frame__input-console" aria-labelledby="funding-input-title">
          <header className="capital-frame__console-heading">
            <span>Resource manifold</span>
            <h2 id="funding-input-title">Ways capacity enters</h2>
          </header>

          <div className="capital-frame__funding-ports">
            {fundingPorts.map((port, index) => (
              <article className="capital-frame__funding-port" key={port.id}>
                <header>
                  <span>IN-{String(index + 1).padStart(2, "0")}</span>
                  <strong>{port.capitalType}</strong>
                </header>
                <h3>{port.label}</h3>
                <p>{port.buys}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>

          <article className="capital-frame__problem-port">
            <header>
              <span>REALITY INPUT</span>
              <strong>PROBLEM</strong>
            </header>
            <h3>Bring us your difficult system</h3>
            <p>{problemIntake.hero.secondary}</p>
            <i aria-hidden="true" />
          </article>
        </aside>

        <main className="capital-frame__engine" aria-labelledby="conversion-engine-title">
          <header className="capital-frame__engine-heading">
            <div>
              <span>Primary conversion rail</span>
              <h2 id="conversion-engine-title">Capital → coherent capacity → bounded work → validation → transfer → retained capability</h2>
            </div>
            <strong>BFL / INSTITUTIONAL MACHINE</strong>
          </header>

          <section className="capital-frame__conversion-rail" aria-label="Capital conversion sequence">
            {conversionStages.map((stage) => (
              <ConversionStagePlate key={stage.id} stage={stage} />
            ))}
          </section>

          <section className="capital-frame__machine-bed" aria-labelledby="machine-bed-title">
            <header>
              <span>Where conversion work happens</span>
              <h2 id="machine-bed-title">The Lab holds the middle of the rail</h2>
            </header>
            <div className="capital-frame__machine-bed-body">
              <div className="capital-frame__chassis">
                <span className="capital-frame__chassis-mark" aria-hidden="true">BFL</span>
                <div>
                  <strong>Boundary First Labs</strong>
                  <small>Research · engineering · governance · stewardship</small>
                </div>
              </div>
              <div className="capital-frame__machine-functions">
                {machineFunctions.map((item, index) => (
                  <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="capital-frame__institutional-rail" aria-labelledby="institutional-conversion-title">
            <header>
              <span>Institutional conversion</span>
              <h2 id="institutional-conversion-title">What the same engine does to the Lab itself</h2>
            </header>
            <div className="capital-frame__institutional-stages">
              {institutionalStages.map((stage) => (
                <InstitutionalStagePlate key={stage.id} stage={stage} />
              ))}
            </div>
          </section>

          <section className="capital-frame__return-manifold" aria-labelledby="return-manifold-title">
            <header>
              <span>Value return / retained capability</span>
              <h2 id="return-manifold-title">What remains after a cycle closes</h2>
              <strong>feeds the next coherent-capacity state ↺</strong>
            </header>
            <div>
              {retainedReturns.map((item) => (
                <article key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className="capital-frame__diligence-console" aria-labelledby="diligence-title">
          <header className="capital-frame__console-heading">
            <span>Capital ask grammar</span>
            <h2 id="diligence-title">Five gates every ask must close</h2>
          </header>

          <ol className="capital-frame__diligence-gates">
            {capital.diligenceQuestions.map((item, index) => (
              <li key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.question}</p>
                  <small>{item.requiredState}</small>
                </div>
              </li>
            ))}
          </ol>

          <article className="capital-frame__boundary-note">
            <span>Boundary condition</span>
            <strong>Capital does not bypass evidence.</strong>
            <p>Funding, attention, product demand, expert interest, and technical reproduction are different witnesses. None substitutes for the others.</p>
          </article>
        </aside>
      </div>

      <footer className="capital-frame__commitment">
        <div>
          <span>Due-diligence object</span>
          <strong>Accumulated productive capacity + a bounded validation program.</strong>
        </div>
        <p>What exists now is separated from what capital converts next.</p>
        <span className="capital-frame__commitment-state">Capacity before expansion</span>
      </footer>
    </section>
  );
}
