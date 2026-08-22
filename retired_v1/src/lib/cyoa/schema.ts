import type {
  CyoaBinding,
  CyoaBindingChoice,
  CyoaBindingOnramp,
} from "./types";

const BINDING_STATUSES = new Set(["draft", "review", "approved", "superseded"]);
const REQUIRED_WORKFLOW_STATES = [
  "choose-world",
  "name-trouble",
  "cross-bridge",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireRecord(value: unknown, owner: string): asserts value is Record<string, unknown> {
  if (!isRecord(value)) throw new Error(`CYOA binding '${owner}' must be an object.`);
}

function requireString(value: unknown, field: string, owner: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`CYOA binding '${owner}' requires a non-empty '${field}'.`);
  }
}

function requireStringArray(value: unknown, field: string, owner: string, allowEmpty = false): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    (!allowEmpty && value.length === 0) ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(`CYOA binding '${owner}' requires '${field}' to contain ${allowEmpty ? "only " : "one or more "}non-empty strings.`);
  }
}

function requireUnique(values: string[], field: string) {
  if (new Set(values).size !== values.length) {
    throw new Error(`CYOA binding requires unique ${field}.`);
  }
}

function validateChoiceShape(choice: CyoaBindingChoice, owner: string) {
  const choiceOwner = `${owner}/${choice.id ?? "choice"}`;
  for (const field of [
    "id",
    "slug",
    "title",
    "scene",
    "conceptLabel",
    "lesson",
    "structuralMove",
    "metaphorFirewall",
    "formalBridge",
    "destinationNodeId",
    "actionLabel",
  ] as const) {
    requireString(choice[field], field, choiceOwner);
  }
  requireStringArray(choice.conceptIds, "conceptIds", choiceOwner);
  requireStringArray(choice.canonicalNodeIds, "canonicalNodeIds", choiceOwner);
  requireUnique(choice.conceptIds, `concept references on '${choiceOwner}'`);
  requireUnique(choice.canonicalNodeIds, `node references on '${choiceOwner}'`);
  if (!choice.canonicalNodeIds.includes(choice.destinationNodeId)) {
    throw new Error(`CYOA choice '${choiceOwner}' must include its destination node in canonicalNodeIds.`);
  }
}

function validateOnrampShape(onramp: CyoaBindingOnramp) {
  const owner = onramp.id ?? "onramp";
  for (const field of ["id", "slug", "number", "label", "prompt", "description"] as const) {
    requireString(onramp[field], field, owner);
  }
  requireStringArray(onramp.canonicalNodeIds, "canonicalNodeIds", owner);
  if (!Array.isArray(onramp.choices) || onramp.choices.length < 2) {
    throw new Error(`CYOA on-ramp '${owner}' requires at least two choices.`);
  }
  onramp.choices.forEach((choice) => validateChoiceShape(choice, owner));
  requireUnique(onramp.choices.map((choice) => choice.id), `choice ids on '${owner}'`);
  requireUnique(onramp.choices.map((choice) => choice.slug), `choice slugs on '${owner}'`);
}

