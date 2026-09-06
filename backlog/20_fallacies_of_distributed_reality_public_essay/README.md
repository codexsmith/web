# The Fallacies of Distributed Reality — public essay backlog

**Status:** backlog / publication candidate  
**Date:** 2026-09-05  
**Source:** Boundary First Labs canonical working note `the_fallacies_of_distributed_reality_v0_1.md`  
**Primary surface:** public essay / Research or Publications  
**Secondary surfaces:** homepage feature, software/engineering explainer, collaborator/funder bridge  
**Claim posture:** engineering generalization; clearly distinguish established distributed-systems folklore from the Lab's broader cross-domain interpretation

---

## Purpose

Develop a public-facing essay showing how the classic fallacies of distributed computing point toward a broader systems principle:

> **Global coherence must be constructed from local action across consequential boundaries.**

The essay should begin from familiar software-engineering ground and move outward carefully, without requiring the reader to accept Boundary Theory in advance.

This is a strong public on-ramp because the starting material is ordinary, practical engineering wisdom. The deeper question is simply:

> Why do the same coordination failures keep appearing outside computer networks?

The essay should present Boundary First as a disciplined attempt to answer that question rather than as a claim to have invented distributed-systems engineering.

---

# Draft essay

## The Fallacies of Distributed Reality

Software engineers learn a famous list of assumptions not to make about distributed systems.

The network is reliable. Latency is zero. Bandwidth is infinite. The network is secure. Topology never changes. There is one administrator. Transport costs nothing. The network is homogeneous.

Every one of those assumptions is useful right up until reality charges you for it.

A service fails. A request arrives late. A payload is too large. A permission boundary blocks progress. A dependency moves. Two authorities disagree. Coordination consumes time and money. Two systems use the same word to mean different things.

The list is usually taught as networking folklore. But after enough years building systems, something else becomes hard to miss:

**these failures do not stay inside networks.**

They appear in companies. Hospitals. Governments. Scientific collaborations. Supply chains. Multi-agent systems. Families. Institutions.

The details change. The structure does not.

That suggests a broader interpretation.

### Distribution is not just about machines

A computer network is distributed because different machines hold local state and must coordinate across boundaries between them.

But that structure is not unique to computers.

Consider two people working on the same project.

One tells the other something important.

Already:

- the message may fail to arrive;
- it arrives after some delay;
- the sender cannot transmit everything they know;
- some information may not be permitted to cross;
- their relationship or reporting structure may change;
- they may answer to different authorities;
- communicating consumes time and attention;
- and they may interpret the same words differently.

Those are the same eight problem classes.

The people are not Ethernet nodes. An organization is not literally a packet-switched network. But both share a more general problem shape:

> **Locally coherent systems must coordinate across consequential boundaries.**

That is enough for distributed-systems problems to appear.

### A consequential boundary is one you have to pay to cross

A boundary matters operationally when crossing it is not free.

"Free" does not only mean money.

A crossing can cost time, certainty, throughput, permission, energy, fidelity, translation effort, coordination, or accountability.

If two systems are separated but crossing between them changes nothing, costs nothing, risks nothing, and requires nothing, then the separation may be descriptively interesting but operationally irrelevant.

The boundaries engineers care about are the ones that make something happen.

This gives a useful translation of the eight distributed-computing fallacies:

| Familiar fallacy | More general lesson |
| --- | --- |
| The network is reliable | Boundary crossings can fail. |
| Latency is zero | Separation has temporal consequence. |
| Bandwidth is infinite | Boundaries have finite capacity. |
| The network is secure | Crossing requires admissibility. |
| Topology does not change | Relations among local systems are dynamic. |
| There is one administrator | Authority is local and may conflict. |
| Transport cost is zero | Coordination consumes resources. |
| The network is homogeneous | Local systems may use different representations, rules, or meanings. |

What is striking is how little of this table depends on computers.

### The same mistakes recur everywhere

A hospital is distributed.

A patient passes through clinicians, specialists, labs, pharmacies, insurers, records systems, and institutions. Each has its own local state, vocabulary, permissions, and authority. The global outcome depends on information and responsibility surviving the crossings between them.

A government is distributed.

Agencies, courts, legislatures, jurisdictions, contractors, and the public operate under different authorities and representations. Admissibility is explicit. Topology changes. Transport is expensive. Semantic disagreement can itself become a governing fact.

A scientific field is distributed.

Researchers carry local knowledge. Disciplines use different grammars. Peer review acts as an admissibility mechanism. Publication is transport. Collaboration has latency. Expertise has bandwidth limits. Institutions have different incentives and authorities.

