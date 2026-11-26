// A bounded, decorative vocabulary for the public reader. These marks are
// not new logos, scientific diagrams, status indicators, or authority seals.
// Their geometry borrows boundary, relation, and witness from the Lab mark.
const glyphByRoute = {
  "/codexware": "operation",
  "/observatory": "observation",
  "/work-with-us": "collaboration",
  "/consequential-systems": "consequence",
  "/ai-governance": "governance",
  "/constructive-human-agency": "agency",
} as const;

export function ReaderRouteGlyph({ href }: { href: keyof typeof glyphByRoute }) {
  const kind = glyphByRoute[href];
  return (
    <svg
      data-reader-glyph={kind}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "operation" && (
        <>
          <path d="M9 4H4v16h5M15 4h5v16h-5M7 12h10m-3-3 3 3-3 3" />
          <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "observation" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4M22 12h-4M12 22v-4M2 12h4M7 16l5-4 4-4" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "collaboration" && (
        <>
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "consequence" && (
        <>
          <circle cx="4" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6h6v4M14 12h6v4" />
        </>
      )}
      {kind === "governance" && (
        <>
          <path d="M9 4H4v16h16V4h-5M8 12h7M12 9l3 3-3 3M16 8v8" />
        </>
      )}
      {kind === "agency" && (
        <>
          <circle cx="4" cy="12" r="2" />
          <path d="M6 12h5l7-6M11 12l7 6" />
          <circle cx="20" cy="5" r="2" />
          <circle cx="20" cy="19" r="2" />
        </>
      )}
    </svg>
  );
}
