export const fundingLanes = [
  {
    eyebrow: "B2B · SERVICES",
    title: "Applied systems work",
    example: "Systems & Architecture Review",
    description:
      "Focused reviews, diagnostics, implementation, and follow-on work can generate near-term earned revenue while producing outside case evidence.",
    nextEvidence:
      "A paid bounded engagement, repeat work, or clear negative market evidence.",
    href: "/applied-work",
  },
  {
    eyebrow: "B2C / B2B2C · PRODUCTS",
    title: "Chess, sports, and games",
    example: "Boundary-First Chess",
    description:
      "Books, teaching products, licensing, partnerships, and adjacent sports/game formats can sell directly to people or reach them through organizations and distribution partners.",
    nextEvidence:
      "Preorders, sales, licensing interest, partner pilots, repeat use, or a decision to narrow the lane.",
    href: "/products/boundary-first-chess",
  },
  {
    eyebrow: "PRODUCT SOFTWARE · KNOWLEDGE INFRASTRUCTURE",
    title: "Projectr / Knowledge Explorer",
    example: "YouTube Knowledge Explorer",
    description:
      "Projectr and the Knowledge Explorer family can test paid knowledge software around searchable, source-linked, persistent knowledge. Subscription, seat-based, paid-tooling, or other lightweight software revenue should follow demonstrated use rather than be assumed in advance.",
    nextEvidence:
      "Repeated voluntary use first, then willingness to pay and return, and only afterward broader packaging.",
    href: "/products/youtube-knowledge-explorer",
  },
  {
    eyebrow: "RESEARCH · GRANTS / SPONSORSHIP",
    title: "Weather and public-interest research",
    example: "Boundary First Weather",
    description:
      "Weather provides a concrete scientific and computational testbed for grants, sponsored research, public-interest partnerships, open infrastructure, and external scientific collaboration.",
    nextEvidence:
      "Submitted proposals, funding decisions, external collaborators, independent review, and usable research artifacts.",
    href: "/products/boundary-first-weather",
  },
] as const;

export const fundingNearTermUses = [
  {
    eyebrow: "B2B SERVICES",
    lane: "Applied systems work",
    use: "Reach buyers and deliver strong work",
    description:
      "Package focused offers, reach qualified buyers, deliver the work well, and turn completed engagements into reusable case evidence.",
    closure:
      "A paid engagement, repeat work, or a clear decision that the offer needs to change.",
  },
  {
    eyebrow: "B2C / B2B2C PRODUCTS",
    lane: "Chess, sports, and games",
    use: "Finish, launch, and reach users",
    description:
      "External review, editing, design, production, pricing, preorder or publication, licensing outreach, and partner pilots around the strongest current product objects.",
    closure:
      "A sale, preorder, license, partner pilot, or concrete negative market evidence.",
  },
  {
    eyebrow: "PRODUCT SOFTWARE",
    lane: "Projectr / Knowledge Explorer",
    use: "Make the product usable and test paid demand",
    description:
      "Finish a usable product surface, support hosting and operations, instrument real use, and test pricing or packaging only after people choose to return.",
    closure:
      "Repeated voluntary use, willingness to pay, retention, or a narrower product thesis.",
  },
  {
    eyebrow: "RESEARCH",
    lane: "Weather and public-interest research",
    use: "Run the research and get outside review",
    description:
      "Proposal development, compute and data, research runs, reproducibility work, specialist review, collaboration, and public research artifacts.",
    closure:
      "A submitted or awarded program, external collaborator, independent review, or usable research artifact.",
  },
] as const;

export const fundingOutputs = [
  "Paid engagements and contracts",
  "Product market tests",
  "Grant submissions and funding decisions",
  "Publications and independent review",
  "Externally usable tools",
  "Documented handoff and delegation",
  "Negative closures that stop bad bets",
] as const;

