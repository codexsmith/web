import type { AtlasBoardPattern, AtlasLayer } from "./atlas-space-model";
import { acceptedCalibrationAnchors } from "./domain-calibration";
import {
  atlasCorpusFamilies,
  corpusMountForLayer,
  type AtlasCorpusDomain,
  type AtlasCorpusFamily,
  type AtlasCorpusMount,
} from "./lab-corpus-atlas";

export type AtlasCorpusLayerDescriptor = AtlasCorpusMount & {
  generated: boolean;
};

const patternByFamily: Record<string, AtlasBoardPattern> = {
  formal: "ruled",
  natural: "wave",
  engineered: "logic",
  linguistic: "docket",
};

export function generatedLayerIdForDomain(familyId: string, domainId: string) {
  return `generated--${familyId}--${domainId}`;
}

export function resolveGeneratedDomainLayer(layerId: string) {
  if (!layerId.startsWith("generated--")) return undefined;
  const [, familyId, domainId] = layerId.split("--");
  if (!familyId || !domainId) return undefined;

  const family = atlasCorpusFamilies.find((candidate) => candidate.id === familyId);
  const domain = family?.domains.find((candidate) => candidate.id === domainId);
  return family && domain ? { family, domain } : undefined;
}

function boardMark(label: string) {
  const initials = label
    .split(/[\s&,/]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return initials || "?";
}

export function generateDomainBoardShell(family: AtlasCorpusFamily, domain: AtlasCorpusDomain): AtlasLayer {
  const layerId = generatedLayerIdForDomain(family.id, domain.id);
  const layer = {
    id: layerId,
    label: domain.label,
    kicker: "Generated corpus shell",
    description:
      `Provisional board shell fabricated from canonical corpus metadata for ${domain.label}. ` +
      "Semantic correspondence ports remain open until accepted through the calibration bench.",
    hardware: {
      rackCode: `${domain.code}-G`,
      mark: boardMark(domain.label),
      registry: `${family.code} / GENERATED / CALIBRATION BENCH`,
      pattern: patternByFamily[family.id] ?? "ruled",
    },
  } as Omit<AtlasLayer, "anchors"> & { anchors?: AtlasLayer["anchors"] };

  Object.defineProperty(layer, "anchors", {
    enumerable: true,
    configurable: false,
    get: () => acceptedCalibrationAnchors(layerId),
  });

  return layer as AtlasLayer;
}

export function corpusDescriptorForLayer(layerId: string): AtlasCorpusLayerDescriptor | undefined {
  const mounted = corpusMountForLayer(layerId);
  if (mounted) return { ...mounted, generated: false };

  const generated = resolveGeneratedDomainLayer(layerId);
  if (!generated) return undefined;

  const { family, domain } = generated;
  return {
    familyId: family.id,
    familyCode: family.code,
    familyLabel: family.label,
    domainId: domain.id,
    domainCode: domain.code,
    domainLabel: domain.label,
    familySourcePath: family.sourcePath,
    domainSourcePath: `${family.sourcePath}/${domain.sourcePath}`,
    inventory: [],
    generated: true,
  };
}
