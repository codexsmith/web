import type { ContentNode } from "@/lib/content";

type RootOverride = Partial<
  Pick<ContentNode, "eyebrow" | "summary" | "body" | "links" | "inspection">
>;

const rootOverride: RootOverride = {
  body: [
    "The entered Root World is an operating map rather than a second hero. Products shows what the Lab is building and has delivered; Public Interest states what technical capacity is for; Research exposes evidence, mechanism, and formalization; Publications shows which written artifacts exist and how close each is to a stable release boundary; About makes method, provenance, stewardship, and institutional standing inspectable.",
    "A recurring entry point is the system that almost works: the process everyone works around, the software that succeeds only because people quietly compensate for it, the responsibility that keeps moving between departments, the metric that looks healthy while the lived system gets worse, or the new capability that needs governance before it gains consequence.",
  ],
  inspection: [
    {
      id: "root-representation-proposition",
      label: "No consequence without representation",
      eyebrow: "Mission and doctrine proposition",
      summary:
        "Consequential systems have to simplify reality in order to act; the governing question is what happens when something important falls outside the representation.",
      bullets: [
        "Every institution creates categories, roles, metrics, jurisdictions, procedures, models, and records in order to act.",
        "The danger is not that a system has a boundary. The danger is that a consequential person, burden, exception, uncertainty, maintenance obligation, or downstream effect falls outside it and is treated as though it disappeared.",
        "If someone bears a consequence, the system needs a usable path to see them, hear them, explain itself at the appropriate level, and reach repair.",
        "The public maxim is not a replacement for domain evidence. It is a diagnostic proposition that motivates where to inspect the representation.",
      ],
      sourceRef: "src/content/public-projections/home.json#representation",
    },
    {
      id: "root-system-that-almost-works",
      label: "Bring us the system that almost works",
      eyebrow: "Practical entry point",
      summary:
        "Boundary First work often begins where a system is locally functional but depends on hidden compensation, missing ownership, or a repair path that exists only in people's memory and effort.",
      bullets: [
        "The process everyone works around.",
        "The policy that produces behavior nobody intended.",
        "The software that succeeds only because people quietly compensate for it.",
        "The responsibility that keeps moving between departments.",
        "The maintenance burden nobody owns.",
        "The public decision people cannot meaningfully question or appeal.",
        "The new capability that needs governance before it gains consequence.",
        "The first job is not to sell a vocabulary. It is to make the actual problem easier to see.",
      ],
      sourceRef: "src/content/public-projections/home.json#how-we-help",
    },
    {
      id: "root-public-surface-map",
      label: "How to read the Lab",
      eyebrow: "Five public surfaces",
      summary:
        "The top-level branches answer different questions so products, purpose, research, written publication, and institutional identity do not collapse into one authority claim.",
      bullets: [
        "Products: what has been built, what is operating now, what was historically delivered, and what remains a governed concept.",
        "Public Interest: what consequences and public capacities the Lab believes technical work should remain answerable to.",
        "Research: what mechanisms, experiments, derivations, source records, and claim boundaries support or limit the operative work.",
        "Publications: what written artifacts exist, who they are for, their manuscript development state, and which review or release gate remains.",
        "About: who is accountable for the work, how it is produced, what the institution currently is, and how provenance and correction are handled.",
        "Deeper theory remains traversable without becoming a prerequisite for understanding the practical surface.",
      ],
      sourceRef:
        "src/content/public-projections/home.json + src/content/publication_pathway.json + v2 public spine architecture",
    },
    {
      id: "root-human-purpose",
      label: "Human purpose",
      eyebrow: "Why representation matters",
      summary:
        "The public-purpose translation is simple: build better representations so people do not have to live inside the consequences of what consequential systems forgot.",
      bullets: [
        "People are greater than the profile, classification, role, or local model through which a system acts upon them.",
        "The people closest to a system often carry knowledge the formal representation has forgotten.",
        "Authority changes other people's available states, so authority should remain coupled to explanation, evidence, responsibility, contestability, and repair capacity.",
        "Responsibility becomes destructive when it lands without corresponding authority, knowledge, resources, or repair capacity.",
        "Progress should strengthen the whole rather than merely make one local component look successful by exporting burden elsewhere.",
      ],
      sourceRef: "src/content/public-projections/home.json + normalized public-content phrase library",
    },
  ],
};

export function hydrateRootNode(node: ContentNode): ContentNode {
  if (node.id !== "root") return node;

  return {
    ...node,
    ...rootOverride,
    body: rootOverride.body ? [...(node.body ?? []), ...rootOverride.body] : node.body,
    links: rootOverride.links ? [...(node.links ?? []), ...rootOverride.links] : node.links,
    inspection: rootOverride.inspection
      ? [...(node.inspection ?? []), ...rootOverride.inspection]
      : node.inspection,
  };
}
