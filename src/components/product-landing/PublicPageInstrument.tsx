'use client';

import { AgencyTraceLab } from "./AgencyTraceLab";
import { ChessBoundaryLab } from "./ChessBoundaryLab";
import { ClosureReadinessLab } from "./ClosureReadinessLab";
import { CorpusPromotionLab } from "./CorpusPromotionLab";
import { LawClaimRegimeLab } from "./LawClaimRegimeLab";
import { SchemaPromotionLab } from "./SchemaPromotionLab";
import { SoccerPossessionLab } from "./SoccerPossessionLab";
import { SoftwareRepresentationLab } from "./SoftwareRepresentationLab";
import { WeatherRefinementLab } from "./WeatherRefinementLab";

export function PublicPageInstrument({ currentId }: { currentId?: string }) {
  switch (currentId) {
    case "software-before-code":
      return <SoftwareRepresentationLab />;
    case "closure-driven-software-development":
      return <ClosureReadinessLab />;
    case "boundary-first-weather":
      return <WeatherRefinementLab />;
    case "constitutional-law-and-jurisprudence":
      return <LawClaimRegimeLab />;
    case "boundary-first-chess":
      return <ChessBoundaryLab />;
    case "boundary-first-soccer":
      return <SoccerPossessionLab />;
    case "corpus-forge":
      return <CorpusPromotionLab />;
    case "agency-representation-audit":
      return <AgencyTraceLab />;
    case "schemathematics":
      return <SchemaPromotionLab />;
    default:
      return null;
  }
}
