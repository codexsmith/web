# Source Synthesis — Topos, SFI, and a BFL Live Research System

**Status:** Normalized source note supplied for backlog pass 11  
**Use:** Comparative design input, not an independently verified institutional audit  
**Normalized:** 2026-08-09

## Core synthesis

> Borrow Topos’s research -> translation -> public-use pipeline, and SFI’s field -> themes -> projects -> people -> outputs relational structure.

This gives BFL an institutional shape without forcing it to imitate the size of either organization.

## Comparative lessons

| Dimension | Topos pattern | SFI pattern | BFL lesson |
|---|---|---|---|
| Shape | Compact research institute with a small top-level structure | Larger research, education, people, applied-work, and institutional ecosystem | Start compact, but use an information model that can grow |
| Conceptual center | Mathematical systems science tied to public benefit | Complexity science across many domains | Give BFL one unmistakable center: Boundary Theory |
| Research organization | Institutional pillars plus research themes | Themes, projects, researchers, and publications are distinguished | Separate theory structure, themes, projects, and outputs |
| Translation | Fundamental research into software and societal engagement | A distinct applied-complexity bridge | Give Boundary-First Engineering a defined bridge role |
| Outputs | Unified archive across artifact types | Multiple explicit research-output types | Build an Outputs registry, not a generic blog |
| People/network | Team, affiliates, alumni, governance, supporters | Many explicit research and institutional relationships | Use precise real relationship types rather than a generic team bucket |
| Applications | Partner communities ground tool development | Applied projects, partner networks, and Studios | Create a bounded public-service/commercial interface without turning the lab into a consultancy |
| Education | Seminars, workshops, public explanation, research associates | A broad educational ladder | Begin with primers, readings, and real workshops without pretending to be a school |

## The crucial distinction

**A field is not a theme. A theme is not a project. A project is not a paper.**

A working BFL hierarchy is:

```text
Boundary First Labs
|
|-- Boundary Theory                         field / theoretical center
|   |-- Distinction Space                   central formal object
|   |-- Distinction Theory                  facet
|   |-- Admissibility Theory                facet
|   `-- Emergence Theory                    facet
|
|-- Representational Mechanics             discipline
|   `-- Formal Grammars                     formal apparatus
|
|-- Research Themes                         persistent questions
|   |-- Mathematical & Formal Foundations
|   |-- Representation & Computation
|   |-- Institutions, Agency & Governance
|   |-- Human Systems & Accessibility
|   `-- Physical / Complex Systems
|
|-- Projects                                bounded investigations
|-- Boundary First                          operational method
|   `-- Boundary-First Engineering          applied practice
`-- Outputs
    |-- Papers / manuscripts
    |-- Working papers / research notes
    |-- Software / tools
    |-- Case studies
    |-- Books
    |-- Talks
    `-- Media
```

This is cleaner than placing a theory facet, a program, an applied practice, and a paper at the same conceptual level. They are different kinds of objects, and the website should reveal that.

## The vertical closure loop

A BFL analogue to vertically integrated research is:

**Theory -> Mechanics -> Practice -> Consequence**

or institutionally:

**Research -> Translation -> Application -> Governance**

Boundary Theory discovers structure. Representational Mechanics makes it formally and computationally manipulable. Boundary First and Boundary-First Engineering make it operational. Applications test it against actual systems. Observed failures and successes feed back into theory.

The feedback path matters. BFL should look like a closure loop, not a department where theory flows downward and never returns.

## Epistemic status as a first-class property

Every research object should carry explicit epistemic and validation context. A possible vocabulary might include exploratory, conjectural, formalized, derived, computationally tested, empirically benchmarked, externally reviewed, and reproduced or validated. Those labels require careful design and may not form one linear ladder.

A theory-facet page should be able to expose:

- type;
- status;
- parent;
- central objects;
- projects testing it;
- outputs;
- applications;
- known limitations;
- open questions.

