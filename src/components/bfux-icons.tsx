import type { SVGProps } from "react";

export type BfuxIconName =
  | "point"
  | "unit"
  | "container"
  | "relation"
  | "direction"
  | "defect"
  | "port"
  | "actor"
  | "object"
  | "gate"
  | "contexture"
  | "chain"
  | "invariant"
  | "state"
  | "repair"
  | "closure"
  | "projection"
  | "trace"
  | "pressure"
  | "promotion"
  | "transition"
  | "consequence"
  | "crossing"
  | "claim"
  | "admissibility"
  | "witness"
  | "responsibility"
  | "orient"
  | "traverse"
  | "inspect"
  | "reveal"
  | "reframe"
  | "stress"
  | "root"
  | "back"
  | "forward"
  | "up"
  | "world"
  | "evidence"
  | "process"
  | "widen"
  | "narrow"
  | "peer"
  | "boundary"
  | "warning"
  | "close";

type BfuxIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: BfuxIconName;
  title?: string;
};

/**
 * Boundary First Visual Grammar glyphs.
 *
 * Reconstructed as vector primitives from the canonical flat PNG reference retained
 * in the Boundary First workspace Library. The family follows the reference rules:
 * one concept per icon, shared stroke weight, rounded geometry, composable primitives,
 * monochrome-safe meaning, and legibility at small control sizes.
 */
export function BfuxIcon({ name, title, className, ...props }: BfuxIconProps) {
  const labelled = Boolean(title);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`bfux-icon${className ? ` ${className}` : ""}`}
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <Glyph name={name} />
    </svg>
  );
}

