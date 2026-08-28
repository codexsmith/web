export type RecursiveAtlasNode = {
  id: string;
  code: string;
  label: string;
  note: string;
  x: number;
  y: number;
  fiberId?: string;
  child?: RecursiveAtlasChart;
};

export type RecursiveAtlasEdge = {
  from: string;
  to: string;
  label?: string;
};

export type RecursiveAtlasChart = {
  id: string;
  label: string;
  registry: string;
  note: string;
  nodes: RecursiveAtlasNode[];
  edges: RecursiveAtlasEdge[];
};

const physicsFieldChart: RecursiveAtlasChart = {
  id: "physics-field",
  label: "Field chart",
  registry: "FIELD / SUPPORT / SOURCE",
  note: "A second recursive level inside the Physics atlas. The field remains a local chart while some of its regions still terminate on the shared cross-atlas fibers.",
  nodes: [
    { id: "support", code: "F1", label: "Support / region", note: "The bounded region over which the represented field is defined.", x: 17, y: 22, fiberId: "bound-distinction" },
    { id: "value", code: "F2", label: "Field value", note: "A local represented value or configuration at a point or region.", x: 79, y: 20, fiberId: "state" },
    { id: "operator", code: "F3", label: "Differential operator", note: "A local operation relating variation of the field to neighboring state.", x: 50, y: 48 },
    { id: "source", code: "F4", label: "Source / constraint", note: "A local source term or constraint that restricts admissible field behavior.", x: 19, y: 78, fiberId: "admissibility" },
    { id: "conservation", code: "F5", label: "Conservation envelope", note: "A provisional completion relation used to test whether represented transport is closed.", x: 80, y: 77, fiberId: "closure" },
  ],
  edges: [
    { from: "support", to: "operator" },
    { from: "value", to: "operator" },
    { from: "source", to: "operator" },
    { from: "operator", to: "conservation" },
  ],
};

export const recursiveAtlasRoots: Record<string, RecursiveAtlasChart> = {
  mathematics: {
    id: "mathematics-operator",
    label: "Map / operator chart",
    registry: "SOURCE / MAP / CODOMAIN",
    note: "A local chart for following a mathematical object through a declared map while keeping domain, state, and closure conditions explicit.",
    nodes: [
      { id: "partition", code: "M1", label: "Partition / equivalence", note: "The distinction structure that determines which objects are treated as locally distinguishable.", x: 17, y: 22, fiberId: "bound-distinction" },
      { id: "element", code: "M2", label: "Source element", note: "The represented state presented to the local operator.", x: 79, y: 20, fiberId: "state" },
      { id: "map", code: "M3", label: "Map / operator", note: "The domain-local transformation applied to the represented object.", x: 50, y: 48 },
      { id: "domain", code: "M4", label: "Domain / constraint", note: "The conditions under which the map is defined and admissible.", x: 19, y: 78, fiberId: "admissibility" },
      { id: "completion", code: "M5", label: "Completion / fixed structure", note: "The local completion condition against which the transformation may be tested.", x: 80, y: 77, fiberId: "closure" },
    ],
    edges: [
      { from: "partition", to: "map" },
      { from: "element", to: "map" },
      { from: "domain", to: "map" },
      { from: "map", to: "completion" },
    ],
  },
  physics: {
    id: "physics-transport",
    label: "Transport / evolution chart",
    registry: "FIELD / FLUX / INTERFACE",
    note: "A local chart for following represented physical state through transport, interface, and boundary-condition structure.",
    nodes: [
      { id: "interface", code: "P1", label: "Boundary / interface", note: "The local surface at which transport crosses or changes represented regime.", x: 17, y: 22, fiberId: "bound-distinction" },
      { id: "field", code: "P2", label: "Field / physical state", note: "The state-bearing field being transported or evolved on this chart.", x: 79, y: 20, fiberId: "state", child: physicsFieldChart },
      { id: "flux", code: "P3", label: "Flux / transport law", note: "The local operation carrying represented state through time, space, or an interface.", x: 50, y: 48 },
      { id: "conditions", code: "P4", label: "Boundary conditions", note: "Constraints selecting which local evolutions are admissible.", x: 19, y: 78, fiberId: "admissibility" },
      { id: "closure", code: "P5", label: "Closure relation", note: "A working completion relation needed to close the represented physical description.", x: 80, y: 77, fiberId: "closure" },
    ],
    edges: [
      { from: "interface", to: "flux" },
      { from: "field", to: "flux" },
      { from: "conditions", to: "flux" },
      { from: "flux", to: "closure" },
    ],
  },
  computation: {
    id: "computation-execution",
    label: "Transition / execution chart",
    registry: "STATE / GUARD / TRANSITION",
    note: "A local executable chart in which state is transformed only through represented predicates, guards, and termination conditions.",
    nodes: [
      { id: "predicate", code: "C1", label: "Predicate / branch distinction", note: "A bound executable distinction controlling which transition path is available.", x: 17, y: 22, fiberId: "bound-distinction" },
      { id: "machine-state", code: "C2", label: "Machine state", note: "The bounded information required to continue execution.", x: 79, y: 20, fiberId: "state" },
      { id: "transition", code: "C3", label: "Instruction / transition", note: "The local executable operation that changes machine state.", x: 50, y: 48 },
      { id: "guard", code: "C4", label: "Type / guard", note: "Executable constraints determining whether a value or transition is admissible.", x: 19, y: 78, fiberId: "admissibility" },
      { id: "commit", code: "C5", label: "Commit / termination", note: "A provisional bounded completion state for the local execution path.", x: 80, y: 77, fiberId: "closure" },
    ],
    edges: [
      { from: "predicate", to: "transition" },
      { from: "machine-state", to: "transition" },
      { from: "guard", to: "transition" },
      { from: "transition", to: "commit" },
    ],
  },
  law: {
    id: "law-procedure",
    label: "Procedure / disposition chart",
    registry: "STATUS / AUTHORITY / FINALITY",
    note: "A local procedural chart showing how legal status changes only through represented classifications, authority conditions, and authorized transitions.",
    nodes: [
      { id: "classification", code: "L1", label: "Classification", note: "The legal distinction that determines which rights, duties, or procedures attach.", x: 17, y: 22, fiberId: "bound-distinction" },
      { id: "status", code: "L2", label: "Legal status", note: "The represented legal condition carried into the procedure.", x: 79, y: 20, fiberId: "state" },
      { id: "procedure", code: "L3", label: "Procedure / disposition", note: "The authorized local operation that changes represented legal status.", x: 50, y: 48 },
      { id: "jurisdiction", code: "L4", label: "Jurisdiction / standing", note: "Authority and party conditions determining whether the procedure is admissible.", x: 19, y: 78, fiberId: "admissibility" },
      { id: "finality", code: "L5", label: "Finality", note: "A working local completion condition against further ordinary transition.", x: 80, y: 77, fiberId: "closure" },
    ],
    edges: [
      { from: "classification", to: "procedure" },
      { from: "status", to: "procedure" },
      { from: "jurisdiction", to: "procedure" },
      { from: "procedure", to: "finality" },
    ],
  },
};
