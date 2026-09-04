import capital from "@/content/lab-machine-capital.json";
import problemIntake from "@/content/lab-machine-problem-intake.json";

type SemanticAffinity =
  | "neutral"
  | "research"
  | "products"
  | "public-interest"
  | "publications"
  | "institution";

type BoundaryOperation =
  | "inlet"
  | "bind"
  | "close"
  | "gate"
  | "egress"
  | "return"
  | "inquire"
  | "constrain"
  | "mediate"
  | "execute"
  | "expose"
  | "record"
  | "answer"
  | "externalize";

type ConversionStage = {
  id: string;
  number: string;
  label: string;
  copy: string;
  operation: BoundaryOperation;
  affinity: SemanticAffinity;
  machine?: boolean;
  returnStage?: boolean;
};

type InstitutionalStage = {
  id: string;
  number: string;
  label: string;
  copy: string;
  affinity: SemanticAffinity;
};

type MachineFunction = {
  id: string;
  label: string;
  copy: string;
  operation: BoundaryOperation;
  affinity: SemanticAffinity;
};

type RetainedReturn = {
  label: string;
  copy: string;
  affinity: SemanticAffinity;
};

const fundingPortIds = ["grant", "sponsorship", "strategic-capital", "consulting"];

const fundingPorts = fundingPortIds
  .map((id) => capital.fundingRelationships.find((item) => item.id === id))
  .filter((item): item is (typeof capital.fundingRelationships)[number] => Boolean(item));

const fundingPortAffinity: Record<string, SemanticAffinity> = {
  grant: "research",
  sponsorship: "institution",
  "strategic-capital": "institution",
  consulting: "products",
};

const conversionStages: ConversionStage[] = [
  {
    id: "capital",
    number: "01",
    label: "Capital",
    copy: "A bounded resource input with an explicit purpose.",
    operation: "inlet",
    affinity: "institution",
  },
  {
    id: "coherent-capacity",
    number: "02",
    label: "Coherent capacity",
    copy: "Capacity the Lab can responsibly hold, govern, maintain, and repair.",
    operation: "bind",
    affinity: "institution",
    machine: true,
  },
  {
    id: "bounded-work",
    number: "03",
    label: "Bounded work",
    copy: "A defined experiment, artifact, pilot, role, or transfer with closure conditions.",
    operation: "close",
    affinity: "research",
    machine: true,
  },
  {
    id: "validation",
    number: "04",
    label: "Validation",
    copy: "Market, domain, and technical witnesses test different claims.",
    operation: "gate",
    affinity: "public-interest",
    machine: true,
  },
  {
    id: "transfer",
    number: "05",
    label: "Transfer",
    copy: "Capability leaves the Lab recoverable, inspectable, and maintainable.",
    operation: "egress",
    affinity: "publications",
    machine: true,
  },
  {
    id: "retained-capability",
    number: "06",
    label: "Retained capability",
    copy: "Evidence, methods, software, relationships, and memory remain for the next cycle.",
    operation: "return",
    affinity: "institution",
    returnStage: true,
  },
];

const institutionalStages: InstitutionalStage[] = [
  {
    id: "private-corpus",
    number: "A",
    label: "Private corpus",
    copy: "Accumulated research, code, notes, methods, and working capability.",
    affinity: "research",
  },
  {
    id: "public-laboratory",
    number: "B",
    label: "Public laboratory",
    copy: "The work becomes legible, governed, inspectable, and open to criticism.",
    affinity: "institution",
  },
  {
    id: "useful-artifacts",
    number: "C",
    label: "Useful artifacts",
    copy: "Research becomes instruments, methods, software, publications, and public objects.",
    affinity: "publications",
  },
  {
    id: "products-services",
    number: "D",
    label: "Products / services",
    copy: "Bounded capability encounters users, institutions, constraints, and demand.",
    affinity: "products",
  },
  {
    id: "external-review",
    number: "E",
    label: "External review",
    copy: "Claims and implementations encounter domain experts, benchmarks, pilots, and reproduction.",
    affinity: "public-interest",
  },
  {
    id: "sustainable-program",
    number: "F",
    label: "Sustainable research program",
    copy: "Earned support, public support, reusable capability, and stewardship fund continued inquiry.",
    affinity: "institution",
  },
];

