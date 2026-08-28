export type AtlasCorpusInventoryItem = {
  label: string;
  kind: string;
  sourcePath: string;
};

export type AtlasCorpusMount = {
  familyCode: string;
  familyLabel: string;
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

export const atlasCorpusMounts: Record<string, AtlasCorpusMount> = {
  mathematics: {
    familyCode: "FML-01",
    familyLabel: "Formal systems",
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
    familyCode: "NAT-02",
    familyLabel: "Natural systems",
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
    familyCode: "ENG-03",
    familyLabel: "Engineered systems",
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
    familyCode: "LNG-04",
    familyLabel: "Linguistic systems",
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
