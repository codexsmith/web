import languageData from "../content/world_class_language.binding.json";

export type WorldClassLanguage = {
  schemaVersion: "boundary-first.public-language.world-class.v1";
  version: string;
  promotionStatus: "recommended-default-pending-founder-review";
  sourceSuite: string;
  headline: string;
  publicTriad: [string, string, string];
  websiteSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  claimCeiling: string;
  firewalls: [string, string, string];
  routes: {
    manifesto: string;
    doctrine: string;
    research: string;
  };
};

function validateInternalRoute(name: string, value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    throw new Error(`World-class language route ${name} must be internal.`);
  }
}

export function validateWorldClassLanguage(
  value: WorldClassLanguage,
): WorldClassLanguage {
  if (
    value.schemaVersion !== "boundary-first.public-language.world-class.v1"
  ) {
    throw new Error("Unsupported world-class public-language schema.");
  }
  if (value.promotionStatus !== "recommended-default-pending-founder-review") {
    throw new Error("World-class language must retain its pending review state.");
  }
  if (value.publicTriad.length !== 3 || new Set(value.publicTriad).size !== 3) {
    throw new Error("World-class public language requires three distinct phrases.");
  }
  if (value.firewalls.length < 3) {
    throw new Error("World-class public language requires its semantic firewalls.");
  }
  Object.entries(value.routes).forEach(([name, route]) =>
    validateInternalRoute(name, route),
  );
  return value;
}

export const worldClassLanguage = validateWorldClassLanguage(
  languageData as WorldClassLanguage,
);

export const WORLD_CLASS_MANIFESTO_PATH =
  worldClassLanguage.routes.manifesto;
