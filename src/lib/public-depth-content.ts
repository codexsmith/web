import type { ContentNode } from "@/lib/content";

type PublicDepthOverride = Partial<
  Pick<ContentNode, "body" | "links" | "inspection">
>;

const publicDepthOverrides: Record<string, PublicDepthOverride> = {
  about: {
    inspection: [
      {
        id: "about-public-legibility",
        label: "The public is owed legibility, not a data dump",
        eyebrow: "Publication obligation",
        summary:
          "A large private corpus does not become public knowledge merely by being exposed wholesale; the institution has to preserve enough structure that claims, sources, maturity, disagreements, and replacement paths remain intelligible.",
        bullets: [
          "Publish enough provenance to reconstruct consequential claims without forcing readers to reverse-engineer the entire private corpus.",
          "Separate source material, synthesis, hypothesis, implementation, observation, criticism, and promotion where the distinction matters.",
          "Do not make breadth perform the role of validation.",
          "Do not hide uncertainty merely because a cleaner public narrative would be easier to market.",
          "Sequence disclosure so the reader can understand one bounded contribution without accepting the entire research program.",
        ],
        sourceRef:
          "backlog/10_social_mission_preagent_ux/03_The_Institute.md + src/content/public-projections/home.json",
      },
    ],
  },
  "the-lab": {
    body: [
      "The institutional covenant is the mechanism that keeps the lab from treating its own theory as an exemption. Boundary First Labs should expose who is speaking, what authority is being exercised, which claim or artifact is being maintained, where criticism can enter, who can repair a failure, and what happens when the lab no longer has the capacity to steward what it created.",
      "Formation stage also creates a specific operational risk: too much productive capacity, corpus memory, and judgment still concentrate in the founder. The response is not to erase that provenance. It is to convert founder-held structure into source registers, protocols, review paths, maintained software, explicit decisions, correction history, and relationships other capable people can inspect and eventually steward.",
    ],
    links: [
      {
        label: "Public Interest Principles",
        href: "/public-interest/principles",
        eyebrow: "Self-application",
        summary:
          "The public commitments the lab is expected to apply to its own products, publications, collaborations, and growth decisions.",
      },
      {
        label: "Verification & Governance",
        href: "/research/software/verification-governance",
        eyebrow: "Operational support",
        summary:
          "The software and research machinery for evidence, discrepancy, authority, repair, and earned closure.",
      },
    ],
    inspection: [
      {
        id: "lab-institutional-covenant",
        label: "What we ask of systems, we must ask of ourselves",
        eyebrow: "Institutional covenant",
        summary:
          "The retained covenant turns the lab's public doctrine into mechanisms that govern the lab before those mechanisms are proposed for anyone else.",
        bullets: [
          "Claim firewall: consequential public claims remain typed by domain, maturity, evidence, and intended use.",
          "Named responsibility: maintained products, pilots, datasets, publications, and public commitments need an accountable steward with enough authority and capacity to respond.",
          "No hidden human shock absorbers: a process is not closed when unrecorded human effort is still required to make the represented process work.",
          "Contestability and correction: criticism, disputed records, accessibility reports, and corrections need a practical route into the maintained representation.",
          "No undeclared “we”: founder statements, institutional commitments, collaborator contributions, AI assistance, external review, and independent validation remain distinguishable.",
          "No product without stewardship: maintenance, versioning, incident response, retirement, transfer, and replacement belong to the released object.",
          "Self-application: the lab's classifications, language, software, partnerships, and growth decisions remain subject to the same consequence tests it applies elsewhere.",
        ],
        sourceRef:
          "backlog/10_social_mission_preagent_ux/03_The_Institute.md#The-Institutional-Covenant + bfl_public_content_flat_dedup_v0_3.json#institutional-covenant",
      },
      {
        id: "lab-founder-dependence",
        label: "Reduce founder dependence without laundering founder provenance",
        eyebrow: "Formation-stage risk",
        summary:
          "Institutionalization succeeds when the work becomes more criticizable and stewardable by other capable people without pretending it originated anonymously.",
        bullets: [
          "Stable source and claim registers move memory out of private recall.",
          "Repeatable protocols move method out of personality and habit.",
          "Bounded product and research specifications make obligations inspectable before handoff.",
          "External review and critic passes introduce disagreement that does not depend on founder permission to exist.",
          "Visible correction and supersession history preserves why the representation changed.",
          "Stewardship, retirement, and transfer rules prevent released work from becoming orphan infrastructure.",
          "Partnership records preserve who contributed what, under which authority, and with what continuing obligations.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/05_founders_note.md#Founder-Risk-and-Institutionalization",
      },
      {
        id: "lab-capacity-before-expansion",
        label: "Capacity before expansion",
        eyebrow: "Growth is a design decision",
        summary:
          "The lab does not treat larger scale as an automatic success state; responsible capacity is the ability to hold, support, repair, preserve, and sustain what the institution takes on.",
        bullets: [
          "A project may be better kept small when scale would outrun maintenance or accountability.",
          "A tool may be better released openly when enclosure would weaken its public value.",
          "A partnership may be refused when the consequence chain cannot be represented or governed coherently.",
          "Revenue does not automatically justify a product, customer, or institutional relationship.",
          "Stopping, transferring, maintaining, or retiring can be more lawful outcomes than continued growth.",
          "Restraint is treated as an admissible engineering decision rather than evidence of insufficient ambition.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md#Capacity-Before-Expansion",
      },
    ],
  },
  "how-we-work": {
    body: [
      "One bounded contribution at a time is also a publication and delivery rule. A useful artifact should make its primary domain, intended audience, contribution, evidence mode, claim ceiling, and next gate visible enough that a success in one lane cannot quietly validate a stronger claim somewhere else.",
      "Inquiry is agentic in the ordinary operational sense: people, teams, instruments, software, and institutions choose boundaries, construct representations, intervene, compare alternatives, decide when evidence is sufficient, and remain responsible for revision. The point is to make those choices visible rather than pretending disciplined inquiry happens automatically once a method name has been invoked.",
    ],
    inspection: [
      {
        id: "work-one-bounded-contribution",
        label: "One artifact, one primary contribution",
        eyebrow: "Publication and delivery discipline",
        summary:
          "Breadth is governed by keeping the main claim, audience, evidence mode, and validation neighborhood of each public artifact bounded.",
        bullets: [
          "Name the primary domain in which the claim has meaning.",
          "Name the audience expected to use, criticize, reproduce, or maintain the artifact.",
          "State the primary contribution rather than asking one artifact to prove an entire research program.",
          "State the evidence mode: proof, implementation, benchmark, observation, worked case, source analysis, legal authority, domain review, or another bounded witness.",
          "State the claim ceiling and the stronger claims the artifact does not establish.",
          "Keep the next admissible gate visible: test, review, field use, replication, maintenance evidence, formal proof, or retirement.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/03_The_Institute.md#Research-and-Claim-Discipline",
      },
      {
        id: "work-agentic-inquiry",
        label: "Inquiry has actors and authority",
        eyebrow: "Agentic scientific method lineage",
        summary:
          "Observation, representation, hypothesis, intervention, criticism, repair, and promotion are performed by identifiable actors using instruments and institutional permissions; those choices remain part of the method.",
        bullets: [
          "Observation is already bounded by instruments, access, selection, and the representation chosen to record it.",
          "Hypotheses inherit assumptions from the representation in which they are stated.",
          "Execution or intervention requires authority appropriate to the consequence of the action.",
          "Criticism should be able to disagree with the generating representation rather than merely paraphrase it.",
          "Repair changes the representation, implementation, or procedure that failed the retained evidence.",
          "Promotion is an accountable decision about standing, not an automatic result of time, repetition, or rhetorical confidence.",
        ],
        sourceRef:
          "backlog/10_social_mission_preagent_ux/03_The_Institute.md#From-Theory-to-Instruments + bfl_public_content_flat_dedup_v0_3.json#agenticScientificMethod",
      },
      {
        id: "work-stop-rules",
        label: "Stop rules are part of the method",
        eyebrow: "Negative capability",
        summary:
          "A disciplined process needs admissible ways to remain bounded, reject a hypothesis, stop a product, transfer stewardship, or retire a representation rather than treating continuation as the default proof of value.",
        bullets: [
          "A negative result can close a bounded research question without becoming a failed project.",
          "A comparison may show that an established method already carries the needed structure more simply.",
          "A pilot may remain a pilot when the evidence does not justify wider promotion.",
          "A product may stop when maintenance burden, consequence, or demand no longer justifies continuation.",
          "A public artifact may be transferred when another steward can maintain it more responsibly.",
          "A claim may be narrowed, superseded, or retired while preserving the evidence trail that explains the change.",
        ],
        sourceRef:
          "backlog/10_social_mission_preagent_ux/05_founders_note.md + 06_BFL_ethos.md + 03_The_Institute.md",
      },
    ],
  },
  provenance: {
    body: [
      "The institutional transition can be read as founder -> work -> lab. The founder supplies provenance and present accountability for how the corpus came to exist. The work supplies the substance that can be inspected independently of biography. The lab supplies stewardship: the rules and capacity by which artifacts are reviewed, corrected, promoted, maintained, retired, transferred, or replaced.",
    ],
    inspection: [
      {
        id: "provenance-founder-work-lab",
        label: "Founder, work, lab",
        eyebrow: "Three different responsibilities",
        summary:
          "Keeping origin, substance, and stewardship distinct allows the work to retain accountable lineage while becoming less dependent on personal authority.",
        bullets: [
          "Founder -> provenance: where the questions came from, how the corpus developed, and who remains responsible for its present architecture.",
          "Work -> substance: definitions, methods, software, experiments, claims, negative results, tools, and bounded applications that can be inspected on their own terms.",
          "Lab -> stewardship: review, criticism, correction, promotion, maintenance, retirement, transfer, and continuity.",
          "Biography explains origin; it does not validate theory.",
          "Institutional branding explains stewardship intent; it does not manufacture evidence.",
          "The long-term goal is work that other capable people can understand, challenge, improve, operate, and steward without erasing where it came from.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/03_The_Institute.md#Why-an-Institute",
      },
    ],
  },
  contact: {
    body: [
      "Boundaries are not barriers to collaboration; they are conditions that make collaboration coherent. A useful relationship makes the difference between what Boundary First Labs brings and what the other party brings explicit enough that authority, contribution, evidence, ownership, risk, and continuing responsibility do not blur together.",
      "The governing collaboration question is: what is the smallest relationship that allows the work to encounter the strongest relevant reality? Sometimes that is expert criticism. Sometimes it is a bounded pilot, co-development effort, publication relationship, sponsor, funder, customer, licensee, or steward. The relationship should be no larger than the evidence or purpose requires.",
    ],
    links: [
      {
        label: "How We Work",
        href: "/about/how-we-work",
        eyebrow: "Operating contract",
        summary: "How claims, artifacts, evidence, criticism, repair, and promotion are separated.",
      },
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "Concrete operating surfaces",
        summary: "Current programs and bounded services where collaboration can attach to an inspectable object.",
      },
    ],
    inspection: [
      {
        id: "contact-collaboration-contract",
        label: "A collaboration should explain the difference",
        eyebrow: "Coherent relationship boundary",
        summary:
          "The retained collaboration doctrine starts with complementarity rather than generic partnership language.",
        bullets: [
          "What does Boundary First Labs bring that the collaborator does not already have?",
          "What does the collaborator bring that Boundary First Labs cannot or should not build alone?",
          "Which authority remains with each party?",
          "Which evidence, access, infrastructure, domain knowledge, implementation capacity, distribution, capital, or stewardship is actually being contributed?",
          "What artifact or decision should exist at the end of the relationship?",
          "What is the smallest relationship that allows the work to encounter the strongest relevant reality?",
          "No relationship is represented publicly as a partnership, endorsement, sponsorship, review, or validation until that relationship actually exists and its scope is known.",
        ],
        sourceRef:
          "backlog/10_social_mission_preagent_ux/bfl_public_content_flat_dedup_v0_3.json#collaboration + 05_founders_note.md",
      },
      {
        id: "contact-relationship-types",
        label: "Different relationships answer different questions",
        eyebrow: "Do not collapse collaboration into one label",
        summary:
          "The retained public content distinguishes relationship types because expert criticism, customer use, sponsorship, investment, licensing, and co-development create different authority and evidence implications.",
        bullets: [
          "Expert review: test whether a bounded claim, method, or representation survives domain criticism.",
          "Advisory relationship: supply recurring expertise without implying adoption or independent validation.",
          "Institutional pilot: test a bounded instrument or method against real operating conditions and retain the resulting evidence.",
          "Co-development: share construction responsibility under explicit ownership, decision, and maintenance boundaries.",
          "Publication: improve, edit, distribute, or formally review an artifact without converting publication into proof.",
          "Sponsorship or investment: supply runway or resources while keeping funder status distinct from technical validation.",
          "Licensing or customer use: create a commercial relationship whose evidence is use and delivery, not automatic endorsement of the broader research program.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/bfl_public_content_flat_dedup_v0_3.json#collaboration.relationshipTypes",
      },
      {
        id: "contact-engagement-witness",
        label: "A bounded engagement should leave a witness",
        eyebrow: "What changed because we worked together?",
        summary:
          "The smallest useful relationship should produce an inspectable artifact or decision that lets both parties tell whether the engagement actually reduced uncertainty or improved the system.",
        bullets: [
          "A review can end in a critic memo, corrected claim boundary, or explicit rejection.",
          "A diagnostic can end in a boundary map, responsibility map, failure model, evidence register, or repair plan.",
          "A pilot can end in an implemented slice, retained observations, benchmark, incident record, or go/no-go decision.",
          "A research collaboration can end in a reproducible experiment, source register, counterexample, formal obligation, or publication-ready bounded result.",
          "A public-interest engagement can end in a maintained dataset, map, analysis, tool, procedure, or stewardship decision.",
          "The witness is not required to be positive; a well-supported decision not to proceed is a valid result.",
        ],
        sourceRef: "Boundary First engagement doctrine synthesized from 03_The_Institute.md + 05_founders_note.md",
      },
    ],
  },
  "public-interest": {
    body: [
      "The posture is reconstructive rather than merely oppositional. Boundary First Labs does not reject institutions, expertise, markets, software, public authority, or technological progress as categories. It asks whether the mechanisms carrying those forms remain answerable to the responsibilities and consequences they claim to govern.",
      "Public-purpose work can therefore take different forms: software, a dataset, a map, a public analysis, an educational surface, an audit instrument, a research program, an institutional design, or a stewardship relationship. Not every public good needs to become a product, and not every product needs to carry the whole public mission.",
    ],
    links: [
      {
        label: "Mission",
        href: "/public-interest/mission",
        eyebrow: "Why",
        summary: "The consequence problem the public-interest work is trying to make more tractable.",
      },
      {
        label: "Principles",
        href: "/public-interest/principles",
        eyebrow: "Constraints",
        summary: "The commitments that limit how public-purpose capacity may be built, scaled, and exercised.",
      },
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "Operative surfaces",
        summary: "Where methods and research are currently becoming software and bounded services.",
      },
    ],
    inspection: [
      {
        id: "public-interest-reconstructive",
        label: "Reconstructive, not merely oppositional",
        eyebrow: "Institutional posture",
        summary:
          "The public critique is strongest when it can name the mechanism that should replace or repair the failure rather than stopping at institutional distrust.",
        bullets: [
          "Authority can coordinate action, but authority cannot make a false representation true.",
          "Institutions can preserve memory, responsibility, continuity, care, and public capacity across time.",
          "The failure is institutional closure that protects procedure while exporting consequence.",
          "Repair therefore asks for bounded authority, reasons, evidence, affected-party representation, maintenance, contestability, and a path to actual correction.",
          "The goal is not weaker institutions by default; it is institutions capable enough to meet obligations without becoming less answerable as their power grows.",
        ],
        sourceRef:
          "src/content/public-projections/home.json#institutionalCritique + backlog/10_social_mission_preagent_ux/07_public_mission.md",
      },
    ],
  },
  "public-mission": {
    body: [
      "A useful public-system return path can be read as representation -> action -> consequence -> witness -> contest -> repair -> learning. The exact mechanism differs by domain, but the structural burden is similar: once a representation can change somebody's world, evidence from that consequence needs a lawful route back into the system that acted.",
    ],
    inspection: [
      {
        id: "mission-abstraction-return-path",
        label: "What abstraction without return looks like",
        eyebrow: "Representation must remain revisable",
        summary:
          "Abstraction is necessary; the defect appears when the representation can govern reality while affected evidence has no practical route back into the model.",
        bullets: [
          "The form says complete while the person or downstream process remains open.",
          "The dashboard says healthy while maintainers compensate for missing states off the record.",
          "The category succeeds administratively while a distinction the consequence still depends on disappears.",
          "The automated decision executes while responsibility, explanation, and repair diffuse across organizations or vendors.",
          "The local ledger closes while labor, maintenance, environmental, household, or future burdens move into another interior.",
          "A return path is real only when retained evidence can change representation, responsibility, behavior, or repair rather than being merely collected.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md#The-Problem-Is-Abstraction-Without-Return",
      },
      {
        id: "mission-institutional-capability",
        label: "Institutional capability should reduce compensating human labor",
        eyebrow: "Three scales of help · institution level",
        summary:
          "The institutional aim is not simply more authority; it is enough practical capacity to understand obligations, act within the declared boundary, observe consequence, maintain what persists, and repair what fails.",
        bullets: [
          "People should not have to repeatedly finish institutional processes the institution represents as complete.",
          "Practitioners and communities often hold local distinctions that formal systems need but have failed to represent.",
          "Institutions need enough authority, evidence, maintenance capacity, and repair resources to own the obligations they accept.",
          "Greater institutional capability does not license greater unanswerable control.",
          "The compact test is whether institutional capability reduces the amount of invisible compensating work pushed onto the people who depend on the institution.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/07_public_mission.md#Three-Scales-of-Help",
      },
    ],
  },
  "public-principles": {
    body: [
      "The retained governance language turns several broad values into immediate operating tests: declare authority before exercising it, keep provenance attached to claims, scale review with consequence, preserve uncertainty, represent affected parties and residual burdens, and give consequential decisions meaningful contest and appeal.",
      "Two additional constraints keep institutional ambition bounded. Capacity comes before expansion, and contribution matters more than prestige. Growth is justified only when the lab can steward the added obligation; stature is measured by durable capability left in the world rather than by a self-awarded category.",
    ],
    inspection: [
      {
        id: "principles-governance-tests",
        label: "Compact governance tests",
        eyebrow: "From values to immediate checks",
        summary:
          "The normalized public-content master retains a concise set of commitments that can be applied to a publication, product, audit, collaboration, or institutional decision before it is promoted.",
        bullets: [
          "Declare authority before exercising it.",
          "Keep provenance attached to claims.",
          "Scale review with consequence.",
          "Preserve uncertainty rather than converting confidence into false precision.",
          "Represent affected parties and residual burdens.",
          "Give consequential decisions meaningful contest and appeal where the domain permits it.",
          "Keep the correction, repair, and recurrence-prevention path attached to the decision rather than treating them as downstream goodwill.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/bfl_public_content_flat_dedup_v0_3.json#governance",
      },
      {
        id: "principles-world-class-contribution",
        label: "World class is what you give the world",
        eyebrow: "Contribution standard, not prestige certification",
        summary:
          "The published ethos uses world class as a responsibility test: whether the institution leaves durable capability in the world rather than merely acquiring status for itself.",
        bullets: [
          "Did the work create knowledge other people can use?",
          "Did it make difficult material more legible without falsifying it?",
          "Did it transfer practical capability rather than manufacture avoidable dependence?",
          "Did it preserve or create public goods that outlast the immediate engagement?",
          "Did it produce tools or practices that remain useful after Boundary First Labs leaves?",
          "Did it repair a system without making the lab permanently indispensable to the repair?",
          "This is an institutional aspiration and contribution standard, not a certification of quality, universal impact metric, or hierarchy of human worth.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md#World-Class-Is-a-Contribution-Standard",
      },
      {
        id: "principles-stewardship-before-possession",
        label: "Stewardship before possession",
        eyebrow: "Power creates future obligation",
        summary:
          "Taking responsibility for software, data, public language, research, or institutional power creates duties that persist after the moment of construction or acquisition.",
        bullets: [
          "Know what has been entrusted and which distinctions make it usable.",
          "Record what changed and which new actions the change permits.",
          "Maintain what persists rather than treating launch as closure.",
          "Repair what fails and preserve enough history to understand why the repair was required.",
          "Transfer or retire what can no longer be stewarded responsibly.",
          "Every construction creates a future obligation until maintenance, transfer, replacement, or retirement closes that obligation explicitly.",
        ],
        sourceRef: "backlog/10_social_mission_preagent_ux/06_BFL_ethos.md#Stewardship-Before-Possession",
      },
    ],
  },
};

function appendPublicDepth(node: ContentNode, override: PublicDepthOverride): ContentNode {
  return {
    ...node,
    body: override.body ? [...(node.body ?? []), ...override.body] : node.body,
    links: override.links ? [...(node.links ?? []), ...override.links] : node.links,
    inspection: override.inspection
      ? [...(node.inspection ?? []), ...override.inspection]
      : node.inspection,
  };
}

export function hydratePublicDepthNode(node: ContentNode): ContentNode {
  const override = publicDepthOverrides[node.id];
  return override ? appendPublicDepth(node, override) : node;
}
