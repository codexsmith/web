import type { EntranceId } from "./types";

export const ENTRANCE_SESSION_KEY = "bfl:entrance-context";
export const SPLASH_SESSION_KEY = "bfl:splash-seen";

export type EntranceSessionRecord = {
  entranceId: EntranceId;
  timestamp: number;
};

export function isEntranceId(value: unknown): value is EntranceId {
  return value === "people" || value === "problem" || value === "repair";
}
