import React from "react";
import styles from "./styles/LabObjectIdentity.module.css";

export type LabObjectKind =
  | "product"
  | "research"
  | "project"
  | "publication"
  | "evidence"
  | "experiment"
  | "claim"
  | "method"
  | "apparatus";

export type LabObjectIdentityProps = {
  kind: LabObjectKind;
  kindLabel?: string;
  hideKind?: boolean;
  hideStatus?: boolean;
  identifier?: string;
  identifierLabel?: string;
  status: string;
  statusLabel?: string;
  secondary?: string;
  secondaryLabel?: string;
  variant?: "band" | "compact";
  appearance?: "light" | "inverse";
  ariaLabel?: string;
};

const kindLabels: Record<LabObjectKind, string> = {
  product: "Product",
  research: "Research",
  project: "Project",
  publication: "Publication",
  evidence: "Evidence",
  experiment: "Experiment",
  claim: "Claim",
  method: "Method",
  apparatus: "Apparatus",
};

function IdentityField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.field} ${className ?? ""}`.trim()}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function LabObjectIdentity({
  kind,
  kindLabel,
  identifier,
  identifierLabel = "ID",
  status,
  statusLabel = "STATUS",
  secondary,
  secondaryLabel = "CLASS",
  variant = "band",
  appearance = "light",
  ariaLabel,
  hideKind,
  hideStatus,
}: LabObjectIdentityProps) {
  const resolvedKindLabel = kindLabel ?? kindLabels[kind];

  return (
    <div
      className={styles.identity}
      data-appearance={appearance}
      data-kind={kind}
      data-variant={variant}
      aria-label={ariaLabel ?? `${resolvedKindLabel} object identity`}
    >
      {!hideKind && (
        <IdentityField
          className={styles.kindField}
          label="OBJECT"
          value={resolvedKindLabel}
        />
      )}

      {identifier ? (
        <IdentityField
          label={identifierLabel}
          value={identifier}
        />
      ) : null}

      {!hideStatus ? (
        <IdentityField
          className={styles.statusField}
          label={statusLabel}
          value={
            typeof status === "string"
              ? status.replaceAll("_", " ")
              : status
          }
        />
      ) : null}

      {secondary ? (
        <IdentityField
          className={styles.secondaryField}
          label={secondaryLabel}
          value={secondary}
        />
      ) : null}
    </div>
  );
}
