import type { BfuxIconName } from "@/components/bfux-icons";
import type { Inspection } from "@/lib/content";

export type BfuxArtifactKind =
  | "sequence"
  | "loop"
  | "set"
  | "ladder"
  | "fanout"
  | "convergence";

export type BfuxArtifactItem = {
  label: string;
  detail?: string;
  icon?: BfuxIconName;
};

export type BfuxArtifactHub = {
  label: string;
  detail?: string;
  icon?: BfuxIconName;
};

export type BfuxContentArtifact = {
  id: string;
  kind: BfuxArtifactKind;
  eyebrow: string;
  title: string;
  summary?: string;
  items: BfuxArtifactItem[];
  hub?: BfuxArtifactHub;
  exit?: BfuxArtifactHub;
};

const nodeArtifacts: Record<string, BfuxContentArtifact[]> = {
  "public-mission": [
    {
      id: "mission-return-path",
      kind: "loop",
      eyebrow: "Representation to consequence",
      title: "Power needs a return path",
      summary:
        "The mission describes a cycle, not a slogan: representation selects reality, action distributes consequence, and evidence or affected people must still be able to revise the operative model.",
      items: [
        { label: "Represent", detail: "Select what the system can see.", icon: "projection" },
        { label: "Encode", detail: "Turn those selections into an operative model.", icon: "claim" },
        { label: "Act", detail: "Use the model to cause state change.", icon: "transition" },
        { label: "Consequence", detail: "Distribute effects across people, places, and time.", icon: "consequence" },
        { label: "Answer", detail: "Let evidence, standing, contest, and repair change the model.", icon: "repair" },
      ],
    },
  ],
  "public-principles": [
    {
      id: "principles-operating-constraints",
      kind: "set",
      eyebrow: "Values as engineering constraints",
      title: "The public-purpose constraint field",
      summary:
        "These commitments are peers, not a sequence. Together they constrain whether capability remains answerable after it leaves the happy path.",
      items: [
        { label: "Accessibility", icon: "actor" },
        { label: "Lifecycle responsibility", icon: "closure" },
        { label: "Accountable systems", icon: "responsibility" },
        { label: "Public legibility", icon: "inspect" },
        { label: "Maintainability", icon: "repair" },
        { label: "Provenance", icon: "trace" },
        { label: "Repair", icon: "repair" },
        { label: "Real constraints", icon: "boundary" },
      ],
    },
  ],
  "public-aspirations": [
    {
      id: "aspirations-capability-horizon",
      kind: "ladder",
      eyebrow: "Future capacity",
      title: "Aspirations earn scope through capacity",
      summary:
        "Future-facing work is staged by what the Lab could responsibly maintain and evidence, not by how compelling the destination sounds.",
      items: [
        { label: "Near", detail: "Bounded methods, explanations, artifacts, civic analyses, and small pilots.", icon: "object" },
        { label: "Intermediate", detail: "Reusable public datasets and tools, reviewed pilots, stewardship, and repeatable collaboration.", icon: "relation" },
        { label: "Longer term", detail: "Public systems that keep authority, burden, memory, consequence, and repair operationally legible.", icon: "promotion" },
      ],
    },
  ],
  "corpus-forge": [
    {
      id: "corpus-forge-lifecycle",
      kind: "loop",
      eyebrow: "Governed corpus lifecycle",
      title: "Source to repair",
      summary:
        "Corpus Forge already names an ordered lifecycle. The visual form preserves which transitions are gates and why a corpus remains revisable after promotion.",
      items: [
        { label: "Ingest", icon: "object" },
        { label: "Extract", icon: "inspect" },
        { label: "Relate", icon: "relation" },
        { label: "Review", icon: "witness" },
        { label: "Promote", icon: "promotion" },
        { label: "Supersede / repair", icon: "repair" },
      ],
    },
  ],
  "agency-audit": [
    {
      id: "agency-audit-five-pass",
      kind: "sequence",
      eyebrow: "Five-pass audit",
      title: "Authority to repair",
      summary:
        "The engagement follows a directed diagnostic path. Each pass preserves a different consequential relation instead of flattening the audit into one score.",
      items: [
        { label: "Map authority", icon: "responsibility" },
        { label: "Inspect representation", icon: "projection" },
        { label: "Trace consequence", icon: "consequence" },
        { label: "Test contestability", icon: "witness" },
        { label: "Assign repair", icon: "repair" },
      ],
    },
  ],
  "augusta-civic": [
    {
      id: "augusta-public-artifact",
      kind: "sequence",
      eyebrow: "Smallest coherent civic unit",
      title: "Question to correctable public artifact",
      summary:
        "The civic direction becomes concrete when source work remains coupled to a bounded question and a public artifact that can be corrected later.",
      items: [
        { label: "Bound the question", icon: "boundary" },
        { label: "Assemble sources", icon: "trace" },
        { label: "Normalize distinctions", icon: "admissibility" },
        { label: "Model relations", icon: "relation" },
        { label: "Publish artifact", icon: "promotion" },
        { label: "Correct with evidence", icon: "repair" },
      ],
    },
  ],
  "boundary-first-engineering": [
    {
      id: "engineering-before-code",
      kind: "sequence",
      eyebrow: "Before local mechanism",
      title: "Make the system explicit before implementation hardens it",
      items: [
        { label: "Boundary", icon: "boundary" },
        { label: "Contract", icon: "claim" },
        { label: "Ownership", icon: "responsibility" },
        { label: "Invariant", icon: "invariant" },
        { label: "Lifecycle", icon: "closure" },
        { label: "Failure / repair", icon: "repair" },
        { label: "Implementation", icon: "object" },
      ],
    },
  ],
  "ontological-software": [
    {
      id: "ontology-derivation-field",
      kind: "fanout",
      eyebrow: "Shared domain grammar",
      title: "One ontology, many executable surfaces",
      summary:
        "The point is not code generation for its own sake. Shared structure reduces representational drift when downstream surfaces derive from the same domain model.",
      hub: { label: "Domain ontology", detail: "Objects, relations, admissible states, and transitions.", icon: "contexture" },
      items: [
        { label: "Schemas", icon: "container" },
        { label: "Validation", icon: "admissibility" },
        { label: "APIs", icon: "port" },
        { label: "Workflows", icon: "transition" },
        { label: "State machines", icon: "state" },
        { label: "Tests", icon: "witness" },
        { label: "Documentation", icon: "trace" },
        { label: "Permissions", icon: "gate" },
        { label: "UI structure", icon: "projection" },
      ],
    },
  ],
  "executable-representation": [
    {
      id: "executable-representation-chain",
      kind: "sequence",
      eyebrow: "Representation under execution",
      title: "From primitive distinction to consequence",
      items: [
        { label: "Primitives", icon: "point" },
        { label: "Constructions", icon: "object" },
        { label: "State", icon: "state" },
        { label: "Admissible transition", icon: "transition" },
        { label: "Invariant check", icon: "invariant" },
        { label: "Consequence", icon: "consequence" },
      ],
    },
  ],
  "boundary-first-ux": [
    {
      id: "bfux-operator-grammar",
      kind: "loop",
      eyebrow: "Interaction grammar",
      title: "Motion is semantic",
      summary:
        "Boundary First UX names a reusable operator vocabulary. The sequence is not a mandatory user journey; it is a visual grammar for lawful changes of position, depth, context, evidence, and repair.",
      items: [
        { label: "Orient", icon: "orient" },
        { label: "Traverse", icon: "traverse" },
        { label: "Inspect", icon: "inspect" },
        { label: "Reveal", icon: "reveal" },
        { label: "Reframe", icon: "reframe" },
        { label: "Trace", icon: "trace" },
        { label: "Stress", icon: "stress" },
        { label: "Repair", icon: "repair" },
        { label: "Promote", icon: "promotion" },
      ],
    },
  ],
  "verification-governance": [
    {
      id: "verification-consequence-loop",
      kind: "loop",
      eyebrow: "Earned closure",
      title: "A claim must meet an independent consequence channel",
      items: [
        { label: "Represent", icon: "projection" },
        { label: "Bound", icon: "boundary" },
        { label: "Commit", icon: "claim" },
        { label: "Execute", icon: "transition" },
        { label: "Instrument", icon: "inspect" },
        { label: "Observe", icon: "witness" },
        { label: "Compare", icon: "relation" },
        { label: "Repair", icon: "repair" },
        { label: "Verify", icon: "invariant" },
        { label: "Close", icon: "closure" },
      ],
    },
  ],
  "youtube-knowledge-explorer": [
    {
      id: "youtube-learning-path",
      kind: "sequence",
      eyebrow: "Selected media to learning path",
      title: "Preserve why the next item belongs",
      items: [
        { label: "Select media", icon: "object" },
        { label: "Order path", icon: "direction" },
        { label: "Expose prerequisites", icon: "relation" },
        { label: "Attach notes / progress", icon: "trace" },
        { label: "Explain next step", icon: "orient" },
      ],
    },
  ],
  "cross-platform-bookshelf": [
    {
      id: "bookshelf-memory-chain",
      kind: "sequence",
      eyebrow: "Saved media to usable memory",
      title: "A bookmark is only the first state",
      items: [
        { label: "Save source", detail: "Video, article, podcast, book, document, or course.", icon: "object" },
        { label: "Preserve intent", detail: "Why it mattered and what it was for.", icon: "claim" },
        { label: "Track progress", icon: "state" },
        { label: "Relate context", icon: "relation" },
        { label: "Record knowledge / action", icon: "consequence" },
      ],
    },
  ],
  "need-capacity-map": [
    {
      id: "capacity-admissible-match",
      kind: "convergence",
      eyebrow: "Coordination before exchange architecture",
      title: "A match is more than available supply",
      summary:
        "The map earns value by making the conditions of an admissible match explicit before introducing currency, settlement, or a larger exchange system.",
      items: [
        { label: "Underused capacity", icon: "object" },
        { label: "Represented need", icon: "actor" },
        { label: "Matching constraints", icon: "boundary" },
        { label: "Trusted organizations", icon: "responsibility" },
      ],
      hub: { label: "Admissible match", icon: "admissibility" },
      exit: { label: "Coordination value", detail: "Test the relationship before expanding infrastructure.", icon: "consequence" },
    },
  ],
  "the-lab": [
    {
      id: "lab-operating-mode",
      kind: "loop",
      eyebrow: "Why call it a lab",
      title: "Build, test, preserve, expose, revise",
      items: [
        { label: "Build instruments", icon: "object" },
        { label: "Test representations", icon: "witness" },
        { label: "Preserve evidence", icon: "trace" },
        { label: "Expose defects", icon: "defect" },
        { label: "Revise", icon: "repair" },
      ],
    },
  ],
  "how-we-work": [
    {
      id: "how-we-work-loop",
      kind: "loop",
      eyebrow: "Recurring operating loop",
      title: "From observation to stewardship",
      summary:
        "The Lab's Lean, Agile, scientific, computational, constructive, and agentic practices overlap inside one repairable loop rather than appearing as six unrelated slogans.",
      items: [
        { label: "Intake / observe", icon: "inspect" },
        { label: "Bound", icon: "boundary" },
        { label: "Represent", icon: "projection" },
        { label: "Hypothesize", icon: "claim" },
        { label: "Construct", icon: "object" },
        { label: "Execute", icon: "transition" },
        { label: "Validate", icon: "witness" },
        { label: "Repair", icon: "repair" },
        { label: "Promote / steward", icon: "promotion" },
      ],
    },
  ],
  contact: [
    {
      id: "contact-first-inquiry",
      kind: "sequence",
      eyebrow: "Useful first conversation",
      title: "Bound the inquiry before proposing transformation",
      items: [
        { label: "Name the object", detail: "System, artifact, decision, or research question.", icon: "object" },
        { label: "Name the consequence", detail: "What is difficult, failing, uncertain, or worth building.", icon: "consequence" },
        { label: "Locate authority", detail: "Who has evidence, ownership, and implementation access.", icon: "responsibility" },
        { label: "State constraints", detail: "Time, budget, regulation, maintenance, safety, or capacity.", icon: "boundary" },
        { label: "Define next decision", detail: "What would be useful even if the result is negative.", icon: "closure" },
      ],
    },
  ],
};

