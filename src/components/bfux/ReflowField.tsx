"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
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
type ReflowFocusPeerPlacement = "split" | "before" | "after";
type ReflowRestLayout = "natural" | "rectangle";

type ReflowFieldContextValue = {
  selectedId: string | null;
  previousSelectedId: string | null;
  fieldId: string;
  layoutMode: ReflowLayoutMode;
  itemOrder: readonly string[];
  animatePeers: boolean;
  focusPeerPlacement: ReflowFocusPeerPlacement;
  restLayout: ReflowRestLayout;
  setSelection: (id: string | null) => void;
};

const ReflowFieldContext = createContext<ReflowFieldContextValue | null>(null);

function safeFragment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

const RECTANGLE_GRID_COLUMNS = 60;
const MAX_RECTANGLE_ROW_ITEMS = 6;
const MAX_FOCUS_PEER_ROW_ITEMS = 4;

function rectangleTileForIndex(itemCount: number, itemIndex: number) {
  if (itemCount <= 0 || itemIndex < 0 || itemIndex >= itemCount) return null;

  // Prefer a near-square silhouette, but never allow a row wider than six cards.
  // Each row is then stretched to the full field width, eliminating orphan cells.
  const rowCount = Math.max(
    Math.ceil(itemCount / MAX_RECTANGLE_ROW_ITEMS),
    Math.floor(Math.sqrt(itemCount)),
    1,
  );
  const baseRowSize = Math.floor(itemCount / rowCount);
  const widerRows = itemCount % rowCount;

  let cursor = 0;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowSize = baseRowSize + (rowIndex < widerRows ? 1 : 0);
    if (itemIndex < cursor + rowSize) {
      return {
        rowIndex,
        rowSize,
        span: RECTANGLE_GRID_COLUMNS / rowSize,
      };
    }
    cursor += rowSize;
  }

  return null;
}

function focusPeerRowCount(peerCount: number) {
  if (peerCount <= 0) return 1;
  return peerCount <= MAX_FOCUS_PEER_ROW_ITEMS
    ? 1
    : Math.ceil(peerCount / MAX_FOCUS_PEER_ROW_ITEMS);
}

function focusPeerTileForIndex(peerCount: number, peerIndex: number) {
  if (peerCount <= 0 || peerIndex < 0 || peerIndex >= peerCount) return null;

  const rowCount = focusPeerRowCount(peerCount);
  const baseRowSize = Math.floor(peerCount / rowCount);
  const widerRows = peerCount % rowCount;

  let cursor = 0;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowSize = baseRowSize + (rowIndex < widerRows ? 1 : 0);
    if (peerIndex < cursor + rowSize) {
      return {
        rowIndex,
        rowSize,
        rowCount,
        span: RECTANGLE_GRID_COLUMNS / rowSize,
      };
    }
    cursor += rowSize;
  }

  return null;
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

function clickBelongsToNestedReflowField(
  event: ReactMouseEvent<HTMLElement>,
) {
  const target = event.target;
  if (!(target instanceof Element)) return false;

  const targetField = target.closest("[data-reflow-field]");
  const currentField = event.currentTarget.closest("[data-reflow-field]");

  return Boolean(
    targetField &&
      currentField &&
      targetField !== currentField,
  );
}

