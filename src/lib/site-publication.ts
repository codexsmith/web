// Canonical discovery policy. Admission here is editorial, not an access grant.
// Keep this module free of runtime dependencies: Next configuration, reader search,
// and release QA consume the same publication decision.
export const institutionalPublicationEntries = [
  { label: "Home", href: "/", tier: "institutional" },
  { label: "Consequential Systems", href: "/consequential-systems", tier: "institutional" },
  { label: "AI Governance", href: "/ai-governance", tier: "institutional" },
  { label: "Constructive Human Agency", href: "/constructive-human-agency", tier: "institutional" },
  { label: "Codexware", href: "/codexware", tier: "institutional" },
  { label: "Observatory", href: "/observatory", tier: "institutional" },
  { label: "Work With Us", href: "/work-with-us", tier: "institutional" },
  { label: "Digital-Native Institution", href: "/digital-native-institution", tier: "institutional" },
  { label: "Professional Services", href: "/work-with-us/professional-services", tier: "supporting" },
  { label: "Paper Auditing", href: "/work-with-us/paper-auditing", tier: "supporting" },
  { label: "Government and Public Service", href: "/work-with-us/public-service", tier: "supporting" },
  { label: "Funding and support", href: "/work-with-us/funding", tier: "supporting" },
  { label: "Intellectual Lineage", href: "/observatory/intellectual-lineage", tier: "supporting" },
  { label: "Research Architecture", href: "/observatory/research-architecture", tier: "supporting" },
  { label: "Computational Inquiry", href: "/observatory/computational-inquiry", tier: "supporting" },
  { label: "Selected Demonstrations", href: "/observatory/demonstrations", tier: "supporting" },
  { label: "Economic Maintenance", href: "/codexware/economic-maintenance", tier: "supporting" },
  { label: "Civic Record", href: "/codexware/civic-record", tier: "supporting" },
  { label: "Instruments", href: "/observatory/instruments", tier: "supporting" },
  { label: "Contact", href: "/contact", tier: "institutional" },
  { label: "Evidence & Trust", href: "/evidence-and-trust", tier: "institutional" },
] as const;

export const curatedReaderRoutes = institutionalPublicationEntries.map(({ label, href }) => ({ label, href }));
export const institutionalDiscoveryRoutes = institutionalPublicationEntries.map(({ href }) => href);
