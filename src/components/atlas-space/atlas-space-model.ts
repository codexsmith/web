export type AtlasRelationKind = "structural" | "candidate" | "invariant";
export type AtlasConnectorKind = "through" | "keyed" | "test";
export type AtlasBoardPattern = "ruled" | "wave" | "logic" | "docket";

export type AtlasPosition = {
  x: number;
  y: number;
};

export type AtlasFiber = {
  id: string;
  label: string;
  relationKind: AtlasRelationKind;
  connectorKind: AtlasConnectorKind;
  statement: string;
  position: AtlasPosition;
};

export type AtlasAnchor = {
  fiberId: string;
  label: string;
  note: string;
};

export type AtlasBoardHardware = {
  rackCode: string;
  mark: string;
  registry: string;
  pattern: AtlasBoardPattern;
};

export type AtlasLayer = {
  id: string;
  label: string;
  kicker: string;
  description: string;
  hardware: AtlasBoardHardware;
  anchors: AtlasAnchor[];
};

export type AtlasSpaceModel = {
  id: string;
  title: string;
  summary: string;
  thesis: string;
  layers: AtlasLayer[];
  fibers: AtlasFiber[];
};

export const relationKindLabels: Record<AtlasRelationKind, string> = {
  structural: "Structural correspondence",
  candidate: "Candidate correspondence",
  invariant: "Invariant",
};

export const connectorKindLabels: Record<AtlasConnectorKind, string> = {
  through: "THR / through-channel",
  keyed: "KEY / gated channel",
  test: "TST / diagnostic jumper",
};

export const defaultAtlasSpaceModel: AtlasSpaceModel = {
  id: "boundary-first-atlas-space",
  title: "Atlas Space",
  summary:
    "A layered view of mounted Library domains and the typed correspondences that connect their local representations.",
  thesis: "A bit is the minimal executable form of a bound distinction.",
  fibers: [
    {
      id: "bound-distinction",
      label: "Bound distinction",
      relationKind: "structural",
      connectorKind: "through",
      statement:
        "Each mounted domain binds a distinction locally. The fiber records a shared representational operation without claiming the local objects are identical.",
      position: { x: 18, y: 27 },
    },
    {
      id: "state",
      label: "State",
      relationKind: "structural",
      connectorKind: "through",
      statement:
        "Each mounted domain carries a local notion of state: what can be observed, occupied, asserted, or updated within that representation.",
      position: { x: 70, y: 22 },
    },
    {
      id: "admissibility",
      label: "Admissibility",
      relationKind: "structural",
      connectorKind: "keyed",
      statement:
        "The local vocabulary changes, but each mounted domain constrains which states, transitions, or claims may enter the represented system.",
      position: { x: 27, y: 73 },
    },
    {
      id: "closure",
      label: "Closure",
      relationKind: "candidate",
      connectorKind: "test",
      statement:
        "Closure is intentionally marked as a working cross-domain correspondence. The visualization preserves uncertainty rather than flattening it into identity.",
      position: { x: 75, y: 72 },
    },
  ],
  layers: [
    {
      id: "mathematics",
      label: "Mathematics & logic",
      kicker: "Mounted exemplar / Formal systems",
      description:
        "A mounted Library domain beneath the Formal systems family, with conceptual charts for cuts, state spaces, domains, operators, and related mathematical structures.",
      hardware: {
        rackCode: "MTH-F01",
        mark: "M",
        registry: "FORMAL / MATH+LOGIC / OPERATOR",
        pattern: "ruled",
      },
      anchors: [
        { fiberId: "bound-distinction", label: "Cut / partition", note: "A local mathematical expression of separation into distinguishable regions or classes." },
        { fiberId: "state", label: "Point / element", note: "A locally represented position or member within the chosen mathematical state space." },
        { fiberId: "admissibility", label: "Domain / constraint", note: "Conditions that determine where an operation, map, or construction is defined." },
        { fiberId: "closure", label: "Closure operator", note: "A canonical formal instance of completion relative to a specified structure." },
      ],
    },
    {
      id: "physics",
      label: "Physics",
      kicker: "Mounted exemplar / Natural systems",
      description:
        "A mounted Library domain beneath the Natural systems family, with conceptual charts for physical state, interfaces, boundary conditions, conservation, and transport.",
      hardware: {
        rackCode: "PHY-N02",
        mark: "P",
        registry: "NATURAL / PHYSICS / TRANSPORT",
        pattern: "wave",
      },
      anchors: [
        { fiberId: "bound-distinction", label: "Boundary / interface", note: "A surface or transition at which physical regions, phases, or descriptions are distinguished." },
        { fiberId: "state", label: "Physical state", note: "The represented configuration used to describe a physical system at a chosen scale." },
        { fiberId: "admissibility", label: "Boundary conditions", note: "Constraints that select physically or mathematically admissible solutions." },
        { fiberId: "closure", label: "Closure relation", note: "A working bridge to the extra assumptions or relations needed to close a physical description." },
      ],
    },
    {
      id: "computation",
      label: "AI & computation",
      kicker: "Mounted exemplar / Engineered systems",
      description:
        "A mounted Library domain beneath the Engineered systems family, with conceptual charts for bits, predicates, machine states, types, guards, and executable transitions.",
      hardware: {
        rackCode: "CMP-E03",
        mark: "C",
        registry: "ENGINEERED / AI+COMPUTATION / EXECUTION",
        pattern: "logic",
      },
      anchors: [
        { fiberId: "bound-distinction", label: "Bit / predicate", note: "The minimal executable distinction and one of its common operational forms." },
        { fiberId: "state", label: "Machine state", note: "A bounded representation of the information required to continue execution." },
        { fiberId: "admissibility", label: "Type / guard", note: "Executable constraints on values, transitions, or operations." },
        { fiberId: "closure", label: "Commit / termination", note: "A provisional software-side expression of bounded completion; intentionally not treated as identity with formal closure." },
      ],
    },
    {
      id: "law",
      label: "Law & governance",
      kicker: "Mounted exemplar / Linguistic systems",
      description:
        "A mounted Library domain beneath the Linguistic systems family, with conceptual charts for classifications, legal status, jurisdiction, standing, procedure, and finality.",
      hardware: {
        rackCode: "LAW-L04",
        mark: "L",
        registry: "LINGUISTIC / LAW+GOVERNANCE / PROCEDURE",
        pattern: "docket",
      },
      anchors: [
        { fiberId: "bound-distinction", label: "Classification", note: "A legal distinction that changes which rules, rights, duties, or procedures attach." },
        { fiberId: "state", label: "Legal status", note: "A represented legal condition that carries consequences within a governing framework." },
        { fiberId: "admissibility", label: "Jurisdiction / standing", note: "Conditions determining whether a forum, claim, party, or procedure is admissible." },
        { fiberId: "closure", label: "Finality", note: "A working correspondence for when a legal process becomes bounded against further ordinary transition." },
      ],
    },
  ],
};
