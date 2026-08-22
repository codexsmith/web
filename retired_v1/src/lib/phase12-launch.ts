import launchBinding from "../content/phase12_launch.binding.json";

type LaunchAction = {
  label: string;
  href: string;
};

type FeaturedWorkItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  action: LaunchAction;
};

export type Phase12Launch = {
  schemaVersion: "boundary-first.phase12-launch.v1";
  version: string;
  status: "product-owner-approved-active";
  source: {
    path: string;
    authority: string;
    supersedes: string;
    doesNotSupersede: string;
  };
  identity: {
    headline: string;
    fullStatement: string;
    heroLead: string;
    heroSupport: string;
    domainLine: string;
    compactStatement: string;
    methodTriad: [string, string, string];
    domains: [string, string, string, string, string];
  };
  systemsAudit: {
    id: string;
    title: string;
    category: string;
    status: "Available on request";
    summary: string;
    availabilityNote: string;
    idealFor: string;
    successCondition: string;
    inputs: string[];
    deliverables: string[];
    boundaries: string[];
    primaryAction: LaunchAction;
    secondaryAction: LaunchAction;
    relatedTrack: {
      title: string;
      status: string;
      description: string;
      href: string;
    };
  };
  boundaryFirstChess: {
    id: string;
    title: string;
    category: string;
    status: "Available / Launching";
    summary: string;
    availabilityNote: string;
    currentForms: string[];
    launchingForms: string[];
    futureBoundary: string;
    claimBoundary: string;
    primaryAction: LaunchAction;
    secondaryAction: LaunchAction;
  };
  featuredWork: FeaturedWorkItem[];
};

function validateAction(action: LaunchAction) {
  const isInternal = action.href.startsWith("/") && !action.href.startsWith("//");
  const isContact = action.href.startsWith("mailto:contact@boundaryfirstlabs.com");

  if (!action.label.trim() || (!isInternal && !isContact)) {
    throw new Error(`Invalid Phase 12 launch action: ${action.label}`);
  }
}

export function validatePhase12Launch(value: Phase12Launch): Phase12Launch {
  if (value.schemaVersion !== "boundary-first.phase12-launch.v1") {
    throw new Error("Unsupported Phase 12 launch binding schema.");
  }
  if (value.status !== "product-owner-approved-active") {
    throw new Error("Phase 12 launch binding must retain active product-owner approval.");
  }

  const requiredIdentityLanguage = [
    "independent public-interest research and engineering laboratory",
    "consequential and public systems",
    "public good",
    "hidden structure explicit",
    "consequence, governance, and repair",
  ];
  const identityText = value.identity.fullStatement.toLowerCase();
  requiredIdentityLanguage.forEach((phrase) => {
    if (!identityText.includes(phrase)) {
      throw new Error(`Phase 12 identity is missing required language: ${phrase}`);
    }
  });

  const publicIdentityCopy = [
    value.identity.fullStatement,
    value.identity.heroLead,
    value.identity.compactStatement,
  ].join(" ");
  if (/\binstitute\b/i.test(publicIdentityCopy)) {
    throw new Error("Phase 12 public identity must use Laboratory terminology.");
  }

  if (new Set(value.identity.domains).size !== 5) {
    throw new Error("Phase 12 identity requires five distinct operating domains.");
  }
  if (value.systemsAudit.status !== "Available on request") {
    throw new Error("Systems Audit must retain its approved availability state.");
  }
  if (!/rather than sold as a static/i.test(value.systemsAudit.availabilityNote)) {
    throw new Error("Systems Audit must explain its produced-on-request boundary.");
  }
  if (value.boundaryFirstChess.status !== "Available / Launching") {
    throw new Error("Boundary First Chess must retain its approved launch state.");
  }
  if (
    value.boundaryFirstChess.currentForms.length === 0 ||
    value.boundaryFirstChess.launchingForms.length === 0 ||
    !/future product track/i.test(value.boundaryFirstChess.futureBoundary)
  ) {
    throw new Error("Boundary First Chess must separate current, launching, and future forms.");
  }

  [
    value.systemsAudit.primaryAction,
    value.systemsAudit.secondaryAction,
    value.boundaryFirstChess.primaryAction,
    value.boundaryFirstChess.secondaryAction,
    ...value.featuredWork.map((item) => item.action),
  ].forEach(validateAction);

  const ids = [
    value.systemsAudit.id,
    value.boundaryFirstChess.id,
    ...value.featuredWork.map((item) => item.id),
  ];
  if (new Set(ids).size !== ids.length) {
    throw new Error("Phase 12 featured work identifiers must be unique.");
  }
  if (value.featuredWork.some((item) => /^Available(?:\s|$)/i.test(item.status))) {
    throw new Error("Supporting work may not be promoted beyond its recorded maturity.");
  }

  return value;
}

export const phase12Launch = validatePhase12Launch(
  launchBinding as Phase12Launch,
);

export type { FeaturedWorkItem, LaunchAction };