const machineFunctions: MachineFunction[] = [
  {
    id: "research",
    label: "Research",
    copy: "Understand systems at consequential boundaries.",
    operation: "inquire",
    affinity: "research",
  },
  {
    id: "methods",
    label: "Methods",
    copy: "Turn surviving structure into repeatable practice.",
    operation: "constrain",
    affinity: "research",
  },
  {
    id: "instruments",
    label: "Instruments",
    copy: "Make difficult systems inspectable and operable.",
    operation: "mediate",
    affinity: "products",
  },
  {
    id: "software",
    label: "Software",
    copy: "Encode reliable, maintainable capability.",
    operation: "execute",
    affinity: "products",
  },
  {
    id: "pilots",
    label: "Pilots",
    copy: "Exercise machinery against bounded reality.",
    operation: "expose",
    affinity: "products",
  },
  {
    id: "evidence",
    label: "Evidence",
    copy: "Preserve witnesses, defects, and claim boundaries.",
    operation: "record",
    affinity: "publications",
  },
];

const stewardshipFunctions: MachineFunction[] = [
  {
    id: "governance",
    label: "Governance",
    copy: "Keep authority, claims, correction, responsibility, and repair attributable.",
    operation: "bind",
    affinity: "institution",
  },
  {
    id: "public-value",
    label: "Public value",
    copy: "Make agency, legibility, contestability, repairability, and durable capacity the consequence test.",
    operation: "answer",
    affinity: "public-interest",
  },
  {
    id: "public-artifacts",
    label: "Public artifacts",
    copy: "Make useful knowledge, evidence, methods, and instruments recoverable beyond the Lab.",
    operation: "externalize",
    affinity: "publications",
  },
];

const retainedReturns: RetainedReturn[] = [
  { label: "Evidence", copy: "What survived contact with reality.", affinity: "publications" },
  { label: "Learning", copy: "What narrowed, failed, or changed the method.", affinity: "research" },
  { label: "Revenue / support", copy: "Resources earned or entrusted through useful work.", affinity: "products" },
  { label: "Institutional memory", copy: "Reusable methods, software, standards, relationships, and stewardship.", affinity: "institution" },
];

const diligenceGateCopy: Record<string, { label: string; question: string }> = {
  exists: {
    label: "What already exists?",
    question: "What is already real and source-backed?",
  },
  "convert-next": {
    label: "What does capital convert next?",
    question: "What specific work or capability does this input enable?",
  },
  closure: {
    label: "What closes the work?",
    question: "What counts as success, failure, narrowing, transfer, or stop?",
  },
  "external-legibility": {
    label: "How does it become legible?",
    question: "What external artifact or witness makes the result inspectable?",
  },
  "decrease-dependence": {
    label: "How does dependence decrease?",
    question: "How does this reduce dependence on the funder, founder, or hidden Lab interpretation?",
  },
};

