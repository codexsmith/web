export const youtubeKnowledgeExplorerProduct = {
  family: "KNOWLEDGE NAVIGATION / CONSUMER SOFTWARE",
  name: "YouTube Knowledge Explorer",
  tagline: "Turn a long video into navigable knowledge.",
  lead:
    "Start with the source. Preserve timestamps. Search evidence, inspect concepts, and ask questions whose claims stay bound to the transcript.",
  status: "ACTIVE BUILD · PORTABLE MVP",
  statusNote:
    "A working portable core exists for source parsing, transcripts, outlines, search, evidence-bound answers, persistence, and interchange. Repeated use, retention, pricing, and product-market fit remain unestablished.",
  theme: "explorer",
} as const;

export const youtubeKnowledgeExplorerNav = [
  { href: "#source", label: "Source" },
  { href: "#workspace", label: "Workspace" },
  { href: "#answers", label: "Evidence answers" },
  { href: "#portable", label: "Portable core" },
  { href: "#evidence", label: "Product state" },
] as const;

export const explorerModes = [
  {
    id: "outline",
    label: "Outline",
    kicker: "KNOWLEDGE MAP",
    title: "Turn time into structure.",
    description:
      "A deterministic outline groups timestamped transcript segments into navigable sections without requiring a language model.",
    question: "Where in the source does this idea begin, change, and recur?",
  },
  {
    id: "search",
    label: "Search",
    kicker: "EVIDENCE RETRIEVAL",
    title: "Search the source, not a detached summary.",
    description:
      "Text and concept search return matching transcript segments with timestamps and a direct path back to the original video.",
    question: "Which exact moments support the thing I am looking for?",
  },
  {
    id: "concepts",
    label: "Concepts",
    kicker: "ENRICHMENT LAYER",
    title: "See recurring ideas without losing provenance.",
    description:
      "Concepts are portable enrichment objects linked to the transcript segments and outline topics that support them.",
    question: "What ideas organize this source, and where is each one evidenced?",
  },
  {
    id: "ask",
    label: "Ask",
    kicker: "EVIDENCE-BOUND ANSWER",
    title: "Let synthesis point back to evidence.",
    description:
      "An answer is a set of claims plus evidence segment IDs—not a free-floating chat string. Unsupported evidence references are rejected.",
    question: "Can this question be answered from this source without inventing support?",
  },
  {
    id: "trace",
    label: "Trace",
    kicker: "SOURCE CLOSURE",
    title: "Keep every answer one click from the source.",
    description:
      "Source identity, transcript excerpts, timestamps, topics, concepts, claims, and exported artifacts remain connected by explicit references.",
    question: "Can I reconstruct how this knowledge object came from the original video?",
  },
] as const;

export type ExplorerModeId = (typeof explorerModes)[number]["id"];

export const explorerPipeline = [
  ["01", "YouTube source", "Stable source identity and canonical URL."],
  ["02", "Transcript", "Authorized captions or an imported VTT/SRT source."],
  ["03", "Timestamped segments", "Normalized evidence units with start and end times."],
  ["04", "Knowledge map", "A deterministic topic / outline projection over the source."],
  ["05", "Concepts + search", "Portable enrichment and evidence-linked retrieval."],
  ["06", "Evidence answers", "Claims that must cite source segments or return insufficient evidence."],
  ["07", "Saved exploration", "A portable source + transcript + map + enrichment artifact."],
] as const;

export const explorerWorkspace = [
  {
    label: "OUTLINE",
    title: "Navigate the argument",
    description:
      "Jump between sections without flattening a 90-minute source into one summary.",
  },
  {
    label: "TRANSCRIPT",
    title: "Search and jump",
    description:
      "Find words, phrases, and concepts, then open the exact timestamp that contains the evidence.",
  },
  {
    label: "CONCEPTS",
    title: "Follow recurring ideas",
    description:
      "Concepts link back to the supporting transcript and topics rather than becoming detached tags.",
  },
  {
    label: "ASK",
    title: "Answer from bounded evidence",
    description:
      "Hosted synthesis is optional; the product can fall back to deterministic extractive answers.",
  },
] as const;

export const explorerArchitecture = [
  ["Portable contracts", "Source, transcript, map, concepts, answers, saved exploration."],
  ["Pure domain core", "Parsing, normalization, outline derivation, admissibility, package validation."],
  ["Application use cases", "Explore, search, ask, save, load, import, export."],
  ["Replaceable ports", "Metadata, transcript, enrichment, search, answering, persistence."],
  ["Adapters", "YouTube APIs, browser storage, local files, hosted or deterministic answering."],
] as const;

export const explorerEvidenceRules = [
  ["Evidence IDs", "Every answered claim names one or more transcript segment IDs."],
  ["Exact excerpts", "Displayed source excerpts are reconstructed from the loaded transcript, not authored by a model."],
  ["Timestamps", "Evidence remains jumpable back to the source moment."],
  ["Known graph only", "Topic and concept references must resolve inside the current exploration."],
  ["Insufficient evidence", "When the source does not support an answer, the valid result is to say so."],
] as const;

export const explorerClaimFirewall = [
  "Not every YouTube video exposes captions that can be lawfully acquired.",
  "A source-linked answer is not automatically a true statement about the world beyond that source.",
  "The current concept layer is useful enrichment, not a complete ontology of the video.",
  "The product does not claim to replace watching, reading, or interpreting the original source.",
  "Repeated use, retention, willingness to pay, market demand, and product-market fit remain unestablished.",
] as const;
