import type { SVGProps } from "react";

export type BfuxIconName =
  | "root"
  | "back"
  | "forward"
  | "up"
  | "inspect"
  | "world"
  | "evidence"
  | "process"
  | "widen"
  | "narrow"
  | "peer"
  | "boundary"
  | "trace"
  | "warning"
  | "close";

type BfuxIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: BfuxIconName;
  title?: string;
};

/**
 * Boundary First Visual Grammar glyphs.
 *
 * These are reconstructed as vector primitives from the canonical flat PNG reference
 * in the Boundary First workspace library. The implementation follows the reference
 * rules: one concept per icon, shared stroke weight, rounded geometry, composable
 * primitives, and legibility at small control sizes.
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

    case "inspect":
      return (
        <>
          <circle cx="10" cy="10" r="5.25" />
          <path d="m14 14 5.25 5.25" />
          <circle cx="10" cy="10" r="1.15" fill="currentColor" stroke="none" />
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

    case "trace":
      return (
        <>
          <circle cx="5" cy="12" r="1.55" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="1.55" />
          <path d="M6.75 12h10.5" strokeDasharray="1.4 2.4" />
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
}

export function projectionGlyph(mode: "world" | "evidence" | "gestalt"): BfuxIconName {
  if (mode === "evidence") return "evidence";
  if (mode === "gestalt") return "process";
  return "world";
}
