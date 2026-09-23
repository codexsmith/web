import styles from "./styles/RegistrarArchitectureDiagram.module.css";

export type RegistrarArchitectureVariant =
  | "registrar-overview"
  | "core-relationships"
  | "public-projection"
  | "research-lane"
  | "apparatus-stack";

type Node = { id: string; label: string; detail: string; primary?: boolean };
type Relation = { from: string; to: string; label: string };
type Definition = {
  eyebrow: string; title: string; question: string; caption: string;
  layout: "flow" | "matrix" | "hub" | "stack";
  nodes: readonly Node[]; relations: readonly Relation[]; callout: string;
};

const diagrams: Record<RegistrarArchitectureVariant, Definition> = {
  "registrar-overview": {
    eyebrow: "REGISTRAR ARCHITECTURE",
    title: "How source-owned work becomes addressable without moving its authority.",
    question: "Where do research objects live, how are they routed, and what reaches the public surface?",
    caption: "Source-owned work is registered and routed into durable object families, operational machinery, evidence surfaces, and bounded public projections. Registration makes an object addressable; it does not validate the object or move its authority into the website.",
    layout: "flow",
    nodes: [
      { id: "INPUT", label: "Research + practice inputs", detail: "Notes · sources · code · data · experiments" },
      { id: "SOURCE", label: "Source-owned Lab state", detail: "Canonical local homes retain semantic authority" },
      { id: "REG", label: "Registrar / registry layer", detail: "Address · class · status · owner · authority" },
      { id: "OBJECTS", label: "Durable object families", detail: "RL · EXP · PUB · PROD · ATLAS/XFORM · EVENT · BFL-MACH" },
      { id: "EVID/OPS", label: "Evidence + operations", detail: "Claims · sources · validation · queues · transforms · instrumentation" },
      { id: "PROJ", label: "Public projection layer", detail: "Selection · compression · context · rendering" },
      { id: "PUBLIC", label: "Public surfaces", detail: "Research · Apparatus · Open Lab · Projects · Products" },
    ],
    relations: [
      { from: "Inputs", to: "Source state", label: "enter bounded source homes" },
      { from: "Source state", to: "Registrar", label: "register identity and routing" },
      { from: "Registrar", to: "Durable objects", label: "addresses" },
      { from: "Durable objects", to: "Evidence + operations", label: "connects governed state" },
      { from: "Evidence + operations", to: "Projection", label: "projects bounded state" },
      { from: "Projection", to: "Public surfaces", label: "renders" },
    ],
    callout: "The website renders the corpus; it does not become a second corpus.",
  },
  "core-relationships": {
    eyebrow: "TYPED RELATIONSHIPS",
    title: "Distinct objects stay distinct even when the work connects them.",
    question: "What kinds of objects can participate in a research program without collapsing into one status?",
    caption: "Research lanes connect claims, evidence, experiments, publications, products, atlases, transforms, machinery, and events through typed relationships. A visible edge states a declared relation, not automatic scientific or institutional approval.",
    layout: "matrix",
    nodes: [
      { id: "RL-*", label: "Research lane", detail: "Durable continuity of inquiry", primary: true },
      { id: "CLAIM", label: "Claim", detail: "Bounded proposition + state" },
      { id: "EVID", label: "Evidence / source", detail: "Support · challenge · provenance" },
      { id: "EXP-*", label: "Experiment", detail: "Bounded evidence-bearing operation" },
      { id: "PUB-*", label: "Publication", detail: "Human-readable projection" },
      { id: "PROD-*", label: "Product", detail: "Durable utility / delivery object" },
      { id: "ATLAS-*", label: "Atlas", detail: "Bounded representational object" },
      { id: "XFORM-*", label: "Transform", detail: "Typed representational bridge" },
      { id: "BFL-MACH-*", label: "Machine", detail: "Executable institutional capability" },
      { id: "EVENT-*", label: "Event", detail: "Operation / state-transition witness" },
    ],
    relations: [
      { from: "Evidence", to: "Claim", label: "supports / challenges" },
      { from: "Experiment", to: "Claim", label: "tests" },
      { from: "Experiment", to: "Evidence", label: "produces" },
      { from: "Publication", to: "Claim", label: "projects selected state" },
      { from: "Transform", to: "Machine", label: "may be executed by" },
      { from: "Machine", to: "Event", label: "emits witness" },
    ],
    callout: "Typed relation ≠ automatic validation. Registration routes identity; source owners retain authority.",
  },
  "public-projection": {
    eyebrow: "PUBLIC PROJECTION PIPELINE",
    title: "Public work is a bounded projection with a route back to source.",
    question: "How does source-owned state become legible outside the Lab without becoming a duplicate authority?",
    caption: "Public pages select, compress, contextualize, and render source-owned objects. Claim ceilings, status, provenance, and correction paths travel with the projection; corrections route back to the owning source.",
    layout: "flow",
    nodes: [
      { id: "01", label: "Canonical source", detail: "Research · registry · product · publication · machinery" },
      { id: "02", label: "Stable identity + address", detail: "Object type · owner · status · provenance" },
      { id: "03", label: "Public selection", detail: "Choose what is appropriate to expose" },
      { id: "04", label: "Projection / compression", detail: "Sequence · summarize · contextualize · render" },
      { id: "05", label: "Projection checks", detail: "Claim ceiling · status · provenance · correction path" },
      { id: "06", label: "Website component", detail: "Snapshot · Research · Apparatus · Open Lab" },
      { id: "07", label: "Reader / reviewer", detail: "Inspect · compare · criticize · continue" },
    ],
    relations: [
      { from: "Source", to: "Identity", label: "binds address and ownership" },
      { from: "Identity", to: "Selection", label: "constrains exposure" },
      { from: "Selection", to: "Projection", label: "compresses with context" },
      { from: "Projection", to: "Checks", label: "preserves ceilings and provenance" },
      { from: "Checks", to: "Website", label: "renders" },
      { from: "Reader", to: "Source", label: "critique / correction routes back" },
    ],
    callout: "No silent promotion · no duplicate source of truth · no false liveness.",
  },
  "research-lane": {
    eyebrow: "RESEARCH LANE ANATOMY",
    title: "A paper is one projection of a larger research object.",
    question: "What can remain attached to a durable inquiry after a single document runs out of room?",
    caption: "A public paper or page is a selected projection of an inquiry that may also include experiments, negative results, source records, implementations, formal objects, open questions, and revision history.",
    layout: "hub",
    nodes: [
      { id: "RL-*", label: "Research lane", detail: "Durable continuity of inquiry", primary: true },
      { id: "Q", label: "Governing questions", detail: "What is being asked?" },
      { id: "DEF", label: "Definitions / formal objects", detail: "What structures are in play?" },
      { id: "CLAIM", label: "Claims / hypotheses", detail: "What is being asserted?" },
      { id: "SRC", label: "Sources / prior art", detail: "What anchors and challenges the work?" },
      { id: "EXP", label: "Experiments / controls", detail: "What has actually been tested?" },
      { id: "CODE", label: "Implementations / data / models", detail: "What can be inspected or run?" },
      { id: "NEG", label: "Counterexamples / negative results", detail: "What constrained or broke the claim?" },
      { id: "OPEN", label: "Open questions / defects", detail: "What remains unresolved?" },
      { id: "ART", label: "Artifacts / atlases / transforms", detail: "What formal machinery exists?" },
      { id: "PUB", label: "Publications / briefings", detail: "What is projected to readers?" },
      { id: "RDP", label: "Research Deployment Packets", detail: "What supports transfer and continuation?" },
      { id: "HIST", label: "Events / revision history", detail: "How did the lane change?" },
    ],
    relations: [
      { from: "Sources", to: "Claims", label: "support / challenge" },
      { from: "Experiments", to: "Claims", label: "test" },
      { from: "Negative results", to: "Claims", label: "revise / constrain" },
      { from: "Open defects", to: "Questions", label: "generate next work" },
      { from: "Claims + experiments + sources", to: "Publications", label: "project selected state" },
    ],
    callout: "Paper ≠ whole research object. Public status ≠ automatic claim promotion.",
  },
  "apparatus-stack": {
    eyebrow: "APPARATUS LAYER STACK",
    title: "The Lab machine is federated rather than monolithic.",
    question: "Where does authority live when registries, transforms, instruments, evidence, and public pages all touch the same work?",
    caption: "The public site sits at the top of a larger stack: source state, durable identities, registries and contracts, relations and transforms, operator instruments, evidence and history, then bounded public projections. Authority remains anchored in the owning sources.",
    layout: "stack",
    nodes: [
      { id: "L0", label: "Source state", detail: "Files · code · data · local research objects", primary: true },
      { id: "L1", label: "Durable identities", detail: "RL · PROD · EXP · PUB · ATLAS · XFORM · EVENT · MACH" },
      { id: "L2", label: "Registries + contracts", detail: "Addresses · classes · owners · lifecycle · authority" },
      { id: "L3", label: "Relations + transforms", detail: "Typed edges · adapters · preservation / loss contracts" },
      { id: "L4", label: "Operators + instruments", detail: "Queues · validators · Corpus Forge · Observatory · Workbench" },
      { id: "L5", label: "Evidence + history", detail: "Claims · sources · events · receipts · revision state" },
      { id: "L6", label: "Public projections", detail: "Snapshot · Research · Apparatus · Publications · Open Lab" },
    ],
    relations: [
      { from: "Source state", to: "Durable identities", label: "assigns addressable continuity" },
      { from: "Identities", to: "Registries / contracts", label: "declares ownership and authority" },
      { from: "Contracts", to: "Relations / transforms", label: "constrains connection" },
      { from: "Transforms", to: "Operators / instruments", label: "supports bounded operation" },
      { from: "Operations", to: "Evidence / history", label: "leaves witnesses and receipts" },
      { from: "Evidence / history", to: "Public projections", label: "supports bounded rendering" },
    ],
    callout: "Authority flows from owning sources upward as bounded projection—not from the public layer downward.",
  },
};

