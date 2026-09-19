"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  commandPaletteEntries,
  commandPaletteQuickEntries,
  commandPaletteStats,
  type CommandPaletteEntry,
} from "./content/commandPalette";
import styles from "./styles/LabCommandPalette.module.css";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function rankEntry(entry: CommandPaletteEntry, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const tokens = normalizedQuery.split(" ");
  const haystack = normalize(entry.searchText);
  if (!tokens.every((token) => haystack.includes(token))) return -1;

  const label = normalize(entry.label);
  const identifier = normalize(entry.identifier ?? "");

  let score = entry.type === "object" ? 18 : 0;

  if (label === normalizedQuery) score += 220;
  else if (label.startsWith(normalizedQuery)) score += 170;
  else if (label.includes(normalizedQuery)) score += 120;

  if (identifier) {
    if (identifier === normalizedQuery) score += 210;
    else if (identifier.startsWith(normalizedQuery)) score += 160;
    else if (identifier.includes(normalizedQuery)) score += 110;
  }

  for (const token of tokens) {
    if (label.startsWith(token)) score += 18;
    if (identifier.startsWith(token)) score += 16;
  }

  if (
    entry.relationships.some((relationship) =>
      normalize(`${relationship.relation} ${relationship.otherTitle}`).includes(
        normalizedQuery,
      ),
    )
  ) {
    score += 55;
  }

  return score;
}

function searchEntries(query: string) {
  if (!normalize(query)) {
    return [...commandPaletteQuickEntries];
  }

  return commandPaletteEntries
    .map((entry) => ({ entry, score: rankEntry(entry, query) }))
    .filter((result) => result.score >= 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.entry.label.localeCompare(right.entry.label),
    )
    .slice(0, 12)
    .map((result) => result.entry);
}

export function LabCommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchEntries(query), [query]);
  const activeEntry = results[Math.min(activeIndex, Math.max(results.length - 1, 0))];

  const openPalette = () => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  };

  const closePalette = () => setOpen(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const handleGlobalShortcut = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        if (open) closePalette();
        else openPalette();
      }
    };

    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, [open]);

  const activate = (entry: CommandPaletteEntry) => {
    closePalette();
    router.push(entry.href);
  };

  const handleInputKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length ? (current + 1) % results.length : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length
          ? (current - 1 + results.length) % results.length
          : 0,
      );
    }

    if (event.key === "Enter" && activeEntry) {
      event.preventDefault();
      activate(activeEntry);
    }
  };

  const handleBackdropMouseDown = (
    event: ReactMouseEvent<HTMLDialogElement>,
  ) => {
    if (event.target === event.currentTarget) closePalette();
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-label="Search Lab objects and pages. Keyboard shortcut Command or Control K."
        title="Search Lab (⌘/Ctrl K)"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={styles.triggerIcon}
        >
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="m15 15 5 5" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onCancel={closePalette}
        onClose={() => setOpen(false)}
        onMouseDown={handleBackdropMouseDown}
        aria-labelledby="lab-command-title"
      >
        <div className={styles.shell}>
          <header className={styles.searchHeader}>
            <div className={styles.searchTitle}>
              <span>GLOBAL OBJECT NAVIGATION</span>
              <strong id="lab-command-title">Search the Lab</strong>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closePalette}
              aria-label="Close Lab search"
            >
              Esc
            </button>
          </header>

          <div className={styles.inputRow}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="5.5" />
              <path d="m15 15 5 5" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Object, code, status, relationship, or page…"
              aria-label="Search Lab objects, relationships, and pages"
              aria-controls="lab-command-results"
              aria-activedescendant={
                activeEntry ? `lab-command-${activeEntry.id.replace(/[^a-zA-Z0-9_-]/g, "-")}` : undefined
              }
              role="combobox"
              aria-expanded="true"
              autoComplete="off"
            />
          </div>

          <div className={styles.boundary}>
            <span>
              {query
                ? `${results.length} deterministic match${results.length === 1 ? "" : "es"}`
                : "Quick navigation"}
            </span>
            <small>
              {commandPaletteStats.objects} objects · {commandPaletteStats.relationships} declared relationships · {commandPaletteStats.pages} pages
            </small>
          </div>

          <div
            id="lab-command-results"
            className={styles.results}
            role="listbox"
            aria-label="Lab search results"
          >
            {results.length ? (
              results.map((entry, index) => (
                <button
                  type="button"
                  id={`lab-command-${entry.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={styles.result}
                  data-active={index === activeIndex ? "true" : "false"}
                  data-entry-type={entry.type}
                  data-kind={entry.kind}
                  key={entry.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => activate(entry)}
                >
                  <span className={styles.resultMark}>
                    {entry.type === "object" ? entry.identifier ?? entry.kind : "PAGE"}
                  </span>
                  <span className={styles.resultCopy}>
                    <strong>{entry.label}</strong>
                    <small>{entry.meta}</small>
                    {entry.relationships.length ? (
                      <span className={styles.relationshipHints}>
                        {entry.relationships.slice(0, 2).map((relationship) => (
                          <em key={`${relationship.relation}:${relationship.otherTitle}`}>
                            {relationship.relation} · {relationship.otherTitle}
                          </em>
                        ))}
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.resultArrow} aria-hidden="true">→</span>
                </button>
              ))
            ) : (
              <div className={styles.emptyState}>
                <strong>No declared object or page matches.</strong>
                <span>
                  Search is deterministic over public Lab Objects, their explicit Atlas
                  relationships, and institutional routes. It does not infer semantic links.
                </span>
              </div>
            )}
          </div>

          <footer className={styles.footerHints}>
            <span><kbd>↑</kbd><kbd>↓</kbd> Move</span>
            <span><kbd>Enter</kbd> Open</span>
            <span><kbd>Esc</kbd> Close</span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