function ConversionStagePlate({ stage }: { stage: ConversionStage }) {
  return (
    <article
      className={`capital-frame__conversion-stage${stage.machine ? " is-machine" : ""}${stage.returnStage ? " is-return" : ""}`}
      data-stage-id={stage.id}
      data-boundary-operation={stage.operation}
      data-affinity={stage.affinity}
    >
      <header>
        <span>{stage.number}</span>
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
    <article className="capital-frame__institutional-stage" data-stage-id={stage.id} data-affinity={stage.affinity}>
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
            <strong id="capital-frame-title">Boundary First Labs</strong>
          </div>
        </div>

        <div className="capital-frame__thesis-plate">
          <span>Capital posture</span>
          <strong>Fund the conversion engine, not an unbounded theory.</strong>
        </div>

        <div className="capital-frame__prototype-state" aria-label="Capital projection">
          <strong>Capital projection</strong>
        </div>
      </header>

      <section className="capital-frame__orientation" aria-labelledby="capital-orientation-title">
        <div>
          <h1 id="capital-orientation-title">Capital becomes Capability</h1>
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
              <article
                className="capital-frame__funding-port"
                key={port.id}
                data-port-id={port.id}
                data-boundary-operation="inlet"
                data-affinity={fundingPortAffinity[port.id] ?? "neutral"}
              >
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

          <article
            className="capital-frame__problem-port"
            data-boundary-operation="inlet"
            data-affinity="public-interest"
          >
            <header>
              <span>REALITY INPUT</span>
              <strong>PROBLEM</strong>
            </header>
            <h3>Bring us your difficult system</h3>
            <p>{problemIntake.hero.secondary}</p>
            <i aria-hidden="true" />
          </article>
        </aside>

        <section className="capital-frame__engine" aria-labelledby="conversion-engine-title">
          <section className="capital-frame__cycle-loop" aria-label="Primary capital conversion cycle">
            <div className="capital-frame__cycle-loop-shell" aria-hidden="true" />

            <header className="capital-frame__engine-heading">
              <div>
                <h2 id="conversion-engine-title">Primary conversion rail</h2>
              </div>

              <section className="capital-frame__conversion-rail" aria-label="Capital conversion sequence">
                {conversionStages.map((stage) => (
                  <ConversionStagePlate key={stage.id} stage={stage} />
                ))}
              </section>
            </header>

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

                <div className="capital-frame__machine-functions" aria-label="Operational Lab machinery">
                  {machineFunctions.map((item, index) => (
                    <article
                      className="capital-frame__machine-function"
                      key={item.id}
                      data-machine-id={item.id}
                      data-boundary-operation={item.operation}
                      data-affinity={item.affinity}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <small className="capital-frame__operation-label">{item.operation}</small>
                        <h3>{item.label}</h3>
                        <p>{item.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <section className="capital-frame__stewardship-module" aria-labelledby="civics-stewardship-title">
                  <header>
                    <div>
                      <span>Foundational responsibility module</span>
                      <h3 id="civics-stewardship-title">Civics &amp; Stewardship</h3>
                    </div>
                    <strong>PUBLIC CONSEQUENCE</strong>
                  </header>

                  <div className="capital-frame__stewardship-grid">
                    {stewardshipFunctions.map((item, index) => (
                      <article
                        className={`capital-frame__stewardship-card${item.id === "public-value" ? " is-public-value" : ""}`}
                        key={item.id}
                        data-machine-id={item.id}
                        data-boundary-operation={item.operation}
                        data-affinity={item.affinity}
                      >
                        <header>
                          <span>S-{String(index + 1).padStart(2, "0")}</span>
                          <span className="capital-frame__operation-label">{item.operation}</span>
                          {item.id === "public-value" ? <strong>CONSEQUENCE TEST</strong> : null}
                        </header>
                        <div>
                          <h4>{item.label}</h4>
                          <p>{item.copy}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </section>

            <section
              className="capital-frame__return-manifold"
              aria-labelledby="return-manifold-title"
              data-boundary-operation="return"
            >
              <header>
                <span>Value return / retained capability</span>
                <h2 id="return-manifold-title">What remains after a cycle closes</h2>
                <strong>feeds the next coherent-capacity state ↺</strong>
              </header>
              <div>
                {retainedReturns.map((item) => (
                  <article key={item.label} data-affinity={item.affinity}>
                    <h3>{item.label}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </section>
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
        </section>

        <aside className="capital-frame__diligence-console" aria-labelledby="diligence-title">
          <header className="capital-frame__console-heading">
            <h2 id="diligence-title">Five gates every ask must close</h2>
          </header>

          <ol className="capital-frame__diligence-gates">
            {capital.diligenceQuestions.map((item, index) => {
              const display = diligenceGateCopy[item.id] ?? {
                label: item.label,
                question: item.question,
              };

              return (
                <li key={item.id} data-boundary-operation="gate" data-affinity="institution">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{display.label}</h3>
                    <p>{display.question}</p>
                  </div>
                </li>
              );
            })}
          </ol>
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
