import { labCorpusAuthority } from "./lab-corpus-atlas";
import type { AtlasCorpusLayerDescriptor } from "./generated-domain-board";
import type {
  CalibrationCandidate,
  CalibrationDecision,
  CalibrationDecisionMap,
} from "./domain-calibration";

export const ATLAS_CALIBRATION_SCHEMA_VERSION = "1.0" as const;
export const ATLAS_CALIBRATION_STORAGE_KEY = "bf-atlas-calibration-ledger:v1";

export type AtlasCalibrationRecord = {
  schemaVersion: typeof ATLAS_CALIBRATION_SCHEMA_VERSION;
  recordId: string;
  recordedAt: string;
  layerId: string;
  familyId: string;
  familyCode: string;
  domainId: string;
  domainCode: string;
  domainLabel: string;
  fiberId: string;
  localLabel: string;
  decision: CalibrationDecision;
  evidence: {
    strength: CalibrationCandidate["evidenceStrength"];
    summary: string;
    location: string;
  };
  source: {
    repository: string;
    path: string;
    blobSha: string;
  };
  corpus: {
    atlasPath: string;
    atlasGeneratedAt: string;
    fingerprint: string;
  };
};

function recordId(layerId: string, fiberId: string, recordedAt: string) {
  const entropy =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);
  return `${layerId}:${fiberId}:${recordedAt}:${entropy}`;
}

function isCalibrationDecision(value: unknown): value is CalibrationDecision {
  return value === "pending" || value === "accepted" || value === "rejected";
}

function isCalibrationRecord(value: unknown): value is AtlasCalibrationRecord {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AtlasCalibrationRecord>;
  return (
    candidate.schemaVersion === ATLAS_CALIBRATION_SCHEMA_VERSION &&
    typeof candidate.recordId === "string" &&
    typeof candidate.recordedAt === "string" &&
    typeof candidate.layerId === "string" &&
    typeof candidate.fiberId === "string" &&
    isCalibrationDecision(candidate.decision)
  );
}

export function createCalibrationRecord({
  layerId,
  descriptor,
  candidate,
  decision,
  recordedAt = new Date().toISOString(),
}: {
  layerId: string;
  descriptor: AtlasCorpusLayerDescriptor;
  candidate: CalibrationCandidate;
  decision: CalibrationDecision;
  recordedAt?: string;
}): AtlasCalibrationRecord {
  return {
    schemaVersion: ATLAS_CALIBRATION_SCHEMA_VERSION,
    recordId: recordId(layerId, candidate.fiberId, recordedAt),
    recordedAt,
    layerId,
    familyId: descriptor.familyId,
    familyCode: descriptor.familyCode,
    domainId: descriptor.domainId,
    domainCode: descriptor.domainCode,
    domainLabel: descriptor.domainLabel,
    fiberId: candidate.fiberId,
    localLabel: candidate.localLabel,
    decision,
    evidence: {
      strength: candidate.evidenceStrength,
      summary: candidate.evidenceSummary,
      location: candidate.evidenceLocation,
    },
    source: {
      repository: labCorpusAuthority.repository,
      path: candidate.sourcePath,
      blobSha: candidate.sourceSha,
    },
    corpus: {
      atlasPath: labCorpusAuthority.atlasPath,
      atlasGeneratedAt: labCorpusAuthority.generatedAt,
      fingerprint: labCorpusAuthority.corpusFingerprint,
    },
  };
}

export function parseCalibrationLedger(serialized: string | null): AtlasCalibrationRecord[] {
  if (!serialized) return [];
  try {
    const parsed: unknown = JSON.parse(serialized);
    return Array.isArray(parsed) ? parsed.filter(isCalibrationRecord) : [];
  } catch {
    return [];
  }
}

export function readCalibrationLedger(): AtlasCalibrationRecord[] {
  if (typeof window === "undefined") return [];
  return parseCalibrationLedger(window.localStorage.getItem(ATLAS_CALIBRATION_STORAGE_KEY));
}

export function writeCalibrationLedger(records: AtlasCalibrationRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ATLAS_CALIBRATION_STORAGE_KEY, JSON.stringify(records));
}

export function appendCalibrationRecord(record: AtlasCalibrationRecord) {
  const next = [...readCalibrationLedger(), record];
  writeCalibrationLedger(next);
  return next;
}

export function latestCalibrationDecisions(
  records: AtlasCalibrationRecord[],
  layerId: string,
): CalibrationDecisionMap {
  return records.reduce<CalibrationDecisionMap>((decisions, record) => {
    if (record.layerId === layerId) decisions[record.fiberId] = record.decision;
    return decisions;
  }, {});
}

export function recordsForLayer(records: AtlasCalibrationRecord[], layerId: string) {
  return records.filter((record) => record.layerId === layerId);
}

export function serializeCalibrationLedger(records = readCalibrationLedger()) {
  return JSON.stringify(records, null, 2);
}