export function RegistrarArchitectureDiagram({ variant, compact = false }: { variant: RegistrarArchitectureVariant; compact?: boolean }) {
  const diagram = diagrams[variant];
  const titleId = "registrar-diagram-" + variant + "-title";
  return (
    <figure className={styles.figure} data-layout={diagram.layout} data-compact={compact ? "true" : "false"} aria-labelledby={titleId}>
      <header className={styles.header}>
        <span>{diagram.eyebrow}</span>
        <h3 id={titleId}>{diagram.title}</h3>
        <p>{diagram.question}</p>
      </header>
      <div className={styles.nodeField} aria-label="Architecture nodes">
        {diagram.nodes.map((node, index) => (
          <article className={styles.node} data-primary={node.primary ? "true" : "false"} key={node.id}>
            <span>{node.id}</span><strong>{node.label}</strong><p>{node.detail}</p>
            {diagram.layout === "flow" && index < diagram.nodes.length - 1 ? <i aria-hidden="true">→</i> : null}
          </article>
        ))}
      </div>
      <div className={styles.relations}>
        <span>DECLARED RELATIONSHIPS</span>
        <ul>{diagram.relations.map((r) => <li key={r.from+r.to+r.label}><strong>{r.from}</strong><b aria-hidden="true">→</b><strong>{r.to}</strong><em>{r.label}</em></li>)}</ul>
      </div>
      <aside className={styles.callout}>{diagram.callout}</aside>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
