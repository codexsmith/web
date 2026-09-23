import type { ReactNode } from "react";
import { InstitutionalFooter, InstitutionalHeader } from "./InstitutionalChrome";
import styles from "./styles/InstitutionalFoundation.module.css";

export function InstitutionalInstrumentShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#institutional-main">
        Skip to main content
      </a>
      <InstitutionalHeader />
      <div id="institutional-main" tabIndex={-1}>
        {children}
      </div>
      <InstitutionalFooter />
    </div>
  );
}
