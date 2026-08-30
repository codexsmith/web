"use client";

import { useEffect, type ReactNode } from "react";

type TraversalWindow = Window & {
  __bflFocusTraversal?: string[];
  __bflFocusTraversalCursor?: number;
};

export function LabMachineHomeBoundary({
  resetTraversal,
  children,
}: {
  resetTraversal: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!resetTraversal) return;

    const traversalWindow = window as TraversalWindow;
    traversalWindow.__bflFocusTraversal = [];
    traversalWindow.__bflFocusTraversalCursor = -1;

    try {
      window.sessionStorage.removeItem("bfl_traversal_state");
    } catch {
      // The homepage still works when browser storage is unavailable.
    }
  }, [resetTraversal]);

  return children;
}
