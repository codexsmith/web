import boundaryFirstUx from "@/content/product-landing-pages/boundary-first-ux.json";
import softwareBeforeCode from "@/content/product-landing-pages/software-before-code.json";
import closureDrivenSoftwareDevelopment from "@/content/product-landing-pages/closure-driven-software-development.json";
import boundaryFirstWeather from "@/content/product-landing-pages/boundary-first-weather.json";
import constitutionalLaw from "@/content/product-landing-pages/constitutional-law-and-jurisprudence.json";
import boundaryFirstChess from "@/content/product-landing-pages/boundary-first-chess.json";
import boundaryFirstSoccer from "@/content/product-landing-pages/boundary-first-soccer.json";
import corpusForge from "@/content/product-landing-pages/corpus-forge.json";
import agencyRepresentationAudit from "@/content/product-landing-pages/agency-representation-audit.json";
import schemathematics from "@/content/product-landing-pages/schemathematics.json";
import groundNews from "@/content/product-landing-pages/ground-news.json";
import gothamchess from "@/content/product-landing-pages/gothamchess.json";
import rupaulWorldOfWonder from "@/content/product-landing-pages/rupaul-world-of-wonder.json";
import augustaCitywatch from "@/content/product-landing-pages/augusta-citywatch.json";
import boundaryFirstRobocup from "@/content/product-landing-pages/boundary-first-robocup.json";
import georgiaTechGtri from "@/content/product-landing-pages/georgia-tech-gtri-research-bridge.json";
import toposInstitute from "@/content/product-landing-pages/topos-institute-research-bridge.json";
import santaFeInstitute from "@/content/product-landing-pages/santa-fe-institute-research-bridge.json";
import southCarolinaLegalModernization from "@/content/product-landing-pages/south-carolina-legal-modernization-bridge.json";
import weatherResearchOperations from "@/content/product-landing-pages/weather-research-operations-bridge.json";
import {
  getRouteEligibleProductLandingEntries,
  type ProductLandingEntry,
} from "@/lib/product-landing-routing";

export type ProductLandingContent = Record<string, unknown>;

const contentByFile: Record<string, ProductLandingContent> = {
  "boundary-first-ux.json": boundaryFirstUx,
  "software-before-code.json": softwareBeforeCode,
  "closure-driven-software-development.json": closureDrivenSoftwareDevelopment,
  "boundary-first-weather.json": boundaryFirstWeather,
  "constitutional-law-and-jurisprudence.json": constitutionalLaw,
  "boundary-first-chess.json": boundaryFirstChess,
  "boundary-first-soccer.json": boundaryFirstSoccer,
  "corpus-forge.json": corpusForge,
  "agency-representation-audit.json": agencyRepresentationAudit,
  "schemathematics.json": schemathematics,
  "ground-news.json": groundNews,
  "gothamchess.json": gothamchess,
  "rupaul-world-of-wonder.json": rupaulWorldOfWonder,
  "augusta-citywatch.json": augustaCitywatch,
  "boundary-first-robocup.json": boundaryFirstRobocup,
  "georgia-tech-gtri-research-bridge.json": georgiaTechGtri,
  "topos-institute-research-bridge.json": toposInstitute,
  "santa-fe-institute-research-bridge.json": santaFeInstitute,
  "south-carolina-legal-modernization-bridge.json": southCarolinaLegalModernization,
  "weather-research-operations-bridge.json": weatherResearchOperations,
};

function asRecord(value: unknown): ProductLandingContent | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as ProductLandingContent;
}

function firstString(...values: unknown[]): string | undefined {
  return values.find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
}

export function getProductLandingContent(
  entry: ProductLandingEntry,
): ProductLandingContent | undefined {
  return contentByFile[entry.file];
}

export function getProductLandingPresentationContent(
  content: ProductLandingContent,
): ProductLandingContent {
  const bridges = content.bridges;
  if (!Array.isArray(bridges) || bridges.length === 0) return content;
  const firstBridge = asRecord(bridges[0]);
  return firstBridge ?? content;
}

export function getProductLandingTitle(
  entry: ProductLandingEntry,
  content: ProductLandingContent,
): string {
  const presentation = getProductLandingPresentationContent(content);
  const hero = asRecord(presentation.hero);
  const product = asRecord(presentation.product);
  const program = asRecord(presentation.program);
  const audience = asRecord(presentation.audience);

  return (
    firstString(
      presentation.title,
      product?.name,
      program?.name,
      audience?.name,
      hero?.title,
      hero?.headline,
    ) ?? entry.id.replace(/-/g, " ")
  );
}

export function getProductLandingDescription(
  entry: ProductLandingEntry,
  content: ProductLandingContent,
): string {
  const presentation = getProductLandingPresentationContent(content);
  const hero = asRecord(presentation.hero);
  const product = asRecord(presentation.product);
  const program = asRecord(presentation.program);
  const opening = asRecord(presentation.opening);
  const executiveBrief = asRecord(presentation.executiveBrief);

  return (
    firstString(
      hero?.deck,
      hero?.support,
      product?.productPromise,
      product?.coreProposition,
      program?.oneLine,
      executiveBrief?.summary,
      presentation.executiveBrief,
      opening?.body,
      presentation.definition,
      presentation.pageIntent,
    ) ?? `Boundary First Labs: ${getProductLandingTitle(entry, content)}`
  );
}

export function validateProductLandingContentRegistry(): string[] {
  const errors: string[] = [];
  const eligibleFiles = new Set(
    getRouteEligibleProductLandingEntries().map((entry) => entry.file),
  );

  for (const entry of getRouteEligibleProductLandingEntries()) {
    if (!contentByFile[entry.file]) {
      errors.push(`${entry.id}: route-eligible landing has no content registry entry`);
    }
  }

  for (const file of Object.keys(contentByFile)) {
    if (!eligibleFiles.has(file)) {
      errors.push(`${file}: content registry must not import private or held landing content`);
    }
  }

  return errors;
}

const registryErrors = validateProductLandingContentRegistry();
if (registryErrors.length > 0) {
  throw new Error(
    `Invalid product landing content registry:\n${registryErrors
      .map((error) => `- ${error}`)
      .join("\n")}`,
  );
}
