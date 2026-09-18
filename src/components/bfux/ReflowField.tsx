"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import styles from "./ReflowField.module.css";

type ReflowFieldContextValue = {
  selectedId: string | null;
  fieldId: string;
  setSelection: (id: string | null) => void;
};

const ReflowFieldContext = createContext<ReflowFieldContextValue | null>(null);

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

function safeFragment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * BFUX Reflow Field reference implementation.
 *
 * Canonical semantics:
 * boundary-first-labs/.../Boundary First UX/operational/reflow_field_pattern.md
 *
 * Selection reallocates representational bandwidth. It does not mutate or
 * promote the represented object.
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

  const setSelection = (id: string | null) => {
    const commit = () => flushSync(() => setSelectedId(id));
    const documentWithTransitions = document as ViewTransitionDocument;

    if (!reducedMotion && typeof documentWithTransitions.startViewTransition === "function") {
      documentWithTransitions.startViewTransition(commit);
      return;
    }

    commit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && selectedId !== null) {
      event.preventDefault();
      setSelection(null);
    }
  };

  const context = useMemo(
    () => ({ selectedId, fieldId, setSelection }),
    [selectedId, fieldId],
  );

  return (
    <ReflowFieldContext.Provider value={context}>
      <section
        className={[styles.field, className].filter(Boolean).join(" ")}
        aria-label={ariaLabel}
        data-reflow-active={selectedId ? "true" : "false"}
        onKeyDown={handleKeyDown}
      >
        {children}
      </section>
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
  if (!context) {
    throw new Error("ReflowFieldItem must be rendered inside ReflowField.");
  }

  const selected = context.selectedId === id;
  const safeId = safeFragment(id);
  const detailId = `${context.fieldId}-${safeId}-detail`;
  const transitionName = `bfux-${context.fieldId}-${safeId}`;

  const transitionStyle = {
    viewTransitionName: transitionName,
  } as CSSProperties;

  return (
    <article
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-reflow-state={selected ? "selected" : "rest"}
      data-tone={dataTone}
      style={transitionStyle}
    >
      <div className={styles.summary}>{summary}</div>

      <div className={styles.controlStrip}>
        <span className={styles.stateReadout}>
          {selected ? "INSPECTING" : "AVAILABLE"}
        </span>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={selected}
          aria-controls={detailId}
          onClick={() => context.setSelection(selected ? null : id)}
        >
          <span>{selected ? collapseLabel : inspectLabel}</span>
          <span aria-hidden="true">{selected ? "−" : "+"}</span>
          <span className={styles.srOnly}>
            {selected ? `Collapse ${label}` : `Inspect ${label}`}
          </span>
        </button>
      </div>

      <div
        id={detailId}
        className={styles.detail}
        hidden={!selected}
      >
        {detail}
      </div>
    </article>
  );
}