const ARROW = /\s*(?:->|→)\s*/;

function trimTerminalPunctuation(value: string) {
  return value.trim().replace(/[.;]+$/, "");
}

function parseArrowBullet(
  inspection: Pick<Inspection, "id" | "label" | "summary">,
  bullet: string,
  index: number,
): BfuxContentArtifact | undefined {
  if (!/(?:->|→)/.test(bullet)) return undefined;

  const colon = bullet.indexOf(":");
  const sequenceText = colon >= 0 && /(?:->|→)/.test(bullet.slice(colon + 1))
    ? bullet.slice(colon + 1)
    : bullet;
  const items = sequenceText
    .split(ARROW)
    .map(trimTerminalPunctuation)
    .filter(Boolean)
    .map((label) => ({ label }));

  if (items.length < 3) return undefined;

  const prefix = colon >= 0 ? bullet.slice(0, colon).trim() : "Operational sequence";
  const loopLike = /loop|circuit|cycle/i.test(prefix) || /close|closure|repair/i.test(items.at(-1)?.label ?? "");

  return {
    id: `${inspection.id}-sequence-${index + 1}`,
    kind: loopLike ? "loop" : "sequence",
    eyebrow: "Structure recovered from the retained text",
    title: prefix || inspection.label,
    summary: index === 0 ? inspection.summary : undefined,
    items,
  };
}

