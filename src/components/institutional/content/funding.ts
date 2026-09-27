export const fundingConversionStages = [
  {
    title: "Existing productive inventory",
    description:
      "Research, software, methods, manuscripts, product candidates, service capability, and institutional machinery already exist. Capital is not being asked to create the institution from zero.",
  },
  {
    title: "Constraint diagnosed",
    description:
      "Name the actual blocked boundary first: fragmented conversion bandwidth, specialist review, legal or IP work, production, compute, access, distribution, or another explicit constraint.",
  },
  {
    title: "Resource matched",
    description:
      "Use the resource that can actually remove that constraint: protected time, sponsorship, earned revenue, grant support, patient product capital, expertise, infrastructure, access, or working capital.",
  },
  {
    title: "Capability ready",
    description:
      "The resource has to become usable institutional capability before it counts: protected time exists, a reviewer is engaged, tooling is provisioned, a funded program can run, or a contract can be delivered.",
  },
  {
    title: "External closure",
    description:
      "The next bounded action produces evidence: a sale, contract, grant submission or award, public artifact, review, product test, publication, handoff, negative result, or other declared closure.",
  },
  {
    title: "Renewed capacity",
    description:
      "Useful conversion should leave behind revenue, evidence, reusable machinery, stronger partnerships, external operators, or a narrower program—reducing dependence on the next unrestricted funding event.",
  },
] as const;

export const fundingOutputs = [
  "Paid engagements and contracts",
  "Product market tests",
  "Grant submissions and dispositions",
  "Publications and independent review",
  "Externally usable machinery",
  "Documented handoff and delegation",
  "Negative closures that stop bad bets",
] as const;

export const fundingCapitalRoles = [
  {
    name: "Runway / conversion capital",
    purpose: "Protect the continuity required to close already-existing work.",
    bestFor:
      "Founder conversion bandwidth, legal/IP cleanup, publication and product closure, administration, specialist review, infrastructure, and the work required to make internal capability externally inspectable.",
    boundary:
      "Runway should be bounded by declared closure targets. It is not an unlimited research subsidy and it does not guarantee that the selected products, grants, or hypotheses succeed.",
  },
  {
    name: "Earned services",
    purpose: "Generate unrestricted revenue while testing the method on real systems.",
    bestFor:
      "Systems / Architecture Review, Agency / AI Governance Audit, Knowledge / Representation Infrastructure Diagnostic, and justified implementation or retained follow-on work.",
    boundary:
      "A consulting engagement should leave durable client state, case evidence, or reusable capability. Revenue does not validate unrelated research claims.",
  },
  {
    name: "Product / company capital",
    purpose: "Turn repeated capability into reusable software, IP, products, and distribution.",
    bestFor:
      "Defined scalable products or commercialization vehicles whose engineering, packaging, distribution, and market testing require investment beyond founder-delivered services.",
    boundary:
      "Investment or patient capital should attach to a defined commercial object. The research institution as a whole is not a substitute for a product, vehicle, rights boundary, or market thesis.",
  },
  {
    name: "Research / public-good capital",
    purpose: "Finance work whose public value or research horizon should not be forced through near-term customer revenue.",
    bestFor:
      "Grants, sponsored research, research philanthropy, open science, reproducibility, education, public-interest technology, academic collaboration, and bounded public campaigns.",
    boundary:
      "Funding can make research admissible and reviewable; it cannot raise a mathematical or scientific claim ceiling or turn collaboration into endorsement.",
  },
  {
    name: "Working capital / credit",
    purpose: "Finance timing gaps after stronger economic evidence exists.",
    bestFor:
      "Signed contracts or awards, eligible receivables, reimbursement timing, demonstrated cash flow, recurring revenue, or separately appraisable and transferable assets where appropriate.",
    boundary:
      "Latent IP is not a receivable. A proposal is not an award. Product value is not automatically collateral value. Debt should follow underwritable evidence rather than replace it.",
  },
] as const;

