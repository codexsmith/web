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

type ReflowLayoutMode = "flow" | "focus-stage";

type ReflowFieldContextValue = {
  selectedId: string | null;
  fieldId: string;
  layoutMode: ReflowLayoutMode;
  itemOrder: readonly string[];
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

const focusLayoutTransition = {
  type: "tween",
  duration: 0.82,
  ease: [0.45, 0, 0.55, 1],
} as const;

const snapLayoutTransition = {
  duration: 0,
} as const;

const detailTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
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
  layoutMode = "flow",
  itemOrder = [],
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  defaultSelectedId?: string | null;
  layoutMode?: ReflowLayoutMode;
  itemOrder?: readonly string[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId);
  const reactId = useId();
  const fieldId = useMemo(() => safeFragment(`reflow-${reactId}`), [reactId]);
  const transition = { layout: snapLayoutTransition };

  const setSelection = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const context = useMemo(
    () => ({ selectedId, fieldId, layoutMode, itemOrder, setSelection }),
    [selectedId, fieldId, layoutMode, itemOrder, setSelection],
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
          data-reflow-mode={layoutMode}
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
  const transition =
    reducedMotion || !selected
      ? { layout: snapLayoutTransition }
      : { layout: focusLayoutTransition };
  const toggle = () => context.setSelection(selected ? null : id);

  const remainingIds = context.selectedId
    ? context.itemOrder.filter((itemId) => itemId !== context.selectedId)
    : [];
  const remainingIndex = remainingIds.indexOf(id);
  const splitIndex = Math.ceil(remainingIds.length / 2);
  const placement =
    context.layoutMode !== "focus-stage" || context.selectedId === null
      ? "rest"
      : selected
        ? "selected"
        : remainingIndex >= 0 && remainingIndex < splitIndex
          ? "before"
          : "after";

  const handleSurfaceClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (clickBelongsToNestedControl(event)) return;

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim()) return;

    toggle();
  };

  return (
    <motion.article
      layout
      layoutAnchor={{ x: 0.5, y: 0.5 }}
      layoutDependency={context.selectedId}
      transition={transition}
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-reflow-state={selected ? "selected" : "rest"}
      data-reflow-placement={placement}
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

      <motion.div
        layout="position"
        transition={transition}
        className={styles.summary}
      >
        {summary}
      </motion.div>

      <AnimatePresence initial={false} mode="popLayout">
        {selected ? (
          <motion.div
            key="detail"
            id={detailId}
            className={styles.detail}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { ...detailTransition, delay: 0.24 }
            }
          >
            {detail}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layout="position"
        transition={transition}
        className={styles.controlStrip}
        aria-hidden="true"
      >
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