function Glyph({ name }: { name: BfuxIconName }) {
  switch (name) {
    case "point":
      return <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />;

    case "unit":
    case "state":
      return <circle cx="12" cy="12" r="7" />;

    case "container":
      return <rect x="4" y="6" width="16" height="12" rx="2" />;

    case "relation":
      return <path d="M4 12h16" />;

    case "direction":
      return (
        <>
          <path d="M4 12h15" />
          <path d="m15.5 8.5 3.5 3.5-3.5 3.5" />
        </>
      );

    case "defect":
      return (
        <>
          <path d="M4 15.5 8.5 11l3 2.25 4.25-5" />
          <path d="m15.5 5.5 2.25-2.25" />
          <path d="m17.5 7.5 2.25-2.25" />
        </>
      );

    case "port":
      return (
        <>
          <path d="M4 12h13" />
          <circle cx="18.5" cy="12" r="2" fill="currentColor" stroke="none" />
        </>
      );

    case "actor":
      return (
        <>
          <circle cx="12" cy="5.25" r="2.35" />
          <path d="M12 7.75v7.1" />
          <path d="m12 10-5 4" />
          <path d="m12 10 5 4" />
          <path d="m12 14.75-4 5" />
          <path d="m12 14.75 4 5" />
        </>
      );

    case "object":
      return (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
        </>
      );

    case "gate":
      return (
        <>
          <path d="M3.5 12h17" />
          <path d="M9 8v8" strokeWidth="2.2" />
          <path d="M15 8v8" strokeWidth="2.2" />
        </>
      );

    case "contexture":
      return (
        <>
          <rect x="3.75" y="4.25" width="16.5" height="15.5" rx="2.25" />
          <rect x="7.75" y="8" width="8.5" height="8" rx="1.4" />
        </>
      );

    case "chain":
      return (
        <>
          <path d="M9.75 14.25 7.6 16.4a3.25 3.25 0 0 1-4.6-4.6l3.1-3.1a3.25 3.25 0 0 1 4.6 0" />
          <path d="m14.25 9.75 2.15-2.15a3.25 3.25 0 0 1 4.6 4.6l-3.1 3.1a3.25 3.25 0 0 1-4.6 0" />
          <path d="m8.5 15.5 7-7" />
        </>
      );

    case "invariant":
      return (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </>
      );

    case "repair":
      return (
        <>
          <path d="M14.5 5.2a4.2 4.2 0 0 0-5.3 5.3L4.5 15.2a2.25 2.25 0 1 0 3.2 3.2l4.7-4.7a4.2 4.2 0 0 0 5.3-5.3l-2.6 2.6-2.8-.7-.7-2.8 2.9-2.3Z" />
        </>
      );

    case "closure":
      return (
        <>
          <path d="M18.5 8.25A7.25 7.25 0 1 0 18 16.5" />
          <path d="m15.5 15.5 2.75 1.25 1.25-2.75" />
        </>
      );

    case "projection":
      return <rect x="4" y="5.5" width="16" height="13" rx="1.8" strokeDasharray="3 2.5" />;

    case "trace":
      return (
        <>
          <circle cx="5" cy="12" r="1.55" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="1.55" />
          <path d="M6.75 12h10.5" strokeDasharray="1.4 2.4" />
        </>
      );

    case "pressure":
      return (
        <>
          <path d="M5 16.5a7.5 7.5 0 1 1 14 0" />
          <path d="m12 12 3-4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <path d="M5 16.5h14" />
        </>
      );

    case "promotion":
      return (
        <>
          <rect x="4" y="10" width="9" height="9" rx="1.5" />
          <path d="M11 13 20 4" />
          <path d="M14 4h6v6" />
        </>
      );

    case "transition":
      return (
        <>
          <path d="M4 8.5h13" />
          <path d="m14 5.5 3 3-3 3" />
          <path d="M20 15.5H7" />
          <path d="m10 12.5-3 3 3 3" />
        </>
      );

    case "consequence":
      return (
        <>
          <path d="M4 12h6" />
          <path d="M10 12c4 0 4-5 8-5" />
          <path d="M10 12c4 0 4 5 8 5" />
          <path d="m16 4.5 2 2.5-2 2.5" />
          <path d="m16 14.5 2 2.5-2 2.5" />
        </>
      );

    case "crossing":
      return (
        <>
          <path d="M12 4v16" strokeWidth="2.2" />
          <path d="M4 12h16" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </>
      );

    case "claim":
      return (
        <>
          <path d="M5 12h14" />
          <path d="M5 8.5v7" />
          <path d="M19 8.5v7" />
        </>
      );

    case "admissibility":
      return (
        <path d="M12 3.5 19 6v5.1c0 4.3-2.55 7.5-7 9.4-4.45-1.9-7-5.1-7-9.4V6l7-2.5Z" />
      );

    case "witness":
    case "reveal":
      return (
        <>
          <path d="M3.25 12s3.15-5.25 8.75-5.25S20.75 12 20.75 12 17.6 17.25 12 17.25 3.25 12 3.25 12Z" />
          <circle cx="12" cy="12" r="2.25" />
        </>
      );

    case "responsibility":
      return (
        <>
          <circle cx="12" cy="6" r="2.1" />
          <path d="M8.5 13c.8-2.4 2-3.4 3.5-3.4s2.7 1 3.5 3.4" />
          <path d="M4 17h16" />
          <path d="M6.5 17v2.5h11V17" />
        </>
      );

    case "orient":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </>
      );

    case "traverse":
      return (
        <>
          <path d="M4 6.5 9 4l6 2.5L20 4v13.5L15 20l-6-2.5L4 20V6.5Z" />
          <path d="M9 4v13.5" />
          <path d="M15 6.5V20" />
        </>
      );

    case "inspect":
      return (
        <>
          <circle cx="10" cy="10" r="5.25" />
          <path d="m14 14 5.25 5.25" />
          <circle cx="10" cy="10" r="1.15" fill="currentColor" stroke="none" />
        </>
      );

    case "reframe":
      return (
        <>
          <rect x="4" y="5" width="11" height="11" rx="1.7" />
          <rect x="9" y="9" width="11" height="10" rx="1.7" />
        </>
      );

    case "stress":
      return <path d="m13 2.75-7 10h5l-1 8.5 8-11h-5l0-7.5Z" />;

    case "root":
      return (
        <>
          <circle cx="12" cy="12" r="8.25" />
          <circle cx="12" cy="12" r="2.15" fill="currentColor" stroke="none" />
          <path d="M12 2.75v2.1" />
        </>
      );

    case "back":
      return (
        <>
          <path d="m9.25 6.25-5 5 5 5" />
          <path d="M4.75 11.25h7.1c4.15 0 6.65 2.15 7.15 6" />
          <circle cx="4.75" cy="11.25" r="1.15" fill="currentColor" stroke="none" />
        </>
      );

    case "forward":
      return (
        <>
          <path d="m14.75 6.25 5 5-5 5" />
          <path d="M19.25 11.25h-7.1c-4.15 0-6.65 2.15-7.15 6" />
          <circle cx="19.25" cy="11.25" r="1.15" fill="currentColor" stroke="none" />
        </>
      );

    case "up":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="8" height="8" rx="1.3" />
          <path d="M12 15.5V8.75" />
          <path d="m9.5 11.25 2.5-2.5 2.5 2.5" />
        </>
      );

    case "world":
      return (
        <>
          <rect x="3.75" y="4.25" width="16.5" height="15.5" rx="2.25" />
          <rect x="7.75" y="8" width="8.5" height="8" rx="1.4" />
          <circle cx="12" cy="12" r="1.35" fill="currentColor" stroke="none" />
        </>
      );

    case "evidence":
      return (
        <>
          <path d="M3.25 12s3.15-5.25 8.75-5.25S20.75 12 20.75 12 17.6 17.25 12 17.25 3.25 12 3.25 12Z" />
          <circle cx="12" cy="12" r="2.25" />
          <path d="M5.5 20h13" strokeDasharray="1 3" />
        </>
      );

    case "process":
      return (
        <>
          <path d="M3.5 8.25h5.75l2.3 3.75h8.95" />
          <path d="m17.5 9 3 3-3 3" />
          <path d="M3.5 15.75h4.25" />
          <circle cx="3.5" cy="8.25" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="7.75" cy="15.75" r="1.1" fill="currentColor" stroke="none" />
        </>
      );

    case "widen":
      return (
        <>
          <rect x="7.5" y="7.5" width="9" height="9" rx="1.4" />
          <path d="M8 4H4v4" />
          <path d="m4 4 4.25 4.25" />
          <path d="M16 20h4v-4" />
          <path d="m20 20-4.25-4.25" />
        </>
      );

    case "narrow":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="8" height="8" rx="1.3" />
          <path d="M4 9h4V5" />
          <path d="m8 9-4-4" />
          <path d="M20 15h-4v4" />
          <path d="m16 15 4 4" />
        </>
      );

    case "peer":
      return (
        <>
          <rect x="3.5" y="8" width="6" height="8" rx="1.3" />
          <rect x="14.5" y="8" width="6" height="8" rx="1.3" />
          <path d="M9.5 12h5" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </>
      );

    case "boundary":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2.2" />
          <path d="M12 4v16" strokeWidth="2.4" />
          <circle cx="12" cy="12" r="1.45" fill="currentColor" stroke="none" />
        </>
      );

    case "warning":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2.2" />
          <path d="m7.25 15 3-3 2.1 1.65 4.4-5.15" />
          <path d="M15.75 6.5 18 8.75" />
        </>
      );

    case "close":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="m8.75 8.75 6.5 6.5" />
          <path d="m15.25 8.75-6.5 6.5" />
        </>
      );
  }

  return null;
}

export function projectionGlyph(mode: "world" | "evidence" | "gestalt"): BfuxIconName {
  if (mode === "evidence") return "evidence";
  if (mode === "gestalt") return "process";
  return "world";
}
