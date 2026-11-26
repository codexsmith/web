// Canonical discovery policy. Admission here is editorial, not an access grant.
// Keep this module free of runtime dependencies: Next configuration, reader search,
// and release QA consume the same publication decision.
export const institutionalPublicationEntries = [
  { label: "Home", href: "/", tier: "institutional", purpose: "Orient the reader to the mission, three doctrines, three entry points, and public purpose." },
  { label: "Consequential Systems", href: "/consequential-systems", tier: "institutional", purpose: "Explain how representations and decisions create consequences, obligations, and repair work." },
  { label: "AI Governance", href: "/ai-governance", tier: "institutional", purpose: "Separate computational capability from authority, execution permission, and evidence." },
  { label: "Constructive Human Agency", href: "/constructive-human-agency", tier: "institutional", purpose: "Establish human purpose, agency, consent, and constructive collaboration." },
  { label: "Codexware", href: "/codexware", tier: "institutional", purpose: "Explain how governed computational research becomes bounded person-directed tools." },
  { label: "Observatory", href: "/observatory", tier: "institutional", purpose: "Exhibit selected research foundations, methods, evidence, and demonstrations without exposing the working lab." },
  { label: "Work With Us", href: "/work-with-us", tier: "institutional", purpose: "Provide scoped ways to work with the Lab in research, engineering, and public service." },
  { label: "Digital-Native Institution", href: "/digital-native-institution", tier: "institutional", purpose: "Explain the operating model, stewardship, human responsibility, and institutional continuity." },
  { label: "Professional Services", href: "/work-with-us/professional-services", tier: "supporting", purpose: "Explain scoped architecture, engineering, and repair engagements.", parent: "/work-with-us" },
  { label: "Paper Auditing", href: "/work-with-us/paper-auditing", tier: "supporting", purpose: "Explain evidence-oriented manuscript review without granting publication or scientific authority.", parent: "/work-with-us" },
  { label: "Government and Public Service", href: "/work-with-us/public-service", tier: "supporting", purpose: "Explain scoped public-service and consequential-system repair opportunities.", parent: "/work-with-us" },
  { label: "Funding and support", href: "/work-with-us/funding", tier: "supporting", purpose: "Describe stewardship and support for specific work without conflating funding with evidence.", parent: "/work-with-us" },
  { label: "Intellectual Lineage", href: "/observatory/intellectual-lineage", tier: "supporting", purpose: "Explain how established disciplines and engineering practice motivated the research.", parent: "/observatory" },
  { label: "Research Architecture", href: "/observatory/research-architecture", tier: "supporting", purpose: "Present the research architecture and explicit claim boundaries.", parent: "/observatory" },
  { label: "Computational Inquiry", href: "/observatory/computational-inquiry", tier: "supporting", purpose: "Explain persistent, inspectable, computationally assisted inquiry.", parent: "/observatory" },
  { label: "Selected Demonstrations", href: "/observatory/demonstrations", tier: "supporting", purpose: "Show selected examples with explicit assumptions and limited conclusions.", parent: "/observatory" },
  { label: "Economic Maintenance", href: "/codexware/economic-maintenance", tier: "supporting", purpose: "Connect economic-maintenance inquiry to individual-directed computational design.", parent: "/codexware" },
  { label: "Civic Record", href: "/codexware/civic-record", tier: "supporting", purpose: "Explain the bounded local evidence-workspace prototype and its limitations.", parent: "/codexware" },
  { label: "Instruments", href: "/observatory/instruments", tier: "supporting", purpose: "Make key distinctions tangible through bounded teaching models and worked examples.", parent: "/observatory" },
  { label: "Contact", href: "/contact", tier: "institutional", purpose: "Offer a voluntary, privacy-conscious starting point for communication." },
  { label: "Evidence & Trust", href: "/evidence-and-trust", tier: "institutional", purpose: "Expose evidence standards, limitations, provenance, and correction paths." },
] as const;

export const curatedReaderRoutes = institutionalPublicationEntries.map(({ label, href }) => ({ label, href }));
export const institutionalDiscoveryRoutes = institutionalPublicationEntries.map(({ href }) => href);

// Ownership is editorial, not a runtime dependency or an exclusivity rule for links.
export const supportingPublicationEntries = institutionalPublicationEntries.filter(entry => entry.tier === "supporting");
