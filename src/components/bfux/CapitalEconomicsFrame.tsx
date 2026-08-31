import capital from "@/content/lab-machine-capital.json";
import problemIntake from "@/content/lab-machine-problem-intake.json";

type FrameNode = {
  id: string;
  register: string;
  label: string;
  copy: string;
  state?: string;
};

const capitalThesis = (id: string) =>
  capital.theses.find((item) => item.id === id);

const inputNodes: FrameNode[] = [
  {
    id: "capital",
    register: "IN-01",
    label: "Capital",
    copy: "Patient, mission-aligned capacity input.",
    state: "PORT",
  },
  {
    id: "research-funding",
    register: "IN-02",
    label: "Research funding",
    copy: "Grants and contracts that advance bounded work.",
    state: "CHANNEL",
  },
  {
    id: "strategic-capital",
    register: "IN-03",
    label: "Strategic capital",
    copy: "Long-horizon capacity under an explicitly defined structure.",
    state: "TBD",
  },
  {
    id: "sponsorship",
    register: "IN-04",
    label: "Sponsorship",
    copy: "Mission-aligned runway, translation, or public work support.",
    state: "PORT",
  },
];

const coreNodes: FrameNode[] = [
  {
    id: "governance",
    register: "M-01",
    label: "Governance",
    copy: "Steward authority, claims, correction, and repair.",
  },
  {
    id: "research",
    register: "M-02",
    label: "Research",
    copy: "Understand systems at consequential boundaries.",
  },
  {
    id: "methods",
    register: "M-03",
    label: "Methods",
    copy: "Turn surviving structure into repeatable practice.",
  },
  {
    id: "public-value",
    register: "M-04",
    label: "Public value",
    copy: "Agency, legibility, contestability, repair, and capacity.",
  },
  {
    id: "instruments",
    register: "M-05",
    label: "Instruments",
    copy: "Build tools that make difficult systems inspectable.",
  },
  {
    id: "public-artifacts",
    register: "M-06",
    label: "Public artifacts",
    copy: "Publish recoverable knowledge, evidence, and methods.",
  },
  {
    id: "pilots",
    register: "M-07",
    label: "Pilots",
    copy: "Exercise the machinery against bounded reality.",
  },
  {
    id: "software",
    register: "M-08",
    label: "Software",
    copy: "Encode reliable, inspectable, maintainable capability.",
  },
];

const outputNodes: FrameNode[] = [
  {
    id: "consulting-revenue",
    register: "OUT-01",
    label: "Consulting revenue",
    copy: "Applied expert work on bounded difficult systems.",
    state: "CHANNEL",
  },
  {
    id: "product-revenue",
    register: "OUT-02",
    label: "Product revenue",
    copy: "Earned support from useful software and artifacts.",
    state: "FORMATION",
  },
  {
    id: "partnerships",
    register: "OUT-03",
    label: "Partnerships",
    copy: "Bring domain authority, access, distribution, or stewardship.",
    state: "BOUNDED",
  },
  {
    id: "validation",
    register: "OUT-04",
    label: "Validation",
    copy: "Market response, domain criticism, and reproduction remain distinct.",
    state: "REQUIRED",
  },
];

const doctrineNodes: FrameNode[] = [
  {
    id: "capacity-before-expansion",
    register: "D-01",
    label: "Capacity before expansion",
    copy:
      capitalThesis("capacity-before-expansion")?.statement ??
      "Build responsible capacity before scale.",
  },
  {
    id: "conversion-engine",
    register: "D-02",
    label: "Fund the conversion engine",
    copy:
      capitalThesis("conversion-engine")?.statement ??
      "Fund the conversion engine, not an unbounded theory.",
  },
  {
    id: "diligence-object",
    register: "D-03",
    label: "Accumulated capacity + bounded validation",
    copy:
      capitalThesis("diligence-object")?.statement ??
      "Inspect what exists and the next bounded validation program separately.",
  },
  {
    id: "bring-a-system",
    register: "D-04",
    label: "Bring us your difficult system",
    copy: problemIntake.coreInvitation.statement,
  },
];

const returnNodes: FrameNode[] = [
  {
    id: "problem-intake",
    register: "RET-01",
    label: "Problem intake",
    copy: "Real problems from real systems enter without forced simplification.",
  },
  {
    id: "institutional-capacity",
    register: "RET-02",
    label: "Institutional capacity",
    copy: "People, systems, stewardship, memory, and infrastructure.",
  },
  {
    id: "distribution",
    register: "RET-03",
    label: "Distribution / transfer",
    copy: "Capability leaves the Lab in recoverable, maintainable form.",
  },
];

function ModulePanel({ node, compact = false }: { node: FrameNode; compact?: boolean }) {
  return (
    <article
      className={`capital-frame__module${compact ? " capital-frame__module--compact" : ""}`}
      data-node-id={node.id}
    >
      <header className="capital-frame__module-register">
        <span>{node.register}</span>
        {node.state ? <strong>{node.state}</strong> : null}
      </header>
      <div className="capital-frame__module-body">
        <h3>{node.label}</h3>
        <p>{node.copy}</p>
      </div>
      <span className="capital-frame__terminal" aria-hidden="true" />
    </article>
  );
}