export const fundingChannels = [
  {
    name: "Founding sponsorship",
    purpose: "Buy a bounded period of protected conversion capacity.",
    bestFor:
      "Public translation, product and service preparation, selected research closure, publication work, outreach, specialist support, and institutional readiness.",
    boundary:
      "Support should be tied to visible outputs, closure events, and reporting rather than open-ended belief in the entire program.",
  },
  {
    name: "Recoverable sponsorship",
    purpose: "Provide early runway with a defined path for repayment from future unrestricted earned revenue.",
    bestFor:
      "Bounded conversion periods where a sponsor wants capital to recycle if later services or products create sufficient unrestricted revenue.",
    boundary:
      "Repayment terms require a separate agreement, reserve protection, and explicit repayment source. The website does not imply that a recoverable structure already exists.",
  },
  {
    name: "Consulting prepayment / applied services",
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
    name: "Public campaigns / product revenue",
    purpose: "Test whether specific public artifacts and products can earn direct support.",
    bestFor:
      "Crowdfunding tied to declared milestones, memberships around recurring public-lab work, product preorders, books, software, educational material, and other bounded outputs.",
    boundary:
      "Public enthusiasm, a preorder, or one transaction does not establish retention, scientific validity, or product-market fit.",
  },
  {
    name: "Product-specific patient capital / investment",
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
    purpose: "Close readiness and externalization gaps.",
    bestFor:
      "Freeze bounded offers, launch selected market tests, move selected products and publications toward external contact, submit appropriate funding applications, repair transaction-readiness gaps, and convert founder-only procedures into reusable state.",
    boundary:
      "These are funded closure targets, not promised outcomes. The period should also record explicit failure, deferral, or reprioritization.",
  },
  {
    name: "3–6 months",
    purpose: "Accumulate external evidence.",
    bestFor:
      "Paid engagement or negative market evidence, external product use, grant disposition history, independent criticism, externally usable tooling, improved rights/license readiness, and measurable handoff or delegation.",
    boundary:
      "Do not promote internal activity into demand, efficacy, or independent-transfer claims without the corresponding external event.",
  },
  {
    name: "6–12 months",
    purpose: "Test whether the institution is becoming less capital-fragile.",
    bestFor:
      "Repeat or recurring earned revenue in at least one lane—or clear evidence to stop—multiple active capital channels, stronger grant/collaboration history, external operation of selected machinery, and reduced founder-only state.",
    boundary:
      "The correct result may be a narrower portfolio. More capital is not the default answer when a conversion lane fails to close.",
  },
] as const;

export const fundingEvaluationQuestions = [
  "What already exists, and what evidence shows that it exists?",
  "Which specific constraint is blocking the next useful closure?",
  "Why is this resource class capable of removing that constraint?",
  "What action becomes admissible after the resource is supplied?",
  "What evidence, artifact, transaction, review, or capability should close next?",
  "What would count as failure, no effect, revision, or successful closure?",
  "What remains blocked even after the capital is supplied?",
  "Who can inspect, criticize, reproduce, buy, fund, use, or reject the result?",
  "What useful value remains if the strongest hypothesis or market thesis fails?",
  "How does the funded period reduce future dependence on one founder or one capital source?",
] as const;

export const fundingBoundaries = [
  {
    label: "CAPITAL STATE != EPISTEMIC STATE",
    description:
      "A grant, sponsorship, purchase, contract, or resource commitment may unlock work. It may not directly make a mathematical, scientific, or engineering claim more true.",
  },
  {
    label: "PRODUCT VALUE != CREDIT VALUE",
    description:
      "Software, IP, methods, manuscripts, or research machinery can be strategically valuable while still receiving no lender recognition until ownership, transferability, contract, receivable, cash-flow, or other underwriting evidence exists.",
  },
  {
    label: "INVESTMENT != WHOLE-LAB ENDORSEMENT",
    description:
      "Patient or investment capital should attach to a defined product, vehicle, or commercialization object. It does not require treating every research lane as one investable company thesis.",
  },
  {
    label: "SUPPORT != WHOLE-LAB ENDORSEMENT",
    description:
      "A funder can support one bounded program, artifact, pilot, or public-interest build while remaining agnostic about every other domain and stronger claim.",
  },
  {
    label: "NEGATIVE RESULTS CAN CLOSE WORK",
    description:
      "A funded test that falsifies a path, exposes a boundary, rejects a market thesis, or prevents wasted scale can be a successful conversion if the evidence remains inspectable.",
  },
  {
    label: "DEPENDENCY IS NOT THE GOAL",
    description:
      "Good capital conversion should leave behind more revenue options, evidence, infrastructure, transferable operations, or better stewardship—not permanent dependence on the same source of capital.",
  },
] as const;
