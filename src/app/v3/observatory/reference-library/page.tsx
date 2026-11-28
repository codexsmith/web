import type { Metadata } from "next";
import { ReferenceLibraryPage } from "@/components/institutional/ReferenceLibraryPage";

export const metadata: Metadata = {
  title: "Foundations & Reference Library · Boundary First Labs",
  description: "A reference-literature catalog with bibliographic locators and scope notes.",
  alternates: { canonical: "/observatory/reference-library" },
};

export default function Page() { return <ReferenceLibraryPage />; }
