import type { AtlasAnchor, AtlasLayer } from "./atlas-space-model";
import { corpusDescriptorForLayer } from "./generated-domain-board";

export type CalibrationDecision = "pending" | "accepted" | "rejected";

export type CalibrationCandidate = {
  fiberId: string;
  localLabel: string;
  localNote: string;
  evidenceSummary: string;
  evidenceLocation: string;
  sourcePath: string;
  evidenceStrength: "direct" | "strong" | "tentative";
};

export type CalibrationDecisionMap = Record<string, CalibrationDecision>;

const biologySource =
  "organized_library_curated/999_Library/03_Domains/02_natural_systems__domain_family/02_biology__domain/01_volumion_biology__research_note.md";

const biologyCandidates: CalibrationCandidate[] = [
  {
    fiberId: "bound-distinction",
    localLabel: "Self-maintaining boundary / Σ",
    localNote:
      "The Biology note represents the biological boundary as an active, self-maintaining regulator of flux rather than a passive container.",
    evidenceSummary:
      "The source defines biological systems through boundary degrees of freedom and repeatedly treats membranes or bounding surfaces as the causally active distinction separating and regulating bulk from environment.",
    evidenceLocation: "Abstract; §1 Membranes are Causal; §2 Volumologic Definition of Life",
    sourcePath: biologySource,
    evidenceStrength: "direct",
  },
  {
    fiberId: "state",
    localLabel: "Biological state / (X, Σ, Φ)",
    localNote:
      "The source's local biological system state is represented by bulk degrees X, boundary degrees Σ, and flux Φ across the boundary.",
    evidenceSummary:
      "Section 2 explicitly models the pre-biotic system as S=(X, Σ, Φ), giving a corpus-backed local state representation without requiring a stronger biological ontology.",
    evidenceLocation: "§2 Volumologic Definition of Life",
    sourcePath: biologySource,
    evidenceStrength: "direct",
  },
  {
    fiberId: "admissibility",
    localLabel: "Closure-stability threshold",
    localNote:
      "The proposed biological regime is admitted only when boundary dynamics possess a stable fixed point with positive stability.",
    evidenceSummary:
      "The Organic Threshold is stated as a condition on boundary evolution: a system counts as organic when the regulated flux and boundary dynamics support a stable fixed point Σ* with Stab(Σ*) > 0.",
    evidenceLocation: "§2 The Organic Threshold; §4.1 Origin as a Fixed Point",
    sourcePath: biologySource,
    evidenceStrength: "strong",
  },
  {
    fiberId: "closure",
    localLabel: "Self-maintaining closure / Σ*",
    localNote:
      "Closure is represented locally as a stable boundary manifold or attractor that repairs and sustains itself against dissipation.",
    evidenceSummary:
      "The note defines life using self-maintaining volumetric closure, calls the closure constraint a dynamical attractor, and identifies emergent closure Σ* as a stable boundary manifold.",
    evidenceLocation: "Abstract; §1 Definition; §2 Closure Bifurcation; §3.1 Emergent Closure",
    sourcePath: biologySource,
    evidenceStrength: "direct",
  },
];

export function calibrationCandidatesForLayer(layerId: string): CalibrationCandidate[] {
  const descriptor = corpusDescriptorForLayer(layerId);
  if (!descriptor?.generated) return [];
  if (descriptor.familyId === "natural" && descriptor.domainId === "biology") return biologyCandidates;
  return [];
}

export function acceptedCalibrationAnchors(
  layerId: string,
  decisions: CalibrationDecisionMap = {},
): AtlasAnchor[] {
  return calibrationCandidatesForLayer(layerId)
    .filter((candidate) => decisions[candidate.fiberId] === "accepted")
    .map((candidate) => ({
      fiberId: candidate.fiberId,
      label: candidate.localLabel,
      note: `${candidate.localNote} Evidence: ${candidate.evidenceLocation}.`,
    }));
}

export function applyCalibrationToGeneratedLayer(
  layer: AtlasLayer,
  decisions: CalibrationDecisionMap = {},
): AtlasLayer {
  const descriptor = corpusDescriptorForLayer(layer.id);
  if (!descriptor?.generated) return layer;

  const candidates = calibrationCandidatesForLayer(layer.id);
  const anchors = acceptedCalibrationAnchors(layer.id, decisions);
  const reviewed = candidates.filter((candidate) => decisions[candidate.fiberId] && decisions[candidate.fiberId] !== "pending").length;

  return {
    ...layer,
    anchors,
    hardware: {
      ...layer.hardware,
      registry:
        candidates.length === 0
          ? `${descriptor.familyCode} / GENERATED / NO CALIBRATION SET`
          : `${descriptor.familyCode} / GENERATED / PORTS ${anchors.length} LIVE / ${reviewed} REVIEWED`,
    },
    description:
      candidates.length === 0
        ? layer.description
        : `Generated corpus shell for ${descriptor.domainLabel}. ${anchors.length} of ${candidates.length} candidate correspondence ports are accepted; unaccepted ports remain physically unterminated.`,
  };
}
