export type AtlasCorpusInventoryItem = {
  label: string;
  kind: string;
  sourcePath: string;
};

export type AtlasCorpusDomain = {
  id: string;
  code: string;
  label: string;
  kind: string;
  sourcePath: string;
  mountedLayerId?: string;
};

export type AtlasCorpusFamily = {
  id: string;
  code: string;
  label: string;
  sourcePath: string;
  domains: AtlasCorpusDomain[];
};

export type AtlasCorpusMount = {
  familyId: string;
  familyCode: string;
  familyLabel: string;
  domainId: string;
  domainCode: string;
  domainLabel: string;
  familySourcePath: string;
  domainSourcePath: string;
  inventory: AtlasCorpusInventoryItem[];
};

export const labCorpusAuthority = {
  repository: "codexsmith/boundary-first-labs",
  atlasPath: "organized_library_curated/999_Library/00_Library_Atlas.md",
  generatedAt: "2026-08-27T21:21:55.782228-04:00",
  corpusFingerprint: "20bfdd910f429aa02effa1752563783aca878a00aea329ee07a395fa73ee2148",
  note: "Corpus topology only. Mounting a package does not promote its unpublished claims or publication status.",
} as const;

export const atlasCorpusFamilies: AtlasCorpusFamily[] = [
  {
    id: "formal",
    code: "FML-01",
    label: "Formal systems",
    sourcePath: "organized_library_curated/999_Library/03_Domains/01_formal_systems__domain_family",
    domains: [
      { id: "mathematics-logic", code: "FML-MATH-01", label: "Mathematics & logic", kind: "domain", sourcePath: "01_mathematics_and_logic__domain", mountedLayerId: "mathematics" },
      { id: "research-systems-methods", code: "FML-RSM-02", label: "Research systems & methods", kind: "domain", sourcePath: "02_research_systems_and_methods__domain" },
      { id: "millennium-problems", code: "FML-MP-03", label: "Millennium problems", kind: "research program", sourcePath: "03_millennium_problems__research_program" },
    ],
  },
  {
    id: "natural",
    code: "NAT-02",
    label: "Natural systems",
    sourcePath: "organized_library_curated/999_Library/03_Domains/02_natural_systems__domain_family",
    domains: [
      { id: "physics", code: "NAT-PHY-01", label: "Physics", kind: "domain", sourcePath: "01_physics__domain", mountedLayerId: "physics" },
      { id: "biology", code: "NAT-BIO-02", label: "Biology", kind: "domain", sourcePath: "02_biology__domain" },
      { id: "medicine", code: "NAT-MED-03", label: "Medicine", kind: "domain", sourcePath: "03_medicine__domain" },
      { id: "human-factors", code: "NAT-HUM-04", label: "Human factors", kind: "domain", sourcePath: "04_human_factors__domain" },
    ],
  },
  {
    id: "engineered",
    code: "ENG-03",
    label: "Engineered systems",
    sourcePath: "organized_library_curated/999_Library/03_Domains/03_engineered_systems__domain_family",
    domains: [
      { id: "software-engineering", code: "ENG-SWE-01", label: "Software engineering", kind: "domain", sourcePath: "01_software_engineering__domain" },
      { id: "ai-computation", code: "ENG-AIC-02", label: "AI & computation", kind: "domain", sourcePath: "02_ai_and_computation__domain", mountedLayerId: "computation" },
      { id: "telecommunications", code: "ENG-TEL-03", label: "Telecommunications engineering", kind: "domain", sourcePath: "03_telecommunications_engineering__domain" },
      { id: "robotics", code: "ENG-ROB-04", label: "Robotics", kind: "domain", sourcePath: "04_robotics__domain" },
      { id: "chess", code: "ENG-CHS-05", label: "Chess", kind: "domain", sourcePath: "05_chess__domain" },
      { id: "soccer", code: "ENG-SOC-06", label: "Soccer", kind: "domain", sourcePath: "06_soccer__domain" },
    ],
  },
  {
    id: "linguistic",
    code: "LNG-04",
    label: "Linguistic systems",
    sourcePath: "organized_library_curated/999_Library/03_Domains/04_linguistic_systems__domain_family",
    domains: [
      { id: "law-governance", code: "LNG-LAW-01", label: "Law & governance", kind: "domain", sourcePath: "01_law_and_governance__domain", mountedLayerId: "law" },
      { id: "politics-economics", code: "LNG-POL-02", label: "Politics & economics", kind: "domain", sourcePath: "02_politics_and_economics__domain" },
      { id: "land-property-housing", code: "LNG-LPH-03", label: "Land, property & housing", kind: "domain", sourcePath: "03_land_property_and_housing__domain" },
      { id: "institutions-organizations", code: "LNG-INS-04", label: "Institutions & organizations", kind: "domain", sourcePath: "04_institutions_and_organizations__domain" },
      { id: "education", code: "LNG-EDU-05", label: "Education", kind: "domain", sourcePath: "05_education__domain" },
      { id: "civic-infrastructure", code: "LNG-CIV-06", label: "Civic infrastructure", kind: "domain", sourcePath: "06_civic_infrastructure__domain" },
      { id: "civilizational-systems", code: "LNG-CIVZ-07", label: "Civilizational systems", kind: "domain", sourcePath: "07_civilizational_systems__domain" },
    ],
  },
];