export const fundingCapitalRoles = [
  {
    name: "Operating runway",
    purpose: "Protect the time and continuity required to finish already-existing work.",
    bestFor:
      "Founder delivery time, legal and IP cleanup, publication and product completion, administration, specialist review, infrastructure, and the work required to make internal capability usable outside the Lab.",
    boundary:
      "Runway should be tied to clear deliverables and review points. It does not guarantee that the selected products, grants, or research ideas succeed."
  },
  {
    name: "Paid services",
    purpose: "Generate unrestricted revenue while testing the method on real systems.",
    bestFor:
      "Systems & Architecture Review, AI & Decision Governance Review, Knowledge & Research Infrastructure Review, and justified implementation or retained follow-on work.",
    boundary:
      "A consulting engagement should leave useful client documentation, case evidence, or reusable capability. Revenue does not validate unrelated research claims."
  },
  {
    name: "Product investment",
    purpose: "Turn repeated capability into reusable software, IP, products, and distribution.",
    bestFor:
      "Defined scalable products or commercialization vehicles whose engineering, packaging, distribution, and market testing require investment beyond founder-delivered services.",
    boundary:
      "Investment or patient capital should attach to a defined commercial object. The research institution as a whole is not a substitute for a product, vehicle, rights boundary, or market thesis.",
  },
  {
    name: "Research and public-interest funding",
    purpose: "Finance work whose public value or research horizon should not be forced through near-term customer revenue.",
    bestFor:
      "Grants, sponsored research, research philanthropy, open science, reproducibility, education, public-interest technology, academic collaboration, and bounded public campaigns.",
    boundary:
      "Funding can make research possible and reviewable; it cannot make a mathematical or scientific claim more true or turn collaboration into endorsement."
  },
  {
    name: "Working capital or credit",
    purpose: "Finance timing gaps after stronger economic evidence exists.",
    bestFor:
      "Signed contracts or awards, eligible receivables, reimbursement timing, demonstrated cash flow, recurring revenue, or separately appraisable and transferable assets where appropriate.",
    boundary:
      "Intellectual property is not automatically a receivable. A proposal is not an award. Product value is not automatically collateral value. Debt should follow real contracts, receivables, cash flow, or other evidence a lender can actually underwrite."
  },
] as const;

export const fundingChannels = [
  {
    name: "Founding or operating sponsorship",
    purpose: "Fund a defined period of focused work.",
    bestFor:
      "Public translation, product and service preparation, selected research closure, publication work, outreach, specialist support, and institutional readiness.",
    boundary:
      "Support should be tied to visible outputs, milestones, and reporting rather than open-ended belief in the entire program."
  },
  {
    name: "Recoverable sponsorship or advance",
    purpose: "Provide early runway with a defined path for repayment from future unrestricted earned revenue.",
    bestFor:
      "Defined work periods where a sponsor wants some or all support repaid if later services or products create sufficient unrestricted revenue.",
    boundary:
      "Repayment terms require a separate agreement, reserve protection, and explicit repayment source. The website does not imply that a recoverable structure already exists.",
  },
  {
    name: "Service prepayment",
    purpose: "Convert existing professional capability directly into earned revenue and external evidence.",
    bestFor:
      "Bounded reviews, diagnostics, implementation, or retained work where the buyer problem and delivery boundary are already concrete.",
    boundary:
      "Prepayment purchases defined services. It is not patronage, an investment in the whole Lab, or proof of repeatable demand.",
  },
  {
    name: "Grants / sponsored research",
    purpose: "Fund public-good research, open infrastructure, external review, collaboration, and larger bounded programs.",
    bestFor:
      "Responsible technology, public-interest systems, open science, research infrastructure, education, and mature domain-specific research objects.",
    boundary:
      "Awards can be restricted, reimbursable, or program-specific. Awarded capital is not automatically unrestricted operating cash or debt-service capacity.",
  },
  {
    name: "Crowdfunding, preorders, and product revenue",
    purpose: "Test whether specific public artifacts and products can earn direct support.",
    bestFor:
      "Crowdfunding tied to declared milestones, memberships around recurring public-lab work, product preorders, books, software, educational material, and other bounded outputs.",
    boundary:
      "Public enthusiasm, a preorder, or one transaction does not establish retention, scientific validity, or product-market fit.",
  },
  {
    name: "Product-specific patient capital or investment",
    purpose: "Finance a defined scalable commercial object once its rights, product boundary, market thesis, and evidence path are legible.",
    bestFor:
      "Reusable software, product families, licensable machinery, or another specific company/product vehicle that can be diligenced independently of the entire research portfolio.",
    boundary:
      "Investment should not be used to launder an unbounded research program into a single-company valuation. Each vehicle needs its own evidence and governance.",
  },
] as const;

