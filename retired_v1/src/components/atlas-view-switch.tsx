import Link from "next/link";
import { ListTree, Network } from "lucide-react";
import { ATLAS_HREF, ATLAS_LIST_HREF } from "@/lib/site-navigation";

type AtlasViewSwitchProps = {
  current: "map" | "list";
  mapHref?: string;
  listHref?: string;
  className?: string;
};

export function AtlasViewSwitch({
  current,
  mapHref = ATLAS_HREF,
  listHref = ATLAS_LIST_HREF,
  className = "",
}: AtlasViewSwitchProps) {
  const linkClass =
    "inline-flex min-h-9 items-center justify-center gap-2 rounded-full px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground";

  return (
    <nav
      aria-label="Atlas view"
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-background p-1 ${className}`}
    >
      <Link
        aria-current={current === "map" ? "page" : undefined}
        className={`${linkClass} ${
          current === "map"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-muted"
        }`}
        href={mapHref}
      >
        <Network aria-hidden="true" className="h-3.5 w-3.5" />
        Map view
      </Link>
      <Link
        aria-current={current === "list" ? "page" : undefined}
        className={`${linkClass} ${
          current === "list"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-muted"
        }`}
        href={listHref}
      >
        <ListTree aria-hidden="true" className="h-3.5 w-3.5" />
        List view
      </Link>
    </nav>
  );
}
