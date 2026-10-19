import type { MetadataRoute } from "next";
import { fetchSanity } from "../sanity/lib/client";
import { publishedPagePathsQuery, publishedPostsQuery } from "../sanity/lib/queries";

const routes = ["", "/about", "/online-quran-classes", "/online-quran-classes-for-kids", "/female-quran-teacher-online", "/courses/noorani-qaida", "/courses/nazra-quran-with-tajweed", "/child-safety", "/blog", "/pricing", "/contact", "/privacy-policy", "/terms-and-conditions", "/cancellation-policy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const managedPages = await fetchSanity<Array<{ path: string; _updatedAt: string; seo?: { noIndex?: boolean } }>>(publishedPagePathsQuery) || [];
  const posts = await fetchSanity<Array<{ slug: string; _updatedAt: string; updatedAt?: string; publishedAt: string }>>(publishedPostsQuery) || [];
  const staticEntries: MetadataRoute.Sitemap = routes.map((route): MetadataRoute.Sitemap[number] => ({ url: `https://onlineqaria.com${route}`, lastModified: new Date("2026-10-18"), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route.includes("policy") || route.includes("conditions") ? 0.3 : 0.7 }));
  const staticUrls = new Set(staticEntries.map((entry) => entry.url));
  const managedEntries: MetadataRoute.Sitemap = managedPages
    .filter((page) => page.path && !page.seo?.noIndex)
    .map((page): MetadataRoute.Sitemap[number] => ({ url: `https://onlineqaria.com/${page.path}`, lastModified: new Date(page._updatedAt), changeFrequency: "monthly", priority: 0.7 }))
    .filter((entry) => !staticUrls.has(entry.url));
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({ url: `https://onlineqaria.com/blog/${post.slug}`, lastModified: new Date(post.updatedAt || post._updatedAt || post.publishedAt), changeFrequency: "monthly", priority: 0.6 }));
  return [...staticEntries, ...managedEntries, ...postEntries];
}
