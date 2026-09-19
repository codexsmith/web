import type { Metadata } from "next";
import { InstitutionalContactPage } from "@/components/institutional/InstitutionalContactPage";
import {
  isInquiryTypeId,
  type InquiryTypeId,
} from "@/components/institutional/content/contact";

export const metadata: Metadata = {
  title: "Contact · Boundary First Labs",
  description:
    "Start a conversation with Boundary First Labs about applied work, collaboration, funding, research review, products, media, education, or an unusual Open Lab case.",
  alternates: { canonical: "/contact" },
};

type ContactSearchParams = {
  type?: string | string[];
  source?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function sourceValue(value: string | undefined) {
  if (!value) return "contact";
  return value.replace(/[^a-zA-Z0-9_./:-]/g, "").slice(0, 120) || "contact";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const params = await searchParams;
  const requestedType = first(params.type) ?? "";
  const initialType: InquiryTypeId = isInquiryTypeId(requestedType)
    ? requestedType
    : "general";
  const sourceContext = sourceValue(first(params.source));
  const intakeEnabled = Boolean(process.env.BFL_INQUIRY_WEBHOOK_URL);

  return (
    <InstitutionalContactPage
      initialType={initialType}
      intakeEnabled={intakeEnabled}
      sourceContext={sourceContext}
    />
  );
}
