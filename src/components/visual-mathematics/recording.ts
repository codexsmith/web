import type { VisualMathSpecimenDefinition } from "./specimen-types";

export const VISUAL_MATH_RECORD_STORE = "bfl-visual-math-records-v1";

export type VisualMathRecord = {
  schema_version: "bfl_visual_math_record_v0.1";
  specimen_id: string;
  specimen_version: string;
  captured_at: string;
  claim_status: string;
  implementation: string;
  state: Record<string, unknown>;
  presentation: Record<string, unknown>;
  construction: Array<{ id: string; label: string; operation?: string }>;
  provenance: string[];
  state_url: string;
  note: string;
};

export function buildVisualMathRecord({
  definition,
  state,
  presentation,
  stateUrl,
  note = "",
}: {
  definition: VisualMathSpecimenDefinition;
  state: Record<string, unknown>;
  presentation: Record<string, unknown>;
  stateUrl: string;
  note?: string;
}): VisualMathRecord {
  return {
    schema_version: "bfl_visual_math_record_v0.1",
    specimen_id: definition.id,
    specimen_version: definition.version,
    captured_at: new Date().toISOString(),
    claim_status: definition.status,
    implementation: definition.implementation,
    state,
    presentation,
    construction: definition.construction.map(({ id, label, operation }) => ({ id, label, operation })),
    provenance: definition.provenance,
    state_url: stateUrl,
    note,
  };
}

export function saveVisualMathRecord(record: VisualMathRecord) {
  const current = loadVisualMathRecords();
  const next = [record, ...current].slice(0, 40);
  window.localStorage.setItem(VISUAL_MATH_RECORD_STORE, JSON.stringify(next));
  return next;
}

export function loadVisualMathRecords(): VisualMathRecord[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(VISUAL_MATH_RECORD_STORE) ?? "[]") as unknown;
    return Array.isArray(parsed) ? (parsed as VisualMathRecord[]) : [];
  } catch {
    return [];
  }
}
