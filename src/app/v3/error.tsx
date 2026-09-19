"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  InstitutionalFooter,
  InstitutionalHeader,
} from "@/components/institutional/InstitutionalChrome";
import styles from "@/components/institutional/styles/InstitutionalFoundation.module.css";

export default function InstitutionalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Institutional route failure", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#institutional-main">
        Skip to main content
      </a>
      <InstitutionalHeader />
      <main
        className={styles.failureState}
        id="institutional-main"
        tabIndex={-1}
      >
        <p className={styles.sectionIndex}>ROUTE FAILURE</p>
        <h1>The public projection did not render cleanly.</h1>
        <p>
          No claim should become more authoritative because the interface failed.
          You can retry the route, return to the Lab, or choose another path.
        </p>
        <div className={styles.failureActions}>
          <button onClick={reset} type="button">
            Retry this route
          </button>
          <Link href="/v3">Return to the Lab</Link>
          <Link href="/v3/start">Start here</Link>
        </div>
        {error.digest ? (
          <code className={styles.failureDigest}>reference {error.digest}</code>
        ) : null}
      </main>
      <InstitutionalFooter />
    </div>
  );
}