export function validateCyoaBinding(value: unknown): asserts value is CyoaBinding {
  requireRecord(value, "root");
  if (value.schemaVersion !== "boundary-first.binding.cyoa.v1") {
    throw new Error("Unsupported CYOA binding schema version.");
  }

  for (const section of [
    "bindingProtocol",
    "source",
    "semantics",
    "workflow",
    "projection",
    "interactions",
    "validation",
    "export",
  ] as const) {
    requireRecord(value[section], section);
  }

  const data = value as unknown as CyoaBinding;
  for (const field of ["id", "version", "title"] as const) {
    requireString(data.bindingProtocol[field], field, "bindingProtocol");
  }
  if (!/^\d+\.\d+\.\d+$/.test(data.bindingProtocol.version)) {
    throw new Error("CYOA binding version must use semantic versioning.");
  }
  if (!BINDING_STATUSES.has(data.bindingProtocol.status)) {
    throw new Error("CYOA binding has an unsupported status.");
  }
  if (data.bindingProtocol.claimCeiling !== "pedagogical-on-ramp") {
    throw new Error("CYOA binding must retain the pedagogical on-ramp claim ceiling.");
  }
  requireRecord(data.bindingProtocol.provenance, "bindingProtocol.provenance");
  requireStringArray(data.bindingProtocol.provenance.createdFrom, "createdFrom", "bindingProtocol.provenance");
  requireString(data.bindingProtocol.provenance.implementedAt, "implementedAt", "bindingProtocol.provenance");
  requireRecord(data.bindingProtocol.compatibility, "bindingProtocol.compatibility");
  requireString(data.bindingProtocol.compatibility.renderer, "renderer", "bindingProtocol.compatibility");
  requireString(data.bindingProtocol.compatibility.canonicalNodeSource, "canonicalNodeSource", "bindingProtocol.compatibility");

  if (data.source.schemaFamily !== "custom") throw new Error("CYOA source schema family must be 'custom'.");
  requireString(data.source.schemaReference, "schemaReference", "source");
  requireStringArray(data.source.adapters, "adapters", "source", true);

  if (!Array.isArray(data.semantics.conceptRegistry) || data.semantics.conceptRegistry.length === 0) {
    throw new Error("CYOA binding requires a concept registry.");
  }
  const conceptIds: string[] = [];
  for (const concept of data.semantics.conceptRegistry) {
    requireRecord(concept, "concept");
    requireString(concept.id, "id", "concept");
    requireString(concept.label, "label", concept.id);
    requireString(concept.definition, "definition", concept.id);
    requireStringArray(concept.canonicalNodeIds, "canonicalNodeIds", concept.id);
    conceptIds.push(concept.id);
  }
  requireUnique(conceptIds, "concept ids");

  if (!Array.isArray(data.semantics.onramps) || data.semantics.onramps.length === 0) {
    throw new Error("CYOA binding requires on-ramps.");
  }
  data.semantics.onramps.forEach(validateOnrampShape);
  requireUnique(data.semantics.onramps.map((item) => item.id), "on-ramp ids");
  requireUnique(data.semantics.onramps.map((item) => item.slug), "on-ramp slugs");

  const registeredConceptIds = new Set(conceptIds);
  for (const onramp of data.semantics.onramps) {
    for (const choice of onramp.choices) {
      for (const conceptId of choice.conceptIds) {
        if (!registeredConceptIds.has(conceptId)) {
          throw new Error(`Unknown concept '${conceptId}' referenced by '${choice.id}'.`);
        }
      }
    }
  }

  if (data.workflow.profile !== "adaptive-onramp") throw new Error("Unsupported CYOA workflow profile.");
  if (data.workflow.stateMutation !== "navigation-only" || data.workflow.restartable !== true) {
    throw new Error("CYOA workflow must be restartable and navigation-only.");
  }
  if (!Array.isArray(data.workflow.states)) throw new Error("CYOA workflow states must be an array.");
  const stateIds = data.workflow.states.map((state) => state.id);
  const stateIdSet = new Set<string>(stateIds);
  if (REQUIRED_WORKFLOW_STATES.some((id) => !stateIdSet.has(id))) {
    throw new Error("CYOA workflow is missing a required state.");
  }
  data.workflow.states.forEach((state) => requireString(state.label, "label", state.id));
  requireUnique(stateIds, "workflow state ids");
  if (!Array.isArray(data.workflow.transitions) || data.workflow.transitions.length < 2) {
    throw new Error("CYOA workflow requires declared transitions.");
  }
  for (const transition of data.workflow.transitions) {
    requireString(transition.from, "from", "transition");
    requireString(transition.to, "to", "transition");
    requireString(transition.action, "action", "transition");
    if (!stateIdSet.has(transition.from) || !stateIdSet.has(transition.to)) {
      throw new Error("CYOA transition references an unknown workflow state.");
    }
  }

  requireString(data.projection.id, "id", "projection");
  if (data.projection.pattern !== "guided-path") throw new Error("Unsupported CYOA projection pattern.");
  requireStringArray(data.projection.regions, "regions", "projection");
  requireRecord(data.projection.components, "projection.components");
  requireRecord(data.projection.copy, "projection.copy");
  for (const [key, copy] of Object.entries(data.projection.copy)) requireString(copy, key, "projection.copy");

  if (!Array.isArray(data.interactions.actions) || data.interactions.actions.length === 0) {
    throw new Error("CYOA binding requires interaction actions.");
  }
  for (const action of data.interactions.actions) {
    requireString(action.id, "id", "interaction");
    if (action.method !== "link" || action.keyboardEquivalent !== "native-link") {
      throw new Error(`CYOA interaction '${action.id}' must retain a native-link keyboard equivalent.`);
    }
  }
  requireStringArray(data.interactions.fallbacks, "fallbacks", "interactions");
  requireStringArray(data.validation.requiredOnrampIds, "requiredOnrampIds", "validation");
  requireStringArray(data.validation.requiredChoiceFields, "requiredChoiceFields", "validation");
  requireStringArray(data.validation.accessibilityConstraints, "accessibilityConstraints", "validation");
  requireStringArray(data.validation.governanceConstraints, "governanceConstraints", "validation");
  const onrampIds = new Set(data.semantics.onramps.map((item) => item.id));
  for (const requiredId of data.validation.requiredOnrampIds) {
    if (!onrampIds.has(requiredId)) throw new Error(`Missing required on-ramp '${requiredId}'.`);
  }
  requireStringArray(data.export.targets, "targets", "export");
  if (typeof data.export.documentation !== "boolean" || typeof data.export.fixtures !== "boolean") {
    throw new Error("CYOA export flags must be boolean.");
  }
}

export function validateCyoaCanonicalReferences(binding: CyoaBinding, canonicalIds: ReadonlySet<string>) {
  const references = [
    ...binding.semantics.conceptRegistry.flatMap((concept) =>
      concept.canonicalNodeIds.map((id) => ({ id, owner: `concept:${concept.id}` })),
    ),
    ...binding.semantics.onramps.flatMap((onramp) => [
      ...onramp.canonicalNodeIds.map((id) => ({ id, owner: onramp.id })),
      ...onramp.choices.flatMap((choice) =>
        choice.canonicalNodeIds.map((id) => ({ id, owner: choice.id })),
      ),
    ]),
  ];
  for (const reference of references) {
    if (!canonicalIds.has(reference.id)) {
      throw new Error(`Unknown canonical node '${reference.id}' referenced by '${reference.owner}'.`);
    }
  }
}