function FlowRail({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div className="capital-frame__flow-rail">
      <span>{label}</span>
      <ol>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export function CapitalEconomicsFrame() {
  return (
    <section className="capital-frame" aria-labelledby="capital-frame-title">
      <header className="capital-frame__topbar">
        <div className="capital-frame__identity">
          <span className="capital-frame__mark" aria-hidden="true">
            <b>B</b>
            <b>F</b>
            <b>L</b>
          </span>
          <div>
            <small>Boundary First Labs</small>
            <strong id="capital-frame-title">The BFL System</strong>
          </div>
        </div>

        <div className="capital-frame__title-plate">
          <span>The economics web</span>
          <strong>Resources in · capability out · value returns</strong>
        </div>

        <div className="capital-frame__prototype-state" aria-label="Prototype state">
          <span>Frame</span>
          <strong>Prototype 01</strong>
        </div>
      </header>

      <div className="capital-frame__workplane">
        <svg
          className="capital-frame__trace-field"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="capital-frame__trace capital-frame__trace--primary" d="M245 100 H390" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M245 235 H390" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M245 370 H390" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M245 505 H390" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M810 100 H955" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M810 235 H955" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M810 370 H955" />
          <path className="capital-frame__trace capital-frame__trace--primary" d="M810 505 H955" />
          <path className="capital-frame__trace capital-frame__trace--secondary" d="M390 78 V585" />
          <path className="capital-frame__trace capital-frame__trace--secondary" d="M810 78 V585" />
          <path className="capital-frame__trace capital-frame__trace--return" d="M220 630 H980" />
        </svg>

        <aside className="capital-frame__doctrine" aria-label="Capital doctrine">
          <div className="capital-frame__bank-label">Interpretation</div>
          {doctrineNodes.map((node) => (
            <ModulePanel key={node.id} node={node} compact />
          ))}
        </aside>

        <section className="capital-frame__bank capital-frame__bank--input" aria-labelledby="capital-input-title">
          <header className="capital-frame__bank-heading">
            <span>Input manifold</span>
            <h2 id="capital-input-title">Capacity input</h2>
          </header>
          <div className="capital-frame__bank-stack">
            {inputNodes.map((node) => (
              <ModulePanel key={node.id} node={node} />
            ))}
          </div>
        </section>

        <section className="capital-frame__machine" aria-labelledby="lab-machine-title">
          <header className="capital-frame__bank-heading capital-frame__bank-heading--machine">
            <span>Institutional conversion engine</span>
            <h2 id="lab-machine-title">Lab machine</h2>
          </header>

          <div className="capital-frame__machine-grid">
            <ModulePanel node={coreNodes[0]} compact />
            <ModulePanel node={coreNodes[1]} compact />
            <ModulePanel node={coreNodes[2]} compact />
            <ModulePanel node={coreNodes[3]} compact />

            <article className="capital-frame__chassis" aria-label="Boundary First Labs central chassis">
              <div className="capital-frame__chassis-bezel">
                <span className="capital-frame__chassis-mark" aria-hidden="true">BFL</span>
                <strong>Boundary First Labs</strong>
                <small>Institutional Lab Machine</small>
                <div className="capital-frame__chassis-status" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </article>

            <ModulePanel node={coreNodes[4]} compact />
            <ModulePanel node={coreNodes[5]} compact />
            <ModulePanel node={coreNodes[6]} compact />
            <ModulePanel node={coreNodes[7]} compact />
          </div>
        </section>

        <section className="capital-frame__bank capital-frame__bank--output" aria-labelledby="exchange-output-title">
          <header className="capital-frame__bank-heading">
            <span>Exchange manifold</span>
            <h2 id="exchange-output-title">Validation / output</h2>
          </header>
          <div className="capital-frame__bank-stack">
            {outputNodes.map((node) => (
              <ModulePanel key={node.id} node={node} />
            ))}
          </div>
        </section>

        <aside className="capital-frame__guides" aria-label="Flow guide">
          <div className="capital-frame__bank-label">Flow guides</div>
          <FlowRail
            label="Capital to transfer"
            steps={["Capital", "Capacity", "Work", "Validation", "Transfer"]}
          />
          <FlowRail
            label="Problem to better instruments"
            steps={["Problem", "Diagnose", "Evidence", "Instrument"]}
          />
          <div className="capital-frame__legend">
            <div><i className="is-primary" />Primary flow</div>
            <div><i className="is-secondary" />Enabling flow</div>
            <div><i className="is-return" />Value return</div>
          </div>
        </aside>
      </div>

      <section className="capital-frame__return-zone" aria-labelledby="return-zone-title">
        <header>
          <span>Return / retained capability rail</span>
          <h2 id="return-zone-title">Problem → capacity → transfer</h2>
        </header>
        <div className="capital-frame__return-modules">
          {returnNodes.map((node, index) => (
            <div className="capital-frame__return-step" key={node.id}>
              <ModulePanel node={node} compact />
              {index < returnNodes.length - 1 ? <span className="capital-frame__return-arrow" aria-hidden="true">→</span> : null}
            </div>
          ))}
        </div>
      </section>

      <footer className="capital-frame__commitment">
        <strong>Our commitment</strong>
        <p>We build institutional capacity and instruments that turn difficult problems into public value.</p>
        <span>Rigorous · Practical · Open · Mission-aligned</span>
      </footer>
    </section>
  );
}