A multi-agent AI system is distributed.

Agents have local context, different tools, different permissions, partial state, and sometimes different objectives. The old distributed-systems lessons return almost immediately.

The point is not that all these systems are the same.

The point is that **coordination under separation** is a reusable systems problem.

### What Boundary First adds

Boundary First starts from a very simple question:

**What are the consequential boundaries in this system?**

Then:

- what exists locally on each side;
- what must cross;
- what can fail at the crossing;
- what must remain true globally;
- who has authority;
- what representation changes;
- and what happens when the crossing does not preserve coherence.

That yields a compact chain:

**distinction** separates.

**boundary** constrains.

**distribution** creates local regions of coherence.

**transport** attempts to cross the boundary.

**closure** asks whether the required global coherence survives.

**defect** marks where it does not.

The distributed-computing fallacies can then be seen as a remarkably compact catalogue of ways engineers accidentally erase the cost of boundaries from their models.

### Local action, global consequence

This also sharpens a phrase we use often at Boundary First Labs:

> **Local action, global consequence.**

In a distributed system, no local actor automatically possesses the whole state of the world.

Each component acts from what it can observe, represent, and control locally. Yet those local actions accumulate into global behavior.

The engineering problem is therefore not simply to make every local component "correct."

It is to construct global coherence out of local action across boundaries that introduce delay, loss, limits, permission, cost, disagreement, and translation.

That is what distributed systems engineering has been teaching for decades.

The broader possibility is that it has been teaching us something about systems in general.

### The important question

The useful question is not:

"Can everything be reduced to a computer network?"

Of course not.

The useful question is:

> **When a system has locally coherent parts separated by consequential boundaries, which distributed-system assumptions are we accidentally making?**

Are we assuming the message will arrive?

Are we pretending delay does not matter?

Are we ignoring capacity?

Are we assuming permissions line up?

Are we treating topology as fixed?

Are we pretending one authority controls the whole system?

Are we hiding coordination cost?

Are we assuming everyone means the same thing?

Those questions are useful almost anywhere.

And they point to a broader engineering lesson:

> What software engineers discovered in distributed systems was not merely a set of networking caveats. They discovered a practical mechanics of **coordination under separation**.

Boundary First asks what happens when we take that lesson seriously.

---

# Editorial notes

## Audience

Primary:

- software engineers and architects;
- technical leaders;
- systems thinkers;
- collaborators who need an accessible bridge into Boundary First;
- funders or institutional partners who need to understand why a software-engineering origin can plausibly produce cross-domain systems work.

Secondary:

- researchers in distributed systems, formal methods, HCI, organizational science, governance, or multi-agent systems;
- technically curious general readers.

## Tone

- practical first;
- no grandiosity;
- clearly label the generalization as a Boundary First interpretation;
- make the software-engineering origin an advantage, not an appeal to authority;
- preserve native domain distinctions rather than claiming organizations, hospitals, and networks are interchangeable.

## Candidate pull quote

> What software engineers discovered in distributed systems was a practical mechanics of coordination under separation.

Alternative:

> A distributed system is one in which global coherence must be constructed from local action across consequential boundaries.

## Candidate visual

An eight-row transformation:

`network fallacy -> boundary consequence -> examples across software / organization / institution`

Possible interactive treatment: select a fallacy and watch the same structural failure appear in several domains while retaining domain-specific terminology.

## Publication safeguards

Before publication:

1. verify historical attribution and standard wording of the distributed-computing fallacies;
2. avoid implying that the eight items are an established universal taxonomy outside computing;
3. link to the Lab research note for the explicit claim ceiling and open research questions;
4. decide whether to call the broader object "distributed reality," "distributed systems in the general sense," or another phrase after literature review;
5. retain the sentence that the domains are not literally equivalent.

## Website placement options

Best initial placement:

- Publications / Essays, with cross-link from Research -> Software / Applied Testbeds.

Possible homepage or Start Here excerpt:

> Boundary First grew out of systems engineering: the discipline of discovering that boundaries you ignore eventually become failures you have to debug.

## Relationship to current site strategy

This essay supports the site's five-minute comprehension goal because it starts from a concrete and widely understandable engineering object, demonstrates the move from practice to abstraction, and shows cross-domain breadth without asking the visitor to begin with foundational mathematics.

It also gives a clean answer to a recurring question:

> How did software engineering lead to Boundary First?

One answer is: distributed systems made consequential boundaries impossible to ignore.
