"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import {
  resolveDomainRecordNavigationId,
  type DomainRecordNavigationItem,
} from "@/lib/domain-record-navigation";
import { cn } from "@/lib/utils";

function openAncestorDisclosures(target: HTMLElement) {
  let disclosure: HTMLDetailsElement | null =
    target instanceof HTMLDetailsElement
      ? target
      : target.closest("details");

  while (disclosure) {
    disclosure.open = true;
    disclosure = disclosure.parentElement?.closest("details") ?? null;
  }
}

function ancestorIdsFor(target: HTMLElement) {
  const ids: string[] = [];
  let current: HTMLElement | null = target;

  while (current) {
    if (current.id) ids.push(current.id);
    current = current.parentElement;
  }

  return ids;
}

async function waitForStableLayout() {
  try {
    await document.fonts.ready;
  } catch {
    // A font loading failure should not prevent section navigation.
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function DomainRecordJumpNav({
  items,
}: {
  items: DomainRecordNavigationItem[];
}) {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const [activeId, setActiveId] = useState(itemIds[0] ?? "");
  const jumpNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  const revealTarget = useCallback(
    async (targetId: string, behavior: ScrollBehavior = "auto") => {
      const target = document.getElementById(targetId);
      if (!target) return;

      openAncestorDisclosures(target);
      setActiveId(
        resolveDomainRecordNavigationId(
          targetId,
          ancestorIdsFor(target),
          itemIds,
        ),
      );

      await waitForStableLayout();

      const navigation = jumpNavRef.current;
      const stickyTop = navigation
        ? Number.parseFloat(window.getComputedStyle(navigation).top) || 0
        : 0;
      const navigationHeight = navigation?.getBoundingClientRect().height ?? 0;
      const targetTop = window.scrollY + target.getBoundingClientRect().top;

      window.scrollTo({
        behavior,
        top: Math.max(0, targetTop - stickyTop - navigationHeight - 16),
      });
    },
    [itemIds],
  );

  useEffect(() => {
    const revealCurrentHash = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) {
        setActiveId(itemIds[0] ?? "");
        return;
      }

      void revealTarget(targetId);
    };

    revealCurrentHash();
    window.addEventListener("hashchange", revealCurrentHash);
    window.addEventListener("popstate", revealCurrentHash);

    return () => {
      window.removeEventListener("hashchange", revealCurrentHash);
      window.removeEventListener("popstate", revealCurrentHash);
    };
  }, [itemIds, revealTarget]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const activationLine =
        (jumpNavRef.current?.getBoundingClientRect().bottom ?? 166) + 24;
      let nextId = itemIds[0] ?? "";

      for (const id of itemIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextId = id;
        }
      }

      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [itemIds]);

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const nextHash = `#${encodeURIComponent(id)}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    mobileMenuRef.current?.removeAttribute("open");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    void revealTarget(id, reducedMotion ? "auto" : "smooth");
  };

  const activeLabel =
    items.find((item) => item.id === activeId)?.label ??
    items[0]?.label ??
    "Sections";

  return (
    <div
      className="sticky top-16 z-30 mb-8 border-y border-border bg-card/95 shadow-sm backdrop-blur-xl sm:top-20"
      ref={jumpNavRef}
    >
      <nav aria-label="On this page shortcuts" className="px-3 py-2 sm:px-4">
        <details className="group sm:hidden" ref={mobileMenuRef}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="text-muted-foreground">Sections</span>
            <span className="ml-auto truncate text-right text-foreground">
              {activeLabel}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            />
          </summary>
          <ol className="grid grid-cols-2 gap-1 border-t border-border/50 pt-2">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-2 rounded-sm px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                    href={`#${item.id}`}
                    onClick={(event) => handleSectionClick(event, item.id)}
                  >
                    <span aria-hidden="true" className="opacity-65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </details>

        <ol className="hidden min-h-12 flex-wrap items-center gap-x-1 gap-y-1 sm:flex">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-2 border-b-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-foreground bg-muted text-foreground"
                      : "border-transparent text-foreground/70 hover:border-border hover:bg-muted/60 hover:text-foreground",
                  )}
                  href={`#${item.id}`}
                  onClick={(event) => handleSectionClick(event, item.id)}
                >
                  <span aria-hidden="true" className="text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
