import type { ContentNode } from "@/lib/content";

type ResearchDepthOverride = Partial<
  Pick<ContentNode, "body" | "links" | "inspection">
>;

const researchDepthOverrides: Record<string, ResearchDepthOverride> = {
  research: {
    inspection: [
      {
        id: "research-entry-by-intent",
        label: "Choose the research by intent",
        eyebrow: "Audience and use-case overlay",
        summary:
          "The retained audience registry treats visitor intent as a routing overlay rather than a replacement for the canonical research graph.",
        bullets: [
          "Understand the central idea: begin with one bounded example, acquire only the vocabulary needed for the next step, then move toward Foundations or Formal Theory.",
          "Diagnose a recurring system failure: begin in Software with boundaries, invariants, state, authority, failure, and repair before moving into deeper formal machinery.",
          "Use practical tools and methods: begin with Boundary First Engineering, Verification & Governance, and the applied product surfaces.",
          "Evaluate or challenge the research: go directly to formal claim ceilings, evidence records, counterexamples, negative results, and the strongest unresolved gates.",
          "Build or collaborate: inspect Current Work and the specific research program first, then use About / Contact once the bounded object of collaboration is clear.",
          "Recover representation, agency, or repair: Public Interest and the Agency & Representation Audit are the most direct consequence-facing entrances.",
        ],
        sourceRef: "src/content/audience_nodes.json",
        links: [
          {
            label: "Software",
            href: "/research/software",
            eyebrow: "Diagnose and apply",
          },
          {
            label: "Applied Testbeds",
            href: "/research/applied-testbeds",
            eyebrow: "Understand through bounded domains",
          },
          {
            label: "Formal Theory",
            href: "/research/formal-theory",
            eyebrow: "Evaluate stronger claims",
          },
          {
            label: "Contact",
            href: "/about/contact",
            eyebrow: "Bounded collaboration",
          },
        ],
      },
      {
        id: "research-progressive-disclosure",
        label: "Grok, navigate, dive, apply",
        eyebrow: "Learning-path contract",
        summary:
          "A retained publication pathway separates memorable orientation, structural navigation, evidence depth, and hands-on application so visitors do not have to absorb the entire corpus at once.",
        bullets: [
          "Grok: one memorable proposition and only the minimum new terms required to use it.",
          "Navigate: preserve position, neighbors, and the route already taken through the graph.",
          "Dive: open doctrine, evidence, examples, and source records without losing the current subject.",
          "Apply: manipulate a boundary, diagnose a defect, compare a representation, or choose a repair before promoting the idea further.",
          "Progressive disclosure runs from compact proposition to explanation, mechanism, worked example, audit questions, and finally sources/evidence.",
          "This is an experience contract, not a claim that every research object has reached the same publication maturity.",
        ],
        sourceRef: "src/content/publication_pathway.json#experienceContract",
      },
    ],
  },
  software: {
    inspection: [
      {
        id: "software-language-lifecycle",
        label: "Research language has a lifecycle",
        eyebrow: "Governed Language Garden",
        summary:
          "Public wording is treated as governed state because a phrase can become more authoritative than the evidence beneath it if status, context, ambiguity, and replacement are not represented.",
        bullets: [
          "Candidate language may appear only in declared working contexts with its claim ceiling and explainer.",
          "Recommended-default language may bind a working surface while still remaining visibly pending review.",
          "Research-hypothesis language requires definitions, evidence level, breakpoints, and a next test.",
          "Semantic firewalls travel with the risk they constrain; they are not decorative disclaimers detached from the claim.",
          "Approved canonical language remains replaceable: successor or retirement records preserve history rather than silently rewriting prior wording.",
          "Institutional, software-native, formal-research, public-philosophy, playful, and safeguard registers have different admissibility requirements.",
        ],
        sourceRef: "src/content/language_system.binding.json",
      },
      {
        id: "software-happy-path-expansion",
        label: "From happy path to executable system",
        eyebrow: "Operational representation",
        summary:
          "One of the richest retained software arguments is that professional engineering expands a normative process into an explicit state space containing the conditions reality still requires.",
        bullets: [
          "The thin representation usually names actors, a desired sequence, and a successful terminal state.",
          "Execution forces dependencies, exceptions, boundary conditions, ownership, observability, failure, recovery, and repair into the representation.",
          "Edge cases are therefore not merely annoying outliers; they can be evidence that the original representation omitted a consequential distinction.",
          "The transfer to institutional work is methodological rather than equivalence: ask which exceptional states, affected parties, lifecycle burdens, detection paths, owners, rollback limits, and repairs the operative model still needs.",
          "Human values and social institutions are not reduced to software types merely because executable systems provide a useful discipline for exposing omissions.",
        ],
        sourceRef: "src/content/publication_content.json#accounting-software",
      },
    ],
  },
  foundations: {
    inspection: [
      {
        id: "foundations-active-evidence-footprint",
        label: "What is actually under active study",
        eyebrow: "Documented research footprint",
        summary:
          "The retained evidence registry shows that the foundation branch is not only a four-label diagram; it expands into active questions about carriers, relations, reachability, interfaces, witnesses, closure, transport, promotion, and repair.",
        bullets: [
          "Distinction Space: declaration and regime; carrier capacity and local variation; distinctions and relations; admissibility, viability, and reachability.",
          "Boundary surfaces: consequential boundaries and interfaces rather than boundary as a purely visual metaphor.",
          "Closure surfaces: obligations, witnesses, typed closure, defect, and repair.",
          "Transport surfaces: projection, transport, composition, and promotion between representations or scales.",
          "Boundary Theory: distinction, admissibility, emergence, contexture, system, closure/defect, and invariant-preserving promotion remain separately tracked research threads.",
          "Documented activity does not imply those threads have equal proof status; the registry records research presence, not automatic validation.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json",
      },
    ],
  },
  distinction: {
    body: [
      "A distinction becomes research-relevant when it is more than a verbal contrast: some carrier, observer, rule, measurement, grammar, or executable mechanism can preserve enough of the difference for later operations to depend upon it.",
      "The foundational burden is therefore not merely to say that two states differ, but to specify what makes the difference available, what relations it participates in, which transformations preserve it, and what failure follows when the distinction is collapsed.",
    ],
    inspection: [
      {
        id: "distinction-operational-burden",
        label: "What a distinction has to support",
        eyebrow: "From difference to usable structure",
        summary:
          "The public foundation record treats distinction as the beginning of a formal problem, not the end of one.",
        bullets: [
          "Carrier: where or how the distinction is represented.",
          "Regime: the context in which the distinction is meaningful and available.",
          "Relation: which other distinctions or objects make its role legible.",
          "Admissibility: which operations may use or transform it without destroying the required meaning.",
          "Witness: what can determine whether the relevant difference was preserved.",
          "Defect: what becomes impossible, ambiguous, or consequentially wrong when the difference is collapsed.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json + v2 foundation calibration model",
      },
    ],
  },
  "bound-distinction": {
    body: [
      "Binding adds a regime around a distinction: identity conditions, available alternatives, lawful operations, and the boundary within which the difference is supposed to remain recoverable.",
      "The research question is not whether every useful distinction can be reduced to one universal object. It is whether a sufficiently explicit bound distinction can serve as a small reusable unit from which richer encodings, states, constraints, and compositions can be reconstructed without hiding the structure that made the distinction valid.",
    ],
    inspection: [
      {
        id: "bound-distinction-binding-adds",
        label: "What binding adds",
        eyebrow: "Identity, admissibility, and reconstruction",
        summary:
          "A bound distinction is useful only if the binding contributes inspectable structure rather than merely renaming a difference.",
        bullets: [
          "Identity conditions: what counts as preserving the distinction across use or transport.",
          "Alternative/complement structure: what the distinction separates inside the declared regime.",
          "Admissible operations: which transformations may act without erasing the protected difference.",
          "Boundary conditions: where the distinction stops being meaningful, available, or sufficient.",
          "Composition: how multiple bound distinctions can participate in a larger lawful representation.",
          "Open burden: define the structure-preserving maps rather than assuming similarity to bits, types, predicates, partitions, or other established objects is enough.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json + src/content/product-landing-pages/schemathematics.json",
      },
    ],
  },
  bit: {
    body: [
      "The bit is valuable here because it is a known case where a minimal binary distinction can be encoded, stored, transformed, composed, transmitted, and used to drive larger executable state-transition systems.",
      "That makes the bit a calibration object, not proof that every distinction is literally a bit. A generalized primitive earns the comparison only if the maps from distinction to encoding, state, admissible transition, and composition are stated precisely enough to inspect.",
    ],
    inspection: [
      {
        id: "bit-calibration-not-equivalence",
        label: "Calibration, not equivalence",
        eyebrow: "Known computational anchor",
        summary:
          "The bit supplies a hard reference case for asking what a claimed primitive must be able to do if it is supposed to participate in computation-like composition.",
        bullets: [
          "A binary distinction can have an explicit carrier and encoding.",
          "Encoded distinctions can participate in state and state transition.",
          "Large computational structures can be composed from small distinctions under declared rules.",
          "Encoding alone does not supply semantics, legitimacy, measurement validity, or the domain-specific meaning of a distinction.",
          "Similarity to a bit is therefore a design test for reconstructible structure, not evidence of universal reduction to binary information.",
        ],
        sourceRef: "v2 foundation calibration model + documented Distinction Space research program",
      },
    ],
  },
  "distinction-space": {
    body: [
      "Distinction Space generalizes an ordinary possibility-space question by making distinguishability itself part of the specification: which differences exist for the current regime, which relations and variations are lawful, which states are reachable, and which transformations preserve the structure the problem still depends upon.",
      "The retained research registry already decomposes that burden into declaration, carrier, relations, admissibility, reachability, interfaces, obligations, witnesses, closure, transport, composition, promotion, defect, and repair. The public object should therefore be read as a research program with many proof obligations, not as a single finished definition carrying all of those results automatically.",
    ],
    links: [
      {
        label: "Executable Representation",
        href: "/research/software/executable-representation",
        eyebrow: "Operational bridge",
        summary: "Where distinctions, states, admissible operations, and invariants become executable enough to test.",
      },
      {
        label: "Boundary Theory",
        href: "/research/formal-theory/boundary-theory",
        eyebrow: "Formal context",
        summary: "The wider research program in which Distinction Space is the central formal object.",
      },
    ],
    inspection: [
      {
        id: "distinction-space-operating-surfaces",
        label: "Eight operating surfaces",
        eyebrow: "Active formal decomposition",
        summary:
          "The evidence registry exposes a useful current decomposition of Distinction Space into separately testable research surfaces.",
        bullets: [
          "Declaration and regime: state which distinctions and laws are in force for the represented problem.",
          "Carrier capacity and local variation: identify what can carry distinctions and how local state may vary.",
          "Distinctions and relations: specify the primitive differences and the relations that make larger structure possible.",
          "Admissibility, viability, and reachability: separate imaginable states from states the regime can lawfully reach or sustain.",
          "Consequential boundaries and interfaces: track where behavior, authority, information, or obligation crosses a boundary.",
          "Obligations, witnesses, and typed closure: name what must be checked before a local completion may count as closure.",
          "Projection, transport, composition, and promotion: state what survives when the representation, context, or scale changes.",
          "Defect and repair: preserve the residue that tells us where the representation failed and what a repair must restore.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json#activeResearch[distinction-space--*]",
      },
      {
        id: "distinction-space-document-footprint",
        label: "Documented foundation trail",
        eyebrow: "Evidence presence, not proof by bibliography",
        summary:
          "The evidence registry links the current Distinction Space program to retained formal-development artifacts rather than leaving it as a site-only label.",
        bullets: [
          "Boundary Theory: A Research Program for Distinction Spaces is retained as a direct documented source for the central object.",
          "Foundational Architecture Baseline is retained alongside it as a formal-architecture source.",
          "Distinction Spaces and Their Morphisms appears in the documented transformation/admissibility trail.",
          "Typed Closure Registry and Typed Closure Theorem Packet support adjacent closure work, while their existence does not by itself settle every Distinction Space claim.",
          "Publication should continue separating source presence, formal definition, proved result, computational evidence, and external review.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json#documentedResearch",
      },
    ],
  },
  "executable-representation": {
    inspection: [
      {
        id: "executable-representation-return-path",
        label: "Representation must return to consequence",
        eyebrow: "Abstraction with a lawful return path",
        summary:
          "The retained public doctrine connects executable representation to a broader failure pattern: abstraction becomes dangerous when the representation can drive action but evidence and consequence cannot revise it.",
        bullets: [
          "A representation necessarily selects and compresses; incompleteness is not itself the failure.",
          "Failure appears when an acting system treats omitted consequence as nonexistent or has no route for discrepancy to alter the operative model.",
          "Software provides a sharp test because the representation becomes executable and its missing states return as defects, exceptions, manual compensation, or downstream failure.",
          "A lawful return path preserves observation, disagreement, ownership, repair, and revision rather than treating a successful local operation as global closure.",
          "The same diagnostic can motivate institutional questions without claiming that institutions and software are formally equivalent systems.",
        ],
        sourceRef: "src/content/publication_content.json#abstraction-without-return + accounting-software",
      },
    ],
  },
  "applied-testbeds": {
    inspection: [
      {
        id: "testbeds-observation-classes",
        label: "Why these four testbeds differ",
        eyebrow: "Different kinds of resistance",
        summary:
          "The testbeds are deliberately heterogeneous so the framework has to survive discrete rules, continuous behavior, physical measurement, and institutional authority rather than succeeding only in one friendly representation.",
        bullets: [
          "Chess: finite legal transitions, adversarial reply, transparent rules, and tractable worked positions.",
          "Soccer: continuous space, partial observability, noisy multi-agent coordination, timing, and interpretation.",
          "Weather: physical fields, conservation, numerical approximation, measurement, uncertainty, ensembles, and established scientific baselines.",
          "Law: authorization, jurisdiction, evidence, classification, standing, procedure, contest, remedy, and current doctrine that cannot be overwritten by systems language.",
          "A mapping that works in one testbed does not inherit validation in the others.",
        ],
        sourceRef:
          "src/content/product-landing-pages/boundary-first-chess.json + boundary-first-soccer.json + boundary-first-weather.json + constitutional-law-and-jurisprudence.json",
      },
    ],
  },
  "boundary-first-weather": {
    body: [
      "Boundary First Weather asks a deliberately narrower question than 'can Boundary Theory predict the weather?': can measurable information about evolving boundaries, transport, and structural defect improve where simulation, diagnosis, ensemble attention, or refinement effort is allocated relative to an appropriate baseline?",
      "The program explicitly builds on numerical weather prediction, PDE methods, assimilation, ensembles, observational networks, atmospheric physics, and learned models. Its proposed contribution is an augmentation layer of boundary detection, transport diagnostics, defect localization, structural comparison, adaptive signals, and structure-aware compression.",
      "The flagship demonstrator is still a planned controlled weather-like simulation. Claims about operational forecast accuracy, speed, severe-weather lead time, or external institutional validation remain outside the current evidence boundary.",
    ],
    inspection: [
      {
        id: "weather-boundary-selective-hypothesis",
        label: "Boundary-selective computation hypothesis",
        eyebrow: "Measurable research question",
        summary:
          "The program tests whether forecast-relevant novelty, error, or cross-scale information concentrates enough around evolving structures to guide additional computation or attention.",
        bullets: [
          "Candidate structures include fronts, interfaces, coherent boundaries, transport pathways, and defect regions.",
          "The hypothesis does not say atmospheric interiors can be ignored or that all forecast error occurs on boundaries.",
          "A useful indicator must be compared against matched adaptive or uniform baselines rather than against deliberately weak computation.",
          "Evaluation includes wall-clock time, update count, memory, forecast-relevant error, boundary-position error, transport error, conservation error, and compute spent outside active regions.",
          "Efficiency is an experimental result, not part of the definition of the program.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-weather.json#coreHypothesis",
      },
      {
        id: "weather-validation-ladder",
        label: "Validation ladder",
        eyebrow: "No rung borrows from the next",
        summary:
          "The retained weather record already declares an escalating sequence from synthetic geometry to independent meteorological evaluation.",
        bullets: [
          "Synthetic geometry and scalar transport establish only low-level structural behavior.",
          "Shallow-water and moist/Boussinesq-like systems increase physical and numerical burden without becoming operational weather validation.",
          "Compressible/moist atmospheric models and offline established-model comparison are later gates.",
          "Independent meteorological evaluation is a distinct higher rung rather than a rhetorical extension of toy-model success.",
          "The bounded pilot succeeds even with a negative result if it determines that selective refinement does not beat the matched baseline under the declared metrics.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-weather.json#validationLadder",
      },
    ],
  },
  "boundary-first-chess": {
    body: [
      "Boundary-First Chess treats a move as a state transition under adversarial constraint. Material, legality, king safety, reachability, pressure, timing, and the opponent's strongest reply all constrain which future states remain available after commitment.",
      "Its purpose is pedagogical and diagnostic: make the consequential boundary of a position easier to see before or alongside calculation. The doctrine is useful only where it remains faithful to chess rules and established tactical, positional, endgame, and engine analysis.",
    ],
    inspection: [
      {
        id: "chess-five-pass-reading",
        label: "Five passes before commitment",
        eyebrow: "Practitioner reading method",
        summary:
          "The retained doctrine turns the broad boundary vocabulary into a concrete sequence a player or analyst can falsify against the position.",
        bullets: [
          "Bound the position: identify checks, captures, threats, tactical liabilities, and immediate defensive obligations.",
          "Map reachable pressure: distinguish resources that can matter in time from resources that are only nominally available.",
          "Generate boundary-changing candidates: moves that open or close lines, remove defenders, change king exposure, create passers, or force replies.",
          "Preserve continuation: after the opponent's strongest answer, test whether the required safety, coordination, and options remain.",
          "Convert or repair: determine whether an advantage can be stabilized or whether the move created a defect whose repair cost dominates the gain.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-chess.json#method",
      },
      {
        id: "chess-validation-boundary",
        label: "What would count as evidence",
        eyebrow: "Teaching doctrine under comparison",
        summary:
          "A familiar chess motif is explanatory fit, not comparative validation.",
        bullets: [
          "Candidate-move quality can be compared before deep calculation.",
          "Analysts can test recognition of overloaded defenders, hidden obligations, and reachable-state changes.",
          "Worked positions should agree with established chess analysis on the actual facts of the position.",
          "Claims about rating improvement, tournament performance, or superiority to established coaching require controlled comparative evidence.",
          "The current record does not claim a new engine or competitive-performance advantage.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-chess.json#validation",
      },
    ],
  },
  "boundary-first-soccer": {
    body: [
      "Boundary-First Soccer treats relevant space as changing reachability rather than empty geometry. Access, orientation, support, pressure, cover, timing, passing lanes, defensive responsibility, and the next team state determine whether apparent territory is actually actionable.",
      "The doctrine therefore separates forward motion from progress: a backward or lateral action may be a repair when it restores support, changes pressure orientation, or reopens a larger reachable action set. That interpretation remains a candidate analytic framing until it is tested against video, event data, tracking data, coaching judgment, and established tactical language.",
    ],
    inspection: [
      {
        id: "soccer-five-pass-state",
        label: "Five passes through a team state",
        eyebrow: "Actionable-space method",
        summary:
          "The retained soccer doctrine translates boundary language into an observable sequence centered on access, pressure, promotion, and repair.",
        bullets: [
          "Bound the phase: identify functional control, immediate pressure, and live transition risk.",
          "Map access and support: which receivers and zones are reachable in time, and what continuation remains after the pass?",
          "Read authored pressure: infer which options the opponent is removing and which future action the press is trying to force.",
          "Promote the advantage: transport space, orientation, numerical advantage, or tempo into a more consequential state without destroying continuation.",
          "Repair before collapse: reset or circulate when the current lane closes so the team can reconstruct support and act again.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-soccer.json#method",
      },
      {
        id: "soccer-validation-boundary",
        label: "From tactical language to testable analysis",
        eyebrow: "Evidence burden",
        summary:
          "The proposed tagging grammar earns standing only if observers can use it consistently and it adds information beyond existing soccer-analysis vocabularies.",
        bullets: [
          "Measure inter-analyst agreement on candidate boundary, pressure, promotion, and repair tags.",
          "Compare qualitative traces with event or tracking data where suitable data exists.",
          "Test whether pressure-state descriptions have useful relationship to likely next actions.",
          "Compare coaching usefulness with established tactical language rather than assuming new terms are necessary.",
          "No current claim is made for team-performance improvement, player development, or superiority to established analysis systems.",
        ],
        sourceRef: "src/content/product-landing-pages/boundary-first-soccer.json#validation",
      },
    ],
  },
  "constitutional-law": {
    body: [
      "Boundary First Law begins with the law that actually exists. Constitutional text, current doctrine, doctrinal analogy, proposed jurisprudence, law-reform proposals, empirical hypotheses, moral propositions, and open questions are separate claim regimes in the retained legal record.",
      "The systems question comes afterward: when lawful authority changes a person's status or available options, which representations, evidence paths, consequences, contest mechanisms, responsibility routes, and repairs remain visible all the way through the process? A procedure can finish while the consequence it created remains unrepaired.",
      "This is independent legal research and civic/legal education, not legal advice. Jurisdiction-specific claims still require current primary authority and qualified counsel where real rights, deadlines, disputes, or courses of action are at stake.",
    ],
    inspection: [
      {
        id: "law-claim-regimes",
        label: "Every legal claim gets a type",
        eyebrow: "Current law versus proposed doctrine",
        summary:
          "The retained legal program makes epistemic status a first-class part of the public representation so systems analysis cannot quietly promote itself into controlling law.",
        bullets: [
          "Constitutional text and current doctrine are identified separately from doctrinal analogy.",
          "Proposed jurisprudence and law-reform proposals remain proposals even when they are structurally motivated.",
          "Empirical hypotheses, moral/jurisprudential propositions, and open questions carry their own status rather than borrowing legal authority.",
          "Boundary First consequence analysis is not Article III standing doctrine, and Boundary First classification analysis is not the current Equal Protection test.",
          "Powerful private organizations do not automatically become constitutional state actors merely because their consequences are significant.",
        ],
        sourceRef: "src/content/product-landing-pages/constitutional-law-and-jurisprudence.json#claimRegimes",
      },
      {
        id: "law-complete-process",
        label: "Follow authority through consequence and repair",
        eyebrow: "Proposed systems model",
        summary:
          "The program's complete-process model extends analysis beyond authorization and judgment without claiming that the extension is itself current doctrine.",
        bullets: [
          "Authorization: who may act and under what source of authority?",
          "Representation and admissibility: which facts, classifications, parties, and evidence can enter the decision?",
          "Judgment and consequence: which state is changed, for whom, and with what practical effect?",
          "Witness and contest: who can observe error, explain the result, challenge it, or suspend the consequence?",
          "Repair and learning: can correction reach the original record and downstream effects, and what prevents recurrence?",
          "The legal availability of any particular remedy remains a question of actual law and jurisdiction.",
        ],
        sourceRef: "src/content/product-landing-pages/constitutional-law-and-jurisprudence.json#legalProcessModel",
      },
    ],
  },
  "formal-theory": {
    inspection: [
      {
        id: "formal-negative-results",
        label: "A rejected mapping is still a result",
        eyebrow: "Negative-capable comparative research",
        summary:
          "The cross-domain program explicitly treats a bounded or rejected mapping as successful research when it identifies the breakpoint and prevents a stronger false claim.",
        bullets: [
          "Software inheritance -> biological inheritance is rejected above semantic resemblance because biological inheritance includes reproduction, variation, population history, and selection rather than a declared subtype relation.",
          "Software object identity -> personal identity is rejected because persons carry subjectivity, standing, self-interpretation, and rights not exhausted by an addressable state-bearing object model.",
          "Compilation -> judicial interpretation is bounded because courts operate amid precedent, discretion, contested facts, legitimacy, and appeal rather than fixed compiler semantics.",
          "Database rollback -> historical or moral repair is rejected because elapsed consequence, reliance, memory, and harm cannot be canceled by restoring an earlier record state.",
          "A façade interface -> public-service portal analogy remains bounded because a portal can hide reasons, exceptions, affected parties, and appeal routes even while simplifying access.",
        ],
        sourceRef: "src/content/cross_domain_research_program.binding.json#counterexamples",
      },
    ],
  },
  "boundary-theory": {
    inspection: [
      {
        id: "boundary-theory-operational-facets",
        label: "Three operational facets",
        eyebrow: "Distinction, admissibility, emergence",
        summary:
          "The retained research structure treats Distinction Theory, Admissibility Theory, and Emergence Theory as separable facets of Boundary Theory rather than interchangeable names for one undifferentiated theory.",
        bullets: [
          "Distinction asks which differences are available, protected, exposed, collapsed, or transported by a representation.",
          "Admissibility asks which representations, transformations, compositions, forgetting operations, and repairs are lawful for the declared use.",
          "Emergence asks when stable lower-level residue can be promoted into a successor object, scale, or distinction space without losing the invariants required by the target use.",
          "Contexture and System remain adjacent structural/dynamic research objects rather than being silently collapsed into the three facets.",
          "Facet activity in the evidence registry indicates an active research program; it does not imply equal theorem maturity across the facets.",
        ],
        sourceRef: "src/content/facetStatusEvidence.json#activeResearch[boundary-theory--*]",
      },
      {
        id: "boundary-theory-bounded-case-decisions",
        label: "Two bounded comparison decisions",
        eyebrow: "Operational Homology program",
        summary:
          "The current comparison program already records one L3 mapping and one L4 candidate rather than treating every software/institutional resemblance as the same kind of evidence.",
        bullets: [
          "Invoice approval/payment/settlement: the mapping to typed software state preserves consequential transitions and invariants strongly enough for an L3 bounded structural analogy.",
          "Its explicit breakpoint is that database atomicity and rollback cannot undo elapsed institutional consequences, supplier reliance, or payment-network events.",
          "Research-claim promotion/supersession: the mapping to software lifecycle/provenance preserves state, lineage, failure witness, responsibility, repair, and recoverable replacement strongly enough for an L4 operational-homology candidate.",
          "Its explicit breakpoint is that recoverable records cannot mechanize scholarly judgment or make an internal critic independent.",
          "Neither bounded case establishes a universal cross-domain formalism; external review, executable baselines, formal carriers, composition tests, and prospective replication remain open gates.",
        ],
        sourceRef: "src/content/cross_domain_research_program.binding.json#caseStudies",
      },
      {
        id: "boundary-theory-representational-evolution",
        label: "Representational evolution",
        eyebrow: "Working public doctrine, not universal law",
        summary:
          "A retained publication pathway describes repair as an evolutionary process in which a governing representation must change when changed conditions expose defects the old distinctions can no longer carry.",
        bullets: [
          "Stable baselines create the substrate on which further variation becomes possible.",
          "Variation may be rejected, repaired back toward the prior regime, destabilize the substrate, or become coherent enough to support promotion into a successor baseline.",
          "Successful repair changes the operative representation rather than pretending the system simply returns to an untouched earlier state.",
          "Rejected and superseded representations remain part of the history needed to reconstruct why the model changed.",
          "This is a working doctrine and research scaffold; it should not be presented as a universal historical, biological, or physical law without domain-specific derivation and evidence.",
        ],
        sourceRef: "src/content/publication_content.json#baseline-evolution + representational-evolution",
      },
    ],
  },
  schemathematics: {
    body: [
      "Schemathematics asks readers to profile formal objects by what structure is available and what operations that structure licenses. Entity type, admissibility conditions, lawful transformations, invariants, closure, boundary conditions, provenance, and defect/repair become explicit comparison dimensions.",
      "The program defaults to established mathematics wherever it already carries the required structure. The research contribution has to be earned by showing that an operative atlas improves discrimination, prerequisite reconstruction, translation, pedagogy, navigation, or machine reasoning on bounded tasks.",
      "Its flagship public example deliberately uses standard algebra: the move from monoid to group. Universal invertibility is the added condition; cancellation, reversible multiplication, and guaranteed equation solving are consequences. The algebra is not new—the test is whether the representation makes the structural difference more reconstructable.",
    ],
    inspection: [
      {
        id: "schemathematics-operative-profile",
        label: "Profile the object by operation",
        eyebrow: "Eight comparison fields",
        summary:
          "The current program makes the schema itself an inspectable carrier instead of treating notation as a passive label.",
        bullets: [
          "Entity: what kind of object is represented?",
          "Admissibility: what must hold before the object or operation is well-formed?",
          "Transformations: which maps, actions, or rewrites are lawful?",
          "Invariants: what must survive those transformations?",
          "Closure: which operations remain inside the represented structure?",
          "Boundary: which added or removed condition changes the available behavior?",
          "Provenance: which prior distinctions or constructions are required to reconstruct the object?",
          "Defect / repair: what fails when a required condition is omitted, and what restores the intended structure?",
        ],
        sourceRef: "src/content/product-landing-pages/schemathematics.json#operativeProfile",
      },
      {
        id: "schemathematics-monoid-group",
        label: "Worked comparison: monoid -> group",
        eyebrow: "Established mathematics as calibration",
        summary:
          "The example is intentionally conventional mathematics so the representational method can be judged without hiding behind an unknown answer.",
        bullets: [
          "A monoid supplies a closed associative binary operation and identity.",
          "A group adds an inverse for every element.",
          "That added condition changes the guaranteed operations: cancellation, reversible multiplication, and unique solutions to the standard left/right multiplication equations become available inside the group.",
          "The operative profile should let a reader recover the added condition and the new guarantees rather than merely memorize that the object has a different name.",
          "Success here demonstrates faithful representation of known structure, not mathematical novelty.",
        ],
        sourceRef: "src/content/product-landing-pages/schemathematics.json#workedExample",
      },
      {
        id: "schemathematics-validation",
        label: "The representation has to earn its cost",
        eyebrow: "Validation and novelty boundary",
        summary:
          "The Schemathematics record already states a strong failure condition: reduce to established formal machinery when the proposed representation adds no measurable value.",
        bullets: [
          "Formal fidelity: preserve accepted definitions and required conditions.",
          "Differentiating power: make neighboring structures easier to distinguish.",
          "Dependency clarity: expose which prior distinctions are required.",
          "Transformational utility: make available operations and invariants more legible.",
          "Any claimed improvement in theorem proving, retrieval, pedagogy, or mathematical AI requires benchmark evidence beyond illustrative examples.",
          "Current claim ceiling: Boundary First research framing and formalization program, not a default priority claim for a new mathematical field.",
        ],
        sourceRef: "src/content/product-landing-pages/schemathematics.json#validation + claimBoundary",
      },
    ],
  },
};

function append<T>(base: T[] | undefined, extra: T[] | undefined): T[] | undefined {
  if (!extra?.length) return base;
  return [...(base ?? []), ...extra];
}

export function hydrateResearchDepthNode(node: ContentNode): ContentNode {
  const override = researchDepthOverrides[node.id];
  if (!override) return node;

  return {
    ...node,
    ...override,
    body: append(node.body, override.body),
    links: append(node.links, override.links),
    inspection: append(node.inspection, override.inspection),
  };
}