function parseBulletItem(bullet: string): BfuxArtifactItem {
  const colon = bullet.indexOf(":");
  if (colon > 0 && colon < 58) {
    const label = bullet.slice(0, colon).trim();
    const detail = bullet.slice(colon + 1).trim();
    if (label.length <= 54 && detail) return { label, detail };
  }

  return { label: bullet.trim() };
}

function isHorizonLabel(label: string) {
  return /^(near(?:-term)?|intermediate|longer(?:-term)?|long-term|stage\s*\d+|phase\s*\d+|level\s*\d+|l\d+)$/i.test(label.trim());
}

/**
 * Inspection records already carry structured evidence as bullet arrays. This compiler
 * refuses to flatten that structure back into an anonymous UL: arrow syntax becomes a
 * directed sequence, explicit stage prefixes become a ladder, and the remaining peer
 * findings become a bounded set.
 */
export function getInspectionContentArtifacts(
  inspection: Pick<Inspection, "id" | "label" | "summary" | "bullets">,
): BfuxContentArtifact[] {
  const artifacts: BfuxContentArtifact[] = [];
  const consumed = new Set<number>();

  inspection.bullets.forEach((bullet, index) => {
    const artifact = parseArrowBullet(inspection, bullet, index);
    if (!artifact) return;
    artifacts.push(artifact);
    consumed.add(index);
  });

  const remaining = inspection.bullets
    .map((bullet, index) => ({ bullet, index, item: parseBulletItem(bullet) }))
    .filter(({ index }) => !consumed.has(index));

  const horizonItems = remaining.filter(({ item }) => isHorizonLabel(item.label));
  if (horizonItems.length >= 3) {
    artifacts.push({
      id: `${inspection.id}-ladder`,
      kind: "ladder",
      eyebrow: "Ordered horizon",
      title: inspection.label,
      summary: artifacts.length ? undefined : inspection.summary,
      items: horizonItems.map(({ item }) => item),
    });
    horizonItems.forEach(({ index }) => consumed.add(index));
  }

  const residualItems = inspection.bullets
    .map((bullet, index) => ({ bullet, index, item: parseBulletItem(bullet) }))
    .filter(({ index }) => !consumed.has(index))
    .map(({ item }) => item);

  if (residualItems.length) {
    artifacts.push({
      id: `${inspection.id}-findings`,
      kind: "set",
      eyebrow: artifacts.length ? "Boundary notes" : "Structured findings",
      title: artifacts.length ? "Constraints, witnesses, and claim boundaries" : inspection.label,
      summary: artifacts.length ? undefined : inspection.summary,
      items: residualItems,
    });
  }

  return artifacts;
}

export function getNodeContentArtifacts(nodeId: string): BfuxContentArtifact[] {
  return nodeArtifacts[nodeId] ?? [];
}
