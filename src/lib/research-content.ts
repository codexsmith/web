import type { ContentNode } from "@/lib/content";

type ResearchOverride = Pick<
  ContentNode,
  "eyebrow" | "summary" | "body" | "links" | "inspection"
>;

const researchOverrides: Record<string, ResearchOverride> = {
  research: {
    eyebrow: "Evidence, mechanism, and bounded formalization",
    summary:
      "The support layer beneath the Lab's operative surfaces: research that explains mechanisms, tests transport, records breakpoints, and keeps products, public-interest work, and formal claims inside their evidence boundary.",
    body: [
      "Research is not a validation halo around the rest of Boundary First Labs. Its job is to make the operative surfaces more answerable: explain why a mechanism should work, identify what would falsify it, preserve negative results, distinguish analogy from structure, and show where a product, method, civic claim, or formal theory still depends on unresolved evidence.",
      "Start near practice, then move deeper only when the question requires it. Cross-cutting institutional research remains related material rather than being forced into a single branch.",
    ],
    links: [
      {
        label: "Current Work",
        href: "/products/current",
        eyebrow: "Operative surface",
        summary: "Where research is being turned into software and bounded services.",
      },
      {
        label: "Public Interest",
        href: "/public-interest",
        eyebrow: "Consequence surface",
        summary: "Where authority, accessibility, public legibility, maintenance, and repair become institutional commitments.",
      },
      {
        label: "How We Work",
        href: "/about/how-we-work",
        eyebrow: "Method and release discipline",
        summary: "How the lab separates source, hypothesis, implementation, observation, repair, and promotion.",
      },
    ],
    inspection: [
      {
        id: "research-operative-support-map",
        label: "How research supports the operative surfaces",
        eyebrow: "Support map",
        summary:
          "The operative surfaces are allowed to borrow only the research that actually bears on their mechanism and claim boundary.",
        bullets: [
          "Products use software and research results as design input, not as permission to claim deployment, adoption, or effectiveness that has not been observed.",
          "Public Interest uses institutional, governance, accessibility, consequence, and repair research while keeping normative commitments distinct from empirical or legal claims.",
          "About uses research provenance and release discipline to explain how the lab works; biography and institutional identity do not validate technical results.",
          "Software doctrine is the closest bridge between research and operation because representations, state, authority, failure, and repair become executable there.",
          "Foundations and formal theory may ground deeper mechanisms, but they do not automatically validate a product, policy position, or cross-domain application.",
        ],
        sourceRef: "v2 Research support projection over retained public corpus",
        links: [
          {
            label: "See Products",
            href: "/products",
            eyebrow: "Build surface",
          },
          {
            label: "See Public Interest",
            href: "/public-interest",
            eyebrow: "Public-purpose surface",
          },
          {
            label: "See About",
            href: "/about",
            eyebrow: "Institutional surface",
          },
        ],
      },
      {
        id: "research-social-lawfulness",
        label: "Social Lawfulness, Consequence, and Repair",
        eyebrow: "Program preview · cross-cutting institutional research",
        summary:
          "A developing program asks how social, economic, digital, and scientific systems represent authority, standing, evidence, consequence, and repair without pretending those domains are identical.",
        bullets: [
          "Social lawfulness asks whether authority is bounded, affected parties remain visible, consequence can be attributed, and correction remains possible.",
          "Consequence accounting asks which burdens cross the ledger boundary into workers, households, communities, infrastructure, ecosystems, or the future.",
          "Delegated agency research asks whether institutional and digital intermediaries preserve a legible return path from authorized purpose to consequence and repair.",
          "The scientific-method lane asks what boundary and representation work has to happen before ordinary hypothesis testing can be trusted to address the intended system.",
          "Current claim ceiling: research and publication program, not a completed social theory, economic model, legal doctrine, or replacement scientific method.",
        ],
        sourceRef: "src/content/artifacts/social-lawfulness-consequence-and-repair.md",
        links: [
          {
            label: "Public Mission",
            href: "/public-interest/mission",
            eyebrow: "Operative public commitment",
          },
          {
            label: "Agency & Representation Audit",
            href: "/products/current/agency-representation-audit",
            eyebrow: "Bounded applied instrument",
          },
          {
            label: "Constitutional Law & Jurisprudence",
            href: "/research/applied-testbeds/law",
            eyebrow: "Bounded legal testbed",
          },
        ],
      },
      {
        id: "research-people-not-overhead",
        label: "People Make the Value. People Are Not Overhead.",
        eyebrow: "Public doctrine seed · consequence accounting",
        summary:
          "A bounded institutional argument that distinguishes legitimate accounting categories from the stronger mistake of treating human capacity, hidden repair labor, and displaced burden as if they vanished outside the reporting boundary.",
        bullets: [
          "The doctrine does not deny that wages can be expenses or that capital, infrastructure, tools, ecosystems, and accumulated knowledge contribute to value.",
          "Its target is the overhead inversion: value is claimed inside the institution while the conditions that sustain people and the costs of repair are treated as external.",
          "The human-capacity test asks which capacities an apparent efficiency preserves, regenerates, consumes, or transfers.",
          "The delegated-agency test asks whether business-to-business and automated chains still return value, evidence, standing, consequence, and repair to a human or public terminus.",
          "A companion non-scored worksheet turns the doctrine into a bounded review of one decision, workflow, automation, vendor relationship, service, or product slice.",
        ],
        sourceRef:
          "src/content/artifacts/people-make-the-value-people-are-not-overhead.md + people-are-not-overhead-review-worksheet.md",
        links: [
          {
            label: "Public Interest Principles",
            href: "/public-interest/principles",
            eyebrow: "Institutional commitment",
          },
          {
            label: "Agency & Representation Audit",
            href: "/products/current/agency-representation-audit",
            eyebrow: "Possible applied surface",
          },
          {
            label: "Need & Capacity Map",
            href: "/products/pipeline/need-capacity-map",
            eyebrow: "Planned public-interest product direction",
          },
        ],
      },
      {
        id: "research-digital-non-aggression",
        label: "Digital Non-Aggression, Non-Destruction, and Non-Interference",
        eyebrow: "Concept-stage governance and engineering program",
        summary:
          "A developing program on automated digital aggression, authorized-purpose integrity, responsibility continuity, bounded defensive exceptions, and repair in connected agentic systems.",
        bullets: [
          "Non-aggression concerns initiating, delegating, automating, or knowingly propagating unauthorized hostile digital operations.",
          "Non-destruction concerns protected data, identity, memory, models, infrastructure, and essential capabilities remaining recoverable rather than irreversibly damaged.",
          "Non-interference concerns covert substitution of a system's authorized purpose, instructions, memory, identity, representation, decisions, or tool use.",
          "Authorized-purpose integrity protects accountable human and institutional purposes; it is not a claim of artificial sovereignty or personhood.",
          "Current claim ceiling: concept-stage program requiring primary-source security review, legal and standards mapping, control testing, and independent security/civil-liberties review.",
        ],
        sourceRef: "src/content/artifacts/digital-non-aggression-program-introduction.md",
        links: [
          {
            label: "Verification & Governance",
            href: "/research/software/verification-governance",
            eyebrow: "Operational software support",
          },
          {
            label: "Goals & Aspirations",
            href: "/public-interest/goals-aspirations",
            eyebrow: "Future public capacity",
          },
        ],
      },
    ],
  },
  software: {
    eyebrow: "Research nearest the executable surface",
    summary:
      "Software is both the Lab's primary engineering medium and its most exposed research instrument: representations must compile into state, authority, transitions, observation, consequence, and repair.",
    body: [
      "The software branch is where Boundary First claims should be easiest to challenge because a representation eventually has to run. Missing states become exceptions, wrong ownership becomes coupling, incomplete authority becomes a permission defect, and false closure returns through tests, operations, users, or downstream systems.",
      "That does not make software a universal model of institutions, mathematics, law, or people. It makes software a useful laboratory for studying explicit representation under execution pressure and for generating bounded hypotheses that must still be revalidated in the target domain.",
    ],
    links: [
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Current product program",
        summary: "Research operations, typed claims, criticism, promotion, supersession, and repair made executable.",
      },
      {
        label: "Agency & Representation Audit",
        href: "/products/current/agency-representation-audit",
        eyebrow: "Current pilot surface",
        summary: "Authority, representation, consequence, contestability, and repair applied to one bounded process.",
      },
      {
        label: "CityWatch",
        href: "/products/shipped/citywatch",
        eyebrow: "Historical shipped evidence",
        summary: "A prior civic-software example of reconciling fragmented public records into an inspectable representation.",
      },
    ],
    inspection: [
      {
        id: "research-language-garden",
        label: "Governing the Language Garden",
        eyebrow: "Proposed operating policy · website and publication governance",
        summary:
          "A retained operations note treats public terminology itself as governed state so generative language does not silently promote slogans into claims or erase provenance when wording changes.",
        bullets: [
          "Promoted phrases carry a declared meaning, intended context, source path, claim ceiling, known ambiguity, and replacement path.",
          "Institutional, software-native, formal-research, public-philosophy, and playful registers have different admissibility rules.",
          "Formal terms such as operational homology require source definitions, preserved structure, breakpoints, evidence level, and a next test.",
          "Replacement is append-only: successor language may supersede a phrase without destroying the provenance of the earlier record.",
          "Current policy state: adopted for the local website implementation while founder approval of some canonical wording remains open.",
        ],
        sourceRef: "src/content/artifacts/governing-the-language-garden.md",
        links: [
          {
            label: "Corpus Forge",
            href: "/products/current/corpus-forge",
            eyebrow: "Governed corpus implementation",
          },
          {
            label: "How We Work",
            href: "/about/how-we-work",
            eyebrow: "Institutional release discipline",
          },
        ],
      },
    ],
  },
  "verification-governance": {
    eyebrow: "Independent consequence, authority, and earned closure",
    summary:
      "Testing, observability, provenance, permissions, auditability, repair, and lifecycle responsibility become one research problem when a representation can cause real state change.",
    body: [
      "The governing research question is whether a claim can encounter a consequence channel independent enough to expose meaningful discrepancy, and whether the system keeps that discrepancy open until responsibility, authorized repair, rerun evidence, and closure are explicit.",
      "This is especially important for AI-assisted work because generation, review, implementation, diagnosis, and verification can otherwise collapse into derivative representations that agree fluently without contacting the claimed consequence.",
    ],
    links: [
      {
        label: "Agency & Representation Audit",
        href: "/products/current/agency-representation-audit",
        eyebrow: "Applied pilot surface",
        summary: "A bounded systems audit for authority, consequence, contestability, and repair.",
      },
      {
        label: "Corpus Forge",
        href: "/products/current/corpus-forge",
        eyebrow: "Research operations implementation",
        summary: "A current program where claim state, criticism, promotion, and supersession are represented explicitly.",
      },
      {
        label: "Public Interest Principles",
        href: "/public-interest/principles",
        eyebrow: "Institutional constraint",
        summary: "Why responsibility, maintenance, contestability, and repair remain public-purpose requirements rather than software-only concerns.",
      },
    ],
    inspection: [
      {
        id: "consequence-bearing-development",
        label: "Consequence-Bearing Development and AI Repair Loops",
        eyebrow: "Candidate operating framework",
        summary:
          "A developing operating framework keeps work open until an independent consequence channel can answer the claim, discrepancy is owned, repair occurs, and closure is earned.",
        bullets: [
          "Candidate sequence: Represent -> Bound -> Commit -> Execute -> Instrument -> Observe -> Compare -> Repair -> Verify -> Close.",
          "The circuit preserves what was claimed, authorized, done, observed, inferred, repaired, and left open as separate records.",
          "The AI Repair Loop keeps generation, detection, diagnosis, repair design, authorization, execution, verification, and closure distinct even if one system assists several stages.",
          "Its authority ladder moves from observation through reversible sandbox work toward human-approved consequential repair; irreversible or institutionally binding actions remain outside autonomous permission.",
          "Current claim ceiling: candidate operating framework requiring worked cases, field use, red-team review, and comparison with established assurance, safety, incident-response, human-factors, and AI-governance practices.",
        ],
        sourceRef: "src/content/artifacts/consequence-bearing-development-and-ai-repair-loops.md",
        links: [
          {
            label: "Agency & Representation Audit",
            href: "/products/current/agency-representation-audit",
            eyebrow: "Applied service bridge",
          },
          {
            label: "Closure-Driven Software Development",
            href: "/closure-driven-software-development",
            eyebrow: "Practitioner method",
          },
        ],
      },
      {
        id: "bounded-consequence-circuit",
        label: "The Bounded Consequence Circuit",
        eyebrow: "Candidate protocol preview",
        summary:
          "The protocol layer beneath Consequence-Bearing Development proposes explicit stage gates for claim admissibility, authority, evidence integrity, repair, and closure.",
        bullets: [
          "Minimum circuit objects include a typed claim, boundary, protected invariants, affected parties, expected consequence, discriminating observation channel, discrepancy rule, repair permissions, escalation conditions, verification, and closure authority.",
          "The candidate state model routes material discrepancy into REPAIR_REQUIRED rather than allowing it to disappear into discussion or project status.",
          "Five gates test claim admissibility, commitment admissibility, evidence integrity, repair admissibility, and closure admissibility.",
          "The protocol separates claim steward, consequence steward, repair operator, authority holder, and closure witness, while allowing low-risk work to combine roles transparently.",
          "Current claim ceiling: protocol preview, not a validated standard or certification scheme; the next proof is a complete worked circuit with discrepancy, authorized repair, rerun verification, and reopenable closure record.",
        ],
        sourceRef: "src/content/artifacts/bounded-consequence-circuit-protocol-preview.md",
      },
    ],
  },
  "applied-testbeds": {
    eyebrow: "Bounded places where transport can fail",
    summary:
      "Weather, games, sport, and law are not decoration around the theory. They are deliberately different domains used to discover where Boundary First language survives contact with native structure and where it breaks.",
    body: [
      "A useful testbed has enough native structure to resist the framework. Chess supplies discrete legal state and transparent rules; soccer adds continuous noisy multi-agent behavior; weather adds high-dimensional measurement, uncertainty, dynamics, and established scientific baselines; law adds authority, interpretation, standing, procedure, contest, and jurisdiction.",
      "A successful testbed result may be a rejection, a bounded analogy, a narrower instrument, or a domain-specific repair. The testbed does not owe the framework a positive result.",
    ],
    inspection: [
      {
        id: "research-testbed-promotion-rule",
        label: "Testbed promotion rule",
        eyebrow: "Negative-capable validation",
        summary:
          "Transport earns promotion only when the target domain's own objects, transitions, invariants, evidence, and failure modes remain legible after mapping.",
        bullets: [
          "Start with native domain definitions rather than Boundary First vocabulary.",
          "Name what the mapping preserves and what it erases.",
          "Compare against competent existing methods rather than a weak straw baseline.",
          "Record counterexamples and breakpoints before generalizing.",
          "Treat an informative negative result as progress when it prevents a stronger false cross-domain claim.",
        ],
        sourceRef: "Testing Cross-Domain Operational Homology research discipline + applied public testbeds",
      },
    ],
  },
  foundations: {
    eyebrow: "Calibration primitives, not marketing premises",
    summary:
      "Distinction, bound distinction, the bit, and Distinction Space are deeper research objects used to calibrate the representational machinery under the software doctrine.",
    body: [
      "The foundations branch asks what has to be present before a state, object, type, relation, boundary, or operation can be represented at all. The bit is useful as a calibration anchor because computation gives a familiar lawful route from a minimal distinction into compositional state-transition systems.",
      "These primitives are research commitments, not prerequisites a software client has to accept. A product or engineering method should stand on its own operational evidence even if the deeper formalization is later revised.",
    ],
    inspection: [
      {
        id: "research-foundation-calibration",
        label: "Foundation calibration ladder",
        eyebrow: "From minimal distinction toward formal space",
        summary:
          "The current foundation sequence is a research scaffold for asking how identity, admissibility, relation, and transformation become possible without silently importing more structure than the primitive can carry.",
        bullets: [
          "Distinction: a difference that can be represented or acted upon.",
          "Bound Distinction: a distinction whose identity and admissible operations are maintained within a declared boundary or grammar.",
          "The Bit: a known computational calibration case for a minimal binary distinction participating in larger lawful systems.",
          "Distinction Space: the proposed formal setting in which distinctions, boundaries, relations, transformations, and generated possibility spaces can be studied explicitly.",
          "Open burden: specify structure-preserving maps rather than treating conceptual resemblance to bits, types, sets, or spaces as proof.",
        ],
        sourceRef: "v2 formal-foundations synthesis over retained Boundary Theory / Schemathematics corpus",
        links: [
          {
            label: "Executable Representation",
            href: "/research/software/executable-representation",
            eyebrow: "Nearest operational bridge",
          },
        ],
      },
    ],
  },
  "formal-theory": {
    eyebrow: "Strongest claim bar",
    summary:
      "Formal work asks whether the recurring representational structures can be defined precisely enough to support proofs, counterexamples, composition, and independently checkable derivations.",
    body: [
      "The formal branch is intentionally downstream of operational examples. A shared vocabulary, compelling diagram, repeated software pattern, or cross-domain analogy can motivate a formal question; none by itself establishes a new mathematical object, equivalence, physical law, or universal grammar.",
      "Promotion requires explicit carriers, maps, invariants, composition rules, counterexamples, and comparison with existing mathematics or formal computer science. Where those are absent, the public claim remains a research program rather than a result.",
    ],
    inspection: [
      {
        id: "research-formal-promotion",
        label: "From resemblance to formal claim",
        eyebrow: "Promotion discipline",
        summary:
          "The Operational Homology program supplies a useful ladder for preventing recurring vocabulary from being mistaken for established cross-domain structure.",
        bullets: [
          "L0: token resemblance.",
          "L1: semantic resemblance.",
          "L2: functional-role resemblance.",
          "L3: transition and invariant preservation.",
          "L4: failure, witness, responsibility, and repair preservation.",
          "L5: a declared formal carrier with composition-preserving maps and formal review.",
          "No mapping below L4 is called an operational homology in the current research program.",
        ],
        sourceRef: "src/content/artifacts/testing-cross-domain-operational-homology.md",
      },
    ],
  },
  "boundary-theory": {
    eyebrow: "Cross-domain formal research under adversarial claim control",
    summary:
      "A research program asking whether distinctions, boundaries, representation, closure, and repair admit rigorous structure-preserving relationships across selected domains without collapsing the domains into one another.",
    body: [
      "Boundary Theory is strongest when it behaves as a testing program rather than a universal vocabulary. Candidate correspondences must begin with native domain structure, declare preserved and lost information, identify breakpoints, and remain demotable when formal or empirical evidence does not support the mapping.",
      "The current public burden is therefore narrower than proving a universal theory: construct bounded carriers and examples, preserve counterexamples, distinguish analogical usefulness from homology, and make each stronger promotion independently checkable.",
    ],
    links: [
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Operational bridge",
        summary: "Where representation, state, admissible transition, invariants, and repair are made runnable.",
      },
      {
        label: "Public Mission",
        href: "/public-interest/mission",
        eyebrow: "Normative boundary",
        summary: "A public-purpose commitment that must not borrow formal validity merely from fitting the same vocabulary.",
      },
    ],
    inspection: [
      {
        id: "operational-homology-program",
        label: "Testing Cross-Domain Operational Homology",
        eyebrow: "Active bounded research program",
        summary:
          "A negative-capable program tests whether selected mappings preserve linked operational structure rather than merely sharing terminology.",
        bullets: [
          "The unit of comparison is a tuple of entity roles, relations, state representation, admissible transitions, protected invariants, boundary conditions, witness mechanisms, failure modes, responsibility routing, and repair operations.",
          "The current program includes two bounded cases: invoice approval/payment/settlement and research-claim promotion/supersession.",
          "The invoice case currently earns an L3 bounded structural analogy; the research-provenance case earns an L4 operational-homology candidate for continued testing.",
          "A counterexample ledger explicitly rejects or bounds mappings such as software inheritance -> biological inheritance, object identity -> personal identity, compilation -> judicial interpretation, and database rollback -> historical repair.",
          "Open gates include external domain review, executable baseline comparison, independent review, a declared formal carrier, a composition test, and prospective replication.",
        ],
        sourceRef: "src/content/artifacts/testing-cross-domain-operational-homology.md",
        links: [
          {
            label: "Corpus Forge",
            href: "/products/current/corpus-forge",
            eyebrow: "One documented bounded case",
          },
          {
            label: "Constitutional Law & Jurisprudence",
            href: "/research/applied-testbeds/law",
            eyebrow: "Domain where mapping must remain bounded",
          },
        ],
      },
    ],
  },
};

export function hydrateResearchNode(node: ContentNode): ContentNode {
  const override = researchOverrides[node.id];
  return override ? { ...node, ...override } : node;
}
