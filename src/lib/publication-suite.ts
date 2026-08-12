import publicationContentData from "../content/publication_content.json";
import publicationPathwayData from "../content/publication_pathway.json";

export type PublicationHero = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryQuote: string;
};

export type PublicationCard = {
  id: string;
  phaseId: string;
  kicker: string;
  title: string;
  quote: string;
  summary: string;
  mechanism: string;
  consequence: string;
  repair: string;
  visualization: {
    mode: string;
    mobileFallback: string;
    reducedMotionFallback: string;
  };
};

export type RootCard = {
  id: string;
  title: string;
  quote: string;
};

export type RepairRoute = {
  id: string;
  title: string;
  useWhen: string[];
  requiredInputs: string[];
  operations: string[];
  outputs: string[];
  closureTest: string;
};

export type PublicationPhase = {
  id: string;
  label: string;
  purpose: string;
  stepIds: string[];
};

type PublicationContent = {
  id: string;
  title: string;
  hero: PublicationHero;
  featuredCards: PublicationCard[];
  rootCards: RootCard[];
  repairRoutes: RepairRoute[];
  claimCeiling: string;
};

export const publicationContent =
  publicationContentData as PublicationContent;

export const publicationPhases =
  publicationPathwayData.phases as PublicationPhase[];
