import type { ReactNode } from "react";
import { InstitutionalFooter, InstitutionalHeader } from "./InstitutionalChrome";
import styles from "./styles/InstitutionalFoundation.module.css";

export function InstitutionalPageShell({
  children,
  mainClassName,
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className={styles.page}>
      <InstitutionalHeader />
      <main className={mainClassName}>{children}</main>
      <InstitutionalFooter />
    </div>
  );
}
