import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import styles from "@/components/institutional/styles/InstitutionalFoundation.module.css";

export default function NotFound() {
  return (
    <InstitutionalPageShell mainClassName={styles.failureState}>
      <p className={styles.sectionIndex}>ROUTE NOT FOUND</p>
      <h1>This part of the Lab is not on the public map.</h1>
      <p>
        The address may be stale, private, renamed, or outside the current public
        projection. Use the Lab home or search to recover a valid route.
      </p>
      <div className={styles.failureActions}>
        <Link href="/v3">Return to the Lab</Link>
        <Link href="/v3/start">Start here</Link>
      </div>
    </InstitutionalPageShell>
  );
}
