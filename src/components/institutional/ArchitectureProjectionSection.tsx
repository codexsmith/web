import { RegistrarArchitectureDiagram, type RegistrarArchitectureVariant } from "./RegistrarArchitectureDiagram";
import styles from "./styles/ArchitectureProjectionSection.module.css";

export function ArchitectureProjectionSection({
  eyebrow, title, copy, variant, pullLine,
}: {
  eyebrow: string;
  title: string;
  copy: readonly string[];
  variant: RegistrarArchitectureVariant;
  pullLine?: string;
}) {
  return (
    <section className={styles.section} data-variant={variant}>
      <div className={styles.intro}>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <div>{copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <RegistrarArchitectureDiagram variant={variant} />
      {pullLine ? <blockquote>{pullLine}</blockquote> : null}
    </section>
  );
}
