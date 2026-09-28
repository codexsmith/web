import type { Metadata } from "next";
import { InstitutionalContactPage } from "@/components/institutional/InstitutionalContactPage";
import {
  isInquiryTypeId,
  type InquiryTypeId,
} from "@/components/institutional/content/contact";

export const metadata: Metadata = {
  title: "Contact · Boundary First Labs",
  description:
    "Get in touch with Boundary First Labs about a question, critique, practical problem, collaboration, research, funding, media, education, or something that does not fit neatly elsewhere.",
  alternates: { canonical: "/contact" },
};

type ContactSearchParams = {
  type?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
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
  return <InstitutionalContactPage initialType={initialType} />;
}
