import languageSystemData from "../content/language_system.binding.json";
import { worldClassLanguage } from "./world-class-language";

export type LanguageUseClass =
  | "public"
  | "research"
  | "restricted"
  | "safeguard";

export type LanguageRegisterId =
  | "institutional"
  | "software-native"
  | "formal-research"
  | "public-philosophy"
  | "playful"
  | "semantic-firewall";

export type PhraseStatus =
  | "project-language-candidate"
  | "recommended-default-pending-founder-review"
  | "research-hypothesis"
  | "campaign-variant-pending-founder-decision"
  | "semantic-firewall"
  | "approved-canonical"
  | "retired";

export type ReplacementState =
  | "active-no-successor"
  | "pending-channel-decision"
  | "retained-as-research-hypothesis"
  | "retired-with-rationale";

export type LanguagePhrase = {
  id: string;
  phrase: string;
  registerId: LanguageRegisterId;
  useClass: LanguageUseClass;
  status: PhraseStatus;
  priority: "P0" | "P1" | null;
  meaning: string;
  claimCeiling: string;
  knownAmbiguities: string[];
  allowedChannels: string[];
  restrictedContexts: string[];
  explainerRoute: string;
  sourceIds: string[];
  reviewGates: string[];
  decisionId?: string;
  replacement: {
    state: ReplacementState;
    trigger: string;
    successorId: string | null;
    retirementRationale?: string;
  };
};

export type LanguageSystem = {
  schemaVersion: "boundary-first.language-system.v1";
  version: string;
  systemStatus: "working-governance-system-pending-founder-approval";
  sourceSuite: string;
  title: string;
  canonicalMeaning: string;
  stewardshipPrinciple: string;
  lifecycle: Array<{
    id: PhraseStatus;
    label: string;
    publishRule: string;
  }>;
  registers: Array<{
    id: LanguageRegisterId;
    label: string;
    useClass: LanguageUseClass;
    description: string;
    requirements: string[];
    prohibitedContexts: string[];
  }>;
  sources: Array<{
    id: string;
    kind: string;
    label: string;
    publicRoute?: string;
    preservationStatus: string;
  }>;
  reviewGates: Array<{
    id: "GATE-A" | "GATE-B" | "GATE-C";
    label: string;
    checks: string[];
  }>;
  editorialChecklist: Array<{
    id: string;
    label: string;
    requirement: string;
  }>;
  replacementPolicy: {
    appendOnly: boolean;
    preserveSourceWording: boolean;
    requireSuccessorOrRetirementRationale: boolean;
    rules: string[];
  };
  phrases: LanguagePhrase[];
  routes: {
    registry: string;
    governanceNote: string;
    manifesto: string;
    executableArgument: string;
    researchProgram: string;
  };
  claimCeiling: string;
};

const REQUIRED_REGISTER_ORDER: LanguageRegisterId[] = [
  "institutional",
  "software-native",
  "formal-research",
  "public-philosophy",
  "playful",
  "semantic-firewall",
];

const REQUIRED_GATE_ORDER = ["GATE-A", "GATE-B", "GATE-C"];
const REQUIRED_CHECKLIST_IDS = [
  "ED-01",
  "ED-02",
  "ED-03",
  "ED-04",
  "ED-05",
  "ED-06",
  "ED-07",
  "ED-08",
];
const PLAYFUL_PROHIBITED_CONTEXTS = [
  "Claim boxes",
  "Academic abstracts",
  "Safety statements",
];

function validateInternalRoute(name: string, value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    throw new Error(`Language-system route ${name} must be internal.`);
  }
}

