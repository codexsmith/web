"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import styles from "./ReflowField.module.css";

type ReflowFieldContextValue = {
  selectedId: string | null;
  fieldId: string;
  setSelection: (id: string | null) => void;
};

const ReflowFieldContext = createContext<ReflowFieldContextValue | null>(null);

function safeFragment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function clickBelongsToNestedControl(
  event: ReactMouseEvent<HTMLElement>,
) {
  const target = event.target;
  if (!(target instanceof Element)) return false;

  const interactive = target.closest(
    'a, button, input, select, textarea, summary, [contenteditable="true"], [data-reflow-stop-toggle]',
  );

  return Boolean(interactive && interactive !== event.currentTarget);
}

const layoutSpring = {
  type: "spring",
  stiffness: 340,
  damping: 34,
  mass: 0.7,
} as const;

/**
 * BFUX Reflow Field.
 *
 * Motion owns geometry interpolation. CSS owns final layout.
 * Selection reallocates representational bandwidth; it does not mutate,
 * promote, rank, or otherwise change the represented object.
 */
export function ReflowField({
  children,
  className,
  ariaLabel,
  defaultSelectedId = null,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  defaultSelectedId?: string | null;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId);
  const reducedMotion = useReducedMotion();
  const reactId = useId();
  const fieldId = useMemo(() => safeFragment(`reflow-${reactId}`), [reactId]);
  const transition = reducedMotion ? { duration: 0 } : { layout: layoutSpring };

  const setSelection = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const context = useMemo(
    () => ({ selectedId, fieldId, setSelection }),
    [selectedId, fieldId, setSelection],
  );

  return (
    <ReflowFieldContext.Provider value={context}>
      <LayoutGroup id={fieldId}>
        <motion.section
          layout
          transition={transition}
          className={[styles.field, className].filter(Boolean).join(" ")}
          aria-label={ariaLabel}
          data-reflow-active={selectedId ? "true" : "false"}
          onKeyDown={(event) => {
            if (event.key === "Escape" && selectedId !== null) {
              event.preventDefault();
              setSelection(null);
            }
          }}
        >
          {children}
        </motion.section>
      </LayoutGroup>
    </ReflowFieldContext.Provider>
  );
}

export function ReflowFieldItem({
  id,
  label,
  summary,
  detail,
  className,
  dataTone,
  inspectLabel = "Inspect",
  collapseLabel = "Close",
}: {
  id: string;
  label: string;
  summary: ReactNode;
  detail: ReactNode;
  className?: string;
  dataTone?: string;
  inspectLabel?: string;
  collapseLabel?: string;
}) {
  const context = useContext(ReflowFieldContext);
  const reducedMotion = useReducedMotion();

  if (!context) {
    throw new Error("ReflowFieldItem must be rendered inside ReflowField.");
  }

  const selected = context.selectedId === id;
  const detailId = `${context.fieldId}-${safeFragment(id)}-detail`;
  const transition = reducedMotion ? { duration: 0 } : { layout: layoutSpring };
  const toggle = () => context.setSelection(selected ? null : id);

  const handleSurfaceClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (clickBelongsToNestedControl(event)) return;

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim()) return;

    toggle();
  };

  return (
    <motion.article
      layout
      layoutDependency={context.selectedId}
      transition={transition}
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-reflow-state={selected ? "selected" : "rest"}
      data-tone={dataTone}
      onClick={handleSurfaceClick}
    >
      <button
        type="button"
        className={styles.surfaceAction}
        aria-expanded={selected}
        aria-controls={detailId}
        aria-label={selected ? `Collapse ${label}` : `Inspect ${label}`}
        onClick={toggle}
      />

      <motion.div layout="position" className={styles.summary}>
        {summary}
      </motion.div>

      <AnimatePresence initial={false}>
        {selected ? (
          <motion.div
            key="detail"
            id={detailId}
            className={styles.detail}
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            {detail}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div layout="position" className={styles.controlStrip} aria-hidden="true">
        <span className={styles.stateReadout}>
          {selected ? "INSPECTING" : "AVAILABLE"}
        </span>
        <span className={styles.surfaceCue}>
          {selected ? collapseLabel : inspectLabel}
          <span>{selected ? " −" : " +"}</span>
        </span>
      </motion.div>
    </motion.article>
  );
}
