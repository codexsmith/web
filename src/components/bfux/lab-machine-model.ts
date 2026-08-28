export type LabMachineNodeKind =
  | "core"
  | "attachment"
  | "pipeline"
  | "package"
  | "publication"
  | "transparent"
  | "authority"
  | "record"
  | "identity"
  | "service"
  | "output";

export type LabMachineNode = {
  id: string;
  label: string;
  question: string;
  boundary: string;
  kind: LabMachineNodeKind;
  tone: string;
  state?: string;
  meta?: string[];
  area: string;
};

export type LabMachineEdge = {
  from: string;
  to: string;
  relation: string;
  kind: "feeds" | "attaches" | "constrains" | "records" | "serves";
};

export type LabMachineRelation = {
  edge: LabMachineEdge;
  direction: "inbound" | "outbound";
  other: LabMachineNode;
};

export const labMachineNodes: LabMachineNode[] = [
  { id:"products", label:"Products", question:"WHAT WE BUILD", boundary:"What the Lab builds, ships, pilots, or deliberately keeps at concept status.", kind:"package", tone:"red", state:"BUILDING", meta:["stage · in flight","ownership · stewarded"], area:"products" },
  { id:"publications", label:"Publications", question:"WHAT WE PUBLISH", boundary:"Where research and doctrine become versioned public artifacts with explicit maturity.", kind:"publication", tone:"green", state:"PUBLISHED", meta:["maturity · mixed","review · ongoing"], area:"publications" },
  { id:"applications", label:"Applications", question:"WHERE IT'S APPLIED", boundary:"Where methods and artifacts are applied to real-world domains and problems.", kind:"package", tone:"cyan", state:"APPLIED", meta:["domain · multiple","impact · real world"], area:"applications" },
  { id:"method", label:"Method", question:"HOW IT WORKS", boundary:"Where the Lab's method, mechanics, and processes are defined and refined.", kind:"attachment", tone:"green", state:"DEFINED", meta:["type · attachment","interface · standard"], area:"method" },
  { id:"pipeline", label:"Pipeline", question:"HOW WORK MOVES", boundary:"The workstream that moves ideas from inquiry to vetted, maintainable artifacts.", kind:"pipeline", tone:"green", state:"FLOWING", meta:["queue · active","quality · gated"], area:"pipeline" },
  { id:"research", label:"Research", question:"CORE POWER SOURCE", boundary:"Where claims, methods, mechanisms, and formal structure are developed and tested.", kind:"core", tone:"violet", state:"ACTIVE", meta:["methods · formal","evidence · required"], area:"research" },
  { id:"about", label:"About", question:"WHO WE ARE", boundary:"Where institutional identity, method, provenance, and contact remain inspectable.", kind:"identity", tone:"amber", state:"STABLE", meta:["identity · verified","provenance · traceable"], area:"about" },
  { id:"people", label:"People", question:"WHO PARTICIPATES", boundary:"Where collaborators, roles, and contributors are recognized with explicit context.", kind:"transparent", tone:"blue", state:"ACTIVE", meta:["type · network","visibility · transparent"], area:"people" },
  { id:"governance", label:"Governance", question:"HOW IT'S GOVERNED", boundary:"Where authority, stewardship, policies, and repair mechanisms are documented.", kind:"authority", tone:"slate", state:"ENFORCED", meta:["authority · distributed","policies · versioned"], area:"governance" },
  { id:"timeline", label:"Timeline", question:"WHEN IT HAPPENED", boundary:"Where the Lab's development is recorded as an inspectable sequence of events.", kind:"record", tone:"slate", state:"RECORDING", meta:["order · chronological","granularity · variable"], area:"timeline" },
  { id:"service", label:"Service Bus", question:"DISSEMINATION", boundary:"Standards, tools, APIs, integrations, and guidance that carry applied work outward.", kind:"service", tone:"cyan", area:"service" },
  { id:"public-value", label:"Public Value", question:"OUTPUT", boundary:"Useful capability made available beyond the Lab boundary.", kind:"output", tone:"cyan", area:"value" },
];

export const labMachineEdges: LabMachineEdge[] = [
  { from:"method", to:"research", relation:"structures", kind:"attaches" },
  { from:"pipeline", to:"research", relation:"moves work", kind:"attaches" },
  { from:"about", to:"research", relation:"identifies", kind:"attaches" },
  { from:"research", to:"products", relation:"develops", kind:"feeds" },
  { from:"research", to:"publications", relation:"publishes", kind:"feeds" },
  { from:"research", to:"applications", relation:"applies", kind:"feeds" },
  { from:"people", to:"research", relation:"participate", kind:"serves" },
  { from:"governance", to:"research", relation:"constrains", kind:"constrains" },
  { from:"timeline", to:"research", relation:"records", kind:"records" },
  { from:"applications", to:"service", relation:"disseminates", kind:"serves" },
  { from:"service", to:"public-value", relation:"delivers", kind:"serves" },
  { from:"public-value", to:"people", relation:"serves", kind:"serves" },
  { from:"products", to:"applications", relation:"transfers into", kind:"serves" },
];

export function labMachineEdgeKey(edge: LabMachineEdge) {
  return `${edge.from}->${edge.to}`;
}

export function getLabMachineNode(nodeId: string | null | undefined) {
  return nodeId ? labMachineNodes.find((node) => node.id === nodeId) : undefined;
}

export function getLabMachineConnectingEdge(from: string, to: string) {
  return labMachineEdges.find((edge) =>
    (edge.from === from && edge.to === to) || (edge.from === to && edge.to === from),
  );
}

export function getLabMachineRelations(nodeId: string): LabMachineRelation[] {
  return labMachineEdges.flatMap((edge) => {
    if (edge.from === nodeId) {
      const other = getLabMachineNode(edge.to);
      return other ? [{ edge, direction: "outbound" as const, other }] : [];
    }
    if (edge.to === nodeId) {
      const other = getLabMachineNode(edge.from);
      return other ? [{ edge, direction: "inbound" as const, other }] : [];
    }
    return [];
  });
}

export function labMachineMermaid() {
  const safe = (value:string) => value.replaceAll('"', "'");
  const nodes = labMachineNodes.map(n => `  ${n.id.replaceAll('-', '_')}["${safe(n.label)}\\n${safe(n.question)}"]`).join("\n");
  const edges = labMachineEdges.map(e => `  ${e.from.replaceAll('-', '_')} -->|${safe(e.relation)}| ${e.to.replaceAll('-', '_')}`).join("\n");
  return `flowchart TB\n${nodes}\n${edges}`;
}