export function validateLanguageSystem(value: LanguageSystem): LanguageSystem {
  if (value.schemaVersion !== "boundary-first.language-system.v1") {
    throw new Error("Unsupported language-system schema.");
  }
  if (
    value.systemStatus !==
    "working-governance-system-pending-founder-approval"
  ) {
    throw new Error(
      "The language system must retain its pending founder-approval state.",
    );
  }

  const registerIds = value.registers.map((register) => register.id);
  if (registerIds.join("|") !== REQUIRED_REGISTER_ORDER.join("|")) {
    throw new Error("Language registers must remain complete and ordered.");
  }
  const registerById = new Map(
    value.registers.map((register) => [register.id, register]),
  );

  const lifecycleIds = new Set(value.lifecycle.map((stage) => stage.id));
  if (lifecycleIds.size !== value.lifecycle.length) {
    throw new Error("Language lifecycle identifiers must be unique.");
  }
  if (!lifecycleIds.has("approved-canonical") || !lifecycleIds.has("retired")) {
    throw new Error("The lifecycle must support approval and retirement.");
  }

  const gateIds = value.reviewGates.map((gate) => gate.id);
  if (gateIds.join("|") !== REQUIRED_GATE_ORDER.join("|")) {
    throw new Error("The language system requires copy, research, and promotion gates.");
  }
  const gateIdSet = new Set(gateIds);
  const checklistIds = value.editorialChecklist.map((item) => item.id);
  if (checklistIds.join("|") !== REQUIRED_CHECKLIST_IDS.join("|")) {
    throw new Error("The editorial checklist is incomplete.");
  }

  if (
    !value.replacementPolicy.appendOnly ||
    !value.replacementPolicy.preserveSourceWording ||
    !value.replacementPolicy.requireSuccessorOrRetirementRationale
  ) {
    throw new Error("Language replacement must preserve append-only provenance.");
  }

  const sourceIds = new Set(value.sources.map((source) => source.id));
  if (sourceIds.size !== value.sources.length) {
    throw new Error("Language source identifiers must be unique.");
  }
  value.sources.forEach((source) => {
    if (source.publicRoute) {
      validateInternalRoute(source.id, source.publicRoute);
    }
  });

  const phraseIds = new Set(value.phrases.map((phrase) => phrase.id));
  if (phraseIds.size !== value.phrases.length) {
    throw new Error("Phrase identifiers must be unique.");
  }
  if (value.phrases.length < 15) {
    throw new Error("The governed registry requires the core phrase set.");
  }

  value.phrases.forEach((phrase) => {
    const register = registerById.get(phrase.registerId);
    if (!register || register.useClass !== phrase.useClass) {
      throw new Error(`Phrase ${phrase.id} does not match its register.`);
    }
    if (!lifecycleIds.has(phrase.status)) {
      throw new Error(`Phrase ${phrase.id} has an unknown lifecycle status.`);
    }
    phrase.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`Phrase ${phrase.id} has an unknown source.`);
      }
    });
    phrase.reviewGates.forEach((gateId) => {
      if (!gateIdSet.has(gateId as "GATE-A" | "GATE-B" | "GATE-C")) {
        throw new Error(`Phrase ${phrase.id} has an unknown review gate.`);
      }
    });
    if (
      !phrase.meaning.trim() ||
      !phrase.claimCeiling.trim() ||
      !phrase.replacement.trigger.trim() ||
      phrase.knownAmbiguities.length === 0 ||
      phrase.allowedChannels.length === 0 ||
      phrase.sourceIds.length === 0
    ) {
      throw new Error(`Phrase ${phrase.id} is missing governance metadata.`);
    }
    validateInternalRoute(phrase.id, phrase.explainerRoute);

    if (
      phrase.useClass === "research" &&
      (phrase.registerId !== "formal-research" ||
        !phrase.reviewGates.includes("GATE-B"))
    ) {
      throw new Error(
        `Research phrase ${phrase.id} requires the formal register and Gate B.`,
      );
    }
    if (phrase.useClass === "public" && phrase.registerId === "formal-research") {
      throw new Error(`Public phrase ${phrase.id} cannot bypass research review.`);
    }
    if (phrase.registerId === "playful") {
      PLAYFUL_PROHIBITED_CONTEXTS.forEach((context) => {
        if (!phrase.restrictedContexts.includes(context)) {
          throw new Error(
            `Playful phrase ${phrase.id} is missing the ${context} restriction.`,
          );
        }
      });
    }
    if (
      phrase.status === "retired" &&
      !phrase.replacement.successorId &&
      !phrase.replacement.retirementRationale?.trim()
    ) {
      throw new Error(
        `Retired phrase ${phrase.id} requires a successor or retirement rationale.`,
      );
    }
    if (phrase.replacement.successorId) {
      if (
        phrase.replacement.successorId === phrase.id ||
        !phraseIds.has(phrase.replacement.successorId)
      ) {
        throw new Error(`Phrase ${phrase.id} has an invalid successor.`);
      }
    }
  });

  const phraseText = new Set(value.phrases.map((phrase) => phrase.phrase));
  const boundWebsitePhrases = [
    worldClassLanguage.headline,
    ...worldClassLanguage.publicTriad,
  ];
  boundWebsitePhrases.forEach((phrase) => {
    if (!phraseText.has(phrase)) {
      throw new Error(`Current website phrase is not tracked: ${phrase}`);
    }
  });
  if (
    value.canonicalMeaning !== worldClassLanguage.publicTriad[0] ||
    !phraseText.has(value.canonicalMeaning)
  ) {
    throw new Error("The canonical institutional meaning has drifted.");
  }
  if (value.phrases.filter((phrase) => phrase.priority === "P0").length < 5) {
    throw new Error("The registry must track the P0 phrase set.");
  }
  if (
    value.phrases.some((phrase) => phrase.status === "approved-canonical")
  ) {
    throw new Error(
      "No phrase may be marked approved-canonical before founder approval is recorded.",
    );
  }

  Object.entries(value.routes).forEach(([name, route]) =>
    validateInternalRoute(name, route),
  );
  return value;
}

export const languageSystem = validateLanguageSystem(
  languageSystemData as LanguageSystem,
);

export const LANGUAGE_REGISTRY_PATH = languageSystem.routes.registry;