An output can then link upward and sideways. This makes the site a representation of the research program rather than a PDF directory.

## The relationship graph

The institutional model is relational:

```text
FACET --------informs--------> THEME
THEME --------inspires-------> PROJECT
PROJECT ------uses-----------> METHOD
PROJECT ------tests----------> THEORY
PROJECT ------produces-------> OUTPUT
OUTPUT -------supports/challenges--> CLAIM
OUTPUT -------extends---------> THEORY
PERSON -------contributes-to--> PROJECT
PERSON -------authors---------> OUTPUT
ORGANIZATION -partners-on-----> PROJECT
PRACTICE -----applies---------> THEORY
PRACTICE -----produces-------> CASE STUDY
CASE STUDY ---feeds-back-into-> THEORY
```

The navigation tree is one projection of this graph.

## Candidate public navigation

A future top-level projection could be:

**Research · Practice · Outputs · Learn · Network · About**

- Research: Boundary Theory, formal architecture, themes, and projects.
- Practice: Boundary First, Boundary-First Engineering, audits, engagements, and applications.
- Outputs: actual artifacts and their statuses.
- Learn: primer, glossary, reading paths, explanatory essays, and real courses/workshops.
- Network: actual collaborators, advisors, research relationships, partner organizations, and events.
- About: mission, founder, history, standards, strategy, governance, and support/engagement.

This remains a candidate to test. The homepage only needs to establish what BFL is, what it studies, what it builds or applies, what it has produced, and how someone can engage.

## Two institutional mechanisms

### Public Research & Institutional Strategy

A concise public strategy page can connect mission to research, tooling, community or public service, sustainability, funding, and oversight while clearly distinguishing current reality from intended development.

### Boundary First Studio

A bounded applied mechanism could invite a difficult institutional, technical, organizational, or representational problem; model its boundaries, admissible transitions, obligations, failure modes, and repair paths; and return a structured diagnosis and intervention model.

The Studio would be a bridge between research and public/commercial application, not the identity of the entire lab.

## Institutional scale boundary

BFL should not imitate the scale of larger institutes. Its credibility comes from making the work unusually legible.

Prefer precise labels such as Founder, Collaborator, Advisor, Reviewer, Research Partner, Client/Partner, and Contributor only as those relationships actually exist.

> Represent the relationship that exists, not the normative category an institution is expected to have.

## Three-axis conclusion

- Topos supplies the vertical axis: fundamental research -> translation -> application/public service -> institution.
- SFI supplies the horizontal axis: field -> themes -> projects -> people -> outputs -> education -> external network.
- BFL adds the third axis: epistemic status, provenance, admissibility, validation, and feedback.

Together, these make the website a live map of Boundary First Labs as a research system.

## Supplied references

1. [Topos Institute — Work](https://topos.institute/work)
2. [Santa Fe Institute — Home](https://www.santafe.edu/)
3. [Topos Institute — Strategic Plan 2025–2028](https://topos.institute/strategic-plan/)
4. [Santa Fe Institute — About](https://www.santafe.edu/about/overview)
5. [Santa Fe Institute — Research Themes](https://www.santafe.edu/research/themes/)
6. [Topos Institute — Outputs](https://topos.institute/work/output/)
7. [Santa Fe Institute — Applied Complexity](https://www.santafe.edu/applied-complexity/office)
8. [Santa Fe Institute — Research Results](https://www.santafe.edu/research/results)
9. [Topos Institute — Team](https://topos.institute/team/)
10. [Santa Fe Institute — People](https://www.santafe.edu/people)
11. [Santa Fe Institute — Applied Complexity Partner Network](https://www.santafe.edu/applied-complexity/partner)
12. [Topos Institute — Events](https://topos.institute/events/)
13. [Santa Fe Institute — Complex Systems Summer School](https://www.santafe.edu/engage/learn/programs/sfi-complex-systems-summer-school)
