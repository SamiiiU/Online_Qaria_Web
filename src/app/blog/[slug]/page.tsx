import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import SiteShell from "../../components/SiteShell";
import { fetchSanity } from "../../../sanity/lib/client";
import { postBySlugQuery } from "../../../sanity/lib/queries";
import type { CmsPost } from "../../../sanity/lib/types";

type PostProps = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  return fetchSanity<CmsPost>(postBySlugQuery, { slug });
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const canonical = `/blog/${post.slug}`;
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.summary,
    alternates: { canonical },
    robots: post.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: post.seo?.title || post.title, description: post.seo?.description || post.summary, url: canonical, type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt || post._updatedAt },
  };
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 font-serif text-2xl font-bold text-navy sm:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold text-navy">{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("https://");
      return <Link href={href} className="font-semibold text-gold underline decoration-gold/40 underline-offset-4" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</Link>;
    },
  },
};

export default async function BlogPostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.seo?.noIndex) notFound();
  const modified = post.updatedAt || post._updatedAt;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: modified,
    mainEntityOfPage: `https://onlineqaria.com/blog/${post.slug}`,
    publisher: { "@type": "EducationalOrganization", name: "Online Qaria", url: "https://onlineqaria.com", logo: { "@type": "ImageObject", url: "https://onlineqaria.com/logo-mark.png" } },
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <header className="border-b border-slate-200 bg-cream">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
            <Link href="/blog" className="text-sm font-semibold text-gold hover:text-navy">Parent guides</Link>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{post.summary}</p>
            <p className="mt-5 text-sm text-muted">Published {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.publishedAt))}</p>
          </div>
        </header>
        <div className="content-copy mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <PortableText value={post.body || []} components={components} />
          <aside className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="font-serif text-2xl font-bold text-navy">Looking for one-to-one Quran lessons?</h2>
            <p className="mt-3">Explore our <Link href="/online-quran-classes-for-kids" className="font-semibold text-gold">online Quran classes for kids</Link> or review our <Link href="/child-safety" className="font-semibold text-gold">child-safety approach</Link> before booking a demo.</p>
          </aside>
        </div>
      </article>
    </SiteShell>
  );
}