export const atlasCorpusMounts: Record<string, AtlasCorpusMount> = {
  mathematics: {
    familyId: "formal",
    familyCode: "FML-01",
    familyLabel: "Formal systems",
    domainId: "mathematics-logic",
    domainCode: "FML-MATH-01",
    domainLabel: "Mathematics & logic",
    familySourcePath: "organized_library_curated/999_Library/03_Domains/01_formal_systems__domain_family",
    domainSourcePath: "organized_library_curated/999_Library/03_Domains/01_formal_systems__domain_family/01_mathematics_and_logic__domain",
    inventory: [
      { label: "Mathematics router", kind: "router", sourcePath: "00_MATHEMATICS_ROUTER.md" },
      { label: "Formal program status register", kind: "register", sourcePath: "01_FORMAL_PROGRAM_STATUS_REGISTER.md" },
      { label: "Boundary First Mathematics Lab", kind: "product", sourcePath: "14_Boundary_First_Mathematics_Lab_Product" },
      { label: "Boundary First Volumetrics Lab", kind: "product", sourcePath: "15_Boundary_First_Volumetrics_Lab_Product" },
      { label: "Boundary First Visual Mathematics", kind: "product", sourcePath: "16_Boundary_First_Visual_Mathematics_Product" },
    ],
  },
  physics: {
    familyId: "natural",
    familyCode: "NAT-02",
    familyLabel: "Natural systems",
    domainId: "physics",
    domainCode: "NAT-PHY-01",
    domainLabel: "Physics",
    familySourcePath: "organized_library_curated/999_Library/03_Domains/02_natural_systems__domain_family",
    domainSourcePath: "organized_library_curated/999_Library/03_Domains/02_natural_systems__domain_family/01_physics__domain",
    inventory: [
      { label: "Relativity", kind: "research program", sourcePath: "01_relativity__research_program" },
      { label: "Atmospheric weather", kind: "research program", sourcePath: "02_atmospheric_weather__research_program" },
      { label: "Energy / action", kind: "research program", sourcePath: "03_energy_action__research_program" },
      { label: "Boundary First papers", kind: "paper collection", sourcePath: "Boundary_First_Papers" },
    ],
  },
  computation: {
    familyId: "engineered",
    familyCode: "ENG-03",
    familyLabel: "Engineered systems",
    domainId: "ai-computation",
    domainCode: "ENG-AIC-02",
    domainLabel: "AI & computation",
    familySourcePath: "organized_library_curated/999_Library/03_Domains/03_engineered_systems__domain_family",
    domainSourcePath: "organized_library_curated/999_Library/03_Domains/03_engineered_systems__domain_family/02_ai_and_computation__domain",
    inventory: [
      { label: "Agentic Scientific Method", kind: "product", sourcePath: "01_agentic_scientific_method__product" },
      { label: "Latent Structure Grounding", kind: "product", sourcePath: "02_latent_structure_grounding__product" },
      { label: "AI workflow contracts", kind: "method package", sourcePath: "03_ai_workflow_contracts__method_package" },
      { label: "Logical Agent", kind: "manifesto program", sourcePath: "04_logical_agent__manifesto_program" },
      { label: "Mechanic Scholar", kind: "agent system", sourcePath: "05_mechanic_scholar__agent_system" },
    ],
  },
  law: {
    familyId: "linguistic",
    familyCode: "LNG-04",
    familyLabel: "Linguistic systems",
    domainId: "law-governance",
    domainCode: "LNG-LAW-01",
    domainLabel: "Law & governance",
    familySourcePath: "organized_library_curated/999_Library/03_Domains/04_linguistic_systems__domain_family",
    domainSourcePath: "organized_library_curated/999_Library/03_Domains/04_linguistic_systems__domain_family/01_law_and_governance__domain",
    inventory: [
      { label: "Legal operations", kind: "programs", sourcePath: "01_legal_operations__programs" },
      { label: "AI & digital governance", kind: "policy program", sourcePath: "02_ai_and_digital_governance__policy_program" },
      { label: "Law & jurisprudence", kind: "product", sourcePath: "05_Law_and_Jurisprudence_Product" },
      { label: "Representation burden / legal governance", kind: "research packet", sourcePath: "BFL_Representation_Burden_Legal_Governance_v0.1" },
      { label: "Systemic closure / material continuance", kind: "RDP", sourcePath: "RDP_Systemic_Closure_Material_Continuance_v0_1" },
    ],
  },
};

export function corpusMountForLayer(layerId: string) {
  return atlasCorpusMounts[layerId];
}

export function corpusFamilyById(familyId: string) {
  return atlasCorpusFamilies.find((family) => family.id === familyId);
}

export function corpusFamilyForLayer(layerId: string) {
  const mount = corpusMountForLayer(layerId);
  return mount ? corpusFamilyById(mount.familyId) : undefined;
}
