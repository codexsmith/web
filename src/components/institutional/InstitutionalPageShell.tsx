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
      <a className={styles.skipLink} href="#institutional-main">
        Skip to main content
      </a>
      <InstitutionalHeader />
      <main
        className={mainClassName}
        id="institutional-main"
        tabIndex={-1}
      >
        {children}
      </main>
      <InstitutionalFooter />
    </div>
  );
}
