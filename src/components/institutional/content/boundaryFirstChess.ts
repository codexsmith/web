export const boundaryFirstChessProduct = {
  family: "LEARNING PRODUCT / RESEARCH TESTBED",
  name: "Boundary-First Chess",
  tagline: "A Field Guide for Seeing the Board.",
  lead:
    "A visual teaching framework for players who know the rules of chess but still struggle to see what changed after a move.",
  status: "RESEARCH PRODUCT · PUBLIC PREVIEW",
  statusNote:
    "A developed manuscript, pedagogy, worked examples, analyzer research, and evaluation plan exist. Learning efficacy, rating improvement, market demand, and analyzer superiority remain unestablished.",
  theme: "chess",
} as const;

export const boundaryFirstChessNav = [
  { href: "#method", label: "The lens" },
  { href: "#field-guide", label: "Field guide" },
  { href: "#analyzer", label: "Analyzer" },
  { href: "#evidence", label: "Evidence" },
  { href: "#release", label: "Release path" },
] as const;

export const chessLenses = [
  {
    id: "create",
    label: "Create",
    kicker: "BUILD THE BOUNDARY",
    title: "What safe operating region exists now?",
    description:
      "Read control, protection, blockage, and coordinated coverage as structure—not just as isolated defended squares.",
    question: "What became safer, more controlled, or harder to cross?",
    primary: ["g1", "f2", "g2", "h2"],
    secondary: ["f1", "h1", "e2", "e3"],
  },
  {
    id: "repair",
    label: "Repair",
    kicker: "RESTORE INTEGRITY",
    title: "What is carrying defensive obligation?",
    description:
      "A position can remain legal while accumulating repair debt. Look for pieces, squares, or lines that must be stabilized before another plan can safely continue.",
    question: "What leak, loose relation, or urgent obligation must be repaired?",
    primary: ["f2", "e4", "c3", "f3"],
    secondary: ["g1", "g2", "h2", "d3"],
  },
  {
    id: "weaken",
    label: "Weaken",
    kicker: "REDUCE INTEGRITY",
    title: "Where is the structure becoming easier to cross?",
    description:
      "Weakness is not only a hanging piece. A square, defender, pawn shell, or transport lane can become less able to contain the opponent.",
    question: "What became easier for the opponent after the last structural change?",
    primary: ["f7", "e5", "c6"],
    secondary: ["g7", "d6", "e6", "d5"],
  },
  {
    id: "exploit",
    label: "Exploit",
    kicker: "CROSS WITH TEMPO",
    title: "Which defect can become consequence now?",
    description:
      "The c4–f7 diagonal is a familiar chess relation. The Boundary-First question is when that relation becomes crossable fast enough to matter.",
    question: "Which weakness can be converted before the opponent repairs it?",
    primary: ["c4", "d5", "e6", "f7"],
    secondary: ["f7", "g8"],
  },
  {
    id: "transform",
    label: "Transform",
    kicker: "CHANGE THE REGIME",
    title: "What would make this a different kind of position?",
    description:
      "Pawn breaks, trades, castling, sacrifices, and promotion threats can change the operating logic rather than merely improve one local feature.",
    question: "What move would rewrite the lanes, envelopes, or obligations that organize the position?",
    primary: ["d4", "e4", "e5", "d5"],
    secondary: ["c3", "f3", "c6", "f6"],
  },
] as const;

export type ChessLensId = (typeof chessLenses)[number]["id"];

export const chessGrammar = [
  ["Create", "Establish control, protection, blockage, a corridor, or a safe operating region."],
  ["Repair", "Restore integrity after a weakness, threat, pin, exposure, or coordination defect appears."],
  ["Weaken", "Reduce the integrity of a line, square complex, defender, or safety envelope."],
  ["Exploit", "Convert an existing weakness into a concrete consequence before repair arrives."],
  ["Transform", "Change the operating structure through trades, opening lines, sacrifice, castling, pawn breaks, or promotion threats."],
] as const;

export const chessFieldGuideObjects = [
  {
    index: "01",
    title: "The field guide",
    status: "MANUSCRIPT EXISTS",
    description:
      "A developed book-length teaching manuscript that organizes king safety, pawn shells, transport lanes, weak squares, open files, diagonals, repair, and positional change into one learner-facing grammar.",
  },
  {
    index: "02",
    title: "The doctrine sheet",
    status: "READY TO PACKAGE",
    description:
      "A compact study surface built around one recurring question: what opened, closed, weakened, became safer, or now requires repair?",
  },
  {
    index: "03",
    title: "Annotated examples",
    status: "SOURCE MATERIAL EXISTS",
    description:
      "Worked games and positions where conventional chess language stays visible while the structural interpretation is layered on top.",
  },
  {
    index: "04",
    title: "Exercises + diagrams",
    status: "NEXT PRODUCTION GATE",
    description:
      "Find the broken boundary, identify the repair obligation, compare candidate moves, and explain what changed without replacing calculation.",
  },
] as const;

export const chessAnalyzerLayers = [
  ["01 · BOARD TRUTH", "What position actually exists?", "Legal state, exact move sequence, side to move, and reproducible FEN/PGN remain the authority surface."],
  ["02 · ESTABLISHED ANALYSIS", "What does ordinary chess analysis say?", "Engine evaluation, principal variation, tactical facts, and conventional positional language remain separate and visible."],
  ["03 · BOUNDARY-FIRST INTERPRETATION", "What structural change does the candidate grammar describe?", "Envelope, transport, defect, closure, tempo, regime change, and repair are explanatory annotations—not replacements for board truth."],
  ["04 · DISAGREEMENT", "Where does the new representation fail or add nothing?", "Redundancy, disagreement, ambiguity, counterexamples, and misleading explanations are retained as research evidence."],
] as const;

export const chessEvidenceGates = [
  ["Annotation reliability", "Can independent annotators apply a bounded label set consistently?"],
  ["Chess fidelity", "Does the added explanation preserve tactical and positional correctness?"],
  ["Incremental usefulness", "Does it help a learner notice or retain something beyond conventional explanation alone?"],
  ["Counterexamples", "Which terms become redundant, unstable, misleading, or too expensive to use?"],
] as const;

export const chessNotClaimed = [
  "Proven rating improvement",
  "Engine superiority",
  "A validated model of human chess cognition",
  "A universal chess ontology",
  "Replacement of conventional chess language",
  "General validation of Boundary Theory",
] as const;
