import rawDataset from "@/data/audience.nodes.json";
import { validateAudienceDataset } from "./schema";
import type { AudienceDataset } from "./types";

validateAudienceDataset(rawDataset);
export const audienceDataset: AudienceDataset = rawDataset;
