import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Braces,
  CloudSun,
  Crown,
  Database,
  Gauge,
  Goal,
  Grid3X3,
  Landmark,
  Network,
  ScanSearch,
} from "lucide-react";

type LandingChromeSpec = {
  code: string;
  domain: string;
  label: string;
  icon: LucideIcon;
  signals: readonly [string, string, string];
};

const landingChrome: Record<string, LandingChromeSpec> = {
  "agency-representation-audit": {
    code: "ARA-01",
    domain: "audit",
    label: "Agency audit",
    icon: Network,
    signals: ["authority", "consequence", "repair"],
  },
  "boundary-first-ux": {
    code: "BFUX-01",
    domain: "ux",
    label: "Boundary First UX",
    icon: ScanSearch,
    signals: ["orient", "reveal", "reframe"],
  },
  "boundary-first-chess": {
    code: "BFC-01",
    domain: "chess",
    label: "Boundary First Chess",
    icon: Crown,
    signals: ["state", "pressure", "reply"],
  },
  "boundary-first-soccer": {
    code: "BFS-01",
    domain: "soccer",
    label: "Boundary First Soccer",
    icon: Goal,
    signals: ["access", "pressure", "repair"],
  },
  "boundary-first-weather": {
    code: "BFW-01",
    domain: "weather",
    label: "Boundary First Weather",
    icon: CloudSun,
    signals: ["field", "boundary", "defect"],
  },
  "closure-driven-software-development": {
    code: "CDSD-01",
    domain: "software",
    label: "Closure-Driven SD",
    icon: Gauge,
    signals: ["certainty", "skeleton", "witness"],
  },
  "constitutional-law-and-jurisprudence": {
    code: "BFLAW-01",
    domain: "law",
    label: "Boundary First Law",
    icon: Landmark,
    signals: ["authority", "contest", "repair"],
  },
  "corpus-forge": {
    code: "CF-01",
    domain: "corpus",
    label: "Corpus Forge",
    icon: Database,
    signals: ["source", "claim", "supersede"],
  },
  "schemathematics": {
    code: "SCH-01",
    domain: "research",
    label: "Schemathematics",
    icon: Grid3X3,
    signals: ["object", "operation", "invariant"],
  },
  "software-before-code": {
    code: "SBC-01",
    domain: "software",
    label: "Software Before Code",
    icon: Braces,
    signals: ["domain", "representation", "witness"],
  },
};

const fallbackSpec: LandingChromeSpec = {
  code: "BFL-00",
  domain: "default",
  label: "Boundary First Labs",
  icon: ScanSearch,
  signals: ["boundary", "trace", "closure"],
};

function displayStatus(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function LandingEngineeringChrome({
  children,
  pageId,
  status,
}: {
  children: ReactNode;
  pageId: string;
  status: string;
}) {
  const spec = landingChrome[pageId] ?? fallbackSpec;
  const Icon = spec.icon;

  return (
    <div
      className="bfl-engineering-shell"
      data-bfl-domain={spec.domain}
      data-bfl-page={pageId}
    >
      <aside
        aria-label={`${spec.label} page instrumentation`}
        className="bfl-engineering-rail"
      >
        <div className="bfl-engineering-rail-cap">
          <div className="bfl-engineering-sigil" aria-hidden="true">
            <Icon className="h-4 w-4" />
            <span className="bfl-engineering-sigil-node" />
          </div>
          <span className="bfl-engineering-code">{spec.code}</span>
        </div>

        <div className="bfl-engineering-rail-title">{spec.label}</div>

        <div className="bfl-engineering-rail-trace" aria-hidden="true">
          {spec.signals.map((signal, index) => (
            <div className="bfl-engineering-rail-signal" key={signal}>
              <span className="bfl-engineering-rail-node" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{signal}</strong>
            </div>
          ))}
        </div>

        <div className="bfl-engineering-rail-status">
          <span className="bfl-engineering-status-lamp" aria-hidden="true" />
          <span>{displayStatus(status)}</span>
        </div>
      </aside>

      <div aria-hidden="true" className="bfl-engineering-registration">
        <span />
        <span />
        <strong>{spec.code}</strong>
      </div>

      {children}
    </div>
  );
}
