import type { PortableTextBlock } from "next-sanity";

export type CmsSeo = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

export type CmsSection = {
  _key: string;
  _type: "textSection" | "cardSection" | "faqSection";
  title: string;
  muted?: boolean;
  body?: PortableTextBlock[];
  items?: Array<{
    _key: string;
    title?: string;
    text?: string;
    href?: string;
    question?: string;
    answer?: string;
  }>;
};

export type CmsPage = {
  _id: string;
  _updatedAt: string;
  title: string;
  path: string;
  eyebrow?: string;
  summary: string;
  seo?: CmsSeo;
  sections?: CmsSection[];
  cta?: { enabled?: boolean; label?: string };
};

export type CmsMarketPrice = {
  countryCode: string;
  countryName: string;
  currency: string;
  amount: number;
};

export type CmsPost = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  body?: PortableTextBlock[];
  seo?: CmsSeo;
};
