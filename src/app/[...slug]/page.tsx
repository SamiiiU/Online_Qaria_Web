import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsPageView from "../components/CmsPageView";
import { fetchSanity } from "../../sanity/lib/client";
import { pageByPathQuery } from "../../sanity/lib/queries";
import type { CmsPage } from "../../sanity/lib/types";

type PageProps = { params: Promise<{ slug: string[] }> };

async function getPage(slug: string[]) {
  return fetchSanity<CmsPage>(pageByPathQuery, { path: slug.join("/") });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  const canonical = `/${page.path}`;
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.summary,
    alternates: { canonical },
    robots: page.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: page.seo?.title || page.title, description: page.seo?.description || page.summary, url: canonical, type: "article" },
  };
}

export default async function ManagedPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return <CmsPageView page={page} />;
}
