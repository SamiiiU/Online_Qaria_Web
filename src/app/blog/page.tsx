import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { fetchSanity } from "../../sanity/lib/client";
import { publishedPostsQuery } from "../../sanity/lib/queries";
import type { CmsPost } from "../../sanity/lib/types";

export const metadata: Metadata = {
  title: "Quran Learning Guides for Parents",
  description: "Practical guidance for parents choosing safe online Quran classes and supporting their child's Qaida, Nazra and Tajweed learning.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await fetchSanity<CmsPost[]>(publishedPostsQuery) || [];

  return (
    <SiteShell>
      <PageHero eyebrow="Parent Guides" title="Clear guidance for your child's Quran learning" description="Practical, parent-focused articles about lesson readiness, online safety, Qaida, Nazra and Tajweed." showCta={false} />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          {posts.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <article key={post._id} className="rounded-lg border border-slate-200 bg-white p-6">
                  <p className="text-sm font-medium text-gold">
                    {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.publishedAt))}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
                    <Link href={`/blog/${post.slug}`} className="hover:text-gold">{post.title}</Link>
                  </h2>
                  <p className="mt-3 leading-7 text-muted">{post.summary}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-block font-semibold text-gold hover:text-navy">Read guide <span aria-hidden>→</span></Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted">Parent guides are being carefully prepared and reviewed.</p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
