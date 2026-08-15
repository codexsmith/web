'use client';

import { AgencyTraceLab } from "./AgencyTraceLab";
import { ChessBoundaryLab } from "./ChessBoundaryLab";
import { SchemaPromotionLab } from "./SchemaPromotionLab";
import { SoccerPossessionLab } from "./SoccerPossessionLab";

export function PublicPageInstrument({ currentId }: { currentId?: string }) {
  switch (currentId) {
    case "boundary-first-chess":
      return <ChessBoundaryLab />;
    case "boundary-first-soccer":
      return <SoccerPossessionLab />;
    case "agency-representation-audit":
      return <AgencyTraceLab />;
    case "schemathematics":
      return <SchemaPromotionLab />;
    default:
      return null;
  }
}
