import type { SVGProps } from "react";
import { BoundaryFirstWaveLogo } from "@/components/BoundaryFirstWaveLogo";

type CosmicShoreMarkProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  /** Selects the documented statesman palette or its high-contrast dark-field companion. */
  surface?: "light" | "dark";
  label?: string;
  variant?: "standard" | "compact";
};

/** Compatibility wrapper around the authored reusable Boundary First wave logo. */
export function CosmicShoreMark({
  label,
  surface = "light",
  variant = "standard",
  ...props
}: CosmicShoreMarkProps) {
  const dark = surface === "dark";

  return (
    <BoundaryFirstWaveLogo
      boundary={dark ? "#F8F3E8" : "#0B1F3A"}
      decorative={!label}
      depth={dark ? "#527C80" : "#334155"}
      field={dark ? "#82AEB1" : "#527C80"}
      spark="#C8A24A"
      title={label ?? "Boundary First Labs"}
      witness="#C8A24A"
      variant={variant}
      {...props}
    />
  );
}
