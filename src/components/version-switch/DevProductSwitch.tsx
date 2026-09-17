import styles from "./DevProductSwitch.module.css";

type DevProductSwitchProps = {
  active: "dev" | "product";
  floating?: boolean;
};

export function DevProductSwitch({ active, floating = false }: DevProductSwitchProps) {
  return (
    <nav
      className={`${styles.switcher} ${floating ? styles.floating : ""}`}
      aria-label="Website version"
    >
      <span className={styles.label}>View</span>
      <a
        className={active === "dev" ? styles.active : undefined}
        href="/v2"
        aria-current={active === "dev" ? "page" : undefined}
      >
        <span>Dev</span>
        <small>v2</small>
      </a>
      <a
        className={active === "product" ? styles.active : undefined}
        href="/v3"
        aria-current={active === "product" ? "page" : undefined}
      >
        <span>Product</span>
        <small>v3</small>
      </a>
    </nav>
  );
}