const focusLayoutTransition = {
  type: "spring",
  bounce: 0.15,
  duration: 0.5,
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
 * Focus-stage rests tile into a closed rectangle by default.
 * Selected focus peers use one row through four peers, then balanced rows of at most four.
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
  animatePeers = false,
  focusPeerPlacement = "split",
  restLayout,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  defaultSelectedId?: string | null;
  layoutMode?: ReflowLayoutMode;
  itemOrder?: readonly string[];
  animatePeers?: boolean;
  focusPeerPlacement?: ReflowFocusPeerPlacement;
  restLayout?: ReflowRestLayout;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId);
  const [previousSelectedId, setPreviousSelectedId] = useState<string | null>(null);
  const reactId = useId();
  const fieldId = useMemo(() => safeFragment(`reflow-${reactId}`), [reactId]);

  useEffect(() => {
    if (previousSelectedId === null) return;

    const clearPrevious = window.setTimeout(() => {
      setPreviousSelectedId((current) =>
        current === previousSelectedId ? null : current,
      );
    }, 560);

    return () => window.clearTimeout(clearPrevious);
  }, [previousSelectedId]);

  const setSelection = useCallback((id: string | null) => {
    setPreviousSelectedId(selectedId);
    setSelectedId(id);
  }, [selectedId]);

  const peerCount = selectedId
    ? Math.max(itemOrder.length - 1, 1)
    : Math.max(itemOrder.length, 1);
  const peerRowCount = focusPeerRowCount(peerCount);
  const resolvedRestLayout =
    restLayout ?? (layoutMode === "focus-stage" ? "rectangle" : "natural");
  const fieldStyle = {
    "--reflow-peer-count": peerCount,
    "--reflow-peer-row-count": peerRowCount,
    "--reflow-selected-row": peerRowCount + 1,
  } as CSSProperties;

  const context = useMemo(
    () => ({
      selectedId,
      previousSelectedId,
      fieldId,
      layoutMode,
      itemOrder,
      animatePeers,
      focusPeerPlacement,
      restLayout: resolvedRestLayout,
      setSelection,
    }),
    [
      selectedId,
      previousSelectedId,
      fieldId,
      layoutMode,
      itemOrder,
      animatePeers,
      focusPeerPlacement,
      resolvedRestLayout,
      setSelection,
    ],
  );

  return (
    <ReflowFieldContext.Provider value={context}>
      <LayoutGroup id={fieldId}>
        <section
          className={[styles.field, className].filter(Boolean).join(" ")}
          aria-label={ariaLabel}
          data-reflow-field={fieldId}
          data-reflow-active={selectedId ? "true" : "false"}
          data-reflow-mode={layoutMode}
          data-reflow-rest-layout={resolvedRestLayout}
          style={fieldStyle}
          onKeyDown={(event) => {
            if (event.key === "Escape" && selectedId !== null) {
              event.preventDefault();
              setSelection(null);
            }
          }}
        >
          {children}
        </section>
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
}: {
  id: string;
  label: string;
  summary: ReactNode;
  detail: ReactNode;
  className?: string;
  dataTone?: string;
}) {
  const context = useContext(ReflowFieldContext);
  const reducedMotion = useReducedMotion();

  if (!context) {
    throw new Error("ReflowFieldItem must be rendered inside ReflowField.");
  }

  const selected = context.selectedId === id;
  const detailId = `${context.fieldId}-${safeFragment(id)}-detail`;
  const carriesMotion =
    context.animatePeers || selected || context.previousSelectedId === id;
  const transition =
    reducedMotion || !carriesMotion
      ? { layout: snapLayoutTransition }
      : { layout: focusLayoutTransition };
  const toggle = () => context.setSelection(selected ? null : id);

  const remainingIds = context.selectedId
    ? context.itemOrder.filter((itemId) => itemId !== context.selectedId)
    : [];
  const remainingIndex = remainingIds.indexOf(id);
  const splitIndex = Math.ceil(remainingIds.length / 2);
  const itemIndex = context.itemOrder.indexOf(id);
  const rectangleTile =
    context.restLayout === "rectangle"
      ? rectangleTileForIndex(context.itemOrder.length, itemIndex)
      : null;
  const peerTile =
    context.layoutMode === "focus-stage" &&
    context.selectedId !== null &&
    !selected
      ? focusPeerTileForIndex(remainingIds.length, remainingIndex)
      : null;
  const itemStyle = {
    ...(rectangleTile
      ? { "--reflow-rectangle-span": rectangleTile.span }
      : {}),
    ...(peerTile
      ? {
          "--reflow-peer-span": peerTile.span,
          "--reflow-peer-row": peerTile.rowIndex + 1,
        }
      : {}),
  } as CSSProperties;
  const placement =
    context.layoutMode !== "focus-stage" || context.selectedId === null
      ? "rest"
      : selected
        ? "selected"
        : context.focusPeerPlacement === "before"
          ? "before"
          : context.focusPeerPlacement === "after"
            ? "after"
            : remainingIndex >= 0 && remainingIndex < splitIndex
              ? "before"
              : "after";

  const handleSurfaceClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (clickBelongsToNestedReflowField(event)) return;
    if (clickBelongsToNestedControl(event)) return;

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim()) return;

    toggle();
  };

  return (
    <motion.article
      layout
      layoutId={`${context.fieldId}-${safeFragment(id)}`}
      layoutAnchor={{ x: 0.5, y: 0.5 }}
      layoutDependency={context.selectedId}
      transition={transition}
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-reflow-state={selected ? "selected" : "rest"}
      data-reflow-placement={placement}
      data-reflow-motion-carrier={carriesMotion ? "true" : "false"}
      data-reflow-row={rectangleTile?.rowIndex}
      data-reflow-row-size={rectangleTile?.rowSize}
      data-reflow-peer-row={peerTile?.rowIndex}
      data-reflow-peer-row-size={peerTile?.rowSize}
      data-tone={dataTone}
      style={{ borderRadius: "var(--reflow-item-radius, 22px)", ...itemStyle }}
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
            animate={{
              opacity: 1,
              transition: reducedMotion
                ? { duration: 0 }
                : { ...detailTransition, delay: 0.12 },
            }}
            exit={{
              opacity: 0,
              transition: reducedMotion
                ? { duration: 0 }
                : { duration: 0.12 },
            }}
          >
            {detail}
          </motion.div>
        ) : null}
      </AnimatePresence>

    </motion.article>
  );
}
