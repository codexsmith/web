"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { GraphNode } from "./GraphContext";

const IdentityContext = createContext<GraphNode | undefined>(undefined);

export function IdentityProvider({
  children,
  identity,
}: {
  children: ReactNode;
  identity: GraphNode;
}) {
  return (
    <IdentityContext.Provider value={identity}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return context;
}