export const fundingClosureHorizons = [
  {
    name: "0–90 days",
    purpose: "Finish work that is close to outside use.",
    bestFor:
      "Finalize focused offers, launch selected market tests, move products and publications toward outside use, submit appropriate funding applications, repair transaction-readiness gaps, and document procedures that currently depend on founder memory.",
    boundary:
      "These are funded closure targets, not promised outcomes. The period should also record explicit failure, deferral, or reprioritization.",
  },
  {
    name: "3–6 months",
    purpose: "Build outside evidence.",
    bestFor:
      "Paid engagement or negative market evidence, external product use, grant decision history, independent criticism, externally usable tools, clearer rights and licensing, and measurable handoff or delegation.",
    boundary:
      "Do not promote internal activity into demand, efficacy, or independent-transfer claims without the corresponding external event.",
  },
  {
    name: "6–12 months",
    purpose: "Test whether the Lab is becoming more financially resilient.",
    bestFor:
      "Repeat or recurring earned revenue in at least one area—or clear evidence to stop—multiple active funding channels, stronger grant and collaboration history, outside use of selected tools, and less dependence on founder-only knowledge.",
    boundary:
      "The correct result may be a narrower portfolio. More capital is not the default answer when a conversion lane fails to close.",
  },
] as const;

export const fundingEvaluationQuestions = [
  "What already exists, and what evidence shows that it exists?",
  "Which specific constraint is blocking the next useful result?",
  "Why is this kind of support capable of removing that constraint?",
  "What action becomes possible after the support is supplied?",
  "What evidence, artifact, transaction, review, or capability should exist next?",
  "What would count as success, failure, no effect, or a reason to revise the plan?",
  "What remains blocked even after the capital is supplied?",
  "Who can inspect, criticize, reproduce, buy, fund, use, or reject the result?",
  "What useful value remains if the strongest hypothesis or market thesis fails?",
  "How does the funded period reduce future dependence on one founder or one capital source?",
] as const;

export const fundingBoundaries = [
  {
    label: "FUNDING DOES NOT DETERMINE TRUTH",
    description:
      "A grant, sponsorship, purchase, contract, or resource commitment may unlock work. It may not directly make a mathematical, scientific, or engineering claim more true.",
  },
  {
    label: "PRODUCT VALUE IS NOT THE SAME AS LENDER VALUE",
    description:
      "Software, IP, methods, manuscripts, or research machinery can be strategically valuable while still receiving no lender recognition until ownership, transferability, contract, receivable, cash-flow, or other underwriting evidence exists.",
  },
  {
    label: "INVESTMENT DOES NOT MEAN WHOLE-LAB ENDORSEMENT",
    description:
      "Patient or investment capital should attach to a defined product, vehicle, or commercialization object. It does not require treating every research lane as one investable company thesis.",
  },
  {
    label: "SUPPORT DOES NOT MEAN WHOLE-LAB ENDORSEMENT",
    description:
      "A funder can support one bounded program, artifact, pilot, or public-interest build while remaining agnostic about every other domain and stronger claim.",
  },
  {
    label: "NEGATIVE RESULTS CAN STILL BE USEFUL",
    description:
      "A funded test that disproves a path, exposes a limitation, rejects a market thesis, or prevents wasted scale can still be successful if the evidence remains inspectable."
  },
  {
    label: "PERMANENT DEPENDENCE IS NOT THE GOAL",
    description:
      "Good capital conversion should leave behind more revenue options, evidence, infrastructure, transferable operations, or better stewardship—not permanent dependence on the same source of capital.",
  },
] as const;
