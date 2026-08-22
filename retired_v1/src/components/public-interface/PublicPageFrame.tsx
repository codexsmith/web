import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ContextNavigation,
  type ContextNavigationGroup,
} from "./ContextNavigation";

export function PublicPageFrame({
  children,
  group,
}: {
  children: ReactNode;
  group: ContextNavigationGroup;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ContextNavigation group={group} />
      {children}
      <SiteFooter />
    </main>
  );
}
